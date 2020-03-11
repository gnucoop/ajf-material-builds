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
var AjfReportBuilderThemeColorDialog = /** @class */ (function () {
    function AjfReportBuilderThemeColorDialog(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.currentWidget = null;
        this.currentColor = 'rgb(255,255,255,0)';
        this.section = 'color';
        this._currentWidgetSub = Subscription.EMPTY;
    }
    AjfReportBuilderThemeColorDialog.prototype.setWidgetStyles = function (value) {
        this._service.setWidgetStyles(this.section, value);
        this.currentColor = value;
        this.setStyle();
    };
    AjfReportBuilderThemeColorDialog.prototype.setStyle = function () {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    };
    AjfReportBuilderThemeColorDialog.prototype.addCustomColor = function () {
        this._service.addCustomColor(this.currentColor);
        this._service.updateCurrentWidget(this.currentWidget);
        this._dialogRef.close();
    };
    AjfReportBuilderThemeColorDialog.prototype.close = function () {
        this._dialogRef.close();
    };
    AjfReportBuilderThemeColorDialog.prototype.ngOnInit = function () {
        var _this = this;
        this._currentWidgetSub = this._service.currentWidget
            .subscribe(function (x) {
            if (x !== null) {
                if (_this.currentWidget !== x) {
                    _this.currentWidget = x;
                }
            }
            else {
                _this.currentWidget = null;
            }
        });
    };
    AjfReportBuilderThemeColorDialog.prototype.ngAfterViewInit = function () {
        this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
    };
    AjfReportBuilderThemeColorDialog.prototype.ngOnDestroy = function () {
        this._currentWidgetSub.unsubscribe();
    };
    AjfReportBuilderThemeColorDialog.decorators = [
        { type: Component, args: [{
                    selector: 'theme-color-dialog',
                    template: "<div mat-dialog-content #colorpic>\n   <input\n          [hidden]=false\n          [colorPicker]=\"currentColor\"\n          [style.background]=\"currentColor\"\n          [value]=\"currentColor\"\n          [cpDialogDisplay]=\"'inline'\"\n          [cpPosition]=\"'top'\"\n          [cpToggle]=\"true\"\n          [cpWidth]=\"'400px'\"\n          [cpOutputFormat]=\"'rgba'\"\n          (colorPickerChange)=\"setWidgetStyles($event)\"/>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"addCustomColor()\">Save color</button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderThemeColorDialog.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfReportBuilderThemeColorDialog.propDecorators = {
        elem: [{ type: ViewChild, args: ['colorpic', { static: true },] }]
    };
    return AjfReportBuilderThemeColorDialog;
}());
export { AjfReportBuilderThemeColorDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3ItZGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3RoZW1lLWNvbG9yLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBcUIsU0FBUyxFQUFFLGlCQUFpQixFQUNuRyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTtJQWlCRSwwQ0FDVSxRQUFpQyxFQUNqQyxVQUEwRDtRQUQxRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFnRDtRQVRwRSxrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFFckMsaUJBQVksR0FBRyxvQkFBb0IsQ0FBQztRQUNwQyxZQUFPLEdBQVcsT0FBTyxDQUFDO1FBRWxCLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBS3pELENBQUM7SUFFTCwwREFBZSxHQUFmLFVBQWdCLEtBQVU7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELG1EQUFRLEdBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCx5REFBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdEQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFDRCxtREFBUSxHQUFSO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO2FBQ2pELFNBQVMsQ0FBQyxVQUFBLENBQUM7WUFDVixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2QsSUFBSSxLQUFJLENBQUMsYUFBYSxLQUFLLENBQUMsRUFBRTtvQkFDNUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0Y7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwREFBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUN6RixDQUFDO0lBRUQsc0RBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDOztnQkE5REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLG1qQkFBc0M7b0JBQ3RDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7Ozs7Z0JBUE8sdUJBQXVCO2dCQUh2QixZQUFZOzs7dUJBWWpCLFNBQVMsU0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDOztJQXdEdkMsdUNBQUM7Q0FBQSxBQS9ERCxJQStEQztTQXpEWSxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhlbWUtY29sb3ItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICd0aGVtZS1jb2xvci1kaWFsb2cuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nIGltcGxlbWVudHMgT25Jbml0ICwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnY29sb3JwaWMnLCB7c3RhdGljOiB0cnVlfSlcbiAgZWxlbTogYW55O1xuXG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcblxuICBjdXJyZW50Q29sb3IgPSAncmdiKDI1NSwyNTUsMjU1LDApJztcbiAgc2VjdGlvbjogc3RyaW5nID0gJ2NvbG9yJztcblxuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2c+XG4gICkgeyB9XG5cbiAgc2V0V2lkZ2V0U3R5bGVzKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFdpZGdldFN0eWxlcyh0aGlzLnNlY3Rpb24sIHZhbHVlKTtcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IHZhbHVlO1xuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgfVxuXG4gIHNldFN0eWxlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzID0gZGVlcENvcHkodGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICBhZGRDdXN0b21Db2xvcigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbUNvbG9yKHRoaXMuY3VycmVudENvbG9yKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgICB0aGlzLl9kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGlmICh4ICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPT0geCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMV0uZmlyc3RFbGVtZW50Q2hpbGRbJ3N0eWxlJ11bJ3Bvc2l0aW9uJ10gPSAnaW5pdGlhbCc7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==