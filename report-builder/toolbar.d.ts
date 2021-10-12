import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfReportBuilderDragData } from './report-builder-drag-data';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderToolbar {
    private _service;
    dialog: MatDialog;
    addClick: EventEmitter<any>;
    dialogRef: MatDialogRef<AjfReportBuilderToolbarDialog>;
    zoom: boolean;
    lastJson: string;
    emptyContent: Observable<boolean>;
    constructor(_service: AjfReportBuilderService, dialog: MatDialog);
    canDropPredicate(item: CdkDrag<AjfReportBuilderDragData>): boolean;
    JSONRequest(): void;
    /**
     * this method will pass event to event emitter
     */
    onAddClick(event: any): void;
    addToList(event: CdkDragDrop<AjfReportBuilderDragData>): void;
    undoLastOperation(): void;
    isZoomed(): void;
    openDialog(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderToolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderToolbar, "ajf-report-builder-toolbar", never, {}, { "addClick": "addClick"; }, never, never>;
}
