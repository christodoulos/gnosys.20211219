import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
// import { User } from '@gnosys/api-interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

import { MailService } from '@sendgrid/mail';

@Injectable()
export class UsersService {
  hours_to_verify = 4;
  login_attempts_to_block = 6;
  hours_to_block = 8;

  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private mail: MailService,
    private readonly authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await this.isEmailUnique(createdUser.email);
    this.setRegistrationInfo(createdUser);
    await this.sendRegistrationEmail(createdUser);
    return await createdUser.save();
  }

  async login(req: Request, loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email);
    this.isUserBlocked(user);
    await this.checkPassword(loginUserDto.password, user);
    await this.passwordsDoMatch(user);
    return {
      displayName: `${user.givenName} ${user.familyName}`,
      email: user.email,
      accessToken: await this.authService.createAccessToken(user.email),
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  //
  // Private Methods
  //

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email, verified: true });
    if (user) {
      throw new BadRequestException('User already exists.');
    }
  }

  private setRegistrationInfo(user: {
    verification: string;
    verificationExpires: Date;
  }): void {
    user.verification = v4();
    user.verificationExpires = addHours(new Date(), this.hours_to_verify);
  }

  private async findUserByEmail(email: string): Promise<User> {
    // const user = await this.userModel.findOne({ email, verified: true });
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Wrong email or password.');
    }
    return user;
  }

  private isUserBlocked(user): void {
    if (user.blockExpires > Date.now()) {
      throw new ConflictException('User has been blocked, try again later.');
    }
  }

  private async checkPassword(attemptPass: string, user) {
    const match = await bcrypt.compare(attemptPass, user.password);
    if (!match) {
      await this.passwordsDoNotMatch(user);
      throw new NotFoundException('Wrong email or password.');
    }
    return match;
  }

  private async passwordsDoNotMatch(user) {
    user.loginAttempts += 1;
    await user.save();
    if (user.loginAttempts >= this.login_attempts_to_block) {
      await this.blockUser(user);
      throw new ConflictException('User blocked.');
    }
  }

  private async blockUser(user) {
    user.blockExpires = addHours(new Date(), this.hours_to_block);
    await user.save();
  }

  private async passwordsDoMatch(user) {
    user.loginAttempts = 0;
    await user.save();
  }

  private async sendRegistrationEmail(user) {
    this.mail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'gnosys@gnosys.tech',
      subject: 'Complete your registration to Gnosys',
      text: 'Please follow the link',
      html: 'Please follow the <a href="www.ntua.gr">link</a>',
    };
    try {
      await this.mail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
}
