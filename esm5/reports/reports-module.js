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
var AjfReportsModule = /** @class */ (function () {
    function AjfReportsModule() {
    }
    AjfReportsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                        CoreModule,
                        AjfChartModule,
                        AjfCommonModule,
                        AjfImageModule,
                        AjfMapModule,
                        AjfPageBreakModule,
                        AjfTableModule,
                        AjfTextModule,
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
                },] }
    ];
    return AjfReportsModule;
}());
export { AjfReportsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0cy9yZXBvcnRzLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixJQUFJLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXpDO0lBQUE7SUFpQ0EsQ0FBQzs7Z0JBakNBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLFVBQVU7d0JBQ1YsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osdUJBQXVCO3dCQUN2Qix3QkFBd0I7d0JBQ3hCLHlCQUF5Qjt3QkFDekIsZ0NBQWdDO3dCQUNoQyx1QkFBdUI7d0JBQ3ZCLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQjt3QkFDakIsZUFBZTtxQkFDaEI7aUJBQ0Y7O0lBRUQsdUJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQURZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGFydE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NoYXJ0JztcbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmUGFnZUJyZWFrTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvcGFnZS1icmVhayc7XG5pbXBvcnQge0FqZlJlcG9ydHNNb2R1bGUgYXMgQ29yZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtBamZUYWJsZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVGV4dE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RleHQnO1xuaW1wb3J0IHtBamZJbWFnZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9pbWFnZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGV9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkNvbHVtbldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jb2x1bW4td2lkZ2V0JztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtBamZMYXlvdXRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0LXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0UmVuZGVyZXJ9IGZyb20gJy4vcmVwb3J0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGV4dFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LXdpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydFdpZGdldH0gZnJvbSAnLi93aWRnZXQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBDb3JlTW9kdWxlLFxuICAgIEFqZkNoYXJ0TW9kdWxlLFxuICAgIEFqZkNvbW1vbk1vZHVsZSxcbiAgICBBamZJbWFnZU1vZHVsZSxcbiAgICBBamZNYXBNb2R1bGUsXG4gICAgQWpmUGFnZUJyZWFrTW9kdWxlLFxuICAgIEFqZlRhYmxlTW9kdWxlLFxuICAgIEFqZlRleHRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkNvbHVtbldpZGdldENvbXBvbmVudCxcbiAgICBBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkltYWdlV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkxheW91dFdpZGdldENvbXBvbmVudCxcbiAgICBBamZNYXBXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlJlcG9ydFJlbmRlcmVyLFxuICAgIEFqZlJlcG9ydFdpZGdldCxcbiAgICBBamZUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgICBBamZUZXh0V2lkZ2V0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmUmVwb3J0UmVuZGVyZXIsXG4gICAgQWpmUmVwb3J0V2lkZ2V0LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRzTW9kdWxlIHtcbn1cbiJdfQ==