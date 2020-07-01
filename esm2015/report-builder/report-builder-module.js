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
import { AjfCommonModule } from '@ajf/core/common';
import { AjfMapModule } from '@ajf/core/map';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';
import { AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { AjfReportBuilderColumn } from './column';
import { AjfReportBuilderConditionEditor } from './condition-editor';
import { AjfReportBuilderContent } from './content';
import { AjfReportBuilderCustomWidgetDialog } from './custom-widget-dialog';
import { AjfReportBuilderCustomWidgetToolbarButton } from './custom-widget-toolbar-button';
import { AjfReportBuilderCustomWidgetsToolbar } from './custom-widgets-toolbar';
import { AjfReportBuilderFormsAnalyzer } from './forms-analyzer';
import { AjfReportBuilderFormsAnalyzerDialog } from './forms-analyzer-dialog';
import { AjfImageFilterPipe } from './image-filter';
import { AjfReportBuilderImageGroup } from './image-group';
import { AjfReportBuilderProperties } from './properties';
import { AjfQuillEditor } from './quill-editor';
import { AjfReportBuilderRendererWidget } from './renderer-widget';
import { AjfReportBuilder } from './report-builder';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderThemeColor } from './theme-color';
import { AjfReportBuilderThemeColorDialog } from './theme-color-dialog';
import { AjfReportBuilderToolbar } from './toolbar';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
import { AjfReportBuilderWidgetToolbarButton } from './widget-toolbar-button';
import { AjfReportBuilderWidgetsRowButtons } from './widgets-row-buttons';
import { AjfReportBuilderWidgetsToolbar } from './widgets-toolbar';
export class AjfReportBuilderModule {
}
AjfReportBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfCommonModule, AjfImageModule, AjfMapModule, AjfMonacoEditorModule,
                    AjfTableModule, AjfTextModule, ColorPickerModule, CommonModule,
                    DragDropModule, FormsModule, MatButtonModule, MatButtonToggleModule,
                    MatCardModule, MatDialogModule, MatGridListModule, MatIconModule,
                    MatListModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
                    MatSliderModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
                    TranslateModule,
                ],
                declarations: [
                    AjfImageFilterPipe,
                    AjfQuillEditor,
                    AjfReportBuilderColumn,
                    AjfReportBuilderConditionEditor,
                    AjfReportBuilderContent,
                    AjfReportBuilderCustomWidgetDialog,
                    AjfReportBuilderCustomWidgetsToolbar,
                    AjfReportBuilderCustomWidgetToolbarButton,
                    AjfReportBuilderFormsAnalyzer,
                    AjfReportBuilderFormsAnalyzerDialog,
                    AjfReportBuilderImageGroup,
                    AjfReportBuilderProperties,
                    AjfReportBuilderRendererWidget,
                    AjfReportBuilderThemeColor,
                    AjfReportBuilderThemeColorDialog,
                    AjfReportBuilderToolbar,
                    AjfReportBuilderToolbarDialog,
                    AjfReportBuilderWidgetsRowButtons,
                    AjfReportBuilderWidgetsToolbar,
                    AjfReportBuilderWidgetToolbarButton,
                    AjfReportBuilder,
                ],
                exports: [
                    AjfReportBuilder,
                ],
                providers: [
                    AjfReportBuilderService,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFP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QUFzQjtvQkFDdEIsK0JBQStCO29CQUMvQix1QkFBdUI7b0JBQ3ZCLGtDQUFrQztvQkFDbEMsb0NBQW9DO29CQUNwQyx5Q0FBeUM7b0JBQ3pDLDZCQUE2QjtvQkFDN0IsbUNBQW1DO29CQUNuQywwQkFBMEI7b0JBQzFCLDBCQUEwQjtvQkFDMUIsOEJBQThCO29CQUM5QiwwQkFBMEI7b0JBQzFCLGdDQUFnQztvQkFDaEMsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLGlDQUFpQztvQkFDakMsOEJBQThCO29CQUM5QixtQ0FBbUM7b0JBQ25DLGdCQUFnQjtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtpQkFDakI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHVCQUF1QjtpQkFDeEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb21tb25Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBamZNYXBNb2R1bGV9IGZyb20gJ0BhamYvY29yZS9tYXAnO1xuaW1wb3J0IHtBamZUYWJsZU1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7QWpmVGV4dE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RleHQnO1xuaW1wb3J0IHtBamZJbWFnZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9pbWFnZSc7XG5pbXBvcnQge0FqZk1vbmFjb0VkaXRvck1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9tb25hY28tZWRpdG9yJztcbmltcG9ydCB7RHJhZ0Ryb3BNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHtNYXRCdXR0b25Ub2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbi10b2dnbGUnO1xuaW1wb3J0IHtNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7TWF0RGlhbG9nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXRHcmlkTGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZ3JpZC1saXN0JztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQge01hdExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge01hdFNpZGVuYXZNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xuaW1wb3J0IHtNYXRTbGlkZVRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7TWF0U2xpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtNYXRUYWJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGV9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtDb2xvclBpY2tlck1vZHVsZX0gZnJvbSAnbmd4LWNvbG9yLXBpY2tlcic7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbHVtbn0gZnJvbSAnLi9jb2x1bW4nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ29uZGl0aW9uRWRpdG9yfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ29udGVudH0gZnJvbSAnLi9jb250ZW50JztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZ30gZnJvbSAnLi9jdXN0b20td2lkZ2V0LWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9ufSBmcm9tICcuL2N1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0c1Rvb2xiYXJ9IGZyb20gJy4vY3VzdG9tLXdpZGdldHMtdG9vbGJhcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2d9IGZyb20gJy4vZm9ybXMtYW5hbHl6ZXItZGlhbG9nJztcbmltcG9ydCB7QWpmSW1hZ2VGaWx0ZXJQaXBlfSBmcm9tICcuL2ltYWdlLWZpbHRlcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwfSBmcm9tICcuL2ltYWdlLWdyb3VwJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXN9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQge0FqZlF1aWxsRWRpdG9yfSBmcm9tICcuL3F1aWxsLWVkaXRvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJSZW5kZXJlcldpZGdldH0gZnJvbSAnLi9yZW5kZXJlci13aWRnZXQnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yfSBmcm9tICcuL3RoZW1lLWNvbG9yJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2d9IGZyb20gJy4vdGhlbWUtY29sb3ItZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRvb2xiYXJ9IGZyb20gJy4vdG9vbGJhcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nfSBmcm9tICcuL3Rvb2xiYXItZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcldpZGdldFRvb2xiYXJCdXR0b259IGZyb20gJy4vd2lkZ2V0LXRvb2xiYXItYnV0dG9uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcldpZGdldHNSb3dCdXR0b25zfSBmcm9tICcuL3dpZGdldHMtcm93LWJ1dHRvbnMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Rvb2xiYXJ9IGZyb20gJy4vd2lkZ2V0cy10b29sYmFyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFqZkNvbW1vbk1vZHVsZSwgQWpmSW1hZ2VNb2R1bGUsICBBamZNYXBNb2R1bGUsICAgICAgQWpmTW9uYWNvRWRpdG9yTW9kdWxlLFxuICAgIEFqZlRhYmxlTW9kdWxlLCAgQWpmVGV4dE1vZHVsZSwgICBDb2xvclBpY2tlck1vZHVsZSwgQ29tbW9uTW9kdWxlLFxuICAgIERyYWdEcm9wTW9kdWxlLCAgRm9ybXNNb2R1bGUsICAgICBNYXRCdXR0b25Nb2R1bGUsICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsICAgTWF0RGlhbG9nTW9kdWxlLCBNYXRHcmlkTGlzdE1vZHVsZSwgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLCAgIE1hdFNlbGVjdE1vZHVsZSwgTWF0U2lkZW5hdk1vZHVsZSwgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdFNsaWRlck1vZHVsZSwgTWF0VGFic01vZHVsZSwgICBNYXRUb29sYmFyTW9kdWxlLCAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkltYWdlRmlsdGVyUGlwZSxcbiAgICBBamZRdWlsbEVkaXRvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29sdW1uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnQsXG4gICAgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0c1Rvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldFRvb2xiYXJCdXR0b24sXG4gICAgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlckltYWdlR3JvdXAsXG4gICAgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXMsXG4gICAgQWpmUmVwb3J0QnVpbGRlclJlbmRlcmVyV2lkZ2V0LFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9ucyxcbiAgICBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Rvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldFRvb2xiYXJCdXR0b24sXG4gICAgQWpmUmVwb3J0QnVpbGRlcixcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZlJlcG9ydEJ1aWxkZXIsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJNb2R1bGUge1xufVxuIl19