/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/condition-editor-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AjfFbConditionEditorDialog {
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
        this.dialogRef.close(newValue);
    }
}
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
AjfFbConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfFbConditionEditorDialog.prototype.editor;
    /**
     * @type {?}
     * @private
     */
    AjfFbConditionEditorDialog.prototype._fields;
    /** @type {?} */
    AjfFbConditionEditorDialog.prototype.condition;
    /** @type {?} */
    AjfFbConditionEditorDialog.prototype.dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUd0RCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJbkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFVN0QsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7SUFRckMsWUFDRSxPQUE4QixFQUN2QixTQUFtRDtRQUFuRCxjQUFTLEdBQVQsU0FBUyxDQUEwQztRQUUxRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNwQyxHQUFHOzs7O1FBQUMsQ0FBQyxNQUFrQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSTs7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFDLENBQ3JGLENBQUM7SUFDSixDQUFDOzs7O0lBWEQsSUFBSSxNQUFNLEtBQTZCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7SUFhN0QsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7O2NBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBNUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyw0YkFBMkM7Z0JBRTNDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFUTyxxQkFBcUI7WUFSckIsWUFBWTs7O3FCQW1CakIsU0FBUyxTQUFDLG9CQUFvQixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7OztJQUFoRCw0Q0FBK0U7Ozs7O0lBRS9FLDZDQUF3Qzs7SUFHeEMsK0NBQWtCOztJQUloQiwrQ0FBMEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nIHtcbiAgQFZpZXdDaGlsZChBamZGYkNvbmRpdGlvbkVkaXRvciwge3N0YXRpYzogZmFsc2V9KSBlZGl0b3I6IEFqZkZiQ29uZGl0aW9uRWRpdG9yO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHsgcmV0dXJuIHRoaXMuX2ZpZWxkczsgfVxuXG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHNlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+XG4gICkge1xuICAgIHRoaXMuX2ZpZWxkcyA9IHNlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgbWFwKChmaWVsZHM6IEFqZkZpZWxkW10pID0+IGZpZWxkcy5zb3J0KChmMSwgZjIpID0+IGYxLm5hbWUubG9jYWxlQ29tcGFyZShmMi5uYW1lKSkpXG4gICAgKTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWRpdG9yID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmVkaXRvci5lZGl0ZWRWYWx1ZTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZShuZXdWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==