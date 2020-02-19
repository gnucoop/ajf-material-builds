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
import { AjfColumnWidget } from '@ajf/core/reports';
import { OnDestroy, OnInit } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * this component manages the report text
 *
 * @export
 */
export declare class AjfReportBuilderColumn implements OnDestroy, OnInit {
    private _service;
    /**
     * if true mouse event is on dragged status
     *
     * @memberOf AjfReportBuilderContent
     */
    showActions: boolean;
    layoutShow: boolean;
    onDragged: boolean;
    /**
     * is the array of values
     *
     * @memberOf TableComponent
     */
    column: AjfColumnWidget;
    private _onDraggedSub;
    addToList(event: any, idx: number, toColumn: AjfColumnWidget): void;
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragStartHandler(): void;
    /**
     * sign the end of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragEndHandler(): void;
    constructor(_service: AjfReportBuilderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
