import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';
import { LoadingComponent } from './loading/loading.component';
import { AlertComponent } from './alert/alert.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    InputComponent,
    FormSimpleTopDownComponent,
    LoadingComponent,
    AlertComponent,
    SvgIconComponent,
  ],
  exports: [
    InputComponent,
    FormSimpleTopDownComponent,
    LoadingComponent,
    AlertComponent,
    SvgIconComponent,
  ],
})
export class UiModule {}
