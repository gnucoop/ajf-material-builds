import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/table";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/chips";
import * as i7 from "@angular/material/autocomplete";
import * as i8 from "@angular/material/core";
import * as i9 from "@angular/material/select";
import * as i10 from "@angular/material/dialog";
import * as i11 from "@angular/material/input";
import * as i12 from "@angular/forms";
import * as i13 from "@angular/common";
import * as i14 from "@ngneat/transloco";
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
        this.fields$ = _service.flatFields.pipe(map(fields => fields
            .sort((f1, f2) => f1.name.localeCompare(f2.name))
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
            row.value = [...row.value.slice(0, idx), ...row.value.slice(idx + 1)];
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
AjfFbStringIdentifierDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFbStringIdentifierDialogComponent, deps: [{ token: i1.AjfFormBuilderService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFbStringIdentifierDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFbStringIdentifierDialogComponent, selector: "ajf-fb-string-identifier-dialog", ngImport: i0, template: "<h3 matDialogTitle>{{'Edit identifier'|transloco}}</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span>{{'Add value'|transloco}}</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef>{{'Label'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input\n            matInput\n            [placeholder]=\"'Label'|transloco\"\n            autofocus\n            [(ngModel)]=\"row.label\"\n          />\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef>{{'Value'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n              *ngFor=\"let field of row.value\"\n              (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n            #valueInput\n            [ngModel]=\"row.value\"\n            [matAutocomplete]=\"valueAc\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n            [matChipInputAddOnBlur]=\"true\"\n            (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n            [placeholder]=\"'Value'|transloco\"\n          />\n          <mat-autocomplete\n            #valueAc=\"matAutocomplete\"\n            (optionSelected)=\"selected(row, $event)\"\n          >\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\"\n              >{{field}}</mat-option\n            >\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"show\">\n      <mat-header-cell *matHeaderCellDef>{{'Show'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-select matNativeControl [(ngModel)]=\"row.show\">\n            <mat-option value=\"all\">{{'All'|transloco}}</mat-option>\n            <mat-option value=\"first\">{{'First'|transloco}}</mat-option>\n            <mat-option value=\"last\">{{'Last'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef\n        >{{'Delete'|transloco}}</mat-header-cell\n      >\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button matDialogClose (click)=\"saveStringIdentifier()\">\n    {{'Save'|transloco}}\n  </button>\n</mat-dialog-actions>\n", styles: [""], components: [{ type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i4.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i5.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i6.MatChipList, selector: "mat-chip-list", inputs: ["errorStateMatcher", "multiple", "compareWith", "value", "required", "placeholder", "disabled", "aria-orientation", "selectable", "tabIndex"], outputs: ["change", "valueChange"], exportAs: ["matChipList"] }, { type: i7.MatAutocomplete, selector: "mat-autocomplete", inputs: ["disableRipple"], exportAs: ["matAutocomplete"] }, { type: i8.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i9.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i4.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i4.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }], directives: [{ type: i10.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i10.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i4.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i4.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i4.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i4.MatCellDef, selector: "[matCellDef]" }, { type: i4.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i11.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i12.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i12.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i12.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i13.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["color", "disableRipple", "tabIndex", "selected", "value", "selectable", "disabled", "removable"], outputs: ["selectionChange", "destroyed", "removed"], exportAs: ["matChip"] }, { type: i6.MatChipRemove, selector: "[matChipRemove]" }, { type: i7.MatAutocompleteTrigger, selector: "input[matAutocomplete], textarea[matAutocomplete]", exportAs: ["matAutocompleteTrigger"] }, { type: i6.MatChipInput, selector: "input[matChipInputFor]", inputs: ["matChipInputFor", "matChipInputAddOnBlur", "matChipInputSeparatorKeyCodes", "placeholder", "id", "disabled"], outputs: ["matChipInputTokenEnd"], exportAs: ["matChipInput", "matChipInputFor"] }, { type: i4.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i4.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { type: i10.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }, { type: i10.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }], pipes: { "transloco": i14.TranslocoPipe, "async": i13.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFbStringIdentifierDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-fb-string-identifier-dialog', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<h3 matDialogTitle>{{'Edit identifier'|transloco}}</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span>{{'Add value'|transloco}}</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef>{{'Label'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input\n            matInput\n            [placeholder]=\"'Label'|transloco\"\n            autofocus\n            [(ngModel)]=\"row.label\"\n          />\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef>{{'Value'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n              *ngFor=\"let field of row.value\"\n              (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n            #valueInput\n            [ngModel]=\"row.value\"\n            [matAutocomplete]=\"valueAc\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n            [matChipInputAddOnBlur]=\"true\"\n            (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n            [placeholder]=\"'Value'|transloco\"\n          />\n          <mat-autocomplete\n            #valueAc=\"matAutocomplete\"\n            (optionSelected)=\"selected(row, $event)\"\n          >\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\"\n              >{{field}}</mat-option\n            >\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"show\">\n      <mat-header-cell *matHeaderCellDef>{{'Show'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-select matNativeControl [(ngModel)]=\"row.show\">\n            <mat-option value=\"all\">{{'All'|transloco}}</mat-option>\n            <mat-option value=\"first\">{{'First'|transloco}}</mat-option>\n            <mat-option value=\"last\">{{'Last'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef\n        >{{'Delete'|transloco}}</mat-header-cell\n      >\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button matDialogClose (click)=\"saveStringIdentifier()\">\n    {{'Save'|transloco}}\n  </button>\n</mat-dialog-actions>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1.AjfFormBuilderService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLWlkZW50aWZpZXItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXaEQsTUFBTSxPQUFPLG9DQUFvQztJQVMvQyxZQUFvQixRQUErQixFQUFVLElBQXVCO1FBQWhFLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFSM0UsZUFBVSxHQUNqQixJQUFJLGtCQUFrQixFQUEyQixDQUFDO1FBQzNDLHFCQUFnQixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFeEQsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFL0MseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHOUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ1gsTUFBTTthQUNILElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQzdCLEVBQ0QsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUc7WUFDckIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUN4QyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUSxDQUNOLEdBQTRCLEVBQzVCLEdBQXNCLEVBQ3RCLFVBQTRCO1FBRTVCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE9BQU87U0FDUjtRQUNELEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUE0QixFQUFFLEtBQWE7UUFDckQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFFBQVEsQ0FBQyxHQUE0QixFQUFFLEdBQWlDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7O2lJQW5FVSxvQ0FBb0M7cUhBQXBDLG9DQUFvQyx1RUM5Q2pELDRyR0FvRkE7MkZEdENhLG9DQUFvQztrQkFQaEQsU0FBUzsrQkFDRSxpQ0FBaUMsbUJBRzFCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NPTU1BLCBFTlRFUn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0QXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7TWF0Q2hpcElucHV0RXZlbnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7TWF0VGFibGVEYXRhU291cmNlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcCwgc2hhcmVSZXBsYXl9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdzdHJpbmctaWRlbnRpZmllci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZy5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICByZWFkb25seSBkYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXI+ID1cbiAgICBuZXcgTWF0VGFibGVEYXRhU291cmNlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyPigpO1xuICByZWFkb25seSBkaXNwbGF5ZWRDb2x1bW5zID0gWydsYWJlbCcsICd2YWx1ZScsICdzaG93JywgJ2RlbGV0ZSddO1xuICByZWFkb25seSBmaWVsZHMkOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcmVhZG9ubHkgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUiwgQ09NTUFdO1xuXG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViID0gX3NlcnZpY2Uuc3RyaW5nSWRlbnRpZmllci5zdWJzY3JpYmUoaWRlbnRpZmllciA9PiB7XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFsuLi5pZGVudGlmaWVyXTtcbiAgICB9KTtcbiAgICB0aGlzLmZpZWxkcyQgPSBfc2VydmljZS5mbGF0RmllbGRzLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+XG4gICAgICAgIGZpZWxkc1xuICAgICAgICAgIC5zb3J0KChmMSwgZjIpID0+IGYxLm5hbWUubG9jYWxlQ29tcGFyZShmMi5uYW1lKSlcbiAgICAgICAgICAubWFwKGYgPT4gZi5uYW1lKVxuICAgICAgICAgIC5maWx0ZXIoZiA9PiBmLmxlbmd0aCA+IDApLFxuICAgICAgKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBhZGRSb3coKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbLi4udGhpcy5kYXRhU291cmNlLmRhdGEsIHtsYWJlbDogJycsIHZhbHVlOiBbXSwgc2hvdzogdW5kZWZpbmVkfV07XG4gIH1cblxuICBkZWxldGVSb3cocm93SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFtcbiAgICAgIC4uLnRoaXMuZGF0YVNvdXJjZS5kYXRhLnNsaWNlKDAsIHJvd0lkeCksXG4gICAgICAuLi50aGlzLmRhdGFTb3VyY2UuZGF0YS5zbGljZShyb3dJZHggKyAxKSxcbiAgICBdO1xuICB9XG5cbiAgYWRkVmFsdWUoXG4gICAgcm93OiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcixcbiAgICBldnQ6IE1hdENoaXBJbnB1dEV2ZW50LFxuICAgIHZhbHVlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQsXG4gICk6IHZvaWQge1xuICAgIGlmIChldnQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvdy52YWx1ZSA9IFsuLi5yb3cudmFsdWUsIGV2dC52YWx1ZV07XG4gICAgdmFsdWVJbnB1dC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKHJvdzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpZHggPSByb3cudmFsdWUuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByb3cudmFsdWUgPSBbLi4ucm93LnZhbHVlLnNsaWNlKDAsIGlkeCksIC4uLnJvdy52YWx1ZS5zbGljZShpZHggKyAxKV07XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlU3RyaW5nSWRlbnRpZmllcih0aGlzLmRhdGFTb3VyY2UuZGF0YSk7XG4gIH1cblxuICBzZWxlY3RlZChyb3c6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBldnQ6IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQpOiB2b2lkIHtcbiAgICByb3cudmFsdWUgPSBbLi4ucm93LnZhbHVlLCBldnQub3B0aW9uLnZhbHVlXTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsIjxoMyBtYXREaWFsb2dUaXRsZT57eydFZGl0IGlkZW50aWZpZXInfHRyYW5zbG9jb319PC9oMz5cbjxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxidXR0b24gKGNsaWNrKT1cImFkZFJvdygpXCIgbWF0LWJ1dHRvbj5cbiAgICA8bWF0LWljb24+YWRkPC9tYXQtaWNvbj5cbiAgICA8c3Bhbj57eydBZGQgdmFsdWUnfHRyYW5zbG9jb319PC9zcGFuPlxuICA8L2J1dHRvbj5cbiAgPG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCI+XG4gICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJsYWJlbFwiPlxuICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj57eydMYWJlbCd8dHJhbnNsb2NvfX08L21hdC1oZWFkZXItY2VsbD5cbiAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3c7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidMYWJlbCd8dHJhbnNsb2NvXCJcbiAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJyb3cubGFiZWxcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICA8L21hdC1jZWxsPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwidmFsdWVcIj5cbiAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+e3snVmFsdWUnfHRyYW5zbG9jb319PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDxtYXQtY2hpcC1saXN0ICNjaGlwTGlzdD5cbiAgICAgICAgICAgIDxtYXQtY2hpcFxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZmllbGQgb2Ygcm93LnZhbHVlXCJcbiAgICAgICAgICAgICAgKHJlbW92ZWQpPVwicmVtb3ZlVmFsdWUocm93LCBmaWVsZClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBmaWVsZCB9fVxuICAgICAgICAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9tYXQtY2hpcD5cbiAgICAgICAgICA8L21hdC1jaGlwLWxpc3Q+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAjdmFsdWVJbnB1dFxuICAgICAgICAgICAgW25nTW9kZWxdPVwicm93LnZhbHVlXCJcbiAgICAgICAgICAgIFttYXRBdXRvY29tcGxldGVdPVwidmFsdWVBY1wiXG4gICAgICAgICAgICBbbWF0Q2hpcElucHV0Rm9yXT1cImNoaXBMaXN0XCJcbiAgICAgICAgICAgIFttYXRDaGlwSW5wdXRTZXBhcmF0b3JLZXlDb2Rlc109XCJzZXBhcmF0b3JLZXlzQ29kZXNcIlxuICAgICAgICAgICAgW21hdENoaXBJbnB1dEFkZE9uQmx1cl09XCJ0cnVlXCJcbiAgICAgICAgICAgIChtYXRDaGlwSW5wdXRUb2tlbkVuZCk9XCJhZGRWYWx1ZShyb3csICRldmVudCwgdmFsdWVJbnB1dClcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cIidWYWx1ZSd8dHJhbnNsb2NvXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAjdmFsdWVBYz1cIm1hdEF1dG9jb21wbGV0ZVwiXG4gICAgICAgICAgICAob3B0aW9uU2VsZWN0ZWQpPVwic2VsZWN0ZWQocm93LCAkZXZlbnQpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzJCB8IGFzeW5jXCIgW3ZhbHVlXT1cImZpZWxkXCJcbiAgICAgICAgICAgICAgPnt7ZmllbGR9fTwvbWF0LW9wdGlvblxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDwvbWF0LWNlbGw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJzaG93XCI+XG4gICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPnt7J1Nob3cnfHRyYW5zbG9jb319PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgIDxtYXQtc2VsZWN0IG1hdE5hdGl2ZUNvbnRyb2wgWyhuZ01vZGVsKV09XCJyb3cuc2hvd1wiPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gdmFsdWU9XCJhbGxcIj57eydBbGwnfHRyYW5zbG9jb319PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gdmFsdWU9XCJmaXJzdFwiPnt7J0ZpcnN0J3x0cmFuc2xvY299fTwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIHZhbHVlPVwibGFzdFwiPnt7J0xhc3QnfHRyYW5zbG9jb319PC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDwvbWF0LWNlbGw+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJkZWxldGVcIj5cbiAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWZcbiAgICAgICAgPnt7J0RlbGV0ZSd8dHJhbnNsb2NvfX08L21hdC1oZWFkZXItY2VsbFxuICAgICAgPlxuICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvdzsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICAgIDxtYXQtaWNvbiAoY2xpY2spPVwiZGVsZXRlUm93KGlkeClcIj5kZWxldGU8L21hdC1pY29uPlxuICAgICAgPC9tYXQtY2VsbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheWVkQ29sdW1uc1wiPjwvbWF0LWhlYWRlci1yb3c+XG4gICAgPG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXllZENvbHVtbnM7XCI+PC9tYXQtcm93PlxuICA8L21hdC10YWJsZT5cbjwvbWF0LWRpYWxvZy1jb250ZW50PlxuPG1hdC1kaWFsb2ctYWN0aW9ucz5cbiAgPGJ1dHRvbiBtYXQtYnV0dG9uIG1hdERpYWxvZ0Nsb3NlIChjbGljayk9XCJzYXZlU3RyaW5nSWRlbnRpZmllcigpXCI+XG4gICAge3snU2F2ZSd8dHJhbnNsb2NvfX1cbiAgPC9idXR0b24+XG48L21hdC1kaWFsb2ctYWN0aW9ucz5cbiJdfQ==