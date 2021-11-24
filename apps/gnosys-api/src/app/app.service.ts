import { Injectable } from '@nestjs/common';
import { Message } from '@gnosys/interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
