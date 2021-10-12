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
AjfMonacoEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfMonacoEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
AjfMonacoEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfMonacoEditor, selector: "ajf-monaco-editor", inputs: { experimentalScreenReader: "experimentalScreenReader", ariaLabel: "ariaLabel", rulers: "rulers", wordSeparators: "wordSeparators", selectionClipboard: "selectionClipboard", lineNumbers: "lineNumbers", selectOnLineNumbers: "selectOnLineNumbers", lineNumbersMinChars: "lineNumbersMinChars", glyphMargin: "glyphMargin", lineDecorationsWidth: "lineDecorationsWidth", revealHorizontalRightPadding: "revealHorizontalRightPadding", roundedSelection: "roundedSelection", theme: "theme", readOnly: "readOnly", scrollbar: "scrollbar", overviewRulerLanes: "overviewRulerLanes", cursorBlinking: "cursorBlinking", mouseWheelZoom: "mouseWheelZoom", cursorStyle: "cursorStyle", fontLigatures: "fontLigatures", disableTranslate3d: "disableTranslate3d", hideCursorInOverviewRuler: "hideCursorInOverviewRuler", scrollBeyondLastLine: "scrollBeyondLastLine", automaticLayout: "automaticLayout", wrappingColumn: "wrappingColumn", wordWrap: "wordWrap", wrappingIndent: "wrappingIndent", wordWrapBreakBeforeCharacters: "wordWrapBreakBeforeCharacters", wordWrapBreakAfterCharacters: "wordWrapBreakAfterCharacters", wordWrapBreakObtrusiveCharacters: "wordWrapBreakObtrusiveCharacters", stopRenderingLineAfter: "stopRenderingLineAfter", hover: "hover", contextmenu: "contextmenu", mouseWheelScrollSensitivity: "mouseWheelScrollSensitivity", quickSuggestions: "quickSuggestions", quickSuggestionsDelay: "quickSuggestionsDelay", parameterHints: "parameterHints", iconsInSuggestions: "iconsInSuggestions", autoClosingBrackets: "autoClosingBrackets", formatOnType: "formatOnType", suggestOnTriggerCharacters: "suggestOnTriggerCharacters", acceptSuggestionOnEnter: "acceptSuggestionOnEnter", snippetSuggestions: "snippetSuggestions", tabCompletion: "tabCompletion", wordBasedSuggestions: "wordBasedSuggestions", selectionHighlight: "selectionHighlight", codeLens: "codeLens", folding: "folding", renderWhitespace: "renderWhitespace", renderControlCharacters: "renderControlCharacters", renderIndentGuides: "renderIndentGuides", renderLineHighlight: "renderLineHighlight", useTabStops: "useTabStops", fontFamily: "fontFamily", fontWeight: "fontWeight", fontSize: "fontSize", lineHeight: "lineHeight", language: "language", disableAutocomplete: "disableAutocomplete", autoFormatOnLoad: "autoFormatOnLoad", monacoLibPath: "monacoLibPath", valueToCompare: "valueToCompare", value: "value" }, outputs: { valueChange: "valueChange", valueToCompareChange: "valueToCompareChange", init: "init" }, host: { listeners: { "window:resize": "onResize($event)" } }, viewQueries: [{ propertyName: "editorContent", first: true, predicate: ["editor"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div #editor class=\"ajf-monaco-editor\"></div>\n", styles: ["ajf-monaco-editor{display:flex;align-items:stretch;overflow:hidden}ajf-monaco-editor .ajf-monaco-editor{flex:1 0 auto}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfMonacoEditor, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvci9tb25hY28tZWRpdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBYTVDLE1BQU0sT0FBTyxlQUFlO0lBNEgxQjtRQTVEUyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxjQUFjLENBQUM7UUE2Q3JCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBU3JDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixvQkFBZSxHQUFHLEVBQUUsQ0FBQztJQUVkLENBQUM7SUF6RGhCLElBQ0ksY0FBYyxDQUFDLENBQVM7UUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FB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eEIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRU4sVUFBVTtzQkFEVCxLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFHRixjQUFjO3NCQURqQixLQUFLO2dCQTBCRixLQUFLO3NCQURSLEtBQUs7Z0JBa0JhLFdBQVc7c0JBQTdCLE1BQU07Z0JBQ1ksb0JBQW9CO3NCQUF0QyxNQUFNO2dCQUNZLElBQUk7c0JBQXRCLE1BQU07Z0JBRThCLGFBQWE7c0JBQWpELFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBdXRvQ29tcGxldGVTaW5nbGV0b259IGZyb20gJy4vYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JMYW5ndWFnZX0gZnJvbSAnLi9lZGl0b3ItbGFuZ3VhZ2UtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itb3B0aW9ucy1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JTY3JvbGxiYXJPcHRpb25zfSBmcm9tICcuL2VkaXRvci1zY3JvbGxiYXItb3B0aW9ucyc7XG5pbXBvcnQge0lFZGl0b3JUaGVtZX0gZnJvbSAnLi9lZGl0b3ItdGhlbWUnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogYW55O1xuXG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdhamYtbW9uYWNvLWVkaXRvcicsXG4gIHN0eWxlVXJsczogWydtb25hY28tZWRpdG9yLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ21vbmFjby1lZGl0b3IuaHRtbCcsXG4gIGhvc3Q6IHsnKHdpbmRvdzpyZXNpemUpJzogJ29uUmVzaXplKCRldmVudCknfVxufSlcbmV4cG9ydCBjbGFzcyBBamZNb25hY29FZGl0b3IgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFyaWFMYWJlbD86IHN0cmluZztcbiAgQElucHV0KCkgcnVsZXJzPzogbnVtYmVyW107XG4gIEBJbnB1dCgpIHdvcmRTZXBhcmF0b3JzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3Rpb25DbGlwYm9hcmQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdE9uTGluZU51bWJlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lTnVtYmVyc01pbkNoYXJzPzogbnVtYmVyO1xuICBASW5wdXQoKSBnbHlwaE1hcmdpbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVEZWNvcmF0aW9uc1dpZHRoPzogbnVtYmVyO1xuICBASW5wdXQoKSByZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nPzogbnVtYmVyO1xuICBASW5wdXQoKSByb3VuZGVkU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdGhlbWU/OiBJRWRpdG9yVGhlbWU7XG4gIEBJbnB1dCgpIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2Nyb2xsYmFyPzogSUVkaXRvclNjcm9sbGJhck9wdGlvbnM7XG4gIEBJbnB1dCgpIG92ZXJ2aWV3UnVsZXJMYW5lcz86IG51bWJlcjtcbiAgQElucHV0KCkgY3Vyc29yQmxpbmtpbmc/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vdXNlV2hlZWxab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY3Vyc29yU3R5bGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRMaWdhdHVyZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSBkaXNhYmxlVHJhbnNsYXRlM2Q/OiBib29sZWFuO1xuICBASW5wdXQoKSBoaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2Nyb2xsQmV5b25kTGFzdExpbmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvbWF0aWNMYXlvdXQ/OiBib29sZWFuO1xuICBASW5wdXQoKSB3cmFwcGluZ0NvbHVtbj86IG51bWJlcjtcbiAgQElucHV0KCkgd29yZFdyYXA/OiBib29sZWFuO1xuICBASW5wdXQoKSB3cmFwcGluZ0luZGVudD86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdG9wUmVuZGVyaW5nTGluZUFmdGVyPzogbnVtYmVyO1xuICBASW5wdXQoKSBob3Zlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvbnRleHRtZW51PzogYm9vbGVhbjtcbiAgQElucHV0KCkgbW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5PzogbnVtYmVyO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcXVpY2tTdWdnZXN0aW9uc0RlbGF5PzogbnVtYmVyO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJIaW50cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGljb25zSW5TdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9DbG9zaW5nQnJhY2tldHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb3JtYXRPblR5cGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBzdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc25pcHBldFN1Z2dlc3Rpb25zPzogJ3RvcCd8J2JvdHRvbSd8J2lubGluZSd8J25vbmUnO1xuICBASW5wdXQoKSB0YWJDb21wbGV0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgd29yZEJhc2VkU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3Rpb25IaWdobGlnaHQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBjb2RlTGVucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvbGRpbmc/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJXaGl0ZXNwYWNlPzogJ25vbmUnfCdib3VuZGFyeSd8J2FsbCc7XG4gIEBJbnB1dCgpIHJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVySW5kZW50R3VpZGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyTGluZUhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVzZVRhYlN0b3BzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KClcbiAgZm9udFdlaWdodD86ICdub3JtYWwnfCdib2xkJ3wnYm9sZGVyJ3wnbGlnaHRlcid8J2luaXRpYWwnfCdpbmhlcml0J3wnMTAwJ3wnMjAwJ3wnMzAwJ3wnNDAwJ3wnNTAwJ3xcbiAgICAgICc2MDAnfCc3MDAnfCc4MDAnfCc5MDAnO1xuICBASW5wdXQoKSBmb250U2l6ZT86IG51bWJlcjtcbiAgQElucHV0KCkgbGluZUhlaWdodD86IG51bWJlcjtcblxuICBASW5wdXQoKSBsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVBdXRvY29tcGxldGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9Gb3JtYXRPbkxvYWQgPSB0cnVlO1xuICBASW5wdXQoKSBtb25hY29MaWJQYXRoID0gJ3ZzL2xvYWRlci5qcyc7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlVG9Db21wYXJlKHY6IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZVRvQ29tcGFyZSkge1xuICAgICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2O1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgPT09IHZvaWQgMCB8fCAhdGhpcy5fdmFsdWVUb0NvbXBhcmUgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yICYmIHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgIT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl92YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSA9PT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHY6IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWUgPT09IHZvaWQgMCB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgIT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlVG9Db21wYXJlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaW5pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdlZGl0b3InLCB7c3RhdGljOiB0cnVlfSkgZWRpdG9yQ29udGVudDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9lZGl0b3I6IGFueTtcbiAgZ2V0IGVkaXRvcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZSA9ICcnO1xuICBwcml2YXRlIF92YWx1ZVRvQ29tcGFyZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogbG9hZCBNb25hY28gbGliXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgbGV0IG9uR290QW1kTG9hZGVyID0gKCkgPT4ge1xuICAgICAgLy8gTG9hZCBtb25hY29cbiAgICAgICg8YW55PndpbmRvdykucmVxdWlyZShbJ3ZzL2VkaXRvci9lZGl0b3IubWFpbiddLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2luaXRNb25hY28oKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBMb2FkIEFNRCBsb2FkZXIgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLnJlcXVpcmUpIHtcbiAgICAgIGxldCBsb2FkZXJTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIGxvYWRlclNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICBsb2FkZXJTY3JpcHQuc3JjID0gdGhpcy5tb25hY29MaWJQYXRoO1xuICAgICAgbG9hZGVyU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkdvdEFtZExvYWRlcik7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRlclNjcmlwdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uR290QW1kTG9hZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwb24gZGVzdHJ1Y3Rpb24gb2YgdGhlIGNvbXBvbmVudCB3ZSBtYWtlIHN1cmUgdG8gZGlzcG9zZSBib3RoIHRoZSBlZGl0b3IgYW5kXG4gICAqIHRoZSBleHRyYSBsaWJzIHRoYXQgd2UgbWlnaHQndmUgbG9hZGVkXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKF9jaGFuZ2VzOiB7W3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICB0aGlzLl9lZGl0b3IudXBkYXRlT3B0aW9ucyh0aGlzLl9nZXRPcHRpb25zKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBtb25hY28gY29tcG9uZW5lbnRcbiAgICovXG4gIGRpc3Bvc2UoKSB7XG4gICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XG4gICAgICB3aGlsZSAobXlEaXYuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIGlmIChteURpdi5maXJzdENoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICBteURpdi5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyZWQgd2hlbiB3aW5kb3dzIGlzIHJlc2l6ZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvblJlc2l6ZShfZXZlbnQ6IGFueSkge1xuICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBpZiAobXlEaXYgPT0gbnVsbCB8fCBteURpdi5wYXJlbnRFbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBlZGl0b3JcbiAgICogSXMgY2FsbGVkIG9uY2UgbW9uYWNvIGxpYnJhcnkgaXMgYXZhaWxhYmxlXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW9uYWNvKCkge1xuICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICB0aGlzLmluaXQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVkaXRvcigpIHtcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgdGhpcy5kaXNwb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0U2ltcGxlRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdERpZmZFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgIGlmIChteURpdiAhPSBudWxsICYmIG15RGl2LnBhcmVudEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gICAgfVxuXG4gICAgLy8gSW5pdCBBdXRvY29tcGxldGUgaWYgbm90IGRpc2FibGVkXG4gICAgaWYgKCF0aGlzLmRpc2FibGVBdXRvY29tcGxldGUpIHtcbiAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLmluaXRBdXRvQ29tcGxldGUodGhpcy5sYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiBjb250ZW50IGlzIGxvYWRlZCwgc2Nyb2xsQ2hhbmdlIGlzIHRyaWdlcnJlZCxcbiAgICAvLyBXZSBjYW4gb25seSBmb3JjZSBhdXRvIGZvcm1hdCBhdCB0aGlzIG1vbWVudCwgYmVjYXVzZSBlZGl0b3JcbiAgICAvLyBkb2Vzbid0IGhhdmUgb25SZWFkeSBldmVudCAuLi5cbiAgICAvLyAgdGhpcy5fZWRpdG9yLm9uRGlkU2Nyb2xsQ2hhbmdlKCgpID0+IHtcbiAgICAvLyAgICAgaWYgKHRoaXMuYXV0b0Zvcm1hdE9uTG9hZCAmJiAhdGhpcy5faXNDb2RlRm9ybWF0dGVkKSB7XG4gICAgLy8gICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0QWN0aW9uKCdlZGl0b3IuYWN0aW9uLmZvcm1hdCcpLnJ1bigpO1xuICAgIC8vICAgICAgICAgdGhpcy5faXNDb2RlRm9ybWF0dGVkID0gdHJ1ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIHNpbXBsZSBlZGl0b3JcbiAgICB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKG5ld1ZhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3IgZGlmZiBlZGl0b3JcbiAgICBpZiAodGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpKSB7XG4gICAgICB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgIT09IG5ld1ZhbCkge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlVG9Db21wYXJlKG5ld1ZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzaW1wbGUgZWRpdG9yIHRleHRcbiAgICogQHBhcmFtIGRpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdFNpbXBsZUVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICByZXR1cm4gbW9uYWNvLmVkaXRvci5jcmVhdGUoZGl2LCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaWZmIGVkaXRvciB0byBjb21wYXJlIHR3byBzdHJpbmcgKF92YWx1ZSBhbmQgX3ZhbHVlVG9Db21wYXJlKVxuICAgKiBAcGFyYW0gZGl2XG4gICAqL1xuICBwcml2YXRlIF9pbml0RGlmZkVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICBsZXQgb3JpZ2luYWxNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWUsIHRoaXMubGFuZ3VhZ2UpO1xuICAgIGxldCBtb2RpZmllZE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZVRvQ29tcGFyZSwgdGhpcy5sYW5ndWFnZSk7XG5cbiAgICBsZXQgZGlmZkVkaXRvciA9IG1vbmFjby5lZGl0b3IuY3JlYXRlRGlmZkVkaXRvcihkaXYsIG9wdGlvbnMpO1xuICAgIGRpZmZFZGl0b3Iuc2V0TW9kZWwoe1xuICAgICAgbW9kaWZpZWQ6IG1vZGlmaWVkTW9kZWwsXG4gICAgICBvcmlnaW5hbDogb3JpZ2luYWxNb2RlbCxcbiAgICB9KTtcblxuICAgIHJldHVybiBkaWZmRWRpdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3B0aW9ucygpOiBJRWRpdG9yT3B0aW9ucyB7XG4gICAgbGV0IG9wdGlvbnM6IElFZGl0b3JPcHRpb25zID0gbmV3IElFZGl0b3JPcHRpb25zKCk7XG4gICAgb3B0aW9ucy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXIgPSB0aGlzLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcjtcbiAgICBvcHRpb25zLmFyaWFMYWJlbCA9IHRoaXMuYXJpYUxhYmVsO1xuICAgIG9wdGlvbnMucnVsZXJzID0gdGhpcy5ydWxlcnM7XG4gICAgb3B0aW9ucy53b3JkU2VwYXJhdG9ycyA9IHRoaXMud29yZFNlcGFyYXRvcnM7XG4gICAgb3B0aW9ucy5zZWxlY3Rpb25DbGlwYm9hcmQgPSB0aGlzLnNlbGVjdGlvbkNsaXBib2FyZDtcbiAgICBvcHRpb25zLmxpbmVOdW1iZXJzID0gdGhpcy5saW5lTnVtYmVycztcbiAgICBvcHRpb25zLnNlbGVjdE9uTGluZU51bWJlcnMgPSB0aGlzLnNlbGVjdE9uTGluZU51bWJlcnM7XG4gICAgb3B0aW9ucy5saW5lTnVtYmVyc01pbkNoYXJzID0gdGhpcy5saW5lTnVtYmVyc01pbkNoYXJzO1xuICAgIG9wdGlvbnMuZ2x5cGhNYXJnaW4gPSB0aGlzLmdseXBoTWFyZ2luO1xuICAgIG9wdGlvbnMubGluZURlY29yYXRpb25zV2lkdGggPSB0aGlzLmxpbmVEZWNvcmF0aW9uc1dpZHRoO1xuICAgIG9wdGlvbnMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZyA9IHRoaXMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZztcbiAgICBvcHRpb25zLnJvdW5kZWRTZWxlY3Rpb24gPSB0aGlzLnJvdW5kZWRTZWxlY3Rpb247XG4gICAgb3B0aW9ucy50aGVtZSA9IHRoaXMudGhlbWU7XG4gICAgb3B0aW9ucy5yZWFkT25seSA9IHRoaXMucmVhZE9ubHk7XG4gICAgb3B0aW9ucy5zY3JvbGxiYXIgPSB0aGlzLnNjcm9sbGJhcjtcbiAgICBvcHRpb25zLm92ZXJ2aWV3UnVsZXJMYW5lcyA9IHRoaXMub3ZlcnZpZXdSdWxlckxhbmVzO1xuICAgIG9wdGlvbnMuY3Vyc29yQmxpbmtpbmcgPSB0aGlzLmN1cnNvckJsaW5raW5nO1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgIG9wdGlvbnMuY3Vyc29yU3R5bGUgPSB0aGlzLmN1cnNvclN0eWxlO1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgIG9wdGlvbnMuZm9udExpZ2F0dXJlcyA9IHRoaXMuZm9udExpZ2F0dXJlcztcbiAgICBvcHRpb25zLmRpc2FibGVUcmFuc2xhdGUzZCA9IHRoaXMuZGlzYWJsZVRyYW5zbGF0ZTNkO1xuICAgIG9wdGlvbnMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlciA9IHRoaXMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcjtcbiAgICBvcHRpb25zLnNjcm9sbEJleW9uZExhc3RMaW5lID0gdGhpcy5zY3JvbGxCZXlvbmRMYXN0TGluZTtcbiAgICBvcHRpb25zLmF1dG9tYXRpY0xheW91dCA9IHRoaXMuYXV0b21hdGljTGF5b3V0O1xuICAgIG9wdGlvbnMud3JhcHBpbmdDb2x1bW4gPSB0aGlzLndyYXBwaW5nQ29sdW1uO1xuICAgIG9wdGlvbnMud29yZFdyYXAgPSB0aGlzLndvcmRXcmFwO1xuICAgIG9wdGlvbnMud3JhcHBpbmdJbmRlbnQgPSB0aGlzLndyYXBwaW5nSW5kZW50O1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXIgPSB0aGlzLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI7XG4gICAgb3B0aW9ucy5ob3ZlciA9IHRoaXMuaG92ZXI7XG4gICAgb3B0aW9ucy5jb250ZXh0bWVudSA9IHRoaXMuY29udGV4dG1lbnU7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHkgPSB0aGlzLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eTtcbiAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnMgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zRGVsYXkgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnNEZWxheTtcbiAgICBvcHRpb25zLnBhcmFtZXRlckhpbnRzID0gdGhpcy5wYXJhbWV0ZXJIaW50cztcbiAgICBvcHRpb25zLmljb25zSW5TdWdnZXN0aW9ucyA9IHRoaXMuaWNvbnNJblN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9IHRoaXMuYXV0b0Nsb3NpbmdCcmFja2V0cztcbiAgICBvcHRpb25zLmZvcm1hdE9uVHlwZSA9IHRoaXMuZm9ybWF0T25UeXBlO1xuICAgIG9wdGlvbnMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnMgPSB0aGlzLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXIgPSB0aGlzLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyO1xuICAgIG9wdGlvbnMuc25pcHBldFN1Z2dlc3Rpb25zID0gdGhpcy5zbmlwcGV0U3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy50YWJDb21wbGV0aW9uID0gdGhpcy50YWJDb21wbGV0aW9uO1xuICAgIG9wdGlvbnMud29yZEJhc2VkU3VnZ2VzdGlvbnMgPSB0aGlzLndvcmRCYXNlZFN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMuc2VsZWN0aW9uSGlnaGxpZ2h0ID0gdGhpcy5zZWxlY3Rpb25IaWdobGlnaHQ7XG4gICAgb3B0aW9ucy5jb2RlTGVucyA9IHRoaXMuY29kZUxlbnM7XG4gICAgb3B0aW9ucy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nO1xuICAgIG9wdGlvbnMucmVuZGVyV2hpdGVzcGFjZSA9IHRoaXMucmVuZGVyV2hpdGVzcGFjZTtcbiAgICBvcHRpb25zLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzID0gdGhpcy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLnJlbmRlckluZGVudEd1aWRlcyA9IHRoaXMucmVuZGVySW5kZW50R3VpZGVzO1xuICAgIG9wdGlvbnMucmVuZGVyTGluZUhpZ2hsaWdodCA9IHRoaXMucmVuZGVyTGluZUhpZ2hsaWdodDtcbiAgICBvcHRpb25zLnVzZVRhYlN0b3BzID0gdGhpcy51c2VUYWJTdG9wcztcbiAgICBvcHRpb25zLmZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHk7XG4gICAgb3B0aW9ucy5mb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0O1xuICAgIG9wdGlvbnMuZm9udFNpemUgPSB0aGlzLmZvbnRTaXplO1xuICAgIG9wdGlvbnMubGluZUhlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2U7XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoPGFueT5vcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlICg8YW55Pm9wdGlvbnMpW2tleV07ICAvLyBSZW1vdmUgYWxsIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlVmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVZhbHVlVG9Db21wYXJlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlVG9Db21wYXJlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JpZ2luYWxNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgIHJldHVybiBtb2RlbC5vcmlnaW5hbCA/IG1vZGVsLm9yaWdpbmFsIDogbW9kZWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TW9kaWZpZWRNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgIHJldHVybiBtb2RlbC5tb2RpZmllZCA/IG1vZGVsLm1vZGlmaWVkIDogbnVsbDtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgI2VkaXRvciBjbGFzcz1cImFqZi1tb25hY28tZWRpdG9yXCI+PC9kaXY+XG4iXX0=