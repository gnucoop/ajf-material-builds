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
import { AjfBaseWidgetComponent, AjfWidgetInstance } from '@ajf/core/reports';
import { ChangeDetectorRef, ElementRef, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { AjfFormRendererService } from '@ajf/core/forms';
import { TranslocoService } from '@ajf/core/transloco';
import * as i0 from "@angular/core";
export declare class AjfFilterWidgetComponent extends AjfBaseWidgetComponent<AjfWidgetInstance> implements OnInit, OnDestroy {
    private _ts;
    private _formRenderer;
    readonly filteredInstance: EventEmitter<AjfWidgetInstance>;
    private _instanceSub;
    constructor(cdr: ChangeDetectorRef, el: ElementRef, _ts: TranslocoService, _formRenderer: AjfFormRendererService);
    ngOnDestroy(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFilterWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFilterWidgetComponent, "ajf-filter-widget", never, { "instance": "instance"; }, { "filteredInstance": "filteredInstance"; }, never, never>;
}
