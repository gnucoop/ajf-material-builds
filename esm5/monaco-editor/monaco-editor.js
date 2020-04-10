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
var AjfMonacoEditor = /** @class */ (function () {
    function AjfMonacoEditor() {
        this.autoFormatOnLoad = true;
        this.monacoLibPath = 'vs/loader.js';
        this.valueChange = new EventEmitter();
        this.valueToCompareChange = new EventEmitter();
        this.init = new EventEmitter();
        this._value = '';
        this._valueToCompare = '';
    }
    Object.defineProperty(AjfMonacoEditor.prototype, "valueToCompare", {
        set: function (v) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMonacoEditor.prototype, "value", {
        set: function (v) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfMonacoEditor.prototype, "editor", {
        get: function () {
            return this._editor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * load Monaco lib
     */
    AjfMonacoEditor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var onGotAmdLoader = function () {
            // Load monaco
            window.require(['vs/editor/editor.main'], function () {
                _this._initMonaco();
            });
        };
        // Load AMD loader if necessary
        if (!window.require) {
            var loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = this.monacoLibPath;
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        }
        else {
            onGotAmdLoader();
        }
    };
    /**
     * Upon destruction of the component we make sure to dispose both the editor and
     * the extra libs that we might've loaded
     */
    AjfMonacoEditor.prototype.ngOnDestroy = function () {
        this.dispose();
    };
    AjfMonacoEditor.prototype.ngOnChanges = function (_changes) {
        if (this._editor) {
            this._editor.updateOptions(this._getOptions());
        }
    };
    /**
     * Destroy the monaco componenent
     */
    AjfMonacoEditor.prototype.dispose = function () {
        var myDiv = this.editorContent.nativeElement;
        if (this._editor) {
            this._editor.dispose();
            while (myDiv.hasChildNodes()) {
                if (myDiv.firstChild != null) {
                    myDiv.removeChild(myDiv.firstChild);
                }
            }
            this._editor = null;
        }
    };
    /**
     * Triggered when windows is resized
     * @param event
     */
    AjfMonacoEditor.prototype.onResize = function (_event) {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        var myDiv = this.editorContent.nativeElement;
        if (myDiv == null || myDiv.parentElement == null) {
            return;
        }
        myDiv.setAttribute('style', "height: " + myDiv.parentElement.offsetHeight + "px; width:100%;");
    };
    /**
     * Init editor
     * Is called once monaco library is available
     */
    AjfMonacoEditor.prototype._initMonaco = function () {
        this._initEditor();
        this.init.emit();
    };
    AjfMonacoEditor.prototype._initEditor = function () {
        var _this = this;
        var myDiv = this.editorContent.nativeElement;
        var options = this._getOptions();
        this.dispose();
        if (!this._valueToCompare) {
            this._editor = this._initSimpleEditor(myDiv, options);
        }
        else {
            this._editor = this._initDiffEditor(myDiv, options);
        }
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        if (myDiv != null && myDiv.parentElement != null) {
            myDiv.setAttribute('style', "height: " + myDiv.parentElement.offsetHeight + "px; width:100%;");
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
        this._getOriginalModel().onDidChangeContent(function (_e) {
            var newVal = _this._getOriginalModel().getValue();
            if (_this._value !== newVal) {
                _this._updateValue(newVal);
            }
        });
        // Trigger on change event for diff editor
        if (this._getModifiedModel()) {
            this._getModifiedModel().onDidChangeContent(function (_e) {
                var newVal = _this._getModifiedModel().getValue();
                if (_this._valueToCompare !== newVal) {
                    _this._updateValueToCompare(newVal);
                }
            });
        }
    };
    /**
     * Create a simple editor text
     * @param div
     * @param options
     */
    AjfMonacoEditor.prototype._initSimpleEditor = function (div, options) {
        return monaco.editor.create(div, options);
    };
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     */
    AjfMonacoEditor.prototype._initDiffEditor = function (div, options) {
        var originalModel = monaco.editor.createModel(this._value, this.language);
        var modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
        var diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });
        return diffEditor;
    };
    AjfMonacoEditor.prototype._getOptions = function () {
        var options = new IEditorOptions();
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
        Object.keys(options).forEach(function (key) {
            if (options[key] === undefined) {
                delete options[key]; // Remove all undefined properties
            }
        });
        return options;
    };
    /**
     * UpdateValue
     *
     * @param value
     */
    AjfMonacoEditor.prototype._updateValue = function (value) {
        this.value = value;
        this._value = value;
        this.valueChange.emit(value);
    };
    /**
     * UpdateValue
     *
     * @param value
     */
    AjfMonacoEditor.prototype._updateValueToCompare = function (value) {
        this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    };
    AjfMonacoEditor.prototype._getOriginalModel = function () {
        if (this._editor) {
            var model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    };
    AjfMonacoEditor.prototype._getModifiedModel = function () {
        if (this._editor) {
            var model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    };
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
    AjfMonacoEditor.ctorParameters = function () { return []; };
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
}());
export { AjfMonacoEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLNUM7SUFvSUU7UUE1RFMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQUcsY0FBYyxDQUFDO1FBNkM5QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMseUJBQW9CLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMxQyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVM1QixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osb0JBQWUsR0FBRyxFQUFFLENBQUM7SUFFZCxDQUFDO0lBekRoQixzQkFDSSwyQ0FBYzthQURsQixVQUNtQixDQUFTO1lBQzFCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO2dCQUV6QixJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENB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QVEsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7O0lBNlFyQyxzQkFBQztDQUFBLEFBdllELElBdVlDO1NBL1hZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QXV0b0NvbXBsZXRlU2luZ2xldG9ufSBmcm9tICcuL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yTGFuZ3VhZ2V9IGZyb20gJy4vZWRpdG9yLWxhbmd1YWdlLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLW9wdGlvbnMtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yU2Nyb2xsYmFyT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itc2Nyb2xsYmFyLW9wdGlvbnMnO1xuaW1wb3J0IHtJRWRpdG9yVGhlbWV9IGZyb20gJy4vZWRpdG9yLXRoZW1lJztcblxuZGVjbGFyZSBjb25zdCBtb25hY286IGFueTtcblxuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnYWpmLW1vbmFjby1lZGl0b3InLFxuICBzdHlsZVVybHM6IFsnbW9uYWNvLWVkaXRvci5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdtb25hY28tZWRpdG9yLmh0bWwnLFxuICBob3N0OiB7Jyh3aW5kb3c6cmVzaXplKSc6ICdvblJlc2l6ZSgkZXZlbnQpJ31cbn0pXG5leHBvcnQgY2xhc3MgQWpmTW9uYWNvRWRpdG9yIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBleHBlcmltZW50YWxTY3JlZW5SZWFkZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJ1bGVycz86IG51bWJlcltdO1xuICBASW5wdXQoKSB3b3JkU2VwYXJhdG9ycz86IHN0cmluZztcbiAgQElucHV0KCkgc2VsZWN0aW9uQ2xpcGJvYXJkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZU51bWJlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RPbkxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZU51bWJlcnNNaW5DaGFycz86IG51bWJlcjtcbiAgQElucHV0KCkgZ2x5cGhNYXJnaW4/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lRGVjb3JhdGlvbnNXaWR0aD86IG51bWJlcjtcbiAgQElucHV0KCkgcmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZz86IG51bWJlcjtcbiAgQElucHV0KCkgcm91bmRlZFNlbGVjdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRoZW1lPzogSUVkaXRvclRoZW1lO1xuICBASW5wdXQoKSByZWFkT25seT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNjcm9sbGJhcj86IElFZGl0b3JTY3JvbGxiYXJPcHRpb25zO1xuICBASW5wdXQoKSBvdmVydmlld1J1bGVyTGFuZXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGN1cnNvckJsaW5raW5nPzogc3RyaW5nO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuICBASW5wdXQoKSBmb250TGlnYXR1cmVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZGlzYWJsZVRyYW5zbGF0ZTNkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNjcm9sbEJleW9uZExhc3RMaW5lPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b21hdGljTGF5b3V0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgd3JhcHBpbmdDb2x1bW4/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdvcmRXcmFwPzogYm9vbGVhbjtcbiAgQElucHV0KCkgd3JhcHBpbmdJbmRlbnQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgc3RvcFJlbmRlcmluZ0xpbmVBZnRlcj86IG51bWJlcjtcbiAgQElucHV0KCkgaG92ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBjb250ZXh0bWVudT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eT86IG51bWJlcjtcbiAgQElucHV0KCkgcXVpY2tTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnNEZWxheT86IG51bWJlcjtcbiAgQElucHV0KCkgcGFyYW1ldGVySGludHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBpY29uc0luU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvQ2xvc2luZ0JyYWNrZXRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9ybWF0T25UeXBlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBhY2NlcHRTdWdnZXN0aW9uT25FbnRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNuaXBwZXRTdWdnZXN0aW9ucz86ICd0b3AnfCdib3R0b20nfCdpbmxpbmUnfCdub25lJztcbiAgQElucHV0KCkgdGFiQ29tcGxldGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdvcmRCYXNlZFN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0aW9uSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29kZUxlbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb2xkaW5nPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyV2hpdGVzcGFjZT86ICdub25lJ3wnYm91bmRhcnknfCdhbGwnO1xuICBASW5wdXQoKSByZW5kZXJDb250cm9sQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlckluZGVudEd1aWRlcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJlbmRlckxpbmVIaWdobGlnaHQ/OiBib29sZWFuO1xuICBASW5wdXQoKSB1c2VUYWJTdG9wcz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIGZvbnRXZWlnaHQ/OiAnbm9ybWFsJ3wnYm9sZCd8J2JvbGRlcid8J2xpZ2h0ZXInfCdpbml0aWFsJ3wnaW5oZXJpdCd8JzEwMCd8JzIwMCd8JzMwMCd8JzQwMCd8JzUwMCd8XG4gICAgICAnNjAwJ3wnNzAwJ3wnODAwJ3wnOTAwJztcbiAgQElucHV0KCkgZm9udFNpemU/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGxpbmVIZWlnaHQ/OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZTtcblxuICBASW5wdXQoKSBkaXNhYmxlQXV0b2NvbXBsZXRlOiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvRm9ybWF0T25Mb2FkID0gdHJ1ZTtcbiAgQElucHV0KCkgbW9uYWNvTGliUGF0aCA9ICd2cy9sb2FkZXIuanMnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZVRvQ29tcGFyZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlVG9Db21wYXJlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlVG9Db21wYXJlID09PSB2b2lkIDAgfHwgIXRoaXMuX3ZhbHVlVG9Db21wYXJlIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgPT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2OiBzdHJpbmcpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdjtcblxuICAgICAgaWYgKHRoaXMuX3ZhbHVlID09PSB2b2lkIDAgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9lZGl0b3IuZ2V0RWRpdG9yVHlwZSgpICE9PSAndnMuZWRpdG9yLklDb2RlRWRpdG9yJykge1xuICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSB2YWx1ZVRvQ29tcGFyZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnZWRpdG9yJywge3N0YXRpYzogdHJ1ZX0pIGVkaXRvckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfZWRpdG9yOiBhbnk7XG4gIGdldCBlZGl0b3IoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWUgPSAnJztcbiAgcHJpdmF0ZSBfdmFsdWVUb0NvbXBhcmUgPSAnJztcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIGxvYWQgTW9uYWNvIGxpYlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGxldCBvbkdvdEFtZExvYWRlciA9ICgpID0+IHtcbiAgICAgIC8vIExvYWQgbW9uYWNvXG4gICAgICAoPGFueT53aW5kb3cpLnJlcXVpcmUoWyd2cy9lZGl0b3IvZWRpdG9yLm1haW4nXSwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9pbml0TW9uYWNvKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTG9hZCBBTUQgbG9hZGVyIGlmIG5lY2Vzc2FyeVxuICAgIGlmICghKDxhbnk+d2luZG93KS5yZXF1aXJlKSB7XG4gICAgICBsZXQgbG9hZGVyU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBsb2FkZXJTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgbG9hZGVyU2NyaXB0LnNyYyA9IHRoaXMubW9uYWNvTGliUGF0aDtcbiAgICAgIGxvYWRlclNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Hb3RBbWRMb2FkZXIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsb2FkZXJTY3JpcHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkdvdEFtZExvYWRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcG9uIGRlc3RydWN0aW9uIG9mIHRoZSBjb21wb25lbnQgd2UgbWFrZSBzdXJlIHRvIGRpc3Bvc2UgYm90aCB0aGUgZWRpdG9yIGFuZFxuICAgKiB0aGUgZXh0cmEgbGlicyB0aGF0IHdlIG1pZ2h0J3ZlIGxvYWRlZFxuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kaXNwb3NlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhfY2hhbmdlczoge1twcm9wS2V5OiBzdHJpbmddOiBTaW1wbGVDaGFuZ2V9KSB7XG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgdGhpcy5fZWRpdG9yLnVwZGF0ZU9wdGlvbnModGhpcy5fZ2V0T3B0aW9ucygpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgbW9uYWNvIGNvbXBvbmVuZW50XG4gICAqL1xuICBkaXNwb3NlKCkge1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICB0aGlzLl9lZGl0b3IuZGlzcG9zZSgpO1xuICAgICAgd2hpbGUgKG15RGl2Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICBpZiAobXlEaXYuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgbXlEaXYucmVtb3ZlQ2hpbGQobXlEaXYuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJlZCB3aGVuIHdpbmRvd3MgaXMgcmVzaXplZFxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uUmVzaXplKF9ldmVudDogYW55KSB7XG4gICAgLy8gTWFudWFsbHkgc2V0IG1vbmFjbyBzaXplIGJlY2F1c2UgTW9uYWNvRWRpdG9yIGRvZXNuJ3Qgd29yayB3aXRoIEZsZXhib3ggY3NzXG4gICAgbGV0IG15RGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZWRpdG9yQ29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGlmIChteURpdiA9PSBudWxsIHx8IG15RGl2LnBhcmVudEVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBteURpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGhlaWdodDogJHtteURpdi5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weDsgd2lkdGg6MTAwJTtgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGVkaXRvclxuICAgKiBJcyBjYWxsZWQgb25jZSBtb25hY28gbGlicmFyeSBpcyBhdmFpbGFibGVcbiAgICovXG4gIHByaXZhdGUgX2luaXRNb25hY28oKSB7XG4gICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgIHRoaXMuaW5pdC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RWRpdG9yKCkge1xuICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgb3B0aW9ucyA9IHRoaXMuX2dldE9wdGlvbnMoKTtcbiAgICB0aGlzLmRpc3Bvc2UoKTtcblxuICAgIGlmICghdGhpcy5fdmFsdWVUb0NvbXBhcmUpIHtcbiAgICAgIHRoaXMuX2VkaXRvciA9IHRoaXMuX2luaXRTaW1wbGVFZGl0b3IobXlEaXYsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0RGlmZkVkaXRvcihteURpdiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gTWFudWFsbHkgc2V0IG1vbmFjbyBzaXplIGJlY2F1c2UgTW9uYWNvRWRpdG9yIGRvZXNuJ3Qgd29yayB3aXRoIEZsZXhib3ggY3NzXG4gICAgaWYgKG15RGl2ICE9IG51bGwgJiYgbXlEaXYucGFyZW50RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBteURpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGhlaWdodDogJHtteURpdi5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weDsgd2lkdGg6MTAwJTtgKTtcbiAgICB9XG5cbiAgICAvLyBJbml0IEF1dG9jb21wbGV0ZSBpZiBub3QgZGlzYWJsZWRcbiAgICBpZiAoIXRoaXMuZGlzYWJsZUF1dG9jb21wbGV0ZSkge1xuICAgICAgQXV0b0NvbXBsZXRlU2luZ2xldG9uLmdldEluc3RhbmNlKCkuaW5pdEF1dG9Db21wbGV0ZSh0aGlzLmxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvLyBXaGVuIGNvbnRlbnQgaXMgbG9hZGVkLCBzY3JvbGxDaGFuZ2UgaXMgdHJpZ2VycmVkLFxuICAgIC8vIFdlIGNhbiBvbmx5IGZvcmNlIGF1dG8gZm9ybWF0IGF0IHRoaXMgbW9tZW50LCBiZWNhdXNlIGVkaXRvclxuICAgIC8vIGRvZXNuJ3QgaGF2ZSBvblJlYWR5IGV2ZW50IC4uLlxuICAgIC8vICB0aGlzLl9lZGl0b3Iub25EaWRTY3JvbGxDaGFuZ2UoKCkgPT4ge1xuICAgIC8vICAgICBpZiAodGhpcy5hdXRvRm9ybWF0T25Mb2FkICYmICF0aGlzLl9pc0NvZGVGb3JtYXR0ZWQpIHtcbiAgICAvLyAgICAgICAgIHRoaXMuX2VkaXRvci5nZXRBY3Rpb24oJ2VkaXRvci5hY3Rpb24uZm9ybWF0JykucnVuKCk7XG4gICAgLy8gICAgICAgICB0aGlzLl9pc0NvZGVGb3JtYXR0ZWQgPSB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3Igc2ltcGxlIGVkaXRvclxuICAgIHRoaXMuX2dldE9yaWdpbmFsTW9kZWwoKS5vbkRpZENoYW5nZUNvbnRlbnQoKF9lOiBhbnkpID0+IHtcbiAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE9yaWdpbmFsTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWUobmV3VmFsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFRyaWdnZXIgb24gY2hhbmdlIGV2ZW50IGZvciBkaWZmIGVkaXRvclxuICAgIGlmICh0aGlzLl9nZXRNb2RpZmllZE1vZGVsKCkpIHtcbiAgICAgIHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5vbkRpZENoYW5nZUNvbnRlbnQoKF9lOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IG5ld1ZhbDogc3RyaW5nID0gdGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpLmdldFZhbHVlKCk7XG4gICAgICAgIGlmICh0aGlzLl92YWx1ZVRvQ29tcGFyZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWVUb0NvbXBhcmUobmV3VmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHNpbXBsZSBlZGl0b3IgdGV4dFxuICAgKiBAcGFyYW0gZGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBwcml2YXRlIF9pbml0U2ltcGxlRWRpdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuICAgIHJldHVybiBtb25hY28uZWRpdG9yLmNyZWF0ZShkaXYsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGRpZmYgZWRpdG9yIHRvIGNvbXBhcmUgdHdvIHN0cmluZyAoX3ZhbHVlIGFuZCBfdmFsdWVUb0NvbXBhcmUpXG4gICAqIEBwYXJhbSBkaXZcbiAgICovXG4gIHByaXZhdGUgX2luaXREaWZmRWRpdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuICAgIGxldCBvcmlnaW5hbE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl92YWx1ZSwgdGhpcy5sYW5ndWFnZSk7XG4gICAgbGV0IG1vZGlmaWVkTW9kZWwgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuX3ZhbHVlVG9Db21wYXJlLCB0aGlzLmxhbmd1YWdlKTtcblxuICAgIGxldCBkaWZmRWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGVEaWZmRWRpdG9yKGRpdiwgb3B0aW9ucyk7XG4gICAgZGlmZkVkaXRvci5zZXRNb2RlbCh7XG4gICAgICBtb2RpZmllZDogbW9kaWZpZWRNb2RlbCxcbiAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbE1vZGVsLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpZmZFZGl0b3I7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPcHRpb25zKCk6IElFZGl0b3JPcHRpb25zIHtcbiAgICBsZXQgb3B0aW9uczogSUVkaXRvck9wdGlvbnMgPSBuZXcgSUVkaXRvck9wdGlvbnMoKTtcbiAgICBvcHRpb25zLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlciA9IHRoaXMuZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyO1xuICAgIG9wdGlvbnMuYXJpYUxhYmVsID0gdGhpcy5hcmlhTGFiZWw7XG4gICAgb3B0aW9ucy5ydWxlcnMgPSB0aGlzLnJ1bGVycztcbiAgICBvcHRpb25zLndvcmRTZXBhcmF0b3JzID0gdGhpcy53b3JkU2VwYXJhdG9ycztcbiAgICBvcHRpb25zLnNlbGVjdGlvbkNsaXBib2FyZCA9IHRoaXMuc2VsZWN0aW9uQ2xpcGJvYXJkO1xuICAgIG9wdGlvbnMubGluZU51bWJlcnMgPSB0aGlzLmxpbmVOdW1iZXJzO1xuICAgIG9wdGlvbnMuc2VsZWN0T25MaW5lTnVtYmVycyA9IHRoaXMuc2VsZWN0T25MaW5lTnVtYmVycztcbiAgICBvcHRpb25zLmxpbmVOdW1iZXJzTWluQ2hhcnMgPSB0aGlzLmxpbmVOdW1iZXJzTWluQ2hhcnM7XG4gICAgb3B0aW9ucy5nbHlwaE1hcmdpbiA9IHRoaXMuZ2x5cGhNYXJnaW47XG4gICAgb3B0aW9ucy5saW5lRGVjb3JhdGlvbnNXaWR0aCA9IHRoaXMubGluZURlY29yYXRpb25zV2lkdGg7XG4gICAgb3B0aW9ucy5yZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nID0gdGhpcy5yZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nO1xuICAgIG9wdGlvbnMucm91bmRlZFNlbGVjdGlvbiA9IHRoaXMucm91bmRlZFNlbGVjdGlvbjtcbiAgICBvcHRpb25zLnRoZW1lID0gdGhpcy50aGVtZTtcbiAgICBvcHRpb25zLnJlYWRPbmx5ID0gdGhpcy5yZWFkT25seTtcbiAgICBvcHRpb25zLnNjcm9sbGJhciA9IHRoaXMuc2Nyb2xsYmFyO1xuICAgIG9wdGlvbnMub3ZlcnZpZXdSdWxlckxhbmVzID0gdGhpcy5vdmVydmlld1J1bGVyTGFuZXM7XG4gICAgb3B0aW9ucy5jdXJzb3JCbGlua2luZyA9IHRoaXMuY3Vyc29yQmxpbmtpbmc7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsWm9vbSA9IHRoaXMubW91c2VXaGVlbFpvb207XG4gICAgb3B0aW9ucy5jdXJzb3JTdHlsZSA9IHRoaXMuY3Vyc29yU3R5bGU7XG4gICAgb3B0aW9ucy5tb3VzZVdoZWVsWm9vbSA9IHRoaXMubW91c2VXaGVlbFpvb207XG4gICAgb3B0aW9ucy5mb250TGlnYXR1cmVzID0gdGhpcy5mb250TGlnYXR1cmVzO1xuICAgIG9wdGlvbnMuZGlzYWJsZVRyYW5zbGF0ZTNkID0gdGhpcy5kaXNhYmxlVHJhbnNsYXRlM2Q7XG4gICAgb3B0aW9ucy5oaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyID0gdGhpcy5oaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyO1xuICAgIG9wdGlvbnMuc2Nyb2xsQmV5b25kTGFzdExpbmUgPSB0aGlzLnNjcm9sbEJleW9uZExhc3RMaW5lO1xuICAgIG9wdGlvbnMuYXV0b21hdGljTGF5b3V0ID0gdGhpcy5hdXRvbWF0aWNMYXlvdXQ7XG4gICAgb3B0aW9ucy53cmFwcGluZ0NvbHVtbiA9IHRoaXMud3JhcHBpbmdDb2x1bW47XG4gICAgb3B0aW9ucy53b3JkV3JhcCA9IHRoaXMud29yZFdyYXA7XG4gICAgb3B0aW9ucy53cmFwcGluZ0luZGVudCA9IHRoaXMud3JhcHBpbmdJbmRlbnQ7XG4gICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycyA9IHRoaXMud29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMud29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnMgPSB0aGlzLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMuc3RvcFJlbmRlcmluZ0xpbmVBZnRlciA9IHRoaXMuc3RvcFJlbmRlcmluZ0xpbmVBZnRlcjtcbiAgICBvcHRpb25zLmhvdmVyID0gdGhpcy5ob3ZlcjtcbiAgICBvcHRpb25zLmNvbnRleHRtZW51ID0gdGhpcy5jb250ZXh0bWVudTtcbiAgICBvcHRpb25zLm1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eSA9IHRoaXMubW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5O1xuICAgIG9wdGlvbnMucXVpY2tTdWdnZXN0aW9ucyA9IHRoaXMucXVpY2tTdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLnF1aWNrU3VnZ2VzdGlvbnNEZWxheSA9IHRoaXMucXVpY2tTdWdnZXN0aW9uc0RlbGF5O1xuICAgIG9wdGlvbnMucGFyYW1ldGVySGludHMgPSB0aGlzLnBhcmFtZXRlckhpbnRzO1xuICAgIG9wdGlvbnMuaWNvbnNJblN1Z2dlc3Rpb25zID0gdGhpcy5pY29uc0luU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5hdXRvQ2xvc2luZ0JyYWNrZXRzID0gdGhpcy5hdXRvQ2xvc2luZ0JyYWNrZXRzO1xuICAgIG9wdGlvbnMuZm9ybWF0T25UeXBlID0gdGhpcy5mb3JtYXRPblR5cGU7XG4gICAgb3B0aW9ucy5zdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycyA9IHRoaXMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnM7XG4gICAgb3B0aW9ucy5hY2NlcHRTdWdnZXN0aW9uT25FbnRlciA9IHRoaXMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI7XG4gICAgb3B0aW9ucy5zbmlwcGV0U3VnZ2VzdGlvbnMgPSB0aGlzLnNuaXBwZXRTdWdnZXN0aW9ucztcbiAgICBvcHRpb25zLnRhYkNvbXBsZXRpb24gPSB0aGlzLnRhYkNvbXBsZXRpb247XG4gICAgb3B0aW9ucy53b3JkQmFzZWRTdWdnZXN0aW9ucyA9IHRoaXMud29yZEJhc2VkU3VnZ2VzdGlvbnM7XG4gICAgb3B0aW9ucy5zZWxlY3Rpb25IaWdobGlnaHQgPSB0aGlzLnNlbGVjdGlvbkhpZ2hsaWdodDtcbiAgICBvcHRpb25zLmNvZGVMZW5zID0gdGhpcy5jb2RlTGVucztcbiAgICBvcHRpb25zLmZvbGRpbmcgPSB0aGlzLmZvbGRpbmc7XG4gICAgb3B0aW9ucy5yZW5kZXJXaGl0ZXNwYWNlID0gdGhpcy5yZW5kZXJXaGl0ZXNwYWNlO1xuICAgIG9wdGlvbnMucmVuZGVyQ29udHJvbENoYXJhY3RlcnMgPSB0aGlzLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzO1xuICAgIG9wdGlvbnMucmVuZGVySW5kZW50R3VpZGVzID0gdGhpcy5yZW5kZXJJbmRlbnRHdWlkZXM7XG4gICAgb3B0aW9ucy5yZW5kZXJMaW5lSGlnaGxpZ2h0ID0gdGhpcy5yZW5kZXJMaW5lSGlnaGxpZ2h0O1xuICAgIG9wdGlvbnMudXNlVGFiU3RvcHMgPSB0aGlzLnVzZVRhYlN0b3BzO1xuICAgIG9wdGlvbnMuZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseTtcbiAgICBvcHRpb25zLmZvbnRXZWlnaHQgPSB0aGlzLmZvbnRXZWlnaHQ7XG4gICAgb3B0aW9ucy5mb250U2l6ZSA9IHRoaXMuZm9udFNpemU7XG4gICAgb3B0aW9ucy5saW5lSGVpZ2h0ID0gdGhpcy5saW5lSGVpZ2h0O1xuICAgIG9wdGlvbnMudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICBvcHRpb25zLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcblxuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCg8YW55Pm9wdGlvbnMpW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgKDxhbnk+b3B0aW9ucylba2V5XTsgIC8vIFJlbW92ZSBhbGwgdW5kZWZpbmVkIHByb3BlcnRpZXNcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVWYWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZVZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVmFsdWVUb0NvbXBhcmUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICB0aGlzLl92YWx1ZVRvQ29tcGFyZSA9IHZhbHVlO1xuICAgIHRoaXMudmFsdWVUb0NvbXBhcmVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPcmlnaW5hbE1vZGVsKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIGxldCBtb2RlbCA9IHRoaXMuX2VkaXRvci5nZXRNb2RlbCgpO1xuICAgICAgcmV0dXJuIG1vZGVsLm9yaWdpbmFsID8gbW9kZWwub3JpZ2luYWwgOiBtb2RlbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRNb2RpZmllZE1vZGVsKCkge1xuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcbiAgICAgIGxldCBtb2RlbCA9IHRoaXMuX2VkaXRvci5nZXRNb2RlbCgpO1xuICAgICAgcmV0dXJuIG1vZGVsLm1vZGlmaWVkID8gbW9kZWwubW9kaWZpZWQgOiBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19