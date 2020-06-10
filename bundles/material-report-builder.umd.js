(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/common'), require('@ajf/core/map'), require('@ajf/core/table'), require('@ajf/core/text'), require('@ajf/material/image'), require('@ajf/material/monaco-editor'), require('@angular/cdk/drag-drop'), require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/button-toggle'), require('@angular/material/card'), require('@angular/material/dialog'), require('@angular/material/grid-list'), require('@angular/material/icon'), require('@angular/material/list'), require('@angular/material/select'), require('@angular/material/sidenav'), require('@angular/material/slide-toggle'), require('@angular/material/slider'), require('@angular/material/tabs'), require('@angular/material/toolbar'), require('@angular/material/tooltip'), require('@ngx-translate/core'), require('ngx-color-picker'), require('rxjs'), require('@ajf/core/forms'), require('@ajf/core/models'), require('@ajf/core/reports'), require('@ajf/core/utils'), require('rxjs/operators'), require('@ajf/core/image'), require('quill')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/report-builder', ['exports', '@ajf/core/common', '@ajf/core/map', '@ajf/core/table', '@ajf/core/text', '@ajf/material/image', '@ajf/material/monaco-editor', '@angular/cdk/drag-drop', '@angular/common', '@angular/core', '@angular/forms', '@angular/material/button', '@angular/material/button-toggle', '@angular/material/card', '@angular/material/dialog', '@angular/material/grid-list', '@angular/material/icon', '@angular/material/list', '@angular/material/select', '@angular/material/sidenav', '@angular/material/slide-toggle', '@angular/material/slider', '@angular/material/tabs', '@angular/material/toolbar', '@angular/material/tooltip', '@ngx-translate/core', 'ngx-color-picker', 'rxjs', '@ajf/core/forms', '@ajf/core/models', '@ajf/core/reports', '@ajf/core/utils', 'rxjs/operators', '@ajf/core/image', 'quill'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.reportBuilder = {}), global.ng.core.common, global.ng.core.map, global.ng.core.table, global.ng.core.text, global.ng.material.image, global.ng.material.monacoEditor, global.ng.cdk.dragDrop, global.ng.common, global.ng.core, global.ng.forms, global.ng.material.button, global.ng.material.buttonToggle, global.ng.material.card, global.ng.material.dialog, global.ng.material.gridList, global.ng.material.icon, global.ng.material.list, global.ng.material.select, global.ng.material.sidenav, global.ng.material.slideToggle, global.ng.material.slider, global.ng.material.tabs, global.ng.material.toolbar, global.ng.material.tooltip, global.ngxTranslate.core, global.ngxColorPicker, global.rxjs, global.ng.core.forms, global.ng.core.models, global.ng.core.reports, global.ng.core.utils, global.rxjs.operators, global.ng.core.image, global.quill));
}(this, (function (exports, common, map, table, text, image, monacoEditor, dragDrop, common$1, core, forms, button, buttonToggle, card, dialog, gridList, icon, list, select, sidenav, slideToggle, slider, tabs, toolbar, tooltip, core$1, ngxColorPicker, rxjs, forms$1, models, reports, utils, operators, image$1, Quill) { 'use strict';

    Quill = Quill && Quill.hasOwnProperty('default') ? Quill['default'] : Quill;

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
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
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
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

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

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
    var AJF_REPORTS_CONFIG = new core.InjectionToken('AJF_REPORTS_CONFIG');

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
     * This service contains all the logic to model the report widget.
     *
     * @export
     */
    var AjfReportBuilderService = /** @class */ (function () {
        /**
         * Creates an instance of AjfReportBuilderService.
         *
         * @memberOf AjfReportBuilderService
         */
        function AjfReportBuilderService(reportsConfig) {
            var _this = this;
            this._customWidgetsUpdate = new rxjs.Subject();
            this._originUpdate = new rxjs.Subject();
            this._savedReportUpdate = new rxjs.Subject();
            this._jsonStack = new rxjs.BehaviorSubject([]);
            this._emptyContent = new rxjs.BehaviorSubject(true);
            this._onDraggedUpdate = new rxjs.Subject();
            this._onOverUpdate = new rxjs.Subject();
            this._fixedZoomUpdate = new rxjs.Subject();
            this._onDragEnterUpdate = new rxjs.Subject();
            this._headerWidgetsUpdate = new rxjs.Subject();
            this._contentWidgetsUpdate = new rxjs.Subject();
            this._footerWidgetsUpdate = new rxjs.Subject();
            this._colorUpdate = new rxjs.Subject();
            this._defaultColor = [
                'rgba(0, 0, 0, 1)', 'rgba(51, 153, 255, 1)', 'rgba(153, 204, 0, 1)',
                'rgba(255, 102, 0, 1)', 'rgba(0, 204, 204, 1)', 'rgba(204, 204, 153, 1)',
                'rgba(255, 153, 0, 1)', 'rgba(230, 0, 0, 1)', 'rgba(255, 153, 0, 1)',
                'rgba(255, 255, 0, 1)', 'rgba(0, 138, 0, 1)', 'rgba(0, 102, 204, 1)',
                'rgba(153, 51, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(250, 204, 204, 1)',
                'rgba(255, 235, 204, 1)', 'rgba(255, 255, 204, 1)', 'rgba(204, 232, 204, 1)',
                'rgba(204, 224, 245, 1)', 'rgba(235, 214, 255, 1)', 'rgba(187, 187, 187, 1)',
                'rgba(240, 102, 102, 1)', 'rgba(255, 194, 102, 1)', 'rgba(255, 255, 102, 1)',
                'rgba(102, 185, 102, 1)', 'rgba(102, 163, 224, 1)', 'rgba(194, 133, 255, 1)',
                'rgba(136, 136, 136, 1)', 'rgba(161, 0, 0, 1)', 'rgba(178, 107, 0, 1)',
                'rgba(178, 178, 0, 1)', 'rgba(0, 97, 0, 1)', 'rgba(0, 71, 178, 1)',
                'rgba(107, 36, 178, 1)', 'rgba(68, 68, 68, 1)', 'rgba(92, 0, 0, 1)',
                'rgba(102, 61, 0, 1)', 'rgba(102, 102, 0, 1)', 'rgba(0, 55, 0, 1)',
                'rgba(0, 41, 102, 1)', 'rgba(61, 20, 102, 1)'
            ];
            this._currentWidgetUpdate = new rxjs.BehaviorSubject(null);
            this._formsVariablesUpdate = new rxjs.BehaviorSubject(null);
            this._conditionNamesUpdate = new rxjs.BehaviorSubject(null);
            /**
             * this BehaviorSubject update export report.
             *
             * @memberOf AjfReportBuilderService
             */
            this._saveReport = new rxjs.BehaviorSubject(null);
            /**
             * this BehaviorSubject contains the AjfReport.
             *
             * @memberOf AjfReportBuilderService
             */
            this._report = new rxjs.BehaviorSubject(null);
            this._reportStylesUpdate = new rxjs.Subject();
            this._reportFormsUpdate = new rxjs.Subject();
            /**
             * dictionary for  widgetsUpdate
             *
             * @memberOf AjfReportBuilderService
             */
            this._updates = {
                header: this._headerWidgetsUpdate,
                content: this._contentWidgetsUpdate,
                footer: this._footerWidgetsUpdate,
                color: this._colorUpdate,
                customWidgets: this._customWidgetsUpdate
            };
            /**
             * event emitter that notify when wont to save report
             *
             * @memberOf AjfReportBuilderService
             */
            this._saveReportEvent = new core.EventEmitter();
            this._saveFormulaTOHtml = new core.EventEmitter();
            /**
             * event emitter that notify when column width changed
             *
             * @memberOf AjfReportBuilderService
             */
            this.columnWidthChangedEmitter = new core.EventEmitter();
            this._iconSets = { 'ajf-icon': [] };
            this._lastDeletedJson = '';
            if (reportsConfig != null) {
                if (reportsConfig.icons != null) {
                    this._iconSets = __assign(__assign({}, this._iconSets), reportsConfig.icons);
                }
            }
            this._origin = this._originUpdate.pipe(operators.startWith('header'), operators.share());
            this._savedReport = this._savedReportUpdate.pipe(operators.share());
            this._onDragged = this._onDraggedUpdate.pipe(operators.startWith(false), operators.share());
            this._onOver = this._onOverUpdate.pipe(operators.startWith(false), operators.share());
            this._fixedZoom = this._fixedZoomUpdate.pipe(operators.startWith(false), operators.share());
            this._onDragEnter = this._onDragEnterUpdate.pipe(operators.share());
            this._reportStyles = this._reportStylesUpdate
                .pipe(operators.scan(function (styles, op) {
                return op(styles);
            }, {}), operators.share(), operators.startWith({}));
            this._reportForms = this._reportFormsUpdate
                .pipe(operators.scan(function (forms, op) {
                return op(forms);
            }, []), operators.share(), operators.startWith([]));
            this._customWidgets =
                this._customWidgetsUpdate
                    .pipe(operators.scan(function (widgets, op) {
                    return op(widgets);
                }, []), operators.share(), operators.startWith([]));
            this._formsVariables =
                this._formsVariablesUpdate
                    .pipe(operators.filter(function (s) { return s != null; }), operators.scan(function (variables, op) {
                    return op(variables);
                }, []), operators.publishReplay(1), operators.refCount());
            this._conditionNames =
                this._conditionNamesUpdate
                    .pipe(operators.filter(function (s) { return s != null; }), operators.scan(function (variables, op) {
                    return op(variables);
                }, []), operators.share(), operators.startWith([]));
            this._headerWidgets = this._headerWidgetsUpdate
                .pipe(operators.scan(function (widgets, op) {
                return op(widgets);
            }, { widgets: [], styles: {} }), operators.startWith({ widgets: [], styles: {} }), operators.publishReplay(1), operators.refCount());
            this._headerStyles = this._headerWidgets.pipe(operators.map(function (widgets) {
                return widgets != null ? widgets.styles : {};
            }));
            this._contentWidgets = this._contentWidgetsUpdate
                .pipe(operators.scan(function (widgets, op) {
                return op(widgets);
            }, { widgets: [], styles: {} }), operators.startWith({ widgets: [], styles: {} }), operators.publishReplay(1), operators.refCount());
            this._contentStyles = this._contentWidgets.pipe(operators.map(function (widgets) {
                return widgets != null ? widgets.styles : {};
            }));
            this._footerWidgets = this._footerWidgetsUpdate
                .pipe(operators.scan(function (widgets, op) {
                return op(widgets);
            }, { widgets: [], styles: {} }), operators.startWith({ widgets: [], styles: {} }), operators.publishReplay(1), operators.refCount());
            this._footerStyles = this._footerWidgets.pipe(operators.map(function (widgets) {
                return widgets != null ? widgets.styles : {};
            }));
            this._color = this._colorUpdate
                .pipe(operators.scan(function (color, op) {
                return op(color);
            }, this._defaultColor), operators.share(), operators.startWith(this._defaultColor));
            this._currentWidget = this._currentWidgetUpdate.pipe(operators.filter(function (s) { return s != null; }), operators.map(function (s) { return s; }), operators.scan(function (widget, op) {
                return op(widget);
            }, null), operators.publishReplay(1), operators.refCount());
            this._reportForms
                .pipe(operators.filter(function (f) { return f.length != 0; }), operators.map(function (forms) {
                return function (_c) {
                    return _this.fillFormsVariables(forms);
                };
            }))
                .subscribe(this._formsVariablesUpdate);
            this._reportForms
                .pipe(operators.filter(function (f) { return f.length != 0; }), operators.map(function (forms) {
                return function (_c) {
                    return _this.fillFormsVariables(forms);
                };
            }))
                .subscribe(this._conditionNamesUpdate);
            var reportObs = this._report;
            reportObs
                .pipe(operators.map(function (r) {
                return function (_colors) {
                    var tempColors = _this._defaultColor;
                    if (r == null) {
                        return [];
                    }
                    else {
                        _this.parseColor(r.styles, tempColors);
                        if (r.content) {
                            _this.parseColor(r.content.styles, tempColors);
                        }
                        if (r.footer) {
                            _this.parseColor(r.footer.styles, tempColors);
                        }
                        if (r.header) {
                            _this.parseColor(r.header.styles, tempColors);
                            for (var i = 0; i < r.header.content.length; i++) {
                                var obj = r.header.content[i];
                                _this.parseColor(obj.styles, tempColors);
                                if (obj.widgetType === reports.AjfWidgetType.Layout) {
                                    var layoutObj = obj;
                                    for (var j = 0; j < layoutObj.content.length; j++) {
                                        var columnObj = layoutObj.content[j];
                                        _this.parseColor(columnObj.styles, tempColors);
                                        for (var z = 0; z < columnObj.content.length; z++) {
                                            var widgetObj = columnObj.content[z];
                                            _this.parseColor(widgetObj.styles, tempColors);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return tempColors;
                };
            }))
                .subscribe(this._colorUpdate);
            reportObs
                .pipe(operators.map(function (r) {
                return function (_styles) {
                    if (r == null || r.styles == null) {
                        return {};
                    }
                    else {
                        return r.styles;
                    }
                };
            }))
                .subscribe(this._reportStylesUpdate);
            reportObs
                .pipe(operators.map(function (r) {
                return function (_widgets) {
                    if (r == null || r.header == null) {
                        return { widgets: [], styles: {} };
                    }
                    else {
                        return {
                            widgets: r.header.content || [],
                            styles: r.header.styles || {}
                        };
                    }
                };
            }))
                .subscribe(this._headerWidgetsUpdate);
            reportObs
                .pipe(operators.map(function (r) {
                return function (_widgets) {
                    if (r == null || r.content == null) {
                        return { widgets: [], styles: {} };
                    }
                    else {
                        return {
                            widgets: r.content.content || [],
                            styles: r.content.styles || {}
                        };
                    }
                };
            }))
                .subscribe(this._contentWidgetsUpdate);
            reportObs
                .pipe(operators.map(function (r) {
                return function (_widgets) {
                    if (r == null || r.footer == null) {
                        return { widgets: [], styles: {} };
                    }
                    else {
                        return {
                            widgets: r.footer.content || [],
                            styles: r.footer.styles || {}
                        };
                    }
                };
            }))
                .subscribe(this._footerWidgetsUpdate);
            this._saveReport.pipe(operators.map(function (json) {
                return function (_r) {
                    if (json = null) {
                        return {};
                    }
                    return json;
                };
            }));
            this._saveReportEvent
                .pipe(operators.combineLatest(this.report, this.reportForms), operators.combineLatest(this._headerWidgets.pipe(operators.filter(function (w) { return w != null; })), this._contentWidgets.pipe(operators.filter(function (w) { return w != null; })), this._footerWidgets.pipe(operators.filter(function (w) { return w != null; })), this._reportStyles.pipe(operators.filter(function (w) { return w != null; }))))
                .subscribe(function (r) {
                var obj = {};
                // const curRo = r[0][1];
                // const forms = r[0][2] != null ? r[0][2] || []
                //     : (curRo != null ? curRo.forms || [] : []);
                obj.header = { content: r[1].widgets.map(function (w) { return utils.deepCopy(w); }), styles: r[1].styles };
                obj.content = { content: r[2].widgets.map(function (w) { return utils.deepCopy(w); }), styles: r[2].styles };
                obj.footer = { content: r[3].widgets.map(function (w) { return utils.deepCopy(w); }), styles: r[3].styles };
                obj.styles = r[4];
                var ro = {
                    header: { content: r[1].widgets, styles: r[1].styles },
                    content: { content: r[2].widgets, styles: r[2].styles },
                    footer: { content: r[3].widgets, styles: r[3].styles },
                    styles: r[4]
                };
                _this.setSaveReport(obj);
                _this._savedReportUpdate.next(ro);
                _this.pushJsonStack(JSON.stringify(obj));
            });
        }
        AjfReportBuilderService.prototype.getFormulaToHtmlEvent = function () {
            return this._saveFormulaTOHtml.asObservable();
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "iconSets", {
            get: function () {
                return this._iconSets;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *
         *  functions
         *
         */
        /**
         * utils:
         * remove AjfNodeGroup, AjfSlide, AjfRepeatingSlide, AjfStringField from ajfnode array
         *
         * @param nodes
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.filterNodes = function (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.nodeType === forms$1.AjfNodeType.AjfNodeGroup || node.nodeType === forms$1.AjfNodeType.AjfSlide ||
                    node.nodeType === forms$1.AjfNodeType.AjfRepeatingSlide ||
                    (node.nodeType === forms$1.AjfNodeType.AjfField &&
                        node.fieldType === forms$1.AjfFieldType.String)) {
                    nodes.splice(i, 1);
                    i--;
                }
            }
            return nodes;
        };
        AjfReportBuilderService.prototype.parseColor = function (cssStyles, colors) {
            var styleKeys = ['background-color', 'backgroundColor', 'color'];
            styleKeys.forEach(function (k) {
                if (cssStyles[k] && colors.indexOf(cssStyles[k]) == -1) {
                    colors.push(cssStyles[k]);
                }
            });
        };
        AjfReportBuilderService.prototype.fillFormsVariables = function (forms) {
            var variables = [];
            for (var i = 0; i < forms.length; i++) {
                variables[i] = { nodes: [], labels: [], names: [], types: [] };
                if (forms[i].nodes != null && forms[i].nodes.length > 0) {
                    variables[i].nodes = this.filterNodes(forms$1.flattenNodes(forms[i].nodes));
                }
                variables[i].labels = this.extractLabelsNodes(variables[i].nodes);
                variables[i].names = this.extractNamesNodes(variables[i].nodes);
                variables[i].types = this.extractTypesNodes(variables[i].nodes);
            }
            return variables;
        };
        /**
         * utils:
         *  the obj returned contains the label field of ajfNode
         * @param nodes
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.extractLabelsNodes = function (nodes) {
            var obj = [];
            for (var i = 0; i < nodes.length; i++) {
                obj.push(nodes[i].label);
            }
            return obj;
        };
        AjfReportBuilderService.prototype.extractNamesNodes = function (nodes) {
            var obj = [];
            for (var i = 0; i < nodes.length; i++) {
                obj.push(nodes[i].name);
            }
            return obj;
        };
        AjfReportBuilderService.prototype.extractTypesNodes = function (nodes) {
            var obj = [];
            for (var i = 0; i < nodes.length; i++) {
                var p = nodes[i];
                obj.push(p.fieldType);
            }
            return obj;
        };
        AjfReportBuilderService.prototype.setOrigin = function (origin) {
            this._originUpdate.next(origin);
        };
        /**
         * utils:
         * This method round the value to the decimal position
         *
         * @param value
         * @param decimalpositions
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.roundTo = function (value, decimalPositions) {
            var i = value * Math.pow(10, decimalPositions);
            i = Math.floor(i);
            return i / Math.pow(10, decimalPositions);
        };
        /**
         * utils:
         * This validator check if the value is a number.
         *
         * @param value
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.isNumber = function (value) {
            return /^\d+(\.\d+)?/.test(value);
        };
        AjfReportBuilderService.prototype.isNumberArray = function (value) {
            for (var i = 0; i < value.length; i++) {
                if (!this.isNumber(value[i])) {
                    return false;
                }
            }
            return true;
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "onDragged", {
            /**
             * get _onDragged Observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._onDragged;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "onOver", {
            /**
             * get _onOver Observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._onOver;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "fixedZoom", {
            /**
             * get _fixedZoom Observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._fixedZoom;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *  change status of _fixedZoom in true
         *
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.fixedZoomIn = function () {
            this._fixedZoomUpdate.next(true);
        };
        /**
         *  change status of _fixedZoom in false
         *
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.fixedZoomOut = function () {
            this._fixedZoomUpdate.next(false);
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "onDragEnter", {
            /**
             * get _onDragEnter observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._onDragEnter;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *  update _onDragEnter with  section(header,content,footer) and index
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.dragEnter = function (array, index) {
            this._onDragEnterUpdate.next({ array: array, index: index });
        };
        /**
         *  update _ondragged with true
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.dragStarted = function () {
            this._onDraggedUpdate.next(true);
        };
        /**
         *  update _onDragged with false
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.dragEnded = function () {
            this._onDraggedUpdate.next(false);
        };
        /**
         *  update _onOver with true
         *
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.overStarted = function () {
            this._onOverUpdate.next(true);
        };
        /**
         * update _onOver with false
         *
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.overEnded = function () {
            this._onOverUpdate.next(false);
        };
        /**
         *
         *  update _onDragged with false
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.dragLeave = function () {
            this._onDragEnterUpdate.next({});
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "report", {
            /**
             * Get the report
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._report.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * emit save report event
         *
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.saveReport = function () {
            if (this._saveReportEvent != null) {
                this._saveReportEvent.emit();
            }
        };
        AjfReportBuilderService.prototype.saveImageFormula = function (formula) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return widget;
                }
                var w = widget;
                w.flag = formula;
                w.icon = formula;
                return w;
            });
        };
        AjfReportBuilderService.prototype.saveFormulaToHtml = function (htmlFormula, reference) {
            if (this._saveFormulaTOHtml != null) {
                var obj = { 'formula': htmlFormula, 'reference': reference };
                this._saveFormulaTOHtml.emit(obj);
            }
        };
        AjfReportBuilderService.prototype.setEmptyContent = function (val) {
            this._emptyContent.next(val);
        };
        AjfReportBuilderService.prototype.pushJsonStack = function (json) {
            var currentStack = this._jsonStack.getValue();
            if (currentStack.indexOf(json) === -1 && json !== this._lastDeletedJson) {
                currentStack.push(json);
            }
            this._jsonStack.next(currentStack);
        };
        AjfReportBuilderService.prototype.popJsonStack = function () {
            var emptyJson = '{"header":{"content":[],"styles":{}},' +
                '"content":{"content":[],"styles":{}},"' +
                'footer":{"content":[],"styles":{}},"styles":{}}';
            var currentStack = this._jsonStack.getValue();
            currentStack.pop();
            this._lastDeletedJson = currentStack.pop();
            if (currentStack.length <= 0) {
                this._lastDeletedJson = '';
                this._jsonStack.next([]);
                this.updateCurrentWidget(null);
                this.setEmptyContent(true);
                return emptyJson;
            }
            this._jsonStack.next(currentStack);
            return this._lastDeletedJson;
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "columnWidthChanged", {
            /**
             * get the emitter
             *
             * @readonly
             *
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this.columnWidthChangedEmitter;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "customWidgets", {
            /**
             * get _customWidgets Observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._customWidgets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "headerWidgets", {
            /**
             * Get the header widget
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._headerWidgets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "headerStyles", {
            /**
             * Get the header styles
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._headerStyles;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "contentWidgets", {
            /**
             * Get the Content widget
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._contentWidgets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "contentStyles", {
            /**
             * Get the content styles
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._contentStyles;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "footerWidgets", {
            /**
             * Get the footer widget
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._footerWidgets;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "footerStyles", {
            /**
             * Get the footer styles
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._footerStyles;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "colors", {
            /**
             * Get the colors of report
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._color;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "emptyContent", {
            get: function () {
                return this._emptyContent;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *
         * @param type
         * @param newWidget
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.updateArrayWidgets = function (type, newWidget) {
            if ((type !== 'header') && (type !== 'content') && (type !== 'footer')) {
                throw new Error('Unknown type ' + type);
            }
            this._updates[type].next(function (_widgets) {
                return newWidget;
            });
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "formsVariables", {
            /**
             * get _formsVariables Observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._formsVariables;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "conditionNames", {
            get: function () {
                return this._conditionNames;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "currentWidget", {
            /**
             * Get the current widget
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._currentWidget;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * This method Update _currentWidgetUpdate with newWidget.
         *
         * @param newWidget
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.updateCurrentWidget = function (newWidget) {
            var _this = this;
            this._currentWidgetUpdate.next(function (_widget) {
                _this._saveReportEvent.emit();
                return newWidget;
            });
        };
        Object.defineProperty(AjfReportBuilderService.prototype, "getSaveReport", {
            /**
             * Get the report
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._saveReport.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "reportSaved", {
            /**
             * get _jsonSavedReport obeservable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._savedReport;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "reportStyles", {
            /**
             * get _reportStyles observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._reportStyles;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "reportForms", {
            /**
             * get _reportForms observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._reportForms;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderService.prototype, "origin", {
            /**
             * get the _origin Observable
             *
             * @readonly
             * @memberOf AjfReportBuilderService
             */
            get: function () {
                return this._origin;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * This method assigns the new width to the idx column
         * and recalculates the width of the remaining columns of the layout.
         * The range value are from 0,1 to 1.
         *
         * RULES:
         * The min value for column is 0,1.
         * The sum of all columns width is always 1.
         * The method round the values.
         * If is present only one column the width is always 1.
         *
         * When the new value `>` old value:
         * the width of the remaining columns decreases.
         * When the new value `<` old value:
         * the width of the remaining columns increases.
         *
         * When values ​​are periodic, rounding assigns the gap to the current value.
         * For example: 3 columns with 0,33 believe 1 column 0,34 and 2 columns 0,33.
         *
         * @param newValue
         * @param idx
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.instantColumnValue = function (newValue, idx) {
            var _this = this;
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return widget;
                }
                var myObj = widget;
                var size = myObj.columns.length;
                var spreadValue = 0;
                var objNum = 0;
                var sum = 0;
                var idxFirstNoObj = -1;
                var add = false;
                var foundFirstNoObj = false;
                var re1 = new RegExp('(^[0]\.\[1-9][0-9]$)');
                var re2 = new RegExp('(^[0]\.\[1-9]$)');
                var re3 = new RegExp('^[1]$');
                var oldValue = myObj.columns[idx];
                newValue = Number(_this.roundTo(newValue, 2).toFixed(2));
                if (myObj.columns[idx] == null) {
                    throw new Error('invalid value');
                }
                for (var j = 0; j < size; j++) {
                    if (myObj.columns[j] === -1) {
                        objNum++;
                    }
                }
                if (oldValue == -1) {
                    oldValue = 0.1;
                    objNum--;
                    newValue = Number(_this.roundTo(1 / (size - objNum), 2).toFixed(2));
                    myObj.columns[idx] = 0.1;
                }
                else if (oldValue < 0.1) {
                    oldValue = 0.1;
                }
                if (newValue !== -1) {
                    if (myObj.columns.length === 1) {
                        myObj.columns[0] = 1;
                        return myObj;
                    }
                    if (newValue < 0.1) {
                        newValue = 0.1;
                    }
                    else if (newValue + 0.1 * (size - objNum - 1) > 1) {
                        newValue = 1 - (0.1 * (size - objNum - 1));
                    }
                    if ((oldValue === newValue) && (oldValue === 0.1)) {
                        myObj.columns[idx] = newValue;
                        return myObj;
                    }
                    if (oldValue > newValue) {
                        add = true;
                        spreadValue = (oldValue - newValue) / (size - objNum - 1);
                    }
                    else {
                        add = false;
                        spreadValue = (newValue - oldValue) / (size - objNum - 1);
                    }
                    spreadValue = Number(_this.roundTo(spreadValue, 2).toFixed(2));
                    if (spreadValue < 0.01) {
                        spreadValue = 0.1;
                    }
                }
                else {
                    myObj.columns[idx] = -1;
                    objNum++;
                    add = true;
                    if (myObj.columns.length == 1) {
                        spreadValue = 1;
                    }
                    else {
                        spreadValue = (oldValue) / (size - objNum);
                    }
                }
                for (var i = 0; i < size; i++) {
                    if (myObj.columns[i] !== -1) {
                        if ((i == idx)) {
                            myObj.columns[idx] = newValue;
                        }
                        else {
                            if (add) {
                                myObj.columns[i] += spreadValue;
                                if ((myObj.columns[i] > 0.9) && (myObj.columns.length - objNum != 1)) {
                                    myObj.columns[i] = 0.90;
                                }
                            }
                            else {
                                myObj.columns[i] -= spreadValue;
                                if (myObj.columns[i] < 0.1) {
                                    myObj.columns[i] = 0.10;
                                }
                            }
                            myObj.columns[i] = Number(_this.roundTo(myObj.columns[i], 2).toFixed(2));
                            sum += myObj.columns[i];
                        }
                        sum = Number(_this.roundTo(sum, 2).toFixed(2));
                        if (foundFirstNoObj == false) {
                            idxFirstNoObj = i;
                            foundFirstNoObj = true;
                        }
                    }
                }
                if (newValue === -1) {
                    myObj.columns[idx] = -1;
                    if (foundFirstNoObj) {
                        myObj.columns[idxFirstNoObj] += Number(_this.roundTo(1 - sum, 2).toFixed(2));
                    }
                }
                else {
                    myObj.columns[idx] = Number(_this.roundTo(1 - sum, 2).toFixed(2));
                }
                for (var j = 0; j < myObj.columns.length; j++) {
                    if (myObj.columns[j] !== -1 && !re1.test(String(myObj.columns[j])) &&
                        !re2.test(String(myObj.columns[j])) && !re3.test(String(myObj.columns[j]))) {
                        _this.instantColumnValue(0.10, j);
                    }
                }
                _this.columnWidthChangedEmitter.emit();
                _this._saveReportEvent.emit();
                return myObj;
            });
        };
        /**
         * This method set the imageUrl on the current AjfImageWidget.
         *
         * @param imageUrl
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setImageUrl = function (imageUrl) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                var myObj = widget;
                myObj.url = models.createFormula({ formula: "\"" + imageUrl + "\"" });
                return myObj;
            });
        };
        AjfReportBuilderService.prototype.setIcon = function (icon) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                var myObj = widget;
                myObj.icon = models.createFormula({ formula: "\"" + icon + "\"" });
                return myObj;
            });
        };
        AjfReportBuilderService.prototype.setFlag = function (value) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                var myObj = widget;
                myObj.flag = models.createFormula({ formula: "\"" + value + "\"" });
                return myObj;
            });
        };
        AjfReportBuilderService.prototype.saveCondition = function (conditionText) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                if (widget.visibility != null) {
                    widget.visibility.condition = conditionText;
                }
                return widget;
            });
        };
        AjfReportBuilderService.prototype.saveChartFormula = function (_label, _level, _mainIndex, _index, formulaText, aggregationType) {
            this._currentWidgetUpdate.next(function (w) {
                if (w == null) {
                    return null;
                }
                var widget = w;
                if (widget != null && widget.dataset != null) {
                    var formula = models.createFormula({});
                    var aggregation = reports.createAggregation({});
                    // let obj: any;
                    formula.formula = formulaText;
                    aggregation.aggregation = aggregationType;
                    // obj = {
                    //   'formula': formula.toJson(),
                    //   'aggregation': aggregation.toJson(),
                    //   'label': label
                    // };
                    // dataset = AjfDataset.fromJson(obj);
                    // check if the row that contains main data is defined
                    /* if (widget.dataset[0] == null) {
                      widget.dataset[0] = [];
                    }
            
                    if (level == 0 && mainIndex == -1 && index == -1) {
            
                      widget.dataset[0].push(dataset);
                    } else if (level == 1 && mainIndex == -1 && index == -1) {
            
                      widget.dataset[widget.dataset.length] = [];
                      widget.dataset[widget.dataset.length - 1].push(dataset);
                    } else if (index === - 1) {
                      widget.dataset[mainIndex + 1].push(dataset);
                    } else {
                      widget.dataset[mainIndex].splice(index, 1, dataset);
                    } */
                }
                return widget;
            });
        };
        AjfReportBuilderService.prototype.saveTableFormula = function (_label, aggregationType, formulaText, _mainIndex, _index) {
            this._currentWidgetUpdate.next(function (w) {
                if (w == null) {
                    return null;
                }
                var widget = w;
                if (widget.dataset != null) {
                    var formula = models.createFormula({});
                    var aggregation = reports.createAggregation({});
                    // let dataset: AjfDataset = new AjfDataset();
                    // let rowDataset: AjfDataset[] = [];
                    // let obj: any;
                    formula.formula = formulaText;
                    aggregation.aggregation = aggregationType;
                    // obj = {
                    //   'formula': formula.toJson(),
                    //   'aggregation': aggregation.toJson(),
                    //   'label': label
                    // };
                    // dataset = AjfDataset.fromJson(obj);
                    /* if (mainIndex === - 1) {
                      widget.dataset[widget.dataset.length] = [];
                      widget.dataset[widget.dataset.length - 1].push(dataset);
                    } else {
                      if (index === -1) {
                        widget.dataset[mainIndex].push(dataset);
                      } else {
                        widget.dataset[mainIndex].splice(index, 1, dataset);
                      }
                    } */
                }
                return widget;
            });
        };
        AjfReportBuilderService.prototype.removeTableMainData = function (index) {
            this._removeFromCurrentWidgetArrayProperty('dataset', index);
        };
        AjfReportBuilderService.prototype.removeData = function (_mainIndex, _index) {
            this._currentWidgetUpdate.next(function (widget) {
                var myObj = widget;
                /* if (index === -1) {
                  myObj.dataset.splice(mainIndex, 1);
                } else {
                  myObj.dataset[mainIndex].splice(index, 1);
                } */
                return myObj;
            });
        };
        /**
         * update type field of AjfChartWidget current widget
         *
         * @param type
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setChartType = function (type) {
            this._setCurrentWidgetProperty('type', type);
        };
        /**
         * remove  idx element of xLabels field of AjfChartWidget current widget
         *
         * @param idx
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.removeMainData = function (_idx) {
            this._currentWidgetUpdate.next(function (widget) {
                var myObj = widget;
                // myObj.dataset[0].splice(idx, 1);
                return myObj;
            });
        };
        AjfReportBuilderService.prototype.removeRelatedData = function (_mainIdx, _idx) {
            this._currentWidgetUpdate.next(function (widget) {
                var myObj = widget;
                /* if (idx == -1) {
                  myObj.dataset.splice(mainIdx + 1, 1);
                } else {
                  myObj.dataset[mainIdx + 1].splice(idx, 1);
                } */
                return myObj;
            });
        };
        /**
         * update backgroundColor field of AjfChartWidget current widget
         *
         * @param colors
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setChartBackgroundColor = function (colors) {
            this._setCurrentWidgetProperty('backgroundColor', colors);
        };
        AjfReportBuilderService.prototype.addChartBackgroundColor = function (color) {
            this._addToCurrentWidgetArrayProperty('backgroundColor', color);
        };
        AjfReportBuilderService.prototype.removeChartBackgroundColor = function (idx) {
            this._removeFromCurrentWidgetArrayProperty('backgroundColor', idx);
        };
        /**
         * update borderColor field of AjfChartWidget current widget
         *
         * @param colors
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setChartBorderColor = function (colors) {
            this._setCurrentWidgetProperty('borderColor', colors);
        };
        AjfReportBuilderService.prototype.setChartBorderWidth = function (value) {
            this._setCurrentWidgetProperty('borderWidth', value);
        };
        AjfReportBuilderService.prototype.addChartBorderColor = function (color) {
            this._addToCurrentWidgetArrayProperty('borderColor', color);
        };
        AjfReportBuilderService.prototype.removeChartBorderColor = function (idx) {
            this._removeFromCurrentWidgetArrayProperty('borderColor', idx);
        };
        /**
         * This method set the AjfReport.
         *
         * @param report
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setReport = function (report) {
            this._report.next(report);
        };
        /**
         * This method set the export report.
         *
         * @param report
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setSaveReport = function (json) {
            this._saveReport.next(json);
        };
        /**
         * This method set the font attribute on the current AjfWidget.
         *
         * There is a check on font-size attribute,
         * if is no specificate the type of size font set 'pt' as default.
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setWidgetStyles = function (label, value) {
            var _this = this;
            this._currentWidgetUpdate.next(function (widget) {
                var myObj = widget;
                var pxStyles = ['font-size', 'height', 'width', 'border-width', 'border-radius', 'padding', 'margin'];
                var isPxStyle = pxStyles.indexOf(label) > -1;
                if (isPxStyle && !(value instanceof Array) && _this.isNumber(value)) {
                    value += 'px';
                }
                else if (isPxStyle && value instanceof Array && _this.isNumberArray(value)) {
                    value = value.join('px ') + "px";
                }
                myObj.styles[label] = value;
                return myObj;
            });
        };
        /**
         * this method update the styles of origin widget array
         *
         * @param origin can be header content or footer
         * @param label for example background-color
         * @param value for example rgb(255,255,255,1)
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setSectionStyles = function (origin, label, value) {
            if ((origin !== 'header') && (origin !== 'content') && (origin !== 'footer')) {
                throw new Error('uncknow origin ' + origin);
            }
            this._updates[origin].next(function (widget) {
                widget.styles[label] = value;
                widget.styles = __assign({}, widget.styles);
                return widget;
            });
        };
        /**
         * this method set the style of the whole report.
         *
         * @param label for example background-color
         * @param value for example rgb(255,255,255,1)
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setReportStyles = function (label, value) {
            this._reportStylesUpdate.next(function (styles) {
                if (styles == null) {
                    styles = {};
                }
                else {
                    styles[label] = value;
                    styles = __assign({}, styles);
                }
                return styles;
            });
        };
        /**
         *  update forms
         *
         * @param forms
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.setReportForms = function (forms) {
            this._reportFormsUpdate.next(function (_form) {
                return forms || [];
            });
        };
        /**
         * update customWidgets
         *
         * @param widget
         * @param [position]
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.addCustomWidgets = function (widget, position) {
            this._customWidgetsUpdate.next(function (customWidgets) {
                customWidgets = customWidgets || [];
                if (position != null && position >= 0) {
                    customWidgets.splice(position, 0, widget);
                }
                else {
                    customWidgets.push(widget);
                }
                return customWidgets;
            });
        };
        /**
         * reset customWidgets
         *
         * @param widget
         * @param [position]
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.resetCustomWidgets = function () {
            this._customWidgetsUpdate.next(function (customWidgets) {
                customWidgets.length = 0;
                return customWidgets;
            });
        };
        /**
         * update label of widget
         *
         * @param label
         * @param position
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.changeLabelCustomWidget = function (label, position) {
            this._customWidgetsUpdate.next(function (customWidgets) {
                customWidgets[position].type = label;
                return customWidgets;
            });
        };
        /**
         * Add an AjfWidget on _headerWidgetsUpdate
         *
         * @param widget
         * @param [position]
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.addHeaderWidget = function (widget, position) {
            this._addWidgetToContainer(this._headerWidgetsUpdate, widget, position);
        };
        /**
         * Add an AjfWidget on _contentWidgetsUpdate
         *
         * @param widget
         * @param [position]
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.addContentWidget = function (widget, position) {
            this._addWidgetToContainer(this._contentWidgetsUpdate, widget, position);
        };
        /**
         * Add an AjfWidget on _footerWidgetsUpdate
         *
         * @param widget
         * @param [position]
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.addfooterWidget = function (widget, position) {
            this._addWidgetToContainer(this._footerWidgetsUpdate, widget, position);
        };
        AjfReportBuilderService.prototype.unfixedColumn = function (idx) {
            var _this = this;
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return widget;
                }
                var myObj = widget;
                var num = myObj.columns.length;
                var checkSum = 0;
                var objNum = 0;
                var value = 1;
                var spreadValue;
                myObj.columns[idx] = 0;
                for (var j = 0; j < num; j++) {
                    if (myObj.columns[j] === -1) {
                        objNum++;
                    }
                }
                value = Number(_this.roundTo(1 / (num - objNum), 2).toFixed(2));
                for (var i = 0; i < num; i++) {
                    if (myObj.columns[i] !== -1) {
                        myObj.columns[i] = value;
                        checkSum = Number(_this.roundTo(checkSum + value, 2).toFixed(2));
                    }
                }
                checkSum = Number(_this.roundTo(checkSum, 2).toFixed(2));
                if (checkSum > 1) {
                    spreadValue = parseFloat(_this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                    myObj.columns[idx] -= spreadValue;
                    myObj.columns[idx] = _this.roundTo(myObj.columns[idx], 2);
                }
                else if (checkSum < 1) {
                    myObj.columns[idx] += (1 - (checkSum % 1));
                    myObj.columns[idx] = Number(_this.roundTo(myObj.columns[idx], 2).toFixed(2));
                }
                return myObj;
            });
        };
        /**
         * Add column on the current AjfLayoutWidget.
         *
         * When adding a column the width of the other columns is recalculated
         * by dividing it by the number of column
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.addColumn = function () {
            var _this = this;
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                var myObj = widget;
                var tempObj = [];
                var num = myObj.columns.length + 1;
                var checkSum = 0;
                var objNum = 0;
                var value = 1;
                var tmpValue;
                if (num > 10) {
                    throw new Error('exceed max columns');
                }
                for (var j = 0; j < num; j++) {
                    if (myObj.columns[j] === -1) {
                        objNum++;
                    }
                }
                value = Number(_this.roundTo(1 / (num - objNum), 2).toFixed(2));
                for (var i = 0; i < num; i++) {
                    if (myObj.columns[i] === -1) {
                        tempObj.push(-1);
                    }
                    else {
                        tempObj.push(value);
                        checkSum = Number(_this.roundTo(checkSum + value, 2).toFixed(2));
                    }
                }
                checkSum = Number(_this.roundTo(checkSum, 2).toFixed(2));
                if (checkSum > 1) {
                    tmpValue = parseFloat(_this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                    tempObj[0] -= tmpValue;
                    tempObj[0] = _this.roundTo(tempObj[0], 2);
                }
                else if (checkSum < 1) {
                    tempObj[0] += (1 - (checkSum % 1));
                    tempObj[0] = Number(_this.roundTo(tempObj[0], 2).toFixed(2));
                }
                myObj.columns = tempObj;
                // TODO: @trik what's value?!?
                var columnObj = reports.createWidget({
                    widgetType: 7,
                });
                myObj.content.push(columnObj);
                _this._saveReportEvent.emit();
                return myObj;
            });
        };
        AjfReportBuilderService.prototype.removeWidgetToColumn = function (column, index) {
            column.content.splice(index, 1);
        };
        /**
         * This method remove a widget on the current AjfReport.
         *
         * @param node
         * the position array:
         *
         * header -`>` headerWidgets
         * content -`>` contentWidgets
         * footer -`>` footerWidgets
         * column -`>` column of layout
         * layoutContent -`>` content of layout
         * obj -`>` obj of layout
         * customWidget -`>` custom widget
         *
         * @param idx the position array
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.remove = function (node, idx) {
            var _this = this;
            switch (node) {
                case 'header':
                case 'content':
                case 'footer':
                    this._updates[node].next(function (widgets) {
                        if (widgets.widgets.length === 0) {
                            throw new Error('you can not remove from empty array');
                        }
                        if (widgets.widgets[idx] == null) {
                            throw new Error('invalid index');
                        }
                        widgets.widgets.splice(idx, 1);
                        _this.updateCurrentWidget(null);
                        return widgets;
                    });
                    break;
                case 'layout':
                    this._currentWidgetUpdate.next(function (widget) {
                        if (widget == null) {
                            return null;
                        }
                        var myObj = widget;
                        if (myObj.columns.length === 1) {
                            myObj.content[0].content.length = 0;
                            return myObj;
                        }
                        if (myObj.columns[idx] == null) {
                            throw new Error('this content is undefined');
                        }
                        else {
                            var spread = myObj.columns[idx] / (myObj.columns.length - 1);
                            if (myObj.columns.length > 1) {
                                myObj.columns.splice(idx, 1);
                                myObj.content.splice(idx, 1);
                            }
                            for (var i = 0; i < myObj.columns.length; i++) {
                                myObj.columns[i] += spread;
                            }
                            _this.instantColumnValue(myObj.columns[0], 0);
                        }
                        return myObj;
                    });
                    break;
                case 'column':
                case 'layoutContent':
                case 'unfixedColumn':
                    this._currentWidgetUpdate.next(function (widget) {
                        if (widget == null) {
                            return null;
                        }
                        var myObj = widget;
                        if (node === 'column') {
                            var clm = widget;
                            clm.content.splice(idx, 1);
                        }
                        else if (node === 'layoutContent') {
                            if (myObj.columns.length === 0) {
                                throw new Error('the column length is 0');
                            }
                            if (myObj.content.length === 0) {
                                throw new Error('can not remove any widget from empty content');
                            }
                            if (myObj.columns[idx] != null && myObj.content[idx] == null) {
                                throw new Error('this content is undefined');
                            }
                        }
                        else if (node === 'unfixedColumn') {
                            if (myObj.columns[idx] !== -1) {
                                throw new Error('the column position value  isnt -1');
                            }
                            _this.unfixedColumn(idx);
                        }
                        // if (node !== 'obj') {
                        //   let spread = myObj.columns[idx] / (myObj.columns.length - 1);
                        //   myObj.content.splice(idx, 1);
                        //   if (myObj.columns.length > 1) {
                        //     myObj.columns.splice(idx, 1);
                        //   }
                        //   for (let i = 0; i < myObj.columns.length; i++) {
                        //     myObj.columns[i] += spread;
                        //   }
                        //   this.instantColumnValue(myObj.columns[0], 0);
                        // }
                        return myObj;
                    });
                    break;
                case 'customWidgets':
                    {
                        this._updates[node].next(function (widgets) {
                            if (widgets.length === 0) {
                                throw new Error('you can not remove from empty array');
                            }
                            if (widgets[idx] == null) {
                                throw new Error('invalid index');
                            }
                            widgets.splice(idx, 1);
                            return widgets;
                        });
                    }
                    break;
                default:
                    throw new Error('unknown node ' + node);
            }
        };
        /**
         * This method add a AjfWidget on the current AjfLayoutWidget.
         *
         * @param newWidget
         * @param idx
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.addToContent = function (newWidget, idx) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                var myObj = widget;
                if (myObj.content[idx] != null) {
                    myObj.content.splice(idx, 1);
                }
                myObj.content.splice(idx, 0, newWidget);
                return myObj;
            });
        };
        AjfReportBuilderService.prototype.addToColumn = function (event, toColumn, position) {
            if (event.dragData && event.dragData.fromColumn != null) {
                var fromColumn = event.dragData.fromColumn;
                var widget = event.dragData.widget;
                var fromIndex = event.dragData.fromIndex;
                fromColumn.content.splice(fromIndex, 1);
                toColumn.content.push(widget);
            }
            else if (event.dragData && event.dragData.arrayFrom) {
                this.remove(event.dragData.arrayFrom, event.dragData.fromIndex);
                toColumn.content.push(event.dragData.widget);
            }
            else if (event.dragData && event.dragData.json) {
                var obj = JSON.parse(event.dragData.json);
                var newWidget = utils.deepCopy(obj);
                if (position != null) {
                    toColumn.content.splice(position, 0, newWidget);
                }
                else {
                    toColumn.content.push(newWidget);
                }
            }
            else {
                var obj = { 'widgetType': reports.AjfWidgetType[event.dragData] };
                var newWidget = utils.deepCopy(obj);
                if (position != null) {
                    toColumn.content.splice(position, 0, newWidget);
                }
                else {
                    toColumn.content.push(newWidget);
                }
            }
        };
        AjfReportBuilderService.prototype.changePositionOnColumn = function (event, toColumn, toIndex) {
            var fromColumn = event.dragData.fromColumn;
            var fromIndex = event.dragData.fromIndex;
            var fromWidget = fromColumn.content[fromIndex];
            var toWidget = fromColumn.content[toIndex];
            if (fromColumn == toColumn) {
                fromColumn.content[fromIndex] = toWidget;
                fromColumn.content[toIndex] = fromWidget;
            }
            else {
                fromColumn.content.splice(fromIndex, 1);
                toColumn.content.splice(toIndex, 0, fromWidget);
            }
        };
        /**
         * This method add the obj on the idx position.
         * Obj have a no specificate width and is not calculate as columns
         *
         * @param idx
         *
         * @memberOf AjfReportBuilderService
         */
        AjfReportBuilderService.prototype.fixedColumn = function (idx) {
            this.instantColumnValue(-1, idx);
        };
        AjfReportBuilderService.prototype.changeColumn = function (from, to, layoutWidget) {
            if (to < 0 || to >= layoutWidget.content.length) {
                return;
            }
            if (from > layoutWidget.content.length - 1 && to > from) {
                return;
            }
            var fromColumn = layoutWidget.content[from];
            var fromColumnValue = layoutWidget.columns[from];
            var toColumn = layoutWidget.content[to];
            var toColumnValue = layoutWidget.columns[to];
            layoutWidget.content[from] = toColumn;
            layoutWidget.columns[from] = toColumnValue;
            layoutWidget.content[to] = fromColumn;
            layoutWidget.columns[to] = fromColumnValue;
            this.updateCurrentWidget(layoutWidget);
        };
        AjfReportBuilderService.prototype.addCustomColor = function (color) {
            this._updates['color'].next(function (colors) {
                if (colors.indexOf(color) < 0) {
                    colors.push(color);
                }
                return colors;
            });
        };
        AjfReportBuilderService.prototype._addWidgetToContainer = function (subj, widget, position) {
            subj.next(function (widgets) {
                if (position != null && position >= 0) {
                    widgets.widgets.splice(position, 0, widget);
                }
                else {
                    widgets.widgets.push(widget);
                }
                return widgets;
            });
            this.updateCurrentWidget(widget);
            this.setEmptyContent(false);
        };
        AjfReportBuilderService.prototype._setCurrentWidgetProperty = function (propName, value) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                widget[propName] = value;
                return widget;
            });
        };
        AjfReportBuilderService.prototype._addToCurrentWidgetArrayProperty = function (propName, value) {
            this._currentWidgetUpdate.next(function (widget) {
                if (widget == null) {
                    return null;
                }
                var arr = widget[propName];
                arr.push(value);
                widget[propName] = arr;
                return widget;
            });
        };
        AjfReportBuilderService.prototype._removeFromCurrentWidgetArrayProperty = function (propName, idx) {
            this._currentWidgetUpdate.next(function (widget) {
                widget[propName].splice(idx, 1);
                return widget;
            });
        };
        AjfReportBuilderService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AjfReportBuilderService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [AJF_REPORTS_CONFIG,] }] }
        ]; };
        return AjfReportBuilderService;
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
     * this component manages the report text
     *
     * @export
     */
    var AjfReportBuilderColumn = /** @class */ (function () {
        function AjfReportBuilderColumn(_service) {
            this._service = _service;
            /**
             * if true mouse event is on dragged status
             *
             * @memberOf AjfReportBuilderContent
             */
            this.showActions = false;
            this.layoutShow = false;
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            this._onDraggedSub = rxjs.Subscription.EMPTY;
        }
        AjfReportBuilderColumn.prototype.addToList = function (event, idx, toColumn) {
            this.onDragEndHandler();
            if (event.dragData.fromColumn) {
                this._service.changePositionOnColumn(event, toColumn, idx);
            }
            else {
                this._service.addToColumn(event, toColumn, idx);
            }
        };
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderColumn.prototype.onDragStartHandler = function () {
            var _this = this;
            var s = rxjs.timer(200).subscribe(function () {
                s.unsubscribe();
                _this._service.dragStarted();
            });
        };
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderColumn.prototype.onDragEndHandler = function () {
            this._service.dragEnded();
        };
        AjfReportBuilderColumn.prototype.ngOnInit = function () {
            // this.widget = changes.widget.currentValue;
            var _this = this;
            this._onDraggedSub = this._service.onDragged.subscribe(function (x) {
                _this.onDragged = x;
            });
        };
        AjfReportBuilderColumn.prototype.ngOnDestroy = function () {
            this._onDraggedSub.unsubscribe();
        };
        AjfReportBuilderColumn.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-column',
                        template: "<ng-template [ngIf]=\"column.content != null\">\n  <div class=\"ajf-column\"\n    [ngClass]=\"{'ajf-is-on-over': showActions}\"\n    (mouseenter)=\"showActions = true\"\n    (mouseleave)=\"showActions = false\">\n    <mat-list>\n      <ng-template ngFor let-widget let-idx=\"index\" [ngForOf]=\"column.content\">\n\n        <ng-template [ngIf]=\"!onDragged\">\n          <ajf-report-builder-widgets-row-buttons\n              cdkDrag\n              [cdkDragData]=\"{fromColumn: column, fromIndex: idx, widget: widget, dropZones: ['widget']}\"\n              [from]=\"'column'\"\n              [fromWidget]=\"column\"\n              [widget]=\"widget\"\n              [position]=\"idx\"\n              [child]=\"true\"\n              (cdkDragStarted)=\"onDragStartHandler()\"\n              (cdkDragEnded)=\"onDragEndHandler()\">\n          </ajf-report-builder-widgets-row-buttons>\n        </ng-template>\n        <ajf-report-builder-renderer-widget [widget]=\"widget\"></ajf-report-builder-renderer-widget>\n      </ng-template>\n    </mat-list>\n  </div>\n</ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".ajf-column{max-width:100%;max-height:100%;background:rgba(0,0,0,0);z-index:100}.ajf-column span{flex-direction:row;width:100%}.ajf-column .mat-list{padding:0}.ajf-column:hover span,.ajf-is-on-over span{visibility:visible !important;display:block !important}.ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}mat-list{height:100%;padding:0}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderColumn.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilderColumn.propDecorators = {
            column: [{ type: core.Input }]
        };
        return AjfReportBuilderColumn;
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
    function ajfReportBuilderWidgetToString(widgetType) {
        return "reportbuilder-" + widgetType.toLowerCase();
    }
    function ajfWidgetTypeStringToIcon(widgetType) {
        return "widget-" + widgetType.toLowerCase();
    }
    function ajfWidgetTypeToIcon(widgetType) {
        return ajfWidgetTypeStringToIcon(reports.AjfWidgetType[widgetType]);
    }
    function ajfWidgetTypeStringToLabel(widgetType) {
        return "widgetType." + widgetType;
    }
    function ajfWidgetTypeToLabel(type) {
        return ajfWidgetTypeStringToLabel(reports.AjfWidgetType[type]);
    }
    function widgetReportBuilderIconName(type) {
        return "reportbuilder-" + reports.AjfWidgetType[type].toLowerCase();
    }
    function sanitizeConditionString(str) {
        str = str.trim();
        while (str.indexOf('  ') > 0) {
            str = str.replace('  ', ' ');
        }
        return str;
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
    var AjfReportBuilderConditionEditor = /** @class */ (function () {
        /**
         * this constructor will init current condition by ajfBuilderservice
         * and init condition and availableFieldNames subscriptions
         */
        function AjfReportBuilderConditionEditor(_service) {
            this._service = _service;
            this.isValid = false;
            this.names = [];
            // conditionText is a string
            this.conditionText = 'true';
            //  operators is an array of any type that contains all allow operators
            this.operators = [
                '( )', '\' \'', '<', '<=', '==', '>=', '>', '!=', '!', '&&', '||', '+', '-', '*', '/', '%',
                'true', 'false'
            ];
            this._conditionNamesSub = rxjs.Subscription.EMPTY;
        }
        AjfReportBuilderConditionEditor.prototype.extractNames = function (formsVariables) {
            this.names.length = 0;
            for (var i = 0; i < formsVariables.length; i++) {
                this.names = this.names.concat(formsVariables[i].names);
            }
        };
        AjfReportBuilderConditionEditor.prototype.setCurrent = function (id, index) {
            this.currentId = id;
            this.appendText(this.formsVariables[id].names[index]);
            this.checkValidation();
        };
        /**
         * this method will return success if the current condtion is valid
         * @return boolean
         */
        AjfReportBuilderConditionEditor.prototype.validateCondition = function () {
            return models.validateExpression(this.conditionText, this.names);
        };
        // TODO complete the comment
        /**
         * this method will append text to json
         * @param text      : string -
         * @param goBackNum : number -
         */
        AjfReportBuilderConditionEditor.prototype.appendText = function (text, _goBackNum) {
            if (text == null || this.conditionTextArea == null) {
                return;
            }
            var el = this.conditionTextArea.nativeElement;
            var sStart = Math.min(el.selectionStart, el.selectionEnd);
            var sEnd = Math.max(el.selectionStart, el.selectionEnd);
            var startingString = this.conditionText.substr(0, sStart);
            var endingString = this.conditionText.substr(sEnd);
            var initialLenght = startingString.length;
            var newStr = '';
            startingString = sanitizeConditionString(startingString);
            endingString = sanitizeConditionString(endingString);
            sStart +=
                startingString.length - initialLenght + text.length + (startingString.length > 0 ? 2 : 1);
            newStr = startingString.length > 0 ? startingString + " " : '';
            this.conditionText = "" + newStr + text + " " + endingString;
            var s = rxjs.timer(0).subscribe(function () {
                if (s && !s.closed) {
                    s.unsubscribe();
                }
                if (el.createTextRange) {
                    var range = el.createTextRange();
                    range.move('character', sStart);
                    range.select();
                }
                else {
                    if (el.selectionStart) {
                        el.focus();
                        el.setSelectionRange(sStart, sStart);
                    }
                    else {
                        el.focus();
                    }
                }
            });
        };
        AjfReportBuilderConditionEditor.prototype.checkValidation = function () {
            this.isValid = this.validateCondition();
            if (this.isValid) {
                this.saveCondition();
            }
        };
        /**
         * this method will save current condition
         */
        AjfReportBuilderConditionEditor.prototype.saveCondition = function () {
            this._service.saveCondition(this.conditionText);
        };
        AjfReportBuilderConditionEditor.prototype.ngOnInit = function () {
            var _this = this;
            this.conditionText = this.visibility.condition;
            this.isValid = true;
            if (this.conditionText == 'true') {
                this.conditionText = '';
            }
            this._conditionNamesSub = this._service.conditionNames.subscribe(function (x) {
                _this.formsVariables = x;
                if (x != null) {
                    _this.extractNames(_this.formsVariables);
                }
            });
        };
        /**
         * this method will destroy a conditionSubscriptions
         */
        AjfReportBuilderConditionEditor.prototype.ngOnDestroy = function () {
            this._conditionNamesSub.unsubscribe();
        };
        AjfReportBuilderConditionEditor.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-condition-editor',
                        template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\">\n  <mat-card>\n    <mat-card-header>\n      <mat-card-title>condition of visibility</mat-card-title>\n      <mat-card-subtitle>\n        <ng-template [ngIf]=\"visibility\">\n          {{visibility.condition}}\n        </ng-template>\n      </mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n      <br>\n      <form>\n        <mat-select [(ngModel)]=\"a\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select condition\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option *ngFor=\"let label of form.labels;let i = index;\" [value]=\"label\" (click)=\"setCurrent(id, i)\">\n              {{ id}}: {{ label }}\n            </mat-option>\n          </ng-template>\n        </mat-select>\n        <mat-select [(ngModel)]=\"b\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select operator\">\n          <mat-option *ngFor=\"let operator of operators\" (click)=\"appendText(operator);\">\n            {{ operator }}\n          </mat-option>\n        </mat-select>\n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <ng-template [ngIf]=\"!isValid\">\n        <ng-container translate>Invalid condition! Please check syntax.</ng-container>\n      </ng-template>\n      <textarea\n          #conditionTextArea\n          [(ngModel)]=\"conditionText\"\n          (keyup)=\"checkValidation()\">\n        </textarea>\n    </mat-card-actions>\n  </mat-card>\n</ng-template>\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-condition-editor textarea{width:100%}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderConditionEditor.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilderConditionEditor.propDecorators = {
            visibility: [{ type: core.Input }],
            conditionTextArea: [{ type: core.ViewChild, args: ['conditionTextArea', { static: false },] }]
        };
        return AjfReportBuilderConditionEditor;
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
     *  manage the content page
     *
     * @export
     */
    var AjfReportBuilderContent = /** @class */ (function () {
        function AjfReportBuilderContent(_service, _cdRef) {
            this._service = _service;
            this._cdRef = _cdRef;
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            /**
             *  observe the status of the fixed zoom
             *
             * @memberOf AjfReportBuilderContent
             */
            this.fixedZoom = false;
            // this boolean sign if widget is in drag enter status
            this.onDragEnter = {};
            this.show = false;
            // this array contains all widget locate in header zone
            this.headerWidgets = [];
            // this array contains all widget locate in content zone
            this.contentWidgets = [];
            // this array contains all widget locate in footer zone
            this.footerWidgets = [];
            this.onOver = false;
            // this is the current widget
            this.currentWidget = null;
            /**
             * if true mouse event is on dragged status
             *
             * @memberOf AjfReportBuilderContent
             */
            this.showActions = false;
            this._onDraggedSub = rxjs.Subscription.EMPTY;
            this._fixedZoomSub = rxjs.Subscription.EMPTY;
            this._onDragEnterSub = rxjs.Subscription.EMPTY;
            this._headerWidgetsSub = rxjs.Subscription.EMPTY;
            this._contentWidgetsSub = rxjs.Subscription.EMPTY;
            this._footerWidgetsSub = rxjs.Subscription.EMPTY;
            this._onOverSub = rxjs.Subscription.EMPTY;
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
            this.headerStyles = this._service.headerStyles;
            this.contentStyles = this._service.contentStyles;
            this.footerStyles = this._service.footerStyles;
        }
        AjfReportBuilderContent.prototype.onMouseOver = function () {
            this.showActions = true;
            this._service.overStarted();
        };
        AjfReportBuilderContent.prototype.onMouseLeave = function () {
            this.showActions = false;
            this._service.overEnded();
        };
        AjfReportBuilderContent.prototype.canDropPredicate = function (dropZones) {
            return function (item) {
                for (var i = 0; i < item.data.dropZones.length; i++) {
                    if (dropZones.indexOf(item.data.dropZones[i]) > -1) {
                        return true;
                    }
                }
                return false;
            };
        };
        AjfReportBuilderContent.prototype.isLayout = function (widget) {
            return widget.widgetType === reports.AjfWidgetType.Layout;
        };
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.onDragStartHandler = function () {
            var _this = this;
            var s = rxjs.timer(200).subscribe(function () {
                if (s != null) {
                    s.unsubscribe();
                }
                _this._service.dragStarted();
            });
        };
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.onDragEndHandler = function () {
            this._service.dragEnded();
        };
        /**
         *  sign the enter of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.onDragEnterHandler = function (array, index) {
            if (index == null) {
                return;
            }
            this._service.dragEnter(array, index);
        };
        /**
         * sign the leave of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.onDragLeaveHandler = function () {
            this._service.dragLeave();
        };
        /**
         *  return true if array and index is === with array and index of onDragEnter
         *
         * @param array
         * @param index
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.onDragEnterCheck = function (array, index) {
            if ((array === this.onDragEnter.array) &&
                ((index === this.onDragEnter.index) || (index === -1))) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * remove widget element from type array in idx position
         *
         * @param type can be header content or footer
         * @param idx
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.remove = function (type, idx) {
            this._service.remove(type, idx);
        };
        /**
         * add widget element into type array in idx position
         *
         * @param type
         * @param event
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderContent.prototype.addToList = function (arrayTo, event, to) {
            this.onDragEndHandler();
            this._service.setOrigin(arrayTo);
            var itemData = event.item.data;
            if (itemData.fromColumn != null) {
                this._service.removeWidgetToColumn(itemData.fromColumn, itemData.fromIndex);
                this.currentWidget = itemData.widget;
            }
            else if (itemData.widget != null) {
                this.remove(itemData.arrayFrom, itemData.from);
                this.currentWidget = itemData.widget;
            }
            else if (itemData.json != null && itemData.json !== '') {
                this.currentWidget = utils.deepCopy(itemData.json);
            }
            else {
                var obj = { 'widgetType': reports.AjfWidgetType[itemData.widgetType] };
                this.currentWidget = utils.deepCopy(obj);
            }
            this.onDragEndHandler();
            if (this.currentWidget != null) {
                switch (arrayTo) {
                    case 'header':
                        this._service.addHeaderWidget(this.currentWidget, to);
                        break;
                    case 'content':
                        this._service.addContentWidget(this.currentWidget, to);
                        break;
                    case 'footer':
                        this._service.addfooterWidget(this.currentWidget, to);
                        break;
                }
            }
            this.onDragLeaveHandler();
        };
        AjfReportBuilderContent.prototype.ngOnInit = function () {
            var _this = this;
            this._headerWidgetsSub = this._service.headerWidgets.subscribe(function (x) {
                _this.headerWidgets = x.widgets;
            });
            this._contentWidgetsSub = this._service.contentWidgets.subscribe(function (x) {
                _this.contentWidgets = x.widgets;
            });
            this._footerWidgetsSub = this._service.footerWidgets.subscribe(function (x) {
                _this.footerWidgets = x.widgets;
            });
            this._onDraggedSub = this._service.onDragged.subscribe(function (x) {
                _this.onDragged = x;
            });
            this._fixedZoomSub = this._service.fixedZoom.subscribe(function (bool) {
                _this.fixedZoom = bool;
            });
            this._onDragEnterSub = this._service.onDragEnter.subscribe(function (x) {
                _this.onDragEnter = x;
            });
            this._onOverSub = this._service.onOver.subscribe(function (x) {
                _this.onOver = x;
            });
        };
        AjfReportBuilderContent.prototype.ngAfterViewChecked = function () {
            this._cdRef.detectChanges();
        };
        AjfReportBuilderContent.prototype.ngOnDestroy = function () {
            [this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
                this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub, this._onOverSub,
                this._onDragEnterSub]
                .forEach(function (s) {
                s.unsubscribe();
            });
        };
        AjfReportBuilderContent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-content',
                        template: "<div\n  class=\"ajf-overlay\"\n  [ngClass]=\"{'ajf-drag-mode': onDragged, 'ajf-zoom-mode': fixedZoom}\"\n  [applyStyles]=\"reportStyles|async\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\">\n  <div\n    class=\"ajf-header\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"(headerStyles|async)\">\n    <mat-list *ngFor=\"let t of headerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('header', $event, i);\"\n          (dragenter)=\"onDragEnterHandler('header', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t,fromIndex: i,arrayFrom: 'header', dropZones: ['widget','column']}\"\n          [style.display]=\"(showActions || onDragged)? 'block' : 'none'\"\n          [from]=\"'header'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler();\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'header'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': true}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['header','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('header', $event)\"\n        (dragenter)=\"onDragEnterHandler('header', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n    </div>\n  </div>\n  <div\n    class=\"ajf-content\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"contentStyles|async\">\n    <mat-list *ngFor=\"let t of contentWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('content', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('content', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'content', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'content'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'content'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['content','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('content', $event)\"\n        (dragenter)=\"onDragEnterHandler('content', contentWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n  </div>\n  <div\n    class=\"ajf-footer\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"footerStyles|async\">\n    <mat-list *ngFor=\"let t of footerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('footer', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('footer', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'footer', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'footer'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'footer'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['footer','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('footer', $event)\"\n        (dragenter)=\"onDragEnterHandler('footer', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: { '(mouseover)': 'onMouseOver()', '(mouseleave)': 'onMouseLeave()' },
                        styles: ["ajf-report-builder-content{text-align:center;display:block;margin-bottom:300px}ajf-report-builder-content .ajf-overlay.ajf-drag-mode{max-height:700px;margin-top:50px;background-color:beige}ajf-report-builder-content .ajf-drag-mode{overflow:scroll;zoom:50%}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-content,ajf-report-builder-content .ajf-drag-mode .ajf-footer{margin-bottom:20px;border:23px solid rgba(66,134,244,.2)}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{width:auto;background-color:rgba(66,134,244,.2);border:23px solid #fff;position:relative;min-height:50px !important;z-index:0;opacity:1}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(66,134,244,.2) !important;border:23px solid #fff !important}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-footer{border:23px solid rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-drop-zone-container{background-color:#000;border:16px solid #fff;position:relative;opacity:0;z-index:0;min-height:50px !important;display:none !important}ajf-report-builder-content .ajf-zoom-mode{zoom:50%}ajf-report-builder-content .ajf-header,ajf-report-builder-content .ajf-content,ajf-report-builder-content .ajf-footer{height:100%;min-height:50px;position:relative;text-align:center;display:block}ajf-report-builder-content .ajf-header .mat-list,ajf-report-builder-content .ajf-content .mat-list,ajf-report-builder-content .ajf-footer .mat-list{padding:0}ajf-report-builder-content .ajf-header .ajf-zoom:hover,ajf-report-builder-content .ajf-content .ajf-zoom:hover,ajf-report-builder-content .ajf-footer .ajf-zoom:hover{padding-bottom:100px;overflow-y:scroll}ajf-report-builder-content .ajf-content:hover{background-color:rgba(66,134,244,.2) !important}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-footer:hover{background-color:rgba(255,102,102,.4)}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-content:hover,ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-is-on-over{border:3px dotted #3a7999}ajf-report-builder-content .ajf-header:hover label,ajf-report-builder-content .ajf-content:hover label,ajf-report-builder-content .ajf-footer:hover label,ajf-report-builder-content .ajf-is-on-over label{visibility:visible !important;opacity:.4;display:block !important}ajf-report-builder-content .ajf-header:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-content:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-footer:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-is-on-over .ajf-drop-zone-container{display:block !important}ajf-report-builder-content .ajf-header:hover mat-list button,ajf-report-builder-content .ajf-content:hover mat-list button,ajf-report-builder-content .ajf-footer:hover mat-list button,ajf-report-builder-content .ajf-is-on-over mat-list button{display:inline}ajf-report-builder-content .ajf-my-content{width:100%;white-space:nowrap;overflow-y:auto}ajf-report-builder-content .ajf-show,ajf-report-builder-content .ajf-on-drag-over{opacity:1 !important;z-index:10}ajf-report-builder-content mat-list{position:relative;display:block}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderContent.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfReportBuilderContent;
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
    var AjfReportBuilderCustomWidgetDialog = /** @class */ (function () {
        function AjfReportBuilderCustomWidgetDialog(_service, _dialogRef) {
            this._service = _service;
            this._dialogRef = _dialogRef;
        }
        AjfReportBuilderCustomWidgetDialog.prototype.changeLabel = function () {
            this._service.changeLabelCustomWidget(this.label, this.position);
            this._dialogRef.close();
        };
        AjfReportBuilderCustomWidgetDialog.decorators = [
            { type: core.Component, args: [{
                        selector: 'custom-widget-dialog',
                        template: "<h3 matDialogTitle> set the label widget</h3>\n<mat-form-field>\n  <input matInput placeholder=\"add the label of this custom widget\" [(ngModel)]=\"label\"/>\n</mat-form-field>\n<button matDialogClose (click)=\"changeLabel()\"> Ok </button>\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderCustomWidgetDialog.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialogRef }
        ]; };
        AjfReportBuilderCustomWidgetDialog.propDecorators = {
            label: [{ type: core.Input }],
            position: [{ type: core.Input }]
        };
        return AjfReportBuilderCustomWidgetDialog;
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
    var AjfReportBuilderCustomWidgetToolbarButton = /** @class */ (function () {
        // {...t, dropZones: ['header','content','footer','column','widget']}
        /**
         * this constructor will init icon registry
         */
        function AjfReportBuilderCustomWidgetToolbarButton(_service) {
            this._service = _service;
            this.customWidgets = [];
        }
        /**
         * this method call a service method for remove custom widget
         *
         * @memberOf AjfReportBuilderCustomWidgetToolbarButton
         */
        AjfReportBuilderCustomWidgetToolbarButton.prototype.remove = function () {
            this._service.remove('customWidgets', this.position);
        };
        /**
         * this method will init  fieldIcon and fieldLabel
         */
        AjfReportBuilderCustomWidgetToolbarButton.prototype.ngOnInit = function () {
            this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
            this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
        };
        AjfReportBuilderCustomWidgetToolbarButton.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-custom-widget-toolbar-button',
                        template: "<a mat-button>\n  {{ widgetType}}\n  <i class=\"material-icons\"(click)=\"remove()\">remove_circle_outline</i>\n</a>\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute !important;margin-left:5px !important;z-index:5}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderCustomWidgetToolbarButton.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilderCustomWidgetToolbarButton.propDecorators = {
            widgetType: [{ type: core.Input }],
            position: [{ type: core.Input }]
        };
        return AjfReportBuilderCustomWidgetToolbarButton;
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
    var AjfReportBuilderCustomWidgetsToolbar = /** @class */ (function () {
        function AjfReportBuilderCustomWidgetsToolbar(_service, dialog) {
            this._service = _service;
            this.dialog = dialog;
            this.customWidgets = [];
            this._customWidgetsSub = rxjs.Subscription.EMPTY;
            this._threeColumnsLayout = '{"widgetType":0,' +
                '"content":[],"styles":{},"visibility":{"condition":"true"},"columns":[0.34,0.33,0.33],' +
                '"content":' +
                '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
                '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
                '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
            this._fourColumnsLayout = '{"widgetType":0,"content":[],"styles":{},"visibility":{"condition":"true"},' +
                '"columns":[0.25,0.25,0.25,0.25],"content":' +
                '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
                '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
                '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
                '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
        }
        AjfReportBuilderCustomWidgetsToolbar.prototype.openDialog = function (idx) {
            this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
            this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
            this._dialogRef.componentInstance.position = idx;
        };
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderCustomWidgetsToolbar.prototype.onDragStartHandler = function () {
            var _this = this;
            var s = rxjs.timer(200).subscribe(function () {
                if (s != null) {
                    s.unsubscribe();
                }
                _this._service.dragStarted();
            });
        };
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderCustomWidgetsToolbar.prototype.onDragEndHandler = function () {
            this._service.dragEnded();
        };
        /**
         *  sign the enter of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderCustomWidgetsToolbar.prototype.onDragEnterHandler = function (array, index) {
            this._service.dragEnter(array, index);
        };
        /**
         * sign the leave of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderCustomWidgetsToolbar.prototype.onDragLeaveHandler = function () {
            this._service.dragLeave();
        };
        AjfReportBuilderCustomWidgetsToolbar.prototype.ngOnInit = function () {
            var _this = this;
            this._customWidgetsSub = this._service.customWidgets.subscribe(function (x) {
                _this.customWidgets = x;
                if (_this.customWidgets.length > 0 &&
                    _this.customWidgets[_this.customWidgets.length - 1].type == '') {
                    _this.openDialog(_this.customWidgets.length - 1);
                }
            });
            this._service.addCustomWidgets({
                json: this._threeColumnsLayout,
                type: 'LayoutWidgetWith3Columns',
            });
            this._service.addCustomWidgets({ json: this._fourColumnsLayout, type: 'LayoutWidgetWith4Columns' });
        };
        AjfReportBuilderCustomWidgetsToolbar.prototype.ngOnDestroy = function () {
            this._customWidgetsSub.unsubscribe();
            this._service.resetCustomWidgets();
        };
        AjfReportBuilderCustomWidgetsToolbar.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-custom-widgets-toolbar',
                        template: "<mat-toolbar>\n  <ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\">\n    <ajf-report-builder-custom-widget-toolbar-button\n          cdkDrag\n          [cdkDragData]=\"t\"\n          [widgetType]=\"t.type\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\"\n          (click)=\"openDialog(i)\">\n    </ajf-report-builder-custom-widget-toolbar-button>\n   </ng-template>\n</mat-toolbar>\n\n\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderCustomWidgetsToolbar.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialog }
        ]; };
        return AjfReportBuilderCustomWidgetsToolbar;
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
    var AjfReportBuilderFormsAnalyzerDialog = /** @class */ (function () {
        function AjfReportBuilderFormsAnalyzerDialog(_service, _dialogRef, _) {
            var _this = this;
            this._service = _service;
            this._dialogRef = _dialogRef;
            this.aggregationTypes = utils.sizedEnumToStringArray(reports.AjfAggregationType);
            //  operators is an array of any type that contains all allow operators
            this.operators = [
                'true', 'false', '( )', '\' \'', '<', '<=', '>=', '>', '!=', '!', '&&', '||', '+', '-', '*',
                '/', '%', '=='
            ];
            this.formulaText = '';
            this.formulaDate = '';
            this.safeFormulaText = '';
            this.label = '';
            this.condition = '';
            this.aggregationType = reports.AjfAggregationType.Sum;
            this.currentId = 0;
            this.currentIndex = 0;
            this.labels = [];
            this.currentWidget = null;
            this.formsVariablesName = [];
            this.formsVariablesType = [];
            this._formAnalyzerSub = rxjs.Subscription.EMPTY;
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
            this._first = true;
            if (this.init == false) {
                this.formulaText = '';
                this.aggregationType = reports.AjfAggregationType.Sum;
            }
            this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
                if (x != null) {
                    _this.currentWidget = x;
                    if (_this.currentWidget.widgetType == 2) {
                        var myObj = _this.currentWidget;
                        if (myObj.imageType == image$1.AjfImageType.Flag) {
                            _this.formula = (myObj.flag) ? myObj.flag.formula : '';
                        }
                        else {
                            _this.formula = (myObj.icon) ? myObj.icon.formula : '';
                        }
                    }
                }
            });
            this._formAnalyzerSub = this._service.formsVariables.subscribe(function (x) {
                if (x != null) {
                    _this.formsVariables = x;
                }
            });
        }
        AjfReportBuilderFormsAnalyzerDialog.prototype.onEditorInit = function () {
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
            this._initFormsVariablesNames();
            this._updateVariables();
            this._updateFunctions();
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype._initFormsVariablesNames = function () {
            var _this = this;
            this.formsVariables.forEach(function (formVar) {
                formVar.names.forEach(function (name) {
                    _this.formsVariablesName.push(name);
                });
                formVar.types.forEach(function (type) {
                    _this.formsVariablesType.push(_this._fieldVarType(type) || '');
                });
            });
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype._updateVariables = function () {
            if (this.formsVariables == null) {
                return;
            }
            try {
                var value = '';
                for (var i = 0; i < this.formsVariablesName.length; i++) {
                    value += "declare const " + this.formsVariablesName[i] + ": " + this.formsVariablesType[i] + ";";
                }
                value += "\n";
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                    value;
            }
            catch (e) {
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype._updateFunctions = function () {
            try {
                monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                    models.AjfExpressionUtils.UTIL_FUNCTIONS;
            }
            catch (e) {
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype._fieldVarType = function (fieldType) {
            switch (fieldType) {
                case forms$1.AjfFieldType.Boolean:
                    return 'boolean';
                case forms$1.AjfFieldType.Date:
                case forms$1.AjfFieldType.DateInput:
                case forms$1.AjfFieldType.Time:
                    return 'Date';
                case forms$1.AjfFieldType.Empty:
                    return 'void';
                case forms$1.AjfFieldType.Formula:
                    return 'number';
                case forms$1.AjfFieldType.MultipleChoice:
                case forms$1.AjfFieldType.SingleChoice:
                    return 'any';
                case forms$1.AjfFieldType.Number:
                    return 'number';
                case forms$1.AjfFieldType.Table:
                    return 'Array';
                case forms$1.AjfFieldType.String:
                case forms$1.AjfFieldType.Text:
                    return 'string';
            }
            return null;
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.setCurrent = function (id, label, index) {
            if (!this.init) {
                this.label = label;
                this.init = true;
            }
            this.insertVariable(this.formsVariables[id].names[index] || '');
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.setCurrentId = function (id) {
            this.currentId = id;
            this.labels = this.formsVariables[id].labels;
            this._updateVariables();
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.setAggregationType = function (type) {
            this.aggregationType = type;
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.checkValidation = function () {
            if (this.validateFormula()) {
                this.safeFormulaText = this.formulaText;
                this.isValid = true;
            }
            else {
                this.isValid = false;
            }
            if (this.formulaText == '') {
                this.isValid = false;
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.validateFormula = function () {
            if (this.formulaText == '') {
                this.init = false;
            }
            if (this.formsVariables == null) {
                return false;
            }
            else {
                return models.validateExpression(this.formulaText, this.formsVariablesName);
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.saveDataset = function () {
            if (this.currentWidget != null) {
                switch (this.currentWidget.widgetType) {
                    case 2:
                        this.saveImageFormula();
                        break;
                    case 3:
                        this.saveFormulaHtml();
                        break;
                    case 4:
                        this.saveChartFormula();
                        break;
                    case 5:
                        this.saveTableFormula();
                        break;
                }
            }
            this.close();
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.saveImageFormula = function () {
            this._service.saveImageFormula(models.createFormula({ formula: this.formulaText }));
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.saveFormulaHtml = function () {
            this._service.saveFormulaToHtml(this.formulaText, this.reference);
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.saveChartFormula = function () {
            this._service.saveChartFormula(this.label, this.level, this.mainIndex, this.index, this.formulaText, this.aggregationType);
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.saveTableFormula = function () {
            this._service.saveTableFormula(this.label, this.aggregationType, this.formulaText, this.mainIndex, this.index);
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.insertVariable = function (variable) {
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
                this.formulaText = editor.getValue();
                this.checkValidation();
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.setVariable = function (variable) {
            if (this.monacoEditor != null && this.monacoEditor.editor != null) {
                var editor = this.monacoEditor.editor;
                editor.setValue(variable);
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.reset = function () {
            this.formulaText = '';
            this.aggregationType = reports.AjfAggregationType.None;
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.close = function () {
            this.reset();
            this._dialogRef.close();
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.ngOnInit = function () {
            this.formulaText = this.formula;
            this.aggregationType = this.aggregation;
            this.label = this.labelText;
            if (this.formulaText == '' || this.formulaText == null) {
                this.isValid = false;
            }
            else {
                this.isValid = true;
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.ngAfterViewChecked = function () {
            if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
                this.insertVariable(this.formulaText || '');
                this._first = false;
            }
        };
        AjfReportBuilderFormsAnalyzerDialog.prototype.ngOnDestroy = function () {
            this._formAnalyzerSub.unsubscribe();
            this._currentWidgetSub.unsubscribe();
        };
        AjfReportBuilderFormsAnalyzerDialog.decorators = [
            { type: core.Component, args: [{
                        selector: 'forms-analyzer-dialog',
                        template: "<h3 matDialogTitle> Formula editor </h3>\n<div mat-dialog-content #elem>\n  <ng-template [ngIf]=\"currentWidget != null && formsVariables != null\">\n    <div class=\"ajf-left\">\n      <mat-list>\n        <mat-list-item *ngFor=\"let operator of operators\">\n          <button mat-button (click)=\"insertVariable(operator)\">\n            <h4 matLine>{{operator}}</h4>\n          </button>\n        </mat-list-item>\n      </mat-list>\n    </div>\n    <div class=\"ajf-main\">\n      <mat-select *ngIf=\"!isFormula\" placeholder=\"Select type of agregation\" [(ngModel)]=\"aggregationType\">\n          <mat-option [value]=\"idx\" *ngFor=\"let ag of aggregationTypes; let idx = index\"> {{ ag }} </mat-option>\n      </mat-select>\n      <mat-form-field *ngIf=\"!isFormula\">\n        <textarea matInput placeholder=\"Name field\" [(ngModel)]=\"label\" ></textarea>\n      </mat-form-field>\n        <ajf-monaco-editor\n          (init)=\"onEditorInit()\"\n          (valueChange)=\"formulaText = $event;checkValidation();\"\n          [value]=\"condition\" language=\"javascript\">\n        </ajf-monaco-editor>\n    </div>\n    <div class=\"ajf-menu\">\n      <form>\n        <mat-select placeholder=\"Select form\" (selectionChange)=\"setCurrentId($event.value)\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option [value]=\"id\"> {{ id }} </mat-option>\n          </ng-template>\n        </mat-select>\n      </form>\n      <mat-list>\n        <h3 matSubheader>Field list</h3>\n        <mat-list-item *ngFor=\"let label of labels;let i = index\">\n          <button mat-button (click)=\"setCurrent(currentId, label, i)\">\n            <h4 matLine>{{label}}</h4>\n          </button>\n        </mat-list-item>\n      </mat-list>\n    </div>\n  </ng-template>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"saveDataset()\" [disabled]=\"!isValid\">Save</button>\n</div>\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["forms-analyzer-dialog{height:512px}forms-analyzer-dialog h4[matLine]{font-size:xx-small}forms-analyzer-dialog [mat-dialog-content]{flex-direction:row;display:flex;align-items:stretch;min-width:1000px}forms-analyzer-dialog [mat-dialog-content] .ajf-left{flex:1 0 10%;width:10%;overflow-y:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-left form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog [mat-dialog-content] .ajf-main{flex:1 0 55%;min-width:512px}forms-analyzer-dialog [mat-dialog-content] .ajf-main monaco-editor{height:450px;min-width:300px}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-select{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field textarea{width:auto;height:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-main textarea{width:80%;height:75px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu{flex:1 0 30%;overflow-y:auto;min-width:350px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog ajf-monaco-editor{min-width:400px}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderFormsAnalyzerDialog.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialogRef },
            { type: forms$1.AjfValidationService }
        ]; };
        AjfReportBuilderFormsAnalyzerDialog.propDecorators = {
            formula: [{ type: core.Input }],
            isFormula: [{ type: core.Input }],
            labelText: [{ type: core.Input }],
            aggregation: [{ type: core.Input }],
            init: [{ type: core.Input }],
            level: [{ type: core.Input }],
            index: [{ type: core.Input }],
            mainIndex: [{ type: core.Input }],
            reference: [{ type: core.Input }],
            monacoEditor: [{ type: core.ViewChild, args: [monacoEditor.AjfMonacoEditor, { static: false },] }]
        };
        return AjfReportBuilderFormsAnalyzerDialog;
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
     * this component provides the support for connect the form fields with the report
     *
     * @export
     */
    var AjfReportBuilderFormsAnalyzer = /** @class */ (function () {
        function AjfReportBuilderFormsAnalyzer(_service, dialog) {
            var _this = this;
            this._service = _service;
            this.dialog = dialog;
            this.currentWidget = null;
            this.forms = [];
            this.choicesOrigins = {};
            this.currentMainDataIndex = -1;
            this._dataset = [];
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
            this._formAnalyzerSub = rxjs.Subscription.EMPTY;
            this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
                if (x != null) {
                    _this.currentWidget = x;
                    // this._dataset = myObj.dataset;
                }
                else {
                    _this.currentWidget = null;
                }
            });
            this._formAnalyzerSub = this._service.formsVariables.subscribe(function (x) {
                if (x != null) {
                    _this.formsVariables = x;
                }
            });
        }
        AjfReportBuilderFormsAnalyzer.prototype.setCurrentIndex = function (index) {
            this.currentMainDataIndex = index;
        };
        AjfReportBuilderFormsAnalyzer.prototype.isSelected = function (index) {
            if (index === this.currentMainDataIndex) {
                return 'primary';
            }
            else {
                return undefined;
            }
        };
        /**
         *  get the X components label of the chart.
         *  they are contained in the first row of dataset
         *
         *
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        AjfReportBuilderFormsAnalyzer.prototype.getMainData = function () {
            if (this._dataset[0] != null) {
                var mainData = [];
                for (var i = 0; i < this._dataset[0].length; i++) {
                    mainData.push(this._dataset[0][i].label || '');
                }
                return mainData;
            }
            else {
                return [];
            }
        };
        /**
         *  get the Y components label of the chart.
         *  they are contained in the first column of dataset
         *
         *
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        AjfReportBuilderFormsAnalyzer.prototype.getDataset = function () {
            var dataset = [];
            if (this._dataset[0] != null) {
                for (var i = 1; i < this._dataset.length; i++) {
                    dataset.push(this._dataset[i][0].label || '');
                }
                return dataset;
            }
            else {
                return [];
            }
        };
        /**
         * get the related data label of the chart.
         * they are contained in the row of the Y component
         *
         *
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        AjfReportBuilderFormsAnalyzer.prototype.getRelatedData = function () {
            if (this._dataset[this.currentMainDataIndex + 1] != null) {
                var relatedData = [];
                for (var i = 1; i < this._dataset[this.currentMainDataIndex + 1].length; i++) {
                    relatedData.push(this._dataset[this.currentMainDataIndex + 1][i].label || '');
                }
                return relatedData;
            }
            else {
                return [];
            }
        };
        AjfReportBuilderFormsAnalyzer.prototype.getTableHeader = function () {
            var mainData = [];
            if (this._dataset != null) {
                for (var i = 0; i < this._dataset.length; i++) {
                    if (this._dataset[i][0] != null) {
                        mainData.push(this._dataset[i][0].label || '');
                    }
                }
            }
            return mainData;
        };
        AjfReportBuilderFormsAnalyzer.prototype.getTableData = function () {
            if (this._dataset[this.currentMainDataIndex] != null) {
                var tableData = [];
                for (var i = 1; i < this._dataset[this.currentMainDataIndex].length; i++) {
                    if (this._dataset[this.currentMainDataIndex][i] != null) {
                        tableData.push(this._dataset[this.currentMainDataIndex][i].label || '');
                    }
                }
                return tableData;
            }
            else {
                return [];
            }
        };
        AjfReportBuilderFormsAnalyzer.prototype.needMainData = function () {
            var myObj = this.currentWidget;
            if (myObj.chartType === reports.AjfChartType.Scatter || myObj.chartType === reports.AjfChartType.Bubble) {
                return false;
            }
            else {
                return true;
            }
        };
        AjfReportBuilderFormsAnalyzer.prototype.removeMainData = function (index) {
            this._service.removeMainData(index);
        };
        AjfReportBuilderFormsAnalyzer.prototype.removeDataset = function (index) {
            this.currentMainDataIndex = index;
            this._service.removeRelatedData(this.currentMainDataIndex, -1);
        };
        AjfReportBuilderFormsAnalyzer.prototype.removeTableMainData = function (index) {
            this._service.removeTableMainData(index);
        };
        AjfReportBuilderFormsAnalyzer.prototype.removeRelatedData = function (index) {
            this._service.removeRelatedData(this.currentMainDataIndex, index);
        };
        AjfReportBuilderFormsAnalyzer.prototype.removeData = function (mainIndex, index) {
            this._service.removeData(mainIndex, index);
        };
        /**
         *
         *
         *
         * @param index
         * @param editMode
         *
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        AjfReportBuilderFormsAnalyzer.prototype.openDialog = function (level, mainIndex, index, editMode) {
            this.dialogRef = this.dialog.open(AjfReportBuilderFormsAnalyzerDialog);
            if (editMode) {
                if (level === 1 && index === -1) {
                    index = 0;
                }
                if (level === 1) {
                    if (this.currentWidget != null && this.currentWidget.widgetType == reports.AjfWidgetType.Chart) {
                        mainIndex++;
                    }
                    index++;
                }
                this.dialogRef.componentInstance.labelText =
                    this._dataset[mainIndex] && this._dataset[mainIndex][index].label || '';
                /* this.dialogRef.componentInstance.formula =
                  this._dataset[mainIndex] &&
                  this._dataset[mainIndex][index].formula.formula || ''; */
                this.dialogRef.componentInstance.aggregation =
                    this._dataset[mainIndex] && this._dataset[mainIndex][index].aggregation.aggregation ||
                        reports.AjfAggregationType.None;
            }
            else {
                this.dialogRef.componentInstance.labelText = '';
                this.dialogRef.componentInstance.formula = '';
                this.dialogRef.componentInstance.aggregation = 0;
            }
            // this.dialogRef.componentInstance.formsVariables = this.formsVariables;
            this.dialogRef.componentInstance.currentWidget = this.currentWidget;
            this.dialogRef.componentInstance.level = level;
            this.dialogRef.componentInstance.mainIndex = mainIndex;
            this.dialogRef.componentInstance.index = index;
            this.dialogRef.componentInstance.init = false;
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogAddMainData = function () {
            this.openDialog(0, -1, -1, false);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogChartEditMainData = function () {
            this.openDialog(0, 0, this.currentMainDataIndex, true);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogTableEditMainData = function () {
            this.openDialog(0, this.currentMainDataIndex, 0, true);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogChartAddDataset = function () {
            this.openDialog(1, -1, -1, false);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogTableAddDataset = function () {
            this.openDialog(1, this.currentMainDataIndex, -1, false);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogChartAddDataOfDataset = function () {
            this.openDialog(1, this.currentMainDataIndex, -1, false);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogChartEditDataset = function () {
            this.openDialog(1, this.currentMainDataIndex, -1, true);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogTableEditDataset = function (index) {
            this.openDialog(1, this.currentMainDataIndex, index, true);
        };
        AjfReportBuilderFormsAnalyzer.prototype.openDialogChartEditDataOfDataset = function (index) {
            this.openDialog(1, this.currentMainDataIndex, index, true);
        };
        AjfReportBuilderFormsAnalyzer.prototype.ngOnDestroy = function () {
            this._currentWidgetSub.unsubscribe();
            this._formAnalyzerSub.unsubscribe();
        };
        AjfReportBuilderFormsAnalyzer.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-forms-analyzer',
                        template: "<ng-template [ngIf]=\"currentWidget != null && formsVariables != null\">\n  <ng-template [ngIf]=\"currentWidget.widgetType == 4\">\n    <ng-template  [ngIf]=\"needMainData()\">\n      <mat-tab-group>\n        <mat-tab [label]=\"'Main Data' | translate\">\n          <button mat-button (click)=\"openDialogAddMainData()\" style=\"width:100%;\">\n            Add Main Data\n          </button>\n          <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n            <ng-template ngFor let-label [ngForOf]=\"getMainData()\" let-idx=\"index\">\n              <mat-grid-tile>\n                  {{ label }}\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogChartEditMainData()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeMainData(idx)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n        </mat-tab>\n      </mat-tab-group>\n    </ng-template>\n    <mat-tab-group>\n      <mat-tab label=\"dataset\">\n        <button mat-button (click)=\"openDialogChartAddDataset()\" style=\"width:100%\">\n            add dataset\n        </button>\n        <mat-grid-list rowHeight=\"50px\" cols=\"4\">\n          <ng-template ngFor let-label [ngForOf]=\"getDataset()\" let-idx=\"index\">\n              <mat-grid-tile>\n                <button mat-button [color]=\"isSelected(idx)\"(click)=\"setCurrentIndex(idx)\">\n                  {{ label }}\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button (click)=\"setCurrentIndex(idx);openDialogChartAddDataOfDataset()\" style=\"width:100%\">\n                  add data\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"setCurrentIndex(idx);openDialogChartEditDataset()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeDataset(idx)\">Remove</button>\n              </mat-grid-tile>\n          </ng-template>\n        </mat-grid-list>\n      </mat-tab>\n      <mat-tab label=\"data\">\n        <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n          <ng-template ngFor let-label [ngForOf]=\"getRelatedData()\" let-idx=\"index\">\n            <mat-grid-tile>\n                {{ label }}\n            </mat-grid-tile>\n            <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"openDialogChartEditDataOfDataset(idx)\">Edit</button>\n            </mat-grid-tile>\n            <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"removeRelatedData(idx)\">Remove</button>\n            </mat-grid-tile>\n          </ng-template>\n        </mat-grid-list>\n        <div class=\"ajf-ui ajf-divider\"></div>\n      </mat-tab>\n    </mat-tab-group>\n  </ng-template>\n  <ng-template [ngIf]=\"currentWidget.widgetType == 5\">\n    <ng-template  [ngIf]=\"needMainData()\">\n      <mat-tab-group>\n        <mat-tab [label]=\"'Main Data' | translate\">\n          <button mat-button (click)=\"openDialogAddMainData()\"\n              translate\n              style=\"width:100%;\">Add Main Data</button>\n          <mat-grid-list rowHeight=\"50px\" cols=\"4\">\n            <ng-template ngFor let-label [ngForOf]=\"getTableHeader()\" let-idx=\"index\">\n              <mat-grid-tile>\n                <button mat-button [color]=\"isSelected(idx)\"(click)=\"setCurrentIndex(idx)\">\n                  {{ label }}\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogTableAddDataset()\"\n                    style=\"width:100%\">add data</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogTableEditMainData()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeTableMainData(idx)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n        </mat-tab>\n        <mat-tab [label]=\"'data' | translate\">\n          <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n            <ng-template ngFor let-label [ngForOf]=\"getTableData()\" let-idx=\"index\">\n              <mat-grid-tile>\n                  {{ label }}\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"openDialogTableEditDataset(idx)\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeData(currentMainDataIndex, idx + 1)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n      </mat-tab>\n      </mat-tab-group>\n    </ng-template>\n  </ng-template>\n</ng-template>\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-forms-analyzer{min-height:512px}ajf-report-builder-forms-analyzer .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-report-builder-forms-analyzer .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer mat-dialog-container{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-report-builder-forms-analyzer .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-forms-analyzer mat-tab-group .mat-tab-body-wrapper,ajf-report-builder-forms-analyzer mat-tab-group .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderFormsAnalyzer.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialog }
        ]; };
        return AjfReportBuilderFormsAnalyzer;
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
    var AjfImageFilterPipe = /** @class */ (function () {
        function AjfImageFilterPipe() {
        }
        AjfImageFilterPipe.prototype.transform = function (items, args) {
            return items.filter(function (item) { return (args.length === 0) || item.info.toLowerCase().includes(args.toLowerCase()); });
        };
        AjfImageFilterPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfImageFilter' },] },
            { type: core.Injectable }
        ];
        return AjfImageFilterPipe;
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
     * this component handle a group of image object
     * there are 2 types of view
     *  ajf-icon and class
     *
     * take a json in input
     *  'icon': 'false', // if true ajf-icon activated
     *  'class': ['flag-icon'], // add class in object style
     *  'prefixClass': 'flag-icon-', // prefix of class contained on data set
     *  'title': 'flags', title of data set
     *  'data': [
     *    {
     *      'class': 'dz', strind added on prefix
     *      'info': 'Algeria' info related to object (exploit on toolTip)
     *    }
     *  ]
     * };
     *
     * @export
     */
    var AjfReportBuilderImageGroup = /** @class */ (function () {
        function AjfReportBuilderImageGroup(_service) {
            this._service = _service;
            this._icon = null;
            this._classes = '';
            this.open = false;
            this.valueToSearch = '';
            /**
             * this event is fired when the user click on formula button on quill editor rool barƒ
             *
             * @memberof QuillEditorComponent
             */
            this.formulaClick = new core.EventEmitter();
        }
        Object.defineProperty(AjfReportBuilderImageGroup.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderImageGroup.prototype, "classes", {
            get: function () {
                return this._classes;
            },
            enumerable: false,
            configurable: true
        });
        AjfReportBuilderImageGroup.prototype.setIcon = function (fontSet, fontIcon) {
            this._icon = { fontSet: fontSet, fontIcon: fontIcon };
            this._service.setIcon(this._icon);
        };
        AjfReportBuilderImageGroup.prototype.setFlag = function (value) {
            this._classes = value;
            this._service.setFlag(value);
        };
        AjfReportBuilderImageGroup.prototype.setSearch = function (value) {
            this.valueToSearch = value.currentTarget.value;
        };
        AjfReportBuilderImageGroup.prototype.emitFormula = function () {
            this.formulaClick.emit();
        };
        AjfReportBuilderImageGroup.prototype.getFlag = function (value) {
            var returnValue = '';
            for (var i = 0; i < this.data.class.length; i++) {
                returnValue += this.data.class[i] + ' ';
            }
            returnValue += this.data.prefixClass + value;
            return returnValue;
        };
        AjfReportBuilderImageGroup.prototype.toggle = function () {
            this.open = !this.open;
        };
        AjfReportBuilderImageGroup.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-image-group',
                        template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderImageGroup.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilderImageGroup.propDecorators = {
            data: [{ type: core.Input }],
            formulaClick: [{ type: core.Output }]
        };
        return AjfReportBuilderImageGroup;
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
    var AjfReportBuilderProperties = /** @class */ (function () {
        function AjfReportBuilderProperties(_dialog, _service) {
            var _this = this;
            this._dialog = _dialog;
            this._service = _service;
            /**
             *  true when the first time chart type is setted
             *
             * @memberOf AjfReportBuilderProperties
             */
            this.initChartType = false;
            /**
             * the current widget
             *
             * @memberOf AjfReportBuilderProperties
             */
            this.currentWidget = null;
            /**
             * this array contains the forms exploited for generate data labels
             *
             * @memberOf AjfReportBuilderProperties
             */
            this.forms = [];
            this.colors = [];
            /**
             * FAKE DATA
             */
            this.formsJson = { forms: [] };
            /**
             * WIDGET
             */
            this.widgetName = '';
            this.marginExpanded = false;
            this.paddingExpanded = false;
            this.borderWidthExpanded = false;
            this.borderRadiusExpanded = false;
            this.backgroundColor = '#127bdc';
            this.styleBackgroundColor = 'rgb(255,255,255,0)';
            this.borderColor = '#127bdc';
            this.styleColor = 'rgb(0,0,0,0)';
            this.align = [false, 'center', 'right', 'justify'];
            this.fonts = [
                false, 'blackr', 'black-italic', 'bold', 'bold-condensed', 'bold-condensed-italic',
                'bold-italic', 'condensed', 'condensed-italic', 'italic', 'light', 'light-italic', 'medium',
                'medium-italic', 'thinr', 'thin-italic'
            ];
            this.currentModule = {};
            this.quillModules = {
                toolbar: [
                    ['formula'], ['bold', 'italic', 'underline', 'strike'],
                    // ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    // [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': this.colors }, { 'background': this.colors }],
                    [{ 'font': this.fonts }], [{ 'align': this.align }],
                    ['clean'],
                ]
            };
            this.chartBorderColor = [];
            this.chartBorderWidth = 3;
            /**
             *
             * IMAGE
             */
            this.imageUrl = 'https://angular.io/resources/images/logos/angular2/angular.png';
            /**
             *
             * TEXT
             */
            this.htmlText = '';
            /**
             * these variables indicate that the user want to change section
             */
            this.reportStyles = false;
            this.sectionStyles = false;
            this.widgetStyles = true;
            this.sectionColor = false;
            this.widgetColor = false;
            this.visibilitySection = false;
            this.currentColor = '';
            this._icon = null;
            this.iconSet = { 'icon': 'true', 'title': 'report', 'data': null };
            this.flagSet = {
                'icon': 'false',
                'class': ['flag-icon'],
                'prefixClass': 'flag-icon-',
                'title': 'flags',
                'data': [
                    { 'class': 'dz', 'info': 'Algeria' },
                    { 'class': 'ao', 'info': 'Angola' },
                    { 'class': 'bj', 'info': 'Benin' },
                    { 'class': 'bw', 'info': 'Botswana' },
                    { 'class': 'bf', 'info': 'Burkina Faso' },
                    { 'class': 'bi', 'info': 'Burundi' },
                    { 'class': 'cm', 'info': 'Cameroon' },
                    { 'class': 'cv', 'info': 'Cabo Verde' },
                    { 'class': 'cf', 'info': 'The Central African Republic' },
                    { 'class': 'td', 'info': 'Chad' },
                    { 'class': 'km', 'info': 'The Comoros' },
                    { 'class': 'ci', 'info': 'Cote D\'avoire' },
                    { 'class': 'cd', 'info': 'The Democratic Republic of Congo' },
                    { 'class': 'dj', 'info': 'Dijibouti' },
                    { 'class': 'eg', 'info': 'Egypt' },
                    { 'class': 'gq', 'info': 'Equatorial Guinea' },
                    { 'class': 'er', 'info': 'Eritrea' },
                    { 'class': 'et', 'info': 'Ethiopia' },
                    { 'class': 'tf', 'info': 'French Southern Territories' },
                    { 'class': 'ga', 'info': 'Gabon' },
                    { 'class': 'gm', 'info': 'The Gambia' },
                    { 'class': 'gh', 'info': 'Ghana' },
                    { 'class': 'gn', 'info': 'Guinea' },
                    { 'class': 'gw', 'info': 'Guinea-Bissau' },
                    { 'class': 'ke', 'info': 'Kenya' },
                    { 'class': 'ls', 'info': 'Leshotho' },
                    { 'class': 'lr', 'info': 'Liberia' },
                    { 'class': 'ly', 'info': 'Libya' },
                    { 'class': 'mg', 'info': 'Madagascar' },
                    { 'class': 'mw', 'info': 'Malawy' },
                    { 'class': 'ml', 'info': 'Mali' },
                    { 'class': 'mr', 'info': 'Mauritania' },
                    { 'class': 'mu', 'info': 'Mauritius' },
                    { 'class': 'yt', 'info': 'Mayotte' },
                    { 'class': 'ma', 'info': 'Marocco' },
                    { 'class': 'mz', 'info': 'Mozambique' },
                    { 'class': 'na', 'info': 'Namibia' },
                    { 'class': 'ne', 'info': 'Niger' },
                    { 'class': 'ng', 'info': 'Nigeria' },
                    { 'class': 'cg', 'info': 'Republic of the Congo' },
                    { 'class': 'rw', 'info': 'Rwnda' },
                    { 'class': 're', 'info': 'rèunion' },
                    { 'class': 'sh', 'info': 'Saint Helena, Ascension and Tristan da Cunha' },
                    { 'class': 'st', 'info': 'Sao Tome and Principe' },
                    { 'class': 'sn', 'info': 'Senegal' },
                    { 'class': 'sc', 'info': 'Seychelles' },
                    { 'class': 'sl', 'info': 'Sierra Leone' },
                    { 'class': 'so', 'info': 'Somalia' },
                    { 'class': 'za', 'info': 'South Africa' },
                    { 'class': 'ss', 'info': 'South Sudan' },
                    { 'class': 'sd', 'info': 'Sudan' },
                    { 'class': 'sz', 'info': 'Swaziland' },
                    { 'class': 'tz', 'info': 'Tanzania' },
                    { 'class': 'tg', 'info': 'Togo' },
                    { 'class': 'tn', 'info': 'Tunisia' },
                    { 'class': 'ug', 'info': 'Uganda' },
                    { 'class': 'eh', 'info': 'Western Sahara' },
                    { 'class': 'zm', 'info': 'Zambia' },
                    { 'class': 'zw', 'info': 'Zimbawe' },
                    { 'class': 'iq', 'info': 'Iraq' },
                    { 'class': 'lb', 'info': 'Lebanon' },
                    { 'class': 'bd', 'info': 'Bangladesh' },
                    { 'class': 'ir', 'info': 'Iran (Islamic Republic of)' },
                    { 'class': 'my', 'info': 'Malaysia' },
                    { 'class': 'np', 'info': 'Nepal' },
                    { 'class': 'pk', 'info': 'Pakistan' },
                    { 'class': 'th', 'info': 'Thailand' },
                    { 'class': 'jo', 'info': 'Jordan' },
                    { 'class': 'ye', 'info': 'Yemen' }
                ]
            };
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
            this._formsSub = rxjs.Subscription.EMPTY;
            this._colorSub = rxjs.Subscription.EMPTY;
            this._headerStyleSub = rxjs.Subscription.EMPTY;
            this._contentStylesSub = rxjs.Subscription.EMPTY;
            this._footerStylesSub = rxjs.Subscription.EMPTY;
            this._originSub = rxjs.Subscription.EMPTY;
            this._stylesUpdatesSubs = rxjs.Subscription.EMPTY;
            this._updateWidgetMarginEvt = new core.EventEmitter();
            this._updateWidgetPaddingEvt = new core.EventEmitter();
            this._updateWidgetBorderWidthEvt = new core.EventEmitter();
            this._updateWidgetBorderRadiusEvt = new core.EventEmitter();
            this.tabValue = 'backgroundColor';
            this.setForms();
            this.iconSet.data = Object.keys(_service.iconSets).filter(function (x) { return x != 'ajf-icon'; }).map(function (i) {
                return { name: i, icons: _service.iconSets[i] };
            });
            this._headerStyleSub = this._service.headerStyles.subscribe(function (s) {
                if (s['background-color'] != null) {
                    _this.styleBackgroundColor = s['background-color'];
                }
            });
            this._contentStylesSub = this._service.contentStyles.subscribe(function (s) {
                if (s['background-color'] != null) {
                    _this.styleBackgroundColor = s['background-color'];
                }
            });
            this._footerStylesSub = this._service.footerStyles.subscribe(function (s) {
                if (s['background-color'] != null) {
                    _this.styleBackgroundColor = s['background-color'];
                }
            });
            this._originSub = this._service.origin.subscribe(function (s) {
                _this.origin = s;
            });
        }
        Object.defineProperty(AjfReportBuilderProperties.prototype, "currentLayoutWidget", {
            get: function () {
                return this.currentWidget;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderProperties.prototype, "currentTextWidget", {
            get: function () {
                return this.currentWidget;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderProperties.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            enumerable: false,
            configurable: true
        });
        /**
         *
         * UTILS
         */
        /**
         * return a number value
         *
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.toNumber = function (value) {
            var numberPattern = /^(-)?\d+/g;
            if (value == null) {
                return 0;
            }
            else {
                var matches = value.match(numberPattern);
                if (matches == null || matches.length == 0) {
                    return 0;
                }
                return Number(matches[0]);
            }
        };
        AjfReportBuilderProperties.prototype.toNumberArray = function (value) {
            var _this = this;
            if (value == null) {
                return [];
            }
            else {
                return (value || '')
                    .replace('px', '')
                    .split(' ')
                    .filter(function (v) { return v !== '' && v != null; })
                    .map(function (v) { return _this.toNumber(v); });
            }
        };
        AjfReportBuilderProperties.prototype.fillPxNumberArray = function (value) {
            var vl = value.length;
            switch (vl) {
                case 0:
                    return [0, 0, 0, 0];
                case 1:
                    var v = value[0];
                    return [v, v, v, v];
                case 2:
                    var v21 = value[0];
                    var v22 = value[1];
                    return [v21, v22, v21, v22];
                case 3:
                    var v31 = value[0];
                    var v32 = value[1];
                    var v33 = value[2];
                    return [v31, v32, v33, v32];
                default:
                    return value;
            }
        };
        AjfReportBuilderProperties.prototype.percent = function (value) {
            var temp = this.roundTo(value * 100, 3);
            return temp;
        };
        AjfReportBuilderProperties.prototype.roundTo = function (value, decimalPositions) {
            var i = value * Math.pow(10, decimalPositions);
            i = Math.floor(i);
            return i / Math.pow(10, decimalPositions);
        };
        /**
         * call to service to set the forms
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.setForms = function () {
            var forms = [];
            try {
                for (var i = 0; i < this.formsJson.forms.length; i++) {
                    forms.push(utils.deepCopy(this.formsJson.forms[i]));
                }
                this._service.setReportForms(forms);
            }
            catch (e) {
            }
        };
        /**
         * call to service to set the width of the idx column of layout widget
         *
         * @param col
         * @param idx
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.instantColumnValue = function (col, idx) {
            if (col === null) {
                return;
            }
            this._service.instantColumnValue(col, idx);
        };
        /**
         *  force copy of style
         *
         * @memberOf AjfReportBuilderProperties
         */
        // TODO delete this
        AjfReportBuilderProperties.prototype.setStyle = function () {
            if (this.currentWidget == null) {
                return;
            }
            this.currentWidget.styles = utils.deepCopy(this.currentWidget.styles);
            this._service.updateCurrentWidget(this.currentWidget);
        };
        /**
         * call to service to add new style to widget
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.setWidgetStyles = function (label, value) {
            this._service.setWidgetStyles(label, value);
            this.currentColor = value;
            this.setStyle();
        };
        AjfReportBuilderProperties.prototype.setWidgetMargin = function (idx, value) {
            this._updateWidgetMarginEvt.emit({ idx: idx, value: value });
        };
        AjfReportBuilderProperties.prototype.setWidgetPadding = function (idx, value) {
            this._updateWidgetPaddingEvt.emit({ idx: idx, value: value });
        };
        AjfReportBuilderProperties.prototype.setWidgetBorderWidth = function (idx, value) {
            this._updateWidgetBorderWidthEvt.emit({ idx: idx, value: value });
        };
        AjfReportBuilderProperties.prototype.setWidgetBorderRadius = function (idx, value) {
            this._updateWidgetBorderRadiusEvt.emit({ idx: idx, value: value });
        };
        /**
         * call to service to add new style to section
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.setSectionStyles = function (label, value) {
            this._service.setSectionStyles(this.origin, label, value);
            this.styleColor = value;
        };
        /**
         * call to service to add new style to report
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.setReportStyles = function (label, value) {
            this._service.setReportStyles(label, value);
            this.styleBackgroundColor = value;
        };
        /**
         * add custom color
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.addCustomColor = function () {
            this._service.addCustomColor(this.currentColor);
            this._service.updateCurrentWidget(this.currentWidget);
        };
        /**
         * get the module exploit to quill text editor
         *
         * @returns
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.getModule = function () {
            return this.quillModules;
        };
        /**
         * true is the input type value is equal to current widget type
         *
         * @param value
         * @returns
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.isChartTypeSelected = function (value) {
            if (this.initChartType == false) {
                return false;
            }
            var myObj = this.currentWidget;
            if (value === myObj.chartType) {
                return true;
            }
            else {
                return false;
            }
        };
        /* layout functions */
        /**
         * call to service to add a column to current layout widget
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.addColumn = function () {
            this._service.addColumn();
        };
        /**
         * call to service to add a obj to current layout widget
         *
         * @param idx
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.fixedColumn = function (idx) {
            this._service.fixedColumn(idx);
        };
        /**
         * call to service to remove obj of current layout widget
         *
         * @param idx
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.unfixedColumn = function (idx) {
            this._service.remove('unfixedColumn', idx);
        };
        /* image functions */
        /**
         * call to service to set image url
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.setImageUrl = function () {
            this._service.setImageUrl(this.imageUrl);
        };
        AjfReportBuilderProperties.prototype.setIcon = function (icon) {
            this._icon = icon;
            this._service.setIcon(icon);
        };
        /* chart functions */
        /**
         * call to service to set the type of chart
         *
         * @param type
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.setChartType = function (type) {
            this.initChartType = true;
            this._service.setChartType(type);
        };
        AjfReportBuilderProperties.prototype.setChartBorderColor = function (value) {
            if (value == null) {
                return;
            }
            this._service.setChartBorderWidth(value);
        };
        AjfReportBuilderProperties.prototype.setTab = function (event) {
            if (event.index === 0) {
                this.tabValue = 'backgroundColor';
            }
            else {
                this.tabValue = 'borderColor';
            }
        };
        /**
         * call to service to remove background color to current chart
         *
         * @param index
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.removeChartBackgroundColor = function (index) {
            this._service.removeChartBackgroundColor(index);
        };
        /**
         * call to service to remove border color to current chart
         *
         * @param index
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderProperties.prototype.removeChartBorderColor = function (index) {
            this._service.removeChartBorderColor(index);
        };
        AjfReportBuilderProperties.prototype.hideMenu = function () {
            this._service.updateCurrentWidget(null);
        };
        AjfReportBuilderProperties.prototype.openFormulaDialog = function (event) {
            this.dialogRef = this._dialog.open(AjfReportBuilderFormsAnalyzerDialog);
            this.dialogRef.componentInstance.aggregation = reports.AjfAggregationType.None;
            this.dialogRef.componentInstance.isFormula = true;
            if (event != null && event.reference != null) {
                this.dialogRef.componentInstance.formula = event.formula;
                this.dialogRef.componentInstance.reference = event.reference;
            }
        };
        AjfReportBuilderProperties.prototype.ngOnInit = function () {
            var _this = this;
            this._formsSub = this._service.reportForms.subscribe(function (x) {
                _this.forms = x || [];
            });
            this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
                if (x != null) {
                    if (_this.currentWidget !== x) {
                        _this.currentWidget = x;
                        _this.widgetName = reports.AjfWidgetType[x.widgetType];
                        _this.reportStyles = false;
                        _this.sectionStyles = false;
                        _this.widgetStyles = false;
                        _this.sectionColor = false;
                        _this.widgetColor = false;
                        _this.visibilitySection = false;
                    }
                }
                else {
                    _this.currentWidget = null;
                    _this.widgetName = '';
                }
            });
            this._colorSub = this._service.colors.subscribe(function (x) {
                if (x && x.length > 0) {
                    _this.colors = x;
                    _this.quillModules = {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            // ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                            // [{ 'direction': 'rtl' }],                         // text direction
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [
                                { 'color': _this.colors }, { 'background': _this.colors }
                            ],
                            [{ 'font': _this.fonts }], [{ 'align': _this.align }], ['formula'],
                            ['clean'],
                        ]
                    };
                }
            });
            this.getHTML = this._service.currentWidget.pipe(operators.map(function (widget) {
                if (widget != null) {
                    var myObj = _this.currentWidget;
                    return myObj.htmlText;
                }
                return '';
            }), operators.distinctUntilChanged(), operators.startWith('<p><br></p>'));
            this.getHeightWidget = this._service.currentWidget.pipe(operators.filter(function (x) { return x != null; }), operators.map(function (myObj) {
                if (myObj != null) {
                    var value = _this.toNumber(myObj.styles['height']);
                    if (value != null || value != null) {
                        return value;
                    }
                }
                return undefined;
            }), operators.distinctUntilChanged());
            this.getFontSizeWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null) {
                    return (_this.toNumber(myObj.styles['font-size']) || 12);
                }
                return undefined;
            }), operators.distinctUntilChanged());
            this.getFontAlignWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null) {
                    return ((myObj.styles['text-align']) || 'center');
                }
                return undefined;
            }), operators.distinctUntilChanged());
            this.getBorderWidthWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null) {
                    return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['border-width']));
                }
                return undefined;
            }), operators.distinctUntilChanged(), operators.startWith([0, 0, 0, 0]));
            this.getBorderWidthWidgetTop =
                this.getBorderWidthWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[0]; }));
            this.getBorderWidthWidgetRight =
                this.getBorderWidthWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[1]; }));
            this.getBorderWidthWidgetBottom =
                this.getBorderWidthWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[2]; }));
            this.getBorderWidthWidgetLeft =
                this.getBorderWidthWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[3]; }));
            this.getBorderRadiusWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null) {
                    return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['border-radius']));
                }
                return undefined;
            }), operators.distinctUntilChanged(), operators.startWith([0, 0, 0, 0]));
            this.getBorderRadiusWidgetTopLeft =
                this.getBorderRadiusWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[0]; }));
            this.getBorderRadiusWidgetTopRight =
                this.getBorderRadiusWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[1]; }));
            this.getBorderRadiusWidgetBottomRight =
                this.getBorderRadiusWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[2]; }));
            this.getBorderRadiusWidgetBottomLeft =
                this.getBorderRadiusWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[3]; }));
            this.getMarginWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null && myObj.styles != null && myObj.styles['margin'] != null) {
                    return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['margin']));
                }
                return undefined;
            }), operators.distinctUntilChanged(), operators.startWith([0, 0, 0, 0]));
            this.getMarginWidgetTop = this.getMarginWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[0]; }));
            this.getMarginWidgetRight = this.getMarginWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[1]; }));
            this.getMarginWidgetBottom = this.getMarginWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[2]; }));
            this.getMarginWidgetLeft = this.getMarginWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[3]; }));
            this.getPaddingWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null && myObj.styles != null && myObj.styles['padding'] != null) {
                    return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['padding']));
                }
                return undefined;
            }), operators.distinctUntilChanged());
            this.getPaddingWidgetTop = this.getPaddingWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[0]; }));
            this.getPaddingWidgetRight =
                this.getPaddingWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[1]; }));
            this.getPaddingWidgetBottom =
                this.getPaddingWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[2]; }));
            this.getPaddingWidgetLeft = this.getPaddingWidget.pipe(operators.filter(function (m) { return m != null; }), operators.map(function (m) { return m[3]; }));
            this.getBackgroundColorWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null && myObj.styles != null) {
                    return myObj.styles['backgroundColor'] || '';
                }
            }), operators.distinctUntilChanged());
            this.getColorWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null && myObj.styles != null) {
                    return myObj.styles['color'] || '';
                }
            }), operators.distinctUntilChanged());
            this._stylesUpdatesSubs =
                this._updateWidgetMarginEvt
                    .pipe(operators.withLatestFrom(this.getMarginWidget))
                    .subscribe(function (r) {
                    if (r == null) {
                        return;
                    }
                    var idx = r[0].idx;
                    var value = r[0].value;
                    var v = r[1] || [0, 0, 0, 0];
                    if (v == null || v.length < idx) {
                        return;
                    }
                    v[idx] = value;
                    _this.setWidgetStyles('margin', v);
                });
            this._stylesUpdatesSubs.add(this._updateWidgetPaddingEvt
                .pipe(operators.withLatestFrom(this.getPaddingWidget))
                .subscribe(function (r) {
                if (r == null) {
                    return;
                }
                var idx = r[0].idx;
                var value = r[0].value;
                var v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                _this.setWidgetStyles('padding', v);
            }));
            this._stylesUpdatesSubs.add(this._updateWidgetBorderWidthEvt
                .pipe(operators.withLatestFrom(this.getBorderWidthWidget))
                .subscribe(function (r) {
                if (r == null) {
                    return;
                }
                var idx = r[0].idx;
                var value = r[0].value;
                var v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                _this.setWidgetStyles('border-width', v);
            }));
            this._stylesUpdatesSubs.add(this._updateWidgetBorderRadiusEvt
                .pipe(operators.withLatestFrom(this.getBorderRadiusWidget))
                .subscribe(function (r) {
                if (r == null) {
                    return;
                }
                var idx = r[0].idx;
                var value = r[0].value;
                var v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                _this.setWidgetStyles('border-radius', v);
            }));
        };
        AjfReportBuilderProperties.prototype.ngOnChanges = function (changes) {
            this.currentWidget = changes.widget.currentValue;
            if (this.currentWidget == null) {
                return;
            }
            this.widgetName = reports.AjfWidgetType[this.currentWidget.widgetType];
        };
        AjfReportBuilderProperties.prototype.ngOnDestroy = function () {
            this._currentWidgetSub.unsubscribe();
            this._formsSub.unsubscribe();
            this._colorSub.unsubscribe();
            this._headerStyleSub.unsubscribe();
            this._contentStylesSub.unsubscribe();
            this._footerStylesSub.unsubscribe();
            this._originSub.unsubscribe();
            this._stylesUpdatesSubs.unsubscribe();
        };
        AjfReportBuilderProperties.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-properties',
                        template: "<ng-template [ngIf]=\"currentWidget != null\">\n  <div class=\"ajf-content\">\n    <button\n      mat-button\n      class=\"ajf-hide-menu\"\n      matTooltip=\"hide-menu\"\n      (click)=\"hideMenu()\"\n      [matTooltipPosition]=\"'above'\">\n      <mat-icon>remove_circle_outline</mat-icon>\n    </button>\n    <mat-button-toggle-group class=\"ajf-menu-css\">\n      <mat-button-toggle\n        (click)=\"reportStyles = !reportStyles; sectionStyles = false; widgetStyles = false\" value=\"left\"\n        [ngClass]=\"{'ajf-selected': reportStyles}\">\n        report\n        <ng-container translate>CSS style</ng-container>\n      </mat-button-toggle>\n      <mat-button-toggle\n        (click)=\"sectionStyles = !sectionStyles; reportStyles = false; widgetStyles = false\"\n        [ngClass]=\"{'ajf-selected': sectionStyles}\">\n        {{ origin }}\n        <ng-container translate>CSS style</ng-container>\n      </mat-button-toggle>\n      <mat-button-toggle\n        (click)=\"widgetStyles = !widgetStyles; sectionStyles = false; reportStyles = false\"\n        [ngClass]=\"{'ajf-selected': widgetStyles}\">\n        {{ widgetName }}\n        <ng-container translate>CSS style</ng-container>\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n    <div class=\"ajf-style-container\" *ngIf=\"(reportStyles) ? true : false \">\n      <mat-tab-group>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'report'\" [label]=\"'color'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n    <div class=\"ajf-style-container\" *ngIf=\"(sectionStyles) ? true : false \">\n      <mat-tab-group>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'section'\" [label]=\"'color'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n    <div class=\"ajf-style-container\" *ngIf=\"(widgetStyles) ? true : false \">\n      <mat-tab-group *ngIf=\"(currentWidget.widgetType != 4)\">\n        <mat-tab label=\"Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'widget'\" [label]=\"'color'\" [init]=\"'icon'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'widget'\" [label]=\"'background-color'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n      <div class=\"properties-container\" *ngIf=\"(currentWidget.widgetType !== 8)\">\n        <div class=\"ajf-layout-preview\">\n          <div class=\"ajf-vbottom\">\n            <div translate>height</div>\n            <div>{{ getHeightWidget|async }}</div>\n          </div>\n          <div class=\"ajf-margin-box\">\n            <div class=\"ajf-top-label\" translate>margin</div>\n            <div class=\"ajf-vtop\">{{ getMarginWidgetTop|async }}</div>\n            <div class=\"ajf-vright\">{{ getMarginWidgetRight|async }}</div>\n            <div class=\"ajf-vbottom\">{{ getMarginWidgetBottom|async }}</div>\n            <div class=\"ajf-vleft\">{{ getMarginWidgetLeft|async }}</div>\n            <div class=\"ajf-border-box\">\n              <div class=\"ajf-vtop\">{{ getBorderWidthWidgetTop|async }}</div>\n              <div class=\"ajf-vright\">{{ getBorderWidthWidgetRight|async }}</div>\n              <div class=\"ajf-vbottom\">{{ getBorderWidthWidgetBottom|async }}</div>\n              <div class=\"ajf-vleft\">{{ getBorderWidthWidgetLeft|async }}</div>\n              <div class=\"ajf-vtl\">{{ getBorderRadiusWidgetTopLeft|async }}</div>\n              <div class=\"ajf-vtr\">{{ getBorderRadiusWidgetTopRight|async }}</div>\n              <div class=\"ajf-vbr\">{{ getBorderRadiusWidgetBottomRight|async }}</div>\n              <div class=\"ajf-vbl\">{{ getBorderRadiusWidgetBottomLeft|async }}</div>\n              <div class=\"ajf-top-label\" translate>border</div>\n              <div class=\"ajf-padding-box\">\n                <div class=\"ajf-top-label\" translate>padding</div>\n                <div class=\"ajf-vtop\">{{ getPaddingWidgetTop|async }}</div>\n                <div class=\"ajf-vright\">{{ getPaddingWidgetRight|async }}</div>\n                <div class=\"ajf-vbottom\">{{ getPaddingWidgetBottom|async }}</div>\n                <div class=\"ajf-vleft\">{{ getPaddingWidgetLeft|async }}</div>\n                <div class=\"ajf-content-box\" translate>content</div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <mat-grid-list rowHeight=\"2em\" cols=\"12\">\n          <mat-grid-tile></mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>height</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('height', $event.value)\"\n              min=\"0\"\n              max=\"200\"\n              step=\"1\"\n              [value]=\"getHeightWidget|async\"\n              tickInterval=\"1\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!marginExpanded\"\n                (click)=\"marginExpanded = !marginExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"marginExpanded\"\n                (click)=\"marginExpanded = !marginExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>margin</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              [disabled]=\"marginExpanded\"\n              (change)=\"setWidgetStyles('margin', $event.value)\"\n              min=\"-50\"\n              max=\"50\"\n              step=\"1\"\n              [value]=\"getMarginWidgetTop|async\"\n              tickInterval=\"auto\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"marginExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin top</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(0, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(1, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin bottom</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(2, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(3, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!paddingExpanded\"\n                (click)=\"paddingExpanded = !paddingExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"paddingExpanded\"\n                (click)=\"paddingExpanded = !paddingExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>padding</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('padding', $event.value)\"\n              min=\"-50\"\n              max=\"50\"\n              step=\"1\"\n              [value]=\"getPaddingWidgetTop|async\"\n              tickInterval=\"auto\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"paddingExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding top</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(0, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(1, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding bottom</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(2, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(3, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!borderWidthExpanded\"\n                (click)=\"borderWidthExpanded = !borderWidthExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"borderWidthExpanded\"\n                (click)=\"borderWidthExpanded = !borderWidthExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>border width</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('border-width', $event.value)\"\n              min=\"0\"\n              max=\"10\"\n              step=\"1\"\n              [value]=\"getBorderWidthWidgetTop|async\"\n              tickInterval=\"1\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"borderWidthExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width top</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(0, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(1, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width bottom</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(2, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(3, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!borderRadiusExpanded\"\n                (click)=\"borderRadiusExpanded = !borderRadiusExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"borderRadiusExpanded\"\n                (click)=\"borderRadiusExpanded = !borderRadiusExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>border radius</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('border-radius', $event.value)\"\n              min=\"0\"\n              max=\"100\"\n              step=\"1\"\n              tickInterval=\"10\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"borderRadiusExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius top left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(0, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetTopLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius top right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(1, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetTopRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius bottom left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(2, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetBottomLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius bottom right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(3, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetBottomRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n      </div>\n      <div class=\"properties-container\" *ngIf=\"currentWidget.widgetType === 2\">\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile></mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"3\">\n            <span translate>font size</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('font-size', $event.value);\"\n              min=\"1\"\n              max=\"150\"\n              step=\"1\"\n              [value]=\"getFontSizeWidget|async\"\n              tickInterval=\"1\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n      </div>\n      <ng-template [ngIf]=\"currentWidget.widgetType === 5\">\n        <br>\n        <form>\n          <mat-form-field>\n            <input\n              matInput\n              [placeholder]=\"'Font size' | translate\"\n              [value]=\"getFontSizeWidget|async\"\n              [(ngModel)]=\"fontSize\"\n              [ngModelOptions]=\"{standalone: true}\"\n              (change)=\"setWidgetStyles('font-size', fontSize)\">\n          </mat-form-field>\n          <mat-select\n              (selectionChange)=\"setWidgetStyles('font-style', $event.value)\"\n              [placeholder]=\"'Font style' | translate\">\n            <mat-option translate value=\"normal\">Normal</mat-option>\n            <mat-option translate value=\"italic\">Italic</mat-option>\n            <mat-option translate value=\"oblique\">Oblique</mat-option>\n          </mat-select>\n          <mat-select\n              (selectionChange)=\"setWidgetStyles('text-align', $event.value)\"\n              [placeholder]=\"'Align' | translate\">\n            <mat-option translate value=\"center\">Center</mat-option>\n            <mat-option translate value=\"left\">Left</mat-option>\n            <mat-option translate value=\"right\">Right</mat-option>\n          </mat-select>\n        </form>\n      </ng-template>\n      <h1>\n        <ng-container translate>properties of</ng-container>\n        {{ widgetName }}\n      </h1>\n    </div>\n    <div [ngSwitch]=\"currentWidget.widgetType\">\n      <ng-template [ngSwitchCase]=\"0\">\n        <h1 translate>Column</h1>\n        <ng-template ngFor let-col [ngForOf]=\"currentLayoutWidget.columns\" let-idx=\"index\">\n          <mat-toolbar>\n              <mat-toolbar-row *ngIf=\"col !== -1\">\n                <mat-grid-list cols=\"12\">\n                  <mat-grid-tile colspan=\"1\">\n                    {{idx + 1}}\n                  </mat-grid-tile>\n                  <mat-grid-tile colspan=\"9\">\n                    <mat-slider\n                      style=\"width: 90%;\"\n                      min=\"0.1\"\n                      max=\"1\"\n                      step=\"0.01\"\n                      value=\"{{col}}\"\n                      thumb-label=\"true\"\n                      tick-interval=\"true\"\n                      (change)=\"instantColumnValue($event.value,idx)\">\n                    </mat-slider>\n                    {{percent(col)}}%\n                  </mat-grid-tile>\n                  <mat-grid-tile colspan=\"2\">\n                    <button style=\"width: 5%;\" mat-button (click)=\"fixedColumn(idx)\">fixed</button>\n                  </mat-grid-tile>\n                </mat-grid-list>\n              </mat-toolbar-row>\n              <mat-toolbar-row *ngIf=\"col == -1\">\n                <mat-grid-list cols=\"12\">\n                  <mat-grid-tile colspan=\"1\">\n                    {{idx + 1}}\n                  </mat-grid-tile>\n                  <mat-grid-tile colspan=\"11\">\n                    <button  style=\"width: 90%;\" mat-button (click)=\"unfixedColumn(idx)\">percent</button>\n                  </mat-grid-tile>\n                </mat-grid-list>\n              </mat-toolbar-row>\n          </mat-toolbar>\n        </ng-template>\n        <mat-toolbar>\n          <mat-toolbar-row>\n            <button mat-button\n                translate\n                (click)=\"addColumn()\"\n                *ngIf=\"currentLayoutWidget.columns.length < 10\">Add column</button>\n          </mat-toolbar-row>\n        </mat-toolbar>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"2\">\n        <ajf-image-group (formulaClick)=\"openFormulaDialog($event)\" [data]=\"iconSet\"></ajf-image-group>\n        <ajf-image-group (formulaClick)=\"openFormulaDialog($event)\" [data]=\"flagSet\"></ajf-image-group>\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n        <input\n            mat-input\n            [placeholder]=\"'paste a link' | translate\"\n            style=\"width: 100%;\"\n            [(ngModel)]=\"imageUrl\">\n        <button mat-button (click)=\"setImageUrl()\"\n            translate>Set image</button>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"3\">\n        <div style=\"width:500px;\">\n          <ajf-quill-editor\n            [(ngModel)]=\"currentTextWidget.htmlText\"\n            [modules]=\"getModule()\"\n            [maxLength]=\"200\"\n            [theme]=\"bubble\"\n            [initHTML]=\"(getHTML|async) || ''\"\n            (formulaClick)=\"openFormulaDialog($event)\">\n          </ajf-quill-editor>\n        </div>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"4\">\n        <h3 translate>Choose type of Chart</h3>\n        <mat-button-toggle-group class=\"ajf-chart-buttons\">\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-linechart\"\n              (click)=\"setChartType(0)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-linechart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-barchartvertical\"\n              (click)=\"setChartType(1)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barchartvertical\">\n              </mat-icon>\n              </mat-button-toggle>\n            <mat-button-toggle\n                value=\"reportbuilder-bubblechart\"\n                (click)=\"setChartType(8)\">\n                <mat-icon\n                  fontSet=\"ajf-icon\"\n                  fontIcon=\"reportbuilder-bubblechart\">\n                </mat-icon>\n              </mat-button-toggle>\n          </div>\n          <div class=row>\n            <mat-button-toggle\n              value=\"reportbuilder-barcharthorizontal\"\n              (click)=\"setChartType(2)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barcharthorizontal\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-radarchart\"\n              (click)=\"setChartType(3)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-radarchart\">\n              </mat-icon>\n            </mat-button-toggle>\n             <mat-button-toggle\n              value=\"reportbuilder-barchartvertical\"\n              (click)=\"setChartType(1)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barchartvertical\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-scatterchart\"\n              (click)=\"setChartType(4)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-scatterchart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-polarareachart\"\n              (click)=\"setChartType(5)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-polarareachart\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-piechart\"\n              (click)=\"setChartType(6)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-piechart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-donoughtchart\"\n              (click)=\"setChartType(7)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-donoughtchart\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n        </mat-button-toggle-group>\n        <h3 translate>Labels</h3>\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n        <ajf-theme-color [section]=\"'chart'\" [label]=\"tabValue\"></ajf-theme-color>\n          <mat-card>\n            <mat-card-header>\n              <mat-card-title>Border width</mat-card-title>\n            </mat-card-header>\n            <mat-card-content>\n              <mat-slider\n                min=\"1\"\n                max=\"100\"\n                style=\"width:99%;\"\n                step=\"1\"\n                (change)=\"setChartBorderColor($event.value)\"\n                [value]=\"chartBorderWidth\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-card-content>\n          </mat-card>\n          <mat-tab-group (selectChange)=\"setTab($event)\">\n            <mat-tab label=\"Background\">\n              <mat-list>\n                <ng-template ngFor let-color [ngForOf]=\"(getChartBackgroundColor|async)\" let-idx=\"index\">\n                  <mat-list-item>\n                    <span [style.background]=\"color\">\n                      {{ color }}\n                    </span>\n                    <button mat-button translate\n                        (click)=\"removeChartBackgroundColor(idx)\">Remove</button>\n                  </mat-list-item>\n                </ng-template>\n              </mat-list>\n            </mat-tab>\n            <mat-tab label=\"Border\">\n              <mat-list>\n                <ng-template ngFor let-color [ngForOf]=\"(getChartBorderColor|async)\" let-idx=\"index\">\n                  <mat-list-item>\n                    <span [style.background]=\"color\">\n                      {{ color }}\n                    </span>\n                    <button mat-button (click)=\"removeChartBorderColor(idx)\">remove</button>\n                  </mat-list-item>\n                </ng-template>\n              </mat-list>\n            </mat-tab>\n          </mat-tab-group>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"5\">\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n      </ng-template>\n    </div>\n    <button mat-button\n        (click)=\"visibilitySection = !visibilitySection\"\n        [ngClass]=\"{'ajf-selected': visibilitySection}\">\n      {{ widgetName }}\n      <ng-container translate>Visibility</ng-container>\n    </button>\n    <div [style.display]=\"visibilitySection ? 'block' : 'none'\">\n      <ajf-report-builder-condition-editor [visibility]=\"currentWidget.visibility\"></ajf-report-builder-condition-editor>\n    </div>\n  </div>\n</ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-properties .ajf-selected{background-color:darkred;color:#fff}ajf-report-builder-properties .ajf-style-container{height:auto;width:100%;position:relative;margin-bottom:60px;text-align:center}ajf-report-builder-properties .ajf-style-container mat-tab-group .ajf-style-panel{min-height:350px}ajf-report-builder-properties .ajf-style-container .ajf-style-background,ajf-report-builder-properties .ajf-style-container .ajf-style-color{width:100%;height:350px;position:relative;margin:30px}ajf-report-builder-properties .ajf-style-container .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-tab-body-wrapper,ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-properties .ajf-content{margin-top:10px;margin-right:15px;margin-bottom:290px;margin-left:15px}ajf-report-builder-properties .ajf-content .ajf-menu-css{width:100% !important;font-size:10px !important}ajf-report-builder-properties .ajf-content .ajf-menu-css mat-button-toggle{width:33% !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group{width:100% !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle{width:auto !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle mat-icon{margin:15px}ajf-report-builder-properties button{width:100%;margin-bottom:30px}ajf-report-builder-properties .ajf-hide-menu{width:auto !important}ajf-report-builder-properties h1,ajf-report-builder-properties h3,ajf-report-builder-properties h5{text-align:center}ajf-report-builder-properties .ajf-row{display:flex;flex-direction:column;width:100%}ajf-report-builder-properties .mat-tab-body.mat-tab-active{min-height:600px}ajf-report-builder-properties mat-grid-list{width:100%}ajf-report-builder-properties mat-grid-tile{overflow:visible !important}ajf-report-builder-properties mat-grid-tile.ajf-lal{text-align:left}ajf-report-builder-properties .ajf-chart-buttons mat-icon{font-size:15px}ajf-report-builder-properties .ajf-layout-preview{background-color:#fff;width:100%;font-size:.9em;box-sizing:border-box;position:relative}ajf-report-builder-properties .ajf-layout-preview .ajf-top-label{position:absolute;top:1em;left:1em;text-align:left}ajf-report-builder-properties .ajf-layout-preview .ajf-vtop{position:absolute;top:1em;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vbottom{position:absolute;bottom:0;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vright{position:absolute;top:50%;right:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vleft{position:absolute;top:50%;left:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtl{position:absolute;top:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtr{position:absolute;top:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbl{position:absolute;bottom:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbr{position:absolute;bottom:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box{background-color:#fff;padding:3em;position:relative;border:solid 1px #ccc}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box{background-color:#ddd;padding:3em;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box>.ajf-top-label{left:4em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box{padding:3em;background-color:#aaa;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box .ajf-content-box{background-color:#888;padding:2em;text-align:center;box-sizing:border-box}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderProperties.ctorParameters = function () { return [
            { type: dialog.MatDialog },
            { type: AjfReportBuilderService }
        ]; };
        return AjfReportBuilderProperties;
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
    var AjfQuillEditor = /** @class */ (function () {
        function AjfQuillEditor(_elementRef, _renderer, _service) {
            var _this = this;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._service = _service;
            this.emptyArray = [];
            this._init = false;
            this.dateFormats = [
                {
                    'label': 'June 23rd 2017, 12:39:12 pm',
                    'value': 'MMMM Do YYYY, h:mm:ss a',
                    'validator': 'MMMMDoYYYYhmmssa'
                },
                { 'label': 'Friday', 'value': 'dddd', 'validator': 'dddd' },
                { 'label': 'Jun 23rd 17', 'value': 'MMM Do YY', 'validator': 'MMMDoYY' }
            ];
            this.fonts = [
                false, 'blackr', 'black-italic', 'bold', 'bold-condensed', 'bold-condensed-italic',
                'bold-italic', 'condensed', 'condensed-italic', 'italic', 'light', 'light-italic', 'medium',
                'medium-italic', 'thinr', 'thin-italic'
            ];
            this.defaultModules = {
                formula: true,
                toolbar: [
                    ['formula'], ['bold', 'italic', 'underline', 'strike'],
                    // ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    // [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [
                        { 'color': this.emptyArray.slice() }, { 'background': this.emptyArray.slice() }
                    ],
                    [{ 'font': this.fonts }], [{ 'align': this.emptyArray.slice() }],
                    ['clean'],
                ]
            };
            this.font = Quill.import('formats/font');
            this.editorCreated = new core.EventEmitter();
            this.contentChanged = new core.EventEmitter();
            this.selectionChanged = new core.EventEmitter();
            /**
             * this event is fired when the user click on formula button on quill editor rool barƒ
             *
             * @memberof QuillEditorComponent
             */
            this.formulaClick = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this._formulas = [];
            this._formulaTextSub = rxjs.Subscription.EMPTY;
            this.font.whitelist = this.fonts;
            this.font.whitelist.push('regular');
            this._formulaTextSub = this._service.getFormulaToHtmlEvent().subscribe(function (event) {
                // reference is defined only when the user want to edit the formula
                if (event.reference !== undefined) {
                    event.reference.innerHTML = event.formula;
                    _this._renderer.setAttribute(event.reference, 'formula', event.formula);
                    var efs = _this._formulas.filter(function (f) { return f.formula === event.reference; });
                    var formulaEntry = void 0;
                    var unlisten = void 0;
                    if (efs.length > 0) {
                        formulaEntry = efs[0];
                        unlisten = formulaEntry.unlisten;
                        if (unlisten != null) {
                            unlisten();
                        }
                    }
                    else {
                        formulaEntry = { formula: event.reference, unlisten: null };
                        _this._formulas.push(formulaEntry);
                    }
                    formulaEntry.unlisten = _this._renderer.listen(event.reference, 'click', function () {
                        var obj = { 'formula': event.formula, 'reference': event.reference };
                        _this.formulaClick.emit(obj);
                    });
                }
                else {
                    var quillEditor = _this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    var link_1 = _this._renderer.createElement('a');
                    _this._renderer.setAttribute(link_1, 'href', 'javascript:void(0)');
                    _this._renderer.setStyle(link_1, 'cursor', 'pointer');
                    _this._renderer.setAttribute(link_1, 'formula', _this.check(event.formula));
                    var linkLabel = _this._renderer.createText(event.formula);
                    _this._renderer.appendChild(link_1, linkLabel);
                    // add listener related on the click event of the new formula
                    var unlisten = _this._renderer.listen(link_1, 'click', function (_) {
                        var obj = { 'formula': _this.check(event.formula), 'reference': link_1 };
                        _this.formulaClick.emit(obj);
                    });
                    _this._renderer.appendChild(quillEditor, link_1);
                    _this._formulas.push({ unlisten: unlisten, formula: link_1 });
                }
            });
        }
        AjfQuillEditor.prototype.check = function (value) {
            for (var i = 0; i < this.dateFormats.length; i++) {
                if (this.dateFormats[i].value == value) {
                    return this.dateFormats[i].validator;
                }
            }
            return value;
        };
        /**
         * this function search fomulas inside the init text
         * and allocate the related listener on click event
         *
         * @memberof QuillEditorComponent
         */
        AjfQuillEditor.prototype.setHTML = function () {
            this.writeValue(this.initHTML);
        };
        AjfQuillEditor.prototype.ngAfterViewInit = function () {
            var _this = this;
            var toolbarElem = this._elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
            var modules = this.modules || this.defaultModules;
            Quill.register(this.font, true);
            if (toolbarElem) {
                modules['toolbar'] = toolbarElem;
                modules['formula'] = true;
            }
            this._elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
            this.editorElem = this._elementRef.nativeElement.querySelector('[quill-editor-element]');
            this.quillEditor = new Quill(this.editorElem, {
                modules: modules,
                placeholder: this.placeholder || 'Insert text here ...',
                readOnly: this.readOnly || false,
                theme: this.theme || 'snow',
                formats: this.formats
            });
            this.editorCreated.emit(this.quillEditor);
            this.setHTML();
            // mark model as touched if editor lost focus
            this.quillEditor.on('selection-change', function (range, oldRange, source) {
                _this.selectionChanged.emit({ editor: _this.quillEditor, range: range, oldRange: oldRange, source: source });
                if (!range) {
                    _this.onModelTouched();
                }
            });
            // update model if text changes
            this.quillEditor.on('text-change', function (delta, oldDelta, source) {
                var html = _this.editorElem.children[0].innerHTML;
                var text = _this.quillEditor.getText();
                if (html === '<p><br></p>') {
                    html = null;
                }
                _this.onModelChange(html);
                _this.contentChanged.emit({
                    editor: _this.quillEditor,
                    html: html,
                    text: text,
                    delta: delta,
                    oldDelta: oldDelta,
                    source: source
                });
            });
            var elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
            this.listenFunc = this._renderer.listen(elem, 'click', function (_) {
                _this.formulaClick.emit();
            });
        };
        AjfQuillEditor.prototype.writeValue = function (currentValue) {
            var _this = this;
            this.content = currentValue;
            if (this.quillEditor) {
                if (currentValue) {
                    if (currentValue == this.initHTML && !this._init) {
                        var editor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                        editor.innerHTML = this.initHTML;
                        var allFormulas = this._elementRef.nativeElement.querySelectorAll('[formula]');
                        allFormulas.forEach(function (elem) {
                            var unlisten = _this._renderer.listen(elem, 'click', function (_) {
                                var obj = { 'formula': _this.check(elem.innerText), 'reference': elem };
                                _this.formulaClick.emit(obj);
                            });
                            _this._renderer.setStyle(elem, 'cursor', 'pointer');
                            _this._formulas.push({ unlisten: unlisten, formula: elem });
                            _this._init = true;
                        });
                    }
                    else if (currentValue != this.initHTML) {
                        this.quillEditor.pasteHTML(currentValue);
                    }
                    return;
                }
                this.quillEditor.setText('');
            }
        };
        AjfQuillEditor.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        AjfQuillEditor.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        AjfQuillEditor.prototype.validate = function (_c) {
            if (!this.quillEditor) {
                return null;
            }
            var err = {}, valid = true;
            var textLength = this.quillEditor.getText().trim().length;
            if (this.minLength) {
                err.minLengthError = { given: textLength, minLength: this.minLength };
                valid = textLength >= this.minLength || !textLength;
            }
            if (this.maxLength) {
                err.maxLengthError = { given: textLength, maxLength: this.maxLength };
                valid = textLength <= this.maxLength && valid;
            }
            return valid ? null : err;
        };
        AjfQuillEditor.prototype.ngOnChanges = function (changes) {
            if (changes['readOnly'] && this.quillEditor) {
                this.quillEditor.enable(!changes['readOnly'].currentValue);
            }
            if (changes['modules'] && this.quillEditor) {
                Quill.register(this.font, true);
                this.quillEditor = new Quill(this.editorElem, {
                    modules: changes['modules']['currentValue'],
                    placeholder: this.placeholder || 'Insert text here ...',
                    readOnly: this.readOnly || false,
                    theme: this.theme || 'snow',
                    formats: this.formats
                });
                this._elementRef.nativeElement.children[0].remove();
            }
        };
        AjfQuillEditor.prototype.ngOnDestroy = function () {
            for (var i = 0; i < this._formulas.length; i++) {
                var unlisten = this._formulas[i].unlisten;
                if (unlisten != null) {
                    unlisten();
                }
            }
            this._formulaTextSub.unsubscribe();
        };
        AjfQuillEditor.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-quill-editor',
                        template: "\n    <ng-content select=\"[ajf-quill-editor-toolbar]\"></ng-content>\n  ",
                        providers: [
                            { provide: forms.NG_VALUE_ACCESSOR, useExisting: core.forwardRef(function () { return AjfQuillEditor; }), multi: true },
                            { provide: forms.NG_VALIDATORS, useExisting: core.forwardRef(function () { return AjfQuillEditor; }), multi: true }
                        ],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfQuillEditor.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: AjfReportBuilderService }
        ]; };
        AjfQuillEditor.propDecorators = {
            theme: [{ type: core.Input }],
            modules: [{ type: core.Input }],
            readOnly: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            maxLength: [{ type: core.Input }],
            minLength: [{ type: core.Input }],
            formats: [{ type: core.Input }],
            initHTML: [{ type: core.Input }],
            editorCreated: [{ type: core.Output }],
            contentChanged: [{ type: core.Output }],
            selectionChanged: [{ type: core.Output }],
            formulaClick: [{ type: core.Output }]
        };
        return AjfQuillEditor;
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
    var AjfReportBuilderRendererWidget = /** @class */ (function () {
        function AjfReportBuilderRendererWidget(_service) {
            this._service = _service;
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            this.currentContentWidget = null;
            this._onDraggedSub = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(AjfReportBuilderRendererWidget.prototype, "widgetTypes", {
            get: function () {
                return reports.AjfWidgetType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfReportBuilderRendererWidget.prototype, "layoutWidget", {
            get: function () {
                return this.widget;
            },
            enumerable: false,
            configurable: true
        });
        AjfReportBuilderRendererWidget.prototype.canDropPredicate = function (item) {
            for (var i = 0; i < item.data.dropZones.length; i++) {
                if (['header', 'widget'].indexOf(item.data.dropZones[i]) > -1) {
                    return true;
                }
            }
            return false;
        };
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderRendererWidget.prototype.onDragStartHandler = function () {
            var _this = this;
            var s = rxjs.timer(200).subscribe(function () {
                s.unsubscribe();
                _this._service.dragStarted();
            });
        };
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderRendererWidget.prototype.onDragEndHandler = function () {
            this._service.dragEnded();
        };
        AjfReportBuilderRendererWidget.prototype.getColumnContent = function () {
            var myObj = this.widget;
            return myObj.content;
        };
        AjfReportBuilderRendererWidget.prototype.getIcon = function () {
            var defVal = { fontSet: '', fontIcon: '' };
            var myObj = this.widget;
            if (myObj.icon == null) {
                return null;
            }
            return models.evaluateExpression(myObj.icon.formula) || defVal;
        };
        AjfReportBuilderRendererWidget.prototype.getFlag = function () {
            var defVal = 'ch';
            var myObj = this.widget;
            if (myObj.flag == null) {
                return null;
            }
            return models.evaluateExpression(myObj.flag.formula) || defVal;
        };
        AjfReportBuilderRendererWidget.prototype.getPercent = function (index) {
            var myObj = this.widget;
            var percent = myObj.columns[index] * 100;
            return percent.toString() + "%";
        };
        AjfReportBuilderRendererWidget.prototype.getImageUrl = function () {
            var defVal = '';
            var myObj = this.widget;
            if (myObj.url == null) {
                return null;
            }
            return models.evaluateExpression(myObj.url.formula) || defVal;
        };
        AjfReportBuilderRendererWidget.prototype.getImageType = function () {
            return this.widget != null ? this.widget.imageType : image$1.AjfImageType.Image;
        };
        AjfReportBuilderRendererWidget.prototype.getHtmlText = function () {
            var myObj = this.widget;
            if (myObj.htmlText === '') {
                return '...';
            }
            else {
                return myObj.htmlText;
            }
        };
        AjfReportBuilderRendererWidget.prototype.getCoordinate = function () {
            var myObj = this.widget;
            if (myObj.coordinate == null) {
                return [51.505, -0.09, 13];
            }
            else {
                return myObj.coordinate;
            }
        };
        AjfReportBuilderRendererWidget.prototype.getTileLayer = function () {
            var myObj = this.widget;
            if (myObj.tileLayer === '') {
                return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
            }
            else {
                return myObj.tileLayer;
            }
        };
        AjfReportBuilderRendererWidget.prototype.getAttribution = function () {
            var myObj;
            myObj = this.widget;
            if (myObj.attribution === '') {
                return '&copy; <a href=\'http://osm.org/copyright\'>O</a> contributors';
            }
            else {
                return myObj.attribution;
            }
        };
        AjfReportBuilderRendererWidget.prototype.addToList = function (event, toColumn) {
            this.onDragEndHandler();
            this._service.addToColumn(event, toColumn);
        };
        AjfReportBuilderRendererWidget.prototype.ngOnInit = function () {
            var _this = this;
            this._onDraggedSub = this._service.onDragged.subscribe(function (x) {
                _this.onDragged = x;
            });
            this.getChartType = this._service.currentWidget.pipe(operators.map(function (widget) {
                if (widget == null) {
                    return 0;
                }
                var myObj = _this.widget;
                return (myObj.chartType);
            }), operators.distinctUntilChanged(), operators.startWith(0));
            this.getDataset = this._service.currentWidget.pipe(operators.map(function (widget) {
                if (widget != null && widget.dataset != null) {
                    var myObj = _this.widget;
                    return myObj.dataset;
                }
                else {
                    return [];
                }
            }), operators.distinctUntilChanged());
            this.getTableTitles = this._service.currentWidget.pipe(operators.map(function (widget) {
                if (widget == null) {
                    return [];
                }
                var myObj = _this.widget;
                if (myObj.dataset != null) {
                    var tableTitle = [];
                    for (var i = 0; i < myObj.dataset.length; i++) {
                        if (myObj.dataset[i][0] != null) {
                            tableTitle.push(myObj.dataset[i][0].label || '');
                        }
                    }
                    return tableTitle;
                }
                else {
                    return [];
                }
            }));
            this.getTableContent = this._service.currentWidget.pipe(operators.map(function (widget) {
                if (widget == null) {
                    return [];
                }
                var myObj = _this.widget;
                if (myObj.dataset != null) {
                    var tableContent = [];
                    for (var i = 0; i < myObj.dataset.length; i++) {
                        for (var j = 0; j < myObj.dataset[i].length; j++) {
                            if ((myObj.dataset[i] != null) && (myObj.dataset[i][j + 1] != null)) {
                                if (tableContent[j] == null) {
                                    tableContent[j] = [];
                                }
                                if (tableContent[j][i] == null) {
                                    tableContent[j][i] = ' ';
                                }
                                tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label || '');
                            }
                        }
                    }
                    return tableContent;
                }
                return [];
            }));
            this._service.updateCurrentWidget(this.widget);
        };
        AjfReportBuilderRendererWidget.prototype.ngOnChanges = function (changes) {
            if (changes.widget && changes.widget.currentValue != null) {
                this.widget = changes.widget.currentValue;
            }
        };
        AjfReportBuilderRendererWidget.prototype.ngOnDestroy = function () {
            this._onDraggedSub.unsubscribe();
        };
        AjfReportBuilderRendererWidget.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-renderer-widget',
                        template: "<div class=\"ajf-container\"\n    [ngSwitch]=\"widget?.widgetType\"\n    [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\">\n  <div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\"\n    [applyStyles]=\"widget.styles\">\n      <div class=\"ajf-columns\">\n        <ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\">\n          <div class=\"ajf-column\"\n            [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\"\n            [style.width]=getPercent(idx)\n            [applyStyles]=\"layoutWidget.content[idx].styles\">\n            <ajf-report-builder-widgets-row-buttons\n              [from]=\"'layout'\"\n              [fromWidget]=\"widget\"\n              [widget]=\"clm\"\n              [position]=\"idx\"\n              (onDragStart)=\"onDragStartHandler();\"\n              (onDragEnd)=\"onDragEndHandler();\"\n              [child]=\"true\">\n            </ajf-report-builder-widgets-row-buttons>\n            <ajf-column\n              [column]=\"clm\"\n              [applyStyles]=\"widget.styles\">\n            </ajf-column>\n            <ng-template [ngIf]=\"onDragged === true\">\n              <div cdkDropList\n                [cdkDropListEnterPredicate]=\"canDropPredicate\"\n                [style.display]=\"onDragged ? 'block' : 'none'\"\n                (cdkDropListDropped)=\"addToList($event, clm)\"\n                class=\"ajf-column-drop-zone\"\n                (dragover)=\"layoutShow = true;\"\n                (dragleave)=\"layoutShow = false;\">\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n      </div>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\">\n    <ajf-image\n      [applyStyles]=\"widget.styles\"\n      [type]=\"getImageType()\"\n      [imageUrl]=\"getImageUrl()\"\n      [icon]=\"getIcon()\"\n      [flag]=\"getFlag()\">\n    </ajf-image>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\">\n    <ajf-text [htmlText]=\"getHtmlText() | translate\"  [applyStyles]=\"widget.styles\"></ajf-text>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n  </div>\n  <!-- <div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-table *ngIf=\"getTableContent|async as tc\" [data]=\"tc!\" ></ajf-table>\n  </div> -->\n  <div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\">\n    </ajf-map>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid blue;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red !important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0 !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted blue;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted blue}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-show,ajf-report-builder-renderer-widget .ajf-on-drag-over{border:33px dotted blue;opacity:1 !important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden !important;display:none !important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red !important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderRendererWidget.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilderRendererWidget.propDecorators = {
            widget: [{ type: core.Input }],
            position: [{ type: core.Input }],
            section: [{ type: core.Input }]
        };
        return AjfReportBuilderRendererWidget;
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
    var AjfReportBuilder = /** @class */ (function () {
        function AjfReportBuilder(_service) {
            this._service = _service;
            this._init = false;
        }
        Object.defineProperty(AjfReportBuilder.prototype, "report", {
            get: function () {
                return this._report;
            },
            set: function (report) {
                if (report != null) {
                    this._report = report;
                    if (this._init) {
                        this._setCurrentReport();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        AjfReportBuilder.prototype.ngAfterContentInit = function () {
            this._setCurrentReport();
            this._init = true;
        };
        AjfReportBuilder.prototype._setCurrentReport = function () {
            this._service.setReportForms(this.report != null ? this.report.forms || [] : []);
            this._service.setReport(this.report);
        };
        AjfReportBuilder.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder',
                        template: "<ajf-report-builder-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-toolbar>\n<ajf-report-builder-custom-widgets-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-custom-widgets-toolbar>\n<mat-drawer-container>\n    <mat-drawer #start position=\"start\" mode=\"side\" class=\"ajf-builder-sidebar\">\n        <ajf-report-builder-widgets-toolbar></ajf-report-builder-widgets-toolbar>\n    </mat-drawer>\n    <ajf-report-builder-content></ajf-report-builder-content>\n    <mat-drawer #end position=\"end\" mode=\"side\" class=\"ajf-builder-prop\" [opened]=\"true\">\n      <ajf-report-builder-properties></ajf-report-builder-properties>\n    </mat-drawer>\n</mat-drawer-container>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder{display:block;position:relative;width:100%;height:100%;overflow:hidden}ajf-report-builder mat-sidenav-container{height:100%}ajf-report-builder mat-sidenav-container .ajf-builder-sidebar{max-width:7%}ajf-report-builder mat-sidenav-container .ajf-builder-prop{max-width:30%}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilder.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilder.propDecorators = {
            startSidenav: [{ type: core.ViewChild, args: [sidenav.MatSidenav, { static: true },] }],
            report: [{ type: core.Input }]
        };
        return AjfReportBuilder;
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
    var AjfReportBuilderThemeColorDialog = /** @class */ (function () {
        function AjfReportBuilderThemeColorDialog(_service, _dialogRef) {
            this._service = _service;
            this._dialogRef = _dialogRef;
            this.currentWidget = null;
            this.currentColor = 'rgb(255,255,255,0)';
            this.section = 'color';
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
        }
        AjfReportBuilderThemeColorDialog.prototype.setWidgetStyles = function (value) {
            this._service.setWidgetStyles(this.section, value);
            this.currentColor = value;
            this.setStyle();
        };
        AjfReportBuilderThemeColorDialog.prototype.setStyle = function () {
            if (this.currentWidget == null) {
                return;
            }
            this.currentWidget.styles = utils.deepCopy(this.currentWidget.styles);
            this._service.updateCurrentWidget(this.currentWidget);
        };
        AjfReportBuilderThemeColorDialog.prototype.addCustomColor = function () {
            this._service.addCustomColor(this.currentColor);
            this._service.updateCurrentWidget(this.currentWidget);
            this._dialogRef.close();
        };
        AjfReportBuilderThemeColorDialog.prototype.close = function () {
            this._dialogRef.close();
        };
        AjfReportBuilderThemeColorDialog.prototype.ngOnInit = function () {
            var _this = this;
            this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
                if (x !== null) {
                    if (_this.currentWidget !== x) {
                        _this.currentWidget = x;
                    }
                }
                else {
                    _this.currentWidget = null;
                }
            });
        };
        AjfReportBuilderThemeColorDialog.prototype.ngAfterViewInit = function () {
            this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
        };
        AjfReportBuilderThemeColorDialog.prototype.ngOnDestroy = function () {
            this._currentWidgetSub.unsubscribe();
        };
        AjfReportBuilderThemeColorDialog.decorators = [
            { type: core.Component, args: [{
                        selector: 'theme-color-dialog',
                        template: "<div mat-dialog-content #colorpic>\n   <input\n          [hidden]=false\n          [colorPicker]=\"currentColor\"\n          [style.background]=\"currentColor\"\n          [value]=\"currentColor\"\n          [cpDialogDisplay]=\"'inline'\"\n          [cpPosition]=\"'top'\"\n          [cpToggle]=\"true\"\n          [cpWidth]=\"'400px'\"\n          [cpOutputFormat]=\"'rgba'\"\n          (colorPickerChange)=\"setWidgetStyles($event)\"/>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"addCustomColor()\">Save color</button>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderThemeColorDialog.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialogRef }
        ]; };
        AjfReportBuilderThemeColorDialog.propDecorators = {
            elem: [{ type: core.ViewChild, args: ['colorpic', { static: true },] }]
        };
        return AjfReportBuilderThemeColorDialog;
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
     * this component manages the report text
     *
     * @export
     */
    var AjfReportBuilderThemeColor = /** @class */ (function () {
        function AjfReportBuilderThemeColor(_service, dialog) {
            this._service = _service;
            this.dialog = dialog;
            this.currentWidget = null;
            this.alphaColor = 1;
            this.styleBackgroundColor = 'rgb(255,255,255,0)';
            this.styleColor = 'rgb(0,0,0,0)';
            this._colorsSub = rxjs.Subscription.EMPTY;
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
            this._originSub = rxjs.Subscription.EMPTY;
            this._headerStyleSub = rxjs.Subscription.EMPTY;
            this._contentStylesSub = rxjs.Subscription.EMPTY;
            this._footerStylesSub = rxjs.Subscription.EMPTY;
        }
        AjfReportBuilderThemeColor.prototype.setStyles = function (value) {
            switch (this.section) {
                case 'widget':
                    this.setWidgetStyles(value);
                    break;
                case 'report':
                    this.setReportStyles(value);
                    break;
                case 'section':
                    this.setSectionStyles(value);
                    break;
                case 'chart':
                    this.setChartStyle(value);
                    break;
            }
        };
        AjfReportBuilderThemeColor.prototype.setChartStyle = function (value) {
            if (this.label === 'backgroundColor') {
                this.addChartBackgroundColor(value);
            }
            else {
                this.addChartBorderColor(value);
            }
        };
        AjfReportBuilderThemeColor.prototype.setAlphaColor = function (value) {
            value = value.toFixed(2);
            for (var i = 0; i < this.colors.length; i++) {
                var lastComma = this.colors[i].lastIndexOf(',');
                this.colors[i] = this.colors[i].substring(0, lastComma) + ',' + value + ')';
            }
        };
        /**
         * call to service to add new style to widget
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderThemeColor.prototype.setWidgetStyles = function (value) {
            if (this.section === 'chart') {
                this.setChartStyle(value);
            }
            else {
                this._service.setWidgetStyles(this.label, value);
                this.currentColor = value;
                this.setStyle();
            }
        };
        /**
         * call to service to add new style to section
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderThemeColor.prototype.setSectionStyles = function (value) {
            this._service.setSectionStyles(this.origin, this.label, value);
            this.styleColor = value;
        };
        /**
         * call to service to add new style to report
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderThemeColor.prototype.setReportStyles = function (value) {
            this._service.setReportStyles(this.label, value);
            this.styleBackgroundColor = value;
        };
        /**
         * call to service to add background color to current chart
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderThemeColor.prototype.addChartBackgroundColor = function (value) {
            this._service.addChartBackgroundColor(value);
        };
        /**
         * call to service to add border color to current chart
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        AjfReportBuilderThemeColor.prototype.addChartBorderColor = function (value) {
            this._service.addChartBorderColor(value);
        };
        AjfReportBuilderThemeColor.prototype.setStyle = function () {
            if (this.currentWidget == null) {
                return;
            }
            this.currentWidget.styles = utils.deepCopy(this.currentWidget.styles);
            this._service.updateCurrentWidget(this.currentWidget);
        };
        AjfReportBuilderThemeColor.prototype.openDialog = function () {
            this.dialogRef = this.dialog.open(AjfReportBuilderThemeColorDialog);
        };
        AjfReportBuilderThemeColor.prototype.ngOnInit = function () {
            var _this = this;
            this._colorsSub = this._service.colors.subscribe(function (x) {
                _this.colors = x;
            });
            this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
                if (x != null) {
                    if (_this.currentWidget !== x) {
                        _this.currentWidget = x;
                    }
                }
                else {
                    _this.currentWidget = null;
                }
            });
            this.getColorWidget = this._service.currentWidget.pipe(operators.map(function (myObj) {
                if (myObj != null) {
                    return myObj.styles['color'] || '';
                }
            }), operators.distinctUntilChanged());
            this._originSub = this._service.origin.subscribe(function (s) {
                _this.origin = s;
            });
            this._headerStyleSub = this._service.headerStyles.subscribe(function (s) {
                if (s['background-color'] != null) {
                    _this.styleBackgroundColor = s['background-color'];
                }
            });
            this._contentStylesSub = this._service.contentStyles.subscribe(function (s) {
                if (s['background-color'] != null) {
                    _this.styleBackgroundColor = s['background-color'];
                }
            });
            this._footerStylesSub = this._service.footerStyles.subscribe(function (s) {
                if (s['background-color'] != null) {
                    _this.styleBackgroundColor = s['background-color'];
                }
            });
        };
        AjfReportBuilderThemeColor.prototype.ngOnDestroy = function () {
            this._colorsSub.unsubscribe();
            this._currentWidgetSub.unsubscribe();
            this._originSub.unsubscribe();
            this._headerStyleSub.unsubscribe();
            this._contentStylesSub.unsubscribe();
            this._footerStylesSub.unsubscribe();
        };
        AjfReportBuilderThemeColor.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-theme-color',
                        template: "<mat-card style=\"width:90%\">\n  <mat-card-header>\n    <mat-card-title> {{ label }} Trasparency</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n       <mat-slider\n      style=\"width:90%\"\n      (change)=\"setAlphaColor($event.value)\"\n      min=\"0\"\n      max=\"1\"\n      step=\"0.1\"\n      [value]=\"alphaColor\"\n      thumbLabel>\n    </mat-slider>\n  </mat-card-content>\n</mat-card>\n<mat-card style=\"width:90%\">\n  <mat-card-header>\n    <mat-card-title> {{ label }} </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n    <mat-grid-list\n      cols=\"8\"\n      rowHeight=\"25px\">\n      <mat-grid-tile\n        *ngFor=\"let color of colors\"\n        [colspan]=\"1\"\n        [rowspan]=\"1\"\n        [style.background]=\"color\">\n        <button\n          style=\"height:100%\"\n          (click)=\"setStyles(color)\"\n          mat-button>\n        </button>\n      </mat-grid-tile>\n    </mat-grid-list>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-button (click)=\"openDialog()\" style=\"width:90%;\">Add color</button>\n    <button mat-button (click)=\"setStyles('')\" style=\"width:90%\"> Reset </button>\n  </mat-card-actions>\n</mat-card>\n\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderThemeColor.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialog }
        ]; };
        AjfReportBuilderThemeColor.propDecorators = {
            section: [{ type: core.Input }],
            label: [{ type: core.Input }],
            init: [{ type: core.Input }]
        };
        return AjfReportBuilderThemeColor;
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
    var AjfReportBuilderToolbarDialog = /** @class */ (function () {
        function AjfReportBuilderToolbarDialog(_service, _dialogRef) {
            this._service = _service;
            this._dialogRef = _dialogRef;
        }
        AjfReportBuilderToolbarDialog.prototype.resetReport = function () {
            var emptyReport = {
                'header': { 'content': [], 'styles': {} },
                'content': { 'content': [], 'styles': {} },
                'footer': { 'content': [], 'styles': {} },
                'styles': {}
            };
            this._service.setReport(emptyReport);
            this._dialogRef.close();
        };
        AjfReportBuilderToolbarDialog.prototype.close = function () {
            this._dialogRef.close();
        };
        AjfReportBuilderToolbarDialog.decorators = [
            { type: core.Component, args: [{
                        selector: 'toolbar-dialog',
                        template: "<h1 matDialogTitle>Dialog</h1>\n<div mat-dialog-content>Are you sure you want to erase the report?</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"resetReport()\">Yes</button>\n  <button mat-button (click)=\"close()\">No</button>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderToolbarDialog.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialogRef }
        ]; };
        return AjfReportBuilderToolbarDialog;
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
    var AjfReportBuilderToolbar = /** @class */ (function () {
        function AjfReportBuilderToolbar(_service, dialog) {
            this._service = _service;
            this.dialog = dialog;
            // this is an any EventEmitter
            this.addClick = new core.EventEmitter();
            this.zoom = false;
            this.emptyContent = this._service.emptyContent;
        }
        AjfReportBuilderToolbar.prototype.canDropPredicate = function (item) {
            return item.data.dropZones.indexOf('widget') > -1;
        };
        AjfReportBuilderToolbar.prototype.JSONRequest = function () { };
        /**
         * this method will pass event to event emitter
         */
        AjfReportBuilderToolbar.prototype.onAddClick = function (event) {
            this.addClick.emit(event);
        };
        AjfReportBuilderToolbar.prototype.addToList = function (event) {
            if (event.item.data.widget != null) {
                this._service.addCustomWidgets({ json: JSON.stringify(event.item.data.widget.toJson()), type: '' });
            }
        };
        AjfReportBuilderToolbar.prototype.undoLastOperation = function () {
            try {
                var myObj = JSON.parse(this._service.popJsonStack() || '');
                this._service.setReport(utils.deepCopy(myObj));
            }
            catch (e) {
            }
        };
        AjfReportBuilderToolbar.prototype.isZoomed = function () {
            this.zoom = !this.zoom;
            if (this.zoom) {
                this._service.fixedZoomIn();
            }
            else {
                this._service.fixedZoomOut();
            }
        };
        AjfReportBuilderToolbar.prototype.openDialog = function () {
            this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
        };
        AjfReportBuilderToolbar.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-toolbar',
                        outputs: ['addClick'],
                        template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderToolbar.ctorParameters = function () { return [
            { type: AjfReportBuilderService },
            { type: dialog.MatDialog }
        ]; };
        return AjfReportBuilderToolbar;
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
    var AjfReportBuilderWidgetToolbarButton = /** @class */ (function () {
        function AjfReportBuilderWidgetToolbarButton() {
        }
        AjfReportBuilderWidgetToolbarButton.prototype.ngOnInit = function () {
            this.widgetIcon = ajfReportBuilderWidgetToString(this.widgetType);
        };
        AjfReportBuilderWidgetToolbarButton.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-widget-toolbar-button',
                        template: "<button\n  mat-button\n  matTooltip=\"{{ widgetType}}\"\n  [matTooltipPosition]=\"'above'\">\n  <mat-icon\n    fontSet=\"ajf-icon\"\n    fontIcon=\"{{ widgetIcon }}\">\n  </mat-icon>\n</button>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderWidgetToolbarButton.ctorParameters = function () { return []; };
        AjfReportBuilderWidgetToolbarButton.propDecorators = {
            widgetType: [{ type: core.Input }]
        };
        return AjfReportBuilderWidgetToolbarButton;
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
    var AjfReportBuilderWidgetsRowButtons = /** @class */ (function () {
        /**
         *
         * @param private _afjBuilderService: AjfBuilderService
         */
        function AjfReportBuilderWidgetsRowButtons(_service) {
            this._service = _service;
            this.isOver = false;
            this.currentWidget = null;
            this.isClicked = false;
            this.color = [];
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            // this boolean sign if is on over a widget
            this.onOver = false;
            this._currentWidgetSub = rxjs.Subscription.EMPTY;
            this._onDraggedSub = rxjs.Subscription.EMPTY;
            this._onOverSub = rxjs.Subscription.EMPTY;
        }
        AjfReportBuilderWidgetsRowButtons.prototype.selectedWidget = function () {
            this.isClicked = !this.isClicked;
            this._service.setOrigin(this.from);
            this._service.updateCurrentWidget(this.widget);
        };
        AjfReportBuilderWidgetsRowButtons.prototype.remove = function () {
            if (this.fromWidget != null) {
                this._service.updateCurrentWidget(this.fromWidget);
            }
            this._service.remove(this.from, this.position);
        };
        AjfReportBuilderWidgetsRowButtons.prototype.onFocus = function () {
            if (this.widget === this.currentWidget) {
                return true;
            }
            else {
                return false;
            }
        };
        AjfReportBuilderWidgetsRowButtons.prototype.changeColumn = function (direction) {
            if (direction == 'back') {
                this._service.changeColumn(this.position, this.position - 1, this.fromWidget);
            }
            else {
                this._service.changeColumn(this.position, this.position + 1, this.fromWidget);
            }
        };
        AjfReportBuilderWidgetsRowButtons.prototype.isColumn = function () {
            if (this.label === 'Column') {
                return true;
            }
            else {
                return false;
            }
        };
        AjfReportBuilderWidgetsRowButtons.prototype.isOneColumn = function () {
            var rootObj = this.fromWidget;
            if (rootObj.columns.length > 1) {
                return false;
            }
            else {
                return true;
            }
        };
        AjfReportBuilderWidgetsRowButtons.prototype.ngOnInit = function () {
            var _this = this;
            this.label = reports.AjfWidgetType[this.widget.widgetType];
            this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
            this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);
            this._onDraggedSub = this._service.onDragged.subscribe(function (x) {
                _this.onDragged = x;
            });
            this._onOverSub = this._service.onOver.subscribe(function (x) {
                _this.onOver = x;
            });
            this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
                _this.currentWidget = x;
                if (x !== _this.widget) {
                    _this.isClicked = false;
                }
            });
        };
        AjfReportBuilderWidgetsRowButtons.prototype.ngOnDestroy = function () {
            this._onDraggedSub.unsubscribe();
            this._onOverSub.unsubscribe();
            this._currentWidgetSub.unsubscribe();
        };
        AjfReportBuilderWidgetsRowButtons.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-widgets-row-buttons',
                        template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderWidgetsRowButtons.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        AjfReportBuilderWidgetsRowButtons.propDecorators = {
            from: [{ type: core.Input }],
            fromWidget: [{ type: core.Input }],
            position: [{ type: core.Input }],
            widget: [{ type: core.Input }],
            child: [{ type: core.Input }],
            isOver: [{ type: core.Input }]
        };
        return AjfReportBuilderWidgetsRowButtons;
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
    var AjfReportBuilderWidgetsToolbar = /** @class */ (function () {
        /**
         *
         * @param private _afjBuilderService: AjfBuilderService
         */
        function AjfReportBuilderWidgetsToolbar(_service) {
            this._service = _service;
            // fieldTypes is an array string that contains the field options
            this.chartTypes = utils.sizedEnumToStringArray(reports.AjfChartType);
            this.widgetTypes = utils.sizedEnumToStringArray(reports.AjfWidgetType);
            // delete Column widget
            var pos = this.widgetTypes.indexOf('Column');
            if (pos !== -1) {
                this.widgetTypes.splice(pos, 1);
            }
        }
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderWidgetsToolbar.prototype.onDragStartHandler = function () {
            var _this = this;
            var s = rxjs.timer(200).subscribe(function () {
                if (s != null) {
                    s.unsubscribe();
                }
                _this._service.dragStarted();
            });
        };
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        AjfReportBuilderWidgetsToolbar.prototype.onDragEndHandler = function () {
            this._service.dragEnded();
        };
        AjfReportBuilderWidgetsToolbar.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report-builder-widgets-toolbar',
                        template: "<mat-list>\n  <mat-list-item *ngFor=\"let t of widgetTypes\">\n    <ajf-report-builder-widget-toolbar-button ng-if=\"t != 'Column'\"\n        cdkDrag\n        [cdkDragData]=\"{widgetType: t, dropZones: ['header','content','footer','column','widget']}\"\n        [widgetType]=\"t\"\n        (onDragStart)=\"onDragStartHandler();\"\n        (onDragEnd)=\"onDragEndHandler();\">\n    </ajf-report-builder-widget-toolbar-button>\n  </mat-list-item>\n</mat-list>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        AjfReportBuilderWidgetsToolbar.ctorParameters = function () { return [
            { type: AjfReportBuilderService }
        ]; };
        return AjfReportBuilderWidgetsToolbar;
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
    var AjfReportBuilderModule = /** @class */ (function () {
        function AjfReportBuilderModule() {
        }
        AjfReportBuilderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.AjfCommonModule, image.AjfImageModule, map.AjfMapModule, monacoEditor.AjfMonacoEditorModule,
                            table.AjfTableModule, text.AjfTextModule, ngxColorPicker.ColorPickerModule, common$1.CommonModule,
                            dragDrop.DragDropModule, forms.FormsModule, button.MatButtonModule, buttonToggle.MatButtonToggleModule,
                            card.MatCardModule, dialog.MatDialogModule, gridList.MatGridListModule, icon.MatIconModule,
                            list.MatListModule, select.MatSelectModule, sidenav.MatSidenavModule, slideToggle.MatSlideToggleModule,
                            slider.MatSliderModule, tabs.MatTabsModule, toolbar.MatToolbarModule, tooltip.MatTooltipModule,
                            core$1.TranslateModule,
                        ],
                        declarations: [
                            AjfImageFilterPipe,
                            AjfQuillEditor,
                            AjfReportBuilderColumn,
                            AjfReportBuilderConditionEditor,
                            AjfReportBuilderContent,
                            AjfReportBuilderCustomWidgetDialog,
                            AjfReportBuilderCustomWidgetsToolbar,
                            AjfReportBuilderCustomWidgetToolbarButton,
                            AjfReportBuilderFormsAnalyzer,
                            AjfReportBuilderFormsAnalyzerDialog,
                            AjfReportBuilderImageGroup,
                            AjfReportBuilderProperties,
                            AjfReportBuilderRendererWidget,
                            AjfReportBuilderThemeColor,
                            AjfReportBuilderThemeColorDialog,
                            AjfReportBuilderToolbar,
                            AjfReportBuilderToolbarDialog,
                            AjfReportBuilderWidgetsRowButtons,
                            AjfReportBuilderWidgetsToolbar,
                            AjfReportBuilderWidgetToolbarButton,
                            AjfReportBuilder,
                        ],
                        exports: [
                            AjfReportBuilder,
                        ],
                        providers: [
                            AjfReportBuilderService,
                        ]
                    },] }
        ];
        return AjfReportBuilderModule;
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

    exports.AJF_REPORTS_CONFIG = AJF_REPORTS_CONFIG;
    exports.AjfReportBuilder = AjfReportBuilder;
    exports.AjfReportBuilderModule = AjfReportBuilderModule;
    exports.AjfReportBuilderService = AjfReportBuilderService;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_a = AjfImageFilterPipe;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_b = AjfQuillEditor;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_c = AjfReportBuilderColumn;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_d = AjfReportBuilderConditionEditor;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_e = AjfReportBuilderContent;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_f = AjfReportBuilderCustomWidgetDialog;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_g = AjfReportBuilderCustomWidgetsToolbar;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_h = AjfReportBuilderCustomWidgetToolbarButton;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_i = AjfReportBuilderFormsAnalyzer;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_j = AjfReportBuilderFormsAnalyzerDialog;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_k = AjfReportBuilderImageGroup;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_l = AjfReportBuilderProperties;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_m = AjfReportBuilderRendererWidget;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_n = AjfReportBuilderThemeColor;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_o = AjfReportBuilderThemeColorDialog;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_p = AjfReportBuilderToolbar;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_q = AjfReportBuilderToolbarDialog;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_r = AjfReportBuilderWidgetsRowButtons;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_s = AjfReportBuilderWidgetsToolbar;
    exports.ɵgc_ajf_src_material_report_builder_report_builder_t = AjfReportBuilderWidgetToolbarButton;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-report-builder.umd.js.map
