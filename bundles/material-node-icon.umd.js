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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/material/icon'), require('@ajf/core/node-icon')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/node-icon', ['exports', '@angular/common', '@angular/core', '@angular/material/icon', '@ajf/core/node-icon'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.nodeIcon = {}), global.ng.common, global.ng.core, global.ng.material.icon, global.ajf.core.nodeIcon));
}(this, function (exports, common, core, icon, nodeIcon) { 'use strict';

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
    var AjfNodeIcon = /** @class */ (function (_super) {
        __extends(AjfNodeIcon, _super);
        function AjfNodeIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AjfNodeIcon.decorators = [
            { type: core.Component, args: [{selector: 'ajf-node-icon',
                        template: "<ng-template [ngIf]=\"node\"><mat-icon [fontSet]=\"fontSet\" [fontIcon]=\"fontIcon\"></mat-icon></ng-template>",
                        styles: [""],
                        inputs: ['node'],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        return AjfNodeIcon;
    }(nodeIcon.AjfNodeIcon));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfNodeIconModule = /** @class */ (function () {
        function AjfNodeIconModule() {
        }
        AjfNodeIconModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            icon.MatIconModule,
                        ],
                        declarations: [
                            AjfNodeIcon,
                        ],
                        exports: [
                            AjfNodeIcon,
                        ],
                    },] },
        ];
        return AjfNodeIconModule;
    }());

    exports.AjfNodeIcon = AjfNodeIcon;
    exports.AjfNodeIconModule = AjfNodeIconModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-node-icon.umd.js.map
