(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/forms'), require('@angular/core'), require('@angular/material/dialog'), require('rxjs/operators'), require('@angular/material/input'), require('@angular/common/http'), require('@angular/platform-browser'), require('@ajf/core/common'), require('@ajf/material/barcode'), require('@ajf/material/calendar'), require('@ajf/material/checkbox-group'), require('@ajf/material/page-slider'), require('@ajf/material/time'), require('@angular/cdk/text-field'), require('@angular/common'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/slide-toggle'), require('@angular/material/toolbar'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/forms', ['exports', '@ajf/core/forms', '@angular/core', '@angular/material/dialog', 'rxjs/operators', '@angular/material/input', '@angular/common/http', '@angular/platform-browser', '@ajf/core/common', '@ajf/material/barcode', '@ajf/material/calendar', '@ajf/material/checkbox-group', '@ajf/material/page-slider', '@ajf/material/time', '@angular/cdk/text-field', '@angular/common', '@angular/forms', '@angular/material/button', '@angular/material/card', '@angular/material/form-field', '@angular/material/icon', '@angular/material/radio', '@angular/material/select', '@angular/material/slide-toggle', '@angular/material/toolbar', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.forms = {}), global.ng.core.forms, global.ng.core, global.ng.material.dialog, global.rxjs.operators, global.ng.material.input, global.ng.common.http, global.ng.platformBrowser, global.ng.core.common, global.ng.material.barcode, global.ng.material.calendar, global.ng.material.checkboxGroup, global.ng.material.pageSlider, global.ng.material.time, global.ng.cdk.textField, global.ng.common, global.ng.forms, global.ng.material.button, global.ng.material.card, global.ng.material.formField, global.ng.material.icon, global.ng.material.radio, global.ng.material.select, global.ng.material.slideToggle, global.ng.material.toolbar, global.ngxTranslate.core));
}(this, (function (exports, forms, i0, dialog, operators, input, http, platformBrowser, common, barcode, calendar, checkboxGroup, pageSlider, time, textField, common$1, forms$1, button, card, formField, icon, radio, select, slideToggle, toolbar, core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
    var AjfFieldWarningDialog = /** @class */ (function () {
        function AjfFieldWarningDialog() {
        }
        return AjfFieldWarningDialog;
    }());
    AjfFieldWarningDialog.decorators = [
        { type: i0.Component, args: [{
                    template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None
                },] }
    ];

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
    var AjfWarningAlertService = /** @class */ (function () {
        function AjfWarningAlertService(_dialog) {
            this._dialog = _dialog;
        }
        AjfWarningAlertService.prototype.showWarningAlertPrompt = function (warnings) {
            var dialog = this._dialog.open(AjfFieldWarningDialog);
            dialog.componentInstance.message = warnings.join('<br>');
            return dialog.afterClosed().pipe(operators.map(function (result) { return ({ result: result }); }));
        };
        return AjfWarningAlertService;
    }());
    AjfWarningAlertService.decorators = [
        { type: i0.Injectable }
    ];
    AjfWarningAlertService.ctorParameters = function () { return [
        { type: dialog.MatDialog }
    ]; };

    var AjfBooleanFieldComponent = /** @class */ (function (_super) {
        __extends(AjfBooleanFieldComponent, _super);
        function AjfBooleanFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfBooleanFieldComponent;
    }(forms.AjfBaseFieldComponent));
    AjfBooleanFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<mat-slide-toggle *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></mat-slide-toggle>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfBooleanFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfDateFieldComponent = /** @class */ (function (_super) {
        __extends(AjfDateFieldComponent, _super);
        function AjfDateFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfDateFieldComponent;
    }(forms.AjfBaseFieldComponent));
    AjfDateFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfDateFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfDateInputFieldComponent = /** @class */ (function (_super) {
        __extends(AjfDateInputFieldComponent, _super);
        function AjfDateInputFieldComponent(cdr, service, was, _dvs) {
            var _this = _super.call(this, cdr, service, was) || this;
            _this._dvs = _dvs;
            return _this;
        }
        AjfDateInputFieldComponent.prototype.onChange = function () {
            if (this.input == null) {
                return;
            }
            var val = this.input.value || '';
            if (val.length > 0) {
                if ((this._minDateStr != null && val < this._minDateStr) ||
                    (this._maxDateStr != null && val > this._maxDateStr)) {
                    this.input.value = '';
                }
            }
        };
        AjfDateInputFieldComponent.prototype._onInstanceChange = function () {
            this._minDateStr = this._dvs.transform(this.instance.node.minDate);
            this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
        };
        return AjfDateInputFieldComponent;
    }(forms.AjfBaseFieldComponent));
    AjfDateInputFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput type=\"date\"\n      [attr.aria-label]=\"instance.node.label || (instance|ajfNodeCompleteName)\"\n      [min]=\"instance.node.minDate|ajfDateValueString\"\n      [max]=\"instance.node.maxDate|ajfDateValueString\"\n      (change)=\"onChange()\"\n      [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfDateInputFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] },
        { type: forms.AjfDateValueStringPipe }
    ]; };
    AjfDateInputFieldComponent.propDecorators = {
        input: [{ type: i0.ViewChild, args: [input.MatInput, { static: false },] }]
    };

    var AjfEmptyFieldComponent = /** @class */ (function (_super) {
        __extends(AjfEmptyFieldComponent, _super);
        function AjfEmptyFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfEmptyFieldComponent;
    }(forms.AjfBaseFieldComponent));
    AjfEmptyFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<h1 [innerHTML]=\"instance.node.label | translate\"></h1>\n<div [innerHTML]=\"instance.node.HTML | translate\"></div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfEmptyFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfBarcodeFieldComponent = /** @class */ (function (_super) {
        __extends(AjfBarcodeFieldComponent, _super);
        function AjfBarcodeFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfBarcodeFieldComponent;
    }(forms.AjfBaseFieldComponent));
    AjfBarcodeFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-barcode>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfBarcodeFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfInputFieldComponent = /** @class */ (function (_super) {
        __extends(AjfInputFieldComponent, _super);
        function AjfInputFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfInputFieldComponent;
    }(forms.AjfInputFieldComponent));
    AjfInputFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput *ngIf=\"type === 'text'\" type=\"text\" [formControl]=\"ctrl!\">\n  <input matInput *ngIf=\"type === 'number'\" type=\"number\" [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfInputFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfMultipleChoiceFieldComponent = /** @class */ (function (_super) {
        __extends(AjfMultipleChoiceFieldComponent, _super);
        function AjfMultipleChoiceFieldComponent(cdr, service, was, searchThreshold) {
            return _super.call(this, cdr, service, was, searchThreshold) || this;
        }
        return AjfMultipleChoiceFieldComponent;
    }(forms.AjfFieldWithChoicesComponent));
    AjfMultipleChoiceFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\"\n        [value]=\"choice.value\">\n      {{ choice.label | translate }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfMultipleChoiceFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] },
        { type: Number, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [forms.AJF_SEARCH_ALERT_THRESHOLD,] }] }
    ]; };

    var AjfSingleChoiceFieldComponent = /** @class */ (function (_super) {
        __extends(AjfSingleChoiceFieldComponent, _super);
        function AjfSingleChoiceFieldComponent(cdr, service, was, searchThreshold) {
            return _super.call(this, cdr, service, was, searchThreshold) || this;
        }
        return AjfSingleChoiceFieldComponent;
    }(forms.AjfFieldWithChoicesComponent));
    AjfSingleChoiceFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfSingleChoiceFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] },
        { type: Number, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [forms.AJF_SEARCH_ALERT_THRESHOLD,] }] }
    ]; };

    var AjfTableFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTableFieldComponent, _super);
        function AjfTableFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfTableFieldComponent;
    }(forms.AjfTableFieldComponent));
    AjfTableFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n              <ng-container *ngIf=\"contr != null\">\n                <input *ngIf=\"row > 0 && contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                  (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr.control\"\n                  (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus>\n                <ng-template #plainTextCell>\n                  <span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\"\n                    (click)=\"goToCell(row, column)\">{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                  <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n                </ng-template>\n              </ng-container>\n            </ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
                },] }
    ];
    AjfTableFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfTextFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTextFieldComponent, _super);
        function AjfTextFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfTextFieldComponent;
    }(forms.AjfInputFieldComponent));
    AjfTextFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <textarea matInput cdkTextareaAutosize [formControl]=\"ctrl!\"></textarea>\n</mat-form-field>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfTextFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfTimeFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTimeFieldComponent, _super);
        function AjfTimeFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        return AjfTimeFieldComponent;
    }(forms.AjfBaseFieldComponent));
    AjfTimeFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-time>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfTimeFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };

    var AjfVideoUrlFieldComponent = /** @class */ (function (_super) {
        __extends(AjfVideoUrlFieldComponent, _super);
        function AjfVideoUrlFieldComponent(cdr, service, was, domSanitizer, httpClient) {
            return _super.call(this, cdr, service, was, domSanitizer, httpClient) || this;
        }
        return AjfVideoUrlFieldComponent;
    }(forms.AjfVideoUrlFieldComponent));
    AjfVideoUrlFieldComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ng-container *ngIf=\"control|async as ctrl\">\n  <mat-form-field class=\"ajf-video-input\">\n    <input matInput type=\"url\" [formControl]=\"ctrl!\">\n  </mat-form-field>\n  <div class=\"ajf-video-thumbnail\">\n    <ng-container *ngIf=\"validUrl|async\">\n      <a target=\"_blank\" [href]=\"ctrl.value\">\n        <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n      </a>\n    </ng-container>\n  </div>\n</ng-container>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".ajf-video-input{width:100%}.ajf-video-thumbnail{width:212px;height:120px;background-color:#eee;display:flex;align-items:center;justify-content:center}.ajf-video-thumbnail img{flex:1 1 auto}\n"]
                },] }
    ];
    AjfVideoUrlFieldComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: forms.AjfFormRendererService },
        { type: AjfWarningAlertService, decorators: [{ type: i0.Inject, args: [forms.AJF_WARNING_ALERT_SERVICE,] }] },
        { type: platformBrowser.DomSanitizer },
        { type: http.HttpClient }
    ]; };

    var AjfFieldService = /** @class */ (function (_super) {
        __extends(AjfFieldService, _super);
        function AjfFieldService() {
            var _this = _super.call(this) || this;
            _this.componentsMap[forms.AjfFieldType.String] = {
                component: AjfInputFieldComponent,
                readOnlyComponent: forms.AjfReadOnlyFieldComponent
            },
                _this.componentsMap[forms.AjfFieldType.Text] = {
                    component: AjfTextFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.Number] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent,
                    inputs: { type: 'number' }
                },
                _this.componentsMap[forms.AjfFieldType.Boolean] = {
                    component: AjfBooleanFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.Formula] = {
                    component: AjfInputFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent,
                    inputs: { readonly: true }
                },
                _this.componentsMap[forms.AjfFieldType.Date] = {
                    component: AjfDateFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.DateInput] = {
                    component: AjfDateInputFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.Table] = {
                    component: AjfTableFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyTableFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.Empty] = { component: AjfEmptyFieldComponent },
                _this.componentsMap[forms.AjfFieldType.SingleChoice] = {
                    component: AjfSingleChoiceFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.MultipleChoice] = {
                    component: AjfMultipleChoiceFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.Time] = {
                    component: AjfTimeFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                },
                _this.componentsMap[forms.AjfFieldType.Barcode] = {
                    component: AjfBarcodeFieldComponent,
                    readOnlyComponent: forms.AjfReadOnlyFieldComponent
                };
            _this.componentsMap[forms.AjfFieldType.File] = {
                component: forms.AjfFileFieldComponent,
                readOnlyComponent: forms.AjfReadOnlyFileFieldComponent
            };
            _this.componentsMap[forms.AjfFieldType.Image] = {
                component: forms.AjfImageFieldComponent,
                readOnlyComponent: forms.AjfReadOnlyImageFieldComponent
            };
            _this.componentsMap[forms.AjfFieldType.VideoUrl] = {
                component: AjfVideoUrlFieldComponent,
                readOnlyComponent: forms.AjfReadOnlyVideoUrlFieldComponent
            };
            return _this;
        }
        return AjfFieldService;
    }(forms.AjfFieldService));
    AjfFieldService.ɵprov = i0["ɵɵdefineInjectable"]({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
    AjfFieldService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AjfFieldService.ctorParameters = function () { return []; };

    var AjfFormField = /** @class */ (function (_super) {
        __extends(AjfFormField, _super);
        function AjfFormField(cdr, cfr, fieldService) {
            var _this = _super.call(this, cdr, cfr) || this;
            _this.componentsMap = fieldService.componentsMap;
            return _this;
        }
        return AjfFormField;
    }(forms.AjfFormField));
    AjfFormField.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ajf-field,ajf-form-field',
                    template: "<div\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a>\n</ng-container>\n<div *ngIf=\"!readonly && instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error }} \n    </div>\n  </ng-container>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"]
                },] }
    ];
    AjfFormField.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ComponentFactoryResolver },
        { type: AjfFieldService }
    ]; };

    var AjfFormRenderer = /** @class */ (function (_super) {
        __extends(AjfFormRenderer, _super);
        function AjfFormRenderer(rendererService, changeDetectorRef) {
            var _this = _super.call(this, rendererService, changeDetectorRef) || this;
            _this.topBar = false;
            return _this;
        }
        AjfFormRenderer.prototype.scrollToSlide = function (slide) {
            this.formSlider.slide({ to: slide.position - 1 });
        };
        return AjfFormRenderer;
    }(forms.AjfFormRenderer));
    AjfFormRenderer.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ajf-form',
                    template: "<ng-container *ngIf=\"formGroup|async as fg\">\n  <form novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\">\n        <ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\">\n          <button mat-button class=\"ajf-topbar-button\"\n          *ngIf=\"topBar != null && slideInstance.node != null && slideInstance.node.label != null && slideInstance.node.label.length > 0\"\n              (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.node.label | translate}}</button>\n        </ng-template>\n      </mat-toolbar>\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\">\n        {{ title }}\n        <span class=\"ajf-spacer\"></span>\n        <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\"\n            translate>Save</button>\n      </mat-toolbar>\n      <div class=\"ajf-slider-container\">\n        <ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\"\n            [fixedOrientation]=\"fixedOrientation\"\n            [hideNavigationButtons]=\"hideNavigationButtons\"\n            [orientation]=\"orientation\"\n            #formSlider>\n          <ng-container *ngIf=\"(slides|async) as curSlides\">\n            <ng-container *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span class=\"ajf-form-header-number\">\n                            1 &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\">\n              <!-- non repeating slides -->\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\" [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n                <!-- repeating slides -->\n                <ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item *ngFor=\"let curRep of ((slideInstance|ajfAsRepeatingSlideInstance).reps|ajfRange); let idx = index; let lastSlide = last\">\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position|ajfIncrement:idx + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <div *ngIf=\"lastSlide && !readonly\" class=\"ajf-group-actions\">\n                            <button (click)=\"addGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canAdd\" mat-mini-fab>\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canRemove\" mat-mini-fab>\n                              <mat-icon>remove</mat-icon>\n                            </button>\n                          </div>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">\n                            {{ snum! + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n          </ng-container>\n          <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\">\n            <div class=\"ajf-left-bar\">\n              <div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\">\n                <button mat-button (click)=\"goToPrevError()\" danger>\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button mat-button (click)=\"goToNextError()\" danger>\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n              </div>\n              <div class=\"ajf-info-box ajf-error\">\n                <div class=\"ajf-title\" translate>Errors</div>\n                <div class=\"ajf-content\">\n                  {{ errors | async }} / {{ slidesNum|async }}\n                </div>\n              </div>\n            </div>\n          </div>\n        </ajf-page-slider>\n      </div>\n    </div>\n  </form>\n</ng-container>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-form{display:block}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;top:0;right:0;bottom:0;left:0}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip{overflow:auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button{flex:1 1 auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button *{display:block;width:100%;overflow:hidden;text-overflow:ellipsis}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-topbar-button{margin-right:10px}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{flex:1 0 auto;padding-left:10px;padding-right:10px;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:bold}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}\n"]
                },] }
    ];
    AjfFormRenderer.ctorParameters = function () { return [
        { type: forms.AjfFormRendererService },
        { type: i0.ChangeDetectorRef }
    ]; };
    AjfFormRenderer.propDecorators = {
        topBar: [{ type: i0.Input }]
    };

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
    var AjfFormsModule = /** @class */ (function () {
        function AjfFormsModule() {
        }
        AjfFormsModule.forRoot = function () {
            return {
                ngModule: AjfFormsModule,
                providers: [
                    AjfFieldService,
                ],
            };
        };
        return AjfFormsModule;
    }());
    AjfFormsModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        barcode.AjfBarcodeModule, calendar.AjfCalendarModule, common.AjfCommonModule, forms.AjfFormsModule,
                        checkboxGroup.AjfCheckboxGroupModule, pageSlider.AjfPageSliderModule, time.AjfTimeModule, common$1.CommonModule,
                        button.MatButtonModule, card.MatCardModule, dialog.MatDialogModule, formField.MatFormFieldModule,
                        icon.MatIconModule, input.MatInputModule, radio.MatRadioModule, select.MatSelectModule,
                        slideToggle.MatSlideToggleModule, toolbar.MatToolbarModule, forms$1.ReactiveFormsModule, textField.TextFieldModule,
                        core.TranslateModule,
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
                        AjfTextFieldComponent,
                        AjfTimeFieldComponent,
                        AjfVideoUrlFieldComponent,
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
                        AjfTextFieldComponent,
                        AjfTimeFieldComponent,
                        AjfVideoUrlFieldComponent,
                    ],
                    exports: [
                        AjfFormField,
                        AjfFormRenderer,
                    ],
                    providers: [
                        AjfFieldService,
                        { provide: forms.AJF_WARNING_ALERT_SERVICE, useClass: AjfWarningAlertService },
                    ],
                },] }
    ];

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
    exports.ɵgc_ajf_src_material_forms_forms_a = AjfBarcodeFieldComponent;
    exports.ɵgc_ajf_src_material_forms_forms_b = AjfTextFieldComponent;
    exports.ɵgc_ajf_src_material_forms_forms_c = AjfVideoUrlFieldComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-forms.umd.js.map
