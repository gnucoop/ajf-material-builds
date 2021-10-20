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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/card";
import * as i4 from "@angular/material/grid-list";
import * as i5 from "@angular/material/icon";
import * as i6 from "@angular/material/form-field";
import * as i7 from "./forms-analyzer";
import * as i8 from "@angular/common";
import * as i9 from "@angular/material/tooltip";
import * as i10 from "@angular/forms";
import * as i11 from "./image-filter";
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
AjfReportBuilderImageGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderImageGroup, deps: [{ token: i1.AjfReportBuilderService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderImageGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderImageGroup, selector: "ajf-image-group", inputs: { data: "data" }, outputs: { formulaClick: "formulaClick" }, ngImport: i0, template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n", styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"], components: [{ type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i3.MatCard, selector: "mat-card", exportAs: ["matCard"] }, { type: i3.MatCardHeader, selector: "mat-card-header" }, { type: i4.MatGridList, selector: "mat-grid-list", inputs: ["cols", "gutterSize", "rowHeight"], exportAs: ["matGridList"] }, { type: i4.MatGridTile, selector: "mat-grid-tile", inputs: ["rowspan", "colspan"], exportAs: ["matGridTile"] }, { type: i5.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i6.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { type: i7.AjfReportBuilderFormsAnalyzer, selector: "ajf-report-builder-forms-analyzer" }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.MatCardContent, selector: "mat-card-content, [mat-card-content], [matCardContent]" }, { type: i8.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i9.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i3.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { type: i3.MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]" }, { type: i10.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], pipes: { "ajfImageFilter": i11.AjfImageFilterPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderImageGroup, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-image-group', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n", styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }]; }, propDecorators: { data: [{
                type: Input
            }], formulaClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFRSCxNQUFNLE9BQU8sMEJBQTBCO0lBdUJyQyxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXRCN0MsVUFBSyxHQUErQyxJQUFJLENBQUM7UUFDekQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVM5QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBSTNCOzs7O1dBSUc7UUFDZ0IsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVyQixDQUFDO0lBbkJ6RCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBZ0JELE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUN6QztRQUVELFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0MsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDOzsrSEF4RFUsMEJBQTBCO21IQUExQiwwQkFBMEIsNEhDNUR2QyxzcEVBaURBO21HRFdhLDBCQUEwQjtrQkFQdEMsU0FBUzsrQkFDRSxpQkFBaUIsaUJBR1osaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4R0FnQnRDLElBQUk7c0JBQVosS0FBSztnQkFPYSxZQUFZO3NCQUE5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBoYW5kbGUgYSBncm91cCBvZiBpbWFnZSBvYmplY3RcbiAqIHRoZXJlIGFyZSAyIHR5cGVzIG9mIHZpZXdcbiAqICBhamYtaWNvbiBhbmQgY2xhc3NcbiAqXG4gKiB0YWtlIGEganNvbiBpbiBpbnB1dFxuICogICdpY29uJzogJ2ZhbHNlJywgLy8gaWYgdHJ1ZSBhamYtaWNvbiBhY3RpdmF0ZWRcbiAqICAnY2xhc3MnOiBbJ2ZsYWctaWNvbiddLCAvLyBhZGQgY2xhc3MgaW4gb2JqZWN0IHN0eWxlXG4gKiAgJ3ByZWZpeENsYXNzJzogJ2ZsYWctaWNvbi0nLCAvLyBwcmVmaXggb2YgY2xhc3MgY29udGFpbmVkIG9uIGRhdGEgc2V0XG4gKiAgJ3RpdGxlJzogJ2ZsYWdzJywgdGl0bGUgb2YgZGF0YSBzZXRcbiAqICAnZGF0YSc6IFtcbiAqICAgIHtcbiAqICAgICAgJ2NsYXNzJzogJ2R6Jywgc3RyaW5kIGFkZGVkIG9uIHByZWZpeFxuICogICAgICAnaW5mbyc6ICdBbGdlcmlhJyBpbmZvIHJlbGF0ZWQgdG8gb2JqZWN0IChleHBsb2l0IG9uIHRvb2xUaXApXG4gKiAgICB9XG4gKiAgXVxuICogfTtcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1pbWFnZS1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnaW1hZ2UtZ3JvdXAuaHRtbCcsXG4gIHN0eWxlVXJsczogWydpbWFnZS1ncm91cC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJJbWFnZUdyb3VwIHtcbiAgcHJpdmF0ZSBfaWNvbjoge2ZvbnRTZXQ6IHN0cmluZzsgZm9udEljb246IHN0cmluZ30gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2xhc3Nlczogc3RyaW5nID0gJyc7XG5cbiAgZ2V0IGljb24oKToge2ZvbnRTZXQ6IHN0cmluZzsgZm9udEljb246IHN0cmluZ30gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuICBnZXQgY2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc2VzO1xuICB9XG5cbiAgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICB2YWx1ZVRvU2VhcmNoOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBkYXRhOiBhbnk7XG5cbiAgLyoqXG4gICAqIHRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGljayBvbiBmb3JtdWxhIGJ1dHRvbiBvbiBxdWlsbCBlZGl0b3Igcm9vbCBiYXLGklxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBmb3JtdWxhQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cbiAgc2V0SWNvbihmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pY29uID0ge2ZvbnRTZXQsIGZvbnRJY29ufTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEljb24odGhpcy5faWNvbik7XG4gIH1cblxuICBzZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jbGFzc2VzID0gdmFsdWU7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGbGFnKHZhbHVlKTtcbiAgfVxuXG4gIHNldFNlYXJjaCh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZVRvU2VhcmNoID0gdmFsdWUuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIGVtaXRGb3JtdWxhKCkge1xuICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIGdldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIGxldCByZXR1cm5WYWx1ZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuY2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJldHVyblZhbHVlICs9IHRoaXMuZGF0YS5jbGFzc1tpXSArICcgJztcbiAgICB9XG5cbiAgICByZXR1cm5WYWx1ZSArPSB0aGlzLmRhdGEucHJlZml4Q2xhc3MgKyB2YWx1ZTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5vcGVuID0gIXRoaXMub3BlbjtcbiAgfVxufVxuIiwiPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImRhdGEgIT0gbnVsbFwiPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cInRvZ2dsZSgpXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+e3tkYXRhLnRpdGxlfX08L2J1dHRvbj5cbiAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIm9wZW5cIj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cImVtaXRGb3JtdWxhKClcIj5TZXQgZm9ybXVsYTwvYnV0dG9uPlxuICAgIDxtYXQtY2FyZCAqbmdJZj1cImRhdGEuaWNvbiA9PT0gJ3RydWUnXCI+XG4gICAgICA8bWF0LWNhcmQtaGVhZGVyPlxuICAgICAgICB7e2RhdGEudGl0bGV9fVxuICAgICAgPC9tYXQtY2FyZC1oZWFkZXI+XG4gICAgICA8bWF0LWNhcmQtY29udGVudD5cbiAgICAgICAgPG1hdC1ncmlkLWxpc3QgY29scz1cIjNcIiByb3dIZWlnaHQ9XCIxMDBweFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHZhbHVlIG9mIGRhdGEuZGF0YVwiPlxuICAgICAgICAgICAgPG1hdC1ncmlkLXRpbGUgKm5nRm9yPVwibGV0IGljb24gb2YgdmFsdWUuaWNvbnNcIiBbY29sc3Bhbl09XCIxXCIgW3Jvd3NwYW5dPVwiMVwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPVwiaGVpZ2h0OjEwMCVcIiAoY2xpY2spPVwic2V0SWNvbih2YWx1ZS5uYW1lLCBpY29uLm5hbWUpXCIgW21hdFRvb2x0aXBdPVwiaWNvbi5sYWJlbFwiIG1hdFRvb2x0aXBQb3NpdGlvbj1cImFib3ZlXCIgbWF0LWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgICAgICAgIFtmb250U2V0XT1cInZhbHVlLm5hbWVcIlxuICAgICAgICAgICAgICAgICAgW2ZvbnRJY29uXT1cImljb24ubmFtZVwiPlxuICAgICAgICAgICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtZ3JpZC10aWxlPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1ncmlkLWxpc3Q+XG4gICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XG4gICAgPC9tYXQtY2FyZD5cbiAgICA8bWF0LWNhcmQgKm5nSWY9XCJkYXRhLmljb24gPT09ICdmYWxzZSdcIj5cbiAgICAgIDxtYXQtY2FyZC1oZWFkZXI+XG4gICAgICAgIDxtYXQtY2FyZC10aXRsZT5cbiAgICAgICAgICB7e2RhdGEudGl0bGV9fVxuICAgICAgICA8L21hdC1jYXJkLXRpdGxlPlxuICAgICAgICA8bWF0LWNhcmQtc3VidGl0bGU+XG4gICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IHBsYWNlaG9sZGVyPVwie3tkYXRhLnRpdGxlfX0gdG8gc2VhcmNoXCIgWyhuZ01vZGVsKV09XCJ2YWx1ZVRvU2VhcmNoXCI+XG4gICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9tYXQtY2FyZC1zdWJ0aXRsZT5cbiAgICAgIDwvbWF0LWNhcmQtaGVhZGVyPlxuICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtaW1hZ2UtZ3JvdXAtY29udGFpbmVyXCI+XG4gICAgICAgICAgPG1hdC1ncmlkLWxpc3QgY29scz1cIjNcIj5cbiAgICAgICAgICAgIDxtYXQtZ3JpZC10aWxlICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBkYXRhLmRhdGEgfCBhamZJbWFnZUZpbHRlcjogdmFsdWVUb1NlYXJjaFwiIFtjb2xzcGFuXT1cIjFcIiBbcm93c3Bhbl09XCIxXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9XCJoZWlnaHQ6MTAwJVwiIChjbGljayk9XCJzZXRGbGFnKGdldEZsYWcodmFsdWUuY2xhc3MpKVwiIG1hdFRvb2x0aXA9XCJ7e3ZhbHVlLmluZm99fVwiIFttYXRUb29sdGlwUG9zaXRpb25dPVwiJ2Fib3ZlJ1wiIG1hdC1idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9e3tnZXRGbGFnKHZhbHVlLmNsYXNzKX19IHN0eWxlPVwid2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1ncmlkLXRpbGU+XG4gICAgICAgICAgPC9tYXQtZ3JpZC1saXN0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cbiAgICA8L21hdC1jYXJkPlxuICAgIDxhamYtcmVwb3J0LWJ1aWxkZXItZm9ybXMtYW5hbHl6ZXI+PC9hamYtcmVwb3J0LWJ1aWxkZXItZm9ybXMtYW5hbHl6ZXI+XG4gIDwvbmctdGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuIl19