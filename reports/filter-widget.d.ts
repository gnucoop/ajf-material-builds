import { AjfFormRendererService } from '@ajf/core/forms';
import { AjfBaseWidgetComponent, AjfWidgetInstance } from '@ajf/core/reports';
import { TranslocoService } from '@ajf/core/transloco';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AjfFilterWidgetComponent extends AjfBaseWidgetComponent<AjfWidgetInstance> {
    private _ts;
    private _formRenderer;
    readonly filteredInstance: Observable<AjfWidgetInstance>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef, _ts: TranslocoService, _formRenderer: AjfFormRendererService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFilterWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFilterWidgetComponent, "ajf-filter-widget", never, {}, { "filteredInstance": "filteredInstance"; }, never, never>;
}
