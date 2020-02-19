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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
var AjfReportBuilderToolbar = /** @class */ (function () {
    function AjfReportBuilderToolbar(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        // this is an any EventEmitter
        this.addClick = new EventEmitter();
        this.zoom = false;
        this.emptyContent = this._service.emptyContent;
    }
    AjfReportBuilderToolbar.prototype.canDropPredicate = function (item) {
        return item.data.dropZones.indexOf('widget') > -1;
    };
    AjfReportBuilderToolbar.prototype.JSONRequest = function () {
    };
    /**
     * this method will pass event to event emitter
     */
    AjfReportBuilderToolbar.prototype.onAddClick = function (event) {
        this.addClick.emit(event);
    };
    AjfReportBuilderToolbar.prototype.addToList = function (event) {
        if (event.item.data.widget != null) {
            this._service.addCustomWidgets({
                json: JSON.stringify(event.item.data.widget.toJson()),
                type: ''
            });
        }
    };
    AjfReportBuilderToolbar.prototype.undoLastOperation = function () {
        try {
            var myObj = JSON.parse(this._service.popJsonStack() || '');
            this._service.setReport(deepCopy(myObj));
        }
        catch (e) { }
    };
    AjfReportBuilderToolbar.prototype.isZoomed = function () {
        this.zoom = !this.zoom;
        if (this.zoom) {
            this._service.fixedZoomIn();
        }
        else {
            this._service.fixedZoomOut();
        }
    };
    AjfReportBuilderToolbar.prototype.openDialog = function () {
        this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
    };
    AjfReportBuilderToolbar.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-toolbar',
                    outputs: ['addClick'],
                    template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderToolbar.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: MatDialog }
    ]; };
    return AjfReportBuilderToolbar;
}());
export { AjfReportBuilderToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci90b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFJakUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFL0Q7SUFzQkUsaUNBQ1UsUUFBaUMsRUFDbEMsTUFBaUI7UUFEaEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQVgxQiw4QkFBOEI7UUFDOUIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXRELFNBQUksR0FBRyxLQUFLLENBQUM7UUFTVCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBQ25ELENBQUM7SUFFRCxrREFBZ0IsR0FBaEIsVUFBaUIsSUFBdUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELDZDQUFXLEdBQVg7SUFDQSxDQUFDO0lBQ0Q7O09BRUc7SUFDSCw0Q0FBVSxHQUFWLFVBQVcsS0FBVTtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkNBQVMsR0FBVCxVQUFVLEtBQTRDO1FBQ3BELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JELElBQUksRUFBRSxFQUFFO2FBQ1QsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsbURBQWlCLEdBQWpCO1FBQ0UsSUFBSTtZQUNGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7SUFDakIsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELDRDQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0JBcEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBRXJCLDBxQ0FBMkI7b0JBQzNCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVZPLHVCQUF1QjtnQkFKdkIsU0FBUzs7SUE0RWpCLDhCQUFDO0NBQUEsQUFyRUQsSUFxRUM7U0F6RFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGF9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItZHJhZy1kYXRhJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nfSBmcm9tICcuL3Rvb2xiYXItZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXRvb2xiYXInLFxuICBvdXRwdXRzOiBbJ2FkZENsaWNrJ10sXG4gIHN0eWxlVXJsczogWyd0b29sYmFyLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ3Rvb2xiYXIuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIHRvb2xiYXJcbiAqIEBpbXBsZW1lbnRzIDogT25EZXN0cm95XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyVG9vbGJhciB7XG4gIC8vIHRoaXMgaXMgYW4gYW55IEV2ZW50RW1pdHRlclxuICBhZGRDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2c+O1xuICB6b29tID0gZmFsc2U7XG5cbiAgbGFzdEpzb246IHN0cmluZztcblxuICBlbXB0eUNvbnRlbnQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgICB0aGlzLmVtcHR5Q29udGVudCA9IHRoaXMuX3NlcnZpY2UuZW1wdHlDb250ZW50O1xuICB9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXRlbS5kYXRhLmRyb3Bab25lcy5pbmRleE9mKCd3aWRnZXQnKSA+IC0xO1xuICB9XG5cbiAgSlNPTlJlcXVlc3QoKSB7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcGFzcyBldmVudCB0byBldmVudCBlbWl0dGVyXG4gICAqL1xuICBvbkFkZENsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFkZENsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYWRkVG9MaXN0KGV2ZW50OiBDZGtEcmFnRHJvcDxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+KSB7XG4gICAgaWYgKGV2ZW50Lml0ZW0uZGF0YS53aWRnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21XaWRnZXRzKHtcbiAgICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkoZXZlbnQuaXRlbS5kYXRhLndpZGdldC50b0pzb24oKSksXG4gICAgICAgIHR5cGU6ICcnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1bmRvTGFzdE9wZXJhdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG15T2JqID0gSlNPTi5wYXJzZSh0aGlzLl9zZXJ2aWNlLnBvcEpzb25TdGFjaygpIHx8ICcnKTtcbiAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0KGRlZXBDb3B5KG15T2JqKSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cblxuICBpc1pvb21lZCgpIHtcbiAgICB0aGlzLnpvb20gPSAhdGhpcy56b29tO1xuICAgIGlmICh0aGlzLnpvb20pIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuZml4ZWRab29tSW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VydmljZS5maXhlZFpvb21PdXQoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRGlhbG9nKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZyk7XG4gIH1cbn1cbiJdfQ==