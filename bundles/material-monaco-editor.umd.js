(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/monaco-editor', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.monacoEditor = {}), global.ng.core));
}(this, (function (exports, core) { 'use strict';

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
    /**
     * Representation of AutoCompleteItem
     */
    var AutoCompleteItem = /** @class */ (function () {
        function AutoCompleteItem() {
        }
        AutoCompleteItem.prototype.setLabel = function (label) {
            this.label = label;
            return this;
        };
        AutoCompleteItem.prototype.setKind = function (kind) {
            this.kind = kind;
            return this;
        };
        AutoCompleteItem.prototype.setDocumentation = function (documentation) {
            this.documentation = documentation;
            return this;
        };
        AutoCompleteItem.prototype.setInsertText = function (insertText) {
            this.insertText = insertText;
            return this;
        };
        return AutoCompleteItem;
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
     * List of dev language avalaible in Monaco Editor
     */
    var IEditorLanguage = /** @class */ (function () {
        function IEditorLanguage() {
        }
        IEditorLanguage.BAT = 'bat';
        IEditorLanguage.C = 'c';
        IEditorLanguage.CPP = 'cpp';
        IEditorLanguage.CSHARP = 'csharp';
        IEditorLanguage.CSS = 'css';
        IEditorLanguage.DOCKERFILE = 'dockerfile';
        IEditorLanguage.FSHARP = 'fsharp';
        IEditorLanguage.GO = 'go';
        IEditorLanguage.HANDLEBARS = 'handlebars';
        IEditorLanguage.HTML = 'html';
        IEditorLanguage.INI = 'ini';
        IEditorLanguage.JADE = 'jade';
        IEditorLanguage.JAVASCRIPT = 'javascript';
        IEditorLanguage.JSON = 'json';
        IEditorLanguage.LESS = 'less';
        IEditorLanguage.LUA = 'lua';
        IEditorLanguage.MARKDOWN = 'markdown';
        IEditorLanguage.OBJECTIVEC = 'objective-c';
        IEditorLanguage.PHP = 'php';
        IEditorLanguage.PLAINTEXT = 'plaintext';
        IEditorLanguage.POSTIATS = 'postiats';
        IEditorLanguage.POWERSHELL = 'powershell';
        IEditorLanguage.PYTHON = 'python';
        IEditorLanguage.R = 'r';
        IEditorLanguage.RAZOR = 'razor';
        IEditorLanguage.RUBY = 'ruby';
        IEditorLanguage.SCSS = 'scss';
        IEditorLanguage.SQL = 'sql';
        IEditorLanguage.SWIFT = 'swift';
        IEditorLanguage.TYPESCRIPT = 'typescript';
        IEditorLanguage.VB = 'vb';
        IEditorLanguage.XML = 'xml';
        IEditorLanguage.YAML = 'yaml';
        return IEditorLanguage;
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
     * Manage the autoCompletion for all instances of the editors
     */
    var AutoCompleteSingleton = /** @class */ (function () {
        function AutoCompleteSingleton() {
            this._autoCompleteValues = {};
        }
        /**
         * We use a singleton, because this class can be call from all the Monaco Editor Components
         */
        AutoCompleteSingleton.getInstance = function () {
            if (!AutoCompleteSingleton._instance) {
                AutoCompleteSingleton._instance = new AutoCompleteSingleton();
            }
            return AutoCompleteSingleton._instance;
        };
        Object.defineProperty(AutoCompleteSingleton.prototype, "autoCompleteValues", {
            get: function () {
                return this._autoCompleteValues;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Init autoComplete for language passed in param if is not already done.
         * @param language
         */
        AutoCompleteSingleton.prototype.initAutoComplete = function (language) {
            if (this._autoCompleteValues[language.toString()]) {
                return;
            }
            this._autoCompleteValues[language.toString()] = [];
            // This event is fired when the user press Ctrl + Space, to show Intelissense (Autocomplete)
            monaco.languages.registerCompletionItemProvider(language, {
                provideCompletionItems: function (model) {
                    // Get new autoComplete list for the current content
                    AutoCompleteSingleton.getInstance().parseAutoCompleteValues(language, model.getValue());
                    return AutoCompleteSingleton.getInstance().autoCompleteValues[language.toString()];
                },
            });
        };
        /**
         * Parse the content passed in param for the language passed in param
         * @param language
         * @param content
         */
        AutoCompleteSingleton.prototype.parseAutoCompleteValues = function (language, content) {
            switch (language) {
                case IEditorLanguage.XML:
                    return this._parseXmlAutoComplete(content);
                case IEditorLanguage.JSON:
                    return this._parseJsonAutoComplete(content);
                default:
                    return [];
            }
        };
        /**
         * Parse the XML content and add all tags in AutoComplete for XML Language
         * @param content
         */
        AutoCompleteSingleton.prototype._parseXmlAutoComplete = function (content) {
            var tempList = [];
            var parser = new DOMParser();
            var tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
            var _loop_1 = function (i) {
                // Add TAG only if it not already existing in autoComplete list and in tempList
                if (!this_1._autoCompleteValues[IEditorLanguage.XML].find(function (obj) { return obj.label === tags[i].tagName; }) &&
                    !tempList.find(function (obj) { return obj.label === tags[i].tagName; })) {
                    // Create autoComplete object
                    var obj = new AutoCompleteItem()
                        .setLabel(tags[i].tagName)
                        .setKind(monaco.languages.CompletionItemKind.Function)
                        .setDocumentation('')
                        .setInsertText("<" + tags[i].tagName + "><" + tags[i].tagName + ">");
                    tempList.push(obj);
                }
            };
            var this_1 = this;
            for (var i = 0; i < tags.length; i++) {
                _loop_1(i);
            }
            // Add tempList list in the _autoCompleteValues, to maintain a list updated
            if (tempList.length > 0) {
                this._autoCompleteValues[IEditorLanguage.XML.toString()] =
                    this._autoCompleteValues[IEditorLanguage.XML.toString()].concat(tempList);
            }
            return tempList;
        };
        AutoCompleteSingleton.prototype._parseJsonAutoComplete = function (content) {
            /* tslint:disable-next-line */
            var regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
            var tempList = [];
            var m;
            while ((m = regex.exec(content)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                // Add Element only if it not already existing in autoComplete list and in tempList
                if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON].find(function (obj) { return obj.label === m[1]; }) &&
                    !tempList.find(function (obj) { return obj.label === m[1]; })) {
                    var obj = new AutoCompleteItem()
                        .setLabel(m[1])
                        .setKind(monaco.languages.CompletionItemKind.Value)
                        .setDocumentation('')
                        .setInsertText("'" + m[1] + "':");
                    tempList.push(obj);
                }
            }
            // Add tempList list in the _autoCompleteValues, to maintain a list updated
            if (tempList.length > 0) {
                this._autoCompleteValues[IEditorLanguage.JSON.toString()] =
                    this._autoCompleteValues[IEditorLanguage.JSON.toString()].concat(tempList);
            }
            return tempList;
        };
        AutoCompleteSingleton._instance = null;
        return AutoCompleteSingleton;
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
     * Configuration options for the editor.
     */
    var IEditorOptions = /** @class */ (function () {
        function IEditorOptions() {
        }
        return IEditorOptions;
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
     * List of theme available for Monaco Editor
     */
    var IEditorTheme = /** @class */ (function () {
        function IEditorTheme() {
        }
        IEditorTheme.VISUAL_STUDIO = 'vs';
        IEditorTheme.VISUAL_STUDIO_DARK = 'vs-dark';
        IEditorTheme.HIGH_CONTRAST_DARK = 'hc-black';
        return IEditorTheme;
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
    var AjfMonacoEditor = /** @class */ (function () {
        function AjfMonacoEditor() {
            this.autoFormatOnLoad = true;
            this.monacoLibPath = 'vs/loader.js';
            this.valueChange = new core.EventEmitter();
            this.valueToCompareChange = new core.EventEmitter();
            this.init = new core.EventEmitter();
            this._value = '';
            this._valueToCompare = '';
        }
        Object.defineProperty(AjfMonacoEditor.prototype, "valueToCompare", {
            set: function (v) {
                if (v !== this._valueToCompare) {
                    this._valueToCompare = v;
                    if (this._valueToCompare === void 0 || !this._valueToCompare || !this._editor) {
                        if (this._editor && this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
                            this._initEditor();
                            return;
                        }
                        return;
                    }
                    if (!this._value) {
                        this._value = '';
                    }
                    if (this._editor.getEditorType() === 'vs.editor.ICodeEditor') {
                        this._initEditor();
                        return;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfMonacoEditor.prototype, "value", {
            set: function (v) {
                if (v !== this._value) {
                    this._value = v;
                    if (this._value === void 0 || !this._editor) {
                        return;
                    }
                    if (this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
                        this._initEditor();
                        return;
                    }
                    this._editor.setValue(this._value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfMonacoEditor.prototype, "editor", {
            get: function () {
                return this._editor;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * load Monaco lib
         */
        AjfMonacoEditor.prototype.ngAfterViewInit = function () {
            var _this = this;
            var onGotAmdLoader = function () {
                // Load monaco
                window.require(['vs/editor/editor.main'], function () {
                    _this._initMonaco();
                });
            };
            // Load AMD loader if necessary
            if (!window.require) {
                var loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = this.monacoLibPath;
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            }
            else {
                onGotAmdLoader();
            }
        };
        /**
         * Upon destruction of the component we make sure to dispose both the editor and
         * the extra libs that we might've loaded
         */
        AjfMonacoEditor.prototype.ngOnDestroy = function () {
            this.dispose();
        };
        AjfMonacoEditor.prototype.ngOnChanges = function (_changes) {
            if (this._editor) {
                this._editor.updateOptions(this._getOptions());
            }
        };
        /**
         * Destroy the monaco componenent
         */
        AjfMonacoEditor.prototype.dispose = function () {
            var myDiv = this.editorContent.nativeElement;
            if (this._editor) {
                this._editor.dispose();
                while (myDiv.hasChildNodes()) {
                    if (myDiv.firstChild != null) {
                        myDiv.removeChild(myDiv.firstChild);
                    }
                }
                this._editor = null;
            }
        };
        /**
         * Triggered when windows is resized
         * @param event
         */
        AjfMonacoEditor.prototype.onResize = function (_event) {
            // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
            var myDiv = this.editorContent.nativeElement;
            if (myDiv == null || myDiv.parentElement == null) {
                return;
            }
            myDiv.setAttribute('style', "height: " + myDiv.parentElement.offsetHeight + "px; width:100%;");
        };
        /**
         * Init editor
         * Is called once monaco library is available
         */
        AjfMonacoEditor.prototype._initMonaco = function () {
            this._initEditor();
            this.init.emit();
        };
        AjfMonacoEditor.prototype._initEditor = function () {
            var _this = this;
            var myDiv = this.editorContent.nativeElement;
            var options = this._getOptions();
            this.dispose();
            if (!this._valueToCompare) {
                this._editor = this._initSimpleEditor(myDiv, options);
            }
            else {
                this._editor = this._initDiffEditor(myDiv, options);
            }
            // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
            if (myDiv != null && myDiv.parentElement != null) {
                myDiv.setAttribute('style', "height: " + myDiv.parentElement.offsetHeight + "px; width:100%;");
            }
            // Init Autocomplete if not disabled
            if (!this.disableAutocomplete) {
                AutoCompleteSingleton.getInstance().initAutoComplete(this.language);
            }
            // When content is loaded, scrollChange is trigerred,
            // We can only force auto format at this moment, because editor
            // doesn't have onReady event ...
            //  this._editor.onDidScrollChange(() => {
            //     if (this.autoFormatOnLoad && !this._isCodeFormatted) {
            //         this._editor.getAction('editor.action.format').run();
            //         this._isCodeFormatted = true;
            //     }
            // });
            // Trigger on change event for simple editor
            this._getOriginalModel().onDidChangeContent(function (_e) {
                var newVal = _this._getOriginalModel().getValue();
                if (_this._value !== newVal) {
                    _this._updateValue(newVal);
                }
            });
            // Trigger on change event for diff editor
            if (this._getModifiedModel()) {
                this._getModifiedModel().onDidChangeContent(function (_e) {
                    var newVal = _this._getModifiedModel().getValue();
                    if (_this._valueToCompare !== newVal) {
                        _this._updateValueToCompare(newVal);
                    }
                });
            }
        };
        /**
         * Create a simple editor text
         * @param div
         * @param options
         */
        AjfMonacoEditor.prototype._initSimpleEditor = function (div, options) {
            return monaco.editor.create(div, options);
        };
        /**
         * Create a diff editor to compare two string (_value and _valueToCompare)
         * @param div
         */
        AjfMonacoEditor.prototype._initDiffEditor = function (div, options) {
            var originalModel = monaco.editor.createModel(this._value, this.language);
            var modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
            var diffEditor = monaco.editor.createDiffEditor(div, options);
            diffEditor.setModel({
                modified: modifiedModel,
                original: originalModel,
            });
            return diffEditor;
        };
        AjfMonacoEditor.prototype._getOptions = function () {
            var options = new IEditorOptions();
            options.experimentalScreenReader = this.experimentalScreenReader;
            options.ariaLabel = this.ariaLabel;
            options.rulers = this.rulers;
            options.wordSeparators = this.wordSeparators;
            options.selectionClipboard = this.selectionClipboard;
            options.lineNumbers = this.lineNumbers;
            options.selectOnLineNumbers = this.selectOnLineNumbers;
            options.lineNumbersMinChars = this.lineNumbersMinChars;
            options.glyphMargin = this.glyphMargin;
            options.lineDecorationsWidth = this.lineDecorationsWidth;
            options.revealHorizontalRightPadding = this.revealHorizontalRightPadding;
            options.roundedSelection = this.roundedSelection;
            options.theme = this.theme;
            options.readOnly = this.readOnly;
            options.scrollbar = this.scrollbar;
            options.overviewRulerLanes = this.overviewRulerLanes;
            options.cursorBlinking = this.cursorBlinking;
            options.mouseWheelZoom = this.mouseWheelZoom;
            options.cursorStyle = this.cursorStyle;
            options.mouseWheelZoom = this.mouseWheelZoom;
            options.fontLigatures = this.fontLigatures;
            options.disableTranslate3d = this.disableTranslate3d;
            options.hideCursorInOverviewRuler = this.hideCursorInOverviewRuler;
            options.scrollBeyondLastLine = this.scrollBeyondLastLine;
            options.automaticLayout = this.automaticLayout;
            options.wrappingColumn = this.wrappingColumn;
            options.wordWrap = this.wordWrap;
            options.wrappingIndent = this.wrappingIndent;
            options.wordWrapBreakBeforeCharacters = this.wordWrapBreakBeforeCharacters;
            options.wordWrapBreakAfterCharacters = this.wordWrapBreakAfterCharacters;
            options.wordWrapBreakObtrusiveCharacters = this.wordWrapBreakObtrusiveCharacters;
            options.stopRenderingLineAfter = this.stopRenderingLineAfter;
            options.hover = this.hover;
            options.contextmenu = this.contextmenu;
            options.mouseWheelScrollSensitivity = this.mouseWheelScrollSensitivity;
            options.quickSuggestions = this.quickSuggestions;
            options.quickSuggestionsDelay = this.quickSuggestionsDelay;
            options.parameterHints = this.parameterHints;
            options.iconsInSuggestions = this.iconsInSuggestions;
            options.autoClosingBrackets = this.autoClosingBrackets;
            options.formatOnType = this.formatOnType;
            options.suggestOnTriggerCharacters = this.suggestOnTriggerCharacters;
            options.acceptSuggestionOnEnter = this.acceptSuggestionOnEnter;
            options.snippetSuggestions = this.snippetSuggestions;
            options.tabCompletion = this.tabCompletion;
            options.wordBasedSuggestions = this.wordBasedSuggestions;
            options.selectionHighlight = this.selectionHighlight;
            options.codeLens = this.codeLens;
            options.folding = this.folding;
            options.renderWhitespace = this.renderWhitespace;
            options.renderControlCharacters = this.renderControlCharacters;
            options.renderIndentGuides = this.renderIndentGuides;
            options.renderLineHighlight = this.renderLineHighlight;
            options.useTabStops = this.useTabStops;
            options.fontFamily = this.fontFamily;
            options.fontWeight = this.fontWeight;
            options.fontSize = this.fontSize;
            options.lineHeight = this.lineHeight;
            options.value = this._value;
            options.language = this.language;
            Object.keys(options).forEach(function (key) {
                if (options[key] === undefined) {
                    delete options[key]; // Remove all undefined properties
                }
            });
            return options;
        };
        /**
         * UpdateValue
         *
         * @param value
         */
        AjfMonacoEditor.prototype._updateValue = function (value) {
            this.value = value;
            this._value = value;
            this.valueChange.emit(value);
        };
        /**
         * UpdateValue
         *
         * @param value
         */
        AjfMonacoEditor.prototype._updateValueToCompare = function (value) {
            this.valueToCompare = value;
            this._valueToCompare = value;
            this.valueToCompareChange.emit(value);
        };
        AjfMonacoEditor.prototype._getOriginalModel = function () {
            if (this._editor) {
                var model = this._editor.getModel();
                return model.original ? model.original : model;
            }
        };
        AjfMonacoEditor.prototype._getModifiedModel = function () {
            if (this._editor) {
                var model = this._editor.getModel();
                return model.modified ? model.modified : null;
            }
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "experimentalScreenReader", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "ariaLabel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], AjfMonacoEditor.prototype, "rulers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "wordSeparators", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "selectionClipboard", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "lineNumbers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "selectOnLineNumbers", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "lineNumbersMinChars", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "glyphMargin", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "lineDecorationsWidth", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "revealHorizontalRightPadding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "roundedSelection", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", IEditorTheme)
        ], AjfMonacoEditor.prototype, "theme", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "readOnly", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AjfMonacoEditor.prototype, "scrollbar", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "overviewRulerLanes", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "cursorBlinking", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "mouseWheelZoom", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "cursorStyle", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "fontLigatures", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "disableTranslate3d", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "hideCursorInOverviewRuler", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "scrollBeyondLastLine", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "automaticLayout", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "wrappingColumn", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "wordWrap", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "wrappingIndent", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "wordWrapBreakBeforeCharacters", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "wordWrapBreakAfterCharacters", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "wordWrapBreakObtrusiveCharacters", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "stopRenderingLineAfter", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "hover", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "contextmenu", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "mouseWheelScrollSensitivity", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "quickSuggestions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "quickSuggestionsDelay", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "parameterHints", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "iconsInSuggestions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "autoClosingBrackets", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "formatOnType", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "suggestOnTriggerCharacters", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "acceptSuggestionOnEnter", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "snippetSuggestions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "tabCompletion", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "wordBasedSuggestions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "selectionHighlight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "codeLens", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "folding", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "renderWhitespace", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "renderControlCharacters", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "renderIndentGuides", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "renderLineHighlight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "useTabStops", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "fontFamily", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AjfMonacoEditor.prototype, "fontWeight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "fontSize", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], AjfMonacoEditor.prototype, "lineHeight", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", IEditorLanguage)
        ], AjfMonacoEditor.prototype, "language", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], AjfMonacoEditor.prototype, "disableAutocomplete", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AjfMonacoEditor.prototype, "autoFormatOnLoad", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AjfMonacoEditor.prototype, "monacoLibPath", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], AjfMonacoEditor.prototype, "valueToCompare", null);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], AjfMonacoEditor.prototype, "value", null);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AjfMonacoEditor.prototype, "valueChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AjfMonacoEditor.prototype, "valueToCompareChange", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AjfMonacoEditor.prototype, "init", void 0);
        __decorate([
            core.ViewChild('editor', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], AjfMonacoEditor.prototype, "editorContent", void 0);
        AjfMonacoEditor = __decorate([
            core.Component({
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                selector: 'ajf-monaco-editor',
                template: "<div #editor class=\"ajf-monaco-editor\"></div>\n",
                host: { '(window:resize)': 'onResize($event)' },
                styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"]
            }),
            __metadata("design:paramtypes", [])
        ], AjfMonacoEditor);
        return AjfMonacoEditor;
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
    var AjfMonacoEditorModule = /** @class */ (function () {
        function AjfMonacoEditorModule() {
        }
        AjfMonacoEditorModule = __decorate([
            core.NgModule({
                declarations: [
                    AjfMonacoEditor,
                ],
                exports: [
                    AjfMonacoEditor,
                ]
            })
        ], AjfMonacoEditorModule);
        return AjfMonacoEditorModule;
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

    exports.AjfMonacoEditor = AjfMonacoEditor;
    exports.AjfMonacoEditorModule = AjfMonacoEditorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-monaco-editor.umd.js.map
