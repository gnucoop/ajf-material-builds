/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/column.ts
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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * this component manages the report text
 *
 * @export
 */
export class AjfReportBuilderColumn {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        /**
         * if true mouse event is on dragged status
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this.layoutShow = false;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this._onDraggedSub = Subscription.EMPTY;
    }
    /**
     * @param {?} event
     * @param {?} idx
     * @param {?} toColumn
     * @return {?}
     */
    addToList(event, idx, toColumn) {
        this.onDragEndHandler();
        if (event.dragData.fromColumn) {
            this._service.changePositionOnColumn(event, toColumn, idx);
        }
        else {
            this._service.addToColumn(event, toColumn, idx);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            s.unsubscribe();
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.widget = changes.widget.currentValue;
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderColumn.decorators = [
    { type: Component, args: [{
                selector: 'ajf-column',
                template: "<ng-template [ngIf]=\"column.content != null\">\n  <div class=\"ajf-column\"\n    [ngClass]=\"{'ajf-is-on-over': showActions}\"\n    (mouseenter)=\"showActions = true\"\n    (mouseleave)=\"showActions = false\">\n    <mat-list>\n      <ng-template ngFor let-widget let-idx=\"index\" [ngForOf]=\"column.content\">\n\n        <ng-template [ngIf]=\"!onDragged\">\n          <ajf-report-builder-widgets-row-buttons\n              cdkDrag\n              [cdkDragData]=\"{fromColumn: column, fromIndex: idx, widget: widget, dropZones: ['widget']}\"\n              [from]=\"'column'\"\n              [fromWidget]=\"column\"\n              [widget]=\"widget\"\n              [position]=\"idx\"\n              [child]=\"true\"\n              (cdkDragStarted)=\"onDragStartHandler()\"\n              (cdkDragEnded)=\"onDragEndHandler()\">\n          </ajf-report-builder-widgets-row-buttons>\n        </ng-template>\n        <ajf-report-builder-renderer-widget [widget]=\"widget\"></ajf-report-builder-renderer-widget>\n      </ng-template>\n    </mat-list>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ajf-column{max-width:100%;max-height:100%;background:rgba(0,0,0,0);z-index:100}.ajf-column span{flex-direction:row;width:100%}.ajf-column .mat-list{padding:0}.ajf-column:hover span,.ajf-is-on-over span{visibility:visible !important;display:block !important}.ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}mat-list{height:100%;padding:0}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderColumn.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderColumn.propDecorators = {
    column: [{ type: Input }]
};
if (false) {
    /**
     * if true mouse event is on dragged status
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderColumn.prototype.showActions;
    /** @type {?} */
    AjfReportBuilderColumn.prototype.layoutShow;
    /** @type {?} */
    AjfReportBuilderColumn.prototype.onDragged;
    /**
     * is the array of values
     *
     * \@memberOf TableComponent
     * @type {?}
     */
    AjfReportBuilderColumn.prototype.column;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderColumn.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderColumn.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsaUJBQWlCLEVBQ2hGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXpDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFjakUsTUFBTSxPQUFPLHNCQUFzQjs7OztJQXNEakMsWUFDVSxRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5Qjs7Ozs7O1FBaEQzQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVwQixlQUFVLEdBQUcsS0FBSyxDQUFDOztRQUduQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBVVYsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQW1DekQsQ0FBQzs7Ozs7OztJQWpDRCxTQUFTLENBQUMsS0FBVSxFQUFFLEdBQVcsRUFBRSxRQUF5QjtRQUMxRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7Ozs7SUFPRCxrQkFBa0I7O1lBQ1osQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDZixTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDLEVBQUM7SUFDTixDQUFDOzs7Ozs7O0lBT0QsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7O0lBTUQsUUFBUTtRQUNOLDZDQUE2QztRQUU3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzthQUN6QyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUE3RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QiwrakNBQTBCO2dCQUUxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBYk8sdUJBQXVCOzs7cUJBa0M1QixLQUFLOzs7Ozs7Ozs7SUFiTiw2Q0FBb0I7O0lBRXBCLDRDQUFtQjs7SUFHbkIsMkNBQWtCOzs7Ozs7O0lBUWxCLHdDQUFpQzs7Ozs7SUFFakMsK0NBQXlEOzs7OztJQWlDdkQsMENBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbHVtbldpZGdldH0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgcmVwb3J0IHRleHRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jb2x1bW4nLFxuICB0ZW1wbGF0ZVVybDogJ2NvbHVtbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbHVtbi5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckNvbHVtbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcblxuICAvKipcbiAgICogaWYgdHJ1ZSBtb3VzZSBldmVudCBpcyBvbiBkcmFnZ2VkIHN0YXR1c1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHNob3dBY3Rpb25zID0gZmFsc2U7XG5cbiAgbGF5b3V0U2hvdyA9IGZhbHNlO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cblxuICAvKipcbiAgICogaXMgdGhlIGFycmF5IG9mIHZhbHVlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0O1xuXG4gIHByaXZhdGUgX29uRHJhZ2dlZFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGFkZFRvTGlzdChldmVudDogYW55LCBpZHg6IG51bWJlciwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCkge1xuICAgIHRoaXMub25EcmFnRW5kSGFuZGxlcigpO1xuICAgIGlmIChldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZVBvc2l0aW9uT25Db2x1bW4oZXZlbnQsIHRvQ29sdW1uLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmFkZFRvQ29sdW1uKGV2ZW50LCB0b0NvbHVtbiwgaWR4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmRyYWdTdGFydGVkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHRoaXMud2lkZ2V0ID0gY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuIl19