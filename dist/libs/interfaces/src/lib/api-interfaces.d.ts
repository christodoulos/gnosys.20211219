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
    message: string;
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
export interface ResetPasswordData {
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
