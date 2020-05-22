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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
let AjfReportBuilderImageGroup = /** @class */ (() => {
    let AjfReportBuilderImageGroup = class AjfReportBuilderImageGroup {
        constructor(_service) {
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
        get icon() {
            return this._icon;
        }
        get classes() {
            return this._classes;
        }
        setIcon(fontSet, fontIcon) {
            this._icon = { fontSet, fontIcon };
            this._service.setIcon(this._icon);
        }
        setFlag(value) {
            this._classes = value;
            this._service.setFlag(value);
        }
        setSearch(value) {
            this.valueToSearch = value.currentTarget.value;
        }
        emitFormula() {
            this.formulaClick.emit();
        }
        getFlag(value) {
            let returnValue = '';
            for (let i = 0; i < this.data.class.length; i++) {
                returnValue += this.data.class[i] + ' ';
            }
            returnValue += this.data.prefixClass + value;
            return returnValue;
        }
        toggle() {
            this.open = !this.open;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfReportBuilderImageGroup.prototype, "data", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfReportBuilderImageGroup.prototype, "formulaClick", void 0);
    AjfReportBuilderImageGroup = __decorate([
        Component({
            selector: 'ajf-image-group',
            template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"]
        }),
        __metadata("design:paramtypes", [AjfReportBuilderService])
    ], AjfReportBuilderImageGroup);
    return AjfReportBuilderImageGroup;
})();
export { AjfReportBuilderImageGroup };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQVFIO0lBQUEsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7UUF1QnJDLFlBQW9CLFFBQWlDO1lBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBdEI3QyxVQUFLLEdBQTZDLElBQUksQ0FBQztZQUN2RCxhQUFRLEdBQVcsRUFBRSxDQUFDO1lBUzlCLFNBQUksR0FBWSxLQUFLLENBQUM7WUFDdEIsa0JBQWEsR0FBVyxFQUFFLENBQUM7WUFJM0I7Ozs7ZUFJRztZQUNPLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFWixDQUFDO1FBbkJ6RCxJQUFJLElBQUk7WUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQztRQUNELElBQUksT0FBTztZQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO1FBaUJELE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELE9BQU8sQ0FBQyxLQUFhO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRCxTQUFTLENBQUMsS0FBVTtZQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2pELENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsT0FBTyxDQUFDLEtBQWE7WUFDbkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXJCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDekM7WUFFRCxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQzdDLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNO1lBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQztLQUNGLENBQUE7SUE1Q1U7UUFBUixLQUFLLEVBQUU7OzREQUFXO0lBT1Q7UUFBVCxNQUFNLEVBQUU7a0NBQWUsWUFBWTtvRUFBZ0M7SUFyQnpELDBCQUEwQjtRQVB0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLGdxRUFBK0I7WUFFL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7eUNBd0I4Qix1QkFBdUI7T0F2QjFDLDBCQUEwQixDQTBEdEM7SUFBRCxpQ0FBQztLQUFBO1NBMURZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBoYW5kbGUgYSBncm91cCBvZiBpbWFnZSBvYmplY3RcbiAqIHRoZXJlIGFyZSAyIHR5cGVzIG9mIHZpZXdcbiAqICBhamYtaWNvbiBhbmQgY2xhc3NcbiAqXG4gKiB0YWtlIGEganNvbiBpbiBpbnB1dFxuICogICdpY29uJzogJ2ZhbHNlJywgLy8gaWYgdHJ1ZSBhamYtaWNvbiBhY3RpdmF0ZWRcbiAqICAnY2xhc3MnOiBbJ2ZsYWctaWNvbiddLCAvLyBhZGQgY2xhc3MgaW4gb2JqZWN0IHN0eWxlXG4gKiAgJ3ByZWZpeENsYXNzJzogJ2ZsYWctaWNvbi0nLCAvLyBwcmVmaXggb2YgY2xhc3MgY29udGFpbmVkIG9uIGRhdGEgc2V0XG4gKiAgJ3RpdGxlJzogJ2ZsYWdzJywgdGl0bGUgb2YgZGF0YSBzZXRcbiAqICAnZGF0YSc6IFtcbiAqICAgIHtcbiAqICAgICAgJ2NsYXNzJzogJ2R6Jywgc3RyaW5kIGFkZGVkIG9uIHByZWZpeFxuICogICAgICAnaW5mbyc6ICdBbGdlcmlhJyBpbmZvIHJlbGF0ZWQgdG8gb2JqZWN0IChleHBsb2l0IG9uIHRvb2xUaXApXG4gKiAgICB9XG4gKiAgXVxuICogfTtcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1pbWFnZS1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnaW1hZ2UtZ3JvdXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydpbWFnZS1ncm91cC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckltYWdlR3JvdXAge1xuICBwcml2YXRlIF9pY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfXxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2xhc3Nlczogc3RyaW5nID0gJyc7XG5cbiAgZ2V0IGljb24oKToge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ318bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cbiAgZ2V0IGNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3NlcztcbiAgfVxuXG4gIG9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgdmFsdWVUb1NlYXJjaDogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCkgZGF0YTogYW55O1xuXG4gIC8qKlxuICAgKiB0aGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgY2xpY2sgb24gZm9ybXVsYSBidXR0b24gb24gcXVpbGwgZWRpdG9yIHJvb2wgYmFyxpJcbiAgICpcbiAgICogQG1lbWJlcm9mIFF1aWxsRWRpdG9yQ29tcG9uZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZm9ybXVsYUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7fVxuXG5cbiAgc2V0SWNvbihmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pY29uID0ge2ZvbnRTZXQsIGZvbnRJY29ufTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEljb24odGhpcy5faWNvbik7XG4gIH1cblxuICBzZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jbGFzc2VzID0gdmFsdWU7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGbGFnKHZhbHVlKTtcbiAgfVxuXG4gIHNldFNlYXJjaCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZVRvU2VhcmNoID0gdmFsdWUuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIGVtaXRGb3JtdWxhKCkge1xuICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIGdldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuY2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJldHVyblZhbHVlICs9IHRoaXMuZGF0YS5jbGFzc1tpXSArICcgJztcbiAgICB9XG5cbiAgICByZXR1cm5WYWx1ZSArPSB0aGlzLmRhdGEucHJlZml4Q2xhc3MgKyB2YWx1ZTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxufVxuIl19