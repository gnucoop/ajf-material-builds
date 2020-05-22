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
import { AjfImageType } from '@ajf/core/image';
import { evaluateExpression } from '@ajf/core/models';
import { AjfWidgetType } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { AjfReportBuilderService } from './report-builder-service';
let AjfReportBuilderRendererWidget = /** @class */ (() => {
    let AjfReportBuilderRendererWidget = class AjfReportBuilderRendererWidget {
        constructor(_service) {
            this._service = _service;
            // this boolean sign if is dragged a widget
            this.onDragged = false;
            this.currentContentWidget = null;
            this._onDraggedSub = Subscription.EMPTY;
        }
        get widgetTypes() {
            return AjfWidgetType;
        }
        get layoutWidget() {
            return this.widget;
        }
        canDropPredicate(item) {
            for (let i = 0; i < item.data.dropZones.length; i++) {
                if (['header', 'widget'].indexOf(item.data.dropZones[i]) > -1) {
                    return true;
                }
            }
            return false;
        }
        /**
         *  sign the start of mouse drag with 200 ms of delay
         *
         * @memberOf AjfReportBuilderContent
         */
        onDragStartHandler() {
            let s = timer(200).subscribe(() => {
                s.unsubscribe();
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
        getColumnContent() {
            const myObj = this.widget;
            return myObj.content;
        }
        getIcon() {
            const defVal = { fontSet: '', fontIcon: '' };
            const myObj = this.widget;
            if (myObj.icon == null) {
                return null;
            }
            return evaluateExpression(myObj.icon.formula) || defVal;
        }
        getFlag() {
            const defVal = 'ch';
            const myObj = this.widget;
            if (myObj.flag == null) {
                return null;
            }
            return evaluateExpression(myObj.flag.formula) || defVal;
        }
        getPercent(index) {
            const myObj = this.widget;
            const percent = myObj.columns[index] * 100;
            return `${percent.toString()}%`;
        }
        getImageUrl() {
            const defVal = '';
            const myObj = this.widget;
            if (myObj.url == null) {
                return null;
            }
            return evaluateExpression(myObj.url.formula) || defVal;
        }
        getImageType() {
            return this.widget != null ? this.widget.imageType : AjfImageType.Image;
        }
        getHtmlText() {
            const myObj = this.widget;
            if (myObj.htmlText === '') {
                return '...';
            }
            else {
                return myObj.htmlText;
            }
        }
        getCoordinate() {
            const myObj = this.widget;
            if (myObj.coordinate == null) {
                return [51.505, -0.09, 13];
            }
            else {
                return myObj.coordinate;
            }
        }
        getTileLayer() {
            const myObj = this.widget;
            if (myObj.tileLayer === '') {
                return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
            }
            else {
                return myObj.tileLayer;
            }
        }
        getAttribution() {
            let myObj;
            myObj = this.widget;
            if (myObj.attribution === '') {
                return '&copy; <a href=\'http://osm.org/copyright\'>O</a> contributors';
            }
            else {
                return myObj.attribution;
            }
        }
        addToList(event, toColumn) {
            this.onDragEndHandler();
            this._service.addToColumn(event, toColumn);
        }
        ngOnInit() {
            this._onDraggedSub = this._service.onDragged.subscribe(x => {
                this.onDragged = x;
            });
            this.getChartType = this._service.currentWidget.pipe(map((widget) => {
                if (widget == null) {
                    return 0;
                }
                const myObj = this.widget;
                return (myObj.chartType);
            }), distinctUntilChanged(), startWith(0));
            this.getDataset = this._service.currentWidget.pipe(map((widget) => {
                if (widget != null && widget.dataset != null) {
                    const myObj = this.widget;
                    return myObj.dataset;
                }
                else {
                    return [];
                }
            }), distinctUntilChanged());
            this.getTableTitles = this._service.currentWidget.pipe(map((widget) => {
                if (widget == null) {
                    return [];
                }
                const myObj = this.widget;
                if (myObj.dataset != null) {
                    let tableTitle = [];
                    for (let i = 0; i < myObj.dataset.length; i++) {
                        if (myObj.dataset[i][0] != null) {
                            tableTitle.push(myObj.dataset[i][0].label || '');
                        }
                    }
                    return tableTitle;
                }
                else {
                    return [];
                }
            }));
            this.getTableContent = this._service.currentWidget.pipe(map((widget) => {
                if (widget == null) {
                    return [];
                }
                const myObj = this.widget;
                if (myObj.dataset != null) {
                    let tableContent = [];
                    for (let i = 0; i < myObj.dataset.length; i++) {
                        for (let j = 0; j < myObj.dataset[i].length; j++) {
                            if ((myObj.dataset[i] != null) && (myObj.dataset[i][j + 1] != null)) {
                                if (tableContent[j] == null) {
                                    tableContent[j] = [];
                                }
                                if (tableContent[j][i] == null) {
                                    tableContent[j][i] = ' ';
                                }
                                tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label || '');
                            }
                        }
                    }
                    return tableContent;
                }
                return [];
            }));
            this._service.updateCurrentWidget(this.widget);
        }
        ngOnChanges(changes) {
            if (changes.widget && changes.widget.currentValue != null) {
                this.widget = changes.widget.currentValue;
            }
        }
        ngOnDestroy() {
            this._onDraggedSub.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfReportBuilderRendererWidget.prototype, "widget", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AjfReportBuilderRendererWidget.prototype, "position", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfReportBuilderRendererWidget.prototype, "section", void 0);
    AjfReportBuilderRendererWidget = __decorate([
        Component({
            selector: 'ajf-report-builder-renderer-widget',
            template: "<div class=\"ajf-container\"\n    [ngSwitch]=\"widget?.widgetType\"\n    [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\">\n  <div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\"\n    [applyStyles]=\"widget.styles\">\n      <div class=\"ajf-columns\">\n        <ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\">\n          <div class=\"ajf-column\"\n            [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\"\n            [style.width]=getPercent(idx)\n            [applyStyles]=\"layoutWidget.content[idx].styles\">\n            <ajf-report-builder-widgets-row-buttons\n              [from]=\"'layout'\"\n              [fromWidget]=\"widget\"\n              [widget]=\"clm\"\n              [position]=\"idx\"\n              (onDragStart)=\"onDragStartHandler();\"\n              (onDragEnd)=\"onDragEndHandler();\"\n              [child]=\"true\">\n            </ajf-report-builder-widgets-row-buttons>\n            <ajf-column\n              [column]=\"clm\"\n              [applyStyles]=\"widget.styles\">\n            </ajf-column>\n            <ng-template [ngIf]=\"onDragged === true\">\n              <div cdkDropList\n                [cdkDropListEnterPredicate]=\"canDropPredicate\"\n                [style.display]=\"onDragged ? 'block' : 'none'\"\n                (cdkDropListDropped)=\"addToList($event, clm)\"\n                class=\"ajf-column-drop-zone\"\n                (dragover)=\"layoutShow = true;\"\n                (dragleave)=\"layoutShow = false;\">\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n      </div>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\">\n    <ajf-image\n      [applyStyles]=\"widget.styles\"\n      [type]=\"getImageType()\"\n      [imageUrl]=\"getImageUrl()\"\n      [icon]=\"getIcon()\"\n      [flag]=\"getFlag()\">\n    </ajf-image>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\">\n    <ajf-text [htmlText]=\"getHtmlText() | translate\"  [applyStyles]=\"widget.styles\"></ajf-text>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n  </div>\n  <!-- <div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-table *ngIf=\"getTableContent|async as tc\" [data]=\"tc!\" ></ajf-table>\n  </div> -->\n  <div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\">\n    </ajf-map>\n  </div>\n</div>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid blue;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red !important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0 !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted blue;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted blue}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-show,ajf-report-builder-renderer-widget .ajf-on-drag-over{border:33px dotted blue;opacity:1 !important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden !important;display:none !important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red !important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}\n"]
        }),
        __metadata("design:paramtypes", [AjfReportBuilderService])
    ], AjfReportBuilderRendererWidget);
    return AjfReportBuilderRendererWidget;
})();
export { AjfReportBuilderRendererWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXItd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3JlbmRlcmVyLXdpZGdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFVTCxhQUFhLEVBQ2QsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBSUwsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYSxZQUFZLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHcEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFTakU7SUFBQSxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtRQW1DekMsWUFBb0IsUUFBaUM7WUFBakMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUFwQnJELDJDQUEyQztZQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1lBRWxCLHlCQUFvQixHQUFtQixJQUFJLENBQUM7WUFlcEMsa0JBQWEsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVELENBQUM7UUFsQ3pELElBQUksV0FBVztZQUNiLE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUM7UUFJRCxJQUFJLFlBQVk7WUFDZCxPQUFPLElBQUksQ0FBQyxNQUF5QixDQUFDO1FBQ3hDLENBQUM7UUE0QkQsZ0JBQWdCLENBQUMsSUFBdUM7WUFDdEQsS0FB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bEI7UUFBUixLQUFLLEVBQUU7O29FQUFrQjtJQUVqQjtRQUFSLEtBQUssRUFBRTs7bUVBQWlCO0lBYmQsOEJBQThCO1FBUDFDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQ0FBb0M7WUFDOUMsOG1GQUFtQztZQUVuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7U0FDaEQsQ0FBQzt5Q0FvQzhCLHVCQUF1QjtPQW5DMUMsOEJBQThCLENBZ1AxQztJQUFELHFDQUFDO0tBQUE7U0FoUFksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2ltYWdlJztcbmltcG9ydCB7ZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkNoYXJ0V2lkZ2V0LFxuICBBamZDb2x1bW5XaWRnZXQsXG4gIEFqZkRhdGFzZXQsXG4gIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsXG4gIEFqZk1hcFdpZGdldCxcbiAgQWpmVGFibGVXaWRnZXQsXG4gIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZVxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0Nka0RyYWcsIENka0RyYWdEcm9wfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJEcmFnRGF0YX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1kcmFnLWRhdGEnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXJlbmRlcmVyLXdpZGdldCcsXG4gIHRlbXBsYXRlVXJsOiAncmVuZGVyZXItd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVuZGVyZXItd2lkZ2V0LmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyUmVuZGVyZXJXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgZ2V0IHdpZGdldFR5cGVzKCkge1xuICAgIHJldHVybiBBamZXaWRnZXRUeXBlO1xuICB9XG5cbiAgQElucHV0KCkgd2lkZ2V0OiBBamZXaWRnZXQ7XG5cbiAgZ2V0IGxheW91dFdpZGdldCgpOiBBamZMYXlvdXRXaWRnZXQge1xuICAgIHJldHVybiB0aGlzLndpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gIH1cblxuICBASW5wdXQoKSBwb3NpdGlvbjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHNlY3Rpb246IHN0cmluZztcblxuICAvLyB0aGlzIGJvb2xlYW4gc2lnbiBpZiBpcyBkcmFnZ2VkIGEgd2lkZ2V0XG4gIG9uRHJhZ2dlZCA9IGZhbHNlO1xuXG4gIGN1cnJlbnRDb250ZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIG9iajogYW55O1xuICBmaXhlZFpvb206IGFueTtcblxuICBnZXRUYWJsZVRpdGxlczogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldFRhYmxlQ29udGVudDogT2JzZXJ2YWJsZTxzdHJpbmdbXVtdfHVuZGVmaW5lZD47XG5cbiAgZ2V0Q2hhcnRUeXBlOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldERhdGFzZXQ6IE9ic2VydmFibGU8QWpmRGF0YXNldFtdW10+O1xuICBnZXRDaGFydEJhY2tncm91bmRDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldENoYXJ0Qm9yZGVyQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRDaGFydEJvcmRlcldpZHRoOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgbGF5b3V0U2hvdzogYm9vbGVhbjtcblxuICBwcml2YXRlIF9vbkRyYWdnZWRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge31cblxuICBjYW5Ecm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmUmVwb3J0QnVpbGRlckRyYWdEYXRhPik6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5kYXRhLmRyb3Bab25lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKFsnaGVhZGVyJywgJ3dpZGdldCddLmluZGV4T2YoaXRlbS5kYXRhLmRyb3Bab25lc1tpXSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqICBzaWduIHRoZSBzdGFydCBvZiBtb3VzZSBkcmFnIHdpdGggMjAwIG1zIG9mIGRlbGF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnU3RhcnRIYW5kbGVyKCk6IHZvaWQge1xuICAgIGxldCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fc2VydmljZS5kcmFnU3RhcnRlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpZ24gdGhlIGVuZCBvZiBtb3VzZSBkcmFnXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ29udGVudFxuICAgKi9cbiAgb25EcmFnRW5kSGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmRyYWdFbmRlZCgpO1xuICB9XG5cbiAgZ2V0Q29sdW1uQ29udGVudCgpOiBBamZDb2x1bW5XaWRnZXRbXSB7XG4gICAgY29uc3QgbXlPYmo6IEFqZkxheW91dFdpZGdldCA9IDxBamZMYXlvdXRXaWRnZXQ+dGhpcy53aWRnZXQ7XG5cbiAgICByZXR1cm4gPEFqZkNvbHVtbldpZGdldFtdPm15T2JqLmNvbnRlbnQ7XG4gIH1cblxuICBnZXRJY29uKCk6IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9fG51bGwge1xuICAgIGNvbnN0IGRlZlZhbCA9IHtmb250U2V0OiAnJywgZm9udEljb246ICcnfTtcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLmljb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24obXlPYmouaWNvbi5mb3JtdWxhKSB8fCBkZWZWYWw7XG4gIH1cblxuICBnZXRGbGFnKCk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBkZWZWYWwgPSAnY2gnO1xuICAgIGNvbnN0IG15T2JqOiBBamZJbWFnZVdpZGdldCA9IDxBamZJbWFnZVdpZGdldD50aGlzLndpZGdldDtcbiAgICBpZiAobXlPYmouZmxhZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihteU9iai5mbGFnLmZvcm11bGEpIHx8IGRlZlZhbDtcbiAgfVxuXG4gIGdldFBlcmNlbnQoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgbXlPYmo6IEFqZkxheW91dFdpZGdldCA9IDxBamZMYXlvdXRXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgY29uc3QgcGVyY2VudCA9IG15T2JqLmNvbHVtbnNbaW5kZXhdICogMTAwO1xuXG4gICAgcmV0dXJuIGAke3BlcmNlbnQudG9TdHJpbmcoKX0lYDtcbiAgfVxuXG4gIGdldEltYWdlVXJsKCk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBkZWZWYWwgPSAnJztcbiAgICBjb25zdCBteU9iajogQWpmSW1hZ2VXaWRnZXQgPSA8QWpmSW1hZ2VXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgaWYgKG15T2JqLnVybCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihteU9iai51cmwuZm9ybXVsYSkgfHwgZGVmVmFsO1xuICB9XG5cbiAgZ2V0SW1hZ2VUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLndpZGdldCAhPSBudWxsID8gKDxBamZJbWFnZVdpZGdldD50aGlzLndpZGdldCkuaW1hZ2VUeXBlIDogQWpmSW1hZ2VUeXBlLkltYWdlO1xuICB9XG5cbiAgZ2V0SHRtbFRleHQoKTogc3RyaW5nIHtcbiAgICBjb25zdCBteU9iajogQWpmVGV4dFdpZGdldCA9IHRoaXMud2lkZ2V0IGFzIEFqZlRleHRXaWRnZXQ7XG4gICAgaWYgKG15T2JqLmh0bWxUZXh0ID09PSAnJykge1xuICAgICAgcmV0dXJuICcuLi4nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbXlPYmouaHRtbFRleHQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29vcmRpbmF0ZSgpOiBudW1iZXJbXSB7XG4gICAgY29uc3QgbXlPYmo6IEFqZk1hcFdpZGdldCA9IHRoaXMud2lkZ2V0IGFzIEFqZk1hcFdpZGdldDtcbiAgICBpZiAobXlPYmouY29vcmRpbmF0ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gWzUxLjUwNSwgLTAuMDksIDEzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLmNvb3JkaW5hdGUgYXMgYW55O1xuICAgIH1cbiAgfVxuXG4gIGdldFRpbGVMYXllcigpOiBzdHJpbmcge1xuICAgIGNvbnN0IG15T2JqOiBBamZNYXBXaWRnZXQgPSB0aGlzLndpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgaWYgKG15T2JqLnRpbGVMYXllciA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG15T2JqLnRpbGVMYXllcjtcbiAgICB9XG4gIH1cblxuICBnZXRBdHRyaWJ1dGlvbigpOiBzdHJpbmcge1xuICAgIGxldCBteU9iajogQWpmTWFwV2lkZ2V0O1xuICAgIG15T2JqID0gPEFqZk1hcFdpZGdldD50aGlzLndpZGdldDtcbiAgICBpZiAobXlPYmouYXR0cmlidXRpb24gPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyZjb3B5OyA8YSBocmVmPVxcJ2h0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFxcJz5PPC9hPiBjb250cmlidXRvcnMnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbXlPYmouYXR0cmlidXRpb247XG4gICAgfVxuICB9XG5cbiAgYWRkVG9MaXN0KGV2ZW50OiBDZGtEcmFnRHJvcDxBamZSZXBvcnRCdWlsZGVyRHJhZ0RhdGE+LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0KTogdm9pZCB7XG4gICAgdGhpcy5vbkRyYWdFbmRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2VydmljZS5hZGRUb0NvbHVtbihldmVudCwgdG9Db2x1bW4pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkU3ViID0gdGhpcy5fc2VydmljZS5vbkRyYWdnZWQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5vbkRyYWdnZWQgPSB4O1xuICAgIH0pO1xuXG4gICAgdGhpcy5nZXRDaGFydFR5cGUgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy53aWRnZXQ7XG4gICAgICAgICAgcmV0dXJuIDxudW1iZXI+KG15T2JqLmNoYXJ0VHlwZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoMCkpO1xuXG4gICAgdGhpcy5nZXREYXRhc2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgIT0gbnVsbCAmJiAod2lkZ2V0IGFzIEFqZkNoYXJ0V2lkZ2V0KS5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PnRoaXMud2lkZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bXlPYmouZGF0YXNldDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRUYWJsZVRpdGxlcyA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXlPYmogPSB0aGlzLndpZGdldCBhcyBBamZUYWJsZVdpZGdldDtcblxuICAgICAgaWYgKG15T2JqLmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgdGFibGVUaXRsZTogc3RyaW5nW10gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmRhdGFzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobXlPYmouZGF0YXNldFtpXVswXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0YWJsZVRpdGxlLnB1c2gobXlPYmouZGF0YXNldFtpXVswXS5sYWJlbCB8fCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWJsZVRpdGxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0pKTtcblxuICAgIHRoaXMuZ2V0VGFibGVDb250ZW50ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUobWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBteU9iaiA9IDxBamZUYWJsZVdpZGdldD50aGlzLndpZGdldDtcblxuICAgICAgaWYgKG15T2JqLmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgdGFibGVDb250ZW50OiBzdHJpbmdbXVtdID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5kYXRhc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBteU9iai5kYXRhc2V0W2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoKG15T2JqLmRhdGFzZXRbaV0gIT0gbnVsbCkgJiYgKG15T2JqLmRhdGFzZXRbaV1baiArIDFdICE9IG51bGwpKSB7XG4gICAgICAgICAgICAgIGlmICh0YWJsZUNvbnRlbnRbal0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRhYmxlQ29udGVudFtqXSA9IFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh0YWJsZUNvbnRlbnRbal1baV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRhYmxlQ29udGVudFtqXVtpXSA9ICcgJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0YWJsZUNvbnRlbnRbal0uc3BsaWNlKGksIDEsIG15T2JqLmRhdGFzZXRbaV1baiArIDFdLmxhYmVsIHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhYmxlQ29udGVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy53aWRnZXQpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKGNoYW5nZXMud2lkZ2V0ICYmIGNoYW5nZXMud2lkZ2V0LmN1cnJlbnRWYWx1ZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLndpZGdldCA9IGNoYW5nZXMud2lkZ2V0LmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19