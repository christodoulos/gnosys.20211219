import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
export class LoadingComponent {
    constructor() {
        this.message = 'Loading, please wait ...';
    }
}
LoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: LoadingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: LoadingComponent, selector: "ui-loading", inputs: { message: "message" }, ngImport: i0, template: "<div class=\"bg-yellow-500 flex flex-auto text-xs p-1 justify-center\">\n  {{ message }}\n</div>\n", styles: [""], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: LoadingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-loading',
                    templateUrl: './loading.component.html',
                    styleUrls: ['./loading.component.css'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { message: [{
                type: Input
            }] } });
//# sourceMappingURL=loading.component.js.map