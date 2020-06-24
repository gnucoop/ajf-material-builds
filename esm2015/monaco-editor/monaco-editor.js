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
let AjfMonacoEditor = /** @class */ (() => {
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
    return AjfMonacoEditor;
})();
export { AjfMonacoEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLNUM7SUFBQSxNQVFhLGVBQWU7UUE0SDFCO1lBNURTLHFCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixrQkFBYSxHQUFHLGNBQWMsQ0FBQztZQTZDOUIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDMUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFTNUIsV0FBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBRWQsQ0FBQztRQXpEaEIsSUFDSSxjQUFjLENBQUMsQ0FBUztZQUMxQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztnQkFFekIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVB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ZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBdXRvQ29tcGxldGVTaW5nbGV0b259IGZyb20gJy4vYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JMYW5ndWFnZX0gZnJvbSAnLi9lZGl0b3ItbGFuZ3VhZ2UtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itb3B0aW9ucy1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JTY3JvbGxiYXJPcHRpb25zfSBmcm9tICcuL2VkaXRvci1zY3JvbGxiYXItb3B0aW9ucyc7XG5pbXBvcnQge0lFZGl0b3JUaGVtZX0gZnJvbSAnLi9lZGl0b3ItdGhlbWUnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogYW55O1xuXG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdhamYtbW9uYWNvLWVkaXRvcicsXG4gIHN0eWxlVXJsczogWydtb25hY28tZWRpdG9yLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ21vbmFjby1lZGl0b3IuaHRtbCcsXG4gIGhvc3Q6IHsnKHdpbmRvdzpyZXNpemUpJzogJ29uUmVzaXplKCRldmVudCknfVxufSlcbmV4cG9ydCBjbGFzcyBBamZNb25hY29FZGl0b3IgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFyaWFMYWJlbD86IHN0cmluZztcbiAgQElucHV0KCkgcnVsZXJzPzogbnVtYmVyW107XG4gIEBJbnB1dCgpIHdvcmRTZXBhcmF0b3JzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzZWxlY3Rpb25DbGlwYm9hcmQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlbGVjdE9uTGluZU51bWJlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lTnVtYmVyc01pbkNoYXJzPzogbnVtYmVyO1xuICBASW5wdXQoKSBnbHlwaE1hcmdpbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxpbmVEZWNvcmF0aW9uc1dpZHRoPzogbnVtYmVyO1xuICBASW5wdXQoKSByZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nPzogbnVtYmVyO1xuICBASW5wdXQoKSByb3VuZGVkU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgdGhlbWU/OiBJRWRpdG9yVGhlbWU7XG4gIEBJbnB1dCgpIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2Nyb2xsYmFyPzogSUVkaXRvclNjcm9sbGJhck9wdGlvbnM7XG4gIEBJbnB1dCgpIG92ZXJ2aWV3UnVsZXJMYW5lcz86IG51bWJlcjtcbiAgQElucHV0KCkgY3Vyc29yQmxpbmtpbmc/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vdXNlV2hlZWxab29tPzogYm9vbGVhbjtcbiAgQElucHV0KCkgY3Vyc29yU3R5bGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvbnRMaWdhdHVyZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSBkaXNhYmxlVHJhbnNsYXRlM2Q/OiBib29sZWFuO1xuICBASW5wdXQoKSBoaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2Nyb2xsQmV5b25kTGFzdExpbmU/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvbWF0aWNMYXlvdXQ/OiBib29sZWFuO1xuICBASW5wdXQoKSB3cmFwcGluZ0NvbHVtbj86IG51bWJlcjtcbiAgQElucHV0KCkgd29yZFdyYXA/OiBib29sZWFuO1xuICBASW5wdXQoKSB3cmFwcGluZ0luZGVudD86IHN0cmluZztcbiAgQElucHV0KCkgd29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSBzdG9wUmVuZGVyaW5nTGluZUFmdGVyPzogbnVtYmVyO1xuICBASW5wdXQoKSBob3Zlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvbnRleHRtZW51PzogYm9vbGVhbjtcbiAgQElucHV0KCkgbW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5PzogbnVtYmVyO1xuICBASW5wdXQoKSBxdWlja1N1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcXVpY2tTdWdnZXN0aW9uc0RlbGF5PzogbnVtYmVyO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJIaW50cz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGljb25zSW5TdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9DbG9zaW5nQnJhY2tldHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb3JtYXRPblR5cGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBzdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc25pcHBldFN1Z2dlc3Rpb25zPzogJ3RvcCd8J2JvdHRvbSd8J2lubGluZSd8J25vbmUnO1xuICBASW5wdXQoKSB0YWJDb21wbGV0aW9uPzogYm9vbGVhbjtcbiAgQElucHV0KCkgd29yZEJhc2VkU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3Rpb25IaWdobGlnaHQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBjb2RlTGVucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvbGRpbmc/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJXaGl0ZXNwYWNlPzogJ25vbmUnfCdib3VuZGFyeSd8J2FsbCc7XG4gIEBJbnB1dCgpIHJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVySW5kZW50R3VpZGVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyTGluZUhpZ2hsaWdodD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHVzZVRhYlN0b3BzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9udEZhbWlseT86IHN0cmluZztcbiAgQElucHV0KClcbiAgZm9udFdlaWdodD86ICdub3JtYWwnfCdib2xkJ3wnYm9sZGVyJ3wnbGlnaHRlcid8J2luaXRpYWwnfCdpbmhlcml0J3wnMTAwJ3wnMjAwJ3wnMzAwJ3wnNDAwJ3wnNTAwJ3xcbiAgICAgICc2MDAnfCc3MDAnfCc4MDAnfCc5MDAnO1xuICBASW5wdXQoKSBmb250U2l6ZT86IG51bWJlcjtcbiAgQElucHV0KCkgbGluZUhlaWdodD86IG51bWJlcjtcblxuICBASW5wdXQoKSBsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVBdXRvY29tcGxldGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9Gb3JtYXRPbkxvYWQgPSB0cnVlO1xuICBASW5wdXQoKSBtb25hY29MaWJQYXRoID0gJ3ZzL2xvYWRlci5qcyc7XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlVG9Db21wYXJlKHY6IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZVRvQ29tcGFyZSkge1xuICAgICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2O1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgPT09IHZvaWQgMCB8fCAhdGhpcy5fdmFsdWVUb0NvbXBhcmUgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yICYmIHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgIT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl92YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSA9PT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHY6IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2O1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWUgPT09IHZvaWQgMCB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgIT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHZhbHVlVG9Db21wYXJlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaW5pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdlZGl0b3InLCB7c3RhdGljOiB0cnVlfSkgZWRpdG9yQ29udGVudDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9lZGl0b3I6IGFueTtcbiAgZ2V0IGVkaXRvcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZSA9ICcnO1xuICBwcml2YXRlIF92YWx1ZVRvQ29tcGFyZSA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogbG9hZCBNb25hY28gbGliXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgbGV0IG9uR290QW1kTG9hZGVyID0gKCkgPT4ge1xuICAgICAgLy8gTG9hZCBtb25hY29cbiAgICAgICg8YW55PndpbmRvdykucmVxdWlyZShbJ3ZzL2VkaXRvci9lZGl0b3IubWFpbiddLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2luaXRNb25hY28oKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBMb2FkIEFNRCBsb2FkZXIgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKCEoPGFueT53aW5kb3cpLnJlcXVpcmUpIHtcbiAgICAgIGxldCBsb2FkZXJTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIGxvYWRlclNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICBsb2FkZXJTY3JpcHQuc3JjID0gdGhpcy5tb25hY29MaWJQYXRoO1xuICAgICAgbG9hZGVyU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkdvdEFtZExvYWRlcik7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRlclNjcmlwdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uR290QW1kTG9hZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwb24gZGVzdHJ1Y3Rpb24gb2YgdGhlIGNvbXBvbmVudCB3ZSBtYWtlIHN1cmUgdG8gZGlzcG9zZSBib3RoIHRoZSBlZGl0b3IgYW5kXG4gICAqIHRoZSBleHRyYSBsaWJzIHRoYXQgd2UgbWlnaHQndmUgbG9hZGVkXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKF9jaGFuZ2VzOiB7W3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICB0aGlzLl9lZGl0b3IudXBkYXRlT3B0aW9ucyh0aGlzLl9nZXRPcHRpb25zKCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBtb25hY28gY29tcG9uZW5lbnRcbiAgICovXG4gIGRpc3Bvc2UoKSB7XG4gICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XG4gICAgICB3aGlsZSAobXlEaXYuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgIGlmIChteURpdi5maXJzdENoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICBteURpdi5yZW1vdmVDaGlsZChteURpdi5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fZWRpdG9yID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcmVkIHdoZW4gd2luZG93cyBpcyByZXNpemVkXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25SZXNpemUoX2V2ZW50OiBhbnkpIHtcbiAgICAvLyBNYW51YWxseSBzZXQgbW9uYWNvIHNpemUgYmVjYXVzZSBNb25hY29FZGl0b3IgZG9lc24ndCB3b3JrIHdpdGggRmxleGJveCBjc3NcbiAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKG15RGl2ID09IG51bGwgfHwgbXlEaXYucGFyZW50RWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG15RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgaGVpZ2h0OiAke215RGl2LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4OyB3aWR0aDoxMDAlO2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgZWRpdG9yXG4gICAqIElzIGNhbGxlZCBvbmNlIG1vbmFjbyBsaWJyYXJ5IGlzIGF2YWlsYWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdE1vbmFjbygpIHtcbiAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgdGhpcy5pbml0LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFZGl0b3IoKSB7XG4gICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgIHRoaXMuZGlzcG9zZSgpO1xuXG4gICAgaWYgKCF0aGlzLl92YWx1ZVRvQ29tcGFyZSkge1xuICAgICAgdGhpcy5fZWRpdG9yID0gdGhpcy5faW5pdFNpbXBsZUVkaXRvcihteURpdiwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VkaXRvciA9IHRoaXMuX2luaXREaWZmRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBNYW51YWxseSBzZXQgbW9uYWNvIHNpemUgYmVjYXVzZSBNb25hY29FZGl0b3IgZG9lc24ndCB3b3JrIHdpdGggRmxleGJveCBjc3NcbiAgICBpZiAobXlEaXYgIT0gbnVsbCAmJiBteURpdi5wYXJlbnRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIG15RGl2LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBgaGVpZ2h0OiAke215RGl2LnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0fXB4OyB3aWR0aDoxMDAlO2ApO1xuICAgIH1cblxuICAgIC8vIEluaXQgQXV0b2NvbXBsZXRlIGlmIG5vdCBkaXNhYmxlZFxuICAgIGlmICghdGhpcy5kaXNhYmxlQXV0b2NvbXBsZXRlKSB7XG4gICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKS5pbml0QXV0b0NvbXBsZXRlKHRoaXMubGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIC8vIFdoZW4gY29udGVudCBpcyBsb2FkZWQsIHNjcm9sbENoYW5nZSBpcyB0cmlnZXJyZWQsXG4gICAgLy8gV2UgY2FuIG9ubHkgZm9yY2UgYXV0byBmb3JtYXQgYXQgdGhpcyBtb21lbnQsIGJlY2F1c2UgZWRpdG9yXG4gICAgLy8gZG9lc24ndCBoYXZlIG9uUmVhZHkgZXZlbnQgLi4uXG4gICAgLy8gIHRoaXMuX2VkaXRvci5vbkRpZFNjcm9sbENoYW5nZSgoKSA9PiB7XG4gICAgLy8gICAgIGlmICh0aGlzLmF1dG9Gb3JtYXRPbkxvYWQgJiYgIXRoaXMuX2lzQ29kZUZvcm1hdHRlZCkge1xuICAgIC8vICAgICAgICAgdGhpcy5fZWRpdG9yLmdldEFjdGlvbignZWRpdG9yLmFjdGlvbi5mb3JtYXQnKS5ydW4oKTtcbiAgICAvLyAgICAgICAgIHRoaXMuX2lzQ29kZUZvcm1hdHRlZCA9IHRydWU7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcblxuICAgIC8vIFRyaWdnZXIgb24gY2hhbmdlIGV2ZW50IGZvciBzaW1wbGUgZWRpdG9yXG4gICAgdGhpcy5fZ2V0T3JpZ2luYWxNb2RlbCgpLm9uRGlkQ2hhbmdlQ29udGVudCgoX2U6IGFueSkgPT4ge1xuICAgICAgbGV0IG5ld1ZhbDogc3RyaW5nID0gdGhpcy5fZ2V0T3JpZ2luYWxNb2RlbCgpLmdldFZhbHVlKCk7XG4gICAgICBpZiAodGhpcy5fdmFsdWUgIT09IG5ld1ZhbCkge1xuICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZShuZXdWYWwpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVHJpZ2dlciBvbiBjaGFuZ2UgZXZlbnQgZm9yIGRpZmYgZWRpdG9yXG4gICAgaWYgKHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKSkge1xuICAgICAgdGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpLm9uRGlkQ2hhbmdlQ29udGVudCgoX2U6IGFueSkgPT4ge1xuICAgICAgICBsZXQgbmV3VmFsOiBzdHJpbmcgPSB0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZVRvQ29tcGFyZShuZXdWYWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgc2ltcGxlIGVkaXRvciB0ZXh0XG4gICAqIEBwYXJhbSBkaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIHByaXZhdGUgX2luaXRTaW1wbGVFZGl0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgcmV0dXJuIG1vbmFjby5lZGl0b3IuY3JlYXRlKGRpdiwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgZGlmZiBlZGl0b3IgdG8gY29tcGFyZSB0d28gc3RyaW5nIChfdmFsdWUgYW5kIF92YWx1ZVRvQ29tcGFyZSlcbiAgICogQHBhcmFtIGRpdlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdERpZmZFZGl0b3IoZGl2OiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgbGV0IG9yaWdpbmFsTW9kZWwgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuX3ZhbHVlLCB0aGlzLmxhbmd1YWdlKTtcbiAgICBsZXQgbW9kaWZpZWRNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fdmFsdWVUb0NvbXBhcmUsIHRoaXMubGFuZ3VhZ2UpO1xuXG4gICAgbGV0IGRpZmZFZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IoZGl2LCBvcHRpb25zKTtcbiAgICBkaWZmRWRpdG9yLnNldE1vZGVsKHtcbiAgICAgIG1vZGlmaWVkOiBtb2RpZmllZE1vZGVsLFxuICAgICAgb3JpZ2luYWw6IG9yaWdpbmFsTW9kZWwsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlmZkVkaXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE9wdGlvbnMoKTogSUVkaXRvck9wdGlvbnMge1xuICAgIGxldCBvcHRpb25zOiBJRWRpdG9yT3B0aW9ucyA9IG5ldyBJRWRpdG9yT3B0aW9ucygpO1xuICAgIG9wdGlvbnMuZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyID0gdGhpcy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXI7XG4gICAgb3B0aW9ucy5hcmlhTGFiZWwgPSB0aGlzLmFyaWFMYWJlbDtcbiAgICBvcHRpb25zLnJ1bGVycyA9IHRoaXMucnVsZXJzO1xuICAgIG9wdGlvbnMud29yZFNlcGFyYXRvcnMgPSB0aGlzLndvcmRTZXBhcmF0b3JzO1xuICAgIG9wdGlvbnMuc2VsZWN0aW9uQ2xpcGJvYXJkID0gdGhpcy5zZWxlY3Rpb25DbGlwYm9hcmQ7XG4gICAgb3B0aW9ucy5saW5lTnVtYmVycyA9IHRoaXMubGluZU51bWJlcnM7XG4gICAgb3B0aW9ucy5zZWxlY3RPbkxpbmVOdW1iZXJzID0gdGhpcy5zZWxlY3RPbkxpbmVOdW1iZXJzO1xuICAgIG9wdGlvbnMubGluZU51bWJlcnNNaW5DaGFycyA9IHRoaXMubGluZU51bWJlcnNNaW5DaGFycztcbiAgICBvcHRpb25zLmdseXBoTWFyZ2luID0gdGhpcy5nbHlwaE1hcmdpbjtcbiAgICBvcHRpb25zLmxpbmVEZWNvcmF0aW9uc1dpZHRoID0gdGhpcy5saW5lRGVjb3JhdGlvbnNXaWR0aDtcbiAgICBvcHRpb25zLnJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmcgPSB0aGlzLnJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc7XG4gICAgb3B0aW9ucy5yb3VuZGVkU2VsZWN0aW9uID0gdGhpcy5yb3VuZGVkU2VsZWN0aW9uO1xuICAgIG9wdGlvbnMudGhlbWUgPSB0aGlzLnRoZW1lO1xuICAgIG9wdGlvbnMucmVhZE9ubHkgPSB0aGlzLnJlYWRPbmx5O1xuICAgIG9wdGlvbnMuc2Nyb2xsYmFyID0gdGhpcy5zY3JvbGxiYXI7XG4gICAgb3B0aW9ucy5vdmVydmlld1J1bGVyTGFuZXMgPSB0aGlzLm92ZXJ2aWV3UnVsZXJMYW5lcztcbiAgICBvcHRpb25zLmN1cnNvckJsaW5raW5nID0gdGhpcy5jdXJzb3JCbGlua2luZztcbiAgICBvcHRpb25zLm1vdXNlV2hlZWxab29tID0gdGhpcy5tb3VzZVdoZWVsWm9vbTtcbiAgICBvcHRpb25zLmN1cnNvclN0eWxlID0gdGhpcy5jdXJzb3JTdHlsZTtcbiAgICBvcHRpb25zLm1vdXNlV2hlZWxab29tID0gdGhpcy5tb3VzZVdoZWVsWm9vbTtcbiAgICBvcHRpb25zLmZvbnRMaWdhdHVyZXMgPSB0aGlzLmZvbnRMaWdhdHVyZXM7XG4gICAgb3B0aW9ucy5kaXNhYmxlVHJhbnNsYXRlM2QgPSB0aGlzLmRpc2FibGVUcmFuc2xhdGUzZDtcbiAgICBvcHRpb25zLmhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXIgPSB0aGlzLmhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI7XG4gICAgb3B0aW9ucy5zY3JvbGxCZXlvbmRMYXN0TGluZSA9IHRoaXMuc2Nyb2xsQmV5b25kTGFzdExpbmU7XG4gICAgb3B0aW9ucy5hdXRvbWF0aWNMYXlvdXQgPSB0aGlzLmF1dG9tYXRpY0xheW91dDtcbiAgICBvcHRpb25zLndyYXBwaW5nQ29sdW1uID0gdGhpcy53cmFwcGluZ0NvbHVtbjtcbiAgICBvcHRpb25zLndvcmRXcmFwID0gdGhpcy53b3JkV3JhcDtcbiAgICBvcHRpb25zLndyYXBwaW5nSW5kZW50ID0gdGhpcy53cmFwcGluZ0luZGVudDtcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy5zdG9wUmVuZGVyaW5nTGluZUFmdGVyID0gdGhpcy5zdG9wUmVuZGVyaW5nTGluZUFmdGVyO1xuICAgIG9wdGlvbnMuaG92ZXIgPSB0aGlzLmhvdmVyO1xuICAgIG9wdGlvbnMuY29udGV4dG1lbnUgPSB0aGlzLmNvbnRleHRtZW51O1xuICAgIG9wdGlvbnMubW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5ID0gdGhpcy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk7XG4gICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zID0gdGhpcy5xdWlja1N1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMucXVpY2tTdWdnZXN0aW9uc0RlbGF5ID0gdGhpcy5xdWlja1N1Z2dlc3Rpb25zRGVsYXk7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJIaW50cyA9IHRoaXMucGFyYW1ldGVySGludHM7XG4gICAgb3B0aW9ucy5pY29uc0luU3VnZ2VzdGlvbnMgPSB0aGlzLmljb25zSW5TdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLmF1dG9DbG9zaW5nQnJhY2tldHMgPSB0aGlzLmF1dG9DbG9zaW5nQnJhY2tldHM7XG4gICAgb3B0aW9ucy5mb3JtYXRPblR5cGUgPSB0aGlzLmZvcm1hdE9uVHlwZTtcbiAgICBvcHRpb25zLnN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzID0gdGhpcy5zdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycztcbiAgICBvcHRpb25zLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyID0gdGhpcy5hY2NlcHRTdWdnZXN0aW9uT25FbnRlcjtcbiAgICBvcHRpb25zLnNuaXBwZXRTdWdnZXN0aW9ucyA9IHRoaXMuc25pcHBldFN1Z2dlc3Rpb25zO1xuICAgIG9wdGlvbnMudGFiQ29tcGxldGlvbiA9IHRoaXMudGFiQ29tcGxldGlvbjtcbiAgICBvcHRpb25zLndvcmRCYXNlZFN1Z2dlc3Rpb25zID0gdGhpcy53b3JkQmFzZWRTdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLnNlbGVjdGlvbkhpZ2hsaWdodCA9IHRoaXMuc2VsZWN0aW9uSGlnaGxpZ2h0O1xuICAgIG9wdGlvbnMuY29kZUxlbnMgPSB0aGlzLmNvZGVMZW5zO1xuICAgIG9wdGlvbnMuZm9sZGluZyA9IHRoaXMuZm9sZGluZztcbiAgICBvcHRpb25zLnJlbmRlcldoaXRlc3BhY2UgPSB0aGlzLnJlbmRlcldoaXRlc3BhY2U7XG4gICAgb3B0aW9ucy5yZW5kZXJDb250cm9sQ2hhcmFjdGVycyA9IHRoaXMucmVuZGVyQ29udHJvbENoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy5yZW5kZXJJbmRlbnRHdWlkZXMgPSB0aGlzLnJlbmRlckluZGVudEd1aWRlcztcbiAgICBvcHRpb25zLnJlbmRlckxpbmVIaWdobGlnaHQgPSB0aGlzLnJlbmRlckxpbmVIaWdobGlnaHQ7XG4gICAgb3B0aW9ucy51c2VUYWJTdG9wcyA9IHRoaXMudXNlVGFiU3RvcHM7XG4gICAgb3B0aW9ucy5mb250RmFtaWx5ID0gdGhpcy5mb250RmFtaWx5O1xuICAgIG9wdGlvbnMuZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodDtcbiAgICBvcHRpb25zLmZvbnRTaXplID0gdGhpcy5mb250U2l6ZTtcbiAgICBvcHRpb25zLmxpbmVIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XG4gICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIG9wdGlvbnMubGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlO1xuXG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoKDxhbnk+b3B0aW9ucylba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRlbGV0ZSAoPGFueT5vcHRpb25zKVtrZXldOyAgLy8gUmVtb3ZlIGFsbCB1bmRlZmluZWQgcHJvcGVydGllc1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZVZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlVmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVWYWx1ZVRvQ29tcGFyZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWx1ZVRvQ29tcGFyZSA9IHZhbHVlO1xuICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZVRvQ29tcGFyZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE9yaWdpbmFsTW9kZWwoKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgbGV0IG1vZGVsID0gdGhpcy5fZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICByZXR1cm4gbW9kZWwub3JpZ2luYWwgPyBtb2RlbC5vcmlnaW5hbCA6IG1vZGVsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldE1vZGlmaWVkTW9kZWwoKSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgbGV0IG1vZGVsID0gdGhpcy5fZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICByZXR1cm4gbW9kZWwubW9kaWZpZWQgPyBtb2RlbC5tb2RpZmllZCA6IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=