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
import { AjfChoicesOrigin, AjfForm } from '@ajf/core/forms';
import { AfterContentInit, AfterViewChecked, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService } from './form-builder-service';
export declare class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
    private _service;
    private _dialog;
    designerCont: ElementRef;
    private _form;
    form: AjfForm;
    private _nodeTypes;
    readonly nodeTypes: AjfFormBuilderNodeTypeEntry[];
    private _nodeEntriesTree;
    readonly nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]>;
    private _choicesOrigins;
    readonly choicesOrigins: Observable<AjfChoicesOrigin<any>[]>;
    private _vc;
    private _init;
    private _editConditionSub;
    private _editConditionDialog;
    private _beforeNodesUpdateSub;
    private _editChoicesOriginSub;
    private _editChoicesOriginDialog;
    private _lastScrollTop;
    constructor(_service: AjfFormBuilderService, _dialog: MatDialog);
    ngAfterViewChecked(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    createChoicesOrigin(): void;
    disableDropPredicate(): boolean;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    private _setCurrentForm;
}
