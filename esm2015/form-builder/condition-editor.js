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
let AjfFbConditionEditor = /** @class */ (() => {
    class AjfFbConditionEditor {
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
    }
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
    AjfFbConditionEditor.ctorParameters = () => [
        { type: AjfValidationService }
    ];
    AjfFbConditionEditor.propDecorators = {
        monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: true },] }],
        fields: [{ type: Input }],
        condition: [{ type: Input }]
    };
    return AjfFbConditionEditor;
})();
export { AjfFbConditionEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvY29uZGl0aW9uLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFFLG9CQUFvQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBSXZCO0lBQUEsTUFPYSxvQkFBb0I7UUFnQi9CLFlBQVksQ0FBdUIsSUFBRyxDQUFDO1FBWnZDLElBQUksTUFBTTtZQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFDSSxNQUFNLENBQUMsTUFBa0I7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQztRQU9ELGNBQWMsQ0FBQyxRQUFnQjtZQUM3QixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDakUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ3hDLElBQUksS0FBSyxHQUFhLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELElBQUksUUFBUSxHQUF5QyxNQUFNLENBQUMsV0FBVyxFQUFF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QUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFuQitCLG9CQUFvQjs7OytCQXFCakQsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7eUJBTXpDLEtBQUs7NEJBS0wsS0FBSzs7SUF1R1IsMkJBQUM7S0FBQTtTQW5IWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlsc30gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZk1vbmFjb0VkaXRvcn0gZnJvbSAnQGFqZi9tYXRlcmlhbC9tb25hY28tZWRpdG9yJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZWNsYXJlIHZhciBtb25hY286IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNvbmRpdGlvbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ2ZiLWNvbmRpdGlvbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmYi1jb25kaXRpb24tZWRpdG9yLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkNvbmRpdGlvbkVkaXRvciB7XG4gIEBWaWV3Q2hpbGQoQWpmTW9uYWNvRWRpdG9yLCB7c3RhdGljOiB0cnVlfSkgbW9uYWNvRWRpdG9yOiBBamZNb25hY29FZGl0b3I7XG5cbiAgcHJpdmF0ZSBfZmllbGRzOiBBamZGaWVsZFtdO1xuICBnZXQgZmllbGRzKCk6IEFqZkZpZWxkW10ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpZWxkcyhmaWVsZHM6IEFqZkZpZWxkW10pIHtcbiAgICB0aGlzLl9maWVsZHMgPSBmaWVsZHM7XG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gIH1cbiAgQElucHV0KCkgY29uZGl0aW9uOiBzdHJpbmc7XG5cbiAgZWRpdGVkVmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihfOiBBamZWYWxpZGF0aW9uU2VydmljZSkge31cblxuICBpbnNlcnRWYXJpYWJsZSh2YXJpYWJsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9uYWNvRWRpdG9yICE9IG51bGwgJiYgdGhpcy5tb25hY29FZGl0b3IuZWRpdG9yICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMubW9uYWNvRWRpdG9yLmVkaXRvcjtcbiAgICAgIGxldCB2YWx1ZTogc3RyaW5nW10gPSBlZGl0b3IuZ2V0VmFsdWUoKS5zcGxpdCgnXFxuJyk7XG4gICAgICBsZXQgcG9zaXRpb246IHtjb2x1bW46IG51bWJlciwgbGluZU51bWJlcjogbnVtYmVyfSA9IGVkaXRvci5nZXRQb3NpdGlvbigpO1xuICAgICAgY29uc3QgbG4gPSBwb3NpdGlvbi5saW5lTnVtYmVyIC0gMTtcbiAgICAgIGxldCBsaW5lID0gdmFsdWVbbG5dO1xuICAgICAgbGV0IGNvbCA9IHBvc2l0aW9uLmNvbHVtbiAtIDE7XG4gICAgICBsaW5lID0gbGluZS5zdWJzdHJpbmcoMCwgY29sKSArIHZhcmlhYmxlICsgbGluZS5zdWJzdHJpbmcoY29sKTtcbiAgICAgIHZhbHVlW2xuXSA9IGxpbmU7XG4gICAgICBwb3NpdGlvbi5jb2x1bW4gKz0gdmFyaWFibGUubGVuZ3RoO1xuICAgICAgdGhpcy5tb25hY29FZGl0b3IudmFsdWUgPSB2YWx1ZS5qb2luKCdcXG4nKTtcbiAgICAgIGVkaXRvci5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgIHRoaXMuZWRpdGVkVmFsdWUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICB9XG4gIH1cblxuICBvbkVkaXRvckluaXQoKTogdm9pZCB7XG4gICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5zZXREaWFnbm9zdGljc09wdGlvbnMoXG4gICAgICAgIHtub1NlbWFudGljVmFsaWRhdGlvbjogZmFsc2UsIG5vU3ludGF4VmFsaWRhdGlvbjogZmFsc2V9KTtcblxuICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuc2V0Q29tcGlsZXJPcHRpb25zKHtcbiAgICAgIHRhcmdldDogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LlNjcmlwdFRhcmdldC5FUzIwMTUsXG4gICAgICBhbGxvd05vblRzRXh0ZW5zaW9uczogdHJ1ZSxcbiAgICAgIGFsbG93SnM6IHRydWUsXG4gICAgICBtb2R1bGU6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5Nb2R1bGVLaW5kLk5vbmVcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLmFkZEV4dHJhTGliKFxuICAgICAgICAgICcnLCAnY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cycpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5qYXZhc2NyaXB0RGVmYXVsdHMuX2V4dHJhTGlic1snY29uZGl0aW9uLWVkaXRvci12YXJpYWJsZXMuZC50cyddID1cbiAgICAgICAgICAnJztcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5hZGRFeHRyYUxpYihcbiAgICAgICAgICAnJywgJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItZnVuY3Rpb25zLmQudHMnXSA9XG4gICAgICAgICAgJyc7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlVmFyaWFibGVzKCk7XG4gICAgdGhpcy5fdXBkYXRlRnVuY3Rpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVWYXJpYWJsZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZpZWxkcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuamF2YXNjcmlwdERlZmF1bHRzLl9leHRyYUxpYnNbJ2NvbmRpdGlvbi1lZGl0b3ItdmFyaWFibGVzLmQudHMnXSA9XG4gICAgICAgICAgdGhpcy5fZmllbGRzXG4gICAgICAgICAgICAgIC5tYXAoKGZpZWxkOiBBamZGaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgZGVjbGFyZSBjb25zdCAke2ZpZWxkLm5hbWV9OiAke3RoaXMuX2ZpZWxkVmFyVHlwZShmaWVsZC5maWVsZFR5cGUpfTtgO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuam9pbignXFxuJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZ1bmN0aW9ucygpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LmphdmFzY3JpcHREZWZhdWx0cy5fZXh0cmFMaWJzWydjb25kaXRpb24tZWRpdG9yLWZ1bmN0aW9ucy5kLnRzJ10gPVxuICAgICAgICAgIEFqZkV4cHJlc3Npb25VdGlscy5VVElMX0ZVTkNUSU9OUztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZmllbGRWYXJUeXBlKGZpZWxkVHlwZTogQWpmRmllbGRUeXBlKTogc3RyaW5nfG51bGwge1xuICAgIHN3aXRjaCAoZmllbGRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Cb29sZWFuOlxuICAgICAgICByZXR1cm4gJ2Jvb2xlYW4nO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZTpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkRhdGVJbnB1dDpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICAgIHJldHVybiAnRGF0ZSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5FbXB0eTpcbiAgICAgICAgcmV0dXJuICd2b2lkJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkZvcm11bGE6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICByZXR1cm4gJ2FueSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICByZXR1cm4gJ0FycmF5JztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlN0cmluZzpcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRleHQ6XG4gICAgICAgIHJldHVybiAnc3RyaW5nJztcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==