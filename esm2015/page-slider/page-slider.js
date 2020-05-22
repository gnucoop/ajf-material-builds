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
import { __decorate, __metadata } from "tslib";
import { AjfPageSlider as AjfCorePageSlider } from '@ajf/core/page-slider';
import { AnimationBuilder } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Renderer2, ViewEncapsulation } from '@angular/core';
let AjfPageSlider = /** @class */ (() => {
    let AjfPageSlider = class AjfPageSlider extends AjfCorePageSlider {
        constructor(animationBuilder, cdr, renderer) {
            super(animationBuilder, cdr, renderer);
        }
    };
    AjfPageSlider = __decorate([
        Component({
            selector: 'ajf-page-slider',
            template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (mousewheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation == 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_backward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_upward</mat-icon>\n    </button>\n    <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_forward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_downward</mat-icon>\n    </button>\n  </div>\n</mat-toolbar>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"]
        }),
        __metadata("design:paramtypes", [AnimationBuilder, ChangeDetectorRef, Renderer2])
    ], AjfPageSlider);
    return AjfPageSlider;
})();
export { AjfPageSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFBQyxhQUFhLElBQUksaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQVN2QjtJQUFBLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxpQkFBaUI7UUFDbEQsWUFBWSxnQkFBa0MsRUFBRSxHQUFzQixFQUFFLFFBQW1CO1lBQ3pGLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsQ0FBQztLQUlGLENBQUE7SUFQWSxhQUFhO1FBUHpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxpQkFBaUI7WUFDM0Isd3dDQUErQjtZQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQzt5Q0FFOEIsZ0JBQWdCLEVBQU8saUJBQWlCLEVBQVksU0FBUztPQURoRixhQUFhLENBT3pCO0lBQUQsb0JBQUM7S0FBQTtTQVBZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciBhcyBBamZDb3JlUGFnZVNsaWRlcn0gZnJvbSAnQGFqZi9jb3JlL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7QW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcGFnZS1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2Utc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZS1zbGlkZXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVyIGV4dGVuZHMgQWpmQ29yZVBhZ2VTbGlkZXIge1xuICBjb25zdHJ1Y3RvcihhbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLCBjZHI6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIoYW5pbWF0aW9uQnVpbGRlciwgY2RyLCByZW5kZXJlcik7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZU5hdmlnYXRpb25CdXR0b25zOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZE9yaWVudGF0aW9uOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=