import { createAction, props } from '@datorama/akita-ng-effects';
import { AlertOptions } from './alert.model';

export const AlertSuccessAction = createAction(
  'NEW SUCCESS ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertErrorAction = createAction(
  'NEW ERROR ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertInfoAction = createAction(
  'NEW INFO ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertWarnAction = createAction(
  'NEW WARN ALERT',
  props<{ message: string; header?: string; options?: AlertOptions }>()
);

export const AlertDismissAction = createAction(
  'DISMISS ALERT',
  props<{ id: string }>()
);
