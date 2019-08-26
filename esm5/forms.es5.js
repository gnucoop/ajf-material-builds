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
import { __extends } from 'tslib';
import { AjfFormRendererService, AjfBaseFieldComponent, AjfInputFieldComponent as AjfInputFieldComponent$1, AJF_SEARCH_ALERT_THRESHOLD, AjfFieldWithChoicesComponent, AjfFieldType, AjfFieldHost, AjfFormField as AjfFormField$1, AjfFormRenderer as AjfFormRenderer$1, AjfFormsModule as AjfFormsModule$1 } from '@ajf/core/forms';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injectable, ChangeDetectorRef, Optional, Inject, ViewChild, ComponentFactoryResolver, ViewChildren, Input, NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfTimeModule } from '@ajf/core/time';
import { AjfCalendarModule } from '@ajf/material/calendar';
import { AjfCheckboxGroupModule } from '@ajf/material/checkbox-group';
import { AjfPageSliderModule } from '@ajf/material/page-slider';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFieldWarningDialog = /** @class */ (function () {
    function AjfFieldWarningDialog() {
    }
    AjfFieldWarningDialog.decorators = [
        { type: Component, args: [{template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content><mat-dialog-actions><button mat-button [mat-dialog-close]=\"true\">Ok</button> <button mat-button [mat-dialog-close]=\"false\">Cancel</button></mat-dialog-actions>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    return AjfFieldWarningDialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfWarningAlertService = /** @class */ (function () {
    function AjfWarningAlertService(_dialog) {
        this._dialog = _dialog;
    }
    /**
     * @param {?} warnings
     * @return {?}
     */
    AjfWarningAlertService.prototype.showWarningAlertPrompt = /**
     * @param {?} warnings
     * @return {?}
     */
    function (warnings) {
        /** @type {?} */
        var dialog = this._dialog.open(AjfFieldWarningDialog);
        dialog.componentInstance.message = warnings.join('<br>');
        return dialog.afterClosed().pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return ({ result: result }); })));
    };
    AjfWarningAlertService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AjfWarningAlertService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return AjfWarningAlertService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfBooleanFieldComponent = /** @class */ (function (_super) {
    __extends(AjfBooleanFieldComponent, _super);
    function AjfBooleanFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfBooleanFieldComponent.decorators = [
        { type: Component, args: [{template: "<mat-slide-toggle [formControl]=\"control|async\"></mat-slide-toggle>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfBooleanFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfBooleanFieldComponent;
}(AjfBaseFieldComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfDateFieldComponent = /** @class */ (function (_super) {
    __extends(AjfDateFieldComponent, _super);
    function AjfDateFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfDateFieldComponent.decorators = [
        { type: Component, args: [{template: "<ajf-calendar selectionMode=\"date\" dateOnlyForDay [minDate]=\"instance.node.minDate|ajfDateValue\" [maxDate]=\"instance.node.maxDate|ajfDateValue\" [formControl]=\"control|async\"></ajf-calendar>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfDateFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfDateFieldComponent;
}(AjfBaseFieldComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfEmptyFieldComponent = /** @class */ (function (_super) {
    __extends(AjfEmptyFieldComponent, _super);
    function AjfEmptyFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfEmptyFieldComponent.decorators = [
        { type: Component, args: [{template: "<h1 [innerHTML]=\"instance.node.label | translate\"></h1><div [innerHTML]=\"instance.node.HTML | translate\"></div>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfEmptyFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfEmptyFieldComponent;
}(AjfBaseFieldComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfInputFieldComponent = /** @class */ (function (_super) {
    __extends(AjfInputFieldComponent, _super);
    function AjfInputFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfInputFieldComponent.decorators = [
        { type: Component, args: [{template: "<mat-form-field><input matInput [type]=\"type\" [readonly]=\"readonly\" [formControl]=\"control|async\"></mat-form-field>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfInputFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfInputFieldComponent;
}(AjfInputFieldComponent$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var AjfMultipleChoiceFieldComponent = /** @class */ (function (_super) {
    __extends(AjfMultipleChoiceFieldComponent, _super);
    function AjfMultipleChoiceFieldComponent(cdr, service, was, searchThreshold) {
        return _super.call(this, cdr, service, was, searchThreshold) || this;
    }
    AjfMultipleChoiceFieldComponent.decorators = [
        { type: Component, args: [{template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\"><mat-select [formControl]=\"control|async\" [multiple]=\"true\"><mat-option [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">{{ choice.label | translate }}</mat-option></mat-select></ng-container><ng-template #expanded><ajf-checkbox-group class=\"ajf-choices-container\" [formControl]=\"control|async\"><ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\" [value]=\"choice.value\">{{ choice.label | translate }}</ajf-checkbox-group-item></ajf-checkbox-group></ng-template>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfMultipleChoiceFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService },
        { type: Number, decorators: [{ type: Optional }, { type: Inject, args: [AJF_SEARCH_ALERT_THRESHOLD,] }] }
    ]; };
    return AjfMultipleChoiceFieldComponent;
}(AjfFieldWithChoicesComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var AjfSingleChoiceFieldComponent = /** @class */ (function (_super) {
    __extends(AjfSingleChoiceFieldComponent, _super);
    function AjfSingleChoiceFieldComponent(cdr, service, was, searchThreshold) {
        return _super.call(this, cdr, service, was, searchThreshold) || this;
    }
    AjfSingleChoiceFieldComponent.decorators = [
        { type: Component, args: [{template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\"><mat-select [formControl]=\"control|async\"><mat-option [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">{{ choice.label | translate }}</mat-option></mat-select></ng-container><ng-template #expanded><mat-radio-group class=\"ajf-choices-container\" [formControl]=\"control|async\"><mat-radio-button [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">{{ choice.label | translate }}</mat-radio-button></mat-radio-group></ng-template>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfSingleChoiceFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService },
        { type: Number, decorators: [{ type: Optional }, { type: Inject, args: [AJF_SEARCH_ALERT_THRESHOLD,] }] }
    ]; };
    return AjfSingleChoiceFieldComponent;
}(AjfFieldWithChoicesComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTableFieldComponent = /** @class */ (function (_super) {
    __extends(AjfTableFieldComponent, _super);
    function AjfTableFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfTableFieldComponent.decorators = [
        { type: Component, args: [{template: "<table class=\"ajf-table-field\"><ng-container *ngIf=\"!instance.node.editable else editableTmpl\"><ng-container *ngFor=\"let columns of (instance|ajfTableVisibleColumns); let i index\"><tr [ngClass]=\"i | ajfTableRowClass\"><td *ngFor=\"let cellValue of columns\">{{ cellValue | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</td></tr></ng-container></ng-container><ng-template #editableTmpl><ng-container *ngFor=\"let columns of instance.controlsWithLabels; let indexRows = index\"><tr [ngClass]=\"indexRows | ajfTableRowClass\"><td *ngFor=\"let contr of columns; let indexColums = index\"><ng-container *ngIf=\"contr != null\"><ng-container *ngIf=\"indexColums != 0 && indexRows != 0\"><input (focusout)=\"contr.show = false\" *ngIf=\"contr.show\" type=\"number\" [formControl]=\"contr\" autoFocus> <span *ngIf=\"!contr.show\" class=\"ajf-table-cell\" (click)=\"contr.show ? contr.show = false : contr.show = true;\">{{ contr.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span></ng-container><ng-container *ngIf=\"indexColums == 0 || indexRows == 0\">{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-container></ng-container></td></tr></ng-container></ng-template></table>",
                    styles: ["table.ajf-table-field{width:100%}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfTableFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfTableFieldComponent;
}(AjfBaseFieldComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTimeFieldComponent = /** @class */ (function (_super) {
    __extends(AjfTimeFieldComponent, _super);
    function AjfTimeFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfTimeFieldComponent.decorators = [
        { type: Component, args: [{template: "<ajf-time [formControl]=\"control|async\"></ajf-time>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfTimeFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfTimeFieldComponent;
}(AjfBaseFieldComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormField = /** @class */ (function (_super) {
    __extends(AjfFormField, _super);
    function AjfFormField(cfr) {
        var _a;
        var _this = _super.call(this, cfr) || this;
        _this.componentsMap = (_a = {},
            _a[AjfFieldType.String] = { component: AjfInputFieldComponent },
            _a[AjfFieldType.Text] = { component: AjfInputFieldComponent },
            _a[AjfFieldType.Number] = { component: AjfInputFieldComponent, inputs: { type: 'number' } },
            _a[AjfFieldType.Boolean] = { component: AjfBooleanFieldComponent },
            _a[AjfFieldType.Formula] = { component: AjfInputFieldComponent, inputs: { readonly: true } },
            _a[AjfFieldType.Date] = { component: AjfDateFieldComponent },
            _a[AjfFieldType.DateInput] = { component: AjfInputFieldComponent, inputs: { type: 'date' } },
            _a[AjfFieldType.Table] = { component: AjfTableFieldComponent },
            _a[AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
            _a[AjfFieldType.SingleChoice] = { component: AjfSingleChoiceFieldComponent },
            _a[AjfFieldType.MultipleChoice] = { component: AjfMultipleChoiceFieldComponent },
            _a[AjfFieldType.Time] = { component: AjfTimeFieldComponent },
            _a);
        return _this;
    }
    AjfFormField.decorators = [
        { type: Component, args: [{selector: 'ajf-field,ajf-form-field',
                    template: "<div [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\" [class.ajf-validated]=\"instance|ajfFieldIsValid\"><ng-template ajf-field-host></ng-template></div><ng-container *ngIf=\"instance && instance.node && instance.node.attachments\"><a *ngFor=\"let attachment of instance.node.attachments\" [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a></ng-container><div *ngIf=\"instance && instance.validationResults\" class=\"ajf-errors\"><ng-container *ngFor=\"let res of instance.validationResults\"><div class=\"error\" *ngIf=\"!res.result\">{{ res.error }}</div></ng-container></div>",
                    styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:grey}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td input,table tr td span{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:0;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child input,table tr td:last-child span{border-right-color:#ccc}table tr:last-of-type td input,table tr:last-of-type td span{border-bottom-color:#ccc}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    inputs: ['instance'],
                    queries: {
                        fieldHost: new ViewChild(AjfFieldHost, { static: true }),
                    }
                },] },
    ];
    /** @nocollapse */
    AjfFormField.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    return AjfFormField;
}(AjfFormField$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormRenderer = /** @class */ (function (_super) {
    __extends(AjfFormRenderer, _super);
    function AjfFormRenderer(rendererService, changeDetectorRef) {
        var _this = _super.call(this, rendererService, changeDetectorRef) || this;
        _this.topBar = false;
        return _this;
    }
    /**
     * @param {?} slide
     * @return {?}
     */
    AjfFormRenderer.prototype.scrollToSlide = /**
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        this.formSlider.slide({ to: slide.position - 1 });
    };
    AjfFormRenderer.decorators = [
        { type: Component, args: [{selector: 'ajf-form',
                    template: "<ng-container *ngIf=\"formGroup|async as fg\"><form novalidate [formGroup]=\"fg\"><div class=\"ajf-form-container\"><mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\"><ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\"><button mat-button class=\"ajf-topbar-button\" *ngIf=\"topBar && slideInstance.node && slideInstance.node.label != null && slideInstance.node.label.length > 0\" (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.node.label | translate}}</button></ng-template></mat-toolbar><mat-toolbar *ngIf=\"!hideTopToolbar\">{{ title }} <span class=\"ajf-spacer\"></span> <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\" translate>Save</button></mat-toolbar><div class=\"ajf-slider-container\"><ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\" [fixedOrientation]=\"fixedOrientation\" [hideNavigationButtons]=\"hideNavigationButtons\" [orientation]=\"orientation\" #formSlider><ng-container *ngIf=\"(slides|async) as curSlides\"><ng-container *ngIf=\"curSlides.length > 0 && hasStartMessage\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">1 &rarr; </span><span class=\"ajf-title\"><ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content></span></h2></div></mat-card-header><mat-card-content><ng-content select=\"[ajfFormStartMessage]\"></ng-content></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container><ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\"><ng-container *ngIf=\"slideInstance.visible\"><ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">{{ slideInstance.position + hasStartMessage }} &rarr;</span> <span [innerHTML]=\"slideInstance.node.label | translate\"></span></h2><mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon><mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon></div></mat-card-header><mat-card-content><ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\"><div [ngClass]=\"'ajf-' + fieldInstance.node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\"><i [class]=\"fieldInstance.node.fieldType | ajfFieldIcon\" item-right></i><p>{{ fieldInstance.node.description | translate }}</p><label *ngIf=\"fieldInstance.node.fieldType !== 7\" [innerHTML]=\"fieldInstance.node.label | translate\"></label><ajf-field [instance]=\"fieldInstance\"></ajf-field></div></ng-template></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container><ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\"><ajf-page-slider-item *ngFor=\"let curRep of (slideInstance.reps|ajfRange); let idx = index; let lastSlide = last\"><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">{{ slideInstance.position|ajfIncrement:idx + hasStartMessage }} &rarr;</span> <span [innerHTML]=\"slideInstance.node.label | translate\"></span></h2><mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\">warning</mat-icon><mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\">check</mat-icon></div></mat-card-header><mat-card-content><div *ngIf=\"lastSlide\" class=\"ajf-group-actions\"><button (click)=\"addGroup(slideInstance)\" [disabled]=\"!slideInstance.canAdd\" mat-mini-fab><mat-icon>add</mat-icon></button> <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!slideInstance.canRemove\" mat-mini-fab><mat-icon>remove</mat-icon></button></div><ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\"><div [ngClass]=\"'ajf-' + fieldInstance.node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\"><i [class]=\"fieldInstance.node.fieldType | ajfFieldIcon\" item-right></i><p>{{ fieldInstance.node.description | translate }}</p><label [innerHTML]=\"fieldInstance.node.label | translate\"></label><ajf-field [instance]=\"fieldInstance\"></ajf-field></div></ng-template></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container></ng-container></ng-container><ng-container *ngIf=\"curSlides.length > 0 && hasEndMessage\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">{{ snum + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr; </span><span class=\"ajf-title\"><ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content></span></h2></div></mat-card-header><mat-card-content><ng-content select=\"[ajfFormEndMessage]\"></ng-content></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container></ng-container><div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\"><div class=\"ajf-left-bar\"><div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\"><button mat-button (click)=\"goToPrevError()\" danger><mat-icon>arrow_upward</mat-icon></button> <button mat-button (click)=\"goToNextError()\" danger><mat-icon>arrow_downward</mat-icon></button></div><div class=\"ajf-info-box ajf-error\"><div class=\"ajf-title\" translate>Errors</div><div class=\"ajf-content\">{{ errors | async }} / {{ slidesNum|async }}</div></div></div></div></ajf-page-slider></div></div></form></ng-container>",
                    styles: ["ajf-form{display:block}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;top:0;right:0;bottom:0;left:0}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip{overflow:auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button{flex:1 1 auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button *{display:block;width:100%;overflow:hidden;text-overflow:ellipsis}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-topbar-button{margin-right:10px}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{flex:1 0 auto;padding-left:10px;padding-right:10px;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:700}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: [
                        'hasStartMessage',
                        'hasEndMessage',
                        'form',
                        'formSchema',
                        'saveDisabled',
                        'title',
                        'hideTopToolbar',
                        'hideBottomToolbar',
                        'hideNavigationButtons',
                        'orientation',
                        'fixedOrientation',
                    ],
                    outputs: [
                        'formSave',
                        'formAction',
                        'orientationChange',
                    ],
                    queries: {
                        formSlider: new ViewChild('formSlider', { static: false }),
                        fields: new ViewChildren(AjfFormField)
                    }
                },] },
    ];
    /** @nocollapse */
    AjfFormRenderer.ctorParameters = function () { return [
        { type: AjfFormRendererService },
        { type: ChangeDetectorRef }
    ]; };
    AjfFormRenderer.propDecorators = {
        topBar: [{ type: Input }]
    };
    return AjfFormRenderer;
}(AjfFormRenderer$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormsModule = /** @class */ (function () {
    function AjfFormsModule() {
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
                        AjfCheckboxGroupModule,
                        AjfCommonModule,
                        AjfPageSliderModule,
                        AjfTimeModule
                    ],
                    declarations: [
                        AjfBooleanFieldComponent,
                        AjfDateFieldComponent,
                        AjfEmptyFieldComponent,
                        AjfFormField,
                        AjfFieldWarningDialog,
                        AjfFormRenderer,
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
                    entryComponents: [
                        AjfBooleanFieldComponent,
                        AjfDateFieldComponent,
                        AjfEmptyFieldComponent,
                        AjfFieldWarningDialog,
                        AjfInputFieldComponent,
                        AjfMultipleChoiceFieldComponent,
                        AjfSingleChoiceFieldComponent,
                        AjfTableFieldComponent,
                        AjfTimeFieldComponent
                    ],
                    providers: [
                        AjfWarningAlertService,
                    ],
                },] },
    ];
    return AjfFormsModule;
}());

export { AjfBooleanFieldComponent, AjfDateFieldComponent, AjfEmptyFieldComponent, AjfFieldWarningDialog, AjfFormField, AjfFormRenderer, AjfFormsModule, AjfInputFieldComponent, AjfMultipleChoiceFieldComponent, AjfSingleChoiceFieldComponent, AjfTableFieldComponent, AjfTimeFieldComponent, AjfWarningAlertService };
//# sourceMappingURL=forms.es5.js.map
