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
import { AjfBaseWidgetComponent, AjfReportWidget as CoreComponent, AjfWidgetService as CoreService, AjfWidgetType as wt, } from '@ajf/core/reports';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Injectable, Renderer2, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/reports";
import * as i2 from "@angular/common";
const defaultWidgetsFactory = () => {
    const defaultWidgets = {};
    defaultWidgets[wt.Layout] = { component: AjfLayoutWidgetComponent };
    defaultWidgets[wt.PageBreak] = { component: AjfPageBreakWidgetComponent };
    defaultWidgets[wt.Image] = { component: AjfImageWidgetComponent };
    defaultWidgets[wt.Text] = { component: AjfTextWidgetComponent };
    defaultWidgets[wt.Chart] = { component: AjfChartWidgetComponent };
    defaultWidgets[wt.Table] = { component: AjfTableWidgetComponent };
    defaultWidgets[wt.DynamicTable] = { component: AjfTableWidgetComponent };
    defaultWidgets[wt.Map] = { component: AjfMapWidgetComponent };
    defaultWidgets[wt.Column] = { component: AjfColumnWidgetComponent };
    defaultWidgets[wt.Formula] = { component: AjfFormulaWidgetComponent };
    defaultWidgets[wt.ImageContainer] = { component: AjfImageContainerWidgetComponent };
    return defaultWidgets;
};
export class AjfWidgetService extends CoreService {
    constructor() {
        super(defaultWidgetsFactory());
    }
}
AjfWidgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfWidgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfWidgetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
export class AjfReportWidget extends CoreComponent {
    constructor(cfr, renderer, widgetService) {
        super(cfr, renderer);
        this.widgetsMap = widgetService.componentsMap;
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: AjfWidgetService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportWidget.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportWidget, selector: "ajf-widget", usesInheritance: true, ngImport: i0, template: "<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], directives: [{ type: i1.AjfWidgetHost, selector: "[ajf-widget-host]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: AjfWidgetService }]; } });
export class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfColumnWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfColumnWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfColumnWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfColumnWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{flex:1 1 auto}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfColumnWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{flex:1 1 auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
export class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this._allcolumnsRendered$ = new BehaviorSubject(false);
        this.allcolumnsRendered$ = this._allcolumnsRendered$;
    }
    ngAfterContentChecked() {
        this._allcolumnsRendered$.next(true);
    }
}
AjfLayoutWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfLayoutWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfLayoutWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfLayoutWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i2.AsyncPipe, "ajfGetColumnContent": i1.AjfGetColumnContentPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfLayoutWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydHMvd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydHMvd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0cy9jb2x1bW4td2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0cy9sYXlvdXQtd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHNCQUFzQixFQUd0QixlQUFlLElBQUksYUFBYSxFQUVoQyxnQkFBZ0IsSUFBSSxXQUFXLEVBQy9CLGFBQWEsSUFBSSxFQUFFLEdBQ3BCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHVCQUF1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RUFBRSxFQUFFLENBQUMsQ0FBQztRQUxULHlCQUFvQixHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUNwRix3QkFBbUIsR0FDeEIsSUFBSSxDQUFDLG9CQUEyQyxDQUFDO0lBSXJELENBQUM7SUFDRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs2SEFYVSx3QkFBd0I7aUhBQXhCLHdCQUF3QiwyRUc5R3JDLDJjQVlBLHVOSHVFYSxlQUFlO21HQTJCZix3QkFBd0I7a0JBTnBDLFNBQVM7c0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQmFzZVdpZGdldENvbXBvbmVudCxcbiAgQWpmQ29sdW1uV2lkZ2V0SW5zdGFuY2UsXG4gIEFqZkxheW91dFdpZGdldEluc3RhbmNlLFxuICBBamZSZXBvcnRXaWRnZXQgYXMgQ29yZUNvbXBvbmVudCxcbiAgQWpmV2lkZ2V0Q29tcG9uZW50c01hcCxcbiAgQWpmV2lkZ2V0U2VydmljZSBhcyBDb3JlU2VydmljZSxcbiAgQWpmV2lkZ2V0VHlwZSBhcyB3dCxcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0YWJsZSxcbiAgUmVuZGVyZXIyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWJyZWFrLXdpZGdldCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGV4dC13aWRnZXQnO1xuXG5jb25zdCBkZWZhdWx0V2lkZ2V0c0ZhY3RvcnkgPSAoKTogQWpmV2lkZ2V0Q29tcG9uZW50c01hcCA9PiB7XG4gIGNvbnN0IGRlZmF1bHRXaWRnZXRzID0ge30gYXMgQWpmV2lkZ2V0Q29tcG9uZW50c01hcDtcbiAgZGVmYXVsdFdpZGdldHNbd3QuTGF5b3V0XSA9IHtjb21wb25lbnQ6IEFqZkxheW91dFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlBhZ2VCcmVha10gPSB7Y29tcG9uZW50OiBBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5JbWFnZV0gPSB7Y29tcG9uZW50OiBBamZJbWFnZVdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlRleHRdID0ge2NvbXBvbmVudDogQWpmVGV4dFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkNoYXJ0XSA9IHtjb21wb25lbnQ6IEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuVGFibGVdID0ge2NvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5EeW5hbWljVGFibGVdID0ge2NvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5NYXBdID0ge2NvbXBvbmVudDogQWpmTWFwV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuQ29sdW1uXSA9IHtjb21wb25lbnQ6IEFqZkNvbHVtbldpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkZvcm11bGFdID0ge2NvbXBvbmVudDogQWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkltYWdlQ29udGFpbmVyXSA9IHtjb21wb25lbnQ6IEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fTtcbiAgcmV0dXJuIGRlZmF1bHRXaWRnZXRzO1xufTtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQWpmV2lkZ2V0U2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoZGVmYXVsdFdpZGdldHNGYWN0b3J5KCkpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydFdpZGdldCBleHRlbmRzIENvcmVDb21wb25lbnQge1xuICByZWFkb25seSB3aWRnZXRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuXG4gIGNvbnN0cnVjdG9yKGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCByZW5kZXJlcjogUmVuZGVyZXIyLCB3aWRnZXRTZXJ2aWNlOiBBamZXaWRnZXRTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY2ZyLCByZW5kZXJlcik7XG4gICAgdGhpcy53aWRnZXRzTWFwID0gd2lkZ2V0U2VydmljZS5jb21wb25lbnRzTWFwO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2NvbHVtbi13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb2x1bW4td2lkZ2V0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZVdpZGdldENvbXBvbmVudDxBamZDb2x1bW5XaWRnZXRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2xheW91dC13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydsYXlvdXQtd2lkZ2V0LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50IGV4dGVuZHNcbiAgICBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZkxheW91dFdpZGdldEluc3RhbmNlPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBwcml2YXRlIF9hbGxjb2x1bW5zUmVuZGVyZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgYWxsY29sdW1uc1JlbmRlcmVkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9XG4gICAgICB0aGlzLl9hbGxjb2x1bW5zUmVuZGVyZWQkIGFzIE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsY29sdW1uc1JlbmRlcmVkJC5uZXh0KHRydWUpO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgYWpmLXdpZGdldC1ob3N0PjwvbmctdGVtcGxhdGU+XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLWNvbHVtbi1jb250YWluZXJcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdyBvZiBpbnN0YW5jZS5jb250ZW50XCI+XG4gICAgPGFqZi13aWRnZXQgW2luc3RhbmNlXT1cIndcIj5cbiAgICA8L2FqZi13aWRnZXQ+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLWNvbHVtbnNcIj5cbiAgPGRpdlxuICAgICAgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBpbnN0YW5jZS53aWRnZXQuY29sdW1uczsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgIFtuZ1N0eWxlXT1cInsnZmxleC1ncm93JzogY29sdW1uID4gLTEgPyAxIDogbnVsbCwgJ2ZsZXgtYmFzaXMnIDogY29sdW1uID4gLTEgPyAoY29sdW1uICogMTAwKSArICclJyA6IG51bGx9XCJcbiAgICAgIGNsYXNzPVwiYWpmLWNvbHVtblwiXG4gID5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFsbGNvbHVtbnNSZW5kZXJlZCR8YXN5bmNcIj5cbiAgICA8YWpmLXdpZGdldCAqbmdJZj1cIihpbnN0YW5jZXxhamZHZXRDb2x1bW5Db250ZW50OmlkeCkgYXMgY2NcIiBbaW5zdGFuY2VdPVwiY2MhXCI+XG4gICAgPC9hamYtd2lkZ2V0PlxuICA8L25nLWNvbnRhaW5lcj5cbiA8L2Rpdj5cbjwvZGl2PlxuIl19