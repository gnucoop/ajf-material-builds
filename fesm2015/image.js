import { __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AjfImage as AjfImage$1 } from '@ajf/core/image';
import { DomSanitizer } from '@angular/platform-browser';

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
let AjfImage = /** @class */ (() => {
    let AjfImage = class AjfImage extends AjfImage$1 {
        constructor(el, renderer, ds) {
            super(el, renderer, ds);
        }
    };
    AjfImage = __decorate([
        Component({
            selector: 'ajf-image',
            template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, DomSanitizer])
    ], AjfImage);
    return AjfImage;
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
let AjfImageModule = /** @class */ (() => {
    let AjfImageModule = class AjfImageModule {
    };
    AjfImageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MatIconModule,
            ],
            declarations: [
                AjfImage,
            ],
            exports: [
                AjfImage,
            ],
        })
    ], AjfImageModule);
    return AjfImageModule;
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

export { AjfImage, AjfImageModule };
//# sourceMappingURL=image.js.map
