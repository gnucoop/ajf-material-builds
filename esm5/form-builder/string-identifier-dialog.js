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
        this.fields$ = _service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); })
            .map(function (f) { return f.name; })
            .filter(function (f) { return f.length > 0; }); }), shareReplay(1));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFN0Q7SUFnQkUsOENBQW9CLFFBQStCLEVBQVUsSUFBdUI7UUFBcEYsaUJBVUM7UUFWbUIsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVIzRSxlQUFVLEdBQ2YsSUFBSSxrQkFBa0IsRUFBMkIsQ0FBQztRQUM3QyxxQkFBZ0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFaEQsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFL0MseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHOUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVO1lBQ3hFLEtBQUks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VCxRQUFRLEVBQUUsaUNBQWlDO29CQUMzQyw2OEVBQTRDO29CQUU1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFSTyxxQkFBcUI7Z0JBWDNCLGlCQUFpQjs7SUFxRm5CLDJDQUFDO0NBQUEsQUF4RUQsSUF3RUM7U0FqRVksb0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm1TdHJpbmdJZGVudGlmaWVyfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDT01NQSwgRU5URVJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0QXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7TWF0Q2hpcElucHV0RXZlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7TWF0VGFibGVEYXRhU291cmNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcCwgc2hhcmVSZXBsYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdzdHJpbmctaWRlbnRpZmllci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IGRhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcj4gPVxuICAgICAgbmV3IE1hdFRhYmxlRGF0YVNvdXJjZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcj4oKTtcbiAgcmVhZG9ubHkgZGlzcGxheWVkQ29sdW1ucyA9IFsnbGFiZWwnLCAndmFsdWUnLCAnZGVsZXRlJ107XG4gIHJlYWRvbmx5IGZpZWxkcyQ6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICByZWFkb25seSBzZXBhcmF0b3JLZXlzQ29kZXM6IG51bWJlcltdID0gW0VOVEVSLCBDT01NQV07XG5cbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSwgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIgPSBfc2VydmljZS5zdHJpbmdJZGVudGlmaWVyLnN1YnNjcmliZShpZGVudGlmaWVyID0+IHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gWy4uLmlkZW50aWZpZXJdO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzJCA9IF9zZXJ2aWNlLmZsYXRGaWVsZHMucGlwZShcbiAgICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHMuc29ydCgoZjEsIGYyKSA9PiBmMS5uYW1lLmxvY2FsZUNvbXBhcmUoZjIubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiBmLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLmxlbmd0aCA+IDApKSxcbiAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIGFkZFJvdygpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFsuLi50aGlzLmRhdGFTb3VyY2UuZGF0YSwge2xhYmVsOiAnJywgdmFsdWU6IFtdfV07XG4gIH1cblxuICBkZWxldGVSb3cocm93SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFtcbiAgICAgIC4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLnNsaWNlKDAsIHJvd0lkeCksXG4gICAgICAuLi50aGlzLmRhdGFTb3VyY2UuZGF0YS5zbGljZShyb3dJZHggKyAxKSxcbiAgICBdO1xuICB9XG5cbiAgYWRkVmFsdWUocm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgZXZ0OiBNYXRDaGlwSW5wdXRFdmVudCwgdmFsdWVJbnB1dDogSFRNTElucHV0RWxlbWVudCk6XG4gICAgICB2b2lkIHtcbiAgICBpZiAoZXZ0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByb3cudmFsdWUgPSBbLi4ucm93LnZhbHVlLCBldnQudmFsdWVdO1xuICAgIHZhbHVlSW5wdXQudmFsdWUgPSAnJztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZW1vdmVWYWx1ZShyb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgaWR4ID0gcm93LnZhbHVlLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgcm93LnZhbHVlID0gW1xuICAgICAgICAuLi5yb3cudmFsdWUuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgLi4ucm93LnZhbHVlLnNsaWNlKGlkeCArIDEpLFxuICAgICAgXTtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzYXZlU3RyaW5nSWRlbnRpZmllcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVTdHJpbmdJZGVudGlmaWVyKHRoaXMuZGF0YVNvdXJjZS5kYXRhKTtcbiAgfVxuXG4gIHNlbGVjdGVkKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIGV2dDogTWF0QXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCk6IHZvaWQge1xuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC5vcHRpb24udmFsdWVdO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19