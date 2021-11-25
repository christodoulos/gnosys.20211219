import { Component } from '@angular/core';
import { UserQuery } from '../../state';

@Component({
  templateUrl: './user-topbar.component.html',
  styleUrls: ['./user-topbar.component.css'],
})
export class UserTopbarComponent {
  constructor(private userQuery: UserQuery) {}

  displayName$ = this.userQuery.displayName$;
}
