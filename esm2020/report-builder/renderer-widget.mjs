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
import { AjfWidgetType, } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "./widgets-row-buttons";
import * as i3 from "@ajf/material/image";
import * as i4 from "@ajf/core/text";
import * as i5 from "@ajf/core/map";
import * as i6 from "@angular/common";
import * as i7 from "@ajf/core/common";
import * as i8 from "@angular/cdk/drag-drop";
import * as i9 from "@ngneat/transloco";
export class AjfReportBuilderRendererWidget {
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
            return "&copy; <a href='http://osm.org/copyright'>O</a> contributors";
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
            return myObj.chartType;
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
                        if (myObj.dataset[i] != null && myObj.dataset[i][j + 1] != null) {
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
        const widget = changes['widget'];
        if (widget && widget.currentValue != null) {
            this.widget = widget.currentValue;
        }
    }
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderRendererWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderRendererWidget, deps: [{ token: i1.AjfReportBuilderService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderRendererWidget.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderRendererWidget, selector: "ajf-report-builder-renderer-widget", inputs: { widget: "widget", position: "position", section: "section" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-container\"\n    [ngSwitch]=\"widget?.widgetType\"\n    [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\">\n  <div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\"\n    [applyStyles]=\"widget.styles\">\n      <div class=\"ajf-columns\">\n        <ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\">\n          <div class=\"ajf-column\"\n            [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\"\n            [style.width]=getPercent(idx)\n            [applyStyles]=\"layoutWidget.content[idx].styles\">\n            <ajf-report-builder-widgets-row-buttons\n              [from]=\"'layout'\"\n              [fromWidget]=\"widget\"\n              [widget]=\"clm\"\n              [position]=\"idx\"\n              (onDragStart)=\"onDragStartHandler();\"\n              (onDragEnd)=\"onDragEndHandler();\"\n              [child]=\"true\">\n            </ajf-report-builder-widgets-row-buttons>\n            <!-- temporarily disabled for ivy partial build -->\n            <!-- <ajf-column\n              [column]=\"clm\"\n              [applyStyles]=\"widget.styles\">\n            </ajf-column> -->\n            <ng-template [ngIf]=\"onDragged === true\">\n              <div cdkDropList\n                [cdkDropListEnterPredicate]=\"canDropPredicate\"\n                [style.display]=\"onDragged ? 'block' : 'none'\"\n                (cdkDropListDropped)=\"addToList($event, clm)\"\n                class=\"ajf-column-drop-zone\"\n                (dragover)=\"layoutShow = true;\"\n                (dragleave)=\"layoutShow = false;\">\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n      </div>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\">\n    <ajf-image\n      [applyStyles]=\"widget.styles\"\n      [type]=\"getImageType()\"\n      [imageUrl]=\"getImageUrl()\"\n      [icon]=\"getIcon()\"\n      [flag]=\"getFlag()\">\n    </ajf-image>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\">\n    <ajf-text [htmlText]=\"getHtmlText() | transloco\"  [applyStyles]=\"widget.styles\"></ajf-text>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n  </div>\n  <!-- <div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-table *ngIf=\"getTableContent|async as tc\" [data]=\"tc!\" ></ajf-table>\n  </div> -->\n  <div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\">\n    </ajf-map>\n  </div>\n</div>\n", styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid blue;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red !important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0 !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted blue;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted blue}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-show,ajf-report-builder-renderer-widget .ajf-on-drag-over{border:33px dotted blue;opacity:1 !important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden !important;display:none !important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red !important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}\n"], components: [{ type: i2.AjfReportBuilderWidgetsRowButtons, selector: "ajf-report-builder-widgets-row-buttons", inputs: ["from", "fromWidget", "position", "widget", "child", "isOver"] }, { type: i3.AjfImage, selector: "ajf-image" }, { type: i4.AjfTextComponent, selector: "ajf-text", inputs: ["htmlText"] }, { type: i5.AjfMapComponent, selector: "ajf-map", inputs: ["coordinate", "tileLayer", "attribution", "disabled"] }], directives: [{ type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i7.ApplyStylesDirective, selector: "[applyStyles]", inputs: ["applyStyles"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }], pipes: { "transloco": i9.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderRendererWidget, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-renderer-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-container\"\n    [ngSwitch]=\"widget?.widgetType\"\n    [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\">\n  <div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\"\n    [applyStyles]=\"widget.styles\">\n      <div class=\"ajf-columns\">\n        <ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\">\n          <div class=\"ajf-column\"\n            [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\"\n            [style.width]=getPercent(idx)\n            [applyStyles]=\"layoutWidget.content[idx].styles\">\n            <ajf-report-builder-widgets-row-buttons\n              [from]=\"'layout'\"\n              [fromWidget]=\"widget\"\n              [widget]=\"clm\"\n              [position]=\"idx\"\n              (onDragStart)=\"onDragStartHandler();\"\n              (onDragEnd)=\"onDragEndHandler();\"\n              [child]=\"true\">\n            </ajf-report-builder-widgets-row-buttons>\n            <!-- temporarily disabled for ivy partial build -->\n            <!-- <ajf-column\n              [column]=\"clm\"\n              [applyStyles]=\"widget.styles\">\n            </ajf-column> -->\n            <ng-template [ngIf]=\"onDragged === true\">\n              <div cdkDropList\n                [cdkDropListEnterPredicate]=\"canDropPredicate\"\n                [style.display]=\"onDragged ? 'block' : 'none'\"\n                (cdkDropListDropped)=\"addToList($event, clm)\"\n                class=\"ajf-column-drop-zone\"\n                (dragover)=\"layoutShow = true;\"\n                (dragleave)=\"layoutShow = false;\">\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n      </div>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\">\n    <ajf-image\n      [applyStyles]=\"widget.styles\"\n      [type]=\"getImageType()\"\n      [imageUrl]=\"getImageUrl()\"\n      [icon]=\"getIcon()\"\n      [flag]=\"getFlag()\">\n    </ajf-image>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\">\n    <ajf-text [htmlText]=\"getHtmlText() | transloco\"  [applyStyles]=\"widget.styles\"></ajf-text>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n  </div>\n  <!-- <div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-table *ngIf=\"getTableContent|async as tc\" [data]=\"tc!\" ></ajf-table>\n  </div> -->\n  <div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\">\n    </ajf-map>\n  </div>\n</div>\n", styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid blue;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red !important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0 !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted blue;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted blue}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-show,ajf-report-builder-renderer-widget .ajf-on-drag-over{border:33px dotted blue;opacity:1 !important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden !important;display:none !important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red !important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }]; }, propDecorators: { widget: [{
                type: Input
            }], position: [{
                type: Input
            }], section: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXItd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlbmRlcmVyLXdpZGdldC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZW5kZXJlci13aWRnZXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQVVMLGFBQWEsR0FDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFLTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7QUFTakUsTUFBTSxPQUFPLDhCQUE4QjtJQW1DekMsWUFBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFwQnJELDJDQUEyQztRQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLHlCQUFvQixHQUFxQixJQUFJLENBQUM7UUFldEMsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUVELENBQUM7SUFsQ3pELElBQUksV0FBVztRQUNiLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFJRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUks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RDNDLDhxRkE2REE7bUdERGEsOEJBQThCO2tCQVAxQyxTQUFTOytCQUNFLG9DQUFvQyxpQkFHL0IsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4R0FPdEMsTUFBTTtzQkFBZCxLQUFLO2dCQU1HLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2ltYWdlJztcbmltcG9ydCB7ZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkNoYXJ0V2lkZ2V0LFxuICBBamZDb2x1bW5XaWRnZXQsXG4gIEFqZkRhdGFzZXQsXG4gIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsXG4gIEFqZk1hcFdpZGdldCxcbiAgQWpmVGFibGVXaWRnZXQsXG4gIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZSxcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItcmVuZGVyZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICdyZW5kZXJlci13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZW5kZXJlci13aWRnZXQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgZ2V0IHdpZGdldFR5cGVzKCkge1xuICAgIHJldHVybiBBamZXaWRnZXRUeXBlO1xuICB9XG5cbiAgQElucHV0KCkgd2lkZ2V0OiBBamZXaWRnZXQ7XG5cbiAgZ2V0IGxheW91dFdpZGdldCgpOiBBamZMYXlvdXRXaWRnZXQge1xuICAgIHJldHVybiB0aGlzLndpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gIH1cblxuICBASW5wdXQoKSBwb3NpdGlvbjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHNlY3Rpb246IHN0cmluZztcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG4gIGN1cnJlbnRDb250ZW50V2lkZ2V0OiBBamZXaWRnZXQgfCBudWxsID0gbnVsbDtcbiAgb2JqOiBhbnk7XG4gIGZpeGVkWm9vbTogYW55O1xuXG4gIGdldFRhYmxlVGl0bGVzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0VGFibGVDb250ZW50OiBPYnNlcnZhYmxlPHN0cmluZ1tdW10gfCB1bmRlZmluZWQ+O1xuXG4gIGdldENoYXJ0VHlwZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXREYXRhc2V0OiBPYnNlcnZhYmxlPEFqZkRhdGFzZXRbXVtdPjtcbiAgZ2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRDaGFydEJvcmRlckNvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0Q2hhcnRCb3JkZXJXaWR0aDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGxheW91dFNob3c6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uZGF0YS5kcm9wWm9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChbJ2hlYWRlcicsICd3aWRnZXQnXS5pbmRleE9mKGl0ZW0uZGF0YS5kcm9wWm9uZXNbaV0pID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgc3RhcnQgb2YgbW91c2UgZHJhZyB3aXRoIDIwMCBtcyBvZiBkZWxheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ1N0YXJ0SGFuZGxlcigpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuXG4gIGdldENvbHVtbkNvbnRlbnQoKTogQWpmQ29sdW1uV2lkZ2V0W10ge1xuICAgIGNvbnN0IG15T2JqOiBBamZMYXlvdXRXaWRnZXQgPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuXG4gICAgcmV0dXJuIDxBamZDb2x1bW5XaWRnZXRbXT5teU9iai5jb250ZW50O1xuICB9XG5cbiAgZ2V0SWNvbigpOiB7Zm9udFNldDogc3RyaW5nOyBmb250SWNvbjogc3RyaW5nfSB8IG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9IHtmb250U2V0OiAnJywgZm9udEljb246ICcnfTtcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmljb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmouaWNvbi5mb3JtdWxhKSB8fCBkZWZWYWw7XG4gIH1cblxuICBnZXRGbGFnKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9ICdjaCc7XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai5mbGFnID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKG15T2JqLmZsYWcuZm9ybXVsYSkgfHwgZGVmVmFsO1xuICB9XG5cbiAgZ2V0UGVyY2VudChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmTGF5b3V0V2lkZ2V0ID0gPEFqZkxheW91dFdpZGdldD50aGlzLndpZGdldDtcbiAgICBjb25zdCBwZXJjZW50ID0gbXlPYmouY29sdW1uc1tpbmRleF0gKiAxMDA7XG5cbiAgICByZXR1cm4gYCR7cGVyY2VudC50b1N0cmluZygpfSVgO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0gJyc7XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai51cmwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmoudXJsLmZvcm11bGEpIHx8IGRlZlZhbDtcbiAgfVxuXG4gIGdldEltYWdlVHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy53aWRnZXQgIT0gbnVsbCA/ICg8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQpLmltYWdlVHlwZSA6IEFqZkltYWdlVHlwZS5JbWFnZTtcbiAgfVxuXG4gIGdldEh0bWxUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgbXlPYmo6IEFqZlRleHRXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICAgIGlmIChteU9iai5odG1sVGV4dCA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnLi4uJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmh0bWxUZXh0O1xuICAgIH1cbiAgfVxuXG4gIGdldENvb3JkaW5hdGUoKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IG15T2JqOiBBamZNYXBXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgaWYgKG15T2JqLmNvb3JkaW5hdGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFs1MS41MDUsIC0wLjA5LCAxM107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5jb29yZGluYXRlIGFzIGFueTtcbiAgICB9XG4gIH1cblxuICBnZXRUaWxlTGF5ZXIoKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmTWFwV2lkZ2V0ID0gdGhpcy53aWRnZXQgYXMgQWpmTWFwV2lkZ2V0O1xuICAgIGlmIChteU9iai50aWxlTGF5ZXIgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai50aWxlTGF5ZXI7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXR0cmlidXRpb24oKTogc3RyaW5nIHtcbiAgICBsZXQgbXlPYmo6IEFqZk1hcFdpZGdldDtcbiAgICBteU9iaiA9IDxBamZNYXBXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmF0dHJpYnV0aW9uID09PSAnJykge1xuICAgICAgcmV0dXJuIFwiJmNvcHk7IDxhIGhyZWY9J2h0dHA6Ly9vc20ub3JnL2NvcHlyaWdodCc+TzwvYT4gY29udHJpYnV0b3JzXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5hdHRyaWJ1dGlvbjtcbiAgICB9XG4gIH1cblxuICBhZGRUb0xpc3QoZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4sIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQpOiB2b2lkIHtcbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZFRvQ29sdW1uKGV2ZW50LCB0b0NvbHVtbik7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdldENoYXJ0VHlwZSA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgICAgIHJldHVybiA8bnVtYmVyPm15T2JqLmNoYXJ0VHlwZTtcbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHN0YXJ0V2l0aCgwKSxcbiAgICApO1xuXG4gICAgdGhpcy5nZXREYXRhc2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAod2lkZ2V0ICE9IG51bGwgJiYgKHdpZGdldCBhcyBBamZDaGFydFdpZGdldCkuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgICAgICAgcmV0dXJuIDxhbnk+bXlPYmouZGF0YXNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5nZXRUYWJsZVRpdGxlcyA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbXlPYmogPSB0aGlzLndpZGdldCBhcyBBamZUYWJsZVdpZGdldDtcblxuICAgICAgICBpZiAobXlPYmouZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgICAgbGV0IHRhYmxlVGl0bGU6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChteU9iai5kYXRhc2V0W2ldWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgdGFibGVUaXRsZS5wdXNoKG15T2JqLmRhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGFibGVUaXRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmdldFRhYmxlQ29udGVudCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmVGFibGVXaWRnZXQ+dGhpcy53aWRnZXQ7XG5cbiAgICAgICAgaWYgKG15T2JqLmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICAgIGxldCB0YWJsZUNvbnRlbnQ6IHN0cmluZ1tdW10gPSBbXTtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBteU9iai5kYXRhc2V0W2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChteU9iai5kYXRhc2V0W2ldICE9IG51bGwgJiYgbXlPYmouZGF0YXNldFtpXVtqICsgMV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0YWJsZUNvbnRlbnRbal0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0YWJsZUNvbnRlbnRbal1baV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdW2ldID0gJyAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnRbal0uc3BsaWNlKGksIDEsIG15T2JqLmRhdGFzZXRbaV1baiArIDFdLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGFibGVDb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHdpZGdldCA9IGNoYW5nZXNbJ3dpZGdldCddO1xuICAgIGlmICh3aWRnZXQgJiYgd2lkZ2V0LmN1cnJlbnRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLndpZGdldCA9IHdpZGdldC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtY29udGFpbmVyXCJcbiAgICBbbmdTd2l0Y2hdPVwid2lkZ2V0Py53aWRnZXRUeXBlXCJcbiAgICBbbmdDbGFzc109XCJ7J2FqZi1kcmFnLW1vZGUnOiAob25EcmFnZ2VkIHx8IGZpeGVkWm9vbSl9XCI+XG4gIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIndpZGdldFR5cGVzLkxheW91dFwiIGNsYXNzPVwiYWpmLXJvdyBhamYtbGF5b3V0XCJcbiAgICBbYXBwbHlTdHlsZXNdPVwid2lkZ2V0LnN0eWxlc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1jb2x1bW5zXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2xtIFtuZ0Zvck9mXT1cImdldENvbHVtbkNvbnRlbnQoKVwiIGxldC1pZHg9XCJpbmRleFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtY29sdW1uXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnYWpmLWZpeGVkJzogbGF5b3V0V2lkZ2V0LmNvbHVtbnNbaWR4XSA9PSAtMX1cIlxuICAgICAgICAgICAgW3N0eWxlLndpZHRoXT1nZXRQZXJjZW50KGlkeClcbiAgICAgICAgICAgIFthcHBseVN0eWxlc109XCJsYXlvdXRXaWRnZXQuY29udGVudFtpZHhdLnN0eWxlc1wiPlxuICAgICAgICAgICAgPGFqZi1yZXBvcnQtYnVpbGRlci13aWRnZXRzLXJvdy1idXR0b25zXG4gICAgICAgICAgICAgIFtmcm9tXT1cIidsYXlvdXQnXCJcbiAgICAgICAgICAgICAgW2Zyb21XaWRnZXRdPVwid2lkZ2V0XCJcbiAgICAgICAgICAgICAgW3dpZGdldF09XCJjbG1cIlxuICAgICAgICAgICAgICBbcG9zaXRpb25dPVwiaWR4XCJcbiAgICAgICAgICAgICAgKG9uRHJhZ1N0YXJ0KT1cIm9uRHJhZ1N0YXJ0SGFuZGxlcigpO1wiXG4gICAgICAgICAgICAgIChvbkRyYWdFbmQpPVwib25EcmFnRW5kSGFuZGxlcigpO1wiXG4gICAgICAgICAgICAgIFtjaGlsZF09XCJ0cnVlXCI+XG4gICAgICAgICAgICA8L2FqZi1yZXBvcnQtYnVpbGRlci13aWRnZXRzLXJvdy1idXR0b25zPlxuICAgICAgICAgICAgPCEtLSB0ZW1wb3JhcmlseSBkaXNhYmxlZCBmb3IgaXZ5IHBhcnRpYWwgYnVpbGQgLS0+XG4gICAgICAgICAgICA8IS0tIDxhamYtY29sdW1uXG4gICAgICAgICAgICAgIFtjb2x1bW5dPVwiY2xtXCJcbiAgICAgICAgICAgICAgW2FwcGx5U3R5bGVzXT1cIndpZGdldC5zdHlsZXNcIj5cbiAgICAgICAgICAgIDwvYWpmLWNvbHVtbj4gLS0+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwib25EcmFnZ2VkID09PSB0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2RrRHJvcExpc3RcbiAgICAgICAgICAgICAgICBbY2RrRHJvcExpc3RFbnRlclByZWRpY2F0ZV09XCJjYW5Ecm9wUHJlZGljYXRlXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJvbkRyYWdnZWQgPyAnYmxvY2snIDogJ25vbmUnXCJcbiAgICAgICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cImFkZFRvTGlzdCgkZXZlbnQsIGNsbSlcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYWpmLWNvbHVtbi1kcm9wLXpvbmVcIlxuICAgICAgICAgICAgICAgIChkcmFnb3Zlcik9XCJsYXlvdXRTaG93ID0gdHJ1ZTtcIlxuICAgICAgICAgICAgICAgIChkcmFnbGVhdmUpPVwibGF5b3V0U2hvdyA9IGZhbHNlO1wiPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIndpZGdldFR5cGVzLkltYWdlXCIgY2xhc3M9XCJhamYtcm93XCI+XG4gICAgPGFqZi1pbWFnZVxuICAgICAgW2FwcGx5U3R5bGVzXT1cIndpZGdldC5zdHlsZXNcIlxuICAgICAgW3R5cGVdPVwiZ2V0SW1hZ2VUeXBlKClcIlxuICAgICAgW2ltYWdlVXJsXT1cImdldEltYWdlVXJsKClcIlxuICAgICAgW2ljb25dPVwiZ2V0SWNvbigpXCJcbiAgICAgIFtmbGFnXT1cImdldEZsYWcoKVwiPlxuICAgIDwvYWpmLWltYWdlPlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwid2lkZ2V0VHlwZXMuVGV4dFwiIGNsYXNzPVwiYWpmLXJvdyBhamYtdGV4dFwiPlxuICAgIDxhamYtdGV4dCBbaHRtbFRleHRdPVwiZ2V0SHRtbFRleHQoKSB8IHRyYW5zbG9jb1wiICBbYXBwbHlTdHlsZXNdPVwid2lkZ2V0LnN0eWxlc1wiPjwvYWpmLXRleHQ+XG4gIDwvZGl2PlxuICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ3aWRnZXRUeXBlcy5DaGFydFwiIGNsYXNzPVwiYWpmLXJvd1wiIFthcHBseVN0eWxlc109XCJ3aWRnZXQuc3R5bGVzXCI+XG4gIDwvZGl2PlxuICA8IS0tIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIndpZGdldFR5cGVzLlRhYmxlXCIgY2xhc3M9XCJhamYtcm93XCIgW2FwcGx5U3R5bGVzXT1cIndpZGdldC5zdHlsZXNcIj5cbiAgICA8YWpmLXRhYmxlICpuZ0lmPVwiZ2V0VGFibGVDb250ZW50fGFzeW5jIGFzIHRjXCIgW2RhdGFdPVwidGMhXCIgPjwvYWpmLXRhYmxlPlxuICA8L2Rpdj4gLS0+XG4gIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIndpZGdldFR5cGVzLk1hcFwiIGNsYXNzPVwiYWpmLXJvd1wiIFthcHBseVN0eWxlc109XCJ3aWRnZXQuc3R5bGVzXCI+XG4gICAgPGFqZi1tYXAgW2Nvb3JkaW5hdGVdPVwiZ2V0Q29vcmRpbmF0ZSgpXCIgW3RpbGVMYXllcl09XCJnZXRUaWxlTGF5ZXIoKVwiIFthdHRyaWJ1dGlvbl09XCJnZXRBdHRyaWJ1dGlvbigpXCI+XG4gICAgPC9hamYtbWFwPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19