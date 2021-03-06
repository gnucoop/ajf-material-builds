(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ajf/core/reports'), require('@angular/core'), require('@ajf/core/image'), require('@ajf/core/chart'), require('@ajf/core/common'), require('@ajf/core/map'), require('@ajf/core/page-break'), require('@ajf/core/table'), require('@ajf/core/text'), require('@ajf/core/transloco'), require('@ajf/material/image'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/reports', ['exports', '@ajf/core/reports', '@angular/core', '@ajf/core/image', '@ajf/core/chart', '@ajf/core/common', '@ajf/core/map', '@ajf/core/page-break', '@ajf/core/table', '@ajf/core/text', '@ajf/core/transloco', '@ajf/material/image', '@angular/common', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.reports = {}), global.ajf.core.reports, global.ng.core, global.ajf.core.image, global.ajf.core.chart, global.ajf.core.common, global.ajf.core.map, global.ajf.core.pageBreak, global.ajf.core.table, global.ajf.core.text, global.ajf.core.transloco, global.ajf.material.image, global.ng.common, global.rxjs));
}(this, (function (exports, reports, i0, image, chart, common, map, pageBreak, table, text, transloco, image$1, common$1, rxjs) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

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

    var AjfChartWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfChartWidgetComponent, _super);
        function AjfChartWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfChartWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfChartWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-widget-export \n    [widgetType]=\"instance.widgetType\"  \n    [data]=\"instance.data\" \n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfChartWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfFormulaWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfFormulaWidgetComponent, _super);
        function AjfFormulaWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfFormulaWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfFormulaWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-text [htmlText]=\"instance.formula\"></ajf-text>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfFormulaWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfImageContainerWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfImageContainerWidgetComponent, _super);
        function AjfImageContainerWidgetComponent(cdr, el) {
            var _this = _super.call(this, cdr, el) || this;
            _this.imageTypes = image.AjfImageType;
            return _this;
        }
        return AjfImageContainerWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfImageContainerWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".ajf-image-container img{max-width:none;max-height:none}\n"]
                },] }
    ];
    AjfImageContainerWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfImageWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfImageWidgetComponent, _super);
        function AjfImageWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfImageWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfImageWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-image\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfImageWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfMapWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfMapWidgetComponent, _super);
        function AjfMapWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfMapWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfMapWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-map\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfMapWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfPageBreakWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfPageBreakWidgetComponent, _super);
        function AjfPageBreakWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfPageBreakWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfPageBreakWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-page-break></ajf-page-break>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfPageBreakWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfReportRenderer = /** @class */ (function (_super) {
        __extends(AjfReportRenderer, _super);
        function AjfReportRenderer(cdr) {
            return _super.call(this, cdr) || this;
        }
        return AjfReportRenderer;
    }(reports.AjfReportRenderer));
    AjfReportRenderer.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ajf-report',
                    template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}\n"]
                },] }
    ];
    AjfReportRenderer.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef }
    ]; };

    var AjfTableWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfTableWidgetComponent, _super);
        function AjfTableWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfTableWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfTableWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-widget-export \n[widgetType]=\"instance.widgetType\" \n[data]=\"instance.data\"\n[enable]=\"instance.exportable\"\n>\n    <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfTableWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var AjfTextWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfTextWidgetComponent, _super);
        function AjfTextWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfTextWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfTextWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<ajf-text [htmlText]=\"instance.htmlText | transloco\"></ajf-text>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["\n"]
                },] }
    ];
    AjfTextWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };

    var defaultWidgetsFactory = function () {
        var defaultWidgets = {};
        defaultWidgets[reports.AjfWidgetType.PageBreak] = { component: AjfPageBreakWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Image] = { component: AjfImageWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Text] = { component: AjfTextWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Chart] = { component: AjfChartWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Table] = { component: AjfTableWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.DynamicTable] = { component: AjfTableWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Map] = { component: AjfMapWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Column] = { component: AjfColumnWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.Formula] = { component: AjfFormulaWidgetComponent };
        defaultWidgets[reports.AjfWidgetType.ImageContainer] = { component: AjfImageContainerWidgetComponent };
        return defaultWidgets;
    };
    var ɵ0 = defaultWidgetsFactory;
    var AjfWidgetService = /** @class */ (function (_super) {
        __extends(AjfWidgetService, _super);
        function AjfWidgetService() {
            return _super.call(this, defaultWidgetsFactory()) || this;
        }
        return AjfWidgetService;
    }(reports.AjfWidgetService));
    AjfWidgetService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function AjfWidgetService_Factory() { return new AjfWidgetService(); }, token: AjfWidgetService, providedIn: "root" });
    AjfWidgetService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    AjfWidgetService.ctorParameters = function () { return []; };
    var AjfReportWidget = /** @class */ (function (_super) {
        __extends(AjfReportWidget, _super);
        function AjfReportWidget(cfr, renderer, widgetService) {
            var _this = _super.call(this, cfr, renderer) || this;
            _this.widgetsMap = widgetService.componentsMap;
            return _this;
        }
        return AjfReportWidget;
    }(reports.AjfReportWidget));
    AjfReportWidget.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ajf-widget',
                    template: "<ng-template ajf-widget-host></ng-template>\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"]
                },] }
    ];
    AjfReportWidget.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: i0.Renderer2 },
        { type: AjfWidgetService }
    ]; };
    var AjfColumnWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfColumnWidgetComponent, _super);
        function AjfColumnWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        return AjfColumnWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfColumnWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".ajf-column-container{flex:1 1 auto}\n"]
                },] }
    ];
    AjfColumnWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };
    var AjfLayoutWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfLayoutWidgetComponent, _super);
        function AjfLayoutWidgetComponent(cdr, el) {
            var _this = _super.call(this, cdr, el) || this;
            _this._allcolumnsRendered$ = new rxjs.BehaviorSubject(false);
            _this.allcolumnsRendered$ = _this._allcolumnsRendered$;
            return _this;
        }
        AjfLayoutWidgetComponent.prototype.ngAfterContentChecked = function () {
            this._allcolumnsRendered$.next(true);
        };
        return AjfLayoutWidgetComponent;
    }(reports.AjfBaseWidgetComponent));
    AjfLayoutWidgetComponent.decorators = [
        { type: i0.Component, args: [{
                    template: "<div class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n",
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"]
                },] }
    ];
    AjfLayoutWidgetComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
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
    var AjfReportsModule = /** @class */ (function () {
        function AjfReportsModule() {
        }
        return AjfReportsModule;
    }());
    AjfReportsModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        chart.AjfChartModule,
                        common.AjfCommonModule,
                        image$1.AjfImageModule,
                        map.AjfMapModule,
                        pageBreak.AjfPageBreakModule,
                        table.AjfTableModule,
                        text.AjfTextModule,
                        common$1.CommonModule,
                        reports.AjfReportsModule,
                        transloco.AjfTranslocoModule,
                    ],
                    declarations: [
                        AjfChartWidgetComponent,
                        AjfColumnWidgetComponent,
                        AjfFormulaWidgetComponent,
                        AjfImageContainerWidgetComponent,
                        AjfImageWidgetComponent,
                        AjfLayoutWidgetComponent,
                        AjfMapWidgetComponent,
                        AjfPageBreakWidgetComponent,
                        AjfReportRenderer,
                        AjfReportWidget,
                        AjfTableWidgetComponent,
                        AjfTextWidgetComponent,
                    ],
                    exports: [
                        AjfReportRenderer,
                        AjfReportWidget,
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

    exports.AjfChartWidgetComponent = AjfChartWidgetComponent;
    exports.AjfColumnWidgetComponent = AjfColumnWidgetComponent;
    exports.AjfFormulaWidgetComponent = AjfFormulaWidgetComponent;
    exports.AjfImageContainerWidgetComponent = AjfImageContainerWidgetComponent;
    exports.AjfImageWidgetComponent = AjfImageWidgetComponent;
    exports.AjfLayoutWidgetComponent = AjfLayoutWidgetComponent;
    exports.AjfMapWidgetComponent = AjfMapWidgetComponent;
    exports.AjfPageBreakWidgetComponent = AjfPageBreakWidgetComponent;
    exports.AjfReportRenderer = AjfReportRenderer;
    exports.AjfReportWidget = AjfReportWidget;
    exports.AjfReportsModule = AjfReportsModule;
    exports.AjfTableWidgetComponent = AjfTableWidgetComponent;
    exports.AjfTextWidgetComponent = AjfTextWidgetComponent;
    exports.AjfWidgetService = AjfWidgetService;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-reports.umd.js.map
