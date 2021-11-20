import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, ControlsOf } from '@ngneat/reactive-forms';
import { Generic, Controls } from '@gnosys/api-interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'ui-form-simple-top-down',
  templateUrl: './form-simple-top-down.component.html',
  styleUrls: ['./form-simple-top-down.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSimpleTopDownComponent implements OnInit {
  @Input() formGroup!: FormGroup<ControlsOf<Generic>>;
  controls: Array<Controls> = [];

  ngOnInit(): void {
    for (const [k, v] of Object.entries(this.formGroup.controls)) {
      this.controls.push({ name: k, value: v });
    }
  }

  getError(control: FormControl<string>) {
    if (control.errors != null) {
      const error = Object.keys(control.errors)[0];
      switch (error) {
        case 'required':
          return 'The field is required';
        case 'email':
          return 'Must be an email';
        case 'minlength':
          return 'The field must be longer';
        case 'mustMatch':
          return 'The fields do not match';
      }
    }
    return '';
  }

  statCase(s: string): string {
    return _.startCase(s);
  }
}
