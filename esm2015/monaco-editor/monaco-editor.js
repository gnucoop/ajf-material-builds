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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDNUQsTUFBTSxFQUFnQixTQUFTLEVBQUUsaUJBQWlCLEVBQ3pFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBZTVDLE1BQU0sT0FBTyxlQUFlO0lBdUh4QjtRQXhETyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUEyQzVCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTzVCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixvQkFBZSxHQUFHLEVBQUUsQ0FBQztJQUc3QixDQUFDOzs7OztJQXRESCxJQUFhLGNBQWMsQ0FBQyxDQUFTO1FBQ25DLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFFekIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVB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REFBK0M7O0lBQy9DLDJDQUFvQzs7SUFDcEMsZ0NBQThCOztJQUM5QixtQ0FBNEI7O0lBQzVCLG9DQUE2Qzs7SUFDN0MsNkNBQXFDOztJQUNyQyx5Q0FBaUM7O0lBQ2pDLHlDQUFrQzs7SUFDbEMsc0NBQThCOztJQUM5Qix3Q0FBaUM7O0lBQ2pDLDZDQUFzQzs7SUFDdEMsb0RBQTZDOztJQUM3QywrQ0FBd0M7O0lBQ3hDLDBDQUFtQzs7SUFDbkMseUNBQWlDOztJQUNqQyxtQ0FBNEI7O0lBQzVCLHlDQUFpQzs7SUFDakMsd0RBQWdEOztJQUNoRCx1REFBK0M7O0lBQy9DLDJEQUFtRDs7SUFDbkQsaURBQXlDOztJQUN6QyxnQ0FBeUI7O0lBQ3pCLHNDQUErQjs7SUFDL0Isc0RBQThDOztJQUM5QywyQ0FBb0M7O0lBQ3BDLGdEQUF3Qzs7SUFDeEMseUNBQWtDOztJQUNsQyw2Q0FBc0M7O0lBQ3RDLDhDQUF1Qzs7SUFDdkMsdUNBQWdDOztJQUNoQyxxREFBOEM7O0lBQzlDLGtEQUEyQzs7SUFDM0MsNkNBQW1FOztJQUNuRSx3Q0FBaUM7O0lBQ2pDLCtDQUF3Qzs7SUFDeEMsNkNBQXNDOztJQUN0QyxtQ0FBNEI7O0lBQzVCLGtDQUEyQjs7SUFDM0IsMkNBQXdEOztJQUN4RCxrREFBMkM7O0lBQzNDLDZDQUFzQzs7SUFDdEMsOENBQXVDOztJQUN2QyxzQ0FBK0I7O0lBQy9CLHFDQUE2Qjs7SUFDN0IscUNBQzBFOztJQUMxRSxtQ0FBMkI7O0lBQzNCLHFDQUE2Qjs7SUFFN0IsbUNBQW1DOztJQUVuQyw4Q0FBc0M7O0lBQ3RDLDJDQUFpQzs7SUFDakMsd0NBQXdDOztJQTJDdEMsc0NBQTJDOztJQUMzQywrQ0FBb0Q7O0lBQ3BELCtCQUFvQzs7SUFFcEMsd0NBQStEOzs7OztJQUUvRCxrQ0FBcUI7Ozs7O0lBR3JCLGlDQUFvQjs7Ozs7SUFDcEIsMENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LFxuICBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZVNpbmdsZXRvbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtc2luZ2xldG9uLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JPcHRpb25zfSBmcm9tICcuL2VkaXRvci1vcHRpb25zLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvclNjcm9sbGJhck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zJztcbmltcG9ydCB7SUVkaXRvclRoZW1lfSBmcm9tICcuL2VkaXRvci10aGVtZSc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBhbnk7XG5cblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2FqZi1tb25hY28tZWRpdG9yJyxcbiAgc3R5bGVVcmxzOiBbJ21vbmFjby1lZGl0b3IuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnbW9uYWNvLWVkaXRvci5odG1sJyxcbiAgaG9zdDoge1xuICAgICcod2luZG93OnJlc2l6ZSknOiAnb25SZXNpemUoJGV2ZW50KSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBBamZNb25hY29FZGl0b3IgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFyaWFMYWJlbD86IHN0cmluZztcbiAgQElucHV0KCkgcnVsZXJzPzogbnVtYmVyW107XG4gIEBJbnB1dCgpIHdvcmRTZXBhcmF0b3JzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3Rpb25DbGlwYm9hcmQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdE9uTGluZU51bWJlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lTnVtYmVyc01pbkNoYXJzPzogbnVtYmVyO1xuICBASW5wdXQoKSBnbHlwaE1hcmdpbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVEZWNvcmF0aW9uc1dpZHRoPzogbnVtYmVyO1xuICBASW5wdXQoKSByZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nPzogbnVtYmVyO1xuICBASW5wdXQoKSByb3VuZGVkU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdGhlbWU/OiBJRWRpdG9yVGhlbWU7XG4gIEBJbnB1dCgpIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2Nyb2xsYmFyPzogSUVkaXRvclNjcm9sbGJhck9wdGlvbnM7XG4gIEBJbnB1dCgpIG92ZXJ2aWV3UnVsZXJMYW5lcz86IG51bWJlcjtcbiAgQElucHV0KCkgY3Vyc29yQmxpbmtpbmc/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vdXNlV2hlZWxab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY3Vyc29yU3R5bGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRMaWdhdHVyZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSBkaXNhYmxlVHJhbnNsYXRlM2Q/OiBib29sZWFuO1xuICBASW5wdXQoKSBoaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2Nyb2xsQmV5b25kTGFzdExpbmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvbWF0aWNMYXlvdXQ/OiBib29sZWFuO1xuICBASW5wdXQoKSB3cmFwcGluZ0NvbHVtbj86IG51bWJlcjtcbiAgQElucHV0KCkgd29yZFdyYXA/OiBib29sZWFuO1xuICBASW5wdXQoKSB3cmFwcGluZ0luZGVudD86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdG9wUmVuZGVyaW5nTGluZUFmdGVyPzogbnVtYmVyO1xuICBASW5wdXQoKSBob3Zlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvbnRleHRtZW51PzogYm9vbGVhbjtcbiAgQElucHV0KCkgbW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5PzogbnVtYmVyO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcXVpY2tTdWdnZXN0aW9uc0RlbGF5PzogbnVtYmVyO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJIaW50cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGljb25zSW5TdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9DbG9zaW5nQnJhY2tldHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb3JtYXRPblR5cGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBzdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc25pcHBldFN1Z2dlc3Rpb25zPzogJ3RvcCcgfCAnYm90dG9tJyB8ICdpbmxpbmUnIHwgJ25vbmUnO1xuICBASW5wdXQoKSB0YWJDb21wbGV0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgd29yZEJhc2VkU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3Rpb25IaWdobGlnaHQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBjb2RlTGVucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvbGRpbmc/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJXaGl0ZXNwYWNlPzogJ25vbmUnIHwgJ2JvdW5kYXJ5JyB8ICdhbGwnO1xuICBASW5wdXQoKSByZW5kZXJDb250cm9sQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlckluZGVudEd1aWRlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlckxpbmVIaWdobGlnaHQ/OiBib29sZWFuO1xuICBASW5wdXQoKSB1c2VUYWJTdG9wcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRXZWlnaHQ/OiAnbm9ybWFsJyB8ICdib2xkJyB8ICdib2xkZXInIHwgJ2xpZ2h0ZXInIHwgJ2luaXRpYWwnIHwgJ2luaGVyaXQnXG4gICAgfCAnMTAwJyB8ICcyMDAnIHwgJzMwMCcgfCAnNDAwJyB8ICc1MDAnIHwgJzYwMCcgfCAnNzAwJyB8ICc4MDAnIHwgJzkwMCc7XG4gIEBJbnB1dCgpIGZvbnRTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW5lSGVpZ2h0PzogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2U7XG5cbiAgQElucHV0KCkgZGlzYWJsZUF1dG9jb21wbGV0ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Zvcm1hdE9uTG9hZCA9IHRydWU7XG4gIEBJbnB1dCgpIG1vbmFjb0xpYlBhdGggPSAndnMvbG9hZGVyLmpzJztcblxuICBASW5wdXQoKSBzZXQgdmFsdWVUb0NvbXBhcmUodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICB0aGlzLl92YWx1ZVRvQ29tcGFyZSA9IHY7XG5cbiAgICAgIGlmICh0aGlzLl92YWx1ZVRvQ29tcGFyZSA9PT0gdm9pZCAwIHx8ICF0aGlzLl92YWx1ZVRvQ29tcGFyZSB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IgJiYgdGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSAhPT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX3ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpID09PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAgIEBJbnB1dCgpIHNldCB2YWx1ZSh2OiBzdHJpbmcpIHtcbiAgICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHY7XG5cbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlID09PSB2b2lkIDAgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGhpcy5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgdmFsdWVUb0NvbXBhcmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdlZGl0b3InLCB7c3RhdGljOiB0cnVlfSkgZWRpdG9yQ29udGVudDogRWxlbWVudFJlZjtcblxuICAgIHByaXZhdGUgX2VkaXRvcjogYW55O1xuICAgIGdldCBlZGl0b3IoKTogYW55IHsgcmV0dXJuIHRoaXMuX2VkaXRvcjsgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWUgPSAnJztcbiAgICBwcml2YXRlIF92YWx1ZVRvQ29tcGFyZSA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbG9hZCBNb25hY28gbGliXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBsZXQgb25Hb3RBbWRMb2FkZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBMb2FkIG1vbmFjb1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1aXJlKFsndnMvZWRpdG9yL2VkaXRvci5tYWluJ10sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0TW9uYWNvKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBMb2FkIEFNRCBsb2FkZXIgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmICghKDxhbnk+d2luZG93KS5yZXF1aXJlKSB7XG4gICAgICAgICAgICBsZXQgbG9hZGVyU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBsb2FkZXJTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgbG9hZGVyU2NyaXB0LnNyYyA9IHRoaXMubW9uYWNvTGliUGF0aDtcbiAgICAgICAgICAgIGxvYWRlclNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Hb3RBbWRMb2FkZXIpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXJTY3JpcHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb25Hb3RBbWRMb2FkZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwb24gZGVzdHJ1Y3Rpb24gb2YgdGhlIGNvbXBvbmVudCB3ZSBtYWtlIHN1cmUgdG8gZGlzcG9zZSBib3RoIHRoZSBlZGl0b3IgYW5kXG4gICAgICogdGhlIGV4dHJhIGxpYnMgdGhhdCB3ZSBtaWdodCd2ZSBsb2FkZWRcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IHtbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IudXBkYXRlT3B0aW9ucyh0aGlzLl9nZXRPcHRpb25zKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGUgbW9uYWNvIGNvbXBvbmVuZW50XG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IuZGlzcG9zZSgpO1xuICAgICAgICAgICAgd2hpbGUgKG15RGl2Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICBpZiAobXlEaXYuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbXlEaXYucmVtb3ZlQ2hpbGQobXlEaXYuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiB3aW5kb3dzIGlzIHJlc2l6ZWRcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBvblJlc2l6ZShfZXZlbnQ6IGFueSkge1xuICAgICAgICAvLyBNYW51YWxseSBzZXQgbW9uYWNvIHNpemUgYmVjYXVzZSBNb25hY29FZGl0b3IgZG9lc24ndCB3b3JrIHdpdGggRmxleGJveCBjc3NcbiAgICAgICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAobXlEaXYgPT0gbnVsbCB8fCBteURpdi5wYXJlbnRFbGVtZW50ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIG15RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgaGVpZ2h0OiAke215RGl2LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4OyB3aWR0aDoxMDAlO2ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgZWRpdG9yXG4gICAgICogSXMgY2FsbGVkIG9uY2UgbW9uYWNvIGxpYnJhcnkgaXMgYXZhaWxhYmxlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaW5pdE1vbmFjbygpIHtcbiAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICB0aGlzLmluaXQuZW1pdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRFZGl0b3IoKSB7XG4gICAgICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuXG4gICAgICAgIGlmICghdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvciA9IHRoaXMuX2luaXRTaW1wbGVFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdERpZmZFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFudWFsbHkgc2V0IG1vbmFjbyBzaXplIGJlY2F1c2UgTW9uYWNvRWRpdG9yIGRvZXNuJ3Qgd29yayB3aXRoIEZsZXhib3ggY3NzXG4gICAgICAgIGlmIChteURpdiAhPSBudWxsICYmIG15RGl2LnBhcmVudEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgIG15RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgaGVpZ2h0OiAke215RGl2LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4OyB3aWR0aDoxMDAlO2ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdCBBdXRvY29tcGxldGUgaWYgbm90IGRpc2FibGVkXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKS5pbml0QXV0b0NvbXBsZXRlKHRoaXMubGFuZ3VhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2hlbiBjb250ZW50IGlzIGxvYWRlZCwgc2Nyb2xsQ2hhbmdlIGlzIHRyaWdlcnJlZCxcbiAgICAgICAgLy8gV2UgY2FuIG9ubHkgZm9yY2UgYXV0byBmb3JtYXQgYXQgdGhpcyBtb21lbnQsIGJlY2F1c2UgZWRpdG9yXG4gICAgICAgIC8vIGRvZXNuJ3QgaGF2ZSBvblJlYWR5IGV2ZW50IC4uLlxuICAgICAgICAvLyAgdGhpcy5fZWRpdG9yLm9uRGlkU2Nyb2xsQ2hhbmdlKCgpID0+IHtcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLmF1dG9Gb3JtYXRPbkxvYWQgJiYgIXRoaXMuX2lzQ29kZUZvcm1hdHRlZCkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRBY3Rpb24oJ2VkaXRvci5hY3Rpb24uZm9ybWF0JykucnVuKCk7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5faXNDb2RlRm9ybWF0dGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIHNpbXBsZSBlZGl0b3JcbiAgICAgICAgdGhpcy5fZ2V0T3JpZ2luYWxNb2RlbCgpLm9uRGlkQ2hhbmdlQ29udGVudCgoX2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbDogc3RyaW5nID0gdGhpcy5fZ2V0T3JpZ2luYWxNb2RlbCgpLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fdmFsdWUgIT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKG5ld1ZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgb24gY2hhbmdlIGV2ZW50IGZvciBkaWZmIGVkaXRvclxuICAgICAgICBpZiAodGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld1ZhbDogc3RyaW5nID0gdGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWVUb0NvbXBhcmUobmV3VmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHNpbXBsZSBlZGl0b3IgdGV4dFxuICAgICAqIEBwYXJhbSBkaXZcbiAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgX2luaXRTaW1wbGVFZGl0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgICAgIHJldHVybiBtb25hY28uZWRpdG9yLmNyZWF0ZShkaXYsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGRpZmYgZWRpdG9yIHRvIGNvbXBhcmUgdHdvIHN0cmluZyAoX3ZhbHVlIGFuZCBfdmFsdWVUb0NvbXBhcmUpXG4gICAgICogQHBhcmFtIGRpdlxuICAgICAqL1xuICAgIHByaXZhdGUgX2luaXREaWZmRWRpdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuICAgICAgICBsZXQgb3JpZ2luYWxNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWUsIHRoaXMubGFuZ3VhZ2UpO1xuICAgICAgICBsZXQgbW9kaWZpZWRNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWVUb0NvbXBhcmUsIHRoaXMubGFuZ3VhZ2UpO1xuXG4gICAgICAgIGxldCBkaWZmRWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGVEaWZmRWRpdG9yKGRpdiwgb3B0aW9ucyk7XG4gICAgICAgIGRpZmZFZGl0b3Iuc2V0TW9kZWwoe1xuICAgICAgICAgICAgbW9kaWZpZWQ6IG1vZGlmaWVkTW9kZWwsXG4gICAgICAgICAgICBvcmlnaW5hbDogb3JpZ2luYWxNb2RlbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRpZmZFZGl0b3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0T3B0aW9ucygpOiBJRWRpdG9yT3B0aW9ucyB7XG4gICAgICAgIGxldCBvcHRpb25zOiBJRWRpdG9yT3B0aW9ucyA9IG5ldyBJRWRpdG9yT3B0aW9ucygpO1xuICAgICAgICBvcHRpb25zLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlciA9IHRoaXMuZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyO1xuICAgICAgICBvcHRpb25zLmFyaWFMYWJlbCA9IHRoaXMuYXJpYUxhYmVsO1xuICAgICAgICBvcHRpb25zLnJ1bGVycyA9IHRoaXMucnVsZXJzO1xuICAgICAgICBvcHRpb25zLndvcmRTZXBhcmF0b3JzID0gdGhpcy53b3JkU2VwYXJhdG9ycztcbiAgICAgICAgb3B0aW9ucy5zZWxlY3Rpb25DbGlwYm9hcmQgPSB0aGlzLnNlbGVjdGlvbkNsaXBib2FyZDtcbiAgICAgICAgb3B0aW9ucy5saW5lTnVtYmVycyA9IHRoaXMubGluZU51bWJlcnM7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0T25MaW5lTnVtYmVycyA9IHRoaXMuc2VsZWN0T25MaW5lTnVtYmVycztcbiAgICAgICAgb3B0aW9ucy5saW5lTnVtYmVyc01pbkNoYXJzID0gdGhpcy5saW5lTnVtYmVyc01pbkNoYXJzO1xuICAgICAgICBvcHRpb25zLmdseXBoTWFyZ2luID0gdGhpcy5nbHlwaE1hcmdpbjtcbiAgICAgICAgb3B0aW9ucy5saW5lRGVjb3JhdGlvbnNXaWR0aCA9IHRoaXMubGluZURlY29yYXRpb25zV2lkdGg7XG4gICAgICAgIG9wdGlvbnMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZyA9IHRoaXMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZztcbiAgICAgICAgb3B0aW9ucy5yb3VuZGVkU2VsZWN0aW9uID0gdGhpcy5yb3VuZGVkU2VsZWN0aW9uO1xuICAgICAgICBvcHRpb25zLnRoZW1lID0gdGhpcy50aGVtZTtcbiAgICAgICAgb3B0aW9ucy5yZWFkT25seSA9IHRoaXMucmVhZE9ubHk7XG4gICAgICAgIG9wdGlvbnMuc2Nyb2xsYmFyID0gdGhpcy5zY3JvbGxiYXI7XG4gICAgICAgIG9wdGlvbnMub3ZlcnZpZXdSdWxlckxhbmVzID0gdGhpcy5vdmVydmlld1J1bGVyTGFuZXM7XG4gICAgICAgIG9wdGlvbnMuY3Vyc29yQmxpbmtpbmcgPSB0aGlzLmN1cnNvckJsaW5raW5nO1xuICAgICAgICBvcHRpb25zLm1vdXNlV2hlZWxab29tID0gdGhpcy5tb3VzZVdoZWVsWm9vbTtcbiAgICAgICAgb3B0aW9ucy5jdXJzb3JTdHlsZSA9IHRoaXMuY3Vyc29yU3R5bGU7XG4gICAgICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgICAgICBvcHRpb25zLmZvbnRMaWdhdHVyZXMgPSB0aGlzLmZvbnRMaWdhdHVyZXM7XG4gICAgICAgIG9wdGlvbnMuZGlzYWJsZVRyYW5zbGF0ZTNkID0gdGhpcy5kaXNhYmxlVHJhbnNsYXRlM2Q7XG4gICAgICAgIG9wdGlvbnMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlciA9IHRoaXMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcjtcbiAgICAgICAgb3B0aW9ucy5zY3JvbGxCZXlvbmRMYXN0TGluZSA9IHRoaXMuc2Nyb2xsQmV5b25kTGFzdExpbmU7XG4gICAgICAgIG9wdGlvbnMuYXV0b21hdGljTGF5b3V0ID0gdGhpcy5hdXRvbWF0aWNMYXlvdXQ7XG4gICAgICAgIG9wdGlvbnMud3JhcHBpbmdDb2x1bW4gPSB0aGlzLndyYXBwaW5nQ29sdW1uO1xuICAgICAgICBvcHRpb25zLndvcmRXcmFwID0gdGhpcy53b3JkV3JhcDtcbiAgICAgICAgb3B0aW9ucy53cmFwcGluZ0luZGVudCA9IHRoaXMud3JhcHBpbmdJbmRlbnQ7XG4gICAgICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzO1xuICAgICAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM7XG4gICAgICAgIG9wdGlvbnMud29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzO1xuICAgICAgICBvcHRpb25zLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXIgPSB0aGlzLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI7XG4gICAgICAgIG9wdGlvbnMuaG92ZXIgPSB0aGlzLmhvdmVyO1xuICAgICAgICBvcHRpb25zLmNvbnRleHRtZW51ID0gdGhpcy5jb250ZXh0bWVudTtcbiAgICAgICAgb3B0aW9ucy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHkgPSB0aGlzLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eTtcbiAgICAgICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zID0gdGhpcy5xdWlja1N1Z2dlc3Rpb25zO1xuICAgICAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnNEZWxheSA9IHRoaXMucXVpY2tTdWdnZXN0aW9uc0RlbGF5O1xuICAgICAgICBvcHRpb25zLnBhcmFtZXRlckhpbnRzID0gdGhpcy5wYXJhbWV0ZXJIaW50cztcbiAgICAgICAgb3B0aW9ucy5pY29uc0luU3VnZ2VzdGlvbnMgPSB0aGlzLmljb25zSW5TdWdnZXN0aW9ucztcbiAgICAgICAgb3B0aW9ucy5hdXRvQ2xvc2luZ0JyYWNrZXRzID0gdGhpcy5hdXRvQ2xvc2luZ0JyYWNrZXRzO1xuICAgICAgICBvcHRpb25zLmZvcm1hdE9uVHlwZSA9IHRoaXMuZm9ybWF0T25UeXBlO1xuICAgICAgICBvcHRpb25zLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzID0gdGhpcy5zdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycztcbiAgICAgICAgb3B0aW9ucy5hY2NlcHRTdWdnZXN0aW9uT25FbnRlciA9IHRoaXMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI7XG4gICAgICAgIG9wdGlvbnMuc25pcHBldFN1Z2dlc3Rpb25zID0gdGhpcy5zbmlwcGV0U3VnZ2VzdGlvbnM7XG4gICAgICAgIG9wdGlvbnMudGFiQ29tcGxldGlvbiA9IHRoaXMudGFiQ29tcGxldGlvbjtcbiAgICAgICAgb3B0aW9ucy53b3JkQmFzZWRTdWdnZXN0aW9ucyA9IHRoaXMud29yZEJhc2VkU3VnZ2VzdGlvbnM7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0aW9uSGlnaGxpZ2h0ID0gdGhpcy5zZWxlY3Rpb25IaWdobGlnaHQ7XG4gICAgICAgIG9wdGlvbnMuY29kZUxlbnMgPSB0aGlzLmNvZGVMZW5zO1xuICAgICAgICBvcHRpb25zLmZvbGRpbmcgPSB0aGlzLmZvbGRpbmc7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyV2hpdGVzcGFjZSA9IHRoaXMucmVuZGVyV2hpdGVzcGFjZTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycyA9IHRoaXMucmVuZGVyQ29udHJvbENoYXJhY3RlcnM7XG4gICAgICAgIG9wdGlvbnMucmVuZGVySW5kZW50R3VpZGVzID0gdGhpcy5yZW5kZXJJbmRlbnRHdWlkZXM7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyTGluZUhpZ2hsaWdodCA9IHRoaXMucmVuZGVyTGluZUhpZ2hsaWdodDtcbiAgICAgICAgb3B0aW9ucy51c2VUYWJTdG9wcyA9IHRoaXMudXNlVGFiU3RvcHM7XG4gICAgICAgIG9wdGlvbnMuZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseTtcbiAgICAgICAgb3B0aW9ucy5mb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0O1xuICAgICAgICBvcHRpb25zLmZvbnRTaXplID0gdGhpcy5mb250U2l6ZTtcbiAgICAgICAgb3B0aW9ucy5saW5lSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgICAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICAgIG9wdGlvbnMubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgICAgLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKCg8YW55Pm9wdGlvbnMpW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBkZWxldGUgKDxhbnk+b3B0aW9ucylba2V5XTsgLy8gUmVtb3ZlIGFsbCB1bmRlZmluZWQgcHJvcGVydGllc1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVWYWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfdXBkYXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlVmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZVZhbHVlVG9Db21wYXJlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZVRvQ29tcGFyZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZVRvQ29tcGFyZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlVG9Db21wYXJlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE9yaWdpbmFsTW9kZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX2VkaXRvci5nZXRNb2RlbCgpO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLm9yaWdpbmFsID8gbW9kZWwub3JpZ2luYWwgOiBtb2RlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vZGlmaWVkTW9kZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX2VkaXRvci5nZXRNb2RlbCgpO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGVsLm1vZGlmaWVkID8gbW9kZWwubW9kaWZpZWQgOiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19