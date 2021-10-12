import { MatDialogRef } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderCustomWidgetDialog {
    private _service;
    private _dialogRef;
    label: string;
    position: number;
    constructor(_service: AjfReportBuilderService, _dialogRef: MatDialogRef<AjfReportBuilderCustomWidgetDialog>);
    changeLabel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderCustomWidgetDialog, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderCustomWidgetDialog, "custom-widget-dialog", never, { "label": "label"; "position": "position"; }, {}, never, never>;
}
