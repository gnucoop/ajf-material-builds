/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/monaco-editor.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDNUQsTUFBTSxFQUFnQixTQUFTLEVBQUUsaUJBQWlCLEVBQ3pFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZTVDLE1BQU0sT0FBTyxlQUFlO0lBdUh4QjtRQXhETyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUEyQzVCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzVCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixvQkFBZSxHQUFHLEVBQUUsQ0FBQztJQUc3QixDQUFDOzs7OztJQXRESCxJQUFhLGNBQWMsQ0FBQyxDQUFTO1FBQ25DLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFFekIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVB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REFBK0M7O0lBQy9DLDJDQUFvQzs7SUFDcEMsZ0NBQThCOztJQUM5QixtQ0FBNEI7O0lBQzVCLG9DQUE2Qzs7SUFDN0MsNkNBQXFDOztJQUNyQyx5Q0FBaUM7O0lBQ2pDLHlDQUFrQzs7SUFDbEMsc0NBQThCOztJQUM5Qix3Q0FBaUM7O0lBQ2pDLDZDQUFzQzs7SUFDdEMsb0RBQTZDOztJQUM3QywrQ0FBd0M7O0lBQ3hDLDBDQUFtQzs7SUFDbkMseUNBQWlDOztJQUNqQyxtQ0FBNEI7O0lBQzVCLHlDQUFpQzs7SUFDakMsd0RBQWdEOztJQUNoRCx1REFBK0M7O0lBQy9DLDJEQUFtRDs7SUFDbkQsaURBQXlDOztJQUN6QyxnQ0FBeUI7O0lBQ3pCLHNDQUErQjs7SUFDL0Isc0RBQThDOztJQUM5QywyQ0FBb0M7O0lBQ3BDLGdEQUF3Qzs7SUFDeEMseUNBQWtDOztJQUNsQyw2Q0FBc0M7O0lBQ3RDLDhDQUF1Qzs7SUFDdkMsdUNBQWdDOztJQUNoQyxxREFBOEM7O0lBQzlDLGtEQUEyQzs7SUFDM0MsNkNBQW1FOztJQUNuRSx3Q0FBaUM7O0lBQ2pDLCtDQUF3Qzs7SUFDeEMsNkNBQXNDOztJQUN0QyxtQ0FBNEI7O0lBQzVCLGtDQUEyQjs7SUFDM0IsMkNBQXdEOztJQUN4RCxrREFBMkM7O0lBQzNDLDZDQUFzQzs7SUFDdEMsOENBQXVDOztJQUN2QyxzQ0FBK0I7O0lBQy9CLHFDQUE2Qjs7SUFDN0IscUNBQzBFOztJQUMxRSxtQ0FBMkI7O0lBQzNCLHFDQUE2Qjs7SUFFN0IsbUNBQW1DOztJQUVuQyw4Q0FBc0M7O0lBQ3RDLDJDQUFpQzs7SUFDakMsd0NBQXdDOztJQTJDdEMsc0NBQTJDOztJQUMzQywrQ0FBb0Q7O0lBQ3BELCtCQUFvQzs7SUFFcEMsd0NBQStEOzs7OztJQUUvRCxrQ0FBcUI7Ozs7O0lBR3JCLGlDQUFvQjs7Ozs7SUFDcEIsMENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsXG4gIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXV0b0NvbXBsZXRlU2luZ2xldG9ufSBmcm9tICcuL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yTGFuZ3VhZ2V9IGZyb20gJy4vZWRpdG9yLWxhbmd1YWdlLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLW9wdGlvbnMtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yU2Nyb2xsYmFyT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itc2Nyb2xsYmFyLW9wdGlvbnMnO1xuaW1wb3J0IHtJRWRpdG9yVGhlbWV9IGZyb20gJy4vZWRpdG9yLXRoZW1lJztcblxuZGVjbGFyZSBjb25zdCBtb25hY286IGFueTtcblxuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnYWpmLW1vbmFjby1lZGl0b3InLFxuICBzdHlsZVVybHM6IFsnbW9uYWNvLWVkaXRvci5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdtb25hY28tZWRpdG9yLmh0bWwnLFxuICBob3N0OiB7XG4gICAgJyh3aW5kb3c6cmVzaXplKSc6ICdvblJlc2l6ZSgkZXZlbnQpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEFqZk1vbmFjb0VkaXRvciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBydWxlcnM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgd29yZFNlcGFyYXRvcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0T25MaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzTWluQ2hhcnM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGdseXBoTWFyZ2luPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdW5kZWRTZWxlY3Rpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB0aGVtZT86IElFZGl0b3JUaGVtZTtcbiAgQElucHV0KCkgcmVhZE9ubHk/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxiYXI/OiBJRWRpdG9yU2Nyb2xsYmFyT3B0aW9ucztcbiAgQElucHV0KCkgb3ZlcnZpZXdSdWxlckxhbmVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjdXJzb3JCbGlua2luZz86IHN0cmluZztcbiAgQElucHV0KCkgbW91c2VXaGVlbFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcbiAgQElucHV0KCkgZm9udExpZ2F0dXJlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxCZXlvbmRMYXN0TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9tYXRpY0xheW91dD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nQ29sdW1uPzogbnVtYmVyO1xuICBASW5wdXQoKSB3b3JkV3JhcD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nSW5kZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGhvdmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zRGVsYXk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBhcmFtZXRlckhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaWNvbnNJblN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Nsb3NpbmdCcmFja2V0cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcm1hdE9uVHlwZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJyB8ICdib3R0b20nIHwgJ2lubGluZScgfCAnbm9uZSc7XG4gIEBJbnB1dCgpIHRhYkNvbXBsZXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB3b3JkQmFzZWRTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9sZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldoaXRlc3BhY2U/OiAnbm9uZScgfCAnYm91bmRhcnknIHwgJ2FsbCc7XG4gIEBJbnB1dCgpIHJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVySW5kZW50R3VpZGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyTGluZUhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVzZVRhYlN0b3BzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KCkgZm9udFdlaWdodD86ICdub3JtYWwnIHwgJ2JvbGQnIHwgJ2JvbGRlcicgfCAnbGlnaHRlcicgfCAnaW5pdGlhbCcgfCAnaW5oZXJpdCdcbiAgICB8ICcxMDAnIHwgJzIwMCcgfCAnMzAwJyB8ICc0MDAnIHwgJzUwMCcgfCAnNjAwJyB8ICc3MDAnIHwgJzgwMCcgfCAnOTAwJztcbiAgQElucHV0KCkgZm9udFNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVIZWlnaHQ/OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZTtcblxuICBASW5wdXQoKSBkaXNhYmxlQXV0b2NvbXBsZXRlOiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvRm9ybWF0T25Mb2FkID0gdHJ1ZTtcbiAgQElucHV0KCkgbW9uYWNvTGliUGF0aCA9ICd2cy9sb2FkZXIuanMnO1xuXG4gIEBJbnB1dCgpIHNldCB2YWx1ZVRvQ29tcGFyZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlID09PSB2b2lkIDAgfHwgIXRoaXMuX3ZhbHVlVG9Db21wYXJlIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgPT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHY6IHN0cmluZykge1xuICAgICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcblxuICAgICAgICBpZiAodGhpcy5fdmFsdWUgPT09IHZvaWQgMCB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgIT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VkaXRvci5zZXRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSB2YWx1ZVRvQ29tcGFyZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgaW5pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2VkaXRvcicsIHtzdGF0aWM6IHRydWV9KSBlZGl0b3JDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gICAgcHJpdmF0ZSBfZWRpdG9yOiBhbnk7XG4gICAgZ2V0IGVkaXRvcigpOiBhbnkgeyByZXR1cm4gdGhpcy5fZWRpdG9yOyB9XG5cbiAgICBwcml2YXRlIF92YWx1ZSA9ICcnO1xuICAgIHByaXZhdGUgX3ZhbHVlVG9Db21wYXJlID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBsb2FkIE1vbmFjbyBsaWJcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGxldCBvbkdvdEFtZExvYWRlciA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIExvYWQgbW9uYWNvXG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVpcmUoWyd2cy9lZGl0b3IvZWRpdG9yLm1haW4nXSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRNb25hY28oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIExvYWQgQU1EIGxvYWRlciBpZiBuZWNlc3NhcnlcbiAgICAgICAgaWYgKCEoPGFueT53aW5kb3cpLnJlcXVpcmUpIHtcbiAgICAgICAgICAgIGxldCBsb2FkZXJTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgICAgIGxvYWRlclNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgICBsb2FkZXJTY3JpcHQuc3JjID0gdGhpcy5tb25hY29MaWJQYXRoO1xuICAgICAgICAgICAgbG9hZGVyU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkdvdEFtZExvYWRlcik7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRlclNjcmlwdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkdvdEFtZExvYWRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBvbiBkZXN0cnVjdGlvbiBvZiB0aGUgY29tcG9uZW50IHdlIG1ha2Ugc3VyZSB0byBkaXNwb3NlIGJvdGggdGhlIGVkaXRvciBhbmRcbiAgICAgKiB0aGUgZXh0cmEgbGlicyB0aGF0IHdlIG1pZ2h0J3ZlIGxvYWRlZFxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhfY2hhbmdlczoge1twcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci51cGRhdGVPcHRpb25zKHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSBtb25hY28gY29tcG9uZW5lbnRcbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB3aGlsZSAobXlEaXYuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICAgIGlmIChteURpdi5maXJzdENoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBteURpdi5yZW1vdmVDaGlsZChteURpdi5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJlZCB3aGVuIHdpbmRvd3MgaXMgcmVzaXplZFxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIG9uUmVzaXplKF9ldmVudDogYW55KSB7XG4gICAgICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgICAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmIChteURpdiA9PSBudWxsIHx8IG15RGl2LnBhcmVudEVsZW1lbnQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBlZGl0b3JcbiAgICAgKiBJcyBjYWxsZWQgb25jZSBtb25hY28gbGlicmFyeSBpcyBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pbml0TW9uYWNvKCkge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHRoaXMuaW5pdC5lbWl0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEVkaXRvcigpIHtcbiAgICAgICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZVRvQ29tcGFyZSkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdFNpbXBsZUVkaXRvcihteURpdiwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0RGlmZkVkaXRvcihteURpdiwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYW51YWxseSBzZXQgbW9uYWNvIHNpemUgYmVjYXVzZSBNb25hY29FZGl0b3IgZG9lc24ndCB3b3JrIHdpdGggRmxleGJveCBjc3NcbiAgICAgICAgaWYgKG15RGl2ICE9IG51bGwgJiYgbXlEaXYucGFyZW50RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0IEF1dG9jb21wbGV0ZSBpZiBub3QgZGlzYWJsZWRcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVBdXRvY29tcGxldGUpIHtcbiAgICAgICAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLmluaXRBdXRvQ29tcGxldGUodGhpcy5sYW5ndWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIGNvbnRlbnQgaXMgbG9hZGVkLCBzY3JvbGxDaGFuZ2UgaXMgdHJpZ2VycmVkLFxuICAgICAgICAvLyBXZSBjYW4gb25seSBmb3JjZSBhdXRvIGZvcm1hdCBhdCB0aGlzIG1vbWVudCwgYmVjYXVzZSBlZGl0b3JcbiAgICAgICAgLy8gZG9lc24ndCBoYXZlIG9uUmVhZHkgZXZlbnQgLi4uXG4gICAgICAgIC8vICB0aGlzLl9lZGl0b3Iub25EaWRTY3JvbGxDaGFuZ2UoKCkgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuYXV0b0Zvcm1hdE9uTG9hZCAmJiAhdGhpcy5faXNDb2RlRm9ybWF0dGVkKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fZWRpdG9yLmdldEFjdGlvbignZWRpdG9yLmFjdGlvbi5mb3JtYXQnKS5ydW4oKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9pc0NvZGVGb3JtYXR0ZWQgPSB0cnVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3Igc2ltcGxlIGVkaXRvclxuICAgICAgICB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWUobmV3VmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIGRpZmYgZWRpdG9yXG4gICAgICAgIGlmICh0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5vbkRpZENoYW5nZUNvbnRlbnQoKF9lOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgIT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZVRvQ29tcGFyZShuZXdWYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgc2ltcGxlIGVkaXRvciB0ZXh0XG4gICAgICogQHBhcmFtIGRpdlxuICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaW5pdFNpbXBsZUVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG1vbmFjby5lZGl0b3IuY3JlYXRlKGRpdiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZGlmZiBlZGl0b3IgdG8gY29tcGFyZSB0d28gc3RyaW5nIChfdmFsdWUgYW5kIF92YWx1ZVRvQ29tcGFyZSlcbiAgICAgKiBAcGFyYW0gZGl2XG4gICAgICovXG4gICAgcHJpdmF0ZSBfaW5pdERpZmZFZGl0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgICAgIGxldCBvcmlnaW5hbE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZSwgdGhpcy5sYW5ndWFnZSk7XG4gICAgICAgIGxldCBtb2RpZmllZE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZVRvQ29tcGFyZSwgdGhpcy5sYW5ndWFnZSk7XG5cbiAgICAgICAgbGV0IGRpZmZFZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IoZGl2LCBvcHRpb25zKTtcbiAgICAgICAgZGlmZkVkaXRvci5zZXRNb2RlbCh7XG4gICAgICAgICAgICBtb2RpZmllZDogbW9kaWZpZWRNb2RlbCxcbiAgICAgICAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbE1vZGVsLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGlmZkVkaXRvcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRPcHRpb25zKCk6IElFZGl0b3JPcHRpb25zIHtcbiAgICAgICAgbGV0IG9wdGlvbnM6IElFZGl0b3JPcHRpb25zID0gbmV3IElFZGl0b3JPcHRpb25zKCk7XG4gICAgICAgIG9wdGlvbnMuZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyID0gdGhpcy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXI7XG4gICAgICAgIG9wdGlvbnMuYXJpYUxhYmVsID0gdGhpcy5hcmlhTGFiZWw7XG4gICAgICAgIG9wdGlvbnMucnVsZXJzID0gdGhpcy5ydWxlcnM7XG4gICAgICAgIG9wdGlvbnMud29yZFNlcGFyYXRvcnMgPSB0aGlzLndvcmRTZXBhcmF0b3JzO1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkNsaXBib2FyZCA9IHRoaXMuc2VsZWN0aW9uQ2xpcGJvYXJkO1xuICAgICAgICBvcHRpb25zLmxpbmVOdW1iZXJzID0gdGhpcy5saW5lTnVtYmVycztcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RPbkxpbmVOdW1iZXJzID0gdGhpcy5zZWxlY3RPbkxpbmVOdW1iZXJzO1xuICAgICAgICBvcHRpb25zLmxpbmVOdW1iZXJzTWluQ2hhcnMgPSB0aGlzLmxpbmVOdW1iZXJzTWluQ2hhcnM7XG4gICAgICAgIG9wdGlvbnMuZ2x5cGhNYXJnaW4gPSB0aGlzLmdseXBoTWFyZ2luO1xuICAgICAgICBvcHRpb25zLmxpbmVEZWNvcmF0aW9uc1dpZHRoID0gdGhpcy5saW5lRGVjb3JhdGlvbnNXaWR0aDtcbiAgICAgICAgb3B0aW9ucy5yZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nID0gdGhpcy5yZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nO1xuICAgICAgICBvcHRpb25zLnJvdW5kZWRTZWxlY3Rpb24gPSB0aGlzLnJvdW5kZWRTZWxlY3Rpb247XG4gICAgICAgIG9wdGlvbnMudGhlbWUgPSB0aGlzLnRoZW1lO1xuICAgICAgICBvcHRpb25zLnJlYWRPbmx5ID0gdGhpcy5yZWFkT25seTtcbiAgICAgICAgb3B0aW9ucy5zY3JvbGxiYXIgPSB0aGlzLnNjcm9sbGJhcjtcbiAgICAgICAgb3B0aW9ucy5vdmVydmlld1J1bGVyTGFuZXMgPSB0aGlzLm92ZXJ2aWV3UnVsZXJMYW5lcztcbiAgICAgICAgb3B0aW9ucy5jdXJzb3JCbGlua2luZyA9IHRoaXMuY3Vyc29yQmxpbmtpbmc7XG4gICAgICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgICAgICBvcHRpb25zLmN1cnNvclN0eWxlID0gdGhpcy5jdXJzb3JTdHlsZTtcbiAgICAgICAgb3B0aW9ucy5tb3VzZVdoZWVsWm9vbSA9IHRoaXMubW91c2VXaGVlbFpvb207XG4gICAgICAgIG9wdGlvbnMuZm9udExpZ2F0dXJlcyA9IHRoaXMuZm9udExpZ2F0dXJlcztcbiAgICAgICAgb3B0aW9ucy5kaXNhYmxlVHJhbnNsYXRlM2QgPSB0aGlzLmRpc2FibGVUcmFuc2xhdGUzZDtcbiAgICAgICAgb3B0aW9ucy5oaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyID0gdGhpcy5oaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyO1xuICAgICAgICBvcHRpb25zLnNjcm9sbEJleW9uZExhc3RMaW5lID0gdGhpcy5zY3JvbGxCZXlvbmRMYXN0TGluZTtcbiAgICAgICAgb3B0aW9ucy5hdXRvbWF0aWNMYXlvdXQgPSB0aGlzLmF1dG9tYXRpY0xheW91dDtcbiAgICAgICAgb3B0aW9ucy53cmFwcGluZ0NvbHVtbiA9IHRoaXMud3JhcHBpbmdDb2x1bW47XG4gICAgICAgIG9wdGlvbnMud29yZFdyYXAgPSB0aGlzLndvcmRXcmFwO1xuICAgICAgICBvcHRpb25zLndyYXBwaW5nSW5kZW50ID0gdGhpcy53cmFwcGluZ0luZGVudDtcbiAgICAgICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnM7XG4gICAgICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycztcbiAgICAgICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM7XG4gICAgICAgIG9wdGlvbnMuc3RvcFJlbmRlcmluZ0xpbmVBZnRlciA9IHRoaXMuc3RvcFJlbmRlcmluZ0xpbmVBZnRlcjtcbiAgICAgICAgb3B0aW9ucy5ob3ZlciA9IHRoaXMuaG92ZXI7XG4gICAgICAgIG9wdGlvbnMuY29udGV4dG1lbnUgPSB0aGlzLmNvbnRleHRtZW51O1xuICAgICAgICBvcHRpb25zLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eSA9IHRoaXMubW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5O1xuICAgICAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnMgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnM7XG4gICAgICAgIG9wdGlvbnMucXVpY2tTdWdnZXN0aW9uc0RlbGF5ID0gdGhpcy5xdWlja1N1Z2dlc3Rpb25zRGVsYXk7XG4gICAgICAgIG9wdGlvbnMucGFyYW1ldGVySGludHMgPSB0aGlzLnBhcmFtZXRlckhpbnRzO1xuICAgICAgICBvcHRpb25zLmljb25zSW5TdWdnZXN0aW9ucyA9IHRoaXMuaWNvbnNJblN1Z2dlc3Rpb25zO1xuICAgICAgICBvcHRpb25zLmF1dG9DbG9zaW5nQnJhY2tldHMgPSB0aGlzLmF1dG9DbG9zaW5nQnJhY2tldHM7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0T25UeXBlID0gdGhpcy5mb3JtYXRPblR5cGU7XG4gICAgICAgIG9wdGlvbnMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnMgPSB0aGlzLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzO1xuICAgICAgICBvcHRpb25zLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyID0gdGhpcy5hY2NlcHRTdWdnZXN0aW9uT25FbnRlcjtcbiAgICAgICAgb3B0aW9ucy5zbmlwcGV0U3VnZ2VzdGlvbnMgPSB0aGlzLnNuaXBwZXRTdWdnZXN0aW9ucztcbiAgICAgICAgb3B0aW9ucy50YWJDb21wbGV0aW9uID0gdGhpcy50YWJDb21wbGV0aW9uO1xuICAgICAgICBvcHRpb25zLndvcmRCYXNlZFN1Z2dlc3Rpb25zID0gdGhpcy53b3JkQmFzZWRTdWdnZXN0aW9ucztcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25IaWdobGlnaHQgPSB0aGlzLnNlbGVjdGlvbkhpZ2hsaWdodDtcbiAgICAgICAgb3B0aW9ucy5jb2RlTGVucyA9IHRoaXMuY29kZUxlbnM7XG4gICAgICAgIG9wdGlvbnMuZm9sZGluZyA9IHRoaXMuZm9sZGluZztcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJXaGl0ZXNwYWNlID0gdGhpcy5yZW5kZXJXaGl0ZXNwYWNlO1xuICAgICAgICBvcHRpb25zLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzID0gdGhpcy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycztcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJJbmRlbnRHdWlkZXMgPSB0aGlzLnJlbmRlckluZGVudEd1aWRlcztcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJMaW5lSGlnaGxpZ2h0ID0gdGhpcy5yZW5kZXJMaW5lSGlnaGxpZ2h0O1xuICAgICAgICBvcHRpb25zLnVzZVRhYlN0b3BzID0gdGhpcy51c2VUYWJTdG9wcztcbiAgICAgICAgb3B0aW9ucy5mb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5O1xuICAgICAgICBvcHRpb25zLmZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHQ7XG4gICAgICAgIG9wdGlvbnMuZm9udFNpemUgPSB0aGlzLmZvbnRTaXplO1xuICAgICAgICBvcHRpb25zLmxpbmVIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgICAgIG9wdGlvbnMudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICAgICAgb3B0aW9ucy5sYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2U7XG5cbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgICAgICAuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoKDxhbnk+b3B0aW9ucylba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZSAoPGFueT5vcHRpb25zKVtrZXldOyAvLyBSZW1vdmUgYWxsIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZVZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwcml2YXRlIF91cGRhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVWYWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXBkYXRlVmFsdWVUb0NvbXBhcmUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWVUb0NvbXBhcmVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0T3JpZ2luYWxNb2RlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5fZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwub3JpZ2luYWwgPyBtb2RlbC5vcmlnaW5hbCA6IG1vZGVsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TW9kaWZpZWRNb2RlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5fZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWwubW9kaWZpZWQgPyBtb2RlbC5tb2RpZmllZCA6IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=