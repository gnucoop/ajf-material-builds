/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/auto-complete-item-model.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL21vbmFjby1lZGl0b3IvYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE1BQU0sT0FBTyxnQkFBZ0I7SUFNekI7SUFFQSxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxhQUFxQjtRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxVQUFrQjtRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7OztJQTVCRyxpQ0FBYzs7SUFDZCxnQ0FBYTs7SUFDYix5Q0FBc0I7O0lBQ3RCLHNDQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIEF1dG9Db21wbGV0ZUl0ZW1cbiAqL1xuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAga2luZDogbnVtYmVyO1xuICAgIGRvY3VtZW50YXRpb246IHN0cmluZztcbiAgICBpbnNlcnRUZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIHNldExhYmVsKGxhYmVsOiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRLaW5kKGtpbmQ6IG51bWJlcik6IEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXREb2N1bWVudGF0aW9uKGRvY3VtZW50YXRpb246IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgICAgICB0aGlzLmRvY3VtZW50YXRpb24gPSBkb2N1bWVudGF0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRJbnNlcnRUZXh0KGluc2VydFRleHQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW0ge1xuICAgICAgICB0aGlzLmluc2VydFRleHQgPSBpbnNlcnRUZXh0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXX0=