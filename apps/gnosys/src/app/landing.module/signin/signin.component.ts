import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

import { Actions } from '@datorama/akita-ng-effects';
import { UserLoginAction, UserForgotPasswordAction } from '../../state';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(private actions: Actions) {}

  onSignIn() {
    this.actions.dispatch(UserLoginAction({ user: this.form.value }));
  }

  onForgotPassword() {
    this.actions.dispatch(
      UserForgotPasswordAction({ email: this.form.controls.email.value })
    );
  }
}
