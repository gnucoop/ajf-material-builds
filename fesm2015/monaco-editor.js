import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, ViewChild, NgModule } from '@angular/core';

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
class AutoCompleteItem {
    constructor() { }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setKind(kind) {
        this.kind = kind;
        return this;
    }
    setDocumentation(documentation) {
        this.documentation = documentation;
        return this;
    }
    setInsertText(insertText) {
        this.insertText = insertText;
        return this;
    }
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
 * List of dev language avalaible in Monaco Editor
 */
class IEditorLanguage {
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
class AutoCompleteSingleton {
    constructor() {
        this._autoCompleteValues = {};
    }
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     */
    static getInstance() {
        if (!AutoCompleteSingleton._instance) {
            AutoCompleteSingleton._instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton._instance;
    }
    get autoCompleteValues() {
        return this._autoCompleteValues;
    }
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param language
     */
    initAutoComplete(language) {
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
    }
    /**
     * Parse the content passed in param for the language passed in param
     * @param language
     * @param content
     */
    parseAutoCompleteValues(language, content) {
        switch (language) {
            case IEditorLanguage.XML:
                return this._parseXmlAutoComplete(content);
            case IEditorLanguage.JSON:
                return this._parseJsonAutoComplete(content);
            default:
                return [];
        }
    }
    /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @param content
     */
    _parseXmlAutoComplete(content) {
        let tempList = [];
        let parser = new DOMParser();
        let tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
        for (let i = 0; i < tags.length; i++) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this._autoCompleteValues[IEditorLanguage.XML].find(obj => obj.label === tags[i].tagName) &&
                !tempList.find(obj => obj.label === tags[i].tagName)) {
                // Create autoComplete object
                let obj = new AutoCompleteItem()
                    .setLabel(tags[i].tagName)
                    .setKind(monaco.languages.CompletionItemKind.Function)
                    .setDocumentation('')
                    .setInsertText(`<${tags[i].tagName}><${tags[i].tagName}>`);
                tempList.push(obj);
            }
        }
        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.XML.toString()] =
                this._autoCompleteValues[IEditorLanguage.XML.toString()].concat(tempList);
        }
        return tempList;
    }
    _parseJsonAutoComplete(content) {
        /* tslint:disable-next-line */
        const regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        let tempList = [];
        let m;
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // Add Element only if it not already existing in autoComplete list and in tempList
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON].find(obj => obj.label === m[1]) &&
                !tempList.find(obj => obj.label === m[1])) {
                let obj = new AutoCompleteItem()
                    .setLabel(m[1])
                    .setKind(monaco.languages.CompletionItemKind.Value)
                    .setDocumentation('')
                    .setInsertText(`'${m[1]}':`);
                tempList.push(obj);
            }
        }
        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.JSON.toString()] =
                this._autoCompleteValues[IEditorLanguage.JSON.toString()].concat(tempList);
        }
        return tempList;
    }
}
AutoCompleteSingleton._instance = null;

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
class IEditorOptions {
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
 * List of theme available for Monaco Editor
 */
class IEditorTheme {
}
IEditorTheme.VISUAL_STUDIO = 'vs';
IEditorTheme.VISUAL_STUDIO_DARK = 'vs-dark';
IEditorTheme.HIGH_CONTRAST_DARK = 'hc-black';

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
class AjfMonacoEditor {
    constructor() {
        this.autoFormatOnLoad = true;
        this.monacoLibPath = 'vs/loader.js';
        this.valueChange = new EventEmitter();
        this.valueToCompareChange = new EventEmitter();
        this.init = new EventEmitter();
        this._value = '';
        this._valueToCompare = '';
    }
    set valueToCompare(v) {
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
    }
    set value(v) {
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
    }
    get editor() {
        return this._editor;
    }
    /**
     * load Monaco lib
     */
    ngAfterViewInit() {
        let onGotAmdLoader = () => {
            // Load monaco
            window.require(['vs/editor/editor.main'], () => {
                this._initMonaco();
            });
        };
        // Load AMD loader if necessary
        if (!window.require) {
            let loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = this.monacoLibPath;
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        }
        else {
            onGotAmdLoader();
        }
    }
    /**
     * Upon destruction of the component we make sure to dispose both the editor and
     * the extra libs that we might've loaded
     */
    ngOnDestroy() {
        this.dispose();
    }
    ngOnChanges(_changes) {
        if (this._editor) {
            this._editor.updateOptions(this._getOptions());
        }
    }
    /**
     * Destroy the monaco componenent
     */
    dispose() {
        let myDiv = this.editorContent.nativeElement;
        if (this._editor) {
            this._editor.dispose();
            while (myDiv.hasChildNodes()) {
                if (myDiv.firstChild != null) {
                    myDiv.removeChild(myDiv.firstChild);
                }
            }
            this._editor = null;
        }
    }
    /**
     * Triggered when windows is resized
     * @param event
     */
    onResize(_event) {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        let myDiv = this.editorContent.nativeElement;
        if (myDiv == null || myDiv.parentElement == null) {
            return;
        }
        myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);
    }
    /**
     * Init editor
     * Is called once monaco library is available
     */
    _initMonaco() {
        this._initEditor();
        this.init.emit();
    }
    _initEditor() {
        let myDiv = this.editorContent.nativeElement;
        let options = this._getOptions();
        this.dispose();
        if (!this._valueToCompare) {
            this._editor = this._initSimpleEditor(myDiv, options);
        }
        else {
            this._editor = this._initDiffEditor(myDiv, options);
        }
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        if (myDiv != null && myDiv.parentElement != null) {
            myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);
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
        this._getOriginalModel().onDidChangeContent((_e) => {
            let newVal = this._getOriginalModel().getValue();
            if (this._value !== newVal) {
                this._updateValue(newVal);
            }
        });
        // Trigger on change event for diff editor
        if (this._getModifiedModel()) {
            this._getModifiedModel().onDidChangeContent((_e) => {
                let newVal = this._getModifiedModel().getValue();
                if (this._valueToCompare !== newVal) {
                    this._updateValueToCompare(newVal);
                }
            });
        }
    }
    /**
     * Create a simple editor text
     * @param div
     * @param options
     */
    _initSimpleEditor(div, options) {
        return monaco.editor.create(div, options);
    }
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     */
    _initDiffEditor(div, options) {
        let originalModel = monaco.editor.createModel(this._value, this.language);
        let modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
        let diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });
        return diffEditor;
    }
    _getOptions() {
        let options = new IEditorOptions();
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
        Object.keys(options).forEach((key) => {
            if (options[key] === undefined) {
                delete options[key]; // Remove all undefined properties
            }
        });
        return options;
    }
    /**
     * UpdateValue
     *
     * @param value
     */
    _updateValue(value) {
        this.value = value;
        this._value = value;
        this.valueChange.emit(value);
    }
    /**
     * UpdateValue
     *
     * @param value
     */
    _updateValueToCompare(value) {
        this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    }
    _getOriginalModel() {
        if (this._editor) {
            let model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    }
    _getModifiedModel() {
        if (this._editor) {
            let model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    }
}
AjfMonacoEditor.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'ajf-monaco-editor',
                template: "<div #editor class=\"ajf-monaco-editor\"></div>\n",
                host: { '(window:resize)': 'onResize($event)' },
                styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"]
            },] }
];
AjfMonacoEditor.ctorParameters = () => [];
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
class AjfMonacoEditorModule {
}
AjfMonacoEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfMonacoEditor,
                ],
                exports: [
                    AjfMonacoEditor,
                ]
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

export { AjfMonacoEditor, AjfMonacoEditorModule };
//# sourceMappingURL=monaco-editor.js.map
