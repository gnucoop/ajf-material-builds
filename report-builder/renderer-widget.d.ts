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
import { AjfImageType } from '@ajf/core/image';
import { AjfColumnWidget, AjfDataset, AjfLayoutWidget, AjfWidget, AjfWidgetType } from '@ajf/core/reports';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfReportBuilderDragData } from './report-builder-drag-data';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
export declare class AjfReportBuilderRendererWidget implements OnInit, OnDestroy, OnChanges {
    private _service;
    get widgetTypes(): typeof AjfWidgetType;
    widget: AjfWidget;
    get layoutWidget(): AjfLayoutWidget;
    position: number;
    section: string;
    onDragged: boolean;
    currentContentWidget: AjfWidget | null;
    obj: any;
    fixedZoom: any;
    getTableTitles: Observable<string[]>;
    getTableContent: Observable<string[][] | undefined>;
    getChartType: Observable<number>;
    getDataset: Observable<AjfDataset[][]>;
    getChartBackgroundColor: Observable<string[]>;
    getChartBorderColor: Observable<string[]>;
    getChartBorderWidth: Observable<number>;
    layoutShow: boolean;
    private _onDraggedSub;
    constructor(_service: AjfReportBuilderService);
    canDropPredicate(item: CdkDrag<AjfReportBuilderDragData>): boolean;
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
    getColumnContent(): AjfColumnWidget[];
    getIcon(): {
        fontSet: string;
        fontIcon: string;
    } | null;
    getFlag(): string | null;
    getPercent(index: number): string;
    getImageUrl(): string | null;
    getImageType(): AjfImageType;
    getHtmlText(): string;
    getCoordinate(): number[];
    getTileLayer(): string;
    getAttribution(): string;
    addToList(event: CdkDragDrop<AjfReportBuilderDragData>, toColumn: AjfColumnWidget): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderRendererWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderRendererWidget, "ajf-report-builder-renderer-widget", never, { "widget": "widget"; "position": "position"; "section": "section"; }, {}, never, never>;
}
