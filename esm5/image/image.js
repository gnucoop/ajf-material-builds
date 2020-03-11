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
import { __extends } from "tslib";
import { AjfImage as AjfCoreImage } from '@ajf/core/image';
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var AjfImage = /** @class */ (function (_super) {
    __extends(AjfImage, _super);
    function AjfImage(el, renderer, ds) {
        return _super.call(this, el, renderer, ds) || this;
    }
    AjfImage.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-image',
                    template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfImage.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DomSanitizer }
    ]; };
    return AjfImage;
}(AjfCoreImage));
export { AjfImage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvaW1hZ2UvaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFBQyxRQUFRLElBQUksWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUMvRCxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdkQ7SUFPOEIsNEJBQVk7SUFDeEMsa0JBQVksRUFBYyxFQUFFLFFBQW1CLEVBQUUsRUFBZ0I7ZUFDL0Qsa0JBQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Z0JBVkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQix5ZUFBeUI7b0JBRXpCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQVYyQyxVQUFVO2dCQUFFLFNBQVM7Z0JBRXpELFlBQVk7O0lBYXBCLGVBQUM7Q0FBQSxBQVhELENBTzhCLFlBQVksR0FJekM7U0FKWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkltYWdlIGFzIEFqZkNvcmVJbWFnZX0gZnJvbSAnQGFqZi9jb3JlL2ltYWdlJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLFxuICBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1pbWFnZScsXG4gIHRlbXBsYXRlVXJsOiAnaW1hZ2UuaHRtbCcsXG4gIHN0eWxlVXJsczogWydpbWFnZS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkltYWdlIGV4dGVuZHMgQWpmQ29yZUltYWdlIHtcbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGRzOiBEb21TYW5pdGl6ZXIpIHtcbiAgICBzdXBlcihlbCwgcmVuZGVyZXIsIGRzKTtcbiAgfVxufVxuIl19