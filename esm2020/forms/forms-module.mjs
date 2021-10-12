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
import * as i0 from "@angular/core";
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
AjfFormsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfFormsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, declarations: [AjfBarcodeFieldComponent, AjfBooleanFieldComponent, AjfDateFieldComponent,
        AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfFieldWarningDialog, AjfFormField,
        AjfFormRenderer, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent,
        AjfRangeFieldComponent, AjfSingleChoiceFieldComponent, AjfTableFieldComponent,
        AjfTextFieldComponent, AjfTimeFieldComponent, AjfVideoUrlFieldComponent], imports: [AjfBarcodeModule, AjfCalendarModule, AjfCommonModule, AjfCoreFormsModule,
        AjfCheckboxGroupModule, AjfPageSliderModule, AjfTimeModule, AjfTranslocoModule,
        CommonModule, MatButtonModule, MatCardModule, MatDialogModule,
        MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule,
        MatSelectModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule,
        ReactiveFormsModule, TextFieldModule, MatSliderModule], exports: [AjfFormField,
        AjfFormRenderer] });
AjfFormsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, providers: [
        AjfFieldService,
        { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
    ], imports: [[
            AjfBarcodeModule, AjfCalendarModule, AjfCommonModule, AjfCoreFormsModule,
            AjfCheckboxGroupModule, AjfPageSliderModule, AjfTimeModule, AjfTranslocoModule,
            CommonModule, MatButtonModule, MatCardModule, MatDialogModule,
            MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule,
            MatSelectModule, MatSlideToggleModule, MatToolbarModule, MatTooltipModule,
            ReactiveFormsModule, TextFieldModule, MatSliderModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormsModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL2Zvcm1zLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGNBQWMsSUFBSSxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FB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QXFCO3dCQUN6RSwwQkFBMEIsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0I7d0JBQzFFLCtCQUErQixFQUFFLHNCQUFzQixFQUFFLDZCQUE2Qjt3QkFDdEYsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUseUJBQXlCO3FCQUNoRztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3FCQUNoQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsZUFBZTt3QkFDZixFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUM7cUJBQ3ZFO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZkZvcm1zTW9kdWxlIGFzIEFqZkNvcmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmVHJhbnNsb2NvTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7QWpmQmFyY29kZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9iYXJjb2RlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvY2FsZW5kYXInO1xuaW1wb3J0IHtBamZDaGVja2JveEdyb3VwTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwJztcbmltcG9ydCB7QWpmUGFnZVNsaWRlck1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9wYWdlLXNsaWRlcic7XG5pbXBvcnQge0FqZlRpbWVNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvdGltZSc7XG5pbXBvcnQge1RleHRGaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RleHQtZmllbGQnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXRCdXR0b25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQge01hdENhcmRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHtNYXREaWFsb2dNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge01hdEZvcm1GaWVsZE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQge01hdEljb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHtNYXRJbnB1dE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHtNYXRSYWRpb01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuaW1wb3J0IHtNYXRTZWxlY3RNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQge01hdFNsaWRlVG9nZ2xlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xuaW1wb3J0IHtNYXRTbGlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQge01hdFRvb2xiYXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXInO1xuaW1wb3J0IHtNYXRUb29sdGlwTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHtBamZCYXJjb2RlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFyY29kZS1maWVsZCc7XG5pbXBvcnQge0FqZkJvb2xlYW5GaWVsZENvbXBvbmVudH0gZnJvbSAnLi9ib29sZWFuLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWlucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmRW1wdHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1GaWVsZH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkU2VydmljZX0gZnJvbSAnLi9maWVsZC1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nRGlhbG9nfSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyfSBmcm9tICcuL2Zvcm0nO1xuaW1wb3J0IHtBamZJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2lucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9tdWx0aXBsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZSYW5nZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3JhbmdlLWZpZWxkJztcbmltcG9ydCB7QWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vc2luZ2xlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZUZXh0RmllbGRDb21wb25lbnR9IGZyb20gJy4vdGV4dC1maWVsZCc7XG5pbXBvcnQge0FqZlRpbWVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90aW1lLWZpZWxkJztcbmltcG9ydCB7QWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudH0gZnJvbSAnLi92aWRlby11cmwtZmllbGQnO1xuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZCYXJjb2RlTW9kdWxlLCAgICAgICBBamZDYWxlbmRhck1vZHVsZSwgICAgQWpmQ29tbW9uTW9kdWxlLCAgQWpmQ29yZUZvcm1zTW9kdWxlLFxuICAgIEFqZkNoZWNrYm94R3JvdXBNb2R1bGUsIEFqZlBhZ2VTbGlkZXJNb2R1bGUsICBBamZUaW1lTW9kdWxlLCAgICBBamZUcmFuc2xvY29Nb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLCAgICAgICAgICAgTWF0QnV0dG9uTW9kdWxlLCAgICAgIE1hdENhcmRNb2R1bGUsICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsICAgICBNYXRJY29uTW9kdWxlLCAgICAgICAgTWF0SW5wdXRNb2R1bGUsICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLCAgICAgICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsIE1hdFRvb2xiYXJNb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSwgICAgVGV4dEZpZWxkTW9kdWxlLCAgICAgIE1hdFNsaWRlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsIEFqZkJvb2xlYW5GaWVsZENvbXBvbmVudCwgQWpmRGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50LCBBamZFbXB0eUZpZWxkQ29tcG9uZW50LCBBamZGaWVsZFdhcm5pbmdEaWFsb2csIEFqZkZvcm1GaWVsZCxcbiAgICBBamZGb3JtUmVuZGVyZXIsIEFqZklucHV0RmllbGRDb21wb25lbnQsIEFqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgQWpmUmFuZ2VGaWVsZENvbXBvbmVudCwgQWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnQsIEFqZlRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGV4dEZpZWxkQ29tcG9uZW50LCBBamZUaW1lRmllbGRDb21wb25lbnQsIEFqZlZpZGVvVXJsRmllbGRDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgQWpmQmFyY29kZUZpZWxkQ29tcG9uZW50LCBBamZCb29sZWFuRmllbGRDb21wb25lbnQsIEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCwgQWpmRW1wdHlGaWVsZENvbXBvbmVudCwgQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50LCBBamZSYW5nZUZpZWxkQ29tcG9uZW50LCBBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZUZpZWxkQ29tcG9uZW50LCBBamZUZXh0RmllbGRDb21wb25lbnQsIEFqZlRpbWVGaWVsZENvbXBvbmVudCwgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmRm9ybUZpZWxkLFxuICAgIEFqZkZvcm1SZW5kZXJlcixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQWpmRmllbGRTZXJ2aWNlLFxuICAgIHtwcm92aWRlOiBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCB1c2VDbGFzczogQWpmV2FybmluZ0FsZXJ0U2VydmljZX0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1zTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBamZGb3Jtc01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQWpmRm9ybXNNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQWpmRmllbGRTZXJ2aWNlLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=