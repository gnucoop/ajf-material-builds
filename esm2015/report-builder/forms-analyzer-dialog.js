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
export class AjfReportBuilderFormsAnalyzerDialog {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2Zvcm1zLWFuYWx5emVyLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQ0wsa0JBQWtCLEVBS25CLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBaUJqRSxNQUFNLE9BQU8sbUNBQW1DO0lBaUQ5QyxZQUNZLFFBQWlDLEVBQ2pDLFVBQTZELEVBQ3JFLENBQXVCO1FBRmYsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBbUQ7UUFsRHpFLHFCQUFnQixHQUFhLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFeEUsdUVBQXVFO1FBQ3ZF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RSxvQkFBb0I7OztzQkFvRXZDLEtBQUs7d0JBRUwsS0FBSzt3QkFFTCxLQUFLOzBCQUVMLEtBQUs7bUJBRUwsS0FBSztvQkFFTCxLQUFLO29CQUVMLEtBQUs7d0JBRUwsS0FBSzt3QkFFTCxLQUFLOzJCQUVMLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkVHlwZSwgQWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2ltYWdlJztcbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzLCBjcmVhdGVGb3JtdWxhLCB2YWxpZGF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb25UeXBlLFxuICBBamZEYXRhc2V0LFxuICBBamZEYXRhV2lkZ2V0LFxuICBBamZJbWFnZVdpZGdldCxcbiAgQWpmV2lkZ2V0XG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7c2l6ZWRFbnVtVG9TdHJpbmdBcnJheX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRGF0YVR5cGUge1xuICBNYWluRGF0YSxcbiAgRGF0YXNldCxcbiAgUmVsYXRlZERhdGEsXG4gIExFTkdUSFxufVxuZGVjbGFyZSB2YXIgbW9uYWNvOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1zLWFuYWx5emVyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgYWdncmVnYXRpb25UeXBlczogc3RyaW5nW10gPSBzaXplZEVudW1Ub1N0cmluZ0FycmF5KEFqZkFnZ3JlZ2F0aW9uVHlwZSk7XG5cbiAgLy8gIG9wZXJhdG9ycyBpcyBhbiBhcnJheSBvZiBhbnkgdHlwZSB0aGF0IGNvbnRhaW5zIGFsbCBhbGxvdyBvcGVyYXRvcnNcbiAgb3BlcmF0b3JzOiBzdHJpbmdbXSA9IFtcbiAgICAndHJ1ZScsICdmYWxzZScsICcoICknLCAnXFwnIFxcJycsICc8JywgJzw9JywgJz49JywgJz4nLCAnIT0nLCAnIScsICcmJicsICd8fCcsICcrJywgJy0nLCAnKicsXG4gICAgJy8nLCAnJScsICc9PSdcbiAgXTtcblxuICBmb3JtdWxhVGV4dDogc3RyaW5nID0gJyc7XG4gIGZvcm11bGFEYXRlOiBzdHJpbmcgPSAnJztcbiAgc2FmZUZvcm11bGFUZXh0OiBzdHJpbmcgPSAnJztcbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuICBjb25kaXRpb246IHN0cmluZyA9ICcnO1xuICBhZ2dyZWdhdGlvblR5cGU6IEFqZkFnZ3JlZ2F0aW9uVHlwZSA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5TdW07XG4gIGRhdGFzZXQ6IEFqZkRhdGFzZXQ7XG4gIGN1cnJlbnRJZDogbnVtYmVyID0gMDtcbiAgY3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xuICBsYWJlbHM6IHN0cmluZ1tdID0gW107XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgZm9ybXNWYXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXTtcbiAgZm9ybXNWYXJpYWJsZXNOYW1lOiBzdHJpbmdbXSA9IFtdO1xuICBmb3Jtc1ZhcmlhYmxlc1R5cGU6IHN0cmluZ1tdID0gW107XG4gIGlzVmFsaWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgZm9ybXVsYTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGlzRm9ybXVsYTogYm9vbGVhbjtcblxuICBASW5wdXQoKSBsYWJlbFRleHQ6IHN0cmluZztcblxuICBASW5wdXQoKSBhZ2dyZWdhdGlvbjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGluaXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgbGV2ZWw6IG51bWJlcjtcblxuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIG1haW5JbmRleDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHJlZmVyZW5jZTogYW55O1xuXG4gIEBWaWV3Q2hpbGQoQWpmTW9uYWNvRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIG1vbmFjb0VkaXRvcjogQWpmTW9uYWNvRWRpdG9yO1xuXG4gIHByaXZhdGUgX2Zvcm1BbmFseXplclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZpcnN0OiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2c+LFxuICAgICAgXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICBpZiAodGhpcy5pbml0ID09IGZhbHNlKSB7XG4gICAgICB0aGlzLmZvcm11bGFUZXh0ID0gJyc7XG4gICAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5TdW07XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSA8QWpmRGF0YVdpZGdldD54O1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZSA9PSAyKSB7XG4gICAgICAgICAgbGV0IG15T2JqOiBBamZJbWFnZVdpZGdldCA9IDxBamZJbWFnZVdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgaWYgKG15T2JqLmltYWdlVHlwZSA9PSBBamZJbWFnZVR5cGUuRmxhZykge1xuICAgICAgICAgICAgdGhpcy5mb3JtdWxhID0gKG15T2JqLmZsYWcpID8gbXlPYmouZmxhZy5mb3JtdWxhIDogJyc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybXVsYSA9IChteU9iai5pY29uKSA/IG15T2JqLmljb24uZm9ybXVsYSA6ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViID0gdGhpcy5fc2VydmljZS5mb3Jtc1ZhcmlhYmxlcy5zdWJzY3JpYmUoKHgpID0+IHtcbiAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcyA9IHg7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbkVkaXRvckluaXQoKTogdm9pZCB7XG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXREaWFnbm9zdGljc09wdGlvbnMoXG4gICAgICAgIHtub1NlbWFudGljVmFsaWRhdGlvbjogZmFsc2UsIG5vU3ludGF4VmFsaWRhdGlvbjogZmFsc2V9KTtcblxuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0Q29tcGlsZXJPcHRpb25zKHtcbiAgICAgIHRhcmdldDogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LlNjcmlwdFRhcmdldC5FUzIwMTUsXG4gICAgICBhbGxvd05vblRzRXh0ZW5zaW9uczogdHJ1ZSxcbiAgICAgIGFsbG93SnM6IHRydWUsXG4gICAgICBtb2R1bGU6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5Nb2R1bGVLaW5kLk5vbmVcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cycpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID1cbiAgICAgICAgICAnJztcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICAgJycsICdjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPVxuICAgICAgICAgICcnO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXRGb3Jtc1ZhcmlhYmxlc05hbWVzKCk7XG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gICAgdGhpcy5fdXBkYXRlRnVuY3Rpb25zKCk7XG4gIH1cblxuXG4gIHByaXZhdGUgX2luaXRGb3Jtc1ZhcmlhYmxlc05hbWVzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMuZm9yRWFjaCgoZm9ybVZhcikgPT4ge1xuICAgICAgZm9ybVZhci5uYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXNOYW1lLnB1c2gobmFtZSk7XG4gICAgICB9KTtcbiAgICAgIGZvcm1WYXIudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzVHlwZS5wdXNoKHRoaXMuX2ZpZWxkVmFyVHlwZSh0eXBlKSB8fCAnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfdXBkYXRlVmFyaWFibGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvcm1zVmFyaWFibGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgKz0gYGRlY2xhcmUgY29uc3QgJHt0aGlzLmZvcm1zVmFyaWFibGVzTmFtZVtpXX06ICR7dGhpcy5mb3Jtc1ZhcmlhYmxlc1R5cGVbaV19O2A7XG4gICAgICB9XG5cbiAgICAgIHZhbHVlICs9IGBcXG5gO1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ10gPVxuICAgICAgICAgIHZhbHVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGdW5jdGlvbnMoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID1cbiAgICAgICAgICBBamZFeHByZXNzaW9uVXRpbHMuVVRJTF9GVU5DVElPTlM7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpZWxkVmFyVHlwZShmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZSk6IHN0cmluZ3xudWxsIHtcbiAgICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgcmV0dXJuICdib29sZWFuJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGU6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlSW5wdXQ6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UaW1lOlxuICAgICAgICByZXR1cm4gJ0RhdGUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRW1wdHk6XG4gICAgICAgIHJldHVybiAndm9pZCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Gb3JtdWxhOlxuICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgcmV0dXJuICdhbnknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTnVtYmVyOlxuICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UYWJsZTpcbiAgICAgICAgcmV0dXJuICdBcnJheSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TdHJpbmc6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UZXh0OlxuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc2V0Q3VycmVudChpZDogbnVtYmVyLCBsYWJlbDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmluaXQpIHtcbiAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgIHRoaXMuaW5pdCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaW5zZXJ0VmFyaWFibGUodGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubmFtZXNbaW5kZXhdIHx8ICcnKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRJZChpZDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50SWQgPSBpZDtcbiAgICB0aGlzLmxhYmVscyA9IHRoaXMuZm9ybXNWYXJpYWJsZXNbaWRdLmxhYmVscztcbiAgICB0aGlzLl91cGRhdGVWYXJpYWJsZXMoKTtcbiAgfVxuXG4gIHNldEFnZ3JlZ2F0aW9uVHlwZSh0eXBlOiBBamZBZ2dyZWdhdGlvblR5cGUpIHtcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IHR5cGU7XG4gIH1cblxuICBjaGVja1ZhbGlkYXRpb24oKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVGb3JtdWxhKCkpIHtcbiAgICAgIHRoaXMuc2FmZUZvcm11bGFUZXh0ID0gdGhpcy5mb3JtdWxhVGV4dDtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb3JtdWxhVGV4dCA9PSAnJykge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVGb3JtdWxhKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmZvcm11bGFUZXh0ID09ICcnKSB7XG4gICAgICB0aGlzLmluaXQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9ybXNWYXJpYWJsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGVFeHByZXNzaW9uKHRoaXMuZm9ybXVsYVRleHQsIHRoaXMuZm9ybXNWYXJpYWJsZXNOYW1lKTtcbiAgICB9XG4gIH1cblxuICBzYXZlRGF0YXNldCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRoaXMuc2F2ZUltYWdlRm9ybXVsYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgdGhpcy5zYXZlRm9ybXVsYUh0bWwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHRoaXMuc2F2ZUNoYXJ0Rm9ybXVsYSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgdGhpcy5zYXZlVGFibGVGb3JtdWxhKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHNhdmVJbWFnZUZvcm11bGEoKSB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlSW1hZ2VGb3JtdWxhKGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHRoaXMuZm9ybXVsYVRleHR9KSk7XG4gIH1cblxuICBzYXZlRm9ybXVsYUh0bWwoKSB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlRm9ybXVsYVRvSHRtbCh0aGlzLmZvcm11bGFUZXh0LCB0aGlzLnJlZmVyZW5jZSk7XG4gIH1cblxuICBzYXZlQ2hhcnRGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICAgICAgdGhpcy5sYWJlbCwgdGhpcy5sZXZlbCwgdGhpcy5tYWluSW5kZXgsIHRoaXMuaW5kZXgsIHRoaXMuZm9ybXVsYVRleHQsIHRoaXMuYWdncmVnYXRpb25UeXBlKTtcbiAgfVxuXG4gIHNhdmVUYWJsZUZvcm11bGEoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlVGFibGVGb3JtdWxhKFxuICAgICAgICB0aGlzLmxhYmVsLCB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSwgdGhpcy5mb3JtdWxhVGV4dCwgdGhpcy5tYWluSW5kZXgsIHRoaXMuaW5kZXgpO1xuICB9XG5cbiAgaW5zZXJ0VmFyaWFibGUodmFyaWFibGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3I7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZ1tdID0gZWRpdG9yLmdldFZhbHVlKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgbGV0IHBvc2l0aW9uOiB7Y29sdW1uOiBudW1iZXIsIGxpbmVOdW1iZXI6IG51bWJlcn0gPSBlZGl0b3IuZ2V0UG9zaXRpb24oKTtcbiAgICAgIGNvbnN0IGxuID0gcG9zaXRpb24ubGluZU51bWJlciAtIDE7XG4gICAgICBsZXQgbGluZSA9IHZhbHVlW2xuXTtcbiAgICAgIGxldCBjb2wgPSBwb3NpdGlvbi5jb2x1bW4gLSAxO1xuICAgICAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKDAsIGNvbCkgKyB2YXJpYWJsZSArIGxpbmUuc3Vic3RyaW5nKGNvbCk7XG4gICAgICB2YWx1ZVtsbl0gPSBsaW5lO1xuICAgICAgcG9zaXRpb24uY29sdW1uICs9IHZhcmlhYmxlLmxlbmd0aDtcbiAgICAgIHRoaXMubW9uYWNvRWRpdG9yLnZhbHVlID0gdmFsdWUuam9pbignXFxuJyk7XG4gICAgICBlZGl0b3Iuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLmZvcm11bGFUZXh0ID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgICB0aGlzLmNoZWNrVmFsaWRhdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhcmlhYmxlKHZhcmlhYmxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yO1xuICAgICAgZWRpdG9yLnNldFZhbHVlKHZhcmlhYmxlKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmZvcm11bGFUZXh0ID0gJyc7XG4gICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybXVsYVRleHQgPSB0aGlzLmZvcm11bGE7XG4gICAgdGhpcy5hZ2dyZWdhdGlvblR5cGUgPSB0aGlzLmFnZ3JlZ2F0aW9uO1xuICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsVGV4dDtcblxuICAgIGlmICh0aGlzLmZvcm11bGFUZXh0ID09ICcnIHx8IHRoaXMuZm9ybXVsYVRleHQgPT0gbnVsbCkge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLl9maXJzdCAmJiB0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmluc2VydFZhcmlhYmxlKHRoaXMuZm9ybXVsYVRleHQgfHwgJycpO1xuICAgICAgdGhpcy5fZmlyc3QgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==