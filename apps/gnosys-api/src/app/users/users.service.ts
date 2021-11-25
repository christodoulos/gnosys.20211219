import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import {
  ForgotPassword,
  ForgotPasswordDocument,
} from './schemas/forgot-password.schema';
import { User as GnosysUser } from '@gnosys/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

import { GnosysMailService } from '../mail/mail.service';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';

@Injectable()
export class UsersService {
  hours_to_verify_signup = 12;
  hours_to_verify = 4;
  login_attempts_to_block = 6;
  hours_to_block = 8;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(ForgotPassword.name)
    private forgotPasswordModel: Model<ForgotPasswordDocument>,
    private readonly mailService: GnosysMailService,
    private readonly authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    await this.isEmailUnique(createdUser.email);
    this.setRegistrationInfo(createdUser);
    await this.sendRegistrationEmail(createdUser);
    return await createdUser.save();
  }

  async verifyEmail(req: Request, veryfyUuidDto: VerifyUuidDto) {
    const user = await this.findUserByVerification(veryfyUuidDto.verification);
    await this.setUserAsVerified(user);
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: `${user.firstName} ${user.lastName}`,
      emailVerified: user.emailVerified,
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
      roles: user.roles,
    };
  }

  async login(req: Request, loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email);
    this.isUserBlocked(user);
    await this.checkPassword(loginUserDto.password, user);
    await this.passwordsDoMatch(user);
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: `${user.firstName} ${user.lastName}`,
      emailVerified: user.emailVerified,
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
      roles: user.roles,
    };
  }

  async forgotPassword(
    req: Request,
    createForgotPasswordDto: CreateForgotPasswordDto
  ) {
    await this.findUserByEmail(createForgotPasswordDto.email);
    await this.saveForgotPassword(req, createForgotPasswordDto);
    // send an email here
    return {
      email: createForgotPasswordDto.email,
      message: 'verification sent.',
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  //
  // Private Methods (operate on Mongoose Documents)
  //

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email, verified: true });
    if (user) {
      throw new BadRequestException('User already exists.');
    }
  }

  private setRegistrationInfo(user: UserDocument): void {
    user.verification = v4();
    user.verificationExpires = addHours(new Date(), this.hours_to_verify);
  }

  private async findUserByVerification(
    verification: string
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({
      verification,
      emailVerified: false,
      verificationExpires: { $gt: new Date() },
    });
    if (!user) {
      throw new BadRequestException('Verification Expired.');
    }
    return user;
  }

  private async findUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email, emailVerified: true });
    if (!user) {
      throw new NotFoundException('Wrong or not verified email.');
    }
    return user;
  }

  private isUserBlocked(user: UserDocument): void {
    if (user.blockExpires > new Date(Date.now())) {
      throw new ConflictException('User has been blocked, try again later.');
    }
  }

  private async checkPassword(attemptPass: string, user: UserDocument) {
    const match = await bcrypt.compare(attemptPass, user.password);
    if (!match) {
      await this.passwordsDoNotMatch(user);
      throw new NotFoundException(
        `Wrong email or password (${user.loginAttempts}/${this.login_attempts_to_block}).`
      );
    }
    return match;
  }

  private async passwordsDoNotMatch(user: UserDocument) {
    user.loginAttempts += 1;
    await user.save();
    if (user.loginAttempts >= this.login_attempts_to_block) {
      await this.blockUser(user);
      throw new ConflictException('User blocked.');
    }
  }

  private async blockUser(user: UserDocument) {
    user.blockExpires = addHours(new Date(), this.hours_to_block);
    await user.save();
  }

  private async setUserAsVerified(user: UserDocument) {
    user.emailVerified = true;
    await user.save();
  }

  private async passwordsDoMatch(user: UserDocument) {
    user.loginAttempts = 0;
    await user.save();
  }

  private async sendRegistrationEmail(user: UserDocument) {
    await this.mailService.sendUserConfirmation(user);
  }

  // Forgot password related

  private async saveForgotPassword(
    req: Request,
    createForgotPasswordDto: CreateForgotPasswordDto
  ) {
    const forgotPassword = await this.forgotPasswordModel.create({
      email: createForgotPasswordDto.email,
      verification: v4(),
      expires: addHours(new Date(), this.hours_to_verify),
      ip: this.authService.getIp(req),
      browser: this.authService.getBrowserInfo(req),
      country: this.authService.getCountry(req),
    });
    await this.mailService.sendPasswordResetLink(forgotPassword);
    await forgotPassword.save();
  }
}
