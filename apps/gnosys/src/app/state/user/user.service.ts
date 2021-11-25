import { Injectable } from '@angular/core';
import { User } from '@gnosys/interfaces';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private store: UserStore) {}
  updateUser(user: Partial<User>) {
    this.store.update({ ...user });
  }
  setloading(isloading: boolean) {
    this.store.update({ loading: isloading });
  }
}
