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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { AutoCompleteSingleton } from './autocomplete-singleton-model';
import { IEditorLanguage } from './editor-language-model';
import { IEditorOptions } from './editor-options-model';
import { IEditorTheme } from './editor-theme';
import * as i0 from "@angular/core";
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
AjfMonacoEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfMonacoEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfMonacoEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: AjfMonacoEditor, selector: "ajf-monaco-editor", inputs: { experimentalScreenReader: "experimentalScreenReader", ariaLabel: "ariaLabel", rulers: "rulers", wordSeparators: "wordSeparators", selectionClipboard: "selectionClipboard", lineNumbers: "lineNumbers", selectOnLineNumbers: "selectOnLineNumbers", lineNumbersMinChars: "lineNumbersMinChars", glyphMargin: "glyphMargin", lineDecorationsWidth: "lineDecorationsWidth", revealHorizontalRightPadding: "revealHorizontalRightPadding", roundedSelection: "roundedSelection", theme: "theme", readOnly: "readOnly", scrollbar: "scrollbar", overviewRulerLanes: "overviewRulerLanes", cursorBlinking: "cursorBlinking", mouseWheelZoom: "mouseWheelZoom", cursorStyle: "cursorStyle", fontLigatures: "fontLigatures", disableTranslate3d: "disableTranslate3d", hideCursorInOverviewRuler: "hideCursorInOverviewRuler", scrollBeyondLastLine: "scrollBeyondLastLine", automaticLayout: "automaticLayout", wrappingColumn: "wrappingColumn", wordWrap: "wordWrap", wrappingIndent: "wrappingIndent", wordWrapBreakBeforeCharacters: "wordWrapBreakBeforeCharacters", wordWrapBreakAfterCharacters: "wordWrapBreakAfterCharacters", wordWrapBreakObtrusiveCharacters: "wordWrapBreakObtrusiveCharacters", stopRenderingLineAfter: "stopRenderingLineAfter", hover: "hover", contextmenu: "contextmenu", mouseWheelScrollSensitivity: "mouseWheelScrollSensitivity", quickSuggestions: "quickSuggestions", quickSuggestionsDelay: "quickSuggestionsDelay", parameterHints: "parameterHints", iconsInSuggestions: "iconsInSuggestions", autoClosingBrackets: "autoClosingBrackets", formatOnType: "formatOnType", suggestOnTriggerCharacters: "suggestOnTriggerCharacters", acceptSuggestionOnEnter: "acceptSuggestionOnEnter", snippetSuggestions: "snippetSuggestions", tabCompletion: "tabCompletion", wordBasedSuggestions: "wordBasedSuggestions", selectionHighlight: "selectionHighlight", codeLens: "codeLens", folding: "folding", renderWhitespace: "renderWhitespace", renderControlCharacters: "renderControlCharacters", renderIndentGuides: "renderIndentGuides", renderLineHighlight: "renderLineHighlight", useTabStops: "useTabStops", fontFamily: "fontFamily", fontWeight: "fontWeight", fontSize: "fontSize", lineHeight: "lineHeight", language: "language", disableAutocomplete: "disableAutocomplete", autoFormatOnLoad: "autoFormatOnLoad", monacoLibPath: "monacoLibPath", valueToCompare: "valueToCompare", value: "value" }, outputs: { valueChange: "valueChange", valueToCompareChange: "valueToCompareChange", init: "init" }, host: { listeners: { "window:resize": "onResize($event)" } }, viewQueries: [{ propertyName: "editorContent", first: true, predicate: ["editor"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div #editor class=\"ajf-monaco-editor\"></div>\n", styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfMonacoEditor, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvci9tb25hY28tZWRpdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBWTVDLE1BQU0sT0FBTyxlQUFlO0lBMEkxQjtRQTVEUyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUE2Q3JCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBU3JDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixvQkFBZSxHQUFHLEVBQUUsQ0FBQztJQUVkLENBQUM7SUF6RGhCLElBQ0ksY0FBYyxDQUFDLENBQVM7UUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FB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QUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csdUJBQXVCO3NCQUEvQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVOLFVBQVU7c0JBRFQsS0FBSztnQkFpQkcsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUdGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBMEJGLEtBQUs7c0JBRFIsS0FBSztnQkFrQmEsV0FBVztzQkFBN0IsTUFBTTtnQkFDWSxvQkFBb0I7c0JBQXRDLE1BQU07Z0JBQ1ksSUFBSTtzQkFBdEIsTUFBTTtnQkFFOEIsYUFBYTtzQkFBakQsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBdXRvQ29tcGxldGVTaW5nbGV0b259IGZyb20gJy4vYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JMYW5ndWFnZX0gZnJvbSAnLi9lZGl0b3ItbGFuZ3VhZ2UtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itb3B0aW9ucy1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JTY3JvbGxiYXJPcHRpb25zfSBmcm9tICcuL2VkaXRvci1zY3JvbGxiYXItb3B0aW9ucyc7XG5pbXBvcnQge0lFZGl0b3JUaGVtZX0gZnJvbSAnLi9lZGl0b3ItdGhlbWUnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnYWpmLW1vbmFjby1lZGl0b3InLFxuICBzdHlsZVVybHM6IFsnbW9uYWNvLWVkaXRvci5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdtb25hY28tZWRpdG9yLmh0bWwnLFxuICBob3N0OiB7Jyh3aW5kb3c6cmVzaXplKSc6ICdvblJlc2l6ZSgkZXZlbnQpJ30sXG59KVxuZXhwb3J0IGNsYXNzIEFqZk1vbmFjb0VkaXRvciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBydWxlcnM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgd29yZFNlcGFyYXRvcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0T25MaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzTWluQ2hhcnM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGdseXBoTWFyZ2luPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdW5kZWRTZWxlY3Rpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB0aGVtZT86IElFZGl0b3JUaGVtZTtcbiAgQElucHV0KCkgcmVhZE9ubHk/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxiYXI/OiBJRWRpdG9yU2Nyb2xsYmFyT3B0aW9ucztcbiAgQElucHV0KCkgb3ZlcnZpZXdSdWxlckxhbmVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjdXJzb3JCbGlua2luZz86IHN0cmluZztcbiAgQElucHV0KCkgbW91c2VXaGVlbFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcbiAgQElucHV0KCkgZm9udExpZ2F0dXJlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxCZXlvbmRMYXN0TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9tYXRpY0xheW91dD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nQ29sdW1uPzogbnVtYmVyO1xuICBASW5wdXQoKSB3b3JkV3JhcD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nSW5kZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGhvdmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zRGVsYXk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBhcmFtZXRlckhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaWNvbnNJblN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Nsb3NpbmdCcmFja2V0cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcm1hdE9uVHlwZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJyB8ICdib3R0b20nIHwgJ2lubGluZScgfCAnbm9uZSc7XG4gIEBJbnB1dCgpIHRhYkNvbXBsZXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB3b3JkQmFzZWRTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9sZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldoaXRlc3BhY2U/OiAnbm9uZScgfCAnYm91bmRhcnknIHwgJ2FsbCc7XG4gIEBJbnB1dCgpIHJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVySW5kZW50R3VpZGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyTGluZUhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVzZVRhYlN0b3BzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KClcbiAgZm9udFdlaWdodD86XG4gICAgfCAnbm9ybWFsJ1xuICAgIHwgJ2JvbGQnXG4gICAgfCAnYm9sZGVyJ1xuICAgIHwgJ2xpZ2h0ZXInXG4gICAgfCAnaW5pdGlhbCdcbiAgICB8ICdpbmhlcml0J1xuICAgIHwgJzEwMCdcbiAgICB8ICcyMDAnXG4gICAgfCAnMzAwJ1xuICAgIHwgJzQwMCdcbiAgICB8ICc1MDAnXG4gICAgfCAnNjAwJ1xuICAgIHwgJzcwMCdcbiAgICB8ICc4MDAnXG4gICAgfCAnOTAwJztcbiAgQElucHV0KCkgZm9udFNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVIZWlnaHQ/OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZTtcblxuICBASW5wdXQoKSBkaXNhYmxlQXV0b2NvbXBsZXRlOiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvRm9ybWF0T25Mb2FkID0gdHJ1ZTtcbiAgQElucHV0KCkgbW9uYWNvTGliUGF0aCA9ICd2cy9sb2FkZXIuanMnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZVRvQ29tcGFyZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlID09PSB2b2lkIDAgfHwgIXRoaXMuX3ZhbHVlVG9Db21wYXJlIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgPT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlID09PSB2b2lkIDAgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZVRvQ29tcGFyZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnZWRpdG9yJywge3N0YXRpYzogdHJ1ZX0pIGVkaXRvckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfZWRpdG9yOiBhbnk7XG4gIGdldCBlZGl0b3IoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWUgPSAnJztcbiAgcHJpdmF0ZSBfdmFsdWVUb0NvbXBhcmUgPSAnJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIGxvYWQgTW9uYWNvIGxpYlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGxldCBvbkdvdEFtZExvYWRlciA9ICgpID0+IHtcbiAgICAgIC8vIExvYWQgbW9uYWNvXG4gICAgICAoPGFueT53aW5kb3cpLnJlcXVpcmUoWyd2cy9lZGl0b3IvZWRpdG9yLm1haW4nXSwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9pbml0TW9uYWNvKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTG9hZCBBTUQgbG9hZGVyIGlmIG5lY2Vzc2FyeVxuICAgIGlmICghKDxhbnk+d2luZG93KS5yZXF1aXJlKSB7XG4gICAgICBsZXQgbG9hZGVyU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBsb2FkZXJTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgbG9hZGVyU2NyaXB0LnNyYyA9IHRoaXMubW9uYWNvTGliUGF0aDtcbiAgICAgIGxvYWRlclNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Hb3RBbWRMb2FkZXIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXJTY3JpcHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkdvdEFtZExvYWRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcG9uIGRlc3RydWN0aW9uIG9mIHRoZSBjb21wb25lbnQgd2UgbWFrZSBzdXJlIHRvIGRpc3Bvc2UgYm90aCB0aGUgZWRpdG9yIGFuZFxuICAgKiB0aGUgZXh0cmEgbGlicyB0aGF0IHdlIG1pZ2h0J3ZlIGxvYWRlZFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhfY2hhbmdlczoge1twcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLnVwZGF0ZU9wdGlvbnModGhpcy5fZ2V0T3B0aW9ucygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgbW9uYWNvIGNvbXBvbmVuZW50XG4gICAqL1xuICBkaXNwb3NlKCkge1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICB0aGlzLl9lZGl0b3IuZGlzcG9zZSgpO1xuICAgICAgd2hpbGUgKG15RGl2Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICBpZiAobXlEaXYuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgbXlEaXYuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fZWRpdG9yID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcmVkIHdoZW4gd2luZG93cyBpcyByZXNpemVkXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25SZXNpemUoX2V2ZW50OiBhbnkpIHtcbiAgICAvLyBNYW51YWxseSBzZXQgbW9uYWNvIHNpemUgYmVjYXVzZSBNb25hY29FZGl0b3IgZG9lc24ndCB3b3JrIHdpdGggRmxleGJveCBjc3NcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKG15RGl2ID09IG51bGwgfHwgbXlEaXYucGFyZW50RWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG15RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgaGVpZ2h0OiAke215RGl2LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4OyB3aWR0aDoxMDAlO2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgZWRpdG9yXG4gICAqIElzIGNhbGxlZCBvbmNlIG1vbmFjbyBsaWJyYXJ5IGlzIGF2YWlsYWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdE1vbmFjbygpIHtcbiAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgdGhpcy5pbml0LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFZGl0b3IoKSB7XG4gICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuXG4gICAgaWYgKCF0aGlzLl92YWx1ZVRvQ29tcGFyZSkge1xuICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdFNpbXBsZUVkaXRvcihteURpdiwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VkaXRvciA9IHRoaXMuX2luaXREaWZmRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBNYW51YWxseSBzZXQgbW9uYWNvIHNpemUgYmVjYXVzZSBNb25hY29FZGl0b3IgZG9lc24ndCB3b3JrIHdpdGggRmxleGJveCBjc3NcbiAgICBpZiAobXlEaXYgIT0gbnVsbCAmJiBteURpdi5wYXJlbnRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIG15RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgaGVpZ2h0OiAke215RGl2LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4OyB3aWR0aDoxMDAlO2ApO1xuICAgIH1cblxuICAgIC8vIEluaXQgQXV0b2NvbXBsZXRlIGlmIG5vdCBkaXNhYmxlZFxuICAgIGlmICghdGhpcy5kaXNhYmxlQXV0b2NvbXBsZXRlKSB7XG4gICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKS5pbml0QXV0b0NvbXBsZXRlKHRoaXMubGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8vIFdoZW4gY29udGVudCBpcyBsb2FkZWQsIHNjcm9sbENoYW5nZSBpcyB0cmlnZXJyZWQsXG4gICAgLy8gV2UgY2FuIG9ubHkgZm9yY2UgYXV0byBmb3JtYXQgYXQgdGhpcyBtb21lbnQsIGJlY2F1c2UgZWRpdG9yXG4gICAgLy8gZG9lc24ndCBoYXZlIG9uUmVhZHkgZXZlbnQgLi4uXG4gICAgLy8gIHRoaXMuX2VkaXRvci5vbkRpZFNjcm9sbENoYW5nZSgoKSA9PiB7XG4gICAgLy8gICAgIGlmICh0aGlzLmF1dG9Gb3JtYXRPbkxvYWQgJiYgIXRoaXMuX2lzQ29kZUZvcm1hdHRlZCkge1xuICAgIC8vICAgICAgICAgdGhpcy5fZWRpdG9yLmdldEFjdGlvbignZWRpdG9yLmFjdGlvbi5mb3JtYXQnKS5ydW4oKTtcbiAgICAvLyAgICAgICAgIHRoaXMuX2lzQ29kZUZvcm1hdHRlZCA9IHRydWU7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIC8vIFRyaWdnZXIgb24gY2hhbmdlIGV2ZW50IGZvciBzaW1wbGUgZWRpdG9yXG4gICAgdGhpcy5fZ2V0T3JpZ2luYWxNb2RlbCgpLm9uRGlkQ2hhbmdlQ29udGVudCgoX2U6IGFueSkgPT4ge1xuICAgICAgbGV0IG5ld1ZhbDogc3RyaW5nID0gdGhpcy5fZ2V0T3JpZ2luYWxNb2RlbCgpLmdldFZhbHVlKCk7XG4gICAgICBpZiAodGhpcy5fdmFsdWUgIT09IG5ld1ZhbCkge1xuICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZShuZXdWYWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIGRpZmYgZWRpdG9yXG4gICAgaWYgKHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKSkge1xuICAgICAgdGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpLm9uRGlkQ2hhbmdlQ29udGVudCgoX2U6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZVRvQ29tcGFyZShuZXdWYWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgc2ltcGxlIGVkaXRvciB0ZXh0XG4gICAqIEBwYXJhbSBkaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIHByaXZhdGUgX2luaXRTaW1wbGVFZGl0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgcmV0dXJuIG1vbmFjby5lZGl0b3IuY3JlYXRlKGRpdiwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZGlmZiBlZGl0b3IgdG8gY29tcGFyZSB0d28gc3RyaW5nIChfdmFsdWUgYW5kIF92YWx1ZVRvQ29tcGFyZSlcbiAgICogQHBhcmFtIGRpdlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdERpZmZFZGl0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgbGV0IG9yaWdpbmFsTW9kZWwgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuX3ZhbHVlLCB0aGlzLmxhbmd1YWdlKTtcbiAgICBsZXQgbW9kaWZpZWRNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWVUb0NvbXBhcmUsIHRoaXMubGFuZ3VhZ2UpO1xuXG4gICAgbGV0IGRpZmZFZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IoZGl2LCBvcHRpb25zKTtcbiAgICBkaWZmRWRpdG9yLnNldE1vZGVsKHtcbiAgICAgIG1vZGlmaWVkOiBtb2RpZmllZE1vZGVsLFxuICAgICAgb3JpZ2luYWw6IG9yaWdpbmFsTW9kZWwsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlmZkVkaXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE9wdGlvbnMoKTogSUVkaXRvck9wdGlvbnMge1xuICAgIGxldCBvcHRpb25zOiBJRWRpdG9yT3B0aW9ucyA9IG5ldyBJRWRpdG9yT3B0aW9ucygpO1xuICAgIG9wdGlvbnMuZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyID0gdGhpcy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXI7XG4gICAgb3B0aW9ucy5hcmlhTGFiZWwgPSB0aGlzLmFyaWFMYWJlbDtcbiAgICBvcHRpb25zLnJ1bGVycyA9IHRoaXMucnVsZXJzO1xuICAgIG9wdGlvbnMud29yZFNlcGFyYXRvcnMgPSB0aGlzLndvcmRTZXBhcmF0b3JzO1xuICAgIG9wdGlvbnMuc2VsZWN0aW9uQ2xpcGJvYXJkID0gdGhpcy5zZWxlY3Rpb25DbGlwYm9hcmQ7XG4gICAgb3B0aW9ucy5saW5lTnVtYmVycyA9IHRoaXMubGluZU51bWJlcnM7XG4gICAgb3B0aW9ucy5zZWxlY3RPbkxpbmVOdW1iZXJzID0gdGhpcy5zZWxlY3RPbkxpbmVOdW1iZXJzO1xuICAgIG9wdGlvbnMubGluZU51bWJlcnNNaW5DaGFycyA9IHRoaXMubGluZU51bWJlcnNNaW5DaGFycztcbiAgICBvcHRpb25zLmdseXBoTWFyZ2luID0gdGhpcy5nbHlwaE1hcmdpbjtcbiAgICBvcHRpb25zLmxpbmVEZWNvcmF0aW9uc1dpZHRoID0gdGhpcy5saW5lRGVjb3JhdGlvbnNXaWR0aDtcbiAgICBvcHRpb25zLnJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmcgPSB0aGlzLnJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc7XG4gICAgb3B0aW9ucy5yb3VuZGVkU2VsZWN0aW9uID0gdGhpcy5yb3VuZGVkU2VsZWN0aW9uO1xuICAgIG9wdGlvbnMudGhlbWUgPSB0aGlzLnRoZW1lO1xuICAgIG9wdGlvbnMucmVhZE9ubHkgPSB0aGlzLnJlYWRPbmx5O1xuICAgIG9wdGlvbnMuc2Nyb2xsYmFyID0gdGhpcy5zY3JvbGxiYXI7XG4gICAgb3B0aW9ucy5vdmVydmlld1J1bGVyTGFuZXMgPSB0aGlzLm92ZXJ2aWV3UnVsZXJMYW5lcztcbiAgICBvcHRpb25zLmN1cnNvckJsaW5raW5nID0gdGhpcy5jdXJzb3JCbGlua2luZztcbiAgICBvcHRpb25zLm1vdXNlV2hlZWxab29tID0gdGhpcy5tb3VzZVdoZWVsWm9vbTtcbiAgICBvcHRpb25zLmN1cnNvclN0eWxlID0gdGhpcy5jdXJzb3JTdHlsZTtcbiAgICBvcHRpb25zLm1vdXNlV2hlZWxab29tID0gdGhpcy5tb3VzZVdoZWVsWm9vbTtcbiAgICBvcHRpb25zLmZvbnRMaWdhdHVyZXMgPSB0aGlzLmZvbnRMaWdhdHVyZXM7XG4gICAgb3B0aW9ucy5kaXNhYmxlVHJhbnNsYXRlM2QgPSB0aGlzLmRpc2FibGVUcmFuc2xhdGUzZDtcbiAgICBvcHRpb25zLmhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXIgPSB0aGlzLmhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI7XG4gICAgb3B0aW9ucy5zY3JvbGxCZXlvbmRMYXN0TGluZSA9IHRoaXMuc2Nyb2xsQmV5b25kTGFzdExpbmU7XG4gICAgb3B0aW9ucy5hdXRvbWF0aWNMYXlvdXQgPSB0aGlzLmF1dG9tYXRpY0xheW91dDtcbiAgICBvcHRpb25zLndyYXBwaW5nQ29sdW1uID0gdGhpcy53cmFwcGluZ0NvbHVtbjtcbiAgICBvcHRpb25zLndvcmRXcmFwID0gdGhpcy53b3JkV3JhcDtcbiAgICBvcHRpb25zLndyYXBwaW5nSW5kZW50ID0gdGhpcy53cmFwcGluZ0luZGVudDtcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy5zdG9wUmVuZGVyaW5nTGluZUFmdGVyID0gdGhpcy5zdG9wUmVuZGVyaW5nTGluZUFmdGVyO1xuICAgIG9wdGlvbnMuaG92ZXIgPSB0aGlzLmhvdmVyO1xuICAgIG9wdGlvbnMuY29udGV4dG1lbnUgPSB0aGlzLmNvbnRleHRtZW51O1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5ID0gdGhpcy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk7XG4gICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zID0gdGhpcy5xdWlja1N1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMucXVpY2tTdWdnZXN0aW9uc0RlbGF5ID0gdGhpcy5xdWlja1N1Z2dlc3Rpb25zRGVsYXk7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJIaW50cyA9IHRoaXMucGFyYW1ldGVySGludHM7XG4gICAgb3B0aW9ucy5pY29uc0luU3VnZ2VzdGlvbnMgPSB0aGlzLmljb25zSW5TdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLmF1dG9DbG9zaW5nQnJhY2tldHMgPSB0aGlzLmF1dG9DbG9zaW5nQnJhY2tldHM7XG4gICAgb3B0aW9ucy5mb3JtYXRPblR5cGUgPSB0aGlzLmZvcm1hdE9uVHlwZTtcbiAgICBvcHRpb25zLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzID0gdGhpcy5zdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyID0gdGhpcy5hY2NlcHRTdWdnZXN0aW9uT25FbnRlcjtcbiAgICBvcHRpb25zLnNuaXBwZXRTdWdnZXN0aW9ucyA9IHRoaXMuc25pcHBldFN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMudGFiQ29tcGxldGlvbiA9IHRoaXMudGFiQ29tcGxldGlvbjtcbiAgICBvcHRpb25zLndvcmRCYXNlZFN1Z2dlc3Rpb25zID0gdGhpcy53b3JkQmFzZWRTdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLnNlbGVjdGlvbkhpZ2hsaWdodCA9IHRoaXMuc2VsZWN0aW9uSGlnaGxpZ2h0O1xuICAgIG9wdGlvbnMuY29kZUxlbnMgPSB0aGlzLmNvZGVMZW5zO1xuICAgIG9wdGlvbnMuZm9sZGluZyA9IHRoaXMuZm9sZGluZztcbiAgICBvcHRpb25zLnJlbmRlcldoaXRlc3BhY2UgPSB0aGlzLnJlbmRlcldoaXRlc3BhY2U7XG4gICAgb3B0aW9ucy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycyA9IHRoaXMucmVuZGVyQ29udHJvbENoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy5yZW5kZXJJbmRlbnRHdWlkZXMgPSB0aGlzLnJlbmRlckluZGVudEd1aWRlcztcbiAgICBvcHRpb25zLnJlbmRlckxpbmVIaWdobGlnaHQgPSB0aGlzLnJlbmRlckxpbmVIaWdobGlnaHQ7XG4gICAgb3B0aW9ucy51c2VUYWJTdG9wcyA9IHRoaXMudXNlVGFiU3RvcHM7XG4gICAgb3B0aW9ucy5mb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5O1xuICAgIG9wdGlvbnMuZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodDtcbiAgICBvcHRpb25zLmZvbnRTaXplID0gdGhpcy5mb250U2l6ZTtcbiAgICBvcHRpb25zLmxpbmVIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIG9wdGlvbnMubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xuXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCg8YW55Pm9wdGlvbnMpW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgKDxhbnk+b3B0aW9ucylba2V5XTsgLy8gUmVtb3ZlIGFsbCB1bmRlZmluZWQgcHJvcGVydGllc1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZVZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlVmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVWYWx1ZVRvQ29tcGFyZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZVRvQ29tcGFyZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZVRvQ29tcGFyZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE9yaWdpbmFsTW9kZWwoKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgbGV0IG1vZGVsID0gdGhpcy5fZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICByZXR1cm4gbW9kZWwub3JpZ2luYWwgPyBtb2RlbC5vcmlnaW5hbCA6IG1vZGVsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldE1vZGlmaWVkTW9kZWwoKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgbGV0IG1vZGVsID0gdGhpcy5fZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICByZXR1cm4gbW9kZWwubW9kaWZpZWQgPyBtb2RlbC5tb2RpZmllZCA6IG51bGw7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2ICNlZGl0b3IgY2xhc3M9XCJhamYtbW9uYWNvLWVkaXRvclwiPjwvZGl2PlxuIl19