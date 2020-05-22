import { __decorate, __param, __metadata } from 'tslib';
import { AjfCheckboxGroupItem, AjfCheckboxGroup, AjfCheckboxGroupModule as AjfCheckboxGroupModule$1 } from '@ajf/core/checkbox-group';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
let CheckboxGroupItem = /** @class */ (() => {
    let CheckboxGroupItem = class CheckboxGroupItem extends AjfCheckboxGroupItem {
        constructor(checkboxGroup) {
            super(checkboxGroup);
            this.checkedIcon = 'check_box';
            this.notCheckedIcon = 'check_box_outline_blank';
        }
    };
    CheckboxGroupItem = __decorate([
        Component({
            selector: 'ajf-checkbox-group-item',
            template: "<button mat-button (click)=\"onInputChange($event)\"\n    type=\"button\"\n    [id]=\"checkboxId|async\"\n    [attr.aria-checked]=\"checkedState|async\"\n    [attr.aria-disabled]=\"disabledState|async\">\n  <span class=\"ajf-checkbox-group-content\">\n    <ng-content></ng-content>\n  </span>\n  <mat-icon>{{ icon|async }}</mat-icon>\n</button>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: {
                '[attr.id]': 'id',
                '[class.ajf-checkbox-group-checked]': 'checked',
                '[class.ajf-checkbox-group-disable]': 'disabled'
            },
            styles: ["\n"]
        }),
        __param(0, Optional()),
        __metadata("design:paramtypes", [AjfCheckboxGroup])
    ], CheckboxGroupItem);
    return CheckboxGroupItem;
})();

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
let AjfCheckboxGroupModule = /** @class */ (() => {
    let AjfCheckboxGroupModule = class AjfCheckboxGroupModule {
    };
    AjfCheckboxGroupModule = __decorate([
        NgModule({
            imports: [
                AjfCheckboxGroupModule$1,
                CommonModule,
                MatButtonModule,
                MatIconModule,
            ],
            declarations: [
                CheckboxGroupItem,
            ],
            exports: [
                AjfCheckboxGroupModule$1,
                CheckboxGroupItem,
            ],
        })
    ], AjfCheckboxGroupModule);
    return AjfCheckboxGroupModule;
})();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCheckboxGroupModule, CheckboxGroupItem };
//# sourceMappingURL=checkbox-group.js.map
