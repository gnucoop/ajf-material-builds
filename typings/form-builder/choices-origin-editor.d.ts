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
import { AjfChoicesOrigin } from '@ajf/core/forms';
import { ChoicesOriginChoiceEntry, ChoicesOriginDataSource } from './choices-origin-data-source';
export declare class AjfFbChoicesOriginEditor {
    private _displayedColumns;
    readonly displayedColumns: string[];
    private _choicesOrigin;
    choicesOrigin: AjfChoicesOrigin<any>;
    editing: {
        [key: string]: boolean;
    };
    name: string;
    label: string;
    canEditChoices: boolean;
    private _choices;
    readonly choices: ChoicesOriginDataSource;
    private _choicesArr;
    readonly choicesArr: ChoicesOriginChoiceEntry[];
    updateValue(evt: any, cell: string, _value: any, rowIdx: number): void;
    deleteRow(rowIdx: number): void;
    addRow(): void;
}
