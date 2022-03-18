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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
export class AjfFbBranchLine {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._color = '';
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
AjfFbBranchLine.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFbBranchLine, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfFbBranchLine.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFbBranchLine, selector: "ajf-fb-branch-line", inputs: { offset: "offset", color: "color", height: "height" }, ngImport: i0, template: "", styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px;transition:height .5s ease-in-out}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFbBranchLine, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-fb-branch-line', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "", styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px;transition:height .5s ease-in-out}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { offset: [{
                type: Input
            }], color: [{
                type: Input
            }], height: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2JyYW5jaC1saW5lLnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9icmFuY2gtbGluZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULEtBQUssRUFFTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7O0FBU3ZCLE1BQU0sT0FBTyxlQUFlO0lBc0IxQixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFyQnpELFlBQU8sR0FBRyxDQUFDLENBQUM7UUFPWixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBT3BCLFlBQU8sR0FBRyxDQUFDLENBQUM7SUFPZ0QsQ0FBQztJQXBCckUsSUFDSSxNQUFNLENBQUMsTUFBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUdELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFHRCxJQUNJLE1BQU0sQ0FBQyxNQUFjO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBSU8sYUFBYTtRQUNuQixNQUFNLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLGFBQWE7UUFDbkIsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRSxDQUFDOzs0R0FyQ1UsZUFBZTtnR0FBZixlQUFlLDBIQ3RDNUIsRUFBQTsyRkRzQ2EsZUFBZTtrQkFQM0IsU0FBUzsrQkFDRSxvQkFBb0IsaUJBR2YsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTt5SEFLM0MsTUFBTTtzQkFEVCxLQUFLO2dCQVFGLEtBQUs7c0JBRFIsS0FBSztnQkFRRixNQUFNO3NCQURULEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLWJyYW5jaC1saW5lJyxcbiAgdGVtcGxhdGVVcmw6ICdicmFuY2gtbGluZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2JyYW5jaC1saW5lLnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQnJhbmNoTGluZSB7XG4gIHByaXZhdGUgX29mZnNldCA9IDA7XG4gIEBJbnB1dCgpXG4gIHNldCBvZmZzZXQob2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgdGhpcy5fdXBkYXRlT2Zmc2V0KCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpXG4gIHNldCBjb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLl91cGRhdGVDb2xvcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGVpZ2h0ID0gMDtcbiAgQElucHV0KClcbiAgc2V0IGhlaWdodChoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCgpOiB2b2lkIHtcbiAgICBjb25zdCBoZWlnaHQgPSBgJHtNYXRoLm1heCgwLCB0aGlzLl9oZWlnaHQgLSAyNSl9cHhgO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBoZWlnaHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlT2Zmc2V0KCk6IHZvaWQge1xuICAgIGNvbnN0IG1hcmdpbiA9IGAke3RoaXMuX29mZnNldCAqIDR9cHhgO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdtYXJnaW4tdG9wJywgbWFyZ2luKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLWxlZnQnLCBtYXJnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ29sb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2JvcmRlci1jb2xvcicsIHRoaXMuX2NvbG9yKTtcbiAgfVxufVxuIiwiIl19