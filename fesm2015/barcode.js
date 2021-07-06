import { AjfBarcode } from '@ajf/core/barcode';
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
const BARCODE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfBarcodeComponent),
    multi: true
};
/**
 * Ajf barcode component.
 */
class AjfBarcodeComponent extends AjfBarcode {
    constructor(cdr, renderer) {
        super(cdr, renderer);
    }
}
AjfBarcodeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-barcode',
                template: "<ng-container *ngIf=\"value; else barcode\">\n  <div class=\"ajf-code-container\">\n    <span>{{ value }}</span>\n    <button mat-raised-button (click)=\"reset()\">\n      <mat-icon style=\"transform: rotate(90deg)\">format_align_justify</mat-icon>\n    </button>\n  </div>\n</ng-container>\n<ng-template #barcode>\n  <mat-button-toggle-group [value]=\"toggle\">\n    <mat-button-toggle (click)=\"toggle = 'drop'; fileInput.click()\">\n      <span>{{'Upload image'|transloco}}</span>\n      <mat-icon>add_circle_outline</mat-icon>\n      <input\n        #fileInput\n        type=\"file\"\n        (change)=\"onSelectFile($event)\"\n        multiple\n        style=\"display: none\"\n      />\n    </mat-button-toggle>\n    <mat-button-toggle (click)=\"toggle = 'drop'\">\n      <span>{{'Drop image'|transloco}}</span>\n    </mat-button-toggle>\n    <mat-button-toggle (click)=\"toggle = 'camera'\">\n      <span>{{'Camera'|transloco}}</span>\n    </mat-button-toggle>\n  </mat-button-toggle-group>\n  <ng-container [ngSwitch]=\"toggle\">\n    <ng-container *ngSwitchCase=\"'drop'\">\n      <div class=\"ajf-drop-container\">\n        <div class=\"ajf-dropzone\" ajfDnd (file)=\"onSelectDrop($event)\">\n          <div class=\"ajf-text-wrapper\">\n            <div class=\"ajf-centered\">\n              {{'Drop your image here!'|transloco}}\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'camera'\">\n      <div\n        ajfVideoDirective\n        [source]=\"videoSource\"\n        class=\"left\"\n        (isInit)=\"takeSnapshot()\"\n      ></div>\n    </ng-container>\n  </ng-container>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [BARCODE_CONTROL_VALUE_ACCESSOR],
                styles: ["ajf-barcode .ajf-code-container{display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:stretch;align-items:center}ajf-barcode .ajf-code-container button{margin-left:10px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch}ajf-barcode .ajf-drop-container .ajf-dropzone{order:0;flex:1 1 auto;align-self:auto;min-height:480px;display:table;background-color:#eee;border:dotted 1px #aaa}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{font-family:sans-serif;font-size:1.3em;font-weight:bold;text-align:center}\n"]
            },] }
];
AjfBarcodeComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];

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
class AjfBarcodeModule {
}
AjfBarcodeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfCommonModule,
                    CommonModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatIconModule,
                    AjfTranslocoModule,
                ],
                declarations: [
                    AjfBarcodeComponent,
                ],
                exports: [
                    AjfBarcodeComponent,
                ],
            },] }
];

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

export { AjfBarcodeComponent, AjfBarcodeModule, BARCODE_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=barcode.js.map
