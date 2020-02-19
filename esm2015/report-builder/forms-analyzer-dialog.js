/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/forms-analyzer-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfFieldType, AjfValidationService } from '@ajf/core/forms';
import { AjfImageType } from '@ajf/core/image';
import { AjfExpressionUtils, createFormula, validateExpression } from '@ajf/core/models';
import { AjfAggregationType } from '@ajf/core/reports';
import { sizedEnumToStringArray } from '@ajf/core/utils';
import { AjfMonacoEditor } from '@ajf/material/monaco-editor';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
/** @enum {number} */
const AjfDataType = {
    MainData: 0,
    Dataset: 1,
    RelatedData: 2,
    LENGTH: 3,
};
export { AjfDataType };
AjfDataType[AjfDataType.MainData] = 'MainData';
AjfDataType[AjfDataType.Dataset] = 'Dataset';
AjfDataType[AjfDataType.RelatedData] = 'RelatedData';
AjfDataType[AjfDataType.LENGTH] = 'LENGTH';
export class AjfReportBuilderFormsAnalyzerDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     * @param {?} _
     */
    constructor(_service, _dialogRef, _) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.aggregationTypes = sizedEnumToStringArray(AjfAggregationType);
        //  operators is an array of any type that contains all allow operators
        this.operators = [
            'true', 'false', '( )', '\' \'',
            '<', '<=', '>=', '>', '!=', '!',
            '&&', '||',
            '+', '-', '*', '/', '%', '=='
        ];
        this.formulaText = '';
        this.formulaDate = '';
        this.safeFormulaText = '';
        this.label = '';
        this.condition = '';
        this.aggregationType = AjfAggregationType.Sum;
        this.currentId = 0;
        this.currentIndex = 0;
        this.labels = [];
        this.currentWidget = null;
        this.formsVariablesName = [];
        this.formsVariablesType = [];
        this._formAnalyzerSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this._first = true;
        if (this.init == false) {
            this.formulaText = '';
            this.aggregationType = AjfAggregationType.Sum;
        }
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                this.currentWidget = (/** @type {?} */ (x));
                if (this.currentWidget.widgetType == 2) {
                    /** @type {?} */
                    let myObj = (/** @type {?} */ (this.currentWidget));
                    if (myObj.imageType == AjfImageType.Flag) {
                        this.formula = (myObj.flag) ? myObj.flag.formula : '';
                    }
                    else {
                        this.formula = (myObj.icon) ? myObj.icon.formula : '';
                    }
                }
            }
        }));
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (x != null) {
                this.formsVariables = x;
            }
        }));
    }
    /**
     * @return {?}
     */
    onEditorInit() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2015,
            allowNonTsExtensions: true,
            allowJs: true,
            module: monaco.languages.typescript.ModuleKind.None
        });
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-variables.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = '';
        }
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-functions.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-functions.d.ts'] = '';
        }
        this._initFormsVariablesNames();
        this._updateVariables();
        this._updateFunctions();
    }
    /**
     * @private
     * @return {?}
     */
    _initFormsVariablesNames() {
        this.formsVariables.forEach((/**
         * @param {?} formVar
         * @return {?}
         */
        (formVar) => {
            formVar.names.forEach((/**
             * @param {?} name
             * @return {?}
             */
            (name) => {
                this.formsVariablesName.push(name);
            }));
            formVar.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            (type) => {
                this.formsVariablesType.push(this._fieldVarType(type) || '');
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateVariables() {
        if (this.formsVariables == null) {
            return;
        }
        try {
            /** @type {?} */
            let value = '';
            for (let i = 0; i < this.formsVariablesName.length; i++) {
                value += `declare const ${this.formsVariablesName[i]}: ${this.formsVariablesType[i]};`;
            }
            value += `\n`;
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = value;
        }
        catch (e) { }
    }
    /**
     * @private
     * @return {?}
     */
    _updateFunctions() {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) { }
    }
    /**
     * @private
     * @param {?} fieldType
     * @return {?}
     */
    _fieldVarType(fieldType) {
        switch (fieldType) {
            case AjfFieldType.Boolean:
                return 'boolean';
            case AjfFieldType.Date:
            case AjfFieldType.DateInput:
            case AjfFieldType.Time:
                return 'Date';
            case AjfFieldType.Empty:
                return 'void';
            case AjfFieldType.Formula:
                return 'number';
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return 'any';
            case AjfFieldType.Number:
                return 'number';
            case AjfFieldType.Table:
                return 'Array';
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'string';
        }
        return null;
    }
    /**
     * @param {?} id
     * @param {?} label
     * @param {?} index
     * @return {?}
     */
    setCurrent(id, label, index) {
        if (!this.init) {
            this.label = label;
            this.init = true;
        }
        this.insertVariable(this.formsVariables[id].names[index] || '');
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setCurrentId(id) {
        this.currentId = id;
        this.labels = this.formsVariables[id].labels;
        this._updateVariables();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setAggregationType(type) {
        this.aggregationType = type;
    }
    /**
     * @return {?}
     */
    checkValidation() {
        if (this.validateFormula()) {
            this.safeFormulaText = this.formulaText;
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
        if (this.formulaText == '') {
            this.isValid = false;
        }
    }
    /**
     * @return {?}
     */
    validateFormula() {
        if (this.formulaText == '') {
            this.init = false;
        }
        if (this.formsVariables == null) {
            return false;
        }
        else {
            return validateExpression(this.formulaText, this.formsVariablesName);
        }
    }
    /**
     * @return {?}
     */
    saveDataset() {
        if (this.currentWidget != null) {
            switch (this.currentWidget.widgetType) {
                case 2:
                    this.saveImageFormula();
                    break;
                case 3:
                    this.saveFormulaHtml();
                    break;
                case 4:
                    this.saveChartFormula();
                    break;
                case 5:
                    this.saveTableFormula();
                    break;
            }
        }
        this.close();
    }
    /**
     * @return {?}
     */
    saveImageFormula() {
        this._service.saveImageFormula(createFormula({ formula: this.formulaText }));
    }
    /**
     * @return {?}
     */
    saveFormulaHtml() {
        this._service.saveFormulaToHtml(this.formulaText, this.reference);
    }
    /**
     * @return {?}
     */
    saveChartFormula() {
        this._service.saveChartFormula(this.label, this.level, this.mainIndex, this.index, this.formulaText, this.aggregationType);
    }
    /**
     * @return {?}
     */
    saveTableFormula() {
        this._service.saveTableFormula(this.label, this.aggregationType, this.formulaText, this.mainIndex, this.index);
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    insertVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            const editor = this.monacoEditor.editor;
            /** @type {?} */
            let value = editor.getValue().split('\n');
            /** @type {?} */
            let position = editor.getPosition();
            /** @type {?} */
            const ln = position.lineNumber - 1;
            /** @type {?} */
            let line = value[ln];
            /** @type {?} */
            let col = position.column - 1;
            line = line.substring(0, col) + variable + line.substring(col);
            value[ln] = line;
            position.column += variable.length;
            this.monacoEditor.value = value.join('\n');
            editor.setPosition(position);
            editor.focus();
            this.formulaText = editor.getValue();
            this.checkValidation();
        }
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    setVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            const editor = this.monacoEditor.editor;
            editor.setValue(variable);
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.formulaText = '';
        this.aggregationType = AjfAggregationType.None;
    }
    /**
     * @return {?}
     */
    close() {
        this.reset();
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formulaText = this.formula;
        this.aggregationType = this.aggregation;
        this.label = this.labelText;
        if (this.formulaText == '' || this.formulaText == null) {
            this.isValid = false;
        }
        else {
            this.isValid = true;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
            this.insertVariable(this.formulaText || '');
            this._first = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._formAnalyzerSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderFormsAnalyzerDialog.decorators = [
    { type: Component, args: [{
                selector: 'forms-analyzer-dialog',
                template: "<h3 matDialogTitle> Formula editor </h3>\n<div mat-dialog-content #elem>\n  <ng-template [ngIf]=\"currentWidget != null && formsVariables != null\">\n    <div class=\"ajf-left\">\n      <mat-list>\n        <mat-list-item *ngFor=\"let operator of operators\">\n          <button mat-button (click)=\"insertVariable(operator)\">\n            <h4 matLine>{{operator}}</h4>\n          </button>\n        </mat-list-item>\n      </mat-list>\n    </div>\n    <div class=\"ajf-main\">\n      <mat-select *ngIf=\"!isFormula\" placeholder=\"Select type of agregation\" [(ngModel)]=\"aggregationType\">\n          <mat-option [value]=\"idx\" *ngFor=\"let ag of aggregationTypes; let idx = index\"> {{ ag }} </mat-option>\n      </mat-select>\n      <mat-form-field *ngIf=\"!isFormula\">\n        <textarea matInput placeholder=\"Name field\" [(ngModel)]=\"label\" ></textarea>\n      </mat-form-field>\n        <ajf-monaco-editor\n          (init)=\"onEditorInit()\"\n          (valueChange)=\"formulaText = $event;checkValidation();\"\n          [value]=\"condition\" language=\"javascript\">\n        </ajf-monaco-editor>\n    </div>\n    <div class=\"ajf-menu\">\n      <form>\n        <mat-select placeholder=\"Select form\" (selectionChange)=\"setCurrentId($event.value)\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option [value]=\"id\"> {{ id }} </mat-option>\n          </ng-template>\n        </mat-select>\n      </form>\n      <mat-list>\n        <h3 matSubheader>Field list</h3>\n        <mat-list-item *ngFor=\"let label of labels;let i = index\">\n          <button mat-button (click)=\"setCurrent(currentId, label, i)\">\n            <h4 matLine>{{label}}</h4>\n          </button>\n        </mat-list-item>\n      </mat-list>\n    </div>\n  </ng-template>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"saveDataset()\" [disabled]=\"!isValid\">Save</button>\n</div>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["forms-analyzer-dialog{height:512px}forms-analyzer-dialog h4[matLine]{font-size:xx-small}forms-analyzer-dialog [mat-dialog-content]{flex-direction:row;display:flex;align-items:stretch;min-width:1000px}forms-analyzer-dialog [mat-dialog-content] .ajf-left{flex:1 0 10%;width:10%;overflow-y:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-left form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog [mat-dialog-content] .ajf-main{flex:1 0 55%;min-width:512px}forms-analyzer-dialog [mat-dialog-content] .ajf-main monaco-editor{height:450px;min-width:300px}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-select{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field textarea{width:auto;height:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-main textarea{width:80%;height:75px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu{flex:1 0 30%;overflow-y:auto;min-width:350px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog ajf-monaco-editor{min-width:400px}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderFormsAnalyzerDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef },
    { type: AjfValidationService }
];
AjfReportBuilderFormsAnalyzerDialog.propDecorators = {
    formula: [{ type: Input }],
    isFormula: [{ type: Input }],
    labelText: [{ type: Input }],
    aggregation: [{ type: Input }],
    init: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    mainIndex: [{ type: Input }],
    reference: [{ type: Input }],
    monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.aggregationTypes;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.operators;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formulaText;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formulaDate;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.safeFormulaText;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.label;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.condition;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.aggregationType;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.dataset;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.currentId;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.currentIndex;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.labels;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formsVariables;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formsVariablesName;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formsVariablesType;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.isValid;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formula;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.isFormula;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.labelText;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.aggregation;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.init;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.level;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.index;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.mainIndex;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.reference;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.monacoEditor;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._formAnalyzerSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._first;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2Zvcm1zLWFuYWx5emVyLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQ0wsa0JBQWtCLEVBQ25CLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDYSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQ3pGLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFakUsTUFBWSxXQUFXO0lBQ3JCLFFBQVEsR0FBQTtJQUNSLE9BQU8sR0FBQTtJQUNQLFdBQVcsR0FBQTtJQUNYLE1BQU0sR0FBQTtFQUNQOzs7Ozs7QUFVRCxNQUFNLE9BQU8sbUNBQW1DOzs7Ozs7SUE2RDlDLFlBQ1UsUUFBaUMsRUFDakMsVUFBNkQsRUFDckUsQ0FBdUI7UUFGZixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNq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QUUsdUJBQXVCO2dCQUNqQywrNkRBQXlDO2dCQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBaEJPLHVCQUF1QjtZQUp2QixZQUFZO1lBWkUsb0JBQW9COzs7c0JBNkR2QyxLQUFLO3dCQUdMLEtBQUs7d0JBR0wsS0FBSzswQkFHTCxLQUFLO21CQUdMLEtBQUs7b0JBR0wsS0FBSztvQkFHTCxLQUFLO3dCQUdMLEtBQUs7d0JBR0wsS0FBSzsyQkFHTCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7OztJQXJEM0MsK0RBQXdFOztJQUd4RSx3REFLRTs7SUFFRiwwREFBeUI7O0lBQ3pCLDBEQUF5Qjs7SUFDekIsOERBQTZCOztJQUM3QixvREFBbUI7O0lBQ25CLHdEQUF1Qjs7SUFDdkIsOERBQTZEOztJQUM3RCxzREFBb0I7O0lBQ3BCLHdEQUFzQjs7SUFDdEIsMkRBQXlCOztJQUN6QixxREFBc0I7O0lBQ3RCLDREQUFxQzs7SUFDckMsNkRBQW1DOztJQUNuQyxpRUFBa0M7O0lBQ2xDLGlFQUFrQzs7SUFDbEMsc0RBQWlCOztJQUVqQixzREFDZ0I7O0lBRWhCLHdEQUNtQjs7SUFFbkIsd0RBQ2tCOztJQUVsQiwwREFDb0I7O0lBRXBCLG1EQUNjOztJQUVkLG9EQUNjOztJQUVkLG9EQUNjOztJQUVkLHdEQUNrQjs7SUFFbEIsd0RBQ2U7O0lBRWYsMkRBQTJFOzs7OztJQUUzRSwrREFBNEQ7Ozs7O0lBQzVELGdFQUE2RDs7Ozs7SUFDN0QscURBQStCOzs7OztJQUc3Qix1REFBeUM7Ozs7O0lBQ3pDLHlEQUFxRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkVHlwZSwgQWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2ltYWdlJztcbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzLCBjcmVhdGVGb3JtdWxhLCB2YWxpZGF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb25UeXBlLCBBamZEYXRhc2V0LCBBamZEYXRhV2lkZ2V0LCBBamZJbWFnZVdpZGdldCwgQWpmV2lkZ2V0XG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7c2l6ZWRFbnVtVG9TdHJpbmdBcnJheX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuZXhwb3J0IGVudW0gQWpmRGF0YVR5cGUge1xuICBNYWluRGF0YSxcbiAgRGF0YXNldCxcbiAgUmVsYXRlZERhdGEsXG4gIExFTkdUSFxufVxuZGVjbGFyZSB2YXIgbW9uYWNvOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1zLWFuYWx5emVyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcblxuICBhZ2dyZWdhdGlvblR5cGVzOiBzdHJpbmdbXSA9IHNpemVkRW51bVRvU3RyaW5nQXJyYXkoQWpmQWdncmVnYXRpb25UeXBlKTtcblxuICAvLyAgb3BlcmF0b3JzIGlzIGFuIGFycmF5IG9mIGFueSB0eXBlIHRoYXQgY29udGFpbnMgYWxsIGFsbG93IG9wZXJhdG9yc1xuICBvcGVyYXRvcnM6IHN0cmluZ1tdID0gW1xuICAgICd0cnVlJywgJ2ZhbHNlJywgJyggKScsICdcXCcgXFwnJyxcbiAgICAnPCcsICc8PScsICc+PScsICc+JywgJyE9JywgJyEnLFxuICAgICcmJicsICd8fCcsXG4gICAgJysnLCAnLScsICcqJywgJy8nLCAnJScsICc9PSdcbiAgXTtcblxuICBmb3JtdWxhVGV4dDogc3RyaW5nID0gJyc7XG4gIGZvcm11bGFEYXRlOiBzdHJpbmcgPSAnJztcbiAgc2FmZUZvcm11bGFUZXh0OiBzdHJpbmcgPSAnJztcbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuICBjb25kaXRpb246IHN0cmluZyA9ICcnO1xuICBhZ2dyZWdhdGlvblR5cGU6IEFqZkFnZ3JlZ2F0aW9uVHlwZSA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5TdW07XG4gIGRhdGFzZXQ6IEFqZkRhdGFzZXQ7XG4gIGN1cnJlbnRJZDogbnVtYmVyID0gMDtcbiAgY3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xuICBsYWJlbHM6IHN0cmluZ1tdID0gW107XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgZm9ybXNWYXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXTtcbiAgZm9ybXNWYXJpYWJsZXNOYW1lOiBzdHJpbmdbXSA9IFtdO1xuICBmb3Jtc1ZhcmlhYmxlc1R5cGU6IHN0cmluZ1tdID0gW107XG4gIGlzVmFsaWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZm9ybXVsYTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGlzRm9ybXVsYTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBsYWJlbFRleHQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBhZ2dyZWdhdGlvbjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGluaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbGV2ZWw6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBpbmRleDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIG1haW5JbmRleDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIHJlZmVyZW5jZTogYW55O1xuXG4gIEBWaWV3Q2hpbGQoQWpmTW9uYWNvRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIG1vbmFjb0VkaXRvcjogQWpmTW9uYWNvRWRpdG9yO1xuXG4gIHByaXZhdGUgX2Zvcm1BbmFseXplclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZpcnN0OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz4sXG4gICAgXzogQWpmVmFsaWRhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgaWYgKHRoaXMuaW5pdCA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5mb3JtdWxhVGV4dCA9ICcnO1xuICAgICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSBBamZBZ2dyZWdhdGlvblR5cGUuU3VtO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0XG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gPEFqZkRhdGFXaWRnZXQ+eDtcblxuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZSA9PSAyKSB7XG4gICAgICAgICAgICBsZXQgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmIChteU9iai5pbWFnZVR5cGUgPT0gQWpmSW1hZ2VUeXBlLkZsYWcpIHtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhID0gKG15T2JqLmZsYWcpID8gbXlPYmouZmxhZy5mb3JtdWxhIDogJyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmZvcm11bGEgPSAobXlPYmouaWNvbikgPyBteU9iai5pY29uLmZvcm11bGEgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvcm1zVmFyaWFibGVzXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzID0geDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBvbkVkaXRvckluaXQoKTogdm9pZCB7XG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXREaWFnbm9zdGljc09wdGlvbnMoe1xuICAgICAgbm9TZW1hbnRpY1ZhbGlkYXRpb246IGZhbHNlLFxuICAgICAgbm9TeW50YXhWYWxpZGF0aW9uOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXRDb21waWxlck9wdGlvbnMoe1xuICAgICAgdGFyZ2V0OiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuU2NyaXB0VGFyZ2V0LkVTMjAxNSxcbiAgICAgIGFsbG93Tm9uVHNFeHRlbnNpb25zOiB0cnVlLFxuICAgICAgYWxsb3dKczogdHJ1ZSxcbiAgICAgIG1vZHVsZTogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0Lk1vZHVsZUtpbmQuTm9uZVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cydcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0c1xuICAgICAgICAuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID0gJyc7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAnJywgJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHNcbiAgICAgICAgLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRGb3Jtc1ZhcmlhYmxlc05hbWVzKCk7XG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gICAgdGhpcy5fdXBkYXRlRnVuY3Rpb25zKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2luaXRGb3Jtc1ZhcmlhYmxlc05hbWVzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMuZm9yRWFjaCgoZm9ybVZhcikgPT4ge1xuICAgICAgZm9ybVZhci5uYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXNOYW1lLnB1c2gobmFtZSk7XG4gICAgICB9KTtcbiAgICAgIGZvcm1WYXIudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzVHlwZS5wdXNoKHRoaXMuX2ZpZWxkVmFyVHlwZSh0eXBlKSB8fCAnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfdXBkYXRlVmFyaWFibGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvcm1zVmFyaWFibGVzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdHJ5IHtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgKz0gYGRlY2xhcmUgY29uc3QgJHt0aGlzLmZvcm1zVmFyaWFibGVzTmFtZVtpXX06ICR7dGhpcy5mb3Jtc1ZhcmlhYmxlc1R5cGVbaV19O2A7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlICs9IGBcXG5gO1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0c1xuICAgICAgICAuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID0gdmFsdWU7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGdW5jdGlvbnMoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID1cbiAgICAgICAgICBBamZFeHByZXNzaW9uVXRpbHMuVVRJTF9GVU5DVElPTlM7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cblxuICBwcml2YXRlIF9maWVsZFZhclR5cGUoZmllbGRUeXBlOiBBamZGaWVsZFR5cGUpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgcmV0dXJuICdib29sZWFuJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGU6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlSW5wdXQ6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UaW1lOlxuICAgICAgICByZXR1cm4gJ0RhdGUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRW1wdHk6XG4gICAgICAgIHJldHVybiAndm9pZCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Gb3JtdWxhOlxuICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgcmV0dXJuICdhbnknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTnVtYmVyOlxuICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UYWJsZTpcbiAgICAgICAgcmV0dXJuICdBcnJheSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TdHJpbmc6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UZXh0OlxuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0Q3VycmVudChpZDogbnVtYmVyLCBsYWJlbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmluaXQpIHtcbiAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgIHRoaXMuaW5pdCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaW5zZXJ0VmFyaWFibGUodGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubmFtZXNbaW5kZXhdIHx8ICcnKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRJZChpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50SWQgPSBpZDtcbiAgICB0aGlzLmxhYmVscyA9IHRoaXMuZm9ybXNWYXJpYWJsZXNbaWRdLmxhYmVscztcbiAgICB0aGlzLl91cGRhdGVWYXJpYWJsZXMoKTtcbiAgfVxuXG4gIHNldEFnZ3JlZ2F0aW9uVHlwZSh0eXBlOiBBamZBZ2dyZWdhdGlvblR5cGUpIHtcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IHR5cGU7XG4gIH1cblxuICBjaGVja1ZhbGlkYXRpb24oKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtdWxhKCkpIHtcbiAgICAgIHRoaXMuc2FmZUZvcm11bGFUZXh0ID0gdGhpcy5mb3JtdWxhVGV4dDtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb3JtdWxhVGV4dCA9PSAnJykge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVGb3JtdWxhKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmZvcm11bGFUZXh0ID09ICcnKSB7XG4gICAgICB0aGlzLmluaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9ybXNWYXJpYWJsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGVFeHByZXNzaW9uKHRoaXMuZm9ybXVsYVRleHQsIHRoaXMuZm9ybXNWYXJpYWJsZXNOYW1lKTtcbiAgICB9XG4gIH1cblxuICBzYXZlRGF0YXNldCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRoaXMuc2F2ZUltYWdlRm9ybXVsYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgdGhpcy5zYXZlRm9ybXVsYUh0bWwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHRoaXMuc2F2ZUNoYXJ0Rm9ybXVsYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgdGhpcy5zYXZlVGFibGVGb3JtdWxhKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNhdmVJbWFnZUZvcm11bGEoKSB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlSW1hZ2VGb3JtdWxhKGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHRoaXMuZm9ybXVsYVRleHR9KSk7XG4gIH1cblxuICBzYXZlRm9ybXVsYUh0bWwoKSB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlRm9ybXVsYVRvSHRtbCh0aGlzLmZvcm11bGFUZXh0LCB0aGlzLnJlZmVyZW5jZSk7XG4gIH1cblxuICBzYXZlQ2hhcnRGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICAgIHRoaXMubGFiZWwsXG4gICAgICB0aGlzLmxldmVsLFxuICAgICAgdGhpcy5tYWluSW5kZXgsXG4gICAgICB0aGlzLmluZGV4LFxuICAgICAgdGhpcy5mb3JtdWxhVGV4dCxcbiAgICAgIHRoaXMuYWdncmVnYXRpb25UeXBlKTtcbiAgfVxuXG4gIHNhdmVUYWJsZUZvcm11bGEoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlVGFibGVGb3JtdWxhKFxuICAgICAgdGhpcy5sYWJlbCxcbiAgICAgIHRoaXMuYWdncmVnYXRpb25UeXBlLFxuICAgICAgdGhpcy5mb3JtdWxhVGV4dCxcbiAgICAgIHRoaXMubWFpbkluZGV4LFxuICAgICAgdGhpcy5pbmRleCk7XG4gIH1cblxuICBpbnNlcnRWYXJpYWJsZSh2YXJpYWJsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvcjtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nW10gPSBlZGl0b3IuZ2V0VmFsdWUoKS5zcGxpdCgnXFxuJyk7XG4gICAgICBsZXQgcG9zaXRpb246IHsgY29sdW1uOiBudW1iZXIsIGxpbmVOdW1iZXI6IG51bWJlciB9ID0gZWRpdG9yLmdldFBvc2l0aW9uKCk7XG4gICAgICBjb25zdCBsbiA9IHBvc2l0aW9uLmxpbmVOdW1iZXIgLSAxO1xuICAgICAgbGV0IGxpbmUgPSB2YWx1ZVtsbl07XG4gICAgICBsZXQgY29sID0gcG9zaXRpb24uY29sdW1uIC0gMTtcbiAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cmluZygwLCBjb2wpICsgdmFyaWFibGUgKyBsaW5lLnN1YnN0cmluZyhjb2wpO1xuICAgICAgdmFsdWVbbG5dID0gbGluZTtcbiAgICAgIHBvc2l0aW9uLmNvbHVtbiArPSB2YXJpYWJsZS5sZW5ndGg7XG4gICAgICB0aGlzLm1vbmFjb0VkaXRvci52YWx1ZSA9IHZhbHVlLmpvaW4oJ1xcbicpO1xuICAgICAgZWRpdG9yLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgdGhpcy5mb3JtdWxhVGV4dCA9IGVkaXRvci5nZXRWYWx1ZSgpO1xuICAgICAgdGhpcy5jaGVja1ZhbGlkYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYXJpYWJsZSh2YXJpYWJsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvcjtcbiAgICAgIGVkaXRvci5zZXRWYWx1ZSh2YXJpYWJsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5mb3JtdWxhVGV4dCA9ICcnO1xuICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gQWpmQWdncmVnYXRpb25UeXBlLk5vbmU7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm11bGFUZXh0ID0gdGhpcy5mb3JtdWxhO1xuICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gdGhpcy5hZ2dyZWdhdGlvbjtcbiAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbFRleHQ7XG5cbiAgICBpZiAodGhpcy5mb3JtdWxhVGV4dCA9PSAnJyB8fCB0aGlzLmZvcm11bGFUZXh0ID09IG51bGwpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgIH1cblxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLl9maXJzdCAmJiB0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmluc2VydFZhcmlhYmxlKHRoaXMuZm9ybXVsYVRleHQgfHwgJycpO1xuICAgICAgdGhpcy5fZmlyc3QgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==