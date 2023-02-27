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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { AutoCompleteSingleton } from './autocomplete-singleton-model';
import { IEditorOptions } from './editor-options-model';
import * as i0 from "@angular/core";
export class AjfMonacoEditor {
    constructor() {
        this.language = 'en';
        this.disableAutocomplete = false;
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
                    myDiv.firstChild.remove();
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
        Object.keys(options).forEach(key => {
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
AjfMonacoEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMonacoEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfMonacoEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfMonacoEditor, selector: "ajf-monaco-editor", inputs: { experimentalScreenReader: "experimentalScreenReader", ariaLabel: "ariaLabel", rulers: "rulers", wordSeparators: "wordSeparators", selectionClipboard: "selectionClipboard", lineNumbers: "lineNumbers", selectOnLineNumbers: "selectOnLineNumbers", lineNumbersMinChars: "lineNumbersMinChars", glyphMargin: "glyphMargin", lineDecorationsWidth: "lineDecorationsWidth", revealHorizontalRightPadding: "revealHorizontalRightPadding", roundedSelection: "roundedSelection", theme: "theme", readOnly: "readOnly", scrollbar: "scrollbar", overviewRulerLanes: "overviewRulerLanes", cursorBlinking: "cursorBlinking", mouseWheelZoom: "mouseWheelZoom", cursorStyle: "cursorStyle", fontLigatures: "fontLigatures", disableTranslate3d: "disableTranslate3d", hideCursorInOverviewRuler: "hideCursorInOverviewRuler", scrollBeyondLastLine: "scrollBeyondLastLine", automaticLayout: "automaticLayout", wrappingColumn: "wrappingColumn", wordWrap: "wordWrap", wrappingIndent: "wrappingIndent", wordWrapBreakBeforeCharacters: "wordWrapBreakBeforeCharacters", wordWrapBreakAfterCharacters: "wordWrapBreakAfterCharacters", wordWrapBreakObtrusiveCharacters: "wordWrapBreakObtrusiveCharacters", stopRenderingLineAfter: "stopRenderingLineAfter", hover: "hover", contextmenu: "contextmenu", mouseWheelScrollSensitivity: "mouseWheelScrollSensitivity", quickSuggestions: "quickSuggestions", quickSuggestionsDelay: "quickSuggestionsDelay", parameterHints: "parameterHints", iconsInSuggestions: "iconsInSuggestions", autoClosingBrackets: "autoClosingBrackets", formatOnType: "formatOnType", suggestOnTriggerCharacters: "suggestOnTriggerCharacters", acceptSuggestionOnEnter: "acceptSuggestionOnEnter", snippetSuggestions: "snippetSuggestions", tabCompletion: "tabCompletion", wordBasedSuggestions: "wordBasedSuggestions", selectionHighlight: "selectionHighlight", codeLens: "codeLens", folding: "folding", renderWhitespace: "renderWhitespace", renderControlCharacters: "renderControlCharacters", renderIndentGuides: "renderIndentGuides", renderLineHighlight: "renderLineHighlight", useTabStops: "useTabStops", fontFamily: "fontFamily", fontWeight: "fontWeight", fontSize: "fontSize", lineHeight: "lineHeight", language: "language", disableAutocomplete: "disableAutocomplete", autoFormatOnLoad: "autoFormatOnLoad", monacoLibPath: "monacoLibPath", valueToCompare: "valueToCompare", value: "value" }, outputs: { valueChange: "valueChange", valueToCompareChange: "valueToCompareChange", init: "init" }, host: { listeners: { "window:resize": "onResize($event)" } }, viewQueries: [{ propertyName: "editorContent", first: true, predicate: ["editor"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div #editor class=\"ajf-monaco-editor\"></div>\n", styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMonacoEditor, decorators: [{
            type: Component,
            args: [{ encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, selector: 'ajf-monaco-editor', host: { '(window:resize)': 'onResize($event)' }, template: "<div #editor class=\"ajf-monaco-editor\"></div>\n", styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { experimentalScreenReader: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], rulers: [{
                type: Input
            }], wordSeparators: [{
                type: Input
            }], selectionClipboard: [{
                type: Input
            }], lineNumbers: [{
                type: Input
            }], selectOnLineNumbers: [{
                type: Input
            }], lineNumbersMinChars: [{
                type: Input
            }], glyphMargin: [{
                type: Input
            }], lineDecorationsWidth: [{
                type: Input
            }], revealHorizontalRightPadding: [{
                type: Input
            }], roundedSelection: [{
                type: Input
            }], theme: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], scrollbar: [{
                type: Input
            }], overviewRulerLanes: [{
                type: Input
            }], cursorBlinking: [{
                type: Input
            }], mouseWheelZoom: [{
                type: Input
            }], cursorStyle: [{
                type: Input
            }], fontLigatures: [{
                type: Input
            }], disableTranslate3d: [{
                type: Input
            }], hideCursorInOverviewRuler: [{
                type: Input
            }], scrollBeyondLastLine: [{
                type: Input
            }], automaticLayout: [{
                type: Input
            }], wrappingColumn: [{
                type: Input
            }], wordWrap: [{
                type: Input
            }], wrappingIndent: [{
                type: Input
            }], wordWrapBreakBeforeCharacters: [{
                type: Input
            }], wordWrapBreakAfterCharacters: [{
                type: Input
            }], wordWrapBreakObtrusiveCharacters: [{
                type: Input
            }], stopRenderingLineAfter: [{
                type: Input
            }], hover: [{
                type: Input
            }], contextmenu: [{
                type: Input
            }], mouseWheelScrollSensitivity: [{
                type: Input
            }], quickSuggestions: [{
                type: Input
            }], quickSuggestionsDelay: [{
                type: Input
            }], parameterHints: [{
                type: Input
            }], iconsInSuggestions: [{
                type: Input
            }], autoClosingBrackets: [{
                type: Input
            }], formatOnType: [{
                type: Input
            }], suggestOnTriggerCharacters: [{
                type: Input
            }], acceptSuggestionOnEnter: [{
                type: Input
            }], snippetSuggestions: [{
                type: Input
            }], tabCompletion: [{
                type: Input
            }], wordBasedSuggestions: [{
                type: Input
            }], selectionHighlight: [{
                type: Input
            }], codeLens: [{
                type: Input
            }], folding: [{
                type: Input
            }], renderWhitespace: [{
                type: Input
            }], renderControlCharacters: [{
                type: Input
            }], renderIndentGuides: [{
                type: Input
            }], renderLineHighlight: [{
                type: Input
            }], useTabStops: [{
                type: Input
            }], fontFamily: [{
                type: Input
            }], fontWeight: [{
                type: Input
            }], fontSize: [{
                type: Input
            }], lineHeight: [{
                type: Input
            }], language: [{
                type: Input
            }], disableAutocomplete: [{
                type: Input
            }], autoFormatOnLoad: [{
                type: Input
            }], monacoLibPath: [{
                type: Input
            }], valueToCompare: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], valueToCompareChange: [{
                type: Output
            }], init: [{
                type: Output
            }], editorContent: [{
                type: ViewChild,
                args: ['editor', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL21vbmFjby1lZGl0b3Ivc3JjL21vbmFjby1lZGl0b3IudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL3NyYy9tb25hY28tZWRpdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBZXRELE1BQU0sT0FBTyxlQUFlO0lBMEkxQjtRQS9EUyxhQUFRLEdBQW9CLElBQUksQ0FBQztRQUVqQyx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQUcsY0FBYyxDQUFDO1FBNkNyQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVNyQyxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osb0JBQWUsR0FBRyxFQUFFLENBQUM7SUFFZCxDQUFDO0lBekRoQixJQUNJLGNBQWMsQ0FBQyxDQUFTO1FBQzFCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFFekIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtB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QUFjO3NCQUF0QixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0csdUJBQXVCO3NCQUEvQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFTixVQUFVO3NCQURULEtBQUs7Z0JBaUJHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFHRixjQUFjO3NCQURqQixLQUFLO2dCQTBCRixLQUFLO3NCQURSLEtBQUs7Z0JBa0JhLFdBQVc7c0JBQTdCLE1BQU07Z0JBQ1ksb0JBQW9CO3NCQUF0QyxNQUFNO2dCQUNZLElBQUk7c0JBQXRCLE1BQU07Z0JBRThCLGFBQWE7c0JBQWpELFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXV0b0NvbXBsZXRlU2luZ2xldG9ufSBmcm9tICcuL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yTGFuZ3VhZ2V9IGZyb20gJy4vZWRpdG9yLWxhbmd1YWdlLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLW9wdGlvbnMtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yU2Nyb2xsYmFyT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itc2Nyb2xsYmFyLW9wdGlvbnMnO1xuaW1wb3J0IHtJRWRpdG9yVGhlbWV9IGZyb20gJy4vZWRpdG9yLXRoZW1lJztcblxuZGVjbGFyZSBjb25zdCBtb25hY286IGFueTtcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2FqZi1tb25hY28tZWRpdG9yJyxcbiAgc3R5bGVVcmxzOiBbJ21vbmFjby1lZGl0b3Iuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJ21vbmFjby1lZGl0b3IuaHRtbCcsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBob3N0OiB7Jyh3aW5kb3c6cmVzaXplKSc6ICdvblJlc2l6ZSgkZXZlbnQpJ30sXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1vbmFjb0VkaXRvciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBydWxlcnM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgd29yZFNlcGFyYXRvcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0T25MaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzTWluQ2hhcnM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGdseXBoTWFyZ2luPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdW5kZWRTZWxlY3Rpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB0aGVtZT86IElFZGl0b3JUaGVtZTtcbiAgQElucHV0KCkgcmVhZE9ubHk/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxiYXI/OiBJRWRpdG9yU2Nyb2xsYmFyT3B0aW9ucztcbiAgQElucHV0KCkgb3ZlcnZpZXdSdWxlckxhbmVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjdXJzb3JCbGlua2luZz86IHN0cmluZztcbiAgQElucHV0KCkgbW91c2VXaGVlbFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcbiAgQElucHV0KCkgZm9udExpZ2F0dXJlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxCZXlvbmRMYXN0TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9tYXRpY0xheW91dD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nQ29sdW1uPzogbnVtYmVyO1xuICBASW5wdXQoKSB3b3JkV3JhcD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nSW5kZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGhvdmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zRGVsYXk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBhcmFtZXRlckhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaWNvbnNJblN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Nsb3NpbmdCcmFja2V0cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcm1hdE9uVHlwZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJyB8ICdib3R0b20nIHwgJ2lubGluZScgfCAnbm9uZSc7XG4gIEBJbnB1dCgpIHRhYkNvbXBsZXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB3b3JkQmFzZWRTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9sZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldoaXRlc3BhY2U/OiAnbm9uZScgfCAnYm91bmRhcnknIHwgJ2FsbCc7XG4gIEBJbnB1dCgpIHJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVySW5kZW50R3VpZGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyTGluZUhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVzZVRhYlN0b3BzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KClcbiAgZm9udFdlaWdodD86XG4gICAgfCAnbm9ybWFsJ1xuICAgIHwgJ2JvbGQnXG4gICAgfCAnYm9sZGVyJ1xuICAgIHwgJ2xpZ2h0ZXInXG4gICAgfCAnaW5pdGlhbCdcbiAgICB8ICdpbmhlcml0J1xuICAgIHwgJzEwMCdcbiAgICB8ICcyMDAnXG4gICAgfCAnMzAwJ1xuICAgIHwgJzQwMCdcbiAgICB8ICc1MDAnXG4gICAgfCAnNjAwJ1xuICAgIHwgJzcwMCdcbiAgICB8ICc4MDAnXG4gICAgfCAnOTAwJztcbiAgQElucHV0KCkgZm9udFNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVIZWlnaHQ/OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZSA9ICdlbic7XG5cbiAgQElucHV0KCkgZGlzYWJsZUF1dG9jb21wbGV0ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhdXRvRm9ybWF0T25Mb2FkID0gdHJ1ZTtcbiAgQElucHV0KCkgbW9uYWNvTGliUGF0aCA9ICd2cy9sb2FkZXIuanMnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZVRvQ29tcGFyZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlID09PSB2b2lkIDAgfHwgIXRoaXMuX3ZhbHVlVG9Db21wYXJlIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgPT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlID09PSB2b2lkIDAgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZVRvQ29tcGFyZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnZWRpdG9yJywge3N0YXRpYzogdHJ1ZX0pIGVkaXRvckNvbnRlbnQhOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuICBnZXQgZWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlID0gJyc7XG4gIHByaXZhdGUgX3ZhbHVlVG9Db21wYXJlID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBsb2FkIE1vbmFjbyBsaWJcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBsZXQgb25Hb3RBbWRMb2FkZXIgPSAoKSA9PiB7XG4gICAgICAvLyBMb2FkIG1vbmFjb1xuICAgICAgKDxhbnk+d2luZG93KS5yZXF1aXJlKFsndnMvZWRpdG9yL2VkaXRvci5tYWluJ10sICgpID0+IHtcbiAgICAgICAgdGhpcy5faW5pdE1vbmFjbygpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIExvYWQgQU1EIGxvYWRlciBpZiBuZWNlc3NhcnlcbiAgICBpZiAoISg8YW55PndpbmRvdykucmVxdWlyZSkge1xuICAgICAgbGV0IGxvYWRlclNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgbG9hZGVyU2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgIGxvYWRlclNjcmlwdC5zcmMgPSB0aGlzLm1vbmFjb0xpYlBhdGg7XG4gICAgICBsb2FkZXJTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uR290QW1kTG9hZGVyKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyU2NyaXB0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25Hb3RBbWRMb2FkZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBvbiBkZXN0cnVjdGlvbiBvZiB0aGUgY29tcG9uZW50IHdlIG1ha2Ugc3VyZSB0byBkaXNwb3NlIGJvdGggdGhlIGVkaXRvciBhbmRcbiAgICogdGhlIGV4dHJhIGxpYnMgdGhhdCB3ZSBtaWdodCd2ZSBsb2FkZWRcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IHtbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIHRoaXMuX2VkaXRvci51cGRhdGVPcHRpb25zKHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIG1vbmFjbyBjb21wb25lbmVudFxuICAgKi9cbiAgZGlzcG9zZSgpIHtcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLmRpc3Bvc2UoKTtcbiAgICAgIHdoaWxlIChteURpdi5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgaWYgKG15RGl2LmZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgIG15RGl2LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJlZCB3aGVuIHdpbmRvd3MgaXMgcmVzaXplZFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uUmVzaXplKF9ldmVudDogYW55KSB7XG4gICAgLy8gTWFudWFsbHkgc2V0IG1vbmFjbyBzaXplIGJlY2F1c2UgTW9uYWNvRWRpdG9yIGRvZXNuJ3Qgd29yayB3aXRoIEZsZXhib3ggY3NzXG4gICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChteURpdiA9PSBudWxsIHx8IG15RGl2LnBhcmVudEVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBteURpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGhlaWdodDogJHtteURpdi5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weDsgd2lkdGg6MTAwJTtgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGVkaXRvclxuICAgKiBJcyBjYWxsZWQgb25jZSBtb25hY28gbGlicmFyeSBpcyBhdmFpbGFibGVcbiAgICovXG4gIHByaXZhdGUgX2luaXRNb25hY28oKSB7XG4gICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgIHRoaXMuaW5pdC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RWRpdG9yKCkge1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnMoKTtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcblxuICAgIGlmICghdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgIHRoaXMuX2VkaXRvciA9IHRoaXMuX2luaXRTaW1wbGVFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0RGlmZkVkaXRvcihteURpdiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gTWFudWFsbHkgc2V0IG1vbmFjbyBzaXplIGJlY2F1c2UgTW9uYWNvRWRpdG9yIGRvZXNuJ3Qgd29yayB3aXRoIEZsZXhib3ggY3NzXG4gICAgaWYgKG15RGl2ICE9IG51bGwgJiYgbXlEaXYucGFyZW50RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBteURpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGhlaWdodDogJHtteURpdi5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weDsgd2lkdGg6MTAwJTtgKTtcbiAgICB9XG5cbiAgICAvLyBJbml0IEF1dG9jb21wbGV0ZSBpZiBub3QgZGlzYWJsZWRcbiAgICBpZiAoIXRoaXMuZGlzYWJsZUF1dG9jb21wbGV0ZSkge1xuICAgICAgQXV0b0NvbXBsZXRlU2luZ2xldG9uLmdldEluc3RhbmNlKCkuaW5pdEF1dG9Db21wbGV0ZSh0aGlzLmxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIGNvbnRlbnQgaXMgbG9hZGVkLCBzY3JvbGxDaGFuZ2UgaXMgdHJpZ2VycmVkLFxuICAgIC8vIFdlIGNhbiBvbmx5IGZvcmNlIGF1dG8gZm9ybWF0IGF0IHRoaXMgbW9tZW50LCBiZWNhdXNlIGVkaXRvclxuICAgIC8vIGRvZXNuJ3QgaGF2ZSBvblJlYWR5IGV2ZW50IC4uLlxuICAgIC8vICB0aGlzLl9lZGl0b3Iub25EaWRTY3JvbGxDaGFuZ2UoKCkgPT4ge1xuICAgIC8vICAgICBpZiAodGhpcy5hdXRvRm9ybWF0T25Mb2FkICYmICF0aGlzLl9pc0NvZGVGb3JtYXR0ZWQpIHtcbiAgICAvLyAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRBY3Rpb24oJ2VkaXRvci5hY3Rpb24uZm9ybWF0JykucnVuKCk7XG4gICAgLy8gICAgICAgICB0aGlzLl9pc0NvZGVGb3JtYXR0ZWQgPSB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3Igc2ltcGxlIGVkaXRvclxuICAgIHRoaXMuX2dldE9yaWdpbmFsTW9kZWwoKS5vbkRpZENoYW5nZUNvbnRlbnQoKF9lOiBhbnkpID0+IHtcbiAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE9yaWdpbmFsTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWUobmV3VmFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFRyaWdnZXIgb24gY2hhbmdlIGV2ZW50IGZvciBkaWZmIGVkaXRvclxuICAgIGlmICh0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkpIHtcbiAgICAgIHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5vbkRpZENoYW5nZUNvbnRlbnQoKF9lOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IG5ld1ZhbDogc3RyaW5nID0gdGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpLmdldFZhbHVlKCk7XG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVRvQ29tcGFyZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWVUb0NvbXBhcmUobmV3VmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHNpbXBsZSBlZGl0b3IgdGV4dFxuICAgKiBAcGFyYW0gZGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBwcml2YXRlIF9pbml0U2ltcGxlRWRpdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuICAgIHJldHVybiBtb25hY28uZWRpdG9yLmNyZWF0ZShkaXYsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRpZmYgZWRpdG9yIHRvIGNvbXBhcmUgdHdvIHN0cmluZyAoX3ZhbHVlIGFuZCBfdmFsdWVUb0NvbXBhcmUpXG4gICAqIEBwYXJhbSBkaXZcbiAgICovXG4gIHByaXZhdGUgX2luaXREaWZmRWRpdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuICAgIGxldCBvcmlnaW5hbE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZSwgdGhpcy5sYW5ndWFnZSk7XG4gICAgbGV0IG1vZGlmaWVkTW9kZWwgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuX3ZhbHVlVG9Db21wYXJlLCB0aGlzLmxhbmd1YWdlKTtcblxuICAgIGxldCBkaWZmRWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGVEaWZmRWRpdG9yKGRpdiwgb3B0aW9ucyk7XG4gICAgZGlmZkVkaXRvci5zZXRNb2RlbCh7XG4gICAgICBtb2RpZmllZDogbW9kaWZpZWRNb2RlbCxcbiAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbE1vZGVsLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpZmZFZGl0b3I7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPcHRpb25zKCk6IElFZGl0b3JPcHRpb25zIHtcbiAgICBsZXQgb3B0aW9uczogSUVkaXRvck9wdGlvbnMgPSBuZXcgSUVkaXRvck9wdGlvbnMoKTtcbiAgICBvcHRpb25zLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlciA9IHRoaXMuZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyO1xuICAgIG9wdGlvbnMuYXJpYUxhYmVsID0gdGhpcy5hcmlhTGFiZWw7XG4gICAgb3B0aW9ucy5ydWxlcnMgPSB0aGlzLnJ1bGVycztcbiAgICBvcHRpb25zLndvcmRTZXBhcmF0b3JzID0gdGhpcy53b3JkU2VwYXJhdG9ycztcbiAgICBvcHRpb25zLnNlbGVjdGlvbkNsaXBib2FyZCA9IHRoaXMuc2VsZWN0aW9uQ2xpcGJvYXJkO1xuICAgIG9wdGlvbnMubGluZU51bWJlcnMgPSB0aGlzLmxpbmVOdW1iZXJzO1xuICAgIG9wdGlvbnMuc2VsZWN0T25MaW5lTnVtYmVycyA9IHRoaXMuc2VsZWN0T25MaW5lTnVtYmVycztcbiAgICBvcHRpb25zLmxpbmVOdW1iZXJzTWluQ2hhcnMgPSB0aGlzLmxpbmVOdW1iZXJzTWluQ2hhcnM7XG4gICAgb3B0aW9ucy5nbHlwaE1hcmdpbiA9IHRoaXMuZ2x5cGhNYXJnaW47XG4gICAgb3B0aW9ucy5saW5lRGVjb3JhdGlvbnNXaWR0aCA9IHRoaXMubGluZURlY29yYXRpb25zV2lkdGg7XG4gICAgb3B0aW9ucy5yZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nID0gdGhpcy5yZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nO1xuICAgIG9wdGlvbnMucm91bmRlZFNlbGVjdGlvbiA9IHRoaXMucm91bmRlZFNlbGVjdGlvbjtcbiAgICBvcHRpb25zLnRoZW1lID0gdGhpcy50aGVtZTtcbiAgICBvcHRpb25zLnJlYWRPbmx5ID0gdGhpcy5yZWFkT25seTtcbiAgICBvcHRpb25zLnNjcm9sbGJhciA9IHRoaXMuc2Nyb2xsYmFyO1xuICAgIG9wdGlvbnMub3ZlcnZpZXdSdWxlckxhbmVzID0gdGhpcy5vdmVydmlld1J1bGVyTGFuZXM7XG4gICAgb3B0aW9ucy5jdXJzb3JCbGlua2luZyA9IHRoaXMuY3Vyc29yQmxpbmtpbmc7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsWm9vbSA9IHRoaXMubW91c2VXaGVlbFpvb207XG4gICAgb3B0aW9ucy5jdXJzb3JTdHlsZSA9IHRoaXMuY3Vyc29yU3R5bGU7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsWm9vbSA9IHRoaXMubW91c2VXaGVlbFpvb207XG4gICAgb3B0aW9ucy5mb250TGlnYXR1cmVzID0gdGhpcy5mb250TGlnYXR1cmVzO1xuICAgIG9wdGlvbnMuZGlzYWJsZVRyYW5zbGF0ZTNkID0gdGhpcy5kaXNhYmxlVHJhbnNsYXRlM2Q7XG4gICAgb3B0aW9ucy5oaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyID0gdGhpcy5oaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyO1xuICAgIG9wdGlvbnMuc2Nyb2xsQmV5b25kTGFzdExpbmUgPSB0aGlzLnNjcm9sbEJleW9uZExhc3RMaW5lO1xuICAgIG9wdGlvbnMuYXV0b21hdGljTGF5b3V0ID0gdGhpcy5hdXRvbWF0aWNMYXlvdXQ7XG4gICAgb3B0aW9ucy53cmFwcGluZ0NvbHVtbiA9IHRoaXMud3JhcHBpbmdDb2x1bW47XG4gICAgb3B0aW9ucy53b3JkV3JhcCA9IHRoaXMud29yZFdyYXA7XG4gICAgb3B0aW9ucy53cmFwcGluZ0luZGVudCA9IHRoaXMud3JhcHBpbmdJbmRlbnQ7XG4gICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMuc3RvcFJlbmRlcmluZ0xpbmVBZnRlciA9IHRoaXMuc3RvcFJlbmRlcmluZ0xpbmVBZnRlcjtcbiAgICBvcHRpb25zLmhvdmVyID0gdGhpcy5ob3ZlcjtcbiAgICBvcHRpb25zLmNvbnRleHRtZW51ID0gdGhpcy5jb250ZXh0bWVudTtcbiAgICBvcHRpb25zLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eSA9IHRoaXMubW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5O1xuICAgIG9wdGlvbnMucXVpY2tTdWdnZXN0aW9ucyA9IHRoaXMucXVpY2tTdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnNEZWxheSA9IHRoaXMucXVpY2tTdWdnZXN0aW9uc0RlbGF5O1xuICAgIG9wdGlvbnMucGFyYW1ldGVySGludHMgPSB0aGlzLnBhcmFtZXRlckhpbnRzO1xuICAgIG9wdGlvbnMuaWNvbnNJblN1Z2dlc3Rpb25zID0gdGhpcy5pY29uc0luU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5hdXRvQ2xvc2luZ0JyYWNrZXRzID0gdGhpcy5hdXRvQ2xvc2luZ0JyYWNrZXRzO1xuICAgIG9wdGlvbnMuZm9ybWF0T25UeXBlID0gdGhpcy5mb3JtYXRPblR5cGU7XG4gICAgb3B0aW9ucy5zdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycyA9IHRoaXMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy5hY2NlcHRTdWdnZXN0aW9uT25FbnRlciA9IHRoaXMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI7XG4gICAgb3B0aW9ucy5zbmlwcGV0U3VnZ2VzdGlvbnMgPSB0aGlzLnNuaXBwZXRTdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLnRhYkNvbXBsZXRpb24gPSB0aGlzLnRhYkNvbXBsZXRpb247XG4gICAgb3B0aW9ucy53b3JkQmFzZWRTdWdnZXN0aW9ucyA9IHRoaXMud29yZEJhc2VkU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5zZWxlY3Rpb25IaWdobGlnaHQgPSB0aGlzLnNlbGVjdGlvbkhpZ2hsaWdodDtcbiAgICBvcHRpb25zLmNvZGVMZW5zID0gdGhpcy5jb2RlTGVucztcbiAgICBvcHRpb25zLmZvbGRpbmcgPSB0aGlzLmZvbGRpbmc7XG4gICAgb3B0aW9ucy5yZW5kZXJXaGl0ZXNwYWNlID0gdGhpcy5yZW5kZXJXaGl0ZXNwYWNlO1xuICAgIG9wdGlvbnMucmVuZGVyQ29udHJvbENoYXJhY3RlcnMgPSB0aGlzLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMucmVuZGVySW5kZW50R3VpZGVzID0gdGhpcy5yZW5kZXJJbmRlbnRHdWlkZXM7XG4gICAgb3B0aW9ucy5yZW5kZXJMaW5lSGlnaGxpZ2h0ID0gdGhpcy5yZW5kZXJMaW5lSGlnaGxpZ2h0O1xuICAgIG9wdGlvbnMudXNlVGFiU3RvcHMgPSB0aGlzLnVzZVRhYlN0b3BzO1xuICAgIG9wdGlvbnMuZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseTtcbiAgICBvcHRpb25zLmZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHQ7XG4gICAgb3B0aW9ucy5mb250U2l6ZSA9IHRoaXMuZm9udFNpemU7XG4gICAgb3B0aW9ucy5saW5lSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgIG9wdGlvbnMudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICBvcHRpb25zLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICgoPGFueT5vcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlICg8YW55Pm9wdGlvbnMpW2tleV07IC8vIFJlbW92ZSBhbGwgdW5kZWZpbmVkIHByb3BlcnRpZXNcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZVZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVmFsdWVUb0NvbXBhcmUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZVRvQ29tcGFyZSA9IHZhbHVlO1xuICAgIHRoaXMudmFsdWVUb0NvbXBhcmVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPcmlnaW5hbE1vZGVsKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIGxldCBtb2RlbCA9IHRoaXMuX2VkaXRvci5nZXRNb2RlbCgpO1xuICAgICAgcmV0dXJuIG1vZGVsLm9yaWdpbmFsID8gbW9kZWwub3JpZ2luYWwgOiBtb2RlbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRNb2RpZmllZE1vZGVsKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIGxldCBtb2RlbCA9IHRoaXMuX2VkaXRvci5nZXRNb2RlbCgpO1xuICAgICAgcmV0dXJuIG1vZGVsLm1vZGlmaWVkID8gbW9kZWwubW9kaWZpZWQgOiBudWxsO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAjZWRpdG9yIGNsYXNzPVwiYWpmLW1vbmFjby1lZGl0b3JcIj48L2Rpdj5cbiJdfQ==