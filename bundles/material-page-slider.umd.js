(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@angular/animations'), require('@angular/core'), require('@ajf/core/page-slider'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/toolbar')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/page-slider', ['exports', 'tslib', '@angular/animations', '@angular/core', '@ajf/core/page-slider', '@angular/common', '@angular/material/button', '@angular/material/icon', '@angular/material/toolbar'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.pageSlider = {}), global.tslib, global.ng.animations, global.ng.core, global.ng.core.pageSlider, global.ng.common, global.ng.material.button, global.ng.material.icon, global.ng.material.toolbar));
}(this, (function (exports, tslib, animations, core, pageSlider, common, button, icon, toolbar) { 'use strict';

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
    var AjfPageSlider = /** @class */ (function (_super) {
        tslib.__extends(AjfPageSlider, _super);
        function AjfPageSlider(animationBuilder, cdr, renderer) {
            return _super.call(this, animationBuilder, cdr, renderer) || this;
        }
        AjfPageSlider.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-page-slider',
                        template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (mousewheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation == 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_backward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_upward</mat-icon>\n    </button>\n    <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_forward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_downward</mat-icon>\n    </button>\n  </div>\n</mat-toolbar>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfPageSlider.ctorParameters = function () { return [
            { type: animations.AnimationBuilder },
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 }
        ]; };
        return AjfPageSlider;
    }(pageSlider.AjfPageSlider));

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
    var AjfPageSliderModule = /** @class */ (function () {
        function AjfPageSliderModule() {
        }
        AjfPageSliderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            button.MatButtonModule,
                            icon.MatIconModule,
                            toolbar.MatToolbarModule,
                            pageSlider.AjfPageSliderModule
                        ],
                        declarations: [
                            AjfPageSlider
                        ],
                        exports: [
                            pageSlider.AjfPageSliderModule,
                            AjfPageSlider
                        ]
                    },] }
        ];
        return AjfPageSliderModule;
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

    exports.AjfPageSlider = AjfPageSlider;
    exports.AjfPageSliderModule = AjfPageSliderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-page-slider.umd.js.map
