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
    get hasContent() {
        return this._hasContent;
    }
    /**
     * @return {?}
     */
    get isFirst() {
        return this._isFirst;
    }
    /**
     * @param {?} isFirst
     * @return {?}
     */
    set isFirst(isFirst) {
        this._isFirst = isFirst;
    }
    /**
     * @return {?}
     */
    get isNodeEntry() {
        return this._isNodeEntry;
    }
    /**
     * @return {?}
     */
    get nodeEntry() {
        return this._nodeEntry;
    }
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
    get level() {
        return this._level;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) {
        this._level = value;
    }
    /**
     * @return {?}
     */
    get realNodeEntry() {
        return (/** @type {?} */ (this._nodeEntry));
    }
    /**
     * @return {?}
     */
    get branchColors() {
        return this._branchColors;
    }
    /**
     * @return {?}
     */
    get dropZones() {
        return this._dropZones;
    }
    /**
     * @return {?}
     */
    get slideDropZones() {
        return this._slideDropZones;
    }
    /**
     * @return {?}
     */
    get originOffset() {
        return this._originOffset;
    }
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
    get originLeftMargin() {
        return this._originLeftMargin;
    }
    /**
     * @return {?}
     */
    get firstBranchColor() {
        return this._firstBranchColor;
    }
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
    onResize() { }
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
        this._childEntriesSubscription = this.childEntries.changes.subscribe((/**
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
        if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
            this.childEntries == null) {
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
                host: { '(window.resize)': 'onResize()' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUtMLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDOztNQUcxQixZQUFZLEdBQWE7SUFDN0IsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7Q0FDVjtBQVdELE1BQU0sT0FBTyxjQUFjOzs7O0lBMkd6QixZQUFvQixRQUErQjtRQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQXZHM0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQXVCckIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQWFYLGtCQUFhLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUtoRCxlQUFVLEdBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUtyQyxvQkFBZSxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFLM0Msa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFTbEIsc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1FBS3hCLHNCQUFpQixHQUFHLFlB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QUFRLEVBQUUsbUJBQW1CO2dCQUM3QixvNUZBQThCO2dCQUU5QixJQUFJLEVBQUUsRUFBQyxpQkFBaUIsRUFBRSxZQUFZLEVBQUM7Z0JBQ3ZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUFwQkMscUJBQXFCOzs7MEJBc0JwQixZQUFZLFNBQUMsZUFBZTsyQkFDNUIsWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7c0JBVy9DLEtBQUs7d0JBY0wsS0FBSztvQkFrQkwsS0FBSzsyQkE0QkwsS0FBSzsrQkFjTCxLQUFLOzs7O0lBdEZOLHFDQUF1RTs7SUFDdkUsc0NBQXNGOzs7OztJQUV0RixxQ0FBNEI7Ozs7O0lBSzVCLGtDQUF5Qjs7Ozs7SUFTekIsc0NBQTZCOzs7OztJQUs3QixvQ0FBdUM7Ozs7O0lBa0J2QyxnQ0FBbUI7Ozs7O0lBYW5CLHVDQUF3RDs7Ozs7SUFLeEQsb0NBQTZDOzs7OztJQUs3Qyx5Q0FBbUQ7Ozs7O0lBS25ELHVDQUEwQjs7Ozs7SUFTMUIsMkNBQWdDOzs7OztJQUtoQywyQ0FBNEM7Ozs7O0lBZ0I1Qyw0Q0FBcUU7Ozs7O0lBS3JFLGtEQUFvRTs7Ozs7SUFDcEUsbURBQXFFOzs7OztJQUV6RCxrQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7aXNDb250YWluZXJOb2RlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcCwgQ2RrRHJvcExpc3R9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkZiQnJhbmNoTGluZX0gZnJvbSAnLi9icmFuY2gtbGluZSc7XG5pbXBvcnQge1xuICBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlLFxuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlclNlcnZpY2Vcbn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cblxuY29uc3QgYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IFtcbiAgJyNGNDQzMzYnLCAgLy8gUkVEXG4gICcjNENBRjUwJywgIC8vIEdSRUVOXG4gICcjM0Y1MUI1JywgIC8vIElORElHT1xuICAnI0ZGQzEwNycsICAvLyBBTUJFUlxuICAnIzc5NTU0OCcsICAvLyBCUk9XTlxuXTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1lbnRyeS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25vZGUtZW50cnkuY3NzJ10sXG4gIGhvc3Q6IHsnKHdpbmRvdy5yZXNpemUpJzogJ29uUmVzaXplKCknfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJOb2RlRW50cnkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkcmVuKEFqZkZiQnJhbmNoTGluZSkgYnJhbmNoTGluZXM6IFF1ZXJ5TGlzdDxBamZGYkJyYW5jaExpbmU+O1xuICBAVmlld0NoaWxkcmVuKEFqZkZiTm9kZUVudHJ5LCB7cmVhZDogRWxlbWVudFJlZn0pIGNoaWxkRW50cmllczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIHByaXZhdGUgX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgZ2V0IGhhc0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0NvbnRlbnQ7XG4gIH1cblxuICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gIGdldCBpc0ZpcnN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0ZpcnN0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc0ZpcnN0KGlzRmlyc3Q6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0ZpcnN0ID0gaXNGaXJzdDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gIGdldCBpc05vZGVFbnRyeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNOb2RlRW50cnk7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGUge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cnk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZSkge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IG5vZGVFbnRyeTtcbiAgICBpZiAobm9kZUVudHJ5ICE9IG51bGwgJiYgKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5ub2RlRW50cnkpLm5vZGUgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgbmUgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5O1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSB0cnVlO1xuICAgICAgY29uc3Qgbm9kZSA9IG5lLm5vZGU7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gbm9kZSAhPSBudWxsICYmIGlzQ29udGFpbmVyTm9kZShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sZXZlbCA9IDA7XG4gIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sZXZlbDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbGV2ZWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xldmVsID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcmVhbE5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2JyYW5jaENvbG9yczogc3RyaW5nW10gPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gIGdldCBicmFuY2hDb2xvcnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9icmFuY2hDb2xvcnM7XG4gIH1cblxuICBwcml2YXRlIF9kcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LW5vZGUnXTtcbiAgZ2V0IGRyb3Bab25lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lcztcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRHJvcFpvbmVzOiBzdHJpbmdbXSA9IFsnZmJkei1zbGlkZSddO1xuICBnZXQgc2xpZGVEcm9wWm9uZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9zbGlkZURyb3Bab25lcztcbiAgfVxuXG4gIHByaXZhdGUgX29yaWdpbk9mZnNldCA9IDA7XG4gIGdldCBvcmlnaW5PZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luT2Zmc2V0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBvcmlnaW5PZmZzZXQob3JpZ2luT2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9vcmlnaW5PZmZzZXQgPSBvcmlnaW5PZmZzZXQ7XG4gICAgdGhpcy5fb3JpZ2luTGVmdE1hcmdpbiA9IGAke3RoaXMuX29yaWdpbk9mZnNldCAqIDR9cHhgO1xuICB9XG4gIHByaXZhdGUgX29yaWdpbkxlZnRNYXJnaW4gPSAnMCc7XG4gIGdldCBvcmlnaW5MZWZ0TWFyZ2luKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbkxlZnRNYXJnaW47XG4gIH1cblxuICBwcml2YXRlIF9maXJzdEJyYW5jaENvbG9yID0gYnJhbmNoQ29sb3JzWzBdO1xuICBnZXQgZmlyc3RCcmFuY2hDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9maXJzdEJyYW5jaENvbG9yO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXJzdEJyYW5jaENvbG9yKGZpcnN0QnJhbmNoQ29sb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGlkeCA9IGJyYW5jaENvbG9ycy5pbmRleE9mKGZpcnN0QnJhbmNoQ29sb3IpO1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICB0aGlzLl9maXJzdEJyYW5jaENvbG9yID0gZmlyc3RCcmFuY2hDb2xvcjtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZShpZHgpLmNvbmNhdChicmFuY2hDb2xvcnMuc2xpY2UoMCwgaWR4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gICAgICB0aGlzLl9icmFuY2hDb2xvcnMgPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudEVkaXRlZE5vZGU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD47XG4gIGdldCBjdXJyZW50RWRpdGVkTm9kZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEVkaXRlZE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZSA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7fVxuXG4gIGVkaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm9kZUVudHJ5ID09IG51bGwgfHwgIXRoaXMuaXNOb2RlRW50cnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5lZGl0Tm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSk7XG4gIH1cblxuICBkZWxldGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm9kZUVudHJ5ID09IG51bGwgfHwgIXRoaXMuaXNOb2RlRW50cnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5kZWxldGVOb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX3VwZGF0ZUJyYW5jaEhlaWdodHMoKSk7XG4gICAgdGhpcy5fY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uID0gdGhpcy5jaGlsZEVudHJpZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fYnJhbmNoTGluZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9uRHJvcFN1Y2Nlc3MoZXZ0OiBDZGtEcmFnRHJvcDxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+LCBjb250ZW50ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBkZCA9IGV2dC5pdGVtLmRhdGEgYXMgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5O1xuICAgIGlmICh0aGlzLl9ub2RlRW50cnkgPT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS5pbnNlcnROb2RlKGRkLCBudWxsIGFzIGFueSwgMCwgY29udGVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkZC5ub2RlVHlwZSAhPT0gdm9pZCAwICYmICghdGhpcy5pc05vZGVFbnRyeSB8fCAodGhpcy5pc05vZGVFbnRyeSAmJiBjb250ZW50KSkpIHtcbiAgICAgIGNvbnN0IGVtcHR5U2xvdCA9IGNvbnRlbnQgP1xuICAgICAgICAgIHtwYXJlbnQ6ICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpLm5vZGUsIHBhcmVudE5vZGU6IDB9IDpcbiAgICAgICAgICA8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q+dGhpcy5fbm9kZUVudHJ5O1xuICAgICAgdGhpcy5fc2VydmljZS5pbnNlcnROb2RlKFxuICAgICAgICAgIDxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+ZGQsIGVtcHR5U2xvdC5wYXJlbnQsIGVtcHR5U2xvdC5wYXJlbnROb2RlLCBjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU2xpZGVEcm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG4gIH1cblxuICBlbXB0eUFyZWFEcm9wUHJlZGljYXRlKCk6IChpdGVtOiBDZGtEcmFnLCBfZHJvcDogQ2RrRHJvcExpc3QpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAodGhpcy5fbGV2ZWwgPiAwKSB7XG4gICAgICAgIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbS5kYXRhLmlzU2xpZGUgfHwgZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJyYW5jaEhlaWdodHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm9kZUVudHJ5ID09IG51bGwgfHwgIXRoaXMuaXNOb2RlRW50cnkgfHwgdGhpcy5icmFuY2hMaW5lcyA9PSBudWxsIHx8XG4gICAgICAgIHRoaXMuY2hpbGRFbnRyaWVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm9kZUVudHJ5ID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5O1xuICAgIGNvbnN0IGJyYW5jaExpbmVzOiBBamZGYkJyYW5jaExpbmVbXSA9IHRoaXMuYnJhbmNoTGluZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IHNsaWNlSWR4ID0gbm9kZUVudHJ5LmNvbnRlbnQgIT0gbnVsbCA/IG5vZGVFbnRyeS5jb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgY29uc3QgY2hpbGRFbnRyaWVzOiBFbGVtZW50UmVmW10gPSB0aGlzLmNoaWxkRW50cmllcy50b0FycmF5KCkuc2xpY2Uoc2xpY2VJZHgpO1xuXG4gICAgaWYgKGJyYW5jaExpbmVzLmxlbmd0aCAhPSBjaGlsZEVudHJpZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYnJhbmNoTGluZXMuZm9yRWFjaCgoYmw6IEFqZkZiQnJhbmNoTGluZSwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGNlOiBFbGVtZW50UmVmID0gY2hpbGRFbnRyaWVzW2lkeF07XG4gICAgICBibC5oZWlnaHQgPSBjZS5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcbiAgICB9KTtcbiAgfVxufVxuIl19