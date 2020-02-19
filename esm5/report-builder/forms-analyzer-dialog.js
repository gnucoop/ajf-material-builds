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
export var AjfDataType;
(function (AjfDataType) {
    AjfDataType[AjfDataType["MainData"] = 0] = "MainData";
    AjfDataType[AjfDataType["Dataset"] = 1] = "Dataset";
    AjfDataType[AjfDataType["RelatedData"] = 2] = "RelatedData";
    AjfDataType[AjfDataType["LENGTH"] = 3] = "LENGTH";
})(AjfDataType || (AjfDataType = {}));
var AjfReportBuilderFormsAnalyzerDialog = /** @class */ (function () {
    function AjfReportBuilderFormsAnalyzerDialog(_service, _dialogRef, _) {
        var _this = this;
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
            .subscribe(function (x) {
            if (x != null) {
                _this.currentWidget = x;
                if (_this.currentWidget.widgetType == 2) {
                    var myObj = _this.currentWidget;
                    if (myObj.imageType == AjfImageType.Flag) {
                        _this.formula = (myObj.flag) ? myObj.flag.formula : '';
                    }
                    else {
                        _this.formula = (myObj.icon) ? myObj.icon.formula : '';
                    }
                }
            }
        });
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe(function (x) {
            if (x != null) {
                _this.formsVariables = x;
            }
        });
    }
    AjfReportBuilderFormsAnalyzerDialog.prototype.onEditorInit = function () {
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
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype._initFormsVariablesNames = function () {
        var _this = this;
        this.formsVariables.forEach(function (formVar) {
            formVar.names.forEach(function (name) {
                _this.formsVariablesName.push(name);
            });
            formVar.types.forEach(function (type) {
                _this.formsVariablesType.push(_this._fieldVarType(type) || '');
            });
        });
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype._updateVariables = function () {
        if (this.formsVariables == null) {
            return;
        }
        try {
            var value = '';
            for (var i = 0; i < this.formsVariablesName.length; i++) {
                value += "declare const " + this.formsVariablesName[i] + ": " + this.formsVariablesType[i] + ";";
            }
            value += "\n";
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = value;
        }
        catch (e) { }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype._updateFunctions = function () {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) { }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype._fieldVarType = function (fieldType) {
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
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.setCurrent = function (id, label, index) {
        if (!this.init) {
            this.label = label;
            this.init = true;
        }
        this.insertVariable(this.formsVariables[id].names[index] || '');
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.setCurrentId = function (id) {
        this.currentId = id;
        this.labels = this.formsVariables[id].labels;
        this._updateVariables();
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.setAggregationType = function (type) {
        this.aggregationType = type;
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.checkValidation = function () {
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
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.validateFormula = function () {
        if (this.formulaText == '') {
            this.init = false;
        }
        if (this.formsVariables == null) {
            return false;
        }
        else {
            return validateExpression(this.formulaText, this.formsVariablesName);
        }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.saveDataset = function () {
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
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.saveImageFormula = function () {
        this._service.saveImageFormula(createFormula({ formula: this.formulaText }));
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.saveFormulaHtml = function () {
        this._service.saveFormulaToHtml(this.formulaText, this.reference);
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.saveChartFormula = function () {
        this._service.saveChartFormula(this.label, this.level, this.mainIndex, this.index, this.formulaText, this.aggregationType);
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.saveTableFormula = function () {
        this._service.saveTableFormula(this.label, this.aggregationType, this.formulaText, this.mainIndex, this.index);
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.insertVariable = function (variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            var editor = this.monacoEditor.editor;
            var value = editor.getValue().split('\n');
            var position = editor.getPosition();
            var ln = position.lineNumber - 1;
            var line = value[ln];
            var col = position.column - 1;
            line = line.substring(0, col) + variable + line.substring(col);
            value[ln] = line;
            position.column += variable.length;
            this.monacoEditor.value = value.join('\n');
            editor.setPosition(position);
            editor.focus();
            this.formulaText = editor.getValue();
            this.checkValidation();
        }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.setVariable = function (variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            var editor = this.monacoEditor.editor;
            editor.setValue(variable);
        }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.reset = function () {
        this.formulaText = '';
        this.aggregationType = AjfAggregationType.None;
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.close = function () {
        this.reset();
        this._dialogRef.close();
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.ngOnInit = function () {
        this.formulaText = this.formula;
        this.aggregationType = this.aggregation;
        this.label = this.labelText;
        if (this.formulaText == '' || this.formulaText == null) {
            this.isValid = false;
        }
        else {
            this.isValid = true;
        }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.ngAfterViewChecked = function () {
        if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
            this.insertVariable(this.formulaText || '');
            this._first = false;
        }
    };
    AjfReportBuilderFormsAnalyzerDialog.prototype.ngOnDestroy = function () {
        this._formAnalyzerSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    };
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
    AjfReportBuilderFormsAnalyzerDialog.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: MatDialogRef },
        { type: AjfValidationService }
    ]; };
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
    return AjfReportBuilderFormsAnalyzerDialog;
}());
export { AjfReportBuilderFormsAnalyzerDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2Zvcm1zLWFuYWx5emVyLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQ0wsa0JBQWtCLEVBQ25CLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDYSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQ3pGLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRSxNQUFNLENBQU4sSUFBWSxXQUtYO0FBTEQsV0FBWSxXQUFXO0lBQ3JCLHFEQUFRLENBQUE7SUFDUixtREFBTyxDQUFBO0lBQ1AsMkRBQVcsQ0FBQTtJQUNYLGlEQUFNLENBQUE7QUFDUixDQUFDLEVBTFcsV0FBVyxLQUFYLFdBQVcsUUFLdEI7QUFHRDtJQW9FRSw2Q0FDVSxRQUFpQyxFQUNqQyxV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O1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDOztnQkF6VkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLCs2REFBeUM7b0JBRXpDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWhCTyx1QkFBdUI7Z0JBSnZCLFlBQVk7Z0JBWkUsb0JBQW9COzs7MEJBNkR2QyxLQUFLOzRCQUdMLEtBQUs7NEJBR0wsS0FBSzs4QkFHTCxLQUFLO3VCQUdMLEtBQUs7d0JBR0wsS0FBSzt3QkFHTCxLQUFLOzRCQUdMLEtBQUs7NEJBR0wsS0FBSzsrQkFHTCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7SUE0UjdDLDBDQUFDO0NBQUEsQUExVkQsSUEwVkM7U0FuVlksbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGRUeXBlLCBBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHMsIGNyZWF0ZUZvcm11bGEsIHZhbGlkYXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvblR5cGUsIEFqZkRhdGFzZXQsIEFqZkRhdGFXaWRnZXQsIEFqZkltYWdlV2lkZ2V0LCBBamZXaWRnZXRcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtzaXplZEVudW1Ub1N0cmluZ0FycmF5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3J9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5leHBvcnQgZW51bSBBamZEYXRhVHlwZSB7XG4gIE1haW5EYXRhLFxuICBEYXRhc2V0LFxuICBSZWxhdGVkRGF0YSxcbiAgTEVOR1RIXG59XG5kZWNsYXJlIHZhciBtb25hY286IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybXMtYW5hbHl6ZXItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3Jtcy1hbmFseXplci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3Jtcy1hbmFseXplci1kaWFsb2cuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuXG4gIGFnZ3JlZ2F0aW9uVHlwZXM6IHN0cmluZ1tdID0gc2l6ZWRFbnVtVG9TdHJpbmdBcnJheShBamZBZ2dyZWdhdGlvblR5cGUpO1xuXG4gIC8vICBvcGVyYXRvcnMgaXMgYW4gYXJyYXkgb2YgYW55IHR5cGUgdGhhdCBjb250YWlucyBhbGwgYWxsb3cgb3BlcmF0b3JzXG4gIG9wZXJhdG9yczogc3RyaW5nW10gPSBbXG4gICAgJ3RydWUnLCAnZmFsc2UnLCAnKCApJywgJ1xcJyBcXCcnLFxuICAgICc8JywgJzw9JywgJz49JywgJz4nLCAnIT0nLCAnIScsXG4gICAgJyYmJywgJ3x8JyxcbiAgICAnKycsICctJywgJyonLCAnLycsICclJywgJz09J1xuICBdO1xuXG4gIGZvcm11bGFUZXh0OiBzdHJpbmcgPSAnJztcbiAgZm9ybXVsYURhdGU6IHN0cmluZyA9ICcnO1xuICBzYWZlRm9ybXVsYVRleHQ6IHN0cmluZyA9ICcnO1xuICBsYWJlbDogc3RyaW5nID0gJyc7XG4gIGNvbmRpdGlvbjogc3RyaW5nID0gJyc7XG4gIGFnZ3JlZ2F0aW9uVHlwZTogQWpmQWdncmVnYXRpb25UeXBlID0gQWpmQWdncmVnYXRpb25UeXBlLlN1bTtcbiAgZGF0YXNldDogQWpmRGF0YXNldDtcbiAgY3VycmVudElkOiBudW1iZXIgPSAwO1xuICBjdXJyZW50SW5kZXg6IG51bWJlciA9IDA7XG4gIGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdO1xuICBmb3Jtc1ZhcmlhYmxlc05hbWU6IHN0cmluZ1tdID0gW107XG4gIGZvcm1zVmFyaWFibGVzVHlwZTogc3RyaW5nW10gPSBbXTtcbiAgaXNWYWxpZDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBmb3JtdWxhOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgaXNGb3JtdWxhOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsVGV4dDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGFnZ3JlZ2F0aW9uOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgaW5pdDogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBsZXZlbDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGluZGV4OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgbWFpbkluZGV4OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgcmVmZXJlbmNlOiBhbnk7XG5cbiAgQFZpZXdDaGlsZChBamZNb25hY29FZGl0b3IsIHtzdGF0aWM6IGZhbHNlfSkgbW9uYWNvRWRpdG9yOiBBamZNb25hY29FZGl0b3I7XG5cbiAgcHJpdmF0ZSBfZm9ybUFuYWx5emVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nPixcbiAgICBfOiBBamZWYWxpZGF0aW9uU2VydmljZVxuICApIHtcbiAgICBpZiAodGhpcy5pbml0ID09IGZhbHNlKSB7XG4gICAgICB0aGlzLmZvcm11bGFUZXh0ID0gJyc7XG4gICAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5TdW07XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSA8QWpmRGF0YVdpZGdldD54O1xuXG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlID09IDIpIHtcbiAgICAgICAgICAgIGxldCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKG15T2JqLmltYWdlVHlwZSA9PSBBamZJbWFnZVR5cGUuRmxhZykge1xuICAgICAgICAgICAgICB0aGlzLmZvcm11bGEgPSAobXlPYmouZmxhZykgPyBteU9iai5mbGFnLmZvcm11bGEgOiAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZm9ybXVsYSA9IChteU9iai5pY29uKSA/IG15T2JqLmljb24uZm9ybXVsYSA6ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1YiA9IHRoaXMuX3NlcnZpY2UuZm9ybXNWYXJpYWJsZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHtcbiAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG9uRWRpdG9ySW5pdCgpOiB2b2lkIHtcbiAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLnNldERpYWdub3N0aWNzT3B0aW9ucyh7XG4gICAgICBub1NlbWFudGljVmFsaWRhdGlvbjogZmFsc2UsXG4gICAgICBub1N5bnRheFZhbGlkYXRpb246IGZhbHNlXG4gICAgfSk7XG5cbiAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLnNldENvbXBpbGVyT3B0aW9ucyh7XG4gICAgICB0YXJnZXQ6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5TY3JpcHRUYXJnZXQuRVMyMDE1LFxuICAgICAgYWxsb3dOb25Uc0V4dGVuc2lvbnM6IHRydWUsXG4gICAgICBhbGxvd0pzOiB0cnVlLFxuICAgICAgbW9kdWxlOiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuTW9kdWxlS2luZC5Ob25lXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5hZGRFeHRyYUxpYihcbiAgICAgICAgJycsICdjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzXG4gICAgICAgIC5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ10gPSAnJztcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cydcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0c1xuICAgICAgICAuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdEZvcm1zVmFyaWFibGVzTmFtZXMoKTtcbiAgICB0aGlzLl91cGRhdGVWYXJpYWJsZXMoKTtcbiAgICB0aGlzLl91cGRhdGVGdW5jdGlvbnMoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1zVmFyaWFibGVzTmFtZXMoKTogdm9pZCB7XG4gICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcy5mb3JFYWNoKChmb3JtVmFyKSA9PiB7XG4gICAgICBmb3JtVmFyLm5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWUucHVzaChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgZm9ybVZhci50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXNUeXBlLnB1c2godGhpcy5fZmllbGRWYXJUeXBlKHR5cGUpIHx8ICcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxuICBwcml2YXRlIF91cGRhdGVWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9ybXNWYXJpYWJsZXMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0cnkge1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSAnJztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZvcm1zVmFyaWFibGVzTmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSArPSBgZGVjbGFyZSBjb25zdCAke3RoaXMuZm9ybXNWYXJpYWJsZXNOYW1lW2ldfTogJHt0aGlzLmZvcm1zVmFyaWFibGVzVHlwZVtpXX07YDtcbiAgICAgIH1cblxuICAgICAgdmFsdWUgKz0gYFxcbmA7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzXG4gICAgICAgIC5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ10gPSB2YWx1ZTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZ1bmN0aW9ucygpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPVxuICAgICAgICAgIEFqZkV4cHJlc3Npb25VdGlscy5VVElMX0ZVTkNUSU9OUztcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpZWxkVmFyVHlwZShmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZSk6IHN0cmluZyB8IG51bGwge1xuICAgIHN3aXRjaCAoZmllbGRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Cb29sZWFuOlxuICAgICAgICByZXR1cm4gJ2Jvb2xlYW4nO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGVJbnB1dDpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICAgIHJldHVybiAnRGF0ZSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5FbXB0eTpcbiAgICAgICAgcmV0dXJuICd2b2lkJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkZvcm11bGE6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICByZXR1cm4gJ2FueSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICByZXR1cm4gJ0FycmF5JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRleHQ6XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZXRDdXJyZW50KGlkOiBudW1iZXIsIGxhYmVsOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaW5pdCkge1xuICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5pbnNlcnRWYXJpYWJsZSh0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5uYW1lc1tpbmRleF0gfHwgJycpO1xuICB9XG5cbiAgc2V0Q3VycmVudElkKGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJZCA9IGlkO1xuICAgIHRoaXMubGFiZWxzID0gdGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubGFiZWxzO1xuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICB9XG5cbiAgc2V0QWdncmVnYXRpb25UeXBlKHR5cGU6IEFqZkFnZ3JlZ2F0aW9uVHlwZSkge1xuICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gdHlwZTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRhdGlvbigpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUZvcm11bGEoKSkge1xuICAgICAgdGhpcy5zYWZlRm9ybXVsYVRleHQgPSB0aGlzLmZvcm11bGFUZXh0O1xuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm11bGFUZXh0ID09ICcnKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUZvcm11bGEoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZm9ybXVsYVRleHQgPT0gJycpIHtcbiAgICAgIHRoaXMuaW5pdCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb3Jtc1ZhcmlhYmxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZUV4cHJlc3Npb24odGhpcy5mb3JtdWxhVGV4dCwgdGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVEYXRhc2V0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgIT0gbnVsbCkge1xuICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZSkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgdGhpcy5zYXZlSW1hZ2VGb3JtdWxhKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICB0aGlzLnNhdmVGb3JtdWxhSHRtbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgdGhpcy5zYXZlQ2hhcnRGb3JtdWxhKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICB0aGlzLnNhdmVUYWJsZUZvcm11bGEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2F2ZUltYWdlRm9ybXVsYSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVJbWFnZUZvcm11bGEoY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogdGhpcy5mb3JtdWxhVGV4dH0pKTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhSHRtbCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVGb3JtdWxhVG9IdG1sKHRoaXMuZm9ybXVsYVRleHQsIHRoaXMucmVmZXJlbmNlKTtcbiAgfVxuXG4gIHNhdmVDaGFydEZvcm11bGEoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlQ2hhcnRGb3JtdWxhKFxuICAgICAgdGhpcy5sYWJlbCxcbiAgICAgIHRoaXMubGV2ZWwsXG4gICAgICB0aGlzLm1haW5JbmRleCxcbiAgICAgIHRoaXMuaW5kZXgsXG4gICAgICB0aGlzLmZvcm11bGFUZXh0LFxuICAgICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUpO1xuICB9XG5cbiAgc2F2ZVRhYmxlRm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVUYWJsZUZvcm11bGEoXG4gICAgICB0aGlzLmxhYmVsLFxuICAgICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUsXG4gICAgICB0aGlzLmZvcm11bGFUZXh0LFxuICAgICAgdGhpcy5tYWluSW5kZXgsXG4gICAgICB0aGlzLmluZGV4KTtcbiAgfVxuXG4gIGluc2VydFZhcmlhYmxlKHZhcmlhYmxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yO1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmdbXSA9IGVkaXRvci5nZXRWYWx1ZSgpLnNwbGl0KCdcXG4nKTtcbiAgICAgIGxldCBwb3NpdGlvbjogeyBjb2x1bW46IG51bWJlciwgbGluZU51bWJlcjogbnVtYmVyIH0gPSBlZGl0b3IuZ2V0UG9zaXRpb24oKTtcbiAgICAgIGNvbnN0IGxuID0gcG9zaXRpb24ubGluZU51bWJlciAtIDE7XG4gICAgICBsZXQgbGluZSA9IHZhbHVlW2xuXTtcbiAgICAgIGxldCBjb2wgPSBwb3NpdGlvbi5jb2x1bW4gLSAxO1xuICAgICAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKDAsIGNvbCkgKyB2YXJpYWJsZSArIGxpbmUuc3Vic3RyaW5nKGNvbCk7XG4gICAgICB2YWx1ZVtsbl0gPSBsaW5lO1xuICAgICAgcG9zaXRpb24uY29sdW1uICs9IHZhcmlhYmxlLmxlbmd0aDtcbiAgICAgIHRoaXMubW9uYWNvRWRpdG9yLnZhbHVlID0gdmFsdWUuam9pbignXFxuJyk7XG4gICAgICBlZGl0b3Iuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvcm11bGFUZXh0ID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgICB0aGlzLmNoZWNrVmFsaWRhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhcmlhYmxlKHZhcmlhYmxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yO1xuICAgICAgZWRpdG9yLnNldFZhbHVlKHZhcmlhYmxlKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmZvcm11bGFUZXh0ID0gJyc7XG4gICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybXVsYVRleHQgPSB0aGlzLmZvcm11bGE7XG4gICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSB0aGlzLmFnZ3JlZ2F0aW9uO1xuICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsVGV4dDtcblxuICAgIGlmICh0aGlzLmZvcm11bGFUZXh0ID09ICcnIHx8IHRoaXMuZm9ybXVsYVRleHQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgfVxuXG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuX2ZpcnN0ICYmIHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaW5zZXJ0VmFyaWFibGUodGhpcy5mb3JtdWxhVGV4dCB8fCAnJyk7XG4gICAgICB0aGlzLl9maXJzdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19