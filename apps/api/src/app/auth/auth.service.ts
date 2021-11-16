import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/user.schema';
import { Model } from 'mongoose';

interface JwtPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

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
}
