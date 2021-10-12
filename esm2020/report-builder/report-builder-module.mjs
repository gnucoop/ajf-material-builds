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
import { AjfTranslocoModule } from '@ajf/core/transloco';
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
import { ColorPickerModule } from '@gnucoop/ngx-color-picker';
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
import * as i0 from "@angular/core";
export class AjfReportBuilderModule {
}
AjfReportBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderModule, declarations: [AjfImageFilterPipe,
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
        AjfReportBuilder], imports: [AjfCommonModule, AjfImageModule, AjfMapModule, AjfMonacoEditorModule,
        AjfTableModule, AjfTextModule, ColorPickerModule, CommonModule,
        DragDropModule, FormsModule, MatButtonModule, MatButtonToggleModule,
        MatCardModule, MatDialogModule, MatGridListModule, MatIconModule,
        MatListModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
        MatSliderModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
        AjfTranslocoModule], exports: [AjfReportBuilder] });
AjfReportBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderModule, providers: [
        AjfReportBuilderService,
    ], imports: [[
            AjfCommonModule, AjfImageModule, AjfMapModule, AjfMonacoEditorModule,
            AjfTableModule, AjfTextModule, ColorPickerModule, CommonModule,
            DragDropModule, FormsModule, MatButtonModule, MatButtonToggleModule,
            MatCardModule, MatDialogModule, MatGridListModule, MatIconModule,
            MatListModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
            MatSliderModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
            AjfTranslocoModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfCommonModule, AjfImageModule, AjfMapModule, AjfMonacoEditorModule,
                        AjfTableModule, AjfTextModule, ColorPickerModule, CommonModule,
                        DragDropModule, FormsModule, MatButtonModule, MatButtonToggleModule,
                        MatCardModule, MatDialogModule, MatGridListModule, MatIconModule,
                        MatListModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
                        MatSliderModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
                        AjfTranslocoModule,
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
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9B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d0JBQ1osa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLHNCQUFzQjt3QkFDdEIsK0JBQStCO3dCQUMvQix1QkFBdUI7d0JBQ3ZCLGtDQUFrQzt3QkFDbEMsb0NBQW9DO3dCQUNwQyx5Q0FBeUM7d0JBQ3pDLDZCQUE2Qjt3QkFDN0IsbUNBQW1DO3dCQUNuQywwQkFBMEI7d0JBQzFCLDBCQUEwQjt3QkFDMUIsOEJBQThCO3dCQUM5QiwwQkFBMEI7d0JBQzFCLGdDQUFnQzt3QkFDaEMsdUJBQXVCO3dCQUN2Qiw2QkFBNkI7d0JBQzdCLGlDQUFpQzt3QkFDakMsOEJBQThCO3dCQUM5QixtQ0FBbUM7d0JBQ25DLGdCQUFnQjtxQkFDakI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdCQUFnQjtxQkFDakI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHVCQUF1QjtxQkFDeEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QWpmTWFwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvbWFwJztcbmltcG9ydCB7QWpmVGFibGVNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0FqZlRleHRNb2R1bGV9IGZyb20gJ0BhamYvY29yZS90ZXh0JztcbmltcG9ydCB7QWpmVHJhbnNsb2NvTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7QWpmSW1hZ2VNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvaW1hZ2UnO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3JNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge0RyYWdEcm9wTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7TWF0QnV0dG9uVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24tdG9nZ2xlJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0R3JpZExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2dyaWQtbGlzdCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHtNYXRTaWRlbmF2TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNsaWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7TWF0VGFic01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge01hdFRvb2xiYXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHtNYXRUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7Q29sb3JQaWNrZXJNb2R1bGV9IGZyb20gJ0BnbnVjb29wL25neC1jb2xvci1waWNrZXInO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb2x1bW59IGZyb20gJy4vY29sdW1uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckNvbnRlbnR9IGZyb20gJy4vY29udGVudCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2d9IGZyb20gJy4vY3VzdG9tLXdpZGdldC1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbn0gZnJvbSAnLi9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldHNUb29sYmFyfSBmcm9tICcuL2N1c3RvbS13aWRnZXRzLXRvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplcn0gZnJvbSAnLi9mb3Jtcy1hbmFseXplcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZkltYWdlRmlsdGVyUGlwZX0gZnJvbSAnLi9pbWFnZS1maWx0ZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cH0gZnJvbSAnLi9pbWFnZS1ncm91cCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHtBamZRdWlsbEVkaXRvcn0gZnJvbSAnLi9xdWlsbC1lZGl0b3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXR9IGZyb20gJy4vcmVuZGVyZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcn0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvcn0gZnJvbSAnLi90aGVtZS1jb2xvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nfSBmcm9tICcuL3RoZW1lLWNvbG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUb29sYmFyfSBmcm9tICcuL3Rvb2xiYXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZ30gZnJvbSAnLi90b29sYmFyLWRpYWxvZyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9ufSBmcm9tICcuL3dpZGdldC10b29sYmFyLWJ1dHRvbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9uc30gZnJvbSAnLi93aWRnZXRzLXJvdy1idXR0b25zJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlcldpZGdldHNUb29sYmFyfSBmcm9tICcuL3dpZGdldHMtdG9vbGJhcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsICAgIEFqZkltYWdlTW9kdWxlLCAgQWpmTWFwTW9kdWxlLCAgICAgIEFqZk1vbmFjb0VkaXRvck1vZHVsZSxcbiAgICBBamZUYWJsZU1vZHVsZSwgICAgIEFqZlRleHRNb2R1bGUsICAgQ29sb3JQaWNrZXJNb2R1bGUsIENvbW1vbk1vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZSwgICAgIEZvcm1zTW9kdWxlLCAgICAgTWF0QnV0dG9uTW9kdWxlLCAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLCAgICAgIE1hdERpYWxvZ01vZHVsZSwgTWF0R3JpZExpc3RNb2R1bGUsIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSwgICAgICBNYXRTZWxlY3RNb2R1bGUsIE1hdFNpZGVuYXZNb2R1bGUsICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRTbGlkZXJNb2R1bGUsICAgIE1hdFRhYnNNb2R1bGUsICAgTWF0VG9vbGJhck1vZHVsZSwgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgQWpmVHJhbnNsb2NvTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZJbWFnZUZpbHRlclBpcGUsXG4gICAgQWpmUXVpbGxFZGl0b3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbHVtbixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29uZGl0aW9uRWRpdG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50LFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXREaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldHNUb29sYmFyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRUb29sYmFyQnV0dG9uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJSZW5kZXJlcldpZGdldCxcbiAgICBBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnMsXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNUb29sYmFyLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb29sYmFyQnV0dG9uLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZSZXBvcnRCdWlsZGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlck1vZHVsZSB7XG59XG4iXX0=