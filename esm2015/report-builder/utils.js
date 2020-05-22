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
export function ajfReportBuilderWidgetToString(widgetType) {
    return `reportbuilder-${widgetType.toLowerCase()}`;
}
export function ajfWidgetTypeStringToIcon(widgetType) {
    return `widget-${widgetType.toLowerCase()}`;
}
export function ajfWidgetTypeToIcon(widgetType) {
    return ajfWidgetTypeStringToIcon(AjfWidgetType[widgetType]);
}
export function ajfWidgetTypeStringToLabel(widgetType) {
    return `widgetType.${widgetType}`;
}
export function ajfWidgetTypeToLabel(type) {
    return ajfWidgetTypeStringToLabel(AjfWidgetType[type]);
}
export function widgetReportBuilderIconName(type) {
    return `reportbuilder-${AjfWidgetType[type].toLowerCase()}`;
}
export function sanitizeConditionString(str) {
    str = str.trim();
    while (str.indexOf('  ') > 0) {
        str = str.replace('  ', ' ');
    }
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE1BQU0sVUFBVSw4QkFBOEIsQ0FBQyxVQUFrQjtJQUMvRCxPQUFPLGlCQUFpQixVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztBQUNyRCxDQUFDO0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLFVBQWtCO0lBQzFELE9BQU8sVUFBVSxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztBQUM5QyxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLFVBQXlCO0lBQzNELE9BQU8seUJBQXlCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxVQUFrQjtJQUMzRCxPQUFPLGNBQWMsVUFBVSxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxJQUFtQjtJQUN0RCxPQUFPLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsSUFBbUI7SUFDN0QsT0FBTyxpQkFBaUIsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDOUQsQ0FBQztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxHQUFXO0lBQ2pELEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM1QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYWpmUmVwb3J0QnVpbGRlcldpZGdldFRvU3RyaW5nKHdpZGdldFR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgcmVwb3J0YnVpbGRlci0ke3dpZGdldFR5cGUudG9Mb3dlckNhc2UoKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWpmV2lkZ2V0VHlwZVN0cmluZ1RvSWNvbih3aWRnZXRUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYHdpZGdldC0ke3dpZGdldFR5cGUudG9Mb3dlckNhc2UoKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWpmV2lkZ2V0VHlwZVRvSWNvbih3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGFqZldpZGdldFR5cGVTdHJpbmdUb0ljb24oQWpmV2lkZ2V0VHlwZVt3aWRnZXRUeXBlXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhamZXaWRnZXRUeXBlU3RyaW5nVG9MYWJlbCh3aWRnZXRUeXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYHdpZGdldFR5cGUuJHt3aWRnZXRUeXBlfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhamZXaWRnZXRUeXBlVG9MYWJlbCh0eXBlOiBBamZXaWRnZXRUeXBlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGFqZldpZGdldFR5cGVTdHJpbmdUb0xhYmVsKEFqZldpZGdldFR5cGVbdHlwZV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lKHR5cGU6IEFqZldpZGdldFR5cGUpOiBzdHJpbmcge1xuICByZXR1cm4gYHJlcG9ydGJ1aWxkZXItJHtBamZXaWRnZXRUeXBlW3R5cGVdLnRvTG93ZXJDYXNlKCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplQ29uZGl0aW9uU3RyaW5nKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgc3RyID0gc3RyLnRyaW0oKTtcbiAgd2hpbGUgKHN0ci5pbmRleE9mKCcgICcpID4gMCkge1xuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcgICcsICcgJyk7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn1cbiJdfQ==