import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngneat/svg-icon";
import * as i2 from "@angular/common";
export var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));
export class AlertComponent {
    constructor() {
        this.alertType = AlertType.Info;
        this.message = 'Alert Message';
        this.autodismiss = false;
        this.duration = 0;
        this.dismiss = new EventEmitter();
    }
    ngOnInit() {
        if (this.header === undefined) {
            switch (this.alertType) {
                case AlertType.Success:
                    this.header = 'Success';
                    break;
                case AlertType.Error:
                    this.header = 'Error';
                    break;
                case AlertType.Warning:
                    this.header = 'Warning';
                    break;
                case AlertType.Info:
                    this.header = 'Info';
                    break;
            }
        }
        if (this.autodismiss) {
            setTimeout(() => this.dismiss.emit(), this.duration * 1000);
        }
    }
    get _color() {
        switch (this.alertType) {
            case AlertType.Success:
                return 'green';
            case AlertType.Error:
                return 'red';
            case AlertType.Warning:
                return 'yellow';
            case AlertType.Info:
                return 'blue';
        }
    }
    get color() {
        return {
            bg: `bg-${this._color}-50`,
            txt: `text-${this._color}-700`,
            bold: `text-${this._color}-800`,
            icon: `text-${this._color}-400`,
            dismiss_txt: `text-${this._color}-500`,
            dismiss_hover: `bg-${this._color}-100`,
            dismiss_focus_ring_offset: `ring-offset-${this._color}-50`,
            dismiss_focus: `ring-${this._color}-600`,
        };
    }
    onDismiss() {
        this.dismiss.emit();
    }
    iconKey() {
        switch (this.alertType) {
            case AlertType.Success:
                return 'solid-check-circle';
            case AlertType.Error:
                return 'solid-x-circle';
            case AlertType.Warning:
                return 'solid-exclamation';
            case AlertType.Info:
                return 'solid-information-circle';
        }
    }
}
AlertComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: AlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AlertComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.13", type: AlertComponent, selector: "alert", inputs: { alertType: "alertType", header: "header", message: "message", autodismiss: "autodismiss", duration: "duration" }, outputs: { dismiss: "dismiss" }, ngImport: i0, template: "<div class=\"rounded-md {{ color.bg }} p-4\">\n  <div class=\"flex\">\n    <div class=\"flex-shrink-0\">\n      <svg-icon\n        key=\"{{ iconKey() }}\"\n        class=\"{{ color.icon }}\"\n        size=\"xl\"\n      ></svg-icon>\n    </div>\n    <div class=\"ml-3\">\n      <h3 class=\"text-sm font-medium {{ color.bold }}\">{{ header }}</h3>\n      <div class=\"mt-2 text-sm {{ color.txt }}\">\n        <p>\n          {{ message }}\n        </p>\n      </div>\n    </div>\n    <div class=\"ml-auto pl-3\" *ngIf=\"!autodismiss\">\n      <div class=\"-mx-1.5 -my-1.5\">\n        <button\n          type=\"button\"\n          class=\"\n              inline-flex\n              {{ color.bg }}\n              rounded-md\n              p-1.5\n              {{ color.dismiss_txt }}\n              hover:{{ color.dismiss_hover }}\n              focus:outline-none\n              focus:ring-2\n              focus:ring-offset-2\n              focus:{{ color.dismiss_focus_ring_offset }}\n              focus:{{ color.dismiss_focus }}\n            \"\n          (click)=\"onDismiss()\"\n        >\n          <span class=\"sr-only\">Dismiss</span>\n          <svg-icon [key]=\"'solid-x'\" [size]=\"'lg'\"></svg-icon>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [""], components: [{ type: i1.SvgIconComponent, selector: "svg-icon", inputs: ["noShrink", "key", "size", "width", "height", "fontSize", "color"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'alert',
                    templateUrl: './alert.component.html',
                    styleUrls: ['./alert.component.css'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { alertType: [{
                type: Input
            }], header: [{
                type: Input
            }], message: [{
                type: Input
            }], autodismiss: [{
                type: Input
            }], duration: [{
                type: Input
            }], dismiss: [{
                type: Output
            }] } });
//# sourceMappingURL=alert.component.js.map