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
export class AjfReportBuilderThemeColor {
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
            },] }
];
AjfReportBuilderThemeColor.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
AjfReportBuilderThemeColor.propDecorators = {
    section: [{ type: Input }],
    label: [{ type: Input }],
    init: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvdGhlbWUtY29sb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRFOzs7O0dBSUc7QUFRSCxNQUFNLE9BQU8sMEJBQTBCO0lBa0NyQyxZQUFvQixRQUFpQyxFQUFTLE1BQWlCO1FBQTNELGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQWpDL0Usa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1FBRXJDLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFRdkIseUJBQW9CLEdBQUcsb0JBQW9CLENBQUM7UUFDNUMsZUFBVSxHQUFHLGNBQWMsQ0FBQztRQWVwQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDOUMsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsZUFBVSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzlDLG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxL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QyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7OztZQTNNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsMnNDQUErQjtnQkFFL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBZE8sdUJBQXVCO1lBSnZCLFNBQVM7OztzQkFpQ2QsS0FBSztvQkFFTCxLQUFLO21CQUVMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2d9IGZyb20gJy4vdGhlbWUtY29sb3ItZGlhbG9nJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBtYW5hZ2VzIHRoZSByZXBvcnQgdGV4dFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXRoZW1lLWNvbG9yJyxcbiAgdGVtcGxhdGVVcmw6ICd0aGVtZS1jb2xvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RoZW1lLWNvbG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyVGhlbWVDb2xvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuXG4gIGFscGhhQ29sb3I6IG51bWJlciA9IDE7XG4gIGNvbG9yczogc3RyaW5nW107XG4gIGN1cnJlbnRDb2xvcjogc3RyaW5nO1xuXG4gIGdldENvbG9yV2lkZ2V0OiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlclRoZW1lQ29sb3JEaWFsb2c+O1xuXG4gIHN0eWxlQmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsMjU1LDI1NSwwKSc7XG4gIHN0eWxlQ29sb3IgPSAncmdiKDAsMCwwLDApJztcblxuICBASW5wdXQoKSBzZWN0aW9uOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKSBpbml0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHRoZSBuYW1lIG9mIHRoZSBzZWN0aW9uIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnRXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBvcmlnaW46IHN0cmluZztcblxuICBwcml2YXRlIF9jb2xvcnNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vcmlnaW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSwgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7fVxuXG4gIHNldFN0eWxlcyh2YWx1ZTogYW55KSB7XG4gICAgc3dpdGNoICh0aGlzLnNlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ3dpZGdldCc6XG4gICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBvcnQnOlxuICAgICAgICB0aGlzLnNldFJlcG9ydFN0eWxlcyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2VjdGlvbic6XG4gICAgICAgIHRoaXMuc2V0U2VjdGlvblN0eWxlcyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2hhcnQnOlxuICAgICAgICB0aGlzLnNldENoYXJ0U3R5bGUodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXRDaGFydFN0eWxlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PT0gJ2JhY2tncm91bmRDb2xvcicpIHtcbiAgICAgIHRoaXMuYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZENoYXJ0Qm9yZGVyQ29sb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldEFscGhhQ29sb3IodmFsdWU6IGFueSkge1xuICAgIHZhbHVlID0gdmFsdWUudG9GaXhlZCgyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbGFzdENvbW1hID0gdGhpcy5jb2xvcnNbaV0ubGFzdEluZGV4T2YoJywnKTtcbiAgICAgIHRoaXMuY29sb3JzW2ldID0gdGhpcy5jb2xvcnNbaV0uc3Vic3RyaW5nKDAsIGxhc3RDb21tYSkgKyAnLCcgKyB2YWx1ZSArICcpJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXModmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLnNlY3Rpb24gPT09ICdjaGFydCcpIHtcbiAgICAgIHRoaXMuc2V0Q2hhcnRTdHlsZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0V2lkZ2V0U3R5bGVzKHRoaXMubGFiZWwsIHZhbHVlKTtcbiAgICAgIHRoaXMuY3VycmVudENvbG9yID0gdmFsdWU7XG4gICAgICB0aGlzLnNldFN0eWxlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXModmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0U2VjdGlvblN0eWxlcyh0aGlzLm9yaWdpbiwgdGhpcy5sYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHJlcG9ydFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydFN0eWxlcyh0aGlzLmxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYmFja2dyb3VuZCBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYm9yZGVyIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBhZGRDaGFydEJvcmRlckNvbG9yKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZENoYXJ0Qm9yZGVyQ29sb3IodmFsdWUpO1xuICB9XG5cbiAgc2V0U3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMgPSBkZWVwQ29weSh0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJUaGVtZUNvbG9yRGlhbG9nKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX2NvbG9yc1N1YiA9IHRoaXMuX3NlcnZpY2UuY29sb3JzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuY29sb3JzID0geDtcbiAgICB9KTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9PSB4KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZ2V0Q29sb3JXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLnN0eWxlc1snY29sb3InXSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuX29yaWdpblN1YiA9IHRoaXMuX3NlcnZpY2Uub3JpZ2luLnN1YnNjcmliZShzID0+IHtcbiAgICAgIHRoaXMub3JpZ2luID0gcztcbiAgICB9KTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlU3ViID0gdGhpcy5fc2VydmljZS5oZWFkZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fY29udGVudFN0eWxlc1N1YiA9IHRoaXMuX3NlcnZpY2UuY29udGVudFN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvb3RlclN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbG9yc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmlnaW5TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19