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
import { AjfBaseWidgetComponent, AjfColumnWidgetInstance, AjfLayoutWidgetInstance, AjfReportWidget as CoreComponent, AjfWidgetComponentsMap, AjfWidgetService as CoreService } from '@ajf/core/reports';
import { AfterContentChecked, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AjfWidgetService extends CoreService {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfWidgetService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfWidgetService>;
}
export declare class AjfReportWidget extends CoreComponent {
    readonly widgetsMap: AjfWidgetComponentsMap;
    constructor(renderer: Renderer2, widgetService: AjfWidgetService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportWidget, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReportWidget, "ajf-widget", never, {}, {}, never, never>;
}
export declare class AjfColumnWidgetComponent extends AjfBaseWidgetComponent<AjfColumnWidgetInstance> {
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfColumnWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfColumnWidgetComponent, "ng-component", never, {}, {}, never, never>;
}
export declare class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent<AjfLayoutWidgetInstance> implements AfterContentChecked {
    private _allcolumnsRendered$;
    readonly allcolumnsRendered$: Observable<boolean>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef);
    ngAfterContentChecked(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfLayoutWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfLayoutWidgetComponent, "ng-component", never, {}, {}, never, never>;
}
