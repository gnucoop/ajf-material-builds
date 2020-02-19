/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/node-entry.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFDMUYsWUFBWSxFQUFFLGlCQUFpQixFQUNoQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUV3QixxQkFBcUIsRUFDbkQsTUFBTSx3QkFBd0IsQ0FBQzs7TUFHMUIsWUFBWSxHQUFjO0lBQzlCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1Y7QUFhRCxNQUFNLE9BQU8sY0FBYzs7OztJQTRFekIsWUFBb0IsUUFBK0I7UUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUF4RTNDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBR3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFrQnJCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFRWCxrQkFBYSxHQUFhLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHaEQsZUFBVSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHckMsb0JBQWUsR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRzNDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUd4QixzQkFBaUIsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFrQnBDLDZCQUF3QixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzVELDhCQUF5QixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBR25FLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUMxRCxDQUFDOzs7O0lBekVELElBQUksVUFBVSxLQUFjLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7SUFHdEQsSUFBSSxPQUFPLEtBQWMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDaEQsSUFBYSxPQUFPLENBQUMsT0FBZ0IsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7SUFHbkUsSUFBSSxXQUFXLEtBQWMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7OztJQUd4RCxJQUFJLFNBQVMsS0FBeUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDL0QsSUFBYSxTQUFTLENBQUMsU0FBNkI7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsbUJBQXlCLFNBQVMsRUFBQSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFOztrQkFDdkUsRUFBRSxHQUFHLG1CQUF5QixTQUFTLEVBQUE7WUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O2tCQUNuQixJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUk7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBR0QsSUFBSSxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDM0MsSUFBYSxLQUFLLENBQUMsS0FBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7OztJQUUxRCxJQUFJLGFBQWE7UUFDZixPQUFPLG1CQUFBLElBQUksQ0FBQyxVQUFVLEVBQTJCLENBQUM7SUFDcEQsQ0FBQzs7OztJQUdELElBQUksWUFBWSxLQUFlLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Ozs7SUFHM0QsSUFBSSxTQUFTLEtBQWUsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7OztJQUdyRCxJQUFJLGNBQWMsS0FBZSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7O0lBRy9ELElBQUksWUFBWSxLQUFhLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3pELElBQWEsWUFBWSxDQUFDLFlBQW9CO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDekQsQ0FBQzs7OztJQUVELElBQUksZ0JBQWdCLEtBQWEsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7O0lBR2pFLElBQUksZ0JBQWdCLEtBQWEsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNqRSxJQUFhLGdCQUFnQixDQUFDLGdCQUF3Qjs7Y0FDOUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDbEQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNqRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7O0lBR0QsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDakMsQ0FBQzs7OztJQVNELFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUF5QixJQUFJLENBQUMsU0FBUyxFQUFBLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUF5QixJQUFJLENBQUMsU0FBUyxFQUFBLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLFVBQVU7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTzthQUN2RCxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBNkMsRUFBRSxPQUFPLEdBQUcsS0FBSzs7Y0FDcEUsRUFBRSxHQUFHLG1CQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUErQjtRQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxtQkFBQSxJQUFJLEVBQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEQsT0FBTztTQUNSO1FBQ0QsSUFBSSxFQUFFLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFOztrQkFDNUUsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QixFQUFDLE1BQU0sRUFBRSxDQUFDLG1CQUF5QixJQUFJLENBQUMsU0FBUyxFQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Z0JBQ3pFLG1CQUF5QixJQUFJLENBQUMsVUFBVSxFQUFBO1lBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUN0QixtQkFBNkIsRUFBRSxFQUFBLEVBQy9CLFNBQVMsQ0FBQyxNQUFNLEVBQ2hCLFNBQVMsQ0FBQyxVQUFVLEVBQ3BCLE9BQU8sQ0FDUixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7OztJQUVELHlCQUF5QixDQUFDLElBQTBDO1FBQ2xFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsc0JBQXNCO1FBQ3BCOzs7OztRQUFPLENBQUMsSUFBYSxFQUFFLEtBQWtCLEVBQVcsRUFBRTtZQUNwRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDM0I7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQztRQUNwQyxDQUFDLEVBQUM7SUFDSixDQUFDOzs7OztJQUVPLG9CQUFvQjtRQUMxQixJQUNFLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7ZUFDeEMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7O2NBQ2pFLFNBQVMsR0FBRyxtQkFBeUIsSUFBSSxDQUFDLFNBQVMsRUFBQTs7Y0FDbkQsV0FBVyxHQUFzQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTs7Y0FDM0QsUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Y0FDbkUsWUFBWSxHQUFpQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFFOUUsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFMUQsV0FBVyxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxFQUFtQixFQUFFLEdBQVcsRUFBRSxFQUFFOztrQkFDakQsRUFBRSxHQUFnQixZQUFZLENBQUMsR0FBRyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFuS0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG81RkFBOEI7Z0JBRTlCLElBQUksRUFBRTtvQkFDSixpQkFBaUIsRUFBRSxZQUFZO2lCQUNoQztnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBdEI4QixxQkFBcUI7OzswQkF3QmpELFlBQVksU0FBQyxlQUFlOzJCQUM1QixZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztzQkFPL0MsS0FBSzt3QkFPTCxLQUFLO29CQWVMLEtBQUs7MkJBaUJMLEtBQUs7K0JBU0wsS0FBSzs7OztJQXhETixxQ0FBdUU7O0lBQ3ZFLHNDQUFzRjs7Ozs7SUFFdEYscUNBQTRCOzs7OztJQUc1QixrQ0FBeUI7Ozs7O0lBSXpCLHNDQUE2Qjs7Ozs7SUFHN0Isb0NBQXVDOzs7OztJQWV2QyxnQ0FBbUI7Ozs7O0lBUW5CLHVDQUF3RDs7Ozs7SUFHeEQsb0NBQTZDOzs7OztJQUc3Qyx5Q0FBbUQ7Ozs7O0lBR25ELHVDQUEwQjs7Ozs7SUFNMUIsMkNBQWdDOzs7OztJQUdoQywyQ0FBNEM7Ozs7O0lBYTVDLDRDQUF1RTs7Ozs7SUFLdkUsa0RBQW9FOzs7OztJQUNwRSxtREFBcUU7Ozs7O0lBRXpELGtDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3AsIENka0Ryb3BMaXN0fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGYkJyYW5jaExpbmV9IGZyb20gJy4vYnJhbmNoLWxpbmUnO1xuaW1wb3J0IHtcbiAgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3QsIEFqZkZvcm1CdWlsZGVyTm9kZSwgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSwgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5cbmNvbnN0IGJyYW5jaENvbG9yczogc3RyaW5nIFtdID0gW1xuICAnI0Y0NDMzNicsIC8vIFJFRFxuICAnIzRDQUY1MCcsIC8vIEdSRUVOXG4gICcjM0Y1MUI1JywgLy8gSU5ESUdPXG4gICcjRkZDMTA3JywgLy8gQU1CRVJcbiAgJyM3OTU1NDgnLCAvLyBCUk9XTlxuXTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1lbnRyeS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25vZGUtZW50cnkuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnKHdpbmRvdy5yZXNpemUpJzogJ29uUmVzaXplKCknXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZUVudHJ5IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihBamZGYkJyYW5jaExpbmUpIGJyYW5jaExpbmVzOiBRdWVyeUxpc3Q8QWpmRmJCcmFuY2hMaW5lPjtcbiAgQFZpZXdDaGlsZHJlbihBamZGYk5vZGVFbnRyeSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBjaGlsZEVudHJpZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBwcml2YXRlIF9oYXNDb250ZW50ID0gZmFsc2U7XG4gIGdldCBoYXNDb250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzQ29udGVudDsgfVxuXG4gIHByaXZhdGUgX2lzRmlyc3QgPSBmYWxzZTtcbiAgZ2V0IGlzRmlyc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0ZpcnN0OyB9XG4gIEBJbnB1dCgpIHNldCBpc0ZpcnN0KGlzRmlyc3Q6IGJvb2xlYW4pIHsgdGhpcy5faXNGaXJzdCA9IGlzRmlyc3Q7IH1cblxuICBwcml2YXRlIF9pc05vZGVFbnRyeSA9IGZhbHNlO1xuICBnZXQgaXNOb2RlRW50cnkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc05vZGVFbnRyeTsgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlO1xuICBnZXQgbm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZSB7IHJldHVybiB0aGlzLl9ub2RlRW50cnk7IH1cbiAgQElucHV0KCkgc2V0IG5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZSkge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IG5vZGVFbnRyeTtcbiAgICBpZiAobm9kZUVudHJ5ICE9IG51bGwgJiYgKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5ub2RlRW50cnkpLm5vZGUgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgbmUgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5O1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSB0cnVlO1xuICAgICAgY29uc3Qgbm9kZSA9IG5lLm5vZGU7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gbm9kZSAhPSBudWxsICYmIGlzQ29udGFpbmVyTm9kZShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sZXZlbCA9IDA7XG4gIGdldCBsZXZlbCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGV2ZWw7IH1cbiAgQElucHV0KCkgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fbGV2ZWwgPSB2YWx1ZTsgfVxuXG4gIGdldCByZWFsTm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5IGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgZ2V0IGJyYW5jaENvbG9ycygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9icmFuY2hDb2xvcnM7IH1cblxuICBwcml2YXRlIF9kcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LW5vZGUnXTtcbiAgZ2V0IGRyb3Bab25lcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9kcm9wWm9uZXM7IH1cblxuICBwcml2YXRlIF9zbGlkZURyb3Bab25lczogc3RyaW5nW10gPSBbJ2ZiZHotc2xpZGUnXTtcbiAgZ2V0IHNsaWRlRHJvcFpvbmVzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3NsaWRlRHJvcFpvbmVzOyB9XG5cbiAgcHJpdmF0ZSBfb3JpZ2luT2Zmc2V0ID0gMDtcbiAgZ2V0IG9yaWdpbk9mZnNldCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fb3JpZ2luT2Zmc2V0OyB9XG4gIEBJbnB1dCgpIHNldCBvcmlnaW5PZmZzZXQob3JpZ2luT2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9vcmlnaW5PZmZzZXQgPSBvcmlnaW5PZmZzZXQ7XG4gICAgdGhpcy5fb3JpZ2luTGVmdE1hcmdpbiA9IGAke3RoaXMuX29yaWdpbk9mZnNldCAqIDR9cHhgO1xuICB9XG4gIHByaXZhdGUgX29yaWdpbkxlZnRNYXJnaW4gPSAnMCc7XG4gIGdldCBvcmlnaW5MZWZ0TWFyZ2luKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9vcmlnaW5MZWZ0TWFyZ2luOyB9XG5cbiAgcHJpdmF0ZSBfZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgZ2V0IGZpcnN0QnJhbmNoQ29sb3IoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3I7IH1cbiAgQElucHV0KCkgc2V0IGZpcnN0QnJhbmNoQ29sb3IoZmlyc3RCcmFuY2hDb2xvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgaWR4ID0gYnJhbmNoQ29sb3JzLmluZGV4T2YoZmlyc3RCcmFuY2hDb2xvcik7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBmaXJzdEJyYW5jaENvbG9yO1xuICAgICAgdGhpcy5fYnJhbmNoQ29sb3JzID0gYnJhbmNoQ29sb3JzLnNsaWNlKGlkeCkuY29uY2F0KGJyYW5jaENvbG9ycy5zbGljZSgwLCBpZHgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50RWRpdGVkTm9kZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgY3VycmVudEVkaXRlZE5vZGUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEVkaXRlZE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZSA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7XG4gIH1cblxuICBlZGl0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgZGVsZXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NlcnZpY2UuZGVsZXRlTm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCkpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hpbGRFbnRyaWVzLmNoYW5nZXNcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvbkRyb3BTdWNjZXNzKGV2dDogQ2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PiwgY29udGVudCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgZGQgPSBldnQuaXRlbS5kYXRhIGFzIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeTtcbiAgICBpZiAodGhpcy5fbm9kZUVudHJ5ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuaW5zZXJ0Tm9kZShkZCwgbnVsbCBhcyBhbnksIDAsIGNvbnRlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGQubm9kZVR5cGUgIT09IHZvaWQgMCAmJiAoIXRoaXMuaXNOb2RlRW50cnkgfHwgKHRoaXMuaXNOb2RlRW50cnkgJiYgY29udGVudCkpKSB7XG4gICAgICBjb25zdCBlbXB0eVNsb3QgPSBjb250ZW50ID9cbiAgICAgICAge3BhcmVudDogKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSkubm9kZSwgcGFyZW50Tm9kZTogMH0gOlxuICAgICAgICA8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q+dGhpcy5fbm9kZUVudHJ5O1xuICAgICAgdGhpcy5fc2VydmljZS5pbnNlcnROb2RlKFxuICAgICAgICA8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PmRkLFxuICAgICAgICBlbXB0eVNsb3QucGFyZW50LFxuICAgICAgICBlbXB0eVNsb3QucGFyZW50Tm9kZSxcbiAgICAgICAgY29udGVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU2xpZGVEcm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG4gIH1cblxuICBlbXB0eUFyZWFEcm9wUHJlZGljYXRlKCk6IChpdGVtOiBDZGtEcmFnLCBfZHJvcDogQ2RrRHJvcExpc3QpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAodGhpcy5fbGV2ZWwgPiAwKSB7XG4gICAgICAgIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbS5kYXRhLmlzU2xpZGUgfHwgZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJyYW5jaEhlaWdodHMoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeVxuICAgICAgfHwgdGhpcy5icmFuY2hMaW5lcyA9PSBudWxsIHx8IHRoaXMuY2hpbGRFbnRyaWVzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qgbm9kZUVudHJ5ID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5O1xuICAgIGNvbnN0IGJyYW5jaExpbmVzOiBBamZGYkJyYW5jaExpbmVbXSA9IHRoaXMuYnJhbmNoTGluZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IHNsaWNlSWR4ID0gbm9kZUVudHJ5LmNvbnRlbnQgIT0gbnVsbCA/IG5vZGVFbnRyeS5jb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgY29uc3QgY2hpbGRFbnRyaWVzOiBFbGVtZW50UmVmW10gPSB0aGlzLmNoaWxkRW50cmllcy50b0FycmF5KCkuc2xpY2Uoc2xpY2VJZHgpO1xuXG4gICAgaWYgKGJyYW5jaExpbmVzLmxlbmd0aCAhPSBjaGlsZEVudHJpZXMubGVuZ3RoKSB7IHJldHVybjsgfVxuXG4gICAgYnJhbmNoTGluZXMuZm9yRWFjaCgoYmw6IEFqZkZiQnJhbmNoTGluZSwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGNlOiBFbGVtZW50UmVmICA9IGNoaWxkRW50cmllc1tpZHhdO1xuICAgICAgYmwuaGVpZ2h0ID0gY2UubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==