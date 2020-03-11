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
import { OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderThemeColorDialog } from './theme-color-dialog';
/**
 * this component manages the report text
 *
 * @export
 */
export declare class AjfReportBuilderThemeColor implements OnInit, OnDestroy {
    private _service;
    dialog: MatDialog;
    currentWidget: AjfWidget | null;
    alphaColor: number;
    colors: string[];
    currentColor: string;
    getColorWidget: Observable<string>;
    dialogRef: MatDialogRef<AjfReportBuilderThemeColorDialog>;
    styleBackgroundColor: string;
    styleColor: string;
    section: string;
    label: string;
    init: string;
    /**
     * the name of the section that contains the currentWidget
     *
     * @memberOf AjfReportBuilderProperties
     */
    origin: string;
    private _colorsSub;
    private _currentWidgetSub;
    private _originSub;
    private _headerStyleSub;
    private _contentStylesSub;
    private _footerStylesSub;
    constructor(_service: AjfReportBuilderService, dialog: MatDialog);
    setStyles(value: any): void;
    setChartStyle(value: any): void;
    setAlphaColor(value: any): void;
    /**
     * call to service to add new style to widget
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    setWidgetStyles(value: any): void;
    /**
     * call to service to add new style to section
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    setSectionStyles(value: any): void;
    /**
     * call to service to add new style to report
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    setReportStyles(value: any): void;
    /**
     * call to service to add background color to current chart
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    addChartBackgroundColor(value: any): void;
    /**
     * call to service to add border color to current chart
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    addChartBorderColor(value: any): void;
    setStyle(): void;
    openDialog(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
