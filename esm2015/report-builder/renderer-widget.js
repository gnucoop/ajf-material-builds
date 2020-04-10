/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/renderer-widget.ts
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
import { AjfImageType } from '@ajf/core/image';
import { evaluateExpression } from '@ajf/core/models';
import { AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { AjfReportBuilderService } from './report-builder-service';
export class AjfReportBuilderRendererWidget {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this.currentContentWidget = null;
        this._onDraggedSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get widgetTypes() {
        return AjfWidgetType;
    }
    /**
     * @return {?}
     */
    get layoutWidget() {
        return (/** @type {?} */ (this.widget));
    }
    /**
     * @param {?} item
     * @return {?}
     */
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
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200).subscribe((/**
         * @return {?}
         */
        () => {
            s.unsubscribe();
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     * @return {?}
     */
    getColumnContent() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        return (/** @type {?} */ (myObj.content));
    }
    /**
     * @return {?}
     */
    getIcon() {
        /** @type {?} */
        const defVal = { fontSet: '', fontIcon: '' };
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.icon == null) {
            return null;
        }
        return evaluateExpression(myObj.icon.formula) || defVal;
    }
    /**
     * @return {?}
     */
    getFlag() {
        /** @type {?} */
        const defVal = 'ch';
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.flag == null) {
            return null;
        }
        return evaluateExpression(myObj.flag.formula) || defVal;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getPercent(index) {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        /** @type {?} */
        const percent = myObj.columns[index] * 100;
        return `${percent.toString()}%`;
    }
    /**
     * @return {?}
     */
    getImageUrl() {
        /** @type {?} */
        const defVal = '';
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.url == null) {
            return null;
        }
        return evaluateExpression(myObj.url.formula) || defVal;
    }
    /**
     * @return {?}
     */
    getImageType() {
        return this.widget != null ? ((/** @type {?} */ (this.widget))).imageType : AjfImageType.Image;
    }
    /**
     * @return {?}
     */
    getHtmlText() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.htmlText === '') {
            return '...';
        }
        else {
            return myObj.htmlText;
        }
    }
    /**
     * @return {?}
     */
    getCoordinate() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.coordinate == null) {
            return [51.505, -0.09, 13];
        }
        else {
            return (/** @type {?} */ (myObj.coordinate));
        }
    }
    /**
     * @return {?}
     */
    getTileLayer() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.tileLayer === '') {
            return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        }
        else {
            return myObj.tileLayer;
        }
    }
    /**
     * @return {?}
     */
    getAttribution() {
        /** @type {?} */
        let myObj;
        myObj = (/** @type {?} */ (this.widget));
        if (myObj.attribution === '') {
            return '&copy; <a href=\'http://osm.org/copyright\'>O</a> contributors';
        }
        else {
            return myObj.attribution;
        }
    }
    /**
     * @param {?} event
     * @param {?} toColumn
     * @return {?}
     */
    addToList(event, toColumn) {
        this.onDragEndHandler();
        this._service.addToColumn(event, toColumn);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._onDraggedSub = this._service.onDragged.subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this.getChartType = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return 0;
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            return (/** @type {?} */ ((myObj.chartType)));
        })), distinctUntilChanged(), startWith(0));
        this.getDataset = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget != null && ((/** @type {?} */ (widget))).dataset != null) {
                /** @type {?} */
                const myObj = (/** @type {?} */ (this.widget));
                return (/** @type {?} */ (myObj.dataset));
            }
            else {
                return [];
            }
        })), distinctUntilChanged());
        this.getTableTitles = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return [];
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            if (myObj.dataset != null) {
                /** @type {?} */
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
        })));
        this.getTableContent = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return [];
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            if (myObj.dataset != null) {
                /** @type {?} */
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
        })));
        this._service.updateCurrentWidget(this.widget);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.widget && changes.widget.currentValue != null) {
            this.widget = changes.widget.currentValue;
        }
    }
    /**
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.widget;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.position;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.section;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.onDragged;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.currentContentWidget;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.obj;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.fixedZoom;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getTableTitles;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getTableContent;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartType;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getDataset;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartBackgroundColor;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartBorderColor;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartBorderWidth;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.layoutShow;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderRendererWidget.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderRendererWidget.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXItd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlbmRlcmVyLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQVVMLGFBQWEsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFJTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckQsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUdwRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVNqRSxNQUFNLE9BQU8sOEJBQThCOzs7O0lBbUN6QyxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5Qjs7UUFuQnJELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIseUJBQW9CLEdBQW1CLElBQUksQ0FBQztRQWVwQyxrQkFBYSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBRUQsQ0FBQzs7OztJQWxDekQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7OztJQUlELElBQUksWUFBWTtRQUNkLE9BQU8sbUJBQUEsSUFBSSxDQUFDLE1BQU0sRUFBbUIsQ0FBQztJQUN4QyxDQUFDOzs7OztJQTRCRCxnQkFBZ0IsQ0FBQyxJQUF1QztRQUN0RCxLQUFLLElBQUksQ0FB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Q25DLENBQUM7OztZQXRQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsOG1GQUFtQztnQkFFbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQVJPLHVCQUF1Qjs7O3FCQWM1QixLQUFLO3VCQU1MLEtBQUs7c0JBRUwsS0FBSzs7OztJQVJOLGdEQUEyQjs7SUFNM0Isa0RBQTBCOztJQUUxQixpREFBeUI7O0lBR3pCLG1EQUFrQjs7SUFFbEIsOERBQTRDOztJQUM1Qyw2Q0FBUzs7SUFDVCxtREFBZTs7SUFFZix3REFBcUM7O0lBQ3JDLHlEQUFrRDs7SUFFbEQsc0RBQWlDOztJQUNqQyxvREFBdUM7O0lBQ3ZDLGlFQUE4Qzs7SUFDOUMsNkRBQTBDOztJQUMxQyw2REFBd0M7O0lBRXhDLG9EQUFvQjs7Ozs7SUFFcEIsdURBQXlEOzs7OztJQUU3QyxrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuaW1wb3J0IHtldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ2hhcnRXaWRnZXQsXG4gIEFqZkNvbHVtbldpZGdldCxcbiAgQWpmRGF0YXNldCxcbiAgQWpmSW1hZ2VXaWRnZXQsXG4gIEFqZkxheW91dFdpZGdldCxcbiAgQWpmTWFwV2lkZ2V0LFxuICBBamZUYWJsZVdpZGdldCxcbiAgQWpmVGV4dFdpZGdldCxcbiAgQWpmV2lkZ2V0LFxuICBBamZXaWRnZXRUeXBlXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3RhcnRXaXRofSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItcmVuZGVyZXItd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICdyZW5kZXJlci13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZW5kZXJlci13aWRnZXQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJSZW5kZXJlcldpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBnZXQgd2lkZ2V0VHlwZXMoKSB7XG4gICAgcmV0dXJuIEFqZldpZGdldFR5cGU7XG4gIH1cblxuICBASW5wdXQoKSB3aWRnZXQ6IEFqZldpZGdldDtcblxuICBnZXQgbGF5b3V0V2lkZ2V0KCk6IEFqZkxheW91dFdpZGdldCB7XG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcbiAgfVxuXG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBudW1iZXI7XG5cbiAgQElucHV0KCkgc2VjdGlvbjogc3RyaW5nO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cbiAgY3VycmVudENvbnRlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgb2JqOiBhbnk7XG4gIGZpeGVkWm9vbTogYW55O1xuXG4gIGdldFRhYmxlVGl0bGVzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0VGFibGVDb250ZW50OiBPYnNlcnZhYmxlPHN0cmluZ1tdW118dW5kZWZpbmVkPjtcblxuICBnZXRDaGFydFR5cGU6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0RGF0YXNldDogT2JzZXJ2YWJsZTxBamZEYXRhc2V0W11bXT47XG4gIGdldENoYXJ0QmFja2dyb3VuZENvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0Q2hhcnRCb3JkZXJDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldENoYXJ0Qm9yZGVyV2lkdGg6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBsYXlvdXRTaG93OiBib29sZWFuO1xuXG4gIHByaXZhdGUgX29uRHJhZ2dlZFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7fVxuXG4gIGNhbkRyb3BQcmVkaWNhdGUoaXRlbTogQ2RrRHJhZzxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+KTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmRhdGEuZHJvcFpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoWydoZWFkZXInLCAnd2lkZ2V0J10uaW5kZXhPZihpdGVtLmRhdGEuZHJvcFpvbmVzW2ldKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmRyYWdTdGFydGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgZW5kIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbmRIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VuZGVkKCk7XG4gIH1cblxuICBnZXRDb2x1bW5Db250ZW50KCk6IEFqZkNvbHVtbldpZGdldFtdIHtcbiAgICBjb25zdCBteU9iajogQWpmTGF5b3V0V2lkZ2V0ID0gPEFqZkxheW91dFdpZGdldD50aGlzLndpZGdldDtcblxuICAgIHJldHVybiA8QWpmQ29sdW1uV2lkZ2V0W10+bXlPYmouY29udGVudDtcbiAgfVxuXG4gIGdldEljb24oKToge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ318bnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0ge2ZvbnRTZXQ6ICcnLCBmb250SWNvbjogJyd9O1xuICAgIGNvbnN0IG15T2JqOiBBamZJbWFnZVdpZGdldCA9IDxBamZJbWFnZVdpZGdldD50aGlzLndpZGdldDtcbiAgICBpZiAobXlPYmouaWNvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihteU9iai5pY29uLmZvcm11bGEpIHx8IGRlZlZhbDtcbiAgfVxuXG4gIGdldEZsYWcoKTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9ICdjaCc7XG4gICAgY29uc3QgbXlPYmo6IEFqZkltYWdlV2lkZ2V0ID0gPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai5mbGFnID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKG15T2JqLmZsYWcuZm9ybXVsYSkgfHwgZGVmVmFsO1xuICB9XG5cbiAgZ2V0UGVyY2VudChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmTGF5b3V0V2lkZ2V0ID0gPEFqZkxheW91dFdpZGdldD50aGlzLndpZGdldDtcbiAgICBjb25zdCBwZXJjZW50ID0gbXlPYmouY29sdW1uc1tpbmRleF0gKiAxMDA7XG5cbiAgICByZXR1cm4gYCR7cGVyY2VudC50b1N0cmluZygpfSVgO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcmwoKTogc3RyaW5nfG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9ICcnO1xuICAgIGNvbnN0IG15T2JqOiBBamZJbWFnZVdpZGdldCA9IDxBamZJbWFnZVdpZGdldD50aGlzLndpZGdldDtcbiAgICBpZiAobXlPYmoudXJsID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZXZhbHVhdGVFeHByZXNzaW9uKG15T2JqLnVybC5mb3JtdWxhKSB8fCBkZWZWYWw7XG4gIH1cblxuICBnZXRJbWFnZVR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0ICE9IG51bGwgPyAoPEFqZkltYWdlV2lkZ2V0PnRoaXMud2lkZ2V0KS5pbWFnZVR5cGUgOiBBamZJbWFnZVR5cGUuSW1hZ2U7XG4gIH1cblxuICBnZXRIdG1sVGV4dCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IG15T2JqOiBBamZUZXh0V2lkZ2V0ID0gdGhpcy53aWRnZXQgYXMgQWpmVGV4dFdpZGdldDtcbiAgICBpZiAobXlPYmouaHRtbFRleHQgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJy4uLic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5odG1sVGV4dDtcbiAgICB9XG4gIH1cblxuICBnZXRDb29yZGluYXRlKCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBteU9iajogQWpmTWFwV2lkZ2V0ID0gdGhpcy53aWRnZXQgYXMgQWpmTWFwV2lkZ2V0O1xuICAgIGlmIChteU9iai5jb29yZGluYXRlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbNTEuNTA1LCAtMC4wOSwgMTNdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbXlPYmouY29vcmRpbmF0ZSBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGlsZUxheWVyKCk6IHN0cmluZyB7XG4gICAgY29uc3QgbXlPYmo6IEFqZk1hcFdpZGdldCA9IHRoaXMud2lkZ2V0IGFzIEFqZk1hcFdpZGdldDtcbiAgICBpZiAobXlPYmoudGlsZUxheWVyID09PSAnJykge1xuICAgICAgcmV0dXJuICdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbXlPYmoudGlsZUxheWVyO1xuICAgIH1cbiAgfVxuXG4gIGdldEF0dHJpYnV0aW9uKCk6IHN0cmluZyB7XG4gICAgbGV0IG15T2JqOiBBamZNYXBXaWRnZXQ7XG4gICAgbXlPYmogPSA8QWpmTWFwV2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGlmIChteU9iai5hdHRyaWJ1dGlvbiA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnJmNvcHk7IDxhIGhyZWY9XFwnaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XFwnPk88L2E+IGNvbnRyaWJ1dG9ycyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBteU9iai5hdHRyaWJ1dGlvbjtcbiAgICB9XG4gIH1cblxuICBhZGRUb0xpc3QoZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4sIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQpOiB2b2lkIHtcbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZFRvQ29sdW1uKGV2ZW50LCB0b0NvbHVtbik7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgfSk7XG5cbiAgICB0aGlzLmdldENoYXJ0VHlwZSA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLndpZGdldDtcbiAgICAgICAgICByZXR1cm4gPG51bWJlcj4obXlPYmouY2hhcnRUeXBlKTtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aCgwKSk7XG5cbiAgICB0aGlzLmdldERhdGFzZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmICh3aWRnZXQgYXMgQWpmQ2hhcnRXaWRnZXQpLmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgICAgICAgICByZXR1cm4gPGFueT5teU9iai5kYXRhc2V0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldFRhYmxlVGl0bGVzID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUobWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBteU9iaiA9IHRoaXMud2lkZ2V0IGFzIEFqZlRhYmxlV2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCB0YWJsZVRpdGxlOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChteU9iai5kYXRhc2V0W2ldWzBdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRhYmxlVGl0bGUucHVzaChteU9iai5kYXRhc2V0W2ldWzBdLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhYmxlVGl0bGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgdGhpcy5nZXRUYWJsZUNvbnRlbnQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG15T2JqID0gPEFqZlRhYmxlV2lkZ2V0PnRoaXMud2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCB0YWJsZUNvbnRlbnQ6IHN0cmluZ1tdW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmRhdGFzZXRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmICgobXlPYmouZGF0YXNldFtpXSAhPSBudWxsKSAmJiAobXlPYmouZGF0YXNldFtpXVtqICsgMV0gIT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgaWYgKHRhYmxlQ29udGVudFtqXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRhYmxlQ29udGVudFtqXVtpXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdW2ldID0gJyAnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRhYmxlQ29udGVudFtqXS5zcGxpY2UoaSwgMSwgbXlPYmouZGF0YXNldFtpXVtqICsgMV0ubGFiZWwgfHwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFibGVDb250ZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH0pKTtcblxuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLndpZGdldCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICBpZiAoY2hhbmdlcy53aWRnZXQgJiYgY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlICE9IG51bGwpIHtcbiAgICAgIHRoaXMud2lkZ2V0ID0gY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=