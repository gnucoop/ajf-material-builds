import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AjfNodeIcon as AjfNodeIcon$1 } from '@ajf/core/node-icon';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/node-icon/node-icon.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfNodeIcon extends AjfNodeIcon$1 {
}
AjfNodeIcon.decorators = [
    { type: Component, args: [{
                selector: 'ajf-node-icon',
                template: "<ng-template [ngIf]=\"node\">\n  <mat-icon [fontSet]=\"fontSet\" [fontIcon]=\"fontIcon\"></mat-icon>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["\n"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/node-icon/node-icon-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfNodeIconModule {
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/node-icon/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfNodeIcon, AjfNodeIconModule };
//# sourceMappingURL=node-icon.js.map
