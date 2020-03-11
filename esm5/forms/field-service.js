import { __extends } from "tslib";
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
var AjfFieldService = /** @class */ (function (_super) {
    __extends(AjfFieldService, _super);
    function AjfFieldService() {
        var _this = _super.call(this) || this;
        _this.componentsMap[AjfFieldType.String] = { component: AjfInputFieldComponent },
            _this.componentsMap[AjfFieldType.Text] = { component: AjfInputFieldComponent },
            _this.componentsMap[AjfFieldType.Number] = {
                component: AjfInputFieldComponent, inputs: { type: 'number' }
            },
            _this.componentsMap[AjfFieldType.Boolean] = { component: AjfBooleanFieldComponent },
            _this.componentsMap[AjfFieldType.Formula] = {
                component: AjfInputFieldComponent, inputs: { readonly: true }
            },
            _this.componentsMap[AjfFieldType.Date] = { component: AjfDateFieldComponent },
            _this.componentsMap[AjfFieldType.DateInput] = { component: AjfDateInputFieldComponent },
            _this.componentsMap[AjfFieldType.Table] = { component: AjfTableFieldComponent },
            _this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
            _this.componentsMap[AjfFieldType.SingleChoice] = { component: AjfSingleChoiceFieldComponent },
            _this.componentsMap[AjfFieldType.MultipleChoice] = { component: AjfMultipleChoiceFieldComponent },
            _this.componentsMap[AjfFieldType.Time] = { component: AjfTimeFieldComponent },
            _this.componentsMap[AjfFieldType.Barcode] = { component: AjfBarcodeFieldComponent };
        return _this;
    }
    AjfFieldService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    AjfFieldService.ctorParameters = function () { return []; };
    AjfFieldService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
    return AjfFieldService;
}(CoreService));
export { AjfFieldService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9maWVsZC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxJQUFJLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBQywrQkFBK0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBRW5EO0lBQ3FDLG1DQUFXO0lBQzlDO1FBQUEsWUFDRSxpQkFBTyxTQWdCUjtRQWZDLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO1lBQzdFLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO1lBQzNFLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHO2dCQUN4QyxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQzthQUFDO1lBQzlELEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDO1lBQ2hGLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dCQUN6QyxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQzthQUFDO1lBQzlELEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFDO1lBQzFFLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLDBCQUEwQixFQUFDO1lBQ3BGLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO1lBQzVFLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDO1lBQzVFLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLDZCQUE2QixFQUFDO1lBQzFGLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLCtCQUErQixFQUFDO1lBQzlGLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFDO1lBQzFFLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLHdCQUF3QixFQUFDLENBQUM7O0lBQ25GLENBQUM7O2dCQW5CRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OzswQkFwQ2hDO0NBd0RDLEFBcEJELENBQ3FDLFdBQVcsR0FtQi9DO1NBbkJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLCBBamZGaWVsZFR5cGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkJhcmNvZGVGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXJjb2RlLWZpZWxkJztcbmltcG9ydCB7QWpmQm9vbGVhbkZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jvb2xlYW4tZmllbGQnO1xuaW1wb3J0IHtBamZEYXRlRmllbGRDb21wb25lbnR9IGZyb20gJy4vZGF0ZS1maWVsZCc7XG5pbXBvcnQge0FqZkRhdGVJbnB1dEZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2RhdGUtaW5wdXQtZmllbGQnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2VtcHR5LWZpZWxkJztcbmltcG9ydCB7QWpmSW5wdXRGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9pbnB1dC1maWVsZCc7XG5pbXBvcnQge0FqZk11bHRpcGxlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmU2luZ2xlQ2hvaWNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vc2luZ2xlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZUaW1lRmllbGRDb21wb25lbnR9IGZyb20gJy4vdGltZS1maWVsZCc7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkU2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlN0cmluZ10gPSB7Y29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRleHRdID0ge2NvbXBvbmVudDogQWpmSW5wdXRGaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5OdW1iZXJdID0ge1xuICAgICAgY29tcG9uZW50OiBBamZJbnB1dEZpZWxkQ29tcG9uZW50LCBpbnB1dHM6IHt0eXBlOiAnbnVtYmVyJ319LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuQm9vbGVhbl0gPSB7Y29tcG9uZW50OiBBamZCb29sZWFuRmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuRm9ybXVsYV0gPSB7XG4gICAgICBjb21wb25lbnQ6IEFqZklucHV0RmllbGRDb21wb25lbnQsIGlucHV0czoge3JlYWRvbmx5OiB0cnVlfX0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5EYXRlXSA9IHtjb21wb25lbnQ6IEFqZkRhdGVGaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5EYXRlSW5wdXRdID0ge2NvbXBvbmVudDogQWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnR9LFxuICAgIHRoaXMuY29tcG9uZW50c01hcFtBamZGaWVsZFR5cGUuVGFibGVdID0ge2NvbXBvbmVudDogQWpmVGFibGVGaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5FbXB0eV0gPSB7Y29tcG9uZW50OiBBamZFbXB0eUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZV0gPSB7Y29tcG9uZW50OiBBamZTaW5nbGVDaG9pY2VGaWVsZENvbXBvbmVudH0sXG4gICAgdGhpcy5jb21wb25lbnRzTWFwW0FqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZV0gPSB7Y29tcG9uZW50OiBBamZNdWx0aXBsZUNob2ljZUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLlRpbWVdID0ge2NvbXBvbmVudDogQWpmVGltZUZpZWxkQ29tcG9uZW50fSxcbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbQWpmRmllbGRUeXBlLkJhcmNvZGVdID0ge2NvbXBvbmVudDogQWpmQmFyY29kZUZpZWxkQ29tcG9uZW50fTtcbiAgfVxufVxuIl19