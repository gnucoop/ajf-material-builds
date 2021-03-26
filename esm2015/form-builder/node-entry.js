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
import { isContainerNode, isSlidesNode } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfFbBranchLine } from './branch-line';
import { AjfFormBuilderService } from './form-builder-service';
import { disableFieldDropPredicate, disableSlideDropPredicate, onDropProcess } from './form-builder-utils';
const branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548', // BROWN
];
export class AjfFbNodeEntry {
    constructor(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._isExpanded = false;
        this._level = 0;
        this._isDraggable = true;
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
    get isExpanded() {
        return this._isExpanded;
    }
    set isExpanded(exp) {
        this._isExpanded = exp;
        setTimeout(() => this._updateBranchHeights(), 400);
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
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(draggable) {
        this._isDraggable = draggable;
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
    edit(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry(this.nodeEntry);
    }
    delete(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry(this.nodeEntry);
    }
    isLastNode() {
        if (!this.realNodeEntry || !this.realNodeEntry.children) {
            return false;
        }
        return !this.realNodeEntry.children[0].children;
    }
    isSlide(node) {
        return isSlidesNode(node);
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
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        onDropProcess(event, this._service, this._nodeEntry, content);
    }
    /**
     * Assigns a progressive id to the dropList, to connect it to the FormBuilder source list.
     * @param empty True if the list is marked as empty.
     */
    assignId(empty = false) {
        return this._service.assignListId(this.realNodeEntry.node, empty);
    }
    disableSlideDrop(item) {
        return disableSlideDropPredicate(item);
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
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
                template: "<ng-container *ngIf=\"nodeEntry != null ; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry && !isLastNode()\">\n    <ajf-fb-branch-line\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n      [offset]=\"idx\"\n      [color]=\"branchColors[idx]\"\n    ></ajf-fb-branch-line>\n  </ng-template>\n\n  <div\n    class=\"mat-card-container\"\n    [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\"\n  >\n    <div\n      *ngIf=\"!isFirst\"\n      class=\"ajf-origin-line\"\n      [style.margin-left]=\"originLeftMargin\"\n      [style.border-color]=\"firstBranchColor\"\n    ></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <ng-container *ngIf=\"!isDraggable; else draggable\">\n        <mat-card>\n          <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-card>\n      </ng-container>\n\n      <ng-template #draggable>\n        <mat-card cdkDrag [cdkDragData]=\"realNodeEntry\" class=\"ajf-draggable-box\">\n          <ng-container\n            *ngIf=\"isSlide(realNodeEntry.node); else fieldPanel\"\n          >\n            <ng-container *ngTemplateOutlet=\"slidePanel\"></ng-container>\n          </ng-container>\n        </mat-card>\n      </ng-template>\n\n      <ng-template #slidePanel>\n        <mat-expansion-panel\n          [expanded]=\"isExpanded\"\n          (opened)=\"isExpanded = true\"\n          (closed)=\"isExpanded = false\"\n          class=\"mat-elevation-z\"\n        >\n          <mat-expansion-panel-header>\n            <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          </mat-expansion-panel-header>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-expansion-panel>\n      </ng-template>\n\n      <ng-template #fieldPanel>\n        <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n        <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n      </ng-template>\n\n      <ng-template #cardTitle>\n        <div class=\"ajf-title-row\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          <span\n            class=\"ajf-title\"\n            [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | translate\"\n          ></span>\n          <span\n            *ngIf=\"realNodeEntry.node.visibility && realNodeEntry.node.visibility?.condition !== 'true'\"\n            class=\"ajf-visibility-condition\"\n            [innerHTML]=\"'Condition: (' + realNodeEntry.node.visibility?.condition + ')'\"\n          >\n          </span>\n          <span class=\"ajf-actions\">\n            <button\n              [disabled]=\"(currentEditedNode|async) == nodeEntry\"\n              (click)=\"edit($event)\"\n              mat-icon-button\n            >\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button\n              [disabled]=\"(currentEditedNode|async) == null\"\n              (click)=\"delete($event)\"\n              mat-icon-button\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n      </ng-template>\n\n      <ng-template #cardContent>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n            cdkDropList\n            class=\"ajf-fields-list\"\n            *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n            [id]=\"assignId()\"\n            [level]=\"level + 1\"\n            [isFirst]=\"isFirstChild\"\n            [firstBranchColor]=\"branchColors[idx]\"\n            [nodeEntry]=\"contentEntry\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            [isExpanded]=\"isExpanded\"\n          ></ajf-fb-node-entry>\n          <mat-card\n            class=\"ajf-empty\"\n            *ngIf=\"realNodeEntry.content.length === 0\"\n            cdkDropList\n            [id]=\"assignId(true)\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            ><mat-card-title>Drop your fields here</mat-card-title></mat-card\n          >\n        </div>\n      </ng-template>\n    </ng-template>\n  </div>\n\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ng-container\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n    >\n      <ajf-fb-node-entry\n        *ngIf=\"!isLastNode()\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"\n        [isExpanded]=\"isExpanded\"\n      ></ajf-fb-node-entry>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card\n      class=\"ajf-empty\"\n      cdkDropList\n      [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n      (cdkDropListDropped)=\"onDrop($event)\"\n      ><mat-card-title>Drop your slides here</mat-card-title>\n    </mat-card>\n  </div>\n</ng-template>\n",
                host: { '(window.resize)': 'onResize()' },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:#999}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:#ccc}ajf-fb-node-entry .mat-card-container mat-card.ajf-draggable-box{padding:20px 10px;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;color:rgba(0,0,0,.87);box-sizing:border-box;cursor:move;background:#fff;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:0;min-height:60px}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform 250ms cubic-bezier(0, 0, 0.2, 1)}\n"]
            },] }
];
AjfFbNodeEntry.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbNodeEntry.propDecorators = {
    branchLines: [{ type: ViewChildren, args: [AjfFbBranchLine,] }],
    childEntries: [{ type: ViewChildren, args: [AjfFbNodeEntry, { read: ElementRef },] }],
    isFirst: [{ type: Input }],
    isExpanded: [{ type: Input }],
    nodeEntry: [{ type: Input }],
    level: [{ type: Input }],
    isDraggable: [{ type: Input }],
    originOffset: [{ type: Input }],
    firstBranchColor: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVUsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXZFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU5QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFJTCxxQkFBcUIsRUFDdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUN6QixhQUFhLEVBQ2QsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixNQUFNLFlBQVksR0FBYTtJQUM3QixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUyxFQUFHLFFBQVE7Q0FDckIsQ0FBQztBQVdGLE1BQU0sT0FBTyxjQUFjO0lBNkh6QixZQUFvQixRQUErQjtRQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQXpIM0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUtyQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQTRCcEIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQVFYLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBYTdCLGtCQUFhLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMs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QU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sWUFBWSxHQUFpQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvRSxJQUFJLFdBQVcsQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUM3QyxPQUFPO1NBQ1I7UUFFRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBbUIsRUFBRSxHQUFXLEVBQUUsRUFBRTtZQUN2RCxNQUFNLEVBQUUsR0FBZSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQXhPRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsbWtLQUE4QjtnQkFFOUIsSUFBSSxFQUFFLEVBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFDO2dCQUN2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUF4QkMscUJBQXFCOzs7MEJBMEJwQixZQUFZLFNBQUMsZUFBZTsyQkFDNUIsWUFBWSxTQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7c0JBVy9DLEtBQUs7eUJBY0wsS0FBSzt3QkFVTCxLQUFLO29CQWtCTCxLQUFLOzBCQVFMLEtBQUs7MkJBNEJMLEtBQUs7K0JBY0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZOb2RlLCBpc0NvbnRhaW5lck5vZGUsIGlzU2xpZGVzTm9kZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3AsIENka0Ryb3BMaXN0fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZGYkJyYW5jaExpbmV9IGZyb20gJy4vYnJhbmNoLWxpbmUnO1xuaW1wb3J0IHtcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlLFxuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlclNlcnZpY2Vcbn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge1xuICBkaXNhYmxlRmllbGREcm9wUHJlZGljYXRlLFxuICBkaXNhYmxlU2xpZGVEcm9wUHJlZGljYXRlLFxuICBvbkRyb3BQcm9jZXNzXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXV0aWxzJztcblxuY29uc3QgYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IFtcbiAgJyNGNDQzMzYnLCAgLy8gUkVEXG4gICcjNENBRjUwJywgIC8vIEdSRUVOXG4gICcjM0Y1MUI1JywgIC8vIElORElHT1xuICAnI0ZGQzEwNycsICAvLyBBTUJFUlxuICAnIzc5NTU0OCcsICAvLyBCUk9XTlxuXTtcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS1lbnRyeScsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1lbnRyeS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25vZGUtZW50cnkuY3NzJ10sXG4gIGhvc3Q6IHsnKHdpbmRvdy5yZXNpemUpJzogJ29uUmVzaXplKCknfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJOb2RlRW50cnkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkcmVuKEFqZkZiQnJhbmNoTGluZSkgYnJhbmNoTGluZXM6IFF1ZXJ5TGlzdDxBamZGYkJyYW5jaExpbmU+O1xuICBAVmlld0NoaWxkcmVuKEFqZkZiTm9kZUVudHJ5LCB7cmVhZDogRWxlbWVudFJlZn0pIGNoaWxkRW50cmllczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIHByaXZhdGUgX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgZ2V0IGhhc0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0NvbnRlbnQ7XG4gIH1cblxuICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gIGdldCBpc0ZpcnN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0ZpcnN0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc0ZpcnN0KGlzRmlyc3Q6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0ZpcnN0ID0gaXNGaXJzdDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gIGdldCBpc05vZGVFbnRyeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNOb2RlRW50cnk7XG4gIH1cblxuICBwcml2YXRlIF9pc0V4cGFuZGVkID0gZmFsc2U7XG4gIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0V4cGFuZGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc0V4cGFuZGVkKGV4cDogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzRXhwYW5kZWQgPSBleHA7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCksIDQwMCk7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGUge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cnk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZSkge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IG5vZGVFbnRyeTtcbiAgICBpZiAobm9kZUVudHJ5ICE9IG51bGwgJiYgKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5ub2RlRW50cnkpLm5vZGUgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgbmUgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5O1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSB0cnVlO1xuICAgICAgY29uc3Qgbm9kZSA9IG5lLm5vZGU7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gbm9kZSAhPSBudWxsICYmIGlzQ29udGFpbmVyTm9kZShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sZXZlbCA9IDA7XG4gIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sZXZlbDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbGV2ZWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xldmVsID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfaXNEcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBnZXQgaXNEcmFnZ2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRHJhZ2dhYmxlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc0RyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0RyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgfVxuXG4gIGdldCByZWFsTm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5IGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgZ2V0IGJyYW5jaENvbG9ycygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2JyYW5jaENvbG9ycztcbiAgfVxuXG4gIHByaXZhdGUgX2Ryb3Bab25lczogc3RyaW5nW10gPSBbJ2ZiZHotbm9kZSddO1xuICBnZXQgZHJvcFpvbmVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVEcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LXNsaWRlJ107XG4gIGdldCBzbGlkZURyb3Bab25lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlRHJvcFpvbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZ2luT2Zmc2V0ID0gMDtcbiAgZ2V0IG9yaWdpbk9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5PZmZzZXQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWdpbk9mZnNldChvcmlnaW5PZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuX29yaWdpbk9mZnNldCA9IG9yaWdpbk9mZnNldDtcbiAgICB0aGlzLl9vcmlnaW5MZWZ0TWFyZ2luID0gYCR7dGhpcy5fb3JpZ2luT2Zmc2V0ICogNH1weGA7XG4gIH1cbiAgcHJpdmF0ZSBfb3JpZ2luTGVmdE1hcmdpbiA9ICcwJztcbiAgZ2V0IG9yaWdpbkxlZnRNYXJnaW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luTGVmdE1hcmdpbjtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gIGdldCBmaXJzdEJyYW5jaENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3I7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpcnN0QnJhbmNoQ29sb3IoZmlyc3RCcmFuY2hDb2xvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgaWR4ID0gYnJhbmNoQ29sb3JzLmluZGV4T2YoZmlyc3RCcmFuY2hDb2xvcik7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBmaXJzdEJyYW5jaENvbG9yO1xuICAgICAgdGhpcy5fYnJhbmNoQ29sb3JzID0gYnJhbmNoQ29sb3JzLnNsaWNlKGlkeCkuY29uY2F0KGJyYW5jaENvbG9ycy5zbGljZSgwLCBpZHgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50RWRpdGVkTm9kZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPjtcbiAgZ2V0IGN1cnJlbnRFZGl0ZWROb2RlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZTtcbiAgfVxuXG4gIHByaXZhdGUgX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuX2N1cnJlbnRFZGl0ZWROb2RlID0gdGhpcy5fc2VydmljZS5lZGl0ZWROb2RlRW50cnk7XG4gIH1cblxuICBvblJlc2l6ZSgpOiB2b2lkIHt9XG5cbiAgZWRpdChldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuZWRpdE5vZGVFbnRyeSg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnkpO1xuICB9XG5cbiAgZGVsZXRlKGV2dDogRXZlbnQpOiB2b2lkIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMubm9kZUVudHJ5ID09IG51bGwgfHwgIXRoaXMuaXNOb2RlRW50cnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5kZWxldGVOb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIGlzTGFzdE5vZGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnJlYWxOb2RlRW50cnkgfHwgIXRoaXMucmVhbE5vZGVFbnRyeS5jaGlsZHJlbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMucmVhbE5vZGVFbnRyeS5jaGlsZHJlblswXS5jaGlsZHJlbjtcbiAgfVxuXG4gIGlzU2xpZGUobm9kZTogQWpmTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1NsaWRlc05vZGUobm9kZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCkpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbiA9IHRoaXMuY2hpbGRFbnRyaWVzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX3VwZGF0ZUJyYW5jaEhlaWdodHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgd2hlbiBhIGZpZWxkIG9yIHNsaWRlIG5vZGUgaXMgbW92ZWQgb3IgaW5zZXJ0ZWQgYnkgZHJhZyZkcm9wcGluZyBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gICAqIEBwYXJhbSBldmVudCBUaGUgZHJvcCBldmVudC5cbiAgICogQHBhcmFtIGNvbnRlbnQgVHJ1ZSBpZiB0aGUgY3VycmVudCBub2RlRW50cnkgY29udGFpbnMgb3RoZXIgbm9kZUVudHJpZXMuXG4gICAqL1xuICBvbkRyb3AoXG4gICAgICBldmVudDogQ2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+fENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4sXG4gICAgICBjb250ZW50ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBvbkRyb3BQcm9jZXNzKGV2ZW50LCB0aGlzLl9zZXJ2aWNlLCB0aGlzLl9ub2RlRW50cnksIGNvbnRlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgYSBwcm9ncmVzc2l2ZSBpZCB0byB0aGUgZHJvcExpc3QsIHRvIGNvbm5lY3QgaXQgdG8gdGhlIEZvcm1CdWlsZGVyIHNvdXJjZSBsaXN0LlxuICAgKiBAcGFyYW0gZW1wdHkgVHJ1ZSBpZiB0aGUgbGlzdCBpcyBtYXJrZWQgYXMgZW1wdHkuXG4gICAqL1xuICBhc3NpZ25JZChlbXB0eTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2VydmljZS5hc3NpZ25MaXN0SWQodGhpcy5yZWFsTm9kZUVudHJ5Lm5vZGUsIGVtcHR5KTtcbiAgfVxuXG4gIGRpc2FibGVTbGlkZURyb3AoaXRlbTogQ2RrRHJhZzxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGRpc2FibGVTbGlkZURyb3BQcmVkaWNhdGUoaXRlbSk7XG4gIH1cblxuICBkaXNhYmxlRmllbGREcm9wKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkaXNhYmxlRmllbGREcm9wUHJlZGljYXRlKGl0ZW0pO1xuICB9XG5cbiAgZW1wdHlBcmVhRHJvcFByZWRpY2F0ZSgpOiAoaXRlbTogQ2RrRHJhZywgX2Ryb3A6IENka0Ryb3BMaXN0KSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHRoaXMuX2xldmVsID4gMCkge1xuICAgICAgICByZXR1cm4gIWl0ZW0uZGF0YS5pc1NsaWRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW0uZGF0YS5pc1NsaWRlIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCcmFuY2hIZWlnaHRzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5IHx8IHRoaXMuYnJhbmNoTGluZXMgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLmNoaWxkRW50cmllcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vZGVFbnRyeSA9IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeTtcbiAgICBjb25zdCBicmFuY2hMaW5lczogQWpmRmJCcmFuY2hMaW5lW10gPSB0aGlzLmJyYW5jaExpbmVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBzbGljZUlkeCA9IG5vZGVFbnRyeS5jb250ZW50ICE9IG51bGwgPyBub2RlRW50cnkuY29udGVudC5sZW5ndGggOiAwO1xuICAgIGNvbnN0IGNoaWxkRW50cmllczogRWxlbWVudFJlZltdID0gdGhpcy5jaGlsZEVudHJpZXMudG9BcnJheSgpLnNsaWNlKHNsaWNlSWR4KTtcblxuICAgIGlmIChicmFuY2hMaW5lcy5sZW5ndGggIT0gY2hpbGRFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJyYW5jaExpbmVzLmZvckVhY2goKGJsOiBBamZGYkJyYW5jaExpbmUsIGlkeDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBjZTogRWxlbWVudFJlZiA9IGNoaWxkRW50cmllc1tpZHhdO1xuICAgICAgYmwuaGVpZ2h0ID0gY2UubmF0aXZlRWxlbWVudC5vZmZzZXRUb3A7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==