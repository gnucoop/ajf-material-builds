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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/forms'), require('@angular/core'), require('@angular/material/dialog'), require('rxjs/operators'), require('@angular/material/input'), require('@angular/common'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/slide-toggle'), require('@angular/material/toolbar'), require('@ngx-translate/core'), require('@ajf/core/common'), require('@ajf/core/time'), require('@ajf/material/barcode'), require('@ajf/material/calendar'), require('@ajf/material/checkbox-group'), require('@ajf/material/page-slider')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/forms', ['exports', '@ajf/core/forms', '@angular/core', '@angular/material/dialog', 'rxjs/operators', '@angular/material/input', '@angular/common', '@angular/forms', '@angular/material/button', '@angular/material/card', '@angular/material/form-field', '@angular/material/icon', '@angular/material/radio', '@angular/material/select', '@angular/material/slide-toggle', '@angular/material/toolbar', '@ngx-translate/core', '@ajf/core/common', '@ajf/core/time', '@ajf/material/barcode', '@ajf/material/calendar', '@ajf/material/checkbox-group', '@ajf/material/page-slider'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.forms = {}), global.ajf.core.forms, global.ng.core, global.ng.material.dialog, global.rxjs.operators, global.ng.material.input, global.ng.common, global.ng.forms, global.ng.material.button, global.ng.material.card, global.ng.material.formField, global.ng.material.icon, global.ng.material.radio, global.ng.material.select, global.ng.material.slideToggle, global.ng.material.toolbar, global.ngxt.core, global.ajf.core.common, global.ajf.core.time, global.ajf.material.barcode, global.ajf.material.calendar, global.ajf.material.checkboxGroup, global.ajf.material.pageSlider));
}(this, function (exports, forms, core, dialog, operators, input, common, forms$1, button, card, formField, icon, radio, select, slideToggle, toolbar, core$1, common$1, time, barcode, calendar, checkboxGroup, pageSlider) { 'use strict';

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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFieldWarningDialog = /** @class */ (function () {
        function AjfFieldWarningDialog() {
        }
        AjfFieldWarningDialog.decorators = [
            { type: core.Component, args: [{template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content><mat-dialog-actions><button mat-button [mat-dialog-close]=\"true\">Ok</button> <button mat-button [mat-dialog-close]=\"false\">Cancel</button></mat-dialog-actions>",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
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
            return dialog.afterClosed().pipe(operators.map((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return ({ result: result }); })));
        };
        AjfWarningAlertService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AjfWarningAlertService.ctorParameters = function () { return [
            { type: dialog.MatDialog }
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
            { type: core.Component, args: [{template: "<mat-slide-toggle [formControl]=\"control|async\"></mat-slide-toggle>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfBooleanFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfBooleanFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
            { type: core.Component, args: [{template: "<ajf-calendar selectionMode=\"date\" dateOnlyForDay [minDate]=\"instance.node.minDate|ajfDateValue\" [maxDate]=\"instance.node.maxDate|ajfDateValue\" [formControl]=\"control|async\"></ajf-calendar>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfDateFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfDateFieldComponent;
    }(forms.AjfBaseFieldComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfDateInputFieldComponent = /** @class */ (function (_super) {
        __extends(AjfDateInputFieldComponent, _super);
        function AjfDateInputFieldComponent(cdr, service, was, _dvs) {
            var _this = _super.call(this, cdr, service, was) || this;
            _this._dvs = _dvs;
            return _this;
        }
        /**
         * @return {?}
         */
        AjfDateInputFieldComponent.prototype.onChange = /**
         * @return {?}
         */
        function () {
            if (this.input == null) {
                return;
            }
            /** @type {?} */
            var val = this.input.value || '';
            if (val.length > 0) {
                if ((this._minDateStr != null && val < this._minDateStr)
                    || (this._maxDateStr != null && val > this._maxDateStr)) {
                    this.input.value = '';
                }
            }
        };
        /**
         * @protected
         * @return {?}
         */
        AjfDateInputFieldComponent.prototype._onInstanceChange = /**
         * @protected
         * @return {?}
         */
        function () {
            this._minDateStr = this._dvs.transform(this.instance.node.minDate);
            this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
        };
        AjfDateInputFieldComponent.decorators = [
            { type: core.Component, args: [{template: "<mat-form-field><input matInput type=\"date\" [attr.aria-label]=\"instance.node.label || (instance|ajfNodeCompleteName)\" [min]=\"instance.node.minDate|ajfDateValueString\" [max]=\"instance.node.maxDate|ajfDateValueString\" (change)=\"onChange()\" [formControl]=\"control|async\"></mat-form-field>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfDateInputFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService },
            { type: forms.AjfDateValueStringPipe }
        ]; };
        AjfDateInputFieldComponent.propDecorators = {
            input: [{ type: core.ViewChild, args: [input.MatInput, { static: false },] }]
        };
        return AjfDateInputFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
            { type: core.Component, args: [{template: "<h1 [innerHTML]=\"instance.node.label | translate\"></h1><div [innerHTML]=\"instance.node.HTML | translate\"></div>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfEmptyFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfEmptyFieldComponent;
    }(forms.AjfBaseFieldComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfBarcodeFieldComponent = /** @class */ (function (_super) {
        __extends(AjfBarcodeFieldComponent, _super);
        function AjfBarcodeFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfBarcodeFieldComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-barcode [formControl]=\"control|async\"></ajf-barcode>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfBarcodeFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfBarcodeFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
            { type: core.Component, args: [{template: "<mat-form-field><input matInput [type]=\"type\" [readonly]=\"readonly\" [formControl]=\"control|async\"></mat-form-field>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfInputFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfInputFieldComponent;
    }(forms.AjfInputFieldComponent));

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
            { type: core.Component, args: [{template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\"><mat-select [formControl]=\"control|async\" [multiple]=\"true\"><mat-option [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">{{ choice.label | translate }}</mat-option></mat-select></ng-container><ng-template #expanded><ajf-checkbox-group class=\"ajf-choices-container\" [formControl]=\"control|async\"><ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\" [value]=\"choice.value\">{{ choice.label | translate }}</ajf-checkbox-group-item></ajf-checkbox-group></ng-template>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfMultipleChoiceFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService },
            { type: Number, decorators: [{ type: core.Optional }, { type: core.Inject, args: [forms.AJF_SEARCH_ALERT_THRESHOLD,] }] }
        ]; };
        return AjfMultipleChoiceFieldComponent;
    }(forms.AjfFieldWithChoicesComponent));

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
            { type: core.Component, args: [{template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\"><mat-select [formControl]=\"control|async\"><mat-option [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">{{ choice.label | translate }}</mat-option></mat-select></ng-container><ng-template #expanded><mat-radio-group class=\"ajf-choices-container\" [formControl]=\"control|async\"><mat-radio-button [value]=\"choice.value\" *ngFor=\"let choice of instance.filteredChoices\">{{ choice.label | translate }}</mat-radio-button></mat-radio-group></ng-template>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfSingleChoiceFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService },
            { type: Number, decorators: [{ type: core.Optional }, { type: core.Inject, args: [forms.AJF_SEARCH_ALERT_THRESHOLD,] }] }
        ]; };
        return AjfSingleChoiceFieldComponent;
    }(forms.AjfFieldWithChoicesComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTableFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTableFieldComponent, _super);
        function AjfTableFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        /**
         * @param {?} ev
         * @param {?} row
         * @param {?} column
         * @return {?}
         */
        AjfTableFieldComponent.prototype.goToNextCell = /**
         * @param {?} ev
         * @param {?} row
         * @param {?} column
         * @return {?}
         */
        function (ev, row, column) {
            /** @type {?} */
            var rowLength = this.instance.controls[row][1].length;
            /** @type {?} */
            var currentCell = (/** @type {?} */ (this.instance.controls[row][1][column]));
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
        };
        /**
         * @param {?} row
         * @param {?} column
         * @return {?}
         */
        AjfTableFieldComponent.prototype.goToCell = /**
         * @param {?} row
         * @param {?} column
         * @return {?}
         */
        function (row, column) {
            this._resetControls();
            this._showCell(row, column);
        };
        /**
         * @private
         * @return {?}
         */
        AjfTableFieldComponent.prototype._resetControls = /**
         * @private
         * @return {?}
         */
        function () {
            this.instance.controls.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row[1].forEach((/**
             * @param {?} cell
             * @return {?}
             */
            function (cell) {
                if (typeof cell !== 'string') {
                    ((/** @type {?} */ (cell))).show = false;
                }
            })); }));
        };
        /**
         * @private
         * @param {?} row
         * @param {?} column
         * @return {?}
         */
        AjfTableFieldComponent.prototype._showCell = /**
         * @private
         * @param {?} row
         * @param {?} column
         * @return {?}
         */
        function (row, column) {
            if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
                return;
            }
            /** @type {?} */
            var nextCell = (/** @type {?} */ (this.instance.controls[row][1][column]));
            if (typeof nextCell !== 'string') {
                nextCell.show = true;
            }
        };
        AjfTableFieldComponent.decorators = [
            { type: core.Component, args: [{template: "<table class=\"ajf-table-field\"><ng-container *ngIf=\"!instance.node.editable else editableTmpl\"><ng-container *ngFor=\"let columns of (instance|ajfTableVisibleColumns); let i = index\"><tr [ngClass]=\"i | ajfTableRowClass\"><td *ngFor=\"let cellValue of columns\">{{ cellValue | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</td></tr></ng-container></ng-container><ng-template #editableTmpl><ng-container *ngFor=\"let columns of instance.controls; let row = index\"><tr [ngClass]=\"row | ajfTableRowClass\"><td><ng-container *ngIf=\"columns[0] != null\">{{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-container></td><td *ngFor=\"let contr of columns[1]; let column = index\"><ng-container *ngIf=\"contr != null\"><input *ngIf=\"row > 0 && contr.show; else plainTextCell\" (focusout)=\"contr.show = false\" type=\"number\" [formControl]=\"contr\" (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus><ng-template #plainTextCell><span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\" (click)=\"goToCell(row, column)\">{{ contr.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span><ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template></ng-template></ng-container></td></tr></ng-container></ng-template></table>",
                        styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative}table.ajf-table-field tr td input,table.ajf-table-field tr td span{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:0;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child input,table.ajf-table-field tr td:last-child span{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td input,table.ajf-table-field tr:last-of-type td span{border-bottom-color:#ccc}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfTableFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfTableFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
            { type: core.Component, args: [{template: "<ajf-time [formControl]=\"control|async\"></ajf-time>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfTimeFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfTimeFieldComponent;
    }(forms.AjfBaseFieldComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFieldService = /** @class */ (function (_super) {
        __extends(AjfFieldService, _super);
        function AjfFieldService() {
            var _this = _super.call(this) || this;
            _this.componentsMap[forms.AjfFieldType.String] = { component: AjfInputFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Text] = { component: AjfInputFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Number] = {
                    component: AjfInputFieldComponent, inputs: { type: 'number' }
                },
                _this.componentsMap[forms.AjfFieldType.Boolean] = { component: AjfBooleanFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Formula] = {
                    component: AjfInputFieldComponent, inputs: { readonly: true }
                },
                _this.componentsMap[forms.AjfFieldType.Date] = { component: AjfDateFieldComponent },
                _this.componentsMap[forms.AjfFieldType.DateInput] = { component: AjfDateInputFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Table] = { component: AjfTableFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
                _this.componentsMap[forms.AjfFieldType.SingleChoice] = { component: AjfSingleChoiceFieldComponent },
                _this.componentsMap[forms.AjfFieldType.MultipleChoice] = { component: AjfMultipleChoiceFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Time] = { component: AjfTimeFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Barcode] = { component: AjfBarcodeFieldComponent };
            return _this;
        }
        AjfFieldService.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] },
        ];
        /** @nocollapse */
        AjfFieldService.ctorParameters = function () { return []; };
        /** @nocollapse */ AjfFieldService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
        return AjfFieldService;
    }(forms.AjfFieldService));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormField = /** @class */ (function (_super) {
        __extends(AjfFormField, _super);
        function AjfFormField(cfr, fieldService) {
            var _this = _super.call(this, cfr) || this;
            _this.componentsMap = fieldService.componentsMap;
            return _this;
        }
        AjfFormField.decorators = [
            { type: core.Component, args: [{selector: 'ajf-field,ajf-form-field',
                        template: "<div [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\" [class.ajf-validated]=\"instance|ajfFieldIsValid\"><ng-template ajf-field-host></ng-template></div><ng-container *ngIf=\"instance && instance.node && instance.node.attachments\"><a *ngFor=\"let attachment of instance.node.attachments\" [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a></ng-container><div *ngIf=\"instance && instance.validationResults\" class=\"ajf-errors\"><ng-container *ngFor=\"let res of instance.validationResults\"><div class=\"error\" *ngIf=\"!res.result\">{{ res.error }}</div></ng-container></div>",
                        styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:grey}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td input,table tr td span{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:0;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child input,table tr td:last-child span{border-right-color:#ccc}table tr:last-of-type td input,table tr:last-of-type td span{border-bottom-color:#ccc}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        inputs: ['instance'],
                        queries: {
                            fieldHost: new core.ViewChild(forms.AjfFieldHost, { static: true }),
                        }
                    },] },
        ];
        /** @nocollapse */
        AjfFormField.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: AjfFieldService }
        ]; };
        return AjfFormField;
    }(forms.AjfFormField));

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
            { type: core.Component, args: [{selector: 'ajf-form',
                        template: "<ng-container *ngIf=\"formGroup|async as fg\"><form novalidate [formGroup]=\"fg\"><div class=\"ajf-form-container\"><mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\"><ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\"><button mat-button class=\"ajf-topbar-button\" *ngIf=\"topBar && slideInstance.node && slideInstance.node.label != null && slideInstance.node.label.length > 0\" (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.node.label | translate}}</button></ng-template></mat-toolbar><mat-toolbar *ngIf=\"!hideTopToolbar\">{{ title }} <span class=\"ajf-spacer\"></span> <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\" translate>Save</button></mat-toolbar><div class=\"ajf-slider-container\"><ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\" [fixedOrientation]=\"fixedOrientation\" [hideNavigationButtons]=\"hideNavigationButtons\" [orientation]=\"orientation\" #formSlider><ng-container *ngIf=\"(slides|async) as curSlides\"><ng-container *ngIf=\"curSlides.length > 0 && hasStartMessage\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">1 &rarr; </span><span class=\"ajf-title\"><ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content></span></h2></div></mat-card-header><mat-card-content><ng-content select=\"[ajfFormStartMessage]\"></ng-content></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container><ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\"><ng-container *ngIf=\"slideInstance.visible\"><ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">{{ slideInstance.position + hasStartMessage }} &rarr;</span> <span [innerHTML]=\"slideInstance.node.label | translate\"></span></h2><mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon><mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon></div></mat-card-header><mat-card-content><ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\"><div [ngClass]=\"'ajf-' + fieldInstance.node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\"><i [class]=\"fieldInstance.node.fieldType | ajfFieldIcon\" item-right></i><p>{{ fieldInstance.node.description | translate }}</p><label *ngIf=\"fieldInstance.node.fieldType !== 7\" [innerHTML]=\"fieldInstance.node.label | translate\"></label><ajf-field [instance]=\"fieldInstance\"></ajf-field></div></ng-template></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container><ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\"><ajf-page-slider-item *ngFor=\"let curRep of (slideInstance.reps|ajfRange); let idx = index; let lastSlide = last\"><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span class=\"ajf-form-header-number\">{{ slideInstance.position|ajfIncrement:idx + hasStartMessage }} &rarr;</span> <span [innerHTML]=\"slideInstance.node.label | translate\"></span></h2><mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\">warning</mat-icon><mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\">check</mat-icon></div></mat-card-header><mat-card-content><div *ngIf=\"lastSlide\" class=\"ajf-group-actions\"><button (click)=\"addGroup(slideInstance)\" [disabled]=\"!slideInstance.canAdd\" mat-mini-fab><mat-icon>add</mat-icon></button> <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!slideInstance.canRemove\" mat-mini-fab><mat-icon>remove</mat-icon></button></div><ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\"><div [ngClass]=\"'ajf-' + fieldInstance.node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\"><i [class]=\"fieldInstance.node.fieldType | ajfFieldIcon\" item-right></i><p>{{ fieldInstance.node.description | translate }}</p><label [innerHTML]=\"fieldInstance.node.label | translate\"></label><ajf-field [instance]=\"fieldInstance\"></ajf-field></div></ng-template></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container></ng-container></ng-container><ng-container *ngIf=\"curSlides.length > 0 && hasEndMessage\"><ajf-page-slider-item><div class=\"ajf-form-page\"><mat-card><mat-card-header><div class=\"ajf-page-slider-item-header\"><h2><span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">{{ snum + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr; </span><span class=\"ajf-title\"><ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content></span></h2></div></mat-card-header><mat-card-content><ng-content select=\"[ajfFormEndMessage]\"></ng-content></mat-card-content></mat-card></div></ajf-page-slider-item></ng-container></ng-container><div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\"><div class=\"ajf-left-bar\"><div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\"><button mat-button (click)=\"goToPrevError()\" danger><mat-icon>arrow_upward</mat-icon></button> <button mat-button (click)=\"goToNextError()\" danger><mat-icon>arrow_downward</mat-icon></button></div><div class=\"ajf-info-box ajf-error\"><div class=\"ajf-title\" translate>Errors</div><div class=\"ajf-content\">{{ errors | async }} / {{ slidesNum|async }}</div></div></div></div></ajf-page-slider></div></div></form></ng-container>",
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormsModule = /** @class */ (function () {
        function AjfFormsModule() {
        }
        /**
         * @return {?}
         */
        AjfFormsModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: AjfFormsModule,
                providers: [
                    AjfFieldService,
                ],
            };
        };
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
                            barcode.AjfBarcodeModule,
                            checkboxGroup.AjfCheckboxGroupModule,
                            common$1.AjfCommonModule,
                            pageSlider.AjfPageSliderModule,
                            time.AjfTimeModule
                        ],
                        declarations: [
                            AjfBarcodeFieldComponent,
                            AjfBooleanFieldComponent,
                            AjfDateFieldComponent,
                            AjfDateInputFieldComponent,
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
                            AjfBarcodeFieldComponent,
                            AjfBooleanFieldComponent,
                            AjfDateFieldComponent,
                            AjfDateInputFieldComponent,
                            AjfEmptyFieldComponent,
                            AjfFieldWarningDialog,
                            AjfInputFieldComponent,
                            AjfMultipleChoiceFieldComponent,
                            AjfSingleChoiceFieldComponent,
                            AjfTableFieldComponent,
                            AjfTimeFieldComponent
                        ],
                        providers: [
                            AjfFieldService,
                            AjfWarningAlertService,
                        ],
                    },] },
        ];
        return AjfFormsModule;
    }());

    exports.AjfBooleanFieldComponent = AjfBooleanFieldComponent;
    exports.AjfDateFieldComponent = AjfDateFieldComponent;
    exports.AjfDateInputFieldComponent = AjfDateInputFieldComponent;
    exports.AjfEmptyFieldComponent = AjfEmptyFieldComponent;
    exports.AjfFieldService = AjfFieldService;
    exports.AjfFieldWarningDialog = AjfFieldWarningDialog;
    exports.AjfFormField = AjfFormField;
    exports.AjfFormRenderer = AjfFormRenderer;
    exports.AjfFormsModule = AjfFormsModule;
    exports.AjfInputFieldComponent = AjfInputFieldComponent;
    exports.AjfMultipleChoiceFieldComponent = AjfMultipleChoiceFieldComponent;
    exports.AjfSingleChoiceFieldComponent = AjfSingleChoiceFieldComponent;
    exports.AjfTableFieldComponent = AjfTableFieldComponent;
    exports.AjfTimeFieldComponent = AjfTimeFieldComponent;
    exports.AjfWarningAlertService = AjfWarningAlertService;
    exports.ɵa = AjfBarcodeFieldComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-forms.umd.js.map
