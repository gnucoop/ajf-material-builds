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
import { AjfFieldService as CoreService, AjfFieldType, AjfFileFieldComponent, AjfImageFieldComponent, AjfReadOnlyFieldComponent, AjfReadOnlyFileFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlySelectFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlyVideoUrlFieldComponent, } from '@ajf/core/forms';
import { Injectable } from '@angular/core';
import { AjfBarcodeFieldComponent } from './barcode-field';
import { AjfBooleanFieldComponent } from './boolean-field';
import { AjfDateFieldComponent } from './date-field';
import { AjfDateInputFieldComponent } from './date-input-field';
import { AjfEmptyFieldComponent } from './empty-field';
import { AjfInputFieldComponent } from './input-field';
import { AjfMultipleChoiceFieldComponent } from './multiple-choice-field';
import { AjfRangeFieldComponent } from './range-field';
import { AjfSingleChoiceFieldComponent } from './single-choice-field';
import { AjfTableFieldComponent } from './table-field';
import { AjfTextFieldComponent } from './text-field';
import { AjfTimeFieldComponent } from './time-field';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import * as i0 from "@angular/core";
export class AjfFieldService extends CoreService {
    constructor() {
        super();
        (this.componentsMap[AjfFieldType.String] = {
            component: AjfInputFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent,
        }),
            (this.componentsMap[AjfFieldType.Text] = {
                component: AjfTextFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Number] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
                inputs: { type: 'number' },
            }),
            (this.componentsMap[AjfFieldType.Boolean] = {
                component: AjfBooleanFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Formula] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
                inputs: { readonly: true },
            }),
            (this.componentsMap[AjfFieldType.Date] = {
                component: AjfDateFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.DateInput] = {
                component: AjfDateInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Table] = {
                component: AjfTableFieldComponent,
                readOnlyComponent: AjfReadOnlyTableFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent }),
            (this.componentsMap[AjfFieldType.SingleChoice] = {
                component: AjfSingleChoiceFieldComponent,
                readOnlyComponent: AjfReadOnlySelectFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.MultipleChoice] = {
                component: AjfMultipleChoiceFieldComponent,
                readOnlyComponent: AjfReadOnlySelectFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Time] = {
                component: AjfTimeFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Barcode] = {
                component: AjfBarcodeFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            });
        this.componentsMap[AjfFieldType.File] = {
            component: AjfFileFieldComponent,
            readOnlyComponent: AjfReadOnlyFileFieldComponent,
        };
        this.componentsMap[AjfFieldType.Image] = {
            component: AjfImageFieldComponent,
            readOnlyComponent: AjfReadOnlyImageFieldComponent,
        };
        this.componentsMap[AjfFieldType.VideoUrl] = {
            component: AjfVideoUrlFieldComponent,
            readOnlyComponent: AjfReadOnlyVideoUrlFieldComponent,
        };
        this.componentsMap[AjfFieldType.Range] = {
            component: AjfRangeFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent,
        };
    }
}
AjfFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCxlQUFlLElBQUksV0FBVyxFQUM5QixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIsNkJBQTZCLEVBQzdCLDhCQUE4QixFQUM5QiwrQkFBK0IsRUFDL0IsOEJBQThCLEVBQzlCLGlDQUFpQyxHQUNsQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0s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Q0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQ3ZDLFNBQVMsRUFBRSxzQkFBc0I7WUFDakMsaUJBQWlCLEVBQUUsOEJBQThCO1NBQ2xELENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRztZQUMxQyxTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLGlCQUFpQixFQUFFLGlDQUFpQztTQUNyRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDdkMsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxpQkFBaUIsRUFBRSx5QkFBeUI7U0FDN0MsQ0FBQztJQUNKLENBQUM7O29IQXRFVSxlQUFlO3dIQUFmLGVBQWUsY0FESCxNQUFNO21HQUNsQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmRmllbGRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkJhcmNvZGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXJjb2RlLWZpZWxkJztcbmltcG9ydCB7QWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jvb2xlYW4tZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlRmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2VtcHR5LWZpZWxkJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmUmFuZ2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9yYW5nZS1maWVsZCc7XG5pbXBvcnQge0FqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3NpbmdsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmVGV4dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RleHQtZmllbGQnO1xuaW1wb3J0IHtBamZUaW1lRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGltZS1maWVsZCc7XG5pbXBvcnQge0FqZlZpZGVvVXJsRmllbGRDb21wb25lbnR9IGZyb20gJy4vdmlkZW8tdXJsLWZpZWxkJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQWpmRmllbGRTZXJ2aWNlIGV4dGVuZHMgQ29yZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlN0cmluZ10gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRleHRdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZlRleHRGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLk51bWJlcl0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICAgIGlucHV0czoge3R5cGU6ICdudW1iZXInfSxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQm9vbGVhbl0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LFxuICAgICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRm9ybXVsYV0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICAgIGlucHV0czoge3JlYWRvbmx5OiB0cnVlfSxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRGF0ZV0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmRGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRGF0ZUlucHV0XSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRhYmxlXSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5FbXB0eV0gPSB7Y29tcG9uZW50OiBBamZFbXB0eUZpZWxkQ29tcG9uZW50fSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2VdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2VdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UaW1lXSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZUaW1lRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5CYXJjb2RlXSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgfSk7XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5GaWxlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICAgIH07XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5JbWFnZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgIH07XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5WaWRlb1VybF0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgIH07XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5SYW5nZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlJhbmdlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICB9O1xuICB9XG59XG4iXX0=