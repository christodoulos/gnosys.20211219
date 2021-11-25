import { createAction, props } from '@datorama/akita-ng-effects';
import { LoginFormData, SignUpFormData, User } from '@gnosys/interfaces';

export const UserInitAction = createAction('Gnosys Init User');

export const UserVerifyEmailAction = createAction(
  'Verify Email',
  props<{ verification: string }>()
);

export const UserIsLoadingAction = createAction(
  'Set User Loading',
  props<{ isloading: boolean }>()
);

export const UserLoginAction = createAction(
  'Login Action',
  props<{ user: LoginFormData }>()
);

export const UserUpdateAction = createAction(
  'Gnosys User Update',
  props<{ user: User }>()
);

export const UserSignUpAction = createAction(
  'Gnosys User Sign up',
  props<{ data: SignUpFormData }>()
);

export const UserSignOutAction = createAction('Gnosys Sign Out');
