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
import { User, UserDocument } from './user.schema';
import { User as GnosysUser } from '@gnosys/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

import { GnosysMailService } from '../mail/mail.service';
import { VerifyUuidDto } from './dto/verify-uuid.dto';

@Injectable()
export class UsersService {
  hours_to_verify_signup = 12;
  hours_to_verify = 4;
  login_attempts_to_block = 6;
  hours_to_block = 8;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
      givenName: user.givenName,
      familyName: user.familyName,
      displayName: `${user.givenName} ${user.familyName}`,
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
      givenName: user.givenName,
      familyName: user.familyName,
      displayName: `${user.givenName} ${user.familyName}`,
      emailVerified: user.emailVerified,
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(req, user._id),
      roles: user.roles,
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
    // const user = await this.userModel.findOne({ email, verified: true });
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
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
      throw new NotFoundException('Wrong email or password.');
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
    // this.mail.setApiKey(process.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: user.email,
    //   from: 'gnosys@gnosys.tech',
    //   subject: 'Complete your registration to Gnosys',
    //   text: 'Please follow the link',
    //   html: 'Please follow the <a href="www.ntua.gr">link</a>',
    // };
    // try {
    //   await this.mail.send(msg);
    // } catch (error) {
    //   console.error(error);
    //   if (error.response) {
    //     console.error(error.response.body);
    //   }
    // }
    // this.mailService.gamoToFelekimou(user as unknown as GnosysUser);
    await this.mailService.sendUserConfirmation(user as unknown as GnosysUser);
  }
}
