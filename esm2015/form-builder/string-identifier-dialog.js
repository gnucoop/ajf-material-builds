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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AjfFormBuilderService } from './form-builder-service';
export class AjfFbStringIdentifierDialogComponent {
    constructor(_service, _cdr) {
        this._service = _service;
        this._cdr = _cdr;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'value', 'show', 'delete'];
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
        this.dataSource.data = [...this.dataSource.data, { label: '', value: [], show: undefined }];
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
}
AjfFbStringIdentifierDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-string-identifier-dialog',
                template: "<h3 matDialogTitle translate>Edit identifier</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span translate>Add value</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input\n            matInput\n            [placeholder]=\"'Label'|translate\"\n            autofocus\n            [(ngModel)]=\"row.label\"\n          />\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n              *ngFor=\"let field of row.value\"\n              (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n            #valueInput\n            [ngModel]=\"row.value\"\n            [matAutocomplete]=\"valueAc\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n            [matChipInputAddOnBlur]=\"true\"\n            (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n            [placeholder]=\"'Value'|translate\"\n          />\n          <mat-autocomplete\n            #valueAc=\"matAutocomplete\"\n            (optionSelected)=\"selected(row, $event)\"\n          >\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\"\n              >{{field}}</mat-option\n            >\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"show\">\n      <mat-header-cell *matHeaderCellDef translate>Show</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-select matNativeControl [(ngModel)]=\"row.show\">\n            <mat-option value=\"all\" translate>All</mat-option>\n            <mat-option value=\"first\" translate>First</mat-option>\n            <mat-option value=\"last\" translate>Last</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate matDialogClose (click)=\"saveStringIdentifier()\">\n    Save\n  </button>\n</mat-dialog-actions>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            },] }
];
AjfFbStringIdentifierDialogComponent.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQVM3RCxNQUFNLE9BQU8sb0NBQW9DO0lBUy9DLFlBQW9CLFFBQStCLEVBQVUsSUFBdUI7UUFBaEUsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVIzRSxlQUFVLEdBQ2YsSUFBSSxrQkFBa0IsRUFBMkIsQ0FBQztRQUM3QyxxQkFBZ0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhELHVCQUFrQixHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9DLHlCQUFvQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRzlELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ25DLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEQsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzdDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYztRQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRztZQUNyQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDO1lBQ3hDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDMUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBNEIsRUFBRSxHQUFzQixFQUFFLFVBQTRCO1FBRXpGLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE9BQU87U0FDUjtRQUNELEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUE0QixFQUFFLEtBQWE7UUFDckQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixHQUFHLENBQUMsS0FBSyxHQUFHO2dCQUNWLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDMUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQzVCLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUE0QixFQUFFLEdBQWlDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXZFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0Msd25HQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBUk8scUJBQXFCO1lBWDNCLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q09NTUEsIEVOVEVSfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQge01hdENoaXBJbnB1dEV2ZW50fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge01hdFRhYmxlRGF0YVNvdXJjZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXAsIHNoYXJlUmVwbGF5fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLXN0cmluZy1pZGVudGlmaWVyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICByZWFkb25seSBkYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXI+ID1cbiAgICAgIG5ldyBNYXRUYWJsZURhdGFTb3VyY2U8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXI+KCk7XG4gIHJlYWRvbmx5IGRpc3BsYXllZENvbHVtbnMgPSBbJ2xhYmVsJywgJ3ZhbHVlJywgJ3Nob3cnLCAnZGVsZXRlJ107XG4gIHJlYWRvbmx5IGZpZWxkcyQ6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICByZWFkb25seSBzZXBhcmF0b3JLZXlzQ29kZXM6IG51bWJlcltdID0gW0VOVEVSLCBDT01NQV07XG5cbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSwgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIgPSBfc2VydmljZS5zdHJpbmdJZGVudGlmaWVyLnN1YnNjcmliZShpZGVudGlmaWVyID0+IHtcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gWy4uLmlkZW50aWZpZXJdO1xuICAgIH0pO1xuICAgIHRoaXMuZmllbGRzJCA9IF9zZXJ2aWNlLmZsYXRGaWVsZHMucGlwZShcbiAgICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHMuc29ydCgoZjEsIGYyKSA9PiBmMS5uYW1lLmxvY2FsZUNvbXBhcmUoZjIubmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZiA9PiBmLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLmxlbmd0aCA+IDApKSxcbiAgICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIGFkZFJvdygpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFsuLi50aGlzLmRhdGFTb3VyY2UuZGF0YSwge2xhYmVsOiAnJywgdmFsdWU6IFtdLCBzaG93OiB1bmRlZmluZWR9XTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhyb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gW1xuICAgICAgLi4udGhpcy5kYXRhU291cmNlLmRhdGEuc2xpY2UoMCwgcm93SWR4KSxcbiAgICAgIC4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLnNsaWNlKHJvd0lkeCArIDEpLFxuICAgIF07XG4gIH1cblxuICBhZGRWYWx1ZShyb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBldnQ6IE1hdENoaXBJbnB1dEV2ZW50LCB2YWx1ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTpcbiAgICAgIHZvaWQge1xuICAgIGlmIChldnQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC52YWx1ZV07XG4gICAgdmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpZHggPSByb3cudmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByb3cudmFsdWUgPSBbXG4gICAgICAgIC4uLnJvdy52YWx1ZS5zbGljZSgwLCBpZHgpLFxuICAgICAgICAuLi5yb3cudmFsdWUuc2xpY2UoaWR4ICsgMSksXG4gICAgICBdO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZVN0cmluZ0lkZW50aWZpZXIodGhpcy5kYXRhU291cmNlLmRhdGEpO1xuICB9XG5cbiAgc2VsZWN0ZWQocm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgZXZ0OiBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50KTogdm9pZCB7XG4gICAgcm93LnZhbHVlID0gWy4uLnJvdy52YWx1ZSwgZXZ0Lm9wdGlvbi52YWx1ZV07XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=