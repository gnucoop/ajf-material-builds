(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/monaco-editor', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.monacoEditor = {}), global.ng.core));
}(this, (function (exports, core) { 'use strict';

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
        AjfMonacoEditor.decorators = [
            { type: core.Component, args: [{
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'ajf-monaco-editor',
                        template: "<div #editor class=\"ajf-monaco-editor\"></div>\n",
                        host: { '(window:resize)': 'onResize($event)' },
                        styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"]
                    },] }
        ];
        AjfMonacoEditor.ctorParameters = function () { return []; };
        AjfMonacoEditor.propDecorators = {
            experimentalScreenReader: [{ type: core.Input }],
            ariaLabel: [{ type: core.Input }],
            rulers: [{ type: core.Input }],
            wordSeparators: [{ type: core.Input }],
            selectionClipboard: [{ type: core.Input }],
            lineNumbers: [{ type: core.Input }],
            selectOnLineNumbers: [{ type: core.Input }],
            lineNumbersMinChars: [{ type: core.Input }],
            glyphMargin: [{ type: core.Input }],
            lineDecorationsWidth: [{ type: core.Input }],
            revealHorizontalRightPadding: [{ type: core.Input }],
            roundedSelection: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            readOnly: [{ type: core.Input }],
            scrollbar: [{ type: core.Input }],
            overviewRulerLanes: [{ type: core.Input }],
            cursorBlinking: [{ type: core.Input }],
            mouseWheelZoom: [{ type: core.Input }],
            cursorStyle: [{ type: core.Input }],
            fontLigatures: [{ type: core.Input }],
            disableTranslate3d: [{ type: core.Input }],
            hideCursorInOverviewRuler: [{ type: core.Input }],
            scrollBeyondLastLine: [{ type: core.Input }],
            automaticLayout: [{ type: core.Input }],
            wrappingColumn: [{ type: core.Input }],
            wordWrap: [{ type: core.Input }],
            wrappingIndent: [{ type: core.Input }],
            wordWrapBreakBeforeCharacters: [{ type: core.Input }],
            wordWrapBreakAfterCharacters: [{ type: core.Input }],
            wordWrapBreakObtrusiveCharacters: [{ type: core.Input }],
            stopRenderingLineAfter: [{ type: core.Input }],
            hover: [{ type: core.Input }],
            contextmenu: [{ type: core.Input }],
            mouseWheelScrollSensitivity: [{ type: core.Input }],
            quickSuggestions: [{ type: core.Input }],
            quickSuggestionsDelay: [{ type: core.Input }],
            parameterHints: [{ type: core.Input }],
            iconsInSuggestions: [{ type: core.Input }],
            autoClosingBrackets: [{ type: core.Input }],
            formatOnType: [{ type: core.Input }],
            suggestOnTriggerCharacters: [{ type: core.Input }],
            acceptSuggestionOnEnter: [{ type: core.Input }],
            snippetSuggestions: [{ type: core.Input }],
            tabCompletion: [{ type: core.Input }],
            wordBasedSuggestions: [{ type: core.Input }],
            selectionHighlight: [{ type: core.Input }],
            codeLens: [{ type: core.Input }],
            folding: [{ type: core.Input }],
            renderWhitespace: [{ type: core.Input }],
            renderControlCharacters: [{ type: core.Input }],
            renderIndentGuides: [{ type: core.Input }],
            renderLineHighlight: [{ type: core.Input }],
            useTabStops: [{ type: core.Input }],
            fontFamily: [{ type: core.Input }],
            fontWeight: [{ type: core.Input }],
            fontSize: [{ type: core.Input }],
            lineHeight: [{ type: core.Input }],
            language: [{ type: core.Input }],
            disableAutocomplete: [{ type: core.Input }],
            autoFormatOnLoad: [{ type: core.Input }],
            monacoLibPath: [{ type: core.Input }],
            valueToCompare: [{ type: core.Input }],
            value: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            valueToCompareChange: [{ type: core.Output }],
            init: [{ type: core.Output }],
            editorContent: [{ type: core.ViewChild, args: ['editor', { static: true },] }]
        };
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
        AjfMonacoEditorModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AjfMonacoEditor,
                        ],
                        exports: [
                            AjfMonacoEditor,
                        ]
                    },] }
        ];
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
