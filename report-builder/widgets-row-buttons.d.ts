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
import { AjfWidget } from '@ajf/core/reports';
import { OnDestroy, OnInit } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderWidgetsRowButtons implements OnDestroy, OnInit {
    private _service;
    from: string;
    fromWidget: AjfWidget;
    position: number;
    widget: AjfWidget;
    child: boolean;
    isOver: boolean;
    currentWidget: AjfWidget | null;
    isClicked: boolean;
    color: string[];
    widgetIcon: string;
    widgetLabel: string;
    label: string;
    onDragged: boolean;
    onOver: boolean;
    private _currentWidgetSub;
    private _onDraggedSub;
    private _onOverSub;
    /**
     *
     * @param private _afjBuilderService: AjfBuilderService
     */
    constructor(_service: AjfReportBuilderService);
    selectedWidget(): void;
    remove(): void;
    onFocus(): boolean;
    changeColumn(direction: string): void;
    isColumn(): boolean;
    isOneColumn(): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderWidgetsRowButtons, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderWidgetsRowButtons, "ajf-report-builder-widgets-row-buttons", never, { "from": "from"; "fromWidget": "fromWidget"; "position": "position"; "widget": "widget"; "child": "child"; "isOver": "isOver"; }, {}, never, never>;
}
