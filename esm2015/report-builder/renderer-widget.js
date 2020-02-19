/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/renderer-widget.ts
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
        let s = timer(200)
            .subscribe((/**
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
            return "&copy; <a href='http://osm.org/copyright'>O</a> contributors";
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
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXItd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlbmRlcmVyLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUVxQyxhQUFhLEVBQ3hELE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUNMLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWdDLGlCQUFpQixFQUMzRixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3BFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBU2pFLE1BQU0sT0FBTyw4QkFBOEI7Ozs7SUFxQ3pDLFlBQ1UsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7O1FBcEIzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLHlCQUFvQixHQUFtQixJQUFJLENBQUM7UUFlcEMsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUlyRCxDQUFDOzs7O0lBdENMLElBQUksV0FBVztRQUNiLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFJRCxJQUFJLFlBQVk7UUFDZCxPQUFPLG1CQUFBLElBQUksQ0FBQyxNQUFNLEVBQW1CLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFnQ0QsZ0JBQWdCLENBQUMsSUFBdUM7UUFDdEQsS0FBSyxJQUFJLENB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Q25DLENBQUM7OztZQXRQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9DQUFvQztnQkFDOUMsOG1GQUFtQztnQkFFbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQVJPLHVCQUF1Qjs7O3FCQWM1QixLQUFLO3VCQU1MLEtBQUs7c0JBR0wsS0FBSzs7OztJQVROLGdEQUEyQjs7SUFNM0Isa0RBQ2lCOztJQUVqQixpREFDZ0I7O0lBR2hCLG1EQUFrQjs7SUFFbEIsOERBQTRDOztJQUM1Qyw2Q0FBUzs7SUFDVCxtREFBZTs7SUFFZix3REFBcUM7O0lBQ3JDLHlEQUFvRDs7SUFFcEQsc0RBQWlDOztJQUNqQyxvREFBdUM7O0lBQ3ZDLGlFQUE4Qzs7SUFDOUMsNkRBQTBDOztJQUMxQyw2REFBd0M7O0lBRXhDLG9EQUFvQjs7Ozs7SUFFcEIsdURBQXlEOzs7OztJQUd2RCxrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZJbWFnZVR5cGV9IGZyb20gJ0BhamYvY29yZS9pbWFnZSc7XG5pbXBvcnQge2V2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZDaGFydFdpZGdldCwgQWpmQ29sdW1uV2lkZ2V0LCBBamZEYXRhc2V0LCBBamZJbWFnZVdpZGdldCwgQWpmTGF5b3V0V2lkZ2V0LCBBamZNYXBXaWRnZXQsXG4gIEFqZlRhYmxlV2lkZ2V0LCBBamZUZXh0V2lkZ2V0LCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGVcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzdGFydFdpdGh9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGF9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItZHJhZy1kYXRhJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1yZW5kZXJlci13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJ3JlbmRlcmVyLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlbmRlcmVyLXdpZGdldC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclJlbmRlcmVyV2lkZ2V0IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIGdldCB3aWRnZXRUeXBlcygpIHtcbiAgICByZXR1cm4gQWpmV2lkZ2V0VHlwZTtcbiAgfVxuXG4gIEBJbnB1dCgpIHdpZGdldDogQWpmV2lkZ2V0O1xuXG4gIGdldCBsYXlvdXRXaWRnZXQoKTogQWpmTGF5b3V0V2lkZ2V0IHtcbiAgICByZXR1cm4gdGhpcy53aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICB9XG5cbiAgQElucHV0KClcbiAgcG9zaXRpb246IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBzZWN0aW9uOiBzdHJpbmc7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuICBjdXJyZW50Q29udGVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBvYmo6IGFueTtcbiAgZml4ZWRab29tOiBhbnk7XG5cbiAgZ2V0VGFibGVUaXRsZXM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRUYWJsZUNvbnRlbnQ6IE9ic2VydmFibGU8c3RyaW5nW11bXSB8IHVuZGVmaW5lZD47XG5cbiAgZ2V0Q2hhcnRUeXBlOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldERhdGFzZXQ6IE9ic2VydmFibGU8QWpmRGF0YXNldFtdW10+O1xuICBnZXRDaGFydEJhY2tncm91bmRDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldENoYXJ0Qm9yZGVyQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRDaGFydEJvcmRlcldpZHRoOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgbGF5b3V0U2hvdzogYm9vbGVhbjtcblxuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICApIHsgfVxuXG4gIGNhbkRyb3BQcmVkaWNhdGUoaXRlbTogQ2RrRHJhZzxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+KTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgaXRlbS5kYXRhLmRyb3Bab25lcy5sZW5ndGggOyBpKyspIHtcbiAgICAgIGlmIChbJ2hlYWRlcicsICd3aWRnZXQnXS5pbmRleE9mKGl0ZW0uZGF0YS5kcm9wWm9uZXNbaV0pID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgc3RhcnQgb2YgbW91c2UgZHJhZyB3aXRoIDIwMCBtcyBvZiBkZWxheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ1N0YXJ0SGFuZGxlcigpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRpbWVyKDIwMClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgZ2V0Q29sdW1uQ29udGVudCgpOiBBamZDb2x1bW5XaWRnZXRbXSB7XG4gICAgY29uc3QgbXlPYmo6IEFqZkxheW91dFdpZGdldCA9IDxBamZMYXlvdXRXaWRnZXQ+dGhpcy53aWRnZXQ7XG5cbiAgICByZXR1cm4gPEFqZkNvbHVtbldpZGdldFtdPm15T2JqLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRJY29uKCk6IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9IHwgbnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0ge2ZvbnRTZXQ6ICcnLCBmb250SWNvbjogJyd9O1xuICAgIGNvbnN0IG15T2JqOiBBamZJbWFnZVdpZGdldCA9IDxBamZJbWFnZVdpZGdldD50aGlzLndpZGdldDtcbiAgICBpZiAobXlPYmouaWNvbiA9PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihteU9iai5pY29uLmZvcm11bGEpIHx8IGRlZlZhbDtcbiAgfVxuXG4gIGdldEZsYWcoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgZGVmVmFsID0gJ2NoJztcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmZsYWcgPT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmouZmxhZy5mb3JtdWxhKSB8fCBkZWZWYWw7XG4gIH1cblxuICBnZXRQZXJjZW50KGluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IG15T2JqOiBBamZMYXlvdXRXaWRnZXQgPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgIGNvbnN0IHBlcmNlbnQgPSBteU9iai5jb2x1bW5zW2luZGV4XSAqIDEwMDtcblxuICAgIHJldHVybiBgJHtwZXJjZW50LnRvU3RyaW5nKCl9JWA7XG4gIH1cblxuICBnZXRJbWFnZVVybCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCBkZWZWYWwgPSAnJztcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLnVybCA9PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihteU9iai51cmwuZm9ybXVsYSkgfHwgZGVmVmFsO1xuICB9XG5cbiAgZ2V0SW1hZ2VUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLndpZGdldCAhPSBudWxsID8gKDxBamZJbWFnZVdpZGdldD50aGlzLndpZGdldCkuaW1hZ2VUeXBlIDogQWpmSW1hZ2VUeXBlLkltYWdlO1xuICB9XG5cbiAgZ2V0SHRtbFRleHQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmVGV4dFdpZGdldCA9IHRoaXMud2lkZ2V0IGFzIEFqZlRleHRXaWRnZXQ7XG4gICAgaWYgKG15T2JqLmh0bWxUZXh0ID09PSAnJykge1xuICAgICAgcmV0dXJuICcuLi4nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbXlPYmouaHRtbFRleHQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29vcmRpbmF0ZSgpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgbXlPYmo6IEFqZk1hcFdpZGdldCA9IHRoaXMud2lkZ2V0IGFzIEFqZk1hcFdpZGdldDtcbiAgICBpZiAobXlPYmouY29vcmRpbmF0ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIDEzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmNvb3JkaW5hdGUgYXMgYW55O1xuICAgIH1cbiAgfVxuXG4gIGdldFRpbGVMYXllcigpOiBzdHJpbmcge1xuICAgIGNvbnN0IG15T2JqOiBBamZNYXBXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgaWYgKG15T2JqLnRpbGVMYXllciA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLnRpbGVMYXllcjtcbiAgICB9XG4gIH1cblxuICBnZXRBdHRyaWJ1dGlvbigpOiBzdHJpbmcge1xuICAgIGxldCBteU9iajogQWpmTWFwV2lkZ2V0O1xuICAgIG15T2JqID0gPEFqZk1hcFdpZGdldD50aGlzLndpZGdldDtcbiAgICBpZiAobXlPYmouYXR0cmlidXRpb24gPT09ICcnKSB7XG4gICAgICByZXR1cm4gXCImY29weTsgPGEgaHJlZj0naHR0cDovL29zbS5vcmcvY29weXJpZ2h0Jz5PPC9hPiBjb250cmlidXRvcnNcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmF0dHJpYnV0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvTGlzdChldmVudDogQ2RrRHJhZ0Ryb3A8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPiwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCk6IHZvaWQge1xuICAgIHRoaXMub25EcmFnRW5kSGFuZGxlcigpO1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkVG9Db2x1bW4oZXZlbnQsIHRvQ29sdW1uKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnZ2VkXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgICB9KTtcblxuICAgIHRoaXMuZ2V0Q2hhcnRUeXBlID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgICAgICAgIHJldHVybiA8bnVtYmVyPihteU9iai5jaGFydFR5cGUpO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKDApKTtcblxuICAgIHRoaXMuZ2V0RGF0YXNldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ICE9IG51bGwgJiYgKHdpZGdldCBhcyBBamZDaGFydFdpZGdldCkuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLndpZGdldDtcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm15T2JqLmRhdGFzZXQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0VGFibGVUaXRsZXMgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG15T2JqID0gdGhpcy53aWRnZXQgYXMgQWpmVGFibGVXaWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHRhYmxlVGl0bGU6IHN0cmluZ1tdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG15T2JqLmRhdGFzZXRbaV1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGFibGVUaXRsZS5wdXNoKG15T2JqLmRhdGFzZXRbaV1bMF0ubGFiZWwgfHwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFibGVUaXRsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICB0aGlzLmdldFRhYmxlQ29udGVudCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXlPYmogPSA8QWpmVGFibGVXaWRnZXQ+dGhpcy53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IHRhYmxlQ29udGVudDogc3RyaW5nW11bXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouZGF0YXNldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlPYmouZGF0YXNldFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKChteU9iai5kYXRhc2V0W2ldICE9IG51bGwpICYmIChteU9iai5kYXRhc2V0W2ldW2ogKyAxXSAhPSBudWxsKSkge1xuICAgICAgICAgICAgICBpZiAodGFibGVDb250ZW50W2pdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnRbal0gPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGFibGVDb250ZW50W2pdW2ldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRlbnRbal1baV0gPSAnICc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGFibGVDb250ZW50W2pdLnNwbGljZShpLCAxLCBteU9iai5kYXRhc2V0W2ldW2ogKyAxXS5sYWJlbCB8fCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWJsZUNvbnRlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gW107XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmIChjaGFuZ2VzLndpZGdldCAmJiBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWUgIT0gbnVsbCkge1xuICAgICAgdGhpcy53aWRnZXQgPSBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==