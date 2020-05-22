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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnRzL3B1YmxpYy1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxxQkFBcUIsQ0FBQztBQUNwQyxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLGtCQUFrQixDQUFDO0FBQ2pDLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxVQUFVLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vY2hhcnQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vY29sdW1uLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2Zvcm11bGEtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ltYWdlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2xheW91dC13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vcGFnZS1icmVhay13aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnQnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXBvcnRzLW1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL3RleHQtd2lkZ2V0JztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0JztcbiJdfQ==