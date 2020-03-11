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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
var AjfFbNodeTypeEntry = /** @class */ (function () {
    function AjfFbNodeTypeEntry(_cdr) {
        this._cdr = _cdr;
    }
    Object.defineProperty(AjfFbNodeTypeEntry.prototype, "nodeType", {
        get: function () { return this._nodeType; },
        set: function (nodeType) {
            this._nodeType = nodeType;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    AjfFbNodeTypeEntry.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-node-type-entry',
                    template: "<ng-container *ngIf=\"nodeType\">\n  <mat-icon\n    [fontSet]=\"nodeType.icon.fontSet\" [fontIcon]=\"nodeType.icon.fontIcon\"></mat-icon>\n  {{ nodeType.label }}\n</ng-container>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbNodeTypeEntry.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    AjfFbNodeTypeEntry.propDecorators = {
        nodeType: [{ type: Input }]
    };
    return AjfFbNodeTypeEntry;
}());
export { AjfFbNodeTypeEntry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10eXBlLWVudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXR5cGUtZW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQ2hGLE1BQU0sZUFBZSxDQUFDO0FBS3ZCO0lBZ0JFLDRCQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtJQUFJLENBQUM7SUFQaEQsc0JBQUksd0NBQVE7YUFBWixjQUE4QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3RFLFVBQ2EsUUFBcUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FMcUU7O2dCQVR2RSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsZ01BQW1DO29CQUVuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFaMEIsaUJBQWlCOzs7MkJBZ0J6QyxLQUFLOztJQU9SLHlCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FWWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5fSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS10eXBlLWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLXR5cGUtZW50cnkuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLXR5cGUtZW50cnkuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZVR5cGVFbnRyeSB7XG4gIHByaXZhdGUgX25vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk7XG4gIGdldCBub2RlVHlwZSgpOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkgeyByZXR1cm4gdGhpcy5fbm9kZVR5cGU7IH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGVUeXBlKG5vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkpIHtcbiAgICB0aGlzLl9ub2RlVHlwZSA9IG5vZGVUeXBlO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxufVxuIl19