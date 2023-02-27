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
import { AjfCheckboxGroupItem as CoreCheckboxGroupItem, } from '@ajf/core/checkbox-group';
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/checkbox-group";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/common";
export class CheckboxGroupItem extends CoreCheckboxGroupItem {
    constructor(
    // `AjfCheckboxGroupItem` is commonly used in combination with a `AjfCheckboxGroup`.
    // tslint:disable-next-line: lightweight-tokens
    checkboxGroup) {
        super(checkboxGroup);
        this.checkedIcon = 'check_box';
        this.notCheckedIcon = 'check_box_outline_blank';
    }
}
CheckboxGroupItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: CheckboxGroupItem, deps: [{ token: i1.AjfCheckboxGroup, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CheckboxGroupItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: CheckboxGroupItem, selector: "ajf-checkbox-group-item", host: { properties: { "attr.id": "id", "class.ajf-checkbox-group-checked": "checked", "class.ajf-checkbox-group-disable": "disabled" } }, usesInheritance: true, ngImport: i0, template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\">\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n", styles: [""], dependencies: [{ kind: "component", type: i2.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: CheckboxGroupItem, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-checkbox-group-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[attr.id]': 'id',
                        '[class.ajf-checkbox-group-checked]': 'checked',
                        '[class.ajf-checkbox-group-disable]': 'disabled',
                    }, template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\">\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AjfCheckboxGroup, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwL3NyYy9jaGVja2JveC1ncm91cC1pdGVtLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvY2hlY2tib3gtZ3JvdXAvc3JjL2NoZWNrYm94LWdyb3VwLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsb0JBQW9CLElBQUkscUJBQXFCLEdBQzlDLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7OztBQWU5RixNQUFNLE9BQU8saUJBQXFCLFNBQVEscUJBQXdCO0lBQ2hFO0lBQ0Usb0ZBQW9GO0lBQ3BGLCtDQUErQztJQUNuQyxhQUFrQztRQUU5QyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyx5QkFBeUIsQ0FBQztJQUNsRCxDQUFDOzs4R0FUVSxpQkFBaUI7a0dBQWpCLGlCQUFpQixnT0N6QzlCLDRWQVVBOzJGRCtCYSxpQkFBaUI7a0JBYjdCLFNBQVM7K0JBQ0UseUJBQXlCLG1CQUdsQix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBRS9CO3dCQUNKLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixvQ0FBb0MsRUFBRSxTQUFTO3dCQUMvQyxvQ0FBb0MsRUFBRSxVQUFVO3FCQUNqRDs7MEJBTUUsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hlY2tib3hHcm91cCxcbiAgQWpmQ2hlY2tib3hHcm91cEl0ZW0gYXMgQ29yZUNoZWNrYm94R3JvdXBJdGVtLFxufSBmcm9tICdAYWpmL2NvcmUvY2hlY2tib3gtZ3JvdXAnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPcHRpb25hbCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtY2hlY2tib3gtZ3JvdXAtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnY2hlY2tib3gtZ3JvdXAtaXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoZWNrYm94LWdyb3VwLWl0ZW0uc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmFqZi1jaGVja2JveC1ncm91cC1jaGVja2VkXSc6ICdjaGVja2VkJyxcbiAgICAnW2NsYXNzLmFqZi1jaGVja2JveC1ncm91cC1kaXNhYmxlXSc6ICdkaXNhYmxlZCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrYm94R3JvdXBJdGVtPFQ+IGV4dGVuZHMgQ29yZUNoZWNrYm94R3JvdXBJdGVtPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgLy8gYEFqZkNoZWNrYm94R3JvdXBJdGVtYCBpcyBjb21tb25seSB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggYSBgQWpmQ2hlY2tib3hHcm91cGAuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBsaWdodHdlaWdodC10b2tlbnNcbiAgICBAT3B0aW9uYWwoKSBjaGVja2JveEdyb3VwOiBBamZDaGVja2JveEdyb3VwPFQ+LFxuICApIHtcbiAgICBzdXBlcihjaGVja2JveEdyb3VwKTtcbiAgICB0aGlzLmNoZWNrZWRJY29uID0gJ2NoZWNrX2JveCc7XG4gICAgdGhpcy5ub3RDaGVja2VkSWNvbiA9ICdjaGVja19ib3hfb3V0bGluZV9ibGFuayc7XG4gIH1cbn1cbiIsIjxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBbaWRdPVwiY2hlY2tib3hJZHxhc3luY1wiXG4gICAgW2F0dHIuYXJpYS1jaGVja2VkXT1cImNoZWNrZWRTdGF0ZXxhc3luY1wiXG4gICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJkaXNhYmxlZFN0YXRlfGFzeW5jXCI+XG4gIDxzcGFuIGNsYXNzPVwiYWpmLWNoZWNrYm94LWdyb3VwLWNvbnRlbnRcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvc3Bhbj5cbiAgPG1hdC1pY29uPnt7IGljb258YXN5bmMgfX08L21hdC1pY29uPlxuPC9idXR0b24+XG4iXX0=