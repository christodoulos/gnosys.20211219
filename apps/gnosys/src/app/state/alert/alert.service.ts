import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { AlertOptions, AlertType } from './alert.model';
import { AlertStore } from './alert.store';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private alertStore: AlertStore) {}

  add(
    message: string,
    type: AlertType,
    header?: string,
    options?: AlertOptions
  ) {
    this.alertStore.add({ id: guid(), message, type, header, ...options });
  }

  update(id: string, alert: AlertOptions) {
    this.alertStore.update(id, alert);
  }

  remove(id: string) {
    this.alertStore.remove(id);
  }
}
