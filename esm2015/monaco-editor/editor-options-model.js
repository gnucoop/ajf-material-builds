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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLW9wdGlvbnMtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvci9lZGl0b3Itb3B0aW9ucy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNLE9BQU8sY0FBYztDQW9UMUI7Ozs7Ozs7SUEvU0Msa0RBQW1DOzs7OztJQUluQyxtQ0FBbUI7Ozs7OztJQUtuQixnQ0FBa0I7Ozs7OztJQUtsQix3Q0FBd0I7Ozs7OztJQUt4Qiw0Q0FBNkI7Ozs7Ozs7Ozs7O0lBVTdCLHFDQUFzQjs7Ozs7O0lBS3RCLDZDQUE4Qjs7Ozs7OztJQU05Qiw2Q0FBNkI7Ozs7OztJQUs3QixxQ0FBc0I7Ozs7Ozs7SUFNdEIsOENBQThCOzs7Ozs7Ozs7SUFROUIsc0RBQXNDOzs7Ozs7SUFLdEMsMENBQTJCOzs7Ozs7OztJQU8zQiwrQkFBcUI7Ozs7OztJQUtyQixrQ0FBbUI7Ozs7O0lBSW5CLG1DQUFvQzs7Ozs7O0lBS3BDLDRDQUE0Qjs7Ozs7OztJQU01Qix3Q0FBd0I7Ozs7OztJQUt4Qix3Q0FBeUI7Ozs7OztJQUt6QixxQ0FBcUI7Ozs7OztJQUtyQix1Q0FBd0I7Ozs7OztJQUt4Qiw0Q0FBNkI7Ozs7OztJQUs3QixtREFBb0M7Ozs7OztJQUtwQyw4Q0FBK0I7Ozs7Ozs7O0lBTy9CLHlDQUEwQjs7Ozs7Ozs7O0lBUTFCLHdDQUF3Qjs7Ozs7Ozs7O0lBUXhCLGtDQUFtQjs7Ozs7O0lBS25CLHdDQUF3Qjs7Ozs7O0lBS3hCLHVEQUF1Qzs7Ozs7O0lBS3ZDLHNEQUFzQzs7Ozs7OztJQU10QywwREFBMEM7Ozs7Ozs7SUFNMUMsZ0RBQWdDOzs7Ozs7SUFLaEMsK0JBQWdCOzs7Ozs7SUFLaEIscUNBQXNCOzs7Ozs7SUFLdEIscURBQXFDOzs7Ozs7SUFLckMsMENBQTJCOzs7Ozs7SUFLM0IsK0NBQStCOzs7OztJQUkvQix3Q0FBeUI7Ozs7OztJQUt6Qiw0Q0FBNkI7Ozs7OztJQUs3Qiw2Q0FBOEI7Ozs7OztJQUs5QixzQ0FBdUI7Ozs7OztJQUt2QixvREFBcUM7Ozs7OztJQUtyQyxpREFBa0M7Ozs7O0lBSWxDLDRDQUFvRDs7Ozs7SUFJcEQsdUNBQXdCOzs7OztJQUl4Qiw4Q0FBK0I7Ozs7OztJQUsvQiw0Q0FBNkI7Ozs7OztJQUs3QixrQ0FBbUI7Ozs7OztJQUtuQixpQ0FBa0I7Ozs7OztJQUtsQiwwQ0FBMkM7Ozs7OztJQUszQyxpREFBa0M7Ozs7OztJQUtsQyw0Q0FBNkI7Ozs7OztJQUs3Qiw2Q0FBOEI7Ozs7O0lBSTlCLHFDQUFzQjs7Ozs7SUFJdEIsb0NBQW9COzs7OztJQUlwQixvQ0FDNEI7Ozs7O0lBSTVCLGtDQUFrQjs7Ozs7SUFJbEIsb0NBQW9COzs7OztJQUtwQiwrQkFBYzs7Ozs7SUFJZCxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JTY3JvbGxiYXJPcHRpb25zfSBmcm9tICcuL2VkaXRvci1zY3JvbGxiYXItb3B0aW9ucyc7XG5pbXBvcnQge0lFZGl0b3JUaGVtZX0gZnJvbSAnLi9lZGl0b3ItdGhlbWUnO1xuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBlZGl0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBJRWRpdG9yT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBFbmFibGUgZXhwZXJpbWVudGFsIHNjcmVlbiByZWFkZXIgc3VwcG9ydC5cbiAgICogRGVmYXVsdHMgdG8gYHRydWVgLlxuICAgKi9cbiAgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBhcmlhIGxhYmVsIGZvciB0aGUgZWRpdG9yJ3MgdGV4dGFyZWEgKHdoZW4gaXQgaXMgZm9jdXNlZCkuXG4gICAqL1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBSZW5kZXIgdmVydGljYWwgbGluZXMgYXQgdGhlIHNwZWNpZmllZCBjb2x1bW5zLlxuICAgKiBEZWZhdWx0cyB0byBlbXB0eSBhcnJheS5cbiAgICovXG4gIHJ1bGVycz86IG51bWJlcltdO1xuICAvKipcbiAgICogQSBzdHJpbmcgY29udGFpbmluZyB0aGUgd29yZCBzZXBhcmF0b3JzIHVzZWQgd2hlbiBkb2luZyB3b3JkIG5hdmlnYXRpb24uXG4gICAqIERlZmF1bHRzIHRvIGBgfiFAIyQlXiYqKCktPStbe119XFxcXHw7OlxcJycsLmA8YGA+YC8/XG4gICAqL1xuICB3b3JkU2VwYXJhdG9ycz86IHN0cmluZztcbiAgLyoqXG4gICAqIEVuYWJsZSBMaW51eCBwcmltYXJ5IGNsaXBib2FyZC5cbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIHNlbGVjdGlvbkNsaXBib2FyZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDb250cm9sIHRoZSByZW5kZXJpbmcgb2YgbGluZSBudW1iZXJzLlxuICAgKiBJZiBpdCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGludm9rZWQgd2hlbiByZW5kZXJpbmcgYSBsaW5lIG51bWJlclxuICAgKiBhbmQgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHJlbmRlcmVkLlxuICAgKiBPdGhlcndpc2UsIGlmIGl0IGlzIGEgdHJ1ZXksIGxpbmUgbnVtYmVycyB3aWxsIGJlIHJlbmRlcmVkIG5vcm1hbGx5XG4gICAqIChlcXVpdmFsZW50IG9mIHVzaW5nIGFuIGlkZW50aXR5IGZ1bmN0aW9uKS5cbiAgICogT3RoZXJ3aXNlLCBsaW5lIG51bWJlcnMgd2lsbCBub3QgYmUgcmVuZGVyZWQuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBsaW5lTnVtYmVycz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG91bGQgdGhlIGNvcnJlc3BvbmRpbmcgbGluZSBiZSBzZWxlY3RlZCB3aGVuIGNsaWNraW5nIG9uIHRoZSBsaW5lIG51bWJlcj9cbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIHNlbGVjdE9uTGluZU51bWJlcnM/OiBib29sZWFuO1xuICAvKipcbiAgICogQ29udHJvbCB0aGUgd2lkdGggb2YgbGluZSBudW1iZXJzLCBieSByZXNlcnZpbmcgaG9yaXpvbnRhbCBzcGFjZVxuICAgKiBmb3IgcmVuZGVyaW5nIGF0IGxlYXN0IGFuIGFtb3VudCBvZiBkaWdpdHMuXG4gICAqIERlZmF1bHRzIHRvIDUuXG4gICAqL1xuICBsaW5lTnVtYmVyc01pbkNoYXJzPzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHRoZSByZW5kZXJpbmcgb2YgdGhlIGdseXBoIG1hcmdpbi5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBnbHlwaE1hcmdpbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggcmVzZXJ2ZWQgZm9yIGxpbmUgZGVjb3JhdGlvbnMgKGluIHB4KS5cbiAgICogTGluZSBkZWNvcmF0aW9ucyBhcmUgcGxhY2VkIGJldHdlZW4gbGluZSBudW1iZXJzIGFuZCB0aGUgZWRpdG9yIGNvbnRlbnQuXG4gICAqIERlZmF1bHRzIHRvIDEwLlxuICAgKi9cbiAgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBXaGVuIHJldmVhbGluZyB0aGUgY3Vyc29yLCBhIHZpcnR1YWwgcGFkZGluZyAocHgpIGlzIGFkZGVkIHRvIHRoZSBjdXJzb3IsXG4gICAqIHR1cm5pbmcgaXQgaW50byBhIHJlY3RhbmdsZS5cbiAgICogVGhpcyB2aXJ0dWFsIHBhZGRpbmcgZW5zdXJlcyB0aGF0IHRoZSBjdXJzb3IgZ2V0cyByZXZlYWxlZCBiZWZvcmVcbiAgICogaGl0dGluZyB0aGUgZWRnZSBvZiB0aGUgdmlld3BvcnQuXG4gICAqIERlZmF1bHRzIHRvIDMwIChweCkuXG4gICAqL1xuICByZXZlYWxIb3Jpem9udGFsUmlnaHRQYWRkaW5nPzogbnVtYmVyO1xuICAvKipcbiAgICogUmVuZGVyIHRoZSBlZGl0b3Igc2VsZWN0aW9uIHdpdGggcm91bmRlZCBib3JkZXJzLlxuICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgcm91bmRlZFNlbGVjdGlvbj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGVtZSB0byBiZSB1c2VkIGZvciByZW5kZXJpbmcuIENvbnNpc3RzIG9mIHR3byBwYXJ0cywgdGhlIFVJIHRoZW1lIGFuZCB0aGUgc3ludGF4IHRoZW1lLFxuICAgKiBzZXBhcmF0ZWQgYnkgYSBzcGFjZS5cbiAgICogVGhlIGN1cnJlbnQgYXZhaWxhYmxlIFVJIHRoZW1lcyBhcmU6ICd2cycgKGRlZmF1bHQpLCAndnMtZGFyaycsICdoYy1ibGFjaydcbiAgICogVGhlIHN5bnRheCB0aGVtZXMgYXJlIGNvbnRyaWJ1dGVkLiBUaGUgZGVmYXVsdCBpcyAnZGVmYXVsdC10aGVtZSdcbiAgICovXG4gIHRoZW1lPzogSUVkaXRvclRoZW1lO1xuICAvKipcbiAgICogU2hvdWxkIHRoZSBlZGl0b3IgYmUgcmVhZCBvbmx5LlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENvbnRyb2wgdGhlIGJlaGF2aW9yIGFuZCByZW5kZXJpbmcgb2YgdGhlIHNjcm9sbGJhcnMuXG4gICAqL1xuICBzY3JvbGxiYXI/OiBJRWRpdG9yU2Nyb2xsYmFyT3B0aW9ucztcbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgdmVydGljYWwgbGFuZXMgdGhlIG92ZXJ2aWV3IHJ1bGVyIHNob3VsZCByZW5kZXIuXG4gICAqIERlZmF1bHRzIHRvIDIuXG4gICAqL1xuICBvdmVydmlld1J1bGVyTGFuZXM/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDb250cm9sIHRoZSBjdXJzb3IgYW5pbWF0aW9uIHN0eWxlLCBwb3NzaWJsZSB2YWx1ZXMgYXJlXG4gICAqICdibGluaycsICdzbW9vdGgnLCAncGhhc2UnLCAnZXhwYW5kJyBhbmQgJ3NvbGlkJy5cbiAgICogRGVmYXVsdHMgdG8gJ2JsaW5rJy5cbiAgICovXG4gIGN1cnNvckJsaW5raW5nPzogc3RyaW5nO1xuICAvKipcbiAgICogWm9vbSB0aGUgZm9udCBpbiB0aGUgZWRpdG9yIHdoZW4gdXNpbmcgdGhlIG1vdXNlIHdoZWVsIGluIGNvbWJpbmF0aW9uIHdpdGggaG9sZGluZyBDdHJsLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIG1vdXNlV2hlZWxab29tPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENvbnRyb2wgdGhlIGN1cnNvciBzdHlsZSwgZWl0aGVyICdibG9jaycgb3IgJ2xpbmUnLlxuICAgKiBEZWZhdWx0cyB0byAnbGluZScuXG4gICAqL1xuICBjdXJzb3JTdHlsZT86IHN0cmluZztcbiAgLyoqXG4gICAqIEVuYWJsZSBmb250IGxpZ2F0dXJlcy5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBmb250TGlnYXR1cmVzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIERpc2FibGUgdGhlIHVzZSBvZiBgdHJhbnNsYXRlM2RgLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTaG91bGQgdGhlIGN1cnNvciBiZSBoaWRkZW4gaW4gdGhlIG92ZXJ2aWV3IHJ1bGVyLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGhpZGVDdXJzb3JJbk92ZXJ2aWV3UnVsZXI/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIHRoYXQgc2Nyb2xsaW5nIGNhbiBnbyBvbmUgc2NyZWVuIHNpemUgYWZ0ZXIgdGhlIGxhc3QgbGluZS5cbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIHNjcm9sbEJleW9uZExhc3RMaW5lPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEVuYWJsZSB0aGF0IHRoZSBlZGl0b3Igd2lsbCBpbnN0YWxsIGFuIGludGVydmFsIHRvIGNoZWNrXG4gICAqIGlmIGl0cyBjb250YWluZXIgZG9tIG5vZGUgc2l6ZSBoYXMgY2hhbmdlZC5cbiAgICogRW5hYmxpbmcgdGhpcyBtaWdodCBoYXZlIGEgc2V2ZXJlIHBlcmZvcm1hbmNlIGltcGFjdC5cbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBhdXRvbWF0aWNMYXlvdXQ/OiBib29sZWFuO1xuICAvKipcbiAgICogQ29udHJvbCB0aGUgd3JhcHBpbmcgc3RyYXRlZ3kgb2YgdGhlIGVkaXRvci5cbiAgICogVXNpbmcgLTEgbWVhbnMgbm8gd3JhcHBpbmcgd2hhdHNvZXZlci5cbiAgICogVXNpbmcgMCBtZWFucyB2aWV3cG9ydCB3aWR0aCB3cmFwcGluZyAoYWp1c3RzIHdpdGggdGhlIHJlc2l6aW5nIG9mIHRoZSBlZGl0b3IpLlxuICAgKiBVc2luZyBhIHBvc2l0aXZlIG51bWJlciBtZWFucyB3cmFwcGluZyBhZnRlciBhIGZpeGVkIG51bWJlciBvZiBjaGFyYWN0ZXJzLlxuICAgKiBEZWZhdWx0cyB0byAzMDAuXG4gICAqL1xuICB3cmFwcGluZ0NvbHVtbj86IG51bWJlcjtcbiAgLyoqXG4gICAqIENvbnRyb2wgdGhlIGFsdGVybmF0ZSBzdHlsZSBvZiB2aWV3cG9ydCB3cmFwcGluZy5cbiAgICogV2hlbiBzZXQgdG8gdHJ1ZSB2aWV3cG9ydCB3cmFwcGluZyBpcyB1c2VkIG9ubHkgd2hlbiB0aGUgd2luZG93IHdpZHRoXG4gICAqIGlzIGxlc3MgdGhhbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgc3BlY2lmaWVkIGluIHRoZSB3cmFwcGluZ0NvbHVtbiBwcm9wZXJ0eS5cbiAgICogSGFzIG5vIGVmZmVjdCBpZiB3cmFwcGluZ0NvbHVtbiBpcyBub3QgYSBwb3NpdGl2ZSBudW1iZXIuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgd29yZFdyYXA/OiBib29sZWFuO1xuICAvKipcbiAgICogQ29udHJvbCBpbmRlbnRhdGlvbiBvZiB3cmFwcGVkIGxpbmVzLiBDYW4gYmU6ICdub25lJywgJ3NhbWUnIG9yICdpbmRlbnQnLlxuICAgKiBEZWZhdWx0cyB0byAnbm9uZScuXG4gICAqL1xuICB3cmFwcGluZ0luZGVudD86IHN0cmluZztcbiAgLyoqXG4gICAqIENvbmZpZ3VyZSB3b3JkIHdyYXBwaW5nIGNoYXJhY3RlcnMuIEEgYnJlYWsgd2lsbCBiZSBpbnRyb2R1Y2VkIGJlZm9yZSB0aGVzZSBjaGFyYWN0ZXJzLlxuICAgKiBEZWZhdWx0cyB0byAneyhbKycuXG4gICAqL1xuICB3b3JkV3JhcEJyZWFrQmVmb3JlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgLyoqXG4gICAqIENvbmZpZ3VyZSB3b3JkIHdyYXBwaW5nIGNoYXJhY3RlcnMuIEEgYnJlYWsgd2lsbCBiZSBpbnRyb2R1Y2VkIGFmdGVyIHRoZXNlIGNoYXJhY3RlcnMuXG4gICAqIERlZmF1bHRzIHRvICcgXFx0fSldP3wmLDsnLlxuICAgKi9cbiAgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgLyoqXG4gICAqIENvbmZpZ3VyZSB3b3JkIHdyYXBwaW5nIGNoYXJhY3RlcnMuIEEgYnJlYWsgd2lsbCBiZSBpbnRyb2R1Y2VkIGFmdGVyIHRoZXNlIGNoYXJhY3RlcnNcbiAgICogb25seSBpZiBubyBgd29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnNgIG9yIGB3b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzYCB3ZXJlIGZvdW5kLlxuICAgKiBEZWZhdWx0cyB0byAnLicuXG4gICAqL1xuICB3b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgLyoqXG4gICAqIFBlcmZvcm1hbmNlIGd1YXJkOiBTdG9wIHJlbmRlcmluZyBhIGxpbmUgYWZ0ZXIgeCBjaGFyYWN0ZXJzLlxuICAgKiBEZWZhdWx0cyB0byAxMDAwMCBpZiB3cmFwcGluZ0NvbHVtbiBpcyAtMS4gRGVmYXVsdHMgdG8gLTEgaWYgd3JhcHBpbmdDb2x1bW4gaXMgYD5gPSAwLlxuICAgKiBVc2UgLTEgdG8gbmV2ZXIgc3RvcCByZW5kZXJpbmdcbiAgICovXG4gIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGUgaG92ZXIuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBob3Zlcj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGUgY3VzdG9tIGNvbnRleHRtZW51LlxuICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgKi9cbiAgY29udGV4dG1lbnU/OiBib29sZWFuO1xuICAvKipcbiAgICogQSBtdWx0aXBsaWVyIHRvIGJlIHVzZWQgb24gdGhlIGBkZWx0YVhgIGFuZCBgZGVsdGFZYCBvZiBtb3VzZSB3aGVlbCBzY3JvbGwgZXZlbnRzLlxuICAgKiBEZWZhdWx0cyB0byAxLlxuICAgKi9cbiAgbW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5PzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHF1aWNrIHN1Z2dlc3Rpb25zIChzaGFkb3cgc3VnZ2VzdGlvbnMpXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBxdWlja1N1Z2dlc3Rpb25zPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFF1aWNrIHN1Z2dlc3Rpb25zIHNob3cgZGVsYXkgKGluIG1zKVxuICAgKiBEZWZhdWx0cyB0byA1MDAgKG1zKVxuICAgKi9cbiAgcXVpY2tTdWdnZXN0aW9uc0RlbGF5PzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlcyBwYXJhbWV0ZXIgaGludHNcbiAgICovXG4gIHBhcmFtZXRlckhpbnRzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFJlbmRlciBpY29ucyBpbiBzdWdnZXN0aW9ucyBib3guXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBpY29uc0luU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIGF1dG8gY2xvc2luZyBicmFja2V0cy5cbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIGF1dG9DbG9zaW5nQnJhY2tldHM/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIGZvcm1hdCBvbiB0eXBlLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGZvcm1hdE9uVHlwZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGUgdGhlIHN1Z2dlc3Rpb24gYm94IHRvIHBvcC11cCBvbiB0cmlnZ2VyIGNoYXJhY3RlcnMuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBzdWdnZXN0T25UcmlnZ2VyQ2hhcmFjdGVycz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBY2NlcHQgc3VnZ2VzdGlvbnMgb24gRU5URVIuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBhY2NlcHRTdWdnZXN0aW9uT25FbnRlcj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGUgc25pcHBldCBzdWdnZXN0aW9ucy4gRGVmYXVsdCB0byAndHJ1ZScuXG4gICAqL1xuICBzbmlwcGV0U3VnZ2VzdGlvbnM/OiAndG9wJ3wnYm90dG9tJ3wnaW5saW5lJ3wnbm9uZSc7XG4gIC8qKlxuICAgKiBFbmFibGUgdGFiIGNvbXBsZXRpb24uIERlZmF1bHRzIHRvICdmYWxzZSdcbiAgICovXG4gIHRhYkNvbXBsZXRpb24/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIHdvcmQgYmFzZWQgc3VnZ2VzdGlvbnMuIERlZmF1bHRzIHRvICd0cnVlJ1xuICAgKi9cbiAgd29yZEJhc2VkU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIHNlbGVjdGlvbiBoaWdobGlnaHQuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBzZWxlY3Rpb25IaWdobGlnaHQ/OiBib29sZWFuO1xuICAvKipcbiAgICogU2hvdyBjb2RlIGxlbnNcbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIGNvZGVMZW5zPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEVuYWJsZSBjb2RlIGZvbGRpbmdcbiAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICovXG4gIGZvbGRpbmc/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIHJlbmRlcmluZyBvZiB3aGl0ZXNwYWNlLlxuICAgKiBEZWZhdWx0cyB0byBub25lLlxuICAgKi9cbiAgcmVuZGVyV2hpdGVzcGFjZT86ICdub25lJ3wnYm91bmRhcnknfCdhbGwnO1xuICAvKipcbiAgICogRW5hYmxlIHJlbmRlcmluZyBvZiBjb250cm9sIGNoYXJhY3RlcnMuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgcmVuZGVyQ29udHJvbENoYXJhY3RlcnM/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlIHJlbmRlcmluZyBvZiBpbmRlbnQgZ3VpZGVzLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIHJlbmRlckluZGVudEd1aWRlcz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGUgcmVuZGVyaW5nIG9mIGN1cnJlbnQgbGluZSBoaWdobGlnaHQuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICByZW5kZXJMaW5lSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEluc2VydGluZyBhbmQgZGVsZXRpbmcgd2hpdGVzcGFjZSBmb2xsb3dzIHRhYiBzdG9wcy5cbiAgICovXG4gIHVzZVRhYlN0b3BzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBmb250IGZhbWlseVxuICAgKi9cbiAgZm9udEZhbWlseT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBmb250IHdlaWdodFxuICAgKi9cbiAgZm9udFdlaWdodD86ICdub3JtYWwnfCdib2xkJ3wnYm9sZGVyJ3wnbGlnaHRlcid8J2luaXRpYWwnfCdpbmhlcml0J3wnMTAwJ3wnMjAwJ3wnMzAwJ3wnNDAwJ3wnNTAwJ3xcbiAgICAgICc2MDAnfCc3MDAnfCc4MDAnfCc5MDAnO1xuICAvKipcbiAgICogVGhlIGZvbnQgc2l6ZVxuICAgKi9cbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgbGluZSBoZWlnaHRcbiAgICovXG4gIGxpbmVIZWlnaHQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENvbnRlbnQgdG8gc2hvd1xuICAgKi9cbiAgdmFsdWU6IHN0cmluZztcbiAgLyoqXG4gICAqIExhbmd1YWdlIG9mIGNvbnRlbnQgdG8gc2hvd1xuICAgKi9cbiAgbGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZTtcbn1cbiJdfQ==