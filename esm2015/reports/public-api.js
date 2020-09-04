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
export * from './column-widget';
export * from './formula-widget';
export * from './image-container-widget';
export * from './image-widget';
export * from './layout-widget';
export * from './map-widget';
export * from './page-break-widget';
export * from './report';
export * from './reports-module';
export * from './table-widget';
export * from './text-widget';
export * from './widget';
export * from './widget-service';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnRzL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxxQkFBcUIsQ0FBQztBQUNwQyxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9jb2x1bW4td2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vZm9ybXVsYS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW1hZ2Utd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vbGF5b3V0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL21hcC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9wYWdlLWJyZWFrLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3JlcG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL3JlcG9ydHMtbW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vdGFibGUtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vdGV4dC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQtc2VydmljZSc7XG4iXX0=