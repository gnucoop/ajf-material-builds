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
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeStringToIcon, ajfWidgetTypeStringToLabel } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "@angular/material/button";
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
export class AjfReportBuilderCustomWidgetToolbarButton {
    // {...t, dropZones: ['header','content','footer','column','widget']}
    /**
     * this constructor will init icon registry
     */
    constructor(_service) {
        this._service = _service;
        this.customWidgets = [];
    }
    /**
     * this method call a service method for remove custom widget
     *
     * @memberOf AjfReportBuilderCustomWidgetToolbarButton
     */
    remove() {
        this._service.remove('customWidgets', this.position);
    }
    /**
     * this method will init  fieldIcon and fieldLabel
     */
    ngOnInit() {
        this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
        this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
    }
}
AjfReportBuilderCustomWidgetToolbarButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderCustomWidgetToolbarButton, deps: [{ token: i1.AjfReportBuilderService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderCustomWidgetToolbarButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderCustomWidgetToolbarButton, selector: "ajf-report-builder-custom-widget-toolbar-button", inputs: { widgetType: "widgetType", position: "position" }, ngImport: i0, template: "<a mat-button>\n  {{ widgetType}}\n  <i class=\"material-icons\"(click)=\"remove()\">remove_circle_outline</i>\n</a>\n\n", styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute !important;margin-left:5px !important;z-index:5}\n"], components: [{ type: i2.MatAnchor, selector: "a[mat-button], a[mat-raised-button], a[mat-icon-button], a[mat-fab],             a[mat-mini-fab], a[mat-stroked-button], a[mat-flat-button]", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderCustomWidgetToolbarButton, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-custom-widget-toolbar-button', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<a mat-button>\n  {{ widgetType}}\n  <i class=\"material-icons\"(click)=\"remove()\">remove_circle_outline</i>\n</a>\n\n", styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute !important;margin-left:5px !important;z-index:5}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }]; }, propDecorators: { widgetType: [{
                type: Input
            }], position: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2N1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7QUFTOUU7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLHlDQUF5QztJQU9wRCxxRUFBcUU7SUFFckU7O09BRUc7SUFDSCxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQVByRCxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQU84QixDQUFDO0lBRXpEOzs7O09BSUc7SUFDSCxNQUFNO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7OElBNUJVLHlDQUF5QztrSUFBekMseUNBQXlDLG1KQ3RDdEQsMEhBS0E7bUdEaUNhLHlDQUF5QztrQkFYckQsU0FBUzsrQkFDRSxpREFBaUQsaUJBRzVDLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OEdBT3RDLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge2FqZldpZGdldFR5cGVTdHJpbmdUb0ljb24sIGFqZldpZGdldFR5cGVTdHJpbmdUb0xhYmVsfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWN1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJ2N1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydjdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgZmllbGQgdG9vbGJhciBidXR0b25cbiAqIEBpbXBsZW1lbnRzIDogT25Jbml0XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IHN0cmluZztcbiAgQElucHV0KCkgcG9zaXRpb246IG51bWJlcjtcbiAgd2lkZ2V0SWNvbjogc3RyaW5nO1xuICB3aWRnZXRMYWJlbDogc3RyaW5nO1xuICBjdXN0b21XaWRnZXRzOiBhbnlbXSA9IFtdO1xuXG4gIC8vIHsuLi50LCBkcm9wWm9uZXM6IFsnaGVhZGVyJywnY29udGVudCcsJ2Zvb3RlcicsJ2NvbHVtbicsJ3dpZGdldCddfVxuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBpY29uIHJlZ2lzdHJ5XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgY2FsbCBhIHNlcnZpY2UgbWV0aG9kIGZvciByZW1vdmUgY3VzdG9tIHdpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldFRvb2xiYXJCdXR0b25cbiAgICovXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSgnY3VzdG9tV2lkZ2V0cycsIHRoaXMucG9zaXRpb24pO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGluaXQgIGZpZWxkSWNvbiBhbmQgZmllbGRMYWJlbFxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy53aWRnZXRJY29uID0gYWpmV2lkZ2V0VHlwZVN0cmluZ1RvSWNvbih0aGlzLndpZGdldFR5cGUpO1xuICAgIHRoaXMud2lkZ2V0TGFiZWwgPSBhamZXaWRnZXRUeXBlU3RyaW5nVG9MYWJlbCh0aGlzLndpZGdldFR5cGUpO1xuICB9XG59XG4iLCI8YSBtYXQtYnV0dG9uPlxuICB7eyB3aWRnZXRUeXBlfX1cbiAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiKGNsaWNrKT1cInJlbW92ZSgpXCI+cmVtb3ZlX2NpcmNsZV9vdXRsaW5lPC9pPlxuPC9hPlxuXG4iXX0=