import { Module } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { GnosysMailService } from './mail.service';

@Module({
  exports: [GnosysMailService],
  providers: [MailService, GnosysMailService],
})
export class MailModule {}
