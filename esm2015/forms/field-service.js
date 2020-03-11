/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/field-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfFieldService as CoreService, AjfFieldType } from '@ajf/core/forms';
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
export class AjfFieldService extends CoreService {
    constructor() {
        super();
        this.componentsMap[AjfFieldType.String] = { component: AjfInputFieldComponent },
            this.componentsMap[AjfFieldType.Text] = { component: AjfInputFieldComponent },
            this.componentsMap[AjfFieldType.Number] = {
                component: AjfInputFieldComponent, inputs: { type: 'number' }
            },
            this.componentsMap[AjfFieldType.Boolean] = { component: AjfBooleanFieldComponent },
            this.componentsMap[AjfFieldType.Formula] = {
                component: AjfInputFieldComponent, inputs: { readonly: true }
            },
            this.componentsMap[AjfFieldType.Date] = { component: AjfDateFieldComponent },
            this.componentsMap[AjfFieldType.DateInput] = { component: AjfDateInputFieldComponent },
            this.componentsMap[AjfFieldType.Table] = { component: AjfTableFieldComponent },
            this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
            this.componentsMap[AjfFieldType.SingleChoice] = { component: AjfSingleChoiceFieldComponent },
            this.componentsMap[AjfFieldType.MultipleChoice] = { component: AjfMultipleChoiceFieldComponent },
            this.componentsMap[AjfFieldType.Time] = { component: AjfTimeFieldComponent },
            this.componentsMap[AjfFieldType.Barcode] = { component: AjfBarcodeFieldComponent };
    }
}
AjfFieldService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
AjfFieldService.ctorParameters = () => [];
/** @nocollapse */ AjfFieldService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxlQUFlLElBQUksV0FBVyxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEUsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7QUFHbkQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBVztJQUM5QztRQUNFLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUM7WUFDN0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUM7WUFDM0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQ3hDLFNBQVMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO2FBQUM7WUFDOUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUM7WUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ3pDLFNBQVMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDO2FBQUM7WUFDOUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUM7WUFDMUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUM7WUFDcEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUM7WUFDNUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUM7WUFDNUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsNkJBQTZCLEVBQUM7WUFDMUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsK0JBQStCLEVBQUM7WUFDOUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUscUJBQXFCLEVBQUM7WUFDMUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUMsQ0FBQztJQUNuRixDQUFDOzs7WUFuQkYsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZFNlcnZpY2UgYXMgQ29yZVNlcnZpY2UsIEFqZkZpZWxkVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFyY29kZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2JhcmNvZGUtZmllbGQnO1xuaW1wb3J0IHtBamZCb29sZWFuRmllbGRDb21wb25lbnR9IGZyb20gJy4vYm9vbGVhbi1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGRDb21wb25lbnR9IGZyb20gJy4vZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2lucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9tdWx0aXBsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRpbWVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90aW1lLWZpZWxkJztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQWpmRmllbGRTZXJ2aWNlIGV4dGVuZHMgQ29yZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuU3RyaW5nXSA9IHtjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGV4dF0gPSB7Y29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLk51bWJlcl0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsIGlucHV0czoge3R5cGU6ICdudW1iZXInfX0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5Cb29sZWFuXSA9IHtjb21wb25lbnQ6IEFqZkJvb2xlYW5GaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5Gb3JtdWxhXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCwgaW5wdXRzOiB7cmVhZG9ubHk6IHRydWV9fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVdID0ge2NvbXBvbmVudDogQWpmRGF0ZUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVJbnB1dF0gPSB7Y29tcG9uZW50OiBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UYWJsZV0gPSB7Y29tcG9uZW50OiBBamZUYWJsZUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkVtcHR5XSA9IHtjb21wb25lbnQ6IEFqZkVtcHR5RmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlXSA9IHtjb21wb25lbnQ6IEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlXSA9IHtjb21wb25lbnQ6IEFqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGltZV0gPSB7Y29tcG9uZW50OiBBamZUaW1lRmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQmFyY29kZV0gPSB7Y29tcG9uZW50OiBBamZCYXJjb2RlRmllbGRDb21wb25lbnR9O1xuICB9XG59XG4iXX0=