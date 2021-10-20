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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ajfReportBuilderWidgetToString } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/button";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/material/tooltip";
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
export class AjfReportBuilderWidgetToolbarButton {
    constructor() { }
    ngOnInit() {
        this.widgetIcon = ajfReportBuilderWidgetToString(this.widgetType);
    }
}
AjfReportBuilderWidgetToolbarButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderWidgetToolbarButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderWidgetToolbarButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderWidgetToolbarButton, selector: "ajf-report-builder-widget-toolbar-button", inputs: { widgetType: "widgetType" }, ngImport: i0, template: "<button\n  mat-button\n  matTooltip=\"{{ widgetType}}\"\n  [matTooltipPosition]=\"'above'\">\n  <mat-icon\n    fontSet=\"ajf-icon\"\n    fontIcon=\"{{ widgetIcon }}\">\n  </mat-icon>\n</button>\n", styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}\n"], components: [{ type: i1.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i3.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderWidgetToolbarButton, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-widget-toolbar-button', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-button\n  matTooltip=\"{{ widgetType}}\"\n  [matTooltipPosition]=\"'above'\">\n  <mat-icon\n    fontSet=\"ajf-icon\"\n    fontIcon=\"{{ widgetIcon }}\">\n  </mat-icon>\n</button>\n", styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { widgetType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvb2xiYXItYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldC10b29sYmFyLWJ1dHRvbi50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXQtdG9vbGJhci1idXR0b24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7O0FBU3ZEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxtQ0FBbUM7SUFJOUMsZ0JBQWUsQ0FBQztJQUNoQixRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7d0lBUFUsbUNBQW1DOzRIQUFuQyxtQ0FBbUMsc0hDckNoRCxxTUFTQTttR0Q0QmEsbUNBQW1DO2tCQVgvQyxTQUFTOytCQUNFLDBDQUEwQyxpQkFHckMsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTswRUFPdEMsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7YWpmUmVwb3J0QnVpbGRlcldpZGdldFRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXdpZGdldC10b29sYmFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0LXRvb2xiYXItYnV0dG9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LXRvb2xiYXItYnV0dG9uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgZmllbGQgdG9vbGJhciBidXR0b25cbiAqIEBpbXBsZW1lbnRzIDogT25Jbml0XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9vbGJhckJ1dHRvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IHN0cmluZztcbiAgd2lkZ2V0SWNvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy53aWRnZXRJY29uID0gYWpmUmVwb3J0QnVpbGRlcldpZGdldFRvU3RyaW5nKHRoaXMud2lkZ2V0VHlwZSk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgbWF0LWJ1dHRvblxuICBtYXRUb29sdGlwPVwie3sgd2lkZ2V0VHlwZX19XCJcbiAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCI+XG4gIDxtYXQtaWNvblxuICAgIGZvbnRTZXQ9XCJhamYtaWNvblwiXG4gICAgZm9udEljb249XCJ7eyB3aWRnZXRJY29uIH19XCI+XG4gIDwvbWF0LWljb24+XG48L2J1dHRvbj5cbiJdfQ==