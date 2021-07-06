(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/transloco'), require('@ajf/material/monaco-editor'), require('@ajf/material/node-icon'), require('@angular/cdk/drag-drop'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/material/autocomplete'), require('@angular/material/button'), require('@angular/material/card'), require('@angular/material/checkbox'), require('@angular/material/chips'), require('@angular/material/dialog'), require('@angular/material/expansion'), require('@angular/material/form-field'), require('@angular/material/icon'), require('@angular/material/input'), require('@angular/material/list'), require('@angular/material/menu'), require('@angular/material/select'), require('@angular/material/sidenav'), require('@angular/material/slide-toggle'), require('@angular/material/slider'), require('@angular/material/table'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('@ajf/core/forms'), require('@angular/cdk/collections'), require('rxjs'), require('rxjs/operators'), require('@ajf/core/models'), require('@ajf/core/utils'), require('@angular/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/form-builder', ['exports', '@ajf/core/transloco', '@ajf/material/monaco-editor', '@ajf/material/node-icon', '@angular/cdk/drag-drop', '@angular/common', '@angular/core', '@angular/forms', '@angular/material/autocomplete', '@angular/material/button', '@angular/material/card', '@angular/material/checkbox', '@angular/material/chips', '@angular/material/dialog', '@angular/material/expansion', '@angular/material/form-field', '@angular/material/icon', '@angular/material/input', '@angular/material/list', '@angular/material/menu', '@angular/material/select', '@angular/material/sidenav', '@angular/material/slide-toggle', '@angular/material/slider', '@angular/material/table', '@angular/material/toolbar', '@angular/material/tooltip', '@ajf/core/forms', '@angular/cdk/collections', 'rxjs', 'rxjs/operators', '@ajf/core/models', '@ajf/core/utils', '@angular/cdk/keycodes'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.formBuilder = {}), global.ajf.core.transloco, global.ajf.material.monacoEditor, global.ajf.material.nodeIcon, global.ng.cdk.dragDrop, global.ng.common, global.ng.core, global.ng.forms, global.ng.material.autocomplete, global.ng.material.button, global.ng.material.card, global.ng.material.checkbox, global.ng.material.chips, global.ng.material.dialog, global.ng.material.expansionPanel, global.ng.material.formField, global.ng.material.icon, global.ng.material.input, global.ng.material.list, global.ng.material.menu, global.ng.material.select, global.ng.material.sidenav, global.ng.material.slideToggle, global.ng.material.slider, global.ng.material.table, global.ng.material.toolbar, global.ng.material.tooltip, global.ajf.core.forms, global.ng.cdk.collections, global.rxjs, global.rxjs.operators, global.ajf.core.models, global.ajf.core.utils, global.ng.cdk.keycodes));
}(this, (function (exports, transloco, monacoEditor, nodeIcon, dragDrop, common, core, forms$1, autocomplete, button, card, checkbox, chips, dialog, expansion, formField, icon, input, list, menu, select, sidenav, slideToggle, slider, table, toolbar, tooltip, forms, collections, rxjs, operators, models, utils, keycodes) { 'use strict';

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
    var AjfFbBranchLine = /** @class */ (function () {
        function AjfFbBranchLine(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this._offset = 0;
            this._height = 0;
        }
        Object.defineProperty(AjfFbBranchLine.prototype, "offset", {
            set: function (offset) {
                this._offset = offset;
                this._updateOffset();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbBranchLine.prototype, "color", {
            set: function (color) {
                this._color = color;
                this._updateColor();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbBranchLine.prototype, "height", {
            set: function (height) {
                this._height = height;
                this._updateHeight();
            },
            enumerable: false,
            configurable: true
        });
        AjfFbBranchLine.prototype._updateHeight = function () {
            var height = Math.max(0, this._height - 25) + "px";
            this._renderer.setStyle(this._el.nativeElement, 'height', height);
        };
        AjfFbBranchLine.prototype._updateOffset = function () {
            var margin = this._offset * 4 + "px";
            this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
            this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
        };
        AjfFbBranchLine.prototype._updateColor = function () {
            this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
        };
        return AjfFbBranchLine;
    }());
    AjfFbBranchLine.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-branch-line',
                    template: "",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px;transition:height .5s ease-in-out}\n"]
                },] }
    ];
    AjfFbBranchLine.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    AjfFbBranchLine.propDecorators = {
        offset: [{ type: core.Input }],
        color: [{ type: core.Input }],
        height: [{ type: core.Input }]
    };

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
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
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
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
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
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var ChoicesOriginDataSource = /** @class */ (function (_super) {
        __extends(ChoicesOriginDataSource, _super);
        function ChoicesOriginDataSource() {
            var _this = _super.call(this) || this;
            _this._choices = new rxjs.BehaviorSubject([]);
            _this._choicesObs = _this._choices;
            return _this;
        }
        ChoicesOriginDataSource.prototype.connect = function () {
            return this._choicesObs;
        };
        ChoicesOriginDataSource.prototype.disconnect = function () { };
        ChoicesOriginDataSource.prototype.updateChoices = function (choices) {
            this._choices.next(choices);
        };
        return ChoicesOriginDataSource;
    }(collections.DataSource));

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
    var AjfFbChoicesOriginEditor = /** @class */ (function () {
        function AjfFbChoicesOriginEditor() {
            this._displayedColumns = ['label', 'value', 'delete'];
            this.editing = {};
            this._choices = new ChoicesOriginDataSource();
            this._choicesArr = [];
        }
        Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "displayedColumns", {
            get: function () {
                return this._displayedColumns;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesOrigin", {
            get: function () {
                return this._choicesOrigin;
            },
            set: function (choicesOrigin) {
                this._choicesOrigin = choicesOrigin;
                this.name = choicesOrigin.name;
                this.label = choicesOrigin.label;
                this.canEditChoices = forms.isChoicesFixedOrigin(choicesOrigin);
                this._choicesArr = choicesOrigin.choices;
                this._choices.updateChoices(this._choicesArr);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choices", {
            get: function () {
                return this._choices;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesArr", {
            get: function () {
                return this._choicesArr;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbChoicesOriginEditor.prototype.updateValue = function (evt, cell, _value, rowIdx) {
            this.editing[rowIdx + '-' + cell] = false;
            this._choicesArr[rowIdx][cell] = evt.target.value;
            this._choices.updateChoices(this._choicesArr);
        };
        AjfFbChoicesOriginEditor.prototype.deleteRow = function (rowIdx) {
            this._choicesArr.splice(rowIdx, 1);
            this._choices.updateChoices(this._choicesArr);
        };
        AjfFbChoicesOriginEditor.prototype.addRow = function () {
            this._choicesArr.push({ label: '', value: '' });
            this._choices.updateChoices(this._choicesArr);
        };
        return AjfFbChoicesOriginEditor;
    }());
    AjfFbChoicesOriginEditor.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-choices-origin-editor',
                    template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | transloco\" />\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | transloco\" />\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span>{{'Add value'|transloco}}</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Label'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Value'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Delete'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">{{'delete'|transloco}}</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"]
                },] }
    ];
    AjfFbChoicesOriginEditor.propDecorators = {
        choicesOrigin: [{ type: core.Input }]
    };

    function getNodeContainer(c, node) {
        if (c.nodes.indexOf(node) > -1) {
            return c;
        }
        var cns = c.nodes.filter(function (n) { return forms.isContainerNode(n); });
        var len = cns.length;
        for (var i = 0; i < len; i++) {
            var cn = getNodeContainer(cns[i], node);
            if (cn != null) {
                return cn;
            }
        }
        return null;
    }
    function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches) {
        if (ignoreConditionalBranches === void 0) { ignoreConditionalBranches = false; }
        var entries = nodes.filter(function (n) { return n.parent === parent.id; })
            .sort(function (n1, n2) { return n1.parentNode - n2.parentNode; })
            .map(function (n) {
            var children = buildFormBuilderNodesSubtree(nodes, n);
            if (children.length === 0) {
                children.push({ parent: n, parentNode: 0 });
            }
            return {
                node: n,
                children: children,
                content: buildFormBuilderNodesContent(nodes, n)
            };
        });
        if (!ignoreConditionalBranches) {
            var entriesNum = entries.length;
            var cbs = parent.conditionalBranches.length;
            for (var i = entriesNum; i < cbs; i++) {
                entries.push({ parent: parent, parentNode: i });
            }
        }
        return entries;
    }
    function buildFormBuilderNodesContent(_nodes, node) {
        if (forms.isContainerNode(node)) {
            return buildFormBuilderNodesSubtree(node.nodes, node, true);
        }
        return [];
    }
    function flattenNodes(nodes) {
        var flatNodes = [];
        nodes.forEach(function (node) {
            if (forms.isContainerNode(node)) {
                flatNodes = flatNodes.concat(flattenNodes(node.nodes));
            }
            flatNodes.push(node);
        });
        return flatNodes;
    }
    function getDescendants(flatNodes, parentNode, branch) {
        if (branch === void 0) { branch = null; }
        return branch != null ?
            flatNodes.filter(function (n) { return n.parent === parentNode.id && n.parentNode === branch; }) :
            flatNodes.filter(function (n) { return n.parent === parentNode.id; });
    }
    function removeNodes(nodes, ids) {
        var len = nodes.length;
        for (var i = 0; i < len; i++) {
            var node = nodes[i];
            if (forms.isContainerNode(node)) {
                var container = node;
                container.nodes = removeNodes(container.nodes, ids);
            }
        }
        return nodes.filter(function (n) { return ids.indexOf(n.id) === -1; });
    }
    function deleteNodeSubtree(nodes, parentNode, branch) {
        if (branch === void 0) { branch = null; }
        var flatNodes = flattenNodes(nodes);
        var delNodes = [];
        var descendants = getDescendants(flatNodes, parentNode, branch);
        var len = descendants.length;
        for (var i = 0; i < len; i++) {
            delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
        }
        delNodes = delNodes.concat(descendants);
        return removeNodes(nodes, delNodes.map(function (n) { return n.id; }));
    }
    var nodeUniqueId = 0;
    var AjfFormBuilderService = /** @class */ (function () {
        function AjfFormBuilderService() {
            this._availableNodeTypes = [
                {
                    label: 'Slide',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-slide' },
                    nodeType: { node: forms.AjfNodeType.AjfSlide },
                    isSlide: true
                },
                {
                    label: 'Repeating slide',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-repeatingslide' },
                    nodeType: { node: forms.AjfNodeType.AjfRepeatingSlide },
                    isSlide: true
                },
                {
                    label: 'String',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-string' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.String }
                },
                {
                    label: 'Text',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-text' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Text }
                },
                {
                    label: 'Number',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-number' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Number }
                },
                {
                    label: 'Boolean',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-boolean' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Boolean }
                },
                {
                    label: 'Single choice',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-singlechoice' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.SingleChoice }
                },
                {
                    label: 'Multiple choice',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-multiplechoice' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.MultipleChoice }
                },
                {
                    label: 'Formula',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-formula' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Formula }
                },
                {
                    label: 'Date',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-date' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Date }
                },
                {
                    label: 'Date input',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-dateinput' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.DateInput }
                },
                {
                    label: 'Time',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-time' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Time }
                },
                {
                    label: 'Table',
                    icon: { fontSet: 'ajf-icon', fontIcon: 'field-table' },
                    nodeType: { node: forms.AjfNodeType.AjfField, field: forms.AjfFieldType.Table }
                }
            ];
            this._form = new rxjs.BehaviorSubject(null);
            this._formObs = this._form;
            /**
             * A list of the ids of the dropLists connected to the source list.
             */
            this._connectedDropLists = new rxjs.BehaviorSubject([]);
            this._editedNodeEntry = new rxjs.BehaviorSubject(null);
            this._editedNodeEntryObs = this._editedNodeEntry;
            this._editedCondition = new rxjs.BehaviorSubject(null);
            this._editedConditionObs = this._editedCondition;
            this._editedChoicesOrigin = new rxjs.BehaviorSubject(null);
            this._editedChoicesOriginObs = this._editedChoicesOrigin;
            this._beforeNodesUpdate = new core.EventEmitter();
            this._beforeNodesUpdateObs = this._beforeNodesUpdate;
            this._afterNodeUpdate = new core.EventEmitter();
            this._afterNodeUpdateObs = this._afterNodeUpdate;
            this._nodesUpdates = new rxjs.Subject();
            this._attachmentsOriginsUpdates = new rxjs.Subject();
            this._choicesOriginsUpdates = new rxjs.Subject();
            this._stringIdentifierUpdates = new rxjs.Subject();
            this._saveNodeEntryEvent = new core.EventEmitter();
            this._deleteNodeEntryEvent = new core.EventEmitter();
            /**
             * Event fired when the position of a node in a tree changes.
             */
            this._moveNodeEntryEvent = new core.EventEmitter();
            /**
             * Subscribes to the moveNodeEntryEvent event emitter;
             */
            this._moveNodeSub = rxjs.Subscription.EMPTY;
            this._initChoicesOriginsStreams();
            this._initAttachmentsOriginsStreams();
            this._initStringIdentifierStreams();
            this._initNodesStreams();
            this._initFormStreams();
            this._initSaveNode();
            this._initMoveNode();
            this._initDeleteNode();
        }
        Object.defineProperty(AjfFormBuilderService.prototype, "availableNodeTypes", {
            /**
             * Available node types
             *
             * @readonly
             * @memberOf AjfFormBuilderService
             */
            get: function () {
                return this._availableNodeTypes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "form", {
            /**
             * Current edited form stream
             *
             * @readonly
             * @memberOf AjfFormBuilderService
             */
            get: function () {
                return this._formObs;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "attachmentsOrigins", {
            get: function () {
                return this._attachmentsOrigins;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "choicesOrigins", {
            get: function () {
                return this._choicesOrigins;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "stringIdentifier", {
            get: function () {
                return this._stringIdentifier;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "nodes", {
            get: function () {
                return this._nodes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "flatNodes", {
            get: function () {
                return this._flatNodes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "flatFields", {
            get: function () {
                return this._flatFields;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "nodeEntriesTree", {
            get: function () {
                return this._nodeEntriesTree;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "connectedDropLists", {
            get: function () {
                return this._connectedDropLists;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "editedNodeEntry", {
            get: function () {
                return this._editedNodeEntryObs;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "editedCondition", {
            get: function () {
                return this._editedConditionObs;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "editedChoicesOrigin", {
            get: function () {
                return this._editedChoicesOriginObs;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "beforeNodesUpdate", {
            get: function () {
                return this._beforeNodesUpdateObs;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilderService.prototype, "afterNodeUpdate", {
            get: function () {
                return this._afterNodeUpdateObs;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Sets the current edited form
         *
         * @param form
         *
         * @memberOf AjfFormBuilderService
         */
        AjfFormBuilderService.prototype.setForm = function (form) {
            if (form !== this._form.getValue()) {
                this._form.next(form);
            }
        };
        AjfFormBuilderService.prototype.editNodeEntry = function (nodeEntry) {
            this._editedNodeEntry.next(nodeEntry);
        };
        AjfFormBuilderService.prototype.editCondition = function (condition) {
            this._editedCondition.next(condition);
        };
        AjfFormBuilderService.prototype.saveCurrentCondition = function (condition) {
            var c = this._editedCondition.getValue();
            if (c == null) {
                return;
            }
            c.condition = condition;
            this._editedCondition.next(null);
        };
        AjfFormBuilderService.prototype.cancelConditionEdit = function () {
            this._editedChoicesOrigin.next(null);
        };
        AjfFormBuilderService.prototype.assignListId = function (node, empty) {
            if (empty === void 0) { empty = false; }
            if (node.nodeType === forms.AjfNodeType.AjfSlide || node.nodeType === forms.AjfNodeType.AjfRepeatingSlide) {
                var listId = empty ? "empty_fields_list_" + node.id : "fields_list_" + node.id;
                if (this._connectedDropLists.value.indexOf(listId) == -1) {
                    this._connectDropList(listId);
                }
                return listId;
            }
            return '';
        };
        AjfFormBuilderService.prototype.insertNode = function (nodeType, parent, parentNode, inContent, insertInIndex) {
            var _this = this;
            if (inContent === void 0) { inContent = false; }
            if (insertInIndex === void 0) { insertInIndex = 0; }
            var _a;
            var node;
            var id = ++nodeUniqueId;
            var isFieldNode = ((_a = nodeType.nodeType) === null || _a === void 0 ? void 0 : _a.field) != null;
            if (isFieldNode) {
                node = forms.createField({
                    id: id,
                    nodeType: forms.AjfNodeType.AjfField,
                    fieldType: nodeType.nodeType.field,
                    parent: parent.id,
                    parentNode: parentNode,
                    name: '',
                });
            }
            else {
                node = forms.createContainerNode({
                    id: id,
                    nodeType: nodeType.nodeType.node,
                    parent: 0,
                    parentNode: parentNode,
                    name: '',
                    nodes: [],
                });
            }
            this._beforeNodesUpdate.emit();
            this._nodesUpdates.next(function (nodes) {
                var cn = forms.isContainerNode(parent) && inContent ?
                    parent :
                    getNodeContainer({ nodes: nodes }, parent);
                if (!isFieldNode) {
                    var newNodes = nodes.slice(0);
                    newNodes.splice(insertInIndex, 0, node);
                    newNodes = _this._updateNodesList(0, newNodes);
                    return newNodes;
                }
                else {
                    var newNodes = cn.nodes.slice(0);
                    newNodes.splice(insertInIndex, 0, node);
                    newNodes = _this._updateNodesList(cn.id, newNodes);
                    cn.nodes = newNodes;
                }
                return nodes;
            });
        };
        AjfFormBuilderService.prototype.saveNodeEntry = function (properties) {
            this._saveNodeEntryEvent.emit(properties);
        };
        AjfFormBuilderService.prototype.cancelNodeEntryEdit = function () {
            this._editedNodeEntry.next(null);
        };
        AjfFormBuilderService.prototype.deleteNodeEntry = function (nodeEntry) {
            this._deleteNodeEntryEvent.next(nodeEntry);
        };
        /**
         * Triggers the moveNode event when a node is moved in the formbuilder.
         * @param nodeEntry The node to be moved.
         */
        AjfFormBuilderService.prototype.moveNodeEntry = function (nodeEntry, from, to) {
            var moveEvent = { nodeEntry: nodeEntry, fromIndex: from, toIndex: to };
            this._moveNodeEntryEvent.next(moveEvent);
        };
        AjfFormBuilderService.prototype.getCurrentForm = function () {
            return rxjs.combineLatest([
                this.form, this._nodesWithoutChoiceOrigins, this.attachmentsOrigins,
                this.choicesOrigins, this.stringIdentifier
            ])
                .pipe(operators.filter(function (_b) {
                var _c = __read(_b, 1), form = _c[0];
                return form != null;
            }), operators.map(function (_b) {
                var _c = __read(_b, 5), form = _c[0], nodes = _c[1], attachmentsOrigins = _c[2], choicesOrigins = _c[3], stringIdentifier = _c[4];
                return forms.createForm({
                    choicesOrigins: choicesOrigins.slice(0),
                    attachmentsOrigins: attachmentsOrigins.slice(0),
                    stringIdentifier: (stringIdentifier || []).slice(0),
                    nodes: nodes.slice(0),
                    supplementaryInformations: form.supplementaryInformations,
                });
            }));
        };
        AjfFormBuilderService.prototype.editChoicesOrigin = function (choicesOrigin) {
            this._editedChoicesOrigin.next(choicesOrigin);
        };
        AjfFormBuilderService.prototype.createChoicesOrigin = function () {
            this._editedChoicesOrigin.next(forms.createChoicesFixedOrigin({ name: '' }));
        };
        AjfFormBuilderService.prototype.cancelChoicesOriginEdit = function () {
            this._editedChoicesOrigin.next(null);
        };
        AjfFormBuilderService.prototype.saveChoicesOrigin = function (params) {
            var choicesOrigin = this._editedChoicesOrigin.getValue();
            if (choicesOrigin != null) {
                choicesOrigin.label = params.label;
                choicesOrigin.name = params.name;
                if (forms.isChoicesFixedOrigin(choicesOrigin)) {
                    choicesOrigin.choices = params.choices;
                }
                this._choicesOriginsUpdates.next(function (choicesOrigins) {
                    var idx = choicesOrigins.indexOf(choicesOrigin);
                    if (idx > -1) {
                        choicesOrigins = __spreadArray(__spreadArray(__spreadArray([], __read(choicesOrigins.slice(0, idx))), [
                            choicesOrigin
                        ]), __read(choicesOrigins.slice(idx + 1)));
                    }
                    else {
                        choicesOrigins = __spreadArray(__spreadArray([], __read(choicesOrigins)), [choicesOrigin]);
                    }
                    return choicesOrigins;
                });
            }
            this._editedChoicesOrigin.next(null);
        };
        AjfFormBuilderService.prototype.saveStringIdentifier = function (identifier) {
            this._stringIdentifierUpdates.next(function () { return __spreadArray([], __read(identifier)); });
        };
        AjfFormBuilderService.prototype._buildFormBuilderNodesTree = function (nodes) {
            this._updateNodesList(0, nodes);
            var rootNodes = nodes.filter(function (n) { return n.nodeType == forms.AjfNodeType.AjfSlide || n.nodeType == forms.AjfNodeType.AjfRepeatingSlide; });
            if (rootNodes.length === 0) {
                return [null];
            }
            var rootNode = rootNodes[0];
            if (forms.isSlidesNode(rootNode)) {
                var tree = [];
                tree.push({
                    node: rootNode,
                    container: null,
                    children: buildFormBuilderNodesSubtree(nodes, rootNode),
                    content: buildFormBuilderNodesContent(nodes, rootNode)
                });
                return tree;
            }
            throw new Error('Invalid form definition');
        };
        /**
         * Adds the id of a dropList to be connected with the FormBuilder source list.
         * @param listId The id of the list to connect.
         */
        AjfFormBuilderService.prototype._connectDropList = function (listId) {
            var connectedLists = this._connectedDropLists.value.slice(0);
            this._connectedDropLists.next(__spreadArray(__spreadArray([], __read(connectedLists)), [listId]));
        };
        AjfFormBuilderService.prototype._findMaxNodeId = function (nodes, _curMaxId) {
            var _this = this;
            if (_curMaxId === void 0) { _curMaxId = 0; }
            var maxId = 0;
            nodes.forEach(function (n) {
                maxId = Math.max(maxId, n.id);
                if (forms.isContainerNode(n)) {
                    maxId = Math.max(maxId, _this._findMaxNodeId(n.nodes));
                }
            });
            return maxId;
        };
        AjfFormBuilderService.prototype._initFormStreams = function () {
            var _this = this;
            this._form.subscribe(function (form) {
                nodeUniqueId = 0;
                if (form != null && form.nodes != null && form.nodes.length > 0) {
                    nodeUniqueId = _this._findMaxNodeId(form.nodes);
                }
                _this._nodesUpdates.next(function (_nodes) {
                    return form != null && form.nodes != null ? form.nodes.slice(0) : [];
                });
                _this._attachmentsOriginsUpdates.next(function (_attachmentsOrigins) {
                    return form != null && form.attachmentsOrigins != null ?
                        form.attachmentsOrigins.slice(0) :
                        [];
                });
                _this._choicesOriginsUpdates.next(function (_choicesOrigins) {
                    return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
                });
                _this._stringIdentifierUpdates.next(function (_) {
                    return form != null && form.stringIdentifier != null ? form.stringIdentifier.slice(0) :
                        [];
                });
            });
        };
        AjfFormBuilderService.prototype._initChoicesOriginsStreams = function () {
            this._choicesOrigins =
                this._choicesOriginsUpdates
                    .pipe(operators.scan(function (choicesOrigins, op) {
                    return op(choicesOrigins);
                }, []), operators.publishReplay(1), operators.refCount());
        };
        AjfFormBuilderService.prototype._initAttachmentsOriginsStreams = function () {
            this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(operators.scan(function (attachmentsOrigins, op) {
                return op(attachmentsOrigins);
            }, []), operators.publishReplay(1), operators.refCount());
        };
        AjfFormBuilderService.prototype._initStringIdentifierStreams = function () {
            this._stringIdentifier = this._stringIdentifierUpdates.pipe(operators.scan(function (stringIdentifier, op) {
                return op(stringIdentifier);
            }, []), operators.publishReplay(1), operators.refCount());
        };
        AjfFormBuilderService.prototype._initNodesStreams = function () {
            var _this = this;
            this._nodes = this._nodesUpdates
                .pipe(operators.scan(function (nodes, op) {
                return op(nodes);
            }, []), operators.publishReplay(1), operators.refCount());
            this._nodesWithoutChoiceOrigins =
                this._nodes.pipe(operators.map(function (slides) { return slides.map(function (slide) {
                    slide.nodes = slide.nodes.map(function (node) {
                        if (forms.isFieldWithChoices(node)) {
                            var fwc = utils.deepCopy(node);
                            if (fwc && fwc.choices) {
                                delete fwc.choices;
                            }
                            if (fwc && fwc.choicesOrigin) {
                                delete fwc.choicesOrigin;
                            }
                            return fwc;
                        }
                        return node;
                    });
                    return slide;
                }); }));
            this._flatNodes = this._nodes.pipe(operators.map(function (nodes) { return flattenNodes(nodes); }), operators.publishReplay(1), operators.refCount());
            this._flatFields = this._flatNodes.pipe(operators.map(function (nodes) { return nodes.filter(function (n) { return !forms.isContainerNode(n); }); }), operators.publishReplay(1), operators.refCount());
            this._nodeEntriesTree = this._nodes.pipe(operators.map(function (nodes) { return _this._buildFormBuilderNodesTree(nodes); }), operators.publishReplay(1), operators.refCount());
        };
        AjfFormBuilderService.prototype._initSaveNode = function () {
            var _this = this;
            this._saveNodeEntryEvent
                .pipe(operators.withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), operators.filter(function (_b) {
                var _c = __read(_b, 2), _ = _c[0], nodeEntry = _c[1];
                return nodeEntry != null;
            }), operators.map(function (_b) {
                var _c = __read(_b, 2), properties = _c[0], ne = _c[1];
                _this._beforeNodesUpdate.emit();
                var nodeEntry = ne;
                var origNode = nodeEntry.node;
                var node = utils.deepCopy(origNode);
                node.id = nodeEntry.node.id;
                node.name = properties.name;
                node.label = properties.label;
                node.visibility = properties.visibility != null ?
                    models.createCondition({ condition: properties.visibility }) :
                    null;
                var oldConditionalBranches = node.conditionalBranches.length;
                node.conditionalBranches = properties.conditionalBranches != null ?
                    properties.conditionalBranches.map(function (condition) { return models.createCondition({ condition: condition }); }) :
                    [models.alwaysCondition()];
                var newConditionalBranches = node.conditionalBranches.length;
                if (forms.isRepeatingContainerNode(node)) {
                    var repNode = node;
                    repNode.formulaReps = properties.formulaReps != null ?
                        models.createFormula({ formula: properties.formulaReps }) :
                        undefined;
                    repNode.minReps = properties.minReps;
                    repNode.maxReps = properties.maxReps;
                }
                if (forms.isField(node)) {
                    var field = node;
                    field.description = properties.description;
                    field.defaultValue = properties.defaultValue;
                    field.formula = properties.formula != null ?
                        models.createFormula({ formula: properties.formula }) :
                        undefined;
                    var forceValue = properties.value;
                    var notEmpty = properties.notEmpty;
                    var validationConditions = properties.validationConditions;
                    var minValue = parseInt(properties.minValue, 10);
                    var maxValue = parseInt(properties.maxValue, 10);
                    var minDigits = parseInt(properties.minDigits, 10);
                    var maxDigits = parseInt(properties.maxDigits, 10);
                    if (isNaN(minValue)) {
                        minValue = null;
                    }
                    if (isNaN(maxValue)) {
                        maxValue = null;
                    }
                    if (isNaN(minDigits)) {
                        minDigits = null;
                    }
                    if (isNaN(maxDigits)) {
                        maxDigits = null;
                    }
                    if (forceValue != null || notEmpty != null ||
                        (validationConditions != null && validationConditions.length > 0) ||
                        minValue != null || maxValue != null || minDigits != null ||
                        maxDigits != null) {
                        var validation = field.validation || forms.createValidationGroup({});
                        validation.forceValue = forceValue;
                        validation.notEmpty = notEmpty ? forms.notEmptyValidation() : undefined;
                        validation.minValue = minValue != null ? forms.minValidation(minValue) : undefined;
                        validation.maxValue = maxValue != null ? forms.maxValidation(maxValue) : undefined;
                        validation.minDigits =
                            minDigits != null ? forms.minDigitsValidation(minDigits) : undefined;
                        validation.maxDigits =
                            maxDigits != null ? forms.maxDigitsValidation(maxDigits) : undefined;
                        validation.conditions =
                            (validationConditions ||
                                []).map(function (c) { return forms.createValidation({
                                condition: c.condition,
                                errorMessage: c.errorMessage
                            }); });
                        field.validation = validation;
                    }
                    else {
                        field.validation = undefined;
                    }
                    var notEmptyWarn = properties.notEmptyWarning;
                    var warningConditions = properties.warningConditions;
                    if (notEmptyWarn != null ||
                        (warningConditions != null && warningConditions.length > 0)) {
                        var warning = field.warning || forms.createWarningGroup({});
                        warning.notEmpty = notEmptyWarn ? forms.notEmptyWarning() : undefined;
                        warning.conditions =
                            (warningConditions ||
                                []).map(function (w) { return forms.createWarning({
                                condition: w.condition,
                                warningMessage: w.warningMessage
                            }); });
                        field.warning = warning;
                    }
                    else {
                        field.warning = undefined;
                    }
                    field.nextSlideCondition = properties.nextSlideCondition != null ?
                        models.createCondition({ condition: properties.nextSlideCondition }) :
                        undefined;
                    field.size = properties.size;
                    field.defaultValue = properties.defaultValue;
                    if (forms.isFieldWithChoices(field)) {
                        var fwc = field;
                        fwc.choicesOriginRef = properties.choicesOriginRef;
                        fwc.forceExpanded = properties.forceExpanded;
                        fwc.forceNarrow = properties.forceNarrow;
                        fwc.triggerConditions = (properties.triggerConditions ||
                            []).map(function (t) { return models.createCondition({ condition: t }); });
                    }
                }
                _this._editedNodeEntry.next(null);
                return function (nodes) {
                    var cn = getNodeContainer({ nodes: nodes }, origNode);
                    if (cn != null) {
                        // TODO: @trik check this, was always true?
                        // if (cn instanceof AjfNode) {
                        var replaceNodes = cn.nodes === nodes;
                        var idx = cn.nodes.indexOf(origNode);
                        var newNodes = cn.nodes.slice(0, idx);
                        newNodes.push(node);
                        newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                        cn.nodes = newNodes;
                        if (replaceNodes) {
                            nodes = newNodes;
                        }
                        else {
                            nodes = nodes.slice(0);
                        }
                        // } else {
                        //   const idx = nodes.indexOf(origNode);
                        //   nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
                        // }
                        if (newConditionalBranches < oldConditionalBranches) {
                            for (var i = newConditionalBranches; i < oldConditionalBranches; i++) {
                                nodes = deleteNodeSubtree(nodes, node, i);
                            }
                        }
                    }
                    return nodes;
                };
            }))
                .subscribe(this._nodesUpdates);
        };
        AjfFormBuilderService.prototype._initDeleteNode = function () {
            var _this = this;
            this._deleteNodeEntryEvent
                .pipe(operators.map(function (nodeEntry) {
                _this._beforeNodesUpdate.emit();
                return function (nodes) {
                    var node = nodeEntry.node;
                    var cn = getNodeContainer({ nodes: nodes }, node);
                    if (cn != null) {
                        var replaceNodes = cn.nodes === nodes;
                        var idx = cn.nodes.indexOf(node);
                        var newNodes = cn.nodes.slice(0, idx);
                        newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                        cn.nodes = newNodes;
                        if (replaceNodes) {
                            nodes = newNodes;
                        }
                        else {
                            nodes = nodes.slice(0);
                        }
                    }
                    return nodes;
                };
            }))
                .subscribe(this._nodesUpdates);
        };
        /**
         * Initializes the subscription to the moveNodeEntryEvent.
         */
        AjfFormBuilderService.prototype._initMoveNode = function () {
            var _this = this;
            this._moveNodeSub.unsubscribe();
            this._moveNodeSub =
                this._moveNodeEntryEvent
                    .pipe(operators.map(function (moveEvent) {
                    _this._beforeNodesUpdate.emit();
                    return function (nodes) {
                        var nodeEntry = moveEvent.nodeEntry;
                        var node = nodeEntry.node;
                        var cn = getNodeContainer({ nodes: nodes }, node);
                        var newNodes = nodes;
                        if (cn != null) {
                            var replaceNodes = cn.nodes === nodes;
                            newNodes = cn.nodes;
                            dragDrop.moveItemInArray(newNodes, moveEvent.fromIndex, moveEvent.toIndex);
                            newNodes = _this._updateNodesList(cn.id, newNodes);
                            cn.nodes = newNodes;
                            if (replaceNodes) {
                                nodes = newNodes;
                            }
                            else {
                                nodes = nodes.slice(0);
                            }
                        }
                        return nodes;
                    };
                }))
                    .subscribe(this._nodesUpdates);
        };
        /**
         * Updates the "id" and "parent" fields of a modified or rearranged list of nodes.
         * @param containerId The id of the parent container of the list.
         * @param nodesList The list of nodes to be updated.
         */
        AjfFormBuilderService.prototype._updateNodesList = function (containerId, nodesList) {
            if (!nodesList.length) {
                return [];
            }
            var contId = containerId != undefined ? containerId : 0;
            for (var idx = 0; idx < nodesList.length; idx++) {
                var currentNode = nodesList[idx];
                currentNode.id = (contId * 1000) + idx + 1;
                currentNode.parent = idx == 0 ? contId : (contId * 1000) + idx;
                if (currentNode.nodeType == forms.AjfNodeType.AjfSlide ||
                    currentNode.nodeType == forms.AjfNodeType.AjfRepeatingSlide) {
                    var currentSlide = currentNode;
                    if (currentSlide.nodes) {
                        this._updateNodesList(currentSlide.id, currentSlide.nodes);
                    }
                }
            }
            return nodesList;
        };
        return AjfFormBuilderService;
    }());
    AjfFormBuilderService.decorators = [
        { type: core.Injectable }
    ];
    AjfFormBuilderService.ctorParameters = function () { return []; };

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
    var AjfFbChoicesOriginEditorDialog = /** @class */ (function () {
        function AjfFbChoicesOriginEditorDialog(_service) {
            this._service = _service;
            this._choicesOrigin =
                this._service.editedChoicesOrigin.pipe(operators.filter(function (c) { return c != null; }), operators.map(function (c) { return c; }));
        }
        Object.defineProperty(AjfFbChoicesOriginEditorDialog.prototype, "choicesOrigin", {
            get: function () {
                return this._choicesOrigin;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbChoicesOriginEditorDialog.prototype.saveChoicesOrigin = function () {
            this._service.saveChoicesOrigin({ label: this.editor.label, name: this.editor.name, choices: this.editor.choicesArr });
        };
        AjfFbChoicesOriginEditorDialog.prototype.cancelChoicesOriginEdit = function () {
            this._service.cancelChoicesOriginEdit();
        };
        return AjfFbChoicesOriginEditorDialog;
    }());
    AjfFbChoicesOriginEditorDialog.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-choices-origin-editor-dialog',
                    template: "<h3 matDialogTitle>{{'Edit choices origin'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n    *ngIf=\"choicesOrigin|async as co\"\n    [choicesOrigin]=\"co!\"\n  ></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveChoicesOrigin()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"cancelChoicesOriginEdit()\">\n    {{'Close'|transloco}}\n  </button>\n</mat-dialog-actions>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["\n"]
                },] }
    ];
    AjfFbChoicesOriginEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
    AjfFbChoicesOriginEditorDialog.propDecorators = {
        editor: [{ type: core.ViewChild, args: [AjfFbChoicesOriginEditor, { static: false },] }]
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
    var AjfFbConditionEditor = /** @class */ (function () {
        function AjfFbConditionEditor(_) {
        }
        Object.defineProperty(AjfFbConditionEditor.prototype, "fields", {
            get: function () {
                return this._fields;
            },
            set: function (fields) {
                this._fields = fields;
                this._updateVariables();
            },
            enumerable: false,
            configurable: true
        });
        AjfFbConditionEditor.prototype.insertVariable = function (variable) {
            if (this.monacoEditor != null && this.monacoEditor.editor != null) {
                var editor = this.monacoEditor.editor;
                var value = editor.getValue().split('\n');
                var position = editor.getPosition();
                var ln = position.lineNumber - 1;
                var line = value[ln];
                var col = position.column - 1;
                line = line.substring(0, col) + variable + line.substring(col);
                value[ln] = line;
                position.column += variable.length;
                this.monacoEditor.value = value.join('\n');
                editor.setPosition(position);
                editor.focus();
                this.editedValue = editor.getValue();
            }
        };
        AjfFbConditionEditor.prototype.onEditorInit = function () {
            monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({ noSemanticValidation: false, noSyntaxValidation: false });
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2015,
                allowNonTsExtensions: true,
                allowJs: true,
                module: monaco.languages.typescript.ModuleKind.None
            });
            try {
                monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-variables.d.ts');
            }
            catch (e) {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                    '';
            }
            try {
                monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-functions.d.ts');
            }
            catch (e) {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                    '';
            }
            this._updateVariables();
            this._updateFunctions();
        };
        AjfFbConditionEditor.prototype._updateVariables = function () {
            var _this = this;
            if (this._fields == null) {
                return;
            }
            try {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                    this._fields
                        .map(function (field) {
                        return "declare const " + field.name + ": " + _this._fieldVarType(field.fieldType) + ";";
                    })
                        .join('\n');
            }
            catch (e) {
            }
        };
        AjfFbConditionEditor.prototype._updateFunctions = function () {
            try {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                    models.AjfExpressionUtils.UTIL_FUNCTIONS;
            }
            catch (e) {
            }
        };
        AjfFbConditionEditor.prototype._fieldVarType = function (fieldType) {
            switch (fieldType) {
                case forms.AjfFieldType.Boolean:
                    return 'boolean';
                case forms.AjfFieldType.Date:
                case forms.AjfFieldType.DateInput:
                case forms.AjfFieldType.Time:
                    return 'Date';
                case forms.AjfFieldType.Empty:
                    return 'void';
                case forms.AjfFieldType.Formula:
                    return 'number';
                case forms.AjfFieldType.MultipleChoice:
                case forms.AjfFieldType.SingleChoice:
                    return 'any';
                case forms.AjfFieldType.Number:
                    return 'number';
                case forms.AjfFieldType.Table:
                    return 'Array';
                case forms.AjfFieldType.String:
                case forms.AjfFieldType.Text:
                    return 'string';
            }
            return null;
        };
        return AjfFbConditionEditor;
    }());
    AjfFbConditionEditor.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-condition-editor',
                    template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"]
                },] }
    ];
    AjfFbConditionEditor.ctorParameters = function () { return [
        { type: forms.AjfValidationService }
    ]; };
    AjfFbConditionEditor.propDecorators = {
        monacoEditor: [{ type: core.ViewChild, args: [monacoEditor.AjfMonacoEditor, { static: true },] }],
        fields: [{ type: core.Input }],
        condition: [{ type: core.Input }]
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
    var AjfFbConditionEditorDialog = /** @class */ (function () {
        function AjfFbConditionEditorDialog(service, dialogRef) {
            this.dialogRef = dialogRef;
            this._fields = service.flatFields.pipe(operators.map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
        }
        Object.defineProperty(AjfFbConditionEditorDialog.prototype, "fields", {
            get: function () {
                return this._fields;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbConditionEditorDialog.prototype.saveCondition = function () {
            if (this.editor == null) {
                return;
            }
            var newValue = this.editor.editedValue;
            this.dialogRef.close(newValue);
        };
        return AjfFbConditionEditorDialog;
    }());
    AjfFbConditionEditorDialog.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-condition-editor-dialog',
                    template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
                },] }
    ];
    AjfFbConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: dialog.MatDialogRef }
    ]; };
    AjfFbConditionEditorDialog.propDecorators = {
        editor: [{ type: core.ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
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
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param fbService The AjfFormBuilderService.
     * @param nodeEntry The current nodeEntry, if present.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    function onDropProcess(event, fbService, nodeEntry, content) {
        if (content === void 0) { content = false; }
        var itemData = event.item.data;
        var containerId = event.container.id;
        if (!itemData.node) {
            if (nodeEntry == null && containerId === 'slides-list') {
                fbService.insertNode(itemData, null, 0, content, event.currentIndex);
                return;
            }
            var emptySlot = content ? { parent: nodeEntry.node, parentNode: 0 } :
                nodeEntry;
            fbService.insertNode(itemData, emptySlot.parent, emptySlot.parentNode, content, event.currentIndex);
            return;
        }
        var previousIndex = event.previousIndex;
        var currentIndex = event.currentIndex;
        fbService.moveNodeEntry(event.item.data, previousIndex, currentIndex);
    }
    /**
     * Disables the drag&drop of Slide items.
     * @param item The dragged item.
     */
    function disableSlideDropPredicate(item) {
        return !item.data.isSlide;
    }
    /**
     * Disables the drag&drop of Field items.
     * @param item The dragged item.
     */
    function disableFieldDropPredicate(item) {
        if (!item.data.isSlide) {
            return false;
        }
        return true;
    }

    var AjfFbStringIdentifierDialogComponent = /** @class */ (function () {
        function AjfFbStringIdentifierDialogComponent(_service, _cdr) {
            var _this = this;
            this._service = _service;
            this._cdr = _cdr;
            this.dataSource = new table.MatTableDataSource();
            this.displayedColumns = ['label', 'value', 'show', 'delete'];
            this.separatorKeysCodes = [keycodes.ENTER, keycodes.COMMA];
            this._stringIdentifierSub = rxjs.Subscription.EMPTY;
            this._stringIdentifierSub = _service.stringIdentifier.subscribe(function (identifier) {
                _this.dataSource.data = __spreadArray([], __read(identifier));
            });
            this.fields$ = _service.flatFields.pipe(operators.map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); })
                .map(function (f) { return f.name; })
                .filter(function (f) { return f.length > 0; }); }), operators.shareReplay(1));
        }
        AjfFbStringIdentifierDialogComponent.prototype.addRow = function () {
            this.dataSource.data = __spreadArray(__spreadArray([], __read(this.dataSource.data)), [{ label: '', value: [], show: undefined }]);
        };
        AjfFbStringIdentifierDialogComponent.prototype.deleteRow = function (rowIdx) {
            this.dataSource.data = __spreadArray(__spreadArray([], __read(this.dataSource.data.slice(0, rowIdx))), __read(this.dataSource.data.slice(rowIdx + 1)));
        };
        AjfFbStringIdentifierDialogComponent.prototype.addValue = function (row, evt, valueInput) {
            if (evt.value.length === 0) {
                return;
            }
            row.value = __spreadArray(__spreadArray([], __read(row.value)), [evt.value]);
            valueInput.value = '';
            this._cdr.markForCheck();
        };
        AjfFbStringIdentifierDialogComponent.prototype.removeValue = function (row, value) {
            var idx = row.value.indexOf(value);
            if (idx > -1) {
                row.value = __spreadArray(__spreadArray([], __read(row.value.slice(0, idx))), __read(row.value.slice(idx + 1)));
                this._cdr.markForCheck();
            }
        };
        AjfFbStringIdentifierDialogComponent.prototype.ngOnDestroy = function () {
            this._stringIdentifierSub.unsubscribe();
        };
        AjfFbStringIdentifierDialogComponent.prototype.saveStringIdentifier = function () {
            this._service.saveStringIdentifier(this.dataSource.data);
        };
        AjfFbStringIdentifierDialogComponent.prototype.selected = function (row, evt) {
            row.value = __spreadArray(__spreadArray([], __read(row.value)), [evt.option.value]);
            this._cdr.markForCheck();
        };
        return AjfFbStringIdentifierDialogComponent;
    }());
    AjfFbStringIdentifierDialogComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-string-identifier-dialog',
                    template: "<h3 matDialogTitle>{{'Edit identifier'|transloco}}</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span>{{'Add value'|transloco}}</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef>{{'Label'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input\n            matInput\n            [placeholder]=\"'Label'|transloco\"\n            autofocus\n            [(ngModel)]=\"row.label\"\n          />\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef>{{'Value'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n              *ngFor=\"let field of row.value\"\n              (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n            #valueInput\n            [ngModel]=\"row.value\"\n            [matAutocomplete]=\"valueAc\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n            [matChipInputAddOnBlur]=\"true\"\n            (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n            [placeholder]=\"'Value'|transloco\"\n          />\n          <mat-autocomplete\n            #valueAc=\"matAutocomplete\"\n            (optionSelected)=\"selected(row, $event)\"\n          >\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\"\n              >{{field}}</mat-option\n            >\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"show\">\n      <mat-header-cell *matHeaderCellDef>{{'Show'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-select matNativeControl [(ngModel)]=\"row.show\">\n            <mat-option value=\"all\">{{'All'|transloco}}</mat-option>\n            <mat-option value=\"first\">{{'First'|transloco}}</mat-option>\n            <mat-option value=\"last\">{{'Last'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef\n        >{{'Delete'|transloco}}</mat-header-cell\n      >\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button matDialogClose (click)=\"saveStringIdentifier()\">\n    {{'Save'|transloco}}\n  </button>\n</mat-dialog-actions>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfFbStringIdentifierDialogComponent.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: core.ChangeDetectorRef }
    ]; };

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
    var AjfFormBuilder = /** @class */ (function () {
        function AjfFormBuilder(_service, _dialog) {
            var _this = this;
            this._service = _service;
            this._dialog = _dialog;
            this._globalExpanded = false;
            /**
             * The list of the ids of all the dropLists connected to the formbuilder source list.
             */
            this._connectedDropLists = this._service.connectedDropLists;
            this._vc = new core.EventEmitter();
            this._init = false;
            this._editConditionSub = rxjs.Subscription.EMPTY;
            this._beforeNodesUpdateSub = rxjs.Subscription.EMPTY;
            this._editChoicesOriginSub = rxjs.Subscription.EMPTY;
            this._stringIdentifierSub = rxjs.Subscription.EMPTY;
            this._nodeTypes = _service.availableNodeTypes;
            this._nodeEntriesTree = _service.nodeEntriesTree;
            this._choicesOrigins = _service.choicesOrigins;
            this._editConditionSub =
                this._service.editedCondition.subscribe(function (condition) {
                    if (_this._editConditionDialog != null) {
                        _this._editConditionDialog.close();
                        _this._editConditionDialog = null;
                    }
                    if (condition != null) {
                        _this._editConditionDialog =
                            _this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
                    }
                });
            this._editChoicesOriginSub =
                this._service.editedChoicesOrigin.subscribe(function (choicesOrigin) {
                    if (_this._editChoicesOriginDialog != null) {
                        _this._editChoicesOriginDialog.close();
                        _this._editChoicesOriginDialog = null;
                    }
                    if (choicesOrigin != null) {
                        _this._editChoicesOriginDialog =
                            _this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                    }
                });
            this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(function () {
                if (_this.designerCont == null) {
                    return;
                }
                _this._lastScrollTop = _this.designerCont.nativeElement.scrollTop;
            });
            this.nodeEntriesTree.pipe(operators.sample(this._vc)).subscribe(function () {
                if (_this.designerCont == null) {
                    return;
                }
                _this.designerCont.nativeElement.scrollTop = _this._lastScrollTop;
            });
            this._stringIdentifierSub = this._service.stringIdentifier.subscribe(function () { });
        }
        Object.defineProperty(AjfFormBuilder.prototype, "form", {
            get: function () {
                return this._form;
            },
            set: function (form) {
                if (this._form !== form) {
                    this._form = form;
                    if (this._init) {
                        this._setCurrentForm();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilder.prototype, "nodeTypes", {
            get: function () {
                return this._nodeTypes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilder.prototype, "nodeEntriesTree", {
            get: function () {
                return this._nodeEntriesTree;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilder.prototype, "choicesOrigins", {
            get: function () {
                return this._choicesOrigins;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilder.prototype, "isGlobalExpanded", {
            get: function () {
                return this._globalExpanded;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormBuilder.prototype, "connectedDropLists", {
            get: function () {
                return this._connectedDropLists;
            },
            enumerable: false,
            configurable: true
        });
        AjfFormBuilder.prototype.ngAfterViewChecked = function () {
            this._vc.emit();
        };
        AjfFormBuilder.prototype.ngAfterContentInit = function () {
            this._setCurrentForm();
            this._init = true;
        };
        AjfFormBuilder.prototype.ngOnDestroy = function () {
            this._editConditionSub.unsubscribe();
            this._beforeNodesUpdateSub.unsubscribe();
            this._editChoicesOriginSub.unsubscribe();
            this._stringIdentifierSub.unsubscribe();
            this._service.setForm(null);
        };
        AjfFormBuilder.prototype.createChoicesOrigin = function () {
            this._service.createChoicesOrigin();
        };
        AjfFormBuilder.prototype.disableDrop = function () {
            return false;
        };
        AjfFormBuilder.prototype.disableFieldDrop = function (item) {
            return disableFieldDropPredicate(item);
        };
        /**
         * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
         * @param event The drop event.
         * @param content True if the current nodeEntry contains other nodeEntries.
         */
        AjfFormBuilder.prototype.onDrop = function (event, content) {
            if (content === void 0) { content = false; }
            onDropProcess(event, this._service, null, content);
        };
        AjfFormBuilder.prototype.editChoicesOrigin = function (choicesOrigin) {
            this._service.editChoicesOrigin(choicesOrigin);
        };
        AjfFormBuilder.prototype.editStringIdentifier = function () {
            if (this._stringIdentifierDialog != null) {
                this._stringIdentifierDialog.close();
                this._stringIdentifierDialog = null;
            }
            this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, { disableClose: true, width: '60%', height: '60%' });
        };
        AjfFormBuilder.prototype.expandAll = function () {
            this._globalExpanded = true;
        };
        AjfFormBuilder.prototype.collapseAll = function () {
            this._globalExpanded = false;
        };
        AjfFormBuilder.prototype.expandToggle = function (evt) {
            if (evt.checked) {
                this.expandAll();
            }
            else {
                this.collapseAll();
            }
        };
        AjfFormBuilder.prototype._setCurrentForm = function () {
            this._service.setForm(this._form);
        };
        return AjfFormBuilder;
    }());
    AjfFormBuilder.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-form-builder',
                    template: "<mat-toolbar>\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\">\n    {{'Choices'|transloco}}\n  </button>\n  <button mat-button (click)=\"editStringIdentifier()\">\n    {{'Identifier'|transloco}}\n  </button>\n  <button\n    mat-icon-button\n    aria-label=\"Collapsed\"\n    matTooltip=\"Keep slides collapsed\"\n  >\n    <mat-icon>unfold_less</mat-icon>\n  </button>\n  <mat-slide-toggle\n    color=\"primary\"\n    (change)=\"expandToggle($event)\"\n  ></mat-slide-toggle>\n  <button\n    mat-icon-button\n    aria-label=\"Expanded\"\n    matTooltip=\"Keep slides expanded\"\n  >\n    <mat-icon>unfold_more</mat-icon>\n  </button>\n  <mat-menu #choicesMenu>\n    <button (click)=\"createChoicesOrigin()\" mat-menu-item>\n      {{'New..'|transloco}}\n    </button>\n    <ng-container *ngIf=\"choicesOrigins|async as cos\">\n      <button\n        *ngFor=\"let choicesOrigin of cos\"\n        (click)=\"editChoicesOrigin(choicesOrigin)\"\n        mat-menu-item\n      >\n        {{ (choicesOrigin.label || choicesOrigin.name)| transloco }}\n      </button>\n    </ng-container>\n  </mat-menu>\n  <span class=\"ajf-spacer\"></span>\n  <button mat-icon-button (click)=\"rightSidenav.toggle()\">\n    <mat-icon>settings</mat-icon>\n  </button>\n</mat-toolbar>\n<mat-drawer-container cdkDropListGroup>\n  <mat-drawer #leftSidenav position=\"start\" mode=\"over\">\n    <div\n      #sourceDropList\n      cdkDropList\n      [cdkDropListConnectedTo]=\"(connectedDropLists|async)!\"\n      [cdkDropListEnterPredicate]=\"disableDrop\"\n      [cdkDropListData]=\"nodeTypes\"\n    >\n      <ajf-fb-node-type-entry\n        *ngFor=\"let nodeType of nodeTypes\"\n        cdkDrag\n        [cdkDragData]=\"nodeType\"\n        (cdkDragStarted)=\"leftSidenav.close()\"\n        [nodeType]=\"nodeType\"\n      ></ajf-fb-node-type-entry>\n    </div>\n  </mat-drawer>\n  <mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </mat-drawer>\n  <div #designer class=\"ajf-designer\">\n    <ajf-fb-node-entry\n      id=\"slides-list\"\n      cdkDropList\n      (cdkDropListDropped)=\"onDrop($event)\"\n      [cdkDropListEnterPredicate]=\"disableFieldDrop\"\n      *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\"\n      [isExpanded]=\"isGlobalExpanded\"\n      [isFirst]=\"isFirst\"\n      [nodeEntry]=\"nodeEntry\"\n    ></ajf-fb-node-entry>\n  </div>\n</mat-drawer-container>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["ajf-form-builder{display:flex;position:relative;min-height:300px;flex-direction:column;align-items:stretch}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{flex:1}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}\n"]
                },] }
    ];
    AjfFormBuilder.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: dialog.MatDialog }
    ]; };
    AjfFormBuilder.propDecorators = {
        designerCont: [{ type: core.ViewChild, args: ['designer', { static: true },] }],
        form: [{ type: core.Input }]
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
    var branchColors = [
        '#F44336',
        '#4CAF50',
        '#3F51B5',
        '#FFC107',
        '#795548', // BROWN
    ];
    var AjfFbNodeEntry = /** @class */ (function () {
        function AjfFbNodeEntry(_service) {
            this._service = _service;
            this._hasContent = false;
            this._isFirst = false;
            this._isNodeEntry = false;
            this._isExpanded = false;
            this._level = 0;
            this._isDraggable = true;
            this._branchColors = branchColors.slice(0);
            this._dropZones = ['fbdz-node'];
            this._slideDropZones = ['fbdz-slide'];
            this._originOffset = 0;
            this._originLeftMargin = '0';
            this._firstBranchColor = branchColors[0];
            this._branchLinesSubscription = rxjs.Subscription.EMPTY;
            this._childEntriesSubscription = rxjs.Subscription.EMPTY;
            this._currentEditedNode = this._service.editedNodeEntry;
        }
        Object.defineProperty(AjfFbNodeEntry.prototype, "hasContent", {
            get: function () {
                return this._hasContent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "isFirst", {
            get: function () {
                return this._isFirst;
            },
            set: function (isFirst) {
                this._isFirst = isFirst;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "isNodeEntry", {
            get: function () {
                return this._isNodeEntry;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "isExpanded", {
            get: function () {
                return this._isExpanded;
            },
            set: function (exp) {
                var _this = this;
                this._isExpanded = exp;
                setTimeout(function () { return _this._updateBranchHeights(); }, 400);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "nodeEntry", {
            get: function () {
                return this._nodeEntry;
            },
            set: function (nodeEntry) {
                this._nodeEntry = nodeEntry;
                if (nodeEntry != null && nodeEntry.node !== void 0) {
                    var ne = nodeEntry;
                    this._isNodeEntry = true;
                    var node = ne.node;
                    this._hasContent = node != null && forms.isContainerNode(node);
                }
                else {
                    this._isNodeEntry = false;
                    this._hasContent = false;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "level", {
            get: function () {
                return this._level;
            },
            set: function (value) {
                this._level = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "isDraggable", {
            get: function () {
                return this._isDraggable;
            },
            set: function (draggable) {
                this._isDraggable = draggable;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "realNodeEntry", {
            get: function () {
                return this._nodeEntry;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "branchColors", {
            get: function () {
                return this._branchColors;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "dropZones", {
            get: function () {
                return this._dropZones;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "slideDropZones", {
            get: function () {
                return this._slideDropZones;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "originOffset", {
            get: function () {
                return this._originOffset;
            },
            set: function (originOffset) {
                this._originOffset = originOffset;
                this._originLeftMargin = this._originOffset * 4 + "px";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "originLeftMargin", {
            get: function () {
                return this._originLeftMargin;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "firstBranchColor", {
            get: function () {
                return this._firstBranchColor;
            },
            set: function (firstBranchColor) {
                var idx = branchColors.indexOf(firstBranchColor);
                if (idx > 0) {
                    this._firstBranchColor = firstBranchColor;
                    this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
                }
                else {
                    this._firstBranchColor = branchColors[0];
                    this._branchColors = branchColors.slice(0);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeEntry.prototype, "currentEditedNode", {
            get: function () {
                return this._currentEditedNode;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbNodeEntry.prototype.onResize = function () { };
        AjfFbNodeEntry.prototype.edit = function (evt) {
            evt.stopPropagation();
            if (this.nodeEntry == null || !this.isNodeEntry) {
                return;
            }
            this._service.editNodeEntry(this.nodeEntry);
        };
        AjfFbNodeEntry.prototype.delete = function (evt) {
            evt.stopPropagation();
            if (this.nodeEntry == null || !this.isNodeEntry) {
                return;
            }
            this._service.deleteNodeEntry(this.nodeEntry);
        };
        AjfFbNodeEntry.prototype.isLastNode = function () {
            if (!this.realNodeEntry || !this.realNodeEntry.children) {
                return false;
            }
            return !this.realNodeEntry.children[0].children;
        };
        AjfFbNodeEntry.prototype.isSlide = function (node) {
            return forms.isSlidesNode(node);
        };
        AjfFbNodeEntry.prototype.ngAfterViewInit = function () {
            var _this = this;
            setTimeout(function () { return _this._updateBranchHeights(); });
            this._childEntriesSubscription = this.childEntries.changes.subscribe(function () {
                _this._updateBranchHeights();
            });
        };
        AjfFbNodeEntry.prototype.ngOnDestroy = function () {
            this._branchLinesSubscription.unsubscribe();
            this._childEntriesSubscription.unsubscribe();
        };
        /**
         * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
         * @param event The drop event.
         * @param content True if the current nodeEntry contains other nodeEntries.
         */
        AjfFbNodeEntry.prototype.onDrop = function (event, content) {
            if (content === void 0) { content = false; }
            onDropProcess(event, this._service, this._nodeEntry, content);
        };
        /**
         * Assigns a progressive id to the dropList, to connect it to the FormBuilder source list.
         * @param empty True if the list is marked as empty.
         */
        AjfFbNodeEntry.prototype.assignId = function (empty) {
            if (empty === void 0) { empty = false; }
            return this._service.assignListId(this.realNodeEntry.node, empty);
        };
        AjfFbNodeEntry.prototype.disableSlideDrop = function (item) {
            return disableSlideDropPredicate(item);
        };
        AjfFbNodeEntry.prototype.disableFieldDrop = function (item) {
            return disableFieldDropPredicate(item);
        };
        AjfFbNodeEntry.prototype.emptyAreaDropPredicate = function () {
            var _this = this;
            return function (item, _drop) {
                if (_this._level > 0) {
                    return !item.data.isSlide;
                }
                return item.data.isSlide || false;
            };
        };
        AjfFbNodeEntry.prototype._updateBranchHeights = function () {
            if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
                this.childEntries == null) {
                return;
            }
            var nodeEntry = this.nodeEntry;
            var branchLines = this.branchLines.toArray();
            var sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
            var childEntries = this.childEntries.toArray().slice(sliceIdx);
            if (branchLines.length != childEntries.length) {
                return;
            }
            branchLines.forEach(function (bl, idx) {
                var ce = childEntries[idx];
                bl.height = ce.nativeElement.offsetTop;
            });
        };
        return AjfFbNodeEntry;
    }());
    AjfFbNodeEntry.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-node-entry',
                    template: "<ng-container *ngIf=\"nodeEntry != null ; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry && !isLastNode()\">\n    <ajf-fb-branch-line\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n      [offset]=\"idx\"\n      [color]=\"branchColors[idx]\"\n    ></ajf-fb-branch-line>\n  </ng-template>\n\n  <div\n    class=\"mat-card-container\"\n    [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\"\n  >\n    <div\n      *ngIf=\"!isFirst\"\n      class=\"ajf-origin-line\"\n      [style.margin-left]=\"originLeftMargin\"\n      [style.border-color]=\"firstBranchColor\"\n    ></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <ng-container *ngIf=\"!isDraggable; else draggable\">\n        <mat-card>\n          <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-card>\n      </ng-container>\n\n      <ng-template #draggable>\n        <mat-card cdkDrag [cdkDragData]=\"realNodeEntry\" class=\"ajf-draggable-box\">\n          <ng-container\n            *ngIf=\"isSlide(realNodeEntry.node); else fieldPanel\"\n          >\n            <ng-container *ngTemplateOutlet=\"slidePanel\"></ng-container>\n          </ng-container>\n        </mat-card>\n      </ng-template>\n\n      <ng-template #slidePanel>\n        <mat-expansion-panel\n          [expanded]=\"isExpanded\"\n          (opened)=\"isExpanded = true\"\n          (closed)=\"isExpanded = false\"\n          class=\"mat-elevation-z\"\n        >\n          <mat-expansion-panel-header>\n            <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          </mat-expansion-panel-header>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-expansion-panel>\n      </ng-template>\n\n      <ng-template #fieldPanel>\n        <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n        <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n      </ng-template>\n\n      <ng-template #cardTitle>\n        <div class=\"ajf-title-row\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          <span\n            class=\"ajf-title\"\n            [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | transloco\"\n          ></span>\n          <span\n            *ngIf=\"realNodeEntry.node.visibility && realNodeEntry.node.visibility?.condition !== 'true'\"\n            class=\"ajf-visibility-condition\"\n            [innerHTML]=\"'Condition: (' + realNodeEntry.node.visibility?.condition + ')'\"\n          >\n          </span>\n          <span class=\"ajf-actions\">\n            <button\n              [disabled]=\"(currentEditedNode|async) == nodeEntry\"\n              (click)=\"edit($event)\"\n              mat-icon-button\n            >\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button\n              [disabled]=\"(currentEditedNode|async) == null\"\n              (click)=\"delete($event)\"\n              mat-icon-button\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n      </ng-template>\n\n      <ng-template #cardContent>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n            cdkDropList\n            class=\"ajf-fields-list\"\n            *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n            [id]=\"assignId()\"\n            [level]=\"level + 1\"\n            [isFirst]=\"isFirstChild\"\n            [firstBranchColor]=\"branchColors[idx]\"\n            [nodeEntry]=\"contentEntry\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            [isExpanded]=\"isExpanded\"\n          ></ajf-fb-node-entry>\n          <mat-card\n            class=\"ajf-empty\"\n            *ngIf=\"realNodeEntry.content.length === 0\"\n            cdkDropList\n            [id]=\"assignId(true)\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            ><mat-card-title>Drop your fields here</mat-card-title></mat-card\n          >\n        </div>\n      </ng-template>\n    </ng-template>\n  </div>\n\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ng-container\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n    >\n      <ajf-fb-node-entry\n        *ngIf=\"!isLastNode()\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"\n        [isExpanded]=\"isExpanded\"\n      ></ajf-fb-node-entry>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card\n      class=\"ajf-empty\"\n      cdkDropList\n      [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n      (cdkDropListDropped)=\"onDrop($event)\"\n      ><mat-card-title>Drop your slides here</mat-card-title>\n    </mat-card>\n  </div>\n</ng-template>\n",
                    host: { '(window.resize)': 'onResize()' },
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:#999}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:#ccc}ajf-fb-node-entry .mat-card-container mat-card.ajf-draggable-box{padding:20px 10px;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;color:rgba(0,0,0,.87);box-sizing:border-box;cursor:move;background:#fff;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:0;min-height:60px}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform 250ms cubic-bezier(0, 0, 0.2, 1)}\n"]
                },] }
    ];
    AjfFbNodeEntry.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
    AjfFbNodeEntry.propDecorators = {
        branchLines: [{ type: core.ViewChildren, args: [AjfFbBranchLine,] }],
        childEntries: [{ type: core.ViewChildren, args: [AjfFbNodeEntry, { read: core.ElementRef },] }],
        isFirst: [{ type: core.Input }],
        isExpanded: [{ type: core.Input }],
        nodeEntry: [{ type: core.Input }],
        level: [{ type: core.Input }],
        isDraggable: [{ type: core.Input }],
        originOffset: [{ type: core.Input }],
        firstBranchColor: [{ type: core.Input }]
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
    var AjfFbValidationConditionEditorDialog = /** @class */ (function () {
        function AjfFbValidationConditionEditorDialog(service, dialogRef) {
            this.dialogRef = dialogRef;
            this._fields = service.flatFields.pipe(operators.map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
        }
        Object.defineProperty(AjfFbValidationConditionEditorDialog.prototype, "fields", {
            get: function () {
                return this._fields;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbValidationConditionEditorDialog.prototype.saveCondition = function () {
            if (this.editor == null) {
                return;
            }
            var newValue = this.editor.editedValue;
            this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
        };
        return AjfFbValidationConditionEditorDialog;
    }());
    AjfFbValidationConditionEditorDialog.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-validation-condition-editor-dialog',
                    template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"errorMessage\"\n      [placeholder]=\"'Error message'|transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-validation-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
                },] }
    ];
    AjfFbValidationConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: dialog.MatDialogRef }
    ]; };
    AjfFbValidationConditionEditorDialog.propDecorators = {
        editor: [{ type: core.ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
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
    var AjfFbWarningConditionEditorDialog = /** @class */ (function () {
        function AjfFbWarningConditionEditorDialog(service, dialogRef) {
            this.dialogRef = dialogRef;
            this._fields = service.flatFields.pipe(operators.map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
        }
        Object.defineProperty(AjfFbWarningConditionEditorDialog.prototype, "fields", {
            get: function () {
                return this._fields;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbWarningConditionEditorDialog.prototype.saveCondition = function () {
            if (this.editor == null) {
                return;
            }
            var newValue = this.editor.editedValue;
            this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
        };
        return AjfFbWarningConditionEditorDialog;
    }());
    AjfFbWarningConditionEditorDialog.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-warning-condition-editor-dialog',
                    template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"warningMessage\"\n      [placeholder]=\"'Warning message' | transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-warning-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
                },] }
    ];
    AjfFbWarningConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: dialog.MatDialogRef }
    ]; };
    AjfFbWarningConditionEditorDialog.propDecorators = {
        editor: [{ type: core.ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };

    function checkRepsValidity(c) {
        var minReps = c.value.minReps;
        var maxReps = c.value.maxReps;
        if (minReps != null && maxReps != null && minReps > maxReps) {
            return { reps: 'Min repetions cannot be greater than max repetitions' };
        }
        return null;
    }
    function checkValueLimitsValidity(c) {
        var minValue = c.value.minValue;
        var maxValue = c.value.maxValue;
        if (minValue != null && maxValue != null && minValue > maxValue) {
            return { valueLimit: 'Min value cannot be greater than max value' };
        }
        return null;
    }
    function checkDigitsValidity(c) {
        var minDigits = c.value.minDigits;
        var maxDigits = c.value.maxDigits;
        if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
            return { digits: 'Min digits cannot be greater than max digits' };
        }
        return null;
    }
    var AjfFbNodeProperties = /** @class */ (function () {
        function AjfFbNodeProperties(_cdr, _service, _dialog, _fb) {
            var _this = this;
            this._cdr = _cdr;
            this._service = _service;
            this._dialog = _dialog;
            this._fb = _fb;
            this._fieldSizes = [
                { label: 'Normal', value: 'normal' }, { label: 'Small', value: 'small' },
                { label: 'Smaller', value: 'smaller' }, { label: 'Tiny', value: 'tiny' },
                { label: 'Mini', value: 'mini' }
            ];
            this._choicesOrigins = [];
            this._conditionalBranches = [];
            this._validationConditions = [];
            this._warningConditions = [];
            this.isRepeatingContainerNode = function (nodeEntry) {
                return nodeEntry != null && forms.isRepeatingContainerNode(nodeEntry.node);
            };
            this._visibilityOptSub = rxjs.Subscription.EMPTY;
            this._visibilitySub = rxjs.Subscription.EMPTY;
            this._conditionalBranchesSub = rxjs.Subscription.EMPTY;
            this._formulaRepsSub = rxjs.Subscription.EMPTY;
            this._choicesFilterSub = rxjs.Subscription.EMPTY;
            this._formulaSub = rxjs.Subscription.EMPTY;
            this._forceValueSub = rxjs.Subscription.EMPTY;
            this._validationConditionsSub = rxjs.Subscription.EMPTY;
            this._warningConditionsSub = rxjs.Subscription.EMPTY;
            this._nextSlideConditionSub = rxjs.Subscription.EMPTY;
            this._choicesOriginsSub = rxjs.Subscription.EMPTY;
            this._triggerConditionsSub = rxjs.Subscription.EMPTY;
            this._editConditionDialogSub = rxjs.Subscription.EMPTY;
            this._editValidationConditionDialogSub = rxjs.Subscription.EMPTY;
            this._editWarningConditionDialogSub = rxjs.Subscription.EMPTY;
            this._editVisibilityEvt = new core.EventEmitter();
            this._editVisibilitySub = rxjs.Subscription.EMPTY;
            this._editConditionalBranchEvt = new core.EventEmitter();
            this._editConditionalBranchSub = rxjs.Subscription.EMPTY;
            this._editFormulaRepsEvt = new core.EventEmitter();
            this._editFormulaRepsSub = rxjs.Subscription.EMPTY;
            this._editChoicesFilterEvt = new core.EventEmitter();
            this._editChoicesFilterSub = rxjs.Subscription.EMPTY;
            this._editFormulaEvt = new core.EventEmitter();
            this._editFormulaSub = rxjs.Subscription.EMPTY;
            this._editForceValueEvt = new core.EventEmitter();
            this._editForceValueSub = rxjs.Subscription.EMPTY;
            this._editValidationConditionEvt = new core.EventEmitter();
            this._editValidationConditionSub = rxjs.Subscription.EMPTY;
            this._addValidationConditionEvt = new core.EventEmitter();
            this._addValidationConditionSub = rxjs.Subscription.EMPTY;
            this._removeValidationConditionEvt = new core.EventEmitter();
            this._removeValidationConditionSub = rxjs.Subscription.EMPTY;
            this._editWarningConditionEvt = new core.EventEmitter();
            this._editWarningConditionSub = rxjs.Subscription.EMPTY;
            this._addWarningConditionEvt = new core.EventEmitter();
            this._addWarningConditionSub = rxjs.Subscription.EMPTY;
            this._removeWarningConditionEvt = new core.EventEmitter();
            this._removeWarningConditionSub = rxjs.Subscription.EMPTY;
            this._editNextSlideConditionEvt = new core.EventEmitter();
            this._editNextSlideConditionSub = rxjs.Subscription.EMPTY;
            this._editTriggerConditionEvt = new core.EventEmitter();
            this._editTriggerConditionSub = rxjs.Subscription.EMPTY;
            this._addTriggerConditionEvt = new core.EventEmitter();
            this._addTriggerConditionSub = rxjs.Subscription.EMPTY;
            this._removeTriggerConditionEvt = new core.EventEmitter();
            this._removeTriggerConditionSub = rxjs.Subscription.EMPTY;
            this._saveEvt = new core.EventEmitter();
            this._saveSub = rxjs.Subscription.EMPTY;
            this._nodeEntry = _service.editedNodeEntry;
            this._choicesOriginsSub =
                _service.choicesOrigins.subscribe(function (c) { return _this._choicesOrigins = c || []; });
            this._enabled = this._nodeEntry.pipe(operators.map(function (n) { return n != null; }));
            this._initForm();
            this._initVisibilityEdit();
            this._initConditionalBranchEdit();
            this._initFormulaRepsEdit();
            this._initChoicesFilterEdit();
            this._initFormulaEdit();
            this._initForceValueEdit();
            this._initValidationConditionEdit();
            this._initAddValidationCondition();
            this._initRemoveValidationCondition();
            this._initWarningConditionEdit();
            this._initAddWarningCondition();
            this._initRemoveWarningCondition();
            this._initNextSlideConditionEdit();
            this._initTriggerConditionEdit();
            this._initAddTriggerCondition();
            this._initRemoveTriggerCondition();
            this._initSave();
        }
        Object.defineProperty(AjfFbNodeProperties.prototype, "fieldSizes", {
            get: function () {
                return this._fieldSizes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "nodeEntry", {
            get: function () {
                return this._nodeEntry;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "choicesOrigins", {
            get: function () {
                return this._choicesOrigins;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "propertiesForm", {
            get: function () {
                return this._propertiesForm;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "hasChoices", {
            get: function () {
                return this._hasChoices;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "curVisibility", {
            get: function () {
                return this._curVisibility;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "curFormulaReps", {
            get: function () {
                return this._curFormulaReps;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "curChoicesFilter", {
            get: function () {
                return this._curChoicesFilter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "curForceValue", {
            get: function () {
                return this._curForceValue;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "curFormula", {
            get: function () {
                return this._curFormula;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "conditionalBranches", {
            get: function () {
                return this._conditionalBranches;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "validationConditions", {
            get: function () {
                return this._validationConditions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "warningConditions", {
            get: function () {
                return this._warningConditions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "nextSlideCondition", {
            get: function () {
                return this._nextSlideCondition;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFbNodeProperties.prototype, "triggerConditions", {
            get: function () {
                return this._triggerConditions;
            },
            enumerable: false,
            configurable: true
        });
        AjfFbNodeProperties.prototype.editVisibility = function () {
            this._editVisibilityEvt.emit();
        };
        AjfFbNodeProperties.prototype.editConditionalBranch = function (idx) {
            if (idx < 0 || idx >= this._conditionalBranches.length) {
                return;
            }
            this._editConditionalBranchEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.editFormulaReps = function () {
            this._editFormulaRepsEvt.emit();
        };
        AjfFbNodeProperties.prototype.editChoicesFilter = function () {
            this._editChoicesFilterEvt.emit();
        };
        AjfFbNodeProperties.prototype.editFormula = function () {
            this._editFormulaEvt.emit();
        };
        AjfFbNodeProperties.prototype.editForceValue = function () {
            this._editForceValueEvt.emit();
        };
        AjfFbNodeProperties.prototype.editValidationCondition = function (idx) {
            if (idx < 0 || idx >= this._validationConditions.length) {
                return;
            }
            this._editValidationConditionEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.addValidationCondition = function () {
            this._addValidationConditionEvt.emit();
        };
        AjfFbNodeProperties.prototype.removeValidationCondition = function (idx) {
            if (idx < 0 || idx >= this._validationConditions.length) {
                return;
            }
            this._removeValidationConditionEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.editWarningCondition = function (idx) {
            if (idx < 0 || idx >= this._warningConditions.length) {
                return;
            }
            this._editWarningConditionEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.addWarningCondition = function () {
            this._addWarningConditionEvt.emit();
        };
        AjfFbNodeProperties.prototype.removeWarningCondition = function (idx) {
            if (idx < 0 || idx >= this._warningConditions.length) {
                return;
            }
            this._removeWarningConditionEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.editNextSlideCondition = function () {
            this._editNextSlideConditionEvt.emit();
        };
        AjfFbNodeProperties.prototype.editTriggerCondition = function (idx) {
            if (idx < 0 || idx >= this._triggerConditions.length) {
                return;
            }
            this._editTriggerConditionEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.addTriggerCondition = function () {
            this._addTriggerConditionEvt.emit();
        };
        AjfFbNodeProperties.prototype.removeTriggerCondition = function (idx) {
            if (idx < 0 || idx >= this._triggerConditions.length) {
                return;
            }
            this._removeTriggerConditionEvt.emit(idx);
        };
        AjfFbNodeProperties.prototype.isField = function (nodeEntry) {
            return nodeEntry != null && forms.isField(nodeEntry.node);
        };
        AjfFbNodeProperties.prototype.isNumericField = function (node) {
            return forms.isField(node) && forms.isNumberField(node);
        };
        AjfFbNodeProperties.prototype.isFieldWithChoices = function (node) {
            return forms.isField(node) && forms.isFieldWithChoices(node);
        };
        AjfFbNodeProperties.prototype.save = function () {
            this._saveEvt.emit();
        };
        AjfFbNodeProperties.prototype.cancel = function () {
            this._service.cancelNodeEntryEdit();
        };
        AjfFbNodeProperties.prototype.ngOnDestroy = function () {
            this._choicesOriginsSub.unsubscribe();
            this._visibilityOptSub.unsubscribe();
            this._visibilitySub.unsubscribe();
            this._formulaRepsSub.unsubscribe();
            this._choicesFilterSub.unsubscribe();
            this._formulaSub.unsubscribe();
            this._forceValueSub.unsubscribe();
            this._validationConditionsSub.unsubscribe();
            this._warningConditionsSub.unsubscribe();
            this._triggerConditionsSub.unsubscribe();
            this._editConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub.unsubscribe();
            this._editChoicesFilterSub.unsubscribe();
            this._editConditionalBranchSub.unsubscribe();
            this._editVisibilitySub.unsubscribe();
            this._editFormulaRepsSub.unsubscribe();
            this._editFormulaSub.unsubscribe();
            this._editForceValueSub.unsubscribe();
            this._editValidationConditionSub.unsubscribe();
            this._editWarningConditionSub.unsubscribe();
            this._nextSlideConditionSub.unsubscribe();
            this._addTriggerConditionSub.unsubscribe();
            this._addValidationConditionSub.unsubscribe();
            this._addWarningConditionSub.unsubscribe();
            this._editNextSlideConditionSub.unsubscribe();
            this._editTriggerConditionSub.unsubscribe();
            this._removeTriggerConditionSub.unsubscribe();
            this._removeValidationConditionSub.unsubscribe();
            this._removeWarningConditionSub.unsubscribe();
            this._saveSub.unsubscribe();
        };
        AjfFbNodeProperties.prototype._initSave = function () {
            var _this = this;
            this._saveSub = this._saveEvt
                .pipe(operators.withLatestFrom(this.propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                var fg = formGroup;
                var val = Object.assign(Object.assign({}, fg.value), { conditionalBranches: _this._conditionalBranches });
                _this._service.saveNodeEntry(val);
            });
        };
        AjfFbNodeProperties.prototype._initForm = function () {
            var _this = this;
            this._propertiesForm = this._nodeEntry.pipe(operators.filter(function (n) { return n != null; }), operators.map(function (n) {
                if (_this._visibilityOptSub != null) {
                    _this._visibilityOptSub.unsubscribe();
                }
                if (_this._visibilitySub != null) {
                    _this._visibilitySub.unsubscribe();
                }
                if (_this._conditionalBranchesSub != null) {
                    _this._conditionalBranchesSub.unsubscribe();
                }
                n = n;
                var visibility = n.node.visibility != null ? n.node.visibility.condition : null;
                var visibilityOpt = n.node.visibility != null ? _this._guessVisibilityOpt(n.node.visibility) : null;
                var controls = {
                    name: [n.node.name, forms$1.Validators.required],
                    label: n.node.label,
                    visibilityOpt: [visibilityOpt, forms$1.Validators.required],
                    visibility: [visibility, forms$1.Validators.required],
                    conditionalBranchesNum: n.node.conditionalBranches.length
                };
                var validators = [];
                if (forms.isRepeatingContainerNode(n.node)) {
                    var rn = n.node;
                    var formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                    controls.formulaReps = [formulaReps, forms$1.Validators.required];
                    controls.minReps = rn.minReps;
                    controls.maxReps = rn.maxReps;
                    _this._curFormulaReps = formulaReps;
                    validators.push(checkRepsValidity);
                }
                if (_this.isField(n)) {
                    var field = n.node;
                    var forceValue = null;
                    var notEmpty = false;
                    var validationConditions = [];
                    if (field.validation != null) {
                        if (field.validation.forceValue != null) {
                            forceValue = field.validation.forceValue.condition;
                        }
                        notEmpty = field.validation.notEmpty != null;
                        validationConditions = (field.validation.conditions || []).map(function (c) {
                            return { condition: c.condition, errorMessage: c.errorMessage };
                        });
                    }
                    var notEmptyW = false;
                    var warningConditions = [];
                    if (field.warning != null) {
                        notEmptyW = field.warning.notEmpty != null;
                        warningConditions = (field.warning.conditions || []).map(function (w) {
                            return { condition: w.condition, warningMessage: w.warningMessage };
                        });
                    }
                    var formula = field.formula != null ? field.formula.formula : null;
                    controls.description = field.description;
                    controls.defaultValue = field.defaultValue;
                    controls.hint = field.hint;
                    controls.size = field.size;
                    controls.formula = formula;
                    controls.forceValue = forceValue;
                    controls.notEmpty = notEmpty;
                    controls.validationConditions = [validationConditions, []];
                    controls.notEmptyWarning = notEmptyW;
                    controls.warningConditions = [warningConditions, []];
                    controls.nextSlideCondition = [field.nextSlideCondition];
                    _this._curForceValue = forceValue;
                    _this._curFormula = formula;
                    _this._validationConditions = validationConditions;
                    _this._warningConditions = warningConditions;
                }
                if (_this.isNumericField(n.node)) {
                    var numField = n.node;
                    var minValue = void 0;
                    var maxValue = void 0;
                    var minDigits = void 0;
                    var maxDigits = void 0;
                    if (numField.validation != null) {
                        if (numField.validation.minValue != null) {
                            minValue = (numField.validation.minValue.condition || '').replace('$value >= ', '');
                        }
                        if (numField.validation.maxValue != null) {
                            maxValue = (numField.validation.maxValue.condition || '').replace('$value <= ', '');
                        }
                        if (numField.validation.minDigits != null) {
                            minDigits = (numField.validation.minDigits.condition ||
                                '').replace('$value.toString().length >= ', '');
                        }
                        if (numField.validation.maxDigits != null) {
                            maxDigits = (numField.validation.maxDigits.condition ||
                                '').replace('$value.toString().length <= ', '');
                        }
                    }
                    controls.minValue = minValue;
                    controls.maxValue = maxValue;
                    controls.minDigits = minDigits;
                    controls.maxDigits = maxDigits;
                    validators.push(checkValueLimitsValidity);
                    validators.push(checkDigitsValidity);
                }
                if (_this.isFieldWithChoices(n.node)) {
                    var fieldWithChoices = n.node;
                    var triggerConditions = (fieldWithChoices.triggerConditions || []).map(function (c) { return c.condition; });
                    controls.choicesOriginRef = fieldWithChoices.choicesOriginRef;
                    controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                        fieldWithChoices.choicesFilter.formula :
                        null;
                    controls.forceExpanded = fieldWithChoices.forceExpanded;
                    controls.forceNarrow = fieldWithChoices.forceNarrow;
                    controls.triggerConditions = triggerConditions;
                    _this._triggerConditions = triggerConditions;
                }
                var fg = _this._fb.group(controls);
                fg.setValidators(validators);
                _this._conditionalBranches = n.node.conditionalBranches.map(function (c) { return c.condition; });
                _this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;
                _this._handleConditionalBranchesChange(fg);
                _this._handleVisibilityChange(fg);
                _this._handleFormulaRepsChange(fg);
                _this._handleChoicesFilterChange(fg);
                _this._handleFormulaChange(fg);
                _this._handleForceValueChange(fg);
                _this._handleValidationCondtionsChange(fg);
                _this._handleWarningCondtionsChange(fg);
                _this._handleNextSlideConditionChange(fg);
                _this._handleTriggerCondtionsChange(fg);
                return fg;
            }), operators.publishReplay(1), operators.refCount());
        };
        AjfFbNodeProperties.prototype._destroyConditionDialog = function () {
            if (this._editConditionDialogSub != null) {
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = rxjs.Subscription.EMPTY;
            }
            if (this._editConditionDialog != null) {
                this._editConditionDialog.close();
                this._editConditionDialog = null;
            }
        };
        AjfFbNodeProperties.prototype._destroyValidationConditionDialog = function () {
            if (this._editValidationConditionDialogSub != null) {
                this._editValidationConditionDialogSub.unsubscribe();
                this._editValidationConditionDialogSub = rxjs.Subscription.EMPTY;
            }
            if (this._editValidationConditionDialog != null) {
                this._editValidationConditionDialog.close();
                this._editValidationConditionDialog = null;
            }
        };
        AjfFbNodeProperties.prototype._destroyWarningConditionDialog = function () {
            if (this._editWarningConditionDialogSub != null) {
                this._editWarningConditionDialogSub.unsubscribe();
                this._editWarningConditionDialogSub = rxjs.Subscription.EMPTY;
            }
            if (this._editWarningConditionDialog != null) {
                this._editWarningConditionDialog.close();
                this._editWarningConditionDialog = null;
            }
        };
        AjfFbNodeProperties.prototype._initRemoveTriggerCondition = function () {
            this._removeTriggerConditionSub = this._removeTriggerConditionEvt
                .pipe(operators.withLatestFrom(this._propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), vcIdx = _b[0], formGroup = _b[1];
                if (formGroup == null) {
                    return;
                }
                var fg = formGroup;
                var ctrl = fg.controls['triggerConditions'];
                var vcs = (ctrl.value || []).slice(0);
                if (vcIdx < 0 || vcIdx >= vcs.length) {
                    return;
                }
                vcs.splice(vcIdx, 1);
                ctrl.setValue(vcs);
            });
        };
        AjfFbNodeProperties.prototype._initAddTriggerCondition = function () {
            this._addTriggerConditionSub = this._addTriggerConditionEvt
                .pipe(operators.withLatestFrom(this._propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                if (formGroup == null) {
                    return;
                }
                var fg = formGroup;
                var ctrl = fg.controls['triggerConditions'];
                var vcs = (ctrl.value || []).slice(0);
                vcs.push('');
                ctrl.setValue(vcs);
            });
        };
        AjfFbNodeProperties.prototype._initTriggerConditionEdit = function () {
            var _this = this;
            this._editConditionDialogSub = rxjs.Subscription.EMPTY;
            this._cdr.markForCheck();
            this._editTriggerConditionSub =
                this._editTriggerConditionEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), vcIdx = _b[0], fg = _b[1];
                    _this._destroyConditionDialog();
                    if (vcIdx < 0 || vcIdx >= _this._triggerConditions.length || fg == null) {
                        return;
                    }
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    var cmp = _this._editConditionDialog.componentInstance;
                    cmp.condition = _this._triggerConditions[vcIdx];
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                _this._triggerConditions[vcIdx] = cond;
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initRemoveWarningCondition = function () {
            this._removeWarningConditionSub = this._removeWarningConditionEvt
                .pipe(operators.withLatestFrom(this._propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), vcIdx = _b[0], formGroup = _b[1];
                if (formGroup == null) {
                    return;
                }
                var fg = formGroup;
                var ctrl = fg.controls['warningConditions'];
                var vcs = (ctrl.value || []).slice(0);
                if (vcIdx < 0 || vcIdx >= vcs.length) {
                    return;
                }
                vcs.splice(vcIdx, 1);
                ctrl.setValue(vcs);
            });
        };
        AjfFbNodeProperties.prototype._initAddWarningCondition = function () {
            this._addWarningConditionSub = this._addWarningConditionEvt
                .pipe(operators.withLatestFrom(this._propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                if (formGroup == null) {
                    return;
                }
                var fg = formGroup;
                var ctrl = fg.controls['warningConditions'];
                var vcs = (ctrl.value || []).slice(0);
                vcs.push({ condition: '', errorMessage: '' });
                ctrl.setValue(vcs);
            });
        };
        AjfFbNodeProperties.prototype._initWarningConditionEdit = function () {
            var _this = this;
            this._editWarningConditionSub =
                this._editWarningConditionEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), vcIdx = _b[0], fg = _b[1];
                    _this._destroyWarningConditionDialog();
                    if (vcIdx < 0 || vcIdx >= _this._warningConditions.length || fg == null) {
                        return;
                    }
                    _this._editWarningConditionDialog =
                        _this._dialog.open(AjfFbWarningConditionEditorDialog);
                    var cmp = _this._editWarningConditionDialog.componentInstance;
                    var w = _this._warningConditions[vcIdx];
                    cmp.condition = w.condition;
                    cmp.warningMessage = w.warningMessage;
                    _this._editWarningConditionDialogSub =
                        _this._editWarningConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                _this._warningConditions[vcIdx] = cond;
                            }
                            _this._editWarningConditionDialogSub.unsubscribe();
                            _this._editWarningConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initRemoveValidationCondition = function () {
            this._removeValidationConditionSub = this._removeValidationConditionEvt
                .pipe(operators.withLatestFrom(this._propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), vcIdx = _b[0], formGroup = _b[1];
                if (formGroup == null) {
                    return;
                }
                var fg = formGroup;
                var ctrl = fg.controls['validationConditions'];
                var vcs = (ctrl.value || []).slice(0);
                if (vcIdx < 0 || vcIdx >= vcs.length) {
                    return;
                }
                vcs.splice(vcIdx, 1);
                ctrl.setValue(vcs);
            });
        };
        AjfFbNodeProperties.prototype._initAddValidationCondition = function () {
            this._addValidationConditionSub = this._addValidationConditionEvt
                .pipe(operators.withLatestFrom(this._propertiesForm))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                if (formGroup == null) {
                    return;
                }
                var fg = formGroup;
                var ctrl = fg.controls['validationConditions'];
                var vcs = (ctrl.value || []).slice(0);
                vcs.push({ condition: '', errorMessage: '' });
                ctrl.setValue(vcs);
            });
        };
        AjfFbNodeProperties.prototype._initValidationConditionEdit = function () {
            var _this = this;
            this._editValidationConditionSub =
                this._editValidationConditionEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), vcIdx = _b[0], fg = _b[1];
                    _this._destroyValidationConditionDialog();
                    if (vcIdx < 0 || vcIdx >= _this._validationConditions.length || fg == null) {
                        return;
                    }
                    _this._editValidationConditionDialog =
                        _this._dialog.open(AjfFbValidationConditionEditorDialog);
                    var cmp = _this._editValidationConditionDialog.componentInstance;
                    var v = _this._validationConditions[vcIdx];
                    cmp.condition = v.condition;
                    cmp.errorMessage = v.errorMessage;
                    _this._editValidationConditionDialogSub =
                        _this._editValidationConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                _this._validationConditions[vcIdx] = cond;
                            }
                            _this._editValidationConditionDialogSub.unsubscribe();
                            _this._editValidationConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initForceValueEdit = function () {
            var _this = this;
            this._editForceValueSub =
                this._editForceValueEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                    _this._destroyConditionDialog();
                    if (formGroup == null) {
                        return;
                    }
                    var fg = formGroup;
                    var ctrl = fg.controls['forceValue'];
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition = ctrl.value;
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                ctrl.setValue(cond);
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initNextSlideConditionEdit = function () {
            var _this = this;
            this._editNextSlideConditionSub =
                this._editNextSlideConditionEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                    _this._destroyConditionDialog();
                    if (formGroup == null) {
                        return;
                    }
                    var fg = formGroup;
                    var ctrl = fg.controls['nextSlideCondition'];
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition = ctrl.value;
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                ctrl.setValue(cond);
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initFormulaEdit = function () {
            var _this = this;
            this._editConditionDialogSub = rxjs.Subscription.EMPTY;
            this._cdr.markForCheck();
            this._editFormulaSub =
                this._editFormulaEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                    _this._destroyConditionDialog();
                    if (formGroup == null) {
                        return;
                    }
                    var fg = formGroup;
                    var ctrl = fg.controls['formula'];
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition = ctrl.value;
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                ctrl.setValue(cond);
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initFormulaRepsEdit = function () {
            var _this = this;
            this._editFormulaRepsSub =
                this._editFormulaRepsEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                    _this._destroyConditionDialog();
                    if (formGroup == null) {
                        return;
                    }
                    var fg = formGroup;
                    var ctrl = fg.controls['formulaReps'];
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition = ctrl.value;
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                ctrl.setValue(cond);
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initChoicesFilterEdit = function () {
            var _this = this;
            this._editChoicesFilterSub =
                this._editChoicesFilterEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                    _this._destroyConditionDialog();
                    if (formGroup == null) {
                        return;
                    }
                    var fg = formGroup;
                    var ctrl = fg.controls['choicesFilter'];
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition = ctrl.value;
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                ctrl.setValue(cond);
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initConditionalBranchEdit = function () {
            var _this = this;
            this._editConditionalBranchSub =
                this._editConditionalBranchEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), cbIdx = _b[0], fg = _b[1];
                    _this._destroyConditionDialog();
                    if (cbIdx < 0 || cbIdx >= _this._conditionalBranches.length || fg == null) {
                        return;
                    }
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition =
                        _this._conditionalBranches[cbIdx];
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                _this._conditionalBranches[cbIdx] = cond;
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._initVisibilityEdit = function () {
            var _this = this;
            this._editVisibilitySub =
                this._editVisibilityEvt
                    .pipe(operators.withLatestFrom(this._propertiesForm))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], formGroup = _b[1];
                    _this._destroyConditionDialog();
                    if (formGroup == null) {
                        return;
                    }
                    var fg = formGroup;
                    var ctrl = fg.controls['visibility'];
                    var condition = ctrl.value;
                    _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                    _this._editConditionDialog.componentInstance.condition = condition;
                    _this._editConditionDialogSub =
                        _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                            if (cond !== void 0) {
                                ctrl.setValue(cond);
                            }
                            _this._editConditionDialogSub.unsubscribe();
                            _this._editConditionDialogSub = rxjs.Subscription.EMPTY;
                            _this._cdr.markForCheck();
                        });
                });
        };
        AjfFbNodeProperties.prototype._handleTriggerCondtionsChange = function (fg) {
            var _this = this;
            this._triggerConditionsSub = fg.valueChanges
                .pipe(operators.distinctUntilChanged(function (v1, v2) { return JSON.stringify(v1.triggerConditions) ===
                JSON.stringify(v2.triggerConditions); }))
                .subscribe(function (v) {
                _this._triggerConditions = v.triggerConditions;
                _this._cdr.markForCheck();
            });
        };
        AjfFbNodeProperties.prototype._handleWarningCondtionsChange = function (fg) {
            var _this = this;
            this._warningConditionsSub = fg.valueChanges
                .pipe(operators.distinctUntilChanged(function (v1, v2) { return JSON.stringify(v1.warningConditions) ===
                JSON.stringify(v2.warningConditions); }))
                .subscribe(function (v) {
                _this._warningConditions = v.warningConditions;
                _this._cdr.markForCheck();
            });
        };
        AjfFbNodeProperties.prototype._handleValidationCondtionsChange = function (fg) {
            var _this = this;
            this._validationConditionsSub =
                fg.valueChanges
                    .pipe(operators.distinctUntilChanged(function (v1, v2) { return JSON.stringify(v1.validationConditions) ===
                    JSON.stringify(v2.validationConditions); }))
                    .subscribe(function (v) {
                    _this._validationConditions = v.validationConditions;
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleForceValueChange = function (fg) {
            var _this = this;
            this._forceValueSub =
                fg.valueChanges.pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.forceValue === v2.forceValue; }))
                    .subscribe(function (v) {
                    _this._curForceValue = v.forceValue;
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleNextSlideConditionChange = function (fg) {
            var _this = this;
            this._formulaSub =
                fg.valueChanges
                    .pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.nextSlideCondition === v2.nextSlideCondition; }))
                    .subscribe(function (v) {
                    _this._nextSlideCondition = v.nextSlideCondition;
                    _this._cdr.markForCheck();
                });
            this._formulaSub =
                fg.valueChanges
                    .pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.nextSlideCondition === v2.nextSlideCondition; }))
                    .subscribe(function (v) {
                    _this._nextSlideCondition = v.nextSlideCondition;
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleFormulaChange = function (fg) {
            var _this = this;
            this._formulaSub =
                fg.valueChanges.pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.formula === v2.formula; }))
                    .subscribe(function (v) {
                    _this._curFormula = v.formula;
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleFormulaRepsChange = function (fg) {
            var _this = this;
            this._formulaRepsSub =
                fg.valueChanges.pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.formulaReps === v2.formulaReps; }))
                    .subscribe(function (v) {
                    _this._curFormulaReps = v.formulaReps;
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleChoicesFilterChange = function (fg) {
            var _this = this;
            this._choicesFilterSub =
                fg.valueChanges
                    .pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.choicesFilter === v2.choicesFilter; }))
                    .subscribe(function (v) {
                    _this._curChoicesFilter = v.choicesFilter;
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleConditionalBranchesChange = function (fg) {
            var _this = this;
            this._conditionalBranchesSub =
                fg.valueChanges
                    .pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.conditionalBranchesNum === v2.conditionalBranchesNum; }))
                    .subscribe(function (v) {
                    var cbNum = v.conditionalBranchesNum;
                    var curCbNum = _this._conditionalBranches.length;
                    if (curCbNum < cbNum) {
                        var newCbs = [];
                        for (var i = curCbNum; i < cbNum; i++) {
                            newCbs.push(models.alwaysCondition().condition);
                        }
                        _this._conditionalBranches = _this._conditionalBranches.concat(newCbs);
                    }
                    else if (curCbNum > cbNum) {
                        _this._conditionalBranches.splice(0, curCbNum - cbNum);
                    }
                    _this._cdr.markForCheck();
                });
        };
        AjfFbNodeProperties.prototype._handleVisibilityChange = function (fg) {
            var _this = this;
            this._visibilitySub =
                fg.valueChanges
                    .pipe(operators.distinctUntilChanged(function (v1, v2) { return v1.visibilityOpt === v2.visibilityOpt; }))
                    .subscribe(function (v) {
                    var visibilityOpt = v.visibilityOpt;
                    var newCondition;
                    switch (visibilityOpt) {
                        case 'always':
                            newCondition = models.alwaysCondition().condition;
                            break;
                        case 'never':
                            newCondition = models.neverCondition().condition;
                            break;
                        default:
                            newCondition = null;
                    }
                    _this._curVisibility = newCondition;
                    fg.controls['visibility'].setValue(newCondition);
                });
            this._visibilitySub = fg.valueChanges
                .pipe(operators.filter(function (v) { return v.visibilityOpt === 'condition'; }), operators.distinctUntilChanged(function (v1, v2) { return v1.visibility === v2.visibility; }))
                .subscribe(function (v) {
                _this._curVisibility = v.visibility;
                _this._cdr.markForCheck();
            });
        };
        AjfFbNodeProperties.prototype._guessVisibilityOpt = function (condition) {
            if (condition.condition.localeCompare(models.alwaysCondition().condition) === 0) {
                return 'always';
            }
            if (condition.condition.localeCompare(models.neverCondition().condition) === 0) {
                return 'never';
            }
            return 'condition';
        };
        return AjfFbNodeProperties;
    }());
    AjfFbNodeProperties.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-node-properties',
                    template: "<div\n  [style.display]=\"(enabled|async) ? 'none' : 'block'\"\n  class=\"ajf-disabled-overlay\"\n></div>\n<div class=\"ajf-header\">\n  <h3>{{'Properties'|transloco}}</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input\n            matInput\n            formControlName=\"name\"\n            [placeholder]=\"'Name' | transloco\"\n          />\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input\n            matInput\n            formControlName=\"label\"\n            [placeholder]=\"'Label' | transloco\"\n          />\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label>{{'Visibility'|transloco}}</mat-label>\n          <mat-select\n            formControlName=\"visibilityOpt\"\n            [placeholder]=\"'Visible' | transloco\"\n          >\n            <mat-option value=\"always\">{{'Always'|transloco}}</mat-option>\n            <mat-option value=\"never\">{{'Never'|transloco}}</mat-option>\n            <mat-option value=\"condition\"\n              >{{'Condition...'|transloco}}</mat-option\n            >\n          </mat-select>\n        </mat-form-field>\n        <button\n          (click)=\"editVisibility()\"\n          [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n          mat-raised-button\n          [matTooltip]=\"curVisibility || ''\"\n        >\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label>{{'Branches'|transloco}}</label></div>\n        <div>\n          <mat-slider\n            formControlName=\"conditionalBranchesNum\"\n            thumbLabel\n            tickInterval=\"auto\"\n            min=\"1\"\n            max=\"5\"\n            step=\"1\"\n          ></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button\n            (click)=\"editConditionalBranch(idx)\"\n            mat-raised-button\n            [matTooltip]=\"branch\"\n          >\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label>{{'Repetitions'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editFormulaReps()\"\n              mat-raised-button\n              [matTooltip]=\"curFormulaReps || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label>{{'Min repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider\n              formControlName=\"minReps\"\n              thumbLabel\n              tickInterval=\"auto\"\n              min=\"1\"\n              max=\"5\"\n              step=\"1\"\n            ></mat-slider>\n          </div>\n          <div><label>{{'Max repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider\n              formControlName=\"maxReps\"\n              thumbLabel\n              tickInterval=\"auto\"\n              min=\"1\"\n              max=\"5\"\n              step=\"1\"\n            ></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label>{{'Field size'|transloco}}</mat-label>\n            <mat-select\n              formControlName=\"size\"\n              [placeholder]=\"'Size' | transloco\"\n            >\n              <mat-option\n                *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\"\n              >\n                {{ fieldSize.label|transloco }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"hint\"\n              [placeholder]=\"'Hint' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea\n              matInput\n              formControlName=\"description\"\n              [placeholder]=\"'Description' | transloco\"\n            ></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Formula'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editFormula()\"\n              mat-raised-button\n              [matTooltip]=\"curFormula || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label>{{'Force value'|translco}}</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\"\n            >{{'Not empty'|transloco}}</mat-checkbox\n          >\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | transloco }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div\n            *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n            class=\"ajf-validation-row ajf-emph\"\n          >\n            {{'No conditions'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let validationCondition of validationConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editValidationCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"validationCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon\n              class=\"ajf-pointer\"\n              (click)=\"removeValidationCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\"\n            >{{'Not empty warning'|transloco}}</mat-checkbox\n          >\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{'Warnings'|transloco}}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div\n            *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n            class=\"ajf-validation-row ajf-emph\"\n          >\n            {{'No warnings'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let warningCondition of warningConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editWarningCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"warningCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Go to next slide condition'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editNextSlideCondition()\"\n              mat-raised-button\n              [matTooltip]=\"nextSlideCondition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label>{{'Choices origins'|transloco}}</mat-label>\n              <mat-select\n                formControlName=\"choicesOriginRef\"\n                [placeholder]=\"'Choices' | transloco\"\n              >\n                <mat-option\n                  *ngFor=\"let choicesOrigin of choicesOrigins\"\n                  [value]=\"choicesOrigin.name\"\n                >\n                  {{ (choicesOrigin.label || choicesOrigin.name)|transloco }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label>{{'Choices filter'|transloco}}</label></div>\n            <div>\n              <button\n                (click)=\"editChoicesFilter()\"\n                mat-raised-button\n                [matTooltip]=\"curChoicesFilter\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\"\n              >{{'Force expanded selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\"\n              >{{'Force narrow selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label>{{'Trigger selection'|transloco}}</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\"\n                >add_circle_outline</mat-icon\n              >\n            </div>\n            <div\n              *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\"\n            >\n              {{'No trigger condition'|transloco}}\n            </div>\n            <div\n              class=\"ajf-validation-row\"\n              *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"\n            >\n              <button\n                (click)=\"editTriggerCondition(idx)\"\n                mat-raised-button\n                [matTooltip]=\"triggerCondition\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\"\n                >remove_circle_outline</mat-icon\n              >\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
                },] }
    ];
    AjfFbNodeProperties.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef },
        { type: AjfFormBuilderService },
        { type: dialog.MatDialog },
        { type: forms$1.FormBuilder }
    ]; };

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
    var AjfFbNodeTypeEntry = /** @class */ (function () {
        function AjfFbNodeTypeEntry(_cdr) {
            this._cdr = _cdr;
        }
        Object.defineProperty(AjfFbNodeTypeEntry.prototype, "nodeType", {
            get: function () {
                return this._nodeType;
            },
            set: function (nodeType) {
                this._nodeType = nodeType;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        return AjfFbNodeTypeEntry;
    }());
    AjfFbNodeTypeEntry.decorators = [
        { type: core.Component, args: [{
                    selector: 'ajf-fb-node-type-entry',
                    template: "<ng-container *ngIf=\"nodeType\">\n  <mat-icon\n    [fontSet]=\"nodeType.icon.fontSet\" [fontIcon]=\"nodeType.icon.fontIcon\"></mat-icon>\n  {{ nodeType.label }}\n</ng-container>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}\n"]
                },] }
    ];
    AjfFbNodeTypeEntry.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    AjfFbNodeTypeEntry.propDecorators = {
        nodeType: [{ type: core.Input }]
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
    var AjfFormBuilderModule = /** @class */ (function () {
        function AjfFormBuilderModule() {
        }
        return AjfFormBuilderModule;
    }());
    AjfFormBuilderModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        monacoEditor.AjfMonacoEditorModule, nodeIcon.AjfNodeIconModule, common.CommonModule, dragDrop.DragDropModule,
                        forms$1.FormsModule, autocomplete.MatAutocompleteModule, button.MatButtonModule, card.MatCardModule,
                        checkbox.MatCheckboxModule, chips.MatChipsModule, dialog.MatDialogModule, formField.MatFormFieldModule,
                        icon.MatIconModule, input.MatInputModule, list.MatListModule, menu.MatMenuModule,
                        select.MatSelectModule, sidenav.MatSidenavModule, slider.MatSliderModule, table.MatTableModule,
                        toolbar.MatToolbarModule, tooltip.MatTooltipModule, forms$1.ReactiveFormsModule, transloco.AjfTranslocoModule,
                        expansion.MatExpansionModule, slideToggle.MatSlideToggleModule,
                    ],
                    declarations: [
                        AjfFbBranchLine,
                        AjfFbChoicesOriginEditor,
                        AjfFbChoicesOriginEditorDialog,
                        AjfFbConditionEditor,
                        AjfFbConditionEditorDialog,
                        AjfFbNodeEntry,
                        AjfFbNodeProperties,
                        AjfFbNodeTypeEntry,
                        AjfFbStringIdentifierDialogComponent,
                        AjfFbValidationConditionEditorDialog,
                        AjfFbWarningConditionEditorDialog,
                        AjfFormBuilder,
                    ],
                    exports: [
                        AjfFormBuilder,
                    ],
                    providers: [
                        AjfFormBuilderService,
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

    exports.AjfFormBuilder = AjfFormBuilder;
    exports.AjfFormBuilderModule = AjfFormBuilderModule;
    exports.AjfFormBuilderService = AjfFormBuilderService;
    exports.disableFieldDropPredicate = disableFieldDropPredicate;
    exports.disableSlideDropPredicate = disableSlideDropPredicate;
    exports.flattenNodes = flattenNodes;
    exports.onDropProcess = onDropProcess;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_a = AjfFbBranchLine;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_b = AjfFbChoicesOriginEditor;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_c = AjfFbChoicesOriginEditorDialog;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_d = AjfFbConditionEditor;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_e = AjfFbConditionEditorDialog;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_f = AjfFbNodeEntry;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_g = AjfFbNodeProperties;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_h = AjfFbNodeTypeEntry;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_i = AjfFbStringIdentifierDialogComponent;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_j = AjfFbValidationConditionEditorDialog;
    exports.ɵgc_ajf_src_material_form_builder_form_builder_k = AjfFbWarningConditionEditorDialog;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-form-builder.umd.js.map
