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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBdUIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFHVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHckQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFakU7Ozs7R0FJRztBQVNILE1BQU0sT0FBTyx1QkFBdUI7SUE4RmxDLFlBQW9CLFFBQWlDLEVBQVUsTUFBeUI7UUFBcEUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQXRFeEYsMkNBQTJDO1FBQzNDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHbEI7Ozs7V0FJRztRQUNILGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFbEIsc0RBQXNEO1FBQ3RELGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBR3RCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFHYix1REFBdUQ7UUFDdkQsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBUWhDLHdEQUF3RDtRQUN4RCxtQkFBYyxHQUFnQixFQUFFLENBQUM7UUFTakMsdURBQXVEO1FBQ3ZELGtCQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUdoQyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBU3hCLDZCQUE2QjtRQUM3QixrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFHckM7Ozs7V0FJ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QUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWCxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDOzs7WUF0UUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLGlvS0FBMkI7Z0JBRTNCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUM7O2FBQ3pFOzs7WUFkTyx1QkFBdUI7WUFUN0IsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlN0eWxlcywgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGF9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItZHJhZy1kYXRhJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogIG1hbmFnZSB0aGUgY29udGVudCBwYWdlXG4gKlxuICogQGV4cG9ydFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnY29udGVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbnRlbnQuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBob3N0OiB7Jyhtb3VzZW92ZXIpJzogJ29uTW91c2VPdmVyKCknLCAnKG1vdXNlbGVhdmUpJzogJ29uTW91c2VMZWF2ZSgpJ31cbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG4gIG9uTW91c2VPdmVyKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0FjdGlvbnMgPSB0cnVlO1xuICAgIHRoaXMuX3NlcnZpY2Uub3ZlclN0YXJ0ZWQoKTtcbiAgfVxuXG4gIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dBY3Rpb25zID0gZmFsc2U7XG4gICAgdGhpcy5fc2VydmljZS5vdmVyRW5kZWQoKTtcbiAgfVxuXG4gIGNhbkRyb3BQcmVkaWNhdGUoZHJvcFpvbmVzOiBzdHJpbmdbXSk6IChpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiBpdGVtID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5kYXRhLmRyb3Bab25lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZHJvcFpvbmVzLmluZGV4T2YoaXRlbS5kYXRhLmRyb3Bab25lc1tpXSkgPiAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIHJlcG9ydFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cblxuICAvKipcbiAgICogIG9ic2VydmUgdGhlIHN0YXR1cyBvZiB0aGUgZml4ZWQgem9vbVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGZpeGVkWm9vbSA9IGZhbHNlO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIHdpZGdldCBpcyBpbiBkcmFnIGVudGVyIHN0YXR1c1xuICBvbkRyYWdFbnRlcjogYW55ID0ge307XG5cblxuICBzaG93ID0gZmFsc2U7XG5cblxuICAvLyB0aGlzIGFycmF5IGNvbnRhaW5zIGFsbCB3aWRnZXQgbG9jYXRlIGluIGhlYWRlciB6b25lXG4gIGhlYWRlcldpZGdldHM6IEFqZldpZGdldFtdID0gW107XG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBjc3Mgc3R5bGUgb2YgaGVhZGVyXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgaGVhZGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLy8gdGhpcyBhcnJheSBjb250YWlucyBhbGwgd2lkZ2V0IGxvY2F0ZSBpbiBjb250ZW50IHpvbmVcbiAgY29udGVudFdpZGdldHM6IEFqZldpZGdldFtdID0gW107XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGNzcyBzdHlsZSBvZiBjb250ZW50XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgY29udGVudFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8vIHRoaXMgYXJyYXkgY29udGFpbnMgYWxsIHdpZGdldCBsb2NhdGUgaW4gZm9vdGVyIHpvbmVcbiAgZm9vdGVyV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuXG4gIG9uT3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgY3NzIHN0eWxlIG9mIGZvb3RlclxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGZvb3RlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG5cbiAgLy8gdGhpcyBpcyB0aGUgY3VycmVudCB3aWRnZXRcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuXG5cbiAgLyoqXG4gICAqIGlmIHRydWUgbW91c2UgZXZlbnQgaXMgb24gZHJhZ2dlZCBzdGF0dXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBzaG93QWN0aW9ucyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX29uRHJhZ2dlZFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9maXhlZFpvb21TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0c1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0c1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uT3ZlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UsIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuaGVhZGVyU3R5bGVzID0gdGhpcy5fc2VydmljZS5oZWFkZXJTdHlsZXM7XG4gICAgdGhpcy5jb250ZW50U3R5bGVzID0gdGhpcy5fc2VydmljZS5jb250ZW50U3R5bGVzO1xuICAgIHRoaXMuZm9vdGVyU3R5bGVzID0gdGhpcy5fc2VydmljZS5mb290ZXJTdHlsZXM7XG4gIH1cblxuICBpc0xheW91dCh3aWRnZXQ6IEFqZldpZGdldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQ7XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAhPSBudWxsKSB7XG4gICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2lnbiB0aGUgZW50ZXIgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VudGVySGFuZGxlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VudGVyKGFycmF5LCBpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgbGVhdmUgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0xlYXZlSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdMZWF2ZSgpO1xuICB9XG5cblxuICAvKipcbiAgICogIHJldHVybiB0cnVlIGlmIGFycmF5IGFuZCBpbmRleCBpcyA9PT0gd2l0aCBhcnJheSBhbmQgaW5kZXggb2Ygb25EcmFnRW50ZXJcbiAgICpcbiAgICogQHBhcmFtIGFycmF5XG4gICAqIEBwYXJhbSBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VudGVyQ2hlY2soYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICgoYXJyYXkgPT09IHRoaXMub25EcmFnRW50ZXIuYXJyYXkpICYmXG4gICAgICAgICgoaW5kZXggPT09IHRoaXMub25EcmFnRW50ZXIuaW5kZXgpIHx8IChpbmRleCA9PT0gLTEpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlIHdpZGdldCBlbGVtZW50IGZyb20gdHlwZSBhcnJheSBpbiBpZHggcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHR5cGUgY2FuIGJlIGhlYWRlciBjb250ZW50IG9yIGZvb3RlclxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgcmVtb3ZlKHR5cGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSh0eXBlLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB3aWRnZXQgZWxlbWVudCBpbnRvIHR5cGUgYXJyYXkgaW4gaWR4IHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBldmVudFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIGFkZFRvTGlzdChhcnJheVRvOiBzdHJpbmcsIGV2ZW50OiBDZGtEcmFnRHJvcDxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+LCB0bz86IG51bWJlcikge1xuICAgIHRoaXMub25EcmFnRW5kSGFuZGxlcigpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3JpZ2luKGFycmF5VG8pO1xuICAgIGNvbnN0IGl0ZW1EYXRhID0gZXZlbnQuaXRlbS5kYXRhIGFzIEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YTtcbiAgICBpZiAoaXRlbURhdGEuZnJvbUNvbHVtbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZVdpZGdldFRvQ29sdW1uKGl0ZW1EYXRhLmZyb21Db2x1bW4sIGl0ZW1EYXRhLmZyb21JbmRleCEpO1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gaXRlbURhdGEud2lkZ2V0ITtcbiAgICB9IGVsc2UgaWYgKGl0ZW1EYXRhLndpZGdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLnJlbW92ZShpdGVtRGF0YS5hcnJheUZyb20hLCBpdGVtRGF0YS5mcm9tISk7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBpdGVtRGF0YS53aWRnZXQ7XG4gICAgfSBlbHNlIGlmIChpdGVtRGF0YS5qc29uICE9IG51bGwgJiYgaXRlbURhdGEuanNvbiAhPT0gJycpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGRlZXBDb3B5KGl0ZW1EYXRhLmpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogKEFqZldpZGdldFR5cGUgYXMgYW55KVtpdGVtRGF0YS53aWRnZXRUeXBlIV19O1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcbiAgICB9XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPSBudWxsKSB7XG4gICAgICBzd2l0Y2ggKGFycmF5VG8pIHtcbiAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmFkZEhlYWRlcldpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQsIHRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5hZGRDb250ZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuYWRkZm9vdGVyV2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCwgdG8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uRHJhZ0xlYXZlSGFuZGxlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faGVhZGVyV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyV2lkZ2V0cy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmhlYWRlcldpZGdldHMgPSB4LndpZGdldHM7XG4gICAgfSk7XG4gICAgdGhpcy5fY29udGVudFdpZGdldHNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRXaWRnZXRzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuY29udGVudFdpZGdldHMgPSB4LndpZGdldHM7XG4gICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0c1N1YiA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyV2lkZ2V0cy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmZvb3RlcldpZGdldHMgPSB4LndpZGdldHM7XG4gICAgfSk7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgIH0pO1xuICAgIHRoaXMuX2ZpeGVkWm9vbVN1YiA9IHRoaXMuX3NlcnZpY2UuZml4ZWRab29tLnN1YnNjcmliZShib29sID0+IHtcbiAgICAgIHRoaXMuZml4ZWRab29tID0gYm9vbDtcbiAgICB9KTtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnRW50ZXIuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbkRyYWdFbnRlciA9IHg7XG4gICAgfSk7XG4gICAgdGhpcy5fb25PdmVyU3ViID0gdGhpcy5fc2VydmljZS5vbk92ZXIuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbk92ZXIgPSB4O1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgIHRoaXMuX2NkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIFt0aGlzLl9oZWFkZXJXaWRnZXRzU3ViLCB0aGlzLl9jb250ZW50V2lkZ2V0c1N1YiwgdGhpcy5fZm9vdGVyV2lkZ2V0c1N1YixcbiAgICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiwgdGhpcy5fb25EcmFnZ2VkU3ViLCB0aGlzLl9maXhlZFpvb21TdWIsIHRoaXMuX29uT3ZlclN1YixcbiAgICAgdGhpcy5fb25EcmFnRW50ZXJTdWJdXG4gICAgICAgIC5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==