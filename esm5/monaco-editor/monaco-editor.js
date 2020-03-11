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
        get: function () { return this._editor; },
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
        Object.keys(options)
            .forEach(function (key) {
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
                    host: {
                        '(window:resize)': 'onResize($event)'
                    },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uYWNvLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDNUQsTUFBTSxFQUFnQixTQUFTLEVBQUUsaUJBQWlCLEVBQ3pFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSzVDO0lBaUlJO1FBeERPLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixrQkFBYSxHQUFHLGNBQWMsQ0FBQztRQTJDNUIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pDLHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDMUMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFPNUIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLG9CQUFlLEdBQUcsRUFBRSxDQUFDO0lBRzdCLENBQUM7SUF0REgsc0JBQWEsMkNBQWM7YUFBM0IsVUFBNEIsQ0FBUztZQUNuQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztnQkFFekIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQzdFLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLHVCQUF1QixFQUFFO3dCQUM1RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ25CLE9BQU87cUJBQ1I7b0JBRUQsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7aUJBQ2xCO2dCQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsS0FBSyx1QkFBdUIsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixPQUFPO2lCQUNSO2FBQ0Y7UUFDSCxDQUFDOzs7T0FBQTtJQUVDLHNCQUFhLGtDQUFLO2FBQWxCLFVBQW1CLENBQVM7WUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBRWhCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQzNDLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLHVCQUF1QixFQUFFO29CQUM1RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQzs7O09BQUE7SUFTRCxzQkFBSSxtQ0FBTTthQUFWLGNBQW9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBUTFDOztPQUVHO0lBQ0gseUNBQWUsR0FBZjtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLGNBQWMsR0FBRztZQUNqQixjQUFjO1lBQ1IsTUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQzdDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUVGLCtCQUErQjtRQUMvQixJQUFJLENBQU8sTUFBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELFlBQVksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7WUFDdEMsWUFBWSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3RDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNILGNBQWMsRUFBRSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxRQUEyQztRQUNuRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGlDQUFPLEdBQVA7UUFDSSxJQUFJLEtBQUssR0FBbUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixPQUFPLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtvQkFDNUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0Y7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxrQ0FBUSxHQUFSLFVBQVMsTUFBVztRQUNoQiw4RUFBOEU7UUFDOUUsSUFBSSxLQUFLLEdBQW1CLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzdELElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUM3RCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxhQUFXLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxvQkFBaUIsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7O09BR0c7SUFDSyxxQ0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxxQ0FBVyxHQUFuQjtRQUFBLGlCQWdEQztRQS9DRyxJQUFJLEtBQUssR0FBbUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDN0QsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN2RDtRQUVELDhFQUE4RTtRQUM5RSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDaEQsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBVyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksb0JBQWlCLENBQUMsQ0FBQztTQUMzRjtRQUVELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RTtRQUVELHFEQUFxRDtRQUNyRCwrREFBK0Q7UUFDL0QsaUNBQWlDO1FBQ2pDLDBDQUEwQztRQUMxQyw2REFBNkQ7UUFDN0QsZ0VBQWdFO1FBQ2hFLHdDQUF3QztRQUN4QyxRQUFRO1FBQ1IsTUFBTTtRQUVOLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFDLEVBQU87WUFDaEQsSUFBSSxNQUFNLEdBQVcsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekQsSUFBSSxLQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtnQkFDeEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMENBQTBDO1FBQzFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsa0JBQWtCLENBQUMsVUFBQyxFQUFPO2dCQUNoRCxJQUFJLE1BQU0sR0FBVyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekQsSUFBSSxLQUFJLENBQUMsZUFBZSxLQUFLLE1BQU0sRUFBRTtvQkFDakMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDJDQUFpQixHQUF6QixVQUEwQixHQUFtQixFQUFFLE9BQVk7UUFDdkQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHlDQUFlLEdBQXZCLFVBQXdCLEdBQW1CLEVBQUUsT0FBWTtRQUNyRCxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRSxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM5RCxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2hCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxhQUFhO1NBQzFCLENBQUMsQ0FBQztRQUVILE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxxQ0FBVyxHQUFuQjtRQUNJLElBQUksT0FBTyxHQUFtQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ25ELE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUM7UUFDakUsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3QixPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN2RCxPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3pELE9BQU8sQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUM7UUFDekUsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0MsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxPQUFPLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDO1FBQ25FLE9BQU8sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDekQsT0FBTyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUM7UUFDM0UsT0FBTyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQztRQUN6RSxPQUFPLENBQUMsZ0NBQWdDLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxDQUFDO1FBQ2pGLE9BQU8sQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDN0QsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxPQUFPLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDO1FBQ3ZFLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsT0FBTyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUMzRCxPQUFPLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0MsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxPQUFPLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN6QyxPQUFPLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQ3JFLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDL0QsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDM0MsT0FBTyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN6RCxPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDL0IsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxPQUFPLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQy9ELE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDckQsT0FBTyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUN2RCxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNyQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDakIsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUNYLElBQVUsT0FBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDckMsT0FBYSxPQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7YUFDL0Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssc0NBQVksR0FBcEIsVUFBcUIsS0FBYTtRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLCtDQUFxQixHQUE3QixVQUE4QixLQUFhO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLDJDQUFpQixHQUF6QjtRQUNJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDbEQ7SUFDTCxDQUFDO0lBRU8sMkNBQWlCLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNqRDtJQUNMLENBQUM7O2dCQW5ZSixTQUFTLFNBQUM7b0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsbUJBQW1CO29CQUU3Qiw2REFBaUM7b0JBQ2pDLElBQUksRUFBRTt3QkFDSixpQkFBaUIsRUFBRSxrQkFBa0I7cUJBQ3RDOztpQkFDRjs7Ozs7MkNBRUUsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7aUNBQ0wsS0FBSztxQ0FDTCxLQUFLOzhCQUNMLEtBQUs7c0NBQ0wsS0FBSztzQ0FDTCxLQUFLOzhCQUNMLEtBQUs7dUNBQ0wsS0FBSzsrQ0FDTCxLQUFLO21DQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7cUNBQ0wsS0FBSztpQ0FDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsS0FBSztnQ0FDTCxLQUFLO3FDQUNMLEtBQUs7NENBQ0wsS0FBSzt1Q0FDTCxLQUFLO2tDQUNMLEtBQUs7aUNBQ0wsS0FBSzsyQkFDTCxLQUFLO2lDQUNMLEtBQUs7Z0RBQ0wsS0FBSzsrQ0FDTCxLQUFLO21EQUNMLEtBQUs7eUNBQ0wsS0FBSzt3QkFDTCxLQUFLOzhCQUNMLEtBQUs7OENBQ0wsS0FBSzttQ0FDTCxLQUFLO3dDQUNMLEtBQUs7aUNBQ0wsS0FBSztxQ0FDTCxLQUFLO3NDQUNMLEtBQUs7K0JBQ0wsS0FBSzs2Q0FDTCxLQUFLOzBDQUNMLEtBQUs7cUNBQ0wsS0FBSztnQ0FDTCxLQUFLO3VDQUNMLEtBQUs7cUNBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7bUNBQ0wsS0FBSzswQ0FDTCxLQUFLO3FDQUNMLEtBQUs7c0NBQ0wsS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFFTCxLQUFLOzZCQUNMLEtBQUs7MkJBRUwsS0FBSztzQ0FFTCxLQUFLO21DQUNMLEtBQUs7Z0NBQ0wsS0FBSztpQ0FFTCxLQUFLO3dCQXdCSCxLQUFLOzhCQWlCTCxNQUFNO3VDQUNOLE1BQU07dUJBQ04sTUFBTTtnQ0FFTixTQUFTLFNBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzs7SUEyUXZDLHNCQUFDO0NBQUEsQUFwWUQsSUFvWUM7U0ExWFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCxcbiAgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgU2ltcGxlQ2hhbmdlLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBdXRvQ29tcGxldGVTaW5nbGV0b259IGZyb20gJy4vYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JMYW5ndWFnZX0gZnJvbSAnLi9lZGl0b3ItbGFuZ3VhZ2UtbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yT3B0aW9uc30gZnJvbSAnLi9lZGl0b3Itb3B0aW9ucy1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JTY3JvbGxiYXJPcHRpb25zfSBmcm9tICcuL2VkaXRvci1zY3JvbGxiYXItb3B0aW9ucyc7XG5pbXBvcnQge0lFZGl0b3JUaGVtZX0gZnJvbSAnLi9lZGl0b3ItdGhlbWUnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogYW55O1xuXG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdhamYtbW9uYWNvLWVkaXRvcicsXG4gIHN0eWxlVXJsczogWydtb25hY28tZWRpdG9yLmNzcyddLFxuICB0ZW1wbGF0ZVVybDogJ21vbmFjby1lZGl0b3IuaHRtbCcsXG4gIGhvc3Q6IHtcbiAgICAnKHdpbmRvdzpyZXNpemUpJzogJ29uUmVzaXplKCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgQWpmTW9uYWNvRWRpdG9yIGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBleHBlcmltZW50YWxTY3JlZW5SZWFkZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJ1bGVycz86IG51bWJlcltdO1xuICBASW5wdXQoKSB3b3JkU2VwYXJhdG9ycz86IHN0cmluZztcbiAgQElucHV0KCkgc2VsZWN0aW9uQ2xpcGJvYXJkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZU51bWJlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBzZWxlY3RPbkxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgbGluZU51bWJlcnNNaW5DaGFycz86IG51bWJlcjtcbiAgQElucHV0KCkgZ2x5cGhNYXJnaW4/OiBib29sZWFuO1xuICBASW5wdXQoKSBsaW5lRGVjb3JhdGlvbnNXaWR0aD86IG51bWJlcjtcbiAgQElucHV0KCkgcmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZz86IG51bWJlcjtcbiAgQElucHV0KCkgcm91bmRlZFNlbGVjdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRoZW1lPzogSUVkaXRvclRoZW1lO1xuICBASW5wdXQoKSByZWFkT25seT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNjcm9sbGJhcj86IElFZGl0b3JTY3JvbGxiYXJPcHRpb25zO1xuICBASW5wdXQoKSBvdmVydmlld1J1bGVyTGFuZXM/OiBudW1iZXI7XG4gIEBJbnB1dCgpIGN1cnNvckJsaW5raW5nPzogc3RyaW5nO1xuICBASW5wdXQoKSBtb3VzZVdoZWVsWm9vbT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuICBASW5wdXQoKSBmb250TGlnYXR1cmVzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZGlzYWJsZVRyYW5zbGF0ZTNkPzogYm9vbGVhbjtcbiAgQElucHV0KCkgaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNjcm9sbEJleW9uZExhc3RMaW5lPzogYm9vbGVhbjtcbiAgQElucHV0KCkgYXV0b21hdGljTGF5b3V0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgd3JhcHBpbmdDb2x1bW4/OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdvcmRXcmFwPzogYm9vbGVhbjtcbiAgQElucHV0KCkgd3JhcHBpbmdJbmRlbnQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICBASW5wdXQoKSB3b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgQElucHV0KCkgc3RvcFJlbmRlcmluZ0xpbmVBZnRlcj86IG51bWJlcjtcbiAgQElucHV0KCkgaG92ZXI/OiBib29sZWFuO1xuICBASW5wdXQoKSBjb250ZXh0bWVudT86IGJvb2xlYW47XG4gIEBJbnB1dCgpIG1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eT86IG51bWJlcjtcbiAgQElucHV0KCkgcXVpY2tTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHF1aWNrU3VnZ2VzdGlvbnNEZWxheT86IG51bWJlcjtcbiAgQElucHV0KCkgcGFyYW1ldGVySGludHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBpY29uc0luU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvQ2xvc2luZ0JyYWNrZXRzPzogYm9vbGVhbjtcbiAgQElucHV0KCkgZm9ybWF0T25UeXBlPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBhY2NlcHRTdWdnZXN0aW9uT25FbnRlcj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNuaXBwZXRTdWdnZXN0aW9ucz86ICd0b3AnIHwgJ2JvdHRvbScgfCAnaW5saW5lJyB8ICdub25lJztcbiAgQElucHV0KCkgdGFiQ29tcGxldGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdvcmRCYXNlZFN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgQElucHV0KCkgc2VsZWN0aW9uSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgY29kZUxlbnM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb2xkaW5nPzogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVuZGVyV2hpdGVzcGFjZT86ICdub25lJyB8ICdib3VuZGFyeScgfCAnYWxsJztcbiAgQElucHV0KCkgcmVuZGVyQ29udHJvbENoYXJhY3RlcnM/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJJbmRlbnRHdWlkZXM/OiBib29sZWFuO1xuICBASW5wdXQoKSByZW5kZXJMaW5lSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgQElucHV0KCkgdXNlVGFiU3RvcHM/OiBib29sZWFuO1xuICBASW5wdXQoKSBmb250RmFtaWx5Pzogc3RyaW5nO1xuICBASW5wdXQoKSBmb250V2VpZ2h0PzogJ25vcm1hbCcgfCAnYm9sZCcgfCAnYm9sZGVyJyB8ICdsaWdodGVyJyB8ICdpbml0aWFsJyB8ICdpbmhlcml0J1xuICAgIHwgJzEwMCcgfCAnMjAwJyB8ICczMDAnIHwgJzQwMCcgfCAnNTAwJyB8ICc2MDAnIHwgJzcwMCcgfCAnODAwJyB8ICc5MDAnO1xuICBASW5wdXQoKSBmb250U2l6ZT86IG51bWJlcjtcbiAgQElucHV0KCkgbGluZUhlaWdodD86IG51bWJlcjtcblxuICBASW5wdXQoKSBsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVBdXRvY29tcGxldGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF1dG9Gb3JtYXRPbkxvYWQgPSB0cnVlO1xuICBASW5wdXQoKSBtb25hY29MaWJQYXRoID0gJ3ZzL2xvYWRlci5qcyc7XG5cbiAgQElucHV0KCkgc2V0IHZhbHVlVG9Db21wYXJlKHY6IHN0cmluZykge1xuICAgIGlmICh2ICE9PSB0aGlzLl92YWx1ZVRvQ29tcGFyZSkge1xuICAgICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2O1xuXG4gICAgICBpZiAodGhpcy5fdmFsdWVUb0NvbXBhcmUgPT09IHZvaWQgMCB8fCAhdGhpcy5fdmFsdWVUb0NvbXBhcmUgfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yICYmIHRoaXMuX2VkaXRvci5nZXRFZGl0b3JUeXBlKCkgIT09ICd2cy5lZGl0b3IuSUNvZGVFZGl0b3InKSB7XG4gICAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl92YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSA9PT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgdGhpcy5faW5pdEVkaXRvcigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgICBASW5wdXQoKSBzZXQgdmFsdWUodjogc3RyaW5nKSB7XG4gICAgICBpZiAodiAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2O1xuXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZSA9PT0gdm9pZCAwIHx8ICF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZWRpdG9yLmdldEVkaXRvclR5cGUoKSAhPT0gJ3ZzLmVkaXRvci5JQ29kZUVkaXRvcicpIHtcbiAgICAgICAgICB0aGlzLl9pbml0RWRpdG9yKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHZhbHVlVG9Db21wYXJlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBpbml0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZWRpdG9yJywge3N0YXRpYzogdHJ1ZX0pIGVkaXRvckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIF9lZGl0b3I6IGFueTtcbiAgICBnZXQgZWRpdG9yKCk6IGFueSB7IHJldHVybiB0aGlzLl9lZGl0b3I7IH1cblxuICAgIHByaXZhdGUgX3ZhbHVlID0gJyc7XG4gICAgcHJpdmF0ZSBfdmFsdWVUb0NvbXBhcmUgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGxvYWQgTW9uYWNvIGxpYlxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgbGV0IG9uR290QW1kTG9hZGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gTG9hZCBtb25hY29cbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWlyZShbJ3ZzL2VkaXRvci9lZGl0b3IubWFpbiddLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdE1vbmFjbygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gTG9hZCBBTUQgbG9hZGVyIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAoISg8YW55PndpbmRvdykucmVxdWlyZSkge1xuICAgICAgICAgICAgbGV0IGxvYWRlclNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgbG9hZGVyU2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgICAgIGxvYWRlclNjcmlwdC5zcmMgPSB0aGlzLm1vbmFjb0xpYlBhdGg7XG4gICAgICAgICAgICBsb2FkZXJTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uR290QW1kTG9hZGVyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobG9hZGVyU2NyaXB0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9uR290QW1kTG9hZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcG9uIGRlc3RydWN0aW9uIG9mIHRoZSBjb21wb25lbnQgd2UgbWFrZSBzdXJlIHRvIGRpc3Bvc2UgYm90aCB0aGUgZWRpdG9yIGFuZFxuICAgICAqIHRoZSBleHRyYSBsaWJzIHRoYXQgd2UgbWlnaHQndmUgbG9hZGVkXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKF9jaGFuZ2VzOiB7W3Byb3BLZXk6IHN0cmluZ106IFNpbXBsZUNoYW5nZX0pIHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLnVwZGF0ZU9wdGlvbnModGhpcy5fZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIG1vbmFjbyBjb21wb25lbmVudFxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHdoaWxlIChteURpdi5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgICAgaWYgKG15RGl2LmZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG15RGl2LnJlbW92ZUNoaWxkKG15RGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcmVkIHdoZW4gd2luZG93cyBpcyByZXNpemVkXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgb25SZXNpemUoX2V2ZW50OiBhbnkpIHtcbiAgICAgICAgLy8gTWFudWFsbHkgc2V0IG1vbmFjbyBzaXplIGJlY2F1c2UgTW9uYWNvRWRpdG9yIGRvZXNuJ3Qgd29yayB3aXRoIEZsZXhib3ggY3NzXG4gICAgICAgIGxldCBteURpdjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLmVkaXRvckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKG15RGl2ID09IG51bGwgfHwgbXlEaXYucGFyZW50RWxlbWVudCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBteURpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGhlaWdodDogJHtteURpdi5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weDsgd2lkdGg6MTAwJTtgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGVkaXRvclxuICAgICAqIElzIGNhbGxlZCBvbmNlIG1vbmFjbyBsaWJyYXJ5IGlzIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2luaXRNb25hY28oKSB7XG4gICAgICAgIHRoaXMuX2luaXRFZGl0b3IoKTtcbiAgICAgICAgdGhpcy5pbml0LmVtaXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0RWRpdG9yKCkge1xuICAgICAgICBsZXQgbXlEaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5lZGl0b3JDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5fZ2V0T3B0aW9ucygpO1xuICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3ZhbHVlVG9Db21wYXJlKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3IgPSB0aGlzLl9pbml0U2ltcGxlRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvciA9IHRoaXMuX2luaXREaWZmRWRpdG9yKG15RGl2LCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1hbnVhbGx5IHNldCBtb25hY28gc2l6ZSBiZWNhdXNlIE1vbmFjb0VkaXRvciBkb2Vzbid0IHdvcmsgd2l0aCBGbGV4Ym94IGNzc1xuICAgICAgICBpZiAobXlEaXYgIT0gbnVsbCAmJiBteURpdi5wYXJlbnRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICBteURpdi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgYGhlaWdodDogJHtteURpdi5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodH1weDsgd2lkdGg6MTAwJTtgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgQXV0b2NvbXBsZXRlIGlmIG5vdCBkaXNhYmxlZFxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUF1dG9jb21wbGV0ZSkge1xuICAgICAgICAgICAgQXV0b0NvbXBsZXRlU2luZ2xldG9uLmdldEluc3RhbmNlKCkuaW5pdEF1dG9Db21wbGV0ZSh0aGlzLmxhbmd1YWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdoZW4gY29udGVudCBpcyBsb2FkZWQsIHNjcm9sbENoYW5nZSBpcyB0cmlnZXJyZWQsXG4gICAgICAgIC8vIFdlIGNhbiBvbmx5IGZvcmNlIGF1dG8gZm9ybWF0IGF0IHRoaXMgbW9tZW50LCBiZWNhdXNlIGVkaXRvclxuICAgICAgICAvLyBkb2Vzbid0IGhhdmUgb25SZWFkeSBldmVudCAuLi5cbiAgICAgICAgLy8gIHRoaXMuX2VkaXRvci5vbkRpZFNjcm9sbENoYW5nZSgoKSA9PiB7XG4gICAgICAgIC8vICAgICBpZiAodGhpcy5hdXRvRm9ybWF0T25Mb2FkICYmICF0aGlzLl9pc0NvZGVGb3JtYXR0ZWQpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9lZGl0b3IuZ2V0QWN0aW9uKCdlZGl0b3IuYWN0aW9uLmZvcm1hdCcpLnJ1bigpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2lzQ29kZUZvcm1hdHRlZCA9IHRydWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgb24gY2hhbmdlIGV2ZW50IGZvciBzaW1wbGUgZWRpdG9yXG4gICAgICAgIHRoaXMuX2dldE9yaWdpbmFsTW9kZWwoKS5vbkRpZENoYW5nZUNvbnRlbnQoKF9lOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE9yaWdpbmFsTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlICE9PSBuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZShuZXdWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUcmlnZ2VyIG9uIGNoYW5nZSBldmVudCBmb3IgZGlmZiBlZGl0b3JcbiAgICAgICAgaWYgKHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKSkge1xuICAgICAgICAgICAgdGhpcy5fZ2V0TW9kaWZpZWRNb2RlbCgpLm9uRGlkQ2hhbmdlQ29udGVudCgoX2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdWYWw6IHN0cmluZyA9IHRoaXMuX2dldE1vZGlmaWVkTW9kZWwoKS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZVRvQ29tcGFyZSAhPT0gbmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlVG9Db21wYXJlKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBzaW1wbGUgZWRpdG9yIHRleHRcbiAgICAgKiBAcGFyYW0gZGl2XG4gICAgICogQHBhcmFtIG9wdGlvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pbml0U2ltcGxlRWRpdG9yKGRpdjogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuICAgICAgICByZXR1cm4gbW9uYWNvLmVkaXRvci5jcmVhdGUoZGl2LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBkaWZmIGVkaXRvciB0byBjb21wYXJlIHR3byBzdHJpbmcgKF92YWx1ZSBhbmQgX3ZhbHVlVG9Db21wYXJlKVxuICAgICAqIEBwYXJhbSBkaXZcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pbml0RGlmZkVkaXRvcihkaXY6IEhUTUxEaXZFbGVtZW50LCBvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsTW9kZWwgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuX3ZhbHVlLCB0aGlzLmxhbmd1YWdlKTtcbiAgICAgICAgbGV0IG1vZGlmaWVkTW9kZWwgPSBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMuX3ZhbHVlVG9Db21wYXJlLCB0aGlzLmxhbmd1YWdlKTtcblxuICAgICAgICBsZXQgZGlmZkVkaXRvciA9IG1vbmFjby5lZGl0b3IuY3JlYXRlRGlmZkVkaXRvcihkaXYsIG9wdGlvbnMpO1xuICAgICAgICBkaWZmRWRpdG9yLnNldE1vZGVsKHtcbiAgICAgICAgICAgIG1vZGlmaWVkOiBtb2RpZmllZE1vZGVsLFxuICAgICAgICAgICAgb3JpZ2luYWw6IG9yaWdpbmFsTW9kZWwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkaWZmRWRpdG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE9wdGlvbnMoKTogSUVkaXRvck9wdGlvbnMge1xuICAgICAgICBsZXQgb3B0aW9uczogSUVkaXRvck9wdGlvbnMgPSBuZXcgSUVkaXRvck9wdGlvbnMoKTtcbiAgICAgICAgb3B0aW9ucy5leHBlcmltZW50YWxTY3JlZW5SZWFkZXIgPSB0aGlzLmV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcjtcbiAgICAgICAgb3B0aW9ucy5hcmlhTGFiZWwgPSB0aGlzLmFyaWFMYWJlbDtcbiAgICAgICAgb3B0aW9ucy5ydWxlcnMgPSB0aGlzLnJ1bGVycztcbiAgICAgICAgb3B0aW9ucy53b3JkU2VwYXJhdG9ycyA9IHRoaXMud29yZFNlcGFyYXRvcnM7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0aW9uQ2xpcGJvYXJkID0gdGhpcy5zZWxlY3Rpb25DbGlwYm9hcmQ7XG4gICAgICAgIG9wdGlvbnMubGluZU51bWJlcnMgPSB0aGlzLmxpbmVOdW1iZXJzO1xuICAgICAgICBvcHRpb25zLnNlbGVjdE9uTGluZU51bWJlcnMgPSB0aGlzLnNlbGVjdE9uTGluZU51bWJlcnM7XG4gICAgICAgIG9wdGlvbnMubGluZU51bWJlcnNNaW5DaGFycyA9IHRoaXMubGluZU51bWJlcnNNaW5DaGFycztcbiAgICAgICAgb3B0aW9ucy5nbHlwaE1hcmdpbiA9IHRoaXMuZ2x5cGhNYXJnaW47XG4gICAgICAgIG9wdGlvbnMubGluZURlY29yYXRpb25zV2lkdGggPSB0aGlzLmxpbmVEZWNvcmF0aW9uc1dpZHRoO1xuICAgICAgICBvcHRpb25zLnJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmcgPSB0aGlzLnJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc7XG4gICAgICAgIG9wdGlvbnMucm91bmRlZFNlbGVjdGlvbiA9IHRoaXMucm91bmRlZFNlbGVjdGlvbjtcbiAgICAgICAgb3B0aW9ucy50aGVtZSA9IHRoaXMudGhlbWU7XG4gICAgICAgIG9wdGlvbnMucmVhZE9ubHkgPSB0aGlzLnJlYWRPbmx5O1xuICAgICAgICBvcHRpb25zLnNjcm9sbGJhciA9IHRoaXMuc2Nyb2xsYmFyO1xuICAgICAgICBvcHRpb25zLm92ZXJ2aWV3UnVsZXJMYW5lcyA9IHRoaXMub3ZlcnZpZXdSdWxlckxhbmVzO1xuICAgICAgICBvcHRpb25zLmN1cnNvckJsaW5raW5nID0gdGhpcy5jdXJzb3JCbGlua2luZztcbiAgICAgICAgb3B0aW9ucy5tb3VzZVdoZWVsWm9vbSA9IHRoaXMubW91c2VXaGVlbFpvb207XG4gICAgICAgIG9wdGlvbnMuY3Vyc29yU3R5bGUgPSB0aGlzLmN1cnNvclN0eWxlO1xuICAgICAgICBvcHRpb25zLm1vdXNlV2hlZWxab29tID0gdGhpcy5tb3VzZVdoZWVsWm9vbTtcbiAgICAgICAgb3B0aW9ucy5mb250TGlnYXR1cmVzID0gdGhpcy5mb250TGlnYXR1cmVzO1xuICAgICAgICBvcHRpb25zLmRpc2FibGVUcmFuc2xhdGUzZCA9IHRoaXMuZGlzYWJsZVRyYW5zbGF0ZTNkO1xuICAgICAgICBvcHRpb25zLmhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXIgPSB0aGlzLmhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI7XG4gICAgICAgIG9wdGlvbnMuc2Nyb2xsQmV5b25kTGFzdExpbmUgPSB0aGlzLnNjcm9sbEJleW9uZExhc3RMaW5lO1xuICAgICAgICBvcHRpb25zLmF1dG9tYXRpY0xheW91dCA9IHRoaXMuYXV0b21hdGljTGF5b3V0O1xuICAgICAgICBvcHRpb25zLndyYXBwaW5nQ29sdW1uID0gdGhpcy53cmFwcGluZ0NvbHVtbjtcbiAgICAgICAgb3B0aW9ucy53b3JkV3JhcCA9IHRoaXMud29yZFdyYXA7XG4gICAgICAgIG9wdGlvbnMud3JhcHBpbmdJbmRlbnQgPSB0aGlzLndyYXBwaW5nSW5kZW50O1xuICAgICAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycztcbiAgICAgICAgb3B0aW9ucy53b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzO1xuICAgICAgICBvcHRpb25zLndvcmRXcmFwQnJlYWtPYnRydXNpdmVDaGFyYWN0ZXJzID0gdGhpcy53b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycztcbiAgICAgICAgb3B0aW9ucy5zdG9wUmVuZGVyaW5nTGluZUFmdGVyID0gdGhpcy5zdG9wUmVuZGVyaW5nTGluZUFmdGVyO1xuICAgICAgICBvcHRpb25zLmhvdmVyID0gdGhpcy5ob3ZlcjtcbiAgICAgICAgb3B0aW9ucy5jb250ZXh0bWVudSA9IHRoaXMuY29udGV4dG1lbnU7XG4gICAgICAgIG9wdGlvbnMubW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5ID0gdGhpcy5tb3VzZVdoZWVsU2Nyb2xsU2Vuc2l0aXZpdHk7XG4gICAgICAgIG9wdGlvbnMucXVpY2tTdWdnZXN0aW9ucyA9IHRoaXMucXVpY2tTdWdnZXN0aW9ucztcbiAgICAgICAgb3B0aW9ucy5xdWlja1N1Z2dlc3Rpb25zRGVsYXkgPSB0aGlzLnF1aWNrU3VnZ2VzdGlvbnNEZWxheTtcbiAgICAgICAgb3B0aW9ucy5wYXJhbWV0ZXJIaW50cyA9IHRoaXMucGFyYW1ldGVySGludHM7XG4gICAgICAgIG9wdGlvbnMuaWNvbnNJblN1Z2dlc3Rpb25zID0gdGhpcy5pY29uc0luU3VnZ2VzdGlvbnM7XG4gICAgICAgIG9wdGlvbnMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9IHRoaXMuYXV0b0Nsb3NpbmdCcmFja2V0cztcbiAgICAgICAgb3B0aW9ucy5mb3JtYXRPblR5cGUgPSB0aGlzLmZvcm1hdE9uVHlwZTtcbiAgICAgICAgb3B0aW9ucy5zdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycyA9IHRoaXMuc3VnZ2VzdE9uVHJpZ2dlckNoYXJhY3RlcnM7XG4gICAgICAgIG9wdGlvbnMuYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXIgPSB0aGlzLmFjY2VwdFN1Z2dlc3Rpb25PbkVudGVyO1xuICAgICAgICBvcHRpb25zLnNuaXBwZXRTdWdnZXN0aW9ucyA9IHRoaXMuc25pcHBldFN1Z2dlc3Rpb25zO1xuICAgICAgICBvcHRpb25zLnRhYkNvbXBsZXRpb24gPSB0aGlzLnRhYkNvbXBsZXRpb247XG4gICAgICAgIG9wdGlvbnMud29yZEJhc2VkU3VnZ2VzdGlvbnMgPSB0aGlzLndvcmRCYXNlZFN1Z2dlc3Rpb25zO1xuICAgICAgICBvcHRpb25zLnNlbGVjdGlvbkhpZ2hsaWdodCA9IHRoaXMuc2VsZWN0aW9uSGlnaGxpZ2h0O1xuICAgICAgICBvcHRpb25zLmNvZGVMZW5zID0gdGhpcy5jb2RlTGVucztcbiAgICAgICAgb3B0aW9ucy5mb2xkaW5nID0gdGhpcy5mb2xkaW5nO1xuICAgICAgICBvcHRpb25zLnJlbmRlcldoaXRlc3BhY2UgPSB0aGlzLnJlbmRlcldoaXRlc3BhY2U7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyQ29udHJvbENoYXJhY3RlcnMgPSB0aGlzLnJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzO1xuICAgICAgICBvcHRpb25zLnJlbmRlckluZGVudEd1aWRlcyA9IHRoaXMucmVuZGVySW5kZW50R3VpZGVzO1xuICAgICAgICBvcHRpb25zLnJlbmRlckxpbmVIaWdobGlnaHQgPSB0aGlzLnJlbmRlckxpbmVIaWdobGlnaHQ7XG4gICAgICAgIG9wdGlvbnMudXNlVGFiU3RvcHMgPSB0aGlzLnVzZVRhYlN0b3BzO1xuICAgICAgICBvcHRpb25zLmZvbnRGYW1pbHkgPSB0aGlzLmZvbnRGYW1pbHk7XG4gICAgICAgIG9wdGlvbnMuZm9udFdlaWdodCA9IHRoaXMuZm9udFdlaWdodDtcbiAgICAgICAgb3B0aW9ucy5mb250U2l6ZSA9IHRoaXMuZm9udFNpemU7XG4gICAgICAgIG9wdGlvbnMubGluZUhlaWdodCA9IHRoaXMubGluZUhlaWdodDtcbiAgICAgICAgb3B0aW9ucy52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgICBvcHRpb25zLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcblxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgICAgIC5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICgoPGFueT5vcHRpb25zKVtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlICg8YW55Pm9wdGlvbnMpW2tleV07IC8vIFJlbW92ZSBhbGwgdW5kZWZpbmVkIHByb3BlcnRpZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlVmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZVZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBwcml2YXRlIF91cGRhdGVWYWx1ZVRvQ29tcGFyZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdmFsdWVUb0NvbXBhcmUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZVRvQ29tcGFyZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRPcmlnaW5hbE1vZGVsKCkge1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5vcmlnaW5hbCA/IG1vZGVsLm9yaWdpbmFsIDogbW9kZWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRNb2RpZmllZE1vZGVsKCkge1xuICAgICAgICBpZiAodGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgICBsZXQgbW9kZWwgPSB0aGlzLl9lZGl0b3IuZ2V0TW9kZWwoKTtcbiAgICAgICAgICAgIHJldHVybiBtb2RlbC5tb2RpZmllZCA/IG1vZGVsLm1vZGlmaWVkIDogbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==