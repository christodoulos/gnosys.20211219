import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { User } from '@gnosys/interfaces';

import { environment } from '../../environments/environment';

@Injectable()
export class GnosysMailService {
  constructor(private mailService: MailService) {}

  public async sendUserConfirmation(user: User) {
    const uuid = user.verification;
    this.mailService.setApiKey(process.env.SENDGRID_API_KEY);

    const url = `http://${environment.gnosysURL}/api/user/verify/verification=${uuid}`;

    await this.mailService.send({
      to: user.email,
      from: '"gnosys Support Team" <gnosys@gnosys.tech>',
      templateId: 'd-1c3af41cf45942e4a42594cb59365aa4',
      dynamicTemplateData: {
        givenName: user.givenName,
        url,
      },
    });
  }

  gamoToFelekimou(user: User) {
    console.log(`o ${user.givenName} einai malakas`);
  }
}
