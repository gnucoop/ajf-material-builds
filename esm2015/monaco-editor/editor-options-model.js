/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-options-model.ts
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
/**
 * Configuration options for the editor.
 */
export class IEditorOptions {
}
if (false) {
    /**
     * Enable experimental screen reader support.
     * Defaults to `true`.
     * @type {?}
     */
    IEditorOptions.prototype.experimentalScreenReader;
    /**
     * The aria label for the editor's textarea (when it is focused).
     * @type {?}
     */
    IEditorOptions.prototype.ariaLabel;
    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     * @type {?}
     */
    IEditorOptions.prototype.rulers;
    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to ``~!\@#$%^&*()-=+[{]}\\|;:\'',.`<``>`/?
     * @type {?}
     */
    IEditorOptions.prototype.wordSeparators;
    /**
     * Enable Linux primary clipboard.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.selectionClipboard;
    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number
     * and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally
     * (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.lineNumbers;
    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.selectOnLineNumbers;
    /**
     * Control the width of line numbers, by reserving horizontal space
     * for rendering at least an amount of digits.
     * Defaults to 5.
     * @type {?}
     */
    IEditorOptions.prototype.lineNumbersMinChars;
    /**
     * Enable the rendering of the glyph margin.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.glyphMargin;
    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * Defaults to 10.
     * @type {?}
     */
    IEditorOptions.prototype.lineDecorationsWidth;
    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor,
     * turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before
     * hitting the edge of the viewport.
     * Defaults to 30 (px).
     * @type {?}
     */
    IEditorOptions.prototype.revealHorizontalRightPadding;
    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.roundedSelection;
    /**
     * Theme to be used for rendering. Consists of two parts, the UI theme and the syntax theme,
     * separated by a space.
     * The current available UI themes are: 'vs' (default), 'vs-dark', 'hc-black'
     * The syntax themes are contributed. The default is 'default-theme'
     * @type {?}
     */
    IEditorOptions.prototype.theme;
    /**
     * Should the editor be read only.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.readOnly;
    /**
     * Control the behavior and rendering of the scrollbars.
     * @type {?}
     */
    IEditorOptions.prototype.scrollbar;
    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     * @type {?}
     */
    IEditorOptions.prototype.overviewRulerLanes;
    /**
     * Control the cursor animation style, possible values are
     * 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     * @type {?}
     */
    IEditorOptions.prototype.cursorBlinking;
    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.mouseWheelZoom;
    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     * @type {?}
     */
    IEditorOptions.prototype.cursorStyle;
    /**
     * Enable font ligatures.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.fontLigatures;
    /**
     * Disable the use of `translate3d`.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.disableTranslate3d;
    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.hideCursorInOverviewRuler;
    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.scrollBeyondLastLine;
    /**
     * Enable that the editor will install an interval to check
     * if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.automaticLayout;
    /**
     * Control the wrapping strategy of the editor.
     * Using -1 means no wrapping whatsoever.
     * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
     * Using a positive number means wrapping after a fixed number of characters.
     * Defaults to 300.
     * @type {?}
     */
    IEditorOptions.prototype.wrappingColumn;
    /**
     * Control the alternate style of viewport wrapping.
     * When set to true viewport wrapping is used only when the window width
     * is less than the number of columns specified in the wrappingColumn property.
     * Has no effect if wrappingColumn is not a positive number.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrap;
    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'none'.
     * @type {?}
     */
    IEditorOptions.prototype.wrappingIndent;
    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrapBreakBeforeCharacters;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrapBreakAfterCharacters;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters
     * only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     * @type {?}
     */
    IEditorOptions.prototype.wordWrapBreakObtrusiveCharacters;
    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is `>`= 0.
     * Use -1 to never stop rendering
     * @type {?}
     */
    IEditorOptions.prototype.stopRenderingLineAfter;
    /**
     * Enable hover.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.hover;
    /**
     * Enable custom contextmenu.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.contextmenu;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     * @type {?}
     */
    IEditorOptions.prototype.mouseWheelScrollSensitivity;
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.quickSuggestions;
    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     * @type {?}
     */
    IEditorOptions.prototype.quickSuggestionsDelay;
    /**
     * Enables parameter hints
     * @type {?}
     */
    IEditorOptions.prototype.parameterHints;
    /**
     * Render icons in suggestions box.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.iconsInSuggestions;
    /**
     * Enable auto closing brackets.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.autoClosingBrackets;
    /**
     * Enable format on type.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.formatOnType;
    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.suggestOnTriggerCharacters;
    /**
     * Accept suggestions on ENTER.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.acceptSuggestionOnEnter;
    /**
     * Enable snippet suggestions. Default to 'true'.
     * @type {?}
     */
    IEditorOptions.prototype.snippetSuggestions;
    /**
     * Enable tab completion. Defaults to 'false'
     * @type {?}
     */
    IEditorOptions.prototype.tabCompletion;
    /**
     * Enable word based suggestions. Defaults to 'true'
     * @type {?}
     */
    IEditorOptions.prototype.wordBasedSuggestions;
    /**
     * Enable selection highlight.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.selectionHighlight;
    /**
     * Show code lens
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.codeLens;
    /**
     * Enable code folding
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.folding;
    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     * @type {?}
     */
    IEditorOptions.prototype.renderWhitespace;
    /**
     * Enable rendering of control characters.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.renderControlCharacters;
    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     * @type {?}
     */
    IEditorOptions.prototype.renderIndentGuides;
    /**
     * Enable rendering of current line highlight.
     * Defaults to true.
     * @type {?}
     */
    IEditorOptions.prototype.renderLineHighlight;
    /**
     * Inserting and deleting whitespace follows tab stops.
     * @type {?}
     */
    IEditorOptions.prototype.useTabStops;
    /**
     * The font family
     * @type {?}
     */
    IEditorOptions.prototype.fontFamily;
    /**
     * The font weight
     * @type {?}
     */
    IEditorOptions.prototype.fontWeight;
    /**
     * The font size
     * @type {?}
     */
    IEditorOptions.prototype.fontSize;
    /**
     * The line height
     * @type {?}
     */
    IEditorOptions.prototype.lineHeight;
    /**
     * Content to show
     * @type {?}
     */
    IEditorOptions.prototype.value;
    /**
     * Language of content to show
     * @type {?}
     */
    IEditorOptions.prototype.language;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLW9wdGlvbnMtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvci9lZGl0b3Itb3B0aW9ucy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNLE9BQU8sY0FBYztDQW9UMUI7Ozs7Ozs7SUEvU0csa0RBQW1DOzs7OztJQUluQyxtQ0FBbUI7Ozs7OztJQUtuQixnQ0FBa0I7Ozs7OztJQUtsQix3Q0FBd0I7Ozs7OztJQUt4Qiw0Q0FBNkI7Ozs7Ozs7Ozs7O0lBVTdCLHFDQUFzQjs7Ozs7O0lBS3RCLDZDQUE4Qjs7Ozs7OztJQU05Qiw2Q0FBNkI7Ozs7OztJQUs3QixxQ0FBc0I7Ozs7Ozs7SUFNdEIsOENBQThCOzs7Ozs7Ozs7SUFROUIsc0RBQXNDOzs7Ozs7SUFLdEMsMENBQTJCOzs7Ozs7OztJQU8zQiwrQkFBcUI7Ozs7OztJQUtyQixrQ0FBbUI7Ozs7O0lBSW5CLG1DQUFvQzs7Ozs7O0lBS3BDLDRDQUE0Qjs7Ozs7OztJQU01Qix3Q0FBd0I7Ozs7OztJQUt4Qix3Q0FBeUI7Ozs7OztJQUt6QixxQ0FBcUI7Ozs7OztJQUtyQix1Q0FBd0I7Ozs7OztJQUt4Qiw0Q0FBNkI7Ozs7OztJQUs3QixtREFBb0M7Ozs7OztJQUtwQyw4Q0FBK0I7Ozs7Ozs7O0lBTy9CLHlDQUEwQjs7Ozs7Ozs7O0lBUTFCLHdDQUF3Qjs7Ozs7Ozs7O0lBUXhCLGtDQUFtQjs7Ozs7O0lBS25CLHdDQUF3Qjs7Ozs7O0lBS3hCLHVEQUF1Qzs7Ozs7O0lBS3ZDLHNEQUFzQzs7Ozs7OztJQU10QywwREFBMEM7Ozs7Ozs7SUFNMUMsZ0RBQWdDOzs7Ozs7SUFLaEMsK0JBQWdCOzs7Ozs7SUFLaEIscUNBQXNCOzs7Ozs7SUFLdEIscURBQXFDOzs7Ozs7SUFLckMsMENBQTJCOzs7Ozs7SUFLM0IsK0NBQStCOzs7OztJQUkvQix3Q0FBeUI7Ozs7OztJQUt6Qiw0Q0FBNkI7Ozs7OztJQUs3Qiw2Q0FBOEI7Ozs7OztJQUs5QixzQ0FBdUI7Ozs7OztJQUt2QixvREFBcUM7Ozs7OztJQUtyQyxpREFBa0M7Ozs7O0lBSWxDLDRDQUEwRDs7Ozs7SUFJMUQsdUNBQXdCOzs7OztJQUl4Qiw4Q0FBK0I7Ozs7OztJQUsvQiw0Q0FBNkI7Ozs7OztJQUs3QixrQ0FBbUI7Ozs7OztJQUtuQixpQ0FBa0I7Ozs7OztJQUtsQiwwQ0FBK0M7Ozs7OztJQUsvQyxpREFBa0M7Ozs7OztJQUtsQyw0Q0FBNkI7Ozs7OztJQUs3Qiw2Q0FBOEI7Ozs7O0lBSTlCLHFDQUFzQjs7Ozs7SUFJdEIsb0NBQW9COzs7OztJQUlwQixvQ0FDd0U7Ozs7O0lBSXhFLGtDQUFrQjs7Ozs7SUFJbEIsb0NBQW9COzs7OztJQUtwQiwrQkFBYzs7Ozs7SUFJZCxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JTY3JvbGxiYXJPcHRpb25zfSBmcm9tICcuL2VkaXRvci1zY3JvbGxiYXItb3B0aW9ucyc7XG5pbXBvcnQge0lFZGl0b3JUaGVtZX0gZnJvbSAnLi9lZGl0b3ItdGhlbWUnO1xuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBlZGl0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBJRWRpdG9yT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIGV4cGVyaW1lbnRhbCBzY3JlZW4gcmVhZGVyIHN1cHBvcnQuXG4gICAgICogRGVmYXVsdHMgdG8gYHRydWVgLlxuICAgICAqL1xuICAgIGV4cGVyaW1lbnRhbFNjcmVlblJlYWRlcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIGFyaWEgbGFiZWwgZm9yIHRoZSBlZGl0b3IncyB0ZXh0YXJlYSAod2hlbiBpdCBpcyBmb2N1c2VkKS5cbiAgICAgKi9cbiAgICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHZlcnRpY2FsIGxpbmVzIGF0IHRoZSBzcGVjaWZpZWQgY29sdW1ucy5cbiAgICAgKiBEZWZhdWx0cyB0byBlbXB0eSBhcnJheS5cbiAgICAgKi9cbiAgICBydWxlcnM/OiBudW1iZXJbXTtcbiAgICAvKipcbiAgICAgKiBBIHN0cmluZyBjb250YWluaW5nIHRoZSB3b3JkIHNlcGFyYXRvcnMgdXNlZCB3aGVuIGRvaW5nIHdvcmQgbmF2aWdhdGlvbi5cbiAgICAgKiBEZWZhdWx0cyB0byBgYH4hQCMkJV4mKigpLT0rW3tdfVxcXFx8OzpcXCcnLC5gPGBgPmAvP1xuICAgICAqL1xuICAgIHdvcmRTZXBhcmF0b3JzPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBMaW51eCBwcmltYXJ5IGNsaXBib2FyZC5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgcmVuZGVyaW5nIG9mIGxpbmUgbnVtYmVycy5cbiAgICAgKiBJZiBpdCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGludm9rZWQgd2hlbiByZW5kZXJpbmcgYSBsaW5lIG51bWJlclxuICAgICAqIGFuZCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYmUgcmVuZGVyZWQuXG4gICAgICogT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRydWV5LCBsaW5lIG51bWJlcnMgd2lsbCBiZSByZW5kZXJlZCBub3JtYWxseVxuICAgICAqIChlcXVpdmFsZW50IG9mIHVzaW5nIGFuIGlkZW50aXR5IGZ1bmN0aW9uKS5cbiAgICAgKiBPdGhlcndpc2UsIGxpbmUgbnVtYmVycyB3aWxsIG5vdCBiZSByZW5kZXJlZC5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGxpbmVOdW1iZXJzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTaG91bGQgdGhlIGNvcnJlc3BvbmRpbmcgbGluZSBiZSBzZWxlY3RlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBsaW5lIG51bWJlcj9cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHNlbGVjdE9uTGluZU51bWJlcnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIHdpZHRoIG9mIGxpbmUgbnVtYmVycywgYnkgcmVzZXJ2aW5nIGhvcml6b250YWwgc3BhY2VcbiAgICAgKiBmb3IgcmVuZGVyaW5nIGF0IGxlYXN0IGFuIGFtb3VudCBvZiBkaWdpdHMuXG4gICAgICogRGVmYXVsdHMgdG8gNS5cbiAgICAgKi9cbiAgICBsaW5lTnVtYmVyc01pbkNoYXJzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSB0aGUgcmVuZGVyaW5nIG9mIHRoZSBnbHlwaCBtYXJnaW4uXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgZ2x5cGhNYXJnaW4/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFRoZSB3aWR0aCByZXNlcnZlZCBmb3IgbGluZSBkZWNvcmF0aW9ucyAoaW4gcHgpLlxuICAgICAqIExpbmUgZGVjb3JhdGlvbnMgYXJlIHBsYWNlZCBiZXR3ZWVuIGxpbmUgbnVtYmVycyBhbmQgdGhlIGVkaXRvciBjb250ZW50LlxuICAgICAqIERlZmF1bHRzIHRvIDEwLlxuICAgICAqL1xuICAgIGxpbmVEZWNvcmF0aW9uc1dpZHRoPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFdoZW4gcmV2ZWFsaW5nIHRoZSBjdXJzb3IsIGEgdmlydHVhbCBwYWRkaW5nIChweCkgaXMgYWRkZWQgdG8gdGhlIGN1cnNvcixcbiAgICAgKiB0dXJuaW5nIGl0IGludG8gYSByZWN0YW5nbGUuXG4gICAgICogVGhpcyB2aXJ0dWFsIHBhZGRpbmcgZW5zdXJlcyB0aGF0IHRoZSBjdXJzb3IgZ2V0cyByZXZlYWxlZCBiZWZvcmVcbiAgICAgKiBoaXR0aW5nIHRoZSBlZGdlIG9mIHRoZSB2aWV3cG9ydC5cbiAgICAgKiBEZWZhdWx0cyB0byAzMCAocHgpLlxuICAgICAqL1xuICAgIHJldmVhbEhvcml6b250YWxSaWdodFBhZGRpbmc/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBlZGl0b3Igc2VsZWN0aW9uIHdpdGggcm91bmRlZCBib3JkZXJzLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgcm91bmRlZFNlbGVjdGlvbj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlbWUgdG8gYmUgdXNlZCBmb3IgcmVuZGVyaW5nLiBDb25zaXN0cyBvZiB0d28gcGFydHMsIHRoZSBVSSB0aGVtZSBhbmQgdGhlIHN5bnRheCB0aGVtZSxcbiAgICAgKiBzZXBhcmF0ZWQgYnkgYSBzcGFjZS5cbiAgICAgKiBUaGUgY3VycmVudCBhdmFpbGFibGUgVUkgdGhlbWVzIGFyZTogJ3ZzJyAoZGVmYXVsdCksICd2cy1kYXJrJywgJ2hjLWJsYWNrJ1xuICAgICAqIFRoZSBzeW50YXggdGhlbWVzIGFyZSBjb250cmlidXRlZC4gVGhlIGRlZmF1bHQgaXMgJ2RlZmF1bHQtdGhlbWUnXG4gICAgICovXG4gICAgdGhlbWU/OiBJRWRpdG9yVGhlbWU7XG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRoZSBlZGl0b3IgYmUgcmVhZCBvbmx5LlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSBiZWhhdmlvciBhbmQgcmVuZGVyaW5nIG9mIHRoZSBzY3JvbGxiYXJzLlxuICAgICAqL1xuICAgIHNjcm9sbGJhcj86IElFZGl0b3JTY3JvbGxiYXJPcHRpb25zO1xuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgdmVydGljYWwgbGFuZXMgdGhlIG92ZXJ2aWV3IHJ1bGVyIHNob3VsZCByZW5kZXIuXG4gICAgICogRGVmYXVsdHMgdG8gMi5cbiAgICAgKi9cbiAgICBvdmVydmlld1J1bGVyTGFuZXM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgY3Vyc29yIGFuaW1hdGlvbiBzdHlsZSwgcG9zc2libGUgdmFsdWVzIGFyZVxuICAgICAqICdibGluaycsICdzbW9vdGgnLCAncGhhc2UnLCAnZXhwYW5kJyBhbmQgJ3NvbGlkJy5cbiAgICAgKiBEZWZhdWx0cyB0byAnYmxpbmsnLlxuICAgICAqL1xuICAgIGN1cnNvckJsaW5raW5nPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFpvb20gdGhlIGZvbnQgaW4gdGhlIGVkaXRvciB3aGVuIHVzaW5nIHRoZSBtb3VzZSB3aGVlbCBpbiBjb21iaW5hdGlvbiB3aXRoIGhvbGRpbmcgQ3RybC5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBtb3VzZVdoZWVsWm9vbT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgY3Vyc29yIHN0eWxlLCBlaXRoZXIgJ2Jsb2NrJyBvciAnbGluZScuXG4gICAgICogRGVmYXVsdHMgdG8gJ2xpbmUnLlxuICAgICAqL1xuICAgIGN1cnNvclN0eWxlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBmb250IGxpZ2F0dXJlcy5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBmb250TGlnYXR1cmVzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHRoZSB1c2Ugb2YgYHRyYW5zbGF0ZTNkYC5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBkaXNhYmxlVHJhbnNsYXRlM2Q/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNob3VsZCB0aGUgY3Vyc29yIGJlIGhpZGRlbiBpbiB0aGUgb3ZlcnZpZXcgcnVsZXIuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgaGlkZUN1cnNvckluT3ZlcnZpZXdSdWxlcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRoYXQgc2Nyb2xsaW5nIGNhbiBnbyBvbmUgc2NyZWVuIHNpemUgYWZ0ZXIgdGhlIGxhc3QgbGluZS5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHNjcm9sbEJleW9uZExhc3RMaW5lPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGhhdCB0aGUgZWRpdG9yIHdpbGwgaW5zdGFsbCBhbiBpbnRlcnZhbCB0byBjaGVja1xuICAgICAqIGlmIGl0cyBjb250YWluZXIgZG9tIG5vZGUgc2l6ZSBoYXMgY2hhbmdlZC5cbiAgICAgKiBFbmFibGluZyB0aGlzIG1pZ2h0IGhhdmUgYSBzZXZlcmUgcGVyZm9ybWFuY2UgaW1wYWN0LlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIGF1dG9tYXRpY0xheW91dD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgd3JhcHBpbmcgc3RyYXRlZ3kgb2YgdGhlIGVkaXRvci5cbiAgICAgKiBVc2luZyAtMSBtZWFucyBubyB3cmFwcGluZyB3aGF0c29ldmVyLlxuICAgICAqIFVzaW5nIDAgbWVhbnMgdmlld3BvcnQgd2lkdGggd3JhcHBpbmcgKGFqdXN0cyB3aXRoIHRoZSByZXNpemluZyBvZiB0aGUgZWRpdG9yKS5cbiAgICAgKiBVc2luZyBhIHBvc2l0aXZlIG51bWJlciBtZWFucyB3cmFwcGluZyBhZnRlciBhIGZpeGVkIG51bWJlciBvZiBjaGFyYWN0ZXJzLlxuICAgICAqIERlZmF1bHRzIHRvIDMwMC5cbiAgICAgKi9cbiAgICB3cmFwcGluZ0NvbHVtbj86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSBhbHRlcm5hdGUgc3R5bGUgb2Ygdmlld3BvcnQgd3JhcHBpbmcuXG4gICAgICogV2hlbiBzZXQgdG8gdHJ1ZSB2aWV3cG9ydCB3cmFwcGluZyBpcyB1c2VkIG9ubHkgd2hlbiB0aGUgd2luZG93IHdpZHRoXG4gICAgICogaXMgbGVzcyB0aGFuIHRoZSBudW1iZXIgb2YgY29sdW1ucyBzcGVjaWZpZWQgaW4gdGhlIHdyYXBwaW5nQ29sdW1uIHByb3BlcnR5LlxuICAgICAqIEhhcyBubyBlZmZlY3QgaWYgd3JhcHBpbmdDb2x1bW4gaXMgbm90IGEgcG9zaXRpdmUgbnVtYmVyLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIHdvcmRXcmFwPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIGluZGVudGF0aW9uIG9mIHdyYXBwZWQgbGluZXMuIENhbiBiZTogJ25vbmUnLCAnc2FtZScgb3IgJ2luZGVudCcuXG4gICAgICogRGVmYXVsdHMgdG8gJ25vbmUnLlxuICAgICAqL1xuICAgIHdyYXBwaW5nSW5kZW50Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZSB3b3JkIHdyYXBwaW5nIGNoYXJhY3RlcnMuIEEgYnJlYWsgd2lsbCBiZSBpbnRyb2R1Y2VkIGJlZm9yZSB0aGVzZSBjaGFyYWN0ZXJzLlxuICAgICAqIERlZmF1bHRzIHRvICd7KFsrJy5cbiAgICAgKi9cbiAgICB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBDb25maWd1cmUgd29yZCB3cmFwcGluZyBjaGFyYWN0ZXJzLiBBIGJyZWFrIHdpbGwgYmUgaW50cm9kdWNlZCBhZnRlciB0aGVzZSBjaGFyYWN0ZXJzLlxuICAgICAqIERlZmF1bHRzIHRvICcgXFx0fSldP3wmLDsnLlxuICAgICAqL1xuICAgIHdvcmRXcmFwQnJlYWtBZnRlckNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlIHdvcmQgd3JhcHBpbmcgY2hhcmFjdGVycy4gQSBicmVhayB3aWxsIGJlIGludHJvZHVjZWQgYWZ0ZXIgdGhlc2UgY2hhcmFjdGVyc1xuICAgICAqIG9ubHkgaWYgbm8gYHdvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzYCBvciBgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVyc2Agd2VyZSBmb3VuZC5cbiAgICAgKiBEZWZhdWx0cyB0byAnLicuXG4gICAgICovXG4gICAgd29yZFdyYXBCcmVha09idHJ1c2l2ZUNoYXJhY3RlcnM/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUGVyZm9ybWFuY2UgZ3VhcmQ6IFN0b3AgcmVuZGVyaW5nIGEgbGluZSBhZnRlciB4IGNoYXJhY3RlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gMTAwMDAgaWYgd3JhcHBpbmdDb2x1bW4gaXMgLTEuIERlZmF1bHRzIHRvIC0xIGlmIHdyYXBwaW5nQ29sdW1uIGlzIGA+YD0gMC5cbiAgICAgKiBVc2UgLTEgdG8gbmV2ZXIgc3RvcCByZW5kZXJpbmdcbiAgICAgKi9cbiAgICBzdG9wUmVuZGVyaW5nTGluZUFmdGVyPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBob3Zlci5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGhvdmVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgY3VzdG9tIGNvbnRleHRtZW51LlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEEgbXVsdGlwbGllciB0byBiZSB1c2VkIG9uIHRoZSBgZGVsdGFYYCBhbmQgYGRlbHRhWWAgb2YgbW91c2Ugd2hlZWwgc2Nyb2xsIGV2ZW50cy5cbiAgICAgKiBEZWZhdWx0cyB0byAxLlxuICAgICAqL1xuICAgIG1vdXNlV2hlZWxTY3JvbGxTZW5zaXRpdml0eT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgcXVpY2sgc3VnZ2VzdGlvbnMgKHNoYWRvdyBzdWdnZXN0aW9ucylcbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHF1aWNrU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFF1aWNrIHN1Z2dlc3Rpb25zIHNob3cgZGVsYXkgKGluIG1zKVxuICAgICAqIERlZmF1bHRzIHRvIDUwMCAobXMpXG4gICAgICovXG4gICAgcXVpY2tTdWdnZXN0aW9uc0RlbGF5PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgcGFyYW1ldGVyIGhpbnRzXG4gICAgICovXG4gICAgcGFyYW1ldGVySGludHM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBpY29ucyBpbiBzdWdnZXN0aW9ucyBib3guXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBpY29uc0luU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBhdXRvIGNsb3NpbmcgYnJhY2tldHMuXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBhdXRvQ2xvc2luZ0JyYWNrZXRzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgZm9ybWF0IG9uIHR5cGUuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgZm9ybWF0T25UeXBlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGhlIHN1Z2dlc3Rpb24gYm94IHRvIHBvcC11cCBvbiB0cmlnZ2VyIGNoYXJhY3RlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBzdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQWNjZXB0IHN1Z2dlc3Rpb25zIG9uIEVOVEVSLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgYWNjZXB0U3VnZ2VzdGlvbk9uRW50ZXI/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBzbmlwcGV0IHN1Z2dlc3Rpb25zLiBEZWZhdWx0IHRvICd0cnVlJy5cbiAgICAgKi9cbiAgICBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJyB8ICdib3R0b20nIHwgJ2lubGluZScgfCAnbm9uZSc7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRhYiBjb21wbGV0aW9uLiBEZWZhdWx0cyB0byAnZmFsc2UnXG4gICAgICovXG4gICAgdGFiQ29tcGxldGlvbj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRW5hYmxlIHdvcmQgYmFzZWQgc3VnZ2VzdGlvbnMuIERlZmF1bHRzIHRvICd0cnVlJ1xuICAgICAqL1xuICAgIHdvcmRCYXNlZFN1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgc2VsZWN0aW9uIGhpZ2hsaWdodC5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHNlbGVjdGlvbkhpZ2hsaWdodD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2hvdyBjb2RlIGxlbnNcbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgY29kZSBmb2xkaW5nXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBmb2xkaW5nPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgcmVuZGVyaW5nIG9mIHdoaXRlc3BhY2UuXG4gICAgICogRGVmYXVsdHMgdG8gbm9uZS5cbiAgICAgKi9cbiAgICByZW5kZXJXaGl0ZXNwYWNlPzogJ25vbmUnIHwgJ2JvdW5kYXJ5JyB8ICdhbGwnO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSByZW5kZXJpbmcgb2YgY29udHJvbCBjaGFyYWN0ZXJzLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIHJlbmRlckNvbnRyb2xDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgcmVuZGVyaW5nIG9mIGluZGVudCBndWlkZXMuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgcmVuZGVySW5kZW50R3VpZGVzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgcmVuZGVyaW5nIG9mIGN1cnJlbnQgbGluZSBoaWdobGlnaHQuXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICByZW5kZXJMaW5lSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBJbnNlcnRpbmcgYW5kIGRlbGV0aW5nIHdoaXRlc3BhY2UgZm9sbG93cyB0YWIgc3RvcHMuXG4gICAgICovXG4gICAgdXNlVGFiU3RvcHM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFRoZSBmb250IGZhbWlseVxuICAgICAqL1xuICAgIGZvbnRGYW1pbHk/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGZvbnQgd2VpZ2h0XG4gICAgICovXG4gICAgZm9udFdlaWdodD86ICdub3JtYWwnIHwgJ2JvbGQnIHwgJ2JvbGRlcicgfCAnbGlnaHRlcicgfCAnaW5pdGlhbCcgfCAnaW5oZXJpdCcgfFxuICAgICAgJzEwMCcgfCAnMjAwJyB8ICczMDAnIHwgJzQwMCcgfCAnNTAwJyB8ICc2MDAnIHwgJzcwMCcgfCAnODAwJyB8ICc5MDAnO1xuICAgIC8qKlxuICAgICAqIFRoZSBmb250IHNpemVcbiAgICAgKi9cbiAgICBmb250U2l6ZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgbGluZSBoZWlnaHRcbiAgICAgKi9cbiAgICBsaW5lSGVpZ2h0PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQ29udGVudCB0byBzaG93XG4gICAgICovXG4gICAgdmFsdWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBMYW5ndWFnZSBvZiBjb250ZW50IHRvIHNob3dcbiAgICAgKi9cbiAgICBsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlO1xufVxuIl19