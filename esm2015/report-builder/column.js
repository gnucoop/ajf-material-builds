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
let AjfReportBuilderColumn = /** @class */ (() => {
    class AjfReportBuilderColumn {
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
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderColumn.ctorParameters = () => [
        { type: AjfReportBuilderService }
    ];
    AjfReportBuilderColumn.propDecorators = {
        column: [{ type: Input }]
    };
    return AjfReportBuilderColumn;
})();
export { AjfReportBuilderColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL2NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBR0wsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXpDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFOzs7O0dBSUc7QUFDSDtJQUFBLE1BT2Esc0JBQXNCO1FBb0RqQyxZQUFvQixRQUFpQztZQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQW5EckQ7Ozs7ZUFJRztZQUNILGdCQUFXLEdBQUcsS0FBSyxDQUFDO1lBRXBCLGVBQVUsR0FBRyxLQUFLLENBQUM7WUFFbkIsMkNBQTJDO1lBQzNDLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFVVixrQkFBYSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBK0JELENBQUM7UUE3QnpELFNBQVMsQ0FBQyxLQUFVLEVBQUUsR0FBVyxFQUFFLFFBQXlCO1lBQzFELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsZ0JBQWdCO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBR0QsUUFBUTtZQUNOLDZDQUE2QztZQUU3QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsQ0FBQzs7O2dCQXZFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLCtqQ0FBMEI7b0JBRTFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWJPLHVCQUF1Qjs7O3lCQWlDNUIsS0FBSzs7SUE4Q1IsNkJBQUM7S0FBQTtTQWpFWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29sdW1uV2lkZ2V0fSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb24sIHRpbWVyfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuLyoqXG4gKiB0aGlzIGNvbXBvbmVudCBtYW5hZ2VzIHRoZSByZXBvcnQgdGV4dFxuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWNvbHVtbicsXG4gIHRlbXBsYXRlVXJsOiAnY29sdW1uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY29sdW1uLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ29sdW1uIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICAvKipcbiAgICogaWYgdHJ1ZSBtb3VzZSBldmVudCBpcyBvbiBkcmFnZ2VkIHN0YXR1c1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIHNob3dBY3Rpb25zID0gZmFsc2U7XG5cbiAgbGF5b3V0U2hvdyA9IGZhbHNlO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cblxuICAvKipcbiAgICogaXMgdGhlIGFycmF5IG9mIHZhbHVlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgVGFibGVDb21wb25lbnRcbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0O1xuXG4gIHByaXZhdGUgX29uRHJhZ2dlZFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGFkZFRvTGlzdChldmVudDogYW55LCBpZHg6IG51bWJlciwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCkge1xuICAgIHRoaXMub25EcmFnRW5kSGFuZGxlcigpO1xuICAgIGlmIChldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZVBvc2l0aW9uT25Db2x1bW4oZXZlbnQsIHRvQ29sdW1uLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmFkZFRvQ29sdW1uKGV2ZW50LCB0b0NvbHVtbiwgaWR4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmRyYWdTdGFydGVkKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2lnbiB0aGUgZW5kIG9mIG1vdXNlIGRyYWdcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdFbmRIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZHJhZ0VuZGVkKCk7XG4gIH1cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gdGhpcy53aWRnZXQgPSBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWU7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19