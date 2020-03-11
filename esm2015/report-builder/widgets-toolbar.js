/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widgets-toolbar.ts
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
import { AjfChartType, AjfWidgetType } from '@ajf/core/reports';
import { sizedEnumToStringArray } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * This class will define an Ajf builder fields toolbar
 */
export class AjfReportBuilderWidgetsToolbar {
    /**
     *
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        // fieldTypes is an array string that contains the field options
        this.chartTypes = sizedEnumToStringArray(AjfChartType);
        this.widgetTypes = sizedEnumToStringArray(AjfWidgetType);
        // delete Column widget
        /** @type {?} */
        let pos = this.widgetTypes.indexOf('Column');
        if (pos !== -1) {
            this.widgetTypes.splice(pos, 1);
        }
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
}
AjfReportBuilderWidgetsToolbar.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-widgets-toolbar',
                template: "<mat-list>\n  <mat-list-item *ngFor=\"let t of widgetTypes\">\n    <ajf-report-builder-widget-toolbar-button ng-if=\"t != 'Column'\"\n        cdkDrag\n        [cdkDragData]=\"{widgetType: t, dropZones: ['header','content','footer','column','widget']}\"\n        [widgetType]=\"t\"\n        (onDragStart)=\"onDragStartHandler();\"\n        (onDragEnd)=\"onDragEndHandler();\">\n    </ajf-report-builder-widget-toolbar-button>\n  </mat-list-item>\n</mat-list>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AjfReportBuilderWidgetsToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderWidgetsToolbar.prototype.chartTypes;
    /** @type {?} */
    AjfReportBuilderWidgetsToolbar.prototype.widgetTypes;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsToolbar.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy10b29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldHMtdG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUzQixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVNqRTs7R0FFRztBQUNILE1BQU0sT0FBTyw4QkFBOEI7Ozs7O0lBVXpDLFlBQW9CLFFBQWlDO1FBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCOztRQVJyRCxlQUFVLEdBQWEsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsZ0JBQVcsR0FBYSxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O1lBU3hELEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7Ozs7O0lBTUQsa0JBQWtCOztZQUNaLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ2YsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQU9ELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7O1lBOUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5Qyx1ZEFBbUM7Z0JBQ25DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQVJPLHVCQUF1Qjs7OztJQWM3QixvREFBNEQ7O0lBQzVELHFEQUE4RDs7Ozs7SUFPbEQsa0RBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNoYXJ0VHlwZSwgQWpmV2lkZ2V0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtzaXplZEVudW1Ub1N0cmluZ0FycmF5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItd2lkZ2V0cy10b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXRzLXRvb2xiYXIuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIEFqZiBidWlsZGVyIGZpZWxkcyB0b29sYmFyXG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Rvb2xiYXIge1xuICAvLyBmaWVsZFR5cGVzIGlzIGFuIGFycmF5IHN0cmluZyB0aGF0IGNvbnRhaW5zIHRoZSBmaWVsZCBvcHRpb25zXG4gIGNoYXJ0VHlwZXM6IHN0cmluZ1tdID0gc2l6ZWRFbnVtVG9TdHJpbmdBcnJheShBamZDaGFydFR5cGUpO1xuICB3aWRnZXRUeXBlczogc3RyaW5nW10gPSBzaXplZEVudW1Ub1N0cmluZ0FycmF5KEFqZldpZGdldFR5cGUpO1xuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwcml2YXRlIF9hZmpCdWlsZGVyU2VydmljZTogQWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgLy8gZGVsZXRlIENvbHVtbiB3aWRnZXRcbiAgICBsZXQgcG9zID0gdGhpcy53aWRnZXRUeXBlcy5pbmRleE9mKCdDb2x1bW4nKTtcbiAgICBpZiAocG9zICE9PSAtMSkge1xuICAgICAgdGhpcy53aWRnZXRUeXBlcy5zcGxpY2UocG9zLCAxKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChzICE9IG51bGwpIHsgcy51bnN1YnNjcmliZSgpOyB9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG59XG4iXX0=