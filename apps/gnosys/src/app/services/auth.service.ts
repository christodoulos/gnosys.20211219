import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  User,
  ForgotPassword,
  LoginFormData,
  SignUpFormData,
} from '@gnosys/interfaces';
import { TokenService } from '.';

const AUTH_API = '/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(data: LoginFormData): Observable<User> {
    return this.http.post<User>(`${AUTH_API}login`, data, httpOptions);
  }

  signup(data: SignUpFormData): Observable<User> {
    return this.http.post<User>(AUTH_API, data, httpOptions);
  }

  verify(verification: string): Observable<User> {
    return this.http.post<User>(
      `${AUTH_API}verify`,
      { verification },
      httpOptions
    );
  }

  forgot(email: string): Observable<ForgotPassword> {
    return this.http.post<ForgotPassword>(
      `${AUTH_API}forgot-password`,
      { email },
      httpOptions
    );
  }

  isLoggedIn() {
    return !!this.tokenService.getToken();
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(
      `${AUTH_API}signup`,
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  refreshToken(token: string) {
    return this.http.post(
      AUTH_API + 'refreshtoken',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}
