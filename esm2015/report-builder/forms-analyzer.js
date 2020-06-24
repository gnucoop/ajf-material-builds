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
                },] }
    ];
    AjfReportBuilderFormsAnalyzer.ctorParameters = () => [
        { type: AjfReportBuilderService },
        { type: MatDialog }
    ];
    return AjfReportBuilderFormsAnalyzer;
})();
export { AjfReportBuilderFormsAnalyzer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcmVwb3J0LWJ1aWxkZXIvZm9ybXMtYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixZQUFZLEVBS1osYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvRixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTs7OztHQUlHO0FBQ0g7SUFBQSxNQU9hLDZCQUE2QjtRQWV4QyxZQUFvQixRQUFpQyxFQUFTLE1BQWlCO1lBQTNELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBVztZQWQvRSxrQkFBYSxHQUFtQixJQUFJLENBQUM7WUFFckMsVUFBSyxHQUFjLEVBQUUsQ0FBQztZQUd0QixtQkFBYyxHQUFRLEVBQUUsQ0FBQztZQUl6Qix5QkFBb0IsR0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxQixhQUFRLEdBQW1CLEVBQUUsQ0FBQztZQUM5QixzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNyRCxxQkFBZ0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUcxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMs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Q3hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsMEJBQTBCLENBQUMsS0FBYTtZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxnQ0FBZ0MsQ0FBQyxLQUFhO1lBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELFdBQVc7WUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLENBQUM7OztnQkF0UEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLDY4S0FBa0M7b0JBRWxDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0JBYk8sdUJBQXVCO2dCQUx2QixTQUFTOztJQW1RakIsb0NBQUM7S0FBQTtTQWhQWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uVHlwZSxcbiAgQWpmQ2hhcnRUeXBlLFxuICBBamZDaGFydFdpZGdldCxcbiAgQWpmRGF0YXNldCxcbiAgQWpmRGF0YVdpZGdldCxcbiAgQWpmV2lkZ2V0LFxuICBBamZXaWRnZXRUeXBlXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXN9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgcHJvdmlkZXMgdGhlIHN1cHBvcnQgZm9yIGNvbm5lY3QgdGhlIGZvcm0gZmllbGRzIHdpdGggdGhlIHJlcG9ydFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWZvcm1zLWFuYWx5emVyJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3Jtcy1hbmFseXplci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm1zLWFuYWx5emVyLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcblxuICBmb3JtczogQWpmRm9ybVtdID0gW107XG5cbiAgZm9ybXNWYXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXTtcbiAgY2hvaWNlc09yaWdpbnM6IGFueSA9IHt9O1xuXG4gIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nPjtcblxuICBjdXJyZW50TWFpbkRhdGFJbmRleDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgX2RhdGFzZXQ6IEFqZkRhdGFzZXRbXVtdID0gW107XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybUFuYWx5emVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsIHB1YmxpYyBkaWFsb2c6IE1hdERpYWxvZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICAvLyB0aGlzLl9kYXRhc2V0ID0gbXlPYmouZGF0YXNldDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIHRoaXMuX2Zvcm1BbmFseXplclN1YiA9IHRoaXMuX3NlcnZpY2UuZm9ybXNWYXJpYWJsZXMuc3Vic2NyaWJlKCh4KSA9PiB7XG4gICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZm9ybXNWYXJpYWJsZXMgPSB4O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0Q3VycmVudEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBpc1NlbGVjdGVkKGluZGV4OiBudW1iZXIpOiBUaGVtZVBhbGV0dGUge1xuICAgIGlmIChpbmRleCA9PT0gdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCkge1xuICAgICAgcmV0dXJuICdwcmltYXJ5JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIGdldCB0aGUgWCBjb21wb25lbnRzIGxhYmVsIG9mIHRoZSBjaGFydC5cbiAgICogIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgcm93IG9mIGRhdGFzZXRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyXG4gICAqL1xuICBnZXRNYWluRGF0YSgpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuX2RhdGFzZXRbMF0gIT0gbnVsbCkge1xuICAgICAgbGV0IG1haW5EYXRhOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGFzZXRbMF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbWFpbkRhdGEucHVzaCh0aGlzLl9kYXRhc2V0WzBdW2ldLmxhYmVsIHx8ICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYWluRGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAgZ2V0IHRoZSBZIGNvbXBvbmVudHMgbGFiZWwgb2YgdGhlIGNoYXJ0LlxuICAgKiAgdGhleSBhcmUgY29udGFpbmVkIGluIHRoZSBmaXJzdCBjb2x1bW4gb2YgZGF0YXNldFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIGdldERhdGFzZXQoKTogc3RyaW5nW10ge1xuICAgIGxldCBkYXRhc2V0OiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmICh0aGlzLl9kYXRhc2V0WzBdICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5fZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYXRhc2V0LnB1c2godGhpcy5fZGF0YXNldFtpXVswXS5sYWJlbCB8fCAnJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YXNldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIHJlbGF0ZWQgZGF0YSBsYWJlbCBvZiB0aGUgY2hhcnQuXG4gICAqIHRoZXkgYXJlIGNvbnRhaW5lZCBpbiB0aGUgcm93IG9mIHRoZSBZIGNvbXBvbmVudFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJcbiAgICovXG4gIGdldFJlbGF0ZWREYXRhKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ICsgMV0gIT0gbnVsbCkge1xuICAgICAgbGV0IHJlbGF0ZWREYXRhOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCArIDFdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlbGF0ZWREYXRhLnB1c2godGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4ICsgMV1baV0ubGFiZWwgfHwgJycpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlbGF0ZWREYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgZ2V0VGFibGVIZWFkZXIoKTogc3RyaW5nW10ge1xuICAgIGxldCBtYWluRGF0YTogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5fZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFzZXRbaV1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgIG1haW5EYXRhLnB1c2godGhpcy5fZGF0YXNldFtpXVswXS5sYWJlbCB8fCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1haW5EYXRhO1xuICB9XG5cbiAgZ2V0VGFibGVEYXRhKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5fZGF0YXNldFt0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4XSAhPSBudWxsKSB7XG4gICAgICBsZXQgdGFibGVEYXRhOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF1baV0gIT0gbnVsbCkge1xuICAgICAgICAgIHRhYmxlRGF0YS5wdXNoKHRoaXMuX2RhdGFzZXRbdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleF1baV0ubGFiZWwgfHwgJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFibGVEYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgbmVlZE1haW5EYXRhKCk6IGJvb2xlYW4ge1xuICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgaWYgKG15T2JqLmNoYXJ0VHlwZSA9PT0gQWpmQ2hhcnRUeXBlLlNjYXR0ZXIgfHwgbXlPYmouY2hhcnRUeXBlID09PSBBamZDaGFydFR5cGUuQnViYmxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZU1haW5EYXRhKGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXggPSBpbmRleDtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVJlbGF0ZWREYXRhKHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIC0xKTtcbiAgfVxuICByZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlUmVsYXRlZERhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlUmVsYXRlZERhdGEodGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShtYWluSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlRGF0YShtYWluSW5kZXgsIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGVkaXRNb2RlXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplclxuICAgKi9cbiAgb3BlbkRpYWxvZyhsZXZlbDogbnVtYmVyLCBtYWluSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlciwgZWRpdE1vZGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2cpO1xuXG4gICAgaWYgKGVkaXRNb2RlKSB7XG4gICAgICBpZiAobGV2ZWwgPT09IDEgJiYgaW5kZXggPT09IC0xKSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cbiAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwgJiYgdGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGUgPT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgICAgICAgIG1haW5JbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4Kys7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsVGV4dCA9XG4gICAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdICYmIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XVtpbmRleF0ubGFiZWwgfHwgJyc7XG4gICAgICAvKiB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3JtdWxhID1cbiAgICAgICAgdGhpcy5fZGF0YXNldFttYWluSW5kZXhdICYmXG4gICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XVtpbmRleF0uZm9ybXVsYS5mb3JtdWxhIHx8ICcnOyAqL1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPVxuICAgICAgICAgIHRoaXMuX2RhdGFzZXRbbWFpbkluZGV4XSAmJiB0aGlzLl9kYXRhc2V0W21haW5JbmRleF1baW5kZXhdLmFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uIHx8XG4gICAgICAgICAgQWpmQWdncmVnYXRpb25UeXBlLk5vbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxhYmVsVGV4dCA9ICcnO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9ICcnO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPSAwO1xuICAgIH1cblxuICAgIC8vIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm1zVmFyaWFibGVzID0gdGhpcy5mb3Jtc1ZhcmlhYmxlcztcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5jdXJyZW50V2lkZ2V0ID0gPEFqZkRhdGFXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmxldmVsID0gbGV2ZWw7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UubWFpbkluZGV4ID0gbWFpbkluZGV4O1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuaW5pdCA9IGZhbHNlO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0FkZE1haW5EYXRhKCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygwLCAtMSwgLTEsIGZhbHNlKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2dDaGFydEVkaXRNYWluRGF0YSgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMCwgMCwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBvcGVuRGlhbG9nVGFibGVFZGl0TWFpbkRhdGEoKSB7XG4gICAgdGhpcy5vcGVuRGlhbG9nKDAsIHRoaXMuY3VycmVudE1haW5EYXRhSW5kZXgsIDAsIHRydWUpO1xuICB9XG5cbiAgb3BlbkRpYWxvZ0NoYXJ0QWRkRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgLTEsIC0xLCBmYWxzZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ1RhYmxlQWRkRGF0YXNldCgpIHtcbiAgICB0aGlzLm9wZW5EaWFsb2coMSwgdGhpcy5jdXJyZW50TWFpbkRhdGFJbmRleCwgLTEsIGZhbHNlKTtcbiAgfVxuICBvcGVuRGlhbG9nQ2hhcnRBZGREYXRhT2ZEYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgZmFsc2UpO1xuICB9XG4gIG9wZW5EaWFsb2dDaGFydEVkaXREYXRhc2V0KCkge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCAtMSwgdHJ1ZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ1RhYmxlRWRpdERhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cbiAgb3BlbkRpYWxvZ0NoYXJ0RWRpdERhdGFPZkRhdGFzZXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMub3BlbkRpYWxvZygxLCB0aGlzLmN1cnJlbnRNYWluRGF0YUluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybUFuYWx5emVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==