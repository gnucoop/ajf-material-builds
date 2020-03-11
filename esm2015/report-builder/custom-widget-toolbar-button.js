/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/custom-widget-toolbar-button.ts
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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeStringToIcon, ajfWidgetTypeStringToLabel } from './utils';
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
export class AjfReportBuilderCustomWidgetToolbarButton {
    // {...t, dropZones: ['header','content','footer','column','widget']}
    /**
     * this constructor will init icon registry
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.customWidgets = [];
    }
    /**
     * this method call a service method for remove custom widget
     *
     * \@memberOf AjfReportBuilderCustomWidgetToolbarButton
     * @return {?}
     */
    remove() {
        this._service.remove('customWidgets', this.position);
    }
    /**
     * this method will init  fieldIcon and fieldLabel
     * @return {?}
     */
    ngOnInit() {
        this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
        this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
    }
}
AjfReportBuilderCustomWidgetToolbarButton.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-custom-widget-toolbar-button',
                template: "<a mat-button>\n  {{ widgetType}}\n  <i class=\"material-icons\"(click)=\"remove()\">remove_circle_outline</i>\n</a>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute !important;margin-left:5px !important;z-index:5}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderCustomWidgetToolbarButton.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderCustomWidgetToolbarButton.propDecorators = {
    widgetType: [{ type: Input }],
    position: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.widgetType;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.position;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.widgetIcon;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.widgetLabel;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.customWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetToolbarButton.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQVM5RTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8seUNBQXlDOzs7Ozs7SUFZcEQsWUFDVSxRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQVIzQyxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQVUxQixDQUFDOzs7Ozs7O0lBT0QsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaURBQWlEO2dCQUMzRCxvSUFBZ0Q7Z0JBRWhELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFUTyx1QkFBdUI7Ozt5QkFlNUIsS0FBSzt1QkFDTCxLQUFLOzs7O0lBRE4sK0RBQTRCOztJQUM1Qiw2REFBMEI7O0lBQzFCLCtEQUFtQjs7SUFDbkIsZ0VBQW9COztJQUNwQixrRUFBMEI7Ozs7O0lBUXhCLDZEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge2FqZldpZGdldFR5cGVTdHJpbmdUb0ljb24sIGFqZldpZGdldFR5cGVTdHJpbmdUb0xhYmVsfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWN1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJ2N1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydjdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciBmaWVsZCB0b29sYmFyIGJ1dHRvblxuICogQGltcGxlbWVudHMgOiBPbkluaXRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9uIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgd2lkZ2V0VHlwZTogc3RyaW5nO1xuICBASW5wdXQoKSBwb3NpdGlvbjogbnVtYmVyO1xuICB3aWRnZXRJY29uOiBzdHJpbmc7XG4gIHdpZGdldExhYmVsOiBzdHJpbmc7XG4gIGN1c3RvbVdpZGdldHM6IGFueVtdID0gW107XG5cbiAgLy8gey4uLnQsIGRyb3Bab25lczogWydoZWFkZXInLCdjb250ZW50JywnZm9vdGVyJywnY29sdW1uJywnd2lkZ2V0J119XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGljb24gcmVnaXN0cnlcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIGNhbGwgYSBzZXJ2aWNlIG1ldGhvZCBmb3IgcmVtb3ZlIGN1c3RvbSB3aWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9uXG4gICAqL1xuICByZW1vdmUoKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmUoJ2N1c3RvbVdpZGdldHMnLCB0aGlzLnBvc2l0aW9uKTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBpbml0ICBmaWVsZEljb24gYW5kIGZpZWxkTGFiZWxcbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMud2lkZ2V0SWNvbiA9IGFqZldpZGdldFR5cGVTdHJpbmdUb0ljb24odGhpcy53aWRnZXRUeXBlKTtcbiAgICB0aGlzLndpZGdldExhYmVsID0gYWpmV2lkZ2V0VHlwZVN0cmluZ1RvTGFiZWwodGhpcy53aWRnZXRUeXBlKTtcbiAgfVxufVxuIl19