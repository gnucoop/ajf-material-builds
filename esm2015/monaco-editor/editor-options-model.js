/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-options-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLW9wdGlvbnMtbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvci9lZGl0b3Itb3B0aW9ucy1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQSxNQUFNLE9BQU8sY0FBYztDQW9UMUI7Ozs7Ozs7SUEvU0csa0RBQW1DOzs7OztJQUluQyxtQ0FBbUI7Ozs7OztJQUtuQixnQ0FBa0I7Ozs7OztJQUtsQix3Q0FBd0I7Ozs7OztJQUt4Qiw0Q0FBNkI7Ozs7Ozs7Ozs7O0lBVTdCLHFDQUFzQjs7Ozs7O0lBS3RCLDZDQUE4Qjs7Ozs7OztJQU05Qiw2Q0FBNkI7Ozs7OztJQUs3QixxQ0FBc0I7Ozs7Ozs7SUFNdEIsOENBQThCOzs7Ozs7Ozs7SUFROUIsc0RBQXNDOzs7Ozs7SUFLdEMsMENBQTJCOzs7Ozs7OztJQU8zQiwrQkFBcUI7Ozs7OztJQUtyQixrQ0FBbUI7Ozs7O0lBSW5CLG1DQUFvQzs7Ozs7O0lBS3BDLDRDQUE0Qjs7Ozs7OztJQU01Qix3Q0FBd0I7Ozs7OztJQUt4Qix3Q0FBeUI7Ozs7OztJQUt6QixxQ0FBcUI7Ozs7OztJQUtyQix1Q0FBd0I7Ozs7OztJQUt4Qiw0Q0FBNkI7Ozs7OztJQUs3QixtREFBb0M7Ozs7OztJQUtwQyw4Q0FBK0I7Ozs7Ozs7O0lBTy9CLHlDQUEwQjs7Ozs7Ozs7O0lBUTFCLHdDQUF3Qjs7Ozs7Ozs7O0lBUXhCLGtDQUFtQjs7Ozs7O0lBS25CLHdDQUF3Qjs7Ozs7O0lBS3hCLHVEQUF1Qzs7Ozs7O0lBS3ZDLHNEQUFzQzs7Ozs7OztJQU10QywwREFBMEM7Ozs7Ozs7SUFNMUMsZ0RBQWdDOzs7Ozs7SUFLaEMsK0JBQWdCOzs7Ozs7SUFLaEIscUNBQXNCOzs7Ozs7SUFLdEIscURBQXFDOzs7Ozs7SUFLckMsMENBQTJCOzs7Ozs7SUFLM0IsK0NBQStCOzs7OztJQUkvQix3Q0FBeUI7Ozs7OztJQUt6Qiw0Q0FBNkI7Ozs7OztJQUs3Qiw2Q0FBOEI7Ozs7OztJQUs5QixzQ0FBdUI7Ozs7OztJQUt2QixvREFBcUM7Ozs7OztJQUtyQyxpREFBa0M7Ozs7O0lBSWxDLDRDQUEwRDs7Ozs7SUFJMUQsdUNBQXdCOzs7OztJQUl4Qiw4Q0FBK0I7Ozs7OztJQUsvQiw0Q0FBNkI7Ozs7OztJQUs3QixrQ0FBbUI7Ozs7OztJQUtuQixpQ0FBa0I7Ozs7OztJQUtsQiwwQ0FBK0M7Ozs7OztJQUsvQyxpREFBa0M7Ozs7OztJQUtsQyw0Q0FBNkI7Ozs7OztJQUs3Qiw2Q0FBOEI7Ozs7O0lBSTlCLHFDQUFzQjs7Ozs7SUFJdEIsb0NBQW9COzs7OztJQUlwQixvQ0FDd0U7Ozs7O0lBSXhFLGtDQUFrQjs7Ozs7SUFJbEIsb0NBQW9COzs7OztJQUtwQiwrQkFBYzs7Ozs7SUFJZCxrQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtJRWRpdG9yTGFuZ3VhZ2V9IGZyb20gJy4vZWRpdG9yLWxhbmd1YWdlLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvclNjcm9sbGJhck9wdGlvbnN9IGZyb20gJy4vZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zJztcbmltcG9ydCB7SUVkaXRvclRoZW1lfSBmcm9tICcuL2VkaXRvci10aGVtZSc7XG4vKipcbiAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGVkaXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIElFZGl0b3JPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgZXhwZXJpbWVudGFsIHNjcmVlbiByZWFkZXIgc3VwcG9ydC5cbiAgICAgKiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG4gICAgICovXG4gICAgZXhwZXJpbWVudGFsU2NyZWVuUmVhZGVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGUgYXJpYSBsYWJlbCBmb3IgdGhlIGVkaXRvcidzIHRleHRhcmVhICh3aGVuIGl0IGlzIGZvY3VzZWQpLlxuICAgICAqL1xuICAgIGFyaWFMYWJlbD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdmVydGljYWwgbGluZXMgYXQgdGhlIHNwZWNpZmllZCBjb2x1bW5zLlxuICAgICAqIERlZmF1bHRzIHRvIGVtcHR5IGFycmF5LlxuICAgICAqL1xuICAgIHJ1bGVycz86IG51bWJlcltdO1xuICAgIC8qKlxuICAgICAqIEEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHdvcmQgc2VwYXJhdG9ycyB1c2VkIHdoZW4gZG9pbmcgd29yZCBuYXZpZ2F0aW9uLlxuICAgICAqIERlZmF1bHRzIHRvIGBgfiFAIyQlXiYqKCktPStbe119XFxcXHw7OlxcJycsLmA8YGA+YC8/XG4gICAgICovXG4gICAgd29yZFNlcGFyYXRvcnM/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIExpbnV4IHByaW1hcnkgY2xpcGJvYXJkLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgc2VsZWN0aW9uQ2xpcGJvYXJkPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSByZW5kZXJpbmcgb2YgbGluZSBudW1iZXJzLlxuICAgICAqIElmIGl0IGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHJlbmRlcmluZyBhIGxpbmUgbnVtYmVyXG4gICAgICogYW5kIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSByZW5kZXJlZC5cbiAgICAgKiBPdGhlcndpc2UsIGlmIGl0IGlzIGEgdHJ1ZXksIGxpbmUgbnVtYmVycyB3aWxsIGJlIHJlbmRlcmVkIG5vcm1hbGx5XG4gICAgICogKGVxdWl2YWxlbnQgb2YgdXNpbmcgYW4gaWRlbnRpdHkgZnVuY3Rpb24pLlxuICAgICAqIE90aGVyd2lzZSwgbGluZSBudW1iZXJzIHdpbGwgbm90IGJlIHJlbmRlcmVkLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgbGluZU51bWJlcnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNob3VsZCB0aGUgY29ycmVzcG9uZGluZyBsaW5lIGJlIHNlbGVjdGVkIHdoZW4gY2xpY2tpbmcgb24gdGhlIGxpbmUgbnVtYmVyP1xuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgc2VsZWN0T25MaW5lTnVtYmVycz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCB0aGUgd2lkdGggb2YgbGluZSBudW1iZXJzLCBieSByZXNlcnZpbmcgaG9yaXpvbnRhbCBzcGFjZVxuICAgICAqIGZvciByZW5kZXJpbmcgYXQgbGVhc3QgYW4gYW1vdW50IG9mIGRpZ2l0cy5cbiAgICAgKiBEZWZhdWx0cyB0byA1LlxuICAgICAqL1xuICAgIGxpbmVOdW1iZXJzTWluQ2hhcnM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRoZSByZW5kZXJpbmcgb2YgdGhlIGdseXBoIG1hcmdpbi5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBnbHlwaE1hcmdpbj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIHdpZHRoIHJlc2VydmVkIGZvciBsaW5lIGRlY29yYXRpb25zIChpbiBweCkuXG4gICAgICogTGluZSBkZWNvcmF0aW9ucyBhcmUgcGxhY2VkIGJldHdlZW4gbGluZSBudW1iZXJzIGFuZCB0aGUgZWRpdG9yIGNvbnRlbnQuXG4gICAgICogRGVmYXVsdHMgdG8gMTAuXG4gICAgICovXG4gICAgbGluZURlY29yYXRpb25zV2lkdGg/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogV2hlbiByZXZlYWxpbmcgdGhlIGN1cnNvciwgYSB2aXJ0dWFsIHBhZGRpbmcgKHB4KSBpcyBhZGRlZCB0byB0aGUgY3Vyc29yLFxuICAgICAqIHR1cm5pbmcgaXQgaW50byBhIHJlY3RhbmdsZS5cbiAgICAgKiBUaGlzIHZpcnR1YWwgcGFkZGluZyBlbnN1cmVzIHRoYXQgdGhlIGN1cnNvciBnZXRzIHJldmVhbGVkIGJlZm9yZVxuICAgICAqIGhpdHRpbmcgdGhlIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0LlxuICAgICAqIERlZmF1bHRzIHRvIDMwIChweCkuXG4gICAgICovXG4gICAgcmV2ZWFsSG9yaXpvbnRhbFJpZ2h0UGFkZGluZz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGVkaXRvciBzZWxlY3Rpb24gd2l0aCByb3VuZGVkIGJvcmRlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICByb3VuZGVkU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBUaGVtZSB0byBiZSB1c2VkIGZvciByZW5kZXJpbmcuIENvbnNpc3RzIG9mIHR3byBwYXJ0cywgdGhlIFVJIHRoZW1lIGFuZCB0aGUgc3ludGF4IHRoZW1lLFxuICAgICAqIHNlcGFyYXRlZCBieSBhIHNwYWNlLlxuICAgICAqIFRoZSBjdXJyZW50IGF2YWlsYWJsZSBVSSB0aGVtZXMgYXJlOiAndnMnIChkZWZhdWx0KSwgJ3ZzLWRhcmsnLCAnaGMtYmxhY2snXG4gICAgICogVGhlIHN5bnRheCB0aGVtZXMgYXJlIGNvbnRyaWJ1dGVkLiBUaGUgZGVmYXVsdCBpcyAnZGVmYXVsdC10aGVtZSdcbiAgICAgKi9cbiAgICB0aGVtZT86IElFZGl0b3JUaGVtZTtcbiAgICAvKipcbiAgICAgKiBTaG91bGQgdGhlIGVkaXRvciBiZSByZWFkIG9ubHkuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgcmVhZE9ubHk/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIGJlaGF2aW9yIGFuZCByZW5kZXJpbmcgb2YgdGhlIHNjcm9sbGJhcnMuXG4gICAgICovXG4gICAgc2Nyb2xsYmFyPzogSUVkaXRvclNjcm9sbGJhck9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB2ZXJ0aWNhbCBsYW5lcyB0aGUgb3ZlcnZpZXcgcnVsZXIgc2hvdWxkIHJlbmRlci5cbiAgICAgKiBEZWZhdWx0cyB0byAyLlxuICAgICAqL1xuICAgIG92ZXJ2aWV3UnVsZXJMYW5lcz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSBjdXJzb3IgYW5pbWF0aW9uIHN0eWxlLCBwb3NzaWJsZSB2YWx1ZXMgYXJlXG4gICAgICogJ2JsaW5rJywgJ3Ntb290aCcsICdwaGFzZScsICdleHBhbmQnIGFuZCAnc29saWQnLlxuICAgICAqIERlZmF1bHRzIHRvICdibGluaycuXG4gICAgICovXG4gICAgY3Vyc29yQmxpbmtpbmc/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogWm9vbSB0aGUgZm9udCBpbiB0aGUgZWRpdG9yIHdoZW4gdXNpbmcgdGhlIG1vdXNlIHdoZWVsIGluIGNvbWJpbmF0aW9uIHdpdGggaG9sZGluZyBDdHJsLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIG1vdXNlV2hlZWxab29tPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSBjdXJzb3Igc3R5bGUsIGVpdGhlciAnYmxvY2snIG9yICdsaW5lJy5cbiAgICAgKiBEZWZhdWx0cyB0byAnbGluZScuXG4gICAgICovXG4gICAgY3Vyc29yU3R5bGU/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIGZvbnQgbGlnYXR1cmVzLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIGZvbnRMaWdhdHVyZXM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIERpc2FibGUgdGhlIHVzZSBvZiBgdHJhbnNsYXRlM2RgLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIGRpc2FibGVUcmFuc2xhdGUzZD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2hvdWxkIHRoZSBjdXJzb3IgYmUgaGlkZGVuIGluIHRoZSBvdmVydmlldyBydWxlci5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBoaWRlQ3Vyc29ySW5PdmVydmlld1J1bGVyPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGhhdCBzY3JvbGxpbmcgY2FuIGdvIG9uZSBzY3JlZW4gc2l6ZSBhZnRlciB0aGUgbGFzdCBsaW5lLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgc2Nyb2xsQmV5b25kTGFzdExpbmU/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSB0aGF0IHRoZSBlZGl0b3Igd2lsbCBpbnN0YWxsIGFuIGludGVydmFsIHRvIGNoZWNrXG4gICAgICogaWYgaXRzIGNvbnRhaW5lciBkb20gbm9kZSBzaXplIGhhcyBjaGFuZ2VkLlxuICAgICAqIEVuYWJsaW5nIHRoaXMgbWlnaHQgaGF2ZSBhIHNldmVyZSBwZXJmb3JtYW5jZSBpbXBhY3QuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgYXV0b21hdGljTGF5b3V0PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHRoZSB3cmFwcGluZyBzdHJhdGVneSBvZiB0aGUgZWRpdG9yLlxuICAgICAqIFVzaW5nIC0xIG1lYW5zIG5vIHdyYXBwaW5nIHdoYXRzb2V2ZXIuXG4gICAgICogVXNpbmcgMCBtZWFucyB2aWV3cG9ydCB3aWR0aCB3cmFwcGluZyAoYWp1c3RzIHdpdGggdGhlIHJlc2l6aW5nIG9mIHRoZSBlZGl0b3IpLlxuICAgICAqIFVzaW5nIGEgcG9zaXRpdmUgbnVtYmVyIG1lYW5zIHdyYXBwaW5nIGFmdGVyIGEgZml4ZWQgbnVtYmVyIG9mIGNoYXJhY3RlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gMzAwLlxuICAgICAqL1xuICAgIHdyYXBwaW5nQ29sdW1uPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgdGhlIGFsdGVybmF0ZSBzdHlsZSBvZiB2aWV3cG9ydCB3cmFwcGluZy5cbiAgICAgKiBXaGVuIHNldCB0byB0cnVlIHZpZXdwb3J0IHdyYXBwaW5nIGlzIHVzZWQgb25seSB3aGVuIHRoZSB3aW5kb3cgd2lkdGhcbiAgICAgKiBpcyBsZXNzIHRoYW4gdGhlIG51bWJlciBvZiBjb2x1bW5zIHNwZWNpZmllZCBpbiB0aGUgd3JhcHBpbmdDb2x1bW4gcHJvcGVydHkuXG4gICAgICogSGFzIG5vIGVmZmVjdCBpZiB3cmFwcGluZ0NvbHVtbiBpcyBub3QgYSBwb3NpdGl2ZSBudW1iZXIuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgd29yZFdyYXA/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgaW5kZW50YXRpb24gb2Ygd3JhcHBlZCBsaW5lcy4gQ2FuIGJlOiAnbm9uZScsICdzYW1lJyBvciAnaW5kZW50Jy5cbiAgICAgKiBEZWZhdWx0cyB0byAnbm9uZScuXG4gICAgICovXG4gICAgd3JhcHBpbmdJbmRlbnQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlIHdvcmQgd3JhcHBpbmcgY2hhcmFjdGVycy4gQSBicmVhayB3aWxsIGJlIGludHJvZHVjZWQgYmVmb3JlIHRoZXNlIGNoYXJhY3RlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gJ3soWysnLlxuICAgICAqL1xuICAgIHdvcmRXcmFwQnJlYWtCZWZvcmVDaGFyYWN0ZXJzPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZSB3b3JkIHdyYXBwaW5nIGNoYXJhY3RlcnMuIEEgYnJlYWsgd2lsbCBiZSBpbnRyb2R1Y2VkIGFmdGVyIHRoZXNlIGNoYXJhY3RlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gJyBcXHR9KV0/fCYsOycuXG4gICAgICovXG4gICAgd29yZFdyYXBCcmVha0FmdGVyQ2hhcmFjdGVycz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBDb25maWd1cmUgd29yZCB3cmFwcGluZyBjaGFyYWN0ZXJzLiBBIGJyZWFrIHdpbGwgYmUgaW50cm9kdWNlZCBhZnRlciB0aGVzZSBjaGFyYWN0ZXJzXG4gICAgICogb25seSBpZiBubyBgd29yZFdyYXBCcmVha0JlZm9yZUNoYXJhY3RlcnNgIG9yIGB3b3JkV3JhcEJyZWFrQWZ0ZXJDaGFyYWN0ZXJzYCB3ZXJlIGZvdW5kLlxuICAgICAqIERlZmF1bHRzIHRvICcuJy5cbiAgICAgKi9cbiAgICB3b3JkV3JhcEJyZWFrT2J0cnVzaXZlQ2hhcmFjdGVycz86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBQZXJmb3JtYW5jZSBndWFyZDogU3RvcCByZW5kZXJpbmcgYSBsaW5lIGFmdGVyIHggY2hhcmFjdGVycy5cbiAgICAgKiBEZWZhdWx0cyB0byAxMDAwMCBpZiB3cmFwcGluZ0NvbHVtbiBpcyAtMS4gRGVmYXVsdHMgdG8gLTEgaWYgd3JhcHBpbmdDb2x1bW4gaXMgYD5gPSAwLlxuICAgICAqIFVzZSAtMSB0byBuZXZlciBzdG9wIHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHN0b3BSZW5kZXJpbmdMaW5lQWZ0ZXI/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIGhvdmVyLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgaG92ZXI/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBjdXN0b20gY29udGV4dG1lbnUuXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBjb250ZXh0bWVudT86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQSBtdWx0aXBsaWVyIHRvIGJlIHVzZWQgb24gdGhlIGBkZWx0YVhgIGFuZCBgZGVsdGFZYCBvZiBtb3VzZSB3aGVlbCBzY3JvbGwgZXZlbnRzLlxuICAgICAqIERlZmF1bHRzIHRvIDEuXG4gICAgICovXG4gICAgbW91c2VXaGVlbFNjcm9sbFNlbnNpdGl2aXR5PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBxdWljayBzdWdnZXN0aW9ucyAoc2hhZG93IHN1Z2dlc3Rpb25zKVxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgcXVpY2tTdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUXVpY2sgc3VnZ2VzdGlvbnMgc2hvdyBkZWxheSAoaW4gbXMpXG4gICAgICogRGVmYXVsdHMgdG8gNTAwIChtcylcbiAgICAgKi9cbiAgICBxdWlja1N1Z2dlc3Rpb25zRGVsYXk/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBwYXJhbWV0ZXIgaGludHNcbiAgICAgKi9cbiAgICBwYXJhbWV0ZXJIaW50cz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGljb25zIGluIHN1Z2dlc3Rpb25zIGJveC5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGljb25zSW5TdWdnZXN0aW9ucz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRW5hYmxlIGF1dG8gY2xvc2luZyBicmFja2V0cy5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGF1dG9DbG9zaW5nQnJhY2tldHM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBmb3JtYXQgb24gdHlwZS5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBmb3JtYXRPblR5cGU/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSB0aGUgc3VnZ2VzdGlvbiBib3ggdG8gcG9wLXVwIG9uIHRyaWdnZXIgY2hhcmFjdGVycy5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHN1Z2dlc3RPblRyaWdnZXJDaGFyYWN0ZXJzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBBY2NlcHQgc3VnZ2VzdGlvbnMgb24gRU5URVIuXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKi9cbiAgICBhY2NlcHRTdWdnZXN0aW9uT25FbnRlcj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRW5hYmxlIHNuaXBwZXQgc3VnZ2VzdGlvbnMuIERlZmF1bHQgdG8gJ3RydWUnLlxuICAgICAqL1xuICAgIHNuaXBwZXRTdWdnZXN0aW9ucz86ICd0b3AnIHwgJ2JvdHRvbScgfCAnaW5saW5lJyB8ICdub25lJztcbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGFiIGNvbXBsZXRpb24uIERlZmF1bHRzIHRvICdmYWxzZSdcbiAgICAgKi9cbiAgICB0YWJDb21wbGV0aW9uPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBFbmFibGUgd29yZCBiYXNlZCBzdWdnZXN0aW9ucy4gRGVmYXVsdHMgdG8gJ3RydWUnXG4gICAgICovXG4gICAgd29yZEJhc2VkU3VnZ2VzdGlvbnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBzZWxlY3Rpb24gaGlnaGxpZ2h0LlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgc2VsZWN0aW9uSGlnaGxpZ2h0PzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTaG93IGNvZGUgbGVuc1xuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgY29kZUxlbnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBjb2RlIGZvbGRpbmdcbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGZvbGRpbmc/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSByZW5kZXJpbmcgb2Ygd2hpdGVzcGFjZS5cbiAgICAgKiBEZWZhdWx0cyB0byBub25lLlxuICAgICAqL1xuICAgIHJlbmRlcldoaXRlc3BhY2U/OiAnbm9uZScgfCAnYm91bmRhcnknIHwgJ2FsbCc7XG4gICAgLyoqXG4gICAgICogRW5hYmxlIHJlbmRlcmluZyBvZiBjb250cm9sIGNoYXJhY3RlcnMuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgcmVuZGVyQ29udHJvbENoYXJhY3RlcnM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSByZW5kZXJpbmcgb2YgaW5kZW50IGd1aWRlcy5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICByZW5kZXJJbmRlbnRHdWlkZXM/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSByZW5kZXJpbmcgb2YgY3VycmVudCBsaW5lIGhpZ2hsaWdodC5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHJlbmRlckxpbmVIaWdobGlnaHQ/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEluc2VydGluZyBhbmQgZGVsZXRpbmcgd2hpdGVzcGFjZSBmb2xsb3dzIHRhYiBzdG9wcy5cbiAgICAgKi9cbiAgICB1c2VUYWJTdG9wcz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogVGhlIGZvbnQgZmFtaWx5XG4gICAgICovXG4gICAgZm9udEZhbWlseT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgZm9udCB3ZWlnaHRcbiAgICAgKi9cbiAgICBmb250V2VpZ2h0PzogJ25vcm1hbCcgfCAnYm9sZCcgfCAnYm9sZGVyJyB8ICdsaWdodGVyJyB8ICdpbml0aWFsJyB8ICdpbmhlcml0JyB8XG4gICAgICAnMTAwJyB8ICcyMDAnIHwgJzMwMCcgfCAnNDAwJyB8ICc1MDAnIHwgJzYwMCcgfCAnNzAwJyB8ICc4MDAnIHwgJzkwMCc7XG4gICAgLyoqXG4gICAgICogVGhlIGZvbnQgc2l6ZVxuICAgICAqL1xuICAgIGZvbnRTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBsaW5lIGhlaWdodFxuICAgICAqL1xuICAgIGxpbmVIZWlnaHQ/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDb250ZW50IHRvIHNob3dcbiAgICAgKi9cbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIExhbmd1YWdlIG9mIGNvbnRlbnQgdG8gc2hvd1xuICAgICAqL1xuICAgIGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2U7XG59XG4iXX0=