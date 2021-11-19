import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from './svg/all';

import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule.forChild([...allIcons])],
  declarations: [InputComponent, AlertComponent],
  exports: [InputComponent, AlertComponent],
})
export class UiModule {}
