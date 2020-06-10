import { AjfBaseWidgetComponent, AjfReportRenderer as AjfReportRenderer$1, AjfReportWidget as AjfReportWidget$1, AjfWidgetType, AjfReportsModule as AjfReportsModule$1 } from '@ajf/core/reports';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ElementRef, ComponentFactoryResolver, Renderer2, NgModule } from '@angular/core';
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
let AjfChartWidgetComponent = /** @class */ (() => {
    class AjfChartWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfChartWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-chart\n    [chartType]=\"instance.chartType\"\n    [options]=\"instance.widget.options\"\n    [data]=\"instance.data\"\n></ajf-chart>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfChartWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfChartWidgetComponent;
})();

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
let AjfColumnWidgetComponent = /** @class */ (() => {
    class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfColumnWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ajf-column-container{flex:1 1 auto}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfColumnWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfColumnWidgetComponent;
})();

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
let AjfFormulaWidgetComponent = /** @class */ (() => {
    class AjfFormulaWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfFormulaWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-text [htmlText]=\"instance.formula\"></ajf-text>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFormulaWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfFormulaWidgetComponent;
})();

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
let AjfImageContainerWidgetComponent = /** @class */ (() => {
    class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
            this.imageTypes = AjfImageType;
        }
    }
    AjfImageContainerWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ajf-image-container img{max-width:none;max-height:none}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfImageContainerWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfImageContainerWidgetComponent;
})();

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
let AjfImageWidgetComponent = /** @class */ (() => {
    class AjfImageWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfImageWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-image\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfImageWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfImageWidgetComponent;
})();

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
let AjfLayoutWidgetComponent = /** @class */ (() => {
    class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfLayoutWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfLayoutWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfLayoutWidgetComponent;
})();

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
let AjfMapWidgetComponent = /** @class */ (() => {
    class AjfMapWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfMapWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-map\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfMapWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfMapWidgetComponent;
})();

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
let AjfPageBreakWidgetComponent = /** @class */ (() => {
    class AjfPageBreakWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfPageBreakWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-page-break></ajf-page-break>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfPageBreakWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfPageBreakWidgetComponent;
})();

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
let AjfReportRenderer = /** @class */ (() => {
    class AjfReportRenderer extends AjfReportRenderer$1 {
        constructor(cdr) {
            super(cdr);
        }
    }
    AjfReportRenderer.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report',
                    template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;top:0;right:0;left:0;bottom:0;min-height:300px;padding:100px;text-align:center;background-color:rgba(240,240,240,.4);display:flex;justify-content:center}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportRenderer.ctorParameters = () => [
        { type: ChangeDetectorRef }
    ];
    return AjfReportRenderer;
})();

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
let AjfTableWidgetComponent = /** @class */ (() => {
    class AjfTableWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfTableWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-table [data]=\"instance.data\"></ajf-table>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfTableWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfTableWidgetComponent;
})();

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
let AjfTextWidgetComponent = /** @class */ (() => {
    class AjfTextWidgetComponent extends AjfBaseWidgetComponent {
        constructor(cdr, el) {
            super(cdr, el);
        }
    }
    AjfTextWidgetComponent.decorators = [
        { type: Component, args: [{
                    template: "<ajf-text [htmlText]=\"instance.htmlText | translate\"></ajf-text>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfTextWidgetComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ];
    return AjfTextWidgetComponent;
})();

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
let AjfReportWidget = /** @class */ (() => {
    class AjfReportWidget extends AjfReportWidget$1 {
        constructor(cfr, renderer) {
            super(cfr, renderer);
            this.widgetsMap = {
                [AjfWidgetType.Layout]: { component: AjfLayoutWidgetComponent },
                [AjfWidgetType.PageBreak]: { component: AjfPageBreakWidgetComponent },
                [AjfWidgetType.Image]: { component: AjfImageWidgetComponent },
                [AjfWidgetType.Text]: { component: AjfTextWidgetComponent },
                [AjfWidgetType.Chart]: { component: AjfChartWidgetComponent },
                [AjfWidgetType.Table]: { component: AjfTableWidgetComponent },
                [AjfWidgetType.DynamicTable]: { component: AjfTableWidgetComponent },
                [AjfWidgetType.Map]: { component: AjfMapWidgetComponent },
                [AjfWidgetType.Column]: { component: AjfColumnWidgetComponent },
                [AjfWidgetType.Formula]: { component: AjfFormulaWidgetComponent },
                [AjfWidgetType.ImageContainer]: { component: AjfImageContainerWidgetComponent },
            };
        }
    }
    AjfReportWidget.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-widget',
                    template: "<ng-template ajf-widget-host></ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportWidget.ctorParameters = () => [
        { type: ComponentFactoryResolver },
        { type: Renderer2 }
    ];
    return AjfReportWidget;
})();

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
let AjfReportsModule = /** @class */ (() => {
    class AjfReportsModule {
    }
    AjfReportsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        AjfChartModule,
                        AjfCommonModule,
                        AjfImageModule,
                        AjfMapModule,
                        AjfPageBreakModule,
                        AjfTableModule,
                        AjfTextModule,
                        CommonModule,
                        AjfReportsModule$1,
                        TranslateModule,
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
})();

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

export { AjfChartWidgetComponent, AjfColumnWidgetComponent, AjfFormulaWidgetComponent, AjfImageContainerWidgetComponent, AjfImageWidgetComponent, AjfLayoutWidgetComponent, AjfMapWidgetComponent, AjfPageBreakWidgetComponent, AjfReportRenderer, AjfReportWidget, AjfReportsModule, AjfTableWidgetComponent, AjfTextWidgetComponent };
//# sourceMappingURL=reports.js.map
