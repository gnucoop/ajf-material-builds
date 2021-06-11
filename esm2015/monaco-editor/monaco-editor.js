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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFhNUMsTUFBTSxPQUFPLGVBQWU7SUE0SDFCO1FBNURTLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixrQkFBYSxHQUFHLGNBQWMsQ0FBQztRQTZDckIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFTckMsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLG9CQUFlLEdBQUcsRUFBRSxDQUFDO0lBRWQsQ0FBQztJQXpEaEIsSUFDSSxjQUFjLENBQUMsQ0FBUztRQUMxQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1lBRXpCLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM3RSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyx1QkFBdUIsRUFBRTtvQkFDNUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixPQUFPO2lCQUNSO2dCQUVELE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUNsQjtZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyx1QkFBdUIsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ1I7U0FDRjtJQUNILENBQUM7SUFFRCxJQUNJLEtBQUssQ0FBQyxDQUFTO1FBQ2pCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFFaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0MsT0FBTzthQUNSO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLHVCQUF1QixFQUFFO2dCQUM1RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7SUFTRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQU9EOztPQUVHO0lBQ0gsZUFBZTtRQUNiLElBQUksY0FBYyxHQUFHLEdBQUcsRUFBRTtZQUN4QixjQUFjO1lBQ1IsTUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHVCQUF1QixDQUFDLEVBQUUsR0FBRyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFPLE1BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDMUIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxZQUFZLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1lBQ3RDLFlBQVksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN0QyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxjQUFjLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBMkM7UUFDckQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLElBQUksS0FBSyxHQUFtQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUM3RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixPQUFPLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtvQkFDNUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0Y7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsTUFBVztRQUNsQiw4RUFBOEU7UUFDOUUsSUFBSSxLQUFLLEdBQW1CLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzdELElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtZQUNoRCxPQUFPO1NBQ1I7UUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRDs7O09BR0c7SUFDSyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksS0FBSyxHQUFtQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUM3RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsOEVBQThFO1FBQzlFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtZQUNoRCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxpQkFBaUIsQ0FBQyxDQUFDO1NBQzNGO1FBRUQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDN0IscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQscURBQXFEO1FBQ3JELCtEQUErRDtRQUMvRCxpQ0FBaUM7UUFDakMsMENBQTBDO1FBQzFDLDZEQUE2RDtRQUM3RCxnRUFBZ0U7UUFDaEUsd0NBQXdDO1FBQ3hDLFFBQVE7UUFDUixNQUFNO1FBRU4sNENBQTRDO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsMENBQTBDO1FBQzFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTtnQkFDdEQsSUFBSSxNQUFNLEdBQVcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pELElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxNQUFNLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDcEM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxpQkFBaUIsQ0FBQyxHQUFtQixFQUFFLE9BQVk7UUFDekQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGVBQWUsQ0FBQyxHQUFtQixFQUFFLE9BQVk7UUFDdkQsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUUsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkYsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUQsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNsQixRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDLENBQUM7UUFFSCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRU8sV0FBVztRQUNqQixJQUFJLE9BQU8sR0FBbUIsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNuRCxPQUFPLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDckQsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDdkQsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN2RCxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsT0FBTyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN6RCxPQUFPLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDckQsT0FBTyxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztRQUNuRSxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3pELE9BQU8sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMvQyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxPQUFPLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDO1FBQzNFLE9BQU8sQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUM7UUFDekUsT0FBTyxDQUFDLGdDQUFnQyxHQUFHLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQztRQUNqRixPQUFPLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQzdELE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsT0FBTyxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQztRQUN2RSxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pELE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDM0QsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDckQsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN2RCxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDekMsT0FBTyxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQztRQUNyRSxPQUFPLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQy9ELE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDckQsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDekQsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsT0FBTyxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUMvRCxPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDdkQsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbkMsSUFBVSxPQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUNyQyxPQUFhLE9BQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLGtDQUFrQzthQUNoRTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxZQUFZLENBQUMsS0FBYTtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHFCQUFxQixDQUFDLEtBQWE7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUMvQztJQUNILENBQUM7OztZQXRZRixTQUFTLFNBQUM7Z0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUUsbUJBQW1CO2dCQUU3Qiw2REFBaUM7Z0JBQ2pDLElBQUksRUFBRSxFQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFDOzthQUM5Qzs7Ozt1Q0FFRSxLQUFLO3dCQUNMLEtBQUs7cUJBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7MEJBQ0wsS0FBSztrQ0FDTCxLQUFLO2tDQUNMLEtBQUs7MEJBQ0wsS0FBSzttQ0FDTCxLQUFLOzJDQUNMLEtBQUs7K0JBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7d0JBQ0wsS0FBSztpQ0FDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7aUNBQ0wsS0FBSzt3Q0FDTCxLQUFLO21DQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSzs0Q0FDTCxLQUFLOzJDQUNMLEtBQUs7K0NBQ0wsS0FBSztxQ0FDTCxLQUFLO29CQUNMLEtBQUs7MEJBQ0wsS0FBSzswQ0FDTCxLQUFLOytCQUNMLEtBQUs7b0NBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsS0FBSzsyQkFDTCxLQUFLO3lDQUNMLEtBQUs7c0NBQ0wsS0FBSztpQ0FDTCxLQUFLOzRCQUNMLEtBQUs7bUNBQ0wsS0FBSztpQ0FDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSzsrQkFDTCxLQUFLO3NDQUNMLEtBQUs7aUNBQ0wsS0FBSztrQ0FDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3VCQUdMLEtBQUs7eUJBQ0wsS0FBSzt1QkFFTCxLQUFLO2tDQUVMLEtBQUs7K0JBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUVMLEtBQUs7b0JBeUJMLEtBQUs7MEJBa0JMLE1BQU07bUNBQ04sTUFBTTttQkFDTixNQUFNOzRCQUVOLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2UsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0F1dG9Db21wbGV0ZVNpbmdsZXRvbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtc2luZ2xldG9uLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JPcHRpb25zfSBmcm9tICcuL2VkaXRvci1vcHRpb25zLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvclNjcm9sbGJhck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zJztcbmltcG9ydCB7SUVkaXRvclRoZW1lfSBmcm9tICcuL2VkaXRvci10aGVtZSc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBhbnk7XG5cblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2FqZi1tb25hY28tZWRpdG9yJyxcbiAgc3R5bGVVcmxzOiBbJ21vbmFjby1lZGl0b3IuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnbW9uYWNvLWVkaXRvci5odG1sJyxcbiAgaG9zdDogeycod2luZG93OnJlc2l6ZSknOiAnb25SZXNpemUoJGV2ZW50KSd9XG59KVxuZXhwb3J0IGNsYXNzIEFqZk1vbmFjb0VkaXRvciBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXJpYUxhYmVsPzogc3RyaW5nO1xuICBASW5wdXQoKSBydWxlcnM/OiBudW1iZXJbXTtcbiAgQElucHV0KCkgd29yZFNlcGFyYXRvcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0T25MaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVOdW1iZXJzTWluQ2hhcnM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGdseXBoTWFyZ2luPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHJvdW5kZWRTZWxlY3Rpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB0aGVtZT86IElFZGl0b3JUaGVtZTtcbiAgQElucHV0KCkgcmVhZE9ubHk/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxiYXI/OiBJRWRpdG9yU2Nyb2xsYmFyT3B0aW9ucztcbiAgQElucHV0KCkgb3ZlcnZpZXdSdWxlckxhbmVzPzogbnVtYmVyO1xuICBASW5wdXQoKSBjdXJzb3JCbGlua2luZz86IHN0cmluZztcbiAgQElucHV0KCkgbW91c2VXaGVlbFpvb20/OiBib29sZWFuO1xuICBASW5wdXQoKSBjdXJzb3JTdHlsZT86IHN0cmluZztcbiAgQElucHV0KCkgZm9udExpZ2F0dXJlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzY3JvbGxCZXlvbmRMYXN0TGluZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9tYXRpY0xheW91dD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nQ29sdW1uPzogbnVtYmVyO1xuICBASW5wdXQoKSB3b3JkV3JhcD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdyYXBwaW5nSW5kZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGhvdmVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zRGVsYXk/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHBhcmFtZXRlckhpbnRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaWNvbnNJblN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Nsb3NpbmdCcmFja2V0cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvcm1hdE9uVHlwZT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJ3wnYm90dG9tJ3wnaW5saW5lJ3wnbm9uZSc7XG4gIEBJbnB1dCgpIHRhYkNvbXBsZXRpb24/OiBib29sZWFuO1xuICBASW5wdXQoKSB3b3JkQmFzZWRTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdGlvbkhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9sZGluZz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlcldoaXRlc3BhY2U/OiAnbm9uZSd8J2JvdW5kYXJ5J3wnYWxsJztcbiAgQElucHV0KCkgcmVuZGVyQ29udHJvbENoYXJhY3RlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJJbmRlbnRHdWlkZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJMaW5lSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgdXNlVGFiU3RvcHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb250RmFtaWx5Pzogc3RyaW5nO1xuICBASW5wdXQoKVxuICBmb250V2VpZ2h0PzogJ25vcm1hbCd8J2JvbGQnfCdib2xkZXInfCdsaWdodGVyJ3wnaW5pdGlhbCd8J2luaGVyaXQnfCcxMDAnfCcyMDAnfCczMDAnfCc0MDAnfCc1MDAnfFxuICAgICAgJzYwMCd8JzcwMCd8JzgwMCd8JzkwMCc7XG4gIEBJbnB1dCgpIGZvbnRTaXplPzogbnVtYmVyO1xuICBASW5wdXQoKSBsaW5lSGVpZ2h0PzogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2U7XG5cbiAgQElucHV0KCkgZGlzYWJsZUF1dG9jb21wbGV0ZTogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b0Zvcm1hdE9uTG9hZCA9IHRydWU7XG4gIEBJbnB1dCgpIG1vbmFjb0xpYlBhdGggPSAndnMvbG9hZGVyLmpzJztcblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWVUb0NvbXBhcmUodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICB0aGlzLl92YWx1ZVRvQ29tcGFyZSA9IHY7XG5cbiAgICAgIGlmICh0aGlzLl92YWx1ZVRvQ29tcGFyZSA9PT0gdm9pZCAwIHx8ICF0aGlzLl92YWx1ZVRvQ29tcGFyZSB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IgJiYgdGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSAhPT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX3ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpID09PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodjogc3RyaW5nKSB7XG4gICAgaWYgKHYgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHY7XG5cbiAgICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gdm9pZCAwIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSAhPT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VkaXRvci5zZXRWYWx1ZSh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVUb0NvbXBhcmVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBpbml0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ2VkaXRvcicsIHtzdGF0aWM6IHRydWV9KSBlZGl0b3JDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2VkaXRvcjogYW55O1xuICBnZXQgZWRpdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlID0gJyc7XG4gIHByaXZhdGUgX3ZhbHVlVG9Db21wYXJlID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBsb2FkIE1vbmFjbyBsaWJcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBsZXQgb25Hb3RBbWRMb2FkZXIgPSAoKSA9PiB7XG4gICAgICAvLyBMb2FkIG1vbmFjb1xuICAgICAgKDxhbnk+d2luZG93KS5yZXF1aXJlKFsndnMvZWRpdG9yL2VkaXRvci5tYWluJ10sICgpID0+IHtcbiAgICAgICAgdGhpcy5faW5pdE1vbmFjbygpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIExvYWQgQU1EIGxvYWRlciBpZiBuZWNlc3NhcnlcbiAgICBpZiAoISg8YW55PndpbmRvdykucmVxdWlyZSkge1xuICAgICAgbGV0IGxvYWRlclNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgbG9hZGVyU2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgIGxvYWRlclNjcmlwdC5zcmMgPSB0aGlzLm1vbmFjb0xpYlBhdGg7XG4gICAgICBsb2FkZXJTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uR290QW1kTG9hZGVyKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyU2NyaXB0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25Hb3RBbWRMb2FkZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBvbiBkZXN0cnVjdGlvbiBvZiB0aGUgY29tcG9uZW50IHdlIG1ha2Ugc3VyZSB0byBkaXNwb3NlIGJvdGggdGhlIGVkaXRvciBhbmRcbiAgICogdGhlIGV4dHJhIGxpYnMgdGhhdCB3ZSBtaWdodCd2ZSBsb2FkZWRcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IHtbcHJvcEtleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIHRoaXMuX2VkaXRvci51cGRhdGVPcHRpb25zKHRoaXMuX2dldE9wdGlvbnMoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIG1vbmFjbyBjb21wb25lbmVudFxuICAgKi9cbiAgZGlzcG9zZSgpIHtcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLmRpc3Bvc2UoKTtcbiAgICAgIHdoaWxlIChteURpdi5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgaWYgKG15RGl2LmZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgIG15RGl2LnJlbW92ZUNoaWxkKG15RGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyZWQgd2hlbiB3aW5kb3dzIGlzIHJlc2l6ZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvblJlc2l6ZShfZXZlbnQ6IGFueSkge1xuICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBpZiAobXlEaXYgPT0gbnVsbCB8fCBteURpdi5wYXJlbnRFbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBlZGl0b3JcbiAgICogSXMgY2FsbGVkIG9uY2UgbW9uYWNvIGxpYnJhcnkgaXMgYXZhaWxhYmxlXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW9uYWNvKCkge1xuICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICB0aGlzLmluaXQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVkaXRvcigpIHtcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKCk7XG4gICAgdGhpcy5kaXNwb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0U2ltcGxlRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdERpZmZFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgIGlmIChteURpdiAhPSBudWxsICYmIG15RGl2LnBhcmVudEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgbXlEaXYuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBoZWlnaHQ6ICR7bXlEaXYucGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHR9cHg7IHdpZHRoOjEwMCU7YCk7XG4gICAgfVxuXG4gICAgLy8gSW5pdCBBdXRvY29tcGxldGUgaWYgbm90IGRpc2FibGVkXG4gICAgaWYgKCF0aGlzLmRpc2FibGVBdXRvY29tcGxldGUpIHtcbiAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLmluaXRBdXRvQ29tcGxldGUodGhpcy5sYW5ndWFnZSk7XG4gICAgfVxuXG4gICAgLy8gV2hlbiBjb250ZW50IGlzIGxvYWRlZCwgc2Nyb2xsQ2hhbmdlIGlzIHRyaWdlcnJlZCxcbiAgICAvLyBXZSBjYW4gb25seSBmb3JjZSBhdXRvIGZvcm1hdCBhdCB0aGlzIG1vbWVudCwgYmVjYXVzZSBlZGl0b3JcbiAgICAvLyBkb2Vzbid0IGhhdmUgb25SZWFkeSBldmVudCAuLi5cbiAgICAvLyAgdGhpcy5fZWRpdG9yLm9uRGlkU2Nyb2xsQ2hhbmdlKCgpID0+IHtcbiAgICAvLyAgICAgaWYgKHRoaXMuYXV0b0Zvcm1hdE9uTG9hZCAmJiAhdGhpcy5faXNDb2RlRm9ybWF0dGVkKSB7XG4gICAgLy8gICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0QWN0aW9uKCdlZGl0b3IuYWN0aW9uLmZvcm1hdCcpLnJ1bigpO1xuICAgIC8vICAgICAgICAgdGhpcy5faXNDb2RlRm9ybWF0dGVkID0gdHJ1ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIHNpbXBsZSBlZGl0b3JcbiAgICB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRPcmlnaW5hbE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKG5ld1ZhbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3IgZGlmZiBlZGl0b3JcbiAgICBpZiAodGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpKSB7XG4gICAgICB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkub25EaWRDaGFuZ2VDb250ZW50KChfZTogYW55KSA9PiB7XG4gICAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgIT09IG5ld1ZhbCkge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlVG9Db21wYXJlKG5ld1ZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzaW1wbGUgZWRpdG9yIHRleHRcbiAgICogQHBhcmFtIGRpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdFNpbXBsZUVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICByZXR1cm4gbW9uYWNvLmVkaXRvci5jcmVhdGUoZGl2LCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBkaWZmIGVkaXRvciB0byBjb21wYXJlIHR3byBzdHJpbmcgKF92YWx1ZSBhbmQgX3ZhbHVlVG9Db21wYXJlKVxuICAgKiBAcGFyYW0gZGl2XG4gICAqL1xuICBwcml2YXRlIF9pbml0RGlmZkVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICBsZXQgb3JpZ2luYWxNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWUsIHRoaXMubGFuZ3VhZ2UpO1xuICAgIGxldCBtb2RpZmllZE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZVRvQ29tcGFyZSwgdGhpcy5sYW5ndWFnZSk7XG5cbiAgICBsZXQgZGlmZkVkaXRvciA9IG1vbmFjby5lZGl0b3IuY3JlYXRlRGlmZkVkaXRvcihkaXYsIG9wdGlvbnMpO1xuICAgIGRpZmZFZGl0b3Iuc2V0TW9kZWwoe1xuICAgICAgbW9kaWZpZWQ6IG1vZGlmaWVkTW9kZWwsXG4gICAgICBvcmlnaW5hbDogb3JpZ2luYWxNb2RlbCxcbiAgICB9KTtcblxuICAgIHJldHVybiBkaWZmRWRpdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3B0aW9ucygpOiBJRWRpdG9yT3B0aW9ucyB7XG4gICAgbGV0IG9wdGlvbnM6IElFZGl0b3JPcHRpb25zID0gbmV3IElFZGl0b3JPcHRpb25zKCk7XG4gICAgb3B0aW9ucy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXIgPSB0aGlzLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcjtcbiAgICBvcHRpb25zLmFyaWFMYWJlbCA9IHRoaXMuYXJpYUxhYmVsO1xuICAgIG9wdGlvbnMucnVsZXJzID0gdGhpcy5ydWxlcnM7XG4gICAgb3B0aW9ucy53b3JkU2VwYXJhdG9ycyA9IHRoaXMud29yZFNlcGFyYXRvcnM7XG4gICAgb3B0aW9ucy5zZWxlY3Rpb25DbGlwYm9hcmQgPSB0aGlzLnNlbGVjdGlvbkNsaXBib2FyZDtcbiAgICBvcHRpb25zLmxpbmVOdW1iZXJzID0gdGhpcy5saW5lTnVtYmVycztcbiAgICBvcHRpb25zLnNlbGVjdE9uTGluZU51bWJlcnMgPSB0aGlzLnNlbGVjdE9uTGluZU51bWJlcnM7XG4gICAgb3B0aW9ucy5saW5lTnVtYmVyc01pbkNoYXJzID0gdGhpcy5saW5lTnVtYmVyc01pbkNoYXJzO1xuICAgIG9wdGlvbnMuZ2x5cGhNYXJnaW4gPSB0aGlzLmdseXBoTWFyZ2luO1xuICAgIG9wdGlvbnMubGluZURlY29yYXRpb25zV2lkdGggPSB0aGlzLmxpbmVEZWNvcmF0aW9uc1dpZHRoO1xuICAgIG9wdGlvbnMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZyA9IHRoaXMucmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZztcbiAgICBvcHRpb25zLnJvdW5kZWRTZWxlY3Rpb24gPSB0aGlzLnJvdW5kZWRTZWxlY3Rpb247XG4gICAgb3B0aW9ucy50aGVtZSA9IHRoaXMudGhlbWU7XG4gICAgb3B0aW9ucy5yZWFkT25seSA9IHRoaXMucmVhZE9ubHk7XG4gICAgb3B0aW9ucy5zY3JvbGxiYXIgPSB0aGlzLnNjcm9sbGJhcjtcbiAgICBvcHRpb25zLm92ZXJ2aWV3UnVsZXJMYW5lcyA9IHRoaXMub3ZlcnZpZXdSdWxlckxhbmVzO1xuICAgIG9wdGlvbnMuY3Vyc29yQmxpbmtpbmcgPSB0aGlzLmN1cnNvckJsaW5raW5nO1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgIG9wdGlvbnMuY3Vyc29yU3R5bGUgPSB0aGlzLmN1cnNvclN0eWxlO1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFpvb20gPSB0aGlzLm1vdXNlV2hlZWxab29tO1xuICAgIG9wdGlvbnMuZm9udExpZ2F0dXJlcyA9IHRoaXMuZm9udExpZ2F0dXJlcztcbiAgICBvcHRpb25zLmRpc2FibGVUcmFuc2xhdGUzZCA9IHRoaXMuZGlzYWJsZVRyYW5zbGF0ZTNkO1xuICAgIG9wdGlvbnMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlciA9IHRoaXMuaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcjtcbiAgICBvcHRpb25zLnNjcm9sbEJleW9uZExhc3RMaW5lID0gdGhpcy5zY3JvbGxCZXlvbmRMYXN0TGluZTtcbiAgICBvcHRpb25zLmF1dG9tYXRpY0xheW91dCA9IHRoaXMuYXV0b21hdGljTGF5b3V0O1xuICAgIG9wdGlvbnMud3JhcHBpbmdDb2x1bW4gPSB0aGlzLndyYXBwaW5nQ29sdW1uO1xuICAgIG9wdGlvbnMud29yZFdyYXAgPSB0aGlzLndvcmRXcmFwO1xuICAgIG9wdGlvbnMud3JhcHBpbmdJbmRlbnQgPSB0aGlzLndyYXBwaW5nSW5kZW50O1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXIgPSB0aGlzLnN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI7XG4gICAgb3B0aW9ucy5ob3ZlciA9IHRoaXMuaG92ZXI7XG4gICAgb3B0aW9ucy5jb250ZXh0bWVudSA9IHRoaXMuY29udGV4dG1lbnU7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHkgPSB0aGlzLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eTtcbiAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnMgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zRGVsYXkgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnNEZWxheTtcbiAgICBvcHRpb25zLnBhcmFtZXRlckhpbnRzID0gdGhpcy5wYXJhbWV0ZXJIaW50cztcbiAgICBvcHRpb25zLmljb25zSW5TdWdnZXN0aW9ucyA9IHRoaXMuaWNvbnNJblN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9IHRoaXMuYXV0b0Nsb3NpbmdCcmFja2V0cztcbiAgICBvcHRpb25zLmZvcm1hdE9uVHlwZSA9IHRoaXMuZm9ybWF0T25UeXBlO1xuICAgIG9wdGlvbnMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnMgPSB0aGlzLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXIgPSB0aGlzLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyO1xuICAgIG9wdGlvbnMuc25pcHBldFN1Z2dlc3Rpb25zID0gdGhpcy5zbmlwcGV0U3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy50YWJDb21wbGV0aW9uID0gdGhpcy50YWJDb21wbGV0aW9uO1xuICAgIG9wdGlvbnMud29yZEJhc2VkU3VnZ2VzdGlvbnMgPSB0aGlzLndvcmRCYXNlZFN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMuc2VsZWN0aW9uSGlnaGxpZ2h0ID0gdGhpcy5zZWxlY3Rpb25IaWdobGlnaHQ7XG4gICAgb3B0aW9ucy5jb2RlTGVucyA9IHRoaXMuY29kZUxlbnM7XG4gICAgb3B0aW9ucy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nO1xuICAgIG9wdGlvbnMucmVuZGVyV2hpdGVzcGFjZSA9IHRoaXMucmVuZGVyV2hpdGVzcGFjZTtcbiAgICBvcHRpb25zLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzID0gdGhpcy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLnJlbmRlckluZGVudEd1aWRlcyA9IHRoaXMucmVuZGVySW5kZW50R3VpZGVzO1xuICAgIG9wdGlvbnMucmVuZGVyTGluZUhpZ2hsaWdodCA9IHRoaXMucmVuZGVyTGluZUhpZ2hsaWdodDtcbiAgICBvcHRpb25zLnVzZVRhYlN0b3BzID0gdGhpcy51c2VUYWJTdG9wcztcbiAgICBvcHRpb25zLmZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHk7XG4gICAgb3B0aW9ucy5mb250V2VpZ2h0ID0gdGhpcy5mb250V2VpZ2h0O1xuICAgIG9wdGlvbnMuZm9udFNpemUgPSB0aGlzLmZvbnRTaXplO1xuICAgIG9wdGlvbnMubGluZUhlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICBvcHRpb25zLnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgb3B0aW9ucy5sYW5ndWFnZSA9IHRoaXMubGFuZ3VhZ2U7XG5cbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoPGFueT5vcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlICg8YW55Pm9wdGlvbnMpW2tleV07ICAvLyBSZW1vdmUgYWxsIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlVmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVZhbHVlVG9Db21wYXJlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlVG9Db21wYXJlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JpZ2luYWxNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgIHJldHVybiBtb2RlbC5vcmlnaW5hbCA/IG1vZGVsLm9yaWdpbmFsIDogbW9kZWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TW9kaWZpZWRNb2RlbCgpIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgIHJldHVybiBtb2RlbC5tb2RpZmllZCA/IG1vZGVsLm1vZGlmaWVkIDogbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==