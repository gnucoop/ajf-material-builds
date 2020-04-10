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
var AjfReportBuilderConditionEditor = /** @class */ (function () {
    /**
     * this constructor will init current condition by ajfBuilderservice
     * and init condition and availableFieldNames subscriptions
     */
    function AjfReportBuilderConditionEditor(_service) {
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
    AjfReportBuilderConditionEditor.prototype.extractNames = function (formsVariables) {
        this.names.length = 0;
        for (var i = 0; i < formsVariables.length; i++) {
            this.names = this.names.concat(formsVariables[i].names);
        }
    };
    AjfReportBuilderConditionEditor.prototype.setCurrent = function (id, index) {
        this.currentId = id;
        this.appendText(this.formsVariables[id].names[index]);
        this.checkValidation();
    };
    /**
     * this method will return success if the current condtion is valid
     * @return boolean
     */
    AjfReportBuilderConditionEditor.prototype.validateCondition = function () {
        return validateExpression(this.conditionText, this.names);
    };
    // TODO complete the comment
    /**
     * this method will append text to json
     * @param text      : string -
     * @param goBackNum : number -
     */
    AjfReportBuilderConditionEditor.prototype.appendText = function (text, _goBackNum) {
        if (text == null || this.conditionTextArea == null) {
            return;
        }
        var el = this.conditionTextArea.nativeElement;
        var sStart = Math.min(el.selectionStart, el.selectionEnd);
        var sEnd = Math.max(el.selectionStart, el.selectionEnd);
        var startingString = this.conditionText.substr(0, sStart);
        var endingString = this.conditionText.substr(sEnd);
        var initialLenght = startingString.length;
        var newStr = '';
        startingString = sanitizeConditionString(startingString);
        endingString = sanitizeConditionString(endingString);
        sStart +=
            startingString.length - initialLenght + text.length + (startingString.length > 0 ? 2 : 1);
        newStr = startingString.length > 0 ? startingString + " " : '';
        this.conditionText = "" + newStr + text + " " + endingString;
        var s = timer(0).subscribe(function () {
            if (s && !s.closed) {
                s.unsubscribe();
            }
            if (el.createTextRange) {
                var range = el.createTextRange();
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
    };
    AjfReportBuilderConditionEditor.prototype.checkValidation = function () {
        this.isValid = this.validateCondition();
        if (this.isValid) {
            this.saveCondition();
        }
    };
    /**
     * this method will save current condition
     */
    AjfReportBuilderConditionEditor.prototype.saveCondition = function () {
        this._service.saveCondition(this.conditionText);
    };
    AjfReportBuilderConditionEditor.prototype.ngOnInit = function () {
        var _this = this;
        this.conditionText = this.visibility.condition;
        this.isValid = true;
        if (this.conditionText == 'true') {
            this.conditionText = '';
        }
        this._conditionNamesSub = this._service.conditionNames.subscribe(function (x) {
            _this.formsVariables = x;
            if (x != null) {
                _this.extractNames(_this.formsVariables);
            }
        });
    };
    /**
     * this method will destroy a conditionSubscriptions
     */
    AjfReportBuilderConditionEditor.prototype.ngOnDestroy = function () {
        this._conditionNamesSub.unsubscribe();
    };
    AjfReportBuilderConditionEditor.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-condition-editor',
                    template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\">\n  <mat-card>\n    <mat-card-header>\n      <mat-card-title>condition of visibility</mat-card-title>\n      <mat-card-subtitle>\n        <ng-template [ngIf]=\"visibility\">\n          {{visibility.condition}}\n        </ng-template>\n      </mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n      <br>\n      <form>\n        <mat-select [(ngModel)]=\"a\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select condition\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option *ngFor=\"let label of form.labels;let i = index;\" [value]=\"label\" (click)=\"setCurrent(id, i)\">\n              {{ id}}: {{ label }}\n            </mat-option>\n          </ng-template>\n        </mat-select>\n        <mat-select [(ngModel)]=\"b\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select operator\">\n          <mat-option *ngFor=\"let operator of operators\" (click)=\"appendText(operator);\">\n            {{ operator }}\n          </mat-option>\n        </mat-select>\n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <ng-template [ngIf]=\"!isValid\">\n        <ng-container translate>Invalid condition! Please check syntax.</ng-container>\n      </ng-template>\n      <textarea\n          #conditionTextArea\n          [(ngModel)]=\"conditionText\"\n          (keyup)=\"checkValidation()\">\n        </textarea>\n    </mat-card-actions>\n  </mat-card>\n</ng-template>\n\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report-builder-condition-editor textarea{width:100%}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderConditionEditor.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    AjfReportBuilderConditionEditor.propDecorators = {
        visibility: [{ type: Input }],
        conditionTextArea: [{ type: ViewChild, args: ['conditionTextArea', { static: false },] }]
    };
    return AjfReportBuilderConditionEditor;
}());
export { AjfReportBuilderConditionEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBZSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUdoRDtJQXFDRTs7O09BR0c7SUFDSCx5Q0FBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF6QnJELFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUdyQiw0QkFBNEI7UUFDNUIsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFRdkIsdUVBQXVFO1FBQ3ZFLGNBQVMsR0FBYTtZQUNwQixLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQzFGLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUM7UUFFTSx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQU1OLENBQUM7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Q3hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxxREFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7O2dCQTlJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MseWhEQUFvQztvQkFFcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBVk8sdUJBQXVCOzs7NkJBaUI1QixLQUFLO29DQWNMLFNBQVMsU0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7O0lBb0hqRCxzQ0FBQztDQUFBLEFBL0lELElBK0lDO1NBbklZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb24sIHZhbGlkYXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXN9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge3Nhbml0aXplQ29uZGl0aW9uU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItY29uZGl0aW9uLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnY29uZGl0aW9uLWVkaXRvci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbmRpdGlvbi1lZGl0b3IuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLyoqXG4gKiBUaGlzIGNsYXNzIHdpbGwgZGVmaW5lIGFuIGFqZiBidWlsZGVyIGJ1aWxkZXIgY29uZGl0aW9uIGVkaXRvclxuICogQGltcGxlbWVudHMgOiBPbkRlc3Ryb3lcbiAqIEBpbXBsZW1lbnRzIDogQWZ0ZXJWaWV3SW5pdFxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckNvbmRpdGlvbkVkaXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdmlzaWJpbGl0eTogQWpmQ29uZGl0aW9uO1xuXG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGlzVmFsaWQgPSBmYWxzZTtcbiAgbmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGN1cnJlbnRJZDogbnVtYmVyO1xuXG4gIC8vIGNvbmRpdGlvblRleHQgaXMgYSBzdHJpbmdcbiAgY29uZGl0aW9uVGV4dCA9ICd0cnVlJztcblxuICBhOiBhbnk7XG4gIGI6IGFueTtcblxuXG4gIEBWaWV3Q2hpbGQoJ2NvbmRpdGlvblRleHRBcmVhJywge3N0YXRpYzogZmFsc2V9KSBjb25kaXRpb25UZXh0QXJlYTogYW55O1xuXG4gIC8vICBvcGVyYXRvcnMgaXMgYW4gYXJyYXkgb2YgYW55IHR5cGUgdGhhdCBjb250YWlucyBhbGwgYWxsb3cgb3BlcmF0b3JzXG4gIG9wZXJhdG9yczogc3RyaW5nW10gPSBbXG4gICAgJyggKScsICdcXCcgXFwnJywgJzwnLCAnPD0nLCAnPT0nLCAnPj0nLCAnPicsICchPScsICchJywgJyYmJywgJ3x8JywgJysnLCAnLScsICcqJywgJy8nLCAnJScsXG4gICAgJ3RydWUnLCAnZmFsc2UnXG4gIF07XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgY3VycmVudCBjb25kaXRpb24gYnkgYWpmQnVpbGRlcnNlcnZpY2VcbiAgICogYW5kIGluaXQgY29uZGl0aW9uIGFuZCBhdmFpbGFibGVGaWVsZE5hbWVzIHN1YnNjcmlwdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7fVxuICBleHRyYWN0TmFtZXMoZm9ybXNWYXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSkge1xuICAgIHRoaXMubmFtZXMubGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zVmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLm5hbWVzID0gdGhpcy5uYW1lcy5jb25jYXQoZm9ybXNWYXJpYWJsZXNbaV0ubmFtZXMpO1xuICAgIH1cbiAgfVxuXG4gIHNldEN1cnJlbnQoaWQ6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudElkID0gaWQ7XG4gICAgdGhpcy5hcHBlbmRUZXh0KHRoaXMuZm9ybXNWYXJpYWJsZXNbaWRdLm5hbWVzW2luZGV4XSk7XG4gICAgdGhpcy5jaGVja1ZhbGlkYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBzdWNjZXNzIGlmIHRoZSBjdXJyZW50IGNvbmR0aW9uIGlzIHZhbGlkXG4gICAqIEByZXR1cm4gYm9vbGVhblxuICAgKi9cbiAgdmFsaWRhdGVDb25kaXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbGlkYXRlRXhwcmVzc2lvbih0aGlzLmNvbmRpdGlvblRleHQsIHRoaXMubmFtZXMpO1xuICB9XG5cbiAgLy8gVE9ETyBjb21wbGV0ZSB0aGUgY29tbWVudFxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBhcHBlbmQgdGV4dCB0byBqc29uXG4gICAqIEBwYXJhbSB0ZXh0ICAgICAgOiBzdHJpbmcgLVxuICAgKiBAcGFyYW0gZ29CYWNrTnVtIDogbnVtYmVyIC1cbiAgICovXG4gIGFwcGVuZFRleHQodGV4dDogc3RyaW5nLCBfZ29CYWNrTnVtPzogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRleHQgPT0gbnVsbCB8fCB0aGlzLmNvbmRpdGlvblRleHRBcmVhID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZWwgPSB0aGlzLmNvbmRpdGlvblRleHRBcmVhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHNTdGFydDogbnVtYmVyID0gTWF0aC5taW4oZWwuc2VsZWN0aW9uU3RhcnQsIGVsLnNlbGVjdGlvbkVuZCk7XG4gICAgbGV0IHNFbmQ6IG51bWJlciA9IE1hdGgubWF4KGVsLnNlbGVjdGlvblN0YXJ0LCBlbC5zZWxlY3Rpb25FbmQpO1xuICAgIGxldCBzdGFydGluZ1N0cmluZzogc3RyaW5nID0gdGhpcy5jb25kaXRpb25UZXh0LnN1YnN0cigwLCBzU3RhcnQpO1xuICAgIGxldCBlbmRpbmdTdHJpbmc6IHN0cmluZyA9IHRoaXMuY29uZGl0aW9uVGV4dC5zdWJzdHIoc0VuZCk7XG4gICAgbGV0IGluaXRpYWxMZW5naHQ6IG51bWJlciA9IHN0YXJ0aW5nU3RyaW5nLmxlbmd0aDtcbiAgICBsZXQgbmV3U3RyID0gJyc7XG5cbiAgICBzdGFydGluZ1N0cmluZyA9IHNhbml0aXplQ29uZGl0aW9uU3RyaW5nKHN0YXJ0aW5nU3RyaW5nKTtcbiAgICBlbmRpbmdTdHJpbmcgPSBzYW5pdGl6ZUNvbmRpdGlvblN0cmluZyhlbmRpbmdTdHJpbmcpO1xuICAgIHNTdGFydCArPVxuICAgICAgICBzdGFydGluZ1N0cmluZy5sZW5ndGggLSBpbml0aWFsTGVuZ2h0ICsgdGV4dC5sZW5ndGggKyAoc3RhcnRpbmdTdHJpbmcubGVuZ3RoID4gMCA/IDIgOiAxKTtcbiAgICBuZXdTdHIgPSBzdGFydGluZ1N0cmluZy5sZW5ndGggPiAwID8gYCR7c3RhcnRpbmdTdHJpbmd9IGAgOiAnJztcbiAgICB0aGlzLmNvbmRpdGlvblRleHQgPSBgJHtuZXdTdHJ9JHt0ZXh0fSAke2VuZGluZ1N0cmluZ31gO1xuXG4gICAgY29uc3QgcyA9IHRpbWVyKDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgaWYgKGVsLmNyZWF0ZVRleHRSYW5nZSkge1xuICAgICAgICBsZXQgcmFuZ2UgPSBlbC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgcmFuZ2UubW92ZSgnY2hhcmFjdGVyJywgc1N0YXJ0KTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWwuc2VsZWN0aW9uU3RhcnQpIHtcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIGVsLnNldFNlbGVjdGlvblJhbmdlKHNTdGFydCwgc1N0YXJ0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy5pc1ZhbGlkID0gdGhpcy52YWxpZGF0ZUNvbmRpdGlvbigpO1xuICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcbiAgICAgIHRoaXMuc2F2ZUNvbmRpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNhdmUgY3VycmVudCBjb25kaXRpb25cbiAgICovXG4gIHNhdmVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zYXZlQ29uZGl0aW9uKHRoaXMuY29uZGl0aW9uVGV4dCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbmRpdGlvblRleHQgPSB0aGlzLnZpc2liaWxpdHkuY29uZGl0aW9uO1xuICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5jb25kaXRpb25UZXh0ID09ICd0cnVlJykge1xuICAgICAgdGhpcy5jb25kaXRpb25UZXh0ID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbmRpdGlvbk5hbWVzLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcyA9IHg7XG4gICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZXh0cmFjdE5hbWVzKHRoaXMuZm9ybXNWYXJpYWJsZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGRlc3Ryb3kgYSBjb25kaXRpb25TdWJzY3JpcHRpb25zXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25kaXRpb25OYW1lc1N1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=