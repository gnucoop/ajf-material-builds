/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { __extends } from "tslib";
import { AjfBaseFieldComponent, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AjfWarningAlertService } from './warning-alert-service';
var AjfTableFieldComponent = /** @class */ (function (_super) {
    __extends(AjfTableFieldComponent, _super);
    function AjfTableFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfTableFieldComponent.prototype.goToNextCell = function (ev, row, column) {
        var rowLength = this.instance.controls[row][1].length;
        var currentCell = this.instance.controls[row][1][column];
        if (column + 1 >= rowLength) {
            column = 0;
            if (row + 1 >= this.instance.controls.length) {
                row = 1;
            }
            else {
                row += 1;
            }
        }
        else {
            column += 1;
        }
        if (typeof currentCell !== 'string') {
            currentCell.show = false;
        }
        this._showCell(row, column);
        ev.preventDefault();
        ev.stopPropagation();
    };
    AjfTableFieldComponent.prototype.goToCell = function (row, column) {
        this._resetControls();
        this._showCell(row, column);
    };
    AjfTableFieldComponent.prototype._resetControls = function () {
        this.instance.controls.forEach(function (row) { return row[1].forEach(function (cell) {
            if (typeof cell !== 'string') {
                cell.show = false;
            }
        }); });
    };
    AjfTableFieldComponent.prototype._showCell = function (row, column) {
        if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
            return;
        }
        var nextCell = this.instance.controls[row][1][column];
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    };
    AjfTableFieldComponent.decorators = [
        { type: Component, args: [{
                    template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <td *ngFor=\"let c of columns[1]; let column = index\">\n          <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n            <ng-container *ngIf=\"contr != null\">\n              <input *ngIf=\"row > 0 && contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                (focusout)=\"contr!.show = false\" type=\"number\" [formControl]=\"contr\"\n                (keydown.tab)=\"goToNextCell($event, row, column)\" autoFocus>\n              <ng-template #plainTextCell>\n                <span *ngIf=\"row > 0; else labelCell\" class=\"ajf-table-cell\"\n                  (click)=\"goToCell(row, column)\">{{ contr!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-template>\n            </ng-container>\n          </ng-container>\n        </td>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfTableFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService }
    ]; };
    return AjfTableFieldComponent;
}(AjfBaseFieldComponent));
export { AjfTableFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybXMvdGFibGUtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFDTCxxQkFBcUIsRUFBRSxzQkFBc0IsRUFDOUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQU0vRDtJQU00QywwQ0FBNEM7SUFDdEYsZ0NBQ0UsR0FBc0IsRUFBRSxPQUErQixFQUFFLEdBQTJCO2VBQ3BGLGtCQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2Q0FBWSxHQUFaLFVBQWEsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjO1FBQ2pELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQW1CLENBQUM7UUFDN0UsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtZQUMzQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDNUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNUO2lCQUFNO2dCQUNMLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDVjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksQ0FBQyxDQUFDO1NBQ2I7UUFDRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNuQyxXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHlDQUFRLEdBQVIsVUFBUyxHQUFXLEVBQUUsTUFBYztRQUNsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLCtDQUFjLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDdkQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQXVCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUN2QztRQUNILENBQUMsQ0FBQyxFQUpvQyxDQUlwQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRU8sMENBQVMsR0FBakIsVUFBa0IsR0FBVyxFQUFFLE1BQWM7UUFDM0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDM0YsT0FBTztTQUNSO1FBQ0QsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFtQixDQUFDO1FBQzFFLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Z0JBdERGLFNBQVMsU0FBQztvQkFDVCwrNUNBQStCO29CQUUvQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFmMEIsaUJBQWlCO2dCQUpuQixzQkFBc0I7Z0JBUXZDLHNCQUFzQjs7SUErRDlCLDZCQUFDO0NBQUEsQUF6REQsQ0FNNEMscUJBQXFCLEdBbURoRTtTQW5EWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQmFzZUZpZWxkQ29tcG9uZW50LCBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLCBBamZUYWJsZUZpZWxkSW5zdGFuY2Vcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuaW50ZXJmYWNlIEV4dEZvcm1Db250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2wge1xuICBzaG93PzogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAndGFibGUtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWJsZS1maWVsZC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmVGFibGVGaWVsZEluc3RhbmNlPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxuXG4gIGdvVG9OZXh0Q2VsbChldjogRXZlbnQsIHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJvd0xlbmd0aCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGg7XG4gICAgY29uc3QgY3VycmVudENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXSBhcyBFeHRGb3JtQ29udHJvbDtcbiAgICBpZiAoY29sdW1uICsgMSA+PSByb3dMZW5ndGgpIHtcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICBpZiAocm93ICsgMSA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCkge1xuICAgICAgICByb3cgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93ICs9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbiArPSAxO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgY3VycmVudENlbGwuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGdvVG9DZWxsKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q29udHJvbHMoKTtcbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENvbnRyb2xzKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFuY2UuY29udHJvbHMuZm9yRWFjaChyb3cgPT4gcm93WzFdLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIChjZWxsIGFzIEV4dEZvcm1Db250cm9sKS5zaG93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHJvdyA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCB8fCBjb2x1bW4gPj0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0Q2VsbCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXVtjb2x1bW5dIGFzIEV4dEZvcm1Db250cm9sO1xuICAgIGlmICh0eXBlb2YgbmV4dENlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXh0Q2VsbC5zaG93ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVhZG9ubHk6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==