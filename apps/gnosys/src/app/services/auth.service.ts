import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User, LoginFormData } from '@gnosys/api-interfaces';

const AUTH_API = '/api/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginFormData): Observable<any> {
    return this.http.post(`${AUTH_API}login`, data, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
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
