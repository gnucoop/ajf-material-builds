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
import { AjfPageSlider as AjfCorePageSlider } from '@ajf/core/page-slider';
import { AnimationBuilder } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Renderer2, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
import * as i2 from "@angular/material/toolbar";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/common";
export class AjfPageSlider extends AjfCorePageSlider {
    constructor(animationBuilder, cdr, renderer) {
        super(animationBuilder, cdr, renderer);
    }
}
AjfPageSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfPageSlider, deps: [{ token: i1.AnimationBuilder }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfPageSlider.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfPageSlider, selector: "ajf-page-slider", usesInheritance: true, ngImport: i0, template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (mousewheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation == 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_backward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_upward</mat-icon>\n    </button>\n    <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_forward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_downward</mat-icon>\n    </button>\n  </div>\n</mat-toolbar>\n", styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"], components: [{ type: i2.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { type: i3.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfPageSlider, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-page-slider', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-page-slider-content\">\n  <div #body [ngClass]=\"'ajf-page-slider-' + orientation\" (touchstart)=\"onTouchStart($event)\"\n    (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd()\" (mousewheel)=\"onMouseWheel($event)\"\n    class=\"ajf-page-slider-body\">\n    <ng-content></ng-content>\n  </div>\n</div>\n<mat-toolbar *ngIf=\"!hideNavigationButtons\" class=\"ajf-toolbar\">\n  <ng-content select=[ajfPageSliderBar]></ng-content>\n  <div class=\"ajf-spacer\"></div>\n  <div>\n    <button aria-label=\"Switch orientation\" mat-button *ngIf=\"!fixedOrientation\" (click)=\"switchOrientation()\">\n      <mat-icon>{{ orientation == 'vertical' ? 'swap_horiz' : 'swap_vert' }}</mat-icon>\n    </button>\n    <button aria-label=\"Back\" mat-button (click)=\"slide({dir: 'up'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_backward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_upward</mat-icon>\n    </button>\n    <button aria-label=\"Forward\" mat-button (click)=\"slide({dir: 'down'})\" secondary>\n      <mat-icon *ngIf=\"orientation == 'horizontal'\">arrow_forward</mat-icon>\n      <mat-icon *ngIf=\"orientation == 'vertical'\">arrow_downward</mat-icon>\n    </button>\n  </div>\n</mat-toolbar>\n", styles: ["ajf-page-slider{display:flex;flex-direction:column;align-items:stretch}ajf-page-slider>.ajf-page-slider-content{flex:1;display:block;overflow:hidden;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body{display:flex;align-items:stretch}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-vertical{flex-direction:column;width:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body.ajf-page-slider-horizontal{flex-direction:row;height:100%}ajf-page-slider>.ajf-page-slider-content>.ajf-page-slider-body>ajf-page-slider-item{flex:1 0 auto}ajf-page-slider .ajf-spacer{flex:1 0 auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AnimationBuilder }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcGFnZS1zbGlkZXIvcGFnZS1zbGlkZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsYUFBYSxJQUFJLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDekUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckQsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7QUFTdkIsTUFBTSxPQUFPLGFBQWMsU0FBUSxpQkFBaUI7SUFDbEQsWUFBWSxnQkFBa0MsRUFBRSxHQUFzQixFQUFFLFFBQW1CO1FBQ3pGLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7a0hBSFUsYUFBYTtzR0FBYixhQUFhLDhFQ3hDMUIsOHZDQXdCQTttR0RnQmEsYUFBYTtrQkFQekIsU0FBUzsrQkFDRSxpQkFBaUIsaUJBR1osaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZQYWdlU2xpZGVyIGFzIEFqZkNvcmVQYWdlU2xpZGVyfSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtBbmltYXRpb25CdWlsZGVyfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcGFnZS1zbGlkZXInLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2Utc2xpZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZS1zbGlkZXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVyIGV4dGVuZHMgQWpmQ29yZVBhZ2VTbGlkZXIge1xuICBjb25zdHJ1Y3RvcihhbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLCBjZHI6IENoYW5nZURldGVjdG9yUmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgc3VwZXIoYW5pbWF0aW9uQnVpbGRlciwgY2RyLCByZW5kZXJlcik7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZU5hdmlnYXRpb25CdXR0b25zOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maXhlZE9yaWVudGF0aW9uOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXBhZ2Utc2xpZGVyLWNvbnRlbnRcIj5cbiAgPGRpdiAjYm9keSBbbmdDbGFzc109XCInYWpmLXBhZ2Utc2xpZGVyLScgKyBvcmllbnRhdGlvblwiICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQpXCJcbiAgICAodG91Y2htb3ZlKT1cIm9uVG91Y2hNb3ZlKCRldmVudClcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgpXCIgKG1vdXNld2hlZWwpPVwib25Nb3VzZVdoZWVsKCRldmVudClcIlxuICAgIGNsYXNzPVwiYWpmLXBhZ2Utc2xpZGVyLWJvZHlcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG48bWF0LXRvb2xiYXIgKm5nSWY9XCIhaGlkZU5hdmlnYXRpb25CdXR0b25zXCIgY2xhc3M9XCJhamYtdG9vbGJhclwiPlxuICA8bmctY29udGVudCBzZWxlY3Q9W2FqZlBhZ2VTbGlkZXJCYXJdPjwvbmctY29udGVudD5cbiAgPGRpdiBjbGFzcz1cImFqZi1zcGFjZXJcIj48L2Rpdj5cbiAgPGRpdj5cbiAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJTd2l0Y2ggb3JpZW50YXRpb25cIiBtYXQtYnV0dG9uICpuZ0lmPVwiIWZpeGVkT3JpZW50YXRpb25cIiAoY2xpY2spPVwic3dpdGNoT3JpZW50YXRpb24oKVwiPlxuICAgICAgPG1hdC1pY29uPnt7IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgPyAnc3dhcF9ob3JpeicgOiAnc3dhcF92ZXJ0JyB9fTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPGJ1dHRvbiBhcmlhLWxhYmVsPVwiQmFja1wiIG1hdC1idXR0b24gKGNsaWNrKT1cInNsaWRlKHtkaXI6ICd1cCd9KVwiIHNlY29uZGFyeT5cbiAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJ1wiPmFycm93X2JhY2t3YXJkPC9tYXQtaWNvbj5cbiAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCdcIj5hcnJvd191cHdhcmQ8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxidXR0b24gYXJpYS1sYWJlbD1cIkZvcndhcmRcIiBtYXQtYnV0dG9uIChjbGljayk9XCJzbGlkZSh7ZGlyOiAnZG93bid9KVwiIHNlY29uZGFyeT5cbiAgICAgIDxtYXQtaWNvbiAqbmdJZj1cIm9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJ1wiPmFycm93X2ZvcndhcmQ8L21hdC1pY29uPlxuICAgICAgPG1hdC1pY29uICpuZ0lmPVwib3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJ1wiPmFycm93X2Rvd253YXJkPC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L21hdC10b29sYmFyPlxuIl19