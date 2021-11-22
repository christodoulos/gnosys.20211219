import { Component, Input } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class InputComponent {
    constructor() {
        this.label = 'label';
        this.initialValue = '';
        this.validators = [];
        this.control = new FormControl(this.initialValue, this.validators);
    }
}
InputComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: InputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InputComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: InputComponent, selector: "ui-input", inputs: { label: "label", initialValue: "initialValue", validators: "validators" }, ngImport: i0, template: "<ng-template let-error let-text=\"text\" #tpl class=\"text-sm text-red-700\">\n  <div class=\"text-red-600 text-sm border border-red-600 p-1\">\n    {{ text }}\n  </div>\n</ng-template>\n<div class=\"flex flex-row items-center justify-end text-sm\">\n  <label\n    class=\"font-medium {{\n      control.dirty || control.touched\n        ? control.valid\n          ? ''\n          : 'text-red-600'\n        : ''\n    }}\"\n    >{{ label }}:</label\n  >\n  <div class=\"ml-2 {{control.valid?'':'flex flex-col justify-end'\">\n    <input\n      formControlName=\"control\"\n      class=\"p-1 outline-none {{\n        control.dirty || control.touched\n          ? control.valid\n            ? 'border border-green-600'\n            : 'border border-red-600'\n          : ''\n      }}\"\n    />\n  </div>\n</div>\n", styles: [""], directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: InputComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-input',
                    templateUrl: './input.component.html',
                    styleUrls: ['./input.component.css'],
                }]
        }], propDecorators: { label: [{
                type: Input
            }], initialValue: [{
                type: Input
            }], validators: [{
                type: Input
            }] } });
//# sourceMappingURL=input.component.js.map