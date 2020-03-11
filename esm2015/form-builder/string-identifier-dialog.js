/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/string-identifier-dialog.ts
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
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AjfFormBuilderService } from './form-builder-service';
export class AjfFbStringIdentifierDialogComponent {
    /**
     * @param {?} _service
     * @param {?} _cdr
     */
    constructor(_service, _cdr) {
        this._service = _service;
        this._cdr = _cdr;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'value', 'delete'];
        this.separatorKeysCodes = [ENTER, COMMA];
        this._stringIdentifierSub = Subscription.EMPTY;
        this._stringIdentifierSub = _service.stringIdentifier.subscribe((/**
         * @param {?} identifier
         * @return {?}
         */
        identifier => {
            this.dataSource.data = [...identifier];
        }));
        this.fields$ = _service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        fields => fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        (f1, f2) => f1.name.localeCompare(f2.name))).map((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name))
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.length > 0)))), shareReplay(1));
    }
    /**
     * @return {?}
     */
    addRow() {
        this.dataSource.data = [...this.dataSource.data, { label: '', value: [] }];
    }
    /**
     * @param {?} rowIdx
     * @return {?}
     */
    deleteRow(rowIdx) {
        this.dataSource.data = [
            ...this.dataSource.data.slice(0, rowIdx),
            ...this.dataSource.data.slice(rowIdx + 1),
        ];
    }
    /**
     * @param {?} row
     * @param {?} evt
     * @param {?} valueInput
     * @return {?}
     */
    addValue(row, evt, valueInput) {
        if (evt.value.length === 0) {
            return;
        }
        row.value = [...row.value, evt.value];
        valueInput.value = '';
        this._cdr.markForCheck();
    }
    /**
     * @param {?} row
     * @param {?} value
     * @return {?}
     */
    removeValue(row, value) {
        /** @type {?} */
        const idx = row.value.indexOf(value);
        if (idx > -1) {
            row.value = [
                ...row.value.slice(0, idx),
                ...row.value.slice(idx + 1),
            ];
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._stringIdentifierSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    saveStringIdentifier() {
        this._service.saveStringIdentifier(this.dataSource.data);
    }
    /**
     * @param {?} row
     * @param {?} evt
     * @return {?}
     */
    selected(row, evt) {
        row.value = [...row.value, evt.option.value];
        this._cdr.markForCheck();
    }
}
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
AjfFbStringIdentifierDialogComponent.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: ChangeDetectorRef }
];
if (false) {
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.dataSource;
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.displayedColumns;
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.fields$;
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.separatorKeysCodes;
    /**
     * @type {?}
     * @private
     */
    AjfFbStringIdentifierDialogComponent.prototype._stringIdentifierSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbStringIdentifierDialogComponent.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfFbStringIdentifierDialogComponent.prototype._cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUMzRCxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUcxQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFTN0QsTUFBTSxPQUFPLG9DQUFvQzs7Ozs7SUFTL0MsWUFBb0IsUUFBK0IsRUFBVSxJQUF1QjtRQUFoRSxhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQW1CO1FBUjNFLGVBQVUsR0FDYixJQUFJLGtCQUFrQixFQUEyQixDQUFDO1FBQy9DLHFCQUFnQixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRCx1QkFBa0IsR0FBYSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUvQyx5QkFBb0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUc5RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFVLENBQUMsRUFBRTtZQUMzRSxJQUFJLENB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OztZQXhFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztnQkFDM0MsNjhFQUE0QztnQkFFNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQVJPLHFCQUFxQjtZQVJJLGlCQUFpQjs7OztJQWtCaEQsMERBQ3dEOztJQUN4RCxnRUFBeUQ7O0lBQ3pELHVEQUF1Qzs7SUFDdkMsa0VBQXVEOzs7OztJQUV2RCxvRUFBZ0U7Ozs7O0lBRXBELHdEQUF1Qzs7Ozs7SUFBRSxvREFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRDaGlwSW5wdXRFdmVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtNYXRUYWJsZURhdGFTb3VyY2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgZGF0YVNvdXJjZTogTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPlxuICAgICAgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPigpO1xuICByZWFkb25seSBkaXNwbGF5ZWRDb2x1bW5zID0gWydsYWJlbCcsICd2YWx1ZScsICdkZWxldGUnXTtcbiAgcmVhZG9ubHkgZmllbGRzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHJlYWRvbmx5IHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1YiA9IF9zZXJ2aWNlLnN0cmluZ0lkZW50aWZpZXIuc3Vic2NyaWJlKGlkZW50aWZpZXIgPT4ge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbLi4uaWRlbnRpZmllcl07XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMkID0gX3NlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PlxuICAgICAgICBmaWVsZHMuc29ydCgoZjEsIGYyKSA9PiBmMS5uYW1lLmxvY2FsZUNvbXBhcmUoZjIubmFtZSkpLm1hcChmID0+IGYubmFtZSlcbiAgICAgICAgICAuZmlsdGVyKGYgPT4gZi5sZW5ndGggPiAwKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgYWRkUm93KCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gWy4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLCB7bGFiZWw6ICcnLCB2YWx1ZTogW119XTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhyb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gW1xuICAgICAgLi4udGhpcy5kYXRhU291cmNlLmRhdGEuc2xpY2UoMCwgcm93SWR4KSxcbiAgICAgIC4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLnNsaWNlKHJvd0lkeCArIDEpLFxuICAgIF07XG4gIH1cblxuICBhZGRWYWx1ZShcbiAgICByb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBldnQ6IE1hdENoaXBJbnB1dEV2ZW50LCB2YWx1ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50XG4gICk6IHZvaWQge1xuICAgIGlmIChldnQudmFsdWUubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC52YWx1ZV07XG4gICAgdmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpZHggPSByb3cudmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByb3cudmFsdWUgPSBbXG4gICAgICAgIC4uLnJvdy52YWx1ZS5zbGljZSgwLCBpZHgpLFxuICAgICAgICAuLi5yb3cudmFsdWUuc2xpY2UoaWR4ICsgMSksXG4gICAgICBdO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZVN0cmluZ0lkZW50aWZpZXIodGhpcy5kYXRhU291cmNlLmRhdGEpO1xuICB9XG5cbiAgc2VsZWN0ZWQoXG4gICAgcm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgZXZ0OiBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50XG4gICk6IHZvaWQge1xuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC5vcHRpb24udmFsdWVdO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19