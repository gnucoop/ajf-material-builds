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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/material/form-field'), require('@angular/material/input'), require('@ajf/core/time')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/time', ['exports', '@angular/core', '@angular/forms', '@angular/material/form-field', '@angular/material/input', '@ajf/core/time'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.time = {}), global.ng.core, global.ng.forms, global.ng.material.formField, global.ng.material.input, global.ajf.core.time));
}(this, function (exports, core, forms, formField, input, time) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AJF_TIME_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return AjfTime; })),
        multi: true
    };
    var AjfTime = /** @class */ (function (_super) {
        __extends(AjfTime, _super);
        function AjfTime() {
            return _super.call(this) || this;
        }
        AjfTime.decorators = [
            { type: core.Component, args: [{selector: 'ajf-time',
                        template: "<div><mat-form-field><input matInput min=\"0\" max=\"23\" (focus)=\"focusHandler()\" [(ngModel)]=\"hours\" type=\"number\" [readonly]=\"readonly\"></mat-form-field>:<mat-form-field><input matInput min=\"0\" max=\"59\" (focus)=\"focusHandler()\" [(ngModel)]=\"minutes\" type=\"number\" [readonly]=\"readonly\"></mat-form-field></div>",
                        styles: ["ajf-time .mat-form-field{width:1.5em;text-align:center}"],
                        providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: [
                            'readonly',
                        ],
                    },] },
        ];
        /** @nocollapse */
        AjfTime.ctorParameters = function () { return []; };
        return AjfTime;
    }(time.AjfTime));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTimeModule = /** @class */ (function () {
        function AjfTimeModule() {
        }
        AjfTimeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            formField.MatFormFieldModule,
                            input.MatInputModule,
                        ],
                        declarations: [
                            AjfTime,
                        ],
                        exports: [
                            AjfTime,
                        ],
                    },] },
        ];
        return AjfTimeModule;
    }());

    exports.AJF_TIME_CONTROL_VALUE_ACCESSOR = AJF_TIME_CONTROL_VALUE_ACCESSOR;
    exports.AjfTime = AjfTime;
    exports.AjfTimeModule = AjfTimeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-time.umd.js.map
