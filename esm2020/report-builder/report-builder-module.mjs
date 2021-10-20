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
        AjfReportBuilder], imports: [AjfCommonModule,
        AjfImageModule,
        AjfMapModule,
        AjfMonacoEditorModule,
        AjfTableModule,
        AjfTextModule,
        ColorPickerModule,
        CommonModule,
        DragDropModule,
        FormsModule,
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
        AjfTranslocoModule], exports: [AjfReportBuilder] });
AjfReportBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderModule, providers: [AjfReportBuilderService], imports: [[
            AjfCommonModule,
            AjfImageModule,
            AjfMapModule,
            AjfMonacoEditorModule,
            AjfTableModule,
            AjfTextModule,
            ColorPickerModule,
            CommonModule,
            DragDropModule,
            FormsModule,
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
            AjfTranslocoModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfCommonModule,
                        AjfImageModule,
                        AjfMapModule,
                        AjfMonacoEditorModule,
                        AjfTableModule,
                        AjfTextModule,
                        ColorPickerModule,
                        CommonModule,
                        DragDropModule,
                        FormsModule,
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
                    exports: [AjfReportBuilder],
                    providers: [AjfReportBuilderService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9B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cUJBQ25CO29CQUNELFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2Qsc0JBQXNCO3dCQUN0QiwrQkFBK0I7d0JBQy9CLHVCQUF1Qjt3QkFDdkIsa0NBQWtDO3dCQUNsQyxvQ0FBb0M7d0JBQ3BDLHlDQUF5Qzt3QkFDekMsNkJBQTZCO3dCQUM3QixtQ0FBbUM7d0JBQ25DLDBCQUEwQjt3QkFDMUIsMEJBQTBCO3dCQUMxQiw4QkFBOEI7d0JBQzlCLDBCQUEwQjt3QkFDMUIsZ0NBQWdDO3dCQUNoQyx1QkFBdUI7d0JBQ3ZCLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyw4QkFBOEI7d0JBQzlCLG1DQUFtQzt3QkFDbkMsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0IsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FqZk1hcE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL21hcCc7XG5pbXBvcnQge0FqZlRhYmxlTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtBamZUZXh0TW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdGV4dCc7XG5pbXBvcnQge0FqZlRyYW5zbG9jb01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5pbXBvcnQge0FqZkltYWdlTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2ltYWdlJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtEcmFnRHJvcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSc7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdEdyaWRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ncmlkLWxpc3QnO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7TWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2lkZW5hdk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHtNYXRTbGlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge01hdFRhYnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRUb29sYmFyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge0NvbG9yUGlja2VyTW9kdWxlfSBmcm9tICdAZ251Y29vcC9uZ3gtY29sb3ItcGlja2VyJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ29sdW1ufSBmcm9tICcuL2NvbHVtbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb250ZW50fSBmcm9tICcuL2NvbnRlbnQnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nfSBmcm9tICcuL2N1c3RvbS13aWRnZXQtZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldFRvb2xiYXJCdXR0b259IGZyb20gJy4vY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhcn0gZnJvbSAnLi9jdXN0b20td2lkZ2V0cy10b29sYmFyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJ9IGZyb20gJy4vZm9ybXMtYW5hbHl6ZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZJbWFnZUZpbHRlclBpcGV9IGZyb20gJy4vaW1hZ2UtZmlsdGVyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckltYWdlR3JvdXB9IGZyb20gJy4vaW1hZ2UtZ3JvdXAnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc30gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7QWpmUXVpbGxFZGl0b3J9IGZyb20gJy4vcXVpbGwtZWRpdG9yJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclJlbmRlcmVyV2lkZ2V0fSBmcm9tICcuL3JlbmRlcmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJ9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3J9IGZyb20gJy4vdGhlbWUtY29sb3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZ30gZnJvbSAnLi90aGVtZS1jb2xvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhcn0gZnJvbSAnLi90b29sYmFyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2d9IGZyb20gJy4vdG9vbGJhci1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9vbGJhckJ1dHRvbn0gZnJvbSAnLi93aWRnZXQtdG9vbGJhci1idXR0b24nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnN9IGZyb20gJy4vd2lkZ2V0cy1yb3ctYnV0dG9ucyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhcn0gZnJvbSAnLi93aWRnZXRzLXRvb2xiYXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWpmQ29tbW9uTW9kdWxlLFxuICAgIEFqZkltYWdlTW9kdWxlLFxuICAgIEFqZk1hcE1vZHVsZSxcbiAgICBBamZNb25hY29FZGl0b3JNb2R1bGUsXG4gICAgQWpmVGFibGVNb2R1bGUsXG4gICAgQWpmVGV4dE1vZHVsZSxcbiAgICBDb2xvclBpY2tlck1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIEFqZlRyYW5zbG9jb01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmSW1hZ2VGaWx0ZXJQaXBlLFxuICAgIEFqZlF1aWxsRWRpdG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb2x1bW4sXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29udGVudCxcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbixcbiAgICBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplcixcbiAgICBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cCxcbiAgICBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllcyxcbiAgICBBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXQsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNSb3dCdXR0b25zLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9vbGJhckJ1dHRvbixcbiAgICBBamZSZXBvcnRCdWlsZGVyLFxuICBdLFxuICBleHBvcnRzOiBbQWpmUmVwb3J0QnVpbGRlcl0sXG4gIHByb3ZpZGVyczogW0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlck1vZHVsZSB7fVxuIl19