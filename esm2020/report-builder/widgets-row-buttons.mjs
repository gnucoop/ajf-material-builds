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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeToLabel, widgetReportBuilderIconName } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/tooltip";
export class AjfReportBuilderWidgetsRowButtons {
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
AjfReportBuilderWidgetsRowButtons.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderWidgetsRowButtons, deps: [{ token: i1.AjfReportBuilderService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderWidgetsRowButtons.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderWidgetsRowButtons, selector: "ajf-report-builder-widgets-row-buttons", inputs: { from: "from", fromWidget: "fromWidget", position: "position", widget: "widget", child: "child", isOver: "isOver" }, ngImport: i0, template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n", styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"], components: [{ type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderWidgetsRowButtons, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-widgets-row-buttons', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n", styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }]; }, propDecorators: { from: [{
                type: Input
            }], fromWidget: [{
                type: Input
            }], position: [{
                type: Input
            }], widget: [{
                type: Input
            }], child: [{
                type: Input
            }], isOver: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy1yb3ctYnV0dG9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci93aWRnZXRzLXJvdy1idXR0b25zLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldHMtcm93LWJ1dHRvbnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQTZCLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVFLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFHTCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsMkJBQTJCLEVBQUMsTUFBTSxTQUFTLENBQUM7Ozs7OztBQVMxRSxNQUFNLE9BQU8saUNBQWlDO0lBeUI1Qzs7O09BR0c7SUFDSCxZQUFvQixRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXZCNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUFxQixJQUFJLENBQUM7UUFDdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixVQUFLLEdBQWEsRUFBRSxDQUFDO1FBTXJCLDJDQUEyQztRQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLDJDQUEyQztRQUMzQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRVAsc0JBQWlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDckQsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNqRCxlQUFVLEdBQWlCLFlBQVks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QUU7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7c0lBNUdVLGlDQUFpQzswSEFBakMsaUNBQWlDLDRNQzNDOUMsbS9DQTRDQTttR0REYSxpQ0FBaUM7a0JBUDdDLFNBQVM7K0JBQ0Usd0NBQXdDLGlCQUduQyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzhHQUd0QyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkxheW91dFdpZGdldCwgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7YWpmV2lkZ2V0VHlwZVRvTGFiZWwsIHdpZGdldFJlcG9ydEJ1aWxkZXJJY29uTmFtZX0gZnJvbSAnLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci13aWRnZXRzLXJvdy1idXR0b25zJyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXRzLXJvdy1idXR0b25zLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0cy1yb3ctYnV0dG9ucy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzUm93QnV0dG9ucyBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgZnJvbTogc3RyaW5nO1xuICBASW5wdXQoKSBmcm9tV2lkZ2V0OiBBamZXaWRnZXQ7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZGdldDogQWpmV2lkZ2V0O1xuICBASW5wdXQoKSBjaGlsZDogYm9vbGVhbjtcbiAgQElucHV0KCkgaXNPdmVyID0gZmFsc2U7XG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldCB8IG51bGwgPSBudWxsO1xuICBpc0NsaWNrZWQgPSBmYWxzZTtcbiAgY29sb3I6IHN0cmluZ1tdID0gW107XG5cbiAgd2lkZ2V0SWNvbjogc3RyaW5nO1xuICB3aWRnZXRMYWJlbDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuXG4gIC8vIHRoaXMgYm9vbGVhbiBzaWduIGlmIGlzIGRyYWdnZWQgYSB3aWRnZXRcbiAgb25EcmFnZ2VkID0gZmFsc2U7XG5cbiAgLy8gdGhpcyBib29sZWFuIHNpZ24gaWYgaXMgb24gb3ZlciBhIHdpZGdldFxuICBvbk92ZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29uRHJhZ2dlZFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vbk92ZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHByaXZhdGUgX2FmakJ1aWxkZXJTZXJ2aWNlOiBBamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHt9XG5cbiAgc2VsZWN0ZWRXaWRnZXQoKSB7XG4gICAgdGhpcy5pc0NsaWNrZWQgPSAhdGhpcy5pc0NsaWNrZWQ7XG4gICAgdGhpcy5fc2VydmljZS5zZXRPcmlnaW4odGhpcy5mcm9tKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIGlmICh0aGlzLmZyb21XaWRnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuZnJvbVdpZGdldCk7XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKHRoaXMuZnJvbSwgdGhpcy5wb3NpdGlvbik7XG4gIH1cblxuICBvbkZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLndpZGdldCA9PT0gdGhpcy5jdXJyZW50V2lkZ2V0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihkaXJlY3Rpb246IHN0cmluZykge1xuICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JhY2snKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmNoYW5nZUNvbHVtbihcbiAgICAgICAgdGhpcy5wb3NpdGlvbixcbiAgICAgICAgdGhpcy5wb3NpdGlvbiAtIDEsXG4gICAgICAgIDxBamZMYXlvdXRXaWRnZXQ+dGhpcy5mcm9tV2lkZ2V0LFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VydmljZS5jaGFuZ2VDb2x1bW4oXG4gICAgICAgIHRoaXMucG9zaXRpb24sXG4gICAgICAgIHRoaXMucG9zaXRpb24gKyAxLFxuICAgICAgICA8QWpmTGF5b3V0V2lkZ2V0PnRoaXMuZnJvbVdpZGdldCxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlzQ29sdW1uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxhYmVsID09PSAnQ29sdW1uJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpc09uZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICBsZXQgcm9vdE9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+dGhpcy5mcm9tV2lkZ2V0O1xuICAgIGlmIChyb290T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxhYmVsID0gQWpmV2lkZ2V0VHlwZVt0aGlzLndpZGdldC53aWRnZXRUeXBlXTtcbiAgICB0aGlzLndpZGdldEljb24gPSB3aWRnZXRSZXBvcnRCdWlsZGVySWNvbk5hbWUodGhpcy53aWRnZXQud2lkZ2V0VHlwZSk7XG4gICAgdGhpcy53aWRnZXRMYWJlbCA9IGFqZldpZGdldFR5cGVUb0xhYmVsKHRoaXMud2lkZ2V0LndpZGdldFR5cGUpO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fb25PdmVyU3ViID0gdGhpcy5fc2VydmljZS5vbk92ZXIuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbk92ZXIgPSB4O1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgaWYgKHggIT09IHRoaXMud2lkZ2V0KSB7XG4gICAgICAgIHRoaXMuaXNDbGlja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb25PdmVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLWNvbnRhaW5lclwiICpuZ0lmPVwib25PdmVyIHx8IG9uRHJhZ2dlZFwiPlxuICA8ZGl2IGNsYXNzPVwiYWpmLWJ1dHRvbi1yb3dcIj5cbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNDb2x1bW4oKSAmJiBvbkRyYWdnZWQgPT0gZmFsc2VcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgIChjbGljayk9XCJjaGFuZ2VDb2x1bW4oJ2ZvcndhcmQnKVwiXG4gICAgICAgIG1hdFRvb2x0aXA9XCJtb3ZlIHJpZ2h0XCJcbiAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCI+XG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5hcnJvd19mb3J3YXJkPC9pPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cIihpc0NvbHVtbigpPT0gZmFsc2UgJiYgb25EcmFnZ2VkID09IHRydWUpIHx8IHRydWVcIj5cbiAgICAgIDxzcGFuIG1hdC1idXR0b25cbiAgICAgICAgW25nQ2xhc3NdPVwieydhamYtc2VsZWN0ZWQnOiBvbkZvY3VzKCl9XCJcbiAgICAgICAgbWF0VG9vbHRpcD1cInt7bGFiZWx9fVwiXG4gICAgICAgIFttYXRUb29sdGlwUG9zaXRpb25dPVwiJ2Fib3ZlJ1wiXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RlZFdpZGdldCgpXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc0NvbHVtbigpXCI+XG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiA+c2V0dGluZ3M8L2k+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIoaXNDb2x1bW4oKSkgPyBmYWxzZSA6IHRydWVcIj5cbiAgICAgICAgICA8bWF0LWljb25cbiAgICAgICAgICAgIGZvbnRTZXQ9XCJhamYtaWNvblwiXG4gICAgICAgICAgICBmb250SWNvbj1cInt7IHdpZGdldEljb24gfX1cIj5cbiAgICAgICAgICA8L21hdC1pY29uPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgbWF0LWJ1dHRvblxuICAgICAgICBtYXRUb29sdGlwPVwicmVtb3ZlXCJcbiAgICAgICAgKGNsaWNrKT1cInJlbW92ZSgpXCJcbiAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCI+XG4gICAgICAgIDxtYXQtaWNvbj5yZW1vdmVfY2lyY2xlX291dGxpbmU8L21hdC1pY29uPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzQ29sdW1uKCkgJiYgb25EcmFnZ2VkID09IGZhbHNlXCI+XG4gICAgICA8c3BhblxuICAgICAgICAoY2xpY2spPVwiY2hhbmdlQ29sdW1uKCdiYWNrJylcIlxuICAgICAgICBtYXRUb29sdGlwPVwibW92ZSBsZWZ0XCJcbiAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCI+XG4gICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5hcnJvd19iYWNrPC9pPlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=