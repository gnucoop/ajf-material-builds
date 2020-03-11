/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/toolbar.ts
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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
export class AjfReportBuilderToolbar {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        // this is an any EventEmitter
        this.addClick = new EventEmitter();
        this.zoom = false;
        this.emptyContent = this._service.emptyContent;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canDropPredicate(item) {
        return item.data.dropZones.indexOf('widget') > -1;
    }
    /**
     * @return {?}
     */
    JSONRequest() {
    }
    /**
     * this method will pass event to event emitter
     * @param {?} event
     * @return {?}
     */
    onAddClick(event) {
        this.addClick.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addToList(event) {
        if (event.item.data.widget != null) {
            this._service.addCustomWidgets({
                json: JSON.stringify(event.item.data.widget.toJson()),
                type: ''
            });
        }
    }
    /**
     * @return {?}
     */
    undoLastOperation() {
        try {
            /** @type {?} */
            let myObj = JSON.parse(this._service.popJsonStack() || '');
            this._service.setReport(deepCopy(myObj));
        }
        catch (e) { }
    }
    /**
     * @return {?}
     */
    isZoomed() {
        this.zoom = !this.zoom;
        if (this.zoom) {
            this._service.fixedZoomIn();
        }
        else {
            this._service.fixedZoomOut();
        }
    }
    /**
     * @return {?}
     */
    openDialog() {
        this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
    }
}
AjfReportBuilderToolbar.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-toolbar',
                outputs: ['addClick'],
                template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.addClick;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.dialogRef;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.zoom;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.lastJson;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.emptyContent;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderToolbar.prototype._service;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci90b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFJakUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFVL0Q7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7SUFVbEMsWUFDVSxRQUFpQyxFQUNsQyxNQUFpQjtRQURoQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFXOztRQVYxQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFdEQsU0FBSSxHQUFHLEtBQUssQ0FBQztRQVNULElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxJQUF1QztRQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQsV0FBVztJQUNYLENBQUM7Ozs7OztJQUlELFVBQVUsQ0FBQyxLQUFVO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEtBQTRDO1FBQ3BELElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3JELElBQUksRUFBRSxFQUFFO2FBQ1QsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSTs7Z0JBQ0UsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0lBQ2pCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ25FLENBQUM7OztZQXBFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO2dCQUVyQiwwcUNBQTJCO2dCQUMzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVk8sdUJBQXVCO1lBSnZCLFNBQVM7Ozs7SUFxQmYsMkNBQXNEOztJQUN0RCw0Q0FBdUQ7O0lBQ3ZELHVDQUFhOztJQUViLDJDQUFpQjs7SUFFakIsK0NBQWtDOzs7OztJQUdoQywyQ0FBeUM7O0lBQ3pDLHlDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1kcmFnLWRhdGEnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2d9IGZyb20gJy4vdG9vbGJhci1kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItdG9vbGJhcicsXG4gIG91dHB1dHM6IFsnYWRkQ2xpY2snXSxcbiAgc3R5bGVVcmxzOiBbJ3Rvb2xiYXIuY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAndG9vbGJhci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgdG9vbGJhclxuICogQGltcGxlbWVudHMgOiBPbkRlc3Ryb3lcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyIHtcbiAgLy8gdGhpcyBpcyBhbiBhbnkgRXZlbnRFbWl0dGVyXG4gIGFkZENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZz47XG4gIHpvb20gPSBmYWxzZTtcblxuICBsYXN0SnNvbjogc3RyaW5nO1xuXG4gIGVtcHR5Q29udGVudDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHtcbiAgICAgIHRoaXMuZW1wdHlDb250ZW50ID0gdGhpcy5fc2VydmljZS5lbXB0eUNvbnRlbnQ7XG4gIH1cblxuICBjYW5Ecm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpdGVtLmRhdGEuZHJvcFpvbmVzLmluZGV4T2YoJ3dpZGdldCcpID4gLTE7XG4gIH1cblxuICBKU09OUmVxdWVzdCgpIHtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBwYXNzIGV2ZW50IHRvIGV2ZW50IGVtaXR0ZXJcbiAgICovXG4gIG9uQWRkQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBhZGRUb0xpc3QoZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pIHtcbiAgICBpZiAoZXZlbnQuaXRlbS5kYXRhLndpZGdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbVdpZGdldHMoe1xuICAgICAgICBqc29uOiBKU09OLnN0cmluZ2lmeShldmVudC5pdGVtLmRhdGEud2lkZ2V0LnRvSnNvbigpKSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVuZG9MYXN0T3BlcmF0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbXlPYmogPSBKU09OLnBhcnNlKHRoaXMuX3NlcnZpY2UucG9wSnNvblN0YWNrKCkgfHwgJycpO1xuICAgICAgdGhpcy5fc2VydmljZS5zZXRSZXBvcnQoZGVlcENvcHkobXlPYmopKTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxuXG4gIGlzWm9vbWVkKCkge1xuICAgIHRoaXMuem9vbSA9ICF0aGlzLnpvb207XG4gICAgaWYgKHRoaXMuem9vbSkge1xuICAgICAgdGhpcy5fc2VydmljZS5maXhlZFpvb21JbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmZpeGVkWm9vbU91dCgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nKTtcbiAgfVxufVxuIl19