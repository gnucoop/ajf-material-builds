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
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderToolbarDialog = /** @class */ (() => {
    class AjfReportBuilderToolbarDialog {
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
    }
    AjfReportBuilderToolbarDialog.decorators = [
        { type: Component, args: [{
                    selector: 'toolbar-dialog',
                    template: "<h1 matDialogTitle>Dialog</h1>\n<div mat-dialog-content>Are you sure you want to erase the report?</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"resetReport()\">Yes</button>\n  <button mat-button (click)=\"close()\">No</button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] }
    ];
    AjfReportBuilderToolbarDialog.ctorParameters = () => [
        { type: AjfReportBuilderService },
        { type: MatDialogRef }
    ];
    return AjfReportBuilderToolbarDialog;
})();
export { AjfReportBuilderToolbarDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdG9vbGJhci1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFakU7SUFBQSxNQU1hLDZCQUE2QjtRQUN4QyxZQUNZLFFBQWlDLEVBQ2pDLFVBQXVEO1lBRHZELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQ2pDLGVBQVUsR0FBVixVQUFVLENBQTZDO1FBQUcsQ0FBQztRQUV2RSxXQUFXO1lBQ1QsSUFBSSxXQUFXLEdBQVE7Z0JBQ3JCLFFBQVEsRUFBRSxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQztnQkFDdkMsU0FBUyxFQUFFLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDO2dCQUN4QyxRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUM7Z0JBQ3ZDLFFBQVEsRUFBRSxFQUFFO2FBQ2IsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVELEtBQUs7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUM7OztnQkF4QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDJRQUFrQztvQkFDbEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7O2dCQVBPLHVCQUF1QjtnQkFGdkIsWUFBWTs7SUE2QnBCLG9DQUFDO0tBQUE7U0FuQlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0b29sYmFyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAndG9vbGJhci1kaWFsb2cuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nPikge31cblxuICByZXNldFJlcG9ydCgpIHtcbiAgICBsZXQgZW1wdHlSZXBvcnQ6IGFueSA9IHtcbiAgICAgICdoZWFkZXInOiB7J2NvbnRlbnQnOiBbXSwgJ3N0eWxlcyc6IHt9fSxcbiAgICAgICdjb250ZW50Jzogeydjb250ZW50JzogW10sICdzdHlsZXMnOiB7fX0sXG4gICAgICAnZm9vdGVyJzogeydjb250ZW50JzogW10sICdzdHlsZXMnOiB7fX0sXG4gICAgICAnc3R5bGVzJzoge31cbiAgICB9O1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0KGVtcHR5UmVwb3J0KTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG59XG4iXX0=