/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfReportBuilderDragData } from './report-builder-drag-data';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
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
}
