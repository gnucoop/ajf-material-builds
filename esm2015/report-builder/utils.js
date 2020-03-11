/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/utils.ts
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
import { AjfWidgetType } from '@ajf/core/reports';
/**
 * @param {?} widgetType
 * @return {?}
 */
export function ajfReportBuilderWidgetToString(widgetType) {
    return `reportbuilder-${widgetType.toLowerCase()}`;
}
/**
 * @param {?} widgetType
 * @return {?}
 */
export function ajfWidgetTypeStringToIcon(widgetType) {
    return `widget-${widgetType.toLowerCase()}`;
}
/**
 * @param {?} widgetType
 * @return {?}
 */
export function ajfWidgetTypeToIcon(widgetType) {
    return ajfWidgetTypeStringToIcon(AjfWidgetType[widgetType]);
}
/**
 * @param {?} widgetType
 * @return {?}
 */
export function ajfWidgetTypeStringToLabel(widgetType) {
    return `widgetType.${widgetType}`;
}
/**
 * @param {?} type
 * @return {?}
 */
export function ajfWidgetTypeToLabel(type) {
    return ajfWidgetTypeStringToLabel(AjfWidgetType[type]);
}
/**
 * @param {?} type
 * @return {?}
 */
export function widgetReportBuilderIconName(type) {
    return `reportbuilder-${AjfWidgetType[type].toLowerCase()}`;
}
/**
 * @param {?} str
 * @return {?}
 */
export function sanitizeConditionString(str) {
    str = str.trim();
    while (str.indexOf('  ') > 0) {
        str = str.replace('  ', ' ');
    }
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7OztBQUVoRCxNQUFNLFVBQVUsOEJBQThCLENBQUMsVUFBa0I7SUFDL0QsT0FBTyxpQkFBaUIsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDckQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUMsVUFBa0I7SUFDMUQsT0FBTyxVQUFVLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO0FBQzlDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFVBQXlCO0lBQzNELE9BQU8seUJBQXlCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsVUFBa0I7SUFDM0QsT0FBTyxjQUFjLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLElBQW1CO0lBQ3RELE9BQU8sMEJBQTBCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsSUFBbUI7SUFDN0QsT0FBTyxpQkFBaUIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDOUQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsR0FBVztJQUNqRCxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDNUIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRUb1N0cmluZyh3aWRnZXRUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYHJlcG9ydGJ1aWxkZXItJHt3aWRnZXRUeXBlLnRvTG93ZXJDYXNlKCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFqZldpZGdldFR5cGVTdHJpbmdUb0ljb24od2lkZ2V0VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB3aWRnZXQtJHt3aWRnZXRUeXBlLnRvTG93ZXJDYXNlKCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFqZldpZGdldFR5cGVUb0ljb24od2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZSk6IHN0cmluZyB7XG4gIHJldHVybiBhamZXaWRnZXRUeXBlU3RyaW5nVG9JY29uKEFqZldpZGdldFR5cGVbd2lkZ2V0VHlwZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWpmV2lkZ2V0VHlwZVN0cmluZ1RvTGFiZWwod2lkZ2V0VHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB3aWRnZXRUeXBlLiR7d2lkZ2V0VHlwZX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWpmV2lkZ2V0VHlwZVRvTGFiZWwodHlwZTogQWpmV2lkZ2V0VHlwZSk6IHN0cmluZyB7XG4gIHJldHVybiBhamZXaWRnZXRUeXBlU3RyaW5nVG9MYWJlbChBamZXaWRnZXRUeXBlW3R5cGVdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpZGdldFJlcG9ydEJ1aWxkZXJJY29uTmFtZSh0eXBlOiBBamZXaWRnZXRUeXBlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGByZXBvcnRidWlsZGVyLSR7QWpmV2lkZ2V0VHlwZVt0eXBlXS50b0xvd2VyQ2FzZSgpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUNvbmRpdGlvblN0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHN0ciA9IHN0ci50cmltKCk7XG4gIHdoaWxlIChzdHIuaW5kZXhPZignICAnKSA+IDApIHtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnICAnLCAnICcpO1xuICB9XG4gIHJldHVybiBzdHI7XG59XG4iXX0=