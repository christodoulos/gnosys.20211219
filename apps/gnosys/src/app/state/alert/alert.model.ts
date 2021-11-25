export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}

export interface AlertOptions {
  autodismiss?: boolean;
  duration?: number;
  keepAfterRouteChange?: boolean;
}

export interface Alert {
  id: string;
  type: AlertType;
  header?: string;
  message: string;
  autodismiss?: boolean;
  duration?: number;
  keepAfterRouteChange?: boolean;
}
