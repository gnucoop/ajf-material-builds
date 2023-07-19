import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { AjfNodeType, AjfFieldType } from '@ajf/core/forms';
import { AjfNodeIcon as AjfNodeIcon$1 } from '@ajf/core/node-icon';

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
class AjfNodeIcon extends AjfNodeIcon$1 {
    matIcon(node) {
        if (node.nodeType === AjfNodeType.AjfSlide || node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            return 'topic';
        }
        if (node.nodeType !== AjfNodeType.AjfField) {
            return 'broken_image';
        }
        switch (node.fieldType) {
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'abc';
            case AjfFieldType.Number:
            case AjfFieldType.Range:
                return 'pin';
            case AjfFieldType.Boolean:
                return 'toggle_off';
            case AjfFieldType.SingleChoice:
                return 'format_list_bulleted';
            case AjfFieldType.MultipleChoice:
                return 'format_list_numbered';
            case AjfFieldType.Formula:
                return 'code';
            case AjfFieldType.Empty:
                return 'html';
            case AjfFieldType.Date:
            case AjfFieldType.DateInput:
                return 'calendar_month';
            case AjfFieldType.Time:
                return 'access_time';
            case AjfFieldType.Table:
                return 'grid_on';
            case AjfFieldType.Geolocation:
                return 'location_on';
            case AjfFieldType.Barcode:
                return 'qr_code_2';
            case AjfFieldType.File:
                return 'attach_file';
            case AjfFieldType.Image:
                return 'image';
            case AjfFieldType.VideoUrl:
                return 'videocam';
            default:
                return 'broken_image';
        }
    }
}
AjfNodeIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
AjfNodeIcon.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfNodeIcon, selector: "ajf-node-icon", usesInheritance: true, ngImport: i0, template: "<ng-template [ngIf]=\"node\">\n  <mat-icon>{{matIcon(node)}}</mat-icon>\n</ng-template>\n", styles: [""], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIcon, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-node-icon', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"node\">\n  <mat-icon>{{matIcon(node)}}</mat-icon>\n</ng-template>\n" }]
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
class AjfNodeIconModule {
}
AjfNodeIconModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIconModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfNodeIconModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIconModule, declarations: [AjfNodeIcon], imports: [CommonModule, MatIconModule], exports: [AjfNodeIcon] });
AjfNodeIconModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIconModule, imports: [CommonModule, MatIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIconModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatIconModule],
                    declarations: [AjfNodeIcon],
                    exports: [AjfNodeIcon],
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

export { AjfNodeIcon, AjfNodeIconModule };
//# sourceMappingURL=ajf-material-node-icon.mjs.map
