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
import { UserSignUpAction } from '.';

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
      tap((payload) =>
        this.authService
          .verify(payload.verification)
          .pipe(take(1))
          .subscribe((user) => {
            // Potential routing problem here ...?
            this.actions.dispatch(Actions.UserUpdateAction({ user }));
            this.tokenService.saveRefreshToken(user.accessToken);
            this.tokenService.saveRefreshToken(user.refreshToken);
            this.tokenService.saveUser(user);
          })
      )
    )
  );

  UserLoginEffect = createEffect(() =>
    this.actions.pipe(
      ofType(Actions.UserLoginAction),
      map((payload) => payload.user),
      tap(() =>
        this.actions.dispatch(Actions.UserIsLoadingAction({ isloading: true }))
      ),
      tap((user) =>
        this.authService
          .login(user)
          .pipe(take(1))
          .subscribe((user) => {
            this.tokenService.saveRefreshToken(user.accessToken);
            this.tokenService.saveRefreshToken(user.refreshToken);
            this.tokenService.saveUser(user);
            this.actions.dispatch(Actions.UserUpdateAction({ user }));
            this.actions.dispatch(
              Actions.UserIsLoadingAction({ isloading: false })
            );
          })
      )
    )
  );

  UserSignUpEffect = createEffect(() =>
    this.actions.pipe(
      ofType(UserSignUpAction),
      map((payload) => payload.data),
      tap(() =>
        this.actions.dispatch(Actions.UserIsLoadingAction({ isloading: true }))
      ),
      tap((data) =>
        this.authService
          .signup(data)
          .pipe(take(1))
          .subscribe((user) => {
            // Show message for successful or not registration
            // or better handle that in the interceptor
            this.router.navigate([]);
            this.actions.dispatch(
              Actions.UserIsLoadingAction({ isloading: false })
            );
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

  //   updateGnosysUser$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(GnosysUserUpdateAction),
  //       map((payload) => this.query.userDoc(payload.uid)),
  //       tap((doc) =>
  //         doc.pipe(take(1)).subscribe((user) => {
  //           console.log('Update Gnosys User Effect', user);
  //           this.gnosysUserService.updateUser(user as GnosysUser);
  //         })
  //       )
  //     )
  //   );

  //   signupUser$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(GnosysUserSignUpAction),
  //       tap((payload) => {
  //         console.log('Signup Action Effect');
  //         this.query.updateUsersDoc(payload.data);
  //         this.router.navigate(['user']);
  //       })
  //     )
  //   );
}
