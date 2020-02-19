/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/custom-widget-toolbar-button.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQVM5RTs7O0dBR0c7QUFDSCxNQUFNLE9BQU8seUNBQXlDOzs7Ozs7SUFZcEQsWUFDVSxRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQVIzQyxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQVUxQixDQUFDOzs7Ozs7O0lBT0QsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaURBQWlEO2dCQUMzRCxvSUFBZ0Q7Z0JBRWhELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFUTyx1QkFBdUI7Ozt5QkFlNUIsS0FBSzt1QkFDTCxLQUFLOzs7O0lBRE4sK0RBQTRCOztJQUM1Qiw2REFBMEI7O0lBQzFCLCtEQUFtQjs7SUFDbkIsZ0VBQW9COztJQUNwQixrRUFBMEI7Ozs7O0lBUXhCLDZEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7YWpmV2lkZ2V0VHlwZVN0cmluZ1RvSWNvbiwgYWpmV2lkZ2V0VHlwZVN0cmluZ1RvTGFiZWx9IGZyb20gJy4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2N1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24uY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIGZpZWxkIHRvb2xiYXIgYnV0dG9uXG4gKiBAaW1wbGVtZW50cyA6IE9uSW5pdFxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldFRvb2xiYXJCdXR0b24gaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB3aWRnZXRUeXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBudW1iZXI7XG4gIHdpZGdldEljb246IHN0cmluZztcbiAgd2lkZ2V0TGFiZWw6IHN0cmluZztcbiAgY3VzdG9tV2lkZ2V0czogYW55W10gPSBbXTtcblxuICAvLyB7Li4udCwgZHJvcFpvbmVzOiBbJ2hlYWRlcicsJ2NvbnRlbnQnLCdmb290ZXInLCdjb2x1bW4nLCd3aWRnZXQnXX1cblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgaWNvbiByZWdpc3RyeVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgKSB7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgY2FsbCBhIHNlcnZpY2UgbWV0aG9kIGZvciByZW1vdmUgY3VzdG9tIHdpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldFRvb2xiYXJCdXR0b25cbiAgICovXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSgnY3VzdG9tV2lkZ2V0cycsIHRoaXMucG9zaXRpb24pO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGluaXQgIGZpZWxkSWNvbiBhbmQgZmllbGRMYWJlbFxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy53aWRnZXRJY29uID0gYWpmV2lkZ2V0VHlwZVN0cmluZ1RvSWNvbih0aGlzLndpZGdldFR5cGUpO1xuICAgIHRoaXMud2lkZ2V0TGFiZWwgPSBhamZXaWRnZXRUeXBlU3RyaW5nVG9MYWJlbCh0aGlzLndpZGdldFR5cGUpO1xuICB9XG59XG4iXX0=