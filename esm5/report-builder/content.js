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
var AjfReportBuilderContent = /** @class */ (function () {
    function AjfReportBuilderContent(_service, _cdRef) {
        this._service = _service;
        this._cdRef = _cdRef;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        /**
         *  observe the status of the fixed zoom
         *
         * @memberOf AjfReportBuilderContent
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
         * @memberOf AjfReportBuilderContent
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
    AjfReportBuilderContent.prototype.onMouseOver = function () {
        this.showActions = true;
        this._service.overStarted();
    };
    AjfReportBuilderContent.prototype.onMouseLeave = function () {
        this.showActions = false;
        this._service.overEnded();
    };
    AjfReportBuilderContent.prototype.canDropPredicate = function (dropZones) {
        return function (item) {
            for (var i = 0; i < item.data.dropZones.length; i++) {
                if (dropZones.indexOf(item.data.dropZones[i]) > -1) {
                    return true;
                }
            }
            return false;
        };
    };
    AjfReportBuilderContent.prototype.isLayout = function (widget) {
        return widget.widgetType === AjfWidgetType.Layout;
    };
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.onDragStartHandler = function () {
        var _this = this;
        var s = timer(200)
            .subscribe(function () {
            if (s != null) {
                s.unsubscribe();
            }
            _this._service.dragStarted();
        });
    };
    /**
     * sign the end of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.onDragEndHandler = function () {
        this._service.dragEnded();
    };
    /**
     *  sign the enter of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.onDragEnterHandler = function (array, index) {
        if (index == null) {
            return;
        }
        this._service.dragEnter(array, index);
    };
    /**
     * sign the leave of mouse drag
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.onDragLeaveHandler = function () {
        this._service.dragLeave();
    };
    /**
     *  return true if array and index is === with array and index of onDragEnter
     *
     * @param array
     * @param index
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.onDragEnterCheck = function (array, index) {
        if ((array === this.onDragEnter.array) &&
            ((index === this.onDragEnter.index) || (index === -1))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * remove widget element from type array in idx position
     *
     * @param type can be header content or footer
     * @param idx
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.remove = function (type, idx) {
        this._service.remove(type, idx);
    };
    /**
     * add widget element into type array in idx position
     *
     * @param type
     * @param event
     *
     * @memberOf AjfReportBuilderContent
     */
    AjfReportBuilderContent.prototype.addToList = function (arrayTo, event, to) {
        this.onDragEndHandler();
        this._service.setOrigin(arrayTo);
        var itemData = event.item.data;
        if (itemData.fromColumn != null) {
            this._service.removeWidgetToColumn(itemData.fromColumn, itemData.fromIndex);
            this.currentWidget = itemData.widget;
        }
        else if (itemData.widget != null) {
            this.remove(itemData.arrayFrom, itemData.from);
            this.currentWidget = itemData.widget;
        }
        else if (itemData.json != null && itemData.json !== '') {
            this.currentWidget = deepCopy(itemData.json);
        }
        else {
            var obj = { 'widgetType': AjfWidgetType[itemData.widgetType] };
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
    };
    AjfReportBuilderContent.prototype.ngOnInit = function () {
        var _this = this;
        this._headerWidgetsSub = this._service.headerWidgets
            .subscribe(function (x) {
            _this.headerWidgets = x.widgets;
        });
        this._contentWidgetsSub = this._service.contentWidgets
            .subscribe(function (x) {
            _this.contentWidgets = x.widgets;
        });
        this._footerWidgetsSub = this._service.footerWidgets
            .subscribe(function (x) {
            _this.footerWidgets = x.widgets;
        });
        this._onDraggedSub = this._service.onDragged
            .subscribe(function (x) {
            _this.onDragged = x;
        });
        this._fixedZoomSub = this._service.fixedZoom
            .subscribe(function (bool) {
            _this.fixedZoom = bool;
        });
        this._onDragEnterSub = this._service.onDragEnter
            .subscribe(function (x) {
            _this.onDragEnter = x;
        });
        this._onOverSub = this._service.onOver
            .subscribe(function (x) {
            _this.onOver = x;
        });
    };
    AjfReportBuilderContent.prototype.ngAfterViewChecked = function () {
        this._cdRef.detectChanges();
    };
    AjfReportBuilderContent.prototype.ngOnDestroy = function () {
        [
            this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
            this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub,
            this._onOverSub, this._onDragEnterSub
        ].forEach(function (s) { s.unsubscribe(); });
    };
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
    AjfReportBuilderContent.ctorParameters = function () { return [
        { type: AjfReportBuilderService },
        { type: ChangeDetectorRef }
    ]; };
    return AjfReportBuilderContent;
}());
export { AjfReportBuilderContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBdUIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFDYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQ3ZFLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdyRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTs7OztHQUlHO0FBQ0g7SUF5R0UsaUNBQ1UsUUFBaUMsRUFDakMsTUFBeUI7UUFEekIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUF4RW5DLDJDQUEyQztRQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCOzs7O1dBSUc7UUFDSCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLHNEQUFzRDtRQUN0RCxnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUd0QixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBR2IsdURBQXVEO1FBQ3ZELGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztRQVFoQyx3REFBd0Q7UUFDeEQsbUJBQWMsR0FBZ0IsRUFBRSxDQUFDO1FBU2pDLHVEQUF1RDtRQUN2RCxrQkFBYSxHQUFnQixFQUFFLENBQUM7UUFHaEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQVN4Qiw2QkFBNkI7UUFDN0Isa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1FBR3JDOzs7O1dBSUc7UUFD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QUFJLENBQUMsaUJBQWlCO1lBQ3ZFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQzlELElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdEMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Z0JBaFJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0Qyxpb0tBQTJCO29CQUUzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRTt3QkFDSixhQUFhLEVBQUUsZUFBZTt3QkFDOUIsY0FBYyxFQUFFLGdCQUFnQjtxQkFDakM7O2lCQUNGOzs7O2dCQWpCTyx1QkFBdUI7Z0JBTmMsaUJBQWlCOztJQThSOUQsOEJBQUM7Q0FBQSxBQWpSRCxJQWlSQztTQXRRWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmU3R5bGVzLCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1kcmFnLWRhdGEnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiAgbWFuYWdlIHRoZSBjb250ZW50IHBhZ2VcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdjb250ZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29udGVudC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnKG1vdXNlb3ZlciknOiAnb25Nb3VzZU92ZXIoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdvbk1vdXNlTGVhdmUoKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93QWN0aW9ucyA9IHRydWU7XG4gICAgdGhpcy5fc2VydmljZS5vdmVyU3RhcnRlZCgpO1xuICB9XG5cbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0FjdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLl9zZXJ2aWNlLm92ZXJFbmRlZCgpO1xuICB9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShcbiAgICBkcm9wWm9uZXM6IHN0cmluZ1tdXG4gICk6IChpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiBpdGVtID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5kYXRhLmRyb3Bab25lcy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgaWYgKGRyb3Bab25lcy5pbmRleE9mKGl0ZW0uZGF0YS5kcm9wWm9uZXNbaV0pID4gLTEpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgcmVwb3J0U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuXG4gIC8qKlxuICAgKiAgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHRoZSBmaXhlZCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgZml4ZWRab29tID0gZmFsc2U7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgd2lkZ2V0IGlzIGluIGRyYWcgZW50ZXIgc3RhdHVzXG4gIG9uRHJhZ0VudGVyOiBhbnkgPSB7fTtcblxuXG4gIHNob3cgPSBmYWxzZTtcblxuXG4gIC8vIHRoaXMgYXJyYXkgY29udGFpbnMgYWxsIHdpZGdldCBsb2NhdGUgaW4gaGVhZGVyIHpvbmVcbiAgaGVhZGVyV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGNzcyBzdHlsZSBvZiBoZWFkZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBoZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGFycmF5IGNvbnRhaW5zIGFsbCB3aWRnZXQgbG9jYXRlIGluIGNvbnRlbnQgem9uZVxuICBjb250ZW50V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgY3NzIHN0eWxlIG9mIGNvbnRlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBjb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBhcnJheSBjb250YWlucyBhbGwgd2lkZ2V0IGxvY2F0ZSBpbiBmb290ZXIgem9uZVxuICBmb290ZXJXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG5cbiAgb25PdmVyOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBjc3Mgc3R5bGUgb2YgZm9vdGVyXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cblxuICAvLyB0aGlzIGlzIHRoZSBjdXJyZW50IHdpZGdldFxuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cblxuICAvKipcbiAgICogaWYgdHJ1ZSBtb3VzZSBldmVudCBpcyBvbiBkcmFnZ2VkIHN0YXR1c1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHNob3dBY3Rpb25zID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25PdmVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmhlYWRlclN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzO1xuICAgIHRoaXMuY29udGVudFN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuY29udGVudFN0eWxlcztcbiAgICB0aGlzLmZvb3RlclN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgaXNMYXlvdXQod2lkZ2V0OiBBamZXaWRnZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gd2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0O1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChzICE9IG51bGwpIHsgcy51bnN1YnNjcmliZSgpOyB9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBlbnRlciBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJIYW5kbGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW50ZXIoYXJyYXksIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBsZWF2ZSBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnTGVhdmVIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0xlYXZlKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgcmV0dXJuIHRydWUgaWYgYXJyYXkgYW5kIGluZGV4IGlzID09PSB3aXRoIGFycmF5IGFuZCBpbmRleCBvZiBvbkRyYWdFbnRlclxuICAgKlxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJDaGVjayhhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKFxuICAgICAgKGFycmF5ID09PSB0aGlzLm9uRHJhZ0VudGVyLmFycmF5KSAmJlxuICAgICAgKChpbmRleCA9PT0gdGhpcy5vbkRyYWdFbnRlci5pbmRleCkgfHwgKGluZGV4ID09PSAtMSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgd2lkZ2V0IGVsZW1lbnQgZnJvbSB0eXBlIGFycmF5IGluIGlkeCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICByZW1vdmUodHlwZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKHR5cGUsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHdpZGdldCBlbGVtZW50IGludG8gdHlwZSBhcnJheSBpbiBpZHggcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgYWRkVG9MaXN0KGFycmF5VG86IHN0cmluZywgZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4sIHRvPzogbnVtYmVyKSB7XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2VydmljZS5zZXRPcmlnaW4oYXJyYXlUbyk7XG4gICAgY29uc3QgaXRlbURhdGEgPSBldmVudC5pdGVtLmRhdGEgYXMgQWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhO1xuICAgIGlmIChpdGVtRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VydmljZS5yZW1vdmVXaWRnZXRUb0NvbHVtbihpdGVtRGF0YS5mcm9tQ29sdW1uLCBpdGVtRGF0YS5mcm9tSW5kZXghKTtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gaXRlbURhdGEud2lkZ2V0ITtcbiAgICB9IGVsc2UgaWYgKGl0ZW1EYXRhLndpZGdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbW92ZShpdGVtRGF0YS5hcnJheUZyb20hLCBpdGVtRGF0YS5mcm9tISk7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBpdGVtRGF0YS53aWRnZXQ7XG4gICAgfSBlbHNlIGlmIChpdGVtRGF0YS5qc29uICE9IG51bGwgJiYgaXRlbURhdGEuanNvbiAhPT0gJycpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGRlZXBDb3B5KGl0ZW1EYXRhLmpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogKEFqZldpZGdldFR5cGUgYXMgYW55KVtpdGVtRGF0YS53aWRnZXRUeXBlIV19O1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcbiAgICB9XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGFycmF5VG8pIHtcbiAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZEhlYWRlcldpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQsIHRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5hZGRDb250ZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkZm9vdGVyV2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uRHJhZ0xlYXZlSGFuZGxlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faGVhZGVyV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyV2lkZ2V0c1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5oZWFkZXJXaWRnZXRzID0geC53aWRnZXRzO1xuICAgICAgfSk7XG4gICAgdGhpcy5fY29udGVudFdpZGdldHNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRXaWRnZXRzXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLmNvbnRlbnRXaWRnZXRzID0geC53aWRnZXRzO1xuICAgICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyV2lkZ2V0c1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5mb290ZXJXaWRnZXRzID0geC53aWRnZXRzO1xuICAgICAgfSk7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICAgIH0pO1xuICAgIHRoaXMuX2ZpeGVkWm9vbVN1YiA9IHRoaXMuX3NlcnZpY2UuZml4ZWRab29tXG4gICAgICAuc3Vic2NyaWJlKGJvb2wgPT4ge1xuICAgICAgICB0aGlzLmZpeGVkWm9vbSA9IGJvb2w7XG4gICAgICB9KTtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnRW50ZXJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25EcmFnRW50ZXIgPSB4O1xuICAgICAgfSk7XG4gICAgdGhpcy5fb25PdmVyU3ViID0gdGhpcy5fc2VydmljZS5vbk92ZXJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIHRoaXMub25PdmVyID0geDtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuX2NkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIFtcbiAgICAgIHRoaXMuX2hlYWRlcldpZGdldHNTdWIsIHRoaXMuX2NvbnRlbnRXaWRnZXRzU3ViLCB0aGlzLl9mb290ZXJXaWRnZXRzU3ViLFxuICAgICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiwgdGhpcy5fb25EcmFnZ2VkU3ViLCB0aGlzLl9maXhlZFpvb21TdWIsXG4gICAgICB0aGlzLl9vbk92ZXJTdWIsIHRoaXMuX29uRHJhZ0VudGVyU3ViXG4gICAgXS5mb3JFYWNoKHMgPT4geyBzLnVuc3Vic2NyaWJlKCk7IH0pO1xuICB9XG59XG4iXX0=