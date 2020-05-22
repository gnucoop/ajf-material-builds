import { __decorate, __metadata } from "tslib";
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
import { AjfFieldService as CoreService, AjfFieldType, AjfReadOnlyFieldComponent, AjfReadOnlyTableFieldComponent } from '@ajf/core/forms';
import { Injectable } from '@angular/core';
import { AjfBarcodeFieldComponent } from './barcode-field';
import { AjfBooleanFieldComponent } from './boolean-field';
import { AjfDateFieldComponent } from './date-field';
import { AjfDateInputFieldComponent } from './date-input-field';
import { AjfEmptyFieldComponent } from './empty-field';
import { AjfInputFieldComponent } from './input-field';
import { AjfMultipleChoiceFieldComponent } from './multiple-choice-field';
import { AjfSingleChoiceFieldComponent } from './single-choice-field';
import { AjfTableFieldComponent } from './table-field';
import { AjfTimeFieldComponent } from './time-field';
import * as i0 from "@angular/core";
let AjfFieldService = /** @class */ (() => {
    let AjfFieldService = class AjfFieldService extends CoreService {
        constructor() {
            super();
            this.componentsMap[AjfFieldType.String] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent
            },
                this.componentsMap[AjfFieldType.Text] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Number] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent,
                    inputs: { type: 'number' }
                },
                this.componentsMap[AjfFieldType.Boolean] = {
                    component: AjfBooleanFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Formula] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent,
                    inputs: { readonly: true }
                },
                this.componentsMap[AjfFieldType.Date] = {
                    component: AjfDateFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.DateInput] = {
                    component: AjfDateInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Table] = {
                    component: AjfTableFieldComponent,
                    readOnlyComponent: AjfReadOnlyTableFieldComponent
                },
                this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
                this.componentsMap[AjfFieldType.SingleChoice] = {
                    component: AjfSingleChoiceFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.MultipleChoice] = {
                    component: AjfMultipleChoiceFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Time] = {
                    component: AjfTimeFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Barcode] = {
                    component: AjfBarcodeFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                };
        }
    };
    AjfFieldService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
    AjfFieldService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], AjfFieldService);
    return AjfFieldService;
})();
export { AjfFieldService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsZUFBZSxJQUFJLFdBQVcsRUFDOUIsWUFBWSxFQUNaLHlCQUF5QixFQUN6Qiw4QkFBOEIsRUFDL0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQywrQkFBK0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBR25EO0lBQUEsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxXQUFXO1FBQzlDO1lBQ0UsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRztnQkFDeEMsU0FBUyxFQUFFLHNCQUFzQjtnQkFDakMsaUJBQWlCLEVBQUUseUJBQXlCO2FBQzdDO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUN0QyxTQUFTLEVBQUUsc0JBQXNCO29CQUNqQyxpQkFBaUIsRUFBRSx5QkFBeUI7aUJBQzdDO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHO29CQUN4QyxTQUFTLEVBQUUsc0JBQXNCO29CQUNqQyxpQkFBaUIsRUFBRSx5QkFBeUI7b0JBQzVDLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7aUJBQ3pCO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29CQUN6QyxTQUFTLEVBQUUsd0JBQXdCO29CQUNuQyxpQkFBaUIsRUFBRSx5QkFBeUI7aUJBQzdDO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29CQUN6QyxTQUFTLEVBQUUsc0JBQXNCO29CQUNqQyxpQkFBaUIsRUFBRSx5QkFBeUI7b0JBQzVDLE1BQU0sRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7aUJBQ3pCO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUN0QyxTQUFTLEVBQUUscUJBQXFCO29CQUNoQyxpQkFBaUIsRUFBRSx5QkFBeUI7aUJBQzdDO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHO29CQUMzQyxTQUFTLEVBQUUsMEJBQTBCO29CQUNyQyxpQkFBaUIsRUFBRSx5QkFBeUI7aUJBQzdDO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHO29CQUN2QyxTQUFTLEVBQUUsc0JBQXNCO29CQUNqQyxpQkFBaUIsRUFBRSw4QkFBOEI7aUJBQ2xEO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO2dCQUM1RSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsR0FBRztvQkFDOUMsU0FBUyxFQUFFLDZCQUE2QjtvQkFDeEMsaUJBQWlCLEVBQUUseUJBQXlCO2lCQUM3QztnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRztvQkFDaEQsU0FBUyxFQUFFLCtCQUErQjtvQkFDMUMsaUJBQWlCLEVBQUUseUJBQXlCO2lCQUM3QztnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRztvQkFDdEMsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsaUJBQWlCLEVBQUUseUJBQXlCO2lCQUM3QztnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRztvQkFDekMsU0FBUyxFQUFFLHdCQUF3QjtvQkFDbkMsaUJBQWlCLEVBQUUseUJBQXlCO2lCQUM3QyxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUE7O0lBdkRZLGVBQWU7UUFEM0IsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDOztPQUNwQixlQUFlLENBdUQzQjswQkFqR0Q7S0FpR0M7U0F2RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmRmllbGRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZCYXJjb2RlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFyY29kZS1maWVsZCc7XG5pbXBvcnQge0FqZkJvb2xlYW5GaWVsZENvbXBvbmVudH0gZnJvbSAnLi9ib29sZWFuLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWlucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmRW1wdHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZklucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL211bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3NpbmdsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBamZGaWVsZFNlcnZpY2UgZXh0ZW5kcyBDb3JlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5TdHJpbmddID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGV4dF0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5OdW1iZXJdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICBpbnB1dHM6IHt0eXBlOiAnbnVtYmVyJ31cbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQm9vbGVhbl0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkJvb2xlYW5GaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkZvcm11bGFdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICBpbnB1dHM6IHtyZWFkb25seTogdHJ1ZX1cbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRGF0ZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVJbnB1dF0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGFibGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5FbXB0eV0gPSB7Y29tcG9uZW50OiBBamZFbXB0eUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2VdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGltZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlRpbWVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJhcmNvZGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH07XG4gIH1cbn1cbiJdfQ==