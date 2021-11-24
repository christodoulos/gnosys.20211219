import { Component } from '@angular/core';
import { GnosysUserQuery } from './state';

@Component({
  selector: 'gnosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loading$ = this.userQuery.loading$;
  constructor(private userQuery: GnosysUserQuery) {}
}
