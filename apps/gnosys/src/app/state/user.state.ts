import { Injectable } from '@angular/core';
import { Store, StoreConfig, Query } from '@datorama/akita';
import {
  Actions,
  createAction,
  createEffect,
  ofType,
  props,
} from '@datorama/akita-ng-effects';

import { LoginFormData, User } from '@gnosys/interfaces';
import { map, take, tap } from 'rxjs/operators';
import { AuthService, TokenService } from '../services';

import jwt_decode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

// Gnosys user model

export enum GnosysRoles {
  Student,
  Parent,
  Teacher,
  Admin,
}

// Gnosys user Store

export const initGnosysUser: User = {
  familyName: '',
  givenName: '',
  email: '',
  displayName: '',
  emailVerified: false,
  verification: '',
  accessToken: '',
  refreshToken: '',
  loading: false,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class GnosysUserStore extends Store<User> {
  constructor() {
    super({});
  }
}

// Gnosys user Service

@Injectable({ providedIn: 'root' })
export class GnosysUserService {
  constructor(private store: GnosysUserStore) {}
  updateUser(user: Partial<User>) {
    this.store.update({ ...user });
  }
  setloading(isloading: boolean) {
    this.store.update({ loading: isloading });
  }
}

// Gnosys user Query

@Injectable({ providedIn: 'root' })
export class GnosysUserQuery extends Query<User> {
  constructor(protected store: GnosysUserStore) {
    super(store);
  }

  displayName$ = this.select((state) => state.displayName);
  familyName$ = this.select((state) => state.familyName);
  givenName$ = this.select((state) => state.givenName);
  roles$ = this.select((state) => state.roles);
  email$ = this.select((state) => state.email);
  loading$ = this.select((state) => state.loading);
  accessToken$ = this.select((state) => state.accessToken);
  accessTokenExpired$ = this.select((state) =>
    this.isJWTExpired(state.accessToken)
  );
  isLoggedIn$ = this.select((state) => !this.isJWTExpired(state.accessToken));
  refreshToken$ = this.select((state) => state.refreshToken);

  isJWTExpired(token: string) {
    if (!token) return true;
    const decoded = jwt_decode<JwtPayload>(token);
    if (decoded.exp) {
      return new Date(decoded.exp * 1000) < new Date(Date.now());
    }
    return true;
  }
}

// Gnosys user Actions

export const GnosysUserInitAction = createAction('Gnosys Init User');

export const GnosysUserVerifyEmailAction = createAction(
  'Verify Email',
  props<{ verification: string }>()
);

export const UserSetLoadingAction = createAction(
  'Set User Loading',
  props<{ isloading: boolean }>()
);

export const GnosysUserLoginAction = createAction(
  'Login Action',
  props<{ user: LoginFormData }>()
);

export const GnosysUserUpdateAction = createAction(
  'Gnosys User Update',
  props<{ user: User }>()
);

export const GnosysUserSignUpAction = createAction(
  'Gnosys User Sign up',
  props<{ data: User }>()
);

export const SignOutAction = createAction('Gnosys Sign Out');

// Gnosys User Effects

@Injectable({ providedIn: 'root' })
export class GnosysUserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private gnosysUserService: GnosysUserService,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  initGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserInitAction),
      tap(() => this.gnosysUserService.updateUser(initGnosysUser))
    )
  );

  gnosysUserIsLoading = createEffect(() =>
    this.actions$.pipe(
      ofType(UserSetLoadingAction),
      tap((payload) => this.gnosysUserService.setloading(payload.isloading))
    )
  );

  gnosysUserVerifyEmail = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserVerifyEmailAction),
      tap((payload) =>
        this.authService
          .verify(payload.verification)
          .pipe(take(1))
          .subscribe((user) => {
            this.actions$.dispatch(GnosysUserUpdateAction({ user }));
            this.tokenService.saveRefreshToken(user.accessToken);
            this.tokenService.saveRefreshToken(user.refreshToken);
            this.tokenService.saveUser(user);
          })
      )
    )
  );

  gnosysUserLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserLoginAction),
      map((payload) => payload.user),
      tap(() =>
        this.actions$.dispatch(UserSetLoadingAction({ isloading: true }))
      ),
      tap((user) =>
        this.authService
          .login(user)
          .pipe(take(1))
          .subscribe((user) => {
            this.tokenService.saveRefreshToken(user.accessToken);
            this.tokenService.saveRefreshToken(user.refreshToken);
            this.tokenService.saveUser(user);
            this.actions$.dispatch(GnosysUserUpdateAction({ user }));
            this.actions$.dispatch(UserSetLoadingAction({ isloading: false }));
          })
      )
    )
  );

  updateGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserUpdateAction),
      map((payload) => payload.user),
      tap((user) => {
        this.gnosysUserService.updateUser({ ...user });
        this.router.navigate(['user']);
      })
    )
  );

  signOutGnosys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignOutAction),
      tap(() => {
        console.log('Sign Out');
        this.actions$.dispatch(GnosysUserInitAction);
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
