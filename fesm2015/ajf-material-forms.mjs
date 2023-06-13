import * as i1 from '@ajf/core/forms';
import { AjfBaseFieldComponent, AJF_WARNING_ALERT_SERVICE, AjfInputFieldComponent as AjfInputFieldComponent$1, AjfFieldWithChoicesComponent, AJF_SEARCH_ALERT_THRESHOLD, AjfTableFieldComponent as AjfTableFieldComponent$1, AjfVideoUrlFieldComponent as AjfVideoUrlFieldComponent$1, AjfFieldService as AjfFieldService$1, AjfFieldType, AjfReadOnlyFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlySelectFieldComponent, AjfReadOnlyGeolocationFieldComponent, AjfFileFieldComponent, AjfReadOnlyFileFieldComponent, AjfImageFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlyVideoUrlFieldComponent, AjfFormField as AjfFormField$1, AjfFormRenderer as AjfFormRenderer$1, AjfFormsModule as AjfFormsModule$1 } from '@ajf/core/forms';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injectable, Inject, ViewChild, Optional, Input, NgModule } from '@angular/core';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i4 from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as i5 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i2$2 from '@ajf/material/calendar';
import { AjfCalendarModule } from '@ajf/material/calendar';
import * as i4$2 from '@angular/material/input';
import { MatInput, MatInputModule } from '@angular/material/input';
import * as i3$1 from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as i4$1 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3$2 from '@ngneat/transloco';
import * as i2$3 from '@ajf/material/barcode';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import * as i2$4 from '@ajf/material/geolocation';
import { AjfGeolocationModule } from '@ajf/material/geolocation';
import * as i2$5 from '@ajf/material/checkbox-group';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import * as i3$3 from '@ajf/core/checkbox-group';
import * as i5$1 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i6 from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { AjfRange } from '@ajf/core/range';
import * as i4$3 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import * as i3$4 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i4$4 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i5$2 from '@angular/cdk/text-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import * as i2$6 from '@ajf/material/time';
import { AjfTimeModule } from '@ajf/material/time';
import * as i2$7 from '@angular/platform-browser';
import * as i3$5 from '@angular/common/http';
import * as i2$8 from '@ajf/core/page-slider';
import * as i3$6 from '@ajf/material/page-slider';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import * as i6$1 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i7 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i8 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i9 from '@angular/material/toolbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as i10 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
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
class AjfFieldWarningDialog {
    constructor() {
        this.message = '';
    }
}
AjfFieldWarningDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldWarningDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfFieldWarningDialog.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfFieldWarningDialog, selector: "ng-component", ngImport: i0, template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n", dependencies: [{ kind: "component", type: i5.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "directive", type: i2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: i2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldWarningDialog, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n" }]
        }] });

