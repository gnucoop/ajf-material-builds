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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
let AjfReportBuilderToolbar = /** @class */ (() => {
    let AjfReportBuilderToolbar = 
    /**
     * This class will define an ajf builder toolbar
     * @implements : OnDestroy
     */
    class AjfReportBuilderToolbar {
        constructor(_service, dialog) {
            this._service = _service;
            this.dialog = dialog;
            // this is an any EventEmitter
            this.addClick = new EventEmitter();
            this.zoom = false;
            this.emptyContent = this._service.emptyContent;
        }
        canDropPredicate(item) {
            return item.data.dropZones.indexOf('widget') > -1;
        }
        JSONRequest() { }
        /**
         * this method will pass event to event emitter
         */
        onAddClick(event) {
            this.addClick.emit(event);
        }
        addToList(event) {
            if (event.item.data.widget != null) {
                this._service.addCustomWidgets({ json: JSON.stringify(event.item.data.widget.toJson()), type: '' });
            }
        }
        undoLastOperation() {
            try {
                let myObj = JSON.parse(this._service.popJsonStack() || '');
                this._service.setReport(deepCopy(myObj));
            }
            catch (e) {
            }
        }
        isZoomed() {
            this.zoom = !this.zoom;
            if (this.zoom) {
                this._service.fixedZoomIn();
            }
            else {
                this._service.fixedZoomOut();
            }
        }
        openDialog() {
            this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
        }
    };
    AjfReportBuilderToolbar = __decorate([
        Component({
            selector: 'ajf-report-builder-toolbar',
            outputs: ['addClick'],
            template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"]
        })
        /**
         * This class will define an ajf builder toolbar
         * @implements : OnDestroy
         */
        ,
        __metadata("design:paramtypes", [AjfReportBuilderService, MatDialog])
    ], AjfReportBuilderToolbar);
    return AjfReportBuilderToolbar;
})();
export { AjfReportBuilderToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci90b29sYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBSWpFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBYy9EO0lBQUEsSUFBYSx1QkFBdUI7SUFKcEM7OztPQUdHO0lBQ0gsTUFBYSx1QkFBdUI7UUFVbEMsWUFBb0IsUUFBaUMsRUFBUyxNQUFpQjtZQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtZQUFTLFdBQU0sR0FBTixNQUFNLENBQVc7WUFUL0UsOEJBQThCO1lBQzlCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztZQUV0RCxTQUFJLEdBQUcsS0FBSyxDQUFDO1lBT1gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUNqRCxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsSUFBdUM7WUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELFdBQVcsS0FBSSxDQUFDO1FBQ2hCOztXQUVHO1FBQ0gsVUFBVSxDQUFDLEtBQVU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVELFNBQVMsQ0FBQyxLQUE0QztZQUNwRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQzFCLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7YUFDeEU7UUFDSCxDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsSUFBSTtnQkFDRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1lBQUMsT0FBTyxDQUFDLEVBQUU7YUFDWDtRQUNILENBQUM7UUFFRCxRQUFRO1lBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUM5QjtRQUNILENBQUM7UUFFRCxVQUFVO1lBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQ25FLENBQUM7S0FDRixDQUFBO0lBckRZLHVCQUF1QjtRQVpuQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUVyQiwwcUNBQTJCO1lBQzNCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO1FBQ0Y7OztXQUdHOzt5Q0FXNkIsdUJBQXVCLEVBQWlCLFNBQVM7T0FWcEUsdUJBQXVCLENBcURuQztJQUFELDhCQUFDO0tBQUE7U0FyRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZ30gZnJvbSAnLi90b29sYmFyLWRpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci10b29sYmFyJyxcbiAgb3V0cHV0czogWydhZGRDbGljayddLFxuICBzdHlsZVVybHM6IFsndG9vbGJhci5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICd0b29sYmFyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGRlZmluZSBhbiBhamYgYnVpbGRlciB0b29sYmFyXG4gKiBAaW1wbGVtZW50cyA6IE9uRGVzdHJveVxuICovXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclRvb2xiYXIge1xuICAvLyB0aGlzIGlzIGFuIGFueSBFdmVudEVtaXR0ZXJcbiAgYWRkQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyRGlhbG9nPjtcbiAgem9vbSA9IGZhbHNlO1xuXG4gIGxhc3RKc29uOiBzdHJpbmc7XG5cbiAgZW1wdHlDb250ZW50OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cpIHtcbiAgICB0aGlzLmVtcHR5Q29udGVudCA9IHRoaXMuX3NlcnZpY2UuZW1wdHlDb250ZW50O1xuICB9XG5cbiAgY2FuRHJvcFByZWRpY2F0ZShpdGVtOiBDZGtEcmFnPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXRlbS5kYXRhLmRyb3Bab25lcy5pbmRleE9mKCd3aWRnZXQnKSA+IC0xO1xuICB9XG5cbiAgSlNPTlJlcXVlc3QoKSB7fVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBwYXNzIGV2ZW50IHRvIGV2ZW50IGVtaXR0ZXJcbiAgICovXG4gIG9uQWRkQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBhZGRUb0xpc3QoZXZlbnQ6IENka0RyYWdEcm9wPEFqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YT4pIHtcbiAgICBpZiAoZXZlbnQuaXRlbS5kYXRhLndpZGdldCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbVdpZGdldHMoXG4gICAgICAgICAge2pzb246IEpTT04uc3RyaW5naWZ5KGV2ZW50Lml0ZW0uZGF0YS53aWRnZXQudG9Kc29uKCkpLCB0eXBlOiAnJ30pO1xuICAgIH1cbiAgfVxuXG4gIHVuZG9MYXN0T3BlcmF0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbXlPYmogPSBKU09OLnBhcnNlKHRoaXMuX3NlcnZpY2UucG9wSnNvblN0YWNrKCkgfHwgJycpO1xuICAgICAgdGhpcy5fc2VydmljZS5zZXRSZXBvcnQoZGVlcENvcHkobXlPYmopKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG5cbiAgaXNab29tZWQoKSB7XG4gICAgdGhpcy56b29tID0gIXRoaXMuem9vbTtcbiAgICBpZiAodGhpcy56b29tKSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLmZpeGVkWm9vbUluKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuZml4ZWRab29tT3V0KCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkRpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlclRvb2xiYXJEaWFsb2cpO1xuICB9XG59XG4iXX0=