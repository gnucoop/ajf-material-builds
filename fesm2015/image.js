import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AjfImage as AjfImage$1 } from '@ajf/core/image';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/image/image.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImage extends AjfImage$1 {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} ds
     */
    constructor(el, renderer, ds) {
        super(el, renderer, ds);
    }
}
AjfImage.decorators = [
    { type: Component, args: [{
                selector: 'ajf-image',
                template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"]
            }] }
];
/** @nocollapse */
AjfImage.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/image/image-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/image/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfImage, AjfImageModule };
//# sourceMappingURL=image.js.map
