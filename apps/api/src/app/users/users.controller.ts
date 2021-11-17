import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
