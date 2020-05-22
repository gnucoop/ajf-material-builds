import { __decorate, __metadata, __param } from 'tslib';
import { AjfBaseFieldComponent, AJF_WARNING_ALERT_SERVICE, AjfFormRendererService, AjfDateValueStringPipe, AjfInputFieldComponent as AjfInputFieldComponent$1, AjfFieldWithChoicesComponent, AJF_SEARCH_ALERT_THRESHOLD, AjfTableFieldComponent as AjfTableFieldComponent$1, AjfFieldService as AjfFieldService$1, AjfFieldType, AjfReadOnlyFieldComponent, AjfReadOnlyTableFieldComponent, AjfFormField as AjfFormField$1, AjfFormRenderer as AjfFormRenderer$1, AjfFormsModule as AjfFormsModule$1 } from '@ajf/core/forms';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injectable, Inject, ChangeDetectorRef, ViewChild, Optional, ɵɵdefineInjectable, ComponentFactoryResolver, Input, NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MatInput, MatInputModule } from '@angular/material/input';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import { AjfTimeModule } from '@ajf/material/time';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

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
let AjfFieldWarningDialog = /** @class */ (() => {
    let AjfFieldWarningDialog = class AjfFieldWarningDialog {
    };
    AjfFieldWarningDialog = __decorate([
        Component({
            template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None
        })
    ], AjfFieldWarningDialog);
    return AjfFieldWarningDialog;
})();

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
let AjfWarningAlertService = /** @class */ (() => {
    let AjfWarningAlertService = class AjfWarningAlertService {
        constructor(_dialog) {
            this._dialog = _dialog;
        }
        showWarningAlertPrompt(warnings) {
            const dialog = this._dialog.open(AjfFieldWarningDialog);
            dialog.componentInstance.message = warnings.join('<br>');
            return dialog.afterClosed().pipe(map((result) => ({ result })));
        }
    };
    AjfWarningAlertService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MatDialog])
    ], AjfWarningAlertService);
    return AjfWarningAlertService;
})();

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
let AjfBooleanFieldComponent = /** @class */ (() => {
    let AjfBooleanFieldComponent = class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfBooleanFieldComponent = __decorate([
        Component({
            template: "<mat-slide-toggle *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></mat-slide-toggle>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfBooleanFieldComponent);
    return AjfBooleanFieldComponent;
})();

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
let AjfDateFieldComponent = /** @class */ (() => {
    let AjfDateFieldComponent = class AjfDateFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfDateFieldComponent = __decorate([
        Component({
            template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfDateFieldComponent);
    return AjfDateFieldComponent;
})();

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
let AjfDateInputFieldComponent = /** @class */ (() => {
    let AjfDateInputFieldComponent = class AjfDateInputFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was, _dvs) {
            super(cdr, service, was);
            this._dvs = _dvs;
        }
        onChange() {
            if (this.input == null) {
                return;
            }
            const val = this.input.value || '';
            if (val.length > 0) {
                if ((this._minDateStr != null && val < this._minDateStr) ||
                    (this._maxDateStr != null && val > this._maxDateStr)) {
                    this.input.value = '';
                }
            }
        }
        _onInstanceChange() {
            this._minDateStr = this._dvs.transform(this.instance.node.minDate);
            this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
        }
    };
    __decorate([
        ViewChild(MatInput, { static: false }),
        __metadata("design:type", MatInput)
    ], AjfDateInputFieldComponent.prototype, "input", void 0);
    AjfDateInputFieldComponent = __decorate([
        Component({
            template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput type=\"date\"\n      [attr.aria-label]=\"instance.node.label || (instance|ajfNodeCompleteName)\"\n      [min]=\"instance.node.minDate|ajfDateValueString\"\n      [max]=\"instance.node.maxDate|ajfDateValueString\"\n      (change)=\"onChange()\"\n      [formControl]=\"ctrl!\">\n</mat-form-field>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService,
            AjfDateValueStringPipe])
    ], AjfDateInputFieldComponent);
    return AjfDateInputFieldComponent;
})();

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
let AjfEmptyFieldComponent = /** @class */ (() => {
    let AjfEmptyFieldComponent = class AjfEmptyFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfEmptyFieldComponent = __decorate([
        Component({
            template: "<h1 [innerHTML]=\"instance.node.label | translate\"></h1>\n<div [innerHTML]=\"instance.node.HTML | translate\"></div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfEmptyFieldComponent);
    return AjfEmptyFieldComponent;
})();

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
let AjfBarcodeFieldComponent = /** @class */ (() => {
    let AjfBarcodeFieldComponent = class AjfBarcodeFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfBarcodeFieldComponent = __decorate([
        Component({
            template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-barcode>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfBarcodeFieldComponent);
    return AjfBarcodeFieldComponent;
})();

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
let AjfInputFieldComponent = /** @class */ (() => {
    let AjfInputFieldComponent = class AjfInputFieldComponent extends AjfInputFieldComponent$1 {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfInputFieldComponent = __decorate([
        Component({
            template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput *ngIf=\"type === 'text'\" type=\"text\" [formControl]=\"ctrl!\">\n  <input matInput *ngIf=\"type === 'number'\" type=\"number\" [formControl]=\"ctrl!\">\n</mat-form-field>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfInputFieldComponent);
    return AjfInputFieldComponent;
})();

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
let AjfMultipleChoiceFieldComponent = /** @class */ (() => {
    let AjfMultipleChoiceFieldComponent = class AjfMultipleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
        constructor(cdr, service, was, searchThreshold) {
            super(cdr, service, was, searchThreshold);
        }
    };
    AjfMultipleChoiceFieldComponent = __decorate([
        Component({
            template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\"\n        [value]=\"choice.value\">\n      {{ choice.label | translate }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __param(3, Optional()), __param(3, Inject(AJF_SEARCH_ALERT_THRESHOLD)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService, Number])
    ], AjfMultipleChoiceFieldComponent);
    return AjfMultipleChoiceFieldComponent;
})();

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
let AjfSingleChoiceFieldComponent = /** @class */ (() => {
    let AjfSingleChoiceFieldComponent = class AjfSingleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
        constructor(cdr, service, was, searchThreshold) {
            super(cdr, service, was, searchThreshold);
        }
    };
    AjfSingleChoiceFieldComponent = __decorate([
        Component({
            template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __param(3, Optional()), __param(3, Inject(AJF_SEARCH_ALERT_THRESHOLD)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService, Number])
    ], AjfSingleChoiceFieldComponent);
    return AjfSingleChoiceFieldComponent;
})();

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
let AjfTableFieldComponent = /** @class */ (() => {
    let AjfTableFieldComponent = class AjfTableFieldComponent extends AjfTableFieldComponent$1 {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfTableFieldComponent = __decorate([
        Component({
            template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n              <ng-container *ngIf=\"contr != null\">\n                <input *ngIf=\"row > 0 && contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                  (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr.control\"\n                  (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus>\n                <ng-template #plainTextCell>\n                  <span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\"\n                    (click)=\"goToCell(row, column)\">{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                  <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n                </ng-template>\n              </ng-container>\n            </ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfTableFieldComponent);
    return AjfTableFieldComponent;
})();

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
let AjfTimeFieldComponent = /** @class */ (() => {
    let AjfTimeFieldComponent = class AjfTimeFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfTimeFieldComponent = __decorate([
        Component({
            template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-time>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService,
            AjfWarningAlertService])
    ], AjfTimeFieldComponent);
    return AjfTimeFieldComponent;
})();

let AjfFieldService = /** @class */ (() => {
    let AjfFieldService = class AjfFieldService extends AjfFieldService$1 {
        constructor() {
            super();
            this.componentsMap[AjfFieldType.String] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: AjfReadOnlyFieldComponent
            },
                this.componentsMap[AjfFieldType.Text] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Number] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent,
                    inputs: { type: 'number' }
                },
                this.componentsMap[AjfFieldType.Boolean] = {
                    component: AjfBooleanFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Formula] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent,
                    inputs: { readonly: true }
                },
                this.componentsMap[AjfFieldType.Date] = {
                    component: AjfDateFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.DateInput] = {
                    component: AjfDateInputFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Table] = {
                    component: AjfTableFieldComponent,
                    readOnlyComponent: AjfReadOnlyTableFieldComponent
                },
                this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
                this.componentsMap[AjfFieldType.SingleChoice] = {
                    component: AjfSingleChoiceFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.MultipleChoice] = {
                    component: AjfMultipleChoiceFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Time] = {
                    component: AjfTimeFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                },
                this.componentsMap[AjfFieldType.Barcode] = {
                    component: AjfBarcodeFieldComponent,
                    readOnlyComponent: AjfReadOnlyFieldComponent
                };
        }
    };
    AjfFieldService.ɵprov = ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
    AjfFieldService = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [])
    ], AjfFieldService);
    return AjfFieldService;
})();

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
let AjfFormField = /** @class */ (() => {
    let AjfFormField = class AjfFormField extends AjfFormField$1 {
        constructor(cdr, cfr, fieldService) {
            super(cdr, cfr);
            this.componentsMap = fieldService.componentsMap;
        }
    };
    AjfFormField = __decorate([
        Component({
            selector: 'ajf-field,ajf-form-field',
            template: "<div\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a>\n</ng-container>\n<div *ngIf=\"!readonly && instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error }} \n    </div>\n  </ng-container>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef, ComponentFactoryResolver, AjfFieldService])
    ], AjfFormField);
    return AjfFormField;
})();

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
let AjfFormRenderer = /** @class */ (() => {
    let AjfFormRenderer = class AjfFormRenderer extends AjfFormRenderer$1 {
        constructor(rendererService, changeDetectorRef) {
            super(rendererService, changeDetectorRef);
            this.topBar = false;
        }
        scrollToSlide(slide) {
            this.formSlider.slide({ to: slide.position - 1 });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AjfFormRenderer.prototype, "topBar", void 0);
    AjfFormRenderer = __decorate([
        Component({
            selector: 'ajf-form',
            template: "<ng-container *ngIf=\"formGroup|async as fg\">\n  <form novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\">\n        <ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\">\n          <button mat-button class=\"ajf-topbar-button\"\n          *ngIf=\"topBar != null && slideInstance.node != null && slideInstance.node.label != null && slideInstance.node.label.length > 0\"\n              (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.node.label | translate}}</button>\n        </ng-template>\n      </mat-toolbar>\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\">\n        {{ title }}\n        <span class=\"ajf-spacer\"></span>\n        <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\"\n            translate>Save</button>\n      </mat-toolbar>\n      <div class=\"ajf-slider-container\">\n        <ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\"\n            [fixedOrientation]=\"fixedOrientation\"\n            [hideNavigationButtons]=\"hideNavigationButtons\"\n            [orientation]=\"orientation\"\n            #formSlider>\n          <ng-container *ngIf=\"(slides|async) as curSlides\">\n            <ng-container *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span class=\"ajf-form-header-number\">\n                            1 &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\">\n              <!-- non repeating slides -->\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\" [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n                <!-- repeating slides -->\n                <ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item *ngFor=\"let curRep of ((slideInstance|ajfAsRepeatingSlideInstance).reps|ajfRange); let idx = index; let lastSlide = last\">\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position|ajfIncrement:idx + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <div *ngIf=\"lastSlide && !readonly\" class=\"ajf-group-actions\">\n                            <button (click)=\"addGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canAdd\" mat-mini-fab>\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canRemove\" mat-mini-fab>\n                              <mat-icon>remove</mat-icon>\n                            </button>\n                          </div>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">\n                            {{ snum! + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n          </ng-container>\n          <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\">\n            <div class=\"ajf-left-bar\">\n              <div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\">\n                <button mat-button (click)=\"goToPrevError()\" danger>\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button mat-button (click)=\"goToNextError()\" danger>\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n              </div>\n              <div class=\"ajf-info-box ajf-error\">\n                <div class=\"ajf-title\" translate>Errors</div>\n                <div class=\"ajf-content\">\n                  {{ errors | async }} / {{ slidesNum|async }}\n                </div>\n              </div>\n            </div>\n          </div>\n        </ajf-page-slider>\n      </div>\n    </div>\n  </form>\n</ng-container>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-form{display:block}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;top:0;right:0;bottom:0;left:0}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip{overflow:auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button{flex:1 1 auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button *{display:block;width:100%;overflow:hidden;text-overflow:ellipsis}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-topbar-button{margin-right:10px}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{flex:1 0 auto;padding-left:10px;padding-right:10px;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:bold}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}\n"]
        }),
        __metadata("design:paramtypes", [AjfFormRendererService, ChangeDetectorRef])
    ], AjfFormRenderer);
    return AjfFormRenderer;
})();

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
let AjfFormsModule = /** @class */ (() => {
    var AjfFormsModule_1;
    let AjfFormsModule = AjfFormsModule_1 = class AjfFormsModule {
        static forRoot() {
            return {
                ngModule: AjfFormsModule_1,
                providers: [
                    AjfFieldService,
                ],
            };
        }
    };
    AjfFormsModule = AjfFormsModule_1 = __decorate([
        NgModule({
            imports: [
                AjfBarcodeModule, AjfCalendarModule, AjfCommonModule, AjfFormsModule$1,
                AjfCheckboxGroupModule, AjfPageSliderModule, AjfTimeModule, CommonModule,
                MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
                MatIconModule, MatInputModule, MatRadioModule, MatSelectModule,
                MatSlideToggleModule, MatToolbarModule, ReactiveFormsModule, TranslateModule,
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
                AjfInputFieldComponent,
                AjfMultipleChoiceFieldComponent,
                AjfSingleChoiceFieldComponent,
                AjfTableFieldComponent,
                AjfTimeFieldComponent,
            ],
            entryComponents: [
                AjfBarcodeFieldComponent,
                AjfBooleanFieldComponent,
                AjfDateFieldComponent,
                AjfDateInputFieldComponent,
                AjfEmptyFieldComponent,
                AjfInputFieldComponent,
                AjfMultipleChoiceFieldComponent,
                AjfSingleChoiceFieldComponent,
                AjfTableFieldComponent,
                AjfTimeFieldComponent,
            ],
            exports: [
                AjfFormField,
                AjfFormRenderer,
            ],
            providers: [
                AjfFieldService,
                { provide: AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
            ],
        })
    ], AjfFormsModule);
    return AjfFormsModule;
})();

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

export { AjfBooleanFieldComponent, AjfDateFieldComponent, AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfFieldService, AjfFieldWarningDialog, AjfFormField, AjfFormRenderer, AjfFormsModule, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent, AjfSingleChoiceFieldComponent, AjfTableFieldComponent, AjfTimeFieldComponent, AjfWarningAlertService, AjfBarcodeFieldComponent as ɵgc_ajf_src_material_forms_forms_a };
//# sourceMappingURL=forms.js.map
