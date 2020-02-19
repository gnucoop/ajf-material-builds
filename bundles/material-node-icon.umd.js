(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/material/icon'), require('tslib'), require('@ajf/core/node-icon')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/node-icon', ['exports', '@angular/common', '@angular/core', '@angular/material/icon', 'tslib', '@ajf/core/node-icon'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.nodeIcon = {}), global.ng.common, global.ng.core, global.ng.material.icon, global.tslib, global.ng.core.nodeIcon));
}(this, (function (exports, common, core, icon, tslib, nodeIcon) { 'use strict';

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
    var AjfNodeIcon = /** @class */ (function (_super) {
        tslib.__extends(AjfNodeIcon, _super);
        function AjfNodeIcon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AjfNodeIcon.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-node-icon',
                        template: "<ng-template [ngIf]=\"node\">\n  <mat-icon [fontSet]=\"fontSet\" [fontIcon]=\"fontIcon\"></mat-icon>\n</ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n"]
                    }] }
        ];
        return AjfNodeIcon;
    }(nodeIcon.AjfNodeIcon));

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
                    },] }
        ];
        return AjfNodeIconModule;
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

    exports.AjfNodeIcon = AjfNodeIcon;
    exports.AjfNodeIconModule = AjfNodeIconModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-node-icon.umd.js.map
