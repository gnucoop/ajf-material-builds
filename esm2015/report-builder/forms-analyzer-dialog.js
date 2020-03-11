/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/forms-analyzer-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2Zvcm1zLWFuYWx5emVyLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQ0wsa0JBQWtCLEVBQ25CLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDYSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQ3pGLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFakUsTUFBWSxXQUFXO0lBQ3JCLFFBQVEsR0FBQTtJQUNSLE9BQU8sR0FBQTtJQUNQLFdBQVcsR0FBQTtJQUNYLE1BQU0sR0FBQTtFQUNQOzs7Ozs7QUFVRCxNQUFNLE9BQU8sbUNBQW1DOzs7Ozs7SUE2RDlDLFlBQ1UsUUFBaUMsRUFDakMsVUFBNkQsRUFDckUsQ0FBdUI7UUFGZixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNq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QUUsdUJBQXVCO2dCQUNqQywrNkRBQXlDO2dCQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBaEJPLHVCQUF1QjtZQUp2QixZQUFZO1lBWkUsb0JBQW9COzs7c0JBNkR2QyxLQUFLO3dCQUdMLEtBQUs7d0JBR0wsS0FBSzswQkFHTCxLQUFLO21CQUdMLEtBQUs7b0JBR0wsS0FBSztvQkFHTCxLQUFLO3dCQUdMLEtBQUs7d0JBR0wsS0FBSzsyQkFHTCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7OztJQXJEM0MsK0RBQXdFOztJQUd4RSx3REFLRTs7SUFFRiwwREFBeUI7O0lBQ3pCLDBEQUF5Qjs7SUFDekIsOERBQTZCOztJQUM3QixvREFBbUI7O0lBQ25CLHdEQUF1Qjs7SUFDdkIsOERBQTZEOztJQUM3RCxzREFBb0I7O0lBQ3BCLHdEQUFzQjs7SUFDdEIsMkRBQXlCOztJQUN6QixxREFBc0I7O0lBQ3RCLDREQUFxQzs7SUFDckMsNkRBQW1DOztJQUNuQyxpRUFBa0M7O0lBQ2xDLGlFQUFrQzs7SUFDbEMsc0RBQWlCOztJQUVqQixzREFDZ0I7O0lBRWhCLHdEQUNtQjs7SUFFbkIsd0RBQ2tCOztJQUVsQiwwREFDb0I7O0lBRXBCLG1EQUNjOztJQUVkLG9EQUNjOztJQUVkLG9EQUNjOztJQUVkLHdEQUNrQjs7SUFFbEIsd0RBQ2U7O0lBRWYsMkRBQTJFOzs7OztJQUUzRSwrREFBNEQ7Ozs7O0lBQzVELGdFQUE2RDs7Ozs7SUFDN0QscURBQStCOzs7OztJQUc3Qix1REFBeUM7Ozs7O0lBQ3pDLHlEQUFxRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZFR5cGUsIEFqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZJbWFnZVR5cGV9IGZyb20gJ0BhamYvY29yZS9pbWFnZSc7XG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlscywgY3JlYXRlRm9ybXVsYSwgdmFsaWRhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uVHlwZSwgQWpmRGF0YXNldCwgQWpmRGF0YVdpZGdldCwgQWpmSW1hZ2VXaWRnZXQsIEFqZldpZGdldFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge3NpemVkRW51bVRvU3RyaW5nQXJyYXl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0FqZk1vbmFjb0VkaXRvcn0gZnJvbSAnQGFqZi9tYXRlcmlhbC9tb25hY28tZWRpdG9yJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXN9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbmV4cG9ydCBlbnVtIEFqZkRhdGFUeXBlIHtcbiAgTWFpbkRhdGEsXG4gIERhdGFzZXQsXG4gIFJlbGF0ZWREYXRhLFxuICBMRU5HVEhcbn1cbmRlY2xhcmUgdmFyIG1vbmFjbzogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3Jtcy1hbmFseXplci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm1zLWFuYWx5emVyLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm1zLWFuYWx5emVyLWRpYWxvZy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG5cbiAgYWdncmVnYXRpb25UeXBlczogc3RyaW5nW10gPSBzaXplZEVudW1Ub1N0cmluZ0FycmF5KEFqZkFnZ3JlZ2F0aW9uVHlwZSk7XG5cbiAgLy8gIG9wZXJhdG9ycyBpcyBhbiBhcnJheSBvZiBhbnkgdHlwZSB0aGF0IGNvbnRhaW5zIGFsbCBhbGxvdyBvcGVyYXRvcnNcbiAgb3BlcmF0b3JzOiBzdHJpbmdbXSA9IFtcbiAgICAndHJ1ZScsICdmYWxzZScsICcoICknLCAnXFwnIFxcJycsXG4gICAgJzwnLCAnPD0nLCAnPj0nLCAnPicsICchPScsICchJyxcbiAgICAnJiYnLCAnfHwnLFxuICAgICcrJywgJy0nLCAnKicsICcvJywgJyUnLCAnPT0nXG4gIF07XG5cbiAgZm9ybXVsYVRleHQ6IHN0cmluZyA9ICcnO1xuICBmb3JtdWxhRGF0ZTogc3RyaW5nID0gJyc7XG4gIHNhZmVGb3JtdWxhVGV4dDogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAgY29uZGl0aW9uOiBzdHJpbmcgPSAnJztcbiAgYWdncmVnYXRpb25UeXBlOiBBamZBZ2dyZWdhdGlvblR5cGUgPSBBamZBZ2dyZWdhdGlvblR5cGUuU3VtO1xuICBkYXRhc2V0OiBBamZEYXRhc2V0O1xuICBjdXJyZW50SWQ6IG51bWJlciA9IDA7XG4gIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcbiAgbGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGZvcm1zVmFyaWFibGVzTmFtZTogc3RyaW5nW10gPSBbXTtcbiAgZm9ybXNWYXJpYWJsZXNUeXBlOiBzdHJpbmdbXSA9IFtdO1xuICBpc1ZhbGlkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGZvcm11bGE6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBpc0Zvcm11bGE6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgbGFiZWxUZXh0OiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgYWdncmVnYXRpb246IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBpbml0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGxldmVsOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgaW5kZXg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBtYWluSW5kZXg6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICByZWZlcmVuY2U6IGFueTtcblxuICBAVmlld0NoaWxkKEFqZk1vbmFjb0VkaXRvciwge3N0YXRpYzogZmFsc2V9KSBtb25hY29FZGl0b3I6IEFqZk1vbmFjb0VkaXRvcjtcblxuICBwcml2YXRlIF9mb3JtQW5hbHl6ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9maXJzdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2c+LFxuICAgIF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlXG4gICkge1xuICAgIGlmICh0aGlzLmluaXQgPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZm9ybXVsYVRleHQgPSAnJztcbiAgICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gQWpmQWdncmVnYXRpb25UeXBlLlN1bTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldFxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IDxBamZEYXRhV2lkZ2V0Png7XG5cbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUgPT0gMikge1xuICAgICAgICAgICAgbGV0IG15T2JqOiBBamZJbWFnZVdpZGdldCA9IDxBamZJbWFnZVdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICBpZiAobXlPYmouaW1hZ2VUeXBlID09IEFqZkltYWdlVHlwZS5GbGFnKSB7XG4gICAgICAgICAgICAgIHRoaXMuZm9ybXVsYSA9IChteU9iai5mbGFnKSA/IG15T2JqLmZsYWcuZm9ybXVsYSA6ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhID0gKG15T2JqLmljb24pID8gbXlPYmouaWNvbi5mb3JtdWxhIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViID0gdGhpcy5fc2VydmljZS5mb3Jtc1ZhcmlhYmxlc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcyA9IHg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgb25FZGl0b3JJbml0KCk6IHZvaWQge1xuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0RGlhZ25vc3RpY3NPcHRpb25zKHtcbiAgICAgIG5vU2VtYW50aWNWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICAgIG5vU3ludGF4VmFsaWRhdGlvbjogZmFsc2VcbiAgICB9KTtcblxuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0Q29tcGlsZXJPcHRpb25zKHtcbiAgICAgIHRhcmdldDogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LlNjcmlwdFRhcmdldC5FUzIwMTUsXG4gICAgICBhbGxvd05vblRzRXh0ZW5zaW9uczogdHJ1ZSxcbiAgICAgIGFsbG93SnM6IHRydWUsXG4gICAgICBtb2R1bGU6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5Nb2R1bGVLaW5kLk5vbmVcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAnJywgJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHNcbiAgICAgICAgLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9ICcnO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5hZGRFeHRyYUxpYihcbiAgICAgICAgJycsICdjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzXG4gICAgICAgIC5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0Rm9ybXNWYXJpYWJsZXNOYW1lcygpO1xuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZ1bmN0aW9ucygpO1xuICB9XG5cblxuICBwcml2YXRlIF9pbml0Rm9ybXNWYXJpYWJsZXNOYW1lcygpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm1zVmFyaWFibGVzLmZvckVhY2goKGZvcm1WYXIpID0+IHtcbiAgICAgIGZvcm1WYXIubmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzTmFtZS5wdXNoKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICBmb3JtVmFyLnR5cGVzLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlc1R5cGUucHVzaCh0aGlzLl9maWVsZFZhclR5cGUodHlwZSkgfHwgJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgX3VwZGF0ZVZhcmlhYmxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mb3Jtc1ZhcmlhYmxlcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZm9ybXNWYXJpYWJsZXNOYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlICs9IGBkZWNsYXJlIGNvbnN0ICR7dGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWVbaV19OiAke3RoaXMuZm9ybXNWYXJpYWJsZXNUeXBlW2ldfTtgO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZSArPSBgXFxuYDtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHNcbiAgICAgICAgLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9IHZhbHVlO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRnVuY3Rpb25zKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9XG4gICAgICAgICAgQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmllbGRWYXJUeXBlKGZpZWxkVHlwZTogQWpmRmllbGRUeXBlKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICAgIHJldHVybiAnYm9vbGVhbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZUlucHV0OlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGltZTpcbiAgICAgICAgcmV0dXJuICdEYXRlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkVtcHR5OlxuICAgICAgICByZXR1cm4gJ3ZvaWQnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiAnYW55JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICAgIHJldHVybiAnQXJyYXknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGV4dDpcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldEN1cnJlbnQoaWQ6IG51bWJlciwgbGFiZWw6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pbml0KSB7XG4gICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICB0aGlzLmluaXQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmluc2VydFZhcmlhYmxlKHRoaXMuZm9ybXNWYXJpYWJsZXNbaWRdLm5hbWVzW2luZGV4XSB8fCAnJyk7XG4gIH1cblxuICBzZXRDdXJyZW50SWQoaWQ6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudElkID0gaWQ7XG4gICAgdGhpcy5sYWJlbHMgPSB0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5sYWJlbHM7XG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gIH1cblxuICBzZXRBZ2dyZWdhdGlvblR5cGUodHlwZTogQWpmQWdncmVnYXRpb25UeXBlKSB7XG4gICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSB0eXBlO1xuICB9XG5cbiAgY2hlY2tWYWxpZGF0aW9uKCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybXVsYSgpKSB7XG4gICAgICB0aGlzLnNhZmVGb3JtdWxhVGV4dCA9IHRoaXMuZm9ybXVsYVRleHQ7XG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9ybXVsYVRleHQgPT0gJycpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRm9ybXVsYSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5mb3JtdWxhVGV4dCA9PSAnJykge1xuICAgICAgdGhpcy5pbml0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm1zVmFyaWFibGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlRXhwcmVzc2lvbih0aGlzLmZvcm11bGFUZXh0LCB0aGlzLmZvcm1zVmFyaWFibGVzTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZURhdGFzZXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aGlzLnNhdmVJbWFnZUZvcm11bGEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHRoaXMuc2F2ZUZvcm11bGFIdG1sKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICB0aGlzLnNhdmVDaGFydEZvcm11bGEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHRoaXMuc2F2ZVRhYmxlRm9ybXVsYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKCkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUltYWdlRm9ybXVsYShjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiB0aGlzLmZvcm11bGFUZXh0fSkpO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFIdG1sKCkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUZvcm11bGFUb0h0bWwodGhpcy5mb3JtdWxhVGV4dCwgdGhpcy5yZWZlcmVuY2UpO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVDaGFydEZvcm11bGEoXG4gICAgICB0aGlzLmxhYmVsLFxuICAgICAgdGhpcy5sZXZlbCxcbiAgICAgIHRoaXMubWFpbkluZGV4LFxuICAgICAgdGhpcy5pbmRleCxcbiAgICAgIHRoaXMuZm9ybXVsYVRleHQsXG4gICAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSk7XG4gIH1cblxuICBzYXZlVGFibGVGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZVRhYmxlRm9ybXVsYShcbiAgICAgIHRoaXMubGFiZWwsXG4gICAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSxcbiAgICAgIHRoaXMuZm9ybXVsYVRleHQsXG4gICAgICB0aGlzLm1haW5JbmRleCxcbiAgICAgIHRoaXMuaW5kZXgpO1xuICB9XG5cbiAgaW5zZXJ0VmFyaWFibGUodmFyaWFibGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3I7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZ1tdID0gZWRpdG9yLmdldFZhbHVlKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgbGV0IHBvc2l0aW9uOiB7IGNvbHVtbjogbnVtYmVyLCBsaW5lTnVtYmVyOiBudW1iZXIgfSA9IGVkaXRvci5nZXRQb3NpdGlvbigpO1xuICAgICAgY29uc3QgbG4gPSBwb3NpdGlvbi5saW5lTnVtYmVyIC0gMTtcbiAgICAgIGxldCBsaW5lID0gdmFsdWVbbG5dO1xuICAgICAgbGV0IGNvbCA9IHBvc2l0aW9uLmNvbHVtbiAtIDE7XG4gICAgICBsaW5lID0gbGluZS5zdWJzdHJpbmcoMCwgY29sKSArIHZhcmlhYmxlICsgbGluZS5zdWJzdHJpbmcoY29sKTtcbiAgICAgIHZhbHVlW2xuXSA9IGxpbmU7XG4gICAgICBwb3NpdGlvbi5jb2x1bW4gKz0gdmFyaWFibGUubGVuZ3RoO1xuICAgICAgdGhpcy5tb25hY29FZGl0b3IudmFsdWUgPSB2YWx1ZS5qb2luKCdcXG4nKTtcbiAgICAgIGVkaXRvci5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9ybXVsYVRleHQgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFyaWFibGUodmFyaWFibGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3I7XG4gICAgICBlZGl0b3Iuc2V0VmFsdWUodmFyaWFibGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZm9ybXVsYVRleHQgPSAnJztcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtdWxhVGV4dCA9IHRoaXMuZm9ybXVsYTtcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IHRoaXMuYWdncmVnYXRpb247XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWxUZXh0O1xuXG4gICAgaWYgKHRoaXMuZm9ybXVsYVRleHQgPT0gJycgfHwgdGhpcy5mb3JtdWxhVGV4dCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5fZmlyc3QgJiYgdGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5pbnNlcnRWYXJpYWJsZSh0aGlzLmZvcm11bGFUZXh0IHx8ICcnKTtcbiAgICAgIHRoaXMuX2ZpcnN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=