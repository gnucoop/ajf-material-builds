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
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderCustomWidgetDialog } from './custom-widget-dialog';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/toolbar";
import * as i4 from "./custom-widget-toolbar-button";
import * as i5 from "@angular/common";
import * as i6 from "@angular/cdk/drag-drop";
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
export class AjfReportBuilderCustomWidgetsToolbar {
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
        this._service.addCustomWidgets({
            json: this._fourColumnsLayout,
            type: 'LayoutWidgetWith4Columns',
        });
    }
    ngOnDestroy() {
        this._customWidgetsSub.unsubscribe();
        this._service.resetCustomWidgets();
    }
}
AjfReportBuilderCustomWidgetsToolbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderCustomWidgetsToolbar, deps: [{ token: i1.AjfReportBuilderService }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderCustomWidgetsToolbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderCustomWidgetsToolbar, selector: "ajf-report-builder-custom-widgets-toolbar", ngImport: i0, template: "<mat-toolbar>\n  <ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\">\n    <ajf-report-builder-custom-widget-toolbar-button\n          cdkDrag\n          [cdkDragData]=\"t\"\n          [widgetType]=\"t.type\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\"\n          (click)=\"openDialog(i)\">\n    </ajf-report-builder-custom-widget-toolbar-button>\n   </ng-template>\n</mat-toolbar>\n\n\n\n", styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}\n"], components: [{ type: i3.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { type: i4.AjfReportBuilderCustomWidgetToolbarButton, selector: "ajf-report-builder-custom-widget-toolbar-button", inputs: ["widgetType", "position"] }], directives: [{ type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderCustomWidgetsToolbar, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-custom-widgets-toolbar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-toolbar>\n  <ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\">\n    <ajf-report-builder-custom-widget-toolbar-button\n          cdkDrag\n          [cdkDragData]=\"t\"\n          [widgetType]=\"t.type\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\"\n          (click)=\"openDialog(i)\">\n    </ajf-report-builder-custom-widget-toolbar-button>\n   </ng-template>\n</mat-toolbar>\n\n\n\n", styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }, { type: i2.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldHMtdG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0cy10b29sYmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2N1c3RvbS13aWRnZXRzLXRvb2xiYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFHVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQXNCakU7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLG9DQUFvQztJQXNCL0MsWUFBb0IsUUFBaUMsRUFBUyxNQUFpQjtRQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVc7UUFyQi9FLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUUzQixzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUlyRCx3QkFBbUIsR0FDekIsa0JBQWtCO1lBQ2xCLHdGQUF3RjtZQUN4RixZQUFZO1lBQ1osNEZBQTRGO1lBQzVGLDJGQUEyRjtZQUMzRiw0RkFBNEYsQ0FBQztRQUN2Rix1QkFBa0IsR0FDeEIsNkVBQTZFO1lBQzdFLDRDQUE0QztZQUM1Qyw0RkFBNEY7WUFDNUYsMkZBQTJGO1lBQzNGLDJGQUEyRjtZQUMzRiw0RkFBNEYsQ0FBQztJQUViLENBQUM7SUFFbkYsVUFBVSxDQUFDLEdBQVc7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQjtRQUNoQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ2IsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQixDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQjtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFDNUQ7Z0JBQ0EsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtZQUM5QixJQUFJLEVBQUUsMEJBQTBCO1NBQ2pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7WUFDN0IsSUFBSSxFQUFFLDBCQUEwQjtTQUNqQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDckMsQ0FBQzs7eUlBN0ZVLG9DQUFvQzs2SEFBcEMsb0NBQW9DLGlGQzVEakQsK2VBZ0JBO21HRDRDYSxvQ0FBb0M7a0JBWGhELFNBQVM7K0JBQ0UsMkNBQTJDLGlCQUd0QyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nfSBmcm9tICcuL2N1c3RvbS13aWRnZXQtZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmU3R5bGVzIHtcbiAgW3N0eWxlOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tV2lkZ2V0IHtcbiAganNvbjogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tV2lkZ2V0cyB7XG4gIHdpZGdldHM6IEN1c3RvbVdpZGdldFtdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItY3VzdG9tLXdpZGdldHMtdG9vbGJhcicsXG4gIHN0eWxlVXJsczogWydjdXN0b20td2lkZ2V0cy10b29sYmFyLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ2N1c3RvbS13aWRnZXRzLXRvb2xiYXIuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciB0b29sYmFyXG4gKiBAaW1wbGVtZW50cyA6IE9uRGVzdHJveVxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldHNUb29sYmFyIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBjdXN0b21XaWRnZXRzOiBDdXN0b21XaWRnZXRbXSA9IFtdO1xuXG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nPjtcblxuICBwcml2YXRlIF90aHJlZUNvbHVtbnNMYXlvdXQ6IHN0cmluZyA9XG4gICAgJ3tcIndpZGdldFR5cGVcIjowLCcgK1xuICAgICdcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbHVtbnNcIjpbMC4zNCwwLjMzLDAuMzNdLCcgK1xuICAgICdcImNvbnRlbnRcIjonICtcbiAgICAnW3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAgICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX1dfSc7XG4gIHByaXZhdGUgX2ZvdXJDb2x1bW5zTGF5b3V0OiBzdHJpbmcgPVxuICAgICd7XCJ3aWRnZXRUeXBlXCI6MCxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSwnICtcbiAgICAnXCJjb2x1bW5zXCI6WzAuMjUsMC4yNSwwLjI1LDAuMjVdLFwiY29udGVudFwiOicgK1xuICAgICdbe1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAgICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119XX0nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHt9XG5cbiAgb3BlbkRpYWxvZyhpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2RpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZyk7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsID0gdGhpcy5jdXN0b21XaWRnZXRzW2lkeF0udHlwZTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucG9zaXRpb24gPSBpZHg7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAhPSBudWxsKSB7XG4gICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgZW50ZXIgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VudGVySGFuZGxlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW50ZXIoYXJyYXksIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBsZWF2ZSBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnTGVhdmVIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0xlYXZlKCk7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuY3VzdG9tV2lkZ2V0cy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmN1c3RvbVdpZGdldHMgPSB4O1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmN1c3RvbVdpZGdldHMubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLmN1c3RvbVdpZGdldHNbdGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCAtIDFdLnR5cGUgPT0gJydcbiAgICAgICkge1xuICAgICAgICB0aGlzLm9wZW5EaWFsb2codGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ3VzdG9tV2lkZ2V0cyh7XG4gICAgICBqc29uOiB0aGlzLl90aHJlZUNvbHVtbnNMYXlvdXQsXG4gICAgICB0eXBlOiAnTGF5b3V0V2lkZ2V0V2l0aDNDb2x1bW5zJyxcbiAgICB9KTtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbVdpZGdldHMoe1xuICAgICAganNvbjogdGhpcy5fZm91ckNvbHVtbnNMYXlvdXQsXG4gICAgICB0eXBlOiAnTGF5b3V0V2lkZ2V0V2l0aDRDb2x1bW5zJyxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlc2V0Q3VzdG9tV2lkZ2V0cygpO1xuICB9XG59XG4iLCI8bWF0LXRvb2xiYXI+XG4gIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtdCBbbmdGb3JPZl09XCJjdXN0b21XaWRnZXRzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgIDxhamYtcmVwb3J0LWJ1aWxkZXItY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvblxuICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICBbY2RrRHJhZ0RhdGFdPVwidFwiXG4gICAgICAgICAgW3dpZGdldFR5cGVdPVwidC50eXBlXCJcbiAgICAgICAgICBbcG9zaXRpb25dPVwiaVwiXG4gICAgICAgICAgKGNka0RyYWdTdGFydGVkKT1cIm9uRHJhZ1N0YXJ0SGFuZGxlcigpXCJcbiAgICAgICAgICAoY2RrRHJhZ0VuZGVkKT1cIm9uRHJhZ0VuZEhhbmRsZXIoKTtcIlxuICAgICAgICAgIChjbGljayk9XCJvcGVuRGlhbG9nKGkpXCI+XG4gICAgPC9hamYtcmVwb3J0LWJ1aWxkZXItY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbj5cbiAgIDwvbmctdGVtcGxhdGU+XG48L21hdC10b29sYmFyPlxuXG5cblxuIl19