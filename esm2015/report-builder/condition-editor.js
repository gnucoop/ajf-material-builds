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
let AjfReportBuilderConditionEditor = /** @class */ (() => {
    class AjfReportBuilderConditionEditor {
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
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderConditionEditor.ctorParameters = () => [
        { type: AjfReportBuilderService }
    ];
    AjfReportBuilderConditionEditor.propDecorators = {
        visibility: [{ type: Input }],
        conditionTextArea: [{ type: ViewChild, args: ['conditionTextArea', { static: false },] }]
    };
    return AjfReportBuilderConditionEditor;
})();
export { AjfReportBuilderConditionEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBZSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUdoRDtJQUFBLE1BWWEsK0JBQStCO1FBeUIxQzs7O1dBR0c7UUFDSCxZQUFvQixRQUFpQztZQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQXpCckQsWUFBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixVQUFLLEdBQWEsRUFBRSxDQUFDO1lBR3JCLDRCQUE0QjtZQUM1QixrQkFBYSxHQUFHLE1BQU0sQ0FBQztZQVF2Qix1RUFBdUU7WUFDdkUsY0FBUyxHQUFhO2dCQUNwQixLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUMxRixNQUFNLEVBQUUsT0FBTzthQUNoQixDQUFDO1lBRU0sdUJBQWtCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFN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O1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0Q7O1dBRUc7UUFDSCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7OztnQkE5SUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQ0FBcUM7b0JBQy9DLHloREFBb0M7b0JBRXBDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVZPLHVCQUF1Qjs7OzZCQWlCNUIsS0FBSztvQ0FjTCxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztJQW9IakQsc0NBQUM7S0FBQTtTQW5JWSwrQkFBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCB2YWxpZGF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtzYW5pdGl6ZUNvbmRpdGlvblN0cmluZ30gZnJvbSAnLi91dGlscyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWNvbmRpdGlvbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJ2NvbmRpdGlvbi1lZGl0b3IuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb25kaXRpb24tZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciBidWlsZGVyIGNvbmRpdGlvbiBlZGl0b3JcbiAqIEBpbXBsZW1lbnRzIDogT25EZXN0cm95XG4gKiBAaW1wbGVtZW50cyA6IEFmdGVyVmlld0luaXRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDb25kaXRpb25FZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIHZpc2liaWxpdHk6IEFqZkNvbmRpdGlvbjtcblxuICBmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdO1xuICBpc1ZhbGlkID0gZmFsc2U7XG4gIG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBjdXJyZW50SWQ6IG51bWJlcjtcblxuICAvLyBjb25kaXRpb25UZXh0IGlzIGEgc3RyaW5nXG4gIGNvbmRpdGlvblRleHQgPSAndHJ1ZSc7XG5cbiAgYTogYW55O1xuICBiOiBhbnk7XG5cblxuICBAVmlld0NoaWxkKCdjb25kaXRpb25UZXh0QXJlYScsIHtzdGF0aWM6IGZhbHNlfSkgY29uZGl0aW9uVGV4dEFyZWE6IGFueTtcblxuICAvLyAgb3BlcmF0b3JzIGlzIGFuIGFycmF5IG9mIGFueSB0eXBlIHRoYXQgY29udGFpbnMgYWxsIGFsbG93IG9wZXJhdG9yc1xuICBvcGVyYXRvcnM6IHN0cmluZ1tdID0gW1xuICAgICcoICknLCAnXFwnIFxcJycsICc8JywgJzw9JywgJz09JywgJz49JywgJz4nLCAnIT0nLCAnIScsICcmJicsICd8fCcsICcrJywgJy0nLCAnKicsICcvJywgJyUnLFxuICAgICd0cnVlJywgJ2ZhbHNlJ1xuICBdO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgY29uZGl0aW9uIGJ5IGFqZkJ1aWxkZXJzZXJ2aWNlXG4gICAqIGFuZCBpbml0IGNvbmRpdGlvbiBhbmQgYXZhaWxhYmxlRmllbGROYW1lcyBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cbiAgZXh0cmFjdE5hbWVzKGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10pIHtcbiAgICB0aGlzLm5hbWVzLmxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtc1ZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5uYW1lcyA9IHRoaXMubmFtZXMuY29uY2F0KGZvcm1zVmFyaWFibGVzW2ldLm5hbWVzKTtcbiAgICB9XG4gIH1cblxuICBzZXRDdXJyZW50KGlkOiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRJZCA9IGlkO1xuICAgIHRoaXMuYXBwZW5kVGV4dCh0aGlzLmZvcm1zVmFyaWFibGVzW2lkXS5uYW1lc1tpbmRleF0pO1xuICAgIHRoaXMuY2hlY2tWYWxpZGF0aW9uKCk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gc3VjY2VzcyBpZiB0aGUgY3VycmVudCBjb25kdGlvbiBpcyB2YWxpZFxuICAgKiBAcmV0dXJuIGJvb2xlYW5cbiAgICovXG4gIHZhbGlkYXRlQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWxpZGF0ZUV4cHJlc3Npb24odGhpcy5jb25kaXRpb25UZXh0LCB0aGlzLm5hbWVzKTtcbiAgfVxuXG4gIC8vIFRPRE8gY29tcGxldGUgdGhlIGNvbW1lbnRcbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYXBwZW5kIHRleHQgdG8ganNvblxuICAgKiBAcGFyYW0gdGV4dCAgICAgIDogc3RyaW5nIC1cbiAgICogQHBhcmFtIGdvQmFja051bSA6IG51bWJlciAtXG4gICAqL1xuICBhcHBlbmRUZXh0KHRleHQ6IHN0cmluZywgX2dvQmFja051bT86IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0ZXh0ID09IG51bGwgfHwgdGhpcy5jb25kaXRpb25UZXh0QXJlYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGVsID0gdGhpcy5jb25kaXRpb25UZXh0QXJlYS5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBzU3RhcnQ6IG51bWJlciA9IE1hdGgubWluKGVsLnNlbGVjdGlvblN0YXJ0LCBlbC5zZWxlY3Rpb25FbmQpO1xuICAgIGxldCBzRW5kOiBudW1iZXIgPSBNYXRoLm1heChlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgc3RhcnRpbmdTdHJpbmc6IHN0cmluZyA9IHRoaXMuY29uZGl0aW9uVGV4dC5zdWJzdHIoMCwgc1N0YXJ0KTtcbiAgICBsZXQgZW5kaW5nU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmNvbmRpdGlvblRleHQuc3Vic3RyKHNFbmQpO1xuICAgIGxldCBpbml0aWFsTGVuZ2h0OiBudW1iZXIgPSBzdGFydGluZ1N0cmluZy5sZW5ndGg7XG4gICAgbGV0IG5ld1N0ciA9ICcnO1xuXG4gICAgc3RhcnRpbmdTdHJpbmcgPSBzYW5pdGl6ZUNvbmRpdGlvblN0cmluZyhzdGFydGluZ1N0cmluZyk7XG4gICAgZW5kaW5nU3RyaW5nID0gc2FuaXRpemVDb25kaXRpb25TdHJpbmcoZW5kaW5nU3RyaW5nKTtcbiAgICBzU3RhcnQgKz1cbiAgICAgICAgc3RhcnRpbmdTdHJpbmcubGVuZ3RoIC0gaW5pdGlhbExlbmdodCArIHRleHQubGVuZ3RoICsgKHN0YXJ0aW5nU3RyaW5nLmxlbmd0aCA+IDAgPyAyIDogMSk7XG4gICAgbmV3U3RyID0gc3RhcnRpbmdTdHJpbmcubGVuZ3RoID4gMCA/IGAke3N0YXJ0aW5nU3RyaW5nfSBgIDogJyc7XG4gICAgdGhpcy5jb25kaXRpb25UZXh0ID0gYCR7bmV3U3RyfSR7dGV4dH0gJHtlbmRpbmdTdHJpbmd9YDtcblxuICAgIGNvbnN0IHMgPSB0aW1lcigwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbC5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgICAgbGV0IHJhbmdlID0gZWwuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgICAgIHJhbmdlLm1vdmUoJ2NoYXJhY3RlcicsIHNTdGFydCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnNlbGVjdGlvblN0YXJ0KSB7XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICBlbC5zZXRTZWxlY3Rpb25SYW5nZShzU3RhcnQsIHNTdGFydCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuaXNWYWxpZCA9IHRoaXMudmFsaWRhdGVDb25kaXRpb24oKTtcbiAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XG4gICAgICB0aGlzLnNhdmVDb25kaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzYXZlIGN1cnJlbnQgY29uZGl0aW9uXG4gICAqL1xuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZUNvbmRpdGlvbih0aGlzLmNvbmRpdGlvblRleHQpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb25kaXRpb25UZXh0ID0gdGhpcy52aXNpYmlsaXR5LmNvbmRpdGlvbjtcbiAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuY29uZGl0aW9uVGV4dCA9PSAndHJ1ZScpIHtcbiAgICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzU3ViID0gdGhpcy5fc2VydmljZS5jb25kaXRpb25OYW1lcy5zdWJzY3JpYmUoKHgpID0+IHtcbiAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmV4dHJhY3ROYW1lcyh0aGlzLmZvcm1zVmFyaWFibGVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IGEgY29uZGl0aW9uU3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19