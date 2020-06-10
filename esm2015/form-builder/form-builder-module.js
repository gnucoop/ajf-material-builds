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
    class AjfFormBuilderModule {
    }
    AjfFormBuilderModule.decorators = [
        { type: NgModule, args: [{
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
                },] }
    ];
    return AjfFormBuilderModule;
})();
export { AjfFormBuilderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvZm9ybS1idWlsZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDakUsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDMUYsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFcEY7SUFBQSxNQThCYSxvQkFBb0I7OztnQkE5QmhDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AscUJBQXFCLEVBQUUsaUJBQWlCLEVBQU0sWUFBWSxFQUFTLGNBQWM7d0JBQ2pGLFdBQVcsRUFBWSxxQkFBcUIsRUFBRSxlQUFlLEVBQU0sYUFBYTt3QkFDaEYsaUJBQWlCLEVBQU0sY0FBYyxFQUFTLGVBQWUsRUFBTSxrQkFBa0I7d0JBQ3JGLGFBQWEsRUFBVSxjQUFjLEVBQVMsYUFBYSxFQUFRLGFBQWE7d0JBQ2hGLGVBQWUsRUFBUSxnQkFBZ0IsRUFBTyxlQUFlLEVBQU0sY0FBYzt3QkFDakYsZ0JBQWdCLEVBQU8sZ0JBQWdCLEVBQU8sbUJBQW1CLEVBQUUsZUFBZTtxQkFDbkY7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGVBQWU7d0JBQ2Ysd0JBQXdCO3dCQUN4Qiw4QkFBOEI7d0JBQzlCLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQixjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixvQ0FBb0M7d0JBQ3BDLG9DQUFvQzt3QkFDcEMsaUNBQWlDO3dCQUNqQyxjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxjQUFjO3FCQUNmO29CQUNELFNBQVMsRUFBRTt3QkFDVCxxQkFBcUI7cUJBQ3RCO2lCQUNGOztJQUVELDJCQUFDO0tBQUE7U0FEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTW9uYWNvRWRpdG9yTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL21vbmFjby1lZGl0b3InO1xuaW1wb3J0IHtBamZOb2RlSWNvbk1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9ub2RlLWljb24nO1xuaW1wb3J0IHtEcmFnRHJvcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRBdXRvY29tcGxldGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQge01hdENoZWNrYm94TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQge01hdENoaXBzTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQge01hdElucHV0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQge01hdExpc3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2xpc3QnO1xuaW1wb3J0IHtNYXRNZW51TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHtNYXRTaWRlbmF2TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2JztcbmltcG9ydCB7TWF0U2xpZGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuaW1wb3J0IHtNYXRUYWJsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHtNYXRUb29sYmFyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7QWpmRmJCcmFuY2hMaW5lfSBmcm9tICcuL2JyYW5jaC1saW5lJztcbmltcG9ydCB7QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWVkaXRvcic7XG5pbXBvcnQge0FqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jaG9pY2VzLW9yaWdpbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJ9IGZyb20gJy4vZm9ybS1idWlsZGVyJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmJOb2RlRW50cnl9IGZyb20gJy4vbm9kZS1lbnRyeSc7XG5pbXBvcnQge0FqZkZiTm9kZVByb3BlcnRpZXN9IGZyb20gJy4vbm9kZS1wcm9wZXJ0aWVzJztcbmltcG9ydCB7QWpmRmJOb2RlVHlwZUVudHJ5fSBmcm9tICcuL25vZGUtdHlwZS1lbnRyeSc7XG5pbXBvcnQge0FqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi93YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFqZk1vbmFjb0VkaXRvck1vZHVsZSwgQWpmTm9kZUljb25Nb2R1bGUsICAgICBDb21tb25Nb2R1bGUsICAgICAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSwgICAgICAgICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSwgICAgIE1hdENoaXBzTW9kdWxlLCAgICAgICAgTWF0RGlhbG9nTW9kdWxlLCAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsICAgICAgICAgTWF0SW5wdXRNb2R1bGUsICAgICAgICBNYXRMaXN0TW9kdWxlLCAgICAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSwgICAgICAgTWF0U2lkZW5hdk1vZHVsZSwgICAgICBNYXRTbGlkZXJNb2R1bGUsICAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLCAgICAgIE1hdFRvb2x0aXBNb2R1bGUsICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSwgVHJhbnNsYXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZGYkJyYW5jaExpbmUsXG4gICAgQWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yLFxuICAgIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZyxcbiAgICBBamZGYkNvbmRpdGlvbkVkaXRvcixcbiAgICBBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyxcbiAgICBBamZGYk5vZGVFbnRyeSxcbiAgICBBamZGYk5vZGVQcm9wZXJ0aWVzLFxuICAgIEFqZkZiTm9kZVR5cGVFbnRyeSxcbiAgICBBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQsXG4gICAgQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nLFxuICAgIEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyxcbiAgICBBamZGb3JtQnVpbGRlcixcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkZvcm1CdWlsZGVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyTW9kdWxlIHtcbn1cbiJdfQ==