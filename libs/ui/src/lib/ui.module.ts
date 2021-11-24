import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
// import { AlertComponent } from './alert/alert.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [InputComponent, FormSimpleTopDownComponent],
  exports: [InputComponent, FormSimpleTopDownComponent],
})
export class UiModule {}
