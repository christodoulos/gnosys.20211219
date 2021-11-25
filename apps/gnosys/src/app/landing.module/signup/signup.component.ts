import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, map } from 'rxjs';
import { Actions } from '@datorama/akita-ng-effects';

import { UserSignUpAction } from '../../state';
import { SignUpFormData } from '@gnosys/interfaces';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
@UntilDestroy()
export class SignupComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private actions: Actions) {}

  ngOnInit(): void {
    combineLatest([
      this.form.select((state) => state.password),
      this.form.select((state) => state.confirmPassword),
    ])
      .pipe(
        map(([password, confirmPassword]) => {
          if (password !== confirmPassword)
            this.form.get('confirmPassword').setErrors({ mustMatch: true });
          return password === confirmPassword ? null : { mustMatch: true };
        })
      )
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          this.form.get('password').mergeErrors(value);
        } else {
          this.form.get('password').removeError('mustMatch');
        }
      });
  }

  onSubmit() {
    if (this.form.valid) {
      this.actions.dispatch(
        UserSignUpAction({ data: this.form.value as SignUpFormData })
      );
    }
  }
}
