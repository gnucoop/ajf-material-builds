import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, NgModule } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { AjfImage as AjfImage$1 } from '@ajf/core/image';
import * as i1 from '@angular/platform-browser';

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
class AjfImage extends AjfImage$1 {
    constructor(el, renderer, ds) {
        super(el, renderer, ds);
    }
}
AjfImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImage, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfImage.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfImage, selector: "ajf-image", usesInheritance: true, ngImport: i0, template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n", styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"], components: [{ type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImage, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-image', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n", styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DomSanitizer }]; } });

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
class AjfImageModule {
}
AjfImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImageModule, declarations: [AjfImage], imports: [CommonModule, MatIconModule], exports: [AjfImage] });
AjfImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImageModule, imports: [[CommonModule, MatIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatIconModule],
                    declarations: [AjfImage],
                    exports: [AjfImage],
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

export { AjfImage, AjfImageModule };
//# sourceMappingURL=image.mjs.map
