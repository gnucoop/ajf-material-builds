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
import { AjfFieldType } from '@ajf/core/forms';
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
    constructor(_) {
        this._fields = [];
        this.condition = '';
        this.editedValue = '';
    }
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
AjfFbConditionEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFbConditionEditor, deps: [{ token: i1.AjfValidationService }], target: i0.ɵɵFactoryTarget.Component });
AjfFbConditionEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFbConditionEditor, selector: "ajf-condition-editor", inputs: { fields: "fields", condition: "condition" }, viewQueries: [{ propertyName: "monacoEditor", first: true, predicate: AjfMonacoEditor, descendants: true, static: true }], ngImport: i0, template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n", styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"], components: [{ type: i2.AjfMonacoEditor, selector: "ajf-monaco-editor", inputs: ["experimentalScreenReader", "ariaLabel", "rulers", "wordSeparators", "selectionClipboard", "lineNumbers", "selectOnLineNumbers", "lineNumbersMinChars", "glyphMargin", "lineDecorationsWidth", "revealHorizontalRightPadding", "roundedSelection", "theme", "readOnly", "scrollbar", "overviewRulerLanes", "cursorBlinking", "mouseWheelZoom", "cursorStyle", "fontLigatures", "disableTranslate3d", "hideCursorInOverviewRuler", "scrollBeyondLastLine", "automaticLayout", "wrappingColumn", "wordWrap", "wrappingIndent", "wordWrapBreakBeforeCharacters", "wordWrapBreakAfterCharacters", "wordWrapBreakObtrusiveCharacters", "stopRenderingLineAfter", "hover", "contextmenu", "mouseWheelScrollSensitivity", "quickSuggestions", "quickSuggestionsDelay", "parameterHints", "iconsInSuggestions", "autoClosingBrackets", "formatOnType", "suggestOnTriggerCharacters", "acceptSuggestionOnEnter", "snippetSuggestions", "tabCompletion", "wordBasedSuggestions", "selectionHighlight", "codeLens", "folding", "renderWhitespace", "renderControlCharacters", "renderIndentGuides", "renderLineHighlight", "useTabStops", "fontFamily", "fontWeight", "fontSize", "lineHeight", "language", "disableAutocomplete", "autoFormatOnLoad", "monacoLibPath", "valueToCompare", "value"], outputs: ["valueChange", "valueToCompareChange", "init"] }, { type: i3.MatNavList, selector: "mat-nav-list", inputs: ["disableRipple", "disabled"], exportAs: ["matNavList"] }, { type: i3.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["disableRipple", "disabled"], exportAs: ["matListItem"] }, { type: i4.AjfNodeIcon, selector: "ajf-node-icon" }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFbConditionEditor, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvY29uZGl0aW9uLWVkaXRvci50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvZmItY29uZGl0aW9uLWVkaXRvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQXVCLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQVd2QixNQUFNLE9BQU8sb0JBQW9CO0lBZ0IvQixZQUFZLENBQXVCO1FBYjNCLFlBQU8sR0FBZSxFQUFFLENBQUM7UUFTeEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUVoQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztJQUVhLENBQUM7SUFadkMsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUNJLE1BQU0sQ0FBQyxNQUFrQjtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBT0QsY0FBYyxDQUFDLFFBQWdCO1FBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2pFLE1BQU0sTUFB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QUNkLENBQUM7O2lIQXRIVSxvQkFBb0I7cUdBQXBCLG9CQUFvQixnS0FDcEIsZUFBZSw4REMzQzVCLGtwQkFtQkE7MkZEdUJhLG9CQUFvQjtrQkFQaEMsU0FBUzsrQkFDRSxzQkFBc0IsbUJBR2YsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTsyR0FHTyxZQUFZO3NCQUF2RCxTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBT3RDLE1BQU07c0JBRFQsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHN9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3J9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgdmFyIG1vbmFjbzogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY29uZGl0aW9uLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnZmItY29uZGl0aW9uLWVkaXRvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ZiLWNvbmRpdGlvbi1lZGl0b3Iuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJDb25kaXRpb25FZGl0b3Ige1xuICBAVmlld0NoaWxkKEFqZk1vbmFjb0VkaXRvciwge3N0YXRpYzogdHJ1ZX0pIG1vbmFjb0VkaXRvciE6IEFqZk1vbmFjb0VkaXRvcjtcblxuICBwcml2YXRlIF9maWVsZHM6IEFqZkZpZWxkW10gPSBbXTtcbiAgZ2V0IGZpZWxkcygpOiBBamZGaWVsZFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaWVsZHMoZmllbGRzOiBBamZGaWVsZFtdKSB7XG4gICAgdGhpcy5fZmllbGRzID0gZmllbGRzO1xuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICB9XG4gIEBJbnB1dCgpIGNvbmRpdGlvbjogc3RyaW5nID0gJyc7XG5cbiAgZWRpdGVkVmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlKSB7fVxuXG4gIGluc2VydFZhcmlhYmxlKHZhcmlhYmxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb25hY29FZGl0b3IgIT0gbnVsbCAmJiB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3IgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yO1xuICAgICAgbGV0IHZhbHVlOiBzdHJpbmdbXSA9IGVkaXRvci5nZXRWYWx1ZSgpLnNwbGl0KCdcXG4nKTtcbiAgICAgIGxldCBwb3NpdGlvbjoge2NvbHVtbjogbnVtYmVyOyBsaW5lTnVtYmVyOiBudW1iZXJ9ID0gZWRpdG9yLmdldFBvc2l0aW9uKCk7XG4gICAgICBjb25zdCBsbiA9IHBvc2l0aW9uLmxpbmVOdW1iZXIgLSAxO1xuICAgICAgbGV0IGxpbmUgPSB2YWx1ZVtsbl07XG4gICAgICBsZXQgY29sID0gcG9zaXRpb24uY29sdW1uIC0gMTtcbiAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cmluZygwLCBjb2wpICsgdmFyaWFibGUgKyBsaW5lLnN1YnN0cmluZyhjb2wpO1xuICAgICAgdmFsdWVbbG5dID0gbGluZTtcbiAgICAgIHBvc2l0aW9uLmNvbHVtbiArPSB2YXJpYWJsZS5sZW5ndGg7XG4gICAgICB0aGlzLm1vbmFjb0VkaXRvci52YWx1ZSA9IHZhbHVlLmpvaW4oJ1xcbicpO1xuICAgICAgZWRpdG9yLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgdGhpcy5lZGl0ZWRWYWx1ZSA9IGVkaXRvci5nZXRWYWx1ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uRWRpdG9ySW5pdCgpOiB2b2lkIHtcbiAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLnNldERpYWdub3N0aWNzT3B0aW9ucyh7XG4gICAgICBub1NlbWFudGljVmFsaWRhdGlvbjogZmFsc2UsXG4gICAgICBub1N5bnRheFZhbGlkYXRpb246IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXRDb21waWxlck9wdGlvbnMoe1xuICAgICAgdGFyZ2V0OiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuU2NyaXB0VGFyZ2V0LkVTMjAxNSxcbiAgICAgIGFsbG93Tm9uVHNFeHRlbnNpb25zOiB0cnVlLFxuICAgICAgYWxsb3dKczogdHJ1ZSxcbiAgICAgIG1vZHVsZTogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0Lk1vZHVsZUtpbmQuTm9uZSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAnJyxcbiAgICAgICAgJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9XG4gICAgICAgICcnO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAnJyxcbiAgICAgICAgJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9XG4gICAgICAgICcnO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZ1bmN0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlVmFyaWFibGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9maWVsZHMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ10gPVxuICAgICAgICB0aGlzLl9maWVsZHNcbiAgICAgICAgICAubWFwKChmaWVsZDogQWpmRmllbGQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgZGVjbGFyZSBjb25zdCAke2ZpZWxkLm5hbWV9OiAke3RoaXMuX2ZpZWxkVmFyVHlwZShmaWVsZC5maWVsZFR5cGUpfTtgO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oJ1xcbicpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGdW5jdGlvbnMoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID1cbiAgICAgICAgQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBwcml2YXRlIF9maWVsZFZhclR5cGUoZmllbGRUeXBlOiBBamZGaWVsZFR5cGUpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgcmV0dXJuICdib29sZWFuJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGU6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlSW5wdXQ6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UaW1lOlxuICAgICAgICByZXR1cm4gJ0RhdGUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRW1wdHk6XG4gICAgICAgIHJldHVybiAndm9pZCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Gb3JtdWxhOlxuICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgcmV0dXJuICdhbnknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTnVtYmVyOlxuICAgICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UYWJsZTpcbiAgICAgICAgcmV0dXJuICdBcnJheSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TdHJpbmc6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UZXh0OlxuICAgICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLWVkaXRvclwiPlxuICA8YWpmLW1vbmFjby1lZGl0b3JcbiAgICAgIChpbml0KT1cIm9uRWRpdG9ySW5pdCgpXCJcbiAgICAgICh2YWx1ZUNoYW5nZSk9XCJlZGl0ZWRWYWx1ZSA9ICRldmVudFwiXG4gICAgICBbdmFsdWVdPVwiY29uZGl0aW9uXCIgbGFuZ3VhZ2U9XCJqYXZhc2NyaXB0XCI+PC9hamYtbW9uYWNvLWVkaXRvcj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImFqZi1lZGl0b3ItcGFuZWxcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZpZWxkcyBhcyBjdXJGaWVsZHNcIj5cbiAgICA8bWF0LW5hdi1saXN0IGRlbnNlICpuZ0lmPVwiY3VyRmllbGRzIS5sZW5ndGggPiAwXCI+XG4gICAgICA8YSBtYXQtbGlzdC1pdGVtXG4gICAgICAgICAgKGNsaWNrKT1cImluc2VydFZhcmlhYmxlKGZpZWxkLm5hbWUpXCJcbiAgICAgICAgICBbbWF0VG9vbHRpcF09XCJmaWVsZC5sYWJlbFwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGN1ckZpZWxkcyFcIj5cbiAgICAgICAgPGFqZi1ub2RlLWljb24gW25vZGVdPVwiZmllbGRcIj48L2FqZi1ub2RlLWljb24+XG4gICAgICAgIHt7IGZpZWxkLm5hbWUgfX1cbiAgICAgIDwvYT5cbiAgICA8L21hdC1uYXYtbGlzdD5cbiAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==