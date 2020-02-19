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
var AjfFbWarningConditionEditorDialog = /** @class */ (function () {
    function AjfFbWarningConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
    }
    Object.defineProperty(AjfFbWarningConditionEditorDialog.prototype, "fields", {
        get: function () { return this._fields; },
        enumerable: true,
        configurable: true
    });
    AjfFbWarningConditionEditorDialog.prototype.saveCondition = function () {
        if (this.editor == null) {
            return;
        }
        var newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    };
    AjfFbWarningConditionEditorDialog.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-warning-condition-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit condition</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"warningMessage\"\n      [placeholder]=\"'Warning message' | translate\">\n  </mat-form-field>\n  <ajf-condition-editor\n      *ngIf=\"fields|async as curFields\"\n      [fields]=\"curFields!\"\n      [condition]=\"condition\"></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveCondition()\">Save</button>\n  <button mat-button translate matDialogClose>Close</button>\n</mat-dialog-actions>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-warning-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbWarningConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbWarningConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };
    return AjfFbWarningConditionEditorDialog;
}());
export { AjfFbWarningConditionEditorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFHdEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSW5DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzdEO0lBZ0JFLDJDQUNFLE9BQThCLEVBQ3ZCLFNBQTBEO1FBQTFELGNBQVMsR0FBVCxTQUFTLENBQWlEO1FBRWpFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3BDLEdBQUcsQ0FBQyxVQUFDLE1BQWtCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSyxPQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxFQUF2RCxDQUF1RCxDQUFDLENBQ3JGLENBQUM7SUFDSixDQUFDO0lBWkQsc0JBQUkscURBQU07YUFBVixjQUF1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQWM3RCx5REFBYSxHQUFiO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNwQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7O2dCQTdCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdDQUF3QztvQkFDbEQsaWxCQUFtRDtvQkFFbkQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBVE8scUJBQXFCO2dCQVJyQixZQUFZOzs7eUJBbUJqQixTQUFTLFNBQUMsb0JBQW9CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztJQXNCbEQsd0NBQUM7Q0FBQSxBQTlCRCxJQThCQztTQXZCWSxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dhcm5pbmctY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyB7XG4gIEBWaWV3Q2hpbGQoQWpmRmJDb25kaXRpb25FZGl0b3IsIHtzdGF0aWM6IGZhbHNlfSkgZWRpdG9yOiBBamZGYkNvbmRpdGlvbkVkaXRvcjtcblxuICBwcml2YXRlIF9maWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmaWVsZHMoKTogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPiB7IHJldHVybiB0aGlzLl9maWVsZHM7IH1cblxuICBjb25kaXRpb246IHN0cmluZztcbiAgd2FybmluZ01lc3NhZ2U6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZz5cbiAgKSB7XG4gICAgdGhpcy5fZmllbGRzID0gc2VydmljZS5mbGF0RmllbGRzLnBpcGUoXG4gICAgICBtYXAoKGZpZWxkczogQWpmRmllbGRbXSkgPT4gZmllbGRzLnNvcnQoKGYxLCBmMikgPT4gZjEubmFtZS5sb2NhbGVDb21wYXJlKGYyLm5hbWUpKSlcbiAgICApO1xuICB9XG5cbiAgc2F2ZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lZGl0b3IgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZWRpdG9yLmVkaXRlZFZhbHVlO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKHtjb25kaXRpb246IG5ld1ZhbHVlLCB3YXJuaW5nTWVzc2FnZTogdGhpcy53YXJuaW5nTWVzc2FnZX0pO1xuICB9XG59XG4iXX0=