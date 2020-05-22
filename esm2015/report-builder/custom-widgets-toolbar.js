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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderCustomWidgetDialog } from './custom-widget-dialog';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderCustomWidgetsToolbar = /** @class */ (() => {
    let AjfReportBuilderCustomWidgetsToolbar = 
    /**
     * This class will define an ajf builder toolbar
     * @implements : OnDestroy
     */
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
    };
    AjfReportBuilderCustomWidgetsToolbar = __decorate([
        Component({
            selector: 'ajf-report-builder-custom-widgets-toolbar',
            template: "<mat-toolbar>\n  <ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\">\n    <ajf-report-builder-custom-widget-toolbar-button\n          cdkDrag\n          [cdkDragData]=\"t\"\n          [widgetType]=\"t.type\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\"\n          (click)=\"openDialog(i)\">\n    </ajf-report-builder-custom-widget-toolbar-button>\n   </ng-template>\n</mat-toolbar>\n\n\n\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}\n"]
        })
        /**
         * This class will define an ajf builder toolbar
         * @implements : OnDestroy
         */
        ,
        __metadata("design:paramtypes", [AjfReportBuilderService, MatDialog])
    ], AjfReportBuilderCustomWidgetsToolbar);
    return AjfReportBuilderCustomWidgetsToolbar;
})();
export { AjfReportBuilderCustomWidgetsToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldHMtdG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0cy10b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFHVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBMkJqRTtJQUFBLElBQWEsb0NBQW9DO0lBSmpEOzs7T0FHRztJQUNILE1BQWEsb0NBQW9DO1FBcUIvQyxZQUFvQixRQUFpQyxFQUFTLE1BQWlCO1lBQTNELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQXBCL0Usa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1lBRTNCLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBSXJELHdCQUFtQixHQUFXLGtCQUFrQjtnQkFDcEQsd0ZBQXdGO2dCQUN4RixZQUFZO2dCQUNaLDRGQUE0RjtnQkFDNUYsMkZBQTJGO2dCQUMzRiw0RkFBNEYsQ0FBQztZQUN6Rix1QkFBa0IsR0FDdEIsNkVBQTZFO2dCQUM3RSw0Q0FBNEM7Z0JBQzVDLDRGQUE0RjtnQkFDNUYsMkZBQTJGO2dCQUMzRiwyRkFBMkY7Z0JBQzNGLDRGQUE0RixDQUFDO1FBRWYsQ0FBQztRQUVuRixVQUFVLENBQUMsR0FBVztZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ25ELENBQUM7UUFHRDs7OztXQUlHO1FBQ0gsa0JBQWtCO1lBQ2hCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7b0JBQ2IsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUNqQjtnQkFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxnQkFBZ0I7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsa0JBQWtCLENBQUMsS0FBYSxFQUFFLEtBQWE7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsa0JBQWtCO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUNELFFBQVE7WUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUU7b0JBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2hEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtnQkFDOUIsSUFBSSxFQUFFLDBCQUEwQjthQUNqQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUMxQixFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDckMsQ0FBQztLQUNGLENBQUE7SUExRlksb0NBQW9DO1FBWGhELFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSwyQ0FBMkM7WUFFckQseWZBQTBDO1lBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO1FBQ0Y7OztXQUdHOzt5Q0FzQjZCLHVCQUF1QixFQUFpQixTQUFTO09BckJwRSxvQ0FBb0MsQ0EwRmhEO0lBQUQsMkNBQUM7S0FBQTtTQTFGWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmltcG9ydCB7U3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZ30gZnJvbSAnLi9jdXN0b20td2lkZ2V0LWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZlN0eWxlcyB7XG4gIFtzdHlsZTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVdpZGdldCB7XG4gIGpzb246IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVdpZGdldHMge1xuICB3aWRnZXRzOiBDdXN0b21XaWRnZXRbXTtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItY3VzdG9tLXdpZGdldHMtdG9vbGJhcicsXG4gIHN0eWxlVXJsczogWydjdXN0b20td2lkZ2V0cy10b29sYmFyLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ2N1c3RvbS13aWRnZXRzLXRvb2xiYXIuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIHRvb2xiYXJcbiAqIEBpbXBsZW1lbnRzIDogT25EZXN0cm95XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0c1Rvb2xiYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGN1c3RvbVdpZGdldHM6IEN1c3RvbVdpZGdldFtdID0gW107XG5cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0c1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2c+O1xuXG4gIHByaXZhdGUgX3RocmVlQ29sdW1uc0xheW91dDogc3RyaW5nID0gJ3tcIndpZGdldFR5cGVcIjowLCcgK1xuICAgICAgJ1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29sdW1uc1wiOlswLjM0LDAuMzMsMC4zM10sJyArXG4gICAgICAnXCJjb250ZW50XCI6JyArXG4gICAgICAnW3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgICAgICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICAgICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119XX0nO1xuICBwcml2YXRlIF9mb3VyQ29sdW1uc0xheW91dDogc3RyaW5nID1cbiAgICAgICd7XCJ3aWRnZXRUeXBlXCI6MCxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSwnICtcbiAgICAgICdcImNvbHVtbnNcIjpbMC4yNSwwLjI1LDAuMjUsMC4yNV0sXCJjb250ZW50XCI6JyArXG4gICAgICAnW3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgICAgICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICAgICAne1wid2lkZ2V0VHlwZVwiOjcsXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb250ZW50XCI6W119LCcgK1xuICAgICAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfV19JztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSwgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7fVxuXG4gIG9wZW5EaWFsb2coaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2cpO1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sYWJlbCA9IHRoaXMuY3VzdG9tV2lkZ2V0c1tpZHhdLnR5cGU7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnBvc2l0aW9uID0gaWR4O1xuICB9XG5cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAhPSBudWxsKSB7XG4gICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgZW50ZXIgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VudGVySGFuZGxlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW50ZXIoYXJyYXksIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBsZWF2ZSBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnTGVhdmVIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0xlYXZlKCk7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuY3VzdG9tV2lkZ2V0cy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmN1c3RvbVdpZGdldHMgPSB4O1xuICAgICAgaWYgKHRoaXMuY3VzdG9tV2lkZ2V0cy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgdGhpcy5jdXN0b21XaWRnZXRzW3RoaXMuY3VzdG9tV2lkZ2V0cy5sZW5ndGggLSAxXS50eXBlID09ICcnKSB7XG4gICAgICAgIHRoaXMub3BlbkRpYWxvZyh0aGlzLmN1c3RvbVdpZGdldHMubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21XaWRnZXRzKHtcbiAgICAgIGpzb246IHRoaXMuX3RocmVlQ29sdW1uc0xheW91dCxcbiAgICAgIHR5cGU6ICdMYXlvdXRXaWRnZXRXaXRoM0NvbHVtbnMnLFxuICAgIH0pO1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ3VzdG9tV2lkZ2V0cyhcbiAgICAgICAge2pzb246IHRoaXMuX2ZvdXJDb2x1bW5zTGF5b3V0LCB0eXBlOiAnTGF5b3V0V2lkZ2V0V2l0aDRDb2x1bW5zJ30pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlcnZpY2UucmVzZXRDdXN0b21XaWRnZXRzKCk7XG4gIH1cbn1cbiJdfQ==