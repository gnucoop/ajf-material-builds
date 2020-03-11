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
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AjfFieldWarningDialog } from './field-warning-dialog';
var AjfWarningAlertService = /** @class */ (function () {
    function AjfWarningAlertService(_dialog) {
        this._dialog = _dialog;
    }
    AjfWarningAlertService.prototype.showWarningAlertPrompt = function (warnings) {
        var dialog = this._dialog.open(AjfFieldWarningDialog);
        dialog.componentInstance.message = warnings.join('<br>');
        return dialog.afterClosed().pipe(map(function (result) { return ({ result: result }); }));
    };
    AjfWarningAlertService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AjfWarningAlertService.ctorParameters = function () { return [
        { type: MatDialog }
    ]; };
    return AjfWarningAlertService;
}());
export { AjfWarningAlertService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy1hbGVydC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm1zL3dhcm5pbmctYWxlcnQtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFLSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFN0Q7SUFFRSxnQ0FBb0IsT0FBa0I7UUFBbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztJQUFJLENBQUM7SUFFM0MsdURBQXNCLEdBQXRCLFVBQXVCLFFBQWtCO1FBQ3ZDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FDOUIsR0FBRyxDQUFDLFVBQUMsTUFBZSxJQUFLLE9BQUEsQ0FBQyxFQUFDLE1BQU0sUUFBQSxFQUFDLENBQUMsRUFBVixDQUFVLENBQUMsQ0FDckMsQ0FBQztJQUNKLENBQUM7O2dCQVZGLFVBQVU7Ozs7Z0JBTkgsU0FBUzs7SUFpQmpCLDZCQUFDO0NBQUEsQUFYRCxJQVdDO1NBVlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZGaWVsZFdhcm5pbmdBbGVydFJlc3VsdCwgQWpmV2FybmluZ0FsZXJ0U2VydmljZSBhcyBDb3JlV2FybmluZ0FsZXJ0U2VydmljZVxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRXYXJuaW5nRGlhbG9nfSBmcm9tICcuL2ZpZWxkLXdhcm5pbmctZGlhbG9nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZldhcm5pbmdBbGVydFNlcnZpY2UgaW1wbGVtZW50cyBDb3JlV2FybmluZ0FsZXJ0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nKSB7IH1cblxuICBzaG93V2FybmluZ0FsZXJ0UHJvbXB0KHdhcm5pbmdzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8QWpmRmllbGRXYXJuaW5nQWxlcnRSZXN1bHQ+IHtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGaWVsZFdhcm5pbmdEaWFsb2cpO1xuICAgIGRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5tZXNzYWdlID0gd2FybmluZ3Muam9pbignPGJyPicpO1xuICAgIHJldHVybiBkaWFsb2cuYWZ0ZXJDbG9zZWQoKS5waXBlKFxuICAgICAgbWFwKChyZXN1bHQ6IGJvb2xlYW4pID0+ICh7cmVzdWx0fSkpXG4gICAgKTtcbiAgfVxufVxuIl19