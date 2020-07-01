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
AjfReportBuilderConditionEditor.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-condition-editor',
                template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\">\n  <mat-card>\n    <mat-card-header>\n      <mat-card-title>condition of visibility</mat-card-title>\n      <mat-card-subtitle>\n        <ng-template [ngIf]=\"visibility\">\n          {{visibility.condition}}\n        </ng-template>\n      </mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n      <br>\n      <form>\n        <mat-select [(ngModel)]=\"a\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select condition\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option *ngFor=\"let label of form.labels;let i = index;\" [value]=\"label\" (click)=\"setCurrent(id, i)\">\n              {{ id}}: {{ label }}\n            </mat-option>\n          </ng-template>\n        </mat-select>\n        <mat-select [(ngModel)]=\"b\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select operator\">\n          <mat-option *ngFor=\"let operator of operators\" (click)=\"appendText(operator);\">\n            {{ operator }}\n          </mat-option>\n        </mat-select>\n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <ng-template [ngIf]=\"!isValid\">\n        <ng-container translate>Invalid condition! Please check syntax.</ng-container>\n      </ng-template>\n      <textarea\n          #conditionTextArea\n          [(ngModel)]=\"conditionText\"\n          (keyup)=\"checkValidation()\">\n        </textarea>\n    </mat-card-actions>\n  </mat-card>\n</ng-template>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-condition-editor textarea{width:100%}\n"]
            },] }
];
AjfReportBuilderConditionEditor.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderConditionEditor.propDecorators = {
    visibility: [{ type: Input }],
    conditionTextArea: [{ type: ViewChild, args: ['conditionTextArea', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBZSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQVVoRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjtJQXlCMUM7OztPQUdHO0lBQ0gsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF6QnJELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUdyQiw0QkFBNEI7UUFDNUIsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFRdkIsdUVBQXVFO1FBQ3ZFLGNBQVMsR0FBYTtZQUNwQixLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQzFGLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUM7UUFFTSx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtB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QUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7WUE5SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQ0FBcUM7Z0JBQy9DLHloREFBb0M7Z0JBRXBDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7OztZQVZPLHVCQUF1Qjs7O3lCQWlCNUIsS0FBSztnQ0FjTCxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgdmFsaWRhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7c2FuaXRpemVDb25kaXRpb25TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jb25kaXRpb24tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdjb25kaXRpb24tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29uZGl0aW9uLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgYnVpbGRlciBjb25kaXRpb24gZWRpdG9yXG4gKiBAaW1wbGVtZW50cyA6IE9uRGVzdHJveVxuICogQGltcGxlbWVudHMgOiBBZnRlclZpZXdJbml0XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ29uZGl0aW9uRWRpdG9yIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB2aXNpYmlsaXR5OiBBamZDb25kaXRpb247XG5cbiAgZm9ybXNWYXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXTtcbiAgaXNWYWxpZCA9IGZhbHNlO1xuICBuYW1lczogc3RyaW5nW10gPSBbXTtcbiAgY3VycmVudElkOiBudW1iZXI7XG5cbiAgLy8gY29uZGl0aW9uVGV4dCBpcyBhIHN0cmluZ1xuICBjb25kaXRpb25UZXh0ID0gJ3RydWUnO1xuXG4gIGE6IGFueTtcbiAgYjogYW55O1xuXG5cbiAgQFZpZXdDaGlsZCgnY29uZGl0aW9uVGV4dEFyZWEnLCB7c3RhdGljOiBmYWxzZX0pIGNvbmRpdGlvblRleHRBcmVhOiBhbnk7XG5cbiAgLy8gIG9wZXJhdG9ycyBpcyBhbiBhcnJheSBvZiBhbnkgdHlwZSB0aGF0IGNvbnRhaW5zIGFsbCBhbGxvdyBvcGVyYXRvcnNcbiAgb3BlcmF0b3JzOiBzdHJpbmdbXSA9IFtcbiAgICAnKCApJywgJ1xcJyBcXCcnLCAnPCcsICc8PScsICc9PScsICc+PScsICc+JywgJyE9JywgJyEnLCAnJiYnLCAnfHwnLCAnKycsICctJywgJyonLCAnLycsICclJyxcbiAgICAndHJ1ZScsICdmYWxzZSdcbiAgXTtcblxuICBwcml2YXRlIF9jb25kaXRpb25OYW1lc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBjdXJyZW50IGNvbmRpdGlvbiBieSBhamZCdWlsZGVyc2VydmljZVxuICAgKiBhbmQgaW5pdCBjb25kaXRpb24gYW5kIGF2YWlsYWJsZUZpZWxkTmFtZXMgc3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG4gIGV4dHJhY3ROYW1lcyhmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdKSB7XG4gICAgdGhpcy5uYW1lcy5sZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXNWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubmFtZXMgPSB0aGlzLm5hbWVzLmNvbmNhdChmb3Jtc1ZhcmlhYmxlc1tpXS5uYW1lcyk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q3VycmVudChpZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50SWQgPSBpZDtcbiAgICB0aGlzLmFwcGVuZFRleHQodGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubmFtZXNbaW5kZXhdKTtcbiAgICB0aGlzLmNoZWNrVmFsaWRhdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHN1Y2Nlc3MgaWYgdGhlIGN1cnJlbnQgY29uZHRpb24gaXMgdmFsaWRcbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuICB2YWxpZGF0ZUNvbmRpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsaWRhdGVFeHByZXNzaW9uKHRoaXMuY29uZGl0aW9uVGV4dCwgdGhpcy5uYW1lcyk7XG4gIH1cblxuICAvLyBUT0RPIGNvbXBsZXRlIHRoZSBjb21tZW50XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFwcGVuZCB0ZXh0IHRvIGpzb25cbiAgICogQHBhcmFtIHRleHQgICAgICA6IHN0cmluZyAtXG4gICAqIEBwYXJhbSBnb0JhY2tOdW0gOiBudW1iZXIgLVxuICAgKi9cbiAgYXBwZW5kVGV4dCh0ZXh0OiBzdHJpbmcsIF9nb0JhY2tOdW0/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGV4dCA9PSBudWxsIHx8IHRoaXMuY29uZGl0aW9uVGV4dEFyZWEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbCA9IHRoaXMuY29uZGl0aW9uVGV4dEFyZWEubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgc1N0YXJ0OiBudW1iZXIgPSBNYXRoLm1pbihlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgc0VuZDogbnVtYmVyID0gTWF0aC5tYXgoZWwuc2VsZWN0aW9uU3RhcnQsIGVsLnNlbGVjdGlvbkVuZCk7XG4gICAgbGV0IHN0YXJ0aW5nU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmNvbmRpdGlvblRleHQuc3Vic3RyKDAsIHNTdGFydCk7XG4gICAgbGV0IGVuZGluZ1N0cmluZzogc3RyaW5nID0gdGhpcy5jb25kaXRpb25UZXh0LnN1YnN0cihzRW5kKTtcbiAgICBsZXQgaW5pdGlhbExlbmdodDogbnVtYmVyID0gc3RhcnRpbmdTdHJpbmcubGVuZ3RoO1xuICAgIGxldCBuZXdTdHIgPSAnJztcblxuICAgIHN0YXJ0aW5nU3RyaW5nID0gc2FuaXRpemVDb25kaXRpb25TdHJpbmcoc3RhcnRpbmdTdHJpbmcpO1xuICAgIGVuZGluZ1N0cmluZyA9IHNhbml0aXplQ29uZGl0aW9uU3RyaW5nKGVuZGluZ1N0cmluZyk7XG4gICAgc1N0YXJ0ICs9XG4gICAgICAgIHN0YXJ0aW5nU3RyaW5nLmxlbmd0aCAtIGluaXRpYWxMZW5naHQgKyB0ZXh0Lmxlbmd0aCArIChzdGFydGluZ1N0cmluZy5sZW5ndGggPiAwID8gMiA6IDEpO1xuICAgIG5ld1N0ciA9IHN0YXJ0aW5nU3RyaW5nLmxlbmd0aCA+IDAgPyBgJHtzdGFydGluZ1N0cmluZ30gYCA6ICcnO1xuICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9IGAke25ld1N0cn0ke3RleHR9ICR7ZW5kaW5nU3RyaW5nfWA7XG5cbiAgICBjb25zdCBzID0gdGltZXIoMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChzICYmICFzLmNsb3NlZCkge1xuICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICBpZiAoZWwuY3JlYXRlVGV4dFJhbmdlKSB7XG4gICAgICAgIGxldCByYW5nZSA9IGVsLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICByYW5nZS5tb3ZlKCdjaGFyYWN0ZXInLCBzU3RhcnQpO1xuICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC5zZWxlY3Rpb25TdGFydCkge1xuICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2Uoc1N0YXJ0LCBzU3RhcnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLmlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlQ29uZGl0aW9uKCk7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCkge1xuICAgICAgdGhpcy5zYXZlQ29uZGl0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2F2ZSBjdXJyZW50IGNvbmRpdGlvblxuICAgKi9cbiAgc2F2ZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVDb25kaXRpb24odGhpcy5jb25kaXRpb25UZXh0KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9IHRoaXMudmlzaWJpbGl0eS5jb25kaXRpb247XG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmNvbmRpdGlvblRleHQgPT0gJ3RydWUnKSB7XG4gICAgICB0aGlzLmNvbmRpdGlvblRleHQgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLl9jb25kaXRpb25OYW1lc1N1YiA9IHRoaXMuX3NlcnZpY2UuY29uZGl0aW9uTmFtZXMuc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICB0aGlzLmZvcm1zVmFyaWFibGVzID0geDtcbiAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5leHRyYWN0TmFtZXModGhpcy5mb3Jtc1ZhcmlhYmxlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgZGVzdHJveSBhIGNvbmRpdGlvblN1YnNjcmlwdGlvbnNcbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==