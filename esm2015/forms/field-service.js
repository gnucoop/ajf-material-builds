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
import { AjfFieldService as CoreService, AjfFieldType, AjfFileFieldComponent, AjfImageFieldComponent, AjfReadOnlyFieldComponent, AjfReadOnlyFileFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlyVideoUrlFieldComponent, } from '@ajf/core/forms';
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
import { AjfTextFieldComponent } from './text-field';
import { AjfTimeFieldComponent } from './time-field';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import * as i0 from "@angular/core";
export class AjfFieldService extends CoreService {
    constructor() {
        super();
        this.componentsMap[AjfFieldType.String] = {
            component: AjfInputFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent
        },
            this.componentsMap[AjfFieldType.Text] = {
                component: AjfTextFieldComponent,
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
        this.componentsMap[AjfFieldType.File] = {
            component: AjfFileFieldComponent,
            readOnlyComponent: AjfReadOnlyFileFieldComponent
        };
        this.componentsMap[AjfFieldType.Image] = {
            component: AjfImageFieldComponent,
            readOnlyComponent: AjfReadOnlyImageFieldComponent
        };
        this.componentsMap[AjfFieldType.VideoUrl] = {
            component: AjfVideoUrlFieldComponent,
            readOnlyComponent: AjfReadOnlyVideoUrlFieldComponent
        };
    }
}
AjfFieldService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
AjfFieldService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AjfFieldService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCxlQUFlLElBQUksV0FBVyxFQUM5QixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIsNkJBQTZCLEVBQzdCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsaUNBQWlDLEdBQ2xDLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7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QUFFLGlDQUFpQztTQUNyRCxDQUFDO0lBQ0osQ0FBQzs7OztZQW5FRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZGaWVsZFNlcnZpY2UgYXMgQ29yZVNlcnZpY2UsXG4gIEFqZkZpZWxkVHlwZSxcbiAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFyY29kZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2JhcmNvZGUtZmllbGQnO1xuaW1wb3J0IHtBamZCb29sZWFuRmllbGRDb21wb25lbnR9IGZyb20gJy4vYm9vbGVhbi1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGRDb21wb25lbnR9IGZyb20gJy4vZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2lucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9tdWx0aXBsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRleHRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkU2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlN0cmluZ10gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UZXh0XSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmVGV4dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuTnVtYmVyXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgaW5wdXRzOiB7dHlwZTogJ251bWJlcid9XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJvb2xlYW5dID0ge1xuICAgICAgY29tcG9uZW50OiBBamZCb29sZWFuRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5Gb3JtdWxhXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICAgICAgaW5wdXRzOiB7cmVhZG9ubHk6IHRydWV9XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZEYXRlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5EYXRlSW5wdXRdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRhYmxlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmVGFibGVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRW1wdHldID0ge2NvbXBvbmVudDogQWpmRW1wdHlGaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2VdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRpbWVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZUaW1lRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5CYXJjb2RlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmQmFyY29kZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRmlsZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkZpbGVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudFxuICAgIH07XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5JbWFnZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50XG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlZpZGVvVXJsXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seVZpZGVvVXJsRmllbGRDb21wb25lbnRcbiAgICB9O1xuICB9XG59XG4iXX0=