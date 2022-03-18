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
import { AjfBaseWidgetComponent } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/reports";
import * as i2 from "@ajf/core/chart";
import * as i3 from "@angular/common";
export class AjfChartWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfChartWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfChartWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfChartWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfChartWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n", styles: [""], components: [{ type: i1.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }, { type: i2.AjfChartComponent, selector: "ajf-chart", inputs: ["data", "options", "chartType", "instance"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfChartWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvY2hhcnQtd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvY2hhcnQtd2lkZ2V0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUF5QixNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFRdkIsTUFBTSxPQUFPLHVCQUF3QixTQUFRLHNCQUE4QztJQUN6RixZQUFZLEdBQXNCLEVBQUUsRUFBYztRQUNoRCxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7O29IQUhVLHVCQUF1Qjt3R0FBdkIsdUJBQXVCLDJFQ3JDcEMsbVdBV0E7MkZEMEJhLHVCQUF1QjtrQkFObkMsU0FBUztzQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkJhc2VXaWRnZXRDb21wb25lbnQsIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2NoYXJ0LXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoYXJ0LXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZDaGFydFdpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmQ2hhcnRXaWRnZXRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG59XG4iLCI8YWpmLXdpZGdldC1leHBvcnQgKm5nSWY9XCJpbnN0YW5jZVwiXG4gICAgW3dpZGdldFR5cGVdPVwiaW5zdGFuY2Uud2lkZ2V0VHlwZVwiXG4gICAgW2RhdGFdPVwiaW5zdGFuY2UuZGF0YVwiXG4gICAgW2VuYWJsZV09XCJpbnN0YW5jZS5leHBvcnRhYmxlXCI+XG4gIDxhamYtY2hhcnRcbiAgICAgIFtjaGFydFR5cGVdPVwiaW5zdGFuY2UuY2hhcnRUeXBlXCJcbiAgICAgIFtvcHRpb25zXT1cImluc3RhbmNlLndpZGdldC5vcHRpb25zXCJcbiAgICAgIFtkYXRhXT1cImluc3RhbmNlLmRhdGFcIlxuICAgICAgW2luc3RhbmNlXT1cImluc3RhbmNlXCI+XG4gIDwvYWpmLWNoYXJ0PlxuPC9hamYtd2lkZ2V0LWV4cG9ydD5cbiJdfQ==