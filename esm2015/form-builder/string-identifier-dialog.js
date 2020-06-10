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
let AjfFbStringIdentifierDialogComponent = /** @class */ (() => {
    class AjfFbStringIdentifierDialogComponent {
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
    return AjfFbStringIdentifierDialogComponent;
})();
export { AjfFbStringIdentifierDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RDtJQUFBLE1BT2Esb0NBQW9DO1FBUy9DLFlBQW9CLFFBQStCLEVBQVUsSUFBdUI7WUFBaEUsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtZQVIzRSxlQUFVLEdBQ2YsSUFBSSxrQkFBa0IsRUFBMkIsQ0FBQztZQUM3QyxxQkFBZ0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFaEQsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFL0MseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFHOUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzNFLElBQUksQ0FB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LFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLDY4RUFBNEM7b0JBRTVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQVJPLHFCQUFxQjtnQkFYM0IsaUJBQWlCOztJQXFGbkIsMkNBQUM7S0FBQTtTQWpFWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRDaGlwSW5wdXRFdmVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtNYXRUYWJsZURhdGFTb3VyY2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwLCBzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgZGF0YVNvdXJjZTogTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPiA9XG4gICAgICBuZXcgTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPigpO1xuICByZWFkb25seSBkaXNwbGF5ZWRDb2x1bW5zID0gWydsYWJlbCcsICd2YWx1ZScsICdkZWxldGUnXTtcbiAgcmVhZG9ubHkgZmllbGRzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHJlYWRvbmx5IHNlcGFyYXRvcktleXNDb2RlczogbnVtYmVyW10gPSBbRU5URVIsIENPTU1BXTtcblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1YiA9IF9zZXJ2aWNlLnN0cmluZ0lkZW50aWZpZXIuc3Vic2NyaWJlKGlkZW50aWZpZXIgPT4ge1xuICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbLi4uaWRlbnRpZmllcl07XG4gICAgfSk7XG4gICAgdGhpcy5maWVsZHMkID0gX3NlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgICBtYXAoZmllbGRzID0+IGZpZWxkcy5zb3J0KChmMSwgZjIpID0+IGYxLm5hbWUubG9jYWxlQ29tcGFyZShmMi5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmID0+IGYubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihmID0+IGYubGVuZ3RoID4gMCkpLFxuICAgICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgYWRkUm93KCk6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gWy4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLCB7bGFiZWw6ICcnLCB2YWx1ZTogW119XTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhyb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gW1xuICAgICAgLi4udGhpcy5kYXRhU291cmNlLmRhdGEuc2xpY2UoMCwgcm93SWR4KSxcbiAgICAgIC4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLnNsaWNlKHJvd0lkeCArIDEpLFxuICAgIF07XG4gIH1cblxuICBhZGRWYWx1ZShyb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBldnQ6IE1hdENoaXBJbnB1dEV2ZW50LCB2YWx1ZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50KTpcbiAgICAgIHZvaWQge1xuICAgIGlmIChldnQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC52YWx1ZV07XG4gICAgdmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpZHggPSByb3cudmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByb3cudmFsdWUgPSBbXG4gICAgICAgIC4uLnJvdy52YWx1ZS5zbGljZSgwLCBpZHgpLFxuICAgICAgICAuLi5yb3cudmFsdWUuc2xpY2UoaWR4ICsgMSksXG4gICAgICBdO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZVN0cmluZ0lkZW50aWZpZXIodGhpcy5kYXRhU291cmNlLmRhdGEpO1xuICB9XG5cbiAgc2VsZWN0ZWQocm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgZXZ0OiBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50KTogdm9pZCB7XG4gICAgcm93LnZhbHVlID0gWy4uLnJvdy52YWx1ZSwgZXZ0Lm9wdGlvbi52YWx1ZV07XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=