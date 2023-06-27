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
import { AjfFieldService as CoreService, AjfFieldType, AjfFileFieldComponent, AjfImageFieldComponent, AjfReadOnlyDateFieldComponent, AjfReadOnlyFieldComponent, AjfReadOnlyFileFieldComponent, AjfReadOnlyGeolocationFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlySelectFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlyVideoUrlFieldComponent, } from '@ajf/core/forms';
import { Injectable } from '@angular/core';
import { AjfBarcodeFieldComponent } from './barcode-field';
import { AjfBooleanFieldComponent } from './boolean-field';
import { AjfDateFieldComponent } from './date-field';
import { AjfDateInputFieldComponent } from './date-input-field';
import { AjfEmptyFieldComponent } from './empty-field';
import { AjfInputFieldComponent } from './input-field';
import { AjfGeolocationFieldComponent } from './geolocation-field';
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
                readOnlyComponent: AjfReadOnlyDateFieldComponent,
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
        this.componentsMap[AjfFieldType.Geolocation] = {
            component: AjfGeolocationFieldComponent,
            readOnlyComponent: AjfReadOnlyGeolocationFieldComponent,
        };
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
AjfFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCxlQUFlLElBQUksV0FBVyxFQUM5QixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0Qiw2QkFBNkIsRUFDN0IseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUM3QixvQ0FBb0MsRUFDcEMsOEJBQThCLEVBQzlCLCtCQUErQixFQUMvQiw4QkFBOEIsRUFDOUIsaUNBQWlDLEdBQ2xDLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FB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R0FBRztZQUM3QyxTQUFTLEVBQUUsNEJBQTRCO1lBQ3ZDLGlCQUFpQixFQUFFLG9DQUFvQztTQUN4RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUc7WUFDdEMsU0FBUyxFQUFFLHFCQUFxQjtZQUNoQyxpQkFBaUIsRUFBRSw2QkFBNkI7U0FDakQsQ0FBQztRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHO1lBQ3ZDLFNBQVMsRUFBRSxzQkFBc0I7WUFDakMsaUJBQWlCLEVBQUUsOEJBQThCO1NBQ2xELENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRztZQUMxQyxTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLGlCQUFpQixFQUFFLGlDQUFpQztTQUNyRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDdkMsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxpQkFBaUIsRUFBRSx5QkFBeUI7U0FDN0MsQ0FBQztJQUNKLENBQUM7OzRHQTFFVSxlQUFlO2dIQUFmLGVBQWUsY0FESCxNQUFNOzJGQUNsQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmRmllbGRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlEYXRlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlTZWxlY3RGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkJhcmNvZGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXJjb2RlLWZpZWxkJztcbmltcG9ydCB7QWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jvb2xlYW4tZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlRmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2VtcHR5LWZpZWxkJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkdlb2xvY2F0aW9uRmllbGRDb21wb25lbnR9IGZyb20gJy4vZ2VvbG9jYXRpb24tZmllbGQnO1xuaW1wb3J0IHtBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL211bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlJhbmdlRmllbGRDb21wb25lbnR9IGZyb20gJy4vcmFuZ2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRleHRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkU2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5TdHJpbmddID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UZXh0XSA9IHtcbiAgICAgICAgY29tcG9uZW50OiBBamZUZXh0RmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5OdW1iZXJdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgICBpbnB1dHM6IHt0eXBlOiAnbnVtYmVyJ30sXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJvb2xlYW5dID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZkJvb2xlYW5GaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkZvcm11bGFdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgICBpbnB1dHM6IHtyZWFkb25seTogdHJ1ZX0sXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVJbnB1dF0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seURhdGVGaWVsZENvbXBvbmVudCxcbiAgICAgIH0pLFxuICAgICAgKHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGFibGVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZlRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkVtcHR5XSA9IHtjb21wb25lbnQ6IEFqZkVtcHR5RmllbGRDb21wb25lbnR9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZV0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVNlbGVjdEZpZWxkQ29tcG9uZW50LFxuICAgICAgfSksXG4gICAgICAodGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZV0gPSB7XG4gICAgICAgIGNvbXBvbmVudDogQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5U2VsZWN0RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRpbWVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZlRpbWVGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KSxcbiAgICAgICh0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJhcmNvZGVdID0ge1xuICAgICAgICBjb21wb25lbnQ6IEFqZkJhcmNvZGVGaWVsZENvbXBvbmVudCxcbiAgICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICB9KTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkdlb2xvY2F0aW9uXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmR2VvbG9jYXRpb25GaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUdlb2xvY2F0aW9uRmllbGRDb21wb25lbnQsXG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkZpbGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZGaWxlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnQsXG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkltYWdlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlZpZGVvVXJsXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlJhbmdlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmUmFuZ2VGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgIH07XG4gIH1cbn1cbiJdfQ==