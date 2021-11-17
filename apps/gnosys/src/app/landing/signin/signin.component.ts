import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSignIn() {
    const data = {};
    this.http.post('/api/user', data);
  }
}
