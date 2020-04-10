(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/forms'), require('@angular/core'), require('@angular/material/dialog'), require('rxjs/operators'), require('@angular/material/input'), require('@ajf/core/common'), require('@ajf/material/barcode'), require('@ajf/material/calendar'), require('@ajf/material/checkbox-group'), require('@ajf/material/page-slider'), require('@ajf/material/time'), require('@angular/common'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/radio'), require('@angular/material/select'), require('@angular/material/slide-toggle'), require('@angular/material/toolbar'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/forms', ['exports', '@ajf/core/forms', '@angular/core', '@angular/material/dialog', 'rxjs/operators', '@angular/material/input', '@ajf/core/common', '@ajf/material/barcode', '@ajf/material/calendar', '@ajf/material/checkbox-group', '@ajf/material/page-slider', '@ajf/material/time', '@angular/common', '@angular/forms', '@angular/material/button', '@angular/material/card', '@angular/material/form-field', '@angular/material/icon', '@angular/material/radio', '@angular/material/select', '@angular/material/slide-toggle', '@angular/material/toolbar', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.forms = {}), global.ng.core.forms, global.ng.core, global.ng.material.dialog, global.rxjs.operators, global.ng.material.input, global.ng.core.common, global.ng.material.barcode, global.ng.material.calendar, global.ng.material.checkboxGroup, global.ng.material.pageSlider, global.ng.material.time, global.ng.common, global.ng.forms, global.ng.material.button, global.ng.material.card, global.ng.material.formField, global.ng.material.icon, global.ng.material.radio, global.ng.material.select, global.ng.material.slideToggle, global.ng.material.toolbar, global.ngxTranslate.core));
}(this, (function (exports, forms, i0, dialog, operators, input, common, barcode, calendar, checkboxGroup, pageSlider, time, common$1, forms$1, button, card, formField, icon, radio, select, slideToggle, toolbar, core) { 'use strict';

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
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
        AjfFieldWarningDialog.decorators = [
            { type: i0.Component, args: [{
                        template: "<mat-dialog-content><div [innerHTML]=\"message\"></div></mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"true\">Ok</button>\n  <button mat-button [mat-dialog-close]=\"false\">Cancel</button>\n</mat-dialog-actions>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }] }
        ];
        return AjfFieldWarningDialog;
    }());

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
        AjfWarningAlertService.decorators = [
            { type: i0.Injectable }
        ];
        /** @nocollapse */
        AjfWarningAlertService.ctorParameters = function () { return [
            { type: dialog.MatDialog }
        ]; };
        return AjfWarningAlertService;
    }());

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
    var AjfBooleanFieldComponent = /** @class */ (function (_super) {
        __extends(AjfBooleanFieldComponent, _super);
        function AjfBooleanFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfBooleanFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<mat-slide-toggle *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [disabled]=\"readonly\"></mat-slide-toggle>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfBooleanFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfBooleanFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
    var AjfDateFieldComponent = /** @class */ (function (_super) {
        __extends(AjfDateFieldComponent, _super);
        function AjfDateFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfDateFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<ajf-calendar\n  *ngIf=\"control|async as ctrl\"\n  selectionMode=\"day\"\n  [dateOnlyForDay]=\"true\"\n  [minDate]=\"instance.node.minDate|ajfDateValue\"\n  [maxDate]=\"instance.node.maxDate|ajfDateValue\"\n  [formControl]=\"ctrl!\"\n></ajf-calendar>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfDateFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfDateFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
        AjfDateInputFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput type=\"date\"\n      [attr.aria-label]=\"instance.node.label || (instance|ajfNodeCompleteName)\"\n      [min]=\"instance.node.minDate|ajfDateValueString\"\n      [max]=\"instance.node.maxDate|ajfDateValueString\"\n      [readonly]=\"readonly\"\n      (change)=\"onChange()\"\n      [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfDateInputFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService },
            { type: forms.AjfDateValueStringPipe }
        ]; };
        AjfDateInputFieldComponent.propDecorators = {
            input: [{ type: i0.ViewChild, args: [input.MatInput, { static: false },] }]
        };
        return AjfDateInputFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
    var AjfEmptyFieldComponent = /** @class */ (function (_super) {
        __extends(AjfEmptyFieldComponent, _super);
        function AjfEmptyFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfEmptyFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<h1 [innerHTML]=\"instance.node.label | translate\"></h1>\n<div [innerHTML]=\"instance.node.HTML | translate\"></div>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfEmptyFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfEmptyFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
    var AjfBarcodeFieldComponent = /** @class */ (function (_super) {
        __extends(AjfBarcodeFieldComponent, _super);
        function AjfBarcodeFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfBarcodeFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<ajf-barcode *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [readonly]=\"readonly\"></ajf-barcode>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfBarcodeFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfBarcodeFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
    var AjfInputFieldComponent = /** @class */ (function (_super) {
        __extends(AjfInputFieldComponent, _super);
        function AjfInputFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfInputFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput *ngIf=\"type === 'text'\" type=\"text\" [readonly]=\"readonly\" [formControl]=\"ctrl!\">\n  <input matInput *ngIf=\"type === 'number'\" type=\"number\" [readonly]=\"readonly\" [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfInputFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfInputFieldComponent;
    }(forms.AjfInputFieldComponent));

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
    var AjfMultipleChoiceFieldComponent = /** @class */ (function (_super) {
        __extends(AjfMultipleChoiceFieldComponent, _super);
        function AjfMultipleChoiceFieldComponent(cdr, service, was, searchThreshold) {
            return _super.call(this, cdr, service, was, searchThreshold) || this;
        }
        AjfMultipleChoiceFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold); else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [multiple]=\"true\" [disabled]=\"readonly\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <ajf-checkbox-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <ajf-checkbox-group-item *ngFor=\"let choice of instance.filteredChoices\"\n        [readonly]=\"readonly\"\n        [value]=\"choice.value\">\n      {{ choice.label | translate }}\n    </ajf-checkbox-group-item>\n  </ajf-checkbox-group>\n</ng-template>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfMultipleChoiceFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService },
            { type: Number, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [forms.AJF_SEARCH_ALERT_THRESHOLD,] }] }
        ]; };
        return AjfMultipleChoiceFieldComponent;
    }(forms.AjfFieldWithChoicesComponent));

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
    var AjfSingleChoiceFieldComponent = /** @class */ (function (_super) {
        __extends(AjfSingleChoiceFieldComponent, _super);
        function AjfSingleChoiceFieldComponent(cdr, service, was, searchThreshold) {
            return _super.call(this, cdr, service, was, searchThreshold) || this;
        }
        AjfSingleChoiceFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<ng-container *ngIf=\"!(instance|ajfExpandFieldWithChoices:searchThreshold) ; else expanded\">\n  <mat-select *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [disabled]=\"readonly\">\n    <mat-option [value]=\"choice.value\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-option>\n  </mat-select>\n</ng-container>\n<ng-template #expanded>\n  <mat-radio-group *ngIf=\"control|async as ctrl\" class=\"ajf-choices-container\"\n      [formControl]=\"ctrl!\">\n    <mat-radio-button [value]=\"choice.value\" [disabled]=\"readonly\"\n        *ngFor=\"let choice of instance.filteredChoices\">\n      {{ choice.label | translate }}\n    </mat-radio-button>\n  </mat-radio-group>\n</ng-template>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfSingleChoiceFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService },
            { type: Number, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [forms.AJF_SEARCH_ALERT_THRESHOLD,] }] }
        ]; };
        return AjfSingleChoiceFieldComponent;
    }(forms.AjfFieldWithChoicesComponent));

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
    var AjfTableFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTableFieldComponent, _super);
        function AjfTableFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfTableFieldComponent.prototype.goToNextCell = function (ev, row, column) {
            var rowLength = this.instance.controls[row][1].length;
            var currentCell = this.instance.controls[row][1][column];
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
        AjfTableFieldComponent.prototype.goToCell = function (row, column) {
            this._resetControls();
            this._showCell(row, column);
        };
        AjfTableFieldComponent.prototype._resetControls = function () {
            this.instance.controls.forEach(function (row) { return row[1].forEach(function (cell) {
                if (typeof cell !== 'string') {
                    cell.show = false;
                }
            }); });
        };
        AjfTableFieldComponent.prototype._showCell = function (row, column) {
            if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
                return;
            }
            var nextCell = this.instance.controls[row][1][column];
            if (typeof nextCell !== 'string') {
                nextCell.show = true;
            }
        };
        AjfTableFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <td *ngFor=\"let c of columns[1]; let column = index\">\n          <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n            <ng-container *ngIf=\"contr != null\">\n              <input *ngIf=\"row > 0 && contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr\"\n                (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus>\n              <ng-template #plainTextCell>\n                <span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\"\n                  (click)=\"goToCell(row, column)\">{{ contr!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-template>\n            </ng-container>\n          </ng-container>\n        </td>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfTableFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfTableFieldComponent;
    }(forms.AjfBaseFieldComponent));

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
    var AjfTimeFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTimeFieldComponent, _super);
        function AjfTimeFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfTimeFieldComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "<ajf-time *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\" [readonly]=\"readonly\"></ajf-time>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfTimeFieldComponent.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: forms.AjfFormRendererService },
            { type: AjfWarningAlertService }
        ]; };
        return AjfTimeFieldComponent;
    }(forms.AjfBaseFieldComponent));

    var AjfFieldService = /** @class */ (function (_super) {
        __extends(AjfFieldService, _super);
        function AjfFieldService() {
            var _this = _super.call(this) || this;
            _this.componentsMap[forms.AjfFieldType.String] = { component: AjfInputFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Text] = { component: AjfInputFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Number] = {
                    component: AjfInputFieldComponent,
                    inputs: { type: 'number' }
                },
                _this.componentsMap[forms.AjfFieldType.Boolean] = { component: AjfBooleanFieldComponent },
                _this.componentsMap[forms.AjfFieldType.Formula] = {
                    component: AjfInputFieldComponent,
                    inputs: { readonly: true }
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
            { type: i0.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        AjfFieldService.ctorParameters = function () { return []; };
        AjfFieldService.ɵprov = i0["ɵɵdefineInjectable"]({ factory: function AjfFieldService_Factory() { return new AjfFieldService(); }, token: AjfFieldService, providedIn: "root" });
        return AjfFieldService;
    }(forms.AjfFieldService));

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
    var AjfFormField = /** @class */ (function (_super) {
        __extends(AjfFormField, _super);
        function AjfFormField(cdr, cfr, fieldService) {
            var _this = _super.call(this, cdr, cfr) || this;
            _this.componentsMap = fieldService.componentsMap;
            return _this;
        }
        AjfFormField.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ajf-field,ajf-form-field',
                        template: "<div\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | translate}}</a>\n</ng-container>\n<div *ngIf=\"instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error }} \n    </div>\n  </ng-container>\n</div>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                        styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfFormField.ctorParameters = function () { return [
            { type: i0.ChangeDetectorRef },
            { type: i0.ComponentFactoryResolver },
            { type: AjfFieldService }
        ]; };
        return AjfFormField;
    }(forms.AjfFormField));

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
        AjfFormRenderer.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ajf-form',
                        template: "<ng-container *ngIf=\"formGroup|async as fg\">\n  <form novalidate [formGroup]=\"fg!\">\n    <div class=\"ajf-form-container\">\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\" class=\"ajf-btn-strip\">\n        <ng-template ngFor let-slideInstance [ngForOf]=\"slides|async\" [ngForTrackBy]=\"trackNodeById\">\n          <button mat-button class=\"ajf-topbar-button\"\n          *ngIf=\"topBar != null && slideInstance.node != null && slideInstance.node.label != null && slideInstance.node.label.length > 0\"\n              (click)=\"scrollToSlide(slideInstance)\">{{slideInstance.node.label | translate}}</button>\n        </ng-template>\n      </mat-toolbar>\n\n      <mat-toolbar *ngIf=\"!hideTopToolbar\">\n        {{ title }}\n        <span class=\"ajf-spacer\"></span>\n        <button mat-button default *ngIf=\"!saveDisabled\" (click)=\"onSave($event)\"\n            translate>Save</button>\n      </mat-toolbar>\n      <div class=\"ajf-slider-container\">\n        <ajf-page-slider (orientationChange)=\"orientationChangeHandler($event)\"\n            [fixedOrientation]=\"fixedOrientation\"\n            [hideNavigationButtons]=\"hideNavigationButtons\"\n            [orientation]=\"orientation\"\n            #formSlider>\n          <ng-container *ngIf=\"(slides|async) as curSlides\">\n            <ng-container *ngIf=\"curSlides!.length > 0 && hasStartMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span class=\"ajf-form-header-number\">\n                            1 &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormStartMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormStartMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n            <ng-container *ngFor=\"let slideInstance of curSlides; trackBy:trackNodeById\">\n              <!-- non repeating slides -->\n              <ng-container *ngIf=\"slideInstance.visible\">\n                <ng-container *ngIf=\"!(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item>\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!slideInstance.valid\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"slideInstance.valid\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.flatNodes\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label *ngIf=\"(fieldInstance|ajfAsFieldInstance).node.fieldType !== 7\" [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n                <!-- repeating slides -->\n                <ng-container *ngIf=\"(slideInstance|ajfIsRepeatingSlideInstance)\">\n                  <ajf-page-slider-item *ngFor=\"let curRep of ((slideInstance|ajfAsRepeatingSlideInstance).reps|ajfRange); let idx = index; let lastSlide = last\">\n                    <div class=\"ajf-form-page\">\n                      <mat-card>\n                        <mat-card-header>\n                          <div class=\"ajf-page-slider-item-header\">\n                            <h2>\n                              <span class=\"ajf-form-header-number\">{{ slideInstance.position|ajfIncrement:idx + (hasStartMessage | ajfBoolToInt) }} &rarr;</span>\n                              <span [innerHTML]=\"slideInstance.node.label | translate\"></span>\n                            </h2>\n                            <mat-icon class=\"ajf-warning\" *ngIf=\"!(slideInstance|ajfValidSlide:idx)\">warning</mat-icon>\n                            <mat-icon class=\"ajf-success\" *ngIf=\"(slideInstance|ajfValidSlide:idx)\">check</mat-icon>\n                          </div>\n                        </mat-card-header>\n                        <mat-card-content>\n                          <div *ngIf=\"lastSlide\" class=\"ajf-group-actions\">\n                            <button (click)=\"addGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canAdd\" mat-mini-fab>\n                              <mat-icon>add</mat-icon>\n                            </button>\n                            <button (click)=\"removeGroup(slideInstance)\" [disabled]=\"!(slideInstance|ajfAsRepeatingSlideInstance).canRemove\" mat-mini-fab>\n                              <mat-icon>remove</mat-icon>\n                            </button>\n                          </div>\n                          <ng-template ngFor let-fieldInstance [ngForOf]=\"slideInstance.slideNodes[idx]\" [ngForTrackBy]=\"trackNodeById\">\n                            <div [ngClass]=\"'ajf-' + (fieldInstance|ajfAsFieldInstance).node.size\" class=\"ajf-field-entry\" *ngIf=\"fieldInstance.visible\">\n                              <i [class]=\"(fieldInstance|ajfAsFieldInstance).node.fieldType | ajfFieldIcon\" item-right></i>\n                              <p>{{ ((fieldInstance|ajfAsFieldInstance).node.description || '') | translate }}</p>\n                              <label [innerHTML]=\"fieldInstance.node.label | translate\"></label>\n                              <ajf-field [instance]=\"fieldInstance|ajfAsFieldInstance\" [readonly]=\"readonly\"></ajf-field>\n                            </div>\n                          </ng-template>\n                        </mat-card-content>\n                      </mat-card>\n                    </div>\n                  </ajf-page-slider-item>\n                </ng-container>\n              </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"curSlides && curSlides!.length > 0 && hasEndMessage\">\n              <ajf-page-slider-item>\n                <div class=\"ajf-form-page\">\n                  <mat-card>\n                    <mat-card-header>\n                      <div class=\"ajf-page-slider-item-header\">\n                        <h2>\n                          <span *ngIf=\"(slidesNum|async) as snum\" class=\"ajf-form-header-number\">\n                            {{ snum! + (hasStartMessage | ajfBoolToInt ) + 1 }} &rarr;\n                          </span>\n                          <span class=\"ajf-title\">\n                            <ng-content select=\"[ajfFormEndMessageTitle]\"></ng-content>\n                          </span>\n                        </h2>\n                      </div>\n                    </mat-card-header>\n                    <mat-card-content>\n                      <ng-content select=\"[ajfFormEndMessage]\"></ng-content>\n                    </mat-card-content>\n                  </mat-card>\n                </div>\n              </ajf-page-slider-item>\n            </ng-container>\n          </ng-container>\n          <div ajfPageSliderBar *ngIf=\"!hideBottomToolbar\">\n            <div class=\"ajf-left-bar\">\n              <div class=\"ajf-errors\" *ngIf=\"((errors | async) || 0) > 0\">\n                <button mat-button (click)=\"goToPrevError()\" danger>\n                  <mat-icon>arrow_upward</mat-icon>\n                </button>\n                <button mat-button (click)=\"goToNextError()\" danger>\n                  <mat-icon>arrow_downward</mat-icon>\n                </button>\n              </div>\n              <div class=\"ajf-info-box ajf-error\">\n                <div class=\"ajf-title\" translate>Errors</div>\n                <div class=\"ajf-content\">\n                  {{ errors | async }} / {{ slidesNum|async }}\n                </div>\n              </div>\n            </div>\n          </div>\n        </ajf-page-slider>\n      </div>\n    </div>\n  </form>\n</ng-container>\n",
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-form{display:block}ajf-form .ajf-form-container{display:flex;flex-direction:column;position:absolute;top:0;right:0;bottom:0;left:0}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip{overflow:auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button{flex:1 1 auto}ajf-form .ajf-form-container mat-toolbar.ajf-btn-strip button.ajf-topbar-button.mat-button *{display:block;width:100%;overflow:hidden;text-overflow:ellipsis}ajf-form .ajf-form-container mat-toolbar.ajf-hidden{opacity:0}ajf-form .ajf-form-container .ajf-topbar-button{margin-right:10px}ajf-form .ajf-form-container>.ajf-slider-container{flex:1;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider{height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content{padding:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page{flex:1;max-height:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card{margin:1em 0 3em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content{display:flex;flex-wrap:wrap;flex-direction:row;align-content:flex-start;position:relative}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content .ajf-group-actions{position:absolute;right:0;top:-30px;padding:15px;z-index:10}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry{flex:1 0 auto;padding-left:10px;padding-right:10px;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-normal{width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-small{width:50%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-smaller{width:33%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-tiny{width:25%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider ajf-page-slider-item .ajf-page-slider-item-content .ajf-form-page>mat-card>mat-card-content>.ajf-field-entry.ajf-mini{width:20%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header{display:flex;align-items:center;width:100%}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2{flex:1}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header>h2>.ajf-form-header-number{margin-right:.5em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-warning{color:#f53d3d}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header mat-icon.ajf-success{color:#32db64}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider .ajf-page-slider-item-header h2>.ajf-title{display:inline-block;margin-right:40px;white-space:normal;vertical-align:top}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar{display:flex;align-items:flex-start;flex-direction:row;position:absolute;bottom:0}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-right-button{float:right}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-button-icon-only ion-icon{padding:0 .1em}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box{height:40px;padding:4px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div{height:16px;line-height:16px}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box>div.ajf-content{font-weight:bold}ajf-form .ajf-form-container>.ajf-slider-container>ajf-page-slider [ajfPageSliderBar] .ajf-left-bar .ajf-info-box.ajf-error{order:2;color:red}ajf-form .ajf-form-container .ajf-spacer{flex:1 0 auto}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfFormRenderer.ctorParameters = function () { return [
            { type: forms.AjfFormRendererService },
            { type: i0.ChangeDetectorRef }
        ]; };
        AjfFormRenderer.propDecorators = {
            topBar: [{ type: i0.Input }]
        };
        return AjfFormRenderer;
    }(forms.AjfFormRenderer));

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
    var FormControl = /** @class */ (function (_super) {
        __extends(FormControl, _super);
        function FormControl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FormControl;
    }(forms$1.FormControl));
    var AjfGetTableCellControlPipe = /** @class */ (function () {
        function AjfGetTableCellControlPipe() {
        }
        AjfGetTableCellControlPipe.prototype.transform = function (ctrl) {
            if (ctrl == null || typeof ctrl === 'string') {
                return null;
            }
            return ctrl;
        };
        AjfGetTableCellControlPipe.decorators = [
            { type: i0.Pipe, args: [{ name: 'ajfGetTableCellControl' },] }
        ];
        return AjfGetTableCellControlPipe;
    }());

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
    var AjfIsCellEditablePipe = /** @class */ (function () {
        function AjfIsCellEditablePipe() {
        }
        AjfIsCellEditablePipe.prototype.transform = function (cell) {
            if (cell == null || typeof cell === 'string') {
                return false;
            }
            return cell.editable === true;
        };
        AjfIsCellEditablePipe.decorators = [
            { type: i0.Pipe, args: [{ name: 'ajfIsCellEditable' },] }
        ];
        return AjfIsCellEditablePipe;
    }());

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
        AjfFormsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            barcode.AjfBarcodeModule, calendar.AjfCalendarModule, common.AjfCommonModule, forms.AjfFormsModule,
                            checkboxGroup.AjfCheckboxGroupModule, pageSlider.AjfPageSliderModule, time.AjfTimeModule, common$1.CommonModule,
                            button.MatButtonModule, card.MatCardModule, dialog.MatDialogModule, formField.MatFormFieldModule,
                            icon.MatIconModule, input.MatInputModule, radio.MatRadioModule, select.MatSelectModule,
                            slideToggle.MatSlideToggleModule, toolbar.MatToolbarModule, forms$1.ReactiveFormsModule, core.TranslateModule,
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
                            AjfWarningAlertService,
                        ],
                    },] }
        ];
        return AjfFormsModule;
    }());

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
    exports.ɵgc_ajf_src_material_forms_forms_b = AjfGetTableCellControlPipe;
    exports.ɵgc_ajf_src_material_forms_forms_c = AjfIsCellEditablePipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-forms.umd.js.map
