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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderThemeColorDialog } from './theme-color-dialog';
/**
 * this component manages the report text
 *
 * @export
 */
var AjfReportBuilderThemeColor = /** @class */ (function () {
    function AjfReportBuilderThemeColor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.currentWidget = null;
        this.alphaColor = 1;
        this.styleBackgroundColor = 'rgb(255,255,255,0)';
        this.styleColor = 'rgb(0,0,0,0)';
        this._colorsSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this._originSub = Subscription.EMPTY;
        this._headerStyleSub = Subscription.EMPTY;
        this._contentStylesSub = Subscription.EMPTY;
        this._footerStylesSub = Subscription.EMPTY;
    }
    AjfReportBuilderThemeColor.prototype.setStyles = function (value) {
        switch (this.section) {
            case 'widget':
                this.setWidgetStyles(value);
                break;
            case 'report':
                this.setReportStyles(value);
                break;
            case 'section':
                this.setSectionStyles(value);
                break;
            case 'chart':
                this.setChartStyle(value);
                break;
        }
    };
    AjfReportBuilderThemeColor.prototype.setChartStyle = function (value) {
        if (this.label === 'backgroundColor') {
            this.addChartBackgroundColor(value);
        }
        else {
            this.addChartBorderColor(value);
        }
    };
    AjfReportBuilderThemeColor.prototype.setAlphaColor = function (value) {
        value = value.toFixed(2);
        for (var i = 0; i < this.colors.length; i++) {
            var lastComma = this.colors[i].lastIndexOf(',');
            this.colors[i] = this.colors[i].substring(0, lastComma) + ',' + value + ')';
        }
    };
    /**
     * call to service to add new style to widget
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderThemeColor.prototype.setWidgetStyles = function (value) {
        if (this.section === 'chart') {
            this.setChartStyle(value);
        }
        else {
            this._service.setWidgetStyles(this.label, value);
            this.currentColor = value;
            this.setStyle();
        }
    };
    /**
     * call to service to add new style to section
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderThemeColor.prototype.setSectionStyles = function (value) {
        this._service.setSectionStyles(this.origin, this.label, value);
        this.styleColor = value;
    };
    /**
     * call to service to add new style to report
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderThemeColor.prototype.setReportStyles = function (value) {
        this._service.setReportStyles(this.label, value);
        this.styleBackgroundColor = value;
    };
    /**
     * call to service to add background color to current chart
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderThemeColor.prototype.addChartBackgroundColor = function (value) {
        this._service.addChartBackgroundColor(value);
    };
    /**
     * call to service to add border color to current chart
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderThemeColor.prototype.addChartBorderColor = function (value) {
        this._service.addChartBorderColor(value);
    };
    AjfReportBuilderThemeColor.prototype.setStyle = function () {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    };
    AjfReportBuilderThemeColor.prototype.openDialog = function () {
        this.dialogRef = this.dialog.open(AjfReportBuilderThemeColorDialog);
    };
    AjfReportBuilderThemeColor.prototype.ngOnInit = function () {
        var _this = this;
        this._colorsSub = this._service.colors
            .subscribe(function (x) {
            _this.colors = x;
        });
        this._currentWidgetSub = this._service.currentWidget
            .subscribe(function (x) {
            if (x != null) {
                if (_this.currentWidget !== x) {
                    _this.currentWidget = x;
                }
            }
            else {
                _this.currentWidget = null;
            }
        });
        this.getColorWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null) {
                return myObj.styles['color'] || '';
            }
        }), distinctUntilChanged());
        this._originSub = this._service.origin.subscribe(function (s) {
            _this.origin = s;
        });
        this._headerStyleSub = this._service.headerStyles.subscribe(function (s) {
            if (s['background-color'] != null) {
                _this.styleBackgroundColor = s['background-color'];
            }
        });
        this._contentStylesSub = this._service.contentStyles.subscribe(function (s) {
            if (s['background-color'] != null) {
                _this.styleBackgroundColor = s['background-color'];
            }
        });
        this._footerStylesSub = this._service.footerStyles.subscribe(function (s) {
            if (s['background-color'] != null) {
                _this.styleBackgroundColor = s['background-color'];
            }
        });
    };
    AjfReportBuilderThemeColor.prototype.ngOnDestroy = function () {
        this._colorsSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
        this._originSub.unsubscribe();
        this._headerStyleSub.unsubscribe();
        this._contentStylesSub.unsubscribe();
        this._footerStylesSub.unsubscribe();
    };
    AjfReportBuilderThemeColor.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-theme-color',
                    template: "<mat-card style=\"width:90%\">\n  <mat-card-header>\n    <mat-card-title> {{ label }} Trasparency</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n       <mat-slider\n      style=\"width:90%\"\n      (change)=\"setAlphaColor($event.value)\"\n      min=\"0\"\n      max=\"1\"\n      step=\"0.1\"\n      [value]=\"alphaColor\"\n      thumbLabel>\n    </mat-slider>\n  </mat-card-content>\n</mat-card>\n<mat-card style=\"width:90%\">\n  <mat-card-header>\n    <mat-card-title> {{ label }} </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n    <mat-grid-list\n      cols=\"8\"\n      rowHeight=\"25px\">\n      <mat-grid-tile\n        *ngFor=\"let color of colors\"\n        [colspan]=\"1\"\n        [rowspan]=\"1\"\n        [style.background]=\"color\">\n        <button\n          style=\"height:100%\"\n          (click)=\"setStyles(color)\"\n          mat-button>\n        </button>\n      </mat-grid-tile>\n    </mat-grid-list>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-button (click)=\"openDialog()\" style=\"width:90%;\">Add color</button>\n    <button mat-button (click)=\"setStyles('')\" style=\"width:90%\"> Reset </button>\n  </mat-card-actions>\n</mat-card>\n\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderThemeColor.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: MatDialog }
    ]; };
    AjfReportBuilderThemeColor.propDecorators = {
        section: [{ type: Input }],
        label: [{ type: Input }],
        init: [{ type: Input }]
    };
    return AjfReportBuilderThemeColor;
}());
export { AjfReportBuilderThemeColor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdGhlbWUtY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixpQkFBaUIsRUFDaEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRFOzs7O0dBSUc7QUFDSDtJQTRDRSxvQ0FDVSxRQUFpQyxFQUNsQyxNQUFpQjtRQURoQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBdEMxQixrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFFckMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQVF2Qix5QkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxlQUFVLEdBQUcsY0FBYyxDQUFDO1FBa0JwQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDOUMsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsZUFBVSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlDLG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxLQUFL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QyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdEQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnQkFyTkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDJzQ0FBK0I7b0JBRS9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWRPLHVCQUF1QjtnQkFKdkIsU0FBUzs7OzBCQWlDZCxLQUFLO3dCQUdMLEtBQUs7dUJBR0wsS0FBSzs7SUEyTFIsaUNBQUM7Q0FBQSxBQXRORCxJQXNOQztTQS9NWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZ30gZnJvbSAnLi90aGVtZS1jb2xvci1kaWFsb2cnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IG1hbmFnZXMgdGhlIHJlcG9ydCB0ZXh0XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGhlbWUtY29sb3InLFxuICB0ZW1wbGF0ZVVybDogJ3RoZW1lLWNvbG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGhlbWUtY29sb3IuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cbiAgYWxwaGFDb2xvcjogbnVtYmVyID0gMTtcbiAgY29sb3JzOiBzdHJpbmdbXTtcbiAgY3VycmVudENvbG9yOiBzdHJpbmc7XG5cbiAgZ2V0Q29sb3JXaWRnZXQ6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZz47XG5cbiAgc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwyNTUsMjU1LDApJztcbiAgc3R5bGVDb2xvciA9ICdyZ2IoMCwwLDAsMCknO1xuXG4gIEBJbnB1dCgpXG4gIHNlY3Rpb246IHN0cmluZztcblxuICBASW5wdXQoKVxuICBsYWJlbDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGluaXQ6IHN0cmluZztcblxuICAvKipcbiAgICogdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudFdpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIG9yaWdpbjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2NvbG9yc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29yaWdpblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9oZWFkZXJTdHlsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb250ZW50U3R5bGVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvb3RlclN0eWxlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHtcbiAgfVxuXG4gIHNldFN0eWxlcyh2YWx1ZTogYW55KSB7XG4gICAgc3dpdGNoICh0aGlzLnNlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3dpZGdldCc6XG4gICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBvcnQnOlxuICAgICAgICB0aGlzLnNldFJlcG9ydFN0eWxlcyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgIHRoaXMuc2V0U2VjdGlvblN0eWxlcyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hhcnQnOlxuICAgICAgICB0aGlzLnNldENoYXJ0U3R5bGUodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXRDaGFydFN0eWxlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PT0gJ2JhY2tncm91bmRDb2xvcicpIHtcbiAgICAgIHRoaXMuYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENoYXJ0Qm9yZGVyQ29sb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldEFscGhhQ29sb3IodmFsdWU6IGFueSkge1xuXG4gICAgdmFsdWUgPSB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBsYXN0Q29tbWEgPSB0aGlzLmNvbG9yc1tpXS5sYXN0SW5kZXhPZignLCcpO1xuICAgICAgdGhpcy5jb2xvcnNbaV0gPSB0aGlzLmNvbG9yc1tpXS5zdWJzdHJpbmcoMCwgbGFzdENvbW1hKSArICcsJyArIHZhbHVlICsgJyknO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIG5ldyBzdHlsZSB0byB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuc2VjdGlvbiA9PT0gJ2NoYXJ0Jykge1xuICAgICAgdGhpcy5zZXRDaGFydFN0eWxlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VydmljZS5zZXRXaWRnZXRTdHlsZXModGhpcy5sYWJlbCwgdmFsdWUpO1xuICAgICAgdGhpcy5jdXJyZW50Q29sb3IgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0U2VjdGlvblN0eWxlcyh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRTZWN0aW9uU3R5bGVzKHRoaXMub3JpZ2luLCB0aGlzLmxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5zdHlsZUNvbG9yID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gcmVwb3J0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXModmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0U3R5bGVzKHRoaXMubGFiZWwsIHZhbHVlKTtcbiAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBiYWNrZ3JvdW5kIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBhZGRDaGFydEJhY2tncm91bmRDb2xvcih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDaGFydEJhY2tncm91bmRDb2xvcih2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBib3JkZXIgY29sb3IgdG8gY3VycmVudCBjaGFydFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGFkZENoYXJ0Qm9yZGVyQ29sb3IodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ2hhcnRCb3JkZXJDb2xvcih2YWx1ZSk7XG4gIH1cblxuICBzZXRTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyA9IGRlZXBDb3B5KHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMpO1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQpO1xuICB9XG5cbiAgb3BlbkRpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2cpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgICB0aGlzLl9jb2xvcnNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbG9yc1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5jb2xvcnMgPSB4O1xuICAgICAgfVxuICAgICAgKTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9PSB4KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuZ2V0Q29sb3JXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLnN0eWxlc1snY29sb3InXSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuX29yaWdpblN1YiA9IHRoaXMuX3NlcnZpY2Uub3JpZ2luLnN1YnNjcmliZShzID0+IHtcbiAgICAgIHRoaXMub3JpZ2luID0gcztcbiAgICB9KTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlU3ViID0gdGhpcy5fc2VydmljZS5oZWFkZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fY29udGVudFN0eWxlc1N1YiA9IHRoaXMuX3NlcnZpY2UuY29udGVudFN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvb3RlclN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbG9yc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmlnaW5TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG4iXX0=