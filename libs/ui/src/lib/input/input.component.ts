import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label = 'label';
  @Input() initialValue = '';
  @Input() validators = [];
  control = new FormControl(this.initialValue, this.validators);
}
