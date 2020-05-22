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
import { __decorate } from "tslib";
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
    let AjfReportBuilderModule = class AjfReportBuilderModule {
    };
    AjfReportBuilderModule = __decorate([
        NgModule({
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
        })
    ], AjfReportBuilderModule);
    return AjfReportBuilderModule;
})();
export { AjfReportBuilderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbkUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xELE9BQU8sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyx5Q0FBeUMsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlFLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxtQ0FBbUMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEQsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0QsT0FBTyxFQUFDLG1DQUFtQyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEUsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUEwQ2pFO0lBQUEsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7S0FDbEMsQ0FBQTtJQURZLHNCQUFzQjtRQXhDbEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGVBQWUsRUFBRSxjQUFjLEVBQUcsWUFBWSxFQUFPLHFCQUFxQjtnQkFDMUUsY0FBYyxFQUFHLGFBQWEsRUFBSSxpQkFBaUIsRUFBRSxZQUFZO2dCQUNqRSxjQUFjLEVBQUcsV0FBVyxFQUFNLGVBQWUsRUFBSSxxQkFBcUI7Z0JBQzFFLGFBQWEsRUFBSSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsYUFBYTtnQkFDbEUsYUFBYSxFQUFJLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRyxvQkFBb0I7Z0JBQ3pFLGVBQWUsRUFBRSxhQUFhLEVBQUksZ0JBQWdCLEVBQUcsZ0JBQWdCO2dCQUNyRSxlQUFlO2FBQ2hCO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGtCQUFrQjtnQkFDbEIsY0FBYztnQkFDZCxzQkFBc0I7Z0JBQ3RCLCtCQUErQjtnQkFDL0IsdUJBQXVCO2dCQUN2QixrQ0FBa0M7Z0JBQ2xDLG9DQUFvQztnQkFDcEMseUNBQXlDO2dCQUN6Qyw2QkFBNkI7Z0JBQzdCLG1DQUFtQztnQkFDbkMsMEJBQTBCO2dCQUMxQiwwQkFBMEI7Z0JBQzFCLDhCQUE4QjtnQkFDOUIsMEJBQTBCO2dCQUMxQixnQ0FBZ0M7Z0JBQ2hDLHVCQUF1QjtnQkFDdkIsNkJBQTZCO2dCQUM3QixpQ0FBaUM7Z0JBQ2pDLDhCQUE4QjtnQkFDOUIsbUNBQW1DO2dCQUNuQyxnQkFBZ0I7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsZ0JBQWdCO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHVCQUF1QjthQUN4QjtTQUNGLENBQUM7T0FDVyxzQkFBc0IsQ0FDbEM7SUFBRCw2QkFBQztLQUFBO1NBRFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FqZk1hcE1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL21hcCc7XG5pbXBvcnQge0FqZlRhYmxlTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtBamZUZXh0TW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdGV4dCc7XG5pbXBvcnQge0FqZkltYWdlTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2ltYWdlJztcbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtEcmFnRHJvcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdEJ1dHRvblRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZSc7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdEdyaWRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9ncmlkLWxpc3QnO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7TWF0TGlzdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdCc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2lkZW5hdk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHtNYXRTbGlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge01hdFRhYnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtNYXRUb29sYmFyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge0NvbG9yUGlja2VyTW9kdWxlfSBmcm9tICduZ3gtY29sb3ItcGlja2VyJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ29sdW1ufSBmcm9tICcuL2NvbHVtbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDb250ZW50fSBmcm9tICcuL2NvbnRlbnQnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nfSBmcm9tICcuL2N1c3RvbS13aWRnZXQtZGlhbG9nJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckN1c3RvbVdpZGdldFRvb2xiYXJCdXR0b259IGZyb20gJy4vY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbic7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhcn0gZnJvbSAnLi9jdXN0b20td2lkZ2V0cy10b29sYmFyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJ9IGZyb20gJy4vZm9ybXMtYW5hbHl6ZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZJbWFnZUZpbHRlclBpcGV9IGZyb20gJy4vaW1hZ2UtZmlsdGVyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckltYWdlR3JvdXB9IGZyb20gJy4vaW1hZ2UtZ3JvdXAnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc30gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7QWpmUXVpbGxFZGl0b3J9IGZyb20gJy4vcXVpbGwtZWRpdG9yJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclJlbmRlcmVyV2lkZ2V0fSBmcm9tICcuL3JlbmRlcmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJ9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXInO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3J9IGZyb20gJy4vdGhlbWUtY29sb3InO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZ30gZnJvbSAnLi90aGVtZS1jb2xvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhcn0gZnJvbSAnLi90b29sYmFyJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2d9IGZyb20gJy4vdG9vbGJhci1kaWFsb2cnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9vbGJhckJ1dHRvbn0gZnJvbSAnLi93aWRnZXQtdG9vbGJhci1idXR0b24nO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnN9IGZyb20gJy4vd2lkZ2V0cy1yb3ctYnV0dG9ucyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhcn0gZnJvbSAnLi93aWRnZXRzLXRvb2xiYXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWpmQ29tbW9uTW9kdWxlLCBBamZJbWFnZU1vZHVsZSwgIEFqZk1hcE1vZHVsZSwgICAgICBBamZNb25hY29FZGl0b3JNb2R1bGUsXG4gICAgQWpmVGFibGVNb2R1bGUsICBBamZUZXh0TW9kdWxlLCAgIENvbG9yUGlja2VyTW9kdWxlLCBDb21tb25Nb2R1bGUsXG4gICAgRHJhZ0Ryb3BNb2R1bGUsICBGb3Jtc01vZHVsZSwgICAgIE1hdEJ1dHRvbk1vZHVsZSwgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSwgICBNYXREaWFsb2dNb2R1bGUsIE1hdEdyaWRMaXN0TW9kdWxlLCBNYXRJY29uTW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsICAgTWF0U2VsZWN0TW9kdWxlLCBNYXRTaWRlbmF2TW9kdWxlLCAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0U2xpZGVyTW9kdWxlLCBNYXRUYWJzTW9kdWxlLCAgIE1hdFRvb2xiYXJNb2R1bGUsICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmSW1hZ2VGaWx0ZXJQaXBlLFxuICAgIEFqZlF1aWxsRWRpdG9yLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDb2x1bW4sXG4gICAgQWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ29udGVudCxcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0RGlhbG9nLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJDdXN0b21XaWRnZXRzVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbixcbiAgICBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplcixcbiAgICBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyxcbiAgICBBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cCxcbiAgICBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllcyxcbiAgICBBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXQsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3IsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXIsXG4gICAgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2csXG4gICAgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNSb3dCdXR0b25zLFxuICAgIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhcixcbiAgICBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0VG9vbGJhckJ1dHRvbixcbiAgICBBamZSZXBvcnRCdWlsZGVyLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmUmVwb3J0QnVpbGRlcixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlck1vZHVsZSB7XG59XG4iXX0=