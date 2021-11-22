import { Component, OnInit } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { SignOutAction } from '../../state';

@Component({
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css'],
})
export class UserLandingComponent implements OnInit {
  constructor(private actions: Actions) {}

  ngOnInit(): void {}

  logout() {
    this.actions.dispatch(SignOutAction);
  }
}
