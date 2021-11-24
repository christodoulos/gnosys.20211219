import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'gnosys'),
      exclude: ['/api*'],
    }),
    AuthModule,
    UsersModule,
    MailModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
