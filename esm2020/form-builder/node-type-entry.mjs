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
import * as i1 from "@ajf/material/node-icon";
import * as i2 from "@angular/common";
export class AjfFbNodeTypeEntry {
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    get nodeType() {
        return this._nodeType;
    }
    set nodeType(nodeType) {
        this._nodeType = nodeType;
        this._cdr.markForCheck();
    }
    get node() {
        return { nodeType: this.nodeType?.nodeType.node, fieldType: this.nodeType?.nodeType.field };
    }
}
AjfFbNodeTypeEntry.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFbNodeTypeEntry, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFbNodeTypeEntry.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfFbNodeTypeEntry, selector: "ajf-fb-node-type-entry", inputs: { nodeType: "nodeType" }, ngImport: i0, template: "<ng-container *ngIf=\"nodeType\">\n  <ajf-node-icon [node]=\"node\"></ajf-node-icon>&nbsp;{{nodeType.label}}\n</ng-container>\n", styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}\n"], dependencies: [{ kind: "component", type: i1.AjfNodeIcon, selector: "ajf-node-icon" }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFbNodeTypeEntry, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-fb-node-type-entry', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"nodeType\">\n  <ajf-node-icon [node]=\"node\"></ajf-node-icon>&nbsp;{{nodeType.label}}\n</ng-container>\n", styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nodeType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlLWVudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXR5cGUtZW50cnkudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL25vZGUtdHlwZS1lbnRyeS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULEtBQUssRUFDTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7Ozs7QUFXdkIsTUFBTSxPQUFPLGtCQUFrQjtJQWM3QixZQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtJQUFHLENBQUM7SUFaL0MsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUNJLFFBQVEsQ0FBQyxRQUFpRDtRQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFDLENBQUM7SUFDNUYsQ0FBQzs7K0dBWlUsa0JBQWtCO21HQUFsQixrQkFBa0IsZ0dDdkMvQixpSUFHQTsyRkRvQ2Esa0JBQWtCO2tCQVA5QixTQUFTOytCQUNFLHdCQUF3QixpQkFHbkIsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTt3R0FRM0MsUUFBUTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnl9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS10eXBlLWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLXR5cGUtZW50cnkuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLXR5cGUtZW50cnkuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJOb2RlVHlwZUVudHJ5IHtcbiAgcHJpdmF0ZSBfbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSB8IHVuZGVmaW5lZDtcbiAgZ2V0IG5vZGVUeXBlKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVUeXBlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub2RlVHlwZShub2RlVHlwZTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fbm9kZVR5cGUgPSBub2RlVHlwZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbiAgZ2V0IG5vZGUoKTogYW55IHtcbiAgICByZXR1cm4ge25vZGVUeXBlOiB0aGlzLm5vZGVUeXBlPy5ub2RlVHlwZS5ub2RlLCBmaWVsZFR5cGU6IHRoaXMubm9kZVR5cGU/Lm5vZGVUeXBlLmZpZWxkfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwibm9kZVR5cGVcIj5cbiAgPGFqZi1ub2RlLWljb24gW25vZGVdPVwibm9kZVwiPjwvYWpmLW5vZGUtaWNvbj4mbmJzcDt7e25vZGVUeXBlLmxhYmVsfX1cbjwvbmctY29udGFpbmVyPlxuIl19