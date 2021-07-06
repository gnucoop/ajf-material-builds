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
                    AjfCheckboxGroupModule, AjfPageSliderModule, AjfTimeModule, CommonModule,
                    MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
                    MatIconModule, MatInputModule, MatRadioModule, MatSelectModule,
                    MatSlideToggleModule, MatToolbarModule, MatTooltipModule, ReactiveFormsModule,
                    TextFieldModule, AjfTranslocoModule,
                ],
                declarations: [
                    AjfBarcodeFieldComponent,
                    AjfBooleanFieldComponent,
                    AjfDateFieldComponent,
                    AjfDateInputFieldComponent,
                    AjfEmptyFieldComponent,
                    AjfFieldWarningDialog,
                    AjfFormField,
                    AjfFormRenderer,
                    AjfInputFieldComponent,
                    AjfMultipleChoiceFieldComponent,
                    AjfSingleChoiceFieldComponent,
                    AjfTableFieldComponent,
                    AjfTextFieldComponent,
                    AjfTimeFieldComponent,
                    AjfVideoUrlFieldComponent,
                ],
                entryComponents: [
                    AjfBarcodeFieldComponent,
                    AjfBooleanFieldComponent,
                    AjfDateFieldComponent,
                    AjfDateInputFieldComponent,
                    AjfEmptyFieldComponent,
                    AjfInputFieldComponent,
                    AjfMultipleChoiceFieldComponent,
                    AjfSingleChoiceFieldComponent,
                    AjfTableFieldComponent,
                    AjfTextFieldComponent,
                    AjfTimeFieldComponent,
                    AjfVideoUrlFieldComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL2Zvcm1zLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGNBQWMsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FB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K0JBQStCO29CQUMvQiw2QkFBNkI7b0JBQzdCLHNCQUFzQjtvQkFDdEIscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLHlCQUF5QjtpQkFDMUI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtpQkFDaEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULGVBQWU7b0JBQ2YsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFDO2lCQUN2RTthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZkZvcm1zTW9kdWxlIGFzIEFqZkNvcmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmVHJhbnNsb2NvTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7QWpmQmFyY29kZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9iYXJjb2RlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvY2FsZW5kYXInO1xuaW1wb3J0IHtBamZDaGVja2JveEdyb3VwTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwJztcbmltcG9ydCB7QWpmUGFnZVNsaWRlck1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9wYWdlLXNsaWRlcic7XG5pbXBvcnQge0FqZlRpbWVNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvdGltZSc7XG5pbXBvcnQge1RleHRGaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RleHQtZmllbGQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtNYXRSYWRpb01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHtNYXRUb29sYmFyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7TWF0VG9vbHRpcE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmltcG9ydCB7QWpmQmFyY29kZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2JhcmNvZGUtZmllbGQnO1xuaW1wb3J0IHtBamZCb29sZWFuRmllbGRDb21wb25lbnR9IGZyb20gJy4vYm9vbGVhbi1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGRDb21wb25lbnR9IGZyb20gJy4vZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtRmllbGR9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFNlcnZpY2V9IGZyb20gJy4vZmllbGQtc2VydmljZSc7XG5pbXBvcnQge0FqZkZpZWxkV2FybmluZ0RpYWxvZ30gZnJvbSAnLi9maWVsZC13YXJuaW5nLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlcn0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vc2luZ2xlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZUZXh0RmllbGRDb21wb25lbnR9IGZyb20gJy4vdGV4dC1maWVsZCc7XG5pbXBvcnQge0FqZlRpbWVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90aW1lLWZpZWxkJztcbmltcG9ydCB7QWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudH0gZnJvbSAnLi92aWRlby11cmwtZmllbGQnO1xuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZCYXJjb2RlTW9kdWxlLCAgICAgICBBamZDYWxlbmRhck1vZHVsZSwgICBBamZDb21tb25Nb2R1bGUsICBBamZDb3JlRm9ybXNNb2R1bGUsXG4gICAgQWpmQ2hlY2tib3hHcm91cE1vZHVsZSwgQWpmUGFnZVNsaWRlck1vZHVsZSwgQWpmVGltZU1vZHVsZSwgICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSwgICAgICAgIE1hdENhcmRNb2R1bGUsICAgICAgIE1hdERpYWxvZ01vZHVsZSwgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLCAgICAgICAgICBNYXRJbnB1dE1vZHVsZSwgICAgICBNYXRSYWRpb01vZHVsZSwgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsICAgTWF0VG9vbGJhck1vZHVsZSwgICAgTWF0VG9vbHRpcE1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBUZXh0RmllbGRNb2R1bGUsICAgICAgICBBamZUcmFuc2xvY29Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkJhcmNvZGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZCb29sZWFuRmllbGRDb21wb25lbnQsXG4gICAgQWpmRGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkVtcHR5RmllbGRDb21wb25lbnQsXG4gICAgQWpmRmllbGRXYXJuaW5nRGlhbG9nLFxuICAgIEFqZkZvcm1GaWVsZCxcbiAgICBBamZGb3JtUmVuZGVyZXIsXG4gICAgQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGV4dEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRpbWVGaWVsZENvbXBvbmVudCxcbiAgICBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsXG4gICAgQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZFbXB0eUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRleHRGaWVsZENvbXBvbmVudCxcbiAgICBBamZUaW1lRmllbGRDb21wb25lbnQsXG4gICAgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkZvcm1GaWVsZCxcbiAgICBBamZGb3JtUmVuZGVyZXIsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEFqZkZpZWxkU2VydmljZSxcbiAgICB7cHJvdmlkZTogQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgdXNlQ2xhc3M6IEFqZldhcm5pbmdBbGVydFNlcnZpY2V9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGb3Jtc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWpmRm9ybXNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFqZkZvcm1zTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFqZkZpZWxkU2VydmljZSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19