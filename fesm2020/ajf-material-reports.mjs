import * as i2 from '@ajf/core/reports';
import { AjfBaseWidgetComponent, widgetToWidgetInstance, AjfWidgetType, AjfWidgetService as AjfWidgetService$1, AjfReportWidget as AjfReportWidget$1, AjfReportRenderer as AjfReportRenderer$1, AjfReportsModule as AjfReportsModule$1 } from '@ajf/core/reports';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Output, Injectable, TemplateRef, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@ajf/core/chart';
import { AjfChartModule } from '@ajf/core/chart';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@ajf/core/forms';
import { AjfFormRendererService } from '@ajf/core/forms';
import { evaluateExpression } from '@ajf/core/models';
import { filter, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import * as i1$2 from '@ajf/core/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import * as i3 from '@ajf/material/forms';
import { AjfFormsModule } from '@ajf/material/forms';
import * as i1$3 from '@ajf/core/text';
import { AjfTextModule } from '@ajf/core/text';
import * as i1$4 from '@ajf/core/heat-map';
import { AjfHeatMapModule } from '@ajf/core/heat-map';
import { AjfImageType } from '@ajf/core/image';
import * as i1$5 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i2$2 from '@ajf/material/image';
import { AjfImageModule } from '@ajf/material/image';
import * as i1$6 from '@ajf/core/map';
import { AjfMapModule } from '@ajf/core/map';
import * as i1$7 from '@ajf/core/page-break';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { BehaviorSubject } from 'rxjs';
import * as i1$8 from '@ajf/core/graph';
import { AjfGraphModule } from '@ajf/core/graph';
import * as i1$9 from '@ajf/core/table';
import { AjfTableModule } from '@ajf/core/table';
import * as i3$1 from '@ngneat/transloco';
import * as i4 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i6 from '@angular/material/form-field';
import * as i7 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i8 from '@angular/material/core';

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
class AjfChartWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfChartWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfChartWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfChartWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfChartWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n", styles: [""], dependencies: [{ kind: "component", type: i1.AjfChartComponent, selector: "ajf-chart", inputs: ["data", "options", "chartType", "instance"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfChartWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfFilterWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _ts, _formRenderer) {
        super(cdr, el);
        this._ts = _ts;
        this._formRenderer = _formRenderer;
        this.filteredInstance = this._formRenderer.formGroup.pipe(filter(fg => this.instance != null && this.instance.filter != null && fg != null), switchMap(formGroup => formGroup.valueChanges), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), map(a => {
            const instance = this.instance;
            const filter = instance.filter;
            const newConst = { ...(filter.context || {}), ...a };
            if (filter.variables != null) {
                (filter.variables || []).forEach(variable => {
                    newConst[variable.name] = evaluateExpression(variable.formula.formula, newConst);
                });
            }
            this.instance = widgetToWidgetInstance(instance.widget, newConst, this._ts, filter.variables);
            return this.instance;
        }));
    }
}
AjfFilterWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFilterWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1$2.TranslocoService }, { token: i2$1.AjfFormRendererService }], target: i0.ɵɵFactoryTarget.Component });
AjfFilterWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfFilterWidgetComponent, selector: "ajf-filter-widget", outputs: { filteredInstance: "filteredInstance" }, providers: [AjfFormRendererService], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"instance\">\n  <div *ngIf=\"instance.filter as filter\" class=\"ajf-filter-container\">\n    <ajf-form\n      [form]=\"filter.form\"\n      [hasStartMessage]=\"false\"\n      [hasEndMessage]=\"false\"\n      [hideTopToolbar]=\"true\"\n      [hideBottomToolbar]=\"true\"\n      [hideNavigationButtons]=\"true\"\n    ></ajf-form>\n  </div>\n</ng-container>\n", styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-mdc-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}\n"], dependencies: [{ kind: "component", type: i3.AjfFormRenderer, selector: "ajf-form", inputs: ["topBar", "centeredFieldsContent", "maxColumns"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFilterWidgetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-filter-widget', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [AjfFormRendererService], template: "<ng-container *ngIf=\"instance\">\n  <div *ngIf=\"instance.filter as filter\" class=\"ajf-filter-container\">\n    <ajf-form\n      [form]=\"filter.form\"\n      [hasStartMessage]=\"false\"\n      [hasEndMessage]=\"false\"\n      [hideTopToolbar]=\"true\"\n      [hideBottomToolbar]=\"true\"\n      [hideNavigationButtons]=\"true\"\n    ></ajf-form>\n  </div>\n</ng-container>\n", styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-mdc-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1$2.TranslocoService }, { type: i2$1.AjfFormRendererService }]; }, propDecorators: { filteredInstance: [{
                type: Output
            }] } });

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
class AjfFormulaWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfFormulaWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormulaWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFormulaWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfFormulaWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.formula\"></ajf-text>\n", styles: [""], dependencies: [{ kind: "component", type: i1$3.AjfTextComponent, selector: "ajf-text", inputs: ["htmlText"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormulaWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.formula\"></ajf-text>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfHeatMapWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfHeatMapWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMapWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfHeatMapWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfHeatMapWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-heat-map\n  *ngIf=\"instance\"\n  [idProp]=\"instance.idProp\"\n  [features]=\"instance.features\"\n  [values]=\"instance.values\"\n  [startColor]=\"instance.startColor\"\n  [endColor]=\"instance.endColor\"\n  [highlightColor]=\"instance.highlightColor\"\n  [showVisualMap]=\"instance.showVisualMap\"\n  [action]=\"instance.action\"\n></ajf-heat-map>\n", styles: ["ajf-widget ajf-heat-map{flex:1;height:100%}\n"], dependencies: [{ kind: "component", type: i1$4.AjfHeatMap, selector: "ajf-heat-map", inputs: ["features", "startColor", "endColor", "highlightColor", "values", "action", "idProp", "showVisualMap"], outputs: ["featureSelected"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfHeatMapWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-heat-map\n  *ngIf=\"instance\"\n  [idProp]=\"instance.idProp\"\n  [features]=\"instance.features\"\n  [values]=\"instance.values\"\n  [startColor]=\"instance.startColor\"\n  [endColor]=\"instance.endColor\"\n  [highlightColor]=\"instance.highlightColor\"\n  [showVisualMap]=\"instance.showVisualMap\"\n  [action]=\"instance.action\"\n></ajf-heat-map>\n", styles: ["ajf-widget ajf-heat-map{flex:1;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this.imageTypes = AjfImageType;
    }
}
AjfImageContainerWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfImageContainerWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfImageContainerWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfImageContainerWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n", styles: [".ajf-image-container img{max-width:none;max-height:none}\n"], dependencies: [{ kind: "directive", type: i1$5.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { kind: "component", type: i2$2.AjfImage, selector: "ajf-image" }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfImageContainerWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n", styles: [".ajf-image-container img{max-width:none;max-height:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfImageWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfImageWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfImageWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfImageWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfImageWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-image *ngIf=\"instance\"\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n", styles: [""], dependencies: [{ kind: "component", type: i2$2.AjfImage, selector: "ajf-image" }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfImageWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-image *ngIf=\"instance\"\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfMapWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfMapWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMapWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfMapWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfMapWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-map *ngIf=\"instance\"\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n", styles: [""], dependencies: [{ kind: "component", type: i1$6.AjfMapComponent, selector: "ajf-map", inputs: ["coordinate", "tileLayer", "attribution", "disabled"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfMapWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-map *ngIf=\"instance\"\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfPageBreakWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfPageBreakWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPageBreakWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPageBreakWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfPageBreakWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-page-break></ajf-page-break>\n", styles: [""], dependencies: [{ kind: "component", type: i1$7.AjfPageBreakComponent, selector: "ajf-page-break" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPageBreakWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-page-break></ajf-page-break>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfGraphWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfGraphWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGraphWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfGraphWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfGraphWidgetComponent, selector: "ajf-graph-widget", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-graph-container\">\n  <ajf-graph [nodes]=\"instance.nodes\"></ajf-graph>\n</div>\n", styles: ["ajf-graph-widget{width:100%;height:600px}\n"], dependencies: [{ kind: "component", type: i1$8.AjfGraphComponent, selector: "ajf-graph", inputs: ["nodes"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfGraphWidgetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-graph-widget', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-graph-container\">\n  <ajf-graph [nodes]=\"instance.nodes\"></ajf-graph>\n</div>\n", styles: ["ajf-graph-widget{width:100%;height:600px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfTableWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfTableWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTableWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfTableWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfTableWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-widget-export\n  *ngIf=\"instance\"\n  [widgetType]=\"instance.widgetType\"\n  [data]=\"instance.data\"\n  [enable]=\"instance.exportable\"\n>\n  <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n", styles: ["table{border-spacing:0}table tr th,table tr td{padding:10px}table tr td .read_more_cell{cursor:pointer;margin:0;white-space:nowrap;display:inline-block}table tr td .read_more_text{padding-right:5px;margin:0;display:inline-block;white-space:nowrap}table tr td .material-icons{vertical-align:middle;cursor:pointer}\n"], dependencies: [{ kind: "component", type: i1$9.AjfTable, selector: "ajf-table", inputs: ["data", "cellpadding"], outputs: ["sortSelected"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTableWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export\n  *ngIf=\"instance\"\n  [widgetType]=\"instance.widgetType\"\n  [data]=\"instance.data\"\n  [enable]=\"instance.exportable\"\n>\n  <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n", styles: ["table{border-spacing:0}table tr th,table tr td{padding:10px}table tr td .read_more_cell{cursor:pointer;margin:0;white-space:nowrap;display:inline-block}table tr td .read_more_text{padding-right:5px;margin:0;display:inline-block;white-space:nowrap}table tr td .material-icons{vertical-align:middle;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfTextWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfTextWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTextWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfTextWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfTextWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.htmlText | transloco\"></ajf-text>\n", styles: [""], dependencies: [{ kind: "component", type: i1$3.AjfTextComponent, selector: "ajf-text", inputs: ["htmlText"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTextWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.htmlText | transloco\"></ajf-text>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
const defaultWidgetsFactory = () => {
    const defaultWidgets = {};
    defaultWidgets[AjfWidgetType.Layout] = { component: AjfLayoutWidgetComponent };
    defaultWidgets[AjfWidgetType.PageBreak] = { component: AjfPageBreakWidgetComponent };
    defaultWidgets[AjfWidgetType.Image] = { component: AjfImageWidgetComponent };
    defaultWidgets[AjfWidgetType.Text] = { component: AjfTextWidgetComponent };
    defaultWidgets[AjfWidgetType.Chart] = { component: AjfChartWidgetComponent };
    defaultWidgets[AjfWidgetType.Table] = { component: AjfTableWidgetComponent };
    defaultWidgets[AjfWidgetType.DynamicTable] = { component: AjfTableWidgetComponent };
    defaultWidgets[AjfWidgetType.Map] = { component: AjfMapWidgetComponent };
    defaultWidgets[AjfWidgetType.Column] = { component: AjfColumnWidgetComponent };
    defaultWidgets[AjfWidgetType.Formula] = { component: AjfFormulaWidgetComponent };
    defaultWidgets[AjfWidgetType.ImageContainer] = { component: AjfImageContainerWidgetComponent };
    defaultWidgets[AjfWidgetType.Graph] = { component: AjfGraphWidgetComponent };
    defaultWidgets[AjfWidgetType.PaginatedList] = { component: AjfPaginatedListWidgetComponent };
    defaultWidgets[AjfWidgetType.PaginatedTable] = { component: AjfPaginatedTableWidgetComponent };
    defaultWidgets[AjfWidgetType.Dialog] = { component: AjfDialogWidgetComponent };
    defaultWidgets[AjfWidgetType.HeatMap] = { component: AjfHeatMapWidgetComponent };
    return defaultWidgets;
};
class AjfWidgetService extends AjfWidgetService$1 {
    constructor() {
        super(defaultWidgetsFactory());
    }
}
AjfWidgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfWidgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
class AjfReportWidget extends AjfReportWidget$1 {
    constructor(renderer, widgetService) {
        super(renderer);
        this.widgetsMap = widgetService.componentsMap;
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.Renderer2 }, { token: AjfWidgetService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportWidget.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfReportWidget, selector: "ajf-widget", usesInheritance: true, ngImport: i0, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], dependencies: [{ kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.AjfWidgetHost, selector: "[ajf-widget-host]" }, { kind: "component", type: AjfFilterWidgetComponent, selector: "ajf-filter-widget", outputs: ["filteredInstance"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: AjfWidgetService }]; } });
class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfColumnWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfColumnWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfColumnWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfColumnWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{width:100%}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfColumnWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this._allcolumnsRendered$ = new BehaviorSubject(false);
        this.allcolumnsRendered$ = this
            ._allcolumnsRendered$;
    }
    ngAfterContentChecked() {
        this._allcolumnsRendered$.next(true);
    }
}
AjfLayoutWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfLayoutWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfLayoutWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfLayoutWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }, { kind: "pipe", type: i1$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.AjfGetColumnContentPipe, name: "ajfGetColumnContent" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfLayoutWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
class AjfDialogWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _dialog) {
        super(cdr, el);
        this._dialog = _dialog;
    }
    openDialog() {
        this._dialog.open(this.dialogContent);
    }
}
AjfDialogWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDialogWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i4.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfDialogWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfDialogWidgetComponent, selector: "ng-component", viewQueries: [{ propertyName: "dialogContent", first: true, predicate: ["dialogContent"], descendants: true, read: TemplateRef }], usesInheritance: true, ngImport: i0, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDialogWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i4.MatDialog }]; }, propDecorators: { dialogContent: [{
                type: ViewChild,
                args: ['dialogContent', { read: TemplateRef }]
            }] } });
class AjfPaginatedListWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this._currentPage = 0;
        this._pages = 0;
        this._currentContent = [];
        this._canGoForward = false;
        this._canGoBackward = false;
    }
    get currentPage() {
        return this._currentPage;
    }
    get pages() {
        return this._pages;
    }
    get currentContent() {
        return this._currentContent;
    }
    get canGoForward() {
        return this._canGoForward;
    }
    get canGoBackward() {
        return this._canGoBackward;
    }
    ngOnChanges(changes) {
        if (changes['instance']) {
            this._updateCurrentContent();
        }
    }
    ngOnInit() {
        this._updateCurrentContent();
    }
    goToPage(direction) {
        const diff = direction === 'next' ? 1 : -1;
        const newPage = this._currentPage + diff;
        if (newPage <= 0 || newPage > this._pages) {
            return;
        }
        this._currentPage = newPage;
        this._canGoForward = newPage < this._pages;
        this._canGoBackward = newPage > 1;
        this._fillCurrentContent();
    }
    _updateCurrentContent() {
        this._canGoBackward = false;
        if (this.instance == null || this.instance.content.length === 0) {
            this._currentPage = 0;
            this._pages = 0;
        }
        else {
            this._currentPage = 1;
            const { content } = this.instance;
            const { pageSize } = this.instance.widget;
            this._pages = Math.ceil(content.length / pageSize);
            this._canGoForward = this._pages > 1;
        }
        this._fillCurrentContent();
    }
    _fillCurrentContent() {
        if (this.instance == null || this.instance.content.length === 0) {
            this._currentContent = [];
            return;
        }
        const { content } = this.instance;
        const { pageSize } = this.instance.widget;
        const start = (this._currentPage - 1) * pageSize;
        this._currentContent = content.slice(start, start + pageSize);
        this._cdr.markForCheck();
    }
}
AjfPaginatedListWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedListWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPaginatedListWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfPaginatedListWidgetComponent, selector: "ng-component", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"], dependencies: [{ kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedListWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
class AjfPaginatedTableWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this.paginatorConfig = {
            pageSize: 10,
            pageSizeOptions: [5, 10, 15, 20, 25, 30, 50, 100, 500],
        };
        this._currentPage = 0;
        this._pages = 0;
        this._orderBy = 0;
        this._currentContent = [];
        /**
         * full data table
         */
        this._allDataContent = [];
        /**
         * full sorted data table
         */
        this._sortedAllDataContent = [];
        this._headerContent = [];
        this._canGoForward = false;
        this._canGoBackward = false;
    }
    get currentPage() {
        return this._currentPage;
    }
    get pages() {
        return this._pages;
    }
    get orderBy() {
        return this._orderBy;
    }
    get currentContent() {
        return this._currentContent;
    }
    get headerContent() {
        return this._headerContent;
    }
    get canGoForward() {
        return this._canGoForward;
    }
    get canGoBackward() {
        return this._canGoBackward;
    }
    /**
     * Set initial data for the table on instance changes
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes['instance']) {
            if (this.instance != null &&
                this.instance.widget.pageSize &&
                this.instance.widget.pageSize > 0) {
                this.paginatorConfig.pageSize = this.instance.widget.pageSize;
            }
            this._updateCurrentContent();
        }
    }
    ngOnInit() {
        if (this.instance != null &&
            this.instance.widget.pageSize &&
            this.instance.widget.pageSize > 0) {
            this.paginatorConfig.pageSize = this.instance.widget.pageSize;
        }
        this._updateCurrentContent();
    }
    /**
     * Got to next or previous page
     * @param direction
     * @returns
     */
    goToPage(direction) {
        const diff = direction === 'next' ? 1 : -1;
        const newPage = this._currentPage + diff;
        if (newPage <= 0 || newPage > this._pages) {
            return;
        }
        this._currentPage = newPage;
        this._canGoForward = newPage < this._pages;
        this._canGoBackward = newPage > 1;
        this._fillCurrentContent();
    }
    onPageSizeChange(_pageSize) {
        this.paginatorConfig.pageSize = _pageSize;
        this._updateCurrentContent();
    }
    /**
     * Sort all data for the table, not only current page data
     * @param sort
     * @returns
     */
    sortPaginatedData(sort) {
        if (this._allDataContent.length > 1) {
            if (!sort.active || sort.direction === '') {
                this._sortedAllDataContent = this._allDataContent.slice();
            }
            else {
                this._currentPage = 1;
                this._canGoForward = this._currentPage < this._pages;
                this._canGoBackward = false;
                const columnIdx = parseInt(sort.active.slice(-1)) || 0;
                this._sortedAllDataContent = this._allDataContent.slice().sort((a, b) => {
                    const isAsc = sort.direction === 'asc';
                    return this._compare(a[columnIdx], b[columnIdx], isAsc);
                });
            }
            this._fillCurrentContent();
        }
    }
    _compare(a, b, isAsc) {
        return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
    }
    /**
     * Set current header and data for the table, starting from page 1
     */
    _updateCurrentContent() {
        this._canGoBackward = false;
        if (this.instance == null || this.instance.data.length === 0) {
            this._currentPage = 0;
            this._pages = 0;
            this._headerContent = [];
            this._currentContent = [];
            this._allDataContent = [];
            this._sortedAllDataContent = [];
        }
        else {
            this._headerContent = this.instance.data[0];
            this._allDataContent = this.instance.data.slice(1);
            this._sortedAllDataContent = [...this._allDataContent];
            this._currentPage = 1;
            this._pages = Math.ceil(this._allDataContent.length / this.paginatorConfig.pageSize);
            this._canGoForward = this._pages > 1;
        }
        this._fillCurrentContent();
    }
    /**
     * Update current data for the table, using page and sorted data
     */
    _fillCurrentContent() {
        if (this._sortedAllDataContent.length === 0 && this._headerContent.length > 0) {
            this._currentContent = [this._headerContent];
        }
        else {
            const start = (this._currentPage - 1) * this.paginatorConfig.pageSize;
            this._currentContent = [
                this._headerContent,
                ...this._sortedAllDataContent.slice(start, start + this.paginatorConfig.pageSize),
            ];
        }
        this._cdr.markForCheck();
    }
}
AjfPaginatedTableWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedTableWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPaginatedTableWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfPaginatedTableWidgetComponent, selector: "ng-component", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"currentContent\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"], dependencies: [{ kind: "component", type: i1$9.AjfTable, selector: "ajf-table", inputs: ["data", "cellpadding"], outputs: ["sortSelected"] }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "component", type: i7.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i8.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "pipe", type: i3$1.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedTableWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"currentContent\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

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
class AjfReportRenderer extends AjfReportRenderer$1 {
    constructor(cdr) {
        super(cdr);
    }
}
AjfReportRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportRenderer, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfReportRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfReportRenderer, selector: "ajf-report", usesInheritance: true, ngImport: i0, template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;inset:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"], dependencies: [{ kind: "directive", type: i1$5.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;inset:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });

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
class AjfReportsModule {
}
AjfReportsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, declarations: [AjfChartWidgetComponent,
        AjfColumnWidgetComponent,
        AjfDialogWidgetComponent,
        AjfFilterWidgetComponent,
        AjfFormulaWidgetComponent,
        AjfHeatMapWidgetComponent,
        AjfImageContainerWidgetComponent,
        AjfImageWidgetComponent,
        AjfGraphWidgetComponent,
        AjfLayoutWidgetComponent,
        AjfMapWidgetComponent,
        AjfPageBreakWidgetComponent,
        AjfPaginatedListWidgetComponent,
        AjfPaginatedTableWidgetComponent,
        AjfReportRenderer,
        AjfReportWidget,
        AjfTableWidgetComponent,
        AjfTextWidgetComponent], imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfFormsModule,
        AjfGraphModule,
        AjfHeatMapModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfTranslocoModule,
        CommonModule,
        AjfReportsModule$1,
        MatDialogModule,
        MatSelectModule], exports: [AjfReportRenderer, AjfReportWidget] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfFormsModule,
        AjfGraphModule,
        AjfHeatMapModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfTranslocoModule,
        CommonModule,
        AjfReportsModule$1,
        MatDialogModule,
        MatSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfChartModule,
                        AjfCommonModule,
                        AjfImageModule,
                        AjfFormsModule,
                        AjfGraphModule,
                        AjfHeatMapModule,
                        AjfMapModule,
                        AjfPageBreakModule,
                        AjfTableModule,
                        AjfTextModule,
                        AjfTranslocoModule,
                        CommonModule,
                        AjfReportsModule$1,
                        MatDialogModule,
                        MatSelectModule,
                    ],
                    declarations: [
                        AjfChartWidgetComponent,
                        AjfColumnWidgetComponent,
                        AjfDialogWidgetComponent,
                        AjfFilterWidgetComponent,
                        AjfFormulaWidgetComponent,
                        AjfHeatMapWidgetComponent,
                        AjfImageContainerWidgetComponent,
                        AjfImageWidgetComponent,
                        AjfGraphWidgetComponent,
                        AjfLayoutWidgetComponent,
                        AjfMapWidgetComponent,
                        AjfPageBreakWidgetComponent,
                        AjfPaginatedListWidgetComponent,
                        AjfPaginatedTableWidgetComponent,
                        AjfReportRenderer,
                        AjfReportWidget,
                        AjfTableWidgetComponent,
                        AjfTextWidgetComponent,
                    ],
                    exports: [AjfReportRenderer, AjfReportWidget],
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfChartWidgetComponent, AjfColumnWidgetComponent, AjfDialogWidgetComponent, AjfFilterWidgetComponent, AjfFormulaWidgetComponent, AjfHeatMapWidgetComponent, AjfImageContainerWidgetComponent, AjfImageWidgetComponent, AjfLayoutWidgetComponent, AjfMapWidgetComponent, AjfPageBreakWidgetComponent, AjfPaginatedListWidgetComponent, AjfPaginatedTableWidgetComponent, AjfReportRenderer, AjfReportWidget, AjfReportsModule, AjfTableWidgetComponent, AjfTextWidgetComponent, AjfWidgetService };
//# sourceMappingURL=ajf-material-reports.mjs.map
