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
let AjfFbBranchLine = /** @class */ (() => {
    class AjfFbBranchLine {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this._offset = 0;
            this._height = 0;
        }
        set offset(offset) {
            this._offset = offset;
            this._updateOffset();
        }
        set color(color) {
            this._color = color;
            this._updateColor();
        }
        set height(height) {
            this._height = height;
            this._updateHeight();
        }
        _updateHeight() {
            const height = `${Math.max(0, this._height - 25)}px`;
            this._renderer.setStyle(this._el.nativeElement, 'height', height);
        }
        _updateOffset() {
            const margin = `${this._offset * 4}px`;
            this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
            this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
        }
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
    return AjfFbBranchLine;
})();
export { AjfFbBranchLine };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2JyYW5jaC1saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUFBLE1BT2EsZUFBZTtRQXNCMUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1lBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBckJ6RCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1lBY1osWUFBTyxHQUFHLENBQUMsQ0FBQztRQU9nRCxDQUFDO1FBcEJyRSxJQUNJLE1BQU0sQ0FBQyxNQUFjO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBR0QsSUFDSSxLQUFLLENBQUMsS0FBYTtZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUdELElBQ0ksTUFBTSxDQUFDLE1BQWM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFJTyxhQUFhO1lBQ25CLE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRU8sYUFBYTtZQUNuQixNQUFNLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6RSxDQUFDO1FBRU8sWUFBWTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9FLENBQUM7OztnQkE1Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFlBQStCO29CQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFaQyxVQUFVO2dCQUVWLFNBQVM7Ozt5QkFhUixLQUFLO3dCQU9MLEtBQUs7eUJBT0wsS0FBSzs7SUFzQlIsc0JBQUM7S0FBQTtTQXRDWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLWJyYW5jaC1saW5lJyxcbiAgdGVtcGxhdGVVcmw6ICdicmFuY2gtbGluZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2JyYW5jaC1saW5lLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkJyYW5jaExpbmUge1xuICBwcml2YXRlIF9vZmZzZXQgPSAwO1xuICBASW5wdXQoKVxuICBzZXQgb2Zmc2V0KG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0O1xuICAgIHRoaXMuX3VwZGF0ZU9mZnNldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IGNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuX3VwZGF0ZUNvbG9yKCk7XG4gIH1cblxuICBwcml2YXRlIF9oZWlnaHQgPSAwO1xuICBASW5wdXQoKVxuICBzZXQgaGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IGhlaWdodCA9IGAke01hdGgubWF4KDAsIHRoaXMuX2hlaWdodCAtIDI1KX1weGA7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGhlaWdodCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVPZmZzZXQoKTogdm9pZCB7XG4gICAgY29uc3QgbWFyZ2luID0gYCR7dGhpcy5fb2Zmc2V0ICogNH1weGA7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi10b3AnLCBtYXJnaW4pO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tbGVmdCcsIG1hcmdpbik7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDb2xvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnYm9yZGVyLWNvbG9yJywgdGhpcy5fY29sb3IpO1xuICB9XG59XG4iXX0=