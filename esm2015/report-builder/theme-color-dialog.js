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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderThemeColorDialog = /** @class */ (() => {
    let AjfReportBuilderThemeColorDialog = class AjfReportBuilderThemeColorDialog {
        constructor(_service, _dialogRef) {
            this._service = _service;
            this._dialogRef = _dialogRef;
            this.currentWidget = null;
            this.currentColor = 'rgb(255,255,255,0)';
            this.section = 'color';
            this._currentWidgetSub = Subscription.EMPTY;
        }
        setWidgetStyles(value) {
            this._service.setWidgetStyles(this.section, value);
            this.currentColor = value;
            this.setStyle();
        }
        setStyle() {
            if (this.currentWidget == null) {
                return;
            }
            this.currentWidget.styles = deepCopy(this.currentWidget.styles);
            this._service.updateCurrentWidget(this.currentWidget);
        }
        addCustomColor() {
            this._service.addCustomColor(this.currentColor);
            this._service.updateCurrentWidget(this.currentWidget);
            this._dialogRef.close();
        }
        close() {
            this._dialogRef.close();
        }
        ngOnInit() {
            this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
                if (x !== null) {
                    if (this.currentWidget !== x) {
                        this.currentWidget = x;
                    }
                }
                else {
                    this.currentWidget = null;
                }
            });
        }
        ngAfterViewInit() {
            this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
        }
        ngOnDestroy() {
            this._currentWidgetSub.unsubscribe();
        }
    };
    __decorate([
        ViewChild('colorpic', { static: true }),
        __metadata("design:type", Object)
    ], AjfReportBuilderThemeColorDialog.prototype, "elem", void 0);
    AjfReportBuilderThemeColorDialog = __decorate([
        Component({
            selector: 'theme-color-dialog',
            template: "<div mat-dialog-content #colorpic>\n   <input\n          [hidden]=false\n          [colorPicker]=\"currentColor\"\n          [style.background]=\"currentColor\"\n          [value]=\"currentColor\"\n          [cpDialogDisplay]=\"'inline'\"\n          [cpPosition]=\"'top'\"\n          [cpToggle]=\"true\"\n          [cpWidth]=\"'400px'\"\n          [cpOutputFormat]=\"'rgba'\"\n          (colorPickerChange)=\"setWidgetStyles($event)\"/>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"addCustomColor()\">Save color</button>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [AjfReportBuilderService,
            MatDialogRef])
    ], AjfReportBuilderThemeColorDialog);
    return AjfReportBuilderThemeColorDialog;
})();
export { AjfReportBuilderThemeColorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3ItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3RoZW1lLWNvbG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFRakU7SUFBQSxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztRQVUzQyxZQUNZLFFBQWlDLEVBQ2pDLFVBQTBEO1lBRDFELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQ2pDLGVBQVUsR0FBVixVQUFVLENBQWdEO1lBVHRFLGtCQUFhLEdBQW1CLElBQUksQ0FBQztZQUVyQyxpQkFBWSxHQUFHLG9CQUFvQixDQUFDO1lBQ3BDLFlBQU8sR0FBVyxPQUFPLENBQUM7WUFFbEIsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFJWSxDQUFDO1FBRTFFLGVBQWUsQ0FBQyxLQUFVO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFFRCxRQUFRO1lBQ04sSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtnQkFDOUIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVELGNBQWM7WUFDWixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsS0FBSztZQUNILElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELFFBQVE7WUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ2QsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLENBQUMsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNGO3FCQUFNO29CQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGVBQWU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3pGLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7S0FDRixDQUFBO0lBdkR3QztRQUF0QyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOztrRUFBVztJQUR0QyxnQ0FBZ0M7UUFONUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixtakJBQXNDO1lBQ3RDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBWXNCLHVCQUF1QjtZQUNyQixZQUFZO09BWnpCLGdDQUFnQyxDQXdENUM7SUFBRCx1Q0FBQztLQUFBO1NBeERZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aGVtZS1jb2xvci1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ3RoZW1lLWNvbG9yLWRpYWxvZy5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2NvbG9ycGljJywge3N0YXRpYzogdHJ1ZX0pIGVsZW06IGFueTtcblxuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cbiAgY3VycmVudENvbG9yID0gJ3JnYigyNTUsMjU1LDI1NSwwKSc7XG4gIHNlY3Rpb246IHN0cmluZyA9ICdjb2xvcic7XG5cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZz4pIHt9XG5cbiAgc2V0V2lkZ2V0U3R5bGVzKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFdpZGdldFN0eWxlcyh0aGlzLnNlY3Rpb24sIHZhbHVlKTtcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IHZhbHVlO1xuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgfVxuXG4gIHNldFN0eWxlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzID0gZGVlcENvcHkodGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICBhZGRDdXN0b21Db2xvcigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbUNvbG9yKHRoaXMuY3VycmVudENvbG9yKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgaWYgKHggIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPT0geCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IHg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMV0uZmlyc3RFbGVtZW50Q2hpbGRbJ3N0eWxlJ11bJ3Bvc2l0aW9uJ10gPSAnaW5pdGlhbCc7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==