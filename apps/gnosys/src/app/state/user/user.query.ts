import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { User } from '@gnosys/interfaces';
import { UserStore } from './user.store';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<User> {
  constructor(protected store: UserStore) {
    super(store);
  }

  displayName$ = this.select((state) => state.displayName);
  lastName$ = this.select((state) => state.lastName);
  firstName$ = this.select((state) => state.firstName);
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
