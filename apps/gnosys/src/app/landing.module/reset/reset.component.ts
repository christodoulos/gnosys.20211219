import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { Actions } from '@datorama/akita-ng-effects';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, map } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  AlertErrorAction,
  UserForgotPasswordVerifyAction,
  UserQuery,
  UserResetPasswordAction,
} from '../../state';
import { ResetPasswordData } from '@gnosys/interfaces';

@Component({
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
@UntilDestroy()
export class ResetComponent implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });
  params = this.routerQuery.selectParams();
  email = this.userQuery.getValue().email;
  constructor(
    private actions: Actions,
    private routerQuery: RouterQuery,
    private userQuery: UserQuery
  ) {}

  ngOnInit(): void {
    this.params.pipe(take(1)).subscribe((verification) => {
      this.actions.dispatch(UserForgotPasswordVerifyAction(verification));
    });

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
        UserResetPasswordAction({
          data: {
            email: this.userQuery.getValue().email,
            password: this.form.controls.password.value,
          },
        })
      );
    } else {
      this.actions.dispatch(
        AlertErrorAction({
          message: 'Invalid Data. Cannot proceed',
        })
      );
    }
  }
}
