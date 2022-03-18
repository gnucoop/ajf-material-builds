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
export * from './filter-widget';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3JlcG9ydHMvc3JjL3B1YmxpY19hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsY0FBYyxDQUFDO0FBQzdCLGNBQWMscUJBQXFCLENBQUM7QUFDcEMsY0FBYyxVQUFVLENBQUM7QUFDekIsY0FBYyxrQkFBa0IsQ0FBQztBQUNqQyxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsZUFBZSxDQUFDO0FBQzlCLGNBQWMsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vcGFnZS1icmVhay13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnRzLW1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3RleHQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0JztcbiJdfQ==