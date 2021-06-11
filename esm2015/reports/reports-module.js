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
import { AjfChartModule } from '@ajf/core/chart';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfMapModule } from '@ajf/core/map';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { AJF_DEFAULT_WIDGETS, AjfReportsModule as CoreModule, AjfWidgetType as wt, } from '@ajf/core/reports';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfColumnWidgetComponent } from './column-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfLayoutWidgetComponent } from './layout-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfReportRenderer } from './report';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import { AjfReportWidget } from './widget';
const defaultWidgets = {};
defaultWidgets[wt.Layout] = {
    component: AjfLayoutWidgetComponent
};
defaultWidgets[wt.PageBreak] = {
    component: AjfPageBreakWidgetComponent
};
defaultWidgets[wt.Image] = {
    component: AjfImageWidgetComponent
};
defaultWidgets[wt.Text] = {
    component: AjfTextWidgetComponent
};
defaultWidgets[wt.Chart] = {
    component: AjfChartWidgetComponent
};
defaultWidgets[wt.Table] = {
    component: AjfTableWidgetComponent
};
defaultWidgets[wt.DynamicTable] = {
    component: AjfTableWidgetComponent
};
defaultWidgets[wt.Map] = {
    component: AjfMapWidgetComponent
};
defaultWidgets[wt.Column] = {
    component: AjfColumnWidgetComponent
};
defaultWidgets[wt.Formula] = {
    component: AjfFormulaWidgetComponent
};
defaultWidgets[wt.ImageContainer] = {
    component: AjfImageContainerWidgetComponent
};
const ɵ0 = defaultWidgets;
export class AjfReportsModule {
}
AjfReportsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfChartModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfMapModule,
                    AjfPageBreakModule,
                    AjfTableModule,
                    AjfTextModule,
                    CommonModule,
                    CoreModule,
                    TranslateModule,
                ],
                declarations: [
                    AjfChartWidgetComponent,
                    AjfColumnWidgetComponent,
                    AjfFormulaWidgetComponent,
                    AjfImageContainerWidgetComponent,
                    AjfImageWidgetComponent,
                    AjfLayoutWidgetComponent,
                    AjfMapWidgetComponent,
                    AjfPageBreakWidgetComponent,
                    AjfReportRenderer,
                    AjfReportWidget,
                    AjfTableWidgetComponent,
                    AjfTextWidgetComponent,
                ],
                exports: [
                    AjfReportRenderer,
                    AjfReportWidget,
                ],
                providers: [
                    { provide: AJF_DEFAULT_WIDGETS, useValue: ɵ0 },
                ],
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0cy9yZXBvcnRzLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixnQkFBZ0IsSUFBSSxVQUFVLEVBRTlCLGFBQWEsSUFBSSxFQUFFLEdBQ3BCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzFFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFekMsTUFBTSxjQUFjLEdBQUcsRUFBNEIsQ0FBQztBQUNwRCxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0lBQzFCLFNBQVMsRUFBRSx3QkFBd0I7Q0FDcEMsQ0FBQztBQUNGLGNBQWMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUc7SUFDN0IsU0FBUyxFQUFFLDJCQUEyQjtDQUN2QyxDQUFDO0FBQ0YsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRztJQUN6QixTQUFTLEVBQUUsdUJBQXVCO0NBQ25DLENBQUM7QUFDRixjQUFjLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHO0lBQ3hCLFNBQVMsRUFBRSxzQkFBc0I7Q0FDbEMsQ0FBQztBQUNGLGNBQWMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUc7SUFDekIsU0FBUyxFQUFFLHVCQUF1QjtDQUNuQyxDQUFDO0FBQ0YsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRztJQUN6QixTQUFTLEVBQUUsdUJBQXVCO0NBQ25DLENBQUM7QUFDRixjQUFjLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHO0lBQ2hDLFNBQVMsRUFBRSx1QkFBdUI7Q0FDbkMsQ0FBQztBQUNGLGNBQWMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUc7SUFDdkIsU0FBUyxFQUFFLHFCQUFxQjtDQUNqQyxDQUFDO0FBQ0YsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRztJQUMxQixTQUFTLEVBQUUsd0JBQXdCO0NBQ3BDLENBQUM7QUFDRixjQUFjLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHO0lBQzNCLFNBQVMsRUFBRSx5QkFBeUI7Q0FDckMsQ0FBQztBQUNGLGNBQWMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUc7SUFDbEMsU0FBUyxFQUFFLGdDQUFnQztDQUM1QyxDQUFDO1dBa0MyQyxjQUFjO0FBRzNELE1BQU0sT0FBTyxnQkFBZ0I7OztZQW5DNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxjQUFjO29CQUNkLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxZQUFZO29CQUNaLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxhQUFhO29CQUNiLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixlQUFlO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsZ0NBQWdDO29CQUNoQyx1QkFBdUI7b0JBQ3ZCLHdCQUF3QjtvQkFDeEIscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBQzNCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGlCQUFpQjtvQkFDakIsZUFBZTtpQkFDaEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsSUFBZ0IsRUFBQztpQkFDekQ7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGFydE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NoYXJ0JztcbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmUGFnZUJyZWFrTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvcGFnZS1icmVhayc7XG5pbXBvcnQge1xuICBBSkZfREVGQVVMVF9XSURHRVRTLFxuICBBamZSZXBvcnRzTW9kdWxlIGFzIENvcmVNb2R1bGUsXG4gIEFqZldpZGdldENvbXBvbmVudHNNYXAsXG4gIEFqZldpZGdldFR5cGUgYXMgd3QsXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7QWpmVGFibGVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlRleHRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90ZXh0JztcbmltcG9ydCB7QWpmSW1hZ2VNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvaW1hZ2UnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtBamZDaGFydFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY29sdW1uLXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZm9ybXVsYS13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2xheW91dC13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWJyZWFrLXdpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydFJlbmRlcmVyfSBmcm9tICcuL3JlcG9ydCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGV4dC13aWRnZXQnO1xuaW1wb3J0IHtBamZSZXBvcnRXaWRnZXR9IGZyb20gJy4vd2lkZ2V0JztcblxuY29uc3QgZGVmYXVsdFdpZGdldHMgPSB7fSBhcyBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuZGVmYXVsdFdpZGdldHNbd3QuTGF5b3V0XSA9IHtcbiAgY29tcG9uZW50OiBBamZMYXlvdXRXaWRnZXRDb21wb25lbnRcbn07XG5kZWZhdWx0V2lkZ2V0c1t3dC5QYWdlQnJlYWtdID0ge1xuICBjb21wb25lbnQ6IEFqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudFxufTtcbmRlZmF1bHRXaWRnZXRzW3d0LkltYWdlXSA9IHtcbiAgY29tcG9uZW50OiBBamZJbWFnZVdpZGdldENvbXBvbmVudFxufTtcbmRlZmF1bHRXaWRnZXRzW3d0LlRleHRdID0ge1xuICBjb21wb25lbnQ6IEFqZlRleHRXaWRnZXRDb21wb25lbnRcbn07XG5kZWZhdWx0V2lkZ2V0c1t3dC5DaGFydF0gPSB7XG4gIGNvbXBvbmVudDogQWpmQ2hhcnRXaWRnZXRDb21wb25lbnRcbn07XG5kZWZhdWx0V2lkZ2V0c1t3dC5UYWJsZV0gPSB7XG4gIGNvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnRcbn07XG5kZWZhdWx0V2lkZ2V0c1t3dC5EeW5hbWljVGFibGVdID0ge1xuICBjb21wb25lbnQ6IEFqZlRhYmxlV2lkZ2V0Q29tcG9uZW50XG59O1xuZGVmYXVsdFdpZGdldHNbd3QuTWFwXSA9IHtcbiAgY29tcG9uZW50OiBBamZNYXBXaWRnZXRDb21wb25lbnRcbn07XG5kZWZhdWx0V2lkZ2V0c1t3dC5Db2x1bW5dID0ge1xuICBjb21wb25lbnQ6IEFqZkNvbHVtbldpZGdldENvbXBvbmVudFxufTtcbmRlZmF1bHRXaWRnZXRzW3d0LkZvcm11bGFdID0ge1xuICBjb21wb25lbnQ6IEFqZkZvcm11bGFXaWRnZXRDb21wb25lbnRcbn07XG5kZWZhdWx0V2lkZ2V0c1t3dC5JbWFnZUNvbnRhaW5lcl0gPSB7XG4gIGNvbXBvbmVudDogQWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnRcbn07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZDaGFydE1vZHVsZSxcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmSW1hZ2VNb2R1bGUsXG4gICAgQWpmTWFwTW9kdWxlLFxuICAgIEFqZlBhZ2VCcmVha01vZHVsZSxcbiAgICBBamZUYWJsZU1vZHVsZSxcbiAgICBBamZUZXh0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb3JlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmQ2hhcnRXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkZvcm11bGFXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSW1hZ2VXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZk1hcFdpZGdldENvbXBvbmVudCxcbiAgICBBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmUmVwb3J0UmVuZGVyZXIsXG4gICAgQWpmUmVwb3J0V2lkZ2V0LFxuICAgIEFqZlRhYmxlV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlRleHRXaWRnZXRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZSZXBvcnRSZW5kZXJlcixcbiAgICBBamZSZXBvcnRXaWRnZXQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBBSkZfREVGQVVMVF9XSURHRVRTLCB1c2VWYWx1ZTogZGVmYXVsdFdpZGdldHN9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHtcbn1cbiJdfQ==