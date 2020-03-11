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
import { __extends } from "tslib";
import { AjfCalendar, AjfCalendarService } from '@ajf/core/calendar';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return AjfCalendarComponent; }),
    multi: true
};
/**
 * Ajf calendar component.
 */
var AjfCalendarComponent = /** @class */ (function (_super) {
    __extends(AjfCalendarComponent, _super);
    function AjfCalendarComponent(cdr, service) {
        return _super.call(this, cdr, service) || this;
    }
    AjfCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-calendar',
                    template: "<div class=\"ajf-calendar-header\">\n  <button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button>\n  <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">\n    {{ viewHeader | translate }}\n  </button>\n  <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button>\n</div>\n<div class=\"ajf-calendar-row\" *ngIf=\"calendarHeaders.length > 0\">\n  <div *ngFor=\"let calendarHeader of calendarHeaders\">\n    {{ calendarHeader | translate }}\n  </div>\n</div>\n<div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\">\n  <button\n      *ngFor=\"let entry of row\"\n      mat-raised-button\n      [class.ajf-calendar-partial-selection]=\"entry.selected == 'partial'\"\n      [disabled]=\"disabled || (entry.disabled || false)\"\n      [color]=\"entry.selected != 'none' ? 'warn' : undefined\"\n      (click)=\"selectEntry(entry)\"\n  >{{ entry|ajfCalendarEntryLabel }}</button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    outputs: [
                        'change'
                    ],
                    providers: [
                        CALENDAR_CONTROL_VALUE_ACCESSOR,
                    ],
                    styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection ::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfCalendarComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfCalendarService }
    ]; };
    return AjfCalendarComponent;
}(AjfCalendar));
export { AjfCalendarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY2FsZW5kYXIvY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFDdkUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsTUFBTSxDQUFDLElBQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRjs7R0FFRztBQUNIO0lBYTBDLHdDQUFXO0lBQ25ELDhCQUFZLEdBQXNCLEVBQUUsT0FBMkI7ZUFDN0Qsa0JBQU0sR0FBRyxFQUFFLE9BQU8sQ0FBQztJQUNyQixDQUFDOztnQkFoQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QiwrNkJBQTRCO29CQUU1QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLE9BQU8sRUFBRTt3QkFDUCxRQUFRO3FCQUNUO29CQUNELFNBQVMsRUFBRTt3QkFDVCwrQkFBK0I7cUJBQ2hDOztpQkFDRjs7OztnQkF6QmdDLGlCQUFpQjtnQkFEN0Isa0JBQWtCOztJQStCdkMsMkJBQUM7Q0FBQSxBQWpCRCxDQWEwQyxXQUFXLEdBSXBEO1NBSlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyLCBBamZDYWxlbmRhclNlcnZpY2V9IGZyb20gJ0BhamYvY29yZS9jYWxlbmRhcic7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBmb3J3YXJkUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBDQUxFTkRBUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZDYWxlbmRhckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKipcbiAqIEFqZiBjYWxlbmRhciBjb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jYWxlbmRhcicsXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjYWxlbmRhci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIG91dHB1dHM6IFtcbiAgICAnY2hhbmdlJ1xuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBDQUxFTkRBUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyQ29tcG9uZW50IGV4dGVuZHMgQWpmQ2FsZW5kYXIge1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBzZXJ2aWNlOiBBamZDYWxlbmRhclNlcnZpY2UpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UpO1xuICB9XG59XG4iXX0=