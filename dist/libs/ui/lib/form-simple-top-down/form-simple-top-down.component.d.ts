import { OnInit } from '@angular/core';
import { FormControl, FormGroup, ControlsOf } from '@ngneat/reactive-forms';
import { Generic, Controls } from '@gnosys/interfaces';
import * as i0 from "@angular/core";
export declare class FormSimpleTopDownComponent implements OnInit {
    formGroup: FormGroup<ControlsOf<Generic>>;
    controls: Array<Controls>;
    ngOnInit(): void;
    getError(control: FormControl<string>): "" | "The field is required" | "Must be an email" | "The field must be longer" | "The fields do not match";
    statCase(s: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormSimpleTopDownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormSimpleTopDownComponent, "ui-form-simple-top-down", never, { "formGroup": "formGroup"; }, {}, never, never>;
}
