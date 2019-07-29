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
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { __extends } from 'tslib';
import { AjfNodeIcon as AjfNodeIcon$1 } from '@ajf/core/node-icon';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfNodeIcon = /** @class */ (function (_super) {
    __extends(AjfNodeIcon, _super);
    function AjfNodeIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AjfNodeIcon.decorators = [
        { type: Component, args: [{selector: 'ajf-node-icon',
                    template: "<ng-template [ngIf]=\"node\"><mat-icon [fontSet]=\"fontSet\" [fontIcon]=\"fontIcon\"></mat-icon></ng-template>",
                    styles: [""],
                    inputs: ['node'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    return AjfNodeIcon;
}(AjfNodeIcon$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfNodeIconModule = /** @class */ (function () {
    function AjfNodeIconModule() {
    }
    AjfNodeIconModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
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

export { AjfNodeIcon, AjfNodeIconModule };
//# sourceMappingURL=node-icon.es5.js.map
