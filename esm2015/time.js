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
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AjfTime as AjfTime$1 } from '@ajf/core/time';

/**
 * @fileoverview added by tsickle
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
    { type: Component, args: [{selector: 'ajf-time',
                template: "<div><mat-form-field><input matInput min=\"0\" max=\"23\" (focus)=\"focusHandler()\" [(ngModel)]=\"hours\" type=\"number\" [readonly]=\"readonly\"></mat-form-field>:<mat-form-field><input matInput min=\"0\" max=\"59\" (focus)=\"focusHandler()\" [(ngModel)]=\"minutes\" type=\"number\" [readonly]=\"readonly\"></mat-form-field></div>",
                styles: ["ajf-time .mat-form-field{width:1.5em;text-align:center}"],
                providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: [
                    'readonly',
                ],
            },] },
];
/** @nocollapse */
AjfTime.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
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
            },] },
];

export { AJF_TIME_CONTROL_VALUE_ACCESSOR, AjfTime, AjfTimeModule };
//# sourceMappingURL=time.js.map
