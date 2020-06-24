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
                },] }
    ];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUtMLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBR2hDLE1BQU0sWUFBWSxHQUFhO0lBQzdCLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0NBQ1YsQ0FBQztBQUdGO0lBQUEsTUFRYSxjQUFjO1FBMkd6QixZQUFvQixRQUErQjtZQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtZQXZHM0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFLcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztZQVNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQXVCckIsV0FBTSxHQUFHLENBQUMsQ0FBQztZQWFYLGtCQUFhLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUtoRCxlQUFVLEdBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUtyQyxvQkFBZSxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFLM0Msa0JBQWEsR0FBRyxDQUFDLENBQUM7WUFTbEIsc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1lBS3hCLHNCQUFp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QUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0JBcEJDLHFCQUFxQjs7OzhCQXNCcEIsWUFBWSxTQUFDLGVBQWU7K0JBQzVCLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDOzBCQVcvQyxLQUFLOzRCQWNMLEtBQUs7d0JBa0JMLEtBQUs7K0JBNEJMLEtBQUs7bUNBY0wsS0FBSzs7SUFtR1IscUJBQUM7S0FBQTtTQTFMWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3AsIENka0Ryb3BMaXN0fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGYkJyYW5jaExpbmV9IGZyb20gJy4vYnJhbmNoLWxpbmUnO1xuaW1wb3J0IHtcbiAgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3QsXG4gIEFqZkZvcm1CdWlsZGVyTm9kZSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5cbmNvbnN0IGJyYW5jaENvbG9yczogc3RyaW5nW10gPSBbXG4gICcjRjQ0MzM2JywgIC8vIFJFRFxuICAnIzRDQUY1MCcsICAvLyBHUkVFTlxuICAnIzNGNTFCNScsICAvLyBJTkRJR09cbiAgJyNGRkMxMDcnLCAgLy8gQU1CRVJcbiAgJyM3OTU1NDgnLCAgLy8gQlJPV05cbl07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtZW50cnknLFxuICB0ZW1wbGF0ZVVybDogJ25vZGUtZW50cnkuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLWVudHJ5LmNzcyddLFxuICBob3N0OiB7Jyh3aW5kb3cucmVzaXplKSc6ICdvblJlc2l6ZSgpJ30sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZUVudHJ5IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihBamZGYkJyYW5jaExpbmUpIGJyYW5jaExpbmVzOiBRdWVyeUxpc3Q8QWpmRmJCcmFuY2hMaW5lPjtcbiAgQFZpZXdDaGlsZHJlbihBamZGYk5vZGVFbnRyeSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBjaGlsZEVudHJpZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBwcml2YXRlIF9oYXNDb250ZW50ID0gZmFsc2U7XG4gIGdldCBoYXNDb250ZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNDb250ZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNGaXJzdCA9IGZhbHNlO1xuICBnZXQgaXNGaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNGaXJzdDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNGaXJzdChpc0ZpcnN0OiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNGaXJzdCA9IGlzRmlyc3Q7XG4gIH1cblxuICBwcml2YXRlIF9pc05vZGVFbnRyeSA9IGZhbHNlO1xuICBnZXQgaXNOb2RlRW50cnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGU7XG4gIGdldCBub2RlRW50cnkoKTogQWpmRm9ybUJ1aWxkZXJOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGUpIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBub2RlRW50cnk7XG4gICAgaWYgKG5vZGVFbnRyeSAhPSBudWxsICYmICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5KS5ub2RlICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG5lID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pm5vZGVFbnRyeTtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZS5ub2RlO1xuICAgICAgdGhpcy5faGFzQ29udGVudCA9IG5vZGUgIT0gbnVsbCAmJiBpc0NvbnRhaW5lck5vZGUobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGV2ZWwgPSAwO1xuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZXZlbCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHJlYWxOb2RlRW50cnkoKTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cnkgYXMgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk7XG4gIH1cblxuICBwcml2YXRlIF9icmFuY2hDb2xvcnM6IHN0cmluZ1tdID0gYnJhbmNoQ29sb3JzLnNsaWNlKDApO1xuICBnZXQgYnJhbmNoQ29sb3JzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fYnJhbmNoQ29sb3JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZHJvcFpvbmVzOiBzdHJpbmdbXSA9IFsnZmJkei1ub2RlJ107XG4gIGdldCBkcm9wWm9uZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kcm9wWm9uZXM7XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZURyb3Bab25lczogc3RyaW5nW10gPSBbJ2ZiZHotc2xpZGUnXTtcbiAgZ2V0IHNsaWRlRHJvcFpvbmVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVEcm9wWm9uZXM7XG4gIH1cblxuICBwcml2YXRlIF9vcmlnaW5PZmZzZXQgPSAwO1xuICBnZXQgb3JpZ2luT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbk9mZnNldDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZ2luT2Zmc2V0KG9yaWdpbk9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb3JpZ2luT2Zmc2V0ID0gb3JpZ2luT2Zmc2V0O1xuICAgIHRoaXMuX29yaWdpbkxlZnRNYXJnaW4gPSBgJHt0aGlzLl9vcmlnaW5PZmZzZXQgKiA0fXB4YDtcbiAgfVxuICBwcml2YXRlIF9vcmlnaW5MZWZ0TWFyZ2luID0gJzAnO1xuICBnZXQgb3JpZ2luTGVmdE1hcmdpbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5MZWZ0TWFyZ2luO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgZ2V0IGZpcnN0QnJhbmNoQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZmlyc3RCcmFuY2hDb2xvcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZmlyc3RCcmFuY2hDb2xvcihmaXJzdEJyYW5jaENvbG9yOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpZHggPSBicmFuY2hDb2xvcnMuaW5kZXhPZihmaXJzdEJyYW5jaENvbG9yKTtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgdGhpcy5fZmlyc3RCcmFuY2hDb2xvciA9IGZpcnN0QnJhbmNoQ29sb3I7XG4gICAgICB0aGlzLl9icmFuY2hDb2xvcnMgPSBicmFuY2hDb2xvcnMuc2xpY2UoaWR4KS5jb25jYXQoYnJhbmNoQ29sb3JzLnNsaWNlKDAsIGlkeCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maXJzdEJyYW5jaENvbG9yID0gYnJhbmNoQ29sb3JzWzBdO1xuICAgICAgdGhpcy5fYnJhbmNoQ29sb3JzID0gYnJhbmNoQ29sb3JzLnNsaWNlKDApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2N1cnJlbnRFZGl0ZWROb2RlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+O1xuICBnZXQgY3VycmVudEVkaXRlZE5vZGUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFZGl0ZWROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoTGluZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5fY3VycmVudEVkaXRlZE5vZGUgPSB0aGlzLl9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeTtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge31cblxuICBlZGl0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgZGVsZXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuZGVsZXRlTm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCkpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hpbGRFbnRyaWVzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZUJyYW5jaEhlaWdodHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvbkRyb3BTdWNjZXNzKGV2dDogQ2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PiwgY29udGVudCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgZGQgPSBldnQuaXRlbS5kYXRhIGFzIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeTtcbiAgICBpZiAodGhpcy5fbm9kZUVudHJ5ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuaW5zZXJ0Tm9kZShkZCwgbnVsbCBhcyBhbnksIDAsIGNvbnRlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGQubm9kZVR5cGUgIT09IHZvaWQgMCAmJiAoIXRoaXMuaXNOb2RlRW50cnkgfHwgKHRoaXMuaXNOb2RlRW50cnkgJiYgY29udGVudCkpKSB7XG4gICAgICBjb25zdCBlbXB0eVNsb3QgPSBjb250ZW50ID9cbiAgICAgICAgICB7cGFyZW50OiAoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KS5ub2RlLCBwYXJlbnROb2RlOiAwfSA6XG4gICAgICAgICAgPEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90PnRoaXMuX25vZGVFbnRyeTtcbiAgICAgIHRoaXMuX3NlcnZpY2UuaW5zZXJ0Tm9kZShcbiAgICAgICAgICA8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PmRkLCBlbXB0eVNsb3QucGFyZW50LCBlbXB0eVNsb3QucGFyZW50Tm9kZSwgY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVNsaWRlRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICB9XG5cbiAgZW1wdHlBcmVhRHJvcFByZWRpY2F0ZSgpOiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHRoaXMuX2xldmVsID4gMCkge1xuICAgICAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW0uZGF0YS5pc1NsaWRlIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCcmFuY2hIZWlnaHRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5IHx8IHRoaXMuYnJhbmNoTGluZXMgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLmNoaWxkRW50cmllcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vZGVFbnRyeSA9IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeTtcbiAgICBjb25zdCBicmFuY2hMaW5lczogQWpmRmJCcmFuY2hMaW5lW10gPSB0aGlzLmJyYW5jaExpbmVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBzbGljZUlkeCA9IG5vZGVFbnRyeS5jb250ZW50ICE9IG51bGwgPyBub2RlRW50cnkuY29udGVudC5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNoaWxkRW50cmllczogRWxlbWVudFJlZltdID0gdGhpcy5jaGlsZEVudHJpZXMudG9BcnJheSgpLnNsaWNlKHNsaWNlSWR4KTtcblxuICAgIGlmIChicmFuY2hMaW5lcy5sZW5ndGggIT0gY2hpbGRFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJyYW5jaExpbmVzLmZvckVhY2goKGJsOiBBamZGYkJyYW5jaExpbmUsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBjZTogRWxlbWVudFJlZiA9IGNoaWxkRW50cmllc1tpZHhdO1xuICAgICAgYmwuaGVpZ2h0ID0gY2UubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==