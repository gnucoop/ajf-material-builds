import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AjfTime as AjfTime$1 } from '@ajf/core/time';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/time/time.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AJF_TIME_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => AjfTime)),
    multi: true
};
class AjfTime extends AjfTime$1 {
    constructor() {
        super();
    }
}
AjfTime.decorators = [
    { type: Component, args: [{
                selector: 'ajf-time',
                template: "<div>\n  <mat-form-field>\n    <input\n        matInput\n        min=\"0\"\n        max=\"23\"\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"hours\"\n        type=\"number\">\n  </mat-form-field>\n  :\n  <mat-form-field>\n    <input\n        matInput\n        min=\"0\"\n        max=\"59\"\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"minutes\"\n        type=\"number\">\n  </mat-form-field>\n</div>\n",
                providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-time .mat-form-field{width:1.5em;text-align:center}\n"]
            }] }
];
/** @nocollapse */
AjfTime.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/time/time-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTimeModule {
}
AjfTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                ],
                declarations: [
                    AjfTime,
                ],
                exports: [
                    AjfTime,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/time/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AJF_TIME_CONTROL_VALUE_ACCESSOR, AjfTime, AjfTimeModule };
//# sourceMappingURL=time.js.map
