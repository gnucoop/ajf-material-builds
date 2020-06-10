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
import { AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeToLabel, widgetReportBuilderIconName } from './utils';
let AjfReportBuilderWidgetsRowButtons = /** @class */ (() => {
    class AjfReportBuilderWidgetsRowButtons {
        /**
         *
         * @param private _afjBuilderService: AjfBuilderService
         */
        constructor(_service) {
            this._service = _service;
            this.isOver = false;
            this.currentWidget = null;
            this.isClicked = false;
            this.color = [];
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            // this boolean sign if is on over a widget
            this.onOver = false;
            this._currentWidgetSub = Subscription.EMPTY;
            this._onDraggedSub = Subscription.EMPTY;
            this._onOverSub = Subscription.EMPTY;
        }
        selectedWidget() {
            this.isClicked = !this.isClicked;
            this._service.setOrigin(this.from);
            this._service.updateCurrentWidget(this.widget);
        }
        remove() {
            if (this.fromWidget != null) {
                this._service.updateCurrentWidget(this.fromWidget);
            }
            this._service.remove(this.from, this.position);
        }
        onFocus() {
            if (this.widget === this.currentWidget) {
                return true;
            }
            else {
                return false;
            }
        }
        changeColumn(direction) {
            if (direction == 'back') {
                this._service.changeColumn(this.position, this.position - 1, this.fromWidget);
            }
            else {
                this._service.changeColumn(this.position, this.position + 1, this.fromWidget);
            }
        }
        isColumn() {
            if (this.label === 'Column') {
                return true;
            }
            else {
                return false;
            }
        }
        isOneColumn() {
            let rootObj = this.fromWidget;
            if (rootObj.columns.length > 1) {
                return false;
            }
            else {
                return true;
            }
        }
        ngOnInit() {
            this.label = AjfWidgetType[this.widget.widgetType];
            this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
            this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);
            this._onDraggedSub = this._service.onDragged.subscribe(x => {
                this.onDragged = x;
            });
            this._onOverSub = this._service.onOver.subscribe(x => {
                this.onOver = x;
            });
            this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
                this.currentWidget = x;
                if (x !== this.widget) {
                    this.isClicked = false;
                }
            });
        }
        ngOnDestroy() {
            this._onDraggedSub.unsubscribe();
            this._onOverSub.unsubscribe();
            this._currentWidgetSub.unsubscribe();
        }
    }
    AjfReportBuilderWidgetsRowButtons.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-widgets-row-buttons',
                    template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderWidgetsRowButtons.ctorParameters = () => [
        { type: AjfReportBuilderService }
    ];
    AjfReportBuilderWidgetsRowButtons.propDecorators = {
        from: [{ type: Input }],
        fromWidget: [{ type: Input }],
        position: [{ type: Input }],
        widget: [{ type: Input }],
        child: [{ type: Input }],
        isOver: [{ type: Input }]
    };
    return AjfReportBuilderWidgetsRowButtons;
})();
export { AjfReportBuilderWidgetsRowButtons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSwyQkFBMkIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUUxRTtJQUFBLE1BT2EsaUNBQWlDO1FBMEI1Qzs7O1dBR0c7UUFDSCxZQUFvQixRQUFpQztZQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQXhCNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztZQUN4QixrQkFBYSxHQUFtQixJQUFJLENBQUM7WUFDckMsY0FBUyxHQUFHLEtBQUssQ0FBQztZQUNsQixVQUFLLEdBQWEsRUFBRSxDQUFDO1lBTXJCLDJDQUEyQztZQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1lBRWxCLDJDQUEyQztZQUMzQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1lBRVAsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDckQsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNqRCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFPRSxDQUFDO1FBRXpELGNBQWM7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNB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QUMsQ0FBQztRQUNMLENBQUM7UUFDRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7Z0JBOUdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0NBQXdDO29CQUNsRCw2L0NBQXVDO29CQUV2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFUTyx1QkFBdUI7Ozt1QkFXNUIsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7O0lBa0dSLHdDQUFDO0tBQUE7U0F4R1ksaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkxheW91dFdpZGdldCwgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHthamZXaWRnZXRUeXBlVG9MYWJlbCwgd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXdpZGdldHMtcm93LWJ1dHRvbnMnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldHMtcm93LWJ1dHRvbnMuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXRzLXJvdy1idXR0b25zLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnMgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZyb206IHN0cmluZztcbiAgQElucHV0KCkgZnJvbVdpZGdldDogQWpmV2lkZ2V0O1xuICBASW5wdXQoKSBwb3NpdGlvbjogbnVtYmVyO1xuICBASW5wdXQoKSB3aWRnZXQ6IEFqZldpZGdldDtcbiAgQElucHV0KCkgY2hpbGQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzT3ZlciA9IGZhbHNlO1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGlzQ2xpY2tlZCA9IGZhbHNlO1xuICBjb2xvcjogc3RyaW5nW10gPSBbXTtcblxuICB3aWRnZXRJY29uOiBzdHJpbmc7XG4gIHdpZGdldExhYmVsOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBvbiBvdmVyIGEgd2lkZ2V0XG4gIG9uT3ZlciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uT3ZlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwcml2YXRlIF9hZmpCdWlsZGVyU2VydmljZTogQWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7fVxuXG4gIHNlbGVjdGVkV2lkZ2V0KCkge1xuICAgIHRoaXMuaXNDbGlja2VkID0gIXRoaXMuaXNDbGlja2VkO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3JpZ2luKHRoaXMuZnJvbSk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5mcm9tV2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmZyb21XaWRnZXQpO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSh0aGlzLmZyb20sIHRoaXMucG9zaXRpb24pO1xuICB9XG5cbiAgb25Gb2N1cygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy53aWRnZXQgPT09IHRoaXMuY3VycmVudFdpZGdldCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZGlyZWN0aW9uOiBzdHJpbmcpIHtcbiAgICBpZiAoZGlyZWN0aW9uID09ICdiYWNrJykge1xuICAgICAgdGhpcy5fc2VydmljZS5jaGFuZ2VDb2x1bW4oXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbiwgdGhpcy5wb3NpdGlvbiAtIDEsIDxBamZMYXlvdXRXaWRnZXQ+dGhpcy5mcm9tV2lkZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VydmljZS5jaGFuZ2VDb2x1bW4oXG4gICAgICAgICAgdGhpcy5wb3NpdGlvbiwgdGhpcy5wb3NpdGlvbiArIDEsIDxBamZMYXlvdXRXaWRnZXQ+dGhpcy5mcm9tV2lkZ2V0KTtcbiAgICB9XG4gIH1cbiAgaXNDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubGFiZWwgPT09ICdDb2x1bW4nKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlzT25lQ29sdW1uKCk6IGJvb2xlYW4ge1xuICAgIGxldCByb290T2JqID0gPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQ7XG4gICAgaWYgKHJvb3RPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubGFiZWwgPSBBamZXaWRnZXRUeXBlW3RoaXMud2lkZ2V0LndpZGdldFR5cGVdO1xuICAgIHRoaXMud2lkZ2V0SWNvbiA9IHdpZGdldFJlcG9ydEJ1aWxkZXJJY29uTmFtZSh0aGlzLndpZGdldC53aWRnZXRUeXBlKTtcbiAgICB0aGlzLndpZGdldExhYmVsID0gYWpmV2lkZ2V0VHlwZVRvTGFiZWwodGhpcy53aWRnZXQud2lkZ2V0VHlwZSk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uRHJhZ2dlZC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9vbk92ZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLm9uT3Zlci5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLm9uT3ZlciA9IHg7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IHg7XG4gICAgICBpZiAoeCAhPT0gdGhpcy53aWRnZXQpIHtcbiAgICAgICAgdGhpcy5pc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vbk92ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==