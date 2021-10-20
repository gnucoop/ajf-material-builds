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
import { validateExpression } from '@ajf/core/models';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { sanitizeConditionString } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "@angular/material/card";
import * as i3 from "@angular/material/select";
import * as i4 from "@angular/material/core";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "@ngneat/transloco";
/**
 * This class will define an ajf builder builder condition editor
 * @implements : OnDestroy
 * @implements : AfterViewInit
 */
export class AjfReportBuilderConditionEditor {
    /**
     * this constructor will init current condition by ajfBuilderservice
     * and init condition and availableFieldNames subscriptions
     */
    constructor(_service) {
        this._service = _service;
        this.isValid = false;
        this.names = [];
        // conditionText is a string
        this.conditionText = 'true';
        //  operators is an array of any type that contains all allow operators
        this.operators = [
            '( )',
            "' '",
            '<',
            '<=',
            '==',
            '>=',
            '>',
            '!=',
            '!',
            '&&',
            '||',
            '+',
            '-',
            '*',
            '/',
            '%',
            'true',
            'false',
        ];
        this._conditionNamesSub = Subscription.EMPTY;
    }
    extractNames(formsVariables) {
        this.names.length = 0;
        for (let i = 0; i < formsVariables.length; i++) {
            this.names = this.names.concat(formsVariables[i].names);
        }
    }
    setCurrent(id, index) {
        this.currentId = id;
        this.appendText(this.formsVariables[id].names[index]);
        this.checkValidation();
    }
    /**
     * this method will return success if the current condtion is valid
     * @return boolean
     */
    validateCondition() {
        return validateExpression(this.conditionText, this.names);
    }
    // TODO complete the comment
    /**
     * this method will append text to json
     * @param text      : string -
     * @param goBackNum : number -
     */
    appendText(text, _goBackNum) {
        if (text == null || this.conditionTextArea == null) {
            return;
        }
        let el = this.conditionTextArea.nativeElement;
        let sStart = Math.min(el.selectionStart, el.selectionEnd);
        let sEnd = Math.max(el.selectionStart, el.selectionEnd);
        let startingString = this.conditionText.substr(0, sStart);
        let endingString = this.conditionText.substr(sEnd);
        let initialLenght = startingString.length;
        let newStr = '';
        startingString = sanitizeConditionString(startingString);
        endingString = sanitizeConditionString(endingString);
        sStart +=
            startingString.length - initialLenght + text.length + (startingString.length > 0 ? 2 : 1);
        newStr = startingString.length > 0 ? `${startingString} ` : '';
        this.conditionText = `${newStr}${text} ${endingString}`;
        const s = timer(0).subscribe(() => {
            if (s && !s.closed) {
                s.unsubscribe();
            }
            if (el.createTextRange) {
                let range = el.createTextRange();
                range.move('character', sStart);
                range.select();
            }
            else {
                if (el.selectionStart) {
                    el.focus();
                    el.setSelectionRange(sStart, sStart);
                }
                else {
                    el.focus();
                }
            }
        });
    }
    checkValidation() {
        this.isValid = this.validateCondition();
        if (this.isValid) {
            this.saveCondition();
        }
    }
    /**
     * this method will save current condition
     */
    saveCondition() {
        this._service.saveCondition(this.conditionText);
    }
    ngOnInit() {
        this.conditionText = this.visibility.condition;
        this.isValid = true;
        if (this.conditionText == 'true') {
            this.conditionText = '';
        }
        this._conditionNamesSub = this._service.conditionNames.subscribe(x => {
            this.formsVariables = x;
            if (x != null) {
                this.extractNames(this.formsVariables);
            }
        });
    }
    /**
     * this method will destroy a conditionSubscriptions
     */
    ngOnDestroy() {
        this._conditionNamesSub.unsubscribe();
    }
}
AjfReportBuilderConditionEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderConditionEditor, deps: [{ token: i1.AjfReportBuilderService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderConditionEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderConditionEditor, selector: "ajf-report-builder-condition-editor", inputs: { visibility: "visibility" }, viewQueries: [{ propertyName: "conditionTextArea", first: true, predicate: ["conditionTextArea"], descendants: true }], ngImport: i0, template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\">\n  <mat-card>\n    <mat-card-header>\n      <mat-card-title>condition of visibility</mat-card-title>\n      <mat-card-subtitle>\n        <ng-template [ngIf]=\"visibility\">\n          {{visibility.condition}}\n        </ng-template>\n      </mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n      <br />\n      <form>\n        <mat-select\n          [(ngModel)]=\"a\"\n          [ngModelOptions]=\"{standalone: true}\"\n          placeholder=\"Select condition\"\n        >\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option\n              *ngFor=\"let label of form.labels;let i = index;\"\n              [value]=\"label\"\n              (click)=\"setCurrent(id, i)\"\n            >\n              {{ id}}: {{ label }}\n            </mat-option>\n          </ng-template>\n        </mat-select>\n        <mat-select\n          [(ngModel)]=\"b\"\n          [ngModelOptions]=\"{standalone: true}\"\n          placeholder=\"Select operator\"\n        >\n          <mat-option\n            *ngFor=\"let operator of operators\"\n            (click)=\"appendText(operator);\"\n          >\n            {{ operator }}\n          </mat-option>\n        </mat-select>\n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <ng-template [ngIf]=\"!isValid\">\n        <ng-container\n          >{{'Invalid condition! Please check syntax.'|transloco}}</ng-container\n        >\n      </ng-template>\n      <textarea\n        #conditionTextArea\n        [(ngModel)]=\"conditionText\"\n        (keyup)=\"checkValidation()\"\n      >\n      </textarea>\n    </mat-card-actions>\n  </mat-card>\n</ng-template>\n", styles: ["ajf-report-builder-condition-editor textarea{width:100%}\n"], components: [{ type: i2.MatCard, selector: "mat-card", exportAs: ["matCard"] }, { type: i2.MatCardHeader, selector: "mat-card-header" }, { type: i3.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i4.MatOption, selector: "mat-option", exportAs: ["matOption"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatCardTitle, selector: "mat-card-title, [mat-card-title], [matCardTitle]" }, { type: i2.MatCardSubtitle, selector: "mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]" }, { type: i2.MatCardContent, selector: "mat-card-content, [mat-card-content], [matCardContent]" }, { type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.MatCardActions, selector: "mat-card-actions", inputs: ["align"], exportAs: ["matCardActions"] }, { type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }], pipes: { "transloco": i7.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderConditionEditor, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-condition-editor', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\">\n  <mat-card>\n    <mat-card-header>\n      <mat-card-title>condition of visibility</mat-card-title>\n      <mat-card-subtitle>\n        <ng-template [ngIf]=\"visibility\">\n          {{visibility.condition}}\n        </ng-template>\n      </mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n      <br />\n      <form>\n        <mat-select\n          [(ngModel)]=\"a\"\n          [ngModelOptions]=\"{standalone: true}\"\n          placeholder=\"Select condition\"\n        >\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option\n              *ngFor=\"let label of form.labels;let i = index;\"\n              [value]=\"label\"\n              (click)=\"setCurrent(id, i)\"\n            >\n              {{ id}}: {{ label }}\n            </mat-option>\n          </ng-template>\n        </mat-select>\n        <mat-select\n          [(ngModel)]=\"b\"\n          [ngModelOptions]=\"{standalone: true}\"\n          placeholder=\"Select operator\"\n        >\n          <mat-option\n            *ngFor=\"let operator of operators\"\n            (click)=\"appendText(operator);\"\n          >\n            {{ operator }}\n          </mat-option>\n        </mat-select>\n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <ng-template [ngIf]=\"!isValid\">\n        <ng-container\n          >{{'Invalid condition! Please check syntax.'|transloco}}</ng-container\n        >\n      </ng-template>\n      <textarea\n        #conditionTextArea\n        [(ngModel)]=\"conditionText\"\n        (keyup)=\"checkValidation()\"\n      >\n      </textarea>\n    </mat-card-actions>\n  </mat-card>\n</ng-template>\n", styles: ["ajf-report-builder-condition-editor textarea{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }]; }, propDecorators: { visibility: [{
                type: Input
            }], conditionTextArea: [{
                type: ViewChild,
                args: ['conditionTextArea', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2NvbmRpdGlvbi1lZGl0b3IuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7OztBQVNoRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtJQXdDMUM7OztPQUdHO0lBQ0gsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF4Q3JELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUdyQiw0QkFBNEI7UUFDNUIsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFPdkIsdUVBQXVFO1FBQ3ZFLGNBQVMsR0FBYTtZQUNwQixLQUFLO1lBQ0wsS0FBSztZQUNMLEdBQUc7WUFDSCxJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUk7WUFDSixHQUFHO1lBQ0gsSUFBSTtZQUNKLEdBQUc7WUFDSCxJQUFJO1lBQ0osSUFBSTtZQUNKLEdBQUc7WUFDSCxHQUFHO1lBQ0gsR0FBRztZQUNI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QUksSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7O29JQWpKVSwrQkFBK0I7d0hBQS9CLCtCQUErQix5T0NsRDVDLGt1REF5REE7bUdEUGEsK0JBQStCO2tCQVozQyxTQUFTOytCQUNFLHFDQUFxQyxpQkFHaEMsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4R0FRdEMsVUFBVTtzQkFBbEIsS0FBSztnQkFhMkMsaUJBQWlCO3NCQUFqRSxTQUFTO3VCQUFDLG1CQUFtQixFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb24sIHZhbGlkYXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtzYW5pdGl6ZUNvbmRpdGlvblN0cmluZ30gZnJvbSAnLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jb25kaXRpb24tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdjb25kaXRpb24tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29uZGl0aW9uLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIGJ1aWxkZXIgY29uZGl0aW9uIGVkaXRvclxuICogQGltcGxlbWVudHMgOiBPbkRlc3Ryb3lcbiAqIEBpbXBsZW1lbnRzIDogQWZ0ZXJWaWV3SW5pdFxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdmlzaWJpbGl0eTogQWpmQ29uZGl0aW9uO1xuXG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGlzVmFsaWQgPSBmYWxzZTtcbiAgbmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGN1cnJlbnRJZDogbnVtYmVyO1xuXG4gIC8vIGNvbmRpdGlvblRleHQgaXMgYSBzdHJpbmdcbiAgY29uZGl0aW9uVGV4dCA9ICd0cnVlJztcblxuICBhOiBhbnk7XG4gIGI6IGFueTtcblxuICBAVmlld0NoaWxkKCdjb25kaXRpb25UZXh0QXJlYScsIHtzdGF0aWM6IGZhbHNlfSkgY29uZGl0aW9uVGV4dEFyZWE6IGFueTtcblxuICAvLyAgb3BlcmF0b3JzIGlzIGFuIGFycmF5IG9mIGFueSB0eXBlIHRoYXQgY29udGFpbnMgYWxsIGFsbG93IG9wZXJhdG9yc1xuICBvcGVyYXRvcnM6IHN0cmluZ1tdID0gW1xuICAgICcoICknLFxuICAgIFwiJyAnXCIsXG4gICAgJzwnLFxuICAgICc8PScsXG4gICAgJz09JyxcbiAgICAnPj0nLFxuICAgICc+JyxcbiAgICAnIT0nLFxuICAgICchJyxcbiAgICAnJiYnLFxuICAgICd8fCcsXG4gICAgJysnLFxuICAgICctJyxcbiAgICAnKicsXG4gICAgJy8nLFxuICAgICclJyxcbiAgICAndHJ1ZScsXG4gICAgJ2ZhbHNlJyxcbiAgXTtcblxuICBwcml2YXRlIF9jb25kaXRpb25OYW1lc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBjdXJyZW50IGNvbmRpdGlvbiBieSBhamZCdWlsZGVyc2VydmljZVxuICAgKiBhbmQgaW5pdCBjb25kaXRpb24gYW5kIGF2YWlsYWJsZUZpZWxkTmFtZXMgc3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG4gIGV4dHJhY3ROYW1lcyhmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdKSB7XG4gICAgdGhpcy5uYW1lcy5sZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXNWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubmFtZXMgPSB0aGlzLm5hbWVzLmNvbmNhdChmb3Jtc1ZhcmlhYmxlc1tpXS5uYW1lcyk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q3VycmVudChpZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50SWQgPSBpZDtcbiAgICB0aGlzLmFwcGVuZFRleHQodGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubmFtZXNbaW5kZXhdKTtcbiAgICB0aGlzLmNoZWNrVmFsaWRhdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHN1Y2Nlc3MgaWYgdGhlIGN1cnJlbnQgY29uZHRpb24gaXMgdmFsaWRcbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuICB2YWxpZGF0ZUNvbmRpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsaWRhdGVFeHByZXNzaW9uKHRoaXMuY29uZGl0aW9uVGV4dCwgdGhpcy5uYW1lcyk7XG4gIH1cblxuICAvLyBUT0RPIGNvbXBsZXRlIHRoZSBjb21tZW50XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFwcGVuZCB0ZXh0IHRvIGpzb25cbiAgICogQHBhcmFtIHRleHQgICAgICA6IHN0cmluZyAtXG4gICAqIEBwYXJhbSBnb0JhY2tOdW0gOiBudW1iZXIgLVxuICAgKi9cbiAgYXBwZW5kVGV4dCh0ZXh0OiBzdHJpbmcsIF9nb0JhY2tOdW0/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGV4dCA9PSBudWxsIHx8IHRoaXMuY29uZGl0aW9uVGV4dEFyZWEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbCA9IHRoaXMuY29uZGl0aW9uVGV4dEFyZWEubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgc1N0YXJ0OiBudW1iZXIgPSBNYXRoLm1pbihlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgc0VuZDogbnVtYmVyID0gTWF0aC5tYXgoZWwuc2VsZWN0aW9uU3RhcnQsIGVsLnNlbGVjdGlvbkVuZCk7XG4gICAgbGV0IHN0YXJ0aW5nU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmNvbmRpdGlvblRleHQuc3Vic3RyKDAsIHNTdGFydCk7XG4gICAgbGV0IGVuZGluZ1N0cmluZzogc3RyaW5nID0gdGhpcy5jb25kaXRpb25UZXh0LnN1YnN0cihzRW5kKTtcbiAgICBsZXQgaW5pdGlhbExlbmdodDogbnVtYmVyID0gc3RhcnRpbmdTdHJpbmcubGVuZ3RoO1xuICAgIGxldCBuZXdTdHIgPSAnJztcblxuICAgIHN0YXJ0aW5nU3RyaW5nID0gc2FuaXRpemVDb25kaXRpb25TdHJpbmcoc3RhcnRpbmdTdHJpbmcpO1xuICAgIGVuZGluZ1N0cmluZyA9IHNhbml0aXplQ29uZGl0aW9uU3RyaW5nKGVuZGluZ1N0cmluZyk7XG4gICAgc1N0YXJ0ICs9XG4gICAgICBzdGFydGluZ1N0cmluZy5sZW5ndGggLSBpbml0aWFsTGVuZ2h0ICsgdGV4dC5sZW5ndGggKyAoc3RhcnRpbmdTdHJpbmcubGVuZ3RoID4gMCA/IDIgOiAxKTtcbiAgICBuZXdTdHIgPSBzdGFydGluZ1N0cmluZy5sZW5ndGggPiAwID8gYCR7c3RhcnRpbmdTdHJpbmd9IGAgOiAnJztcbiAgICB0aGlzLmNvbmRpdGlvblRleHQgPSBgJHtuZXdTdHJ9JHt0ZXh0fSAke2VuZGluZ1N0cmluZ31gO1xuXG4gICAgY29uc3QgcyA9IHRpbWVyKDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGVsLmNyZWF0ZVRleHRSYW5nZSkge1xuICAgICAgICBsZXQgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgcmFuZ2UubW92ZSgnY2hhcmFjdGVyJywgc1N0YXJ0KTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwuc2VsZWN0aW9uU3RhcnQpIHtcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHNTdGFydCwgc1N0YXJ0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy5pc1ZhbGlkID0gdGhpcy52YWxpZGF0ZUNvbmRpdGlvbigpO1xuICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcbiAgICAgIHRoaXMuc2F2ZUNvbmRpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNhdmUgY3VycmVudCBjb25kaXRpb25cbiAgICovXG4gIHNhdmVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlQ29uZGl0aW9uKHRoaXMuY29uZGl0aW9uVGV4dCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmRpdGlvblRleHQgPSB0aGlzLnZpc2liaWxpdHkuY29uZGl0aW9uO1xuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5jb25kaXRpb25UZXh0ID09ICd0cnVlJykge1xuICAgICAgdGhpcy5jb25kaXRpb25UZXh0ID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbmRpdGlvbk5hbWVzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmV4dHJhY3ROYW1lcyh0aGlzLmZvcm1zVmFyaWFibGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IGEgY29uZGl0aW9uU3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImZvcm1zVmFyaWFibGVzICE9IG51bGwgJiYgdmlzaWJpbGl0eSAhPSBudWxsXCI+XG4gIDxtYXQtY2FyZD5cbiAgICA8bWF0LWNhcmQtaGVhZGVyPlxuICAgICAgPG1hdC1jYXJkLXRpdGxlPmNvbmRpdGlvbiBvZiB2aXNpYmlsaXR5PC9tYXQtY2FyZC10aXRsZT5cbiAgICAgIDxtYXQtY2FyZC1zdWJ0aXRsZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInZpc2liaWxpdHlcIj5cbiAgICAgICAgICB7e3Zpc2liaWxpdHkuY29uZGl0aW9ufX1cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbWF0LWNhcmQtc3VidGl0bGU+XG4gICAgPC9tYXQtY2FyZC1oZWFkZXI+XG4gICAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICA8YnIgLz5cbiAgICAgIDxmb3JtPlxuICAgICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAgIFsobmdNb2RlbCldPVwiYVwiXG4gICAgICAgICAgW25nTW9kZWxPcHRpb25zXT1cIntzdGFuZGFsb25lOiB0cnVlfVwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgY29uZGl0aW9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtZm9ybSBsZXQtaWQ9XCJpbmRleFwiIFtuZ0Zvck9mXT1cImZvcm1zVmFyaWFibGVzXCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbGFiZWwgb2YgZm9ybS5sYWJlbHM7bGV0IGkgPSBpbmRleDtcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwibGFiZWxcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwic2V0Q3VycmVudChpZCwgaSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBpZH19OiB7eyBsYWJlbCB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cImJcIlxuICAgICAgICAgIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTogdHJ1ZX1cIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IG9wZXJhdG9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3BlcmF0b3Igb2Ygb3BlcmF0b3JzXCJcbiAgICAgICAgICAgIChjbGljayk9XCJhcHBlbmRUZXh0KG9wZXJhdG9yKTtcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IG9wZXJhdG9yIH19XG4gICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9tYXQtY2FyZC1jb250ZW50PlxuICAgIDxtYXQtY2FyZC1hY3Rpb25zPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc1ZhbGlkXCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICA+e3snSW52YWxpZCBjb25kaXRpb24hIFBsZWFzZSBjaGVjayBzeW50YXguJ3x0cmFuc2xvY299fTwvbmctY29udGFpbmVyXG4gICAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgI2NvbmRpdGlvblRleHRBcmVhXG4gICAgICAgIFsobmdNb2RlbCldPVwiY29uZGl0aW9uVGV4dFwiXG4gICAgICAgIChrZXl1cCk9XCJjaGVja1ZhbGlkYXRpb24oKVwiXG4gICAgICA+XG4gICAgICA8L3RleHRhcmVhPlxuICAgIDwvbWF0LWNhcmQtYWN0aW9ucz5cbiAgPC9tYXQtY2FyZD5cbjwvbmctdGVtcGxhdGU+XG4iXX0=