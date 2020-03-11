/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/custom-widgets-toolbar.ts
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
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderCustomWidgetDialog } from './custom-widget-dialog';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * @record
 */
export function AjfStyles() { }
/**
 * @record
 */
export function CustomWidget() { }
if (false) {
    /** @type {?} */
    CustomWidget.prototype.json;
    /** @type {?} */
    CustomWidget.prototype.type;
}
/**
 * @record
 */
export function CustomWidgets() { }
if (false) {
    /** @type {?} */
    CustomWidgets.prototype.widgets;
}
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
export class AjfReportBuilderCustomWidgetsToolbar {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.customWidgets = [];
        this._customWidgetsSub = Subscription.EMPTY;
        this._threeColumnsLayout = '{"widgetType":0,' +
            '"content":[],"styles":{},"visibility":{"condition":"true"},"columns":[0.34,0.33,0.33],' +
            '"content":' +
            '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
        this._fourColumnsLayout = '{"widgetType":0,"content":[],"styles":{},"visibility":{"condition":"true"},' +
            '"columns":[0.25,0.25,0.25,0.25],"content":' +
            '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    openDialog(idx) {
        this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
        this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
        this._dialogRef.componentInstance.position = idx;
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
            if (s != null) {
                s.unsubscribe();
            }
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
     *  sign the enter of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    onDragEnterHandler(array, index) {
        this._service.dragEnter(array, index);
    }
    /**
     * sign the leave of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragLeaveHandler() {
        this._service.dragLeave();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._customWidgetsSub = this._service.customWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.customWidgets = x;
            if (this.customWidgets.length > 0 &&
                this.customWidgets[this.customWidgets.length - 1].type == '') {
                this.openDialog(this.customWidgets.length - 1);
            }
        }));
        this._service.addCustomWidgets({
            json: this._threeColumnsLayout,
            type: 'LayoutWidgetWith3Columns',
        });
        this._service.addCustomWidgets({
            json: this._fourColumnsLayout,
            type: 'LayoutWidgetWith4Columns'
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._customWidgetsSub.unsubscribe();
        this._service.resetCustomWidgets();
    }
}
AjfReportBuilderCustomWidgetsToolbar.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-custom-widgets-toolbar',
                template: "<mat-toolbar>\n  <ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\">\n    <ajf-report-builder-custom-widget-toolbar-button\n          cdkDrag\n          [cdkDragData]=\"t\"\n          [widgetType]=\"t.type\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\"\n          (click)=\"openDialog(i)\">\n    </ajf-report-builder-custom-widget-toolbar-button>\n   </ng-template>\n</mat-toolbar>\n\n\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderCustomWidgetsToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderCustomWidgetsToolbar.prototype.customWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._customWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._dialogRef;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._threeColumnsLayout;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._fourColumnsLayout;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._service;
    /** @type {?} */
    AjfReportBuilderCustomWidgetsToolbar.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldHMtdG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0cy10b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQXFCLGlCQUFpQixFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFFakUsT0FBTyxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekMsT0FBTyxFQUFDLGtDQUFrQyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFFakUsK0JBRUM7Ozs7QUFFRCxrQ0FHQzs7O0lBRkMsNEJBQWE7O0lBQ2IsNEJBQWE7Ozs7O0FBR2YsbUNBRUM7OztJQURDLGdDQUF3Qjs7QUFXMUI7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLG9DQUFvQzs7Ozs7SUFzQi9DLFlBQ1UsUUFBaUMsRUFDbEMsTUFBaUI7UUFEaEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQXZCMUIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBRTNCLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBSXJELHdCQUFtQixHQUMzQixrQkFBa0I7WUFDbEIsd0ZBQXdGO1lBQ3hGLFlBQVk7WUFDWiw0RkFBNEY7WUFDNUYsMkZBQTJGO1lBQzNGLDRGQUE0RixDQUFDO1FBQ3JGLHVCQUFrQixHQUMxQiw2RUFBNkU7WUFDN0UsNENBQTRDO1lBQzVDLDRGQUE0RjtZQUM1RiwyRkFBMkY7WUFDM0YsMkZBQTJGO1lBQzNGLDRGQUE0RixDQUFDO0lBSzdGLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVc7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7O0lBUUQsa0JBQWtCOztZQUNaLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ2YsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQU9ELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7Ozs7O0lBT0Qsa0JBQWtCLENBQUMsS0FBYSxFQUFFLEtBQWE7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7Ozs7SUFPRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7O0lBQ0QsUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7YUFDakQsU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQzVEO2dCQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDOUIsSUFBSSxFQUFFLDBCQUEwQjtTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzdCLElBQUksRUFBRSwwQkFBMEI7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3JDLENBQUM7OztZQTVHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJDQUEyQztnQkFFckQseWZBQTBDO2dCQUMxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBdEJPLHVCQUF1QjtZQUx2QixTQUFTOzs7O0lBaUNmLDZEQUFtQzs7Ozs7SUFFbkMsaUVBQTZEOzs7OztJQUU3RCwwREFBcUU7Ozs7O0lBRXJFLG1FQU02Rjs7Ozs7SUFDN0Ysa0VBTTZGOzs7OztJQUczRix3REFBeUM7O0lBQ3pDLHNEQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nfSBmcm9tICcuL2N1c3RvbS13aWRnZXQtZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmU3R5bGVzIHtcbiAgW3N0eWxlOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tV2lkZ2V0IHtcbiAganNvbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tV2lkZ2V0cyB7XG4gIHdpZGdldHM6IEN1c3RvbVdpZGdldFtdO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jdXN0b20td2lkZ2V0cy10b29sYmFyJyxcbiAgc3R5bGVVcmxzOiBbJ2N1c3RvbS13aWRnZXRzLXRvb2xiYXIuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tLXdpZGdldHMtdG9vbGJhci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgdG9vbGJhclxuICogQGltcGxlbWVudHMgOiBPbkRlc3Ryb3lcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgY3VzdG9tV2lkZ2V0czogQ3VzdG9tV2lkZ2V0W10gPSBbXTtcblxuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZz47XG5cbiAgcHJpdmF0ZSBfdGhyZWVDb2x1bW5zTGF5b3V0OiBzdHJpbmcgPVxuICAne1wid2lkZ2V0VHlwZVwiOjAsJyArXG4gICdcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbHVtbnNcIjpbMC4zNCwwLjMzLDAuMzNdLCcgK1xuICAnXCJjb250ZW50XCI6JyArXG4gICdbe1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119XX0nO1xuICBwcml2YXRlIF9mb3VyQ29sdW1uc0xheW91dDogc3RyaW5nID1cbiAgJ3tcIndpZGdldFR5cGVcIjowLFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LCcgK1xuICAnXCJjb2x1bW5zXCI6WzAuMjUsMC4yNSwwLjI1LDAuMjVdLFwiY29udGVudFwiOicgK1xuICAnW3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfV19JztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHtcbiAgfVxuXG4gIG9wZW5EaWFsb2coaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2cpO1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sYWJlbCA9IHRoaXMuY3VzdG9tV2lkZ2V0c1tpZHhdLnR5cGU7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnBvc2l0aW9uID0gaWR4O1xuICB9XG5cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHMgIT0gbnVsbCkgeyBzLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgdGhpcy5fc2VydmljZS5kcmFnU3RhcnRlZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgZW5kIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbmRIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VuZGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIGVudGVyIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbnRlckhhbmRsZXIoYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VudGVyKGFycmF5LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgbGVhdmUgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0xlYXZlSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdMZWF2ZSgpO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1c3RvbVdpZGdldHNcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMuY3VzdG9tV2lkZ2V0cyA9IHg7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmN1c3RvbVdpZGdldHMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgIHRoaXMuY3VzdG9tV2lkZ2V0c1t0aGlzLmN1c3RvbVdpZGdldHMubGVuZ3RoIC0gMV0udHlwZSA9PSAnJ1xuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm9wZW5EaWFsb2codGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbVdpZGdldHMoe1xuICAgICAganNvbjogdGhpcy5fdGhyZWVDb2x1bW5zTGF5b3V0LFxuICAgICAgdHlwZTogJ0xheW91dFdpZGdldFdpdGgzQ29sdW1ucycsXG4gICAgfSk7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21XaWRnZXRzKHtcbiAgICAgIGpzb246IHRoaXMuX2ZvdXJDb2x1bW5zTGF5b3V0LFxuICAgICAgdHlwZTogJ0xheW91dFdpZGdldFdpdGg0Q29sdW1ucydcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlc2V0Q3VzdG9tV2lkZ2V0cygpO1xuICB9XG59XG4iXX0=