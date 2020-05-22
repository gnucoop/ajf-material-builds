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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderToolbarDialog = /** @class */ (() => {
    let AjfReportBuilderToolbarDialog = class AjfReportBuilderToolbarDialog {
        constructor(_service, _dialogRef) {
            this._service = _service;
            this._dialogRef = _dialogRef;
        }
        resetReport() {
            let emptyReport = {
                'header': { 'content': [], 'styles': {} },
                'content': { 'content': [], 'styles': {} },
                'footer': { 'content': [], 'styles': {} },
                'styles': {}
            };
            this._service.setReport(emptyReport);
            this._dialogRef.close();
        }
        close() {
            this._dialogRef.close();
        }
    };
    AjfReportBuilderToolbarDialog = __decorate([
        Component({
            selector: 'toolbar-dialog',
            template: "<h1 matDialogTitle>Dialog</h1>\n<div mat-dialog-content>Are you sure you want to erase the report?</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"resetReport()\">Yes</button>\n  <button mat-button (click)=\"close()\">No</button>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [AjfReportBuilderService,
            MatDialogRef])
    ], AjfReportBuilderToolbarDialog);
    return AjfReportBuilderToolbarDialog;
})();
export { AjfReportBuilderToolbarDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdG9vbGJhci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBUWpFO0lBQUEsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7UUFDeEMsWUFDWSxRQUFpQyxFQUNqQyxVQUF1RDtZQUR2RCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUE2QztRQUFHLENBQUM7UUFFdkUsV0FBVztZQUNULElBQUksV0FBVyxHQUFRO2dCQUNyQixRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUM7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQztnQkFDeEMsUUFBUSxFQUFFLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDO2dCQUN2QyxRQUFRLEVBQUUsRUFBRTthQUNiLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxLQUFLO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO0tBQ0YsQ0FBQTtJQW5CWSw2QkFBNkI7UUFOekMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQiwyUUFBa0M7WUFDbEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FHc0IsdUJBQXVCO1lBQ3JCLFlBQVk7T0FIekIsNkJBQTZCLENBbUJ6QztJQUFELG9DQUFDO0tBQUE7U0FuQlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0b29sYmFyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAndG9vbGJhci1kaWFsb2cuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nPikge31cblxuICByZXNldFJlcG9ydCgpIHtcbiAgICBsZXQgZW1wdHlSZXBvcnQ6IGFueSA9IHtcbiAgICAgICdoZWFkZXInOiB7J2NvbnRlbnQnOiBbXSwgJ3N0eWxlcyc6IHt9fSxcbiAgICAgICdjb250ZW50Jzogeydjb250ZW50JzogW10sICdzdHlsZXMnOiB7fX0sXG4gICAgICAnZm9vdGVyJzogeydjb250ZW50JzogW10sICdzdHlsZXMnOiB7fX0sXG4gICAgICAnc3R5bGVzJzoge31cbiAgICB9O1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0KGVtcHR5UmVwb3J0KTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iXX0=