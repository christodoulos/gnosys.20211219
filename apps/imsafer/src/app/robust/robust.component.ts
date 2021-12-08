import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

@Component({
  selector: 'gnosys-robust',
  templateUrl: './robust.component.html',
  styleUrls: ['./robust.component.css'],
})
export class RobustComponent implements OnInit {
  result = 0;
  form = new FormGroup({
    buildingWidth: new FormControl(''),
    buildingHeight: new FormControl(''),
    distance: new FormControl(''),
    explosives: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  calc() {
    const a = parseInt(this.form.controls.buildingWidth.value);
    const b = parseInt(this.form.controls.buildingHeight.value);
    const c = parseInt(this.form.controls.distance.value);
    const d = parseInt(this.form.controls.explosives.value);
    this.result = a + b + c + d;
  }
}
