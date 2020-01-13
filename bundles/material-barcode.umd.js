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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@ajf/core/barcode'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/icon'), require('@ngx-translate/core'), require('@ajf/core/common')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/barcode', ['exports', '@angular/core', '@angular/forms', '@ajf/core/barcode', '@angular/common', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/icon', '@ngx-translate/core', '@ajf/core/common'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.barcode = {}), global.ng.core, global.ng.forms, global.ajf.core.barcode, global.ng.common, global.ng.material.button, global.ng.material.buttonToggle, global.ng.material.icon, global.ngxt.core, global.ajf.core.common));
}(this, function (exports, core, forms, barcode, common, button, buttonToggle, icon, core$1, common$1) { 'use strict';

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
    /** @type {?} */
    var BARCODE_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return AjfBarcodeComponent; })),
        multi: true
    };
    /**
     * Ajf barcode component.
     */
    var AjfBarcodeComponent = /** @class */ (function (_super) {
        __extends(AjfBarcodeComponent, _super);
        function AjfBarcodeComponent(cdr, renderer) {
            return _super.call(this, cdr, renderer) || this;
        }
        AjfBarcodeComponent.decorators = [
            { type: core.Component, args: [{selector: 'ajf-barcode',
                        template: "<ng-container *ngIf=\"value; else barcode\"><div class=\"ajf-code-container\"><span>{{ value }}</span> <button mat-raised-button (click)=\"reset()\"><mat-icon style=\"transform: rotate(90deg)\">format_align_justify</mat-icon></button></div></ng-container><ng-template #barcode><mat-button-toggle-group [(ngModel)]=\"toggle\"><mat-button-toggle value=\"drop\" (click)=\"fileInput.click()\" [disabled]=\"readonly\"><span translate>Upload image</span><mat-icon>add_circle_outline</mat-icon><input #fileInput type=\"file\" (change)=\"onSelectFile($event?.target?.files)\" multiple=\"multiple\" style=\"display:none;\" [disabled]=\"readonly\"></mat-button-toggle><mat-button-toggle value=\"drop\" [disabled]=\"readonly\"><span translate>Drop image</span></mat-button-toggle><mat-button-toggle value=\"camera\" [disabled]=\"readonly\"><span translate>Camera</span></mat-button-toggle></mat-button-toggle-group><ng-container [ngSwitch]=\"toggle\"><ng-container *ngSwitchCase=\"'drop'\"><div class=\"ajf-drop-container\"><div class=\"ajf-dropzone\" [attr.ajfDnd]=\"!readonly\" (file)=\"onSelectFile($event)\"><div class=\"ajf-text-wrapper\"><div class=\"ajf-centered\" translate>Drop your image here!</div></div></div></div></ng-container><ng-container *ngSwitchCase=\"'snapshot'\"><div ajfVideoDirective [source]=\"videoSource\" class=\"left\" (isInit)=\"takeSnapshot()\"></div></ng-container></ng-container></ng-template>",
                        styles: ["ajf-barcode .ajf-code-container{display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:stretch;align-items:center}ajf-barcode .ajf-code-container button{margin-left:10px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch}ajf-barcode .ajf-drop-container .ajf-dropzone{order:0;flex:1 1 auto;align-self:auto;min-height:480px;display:table;background-color:#eee;border:dotted 1px #aaa}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{font-family:sans-serif;font-size:1.3em;font-weight:700;text-align:center}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [BARCODE_CONTROL_VALUE_ACCESSOR],
                        inputs: ['readonly'],
                    },] },
        ];
        /** @nocollapse */
        AjfBarcodeComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 }
        ]; };
        return AjfBarcodeComponent;
    }(barcode.AjfBarcode));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfBarcodeModule = /** @class */ (function () {
        function AjfBarcodeModule() {
        }
        AjfBarcodeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            core$1.TranslateModule,
                            button.MatButtonModule,
                            buttonToggle.MatButtonToggleModule,
                            icon.MatIconModule,
                            common$1.AjfCommonModule
                        ],
                        declarations: [
                            AjfBarcodeComponent,
                        ],
                        exports: [
                            AjfBarcodeComponent,
                        ],
                    },] },
        ];
        return AjfBarcodeModule;
    }());

    exports.AjfBarcodeComponent = AjfBarcodeComponent;
    exports.AjfBarcodeModule = AjfBarcodeModule;
    exports.BARCODE_CONTROL_VALUE_ACCESSOR = BARCODE_CONTROL_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-barcode.umd.js.map
