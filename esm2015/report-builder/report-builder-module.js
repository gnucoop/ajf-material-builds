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
let AjfReportBuilderModule = /** @class */ (() => {
    class AjfReportBuilderModule {
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
    return AjfReportBuilderModule;
})();
export { AjfReportBuilderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFP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QkFBc0I7d0JBQ3RCLCtCQUErQjt3QkFDL0IsdUJBQXVCO3dCQUN2QixrQ0FBa0M7d0JBQ2xDLG9DQUFvQzt3QkFDcEMseUNBQXlDO3dCQUN6Qyw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiwwQkFBMEI7d0JBQzFCLDhCQUE4Qjt3QkFDOUIsMEJBQTBCO3dCQUMxQixnQ0FBZ0M7d0JBQ2hDLHVCQUF1Qjt3QkFDdkIsNkJBQTZCO3dCQUM3QixpQ0FBaUM7d0JBQ2pDLDhCQUE4Qjt3QkFDOUIsbUNBQW1DO3dCQUNuQyxnQkFBZ0I7cUJBQ2pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0I7cUJBQ2pCO29CQUNELFNBQVMsRUFBRTt3QkFDVCx1QkFBdUI7cUJBQ3hCO2lCQUNGOztJQUVELDZCQUFDO0tBQUE7U0FEWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmVGFibGVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlRleHRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90ZXh0JztcbmltcG9ydCB7QWpmSW1hZ2VNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvaW1hZ2UnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3JNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge0RyYWdEcm9wTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7TWF0QnV0dG9uVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24tdG9nZ2xlJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0R3JpZExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2dyaWQtbGlzdCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHtNYXRTaWRlbmF2TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNsaWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7TWF0VGFic01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge01hdFRvb2xiYXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHtNYXRUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7VHJhbnNsYXRlTW9kdWxlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7Q29sb3JQaWNrZXJNb2R1bGV9IGZyb20gJ25neC1jb2xvci1waWNrZXInO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb2x1bW59IGZyb20gJy4vY29sdW1uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbnRlbnR9IGZyb20gJy4vY29udGVudCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2d9IGZyb20gJy4vY3VzdG9tLXdpZGdldC1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbn0gZnJvbSAnLi9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldHNUb29sYmFyfSBmcm9tICcuL2N1c3RvbS13aWRnZXRzLXRvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplcn0gZnJvbSAnLi9mb3Jtcy1hbmFseXplcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZkltYWdlRmlsdGVyUGlwZX0gZnJvbSAnLi9pbWFnZS1maWx0ZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cH0gZnJvbSAnLi9pbWFnZS1ncm91cCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHtBamZRdWlsbEVkaXRvcn0gZnJvbSAnLi9xdWlsbC1lZGl0b3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXR9IGZyb20gJy4vcmVuZGVyZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcn0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvcn0gZnJvbSAnLi90aGVtZS1jb2xvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nfSBmcm9tICcuL3RoZW1lLWNvbG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUb29sYmFyfSBmcm9tICcuL3Rvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZ30gZnJvbSAnLi90b29sYmFyLWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9ufSBmcm9tICcuL3dpZGdldC10b29sYmFyLWJ1dHRvbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9uc30gZnJvbSAnLi93aWRnZXRzLXJvdy1idXR0b25zJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcldpZGdldHNUb29sYmFyfSBmcm9tICcuL3dpZGdldHMtdG9vbGJhcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsIEFqZkltYWdlTW9kdWxlLCAgQWpmTWFwTW9kdWxlLCAgICAgIEFqZk1vbmFjb0VkaXRvck1vZHVsZSxcbiAgICBBamZUYWJsZU1vZHVsZSwgIEFqZlRleHRNb2R1bGUsICAgQ29sb3JQaWNrZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZSwgIEZvcm1zTW9kdWxlLCAgICAgTWF0QnV0dG9uTW9kdWxlLCAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLCAgIE1hdERpYWxvZ01vZHVsZSwgTWF0R3JpZExpc3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSwgICBNYXRTZWxlY3RNb2R1bGUsIE1hdFNpZGVuYXZNb2R1bGUsICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsIE1hdFRhYnNNb2R1bGUsICAgTWF0VG9vbGJhck1vZHVsZSwgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZJbWFnZUZpbHRlclBpcGUsXG4gICAgQWpmUXVpbGxFZGl0b3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbHVtbixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29uZGl0aW9uRWRpdG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50LFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldHNUb29sYmFyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJSZW5kZXJlcldpZGdldCxcbiAgICBBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnMsXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNUb29sYmFyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZSZXBvcnRCdWlsZGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyTW9kdWxlIHtcbn1cbiJdfQ==