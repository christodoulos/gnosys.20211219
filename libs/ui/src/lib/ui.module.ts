import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
// import { AlertComponent } from './alert/alert.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [InputComponent, FormSimpleTopDownComponent, LoadingComponent],
  exports: [InputComponent, FormSimpleTopDownComponent, LoadingComponent],
})
export class UiModule {}
