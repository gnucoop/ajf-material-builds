(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/core'), require('@ajf/core/reports'), require('@ajf/core/image'), require('@ajf/core/chart'), require('@ajf/core/common'), require('@ajf/core/map'), require('@ajf/core/page-break'), require('@ajf/core/table'), require('@ajf/core/text'), require('@ajf/material/image'), require('@angular/common'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/reports', ['exports', 'tslib', '@angular/core', '@ajf/core/reports', '@ajf/core/image', '@ajf/core/chart', '@ajf/core/common', '@ajf/core/map', '@ajf/core/page-break', '@ajf/core/table', '@ajf/core/text', '@ajf/material/image', '@angular/common', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.reports = {}), global.tslib, global.ng.core, global.ng.core.reports, global.ng.core.image, global.ng.core.chart, global.ng.core.common, global.ng.core.map, global.ng.core.pageBreak, global.ng.core.table, global.ng.core.text, global.ng.material.image, global.ng.common, global.ngxTranslate.core));
}(this, (function (exports, tslib, core, reports, image, chart, common, map, pageBreak, table, text, image$1, common$1, core$1) { 'use strict';

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
    var AjfChartWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfChartWidgetComponent, _super);
        function AjfChartWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfChartWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-chart\n    [chartType]=\"instance.chartType\"\n    [options]=\"instance.widget.options\"\n    [data]=\"instance.data\"\n></ajf-chart>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfChartWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfChartWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfColumnWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfColumnWidgetComponent, _super);
        function AjfColumnWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfColumnWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".ajf-column-container{flex:1 1 auto}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfColumnWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfColumnWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfFormulaWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfFormulaWidgetComponent, _super);
        function AjfFormulaWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfFormulaWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-text [htmlText]=\"instance.formula\"></ajf-text>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfFormulaWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfFormulaWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfImageContainerWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfImageContainerWidgetComponent, _super);
        function AjfImageContainerWidgetComponent(cdr, el) {
            var _this = _super.call(this, cdr, el) || this;
            _this.imageTypes = image.AjfImageType;
            return _this;
        }
        AjfImageContainerWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".ajf-image-container img{max-width:none;max-height:none}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfImageContainerWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfImageContainerWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfImageWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfImageWidgetComponent, _super);
        function AjfImageWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfImageWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-image\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfImageWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfImageWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfLayoutWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfLayoutWidgetComponent, _super);
        function AjfLayoutWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfLayoutWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<div class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </div>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfLayoutWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfLayoutWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfMapWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfMapWidgetComponent, _super);
        function AjfMapWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfMapWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-map\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfMapWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfMapWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfPageBreakWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfPageBreakWidgetComponent, _super);
        function AjfPageBreakWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfPageBreakWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-page-break></ajf-page-break>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfPageBreakWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfPageBreakWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfReportRenderer = /** @class */ (function (_super) {
        tslib.__extends(AjfReportRenderer, _super);
        function AjfReportRenderer(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfReportRenderer.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-report',
                        template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportRenderer.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfReportRenderer;
    }(reports.AjfReportRenderer));

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
    var AjfTableWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfTableWidgetComponent, _super);
        function AjfTableWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfTableWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-table [data]=\"instance.data\"></ajf-table>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfTableWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfTableWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfTextWidgetComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfTextWidgetComponent, _super);
        function AjfTextWidgetComponent(cdr, el) {
            return _super.call(this, cdr, el) || this;
        }
        AjfTextWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<ajf-text [htmlText]=\"instance.htmlText | translate\"></ajf-text>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfTextWidgetComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef }
        ]; };
        return AjfTextWidgetComponent;
    }(reports.AjfBaseWidgetComponent));

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
    var AjfReportWidget = /** @class */ (function (_super) {
        tslib.__extends(AjfReportWidget, _super);
        function AjfReportWidget(cfr, renderer) {
            var _a;
            var _this = _super.call(this, cfr, renderer) || this;
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
            { type: core.Component, args: [{
                        selector: 'ajf-widget',
                        template: "<ng-template ajf-widget-host></ng-template>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfReportWidget.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.Renderer2 }
        ]; };
        return AjfReportWidget;
    }(reports.AjfReportWidget));

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
                    },] }
        ];
        return AjfReportsModule;
    }());

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

    /**
     * Generated bundle index. Do not edit.
     */

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

})));
//# sourceMappingURL=material-reports.umd.js.map
