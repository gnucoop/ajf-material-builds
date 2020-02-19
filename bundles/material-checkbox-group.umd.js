(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@ajf/core/checkbox-group'), require('@angular/core'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/icon')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/checkbox-group', ['exports', 'tslib', '@ajf/core/checkbox-group', '@angular/core', '@angular/common', '@angular/material/button', '@angular/material/icon'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.checkboxGroup = {}), global.tslib, global.ng.core.checkboxGroup, global.ng.core, global.ng.common, global.ng.material.button, global.ng.material.icon));
}(this, (function (exports, tslib, checkboxGroup, core, common, button, icon) { 'use strict';

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
    var CheckboxGroupItem = /** @class */ (function (_super) {
        tslib.__extends(CheckboxGroupItem, _super);
        function CheckboxGroupItem(checkboxGroup) {
            var _this = _super.call(this, checkboxGroup) || this;
            _this.checkedIcon = 'check_box';
            _this.notCheckedIcon = 'check_box_outline_blank';
            return _this;
        }
        CheckboxGroupItem.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-checkbox-group-item',
                        template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\"\n    [disabled]=\"readonly\">\n  <span class=\"ajf-checkbox-group-content\"><ng-content></ng-content></span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        host: {
                            '[attr.id]': 'id',
                            '[class.ajf-checkbox-group-checked]': 'checked',
                            '[class.ajf-checkbox-group-disable]': 'disabled'
                        },
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        CheckboxGroupItem.ctorParameters = function () { return [
            { type: checkboxGroup.AjfCheckboxGroup, decorators: [{ type: core.Optional }] }
        ]; };
        return CheckboxGroupItem;
    }(checkboxGroup.AjfCheckboxGroupItem));

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
                    },] }
        ];
        return AjfCheckboxGroupModule;
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

    exports.AjfCheckboxGroupModule = AjfCheckboxGroupModule;
    exports.CheckboxGroupItem = CheckboxGroupItem;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-checkbox-group.umd.js.map
