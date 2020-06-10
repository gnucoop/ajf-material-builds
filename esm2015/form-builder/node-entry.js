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
const branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548',
];
let AjfFbNodeEntry = /** @class */ (() => {
    class AjfFbNodeEntry {
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
        get hasContent() {
            return this._hasContent;
        }
        get isFirst() {
            return this._isFirst;
        }
        set isFirst(isFirst) {
            this._isFirst = isFirst;
        }
        get isNodeEntry() {
            return this._isNodeEntry;
        }
        get nodeEntry() {
            return this._nodeEntry;
        }
        set nodeEntry(nodeEntry) {
            this._nodeEntry = nodeEntry;
            if (nodeEntry != null && nodeEntry.node !== void 0) {
                const ne = nodeEntry;
                this._isNodeEntry = true;
                const node = ne.node;
                this._hasContent = node != null && isContainerNode(node);
            }
            else {
                this._isNodeEntry = false;
                this._hasContent = false;
            }
        }
        get level() {
            return this._level;
        }
        set level(value) {
            this._level = value;
        }
        get realNodeEntry() {
            return this._nodeEntry;
        }
        get branchColors() {
            return this._branchColors;
        }
        get dropZones() {
            return this._dropZones;
        }
        get slideDropZones() {
            return this._slideDropZones;
        }
        get originOffset() {
            return this._originOffset;
        }
        set originOffset(originOffset) {
            this._originOffset = originOffset;
            this._originLeftMargin = `${this._originOffset * 4}px`;
        }
        get originLeftMargin() {
            return this._originLeftMargin;
        }
        get firstBranchColor() {
            return this._firstBranchColor;
        }
        set firstBranchColor(firstBranchColor) {
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
        get currentEditedNode() {
            return this._currentEditedNode;
        }
        onResize() { }
        edit() {
            if (this.nodeEntry == null || !this.isNodeEntry) {
                return;
            }
            this._service.editNodeEntry(this.nodeEntry);
        }
        delete() {
            if (this.nodeEntry == null || !this.isNodeEntry) {
                return;
            }
            this._service.deleteNodeEntry(this.nodeEntry);
        }
        ngAfterViewInit() {
            setTimeout(() => this._updateBranchHeights());
            this._childEntriesSubscription = this.childEntries.changes.subscribe(() => {
                this._updateBranchHeights();
            });
        }
        ngOnDestroy() {
            this._branchLinesSubscription.unsubscribe();
            this._childEntriesSubscription.unsubscribe();
        }
        onDropSuccess(evt, content = false) {
            const dd = evt.item.data;
            if (this._nodeEntry == null) {
                this._service.insertNode(dd, null, 0, content);
                return;
            }
            if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
                const emptySlot = content ?
                    { parent: this.nodeEntry.node, parentNode: 0 } :
                    this._nodeEntry;
                this._service.insertNode(dd, emptySlot.parent, emptySlot.parentNode, content);
            }
        }
        disableSlideDropPredicate(item) {
            return !item.data.isSlide;
        }
        emptyAreaDropPredicate() {
            return (item, _drop) => {
                if (this._level > 0) {
                    return !item.data.isSlide;
                }
                return item.data.isSlide || false;
            };
        }
        _updateBranchHeights() {
            if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
                this.childEntries == null) {
                return;
            }
            const nodeEntry = this.nodeEntry;
            const branchLines = this.branchLines.toArray();
            const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
            const childEntries = this.childEntries.toArray().slice(sliceIdx);
            if (branchLines.length != childEntries.length) {
                return;
            }
            branchLines.forEach((bl, idx) => {
                const ce = childEntries[idx];
                bl.height = ce.nativeElement.offsetTop;
            });
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
    return AjfFbNodeEntry;
})();
export { AjfFbNodeEntry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUtMLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBR2hDLE1BQU0sWUFBWSxHQUFhO0lBQzdCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQztBQUdGO0lBQUEsTUFRYSxjQUFjO1FBMkd6QixZQUFvQixRQUErQjtZQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtZQXZHM0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFLcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztZQVNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQXVCckIsV0FBTSxHQUFHLENBQUMsQ0FBQztZQWFYLGtCQUFhLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUtoRCxlQUFVLEdBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUtyQyxvQkFBZSxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFLM0Msa0JBQWEsR0FBRyxDQUFDLENBQUM7WUFTbEIsc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1lBS3hCLHNCQUFp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QUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXBCQyxxQkFBcUI7Ozs4QkFzQnBCLFlBQVksU0FBQyxlQUFlOytCQUM1QixZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQzswQkFXL0MsS0FBSzs0QkFjTCxLQUFLO3dCQWtCTCxLQUFLOytCQTRCTCxLQUFLO21DQWNMLEtBQUs7O0lBbUdSLHFCQUFDO0tBQUE7U0ExTFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wLCBDZGtEcm9wTGlzdH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRmJCcmFuY2hMaW5lfSBmcm9tICcuL2JyYW5jaC1saW5lJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90LFxuICBBamZGb3JtQnVpbGRlck5vZGUsXG4gIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyU2VydmljZVxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5jb25zdCBicmFuY2hDb2xvcnM6IHN0cmluZ1tdID0gW1xuICAnI0Y0NDMzNicsICAvLyBSRURcbiAgJyM0Q0FGNTAnLCAgLy8gR1JFRU5cbiAgJyMzRjUxQjUnLCAgLy8gSU5ESUdPXG4gICcjRkZDMTA3JywgIC8vIEFNQkVSXG4gICcjNzk1NTQ4JywgIC8vIEJST1dOXG5dO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1ub2RlLWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLWVudHJ5Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1lbnRyeS5jc3MnXSxcbiAgaG9zdDogeycod2luZG93LnJlc2l6ZSknOiAnb25SZXNpemUoKSd9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVFbnRyeSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRmJCcmFuY2hMaW5lKSBicmFuY2hMaW5lczogUXVlcnlMaXN0PEFqZkZiQnJhbmNoTGluZT47XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRmJOb2RlRW50cnksIHtyZWFkOiBFbGVtZW50UmVmfSkgY2hpbGRFbnRyaWVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgcHJpdmF0ZSBfaGFzQ29udGVudCA9IGZhbHNlO1xuICBnZXQgaGFzQ29udGVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQ29udGVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzRmlyc3QgPSBmYWxzZTtcbiAgZ2V0IGlzRmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRmlyc3Q7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGlzRmlyc3QoaXNGaXJzdDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzRmlyc3QgPSBpc0ZpcnN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgZ2V0IGlzTm9kZUVudHJ5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc05vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlO1xuICBnZXQgbm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlKSB7XG4gICAgdGhpcy5fbm9kZUVudHJ5ID0gbm9kZUVudHJ5O1xuICAgIGlmIChub2RlRW50cnkgIT0gbnVsbCAmJiAoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pm5vZGVFbnRyeSkubm9kZSAhPT0gdm9pZCAwKSB7XG4gICAgICBjb25zdCBuZSA9IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5ub2RlRW50cnk7XG4gICAgICB0aGlzLl9pc05vZGVFbnRyeSA9IHRydWU7XG4gICAgICBjb25zdCBub2RlID0gbmUubm9kZTtcbiAgICAgIHRoaXMuX2hhc0NvbnRlbnQgPSBub2RlICE9IG51bGwgJiYgaXNDb250YWluZXJOb2RlKG5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc05vZGVFbnRyeSA9IGZhbHNlO1xuICAgICAgdGhpcy5faGFzQ29udGVudCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xldmVsID0gMDtcbiAgZ2V0IGxldmVsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGV2ZWwgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCByZWFsTm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5IGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgZ2V0IGJyYW5jaENvbG9ycygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2JyYW5jaENvbG9ycztcbiAgfVxuXG4gIHByaXZhdGUgX2Ryb3Bab25lczogc3RyaW5nW10gPSBbJ2ZiZHotbm9kZSddO1xuICBnZXQgZHJvcFpvbmVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVEcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LXNsaWRlJ107XG4gIGdldCBzbGlkZURyb3Bab25lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlRHJvcFpvbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZ2luT2Zmc2V0ID0gMDtcbiAgZ2V0IG9yaWdpbk9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5PZmZzZXQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWdpbk9mZnNldChvcmlnaW5PZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuX29yaWdpbk9mZnNldCA9IG9yaWdpbk9mZnNldDtcbiAgICB0aGlzLl9vcmlnaW5MZWZ0TWFyZ2luID0gYCR7dGhpcy5fb3JpZ2luT2Zmc2V0ICogNH1weGA7XG4gIH1cbiAgcHJpdmF0ZSBfb3JpZ2luTGVmdE1hcmdpbiA9ICcwJztcbiAgZ2V0IG9yaWdpbkxlZnRNYXJnaW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luTGVmdE1hcmdpbjtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gIGdldCBmaXJzdEJyYW5jaENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3I7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpcnN0QnJhbmNoQ29sb3IoZmlyc3RCcmFuY2hDb2xvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgaWR4ID0gYnJhbmNoQ29sb3JzLmluZGV4T2YoZmlyc3RCcmFuY2hDb2xvcik7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBmaXJzdEJyYW5jaENvbG9yO1xuICAgICAgdGhpcy5fYnJhbmNoQ29sb3JzID0gYnJhbmNoQ29sb3JzLnNsaWNlKGlkeCkuY29uY2F0KGJyYW5jaENvbG9ycy5zbGljZSgwLCBpZHgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50RWRpdGVkTm9kZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPjtcbiAgZ2V0IGN1cnJlbnRFZGl0ZWROb2RlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuX2N1cnJlbnRFZGl0ZWROb2RlID0gdGhpcy5fc2VydmljZS5lZGl0ZWROb2RlRW50cnk7XG4gIH1cblxuICBvblJlc2l6ZSgpOiB2b2lkIHt9XG5cbiAgZWRpdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIGRlbGV0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLmRlbGV0ZU5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpKTtcbiAgICB0aGlzLl9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaWxkRW50cmllcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25Ecm9wU3VjY2VzcyhldnQ6IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4sIGNvbnRlbnQgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGRkID0gZXZ0Lml0ZW0uZGF0YSBhcyBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk7XG4gICAgaWYgKHRoaXMuX25vZGVFbnRyeSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmluc2VydE5vZGUoZGQsIG51bGwgYXMgYW55LCAwLCBjb250ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRkLm5vZGVUeXBlICE9PSB2b2lkIDAgJiYgKCF0aGlzLmlzTm9kZUVudHJ5IHx8ICh0aGlzLmlzTm9kZUVudHJ5ICYmIGNvbnRlbnQpKSkge1xuICAgICAgY29uc3QgZW1wdHlTbG90ID0gY29udGVudCA/XG4gICAgICAgICAge3BhcmVudDogKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSkubm9kZSwgcGFyZW50Tm9kZTogMH0gOlxuICAgICAgICAgIDxBamZGb3JtQnVpbGRlckVtcHR5U2xvdD50aGlzLl9ub2RlRW50cnk7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmluc2VydE5vZGUoXG4gICAgICAgICAgPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT5kZCwgZW1wdHlTbG90LnBhcmVudCwgZW1wdHlTbG90LnBhcmVudE5vZGUsIGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVTbGlkZURyb3BQcmVkaWNhdGUoaXRlbTogQ2RrRHJhZzxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpdGVtLmRhdGEuaXNTbGlkZTtcbiAgfVxuXG4gIGVtcHR5QXJlYURyb3BQcmVkaWNhdGUoKTogKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCkgPT4gYm9vbGVhbiB7XG4gICAgcmV0dXJuIChpdGVtOiBDZGtEcmFnLCBfZHJvcDogQ2RrRHJvcExpc3QpOiBib29sZWFuID0+IHtcbiAgICAgIGlmICh0aGlzLl9sZXZlbCA+IDApIHtcbiAgICAgICAgcmV0dXJuICFpdGVtLmRhdGEuaXNTbGlkZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtLmRhdGEuaXNTbGlkZSB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQnJhbmNoSGVpZ2h0cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSB8fCB0aGlzLmJyYW5jaExpbmVzID09IG51bGwgfHxcbiAgICAgICAgdGhpcy5jaGlsZEVudHJpZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub2RlRW50cnkgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnk7XG4gICAgY29uc3QgYnJhbmNoTGluZXM6IEFqZkZiQnJhbmNoTGluZVtdID0gdGhpcy5icmFuY2hMaW5lcy50b0FycmF5KCk7XG4gICAgY29uc3Qgc2xpY2VJZHggPSBub2RlRW50cnkuY29udGVudCAhPSBudWxsID8gbm9kZUVudHJ5LmNvbnRlbnQubGVuZ3RoIDogMDtcbiAgICBjb25zdCBjaGlsZEVudHJpZXM6IEVsZW1lbnRSZWZbXSA9IHRoaXMuY2hpbGRFbnRyaWVzLnRvQXJyYXkoKS5zbGljZShzbGljZUlkeCk7XG5cbiAgICBpZiAoYnJhbmNoTGluZXMubGVuZ3RoICE9IGNoaWxkRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBicmFuY2hMaW5lcy5mb3JFYWNoKChibDogQWpmRmJCcmFuY2hMaW5lLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgY2U6IEVsZW1lbnRSZWYgPSBjaGlsZEVudHJpZXNbaWR4XTtcbiAgICAgIGJsLmhlaWdodCA9IGNlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgIH0pO1xuICB9XG59XG4iXX0=