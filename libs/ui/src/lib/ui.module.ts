import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from './svg/all';

import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SvgIconsModule.forChild([...allIcons]),
  ],
  declarations: [InputComponent, AlertComponent, FormSimpleTopDownComponent],
  exports: [InputComponent, AlertComponent, FormSimpleTopDownComponent],
})
export class UiModule {}
