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
    constructor() { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21vbmFjby1lZGl0b3IvYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU0sT0FBTyxnQkFBZ0I7SUFNM0IsZ0JBQWUsQ0FBQzs7Ozs7SUFFaEIsUUFBUSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxhQUFxQjtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLFVBQWtCO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGOzs7SUExQkMsaUNBQWM7O0lBQ2QsZ0NBQWE7O0lBQ2IseUNBQXNCOztJQUN0QixzQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgQXV0b0NvbXBsZXRlSXRlbVxuICovXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlSXRlbSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGtpbmQ6IG51bWJlcjtcbiAgZG9jdW1lbnRhdGlvbjogc3RyaW5nO1xuICBpbnNlcnRUZXh0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRLaW5kKGtpbmQ6IG51bWJlcik6IEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgIHRoaXMua2luZCA9IGtpbmQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXREb2N1bWVudGF0aW9uKGRvY3VtZW50YXRpb246IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgIHRoaXMuZG9jdW1lbnRhdGlvbiA9IGRvY3VtZW50YXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRJbnNlcnRUZXh0KGluc2VydFRleHQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgIHRoaXMuaW5zZXJ0VGV4dCA9IGluc2VydFRleHQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiJdfQ==