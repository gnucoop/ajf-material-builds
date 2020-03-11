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
import { AjfCondition } from '@ajf/core/models';
import { OnDestroy, OnInit } from '@angular/core';
import { AjfFormVariables } from './models';
import { AjfReportBuilderService } from './report-builder-service';
export declare class AjfReportBuilderConditionEditor implements OnInit, OnDestroy {
    private _service;
    visibility: AjfCondition;
    formsVariables: AjfFormVariables[];
    isValid: boolean;
    names: string[];
    currentId: number;
    conditionText: string;
    a: any;
    b: any;
    conditionTextArea: any;
    operators: string[];
    private _conditionNamesSub;
    /**
     * this constructor will init current condition by ajfBuilderservice
     * and init condition and availableFieldNames subscriptions
     */
    constructor(_service: AjfReportBuilderService);
    extractNames(formsVariables: AjfFormVariables[]): void;
    setCurrent(id: number, index: number): void;
    /**
     * this method will return success if the current condtion is valid
     * @return boolean
     */
    validateCondition(): boolean;
    /**
     * this method will append text to json
     * @param text      : string -
     * @param goBackNum : number -
     */
    appendText(text: string, _goBackNum?: number): void;
    checkValidation(): void;
    /**
     * this method will save current condition
     */
    saveCondition(): void;
    ngOnInit(): void;
    /**
     * this method will destroy a conditionSubscriptions
     */
    ngOnDestroy(): void;
}
