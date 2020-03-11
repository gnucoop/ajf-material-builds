/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/image-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AjfReportBuilderImageGroup {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._icon = null;
        this._classes = '';
        this.open = false;
        this.valueToSearch = '';
        /**
         * this event is fired when the user click on formula button on quill editor rool barƒ
         *
         * \@memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
     * @return {?}
     */
    get classes() { return this._classes; }
    /**
     * @param {?} fontSet
     * @param {?} fontIcon
     * @return {?}
     */
    setIcon(fontSet, fontIcon) {
        this._icon = { fontSet, fontIcon };
        this._service.setIcon(this._icon);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setFlag(value) {
        this._classes = value;
        this._service.setFlag(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSearch(value) {
        this.valueToSearch = value.currentTarget.value;
    }
    /**
     * @return {?}
     */
    emitFormula() {
        this.formulaClick.emit();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getFlag(value) {
        /** @type {?} */
        let returnValue = '';
        for (let i = 0; i < this.data.class.length; i++) {
            returnValue += this.data.class[i] + ' ';
        }
        returnValue += this.data.prefixClass + value;
        return returnValue;
    }
    /**
     * @return {?}
     */
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
            }] }
];
/** @nocollapse */
AjfReportBuilderImageGroup.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderImageGroup.propDecorators = {
    data: [{ type: Input }],
    formulaClick: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderImageGroup.prototype._icon;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderImageGroup.prototype._classes;
    /** @type {?} */
    AjfReportBuilderImageGroup.prototype.open;
    /** @type {?} */
    AjfReportBuilderImageGroup.prototype.valueToSearch;
    /** @type {?} */
    AjfReportBuilderImageGroup.prototype.data;
    /**
     * this event is fired when the user click on formula button on quill editor rool barƒ
     *
     * \@memberof QuillEditorComponent
     * @type {?}
     */
    AjfReportBuilderImageGroup.prototype.formulaClick;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderImageGroup.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNMLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFDbkYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCakUsTUFBTSxPQUFPLDBCQUEwQjs7OztJQXFCckMsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFuQjdDLFVBQUssR0FBK0MsSUFBSSxDQUFDO1FBQ3pELGFBQVEsR0FBVyxFQUFFLENBQUM7UUFLOUIsU0FBSSxHQUFZLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFXLEVBQUUsQ0FBQzs7Ozs7O1FBVWpCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7SUFFWCxDQUFDOzs7O0lBaEIxRCxJQUFJLElBQUksS0FBaUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7OztJQUM3RSxJQUFJLE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFrQi9DLE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQWE7O1lBQ2YsV0FBVyxHQUFHLEVBQUU7UUFFcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1NBQ3pDO1FBRUQsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUM3QyxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsZ3FFQUErQjtnQkFFL0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQTVCTyx1QkFBdUI7OzttQkF3QzVCLEtBQUs7MkJBUUwsTUFBTTs7Ozs7OztJQWpCUCwyQ0FBaUU7Ozs7O0lBQ2pFLDhDQUE4Qjs7SUFLOUIsMENBQXNCOztJQUN0QixtREFBMkI7O0lBRTNCLDBDQUNVOzs7Ozs7O0lBT1Ysa0RBQW9FOzs7OztJQUV4RCw4Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgaGFuZGxlIGEgZ3JvdXAgb2YgaW1hZ2Ugb2JqZWN0XG4gKiB0aGVyZSBhcmUgMiB0eXBlcyBvZiB2aWV3XG4gKiAgYWpmLWljb24gYW5kIGNsYXNzXG4gKlxuICogdGFrZSBhIGpzb24gaW4gaW5wdXRcbiAqICAnaWNvbic6ICdmYWxzZScsIC8vIGlmIHRydWUgYWpmLWljb24gYWN0aXZhdGVkXG4gKiAgJ2NsYXNzJzogWydmbGFnLWljb24nXSwgLy8gYWRkIGNsYXNzIGluIG9iamVjdCBzdHlsZVxuICogICdwcmVmaXhDbGFzcyc6ICdmbGFnLWljb24tJywgLy8gcHJlZml4IG9mIGNsYXNzIGNvbnRhaW5lZCBvbiBkYXRhIHNldFxuICogICd0aXRsZSc6ICdmbGFncycsIHRpdGxlIG9mIGRhdGEgc2V0XG4gKiAgJ2RhdGEnOiBbXG4gKiAgICB7XG4gKiAgICAgICdjbGFzcyc6ICdkeicsIHN0cmluZCBhZGRlZCBvbiBwcmVmaXhcbiAqICAgICAgJ2luZm8nOiAnQWxnZXJpYScgaW5mbyByZWxhdGVkIHRvIG9iamVjdCAoZXhwbG9pdCBvbiB0b29sVGlwKVxuICogICAgfVxuICogIF1cbiAqIH07XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtaW1hZ2UtZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ2ltYWdlLWdyb3VwLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnaW1hZ2UtZ3JvdXAuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwICB7XG5cbiAgcHJpdmF0ZSBfaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ30gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2xhc3Nlczogc3RyaW5nID0gJyc7XG5cbiAgZ2V0IGljb24oKToge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ30gfCBudWxsIHsgcmV0dXJuIHRoaXMuX2ljb247IH1cbiAgZ2V0IGNsYXNzZXMoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2NsYXNzZXM7IH1cblxuICBvcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHZhbHVlVG9TZWFyY2g6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGE6IGFueTtcblxuICAvKipcbiAgICogdGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrIG9uIGZvcm11bGEgYnV0dG9uIG9uIHF1aWxsIGVkaXRvciByb29sIGJhcsaSXG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGZvcm11bGFDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkgeyB9XG5cblxuICBzZXRJY29uKGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZykge1xuICAgIHRoaXMuX2ljb24gPSB7Zm9udFNldCwgZm9udEljb259O1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0SWNvbih0aGlzLl9pY29uKTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB2YWx1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZsYWcodmFsdWUpO1xuICB9XG5cbiAgc2V0U2VhcmNoKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlVG9TZWFyY2ggPSB2YWx1ZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgZW1pdEZvcm11bGEoKSB7XG4gICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgZ2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5jbGFzcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmV0dXJuVmFsdWUgKz0gdGhpcy5kYXRhLmNsYXNzW2ldICsgJyAnO1xuICAgIH1cblxuICAgIHJldHVyblZhbHVlICs9IHRoaXMuZGF0YS5wcmVmaXhDbGFzcyArIHZhbHVlO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG5cbn1cbiJdfQ==