import { MatDialogRef } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderToolbarDialog {
    private _service;
    private _dialogRef;
    constructor(_service: AjfReportBuilderService, _dialogRef: MatDialogRef<AjfReportBuilderToolbarDialog>);
    resetReport(): void;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderToolbarDialog, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderToolbarDialog, "toolbar-dialog", never, {}, {}, never, never>;
}
