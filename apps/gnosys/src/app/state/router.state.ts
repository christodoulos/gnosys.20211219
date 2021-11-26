import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Actions,
  createAction,
  createEffect,
  ofType,
} from '@datorama/akita-ng-effects';
import { tap } from 'rxjs/operators';

export const RouterNavigateRootAction = createAction('Navigate to /');

@Injectable({ providedIn: 'root' })
export class GnosysRouterEffects {
  constructor(private actions: Actions, private router: Router) {}

  NavigateRootEffect = createEffect(() =>
    this.actions.pipe(
      ofType(RouterNavigateRootAction),
      tap(() => this.router.navigate(['']))
    )
  );
}
