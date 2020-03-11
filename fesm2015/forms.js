import { AjfBaseFieldComponent, AjfFormRendererService, AjfDateValueStringPipe, AjfInputFieldComponent as AjfInputFieldComponent$1, AjfFieldWithChoicesComponent, AJF_SEARCH_ALERT_THRESHOLD, AjfFieldService as AjfFieldService$1, AjfFieldType, AjfFormField as AjfFormField$1, AjfFormRenderer as AjfFormRenderer$1, AjfFormsModule as AjfFormsModule$1 } from '@ajf/core/forms';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injectable, ChangeDetectorRef, ViewChild, Optional, Inject, ɵɵdefineInjectable, ComponentFactoryResolver, Input, Pipe, NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormControl as FormControl$1, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfBarcodeModule } from '@ajf/material/barcode';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import { AjfPageSliderModule } from '@ajf/material/page-slider';
import { AjfTimeModule } from '@ajf/material/time';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/field-warning-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFieldWarningDialog {
}
AjfFieldWarningDialog.decorators = [
    { type: Component, args: [{
                template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
if (false) {
    /** @type {?} */
    AjfFieldWarningDialog.prototype.message;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/warning-alert-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfWarningAlertService {
    /**
     * @param {?} _dialog
     */
    constructor(_dialog) {
        this._dialog = _dialog;
    }
    /**
     * @param {?} warnings
     * @return {?}
     */
    showWarningAlertPrompt(warnings) {
        /** @type {?} */
        const dialog = this._dialog.open(AjfFieldWarningDialog);
        dialog.componentInstance.message = warnings.join('<br>');
        return dialog.afterClosed().pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        (result) => ({ result }))));
    }
}
AjfWarningAlertService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AjfWarningAlertService.ctorParameters = () => [
    { type: MatDialog }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfWarningAlertService.prototype._dialog;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/boolean-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfBooleanFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfBooleanFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<mat-slide-toggle *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [disabled]=\"readonly\"></mat-slide-toggle>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfBooleanFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfBooleanFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/date-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfDateFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfDateFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfDateFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfDateFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/date-input-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfDateInputFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     * @param {?} _dvs
     */
    constructor(cdr, service, was, _dvs) {
        super(cdr, service, was);
        this._dvs = _dvs;
    }
    /**
     * @return {?}
     */
    onChange() {
        if (this.input == null) {
            return;
        }
        /** @type {?} */
        const val = this.input.value || '';
        if (val.length > 0) {
            if ((this._minDateStr != null && val < this._minDateStr)
                || (this._maxDateStr != null && val > this._maxDateStr)) {
                this.input.value = '';
            }
        }
    }
    /**
     * @protected
     * @return {?}
     */
    _onInstanceChange() {
        this._minDateStr = this._dvs.transform(this.instance.node.minDate);
        this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
    }
}
AjfDateInputFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput type=\"date\"\n      [attr.aria-label]=\"instance.node.label || (instance|ajfNodeCompleteName)\"\n      [min]=\"instance.node.minDate|ajfDateValueString\"\n      [max]=\"instance.node.maxDate|ajfDateValueString\"\n      [readonly]=\"readonly\"\n      (change)=\"onChange()\"\n      [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfDateInputFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService },
    { type: AjfDateValueStringPipe }
];
AjfDateInputFieldComponent.propDecorators = {
    input: [{ type: ViewChild, args: [MatInput, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfDateInputFieldComponent.ngAcceptInputType_readonly;
    /** @type {?} */
    AjfDateInputFieldComponent.prototype.input;
    /**
     * @type {?}
     * @private
     */
    AjfDateInputFieldComponent.prototype._minDateStr;
    /**
     * @type {?}
     * @private
     */
    AjfDateInputFieldComponent.prototype._maxDateStr;
    /**
     * @type {?}
     * @private
     */
    AjfDateInputFieldComponent.prototype._dvs;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/empty-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfEmptyFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfEmptyFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<h1 [innerHTML]=\"instance.node.label | translate\"></h1>\n<div [innerHTML]=\"instance.node.HTML | translate\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfEmptyFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfEmptyFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/barcode-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfBarcodeFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfBarcodeFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [readonly]=\"readonly\"></ajf-barcode>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfBarcodeFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfBarcodeFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/input-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfInputFieldComponent extends AjfInputFieldComponent$1 {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfInputFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput *ngIf=\"type === 'text'\" type=\"text\" [readonly]=\"readonly\" [formControl]=\"ctrl!\">\n  <input matInput *ngIf=\"type === 'number'\" type=\"number\" [readonly]=\"readonly\" [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfInputFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfInputFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/multiple-choice-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class AjfMultipleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     * @param {?} searchThreshold
     */
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
    }
}
AjfMultipleChoiceFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\" [disabled]=\"readonly\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\"\n        [readonly]=\"readonly\"\n        [value]=\"choice.value\">\n      {{ choice.label | translate }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfMultipleChoiceFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService },
    { type: Number, decorators: [{ type: Optional }, { type: Inject, args: [AJF_SEARCH_ALERT_THRESHOLD,] }] }
];
if (false) {
    /** @type {?} */
    AjfMultipleChoiceFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/single-choice-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class AjfSingleChoiceFieldComponent extends AjfFieldWithChoicesComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     * @param {?} searchThreshold
     */
    constructor(cdr, service, was, searchThreshold) {
        super(cdr, service, was, searchThreshold);
    }
}
AjfSingleChoiceFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [disabled]=\"readonly\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\" [disabled]=\"readonly\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfSingleChoiceFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService },
    { type: Number, decorators: [{ type: Optional }, { type: Inject, args: [AJF_SEARCH_ALERT_THRESHOLD,] }] }
];
if (false) {
    /** @type {?} */
    AjfSingleChoiceFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/table-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ExtFormControl() { }
if (false) {
    /** @type {?|undefined} */
    ExtFormControl.prototype.show;
}
class AjfTableFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
    /**
     * @param {?} ev
     * @param {?} row
     * @param {?} column
     * @return {?}
     */
    goToNextCell(ev, row, column) {
        /** @type {?} */
        const rowLength = this.instance.controls[row][1].length;
        /** @type {?} */
        const currentCell = (/** @type {?} */ (this.instance.controls[row][1][column]));
        if (column + 1 >= rowLength) {
            column = 0;
            if (row + 1 >= this.instance.controls.length) {
                row = 1;
            }
            else {
                row += 1;
            }
        }
        else {
            column += 1;
        }
        if (typeof currentCell !== 'string') {
            currentCell.show = false;
        }
        this._showCell(row, column);
        ev.preventDefault();
        ev.stopPropagation();
    }
    /**
     * @param {?} row
     * @param {?} column
     * @return {?}
     */
    goToCell(row, column) {
        this._resetControls();
        this._showCell(row, column);
    }
    /**
     * @private
     * @return {?}
     */
    _resetControls() {
        this.instance.controls.forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row[1].forEach((/**
         * @param {?} cell
         * @return {?}
         */
        cell => {
            if (typeof cell !== 'string') {
                ((/** @type {?} */ (cell))).show = false;
            }
        }))));
    }
    /**
     * @private
     * @param {?} row
     * @param {?} column
     * @return {?}
     */
    _showCell(row, column) {
        if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
            return;
        }
        /** @type {?} */
        const nextCell = (/** @type {?} */ (this.instance.controls[row][1][column]));
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    }
}
AjfTableFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <td *ngFor=\"let c of columns[1]; let column = index\">\n          <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n            <ng-container *ngIf=\"contr != null\">\n              <input *ngIf=\"row > 0 && contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr\"\n                (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus>\n              <ng-template #plainTextCell>\n                <span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\"\n                  (click)=\"goToCell(row, column)\">{{ contr!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-template>\n            </ng-container>\n          </ng-container>\n        </td>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
            }] }
];
/** @nocollapse */
AjfTableFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfTableFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/time-field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTimeFieldComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} was
     */
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfTimeFieldComponent.decorators = [
    { type: Component, args: [{
                template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [readonly]=\"readonly\"></ajf-time>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfTimeFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: AjfWarningAlertService }
];
if (false) {
    /** @type {?} */
    AjfTimeFieldComponent.ngAcceptInputType_readonly;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/field-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFieldService extends AjfFieldService$1 {
    constructor() {
        super();
        this.componentsMap[AjfFieldType.String] = { component: AjfInputFieldComponent },
            this.componentsMap[AjfFieldType.Text] = { component: AjfInputFieldComponent },
            this.componentsMap[AjfFieldType.Number] = {
                component: AjfInputFieldComponent, inputs: { type: 'number' }
            },
            this.componentsMap[AjfFieldType.Boolean] = { component: AjfBooleanFieldComponent },
            this.componentsMap[AjfFieldType.Formula] = {
                component: AjfInputFieldComponent, inputs: { readonly: true }
            },
            this.componentsMap[AjfFieldType.Date] = { component: AjfDateFieldComponent },
            this.componentsMap[AjfFieldType.DateInput] = { component: AjfDateInputFieldComponent },
            this.componentsMap[AjfFieldType.Table] = { component: AjfTableFieldComponent },
            this.componentsMap[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
            this.componentsMap[AjfFieldType.SingleChoice] = { component: AjfSingleChoiceFieldComponent },
            this.componentsMap[AjfFieldType.MultipleChoice] = { component: AjfMultipleChoiceFieldComponent },
            this.componentsMap[AjfFieldType.Time] = { component: AjfTimeFieldComponent },
            this.componentsMap[AjfFieldType.Barcode] = { component: AjfBarcodeFieldComponent };
    }
}
AjfFieldService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
AjfFieldService.ctorParameters = () => [];
/** @nocollapse */ AjfFieldService.ɵprov = ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/field.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormField extends AjfFormField$1 {
    /**
     * @param {?} cdr
     * @param {?} cfr
     * @param {?} fieldService
     */
    constructor(cdr, cfr, fieldService) {
        super(cdr, cfr);
        this.componentsMap = fieldService.componentsMap;
    }
}
AjfFormField.decorators = [
    { type: Component, args: [{
                selector: 'ajf-field,ajf-form-field',
                template: "<div\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a>\n</ng-container>\n<div *ngIf=\"instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error }} \n    </div>\n  </ng-container>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"]
            }] }
];
/** @nocollapse */
AjfFormField.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: AjfFieldService }
];
if (false) {
    /** @type {?} */
    AjfFormField.ngAcceptInputType_readonly;
    /** @type {?} */
    AjfFormField.prototype.componentsMap;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/form.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormRenderer extends AjfFormRenderer$1 {
    /**
     * @param {?} rendererService
     * @param {?} changeDetectorRef
     */
    constructor(rendererService, changeDetectorRef) {
        super(rendererService, changeDetectorRef);
        this.topBar = false;
    }
    /**
     * @param {?} slide
     * @return {?}
     */
    scrollToSlide(slide) {
        this.formSlider.slide({ to: slide.position - 1 });
    }
}
AjfFormRenderer.decorators = [
    { type: Component, args: [{
                selector: 'ajf-form',
                template: "<ng-container *ngIf=\"formGroup|async as fg\">\n  <form novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\">\n        <ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\">\n          <button mat-button class=\"ajf-topbar-button\"\n          *ngIf=\"topBar != null && slideInstance.node != null && slideInstance.node.label != null && slideInstance.node.label.length > 0\"\n              (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.node.label | translate}}</button>\n        </ng-template>\n      </mat-toolbar>\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\">\n        {{ title }}\n        <span class=\"ajf-spacer\"></span>\n        <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\"\n            translate>Save</button>\n      </mat-toolbar>\n      <div class=\"ajf-slider-container\">\n        <ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\"\n            [fixedOrientation]=\"fixedOrientation\"\n            [hideNavigationButtons]=\"hideNavigationButtons\"\n            [orientation]=\"orientation\"\n            #formSlider>\n          <ng-container *ngIf=\"(slides|async) as curSlides\">\n            <ng-container *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span class=\"ajf-form-header-number\">\n                            1 &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\">\n              <!-- non repeating slides -->\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\" [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n                <!-- repeating slides -->\n                <ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item *ngFor=\"let curRep of ((slideInstance|ajfAsRepeatingSlideInstance).reps|ajfRange); let idx = index; let lastSlide = last\">\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position|ajfIncrement:idx + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <div *ngIf=\"lastSlide\" class=\"ajf-group-actions\">\n                            <button (click)=\"addGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canAdd\" mat-mini-fab>\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canRemove\" mat-mini-fab>\n                              <mat-icon>remove</mat-icon>\n                            </button>\n                          </div>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">\n                            {{ snum! + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n          </ng-container>\n          <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\">\n            <div class=\"ajf-left-bar\">\n              <div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\">\n                <button mat-button (click)=\"goToPrevError()\" danger>\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button mat-button (click)=\"goToNextError()\" danger>\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n              </div>\n              <div class=\"ajf-info-box ajf-error\">\n                <div class=\"ajf-title\" translate>Errors</div>\n                <div class=\"ajf-content\">\n                  {{ errors | async }} / {{ slidesNum|async }}\n                </div>\n              </div>\n            </div>\n          </div>\n        </ajf-page-slider>\n      </div>\n    </div>\n  </form>\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-form{display:block}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;top:0;right:0;bottom:0;left:0}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip{overflow:auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button{flex:1 1 auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button *{display:block;width:100%;overflow:hidden;text-overflow:ellipsis}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-topbar-button{margin-right:10px}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{flex:1 0 auto;padding-left:10px;padding-right:10px;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:bold}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}\n"]
            }] }
];
/** @nocollapse */
AjfFormRenderer.ctorParameters = () => [
    { type: AjfFormRendererService },
    { type: ChangeDetectorRef }
];
AjfFormRenderer.propDecorators = {
    topBar: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_fixedOrientation;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_hasEndMessage;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_hasStartMessage;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_hideBottomToolbar;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_hideNavigationButtons;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_hideTopToolbar;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_readonly;
    /** @type {?} */
    AjfFormRenderer.ngAcceptInputType_saveDisabled;
    /** @type {?} */
    AjfFormRenderer.prototype.topBar;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/get-table-cell-control.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FormControl extends FormControl$1 {
}
if (false) {
    /** @type {?} */
    FormControl.prototype.show;
}
class AjfGetTableCellControlPipe {
    /**
     * @param {?} ctrl
     * @return {?}
     */
    transform(ctrl) {
        if (ctrl == null || typeof ctrl === 'string') {
            return null;
        }
        return (/** @type {?} */ (ctrl));
    }
}
AjfGetTableCellControlPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfGetTableCellControl' },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/is-cell-editable.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfIsCellEditablePipe {
    /**
     * @param {?} cell
     * @return {?}
     */
    transform(cell) {
        if (cell == null || typeof cell === 'string') {
            return false;
        }
        return cell.editable === true;
    }
}
AjfIsCellEditablePipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfIsCellEditable' },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/forms-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AjfFormsModule,
            providers: [
                AjfFieldService,
            ],
        };
    }
}
AjfFormsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatCardModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatRadioModule,
                    MatSelectModule,
                    MatSlideToggleModule,
                    MatToolbarModule,
                    TranslateModule,
                    AjfFormsModule$1,
                    AjfCalendarModule,
                    AjfBarcodeModule,
                    AjfCheckboxGroupModule,
                    AjfCommonModule,
                    AjfPageSliderModule,
                    AjfTimeModule
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
                    AjfGetTableCellControlPipe,
                    AjfInputFieldComponent,
                    AjfIsCellEditablePipe,
                    AjfMultipleChoiceFieldComponent,
                    AjfSingleChoiceFieldComponent,
                    AjfTableFieldComponent,
                    AjfTimeFieldComponent
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
                    AjfTimeFieldComponent
                ],
                exports: [
                    AjfFormField,
                    AjfFormRenderer
                ],
                providers: [
                    AjfFieldService,
                    AjfWarningAlertService,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfBooleanFieldComponent, AjfDateFieldComponent, AjfDateInputFieldComponent, AjfEmptyFieldComponent, AjfFieldService, AjfFieldWarningDialog, AjfFormField, AjfFormRenderer, AjfFormsModule, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent, AjfSingleChoiceFieldComponent, AjfTableFieldComponent, AjfTimeFieldComponent, AjfWarningAlertService, AjfBarcodeFieldComponent as ɵajf_src_material_forms_forms_a, AjfGetTableCellControlPipe as ɵajf_src_material_forms_forms_b, AjfIsCellEditablePipe as ɵajf_src_material_forms_forms_c };
//# sourceMappingURL=forms.js.map
