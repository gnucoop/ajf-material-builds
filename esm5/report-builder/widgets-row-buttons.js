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
        this._onDraggedSub = this._service.onDragged.subscribe(function (x) {
            _this.onDragged = x;
        });
        this._onOverSub = this._service.onOver.subscribe(function (x) {
            _this.onOver = x;
        });
        this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUdMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSwyQkFBMkIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUUxRTtJQWlDRTs7O09BR0c7SUFDSCwyQ0FBb0IsUUFBaUM7UUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF4QjVDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1FBQ3JDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQU1yQiwyQ0FBMkM7UUFDM0MsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQiwyQ0FBMkM7UUFDM0MsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVQLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3JELGtCQUFhLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDakQsZUFBVSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO0lBT0UsQ0FBQztJQUV6RCwwREFBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxT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QUN4QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELHVEQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7O2dCQTlHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdDQUF3QztvQkFDbEQsNi9DQUF1QztvQkFFdkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBVE8sdUJBQXVCOzs7dUJBVzVCLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOztJQWtHUix3Q0FBQztDQUFBLEFBL0dELElBK0dDO1NBeEdZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZMYXlvdXRXaWRnZXQsIEFqZldpZGdldCwgQWpmV2lkZ2V0VHlwZX0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7YWpmV2lkZ2V0VHlwZVRvTGFiZWwsIHdpZGdldFJlcG9ydEJ1aWxkZXJJY29uTmFtZX0gZnJvbSAnLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci13aWRnZXRzLXJvdy1idXR0b25zJyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXRzLXJvdy1idXR0b25zLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0cy1yb3ctYnV0dG9ucy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlcldpZGdldHNSb3dCdXR0b25zIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBASW5wdXQoKSBmcm9tOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZyb21XaWRnZXQ6IEFqZldpZGdldDtcbiAgQElucHV0KCkgcG9zaXRpb246IG51bWJlcjtcbiAgQElucHV0KCkgd2lkZ2V0OiBBamZXaWRnZXQ7XG4gIEBJbnB1dCgpIGNoaWxkOiBib29sZWFuO1xuICBASW5wdXQoKSBpc092ZXIgPSBmYWxzZTtcbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBpc0NsaWNrZWQgPSBmYWxzZTtcbiAgY29sb3I6IHN0cmluZ1tdID0gW107XG5cbiAgd2lkZ2V0SWNvbjogc3RyaW5nO1xuICB3aWRnZXRMYWJlbDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgb24gb3ZlciBhIHdpZGdldFxuICBvbk92ZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uRHJhZ2dlZFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbk92ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gcHJpdmF0ZSBfYWZqQnVpbGRlclNlcnZpY2U6IEFqZkJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cblxuICBzZWxlY3RlZFdpZGdldCgpIHtcbiAgICB0aGlzLmlzQ2xpY2tlZCA9ICF0aGlzLmlzQ2xpY2tlZDtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldE9yaWdpbih0aGlzLmZyb20pO1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLndpZGdldCk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuZnJvbVdpZGdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5mcm9tV2lkZ2V0KTtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmUodGhpcy5mcm9tLCB0aGlzLnBvc2l0aW9uKTtcbiAgfVxuXG4gIG9uRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMud2lkZ2V0ID09PSB0aGlzLmN1cnJlbnRXaWRnZXQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlQ29sdW1uKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PSAnYmFjaycpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuY2hhbmdlQ29sdW1uKFxuICAgICAgICAgIHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24gLSAxLCA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuY2hhbmdlQ29sdW1uKFxuICAgICAgICAgIHRoaXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24gKyAxLCA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldCk7XG4gICAgfVxuICB9XG4gIGlzQ29sdW1uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxhYmVsID09PSAnQ29sdW1uJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpc09uZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICBsZXQgcm9vdE9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+dGhpcy5mcm9tV2lkZ2V0O1xuICAgIGlmIChyb290T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxhYmVsID0gQWpmV2lkZ2V0VHlwZVt0aGlzLndpZGdldC53aWRnZXRUeXBlXTtcbiAgICB0aGlzLndpZGdldEljb24gPSB3aWRnZXRSZXBvcnRCdWlsZGVySWNvbk5hbWUodGhpcy53aWRnZXQud2lkZ2V0VHlwZSk7XG4gICAgdGhpcy53aWRnZXRMYWJlbCA9IGFqZldpZGdldFR5cGVUb0xhYmVsKHRoaXMud2lkZ2V0LndpZGdldFR5cGUpO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fb25PdmVyU3ViID0gdGhpcy5fc2VydmljZS5vbk92ZXIuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbk92ZXIgPSB4O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgaWYgKHggIT09IHRoaXMud2lkZ2V0KSB7XG4gICAgICAgIHRoaXMuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb25PdmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=