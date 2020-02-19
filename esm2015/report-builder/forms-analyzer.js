/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/forms-analyzer.ts
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
import { AjfAggregationType, AjfChartType, AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AjfReportBuilderFormsAnalyzerDialog } from './forms-analyzer-dialog';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * this component provides the support for connect the form fields with the report
 *
 * @export
 */
export class AjfReportBuilderFormsAnalyzer {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.currentWidget = null;
        this.forms = [];
        this.choicesOrigins = {};
        this.currentMainDataIndex = -1;
        this._dataset = [];
        this._currentWidgetSub = Subscription.EMPTY;
        this._formAnalyzerSub = Subscription.EMPTY;
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                this.currentWidget = x;
                // this._dataset = myObj.dataset;
            }
            else {
                this.currentWidget = null;
            }
        }));
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (x != null) {
                this.formsVariables = x;
            }
        }));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setCurrentIndex(index) {
        this.currentMainDataIndex = index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isSelected(index) {
        if (index === this.currentMainDataIndex) {
            return 'primary';
        }
        else {
            return undefined;
        }
    }
    /**
     *  get the X components label of the chart.
     *  they are contained in the first row of dataset
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getMainData() {
        if (this._dataset[0] != null) {
            /** @type {?} */
            let mainData = [];
            for (let i = 0; i < this._dataset[0].length; i++) {
                mainData.push(this._dataset[0][i].label || '');
            }
            return mainData;
        }
        else {
            return [];
        }
    }
    /**
     *  get the Y components label of the chart.
     *  they are contained in the first column of dataset
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getDataset() {
        /** @type {?} */
        let dataset = [];
        if (this._dataset[0] != null) {
            for (let i = 1; i < this._dataset.length; i++) {
                dataset.push(this._dataset[i][0].label || '');
            }
            return dataset;
        }
        else {
            return [];
        }
    }
    /**
     * get the related data label of the chart.
     * they are contained in the row of the Y component
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getRelatedData() {
        if (this._dataset[this.currentMainDataIndex + 1] != null) {
            /** @type {?} */
            let relatedData = [];
            for (let i = 1; i < this._dataset[this.currentMainDataIndex + 1].length; i++) {
                relatedData.push(this._dataset[this.currentMainDataIndex + 1][i].label || '');
            }
            return relatedData;
        }
        else {
            return [];
        }
    }
    /**
     * @return {?}
     */
    getTableHeader() {
        /** @type {?} */
        let mainData = [];
        if (this._dataset != null) {
            for (let i = 0; i < this._dataset.length; i++) {
                if (this._dataset[i][0] != null) {
                    mainData.push(this._dataset[i][0].label || '');
                }
            }
        }
        return mainData;
    }
    /**
     * @return {?}
     */
    getTableData() {
        if (this._dataset[this.currentMainDataIndex] != null) {
            /** @type {?} */
            let tableData = [];
            for (let i = 1; i < this._dataset[this.currentMainDataIndex].length; i++) {
                if (this._dataset[this.currentMainDataIndex][i] != null) {
                    tableData.push(this._dataset[this.currentMainDataIndex][i].label || '');
                }
            }
            return tableData;
        }
        else {
            return [];
        }
    }
    /**
     * @return {?}
     */
    needMainData() {
        /** @type {?} */
        let myObj = (/** @type {?} */ (this.currentWidget));
        if (myObj.chartType === AjfChartType.Scatter ||
            myObj.chartType === AjfChartType.Bubble) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeMainData(index) {
        this._service.removeMainData(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeDataset(index) {
        this.currentMainDataIndex = index;
        this._service.removeRelatedData(this.currentMainDataIndex, -1);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeTableMainData(index) {
        this._service.removeTableMainData(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeRelatedData(index) {
        this._service.removeRelatedData(this.currentMainDataIndex, index);
    }
    /**
     * @param {?} mainIndex
     * @param {?} index
     * @return {?}
     */
    removeData(mainIndex, index) {
        this._service.removeData(mainIndex, index);
    }
    /**
     *
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @param {?} level
     * @param {?} mainIndex
     * @param {?} index
     * @param {?} editMode
     *
     * @return {?}
     */
    openDialog(level, mainIndex, index, editMode) {
        this.dialogRef = this.dialog.open(AjfReportBuilderFormsAnalyzerDialog);
        if (editMode) {
            if (level === 1 && index === -1) {
                index = 0;
            }
            if (level === 1) {
                if (this.currentWidget != null && this.currentWidget.widgetType == AjfWidgetType.Chart) {
                    mainIndex++;
                }
                index++;
            }
            this.dialogRef.componentInstance.labelText =
                this._dataset[mainIndex] &&
                    this._dataset[mainIndex][index].label || '';
            /* this.dialogRef.componentInstance.formula =
              this._dataset[mainIndex] &&
              this._dataset[mainIndex][index].formula.formula || ''; */
            this.dialogRef.componentInstance.aggregation =
                this._dataset[mainIndex] &&
                    this._dataset[mainIndex][index].aggregation.aggregation || AjfAggregationType.None;
        }
        else {
            this.dialogRef.componentInstance.labelText = '';
            this.dialogRef.componentInstance.formula = '';
            this.dialogRef.componentInstance.aggregation = 0;
        }
        // this.dialogRef.componentInstance.formsVariables = this.formsVariables;
        this.dialogRef.componentInstance.currentWidget = (/** @type {?} */ (this.currentWidget));
        this.dialogRef.componentInstance.level = level;
        this.dialogRef.componentInstance.mainIndex = mainIndex;
        this.dialogRef.componentInstance.index = index;
        this.dialogRef.componentInstance.init = false;
    }
    /**
     * @return {?}
     */
    openDialogAddMainData() {
        this.openDialog(0, -1, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartEditMainData() {
        this.openDialog(0, 0, this.currentMainDataIndex, true);
    }
    /**
     * @return {?}
     */
    openDialogTableEditMainData() {
        this.openDialog(0, this.currentMainDataIndex, 0, true);
    }
    /**
     * @return {?}
     */
    openDialogChartAddDataset() {
        this.openDialog(1, -1, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogTableAddDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartAddDataOfDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartEditDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, true);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openDialogTableEditDataset(index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openDialogChartEditDataOfDataset(index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
        this._formAnalyzerSub.unsubscribe();
    }
}
AjfReportBuilderFormsAnalyzer.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-forms-analyzer',
                template: "<ng-template [ngIf]=\"currentWidget != null && formsVariables != null\">\n  <ng-template [ngIf]=\"currentWidget.widgetType == 4\">\n    <ng-template  [ngIf]=\"needMainData()\">\n      <mat-tab-group>\n        <mat-tab [label]=\"'Main Data' | translate\">\n          <button mat-button (click)=\"openDialogAddMainData()\" style=\"width:100%;\">\n            Add Main Data\n          </button>\n          <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n            <ng-template ngFor let-label [ngForOf]=\"getMainData()\" let-idx=\"index\">\n              <mat-grid-tile>\n                  {{ label }}\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogChartEditMainData()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeMainData(idx)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n        </mat-tab>\n      </mat-tab-group>\n    </ng-template>\n    <mat-tab-group>\n      <mat-tab label=\"dataset\">\n        <button mat-button (click)=\"openDialogChartAddDataset()\" style=\"width:100%\">\n            add dataset\n        </button>\n        <mat-grid-list rowHeight=\"50px\" cols=\"4\">\n          <ng-template ngFor let-label [ngForOf]=\"getDataset()\" let-idx=\"index\">\n              <mat-grid-tile>\n                <button mat-button [color]=\"isSelected(idx)\"(click)=\"setCurrentIndex(idx)\">\n                  {{ label }}\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button (click)=\"setCurrentIndex(idx);openDialogChartAddDataOfDataset()\" style=\"width:100%\">\n                  add data\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"setCurrentIndex(idx);openDialogChartEditDataset()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeDataset(idx)\">Remove</button>\n              </mat-grid-tile>\n          </ng-template>\n        </mat-grid-list>\n      </mat-tab>\n      <mat-tab label=\"data\">\n        <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n          <ng-template ngFor let-label [ngForOf]=\"getRelatedData()\" let-idx=\"index\">\n            <mat-grid-tile>\n                {{ label }}\n            </mat-grid-tile>\n            <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"openDialogChartEditDataOfDataset(idx)\">Edit</button>\n            </mat-grid-tile>\n            <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"removeRelatedData(idx)\">Remove</button>\n            </mat-grid-tile>\n          </ng-template>\n        </mat-grid-list>\n        <div class=\"ajf-ui ajf-divider\"></div>\n      </mat-tab>\n    </mat-tab-group>\n  </ng-template>\n  <ng-template [ngIf]=\"currentWidget.widgetType == 5\">\n    <ng-template  [ngIf]=\"needMainData()\">\n      <mat-tab-group>\n        <mat-tab [label]=\"'Main Data' | translate\">\n          <button mat-button (click)=\"openDialogAddMainData()\"\n              translate\n              style=\"width:100%;\">Add Main Data</button>\n          <mat-grid-list rowHeight=\"50px\" cols=\"4\">\n            <ng-template ngFor let-label [ngForOf]=\"getTableHeader()\" let-idx=\"index\">\n              <mat-grid-tile>\n                <button mat-button [color]=\"isSelected(idx)\"(click)=\"setCurrentIndex(idx)\">\n                  {{ label }}\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogTableAddDataset()\"\n                    style=\"width:100%\">add data</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogTableEditMainData()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeTableMainData(idx)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n        </mat-tab>\n        <mat-tab [label]=\"'data' | translate\">\n          <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n            <ng-template ngFor let-label [ngForOf]=\"getTableData()\" let-idx=\"index\">\n              <mat-grid-tile>\n                  {{ label }}\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"openDialogTableEditDataset(idx)\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeData(currentMainDataIndex, idx + 1)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n      </mat-tab>\n      </mat-tab-group>\n    </ng-template>\n  </ng-template>\n</ng-template>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-forms-analyzer{min-height:512px}ajf-report-builder-forms-analyzer .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-report-builder-forms-analyzer .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer mat-dialog-container{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-report-builder-forms-analyzer .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-forms-analyzer mat-tab-group .mat-tab-body-wrapper,ajf-report-builder-forms-analyzer mat-tab-group .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderFormsAnalyzer.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.forms;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.formsVariables;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.choicesOrigins;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.dialogRef;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.currentMainDataIndex;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._dataset;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._formAnalyzerSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._service;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvZm9ybXMtYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUNMLGtCQUFrQixFQUFFLFlBQVksRUFDaEMsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBY2pFLE1BQU0sT0FBTyw2QkFBNkI7Ozs7O0lBZXhDLFlBQ1UsUUFBaUMsRUFDbEMsTUFBaUI7UUFEaEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQWhCMUIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1FBRXJDLFVBQUssR0FBYyxFQUFFLENBQUM7UUFHdEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFJekIseUJBQW9CLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDMUIsYUFBUSxHQUFtQixFQUFFLENBQUM7UUFDOUIsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQscUJBQWdCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFNMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTthQUNqRCxTQUFTOzs7O1FBQUMsQ0FBQyxD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QUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7O0lBQ0QsMEJBQTBCLENBQUMsS0FBYTtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBQ0QsZ0NBQWdDLENBQUMsS0FBYTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7WUFsUUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQ0FBbUM7Z0JBQzdDLDY4S0FBa0M7Z0JBRWxDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFiTyx1QkFBdUI7WUFMdkIsU0FBUzs7OztJQW9CZixzREFBcUM7O0lBRXJDLDhDQUFzQjs7SUFFdEIsdURBQW1DOztJQUNuQyx1REFBeUI7O0lBRXpCLGtEQUE2RDs7SUFFN0QsNkRBQWtDOzs7OztJQUNsQyxpREFBc0M7Ozs7O0lBQ3RDLDBEQUE2RDs7Ozs7SUFDN0QseURBQTREOzs7OztJQUcxRCxpREFBeUM7O0lBQ3pDLCtDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvblR5cGUsIEFqZkNoYXJ0VHlwZSwgQWpmQ2hhcnRXaWRnZXQsIEFqZkRhdGFzZXQsIEFqZkRhdGFXaWRnZXQsIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZVxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IHByb3ZpZGVzIHRoZSBzdXBwb3J0IGZvciBjb25uZWN0IHRoZSBmb3JtIGZpZWxkcyB3aXRoIHRoZSByZXBvcnRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1mb3Jtcy1hbmFseXplcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybXMtYW5hbHl6ZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3Jtcy1hbmFseXplci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cbiAgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuXG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGNob2ljZXNPcmlnaW5zOiBhbnkgPSB7fTtcblxuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz47XG5cbiAgY3VycmVudE1haW5EYXRhSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9kYXRhc2V0OiBBamZEYXRhc2V0W11bXSA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm1BbmFseXplclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0XG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgICAvLyB0aGlzLl9kYXRhc2V0ID0gbXlPYmouZGF0YXNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViID0gdGhpcy5fc2VydmljZS5mb3Jtc1ZhcmlhYmxlc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcyA9IHg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgfVxuXG4gIHNldEN1cnJlbnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCA9IGluZGV4O1xuICB9XG5cbiAgaXNTZWxlY3RlZChpbmRleDogbnVtYmVyKTogVGhlbWVQYWxldHRlIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgpIHtcbiAgICAgIHJldHVybiAncHJpbWFyeSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBnZXQgdGhlIFggY29tcG9uZW50cyBsYWJlbCBvZiB0aGUgY2hhcnQuXG4gICAqICB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdyBvZiBkYXRhc2V0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgZ2V0TWFpbkRhdGEoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLl9kYXRhc2V0WzBdICE9IG51bGwpIHtcbiAgICAgIGxldCBtYWluRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhc2V0WzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1haW5EYXRhLnB1c2godGhpcy5fZGF0YXNldFswXVtpXS5sYWJlbCB8fCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFpbkRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIGdldCB0aGUgWSBjb21wb25lbnRzIGxhYmVsIG9mIHRoZSBjaGFydC5cbiAgICogIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3QgY29sdW1uIG9mIGRhdGFzZXRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXREYXRhc2V0KCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgZGF0YXNldDogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5fZGF0YXNldFswXSAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGF0YXNldC5wdXNoKHRoaXMuX2RhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSByZWxhdGVkIGRhdGEgbGFiZWwgb2YgdGhlIGNoYXJ0LlxuICAgKiB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIHJvdyBvZiB0aGUgWSBjb21wb25lbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXRSZWxhdGVkRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdICE9IG51bGwpIHtcbiAgICAgIGxldCByZWxhdGVkRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXggKyAxXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByZWxhdGVkRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWxhdGVkRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldFRhYmxlSGVhZGVyKCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgbWFpbkRhdGE6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMuX2RhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhc2V0W2ldWzBdICE9IG51bGwpIHtcbiAgICAgICAgICBtYWluRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYWluRGF0YTtcbiAgfVxuXG4gIGdldFRhYmxlRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF0gIT0gbnVsbCkge1xuICAgICAgbGV0IHRhYmxlRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdW2ldICE9IG51bGwpIHtcbiAgICAgICAgICB0YWJsZURhdGEucHVzaCh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhYmxlRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIG5lZWRNYWluRGF0YSgpOiBib29sZWFuIHtcbiAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIGlmIChcbiAgICAgIG15T2JqLmNoYXJ0VHlwZSA9PT0gQWpmQ2hhcnRUeXBlLlNjYXR0ZXIgfHxcbiAgICAgIG15T2JqLmNoYXJ0VHlwZSA9PT0gQWpmQ2hhcnRUeXBlLkJ1YmJsZVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVNYWluRGF0YShpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVSZWxhdGVkRGF0YSh0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSk7XG4gIH1cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVJlbGF0ZWREYXRhKHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEobWFpbkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZURhdGEobWFpbkluZGV4LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBlZGl0TW9kZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIG9wZW5EaWFsb2cobGV2ZWw6IG51bWJlciwgbWFpbkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGVkaXRNb2RlOiBib29sZWFuKSB7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2cpO1xuXG4gICAgaWYgKGVkaXRNb2RlKSB7XG4gICAgICBpZiAobGV2ZWwgPT09IDEgJiYgaW5kZXggPT09IC0xKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwgJiYgdGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUgPT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgICAgICAgIG1haW5JbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsVGV4dCA9XG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJlxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmxhYmVsIHx8ICcnO1xuICAgICAgLyogdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9XG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJlxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmZvcm11bGEuZm9ybXVsYSB8fCAnJzsgKi9cbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmFnZ3JlZ2F0aW9uID1cbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdICYmXG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XVtpbmRleF0uYWdncmVnYXRpb24uYWdncmVnYXRpb24gfHwgQWpmQWdncmVnYXRpb25UeXBlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsVGV4dCA9ICcnO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9ICcnO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPSAwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm1zVmFyaWFibGVzID0gdGhpcy5mb3Jtc1ZhcmlhYmxlcztcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jdXJyZW50V2lkZ2V0ID0gPEFqZkRhdGFXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxldmVsID0gbGV2ZWw7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWFpbkluZGV4ID0gbWFpbkluZGV4O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuaW5pdCA9IGZhbHNlO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0FkZE1haW5EYXRhKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygwLCAtMSwgLTEsIGZhbHNlKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dDaGFydEVkaXRNYWluRGF0YSgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMCwgMCwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBvcGVuRGlhbG9nVGFibGVFZGl0TWFpbkRhdGEoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDAsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIDAsIHRydWUpO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0NoYXJ0QWRkRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgLTEsIC0xLCBmYWxzZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ1RhYmxlQWRkRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIGZhbHNlKTtcbiAgfVxuICBvcGVuRGlhbG9nQ2hhcnRBZGREYXRhT2ZEYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgZmFsc2UpO1xuICB9XG4gIG9wZW5EaWFsb2dDaGFydEVkaXREYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgdHJ1ZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ1RhYmxlRWRpdERhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ0NoYXJ0RWRpdERhdGFPZkRhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19