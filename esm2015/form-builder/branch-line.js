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
import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
let AjfFbBranchLine = /** @class */ (() => {
    let AjfFbBranchLine = class AjfFbBranchLine {
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
    };
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AjfFbBranchLine.prototype, "offset", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfFbBranchLine.prototype, "color", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AjfFbBranchLine.prototype, "height", null);
    AjfFbBranchLine = __decorate([
        Component({
            selector: 'ajf-fb-branch-line',
            template: "",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px}\n"]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], AjfFbBranchLine);
    return AjfFbBranchLine;
})();
export { AjfFbBranchLine };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLWxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2JyYW5jaC1saW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFTdkI7SUFBQSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO1FBc0IxQixZQUFvQixHQUFlLEVBQVUsU0FBb0I7WUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFyQnpELFlBQU8sR0FBRyxDQUFDLENBQUM7WUFjWixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBT2dELENBQUM7UUFuQnJFLElBQUksTUFBTSxDQUFDLE1BQWM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7UUFJRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBSUQsSUFBSSxNQUFNLENBQUMsTUFBYztZQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUlPLGFBQWE7WUFDbkIsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFTyxhQUFhO1lBQ25CLE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFTyxZQUFZO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0UsQ0FBQztLQUNGLENBQUE7SUFuQ0M7UUFEQyxLQUFLLEVBQUU7OztpREFJUDtJQUlEO1FBREMsS0FBSyxFQUFFOzs7Z0RBSVA7SUFJRDtRQURDLEtBQUssRUFBRTs7O2lEQUlQO0lBcEJVLGVBQWU7UUFQM0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixZQUErQjtZQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQzt5Q0F1QnlCLFVBQVUsRUFBcUIsU0FBUztPQXRCdEQsZUFBZSxDQXNDM0I7SUFBRCxzQkFBQztLQUFBO1NBdENZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItYnJhbmNoLWxpbmUnLFxuICB0ZW1wbGF0ZVVybDogJ2JyYW5jaC1saW5lLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnYnJhbmNoLWxpbmUuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQnJhbmNoTGluZSB7XG4gIHByaXZhdGUgX29mZnNldCA9IDA7XG4gIEBJbnB1dCgpXG4gIHNldCBvZmZzZXQob2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgdGhpcy5fdXBkYXRlT2Zmc2V0KCk7XG4gIH1cblxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgY29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG4gICAgdGhpcy5fdXBkYXRlQ29sb3IoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hlaWdodCA9IDA7XG4gIEBJbnB1dCgpXG4gIHNldCBoZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwcml2YXRlIF91cGRhdGVIZWlnaHQoKTogdm9pZCB7XG4gICAgY29uc3QgaGVpZ2h0ID0gYCR7TWF0aC5tYXgoMCwgdGhpcy5faGVpZ2h0IC0gMjUpfXB4YDtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgaGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZU9mZnNldCgpOiB2b2lkIHtcbiAgICBjb25zdCBtYXJnaW4gPSBgJHt0aGlzLl9vZmZzZXQgKiA0fXB4YDtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnbWFyZ2luLXRvcCcsIG1hcmdpbik7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ21hcmdpbi1sZWZ0JywgbWFyZ2luKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUNvbG9yKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsICdib3JkZXItY29sb3InLCB0aGlzLl9jb2xvcik7XG4gIH1cbn1cbiJdfQ==