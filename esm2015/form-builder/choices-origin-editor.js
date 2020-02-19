/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/choices-origin-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @return {?}
     */
    get displayedColumns() { return this._displayedColumns; }
    /**
     * @return {?}
     */
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    set choicesOrigin(choicesOrigin) {
        this._choicesOrigin = choicesOrigin;
        this.name = choicesOrigin.name;
        this.label = choicesOrigin.label;
        this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
        this._choicesArr = choicesOrigin.choices;
        this._choices.updateChoices(this._choicesArr);
    }
    /**
     * @return {?}
     */
    get choices() { return this._choices; }
    /**
     * @return {?}
     */
    get choicesArr() { return this._choicesArr; }
    /**
     * @param {?} evt
     * @param {?} cell
     * @param {?} _value
     * @param {?} rowIdx
     * @return {?}
     */
    updateValue(evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        ((/** @type {?} */ (this._choicesArr[rowIdx])))[cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    }
    /**
     * @param {?} rowIdx
     * @return {?}
     */
    deleteRow(rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    }
    /**
     * @return {?}
     */
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
            }] }
];
AjfFbChoicesOriginEditor.propDecorators = {
    choicesOrigin: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._displayedColumns;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._choicesOrigin;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.editing;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.name;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.label;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.canEditChoices;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._choices;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._choicesArr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9jaG9pY2VzLW9yaWdpbi1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFtQixvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBMkIsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQVUvRixNQUFNLE9BQU8sd0JBQXdCO0lBUHJDO1FBUVUsc0JBQWlCLEdBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBa0JuRSxZQUFPLEdBQTZCLEVBQUUsQ0FBQztRQUsvQixhQUFRLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUdsRSxnQkFBVyxHQUErQixFQUFFLENBQUM7SUFrQnZELENBQUM7Ozs7SUEzQ0MsSUFBSSxnQkFBZ0IsS0FBZSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFHbkUsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBQ0QsSUFDSSxhQUFhLENBQUMsYUFBb0M7UUFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUVqQyxJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7OztJQVFELElBQUksT0FBTyxLQUE4QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O0lBR2hFLElBQUksVUFBVSxLQUFpQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUV6RSxXQUFXLENBQUMsR0FBUSxFQUFFLElBQVksRUFBRSxNQUFXLEVBQUUsTUFBYztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4Qyx3akRBQXlDO2dCQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7NEJBU0UsS0FBSzs7Ozs7OztJQVBOLHFEQUFtRTs7Ozs7SUFHbkUsa0RBQThDOztJQWU5QywyQ0FBdUM7O0lBQ3ZDLHdDQUFhOztJQUNiLHlDQUFjOztJQUNkLGtEQUF3Qjs7Ozs7SUFFeEIsNENBQTBFOzs7OztJQUcxRSwrQ0FBcUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luLCBpc0Nob2ljZXNGaXhlZE9yaWdpbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnksIENob2ljZXNPcmlnaW5EYXRhU291cmNlfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWRhdGEtc291cmNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItY2hvaWNlcy1vcmlnaW4tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdjaG9pY2VzLW9yaWdpbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaG9pY2VzLW9yaWdpbi1lZGl0b3IuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvciB7XG4gIHByaXZhdGUgX2Rpc3BsYXllZENvbHVtbnM6IHN0cmluZ1tdID0gWydsYWJlbCcsICd2YWx1ZScsICdkZWxldGUnXTtcbiAgZ2V0IGRpc3BsYXllZENvbHVtbnMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fZGlzcGxheWVkQ29sdW1uczsgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55PjtcbiAgZ2V0IGNob2ljZXNPcmlnaW4oKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2luID0gY2hvaWNlc09yaWdpbjtcbiAgICB0aGlzLm5hbWUgPSBjaG9pY2VzT3JpZ2luLm5hbWU7XG4gICAgdGhpcy5sYWJlbCA9IGNob2ljZXNPcmlnaW4ubGFiZWw7XG5cbiAgICB0aGlzLmNhbkVkaXRDaG9pY2VzID0gaXNDaG9pY2VzRml4ZWRPcmlnaW4oY2hvaWNlc09yaWdpbik7XG4gICAgdGhpcy5fY2hvaWNlc0FyciA9IGNob2ljZXNPcmlnaW4uY2hvaWNlcztcbiAgICB0aGlzLl9jaG9pY2VzLnVwZGF0ZUNob2ljZXModGhpcy5fY2hvaWNlc0Fycik7XG4gIH1cblxuICBlZGl0aW5nOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcbiAgbmFtZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBjYW5FZGl0Q2hvaWNlczogYm9vbGVhbjtcblxuICBwcml2YXRlIF9jaG9pY2VzOiBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZSA9IG5ldyBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZSgpO1xuICBnZXQgY2hvaWNlcygpOiBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZSB7IHJldHVybiB0aGlzLl9jaG9pY2VzOyB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc0FycjogQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10gPSBbXTtcbiAgZ2V0IGNob2ljZXNBcnIoKTogQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10geyByZXR1cm4gdGhpcy5fY2hvaWNlc0FycjsgfVxuXG4gIHVwZGF0ZVZhbHVlKGV2dDogYW55LCBjZWxsOiBzdHJpbmcsIF92YWx1ZTogYW55LCByb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZWRpdGluZ1tyb3dJZHggKyAnLScgKyBjZWxsXSA9IGZhbHNlO1xuICAgICh0aGlzLl9jaG9pY2VzQXJyW3Jvd0lkeF0gYXMgYW55KVtjZWxsXSA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG5cbiAgZGVsZXRlUm93KHJvd0lkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0Fyci5zcGxpY2Uocm93SWR4LCAxKTtcbiAgICB0aGlzLl9jaG9pY2VzLnVwZGF0ZUNob2ljZXModGhpcy5fY2hvaWNlc0Fycik7XG4gIH1cblxuICBhZGRSb3coKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0Fyci5wdXNoKHtsYWJlbDogJycsIHZhbHVlOiAnJ30pO1xuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxufVxuIl19