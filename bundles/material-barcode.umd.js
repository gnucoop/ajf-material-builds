(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@ajf/core/barcode'), require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/icon'), require('@ngx-translate/core'), require('@ajf/core/common')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/barcode', ['exports', 'tslib', '@ajf/core/barcode', '@angular/core', '@angular/forms', '@angular/common', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/icon', '@ngx-translate/core', '@ajf/core/common'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.barcode = {}), global.tslib, global.ng.core.barcode, global.ng.core, global.ng.forms, global.ng.common, global.ng.material.button, global.ng.material.buttonToggle, global.ng.material.icon, global.ngxTranslate.core, global.ng.core.common));
}(this, (function (exports, tslib, barcode, core, forms, common, button, buttonToggle, icon, core$1, common$1) { 'use strict';

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
    var BARCODE_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return AjfBarcodeComponent; }),
        multi: true
    };
    /**
     * Ajf barcode component.
     */
    var AjfBarcodeComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfBarcodeComponent, _super);
        function AjfBarcodeComponent(cdr, renderer) {
            return _super.call(this, cdr, renderer) || this;
        }
        AjfBarcodeComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-barcode',
                        template: "<ng-container *ngIf=\"value; else barcode\">\n  <div class=\"ajf-code-container\">\n    <span>{{ value }}</span>\n    <button mat-raised-button (click)=\"reset()\">\n      <mat-icon style=\"transform: rotate(90deg)\">format_align_justify</mat-icon>\n    </button>\n  </div>\n</ng-container>\n<ng-template #barcode>\n  <mat-button-toggle-group [(ngModel)]=toggle>\n    <mat-button-toggle value=\"drop\" (click)=\"fileInput.click()\" [disabled]=\"readonly\">\n      <span translate>Upload image</span>\n      <mat-icon>add_circle_outline</mat-icon>\n      <input #fileInput type=\"file\" (change)=\"onSelectFile($event)\" multiple style=\"display:none;\" [disabled]=\"readonly\"/>\n    </mat-button-toggle>\n    <mat-button-toggle value=\"drop\" [disabled]=\"readonly\">\n      <span translate>Drop image</span>\n    </mat-button-toggle>\n    <mat-button-toggle value=\"camera\" [disabled]=\"readonly\">\n      <span translate>Camera</span>\n    </mat-button-toggle>\n  </mat-button-toggle-group>\n  <ng-container [ngSwitch]=\"toggle\">\n    <ng-container *ngSwitchCase=\"'drop'\">\n      <div class=\"ajf-drop-container\">\n        <div class=\"ajf-dropzone\" [attr.ajfDnd]=\"!readonly\" (file)=\"onSelectFile($event)\">\n          <div class=\"ajf-text-wrapper\">\n            <div class=\"ajf-centered\" translate>Drop your image here!</div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'snapshot'\">\n      <div ajfVideoDirective [source]=\"videoSource\" class=\"left\" (isInit)=\"takeSnapshot()\"></div>\n    </ng-container>\n  </ng-container>\n</ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        providers: [BARCODE_CONTROL_VALUE_ACCESSOR],
                        styles: ["ajf-barcode .ajf-code-container{display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:stretch;align-items:center}ajf-barcode .ajf-code-container button{margin-left:10px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch}ajf-barcode .ajf-drop-container .ajf-dropzone{order:0;flex:1 1 auto;align-self:auto;min-height:480px;display:table;background-color:#eee;border:dotted 1px #aaa}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{font-family:sans-serif;font-size:1.3em;font-weight:bold;text-align:center}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfBarcodeComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 }
        ]; };
        return AjfBarcodeComponent;
    }(barcode.AjfBarcode));

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
                    },] }
        ];
        return AjfBarcodeModule;
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

    exports.AjfBarcodeComponent = AjfBarcodeComponent;
    exports.AjfBarcodeModule = AjfBarcodeModule;
    exports.BARCODE_CONTROL_VALUE_ACCESSOR = BARCODE_CONTROL_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-barcode.umd.js.map
