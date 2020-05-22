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
import { __decorate, __metadata } from "tslib";
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AjfFormBuilderService } from './form-builder-service';
let AjfFbStringIdentifierDialogComponent = /** @class */ (() => {
    let AjfFbStringIdentifierDialogComponent = class AjfFbStringIdentifierDialogComponent {
        constructor(_service, _cdr) {
            this._service = _service;
            this._cdr = _cdr;
            this.dataSource = new MatTableDataSource();
            this.displayedColumns = ['label', 'value', 'delete'];
            this.separatorKeysCodes = [ENTER, COMMA];
            this._stringIdentifierSub = Subscription.EMPTY;
            this._stringIdentifierSub = _service.stringIdentifier.subscribe(identifier => {
                this.dataSource.data = [...identifier];
            });
            this.fields$ = _service.flatFields.pipe(map(fields => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))
                .map(f => f.name)
                .filter(f => f.length > 0)), shareReplay(1));
        }
        addRow() {
            this.dataSource.data = [...this.dataSource.data, { label: '', value: [] }];
        }
        deleteRow(rowIdx) {
            this.dataSource.data = [
                ...this.dataSource.data.slice(0, rowIdx),
                ...this.dataSource.data.slice(rowIdx + 1),
            ];
        }
        addValue(row, evt, valueInput) {
            if (evt.value.length === 0) {
                return;
            }
            row.value = [...row.value, evt.value];
            valueInput.value = '';
            this._cdr.markForCheck();
        }
        removeValue(row, value) {
            const idx = row.value.indexOf(value);
            if (idx > -1) {
                row.value = [
                    ...row.value.slice(0, idx),
                    ...row.value.slice(idx + 1),
                ];
                this._cdr.markForCheck();
            }
        }
        ngOnDestroy() {
            this._stringIdentifierSub.unsubscribe();
        }
        saveStringIdentifier() {
            this._service.saveStringIdentifier(this.dataSource.data);
        }
        selected(row, evt) {
            row.value = [...row.value, evt.option.value];
            this._cdr.markForCheck();
        }
    };
    AjfFbStringIdentifierDialogComponent = __decorate([
        Component({
            selector: 'ajf-fb-string-identifier-dialog',
            template: "<h3 matDialogTitle translate>Edit identifier</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span translate>Add value</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input matInput [placeholder]=\"'Label'|translate\" autofocus [(ngModel)]=\"row.label\">\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n                *ngFor=\"let field of row.value\"\n                (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n              #valueInput\n              [ngModel]=\"row.value\"\n              [matAutocomplete]=\"valueAc\"\n              [matChipInputFor]=\"chipList\"\n              [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n              [matChipInputAddOnBlur]=\"true\"\n              (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n              [placeholder]=\"'Value'|translate\">\n          <mat-autocomplete #valueAc=\"matAutocomplete\"\n              (optionSelected)=\"selected(row, $event)\">\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\">{{field}}</mat-option>\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate matDialogClose (click)=\"saveStringIdentifier()\">Save</button>\n</mat-dialog-actions>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __metadata("design:paramtypes", [AjfFormBuilderService, ChangeDetectorRef])
    ], AjfFbStringIdentifierDialogComponent);
    return AjfFbStringIdentifierDialogComponent;
})();
export { AjfFbStringIdentifierDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFTN0Q7SUFBQSxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztRQVMvQyxZQUFvQixRQUErQixFQUFVLElBQXVCO1lBQWhFLGFBQVEsR0FBUixRQUFRLENBQXVCO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7WUFSM0UsZUFBVSxHQUNmLElBQUksa0JBQWtCLEVBQTJCLENBQUM7WUFDN0MscUJBQWdCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWhELHVCQUFrQixHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRS9DLHlCQUFvQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBRzlELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxF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Q0FBQTtJQWpFWSxvQ0FBb0M7UUFQaEQsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlDQUFpQztZQUMzQyw2OEVBQTRDO1lBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztTQUN0QyxDQUFDO3lDQVU4QixxQkFBcUIsRUFBZ0IsaUJBQWlCO09BVHpFLG9DQUFvQyxDQWlFaEQ7SUFBRCwyQ0FBQztLQUFBO1NBakVZLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q09NTUEsIEVOVEVSfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQge01hdENoaXBJbnB1dEV2ZW50fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge01hdFRhYmxlRGF0YVNvdXJjZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXAsIHNoYXJlUmVwbGF5fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLXN0cmluZy1pZGVudGlmaWVyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICByZWFkb25seSBkYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXI+ID1cbiAgICAgIG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXI+KCk7XG4gIHJlYWRvbmx5IGRpc3BsYXllZENvbHVtbnMgPSBbJ2xhYmVsJywgJ3ZhbHVlJywgJ2RlbGV0ZSddO1xuICByZWFkb25seSBmaWVsZHMkOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcmVhZG9ubHkgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuXG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViID0gX3NlcnZpY2Uuc3RyaW5nSWRlbnRpZmllci5zdWJzY3JpYmUoaWRlbnRpZmllciA9PiB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFsuLi5pZGVudGlmaWVyXTtcbiAgICB9KTtcbiAgICB0aGlzLmZpZWxkcyQgPSBfc2VydmljZS5mbGF0RmllbGRzLnBpcGUoXG4gICAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzLnNvcnQoKGYxLCBmMikgPT4gZjEubmFtZS5sb2NhbGVDb21wYXJlKGYyLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKGYgPT4gZi5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGYgPT4gZi5sZW5ndGggPiAwKSksXG4gICAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBhZGRSb3coKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbLi4udGhpcy5kYXRhU291cmNlLmRhdGEsIHtsYWJlbDogJycsIHZhbHVlOiBbXX1dO1xuICB9XG5cbiAgZGVsZXRlUm93KHJvd0lkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbXG4gICAgICAuLi50aGlzLmRhdGFTb3VyY2UuZGF0YS5zbGljZSgwLCByb3dJZHgpLFxuICAgICAgLi4udGhpcy5kYXRhU291cmNlLmRhdGEuc2xpY2Uocm93SWR4ICsgMSksXG4gICAgXTtcbiAgfVxuXG4gIGFkZFZhbHVlKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIGV2dDogTWF0Q2hpcElucHV0RXZlbnQsIHZhbHVlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpOlxuICAgICAgdm9pZCB7XG4gICAgaWYgKGV2dC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcm93LnZhbHVlID0gWy4uLnJvdy52YWx1ZSwgZXZ0LnZhbHVlXTtcbiAgICB2YWx1ZUlucHV0LnZhbHVlID0gJyc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVtb3ZlVmFsdWUocm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGlkeCA9IHJvdy52YWx1ZS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHJvdy52YWx1ZSA9IFtcbiAgICAgICAgLi4ucm93LnZhbHVlLnNsaWNlKDAsIGlkeCksXG4gICAgICAgIC4uLnJvdy52YWx1ZS5zbGljZShpZHggKyAxKSxcbiAgICAgIF07XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlU3RyaW5nSWRlbnRpZmllcih0aGlzLmRhdGFTb3VyY2UuZGF0YSk7XG4gIH1cblxuICBzZWxlY3RlZChyb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBldnQ6IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQpOiB2b2lkIHtcbiAgICByb3cudmFsdWUgPSBbLi4ucm93LnZhbHVlLCBldnQub3B0aW9uLnZhbHVlXTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==