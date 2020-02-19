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
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * this component handle a group of image object
 * there are 2 types of view
 *  ajf-icon and class
 *
 * take a json in input
 *  'icon': 'false', // if true ajf-icon activated
 *  'class': ['flag-icon'], // add class in object style
 *  'prefixClass': 'flag-icon-', // prefix of class contained on data set
 *  'title': 'flags', title of data set
 *  'data': [
 *    {
 *      'class': 'dz', strind added on prefix
 *      'info': 'Algeria' info related to object (exploit on toolTip)
 *    }
 *  ]
 * };
 *
 * @export
 */
var AjfReportBuilderImageGroup = /** @class */ (function () {
    function AjfReportBuilderImageGroup(_service) {
        this._service = _service;
        this._icon = null;
        this._classes = '';
        this.open = false;
        this.valueToSearch = '';
        /**
         * this event is fired when the user click on formula button on quill editor rool barƒ
         *
         * @memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
    }
    Object.defineProperty(AjfReportBuilderImageGroup.prototype, "icon", {
        get: function () { return this._icon; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderImageGroup.prototype, "classes", {
        get: function () { return this._classes; },
        enumerable: true,
        configurable: true
    });
    AjfReportBuilderImageGroup.prototype.setIcon = function (fontSet, fontIcon) {
        this._icon = { fontSet: fontSet, fontIcon: fontIcon };
        this._service.setIcon(this._icon);
    };
    AjfReportBuilderImageGroup.prototype.setFlag = function (value) {
        this._classes = value;
        this._service.setFlag(value);
    };
    AjfReportBuilderImageGroup.prototype.setSearch = function (value) {
        this.valueToSearch = value.currentTarget.value;
    };
    AjfReportBuilderImageGroup.prototype.emitFormula = function () {
        this.formulaClick.emit();
    };
    AjfReportBuilderImageGroup.prototype.getFlag = function (value) {
        var returnValue = '';
        for (var i = 0; i < this.data.class.length; i++) {
            returnValue += this.data.class[i] + ' ';
        }
        returnValue += this.data.prefixClass + value;
        return returnValue;
    };
    AjfReportBuilderImageGroup.prototype.toggle = function () {
        this.open = !this.open;
    };
    AjfReportBuilderImageGroup.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-image-group',
                    template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderImageGroup.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    AjfReportBuilderImageGroup.propDecorators = {
        data: [{ type: Input }],
        formulaClick: [{ type: Output }]
    };
    return AjfReportBuilderImageGroup;
}());
export { AjfReportBuilderImageGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFDbkYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSDtJQTRCRSxvQ0FBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFuQjdDLFVBQUssR0FBK0MsSUFBSSxDQUFDO1FBQ3pELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFLOUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUszQjs7OztXQUlHO1FBQ08saUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVYLENBQUM7SUFoQjFELHNCQUFJLDRDQUFJO2FBQVIsY0FBeUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDN0Usc0JBQUksK0NBQU87YUFBWCxjQUF3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQWtCL0MsNENBQU8sR0FBUCxVQUFRLE9BQWUsRUFBRSxRQUFnQjtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsT0FBTyxTQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELDRDQUFPLEdBQVAsVUFBUSxLQUFhO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw4Q0FBUyxHQUFULFVBQVUsS0FBVTtRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELENBQUM7SUFFRCxnREFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsNENBQU8sR0FBUCxVQUFRLEtBQWE7UUFDbkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUN6QztRQUVELFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0MsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELDJDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDOztnQkE5REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLGdxRUFBK0I7b0JBRS9CLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQTVCTyx1QkFBdUI7Ozt1QkF3QzVCLEtBQUs7K0JBUUwsTUFBTTs7SUFzQ1QsaUNBQUM7Q0FBQSxBQWhFRCxJQWdFQztTQXpEWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBoYW5kbGUgYSBncm91cCBvZiBpbWFnZSBvYmplY3RcbiAqIHRoZXJlIGFyZSAyIHR5cGVzIG9mIHZpZXdcbiAqICBhamYtaWNvbiBhbmQgY2xhc3NcbiAqXG4gKiB0YWtlIGEganNvbiBpbiBpbnB1dFxuICogICdpY29uJzogJ2ZhbHNlJywgLy8gaWYgdHJ1ZSBhamYtaWNvbiBhY3RpdmF0ZWRcbiAqICAnY2xhc3MnOiBbJ2ZsYWctaWNvbiddLCAvLyBhZGQgY2xhc3MgaW4gb2JqZWN0IHN0eWxlXG4gKiAgJ3ByZWZpeENsYXNzJzogJ2ZsYWctaWNvbi0nLCAvLyBwcmVmaXggb2YgY2xhc3MgY29udGFpbmVkIG9uIGRhdGEgc2V0XG4gKiAgJ3RpdGxlJzogJ2ZsYWdzJywgdGl0bGUgb2YgZGF0YSBzZXRcbiAqICAnZGF0YSc6IFtcbiAqICAgIHtcbiAqICAgICAgJ2NsYXNzJzogJ2R6Jywgc3RyaW5kIGFkZGVkIG9uIHByZWZpeFxuICogICAgICAnaW5mbyc6ICdBbGdlcmlhJyBpbmZvIHJlbGF0ZWQgdG8gb2JqZWN0IChleHBsb2l0IG9uIHRvb2xUaXApXG4gKiAgICB9XG4gKiAgXVxuICogfTtcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1pbWFnZS1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnaW1hZ2UtZ3JvdXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydpbWFnZS1ncm91cC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckltYWdlR3JvdXAgIHtcblxuICBwcml2YXRlIF9pY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jbGFzc2VzOiBzdHJpbmcgPSAnJztcblxuICBnZXQgaWNvbigpOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSB8IG51bGwgeyByZXR1cm4gdGhpcy5faWNvbjsgfVxuICBnZXQgY2xhc3NlcygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fY2xhc3NlczsgfVxuXG4gIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgdmFsdWVUb1NlYXJjaDogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgZGF0YTogYW55O1xuXG4gIC8qKlxuICAgKiB0aGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgY2xpY2sgb24gZm9ybXVsYSBidXR0b24gb24gcXVpbGwgZWRpdG9yIHJvb2wgYmFyxpJcbiAgICpcbiAgICogQG1lbWJlcm9mIFF1aWxsRWRpdG9yQ29tcG9uZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZm9ybXVsYUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7IH1cblxuXG4gIHNldEljb24oZm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5faWNvbiA9IHtmb250U2V0LCBmb250SWNvbn07XG4gICAgdGhpcy5fc2VydmljZS5zZXRJY29uKHRoaXMuX2ljb24pO1xuICB9XG5cbiAgc2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2xhc3NlcyA9IHZhbHVlO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0RmxhZyh2YWx1ZSk7XG4gIH1cblxuICBzZXRTZWFyY2godmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWVUb1NlYXJjaCA9IHZhbHVlLmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gIH1cblxuICBlbWl0Rm9ybXVsYSgpIHtcbiAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KCk7XG4gIH1cblxuICBnZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmNsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXR1cm5WYWx1ZSArPSB0aGlzLmRhdGEuY2xhc3NbaV0gKyAnICc7XG4gICAgfVxuXG4gICAgcmV0dXJuVmFsdWUgKz0gdGhpcy5kYXRhLnByZWZpeENsYXNzICsgdmFsdWU7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cblxufVxuIl19