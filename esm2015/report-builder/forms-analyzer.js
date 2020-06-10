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
let AjfReportBuilderFormsAnalyzer = /** @class */ (() => {
    class AjfReportBuilderFormsAnalyzer {
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
            this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
                if (x != null) {
                    this.currentWidget = x;
                    // this._dataset = myObj.dataset;
                }
                else {
                    this.currentWidget = null;
                }
            });
            this._formAnalyzerSub = this._service.formsVariables.subscribe((x) => {
                if (x != null) {
                    this.formsVariables = x;
                }
            });
        }
        setCurrentIndex(index) {
            this.currentMainDataIndex = index;
        }
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
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        getMainData() {
            if (this._dataset[0] != null) {
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
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        getDataset() {
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
         * @memberof AjfReportBuilderFormsAnalyzer
         */
        getRelatedData() {
            if (this._dataset[this.currentMainDataIndex + 1] != null) {
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
        getTableHeader() {
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
        getTableData() {
            if (this._dataset[this.currentMainDataIndex] != null) {
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
        needMainData() {
            let myObj = this.currentWidget;
            if (myObj.chartType === AjfChartType.Scatter || myObj.chartType === AjfChartType.Bubble) {
                return false;
            }
            else {
                return true;
            }
        }
        removeMainData(index) {
            this._service.removeMainData(index);
        }
        removeDataset(index) {
            this.currentMainDataIndex = index;
            this._service.removeRelatedData(this.currentMainDataIndex, -1);
        }
        removeTableMainData(index) {
            this._service.removeTableMainData(index);
        }
        removeRelatedData(index) {
            this._service.removeRelatedData(this.currentMainDataIndex, index);
        }
        removeData(mainIndex, index) {
            this._service.removeData(mainIndex, index);
        }
        /**
         *
         *
         *
         * @param index
         * @param editMode
         *
         * @memberof AjfReportBuilderFormsAnalyzer
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
                    this._dataset[mainIndex] && this._dataset[mainIndex][index].label || '';
                /* this.dialogRef.componentInstance.formula =
                  this._dataset[mainIndex] &&
                  this._dataset[mainIndex][index].formula.formula || ''; */
                this.dialogRef.componentInstance.aggregation =
                    this._dataset[mainIndex] && this._dataset[mainIndex][index].aggregation.aggregation ||
                        AjfAggregationType.None;
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
        }
        openDialogAddMainData() {
            this.openDialog(0, -1, -1, false);
        }
        openDialogChartEditMainData() {
            this.openDialog(0, 0, this.currentMainDataIndex, true);
        }
        openDialogTableEditMainData() {
            this.openDialog(0, this.currentMainDataIndex, 0, true);
        }
        openDialogChartAddDataset() {
            this.openDialog(1, -1, -1, false);
        }
        openDialogTableAddDataset() {
            this.openDialog(1, this.currentMainDataIndex, -1, false);
        }
        openDialogChartAddDataOfDataset() {
            this.openDialog(1, this.currentMainDataIndex, -1, false);
        }
        openDialogChartEditDataset() {
            this.openDialog(1, this.currentMainDataIndex, -1, true);
        }
        openDialogTableEditDataset(index) {
            this.openDialog(1, this.currentMainDataIndex, index, true);
        }
        openDialogChartEditDataOfDataset(index) {
            this.openDialog(1, this.currentMainDataIndex, index, true);
        }
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
    return AjfReportBuilderFormsAnalyzer;
})();
export { AjfReportBuilderFormsAnalyzer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvZm9ybXMtYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixZQUFZLEVBS1osYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTs7OztHQUlHO0FBQ0g7SUFBQSxNQU9hLDZCQUE2QjtRQWV4QyxZQUFvQixRQUFpQyxFQUFTLE1BQWlCO1lBQTNELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQWQvRSxrQkFBYSxHQUFtQixJQUFJLENBQUM7WUFFckMsVUFBSyxHQUFjLEVBQUUsQ0FBQztZQUd0QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztZQUl6Qix5QkFBb0IsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxQixhQUFRLEdBQW1CLEVBQUUsQ0FBQztZQUM5QixzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNyRCxxQkFBZ0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUcxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMs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Q3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsMEJBQTBCLENBQUMsS0FBYTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxnQ0FBZ0MsQ0FBQyxLQUFhO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztnQkF0UEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLDY4S0FBa0M7b0JBRWxDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWJPLHVCQUF1QjtnQkFMdkIsU0FBUzs7SUFtUWpCLG9DQUFDO0tBQUE7U0FoUFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvblR5cGUsXG4gIEFqZkNoYXJ0VHlwZSxcbiAgQWpmQ2hhcnRXaWRnZXQsXG4gIEFqZkRhdGFzZXQsXG4gIEFqZkRhdGFXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZVxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIHRoaXMgY29tcG9uZW50IHByb3ZpZGVzIHRoZSBzdXBwb3J0IGZvciBjb25uZWN0IHRoZSBmb3JtIGZpZWxkcyB3aXRoIHRoZSByZXBvcnRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1mb3Jtcy1hbmFseXplcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybXMtYW5hbHl6ZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3Jtcy1hbmFseXplci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cbiAgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuXG4gIGZvcm1zVmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW107XG4gIGNob2ljZXNPcmlnaW5zOiBhbnkgPSB7fTtcblxuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz47XG5cbiAgY3VycmVudE1haW5EYXRhSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9kYXRhc2V0OiBBamZEYXRhc2V0W11bXSA9IFtdO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm1BbmFseXplclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgLy8gdGhpcy5fZGF0YXNldCA9IG15T2JqLmRhdGFzZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICB0aGlzLl9mb3JtQW5hbHl6ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvcm1zVmFyaWFibGVzLnN1YnNjcmliZSgoeCkgPT4ge1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmZvcm1zVmFyaWFibGVzID0geDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldEN1cnJlbnRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCA9IGluZGV4O1xuICB9XG5cbiAgaXNTZWxlY3RlZChpbmRleDogbnVtYmVyKTogVGhlbWVQYWxldHRlIHtcbiAgICBpZiAoaW5kZXggPT09IHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgpIHtcbiAgICAgIHJldHVybiAncHJpbWFyeSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBnZXQgdGhlIFggY29tcG9uZW50cyBsYWJlbCBvZiB0aGUgY2hhcnQuXG4gICAqICB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdyBvZiBkYXRhc2V0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgZ2V0TWFpbkRhdGEoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLl9kYXRhc2V0WzBdICE9IG51bGwpIHtcbiAgICAgIGxldCBtYWluRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhc2V0WzBdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1haW5EYXRhLnB1c2godGhpcy5fZGF0YXNldFswXVtpXS5sYWJlbCB8fCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWFpbkRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIGdldCB0aGUgWSBjb21wb25lbnRzIGxhYmVsIG9mIHRoZSBjaGFydC5cbiAgICogIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3QgY29sdW1uIG9mIGRhdGFzZXRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXREYXRhc2V0KCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgZGF0YXNldDogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5fZGF0YXNldFswXSAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGF0YXNldC5wdXNoKHRoaXMuX2RhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGFzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSByZWxhdGVkIGRhdGEgbGFiZWwgb2YgdGhlIGNoYXJ0LlxuICAgKiB0aGV5IGFyZSBjb250YWluZWQgaW4gdGhlIHJvdyBvZiB0aGUgWSBjb21wb25lbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXRSZWxhdGVkRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdICE9IG51bGwpIHtcbiAgICAgIGxldCByZWxhdGVkRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXggKyAxXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByZWxhdGVkRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWxhdGVkRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGdldFRhYmxlSGVhZGVyKCk6IHN0cmluZ1tdIHtcbiAgICBsZXQgbWFpbkRhdGE6IHN0cmluZ1tdID0gW107XG4gICAgaWYgKHRoaXMuX2RhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhc2V0W2ldWzBdICE9IG51bGwpIHtcbiAgICAgICAgICBtYWluRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYWluRGF0YTtcbiAgfVxuXG4gIGdldFRhYmxlRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF0gIT0gbnVsbCkge1xuICAgICAgbGV0IHRhYmxlRGF0YTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdW2ldICE9IG51bGwpIHtcbiAgICAgICAgICB0YWJsZURhdGEucHVzaCh0aGlzLl9kYXRhc2V0W3RoaXMuY3VycmVudE1haW5EYXRhSW5kZXhdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhYmxlRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIG5lZWRNYWluRGF0YSgpOiBib29sZWFuIHtcbiAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIGlmIChteU9iai5jaGFydFR5cGUgPT09IEFqZkNoYXJ0VHlwZS5TY2F0dGVyIHx8IG15T2JqLmNoYXJ0VHlwZSA9PT0gQWpmQ2hhcnRUeXBlLkJ1YmJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVNYWluRGF0YShpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVSZWxhdGVkRGF0YSh0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSk7XG4gIH1cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVJlbGF0ZWREYXRhKHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEobWFpbkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZURhdGEobWFpbkluZGV4LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBlZGl0TW9kZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIG9wZW5EaWFsb2cobGV2ZWw6IG51bWJlciwgbWFpbkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIsIGVkaXRNb2RlOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nKTtcblxuICAgIGlmIChlZGl0TW9kZSkge1xuICAgICAgaWYgKGxldmVsID09PSAxICYmIGluZGV4ID09PSAtMSkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAobGV2ZWwgPT09IDEpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsICYmIHRoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlID09IEFqZldpZGdldFR5cGUuQ2hhcnQpIHtcbiAgICAgICAgICBtYWluSW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCsrO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sYWJlbFRleHQgPVxuICAgICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJiB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmxhYmVsIHx8ICcnO1xuICAgICAgLyogdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9XG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJlxuICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmZvcm11bGEuZm9ybXVsYSB8fCAnJzsgKi9cbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmFnZ3JlZ2F0aW9uID1cbiAgICAgICAgICB0aGlzLl9kYXRhc2V0W21haW5JbmRleF0gJiYgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdW2luZGV4XS5hZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiB8fFxuICAgICAgICAgIEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sYWJlbFRleHQgPSAnJztcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm11bGEgPSAnJztcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmFnZ3JlZ2F0aW9uID0gMDtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3Jtc1ZhcmlhYmxlcyA9IHRoaXMuZm9ybXNWYXJpYWJsZXM7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuY3VycmVudFdpZGdldCA9IDxBamZEYXRhV2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5sZXZlbCA9IGxldmVsO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm1haW5JbmRleCA9IG1haW5JbmRleDtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmluaXQgPSBmYWxzZTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dBZGRNYWluRGF0YSgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMCwgLTEsIC0xLCBmYWxzZSk7XG4gIH1cblxuICBvcGVuRGlhbG9nQ2hhcnRFZGl0TWFpbkRhdGEoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDAsIDAsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIHRydWUpO1xuICB9XG5cbiAgb3BlbkRpYWxvZ1RhYmxlRWRpdE1haW5EYXRhKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygwLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAwLCB0cnVlKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dDaGFydEFkZERhdGFzZXQoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIC0xLCAtMSwgZmFsc2UpO1xuICB9XG4gIG9wZW5EaWFsb2dUYWJsZUFkZERhdGFzZXQoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDEsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIC0xLCBmYWxzZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ0NoYXJ0QWRkRGF0YU9mRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIGZhbHNlKTtcbiAgfVxuICBvcGVuRGlhbG9nQ2hhcnRFZGl0RGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIHRydWUpO1xuICB9XG4gIG9wZW5EaWFsb2dUYWJsZUVkaXREYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgaW5kZXgsIHRydWUpO1xuICB9XG4gIG9wZW5EaWFsb2dDaGFydEVkaXREYXRhT2ZEYXRhc2V0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgaW5kZXgsIHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=