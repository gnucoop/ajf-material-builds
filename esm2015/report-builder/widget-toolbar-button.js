/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widget-toolbar-button.ts
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
import { ajfReportBuilderWidgetToString } from './utils';
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
export class AjfReportBuilderWidgetToolbarButton {
    constructor() {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.widgetIcon = ajfReportBuilderWidgetToString(this.widgetType);
    }
}
AjfReportBuilderWidgetToolbarButton.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-widget-toolbar-button',
                template: "<button\n  mat-button\n  matTooltip=\"{{ widgetType}}\"\n  [matTooltipPosition]=\"'above'\">\n  <mat-icon\n    fontSet=\"ajf-icon\"\n    fontIcon=\"{{ widgetIcon }}\">\n  </mat-icon>\n</button>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderWidgetToolbarButton.ctorParameters = () => [];
AjfReportBuilderWidgetToolbarButton.propDecorators = {
    widgetType: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderWidgetToolbarButton.prototype.widgetType;
    /** @type {?} */
    AjfReportBuilderWidgetToolbarButton.prototype.widgetIcon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvb2xiYXItYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldC10b29sYmFyLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFTdkQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLG1DQUFtQztJQUk5QztJQUFnQixDQUFDOzs7O0lBQ2pCLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLDhCQUE4QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7WUFsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELCtNQUF5QztnQkFFekMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7Ozs7eUJBTUUsS0FBSzs7OztJQUFOLHlEQUE0Qjs7SUFDNUIseURBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHthamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItd2lkZ2V0LXRvb2xiYXItYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXQtdG9vbGJhci1idXR0b24uaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQtdG9vbGJhci1idXR0b24uY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIGZpZWxkIHRvb2xiYXIgYnV0dG9uXG4gKiBAaW1wbGVtZW50cyA6IE9uSW5pdFxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlcldpZGdldFRvb2xiYXJCdXR0b24gaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB3aWRnZXRUeXBlOiBzdHJpbmc7XG4gIHdpZGdldEljb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLndpZGdldEljb24gPSBhamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9TdHJpbmcodGhpcy53aWRnZXRUeXBlKTtcbiAgfVxufVxuIl19