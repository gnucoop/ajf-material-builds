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
export class AjfReportBuilderImageGroup {
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
}
AjfReportBuilderImageGroup.decorators = [
    { type: Component, args: [{
                selector: 'ajf-image-group',
                template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"]
            },] }
];
AjfReportBuilderImageGroup.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderImageGroup.propDecorators = {
    data: [{ type: Input }],
    formulaClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBUUgsTUFBTSxPQUFPLDBCQUEwQjtJQXVCckMsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF0QjdDLFVBQUssR0FBNkMsSUFBSSxDQUFDO1FBQ3ZELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFTOUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUkzQjs7OztXQUlHO1FBQ08saUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVaLENBQUM7SUFuQnpELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFpQkQsT0FBTyxDQUFDLE9BQWUsRUFBRSxRQUFnQjtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDakQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNuQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3pDO1FBRUQsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QyxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7OztZQWhFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsZ3FFQUErQjtnQkFFL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBNUJPLHVCQUF1Qjs7O21CQTJDNUIsS0FBSzsyQkFPTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IGhhbmRsZSBhIGdyb3VwIG9mIGltYWdlIG9iamVjdFxuICogdGhlcmUgYXJlIDIgdHlwZXMgb2Ygdmlld1xuICogIGFqZi1pY29uIGFuZCBjbGFzc1xuICpcbiAqIHRha2UgYSBqc29uIGluIGlucHV0XG4gKiAgJ2ljb24nOiAnZmFsc2UnLCAvLyBpZiB0cnVlIGFqZi1pY29uIGFjdGl2YXRlZFxuICogICdjbGFzcyc6IFsnZmxhZy1pY29uJ10sIC8vIGFkZCBjbGFzcyBpbiBvYmplY3Qgc3R5bGVcbiAqICAncHJlZml4Q2xhc3MnOiAnZmxhZy1pY29uLScsIC8vIHByZWZpeCBvZiBjbGFzcyBjb250YWluZWQgb24gZGF0YSBzZXRcbiAqICAndGl0bGUnOiAnZmxhZ3MnLCB0aXRsZSBvZiBkYXRhIHNldFxuICogICdkYXRhJzogW1xuICogICAge1xuICogICAgICAnY2xhc3MnOiAnZHonLCBzdHJpbmQgYWRkZWQgb24gcHJlZml4XG4gKiAgICAgICdpbmZvJzogJ0FsZ2VyaWEnIGluZm8gcmVsYXRlZCB0byBvYmplY3QgKGV4cGxvaXQgb24gdG9vbFRpcClcbiAqICAgIH1cbiAqICBdXG4gKiB9O1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWltYWdlLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdpbWFnZS1ncm91cC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ltYWdlLWdyb3VwLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cCB7XG4gIHByaXZhdGUgX2ljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9fG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jbGFzc2VzOiBzdHJpbmcgPSAnJztcblxuICBnZXQgaWNvbigpOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuICBnZXQgY2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc2VzO1xuICB9XG5cbiAgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICB2YWx1ZVRvU2VhcmNoOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBkYXRhOiBhbnk7XG5cbiAgLyoqXG4gICAqIHRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGljayBvbiBmb3JtdWxhIGJ1dHRvbiBvbiBxdWlsbCBlZGl0b3Igcm9vbCBiYXLGklxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBmb3JtdWxhQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cblxuICBzZXRJY29uKGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZykge1xuICAgIHRoaXMuX2ljb24gPSB7Zm9udFNldCwgZm9udEljb259O1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0SWNvbih0aGlzLl9pY29uKTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB2YWx1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZsYWcodmFsdWUpO1xuICB9XG5cbiAgc2V0U2VhcmNoKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlVG9TZWFyY2ggPSB2YWx1ZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgZW1pdEZvcm11bGEoKSB7XG4gICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgZ2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5jbGFzcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmV0dXJuVmFsdWUgKz0gdGhpcy5kYXRhLmNsYXNzW2ldICsgJyAnO1xuICAgIH1cblxuICAgIHJldHVyblZhbHVlICs9IHRoaXMuZGF0YS5wcmVmaXhDbGFzcyArIHZhbHVlO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iXX0=