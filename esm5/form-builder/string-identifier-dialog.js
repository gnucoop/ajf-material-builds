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
import { __read, __spread } from "tslib";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AjfFormBuilderService } from './form-builder-service';
var AjfFbStringIdentifierDialogComponent = /** @class */ (function () {
    function AjfFbStringIdentifierDialogComponent(_service, _cdr) {
        var _this = this;
        this._service = _service;
        this._cdr = _cdr;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'value', 'delete'];
        this.separatorKeysCodes = [ENTER, COMMA];
        this._stringIdentifierSub = Subscription.EMPTY;
        this._stringIdentifierSub = _service.stringIdentifier.subscribe(function (identifier) {
            _this.dataSource.data = __spread(identifier);
        });
        this.fields$ = _service.flatFields.pipe(map(function (fields) {
            return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }).map(function (f) { return f.name; })
                .filter(function (f) { return f.length > 0; });
        }), shareReplay(1));
    }
    AjfFbStringIdentifierDialogComponent.prototype.addRow = function () {
        this.dataSource.data = __spread(this.dataSource.data, [{ label: '', value: [] }]);
    };
    AjfFbStringIdentifierDialogComponent.prototype.deleteRow = function (rowIdx) {
        this.dataSource.data = __spread(this.dataSource.data.slice(0, rowIdx), this.dataSource.data.slice(rowIdx + 1));
    };
    AjfFbStringIdentifierDialogComponent.prototype.addValue = function (row, evt, valueInput) {
        if (evt.value.length === 0) {
            return;
        }
        row.value = __spread(row.value, [evt.value]);
        valueInput.value = '';
        this._cdr.markForCheck();
    };
    AjfFbStringIdentifierDialogComponent.prototype.removeValue = function (row, value) {
        var idx = row.value.indexOf(value);
        if (idx > -1) {
            row.value = __spread(row.value.slice(0, idx), row.value.slice(idx + 1));
            this._cdr.markForCheck();
        }
    };
    AjfFbStringIdentifierDialogComponent.prototype.ngOnDestroy = function () {
        this._stringIdentifierSub.unsubscribe();
    };
    AjfFbStringIdentifierDialogComponent.prototype.saveStringIdentifier = function () {
        this._service.saveStringIdentifier(this.dataSource.data);
    };
    AjfFbStringIdentifierDialogComponent.prototype.selected = function (row, evt) {
        row.value = __spread(row.value, [evt.option.value]);
        this._cdr.markForCheck();
    };
    AjfFbStringIdentifierDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-string-identifier-dialog',
                    template: "<h3 matDialogTitle translate>Edit identifier</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span translate>Add value</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input matInput [placeholder]=\"'Label'|translate\" autofocus [(ngModel)]=\"row.label\">\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n                *ngFor=\"let field of row.value\"\n                (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n              #valueInput\n              [ngModel]=\"row.value\"\n              [matAutocomplete]=\"valueAc\"\n              [matChipInputFor]=\"chipList\"\n              [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n              [matChipInputAddOnBlur]=\"true\"\n              (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n              [placeholder]=\"'Value'|translate\">\n          <mat-autocomplete #valueAc=\"matAutocomplete\"\n              (optionSelected)=\"selected(row, $event)\">\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\">{{field}}</mat-option>\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate matDialogClose (click)=\"saveStringIdentifier()\">Save</button>\n</mat-dialog-actions>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbStringIdentifierDialogComponent.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: ChangeDetectorRef }
    ]; };
    return AjfFbStringIdentifierDialogComponent;
}());
export { AjfFbStringIdentifierDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFDM0QsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHMUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTdEO0lBZ0JFLDhDQUFvQixRQUErQixFQUFVLElBQXVCO1FBQXBGLGlCQVVDO1FBVm1CLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFSM0UsZUFBVSxHQUNiLElBQUksa0JBQWtCLEVBQTJCLENBQUM7UUFDL0MscUJBQWdCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWhELHVCQUFrQixHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9DLHlCQUFvQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRzlELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQUEsVUFBVTtZQUN4RSxLQUFJLENB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QUFRLEVBQUUsaUNBQWlDO29CQUMzQyw2OEVBQTRDO29CQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFSTyxxQkFBcUI7Z0JBUkksaUJBQWlCOztJQW1GbEQsMkNBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQWxFWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRDaGlwSW5wdXRFdmVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtNYXRUYWJsZURhdGFTb3VyY2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgZGF0YVNvdXJjZTogTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPlxuICAgICAgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPigpO1xuICByZWFkb25seSBkaXNwbGF5ZWRDb2x1bW5zID0gWydsYWJlbCcsICd2YWx1ZScsICdkZWxldGUnXTtcbiAgcmVhZG9ubHkgZmllbGRzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHJlYWRvbmx5IHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1YiA9IF9zZXJ2aWNlLnN0cmluZ0lkZW50aWZpZXIuc3Vic2NyaWJlKGlkZW50aWZpZXIgPT4ge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbLi4uaWRlbnRpZmllcl07XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMkID0gX3NlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PlxuICAgICAgICBmaWVsZHMuc29ydCgoZjEsIGYyKSA9PiBmMS5uYW1lLmxvY2FsZUNvbXBhcmUoZjIubmFtZSkpLm1hcChmID0+IGYubmFtZSlcbiAgICAgICAgICAuZmlsdGVyKGYgPT4gZi5sZW5ndGggPiAwKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgYWRkUm93KCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gWy4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLCB7bGFiZWw6ICcnLCB2YWx1ZTogW119XTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhyb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gW1xuICAgICAgLi4udGhpcy5kYXRhU291cmNlLmRhdGEuc2xpY2UoMCwgcm93SWR4KSxcbiAgICAgIC4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLnNsaWNlKHJvd0lkeCArIDEpLFxuICAgIF07XG4gIH1cblxuICBhZGRWYWx1ZShcbiAgICByb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBldnQ6IE1hdENoaXBJbnB1dEV2ZW50LCB2YWx1ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50XG4gICk6IHZvaWQge1xuICAgIGlmIChldnQudmFsdWUubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC52YWx1ZV07XG4gICAgdmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpZHggPSByb3cudmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByb3cudmFsdWUgPSBbXG4gICAgICAgIC4uLnJvdy52YWx1ZS5zbGljZSgwLCBpZHgpLFxuICAgICAgICAuLi5yb3cudmFsdWUuc2xpY2UoaWR4ICsgMSksXG4gICAgICBdO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZVN0cmluZ0lkZW50aWZpZXIodGhpcy5kYXRhU291cmNlLmRhdGEpO1xuICB9XG5cbiAgc2VsZWN0ZWQoXG4gICAgcm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgZXZ0OiBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50XG4gICk6IHZvaWQge1xuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC5vcHRpb24udmFsdWVdO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19