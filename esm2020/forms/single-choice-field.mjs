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
import { AJF_SEARCH_ALERT_THRESHOLD, AJF_WARNING_ALERT_SERVICE, AjfFieldWithChoicesComponent, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/material/select";
import * as i3 from "@angular/material/core";
import * as i4 from "@angular/material/radio";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@ngneat/transloco";
import * as i8 from "./warning-alert-service";
export class AjfSingleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
    }
}
AjfSingleChoiceFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfSingleChoiceFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: AJF_SEARCH_ALERT_THRESHOLD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AjfSingleChoiceFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfSingleChoiceFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | transloco }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [attr.aria-labelledby]=\"instance.node.name\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | transloco }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n", styles: ["\n"], components: [{ type: i2.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i3.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i4.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }], pipes: { "ajfExpandFieldWithChoices": i1.AjfExpandFieldWithChoicesPipe, "async": i5.AsyncPipe, "transloco": i7.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfSingleChoiceFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | transloco }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [attr.aria-labelledby]=\"instance.node.name\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | transloco }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n", styles: ["\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i8.AjfWarningAlertService, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [AJF_SEARCH_ALERT_THRESHOLD]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLWNob2ljZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9zaW5nbGUtY2hvaWNlLWZpZWxkLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL3NpbmdsZS1jaG9pY2UtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLHlCQUF5QixFQUN6Qiw0QkFBNEIsRUFDNUIsc0JBQXNCLEVBQ3ZCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7O0FBUS9ELE1BQU0sT0FBTyw2QkFBaUMsU0FBUSw0QkFBK0I7SUFDbkYsWUFDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCLEVBQ2QsZUFBdUI7UUFDekUsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7O2tJQU5VLDZCQUE2Qix5RkFHNUIseUJBQXlCLGFBQ2IsMEJBQTBCO3NIQUp2Qyw2QkFBNkIsMkVDN0MxQyw4dkJBa0JBO21HRDJCYSw2QkFBNkI7a0JBTnpDLFNBQVM7c0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBS2hDLE1BQU07MkJBQUMseUJBQXlCOzswQkFDaEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFKRl9TRUFSQ0hfQUxFUlRfVEhSRVNIT0xELFxuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZGaWVsZFdpdGhDaG9pY2VzQ29tcG9uZW50LFxuICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdzaW5nbGUtY2hvaWNlLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnc2luZ2xlLWNob2ljZS1maWVsZC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlNpbmdsZUNob2ljZUZpZWxkQ29tcG9uZW50PFQ+IGV4dGVuZHMgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudDxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBSkZfU0VBUkNIX0FMRVJUX1RIUkVTSE9MRCkgc2VhcmNoVGhyZXNob2xkOiBudW1iZXIpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcywgc2VhcmNoVGhyZXNob2xkKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEoaW5zdGFuY2V8YWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlczpzZWFyY2hUaHJlc2hvbGQpIDsgZWxzZSBleHBhbmRlZFwiPlxuICA8bWF0LXNlbGVjdCAqbmdJZj1cImNvbnRyb2x8YXN5bmMgYXMgY3RybFwiIFtmb3JtQ29udHJvbF09XCJjdHJsIVwiPlxuICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJjaG9pY2UudmFsdWVcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlc1wiPlxuICAgICAge3sgY2hvaWNlLmxhYmVsIHwgdHJhbnNsb2NvIH19XG4gICAgPC9tYXQtb3B0aW9uPlxuICA8L21hdC1zZWxlY3Q+XG48L25nLWNvbnRhaW5lcj5cbjxuZy10ZW1wbGF0ZSAjZXhwYW5kZWQ+XG4gIDxtYXQtcmFkaW8tZ3JvdXAgKm5nSWY9XCJjb250cm9sfGFzeW5jIGFzIGN0cmxcIiBjbGFzcz1cImFqZi1jaG9pY2VzLWNvbnRhaW5lclwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaW5zdGFuY2Uubm9kZS5uYW1lXCJcbiAgICAgIFtmb3JtQ29udHJvbF09XCJjdHJsIVwiPlxuICAgIDxtYXQtcmFkaW8tYnV0dG9uIFt2YWx1ZV09XCJjaG9pY2UudmFsdWVcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlc1wiPlxuICAgICAge3sgY2hvaWNlLmxhYmVsIHwgdHJhbnNsb2NvIH19XG4gICAgPC9tYXQtcmFkaW8tYnV0dG9uPlxuICA8L21hdC1yYWRpby1ncm91cD5cbjwvbmctdGVtcGxhdGU+XG4iXX0=