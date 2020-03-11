/**
 * @fileoverview added by tsickle
 * Generated from: src/material/reports/public-api.ts
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
export { AjfChartWidgetComponent } from './chart-widget';
export { AjfColumnWidgetComponent } from './column-widget';
export { AjfFormulaWidgetComponent } from './formula-widget';
export { AjfImageContainerWidgetComponent } from './image-container-widget';
export { AjfImageWidgetComponent } from './image-widget';
export { AjfLayoutWidgetComponent } from './layout-widget';
export { AjfMapWidgetComponent } from './map-widget';
export { AjfPageBreakWidgetComponent } from './page-break-widget';
export { AjfReportRenderer } from './report';
export { AjfReportsModule } from './reports-module';
export { AjfTableWidgetComponent } from './table-widget';
export { AjfTextWidgetComponent } from './text-widget';
export { AjfReportWidget } from './widget';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnRzL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsd0NBQWMsZ0JBQWdCLENBQUM7QUFDL0IseUNBQWMsaUJBQWlCLENBQUM7QUFDaEMsMENBQWMsa0JBQWtCLENBQUM7QUFDakMsaURBQWMsMEJBQTBCLENBQUM7QUFDekMsd0NBQWMsZ0JBQWdCLENBQUM7QUFDL0IseUNBQWMsaUJBQWlCLENBQUM7QUFDaEMsc0NBQWMsY0FBYyxDQUFDO0FBQzdCLDRDQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGtDQUFjLFVBQVUsQ0FBQztBQUN6QixpQ0FBYyxrQkFBa0IsQ0FBQztBQUNqQyx3Q0FBYyxnQkFBZ0IsQ0FBQztBQUMvQix1Q0FBYyxlQUFlLENBQUM7QUFDOUIsZ0NBQWMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbHVtbi13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9sYXlvdXQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vbWFwLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vcmVwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vcmVwb3J0cy1tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi90YWJsZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi90ZXh0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG4iXX0=