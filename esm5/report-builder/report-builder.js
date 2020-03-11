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
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AjfReportBuilderService } from './report-builder-service';
var AjfReportBuilder = /** @class */ (function () {
    function AjfReportBuilder(_service) {
        this._service = _service;
        this._init = false;
    }
    Object.defineProperty(AjfReportBuilder.prototype, "report", {
        get: function () { return this._report; },
        set: function (report) {
            if (report != null) {
                this._report = report;
                if (this._init) {
                    this._setCurrentReport();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AjfReportBuilder.prototype.ngAfterContentInit = function () {
        this._setCurrentReport();
        this._init = true;
    };
    AjfReportBuilder.prototype._setCurrentReport = function () {
        this._service.setReportForms(this.report != null ? this.report.forms || [] : []);
        this._service.setReport(this.report);
    };
    AjfReportBuilder.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder',
                    template: "<ajf-report-builder-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-toolbar>\n<ajf-report-builder-custom-widgets-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-custom-widgets-toolbar>\n<mat-drawer-container>\n    <mat-drawer #start position=\"start\" mode=\"side\" class=\"ajf-builder-sidebar\">\n        <ajf-report-builder-widgets-toolbar></ajf-report-builder-widgets-toolbar>\n    </mat-drawer>\n    <ajf-report-builder-content></ajf-report-builder-content>\n    <mat-drawer #end position=\"end\" mode=\"side\" class=\"ajf-builder-prop\" [opened]=\"true\">\n      <ajf-report-builder-properties></ajf-report-builder-properties>\n    </mat-drawer>\n</mat-drawer-container>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report-builder{display:block;position:relative;width:100%;height:100%;overflow:hidden}ajf-report-builder mat-sidenav-container{height:100%}ajf-report-builder mat-sidenav-container .ajf-builder-sidebar{max-width:7%}ajf-report-builder mat-sidenav-container .ajf-builder-prop{max-width:30%}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilder.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    AjfReportBuilder.propDecorators = {
        startSidenav: [{ type: ViewChild, args: [MatSidenav, { static: true },] }],
        report: [{ type: Input }]
    };
    return AjfReportBuilder;
}());
export { AjfReportBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvcmVwb3J0LWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNhLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUMxRixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFakU7SUEwQkUsMEJBQW9CLFFBQWlDO1FBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBYjdDLFVBQUssR0FBWSxLQUFLLENBQUM7SUFhMEIsQ0FBQztJQVYxRCxzQkFBSSxvQ0FBTTthQUFWLGNBQTBCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDaEQsVUFBb0IsTUFBaUI7WUFDbkMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNkLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2lCQUMxQjthQUNGO1FBQ0gsQ0FBQzs7O09BUitDO0lBWWhELDZDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFTyw0Q0FBaUIsR0FBekI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qix1c0JBQWtDO29CQUVsQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFSTyx1QkFBdUI7OzsrQkFhNUIsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7eUJBTXBDLEtBQUs7O0lBb0JSLHVCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0EzQlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0U2lkZW5hdn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5cbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3JlcG9ydC1idWlsZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVwb3J0LWJ1aWxkZXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBmb3JtIGJ1aWxkZXJ4XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoTWF0U2lkZW5hdiwge3N0YXRpYzogdHJ1ZX0pIHN0YXJ0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcmVwb3J0OiBBamZSZXBvcnQ7XG4gIGdldCByZXBvcnQoKTogQWpmUmVwb3J0IHsgcmV0dXJuIHRoaXMuX3JlcG9ydDsgfVxuICBASW5wdXQoKSBzZXQgcmVwb3J0KHJlcG9ydDogQWpmUmVwb3J0KSB7XG4gICAgaWYgKHJlcG9ydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZXBvcnQgPSByZXBvcnQ7XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9zZXRDdXJyZW50UmVwb3J0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50UmVwb3J0KCk7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50UmVwb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0Rm9ybXModGhpcy5yZXBvcnQgIT0gbnVsbCA/IHRoaXMucmVwb3J0LmZvcm1zIHx8IFtdIDogW10pO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0KHRoaXMucmVwb3J0KTtcbiAgfVxufVxuIl19