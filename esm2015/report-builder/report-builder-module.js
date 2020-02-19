/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-module.ts
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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { AjfCommonModule } from '@ajf/core/common';
import { AjfMapModule } from '@ajf/core/map';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';
import { AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { AjfReportBuilderColumn } from './column';
import { AjfReportBuilderConditionEditor } from './condition-editor';
import { AjfReportBuilderContent } from './content';
import { AjfReportBuilderCustomWidgetDialog } from './custom-widget-dialog';
import { AjfReportBuilderCustomWidgetToolbarButton } from './custom-widget-toolbar-button';
import { AjfReportBuilderCustomWidgetsToolbar } from './custom-widgets-toolbar';
import { AjfReportBuilderFormsAnalyzerDialog } from './forms-analyzer-dialog';
import { AjfReportBuilderFormsAnalyzer } from './forms-analyzer';
import { AjfImageFilterPipe } from './image-filter';
import { AjfReportBuilderImageGroup } from './image-group';
import { AjfReportBuilderProperties } from './properties';
import { AjfQuillEditor } from './quill-editor';
import { AjfReportBuilderRendererWidget } from './renderer-widget';
import { AjfReportBuilderThemeColorDialog } from './theme-color-dialog';
import { AjfReportBuilderThemeColor } from './theme-color';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
import { AjfReportBuilderToolbar } from './toolbar';
import { AjfReportBuilderWidgetToolbarButton } from './widget-toolbar-button';
import { AjfReportBuilderWidgetsRowButtons } from './widgets-row-buttons';
import { AjfReportBuilderWidgetsToolbar } from './widgets-toolbar';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilder } from './report-builder';
export class AjfReportBuilderModule {
}
AjfReportBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    DragDropModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCardModule,
                    MatDialogModule,
                    MatGridListModule,
                    MatIconModule,
                    MatListModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSlideToggleModule,
                    MatSliderModule,
                    MatTabsModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    TranslateModule,
                    ColorPickerModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfMapModule,
                    AjfMonacoEditorModule,
                    AjfTableModule,
                    AjfTextModule,
                ],
                declarations: [
                    AjfQuillEditor,
                    AjfReportBuilderColumn,
                    AjfReportBuilderConditionEditor,
                    AjfReportBuilderContent,
                    AjfReportBuilderCustomWidgetDialog,
                    AjfReportBuilderCustomWidgetToolbarButton,
                    AjfReportBuilderCustomWidgetsToolbar,
                    AjfReportBuilderFormsAnalyzerDialog,
                    AjfReportBuilderFormsAnalyzer,
                    AjfReportBuilderImageGroup,
                    AjfReportBuilderProperties,
                    AjfReportBuilderRendererWidget,
                    AjfReportBuilderThemeColorDialog,
                    AjfReportBuilderThemeColor,
                    AjfReportBuilderToolbarDialog,
                    AjfReportBuilderToolbar,
                    AjfReportBuilderWidgetToolbarButton,
                    AjfReportBuilderWidgetsRowButtons,
                    AjfReportBuilderWidgetsToolbar,
                    AjfReportBuilder,
                    AjfImageFilterPipe,
                ],
                exports: [
                    AjfReportBuilder,
                ],
                providers: [
                    AjfReportBuilderService,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FB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c0JBQXNCO29CQUN0QiwrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsa0NBQWtDO29CQUNsQyx5Q0FBeUM7b0JBQ3pDLG9DQUFvQztvQkFDcEMsbUNBQW1DO29CQUNuQyw2QkFBNkI7b0JBQzdCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQiw4QkFBOEI7b0JBQzlCLGdDQUFnQztvQkFDaEMsMEJBQTBCO29CQUMxQiw2QkFBNkI7b0JBQzdCLHVCQUF1QjtvQkFDdkIsbUNBQW1DO29CQUNuQyxpQ0FBaUM7b0JBQ2pDLDhCQUE4QjtvQkFDOUIsZ0JBQWdCO29CQUNoQixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7aUJBQ2pCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCx1QkFBdUI7aUJBQ3hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RHJhZ0Ryb3BNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSc7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdEdyaWRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ncmlkLWxpc3QnO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7TWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2lkZW5hdk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHtNYXRTbGlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge01hdFRhYnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRUb29sYmFyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtDb2xvclBpY2tlck1vZHVsZX0gZnJvbSAnbmd4LWNvbG9yLXBpY2tlcic7XG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmVGFibGVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlRleHRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90ZXh0JztcbmltcG9ydCB7QWpmSW1hZ2VNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvaW1hZ2UnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3JNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbHVtbn0gZnJvbSAnLi9jb2x1bW4nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ29uZGl0aW9uRWRpdG9yfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ29udGVudH0gZnJvbSAnLi9jb250ZW50JztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZ30gZnJvbSAnLi9jdXN0b20td2lkZ2V0LWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9ufSBmcm9tICcuL2N1c3RvbS13aWRnZXQtdG9vbGJhci1idXR0b24nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0c1Rvb2xiYXJ9IGZyb20gJy4vY3VzdG9tLXdpZGdldHMtdG9vbGJhcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyJztcbmltcG9ydCB7QWpmSW1hZ2VGaWx0ZXJQaXBlfSBmcm9tICcuL2ltYWdlLWZpbHRlcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwfSBmcm9tICcuL2ltYWdlLWdyb3VwJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXN9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQge0FqZlF1aWxsRWRpdG9yfSBmcm9tICcuL3F1aWxsLWVkaXRvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJSZW5kZXJlcldpZGdldH0gZnJvbSAnLi9yZW5kZXJlci13aWRnZXQnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZ30gZnJvbSAnLi90aGVtZS1jb2xvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvcn0gZnJvbSAnLi90aGVtZS1jb2xvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nfSBmcm9tICcuL3Rvb2xiYXItZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRvb2xiYXJ9IGZyb20gJy4vdG9vbGJhcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9ufSBmcm9tICcuL3dpZGdldC10b29sYmFyLWJ1dHRvbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9uc30gZnJvbSAnLi93aWRnZXRzLXJvdy1idXR0b25zJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcldpZGdldHNUb29sYmFyfSBmcm9tICcuL3dpZGdldHMtdG9vbGJhcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uVG9nZ2xlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIENvbG9yUGlja2VyTW9kdWxlLFxuICAgIEFqZkNvbW1vbk1vZHVsZSxcbiAgICBBamZJbWFnZU1vZHVsZSxcbiAgICBBamZNYXBNb2R1bGUsXG4gICAgQWpmTW9uYWNvRWRpdG9yTW9kdWxlLFxuICAgIEFqZlRhYmxlTW9kdWxlLFxuICAgIEFqZlRleHRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZlF1aWxsRWRpdG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb2x1bW4sXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29udGVudCxcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplcixcbiAgICBBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cCxcbiAgICBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllcyxcbiAgICBBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXQsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldFRvb2xiYXJCdXR0b24sXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNSb3dCdXR0b25zLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyLFxuICAgIEFqZkltYWdlRmlsdGVyUGlwZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZlJlcG9ydEJ1aWxkZXIsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJNb2R1bGUgeyB9XG4iXX0=