import { AjfBarcode } from '@ajf/core/barcode';
import * as i0 from '@angular/core';
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i1 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i6 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';

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
    multi: true,
};
/**
 * Ajf barcode component.
 */
class AjfBarcodeComponent extends AjfBarcode {
    constructor(cdr, renderer) {
        super(cdr, renderer);
    }
}
AjfBarcodeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfBarcodeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfBarcodeComponent, selector: "ajf-barcode", providers: [BARCODE_CONTROL_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"value; else barcode\">\n  <div class=\"ajf-code-container\">\n    <span>{{ value }}</span>\n    <button mat-raised-button (click)=\"reset()\">\n      <mat-icon style=\"transform: rotate(90deg)\">format_align_justify</mat-icon>\n    </button>\n  </div>\n</ng-container>\n<ng-template #barcode>\n  <mat-tab-group (selectedIndexChange)=\"onTabChange($event)\">\n    <mat-tab [label]=\"'Image'| transloco\">\n      <div class=\"ajf-drop-container\">\n        <div class=\"ajf-dropzone\" ajfDnd (file)=\"onSelectDrop($event)\">\n          <div class=\"ajf-text-wrapper\">\n            <div class=\"ajf-centered\">\n              <a mat-button (click)=\"fileInput.click()\">{{'Drop your image here or click to select'|transloco}}</a>\n            </div>\n          </div>\n        </div>\n        <div #barcodeImagePreview class=\"ajf-barcode-image-preview\"></div>\n      </div>\n      <input\n        #fileInput\n        type=\"file\"\n        (change)=\"onSelectFile($event)\"\n        multiple\n        style=\"display: none\"\n      />\n    </mat-tab>\n    <mat-tab [label]=\"'Camera'|transloco\">\n      <div class=\"ajf-barcode-video\">\n        <ng-container *ngIf=\"supportsVideoStream; else noVideo\">\n          <div *ngIf=\"showSwitchButton\" class=\"ajf-barcode-switch-camera\">\n            <button mat-icon-button (click)=\"switchCamera()\"><mat-icon>switch_camera</mat-icon></button>\n          </div>\n          <div #barcodeVideoPreview class=\"ajf-video-preview ajf-video-preview-hidden\">\n            <div *ngIf=\"value && value.length > 0\">{{ value }}</div>\n          </div>\n          <video #barcodeVideo autoplay playsinline muted></video>\n        </ng-container>\n        <ng-template #noVideo>\n\n        </ng-template>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n</ng-template>\n", styles: ["ajf-barcode{display:block}ajf-barcode .ajf-code-container{display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:stretch;align-items:center}ajf-barcode .ajf-code-container button{margin-left:10px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch;position:relative}ajf-barcode .ajf-drop-container .ajf-barcode-image-preview{position:absolute;inset:0;z-index:1;background-size:contain;background-repeat:no-repeat;background-position:center}ajf-barcode .ajf-drop-container .ajf-dropzone{z-index:2;order:0;flex:1 1 auto;align-self:auto;height:50vh;display:table;background-color:#eeeeee80;border:dotted 1px #aaa;overflow:hidden}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{font-family:sans-serif;font-size:1.3em;font-weight:700;text-align:center}ajf-barcode .ajf-barcode-video{height:50vh;position:relative}ajf-barcode .ajf-barcode-video>video{width:100%;height:100%}ajf-barcode .ajf-barcode-video>.ajf-video-preview{position:absolute;inset:0;width:100%;height:100%;z-index:5;border:3px solid #000000}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden{display:none;position:relative}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden>div{position:absolute;right:0;left:0;bottom:-1em;height:2em;box-sizing:border-box;padding:.5em;background-color:#fff;border-radius:.5em}ajf-barcode .ajf-barcode-video>.ajf-barcode-switch-camera{position:absolute;top:1em;right:1em;z-index:10;padding:.5em;border-radius:.5em;background-color:#fff}\n"], dependencies: [{ kind: "directive", type: i1.AjfDndDirective, selector: "[ajfDnd]", outputs: ["file"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatAnchor, selector: "a[mat-button], a[mat-raised-button], a[mat-flat-button], a[mat-stroked-button]", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i5.MatTab, selector: "mat-tab", inputs: ["disabled"], exportAs: ["matTab"] }, { kind: "component", type: i5.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "disableRipple", "fitInkBarToContent", "mat-stretch-tabs"], exportAs: ["matTabGroup"] }, { kind: "pipe", type: i6.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-barcode', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [BARCODE_CONTROL_VALUE_ACCESSOR], template: "<ng-container *ngIf=\"value; else barcode\">\n  <div class=\"ajf-code-container\">\n    <span>{{ value }}</span>\n    <button mat-raised-button (click)=\"reset()\">\n      <mat-icon style=\"transform: rotate(90deg)\">format_align_justify</mat-icon>\n    </button>\n  </div>\n</ng-container>\n<ng-template #barcode>\n  <mat-tab-group (selectedIndexChange)=\"onTabChange($event)\">\n    <mat-tab [label]=\"'Image'| transloco\">\n      <div class=\"ajf-drop-container\">\n        <div class=\"ajf-dropzone\" ajfDnd (file)=\"onSelectDrop($event)\">\n          <div class=\"ajf-text-wrapper\">\n            <div class=\"ajf-centered\">\n              <a mat-button (click)=\"fileInput.click()\">{{'Drop your image here or click to select'|transloco}}</a>\n            </div>\n          </div>\n        </div>\n        <div #barcodeImagePreview class=\"ajf-barcode-image-preview\"></div>\n      </div>\n      <input\n        #fileInput\n        type=\"file\"\n        (change)=\"onSelectFile($event)\"\n        multiple\n        style=\"display: none\"\n      />\n    </mat-tab>\n    <mat-tab [label]=\"'Camera'|transloco\">\n      <div class=\"ajf-barcode-video\">\n        <ng-container *ngIf=\"supportsVideoStream; else noVideo\">\n          <div *ngIf=\"showSwitchButton\" class=\"ajf-barcode-switch-camera\">\n            <button mat-icon-button (click)=\"switchCamera()\"><mat-icon>switch_camera</mat-icon></button>\n          </div>\n          <div #barcodeVideoPreview class=\"ajf-video-preview ajf-video-preview-hidden\">\n            <div *ngIf=\"value && value.length > 0\">{{ value }}</div>\n          </div>\n          <video #barcodeVideo autoplay playsinline muted></video>\n        </ng-container>\n        <ng-template #noVideo>\n\n        </ng-template>\n      </div>\n    </mat-tab>\n  </mat-tab-group>\n</ng-template>\n", styles: ["ajf-barcode{display:block}ajf-barcode .ajf-code-container{display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:center;align-content:stretch;align-items:center}ajf-barcode .ajf-code-container button{margin-left:10px}ajf-barcode .ajf-drop-container{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start;align-content:stretch;align-items:stretch;position:relative}ajf-barcode .ajf-drop-container .ajf-barcode-image-preview{position:absolute;inset:0;z-index:1;background-size:contain;background-repeat:no-repeat;background-position:center}ajf-barcode .ajf-drop-container .ajf-dropzone{z-index:2;order:0;flex:1 1 auto;align-self:auto;height:50vh;display:table;background-color:#eeeeee80;border:dotted 1px #aaa;overflow:hidden}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-text-wrapper{display:table-cell;vertical-align:middle}ajf-barcode .ajf-drop-container .ajf-dropzone .ajf-centered{font-family:sans-serif;font-size:1.3em;font-weight:700;text-align:center}ajf-barcode .ajf-barcode-video{height:50vh;position:relative}ajf-barcode .ajf-barcode-video>video{width:100%;height:100%}ajf-barcode .ajf-barcode-video>.ajf-video-preview{position:absolute;inset:0;width:100%;height:100%;z-index:5;border:3px solid #000000}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden{display:none;position:relative}ajf-barcode .ajf-barcode-video>.ajf-video-preview.ajf-video-preview-hidden>div{position:absolute;right:0;left:0;bottom:-1em;height:2em;box-sizing:border-box;padding:.5em;background-color:#fff;border-radius:.5em}ajf-barcode .ajf-barcode-video>.ajf-barcode-switch-camera{position:absolute;top:1em;right:1em;z-index:10;padding:.5em;border-radius:.5em;background-color:#fff}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }]; } });

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
AjfBarcodeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfBarcodeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeModule, declarations: [AjfBarcodeComponent], imports: [AjfCommonModule,
        AjfTranslocoModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule], exports: [AjfBarcodeComponent] });
AjfBarcodeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeModule, imports: [AjfCommonModule,
        AjfTranslocoModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfCommonModule,
                        AjfTranslocoModule,
                        CommonModule,
                        MatButtonModule,
                        MatIconModule,
                        MatTabsModule,
                    ],
                    declarations: [AjfBarcodeComponent],
                    exports: [AjfBarcodeComponent],
                }]
        }] });

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
//# sourceMappingURL=ajf-material-barcode.mjs.map
