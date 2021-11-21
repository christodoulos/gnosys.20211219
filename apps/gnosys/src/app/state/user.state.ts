import { Injectable } from '@angular/core';
import { Store, StoreConfig, Query } from '@datorama/akita';
import {
  Actions,
  createAction,
  createEffect,
  ofType,
  props,
} from '@datorama/akita-ng-effects';

import { User } from '@gnosys/api-interfaces';
import { map, tap } from 'rxjs/operators';
import { TokenService } from '../services';

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
  access_token: '',
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
}

// Gnosys user Query

@Injectable({ providedIn: 'root' })
export class GnosysUserQuery extends Query<User> {
  constructor(protected store: GnosysUserStore) {
    super(store);
  }
  role$ = this.select((state) => state.roles);
  userEmail$ = this.select((state) => state.email);
}

// Gnosys user Actions

export const GnosysUserInitAction = createAction('Gnosys Init User');

export const GnosysUserUpdateAction = createAction(
  'Gnosys User Update',
  props<{ user: User }>()
);

export const GnosysUserSignUpAction = createAction(
  'Gnosys User Sign up',
  props<{ data: User }>()
);

// Gnosys User Effects

@Injectable({ providedIn: 'root' })
export class GnosysUserEffects {
  constructor(
    private actions$: Actions,
    private gnosysUserService: GnosysUserService,
    private tokenService: TokenService
  ) {}

  initGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserInitAction),
      tap(() => this.gnosysUserService.updateUser(initGnosysUser))
    )
  );

  updateGnosysUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GnosysUserUpdateAction),
      map((payload) => payload.user),
      tap((user) => {
        console.log('ganmo to spiti sas', user);
        this.gnosysUserService.updateUser({ ...user });
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
