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
import { AJF_WARNING_ALERT_SERVICE, AjfFormsModule as AjfCoreFormsModule } from '@ajf/core/forms';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import { AjfTimeModule } from '@ajf/material/time';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AjfBarcodeFieldComponent } from './barcode-field';
import { AjfBooleanFieldComponent } from './boolean-field';
import { AjfDateFieldComponent } from './date-field';
import { AjfDateInputFieldComponent } from './date-input-field';
import { AjfEmptyFieldComponent } from './empty-field';
import { AjfFormField } from './field';
import { AjfFieldService } from './field-service';
import { AjfFieldWarningDialog } from './field-warning-dialog';
import { AjfFormRenderer } from './form';
import { AjfInputFieldComponent } from './input-field';
import { AjfMultipleChoiceFieldComponent } from './multiple-choice-field';
import { AjfRangeFieldComponent } from './range-field';
import { AjfSingleChoiceFieldComponent } from './single-choice-field';
import { AjfTableFieldComponent } from './table-field';
import { AjfTextFieldComponent } from './text-field';
import { AjfTimeFieldComponent } from './time-field';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import { AjfWarningAlertService } from './warning-alert-service';
export class AjfFormsModule {
    static forRoot() {
        return {
            ngModule: AjfFormsModule,
            providers: [
                AjfFieldService,
            ],
        };
    }
}
AjfFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfBarcodeModule, AjfCalendarModule, AjfCommonModule, AjfCoreFormsModule,
                    AjfCheckboxGroupModule, AjfPageSliderModule, AjfTimeModule, AjfTranslocoModule,
                    CommonModule, MatButtonModule, MatCardModule, MatDialogModule,
                    MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule,
                    MatSelectModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule,
                    ReactiveFormsModule, TextFieldModule, MatSliderModule
                ],
                declarations: [
                    AjfBarcodeFieldComponent, AjfBooleanFieldComponent, AjfDateFieldComponent,
                    AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfFieldWarningDialog, AjfFormField,
                    AjfFormRenderer, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent,
                    AjfRangeFieldComponent, AjfSingleChoiceFieldComponent, AjfTableFieldComponent,
                    AjfTextFieldComponent, AjfTimeFieldComponent, AjfVideoUrlFieldComponent
                ],
                entryComponents: [
                    AjfBarcodeFieldComponent, AjfBooleanFieldComponent, AjfDateFieldComponent,
                    AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfInputFieldComponent,
                    AjfMultipleChoiceFieldComponent, AjfRangeFieldComponent, AjfSingleChoiceFieldComponent,
                    AjfTableFieldComponent, AjfTextFieldComponent, AjfTimeFieldComponent, AjfVideoUrlFieldComponent
                ],
                exports: [
                    AjfFormField,
                    AjfFormRenderer,
                ],
                providers: [
                    AjfFieldService,
                    { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
                ],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL2Zvcm1zLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGNBQWMsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FB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b0JBQ2Ysd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCO29CQUN6RSwwQkFBMEIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0I7b0JBQzFFLCtCQUErQixFQUFFLHNCQUFzQixFQUFFLDZCQUE2QjtvQkFDdEYsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUseUJBQXlCO2lCQUNoRztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixlQUFlO2lCQUNoQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsZUFBZTtvQkFDZixFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUM7aUJBQ3ZFO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmRm9ybXNNb2R1bGUgYXMgQWpmQ29yZUZvcm1zTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZUcmFuc2xvY29Nb2R1bGV9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtBamZCYXJjb2RlTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2JhcmNvZGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhck1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9jYWxlbmRhcic7XG5pbXBvcnQge0FqZkNoZWNrYm94R3JvdXBNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvY2hlY2tib3gtZ3JvdXAnO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7QWpmVGltZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC90aW1lJztcbmltcG9ydCB7VGV4dEZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdGV4dC1maWVsZCc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7TWF0Q2FyZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQge01hdERpYWxvZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0Rm9ybUZpZWxkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7TWF0SWNvbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQge01hdElucHV0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQge01hdFJhZGlvTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XG5pbXBvcnQge01hdFNlbGVjdE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge01hdFNsaWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyJztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQge01hdFRvb2x0aXBNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQge0FqZkJhcmNvZGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXJjb2RlLWZpZWxkJztcbmltcG9ydCB7QWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jvb2xlYW4tZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlRmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2VtcHR5LWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRTZXJ2aWNlfSBmcm9tICcuL2ZpZWxkLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZGaWVsZFdhcm5pbmdEaWFsb2d9IGZyb20gJy4vZmllbGQtd2FybmluZy1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJ9IGZyb20gJy4vZm9ybSc7XG5pbXBvcnQge0FqZklucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL211bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlJhbmdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmFuZ2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRleHRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFqZkJhcmNvZGVNb2R1bGUsICAgICAgIEFqZkNhbGVuZGFyTW9kdWxlLCAgICBBamZDb21tb25Nb2R1bGUsICBBamZDb3JlRm9ybXNNb2R1bGUsXG4gICAgQWpmQ2hlY2tib3hHcm91cE1vZHVsZSwgQWpmUGFnZVNsaWRlck1vZHVsZSwgIEFqZlRpbWVNb2R1bGUsICAgIEFqZlRyYW5zbG9jb01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsICAgICAgICAgICBNYXRCdXR0b25Nb2R1bGUsICAgICAgTWF0Q2FyZE1vZHVsZSwgICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSwgICAgIE1hdEljb25Nb2R1bGUsICAgICAgICBNYXRJbnB1dE1vZHVsZSwgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsICAgICAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSwgTWF0VG9vbGJhck1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLCAgICBUZXh0RmllbGRNb2R1bGUsICAgICAgTWF0U2xpZGVyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkJhcmNvZGVGaWVsZENvbXBvbmVudCwgQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LCBBamZEYXRlRmllbGRDb21wb25lbnQsXG4gICAgQWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnQsIEFqZkVtcHR5RmllbGRDb21wb25lbnQsIEFqZkZpZWxkV2FybmluZ0RpYWxvZywgQWpmRm9ybUZpZWxkLFxuICAgIEFqZkZvcm1SZW5kZXJlciwgQWpmSW5wdXRGaWVsZENvbXBvbmVudCwgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZSYW5nZUZpZWxkQ29tcG9uZW50LCBBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudCwgQWpmVGFibGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZUZXh0RmllbGRDb21wb25lbnQsIEFqZlRpbWVGaWVsZENvbXBvbmVudCwgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsIEFqZkJvb2xlYW5GaWVsZENvbXBvbmVudCwgQWpmRGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50LCBBamZFbXB0eUZpZWxkQ29tcG9uZW50LCBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnQsIEFqZlJhbmdlRmllbGRDb21wb25lbnQsIEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlRmllbGRDb21wb25lbnQsIEFqZlRleHRGaWVsZENvbXBvbmVudCwgQWpmVGltZUZpZWxkQ29tcG9uZW50LCBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZGb3JtRmllbGQsXG4gICAgQWpmRm9ybVJlbmRlcmVyLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBBamZGaWVsZFNlcnZpY2UsXG4gICAge3Byb3ZpZGU6IEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIHVzZUNsYXNzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybXNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZkZvcm1zTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBamZGb3Jtc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBamZGaWVsZFNlcnZpY2UsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==