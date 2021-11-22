import { Component, OnInit } from '@angular/core';
import { GnosysUserQuery } from './state';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';

import { SignOutAction } from './state';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private userQuery: GnosysUserQuery,
    private router: Router,
    private actions: Actions
  ) {}
  isLoggedIn$ = this.userQuery.isLoggedIn$;

  ngOnInit(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['user']);
      } else {
        this.actions.dispatch(SignOutAction);
      }
    });
  }
}
