import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', Validators.email),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password0: new FormControl('', Validators.required),
    password1: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCancel() {
    console.log(this.form.value);
  }

  onSubmit() {
    const data = {
      email: this.form.value.email,
      password: this.form.value.password0,
      givenName: this.form.value.firstName,
      familyName: this.form.value.lastName,
    };
    this.http
      .post('/api/user', data)
      .subscribe((what) => console.log('AAA', what));
  }
}
