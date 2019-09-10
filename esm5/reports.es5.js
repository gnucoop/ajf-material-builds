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
import { __extends } from 'tslib';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ElementRef, ViewChild, ComponentFactoryResolver, Renderer2, NgModule } from '@angular/core';
import { AjfBaseWidgetComponent, AjfReportRenderer as AjfReportRenderer$1, AjfWidgetType, AjfWidgetHost, AjfReportWidget as AjfReportWidget$1, AjfReportsModule as AjfReportsModule$1 } from '@ajf/core/reports';
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
var AjfChartWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfChartWidgetComponent, _super);
    function AjfChartWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfChartWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-chart [chartType]=\"instance.chartType\" [options]=\"instance.widget.options\" [data]=\"instance.data\"></ajf-chart>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfChartWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfChartWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfColumnWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfColumnWidgetComponent, _super);
    function AjfColumnWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfColumnWidgetComponent.decorators = [
        { type: Component, args: [{template: "<div class=\"ajf-column-container\"><ng-container *ngFor=\"let w of instance.content\"><ajf-widget [instance]=\"w\"></ajf-widget></ng-container></div>",
                    styles: [".ajf-column-container{flex:1 1 auto}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfColumnWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfColumnWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormulaWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfFormulaWidgetComponent, _super);
    function AjfFormulaWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfFormulaWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-text [htmlText]=\"instance.formula\"></ajf-text>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfFormulaWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfFormulaWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfImageContainerWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfImageContainerWidgetComponent, _super);
    function AjfImageContainerWidgetComponent(cdr, el) {
        var _this = _super.call(this, cdr, el) || this;
        _this.imageTypes = AjfImageType;
        return _this;
    }
    AjfImageContainerWidgetComponent.decorators = [
        { type: Component, args: [{template: "<div class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\"><ng-template [ngSwitchCase]=\"imageTypes.Image\"><div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"icw\" [icon]=\"\" [flag]=\"\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Flag\"><div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"\" [icon]=\"\" [flag]=\"icw\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Icon\"><div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"\" [icon]=\"icw\" [flag]=\"\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template></div>",
                    styles: [".ajf-image-container img{max-width:none;max-height:none}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfImageContainerWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfImageContainerWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfImageWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfImageWidgetComponent, _super);
    function AjfImageWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfImageWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"instance.url\" [icon]=\"instance.icon\" [flag]=\"instance.flag\"></ajf-image>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfImageWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfImageWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfLayoutWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfLayoutWidgetComponent, _super);
    function AjfLayoutWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfLayoutWidgetComponent.decorators = [
        { type: Component, args: [{template: "<div class=\"ajf-columns\"><div *ngFor=\"let column of instance.widget.columns; let idx = index\" [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\" class=\"ajf-column\"><ajf-widget [instance]=\"instance|ajfGetColumnContent:idx\"></ajf-widget></div></div>",
                    styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfLayoutWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfLayoutWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfMapWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfMapWidgetComponent, _super);
    function AjfMapWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfMapWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-map [coordinate]=\"instance.coordinate\" [tileLayer]=\"instance.widget.tileLayer\" [attribution]=\"instance.widget.attribution\" [disabled]=\"instance.widget.disabled\"></ajf-map>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfMapWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfMapWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfPageBreakWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfPageBreakWidgetComponent, _super);
    function AjfPageBreakWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfPageBreakWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-page-break></ajf-page-break>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfPageBreakWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfPageBreakWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportRenderer = /** @class */ (function (_super) {
    __extends(AjfReportRenderer, _super);
    function AjfReportRenderer(cdr) {
        return _super.call(this, cdr) || this;
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
    AjfReportRenderer.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    return AjfReportRenderer;
}(AjfReportRenderer$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTableWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfTableWidgetComponent, _super);
    function AjfTableWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfTableWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-table [data]=\"instance.data\"></ajf-table>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfTableWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfTableWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfTextWidgetComponent = /** @class */ (function (_super) {
    __extends(AjfTextWidgetComponent, _super);
    function AjfTextWidgetComponent(cdr, el) {
        return _super.call(this, cdr, el) || this;
    }
    AjfTextWidgetComponent.decorators = [
        { type: Component, args: [{template: "<ajf-text [htmlText]=\"instance.htmlText | translate\"></ajf-text>",
                    styles: [""],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfTextWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    return AjfTextWidgetComponent;
}(AjfBaseWidgetComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportWidget = /** @class */ (function (_super) {
    __extends(AjfReportWidget, _super);
    function AjfReportWidget(cfr, renderer) {
        var _a;
        var _this = _super.call(this, cfr, renderer) || this;
        _this.widgetsMap = (_a = {},
            _a[AjfWidgetType.Layout] = { component: AjfLayoutWidgetComponent },
            _a[AjfWidgetType.PageBreak] = { component: AjfPageBreakWidgetComponent },
            _a[AjfWidgetType.Image] = { component: AjfImageWidgetComponent },
            _a[AjfWidgetType.Text] = { component: AjfTextWidgetComponent },
            _a[AjfWidgetType.Chart] = { component: AjfChartWidgetComponent },
            _a[AjfWidgetType.Table] = { component: AjfTableWidgetComponent },
            _a[AjfWidgetType.Map] = { component: AjfMapWidgetComponent },
            _a[AjfWidgetType.Column] = { component: AjfColumnWidgetComponent },
            _a[AjfWidgetType.Formula] = { component: AjfFormulaWidgetComponent },
            _a[AjfWidgetType.ImageContainer] = { component: AjfImageContainerWidgetComponent },
            _a);
        return _this;
    }
    AjfReportWidget.decorators = [
        { type: Component, args: [{selector: 'ajf-widget',
                    template: "<ng-template ajf-widget-host></ng-template>",
                    styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['instance'],
                    queries: {
                        widgetHost: new ViewChild(AjfWidgetHost, { static: true }),
                    },
                },] },
    ];
    /** @nocollapse */
    AjfReportWidget.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Renderer2 }
    ]; };
    return AjfReportWidget;
}(AjfReportWidget$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportsModule = /** @class */ (function () {
    function AjfReportsModule() {
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
    return AjfReportsModule;
}());

export { AjfChartWidgetComponent, AjfColumnWidgetComponent, AjfFormulaWidgetComponent, AjfImageContainerWidgetComponent, AjfImageWidgetComponent, AjfLayoutWidgetComponent, AjfMapWidgetComponent, AjfPageBreakWidgetComponent, AjfReportRenderer, AjfReportWidget, AjfReportsModule, AjfTableWidgetComponent, AjfTextWidgetComponent };
//# sourceMappingURL=reports.es5.js.map
