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
import { isChoicesFixedOrigin } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ChoicesOriginDataSource } from './choices-origin-data-source';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/form-field";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/material/table";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/forms";
import * as i7 from "@angular/common";
import * as i8 from "@ngneat/transloco";
export class AjfFbChoicesOriginEditor {
    constructor() {
        this._displayedColumns = ['label', 'value', 'delete'];
        this.editing = {};
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    get displayedColumns() {
        return this._displayedColumns;
    }
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    set choicesOrigin(choicesOrigin) {
        this._choicesOrigin = choicesOrigin;
        this.name = choicesOrigin.name;
        this.label = choicesOrigin.label;
        this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
        this._choicesArr = choicesOrigin.choices;
        this._choices.updateChoices(this._choicesArr);
    }
    get choices() {
        return this._choices;
    }
    get choicesArr() {
        return this._choicesArr;
    }
    updateValue(evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        this._choicesArr[rowIdx][cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    }
    deleteRow(rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    }
    addRow() {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    }
}
AjfFbChoicesOriginEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFbChoicesOriginEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfFbChoicesOriginEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfFbChoicesOriginEditor, selector: "ajf-fb-choices-origin-editor", inputs: { choicesOrigin: "choicesOrigin" }, ngImport: i0, template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | transloco\" />\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | transloco\" />\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span>{{'Add value'|transloco}}</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Label'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Value'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Delete'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">{{'delete'|transloco}}</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n", styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"], components: [{ type: i1.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i4.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i4.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i4.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }], directives: [{ type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i4.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i4.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i4.MatCellDef, selector: "[matCellDef]" }, { type: i4.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i4.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i4.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }], pipes: { "transloco": i8.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFbChoicesOriginEditor, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-fb-choices-origin-editor', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | transloco\" />\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | transloco\" />\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span>{{'Add value'|transloco}}</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Label'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Value'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Delete'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">{{'delete'|transloco}}</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n", styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"] }]
        }], propDecorators: { choicesOrigin: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9jaG9pY2VzLW9yaWdpbi1lZGl0b3IudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Nob2ljZXMtb3JpZ2luLWVkaXRvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBbUIsb0JBQW9CLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQTJCLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7QUFVL0YsTUFBTSxPQUFPLHdCQUF3QjtJQVByQztRQVFVLHNCQUFpQixHQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQW9CbkUsWUFBTyxHQUE2QixFQUFFLENBQUM7UUFLL0IsYUFBUSxHQUE0QixJQUFJLHVCQUF1QixFQUFFLENBQUM7UUFLbEUsZ0JBQVcsR0FBK0IsRUFBRSxDQUFDO0tBb0J0RDtJQWpEQyxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBR0QsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUNJLGFBQWEsQ0FBQyxhQUFvQztRQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBUUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFRLEVBQUUsSUFBWSxFQUFFLE1BQVcsRUFBRSxNQUFjO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7OzZIQWxEVSx3QkFBd0I7aUhBQXhCLHdCQUF3QixnSENuQ3JDLDRvREEyQ0E7bUdEUmEsd0JBQXdCO2tCQVBwQyxTQUFTOytCQUNFLDhCQUE4QixpQkFHekIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4QkFhM0MsYUFBYTtzQkFEaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luLCBpc0Nob2ljZXNGaXhlZE9yaWdpbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnksIENob2ljZXNPcmlnaW5EYXRhU291cmNlfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWRhdGEtc291cmNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItY2hvaWNlcy1vcmlnaW4tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdjaG9pY2VzLW9yaWdpbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaG9pY2VzLW9yaWdpbi1lZGl0b3IuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvciB7XG4gIHByaXZhdGUgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gWydsYWJlbCcsICd2YWx1ZScsICdkZWxldGUnXTtcbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kaXNwbGF5ZWRDb2x1bW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+O1xuICBnZXQgY2hvaWNlc09yaWdpbigpOiBBamZDaG9pY2VzT3JpZ2luPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2luO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55Pikge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW4gPSBjaG9pY2VzT3JpZ2luO1xuICAgIHRoaXMubmFtZSA9IGNob2ljZXNPcmlnaW4ubmFtZTtcbiAgICB0aGlzLmxhYmVsID0gY2hvaWNlc09yaWdpbi5sYWJlbDtcblxuICAgIHRoaXMuY2FuRWRpdENob2ljZXMgPSBpc0Nob2ljZXNGaXhlZE9yaWdpbihjaG9pY2VzT3JpZ2luKTtcbiAgICB0aGlzLl9jaG9pY2VzQXJyID0gY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxuXG4gIGVkaXRpbmc6IHtba2V5OiBzdHJpbmddOiBib29sZWFufSA9IHt9O1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGNhbkVkaXRDaG9pY2VzOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX2Nob2ljZXM6IENob2ljZXNPcmlnaW5EYXRhU291cmNlID0gbmV3IENob2ljZXNPcmlnaW5EYXRhU291cmNlKCk7XG4gIGdldCBjaG9pY2VzKCk6IENob2ljZXNPcmlnaW5EYXRhU291cmNlIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNBcnI6IENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdID0gW107XG4gIGdldCBjaG9pY2VzQXJyKCk6IENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc0FycjtcbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2dDogYW55LCBjZWxsOiBzdHJpbmcsIF92YWx1ZTogYW55LCByb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZWRpdGluZ1tyb3dJZHggKyAnLScgKyBjZWxsXSA9IGZhbHNlO1xuICAgICh0aGlzLl9jaG9pY2VzQXJyW3Jvd0lkeF0gYXMgYW55KVtjZWxsXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG5cbiAgZGVsZXRlUm93KHJvd0lkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0Fyci5zcGxpY2Uocm93SWR4LCAxKTtcbiAgICB0aGlzLl9jaG9pY2VzLnVwZGF0ZUNob2ljZXModGhpcy5fY2hvaWNlc0Fycik7XG4gIH1cblxuICBhZGRSb3coKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0Fyci5wdXNoKHtsYWJlbDogJycsIHZhbHVlOiAnJ30pO1xuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxufVxuIiwiPGRpdj5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cIm5hbWVcIiBbcGxhY2Vob2xkZXJdPVwiJ05hbWUnIHwgdHJhbnNsb2NvXCIgLz5cbiAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPG1hdC1mb3JtLWZpZWxkPlxuICAgIDxpbnB1dCBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cImxhYmVsXCIgW3BsYWNlaG9sZGVyXT1cIidMYWJlbCcgfCB0cmFuc2xvY29cIiAvPlxuICA8L21hdC1mb3JtLWZpZWxkPlxuICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY2FuRWRpdENob2ljZXNcIj5cbiAgICA8YnV0dG9uIChjbGljayk9XCJhZGRSb3coKVwiIG1hdC1idXR0b24+XG4gICAgICA8bWF0LWljb24+YWRkPC9tYXQtaWNvbj5cbiAgICAgIDxzcGFuPnt7J0FkZCB2YWx1ZSd8dHJhbnNsb2NvfX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICAgPG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJjaG9pY2VzXCI+XG4gICAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImxhYmVsXCI+XG4gICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWZcbiAgICAgICAgICA+e3snTGFiZWwnfHRyYW5zbG9jb319PC9tYXQtaGVhZGVyLWNlbGxcbiAgICAgICAgPlxuICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgWyhuZ01vZGVsKV09XCJyb3cubGFiZWxcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwidmFsdWVcIj5cbiAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgID57eydWYWx1ZSd8dHJhbnNsb2NvfX08L21hdC1oZWFkZXItY2VsbFxuICAgICAgICA+XG4gICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3c7IGxldCBpZHggPSBpbmRleFwiPlxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbKG5nTW9kZWwpXT1cInJvdy52YWx1ZVwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJkZWxldGVcIj5cbiAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZlxuICAgICAgICAgID57eydEZWxldGUnfHRyYW5zbG9jb319PC9tYXQtaGVhZGVyLWNlbGxcbiAgICAgICAgPlxuICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93OyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgICAgICA8bWF0LWljb24gKGNsaWNrKT1cImRlbGV0ZVJvdyhpZHgpXCI+e3snZGVsZXRlJ3x0cmFuc2xvY299fTwvbWF0LWljb24+XG4gICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC9tYXQtaGVhZGVyLXJvdz5cbiAgICAgIDxtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5ZWRDb2x1bW5zO1wiPjwvbWF0LXJvdz5cbiAgICA8L21hdC10YWJsZT5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuIl19