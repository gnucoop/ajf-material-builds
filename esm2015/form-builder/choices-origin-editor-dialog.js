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
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { AjfFbChoicesOriginEditor } from './choices-origin-editor';
import { AjfFormBuilderService } from './form-builder-service';
let AjfFbChoicesOriginEditorDialog = /** @class */ (() => {
    let AjfFbChoicesOriginEditorDialog = class AjfFbChoicesOriginEditorDialog {
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
    };
    __decorate([
        ViewChild(AjfFbChoicesOriginEditor, { static: false }),
        __metadata("design:type", AjfFbChoicesOriginEditor)
    ], AjfFbChoicesOriginEditorDialog.prototype, "editor", void 0);
    AjfFbChoicesOriginEditorDialog = __decorate([
        Component({
            selector: 'ajf-fb-choices-origin-editor-dialog',
            template: "<h3 matDialogTitle translate>Edit choices origin</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n      *ngIf=\"choicesOrigin|async as co\"\n      [choicesOrigin]=\"co!\"></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveChoicesOrigin()\">Save</button>\n  <button mat-button translate (click)=\"cancelChoicesOriginEdit()\">Close</button>\n</mat-dialog-actions>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["\n"]
        }),
        __metadata("design:paramtypes", [AjfFormBuilderService])
    ], AjfFbChoicesOriginEditorDialog);
    return AjfFbChoicesOriginEditorDialog;
})();
export { AjfFbChoicesOriginEditorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBR0gsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0YsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQVU3RDtJQUFBLElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO1FBUXpDLFlBQW9CLFFBQStCO1lBQS9CLGFBQVEsR0FBUixRQUFRLENBQXVCO1lBQ2pELElBQUksQ0FBQyxjQUFjO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFQRCxJQUFJLGFBQWE7WUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQztRQU9ELGlCQUFpQjtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQzNCLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFFRCx1QkFBdUI7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzFDLENBQUM7S0FDRixDQUFBO0lBcEJ1RDtRQUFyRCxTQUFTLENBQUMsd0JBQXdCLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7a0NBQVMsd0JBQXdCO2tFQUFDO0lBRDVFLDhCQUE4QjtRQVAxQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUNBQXFDO1lBQy9DLDJjQUFnRDtZQUVoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQzt5Q0FTOEIscUJBQXFCO09BUnhDLDhCQUE4QixDQXFCMUM7SUFBRCxxQ0FBQztLQUFBO1NBckJZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLWNob2ljZXMtb3JpZ2luLWVkaXRvci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ2Nob2ljZXMtb3JpZ2luLWVkaXRvci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjaG9pY2VzLW9yaWdpbi1lZGl0b3ItZGlhbG9nLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2cge1xuICBAVmlld0NoaWxkKEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvciwge3N0YXRpYzogZmFsc2V9KSBlZGl0b3I6IEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvcjtcblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55Pj47XG4gIGdldCBjaG9pY2VzT3JpZ2luKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW47XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2luID1cbiAgICAgICAgdGhpcy5fc2VydmljZS5lZGl0ZWRDaG9pY2VzT3JpZ2luLnBpcGUoZmlsdGVyKGMgPT4gYyAhPSBudWxsKSwgbWFwKGMgPT4gYyEpKTtcbiAgfVxuXG4gIHNhdmVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUNob2ljZXNPcmlnaW4oXG4gICAgICAgIHtsYWJlbDogdGhpcy5lZGl0b3IubGFiZWwsIG5hbWU6IHRoaXMuZWRpdG9yLm5hbWUsIGNob2ljZXM6IHRoaXMuZWRpdG9yLmNob2ljZXNBcnJ9KTtcbiAgfVxuXG4gIGNhbmNlbENob2ljZXNPcmlnaW5FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTtcbiAgfVxufVxuIl19