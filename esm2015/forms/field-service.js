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
import { AjfTimeFieldComponent } from './time-field';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import * as i0 from "@angular/core";
let AjfFieldService = /** @class */ (() => {
    class AjfFieldService extends CoreService {
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
    AjfFieldService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    AjfFieldService.ctorParameters = () => [];
    AjfFieldService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
    return AjfFieldService;
})();
export { AjfFieldService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCxlQUFlLElBQUksV0FBVyxFQUM5QixZQUFZLEVBQ1oscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIsNkJBQTZCLEVBQzdCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsaUNBQWlDLEdBQ2xDLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsNkJBQTZCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDOztBQUU1RDtJQUFBLE1BQ2EsZUFBZ0IsU0FBUSxXQUFXO1FBQzlDO1lBQ0Us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QUNyRCxDQUFDO1FBQ0osQ0FBQzs7O2dCQW5FRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OzswQkEvQ2hDO0tBbUhDO1NBbkVZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkZpZWxkU2VydmljZSBhcyBDb3JlU2VydmljZSxcbiAgQWpmRmllbGRUeXBlLFxuICBBamZGaWxlRmllbGRDb21wb25lbnQsXG4gIEFqZkltYWdlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZCYXJjb2RlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFyY29kZS1maWVsZCc7XG5pbXBvcnQge0FqZkJvb2xlYW5GaWVsZENvbXBvbmVudH0gZnJvbSAnLi9ib29sZWFuLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWlucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmRW1wdHlGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZklucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL211bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3NpbmdsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmVGltZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3RpbWUtZmllbGQnO1xuaW1wb3J0IHtBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL3ZpZGVvLXVybC1maWVsZCc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkU2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlN0cmluZ10gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UZXh0XSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLk51bWJlcl0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICAgIGlucHV0czoge3R5cGU6ICdudW1iZXInfVxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5Cb29sZWFuXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRm9ybXVsYV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudCxcbiAgICAgIGlucHV0czoge3JlYWRvbmx5OiB0cnVlfVxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5EYXRlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmRGF0ZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRGF0ZUlucHV0XSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UYWJsZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlRhYmxlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlUYWJsZUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkVtcHR5XSA9IHtjb21wb25lbnQ6IEFqZkVtcHR5RmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5UaW1lXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmVGltZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQmFyY29kZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkJhcmNvZGVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkZpbGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZGaWxlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWxlRmllbGRDb21wb25lbnRcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuSW1hZ2VdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5SW1hZ2VGaWVsZENvbXBvbmVudFxuICAgIH07XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5WaWRlb1VybF0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlZpZGVvVXJsRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlWaWRlb1VybEZpZWxkQ29tcG9uZW50XG4gICAgfTtcbiAgfVxufVxuIl19