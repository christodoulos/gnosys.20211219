import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  @Input() alertType = AlertType.Info;
  @Input() header: string | undefined;
  @Input() message = 'Alert Message';
  @Input() autodismiss = false;
  @Input() duration = 0;
  @Output() dismiss: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    if (this.header === undefined) {
      switch (this.alertType) {
        case AlertType.Success:
          this.header = 'Success';
          break;
        case AlertType.Error:
          this.header = 'Error';
          break;
        case AlertType.Warning:
          this.header = 'Warning';
          break;
        case AlertType.Info:
          this.header = 'Info';
          break;
      }
    }
    if (this.autodismiss) {
      setTimeout(() => this.dismiss.emit(), this.duration * 1000);
    }
  }

  get _color() {
    switch (this.alertType) {
      case AlertType.Success:
        return 'green';
      case AlertType.Error:
        return 'red';
      case AlertType.Warning:
        return 'yellow';
      case AlertType.Info:
        return 'blue';
    }
  }

  get color() {
    return {
      bg: `bg-${this._color}-50`,
      txt: `text-${this._color}-700`,
      bold: `text-${this._color}-800`,
      icon: `text-${this._color}-400`,
      dismiss_txt: `text-${this._color}-500`,
      dismiss_hover: `bg-${this._color}-100`,
      dismiss_focus_ring_offset: `ring-offset-${this._color}-50`,
      dismiss_focus: `ring-${this._color}-600`,
    };
  }

  onDismiss() {
    this.dismiss.emit();
  }

  iconKey(): string | undefined {
    switch (this.alertType) {
      case AlertType.Success:
        return 'solid-check-circle';
      case AlertType.Error:
        return 'solid-x-circle';
      case AlertType.Warning:
        return 'solid-exclamation';
      case AlertType.Info:
        return 'solid-information-circle';
    }
  }
}
