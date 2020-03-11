/**
 * @fileoverview added by tsickle
 * Generated from: src/material/reports/widget.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydHMvd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxlQUFlLElBQUksYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xGLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUM3RSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBU3JELE1BQU0sT0FBTyxlQUFnQixTQUFRLGFBQWE7Ozs7O0lBQ2hELFlBQVksR0FBNkIsRUFBRSxRQUFtQjtRQUM1RCxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBR3ZCLGVBQVUsR0FBRztZQUNYLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDO1lBQzdELENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLDJCQUEyQixFQUFDO1lBQ25FLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO1lBQzNELENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO1lBQ3pELENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO1lBQzNELENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO1lBQzNELENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFDO1lBQ3ZELENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDO1lBQzdELENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHlCQUF5QixFQUFDO1lBQy9ELENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLGdDQUFnQyxFQUFDO1NBQzlFLENBQUM7SUFiRixDQUFDOzs7WUFWRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLHlEQUEwQjtnQkFFMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQXBCZ0Msd0JBQXdCO1lBQWEsU0FBUzs7OztJQTBCN0UscUNBV0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUmVwb3J0V2lkZ2V0IGFzIENvcmVDb21wb25lbnQsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50LCBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZDaGFydFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY29sdW1uLXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZm9ybXVsYS13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2xheW91dC13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWJyZWFrLXdpZGdldCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGV4dC13aWRnZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRXaWRnZXQgZXh0ZW5kcyBDb3JlQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihjZnIsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIHdpZGdldHNNYXAgPSB7XG4gICAgW0FqZldpZGdldFR5cGUuTGF5b3V0XToge2NvbXBvbmVudDogQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5QYWdlQnJlYWtdOiB7Y29tcG9uZW50OiBBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLkltYWdlXToge2NvbXBvbmVudDogQWpmSW1hZ2VXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLlRleHRdOiB7Y29tcG9uZW50OiBBamZUZXh0V2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5DaGFydF06IHtjb21wb25lbnQ6IEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5UYWJsZV06IHtjb21wb25lbnQ6IEFqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5NYXBdOiB7Y29tcG9uZW50OiBBamZNYXBXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLkNvbHVtbl06IHtjb21wb25lbnQ6IEFqZkNvbHVtbldpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuRm9ybXVsYV06IHtjb21wb25lbnQ6IEFqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLkltYWdlQ29udGFpbmVyXToge2NvbXBvbmVudDogQWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnR9LFxuICB9O1xufVxuIl19