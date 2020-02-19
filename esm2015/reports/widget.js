/**
 * @fileoverview added by tsickle
 * Generated from: src/material/reports/widget.ts
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
import { AjfReportWidget as CoreComponent, AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ComponentFactoryResolver, Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfColumnWidgetComponent } from './column-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfLayoutWidgetComponent } from './layout-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
export class AjfReportWidget extends CoreComponent {
    /**
     * @param {?} cfr
     * @param {?} renderer
     */
    constructor(cfr, renderer) {
        super(cfr, renderer);
        this.widgetsMap = {
            [AjfWidgetType.Layout]: { component: AjfLayoutWidgetComponent },
            [AjfWidgetType.PageBreak]: { component: AjfPageBreakWidgetComponent },
            [AjfWidgetType.Image]: { component: AjfImageWidgetComponent },
            [AjfWidgetType.Text]: { component: AjfTextWidgetComponent },
            [AjfWidgetType.Chart]: { component: AjfChartWidgetComponent },
            [AjfWidgetType.Table]: { component: AjfTableWidgetComponent },
            [AjfWidgetType.Map]: { component: AjfMapWidgetComponent },
            [AjfWidgetType.Column]: { component: AjfColumnWidgetComponent },
            [AjfWidgetType.Formula]: { component: AjfFormulaWidgetComponent },
            [AjfWidgetType.ImageContainer]: { component: AjfImageContainerWidgetComponent },
        };
    }
}
AjfReportWidget.decorators = [
    { type: Component, args: [{
                selector: 'ajf-widget',
                template: "<ng-template ajf-widget-host></ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"]
            }] }
];
/** @nocollapse */
AjfReportWidget.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    AjfReportWidget.prototype.widgetsMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydHMvd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxlQUFlLElBQUksYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUM3RSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBU3JELE1BQU0sT0FBTyxlQUFnQixTQUFRLGFBQWE7Ozs7O0lBQ2hELFlBQVksR0FBNkIsRUFBRSxRQUFtQjtRQUM1RCxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBR3ZCLGVBQVUsR0FBRztZQUNYLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDO1lBQzdELENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLDJCQUEyQixFQUFDO1lBQ25FLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO1lBQzNELENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO1lBQ3pELENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO1lBQzNELENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO1lBQzNELENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFDO1lBQ3ZELENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDO1lBQzdELENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFDO1lBQy9ELENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLGdDQUFnQyxFQUFDO1NBQzlFLENBQUM7SUFiRixDQUFDOzs7WUFWRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLHlEQUEwQjtnQkFFMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQXBCZ0Msd0JBQXdCO1lBQWEsU0FBUzs7OztJQTBCN0UscUNBV0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZSZXBvcnRXaWRnZXQgYXMgQ29yZUNvbXBvbmVudCwgQWpmV2lkZ2V0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnQsIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkNvbHVtbldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4td2lkZ2V0JztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtBamZMYXlvdXRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0LXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGV4dFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LXdpZGdldCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydFdpZGdldCBleHRlbmRzIENvcmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHN1cGVyKGNmciwgcmVuZGVyZXIpO1xuICB9XG5cbiAgd2lkZ2V0c01hcCA9IHtcbiAgICBbQWpmV2lkZ2V0VHlwZS5MYXlvdXRdOiB7Y29tcG9uZW50OiBBamZMYXlvdXRXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLlBhZ2VCcmVha106IHtjb21wb25lbnQ6IEFqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuSW1hZ2VdOiB7Y29tcG9uZW50OiBBamZJbWFnZVdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuVGV4dF06IHtjb21wb25lbnQ6IEFqZlRleHRXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLkNoYXJ0XToge2NvbXBvbmVudDogQWpmQ2hhcnRXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLlRhYmxlXToge2NvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLk1hcF06IHtjb21wb25lbnQ6IEFqZk1hcFdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuQ29sdW1uXToge2NvbXBvbmVudDogQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5Gb3JtdWxhXToge2NvbXBvbmVudDogQWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuSW1hZ2VDb250YWluZXJdOiB7Y29tcG9uZW50OiBBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gIH07XG59XG4iXX0=