import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, ViewChild, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/auto-complete-item-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * Representation of AutoCompleteItem
 */
class AutoCompleteItem {
    constructor() {
    }
    /**
     * @param {?} label
     * @return {?}
     */
    setLabel(label) {
        this.label = label;
        return this;
    }
    /**
     * @param {?} kind
     * @return {?}
     */
    setKind(kind) {
        this.kind = kind;
        return this;
    }
    /**
     * @param {?} documentation
     * @return {?}
     */
    setDocumentation(documentation) {
        this.documentation = documentation;
        return this;
    }
    /**
     * @param {?} insertText
     * @return {?}
     */
    setInsertText(insertText) {
        this.insertText = insertText;
        return this;
    }
}
if (false) {
    /** @type {?} */
    AutoCompleteItem.prototype.label;
    /** @type {?} */
    AutoCompleteItem.prototype.kind;
    /** @type {?} */
    AutoCompleteItem.prototype.documentation;
    /** @type {?} */
    AutoCompleteItem.prototype.insertText;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-language-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
if (false) {
    /** @type {?} */
    IEditorLanguage.BAT;
    /** @type {?} */
    IEditorLanguage.C;
    /** @type {?} */
    IEditorLanguage.CPP;
    /** @type {?} */
    IEditorLanguage.CSHARP;
    /** @type {?} */
    IEditorLanguage.CSS;
    /** @type {?} */
    IEditorLanguage.DOCKERFILE;
    /** @type {?} */
    IEditorLanguage.FSHARP;
    /** @type {?} */
    IEditorLanguage.GO;
    /** @type {?} */
    IEditorLanguage.HANDLEBARS;
    /** @type {?} */
    IEditorLanguage.HTML;
    /** @type {?} */
    IEditorLanguage.INI;
    /** @type {?} */
    IEditorLanguage.JADE;
    /** @type {?} */
    IEditorLanguage.JAVASCRIPT;
    /** @type {?} */
    IEditorLanguage.JSON;
    /** @type {?} */
    IEditorLanguage.LESS;
    /** @type {?} */
    IEditorLanguage.LUA;
    /** @type {?} */
    IEditorLanguage.MARKDOWN;
    /** @type {?} */
    IEditorLanguage.OBJECTIVEC;
    /** @type {?} */
    IEditorLanguage.PHP;
    /** @type {?} */
    IEditorLanguage.PLAINTEXT;
    /** @type {?} */
    IEditorLanguage.POSTIATS;
    /** @type {?} */
    IEditorLanguage.POWERSHELL;
    /** @type {?} */
    IEditorLanguage.PYTHON;
    /** @type {?} */
    IEditorLanguage.R;
    /** @type {?} */
    IEditorLanguage.RAZOR;
    /** @type {?} */
    IEditorLanguage.RUBY;
    /** @type {?} */
    IEditorLanguage.SCSS;
    /** @type {?} */
    IEditorLanguage.SQL;
    /** @type {?} */
    IEditorLanguage.SWIFT;
    /** @type {?} */
    IEditorLanguage.TYPESCRIPT;
    /** @type {?} */
    IEditorLanguage.VB;
    /** @type {?} */
    IEditorLanguage.XML;
    /** @type {?} */
    IEditorLanguage.YAML;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/autocomplete-singleton-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Manage the autoCompletion for all instances of the editors
 */
class AutoCompleteSingleton {
    /**
     * @private
     */
    constructor() {
        this._autoCompleteValues = {};
    }
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     * @return {?}
     */
    static getInstance() {
        if (!AutoCompleteSingleton._instance) {
            AutoCompleteSingleton._instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton._instance;
    }
    /**
     * @return {?}
     */
    get autoCompleteValues() {
        return this._autoCompleteValues;
    }
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param {?} language
     * @return {?}
     */
    initAutoComplete(language) {
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
    }
    /**
     * Parse the content passed in param for the language passed in param
     * @param {?} language
     * @param {?} content
     * @return {?}
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
     * @private
     * @param {?} content
     * @return {?}
     */
    _parseXmlAutoComplete(content) {
        /** @type {?} */
        let tempList = [];
        /** @type {?} */
        let parser = new DOMParser();
        /** @type {?} */
        let tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
        for (let i = 0; i < tags.length; i++) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this._autoCompleteValues[IEditorLanguage.XML]
                .find((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj.label === tags[i].tagName))
                && !tempList.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                obj => obj.label === tags[i].tagName))) {
                // Create autoComplete object
                /** @type {?} */
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
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    _parseJsonAutoComplete(content) {
        /* tslint:disable-next-line */
        /** @type {?} */
        const regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        /** @type {?} */
        let tempList = [];
        /** @type {?} */
        let m;
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
            obj => obj.label === m[1]))
                && !tempList.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                obj => obj.label === m[1]))) {
                /** @type {?} */
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoCompleteSingleton._instance;
    /**
     * @type {?}
     * @private
     */
    AutoCompleteSingleton.prototype._autoCompleteValues;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-options-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * Configuration options for the editor.
 */
class IEditorOptions {
}
if (false) {
    /**
     * Enable experimental screen reader support.
     * Defaults to `true`.
     * @type {?}
     */
    IEditorOptions.prototype.experimentalScreenReader;
    /**
     * The aria label for the editor's textarea (when it is focused).
     * @type {?}
     */
    IEditorOptions.prototype.ariaLabel;
    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     * @type {?}
     */
    IEditorOptions.prototype.rulers;
    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to ``~!\@#$%^&*()-=+[{]}\\|;:\'',.`<``>`/?
     * @type {?}
     */
    IEditorOptions.prototype.wordSeparators;
    /**
     * Enable Linux primary clipboard.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.selectionClipboard;
    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number
     * and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally
     * (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.lineNumbers;
    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.selectOnLineNumbers;
    /**
     * Control the width of line numbers, by reserving horizontal space
     * for rendering at least an amount of digits.
     * Defaults to 5.
     * @type {?}
     */
    IEditorOptions.prototype.lineNumbersMinChars;
    /**
     * Enable the rendering of the glyph margin.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.glyphMargin;
    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * Defaults to 10.
     * @type {?}
     */
    IEditorOptions.prototype.lineDecorationsWidth;
    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor,
     * turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before
     * hitting the edge of the viewport.
     * Defaults to 30 (px).
     * @type {?}
     */
    IEditorOptions.prototype.revealHorizontalRightPadding;
    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.roundedSelection;
    /**
     * Theme to be used for rendering. Consists of two parts, the UI theme and the syntax theme,
     * separated by a space.
     * The current available UI themes are: 'vs' (default), 'vs-dark', 'hc-black'
     * The syntax themes are contributed. The default is 'default-theme'
     * @type {?}
     */
    IEditorOptions.prototype.theme;
    /**
     * Should the editor be read only.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.readOnly;
    /**
     * Control the behavior and rendering of the scrollbars.
     * @type {?}
     */
    IEditorOptions.prototype.scrollbar;
    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     * @type {?}
     */
    IEditorOptions.prototype.overviewRulerLanes;
    /**
     * Control the cursor animation style, possible values are
     * 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     * @type {?}
     */
    IEditorOptions.prototype.cursorBlinking;
    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.mouseWheelZoom;
    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     * @type {?}
     */
    IEditorOptions.prototype.cursorStyle;
    /**
     * Enable font ligatures.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.fontLigatures;
    /**
     * Disable the use of `translate3d`.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.disableTranslate3d;
    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.hideCursorInOverviewRuler;
    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.scrollBeyondLastLine;
    /**
     * Enable that the editor will install an interval to check
     * if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.automaticLayout;
    /**
     * Control the wrapping strategy of the editor.
     * Using -1 means no wrapping whatsoever.
     * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
     * Using a positive number means wrapping after a fixed number of characters.
     * Defaults to 300.
     * @type {?}
     */
    IEditorOptions.prototype.wrappingColumn;
    /**
     * Control the alternate style of viewport wrapping.
     * When set to true viewport wrapping is used only when the window width
     * is less than the number of columns specified in the wrappingColumn property.
     * Has no effect if wrappingColumn is not a positive number.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrap;
    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'none'.
     * @type {?}
     */
    IEditorOptions.prototype.wrappingIndent;
    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrapBreakBeforeCharacters;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrapBreakAfterCharacters;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters
     * only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrapBreakObtrusiveCharacters;
    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is `>`= 0.
     * Use -1 to never stop rendering
     * @type {?}
     */
    IEditorOptions.prototype.stopRenderingLineAfter;
    /**
     * Enable hover.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.hover;
    /**
     * Enable custom contextmenu.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.contextmenu;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     * @type {?}
     */
    IEditorOptions.prototype.mouseWheelScrollSensitivity;
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.quickSuggestions;
    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     * @type {?}
     */
    IEditorOptions.prototype.quickSuggestionsDelay;
    /**
     * Enables parameter hints
     * @type {?}
     */
    IEditorOptions.prototype.parameterHints;
    /**
     * Render icons in suggestions box.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.iconsInSuggestions;
    /**
     * Enable auto closing brackets.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.autoClosingBrackets;
    /**
     * Enable format on type.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.formatOnType;
    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.suggestOnTriggerCharacters;
    /**
     * Accept suggestions on ENTER.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.acceptSuggestionOnEnter;
    /**
     * Enable snippet suggestions. Default to 'true'.
     * @type {?}
     */
    IEditorOptions.prototype.snippetSuggestions;
    /**
     * Enable tab completion. Defaults to 'false'
     * @type {?}
     */
    IEditorOptions.prototype.tabCompletion;
    /**
     * Enable word based suggestions. Defaults to 'true'
     * @type {?}
     */
    IEditorOptions.prototype.wordBasedSuggestions;
    /**
     * Enable selection highlight.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.selectionHighlight;
    /**
     * Show code lens
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.codeLens;
    /**
     * Enable code folding
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.folding;
    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     * @type {?}
     */
    IEditorOptions.prototype.renderWhitespace;
    /**
     * Enable rendering of control characters.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.renderControlCharacters;
    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.renderIndentGuides;
    /**
     * Enable rendering of current line highlight.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.renderLineHighlight;
    /**
     * Inserting and deleting whitespace follows tab stops.
     * @type {?}
     */
    IEditorOptions.prototype.useTabStops;
    /**
     * The font family
     * @type {?}
     */
    IEditorOptions.prototype.fontFamily;
    /**
     * The font weight
     * @type {?}
     */
    IEditorOptions.prototype.fontWeight;
    /**
     * The font size
     * @type {?}
     */
    IEditorOptions.prototype.fontSize;
    /**
     * The line height
     * @type {?}
     */
    IEditorOptions.prototype.lineHeight;
    /**
     * Content to show
     * @type {?}
     */
    IEditorOptions.prototype.value;
    /**
     * Language of content to show
     * @type {?}
     */
    IEditorOptions.prototype.language;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-theme.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * List of theme available for Monaco Editor
 */
class IEditorTheme {
}
IEditorTheme.VISUAL_STUDIO = 'vs';
IEditorTheme.VISUAL_STUDIO_DARK = 'vs-dark';
IEditorTheme.HIGH_CONTRAST_DARK = 'hc-black';
if (false) {
    /** @type {?} */
    IEditorTheme.VISUAL_STUDIO;
    /** @type {?} */
    IEditorTheme.VISUAL_STUDIO_DARK;
    /** @type {?} */
    IEditorTheme.HIGH_CONTRAST_DARK;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/monaco-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    /**
     * @param {?} v
     * @return {?}
     */
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
    /**
     * @param {?} v
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    get editor() { return this._editor; }
    /**
     * load Monaco lib
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        let onGotAmdLoader = (/**
         * @return {?}
         */
        () => {
            // Load monaco
            ((/** @type {?} */ (window))).require(['vs/editor/editor.main'], (/**
             * @return {?}
             */
            () => {
                this._initMonaco();
            }));
        });
        // Load AMD loader if necessary
        if (!((/** @type {?} */ (window))).require) {
            /** @type {?} */
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
     * @return {?}
     */
    ngOnDestroy() {
        this.dispose();
    }
    /**
     * @param {?} _changes
     * @return {?}
     */
    ngOnChanges(_changes) {
        if (this._editor) {
            this._editor.updateOptions(this._getOptions());
        }
    }
    /**
     * Destroy the monaco componenent
     * @return {?}
     */
    dispose() {
        /** @type {?} */
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
     * @param {?} _event
     * @return {?}
     */
    onResize(_event) {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        /** @type {?} */
        let myDiv = this.editorContent.nativeElement;
        if (myDiv == null || myDiv.parentElement == null) {
            return;
        }
        myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);
    }
    /**
     * Init editor
     * Is called once monaco library is available
     * @private
     * @return {?}
     */
    _initMonaco() {
        this._initEditor();
        this.init.emit();
    }
    /**
     * @private
     * @return {?}
     */
    _initEditor() {
        /** @type {?} */
        let myDiv = this.editorContent.nativeElement;
        /** @type {?} */
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
        this._getOriginalModel().onDidChangeContent((/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => {
            /** @type {?} */
            let newVal = this._getOriginalModel().getValue();
            if (this._value !== newVal) {
                this._updateValue(newVal);
            }
        }));
        // Trigger on change event for diff editor
        if (this._getModifiedModel()) {
            this._getModifiedModel().onDidChangeContent((/**
             * @param {?} _e
             * @return {?}
             */
            (_e) => {
                /** @type {?} */
                let newVal = this._getModifiedModel().getValue();
                if (this._valueToCompare !== newVal) {
                    this._updateValueToCompare(newVal);
                }
            }));
        }
    }
    /**
     * Create a simple editor text
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?}
     */
    _initSimpleEditor(div, options) {
        return monaco.editor.create(div, options);
    }
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?}
     */
    _initDiffEditor(div, options) {
        /** @type {?} */
        let originalModel = monaco.editor.createModel(this._value, this.language);
        /** @type {?} */
        let modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
        /** @type {?} */
        let diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });
        return diffEditor;
    }
    /**
     * @private
     * @return {?}
     */
    _getOptions() {
        /** @type {?} */
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
        Object.keys(options)
            .forEach((/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            if (((/** @type {?} */ (options)))[key] === undefined) {
                delete ((/** @type {?} */ (options)))[key]; // Remove all undefined properties
            }
        }));
        return options;
    }
    /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    _updateValue(value) {
        this.value = value;
        this._value = value;
        this.valueChange.emit(value);
    }
    /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    _updateValueToCompare(value) {
        this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    }
    /**
     * @private
     * @return {?}
     */
    _getOriginalModel() {
        if (this._editor) {
            /** @type {?} */
            let model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _getModifiedModel() {
        if (this._editor) {
            /** @type {?} */
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
                host: {
                    '(window:resize)': 'onResize($event)'
                },
                styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"]
            }] }
];
/** @nocollapse */
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
if (false) {
    /** @type {?} */
    AjfMonacoEditor.prototype.experimentalScreenReader;
    /** @type {?} */
    AjfMonacoEditor.prototype.ariaLabel;
    /** @type {?} */
    AjfMonacoEditor.prototype.rulers;
    /** @type {?} */
    AjfMonacoEditor.prototype.wordSeparators;
    /** @type {?} */
    AjfMonacoEditor.prototype.selectionClipboard;
    /** @type {?} */
    AjfMonacoEditor.prototype.lineNumbers;
    /** @type {?} */
    AjfMonacoEditor.prototype.selectOnLineNumbers;
    /** @type {?} */
    AjfMonacoEditor.prototype.lineNumbersMinChars;
    /** @type {?} */
    AjfMonacoEditor.prototype.glyphMargin;
    /** @type {?} */
    AjfMonacoEditor.prototype.lineDecorationsWidth;
    /** @type {?} */
    AjfMonacoEditor.prototype.revealHorizontalRightPadding;
    /** @type {?} */
    AjfMonacoEditor.prototype.roundedSelection;
    /** @type {?} */
    AjfMonacoEditor.prototype.theme;
    /** @type {?} */
    AjfMonacoEditor.prototype.readOnly;
    /** @type {?} */
    AjfMonacoEditor.prototype.scrollbar;
    /** @type {?} */
    AjfMonacoEditor.prototype.overviewRulerLanes;
    /** @type {?} */
    AjfMonacoEditor.prototype.cursorBlinking;
    /** @type {?} */
    AjfMonacoEditor.prototype.mouseWheelZoom;
    /** @type {?} */
    AjfMonacoEditor.prototype.cursorStyle;
    /** @type {?} */
    AjfMonacoEditor.prototype.fontLigatures;
    /** @type {?} */
    AjfMonacoEditor.prototype.disableTranslate3d;
    /** @type {?} */
    AjfMonacoEditor.prototype.hideCursorInOverviewRuler;
    /** @type {?} */
    AjfMonacoEditor.prototype.scrollBeyondLastLine;
    /** @type {?} */
    AjfMonacoEditor.prototype.automaticLayout;
    /** @type {?} */
    AjfMonacoEditor.prototype.wrappingColumn;
    /** @type {?} */
    AjfMonacoEditor.prototype.wordWrap;
    /** @type {?} */
    AjfMonacoEditor.prototype.wrappingIndent;
    /** @type {?} */
    AjfMonacoEditor.prototype.wordWrapBreakBeforeCharacters;
    /** @type {?} */
    AjfMonacoEditor.prototype.wordWrapBreakAfterCharacters;
    /** @type {?} */
    AjfMonacoEditor.prototype.wordWrapBreakObtrusiveCharacters;
    /** @type {?} */
    AjfMonacoEditor.prototype.stopRenderingLineAfter;
    /** @type {?} */
    AjfMonacoEditor.prototype.hover;
    /** @type {?} */
    AjfMonacoEditor.prototype.contextmenu;
    /** @type {?} */
    AjfMonacoEditor.prototype.mouseWheelScrollSensitivity;
    /** @type {?} */
    AjfMonacoEditor.prototype.quickSuggestions;
    /** @type {?} */
    AjfMonacoEditor.prototype.quickSuggestionsDelay;
    /** @type {?} */
    AjfMonacoEditor.prototype.parameterHints;
    /** @type {?} */
    AjfMonacoEditor.prototype.iconsInSuggestions;
    /** @type {?} */
    AjfMonacoEditor.prototype.autoClosingBrackets;
    /** @type {?} */
    AjfMonacoEditor.prototype.formatOnType;
    /** @type {?} */
    AjfMonacoEditor.prototype.suggestOnTriggerCharacters;
    /** @type {?} */
    AjfMonacoEditor.prototype.acceptSuggestionOnEnter;
    /** @type {?} */
    AjfMonacoEditor.prototype.snippetSuggestions;
    /** @type {?} */
    AjfMonacoEditor.prototype.tabCompletion;
    /** @type {?} */
    AjfMonacoEditor.prototype.wordBasedSuggestions;
    /** @type {?} */
    AjfMonacoEditor.prototype.selectionHighlight;
    /** @type {?} */
    AjfMonacoEditor.prototype.codeLens;
    /** @type {?} */
    AjfMonacoEditor.prototype.folding;
    /** @type {?} */
    AjfMonacoEditor.prototype.renderWhitespace;
    /** @type {?} */
    AjfMonacoEditor.prototype.renderControlCharacters;
    /** @type {?} */
    AjfMonacoEditor.prototype.renderIndentGuides;
    /** @type {?} */
    AjfMonacoEditor.prototype.renderLineHighlight;
    /** @type {?} */
    AjfMonacoEditor.prototype.useTabStops;
    /** @type {?} */
    AjfMonacoEditor.prototype.fontFamily;
    /** @type {?} */
    AjfMonacoEditor.prototype.fontWeight;
    /** @type {?} */
    AjfMonacoEditor.prototype.fontSize;
    /** @type {?} */
    AjfMonacoEditor.prototype.lineHeight;
    /** @type {?} */
    AjfMonacoEditor.prototype.language;
    /** @type {?} */
    AjfMonacoEditor.prototype.disableAutocomplete;
    /** @type {?} */
    AjfMonacoEditor.prototype.autoFormatOnLoad;
    /** @type {?} */
    AjfMonacoEditor.prototype.monacoLibPath;
    /** @type {?} */
    AjfMonacoEditor.prototype.valueChange;
    /** @type {?} */
    AjfMonacoEditor.prototype.valueToCompareChange;
    /** @type {?} */
    AjfMonacoEditor.prototype.init;
    /** @type {?} */
    AjfMonacoEditor.prototype.editorContent;
    /**
     * @type {?}
     * @private
     */
    AjfMonacoEditor.prototype._editor;
    /**
     * @type {?}
     * @private
     */
    AjfMonacoEditor.prototype._value;
    /**
     * @type {?}
     * @private
     */
    AjfMonacoEditor.prototype._valueToCompare;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/monaco-editor-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfMonacoEditor, AjfMonacoEditorModule };
//# sourceMappingURL=monaco-editor.js.map