class AjfWarningAlertService {
    constructor(_dialog) {
        this._dialog = _dialog;
    }
    showWarningAlertPrompt(warnings) {
        const dialog = this._dialog.open(AjfFieldWarningDialog);
        dialog.componentInstance.message = warnings.join('<br>');
        return dialog.afterClosed().pipe(map((result) => ({ result })));
    }
}
AjfWarningAlertService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWarningAlertService, deps: [{ token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Injectable });
AjfWarningAlertService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWarningAlertService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWarningAlertService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2.MatDialog }]; } });

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
class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfBooleanFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBooleanFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfBooleanFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfBooleanFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<mat-slide-toggle *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></mat-slide-toggle>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex"], exportAs: ["matSlideToggle"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBooleanFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-slide-toggle *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></mat-slide-toggle>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfDateFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfDateFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDateFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfDateFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfDateFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance!.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance!.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n", styles: [""], dependencies: [{ kind: "component", type: i2$2.AjfCalendarComponent, selector: "ajf-calendar" }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfDateValuePipe, name: "ajfDateValue" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDateFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance!.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance!.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfDateInputFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfDateInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDateInputFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfDateInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfDateInputFieldComponent, selector: "ng-component", viewQueries: [{ propertyName: "input", first: true, predicate: MatInput, descendants: true }], usesInheritance: true, ngImport: i0, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input\n    matInput\n    [matDatepicker]=\"picker\"\n    [attr.aria-label]=\"instance!|ajfNodeCompleteName\"\n    [min]=\"instance!.node.minDate|ajfDateValueString\"\n    [max]=\"instance!.node.maxDate|ajfDateValueString\"\n    [formControl]=\"ctrl!\"\n  />\n  <mat-datepicker-toggle matIconSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MatDatepicker, selector: "mat-datepicker", exportAs: ["matDatepicker"] }, { kind: "directive", type: i3$1.MatDatepickerInput, selector: "input[matDatepicker]", inputs: ["matDatepicker", "min", "max", "matDatepickerFilter"], exportAs: ["matDatepickerInput"] }, { kind: "component", type: i3$1.MatDatepickerToggle, selector: "mat-datepicker-toggle", inputs: ["for", "tabIndex", "aria-label", "disabled", "disableRipple"], exportAs: ["matDatepickerToggle"] }, { kind: "component", type: i4$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "directive", type: i4$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfDateValueStringPipe, name: "ajfDateValueString" }, { kind: "pipe", type: i1.AjfNodeCompleteNamePipe, name: "ajfNodeCompleteName" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDateInputFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input\n    matInput\n    [matDatepicker]=\"picker\"\n    [attr.aria-label]=\"instance!|ajfNodeCompleteName\"\n    [min]=\"instance!.node.minDate|ajfDateValueString\"\n    [max]=\"instance!.node.maxDate|ajfDateValueString\"\n    [formControl]=\"ctrl!\"\n  />\n  <mat-datepicker-toggle matIconSuffix [for]=\"picker\"></mat-datepicker-toggle>\n  <mat-datepicker #picker></mat-datepicker>\n</mat-form-field>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    }, propDecorators: { input: [{
                type: ViewChild,
                args: [MatInput, { static: false }]
            }] } });

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
class AjfEmptyFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfEmptyFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEmptyFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfEmptyFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfEmptyFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"instance\">\n  <h1 [innerHTML]=\"instance.node.label | transloco\"></h1>\n  <div [innerHTML]=\"instance.node.HTML | transloco\"></div>\n</ng-container>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$2.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEmptyFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"instance\">\n  <h1 [innerHTML]=\"instance.node.label | transloco\"></h1>\n  <div [innerHTML]=\"instance.node.HTML | transloco\"></div>\n</ng-container>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfBarcodeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfBarcodeFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfBarcodeFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfBarcodeFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-barcode>\n", styles: [""], dependencies: [{ kind: "component", type: i2$3.AjfBarcodeComponent, selector: "ajf-barcode" }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcodeFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-barcode>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfInputFieldComponent extends AjfInputFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfInputFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfInputFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput *ngIf=\"type === 'text'\" type=\"text\" [formControl]=\"ctrl!\"\n    [readonly]=\"instance!|ajfIsReadonlyInputField\" [attr.aria-labelledby]=\"instance!.node.name\">\n  <input matInput *ngIf=\"type === 'number'\" type=\"number\" [formControl]=\"ctrl!\"\n    [readonly]=\"instance!|ajfIsReadonlyInputField\" [attr.aria-labelledby]=\"instance!.node.name\">\n</mat-form-field>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfIsReadonlyInputFieldPipe, name: "ajfIsReadonlyInputField" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfInputFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput *ngIf=\"type === 'text'\" type=\"text\" [formControl]=\"ctrl!\"\n    [readonly]=\"instance!|ajfIsReadonlyInputField\" [attr.aria-labelledby]=\"instance!.node.name\">\n  <input matInput *ngIf=\"type === 'number'\" type=\"number\" [formControl]=\"ctrl!\"\n    [readonly]=\"instance!|ajfIsReadonlyInputField\" [attr.aria-labelledby]=\"instance!.node.name\">\n</mat-form-field>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfGeolocationFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfGeolocationFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfGeolocationFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfGeolocationFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-geolocation *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-geolocation>", styles: [""], dependencies: [{ kind: "component", type: i2$4.AjfGeolocationComponent, selector: "ajf-geolocation" }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGeolocationFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-geolocation *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-geolocation>" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfMultipleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
    }
}
AjfMultipleChoiceFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMultipleChoiceFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: AJF_SEARCH_ALERT_THRESHOLD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AjfMultipleChoiceFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfMultipleChoiceFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"instance\">\n  <ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n    <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\">\n      <mat-option [value]=\"choice.value\"\n          *ngFor=\"let choice of instance!.filteredChoices\">\n        {{ choice.label | transloco }}\n      </mat-option>\n    </mat-select>\n  </ng-container>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance!.filteredChoices\"\n        [value]=\"choice.value\">\n      {{ choice.label | transloco }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n", styles: [""], dependencies: [{ kind: "component", type: i2$5.CheckboxGroupItem, selector: "ajf-checkbox-group-item" }, { kind: "directive", type: i3$3.AjfCheckboxGroup, selector: "ajf-checkbox-group,[ajf-checkbox-group]", inputs: ["value", "name", "disabled"], outputs: ["change"] }, { kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i3$2.TranslocoPipe, name: "transloco" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfExpandFieldWithChoicesPipe, name: "ajfExpandFieldWithChoices" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMultipleChoiceFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"instance\">\n  <ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n    <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\">\n      <mat-option [value]=\"choice.value\"\n          *ngFor=\"let choice of instance!.filteredChoices\">\n        {{ choice.label | transloco }}\n      </mat-option>\n    </mat-select>\n  </ng-container>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance!.filteredChoices\"\n        [value]=\"choice.value\">\n      {{ choice.label | transloco }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [AJF_SEARCH_ALERT_THRESHOLD]
                    }] }];
    } });

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
class AjfRangeFieldComponent extends AjfRange {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfRangeFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfRangeFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfRangeFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfRangeFieldComponent, selector: "ajf-range", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <mat-slider\n    discrete\n    showTickMarks\n    [step]=\"step\"\n    [min]=\"start\"\n    [max]=\"end\"\n    [attr.aria-label]=\"name\"\n    [attr.name]=\"name\"\n  ><input matSliderThumb [value]=\"ctrl.value\" [formControl]=\"ctrl\" /></mat-slider>\n  <div class=\"ajf-range-label\">\n    <label>{{ctrl.value}}</label>\n  </div>\n</ng-container>\n", styles: [".ajf-range-label{display:inline-block;padding:0 10px}\n"], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4$3.MatSlider, selector: "mat-slider", inputs: ["color", "disableRipple", "disabled", "discrete", "showTickMarks", "min", "max", "step", "displayWith"], exportAs: ["matSlider"] }, { kind: "directive", type: i4$3.MatSliderThumb, selector: "input[matSliderThumb]", inputs: ["value"], outputs: ["valueChange", "dragStart", "dragEnd"], exportAs: ["matSliderThumb"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfRangeFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-range', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <mat-slider\n    discrete\n    showTickMarks\n    [step]=\"step\"\n    [min]=\"start\"\n    [max]=\"end\"\n    [attr.aria-label]=\"name\"\n    [attr.name]=\"name\"\n  ><input matSliderThumb [value]=\"ctrl.value\" [formControl]=\"ctrl\" /></mat-slider>\n  <div class=\"ajf-range-label\">\n    <label>{{ctrl.value}}</label>\n  </div>\n</ng-container>\n", styles: [".ajf-range-label{display:inline-block;padding:0 10px}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfSingleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
    }
}
AjfSingleChoiceFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfSingleChoiceFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: AJF_SEARCH_ALERT_THRESHOLD, optional: true }], target: i0.ɵɵFactoryTarget.Component });
AjfSingleChoiceFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfSingleChoiceFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"instance\">\n  <ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n    <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\">\n      <mat-option [value]=\"choice.value\"\n          *ngFor=\"let choice of instance!.filteredChoices\">\n        {{ choice.label | transloco }}\n      </mat-option>\n    </mat-select>\n  </ng-container>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [attr.aria-labelledby]=\"instance!.node.name\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\"\n        *ngFor=\"let choice of instance!.filteredChoices\">\n      {{ choice.label | transloco }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$4.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { kind: "component", type: i3$4.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }, { kind: "component", type: i5$1.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i3$2.TranslocoPipe, name: "transloco" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfExpandFieldWithChoicesPipe, name: "ajfExpandFieldWithChoices" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfSingleChoiceFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"instance\">\n  <ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n    <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\">\n      <mat-option [value]=\"choice.value\"\n          *ngFor=\"let choice of instance!.filteredChoices\">\n        {{ choice.label | transloco }}\n      </mat-option>\n    </mat-select>\n  </ng-container>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [attr.aria-labelledby]=\"instance!.node.name\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\"\n        *ngFor=\"let choice of instance!.filteredChoices\">\n      {{ choice.label | transloco }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [AJF_SEARCH_ALERT_THRESHOLD]
                    }] }];
    } });

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
class AjfTableFieldComponent extends AjfTableFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfTableFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTableFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfTableFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfTableFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row === 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr\">\n                  <ng-container\n                    *ngIf=\"contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                  >\n                    <ng-container *ngIf=\"contr.type === 'number';else genericInput\">\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        type=\"number\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-container>\n                    <ng-template #genericInput>\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        [type]=\"contr.type\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-template>\n                  </ng-container>\n\n                  <ng-template #plainTextCell>\n                    <span class=\"ajf-table-cell\" (click)=\"goToCell(row, column)\"\n                      >{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2'\n                      }}</span\n                    >\n                  </ng-template>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n", styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:2em;border-top:solid 1px #cccccc;border-left:solid 1px #cccccc}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;width:100%;box-sizing:border-box;outline:none;display:inline-block;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center;position:relative;min-height:22px;border:none}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"], dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i4$4.FormatIfNumber, name: "ajfFormatIfNumber" }, { kind: "pipe", type: i4$4.TranslateIfString, name: "ajfTranslateIfString" }, { kind: "pipe", type: i1.AjfGetTableCellControlPipe, name: "ajfGetTableCellControl" }, { kind: "pipe", type: i1.AjfIsCellEditablePipe, name: "ajfIsCellEditable" }, { kind: "pipe", type: i1.AjfTableRowClass, name: "ajfTableRowClass" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTableFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row === 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr\">\n                  <ng-container\n                    *ngIf=\"contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                  >\n                    <ng-container *ngIf=\"contr.type === 'number';else genericInput\">\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        type=\"number\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-container>\n                    <ng-template #genericInput>\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        [type]=\"contr.type\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-template>\n                  </ng-container>\n\n                  <ng-template #plainTextCell>\n                    <span class=\"ajf-table-cell\" (click)=\"goToCell(row, column)\"\n                      >{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2'\n                      }}</span\n                    >\n                  </ng-template>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n", styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:2em;border-top:solid 1px #cccccc;border-left:solid 1px #cccccc}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;width:100%;box-sizing:border-box;outline:none;display:inline-block;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center;position:relative;min-height:22px;border:none}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfTextFieldComponent extends AjfInputFieldComponent$1 {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfTextFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTextFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfTextFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfTextFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <textarea matInput cdkTextareaAutosize [formControl]=\"ctrl!\"></textarea>\n</mat-form-field>\n", styles: [""], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i5$2.CdkTextareaAutosize, selector: "textarea[cdkTextareaAutosize]", inputs: ["cdkAutosizeMinRows", "cdkAutosizeMaxRows", "cdkTextareaAutosize", "placeholder"], exportAs: ["cdkTextareaAutosize"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTextFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <textarea matInput cdkTextareaAutosize [formControl]=\"ctrl!\"></textarea>\n</mat-form-field>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfTimeFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTimeFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfTimeFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfTimeFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-time>\n", styles: [""], dependencies: [{ kind: "component", type: i2$6.AjfTime, selector: "ajf-time" }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTimeFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-time>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }];
    } });

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
class AjfVideoUrlFieldComponent extends AjfVideoUrlFieldComponent$1 {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was, domSanitizer, httpClient);
    }
}
AjfVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2$7.DomSanitizer }, { token: i3$5.HttpClient }], target: i0.ɵɵFactoryTarget.Component });
AjfVideoUrlFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfVideoUrlFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <mat-form-field class=\"ajf-video-input\">\n    <input matInput type=\"url\" [formControl]=\"ctrl!\">\n  </mat-form-field>\n  <div class=\"ajf-video-thumbnail\">\n    <ng-container *ngIf=\"validUrl|async\">\n      <a target=\"_blank\" [href]=\"ctrl.value\">\n        <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n      </a>\n    </ng-container>\n  </div>\n</ng-container>\n", styles: [".ajf-video-input{width:100%}.ajf-video-thumbnail{width:212px;height:120px;background-color:#eee;display:flex;align-items:center;justify-content:center}.ajf-video-thumbnail img{flex:1 1 auto}\n"], dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i4$2.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfVideoUrlFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <mat-form-field class=\"ajf-video-input\">\n    <input matInput type=\"url\" [formControl]=\"ctrl!\">\n  </mat-form-field>\n  <div class=\"ajf-video-thumbnail\">\n    <ng-container *ngIf=\"validUrl|async\">\n      <a target=\"_blank\" [href]=\"ctrl.value\">\n        <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n      </a>\n    </ng-container>\n  </div>\n</ng-container>\n", styles: [".ajf-video-input{width:100%}.ajf-video-thumbnail{width:212px;height:120px;background-color:#eee;display:flex;align-items:center;justify-content:center}.ajf-video-thumbnail img{flex:1 1 auto}\n"] }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: AjfWarningAlertService, decorators: [{
                        type: Inject,
                        args: [AJF_WARNING_ALERT_SERVICE]
                    }] }, { type: i2$7.DomSanitizer }, { type: i3$5.HttpClient }];
    } });

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
class AjfFieldService extends AjfFieldService$1 {
    constructor() {
        super();
        (this.componentsMap[AjfFieldType.String] = {
            component: AjfInputFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent,
        }),
            (this.componentsMap[AjfFieldType.Text] = {
                component: AjfTextFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Number] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
                inputs: { type: 'number' },
            }),
            (this.componentsMap[AjfFieldType.Boolean] = {
                component: AjfBooleanFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Formula] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
                inputs: { readonly: true },
            }),
            (this.componentsMap[AjfFieldType.Date] = {
                component: AjfDateFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.DateInput] = {
                component: AjfDateInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Table] = {
                component: AjfTableFieldComponent,
                readOnlyComponent: AjfReadOnlyTableFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent }),
            (this.componentsMap[AjfFieldType.SingleChoice] = {
                component: AjfSingleChoiceFieldComponent,
                readOnlyComponent: AjfReadOnlySelectFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.MultipleChoice] = {
                component: AjfMultipleChoiceFieldComponent,
                readOnlyComponent: AjfReadOnlySelectFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Time] = {
                component: AjfTimeFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            }),
            (this.componentsMap[AjfFieldType.Barcode] = {
                component: AjfBarcodeFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent,
            });
        this.componentsMap[AjfFieldType.Geolocation] = {
            component: AjfGeolocationFieldComponent,
            readOnlyComponent: AjfReadOnlyGeolocationFieldComponent,
        };
        this.componentsMap[AjfFieldType.File] = {
            component: AjfFileFieldComponent,
            readOnlyComponent: AjfReadOnlyFileFieldComponent,
        };
        this.componentsMap[AjfFieldType.Image] = {
            component: AjfImageFieldComponent,
            readOnlyComponent: AjfReadOnlyImageFieldComponent,
        };
        this.componentsMap[AjfFieldType.VideoUrl] = {
            component: AjfVideoUrlFieldComponent,
            readOnlyComponent: AjfReadOnlyVideoUrlFieldComponent,
        };
        this.componentsMap[AjfFieldType.Range] = {
            component: AjfRangeFieldComponent,
            readOnlyComponent: AjfReadOnlyFieldComponent,
        };
    }
}
AjfFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

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
class AjfFormField extends AjfFormField$1 {
    constructor(cdr, fieldService) {
        super(cdr);
        this.componentsMap = fieldService.componentsMap;
    }
    tabEvent(evt, instance) {
        if (evt.code != 'Tab')
            return;
        const isShiftKey = evt.shiftKey;
        const cardIdNext = 'field_entry_' + (isShiftKey ? instance.node.id - 1 : instance.node.id + 1);
        const targetElement = document.querySelector(`#${cardIdNext}`);
        if (targetElement == null || instance == null) {
            evt.preventDefault();
            evt.stopPropagation();
        }
    }
}
AjfFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormField, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFieldService }], target: i0.ɵɵFactoryTarget.Component });
AjfFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfFormField, selector: "ajf-field,ajf-form-field", usesInheritance: true, ngImport: i0, template: "<div\n    *ngIf=\"instance\"\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n    (keydown)=\"tabEvent($event, instance)\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | transloco}}</a>\n</ng-container>\n<div *ngIf=\"!readonly && instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error|transloco }}\n    </div>\n  </ng-container>\n</div>\n", styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-choices-container ajf-checkbox-group-item{width:100%}ajf-field .ajf-choices-container ajf-checkbox-group-item .mat-mdc-button{display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;inset:0;display:inline-block;border-top:solid 1px #cccccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #cccccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"], dependencies: [{ kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.AjfFieldHost, selector: "[ajf-field-host]" }, { kind: "pipe", type: i3$2.TranslocoPipe, name: "transloco" }, { kind: "pipe", type: i1.AjfFieldIsValidPipe, name: "ajfFieldIsValid" }, { kind: "pipe", type: i1.AjfNodeCompleteNamePipe, name: "ajfNodeCompleteName" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormField, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-field,ajf-form-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div\n    *ngIf=\"instance\"\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n    (keydown)=\"tabEvent($event, instance)\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | transloco}}</a>\n</ng-container>\n<div *ngIf=\"!readonly && instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error|transloco }}\n    </div>\n  </ng-container>\n</div>\n", styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-choices-container ajf-checkbox-group-item{width:100%}ajf-field .ajf-choices-container ajf-checkbox-group-item .mat-mdc-button{display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;inset:0;display:inline-block;border-top:solid 1px #cccccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #cccccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFieldService }]; } });

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
class AjfFormRenderer extends AjfFormRenderer$1 {
    constructor(rendererService, changeDetectorRef) {
        super(rendererService, changeDetectorRef);
        this.topBar = false;
        this.centeredFieldsContent = false;
        this.maxColumns = 1;
    }
}
AjfFormRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRenderer, deps: [{ token: i1.AjfFormRendererService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFormRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfFormRenderer, selector: "ajf-form", inputs: { topBar: "topBar", centeredFieldsContent: "centeredFieldsContent", maxColumns: "maxColumns" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"formGroup|async as fg\">\n  <form [class.ajf-form-readonly]=\"readonly\" novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n      <mat-toolbar *ngIf=\"!hideTopToolbar && topBar\" class=\"ajf-btn-strip\">\n        <mat-button-toggle-group>\n          <ng-container\n            *ngFor=\"let slideInstance of (slides|async); let idx = index; trackBy: trackNodeById\"\n          >\n            <mat-button-toggle\n              *ngIf=\"slideInstance.node.label && slideInstance.node.label.length > 0\"\n              class=\"ajf-topbar-button\"\n              (click)=\"scrollToSlide(slideInstance)\"\n              [checked]=\"isSlideToggleChecked(slideInstance, formSlider.currentPage)\"\n              [disabled]=\"slideInstance.visible === false\"\n            >\n              {{slideInstance.node.label | transloco}} {{ getRepeatingSlideRepIndex(slideInstance,\n              formSlider.currentPage)|async}}\n              <mat-icon *ngIf=\"!slideInstance.valid\" class=\"ajf-warning\">warning</mat-icon>\n              <mat-icon *ngIf=\"slideInstance.valid\" class=\"ajf-success\">check</mat-icon>\n            </mat-button-toggle>\n          </ng-container>\n        </mat-button-toggle-group>\n      </mat-toolbar>\n      <mat-toolbar *ngIf=\"!hideTopToolbar\">\n        {{ title }}\n        <span class=\"ajf-spacer\"></span>\n        <!-- this content projection allow to add buttons on toolbar -->\n        <ng-content select=\"[ajfFormTopToolbarButtons]\"></ng-content>\n        <!-- apply a default save button only when ajfFormSaveButton is empty -->\n        <span *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\">\n          <span #saveButton><ng-content select=\"[ajfFormSaveButton]\"></ng-content></span>\n          <button\n            *ngIf=\"saveButton && saveButton.childNodes && saveButton.childNodes.length === 0\"\n            mat-button\n            default\n          >\n            {{'Save'|transloco}}\n          </button>\n        </span>\n      </mat-toolbar>\n      <div class=\"ajf-slider-container\">\n        <ajf-page-slider\n          (orientationChange)=\"orientationChangeHandler($event)\"\n          [fixedOrientation]=\"fixedOrientation\"\n          [hideNavigationButtons]=\"hideNavigationButtons\"\n          [orientation]=\"orientation\"\n          #formSlider\n        >\n          <ng-container *ngIf=\"(slides|async) as curSlides\">\n            <ng-container *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card appearance=\"outlined\">\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span class=\"ajf-form-header-number\"> 1 &rarr; </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\">\n              <!-- non repeating slides -->\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\">\n                      <mat-card appearance=\"outlined\">\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\"\n                                >{{ slideInstance.position + (hasStartMessage | ajfBoolToInt) }}\n                                &rarr;</span\n                              >\n                              <span [innerHTML]=\"slideInstance.node.label | transloco\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\"\n                              >warning</mat-icon\n                            >\n                            <mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\"\n                              >check</mat-icon\n                            >\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <ng-template\n                            ngFor\n                            let-fieldInstance\n                            [ngForOf]=\"slideInstance.flatNodes\"\n                            [ngForTrackBy]=\"trackNodeById\"\n                          >\n                            <mat-card\n                              appearance=\"outlined\"\n                              [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size +\n                              ' ajf-max-columns-' + maxColumns +\n                              (centeredFieldsContent ? ' ajf-centered-field' : '')\"\n                              class=\"ajf-field-entry\"\n                              *ngIf=\"fieldInstance.visible\"\n                            >\n                              <i\n                                [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\"\n                                item-right\n                              ></i>\n                              <p>\n                                {{ ((fieldInstance|ajfAsFieldInstance).node.description || '') |\n                                transloco }}\n                              </p>\n\n                              <mat-card-header>\n                                <mat-card-title>\n                                  <label\n                                    [attr.id]=\"fieldInstance.node.name\"\n                                    *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\"\n                                    [innerHTML]=\"fieldInstance.node.label | transloco\"\n                                  ></label>\n                                </mat-card-title>\n                                <mat-icon\n                                  class=\"ajf-tooltip-icon\"\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance).node?.hint as hint\"\n                                  [matTooltip]=\"hint\"\n                                  matTooltipPosition=\"right\"\n                                >\n                                  {{(fieldInstance|ajfAsFieldInstance).node.hintIcon ||\n                                  'help'}}</mat-icon\n                                ></mat-card-header\n                              >\n                              <mat-card-content>\n                                <ajf-field\n                                  [instance]=\"fieldInstance|ajfAsFieldInstance\"\n                                  [readonly]=\"readonly || !slideInstance.editable\"\n                                  [id]=\"'field_entry_' + fieldInstance.node.id\"\n                                >\n                                </ajf-field>\n                              </mat-card-content>\n                              <mat-card-actions\n                                [ngClass]=\"(fieldInstance|ajfAsFieldInstance)?.valid ?\n                                'ajf-valid-field'\n                                : 'ajf-invalid-field'\"\n                              >\n                                <ng-container\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance)?.valid !== true; else ajfValidFieldTemplate\"\n                                >\n                                  <span class=\"ajf-field-error-message\"\n                                    >{{(fieldInstance|ajfAsFieldInstanceErrors)}}</span\n                                  >\n                                  <mat-icon class=\"ajf-warning\">warning</mat-icon>\n                                </ng-container>\n                                <ng-template #ajfValidFieldTemplate>\n                                  <mat-icon class=\"ajf-success\">check</mat-icon>\n                                </ng-template>\n                              </mat-card-actions>\n                            </mat-card>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n                <!-- repeating slides -->\n                <ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item\n                    *ngFor=\"let curRep of ((slideInstance|ajfAsRepeatingSlideInstance).reps|ajfRange); let idx = index; let lastSlide = last\"\n                  >\n                    <div class=\"ajf-form-page\">\n                      <mat-card appearance=\"outlined\">\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\"\n                                >{{ slideInstance.position|ajfIncrement:idx + (hasStartMessage |\n                                ajfBoolToInt) }} &rarr;</span\n                              >\n                              <span [innerHTML]=\"slideInstance.node.label | transloco\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\"\n                              >warning</mat-icon\n                            >\n                            <mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\"\n                              >check</mat-icon\n                            >\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <div *ngIf=\"lastSlide && !readonly\" class=\"ajf-group-actions\">\n                            <button\n                              (click)=\"addGroup(slideInstance)\"\n                              [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canAdd || ((slideInstance|ajfAsRepeatingSlideInstance).node.disableRemoval && !slideInstance.valid)\"\n                              mat-mini-fab\n                            >\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button\n                              (click)=\"removeGroup(slideInstance)\"\n                              [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canRemove || (slideInstance|ajfAsRepeatingSlideInstance).node.disableRemoval\"\n                              mat-mini-fab\n                            >\n                              <mat-icon>remove</mat-icon>\n                            </button>\n                          </div>\n                          <ng-template\n                            ngFor\n                            let-fieldInstance\n                            [ngForOf]=\"slideInstance.slideNodes[idx]\"\n                            [ngForTrackBy]=\"trackNodeById\"\n                          >\n                            <mat-card\n                              appearance=\"outlined\"\n                              [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size +\n                              ' ajf-max-columns-' + maxColumns +\n                              (centeredFieldsContent ? ' ajf-centered-field' : '')\"\n                              class=\"ajf-field-entry\"\n                              *ngIf=\"fieldInstance.visible\"\n                            >\n                              <i\n                                [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\"\n                                item-right\n                              ></i>\n                              <p>\n                                {{ ((fieldInstance|ajfAsFieldInstance).node.description || '') |\n                                transloco }}\n                              </p>\n\n                              <mat-card-header>\n                                <mat-card-title>\n                                  <label\n                                    [attr.id]=\"fieldInstance.node.name\"\n                                    *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\"\n                                    [innerHTML]=\"fieldInstance.node.label | transloco\"\n                                  ></label>\n                                </mat-card-title>\n                                <mat-icon\n                                  class=\"ajf-tooltip-icon\"\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance).node?.hint as hint\"\n                                  [matTooltip]=\"hint\"\n                                  matTooltipPosition=\"right\"\n                                >\n                                  {{(fieldInstance|ajfAsFieldInstance).node.hintIcon ||\n                                  'help'}}</mat-icon\n                                ></mat-card-header\n                              >\n                              <mat-card-content>\n                                <ajf-field\n                                  [instance]=\"fieldInstance|ajfAsFieldInstance\"\n                                  [readonly]=\"readonly || !slideInstance.editable\"\n                                  [id]=\"'field_entry_' + fieldInstance.node.id\"\n                                >\n                                </ajf-field>\n                              </mat-card-content>\n                              <mat-card-actions\n                                [ngClass]=\"(fieldInstance|ajfAsFieldInstance)?.valid ?\n                                'ajf-valid-field'\n                                : 'ajf-invalid-field'\"\n                              >\n                                <ng-container\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance)?.valid !== true; else ajfValidFieldTemplate\"\n                                >\n                                  <span class=\"ajf-field-error-message\"\n                                    >{{(fieldInstance|ajfAsFieldInstanceErrors)}}</span\n                                  >\n                                  <mat-icon class=\"ajf-warning\">warning</mat-icon>\n                                </ng-container>\n                                <ng-template #ajfValidFieldTemplate>\n                                  <mat-icon class=\"ajf-success\">check</mat-icon>\n                                </ng-template>\n                              </mat-card-actions>\n                            </mat-card>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card appearance=\"outlined\">\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">\n                            {{ snum! + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n          </ng-container>\n          <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\">\n            <div class=\"ajf-left-bar\">\n              <div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\">\n                <button mat-button (click)=\"goToPrevError()\" danger>\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button mat-button (click)=\"goToNextError()\" danger>\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n              </div>\n              <div class=\"ajf-info-box ajf-error\">\n                <div class=\"ajf-title\">{{'Errors'|transloco}}</div>\n                <div class=\"ajf-content\">{{ errors | async }} / {{ slidesNum|async }}</div>\n              </div>\n            </div>\n          </div>\n        </ajf-page-slider>\n      </div>\n    </div>\n  </form>\n</ng-container>\n", styles: ["ajf-form{display:block}ajf-form .ajf-form-readonly .ajf-field-entry>label{font-weight:700}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;inset:0}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-btn-strip .mat-button-toggle-group{overflow-x:auto}ajf-form .ajf-form-container .ajf-topbar-button{font-size:.8em}ajf-form .ajf-form-container mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{padding-right:10px;min-width:350px;display:flex;flex-direction:column;margin:5px;border-left:3px solid;border-radius:5px;min-height:30vh;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-icon{vertical-align:bottom;margin-left:5px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-max-columns-1{flex:1 0 100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-max-columns-2{flex:1 0 45%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-max-columns-3{flex:1 0 30%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions{position:absolute;bottom:0;width:100%;display:flex;justify-content:flex-start;align-items:center;align-content:center;border-bottom-left-radius:5px;border-bottom-right-radius:5px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions.ajf-valid-field{background-color:#32db6433}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions.ajf-invalid-field{background-color:#f53d3d33}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions.ajf-invalid-field .ajf-field-error-message{margin-left:8px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions .mat-icon{margin-left:auto}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-radio-button,ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry ajf-checkbox-group-item .mat-mdc-button{background-color:inherit!important}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-header{margin-bottom:15px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-header .ajf-tooltip-icon{align-self:center}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content{position:relative;flex:1;flex-flow:row wrap;justify-content:flex-start;align-items:flex-start;padding-top:2%;padding-bottom:10%;overflow-y:auto;max-width:95%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .mat-mdc-select{margin:20px 0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .mat-mdc-radio-group{display:flex;flex-flow:column wrap;justify-content:space-between}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .mat-mdc-radio-group .mat-mdc-radio-button{flex:1 1 30%;padding:5px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .ajf-errors .error{display:none}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-centered-field .mat-mdc-card-content,ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-centered-field .mat-mdc-card-header{justify-content:center;text-align:center}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-centered-field .ajf-choices-container .mat-mdc-radio-button{text-align:start}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .ajf-field-range{margin-top:30px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:700}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}\n"], dependencies: [{ kind: "component", type: i2$8.AjfPageSliderItem, selector: "ajf-page-slider-item", outputs: ["scroll"] }, { kind: "component", type: i3$6.AjfPageSlider, selector: "ajf-page-slider" }, { kind: "directive", type: i2$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i5.MatButton, selector: "    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "component", type: i5.MatMiniFabButton, selector: "button[mat-mini-fab]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i6$1.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { kind: "component", type: i6$1.MatButtonToggle, selector: "mat-button-toggle", inputs: ["disableRipple", "aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "appearance", "checked", "disabled"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "component", type: i7.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }, { kind: "directive", type: i7.MatCardActions, selector: "mat-card-actions", inputs: ["align"], exportAs: ["matCardActions"] }, { kind: "directive", type: i7.MatCardContent, selector: "mat-card-content" }, { kind: "component", type: i7.MatCardHeader, selector: "mat-card-header" }, { kind: "directive", type: i7.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { kind: "component", type: i8.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i9.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { kind: "directive", type: i10.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i4.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i4.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i4.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: AjfFormField, selector: "ajf-field,ajf-form-field" }, { kind: "pipe", type: i3$2.TranslocoPipe, name: "transloco" }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.AjfAsFieldInstancePipe, name: "ajfAsFieldInstance" }, { kind: "pipe", type: i1.AjfAsFieldInstanceErrorsPipe, name: "ajfAsFieldInstanceErrors" }, { kind: "pipe", type: i1.AjfAsRepeatingSlideInstancePipe, name: "ajfAsRepeatingSlideInstance" }, { kind: "pipe", type: i1.AjfBoolToIntPipe, name: "ajfBoolToInt" }, { kind: "pipe", type: i1.AjfFieldIconPipe, name: "ajfFieldIcon" }, { kind: "pipe", type: i1.AjfIncrementPipe, name: "ajfIncrement" }, { kind: "pipe", type: i1.AjfIsRepeatingSlideInstancePipe, name: "ajfIsRepeatingSlideInstance" }, { kind: "pipe", type: i1.AjfRangePipe, name: "ajfRange" }, { kind: "pipe", type: i1.AjfValidSlidePipe, name: "ajfValidSlide" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-form', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"formGroup|async as fg\">\n  <form [class.ajf-form-readonly]=\"readonly\" novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n      <mat-toolbar *ngIf=\"!hideTopToolbar && topBar\" class=\"ajf-btn-strip\">\n        <mat-button-toggle-group>\n          <ng-container\n            *ngFor=\"let slideInstance of (slides|async); let idx = index; trackBy: trackNodeById\"\n          >\n            <mat-button-toggle\n              *ngIf=\"slideInstance.node.label && slideInstance.node.label.length > 0\"\n              class=\"ajf-topbar-button\"\n              (click)=\"scrollToSlide(slideInstance)\"\n              [checked]=\"isSlideToggleChecked(slideInstance, formSlider.currentPage)\"\n              [disabled]=\"slideInstance.visible === false\"\n            >\n              {{slideInstance.node.label | transloco}} {{ getRepeatingSlideRepIndex(slideInstance,\n              formSlider.currentPage)|async}}\n              <mat-icon *ngIf=\"!slideInstance.valid\" class=\"ajf-warning\">warning</mat-icon>\n              <mat-icon *ngIf=\"slideInstance.valid\" class=\"ajf-success\">check</mat-icon>\n            </mat-button-toggle>\n          </ng-container>\n        </mat-button-toggle-group>\n      </mat-toolbar>\n      <mat-toolbar *ngIf=\"!hideTopToolbar\">\n        {{ title }}\n        <span class=\"ajf-spacer\"></span>\n        <!-- this content projection allow to add buttons on toolbar -->\n        <ng-content select=\"[ajfFormTopToolbarButtons]\"></ng-content>\n        <!-- apply a default save button only when ajfFormSaveButton is empty -->\n        <span *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\">\n          <span #saveButton><ng-content select=\"[ajfFormSaveButton]\"></ng-content></span>\n          <button\n            *ngIf=\"saveButton && saveButton.childNodes && saveButton.childNodes.length === 0\"\n            mat-button\n            default\n          >\n            {{'Save'|transloco}}\n          </button>\n        </span>\n      </mat-toolbar>\n      <div class=\"ajf-slider-container\">\n        <ajf-page-slider\n          (orientationChange)=\"orientationChangeHandler($event)\"\n          [fixedOrientation]=\"fixedOrientation\"\n          [hideNavigationButtons]=\"hideNavigationButtons\"\n          [orientation]=\"orientation\"\n          #formSlider\n        >\n          <ng-container *ngIf=\"(slides|async) as curSlides\">\n            <ng-container *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card appearance=\"outlined\">\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span class=\"ajf-form-header-number\"> 1 &rarr; </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\">\n              <!-- non repeating slides -->\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\">\n                      <mat-card appearance=\"outlined\">\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\"\n                                >{{ slideInstance.position + (hasStartMessage | ajfBoolToInt) }}\n                                &rarr;</span\n                              >\n                              <span [innerHTML]=\"slideInstance.node.label | transloco\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\"\n                              >warning</mat-icon\n                            >\n                            <mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\"\n                              >check</mat-icon\n                            >\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <ng-template\n                            ngFor\n                            let-fieldInstance\n                            [ngForOf]=\"slideInstance.flatNodes\"\n                            [ngForTrackBy]=\"trackNodeById\"\n                          >\n                            <mat-card\n                              appearance=\"outlined\"\n                              [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size +\n                              ' ajf-max-columns-' + maxColumns +\n                              (centeredFieldsContent ? ' ajf-centered-field' : '')\"\n                              class=\"ajf-field-entry\"\n                              *ngIf=\"fieldInstance.visible\"\n                            >\n                              <i\n                                [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\"\n                                item-right\n                              ></i>\n                              <p>\n                                {{ ((fieldInstance|ajfAsFieldInstance).node.description || '') |\n                                transloco }}\n                              </p>\n\n                              <mat-card-header>\n                                <mat-card-title>\n                                  <label\n                                    [attr.id]=\"fieldInstance.node.name\"\n                                    *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\"\n                                    [innerHTML]=\"fieldInstance.node.label | transloco\"\n                                  ></label>\n                                </mat-card-title>\n                                <mat-icon\n                                  class=\"ajf-tooltip-icon\"\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance).node?.hint as hint\"\n                                  [matTooltip]=\"hint\"\n                                  matTooltipPosition=\"right\"\n                                >\n                                  {{(fieldInstance|ajfAsFieldInstance).node.hintIcon ||\n                                  'help'}}</mat-icon\n                                ></mat-card-header\n                              >\n                              <mat-card-content>\n                                <ajf-field\n                                  [instance]=\"fieldInstance|ajfAsFieldInstance\"\n                                  [readonly]=\"readonly || !slideInstance.editable\"\n                                  [id]=\"'field_entry_' + fieldInstance.node.id\"\n                                >\n                                </ajf-field>\n                              </mat-card-content>\n                              <mat-card-actions\n                                [ngClass]=\"(fieldInstance|ajfAsFieldInstance)?.valid ?\n                                'ajf-valid-field'\n                                : 'ajf-invalid-field'\"\n                              >\n                                <ng-container\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance)?.valid !== true; else ajfValidFieldTemplate\"\n                                >\n                                  <span class=\"ajf-field-error-message\"\n                                    >{{(fieldInstance|ajfAsFieldInstanceErrors)}}</span\n                                  >\n                                  <mat-icon class=\"ajf-warning\">warning</mat-icon>\n                                </ng-container>\n                                <ng-template #ajfValidFieldTemplate>\n                                  <mat-icon class=\"ajf-success\">check</mat-icon>\n                                </ng-template>\n                              </mat-card-actions>\n                            </mat-card>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n                <!-- repeating slides -->\n                <ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item\n                    *ngFor=\"let curRep of ((slideInstance|ajfAsRepeatingSlideInstance).reps|ajfRange); let idx = index; let lastSlide = last\"\n                  >\n                    <div class=\"ajf-form-page\">\n                      <mat-card appearance=\"outlined\">\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\"\n                                >{{ slideInstance.position|ajfIncrement:idx + (hasStartMessage |\n                                ajfBoolToInt) }} &rarr;</span\n                              >\n                              <span [innerHTML]=\"slideInstance.node.label | transloco\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\"\n                              >warning</mat-icon\n                            >\n                            <mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\"\n                              >check</mat-icon\n                            >\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <div *ngIf=\"lastSlide && !readonly\" class=\"ajf-group-actions\">\n                            <button\n                              (click)=\"addGroup(slideInstance)\"\n                              [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canAdd || ((slideInstance|ajfAsRepeatingSlideInstance).node.disableRemoval && !slideInstance.valid)\"\n                              mat-mini-fab\n                            >\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button\n                              (click)=\"removeGroup(slideInstance)\"\n                              [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canRemove || (slideInstance|ajfAsRepeatingSlideInstance).node.disableRemoval\"\n                              mat-mini-fab\n                            >\n                              <mat-icon>remove</mat-icon>\n                            </button>\n                          </div>\n                          <ng-template\n                            ngFor\n                            let-fieldInstance\n                            [ngForOf]=\"slideInstance.slideNodes[idx]\"\n                            [ngForTrackBy]=\"trackNodeById\"\n                          >\n                            <mat-card\n                              appearance=\"outlined\"\n                              [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size +\n                              ' ajf-max-columns-' + maxColumns +\n                              (centeredFieldsContent ? ' ajf-centered-field' : '')\"\n                              class=\"ajf-field-entry\"\n                              *ngIf=\"fieldInstance.visible\"\n                            >\n                              <i\n                                [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\"\n                                item-right\n                              ></i>\n                              <p>\n                                {{ ((fieldInstance|ajfAsFieldInstance).node.description || '') |\n                                transloco }}\n                              </p>\n\n                              <mat-card-header>\n                                <mat-card-title>\n                                  <label\n                                    [attr.id]=\"fieldInstance.node.name\"\n                                    *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\"\n                                    [innerHTML]=\"fieldInstance.node.label | transloco\"\n                                  ></label>\n                                </mat-card-title>\n                                <mat-icon\n                                  class=\"ajf-tooltip-icon\"\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance).node?.hint as hint\"\n                                  [matTooltip]=\"hint\"\n                                  matTooltipPosition=\"right\"\n                                >\n                                  {{(fieldInstance|ajfAsFieldInstance).node.hintIcon ||\n                                  'help'}}</mat-icon\n                                ></mat-card-header\n                              >\n                              <mat-card-content>\n                                <ajf-field\n                                  [instance]=\"fieldInstance|ajfAsFieldInstance\"\n                                  [readonly]=\"readonly || !slideInstance.editable\"\n                                  [id]=\"'field_entry_' + fieldInstance.node.id\"\n                                >\n                                </ajf-field>\n                              </mat-card-content>\n                              <mat-card-actions\n                                [ngClass]=\"(fieldInstance|ajfAsFieldInstance)?.valid ?\n                                'ajf-valid-field'\n                                : 'ajf-invalid-field'\"\n                              >\n                                <ng-container\n                                  *ngIf=\"(fieldInstance|ajfAsFieldInstance)?.valid !== true; else ajfValidFieldTemplate\"\n                                >\n                                  <span class=\"ajf-field-error-message\"\n                                    >{{(fieldInstance|ajfAsFieldInstanceErrors)}}</span\n                                  >\n                                  <mat-icon class=\"ajf-warning\">warning</mat-icon>\n                                </ng-container>\n                                <ng-template #ajfValidFieldTemplate>\n                                  <mat-icon class=\"ajf-success\">check</mat-icon>\n                                </ng-template>\n                              </mat-card-actions>\n                            </mat-card>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card appearance=\"outlined\">\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">\n                            {{ snum! + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n          </ng-container>\n          <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\">\n            <div class=\"ajf-left-bar\">\n              <div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\">\n                <button mat-button (click)=\"goToPrevError()\" danger>\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button mat-button (click)=\"goToNextError()\" danger>\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n              </div>\n              <div class=\"ajf-info-box ajf-error\">\n                <div class=\"ajf-title\">{{'Errors'|transloco}}</div>\n                <div class=\"ajf-content\">{{ errors | async }} / {{ slidesNum|async }}</div>\n              </div>\n            </div>\n          </div>\n        </ajf-page-slider>\n      </div>\n    </div>\n  </form>\n</ng-container>\n", styles: ["ajf-form{display:block}ajf-form .ajf-form-readonly .ajf-field-entry>label{font-weight:700}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;inset:0}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-btn-strip .mat-button-toggle-group{overflow-x:auto}ajf-form .ajf-form-container .ajf-topbar-button{font-size:.8em}ajf-form .ajf-form-container mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{padding-right:10px;min-width:350px;display:flex;flex-direction:column;margin:5px;border-left:3px solid;border-radius:5px;min-height:30vh;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-icon{vertical-align:bottom;margin-left:5px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-max-columns-1{flex:1 0 100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-max-columns-2{flex:1 0 45%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-max-columns-3{flex:1 0 30%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions{position:absolute;bottom:0;width:100%;display:flex;justify-content:flex-start;align-items:center;align-content:center;border-bottom-left-radius:5px;border-bottom-right-radius:5px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions.ajf-valid-field{background-color:#32db6433}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions.ajf-invalid-field{background-color:#f53d3d33}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions.ajf-invalid-field .ajf-field-error-message{margin-left:8px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-actions .mat-icon{margin-left:auto}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-radio-button,ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry ajf-checkbox-group-item .mat-mdc-button{background-color:inherit!important}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-header{margin-bottom:15px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-header .ajf-tooltip-icon{align-self:center}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content{position:relative;flex:1;flex-flow:row wrap;justify-content:flex-start;align-items:flex-start;padding-top:2%;padding-bottom:10%;overflow-y:auto;max-width:95%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .mat-mdc-select{margin:20px 0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .mat-mdc-radio-group{display:flex;flex-flow:column wrap;justify-content:space-between}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .mat-mdc-radio-group .mat-mdc-radio-button{flex:1 1 30%;padding:5px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .mat-mdc-card-content .ajf-errors .error{display:none}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-centered-field .mat-mdc-card-content,ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-centered-field .mat-mdc-card-header{justify-content:center;text-align:center}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-centered-field .ajf-choices-container .mat-mdc-radio-button{text-align:start}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry .ajf-field-range{margin-top:30px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:700}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfFormRendererService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { topBar: [{
                type: Input
            }], centeredFieldsContent: [{
                type: Input
            }], maxColumns: [{
                type: Input
            }] } });

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
class AjfFormsModule {
    static forRoot() {
        return {
            ngModule: AjfFormsModule,
            providers: [AjfFieldService],
        };
    }
}
AjfFormsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfFormsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, declarations: [AjfBarcodeFieldComponent,
        AjfBooleanFieldComponent,
        AjfDateFieldComponent,
        AjfDateInputFieldComponent,
        AjfEmptyFieldComponent,
        AjfFieldWarningDialog,
        AjfFormField,
        AjfFormRenderer,
        AjfGeolocationFieldComponent,
        AjfInputFieldComponent,
        AjfMultipleChoiceFieldComponent,
        AjfRangeFieldComponent,
        AjfSingleChoiceFieldComponent,
        AjfTableFieldComponent,
        AjfTextFieldComponent,
        AjfTimeFieldComponent,
        AjfVideoUrlFieldComponent], imports: [AjfBarcodeModule,
        AjfCalendarModule,
        AjfCommonModule,
        AjfCheckboxGroupModule,
        AjfGeolocationModule,
        AjfPageSliderModule,
        AjfTimeModule,
        AjfTranslocoModule,
        CommonModule,
        AjfFormsModule$1,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        TextFieldModule,
        MatSliderModule], exports: [AjfFormField, AjfFormRenderer] });
AjfFormsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, providers: [
        AjfFieldService,
        { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
    ], imports: [AjfBarcodeModule,
        AjfCalendarModule,
        AjfCommonModule,
        AjfCheckboxGroupModule,
        AjfGeolocationModule,
        AjfPageSliderModule,
        AjfTimeModule,
        AjfTranslocoModule,
        CommonModule,
        AjfFormsModule$1,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        TextFieldModule,
        MatSliderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfBarcodeModule,
                        AjfCalendarModule,
                        AjfCommonModule,
                        AjfCheckboxGroupModule,
                        AjfGeolocationModule,
                        AjfPageSliderModule,
                        AjfTimeModule,
                        AjfTranslocoModule,
                        CommonModule,
                        AjfFormsModule$1,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatFormFieldModule,
                        MatIconModule,
                        MatInputModule,
                        MatNativeDateModule,
                        MatRadioModule,
                        MatSelectModule,
                        MatSlideToggleModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        ReactiveFormsModule,
                        TextFieldModule,
                        MatSliderModule,
                    ],
                    declarations: [
                        AjfBarcodeFieldComponent,
                        AjfBooleanFieldComponent,
                        AjfDateFieldComponent,
                        AjfDateInputFieldComponent,
                        AjfEmptyFieldComponent,
                        AjfFieldWarningDialog,
                        AjfFormField,
                        AjfFormRenderer,
                        AjfGeolocationFieldComponent,
                        AjfInputFieldComponent,
                        AjfMultipleChoiceFieldComponent,
                        AjfRangeFieldComponent,
                        AjfSingleChoiceFieldComponent,
                        AjfTableFieldComponent,
                        AjfTextFieldComponent,
                        AjfTimeFieldComponent,
                        AjfVideoUrlFieldComponent,
                    ],
                    exports: [AjfFormField, AjfFormRenderer],
                    providers: [
                        AjfFieldService,
                        { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
                    ],
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

export { AjfBooleanFieldComponent, AjfDateFieldComponent, AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfFieldService, AjfFieldWarningDialog, AjfFormField, AjfFormRenderer, AjfFormsModule, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent, AjfSingleChoiceFieldComponent, AjfTableFieldComponent, AjfTimeFieldComponent, AjfWarningAlertService };
//# sourceMappingURL=ajf-material-forms.mjs.map
