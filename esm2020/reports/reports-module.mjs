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
import { AjfGraphModule } from '@ajf/core/graph';
import { AjfHeatMapModule } from '@ajf/core/heat-map';
import { AjfMapModule } from '@ajf/core/map';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { AjfReportsModule as CoreModule } from '@ajf/core/reports';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { AjfFormsModule } from '@ajf/material/forms';
import { AjfImageModule } from '@ajf/material/image';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfFilterWidgetComponent } from './filter-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfHeatMapWidgetComponent } from './heat-map-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfReportRenderer } from './report';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import { AjfColumnWidgetComponent, AjfDialogWidgetComponent, AjfLayoutWidgetComponent, AjfPaginatedListWidgetComponent, AjfPaginatedTableWidgetComponent, AjfReportWidget, } from './widget';
import { AjfGraphWidgetComponent } from './graph-widget';
import * as i0 from "@angular/core";
export class AjfReportsModule {
}
AjfReportsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, declarations: [AjfChartWidgetComponent,
        AjfColumnWidgetComponent,
        AjfDialogWidgetComponent,
        AjfFilterWidgetComponent,
        AjfFormulaWidgetComponent,
        AjfHeatMapWidgetComponent,
        AjfImageContainerWidgetComponent,
        AjfImageWidgetComponent,
        AjfGraphWidgetComponent,
        AjfLayoutWidgetComponent,
        AjfMapWidgetComponent,
        AjfPageBreakWidgetComponent,
        AjfPaginatedListWidgetComponent,
        AjfPaginatedTableWidgetComponent,
        AjfReportRenderer,
        AjfReportWidget,
        AjfTableWidgetComponent,
        AjfTextWidgetComponent], imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfFormsModule,
        AjfGraphModule,
        AjfHeatMapModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfTranslocoModule,
        CommonModule,
        CoreModule,
        MatDialogModule,
        MatSelectModule], exports: [AjfReportRenderer, AjfReportWidget] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfFormsModule,
        AjfGraphModule,
        AjfHeatMapModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfTranslocoModule,
        CommonModule,
        CoreModule,
        MatDialogModule,
        MatSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfChartModule,
                        AjfCommonModule,
                        AjfImageModule,
                        AjfFormsModule,
                        AjfGraphModule,
                        AjfHeatMapModule,
                        AjfMapModule,
                        AjfPageBreakModule,
                        AjfTableModule,
                        AjfTextModule,
                        AjfTranslocoModule,
                        CommonModule,
                        CoreModule,
                        MatDialogModule,
                        MatSelectModule,
                    ],
                    declarations: [
                        AjfChartWidgetComponent,
                        AjfColumnWidgetComponent,
                        AjfDialogWidgetComponent,
                        AjfFilterWidgetComponent,
                        AjfFormulaWidgetComponent,
                        AjfHeatMapWidgetComponent,
                        AjfImageContainerWidgetComponent,
                        AjfImageWidgetComponent,
                        AjfGraphWidgetComponent,
                        AjfLayoutWidgetComponent,
                        AjfMapWidgetComponent,
                        AjfPageBreakWidgetComponent,
                        AjfPaginatedListWidgetComponent,
                        AjfPaginatedTableWidgetComponent,
                        AjfReportRenderer,
                        AjfReportWidget,
                        AjfTableWidgetComponent,
                        AjfTextWidgetComponent,
                    ],
                    exports: [AjfReportRenderer, AjfReportWidget],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9yZXBvcnRzLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxnQkFBZ0IsSUFBSSxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxPQUFPLEVBQUMs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RUFBRSxlQUFlLENBQUM7aUJBQzlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNoYXJ0TW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY2hhcnQnO1xuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBamZHcmFwaE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2dyYXBoJztcbmltcG9ydCB7QWpmSGVhdE1hcE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2hlYXQtbWFwJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmUGFnZUJyZWFrTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvcGFnZS1icmVhayc7XG5pbXBvcnQge0FqZlJlcG9ydHNNb2R1bGUgYXMgQ29yZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtBamZUYWJsZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVGV4dE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RleHQnO1xuaW1wb3J0IHtBamZUcmFuc2xvY29Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtBamZGb3Jtc01vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9mb3Jtcyc7XG5pbXBvcnQge0FqZkltYWdlTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2ltYWdlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuXG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkZpbHRlcldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9maWx0ZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkhlYXRNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaGVhdC1tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0UmVuZGVyZXJ9IGZyb20gJy4vcmVwb3J0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGV4dFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LXdpZGdldCc7XG5pbXBvcnQge1xuICBBamZDb2x1bW5XaWRnZXRDb21wb25lbnQsXG4gIEFqZkRpYWxvZ1dpZGdldENvbXBvbmVudCxcbiAgQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50LFxuICBBamZQYWdpbmF0ZWRMaXN0V2lkZ2V0Q29tcG9uZW50LFxuICBBamZQYWdpbmF0ZWRUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgQWpmUmVwb3J0V2lkZ2V0LFxufSBmcm9tICcuL3dpZGdldCc7XG5pbXBvcnQge0FqZkdyYXBoV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2dyYXBoLXdpZGdldCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZDaGFydE1vZHVsZSxcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmSW1hZ2VNb2R1bGUsXG4gICAgQWpmRm9ybXNNb2R1bGUsXG4gICAgQWpmR3JhcGhNb2R1bGUsXG4gICAgQWpmSGVhdE1hcE1vZHVsZSxcbiAgICBBamZNYXBNb2R1bGUsXG4gICAgQWpmUGFnZUJyZWFrTW9kdWxlLFxuICAgIEFqZlRhYmxlTW9kdWxlLFxuICAgIEFqZlRleHRNb2R1bGUsXG4gICAgQWpmVHJhbnNsb2NvTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb3JlTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkNvbHVtbldpZGdldENvbXBvbmVudCxcbiAgICBBamZEaWFsb2dXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmRmlsdGVyV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZkZvcm11bGFXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmSGVhdE1hcFdpZGdldENvbXBvbmVudCxcbiAgICBBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudCxcbiAgICBBamZJbWFnZVdpZGdldENvbXBvbmVudCxcbiAgICBBamZHcmFwaFdpZGdldENvbXBvbmVudCxcbiAgICBBamZMYXlvdXRXaWRnZXRDb21wb25lbnQsXG4gICAgQWpmTWFwV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudCxcbiAgICBBamZQYWdpbmF0ZWRMaXN0V2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlBhZ2luYXRlZFRhYmxlV2lkZ2V0Q29tcG9uZW50LFxuICAgIEFqZlJlcG9ydFJlbmRlcmVyLFxuICAgIEFqZlJlcG9ydFdpZGdldCxcbiAgICBBamZUYWJsZVdpZGdldENvbXBvbmVudCxcbiAgICBBamZUZXh0V2lkZ2V0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbQWpmUmVwb3J0UmVuZGVyZXIsIEFqZlJlcG9ydFdpZGdldF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydHNNb2R1bGUge31cbiJdfQ==