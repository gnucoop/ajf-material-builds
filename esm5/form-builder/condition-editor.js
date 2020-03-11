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
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
var AjfFbConditionEditor = /** @class */ (function () {
    function AjfFbConditionEditor(_) {
    }
    Object.defineProperty(AjfFbConditionEditor.prototype, "fields", {
        get: function () { return this._fields; },
        set: function (fields) {
            this._fields = fields;
            this._updateVariables();
        },
        enumerable: true,
        configurable: true
    });
    AjfFbConditionEditor.prototype.insertVariable = function (variable) {
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
            this.editedValue = editor.getValue();
        }
    };
    AjfFbConditionEditor.prototype.onEditorInit = function () {
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
        this._updateVariables();
        this._updateFunctions();
    };
    AjfFbConditionEditor.prototype._updateVariables = function () {
        var _this = this;
        if (this._fields == null) {
            return;
        }
        try {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] =
                this._fields
                    .map(function (field) {
                    return "declare const " + field.name + ": " + _this._fieldVarType(field.fieldType) + ";";
                })
                    .join('\n');
        }
        catch (e) { }
    };
    AjfFbConditionEditor.prototype._updateFunctions = function () {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) { }
    };
    AjfFbConditionEditor.prototype._fieldVarType = function (fieldType) {
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
    AjfFbConditionEditor.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-condition-editor',
                    template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbConditionEditor.ctorParameters = function () { return [
        { type: AjfValidationService }
    ]; };
    AjfFbConditionEditor.propDecorators = {
        monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: true },] }],
        fields: [{ type: Input }],
        condition: [{ type: Input }]
    };
    return AjfFbConditionEditor;
}());
export { AjfFbConditionEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvY29uZGl0aW9uLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFDeEUsTUFBTSxlQUFlLENBQUM7QUFJdkI7SUFvQkUsOEJBQVksQ0FBdUI7SUFBSSxDQUFDO0lBVHhDLHNCQUFJLHdDQUFNO2FBQVYsY0FBMkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNqRCxVQUFvQixNQUFrQjtZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDOzs7T0FKZ0Q7SUFXakQsNkNBQWMsR0FBZCxVQUFlLFFBQWdCO1FBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2pFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3hDLElBQUksS0FBSyxHQUFhLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxRQUFRLEdBQXlDLE1BQU0sQ0FBQyxXQUFX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QUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFmK0Isb0JBQW9COzs7K0JBaUJqRCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt5QkFJekMsS0FBSzs0QkFJTCxLQUFLOztJQXdHUiwyQkFBQztDQUFBLEFBeEhELElBd0hDO1NBakhZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZWYWxpZGF0aW9uU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgdmFyIG1vbmFjbzogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY29uZGl0aW9uLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnZmItY29uZGl0aW9uLWVkaXRvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ZiLWNvbmRpdGlvbi1lZGl0b3IuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ29uZGl0aW9uRWRpdG9yIHtcbiAgQFZpZXdDaGlsZChBamZNb25hY29FZGl0b3IsIHtzdGF0aWM6IHRydWV9KSBtb25hY29FZGl0b3I6IEFqZk1vbmFjb0VkaXRvcjtcblxuICBwcml2YXRlIF9maWVsZHM6IEFqZkZpZWxkW107XG4gIGdldCBmaWVsZHMoKTogQWpmRmllbGRbXSB7IHJldHVybiB0aGlzLl9maWVsZHM7IH1cbiAgQElucHV0KCkgc2V0IGZpZWxkcyhmaWVsZHM6IEFqZkZpZWxkW10pIHtcbiAgICB0aGlzLl9maWVsZHMgPSBmaWVsZHM7XG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gIH1cbiAgQElucHV0KCkgY29uZGl0aW9uOiBzdHJpbmc7XG5cbiAgZWRpdGVkVmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihfOiBBamZWYWxpZGF0aW9uU2VydmljZSkgeyB9XG5cbiAgaW5zZXJ0VmFyaWFibGUodmFyaWFibGU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vbmFjb0VkaXRvciAhPSBudWxsICYmIHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvciAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLm1vbmFjb0VkaXRvci5lZGl0b3I7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZ1tdID0gZWRpdG9yLmdldFZhbHVlKCkuc3BsaXQoJ1xcbicpO1xuICAgICAgbGV0IHBvc2l0aW9uOiB7Y29sdW1uOiBudW1iZXIsIGxpbmVOdW1iZXI6IG51bWJlcn0gPSBlZGl0b3IuZ2V0UG9zaXRpb24oKTtcbiAgICAgIGNvbnN0IGxuID0gcG9zaXRpb24ubGluZU51bWJlciAtIDE7XG4gICAgICBsZXQgbGluZSA9IHZhbHVlW2xuXTtcbiAgICAgIGxldCBjb2wgPSBwb3NpdGlvbi5jb2x1bW4gLSAxO1xuICAgICAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKDAsIGNvbCkgKyB2YXJpYWJsZSArIGxpbmUuc3Vic3RyaW5nKGNvbCk7XG4gICAgICB2YWx1ZVtsbl0gPSBsaW5lO1xuICAgICAgcG9zaXRpb24uY29sdW1uICs9IHZhcmlhYmxlLmxlbmd0aDtcbiAgICAgIHRoaXMubW9uYWNvRWRpdG9yLnZhbHVlID0gdmFsdWUuam9pbignXFxuJyk7XG4gICAgICBlZGl0b3Iuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLmVkaXRlZFZhbHVlID0gZWRpdG9yLmdldFZhbHVlKCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0b3JJbml0KCk6IHZvaWQge1xuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0RGlhZ25vc3RpY3NPcHRpb25zKHtcbiAgICAgIG5vU2VtYW50aWNWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICAgIG5vU3ludGF4VmFsaWRhdGlvbjogZmFsc2VcbiAgICB9KTtcblxuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0Q29tcGlsZXJPcHRpb25zKHtcbiAgICAgIHRhcmdldDogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LlNjcmlwdFRhcmdldC5FUzIwMTUsXG4gICAgICBhbGxvd05vblRzRXh0ZW5zaW9uczogdHJ1ZSxcbiAgICAgIGFsbG93SnM6IHRydWUsXG4gICAgICBtb2R1bGU6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5Nb2R1bGVLaW5kLk5vbmVcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAnJywgJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHNcbiAgICAgICAgICAuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID0gJyc7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cydcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0c1xuICAgICAgICAgIC5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVWYXJpYWJsZXMoKTtcbiAgICB0aGlzLl91cGRhdGVGdW5jdGlvbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVZhcmlhYmxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZmllbGRzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHNcbiAgICAgICAgLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9XG4gICAgICAgICAgdGhpcy5fZmllbGRzXG4gICAgICAgICAgICAubWFwKChmaWVsZDogQWpmRmllbGQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGBkZWNsYXJlIGNvbnN0ICR7ZmllbGQubmFtZX06ICR7dGhpcy5fZmllbGRWYXJUeXBlKGZpZWxkLmZpZWxkVHlwZSl9O2A7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRnVuY3Rpb25zKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9XG4gICAgICAgICAgQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmllbGRWYXJUeXBlKGZpZWxkVHlwZTogQWpmRmllbGRUeXBlKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICByZXR1cm4gJ2Jvb2xlYW4nO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGVJbnB1dDpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICByZXR1cm4gJ0RhdGUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRW1wdHk6XG4gICAgICByZXR1cm4gJ3ZvaWQnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgcmV0dXJuICdhbnknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTnVtYmVyOlxuICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICByZXR1cm4gJ0FycmF5JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRleHQ6XG4gICAgICByZXR1cm4gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=