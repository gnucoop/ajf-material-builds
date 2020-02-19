/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/condition-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
     * @param {?} _service
     */
    constructor(_service) {
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
    /**
     * @param {?} formsVariables
     * @return {?}
     */
    extractNames(formsVariables) {
        this.names.length = 0;
        for (let i = 0; i < formsVariables.length; i++) {
            this.names = this.names.concat(formsVariables[i].names);
        }
    }
    /**
     * @param {?} id
     * @param {?} index
     * @return {?}
     */
    setCurrent(id, index) {
        this.currentId = id;
        this.appendText(this.formsVariables[id].names[index]);
        this.checkValidation();
    }
    /**
     * this method will return success if the current condtion is valid
     * @return {?} boolean
     */
    validateCondition() {
        return validateExpression(this.conditionText, this.names);
    }
    // TODO complete the comment
    /**
     * this method will append text to json
     * @param {?} text      : string -
     * @param {?=} _goBackNum
     * @return {?}
     */
    appendText(text, _goBackNum) {
        if (text == null || this.conditionTextArea == null) {
            return;
        }
        /** @type {?} */
        let el = this.conditionTextArea.nativeElement;
        /** @type {?} */
        let sStart = Math.min(el.selectionStart, el.selectionEnd);
        /** @type {?} */
        let sEnd = Math.max(el.selectionStart, el.selectionEnd);
        /** @type {?} */
        let startingString = this.conditionText.substr(0, sStart);
        /** @type {?} */
        let endingString = this.conditionText.substr(sEnd);
        /** @type {?} */
        let initialLenght = startingString.length;
        /** @type {?} */
        let newStr = '';
        startingString = sanitizeConditionString(startingString);
        endingString = sanitizeConditionString(endingString);
        sStart += startingString.length - initialLenght +
            text.length + (startingString.length > 0 ? 2 : 1);
        newStr = startingString.length > 0 ? `${startingString} ` : '';
        this.conditionText = `${newStr}${text} ${endingString}`;
        /** @type {?} */
        const s = timer(0).subscribe((/**
         * @return {?}
         */
        () => {
            if (s && !s.closed) {
                s.unsubscribe();
            }
            if (el.createTextRange) {
                /** @type {?} */
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
        }));
    }
    /**
     * @return {?}
     */
    checkValidation() {
        this.isValid = this.validateCondition();
        if (this.isValid) {
            this.saveCondition();
        }
    }
    /**
     * this method will save current condition
     * @return {?}
     */
    saveCondition() {
        this._service.saveCondition(this.conditionText);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.conditionText = this.visibility.condition;
        this.isValid = true;
        if (this.conditionText == 'true') {
            this.conditionText = '';
        }
        this._conditionNamesSub = this._service.conditionNames
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            this.formsVariables = x;
            if (x != null) {
                this.extractNames(this.formsVariables);
            }
        }));
    }
    /**
     * this method will destroy a conditionSubscriptions
     * @return {?}
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
if (false) {
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.visibility;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.formsVariables;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.isValid;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.names;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.currentId;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.conditionText;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.a;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.b;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.conditionTextArea;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.operators;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderConditionEditor.prototype._conditionNamesSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderConditionEditor.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBZSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsaUJBQWlCLEVBQzNGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3pDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQVVoRDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLCtCQUErQjs7Ozs7O0lBa0MxQyxZQUNVLFFBQWlDO1FBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBN0IzQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFVBQUssR0FBYSxFQUFFLENBQUM7O1FBSXJCLGtCQUFhLEdBQUcsTUFBTSxDQUFDOztRQVN2QixjQUFTLEdBQWE7WUFDcEIsS0FBSyxFQUFFLE9BQU87WUFDZCxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHO1lBQ3JDLElBQUksRUFBRSxJQUFJO1lBQ1YsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7WUFDdkIsTUFBTSxFQUFFLE9BQU87U0FDaEIsQ0FBQztRQUVNLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBVTlELENBQUM7Ozs7O0lBQ0QsWUFBWSxD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cUNBQXFDO2dCQUMvQyx5aERBQW9DO2dCQUVwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBVk8sdUJBQXVCOzs7eUJBa0I1QixLQUFLO2dDQWVMLFNBQVMsU0FBQyxtQkFBbUIsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Ozs7SUFmL0MscURBQ3lCOztJQUV6Qix5REFBbUM7O0lBQ25DLGtEQUFnQjs7SUFDaEIsZ0RBQXFCOztJQUNyQixvREFBa0I7O0lBR2xCLHdEQUF1Qjs7SUFFdkIsNENBQU87O0lBQ1AsNENBQU87O0lBR1AsNERBQXdFOztJQUd4RSxvREFNRTs7Ozs7SUFFRiw2REFBOEQ7Ozs7O0lBTzVELG1EQUF5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgdmFsaWRhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7c2FuaXRpemVDb25kaXRpb25TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jb25kaXRpb24tZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICdjb25kaXRpb24tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29uZGl0aW9uLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgYnVpbGRlciBjb25kaXRpb24gZWRpdG9yXG4gKiBAaW1wbGVtZW50cyA6IE9uRGVzdHJveVxuICogQGltcGxlbWVudHMgOiBBZnRlclZpZXdJbml0XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ29uZGl0aW9uRWRpdG9yIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpXG4gIHZpc2liaWxpdHk6IEFqZkNvbmRpdGlvbjtcblxuICBmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdO1xuICBpc1ZhbGlkID0gZmFsc2U7XG4gIG5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBjdXJyZW50SWQ6IG51bWJlcjtcblxuICAvLyBjb25kaXRpb25UZXh0IGlzIGEgc3RyaW5nXG4gIGNvbmRpdGlvblRleHQgPSAndHJ1ZSc7XG5cbiAgYTogYW55O1xuICBiOiBhbnk7XG5cblxuICBAVmlld0NoaWxkKCdjb25kaXRpb25UZXh0QXJlYScsIHtzdGF0aWM6IGZhbHNlfSkgY29uZGl0aW9uVGV4dEFyZWE6IGFueTtcblxuICAvLyAgb3BlcmF0b3JzIGlzIGFuIGFycmF5IG9mIGFueSB0eXBlIHRoYXQgY29udGFpbnMgYWxsIGFsbG93IG9wZXJhdG9yc1xuICBvcGVyYXRvcnM6IHN0cmluZ1tdID0gW1xuICAgICcoICknLCAnXFwnIFxcJycsXG4gICAgJzwnLCAnPD0nLCAnPT0nLCAnPj0nLCAnPicsICchPScsICchJyxcbiAgICAnJiYnLCAnfHwnLFxuICAgICcrJywgJy0nLCAnKicsICcvJywgJyUnLFxuICAgICd0cnVlJywgJ2ZhbHNlJ1xuICBdO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgY29uZGl0aW9uIGJ5IGFqZkJ1aWxkZXJzZXJ2aWNlXG4gICAqIGFuZCBpbml0IGNvbmRpdGlvbiBhbmQgYXZhaWxhYmxlRmllbGROYW1lcyBzdWJzY3JpcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICApIHtcblxuICB9XG4gIGV4dHJhY3ROYW1lcyhmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdKSB7XG4gICAgdGhpcy5uYW1lcy5sZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXNWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubmFtZXMgPSB0aGlzLm5hbWVzLmNvbmNhdChmb3Jtc1ZhcmlhYmxlc1tpXS5uYW1lcyk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q3VycmVudChpZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50SWQgPSBpZDtcbiAgICB0aGlzLmFwcGVuZFRleHQodGhpcy5mb3Jtc1ZhcmlhYmxlc1tpZF0ubmFtZXNbaW5kZXhdKTtcbiAgICB0aGlzLmNoZWNrVmFsaWRhdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIHN1Y2Nlc3MgaWYgdGhlIGN1cnJlbnQgY29uZHRpb24gaXMgdmFsaWRcbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuICB2YWxpZGF0ZUNvbmRpdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsaWRhdGVFeHByZXNzaW9uKHRoaXMuY29uZGl0aW9uVGV4dCwgdGhpcy5uYW1lcyk7XG4gIH1cblxuICAvLyBUT0RPIGNvbXBsZXRlIHRoZSBjb21tZW50XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFwcGVuZCB0ZXh0IHRvIGpzb25cbiAgICogQHBhcmFtIHRleHQgICAgICA6IHN0cmluZyAtXG4gICAqIEBwYXJhbSBnb0JhY2tOdW0gOiBudW1iZXIgLVxuICAgKi9cbiAgYXBwZW5kVGV4dCh0ZXh0OiBzdHJpbmcsIF9nb0JhY2tOdW0/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGV4dCA9PSBudWxsIHx8IHRoaXMuY29uZGl0aW9uVGV4dEFyZWEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBlbCA9IHRoaXMuY29uZGl0aW9uVGV4dEFyZWEubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgc1N0YXJ0OiBudW1iZXIgPSBNYXRoLm1pbihlbC5zZWxlY3Rpb25TdGFydCwgZWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgc0VuZDogbnVtYmVyID0gTWF0aC5tYXgoZWwuc2VsZWN0aW9uU3RhcnQsIGVsLnNlbGVjdGlvbkVuZCk7XG4gICAgbGV0IHN0YXJ0aW5nU3RyaW5nOiBzdHJpbmcgPSB0aGlzLmNvbmRpdGlvblRleHQuc3Vic3RyKDAsIHNTdGFydCk7XG4gICAgbGV0IGVuZGluZ1N0cmluZzogc3RyaW5nID0gdGhpcy5jb25kaXRpb25UZXh0LnN1YnN0cihzRW5kKTtcbiAgICBsZXQgaW5pdGlhbExlbmdodDogbnVtYmVyID0gc3RhcnRpbmdTdHJpbmcubGVuZ3RoO1xuICAgIGxldCBuZXdTdHIgPSAnJztcblxuICAgIHN0YXJ0aW5nU3RyaW5nID0gc2FuaXRpemVDb25kaXRpb25TdHJpbmcoc3RhcnRpbmdTdHJpbmcpO1xuICAgIGVuZGluZ1N0cmluZyA9IHNhbml0aXplQ29uZGl0aW9uU3RyaW5nKGVuZGluZ1N0cmluZyk7XG4gICAgc1N0YXJ0ICs9IHN0YXJ0aW5nU3RyaW5nLmxlbmd0aCAtIGluaXRpYWxMZW5naHQgK1xuICAgICAgdGV4dC5sZW5ndGggKyAoc3RhcnRpbmdTdHJpbmcubGVuZ3RoID4gMCA/IDIgOiAxKTtcbiAgICBuZXdTdHIgPSBzdGFydGluZ1N0cmluZy5sZW5ndGggPiAwID8gYCR7c3RhcnRpbmdTdHJpbmd9IGAgOiAnJztcbiAgICB0aGlzLmNvbmRpdGlvblRleHQgPSBgJHtuZXdTdHJ9JHt0ZXh0fSAke2VuZGluZ1N0cmluZ31gO1xuXG4gICAgY29uc3QgcyA9IHRpbWVyKDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHsgcy51bnN1YnNjcmliZSgpOyB9XG4gICAgICBpZiAoZWwuY3JlYXRlVGV4dFJhbmdlKSB7XG4gICAgICAgIGxldCByYW5nZSA9IGVsLmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICByYW5nZS5tb3ZlKCdjaGFyYWN0ZXInLCBzU3RhcnQpO1xuICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC5zZWxlY3Rpb25TdGFydCkge1xuICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgZWwuc2V0U2VsZWN0aW9uUmFuZ2Uoc1N0YXJ0LCBzU3RhcnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLmlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlQ29uZGl0aW9uKCk7XG4gICAgaWYgKHRoaXMuaXNWYWxpZCkge1xuICAgICAgdGhpcy5zYXZlQ29uZGl0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2F2ZSBjdXJyZW50IGNvbmRpdGlvblxuICAgKi9cbiAgc2F2ZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNhdmVDb25kaXRpb24odGhpcy5jb25kaXRpb25UZXh0KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uZGl0aW9uVGV4dCA9IHRoaXMudmlzaWJpbGl0eS5jb25kaXRpb247XG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmNvbmRpdGlvblRleHQgPT0gJ3RydWUnKSB7XG4gICAgICB0aGlzLmNvbmRpdGlvblRleHQgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLl9jb25kaXRpb25OYW1lc1N1YiA9IHRoaXMuX3NlcnZpY2UuY29uZGl0aW9uTmFtZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHtcbiAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcyA9IHg7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmV4dHJhY3ROYW1lcyh0aGlzLmZvcm1zVmFyaWFibGVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBkZXN0cm95IGEgY29uZGl0aW9uU3Vic2NyaXB0aW9uc1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19