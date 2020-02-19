/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/operations.ts
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
export function AjfWidgetsOperation() { }
/**
 * @record
 */
export function AjfCustomWidgetsOperation() { }
/**
 * @record
 */
export function AjfStylesOperation() { }
/**
 * @record
 */
export function AjfWidgetOperation() { }
/**
 * @record
 */
export function AjfColorOperation() { }
/**
 * @record
 */
export function AjfFormVariablesOperation() { }
/**
 * @record
 */
export function AjfReportFormsOperation() { }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9vcGVyYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLHlDQUVDOzs7O0FBRUQsK0NBRUM7Ozs7QUFFRCx3Q0FFQzs7OztBQUVELHdDQUVDOzs7O0FBRUQsdUNBRUM7Ozs7QUFFRCwrQ0FFQzs7OztBQUVELDZDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ3VzdG9tV2lkZ2V0LCBBamZTdHlsZXMsIEFqZldpZGdldH0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzLCBBamZXaWRnZXRzQ29udGFpbmVyfSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmV2lkZ2V0c09wZXJhdGlvbiB7XG4gICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uIHtcbiAgKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmU3R5bGVzT3BlcmF0aW9uIHtcbiAgKHN0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZldpZGdldE9wZXJhdGlvbiB7XG4gICh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmQ29sb3JPcGVyYXRpb24ge1xuICAoY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24ge1xuICAodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24ge1xuICAoZm9ybXM6IEFqZkZvcm1bXSk6IEFqZkZvcm1bXTtcbn1cbiJdfQ==