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
import { AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { AjfNodeIconModule } from '@ajf/material/node-icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AjfFbBranchLine } from './branch-line';
import { AjfFbChoicesOriginEditor } from './choices-origin-editor';
import { AjfFbChoicesOriginEditorDialog } from './choices-origin-editor-dialog';
import { AjfFbConditionEditor } from './condition-editor';
import { AjfFbConditionEditorDialog } from './condition-editor-dialog';
import { AjfFormBuilder } from './form-builder';
import { AjfFormBuilderService } from './form-builder-service';
import { AjfFbNodeEntry } from './node-entry';
import { AjfFbNodeProperties } from './node-properties';
import { AjfFbNodeTypeEntry } from './node-type-entry';
import { AjfFbStringIdentifierDialogComponent } from './string-identifier-dialog';
import { AjfFbValidationConditionEditorDialog } from './validation-condition-editor-dialog';
import { AjfFbWarningConditionEditorDialog } from './warning-condition-editor-dialog';
let AjfFormBuilderModule = /** @class */ (() => {
    let AjfFormBuilderModule = class AjfFormBuilderModule {
    };
    AjfFormBuilderModule = __decorate([
        NgModule({
            imports: [
                AjfMonacoEditorModule, AjfNodeIconModule, CommonModule, DragDropModule,
                FormsModule, MatAutocompleteModule, MatButtonModule, MatCardModule,
                MatCheckboxModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
                MatIconModule, MatInputModule, MatListModule, MatMenuModule,
                MatSelectModule, MatSidenavModule, MatSliderModule, MatTableModule,
                MatToolbarModule, MatTooltipModule, ReactiveFormsModule, TranslateModule,
            ],
            declarations: [
                AjfFbBranchLine,
                AjfFbChoicesOriginEditor,
                AjfFbChoicesOriginEditorDialog,
                AjfFbConditionEditor,
                AjfFbConditionEditorDialog,
                AjfFbNodeEntry,
                AjfFbNodeProperties,
                AjfFbNodeTypeEntry,
                AjfFbStringIdentifierDialogComponent,
                AjfFbValidationConditionEditorDialog,
                AjfFbWarningConditionEditorDialog,
                AjfFormBuilder,
            ],
            exports: [
                AjfFormBuilder,
            ],
            providers: [
                AjfFormBuilderService,
            ],
        })
    ], AjfFormBuilderModule);
    return AjfFormBuilderModule;
})();
export { AjfFormBuilderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvZm9ybS1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBZ0NwRjtJQUFBLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0tBQ2hDLENBQUE7SUFEWSxvQkFBb0I7UUE5QmhDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxxQkFBcUIsRUFBRSxpQkFBaUIsRUFBTSxZQUFZLEVBQVMsY0FBYztnQkFDakYsV0FBVyxFQUFZLHFCQUFxQixFQUFFLGVBQWUsRUFBTSxhQUFhO2dCQUNoRixpQkFBaUIsRUFBTSxjQUFjLEVBQVMsZUFBZSxFQUFNLGtCQUFrQjtnQkFDckYsYUFBYSxFQUFVLGNBQWMsRUFBUyxhQUFhLEVBQVEsYUFBYTtnQkFDaEYsZUFBZSxFQUFRLGdCQUFnQixFQUFPLGVBQWUsRUFBTSxjQUFjO2dCQUNqRixnQkFBZ0IsRUFBTyxnQkFBZ0IsRUFBTyxtQkFBbUIsRUFBRSxlQUFlO2FBQ25GO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGVBQWU7Z0JBQ2Ysd0JBQXdCO2dCQUN4Qiw4QkFBOEI7Z0JBQzlCLG9CQUFvQjtnQkFDcEIsMEJBQTBCO2dCQUMxQixjQUFjO2dCQUNkLG1CQUFtQjtnQkFDbkIsa0JBQWtCO2dCQUNsQixvQ0FBb0M7Z0JBQ3BDLG9DQUFvQztnQkFDcEMsaUNBQWlDO2dCQUNqQyxjQUFjO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsY0FBYzthQUNmO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHFCQUFxQjthQUN0QjtTQUNGLENBQUM7T0FDVyxvQkFBb0IsQ0FDaEM7SUFBRCwyQkFBQztLQUFBO1NBRFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk1vbmFjb0VkaXRvck1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9tb25hY28tZWRpdG9yJztcbmltcG9ydCB7QWpmTm9kZUljb25Nb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbm9kZS1pY29uJztcbmltcG9ydCB7RHJhZ0Ryb3BNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TWF0QXV0b2NvbXBsZXRlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXRDaGVja2JveE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHtNYXRDaGlwc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hpcHMnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7TWF0TWVudU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2lkZW5hdk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQge01hdFNsaWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7TWF0VGFibGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGV9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZiQnJhbmNoTGluZX0gZnJvbSAnLi9icmFuY2gtbGluZSc7XG5pbXBvcnQge0FqZkZiQ2hvaWNlc09yaWdpbkVkaXRvcn0gZnJvbSAnLi9jaG9pY2VzLW9yaWdpbi1lZGl0b3InO1xuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2d9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3InO1xuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyfSBmcm9tICcuL2Zvcm0tYnVpbGRlcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiTm9kZUVudHJ5fSBmcm9tICcuL25vZGUtZW50cnknO1xuaW1wb3J0IHtBamZGYk5vZGVQcm9wZXJ0aWVzfSBmcm9tICcuL25vZGUtcHJvcGVydGllcyc7XG5pbXBvcnQge0FqZkZiTm9kZVR5cGVFbnRyeX0gZnJvbSAnLi9ub2RlLXR5cGUtZW50cnknO1xuaW1wb3J0IHtBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3ZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZNb25hY29FZGl0b3JNb2R1bGUsIEFqZk5vZGVJY29uTW9kdWxlLCAgICAgQ29tbW9uTW9kdWxlLCAgICAgICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsICAgICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsICAgICBNYXRDaGlwc01vZHVsZSwgICAgICAgIE1hdERpYWxvZ01vZHVsZSwgICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLCAgICAgICAgIE1hdElucHV0TW9kdWxlLCAgICAgICAgTWF0TGlzdE1vZHVsZSwgICAgICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsICAgICAgIE1hdFNpZGVuYXZNb2R1bGUsICAgICAgTWF0U2xpZGVyTW9kdWxlLCAgICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0VG9vbGJhck1vZHVsZSwgICAgICBNYXRUb29sdGlwTW9kdWxlLCAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsIFRyYW5zbGF0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmRmJCcmFuY2hMaW5lLFxuICAgIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvcixcbiAgICBBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2csXG4gICAgQWpmRmJDb25kaXRpb25FZGl0b3IsXG4gICAgQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2csXG4gICAgQWpmRmJOb2RlRW50cnksXG4gICAgQWpmRmJOb2RlUHJvcGVydGllcyxcbiAgICBBamZGYk5vZGVUeXBlRW50cnksXG4gICAgQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50LFxuICAgIEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZyxcbiAgICBBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2csXG4gICAgQWpmRm9ybUJ1aWxkZXIsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZGb3JtQnVpbGRlcixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlck1vZHVsZSB7XG59XG4iXX0=