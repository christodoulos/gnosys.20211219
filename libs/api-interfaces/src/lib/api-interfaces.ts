import { FormControl, FormGroup } from '@ngneat/reactive-forms';

export interface Message {
  message: string;
}

export interface User {
  // uid: string;
  email: string;
  // displayName: string;
  givenName: string;
  familyName: string;
  emailVerified: boolean;
}

export interface SignupForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface Generic {
  [key: string]: FormControl<string>;
}

export interface Controls {
  name: string;
  value: FormControl<string>;
}
