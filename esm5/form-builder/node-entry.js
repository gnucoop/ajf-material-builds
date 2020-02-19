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
var branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548',
];
var AjfFbNodeEntry = /** @class */ (function () {
    function AjfFbNodeEntry(_service) {
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
    Object.defineProperty(AjfFbNodeEntry.prototype, "hasContent", {
        get: function () { return this._hasContent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "isFirst", {
        get: function () { return this._isFirst; },
        set: function (isFirst) { this._isFirst = isFirst; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "isNodeEntry", {
        get: function () { return this._isNodeEntry; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "nodeEntry", {
        get: function () { return this._nodeEntry; },
        set: function (nodeEntry) {
            this._nodeEntry = nodeEntry;
            if (nodeEntry != null && nodeEntry.node !== void 0) {
                var ne = nodeEntry;
                this._isNodeEntry = true;
                var node = ne.node;
                this._hasContent = node != null && isContainerNode(node);
            }
            else {
                this._isNodeEntry = false;
                this._hasContent = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "level", {
        get: function () { return this._level; },
        set: function (value) { this._level = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "realNodeEntry", {
        get: function () {
            return this._nodeEntry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "branchColors", {
        get: function () { return this._branchColors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "dropZones", {
        get: function () { return this._dropZones; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "slideDropZones", {
        get: function () { return this._slideDropZones; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "originOffset", {
        get: function () { return this._originOffset; },
        set: function (originOffset) {
            this._originOffset = originOffset;
            this._originLeftMargin = this._originOffset * 4 + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "originLeftMargin", {
        get: function () { return this._originLeftMargin; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "firstBranchColor", {
        get: function () { return this._firstBranchColor; },
        set: function (firstBranchColor) {
            var idx = branchColors.indexOf(firstBranchColor);
            if (idx > 0) {
                this._firstBranchColor = firstBranchColor;
                this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
            }
            else {
                this._firstBranchColor = branchColors[0];
                this._branchColors = branchColors.slice(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "currentEditedNode", {
        get: function () {
            return this._currentEditedNode;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbNodeEntry.prototype.onResize = function () {
    };
    AjfFbNodeEntry.prototype.edit = function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry(this.nodeEntry);
    };
    AjfFbNodeEntry.prototype.delete = function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry(this.nodeEntry);
    };
    AjfFbNodeEntry.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this._updateBranchHeights(); });
        this._childEntriesSubscription = this.childEntries.changes
            .subscribe(function () {
            _this._updateBranchHeights();
        });
    };
    AjfFbNodeEntry.prototype.ngOnDestroy = function () {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    };
    AjfFbNodeEntry.prototype.onDropSuccess = function (evt, content) {
        if (content === void 0) { content = false; }
        var dd = evt.item.data;
        if (this._nodeEntry == null) {
            this._service.insertNode(dd, null, 0, content);
            return;
        }
        if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
            var emptySlot = content ?
                { parent: this.nodeEntry.node, parentNode: 0 } :
                this._nodeEntry;
            this._service.insertNode(dd, emptySlot.parent, emptySlot.parentNode, content);
        }
    };
    AjfFbNodeEntry.prototype.disableSlideDropPredicate = function (item) {
        return !item.data.isSlide;
    };
    AjfFbNodeEntry.prototype.emptyAreaDropPredicate = function () {
        var _this = this;
        return function (item, _drop) {
            if (_this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        };
    };
    AjfFbNodeEntry.prototype._updateBranchHeights = function () {
        if (this.nodeEntry == null || !this.isNodeEntry
            || this.branchLines == null || this.childEntries == null) {
            return;
        }
        var nodeEntry = this.nodeEntry;
        var branchLines = this.branchLines.toArray();
        var sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
        var childEntries = this.childEntries.toArray().slice(sliceIdx);
        if (branchLines.length != childEntries.length) {
            return;
        }
        branchLines.forEach(function (bl, idx) {
            var ce = childEntries[idx];
            bl.height = ce.nativeElement.offsetTop;
        });
    };
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
    AjfFbNodeEntry.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
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
}());
export { AjfFbNodeEntry };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFDMUYsWUFBWSxFQUFFLGlCQUFpQixFQUNoQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUV3QixxQkFBcUIsRUFDbkQsTUFBTSx3QkFBd0IsQ0FBQztBQUdoQyxJQUFNLFlBQVksR0FBYztJQUM5QixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWLENBQUM7QUFHRjtJQXNGRSx3QkFBb0IsUUFBK0I7UUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUF4RTNDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBR3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFrQnJCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFRWCxrQkFBYSxHQUFhLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHaEQsZUFBVSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHckMsb0JBQWUsR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRzNDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUd4QixzQkFBaUIs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QUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQW5LRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsbzVGQUE4QjtvQkFFOUIsSUFBSSxFQUFFO3dCQUNKLGlCQUFpQixFQUFFLFlBQVk7cUJBQ2hDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXRCOEIscUJBQXFCOzs7OEJBd0JqRCxZQUFZLFNBQUMsZUFBZTsrQkFDNUIsWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7MEJBTy9DLEtBQUs7NEJBT0wsS0FBSzt3QkFlTCxLQUFLOytCQWlCTCxLQUFLO21DQVNMLEtBQUs7O0lBaUdSLHFCQUFDO0NBQUEsQUFwS0QsSUFvS0M7U0ExSlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3AsIENka0Ryb3BMaXN0fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGYkJyYW5jaExpbmV9IGZyb20gJy4vYnJhbmNoLWxpbmUnO1xuaW1wb3J0IHtcbiAgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3QsIEFqZkZvcm1CdWlsZGVyTm9kZSwgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSwgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG5cbmNvbnN0IGJyYW5jaENvbG9yczogc3RyaW5nIFtdID0gW1xuICAnI0Y0NDMzNicsIC8vIFJFRFxuICAnIzRDQUY1MCcsIC8vIEdSRUVOXG4gICcjM0Y1MUI1JywgLy8gSU5ESUdPXG4gICcjRkZDMTA3JywgLy8gQU1CRVJcbiAgJyM3OTU1NDgnLCAvLyBCUk9XTlxuXTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1lbnRyeS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25vZGUtZW50cnkuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnKHdpbmRvdy5yZXNpemUpJzogJ29uUmVzaXplKCknXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZUVudHJ5IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihBamZGYkJyYW5jaExpbmUpIGJyYW5jaExpbmVzOiBRdWVyeUxpc3Q8QWpmRmJCcmFuY2hMaW5lPjtcbiAgQFZpZXdDaGlsZHJlbihBamZGYk5vZGVFbnRyeSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBjaGlsZEVudHJpZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBwcml2YXRlIF9oYXNDb250ZW50ID0gZmFsc2U7XG4gIGdldCBoYXNDb250ZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzQ29udGVudDsgfVxuXG4gIHByaXZhdGUgX2lzRmlyc3QgPSBmYWxzZTtcbiAgZ2V0IGlzRmlyc3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0ZpcnN0OyB9XG4gIEBJbnB1dCgpIHNldCBpc0ZpcnN0KGlzRmlyc3Q6IGJvb2xlYW4pIHsgdGhpcy5faXNGaXJzdCA9IGlzRmlyc3Q7IH1cblxuICBwcml2YXRlIF9pc05vZGVFbnRyeSA9IGZhbHNlO1xuICBnZXQgaXNOb2RlRW50cnkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc05vZGVFbnRyeTsgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlO1xuICBnZXQgbm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZSB7IHJldHVybiB0aGlzLl9ub2RlRW50cnk7IH1cbiAgQElucHV0KCkgc2V0IG5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZSkge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IG5vZGVFbnRyeTtcbiAgICBpZiAobm9kZUVudHJ5ICE9IG51bGwgJiYgKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5ub2RlRW50cnkpLm5vZGUgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgbmUgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5O1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSB0cnVlO1xuICAgICAgY29uc3Qgbm9kZSA9IG5lLm5vZGU7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gbm9kZSAhPSBudWxsICYmIGlzQ29udGFpbmVyTm9kZShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sZXZlbCA9IDA7XG4gIGdldCBsZXZlbCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGV2ZWw7IH1cbiAgQElucHV0KCkgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fbGV2ZWwgPSB2YWx1ZTsgfVxuXG4gIGdldCByZWFsTm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5IGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgZ2V0IGJyYW5jaENvbG9ycygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9icmFuY2hDb2xvcnM7IH1cblxuICBwcml2YXRlIF9kcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LW5vZGUnXTtcbiAgZ2V0IGRyb3Bab25lcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9kcm9wWm9uZXM7IH1cblxuICBwcml2YXRlIF9zbGlkZURyb3Bab25lczogc3RyaW5nW10gPSBbJ2ZiZHotc2xpZGUnXTtcbiAgZ2V0IHNsaWRlRHJvcFpvbmVzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX3NsaWRlRHJvcFpvbmVzOyB9XG5cbiAgcHJpdmF0ZSBfb3JpZ2luT2Zmc2V0ID0gMDtcbiAgZ2V0IG9yaWdpbk9mZnNldCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fb3JpZ2luT2Zmc2V0OyB9XG4gIEBJbnB1dCgpIHNldCBvcmlnaW5PZmZzZXQob3JpZ2luT2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9vcmlnaW5PZmZzZXQgPSBvcmlnaW5PZmZzZXQ7XG4gICAgdGhpcy5fb3JpZ2luTGVmdE1hcmdpbiA9IGAke3RoaXMuX29yaWdpbk9mZnNldCAqIDR9cHhgO1xuICB9XG4gIHByaXZhdGUgX29yaWdpbkxlZnRNYXJnaW4gPSAnMCc7XG4gIGdldCBvcmlnaW5MZWZ0TWFyZ2luKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9vcmlnaW5MZWZ0TWFyZ2luOyB9XG5cbiAgcHJpdmF0ZSBfZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgZ2V0IGZpcnN0QnJhbmNoQ29sb3IoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3I7IH1cbiAgQElucHV0KCkgc2V0IGZpcnN0QnJhbmNoQ29sb3IoZmlyc3RCcmFuY2hDb2xvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgaWR4ID0gYnJhbmNoQ29sb3JzLmluZGV4T2YoZmlyc3RCcmFuY2hDb2xvcik7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBmaXJzdEJyYW5jaENvbG9yO1xuICAgICAgdGhpcy5fYnJhbmNoQ29sb3JzID0gYnJhbmNoQ29sb3JzLnNsaWNlKGlkeCkuY29uY2F0KGJyYW5jaENvbG9ycy5zbGljZSgwLCBpZHgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50RWRpdGVkTm9kZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgY3VycmVudEVkaXRlZE5vZGUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEVkaXRlZE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZSA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7XG4gIH1cblxuICBlZGl0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgZGVsZXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NlcnZpY2UuZGVsZXRlTm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCkpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hpbGRFbnRyaWVzLmNoYW5nZXNcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBvbkRyb3BTdWNjZXNzKGV2dDogQ2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PiwgY29udGVudCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgZGQgPSBldnQuaXRlbS5kYXRhIGFzIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeTtcbiAgICBpZiAodGhpcy5fbm9kZUVudHJ5ID09IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuaW5zZXJ0Tm9kZShkZCwgbnVsbCBhcyBhbnksIDAsIGNvbnRlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGQubm9kZVR5cGUgIT09IHZvaWQgMCAmJiAoIXRoaXMuaXNOb2RlRW50cnkgfHwgKHRoaXMuaXNOb2RlRW50cnkgJiYgY29udGVudCkpKSB7XG4gICAgICBjb25zdCBlbXB0eVNsb3QgPSBjb250ZW50ID9cbiAgICAgICAge3BhcmVudDogKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSkubm9kZSwgcGFyZW50Tm9kZTogMH0gOlxuICAgICAgICA8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q+dGhpcy5fbm9kZUVudHJ5O1xuICAgICAgdGhpcy5fc2VydmljZS5pbnNlcnROb2RlKFxuICAgICAgICA8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PmRkLFxuICAgICAgICBlbXB0eVNsb3QucGFyZW50LFxuICAgICAgICBlbXB0eVNsb3QucGFyZW50Tm9kZSxcbiAgICAgICAgY29udGVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU2xpZGVEcm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG4gIH1cblxuICBlbXB0eUFyZWFEcm9wUHJlZGljYXRlKCk6IChpdGVtOiBDZGtEcmFnLCBfZHJvcDogQ2RrRHJvcExpc3QpID0+IGJvb2xlYW4ge1xuICAgIHJldHVybiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAodGhpcy5fbGV2ZWwgPiAwKSB7XG4gICAgICAgIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXRlbS5kYXRhLmlzU2xpZGUgfHwgZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJyYW5jaEhlaWdodHMoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeVxuICAgICAgfHwgdGhpcy5icmFuY2hMaW5lcyA9PSBudWxsIHx8IHRoaXMuY2hpbGRFbnRyaWVzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qgbm9kZUVudHJ5ID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5O1xuICAgIGNvbnN0IGJyYW5jaExpbmVzOiBBamZGYkJyYW5jaExpbmVbXSA9IHRoaXMuYnJhbmNoTGluZXMudG9BcnJheSgpO1xuICAgIGNvbnN0IHNsaWNlSWR4ID0gbm9kZUVudHJ5LmNvbnRlbnQgIT0gbnVsbCA/IG5vZGVFbnRyeS5jb250ZW50Lmxlbmd0aCA6IDA7XG4gICAgY29uc3QgY2hpbGRFbnRyaWVzOiBFbGVtZW50UmVmW10gPSB0aGlzLmNoaWxkRW50cmllcy50b0FycmF5KCkuc2xpY2Uoc2xpY2VJZHgpO1xuXG4gICAgaWYgKGJyYW5jaExpbmVzLmxlbmd0aCAhPSBjaGlsZEVudHJpZXMubGVuZ3RoKSB7IHJldHVybjsgfVxuXG4gICAgYnJhbmNoTGluZXMuZm9yRWFjaCgoYmw6IEFqZkZiQnJhbmNoTGluZSwgaWR4OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGNlOiBFbGVtZW50UmVmICA9IGNoaWxkRW50cmllc1tpZHhdO1xuICAgICAgYmwuaGVpZ2h0ID0gY2UubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==