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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material/dialog'), require('rxjs/operators'), require('@ajf/core/forms'), require('@angular/common'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/slide-toggle'), require('@angular/material/toolbar'), require('@ngx-translate/core'), require('@ajf/core/common'), require('@ajf/material/calendar'), require('@ajf/material/checkbox-group'), require('@ajf/material/page-slider'), require('@ajf/material/time')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/forms', ['exports', '@angular/core', '@angular/material/dialog', 'rxjs/operators', '@ajf/core/forms', '@angular/common', '@angular/forms', '@angular/material/button', '@angular/material/card', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@angular/material/radio', '@angular/material/select', '@angular/material/slide-toggle', '@angular/material/toolbar', '@ngx-translate/core', '@ajf/core/common', '@ajf/material/calendar', '@ajf/material/checkbox-group', '@ajf/material/page-slider', '@ajf/material/time'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.forms = {}), global.ng.core, global.ng.material.dialog, global.rxjs.operators, global.ajf.core.forms, global.ng.common, global.ng.forms, global.ng.material.button, global.ng.material.card, global.ng.material.formField, global.ng.material.icon, global.ng.material.input, global.ng.material.radio, global.ng.material.select, global.ng.material.slideToggle, global.ng.material.toolbar, global.ngxt.core, global.ajf.core.common, global.ajf.material.calendar, global.ajf.material.checkboxGroup, global.ajf.material.pageSlider, global.ajf.material.time));
}(this, function (exports, core, dialog, operators, forms, common, forms$1, button, card, formField, icon, input, radio, select, slideToggle, toolbar, core$1, common$1, calendar, checkboxGroup, pageSlider, time) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormFieldWarningDialog = /** @class */ (function () {
        function AjfFormFieldWarningDialog() {
        }
        AjfFormFieldWarningDialog.decorators = [
            { type: core.Component, args: [{template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content><mat-dialog-actions><button mat-button [mat-dialog-close]=\"true\">Ok</button> <button mat-button [mat-dialog-close]=\"false\">Cancel</button></mat-dialog-actions>",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    },] },
        ];
        return AjfFormFieldWarningDialog;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormField = /** @class */ (function (_super) {
        __extends(AjfFormField, _super);
        function AjfFormField(_rendererService, _changeDetectionRef, _dialog) {
            var _this = _super.call(this, _rendererService, _changeDetectionRef) || this;
            _this._dialog = _dialog;
            return _this;
        }
        /**
         * @param {?} messagesWarning
         * @return {?}
         */
        AjfFormField.prototype.showWarningAlertPrompt = /**
         * @param {?} messagesWarning
         * @return {?}
         */
        function (messagesWarning) {
            /** @type {?} */
            var dialog = this._dialog.open(AjfFormFieldWarningDialog);
            dialog.componentInstance.message = messagesWarning.join('<br>');
            return dialog.afterClosed().pipe(operators.map((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return ({ result: result }); })));
        };
        AjfFormField.decorators = [
            { type: core.Component, args: [{selector: 'ajf-form-field',
                        template: "<ng-container *ngIf=\"control|async as curControl\"><div [ngSwitch]=\"fieldInstance.field.fieldType\" [ngClass]=\"'ajf-field-' + fieldInstance.completeName\" [class.ajf-validated]=\"fieldInstance|ajfFieldIsValid\"><mat-form-field *ngSwitchCase=\"ajfFieldTypes.String\"><input matInput type=\"text\" [formControl]=\"curControl\"></mat-form-field><mat-form-field *ngSwitchCase=\"ajfFieldTypes.Text\"><input matInput type=\"text\" [formControl]=\"curControl\"></mat-form-field><mat-form-field *ngSwitchCase=\"ajfFieldTypes.Number\"><input matInput type=\"number\" [formControl]=\"curControl\"></mat-form-field><mat-slide-toggle *ngSwitchCase=\"ajfFieldTypes.Boolean\" [formControl]=\"curControl\"></mat-slide-toggle><ng-container *ngSwitchCase=\"ajfFieldTypes.SingleChoice\"><ng-container *ngIf=\"(!fwcInst.field.forceExpanded && fwcInst.filteredChoices && fwcInst.filteredChoices.length > 6) || fwcInst.field.forceNarrow\"><mat-select [formControl]=\"curControl\"><mat-option [value]=\"choice.value\" *ngFor=\"let choice of fwcInst.filteredChoices\">{{ choice.label | translate }}</mat-option></mat-select></ng-container><ng-container *ngIf=\"!fwcInst.field.forceNarrow && (fwcInst.field.forceExpanded || (fwcInst.filteredChoices && fwcInst.filteredChoices.length <= 6))\"><mat-radio-group class=\"ajf-choices-container\" [formControl]=\"curControl\"><mat-radio-button [value]=\"choice.value\" *ngFor=\"let choice of fwcInst.filteredChoices\">{{ choice.label | translate }}</mat-radio-button></mat-radio-group></ng-container></ng-container><ng-container *ngSwitchCase=\"ajfFieldTypes.MultipleChoice\"><ng-container *ngIf=\"(!fwcInst.field.forceExpanded && fwcInst.filteredChoices && fwcInst.filteredChoices.length > 6) || fwcInst.field.forceNarrow\"><mat-select [formControl]=\"curControl\" [multiple]=\"true\"><mat-option [value]=\"choice.value\" *ngFor=\"let choice of fwcInst.filteredChoices\">{{ choice.label | translate }}</mat-option></mat-select></ng-container><ng-container *ngIf=\"!fwcInst.field.forceNarrow && (fwcInst.field.forceExpanded || (fwcInst.filteredChoices && fwcInst.filteredChoices.length <= 6))\"><ajf-checkbox-group class=\"ajf-choices-container\" [formControl]=\"curControl\"><ajf-checkbox-group-item *ngFor=\"let choice of fwcInst.filteredChoices\" [value]=\"choice.value\">{{ choice.label | translate }}</ajf-checkbox-group-item></ajf-checkbox-group></ng-container></ng-container><mat-form-field *ngSwitchCase=\"ajfFieldTypes.Formula\"><input matInput type=\"text\" [formControl]=\"curControl\" readonly=\"readonly\"></mat-form-field><ajf-calendar *ngSwitchCase=\"ajfFieldTypes.Date\" selectionMode=\"date\" dateOnlyForDay [minDate]=\"datefInst.field.minDateValue\" [maxDate]=\"datefInst.field.maxDateValue\" [formControl]=\"curControl\"></ajf-calendar><ajf-time *ngSwitchCase=\"ajfFieldTypes.Time\" [formControl]=\"curControl\"></ajf-time><mat-form-field *ngSwitchCase=\"ajfFieldTypes.DateInput\"><input matInput type=\"date\" [formControl]=\"curControl\"></mat-form-field><table *ngSwitchCase=\"ajfFieldTypes.Table\" style=\"width:100%\"><ng-template [ngIf]=\"!tablefInst.field.editable\"><ng-template ngFor let-columns let-i=\"index\" [ngForOf]=\"tablefInst.visibleColumns\"><tr [ngClass]=\"i | tableRowClass\"><td *ngFor=\"let cellValue of columns\">{{ cellValue | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</td></tr></ng-template></ng-template><ng-template [ngIf]=\"fieldInstance.field.editable\"><ng-template ngFor let-columns let-indexRows=\"index\" [ngForOf]=\"tablefInst.controlsWithLabels\"><tr [ngClass]=\"indexRows | tableRowClass\"><td *ngFor=\"let contr of columns; let indexColums = index\"><ng-container *ngIf=\"contr != null\"><ng-template [ngIf]=\"indexColums != 0 && indexRows != 0\"><input (focusout)=\"contr.show = false\" *ngIf=\"contr.show\" type=\"number\" [formControl]=\"contr\" autoFocus> <span *ngIf=\"!contr.show\" class=\"ajf-table-cell\" (click)=\"contr.show ? contr.show = false : contr.show = true;\">{{ contr.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span></ng-template><ng-template [ngIf]=\"indexColums == 0 || indexRows == 0\">{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template></ng-container></td></tr></ng-template></ng-template></table><ng-container *ngSwitchCase=\"ajfFieldTypes.Empty\"><h1 [innerHTML]=\"emptyfInst.field.label | translate\"></h1><div [innerHTML]=\"emptyfInst.field.HTML | translate\"></div></ng-container></div><ng-container *ngIf=\"fieldInstance.field.hasAttachments\"><a *ngFor=\"let attachment of fieldInstance.field.attachments\" [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a></ng-container><div *ngIf=\"fieldInstance.validationResults\" class=\"ajf-errors\"><ng-template ngFor let-res [ngForOf]=\"fieldInstance.validationResults\"><div class=\"error\" *ngIf=\"!res.result\">{{ res.error }}</div></ng-template></div></ng-container>",
                        styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:grey}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td input,table tr td span{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:0;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child input,table tr td:last-child span{border-right-color:#ccc}table tr:last-of-type td input,table tr:last-of-type td span{border-bottom-color:#ccc}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"],
                        encapsulation: core.ViewEncapsulation.None,
                        inputs: [
                            'fieldInstance'
                        ],
                        outputs: [
                            'valueChanged'
                        ],
                        queries: {
                            singleChoiceSelect: new core.ViewChild('singleChoiceSelect', { static: false }),
                            multipleChoiceSelect: new core.ViewChild('multipleChoiceSelect', { static: false })
                        },
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        AjfFormField.ctorParameters = function () { return [
            { type: forms.AjfFormRendererService },
            { type: core.ChangeDetectorRef },
            { type: dialog.MatDialog }
        ]; };
        return AjfFormField;
    }(forms.AjfFormField));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Component, args: [{selector: 'ajf-form',
                        template: "<ng-template [ngIf]=\"formGroup|async\"><form novalidate [formGroup]=\"formGroup | async\"><div class=\"ajf-form-container\"><mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\"><ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\"><button mat-button class=\"ajf-topbar-button\" *ngIf=\"topBar && slideInstance.slide && slideInstance.slide.label != null && slideInstance.slide.label.length > 0\" (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.slide.label | translate}}</button></ng-template></mat-toolbar><mat-toolbar *ngIf=\"!hideTopToolbar\">{{ title }} <span class=\"ajf-spacer\"></span> <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\" translate>Save</button></mat-toolbar><div class=\"ajf-slider-container\"><ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\" [fixedOrientation]=\"fixedOrientation\" [hideNavigationButtons]=\"hideNavigationButtons\" [orientation]=\"orientation\" #formSlider><ng-container *ngIf=\"(slides|async) as curSlides\"><ng-container *ngIf=\"formIsInit|async\"><ng-template [ngIf]=\"curSlides.length > 0 && hasStartMessage\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">1 &rarr; </span><span class=\"ajf-title\"><ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content></span></h2></div></mat-card-header><mat-card-content><ng-content select=\"[ajfFormStartMessage]\"></ng-content></mat-card-content></mat-card></div></ajf-page-slider-item></ng-template><ng-template ngFor let-slideInstance [ngForOf]=\"curSlides\" [ngForTrackBy]=\"trackNodeById\"><ng-template [ngIf]=\"(!isRepeatingSlide(slideInstance)) && slideInstance.visible\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">{{ slideInstance.position + hasStartMessage }} &rarr;</span> <span [innerHTML]=\"slideInstance.slide.label | translate\"></span></h2><mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon><mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon></div></mat-card-header><mat-card-content><ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\"><div [ngClass]=\"'ajf-' + fieldInstance.field.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\"><i [class]=\"fieldInstance.field | fieldIcon\" item-right></i><p>{{ fieldInstance.field.description | translate }}</p><label *ngIf=\"fieldInstance.field.fieldType !== 7\" [innerHTML]=\"fieldInstance.field.label | translate\"></label><ajf-form-field [fieldInstance]=\"fieldInstance\"></ajf-form-field></div></ng-template></mat-card-content></mat-card></div></ajf-page-slider-item></ng-template><ng-template [ngIf]=\"isRepeatingSlide(slideInstance) && slideInstance.visible\"><ajf-page-slider-item *ngFor=\"let curRep of slideInstance.repsArr; let idx = index; let lastSlide = last\"><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">{{ slideInstance.slidePosition(idx) }} &rarr;</span> <span [innerHTML]=\"slideInstance.slide.label | translate\"></span></h2><mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.validSlide(idx)\">warning</mat-icon><mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.validSlide(idx)\">check</mat-icon></div></mat-card-header><mat-card-content><div *ngIf=\"lastSlide\" class=\"ajf-group-actions\"><button (click)=\"addGroup(slideInstance)\" [disabled]=\"!slideInstance.canAddGroup\" mat-mini-fab><mat-icon>add</mat-icon></button> <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!slideInstance.canRemoveGroup\" mat-mini-fab><mat-icon>remove</mat-icon></button></div><ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\"><div [ngClass]=\"'ajf-' + fieldInstance.field.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\"><i [class]=\"fieldInstance.field | fieldIcon\" item-right></i><p>{{ fieldInstance.field.description | translate }}</p><label [innerHTML]=\"fieldInstance.field.label | translate\"></label><ajf-form-field [fieldInstance]=\"fieldInstance\"></ajf-form-field></div></ng-template></mat-card-content></mat-card></div></ajf-page-slider-item></ng-template></ng-template><ng-template [ngIf]=\"curSlides.length > 0 && hasEndMessage\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">{{ snum + (hasStartMessage | boolToInt ) + 1 }} &rarr; </span><span class=\"ajf-title\"><ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content></span></h2></div></mat-card-header><mat-card-content><ng-content select=\"[ajfFormEndMessage]\"></ng-content></mat-card-content></mat-card></div></ajf-page-slider-item></ng-template></ng-container></ng-container><div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\"><div class=\"ajf-left-bar\"><div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\"><button mat-button (click)=\"goToPrevError()\" danger><mat-icon>arrow_upward</mat-icon></button> <button mat-button (click)=\"goToNextError()\" danger><mat-icon>arrow_downward</mat-icon></button></div><div class=\"ajf-info-box ajf-error\"><div class=\"ajf-title\" translate>Errors</div><div class=\"ajf-content\">{{ errors | async }} / {{ slidesNum|async }}</div></div></div></div></ajf-page-slider></div></div></form></ng-template>",
                        styles: ["ajf-form{display:block}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;top:0;right:0;bottom:0;left:0}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip{overflow:auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button{flex:1 1 auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button *{display:block;width:100%;overflow:hidden;text-overflow:ellipsis}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-topbar-button{margin-right:10px}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{flex:1 0 auto;padding-left:10px;padding-right:10px;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:700}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
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
                            formSlider: new core.ViewChild('formSlider', { static: false }),
                            fields: new core.ViewChildren(AjfFormField)
                        }
                    },] },
        ];
        /** @nocollapse */
        AjfFormRenderer.ctorParameters = function () { return [
            { type: forms.AjfFormRendererService },
            { type: core.ChangeDetectorRef }
        ]; };
        AjfFormRenderer.propDecorators = {
            topBar: [{ type: core.Input }]
        };
        return AjfFormRenderer;
    }(forms.AjfFormRenderer));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormsModule = /** @class */ (function () {
        function AjfFormsModule() {
        }
        AjfFormsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms$1.ReactiveFormsModule,
                            button.MatButtonModule,
                            card.MatCardModule,
                            dialog.MatDialogModule,
                            formField.MatFormFieldModule,
                            icon.MatIconModule,
                            input.MatInputModule,
                            radio.MatRadioModule,
                            select.MatSelectModule,
                            slideToggle.MatSlideToggleModule,
                            toolbar.MatToolbarModule,
                            core$1.TranslateModule,
                            forms.AjfFormsModule,
                            calendar.AjfCalendarModule,
                            checkboxGroup.AjfCheckboxGroupModule,
                            pageSlider.AjfPageSliderModule,
                            time.AjfTimeModule,
                            common$1.AjfCommonModule
                        ],
                        declarations: [
                            AjfFormField,
                            AjfFormFieldWarningDialog,
                            AjfFormRenderer
                        ],
                        exports: [
                            AjfFormField,
                            AjfFormRenderer
                        ],
                        entryComponents: [
                            AjfFormFieldWarningDialog
                        ]
                    },] },
        ];
        return AjfFormsModule;
    }());

    exports.AjfFormField = AjfFormField;
    exports.AjfFormFieldWarningDialog = AjfFormFieldWarningDialog;
    exports.AjfFormRenderer = AjfFormRenderer;
    exports.AjfFormsModule = AjfFormsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-forms.umd.js.map
