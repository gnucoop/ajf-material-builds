/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { Pipe } from '@angular/core';
import { FormControl as BaseFormControl } from '@angular/forms';
var FormControl = /** @class */ (function (_super) {
    __extends(FormControl, _super);
    function FormControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FormControl;
}(BaseFormControl));
export { FormControl };
var AjfGetTableCellControlPipe = /** @class */ (function () {
    function AjfGetTableCellControlPipe() {
    }
    AjfGetTableCellControlPipe.prototype.transform = function (ctrl) {
        if (ctrl == null || typeof ctrl === 'string') {
            return null;
        }
        return ctrl;
    };
    AjfGetTableCellControlPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfGetTableCellControl' },] }
    ];
    return AjfGetTableCellControlPipe;
}());
export { AjfGetTableCellControlPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXRhYmxlLWNlbGwtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9nZXQtdGFibGUtY2VsbC1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUMsV0FBVyxJQUFJLGVBQWUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlEO0lBQWlDLCtCQUFlO0lBQWhEOztJQUVBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFGRCxDQUFpQyxlQUFlLEdBRS9DOztBQUVEO0lBQUE7SUFNQSxDQUFDO0lBSkMsOENBQVMsR0FBVCxVQUFVLElBQWlDO1FBQ3pDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBQzlELE9BQU8sSUFBbUIsQ0FBQztJQUM3QixDQUFDOztnQkFMRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUM7O0lBTXRDLGlDQUFDO0NBQUEsQUFORCxJQU1DO1NBTFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sIGFzIEJhc2VGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2wgZXh0ZW5kcyBCYXNlRm9ybUNvbnRyb2wge1xuICBzaG93OiBib29sZWFuO1xufVxuXG5AUGlwZSh7bmFtZTogJ2FqZkdldFRhYmxlQ2VsbENvbnRyb2wnfSlcbmV4cG9ydCBjbGFzcyBBamZHZXRUYWJsZUNlbGxDb250cm9sUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oY3RybDogbnVsbHxzdHJpbmd8QmFzZUZvcm1Db250cm9sKTogRm9ybUNvbnRyb2x8bnVsbCB7XG4gICAgaWYgKGN0cmwgPT0gbnVsbCB8fCB0eXBlb2YgY3RybCA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gY3RybCBhcyBGb3JtQ29udHJvbDtcbiAgfVxufVxuIl19