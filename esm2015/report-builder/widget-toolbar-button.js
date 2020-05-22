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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ajfReportBuilderWidgetToString } from './utils';
let AjfReportBuilderWidgetToolbarButton = /** @class */ (() => {
    let AjfReportBuilderWidgetToolbarButton = 
    /**
     * This class will define an ajf builder field toolbar button
     * @implements : OnInit
     */
    class AjfReportBuilderWidgetToolbarButton {
        constructor() { }
        ngOnInit() {
            this.widgetIcon = ajfReportBuilderWidgetToString(this.widgetType);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfReportBuilderWidgetToolbarButton.prototype, "widgetType", void 0);
    AjfReportBuilderWidgetToolbarButton = __decorate([
        Component({
            selector: 'ajf-report-builder-widget-toolbar-button',
            template: "<button\n  mat-button\n  matTooltip=\"{{ widgetType}}\"\n  [matTooltipPosition]=\"'above'\">\n  <mat-icon\n    fontSet=\"ajf-icon\"\n    fontIcon=\"{{ widgetIcon }}\">\n  </mat-icon>\n</button>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}\n"]
        })
        /**
         * This class will define an ajf builder field toolbar button
         * @implements : OnInit
         */
        ,
        __metadata("design:paramtypes", [])
    ], AjfReportBuilderWidgetToolbarButton);
    return AjfReportBuilderWidgetToolbarButton;
})();
export { AjfReportBuilderWidgetToolbarButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvb2xiYXItYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldC10b29sYmFyLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbkcsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBYXZEO0lBQUEsSUFBYSxtQ0FBbUM7SUFKaEQ7OztPQUdHO0lBQ0gsTUFBYSxtQ0FBbUM7UUFJOUMsZ0JBQWUsQ0FBQztRQUNoQixRQUFRO1lBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEUsQ0FBQztLQUNGLENBQUE7SUFQVTtRQUFSLEtBQUssRUFBRTs7MkVBQW9CO0lBRGpCLG1DQUFtQztRQVgvQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsMENBQTBDO1lBQ3BELCtNQUF5QztZQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQztRQUNGOzs7V0FHRzs7O09BQ1UsbUNBQW1DLENBUS9DO0lBQUQsMENBQUM7S0FBQTtTQVJZLG1DQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7YWpmUmVwb3J0QnVpbGRlcldpZGdldFRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXdpZGdldC10b29sYmFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0LXRvb2xiYXItYnV0dG9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LXRvb2xiYXItYnV0dG9uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciBmaWVsZCB0b29sYmFyIGJ1dHRvblxuICogQGltcGxlbWVudHMgOiBPbkluaXRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9uIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgd2lkZ2V0VHlwZTogc3RyaW5nO1xuICB3aWRnZXRJY29uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLndpZGdldEljb24gPSBhamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9TdHJpbmcodGhpcy53aWRnZXRUeXBlKTtcbiAgfVxufVxuIl19