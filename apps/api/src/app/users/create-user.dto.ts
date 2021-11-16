export class CreateUserDto {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  givenName: string;
  familyName: string;
  emailVerified: boolean;
}
