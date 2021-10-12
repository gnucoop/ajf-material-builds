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
import { AJF_WARNING_ALERT_SERVICE, AjfFormRendererService, AjfTableFieldComponent as AjfCoreTableFieldComponent } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation } from '@angular/core';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@ajf/core/common";
import * as i5 from "./warning-alert-service";
export class AjfTableFieldComponent extends AjfCoreTableFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfTableFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTableFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfTableFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfTableFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row == 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr != null\">\n                  <ng-container\n                    *ngIf=\"contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                  >\n                    <ng-container\n                      *ngIf=\"contr.type === 'number';else genericInput\"\n                    >\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        type=\"number\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-container>\n                    <ng-template #genericInput>\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        [type]=\"contr.type\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-template>\n                  </ng-container>\n\n                  <ng-template #plainTextCell>\n                    <span class=\"ajf-table-cell\" (click)=\"goToCell(row, column)\"\n                      >{{ contr.control!.value | ajfTranslateIfString |\n                      ajfFormatIfNumber: '.0-2' }}</span\n                    >\n                  </ng-template>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n", styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { type: i3.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "ajfTableRowClass": i1.AjfTableRowClass, "ajfFormatIfNumber": i4.FormatIfNumber, "ajfTranslateIfString": i4.TranslateIfString, "ajfGetTableCellControl": i1.AjfGetTableCellControlPipe, "ajfIsCellEditable": i1.AjfIsCellEditablePipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTableFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns.length > 0 && columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns.length > 1\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"row == 0; else controlCell\">\n              {{ c | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n            </ng-container>\n            <ng-template #controlCell>\n              <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n                <ng-container *ngIf=\"contr != null\">\n                  <ng-container\n                    *ngIf=\"contr!.show && (node.rows[row-1][column]|ajfIsCellEditable); else plainTextCell\"\n                  >\n                    <ng-container\n                      *ngIf=\"contr.type === 'number';else genericInput\"\n                    >\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        type=\"number\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-container>\n                    <ng-template #genericInput>\n                      <input\n                        (focusout)=\"contr!.show = false\"\n                        [type]=\"contr.type\"\n                        [formControl]=\"contr.control\"\n                        (keydown.tab)=\"goToNextCell($event, row, column)\"\n                        autofocus\n                      />\n                    </ng-template>\n                  </ng-container>\n\n                  <ng-template #plainTextCell>\n                    <span class=\"ajf-table-cell\" (click)=\"goToCell(row, column)\"\n                      >{{ contr.control!.value | ajfTranslateIfString |\n                      ajfFormatIfNumber: '.0-2' }}</span\n                    >\n                  </ng-template>\n                </ng-container>\n              </ng-container>\n            </ng-template>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n", styles: ["table.ajf-table-field{border-collapse:collapse;border-spacing:0;width:100%}table.ajf-table-field tr td{position:relative;min-width:1em}table.ajf-table-field tr td span,table.ajf-table-field tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table.ajf-table-field tr td:last-child span,table.ajf-table-field tr td:last-child input{border-right-color:#ccc}table.ajf-table-field tr:last-of-type td span,table.ajf-table-field tr:last-of-type td input{border-bottom-color:#ccc}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: i5.AjfWarningAlertService, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybXMvdGFibGUtZmllbGQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybXMvdGFibGUtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHNCQUFzQixFQUN0QixzQkFBc0IsSUFBSSwwQkFBMEIsRUFDckQsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQVEvRCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsMEJBQTBCO0lBQ3BFLFlBQ0ksR0FBc0IsRUFBRSxPQUErQixFQUNwQixHQUEyQjtRQUNoRSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDOzsySEFMVSxzQkFBc0IseUZBR3JCLHlCQUF5QjsrR0FIMUIsc0JBQXNCLDJFQzNDbkMsMjlFQXlEQTttR0RkYSxzQkFBc0I7a0JBTmxDLFNBQVM7c0NBR1MsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTs7MEJBS2hDLE1BQU07MkJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICBBamZUYWJsZUZpZWxkQ29tcG9uZW50IGFzIEFqZkNvcmVUYWJsZUZpZWxkQ29tcG9uZW50XG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFibGUtZmllbGQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQ29yZVRhYmxlRmllbGRDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxufVxuIiwiPHRhYmxlIGNsYXNzPVwiYWpmLXRhYmxlLWZpZWxkXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJpbnN0YW5jZS5ub2RlIGFzIG5vZGVcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW5zIG9mIGluc3RhbmNlLmNvbnRyb2xzOyBsZXQgcm93ID0gaW5kZXhcIj5cbiAgICAgIDx0ciBbbmdDbGFzc109XCJyb3cgfCBhamZUYWJsZVJvd0NsYXNzXCI+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGggPiAwICYmIGNvbHVtbnNbMF0gIT0gbnVsbFwiPlxuICAgICAgICAgICAge3sgY29sdW1uc1swXSB8IGFqZlRyYW5zbGF0ZUlmU3RyaW5nIHwgYWpmRm9ybWF0SWZOdW1iZXI6ICcuMC0yJyB9fVxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sdW1ucy5sZW5ndGggPiAxXCI+XG4gICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnNbMV07IGxldCBjb2x1bW4gPSBpbmRleFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJvdyA9PSAwOyBlbHNlIGNvbnRyb2xDZWxsXCI+XG4gICAgICAgICAgICAgIHt7IGMgfCBhamZUcmFuc2xhdGVJZlN0cmluZyB8IGFqZkZvcm1hdElmTnVtYmVyOiAnLjAtMicgfX1cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjb250cm9sQ2VsbD5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImN8YWpmR2V0VGFibGVDZWxsQ29udHJvbCBhcyBjb250clwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ciAhPSBudWxsXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY29udHIhLnNob3cgJiYgKG5vZGUucm93c1tyb3ctMV1bY29sdW1uXXxhamZJc0NlbGxFZGl0YWJsZSk7IGVsc2UgcGxhaW5UZXh0Q2VsbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNvbnRyLnR5cGUgPT09ICdudW1iZXInO2Vsc2UgZ2VuZXJpY0lucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgKGZvY3Vzb3V0KT1cImNvbnRyIS5zaG93ID0gZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiY29udHIuY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi50YWIpPVwiZ29Ub05leHRDZWxsKCRldmVudCwgcm93LCBjb2x1bW4pXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2dlbmVyaWNJbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIChmb2N1c291dCk9XCJjb250ciEuc2hvdyA9IGZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0eXBlXT1cImNvbnRyLnR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sXT1cImNvbnRyLmNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24udGFiKT1cImdvVG9OZXh0Q2VsbCgkZXZlbnQsIHJvdywgY29sdW1uKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvZm9jdXNcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjcGxhaW5UZXh0Q2VsbD5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhamYtdGFibGUtY2VsbFwiIChjbGljayk9XCJnb1RvQ2VsbChyb3csIGNvbHVtbilcIlxuICAgICAgICAgICAgICAgICAgICAgID57eyBjb250ci5jb250cm9sIS52YWx1ZSB8IGFqZlRyYW5zbGF0ZUlmU3RyaW5nIHxcbiAgICAgICAgICAgICAgICAgICAgICBhamZGb3JtYXRJZk51bWJlcjogJy4wLTInIH19PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvdHI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvbmctY29udGFpbmVyPlxuPC90YWJsZT5cbiJdfQ==