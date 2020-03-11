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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21vbmFjby1lZGl0b3IvZWRpdG9yLXNjcm9sbGJhci1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSw2Q0EwREM7Ozs7Ozs7SUFyREcsNENBQW1COzs7Ozs7O0lBTW5CLDJDQUFrQjs7Ozs7OztJQU1sQiw2Q0FBb0I7Ozs7OztJQUtwQiw2Q0FBcUI7Ozs7OztJQUtyQixvREFBNEI7Ozs7OztJQUs1QixzREFBOEI7Ozs7OztJQUs5QixtREFBMkI7Ozs7OztJQUszQiwwREFBaUM7Ozs7OztJQUtqQyx3REFBK0I7Ozs7OztJQUsvQixxREFBNEI7Ozs7OztJQUs1Qix1REFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciBlZGl0b3Igc2Nyb2xsYmFyc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIElFZGl0b3JTY3JvbGxiYXJPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUaGUgc2l6ZSBvZiBhcnJvd3MgKGlmIGRpc3BsYXllZCkuXG4gICAgICogRGVmYXVsdHMgdG8gMTEuXG4gICAgICovXG4gICAgYXJyb3dTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciB2ZXJ0aWNhbCBzY3JvbGxiYXIuXG4gICAgICogQWNjZXB0ZWQgdmFsdWVzOiAnYXV0bycsICd2aXNpYmxlJywgJ2hpZGRlbicuXG4gICAgICogRGVmYXVsdHMgdG8gJ2F1dG8nLlxuICAgICAqL1xuICAgIHZlcnRpY2FsPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBob3Jpem9udGFsIHNjcm9sbGJhci5cbiAgICAgKiBBY2NlcHRlZCB2YWx1ZXM6ICdhdXRvJywgJ3Zpc2libGUnLCAnaGlkZGVuJy5cbiAgICAgKiBEZWZhdWx0cyB0byAnYXV0bycuXG4gICAgICovXG4gICAgaG9yaXpvbnRhbD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBDYXN0IGhvcml6b250YWwgYW5kIHZlcnRpY2FsIHNoYWRvd3Mgd2hlbiB0aGUgY29udGVudCBpcyBzY3JvbGxlZC5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIHVzZVNoYWRvd3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBhcnJvd3MgYXQgdGhlIHRvcCBhbmQgYm90dG9tIG9mIHRoZSB2ZXJ0aWNhbCBzY3JvbGxiYXIuXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAgICovXG4gICAgdmVydGljYWxIYXNBcnJvd3M/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJlbmRlciBhcnJvd3MgYXQgdGhlIGxlZnQgYW5kIHJpZ2h0IG9mIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhci5cbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICAgKi9cbiAgICBob3Jpem9udGFsSGFzQXJyb3dzPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gbW91c2Ugd2hlZWwgZXZlbnRzIGFuZCByZWFjdCB0byB0aGVtIGJ5IHNjcm9sbGluZy5cbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlLlxuICAgICAqL1xuICAgIGhhbmRsZU1vdXNlV2hlZWw/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBpbiBwaXhlbHMgZm9yIHRoZSBob3Jpem9udGFsIHNjcm9sbGJhci5cbiAgICAgKiBEZWZhdWx0cyB0byAxMCAocHgpLlxuICAgICAqL1xuICAgIGhvcml6b250YWxTY3JvbGxiYXJTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFdpZHRoIGluIHBpeGVscyBmb3IgdGhlIHZlcnRpY2FsIHNjcm9sbGJhci5cbiAgICAgKiBEZWZhdWx0cyB0byAxMCAocHgpLlxuICAgICAqL1xuICAgIHZlcnRpY2FsU2Nyb2xsYmFyU2l6ZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBXaWR0aCBpbiBwaXhlbHMgZm9yIHRoZSB2ZXJ0aWNhbCBzbGlkZXIuXG4gICAgICogRGVmYXVsdHMgdG8gYHZlcnRpY2FsU2Nyb2xsYmFyU2l6ZWAuXG4gICAgICovXG4gICAgdmVydGljYWxTbGlkZXJTaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBpbiBwaXhlbHMgZm9yIHRoZSBob3Jpem9udGFsIHNsaWRlci5cbiAgICAgKiBEZWZhdWx0cyB0byBgaG9yaXpvbnRhbFNjcm9sbGJhclNpemVgLlxuICAgICAqL1xuICAgIGhvcml6b250YWxTbGlkZXJTaXplPzogbnVtYmVyO1xufVxuIl19