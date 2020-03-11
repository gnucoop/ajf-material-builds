/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/forms-analyzer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvZm9ybXMtYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUNMLGtCQUFrQixFQUFFLFlBQVksRUFDaEMsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBY2pFLE1BQU0sT0FBTyw2QkFBNkI7Ozs7O0lBZXhDLFlBQ1UsUUFBaUMsRUFDbEMsTUFBaUI7UUFEaEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQWhCMUIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1FBRXJDLFVBQUssR0FBYyxFQUFFLENBQUM7UUFHdEIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFJekIseUJBQW9CLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDMUIsYUFBUSxHQUFtQixFQUFFLENBQUM7UUFDOUIsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQscUJBQWdCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFNMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYTthQUNqRCxTQUFTOzs7O1FBQUMsQ0FBQyxD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QUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7O0lBQ0QsMEJBQTBCLENBQUMsS0FBYTtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBQ0QsZ0NBQWdDLENBQUMsS0FBYTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7WUFsUUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQ0FBbUM7Z0JBQzdDLDY4S0FBa0M7Z0JBRWxDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFiTyx1QkFBdUI7WUFMdkIsU0FBUzs7OztJQW9CZixzREFBcUM7O0lBRXJDLDhDQUFzQjs7SUFFdEIsdURBQW1DOztJQUNuQyx1REFBeUI7O0lBRXpCLGtEQUE2RDs7SUFFN0QsNkRBQWtDOzs7OztJQUNsQyxpREFBc0M7Ozs7O0lBQ3RDLDBEQUE2RDs7Ozs7SUFDN0QseURBQTREOzs7OztJQUcxRCxpREFBeUM7O0lBQ3pDLCtDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb25UeXBlLCBBamZDaGFydFR5cGUsIEFqZkNoYXJ0V2lkZ2V0LCBBamZEYXRhc2V0LCBBamZEYXRhV2lkZ2V0LCBBamZXaWRnZXQsXG4gIEFqZldpZGdldFR5cGVcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGhlbWVQYWxldHRlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2d9IGZyb20gJy4vZm9ybXMtYW5hbHl6ZXItZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBwcm92aWRlcyB0aGUgc3VwcG9ydCBmb3IgY29ubmVjdCB0aGUgZm9ybSBmaWVsZHMgd2l0aCB0aGUgcmVwb3J0XG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItZm9ybXMtYW5hbHl6ZXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm1zLWFuYWx5emVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZm9ybXMtYW5hbHl6ZXIuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuXG4gIGZvcm1zOiBBamZGb3JtW10gPSBbXTtcblxuICBmb3Jtc1ZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdO1xuICBjaG9pY2VzT3JpZ2luczogYW55ID0ge307XG5cbiAgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2c+O1xuXG4gIGN1cnJlbnRNYWluRGF0YUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBfZGF0YXNldDogQWpmRGF0YXNldFtdW10gPSBbXTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtQW5hbHl6ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldFxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IHg7XG4gICAgICAgICAgLy8gdGhpcy5fZGF0YXNldCA9IG15T2JqLmRhdGFzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1YiA9IHRoaXMuX3NlcnZpY2UuZm9ybXNWYXJpYWJsZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHtcbiAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gIH1cblxuICBzZXRDdXJyZW50SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IFRoZW1lUGFsZXR0ZSB7XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4KSB7XG4gICAgICByZXR1cm4gJ3ByaW1hcnknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgZ2V0IHRoZSBYIGNvbXBvbmVudHMgbGFiZWwgb2YgdGhlIGNoYXJ0LlxuICAgKiAgdGhleSBhcmUgY29udGFpbmVkIGluIHRoZSBmaXJzdCByb3cgb2YgZGF0YXNldFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIGdldE1haW5EYXRhKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldFswXSAhPSBudWxsKSB7XG4gICAgICBsZXQgbWFpbkRhdGE6IHN0cmluZ1tdID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGF0YXNldFswXS5sZW5ndGg7IGkrKykge1xuICAgICAgICBtYWluRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbMF1baV0ubGFiZWwgfHwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1haW5EYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBnZXQgdGhlIFkgY29tcG9uZW50cyBsYWJlbCBvZiB0aGUgY2hhcnQuXG4gICAqICB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIGZpcnN0IGNvbHVtbiBvZiBkYXRhc2V0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgZ2V0RGF0YXNldCgpOiBzdHJpbmdbXSB7XG4gICAgbGV0IGRhdGFzZXQ6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbMF0gIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRhdGFzZXQucHVzaCh0aGlzLl9kYXRhc2V0W2ldWzBdLmxhYmVsIHx8ICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgcmVsYXRlZCBkYXRhIGxhYmVsIG9mIHRoZSBjaGFydC5cbiAgICogdGhleSBhcmUgY29udGFpbmVkIGluIHRoZSByb3cgb2YgdGhlIFkgY29tcG9uZW50XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgZ2V0UmVsYXRlZERhdGEoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXggKyAxXSAhPSBudWxsKSB7XG4gICAgICBsZXQgcmVsYXRlZERhdGE6IHN0cmluZ1tdID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ICsgMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVsYXRlZERhdGEucHVzaCh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXggKyAxXVtpXS5sYWJlbCB8fCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVsYXRlZERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRUYWJsZUhlYWRlcigpOiBzdHJpbmdbXSB7XG4gICAgbGV0IG1haW5EYXRhOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICh0aGlzLl9kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5fZGF0YXNldFtpXVswXSAhPSBudWxsKSB7XG4gICAgICAgICAgbWFpbkRhdGEucHVzaCh0aGlzLl9kYXRhc2V0W2ldWzBdLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFpbkRhdGE7XG4gIH1cblxuICBnZXRUYWJsZURhdGEoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdICE9IG51bGwpIHtcbiAgICAgIGxldCB0YWJsZURhdGE6IHN0cmluZ1tdID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4XS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4XVtpXSAhPSBudWxsKSB7XG4gICAgICAgICAgdGFibGVEYXRhLnB1c2godGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4XVtpXS5sYWJlbCB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0YWJsZURhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICBuZWVkTWFpbkRhdGEoKTogYm9vbGVhbiB7XG4gICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICBpZiAoXG4gICAgICBteU9iai5jaGFydFR5cGUgPT09IEFqZkNoYXJ0VHlwZS5TY2F0dGVyIHx8XG4gICAgICBteU9iai5jaGFydFR5cGUgPT09IEFqZkNoYXJ0VHlwZS5CdWJibGVcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFpbkRhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlTWFpbkRhdGEoaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YXNldChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCA9IGluZGV4O1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlUmVsYXRlZERhdGEodGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEpO1xuICB9XG4gIHJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlVGFibGVNYWluRGF0YShpbmRleCk7XG4gIH1cblxuICByZW1vdmVSZWxhdGVkRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVSZWxhdGVkRGF0YSh0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhKG1haW5JbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVEYXRhKG1haW5JbmRleCwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gZWRpdE1vZGVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBvcGVuRGlhbG9nKGxldmVsOiBudW1iZXIsIG1haW5JbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyLCBlZGl0TW9kZTogYm9vbGVhbikge1xuXG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nKTtcblxuICAgIGlmIChlZGl0TW9kZSkge1xuICAgICAgaWYgKGxldmVsID09PSAxICYmIGluZGV4ID09PSAtMSkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAobGV2ZWwgPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsICYmIHRoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlID09IEFqZldpZGdldFR5cGUuQ2hhcnQpIHtcbiAgICAgICAgICBtYWluSW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCsrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sYWJlbFRleHQgPVxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF0gJiZcbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdW2luZGV4XS5sYWJlbCB8fCAnJztcbiAgICAgIC8qIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm11bGEgPVxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF0gJiZcbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdW2luZGV4XS5mb3JtdWxhLmZvcm11bGEgfHwgJyc7ICovXG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5hZ2dyZWdhdGlvbiA9XG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJlxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uIHx8IEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sYWJlbFRleHQgPSAnJztcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm11bGEgPSAnJztcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmFnZ3JlZ2F0aW9uID0gMDtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3Jtc1ZhcmlhYmxlcyA9IHRoaXMuZm9ybXNWYXJpYWJsZXM7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY3VycmVudFdpZGdldCA9IDxBamZEYXRhV2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sZXZlbCA9IGxldmVsO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1haW5JbmRleCA9IG1haW5JbmRleDtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmluaXQgPSBmYWxzZTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dBZGRNYWluRGF0YSgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMCwgLTEsIC0xLCBmYWxzZSk7XG4gIH1cblxuICBvcGVuRGlhbG9nQ2hhcnRFZGl0TWFpbkRhdGEoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDAsIDAsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIHRydWUpO1xuICB9XG5cbiAgb3BlbkRpYWxvZ1RhYmxlRWRpdE1haW5EYXRhKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygwLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAwLCB0cnVlKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dDaGFydEFkZERhdGFzZXQoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIC0xLCAtMSwgZmFsc2UpO1xuICB9XG4gIG9wZW5EaWFsb2dUYWJsZUFkZERhdGFzZXQoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIC0xLCBmYWxzZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ0NoYXJ0QWRkRGF0YU9mRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIGZhbHNlKTtcbiAgfVxuICBvcGVuRGlhbG9nQ2hhcnRFZGl0RGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIHRydWUpO1xuICB9XG4gIG9wZW5EaWFsb2dUYWJsZUVkaXREYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgaW5kZXgsIHRydWUpO1xuICB9XG4gIG9wZW5EaWFsb2dDaGFydEVkaXREYXRhT2ZEYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgaW5kZXgsIHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==