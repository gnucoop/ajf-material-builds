/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
import { OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export interface AjfStyles {
    [style: string]: any;
}
export interface CustomWidget {
    json: string;
    type: string;
}
export interface CustomWidgets {
    widgets: CustomWidget[];
}
export declare class AjfReportBuilderCustomWidgetsToolbar implements OnDestroy, OnInit {
    private _service;
    dialog: MatDialog;
    customWidgets: CustomWidget[];
    private _customWidgetsSub;
    private _dialogRef;
    private _threeColumnsLayout;
    private _fourColumnsLayout;
    constructor(_service: AjfReportBuilderService, dialog: MatDialog);
    openDialog(idx: number): void;
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragStartHandler(): void;
    /**
     * sign the end of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragEndHandler(): void;
    /**
     *  sign the enter of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragEnterHandler(array: string, index: number): void;
    /**
     * sign the leave of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragLeaveHandler(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderCustomWidgetsToolbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderCustomWidgetsToolbar, "ajf-report-builder-custom-widgets-toolbar", never, {}, {}, never, never>;
}
