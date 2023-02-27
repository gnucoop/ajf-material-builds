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
import { AJF_WARNING_ALERT_SERVICE, AjfBaseFieldComponent, } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Inject, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MatInput } from '@angular/material/input';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/material/datepicker";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/input";
import * as i6 from "@angular/forms";
import * as i7 from "./warning-alert-service";
export class AjfDateInputFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, _dvs) {
        super(cdr, service, was);
        this._dvs = _dvs;
    }
    onChange() {
        if (this.input == null) {
            return;
        }
        const val = this.input.value || '';
        if (val.length > 0) {
            if ((this._minDateStr != null && val < this._minDateStr) ||
                (this._maxDateStr != null && val > this._maxDateStr)) {
                this.input.value = '';
            }
        }
    }
    _onInstanceChange() {
        if (this.instance == null) {
            return;
        }
        this._minDateStr = this._dvs.transform(this.instance.node.minDate);
        this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
    }
}
AjfDateInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDateInputFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i1.AjfDateValueStringPipe }], target: i0.ɵɵFactoryTarget.Component });
AjfDateInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfDateInputFieldComponent, selector: "ng-component", viewQueries: [{ propertyName: "input", first: true, predicate: MatInput, descendants: true }], usesInheritance: true, ngImport: i0, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input\n    matInput\n    [matDatepicker]=\"picker\"\n    [attr.aria-label]=\"instance!|ajfNodeCompleteName\"\n    [min]=\"instance!.node.minDate|ajfDateValueString\"\n    [max]=\"instance!.node.maxDate|ajfDateValueString\"\n    (change)=\"onChange()\"\n    [formControl]=\"ctrl!\"\n  />\n  <mat-datepicker-toggle matIconSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i3.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i3.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i5.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfDateValueStringPipe, name: "ajfDateValueString" }, { kind: "pipe", type: i1.AjfNodeCompleteNamePipe, name: "ajfNodeCompleteName" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDateInputFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input\n    matInput\n    [matDatepicker]=\"picker\"\n    [attr.aria-label]=\"instance!|ajfNodeCompleteName\"\n    [min]=\"instance!.node.minDate|ajfDateValueString\"\n    [max]=\"instance!.node.maxDate|ajfDateValueString\"\n    (change)=\"onChange()\"\n    [formControl]=\"ctrl!\"\n  />\n  <mat-datepicker-toggle matIconSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i7.AjfWarningAlertService, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i1.AjfDateValueStringPipe }]; }, propDecorators: { input: [{
                type: ViewChild,
                args: [MatInput, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm1zL3NyYy9kYXRlLWlucHV0LWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybXMvc3JjL2RhdGUtaW5wdXQtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHFCQUFxQixHQUl0QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7O0FBVWpELE1BQU0sT0FBTywwQkFBMkIsU0FBUSxxQkFBMkM7SUFNekYsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCLEVBQ3RELElBQTRCO1FBRXBDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRmpCLFNBQUksR0FBSixJQUFJLENBQXdCO0lBR3RDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixPQUFPO1NBQ1I7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixJQUNFLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3BELENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDcEQ7Z0JBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ3ZCO1NBQ0Y7SUFDSCxDQUFDO0lBRWtCLGlCQUFpQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDOzt1SEFwQ1UsMEJBQTBCLHlGQVMzQix5QkFBeUI7MkdBVHhCLDBCQUEwQiwyRkFDMUIsUUFBUSx1RUNqRHJCLHllQWFBOzJGRG1DYSwwQkFBMEI7a0JBTnRDLFNBQVM7c0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBV2xDLE1BQU07MkJBQUMseUJBQXlCO2lGQVJHLEtBQUs7c0JBQTFDLFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSxcbiAgQWpmQmFzZUZpZWxkQ29tcG9uZW50LFxuICBBamZEYXRlRmllbGRJbnN0YW5jZSxcbiAgQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01hdElucHV0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdkYXRlLWlucHV0LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0ZS1pbnB1dC1maWVsZC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZEYXRlSW5wdXRGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZEYXRlRmllbGRJbnN0YW5jZT4ge1xuICBAVmlld0NoaWxkKE1hdElucHV0LCB7c3RhdGljOiBmYWxzZX0pIGlucHV0ITogTWF0SW5wdXQ7XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZVN0cjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9tYXhEYXRlU3RyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2R2czogQWpmRGF0ZVZhbHVlU3RyaW5nUGlwZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5wdXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2YWwgPSB0aGlzLmlucHV0LnZhbHVlIHx8ICcnO1xuICAgIGlmICh2YWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5fbWluRGF0ZVN0ciAhPSBudWxsICYmIHZhbCA8IHRoaXMuX21pbkRhdGVTdHIpIHx8XG4gICAgICAgICh0aGlzLl9tYXhEYXRlU3RyICE9IG51bGwgJiYgdmFsID4gdGhpcy5fbWF4RGF0ZVN0cilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWluRGF0ZVN0ciA9IHRoaXMuX2R2cy50cmFuc2Zvcm0odGhpcy5pbnN0YW5jZS5ub2RlLm1pbkRhdGUpO1xuICAgIHRoaXMuX21heERhdGVTdHIgPSB0aGlzLl9kdnMudHJhbnNmb3JtKHRoaXMuaW5zdGFuY2Uubm9kZS5tYXhEYXRlKTtcbiAgfVxufVxuIiwiPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiY29udHJvbHxhc3luYyBhcyBjdHJsXCI+XG4gIDxpbnB1dFxuICAgIG1hdElucHV0XG4gICAgW21hdERhdGVwaWNrZXJdPVwicGlja2VyXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImluc3RhbmNlIXxhamZOb2RlQ29tcGxldGVOYW1lXCJcbiAgICBbbWluXT1cImluc3RhbmNlIS5ub2RlLm1pbkRhdGV8YWpmRGF0ZVZhbHVlU3RyaW5nXCJcbiAgICBbbWF4XT1cImluc3RhbmNlIS5ub2RlLm1heERhdGV8YWpmRGF0ZVZhbHVlU3RyaW5nXCJcbiAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKClcIlxuICAgIFtmb3JtQ29udHJvbF09XCJjdHJsIVwiXG4gIC8+XG4gIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0SWNvblN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuPC9tYXQtZm9ybS1maWVsZD5cbiJdfQ==