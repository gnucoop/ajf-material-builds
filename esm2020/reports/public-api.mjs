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
export * from './chart-widget';
export * from './formula-widget';
export * from './image-container-widget';
export * from './image-widget';
export * from './map-widget';
export * from './page-break-widget';
export * from './report';
export * from './reports-module';
export * from './table-widget';
export * from './text-widget';
export * from './widget';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnRzL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLGNBQWMsMEJBQTBCLENBQUM7QUFDekMsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGNBQWMsQ0FBQztBQUM3QixjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMsVUFBVSxDQUFDO0FBQ3pCLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vcGFnZS1icmVhay13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnRzLW1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3RleHQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0JztcbiJdfQ==