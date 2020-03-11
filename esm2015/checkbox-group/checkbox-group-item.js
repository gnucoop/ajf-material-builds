/**
 * @fileoverview added by tsickle
 * Generated from: src/material/checkbox-group/checkbox-group-item.ts
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
import { AjfCheckboxGroup, AjfCheckboxGroupItem as AjfCoreCheckboxGroupItem } from '@ajf/core/checkbox-group';
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
/**
 * @template T
 */
export class CheckboxGroupItem extends AjfCoreCheckboxGroupItem {
    /**
     * @param {?} checkboxGroup
     */
    constructor(checkboxGroup) {
        super(checkboxGroup);
        this.checkedIcon = 'check_box';
        this.notCheckedIcon = 'check_box_outline_blank';
    }
}
CheckboxGroupItem.decorators = [
    { type: Component, args: [{
                selector: 'ajf-checkbox-group-item',
                template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\"\n    [disabled]=\"readonly\">\n  <span class=\"ajf-checkbox-group-content\"><ng-content></ng-content></span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n",
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
if (false) {
    /** @type {?} */
    CheckboxGroupItem.ngAcceptInputType_readonly;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFDTCxnQkFBZ0IsRUFBRSxvQkFBb0IsSUFBSSx3QkFBd0IsRUFDbkUsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQWM5RixNQUFNLE9BQU8saUJBQXFCLFNBQVEsd0JBQTJCOzs7O0lBQ25FLFlBQXdCLGFBQWtDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLHlCQUF5QixDQUFDO0lBQ2xELENBQUM7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMseVhBQXVDO2dCQUV2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixXQUFXLEVBQUUsSUFBSTtvQkFDakIsb0NBQW9DLEVBQUUsU0FBUztvQkFDL0Msb0NBQW9DLEVBQUUsVUFBVTtpQkFDakQ7O2FBQ0Y7Ozs7WUFoQkMsZ0JBQWdCLHVCQWtCSCxRQUFROzs7O0lBTXJCLDZDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hlY2tib3hHcm91cCwgQWpmQ2hlY2tib3hHcm91cEl0ZW0gYXMgQWpmQ29yZUNoZWNrYm94R3JvdXBJdGVtXG59IGZyb20gJ0BhamYvY29yZS9jaGVja2JveC1ncm91cCc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ2NoZWNrYm94LWdyb3VwLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGVja2JveC1ncm91cC1pdGVtLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbY2xhc3MuYWpmLWNoZWNrYm94LWdyb3VwLWNoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICdbY2xhc3MuYWpmLWNoZWNrYm94LWdyb3VwLWRpc2FibGVdJzogJ2Rpc2FibGVkJ1xuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveEdyb3VwSXRlbTxUPiBleHRlbmRzIEFqZkNvcmVDaGVja2JveEdyb3VwSXRlbTxUPiB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD4pIHtcbiAgICBzdXBlcihjaGVja2JveEdyb3VwKTtcbiAgICB0aGlzLmNoZWNrZWRJY29uID0gJ2NoZWNrX2JveCc7XG4gICAgdGhpcy5ub3RDaGVja2VkSWNvbiA9ICdjaGVja19ib3hfb3V0bGluZV9ibGFuayc7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVhZG9ubHk6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==