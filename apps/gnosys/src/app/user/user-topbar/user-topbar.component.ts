import { Component } from '@angular/core';
import { GnosysUserQuery } from '../../state';

@Component({
  templateUrl: './user-topbar.component.html',
  styleUrls: ['./user-topbar.component.css'],
})
export class UserTopbarComponent {
  constructor(private userQuery: GnosysUserQuery) {}

  displayName$ = this.userQuery.displayName$;
}
