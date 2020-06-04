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
    };
    AjfFieldService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
    AjfFieldService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], AjfFieldService);
    return AjfFieldService;
})();
export { AjfFieldService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsZUFBZSxJQUFJLFdBQVcsRUFDOUIsWUFBWSxFQUNaLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIseUJBQXlCLEVBQ3pCLDZCQUE2QixFQUM3Qiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLGlDQUFpQyxHQUNsQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEUsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFHNUQ7SUFBQSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFR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QWlCLEVBQUUsaUNBQWlDO2FBQ3JELENBQUM7UUFDSixDQUFDO0tBQ0YsQ0FBQTs7SUFuRVksZUFBZTtRQUQzQixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7O09BQ3BCLGVBQWUsQ0FtRTNCOzBCQW5IRDtLQW1IQztTQW5FWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZGaWVsZFNlcnZpY2UgYXMgQ29yZVNlcnZpY2UsXG4gIEFqZkZpZWxkVHlwZSxcbiAgQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICBBamZJbWFnZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seUZpbGVGaWVsZENvbXBvbmVudCxcbiAgQWpmUmVhZE9ubHlJbWFnZUZpZWxkQ29tcG9uZW50LFxuICBBamZSZWFkT25seVRhYmxlRmllbGRDb21wb25lbnQsXG4gIEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudCxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFyY29kZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2JhcmNvZGUtZmllbGQnO1xuaW1wb3J0IHtBamZCb29sZWFuRmllbGRDb21wb25lbnR9IGZyb20gJy4vYm9vbGVhbi1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9kYXRlLWZpZWxkJztcbmltcG9ydCB7QWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGRDb21wb25lbnR9IGZyb20gJy4vZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2lucHV0LWZpZWxkJztcbmltcG9ydCB7QWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9tdWx0aXBsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZlRpbWVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi90aW1lLWZpZWxkJztcbmltcG9ydCB7QWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudH0gZnJvbSAnLi92aWRlby11cmwtZmllbGQnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBamZGaWVsZFNlcnZpY2UgZXh0ZW5kcyBDb3JlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5TdHJpbmddID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGV4dF0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5OdW1iZXJdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICBpbnB1dHM6IHt0eXBlOiAnbnVtYmVyJ31cbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQm9vbGVhbl0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkJvb2xlYW5GaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkZvcm11bGFdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnQsXG4gICAgICBpbnB1dHM6IHtyZWFkb25seTogdHJ1ZX1cbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRGF0ZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkRhdGVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkRhdGVJbnB1dF0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGFibGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZUYWJsZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5VGFibGVGaWVsZENvbXBvbmVudFxuICAgIH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5FbXB0eV0gPSB7Y29tcG9uZW50OiBBamZFbXB0eUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2VdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmllbGRDb21wb25lbnRcbiAgICB9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGltZV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZlRpbWVGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUZpZWxkQ29tcG9uZW50XG4gICAgfSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJhcmNvZGVdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZCYXJjb2RlRmllbGRDb21wb25lbnQsXG4gICAgICByZWFkT25seUNvbXBvbmVudDogQWpmUmVhZE9ubHlGaWVsZENvbXBvbmVudFxuICAgIH07XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5GaWxlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmRmlsZUZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5RmlsZUZpZWxkQ29tcG9uZW50XG4gICAgfTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkltYWdlXSA9IHtcbiAgICAgIGNvbXBvbmVudDogQWpmSW1hZ2VGaWVsZENvbXBvbmVudCxcbiAgICAgIHJlYWRPbmx5Q29tcG9uZW50OiBBamZSZWFkT25seUltYWdlRmllbGRDb21wb25lbnRcbiAgICB9O1xuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVmlkZW9VcmxdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50LFxuICAgICAgcmVhZE9ubHlDb21wb25lbnQ6IEFqZlJlYWRPbmx5VmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICAgIH07XG4gIH1cbn1cbiJdfQ==