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
var AjfReportBuilderWidgetsRowButtons = /** @class */ (function () {
    /**
     *
     * @param private _afjBuilderService: AjfBuilderService
     */
    function AjfReportBuilderWidgetsRowButtons(_service) {
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
    AjfReportBuilderWidgetsRowButtons.prototype.selectedWidget = function () {
        this.isClicked = !this.isClicked;
        this._service.setOrigin(this.from);
        this._service.updateCurrentWidget(this.widget);
    };
    AjfReportBuilderWidgetsRowButtons.prototype.remove = function () {
        if (this.fromWidget != null) {
            this._service.updateCurrentWidget(this.fromWidget);
        }
        this._service.remove(this.from, this.position);
    };
    AjfReportBuilderWidgetsRowButtons.prototype.onFocus = function () {
        if (this.widget === this.currentWidget) {
            return true;
        }
        else {
            return false;
        }
    };
    AjfReportBuilderWidgetsRowButtons.prototype.changeColumn = function (direction) {
        if (direction == 'back') {
            this._service.changeColumn(this.position, this.position - 1, this.fromWidget);
        }
        else {
            this._service.changeColumn(this.position, this.position + 1, this.fromWidget);
        }
    };
    AjfReportBuilderWidgetsRowButtons.prototype.isColumn = function () {
        if (this.label === 'Column') {
            return true;
        }
        else {
            return false;
        }
    };
    AjfReportBuilderWidgetsRowButtons.prototype.isOneColumn = function () {
        var rootObj = this.fromWidget;
        if (rootObj.columns.length > 1) {
            return false;
        }
        else {
            return true;
        }
    };
    AjfReportBuilderWidgetsRowButtons.prototype.ngOnInit = function () {
        var _this = this;
        this.label = AjfWidgetType[this.widget.widgetType];
        this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
        this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);
        this._onDraggedSub = this._service.onDragged
            .subscribe(function (x) {
            _this.onDragged = x;
        });
        this._onOverSub = this._service.onOver
            .subscribe(function (x) {
            _this.onOver = x;
        });
        this._currentWidgetSub = this._service.currentWidget
            .subscribe(function (x) {
            _this.currentWidget = x;
            if (x !== _this.widget) {
                _this.isClicked = false;
            }
        });
    };
    AjfReportBuilderWidgetsRowButtons.prototype.ngOnDestroy = function () {
        this._onDraggedSub.unsubscribe();
        this._onOverSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    };
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
    AjfReportBuilderWidgetsRowButtons.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    AjfReportBuilderWidgetsRowButtons.propDecorators = {
        from: [{ type: Input }],
        fromWidget: [{ type: Input }],
        position: [{ type: Input }],
        widget: [{ type: Input }],
        child: [{ type: Input }],
        isOver: [{ type: Input }]
    };
    return AjfReportBuilderWidgetsRowButtons;
}());
export { AjfReportBuilderWidgetsRowButtons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQy9DLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLDJCQUEyQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTFFO0lBaUNFOzs7T0FHRztJQUNILDJDQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXhCNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFDckMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBTXJCLDJDQUEyQztRQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLDJDQUEyQztRQUMzQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRVAsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNqRCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFTdEQsQ0FBQztJQUVELDBEQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNB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Q3hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBQ0QsdURBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7Z0JBdEhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0NBQXdDO29CQUNsRCw2L0NBQXVDO29CQUV2QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFUTyx1QkFBdUI7Ozt1QkFXNUIsS0FBSzs2QkFDTCxLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7O0lBMEdSLHdDQUFDO0NBQUEsQUF2SEQsSUF1SEM7U0FoSFksaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkxheW91dFdpZGdldCwgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHthamZXaWRnZXRUeXBlVG9MYWJlbCwgd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXdpZGdldHMtcm93LWJ1dHRvbnMnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldHMtcm93LWJ1dHRvbnMuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXRzLXJvdy1idXR0b25zLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyV2lkZ2V0c1Jvd0J1dHRvbnMgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZyb206IHN0cmluZztcbiAgQElucHV0KCkgZnJvbVdpZGdldDogQWpmV2lkZ2V0O1xuICBASW5wdXQoKSBwb3NpdGlvbjogbnVtYmVyO1xuICBASW5wdXQoKSB3aWRnZXQ6IEFqZldpZGdldDtcbiAgQElucHV0KCkgY2hpbGQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGlzT3ZlciA9IGZhbHNlO1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGlzQ2xpY2tlZCA9IGZhbHNlO1xuICBjb2xvcjogc3RyaW5nW10gPSBbXTtcblxuICB3aWRnZXRJY29uOiBzdHJpbmc7XG4gIHdpZGdldExhYmVsOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgZHJhZ2dlZCBhIHdpZGdldFxuICBvbkRyYWdnZWQgPSBmYWxzZTtcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBvbiBvdmVyIGEgd2lkZ2V0XG4gIG9uT3ZlciA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uT3ZlclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSBwcml2YXRlIF9hZmpCdWlsZGVyU2VydmljZTogQWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIHNlbGVjdGVkV2lkZ2V0KCkge1xuICAgIHRoaXMuaXNDbGlja2VkID0gIXRoaXMuaXNDbGlja2VkO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0T3JpZ2luKHRoaXMuZnJvbSk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMud2lkZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5mcm9tV2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmZyb21XaWRnZXQpO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSh0aGlzLmZyb20sIHRoaXMucG9zaXRpb24pO1xuICB9XG5cbiAgb25Gb2N1cygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy53aWRnZXQgPT09IHRoaXMuY3VycmVudFdpZGdldCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZGlyZWN0aW9uOiBzdHJpbmcpIHtcblxuICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JhY2snKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uIC0gMSwgPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uICsgMSwgPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuICBpc0NvbHVtbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PT0gJ0NvbHVtbicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXNPbmVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgbGV0IHJvb3RPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldDtcbiAgICBpZiAocm9vdE9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYWJlbCA9IEFqZldpZGdldFR5cGVbdGhpcy53aWRnZXQud2lkZ2V0VHlwZV07XG4gICAgdGhpcy53aWRnZXRJY29uID0gd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lKHRoaXMud2lkZ2V0LndpZGdldFR5cGUpO1xuICAgIHRoaXMud2lkZ2V0TGFiZWwgPSBhamZXaWRnZXRUeXBlVG9MYWJlbCh0aGlzLndpZGdldC53aWRnZXRUeXBlKTtcblxuICAgIHRoaXMuX29uRHJhZ2dlZFN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnZ2VkXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLm9uRHJhZ2dlZCA9IHg7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX29uT3ZlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25PdmVyXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLm9uT3ZlciA9IHg7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICB4ID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgaWYgKHggIT09IHRoaXMud2lkZ2V0KSB7XG4gICAgICAgICAgdGhpcy5pc0NsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vbk92ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==