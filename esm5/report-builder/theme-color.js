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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdGhlbWUtY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixpQkFBaUIsRUFDaEYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRFOzs7O0dBSUc7QUFDSDtJQTRDRSxvQ0FDVSxRQUFpQyxFQUNsQyxNQUFpQjtRQURoQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBdEMxQixrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFFckMsZUFBVSxHQUFXLENBQUMsQ0FBQztRQVF2Qix5QkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxlQUFVLEdBQUcsY0FBYyxDQUFDO1FBa0JwQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDOUMsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsZUFBVSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlDLG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxLQUFL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QyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdEQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnQkFyTkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDJzQ0FBK0I7b0JBRS9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWRPLHVCQUF1QjtnQkFKdkIsU0FBUzs7OzBCQWlDZCxLQUFLO3dCQUdMLEtBQUs7dUJBR0wsS0FBSzs7SUEyTFIsaUNBQUM7Q0FBQSxBQXRORCxJQXNOQztTQS9NWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2d9IGZyb20gJy4vdGhlbWUtY29sb3ItZGlhbG9nJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBtYW5hZ2VzIHRoZSByZXBvcnQgdGV4dFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRoZW1lLWNvbG9yJyxcbiAgdGVtcGxhdGVVcmw6ICd0aGVtZS1jb2xvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RoZW1lLWNvbG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuXG4gIGFscGhhQ29sb3I6IG51bWJlciA9IDE7XG4gIGNvbG9yczogc3RyaW5nW107XG4gIGN1cnJlbnRDb2xvcjogc3RyaW5nO1xuXG4gIGdldENvbG9yV2lkZ2V0OiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2c+O1xuXG4gIHN0eWxlQmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsMjU1LDI1NSwwKSc7XG4gIHN0eWxlQ29sb3IgPSAncmdiKDAsMCwwLDApJztcblxuICBASW5wdXQoKVxuICBzZWN0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBpbml0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHRoZSBuYW1lIG9mIHRoZSBzZWN0aW9uIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnRXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBvcmlnaW46IHN0cmluZztcblxuICBwcml2YXRlIF9jb2xvcnNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vcmlnaW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7XG4gIH1cblxuICBzZXRTdHlsZXModmFsdWU6IGFueSkge1xuICAgIHN3aXRjaCAodGhpcy5zZWN0aW9uKSB7XG4gICAgICBjYXNlICd3aWRnZXQnOlxuICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwb3J0JzpcbiAgICAgICAgdGhpcy5zZXRSZXBvcnRTdHlsZXModmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICB0aGlzLnNldFNlY3Rpb25TdHlsZXModmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoYXJ0JzpcbiAgICAgICAgdGhpcy5zZXRDaGFydFN0eWxlKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2hhcnRTdHlsZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMubGFiZWwgPT09ICdiYWNrZ3JvdW5kQ29sb3InKSB7XG4gICAgICB0aGlzLmFkZENoYXJ0QmFja2dyb3VuZENvbG9yKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDaGFydEJvcmRlckNvbG9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRBbHBoYUNvbG9yKHZhbHVlOiBhbnkpIHtcblxuICAgIHZhbHVlID0gdmFsdWUudG9GaXhlZCgyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbGFzdENvbW1hID0gdGhpcy5jb2xvcnNbaV0ubGFzdEluZGV4T2YoJywnKTtcbiAgICAgIHRoaXMuY29sb3JzW2ldID0gdGhpcy5jb2xvcnNbaV0uc3Vic3RyaW5nKDAsIGxhc3RDb21tYSkgKyAnLCcgKyB2YWx1ZSArICcpJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXModmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLnNlY3Rpb24gPT09ICdjaGFydCcpIHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRTdHlsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0V2lkZ2V0U3R5bGVzKHRoaXMubGFiZWwsIHZhbHVlKTtcbiAgICAgIHRoaXMuY3VycmVudENvbG9yID0gdmFsdWU7XG4gICAgICB0aGlzLnNldFN0eWxlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXModmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0U2VjdGlvblN0eWxlcyh0aGlzLm9yaWdpbiwgdGhpcy5sYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHJlcG9ydFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydFN0eWxlcyh0aGlzLmxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYmFja2dyb3VuZCBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYm9yZGVyIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBhZGRDaGFydEJvcmRlckNvbG9yKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZENoYXJ0Qm9yZGVyQ29sb3IodmFsdWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMgPSBkZWVwQ29weSh0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gICAgdGhpcy5fY29sb3JzU3ViID0gdGhpcy5fc2VydmljZS5jb2xvcnNcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMuY29sb3JzID0geDtcbiAgICAgIH1cbiAgICAgICk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0XG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPT0geCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLmdldENvbG9yV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5zdHlsZXNbJ2NvbG9yJ10gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLl9vcmlnaW5TdWIgPSB0aGlzLl9zZXJ2aWNlLm9yaWdpbi5zdWJzY3JpYmUocyA9PiB7XG4gICAgICB0aGlzLm9yaWdpbiA9IHM7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViID0gdGhpcy5fc2VydmljZS5mb290ZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2xvcnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faGVhZGVyU3R5bGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jb250ZW50U3R5bGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuIl19