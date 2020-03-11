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
import { AjfValidationService } from '@ajf/core/forms';
import { AjfAggregationType, AjfDataset, AjfWidget } from '@ajf/core/reports';
import { AjfMonacoEditor } from '@ajf/material/monaco-editor';
import { AfterViewChecked, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AjfFormVariables } from './models';
import { AjfReportBuilderService } from './report-builder-service';
export declare enum AjfDataType {
    MainData = 0,
    Dataset = 1,
    RelatedData = 2,
    LENGTH = 3
}
export declare class AjfReportBuilderFormsAnalyzerDialog implements OnInit, AfterViewChecked, OnDestroy {
    private _service;
    private _dialogRef;
    aggregationTypes: string[];
    operators: string[];
    formulaText: string;
    formulaDate: string;
    safeFormulaText: string;
    label: string;
    condition: string;
    aggregationType: AjfAggregationType;
    dataset: AjfDataset;
    currentId: number;
    currentIndex: number;
    labels: string[];
    currentWidget: AjfWidget | null;
    formsVariables: AjfFormVariables[];
    formsVariablesName: string[];
    formsVariablesType: string[];
    isValid: boolean;
    formula: string;
    isFormula: boolean;
    labelText: string;
    aggregation: number;
    init: boolean;
    level: number;
    index: number;
    mainIndex: number;
    reference: any;
    monacoEditor: AjfMonacoEditor;
    private _formAnalyzerSub;
    private _currentWidgetSub;
    private _first;
    constructor(_service: AjfReportBuilderService, _dialogRef: MatDialogRef<AjfReportBuilderFormsAnalyzerDialog>, _: AjfValidationService);
    onEditorInit(): void;
    private _initFormsVariablesNames;
    private _updateVariables;
    private _updateFunctions;
    private _fieldVarType;
    setCurrent(id: number, label: string, index: number): void;
    setCurrentId(id: number): void;
    setAggregationType(type: AjfAggregationType): void;
    checkValidation(): void;
    validateFormula(): boolean;
    saveDataset(): void;
    saveImageFormula(): void;
    saveFormulaHtml(): void;
    saveChartFormula(): void;
    saveTableFormula(): void;
    insertVariable(variable: string): void;
    setVariable(variable: string): void;
    reset(): void;
    close(): void;
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
}
