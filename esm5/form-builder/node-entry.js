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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUNVLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFhLFNBQVMsRUFDMUYsWUFBWSxFQUFFLGlCQUFpQixFQUNoQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUV3QixxQkFBcUIsRUFDbkQsTUFBTSx3QkFBd0IsQ0FBQztBQUdoQyxJQUFNLFlBQVksR0FBYztJQUM5QixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWLENBQUM7QUFHRjtJQXNGRSx3QkFBb0IsUUFBK0I7UUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUF4RTNDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBR3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFJakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFrQnJCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFRWCxrQkFBYSxHQUFhLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHaEQsZUFBVSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHckMsb0JBQWUsR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRzNDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUd4QixzQkFBaUIs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QUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQW5LRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsbzVGQUE4QjtvQkFFOUIsSUFBSSxFQUFFO3dCQUNKLGlCQUFpQixFQUFFLFlBQVk7cUJBQ2hDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQXRCOEIscUJBQXFCOzs7OEJBd0JqRCxZQUFZLFNBQUMsZUFBZTsrQkFDNUIsWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7MEJBTy9DLEtBQUs7NEJBT0wsS0FBSzt3QkFlTCxLQUFLOytCQWlCTCxLQUFLO21DQVNMLEtBQUs7O0lBaUdSLHFCQUFDO0NBQUEsQUFwS0QsSUFvS0M7U0ExSlksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wLCBDZGtEcm9wTGlzdH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRmJCcmFuY2hMaW5lfSBmcm9tICcuL2JyYW5jaC1saW5lJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90LCBBamZGb3JtQnVpbGRlck5vZGUsIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksIEFqZkZvcm1CdWlsZGVyU2VydmljZVxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcblxuXG5jb25zdCBicmFuY2hDb2xvcnM6IHN0cmluZyBbXSA9IFtcbiAgJyNGNDQzMzYnLCAvLyBSRURcbiAgJyM0Q0FGNTAnLCAvLyBHUkVFTlxuICAnIzNGNTFCNScsIC8vIElORElHT1xuICAnI0ZGQzEwNycsIC8vIEFNQkVSXG4gICcjNzk1NTQ4JywgLy8gQlJPV05cbl07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtZW50cnknLFxuICB0ZW1wbGF0ZVVybDogJ25vZGUtZW50cnkuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLWVudHJ5LmNzcyddLFxuICBob3N0OiB7XG4gICAgJyh3aW5kb3cucmVzaXplKSc6ICdvblJlc2l6ZSgpJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVFbnRyeSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRmJCcmFuY2hMaW5lKSBicmFuY2hMaW5lczogUXVlcnlMaXN0PEFqZkZiQnJhbmNoTGluZT47XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRmJOb2RlRW50cnksIHtyZWFkOiBFbGVtZW50UmVmfSkgY2hpbGRFbnRyaWVzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgcHJpdmF0ZSBfaGFzQ29udGVudCA9IGZhbHNlO1xuICBnZXQgaGFzQ29udGVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc0NvbnRlbnQ7IH1cblxuICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gIGdldCBpc0ZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNGaXJzdDsgfVxuICBASW5wdXQoKSBzZXQgaXNGaXJzdChpc0ZpcnN0OiBib29sZWFuKSB7IHRoaXMuX2lzRmlyc3QgPSBpc0ZpcnN0OyB9XG5cbiAgcHJpdmF0ZSBfaXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgZ2V0IGlzTm9kZUVudHJ5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNOb2RlRW50cnk7IH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGUgeyByZXR1cm4gdGhpcy5fbm9kZUVudHJ5OyB9XG4gIEBJbnB1dCgpIHNldCBub2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGUpIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBub2RlRW50cnk7XG4gICAgaWYgKG5vZGVFbnRyeSAhPSBudWxsICYmICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5KS5ub2RlICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG5lID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pm5vZGVFbnRyeTtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZS5ub2RlO1xuICAgICAgdGhpcy5faGFzQ29udGVudCA9IG5vZGUgIT0gbnVsbCAmJiBpc0NvbnRhaW5lck5vZGUobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGV2ZWwgPSAwO1xuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xldmVsOyB9XG4gIEBJbnB1dCgpIHNldCBsZXZlbCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX2xldmVsID0gdmFsdWU7IH1cblxuICBnZXQgcmVhbE5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2JyYW5jaENvbG9yczogc3RyaW5nW10gPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gIGdldCBicmFuY2hDb2xvcnMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fYnJhbmNoQ29sb3JzOyB9XG5cbiAgcHJpdmF0ZSBfZHJvcFpvbmVzOiBzdHJpbmdbXSA9IFsnZmJkei1ub2RlJ107XG4gIGdldCBkcm9wWm9uZXMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fZHJvcFpvbmVzOyB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVEcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LXNsaWRlJ107XG4gIGdldCBzbGlkZURyb3Bab25lcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl9zbGlkZURyb3Bab25lczsgfVxuXG4gIHByaXZhdGUgX29yaWdpbk9mZnNldCA9IDA7XG4gIGdldCBvcmlnaW5PZmZzZXQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX29yaWdpbk9mZnNldDsgfVxuICBASW5wdXQoKSBzZXQgb3JpZ2luT2Zmc2V0KG9yaWdpbk9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5fb3JpZ2luT2Zmc2V0ID0gb3JpZ2luT2Zmc2V0O1xuICAgIHRoaXMuX29yaWdpbkxlZnRNYXJnaW4gPSBgJHt0aGlzLl9vcmlnaW5PZmZzZXQgKiA0fXB4YDtcbiAgfVxuICBwcml2YXRlIF9vcmlnaW5MZWZ0TWFyZ2luID0gJzAnO1xuICBnZXQgb3JpZ2luTGVmdE1hcmdpbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fb3JpZ2luTGVmdE1hcmdpbjsgfVxuXG4gIHByaXZhdGUgX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gIGdldCBmaXJzdEJyYW5jaENvbG9yKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9maXJzdEJyYW5jaENvbG9yOyB9XG4gIEBJbnB1dCgpIHNldCBmaXJzdEJyYW5jaENvbG9yKGZpcnN0QnJhbmNoQ29sb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGlkeCA9IGJyYW5jaENvbG9ycy5pbmRleE9mKGZpcnN0QnJhbmNoQ29sb3IpO1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICB0aGlzLl9maXJzdEJyYW5jaENvbG9yID0gZmlyc3RCcmFuY2hDb2xvcjtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZShpZHgpLmNvbmNhdChicmFuY2hDb2xvcnMuc2xpY2UoMCwgaWR4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gICAgICB0aGlzLl9icmFuY2hDb2xvcnMgPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudEVkaXRlZE5vZGU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPjtcbiAgZ2V0IGN1cnJlbnRFZGl0ZWROb2RlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRFZGl0ZWROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoTGluZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5fY3VycmVudEVkaXRlZE5vZGUgPSB0aGlzLl9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeTtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICB9XG5cbiAgZWRpdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIGRlbGV0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLmRlbGV0ZU5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpKTtcbiAgICB0aGlzLl9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaWxkRW50cmllcy5jaGFuZ2VzXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb25Ecm9wU3VjY2VzcyhldnQ6IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4sIGNvbnRlbnQgPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IGRkID0gZXZ0Lml0ZW0uZGF0YSBhcyBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk7XG4gICAgaWYgKHRoaXMuX25vZGVFbnRyeSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmluc2VydE5vZGUoZGQsIG51bGwgYXMgYW55LCAwLCBjb250ZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRkLm5vZGVUeXBlICE9PSB2b2lkIDAgJiYgKCF0aGlzLmlzTm9kZUVudHJ5IHx8ICh0aGlzLmlzTm9kZUVudHJ5ICYmIGNvbnRlbnQpKSkge1xuICAgICAgY29uc3QgZW1wdHlTbG90ID0gY29udGVudCA/XG4gICAgICAgIHtwYXJlbnQ6ICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpLm5vZGUsIHBhcmVudE5vZGU6IDB9IDpcbiAgICAgICAgPEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90PnRoaXMuX25vZGVFbnRyeTtcbiAgICAgIHRoaXMuX3NlcnZpY2UuaW5zZXJ0Tm9kZShcbiAgICAgICAgPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT5kZCxcbiAgICAgICAgZW1wdHlTbG90LnBhcmVudCxcbiAgICAgICAgZW1wdHlTbG90LnBhcmVudE5vZGUsXG4gICAgICAgIGNvbnRlbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVNsaWRlRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICB9XG5cbiAgZW1wdHlBcmVhRHJvcFByZWRpY2F0ZSgpOiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHRoaXMuX2xldmVsID4gMCkge1xuICAgICAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW0uZGF0YS5pc1NsaWRlIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCcmFuY2hIZWlnaHRzKCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMubm9kZUVudHJ5ID09IG51bGwgfHwgIXRoaXMuaXNOb2RlRW50cnlcbiAgICAgIHx8IHRoaXMuYnJhbmNoTGluZXMgPT0gbnVsbCB8fCB0aGlzLmNoaWxkRW50cmllcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5vZGVFbnRyeSA9IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeTtcbiAgICBjb25zdCBicmFuY2hMaW5lczogQWpmRmJCcmFuY2hMaW5lW10gPSB0aGlzLmJyYW5jaExpbmVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBzbGljZUlkeCA9IG5vZGVFbnRyeS5jb250ZW50ICE9IG51bGwgPyBub2RlRW50cnkuY29udGVudC5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNoaWxkRW50cmllczogRWxlbWVudFJlZltdID0gdGhpcy5jaGlsZEVudHJpZXMudG9BcnJheSgpLnNsaWNlKHNsaWNlSWR4KTtcblxuICAgIGlmIChicmFuY2hMaW5lcy5sZW5ndGggIT0gY2hpbGRFbnRyaWVzLmxlbmd0aCkgeyByZXR1cm47IH1cblxuICAgIGJyYW5jaExpbmVzLmZvckVhY2goKGJsOiBBamZGYkJyYW5jaExpbmUsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBjZTogRWxlbWVudFJlZiAgPSBjaGlsZEVudHJpZXNbaWR4XTtcbiAgICAgIGJsLmhlaWdodCA9IGNlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgIH0pO1xuICB9XG59XG4iXX0=