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
let AjfReportBuilderFormsAnalyzerDialog = /** @class */ (() => {
    class AjfReportBuilderFormsAnalyzerDialog {
        constructor(_service, _dialogRef, _) {
            this._service = _service;
            this._dialogRef = _dialogRef;
            this.aggregationTypes = sizedEnumToStringArray(AjfAggregationType);
            //  operators is an array of any type that contains all allow operators
            this.operators = [
                'true', 'false', '( )', '\' \'', '<', '<=', '>=', '>', '!=', '!', '&&', '||', '+', '-', '*',
                '/', '%', '=='
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
            this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
                if (x != null) {
                    this.currentWidget = x;
                    if (this.currentWidget.widgetType == 2) {
                        let myObj = this.currentWidget;
                        if (myObj.imageType == AjfImageType.Flag) {
                            this.formula = (myObj.flag) ? myObj.flag.formula : '';
                        }
                        else {
                            this.formula = (myObj.icon) ? myObj.icon.formula : '';
                        }
                    }
                }
            });
            this._formAnalyzerSub = this._service.formsVariables.subscribe((x) => {
                if (x != null) {
                    this.formsVariables = x;
                }
            });
        }
        onEditorInit() {
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({ noSemanticValidation: false, noSyntaxValidation: false });
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
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                    '';
            }
            try {
                monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-functions.d.ts');
            }
            catch (e) {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                    '';
            }
            this._initFormsVariablesNames();
            this._updateVariables();
            this._updateFunctions();
        }
        _initFormsVariablesNames() {
            this.formsVariables.forEach((formVar) => {
                formVar.names.forEach((name) => {
                    this.formsVariablesName.push(name);
                });
                formVar.types.forEach((type) => {
                    this.formsVariablesType.push(this._fieldVarType(type) || '');
                });
            });
        }
        _updateVariables() {
            if (this.formsVariables == null) {
                return;
            }
            try {
                let value = '';
                for (let i = 0; i < this.formsVariablesName.length; i++) {
                    value += `declare const ${this.formsVariablesName[i]}: ${this.formsVariablesType[i]};`;
                }
                value += `\n`;
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                    value;
            }
            catch (e) {
            }
        }
        _updateFunctions() {
            try {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                    AjfExpressionUtils.UTIL_FUNCTIONS;
            }
            catch (e) {
            }
        }
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
        setCurrent(id, label, index) {
            if (!this.init) {
                this.label = label;
                this.init = true;
            }
            this.insertVariable(this.formsVariables[id].names[index] || '');
        }
        setCurrentId(id) {
            this.currentId = id;
            this.labels = this.formsVariables[id].labels;
            this._updateVariables();
        }
        setAggregationType(type) {
            this.aggregationType = type;
        }
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
        saveImageFormula() {
            this._service.saveImageFormula(createFormula({ formula: this.formulaText }));
        }
        saveFormulaHtml() {
            this._service.saveFormulaToHtml(this.formulaText, this.reference);
        }
        saveChartFormula() {
            this._service.saveChartFormula(this.label, this.level, this.mainIndex, this.index, this.formulaText, this.aggregationType);
        }
        saveTableFormula() {
            this._service.saveTableFormula(this.label, this.aggregationType, this.formulaText, this.mainIndex, this.index);
        }
        insertVariable(variable) {
            if (this.monacoEditor != null && this.monacoEditor.editor != null) {
                const editor = this.monacoEditor.editor;
                let value = editor.getValue().split('\n');
                let position = editor.getPosition();
                const ln = position.lineNumber - 1;
                let line = value[ln];
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
        setVariable(variable) {
            if (this.monacoEditor != null && this.monacoEditor.editor != null) {
                const editor = this.monacoEditor.editor;
                editor.setValue(variable);
            }
        }
        reset() {
            this.formulaText = '';
            this.aggregationType = AjfAggregationType.None;
        }
        close() {
            this.reset();
            this._dialogRef.close();
        }
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
        ngAfterViewChecked() {
            if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
                this.insertVariable(this.formulaText || '');
                this._first = false;
            }
        }
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
                },] }
    ];
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
    return AjfReportBuilderFormsAnalyzerDialog;
})();
export { AjfReportBuilderFormsAnalyzerDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2Zvcm1zLWFuYWx5emVyLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQ0wsa0JBQWtCLEVBS25CLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBVWpFO0lBQUEsTUFPYSxtQ0FBbUM7UUFpRDlDLFlBQ1ksUUFBaUMsRUFDakMsVUFBNkQsRUFDckUsQ0FBdUI7WUFGZixhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFtRDtZQWxEekUscUJBQWdCLEdBQWEsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUV4RSx1RUFBdUU7WUFDdkUs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STtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7O2dCQWhCTyx1QkFBdUI7Z0JBSnZCLFlBQVk7Z0JBdEJFLG9CQUFvQjs7OzBCQW9FdkMsS0FBSzs0QkFFTCxLQUFLOzRCQUVMLEtBQUs7OEJBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQUVMLEtBQUs7d0JBRUwsS0FBSzs0QkFFTCxLQUFLOzRCQUVMLEtBQUs7K0JBRUwsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7O0lBOFE3QywwQ0FBQztLQUFBO1NBelRZLG1DQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZFR5cGUsIEFqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZJbWFnZVR5cGV9IGZyb20gJ0BhamYvY29yZS9pbWFnZSc7XG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlscywgY3JlYXRlRm9ybXVsYSwgdmFsaWRhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uVHlwZSxcbiAgQWpmRGF0YXNldCxcbiAgQWpmRGF0YVdpZGdldCxcbiAgQWpmSW1hZ2VXaWRnZXQsXG4gIEFqZldpZGdldFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge3NpemVkRW51bVRvU3RyaW5nQXJyYXl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0FqZk1vbmFjb0VkaXRvcn0gZnJvbSAnQGFqZi9tYXRlcmlhbC9tb25hY28tZWRpdG9yJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXN9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFqZkRhdGFUeXBlIHtcbiAgTWFpbkRhdGEsXG4gIERhdGFzZXQsXG4gIFJlbGF0ZWREYXRhLFxuICBMRU5HVEhcbn1cbmRlY2xhcmUgdmFyIG1vbmFjbzogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3Jtcy1hbmFseXplci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm1zLWFuYWx5emVyLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm1zLWFuYWx5emVyLWRpYWxvZy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIGFnZ3JlZ2F0aW9uVHlwZXM6IHN0cmluZ1tdID0gc2l6ZWRFbnVtVG9TdHJpbmdBcnJheShBamZBZ2dyZWdhdGlvblR5cGUpO1xuXG4gIC8vICBvcGVyYXRvcnMgaXMgYW4gYXJyYXkgb2YgYW55IHR5cGUgdGhhdCBjb250YWlucyBhbGwgYWxsb3cgb3BlcmF0b3JzXG4gIG9wZXJhdG9yczogc3RyaW5nW10gPSBbXG4gICAgJ3RydWUnLCAnZmFsc2UnLCAnKCApJywgJ1xcJyBcXCcnLCAnPCcsICc8PScsICc+PScsICc+JywgJyE9JywgJyEnLCAnJiYnLCAnfHwnLCAnKycsICctJywgJyonLFxuICAgICcvJywgJyUnLCAnPT0nXG4gIF07XG5cbiAgZm9ybXVsYVRleHQ6IHN0cmluZyA9ICcnO1xuICBmb3JtdWxhRGF0ZTogc3RyaW5nID0gJyc7XG4gIHNhZmVGb3JtdWxhVGV4dDogc3RyaW5nID0gJyc7XG4gIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAgY29uZGl0aW9uOiBzdHJpbmcgPSAnJztcbiAgYWdncmVnYXRpb25UeXBlOiBBamZBZ2dyZWdhdGlvblR5cGUgPSBBamZBZ2dyZWdhdGlvblR5cGUuU3VtO1xuICBkYXRhc2V0OiBBamZEYXRhc2V0O1xuICBjdXJyZW50SWQ6IG51bWJlciA9IDA7XG4gIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcbiAgbGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGZvcm1zVmFyaWFibGVzTmFtZTogc3RyaW5nW10gPSBbXTtcbiAgZm9ybXNWYXJpYWJsZXNUeXBlOiBzdHJpbmdbXSA9IFtdO1xuICBpc1ZhbGlkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGZvcm11bGE6IHN0cmluZztcblxuICBASW5wdXQoKSBpc0Zvcm11bGE6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbGFiZWxUZXh0OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgYWdncmVnYXRpb246IG51bWJlcjtcblxuICBASW5wdXQoKSBpbml0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGxldmVsOiBudW1iZXI7XG5cbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICBASW5wdXQoKSBtYWluSW5kZXg6IG51bWJlcjtcblxuICBASW5wdXQoKSByZWZlcmVuY2U6IGFueTtcblxuICBAVmlld0NoaWxkKEFqZk1vbmFjb0VkaXRvciwge3N0YXRpYzogZmFsc2V9KSBtb25hY29FZGl0b3I6IEFqZk1vbmFjb0VkaXRvcjtcblxuICBwcml2YXRlIF9mb3JtQW5hbHl6ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9maXJzdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nPixcbiAgICAgIF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlKSB7XG4gICAgaWYgKHRoaXMuaW5pdCA9PSBmYWxzZSkge1xuICAgICAgdGhpcy5mb3JtdWxhVGV4dCA9ICcnO1xuICAgICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSBBamZBZ2dyZWdhdGlvblR5cGUuU3VtO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gPEFqZkRhdGFXaWRnZXQ+eDtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUgPT0gMikge1xuICAgICAgICAgIGxldCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgIGlmIChteU9iai5pbWFnZVR5cGUgPT0gQWpmSW1hZ2VUeXBlLkZsYWcpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXVsYSA9IChteU9iai5mbGFnKSA/IG15T2JqLmZsYWcuZm9ybXVsYSA6ICcnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvcm11bGEgPSAobXlPYmouaWNvbikgPyBteU9iai5pY29uLmZvcm11bGEgOiAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1YiA9IHRoaXMuX3NlcnZpY2UuZm9ybXNWYXJpYWJsZXMuc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25FZGl0b3JJbml0KCk6IHZvaWQge1xuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0RGlhZ25vc3RpY3NPcHRpb25zKFxuICAgICAgICB7bm9TZW1hbnRpY1ZhbGlkYXRpb246IGZhbHNlLCBub1N5bnRheFZhbGlkYXRpb246IGZhbHNlfSk7XG5cbiAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLnNldENvbXBpbGVyT3B0aW9ucyh7XG4gICAgICB0YXJnZXQ6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5TY3JpcHRUYXJnZXQuRVMyMDE1LFxuICAgICAgYWxsb3dOb25Uc0V4dGVuc2lvbnM6IHRydWUsXG4gICAgICBhbGxvd0pzOiB0cnVlLFxuICAgICAgbW9kdWxlOiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuTW9kdWxlS2luZC5Ob25lXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5hZGRFeHRyYUxpYihcbiAgICAgICAgICAnJywgJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9XG4gICAgICAgICAgJyc7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cycpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID1cbiAgICAgICAgICAnJztcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0Rm9ybXNWYXJpYWJsZXNOYW1lcygpO1xuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZ1bmN0aW9ucygpO1xuICB9XG5cblxuICBwcml2YXRlIF9pbml0Rm9ybXNWYXJpYWJsZXNOYW1lcygpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm1zVmFyaWFibGVzLmZvckVhY2goKGZvcm1WYXIpID0+IHtcbiAgICAgIGZvcm1WYXIubmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzTmFtZS5wdXNoKG5hbWUpO1xuICAgICAgfSk7XG4gICAgICBmb3JtVmFyLnR5cGVzLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlc1R5cGUucHVzaCh0aGlzLl9maWVsZFZhclR5cGUodHlwZSkgfHwgJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgX3VwZGF0ZVZhcmlhYmxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mb3Jtc1ZhcmlhYmxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZm9ybXNWYXJpYWJsZXNOYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlICs9IGBkZWNsYXJlIGNvbnN0ICR7dGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWVbaV19OiAke3RoaXMuZm9ybXNWYXJpYWJsZXNUeXBlW2ldfTtgO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZSArPSBgXFxuYDtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID1cbiAgICAgICAgICB2YWx1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRnVuY3Rpb25zKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9XG4gICAgICAgICAgQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maWVsZFZhclR5cGUoZmllbGRUeXBlOiBBamZGaWVsZFR5cGUpOiBzdHJpbmd8bnVsbCB7XG4gICAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICAgIHJldHVybiAnYm9vbGVhbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZUlucHV0OlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGltZTpcbiAgICAgICAgcmV0dXJuICdEYXRlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkVtcHR5OlxuICAgICAgICByZXR1cm4gJ3ZvaWQnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiAnYW55JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICAgIHJldHVybiAnQXJyYXknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGV4dDpcbiAgICAgICAgcmV0dXJuICdzdHJpbmcnO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHNldEN1cnJlbnQoaWQ6IG51bWJlciwgbGFiZWw6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pbml0KSB7XG4gICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICB0aGlzLmluaXQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmluc2VydFZhcmlhYmxlKHRoaXMuZm9ybXNWYXJpYWJsZXNbaWRdLm5hbWVzW2luZGV4XSB8fCAnJyk7XG4gIH1cblxuICBzZXRDdXJyZW50SWQoaWQ6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudElkID0gaWQ7XG4gICAgdGhpcy5sYWJlbHMgPSB0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5sYWJlbHM7XG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gIH1cblxuICBzZXRBZ2dyZWdhdGlvblR5cGUodHlwZTogQWpmQWdncmVnYXRpb25UeXBlKSB7XG4gICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSB0eXBlO1xuICB9XG5cbiAgY2hlY2tWYWxpZGF0aW9uKCkge1xuICAgIGlmICh0aGlzLnZhbGlkYXRlRm9ybXVsYSgpKSB7XG4gICAgICB0aGlzLnNhZmVGb3JtdWxhVGV4dCA9IHRoaXMuZm9ybXVsYVRleHQ7XG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9ybXVsYVRleHQgPT0gJycpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRm9ybXVsYSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5mb3JtdWxhVGV4dCA9PSAnJykge1xuICAgICAgdGhpcy5pbml0ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm1zVmFyaWFibGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlRXhwcmVzc2lvbih0aGlzLmZvcm11bGFUZXh0LCB0aGlzLmZvcm1zVmFyaWFibGVzTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZURhdGFzZXQoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aGlzLnNhdmVJbWFnZUZvcm11bGEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHRoaXMuc2F2ZUZvcm11bGFIdG1sKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICB0aGlzLnNhdmVDaGFydEZvcm11bGEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIHRoaXMuc2F2ZVRhYmxlRm9ybXVsYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKCkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUltYWdlRm9ybXVsYShjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiB0aGlzLmZvcm11bGFUZXh0fSkpO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFIdG1sKCkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUZvcm11bGFUb0h0bWwodGhpcy5mb3JtdWxhVGV4dCwgdGhpcy5yZWZlcmVuY2UpO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVDaGFydEZvcm11bGEoXG4gICAgICAgIHRoaXMubGFiZWwsIHRoaXMubGV2ZWwsIHRoaXMubWFpbkluZGV4LCB0aGlzLmluZGV4LCB0aGlzLmZvcm11bGFUZXh0LCB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSk7XG4gIH1cblxuICBzYXZlVGFibGVGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZVRhYmxlRm9ybXVsYShcbiAgICAgICAgdGhpcy5sYWJlbCwgdGhpcy5hZ2dyZWdhdGlvblR5cGUsIHRoaXMuZm9ybXVsYVRleHQsIHRoaXMubWFpbkluZGV4LCB0aGlzLmluZGV4KTtcbiAgfVxuXG4gIGluc2VydFZhcmlhYmxlKHZhcmlhYmxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yO1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmdbXSA9IGVkaXRvci5nZXRWYWx1ZSgpLnNwbGl0KCdcXG4nKTtcbiAgICAgIGxldCBwb3NpdGlvbjoge2NvbHVtbjogbnVtYmVyLCBsaW5lTnVtYmVyOiBudW1iZXJ9ID0gZWRpdG9yLmdldFBvc2l0aW9uKCk7XG4gICAgICBjb25zdCBsbiA9IHBvc2l0aW9uLmxpbmVOdW1iZXIgLSAxO1xuICAgICAgbGV0IGxpbmUgPSB2YWx1ZVtsbl07XG4gICAgICBsZXQgY29sID0gcG9zaXRpb24uY29sdW1uIC0gMTtcbiAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cmluZygwLCBjb2wpICsgdmFyaWFibGUgKyBsaW5lLnN1YnN0cmluZyhjb2wpO1xuICAgICAgdmFsdWVbbG5dID0gbGluZTtcbiAgICAgIHBvc2l0aW9uLmNvbHVtbiArPSB2YXJpYWJsZS5sZW5ndGg7XG4gICAgICB0aGlzLm1vbmFjb0VkaXRvci52YWx1ZSA9IHZhbHVlLmpvaW4oJ1xcbicpO1xuICAgICAgZWRpdG9yLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgdGhpcy5mb3JtdWxhVGV4dCA9IGVkaXRvci5nZXRWYWx1ZSgpO1xuICAgICAgdGhpcy5jaGVja1ZhbGlkYXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYXJpYWJsZSh2YXJpYWJsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvcjtcbiAgICAgIGVkaXRvci5zZXRWYWx1ZSh2YXJpYWJsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5mb3JtdWxhVGV4dCA9ICcnO1xuICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gQWpmQWdncmVnYXRpb25UeXBlLk5vbmU7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm11bGFUZXh0ID0gdGhpcy5mb3JtdWxhO1xuICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gdGhpcy5hZ2dyZWdhdGlvbjtcbiAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbFRleHQ7XG5cbiAgICBpZiAodGhpcy5mb3JtdWxhVGV4dCA9PSAnJyB8fCB0aGlzLmZvcm11bGFUZXh0ID09IG51bGwpIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5fZmlyc3QgJiYgdGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgdGhpcy5pbnNlcnRWYXJpYWJsZSh0aGlzLmZvcm11bGFUZXh0IHx8ICcnKTtcbiAgICAgIHRoaXMuX2ZpcnN0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=