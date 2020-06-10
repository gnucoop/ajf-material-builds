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
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AjfFbConditionEditor } from './condition-editor';
import { AjfFormBuilderService } from './form-builder-service';
let AjfFbValidationConditionEditorDialog = /** @class */ (() => {
    class AjfFbValidationConditionEditorDialog {
        constructor(service, dialogRef) {
            this.dialogRef = dialogRef;
            this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
        }
        get fields() {
            return this._fields;
        }
        saveCondition() {
            if (this.editor == null) {
                return;
            }
            const newValue = this.editor.editedValue;
            this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
        }
    }
    AjfFbValidationConditionEditorDialog.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-validation-condition-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit condition</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"errorMessage\" [placeholder]=\"'Error message' | translate\">\n  </mat-form-field>\n  <ajf-condition-editor\n      *ngIf=\"fields|async as curFields\"\n      [fields]=\"curFields!\"\n      [condition]=\"condition\"></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveCondition()\">Save</button>\n  <button mat-button translate matDialogClose>Close</button>\n</mat-dialog-actions>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-validation-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbValidationConditionEditorDialog.ctorParameters = () => [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ];
    AjfFbValidationConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };
    return AjfFbValidationConditionEditorDialog;
})();
export { AjfFbValidationConditionEditorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzdEO0lBQUEsTUFPYSxvQ0FBb0M7UUFXL0MsWUFDSSxPQUE4QixFQUN2QixTQUE2RDtZQUE3RCxjQUFTLEdBQVQsU0FBUyxDQUFvRDtZQUN0RSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQyxHQUFHLENBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFaRCxJQUFJLE1BQU07WUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQztRQVlELGFBQWE7WUFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUN2QixPQUFPO2FBQ1I7WUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO1FBQy9FLENBQUM7OztnQkEvQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQ0FBMkM7b0JBQ3JELHNrQkFBc0Q7b0JBRXRELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVRPLHFCQUFxQjtnQkFMckIsWUFBWTs7O3lCQWdCakIsU0FBUyxTQUFDLG9CQUFvQixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7SUF3QmxELDJDQUFDO0tBQUE7U0F6Qlksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLXZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3ZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd2YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2cge1xuICBAVmlld0NoaWxkKEFqZkZiQ29uZGl0aW9uRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIGVkaXRvcjogQWpmRmJDb25kaXRpb25FZGl0b3I7XG5cbiAgcHJpdmF0ZSBfZmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+O1xuICBnZXQgZmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZHM7XG4gIH1cblxuICBjb25kaXRpb246IHN0cmluZztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBzZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gICAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nPikge1xuICAgIHRoaXMuX2ZpZWxkcyA9IHNlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgICBtYXAoKGZpZWxkczogQWpmRmllbGRbXSkgPT4gZmllbGRzLnNvcnQoKGYxLCBmMikgPT4gZjEubmFtZS5sb2NhbGVDb21wYXJlKGYyLm5hbWUpKSkpO1xuICB9XG5cbiAgc2F2ZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lZGl0b3IgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZWRpdG9yLmVkaXRlZFZhbHVlO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtjb25kaXRpb246IG5ld1ZhbHVlLCBlcnJvck1lc3NhZ2U6IHRoaXMuZXJyb3JNZXNzYWdlfSk7XG4gIH1cbn1cbiJdfQ==