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
import { AjfImageType } from '@ajf/core/image';
import { evaluateExpression } from '@ajf/core/models';
import { AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderRendererWidget = /** @class */ (() => {
    class AjfReportBuilderRendererWidget {
        constructor(_service) {
            this._service = _service;
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            this.currentContentWidget = null;
            this._onDraggedSub = Subscription.EMPTY;
        }
        get widgetTypes() {
            return AjfWidgetType;
        }
        get layoutWidget() {
            return this.widget;
        }
        canDropPredicate(item) {
            for (let i = 0; i < item.data.dropZones.length; i++) {
                if (['header', 'widget'].indexOf(item.data.dropZones[i]) > -1) {
                    return true;
                }
            }
            return false;
        }
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragStartHandler() {
            let s = timer(200).subscribe(() => {
                s.unsubscribe();
                this._service.dragStarted();
            });
        }
        /**
         * sign the end of mouse drag
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragEndHandler() {
            this._service.dragEnded();
        }
        getColumnContent() {
            const myObj = this.widget;
            return myObj.content;
        }
        getIcon() {
            const defVal = { fontSet: '', fontIcon: '' };
            const myObj = this.widget;
            if (myObj.icon == null) {
                return null;
            }
            return evaluateExpression(myObj.icon.formula) || defVal;
        }
        getFlag() {
            const defVal = 'ch';
            const myObj = this.widget;
            if (myObj.flag == null) {
                return null;
            }
            return evaluateExpression(myObj.flag.formula) || defVal;
        }
        getPercent(index) {
            const myObj = this.widget;
            const percent = myObj.columns[index] * 100;
            return `${percent.toString()}%`;
        }
        getImageUrl() {
            const defVal = '';
            const myObj = this.widget;
            if (myObj.url == null) {
                return null;
            }
            return evaluateExpression(myObj.url.formula) || defVal;
        }
        getImageType() {
            return this.widget != null ? this.widget.imageType : AjfImageType.Image;
        }
        getHtmlText() {
            const myObj = this.widget;
            if (myObj.htmlText === '') {
                return '...';
            }
            else {
                return myObj.htmlText;
            }
        }
        getCoordinate() {
            const myObj = this.widget;
            if (myObj.coordinate == null) {
                return [51.505, -0.09, 13];
            }
            else {
                return myObj.coordinate;
            }
        }
        getTileLayer() {
            const myObj = this.widget;
            if (myObj.tileLayer === '') {
                return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
            }
            else {
                return myObj.tileLayer;
            }
        }
        getAttribution() {
            let myObj;
            myObj = this.widget;
            if (myObj.attribution === '') {
                return '&copy; <a href=\'http://osm.org/copyright\'>O</a> contributors';
            }
            else {
                return myObj.attribution;
            }
        }
        addToList(event, toColumn) {
            this.onDragEndHandler();
            this._service.addToColumn(event, toColumn);
        }
        ngOnInit() {
            this._onDraggedSub = this._service.onDragged.subscribe(x => {
                this.onDragged = x;
            });
            this.getChartType = this._service.currentWidget.pipe(map((widget) => {
                if (widget == null) {
                    return 0;
                }
                const myObj = this.widget;
                return (myObj.chartType);
            }), distinctUntilChanged(), startWith(0));
            this.getDataset = this._service.currentWidget.pipe(map((widget) => {
                if (widget != null && widget.dataset != null) {
                    const myObj = this.widget;
                    return myObj.dataset;
                }
                else {
                    return [];
                }
            }), distinctUntilChanged());
            this.getTableTitles = this._service.currentWidget.pipe(map((widget) => {
                if (widget == null) {
                    return [];
                }
                const myObj = this.widget;
                if (myObj.dataset != null) {
                    let tableTitle = [];
                    for (let i = 0; i < myObj.dataset.length; i++) {
                        if (myObj.dataset[i][0] != null) {
                            tableTitle.push(myObj.dataset[i][0].label || '');
                        }
                    }
                    return tableTitle;
                }
                else {
                    return [];
                }
            }));
            this.getTableContent = this._service.currentWidget.pipe(map((widget) => {
                if (widget == null) {
                    return [];
                }
                const myObj = this.widget;
                if (myObj.dataset != null) {
                    let tableContent = [];
                    for (let i = 0; i < myObj.dataset.length; i++) {
                        for (let j = 0; j < myObj.dataset[i].length; j++) {
                            if ((myObj.dataset[i] != null) && (myObj.dataset[i][j + 1] != null)) {
                                if (tableContent[j] == null) {
                                    tableContent[j] = [];
                                }
                                if (tableContent[j][i] == null) {
                                    tableContent[j][i] = ' ';
                                }
                                tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label || '');
                            }
                        }
                    }
                    return tableContent;
                }
                return [];
            }));
            this._service.updateCurrentWidget(this.widget);
        }
        ngOnChanges(changes) {
            if (changes.widget && changes.widget.currentValue != null) {
                this.widget = changes.widget.currentValue;
            }
        }
        ngOnDestroy() {
            this._onDraggedSub.unsubscribe();
        }
    }
    AjfReportBuilderRendererWidget.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-renderer-widget',
                    template: "<div class=\"ajf-container\"\n    [ngSwitch]=\"widget?.widgetType\"\n    [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\">\n  <div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\"\n    [applyStyles]=\"widget.styles\">\n      <div class=\"ajf-columns\">\n        <ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\">\n          <div class=\"ajf-column\"\n            [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\"\n            [style.width]=getPercent(idx)\n            [applyStyles]=\"layoutWidget.content[idx].styles\">\n            <ajf-report-builder-widgets-row-buttons\n              [from]=\"'layout'\"\n              [fromWidget]=\"widget\"\n              [widget]=\"clm\"\n              [position]=\"idx\"\n              (onDragStart)=\"onDragStartHandler();\"\n              (onDragEnd)=\"onDragEndHandler();\"\n              [child]=\"true\">\n            </ajf-report-builder-widgets-row-buttons>\n            <ajf-column\n              [column]=\"clm\"\n              [applyStyles]=\"widget.styles\">\n            </ajf-column>\n            <ng-template [ngIf]=\"onDragged === true\">\n              <div cdkDropList\n                [cdkDropListEnterPredicate]=\"canDropPredicate\"\n                [style.display]=\"onDragged ? 'block' : 'none'\"\n                (cdkDropListDropped)=\"addToList($event, clm)\"\n                class=\"ajf-column-drop-zone\"\n                (dragover)=\"layoutShow = true;\"\n                (dragleave)=\"layoutShow = false;\">\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n      </div>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\">\n    <ajf-image\n      [applyStyles]=\"widget.styles\"\n      [type]=\"getImageType()\"\n      [imageUrl]=\"getImageUrl()\"\n      [icon]=\"getIcon()\"\n      [flag]=\"getFlag()\">\n    </ajf-image>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\">\n    <ajf-text [htmlText]=\"getHtmlText() | translate\"  [applyStyles]=\"widget.styles\"></ajf-text>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n  </div>\n  <!-- <div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-table *ngIf=\"getTableContent|async as tc\" [data]=\"tc!\" ></ajf-table>\n  </div> -->\n  <div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\">\n    </ajf-map>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid blue;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red !important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0 !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted blue;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted blue}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-show,ajf-report-builder-renderer-widget .ajf-on-drag-over{border:33px dotted blue;opacity:1 !important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden !important;display:none !important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red !important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderRendererWidget.ctorParameters = () => [
        { type: AjfReportBuilderService }
    ];
    AjfReportBuilderRendererWidget.propDecorators = {
        widget: [{ type: Input }],
        position: [{ type: Input }],
        section: [{ type: Input }]
    };
    return AjfReportBuilderRendererWidget;
})();
export { AjfReportBuilderRendererWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXItd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlbmRlcmVyLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQVVMLGFBQWEsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTtJQUFBLE1BT2EsOEJBQThCO1FBbUN6QyxZQUFvQixRQUFpQztZQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQXBCckQsMkNBQTJDO1lBQzNDLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFFbEIseUJBQW9CLEdBQW1CLElBQUksQ0FBQztZQWVwQyxrQkFBYSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRUQsQ0FBQztRQWxDekQsSUFBSSxXQUFXO1lBQ2IsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQztRQUlELElBQUksWUFBWTtZQUNkLE9BQU8sSUFBSSxDQUFDLE1BQXlCLENBQUM7UUFDeEMsQ0FBQztRQTRCRCxnQkFBZ0IsQ0FBQyxJQUF1QztZQUN0RCxLQUFLLElBQUksQ0FBQyxHQUFHLENB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bkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBUk8sdUJBQXVCOzs7eUJBYzVCLEtBQUs7MkJBTUwsS0FBSzswQkFFTCxLQUFLOztJQW1PUixxQ0FBQztLQUFBO1NBaFBZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZJbWFnZVR5cGV9IGZyb20gJ0BhamYvY29yZS9pbWFnZSc7XG5pbXBvcnQge2V2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZDaGFydFdpZGdldCxcbiAgQWpmQ29sdW1uV2lkZ2V0LFxuICBBamZEYXRhc2V0LFxuICBBamZJbWFnZVdpZGdldCxcbiAgQWpmTGF5b3V0V2lkZ2V0LFxuICBBamZNYXBXaWRnZXQsXG4gIEFqZlRhYmxlV2lkZ2V0LFxuICBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsXG4gIEFqZldpZGdldFR5cGVcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGF9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItZHJhZy1kYXRhJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1yZW5kZXJlci13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlbmRlcmVyLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlbmRlcmVyLXdpZGdldC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclJlbmRlcmVyV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIGdldCB3aWRnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gQWpmV2lkZ2V0VHlwZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHdpZGdldDogQWpmV2lkZ2V0O1xuXG4gIGdldCBsYXlvdXRXaWRnZXQoKTogQWpmTGF5b3V0V2lkZ2V0IHtcbiAgICByZXR1cm4gdGhpcy53aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICB9XG5cbiAgQElucHV0KCkgcG9zaXRpb246IG51bWJlcjtcblxuICBASW5wdXQoKSBzZWN0aW9uOiBzdHJpbmc7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuICBjdXJyZW50Q29udGVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBvYmo6IGFueTtcbiAgZml4ZWRab29tOiBhbnk7XG5cbiAgZ2V0VGFibGVUaXRsZXM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRUYWJsZUNvbnRlbnQ6IE9ic2VydmFibGU8c3RyaW5nW11bXXx1bmRlZmluZWQ+O1xuXG4gIGdldENoYXJ0VHlwZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXREYXRhc2V0OiBPYnNlcnZhYmxlPEFqZkRhdGFzZXRbXVtdPjtcbiAgZ2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRDaGFydEJvcmRlckNvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0Q2hhcnRCb3JkZXJXaWR0aDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGxheW91dFNob3c6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uZGF0YS5kcm9wWm9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChbJ2hlYWRlcicsICd3aWRnZXQnXS5pbmRleE9mKGl0ZW0uZGF0YS5kcm9wWm9uZXNbaV0pID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgc3RhcnQgb2YgbW91c2UgZHJhZyB3aXRoIDIwMCBtcyBvZiBkZWxheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ1N0YXJ0SGFuZGxlcigpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuXG4gIGdldENvbHVtbkNvbnRlbnQoKTogQWpmQ29sdW1uV2lkZ2V0W10ge1xuICAgIGNvbnN0IG15T2JqOiBBamZMYXlvdXRXaWRnZXQgPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuXG4gICAgcmV0dXJuIDxBamZDb2x1bW5XaWRnZXRbXT5teU9iai5jb250ZW50O1xuICB9XG5cbiAgZ2V0SWNvbigpOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfXxudWxsIHtcbiAgICBjb25zdCBkZWZWYWwgPSB7Zm9udFNldDogJycsIGZvbnRJY29uOiAnJ307XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai5pY29uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKG15T2JqLmljb24uZm9ybXVsYSkgfHwgZGVmVmFsO1xuICB9XG5cbiAgZ2V0RmxhZygpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0gJ2NoJztcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmZsYWcgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmouZmxhZy5mb3JtdWxhKSB8fCBkZWZWYWw7XG4gIH1cblxuICBnZXRQZXJjZW50KGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IG15T2JqOiBBamZMYXlvdXRXaWRnZXQgPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGNvbnN0IHBlcmNlbnQgPSBteU9iai5jb2x1bW5zW2luZGV4XSAqIDEwMDtcblxuICAgIHJldHVybiBgJHtwZXJjZW50LnRvU3RyaW5nKCl9JWA7XG4gIH1cblxuICBnZXRJbWFnZVVybCgpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0gJyc7XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai51cmwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmoudXJsLmZvcm11bGEpIHx8IGRlZlZhbDtcbiAgfVxuXG4gIGdldEltYWdlVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy53aWRnZXQgIT0gbnVsbCA/ICg8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQpLmltYWdlVHlwZSA6IEFqZkltYWdlVHlwZS5JbWFnZTtcbiAgfVxuXG4gIGdldEh0bWxUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgbXlPYmo6IEFqZlRleHRXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICAgIGlmIChteU9iai5odG1sVGV4dCA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnLi4uJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmh0bWxUZXh0O1xuICAgIH1cbiAgfVxuXG4gIGdldENvb3JkaW5hdGUoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG15T2JqOiBBamZNYXBXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgaWYgKG15T2JqLmNvb3JkaW5hdGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCAxM107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5jb29yZGluYXRlIGFzIGFueTtcbiAgICB9XG4gIH1cblxuICBnZXRUaWxlTGF5ZXIoKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmTWFwV2lkZ2V0ID0gdGhpcy53aWRnZXQgYXMgQWpmTWFwV2lkZ2V0O1xuICAgIGlmIChteU9iai50aWxlTGF5ZXIgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai50aWxlTGF5ZXI7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXR0cmlidXRpb24oKTogc3RyaW5nIHtcbiAgICBsZXQgbXlPYmo6IEFqZk1hcFdpZGdldDtcbiAgICBteU9iaiA9IDxBamZNYXBXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmF0dHJpYnV0aW9uID09PSAnJykge1xuICAgICAgcmV0dXJuICcmY29weTsgPGEgaHJlZj1cXCdodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHRcXCc+TzwvYT4gY29udHJpYnV0b3JzJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmF0dHJpYnV0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvTGlzdChldmVudDogQ2RrRHJhZ0Ryb3A8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPiwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCk6IHZvaWQge1xuICAgIHRoaXMub25EcmFnRW5kSGFuZGxlcigpO1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkVG9Db2x1bW4oZXZlbnQsIHRvQ29sdW1uKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnZ2VkLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICB9KTtcblxuICAgIHRoaXMuZ2V0Q2hhcnRUeXBlID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgICAgICAgIHJldHVybiA8bnVtYmVyPihteU9iai5jaGFydFR5cGUpO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKDApKTtcblxuICAgIHRoaXMuZ2V0RGF0YXNldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ICE9IG51bGwgJiYgKHdpZGdldCBhcyBBamZDaGFydFdpZGdldCkuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLndpZGdldDtcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm15T2JqLmRhdGFzZXQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0VGFibGVUaXRsZXMgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG15T2JqID0gdGhpcy53aWRnZXQgYXMgQWpmVGFibGVXaWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHRhYmxlVGl0bGU6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG15T2JqLmRhdGFzZXRbaV1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGFibGVUaXRsZS5wdXNoKG15T2JqLmRhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFibGVUaXRsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICB0aGlzLmdldFRhYmxlQ29udGVudCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXlPYmogPSA8QWpmVGFibGVXaWRnZXQ+dGhpcy53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHRhYmxlQ29udGVudDogc3RyaW5nW11bXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlPYmouZGF0YXNldFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKChteU9iai5kYXRhc2V0W2ldICE9IG51bGwpICYmIChteU9iai5kYXRhc2V0W2ldW2ogKyAxXSAhPSBudWxsKSkge1xuICAgICAgICAgICAgICBpZiAodGFibGVDb250ZW50W2pdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnRbal0gPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGFibGVDb250ZW50W2pdW2ldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnRbal1baV0gPSAnICc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdLnNwbGljZShpLCAxLCBteU9iai5kYXRhc2V0W2ldW2ogKyAxXS5sYWJlbCB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWJsZUNvbnRlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmIChjaGFuZ2VzLndpZGdldCAmJiBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy53aWRnZXQgPSBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==