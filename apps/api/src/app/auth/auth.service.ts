import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Model } from 'mongoose';
import Cryptr from 'cryptr';

interface JwtPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  cryptr: Cryptr;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
    this.cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
  }

  async createAccessToken(userId: string) {
    // const accessToken = this.jwtService.sign({userId});
    const accessToken = sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return this.encryptText(accessToken);
  }

  async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userModel.findOne({
      _id: jwtPayload.userId,
      emailVerified: true,
    });
    if (!user) {
      throw new UnauthorizedException('User not authorized.');
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  encryptText(text: string): string {
    //   console.log(this.Cryptr('skata'));
    //   return this.cryptr.encrypt(text);
    return text;
  }
}
