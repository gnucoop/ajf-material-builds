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
import { AjfReportWidget as CoreComponent, AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Renderer2, ViewEncapsulation } from '@angular/core';
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
let AjfReportWidget = /** @class */ (() => {
    let AjfReportWidget = class AjfReportWidget extends CoreComponent {
        constructor(cfr, renderer) {
            super(cfr, renderer);
            this.widgetsMap = {
                [AjfWidgetType.Layout]: { component: AjfLayoutWidgetComponent },
                [AjfWidgetType.PageBreak]: { component: AjfPageBreakWidgetComponent },
                [AjfWidgetType.Image]: { component: AjfImageWidgetComponent },
                [AjfWidgetType.Text]: { component: AjfTextWidgetComponent },
                [AjfWidgetType.Chart]: { component: AjfChartWidgetComponent },
                [AjfWidgetType.Table]: { component: AjfTableWidgetComponent },
                [AjfWidgetType.DynamicTable]: { component: AjfTableWidgetComponent },
                [AjfWidgetType.Map]: { component: AjfMapWidgetComponent },
                [AjfWidgetType.Column]: { component: AjfColumnWidgetComponent },
                [AjfWidgetType.Formula]: { component: AjfFormulaWidgetComponent },
                [AjfWidgetType.ImageContainer]: { component: AjfImageContainerWidgetComponent },
            };
        }
    };
    AjfReportWidget = __decorate([
        Component({
            selector: 'ajf-widget',
            template: "<ng-template ajf-widget-host></ng-template>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"]
        }),
        __metadata("design:paramtypes", [ComponentFactoryResolver, Renderer2])
    ], AjfReportWidget);
    return AjfReportWidget;
})();
export { AjfReportWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydHMvd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsZUFBZSxJQUFJLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBU3JEO0lBQUEsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxhQUFhO1FBQ2hELFlBQVksR0FBNkIsRUFBRSxRQUFtQjtZQUM1RCxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBR3ZCLGVBQVUsR0FBRztnQkFDWCxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLFNBQVMsRUFBRSx3QkFBd0IsRUFBQztnQkFDN0QsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUUsMkJBQTJCLEVBQUM7Z0JBQ25FLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO2dCQUMzRCxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLFNBQVMsRUFBRSxzQkFBc0IsRUFBQztnQkFDekQsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUUsdUJBQXVCLEVBQUM7Z0JBQzNELENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFDO2dCQUMzRCxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFDLFNBQVMsRUFBRSx1QkFBdUIsRUFBQztnQkFDbEUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUM7Z0JBQ3ZELENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDO2dCQUM3RCxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLFNBQVMsRUFBRSx5QkFBeUIsRUFBQztnQkFDL0QsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUUsZ0NBQWdDLEVBQUM7YUFDOUUsQ0FBQztRQWRGLENBQUM7S0FlRixDQUFBO0lBbEJZLGVBQWU7UUFQM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIseURBQTBCO1lBRTFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO3lDQUVpQix3QkFBd0IsRUFBWSxTQUFTO09BRG5ELGVBQWUsQ0FrQjNCO0lBQUQsc0JBQUM7S0FBQTtTQWxCWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlJlcG9ydFdpZGdldCBhcyBDb3JlQ29tcG9uZW50LCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NvbHVtbi13aWRnZXQnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2Zvcm11bGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLXdpZGdldCc7XG5pbXBvcnQge0FqZkxheW91dFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9sYXlvdXQtd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vcGFnZS1icmVhay13aWRnZXQnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RleHQtd2lkZ2V0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXdpZGdldCcsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0V2lkZ2V0IGV4dGVuZHMgQ29yZUNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIoY2ZyLCByZW5kZXJlcik7XG4gIH1cblxuICB3aWRnZXRzTWFwID0ge1xuICAgIFtBamZXaWRnZXRUeXBlLkxheW91dF06IHtjb21wb25lbnQ6IEFqZkxheW91dFdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuUGFnZUJyZWFrXToge2NvbXBvbmVudDogQWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5JbWFnZV06IHtjb21wb25lbnQ6IEFqZkltYWdlV2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5UZXh0XToge2NvbXBvbmVudDogQWpmVGV4dFdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuQ2hhcnRdOiB7Y29tcG9uZW50OiBBamZDaGFydFdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuVGFibGVdOiB7Y29tcG9uZW50OiBBamZUYWJsZVdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuRHluYW1pY1RhYmxlXToge2NvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnR9LFxuICAgIFtBamZXaWRnZXRUeXBlLk1hcF06IHtjb21wb25lbnQ6IEFqZk1hcFdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuQ29sdW1uXToge2NvbXBvbmVudDogQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50fSxcbiAgICBbQWpmV2lkZ2V0VHlwZS5Gb3JtdWxhXToge2NvbXBvbmVudDogQWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0sXG4gICAgW0FqZldpZGdldFR5cGUuSW1hZ2VDb250YWluZXJdOiB7Y29tcG9uZW50OiBBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH0sXG4gIH07XG59XG4iXX0=