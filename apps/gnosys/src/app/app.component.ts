import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserQuery } from './state';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loading$ = this.userQuery.loading$;
  constructor(private userQuery: UserQuery) {}
}
