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
import { AjfFormStringIdentifier } from '@ajf/core/forms';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AjfFormBuilderService } from './form-builder-service';
export declare class AjfFbStringIdentifierDialogComponent implements OnDestroy {
    private _service;
    private _cdr;
    readonly dataSource: MatTableDataSource<AjfFormStringIdentifier>;
    readonly displayedColumns: string[];
    readonly fields$: Observable<string[]>;
    readonly separatorKeysCodes: number[];
    private _stringIdentifierSub;
    constructor(_service: AjfFormBuilderService, _cdr: ChangeDetectorRef);
    addRow(): void;
    deleteRow(rowIdx: number): void;
    addValue(row: AjfFormStringIdentifier, evt: MatChipInputEvent, valueInput: HTMLInputElement): void;
    removeValue(row: AjfFormStringIdentifier, value: string): void;
    ngOnDestroy(): void;
    saveStringIdentifier(): void;
    selected(row: AjfFormStringIdentifier, evt: MatAutocompleteSelectedEvent): void;
}
