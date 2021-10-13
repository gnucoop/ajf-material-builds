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
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
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
            '( )', '\' \'', '<', '<=', '==', '>=', '>', '!=', '!', '&&', '||', '+', '-', '*', '/', '%',
            'true', 'false'
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
        this._conditionNamesSub = this._service.conditionNames.subscribe((x) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2NvbmRpdGlvbi1lZGl0b3IuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWUsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd6QyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7OztBQVVoRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtJQXlCMUM7OztPQUdHO0lBQ0gsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF6QnJELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUdyQiw0QkFBNEI7UUFDNUIsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFRdkIsdUVBQXVFO1FBQ3ZFLGNBQVMsR0FBYTtZQUNwQixLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFF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Q0FBQyxJQUFJLElBQUksRUFBRTtnQkFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOztvSUFsSVUsK0JBQStCO3dIQUEvQiwrQkFBK0IseU9DbkQ1QyxrdURBeURBO21HRE5hLCtCQUErQjtrQkFaM0MsU0FBUzsrQkFDRSxxQ0FBcUMsaUJBR2hDLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07OEdBUXRDLFVBQVU7c0JBQWxCLEtBQUs7Z0JBYzJDLGlCQUFpQjtzQkFBakUsU0FBUzt1QkFBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCB2YWxpZGF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtzYW5pdGl6ZUNvbmRpdGlvblN0cmluZ30gZnJvbSAnLi91dGlscyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWNvbmRpdGlvbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ2NvbmRpdGlvbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb25kaXRpb24tZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciBidWlsZGVyIGNvbmRpdGlvbiBlZGl0b3JcbiAqIEBpbXBsZW1lbnRzIDogT25EZXN0cm95XG4gKiBAaW1wbGVtZW50cyA6IEFmdGVyVmlld0luaXRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHZpc2liaWxpdHk6IEFqZkNvbmRpdGlvbjtcblxuICBmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdO1xuICBpc1ZhbGlkID0gZmFsc2U7XG4gIG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBjdXJyZW50SWQ6IG51bWJlcjtcblxuICAvLyBjb25kaXRpb25UZXh0IGlzIGEgc3RyaW5nXG4gIGNvbmRpdGlvblRleHQgPSAndHJ1ZSc7XG5cbiAgYTogYW55O1xuICBiOiBhbnk7XG5cblxuICBAVmlld0NoaWxkKCdjb25kaXRpb25UZXh0QXJlYScsIHtzdGF0aWM6IGZhbHNlfSkgY29uZGl0aW9uVGV4dEFyZWE6IGFueTtcblxuICAvLyAgb3BlcmF0b3JzIGlzIGFuIGFycmF5IG9mIGFueSB0eXBlIHRoYXQgY29udGFpbnMgYWxsIGFsbG93IG9wZXJhdG9yc1xuICBvcGVyYXRvcnM6IHN0cmluZ1tdID0gW1xuICAgICcoICknLCAnXFwnIFxcJycsICc8JywgJzw9JywgJz09JywgJz49JywgJz4nLCAnIT0nLCAnIScsICcmJicsICd8fCcsICcrJywgJy0nLCAnKicsICcvJywgJyUnLFxuICAgICd0cnVlJywgJ2ZhbHNlJ1xuICBdO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgY29uZGl0aW9uIGJ5IGFqZkJ1aWxkZXJzZXJ2aWNlXG4gICAqIGFuZCBpbml0IGNvbmRpdGlvbiBhbmQgYXZhaWxhYmxlRmllbGROYW1lcyBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cbiAgZXh0cmFjdE5hbWVzKGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10pIHtcbiAgICB0aGlzLm5hbWVzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc1ZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5uYW1lcyA9IHRoaXMubmFtZXMuY29uY2F0KGZvcm1zVmFyaWFibGVzW2ldLm5hbWVzKTtcbiAgICB9XG4gIH1cblxuICBzZXRDdXJyZW50KGlkOiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJZCA9IGlkO1xuICAgIHRoaXMuYXBwZW5kVGV4dCh0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5uYW1lc1tpbmRleF0pO1xuICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gc3VjY2VzcyBpZiB0aGUgY3VycmVudCBjb25kdGlvbiBpcyB2YWxpZFxuICAgKiBAcmV0dXJuIGJvb2xlYW5cbiAgICovXG4gIHZhbGlkYXRlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWxpZGF0ZUV4cHJlc3Npb24odGhpcy5jb25kaXRpb25UZXh0LCB0aGlzLm5hbWVzKTtcbiAgfVxuXG4gIC8vIFRPRE8gY29tcGxldGUgdGhlIGNvbW1lbnRcbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYXBwZW5kIHRleHQgdG8ganNvblxuICAgKiBAcGFyYW0gdGV4dCAgICAgIDogc3RyaW5nIC1cbiAgICogQHBhcmFtIGdvQmFja051bSA6IG51bWJlciAtXG4gICAqL1xuICBhcHBlbmRUZXh0KHRleHQ6IHN0cmluZywgX2dvQmFja051bT86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0ZXh0ID09IG51bGwgfHwgdGhpcy5jb25kaXRpb25UZXh0QXJlYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsID0gdGhpcy5jb25kaXRpb25UZXh0QXJlYS5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBzU3RhcnQ6IG51bWJlciA9IE1hdGgubWluKGVsLnNlbGVjdGlvblN0YXJ0LCBlbC5zZWxlY3Rpb25FbmQpO1xuICAgIGxldCBzRW5kOiBudW1iZXIgPSBNYXRoLm1heChlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgc3RhcnRpbmdTdHJpbmc6IHN0cmluZyA9IHRoaXMuY29uZGl0aW9uVGV4dC5zdWJzdHIoMCwgc1N0YXJ0KTtcbiAgICBsZXQgZW5kaW5nU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmNvbmRpdGlvblRleHQuc3Vic3RyKHNFbmQpO1xuICAgIGxldCBpbml0aWFsTGVuZ2h0OiBudW1iZXIgPSBzdGFydGluZ1N0cmluZy5sZW5ndGg7XG4gICAgbGV0IG5ld1N0ciA9ICcnO1xuXG4gICAgc3RhcnRpbmdTdHJpbmcgPSBzYW5pdGl6ZUNvbmRpdGlvblN0cmluZyhzdGFydGluZ1N0cmluZyk7XG4gICAgZW5kaW5nU3RyaW5nID0gc2FuaXRpemVDb25kaXRpb25TdHJpbmcoZW5kaW5nU3RyaW5nKTtcbiAgICBzU3RhcnQgKz1cbiAgICAgICAgc3RhcnRpbmdTdHJpbmcubGVuZ3RoIC0gaW5pdGlhbExlbmdodCArIHRleHQubGVuZ3RoICsgKHN0YXJ0aW5nU3RyaW5nLmxlbmd0aCA+IDAgPyAyIDogMSk7XG4gICAgbmV3U3RyID0gc3RhcnRpbmdTdHJpbmcubGVuZ3RoID4gMCA/IGAke3N0YXJ0aW5nU3RyaW5nfSBgIDogJyc7XG4gICAgdGhpcy5jb25kaXRpb25UZXh0ID0gYCR7bmV3U3RyfSR7dGV4dH0gJHtlbmRpbmdTdHJpbmd9YDtcblxuICAgIGNvbnN0IHMgPSB0aW1lcigwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbC5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgICAgbGV0IHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgIHJhbmdlLm1vdmUoJ2NoYXJhY3RlcicsIHNTdGFydCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnNlbGVjdGlvblN0YXJ0KSB7XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShzU3RhcnQsIHNTdGFydCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuaXNWYWxpZCA9IHRoaXMudmFsaWRhdGVDb25kaXRpb24oKTtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XG4gICAgICB0aGlzLnNhdmVDb25kaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzYXZlIGN1cnJlbnQgY29uZGl0aW9uXG4gICAqL1xuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUNvbmRpdGlvbih0aGlzLmNvbmRpdGlvblRleHQpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25kaXRpb25UZXh0ID0gdGhpcy52aXNpYmlsaXR5LmNvbmRpdGlvbjtcbiAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uVGV4dCA9PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzU3ViID0gdGhpcy5fc2VydmljZS5jb25kaXRpb25OYW1lcy5zdWJzY3JpYmUoKHgpID0+IHtcbiAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmV4dHJhY3ROYW1lcyh0aGlzLmZvcm1zVmFyaWFibGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IGEgY29uZGl0aW9uU3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImZvcm1zVmFyaWFibGVzICE9IG51bGwgJiYgdmlzaWJpbGl0eSAhPSBudWxsXCI+XG4gIDxtYXQtY2FyZD5cbiAgICA8bWF0LWNhcmQtaGVhZGVyPlxuICAgICAgPG1hdC1jYXJkLXRpdGxlPmNvbmRpdGlvbiBvZiB2aXNpYmlsaXR5PC9tYXQtY2FyZC10aXRsZT5cbiAgICAgIDxtYXQtY2FyZC1zdWJ0aXRsZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInZpc2liaWxpdHlcIj5cbiAgICAgICAgICB7e3Zpc2liaWxpdHkuY29uZGl0aW9ufX1cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbWF0LWNhcmQtc3VidGl0bGU+XG4gICAgPC9tYXQtY2FyZC1oZWFkZXI+XG4gICAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICA8YnIgLz5cbiAgICAgIDxmb3JtPlxuICAgICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAgIFsobmdNb2RlbCldPVwiYVwiXG4gICAgICAgICAgW25nTW9kZWxPcHRpb25zXT1cIntzdGFuZGFsb25lOiB0cnVlfVwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgY29uZGl0aW9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtZm9ybSBsZXQtaWQ9XCJpbmRleFwiIFtuZ0Zvck9mXT1cImZvcm1zVmFyaWFibGVzXCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvblxuICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgbGFiZWwgb2YgZm9ybS5sYWJlbHM7bGV0IGkgPSBpbmRleDtcIlxuICAgICAgICAgICAgICBbdmFsdWVdPVwibGFiZWxcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwic2V0Q3VycmVudChpZCwgaSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBpZH19OiB7eyBsYWJlbCB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgICBbKG5nTW9kZWwpXT1cImJcIlxuICAgICAgICAgIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTogdHJ1ZX1cIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IG9wZXJhdG9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgb3BlcmF0b3Igb2Ygb3BlcmF0b3JzXCJcbiAgICAgICAgICAgIChjbGljayk9XCJhcHBlbmRUZXh0KG9wZXJhdG9yKTtcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7IG9wZXJhdG9yIH19XG4gICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9tYXQtY2FyZC1jb250ZW50PlxuICAgIDxtYXQtY2FyZC1hY3Rpb25zPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIiFpc1ZhbGlkXCI+XG4gICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICA+e3snSW52YWxpZCBjb25kaXRpb24hIFBsZWFzZSBjaGVjayBzeW50YXguJ3x0cmFuc2xvY299fTwvbmctY29udGFpbmVyXG4gICAgICAgID5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgI2NvbmRpdGlvblRleHRBcmVhXG4gICAgICAgIFsobmdNb2RlbCldPVwiY29uZGl0aW9uVGV4dFwiXG4gICAgICAgIChrZXl1cCk9XCJjaGVja1ZhbGlkYXRpb24oKVwiXG4gICAgICA+XG4gICAgICA8L3RleHRhcmVhPlxuICAgIDwvbWF0LWNhcmQtYWN0aW9ucz5cbiAgPC9tYXQtY2FyZD5cbjwvbmctdGVtcGxhdGU+XG4iXX0=