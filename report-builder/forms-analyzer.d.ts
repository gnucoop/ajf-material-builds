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
import { AjfForm } from '@ajf/core/forms';
import { AjfWidget } from '@ajf/core/reports';
import { OnDestroy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AjfReportBuilderFormsAnalyzerDialog } from './forms-analyzer-dialog';
import { AjfFormVariables } from './models';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
/**
 * this component provides the support for connect the form fields with the report
 *
 * @export
 */
export declare class AjfReportBuilderFormsAnalyzer implements OnDestroy {
    private _service;
    dialog: MatDialog;
    currentWidget: AjfWidget | null;
    forms: AjfForm[];
    formsVariables: AjfFormVariables[];
    choicesOrigins: any;
    dialogRef: MatDialogRef<AjfReportBuilderFormsAnalyzerDialog>;
    currentMainDataIndex: number;
    private _dataset;
    private _currentWidgetSub;
    private _formAnalyzerSub;
    constructor(_service: AjfReportBuilderService, dialog: MatDialog);
    setCurrentIndex(index: number): void;
    isSelected(index: number): ThemePalette;
    /**
     *  get the X components label of the chart.
     *  they are contained in the first row of dataset
     *
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    getMainData(): string[];
    /**
     *  get the Y components label of the chart.
     *  they are contained in the first column of dataset
     *
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    getDataset(): string[];
    /**
     * get the related data label of the chart.
     * they are contained in the row of the Y component
     *
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    getRelatedData(): string[];
    getTableHeader(): string[];
    getTableData(): string[];
    needMainData(): boolean;
    removeMainData(index: number): void;
    removeDataset(index: number): void;
    removeTableMainData(index: number): void;
    removeRelatedData(index: number): void;
    removeData(mainIndex: number, index: number): void;
    /**
     *
     *
     *
     * @param index
     * @param editMode
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    openDialog(level: number, mainIndex: number, index: number, editMode: boolean): void;
    openDialogAddMainData(): void;
    openDialogChartEditMainData(): void;
    openDialogTableEditMainData(): void;
    openDialogChartAddDataset(): void;
    openDialogTableAddDataset(): void;
    openDialogChartAddDataOfDataset(): void;
    openDialogChartEditDataset(): void;
    openDialogTableEditDataset(index: number): void;
    openDialogChartEditDataOfDataset(index: number): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderFormsAnalyzer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderFormsAnalyzer, "ajf-report-builder-forms-analyzer", never, {}, {}, never, never>;
}
