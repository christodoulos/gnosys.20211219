import { Component, ChangeDetectionStrategy, Input, } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class FormSimpleTopDownComponent {
    constructor() {
        this.controls = [];
    }
    ngOnInit() {
        for (const [k, v] of Object.entries(this.formGroup.controls)) {
            this.controls.push({ name: k, value: v });
        }
    }
    getError(control) {
        if (control.errors != null) {
            const error = Object.keys(control.errors)[0];
            switch (error) {
                case 'required':
                    return 'The field is required';
                case 'email':
                    return 'Must be an email';
                case 'minlength':
                    return 'The field must be longer';
                case 'mustMatch':
                    return 'The fields do not match';
            }
        }
        return '';
    }
    statCase(s) {
        return _.startCase(s);
    }
}
FormSimpleTopDownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: FormSimpleTopDownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
FormSimpleTopDownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: FormSimpleTopDownComponent, selector: "ui-form-simple-top-down", inputs: { formGroup: "formGroup" }, ngImport: i0, template: "<form [formGroup]=\"formGroup\">\n  <div class=\"space-y-3 text-sm\">\n    <div\n      *ngFor=\"let control of controls\"\n      class=\"flex flex-row justify-end items-center\"\n    >\n      <div class=\"flex flex-row justify-end items-center\">\n        <label\n          class=\"{{\n            control.value.dirty || control.value.touched\n              ? control.value.valid\n                ? ''\n                : 'text-red-600'\n              : ''\n          }} mr-2 font-semibold\"\n          >{{ statCase(control.name) }}:</label\n        >\n        <div class=\"flex flex-col\">\n          <input\n            formControlName=\"{{ control.name }}\"\n            type=\"{{\n              control.name.toLowerCase().includes('password')\n                ? 'password'\n                : 'text'\n            }}\"\n            class=\"{{\n              control.value.dirty || control.value.touched\n                ? control.value.valid\n                  ? ''\n                  : 'border border-red-600'\n                : ''\n            }} outline-none p-1\"\n          />\n          <span\n            *ngIf=\"\n              (control.value.dirty || control.value.touched) &&\n              control.value.invalid\n            \"\n            class=\"mt-1 text-xs text-red-600 font-semibold\"\n            >{{ getError(control.value) }}</span\n          >\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n", styles: [""], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: FormSimpleTopDownComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-form-simple-top-down',
                    templateUrl: './form-simple-top-down.component.html',
                    styleUrls: ['./form-simple-top-down.component.css'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { formGroup: [{
                type: Input
            }] } });
//# sourceMappingURL=form-simple-top-down.component.js.map