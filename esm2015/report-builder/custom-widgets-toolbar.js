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
let AjfReportBuilderCustomWidgetsToolbar = /** @class */ (() => {
    class AjfReportBuilderCustomWidgetsToolbar {
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
        openDialog(idx) {
            this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
            this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
            this._dialogRef.componentInstance.position = idx;
        }
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragStartHandler() {
            let s = timer(200).subscribe(() => {
                if (s != null) {
                    s.unsubscribe();
                }
                this._service.dragStarted();
            });
        }
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragEndHandler() {
            this._service.dragEnded();
        }
        /**
         *  sign the enter of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragEnterHandler(array, index) {
            this._service.dragEnter(array, index);
        }
        /**
         * sign the leave of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragLeaveHandler() {
            this._service.dragLeave();
        }
        ngOnInit() {
            this._customWidgetsSub = this._service.customWidgets.subscribe(x => {
                this.customWidgets = x;
                if (this.customWidgets.length > 0 &&
                    this.customWidgets[this.customWidgets.length - 1].type == '') {
                    this.openDialog(this.customWidgets.length - 1);
                }
            });
            this._service.addCustomWidgets({
                json: this._threeColumnsLayout,
                type: 'LayoutWidgetWith3Columns',
            });
            this._service.addCustomWidgets({ json: this._fourColumnsLayout, type: 'LayoutWidgetWith4Columns' });
        }
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
    return AjfReportBuilderCustomWidgetsToolbar;
})();
export { AjfReportBuilderCustomWidgetsToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldHMtdG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0cy10b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFFakUsT0FBTyxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekMsT0FBTyxFQUFDLGtDQUFrQyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFnQmpFO0lBQUEsTUFXYSxvQ0FBb0M7UUFxQi9DLFlBQW9CLFFBQWlDLEVBQVMsTUFBaUI7WUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFXO1lBcEIvRSxrQkFBYSxHQUFtQixFQUFFLENBQUM7WUFFM0Isc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFJckQsd0JBQW1CLEdBQVcsa0JBQWtCO2dCQUNwRCx3RkFBd0Y7Z0JBQ3hGLFlBQVk7Z0JBQ1osNEZBQTRGO2dCQUM1RiwyRkFBMkY7Z0JBQzNGLDRGQUE0RixDQUFDO1lBQ3pGLHVCQUFrQixHQUN0Qiw2RUFBNkU7Z0JBQzdFLDRDQUE0QztnQkFDNUMsNEZBQTRGO2dCQUM1RiwyRkFBMkY7Z0JBQzNGLDJGQUEyRjtnQkFDM0YsNEZBQTRGLENBQUM7UUFFZixDQUFDO1FBRW5GLFVBQVUsQ0FBQyxHQUFXO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDbkQsQ0FBQztRQUdEOzs7O1dBSUc7UUFDSCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDYixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ2pCO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGdCQUFnQjtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsS0FBYTtZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBQ0QsUUFBUTtZQUNOLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRTtvQkFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUUsMEJBQTBCO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQzFCLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7Z0JBcEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkNBQTJDO29CQUVyRCx5ZkFBMEM7b0JBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXRCTyx1QkFBdUI7Z0JBTHZCLFNBQVM7O0lBMEhqQiwyQ0FBQztLQUFBO1NBMUZZLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nfSBmcm9tICcuL2N1c3RvbS13aWRnZXQtZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmU3R5bGVzIHtcbiAgW3N0eWxlOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tV2lkZ2V0IHtcbiAganNvbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tV2lkZ2V0cyB7XG4gIHdpZGdldHM6IEN1c3RvbVdpZGdldFtdO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jdXN0b20td2lkZ2V0cy10b29sYmFyJyxcbiAgc3R5bGVVcmxzOiBbJ2N1c3RvbS13aWRnZXRzLXRvb2xiYXIuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tLXdpZGdldHMtdG9vbGJhci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgdG9vbGJhclxuICogQGltcGxlbWVudHMgOiBPbkRlc3Ryb3lcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgY3VzdG9tV2lkZ2V0czogQ3VzdG9tV2lkZ2V0W10gPSBbXTtcblxuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZz47XG5cbiAgcHJpdmF0ZSBfdGhyZWVDb2x1bW5zTGF5b3V0OiBzdHJpbmcgPSAne1wid2lkZ2V0VHlwZVwiOjAsJyArXG4gICAgICAnXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb2x1bW5zXCI6WzAuMzQsMC4zMywwLjMzXSwnICtcbiAgICAgICdcImNvbnRlbnRcIjonICtcbiAgICAgICdbe1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAgICAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgICAgICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX1dfSc7XG4gIHByaXZhdGUgX2ZvdXJDb2x1bW5zTGF5b3V0OiBzdHJpbmcgPVxuICAgICAgJ3tcIndpZGdldFR5cGVcIjowLFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LCcgK1xuICAgICAgJ1wiY29sdW1uc1wiOlswLjI1LDAuMjUsMC4yNSwwLjI1XSxcImNvbnRlbnRcIjonICtcbiAgICAgICdbe1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAgICAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgICAgICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICAgICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119XX0nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHt9XG5cbiAgb3BlbkRpYWxvZyhpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2RpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZyk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsID0gdGhpcy5jdXN0b21XaWRnZXRzW2lkeF0udHlwZTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucG9zaXRpb24gPSBpZHg7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgc3RhcnQgb2YgbW91c2UgZHJhZyB3aXRoIDIwMCBtcyBvZiBkZWxheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ1N0YXJ0SGFuZGxlcigpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChzICE9IG51bGwpIHtcbiAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2VydmljZS5kcmFnU3RhcnRlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBlbnRlciBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJIYW5kbGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbnRlcihhcnJheSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGxlYXZlIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdMZWF2ZUhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnTGVhdmUoKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5jdXN0b21XaWRnZXRzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuY3VzdG9tV2lkZ2V0cyA9IHg7XG4gICAgICBpZiAodGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICB0aGlzLmN1c3RvbVdpZGdldHNbdGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCAtIDFdLnR5cGUgPT0gJycpIHtcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nKHRoaXMuY3VzdG9tV2lkZ2V0cy5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbVdpZGdldHMoe1xuICAgICAganNvbjogdGhpcy5fdGhyZWVDb2x1bW5zTGF5b3V0LFxuICAgICAgdHlwZTogJ0xheW91dFdpZGdldFdpdGgzQ29sdW1ucycsXG4gICAgfSk7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21XaWRnZXRzKFxuICAgICAgICB7anNvbjogdGhpcy5fZm91ckNvbHVtbnNMYXlvdXQsIHR5cGU6ICdMYXlvdXRXaWRnZXRXaXRoNENvbHVtbnMnfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VydmljZS5yZXNldEN1c3RvbVdpZGdldHMoKTtcbiAgfVxufVxuIl19