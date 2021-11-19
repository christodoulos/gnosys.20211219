import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, map } from 'rxjs';

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
  email = this.form.get('email');
  firstName = this.form.get('firstName');
  lastName = this.form.get('lastName');
  password = this.form.get('password');
  confirmPassword = this.form.get('confirmPassword');

  // constructor() {}

  ngOnInit(): void {
    combineLatest([
      this.form.select((state) => state.password),
      this.form.select((state) => state.confirmPassword),
    ])
      .pipe(
        map(([password, confirmPassword]) => {
          console.log(password, confirmPassword);
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

    this.email.errors$.pipe(untilDestroyed(this)).subscribe((value) => {
      console.log('Mail errors', value);
    });

    this.password.errors$.pipe(untilDestroyed(this)).subscribe((value) => {
      console.log('Password errors', value);
    });
  }

  onSubmit() {
    console.log(this.form.value);
    //   console.log(this.form.valid);
    //   const data = {
    //     email: this.form.value.email,
    //     password: this.form.value.password,
    //     givenName: this.form.value.firstName,
    //     familyName: this.form.value.lastName,
    //   };
    //   this.http
    //     .post('/api/user', data)
    //     .subscribe((what) => console.log('AAA', what));
    // }
  }
}
