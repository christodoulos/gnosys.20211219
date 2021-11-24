import { Component, OnInit } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services';
import { GnosysUserVerifyEmailAction } from '../../state';

@Component({
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  params = this.query.selectParams();
  constructor(
    private actions: Actions,
    private query: RouterQuery,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    console.log('In verify component');
    this.params
      .pipe(take(1))
      .subscribe((verification) =>
        this.actions.dispatch(GnosysUserVerifyEmailAction(verification))
      );
  }
}
