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
import { AjfWidget } from '@ajf/core/reports';
import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
export declare class AjfReportBuilderThemeColorDialog implements OnInit, AfterViewInit, OnDestroy {
    private _service;
    private _dialogRef;
    elem: any;
    currentWidget: AjfWidget | null;
    currentColor: string;
    section: string;
    private _currentWidgetSub;
    constructor(_service: AjfReportBuilderService, _dialogRef: MatDialogRef<AjfReportBuilderThemeColorDialog>);
    setWidgetStyles(value: any): void;
    setStyle(): void;
    addCustomColor(): void;
    close(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
