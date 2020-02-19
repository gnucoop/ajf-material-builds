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
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AjfFbConditionEditor } from './condition-editor';
import { AjfFormBuilderService } from './form-builder-service';
var AjfFbConditionEditorDialog = /** @class */ (function () {
    function AjfFbConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
    }
    Object.defineProperty(AjfFbConditionEditorDialog.prototype, "fields", {
        get: function () { return this._fields; },
        enumerable: true,
        configurable: true
    });
    AjfFbConditionEditorDialog.prototype.saveCondition = function () {
        if (this.editor == null) {
            return;
        }
        var newValue = this.editor.editedValue;
        this.dialogRef.close(newValue);
    };
    AjfFbConditionEditorDialog.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-condition-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit condition</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n      *ngIf=\"fields|async as curFields\"\n      [fields]=\"curFields!\"\n      [condition]=\"condition\"></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveCondition()\">Save</button>\n  <button mat-button translate matDialogClose>Close</button>\n</mat-dialog-actions>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };
    return AjfFbConditionEditorDialog;
}());
export { AjfFbConditionEditorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUd0RCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFHN0Q7SUFlRSxvQ0FDRSxPQUE4QixFQUN2QixTQUFtRDtRQUFuRCxjQUFTLEdBQVQsU0FBUyxDQUEwQztRQUUxRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsVUFBQyxNQUFrQixJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUUsRUFBRSxFQUFFLElBQUssT0FBQSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQTlCLENBQThCLENBQUMsRUFBdkQsQ0FBdUQsQ0FBQyxDQUNyRixDQUFDO0lBQ0osQ0FBQztJQVhELHNCQUFJLDhDQUFNO2FBQVYsY0FBdUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFhN0Qsa0RBQWEsR0FBYjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDcEMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBNUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2Qyw0YkFBMkM7b0JBRTNDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVRPLHFCQUFxQjtnQkFSckIsWUFBWTs7O3lCQW1CakIsU0FBUyxTQUFDLG9CQUFvQixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7SUFxQmxELGlDQUFDO0NBQUEsQUE3QkQsSUE2QkM7U0F0QlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdjb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyB7XG4gIEBWaWV3Q2hpbGQoQWpmRmJDb25kaXRpb25FZGl0b3IsIHtzdGF0aWM6IGZhbHNlfSkgZWRpdG9yOiBBamZGYkNvbmRpdGlvbkVkaXRvcjtcblxuICBwcml2YXRlIF9maWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmaWVsZHMoKTogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPiB7IHJldHVybiB0aGlzLl9maWVsZHM7IH1cblxuICBjb25kaXRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nPlxuICApIHtcbiAgICB0aGlzLl9maWVsZHMgPSBzZXJ2aWNlLmZsYXRGaWVsZHMucGlwZShcbiAgICAgIG1hcCgoZmllbGRzOiBBamZGaWVsZFtdKSA9PiBmaWVsZHMuc29ydCgoZjEsIGYyKSA9PiBmMS5uYW1lLmxvY2FsZUNvbXBhcmUoZjIubmFtZSkpKVxuICAgICk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVkaXRvciA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lZGl0b3IuZWRpdGVkVmFsdWU7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UobmV3VmFsdWUpO1xuICB9XG59XG4iXX0=