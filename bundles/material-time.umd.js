(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/material/form-field'), require('@angular/material/input'), require('tslib'), require('@ajf/core/time')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/time', ['exports', '@angular/core', '@angular/forms', '@angular/material/form-field', '@angular/material/input', 'tslib', '@ajf/core/time'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.time = {}), global.ng.core, global.ng.forms, global.ng.material.formField, global.ng.material.input, global.tslib, global.ng.core.time));
}(this, (function (exports, core, forms, formField, input, tslib, time) { 'use strict';

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
    var AJF_TIME_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return AjfTime; }),
        multi: true
    };
    var AjfTime = /** @class */ (function (_super) {
        tslib.__extends(AjfTime, _super);
        function AjfTime() {
            return _super.call(this) || this;
        }
        AjfTime.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-time',
                        template: "<div>\n  <mat-form-field>\n    <input\n        matInput\n        min=\"0\"\n        max=\"23\"\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"hours\"\n        type=\"number\"\n        [readonly]=\"readonly\">\n  </mat-form-field>\n  :\n  <mat-form-field>\n    <input\n        matInput\n        min=\"0\"\n        max=\"59\"\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"minutes\"\n        type=\"number\"\n        [readonly]=\"readonly\">\n  </mat-form-field>\n</div>\n",
                        providers: [AJF_TIME_CONTROL_VALUE_ACCESSOR],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-time .mat-form-field{width:1.5em;text-align:center}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfTime.ctorParameters = function () { return []; };
        return AjfTime;
    }(time.AjfTime));

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
                    },] }
        ];
        return AjfTimeModule;
    }());

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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AJF_TIME_CONTROL_VALUE_ACCESSOR = AJF_TIME_CONTROL_VALUE_ACCESSOR;
    exports.AjfTime = AjfTime;
    exports.AjfTimeModule = AjfTimeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-time.umd.js.map
