/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/monaco-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AutoCompleteSingleton } from './autocomplete-singleton-model';
import { IEditorLanguage } from './editor-language-model';
import { IEditorOptions } from './editor-options-model';
import { IEditorTheme } from './editor-theme';
export class AjfMonacoEditor {
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
    get editor() {
        return this._editor;
    }
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
        Object.keys(options).forEach((/**
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
                host: { '(window:resize)': 'onResize($event)' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFhNUMsTUFBTSxPQUFPLGVBQWU7SUE0SDFCO1FBNURTLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixrQkFBYSxHQUFHLGNBQWMsQ0FBQztRQTZDOUIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFTNUIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLG9CQUFlLEdBQUcsRUFBRSxDQUFDO0lBRWQsQ0FBQzs7Ozs7SUF6RGhCLElBQ0ksY0FBYyxDQUFDLENBQVM7UUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztZQUV6QixJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFB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REFBK0M7O0lBQy9DLDJDQUFvQzs7SUFDcEMsZ0NBQThCOztJQUM5QixtQ0FBNEI7O0lBQzVCLG9DQUE2Qzs7SUFDN0MsNkNBQXFDOztJQUNyQyx5Q0FBaUM7O0lBQ2pDLHlDQUFrQzs7SUFDbEMsc0NBQThCOztJQUM5Qix3Q0FBaUM7O0lBQ2pDLDZDQUFzQzs7SUFDdEMsb0RBQTZDOztJQUM3QywrQ0FBd0M7O0lBQ3hDLDBDQUFtQzs7SUFDbkMseUNBQWlDOztJQUNqQyxtQ0FBNEI7O0lBQzVCLHlDQUFpQzs7SUFDakMsd0RBQWdEOztJQUNoRCx1REFBK0M7O0lBQy9DLDJEQUFtRDs7SUFDbkQsaURBQXlDOztJQUN6QyxnQ0FBeUI7O0lBQ3pCLHNDQUErQjs7SUFDL0Isc0RBQThDOztJQUM5QywyQ0FBb0M7O0lBQ3BDLGdEQUF3Qzs7SUFDeEMseUNBQWtDOztJQUNsQyw2Q0FBc0M7O0lBQ3RDLDhDQUF1Qzs7SUFDdkMsdUNBQWdDOztJQUNoQyxxREFBOEM7O0lBQzlDLGtEQUEyQzs7SUFDM0MsNkNBQTZEOztJQUM3RCx3Q0FBaUM7O0lBQ2pDLCtDQUF3Qzs7SUFDeEMsNkNBQXNDOztJQUN0QyxtQ0FBNEI7O0lBQzVCLGtDQUEyQjs7SUFDM0IsMkNBQW9EOztJQUNwRCxrREFBMkM7O0lBQzNDLDZDQUFzQzs7SUFDdEMsOENBQXVDOztJQUN2QyxzQ0FBK0I7O0lBQy9CLHFDQUE2Qjs7SUFDN0IscUNBRTRCOztJQUM1QixtQ0FBMkI7O0lBQzNCLHFDQUE2Qjs7SUFFN0IsbUNBQW1DOztJQUVuQyw4Q0FBc0M7O0lBQ3RDLDJDQUFpQzs7SUFDakMsd0NBQXdDOztJQTZDeEMsc0NBQTJDOztJQUMzQywrQ0FBb0Q7O0lBQ3BELCtCQUFvQzs7SUFFcEMsd0NBQStEOzs7OztJQUUvRCxrQ0FBcUI7Ozs7O0lBS3JCLGlDQUFvQjs7Ozs7SUFDcEIsMENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZVNpbmdsZXRvbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtc2luZ2xldG9uLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JPcHRpb25zfSBmcm9tICcuL2VkaXRvci1vcHRpb25zLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvclNjcm9sbGJhck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zJztcbmltcG9ydCB7SUVkaXRvclRoZW1lfSBmcm9tICcuL2VkaXRvci10aGVtZSc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBhbnk7XG5cblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2FqZi1tb25hY28tZWRpdG9yJyxcbiAgc3R5bGVVcmxzOiBbJ21vbmFjby1lZGl0b3IuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnbW9uYWNvLWVkaXRvci5odG1sJyxcbiAgaG9zdDogeycod2luZG93OnJlc2l6ZSknOiAnb25SZXNpemUoJGV2ZW50KSd9XG59KVxuZXhwb3J0IGNsYXNzIEFqZk1vbmFjb0VkaXRvciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBydWxlcnM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgd29yZFNlcGFyYXRvcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0T25MaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzTWluQ2hhcnM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGdseXBoTWFyZ2luPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdW5kZWRTZWxlY3Rpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB0aGVtZT86IElFZGl0b3JUaGVtZTtcbiAgQElucHV0KCkgcmVhZE9ubHk/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxiYXI/OiBJRWRpdG9yU2Nyb2xsYmFyT3B0aW9ucztcbiAgQElucHV0KCkgb3ZlcnZpZXdSdWxlckxhbmVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjdXJzb3JCbGlua2luZz86IHN0cmluZztcbiAgQElucHV0KCkgbW91c2VXaGVlbFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcbiAgQElucHV0KCkgZm9udExpZ2F0dXJlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxCZXlvbmRMYXN0TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9tYXRpY0xheW91dD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nQ29sdW1uPzogbnVtYmVyO1xuICBASW5wdXQoKSB3b3JkV3JhcD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nSW5kZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGhvdmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zRGVsYXk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBhcmFtZXRlckhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaWNvbnNJblN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Nsb3NpbmdCcmFja2V0cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcm1hdE9uVHlwZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJ3wnYm90dG9tJ3wnaW5saW5lJ3wnbm9uZSc7XG4gIEBJbnB1dCgpIHRhYkNvbXBsZXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB3b3JkQmFzZWRTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9sZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldoaXRlc3BhY2U/OiAnbm9uZSd8J2JvdW5kYXJ5J3wnYWxsJztcbiAgQElucHV0KCkgcmVuZGVyQ29udHJvbENoYXJhY3RlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJJbmRlbnRHdWlkZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJMaW5lSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgdXNlVGFiU3RvcHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb250RmFtaWx5Pzogc3RyaW5nO1xuICBASW5wdXQoKVxuICBmb250V2VpZ2h0PzogJ25vcm1hbCd8J2JvbGQnfCdib2xkZXInfCdsaWdodGVyJ3wnaW5pdGlhbCd8J2luaGVyaXQnfCcxMDAnfCcyMDAnfCczMDAnfCc0MDAnfCc1MDAnfFxuICAgICAgJzYwMCd8JzcwMCd8JzgwMCd8JzkwMCc7XG4gIEBJbnB1dCgpIGZvbnRTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW5lSGVpZ2h0PzogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2U7XG5cbiAgQElucHV0KCkgZGlzYWJsZUF1dG9jb21wbGV0ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Zvcm1hdE9uTG9hZCA9IHRydWU7XG4gIEBJbnB1dCgpIG1vbmFjb0xpYlBhdGggPSAndnMvbG9hZGVyLmpzJztcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVUb0NvbXBhcmUodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICB0aGlzLl92YWx1ZVRvQ29tcGFyZSA9IHY7XG5cbiAgICAgIGlmICh0aGlzLl92YWx1ZVRvQ29tcGFyZSA9PT0gdm9pZCAwIHx8ICF0aGlzLl92YWx1ZVRvQ29tcGFyZSB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IgJiYgdGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSAhPT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX3ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpID09PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHY7XG5cbiAgICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gdm9pZCAwIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSAhPT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VkaXRvci5zZXRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgdmFsdWVUb0NvbXBhcmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBpbml0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2VkaXRvcicsIHtzdGF0aWM6IHRydWV9KSBlZGl0b3JDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuICBnZXQgZWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlID0gJyc7XG4gIHByaXZhdGUgX3ZhbHVlVG9Db21wYXJlID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBsb2FkIE1vbmFjbyBsaWJcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBsZXQgb25Hb3RBbWRMb2FkZXIgPSAoKSA9PiB7XG4gICAgICAvLyBMb2FkIG1vbmFjb1xuICAgICAgKDxhbnk+d2luZG93KS5yZXF1aXJlKFsndnMvZWRpdG9yL2VkaXRvci5tYWluJ10sICgpID0+IHtcbiAgICAgICAgdGhpcy5faW5pdE1vbmFjbygpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIExvYWQgQU1EIGxvYWRlciBpZiBuZWNlc3NhcnlcbiAgICBpZiAoISg8YW55PndpbmRvdykucmVxdWlyZSkge1xuICAgICAgbGV0IGxvYWRlclNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgbG9hZGVyU2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgIGxvYWRlclNjcmlwdC5zcmMgPSB0aGlzLm1vbmFjb0xpYlBhdGg7XG4gICAgICBsb2FkZXJTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uR290QW1kTG9hZGVyKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyU2NyaXB0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25Hb3RBbWRMb2FkZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBvbiBkZXN0cnVjdGlvbiBvZiB0aGUgY29tcG9uZW50IHdlIG1ha2Ugc3VyZSB0byBkaXNwb3NlIGJvdGggdGhlIGVkaXRvciBhbmRcbiAgICogdGhlIGV4dHJhIGxpYnMgdGhhdCB3ZSBtaWdodCd2ZSBsb2FkZWRcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IHtbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIHRoaXMuX2VkaXRvci51cGRhdGVPcHRpb25zKHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIG1vbmFjbyBjb21wb25lbmVudFxuICAgKi9cbiAgZGlzcG9zZSgpIHtcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLmRpc3Bvc2UoKTtcbiAgICAgIHdoaWxlIChteURpdi5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgaWYgKG15RGl2LmZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgIG15RGl2LnJlbW92ZUNoaWxkKG15RGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyZWQgd2hlbiB3aW5kb3dzIGlzIHJlc2l6ZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvblJlc2l6ZShfZXZlbnQ6IGFueSkge1xuICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBpZiAobXlEaXYgPT0gbnVsbCB8fCBteURpdi5wYXJlbnRFbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBlZGl0b3JcbiAgICogSXMgY2FsbGVkIG9uY2UgbW9uYWNvIGxpYnJhcnkgaXMgYXZhaWxhYmxlXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW9uYWNvKCkge1xuICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICB0aGlzLmluaXQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVkaXRvcigpIHtcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgdGhpcy5kaXNwb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0U2ltcGxlRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdERpZmZFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgIGlmIChteURpdiAhPSBudWxsICYmIG15RGl2LnBhcmVudEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gICAgfVxuXG4gICAgLy8gSW5pdCBBdXRvY29tcGxldGUgaWYgbm90IGRpc2FibGVkXG4gICAgaWYgKCF0aGlzLmRpc2FibGVBdXRvY29tcGxldGUpIHtcbiAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLmluaXRBdXRvQ29tcGxldGUodGhpcy5sYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiBjb250ZW50IGlzIGxvYWRlZCwgc2Nyb2xsQ2hhbmdlIGlzIHRyaWdlcnJlZCxcbiAgICAvLyBXZSBjYW4gb25seSBmb3JjZSBhdXRvIGZvcm1hdCBhdCB0aGlzIG1vbWVudCwgYmVjYXVzZSBlZGl0b3JcbiAgICAvLyBkb2Vzbid0IGhhdmUgb25SZWFkeSBldmVudCAuLi5cbiAgICAvLyAgdGhpcy5fZWRpdG9yLm9uRGlkU2Nyb2xsQ2hhbmdlKCgpID0+IHtcbiAgICAvLyAgICAgaWYgKHRoaXMuYXV0b0Zvcm1hdE9uTG9hZCAmJiAhdGhpcy5faXNDb2RlRm9ybWF0dGVkKSB7XG4gICAgLy8gICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0QWN0aW9uKCdlZGl0b3IuYWN0aW9uLmZvcm1hdCcpLnJ1bigpO1xuICAgIC8vICAgICAgICAgdGhpcy5faXNDb2RlRm9ybWF0dGVkID0gdHJ1ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIHNpbXBsZSBlZGl0b3JcbiAgICB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKG5ld1ZhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3IgZGlmZiBlZGl0b3JcbiAgICBpZiAodGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpKSB7XG4gICAgICB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgIT09IG5ld1ZhbCkge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlVG9Db21wYXJlKG5ld1ZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzaW1wbGUgZWRpdG9yIHRleHRcbiAgICogQHBhcmFtIGRpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdFNpbXBsZUVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICByZXR1cm4gbW9uYWNvLmVkaXRvci5jcmVhdGUoZGl2LCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaWZmIGVkaXRvciB0byBjb21wYXJlIHR3byBzdHJpbmcgKF92YWx1ZSBhbmQgX3ZhbHVlVG9Db21wYXJlKVxuICAgKiBAcGFyYW0gZGl2XG4gICAqL1xuICBwcml2YXRlIF9pbml0RGlmZkVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICBsZXQgb3JpZ2luYWxNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWUsIHRoaXMubGFuZ3VhZ2UpO1xuICAgIGxldCBtb2RpZmllZE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZVRvQ29tcGFyZSwgdGhpcy5sYW5ndWFnZSk7XG5cbiAgICBsZXQgZGlmZkVkaXRvciA9IG1vbmFjby5lZGl0b3IuY3JlYXRlRGlmZkVkaXRvcihkaXYsIG9wdGlvbnMpO1xuICAgIGRpZmZFZGl0b3Iuc2V0TW9kZWwoe1xuICAgICAgbW9kaWZpZWQ6IG1vZGlmaWVkTW9kZWwsXG4gICAgICBvcmlnaW5hbDogb3JpZ2luYWxNb2RlbCxcbiAgICB9KTtcblxuICAgIHJldHVybiBkaWZmRWRpdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3B0aW9ucygpOiBJRWRpdG9yT3B0aW9ucyB7XG4gICAgbGV0IG9wdGlvbnM6IElFZGl0b3JPcHRpb25zID0gbmV3IElFZGl0b3JPcHRpb25zKCk7XG4gICAgb3B0aW9ucy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXIgPSB0aGlzLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcjtcbiAgICBvcHRpb25zLmFyaWFMYWJlbCA9IHRoaXMuYXJpYUxhYmVsO1xuICAgIG9wdGlvbnMucnVsZXJzID0gdGhpcy5ydWxlcnM7XG4gICAgb3B0aW9ucy53b3JkU2VwYXJhdG9ycyA9IHRoaXMud29yZFNlcGFyYXRvcnM7XG4gICAgb3B0aW9ucy5zZWxlY3Rpb25DbGlwYm9hcmQgPSB0aGlzLnNlbGVjdGlvbkNsaXBib2FyZDtcbiAgICBvcHRpb25zLmxpbmVOdW1iZXJzID0gdGhpcy5saW5lTnVtYmVycztcbiAgICBvcHRpb25zLnNlbGVjdE9uTGluZU51bWJlcnMgPSB0aGlzLnNlbGVjdE9uTGluZU51bWJlcnM7XG4gICAgb3B0aW9ucy5saW5lTnVtYmVyc01pbkNoYXJzID0gdGhpcy5saW5lTnVtYmVyc01pbkNoYXJzO1xuICAgIG9wdGlvbnMuZ2x5cGhNYXJnaW4gPSB0aGlzLmdseXBoTWFyZ2luO1xuICAgIG9wdGlvbnMubGluZURlY29yYXRpb25zV2lkdGggPSB0aGlzLmxpbmVEZWNvcmF0aW9uc1dpZHRoO1xuICAgIG9wdGlvbnMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZyA9IHRoaXMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZztcbiAgICBvcHRpb25zLnJvdW5kZWRTZWxlY3Rpb24gPSB0aGlzLnJvdW5kZWRTZWxlY3Rpb247XG4gICAgb3B0aW9ucy50aGVtZSA9IHRoaXMudGhlbWU7XG4gICAgb3B0aW9ucy5yZWFkT25seSA9IHRoaXMucmVhZE9ubHk7XG4gICAgb3B0aW9ucy5zY3JvbGxiYXIgPSB0aGlzLnNjcm9sbGJhcjtcbiAgICBvcHRpb25zLm92ZXJ2aWV3UnVsZXJMYW5lcyA9IHRoaXMub3ZlcnZpZXdSdWxlckxhbmVzO1xuICAgIG9wdGlvbnMuY3Vyc29yQmxpbmtpbmcgPSB0aGlzLmN1cnNvckJsaW5raW5nO1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgIG9wdGlvbnMuY3Vyc29yU3R5bGUgPSB0aGlzLmN1cnNvclN0eWxlO1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgIG9wdGlvbnMuZm9udExpZ2F0dXJlcyA9IHRoaXMuZm9udExpZ2F0dXJlcztcbiAgICBvcHRpb25zLmRpc2FibGVUcmFuc2xhdGUzZCA9IHRoaXMuZGlzYWJsZVRyYW5zbGF0ZTNkO1xuICAgIG9wdGlvbnMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlciA9IHRoaXMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcjtcbiAgICBvcHRpb25zLnNjcm9sbEJleW9uZExhc3RMaW5lID0gdGhpcy5zY3JvbGxCZXlvbmRMYXN0TGluZTtcbiAgICBvcHRpb25zLmF1dG9tYXRpY0xheW91dCA9IHRoaXMuYXV0b21hdGljTGF5b3V0O1xuICAgIG9wdGlvbnMud3JhcHBpbmdDb2x1bW4gPSB0aGlzLndyYXBwaW5nQ29sdW1uO1xuICAgIG9wdGlvbnMud29yZFdyYXAgPSB0aGlzLndvcmRXcmFwO1xuICAgIG9wdGlvbnMud3JhcHBpbmdJbmRlbnQgPSB0aGlzLndyYXBwaW5nSW5kZW50O1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXIgPSB0aGlzLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI7XG4gICAgb3B0aW9ucy5ob3ZlciA9IHRoaXMuaG92ZXI7XG4gICAgb3B0aW9ucy5jb250ZXh0bWVudSA9IHRoaXMuY29udGV4dG1lbnU7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHkgPSB0aGlzLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eTtcbiAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnMgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zRGVsYXkgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnNEZWxheTtcbiAgICBvcHRpb25zLnBhcmFtZXRlckhpbnRzID0gdGhpcy5wYXJhbWV0ZXJIaW50cztcbiAgICBvcHRpb25zLmljb25zSW5TdWdnZXN0aW9ucyA9IHRoaXMuaWNvbnNJblN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9IHRoaXMuYXV0b0Nsb3NpbmdCcmFja2V0cztcbiAgICBvcHRpb25zLmZvcm1hdE9uVHlwZSA9IHRoaXMuZm9ybWF0T25UeXBlO1xuICAgIG9wdGlvbnMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnMgPSB0aGlzLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXIgPSB0aGlzLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyO1xuICAgIG9wdGlvbnMuc25pcHBldFN1Z2dlc3Rpb25zID0gdGhpcy5zbmlwcGV0U3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy50YWJDb21wbGV0aW9uID0gdGhpcy50YWJDb21wbGV0aW9uO1xuICAgIG9wdGlvbnMud29yZEJhc2VkU3VnZ2VzdGlvbnMgPSB0aGlzLndvcmRCYXNlZFN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMuc2VsZWN0aW9uSGlnaGxpZ2h0ID0gdGhpcy5zZWxlY3Rpb25IaWdobGlnaHQ7XG4gICAgb3B0aW9ucy5jb2RlTGVucyA9IHRoaXMuY29kZUxlbnM7XG4gICAgb3B0aW9ucy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nO1xuICAgIG9wdGlvbnMucmVuZGVyV2hpdGVzcGFjZSA9IHRoaXMucmVuZGVyV2hpdGVzcGFjZTtcbiAgICBvcHRpb25zLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzID0gdGhpcy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLnJlbmRlckluZGVudEd1aWRlcyA9IHRoaXMucmVuZGVySW5kZW50R3VpZGVzO1xuICAgIG9wdGlvbnMucmVuZGVyTGluZUhpZ2hsaWdodCA9IHRoaXMucmVuZGVyTGluZUhpZ2hsaWdodDtcbiAgICBvcHRpb25zLnVzZVRhYlN0b3BzID0gdGhpcy51c2VUYWJTdG9wcztcbiAgICBvcHRpb25zLmZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHk7XG4gICAgb3B0aW9ucy5mb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0O1xuICAgIG9wdGlvbnMuZm9udFNpemUgPSB0aGlzLmZvbnRTaXplO1xuICAgIG9wdGlvbnMubGluZUhlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2U7XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoPGFueT5vcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlICg8YW55Pm9wdGlvbnMpW2tleV07ICAvLyBSZW1vdmUgYWxsIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlVmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVZhbHVlVG9Db21wYXJlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlVG9Db21wYXJlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JpZ2luYWxNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgIHJldHVybiBtb2RlbC5vcmlnaW5hbCA/IG1vZGVsLm9yaWdpbmFsIDogbW9kZWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TW9kaWZpZWRNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgIHJldHVybiBtb2RlbC5tb2RpZmllZCA/IG1vZGVsLm1vZGlmaWVkIDogbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==