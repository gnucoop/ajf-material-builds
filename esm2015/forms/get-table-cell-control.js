/**
 * @fileoverview added by tsickle
 * Generated from: src/material/forms/get-table-cell-control.ts
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
import { Pipe } from '@angular/core';
import { FormControl as BaseFormControl } from '@angular/forms';
export class FormControl extends BaseFormControl {
}
if (false) {
    /** @type {?} */
    FormControl.prototype.show;
}
export class AjfGetTableCellControlPipe {
    /**
     * @param {?} ctrl
     * @return {?}
     */
    transform(ctrl) {
        if (ctrl == null || typeof ctrl === 'string') {
            return null;
        }
        return (/** @type {?} */ (ctrl));
    }
}
AjfGetTableCellControlPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfGetTableCellControl' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXRhYmxlLWNlbGwtY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9nZXQtdGFibGUtY2VsbC1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxXQUFXLElBQUksZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsTUFBTSxPQUFPLFdBQVksU0FBUSxlQUFlO0NBRS9DOzs7SUFEQywyQkFBYzs7QUFJaEIsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7SUFDckMsU0FBUyxDQUFDLElBQWlDO1FBQ3pDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBQzlELE9BQU8sbUJBQUEsSUFBSSxFQUFlLENBQUM7SUFDN0IsQ0FBQzs7O1lBTEYsSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbCBhcyBCYXNlRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNsYXNzIEZvcm1Db250cm9sIGV4dGVuZHMgQmFzZUZvcm1Db250cm9sIHtcbiAgc2hvdzogYm9vbGVhbjtcbn1cblxuQFBpcGUoe25hbWU6ICdhamZHZXRUYWJsZUNlbGxDb250cm9sJ30pXG5leHBvcnQgY2xhc3MgQWpmR2V0VGFibGVDZWxsQ29udHJvbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGN0cmw6IG51bGx8c3RyaW5nfEJhc2VGb3JtQ29udHJvbCk6IEZvcm1Db250cm9sfG51bGwge1xuICAgIGlmIChjdHJsID09IG51bGwgfHwgdHlwZW9mIGN0cmwgPT09ICdzdHJpbmcnKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGN0cmwgYXMgRm9ybUNvbnRyb2w7XG4gIH1cbn1cbiJdfQ==