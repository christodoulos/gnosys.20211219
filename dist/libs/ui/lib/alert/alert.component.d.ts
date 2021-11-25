import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare enum AlertType {
    Success = 0,
    Error = 1,
    Info = 2,
    Warning = 3
}
export declare class AlertComponent implements OnInit {
    alertType: AlertType;
    header: string | undefined;
    message: string;
    autodismiss: boolean;
    duration: number;
    dismiss: EventEmitter<boolean>;
    ngOnInit(): void;
    get _color(): "green" | "red" | "yellow" | "blue";
    get color(): {
        bg: string;
        txt: string;
        bold: string;
        icon: string;
        dismiss_txt: string;
        dismiss_hover: string;
        dismiss_focus_ring_offset: string;
        dismiss_focus: string;
    };
    onDismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AlertComponent, "ui-alert", never, { "alertType": "alertType"; "header": "header"; "message": "message"; "autodismiss": "autodismiss"; "duration": "duration"; }, { "dismiss": "dismiss"; }, never, never>;
}
