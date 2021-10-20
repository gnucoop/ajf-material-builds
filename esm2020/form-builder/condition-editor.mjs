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
import { AjfExpressionUtils } from '@ajf/core/models';
import { AjfMonacoEditor } from '@ajf/material/monaco-editor';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@ajf/material/monaco-editor";
import * as i3 from "@angular/material/list";
import * as i4 from "@ajf/material/node-icon";
import * as i5 from "@angular/common";
import * as i6 from "@angular/material/tooltip";
export class AjfFbConditionEditor {
    constructor(_) { }
    get fields() {
        return this._fields;
    }
    set fields(fields) {
        this._fields = fields;
        this._updateVariables();
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
            this.editedValue = editor.getValue();
        }
    }
    onEditorInit() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false,
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2015,
            allowNonTsExtensions: true,
            allowJs: true,
            module: monaco.languages.typescript.ModuleKind.None,
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
        this._updateVariables();
        this._updateFunctions();
    }
    _updateVariables() {
        if (this._fields == null) {
            return;
        }
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                this._fields
                    .map((field) => {
                    return `declare const ${field.name}: ${this._fieldVarType(field.fieldType)};`;
                })
                    .join('\n');
        }
        catch (e) { }
    }
    _updateFunctions() {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) { }
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
}
AjfFbConditionEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFbConditionEditor, deps: [{ token: i1.AjfValidationService }], target: i0.ɵɵFactoryTarget.Component });
AjfFbConditionEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfFbConditionEditor, selector: "ajf-condition-editor", inputs: { fields: "fields", condition: "condition" }, viewQueries: [{ propertyName: "monacoEditor", first: true, predicate: AjfMonacoEditor, descendants: true, static: true }], ngImport: i0, template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n", styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"], components: [{ type: i2.AjfMonacoEditor, selector: "ajf-monaco-editor", inputs: ["experimentalScreenReader", "ariaLabel", "rulers", "wordSeparators", "selectionClipboard", "lineNumbers", "selectOnLineNumbers", "lineNumbersMinChars", "glyphMargin", "lineDecorationsWidth", "revealHorizontalRightPadding", "roundedSelection", "theme", "readOnly", "scrollbar", "overviewRulerLanes", "cursorBlinking", "mouseWheelZoom", "cursorStyle", "fontLigatures", "disableTranslate3d", "hideCursorInOverviewRuler", "scrollBeyondLastLine", "automaticLayout", "wrappingColumn", "wordWrap", "wrappingIndent", "wordWrapBreakBeforeCharacters", "wordWrapBreakAfterCharacters", "wordWrapBreakObtrusiveCharacters", "stopRenderingLineAfter", "hover", "contextmenu", "mouseWheelScrollSensitivity", "quickSuggestions", "quickSuggestionsDelay", "parameterHints", "iconsInSuggestions", "autoClosingBrackets", "formatOnType", "suggestOnTriggerCharacters", "acceptSuggestionOnEnter", "snippetSuggestions", "tabCompletion", "wordBasedSuggestions", "selectionHighlight", "codeLens", "folding", "renderWhitespace", "renderControlCharacters", "renderIndentGuides", "renderLineHighlight", "useTabStops", "fontFamily", "fontWeight", "fontSize", "lineHeight", "language", "disableAutocomplete", "autoFormatOnLoad", "monacoLibPath", "valueToCompare", "value"], outputs: ["valueChange", "valueToCompareChange", "init"] }, { type: i3.MatNavList, selector: "mat-nav-list", inputs: ["disableRipple", "disabled"], exportAs: ["matNavList"] }, { type: i3.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["disableRipple", "disabled"], exportAs: ["matListItem"] }, { type: i4.AjfNodeIcon, selector: "ajf-node-icon" }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFbConditionEditor, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-condition-editor', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n", styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfValidationService }]; }, propDecorators: { monacoEditor: [{
                type: ViewChild,
                args: [AjfMonacoEditor, { static: true }]
            }], fields: [{
                type: Input
            }], condition: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvY29uZGl0aW9uLWVkaXRvci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvZmItY29uZGl0aW9uLWVkaXRvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBV3ZCLE1BQU0sT0FBTyxvQkFBb0I7SUFnQi9CLFlBQVksQ0FBdUIsSUFBRyxDQUFDO0lBWnZDLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFDSSxNQUFNLENBQUMsTUFBa0I7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQU9ELGNBQWMsQ0FBQyxRQUFnQjtRQUM3QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUN4QyxJQUFJLEtBQUssR0FBYSxNQUFNLENBQUMsUUFBUSxF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QkFBb0I7a0JBUGhDLFNBQVM7K0JBQ0Usc0JBQXNCLG1CQUdmLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7MkdBR08sWUFBWTtzQkFBdkQsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO2dCQU90QyxNQUFNO3NCQURULEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIHZhciBtb25hY286IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNvbmRpdGlvbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ2ZiLWNvbmRpdGlvbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmYi1jb25kaXRpb24tZWRpdG9yLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJDb25kaXRpb25FZGl0b3Ige1xuICBAVmlld0NoaWxkKEFqZk1vbmFjb0VkaXRvciwge3N0YXRpYzogdHJ1ZX0pIG1vbmFjb0VkaXRvcjogQWpmTW9uYWNvRWRpdG9yO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogQWpmRmllbGRbXTtcbiAgZ2V0IGZpZWxkcygpOiBBamZGaWVsZFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaWVsZHMoZmllbGRzOiBBamZGaWVsZFtdKSB7XG4gICAgdGhpcy5fZmllbGRzID0gZmllbGRzO1xuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICB9XG4gIEBJbnB1dCgpIGNvbmRpdGlvbjogc3RyaW5nO1xuXG4gIGVkaXRlZFZhbHVlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHt9XG5cbiAgaW5zZXJ0VmFyaWFibGUodmFyaWFibGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3I7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZ1tdID0gZWRpdG9yLmdldFZhbHVlKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgbGV0IHBvc2l0aW9uOiB7Y29sdW1uOiBudW1iZXI7IGxpbmVOdW1iZXI6IG51bWJlcn0gPSBlZGl0b3IuZ2V0UG9zaXRpb24oKTtcbiAgICAgIGNvbnN0IGxuID0gcG9zaXRpb24ubGluZU51bWJlciAtIDE7XG4gICAgICBsZXQgbGluZSA9IHZhbHVlW2xuXTtcbiAgICAgIGxldCBjb2wgPSBwb3NpdGlvbi5jb2x1bW4gLSAxO1xuICAgICAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKDAsIGNvbCkgKyB2YXJpYWJsZSArIGxpbmUuc3Vic3RyaW5nKGNvbCk7XG4gICAgICB2YWx1ZVtsbl0gPSBsaW5lO1xuICAgICAgcG9zaXRpb24uY29sdW1uICs9IHZhcmlhYmxlLmxlbmd0aDtcbiAgICAgIHRoaXMubW9uYWNvRWRpdG9yLnZhbHVlID0gdmFsdWUuam9pbignXFxuJyk7XG4gICAgICBlZGl0b3Iuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLmVkaXRlZFZhbHVlID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0b3JJbml0KCk6IHZvaWQge1xuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0RGlhZ25vc3RpY3NPcHRpb25zKHtcbiAgICAgIG5vU2VtYW50aWNWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICAgIG5vU3ludGF4VmFsaWRhdGlvbjogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLnNldENvbXBpbGVyT3B0aW9ucyh7XG4gICAgICB0YXJnZXQ6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5TY3JpcHRUYXJnZXQuRVMyMDE1LFxuICAgICAgYWxsb3dOb25Uc0V4dGVuc2lvbnM6IHRydWUsXG4gICAgICBhbGxvd0pzOiB0cnVlLFxuICAgICAgbW9kdWxlOiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuTW9kdWxlS2luZC5Ob25lLFxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICcnLFxuICAgICAgICAnY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cycsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID1cbiAgICAgICAgJyc7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICcnLFxuICAgICAgICAnY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cycsXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID1cbiAgICAgICAgJyc7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gICAgdGhpcy5fdXBkYXRlRnVuY3Rpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9XG4gICAgICAgIHRoaXMuX2ZpZWxkc1xuICAgICAgICAgIC5tYXAoKGZpZWxkOiBBamZGaWVsZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBkZWNsYXJlIGNvbnN0ICR7ZmllbGQubmFtZX06ICR7dGhpcy5fZmllbGRWYXJUeXBlKGZpZWxkLmZpZWxkVHlwZSl9O2A7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuam9pbignXFxuJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZ1bmN0aW9ucygpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPVxuICAgICAgICBBamZFeHByZXNzaW9uVXRpbHMuVVRJTF9GVU5DVElPTlM7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIHByaXZhdGUgX2ZpZWxkVmFyVHlwZShmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZSk6IHN0cmluZyB8IG51bGwge1xuICAgIHN3aXRjaCAoZmllbGRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Cb29sZWFuOlxuICAgICAgICByZXR1cm4gJ2Jvb2xlYW4nO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGVJbnB1dDpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICAgIHJldHVybiAnRGF0ZSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5FbXB0eTpcbiAgICAgICAgcmV0dXJuICd2b2lkJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkZvcm11bGE6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICByZXR1cm4gJ2FueSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICByZXR1cm4gJ0FycmF5JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRleHQ6XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtZWRpdG9yXCI+XG4gIDxhamYtbW9uYWNvLWVkaXRvclxuICAgICAgKGluaXQpPVwib25FZGl0b3JJbml0KClcIlxuICAgICAgKHZhbHVlQ2hhbmdlKT1cImVkaXRlZFZhbHVlID0gJGV2ZW50XCJcbiAgICAgIFt2YWx1ZV09XCJjb25kaXRpb25cIiBsYW5ndWFnZT1cImphdmFzY3JpcHRcIj48L2FqZi1tb25hY28tZWRpdG9yPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiYWpmLWVkaXRvci1wYW5lbFwiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZmllbGRzIGFzIGN1ckZpZWxkc1wiPlxuICAgIDxtYXQtbmF2LWxpc3QgZGVuc2UgKm5nSWY9XCJjdXJGaWVsZHMhLmxlbmd0aCA+IDBcIj5cbiAgICAgIDxhIG1hdC1saXN0LWl0ZW1cbiAgICAgICAgICAoY2xpY2spPVwiaW5zZXJ0VmFyaWFibGUoZmllbGQubmFtZSlcIlxuICAgICAgICAgIFttYXRUb29sdGlwXT1cImZpZWxkLmxhYmVsXCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY3VyRmllbGRzIVwiPlxuICAgICAgICA8YWpmLW5vZGUtaWNvbiBbbm9kZV09XCJmaWVsZFwiPjwvYWpmLW5vZGUtaWNvbj5cbiAgICAgICAge3sgZmllbGQubmFtZSB9fVxuICAgICAgPC9hPlxuICAgIDwvbWF0LW5hdi1saXN0PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIl19