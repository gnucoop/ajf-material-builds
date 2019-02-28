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
import { AfterViewChecked, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { AjfReportStyles, AjfReportWidget } from '@ajf/core/reports';
import { AjfReportBuilderDragData } from './report-builder-drag-data';
import { AjfReportBuilderService } from './report-builder-service';
/**
 *  manage the content page
 *
 * @export
 */
export declare class AjfReportBuilderContent implements OnInit, AfterViewChecked, OnDestroy {
    private service;
    private cdRef;
    onMouseOver(): void;
    onMouseLeave(): void;
    canDropPredicate(dropZones: string[]): (item: CdkDrag<AjfReportBuilderDragData>) => boolean;
    reportStyles: Observable<AjfReportStyles>;
    onDragged: boolean;
    /**
     *  observe the status of the fixed zoom
     *
     * @memberOf AjfReportBuilderContent
     */
    fixedZoom: boolean;
    onDragEnter: any;
    show: boolean;
    headerWidgets: AjfReportWidget[];
    /**
     * observe the css style of header
     *
     * @memberOf AjfReportBuilderContent
     */
    headerStyles: Observable<AjfReportStyles>;
    contentWidgets: AjfReportWidget[];
    /**
     * observe the css style of content
     *
     * @memberOf AjfReportBuilderContent
     */
    contentStyles: Observable<AjfReportStyles>;
    footerWidgets: AjfReportWidget[];
    onOver: boolean;
    /**
     * observe the css style of footer
     *
     * @memberOf AjfReportBuilderContent
     */
    footerStyles: Observable<AjfReportStyles>;
    currentWidget: AjfReportWidget | null;
    /**
     * if true mouse event is on dragged status
     *
     * @memberOf AjfReportBuilderContent
     */
    showActions: boolean;
    private _onDraggedSub;
    private _fixedZoomSub;
    private _onDragEnterSub;
    private _headerWidgetsSub;
    private _contentWidgetsSub;
    private _footerWidgetsSub;
    private _onOverSub;
    private _currentWidgetSub;
    constructor(service: AjfReportBuilderService, cdRef: ChangeDetectorRef);
    isLayout(widget: AjfReportWidget): boolean;
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
    /**
     *  sign the enter of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragEnterHandler(array: string, index: number): void;
    /**
     * sign the leave of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragLeaveHandler(): void;
    /**
     *  return true if array and index is === with array and index of onDragEnter
     *
     * @param array
     * @param index
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragEnterCheck(array: string, index: number): boolean;
    /**
     * remove widget element from type array in idx position
     *
     * @param type can be header content or footer
     * @param idx
     *
     * @memberOf AjfReportBuilderContent
     */
    remove(type: string, idx: number): void;
    /**
     * add widget element into type array in idx position
     *
     * @param type
     * @param event
     *
     * @memberOf AjfReportBuilderContent
     */
    addToList(arrayTo: string, event: CdkDragDrop<AjfReportBuilderDragData>, to?: number): void;
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
}
