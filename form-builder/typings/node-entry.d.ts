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
import { AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { AjfFbBranchLine } from './branch-line';
import { AjfFormBuilderNode, AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService } from './form-builder-service';
export declare class AjfFbNodeEntry implements AfterViewInit, OnDestroy {
    private _service;
    branchLines: QueryList<AjfFbBranchLine>;
    childEntries: QueryList<ElementRef>;
    private _hasContent;
    readonly hasContent: boolean;
    private _isFirst;
    isFirst: boolean;
    private _isNodeEntry;
    readonly isNodeEntry: boolean;
    private _nodeEntry;
    nodeEntry: AjfFormBuilderNode;
    readonly realNodeEntry: AjfFormBuilderNodeEntry;
    private _branchColors;
    readonly branchColors: string[];
    private _dropZones;
    readonly dropZones: string[];
    private _slideDropZones;
    readonly slideDropZones: string[];
    private _originOffset;
    originOffset: number;
    private _originLeftMargin;
    readonly originLeftMargin: string;
    private _firstBranchColor;
    firstBranchColor: string;
    private _currentEditedNode;
    readonly currentEditedNode: Observable<AjfFormBuilderNodeEntry | null>;
    private _isSlide;
    private _branchLinesSubscription;
    private _childEntriesSubscription;
    constructor(_service: AjfFormBuilderService);
    onResize(): void;
    edit(): void;
    delete(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onDropSuccess(evt: CdkDragDrop<AjfFormBuilderNodeTypeEntry>, content?: boolean): void;
    disableSlideDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
    emptyAreaDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
    private _updateBranchHeights;
}
