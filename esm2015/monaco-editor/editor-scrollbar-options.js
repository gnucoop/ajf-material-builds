/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-scrollbar-options.ts
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
 * Configuration options for editor scrollbars
 * @record
 */
export function IEditorScrollbarOptions() { }
if (false) {
    /**
     * The size of arrows (if displayed).
     * Defaults to 11.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.arrowSize;
    /**
     * Render vertical scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.vertical;
    /**
     * Render horizontal scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.horizontal;
    /**
     * Cast horizontal and vertical shadows when the content is scrolled.
     * Defaults to true.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.useShadows;
    /**
     * Render arrows at the top and bottom of the vertical scrollbar.
     * Defaults to false.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.verticalHasArrows;
    /**
     * Render arrows at the left and right of the horizontal scrollbar.
     * Defaults to false.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.horizontalHasArrows;
    /**
     * Listen to mouse wheel events and react to them by scrolling.
     * Defaults to true.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.handleMouseWheel;
    /**
     * Height in pixels for the horizontal scrollbar.
     * Defaults to 10 (px).
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.horizontalScrollbarSize;
    /**
     * Width in pixels for the vertical scrollbar.
     * Defaults to 10 (px).
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.verticalScrollbarSize;
    /**
     * Width in pixels for the vertical slider.
     * Defaults to `verticalScrollbarSize`.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.verticalSliderSize;
    /**
     * Height in pixels for the horizontal slider.
     * Defaults to `horizontalScrollbarSize`.
     * @type {?|undefined}
     */
    IEditorScrollbarOptions.prototype.horizontalSliderSize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21vbmFjby1lZGl0b3IvZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSw2Q0EwREM7Ozs7Ozs7SUFyREcsNENBQW1COzs7Ozs7O0lBTW5CLDJDQUFrQjs7Ozs7OztJQU1sQiw2Q0FBb0I7Ozs7OztJQUtwQiw2Q0FBcUI7Ozs7OztJQUtyQixvREFBNEI7Ozs7OztJQUs1QixzREFBOEI7Ozs7OztJQUs5QixtREFBMkI7Ozs7OztJQUszQiwwREFBaUM7Ozs7OztJQUtqQyx3REFBK0I7Ozs7OztJQUsvQixxREFBNEI7Ozs7OztJQUs1Qix1REFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGVkaXRvciBzY3JvbGxiYXJzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUVkaXRvclNjcm9sbGJhck9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIFRoZSBzaXplIG9mIGFycm93cyAoaWYgZGlzcGxheWVkKS5cbiAgICAgKiBEZWZhdWx0cyB0byAxMS5cbiAgICAgKi9cbiAgICBhcnJvd1NpemU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHZlcnRpY2FsIHNjcm9sbGJhci5cbiAgICAgKiBBY2NlcHRlZCB2YWx1ZXM6ICdhdXRvJywgJ3Zpc2libGUnLCAnaGlkZGVuJy5cbiAgICAgKiBEZWZhdWx0cyB0byAnYXV0bycuXG4gICAgICovXG4gICAgdmVydGljYWw/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGhvcml6b250YWwgc2Nyb2xsYmFyLlxuICAgICAqIEFjY2VwdGVkIHZhbHVlczogJ2F1dG8nLCAndmlzaWJsZScsICdoaWRkZW4nLlxuICAgICAqIERlZmF1bHRzIHRvICdhdXRvJy5cbiAgICAgKi9cbiAgICBob3Jpem9udGFsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIENhc3QgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgc2hhZG93cyB3aGVuIHRoZSBjb250ZW50IGlzIHNjcm9sbGVkLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgdXNlU2hhZG93cz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGFycm93cyBhdCB0aGUgdG9wIGFuZCBib3R0b20gb2YgdGhlIHZlcnRpY2FsIHNjcm9sbGJhci5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICB2ZXJ0aWNhbEhhc0Fycm93cz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmVuZGVyIGFycm93cyBhdCB0aGUgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGhvcml6b250YWwgc2Nyb2xsYmFyLlxuICAgICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgICAqL1xuICAgIGhvcml6b250YWxIYXNBcnJvd3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBtb3VzZSB3aGVlbCBldmVudHMgYW5kIHJlYWN0IHRvIHRoZW0gYnkgc2Nyb2xsaW5nLlxuICAgICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAgICovXG4gICAgaGFuZGxlTW91c2VXaGVlbD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IGluIHBpeGVscyBmb3IgdGhlIGhvcml6b250YWwgc2Nyb2xsYmFyLlxuICAgICAqIERlZmF1bHRzIHRvIDEwIChweCkuXG4gICAgICovXG4gICAgaG9yaXpvbnRhbFNjcm9sbGJhclNpemU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogV2lkdGggaW4gcGl4ZWxzIGZvciB0aGUgdmVydGljYWwgc2Nyb2xsYmFyLlxuICAgICAqIERlZmF1bHRzIHRvIDEwIChweCkuXG4gICAgICovXG4gICAgdmVydGljYWxTY3JvbGxiYXJTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFdpZHRoIGluIHBpeGVscyBmb3IgdGhlIHZlcnRpY2FsIHNsaWRlci5cbiAgICAgKiBEZWZhdWx0cyB0byBgdmVydGljYWxTY3JvbGxiYXJTaXplYC5cbiAgICAgKi9cbiAgICB2ZXJ0aWNhbFNsaWRlclNpemU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IGluIHBpeGVscyBmb3IgdGhlIGhvcml6b250YWwgc2xpZGVyLlxuICAgICAqIERlZmF1bHRzIHRvIGBob3Jpem9udGFsU2Nyb2xsYmFyU2l6ZWAuXG4gICAgICovXG4gICAgaG9yaXpvbnRhbFNsaWRlclNpemU/OiBudW1iZXI7XG59XG4iXX0=