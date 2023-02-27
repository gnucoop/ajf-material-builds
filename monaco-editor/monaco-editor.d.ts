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
import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { IEditorLanguage } from './editor-language-model';
import { IEditorScrollbarOptions } from './editor-scrollbar-options';
import { IEditorTheme } from './editor-theme';
import * as i0 from "@angular/core";
export declare class AjfMonacoEditor implements OnDestroy, AfterViewInit, OnChanges {
    experimentalScreenReader?: boolean;
    ariaLabel?: string;
    rulers?: number[];
    wordSeparators?: string;
    selectionClipboard?: boolean;
    lineNumbers?: boolean;
    selectOnLineNumbers?: boolean;
    lineNumbersMinChars?: number;
    glyphMargin?: boolean;
    lineDecorationsWidth?: number;
    revealHorizontalRightPadding?: number;
    roundedSelection?: boolean;
    theme?: IEditorTheme;
    readOnly?: boolean;
    scrollbar?: IEditorScrollbarOptions;
    overviewRulerLanes?: number;
    cursorBlinking?: string;
    mouseWheelZoom?: boolean;
    cursorStyle?: string;
    fontLigatures?: boolean;
    disableTranslate3d?: boolean;
    hideCursorInOverviewRuler?: boolean;
    scrollBeyondLastLine?: boolean;
    automaticLayout?: boolean;
    wrappingColumn?: number;
    wordWrap?: boolean;
    wrappingIndent?: string;
    wordWrapBreakBeforeCharacters?: string;
    wordWrapBreakAfterCharacters?: string;
    wordWrapBreakObtrusiveCharacters?: string;
    stopRenderingLineAfter?: number;
    hover?: boolean;
    contextmenu?: boolean;
    mouseWheelScrollSensitivity?: number;
    quickSuggestions?: boolean;
    quickSuggestionsDelay?: number;
    parameterHints?: boolean;
    iconsInSuggestions?: boolean;
    autoClosingBrackets?: boolean;
    formatOnType?: boolean;
    suggestOnTriggerCharacters?: boolean;
    acceptSuggestionOnEnter?: boolean;
    snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
    tabCompletion?: boolean;
    wordBasedSuggestions?: boolean;
    selectionHighlight?: boolean;
    codeLens?: boolean;
    folding?: boolean;
    renderWhitespace?: 'none' | 'boundary' | 'all';
    renderControlCharacters?: boolean;
    renderIndentGuides?: boolean;
    renderLineHighlight?: boolean;
    useTabStops?: boolean;
    fontFamily?: string;
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontSize?: number;
    lineHeight?: number;
    language: IEditorLanguage;
    disableAutocomplete: boolean;
    autoFormatOnLoad: boolean;
    monacoLibPath: string;
    set valueToCompare(v: string);
    set value(v: string);
    readonly valueChange: EventEmitter<any>;
    readonly valueToCompareChange: EventEmitter<any>;
    readonly init: EventEmitter<any>;
    editorContent: ElementRef;
    private _editor;
    get editor(): any;
    private _value;
    private _valueToCompare;
    constructor();
    /**
     * load Monaco lib
     */
    ngAfterViewInit(): void;
    /**
     * Upon destruction of the component we make sure to dispose both the editor and
     * the extra libs that we might've loaded
     */
    ngOnDestroy(): void;
    ngOnChanges(_changes: {
        [propKey: string]: SimpleChange;
    }): void;
    /**
     * Destroy the monaco componenent
     */
    dispose(): void;
    /**
     * Triggered when windows is resized
     * @param event
     */
    onResize(_event: any): void;
    /**
     * Init editor
     * Is called once monaco library is available
     */
    private _initMonaco;
    private _initEditor;
    /**
     * Create a simple editor text
     * @param div
     * @param options
     */
    private _initSimpleEditor;
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     */
    private _initDiffEditor;
    private _getOptions;
    /**
     * UpdateValue
     *
     * @param value
     */
    private _updateValue;
    /**
     * UpdateValue
     *
     * @param value
     */
    private _updateValueToCompare;
    private _getOriginalModel;
    private _getModifiedModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMonacoEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMonacoEditor, "ajf-monaco-editor", never, { "experimentalScreenReader": "experimentalScreenReader"; "ariaLabel": "ariaLabel"; "rulers": "rulers"; "wordSeparators": "wordSeparators"; "selectionClipboard": "selectionClipboard"; "lineNumbers": "lineNumbers"; "selectOnLineNumbers": "selectOnLineNumbers"; "lineNumbersMinChars": "lineNumbersMinChars"; "glyphMargin": "glyphMargin"; "lineDecorationsWidth": "lineDecorationsWidth"; "revealHorizontalRightPadding": "revealHorizontalRightPadding"; "roundedSelection": "roundedSelection"; "theme": "theme"; "readOnly": "readOnly"; "scrollbar": "scrollbar"; "overviewRulerLanes": "overviewRulerLanes"; "cursorBlinking": "cursorBlinking"; "mouseWheelZoom": "mouseWheelZoom"; "cursorStyle": "cursorStyle"; "fontLigatures": "fontLigatures"; "disableTranslate3d": "disableTranslate3d"; "hideCursorInOverviewRuler": "hideCursorInOverviewRuler"; "scrollBeyondLastLine": "scrollBeyondLastLine"; "automaticLayout": "automaticLayout"; "wrappingColumn": "wrappingColumn"; "wordWrap": "wordWrap"; "wrappingIndent": "wrappingIndent"; "wordWrapBreakBeforeCharacters": "wordWrapBreakBeforeCharacters"; "wordWrapBreakAfterCharacters": "wordWrapBreakAfterCharacters"; "wordWrapBreakObtrusiveCharacters": "wordWrapBreakObtrusiveCharacters"; "stopRenderingLineAfter": "stopRenderingLineAfter"; "hover": "hover"; "contextmenu": "contextmenu"; "mouseWheelScrollSensitivity": "mouseWheelScrollSensitivity"; "quickSuggestions": "quickSuggestions"; "quickSuggestionsDelay": "quickSuggestionsDelay"; "parameterHints": "parameterHints"; "iconsInSuggestions": "iconsInSuggestions"; "autoClosingBrackets": "autoClosingBrackets"; "formatOnType": "formatOnType"; "suggestOnTriggerCharacters": "suggestOnTriggerCharacters"; "acceptSuggestionOnEnter": "acceptSuggestionOnEnter"; "snippetSuggestions": "snippetSuggestions"; "tabCompletion": "tabCompletion"; "wordBasedSuggestions": "wordBasedSuggestions"; "selectionHighlight": "selectionHighlight"; "codeLens": "codeLens"; "folding": "folding"; "renderWhitespace": "renderWhitespace"; "renderControlCharacters": "renderControlCharacters"; "renderIndentGuides": "renderIndentGuides"; "renderLineHighlight": "renderLineHighlight"; "useTabStops": "useTabStops"; "fontFamily": "fontFamily"; "fontWeight": "fontWeight"; "fontSize": "fontSize"; "lineHeight": "lineHeight"; "language": "language"; "disableAutocomplete": "disableAutocomplete"; "autoFormatOnLoad": "autoFormatOnLoad"; "monacoLibPath": "monacoLibPath"; "valueToCompare": "valueToCompare"; "value": "value"; }, { "valueChange": "valueChange"; "valueToCompareChange": "valueToCompareChange"; "init": "init"; }, never, never, false, never>;
}
