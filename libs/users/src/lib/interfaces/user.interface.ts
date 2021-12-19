import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  roles: [string];
  verification: string;
  emailVerified: boolean;
  verificationExpires: Date;
  loginAttempts?: number;
  blockExpires?: Date;
}
