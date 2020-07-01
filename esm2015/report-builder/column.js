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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
/**
 * this component manages the report text
 *
 * @export
 */
export class AjfReportBuilderColumn {
    constructor(_service) {
        this._service = _service;
        /**
         * if true mouse event is on dragged status
         *
         * @memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this.layoutShow = false;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this._onDraggedSub = Subscription.EMPTY;
    }
    addToList(event, idx, toColumn) {
        this.onDragEndHandler();
        if (event.dragData.fromColumn) {
            this._service.changePositionOnColumn(event, toColumn, idx);
        }
        else {
            this._service.addToColumn(event, toColumn, idx);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * @memberOf AjfReportBuilderContent
     */
    onDragStartHandler() {
        let s = timer(200).subscribe(() => {
            s.unsubscribe();
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
    ngOnInit() {
        // this.widget = changes.widget.currentValue;
        this._onDraggedSub = this._service.onDragged.subscribe(x => {
            this.onDragged = x;
        });
    }
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderColumn.decorators = [
    { type: Component, args: [{
                selector: 'ajf-column',
                template: "<ng-template [ngIf]=\"column.content != null\">\n  <div class=\"ajf-column\"\n    [ngClass]=\"{'ajf-is-on-over': showActions}\"\n    (mouseenter)=\"showActions = true\"\n    (mouseleave)=\"showActions = false\">\n    <mat-list>\n      <ng-template ngFor let-widget let-idx=\"index\" [ngForOf]=\"column.content\">\n\n        <ng-template [ngIf]=\"!onDragged\">\n          <ajf-report-builder-widgets-row-buttons\n              cdkDrag\n              [cdkDragData]=\"{fromColumn: column, fromIndex: idx, widget: widget, dropZones: ['widget']}\"\n              [from]=\"'column'\"\n              [fromWidget]=\"column\"\n              [widget]=\"widget\"\n              [position]=\"idx\"\n              [child]=\"true\"\n              (cdkDragStarted)=\"onDragStartHandler()\"\n              (cdkDragEnded)=\"onDragEndHandler()\">\n          </ajf-report-builder-widgets-row-buttons>\n        </ng-template>\n        <ajf-report-builder-renderer-widget [widget]=\"widget\"></ajf-report-builder-renderer-widget>\n      </ng-template>\n    </mat-list>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ajf-column{max-width:100%;max-height:100%;background:rgba(0,0,0,0);z-index:100}.ajf-column span{flex-direction:row;width:100%}.ajf-column .mat-list{padding:0}.ajf-column:hover span,.ajf-is-on-over span{visibility:visible !important;display:block !important}.ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}mat-list{height:100%;padding:0}\n"]
            },] }
];
AjfReportBuilderColumn.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderColumn.propDecorators = {
    column: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXpDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFOzs7O0dBSUc7QUFRSCxNQUFNLE9BQU8sc0JBQXNCO0lBb0RqQyxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQW5EckQ7Ozs7V0FJRztRQUNILGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbkIsMkNBQTJDO1FBQzNDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFVVixrQkFBYSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBK0JELENBQUM7SUE3QnpELFNBQVMsQ0FBQyxLQUFVLEVBQUUsR0FBVyxFQUFFLFFBQXlCO1FBQzFELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVEO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDaEMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdCQUFnQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUdELFFBQVE7UUFDTiw2Q0FBNkM7UUFFN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7O1lBdkVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsK2pDQUEwQjtnQkFFMUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBYk8sdUJBQXVCOzs7cUJBaUM1QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbHVtbldpZGdldH0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbi8qKlxuICogdGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgcmVwb3J0IHRleHRcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jb2x1bW4nLFxuICB0ZW1wbGF0ZVVybDogJ2NvbHVtbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbHVtbi5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlckNvbHVtbiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqXG4gICAqIGlmIHRydWUgbW91c2UgZXZlbnQgaXMgb24gZHJhZ2dlZCBzdGF0dXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBzaG93QWN0aW9ucyA9IGZhbHNlO1xuXG4gIGxheW91dFNob3cgPSBmYWxzZTtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG5cbiAgLyoqXG4gICAqIGlzIHRoZSBhcnJheSBvZiB2YWx1ZXNcbiAgICpcbiAgICogQG1lbWJlck9mIFRhYmxlQ29tcG9uZW50XG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW46IEFqZkNvbHVtbldpZGdldDtcblxuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBhZGRUb0xpc3QoZXZlbnQ6IGFueSwgaWR4OiBudW1iZXIsIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQpIHtcbiAgICB0aGlzLm9uRHJhZ0VuZEhhbmRsZXIoKTtcbiAgICBpZiAoZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbikge1xuICAgICAgdGhpcy5fc2VydmljZS5jaGFuZ2VQb3NpdGlvbk9uQ29sdW1uKGV2ZW50LCB0b0NvbHVtbiwgaWR4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VydmljZS5hZGRUb0NvbHVtbihldmVudCwgdG9Db2x1bW4sIGlkeCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fc2VydmljZS5kcmFnU3RhcnRlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHRoaXMud2lkZ2V0ID0gY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==