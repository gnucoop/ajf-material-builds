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
var AjfReportBuilderFormsAnalyzer = /** @class */ (function () {
    function AjfReportBuilderFormsAnalyzer(_service, dialog) {
        var _this = this;
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
            .subscribe(function (x) {
            if (x != null) {
                _this.currentWidget = x;
                // this._dataset = myObj.dataset;
            }
            else {
                _this.currentWidget = null;
            }
        });
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe(function (x) {
            if (x != null) {
                _this.formsVariables = x;
            }
        });
    }
    AjfReportBuilderFormsAnalyzer.prototype.setCurrentIndex = function (index) {
        this.currentMainDataIndex = index;
    };
    AjfReportBuilderFormsAnalyzer.prototype.isSelected = function (index) {
        if (index === this.currentMainDataIndex) {
            return 'primary';
        }
        else {
            return undefined;
        }
    };
    /**
     *  get the X components label of the chart.
     *  they are contained in the first row of dataset
     *
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    AjfReportBuilderFormsAnalyzer.prototype.getMainData = function () {
        if (this._dataset[0] != null) {
            var mainData = [];
            for (var i = 0; i < this._dataset[0].length; i++) {
                mainData.push(this._dataset[0][i].label || '');
            }
            return mainData;
        }
        else {
            return [];
        }
    };
    /**
     *  get the Y components label of the chart.
     *  they are contained in the first column of dataset
     *
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    AjfReportBuilderFormsAnalyzer.prototype.getDataset = function () {
        var dataset = [];
        if (this._dataset[0] != null) {
            for (var i = 1; i < this._dataset.length; i++) {
                dataset.push(this._dataset[i][0].label || '');
            }
            return dataset;
        }
        else {
            return [];
        }
    };
    /**
     * get the related data label of the chart.
     * they are contained in the row of the Y component
     *
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    AjfReportBuilderFormsAnalyzer.prototype.getRelatedData = function () {
        if (this._dataset[this.currentMainDataIndex + 1] != null) {
            var relatedData = [];
            for (var i = 1; i < this._dataset[this.currentMainDataIndex + 1].length; i++) {
                relatedData.push(this._dataset[this.currentMainDataIndex + 1][i].label || '');
            }
            return relatedData;
        }
        else {
            return [];
        }
    };
    AjfReportBuilderFormsAnalyzer.prototype.getTableHeader = function () {
        var mainData = [];
        if (this._dataset != null) {
            for (var i = 0; i < this._dataset.length; i++) {
                if (this._dataset[i][0] != null) {
                    mainData.push(this._dataset[i][0].label || '');
                }
            }
        }
        return mainData;
    };
    AjfReportBuilderFormsAnalyzer.prototype.getTableData = function () {
        if (this._dataset[this.currentMainDataIndex] != null) {
            var tableData = [];
            for (var i = 1; i < this._dataset[this.currentMainDataIndex].length; i++) {
                if (this._dataset[this.currentMainDataIndex][i] != null) {
                    tableData.push(this._dataset[this.currentMainDataIndex][i].label || '');
                }
            }
            return tableData;
        }
        else {
            return [];
        }
    };
    AjfReportBuilderFormsAnalyzer.prototype.needMainData = function () {
        var myObj = this.currentWidget;
        if (myObj.chartType === AjfChartType.Scatter ||
            myObj.chartType === AjfChartType.Bubble) {
            return false;
        }
        else {
            return true;
        }
    };
    AjfReportBuilderFormsAnalyzer.prototype.removeMainData = function (index) {
        this._service.removeMainData(index);
    };
    AjfReportBuilderFormsAnalyzer.prototype.removeDataset = function (index) {
        this.currentMainDataIndex = index;
        this._service.removeRelatedData(this.currentMainDataIndex, -1);
    };
    AjfReportBuilderFormsAnalyzer.prototype.removeTableMainData = function (index) {
        this._service.removeTableMainData(index);
    };
    AjfReportBuilderFormsAnalyzer.prototype.removeRelatedData = function (index) {
        this._service.removeRelatedData(this.currentMainDataIndex, index);
    };
    AjfReportBuilderFormsAnalyzer.prototype.removeData = function (mainIndex, index) {
        this._service.removeData(mainIndex, index);
    };
    /**
     *
     *
     *
     * @param index
     * @param editMode
     *
     * @memberof AjfReportBuilderFormsAnalyzer
     */
    AjfReportBuilderFormsAnalyzer.prototype.openDialog = function (level, mainIndex, index, editMode) {
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
        this.dialogRef.componentInstance.currentWidget = this.currentWidget;
        this.dialogRef.componentInstance.level = level;
        this.dialogRef.componentInstance.mainIndex = mainIndex;
        this.dialogRef.componentInstance.index = index;
        this.dialogRef.componentInstance.init = false;
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogAddMainData = function () {
        this.openDialog(0, -1, -1, false);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogChartEditMainData = function () {
        this.openDialog(0, 0, this.currentMainDataIndex, true);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogTableEditMainData = function () {
        this.openDialog(0, this.currentMainDataIndex, 0, true);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogChartAddDataset = function () {
        this.openDialog(1, -1, -1, false);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogTableAddDataset = function () {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogChartAddDataOfDataset = function () {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogChartEditDataset = function () {
        this.openDialog(1, this.currentMainDataIndex, -1, true);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogTableEditDataset = function (index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    };
    AjfReportBuilderFormsAnalyzer.prototype.openDialogChartEditDataOfDataset = function (index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    };
    AjfReportBuilderFormsAnalyzer.prototype.ngOnDestroy = function () {
        this._currentWidgetSub.unsubscribe();
        this._formAnalyzerSub.unsubscribe();
    };
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
    AjfReportBuilderFormsAnalyzer.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: MatDialog }
    ]; };
    return AjfReportBuilderFormsAnalyzer;
}());
export { AjfReportBuilderFormsAnalyzer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvZm9ybXMtYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUNMLGtCQUFrQixFQUFFLFlBQVksRUFDaEMsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTs7OztHQUlHO0FBQ0g7SUFzQkUsdUNBQ1UsUUFBaUMsRUFDbEMsTUFBaUI7UUFGMUIsaUJBdUJDO1FBdEJTLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFoQjFCLGtCQUFhLEdBQW1CLElBQUksQ0FBQztRQUVyQyxVQUFLLEdBQWMsRUFBRSxDQUFDO1FBR3RCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBSXpCLHlCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzFCLGFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBQzlCLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3JELHFCQUFnQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBTTFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7YUFDakQsU0FB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QyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0Qsa0VBQTBCLEdBQTFCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxrRUFBMEIsR0FBMUIsVUFBMkIsS0FBYTtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDRCx3RUFBZ0MsR0FBaEMsVUFBaUMsS0FBYTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtREFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnQkFsUUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLDY4S0FBa0M7b0JBRWxDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWJPLHVCQUF1QjtnQkFMdkIsU0FBUzs7SUFnUmpCLG9DQUFDO0NBQUEsQUFwUUQsSUFvUUM7U0E3UFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvblR5cGUsIEFqZkNoYXJ0VHlwZSwgQWpmQ2hhcnRXaWRnZXQsIEFqZkRhdGFzZXQsIEFqZkRhdGFXaWRnZXQsIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZVxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IHByb3ZpZGVzIHRoZSBzdXBwb3J0IGZvciBjb25uZWN0IHRoZSBmb3JtIGZpZWxkcyB3aXRoIHRoZSByZXBvcnRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1mb3Jtcy1hbmFseXplcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybXMtYW5hbHl6ZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3Jtcy1hbmFseXplci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cbiAgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuXG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGNob2ljZXNPcmlnaW5zOiBhbnkgPSB7fTtcblxuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz47XG5cbiAgY3VycmVudE1haW5EYXRhSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9kYXRhc2V0OiBBamZEYXRhc2V0W11bXSA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm1BbmFseXplclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZ1xuICApIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0XG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgICAvLyB0aGlzLl9kYXRhc2V0ID0gbXlPYmouZGF0YXNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuXG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViID0gdGhpcy5fc2VydmljZS5mb3Jtc1ZhcmlhYmxlc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5mb3Jtc1ZhcmlhYmxlcyA9IHg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgfVxuXG4gIHNldEN1cnJlbnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCA9IGluZGV4O1xuICB9XG5cbiAgaXNTZWxlY3RlZChpbmRleDogbnVtYmVyKTogVGhlbWVQYWxldHRlIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgpIHtcbiAgICAgIHJldHVybiAncHJpbWFyeSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBnZXQgdGhlIFggY29tcG9uZW50cyBsYWJlbCBvZiB0aGUgY2hhcnQuXG4gICAqICB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdyBvZiBkYXRhc2V0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgZ2V0TWFpbkRhdGEoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLl9kYXRhc2V0WzBdICE9IG51bGwpIHtcbiAgICAgIGxldCBtYWluRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhc2V0WzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1haW5EYXRhLnB1c2godGhpcy5fZGF0YXNldFswXVtpXS5sYWJlbCB8fCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFpbkRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIGdldCB0aGUgWSBjb21wb25lbnRzIGxhYmVsIG9mIHRoZSBjaGFydC5cbiAgICogIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3QgY29sdW1uIG9mIGRhdGFzZXRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXREYXRhc2V0KCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgZGF0YXNldDogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5fZGF0YXNldFswXSAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGF0YXNldC5wdXNoKHRoaXMuX2RhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSByZWxhdGVkIGRhdGEgbGFiZWwgb2YgdGhlIGNoYXJ0LlxuICAgKiB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIHJvdyBvZiB0aGUgWSBjb21wb25lbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXRSZWxhdGVkRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdICE9IG51bGwpIHtcbiAgICAgIGxldCByZWxhdGVkRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXggKyAxXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByZWxhdGVkRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWxhdGVkRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldFRhYmxlSGVhZGVyKCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgbWFpbkRhdGE6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMuX2RhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhc2V0W2ldWzBdICE9IG51bGwpIHtcbiAgICAgICAgICBtYWluRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYWluRGF0YTtcbiAgfVxuXG4gIGdldFRhYmxlRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF0gIT0gbnVsbCkge1xuICAgICAgbGV0IHRhYmxlRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdW2ldICE9IG51bGwpIHtcbiAgICAgICAgICB0YWJsZURhdGEucHVzaCh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhYmxlRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIG5lZWRNYWluRGF0YSgpOiBib29sZWFuIHtcbiAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIGlmIChcbiAgICAgIG15T2JqLmNoYXJ0VHlwZSA9PT0gQWpmQ2hhcnRUeXBlLlNjYXR0ZXIgfHxcbiAgICAgIG15T2JqLmNoYXJ0VHlwZSA9PT0gQWpmQ2hhcnRUeXBlLkJ1YmJsZVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVNYWluRGF0YShpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVSZWxhdGVkRGF0YSh0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSk7XG4gIH1cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVJlbGF0ZWREYXRhKHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEobWFpbkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZURhdGEobWFpbkluZGV4LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBlZGl0TW9kZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIG9wZW5EaWFsb2cobGV2ZWw6IG51bWJlciwgbWFpbkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGVkaXRNb2RlOiBib29sZWFuKSB7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2cpO1xuXG4gICAgaWYgKGVkaXRNb2RlKSB7XG4gICAgICBpZiAobGV2ZWwgPT09IDEgJiYgaW5kZXggPT09IC0xKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwgJiYgdGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUgPT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgICAgICAgIG1haW5JbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsVGV4dCA9XG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJlxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmxhYmVsIHx8ICcnO1xuICAgICAgLyogdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9XG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJlxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmZvcm11bGEuZm9ybXVsYSB8fCAnJzsgKi9cbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmFnZ3JlZ2F0aW9uID1cbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdICYmXG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XVtpbmRleF0uYWdncmVnYXRpb24uYWdncmVnYXRpb24gfHwgQWpmQWdncmVnYXRpb25UeXBlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsVGV4dCA9ICcnO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9ICcnO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPSAwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm1zVmFyaWFibGVzID0gdGhpcy5mb3Jtc1ZhcmlhYmxlcztcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jdXJyZW50V2lkZ2V0ID0gPEFqZkRhdGFXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxldmVsID0gbGV2ZWw7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWFpbkluZGV4ID0gbWFpbkluZGV4O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuaW5pdCA9IGZhbHNlO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0FkZE1haW5EYXRhKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygwLCAtMSwgLTEsIGZhbHNlKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dDaGFydEVkaXRNYWluRGF0YSgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMCwgMCwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBvcGVuRGlhbG9nVGFibGVFZGl0TWFpbkRhdGEoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDAsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIDAsIHRydWUpO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0NoYXJ0QWRkRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgLTEsIC0xLCBmYWxzZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ1RhYmxlQWRkRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIGZhbHNlKTtcbiAgfVxuICBvcGVuRGlhbG9nQ2hhcnRBZGREYXRhT2ZEYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgZmFsc2UpO1xuICB9XG4gIG9wZW5EaWFsb2dDaGFydEVkaXREYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgdHJ1ZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ1RhYmxlRWRpdERhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ0NoYXJ0RWRpdERhdGFPZkRhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19