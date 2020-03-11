/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/content.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBdUIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFDYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQ3ZFLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7O0FBa0JqRSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQThGbEMsWUFDVSxRQUFpQyxFQUNqQyxNQUF5QjtRQUR6QixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjs7UUF2RW5DLGNBQVMsR0FBRyxLQUFLLENBQUM7Ozs7OztRQVFsQixjQUFTLEdBQUcsS0FBSyxDQUFDOztRQUdsQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUd0QixTQUFJLEdBQUcsS0FBSyxDQUFDOztRQUliLGtCQUFhLEdBQWdCLEVBQUUsQ0FBQzs7UUFTaEMsbUJBQWMsR0FBZ0IsRUFBRSxDQUFDOztRQVVqQyxrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFHaEMsV0FBTSxHQUFZLEtBQUssQ0FBQzs7UUFVeEIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDOzs7Ozs7UUFRckMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFWixrQkFBYSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2pELGtCQUFhLEdBQWlCLFlBQVksQ0FBQyxL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RCxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3RDLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDdkMsQ0FBQzs7O1lBaFJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0Qyxpb0tBQTJCO2dCQUUzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDSixhQUFhLEVBQUUsZUFBZTtvQkFDOUIsY0FBYyxFQUFFLGdCQUFnQjtpQkFDakM7O2FBQ0Y7Ozs7WUFqQk8sdUJBQXVCO1lBTmMsaUJBQWlCOzs7O0lBOEM1RCwrQ0FBb0M7O0lBR3BDLDRDQUFrQjs7Ozs7OztJQVFsQiw0Q0FBa0I7O0lBR2xCLDhDQUFzQjs7SUFHdEIsdUNBQWE7O0lBSWIsZ0RBQWdDOzs7Ozs7O0lBTWhDLCtDQUFvQzs7SUFHcEMsaURBQWlDOzs7Ozs7O0lBT2pDLGdEQUFxQzs7SUFHckMsZ0RBQWdDOztJQUdoQyx5Q0FBd0I7Ozs7Ozs7SUFNeEIsK0NBQW9DOztJQUlwQyxnREFBcUM7Ozs7Ozs7SUFRckMsOENBQW9COzs7OztJQUVwQixnREFBeUQ7Ozs7O0lBQ3pELGdEQUF5RDs7Ozs7SUFDekQsa0RBQTJEOzs7OztJQUMzRCxvREFBNkQ7Ozs7O0lBQzdELHFEQUE4RDs7Ozs7SUFDOUQsb0RBQTZEOzs7OztJQUM3RCw2Q0FBc0Q7Ozs7O0lBQ3RELG9EQUE2RDs7Ozs7SUFHM0QsMkNBQXlDOzs7OztJQUN6Qyx5Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmU3R5bGVzLCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1kcmFnLWRhdGEnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiAgbWFuYWdlIHRoZSBjb250ZW50IHBhZ2VcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdjb250ZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29udGVudC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnKG1vdXNlb3ZlciknOiAnb25Nb3VzZU92ZXIoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdvbk1vdXNlTGVhdmUoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93QWN0aW9ucyA9IHRydWU7XG4gICAgdGhpcy5fc2VydmljZS5vdmVyU3RhcnRlZCgpO1xuICB9XG5cbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0FjdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLl9zZXJ2aWNlLm92ZXJFbmRlZCgpO1xuICB9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShcbiAgICBkcm9wWm9uZXM6IHN0cmluZ1tdXG4gICk6IChpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiBpdGVtID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5kYXRhLmRyb3Bab25lcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgaWYgKGRyb3Bab25lcy5pbmRleE9mKGl0ZW0uZGF0YS5kcm9wWm9uZXNbaV0pID4gLTEpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgcmVwb3J0U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuXG4gIC8qKlxuICAgKiAgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHRoZSBmaXhlZCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgZml4ZWRab29tID0gZmFsc2U7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgd2lkZ2V0IGlzIGluIGRyYWcgZW50ZXIgc3RhdHVzXG4gIG9uRHJhZ0VudGVyOiBhbnkgPSB7fTtcblxuXG4gIHNob3cgPSBmYWxzZTtcblxuXG4gIC8vIHRoaXMgYXJyYXkgY29udGFpbnMgYWxsIHdpZGdldCBsb2NhdGUgaW4gaGVhZGVyIHpvbmVcbiAgaGVhZGVyV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGNzcyBzdHlsZSBvZiBoZWFkZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBoZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGFycmF5IGNvbnRhaW5zIGFsbCB3aWRnZXQgbG9jYXRlIGluIGNvbnRlbnQgem9uZVxuICBjb250ZW50V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgY3NzIHN0eWxlIG9mIGNvbnRlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBjb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBhcnJheSBjb250YWlucyBhbGwgd2lkZ2V0IGxvY2F0ZSBpbiBmb290ZXIgem9uZVxuICBmb290ZXJXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG5cbiAgb25PdmVyOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBjc3Mgc3R5bGUgb2YgZm9vdGVyXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cblxuICAvLyB0aGlzIGlzIHRoZSBjdXJyZW50IHdpZGdldFxuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cblxuICAvKipcbiAgICogaWYgdHJ1ZSBtb3VzZSBldmVudCBpcyBvbiBkcmFnZ2VkIHN0YXR1c1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHNob3dBY3Rpb25zID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25PdmVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmhlYWRlclN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzO1xuICAgIHRoaXMuY29udGVudFN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuY29udGVudFN0eWxlcztcbiAgICB0aGlzLmZvb3RlclN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgaXNMYXlvdXQod2lkZ2V0OiBBamZXaWRnZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gd2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0O1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChzICE9IG51bGwpIHsgcy51bnN1YnNjcmliZSgpOyB9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBlbnRlciBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJIYW5kbGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW50ZXIoYXJyYXksIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBsZWF2ZSBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnTGVhdmVIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0xlYXZlKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgcmV0dXJuIHRydWUgaWYgYXJyYXkgYW5kIGluZGV4IGlzID09PSB3aXRoIGFycmF5IGFuZCBpbmRleCBvZiBvbkRyYWdFbnRlclxuICAgKlxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJDaGVjayhhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgKGFycmF5ID09PSB0aGlzLm9uRHJhZ0VudGVyLmFycmF5KSAmJlxuICAgICAgKChpbmRleCA9PT0gdGhpcy5vbkRyYWdFbnRlci5pbmRleCkgfHwgKGluZGV4ID09PSAtMSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgd2lkZ2V0IGVsZW1lbnQgZnJvbSB0eXBlIGFycmF5IGluIGlkeCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICByZW1vdmUodHlwZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKHR5cGUsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHdpZGdldCBlbGVtZW50IGludG8gdHlwZSBhcnJheSBpbiBpZHggcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgYWRkVG9MaXN0KGFycmF5VG86IHN0cmluZywgZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4sIHRvPzogbnVtYmVyKSB7XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2VydmljZS5zZXRPcmlnaW4oYXJyYXlUbyk7XG4gICAgY29uc3QgaXRlbURhdGEgPSBldmVudC5pdGVtLmRhdGEgYXMgQWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhO1xuICAgIGlmIChpdGVtRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5yZW1vdmVXaWRnZXRUb0NvbHVtbihpdGVtRGF0YS5mcm9tQ29sdW1uLCBpdGVtRGF0YS5mcm9tSW5kZXghKTtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gaXRlbURhdGEud2lkZ2V0ITtcbiAgICB9IGVsc2UgaWYgKGl0ZW1EYXRhLndpZGdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbW92ZShpdGVtRGF0YS5hcnJheUZyb20hLCBpdGVtRGF0YS5mcm9tISk7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBpdGVtRGF0YS53aWRnZXQ7XG4gICAgfSBlbHNlIGlmIChpdGVtRGF0YS5qc29uICE9IG51bGwgJiYgaXRlbURhdGEuanNvbiAhPT0gJycpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGRlZXBDb3B5KGl0ZW1EYXRhLmpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogKEFqZldpZGdldFR5cGUgYXMgYW55KVtpdGVtRGF0YS53aWRnZXRUeXBlIV19O1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcbiAgICB9XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGFycmF5VG8pIHtcbiAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZEhlYWRlcldpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQsIHRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5hZGRDb250ZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkZm9vdGVyV2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uRHJhZ0xlYXZlSGFuZGxlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faGVhZGVyV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyV2lkZ2V0c1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5oZWFkZXJXaWRnZXRzID0geC53aWRnZXRzO1xuICAgICAgfSk7XG4gICAgdGhpcy5fY29udGVudFdpZGdldHNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRXaWRnZXRzXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLmNvbnRlbnRXaWRnZXRzID0geC53aWRnZXRzO1xuICAgICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyV2lkZ2V0c1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5mb290ZXJXaWRnZXRzID0geC53aWRnZXRzO1xuICAgICAgfSk7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICAgIH0pO1xuICAgIHRoaXMuX2ZpeGVkWm9vbVN1YiA9IHRoaXMuX3NlcnZpY2UuZml4ZWRab29tXG4gICAgICAuc3Vic2NyaWJlKGJvb2wgPT4ge1xuICAgICAgICB0aGlzLmZpeGVkWm9vbSA9IGJvb2w7XG4gICAgICB9KTtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnRW50ZXJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnRW50ZXIgPSB4O1xuICAgICAgfSk7XG4gICAgdGhpcy5fb25PdmVyU3ViID0gdGhpcy5fc2VydmljZS5vbk92ZXJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25PdmVyID0geDtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuX2NkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIFtcbiAgICAgIHRoaXMuX2hlYWRlcldpZGdldHNTdWIsIHRoaXMuX2NvbnRlbnRXaWRnZXRzU3ViLCB0aGlzLl9mb290ZXJXaWRnZXRzU3ViLFxuICAgICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiwgdGhpcy5fb25EcmFnZ2VkU3ViLCB0aGlzLl9maXhlZFpvb21TdWIsXG4gICAgICB0aGlzLl9vbk92ZXJTdWIsIHRoaXMuX29uRHJhZ0VudGVyU3ViXG4gICAgXS5mb3JFYWNoKHMgPT4geyBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICB9XG59XG4iXX0=