import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AlertState, AlertStore } from './alert.store';

@Injectable({ providedIn: 'root' })
export class AlertQuery extends QueryEntity<AlertState> {
  constructor(protected store: AlertStore) {
    super(store);
  }
}
