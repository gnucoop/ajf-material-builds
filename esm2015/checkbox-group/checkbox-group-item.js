/**
 * @fileoverview added by tsickle
 * Generated from: src/material/checkbox-group/checkbox-group-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFDTCxnQkFBZ0IsRUFBRSxvQkFBb0IsSUFBSSx3QkFBd0IsRUFDbkUsTUFBTSwwQkFBMEIsQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQWM5RixNQUFNLE9BQU8saUJBQXFCLFNBQVEsd0JBQTJCOzs7O0lBQ25FLFlBQXdCLGFBQWtDO1FBQ3hELEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLHlCQUF5QixDQUFDO0lBQ2xELENBQUM7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMseVhBQXVDO2dCQUV2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLElBQUksRUFBRTtvQkFDSixXQUFXLEVBQUUsSUFBSTtvQkFDakIsb0NBQW9DLEVBQUUsU0FBUztvQkFDL0Msb0NBQW9DLEVBQUUsVUFBVTtpQkFDakQ7O2FBQ0Y7Ozs7WUFoQkMsZ0JBQWdCLHVCQWtCSCxRQUFROzs7O0lBTXJCLDZDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDaGVja2JveEdyb3VwLCBBamZDaGVja2JveEdyb3VwSXRlbSBhcyBBamZDb3JlQ2hlY2tib3hHcm91cEl0ZW1cbn0gZnJvbSAnQGFqZi9jb3JlL2NoZWNrYm94LWdyb3VwJztcbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPcHRpb25hbCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnY2hlY2tib3gtZ3JvdXAtaXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoZWNrYm94LWdyb3VwLWl0ZW0uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5hamYtY2hlY2tib3gtZ3JvdXAtY2hlY2tlZF0nOiAnY2hlY2tlZCcsXG4gICAgJ1tjbGFzcy5hamYtY2hlY2tib3gtZ3JvdXAtZGlzYWJsZV0nOiAnZGlzYWJsZWQnXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94R3JvdXBJdGVtPFQ+IGV4dGVuZHMgQWpmQ29yZUNoZWNrYm94R3JvdXBJdGVtPFQ+IHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgY2hlY2tib3hHcm91cDogQWpmQ2hlY2tib3hHcm91cDxUPikge1xuICAgIHN1cGVyKGNoZWNrYm94R3JvdXApO1xuICAgIHRoaXMuY2hlY2tlZEljb24gPSAnY2hlY2tfYm94JztcbiAgICB0aGlzLm5vdENoZWNrZWRJY29uID0gJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJztcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWFkb25seTogQm9vbGVhbklucHV0O1xufVxuIl19