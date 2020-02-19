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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvZm9ybXMtYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUNMLGtCQUFrQixFQUFFLFlBQVksRUFDaEMsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTs7OztHQUlHO0FBQ0g7SUFzQkUsdUNBQ1UsUUFBaUMsRUFDbEMsTUFBaUI7UUFGMUIsaUJBdUJDO1FBdEJTLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFoQjFCLGtCQUFhLEdBQW1CLElBQUksQ0FBQztRQUVyQyxVQUFLLEdBQWMsRUFBRSxDQUFDO1FBR3RCLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBSXpCLHlCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzFCLGFBQVEsR0FBbUIsRUFBRSxDQUFDO1FBQzlCLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3JELHFCQUFnQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBTTFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7YUFDakQsU0FB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QyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0Qsa0VBQTBCLEdBQTFCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxrRUFBMEIsR0FBMUIsVUFBMkIsS0FBYTtRQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDRCx3RUFBZ0MsR0FBaEMsVUFBaUMsS0FBYTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxtREFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnQkFsUUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLDY4S0FBa0M7b0JBRWxDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWJPLHVCQUF1QjtnQkFMdkIsU0FBUzs7SUFnUmpCLG9DQUFDO0NBQUEsQUFwUUQsSUFvUUM7U0E3UFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uVHlwZSwgQWpmQ2hhcnRUeXBlLCBBamZDaGFydFdpZGdldCwgQWpmRGF0YXNldCwgQWpmRGF0YVdpZGdldCwgQWpmV2lkZ2V0LFxuICBBamZXaWRnZXRUeXBlXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXN9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgcHJvdmlkZXMgdGhlIHN1cHBvcnQgZm9yIGNvbm5lY3QgdGhlIGZvcm0gZmllbGRzIHdpdGggdGhlIHJlcG9ydFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWZvcm1zLWFuYWx5emVyJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3Jtcy1hbmFseXplci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm1zLWFuYWx5emVyLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcblxuICBmb3JtczogQWpmRm9ybVtdID0gW107XG5cbiAgZm9ybXNWYXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXTtcbiAgY2hvaWNlc09yaWdpbnM6IGFueSA9IHt9O1xuXG4gIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nPjtcblxuICBjdXJyZW50TWFpbkRhdGFJbmRleDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgX2RhdGFzZXQ6IEFqZkRhdGFzZXRbXVtdID0gW107XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybUFuYWx5emVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsXG4gICAgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nXG4gICkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICAgIC8vIHRoaXMuX2RhdGFzZXQgPSBteU9iai5kYXRhc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvcm1zVmFyaWFibGVzXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzID0geDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICB9XG5cbiAgc2V0Q3VycmVudEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBpc1NlbGVjdGVkKGluZGV4OiBudW1iZXIpOiBUaGVtZVBhbGV0dGUge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCkge1xuICAgICAgcmV0dXJuICdwcmltYXJ5JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIGdldCB0aGUgWCBjb21wb25lbnRzIGxhYmVsIG9mIHRoZSBjaGFydC5cbiAgICogIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgcm93IG9mIGRhdGFzZXRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXRNYWluRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbMF0gIT0gbnVsbCkge1xuICAgICAgbGV0IG1haW5EYXRhOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGFzZXRbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWFpbkRhdGEucHVzaCh0aGlzLl9kYXRhc2V0WzBdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYWluRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgZ2V0IHRoZSBZIGNvbXBvbmVudHMgbGFiZWwgb2YgdGhlIGNoYXJ0LlxuICAgKiAgdGhleSBhcmUgY29udGFpbmVkIGluIHRoZSBmaXJzdCBjb2x1bW4gb2YgZGF0YXNldFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIGdldERhdGFzZXQoKTogc3RyaW5nW10ge1xuICAgIGxldCBkYXRhc2V0OiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICh0aGlzLl9kYXRhc2V0WzBdICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5fZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYXRhc2V0LnB1c2godGhpcy5fZGF0YXNldFtpXVswXS5sYWJlbCB8fCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHJlbGF0ZWQgZGF0YSBsYWJlbCBvZiB0aGUgY2hhcnQuXG4gICAqIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgcm93IG9mIHRoZSBZIGNvbXBvbmVudFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIGdldFJlbGF0ZWREYXRhKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ICsgMV0gIT0gbnVsbCkge1xuICAgICAgbGV0IHJlbGF0ZWREYXRhOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlbGF0ZWREYXRhLnB1c2godGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ICsgMV1baV0ubGFiZWwgfHwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbGF0ZWREYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0VGFibGVIZWFkZXIoKTogc3RyaW5nW10ge1xuICAgIGxldCBtYWluRGF0YTogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5fZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFzZXRbaV1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgIG1haW5EYXRhLnB1c2godGhpcy5fZGF0YXNldFtpXVswXS5sYWJlbCB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1haW5EYXRhO1xuICB9XG5cbiAgZ2V0VGFibGVEYXRhKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4XSAhPSBudWxsKSB7XG4gICAgICBsZXQgdGFibGVEYXRhOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF1baV0gIT0gbnVsbCkge1xuICAgICAgICAgIHRhYmxlRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF1baV0ubGFiZWwgfHwgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFibGVEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgbmVlZE1haW5EYXRhKCk6IGJvb2xlYW4ge1xuICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgaWYgKFxuICAgICAgbXlPYmouY2hhcnRUeXBlID09PSBBamZDaGFydFR5cGUuU2NhdHRlciB8fFxuICAgICAgbXlPYmouY2hhcnRUeXBlID09PSBBamZDaGFydFR5cGUuQnViYmxlXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZU1haW5EYXRhKGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVJlbGF0ZWREYXRhKHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIC0xKTtcbiAgfVxuICByZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlUmVsYXRlZERhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlUmVsYXRlZERhdGEodGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShtYWluSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlRGF0YShtYWluSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGVkaXRNb2RlXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgb3BlbkRpYWxvZyhsZXZlbDogbnVtYmVyLCBtYWluSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlciwgZWRpdE1vZGU6IGJvb2xlYW4pIHtcblxuICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyk7XG5cbiAgICBpZiAoZWRpdE1vZGUpIHtcbiAgICAgIGlmIChsZXZlbCA9PT0gMSAmJiBpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgaWYgKGxldmVsID09PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgIT0gbnVsbCAmJiB0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZSA9PSBBamZXaWRnZXRUeXBlLkNoYXJ0KSB7XG4gICAgICAgICAgbWFpbkluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubGFiZWxUZXh0ID1cbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdICYmXG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XVtpbmRleF0ubGFiZWwgfHwgJyc7XG4gICAgICAvKiB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3JtdWxhID1cbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdICYmXG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XVtpbmRleF0uZm9ybXVsYS5mb3JtdWxhIHx8ICcnOyAqL1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPVxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF0gJiZcbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdW2luZGV4XS5hZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiB8fCBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubGFiZWxUZXh0ID0gJyc7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3JtdWxhID0gJyc7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5hZ2dyZWdhdGlvbiA9IDA7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXNWYXJpYWJsZXMgPSB0aGlzLmZvcm1zVmFyaWFibGVzO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmN1cnJlbnRXaWRnZXQgPSA8QWpmRGF0YVdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubGV2ZWwgPSBsZXZlbDtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5tYWluSW5kZXggPSBtYWluSW5kZXg7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5pbml0ID0gZmFsc2U7XG4gIH1cblxuICBvcGVuRGlhbG9nQWRkTWFpbkRhdGEoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDAsIC0xLCAtMSwgZmFsc2UpO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0NoYXJ0RWRpdE1haW5EYXRhKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygwLCAwLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCB0cnVlKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dUYWJsZUVkaXRNYWluRGF0YSgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMCwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgMCwgdHJ1ZSk7XG4gIH1cblxuICBvcGVuRGlhbG9nQ2hhcnRBZGREYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCAtMSwgLTEsIGZhbHNlKTtcbiAgfVxuICBvcGVuRGlhbG9nVGFibGVBZGREYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgZmFsc2UpO1xuICB9XG4gIG9wZW5EaWFsb2dDaGFydEFkZERhdGFPZkRhdGFzZXQoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIC0xLCBmYWxzZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ0NoYXJ0RWRpdERhdGFzZXQoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIC0xLCB0cnVlKTtcbiAgfVxuICBvcGVuRGlhbG9nVGFibGVFZGl0RGF0YXNldChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIGluZGV4LCB0cnVlKTtcbiAgfVxuICBvcGVuRGlhbG9nQ2hhcnRFZGl0RGF0YU9mRGF0YXNldChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIGluZGV4LCB0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=