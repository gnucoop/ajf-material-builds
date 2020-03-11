/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/theme-color-dialog.ts
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
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
export class AjfReportBuilderThemeColorDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     */
    constructor(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.currentWidget = null;
        this.currentColor = 'rgb(255,255,255,0)';
        this.section = 'color';
        this._currentWidgetSub = Subscription.EMPTY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setWidgetStyles(value) {
        this._service.setWidgetStyles(this.section, value);
        this.currentColor = value;
        this.setStyle();
    }
    /**
     * @return {?}
     */
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * @return {?}
     */
    addCustomColor() {
        this._service.addCustomColor(this.currentColor);
        this._service.updateCurrentWidget(this.currentWidget);
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    close() {
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x !== null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                }
            }
            else {
                this.currentWidget = null;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderThemeColorDialog.decorators = [
    { type: Component, args: [{
                selector: 'theme-color-dialog',
                template: "<div mat-dialog-content #colorpic>\n   <input\n          [hidden]=false\n          [colorPicker]=\"currentColor\"\n          [style.background]=\"currentColor\"\n          [value]=\"currentColor\"\n          [cpDialogDisplay]=\"'inline'\"\n          [cpPosition]=\"'top'\"\n          [cpToggle]=\"true\"\n          [cpWidth]=\"'400px'\"\n          [cpOutputFormat]=\"'rgba'\"\n          (colorPickerChange)=\"setWidgetStyles($event)\"/>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"addCustomColor()\">Save color</button>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AjfReportBuilderThemeColorDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];
AjfReportBuilderThemeColorDialog.propDecorators = {
    elem: [{ type: ViewChild, args: ['colorpic', { static: true },] }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.elem;
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.currentColor;
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.section;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColorDialog.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColorDialog.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColorDialog.prototype._dialogRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3ItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3RoZW1lLWNvbG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFFLGlCQUFpQixFQUNuRyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVFqRSxNQUFNLE9BQU8sZ0NBQWdDOzs7OztJQVczQyxZQUNVLFFBQWlDLEVBQ2pDLFVBQTBEO1FBRDFELGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQWdEO1FBVHBFLGtCQUFhLEdBQW1CLElBQUksQ0FBQztRQUVyQyxpQkFBWSxHQUFHLG9CQUFvQixDQUFDO1FBQ3BDLFlBQU8sR0FBVyxPQUFPLENBQUM7UUFFbEIsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFLekQsQ0FBQzs7Ozs7SUFFTCxlQUFlLENBQUMsS0FBVTtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO2FBQ2pELFNBQVM7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDZCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssQ0FBQyxFQUFFO29CQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztpQkFDeEI7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzthQUMzQjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3pGLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsbWpCQUFzQztnQkFDdEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBUE8sdUJBQXVCO1lBSHZCLFlBQVk7OzttQkFZakIsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Ozs7SUFBckMsZ0RBQ1U7O0lBRVYseURBQXFDOztJQUVyQyx3REFBb0M7O0lBQ3BDLG1EQUEwQjs7Ozs7SUFFMUIsNkRBQTZEOzs7OztJQUczRCxvREFBeUM7Ozs7O0lBQ3pDLHNEQUFrRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aGVtZS1jb2xvci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3RoZW1lLWNvbG9yLWRpYWxvZy5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQgLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdjb2xvcnBpYycsIHtzdGF0aWM6IHRydWV9KVxuICBlbGVtOiBhbnk7XG5cbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuXG4gIGN1cnJlbnRDb2xvciA9ICdyZ2IoMjU1LDI1NSwyNTUsMCknO1xuICBzZWN0aW9uOiBzdHJpbmcgPSAnY29sb3InO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZz5cbiAgKSB7IH1cblxuICBzZXRXaWRnZXRTdHlsZXModmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0V2lkZ2V0U3R5bGVzKHRoaXMuc2VjdGlvbiwgdmFsdWUpO1xuICAgIHRoaXMuY3VycmVudENvbG9yID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdHlsZSgpO1xuICB9XG5cbiAgc2V0U3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMgPSBkZWVwQ29weSh0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgfVxuXG4gIGFkZEN1c3RvbUNvbG9yKCkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ3VzdG9tQ29sb3IodGhpcy5jdXJyZW50Q29sb3IpO1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQpO1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldFxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgaWYgKHggIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9PSB4KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVsZW0ubmF0aXZlRWxlbWVudC5jaGlsZHJlblsxXS5maXJzdEVsZW1lbnRDaGlsZFsnc3R5bGUnXVsncG9zaXRpb24nXSA9ICdpbml0aWFsJztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19