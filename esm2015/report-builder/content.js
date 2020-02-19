/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/content.ts
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
import { AjfWidgetType } from '@ajf/core/reports';
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
/**
 *  manage the content page
 *
 * @export
 */
export class AjfReportBuilderContent {
    /**
     * @param {?} _service
     * @param {?} _cdRef
     */
    constructor(_service, _cdRef) {
        this._service = _service;
        this._cdRef = _cdRef;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        /**
         *  observe the status of the fixed zoom
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.fixedZoom = false;
        // this boolean sign if widget is in drag enter status
        this.onDragEnter = {};
        this.show = false;
        // this array contains all widget locate in header zone
        this.headerWidgets = [];
        // this array contains all widget locate in content zone
        this.contentWidgets = [];
        // this array contains all widget locate in footer zone
        this.footerWidgets = [];
        this.onOver = false;
        // this is the current widget
        this.currentWidget = null;
        /**
         * if true mouse event is on dragged status
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this._onDraggedSub = Subscription.EMPTY;
        this._fixedZoomSub = Subscription.EMPTY;
        this._onDragEnterSub = Subscription.EMPTY;
        this._headerWidgetsSub = Subscription.EMPTY;
        this._contentWidgetsSub = Subscription.EMPTY;
        this._footerWidgetsSub = Subscription.EMPTY;
        this._onOverSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this.headerStyles = this._service.headerStyles;
        this.contentStyles = this._service.contentStyles;
        this.footerStyles = this._service.footerStyles;
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        this.showActions = true;
        this._service.overStarted();
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.showActions = false;
        this._service.overEnded();
    }
    /**
     * @param {?} dropZones
     * @return {?}
     */
    canDropPredicate(dropZones) {
        return (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            for (let i = 0; i < item.data.dropZones.length; i++) {
                if (dropZones.indexOf(item.data.dropZones[i]) > -1) {
                    return true;
                }
            }
            return false;
        });
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    isLayout(widget) {
        return widget.widgetType === AjfWidgetType.Layout;
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
            if (s != null) {
                s.unsubscribe();
            }
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
     *  sign the enter of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    onDragEnterHandler(array, index) {
        if (index == null) {
            return;
        }
        this._service.dragEnter(array, index);
    }
    /**
     * sign the leave of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragLeaveHandler() {
        this._service.dragLeave();
    }
    /**
     *  return true if array and index is === with array and index of onDragEnter
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     *
     * @return {?}
     */
    onDragEnterCheck(array, index) {
        if ((array === this.onDragEnter.array) &&
            ((index === this.onDragEnter.index) || (index === -1))) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * remove widget element from type array in idx position
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} type can be header content or footer
     * @param {?} idx
     *
     * @return {?}
     */
    remove(type, idx) {
        this._service.remove(type, idx);
    }
    /**
     * add widget element into type array in idx position
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} arrayTo
     * @param {?} event
     *
     * @param {?=} to
     * @return {?}
     */
    addToList(arrayTo, event, to) {
        this.onDragEndHandler();
        this._service.setOrigin(arrayTo);
        /** @type {?} */
        const itemData = (/** @type {?} */ (event.item.data));
        if (itemData.fromColumn != null) {
            this._service.removeWidgetToColumn(itemData.fromColumn, (/** @type {?} */ (itemData.fromIndex)));
            this.currentWidget = (/** @type {?} */ (itemData.widget));
        }
        else if (itemData.widget != null) {
            this.remove((/** @type {?} */ (itemData.arrayFrom)), (/** @type {?} */ (itemData.from)));
            this.currentWidget = itemData.widget;
        }
        else if (itemData.json != null && itemData.json !== '') {
            this.currentWidget = deepCopy(itemData.json);
        }
        else {
            /** @type {?} */
            let obj = { 'widgetType': ((/** @type {?} */ (AjfWidgetType)))[(/** @type {?} */ (itemData.widgetType))] };
            this.currentWidget = deepCopy(obj);
        }
        this.onDragEndHandler();
        if (this.currentWidget != null) {
            switch (arrayTo) {
                case 'header':
                    this._service.addHeaderWidget(this.currentWidget, to);
                    break;
                case 'content':
                    this._service.addContentWidget(this.currentWidget, to);
                    break;
                case 'footer':
                    this._service.addfooterWidget(this.currentWidget, to);
                    break;
            }
        }
        this.onDragLeaveHandler();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._headerWidgetsSub = this._service.headerWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.headerWidgets = x.widgets;
        }));
        this._contentWidgetsSub = this._service.contentWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.contentWidgets = x.widgets;
        }));
        this._footerWidgetsSub = this._service.footerWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.footerWidgets = x.widgets;
        }));
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this._fixedZoomSub = this._service.fixedZoom
            .subscribe((/**
         * @param {?} bool
         * @return {?}
         */
        bool => {
            this.fixedZoom = bool;
        }));
        this._onDragEnterSub = this._service.onDragEnter
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragEnter = x;
        }));
        this._onOverSub = this._service.onOver
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onOver = x;
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        [
            this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
            this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub,
            this._onOverSub, this._onDragEnterSub
        ].forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => { s.unsubscribe(); }));
    }
}
AjfReportBuilderContent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-content',
                template: "<div\n  class=\"ajf-overlay\"\n  [ngClass]=\"{'ajf-drag-mode': onDragged, 'ajf-zoom-mode': fixedZoom}\"\n  [applyStyles]=\"reportStyles|async\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\">\n  <div\n    class=\"ajf-header\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"(headerStyles|async)\">\n    <mat-list *ngFor=\"let t of headerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('header', $event, i);\"\n          (dragenter)=\"onDragEnterHandler('header', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t,fromIndex: i,arrayFrom: 'header', dropZones: ['widget','column']}\"\n          [style.display]=\"(showActions || onDragged)? 'block' : 'none'\"\n          [from]=\"'header'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler();\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'header'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': true}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['header','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('header', $event)\"\n        (dragenter)=\"onDragEnterHandler('header', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n    </div>\n  </div>\n  <div\n    class=\"ajf-content\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"contentStyles|async\">\n    <mat-list *ngFor=\"let t of contentWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('content', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('content', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'content', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'content'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'content'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['content','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('content', $event)\"\n        (dragenter)=\"onDragEnterHandler('content', contentWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n  </div>\n  <div\n    class=\"ajf-footer\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"footerStyles|async\">\n    <mat-list *ngFor=\"let t of footerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('footer', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('footer', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'footer', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'footer'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'footer'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['footer','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('footer', $event)\"\n        (dragenter)=\"onDragEnterHandler('footer', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '(mouseover)': 'onMouseOver()',
                    '(mouseleave)': 'onMouseLeave()'
                },
                styles: ["ajf-report-builder-content{text-align:center;display:block;margin-bottom:300px}ajf-report-builder-content .ajf-overlay.ajf-drag-mode{max-height:700px;margin-top:50px;background-color:beige}ajf-report-builder-content .ajf-drag-mode{overflow:scroll;zoom:50%}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-content,ajf-report-builder-content .ajf-drag-mode .ajf-footer{margin-bottom:20px;border:23px solid rgba(66,134,244,.2)}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{width:auto;background-color:rgba(66,134,244,.2);border:23px solid #fff;position:relative;min-height:50px !important;z-index:0;opacity:1}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(66,134,244,.2) !important;border:23px solid #fff !important}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-footer{border:23px solid rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-drop-zone-container{background-color:#000;border:16px solid #fff;position:relative;opacity:0;z-index:0;min-height:50px !important;display:none !important}ajf-report-builder-content .ajf-zoom-mode{zoom:50%}ajf-report-builder-content .ajf-header,ajf-report-builder-content .ajf-content,ajf-report-builder-content .ajf-footer{height:100%;min-height:50px;position:relative;text-align:center;display:block}ajf-report-builder-content .ajf-header .mat-list,ajf-report-builder-content .ajf-content .mat-list,ajf-report-builder-content .ajf-footer .mat-list{padding:0}ajf-report-builder-content .ajf-header .ajf-zoom:hover,ajf-report-builder-content .ajf-content .ajf-zoom:hover,ajf-report-builder-content .ajf-footer .ajf-zoom:hover{padding-bottom:100px;overflow-y:scroll}ajf-report-builder-content .ajf-content:hover{background-color:rgba(66,134,244,.2) !important}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-footer:hover{background-color:rgba(255,102,102,.4)}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-content:hover,ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-is-on-over{border:3px dotted #3a7999}ajf-report-builder-content .ajf-header:hover label,ajf-report-builder-content .ajf-content:hover label,ajf-report-builder-content .ajf-footer:hover label,ajf-report-builder-content .ajf-is-on-over label{visibility:visible !important;opacity:.4;display:block !important}ajf-report-builder-content .ajf-header:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-content:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-footer:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-is-on-over .ajf-drop-zone-container{display:block !important}ajf-report-builder-content .ajf-header:hover mat-list button,ajf-report-builder-content .ajf-content:hover mat-list button,ajf-report-builder-content .ajf-footer:hover mat-list button,ajf-report-builder-content .ajf-is-on-over mat-list button{display:inline}ajf-report-builder-content .ajf-my-content{width:100%;white-space:nowrap;overflow-y:auto}ajf-report-builder-content .ajf-show,ajf-report-builder-content .ajf-on-drag-over{opacity:1 !important;z-index:10}ajf-report-builder-content mat-list{position:relative;display:block}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderContent.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: ChangeDetectorRef }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderContent.prototype.reportStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.onDragged;
    /**
     *  observe the status of the fixed zoom
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.fixedZoom;
    /** @type {?} */
    AjfReportBuilderContent.prototype.onDragEnter;
    /** @type {?} */
    AjfReportBuilderContent.prototype.show;
    /** @type {?} */
    AjfReportBuilderContent.prototype.headerWidgets;
    /**
     * observe the css style of header
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.headerStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.contentWidgets;
    /**
     * observe the css style of content
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.contentStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.footerWidgets;
    /** @type {?} */
    AjfReportBuilderContent.prototype.onOver;
    /**
     * observe the css style of footer
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.footerStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.currentWidget;
    /**
     * if true mouse event is on dragged status
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.showActions;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._fixedZoomSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._onDragEnterSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._headerWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._contentWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._footerWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._onOverSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBdUIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFDYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQ3ZFLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBa0JqRSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQThGbEMsWUFDVSxRQUFpQyxFQUNqQyxNQUF5QjtRQUR6QixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjs7UUF2RW5DLGNBQVMsR0FBRyxLQUFLLENBQUM7Ozs7OztRQVFsQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdsQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUd0QixTQUFJLEdBQUcsS0FBSyxDQUFDOztRQUliLGtCQUFhLEdBQWdCLEVBQUUsQ0FBQzs7UUFTaEMsbUJBQWMsR0FBZ0IsRUFBRSxDQUFDOztRQVVqQyxrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFHaEMsV0FBTSxHQUFZLEtBQUssQ0FBQzs7UUFVeEIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDOzs7Ozs7UUFRckMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFWixrQkFBYSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2pELGtCQUFhLEdBQWlCLFlBQVksQ0FBQyxL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RCxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3RDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBaFJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0Qyxpb0tBQTJCO2dCQUUzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixhQUFhLEVBQUUsZUFBZTtvQkFDOUIsY0FBYyxFQUFFLGdCQUFnQjtpQkFDakM7O2FBQ0Y7Ozs7WUFqQk8sdUJBQXVCO1lBTmMsaUJBQWlCOzs7O0lBOEM1RCwrQ0FBb0M7O0lBR3BDLDRDQUFrQjs7Ozs7OztJQVFsQiw0Q0FBa0I7O0lBR2xCLDhDQUFzQjs7SUFHdEIsdUNBQWE7O0lBSWIsZ0RBQWdDOzs7Ozs7O0lBTWhDLCtDQUFvQzs7SUFHcEMsaURBQWlDOzs7Ozs7O0lBT2pDLGdEQUFxQzs7SUFHckMsZ0RBQWdDOztJQUdoQyx5Q0FBd0I7Ozs7Ozs7SUFNeEIsK0NBQW9DOztJQUlwQyxnREFBcUM7Ozs7Ozs7SUFRckMsOENBQW9COzs7OztJQUVwQixnREFBeUQ7Ozs7O0lBQ3pELGdEQUF5RDs7Ozs7SUFDekQsa0RBQTJEOzs7OztJQUMzRCxvREFBNkQ7Ozs7O0lBQzdELHFEQUE4RDs7Ozs7SUFDOUQsb0RBQTZEOzs7OztJQUM3RCw2Q0FBc0Q7Ozs7O0lBQ3RELG9EQUE2RDs7Ozs7SUFHM0QsMkNBQXlDOzs7OztJQUN6Qyx5Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZTdHlsZXMsIEFqZldpZGdldCwgQWpmV2lkZ2V0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqICBtYW5hZ2UgdGhlIGNvbnRlbnQgcGFnZVxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NvbnRlbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb250ZW50LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICcobW91c2VvdmVyKSc6ICdvbk1vdXNlT3ZlcigpJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ29uTW91c2VMZWF2ZSgpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBvbk1vdXNlT3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dBY3Rpb25zID0gdHJ1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLm92ZXJTdGFydGVkKCk7XG4gIH1cblxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93QWN0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuX3NlcnZpY2Uub3ZlckVuZGVkKCk7XG4gIH1cblxuICBjYW5Ecm9wUHJlZGljYXRlKFxuICAgIGRyb3Bab25lczogc3RyaW5nW11cbiAgKTogKGl0ZW06IENka0RyYWc8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPikgPT4gYm9vbGVhbiB7XG4gICAgcmV0dXJuIGl0ZW0gPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmRhdGEuZHJvcFpvbmVzLmxlbmd0aCA7IGkrKykge1xuICAgICAgICBpZiAoZHJvcFpvbmVzLmluZGV4T2YoaXRlbS5kYXRhLmRyb3Bab25lc1tpXSkgPiAtMSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cblxuICByZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG5cbiAgLyoqXG4gICAqICBvYnNlcnZlIHRoZSBzdGF0dXMgb2YgdGhlIGZpeGVkIHpvb21cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBmaXhlZFpvb20gPSBmYWxzZTtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiB3aWRnZXQgaXMgaW4gZHJhZyBlbnRlciBzdGF0dXNcbiAgb25EcmFnRW50ZXI6IGFueSA9IHt9O1xuXG5cbiAgc2hvdyA9IGZhbHNlO1xuXG5cbiAgLy8gdGhpcyBhcnJheSBjb250YWlucyBhbGwgd2lkZ2V0IGxvY2F0ZSBpbiBoZWFkZXIgem9uZVxuICBoZWFkZXJXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgY3NzIHN0eWxlIG9mIGhlYWRlclxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGhlYWRlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8vIHRoaXMgYXJyYXkgY29udGFpbnMgYWxsIHdpZGdldCBsb2NhdGUgaW4gY29udGVudCB6b25lXG4gIGNvbnRlbnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBjc3Mgc3R5bGUgb2YgY29udGVudFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGNvbnRlbnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGFycmF5IGNvbnRhaW5zIGFsbCB3aWRnZXQgbG9jYXRlIGluIGZvb3RlciB6b25lXG4gIGZvb3RlcldpZGdldHM6IEFqZldpZGdldFtdID0gW107XG5cblxuICBvbk92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGNzcyBzdHlsZSBvZiBmb290ZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBmb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuXG4gIC8vIHRoaXMgaXMgdGhlIGN1cnJlbnQgd2lkZ2V0XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcblxuXG4gIC8qKlxuICAgKiBpZiB0cnVlIG1vdXNlIGV2ZW50IGlzIG9uIGRyYWdnZWQgc3RhdHVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgc2hvd0FjdGlvbnMgPSBmYWxzZTtcblxuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZml4ZWRab29tU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uRHJhZ0VudGVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0c1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbk92ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuaGVhZGVyU3R5bGVzID0gdGhpcy5fc2VydmljZS5oZWFkZXJTdHlsZXM7XG4gICAgdGhpcy5jb250ZW50U3R5bGVzID0gdGhpcy5fc2VydmljZS5jb250ZW50U3R5bGVzO1xuICAgIHRoaXMuZm9vdGVyU3R5bGVzID0gdGhpcy5fc2VydmljZS5mb290ZXJTdHlsZXM7XG4gIH1cblxuICBpc0xheW91dCh3aWRnZXQ6IEFqZldpZGdldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQ7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHMgIT0gbnVsbCkgeyBzLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgdGhpcy5fc2VydmljZS5kcmFnU3RhcnRlZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgZW5kIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbmRIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VuZGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIGVudGVyIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbnRlckhhbmRsZXIoYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbnRlcihhcnJheSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGxlYXZlIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdMZWF2ZUhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnTGVhdmUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqICByZXR1cm4gdHJ1ZSBpZiBhcnJheSBhbmQgaW5kZXggaXMgPT09IHdpdGggYXJyYXkgYW5kIGluZGV4IG9mIG9uRHJhZ0VudGVyXG4gICAqXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbnRlckNoZWNrKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoXG4gICAgICAoYXJyYXkgPT09IHRoaXMub25EcmFnRW50ZXIuYXJyYXkpICYmXG4gICAgICAoKGluZGV4ID09PSB0aGlzLm9uRHJhZ0VudGVyLmluZGV4KSB8fCAoaW5kZXggPT09IC0xKSlcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB3aWRnZXQgZWxlbWVudCBmcm9tIHR5cGUgYXJyYXkgaW4gaWR4IHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHJlbW92ZSh0eXBlOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmUodHlwZSwgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgd2lkZ2V0IGVsZW1lbnQgaW50byB0eXBlIGFycmF5IGluIGlkeCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBhZGRUb0xpc3QoYXJyYXlUbzogc3RyaW5nLCBldmVudDogQ2RrRHJhZ0Ryb3A8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPiwgdG8/OiBudW1iZXIpIHtcbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldE9yaWdpbihhcnJheVRvKTtcbiAgICBjb25zdCBpdGVtRGF0YSA9IGV2ZW50Lml0ZW0uZGF0YSBhcyBBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE7XG4gICAgaWYgKGl0ZW1EYXRhLmZyb21Db2x1bW4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVdpZGdldFRvQ29sdW1uKGl0ZW1EYXRhLmZyb21Db2x1bW4sIGl0ZW1EYXRhLmZyb21JbmRleCEpO1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBpdGVtRGF0YS53aWRnZXQhO1xuICAgIH0gZWxzZSBpZiAoaXRlbURhdGEud2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMucmVtb3ZlKGl0ZW1EYXRhLmFycmF5RnJvbSEsIGl0ZW1EYXRhLmZyb20hKTtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGl0ZW1EYXRhLndpZGdldDtcbiAgICB9IGVsc2UgaWYgKGl0ZW1EYXRhLmpzb24gIT0gbnVsbCAmJiBpdGVtRGF0YS5qc29uICE9PSAnJykge1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gZGVlcENvcHkoaXRlbURhdGEuanNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvYmogPSB7J3dpZGdldFR5cGUnOiAoQWpmV2lkZ2V0VHlwZSBhcyBhbnkpW2l0ZW1EYXRhLndpZGdldFR5cGUhXX07XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuICAgIH1cbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoYXJyYXlUbykge1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkSGVhZGVyV2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZENvbnRlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0LCB0byk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5hZGRmb290ZXJXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0LCB0byk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25EcmFnTGVhdmVIYW5kbGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9oZWFkZXJXaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5oZWFkZXJXaWRnZXRzXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLmhlYWRlcldpZGdldHMgPSB4LndpZGdldHM7XG4gICAgICB9KTtcbiAgICB0aGlzLl9jb250ZW50V2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuY29udGVudFdpZGdldHNcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMuY29udGVudFdpZGdldHMgPSB4LndpZGdldHM7XG4gICAgICB9KTtcbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5mb290ZXJXaWRnZXRzXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLmZvb3RlcldpZGdldHMgPSB4LndpZGdldHM7XG4gICAgICB9KTtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZFxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgICAgfSk7XG4gICAgdGhpcy5fZml4ZWRab29tU3ViID0gdGhpcy5fc2VydmljZS5maXhlZFpvb21cbiAgICAgIC5zdWJzY3JpYmUoYm9vbCA9PiB7XG4gICAgICAgIHRoaXMuZml4ZWRab29tID0gYm9vbDtcbiAgICAgIH0pO1xuICAgIHRoaXMuX29uRHJhZ0VudGVyU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdFbnRlclxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5vbkRyYWdFbnRlciA9IHg7XG4gICAgICB9KTtcbiAgICB0aGlzLl9vbk92ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uT3ZlclxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5vbk92ZXIgPSB4O1xuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5fY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgW1xuICAgICAgdGhpcy5faGVhZGVyV2lkZ2V0c1N1YiwgdGhpcy5fY29udGVudFdpZGdldHNTdWIsIHRoaXMuX2Zvb3RlcldpZGdldHNTdWIsXG4gICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLCB0aGlzLl9vbkRyYWdnZWRTdWIsIHRoaXMuX2ZpeGVkWm9vbVN1YixcbiAgICAgIHRoaXMuX29uT3ZlclN1YiwgdGhpcy5fb25EcmFnRW50ZXJTdWJcbiAgICBdLmZvckVhY2gocyA9PiB7IHMudW5zdWJzY3JpYmUoKTsgfSk7XG4gIH1cbn1cbiJdfQ==