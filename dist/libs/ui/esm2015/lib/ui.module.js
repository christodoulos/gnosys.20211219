import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { FormSimpleTopDownComponent } from './form-simple-top-down/form-simple-top-down.component';
import { LoadingComponent } from './loading/loading.component';
import { AlertComponent } from './alert/alert.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import * as i0 from "@angular/core";
export class UiModule {
}
UiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, declarations: [InputComponent,
        FormSimpleTopDownComponent,
        LoadingComponent,
        AlertComponent,
        SvgIconComponent], imports: [CommonModule, ReactiveFormsModule], exports: [InputComponent,
        FormSimpleTopDownComponent,
        LoadingComponent,
        AlertComponent,
        SvgIconComponent] });
UiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, imports: [[CommonModule, ReactiveFormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: UiModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=ui.module.js.map