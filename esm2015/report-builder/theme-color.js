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
let AjfReportBuilderThemeColor = /** @class */ (() => {
    class AjfReportBuilderThemeColor {
        constructor(_service, dialog) {
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
        setStyles(value) {
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
        }
        setChartStyle(value) {
            if (this.label === 'backgroundColor') {
                this.addChartBackgroundColor(value);
            }
            else {
                this.addChartBorderColor(value);
            }
        }
        setAlphaColor(value) {
            value = value.toFixed(2);
            for (let i = 0; i < this.colors.length; i++) {
                let lastComma = this.colors[i].lastIndexOf(',');
                this.colors[i] = this.colors[i].substring(0, lastComma) + ',' + value + ')';
            }
        }
        /**
         * call to service to add new style to widget
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        setWidgetStyles(value) {
            if (this.section === 'chart') {
                this.setChartStyle(value);
            }
            else {
                this._service.setWidgetStyles(this.label, value);
                this.currentColor = value;
                this.setStyle();
            }
        }
        /**
         * call to service to add new style to section
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        setSectionStyles(value) {
            this._service.setSectionStyles(this.origin, this.label, value);
            this.styleColor = value;
        }
        /**
         * call to service to add new style to report
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        setReportStyles(value) {
            this._service.setReportStyles(this.label, value);
            this.styleBackgroundColor = value;
        }
        /**
         * call to service to add background color to current chart
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        addChartBackgroundColor(value) {
            this._service.addChartBackgroundColor(value);
        }
        /**
         * call to service to add border color to current chart
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        addChartBorderColor(value) {
            this._service.addChartBorderColor(value);
        }
        setStyle() {
            if (this.currentWidget == null) {
                return;
            }
            this.currentWidget.styles = deepCopy(this.currentWidget.styles);
            this._service.updateCurrentWidget(this.currentWidget);
        }
        openDialog() {
            this.dialogRef = this.dialog.open(AjfReportBuilderThemeColorDialog);
        }
        ngOnInit() {
            this._colorsSub = this._service.colors.subscribe(x => {
                this.colors = x;
            });
            this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
                if (x != null) {
                    if (this.currentWidget !== x) {
                        this.currentWidget = x;
                    }
                }
                else {
                    this.currentWidget = null;
                }
            });
            this.getColorWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null) {
                    return myObj.styles['color'] || '';
                }
            }), distinctUntilChanged());
            this._originSub = this._service.origin.subscribe(s => {
                this.origin = s;
            });
            this._headerStyleSub = this._service.headerStyles.subscribe(s => {
                if (s['background-color'] != null) {
                    this.styleBackgroundColor = s['background-color'];
                }
            });
            this._contentStylesSub = this._service.contentStyles.subscribe(s => {
                if (s['background-color'] != null) {
                    this.styleBackgroundColor = s['background-color'];
                }
            });
            this._footerStylesSub = this._service.footerStyles.subscribe(s => {
                if (s['background-color'] != null) {
                    this.styleBackgroundColor = s['background-color'];
                }
            });
        }
        ngOnDestroy() {
            this._colorsSub.unsubscribe();
            this._currentWidgetSub.unsubscribe();
            this._originSub.unsubscribe();
            this._headerStyleSub.unsubscribe();
            this._contentStylesSub.unsubscribe();
            this._footerStylesSub.unsubscribe();
        }
    }
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
    AjfReportBuilderThemeColor.ctorParameters = () => [
        { type: AjfReportBuilderService },
        { type: MatDialog }
    ];
    AjfReportBuilderThemeColor.propDecorators = {
        section: [{ type: Input }],
        label: [{ type: Input }],
        init: [{ type: Input }]
    };
    return AjfReportBuilderThemeColor;
})();
export { AjfReportBuilderThemeColor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdGhlbWUtY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRFOzs7O0dBSUc7QUFDSDtJQUFBLE1BT2EsMEJBQTBCO1FBa0NyQyxZQUFvQixRQUFpQyxFQUFTLE1BQWlCO1lBQTNELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQWpDL0Usa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1lBRXJDLGVBQVUsR0FBVyxDQUFDLENBQUM7WUFRdkIseUJBQW9CLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsZUFBVSxHQUFHLGNBQWMsQ0FBQztZQWVwQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDOUMsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDckQsZUFBVSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzlDLG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxL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Q0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7Z0JBM01GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQiwyc0NBQStCO29CQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFkTyx1QkFBdUI7Z0JBSnZCLFNBQVM7OzswQkFpQ2QsS0FBSzt3QkFFTCxLQUFLO3VCQUVMLEtBQUs7O0lBbUxSLGlDQUFDO0tBQUE7U0FyTVksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nfSBmcm9tICcuL3RoZW1lLWNvbG9yLWRpYWxvZyc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgcmVwb3J0IHRleHRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi10aGVtZS1jb2xvcicsXG4gIHRlbXBsYXRlVXJsOiAndGhlbWUtY29sb3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0aGVtZS1jb2xvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3IgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcblxuICBhbHBoYUNvbG9yOiBudW1iZXIgPSAxO1xuICBjb2xvcnM6IHN0cmluZ1tdO1xuICBjdXJyZW50Q29sb3I6IHN0cmluZztcblxuICBnZXRDb2xvcldpZGdldDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nPjtcblxuICBzdHlsZUJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LDI1NSwyNTUsMCknO1xuICBzdHlsZUNvbG9yID0gJ3JnYigwLDAsMCwwKSc7XG5cbiAgQElucHV0KCkgc2VjdGlvbjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgaW5pdDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgb3JpZ2luOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfY29sb3JzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb3JpZ2luU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2hlYWRlclN0eWxlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykge31cblxuICBzZXRTdHlsZXModmFsdWU6IGFueSkge1xuICAgIHN3aXRjaCAodGhpcy5zZWN0aW9uKSB7XG4gICAgICBjYXNlICd3aWRnZXQnOlxuICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwb3J0JzpcbiAgICAgICAgdGhpcy5zZXRSZXBvcnRTdHlsZXModmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NlY3Rpb24nOlxuICAgICAgICB0aGlzLnNldFNlY3Rpb25TdHlsZXModmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NoYXJ0JzpcbiAgICAgICAgdGhpcy5zZXRDaGFydFN0eWxlKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2hhcnRTdHlsZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMubGFiZWwgPT09ICdiYWNrZ3JvdW5kQ29sb3InKSB7XG4gICAgICB0aGlzLmFkZENoYXJ0QmFja2dyb3VuZENvbG9yKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRDaGFydEJvcmRlckNvbG9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRBbHBoYUNvbG9yKHZhbHVlOiBhbnkpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnRvRml4ZWQoMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGxhc3RDb21tYSA9IHRoaXMuY29sb3JzW2ldLmxhc3RJbmRleE9mKCcsJyk7XG4gICAgICB0aGlzLmNvbG9yc1tpXSA9IHRoaXMuY29sb3JzW2ldLnN1YnN0cmluZygwLCBsYXN0Q29tbWEpICsgJywnICsgdmFsdWUgKyAnKSc7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5zZWN0aW9uID09PSAnY2hhcnQnKSB7XG4gICAgICB0aGlzLnNldENoYXJ0U3R5bGUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLnNldFdpZGdldFN0eWxlcyh0aGlzLmxhYmVsLCB2YWx1ZSk7XG4gICAgICB0aGlzLmN1cnJlbnRDb2xvciA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXRTdHlsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIG5ldyBzdHlsZSB0byBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRTZWN0aW9uU3R5bGVzKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFNlY3Rpb25TdHlsZXModGhpcy5vcmlnaW4sIHRoaXMubGFiZWwsIHZhbHVlKTtcbiAgICB0aGlzLnN0eWxlQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIG5ldyBzdHlsZSB0byByZXBvcnRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFJlcG9ydFN0eWxlcyh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRSZXBvcnRTdHlsZXModGhpcy5sYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIGJhY2tncm91bmQgY29sb3IgdG8gY3VycmVudCBjaGFydFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGFkZENoYXJ0QmFja2dyb3VuZENvbG9yKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZENoYXJ0QmFja2dyb3VuZENvbG9yKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIGJvcmRlciBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ2hhcnRCb3JkZXJDb2xvcih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDaGFydEJvcmRlckNvbG9yKHZhbHVlKTtcbiAgfVxuXG4gIHNldFN0eWxlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzID0gZGVlcENvcHkodGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICBvcGVuRGlhbG9nKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvckRpYWxvZyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9jb2xvcnNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbG9ycy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmNvbG9ycyA9IHg7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPT0geCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IHg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmdldENvbG9yV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5zdHlsZXNbJ2NvbG9yJ10gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLl9vcmlnaW5TdWIgPSB0aGlzLl9zZXJ2aWNlLm9yaWdpbi5zdWJzY3JpYmUocyA9PiB7XG4gICAgICB0aGlzLm9yaWdpbiA9IHM7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViID0gdGhpcy5fc2VydmljZS5mb290ZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2xvcnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faGVhZGVyU3R5bGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jb250ZW50U3R5bGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==