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
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjfReportBuilderService } from './report-builder-service';
import { AjfReportBuilderToolbarDialog } from './toolbar-dialog';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/material/toolbar";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/slide-toggle";
import * as i6 from "@angular/material/tooltip";
import * as i7 from "@angular/cdk/drag-drop";
import * as i8 from "@angular/common";
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
export class AjfReportBuilderToolbar {
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
            this._service.addCustomWidgets({
                json: JSON.stringify(event.item.data.widget.toJson()),
                type: '',
            });
        }
    }
    undoLastOperation() {
        try {
            let myObj = JSON.parse(this._service.popJsonStack() || '');
            this._service.setReport(deepCopy(myObj));
        }
        catch (e) { }
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
}
AjfReportBuilderToolbar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderToolbar, deps: [{ token: i1.AjfReportBuilderService }, { token: i2.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfReportBuilderToolbar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfReportBuilderToolbar, selector: "ajf-report-builder-toolbar", outputs: { addClick: "addClick" }, ngImport: i0, template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n", styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"], components: [{ type: i3.MatToolbar, selector: "mat-toolbar", inputs: ["color"], exportAs: ["matToolbar"] }, { type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i5.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["disabled", "disableRipple", "color", "tabIndex", "name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "checked"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }], directives: [{ type: i6.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i7.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }], pipes: { "async": i8.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderToolbar, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-report-builder-toolbar', outputs: ['addClick'], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n", styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfReportBuilderService }, { type: i2.MatDialog }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci90b29sYmFyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3Rvb2xiYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBSWpFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7O0FBVS9EOzs7R0FHRztBQUNILE1BQU0sT0FBTyx1QkFBdUI7SUFVbEMsWUFBb0IsUUFBaUMsRUFBUyxNQUFpQjtRQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVc7UUFUL0UsOEJBQThCO1FBQzlCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV0RCxTQUFJLEdBQUcsS0FBSyxDQUFDO1FBT1gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztJQUNqRCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBdUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFdBQVcsS0FBSSxDQUFDO0lBQ2hCOztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUE0QztRQUNwRCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyRCxJQUFJLEVBQUUsRUFBRTthQUNULENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUk7WUFDRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBQ2hCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ25FLENBQUM7OzRIQXJEVSx1QkFBdUI7Z0hBQXZCLHVCQUF1QixxR0M1Q3BDLGdxQ0F5Q0E7bUdER2EsdUJBQXVCO2tCQVpuQyxTQUFTOytCQUNFLDRCQUE0QixXQUM3QixDQUFDLFVBQVUsQ0FBQyxpQkFHTixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLWRyYWctZGF0YSc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZ30gZnJvbSAnLi90b29sYmFyLWRpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci10b29sYmFyJyxcbiAgb3V0cHV0czogWydhZGRDbGljayddLFxuICBzdHlsZVVybHM6IFsndG9vbGJhci5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICd0b29sYmFyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgdG9vbGJhclxuICogQGltcGxlbWVudHMgOiBPbkRlc3Ryb3lcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJUb29sYmFyIHtcbiAgLy8gdGhpcyBpcyBhbiBhbnkgRXZlbnRFbWl0dGVyXG4gIGFkZENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZz47XG4gIHpvb20gPSBmYWxzZTtcblxuICBsYXN0SnNvbjogc3RyaW5nO1xuXG4gIGVtcHR5Q29udGVudDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSwgcHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgdGhpcy5lbXB0eUNvbnRlbnQgPSB0aGlzLl9zZXJ2aWNlLmVtcHR5Q29udGVudDtcbiAgfVxuXG4gIGNhbkRyb3BQcmVkaWNhdGUoaXRlbTogQ2RrRHJhZzxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGl0ZW0uZGF0YS5kcm9wWm9uZXMuaW5kZXhPZignd2lkZ2V0JykgPiAtMTtcbiAgfVxuXG4gIEpTT05SZXF1ZXN0KCkge31cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcGFzcyBldmVudCB0byBldmVudCBlbWl0dGVyXG4gICAqL1xuICBvbkFkZENsaWNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLmFkZENsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYWRkVG9MaXN0KGV2ZW50OiBDZGtEcmFnRHJvcDxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+KSB7XG4gICAgaWYgKGV2ZW50Lml0ZW0uZGF0YS53aWRnZXQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21XaWRnZXRzKHtcbiAgICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkoZXZlbnQuaXRlbS5kYXRhLndpZGdldC50b0pzb24oKSksXG4gICAgICAgIHR5cGU6ICcnLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdW5kb0xhc3RPcGVyYXRpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBteU9iaiA9IEpTT04ucGFyc2UodGhpcy5fc2VydmljZS5wb3BKc29uU3RhY2soKSB8fCAnJyk7XG4gICAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydChkZWVwQ29weShteU9iaikpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBpc1pvb21lZCgpIHtcbiAgICB0aGlzLnpvb20gPSAhdGhpcy56b29tO1xuICAgIGlmICh0aGlzLnpvb20pIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuZml4ZWRab29tSW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VydmljZS5maXhlZFpvb21PdXQoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRGlhbG9nKCkge1xuICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyVG9vbGJhckRpYWxvZyk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhcj5cbiAgPGJ1dHRvblxuICAgIG1hdC1idXR0b25cbiAgICAoY2xpY2spPVwib25BZGRDbGljaygkZXZlbnQpXCJcbiAgICBtYXRUb29sdGlwPVwib3BlbiB3aWRnZXQgc2lkZWJhclwiXG4gICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCI+XG4gICAgT3BlblxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvblxuICAgIG1hdC1idXR0b25cbiAgICAoY2xpY2spPVwib3BlbkRpYWxvZygpXCJcbiAgICBtYXRUb29sdGlwPVwicmVzZXQgdGhlIGN1cnJlbnQgcmVwb3J0XCJcbiAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cIidhYm92ZSdcIj5yZXNldFxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvblxuICAgIG1hdC1idXR0b25cbiAgICAoY2xpY2spPVwidW5kb0xhc3RPcGVyYXRpb24oKVwiXG4gICAgbWF0VG9vbHRpcD1cInVuZG8gdGhlIGxhc3Qgb3BlcmF0aW9uXCJcbiAgICBbZGlzYWJsZWRdPVwiZW1wdHlDb250ZW50fGFzeW5jXCJcbiAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cIidhYm92ZSdcIj5VbmRvPC9idXR0b24+XG5cbiAgPGJ1dHRvbiBtYXQtYnV0dG9uXG4gICAgY2xhc3M9XCJhamYtY3VzdG9tLXdpZGdldC1kcm9wLXpvbmVcIlxuICAgIGNka0Ryb3BMaXN0XG4gICAgW2Nka0Ryb3BMaXN0RW50ZXJQcmVkaWNhdGVdPVwiY2FuRHJvcFByZWRpY2F0ZVwiXG4gICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJhZGRUb0xpc3QoJGV2ZW50KTtcIlxuICAgIG1hdFRvb2x0aXA9XCJhZGQgY3VzdG9tIHdpZGdldCBvbiB0b29sYmFyXCJcbiAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cIidhYm92ZSdcIj5cbiAgICBhZGQgY3VzdG9tIHdpZGdldCBoZXJlXG4gICAgPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmFkZF9jaXJjbGVfb3V0bGluZTwvaT5cbiAgPC9idXR0b24+XG4gIDxzZWN0aW9uIGNsYXNzPVwiZXhhbXBsZS1zZWN0aW9uXCI+XG4gICAgPG1hdC1zbGlkZS10b2dnbGVcbiAgICAgICAgW2NoZWNrZWRdPVwiem9vbVwiXG4gICAgICAgIChjaGFuZ2UpPWlzWm9vbWVkKClcbiAgICAgICAgbWF0VG9vbHRpcD1cImFwcGx5IHpvb20gb3V0XCJcbiAgICAgICAgW21hdFRvb2x0aXBQb3NpdGlvbl09XCInYWJvdmUnXCI+XG4gICAgICB6b29tIG91dFxuICAgIDwvbWF0LXNsaWRlLXRvZ2dsZT5cbiAgPC9zZWN0aW9uPlxuPC9tYXQtdG9vbGJhcj5cbiJdfQ==