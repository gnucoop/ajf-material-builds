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
import { AjfTranslocoModule } from '@ajf/core/transloco';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
export class AjfFormBuilderModule {
}
AjfFormBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfMonacoEditorModule, AjfNodeIconModule, CommonModule, DragDropModule,
                    FormsModule, MatAutocompleteModule, MatButtonModule, MatCardModule,
                    MatCheckboxModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
                    MatIconModule, MatInputModule, MatListModule, MatMenuModule,
                    MatSelectModule, MatSidenavModule, MatSliderModule, MatTableModule,
                    MatToolbarModule, MatTooltipModule, ReactiveFormsModule, AjfTranslocoModule,
                    MatExpansionModule, MatSlideToggleModule,
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvZm9ybS1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQWtDcEYsTUFBTSxPQUFPLG9CQUFvQjs7O1lBaENoQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLHFCQUFxQixFQUFFLGlCQUFpQixFQUFNLFlBQVksRUFBUyxjQUFjO29CQUNqRixXQUFXLEVBQVkscUJBQXFCLEVBQUUsZUFBZSxFQUFNLGFBQWE7b0JBQ2hGLGlCQUFpQixFQUFNLGNBQWMsRUFBUyxlQUFlLEVBQU0sa0JBQWtCO29CQUNyRixhQUFhLEVBQVUsY0FBYyxFQUFTLGFBQWEsRUFBUSxhQUFhO29CQUNoRixlQUFlLEVBQVEsZ0JBQWdCLEVBQU8sZUFBZSxFQUFNLGNBQWM7b0JBQ2pGLGdCQUFnQixFQUFPLGdCQUFnQixFQUFPLG1CQUFtQixFQUFFLGtCQUFrQjtvQkFDckYsa0JBQWtCLEVBQUssb0JBQW9CO2lCQUU1QztnQkFDRCxZQUFZLEVBQUU7b0JBQ1osZUFBZTtvQkFDZix3QkFBd0I7b0JBQ3hCLDhCQUE4QjtvQkFDOUIsb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLGNBQWM7b0JBQ2QsbUJBQW1CO29CQUNuQixrQkFBa0I7b0JBQ2xCLG9DQUFvQztvQkFDcEMsb0NBQW9DO29CQUNwQyxpQ0FBaUM7b0JBQ2pDLGNBQWM7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGNBQWM7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHFCQUFxQjtpQkFDdEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZUcmFuc2xvY29Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtBamZNb25hY29FZGl0b3JNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvcic7XG5pbXBvcnQge0FqZk5vZGVJY29uTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL25vZGUtaWNvbic7XG5pbXBvcnQge0RyYWdEcm9wTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdEF1dG9jb21wbGV0ZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHtNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7TWF0Q2hlY2tib3hNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcbmltcG9ydCB7TWF0Q2hpcHNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoaXBzJztcbmltcG9ydCB7TWF0RGlhbG9nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXRFeHBhbnNpb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbic7XG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtNYXRMaXN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7TWF0TWVudU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2lkZW5hdk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2lkZW5hdic7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHtNYXRTbGlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge01hdFRhYmxlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQge01hdFRvb2xiYXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHtNYXRUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHtBamZGYkJyYW5jaExpbmV9IGZyb20gJy4vYnJhbmNoLWxpbmUnO1xuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3J9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yJztcbmltcG9ydCB7QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yRGlhbG9nfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvcn0gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yJztcbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtQnVpbGRlcn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXInO1xuaW1wb3J0IHtBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZGYk5vZGVFbnRyeX0gZnJvbSAnLi9ub2RlLWVudHJ5JztcbmltcG9ydCB7QWpmRmJOb2RlUHJvcGVydGllc30gZnJvbSAnLi9ub2RlLXByb3BlcnRpZXMnO1xuaW1wb3J0IHtBamZGYk5vZGVUeXBlRW50cnl9IGZyb20gJy4vbm9kZS10eXBlLWVudHJ5JztcbmltcG9ydCB7QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi92YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3dhcm5pbmctY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQWpmTW9uYWNvRWRpdG9yTW9kdWxlLCBBamZOb2RlSWNvbk1vZHVsZSwgICAgIENvbW1vbk1vZHVsZSwgICAgICAgIERyYWdEcm9wTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLCAgICAgICAgICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsICAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLCAgICAgTWF0Q2hpcHNNb2R1bGUsICAgICAgICBNYXREaWFsb2dNb2R1bGUsICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSwgICAgICAgICBNYXRJbnB1dE1vZHVsZSwgICAgICAgIE1hdExpc3RNb2R1bGUsICAgICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLCAgICAgICBNYXRTaWRlbmF2TW9kdWxlLCAgICAgIE1hdFNsaWRlck1vZHVsZSwgICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsICAgICAgTWF0VG9vbHRpcE1vZHVsZSwgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBBamZUcmFuc2xvY29Nb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLCAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcblxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZGYkJyYW5jaExpbmUsXG4gICAgQWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yLFxuICAgIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZyxcbiAgICBBamZGYkNvbmRpdGlvbkVkaXRvcixcbiAgICBBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyxcbiAgICBBamZGYk5vZGVFbnRyeSxcbiAgICBBamZGYk5vZGVQcm9wZXJ0aWVzLFxuICAgIEFqZkZiTm9kZVR5cGVFbnRyeSxcbiAgICBBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQsXG4gICAgQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nLFxuICAgIEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyxcbiAgICBBamZGb3JtQnVpbGRlcixcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkZvcm1CdWlsZGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyTW9kdWxlIHtcbn1cbiJdfQ==