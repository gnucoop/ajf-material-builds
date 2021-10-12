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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvaW1hZ2UtZ3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFFakU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFRSCxNQUFNLE9BQU8sMEJBQTBCO0lBdUJyQyxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXRCN0MsVUFBSyxHQUE2QyxJQUFJLENBQUM7UUFDdkQsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQVM5QixTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBSTNCOzs7O1dBSUc7UUFDZ0IsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVyQixDQUFDO0lBbkJ6RCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBaUJELE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUN6QztRQUVELFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0MsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDOzsrSEF6RFUsMEJBQTBCO21IQUExQiwwQkFBMEIsNEhDNUR2QyxzcEVBaURBO21HRFdhLDBCQUEwQjtrQkFQdEMsU0FBUzsrQkFDRSxpQkFBaUIsaUJBR1osaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4R0FnQnRDLElBQUk7c0JBQVosS0FBSztnQkFPYSxZQUFZO3NCQUE5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IGhhbmRsZSBhIGdyb3VwIG9mIGltYWdlIG9iamVjdFxuICogdGhlcmUgYXJlIDIgdHlwZXMgb2Ygdmlld1xuICogIGFqZi1pY29uIGFuZCBjbGFzc1xuICpcbiAqIHRha2UgYSBqc29uIGluIGlucHV0XG4gKiAgJ2ljb24nOiAnZmFsc2UnLCAvLyBpZiB0cnVlIGFqZi1pY29uIGFjdGl2YXRlZFxuICogICdjbGFzcyc6IFsnZmxhZy1pY29uJ10sIC8vIGFkZCBjbGFzcyBpbiBvYmplY3Qgc3R5bGVcbiAqICAncHJlZml4Q2xhc3MnOiAnZmxhZy1pY29uLScsIC8vIHByZWZpeCBvZiBjbGFzcyBjb250YWluZWQgb24gZGF0YSBzZXRcbiAqICAndGl0bGUnOiAnZmxhZ3MnLCB0aXRsZSBvZiBkYXRhIHNldFxuICogICdkYXRhJzogW1xuICogICAge1xuICogICAgICAnY2xhc3MnOiAnZHonLCBzdHJpbmQgYWRkZWQgb24gcHJlZml4XG4gKiAgICAgICdpbmZvJzogJ0FsZ2VyaWEnIGluZm8gcmVsYXRlZCB0byBvYmplY3QgKGV4cGxvaXQgb24gdG9vbFRpcClcbiAqICAgIH1cbiAqICBdXG4gKiB9O1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWltYWdlLWdyb3VwJyxcbiAgdGVtcGxhdGVVcmw6ICdpbWFnZS1ncm91cC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ltYWdlLWdyb3VwLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVySW1hZ2VHcm91cCB7XG4gIHByaXZhdGUgX2ljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9fG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jbGFzc2VzOiBzdHJpbmcgPSAnJztcblxuICBnZXQgaWNvbigpOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuICBnZXQgY2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbGFzc2VzO1xuICB9XG5cbiAgb3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICB2YWx1ZVRvU2VhcmNoOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKSBkYXRhOiBhbnk7XG5cbiAgLyoqXG4gICAqIHRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGljayBvbiBmb3JtdWxhIGJ1dHRvbiBvbiBxdWlsbCBlZGl0b3Igcm9vbCBiYXLGklxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBmb3JtdWxhQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cblxuICBzZXRJY29uKGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZykge1xuICAgIHRoaXMuX2ljb24gPSB7Zm9udFNldCwgZm9udEljb259O1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0SWNvbih0aGlzLl9pY29uKTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NsYXNzZXMgPSB2YWx1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZsYWcodmFsdWUpO1xuICB9XG5cbiAgc2V0U2VhcmNoKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlVG9TZWFyY2ggPSB2YWx1ZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICB9XG5cbiAgZW1pdEZvcm11bGEoKSB7XG4gICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgZ2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5jbGFzcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmV0dXJuVmFsdWUgKz0gdGhpcy5kYXRhLmNsYXNzW2ldICsgJyAnO1xuICAgIH1cblxuICAgIHJldHVyblZhbHVlICs9IHRoaXMuZGF0YS5wcmVmaXhDbGFzcyArIHZhbHVlO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLm9wZW4gPSAhdGhpcy5vcGVuO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgW25nSWZdPVwiZGF0YSAhPSBudWxsXCI+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlKClcIiBzdHlsZT1cIndpZHRoOjEwMCVcIj57e2RhdGEudGl0bGV9fTwvYnV0dG9uPlxuICA8bmctdGVtcGxhdGUgW25nSWZdPVwib3BlblwiPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwiZW1pdEZvcm11bGEoKVwiPlNldCBmb3JtdWxhPC9idXR0b24+XG4gICAgPG1hdC1jYXJkICpuZ0lmPVwiZGF0YS5pY29uID09PSAndHJ1ZSdcIj5cbiAgICAgIDxtYXQtY2FyZC1oZWFkZXI+XG4gICAgICAgIHt7ZGF0YS50aXRsZX19XG4gICAgICA8L21hdC1jYXJkLWhlYWRlcj5cbiAgICAgIDxtYXQtY2FyZC1jb250ZW50PlxuICAgICAgICA8bWF0LWdyaWQtbGlzdCBjb2xzPVwiM1wiIHJvd0hlaWdodD1cIjEwMHB4XCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdmFsdWUgb2YgZGF0YS5kYXRhXCI+XG4gICAgICAgICAgICA8bWF0LWdyaWQtdGlsZSAqbmdGb3I9XCJsZXQgaWNvbiBvZiB2YWx1ZS5pY29uc1wiIFtjb2xzcGFuXT1cIjFcIiBbcm93c3Bhbl09XCIxXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9XCJoZWlnaHQ6MTAwJVwiIChjbGljayk9XCJzZXRJY29uKHZhbHVlLm5hbWUsIGljb24ubmFtZSlcIiBbbWF0VG9vbHRpcF09XCJpY29uLmxhYmVsXCIgbWF0VG9vbHRpcFBvc2l0aW9uPVwiYWJvdmVcIiBtYXQtYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxtYXQtaWNvblxuICAgICAgICAgICAgICAgICAgW2ZvbnRTZXRdPVwidmFsdWUubmFtZVwiXG4gICAgICAgICAgICAgICAgICBbZm9udEljb25dPVwiaWNvbi5uYW1lXCI+XG4gICAgICAgICAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1ncmlkLXRpbGU+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWF0LWdyaWQtbGlzdD5cbiAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cbiAgICA8L21hdC1jYXJkPlxuICAgIDxtYXQtY2FyZCAqbmdJZj1cImRhdGEuaWNvbiA9PT0gJ2ZhbHNlJ1wiPlxuICAgICAgPG1hdC1jYXJkLWhlYWRlcj5cbiAgICAgICAgPG1hdC1jYXJkLXRpdGxlPlxuICAgICAgICAgIHt7ZGF0YS50aXRsZX19XG4gICAgICAgIDwvbWF0LWNhcmQtdGl0bGU+XG4gICAgICAgIDxtYXQtY2FyZC1zdWJ0aXRsZT5cbiAgICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgcGxhY2Vob2xkZXI9XCJ7e2RhdGEudGl0bGV9fSB0byBzZWFyY2hcIiBbKG5nTW9kZWwpXT1cInZhbHVlVG9TZWFyY2hcIj5cbiAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8L21hdC1jYXJkLXN1YnRpdGxlPlxuICAgICAgPC9tYXQtY2FyZC1oZWFkZXI+XG4gICAgICA8bWF0LWNhcmQtY29udGVudD5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1pbWFnZS1ncm91cC1jb250YWluZXJcIj5cbiAgICAgICAgICA8bWF0LWdyaWQtbGlzdCBjb2xzPVwiM1wiPlxuICAgICAgICAgICAgPG1hdC1ncmlkLXRpbGUgKm5nRm9yPVwibGV0IHZhbHVlIG9mIGRhdGEuZGF0YSB8IGFqZkltYWdlRmlsdGVyOiB2YWx1ZVRvU2VhcmNoXCIgW2NvbHNwYW5dPVwiMVwiIFtyb3dzcGFuXT1cIjFcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT1cImhlaWdodDoxMDAlXCIgKGNsaWNrKT1cInNldEZsYWcoZ2V0RmxhZyh2YWx1ZS5jbGFzcykpXCIgbWF0VG9vbHRpcD1cInt7dmFsdWUuaW5mb319XCIgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCIgbWF0LWJ1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz17e2dldEZsYWcodmFsdWUuY2xhc3MpfX0gc3R5bGU9XCJ3aWR0aDogMTAwJTtoZWlnaHQ6IDEwMCU7XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbWF0LWdyaWQtdGlsZT5cbiAgICAgICAgICA8L21hdC1ncmlkLWxpc3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxuICAgIDwvbWF0LWNhcmQ+XG4gICAgPGFqZi1yZXBvcnQtYnVpbGRlci1mb3Jtcy1hbmFseXplcj48L2FqZi1yZXBvcnQtYnVpbGRlci1mb3Jtcy1hbmFseXplcj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=