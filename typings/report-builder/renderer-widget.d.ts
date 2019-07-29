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
import { Observable } from 'rxjs';
import { OnInit, OnChanges, OnDestroy } from '@angular/core';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AjfImageType } from '@ajf/core/image';
import { AjfDataset, AjfReportColumnWidget, AjfReportLayoutWidget, AjfReportWidget, AjfReportWidgetType } from '@ajf/core/reports';
import { AjfReportBuilderDragData } from './report-builder-drag-data';
import { AjfReportBuilderService } from './report-builder-service';
export declare class AjfReportBuilderRendererWidget implements OnInit, OnDestroy, OnChanges {
    private _service;
    readonly widgetTypes: typeof AjfReportWidgetType;
    widget: AjfReportWidget;
    readonly layoutWidget: AjfReportLayoutWidget;
    position: number;
    section: string;
    onDragged: boolean;
    currentContentWidget: AjfReportWidget | null;
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
    getColumnContent(): AjfReportColumnWidget[];
    getIcon(): {
        fontSet: string;
        fontIcon: string;
    } | null;
    getFlag(): string | null;
    getPercent(index: number): string;
    getImageUrl(): string | null;
    getImageType(): AjfImageType.Image | AjfImageType;
    getHtmlText(): string;
    getCoordinate(): number[];
    getTileLayer(): string;
    getAttribution(): string;
    addToList(event: CdkDragDrop<AjfReportBuilderDragData>, toColumn: AjfReportColumnWidget): void;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
