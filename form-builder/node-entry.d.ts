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
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { AfterViewInit, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfFbBranchLine } from './branch-line';
import { AjfFormBuilderNode, AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService } from './form-builder-service';
export declare class AjfFbNodeEntry implements AfterViewInit, OnDestroy {
    private _service;
    branchLines: QueryList<AjfFbBranchLine>;
    childEntries: QueryList<ElementRef>;
    private _hasContent;
    get hasContent(): boolean;
    private _isFirst;
    get isFirst(): boolean;
    set isFirst(isFirst: boolean);
    private _isNodeEntry;
    get isNodeEntry(): boolean;
    private _nodeEntry;
    get nodeEntry(): AjfFormBuilderNode;
    set nodeEntry(nodeEntry: AjfFormBuilderNode);
    private _level;
    get level(): number;
    set level(value: number);
    get realNodeEntry(): AjfFormBuilderNodeEntry;
    private _branchColors;
    get branchColors(): string[];
    private _dropZones;
    get dropZones(): string[];
    private _slideDropZones;
    get slideDropZones(): string[];
    private _originOffset;
    get originOffset(): number;
    set originOffset(originOffset: number);
    private _originLeftMargin;
    get originLeftMargin(): string;
    private _firstBranchColor;
    get firstBranchColor(): string;
    set firstBranchColor(firstBranchColor: string);
    private _currentEditedNode;
    get currentEditedNode(): Observable<AjfFormBuilderNodeEntry | null>;
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
    emptyAreaDropPredicate(): (item: CdkDrag, _drop: CdkDropList) => boolean;
    private _updateBranchHeights;
}