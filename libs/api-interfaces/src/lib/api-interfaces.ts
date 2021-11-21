import { FormControl } from '@ngneat/reactive-forms';

export interface Message {
  message: string;
}

export interface User {
  email: string;
  displayName: string;
  givenName: string;
  familyName: string;
  emailVerified: boolean;
  access_token: string;
  roles?: [string];
}

export interface SignupForm {
  email: string;
  givenName: string;
  familyName: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Generic {
  [key: string]: FormControl<string>;
}

export interface Controls {
  name: string;
  value: FormControl<string>;
}
