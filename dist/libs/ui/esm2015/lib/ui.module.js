import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { allIcons } from './svg/all';
import { InputComponent } from './input/input.component';
import { AlertComponent } from './alert/alert.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';
import * as i0 from "@angular/core";
import * as i1 from "@ngneat/svg-icon";
export class UiModule {
}
UiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, declarations: [InputComponent, AlertComponent, FormSimpleTopDownComponent], imports: [CommonModule,
        ReactiveFormsModule, i1.SvgIconsModule], exports: [InputComponent, AlertComponent, FormSimpleTopDownComponent] });
UiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            SvgIconsModule.forChild([...allIcons]),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        SvgIconsModule.forChild([...allIcons]),
                    ],
                    declarations: [InputComponent, AlertComponent, FormSimpleTopDownComponent],
                    exports: [InputComponent, AlertComponent, FormSimpleTopDownComponent],
                }]
        }] });
//# sourceMappingURL=ui.module.js.map