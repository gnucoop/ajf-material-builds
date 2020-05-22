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
import { AjfChartType, AjfWidgetType } from '@ajf/core/reports';
import { sizedEnumToStringArray } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { timer } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderWidgetsToolbar = /** @class */ (() => {
    let AjfReportBuilderWidgetsToolbar = 
    /**
     * This class will define an Ajf builder fields toolbar
     */
    class AjfReportBuilderWidgetsToolbar {
        /**
         *
         * @param private _afjBuilderService: AjfBuilderService
         */
        constructor(_service) {
            this._service = _service;
            // fieldTypes is an array string that contains the field options
            this.chartTypes = sizedEnumToStringArray(AjfChartType);
            this.widgetTypes = sizedEnumToStringArray(AjfWidgetType);
            // delete Column widget
            let pos = this.widgetTypes.indexOf('Column');
            if (pos !== -1) {
                this.widgetTypes.splice(pos, 1);
            }
        }
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragStartHandler() {
            let s = timer(200).subscribe(() => {
                if (s != null) {
                    s.unsubscribe();
                }
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
    };
    AjfReportBuilderWidgetsToolbar = __decorate([
        Component({
            selector: 'ajf-report-builder-widgets-toolbar',
            template: "<mat-list>\n  <mat-list-item *ngFor=\"let t of widgetTypes\">\n    <ajf-report-builder-widget-toolbar-button ng-if=\"t != 'Column'\"\n        cdkDrag\n        [cdkDragData]=\"{widgetType: t, dropZones: ['header','content','footer','column','widget']}\"\n        [widgetType]=\"t\"\n        (onDragStart)=\"onDragStartHandler();\"\n        (onDragEnd)=\"onDragEndHandler();\">\n    </ajf-report-builder-widget-toolbar-button>\n  </mat-list-item>\n</mat-list>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
        /**
         * This class will define an Ajf builder fields toolbar
         */
        ,
        __metadata("design:paramtypes", [AjfReportBuilderService])
    ], AjfReportBuilderWidgetsToolbar);
    return AjfReportBuilderWidgetsToolbar;
})();
export { AjfReportBuilderWidgetsToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy10b29sYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3dpZGdldHMtdG9vbGJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFM0IsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFZakU7SUFBQSxJQUFhLDhCQUE4QjtJQUgzQzs7T0FFRztJQUNILE1BQWEsOEJBQThCO1FBTXpDOzs7V0FHRztRQUNILFlBQW9CLFFBQWlDO1lBQWpDLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBVHJELGdFQUFnRTtZQUNoRSxlQUFVLEdBQWEsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsZ0JBQVcsR0FBYSxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQVE1RCx1QkFBdUI7WUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQztRQUNEOzs7O1dBSUc7UUFDSCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDYixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ2pCO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILGdCQUFnQjtZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDNUIsQ0FBQztLQUNGLENBQUE7SUF2Q1ksOEJBQThCO1FBVDFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQ0FBb0M7WUFDOUMsdWRBQW1DO1lBQ25DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7UUFDRjs7V0FFRzs7eUNBVzZCLHVCQUF1QjtPQVYxQyw4QkFBOEIsQ0F1QzFDO0lBQUQscUNBQUM7S0FBQTtTQXZDWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hhcnRUeXBlLCBBamZXaWRnZXRUeXBlfSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge3NpemVkRW51bVRvU3RyaW5nQXJyYXl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGltZXJ9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci13aWRnZXRzLXRvb2xiYXInLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldHMtdG9vbGJhci5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gQWpmIGJ1aWxkZXIgZmllbGRzIHRvb2xiYXJcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJXaWRnZXRzVG9vbGJhciB7XG4gIC8vIGZpZWxkVHlwZXMgaXMgYW4gYXJyYXkgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIGZpZWxkIG9wdGlvbnNcbiAgY2hhcnRUeXBlczogc3RyaW5nW10gPSBzaXplZEVudW1Ub1N0cmluZ0FycmF5KEFqZkNoYXJ0VHlwZSk7XG4gIHdpZGdldFR5cGVzOiBzdHJpbmdbXSA9IHNpemVkRW51bVRvU3RyaW5nQXJyYXkoQWpmV2lkZ2V0VHlwZSk7XG5cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHByaXZhdGUgX2FmakJ1aWxkZXJTZXJ2aWNlOiBBamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHtcbiAgICAvLyBkZWxldGUgQ29sdW1uIHdpZGdldFxuICAgIGxldCBwb3MgPSB0aGlzLndpZGdldFR5cGVzLmluZGV4T2YoJ0NvbHVtbicpO1xuICAgIGlmIChwb3MgIT09IC0xKSB7XG4gICAgICB0aGlzLndpZGdldFR5cGVzLnNwbGljZShwb3MsIDEpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogIHNpZ24gdGhlIHN0YXJ0IG9mIG1vdXNlIGRyYWcgd2l0aCAyMDAgbXMgb2YgZGVsYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJDb250ZW50XG4gICAqL1xuICBvbkRyYWdTdGFydEhhbmRsZXIoKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAocyAhPSBudWxsKSB7XG4gICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlcnZpY2UuZHJhZ1N0YXJ0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzaWduIHRoZSBlbmQgb2YgbW91c2UgZHJhZ1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlckNvbnRlbnRcbiAgICovXG4gIG9uRHJhZ0VuZEhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5kcmFnRW5kZWQoKTtcbiAgfVxufVxuIl19