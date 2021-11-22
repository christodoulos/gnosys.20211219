import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

import { AuthService, TokenService } from '../../services';
import { Actions } from '@datorama/akita-ng-effects';

import { GnosysUserUpdateAction } from '../../state';
import { User } from '@gnosys/api-interfaces';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private actions: Actions
  ) {}

  ngOnInit(): void {
    return;
  }

  onSignIn() {
    this.authService.login(this.form.value).subscribe((data: User) => {
      console.log(data);
      this.actions.dispatch(GnosysUserUpdateAction({ user: data }));
      this.tokenService.saveToken(data.accessToken);
      this.tokenService.saveRefreshToken(data.refreshToken);
      this.tokenService.saveUser(data);
    });
  }
}
