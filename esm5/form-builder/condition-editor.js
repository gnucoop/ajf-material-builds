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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvY29uZGl0aW9uLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFDeEUsTUFBTSxlQUFlLENBQUM7QUFJdkI7SUFvQkUsOEJBQVksQ0FBdUI7SUFBSSxDQUFDO0lBVHhDLHNCQUFJLHdDQUFNO2FBQVYsY0FBMkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNqRCxVQUFvQixNQUFrQjtZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDOzs7T0FKZ0Q7SUFXakQsNkNBQWMsR0FBZCxVQUFlLFFBQWdCO1FBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2pFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3hDLElBQUksS0FBSyxHQUFhLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxRQUFRLEdBQXlDLE1BQU0sQ0FBQyxXQUFX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QUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFmK0Isb0JBQW9COzs7K0JBaUJqRCxTQUFTLFNBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt5QkFJekMsS0FBSzs0QkFJTCxLQUFLOztJQXdHUiwyQkFBQztDQUFBLEFBeEhELElBd0hDO1NBakhZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHN9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3J9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSB2YXIgbW9uYWNvOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jb25kaXRpb24tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdmYi1jb25kaXRpb24tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZmItY29uZGl0aW9uLWVkaXRvci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJDb25kaXRpb25FZGl0b3Ige1xuICBAVmlld0NoaWxkKEFqZk1vbmFjb0VkaXRvciwge3N0YXRpYzogdHJ1ZX0pIG1vbmFjb0VkaXRvcjogQWpmTW9uYWNvRWRpdG9yO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogQWpmRmllbGRbXTtcbiAgZ2V0IGZpZWxkcygpOiBBamZGaWVsZFtdIHsgcmV0dXJuIHRoaXMuX2ZpZWxkczsgfVxuICBASW5wdXQoKSBzZXQgZmllbGRzKGZpZWxkczogQWpmRmllbGRbXSkge1xuICAgIHRoaXMuX2ZpZWxkcyA9IGZpZWxkcztcbiAgICB0aGlzLl91cGRhdGVWYXJpYWJsZXMoKTtcbiAgfVxuICBASW5wdXQoKSBjb25kaXRpb246IHN0cmluZztcblxuICBlZGl0ZWRWYWx1ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlKSB7IH1cblxuICBpbnNlcnRWYXJpYWJsZSh2YXJpYWJsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvcjtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nW10gPSBlZGl0b3IuZ2V0VmFsdWUoKS5zcGxpdCgnXFxuJyk7XG4gICAgICBsZXQgcG9zaXRpb246IHtjb2x1bW46IG51bWJlciwgbGluZU51bWJlcjogbnVtYmVyfSA9IGVkaXRvci5nZXRQb3NpdGlvbigpO1xuICAgICAgY29uc3QgbG4gPSBwb3NpdGlvbi5saW5lTnVtYmVyIC0gMTtcbiAgICAgIGxldCBsaW5lID0gdmFsdWVbbG5dO1xuICAgICAgbGV0IGNvbCA9IHBvc2l0aW9uLmNvbHVtbiAtIDE7XG4gICAgICBsaW5lID0gbGluZS5zdWJzdHJpbmcoMCwgY29sKSArIHZhcmlhYmxlICsgbGluZS5zdWJzdHJpbmcoY29sKTtcbiAgICAgIHZhbHVlW2xuXSA9IGxpbmU7XG4gICAgICBwb3NpdGlvbi5jb2x1bW4gKz0gdmFyaWFibGUubGVuZ3RoO1xuICAgICAgdGhpcy5tb25hY29FZGl0b3IudmFsdWUgPSB2YWx1ZS5qb2luKCdcXG4nKTtcbiAgICAgIGVkaXRvci5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIHRoaXMuZWRpdGVkVmFsdWUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRvckluaXQoKTogdm9pZCB7XG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXREaWFnbm9zdGljc09wdGlvbnMoe1xuICAgICAgbm9TZW1hbnRpY1ZhbGlkYXRpb246IGZhbHNlLFxuICAgICAgbm9TeW50YXhWYWxpZGF0aW9uOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXRDb21waWxlck9wdGlvbnMoe1xuICAgICAgdGFyZ2V0OiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuU2NyaXB0VGFyZ2V0LkVTMjAxNSxcbiAgICAgIGFsbG93Tm9uVHNFeHRlbnNpb25zOiB0cnVlLFxuICAgICAgYWxsb3dKczogdHJ1ZSxcbiAgICAgIG1vZHVsZTogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0Lk1vZHVsZUtpbmQuTm9uZVxuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuYWRkRXh0cmFMaWIoXG4gICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cydcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0c1xuICAgICAgICAgIC5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLXZhcmlhYmxlcy5kLnRzJ10gPSAnJztcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5hZGRFeHRyYUxpYihcbiAgICAgICAgJycsICdjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzXG4gICAgICAgICAgLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVZhcmlhYmxlcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZ1bmN0aW9ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlVmFyaWFibGVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9maWVsZHMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0c1xuICAgICAgICAuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID1cbiAgICAgICAgICB0aGlzLl9maWVsZHNcbiAgICAgICAgICAgIC5tYXAoKGZpZWxkOiBBamZGaWVsZCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYGRlY2xhcmUgY29uc3QgJHtmaWVsZC5uYW1lfTogJHt0aGlzLl9maWVsZFZhclR5cGUoZmllbGQuZmllbGRUeXBlKX07YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuam9pbignXFxuJyk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGdW5jdGlvbnMoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci1mdW5jdGlvbnMuZC50cyddID1cbiAgICAgICAgICBBamZFeHByZXNzaW9uVXRpbHMuVVRJTF9GVU5DVElPTlM7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cblxuICBwcml2YXRlIF9maWVsZFZhclR5cGUoZmllbGRUeXBlOiBBamZGaWVsZFR5cGUpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgIHJldHVybiAnYm9vbGVhbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZUlucHV0OlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGltZTpcbiAgICAgIHJldHVybiAnRGF0ZSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5FbXB0eTpcbiAgICAgIHJldHVybiAndm9pZCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Gb3JtdWxhOlxuICAgICAgcmV0dXJuICdudW1iZXInO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICByZXR1cm4gJ2FueSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICByZXR1cm4gJ251bWJlcic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UYWJsZTpcbiAgICAgIHJldHVybiAnQXJyYXknO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU3RyaW5nOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGV4dDpcbiAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==