/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/node-entry.ts
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
import { isContainerNode } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfFbBranchLine } from './branch-line';
import { AjfFormBuilderService } from './form-builder-service';
/** @type {?} */
const branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548',
];
export class AjfFbNodeEntry {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._level = 0;
        this._branchColors = branchColors.slice(0);
        this._dropZones = ['fbdz-node'];
        this._slideDropZones = ['fbdz-slide'];
        this._originOffset = 0;
        this._originLeftMargin = '0';
        this._firstBranchColor = branchColors[0];
        this._branchLinesSubscription = Subscription.EMPTY;
        this._childEntriesSubscription = Subscription.EMPTY;
        this._currentEditedNode = this._service.editedNodeEntry;
    }
    /**
     * @return {?}
     */
    get hasContent() { return this._hasContent; }
    /**
     * @return {?}
     */
    get isFirst() { return this._isFirst; }
    /**
     * @param {?} isFirst
     * @return {?}
     */
    set isFirst(isFirst) { this._isFirst = isFirst; }
    /**
     * @return {?}
     */
    get isNodeEntry() { return this._isNodeEntry; }
    /**
     * @return {?}
     */
    get nodeEntry() { return this._nodeEntry; }
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    set nodeEntry(nodeEntry) {
        this._nodeEntry = nodeEntry;
        if (nodeEntry != null && ((/** @type {?} */ (nodeEntry))).node !== void 0) {
            /** @type {?} */
            const ne = (/** @type {?} */ (nodeEntry));
            this._isNodeEntry = true;
            /** @type {?} */
            const node = ne.node;
            this._hasContent = node != null && isContainerNode(node);
        }
        else {
            this._isNodeEntry = false;
            this._hasContent = false;
        }
    }
    /**
     * @return {?}
     */
    get level() { return this._level; }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) { this._level = value; }
    /**
     * @return {?}
     */
    get realNodeEntry() {
        return (/** @type {?} */ (this._nodeEntry));
    }
    /**
     * @return {?}
     */
    get branchColors() { return this._branchColors; }
    /**
     * @return {?}
     */
    get dropZones() { return this._dropZones; }
    /**
     * @return {?}
     */
    get slideDropZones() { return this._slideDropZones; }
    /**
     * @return {?}
     */
    get originOffset() { return this._originOffset; }
    /**
     * @param {?} originOffset
     * @return {?}
     */
    set originOffset(originOffset) {
        this._originOffset = originOffset;
        this._originLeftMargin = `${this._originOffset * 4}px`;
    }
    /**
     * @return {?}
     */
    get originLeftMargin() { return this._originLeftMargin; }
    /**
     * @return {?}
     */
    get firstBranchColor() { return this._firstBranchColor; }
    /**
     * @param {?} firstBranchColor
     * @return {?}
     */
    set firstBranchColor(firstBranchColor) {
        /** @type {?} */
        const idx = branchColors.indexOf(firstBranchColor);
        if (idx > 0) {
            this._firstBranchColor = firstBranchColor;
            this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
        }
        else {
            this._firstBranchColor = branchColors[0];
            this._branchColors = branchColors.slice(0);
        }
    }
    /**
     * @return {?}
     */
    get currentEditedNode() {
        return this._currentEditedNode;
    }
    /**
     * @return {?}
     */
    onResize() {
    }
    /**
     * @return {?}
     */
    edit() {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry((/** @type {?} */ (this.nodeEntry)));
    }
    /**
     * @return {?}
     */
    delete() {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry((/** @type {?} */ (this.nodeEntry)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => this._updateBranchHeights()));
        this._childEntriesSubscription = this.childEntries.changes
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._updateBranchHeights();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    }
    /**
     * @param {?} evt
     * @param {?=} content
     * @return {?}
     */
    onDropSuccess(evt, content = false) {
        /** @type {?} */
        const dd = (/** @type {?} */ (evt.item.data));
        if (this._nodeEntry == null) {
            this._service.insertNode(dd, (/** @type {?} */ (null)), 0, content);
            return;
        }
        if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
            /** @type {?} */
            const emptySlot = content ?
                { parent: ((/** @type {?} */ (this.nodeEntry))).node, parentNode: 0 } :
                (/** @type {?} */ (this._nodeEntry));
            this._service.insertNode((/** @type {?} */ (dd)), emptySlot.parent, emptySlot.parentNode, content);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    disableSlideDropPredicate(item) {
        return !item.data.isSlide;
    }
    /**
     * @return {?}
     */
    emptyAreaDropPredicate() {
        return (/**
         * @param {?} item
         * @param {?} _drop
         * @return {?}
         */
        (item, _drop) => {
            if (this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        });
    }
    /**
     * @private
     * @return {?}
     */
    _updateBranchHeights() {
        if (this.nodeEntry == null || !this.isNodeEntry
            || this.branchLines == null || this.childEntries == null) {
            return;
        }
        /** @type {?} */
        const nodeEntry = (/** @type {?} */ (this.nodeEntry));
        /** @type {?} */
        const branchLines = this.branchLines.toArray();
        /** @type {?} */
        const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
        /** @type {?} */
        const childEntries = this.childEntries.toArray().slice(sliceIdx);
        if (branchLines.length != childEntries.length) {
            return;
        }
        branchLines.forEach((/**
         * @param {?} bl
         * @param {?} idx
         * @return {?}
         */
        (bl, idx) => {
            /** @type {?} */
            const ce = childEntries[idx];
            bl.height = ce.nativeElement.offsetTop;
        }));
    }
}
AjfFbNodeEntry.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-node-entry',
                template: "<ng-container *ngIf=\"nodeEntry != null ; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ajf-fb-branch-line\n        *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n        [offset]=\"idx\"\n        [color]=\"branchColors[idx]\"></ajf-fb-branch-line>\n  </ng-template>\n  <div class=\"mat-card-container\"\n      [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\">\n    <div *ngIf=\"!isFirst\"\n        class=\"ajf-origin-line\"\n        [style.margin-left]=\"originLeftMargin\"\n        [style.border-color]=\"firstBranchColor\"></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <mat-card>\n        <div class=\"ajf-title-row\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          <span class=\"ajf-title\" [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | translate\"></span>\n          <span class=\"ajf-actions\">\n            <button [disabled]=\"(currentEditedNode|async) == nodeEntry\" (click)=\"edit()\" mat-icon-button>\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button [disabled]=\"(currentEditedNode|async) == null\" (click)=\"delete()\" mat-icon-button>\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n              *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n              [level]=\"level + 1\"\n              [isFirst]=\"isFirstChild\"\n              [firstBranchColor]=\"branchColors[idx]\"\n              [nodeEntry]=\"contentEntry\"></ajf-fb-node-entry>\n          <mat-card class=\"ajf-empty\"\n              *ngIf=\"realNodeEntry.content.length === 0\"\n              cdkDropList\n              [cdkDropListEnterPredicate]=\"disableSlideDropPredicate\"\n              (cdkDropListDropped)=\"onDropSuccess($event, true)\">&nbsp;</mat-card>\n        </div>\n      </mat-card>\n    </ng-template>\n    <ng-template [ngIf]=\"!isNodeEntry\">\n      <mat-card class=\"ajf-empty\"\n          cdkDropList\n          [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n          (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card>\n    </ng-template>\n  </div>\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ajf-fb-node-entry\n        *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"></ajf-fb-node-entry>\n  </ng-template>\n</ng-container>\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card class=\"ajf-empty\"\n        cdkDropList\n        [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n        (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card>\n  </div>\n</ng-template>\n",
                host: {
                    '(window.resize)': 'onResize()'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}\n"]
            }] }
];
/** @nocollapse */
AjfFbNodeEntry.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbNodeEntry.propDecorators = {
    branchLines: [{ type: ViewChildren, args: [AjfFbBranchLine,] }],
    childEntries: [{ type: ViewChildren, args: [AjfFbNodeEntry, { read: ElementRef },] }],
    isFirst: [{ type: Input }],
    nodeEntry: [{ type: Input }],
    level: [{ type: Input }],
    originOffset: [{ type: Input }],
    firstBranchColor: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfFbNodeEntry.prototype.branchLines;
    /** @type {?} */
    AjfFbNodeEntry.prototype.childEntries;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._hasContent;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._isFirst;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._isNodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._nodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._level;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._branchColors;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._dropZones;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._slideDropZones;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._originOffset;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._originLeftMargin;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._firstBranchColor;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._currentEditedNode;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._branchLinesSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._childEntriesSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFDMUYsWUFBWSxFQUFFLGlCQUFpQixFQUNoQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUV3QixxQkFBcUIsRUFDbkQsTUFBTSx3QkFBd0IsQ0FBQzs7TUFHMUIsWUFBWSxHQUFjO0lBQzlCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1Y7QUFhRCxNQUFNLE9BQU8sY0FBYzs7OztJQTRFekIsWUFBb0IsUUFBK0I7UUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUF4RTNDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBR3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFrQnJCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFRWCxrQkFBYSxHQUFhLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHaEQsZUFBVSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHckMsb0JBQWUsR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRzNDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUd4QixzQkFBaUIsR0FBRyxZ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QVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG81RkFBOEI7Z0JBRTlCLElBQUksRUFBRTtvQkFDSixpQkFBaUIsRUFBRSxZQUFZO2lCQUNoQztnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBdEI4QixxQkFBcUI7OzswQkF3QmpELFlBQVksU0FBQyxlQUFlOzJCQUM1QixZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztzQkFPL0MsS0FBSzt3QkFPTCxLQUFLO29CQWVMLEtBQUs7MkJBaUJMLEtBQUs7K0JBU0wsS0FBSzs7OztJQXhETixxQ0FBdUU7O0lBQ3ZFLHNDQUFzRjs7Ozs7SUFFdEYscUNBQTRCOzs7OztJQUc1QixrQ0FBeUI7Ozs7O0lBSXpCLHNDQUE2Qjs7Ozs7SUFHN0Isb0NBQXVDOzs7OztJQWV2QyxnQ0FBbUI7Ozs7O0lBUW5CLHVDQUF3RDs7Ozs7SUFHeEQsb0NBQTZDOzs7OztJQUc3Qyx5Q0FBbUQ7Ozs7O0lBR25ELHVDQUEwQjs7Ozs7SUFNMUIsMkNBQWdDOzs7OztJQUdoQywyQ0FBNEM7Ozs7O0lBYTVDLDRDQUF1RTs7Ozs7SUFLdkUsa0RBQW9FOzs7OztJQUNwRSxtREFBcUU7Ozs7O0lBRXpELGtDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wLCBDZGtEcm9wTGlzdH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRmJCcmFuY2hMaW5lfSBmcm9tICcuL2JyYW5jaC1saW5lJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90LCBBamZGb3JtQnVpbGRlck5vZGUsIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksIEFqZkZvcm1CdWlsZGVyU2VydmljZVxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5jb25zdCBicmFuY2hDb2xvcnM6IHN0cmluZyBbXSA9IFtcbiAgJyNGNDQzMzYnLCAvLyBSRURcbiAgJyM0Q0FGNTAnLCAvLyBHUkVFTlxuICAnIzNGNTFCNScsIC8vIElORElHT1xuICAnI0ZGQzEwNycsIC8vIEFNQkVSXG4gICcjNzk1NTQ4JywgLy8gQlJPV05cbl07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtZW50cnknLFxuICB0ZW1wbGF0ZVVybDogJ25vZGUtZW50cnkuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLWVudHJ5LmNzcyddLFxuICBob3N0OiB7XG4gICAgJyh3aW5kb3cucmVzaXplKSc6ICdvblJlc2l6ZSgpJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVFbnRyeSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRmJCcmFuY2hMaW5lKSBicmFuY2hMaW5lczogUXVlcnlMaXN0PEFqZkZiQnJhbmNoTGluZT47XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRmJOb2RlRW50cnksIHtyZWFkOiBFbGVtZW50UmVmfSkgY2hpbGRFbnRyaWVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgcHJpdmF0ZSBfaGFzQ29udGVudCA9IGZhbHNlO1xuICBnZXQgaGFzQ29udGVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc0NvbnRlbnQ7IH1cblxuICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gIGdldCBpc0ZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNGaXJzdDsgfVxuICBASW5wdXQoKSBzZXQgaXNGaXJzdChpc0ZpcnN0OiBib29sZWFuKSB7IHRoaXMuX2lzRmlyc3QgPSBpc0ZpcnN0OyB9XG5cbiAgcHJpdmF0ZSBfaXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgZ2V0IGlzTm9kZUVudHJ5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNOb2RlRW50cnk7IH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGUgeyByZXR1cm4gdGhpcy5fbm9kZUVudHJ5OyB9XG4gIEBJbnB1dCgpIHNldCBub2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGUpIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBub2RlRW50cnk7XG4gICAgaWYgKG5vZGVFbnRyeSAhPSBudWxsICYmICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5KS5ub2RlICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG5lID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pm5vZGVFbnRyeTtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZS5ub2RlO1xuICAgICAgdGhpcy5faGFzQ29udGVudCA9IG5vZGUgIT0gbnVsbCAmJiBpc0NvbnRhaW5lck5vZGUobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGV2ZWwgPSAwO1xuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xldmVsOyB9XG4gIEBJbnB1dCgpIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX2xldmVsID0gdmFsdWU7IH1cblxuICBnZXQgcmVhbE5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2JyYW5jaENvbG9yczogc3RyaW5nW10gPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gIGdldCBicmFuY2hDb2xvcnMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fYnJhbmNoQ29sb3JzOyB9XG5cbiAgcHJpdmF0ZSBfZHJvcFpvbmVzOiBzdHJpbmdbXSA9IFsnZmJkei1ub2RlJ107XG4gIGdldCBkcm9wWm9uZXMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fZHJvcFpvbmVzOyB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVEcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LXNsaWRlJ107XG4gIGdldCBzbGlkZURyb3Bab25lcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9zbGlkZURyb3Bab25lczsgfVxuXG4gIHByaXZhdGUgX29yaWdpbk9mZnNldCA9IDA7XG4gIGdldCBvcmlnaW5PZmZzZXQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX29yaWdpbk9mZnNldDsgfVxuICBASW5wdXQoKSBzZXQgb3JpZ2luT2Zmc2V0KG9yaWdpbk9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb3JpZ2luT2Zmc2V0ID0gb3JpZ2luT2Zmc2V0O1xuICAgIHRoaXMuX29yaWdpbkxlZnRNYXJnaW4gPSBgJHt0aGlzLl9vcmlnaW5PZmZzZXQgKiA0fXB4YDtcbiAgfVxuICBwcml2YXRlIF9vcmlnaW5MZWZ0TWFyZ2luID0gJzAnO1xuICBnZXQgb3JpZ2luTGVmdE1hcmdpbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fb3JpZ2luTGVmdE1hcmdpbjsgfVxuXG4gIHByaXZhdGUgX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gIGdldCBmaXJzdEJyYW5jaENvbG9yKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9maXJzdEJyYW5jaENvbG9yOyB9XG4gIEBJbnB1dCgpIHNldCBmaXJzdEJyYW5jaENvbG9yKGZpcnN0QnJhbmNoQ29sb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGlkeCA9IGJyYW5jaENvbG9ycy5pbmRleE9mKGZpcnN0QnJhbmNoQ29sb3IpO1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICB0aGlzLl9maXJzdEJyYW5jaENvbG9yID0gZmlyc3RCcmFuY2hDb2xvcjtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZShpZHgpLmNvbmNhdChicmFuY2hDb2xvcnMuc2xpY2UoMCwgaWR4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gICAgICB0aGlzLl9icmFuY2hDb2xvcnMgPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudEVkaXRlZE5vZGU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPjtcbiAgZ2V0IGN1cnJlbnRFZGl0ZWROb2RlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFZGl0ZWROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoTGluZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5fY3VycmVudEVkaXRlZE5vZGUgPSB0aGlzLl9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeTtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICB9XG5cbiAgZWRpdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIGRlbGV0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLmRlbGV0ZU5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpKTtcbiAgICB0aGlzLl9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaWxkRW50cmllcy5jaGFuZ2VzXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25Ecm9wU3VjY2VzcyhldnQ6IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4sIGNvbnRlbnQgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGRkID0gZXZ0Lml0ZW0uZGF0YSBhcyBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk7XG4gICAgaWYgKHRoaXMuX25vZGVFbnRyeSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmluc2VydE5vZGUoZGQsIG51bGwgYXMgYW55LCAwLCBjb250ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRkLm5vZGVUeXBlICE9PSB2b2lkIDAgJiYgKCF0aGlzLmlzTm9kZUVudHJ5IHx8ICh0aGlzLmlzTm9kZUVudHJ5ICYmIGNvbnRlbnQpKSkge1xuICAgICAgY29uc3QgZW1wdHlTbG90ID0gY29udGVudCA/XG4gICAgICAgIHtwYXJlbnQ6ICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpLm5vZGUsIHBhcmVudE5vZGU6IDB9IDpcbiAgICAgICAgPEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90PnRoaXMuX25vZGVFbnRyeTtcbiAgICAgIHRoaXMuX3NlcnZpY2UuaW5zZXJ0Tm9kZShcbiAgICAgICAgPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT5kZCxcbiAgICAgICAgZW1wdHlTbG90LnBhcmVudCxcbiAgICAgICAgZW1wdHlTbG90LnBhcmVudE5vZGUsXG4gICAgICAgIGNvbnRlbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVNsaWRlRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICB9XG5cbiAgZW1wdHlBcmVhRHJvcFByZWRpY2F0ZSgpOiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHRoaXMuX2xldmVsID4gMCkge1xuICAgICAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW0uZGF0YS5pc1NsaWRlIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCcmFuY2hIZWlnaHRzKCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMubm9kZUVudHJ5ID09IG51bGwgfHwgIXRoaXMuaXNOb2RlRW50cnlcbiAgICAgIHx8IHRoaXMuYnJhbmNoTGluZXMgPT0gbnVsbCB8fCB0aGlzLmNoaWxkRW50cmllcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5vZGVFbnRyeSA9IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeTtcbiAgICBjb25zdCBicmFuY2hMaW5lczogQWpmRmJCcmFuY2hMaW5lW10gPSB0aGlzLmJyYW5jaExpbmVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBzbGljZUlkeCA9IG5vZGVFbnRyeS5jb250ZW50ICE9IG51bGwgPyBub2RlRW50cnkuY29udGVudC5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNoaWxkRW50cmllczogRWxlbWVudFJlZltdID0gdGhpcy5jaGlsZEVudHJpZXMudG9BcnJheSgpLnNsaWNlKHNsaWNlSWR4KTtcblxuICAgIGlmIChicmFuY2hMaW5lcy5sZW5ndGggIT0gY2hpbGRFbnRyaWVzLmxlbmd0aCkgeyByZXR1cm47IH1cblxuICAgIGJyYW5jaExpbmVzLmZvckVhY2goKGJsOiBBamZGYkJyYW5jaExpbmUsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBjZTogRWxlbWVudFJlZiAgPSBjaGlsZEVudHJpZXNbaWR4XTtcbiAgICAgIGJsLmhlaWdodCA9IGNlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgIH0pO1xuICB9XG59XG4iXX0=