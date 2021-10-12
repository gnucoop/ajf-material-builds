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
import { AjfStyles, AjfWidget } from '@ajf/core/reports';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewChecked, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfReportBuilderDragData } from './report-builder-drag-data';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
/**
 *  manage the content page
 *
 * @export
 */
export declare class AjfReportBuilderContent implements OnInit, AfterViewChecked, OnDestroy {
    private _service;
    private _cdRef;
    onMouseOver(): void;
    onMouseLeave(): void;
    canDropPredicate(dropZones: string[]): (item: CdkDrag<AjfReportBuilderDragData>) => boolean;
    reportStyles: Observable<AjfStyles>;
    onDragged: boolean;
    /**
     *  observe the status of the fixed zoom
     *
     * @memberOf AjfReportBuilderContent
     */
    fixedZoom: boolean;
    onDragEnter: any;
    show: boolean;
    headerWidgets: AjfWidget[];
    /**
     * observe the css style of header
     *
     * @memberOf AjfReportBuilderContent
     */
    headerStyles: Observable<AjfStyles>;
    contentWidgets: AjfWidget[];
    /**
     * observe the css style of content
     *
     * @memberOf AjfReportBuilderContent
     */
    contentStyles: Observable<AjfStyles>;
    footerWidgets: AjfWidget[];
    onOver: boolean;
    /**
     * observe the css style of footer
     *
     * @memberOf AjfReportBuilderContent
     */
    footerStyles: Observable<AjfStyles>;
    currentWidget: AjfWidget | null;
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
    constructor(_service: AjfReportBuilderService, _cdRef: ChangeDetectorRef);
    isLayout(widget: AjfWidget): boolean;
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
    onDragEnterHandler(array: string, index: number | undefined): void;
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportBuilderContent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportBuilderContent, "ajf-report-builder-content", never, {}, {}, never, never>;
}
