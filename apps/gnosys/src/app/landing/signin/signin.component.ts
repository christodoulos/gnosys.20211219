import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

import { Actions } from '@datorama/akita-ng-effects';
import { GnosysUserLoginAction } from '../../state';

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
    this.actions.dispatch(GnosysUserLoginAction({ user: this.form.value }));
  }
}
