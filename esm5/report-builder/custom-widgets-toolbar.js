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
var AjfReportBuilderCustomWidgetsToolbar = /** @class */ (function () {
    function AjfReportBuilderCustomWidgetsToolbar(_service, dialog) {
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
    AjfReportBuilderCustomWidgetsToolbar.prototype.openDialog = function (idx) {
        this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
        this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
        this._dialogRef.componentInstance.position = idx;
    };
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype.onDragStartHandler = function () {
        var _this = this;
        var s = timer(200)
            .subscribe(function () {
            if (s != null) {
                s.unsubscribe();
            }
            _this._service.dragStarted();
        });
    };
    /**
     * sign the end of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype.onDragEndHandler = function () {
        this._service.dragEnded();
    };
    /**
     *  sign the enter of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype.onDragEnterHandler = function (array, index) {
        this._service.dragEnter(array, index);
    };
    /**
     * sign the leave of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype.onDragLeaveHandler = function () {
        this._service.dragLeave();
    };
    AjfReportBuilderCustomWidgetsToolbar.prototype.ngOnInit = function () {
        var _this = this;
        this._customWidgetsSub = this._service.customWidgets
            .subscribe(function (x) {
            _this.customWidgets = x;
            if (_this.customWidgets.length > 0 &&
                _this.customWidgets[_this.customWidgets.length - 1].type == '') {
                _this.openDialog(_this.customWidgets.length - 1);
            }
        });
        this._service.addCustomWidgets({
            json: this._threeColumnsLayout,
            type: 'LayoutWidgetWith3Columns',
        });
        this._service.addCustomWidgets({
            json: this._fourColumnsLayout,
            type: 'LayoutWidgetWith4Columns'
        });
    };
    AjfReportBuilderCustomWidgetsToolbar.prototype.ngOnDestroy = function () {
        this._customWidgetsSub.unsubscribe();
        this._service.resetCustomWidgets();
    };
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
    AjfReportBuilderCustomWidgetsToolbar.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: MatDialog }
    ]; };
    return AjfReportBuilderCustomWidgetsToolbar;
}());
export { AjfReportBuilderCustomWidgetsToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldHMtdG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0cy10b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQXFCLGlCQUFpQixFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFFakUsT0FBTyxFQUFDLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFekMsT0FBTyxFQUFDLGtDQUFrQyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFnQmpFO0lBaUNFLDhDQUNVLFFBQWlDLEVBQ2xDLE1BQWlCO1FBRGhCLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVc7UUF2QjFCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUUzQixzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUlyRCx3QkFBbUIsR0FDM0Isa0JBQWtCO1lBQ2xCLHdGQUF3RjtZQUN4RixZQUFZO1lBQ1osNEZBQTRGO1lBQzVGLDJGQUEyRjtZQUMzRiw0RkFBNEYsQ0FBQztRQUNyRix1QkFBa0IsR0FDMUIsNkVBQTZFO1lBQzdFLDRDQUE0QztZQUM1Qyw0RkFBNEY7WUFDNUYsMkZBQTJGO1lBQzNGLDJGQUEyRjtZQUMzRiw0RkFBNEYsQ0FBQztJQUs3RixDQUFDO0lBRUQseURBQVUsR0FBVixVQUFXLEdBQVc7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUNuRCxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNILGlFQUFrQixHQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNmLFNBQVMsQ0FBQztZQUNULElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7YUFBRTtZQUNuQyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCwrREFBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaUVBQWtCLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxLQUFhO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlFQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNELHVEQUFRLEdBQVI7UUFBQSxpQkFtQkM7UUFsQkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTthQUNqRCxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ1YsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFDRSxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUM3QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQzVEO2dCQUNBLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDOUIsSUFBSSxFQUFFLDBCQUEwQjtTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzdCLElBQUksRUFBRSwwQkFBMEI7U0FDakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDBEQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3JDLENBQUM7O2dCQTVHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJDQUEyQztvQkFFckQseWZBQTBDO29CQUMxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkF0Qk8sdUJBQXVCO2dCQUx2QixTQUFTOztJQWtJakIsMkNBQUM7Q0FBQSxBQTdHRCxJQTZHQztTQWxHWSxvQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmltcG9ydCB7U3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZ30gZnJvbSAnLi9jdXN0b20td2lkZ2V0LWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZlN0eWxlcyB7XG4gIFtzdHlsZTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVdpZGdldCB7XG4gIGpzb246IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVdpZGdldHMge1xuICB3aWRnZXRzOiBDdXN0b21XaWRnZXRbXTtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItY3VzdG9tLXdpZGdldHMtdG9vbGJhcicsXG4gIHN0eWxlVXJsczogWydjdXN0b20td2lkZ2V0cy10b29sYmFyLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ2N1c3RvbS13aWRnZXRzLXRvb2xiYXIuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIHRvb2xiYXJcbiAqIEBpbXBsZW1lbnRzIDogT25EZXN0cm95XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0c1Rvb2xiYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGN1c3RvbVdpZGdldHM6IEN1c3RvbVdpZGdldFtdID0gW107XG5cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0c1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2c+O1xuXG4gIHByaXZhdGUgX3RocmVlQ29sdW1uc0xheW91dDogc3RyaW5nID1cbiAgJ3tcIndpZGdldFR5cGVcIjowLCcgK1xuICAnXCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fSxcInZpc2liaWxpdHlcIjp7XCJjb25kaXRpb25cIjpcInRydWVcIn0sXCJjb2x1bW5zXCI6WzAuMzQsMC4zMywwLjMzXSwnICtcbiAgJ1wiY29udGVudFwiOicgK1xuICAnW3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfSwnICtcbiAgJ3tcIndpZGdldFR5cGVcIjo3LFwiY29udGVudFwiOltdLFwic3R5bGVzXCI6e30sXCJ2aXNpYmlsaXR5XCI6e1wiY29uZGl0aW9uXCI6XCJ0cnVlXCJ9LFwiY29udGVudFwiOltdfV19JztcbiAgcHJpdmF0ZSBfZm91ckNvbHVtbnNMYXlvdXQ6IHN0cmluZyA9XG4gICd7XCJ3aWRnZXRUeXBlXCI6MCxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSwnICtcbiAgJ1wiY29sdW1uc1wiOlswLjI1LDAuMjUsMC4yNSwwLjI1XSxcImNvbnRlbnRcIjonICtcbiAgJ1t7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX0sJyArXG4gICd7XCJ3aWRnZXRUeXBlXCI6NyxcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9LFwidmlzaWJpbGl0eVwiOntcImNvbmRpdGlvblwiOlwidHJ1ZVwifSxcImNvbnRlbnRcIjpbXX1dfSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7XG4gIH1cblxuICBvcGVuRGlhbG9nKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nKTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubGFiZWwgPSB0aGlzLmN1c3RvbVdpZGdldHNbaWR4XS50eXBlO1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5wb3NpdGlvbiA9IGlkeDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChzICE9IG51bGwpIHsgcy51bnN1YnNjcmliZSgpOyB9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBlbnRlciBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJIYW5kbGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbnRlcihhcnJheSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGxlYXZlIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdMZWF2ZUhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnTGVhdmUoKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5jdXN0b21XaWRnZXRzXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLmN1c3RvbVdpZGdldHMgPSB4O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICB0aGlzLmN1c3RvbVdpZGdldHNbdGhpcy5jdXN0b21XaWRnZXRzLmxlbmd0aCAtIDFdLnR5cGUgPT0gJydcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5vcGVuRGlhbG9nKHRoaXMuY3VzdG9tV2lkZ2V0cy5sZW5ndGggLSAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21XaWRnZXRzKHtcbiAgICAgIGpzb246IHRoaXMuX3RocmVlQ29sdW1uc0xheW91dCxcbiAgICAgIHR5cGU6ICdMYXlvdXRXaWRnZXRXaXRoM0NvbHVtbnMnLFxuICAgIH0pO1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ3VzdG9tV2lkZ2V0cyh7XG4gICAgICBqc29uOiB0aGlzLl9mb3VyQ29sdW1uc0xheW91dCxcbiAgICAgIHR5cGU6ICdMYXlvdXRXaWRnZXRXaXRoNENvbHVtbnMnXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VydmljZS5yZXNldEN1c3RvbVdpZGdldHMoKTtcbiAgfVxufVxuIl19