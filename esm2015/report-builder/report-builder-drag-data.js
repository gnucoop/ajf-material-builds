/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-drag-data.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItZHJhZy1kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSw4Q0FTQzs7O0lBUkMsOENBQW1COztJQUNuQiwwQ0FBbUI7O0lBQ25CLDZDQUFtQjs7SUFDbkIsOENBQTZCOztJQUM3Qix3Q0FBYzs7SUFDZCx3Q0FBVzs7SUFDWCw2Q0FBd0M7O0lBQ3hDLDZDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXQsIEFqZldpZGdldH0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YSB7XG4gIHdpZGdldFR5cGU6IHN0cmluZztcbiAgd2lkZ2V0PzogQWpmV2lkZ2V0O1xuICBmcm9tSW5kZXg/OiBudW1iZXI7XG4gIGZyb21Db2x1bW4/OiBBamZDb2x1bW5XaWRnZXQ7XG4gIGZyb20/OiBudW1iZXI7XG4gIGpzb24/OiBhbnk7XG4gIGFycmF5RnJvbT86ICdoZWFkZXInfCdjb250ZW50J3wnZm9vdGVyJztcbiAgZHJvcFpvbmVzOiBzdHJpbmdbXTtcbn1cbiJdfQ==