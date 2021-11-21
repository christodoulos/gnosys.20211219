import { User } from '../users/interfaces/user.interface';
import { Document } from 'mongoose';

export interface RefreshToken extends Document {
  userId: User;
  refreshToken: string;
  ip: string;
  browser: string;
  country: string;
}
