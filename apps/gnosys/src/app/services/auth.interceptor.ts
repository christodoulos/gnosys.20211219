import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { TokenService } from './token.service';
import { catchError, Observable, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Actions } from '@datorama/akita-ng-effects';
import {
  AlertErrorAction,
  RouterNavigateRootAction,
  UserIsLoadingAction,
} from '../state';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenService, private actions: Actions) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    this.actions.dispatch(UserIsLoadingAction({ isloading: true }));
    console.log(req);
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (
          error instanceof HttpErrorResponse &&
          authReq.url.includes('forgot-password-verify')
        ) {
          this.actions.dispatch(RouterNavigateRootAction);
        }
        return throwError(() => {
          this.actions.dispatch(
            AlertErrorAction({
              message: error.error.message,
            })
          );
        });
      }),
      finalize(() =>
        this.actions.dispatch(UserIsLoadingAction({ isloading: false }))
      )
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
