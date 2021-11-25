import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class SvgIconComponent {
    constructor() {
        this.iconKey = 'solid-question-mark-circle'; // case of no input given
    }
}
SvgIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: SvgIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SvgIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: SvgIconComponent, selector: "ui-svg-icon", inputs: { iconKey: "iconKey" }, ngImport: i0, template: "<img src=\"/assets/svg/{{ iconKey }}.svg\" />\n", styles: [""] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: SvgIconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ui-svg-icon',
                    templateUrl: './svg-icon.component.html',
                    styleUrls: ['./svg-icon.component.css'],
                }]
        }], propDecorators: { iconKey: [{
                type: Input
            }] } });
//# sourceMappingURL=svg-icon.component.js.map