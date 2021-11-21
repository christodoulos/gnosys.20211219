import { Injectable } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { User } from '@gnosys/api-interfaces';
import { initGnosysUser, GnosysUserService, GnosysUserQuery } from '../state';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private userService: GnosysUserService,
    private userQuery: GnosysUserQuery,
    private actions: Actions
  ) {}

  signOut(): void {
    this.userService.updateUser(initGnosysUser);
  }

  saveToken(token: string): void {
    this.userService.updateUser({ access_token: token });
  }

  saveUser(user: User): void {
    this.userService.updateUser(user);
  }

  getToken(): string | null {
    return this.userQuery.getValue().access_token;
  }
}
