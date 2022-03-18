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
        this.label = '';
        this.kind = 0;
        this.documentation = '';
        this.insertText = '';
    }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setKind(kind) {
        this.kind = kind;
        return this;
    }
    setDocumentation(documentation) {
        this.documentation = documentation;
        return this;
    }
    setInsertText(insertText) {
        this.insertText = insertText;
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvbW9uYWNvLWVkaXRvci9zcmMvYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVIOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQU0zQjtRQUxBLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQixlQUFVLEdBQVcsRUFBRSxDQUFDO0lBRVQsQ0FBQztJQUVoQixRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxhQUFxQjtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBa0I7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgQXV0b0NvbXBsZXRlSXRlbVxuICovXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlSXRlbSB7XG4gIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAga2luZDogbnVtYmVyID0gMDtcbiAgZG9jdW1lbnRhdGlvbjogc3RyaW5nID0gJyc7XG4gIGluc2VydFRleHQ6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBzZXRMYWJlbChsYWJlbDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbSB7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0S2luZChraW5kOiBudW1iZXIpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICB0aGlzLmtpbmQgPSBraW5kO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0RG9jdW1lbnRhdGlvbihkb2N1bWVudGF0aW9uOiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICB0aGlzLmRvY3VtZW50YXRpb24gPSBkb2N1bWVudGF0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0SW5zZXJ0VGV4dChpbnNlcnRUZXh0OiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtIHtcbiAgICB0aGlzLmluc2VydFRleHQgPSBpbnNlcnRUZXh0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iXX0=