import { AjfGeolocation } from '@ajf/core/geolocation';
import * as i0 from '@angular/core';
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i4 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i5 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';

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
const GEOLOCATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfGeolocationComponent),
    multi: true,
};
/**
 * Ajf geolocation component.
 */
class AjfGeolocationComponent extends AjfGeolocation {
    constructor(cdr) {
        super(cdr);
    }
}
AjfGeolocationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfGeolocationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfGeolocationComponent, selector: "ajf-geolocation", providers: [GEOLOCATION_CONTROL_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: "<div class=\"flex-container\">\n  <div class=\"flex-child\">\n    <p>{{'Latitude'|transloco}}:</p>\n    <mat-form-field>\n      <input\n        matInput\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"latitude\">\n    </mat-form-field>\n  </div>\n  <div class=\"flex-child\">\n    <p>{{'Longitude'|transloco}}:</p>\n    <mat-form-field>\n      <input\n        matInput\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"longitude\">\n    </mat-form-field>\n    <button mat-raised-button (click)=\"getLocation()\">\n      <mat-icon>location_on</mat-icon>\n    </button>\n  </div>\n</div>", styles: ["ajf-geolocation{display:block}ajf-geolocation button{background:none}ajf-geolocation .flex-container{display:flex;flex-wrap:wrap}ajf-geolocation .flex-child{white-space:nowrap}ajf-geolocation .flex-child p{display:inline-block;min-width:80px}ajf-geolocation .flex-child:first-child{margin-right:5px}\n"], dependencies: [{ kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "component", type: i4.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "pipe", type: i5.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-geolocation', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, providers: [GEOLOCATION_CONTROL_VALUE_ACCESSOR], template: "<div class=\"flex-container\">\n  <div class=\"flex-child\">\n    <p>{{'Latitude'|transloco}}:</p>\n    <mat-form-field>\n      <input\n        matInput\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"latitude\">\n    </mat-form-field>\n  </div>\n  <div class=\"flex-child\">\n    <p>{{'Longitude'|transloco}}:</p>\n    <mat-form-field>\n      <input\n        matInput\n        (focus)=\"focusHandler()\"\n        [(ngModel)]=\"longitude\">\n    </mat-form-field>\n    <button mat-raised-button (click)=\"getLocation()\">\n      <mat-icon>location_on</mat-icon>\n    </button>\n  </div>\n</div>", styles: ["ajf-geolocation{display:block}ajf-geolocation button{background:none}ajf-geolocation .flex-container{display:flex;flex-wrap:wrap}ajf-geolocation .flex-child{white-space:nowrap}ajf-geolocation .flex-child p{display:inline-block;min-width:80px}ajf-geolocation .flex-child:first-child{margin-right:5px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });

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
class AjfGeolocationModule {
}
AjfGeolocationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfGeolocationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationModule, declarations: [AjfGeolocationComponent], imports: [AjfTranslocoModule,
        CommonModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule], exports: [AjfGeolocationComponent] });
AjfGeolocationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationModule, imports: [AjfTranslocoModule,
        CommonModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfTranslocoModule,
                        CommonModule,
                        FormsModule,
                        MatIconModule,
                        MatInputModule,
                        MatFormFieldModule,
                    ],
                    declarations: [AjfGeolocationComponent],
                    exports: [AjfGeolocationComponent],
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

export { AjfGeolocationComponent, AjfGeolocationModule, GEOLOCATION_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=ajf-material-geolocation.mjs.map
