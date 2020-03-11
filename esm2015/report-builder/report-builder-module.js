/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-module.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FB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c0JBQXNCO29CQUN0QiwrQkFBK0I7b0JBQy9CLHVCQUF1QjtvQkFDdkIsa0NBQWtDO29CQUNsQyx5Q0FBeUM7b0JBQ3pDLG9DQUFvQztvQkFDcEMsbUNBQW1DO29CQUNuQyw2QkFBNkI7b0JBQzdCLDBCQUEwQjtvQkFDMUIsMEJBQTBCO29CQUMxQiw4QkFBOEI7b0JBQzlCLGdDQUFnQztvQkFDaEMsMEJBQTBCO29CQUMxQiw2QkFBNkI7b0JBQzdCLHVCQUF1QjtvQkFDdkIsbUNBQW1DO29CQUNuQyxpQ0FBaUM7b0JBQ2pDLDhCQUE4QjtvQkFDOUIsZ0JBQWdCO29CQUNoQixrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7aUJBQ2pCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCx1QkFBdUI7aUJBQ3hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RyYWdEcm9wTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHtNYXRCdXR0b25Ub2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbi10b2dnbGUnO1xuaW1wb3J0IHtNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7TWF0RGlhbG9nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXRHcmlkTGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZ3JpZC1saXN0JztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQge01hdExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge01hdFNpZGVuYXZNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xuaW1wb3J0IHtNYXRTbGlkZVRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7TWF0U2xpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtNYXRUYWJzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7Q29sb3JQaWNrZXJNb2R1bGV9IGZyb20gJ25neC1jb2xvci1waWNrZXInO1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FqZk1hcE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL21hcCc7XG5pbXBvcnQge0FqZlRhYmxlTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtBamZUZXh0TW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdGV4dCc7XG5pbXBvcnQge0FqZkltYWdlTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2ltYWdlJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb2x1bW59IGZyb20gJy4vY29sdW1uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbnRlbnR9IGZyb20gJy4vY29udGVudCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2d9IGZyb20gJy4vY3VzdG9tLXdpZGdldC1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbn0gZnJvbSAnLi9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldHNUb29sYmFyfSBmcm9tICcuL2N1c3RvbS13aWRnZXRzLXRvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplcn0gZnJvbSAnLi9mb3Jtcy1hbmFseXplcic7XG5pbXBvcnQge0FqZkltYWdlRmlsdGVyUGlwZX0gZnJvbSAnLi9pbWFnZS1maWx0ZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cH0gZnJvbSAnLi9pbWFnZS1ncm91cCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHtBamZRdWlsbEVkaXRvcn0gZnJvbSAnLi9xdWlsbC1lZGl0b3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXR9IGZyb20gJy4vcmVuZGVyZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2d9IGZyb20gJy4vdGhlbWUtY29sb3ItZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3J9IGZyb20gJy4vdGhlbWUtY29sb3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZ30gZnJvbSAnLi90b29sYmFyLWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUb29sYmFyfSBmcm9tICcuL3Rvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9vbGJhckJ1dHRvbn0gZnJvbSAnLi93aWRnZXQtdG9vbGJhci1idXR0b24nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnN9IGZyb20gJy4vd2lkZ2V0cy1yb3ctYnV0dG9ucyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhcn0gZnJvbSAnLi93aWRnZXRzLXRvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcn0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgICBDb2xvclBpY2tlck1vZHVsZSxcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQWpmSW1hZ2VNb2R1bGUsXG4gICAgQWpmTWFwTW9kdWxlLFxuICAgIEFqZk1vbmFjb0VkaXRvck1vZHVsZSxcbiAgICBBamZUYWJsZU1vZHVsZSxcbiAgICBBamZUZXh0TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZRdWlsbEVkaXRvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29sdW1uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnQsXG4gICAgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldERpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0c1Rvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlckltYWdlR3JvdXAsXG4gICAgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXMsXG4gICAgQWpmUmVwb3J0QnVpbGRlclJlbmRlcmVyV2lkZ2V0LFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9ucyxcbiAgICBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Rvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlcixcbiAgICBBamZJbWFnZUZpbHRlclBpcGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZSZXBvcnRCdWlsZGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyTW9kdWxlIHsgfVxuIl19