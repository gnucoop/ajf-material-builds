/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widgets-row-buttons.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQy9DLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLDJCQUEyQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBUzFFLE1BQU0sT0FBTyxpQ0FBaUM7Ozs7O0lBOEI1QyxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXhCNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFDckMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixVQUFLLEdBQWEsRUFBRSxDQUFDOztRQU9yQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdsQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRVAsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNqRCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFTdEQsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFD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QUFDLENBQUM7SUFFUCxDQUFDOzs7O0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7O1lBdEhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0NBQXdDO2dCQUNsRCw2L0NBQXVDO2dCQUV2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVE8sdUJBQXVCOzs7bUJBVzVCLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLOzs7O0lBTE4saURBQXNCOztJQUN0Qix1REFBK0I7O0lBQy9CLHFEQUEwQjs7SUFDMUIsbURBQTJCOztJQUMzQixrREFBd0I7O0lBQ3hCLG1EQUF3Qjs7SUFDeEIsMERBQXFDOztJQUNyQyxzREFBa0I7O0lBQ2xCLGtEQUFxQjs7SUFFckIsdURBQW1COztJQUNuQix3REFBb0I7O0lBQ3BCLGtEQUFjOztJQUdkLHNEQUFrQjs7SUFHbEIsbURBQWU7Ozs7O0lBRWYsOERBQTZEOzs7OztJQUM3RCwwREFBeUQ7Ozs7O0lBQ3pELHVEQUFzRDs7Ozs7SUFPMUMscURBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0LCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge2FqZldpZGdldFR5cGVUb0xhYmVsLCB3aWRnZXRSZXBvcnRCdWlsZGVySWNvbk5hbWV9IGZyb20gJy4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItd2lkZ2V0cy1yb3ctYnV0dG9ucycsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0cy1yb3ctYnV0dG9ucy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldHMtcm93LWJ1dHRvbnMuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9ucyBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgZnJvbTogc3RyaW5nO1xuICBASW5wdXQoKSBmcm9tV2lkZ2V0OiBBamZXaWRnZXQ7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZGdldDogQWpmV2lkZ2V0O1xuICBASW5wdXQoKSBjaGlsZDogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNPdmVyID0gZmFsc2U7XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgaXNDbGlja2VkID0gZmFsc2U7XG4gIGNvbG9yOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHdpZGdldEljb246IHN0cmluZztcbiAgd2lkZ2V0TGFiZWw6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIG9uIG92ZXIgYSB3aWRnZXRcbiAgb25PdmVyID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25PdmVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHByaXZhdGUgX2FmakJ1aWxkZXJTZXJ2aWNlOiBBamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHtcblxuICB9XG5cbiAgc2VsZWN0ZWRXaWRnZXQoKSB7XG4gICAgdGhpcy5pc0NsaWNrZWQgPSAhdGhpcy5pc0NsaWNrZWQ7XG4gICAgdGhpcy5fc2VydmljZS5zZXRPcmlnaW4odGhpcy5mcm9tKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLmZyb21XaWRnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuZnJvbVdpZGdldCk7XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKHRoaXMuZnJvbSwgdGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICBvbkZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLndpZGdldCA9PT0gdGhpcy5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihkaXJlY3Rpb246IHN0cmluZykge1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PSAnYmFjaycpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuY2hhbmdlQ29sdW1uKFxuICAgICAgICAgIHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24gLSAxLCA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuY2hhbmdlQ29sdW1uKFxuICAgICAgICAgIHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24gKyAxLCA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldCk7XG4gICAgfVxuICB9XG4gIGlzQ29sdW1uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxhYmVsID09PSAnQ29sdW1uJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpc09uZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICBsZXQgcm9vdE9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+dGhpcy5mcm9tV2lkZ2V0O1xuICAgIGlmIChyb290T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxhYmVsID0gQWpmV2lkZ2V0VHlwZVt0aGlzLndpZGdldC53aWRnZXRUeXBlXTtcbiAgICB0aGlzLndpZGdldEljb24gPSB3aWRnZXRSZXBvcnRCdWlsZGVySWNvbk5hbWUodGhpcy53aWRnZXQud2lkZ2V0VHlwZSk7XG4gICAgdGhpcy53aWRnZXRMYWJlbCA9IGFqZldpZGdldFR5cGVUb0xhYmVsKHRoaXMud2lkZ2V0LndpZGdldFR5cGUpO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fb25PdmVyU3ViID0gdGhpcy5fc2VydmljZS5vbk92ZXJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25PdmVyID0geDtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldFxuICAgICAgLnN1YnNjcmliZShcbiAgICAgIHggPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICBpZiAoeCAhPT0gdGhpcy53aWRnZXQpIHtcbiAgICAgICAgICB0aGlzLmlzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29uT3ZlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19