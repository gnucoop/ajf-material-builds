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
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AjfFbChoicesOriginEditor } from './choices-origin-editor';
import { AjfFormBuilderService } from './form-builder-service';
let AjfFbChoicesOriginEditorDialog = /** @class */ (() => {
    class AjfFbChoicesOriginEditorDialog {
        constructor(_service) {
            this._service = _service;
            this._choicesOrigin =
                this._service.editedChoicesOrigin.pipe(filter(c => c != null), map(c => c));
        }
        get choicesOrigin() {
            return this._choicesOrigin;
        }
        saveChoicesOrigin() {
            this._service.saveChoicesOrigin({ label: this.editor.label, name: this.editor.name, choices: this.editor.choicesArr });
        }
        cancelChoicesOriginEdit() {
            this._service.cancelChoicesOriginEdit();
        }
    }
    AjfFbChoicesOriginEditorDialog.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-choices-origin-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit choices origin</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n      *ngIf=\"choicesOrigin|async as co\"\n      [choicesOrigin]=\"co!\"></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveChoicesOrigin()\">Save</button>\n  <button mat-button translate (click)=\"cancelChoicesOriginEdit()\">Close</button>\n</mat-dialog-actions>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfFbChoicesOriginEditorDialog.ctorParameters = () => [
        { type: AjfFormBuilderService }
    ];
    AjfFbChoicesOriginEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbChoicesOriginEditor, { static: false },] }]
    };
    return AjfFbChoicesOriginEditorDialog;
})();
export { AjfFbChoicesOriginEditorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRzdEO0lBQUEsTUFPYSw4QkFBOEI7UUFRekMsWUFBb0IsUUFBK0I7WUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7WUFDakQsSUFBSSxDQUFDLGNBQWM7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkYsQ0FBQztRQVBELElBQUksYUFBYTtZQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDO1FBT0QsaUJBQWlCO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FDM0IsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUVELHVCQUF1QjtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDMUMsQ0FBQzs7O2dCQTNCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsMmNBQWdEO29CQUVoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFUTyxxQkFBcUI7Ozt5QkFXMUIsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzs7SUFvQnRELHFDQUFDO0tBQUE7U0FyQlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3J9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Nob2ljZXMtb3JpZ2luLWVkaXRvci1kaWFsb2cuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZyB7XG4gIEBWaWV3Q2hpbGQoQWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yLCB7c3RhdGljOiBmYWxzZX0pIGVkaXRvcjogQWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yO1xuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW46IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+PjtcbiAgZ2V0IGNob2ljZXNPcmlnaW4oKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW4gPVxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmVkaXRlZENob2ljZXNPcmlnaW4ucGlwZShmaWx0ZXIoYyA9PiBjICE9IG51bGwpLCBtYXAoYyA9PiBjISkpO1xuICB9XG5cbiAgc2F2ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlQ2hvaWNlc09yaWdpbihcbiAgICAgICAge2xhYmVsOiB0aGlzLmVkaXRvci5sYWJlbCwgbmFtZTogdGhpcy5lZGl0b3IubmFtZSwgY2hvaWNlczogdGhpcy5lZGl0b3IuY2hvaWNlc0Fycn0pO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpO1xuICB9XG59XG4iXX0=