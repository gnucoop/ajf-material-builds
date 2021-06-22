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
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfReportRenderer } from './report';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import { AjfColumnWidgetComponent, AjfLayoutWidgetComponent, AjfReportWidget, } from './widget';
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0cy9yZXBvcnRzLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixJQUFJLFVBQVUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHdCQUF3QixFQUN4QixlQUFlLEdBQ2hCLE1BQU0sVUFBVSxDQUFDO0FBa0NsQixNQUFNLE9BQU8sZ0JBQWdCOzs7WUFoQzVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCxlQUFlO29CQUNmLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixZQUFZO29CQUNaLFVBQVU7b0JBQ1YsZUFBZTtpQkFDaEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHVCQUF1QjtvQkFDdkIsd0JBQXdCO29CQUN4Qix5QkFBeUI7b0JBQ3pCLGdDQUFnQztvQkFDaEMsdUJBQXVCO29CQUN2Qix3QkFBd0I7b0JBQ3hCLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUMzQixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsdUJBQXVCO29CQUN2QixzQkFBc0I7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxpQkFBaUI7b0JBQ2pCLGVBQWU7aUJBQ2hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hhcnRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jaGFydCc7XG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FqZk1hcE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL21hcCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3BhZ2UtYnJlYWsnO1xuaW1wb3J0IHtBamZSZXBvcnRzTW9kdWxlIGFzIENvcmVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7QWpmVGFibGVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlRleHRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90ZXh0JztcbmltcG9ydCB7QWpmSW1hZ2VNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvaW1hZ2UnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtBamZDaGFydFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2Zvcm11bGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0UmVuZGVyZXJ9IGZyb20gJy4vcmVwb3J0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGV4dFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LXdpZGdldCc7XG5pbXBvcnQge1xuICBBamZDb2x1bW5XaWRnZXRDb21wb25lbnQsXG4gIEFqZkxheW91dFdpZGdldENvbXBvbmVudCxcbiAgQWpmUmVwb3J0V2lkZ2V0LFxufSBmcm9tICcuL3dpZGdldCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZDaGFydE1vZHVsZSxcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmSW1hZ2VNb2R1bGUsXG4gICAgQWpmTWFwTW9kdWxlLFxuICAgIEFqZlBhZ2VCcmVha01vZHVsZSxcbiAgICBBamZUYWJsZU1vZHVsZSxcbiAgICBBamZUZXh0TW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb3JlTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmQ2hhcnRXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkZvcm11bGFXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSW1hZ2VXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZk1hcFdpZGdldENvbXBvbmVudCxcbiAgICBBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmUmVwb3J0UmVuZGVyZXIsXG4gICAgQWpmUmVwb3J0V2lkZ2V0LFxuICAgIEFqZlRhYmxlV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlRleHRXaWRnZXRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZSZXBvcnRSZW5kZXJlcixcbiAgICBBamZSZXBvcnRXaWRnZXQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydHNNb2R1bGUge1xufVxuIl19