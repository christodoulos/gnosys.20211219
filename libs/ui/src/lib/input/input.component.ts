import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label = 'label';
  @Input() initialValue = '';
  @Input() validators = [];
  control = new FormControl(this.initialValue, this.validators);
  constructor() {}

  ngOnInit(): void {}
}
