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
import { __decorate, __metadata } from "tslib";
import { AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeToLabel, widgetReportBuilderIconName } from './utils';
let AjfReportBuilderWidgetsRowButtons = /** @class */ (() => {
    let AjfReportBuilderWidgetsRowButtons = class AjfReportBuilderWidgetsRowButtons {
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
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfReportBuilderWidgetsRowButtons.prototype, "from", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfReportBuilderWidgetsRowButtons.prototype, "fromWidget", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AjfReportBuilderWidgetsRowButtons.prototype, "position", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfReportBuilderWidgetsRowButtons.prototype, "widget", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AjfReportBuilderWidgetsRowButtons.prototype, "child", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfReportBuilderWidgetsRowButtons.prototype, "isOver", void 0);
    AjfReportBuilderWidgetsRowButtons = __decorate([
        Component({
            selector: 'ajf-report-builder-widgets-row-buttons',
            template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"]
        }),
        __metadata("design:paramtypes", [AjfReportBuilderService])
    ], AjfReportBuilderWidgetsRowButtons);
    return AjfReportBuilderWidgetsRowButtons;
})();
export { AjfReportBuilderWidgetsRowButtons };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQTZCLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsMkJBQTJCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFTMUU7SUFBQSxJQUFhLGlDQUFpQyxHQUE5QyxNQUFhLGlDQUFpQztRQTBCNUM7OztXQUdHO1FBQ0gsWUFBb0IsUUFBaUM7WUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUF4QjVDLFdBQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDO1lBQ3JDLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFDbEIsVUFBSyxHQUFhLEVBQUUsQ0FBQztZQU1yQiwyQ0FBMkM7WUFDM0MsY0FBUyxHQUFHLEtBQUssQ0FBQztZQUVsQiwyQ0FBMkM7WUFDM0MsV0FBTSxHQUFHLEtBQUssQ0FBQztZQUVQLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3JELGtCQUFhLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDakQsZUFBVSxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBT0UsQ0FBQztRQUV6RCxjQUFjO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FB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aUJBQ3hCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsV0FBVztZQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsQ0FBQztLQUNGLENBQUE7SUF2R1U7UUFBUixLQUFLLEVBQUU7O21FQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7O3lFQUF1QjtJQUN0QjtRQUFSLEtBQUssRUFBRTs7dUVBQWtCO0lBQ2pCO1FBQVIsS0FBSyxFQUFFOztxRUFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O29FQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOztxRUFBZ0I7SUFOYixpQ0FBaUM7UUFQN0MsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdDQUF3QztZQUNsRCw2L0NBQXVDO1lBRXZDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO3lDQStCOEIsdUJBQXVCO09BOUIxQyxpQ0FBaUMsQ0F3RzdDO0lBQUQsd0NBQUM7S0FBQTtTQXhHWSxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0LCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGV9IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge2FqZldpZGdldFR5cGVUb0xhYmVsLCB3aWRnZXRSZXBvcnRCdWlsZGVySWNvbk5hbWV9IGZyb20gJy4vdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItd2lkZ2V0cy1yb3ctYnV0dG9ucycsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0cy1yb3ctYnV0dG9ucy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldHMtcm93LWJ1dHRvbnMuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9ucyBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgZnJvbTogc3RyaW5nO1xuICBASW5wdXQoKSBmcm9tV2lkZ2V0OiBBamZXaWRnZXQ7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZGdldDogQWpmV2lkZ2V0O1xuICBASW5wdXQoKSBjaGlsZDogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNPdmVyID0gZmFsc2U7XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgaXNDbGlja2VkID0gZmFsc2U7XG4gIGNvbG9yOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHdpZGdldEljb246IHN0cmluZztcbiAgd2lkZ2V0TGFiZWw6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIG9uIG92ZXIgYSB3aWRnZXRcbiAgb25PdmVyID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb25PdmVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHByaXZhdGUgX2FmakJ1aWxkZXJTZXJ2aWNlOiBBamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cbiAgc2VsZWN0ZWRXaWRnZXQoKSB7XG4gICAgdGhpcy5pc0NsaWNrZWQgPSAhdGhpcy5pc0NsaWNrZWQ7XG4gICAgdGhpcy5fc2VydmljZS5zZXRPcmlnaW4odGhpcy5mcm9tKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLmZyb21XaWRnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuZnJvbVdpZGdldCk7XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKHRoaXMuZnJvbSwgdGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICBvbkZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLndpZGdldCA9PT0gdGhpcy5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihkaXJlY3Rpb246IHN0cmluZykge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JhY2snKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uIC0gMSwgPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uLCB0aGlzLnBvc2l0aW9uICsgMSwgPEFqZkxheW91dFdpZGdldD50aGlzLmZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuICBpc0NvbHVtbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5sYWJlbCA9PT0gJ0NvbHVtbicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXNPbmVDb2x1bW4oKTogYm9vbGVhbiB7XG4gICAgbGV0IHJvb3RPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldDtcbiAgICBpZiAocm9vdE9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sYWJlbCA9IEFqZldpZGdldFR5cGVbdGhpcy53aWRnZXQud2lkZ2V0VHlwZV07XG4gICAgdGhpcy53aWRnZXRJY29uID0gd2lkZ2V0UmVwb3J0QnVpbGRlckljb25OYW1lKHRoaXMud2lkZ2V0LndpZGdldFR5cGUpO1xuICAgIHRoaXMud2lkZ2V0TGFiZWwgPSBhamZXaWRnZXRUeXBlVG9MYWJlbCh0aGlzLndpZGdldC53aWRnZXRUeXBlKTtcblxuICAgIHRoaXMuX29uRHJhZ2dlZFN1YiA9IHRoaXMuX3NlcnZpY2Uub25EcmFnZ2VkLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMub25EcmFnZ2VkID0geDtcbiAgICB9KTtcblxuICAgIHRoaXMuX29uT3ZlclN1YiA9IHRoaXMuX3NlcnZpY2Uub25PdmVyLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMub25PdmVyID0geDtcbiAgICB9KTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgIGlmICh4ICE9PSB0aGlzLndpZGdldCkge1xuICAgICAgICB0aGlzLmlzQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29uT3ZlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19