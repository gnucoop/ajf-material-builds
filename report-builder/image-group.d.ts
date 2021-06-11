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
import { EventEmitter } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * this component handle a group of image object
 * there are 2 types of view
 *  ajf-icon and class
 *
 * take a json in input
 *  'icon': 'false', // if true ajf-icon activated
 *  'class': ['flag-icon'], // add class in object style
 *  'prefixClass': 'flag-icon-', // prefix of class contained on data set
 *  'title': 'flags', title of data set
 *  'data': [
 *    {
 *      'class': 'dz', strind added on prefix
 *      'info': 'Algeria' info related to object (exploit on toolTip)
 *    }
 *  ]
 * };
 *
 * @export
 */
export declare class AjfReportBuilderImageGroup {
    private _service;
    private _icon;
    private _classes;
    get icon(): {
        fontSet: string;
        fontIcon: string;
    } | null;
    get classes(): string;
    open: boolean;
    valueToSearch: string;
    data: any;
    /**
     * this event is fired when the user click on formula button on quill editor rool barƒ
     *
     * @memberof QuillEditorComponent
     */
    readonly formulaClick: EventEmitter<any>;
    constructor(_service: AjfReportBuilderService);
    setIcon(fontSet: string, fontIcon: string): void;
    setFlag(value: string): void;
    setSearch(value: any): void;
    emitFormula(): void;
    getFlag(value: string): string;
    toggle(): void;
}
