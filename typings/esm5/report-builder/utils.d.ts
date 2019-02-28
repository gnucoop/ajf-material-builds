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
import { AjfReportWidgetType } from '@ajf/core/reports';
export declare function ajfReportBuilderWidgetToString(widgetType: string): string;
export declare function ajfWidgetTypeStringToIcon(widgetType: string): string;
export declare function ajfWidgetTypeToIcon(widgetType: AjfReportWidgetType): string;
export declare function ajfWidgetTypeStringToLabel(widgetType: string): string;
export declare function ajfWidgetTypeToLabel(type: AjfReportWidgetType): string;
export declare function widgetReportBuilderIconName(type: AjfReportWidgetType): string;
export declare function sanitizeConditionString(str: string): string;
