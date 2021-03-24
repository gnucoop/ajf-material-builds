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
    '#795548',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvbm9kZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQVUsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXZFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU5QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFJTCxxQkFBcUIsRUFDdEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUN6QixhQUFhLEVBQ2QsTUFBTSxzQkFBc0IsQ0FBQztBQUU5QixNQUFNLFlBQVksR0FBYTtJQUM3QixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztDQUNWLENBQUM7QUFXRixNQUFNLE9BQU8sY0FBYztJQTZIekIsWUFBb0IsUUFBK0I7UUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUF6SDNDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBS3BCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFTakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFLckIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUE0QnBCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFRWCxpQkFBWSxHQUFZLElBQUksQ0FBQztRQWE3QixrQkFBYSxHQUFhLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFLaEQsZUFBVSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFLckMsb0JBQWUsR0FBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBSzNDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBU2xCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUt4QixzQkFBaUIsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFxQnBDLDZCQUF3QixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzVELDhCQUF5QixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBR25FLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUMxRCxDQUFDO0lBMUhELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBR0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxJQUNJLE9BQU8sQ0FBQyxPQUFnQjtRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUMxQixDQUFDO0lBR0QsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFHRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQ0ksVUFBVSxDQUFDLEdBQVk7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFHRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUNELElBQ0ksU0FBUyxDQUFDLFNBQTZCO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksU0FBUyxJQUFJLElBQUksSUFBOEIsU0FBVSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUM3RSxNQUFNLEVBQUUsR0FBNEIsU0FBUyxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBR0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQ0ksV0FBVyxDQUFDLFNBQWtCO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFxQyxDQUFDO0lBQ3BELENBQUM7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBR0QsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUNJLFlBQVksQ0FBQyxZQUFvQjtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBR0QsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQ0ksZ0JBQWdCLENBQUMsZ0JBQXdCO1FBQzNDLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFHRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNqQyxDQUFDO0lBU0QsUUFBUSxLQUFVLENBQUM7SUFFbkIsSUFBSSxDQUFDLEdBQVU7UUFDYixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDL0MsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQTBCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVU7UUFDZixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDL0MsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQTBCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDdkQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFhO1FBQ25CLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQ0YsS0FBb0YsRUFDcEYsT0FBTyxHQUFHLEtBQUs7UUFDakIsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxRQUFpQixLQUFLO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQTBDO1FBQ3pELE9BQU8seUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQTBDO1FBQ3pELE9BQU8seUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixPQUFPLENBQUMsSUFBYSxFQUFFLEtBQWtCLEVBQVcsRUFBRTtZQUNwRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDM0I7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQztRQUNwQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSTtZQUN2RSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUM3QixPQUFPO1NBQ1I7UUFDRCxNQUFNLFNBQVMsR0FBNEIsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxRCxNQUFNLFdBQVcsR0FBc0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsRSxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxNQUFNLFlBQVksR0FBaUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0UsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDN0MsT0FBTztTQUNSO1FBRUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQW1CLEVBQUUsR0FBVyxFQUFFLEVBQUU7WUFDdkQsTUFBTSxFQUFFLEdBQWUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF4T0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG1rS0FBOEI7Z0JBRTlCLElBQUksRUFBRSxFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBQztnQkFDdkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBeEJDLHFCQUFxQjs7OzBCQTBCcEIsWUFBWSxTQUFDLGVBQWU7MkJBQzVCLFlBQVksU0FBQyxjQUFjLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO3NCQVcvQyxLQUFLO3lCQWNMLEtBQUs7d0JBVUwsS0FBSztvQkFrQkwsS0FBSzswQkFRTCxLQUFLOzJCQTRCTCxLQUFLOytCQWNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZSwgaXNDb250YWluZXJOb2RlLCBpc1NsaWRlc05vZGV9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wLCBDZGtEcm9wTGlzdH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZHJlbixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRmJCcmFuY2hMaW5lfSBmcm9tICcuL2JyYW5jaC1saW5lJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyTm9kZSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgZGlzYWJsZUZpZWxkRHJvcFByZWRpY2F0ZSxcbiAgZGlzYWJsZVNsaWRlRHJvcFByZWRpY2F0ZSxcbiAgb25Ecm9wUHJvY2Vzc1xufSBmcm9tICcuL2Zvcm0tYnVpbGRlci11dGlscyc7XG5cbmNvbnN0IGJyYW5jaENvbG9yczogc3RyaW5nW10gPSBbXG4gICcjRjQ0MzM2JywgIC8vIFJFRFxuICAnIzRDQUY1MCcsICAvLyBHUkVFTlxuICAnIzNGNTFCNScsICAvLyBJTkRJR09cbiAgJyNGRkMxMDcnLCAgLy8gQU1CRVJcbiAgJyM3OTU1NDgnLCAgLy8gQlJPV05cbl07XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtZW50cnknLFxuICB0ZW1wbGF0ZVVybDogJ25vZGUtZW50cnkuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLWVudHJ5LmNzcyddLFxuICBob3N0OiB7Jyh3aW5kb3cucmVzaXplKSc6ICdvblJlc2l6ZSgpJ30sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZUVudHJ5IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihBamZGYkJyYW5jaExpbmUpIGJyYW5jaExpbmVzOiBRdWVyeUxpc3Q8QWpmRmJCcmFuY2hMaW5lPjtcbiAgQFZpZXdDaGlsZHJlbihBamZGYk5vZGVFbnRyeSwge3JlYWQ6IEVsZW1lbnRSZWZ9KSBjaGlsZEVudHJpZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBwcml2YXRlIF9oYXNDb250ZW50ID0gZmFsc2U7XG4gIGdldCBoYXNDb250ZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNDb250ZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNGaXJzdCA9IGZhbHNlO1xuICBnZXQgaXNGaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNGaXJzdDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNGaXJzdChpc0ZpcnN0OiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNGaXJzdCA9IGlzRmlyc3Q7XG4gIH1cblxuICBwcml2YXRlIF9pc05vZGVFbnRyeSA9IGZhbHNlO1xuICBnZXQgaXNOb2RlRW50cnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNFeHBhbmRlZCA9IGZhbHNlO1xuICBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNFeHBhbmRlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNFeHBhbmRlZChleHA6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0V4cGFuZGVkID0gZXhwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpLCA0MDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGU7XG4gIGdldCBub2RlRW50cnkoKTogQWpmRm9ybUJ1aWxkZXJOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBub2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGUpIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBub2RlRW50cnk7XG4gICAgaWYgKG5vZGVFbnRyeSAhPSBudWxsICYmICg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5KS5ub2RlICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG5lID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pm5vZGVFbnRyeTtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZS5ub2RlO1xuICAgICAgdGhpcy5faGFzQ29udGVudCA9IG5vZGUgIT0gbnVsbCAmJiBpc0NvbnRhaW5lck5vZGUobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGV2ZWwgPSAwO1xuICBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGxldmVsKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZXZlbCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX2lzRHJhZ2dhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgZ2V0IGlzRHJhZ2dhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0RyYWdnYWJsZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNEcmFnZ2FibGUoZHJhZ2dhYmxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNEcmFnZ2FibGUgPSBkcmFnZ2FibGU7XG4gIH1cblxuICBnZXQgcmVhbE5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2JyYW5jaENvbG9yczogc3RyaW5nW10gPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gIGdldCBicmFuY2hDb2xvcnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9icmFuY2hDb2xvcnM7XG4gIH1cblxuICBwcml2YXRlIF9kcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LW5vZGUnXTtcbiAgZ2V0IGRyb3Bab25lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bab25lcztcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRHJvcFpvbmVzOiBzdHJpbmdbXSA9IFsnZmJkei1zbGlkZSddO1xuICBnZXQgc2xpZGVEcm9wWm9uZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9zbGlkZURyb3Bab25lcztcbiAgfVxuXG4gIHByaXZhdGUgX29yaWdpbk9mZnNldCA9IDA7XG4gIGdldCBvcmlnaW5PZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luT2Zmc2V0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBvcmlnaW5PZmZzZXQob3JpZ2luT2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLl9vcmlnaW5PZmZzZXQgPSBvcmlnaW5PZmZzZXQ7XG4gICAgdGhpcy5fb3JpZ2luTGVmdE1hcmdpbiA9IGAke3RoaXMuX29yaWdpbk9mZnNldCAqIDR9cHhgO1xuICB9XG4gIHByaXZhdGUgX29yaWdpbkxlZnRNYXJnaW4gPSAnMCc7XG4gIGdldCBvcmlnaW5MZWZ0TWFyZ2luKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbkxlZnRNYXJnaW47XG4gIH1cblxuICBwcml2YXRlIF9maXJzdEJyYW5jaENvbG9yID0gYnJhbmNoQ29sb3JzWzBdO1xuICBnZXQgZmlyc3RCcmFuY2hDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9maXJzdEJyYW5jaENvbG9yO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXJzdEJyYW5jaENvbG9yKGZpcnN0QnJhbmNoQ29sb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGlkeCA9IGJyYW5jaENvbG9ycy5pbmRleE9mKGZpcnN0QnJhbmNoQ29sb3IpO1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICB0aGlzLl9maXJzdEJyYW5jaENvbG9yID0gZmlyc3RCcmFuY2hDb2xvcjtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZShpZHgpLmNvbmNhdChicmFuY2hDb2xvcnMuc2xpY2UoMCwgaWR4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gICAgICB0aGlzLl9icmFuY2hDb2xvcnMgPSBicmFuY2hDb2xvcnMuc2xpY2UoMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudEVkaXRlZE5vZGU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD47XG4gIGdldCBjdXJyZW50RWRpdGVkTm9kZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEVkaXRlZE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZSA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7fVxuXG4gIGVkaXQoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIGRlbGV0ZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuZGVsZXRlTm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSk7XG4gIH1cblxuICBpc0xhc3ROb2RlKCk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5yZWFsTm9kZUVudHJ5IHx8ICF0aGlzLnJlYWxOb2RlRW50cnkuY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICF0aGlzLnJlYWxOb2RlRW50cnkuY2hpbGRyZW5bMF0uY2hpbGRyZW47XG4gIH1cblxuICBpc1NsaWRlKG5vZGU6IEFqZk5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNTbGlkZXNOb2RlKG5vZGUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fdXBkYXRlQnJhbmNoSGVpZ2h0cygpKTtcbiAgICB0aGlzLl9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaWxkRW50cmllcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVCcmFuY2hIZWlnaHRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NoaWxkRW50cmllc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIHdoZW4gYSBmaWVsZCBvciBzbGlkZSBub2RlIGlzIG1vdmVkIG9yIGluc2VydGVkIGJ5IGRyYWcmZHJvcHBpbmcgaW4gdGhlIGZvcm1idWlsZGVyLlxuICAgKiBAcGFyYW0gZXZlbnQgVGhlIGRyb3AgZXZlbnQuXG4gICAqIEBwYXJhbSBjb250ZW50IFRydWUgaWYgdGhlIGN1cnJlbnQgbm9kZUVudHJ5IGNvbnRhaW5zIG90aGVyIG5vZGVFbnRyaWVzLlxuICAgKi9cbiAgb25Ecm9wKFxuICAgICAgZXZlbnQ6IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnxDZGtEcmFnRHJvcDxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+LFxuICAgICAgY29udGVudCA9IGZhbHNlKTogdm9pZCB7XG4gICAgb25Ecm9wUHJvY2VzcyhldmVudCwgdGhpcy5fc2VydmljZSwgdGhpcy5fbm9kZUVudHJ5LCBjb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ25zIGEgcHJvZ3Jlc3NpdmUgaWQgdG8gdGhlIGRyb3BMaXN0LCB0byBjb25uZWN0IGl0IHRvIHRoZSBGb3JtQnVpbGRlciBzb3VyY2UgbGlzdC5cbiAgICogQHBhcmFtIGVtcHR5IFRydWUgaWYgdGhlIGxpc3QgaXMgbWFya2VkIGFzIGVtcHR5LlxuICAgKi9cbiAgYXNzaWduSWQoZW1wdHk6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UuYXNzaWduTGlzdElkKHRoaXMucmVhbE5vZGVFbnRyeS5ub2RlLCBlbXB0eSk7XG4gIH1cblxuICBkaXNhYmxlU2xpZGVEcm9wKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkaXNhYmxlU2xpZGVEcm9wUHJlZGljYXRlKGl0ZW0pO1xuICB9XG5cbiAgZGlzYWJsZUZpZWxkRHJvcChpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGlzYWJsZUZpZWxkRHJvcFByZWRpY2F0ZShpdGVtKTtcbiAgfVxuXG4gIGVtcHR5QXJlYURyb3BQcmVkaWNhdGUoKTogKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCkgPT4gYm9vbGVhbiB7XG4gICAgcmV0dXJuIChpdGVtOiBDZGtEcmFnLCBfZHJvcDogQ2RrRHJvcExpc3QpOiBib29sZWFuID0+IHtcbiAgICAgIGlmICh0aGlzLl9sZXZlbCA+IDApIHtcbiAgICAgICAgcmV0dXJuICFpdGVtLmRhdGEuaXNTbGlkZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtLmRhdGEuaXNTbGlkZSB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQnJhbmNoSGVpZ2h0cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSB8fCB0aGlzLmJyYW5jaExpbmVzID09IG51bGwgfHxcbiAgICAgICAgdGhpcy5jaGlsZEVudHJpZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub2RlRW50cnkgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+dGhpcy5ub2RlRW50cnk7XG4gICAgY29uc3QgYnJhbmNoTGluZXM6IEFqZkZiQnJhbmNoTGluZVtdID0gdGhpcy5icmFuY2hMaW5lcy50b0FycmF5KCk7XG4gICAgY29uc3Qgc2xpY2VJZHggPSBub2RlRW50cnkuY29udGVudCAhPSBudWxsID8gbm9kZUVudHJ5LmNvbnRlbnQubGVuZ3RoIDogMDtcbiAgICBjb25zdCBjaGlsZEVudHJpZXM6IEVsZW1lbnRSZWZbXSA9IHRoaXMuY2hpbGRFbnRyaWVzLnRvQXJyYXkoKS5zbGljZShzbGljZUlkeCk7XG5cbiAgICBpZiAoYnJhbmNoTGluZXMubGVuZ3RoICE9IGNoaWxkRW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBicmFuY2hMaW5lcy5mb3JFYWNoKChibDogQWpmRmJCcmFuY2hMaW5lLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgY2U6IEVsZW1lbnRSZWYgPSBjaGlsZEVudHJpZXNbaWR4XTtcbiAgICAgIGJsLmhlaWdodCA9IGNlLm5hdGl2ZUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgIH0pO1xuICB9XG59XG4iXX0=