import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import {
  ForgotPassword,
  ForgotPasswordSchema,
} from './schemas/forgot-password.schema';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: ForgotPassword.name, schema: ForgotPasswordSchema },
    ]),
    AuthModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
