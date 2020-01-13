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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, ViewChild, EventEmitter, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Representation of AutoCompleteItem
 */
var /**
 * Representation of AutoCompleteItem
 */
AutoCompleteItem = /** @class */ (function () {
    function AutoCompleteItem() {
    }
    /**
     * @param {?} label
     * @return {?}
     */
    AutoCompleteItem.prototype.setLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        this.label = label;
        return this;
    };
    /**
     * @param {?} kind
     * @return {?}
     */
    AutoCompleteItem.prototype.setKind = /**
     * @param {?} kind
     * @return {?}
     */
    function (kind) {
        this.kind = kind;
        return this;
    };
    /**
     * @param {?} documentation
     * @return {?}
     */
    AutoCompleteItem.prototype.setDocumentation = /**
     * @param {?} documentation
     * @return {?}
     */
    function (documentation) {
        this.documentation = documentation;
        return this;
    };
    /**
     * @param {?} insertText
     * @return {?}
     */
    AutoCompleteItem.prototype.setInsertText = /**
     * @param {?} insertText
     * @return {?}
     */
    function (insertText) {
        this.insertText = insertText;
        return this;
    };
    return AutoCompleteItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     * @return {?}
     */
    AutoCompleteSingleton.getInstance = /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     * @return {?}
     */
    function () {
        if (!AutoCompleteSingleton._instance) {
            AutoCompleteSingleton._instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton._instance;
    };
    Object.defineProperty(AutoCompleteSingleton.prototype, "autoCompleteValues", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoCompleteValues;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param language
     */
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param {?} language
     * @return {?}
     */
    AutoCompleteSingleton.prototype.initAutoComplete = /**
     * Init autoComplete for language passed in param if is not already done.
     * @param {?} language
     * @return {?}
     */
    function (language) {
        if (this._autoCompleteValues[language.toString()]) {
            return;
        }
        this._autoCompleteValues[language.toString()] = [];
        // This event is fired when the user press Ctrl + Space, to show Intelissense (Autocomplete)
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (/**
             * @param {?} model
             * @return {?}
             */
            function (model) {
                // Get new autoComplete list for the current content
                AutoCompleteSingleton.getInstance()
                    .parseAutoCompleteValues(language, model.getValue());
                return AutoCompleteSingleton.getInstance().autoCompleteValues[language.toString()];
            }),
        });
    };
    /**
     * Parse the content passed in param for the language passed in param
     * @param language
     * @param content
     */
    /**
     * Parse the content passed in param for the language passed in param
     * @param {?} language
     * @param {?} content
     * @return {?}
     */
    AutoCompleteSingleton.prototype.parseAutoCompleteValues = /**
     * Parse the content passed in param for the language passed in param
     * @param {?} language
     * @param {?} content
     * @return {?}
     */
    function (language, content) {
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
    /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @private
     * @param {?} content
     * @return {?}
     */
    AutoCompleteSingleton.prototype._parseXmlAutoComplete = /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var tempList = [];
        /** @type {?} */
        var parser = new DOMParser();
        /** @type {?} */
        var tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
        var _loop_1 = function (i) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this_1._autoCompleteValues[IEditorLanguage.XML]
                .find((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) { return obj.label === tags[i].tagName; }))
                && !tempList.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) { return obj.label === tags[i].tagName; }))) {
                // Create autoComplete object
                /** @type {?} */
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
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    AutoCompleteSingleton.prototype._parseJsonAutoComplete = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /* tslint:disable-next-line */
        /** @type {?} */
        var regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        /** @type {?} */
        var tempList = [];
        /** @type {?} */
        var m;
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // Add Element only if it not already existing in autoComplete list and in tempList
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON]
                .find((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) { return obj.label === m[1]; }))
                && !tempList.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                function (obj) { return obj.label === m[1]; }))) {
                /** @type {?} */
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Configuration options for the editor.
 */
var /**
 * Configuration options for the editor.
 */
IEditorOptions = /** @class */ (function () {
    function IEditorOptions() {
    }
    return IEditorOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfMonacoEditor = /** @class */ (function () {
    function AjfMonacoEditor() {
        this.autoFormatOnLoad = true;
        this.monacoLibPath = 'vs/loader.js';
        this.valueChange = new EventEmitter();
        this.valueToCompareChange = new EventEmitter();
        this.init = new EventEmitter();
        this._value = '';
        this._valueToCompare = '';
    }
    Object.defineProperty(AjfMonacoEditor.prototype, "valueToCompare", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMonacoEditor.prototype, "value", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMonacoEditor.prototype, "editor", {
        get: /**
         * @return {?}
         */
        function () { return this._editor; },
        enumerable: true,
        configurable: true
    });
    /**
     * load Monaco lib
     */
    /**
     * load Monaco lib
     * @return {?}
     */
    AjfMonacoEditor.prototype.ngAfterViewInit = /**
     * load Monaco lib
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var onGotAmdLoader = (/**
         * @return {?}
         */
        function () {
            // Load monaco
            ((/** @type {?} */ (window))).require(['vs/editor/editor.main'], (/**
             * @return {?}
             */
            function () {
                _this._initMonaco();
            }));
        });
        // Load AMD loader if necessary
        if (!((/** @type {?} */ (window))).require) {
            /** @type {?} */
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
    /**
     * Upon destruction of the component we make sure to dispose both the editor and
     * the extra libs that we might've loaded
     * @return {?}
     */
    AjfMonacoEditor.prototype.ngOnDestroy = /**
     * Upon destruction of the component we make sure to dispose both the editor and
     * the extra libs that we might've loaded
     * @return {?}
     */
    function () {
        this.dispose();
    };
    /**
     * @param {?} _changes
     * @return {?}
     */
    AjfMonacoEditor.prototype.ngOnChanges = /**
     * @param {?} _changes
     * @return {?}
     */
    function (_changes) {
        if (this._editor) {
            this._editor.updateOptions(this._getOptions());
        }
    };
    /**
     * Destroy the monaco componenent
     */
    /**
     * Destroy the monaco componenent
     * @return {?}
     */
    AjfMonacoEditor.prototype.dispose = /**
     * Destroy the monaco componenent
     * @return {?}
     */
    function () {
        /** @type {?} */
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
    /**
     * Triggered when windows is resized
     * @param {?} _event
     * @return {?}
     */
    AjfMonacoEditor.prototype.onResize = /**
     * Triggered when windows is resized
     * @param {?} _event
     * @return {?}
     */
    function (_event) {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        /** @type {?} */
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
    /**
     * Init editor
     * Is called once monaco library is available
     * @private
     * @return {?}
     */
    AjfMonacoEditor.prototype._initMonaco = /**
     * Init editor
     * Is called once monaco library is available
     * @private
     * @return {?}
     */
    function () {
        this._initEditor();
        this.init.emit();
    };
    /**
     * @private
     * @return {?}
     */
    AjfMonacoEditor.prototype._initEditor = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var myDiv = this.editorContent.nativeElement;
        /** @type {?} */
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
        this._getOriginalModel().onDidChangeContent((/**
         * @param {?} _e
         * @return {?}
         */
        function (_e) {
            /** @type {?} */
            var newVal = _this._getOriginalModel().getValue();
            if (_this._value !== newVal) {
                _this._updateValue(newVal);
            }
        }));
        // Trigger on change event for diff editor
        if (this._getModifiedModel()) {
            this._getModifiedModel().onDidChangeContent((/**
             * @param {?} _e
             * @return {?}
             */
            function (_e) {
                /** @type {?} */
                var newVal = _this._getModifiedModel().getValue();
                if (_this._valueToCompare !== newVal) {
                    _this._updateValueToCompare(newVal);
                }
            }));
        }
    };
    /**
     * Create a simple editor text
     * @param div
     * @param options
     */
    /**
     * Create a simple editor text
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?}
     */
    AjfMonacoEditor.prototype._initSimpleEditor = /**
     * Create a simple editor text
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?}
     */
    function (div, options) {
        return monaco.editor.create(div, options);
    };
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     */
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?}
     */
    AjfMonacoEditor.prototype._initDiffEditor = /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?}
     */
    function (div, options) {
        /** @type {?} */
        var originalModel = monaco.editor.createModel(this._value, this.language);
        /** @type {?} */
        var modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
        /** @type {?} */
        var diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });
        return diffEditor;
    };
    /**
     * @private
     * @return {?}
     */
    AjfMonacoEditor.prototype._getOptions = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
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
        Object.keys(options)
            .forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (((/** @type {?} */ (options)))[key] === undefined) {
                delete ((/** @type {?} */ (options)))[key]; // Remove all undefined properties
            }
        }));
        return options;
    };
    /**
     * UpdateValue
     *
     * @param value
     */
    /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    AjfMonacoEditor.prototype._updateValue = /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this._value = value;
        this.valueChange.emit(value);
    };
    /**
     * UpdateValue
     *
     * @param value
     */
    /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    AjfMonacoEditor.prototype._updateValueToCompare = /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    };
    /**
     * @private
     * @return {?}
     */
    AjfMonacoEditor.prototype._getOriginalModel = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editor) {
            /** @type {?} */
            var model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    };
    /**
     * @private
     * @return {?}
     */
    AjfMonacoEditor.prototype._getModifiedModel = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editor) {
            /** @type {?} */
            var model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    };
    AjfMonacoEditor.decorators = [
        { type: Component, args: [{encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'ajf-monaco-editor',
                    styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}"],
                    template: "<div #editor class=\"ajf-monaco-editor\"></div>",
                    host: {
                        '(window:resize)': 'onResize($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    AjfMonacoEditor.ctorParameters = function () { return []; };
    AjfMonacoEditor.propDecorators = {
        experimentalScreenReader: [{ type: Input }],
        ariaLabel: [{ type: Input }],
        rulers: [{ type: Input }],
        wordSeparators: [{ type: Input }],
        selectionClipboard: [{ type: Input }],
        lineNumbers: [{ type: Input }],
        selectOnLineNumbers: [{ type: Input }],
        lineNumbersMinChars: [{ type: Input }],
        glyphMargin: [{ type: Input }],
        lineDecorationsWidth: [{ type: Input }],
        revealHorizontalRightPadding: [{ type: Input }],
        roundedSelection: [{ type: Input }],
        theme: [{ type: Input }],
        readOnly: [{ type: Input }],
        scrollbar: [{ type: Input }],
        overviewRulerLanes: [{ type: Input }],
        cursorBlinking: [{ type: Input }],
        mouseWheelZoom: [{ type: Input }],
        cursorStyle: [{ type: Input }],
        fontLigatures: [{ type: Input }],
        disableTranslate3d: [{ type: Input }],
        hideCursorInOverviewRuler: [{ type: Input }],
        scrollBeyondLastLine: [{ type: Input }],
        automaticLayout: [{ type: Input }],
        wrappingColumn: [{ type: Input }],
        wordWrap: [{ type: Input }],
        wrappingIndent: [{ type: Input }],
        wordWrapBreakBeforeCharacters: [{ type: Input }],
        wordWrapBreakAfterCharacters: [{ type: Input }],
        wordWrapBreakObtrusiveCharacters: [{ type: Input }],
        stopRenderingLineAfter: [{ type: Input }],
        hover: [{ type: Input }],
        contextmenu: [{ type: Input }],
        mouseWheelScrollSensitivity: [{ type: Input }],
        quickSuggestions: [{ type: Input }],
        quickSuggestionsDelay: [{ type: Input }],
        parameterHints: [{ type: Input }],
        iconsInSuggestions: [{ type: Input }],
        autoClosingBrackets: [{ type: Input }],
        formatOnType: [{ type: Input }],
        suggestOnTriggerCharacters: [{ type: Input }],
        acceptSuggestionOnEnter: [{ type: Input }],
        snippetSuggestions: [{ type: Input }],
        tabCompletion: [{ type: Input }],
        wordBasedSuggestions: [{ type: Input }],
        selectionHighlight: [{ type: Input }],
        codeLens: [{ type: Input }],
        folding: [{ type: Input }],
        renderWhitespace: [{ type: Input }],
        renderControlCharacters: [{ type: Input }],
        renderIndentGuides: [{ type: Input }],
        renderLineHighlight: [{ type: Input }],
        useTabStops: [{ type: Input }],
        fontFamily: [{ type: Input }],
        fontWeight: [{ type: Input }],
        fontSize: [{ type: Input }],
        lineHeight: [{ type: Input }],
        language: [{ type: Input }],
        disableAutocomplete: [{ type: Input }],
        autoFormatOnLoad: [{ type: Input }],
        monacoLibPath: [{ type: Input }],
        valueToCompare: [{ type: Input }],
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        valueToCompareChange: [{ type: Output }],
        init: [{ type: Output }],
        editorContent: [{ type: ViewChild, args: ['editor', { static: true },] }]
    };
    return AjfMonacoEditor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfMonacoEditorModule = /** @class */ (function () {
    function AjfMonacoEditorModule() {
    }
    AjfMonacoEditorModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfMonacoEditor,
                    ],
                    exports: [
                        AjfMonacoEditor,
                    ]
                },] },
    ];
    return AjfMonacoEditorModule;
}());

export { AjfMonacoEditor, AjfMonacoEditorModule };
//# sourceMappingURL=monaco-editor.es5.js.map
