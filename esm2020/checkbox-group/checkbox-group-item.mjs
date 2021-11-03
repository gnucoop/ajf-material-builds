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
import { AjfCheckboxGroup, AjfCheckboxGroupItem as AjfCoreCheckboxGroupItem, } from '@ajf/core/checkbox-group';
import { ChangeDetectionStrategy, Component, Optional, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/checkbox-group";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/icon";
import * as i4 from "@angular/common";
export class CheckboxGroupItem extends AjfCoreCheckboxGroupItem {
    constructor(
    // `AjfCheckboxGroupItem` is commonly used in combination with a `AjfCheckboxGroup`.
    // tslint:disable-next-line: lightweight-tokens
    checkboxGroup) {
        super(checkboxGroup);
        this.checkedIcon = 'check_box';
        this.notCheckedIcon = 'check_box_outline_blank';
    }
}
CheckboxGroupItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: CheckboxGroupItem, deps: [{ token: i1.AjfCheckboxGroup, optional: true }], target: i0.ɵɵFactoryTarget.Component });
CheckboxGroupItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: CheckboxGroupItem, selector: "ajf-checkbox-group-item", host: { properties: { "attr.id": "id", "class.ajf-checkbox-group-checked": "checked", "class.ajf-checkbox-group-disable": "disabled" } }, usesInheritance: true, ngImport: i0, template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\">\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n", styles: ["\n"], components: [{ type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: CheckboxGroupItem, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-checkbox-group-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[attr.id]': 'id',
                        '[class.ajf-checkbox-group-checked]': 'checked',
                        '[class.ajf-checkbox-group-disable]': 'disabled',
                    }, template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\">\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n", styles: ["\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfCheckboxGroup, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGVja2JveC1ncm91cC9jaGVja2JveC1ncm91cC1pdGVtLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwL2NoZWNrYm94LWdyb3VwLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLG9CQUFvQixJQUFJLHdCQUF3QixHQUNqRCxNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFjOUYsTUFBTSxPQUFPLGlCQUFxQixTQUFRLHdCQUEyQjtJQUNuRTtJQUNFLG9GQUFvRjtJQUNwRiwrQ0FBK0M7SUFDbkMsYUFBa0M7UUFFOUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcseUJBQXlCLENBQUM7SUFDbEQsQ0FBQzs7bUhBVFUsaUJBQWlCO3VHQUFqQixpQkFBaUIsZ09DeEM5Qiw0VkFVQTtnR0Q4QmEsaUJBQWlCO2tCQVo3QixTQUFTOytCQUNFLHlCQUF5QixtQkFHbEIsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUMvQjt3QkFDSixXQUFXLEVBQUUsSUFBSTt3QkFDakIsb0NBQW9DLEVBQUUsU0FBUzt3QkFDL0Msb0NBQW9DLEVBQUUsVUFBVTtxQkFDakQ7OzBCQU1FLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNoZWNrYm94R3JvdXAsXG4gIEFqZkNoZWNrYm94R3JvdXBJdGVtIGFzIEFqZkNvcmVDaGVja2JveEdyb3VwSXRlbSxcbn0gZnJvbSAnQGFqZi9jb3JlL2NoZWNrYm94LWdyb3VwJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNoZWNrYm94LWdyb3VwLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ2NoZWNrYm94LWdyb3VwLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaGVja2JveC1ncm91cC1pdGVtLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICdbY2xhc3MuYWpmLWNoZWNrYm94LWdyb3VwLWNoZWNrZWRdJzogJ2NoZWNrZWQnLFxuICAgICdbY2xhc3MuYWpmLWNoZWNrYm94LWdyb3VwLWRpc2FibGVdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hHcm91cEl0ZW08VD4gZXh0ZW5kcyBBamZDb3JlQ2hlY2tib3hHcm91cEl0ZW08VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAvLyBgQWpmQ2hlY2tib3hHcm91cEl0ZW1gIGlzIGNvbW1vbmx5IHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBhIGBBamZDaGVja2JveEdyb3VwYC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGxpZ2h0d2VpZ2h0LXRva2Vuc1xuICAgIEBPcHRpb25hbCgpIGNoZWNrYm94R3JvdXA6IEFqZkNoZWNrYm94R3JvdXA8VD4sXG4gICkge1xuICAgIHN1cGVyKGNoZWNrYm94R3JvdXApO1xuICAgIHRoaXMuY2hlY2tlZEljb24gPSAnY2hlY2tfYm94JztcbiAgICB0aGlzLm5vdENoZWNrZWRJY29uID0gJ2NoZWNrX2JveF9vdXRsaW5lX2JsYW5rJztcbiAgfVxufVxuIiwiPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJvbklucHV0Q2hhbmdlKCRldmVudClcIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIFtpZF09XCJjaGVja2JveElkfGFzeW5jXCJcbiAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFN0YXRlfGFzeW5jXCJcbiAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImRpc2FibGVkU3RhdGV8YXN5bmNcIj5cbiAgPHNwYW4gY2xhc3M9XCJhamYtY2hlY2tib3gtZ3JvdXAtY29udGVudFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9zcGFuPlxuICA8bWF0LWljb24+e3sgaWNvbnxhc3luYyB9fTwvbWF0LWljb24+XG48L2J1dHRvbj5cbiJdfQ==