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
import { AJF_WARNING_ALERT_SERVICE, AjfFormsModule as AjfCoreFormsModule } from '@ajf/core/forms';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import { AjfTimeModule } from '@ajf/material/time';
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
import { TranslateModule } from '@ngx-translate/core';
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
import { AjfTimeFieldComponent } from './time-field';
import { AjfWarningAlertService } from './warning-alert-service';
let AjfFormsModule = /** @class */ (() => {
    var AjfFormsModule_1;
    let AjfFormsModule = AjfFormsModule_1 = class AjfFormsModule {
        static forRoot() {
            return {
                ngModule: AjfFormsModule_1,
                providers: [
                    AjfFieldService,
                ],
            };
        }
    };
    AjfFormsModule = AjfFormsModule_1 = __decorate([
        NgModule({
            imports: [
                AjfBarcodeModule, AjfCalendarModule, AjfCommonModule, AjfCoreFormsModule,
                AjfCheckboxGroupModule, AjfPageSliderModule, AjfTimeModule, CommonModule,
                MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
                MatIconModule, MatInputModule, MatRadioModule, MatSelectModule,
                MatSlideToggleModule, MatToolbarModule, ReactiveFormsModule, TranslateModule,
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
                AjfTimeFieldComponent,
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
                AjfTimeFieldComponent,
            ],
            exports: [
                AjfFormField,
                AjfFormRenderer,
            ],
            providers: [
                AjfFieldService,
                { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
            ],
        })
    ], AjfFormsModule);
    return AjfFormsModule;
})();
export { AjfFormsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL2Zvcm1zLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyx5QkFBeUIsRUFBRSxjQUFjLElBQUksa0JBQWtCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFD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T0FDVyxjQUFjLENBUzFCO0lBQUQscUJBQUM7S0FBQTtTQVRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmRm9ybXNNb2R1bGUgYXMgQWpmQ29yZUZvcm1zTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZCYXJjb2RlTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL2JhcmNvZGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhck1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC9jYWxlbmRhcic7XG5pbXBvcnQge0FqZkNoZWNrYm94R3JvdXBNb2R1bGV9IGZyb20gJ0BhamYvbWF0ZXJpYWwvY2hlY2tib3gtZ3JvdXAnO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyTW9kdWxlfSBmcm9tICdAYWpmL21hdGVyaWFsL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7QWpmVGltZU1vZHVsZX0gZnJvbSAnQGFqZi9tYXRlcmlhbC90aW1lJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHtNYXRDYXJkTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7TWF0RGlhbG9nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtNYXRGb3JtRmllbGRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7TWF0SW5wdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7TWF0UmFkaW9Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcbmltcG9ydCB7TWF0U2VsZWN0TW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHtNYXRTbGlkZVRvZ2dsZU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7TWF0VG9vbGJhck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbGJhcic7XG5pbXBvcnQge1RyYW5zbGF0ZU1vZHVsZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFyY29kZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2JhcmNvZGUtZmllbGQnO1xuaW1wb3J0IHtBamZCb29sZWFuRmllbGRDb21wb25lbnR9IGZyb20gJy4vYm9vbGVhbi1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGRDb21wb25lbnR9IGZyb20gJy4vZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtRmllbGR9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFNlcnZpY2V9IGZyb20gJy4vZmllbGQtc2VydmljZSc7XG5pbXBvcnQge0FqZkZpZWxkV2FybmluZ0RpYWxvZ30gZnJvbSAnLi9maWVsZC13YXJuaW5nLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlcn0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vc2luZ2xlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZUaW1lRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGltZS1maWVsZCc7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEFqZkJhcmNvZGVNb2R1bGUsICAgICAgIEFqZkNhbGVuZGFyTW9kdWxlLCAgIEFqZkNvbW1vbk1vZHVsZSwgICAgIEFqZkNvcmVGb3Jtc01vZHVsZSxcbiAgICBBamZDaGVja2JveEdyb3VwTW9kdWxlLCBBamZQYWdlU2xpZGVyTW9kdWxlLCBBamZUaW1lTW9kdWxlLCAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLCAgICAgICAgTWF0Q2FyZE1vZHVsZSwgICAgICAgTWF0RGlhbG9nTW9kdWxlLCAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsICAgICAgICAgIE1hdElucHV0TW9kdWxlLCAgICAgIE1hdFJhZGlvTW9kdWxlLCAgICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSwgICBNYXRUb29sYmFyTW9kdWxlLCAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBUcmFuc2xhdGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkJhcmNvZGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZCb29sZWFuRmllbGRDb21wb25lbnQsXG4gICAgQWpmRGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkVtcHR5RmllbGRDb21wb25lbnQsXG4gICAgQWpmRmllbGRXYXJuaW5nRGlhbG9nLFxuICAgIEFqZkZvcm1GaWVsZCxcbiAgICBBamZGb3JtUmVuZGVyZXIsXG4gICAgQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgQWpmVGltZUZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsXG4gICAgQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LFxuICAgIEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICBBamZFbXB0eUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICBBamZUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgIEFqZlRpbWVGaWVsZENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkZvcm1GaWVsZCxcbiAgICBBamZGb3JtUmVuZGVyZXIsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEFqZkZpZWxkU2VydmljZSxcbiAgICB7cHJvdmlkZTogQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgdXNlQ2xhc3M6IEFqZldhcm5pbmdBbGVydFNlcnZpY2V9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGb3Jtc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWpmRm9ybXNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFqZkZvcm1zTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFqZkZpZWxkU2VydmljZSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19