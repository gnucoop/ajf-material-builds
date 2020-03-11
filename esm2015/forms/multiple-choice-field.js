/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/multiple-choice-field.ts
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
import { AjfFieldWithChoicesComponent, AjfFormRendererService, AJF_SEARCH_ALERT_THRESHOLD } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { AjfWarningAlertService } from './warning-alert-service';
/**
 * @template T
 */
export class AjfMultipleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     * @param {?} searchThreshold
     */
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
    }
}
AjfMultipleChoiceFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\" [disabled]=\"readonly\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\"\n        [readonly]=\"readonly\"\n        [value]=\"choice.value\">\n      {{ choice.label | translate }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfMultipleChoiceFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService },
    { type: Number, decorators: [{ type: Optional }, { type: Inject, args: [AJF_SEARCH_ALERT_THRESHOLD,] }] }
];
if (false) {
    /** @type {?} */
    AjfMultipleChoiceFieldComponent.ngAcceptInputType_readonly;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtY2hvaWNlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL211bHRpcGxlLWNob2ljZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ0wsNEJBQTRCLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQ2pGLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUMzRixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQVEvRCxNQUFNLE9BQU8sK0JBQW1DLFNBQVEsNEJBQStCOzs7Ozs7O0lBQ3JGLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDL0IsR0FBMkIsRUFDcUIsZUFBdUI7UUFFdkUsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxtekJBQXlDO2dCQUV6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBVjBCLGlCQUFpQjtZQUpaLHNCQUFzQjtZQU85QyxzQkFBc0I7eUNBYXpCLFFBQVEsWUFBSSxNQUFNLFNBQUMsMEJBQTBCOzs7O0lBS2hELDJEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudCwgQWpmRm9ybVJlbmRlcmVyU2VydmljZSwgQUpGX1NFQVJDSF9BTEVSVF9USFJFU0hPTERcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEluamVjdCwgT3B0aW9uYWwsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnbXVsdGlwbGUtY2hvaWNlLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbXVsdGlwbGUtY2hvaWNlLWZpZWxkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZENvbXBvbmVudDxUPiBleHRlbmRzIEFqZkZpZWxkV2l0aENob2ljZXNDb21wb25lbnQ8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1NFQVJDSF9BTEVSVF9USFJFU0hPTEQpIHNlYXJjaFRocmVzaG9sZDogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzLCBzZWFyY2hUaHJlc2hvbGQpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlYWRvbmx5OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=