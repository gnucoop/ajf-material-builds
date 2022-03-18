import * as i1 from '@ajf/core/reports';
import { AjfBaseWidgetComponent, widgetToWidgetInstance, AjfWidgetType, AjfWidgetService as AjfWidgetService$1, AjfReportWidget as AjfReportWidget$1, AjfReportRenderer as AjfReportRenderer$1, AjfReportsModule as AjfReportsModule$1 } from '@ajf/core/reports';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Output, Injectable, NgModule } from '@angular/core';
import * as i2 from '@ajf/core/chart';
import { AjfChartModule } from '@ajf/core/chart';
import * as i2$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$2 from '@ajf/core/forms';
import { AjfFormRendererService } from '@ajf/core/forms';
import { evaluateExpression } from '@ajf/core/models';
import { filter, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import * as i1$1 from '@ajf/core/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import * as i3 from '@ajf/material/forms';
import { AjfFormsModule } from '@ajf/material/forms';
import * as i1$2 from '@ajf/core/text';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageType } from '@ajf/core/image';
import * as i1$3 from '@ajf/material/image';
import { AjfImageModule } from '@ajf/material/image';
import * as i3$1 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i1$4 from '@ajf/core/map';
import { AjfMapModule } from '@ajf/core/map';
import * as i1$5 from '@ajf/core/page-break';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { BehaviorSubject } from 'rxjs';
import * as i2$3 from '@ajf/core/table';
import { AjfTableModule } from '@ajf/core/table';
import * as i3$2 from '@ngneat/transloco';

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
AjfChartWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfChartWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfChartWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfChartWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n", styles: [""], components: [{ type: i1.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }, { type: i2.AjfChartComponent, selector: "ajf-chart", inputs: ["data", "options", "chartType", "instance"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfChartWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });

class AjfFilterWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _ts, _formRenderer) {
        super(cdr, el);
        this._ts = _ts;
        this._formRenderer = _formRenderer;
        this.filteredInstance = this._formRenderer.formGroup.pipe(filter(fg => this.instance != null && this.instance.filter != null && fg != null), switchMap(formGroup => formGroup.valueChanges), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), map(a => {
            const instance = this.instance;
            const filter = instance.filter;
            const newConst = Object.assign(Object.assign({}, (filter.context || {})), a);
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
AjfFilterWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFilterWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1$1.TranslocoService }, { token: i2$2.AjfFormRendererService }], target: i0.ɵɵFactoryTarget.Component });
AjfFilterWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFilterWidgetComponent, selector: "ajf-filter-widget", outputs: { filteredInstance: "filteredInstance" }, providers: [AjfFormRendererService], usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"instance\">\n  <div *ngIf=\"instance.filter as filter\" class=\"ajf-filter-container\">\n    <ajf-form\n      [form]=\"filter.form\"\n      [hasStartMessage]=\"false\"\n      [hasEndMessage]=\"false\"\n      [hideTopToolbar]=\"true\"\n      [hideBottomToolbar]=\"true\"\n      [hideNavigationButtons]=\"true\"\n    ></ajf-form>\n  </div>\n</ng-container>\n", styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}\n"], components: [{ type: i3.AjfFormRenderer, selector: "ajf-form", inputs: ["topBar"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFilterWidgetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-filter-widget', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [AjfFormRendererService], template: "<ng-container *ngIf=\"instance\">\n  <div *ngIf=\"instance.filter as filter\" class=\"ajf-filter-container\">\n    <ajf-form\n      [form]=\"filter.form\"\n      [hasStartMessage]=\"false\"\n      [hasEndMessage]=\"false\"\n      [hideTopToolbar]=\"true\"\n      [hideBottomToolbar]=\"true\"\n      [hideNavigationButtons]=\"true\"\n    ></ajf-form>\n  </div>\n</ng-container>\n", styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1$1.TranslocoService }, { type: i2$2.AjfFormRendererService }]; }, propDecorators: { filteredInstance: [{
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
AjfFormulaWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormulaWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFormulaWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFormulaWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.formula\"></ajf-text>\n", styles: [""], components: [{ type: i1$2.AjfTextComponent, selector: "ajf-text", inputs: ["htmlText"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormulaWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.formula\"></ajf-text>\n", styles: [""] }]
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
AjfImageContainerWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImageContainerWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfImageContainerWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfImageContainerWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n", styles: [".ajf-image-container img{max-width:none;max-height:none}\n"], components: [{ type: i1$3.AjfImage, selector: "ajf-image" }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3$1.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImageContainerWidgetComponent, decorators: [{
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
AjfImageWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImageWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfImageWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfImageWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-image *ngIf=\"instance\"\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n", styles: [""], components: [{ type: i1$3.AjfImage, selector: "ajf-image" }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImageWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-image *ngIf=\"instance\"\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n", styles: [""] }]
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
AjfMapWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfMapWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfMapWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfMapWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-map *ngIf=\"instance\"\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n", styles: [""], components: [{ type: i1$4.AjfMapComponent, selector: "ajf-map", inputs: ["coordinate", "tileLayer", "attribution", "disabled"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfMapWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-map *ngIf=\"instance\"\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n", styles: [""] }]
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
AjfPageBreakWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPageBreakWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPageBreakWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfPageBreakWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-page-break></ajf-page-break>\n", styles: [""], components: [{ type: i1$5.AjfPageBreakComponent, selector: "ajf-page-break" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPageBreakWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-page-break></ajf-page-break>\n", styles: [""] }]
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
AjfTableWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfTableWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfTableWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-widget-export *ngIf=\"instance\"\n  [widgetType]=\"instance.widgetType\"\n  [data]=\"instance.data\"\n  [enable]=\"instance.exportable\"\n>\n    <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n", styles: ["table{border-spacing:0}table td{padding:10px}\n"], components: [{ type: i1.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }, { type: i2$3.AjfTable, selector: "ajf-table", inputs: ["data", "cellpadding"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export *ngIf=\"instance\"\n  [widgetType]=\"instance.widgetType\"\n  [data]=\"instance.data\"\n  [enable]=\"instance.exportable\"\n>\n    <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n", styles: ["table{border-spacing:0}table td{padding:10px}\n"] }]
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
AjfTextWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTextWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfTextWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfTextWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.htmlText | transloco\"></ajf-text>\n", styles: [""], components: [{ type: i1$2.AjfTextComponent, selector: "ajf-text", inputs: ["htmlText"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "transloco": i3$2.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTextWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.htmlText | transloco\"></ajf-text>\n", styles: [""] }]
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
    return defaultWidgets;
};
class AjfWidgetService extends AjfWidgetService$1 {
    constructor() {
        super(defaultWidgetsFactory());
    }
}
AjfWidgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfWidgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
class AjfReportWidget extends AjfReportWidget$1 {
    constructor(cfr, renderer, widgetService) {
        super(cfr, renderer);
        this.widgetsMap = widgetService.componentsMap;
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Renderer2 }, { token: AjfWidgetService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportWidget.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReportWidget, selector: "ajf-widget", usesInheritance: true, ngImport: i0, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], components: [{ type: AjfFilterWidgetComponent, selector: "ajf-filter-widget", outputs: ["filteredInstance"] }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.AjfWidgetHost, selector: "[ajf-widget-host]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Renderer2 }, { type: AjfWidgetService }]; } });
class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfColumnWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfColumnWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfColumnWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfColumnWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{flex:1 1 auto}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfColumnWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{flex:1 1 auto}\n"] }]
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
AjfLayoutWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfLayoutWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfLayoutWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfLayoutWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], pipes: { "async": i2$1.AsyncPipe, "ajfGetColumnContent": i1.AjfGetColumnContentPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfLayoutWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"] }]
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
AjfReportRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportRenderer, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfReportRenderer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReportRenderer, selector: "ajf-report", usesInheritance: true, ngImport: i0, template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportRenderer, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"] }]
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
AjfReportsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfReportsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportsModule, declarations: [AjfChartWidgetComponent,
        AjfColumnWidgetComponent,
        AjfFilterWidgetComponent,
        AjfFormulaWidgetComponent,
        AjfImageContainerWidgetComponent,
        AjfImageWidgetComponent,
        AjfLayoutWidgetComponent,
        AjfMapWidgetComponent,
        AjfPageBreakWidgetComponent,
        AjfReportRenderer,
        AjfReportWidget,
        AjfTableWidgetComponent,
        AjfTextWidgetComponent], imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfFormsModule,
        CommonModule,
        AjfReportsModule$1,
        AjfTranslocoModule], exports: [AjfReportRenderer, AjfReportWidget] });
AjfReportsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportsModule, imports: [[
            AjfChartModule,
            AjfCommonModule,
            AjfImageModule,
            AjfMapModule,
            AjfPageBreakModule,
            AjfTableModule,
            AjfTextModule,
            AjfFormsModule,
            CommonModule,
            AjfReportsModule$1,
            AjfTranslocoModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AjfChartModule,
                        AjfCommonModule,
                        AjfImageModule,
                        AjfMapModule,
                        AjfPageBreakModule,
                        AjfTableModule,
                        AjfTextModule,
                        AjfFormsModule,
                        CommonModule,
                        AjfReportsModule$1,
                        AjfTranslocoModule,
                    ],
                    declarations: [
                        AjfChartWidgetComponent,
                        AjfColumnWidgetComponent,
                        AjfFilterWidgetComponent,
                        AjfFormulaWidgetComponent,
                        AjfImageContainerWidgetComponent,
                        AjfImageWidgetComponent,
                        AjfLayoutWidgetComponent,
                        AjfMapWidgetComponent,
                        AjfPageBreakWidgetComponent,
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

export { AjfChartWidgetComponent, AjfColumnWidgetComponent, AjfFilterWidgetComponent, AjfFormulaWidgetComponent, AjfImageContainerWidgetComponent, AjfImageWidgetComponent, AjfLayoutWidgetComponent, AjfMapWidgetComponent, AjfPageBreakWidgetComponent, AjfReportRenderer, AjfReportWidget, AjfReportsModule, AjfTableWidgetComponent, AjfTextWidgetComponent, AjfWidgetService };
//# sourceMappingURL=ajf-material-reports.mjs.map
