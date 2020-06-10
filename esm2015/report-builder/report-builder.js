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
let AjfReportBuilder = /** @class */ (() => {
    class AjfReportBuilder {
        constructor(_service) {
            this._service = _service;
            this._init = false;
        }
        get report() {
            return this._report;
        }
        set report(report) {
            if (report != null) {
                this._report = report;
                if (this._init) {
                    this._setCurrentReport();
                }
            }
        }
        ngAfterContentInit() {
            this._setCurrentReport();
            this._init = true;
        }
        _setCurrentReport() {
            this._service.setReportForms(this.report != null ? this.report.forms || [] : []);
            this._service.setReport(this.report);
        }
    }
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
    AjfReportBuilder.ctorParameters = () => [
        { type: AjfReportBuilderService }
    ];
    AjfReportBuilder.propDecorators = {
        startSidenav: [{ type: ViewChild, args: [MatSidenav, { static: true },] }],
        report: [{ type: Input }]
    };
    return AjfReportBuilder;
})();
export { AjfReportBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvcmVwb3J0LWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFO0lBQUEsTUFVYSxnQkFBZ0I7UUFtQjNCLFlBQW9CLFFBQWlDO1lBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBaEI3QyxVQUFLLEdBQVksS0FBSyxDQUFDO1FBZ0J5QixDQUFDO1FBYnpELElBQUksTUFBTTtZQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFDSSxNQUFNLENBQUMsTUFBaUI7WUFDMUIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNkLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2lCQUMxQjthQUNGO1FBQ0gsQ0FBQztRQUlELGtCQUFrQjtZQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDO1FBRU8saUJBQWlCO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pGLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDOzs7Z0JBdkNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qix1c0JBQWtDO29CQUVsQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFSTyx1QkFBdUI7OzsrQkFhNUIsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7eUJBUXBDLEtBQUs7O0lBcUJSLHVCQUFDO0tBQUE7U0E5QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdFNpZGVuYXZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3JlcG9ydC1idWlsZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVwb3J0LWJ1aWxkZXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBmb3JtIGJ1aWxkZXJ4XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoTWF0U2lkZW5hdiwge3N0YXRpYzogdHJ1ZX0pIHN0YXJ0U2lkZW5hdjogTWF0U2lkZW5hdjtcblxuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcmVwb3J0OiBBamZSZXBvcnQ7XG4gIGdldCByZXBvcnQoKTogQWpmUmVwb3J0IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZXBvcnQocmVwb3J0OiBBamZSZXBvcnQpIHtcbiAgICBpZiAocmVwb3J0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlcG9ydCA9IHJlcG9ydDtcbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX3NldEN1cnJlbnRSZXBvcnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFJlcG9ydCgpO1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudFJlcG9ydCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydEZvcm1zKHRoaXMucmVwb3J0ICE9IG51bGwgPyB0aGlzLnJlcG9ydC5mb3JtcyB8fCBbXSA6IFtdKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydCh0aGlzLnJlcG9ydCk7XG4gIH1cbn1cbiJdfQ==