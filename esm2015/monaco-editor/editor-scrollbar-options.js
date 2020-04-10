/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/editor-scrollbar-options.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21vbmFjby1lZGl0b3IvZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSw2Q0EwREM7Ozs7Ozs7SUFyREMsNENBQW1COzs7Ozs7O0lBTW5CLDJDQUFrQjs7Ozs7OztJQU1sQiw2Q0FBb0I7Ozs7OztJQUtwQiw2Q0FBcUI7Ozs7OztJQUtyQixvREFBNEI7Ozs7OztJQUs1QixzREFBOEI7Ozs7OztJQUs5QixtREFBMkI7Ozs7OztJQUszQiwwREFBaUM7Ozs7OztJQUtqQyx3REFBK0I7Ozs7OztJQUsvQixxREFBNEI7Ozs7OztJQUs1Qix1REFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciBlZGl0b3Igc2Nyb2xsYmFyc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElFZGl0b3JTY3JvbGxiYXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIGFycm93cyAoaWYgZGlzcGxheWVkKS5cbiAgICogRGVmYXVsdHMgdG8gMTEuXG4gICAqL1xuICBhcnJvd1NpemU/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBSZW5kZXIgdmVydGljYWwgc2Nyb2xsYmFyLlxuICAgKiBBY2NlcHRlZCB2YWx1ZXM6ICdhdXRvJywgJ3Zpc2libGUnLCAnaGlkZGVuJy5cbiAgICogRGVmYXVsdHMgdG8gJ2F1dG8nLlxuICAgKi9cbiAgdmVydGljYWw/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBSZW5kZXIgaG9yaXpvbnRhbCBzY3JvbGxiYXIuXG4gICAqIEFjY2VwdGVkIHZhbHVlczogJ2F1dG8nLCAndmlzaWJsZScsICdoaWRkZW4nLlxuICAgKiBEZWZhdWx0cyB0byAnYXV0bycuXG4gICAqL1xuICBob3Jpem9udGFsPzogc3RyaW5nO1xuICAvKipcbiAgICogQ2FzdCBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBzaGFkb3dzIHdoZW4gdGhlIGNvbnRlbnQgaXMgc2Nyb2xsZWQuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICB1c2VTaGFkb3dzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFJlbmRlciBhcnJvd3MgYXQgdGhlIHRvcCBhbmQgYm90dG9tIG9mIHRoZSB2ZXJ0aWNhbCBzY3JvbGxiYXIuXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgdmVydGljYWxIYXNBcnJvd3M/OiBib29sZWFuO1xuICAvKipcbiAgICogUmVuZGVyIGFycm93cyBhdCB0aGUgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGhvcml6b250YWwgc2Nyb2xsYmFyLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIGhvcml6b250YWxIYXNBcnJvd3M/OiBib29sZWFuO1xuICAvKipcbiAgICogTGlzdGVuIHRvIG1vdXNlIHdoZWVsIGV2ZW50cyBhbmQgcmVhY3QgdG8gdGhlbSBieSBzY3JvbGxpbmcuXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBoYW5kbGVNb3VzZVdoZWVsPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEhlaWdodCBpbiBwaXhlbHMgZm9yIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhci5cbiAgICogRGVmYXVsdHMgdG8gMTAgKHB4KS5cbiAgICovXG4gIGhvcml6b250YWxTY3JvbGxiYXJTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogV2lkdGggaW4gcGl4ZWxzIGZvciB0aGUgdmVydGljYWwgc2Nyb2xsYmFyLlxuICAgKiBEZWZhdWx0cyB0byAxMCAocHgpLlxuICAgKi9cbiAgdmVydGljYWxTY3JvbGxiYXJTaXplPzogbnVtYmVyO1xuICAvKipcbiAgICogV2lkdGggaW4gcGl4ZWxzIGZvciB0aGUgdmVydGljYWwgc2xpZGVyLlxuICAgKiBEZWZhdWx0cyB0byBgdmVydGljYWxTY3JvbGxiYXJTaXplYC5cbiAgICovXG4gIHZlcnRpY2FsU2xpZGVyU2l6ZT86IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlaWdodCBpbiBwaXhlbHMgZm9yIHRoZSBob3Jpem9udGFsIHNsaWRlci5cbiAgICogRGVmYXVsdHMgdG8gYGhvcml6b250YWxTY3JvbGxiYXJTaXplYC5cbiAgICovXG4gIGhvcml6b250YWxTbGlkZXJTaXplPzogbnVtYmVyO1xufVxuIl19