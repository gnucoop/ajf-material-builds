/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/validation-condition-editor-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AjfFbValidationConditionEditorDialog {
    /**
     * @param {?} service
     * @param {?} dialogRef
     */
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        (fields) => fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        (f1, f2) => f1.name.localeCompare(f2.name))))));
    }
    /**
     * @return {?}
     */
    get fields() { return this._fields; }
    /**
     * @return {?}
     */
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
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
if (false) {
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.editor;
    /**
     * @type {?}
     * @private
     */
    AjfFbValidationConditionEditorDialog.prototype._fields;
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.condition;
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.errorMessage;
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFHdEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSW5DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBVTdELE1BQU0sT0FBTyxvQ0FBb0M7Ozs7O0lBUy9DLFlBQ0UsT0FBOEIsRUFDdkIsU0FBNkQ7UUFBN0QsY0FBUyxHQUFULFNBQVMsQ0FBb0Q7UUFFcEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDcEMsR0FBRzs7OztRQUFDLENBQUMsTUFBa0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7O1FBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBQyxDQUNyRixDQUFDO0lBQ0osQ0FBQzs7OztJQVpELElBQUksTUFBTSxLQUE2QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7O0lBYzdELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFOztjQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7O1lBN0JGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkNBQTJDO2dCQUNyRCxza0JBQXNEO2dCQUV0RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVE8scUJBQXFCO1lBUnJCLFlBQVk7OztxQkFtQmpCLFNBQVMsU0FBQyxvQkFBb0IsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Ozs7SUFBaEQsc0RBQStFOzs7OztJQUUvRSx1REFBd0M7O0lBR3hDLHlEQUFrQjs7SUFDbEIsNERBQXFCOztJQUluQix5REFBb0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLXZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3ZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd2YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2cge1xuICBAVmlld0NoaWxkKEFqZkZiQ29uZGl0aW9uRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIGVkaXRvcjogQWpmRmJDb25kaXRpb25FZGl0b3I7XG5cbiAgcHJpdmF0ZSBfZmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+O1xuICBnZXQgZmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4geyByZXR1cm4gdGhpcy5fZmllbGRzOyB9XG5cbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nPlxuICApIHtcbiAgICB0aGlzLl9maWVsZHMgPSBzZXJ2aWNlLmZsYXRGaWVsZHMucGlwZShcbiAgICAgIG1hcCgoZmllbGRzOiBBamZGaWVsZFtdKSA9PiBmaWVsZHMuc29ydCgoZjEsIGYyKSA9PiBmMS5uYW1lLmxvY2FsZUNvbXBhcmUoZjIubmFtZSkpKVxuICAgICk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVkaXRvciA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lZGl0b3IuZWRpdGVkVmFsdWU7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2Uoe2NvbmRpdGlvbjogbmV3VmFsdWUsIGVycm9yTWVzc2FnZTogdGhpcy5lcnJvck1lc3NhZ2V9KTtcbiAgfVxufVxuIl19