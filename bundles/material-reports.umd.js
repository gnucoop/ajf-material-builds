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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ajf/core/reports'), require('@ajf/core/image'), require('@ajf/core/chart'), require('@ajf/core/common'), require('@ajf/core/map'), require('@ajf/core/page-break'), require('@ajf/core/table'), require('@ajf/core/text'), require('@ajf/material/image'), require('@angular/common'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/reports', ['exports', '@angular/core', '@ajf/core/reports', '@ajf/core/image', '@ajf/core/chart', '@ajf/core/common', '@ajf/core/map', '@ajf/core/page-break', '@ajf/core/table', '@ajf/core/text', '@ajf/material/image', '@angular/common', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.reports = {}), global.ng.core, global.ajf.core.reports, global.ajf.core.image, global.ajf.core.chart, global.ajf.core.common, global.ajf.core.map, global.ajf.core.pageBreak, global.ajf.core.table, global.ajf.core.text, global.ajf.material.image, global.ng.common, global.ngxt.core));
}(this, function (exports, core, reports, image, chart, common, map, pageBreak, table, text, image$1, common$1, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfChartWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfChartWidgetComponent, _super);
        function AjfChartWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfChartWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-chart [chartType]=\"instance.chartType\" [options]=\"instance.widget.options\" [data]=\"instance.data\"></ajf-chart>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfChartWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfChartWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfColumnWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfColumnWidgetComponent, _super);
        function AjfColumnWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfColumnWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<div class=\"ajf-column-container\"><ng-container *ngFor=\"let w of instance.content\"><ajf-widget [instance]=\"w\"></ajf-widget></ng-container></div>",
                        styles: [".ajf-column-container{flex:1 1 auto}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfColumnWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfColumnWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormulaWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfFormulaWidgetComponent, _super);
        function AjfFormulaWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfFormulaWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-text [htmlText]=\"instance.formula\"></ajf-text>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfFormulaWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfFormulaWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfImageContainerWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfImageContainerWidgetComponent, _super);
        function AjfImageContainerWidgetComponent(cdr) {
            var _this = _super.call(this, cdr) || this;
            _this.imageTypes = image.AjfImageType;
            return _this;
        }
        AjfImageContainerWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<div class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\"><ng-template [ngSwitchCase]=\"imageTypes.Image\"><div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"icw\" [icon]=\"\" [flag]=\"\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Flag\"><div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"\" [icon]=\"\" [flag]=\"icw\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Icon\"><div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"\" [icon]=\"icw\" [flag]=\"\" [applyStyles]=\"instance.widget!.styles\"></ajf-image></div></ng-template></div>",
                        styles: [".ajf-image-container img{max-width:none;max-height:none}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfImageContainerWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfImageContainerWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfImageWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfImageWidgetComponent, _super);
        function AjfImageWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfImageWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-image [type]=\"instance.widget.imageType\" [imageUrl]=\"instance.url\" [icon]=\"instance.icon\" [flag]=\"instance.flag\"></ajf-image>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfImageWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfImageWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfLayoutWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfLayoutWidgetComponent, _super);
        function AjfLayoutWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfLayoutWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<div class=\"ajf-columns\"><div *ngFor=\"let column of instance.widget.columns; let idx = index\" [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\" class=\"ajf-column\"><ajf-widget [instance]=\"instance|ajfGetColumnContent:idx\"></ajf-widget></div></div>",
                        styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfLayoutWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfLayoutWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfMapWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfMapWidgetComponent, _super);
        function AjfMapWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfMapWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-map [coordinate]=\"instance.coordinate\" [tileLayer]=\"instance.widget.tileLayer\" [attribution]=\"instance.widget.attribution\" [disabled]=\"instance.widget.disabled\"></ajf-map>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfMapWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfMapWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfPageBreakWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfPageBreakWidgetComponent, _super);
        function AjfPageBreakWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfPageBreakWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-page-break></ajf-page-break>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfPageBreakWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfPageBreakWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
            { type: core.Component, args: [{selector: 'ajf-report',
                        template: "<ng-template [ngIf]=\"instance\"><div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"afj-report-header\"><ng-template ngFor let-instance [ngForOf]=\"instance.header.content\"><ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget></ng-template></div><div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\"><ng-template ngFor let-instance [ngForOf]=\"instance.content.content\"><ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget></ng-template></div><div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\"><ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\"><ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget></ng-template></div></ng-template>",
                        styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: [
                            'instance'
                        ],
                    },] },
        ];
        /** @nocollapse */
        AjfReportRenderer.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfReportRenderer;
    }(reports.AjfReportRenderer));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTableWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfTableWidgetComponent, _super);
        function AjfTableWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfTableWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-table [data]=\"instance.data\"></ajf-table>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfTableWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfTableWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTextWidgetComponent = /** @class */ (function (_super) {
        __extends(AjfTextWidgetComponent, _super);
        function AjfTextWidgetComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfTextWidgetComponent.decorators = [
            { type: core.Component, args: [{template: "<ajf-text [htmlText]=\"instance.htmlText | translate\"></ajf-text>",
                        styles: [""],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                    },] },
        ];
        /** @nocollapse */
        AjfTextWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfTextWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfReportWidget = /** @class */ (function (_super) {
        __extends(AjfReportWidget, _super);
        function AjfReportWidget(cfr) {
            var _a;
            var _this = _super.call(this, cfr) || this;
            _this.widgetsMap = (_a = {},
                _a[reports.AjfWidgetType.Layout] = { component: AjfLayoutWidgetComponent },
                _a[reports.AjfWidgetType.PageBreak] = { component: AjfPageBreakWidgetComponent },
                _a[reports.AjfWidgetType.Image] = { component: AjfImageWidgetComponent },
                _a[reports.AjfWidgetType.Text] = { component: AjfTextWidgetComponent },
                _a[reports.AjfWidgetType.Chart] = { component: AjfChartWidgetComponent },
                _a[reports.AjfWidgetType.Table] = { component: AjfTableWidgetComponent },
                _a[reports.AjfWidgetType.Map] = { component: AjfMapWidgetComponent },
                _a[reports.AjfWidgetType.Column] = { component: AjfColumnWidgetComponent },
                _a[reports.AjfWidgetType.Formula] = { component: AjfFormulaWidgetComponent },
                _a[reports.AjfWidgetType.ImageContainer] = { component: AjfImageContainerWidgetComponent },
                _a);
            return _this;
        }
        AjfReportWidget.decorators = [
            { type: core.Component, args: [{selector: 'ajf-widget',
                        template: "<ng-template [ngIf]=\"instance != null && instance.widget != null && instance.visible\"><div class=\"ajf-report-widget-container\" [applyStyles]=\"instance.widget.styles\"><ng-template ajf-widget-host></ng-template></div></ng-template>",
                        styles: ["ajf-report-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}ajf-report-widget .ajf-report-widget-container>.ajf-column-container{flex:1 1 auto}ajf-report-widget .ajf-report-widget-container>.ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container>.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: ['instance'],
                        queries: {
                            widgetHost: new core.ViewChild(reports.AjfWidgetHost, { static: false }),
                        },
                    },] },
        ];
        /** @nocollapse */
        AjfReportWidget.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver }
        ]; };
        return AjfReportWidget;
    }(reports.AjfReportWidget));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfReportsModule = /** @class */ (function () {
        function AjfReportsModule() {
        }
        AjfReportsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common$1.CommonModule,
                            core$1.TranslateModule,
                            reports.AjfReportsModule,
                            chart.AjfChartModule,
                            common.AjfCommonModule,
                            image$1.AjfImageModule,
                            map.AjfMapModule,
                            pageBreak.AjfPageBreakModule,
                            table.AjfTableModule,
                            text.AjfTextModule,
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

    exports.AjfChartWidgetComponent = AjfChartWidgetComponent;
    exports.AjfColumnWidgetComponent = AjfColumnWidgetComponent;
    exports.AjfFormulaWidgetComponent = AjfFormulaWidgetComponent;
    exports.AjfImageContainerWidgetComponent = AjfImageContainerWidgetComponent;
    exports.AjfImageWidgetComponent = AjfImageWidgetComponent;
    exports.AjfLayoutWidgetComponent = AjfLayoutWidgetComponent;
    exports.AjfMapWidgetComponent = AjfMapWidgetComponent;
    exports.AjfPageBreakWidgetComponent = AjfPageBreakWidgetComponent;
    exports.AjfReportRenderer = AjfReportRenderer;
    exports.AjfReportWidget = AjfReportWidget;
    exports.AjfReportsModule = AjfReportsModule;
    exports.AjfTableWidgetComponent = AjfTableWidgetComponent;
    exports.AjfTextWidgetComponent = AjfTextWidgetComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-reports.umd.js.map
