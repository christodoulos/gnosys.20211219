// import { User } from '@gnosys/users';
import { User } from '@gnosys/schemas';
import { Document } from 'mongoose';

export interface RefreshToken extends Document {
  userId: User;
  refreshToken: string;
  ip: string;
  browser: string;
  country: string;
}
