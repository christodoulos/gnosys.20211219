import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions } from '@datorama/akita-ng-effects';
import { AlertDismissAction, AlertQuery } from '../../state';

@Component({
  selector: 'gnosys-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
  alerts$ = this.query.selectAll();

  constructor(private query: AlertQuery, private actions: Actions) {}

  onDismiss(id: string) {
    this.actions.dispatch(AlertDismissAction({ id }));
  }
}
