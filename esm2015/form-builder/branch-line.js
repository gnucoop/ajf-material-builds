/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/branch-line.ts
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
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
export class AjfFbBranchLine {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._height = 0;
    }
    /**
     * @param {?} offset
     * @return {?}
     */
    set offset(offset) {
        this._offset = offset;
        this._updateOffset();
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set color(color) {
        this._color = color;
        this._updateColor();
    }
    /**
     * @param {?} height
     * @return {?}
     */
    set height(height) {
        this._height = height;
        this._updateHeight();
    }
    /**
     * @private
     * @return {?}
     */
    _updateHeight() {
        /** @type {?} */
        const height = `${Math.max(0, this._height - 25)}px`;
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    }
    /**
     * @private
     * @return {?}
     */
    _updateOffset() {
        /** @type {?} */
        const margin = `${this._offset * 4}px`;
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    }
    /**
     * @private
     * @return {?}
     */
    _updateColor() {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    }
}
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
AjfFbBranchLine.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AjfFbBranchLine.propDecorators = {
    offset: [{ type: Input }],
    color: [{ type: Input }],
    height: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._offset;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._color;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._height;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2JyYW5jaC1saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQ3RFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBUzFDLE1BQU0sT0FBTyxlQUFlOzs7OztJQW1CMUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBbEJ6RCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBWVosWUFBTyxHQUFHLENBQUMsQ0FBQztJQU1pRCxDQUFDOzs7OztJQWpCdEUsSUFBYSxNQUFNLENBQUMsTUFBYztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFHRCxJQUFhLEtBQUssQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUdELElBQWEsTUFBTSxDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBSU8sYUFBYTs7Y0FDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJO1FBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDOzs7OztJQUVPLGFBQWE7O2NBQ2IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUk7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7OztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs7WUF6Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFlBQStCO2dCQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVDJDLFVBQVU7WUFBUyxTQUFTOzs7cUJBWXJFLEtBQUs7b0JBTUwsS0FBSztxQkFNTCxLQUFLOzs7Ozs7O0lBYk4sa0NBQW9COzs7OztJQU1wQixpQ0FBdUI7Ozs7O0lBTXZCLGtDQUFvQjs7Ozs7SUFNUiw4QkFBdUI7Ozs7O0lBQUUsb0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLWJyYW5jaC1saW5lJyxcbiAgdGVtcGxhdGVVcmw6ICdicmFuY2gtbGluZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2JyYW5jaC1saW5lLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkJyYW5jaExpbmUge1xuICBwcml2YXRlIF9vZmZzZXQgPSAwO1xuICBASW5wdXQoKSBzZXQgb2Zmc2V0KG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgIHRoaXMuX3VwZGF0ZU9mZnNldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgc2V0IGNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuX3VwZGF0ZUNvbG9yKCk7XG4gIH1cblxuICBwcml2YXRlIF9oZWlnaHQgPSAwO1xuICBASW5wdXQoKSBzZXQgaGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCBoZWlnaHQgPSBgJHtNYXRoLm1heCgwLCB0aGlzLl9oZWlnaHQgLSAyNSl9cHhgO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBoZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlT2Zmc2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IG1hcmdpbiA9IGAke3RoaXMuX29mZnNldCAqIDR9cHhgO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tdG9wJywgbWFyZ2luKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLWxlZnQnLCBtYXJnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ29sb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2JvcmRlci1jb2xvcicsIHRoaXMuX2NvbG9yKTtcbiAgfVxufVxuIl19