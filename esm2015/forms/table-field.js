/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/table-field.ts
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
import { AjfBaseFieldComponent, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AjfWarningAlertService } from './warning-alert-service';
/**
 * @record
 */
function ExtFormControl() { }
if (false) {
    /** @type {?|undefined} */
    ExtFormControl.prototype.show;
}
export class AjfTableFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    /**
     * @param {?} ev
     * @param {?} row
     * @param {?} column
     * @return {?}
     */
    goToNextCell(ev, row, column) {
        /** @type {?} */
        const rowLength = this.instance.controls[row][1].length;
        /** @type {?} */
        const currentCell = (/** @type {?} */ (this.instance.controls[row][1][column]));
        if (column + 1 >= rowLength) {
            column = 0;
            if (row + 1 >= this.instance.controls.length) {
                row = 1;
            }
            else {
                row += 1;
            }
        }
        else {
            column += 1;
        }
        if (typeof currentCell !== 'string') {
            currentCell.show = false;
        }
        this._showCell(row, column);
        ev.preventDefault();
        ev.stopPropagation();
    }
    /**
     * @param {?} row
     * @param {?} column
     * @return {?}
     */
    goToCell(row, column) {
        this._resetControls();
        this._showCell(row, column);
    }
    /**
     * @private
     * @return {?}
     */
    _resetControls() {
        this.instance.controls.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row[1].forEach((/**
         * @param {?} cell
         * @return {?}
         */
        cell => {
            if (typeof cell !== 'string') {
                ((/** @type {?} */ (cell))).show = false;
            }
        }))));
    }
    /**
     * @private
     * @param {?} row
     * @param {?} column
     * @return {?}
     */
    _showCell(row, column) {
        if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
            return;
        }
        /** @type {?} */
        const nextCell = (/** @type {?} */ (this.instance.controls[row][1][column]));
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    }
}
AjfTableFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <td *ngFor=\"let c of columns[1]; let column = index\">\n          <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n            <ng-container *ngIf=\"contr != null\">\n              <input *ngIf=\"row > 0 && contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr\"\n                (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus>\n              <ng-template #plainTextCell>\n                <span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\"\n                  (click)=\"goToCell(row, column)\">{{ contr!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-template>\n            </ng-container>\n          </ng-container>\n        </td>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
            }] }
];
/** @nocollapse */
AjfTableFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfTableFieldComponent.ngAcceptInputType_readonly;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybXMvdGFibGUtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNMLHFCQUFxQixFQUFFLHNCQUFzQixFQUM5QyxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQ3pFLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRS9ELDZCQUVDOzs7SUFEQyw4QkFBZTs7QUFTakIsTUFBTSxPQUFPLHNCQUF1QixTQUFRLHFCQUE0Qzs7Ozs7O0lBQ3RGLFlBQ0UsR0FBc0IsRUFBRSxPQUErQixFQUFFLEdBQTJCO1FBQ3BGLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjOztjQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7Y0FDakQsV0FBVyxHQUFHLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFrQjtRQUM1RSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUM1QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ1Q7aUJBQU07Z0JBQ0wsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNWO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLENBQUM7U0FDYjtRQUNELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU8sY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixDQUFDLG1CQUFBLElBQUksRUFBa0IsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDdkM7UUFDSCxDQUFDLEVBQUMsRUFBQyxDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQUVPLFNBQVMsQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUMzQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUMzRixPQUFPO1NBQ1I7O2NBQ0ssUUFBUSxHQUFHLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFrQjtRQUN6RSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUNILENBQUM7OztZQXRERixTQUFTLFNBQUM7Z0JBQ1QsKzVDQUErQjtnQkFFL0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQWYwQixpQkFBaUI7WUFKbkIsc0JBQXNCO1lBUXZDLHNCQUFzQjs7OztJQThENUIsa0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZCYXNlRmllbGRDb21wb25lbnQsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsIEFqZlRhYmxlRmllbGRJbnN0YW5jZVxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtCb29sZWFuSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5pbnRlcmZhY2UgRXh0Rm9ybUNvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbCB7XG4gIHNob3c/OiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICd0YWJsZS1maWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhYmxlLWZpZWxkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGFibGVGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZUYWJsZUZpZWxkSW5zdGFuY2U+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSwgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgZ29Ub05leHRDZWxsKGV2OiBFdmVudCwgcm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgcm93TGVuZ3RoID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aDtcbiAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXVtjb2x1bW5dIGFzIEV4dEZvcm1Db250cm9sO1xuICAgIGlmIChjb2x1bW4gKyAxID49IHJvd0xlbmd0aCkge1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIGlmIChyb3cgKyAxID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoKSB7XG4gICAgICAgIHJvdyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3cgKz0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uICs9IDE7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjdXJyZW50Q2VsbC5zaG93ID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZ29Ub0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDb250cm9scygpO1xuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q29udHJvbHMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5mb3JFYWNoKHJvdyA9PiByb3dbMV0uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgKGNlbGwgYXMgRXh0Rm9ybUNvbnRyb2wpLnNob3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93Q2VsbChyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocm93ID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoIHx8IGNvbHVtbiA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl0gYXMgRXh0Rm9ybUNvbnRyb2w7XG4gICAgaWYgKHR5cGVvZiBuZXh0Q2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5leHRDZWxsLnNob3cgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWFkb25seTogQm9vbGVhbklucHV0O1xufVxuIl19