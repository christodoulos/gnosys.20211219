import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions as AkitaActions,
  createEffect,
  ofType,
} from '@datorama/akita-ng-effects';
import { UserService } from './user.service';
import * as Actions from './user.actions';
import { AuthService, TokenService } from '../../services';
import { map, take, tap } from 'rxjs/operators';
import { initGnosysUser } from './user.model';
import { AlertSuccessAction } from '..';

@Injectable({ providedIn: 'root' })
export class GnosysUserEffects {
  constructor(
    private actions: AkitaActions,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  InitUserEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserInitAction),
      tap(() => this.userService.updateUser(initGnosysUser))
    )
  );

  UserIsLoadingEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserIsLoadingAction),
      tap((payload) => this.userService.setloading(payload.isloading))
    )
  );

  UserVerifyEmailEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserVerifyEmailAction),
      tap((payload) => {
        this.router.navigate(['']);
        this.authService
          .verify(payload.verification)
          .pipe(take(1))
          .subscribe((user) => {
            if (user) {
              this.actions.dispatch(
                AlertSuccessAction({
                  header: `${user.firstName} thanks for verifying`,
                  message: 'Start using gnosys right now',
                })
              );
            }
            this.router.navigate(['signin']);
          });
      })
    )
  );

  UserLoginEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserLoginAction),
      map((payload) => payload.user),
      tap((user) =>
        this.authService
          .login(user)
          .pipe(take(1))
          .subscribe((user) => {
            this.tokenService.saveRefreshToken(user.accessToken);
            this.tokenService.saveRefreshToken(user.refreshToken);
            this.tokenService.saveUser(user);
            this.actions.dispatch(Actions.UserUpdateAction({ user }));
          })
      )
    )
  );

  UserForgotPasswordEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserForgotPasswordAction),
      tap((payload) => {
        this.authService
          .forgot(payload.email)
          .pipe(take(1))
          .subscribe((forgotPassword) => {
            this.actions.dispatch(
              AlertSuccessAction({
                message: `If ${forgotPassword.email} is a real gnosys user, you will soon receive a reset link.`,
              })
            );
          });
      })
    )
  );

  UserSignUpEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserSignUpAction),
      map((payload) => payload.data),
      tap((data) =>
        this.authService
          .signup(data)
          .pipe(take(1))
          .subscribe((user) => {
            this.actions.dispatch(
              AlertSuccessAction({
                header: `${user.firstName} thanks for registering`,
                message: `Please verify ${user.email} first.`,
              })
            );
            this.router.navigate(['']);
          })
      )
    )
  );

  UserUpdateEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserUpdateAction),
      map((payload) => payload.user),
      tap((user) => {
        this.userService.updateUser({ ...user });
        this.router.navigate(['user']);
      })
    )
  );

  UserLogoutEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserSignOutAction),
      tap(() => {
        this.actions.dispatch(Actions.UserInitAction);
        localStorage.removeItem('AkitaStores');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-refreshtoken');
        localStorage.removeItem('auth-user');
        this.router.navigate(['']);
      })
    )
  );
}
