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
    return AjfReportBuilderFormsAnalyzerDialog;
})();
export { AjfReportBuilderFormsAnalyzerDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2Zvcm1zLWFuYWx5emVyLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RixPQUFPLEVBQ0wsa0JBQWtCLEVBS25CLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2xDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBVWpFO0lBQUEsTUFPYSxtQ0FBbUM7UUFpRDlDLFlBQ1ksUUFBaUMsRUFDakMsVUFBNkQsRUFDckUsQ0FBdUI7WUFGZixhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFtRDtZQWxEekUscUJBQWdCLEdBQWEsc0JBQXNCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUV4RSx1RUFBdUU7WUFDdkUs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STtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFoQk8sdUJBQXVCO2dCQUp2QixZQUFZO2dCQXRCRSxvQkFBb0I7OzswQkFvRXZDLEtBQUs7NEJBRUwsS0FBSzs0QkFFTCxLQUFLOzhCQUVMLEtBQUs7dUJBRUwsS0FBSzt3QkFFTCxLQUFLO3dCQUVMLEtBQUs7NEJBRUwsS0FBSzs0QkFFTCxLQUFLOytCQUVMLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztJQThRN0MsMENBQUM7S0FBQTtTQXpUWSxtQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGRUeXBlLCBBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHMsIGNyZWF0ZUZvcm11bGEsIHZhbGlkYXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvblR5cGUsXG4gIEFqZkRhdGFzZXQsXG4gIEFqZkRhdGFXaWRnZXQsXG4gIEFqZkltYWdlV2lkZ2V0LFxuICBBamZXaWRnZXRcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtzaXplZEVudW1Ub1N0cmluZ0FycmF5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3J9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgZW51bSBBamZEYXRhVHlwZSB7XG4gIE1haW5EYXRhLFxuICBEYXRhc2V0LFxuICBSZWxhdGVkRGF0YSxcbiAgTEVOR1RIXG59XG5kZWNsYXJlIHZhciBtb25hY286IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybXMtYW5hbHl6ZXItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3Jtcy1hbmFseXplci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3Jtcy1hbmFseXplci1kaWFsb2cuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBhZ2dyZWdhdGlvblR5cGVzOiBzdHJpbmdbXSA9IHNpemVkRW51bVRvU3RyaW5nQXJyYXkoQWpmQWdncmVnYXRpb25UeXBlKTtcblxuICAvLyAgb3BlcmF0b3JzIGlzIGFuIGFycmF5IG9mIGFueSB0eXBlIHRoYXQgY29udGFpbnMgYWxsIGFsbG93IG9wZXJhdG9yc1xuICBvcGVyYXRvcnM6IHN0cmluZ1tdID0gW1xuICAgICd0cnVlJywgJ2ZhbHNlJywgJyggKScsICdcXCcgXFwnJywgJzwnLCAnPD0nLCAnPj0nLCAnPicsICchPScsICchJywgJyYmJywgJ3x8JywgJysnLCAnLScsICcqJyxcbiAgICAnLycsICclJywgJz09J1xuICBdO1xuXG4gIGZvcm11bGFUZXh0OiBzdHJpbmcgPSAnJztcbiAgZm9ybXVsYURhdGU6IHN0cmluZyA9ICcnO1xuICBzYWZlRm9ybXVsYVRleHQ6IHN0cmluZyA9ICcnO1xuICBsYWJlbDogc3RyaW5nID0gJyc7XG4gIGNvbmRpdGlvbjogc3RyaW5nID0gJyc7XG4gIGFnZ3JlZ2F0aW9uVHlwZTogQWpmQWdncmVnYXRpb25UeXBlID0gQWpmQWdncmVnYXRpb25UeXBlLlN1bTtcbiAgZGF0YXNldDogQWpmRGF0YXNldDtcbiAgY3VycmVudElkOiBudW1iZXIgPSAwO1xuICBjdXJyZW50SW5kZXg6IG51bWJlciA9IDA7XG4gIGxhYmVsczogc3RyaW5nW10gPSBbXTtcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdO1xuICBmb3Jtc1ZhcmlhYmxlc05hbWU6IHN0cmluZ1tdID0gW107XG4gIGZvcm1zVmFyaWFibGVzVHlwZTogc3RyaW5nW10gPSBbXTtcbiAgaXNWYWxpZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBmb3JtdWxhOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgaXNGb3JtdWxhOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGxhYmVsVGV4dDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGFnZ3JlZ2F0aW9uOiBudW1iZXI7XG5cbiAgQElucHV0KCkgaW5pdDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBsZXZlbDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbWFpbkluZGV4OiBudW1iZXI7XG5cbiAgQElucHV0KCkgcmVmZXJlbmNlOiBhbnk7XG5cbiAgQFZpZXdDaGlsZChBamZNb25hY29FZGl0b3IsIHtzdGF0aWM6IGZhbHNlfSkgbW9uYWNvRWRpdG9yOiBBamZNb25hY29FZGl0b3I7XG5cbiAgcHJpdmF0ZSBfZm9ybUFuYWx5emVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz4sXG4gICAgICBfOiBBamZWYWxpZGF0aW9uU2VydmljZSkge1xuICAgIGlmICh0aGlzLmluaXQgPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZm9ybXVsYVRleHQgPSAnJztcbiAgICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gQWpmQWdncmVnYXRpb25UeXBlLlN1bTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IDxBamZEYXRhV2lkZ2V0Png7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlID09IDIpIHtcbiAgICAgICAgICBsZXQgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgICBpZiAobXlPYmouaW1hZ2VUeXBlID09IEFqZkltYWdlVHlwZS5GbGFnKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm11bGEgPSAobXlPYmouZmxhZykgPyBteU9iai5mbGFnLmZvcm11bGEgOiAnJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtdWxhID0gKG15T2JqLmljb24pID8gbXlPYmouaWNvbi5mb3JtdWxhIDogJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvcm1zVmFyaWFibGVzLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzID0geDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uRWRpdG9ySW5pdCgpOiB2b2lkIHtcbiAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLnNldERpYWdub3N0aWNzT3B0aW9ucyhcbiAgICAgICAge25vU2VtYW50aWNWYWxpZGF0aW9uOiBmYWxzZSwgbm9TeW50YXhWYWxpZGF0aW9uOiBmYWxzZX0pO1xuXG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXRDb21waWxlck9wdGlvbnMoe1xuICAgICAgdGFyZ2V0OiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuU2NyaXB0VGFyZ2V0LkVTMjAxNSxcbiAgICAgIGFsbG93Tm9uVHNFeHRlbnNpb25zOiB0cnVlLFxuICAgICAgYWxsb3dKczogdHJ1ZSxcbiAgICAgIG1vZHVsZTogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0Lk1vZHVsZUtpbmQuTm9uZVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICAgJycsICdjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ10gPVxuICAgICAgICAgICcnO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5hZGRFeHRyYUxpYihcbiAgICAgICAgICAnJywgJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9XG4gICAgICAgICAgJyc7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdEZvcm1zVmFyaWFibGVzTmFtZXMoKTtcbiAgICB0aGlzLl91cGRhdGVWYXJpYWJsZXMoKTtcbiAgICB0aGlzLl91cGRhdGVGdW5jdGlvbnMoKTtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1zVmFyaWFibGVzTmFtZXMoKTogdm9pZCB7XG4gICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcy5mb3JFYWNoKChmb3JtVmFyKSA9PiB7XG4gICAgICBmb3JtVmFyLm5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWUucHVzaChuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgZm9ybVZhci50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXNUeXBlLnB1c2godGhpcy5fZmllbGRWYXJUeXBlKHR5cGUpIHx8ICcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cblxuICBwcml2YXRlIF91cGRhdGVWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9ybXNWYXJpYWJsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmcgPSAnJztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZvcm1zVmFyaWFibGVzTmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSArPSBgZGVjbGFyZSBjb25zdCAke3RoaXMuZm9ybXNWYXJpYWJsZXNOYW1lW2ldfTogJHt0aGlzLmZvcm1zVmFyaWFibGVzVHlwZVtpXX07YDtcbiAgICAgIH1cblxuICAgICAgdmFsdWUgKz0gYFxcbmA7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9XG4gICAgICAgICAgdmFsdWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZ1bmN0aW9ucygpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPVxuICAgICAgICAgIEFqZkV4cHJlc3Npb25VdGlscy5VVElMX0ZVTkNUSU9OUztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmllbGRWYXJUeXBlKGZpZWxkVHlwZTogQWpmRmllbGRUeXBlKTogc3RyaW5nfG51bGwge1xuICAgIHN3aXRjaCAoZmllbGRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Cb29sZWFuOlxuICAgICAgICByZXR1cm4gJ2Jvb2xlYW4nO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGVJbnB1dDpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICAgIHJldHVybiAnRGF0ZSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5FbXB0eTpcbiAgICAgICAgcmV0dXJuICd2b2lkJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkZvcm11bGE6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICByZXR1cm4gJ2FueSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICByZXR1cm4gJ0FycmF5JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRleHQ6XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzZXRDdXJyZW50KGlkOiBudW1iZXIsIGxhYmVsOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaW5pdCkge1xuICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgdGhpcy5pbml0ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5pbnNlcnRWYXJpYWJsZSh0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5uYW1lc1tpbmRleF0gfHwgJycpO1xuICB9XG5cbiAgc2V0Q3VycmVudElkKGlkOiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJZCA9IGlkO1xuICAgIHRoaXMubGFiZWxzID0gdGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubGFiZWxzO1xuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICB9XG5cbiAgc2V0QWdncmVnYXRpb25UeXBlKHR5cGU6IEFqZkFnZ3JlZ2F0aW9uVHlwZSkge1xuICAgIHRoaXMuYWdncmVnYXRpb25UeXBlID0gdHlwZTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRhdGlvbigpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZUZvcm11bGEoKSkge1xuICAgICAgdGhpcy5zYWZlRm9ybXVsYVRleHQgPSB0aGlzLmZvcm11bGFUZXh0O1xuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm11bGFUZXh0ID09ICcnKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUZvcm11bGEoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZm9ybXVsYVRleHQgPT0gJycpIHtcbiAgICAgIHRoaXMuaW5pdCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5mb3Jtc1ZhcmlhYmxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWxpZGF0ZUV4cHJlc3Npb24odGhpcy5mb3JtdWxhVGV4dCwgdGhpcy5mb3Jtc1ZhcmlhYmxlc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVEYXRhc2V0KCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgIT0gbnVsbCkge1xuICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZSkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgdGhpcy5zYXZlSW1hZ2VGb3JtdWxhKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICB0aGlzLnNhdmVGb3JtdWxhSHRtbCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgdGhpcy5zYXZlQ2hhcnRGb3JtdWxhKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICB0aGlzLnNhdmVUYWJsZUZvcm11bGEoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2F2ZUltYWdlRm9ybXVsYSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVJbWFnZUZvcm11bGEoY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogdGhpcy5mb3JtdWxhVGV4dH0pKTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhSHRtbCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVGb3JtdWxhVG9IdG1sKHRoaXMuZm9ybXVsYVRleHQsIHRoaXMucmVmZXJlbmNlKTtcbiAgfVxuXG4gIHNhdmVDaGFydEZvcm11bGEoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlQ2hhcnRGb3JtdWxhKFxuICAgICAgICB0aGlzLmxhYmVsLCB0aGlzLmxldmVsLCB0aGlzLm1haW5JbmRleCwgdGhpcy5pbmRleCwgdGhpcy5mb3JtdWxhVGV4dCwgdGhpcy5hZ2dyZWdhdGlvblR5cGUpO1xuICB9XG5cbiAgc2F2ZVRhYmxlRm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVUYWJsZUZvcm11bGEoXG4gICAgICAgIHRoaXMubGFiZWwsIHRoaXMuYWdncmVnYXRpb25UeXBlLCB0aGlzLmZvcm11bGFUZXh0LCB0aGlzLm1haW5JbmRleCwgdGhpcy5pbmRleCk7XG4gIH1cblxuICBpbnNlcnRWYXJpYWJsZSh2YXJpYWJsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvcjtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nW10gPSBlZGl0b3IuZ2V0VmFsdWUoKS5zcGxpdCgnXFxuJyk7XG4gICAgICBsZXQgcG9zaXRpb246IHtjb2x1bW46IG51bWJlciwgbGluZU51bWJlcjogbnVtYmVyfSA9IGVkaXRvci5nZXRQb3NpdGlvbigpO1xuICAgICAgY29uc3QgbG4gPSBwb3NpdGlvbi5saW5lTnVtYmVyIC0gMTtcbiAgICAgIGxldCBsaW5lID0gdmFsdWVbbG5dO1xuICAgICAgbGV0IGNvbCA9IHBvc2l0aW9uLmNvbHVtbiAtIDE7XG4gICAgICBsaW5lID0gbGluZS5zdWJzdHJpbmcoMCwgY29sKSArIHZhcmlhYmxlICsgbGluZS5zdWJzdHJpbmcoY29sKTtcbiAgICAgIHZhbHVlW2xuXSA9IGxpbmU7XG4gICAgICBwb3NpdGlvbi5jb2x1bW4gKz0gdmFyaWFibGUubGVuZ3RoO1xuICAgICAgdGhpcy5tb25hY29FZGl0b3IudmFsdWUgPSB2YWx1ZS5qb2luKCdcXG4nKTtcbiAgICAgIGVkaXRvci5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIHRoaXMuZm9ybXVsYVRleHQgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFyaWFibGUodmFyaWFibGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3I7XG4gICAgICBlZGl0b3Iuc2V0VmFsdWUodmFyaWFibGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZm9ybXVsYVRleHQgPSAnJztcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtdWxhVGV4dCA9IHRoaXMuZm9ybXVsYTtcbiAgICB0aGlzLmFnZ3JlZ2F0aW9uVHlwZSA9IHRoaXMuYWdncmVnYXRpb247XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWxUZXh0O1xuXG4gICAgaWYgKHRoaXMuZm9ybXVsYVRleHQgPT0gJycgfHwgdGhpcy5mb3JtdWxhVGV4dCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgaWYgKHRoaXMuX2ZpcnN0ICYmIHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaW5zZXJ0VmFyaWFibGUodGhpcy5mb3JtdWxhVGV4dCB8fCAnJyk7XG4gICAgICB0aGlzLl9maXJzdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19