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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBUUgsTUFBTSxPQUFPLDBCQUEwQjtJQXVCckMsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF0QjdDLFVBQUssR0FBNkMsSUFBSSxDQUFDO1FBQ3ZELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFTOUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUkzQjs7OztXQUlHO1FBQ2dCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFFckIsQ0FBQztJQW5CekQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQWlCRCxPQUFPLENBQUMsT0FBZSxFQUFFLFFBQWdCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFhO1FBQ25CLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUVyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDekM7UUFFRCxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzdDLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7O1lBaEVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixncUVBQStCO2dCQUUvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUE1Qk8sdUJBQXVCOzs7bUJBMkM1QixLQUFLOzJCQU9MLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgaGFuZGxlIGEgZ3JvdXAgb2YgaW1hZ2Ugb2JqZWN0XG4gKiB0aGVyZSBhcmUgMiB0eXBlcyBvZiB2aWV3XG4gKiAgYWpmLWljb24gYW5kIGNsYXNzXG4gKlxuICogdGFrZSBhIGpzb24gaW4gaW5wdXRcbiAqICAnaWNvbic6ICdmYWxzZScsIC8vIGlmIHRydWUgYWpmLWljb24gYWN0aXZhdGVkXG4gKiAgJ2NsYXNzJzogWydmbGFnLWljb24nXSwgLy8gYWRkIGNsYXNzIGluIG9iamVjdCBzdHlsZVxuICogICdwcmVmaXhDbGFzcyc6ICdmbGFnLWljb24tJywgLy8gcHJlZml4IG9mIGNsYXNzIGNvbnRhaW5lZCBvbiBkYXRhIHNldFxuICogICd0aXRsZSc6ICdmbGFncycsIHRpdGxlIG9mIGRhdGEgc2V0XG4gKiAgJ2RhdGEnOiBbXG4gKiAgICB7XG4gKiAgICAgICdjbGFzcyc6ICdkeicsIHN0cmluZCBhZGRlZCBvbiBwcmVmaXhcbiAqICAgICAgJ2luZm8nOiAnQWxnZXJpYScgaW5mbyByZWxhdGVkIHRvIG9iamVjdCAoZXhwbG9pdCBvbiB0b29sVGlwKVxuICogICAgfVxuICogIF1cbiAqIH07XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtaW1hZ2UtZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ2ltYWdlLWdyb3VwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaW1hZ2UtZ3JvdXAuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwIHtcbiAgcHJpdmF0ZSBfaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ318bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NsYXNzZXM6IHN0cmluZyA9ICcnO1xuXG4gIGdldCBpY29uKCk6IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9fG51bGwge1xuICAgIHJldHVybiB0aGlzLl9pY29uO1xuICB9XG4gIGdldCBjbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzZXM7XG4gIH1cblxuICBvcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHZhbHVlVG9TZWFyY2g6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpIGRhdGE6IGFueTtcblxuICAvKipcbiAgICogdGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrIG9uIGZvcm11bGEgYnV0dG9uIG9uIHF1aWxsIGVkaXRvciByb29sIGJhcsaSXG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZvcm11bGFDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cblxuXG4gIHNldEljb24oZm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5faWNvbiA9IHtmb250U2V0LCBmb250SWNvbn07XG4gICAgdGhpcy5fc2VydmljZS5zZXRJY29uKHRoaXMuX2ljb24pO1xuICB9XG5cbiAgc2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2xhc3NlcyA9IHZhbHVlO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0RmxhZyh2YWx1ZSk7XG4gIH1cblxuICBzZXRTZWFyY2godmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWVUb1NlYXJjaCA9IHZhbHVlLmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gIH1cblxuICBlbWl0Rm9ybXVsYSgpIHtcbiAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KCk7XG4gIH1cblxuICBnZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLmNsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXR1cm5WYWx1ZSArPSB0aGlzLmRhdGEuY2xhc3NbaV0gKyAnICc7XG4gICAgfVxuXG4gICAgcmV0dXJuVmFsdWUgKz0gdGhpcy5kYXRhLnByZWZpeENsYXNzICsgdmFsdWU7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG4gIH1cbn1cbiJdfQ==