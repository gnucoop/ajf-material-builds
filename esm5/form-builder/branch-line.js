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
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
var AjfFbBranchLine = /** @class */ (function () {
    function AjfFbBranchLine(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._height = 0;
    }
    Object.defineProperty(AjfFbBranchLine.prototype, "offset", {
        set: function (offset) {
            this._offset = offset;
            this._updateOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbBranchLine.prototype, "color", {
        set: function (color) {
            this._color = color;
            this._updateColor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbBranchLine.prototype, "height", {
        set: function (height) {
            this._height = height;
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    AjfFbBranchLine.prototype._updateHeight = function () {
        var height = Math.max(0, this._height - 25) + "px";
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    };
    AjfFbBranchLine.prototype._updateOffset = function () {
        var margin = this._offset * 4 + "px";
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    };
    AjfFbBranchLine.prototype._updateColor = function () {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    };
    AjfFbBranchLine.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-branch-line',
                    template: "",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbBranchLine.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfFbBranchLine.propDecorators = {
        offset: [{ type: Input }],
        color: [{ type: Input }],
        height: [{ type: Input }]
    };
    return AjfFbBranchLine;
}());
export { AjfFbBranchLine };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2JyYW5jaC1saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQTZCRSx5QkFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBckJ6RCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBY1osWUFBTyxHQUFHLENBQUMsQ0FBQztJQU9nRCxDQUFDO0lBcEJyRSxzQkFDSSxtQ0FBTTthQURWLFVBQ1csTUFBYztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFHRCxzQkFDSSxrQ0FBSzthQURULFVBQ1UsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFHRCxzQkFDSSxtQ0FBTTthQURWLFVBQ1csTUFBYztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFJTyx1Q0FBYSxHQUFyQjtRQUNFLElBQU0sTUFBTSxHQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQUksQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLHVDQUFhLEdBQXJCO1FBQ0UsSUFBTSxNQUFNLEdBQU0sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyxzQ0FBWSxHQUFwQjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7Z0JBNUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixZQUErQjtvQkFFL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBWkMsVUFBVTtnQkFFVixTQUFTOzs7eUJBYVIsS0FBSzt3QkFPTCxLQUFLO3lCQU9MLEtBQUs7O0lBc0JSLHNCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0F0Q1ksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1icmFuY2gtbGluZScsXG4gIHRlbXBsYXRlVXJsOiAnYnJhbmNoLWxpbmUuaHRtbCcsXG4gIHN0eWxlVXJsczogWydicmFuY2gtbGluZS5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJCcmFuY2hMaW5lIHtcbiAgcHJpdmF0ZSBfb2Zmc2V0ID0gMDtcbiAgQElucHV0KClcbiAgc2V0IG9mZnNldChvZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICB0aGlzLl91cGRhdGVPZmZzZXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCBjb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLl91cGRhdGVDb2xvcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGVpZ2h0ID0gMDtcbiAgQElucHV0KClcbiAgc2V0IGhlaWdodChoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCBoZWlnaHQgPSBgJHtNYXRoLm1heCgwLCB0aGlzLl9oZWlnaHQgLSAyNSl9cHhgO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBoZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlT2Zmc2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IG1hcmdpbiA9IGAke3RoaXMuX29mZnNldCAqIDR9cHhgO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tdG9wJywgbWFyZ2luKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLWxlZnQnLCBtYXJnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ29sb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2JvcmRlci1jb2xvcicsIHRoaXMuX2NvbG9yKTtcbiAgfVxufVxuIl19