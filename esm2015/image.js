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
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AjfImage as AjfImage$1 } from '@ajf/core/image';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImage extends AjfImage$1 {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        super(el, renderer);
    }
}
AjfImage.decorators = [
    { type: Component, args: [{selector: 'ajf-image',
                template: "<ng-container [ngSwitch]=\"imageType|async\"><ng-template [ngSwitchCase]=\"imageTypes.Image\"><img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\"></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Icon\"><mat-icon *ngIf=\"iconObj|async as io\" [fontSet]=\"io.fontSet\" [fontIcon]=\"io.fontIcon\"></mat-icon></ng-template><span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span></ng-container>",
                styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                inputs: [
                    'type',
                    'icon',
                    'imageUrl',
                    'flag'
                ],
            },] },
];
/** @nocollapse */
AjfImage.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImageModule {
}
AjfImageModule.decorators = [
    { type: NgModule, args: [{
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
            },] },
];

export { AjfImage, AjfImageModule };
//# sourceMappingURL=image.js.map
