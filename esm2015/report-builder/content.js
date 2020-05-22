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
import { __decorate, __metadata } from "tslib";
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
let AjfReportBuilderContent = /** @class */ (() => {
    let AjfReportBuilderContent = class AjfReportBuilderContent {
        constructor(_service, _cdRef) {
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
        onMouseOver() {
            this.showActions = true;
            this._service.overStarted();
        }
        onMouseLeave() {
            this.showActions = false;
            this._service.overEnded();
        }
        canDropPredicate(dropZones) {
            return item => {
                for (let i = 0; i < item.data.dropZones.length; i++) {
                    if (dropZones.indexOf(item.data.dropZones[i]) > -1) {
                        return true;
                    }
                }
                return false;
            };
        }
        isLayout(widget) {
            return widget.widgetType === AjfWidgetType.Layout;
        }
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragStartHandler() {
            let s = timer(200).subscribe(() => {
                if (s != null) {
                    s.unsubscribe();
                }
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
        /**
         *  sign the enter of mouse drag
         *
         * @memberOf AjfReportBuilderContent
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
         * @memberOf AjfReportBuilderContent
         */
        onDragLeaveHandler() {
            this._service.dragLeave();
        }
        /**
         *  return true if array and index is === with array and index of onDragEnter
         *
         * @param array
         * @param index
         *
         * @memberOf AjfReportBuilderContent
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
         * @param type can be header content or footer
         * @param idx
         *
         * @memberOf AjfReportBuilderContent
         */
        remove(type, idx) {
            this._service.remove(type, idx);
        }
        /**
         * add widget element into type array in idx position
         *
         * @param type
         * @param event
         *
         * @memberOf AjfReportBuilderContent
         */
        addToList(arrayTo, event, to) {
            this.onDragEndHandler();
            this._service.setOrigin(arrayTo);
            const itemData = event.item.data;
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
                let obj = { 'widgetType': AjfWidgetType[itemData.widgetType] };
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
        ngOnInit() {
            this._headerWidgetsSub = this._service.headerWidgets.subscribe(x => {
                this.headerWidgets = x.widgets;
            });
            this._contentWidgetsSub = this._service.contentWidgets.subscribe(x => {
                this.contentWidgets = x.widgets;
            });
            this._footerWidgetsSub = this._service.footerWidgets.subscribe(x => {
                this.footerWidgets = x.widgets;
            });
            this._onDraggedSub = this._service.onDragged.subscribe(x => {
                this.onDragged = x;
            });
            this._fixedZoomSub = this._service.fixedZoom.subscribe(bool => {
                this.fixedZoom = bool;
            });
            this._onDragEnterSub = this._service.onDragEnter.subscribe(x => {
                this.onDragEnter = x;
            });
            this._onOverSub = this._service.onOver.subscribe(x => {
                this.onOver = x;
            });
        }
        ngAfterViewChecked() {
            this._cdRef.detectChanges();
        }
        ngOnDestroy() {
            [this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
                this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub, this._onOverSub,
                this._onDragEnterSub]
                .forEach(s => {
                s.unsubscribe();
            });
        }
    };
    AjfReportBuilderContent = __decorate([
        Component({
            selector: 'ajf-report-builder-content',
            template: "<div\n  class=\"ajf-overlay\"\n  [ngClass]=\"{'ajf-drag-mode': onDragged, 'ajf-zoom-mode': fixedZoom}\"\n  [applyStyles]=\"reportStyles|async\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\">\n  <div\n    class=\"ajf-header\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"(headerStyles|async)\">\n    <mat-list *ngFor=\"let t of headerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('header', $event, i);\"\n          (dragenter)=\"onDragEnterHandler('header', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t,fromIndex: i,arrayFrom: 'header', dropZones: ['widget','column']}\"\n          [style.display]=\"(showActions || onDragged)? 'block' : 'none'\"\n          [from]=\"'header'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler();\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'header'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': true}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['header','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('header', $event)\"\n        (dragenter)=\"onDragEnterHandler('header', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n    </div>\n  </div>\n  <div\n    class=\"ajf-content\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"contentStyles|async\">\n    <mat-list *ngFor=\"let t of contentWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('content', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('content', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'content', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'content'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'content'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['content','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('content', $event)\"\n        (dragenter)=\"onDragEnterHandler('content', contentWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n  </div>\n  <div\n    class=\"ajf-footer\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"footerStyles|async\">\n    <mat-list *ngFor=\"let t of footerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('footer', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('footer', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'footer', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'footer'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'footer'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['footer','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('footer', $event)\"\n        (dragenter)=\"onDragEnterHandler('footer', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { '(mouseover)': 'onMouseOver()', '(mouseleave)': 'onMouseLeave()' },
            styles: ["ajf-report-builder-content{text-align:center;display:block;margin-bottom:300px}ajf-report-builder-content .ajf-overlay.ajf-drag-mode{max-height:700px;margin-top:50px;background-color:beige}ajf-report-builder-content .ajf-drag-mode{overflow:scroll;zoom:50%}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-content,ajf-report-builder-content .ajf-drag-mode .ajf-footer{margin-bottom:20px;border:23px solid rgba(66,134,244,.2)}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{width:auto;background-color:rgba(66,134,244,.2);border:23px solid #fff;position:relative;min-height:50px !important;z-index:0;opacity:1}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(66,134,244,.2) !important;border:23px solid #fff !important}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-footer{border:23px solid rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-drop-zone-container{background-color:#000;border:16px solid #fff;position:relative;opacity:0;z-index:0;min-height:50px !important;display:none !important}ajf-report-builder-content .ajf-zoom-mode{zoom:50%}ajf-report-builder-content .ajf-header,ajf-report-builder-content .ajf-content,ajf-report-builder-content .ajf-footer{height:100%;min-height:50px;position:relative;text-align:center;display:block}ajf-report-builder-content .ajf-header .mat-list,ajf-report-builder-content .ajf-content .mat-list,ajf-report-builder-content .ajf-footer .mat-list{padding:0}ajf-report-builder-content .ajf-header .ajf-zoom:hover,ajf-report-builder-content .ajf-content .ajf-zoom:hover,ajf-report-builder-content .ajf-footer .ajf-zoom:hover{padding-bottom:100px;overflow-y:scroll}ajf-report-builder-content .ajf-content:hover{background-color:rgba(66,134,244,.2) !important}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-footer:hover{background-color:rgba(255,102,102,.4)}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-content:hover,ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-is-on-over{border:3px dotted #3a7999}ajf-report-builder-content .ajf-header:hover label,ajf-report-builder-content .ajf-content:hover label,ajf-report-builder-content .ajf-footer:hover label,ajf-report-builder-content .ajf-is-on-over label{visibility:visible !important;opacity:.4;display:block !important}ajf-report-builder-content .ajf-header:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-content:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-footer:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-is-on-over .ajf-drop-zone-container{display:block !important}ajf-report-builder-content .ajf-header:hover mat-list button,ajf-report-builder-content .ajf-content:hover mat-list button,ajf-report-builder-content .ajf-footer:hover mat-list button,ajf-report-builder-content .ajf-is-on-over mat-list button{display:inline}ajf-report-builder-content .ajf-my-content{width:100%;white-space:nowrap;overflow-y:auto}ajf-report-builder-content .ajf-show,ajf-report-builder-content .ajf-on-drag-over{opacity:1 !important;z-index:10}ajf-report-builder-content mat-list{position:relative;display:block}\n"]
        }),
        __metadata("design:paramtypes", [AjfReportBuilderService, ChangeDetectorRef])
    ], AjfReportBuilderContent);
    return AjfReportBuilderContent;
})();
export { AjfReportBuilderContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQXVCLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBR1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3JELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFOzs7O0dBSUc7QUFTSDtJQUFBLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO1FBOEZsQyxZQUFvQixRQUFpQyxFQUFVLE1BQXlCO1lBQXBFLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7WUF0RXhGLDJDQUEyQztZQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1lBR2xCOzs7O2VBSUc7WUFDSCxjQUFTLEdBQUcsS0FBSyxDQUFDO1lBRWxCLHNEQUFzRDtZQUN0RCxnQkFBVyxHQUFRLEVBQUUsQ0FBQztZQUd0QixTQUFJLEdBQUcsS0FBSyxDQUFDO1lBR2IsdURBQXVEO1lBQ3ZELGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztZQVFoQyx3REFBd0Q7WUFDeEQsbUJBQWMsR0FBZ0IsRUFBRSxDQUFDO1lBU2pDLHVEQUF1RDtZQUN2RCxrQkFBYSxHQUFnQixFQUFFLENBQUM7WUFHaEMsV0FBTSxHQUFZLEtBQUssQ0FBQztZQVN4Qiw2QkFBNkI7WUFDN0Isa0JBQWEsR0FBbUIsSUFB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SSxDQUFDLGlCQUFpQjtnQkFDdkUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDakIsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNYLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNULENBQUM7S0FDRixDQUFBO0lBL1BZLHVCQUF1QjtRQVJuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLGlvS0FBMkI7WUFFM0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07WUFDL0MsSUFBSSxFQUFFLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUM7O1NBQ3pFLENBQUM7eUNBK0Y4Qix1QkFBdUIsRUFBa0IsaUJBQWlCO09BOUY3RSx1QkFBdUIsQ0ErUG5DO0lBQUQsOEJBQUM7S0FBQTtTQS9QWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmU3R5bGVzLCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgdGltZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1kcmFnLWRhdGEnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiAgbWFuYWdlIHRoZSBjb250ZW50IHBhZ2VcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdjb250ZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29udGVudC5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHsnKG1vdXNlb3ZlciknOiAnb25Nb3VzZU92ZXIoKScsICcobW91c2VsZWF2ZSknOiAnb25Nb3VzZUxlYXZlKCknfVxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ29udGVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcbiAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93QWN0aW9ucyA9IHRydWU7XG4gICAgdGhpcy5fc2VydmljZS5vdmVyU3RhcnRlZCgpO1xuICB9XG5cbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0FjdGlvbnMgPSBmYWxzZTtcbiAgICB0aGlzLl9zZXJ2aWNlLm92ZXJFbmRlZCgpO1xuICB9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShkcm9wWm9uZXM6IHN0cmluZ1tdKTogKGl0ZW06IENka0RyYWc8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPikgPT4gYm9vbGVhbiB7XG4gICAgcmV0dXJuIGl0ZW0gPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmRhdGEuZHJvcFpvbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkcm9wWm9uZXMuaW5kZXhPZihpdGVtLmRhdGEuZHJvcFpvbmVzW2ldKSA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgcmVwb3J0U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuXG4gIC8qKlxuICAgKiAgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHRoZSBmaXhlZCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgZml4ZWRab29tID0gZmFsc2U7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgd2lkZ2V0IGlzIGluIGRyYWcgZW50ZXIgc3RhdHVzXG4gIG9uRHJhZ0VudGVyOiBhbnkgPSB7fTtcblxuXG4gIHNob3cgPSBmYWxzZTtcblxuXG4gIC8vIHRoaXMgYXJyYXkgY29udGFpbnMgYWxsIHdpZGdldCBsb2NhdGUgaW4gaGVhZGVyIHpvbmVcbiAgaGVhZGVyV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGNzcyBzdHlsZSBvZiBoZWFkZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBoZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGFycmF5IGNvbnRhaW5zIGFsbCB3aWRnZXQgbG9jYXRlIGluIGNvbnRlbnQgem9uZVxuICBjb250ZW50V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgY3NzIHN0eWxlIG9mIGNvbnRlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBjb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBhcnJheSBjb250YWlucyBhbGwgd2lkZ2V0IGxvY2F0ZSBpbiBmb290ZXIgem9uZVxuICBmb290ZXJXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG5cbiAgb25PdmVyOiBib29sZWFuID0gZmFsc2U7XG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBjc3Mgc3R5bGUgb2YgZm9vdGVyXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cblxuICAvLyB0aGlzIGlzIHRoZSBjdXJyZW50IHdpZGdldFxuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG5cblxuICAvKipcbiAgICogaWYgdHJ1ZSBtb3VzZSBldmVudCBpcyBvbiBkcmFnZ2VkIHN0YXR1c1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHNob3dBY3Rpb25zID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25PdmVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSwgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5oZWFkZXJTdHlsZXMgPSB0aGlzLl9zZXJ2aWNlLmhlYWRlclN0eWxlcztcbiAgICB0aGlzLmNvbnRlbnRTdHlsZXMgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRTdHlsZXM7XG4gICAgdGhpcy5mb290ZXJTdHlsZXMgPSB0aGlzLl9zZXJ2aWNlLmZvb3RlclN0eWxlcztcbiAgfVxuXG4gIGlzTGF5b3V0KHdpZGdldDogQWpmV2lkZ2V0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dDtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgc3RhcnQgb2YgbW91c2UgZHJhZyB3aXRoIDIwMCBtcyBvZiBkZWxheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ1N0YXJ0SGFuZGxlcigpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmIChzICE9IG51bGwpIHtcbiAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2VydmljZS5kcmFnU3RhcnRlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBlbnRlciBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJIYW5kbGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXJ8dW5kZWZpbmVkKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW50ZXIoYXJyYXksIGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBsZWF2ZSBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnTGVhdmVIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0xlYXZlKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgcmV0dXJuIHRydWUgaWYgYXJyYXkgYW5kIGluZGV4IGlzID09PSB3aXRoIGFycmF5IGFuZCBpbmRleCBvZiBvbkRyYWdFbnRlclxuICAgKlxuICAgKiBAcGFyYW0gYXJyYXlcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW50ZXJDaGVjayhhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKChhcnJheSA9PT0gdGhpcy5vbkRyYWdFbnRlci5hcnJheSkgJiZcbiAgICAgICAgKChpbmRleCA9PT0gdGhpcy5vbkRyYWdFbnRlci5pbmRleCkgfHwgKGluZGV4ID09PSAtMSkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgd2lkZ2V0IGVsZW1lbnQgZnJvbSB0eXBlIGFycmF5IGluIGlkeCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdHlwZSBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICByZW1vdmUodHlwZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKHR5cGUsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHdpZGdldCBlbGVtZW50IGludG8gdHlwZSBhcnJheSBpbiBpZHggcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgYWRkVG9MaXN0KGFycmF5VG86IHN0cmluZywgZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4sIHRvPzogbnVtYmVyKSB7XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2VydmljZS5zZXRPcmlnaW4oYXJyYXlUbyk7XG4gICAgY29uc3QgaXRlbURhdGEgPSBldmVudC5pdGVtLmRhdGEgYXMgQWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhO1xuICAgIGlmIChpdGVtRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlV2lkZ2V0VG9Db2x1bW4oaXRlbURhdGEuZnJvbUNvbHVtbiwgaXRlbURhdGEuZnJvbUluZGV4ISk7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBpdGVtRGF0YS53aWRnZXQhO1xuICAgIH0gZWxzZSBpZiAoaXRlbURhdGEud2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMucmVtb3ZlKGl0ZW1EYXRhLmFycmF5RnJvbSEsIGl0ZW1EYXRhLmZyb20hKTtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGl0ZW1EYXRhLndpZGdldDtcbiAgICB9IGVsc2UgaWYgKGl0ZW1EYXRhLmpzb24gIT0gbnVsbCAmJiBpdGVtRGF0YS5qc29uICE9PSAnJykge1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gZGVlcENvcHkoaXRlbURhdGEuanNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvYmogPSB7J3dpZGdldFR5cGUnOiAoQWpmV2lkZ2V0VHlwZSBhcyBhbnkpW2l0ZW1EYXRhLndpZGdldFR5cGUhXX07XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuICAgIH1cbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHN3aXRjaCAoYXJyYXlUbykge1xuICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkSGVhZGVyV2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZENvbnRlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0LCB0byk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5hZGRmb290ZXJXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0LCB0byk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25EcmFnTGVhdmVIYW5kbGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9oZWFkZXJXaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5oZWFkZXJXaWRnZXRzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuaGVhZGVyV2lkZ2V0cyA9IHgud2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLl9jb250ZW50V2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuY29udGVudFdpZGdldHMuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5jb250ZW50V2lkZ2V0cyA9IHgud2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5mb290ZXJXaWRnZXRzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuZm9vdGVyV2lkZ2V0cyA9IHgud2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5fZml4ZWRab29tU3ViID0gdGhpcy5fc2VydmljZS5maXhlZFpvb20uc3Vic2NyaWJlKGJvb2wgPT4ge1xuICAgICAgdGhpcy5maXhlZFpvb20gPSBib29sO1xuICAgIH0pO1xuICAgIHRoaXMuX29uRHJhZ0VudGVyU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdFbnRlci5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ0VudGVyID0geDtcbiAgICB9KTtcbiAgICB0aGlzLl9vbk92ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uT3Zlci5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uT3ZlciA9IHg7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgdGhpcy5fY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgW3RoaXMuX2hlYWRlcldpZGdldHNTdWIsIHRoaXMuX2NvbnRlbnRXaWRnZXRzU3ViLCB0aGlzLl9mb290ZXJXaWRnZXRzU3ViLFxuICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLCB0aGlzLl9vbkRyYWdnZWRTdWIsIHRoaXMuX2ZpeGVkWm9vbVN1YiwgdGhpcy5fb25PdmVyU3ViLFxuICAgICB0aGlzLl9vbkRyYWdFbnRlclN1Yl1cbiAgICAgICAgLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcbiAgfVxufVxuIl19