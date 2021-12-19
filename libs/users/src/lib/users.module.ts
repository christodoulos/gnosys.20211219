import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { User, UserSchema } from './schemas/user.schema';
// import {
//   ForgotPassword,
//   ForgotPasswordSchema,
// } from './schemas/forgot-password.schema';
import {
  User,
  UserSchema,
  ForgotPassword,
  ForgotPasswordSchema,
} from '@gnosys/schemas';
import { AuthModule } from '@gnosys/auth';
import { MailModule } from '@gnosys/mail';

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
