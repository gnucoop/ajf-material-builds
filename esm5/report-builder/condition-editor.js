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
            '( )', '\' \'',
            '<', '<=', '==', '>=', '>', '!=', '!',
            '&&', '||',
            '+', '-', '*', '/', '%',
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
        sStart += startingString.length - initialLenght +
            text.length + (startingString.length > 0 ? 2 : 1);
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
        this._conditionNamesSub = this._service.conditionNames
            .subscribe(function (x) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBZSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsaUJBQWlCLEVBQzNGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUdoRDtJQTBDRTs7O09BR0c7SUFDSCx5Q0FDVSxRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQTdCM0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBR3JCLDRCQUE0QjtRQUM1QixrQkFBYSxHQUFHLE1BQU0sQ0FBQztRQVF2Qix1RUFBdUU7UUFDdkUsY0FBUyxHQUFhO1lBQ3BCLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRztZQUNyQyxJQUFJLEVBQUUsSUFBSTtZQUNWLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1lBQ3ZCLE1BQU0sRUFBRSxPQUFPO1NBQ2hCLENBQUM7UUFFTSx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVU5RCxDQUFD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QUN4QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNEOztPQUVHO0lBQ0gscURBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOztnQkF2SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQ0FBcUM7b0JBQy9DLHloREFBb0M7b0JBRXBDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVZPLHVCQUF1Qjs7OzZCQWtCNUIsS0FBSztvQ0FlTCxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztJQTJIakQsc0NBQUM7Q0FBQSxBQXhKRCxJQXdKQztTQTVJWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCB2YWxpZGF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtzYW5pdGl6ZUNvbmRpdGlvblN0cmluZ30gZnJvbSAnLi91dGlscyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWNvbmRpdGlvbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ2NvbmRpdGlvbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb25kaXRpb24tZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciBidWlsZGVyIGNvbmRpdGlvbiBlZGl0b3JcbiAqIEBpbXBsZW1lbnRzIDogT25EZXN0cm95XG4gKiBAaW1wbGVtZW50cyA6IEFmdGVyVmlld0luaXRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KClcbiAgdmlzaWJpbGl0eTogQWpmQ29uZGl0aW9uO1xuXG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGlzVmFsaWQgPSBmYWxzZTtcbiAgbmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGN1cnJlbnRJZDogbnVtYmVyO1xuXG4gIC8vIGNvbmRpdGlvblRleHQgaXMgYSBzdHJpbmdcbiAgY29uZGl0aW9uVGV4dCA9ICd0cnVlJztcblxuICBhOiBhbnk7XG4gIGI6IGFueTtcblxuXG4gIEBWaWV3Q2hpbGQoJ2NvbmRpdGlvblRleHRBcmVhJywge3N0YXRpYzogZmFsc2V9KSBjb25kaXRpb25UZXh0QXJlYTogYW55O1xuXG4gIC8vICBvcGVyYXRvcnMgaXMgYW4gYXJyYXkgb2YgYW55IHR5cGUgdGhhdCBjb250YWlucyBhbGwgYWxsb3cgb3BlcmF0b3JzXG4gIG9wZXJhdG9yczogc3RyaW5nW10gPSBbXG4gICAgJyggKScsICdcXCcgXFwnJyxcbiAgICAnPCcsICc8PScsICc9PScsICc+PScsICc+JywgJyE9JywgJyEnLFxuICAgICcmJicsICd8fCcsXG4gICAgJysnLCAnLScsICcqJywgJy8nLCAnJScsXG4gICAgJ3RydWUnLCAnZmFsc2UnXG4gIF07XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgY3VycmVudCBjb25kaXRpb24gYnkgYWpmQnVpbGRlcnNlcnZpY2VcbiAgICogYW5kIGluaXQgY29uZGl0aW9uIGFuZCBhdmFpbGFibGVGaWVsZE5hbWVzIHN1YnNjcmlwdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICkge1xuXG4gIH1cbiAgZXh0cmFjdE5hbWVzKGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10pIHtcbiAgICB0aGlzLm5hbWVzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc1ZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5uYW1lcyA9IHRoaXMubmFtZXMuY29uY2F0KGZvcm1zVmFyaWFibGVzW2ldLm5hbWVzKTtcbiAgICB9XG4gIH1cblxuICBzZXRDdXJyZW50KGlkOiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJZCA9IGlkO1xuICAgIHRoaXMuYXBwZW5kVGV4dCh0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5uYW1lc1tpbmRleF0pO1xuICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gc3VjY2VzcyBpZiB0aGUgY3VycmVudCBjb25kdGlvbiBpcyB2YWxpZFxuICAgKiBAcmV0dXJuIGJvb2xlYW5cbiAgICovXG4gIHZhbGlkYXRlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWxpZGF0ZUV4cHJlc3Npb24odGhpcy5jb25kaXRpb25UZXh0LCB0aGlzLm5hbWVzKTtcbiAgfVxuXG4gIC8vIFRPRE8gY29tcGxldGUgdGhlIGNvbW1lbnRcbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYXBwZW5kIHRleHQgdG8ganNvblxuICAgKiBAcGFyYW0gdGV4dCAgICAgIDogc3RyaW5nIC1cbiAgICogQHBhcmFtIGdvQmFja051bSA6IG51bWJlciAtXG4gICAqL1xuICBhcHBlbmRUZXh0KHRleHQ6IHN0cmluZywgX2dvQmFja051bT86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0ZXh0ID09IG51bGwgfHwgdGhpcy5jb25kaXRpb25UZXh0QXJlYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsID0gdGhpcy5jb25kaXRpb25UZXh0QXJlYS5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBzU3RhcnQ6IG51bWJlciA9IE1hdGgubWluKGVsLnNlbGVjdGlvblN0YXJ0LCBlbC5zZWxlY3Rpb25FbmQpO1xuICAgIGxldCBzRW5kOiBudW1iZXIgPSBNYXRoLm1heChlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgc3RhcnRpbmdTdHJpbmc6IHN0cmluZyA9IHRoaXMuY29uZGl0aW9uVGV4dC5zdWJzdHIoMCwgc1N0YXJ0KTtcbiAgICBsZXQgZW5kaW5nU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmNvbmRpdGlvblRleHQuc3Vic3RyKHNFbmQpO1xuICAgIGxldCBpbml0aWFsTGVuZ2h0OiBudW1iZXIgPSBzdGFydGluZ1N0cmluZy5sZW5ndGg7XG4gICAgbGV0IG5ld1N0ciA9ICcnO1xuXG4gICAgc3RhcnRpbmdTdHJpbmcgPSBzYW5pdGl6ZUNvbmRpdGlvblN0cmluZyhzdGFydGluZ1N0cmluZyk7XG4gICAgZW5kaW5nU3RyaW5nID0gc2FuaXRpemVDb25kaXRpb25TdHJpbmcoZW5kaW5nU3RyaW5nKTtcbiAgICBzU3RhcnQgKz0gc3RhcnRpbmdTdHJpbmcubGVuZ3RoIC0gaW5pdGlhbExlbmdodCArXG4gICAgICB0ZXh0Lmxlbmd0aCArIChzdGFydGluZ1N0cmluZy5sZW5ndGggPiAwID8gMiA6IDEpO1xuICAgIG5ld1N0ciA9IHN0YXJ0aW5nU3RyaW5nLmxlbmd0aCA+IDAgPyBgJHtzdGFydGluZ1N0cmluZ30gYCA6ICcnO1xuICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9IGAke25ld1N0cn0ke3RleHR9ICR7ZW5kaW5nU3RyaW5nfWA7XG5cbiAgICBjb25zdCBzID0gdGltZXIoMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChzICYmICFzLmNsb3NlZCkgeyBzLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgIGlmIChlbC5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgICAgbGV0IHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgIHJhbmdlLm1vdmUoJ2NoYXJhY3RlcicsIHNTdGFydCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnNlbGVjdGlvblN0YXJ0KSB7XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShzU3RhcnQsIHNTdGFydCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuaXNWYWxpZCA9IHRoaXMudmFsaWRhdGVDb25kaXRpb24oKTtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XG4gICAgICB0aGlzLnNhdmVDb25kaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzYXZlIGN1cnJlbnQgY29uZGl0aW9uXG4gICAqL1xuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUNvbmRpdGlvbih0aGlzLmNvbmRpdGlvblRleHQpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25kaXRpb25UZXh0ID0gdGhpcy52aXNpYmlsaXR5LmNvbmRpdGlvbjtcbiAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uVGV4dCA9PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzU3ViID0gdGhpcy5fc2VydmljZS5jb25kaXRpb25OYW1lc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzID0geDtcbiAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuZXh0cmFjdE5hbWVzKHRoaXMuZm9ybXNWYXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGRlc3Ryb3kgYSBjb25kaXRpb25TdWJzY3JpcHRpb25zXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25kaXRpb25OYW1lc1N1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=