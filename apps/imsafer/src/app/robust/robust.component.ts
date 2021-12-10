import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'gnosys-robust',
  templateUrl: './robust.component.html',
  styleUrls: ['./robust.component.css'],
})
export class RobustComponent implements OnInit {
  result = 0;
  numberRegEx = /^-?\d*\.?\d*$/;
  form = new FormGroup({
    buildingWidth: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    buildingHeight: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    distance: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    explosives: new FormControl('', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  calc() {
    // console.log(this.form);
    const a = parseFloat(this.form.controls.buildingWidth.value);
    const b = parseFloat(this.form.controls.buildingHeight.value);
    const c = parseFloat(this.form.controls.distance.value);
    const d = parseFloat(this.form.controls.explosives.value);
    this.result = a + b + c + d;
  }
}
