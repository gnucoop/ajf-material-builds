/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/table-field.ts
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
                styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybXMvdGFibGUtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNMLHFCQUFxQixFQUFFLHNCQUFzQixFQUM5QyxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQ3pFLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7O0FBRS9ELDZCQUVDOzs7SUFEQyw4QkFBZTs7QUFTakIsTUFBTSxPQUFPLHNCQUF1QixTQUFRLHFCQUE0Qzs7Ozs7O0lBQ3RGLFlBQ0UsR0FBc0IsRUFBRSxPQUErQixFQUFFLEdBQTJCO1FBQ3BGLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjOztjQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTs7Y0FDakQsV0FBVyxHQUFHLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFrQjtRQUM1RSxJQUFJLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUM1QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ1Q7aUJBQU07Z0JBQ0wsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUNWO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLENBQUM7U0FDYjtRQUNELElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxFQUFFO1lBQ25DLFdBQVcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU8sY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixDQUFDLG1CQUFBLElBQUksRUFBa0IsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDdkM7UUFDSCxDQUFDLEVBQUMsRUFBQyxDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQUVPLFNBQVMsQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUMzQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUMzRixPQUFPO1NBQ1I7O2NBQ0ssUUFBUSxHQUFHLG1CQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFrQjtRQUN6RSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUNILENBQUM7OztZQXRERixTQUFTLFNBQUM7Z0JBQ1QsKzVDQUErQjtnQkFFL0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQWYwQixpQkFBaUI7WUFKbkIsc0JBQXNCO1lBUXZDLHNCQUFzQjs7OztJQThENUIsa0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkJhc2VGaWVsZENvbXBvbmVudCwgQWpmRm9ybVJlbmRlcmVyU2VydmljZSwgQWpmVGFibGVGaWVsZEluc3RhbmNlXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbmludGVyZmFjZSBFeHRGb3JtQ29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sIHtcbiAgc2hvdz86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFibGUtZmllbGQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZlRhYmxlRmllbGRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLCB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gIH1cblxuICBnb1RvTmV4dENlbGwoZXY6IEV2ZW50LCByb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCByb3dMZW5ndGggPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoO1xuICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl0gYXMgRXh0Rm9ybUNvbnRyb2w7XG4gICAgaWYgKGNvbHVtbiArIDEgPj0gcm93TGVuZ3RoKSB7XG4gICAgICBjb2x1bW4gPSAwO1xuICAgICAgaWYgKHJvdyArIDEgPj0gdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGgpIHtcbiAgICAgICAgcm93ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdyArPSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4gKz0gMTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50Q2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGN1cnJlbnRDZWxsLnNob3cgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fc2hvd0NlbGwocm93LCBjb2x1bW4pO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBnb1RvQ2VsbChyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldENvbnRyb2xzKCk7XG4gICAgdGhpcy5fc2hvd0NlbGwocm93LCBjb2x1bW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDb250cm9scygpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmZvckVhY2gocm93ID0+IHJvd1sxXS5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgICAoY2VsbCBhcyBFeHRGb3JtQ29udHJvbCkuc2hvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dDZWxsKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChyb3cgPj0gdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggfHwgY29sdW1uID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXSBhcyBFeHRGb3JtQ29udHJvbDtcbiAgICBpZiAodHlwZW9mIG5leHRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgbmV4dENlbGwuc2hvdyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlYWRvbmx5OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=