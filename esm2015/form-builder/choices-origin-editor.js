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
AjfFbChoicesOriginEditor.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-choices-origin-editor',
                template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\"\n        [placeholder]=\"'Name' | translate\">\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\"\n        [placeholder]=\"'Label' | translate\">\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span translate>Add value</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\">\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\">\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n            <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"]
            },] }
];
AjfFbChoicesOriginEditor.propDecorators = {
    choicesOrigin: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9jaG9pY2VzLW9yaWdpbi1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFtQixvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBMkIsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQVUvRixNQUFNLE9BQU8sd0JBQXdCO0lBUHJDO1FBUVUsc0JBQWlCLEdBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBb0JuRSxZQUFPLEdBQTZCLEVBQUUsQ0FBQztRQUsvQixhQUFRLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUtsRSxnQkFBVyxHQUErQixFQUFFLENBQUM7SUFvQnZELENBQUM7SUFqREMsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUdELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFDSSxhQUFhLENBQUMsYUFBb0M7UUFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUVqQyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQVFELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBR0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBUSxFQUFFLElBQVksRUFBRSxNQUFXLEVBQUUsTUFBYztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxTQUFTLENBQUMsTUFBYztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7WUF6REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLHdqREFBeUM7Z0JBRXpDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs0QkFXRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW4sIGlzQ2hvaWNlc0ZpeGVkT3JpZ2lufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Nob2ljZXNPcmlnaW5DaG9pY2VFbnRyeSwgQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2V9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZGF0YS1zb3VyY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1jaG9pY2VzLW9yaWdpbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ2Nob2ljZXMtb3JpZ2luLWVkaXRvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Nob2ljZXMtb3JpZ2luLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yIHtcbiAgcHJpdmF0ZSBfZGlzcGxheWVkQ29sdW1uczogc3RyaW5nW10gPSBbJ2xhYmVsJywgJ3ZhbHVlJywgJ2RlbGV0ZSddO1xuICBnZXQgZGlzcGxheWVkQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENvbHVtbnM7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT47XG4gIGdldCBjaG9pY2VzT3JpZ2luKCk6IEFqZkNob2ljZXNPcmlnaW48YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW47XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KSB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbiA9IGNob2ljZXNPcmlnaW47XG4gICAgdGhpcy5uYW1lID0gY2hvaWNlc09yaWdpbi5uYW1lO1xuICAgIHRoaXMubGFiZWwgPSBjaG9pY2VzT3JpZ2luLmxhYmVsO1xuXG4gICAgdGhpcy5jYW5FZGl0Q2hvaWNlcyA9IGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pO1xuICAgIHRoaXMuX2Nob2ljZXNBcnIgPSBjaG9pY2VzT3JpZ2luLmNob2ljZXM7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG5cbiAgZWRpdGluZzoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG4gIG5hbWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgY2FuRWRpdENob2ljZXM6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfY2hvaWNlczogQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2UgPSBuZXcgQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2UoKTtcbiAgZ2V0IGNob2ljZXMoKTogQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2Uge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc0FycjogQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10gPSBbXTtcbiAgZ2V0IGNob2ljZXNBcnIoKTogQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzQXJyO1xuICB9XG5cbiAgdXBkYXRlVmFsdWUoZXZ0OiBhbnksIGNlbGw6IHN0cmluZywgX3ZhbHVlOiBhbnksIHJvd0lkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5lZGl0aW5nW3Jvd0lkeCArICctJyArIGNlbGxdID0gZmFsc2U7XG4gICAgKHRoaXMuX2Nob2ljZXNBcnJbcm93SWR4XSBhcyBhbnkpW2NlbGxdID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLl9jaG9pY2VzLnVwZGF0ZUNob2ljZXModGhpcy5fY2hvaWNlc0Fycik7XG4gIH1cblxuICBkZWxldGVSb3cocm93SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzQXJyLnNwbGljZShyb3dJZHgsIDEpO1xuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxuXG4gIGFkZFJvdygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzQXJyLnB1c2goe2xhYmVsOiAnJywgdmFsdWU6ICcnfSk7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG59XG4iXX0=