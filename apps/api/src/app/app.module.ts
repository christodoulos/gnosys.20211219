import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbadmin:7zsSF0IPmExDAJGt@nocode.5hzdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'gnosys'),
      exclude: ['/api*'],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
