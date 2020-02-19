/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-drag-data.ts
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
 * @record
 */
export function AjfReportBuilderDragData() { }
if (false) {
    /** @type {?} */
    AjfReportBuilderDragData.prototype.widgetType;
    /** @type {?|undefined} */
    AjfReportBuilderDragData.prototype.widget;
    /** @type {?|undefined} */
    AjfReportBuilderDragData.prototype.fromIndex;
    /** @type {?|undefined} */
    AjfReportBuilderDragData.prototype.fromColumn;
    /** @type {?|undefined} */
    AjfReportBuilderDragData.prototype.from;
    /** @type {?|undefined} */
    AjfReportBuilderDragData.prototype.json;
    /** @type {?|undefined} */
    AjfReportBuilderDragData.prototype.arrayFrom;
    /** @type {?} */
    AjfReportBuilderDragData.prototype.dropZones;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItZHJhZy1kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSw4Q0FTQzs7O0lBUkMsOENBQW1COztJQUNuQiwwQ0FBbUI7O0lBQ25CLDZDQUFtQjs7SUFDbkIsOENBQTZCOztJQUM3Qix3Q0FBYzs7SUFDZCx3Q0FBVzs7SUFDWCw2Q0FBNEM7O0lBQzVDLDZDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbHVtbldpZGdldCwgQWpmV2lkZ2V0fSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhIHtcbiAgd2lkZ2V0VHlwZTogc3RyaW5nO1xuICB3aWRnZXQ/OiBBamZXaWRnZXQ7XG4gIGZyb21JbmRleD86IG51bWJlcjtcbiAgZnJvbUNvbHVtbj86IEFqZkNvbHVtbldpZGdldDtcbiAgZnJvbT86IG51bWJlcjtcbiAganNvbj86IGFueTtcbiAgYXJyYXlGcm9tPzogJ2hlYWRlcicgfCAnY29udGVudCcgfCAnZm9vdGVyJztcbiAgZHJvcFpvbmVzOiBzdHJpbmdbXTtcbn1cbiJdfQ==