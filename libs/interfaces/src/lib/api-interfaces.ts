import { FormControl } from '@ngneat/reactive-forms';

export interface Message {
  message: string;
}

export interface User {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  accessToken: string;
  refreshToken: string;
  verification: string;
  loading: boolean;
  roles?: [string];
}

export interface ForgotPassword {
  email: string;
  verification: string;
  firstUsed?: boolean;
  finalUsed?: boolean;
  expires: Date;
  ip: string;
  browser: string;
  country: string;
  ipChanged?: string;
  browserChanged?: string;
  countryChanged?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface Generic {
  [key: string]: FormControl<string>;
}

export interface Controls {
  name: string;
  value: FormControl<string>;
}
