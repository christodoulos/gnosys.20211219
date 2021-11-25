import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Alert } from './alert.model';

export type AlertState = EntityState<Alert>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'alert' })
export class AlertStore extends EntityStore<AlertState> {
  constructor() {
    super();
  }
}
