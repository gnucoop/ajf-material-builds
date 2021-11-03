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
import { AjfReportsModule as CoreModule } from '@ajf/core/reports';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { AjfImageModule } from '@ajf/material/image';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfReportRenderer } from './report';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import { AjfColumnWidgetComponent, AjfLayoutWidgetComponent, AjfReportWidget } from './widget';
import * as i0 from "@angular/core";
export class AjfReportsModule {
}
AjfReportsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfReportsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfReportsModule, declarations: [AjfChartWidgetComponent,
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
        AjfTextWidgetComponent], imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        CommonModule,
        CoreModule,
        AjfTranslocoModule], exports: [AjfReportRenderer, AjfReportWidget] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfReportsModule, imports: [[
            AjfChartModule,
            AjfCommonModule,
            AjfImageModule,
            AjfMapModule,
            AjfPageBreakModule,
            AjfTableModule,
            AjfTextModule,
            CommonModule,
            CoreModule,
            AjfTranslocoModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
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
                        AjfTranslocoModule,
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
                    exports: [AjfReportRenderer, AjfReportWidget],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0cy9yZXBvcnRzLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixJQUFJLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzFFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBK0I3RixNQUFNLE9BQU8sZ0JBQWdCOztrSEFBaEIsZ0JBQWdCO21IQUFoQixnQkFBZ0IsaUJBZnpCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLGdDQUFnQztRQUNoQyx1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFDM0IsaUJBQWlCO1FBQ2pCLGVBQWU7UUFDZix1QkFBdUI7UUFDdkIsc0JBQXNCLGFBdkJ0QixjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWM7UUFDZCxZQUFZO1FBQ1osa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxhQUFhO1FBQ2IsWUFBWTtRQUNaLFVBQVU7UUFDVixrQkFBa0IsYUFnQlYsaUJBQWlCLEVBQUUsZUFBZTttSEFFakMsZ0JBQWdCLFlBNUJsQjtZQUNQLGNBQWM7WUFDZCxlQUFlO1lBQ2YsY0FBYztZQUNkLFlBQVk7WUFDWixrQkFBa0I7WUFDbEIsY0FBYztZQUNkLGFBQWE7WUFDYixZQUFZO1lBQ1osVUFBVTtZQUNWLGtCQUFrQjtTQUNuQjtnR0FpQlUsZ0JBQWdCO2tCQTdCNUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFVBQVU7d0JBQ1Ysa0JBQWtCO3FCQUNuQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osdUJBQXVCO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsZ0NBQWdDO3dCQUNoQyx1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxDQUFDO2lCQUM5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGFydE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NoYXJ0JztcbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmUGFnZUJyZWFrTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvcGFnZS1icmVhayc7XG5pbXBvcnQge0FqZlJlcG9ydHNNb2R1bGUgYXMgQ29yZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtBamZUYWJsZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVGV4dE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RleHQnO1xuaW1wb3J0IHtBamZUcmFuc2xvY29Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtBamZJbWFnZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9pbWFnZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZm9ybXVsYS13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vcGFnZS1icmVhay13aWRnZXQnO1xuaW1wb3J0IHtBamZSZXBvcnRSZW5kZXJlcn0gZnJvbSAnLi9yZXBvcnQnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RleHQtd2lkZ2V0JztcbmltcG9ydCB7QWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50LCBBamZMYXlvdXRXaWRnZXRDb21wb25lbnQsIEFqZlJlcG9ydFdpZGdldH0gZnJvbSAnLi93aWRnZXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWpmQ2hhcnRNb2R1bGUsXG4gICAgQWpmQ29tbW9uTW9kdWxlLFxuICAgIEFqZkltYWdlTW9kdWxlLFxuICAgIEFqZk1hcE1vZHVsZSxcbiAgICBBamZQYWdlQnJlYWtNb2R1bGUsXG4gICAgQWpmVGFibGVNb2R1bGUsXG4gICAgQWpmVGV4dE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29yZU1vZHVsZSxcbiAgICBBamZUcmFuc2xvY29Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkNvbHVtbldpZGdldENvbXBvbmVudCxcbiAgICBBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkltYWdlV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkxheW91dFdpZGdldENvbXBvbmVudCxcbiAgICBBamZNYXBXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlJlcG9ydFJlbmRlcmVyLFxuICAgIEFqZlJlcG9ydFdpZGdldCxcbiAgICBBamZUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgICBBamZUZXh0V2lkZ2V0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbQWpmUmVwb3J0UmVuZGVyZXIsIEFqZlJlcG9ydFdpZGdldF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydHNNb2R1bGUge31cbiJdfQ==