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
import { AjfChoicesOrigin, AjfForm } from '@ajf/core/forms';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewChecked, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService } from './form-builder-service';
export declare class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
    private _service;
    private _dialog;
    designerCont: ElementRef;
    private _form;
    get form(): AjfForm;
    set form(form: AjfForm);
    private _nodeTypes;
    get nodeTypes(): AjfFormBuilderNodeTypeEntry[];
    private _nodeEntriesTree;
    get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]>;
    private _choicesOrigins;
    get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]>;
    private _globalExpanded;
    get isGlobalExpanded(): boolean;
    /**
     * The list of the ids of all the dropLists connected to the formbuilder source list.
     */
    private _connectedDropLists;
    get connectedDropLists(): Observable<string[]>;
    private _vc;
    private _init;
    private _editConditionSub;
    private _editConditionDialog;
    private _beforeNodesUpdateSub;
    private _editChoicesOriginSub;
    private _editChoicesOriginDialog;
    private _stringIdentifierDialog;
    private _stringIdentifierSub;
    private _lastScrollTop;
    constructor(_service: AjfFormBuilderService, _dialog: MatDialog);
    ngAfterViewChecked(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    createChoicesOrigin(): void;
    disableDrop(): boolean;
    disableFieldDrop(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>, content?: boolean): void;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    editStringIdentifier(): void;
    expandAll(): void;
    collapseAll(): void;
    expandToggle(evt: MatSlideToggleChange): void;
    private _setCurrentForm;
}
