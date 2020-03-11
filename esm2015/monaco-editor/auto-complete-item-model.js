/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/auto-complete-item-model.ts
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
 * Representation of AutoCompleteItem
 */
export class AutoCompleteItem {
    constructor() {
    }
    /**
     * @param {?} label
     * @return {?}
     */
    setLabel(label) {
        this.label = label;
        return this;
    }
    /**
     * @param {?} kind
     * @return {?}
     */
    setKind(kind) {
        this.kind = kind;
        return this;
    }
    /**
     * @param {?} documentation
     * @return {?}
     */
    setDocumentation(documentation) {
        this.documentation = documentation;
        return this;
    }
    /**
     * @param {?} insertText
     * @return {?}
     */
    setInsertText(insertText) {
        this.insertText = insertText;
        return this;
    }
}
if (false) {
    /** @type {?} */
    AutoCompleteItem.prototype.label;
    /** @type {?} */
    AutoCompleteItem.prototype.kind;
    /** @type {?} */
    AutoCompleteItem.prototype.documentation;
    /** @type {?} */
    AutoCompleteItem.prototype.insertText;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21vbmFjby1lZGl0b3IvYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU0sT0FBTyxnQkFBZ0I7SUFNekI7SUFFQSxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxhQUFxQjtRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxVQUFrQjtRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7OztJQTVCRyxpQ0FBYzs7SUFDZCxnQ0FBYTs7SUFDYix5Q0FBc0I7O0lBQ3RCLHNDQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBBdXRvQ29tcGxldGVJdGVtXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGtpbmQ6IG51bWJlcjtcbiAgICBkb2N1bWVudGF0aW9uOiBzdHJpbmc7XG4gICAgaW5zZXJ0VGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICBzZXRMYWJlbChsYWJlbDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbSB7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0S2luZChraW5kOiBudW1iZXIpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0RG9jdW1lbnRhdGlvbihkb2N1bWVudGF0aW9uOiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudGF0aW9uID0gZG9jdW1lbnRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0SW5zZXJ0VGV4dChpbnNlcnRUZXh0OiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICAgICAgdGhpcy5pbnNlcnRUZXh0ID0gaW5zZXJ0VGV4dDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIl19