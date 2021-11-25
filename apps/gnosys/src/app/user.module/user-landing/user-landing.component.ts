import { Component } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { UserSignOutAction } from '../../state';

@Component({
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent {
  constructor(private actions: Actions) {}

  logout() {
    this.actions.dispatch(UserSignOutAction);
  }
}
