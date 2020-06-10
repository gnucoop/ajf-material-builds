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
import { AjfCheckboxGroup, AjfCheckboxGroupItem as AjfCoreCheckboxGroupItem } from '@ajf/core/checkbox-group';
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
let CheckboxGroupItem = /** @class */ (() => {
    class CheckboxGroupItem extends AjfCoreCheckboxGroupItem {
        constructor(checkboxGroup) {
            super(checkboxGroup);
            this.checkedIcon = 'check_box';
            this.notCheckedIcon = 'check_box_outline_blank';
        }
    }
    CheckboxGroupItem.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-checkbox-group-item',
                    template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\">\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[attr.id]': 'id',
                        '[class.ajf-checkbox-group-checked]': 'checked',
                        '[class.ajf-checkbox-group-disable]': 'disabled'
                    },
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    CheckboxGroupItem.ctorParameters = () => [
        { type: AjfCheckboxGroup, decorators: [{ type: Optional }] }
    ];
    return CheckboxGroupItem;
})();
export { CheckboxGroupItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsb0JBQW9CLElBQUksd0JBQXdCLEVBQ2pELE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUY7SUFBQSxNQVlhLGlCQUFxQixTQUFRLHdCQUEyQjtRQUNuRSxZQUF3QixhQUFrQztZQUN4RCxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyx5QkFBeUIsQ0FBQztRQUNsRCxDQUFDOzs7Z0JBakJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxzV0FBdUM7b0JBRXZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsSUFBSSxFQUFFO3dCQUNKLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixvQ0FBb0MsRUFBRSxTQUFTO3dCQUMvQyxvQ0FBb0MsRUFBRSxVQUFVO3FCQUNqRDs7aUJBQ0Y7Ozs7Z0JBaEJDLGdCQUFnQix1QkFrQkgsUUFBUTs7SUFLdkIsd0JBQUM7S0FBQTtTQU5ZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hlY2tib3hHcm91cCxcbiAgQWpmQ2hlY2tib3hHcm91cEl0ZW0gYXMgQWpmQ29yZUNoZWNrYm94R3JvdXBJdGVtXG59IGZyb20gJ0BhamYvY29yZS9jaGVja2JveC1ncm91cCc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9wdGlvbmFsLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jaGVja2JveC1ncm91cC1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGVja2JveC1ncm91cC1pdGVtLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hlY2tib3gtZ3JvdXAtaXRlbS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmFqZi1jaGVja2JveC1ncm91cC1jaGVja2VkXSc6ICdjaGVja2VkJyxcbiAgICAnW2NsYXNzLmFqZi1jaGVja2JveC1ncm91cC1kaXNhYmxlXSc6ICdkaXNhYmxlZCdcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hHcm91cEl0ZW08VD4gZXh0ZW5kcyBBamZDb3JlQ2hlY2tib3hHcm91cEl0ZW08VD4ge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBjaGVja2JveEdyb3VwOiBBamZDaGVja2JveEdyb3VwPFQ+KSB7XG4gICAgc3VwZXIoY2hlY2tib3hHcm91cCk7XG4gICAgdGhpcy5jaGVja2VkSWNvbiA9ICdjaGVja19ib3gnO1xuICAgIHRoaXMubm90Q2hlY2tlZEljb24gPSAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnO1xuICB9XG59XG4iXX0=