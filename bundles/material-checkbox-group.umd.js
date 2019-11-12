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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ajf/core/checkbox-group'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/checkbox-group', ['exports', '@angular/core', '@ajf/core/checkbox-group', '@angular/common', '@angular/material/button', '@angular/material/icon'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.checkboxGroup = {}), global.ng.core, global.ajf.core.checkboxGroup, global.ng.common, global.ng.material.button, global.ng.material.icon));
}(this, function (exports, core, checkboxGroup, common, button, icon) { 'use strict';

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
    /**
     * @template T
     */
    var CheckboxGroupItem = /** @class */ (function (_super) {
        __extends(CheckboxGroupItem, _super);
        function CheckboxGroupItem(checkboxGroup) {
            var _this = _super.call(this, checkboxGroup) || this;
            _this.checkedIcon = 'check_box';
            _this.notCheckedIcon = 'check_box_outline_blank';
            return _this;
        }
        CheckboxGroupItem.decorators = [
            { type: core.Component, args: [{selector: 'ajf-checkbox-group-item',
                        template: "<button mat-button (click)=\"onInputChange($event)\" type=\"button\" [id]=\"checkboxId|async\" [attr.aria-checked]=\"checkedState|async\" [attr.aria-disabled]=\"disabledState|async\" [disabled]=\"readonly\"><span class=\"ajf-checkbox-group-content\"><ng-content></ng-content></span><mat-icon>{{ icon|async }}</mat-icon></button>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[attr.id]': 'id',
                            '[class.ajf-checkbox-group-checked]': 'checked',
                            '[class.ajf-checkbox-group-disable]': 'disabled'
                        },
                        inputs: [
                            'id',
                            'name',
                            'checked',
                            'value',
                            'checkedIcon',
                            'notCheckedIcon',
                            'readonly'
                        ],
                        outputs: [
                            'change'
                        ]
                    },] },
        ];
        /** @nocollapse */
        CheckboxGroupItem.ctorParameters = function () { return [
            { type: checkboxGroup.AjfCheckboxGroup, decorators: [{ type: core.Optional }] }
        ]; };
        return CheckboxGroupItem;
    }(checkboxGroup.AjfCheckboxGroupItem));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfCheckboxGroupModule = /** @class */ (function () {
        function AjfCheckboxGroupModule() {
        }
        AjfCheckboxGroupModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            button.MatButtonModule,
                            icon.MatIconModule,
                            checkboxGroup.AjfCheckboxGroupModule
                        ],
                        declarations: [
                            CheckboxGroupItem
                        ],
                        exports: [
                            checkboxGroup.AjfCheckboxGroupModule,
                            CheckboxGroupItem
                        ]
                    },] },
        ];
        return AjfCheckboxGroupModule;
    }());

    exports.AjfCheckboxGroupModule = AjfCheckboxGroupModule;
    exports.CheckboxGroupItem = CheckboxGroupItem;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-checkbox-group.umd.js.map
