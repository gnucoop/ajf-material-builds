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
import { AjfReportWidget as CoreComponent } from '@ajf/core/reports';
import { ComponentFactoryResolver, Renderer2 } from '@angular/core';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfColumnWidgetComponent } from './column-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfLayoutWidgetComponent } from './layout-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
export declare class AjfReportWidget extends CoreComponent {
    constructor(cfr: ComponentFactoryResolver, renderer: Renderer2);
    widgetsMap: {
        0: {
            component: typeof AjfLayoutWidgetComponent;
        };
        1: {
            component: typeof AjfPageBreakWidgetComponent;
        };
        2: {
            component: typeof AjfImageWidgetComponent;
        };
        3: {
            component: typeof AjfTextWidgetComponent;
        };
        4: {
            component: typeof AjfChartWidgetComponent;
        };
        5: {
            component: typeof AjfTableWidgetComponent;
        };
        10: {
            component: typeof AjfTableWidgetComponent;
        };
        6: {
            component: typeof AjfMapWidgetComponent;
        };
        7: {
            component: typeof AjfColumnWidgetComponent;
        };
        8: {
            component: typeof AjfFormulaWidgetComponent;
        };
        9: {
            component: typeof AjfImageContainerWidgetComponent;
        };
    };
}
