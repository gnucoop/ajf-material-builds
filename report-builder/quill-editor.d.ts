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
import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { AjfReportBuilderService } from './report-builder-service';
export declare class AjfQuillEditor implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy, Validator {
    private _elementRef;
    private _renderer;
    private _service;
    quillEditor: any;
    editorElem: HTMLElement;
    emptyArray: any[];
    content: any;
    listenFunc: Function;
    previewElemFormula: any;
    private _init;
    dateFormats: {
        label: string;
        value: string;
        validator: string;
    }[];
    fonts: (string | boolean)[];
    defaultModules: {
        formula: boolean;
        toolbar: (string[] | {
            header: number;
        }[] | {
            list: string;
        }[] | {
            script: string;
        }[] | {
            size: (string | boolean)[];
        }[] | {
            header: (number | boolean)[];
        }[] | ({
            color: any[];
            background?: undefined;
        } | {
            background: any[];
            color?: undefined;
        })[] | {
            font: (string | boolean)[];
        }[] | {
            align: any[];
        }[])[];
    };
    font: any;
    theme: string;
    modules: Object;
    readOnly: boolean;
    placeholder: string;
    maxLength: number;
    minLength: number;
    formats: string[];
    initHTML: string;
    editorCreated: EventEmitter<any>;
    contentChanged: EventEmitter<any>;
    selectionChanged: EventEmitter<any>;
    /**
     * this event is fired when the user click on formula button on quill editor rool barƒ
     *
     * @memberof QuillEditorComponent
     */
    formulaClick: EventEmitter<any>;
    onModelChange: Function;
    onModelTouched: Function;
    private _formulas;
    private _formulaTextSub;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _service: AjfReportBuilderService);
    check(value: string): string;
    /**
     * this function search fomulas inside the init text
     * and allocate the related listener on click event
     *
     * @memberof QuillEditorComponent
     */
    setHTML(): void;
    ngAfterViewInit(): void;
    writeValue(currentValue: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(fn: Function): void;
    validate(_c: FormControl): {
        minLengthError?: {
            given: number;
            minLength: number;
        } | undefined;
        maxLengthError?: {
            given: number;
            maxLength: number;
        } | undefined;
    } | null;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
