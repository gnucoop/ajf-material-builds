/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, NgModule } from '@angular/core';
import { AjfBaseWidgetComponent, AjfReportRenderer as AjfReportRenderer$1, AjfReportWidget as AjfReportWidget$1, AjfWidgetType, AjfWidgetHost, AjfReportsModule as AjfReportsModule$1 } from '@ajf/core/reports';
import { AjfImageType } from '@ajf/core/image';
import { AjfChartModule } from '@ajf/core/chart';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfMapModule } from '@ajf/core/map';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfChartWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfChartWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-chart [chartType]=\"instance.chartType\" [options]=\"instance.widget.options\" [data]=\"instance.data\"></ajf-chart>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfChartWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfColumnWidgetComponent.decorators = [
    { type: Component, args: [{template: "<div class=\"ajf-column-container\"><ng-container *ngFor=\"let w of instance.content\"><ajf-widget [instance]=\"w\"></ajf-widget></ng-container></div>",
                styles: [".ajf-column-container{flex:1 1 auto}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfColumnWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormulaWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfFormulaWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-text [htmlText]=\"instance.formula\"></ajf-text>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfFormulaWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
        this.imageTypes = AjfImageType;
    }
}
AjfImageContainerWidgetComponent.decorators = [
    { type: Component, args: [{template: "<div class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\"><ng-template [ngSwitchCase]=\"imageTypes.Image\"><div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"icw\" [icon]=\"\" [flag]=\"\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Flag\"><div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"\" [icon]=\"\" [flag]=\"icw\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Icon\"><div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"\" [icon]=\"icw\" [flag]=\"\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template></div>",
                styles: [".ajf-image-container img{max-width:none;max-height:none}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfImageContainerWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImageWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfImageWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"instance.url\" [icon]=\"instance.icon\" [flag]=\"instance.flag\"></ajf-image>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfImageWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfLayoutWidgetComponent.decorators = [
    { type: Component, args: [{template: "<div class=\"ajf-columns\"><div *ngFor=\"let column of instance.widget.columns; let idx = index\" [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\" class=\"ajf-column\"><ajf-widget [instance]=\"instance|ajfGetColumnContent:idx\"></ajf-widget></div></div>",
                styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfLayoutWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfMapWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfMapWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-map [coordinate]=\"instance.coordinate\" [tileLayer]=\"instance.widget.tileLayer\" [attribution]=\"instance.widget.attribution\" [disabled]=\"instance.widget.disabled\"></ajf-map>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfMapWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfPageBreakWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfPageBreakWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-page-break></ajf-page-break>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfPageBreakWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportRenderer extends AjfReportRenderer$1 {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfReportRenderer.decorators = [
    { type: Component, args: [{selector: 'ajf-report',
                template: "<ng-template [ngIf]=\"instance\"><div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"afj-report-header\"><ng-template ngFor let-instance [ngForOf]=\"instance.header.content\"><ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget></ng-template></div><div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\"><ng-template ngFor let-instance [ngForOf]=\"instance.content.content\"><ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget></ng-template></div><div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\"><ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\"><ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget></ng-template></div></ng-template>",
                styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: [
                    'instance'
                ],
            },] },
];
/** @nocollapse */
AjfReportRenderer.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTableWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfTableWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-table [data]=\"instance.data\"></ajf-table>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfTableWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfTextWidgetComponent extends AjfBaseWidgetComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
    }
}
AjfTextWidgetComponent.decorators = [
    { type: Component, args: [{template: "<ajf-text [htmlText]=\"instance.htmlText | translate\"></ajf-text>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfTextWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportWidget extends AjfReportWidget$1 {
    /**
     * @param {?} cfr
     */
    constructor(cfr) {
        super(cfr);
        this.widgetsMap = {
            [AjfWidgetType.Layout]: { component: AjfLayoutWidgetComponent },
            [AjfWidgetType.PageBreak]: { component: AjfPageBreakWidgetComponent },
            [AjfWidgetType.Image]: { component: AjfImageWidgetComponent },
            [AjfWidgetType.Text]: { component: AjfTextWidgetComponent },
            [AjfWidgetType.Chart]: { component: AjfChartWidgetComponent },
            [AjfWidgetType.Table]: { component: AjfTableWidgetComponent },
            [AjfWidgetType.Map]: { component: AjfMapWidgetComponent },
            [AjfWidgetType.Column]: { component: AjfColumnWidgetComponent },
            [AjfWidgetType.Formula]: { component: AjfFormulaWidgetComponent },
            [AjfWidgetType.ImageContainer]: { component: AjfImageContainerWidgetComponent },
        };
    }
}
AjfReportWidget.decorators = [
    { type: Component, args: [{selector: 'ajf-widget',
                template: "<ng-template [ngIf]=\"instance != null && instance.widget != null && instance.visible\"><div class=\"ajf-report-widget-container\" [applyStyles]=\"instance.widget.styles\"><ng-template ajf-widget-host></ng-template></div></ng-template>",
                styles: ["ajf-report-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}ajf-report-widget .ajf-report-widget-container>.ajf-column-container{flex:1 1 auto}ajf-report-widget .ajf-report-widget-container>.ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container>.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['instance'],
                queries: {
                    widgetHost: new ViewChild(AjfWidgetHost, { static: false }),
                },
            },] },
];
/** @nocollapse */
AjfReportWidget.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportsModule {
}
AjfReportsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule,
                    AjfReportsModule$1,
                    AjfChartModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfMapModule,
                    AjfPageBreakModule,
                    AjfTableModule,
                    AjfTextModule,
                ],
                declarations: [
                    AjfChartWidgetComponent,
                    AjfColumnWidgetComponent,
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
                exports: [
                    AjfReportRenderer,
                    AjfReportWidget,
                ],
                entryComponents: [
                    AjfChartWidgetComponent,
                    AjfColumnWidgetComponent,
                    AjfFormulaWidgetComponent,
                    AjfImageContainerWidgetComponent,
                    AjfImageWidgetComponent,
                    AjfLayoutWidgetComponent,
                    AjfMapWidgetComponent,
                    AjfPageBreakWidgetComponent,
                    AjfTableWidgetComponent,
                    AjfTextWidgetComponent,
                ],
            },] },
];

export { AjfChartWidgetComponent, AjfColumnWidgetComponent, AjfFormulaWidgetComponent, AjfImageContainerWidgetComponent, AjfImageWidgetComponent, AjfLayoutWidgetComponent, AjfMapWidgetComponent, AjfPageBreakWidgetComponent, AjfReportRenderer, AjfReportWidget, AjfReportsModule, AjfTableWidgetComponent, AjfTextWidgetComponent };
//# sourceMappingURL=reports.js.map
