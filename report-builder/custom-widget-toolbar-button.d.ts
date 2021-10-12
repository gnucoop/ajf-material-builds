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
import { OnInit } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderCustomWidgetToolbarButton implements OnInit {
    private _service;
    widgetType: string;
    position: number;
    widgetIcon: string;
    widgetLabel: string;
    customWidgets: any[];
    /**
     * this constructor will init icon registry
     */
    constructor(_service: AjfReportBuilderService);
    /**
     * this method call a service method for remove custom widget
     *
     * @memberOf AjfReportBuilderCustomWidgetToolbarButton
     */
    remove(): void;
    /**
     * this method will init  fieldIcon and fieldLabel
     */
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderCustomWidgetToolbarButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderCustomWidgetToolbarButton, "ajf-report-builder-custom-widget-toolbar-button", never, { "widgetType": "widgetType"; "position": "position"; }, {}, never, never>;
}
