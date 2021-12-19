import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CreateForgotPasswordDto,
  CreateUserDto,
  LoginUserDto,
  ResetPasswordDto,
  VerifyUuidDto,
} from '@gnosys/dto';
// import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
// import { CreateUserDto } from './dto/create-user.dto';
// import { LoginUserDto } from './dto/login-user.dto';
// import { ResetPasswordDto } from './dto/reset-password.dto';
// import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('verify')
  async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
    return await this.userService.verifyEmail(req, verifyUuidDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(req, loginUserDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Req() req: Request,
    @Body() createForfotPasswordDto: CreateForgotPasswordDto
  ) {
    return await this.userService.forgotPassword(req, createForfotPasswordDto);
  }

  @Post('forgot-password-verify')
  @HttpCode(HttpStatus.OK)
  async forgotPasswordVerify(
    @Req() req: Request,
    @Body() verifyUuidDto: VerifyUuidDto
  ) {
    return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }
}
