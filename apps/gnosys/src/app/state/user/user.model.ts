import { User } from '@gnosys/interfaces';

export enum GnosysRoles {
  Student,
  Parent,
  Teacher,
  Admin,
}

export const initGnosysUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  displayName: '',
  emailVerified: false,
  verification: '',
  accessToken: '',
  refreshToken: '',
  loading: false,
};
