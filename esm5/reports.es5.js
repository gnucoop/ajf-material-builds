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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { AjfReportRenderer as AjfReportRenderer$1, AjfReportWidgetRenderer as AjfReportWidgetRenderer$1 } from '@ajf/core/reports';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AjfChartModule } from '@ajf/core/chart';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { AjfMapModule } from '@ajf/core/map';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportRenderer = /** @class */ (function (_super) {
    __extends(AjfReportRenderer, _super);
    function AjfReportRenderer(cdr) {
        return _super.call(this, cdr) || this;
    }
    AjfReportRenderer.decorators = [
        { type: Component, args: [{selector: 'ajf-report',
                    template: "<ng-template [ngIf]=\"reportInstance\"><div *ngIf=\"reportInstance.header\" @.disabled [applyStyles]=\"reportInstance.header.styles\" class=\"afj-report-header\"><ng-template ngFor let-widgetInstance [ngForOf]=\"reportInstance.header.content\"><ajf-report-widget *ngIf=\"widgetInstance.visible\" [widgetInstance]=\"widgetInstance\"></ajf-report-widget></ng-template></div><div *ngIf=\"reportInstance.content\" @.disabled [applyStyles]=\"reportInstance.content.styles\" class=\"ajf-report-content\"><ng-template ngFor let-widgetInstance [ngForOf]=\"reportInstance.content.content\"><ajf-report-widget *ngIf=\"widgetInstance.visible\" [widgetInstance]=\"widgetInstance\"></ajf-report-widget></ng-template></div><div *ngIf=\"reportInstance.footer\" @.disabled [applyStyles]=\"reportInstance.footer.styles\" class=\"ajf-report-footer\"><ng-template ngFor let-widgetInstance [ngForOf]=\"reportInstance.footer.content\"><ajf-report-widget *ngIf=\"widgetInstance.visible\" [widgetInstance]=\"widgetInstance\"></ajf-report-widget></ng-template></div></ng-template>",
                    styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: [
                        'reportInstance'
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportWidgetRenderer = /** @class */ (function (_super) {
    __extends(AjfReportWidgetRenderer, _super);
    function AjfReportWidgetRenderer(cdr) {
        return _super.call(this, cdr) || this;
    }
    AjfReportWidgetRenderer.decorators = [
        { type: Component, args: [{selector: 'ajf-report-widget',
                    template: "<ng-template [ngIf]=\"widget != null && widgetInstance.visible\"><div class=\"ajf-report-widget-container\" [applyStyles]=\"widget!.styles\" [ngSwitch]=\"widget!.widgetType\"><ng-template [ngSwitchCase]=\"widgetTypes.Layout\"><div class=\"ajf-columns\"><div *ngFor=\"let column of layoutw.columns; let idx = index\" [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\" class=\"ajf-column\"><ajf-report-widget [widgetInstance]=\"layoutwInst.getColumnContent(idx)\"></ajf-report-widget></div></div></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.PageBreak\"><ajf-page-break></ajf-page-break></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Image\"><ajf-image [type]=\"imgw.imageType\" [imageUrl]=\"imgwInst.url\" [icon]=\"imgwInst.icon\" [flag]=\"imgwInst.flag\"></ajf-image></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.ImageContainer\"><div class=\"ajf-columns\" [ngSwitch]=\"imgcw.imageType\"><ng-template [ngSwitchCase]=\"imageTypes.Image\"><div *ngFor=\"let icw of imgcwInst.urls; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"imgcw.imageType\" [imageUrl]=\"icw\" [icon]=\"\" [flag]=\"\" [applyStyles]=\"widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Flag\"><div *ngFor=\"let icw of imgcwInst.flags; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"imgcw.imageType\" [imageUrl]=\"\" [icon]=\"\" [flag]=\"icw\" [applyStyles]=\"widget!.styles\"></ajf-image></div></ng-template><ng-template [ngSwitchCase]=\"imageTypes.Icon\"><div *ngFor=\"let icw of imgcwInst.icons; let idx = index\" class=\"ajf-column\"><ajf-image [type]=\"imgcw.imageType\" [imageUrl]=\"\" [icon]=\"icw\" [flag]=\"\" [applyStyles]=\"widget!.styles\"></ajf-image></div></ng-template></div></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Chart\"><ajf-chart [chartType]=\"chartwInst.chartType\" [options]=\"chartw.options\" [data]=\"chartwInst.data\"></ajf-chart></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Table\"><ajf-table [data]=\"tablewInst.data\"></ajf-table></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Text\"><ajf-text [htmlText]=\"textwInst.htmlText | translate\"></ajf-text></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Map\"><ajf-map [coordinate]=\"mapwInst.coordinate\" [tileLayer]=\"mapw.tileLayer\" [attribution]=\"mapw.attribution\" [disabled]=\"mapw!.disabled\"></ajf-map></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Column\"><div class=\"ajf-column-container\" *ngIf=\"widgetInstance.visible\"><ng-container *ngFor=\"let w of widgetInstance.content\"><ajf-report-widget [widgetInstance]=\"w\"></ajf-report-widget></ng-container></div></ng-template><ng-template [ngSwitchCase]=\"widgetTypes.Formula\"><ajf-text [htmlText]=\"formulawInst.formula\"></ajf-text></ng-template></div></ng-template>",
                    styles: ["ajf-report-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}ajf-report-widget .ajf-report-widget-container>.ajf-column-container{flex:1 1 auto}ajf-report-widget .ajf-report-widget-container>.ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}ajf-report-widget .ajf-report-widget-container>.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: [
                        'widgetInstance'
                    ],
                },] },
    ];
    /** @nocollapse */
    AjfReportWidgetRenderer.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    return AjfReportWidgetRenderer;
}(AjfReportWidgetRenderer$1));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfReportsModule = /** @class */ (function () {
    function AjfReportsModule() {
    }
    AjfReportsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        TranslateModule,
                        AjfChartModule,
                        AjfCommonModule,
                        AjfImageModule,
                        AjfMapModule,
                        AjfPageBreakModule,
                        AjfTableModule,
                        AjfTextModule,
                    ],
                    declarations: [
                        AjfReportRenderer,
                        AjfReportWidgetRenderer,
                    ],
                    exports: [
                        AjfReportRenderer,
                        AjfReportWidgetRenderer,
                    ]
                },] },
    ];
    return AjfReportsModule;
}());

export { AjfReportRenderer, AjfReportWidgetRenderer, AjfReportsModule };
//# sourceMappingURL=reports.es5.js.map
