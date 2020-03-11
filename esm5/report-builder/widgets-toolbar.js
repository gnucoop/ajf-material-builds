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
import { AjfChartType, AjfWidgetType } from '@ajf/core/reports';
import { sizedEnumToStringArray } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
var AjfReportBuilderWidgetsToolbar = /** @class */ (function () {
    /**
     *
     * @param private _afjBuilderService: AjfBuilderService
     */
    function AjfReportBuilderWidgetsToolbar(_service) {
        this._service = _service;
        // fieldTypes is an array string that contains the field options
        this.chartTypes = sizedEnumToStringArray(AjfChartType);
        this.widgetTypes = sizedEnumToStringArray(AjfWidgetType);
        // delete Column widget
        var pos = this.widgetTypes.indexOf('Column');
        if (pos !== -1) {
            this.widgetTypes.splice(pos, 1);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderWidgetsToolbar.prototype.onDragStartHandler = function () {
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
    AjfReportBuilderWidgetsToolbar.prototype.onDragEndHandler = function () {
        this._service.dragEnded();
    };
    AjfReportBuilderWidgetsToolbar.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-widgets-toolbar',
                    template: "<mat-list>\n  <mat-list-item *ngFor=\"let t of widgetTypes\">\n    <ajf-report-builder-widget-toolbar-button ng-if=\"t != 'Column'\"\n        cdkDrag\n        [cdkDragData]=\"{widgetType: t, dropZones: ['header','content','footer','column','widget']}\"\n        [widgetType]=\"t\"\n        (onDragStart)=\"onDragStartHandler();\"\n        (onDragEnd)=\"onDragEndHandler();\">\n    </ajf-report-builder-widget-toolbar-button>\n  </mat-list-item>\n</mat-list>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderWidgetsToolbar.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    return AjfReportBuilderWidgetsToolbar;
}());
export { AjfReportBuilderWidgetsToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy10b29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldHMtdG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzQixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUdqRTtJQWVFOzs7T0FHRztJQUNILHdDQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQVRyRCxnRUFBZ0U7UUFDaEUsZUFBVSxHQUFhLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVELGdCQUFXLEdBQWEsc0JBQXNCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFRNUQsdUJBQXVCO1FBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCwyREFBa0IsR0FBbEI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDZixTQUFTLENBQUM7WUFDVCxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQUU7WUFDbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gseURBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDOztnQkE5Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLHVkQUFtQztvQkFDbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFSTyx1QkFBdUI7O0lBa0QvQixxQ0FBQztDQUFBLEFBL0NELElBK0NDO1NBdENZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGFydFR5cGUsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7c2l6ZWRFbnVtVG9TdHJpbmdBcnJheX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXdpZGdldHMtdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0cy10b29sYmFyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBBamYgYnVpbGRlciBmaWVsZHMgdG9vbGJhclxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNUb29sYmFyIHtcbiAgLy8gZmllbGRUeXBlcyBpcyBhbiBhcnJheSBzdHJpbmcgdGhhdCBjb250YWlucyB0aGUgZmllbGQgb3B0aW9uc1xuICBjaGFydFR5cGVzOiBzdHJpbmdbXSA9IHNpemVkRW51bVRvU3RyaW5nQXJyYXkoQWpmQ2hhcnRUeXBlKTtcbiAgd2lkZ2V0VHlwZXM6IHN0cmluZ1tdID0gc2l6ZWRFbnVtVG9TdHJpbmdBcnJheShBamZXaWRnZXRUeXBlKTtcblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcHJpdmF0ZSBfYWZqQnVpbGRlclNlcnZpY2U6IEFqZkJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge1xuICAgIC8vIGRlbGV0ZSBDb2x1bW4gd2lkZ2V0XG4gICAgbGV0IHBvcyA9IHRoaXMud2lkZ2V0VHlwZXMuaW5kZXhPZignQ29sdW1uJyk7XG4gICAgaWYgKHBvcyAhPT0gLTEpIHtcbiAgICAgIHRoaXMud2lkZ2V0VHlwZXMuc3BsaWNlKHBvcywgMSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgc3RhcnQgb2YgbW91c2UgZHJhZyB3aXRoIDIwMCBtcyBvZiBkZWxheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ1N0YXJ0SGFuZGxlcigpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRpbWVyKDIwMClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAocyAhPSBudWxsKSB7IHMudW5zdWJzY3JpYmUoKTsgfVxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmRyYWdTdGFydGVkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxufVxuIl19