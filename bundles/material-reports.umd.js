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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ajf/core/reports'), require('@ajf/core/chart'), require('@ajf/core/common'), require('@ajf/core/map'), require('@ajf/core/page-break'), require('@ajf/core/table'), require('@ajf/core/text'), require('@ajf/material/image'), require('@angular/common'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/reports', ['exports', '@angular/core', '@ajf/core/reports', '@ajf/core/chart', '@ajf/core/common', '@ajf/core/map', '@ajf/core/page-break', '@ajf/core/table', '@ajf/core/text', '@ajf/material/image', '@angular/common', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.reports = {}), global.ng.core, global.ajf.core.reports, global.ajf.core.chart, global.ajf.core.common, global.ajf.core.map, global.ajf.core.pageBreak, global.ajf.core.table, global.ajf.core.text, global.ajf.material.image, global.ng.common, global.ngxt.core));
}(this, function (exports, core, reports, chart, common, map, pageBreak, table, text, image, common$1, core$1) { 'use strict';

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
    var AjfReportRenderer = /** @class */ (function (_super) {
        __extends(AjfReportRenderer, _super);
        function AjfReportRenderer(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfReportRenderer.decorators = [
            { type: core.Component, args: [{selector: 'ajf-report',
                        template: "<ng-template [ngIf]=\"reportInstance\"><div *ngIf=\"reportInstance.header\" @.disabled [applyStyles]=\"reportInstance.header.styles\" class=\"afj-report-header\"><ng-template ngFor let-widgetInstance [ngForOf]=\"reportInstance.header.content\"><ajf-report-widget *ngIf=\"widgetInstance.visible\" [widgetInstance]=\"widgetInstance\"></ajf-report-widget></ng-template></div><div *ngIf=\"reportInstance.content\" @.disabled [applyStyles]=\"reportInstance.content.styles\" class=\"ajf-report-content\"><ng-template ngFor let-widgetInstance [ngForOf]=\"reportInstance.content.content\"><ajf-report-widget *ngIf=\"widgetInstance.visible\" [widgetInstance]=\"widgetInstance\"></ajf-report-widget></ng-template></div><div *ngIf=\"reportInstance.footer\" @.disabled [applyStyles]=\"reportInstance.footer.styles\" class=\"ajf-report-footer\"><ng-template ngFor let-widgetInstance [ngForOf]=\"reportInstance.footer.content\"><ajf-report-widget *ngIf=\"widgetInstance.visible\" [widgetInstance]=\"widgetInstance\"></ajf-report-widget></ng-template></div></ng-template>",
                        styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: [
                            'reportInstance'
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
    var AjfWidgetRenderer = /** @class */ (function (_super) {
        __extends(AjfWidgetRenderer, _super);
        function AjfWidgetRenderer(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfWidgetRenderer.decorators = [
            { type: core.Component, args: [{selector: 'ajf-report-widget',
                        template: "<ng-template [ngIf]=\"widget != null && widgetInstance.visible\"><div class=\"ajf-report-widget-container\" [applyStyles]=\"widget!.styles\" [ngSwitch]=\"widget!.widgetType\"><ng-template [ngSwitchCase]=\"widgetTypes.Layout\"><div class=\"ajf-columns\"><div *ngFor=\"let column of layoutw.columns; let idx = index\" [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\" class=\"ajf-column\"><ajf-report-widget [widgetInstance]=\"layoutwInst|ajfGetColumnContent:idx\"></ajf-report-widget></div></div></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.PageBreak\"><ajf-page-break></ajf-page-break></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Image\"><ajf-image [type]=\"imgw.imageType\" [imageUrl]=\"imgwInst.url\" [icon]=\"imgwInst.icon\" [flag]=\"imgwInst.flag\"></ajf-image></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.ImageContainer\"><div class=\"ajf-columns\" [ngSwitch]=\"imgcw.imageType\"><ng-template [ngSwitchCase]=\"imageTypes.Image\"><div *ngFor=\"let icw of imgcwInst.urls; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"imgcw.imageType\" [imageUrl]=\"icw\" [icon]=\"\" [flag]=\"\" [applyStyles]=\"widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Flag\"><div *ngFor=\"let icw of imgcwInst.flags; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"imgcw.imageType\" [imageUrl]=\"\" [icon]=\"\" [flag]=\"icw\" [applyStyles]=\"widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Icon\"><div *ngFor=\"let icw of imgcwInst.icons; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"imgcw.imageType\" [imageUrl]=\"\" [icon]=\"icw\" [flag]=\"\" [applyStyles]=\"widget!.styles\"></ajf-image></div></ng-template></div></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Chart\"><ajf-chart [chartType]=\"chartwInst.chartType\" [options]=\"chartw.options\" [data]=\"chartwInst.data\"></ajf-chart></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Table\"><ajf-table [data]=\"tablewInst.data\"></ajf-table></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Text\"><ajf-text [htmlText]=\"textwInst.htmlText | translate\"></ajf-text></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Map\"><ajf-map [coordinate]=\"mapwInst.coordinate\" [tileLayer]=\"mapw.tileLayer\" [attribution]=\"mapw.attribution\" [disabled]=\"mapw!.disabled\"></ajf-map></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Column\"><div class=\"ajf-column-container\" *ngIf=\"widgetInstance.visible\"><ng-container *ngFor=\"let w of columnInst.content\"><ajf-report-widget [widgetInstance]=\"w\"></ajf-report-widget></ng-container></div></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Formula\"><ajf-text [htmlText]=\"formulawInst.formula\"></ajf-text></ng-template></div></ng-template>",
                        styles: ["ajf-report-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}ajf-report-widget .ajf-report-widget-container>.ajf-column-container{flex:1 1 auto}ajf-report-widget .ajf-report-widget-container>.ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container>.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        inputs: ['widgetInstance'],
                    },] },
        ];
        /** @nocollapse */
        AjfWidgetRenderer.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfWidgetRenderer;
    }(reports.AjfWidgetRenderer));

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
                            image.AjfImageModule,
                            map.AjfMapModule,
                            pageBreak.AjfPageBreakModule,
                            table.AjfTableModule,
                            text.AjfTextModule,
                        ],
                        declarations: [
                            AjfReportRenderer,
                            AjfWidgetRenderer,
                        ],
                        exports: [
                            AjfReportRenderer,
                            AjfWidgetRenderer,
                        ]
                    },] },
        ];
        return AjfReportsModule;
    }());

    exports.AjfReportRenderer = AjfReportRenderer;
    exports.AjfReportsModule = AjfReportsModule;
    exports.AjfWidgetRenderer = AjfWidgetRenderer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-reports.umd.js.map
