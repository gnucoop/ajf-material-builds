/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widgets-row-buttons.ts
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
import { AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeToLabel, widgetReportBuilderIconName } from './utils';
export class AjfReportBuilderWidgetsRowButtons {
    /**
     *
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.isOver = false;
        this.currentWidget = null;
        this.isClicked = false;
        this.color = [];
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        // this boolean sign if is on over a widget
        this.onOver = false;
        this._currentWidgetSub = Subscription.EMPTY;
        this._onDraggedSub = Subscription.EMPTY;
        this._onOverSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    selectedWidget() {
        this.isClicked = !this.isClicked;
        this._service.setOrigin(this.from);
        this._service.updateCurrentWidget(this.widget);
    }
    /**
     * @return {?}
     */
    remove() {
        if (this.fromWidget != null) {
            this._service.updateCurrentWidget(this.fromWidget);
        }
        this._service.remove(this.from, this.position);
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (this.widget === this.currentWidget) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    changeColumn(direction) {
        if (direction == 'back') {
            this._service.changeColumn(this.position, this.position - 1, (/** @type {?} */ (this.fromWidget)));
        }
        else {
            this._service.changeColumn(this.position, this.position + 1, (/** @type {?} */ (this.fromWidget)));
        }
    }
    /**
     * @return {?}
     */
    isColumn() {
        if (this.label === 'Column') {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    isOneColumn() {
        /** @type {?} */
        let rootObj = (/** @type {?} */ (this.fromWidget));
        if (rootObj.columns.length > 1) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.label = AjfWidgetType[this.widget.widgetType];
        this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
        this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this._onOverSub = this._service.onOver
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onOver = x;
        }));
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.currentWidget = x;
            if (x !== this.widget) {
                this.isClicked = false;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
        this._onOverSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderWidgetsRowButtons.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-widgets-row-buttons',
                template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderWidgetsRowButtons.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderWidgetsRowButtons.propDecorators = {
    from: [{ type: Input }],
    fromWidget: [{ type: Input }],
    position: [{ type: Input }],
    widget: [{ type: Input }],
    child: [{ type: Input }],
    isOver: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.from;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.fromWidget;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.position;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.widget;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.child;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.isOver;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.isClicked;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.color;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.widgetIcon;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.widgetLabel;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.label;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.onDragged;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.onOver;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._onOverSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQy9DLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLDJCQUEyQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBUzFFLE1BQU0sT0FBTyxpQ0FBaUM7Ozs7O0lBOEI1QyxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXhCNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFDckMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixVQUFLLEdBQWEsRUFBRSxDQUFDOztRQU9yQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdsQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRVAsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNqRCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFTdEQsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFD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QUFDLENBQUM7SUFFUCxDQUFDOzs7O0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7O1lBdEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCw2L0NBQXVDO2dCQUV2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVE8sdUJBQXVCOzs7bUJBVzVCLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLOzs7O0lBTE4saURBQXNCOztJQUN0Qix1REFBK0I7O0lBQy9CLHFEQUEwQjs7SUFDMUIsbURBQTJCOztJQUMzQixrREFBd0I7O0lBQ3hCLG1EQUF3Qjs7SUFDeEIsMERBQXFDOztJQUNyQyxzREFBa0I7O0lBQ2xCLGtEQUFxQjs7SUFFckIsdURBQW1COztJQUNuQix3REFBb0I7O0lBQ3BCLGtEQUFjOztJQUdkLHNEQUFrQjs7SUFHbEIsbURBQWU7Ozs7O0lBRWYsOERBQTZEOzs7OztJQUM3RCwwREFBeUQ7Ozs7O0lBQ3pELHVEQUFzRDs7Ozs7SUFPMUMscURBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkxheW91dFdpZGdldCwgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHthamZXaWRnZXRUeXBlVG9MYWJlbCwgd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXdpZGdldHMtcm93LWJ1dHRvbnMnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldHMtcm93LWJ1dHRvbnMuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXRzLXJvdy1idXR0b25zLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnMgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZyb206IHN0cmluZztcbiAgQElucHV0KCkgZnJvbVdpZGdldDogQWpmV2lkZ2V0O1xuICBASW5wdXQoKSBwb3NpdGlvbjogbnVtYmVyO1xuICBASW5wdXQoKSB3aWRnZXQ6IEFqZldpZGdldDtcbiAgQElucHV0KCkgY2hpbGQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzT3ZlciA9IGZhbHNlO1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGlzQ2xpY2tlZCA9IGZhbHNlO1xuICBjb2xvcjogc3RyaW5nW10gPSBbXTtcblxuICB3aWRnZXRJY29uOiBzdHJpbmc7XG4gIHdpZGdldExhYmVsOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBvbiBvdmVyIGEgd2lkZ2V0XG4gIG9uT3ZlciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uT3ZlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwcml2YXRlIF9hZmpCdWlsZGVyU2VydmljZTogQWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIHNlbGVjdGVkV2lkZ2V0KCkge1xuICAgIHRoaXMuaXNDbGlja2VkID0gIXRoaXMuaXNDbGlja2VkO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3JpZ2luKHRoaXMuZnJvbSk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5mcm9tV2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmZyb21XaWRnZXQpO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSh0aGlzLmZyb20sIHRoaXMucG9zaXRpb24pO1xuICB9XG5cbiAgb25Gb2N1cygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy53aWRnZXQgPT09IHRoaXMuY3VycmVudFdpZGdldCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZGlyZWN0aW9uOiBzdHJpbmcpIHtcblxuICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JhY2snKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uIC0gMSwgPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uICsgMSwgPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuICBpc0NvbHVtbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PT0gJ0NvbHVtbicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXNPbmVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgbGV0IHJvb3RPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldDtcbiAgICBpZiAocm9vdE9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYWJlbCA9IEFqZldpZGdldFR5cGVbdGhpcy53aWRnZXQud2lkZ2V0VHlwZV07XG4gICAgdGhpcy53aWRnZXRJY29uID0gd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lKHRoaXMud2lkZ2V0LndpZGdldFR5cGUpO1xuICAgIHRoaXMud2lkZ2V0TGFiZWwgPSBhamZXaWRnZXRUeXBlVG9MYWJlbCh0aGlzLndpZGdldC53aWRnZXRUeXBlKTtcblxuICAgIHRoaXMuX29uRHJhZ2dlZFN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnZ2VkXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX29uT3ZlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25PdmVyXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLm9uT3ZlciA9IHg7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICB4ID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgaWYgKHggIT09IHRoaXMud2lkZ2V0KSB7XG4gICAgICAgICAgdGhpcy5pc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vbk92ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==