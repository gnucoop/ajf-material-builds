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
var AjfReportBuilderRendererWidget = /** @class */ (function () {
    function AjfReportBuilderRendererWidget(_service) {
        this._service = _service;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this.currentContentWidget = null;
        this._onDraggedSub = Subscription.EMPTY;
    }
    Object.defineProperty(AjfReportBuilderRendererWidget.prototype, "widgetTypes", {
        get: function () {
            return AjfWidgetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderRendererWidget.prototype, "layoutWidget", {
        get: function () {
            return this.widget;
        },
        enumerable: true,
        configurable: true
    });
    AjfReportBuilderRendererWidget.prototype.canDropPredicate = function (item) {
        for (var i = 0; i < item.data.dropZones.length; i++) {
            if (['header', 'widget'].indexOf(item.data.dropZones[i]) > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderRendererWidget.prototype.onDragStartHandler = function () {
        var _this = this;
        var s = timer(200)
            .subscribe(function () {
            s.unsubscribe();
            _this._service.dragStarted();
        });
    };
    /**
     * sign the end of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderRendererWidget.prototype.onDragEndHandler = function () {
        this._service.dragEnded();
    };
    AjfReportBuilderRendererWidget.prototype.getColumnContent = function () {
        var myObj = this.widget;
        return myObj.content;
    };
    AjfReportBuilderRendererWidget.prototype.getIcon = function () {
        var defVal = { fontSet: '', fontIcon: '' };
        var myObj = this.widget;
        if (myObj.icon == null) {
            return null;
        }
        return evaluateExpression(myObj.icon.formula) || defVal;
    };
    AjfReportBuilderRendererWidget.prototype.getFlag = function () {
        var defVal = 'ch';
        var myObj = this.widget;
        if (myObj.flag == null) {
            return null;
        }
        return evaluateExpression(myObj.flag.formula) || defVal;
    };
    AjfReportBuilderRendererWidget.prototype.getPercent = function (index) {
        var myObj = this.widget;
        var percent = myObj.columns[index] * 100;
        return percent.toString() + "%";
    };
    AjfReportBuilderRendererWidget.prototype.getImageUrl = function () {
        var defVal = '';
        var myObj = this.widget;
        if (myObj.url == null) {
            return null;
        }
        return evaluateExpression(myObj.url.formula) || defVal;
    };
    AjfReportBuilderRendererWidget.prototype.getImageType = function () {
        return this.widget != null ? this.widget.imageType : AjfImageType.Image;
    };
    AjfReportBuilderRendererWidget.prototype.getHtmlText = function () {
        var myObj = this.widget;
        if (myObj.htmlText === '') {
            return '...';
        }
        else {
            return myObj.htmlText;
        }
    };
    AjfReportBuilderRendererWidget.prototype.getCoordinate = function () {
        var myObj = this.widget;
        if (myObj.coordinate == null) {
            return [51.505, -0.09, 13];
        }
        else {
            return myObj.coordinate;
        }
    };
    AjfReportBuilderRendererWidget.prototype.getTileLayer = function () {
        var myObj = this.widget;
        if (myObj.tileLayer === '') {
            return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        }
        else {
            return myObj.tileLayer;
        }
    };
    AjfReportBuilderRendererWidget.prototype.getAttribution = function () {
        var myObj;
        myObj = this.widget;
        if (myObj.attribution === '') {
            return "&copy; <a href='http://osm.org/copyright'>O</a> contributors";
        }
        else {
            return myObj.attribution;
        }
    };
    AjfReportBuilderRendererWidget.prototype.addToList = function (event, toColumn) {
        this.onDragEndHandler();
        this._service.addToColumn(event, toColumn);
    };
    AjfReportBuilderRendererWidget.prototype.ngOnInit = function () {
        var _this = this;
        this._onDraggedSub = this._service.onDragged
            .subscribe(function (x) {
            _this.onDragged = x;
        });
        this.getChartType = this._service.currentWidget.pipe(map(function (widget) {
            if (widget == null) {
                return 0;
            }
            var myObj = _this.widget;
            return (myObj.chartType);
        }), distinctUntilChanged(), startWith(0));
        this.getDataset = this._service.currentWidget.pipe(map(function (widget) {
            if (widget != null && widget.dataset != null) {
                var myObj = _this.widget;
                return myObj.dataset;
            }
            else {
                return [];
            }
        }), distinctUntilChanged());
        this.getTableTitles = this._service.currentWidget.pipe(map(function (widget) {
            if (widget == null) {
                return [];
            }
            var myObj = _this.widget;
            if (myObj.dataset != null) {
                var tableTitle = [];
                for (var i = 0; i < myObj.dataset.length; i++) {
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
        this.getTableContent = this._service.currentWidget.pipe(map(function (widget) {
            if (widget == null) {
                return [];
            }
            var myObj = _this.widget;
            if (myObj.dataset != null) {
                var tableContent = [];
                for (var i = 0; i < myObj.dataset.length; i++) {
                    for (var j = 0; j < myObj.dataset[i].length; j++) {
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
    };
    AjfReportBuilderRendererWidget.prototype.ngOnChanges = function (changes) {
        if (changes.widget && changes.widget.currentValue != null) {
            this.widget = changes.widget.currentValue;
        }
    };
    AjfReportBuilderRendererWidget.prototype.ngOnDestroy = function () {
        this._onDraggedSub.unsubscribe();
    };
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
    AjfReportBuilderRendererWidget.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    AjfReportBuilderRendererWidget.propDecorators = {
        widget: [{ type: Input }],
        position: [{ type: Input }],
        section: [{ type: Input }]
    };
    return AjfReportBuilderRendererWidget;
}());
export { AjfReportBuilderRendererWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXItd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlbmRlcmVyLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUVxQyxhQUFhLEVBQ3hELE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUNMLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdDLGlCQUFpQixFQUMzRixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3BFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFO0lBNENFLHdDQUNVLFFBQWlDO1FBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBckIzQywyQ0FBMkM7UUFDM0MsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQix5QkFBb0IsR0FBbUIsSUFBSSxDQUFDO1FBZXBDLGtCQUFhLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFJckQsQ0FBQztJQXRDTCxzQkFBSSx1REFBVzthQUFmO1lBQ0UsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFJRCxzQkFBSSx3REFBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQXlCLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFnQ0QseURBQWdCLEdBQWhCLFVBQWlCLElBQXVDO1FBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDN0QsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDJEQUFrQixHQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNmLFNBQVMsQ0FBQztZQUNULENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQixLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx5REFBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx5REFBZ0IsR0FBaEI7UUFDRSxJQUFNLEtBQUssR0FBcUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUU1RCxPQUEwQixLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFFRCxnREFBTyxHQUFQO1FBQ0UsSUFBTSxNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUMzQyxJQUFNLEtBQUssR0FBbUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxRCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7U0FBRTtRQUN4QyxPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDO0lBQzFELENBQUM7SUFFRCxnREFBTyxHQUFQO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQU0sS0FBSyxHQUFtQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFELElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBQztTQUFFO1FBQ3hDLE9BQU8sa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUM7SUFDMUQsQ0FBQztJQUVELG1EQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3RCLElBQU0sS0FBSyxHQUFxQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRTNDLE9BQVUsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFHLENBQUM7SUFDbEMsQ0FBQztJQUVELG9EQUFXLEdBQVg7UUFDRSxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBTSxLQUFLLEdBQW1DLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFDdkMsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQztJQUN6RCxDQUFDO0lBRUQscURBQVksR0FBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFrQixJQUFJLENBQUMsTUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUM1RixDQUFDO0lBRUQsb0RBQVcsR0FBWDtRQUNFLElBQU0sS0FBSyxHQUFrQixJQUFJLENBQUMsTUFBdUIsQ0FBQztRQUMxRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxzREFBYSxHQUFiO1FBQ0UsSUFBTSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFzQixDQUFDO1FBQ3hELElBQUksS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDNUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM1QjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsVUFBaUIsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxxREFBWSxHQUFaO1FBQ0UsSUFBTSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFzQixDQUFDO1FBQ3hELElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUU7WUFDMUIsT0FBTyx5Q0FBeUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELHVEQUFjLEdBQWQ7UUFDRSxJQUFJLEtBQW1CLENBQUM7UUFDeEIsS0FBSyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQUU7WUFDNUIsT0FBTyw4REFBOEQsQ0FBQztTQUN2RTthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVELGtEQUFTLEdBQVQsVUFBVSxLQUE0QyxFQUFFLFFBQXlCO1FBQy9FLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsaURBQVEsR0FBUjtRQUFBLGlCQTZFQztRQTVFQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzthQUN6QyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ1YsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDaEQsR0FBRyxDQUFDLFVBQUMsTUFBc0I7WUFDekIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNsQixPQUFPLENBQUMsQ0FBQzthQUNWO1lBQ0QsSUFBTSxLQUFLLEdBQW1CLEtBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUMsT0FBZSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsRUFDRixvQkFBb0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUM5QyxHQUFHLENBQUMsVUFBQyxNQUFzQjtZQUN6QixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUssTUFBeUIsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO2dCQUNoRSxJQUFNLEtBQUssR0FBbUIsS0FBSSxDQUFDLE1BQU0sQ0FBQztnQkFDMUMsT0FBWSxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsRUFDRixvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBc0I7WUFDaEYsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNsQixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBRUQsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQXdCLENBQUM7WUFFNUMsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDekIsSUFBSSxVQUFVLEdBQWEsRUFBRSxDQUFDO2dCQUU5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzdDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7d0JBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQ2xEO2lCQUNGO2dCQUNELE9BQU8sVUFBVSxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBc0I7WUFDakYsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNsQixPQUFPLEVBQUUsQ0FBQzthQUNYO1lBRUQsSUFBTSxLQUFLLEdBQW1CLEtBQUksQ0FBQyxNQUFNLENBQUM7WUFFMUMsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDekIsSUFBSSxZQUFZLEdBQWUsRUFBRSxDQUFDO2dCQUVsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTs0QkFDbkUsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO2dDQUMzQixZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDOzZCQUN0Qjs0QkFDRCxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0NBQzlCLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7NkJBQzFCOzRCQUNELFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7eUJBQ25FO3FCQUNGO2lCQUNGO2dCQUNELE9BQU8sWUFBWSxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELG9EQUFXLEdBQVgsVUFBWSxPQUFZO1FBQ3RCLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxvREFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztnQkF0UEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLDhtRkFBbUM7b0JBRW5DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQVJPLHVCQUF1Qjs7O3lCQWM1QixLQUFLOzJCQU1MLEtBQUs7MEJBR0wsS0FBSzs7SUFrT1IscUNBQUM7Q0FBQSxBQXZQRCxJQXVQQztTQWhQWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuaW1wb3J0IHtldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ2hhcnRXaWRnZXQsIEFqZkNvbHVtbldpZGdldCwgQWpmRGF0YXNldCwgQWpmSW1hZ2VXaWRnZXQsIEFqZkxheW91dFdpZGdldCwgQWpmTWFwV2lkZ2V0LFxuICBBamZUYWJsZVdpZGdldCwgQWpmVGV4dFdpZGdldCwgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItcmVuZGVyZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICdyZW5kZXJlci13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZW5kZXJlci13aWRnZXQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJSZW5kZXJlcldpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBnZXQgd2lkZ2V0VHlwZXMoKSB7XG4gICAgcmV0dXJuIEFqZldpZGdldFR5cGU7XG4gIH1cblxuICBASW5wdXQoKSB3aWRnZXQ6IEFqZldpZGdldDtcblxuICBnZXQgbGF5b3V0V2lkZ2V0KCk6IEFqZkxheW91dFdpZGdldCB7XG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgc2VjdGlvbjogc3RyaW5nO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cbiAgY3VycmVudENvbnRlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgb2JqOiBhbnk7XG4gIGZpeGVkWm9vbTogYW55O1xuXG4gIGdldFRhYmxlVGl0bGVzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0VGFibGVDb250ZW50OiBPYnNlcnZhYmxlPHN0cmluZ1tdW10gfCB1bmRlZmluZWQ+O1xuXG4gIGdldENoYXJ0VHlwZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXREYXRhc2V0OiBPYnNlcnZhYmxlPEFqZkRhdGFzZXRbXVtdPjtcbiAgZ2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRDaGFydEJvcmRlckNvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0Q2hhcnRCb3JkZXJXaWR0aDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGxheW91dFNob3c6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgKSB7IH1cblxuICBjYW5Ecm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPik6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGl0ZW0uZGF0YS5kcm9wWm9uZXMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICBpZiAoWydoZWFkZXInLCAnd2lkZ2V0J10uaW5kZXhPZihpdGVtLmRhdGEuZHJvcFpvbmVzW2ldKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLmRyYWdTdGFydGVkKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuXG4gIGdldENvbHVtbkNvbnRlbnQoKTogQWpmQ29sdW1uV2lkZ2V0W10ge1xuICAgIGNvbnN0IG15T2JqOiBBamZMYXlvdXRXaWRnZXQgPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuXG4gICAgcmV0dXJuIDxBamZDb2x1bW5XaWRnZXRbXT5teU9iai5jb250ZW50O1xuICB9XG5cbiAgZ2V0SWNvbigpOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSB8IG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9IHtmb250U2V0OiAnJywgZm9udEljb246ICcnfTtcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmljb24gPT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmouaWNvbi5mb3JtdWxhKSB8fCBkZWZWYWw7XG4gIH1cblxuICBnZXRGbGFnKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9ICdjaCc7XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai5mbGFnID09IG51bGwpIHsgcmV0dXJuIG51bGw7IH1cbiAgICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKG15T2JqLmZsYWcuZm9ybXVsYSkgfHwgZGVmVmFsO1xuICB9XG5cbiAgZ2V0UGVyY2VudChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmTGF5b3V0V2lkZ2V0ID0gPEFqZkxheW91dFdpZGdldD50aGlzLndpZGdldDtcbiAgICBjb25zdCBwZXJjZW50ID0gbXlPYmouY29sdW1uc1tpbmRleF0gKiAxMDA7XG5cbiAgICByZXR1cm4gYCR7cGVyY2VudC50b1N0cmluZygpfSVgO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0gJyc7XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai51cmwgPT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmoudXJsLmZvcm11bGEpIHx8IGRlZlZhbDtcbiAgfVxuXG4gIGdldEltYWdlVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy53aWRnZXQgIT0gbnVsbCA/ICg8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQpLmltYWdlVHlwZSA6IEFqZkltYWdlVHlwZS5JbWFnZTtcbiAgfVxuXG4gIGdldEh0bWxUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgbXlPYmo6IEFqZlRleHRXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICAgIGlmIChteU9iai5odG1sVGV4dCA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnLi4uJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmh0bWxUZXh0O1xuICAgIH1cbiAgfVxuXG4gIGdldENvb3JkaW5hdGUoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG15T2JqOiBBamZNYXBXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgaWYgKG15T2JqLmNvb3JkaW5hdGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCAxM107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5jb29yZGluYXRlIGFzIGFueTtcbiAgICB9XG4gIH1cblxuICBnZXRUaWxlTGF5ZXIoKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmTWFwV2lkZ2V0ID0gdGhpcy53aWRnZXQgYXMgQWpmTWFwV2lkZ2V0O1xuICAgIGlmIChteU9iai50aWxlTGF5ZXIgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai50aWxlTGF5ZXI7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXR0cmlidXRpb24oKTogc3RyaW5nIHtcbiAgICBsZXQgbXlPYmo6IEFqZk1hcFdpZGdldDtcbiAgICBteU9iaiA9IDxBamZNYXBXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmF0dHJpYnV0aW9uID09PSAnJykge1xuICAgICAgcmV0dXJuIFwiJmNvcHk7IDxhIGhyZWY9J2h0dHA6Ly9vc20ub3JnL2NvcHlyaWdodCc+TzwvYT4gY29udHJpYnV0b3JzXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5hdHRyaWJ1dGlvbjtcbiAgICB9XG4gIH1cblxuICBhZGRUb0xpc3QoZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4sIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQpOiB2b2lkIHtcbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZFRvQ29sdW1uKGV2ZW50LCB0b0NvbHVtbik7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZFxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmdldENoYXJ0VHlwZSA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLndpZGdldDtcbiAgICAgICAgICByZXR1cm4gPG51bWJlcj4obXlPYmouY2hhcnRUeXBlKTtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aCgwKSk7XG5cbiAgICB0aGlzLmdldERhdGFzZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmICh3aWRnZXQgYXMgQWpmQ2hhcnRXaWRnZXQpLmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgICAgICAgICByZXR1cm4gPGFueT5teU9iai5kYXRhc2V0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldFRhYmxlVGl0bGVzID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUobWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBteU9iaiA9IHRoaXMud2lkZ2V0IGFzIEFqZlRhYmxlV2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCB0YWJsZVRpdGxlOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChteU9iai5kYXRhc2V0W2ldWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRhYmxlVGl0bGUucHVzaChteU9iai5kYXRhc2V0W2ldWzBdLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhYmxlVGl0bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgdGhpcy5nZXRUYWJsZUNvbnRlbnQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG15T2JqID0gPEFqZlRhYmxlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCB0YWJsZUNvbnRlbnQ6IHN0cmluZ1tdW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmRhdGFzZXRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmICgobXlPYmouZGF0YXNldFtpXSAhPSBudWxsKSAmJiAobXlPYmouZGF0YXNldFtpXVtqICsgMV0gIT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgaWYgKHRhYmxlQ29udGVudFtqXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRhYmxlQ29udGVudFtqXVtpXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdW2ldID0gJyAnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhYmxlQ29udGVudFtqXS5zcGxpY2UoaSwgMSwgbXlPYmouZGF0YXNldFtpXVtqICsgMV0ubGFiZWwgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFibGVDb250ZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH0pKTtcblxuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLndpZGdldCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICBpZiAoY2hhbmdlcy53aWRnZXQgJiYgY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMud2lkZ2V0ID0gY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=