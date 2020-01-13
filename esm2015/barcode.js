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
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { AjfBarcode } from '@ajf/core/barcode';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AjfCommonModule } from '@ajf/core/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const BARCODE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => AjfBarcodeComponent)),
    multi: true
};
/**
 * Ajf barcode component.
 */
class AjfBarcodeComponent extends AjfBarcode {
    /**
     * @param {?} cdr
     * @param {?} renderer
     */
    constructor(cdr, renderer) {
        super(cdr, renderer);
    }
}
AjfBarcodeComponent.decorators = [
    { type: Component, args: [{selector: 'ajf-barcode',
                template: "<ng-container *ngIf=\"value; else barcode\"><div class=\"ajf-code-container\"><span>{{ value }}</span> <button mat-raised-button (click)=\"reset()\"><mat-icon style=\"transform: rotate(90deg)\">format_align_justify</mat-icon></button></div></ng-container><ng-template #barcode><mat-button-toggle-group [(ngModel)]=\"toggle\"><mat-button-toggle value=\"drop\" (click)=\"fileInput.click()\" [disabled]=\"readonly\"><span translate>Upload image</span><mat-icon>add_circle_outline</mat-icon><input #fileInput type=\"file\" (change)=\"onSelectFile($event?.target?.files)\" multiple=\"multiple\" style=\"display:none;\" [disabled]=\"readonly\"></mat-button-toggle><mat-button-toggle value=\"drop\" [disabled]=\"readonly\"><span translate>Drop image</span></mat-button-toggle><mat-button-toggle value=\"camera\" [disabled]=\"readonly\"><span translate>Camera</span></mat-button-toggle></mat-button-toggle-group><ng-container [ngSwitch]=\"toggle\"><ng-container *ngSwitchCase=\"'drop'\"><div class=\"ajf-drop-container\"><div class=\"ajf-dropzone\" [attr.ajfDnd]=\"!readonly\" (file)=\"onSelectFile($event)\"><div class=\"ajf-text-wrapper\"><div class=\"ajf-centered\" translate>Drop your image here!</div></div></div></div></ng-container><ng-container *ngSwitchCase=\"'snapshot'\"><div ajfVideoDirective [source]=\"videoSource\" class=\"left\" (isInit)=\"takeSnapshot()\"></div></ng-container></ng-container></ng-template>",
                styles: ["ajf-barcode .ajf-code-container{display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:stretch;align-items:center}ajf-barcode .ajf-code-container button{margin-left:10px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch}ajf-barcode .ajf-drop-container .ajf-dropzone{order:0;flex:1 1 auto;align-self:auto;min-height:480px;display:table;background-color:#eee;border:dotted 1px #aaa}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{font-family:sans-serif;font-size:1.3em;font-weight:700;text-align:center}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [BARCODE_CONTROL_VALUE_ACCESSOR],
                inputs: ['readonly'],
            },] },
];
/** @nocollapse */
AjfBarcodeComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfBarcodeModule {
}
AjfBarcodeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    TranslateModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatIconModule,
                    AjfCommonModule
                ],
                declarations: [
                    AjfBarcodeComponent,
                ],
                exports: [
                    AjfBarcodeComponent,
                ],
            },] },
];

export { AjfBarcodeComponent, AjfBarcodeModule, BARCODE_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=barcode.js.map
