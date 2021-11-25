import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { User } from '@gnosys/interfaces';

import { environment } from '../../environments/environment';
import { ForgotPasswordDocument } from '../users/schemas/forgot-password.schema';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class GnosysMailService {
  constructor(private mailService: MailService) {}

  public async sendUserConfirmation(user: UserDocument) {
    const uuid = user.verification;
    this.mailService.setApiKey(process.env.SENDGRID_API_KEY);

    const url = `http://${environment.gnosysURL}/#/verify/${uuid}`;

    await this.mailService.send({
      to: user.email,
      from: 'gnosys Support Team <gnosys@gnosys.tech>',
      templateId: 'd-1c3af41cf45942e4a42594cb59365aa4',
      dynamicTemplateData: {
        givenName: user.firstName,
        url,
      },
    });
  }

  public async sendPasswordResetLink(forgotPassword: ForgotPasswordDocument) {
    const uuid = forgotPassword.verification;
    this.mailService.setApiKey(process.env.SENDGRID_API_KEY);

    const url = `http://${environment.gnosysURL}/#/reset/${uuid}`;

    await this.mailService.send({
      to: forgotPassword.email,
      from: 'gnosys Support Team <gnosys@gnosys.tech>',
      templateId: 'd-a1208720734d4abd877de89f90904c4f',
      dynamicTemplateData: { url },
    });
  }
}
