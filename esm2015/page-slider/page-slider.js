/**
 * @fileoverview added by tsickle
 * Generated from: src/material/page-slider/page-slider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AnimationBuilder } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { AjfPageSlider as AjfCorePageSlider } from '@ajf/core/page-slider';
export class AjfPageSlider extends AjfCorePageSlider {
    /**
     * @param {?} animationBuilder
     * @param {?} cdr
     * @param {?} renderer
     */
    constructor(animationBuilder, cdr, renderer) {
        super(animationBuilder, cdr, renderer);
    }
}
AjfPageSlider.decorators = [
    { type: Component, args: [{
                selector: 'ajf-page-slider',
                template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (mousewheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation == 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_backward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_upward</mat-icon>\n    </button>\n    <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_forward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_downward</mat-icon>\n    </button>\n  </div>\n</mat-toolbar>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"]
            }] }
];
/** @nocollapse */
AjfPageSlider.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
if (false) {
    /** @type {?} */
    AjfPageSlider.ngAcceptInputType_hideNavigationButtons;
    /** @type {?} */
    AjfPageSlider.ngAcceptInputType_fixedOrientation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQ3RFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBQyxhQUFhLElBQUksaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQVN6RSxNQUFNLE9BQU8sYUFBYyxTQUFRLGlCQUFpQjs7Ozs7O0lBQ2xELFlBQVksZ0JBQWtDLEVBQUUsR0FBc0IsRUFBRSxRQUFtQjtRQUN6RixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7OztZQVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix3d0NBQStCO2dCQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBYk8sZ0JBQWdCO1lBRVMsaUJBQWlCO1lBQWEsU0FBUzs7OztJQWlCdEUsc0RBQTZEOztJQUM3RCxpREFBd0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXIgYXMgQWpmQ29yZVBhZ2VTbGlkZXJ9IGZyb20gJ0BhamYvY29yZS9wYWdlLXNsaWRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1wYWdlLXNsaWRlcicsXG4gIHRlbXBsYXRlVXJsOiAncGFnZS1zbGlkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlLXNsaWRlci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXIgZXh0ZW5kcyBBamZDb3JlUGFnZVNsaWRlciB7XG4gIGNvbnN0cnVjdG9yKGFuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICBzdXBlcihhbmltYXRpb25CdWlsZGVyLCBjZHIsIHJlbmRlcmVyKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkT3JpZW50YXRpb246IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==