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
let AjfReportBuilderContent = /** @class */ (() => {
    class AjfReportBuilderContent {
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
    }
    AjfReportBuilderContent.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-content',
                    template: "<div\n  class=\"ajf-overlay\"\n  [ngClass]=\"{'ajf-drag-mode': onDragged, 'ajf-zoom-mode': fixedZoom}\"\n  [applyStyles]=\"reportStyles|async\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\">\n  <div\n    class=\"ajf-header\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"(headerStyles|async)\">\n    <mat-list *ngFor=\"let t of headerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('header', $event, i);\"\n          (dragenter)=\"onDragEnterHandler('header', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t,fromIndex: i,arrayFrom: 'header', dropZones: ['widget','column']}\"\n          [style.display]=\"(showActions || onDragged)? 'block' : 'none'\"\n          [from]=\"'header'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler();\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'header'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': true}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['header','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('header', $event)\"\n        (dragenter)=\"onDragEnterHandler('header', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n    </div>\n  </div>\n  <div\n    class=\"ajf-content\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"contentStyles|async\">\n    <mat-list *ngFor=\"let t of contentWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('content', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('content', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'content', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'content'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'content'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['content','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('content', $event)\"\n        (dragenter)=\"onDragEnterHandler('content', contentWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n  </div>\n  <div\n    class=\"ajf-footer\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"footerStyles|async\">\n    <mat-list *ngFor=\"let t of footerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('footer', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('footer', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'footer', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'footer'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'footer'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['footer','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('footer', $event)\"\n        (dragenter)=\"onDragEnterHandler('footer', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: { '(mouseover)': 'onMouseOver()', '(mouseleave)': 'onMouseLeave()' },
                    styles: ["ajf-report-builder-content{text-align:center;display:block;margin-bottom:300px}ajf-report-builder-content .ajf-overlay.ajf-drag-mode{max-height:700px;margin-top:50px;background-color:beige}ajf-report-builder-content .ajf-drag-mode{overflow:scroll;zoom:50%}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-content,ajf-report-builder-content .ajf-drag-mode .ajf-footer{margin-bottom:20px;border:23px solid rgba(66,134,244,.2)}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{width:auto;background-color:rgba(66,134,244,.2);border:23px solid #fff;position:relative;min-height:50px !important;z-index:0;opacity:1}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(66,134,244,.2) !important;border:23px solid #fff !important}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-footer{border:23px solid rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-drop-zone-container{background-color:#000;border:16px solid #fff;position:relative;opacity:0;z-index:0;min-height:50px !important;display:none !important}ajf-report-builder-content .ajf-zoom-mode{zoom:50%}ajf-report-builder-content .ajf-header,ajf-report-builder-content .ajf-content,ajf-report-builder-content .ajf-footer{height:100%;min-height:50px;position:relative;text-align:center;display:block}ajf-report-builder-content .ajf-header .mat-list,ajf-report-builder-content .ajf-content .mat-list,ajf-report-builder-content .ajf-footer .mat-list{padding:0}ajf-report-builder-content .ajf-header .ajf-zoom:hover,ajf-report-builder-content .ajf-content .ajf-zoom:hover,ajf-report-builder-content .ajf-footer .ajf-zoom:hover{padding-bottom:100px;overflow-y:scroll}ajf-report-builder-content .ajf-content:hover{background-color:rgba(66,134,244,.2) !important}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-footer:hover{background-color:rgba(255,102,102,.4)}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-content:hover,ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-is-on-over{border:3px dotted #3a7999}ajf-report-builder-content .ajf-header:hover label,ajf-report-builder-content .ajf-content:hover label,ajf-report-builder-content .ajf-footer:hover label,ajf-report-builder-content .ajf-is-on-over label{visibility:visible !important;opacity:.4;display:block !important}ajf-report-builder-content .ajf-header:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-content:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-footer:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-is-on-over .ajf-drop-zone-container{display:block !important}ajf-report-builder-content .ajf-header:hover mat-list button,ajf-report-builder-content .ajf-content:hover mat-list button,ajf-report-builder-content .ajf-footer:hover mat-list button,ajf-report-builder-content .ajf-is-on-over mat-list button{display:inline}ajf-report-builder-content .ajf-my-content{width:100%;white-space:nowrap;overflow-y:auto}ajf-report-builder-content .ajf-show,ajf-report-builder-content .ajf-on-drag-over{opacity:1 !important;z-index:10}ajf-report-builder-content mat-list{position:relative;display:block}\n"]
                },] }
    ];
    AjfReportBuilderContent.ctorParameters = () => [
        { type: AjfReportBuilderService },
        { type: ChangeDetectorRef }
    ];
    return AjfReportBuilderContent;
})();
export { AjfReportBuilderContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBdUIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFHVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHckQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFakU7Ozs7R0FJRztBQUNIO0lBQUEsTUFRYSx1QkFBdUI7UUE4RmxDLFlBQW9CLFFBQWlDLEVBQVUsTUFBeUI7WUFBcEUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtZQXRFeEYsMkNBQTJDO1lBQzNDLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFHbEI7Ozs7ZUFJRztZQUNILGNBQVMsR0FBRyxLQUFLLENBQUM7WUFFbEIsc0RBQXNEO1lBQ3RELGdCQUFXLEdBQVEsRUFBRSxDQUFDO1lBR3RCLFNBQUksR0FBRyxLQUFLLENBQUM7WUFHYix1REFBdUQ7WUFDdkQsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1lBUWhDLHdEQUF3RDtZQUN4RCxtQkFBYyxHQUFnQixFQUFFLENBQUM7WUFTakMsdURBQXVEO1lBQ3ZELGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztZQUdoQyxXQUFNLEdBQVksS0FBSyxDQUFDO1lBU3hCLDZCQUE2QjtZQUM3QixrQkFBYSxHQUFtQixJQUFJLENBQUM7WUFHckM7Ozs7ZUFJ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RSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMvRSxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQzs7O2dCQXRRRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsaW9LQUEyQjtvQkFFM0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxJQUFJLEVBQUUsRUFBQyxhQUFhLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBQzs7aUJBQ3pFOzs7Z0JBZE8sdUJBQXVCO2dCQVQ3QixpQkFBaUI7O0lBdVJuQiw4QkFBQztLQUFBO1NBL1BZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZTdHlsZXMsIEFqZldpZGdldCwgQWpmV2lkZ2V0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqICBtYW5hZ2UgdGhlIGNvbnRlbnQgcGFnZVxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZVVybDogJ2NvbnRlbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb250ZW50LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeycobW91c2VvdmVyKSc6ICdvbk1vdXNlT3ZlcigpJywgJyhtb3VzZWxlYXZlKSc6ICdvbk1vdXNlTGVhdmUoKSd9XG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xuICBvbk1vdXNlT3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dBY3Rpb25zID0gdHJ1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLm92ZXJTdGFydGVkKCk7XG4gIH1cblxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5zaG93QWN0aW9ucyA9IGZhbHNlO1xuICAgIHRoaXMuX3NlcnZpY2Uub3ZlckVuZGVkKCk7XG4gIH1cblxuICBjYW5Ecm9wUHJlZGljYXRlKGRyb3Bab25lczogc3RyaW5nW10pOiAoaXRlbTogQ2RrRHJhZzxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+KSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gaXRlbSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uZGF0YS5kcm9wWm9uZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRyb3Bab25lcy5pbmRleE9mKGl0ZW0uZGF0YS5kcm9wWm9uZXNbaV0pID4gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH1cblxuICByZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG5cbiAgLyoqXG4gICAqICBvYnNlcnZlIHRoZSBzdGF0dXMgb2YgdGhlIGZpeGVkIHpvb21cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBmaXhlZFpvb20gPSBmYWxzZTtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiB3aWRnZXQgaXMgaW4gZHJhZyBlbnRlciBzdGF0dXNcbiAgb25EcmFnRW50ZXI6IGFueSA9IHt9O1xuXG5cbiAgc2hvdyA9IGZhbHNlO1xuXG5cbiAgLy8gdGhpcyBhcnJheSBjb250YWlucyBhbGwgd2lkZ2V0IGxvY2F0ZSBpbiBoZWFkZXIgem9uZVxuICBoZWFkZXJXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgY3NzIHN0eWxlIG9mIGhlYWRlclxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGhlYWRlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8vIHRoaXMgYXJyYXkgY29udGFpbnMgYWxsIHdpZGdldCBsb2NhdGUgaW4gY29udGVudCB6b25lXG4gIGNvbnRlbnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBjc3Mgc3R5bGUgb2YgY29udGVudFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGNvbnRlbnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvLyB0aGlzIGFycmF5IGNvbnRhaW5zIGFsbCB3aWRnZXQgbG9jYXRlIGluIGZvb3RlciB6b25lXG4gIGZvb3RlcldpZGdldHM6IEFqZldpZGdldFtdID0gW107XG5cblxuICBvbk92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGNzcyBzdHlsZSBvZiBmb290ZXJcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBmb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuXG4gIC8vIHRoaXMgaXMgdGhlIGN1cnJlbnQgd2lkZ2V0XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcblxuXG4gIC8qKlxuICAgKiBpZiB0cnVlIG1vdXNlIGV2ZW50IGlzIG9uIGRyYWdnZWQgc3RhdHVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgc2hvd0FjdGlvbnMgPSBmYWxzZTtcblxuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZml4ZWRab29tU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uRHJhZ0VudGVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0c1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbk92ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLCBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmhlYWRlclN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzO1xuICAgIHRoaXMuY29udGVudFN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuY29udGVudFN0eWxlcztcbiAgICB0aGlzLmZvb3RlclN0eWxlcyA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgaXNMYXlvdXQod2lkZ2V0OiBBamZXaWRnZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gd2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0O1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHMgIT0gbnVsbCkge1xuICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zZXJ2aWNlLmRyYWdTdGFydGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgZW5kIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbmRIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VuZGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIGVudGVyIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbnRlckhhbmRsZXIoYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbnRlcihhcnJheSwgaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGxlYXZlIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdMZWF2ZUhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnTGVhdmUoKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqICByZXR1cm4gdHJ1ZSBpZiBhcnJheSBhbmQgaW5kZXggaXMgPT09IHdpdGggYXJyYXkgYW5kIGluZGV4IG9mIG9uRHJhZ0VudGVyXG4gICAqXG4gICAqIEBwYXJhbSBhcnJheVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbnRlckNoZWNrKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoKGFycmF5ID09PSB0aGlzLm9uRHJhZ0VudGVyLmFycmF5KSAmJlxuICAgICAgICAoKGluZGV4ID09PSB0aGlzLm9uRHJhZ0VudGVyLmluZGV4KSB8fCAoaW5kZXggPT09IC0xKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB3aWRnZXQgZWxlbWVudCBmcm9tIHR5cGUgYXJyYXkgaW4gaWR4IHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHJlbW92ZSh0eXBlOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmUodHlwZSwgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgd2lkZ2V0IGVsZW1lbnQgaW50byB0eXBlIGFycmF5IGluIGlkeCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBhZGRUb0xpc3QoYXJyYXlUbzogc3RyaW5nLCBldmVudDogQ2RrRHJhZ0Ryb3A8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPiwgdG8/OiBudW1iZXIpIHtcbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldE9yaWdpbihhcnJheVRvKTtcbiAgICBjb25zdCBpdGVtRGF0YSA9IGV2ZW50Lml0ZW0uZGF0YSBhcyBBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE7XG4gICAgaWYgKGl0ZW1EYXRhLmZyb21Db2x1bW4gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS5yZW1vdmVXaWRnZXRUb0NvbHVtbihpdGVtRGF0YS5mcm9tQ29sdW1uLCBpdGVtRGF0YS5mcm9tSW5kZXghKTtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGl0ZW1EYXRhLndpZGdldCE7XG4gICAgfSBlbHNlIGlmIChpdGVtRGF0YS53aWRnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5yZW1vdmUoaXRlbURhdGEuYXJyYXlGcm9tISwgaXRlbURhdGEuZnJvbSEpO1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gaXRlbURhdGEud2lkZ2V0O1xuICAgIH0gZWxzZSBpZiAoaXRlbURhdGEuanNvbiAhPSBudWxsICYmIGl0ZW1EYXRhLmpzb24gIT09ICcnKSB7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBkZWVwQ29weShpdGVtRGF0YS5qc29uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9iaiA9IHsnd2lkZ2V0VHlwZSc6IChBamZXaWRnZXRUeXBlIGFzIGFueSlbaXRlbURhdGEud2lkZ2V0VHlwZSFdfTtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGRlZXBDb3B5KG9iaik7XG4gICAgfVxuICAgIHRoaXMub25EcmFnRW5kSGFuZGxlcigpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgIT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChhcnJheVRvKSB7XG4gICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5hZGRIZWFkZXJXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0LCB0byk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkQ29udGVudFdpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQsIHRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZGZvb3RlcldpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQsIHRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5vbkRyYWdMZWF2ZUhhbmRsZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2hlYWRlcldpZGdldHNTdWIgPSB0aGlzLl9zZXJ2aWNlLmhlYWRlcldpZGdldHMuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5oZWFkZXJXaWRnZXRzID0geC53aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzU3ViID0gdGhpcy5fc2VydmljZS5jb250ZW50V2lkZ2V0cy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnRXaWRnZXRzID0geC53aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMuX2Zvb3RlcldpZGdldHNTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvb3RlcldpZGdldHMuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5mb290ZXJXaWRnZXRzID0geC53aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnZ2VkLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICB9KTtcbiAgICB0aGlzLl9maXhlZFpvb21TdWIgPSB0aGlzLl9zZXJ2aWNlLmZpeGVkWm9vbS5zdWJzY3JpYmUoYm9vbCA9PiB7XG4gICAgICB0aGlzLmZpeGVkWm9vbSA9IGJvb2w7XG4gICAgfSk7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ0VudGVyLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMub25EcmFnRW50ZXIgPSB4O1xuICAgIH0pO1xuICAgIHRoaXMuX29uT3ZlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25PdmVyLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMub25PdmVyID0geDtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICB0aGlzLl9jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBbdGhpcy5faGVhZGVyV2lkZ2V0c1N1YiwgdGhpcy5fY29udGVudFdpZGdldHNTdWIsIHRoaXMuX2Zvb3RlcldpZGdldHNTdWIsXG4gICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIsIHRoaXMuX29uRHJhZ2dlZFN1YiwgdGhpcy5fZml4ZWRab29tU3ViLCB0aGlzLl9vbk92ZXJTdWIsXG4gICAgIHRoaXMuX29uRHJhZ0VudGVyU3ViXVxuICAgICAgICAuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICB9XG59XG4iXX0=