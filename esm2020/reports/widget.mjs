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
import { AjfBaseWidgetComponent, AjfReportWidget as CoreComponent, AjfWidgetService as CoreService, AjfWidgetType as wt, } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, Injectable, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfGraphWidgetComponent } from './graph-widget';
import { AjfHeatMapWidgetComponent } from './heat-map-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ajf/core/reports";
import * as i3 from "./filter-widget";
import * as i4 from "@angular/material/dialog";
import * as i5 from "@ajf/core/table";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/select";
import * as i8 from "@angular/material/core";
import * as i9 from "@ngneat/transloco";
const defaultWidgetsFactory = () => {
    const defaultWidgets = {};
    defaultWidgets[wt.Layout] = { component: AjfLayoutWidgetComponent };
    defaultWidgets[wt.PageBreak] = { component: AjfPageBreakWidgetComponent };
    defaultWidgets[wt.Image] = { component: AjfImageWidgetComponent };
    defaultWidgets[wt.Text] = { component: AjfTextWidgetComponent };
    defaultWidgets[wt.Chart] = { component: AjfChartWidgetComponent };
    defaultWidgets[wt.Table] = { component: AjfTableWidgetComponent };
    defaultWidgets[wt.DynamicTable] = { component: AjfTableWidgetComponent };
    defaultWidgets[wt.Map] = { component: AjfMapWidgetComponent };
    defaultWidgets[wt.Column] = { component: AjfColumnWidgetComponent };
    defaultWidgets[wt.Formula] = { component: AjfFormulaWidgetComponent };
    defaultWidgets[wt.ImageContainer] = { component: AjfImageContainerWidgetComponent };
    defaultWidgets[wt.Graph] = { component: AjfGraphWidgetComponent };
    defaultWidgets[wt.PaginatedList] = { component: AjfPaginatedListWidgetComponent };
    defaultWidgets[wt.PaginatedTable] = { component: AjfPaginatedTableWidgetComponent };
    defaultWidgets[wt.Dialog] = { component: AjfDialogWidgetComponent };
    defaultWidgets[wt.HeatMap] = { component: AjfHeatMapWidgetComponent };
    return defaultWidgets;
};
export class AjfWidgetService extends CoreService {
    constructor() {
        super(defaultWidgetsFactory());
    }
}
AjfWidgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfWidgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfWidgetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
export class AjfReportWidget extends CoreComponent {
    constructor(renderer, widgetService) {
        super(renderer);
        this.widgetsMap = widgetService.componentsMap;
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.Renderer2 }, { token: AjfWidgetService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportWidget.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfReportWidget, selector: "ajf-widget", usesInheritance: true, ngImport: i0, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.AjfWidgetHost, selector: "[ajf-widget-host]" }, { kind: "component", type: i3.AjfFilterWidgetComponent, selector: "ajf-filter-widget", outputs: ["filteredInstance"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: AjfWidgetService }]; } });
export class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfColumnWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfColumnWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfColumnWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfColumnWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfColumnWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{width:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
export class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this._allcolumnsRendered$ = new BehaviorSubject(false);
        this.allcolumnsRendered$ = this
            ._allcolumnsRendered$;
    }
    ngAfterContentChecked() {
        this._allcolumnsRendered$.next(true);
    }
}
AjfLayoutWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfLayoutWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfLayoutWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfLayoutWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.AjfGetColumnContentPipe, name: "ajfGetColumnContent" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfLayoutWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
export class AjfDialogWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _dialog) {
        super(cdr, el);
        this._dialog = _dialog;
    }
    openDialog() {
        this._dialog.open(this.dialogContent);
    }
}
AjfDialogWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDialogWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i4.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfDialogWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfDialogWidgetComponent, selector: "ng-component", viewQueries: [{ propertyName: "dialogContent", first: true, predicate: ["dialogContent"], descendants: true, read: TemplateRef }], usesInheritance: true, ngImport: i0, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfDialogWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i4.MatDialog }]; }, propDecorators: { dialogContent: [{
                type: ViewChild,
                args: ['dialogContent', { read: TemplateRef }]
            }] } });
export class AjfPaginatedListWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this._currentPage = 0;
        this._pages = 0;
        this._currentContent = [];
        this._canGoForward = false;
        this._canGoBackward = false;
    }
    get currentPage() {
        return this._currentPage;
    }
    get pages() {
        return this._pages;
    }
    get currentContent() {
        return this._currentContent;
    }
    get canGoForward() {
        return this._canGoForward;
    }
    get canGoBackward() {
        return this._canGoBackward;
    }
    ngOnChanges(changes) {
        if (changes['instance']) {
            this._updateCurrentContent();
        }
    }
    ngOnInit() {
        this._updateCurrentContent();
    }
    goToPage(direction) {
        const diff = direction === 'next' ? 1 : -1;
        const newPage = this._currentPage + diff;
        if (newPage <= 0 || newPage > this._pages) {
            return;
        }
        this._currentPage = newPage;
        this._canGoForward = newPage < this._pages;
        this._canGoBackward = newPage > 1;
        this._fillCurrentContent();
    }
    _updateCurrentContent() {
        this._canGoBackward = false;
        if (this.instance == null || this.instance.content.length === 0) {
            this._currentPage = 0;
            this._pages = 0;
        }
        else {
            this._currentPage = 1;
            const { content } = this.instance;
            const { pageSize } = this.instance.widget;
            this._pages = Math.ceil(content.length / pageSize);
            this._canGoForward = this._pages > 1;
        }
        this._fillCurrentContent();
    }
    _fillCurrentContent() {
        if (this.instance == null || this.instance.content.length === 0) {
            this._currentContent = [];
            return;
        }
        const { content } = this.instance;
        const { pageSize } = this.instance.widget;
        const start = (this._currentPage - 1) * pageSize;
        this._currentContent = content.slice(start, start + pageSize);
        this._cdr.markForCheck();
    }
}
AjfPaginatedListWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedListWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPaginatedListWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfPaginatedListWidgetComponent, selector: "ng-component", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AjfReportWidget, selector: "ajf-widget" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedListWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
export class AjfPaginatedTableWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this.paginatorConfig = {
            pageSize: 10,
            pageSizeOptions: [5, 10, 15, 20, 25, 30, 50, 100, 500],
        };
        this._currentPage = 0;
        this._pages = 0;
        this._orderBy = 0;
        this._currentContent = [];
        /**
         * full data table
         */
        this._allDataContent = [];
        /**
         * full sorted data table
         */
        this._sortedAllDataContent = [];
        this._headerContent = [];
        this._canGoForward = false;
        this._canGoBackward = false;
    }
    get currentPage() {
        return this._currentPage;
    }
    get pages() {
        return this._pages;
    }
    get orderBy() {
        return this._orderBy;
    }
    get currentContent() {
        return this._currentContent;
    }
    get headerContent() {
        return this._headerContent;
    }
    get canGoForward() {
        return this._canGoForward;
    }
    get canGoBackward() {
        return this._canGoBackward;
    }
    /**
     * Set initial data for the table on instance changes
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes['instance']) {
            if (this.instance != null &&
                this.instance.widget.pageSize &&
                this.instance.widget.pageSize > 0) {
                this.paginatorConfig.pageSize = this.instance.widget.pageSize;
            }
            this._updateCurrentContent();
        }
    }
    ngOnInit() {
        if (this.instance != null &&
            this.instance.widget.pageSize &&
            this.instance.widget.pageSize > 0) {
            this.paginatorConfig.pageSize = this.instance.widget.pageSize;
        }
        this._updateCurrentContent();
    }
    /**
     * Got to next or previous page
     * @param direction
     * @returns
     */
    goToPage(direction) {
        const diff = direction === 'next' ? 1 : -1;
        const newPage = this._currentPage + diff;
        if (newPage <= 0 || newPage > this._pages) {
            return;
        }
        this._currentPage = newPage;
        this._canGoForward = newPage < this._pages;
        this._canGoBackward = newPage > 1;
        this._fillCurrentContent();
    }
    onPageSizeChange(_pageSize) {
        this.paginatorConfig.pageSize = _pageSize;
        this._updateCurrentContent();
    }
    /**
     * Sort all data for the table, not only current page data
     * @param sort
     * @returns
     */
    sortPaginatedData(sort) {
        if (this._allDataContent.length > 1) {
            if (!sort.active || sort.direction === '') {
                this._sortedAllDataContent = this._allDataContent.slice();
            }
            else {
                this._currentPage = 1;
                this._canGoForward = this._currentPage < this._pages;
                this._canGoBackward = false;
                const columnIdx = parseInt(sort.active.slice(-1)) || 0;
                this._sortedAllDataContent = this._allDataContent.slice().sort((a, b) => {
                    const isAsc = sort.direction === 'asc';
                    return this._compare(a[columnIdx], b[columnIdx], isAsc);
                });
            }
            this._fillCurrentContent();
        }
    }
    _compare(a, b, isAsc) {
        return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
    }
    /**
     * Set current header and data for the table, starting from page 1
     */
    _updateCurrentContent() {
        this._canGoBackward = false;
        if (this.instance == null || this.instance.data.length === 0) {
            this._currentPage = 0;
            this._pages = 0;
            this._headerContent = [];
            this._currentContent = [];
            this._allDataContent = [];
            this._sortedAllDataContent = [];
        }
        else {
            this._headerContent = this.instance.data[0];
            this._allDataContent = this.instance.data.slice(1);
            this._sortedAllDataContent = [...this._allDataContent];
            this._currentPage = 1;
            this._pages = Math.ceil(this._allDataContent.length / this.paginatorConfig.pageSize);
            this._canGoForward = this._pages > 1;
        }
        this._fillCurrentContent();
    }
    /**
     * Update current data for the table, using page and sorted data
     */
    _fillCurrentContent() {
        if (this._sortedAllDataContent.length === 0 && this._headerContent.length > 0) {
            this._currentContent = [this._headerContent];
        }
        else {
            const start = (this._currentPage - 1) * this.paginatorConfig.pageSize;
            this._currentContent = [
                this._headerContent,
                ...this._sortedAllDataContent.slice(start, start + this.paginatorConfig.pageSize),
            ];
        }
        this._cdr.markForCheck();
    }
}
AjfPaginatedTableWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedTableWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPaginatedTableWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfPaginatedTableWidgetComponent, selector: "ng-component", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"currentContent\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"], dependencies: [{ kind: "component", type: i5.AjfTable, selector: "ajf-table", inputs: ["data", "cellpadding"], outputs: ["sortSelected"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }, { kind: "directive", type: i6.MatLabel, selector: "mat-label" }, { kind: "component", type: i7.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { kind: "component", type: i8.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { kind: "pipe", type: i9.TranslocoPipe, name: "transloco" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPaginatedTableWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"currentContent\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9jb2x1bW4td2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9sYXlvdXQtd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9kaWFsb2ctd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9wYWdpbmF0ZWQtbGlzdC13aWRnZXQuaHRtbCIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3JlcG9ydHMvc3JjL3BhZ2luYXRlZC10YWJsZS13aWRnZXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsc0JBQXNCLEVBTXRCLGVBQWUsSUFBSSxhQUFhLEVBR2hDLGdCQUFnQixJQUFJLFdBQVcsRUFDL0IsYUFBYSxJQUFJLEVBQUUsR0FDcEIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxVQUFVLEVBS1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxP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Z0NBQWdDO2tCQU41QyxTQUFTO3NDQUdTLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkJhc2VXaWRnZXRDb21wb25lbnQsXG4gIEFqZkNvbHVtbldpZGdldEluc3RhbmNlLFxuICBBamZEaWFsb2dXaWRnZXRJbnN0YW5jZSxcbiAgQWpmTGF5b3V0V2lkZ2V0SW5zdGFuY2UsXG4gIEFqZlBhZ2luYXRlZExpc3RXaWRnZXRJbnN0YW5jZSxcbiAgQWpmUGFnaW5hdGVkVGFibGVXaWRnZXRJbnN0YW5jZSxcbiAgQWpmUmVwb3J0V2lkZ2V0IGFzIENvcmVDb21wb25lbnQsXG4gIEFqZldpZGdldENvbXBvbmVudHNNYXAsXG4gIEFqZldpZGdldEluc3RhbmNlLFxuICBBamZXaWRnZXRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLFxuICBBamZXaWRnZXRUeXBlIGFzIHd0LFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3RhYmxlLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZ30gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7U29ydH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkdyYXBoV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2dyYXBoLXdpZGdldCc7XG5pbXBvcnQge0FqZkhlYXRNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaGVhdC1tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3BhZ2UtYnJlYWstd2lkZ2V0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGV4dFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90ZXh0LXdpZGdldCc7XG5cbmNvbnN0IGRlZmF1bHRXaWRnZXRzRmFjdG9yeSA9ICgpOiBBamZXaWRnZXRDb21wb25lbnRzTWFwID0+IHtcbiAgY29uc3QgZGVmYXVsdFdpZGdldHM6IEFqZldpZGdldENvbXBvbmVudHNNYXAgPSB7fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuTGF5b3V0XSA9IHtjb21wb25lbnQ6IEFqZkxheW91dFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlBhZ2VCcmVha10gPSB7Y29tcG9uZW50OiBBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5JbWFnZV0gPSB7Y29tcG9uZW50OiBBamZJbWFnZVdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlRleHRdID0ge2NvbXBvbmVudDogQWpmVGV4dFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkNoYXJ0XSA9IHtjb21wb25lbnQ6IEFqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuVGFibGVdID0ge2NvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5EeW5hbWljVGFibGVdID0ge2NvbXBvbmVudDogQWpmVGFibGVXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5NYXBdID0ge2NvbXBvbmVudDogQWpmTWFwV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuQ29sdW1uXSA9IHtjb21wb25lbnQ6IEFqZkNvbHVtbldpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkZvcm11bGFdID0ge2NvbXBvbmVudDogQWpmRm9ybXVsYVdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkltYWdlQ29udGFpbmVyXSA9IHtjb21wb25lbnQ6IEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuR3JhcGhdID0ge2NvbXBvbmVudDogQWpmR3JhcGhXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5QYWdpbmF0ZWRMaXN0XSA9IHtjb21wb25lbnQ6IEFqZlBhZ2luYXRlZExpc3RXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5QYWdpbmF0ZWRUYWJsZV0gPSB7Y29tcG9uZW50OiBBamZQYWdpbmF0ZWRUYWJsZVdpZGdldENvbXBvbmVudH07XG5cbiAgZGVmYXVsdFdpZGdldHNbd3QuRGlhbG9nXSA9IHtjb21wb25lbnQ6IEFqZkRpYWxvZ1dpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkhlYXRNYXBdID0ge2NvbXBvbmVudDogQWpmSGVhdE1hcFdpZGdldENvbXBvbmVudH07XG4gIHJldHVybiBkZWZhdWx0V2lkZ2V0cztcbn07XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZldpZGdldFNlcnZpY2UgZXh0ZW5kcyBDb3JlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGRlZmF1bHRXaWRnZXRzRmFjdG9yeSgpKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtd2lkZ2V0JyxcbiAgdGVtcGxhdGVVcmw6ICd3aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0V2lkZ2V0IGV4dGVuZHMgQ29yZUNvbXBvbmVudCB7XG4gIHJlYWRvbmx5IHdpZGdldHNNYXA6IEFqZldpZGdldENvbXBvbmVudHNNYXA7XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXI6IFJlbmRlcmVyMiwgd2lkZ2V0U2VydmljZTogQWpmV2lkZ2V0U2VydmljZSkge1xuICAgIHN1cGVyKHJlbmRlcmVyKTtcbiAgICB0aGlzLndpZGdldHNNYXAgPSB3aWRnZXRTZXJ2aWNlLmNvbXBvbmVudHNNYXA7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnY29sdW1uLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NvbHVtbi13aWRnZXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZVdpZGdldENvbXBvbmVudDxBamZDb2x1bW5XaWRnZXRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2xheW91dC13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydsYXlvdXQtd2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkxheW91dFdpZGdldENvbXBvbmVudFxuICBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmTGF5b3V0V2lkZ2V0SW5zdGFuY2U+XG4gIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZFxue1xuICBwcml2YXRlIF9hbGxjb2x1bW5zUmVuZGVyZWQkOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgYWxsY29sdW1uc1JlbmRlcmVkJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXNcbiAgICAuX2FsbGNvbHVtbnNSZW5kZXJlZCQgYXMgT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxjb2x1bW5zUmVuZGVyZWQkLm5leHQodHJ1ZSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAnZGlhbG9nLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2RpYWxvZy13aWRnZXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRGlhbG9nV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZVdpZGdldENvbXBvbmVudDxBamZEaWFsb2dXaWRnZXRJbnN0YW5jZT4ge1xuICBAVmlld0NoaWxkKCdkaWFsb2dDb250ZW50Jywge3JlYWQ6IFRlbXBsYXRlUmVmfSkgZGlhbG9nQ29udGVudCE6IFRlbXBsYXRlUmVmPEhUTUxFbGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2cpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxuXG4gIG9wZW5EaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5fZGlhbG9nLm9wZW4odGhpcy5kaWFsb2dDb250ZW50KTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdwYWdpbmF0ZWQtbGlzdC13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdpbmF0ZWQtbGlzdC13aWRnZXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUGFnaW5hdGVkTGlzdFdpZGdldENvbXBvbmVudFxuICBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmUGFnaW5hdGVkTGlzdFdpZGdldEluc3RhbmNlPlxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0XG57XG4gIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgfVxuICBwcml2YXRlIF9jdXJyZW50UGFnZSA9IDA7XG5cbiAgZ2V0IHBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VzO1xuICB9XG4gIHByaXZhdGUgX3BhZ2VzID0gMDtcblxuICBnZXQgY3VycmVudENvbnRlbnQoKTogQWpmV2lkZ2V0SW5zdGFuY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb250ZW50O1xuICB9XG4gIHByaXZhdGUgX2N1cnJlbnRDb250ZW50OiBBamZXaWRnZXRJbnN0YW5jZVtdID0gW107XG5cbiAgZ2V0IGNhbkdvRm9yd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuR29Gb3J3YXJkO1xuICB9XG4gIHByaXZhdGUgX2NhbkdvRm9yd2FyZCA9IGZhbHNlO1xuXG4gIGdldCBjYW5Hb0JhY2t3YXJkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jYW5Hb0JhY2t3YXJkO1xuICB9XG4gIHByaXZhdGUgX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydpbnN0YW5jZSddKSB7XG4gICAgICB0aGlzLl91cGRhdGVDdXJyZW50Q29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICBnb1RvUGFnZShkaXJlY3Rpb246ICduZXh0JyB8ICdwcmV2aW91cycpOiB2b2lkIHtcbiAgICBjb25zdCBkaWZmID0gZGlyZWN0aW9uID09PSAnbmV4dCcgPyAxIDogLTE7XG4gICAgY29uc3QgbmV3UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgZGlmZjtcbiAgICBpZiAobmV3UGFnZSA8PSAwIHx8IG5ld1BhZ2UgPiB0aGlzLl9wYWdlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IG5ld1BhZ2U7XG4gICAgdGhpcy5fY2FuR29Gb3J3YXJkID0gbmV3UGFnZSA8IHRoaXMuX3BhZ2VzO1xuICAgIHRoaXMuX2NhbkdvQmFja3dhcmQgPSBuZXdQYWdlID4gMTtcbiAgICB0aGlzLl9maWxsQ3VycmVudENvbnRlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUN1cnJlbnRDb250ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuaW5zdGFuY2UuY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gMDtcbiAgICAgIHRoaXMuX3BhZ2VzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSAxO1xuICAgICAgY29uc3Qge2NvbnRlbnR9ID0gdGhpcy5pbnN0YW5jZTtcbiAgICAgIGNvbnN0IHtwYWdlU2l6ZX0gPSB0aGlzLmluc3RhbmNlLndpZGdldDtcbiAgICAgIHRoaXMuX3BhZ2VzID0gTWF0aC5jZWlsKGNvbnRlbnQubGVuZ3RoIC8gcGFnZVNpemUpO1xuICAgICAgdGhpcy5fY2FuR29Gb3J3YXJkID0gdGhpcy5fcGFnZXMgPiAxO1xuICAgIH1cbiAgICB0aGlzLl9maWxsQ3VycmVudENvbnRlbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbGxDdXJyZW50Q29udGVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuaW5zdGFuY2UuY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRDb250ZW50ID0gW107XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHtjb250ZW50fSA9IHRoaXMuaW5zdGFuY2U7XG4gICAgY29uc3Qge3BhZ2VTaXplfSA9IHRoaXMuaW5zdGFuY2Uud2lkZ2V0O1xuICAgIGNvbnN0IHN0YXJ0ID0gKHRoaXMuX2N1cnJlbnRQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IGNvbnRlbnQuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdwYWdpbmF0ZWQtdGFibGUtd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnaW5hdGVkLXRhYmxlLXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZQYWdpbmF0ZWRUYWJsZVdpZGdldENvbXBvbmVudFxuICBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmUGFnaW5hdGVkVGFibGVXaWRnZXRJbnN0YW5jZT5cbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdFxue1xuICByZWFkb25seSBwYWdpbmF0b3JDb25maWcgPSB7XG4gICAgcGFnZVNpemU6IDEwLFxuICAgIHBhZ2VTaXplT3B0aW9uczogWzUsIDEwLCAxNSwgMjAsIDI1LCAzMCwgNTAsIDEwMCwgNTAwXSxcbiAgfTtcblxuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAwO1xuXG4gIGdldCBwYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlcztcbiAgfVxuICBwcml2YXRlIF9wYWdlcyA9IDA7XG5cbiAgZ2V0IG9yZGVyQnkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3JkZXJCeTtcbiAgfVxuICBwcml2YXRlIF9vcmRlckJ5ID0gMDtcblxuICBnZXQgY3VycmVudENvbnRlbnQoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb250ZW50O1xuICB9XG4gIHByaXZhdGUgX2N1cnJlbnRDb250ZW50OiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgLyoqXG4gICAqIGZ1bGwgZGF0YSB0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfYWxsRGF0YUNvbnRlbnQ6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcblxuICAvKipcbiAgICogZnVsbCBzb3J0ZWQgZGF0YSB0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkQWxsRGF0YUNvbnRlbnQ6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcblxuICBnZXQgaGVhZGVyQ29udGVudCgpOiBBamZUYWJsZUNlbGxbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlckNvbnRlbnQ7XG4gIH1cbiAgcHJpdmF0ZSBfaGVhZGVyQ29udGVudDogQWpmVGFibGVDZWxsW10gPSBbXTtcblxuICBnZXQgY2FuR29Gb3J3YXJkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jYW5Hb0ZvcndhcmQ7XG4gIH1cbiAgcHJpdmF0ZSBfY2FuR29Gb3J3YXJkID0gZmFsc2U7XG5cbiAgZ2V0IGNhbkdvQmFja3dhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbkdvQmFja3dhcmQ7XG4gIH1cbiAgcHJpdmF0ZSBfY2FuR29CYWNrd2FyZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY2RyLCBlbCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGluaXRpYWwgZGF0YSBmb3IgdGhlIHRhYmxlIG9uIGluc3RhbmNlIGNoYW5nZXNcbiAgICogQHBhcmFtIGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snaW5zdGFuY2UnXSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmluc3RhbmNlICE9IG51bGwgJiZcbiAgICAgICAgdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemUgJiZcbiAgICAgICAgdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemUgPiAwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemUgPSB0aGlzLmluc3RhbmNlLndpZGdldC5wYWdlU2l6ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRDb250ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5pbnN0YW5jZSAhPSBudWxsICYmXG4gICAgICB0aGlzLmluc3RhbmNlLndpZGdldC5wYWdlU2l6ZSAmJlxuICAgICAgdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemUgPiAwXG4gICAgKSB7XG4gICAgICB0aGlzLnBhZ2luYXRvckNvbmZpZy5wYWdlU2l6ZSA9IHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVDdXJyZW50Q29udGVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdvdCB0byBuZXh0IG9yIHByZXZpb3VzIHBhZ2VcbiAgICogQHBhcmFtIGRpcmVjdGlvblxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZ29Ub1BhZ2UoZGlyZWN0aW9uOiAnbmV4dCcgfCAncHJldmlvdXMnKTogdm9pZCB7XG4gICAgY29uc3QgZGlmZiA9IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gMSA6IC0xO1xuICAgIGNvbnN0IG5ld1BhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSArIGRpZmY7XG4gICAgaWYgKG5ld1BhZ2UgPD0gMCB8fCBuZXdQYWdlID4gdGhpcy5fcGFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBuZXdQYWdlO1xuICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IG5ld1BhZ2UgPCB0aGlzLl9wYWdlcztcbiAgICB0aGlzLl9jYW5Hb0JhY2t3YXJkID0gbmV3UGFnZSA+IDE7XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICBvblBhZ2VTaXplQ2hhbmdlKF9wYWdlU2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemUgPSBfcGFnZVNpemU7XG4gICAgdGhpcy5fdXBkYXRlQ3VycmVudENvbnRlbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0IGFsbCBkYXRhIGZvciB0aGUgdGFibGUsIG5vdCBvbmx5IGN1cnJlbnQgcGFnZSBkYXRhXG4gICAqIEBwYXJhbSBzb3J0XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzb3J0UGFnaW5hdGVkRGF0YShzb3J0OiBTb3J0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2FsbERhdGFDb250ZW50Lmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICghc29ydC5hY3RpdmUgfHwgc29ydC5kaXJlY3Rpb24gPT09ICcnKSB7XG4gICAgICAgIHRoaXMuX3NvcnRlZEFsbERhdGFDb250ZW50ID0gdGhpcy5fYWxsRGF0YUNvbnRlbnQuc2xpY2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gMTtcbiAgICAgICAgdGhpcy5fY2FuR29Gb3J3YXJkID0gdGhpcy5fY3VycmVudFBhZ2UgPCB0aGlzLl9wYWdlcztcbiAgICAgICAgdGhpcy5fY2FuR29CYWNrd2FyZCA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGNvbHVtbklkeCA9IHBhcnNlSW50KHNvcnQuYWN0aXZlLnNsaWNlKC0xKSkgfHwgMDtcbiAgICAgICAgdGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnQgPSB0aGlzLl9hbGxEYXRhQ29udGVudC5zbGljZSgpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBjb25zdCBpc0FzYyA9IHNvcnQuZGlyZWN0aW9uID09PSAnYXNjJztcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZShhW2NvbHVtbklkeF0sIGJbY29sdW1uSWR4XSwgaXNBc2MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZpbGxDdXJyZW50Q29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbXBhcmUoYTogQWpmVGFibGVDZWxsLCBiOiBBamZUYWJsZUNlbGwsIGlzQXNjOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIChhLnZhbHVlIDwgYi52YWx1ZSA/IC0xIDogMSkgKiAoaXNBc2MgPyAxIDogLTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBjdXJyZW50IGhlYWRlciBhbmQgZGF0YSBmb3IgdGhlIHRhYmxlLCBzdGFydGluZyBmcm9tIHBhZ2UgMVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlQ3VycmVudENvbnRlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FuR29CYWNrd2FyZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwgfHwgdGhpcy5pbnN0YW5jZS5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSAwO1xuICAgICAgdGhpcy5fcGFnZXMgPSAwO1xuICAgICAgdGhpcy5faGVhZGVyQ29udGVudCA9IFtdO1xuICAgICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBbXTtcbiAgICAgIHRoaXMuX2FsbERhdGFDb250ZW50ID0gW107XG4gICAgICB0aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkZXJDb250ZW50ID0gdGhpcy5pbnN0YW5jZS5kYXRhWzBdO1xuICAgICAgdGhpcy5fYWxsRGF0YUNvbnRlbnQgPSB0aGlzLmluc3RhbmNlLmRhdGEuc2xpY2UoMSk7XG4gICAgICB0aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudCA9IFsuLi50aGlzLl9hbGxEYXRhQ29udGVudF07XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IDE7XG5cbiAgICAgIHRoaXMuX3BhZ2VzID0gTWF0aC5jZWlsKHRoaXMuX2FsbERhdGFDb250ZW50Lmxlbmd0aCAvIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplKTtcbiAgICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IHRoaXMuX3BhZ2VzID4gMTtcbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIGN1cnJlbnQgZGF0YSBmb3IgdGhlIHRhYmxlLCB1c2luZyBwYWdlIGFuZCBzb3J0ZWQgZGF0YVxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsbEN1cnJlbnRDb250ZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudC5sZW5ndGggPT09IDAgJiYgdGhpcy5faGVhZGVyQ29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IFt0aGlzLl9oZWFkZXJDb250ZW50XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RhcnQgPSAodGhpcy5fY3VycmVudFBhZ2UgLSAxKSAqIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplO1xuICAgICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBbXG4gICAgICAgIHRoaXMuX2hlYWRlckNvbnRlbnQsXG4gICAgICAgIC4uLnRoaXMuX3NvcnRlZEFsbERhdGFDb250ZW50LnNsaWNlKHN0YXJ0LCBzdGFydCArIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplKSxcbiAgICAgIF07XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIiwiPGFqZi1maWx0ZXItd2lkZ2V0XG4gICpuZ0lmPVwiaW5zdGFuY2UgJiYgaW5zdGFuY2UuZmlsdGVyXCJcbiAgW2luc3RhbmNlXT1cImluc3RhbmNlXCJcbiAgKGZpbHRlcmVkSW5zdGFuY2UpPVwiaW5zdGFuY2UgPSAkZXZlbnRcIlxuPlxuPC9hamYtZmlsdGVyLXdpZGdldD5cbjxuZy10ZW1wbGF0ZSBhamYtd2lkZ2V0LWhvc3Q+PC9uZy10ZW1wbGF0ZT5cbiIsIjxkaXYgKm5nSWY9XCJpbnN0YW5jZVwiIGNsYXNzPVwiYWpmLWNvbHVtbi1jb250YWluZXJcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgdyBvZiBpbnN0YW5jZS5jb250ZW50XCI+XG4gICAgPGFqZi13aWRnZXQgW2luc3RhbmNlXT1cIndcIj5cbiAgICA8L2FqZi13aWRnZXQ+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iLCI8ZGl2ICpuZ0lmPVwiaW5zdGFuY2VcIiBjbGFzcz1cImFqZi1jb2x1bW5zXCI+XG4gIDxkaXZcbiAgICAgICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgaW5zdGFuY2Uud2lkZ2V0LmNvbHVtbnM7IGxldCBpZHggPSBpbmRleFwiXG4gICAgICBbbmdTdHlsZV09XCJ7J2ZsZXgtZ3Jvdyc6IGNvbHVtbiA+IC0xID8gMSA6IG51bGwsICdmbGV4LWJhc2lzJyA6IGNvbHVtbiA+IC0xID8gKGNvbHVtbiAqIDEwMCkgKyAnJScgOiBudWxsfVwiXG4gICAgICBjbGFzcz1cImFqZi1jb2x1bW5cIlxuICA+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJhbGxjb2x1bW5zUmVuZGVyZWQkfGFzeW5jXCI+XG4gICAgPGFqZi13aWRnZXQgKm5nSWY9XCIoaW5zdGFuY2V8YWpmR2V0Q29sdW1uQ29udGVudDppZHgpIGFzIGNjXCIgW2luc3RhbmNlXT1cImNjIVwiPlxuICAgIDwvYWpmLXdpZGdldD5cbiAgPC9uZy1jb250YWluZXI+XG4gPC9kaXY+XG48L2Rpdj5cbiIsIjxhICpuZ0lmPVwiaW5zdGFuY2VcIiBjbGFzcz1cImFqZi1kaWFsb2ctdG9nZ2xlXCIgKGNsaWNrKT1cIm9wZW5EaWFsb2coKVwiPlxuICA8YWpmLXdpZGdldCBbaW5zdGFuY2VdPVwiaW5zdGFuY2UudG9nZ2xlXCI+PC9hamYtd2lkZ2V0PlxuPC9hPlxuPG5nLXRlbXBsYXRlICNkaWFsb2dDb250ZW50PlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiaW5zdGFuY2VcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGluc3RhbmNlLmNvbnRlbnRcIj5cbiAgICAgIDxhamYtd2lkZ2V0IFtpbnN0YW5jZV09XCJpdGVtXCI+PC9hamYtd2lkZ2V0PlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0XCIgKm5nSWY9XCJpbnN0YW5jZSAmJiBwYWdlcyA+IDBcIj5cbiAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC10aXRsZS1jb250YWluZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LXRpdGxlXCI+e3sgaW5zdGFuY2Uud2lkZ2V0LnRpdGxlIH19PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1zcGFjZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LXBhZ2luYXRvclwiPlxuICAgICAgPGEgKGNsaWNrKT1cImdvVG9QYWdlKCdwcmV2aW91cycpXCIgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtYnRuIGFqZi1wYWdpbmF0ZWQtbGlzdC1iYWNrLWJ0blwiXG4gICAgICAgICAgW2NsYXNzLmFqZi1wYWdpbmF0ZWQtbGlzdC1idG4tZGlzYWJsZWRdPVwiY2FuR29CYWNrd2FyZCA9PT0gZmFsc2VcIj48L2E+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LXBhZ2luYXRvci1wYWdlXCI+e3sgY3VycmVudFBhZ2UgfX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtcGFnaW5hdG9yLXNlcGFyYXRvclwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC1wYWdpbmF0b3ItcGFnZXNcIj57eyBwYWdlcyB9fTwvZGl2PlxuICAgICAgPGEgKGNsaWNrKT1cImdvVG9QYWdlKCduZXh0JylcIiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC1idG4gYWpmLXBhZ2luYXRlZC1saXN0LWZvcndhcmQtYnRuXCJcbiAgICAgICAgW2NsYXNzLmFqZi1wYWdpbmF0ZWQtbGlzdC1idG4tZGlzYWJsZWRdPVwiY2FuR29Gb3J3YXJkID09PSBmYWxzZVwiPjwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtaXRlbVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGN1cnJlbnRDb250ZW50XCI+XG4gICAgPGFqZi13aWRnZXQgW2luc3RhbmNlXT1cIml0ZW1cIj48L2FqZi13aWRnZXQ+XG4gIDwvZGl2PlxuPC9kaXY+XG4iLCI8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZVwiICpuZ0lmPVwiaW5zdGFuY2VcIj5cbiAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtdGl0bGUtY29udGFpbmVyXCIgKm5nSWY9XCJwYWdlcyA+IDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdlLXNlbGVjdG9yXCI+XG4gICAgICA8bWF0LWxhYmVsIGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdlLXNlbGVjdG9yLWxhYmVsXCJcbiAgICAgICAgPnt7J0l0ZW1zIHBlciBwYWdlOid8dHJhbnNsb2NvfX08L21hdC1sYWJlbFxuICAgICAgPlxuICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgW3ZhbHVlXT1cInBhZ2luYXRvckNvbmZpZy5wYWdlU2l6ZVwiXG4gICAgICAgIChzZWxlY3Rpb25DaGFuZ2UpPVwib25QYWdlU2l6ZUNoYW5nZSgkZXZlbnQudmFsdWUpXCJcbiAgICAgID5cbiAgICAgICAgPG1hdC1vcHRpb25cbiAgICAgICAgICBbdmFsdWVdPVwicGFnZVNpemVPcHRcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBwYWdlU2l6ZU9wdCBvZiBwYWdpbmF0b3JDb25maWcucGFnZVNpemVPcHRpb25zXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IHBhZ2VTaXplT3B0IH19XG4gICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXNwYWNlclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLXBhZ2luYXRvclwiPlxuICAgICAgPGFcbiAgICAgICAgKGNsaWNrKT1cImdvVG9QYWdlKCdwcmV2aW91cycpXCJcbiAgICAgICAgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLWJ0biBhamYtcGFnaW5hdGVkLXRhYmxlLWJhY2stYnRuXCJcbiAgICAgICAgW2NsYXNzLmFqZi1wYWdpbmF0ZWQtdGFibGUtYnRuLWRpc2FibGVkXT1cImNhbkdvQmFja3dhcmQgPT09IGZhbHNlXCJcbiAgICAgID48L2E+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdpbmF0b3ItcGFnZVwiPnt7IGN1cnJlbnRQYWdlIH19PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdpbmF0b3Itc2VwYXJhdG9yXCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdpbmF0b3ItcGFnZXNcIj57eyBwYWdlcyB9fTwvZGl2PlxuICAgICAgPGFcbiAgICAgICAgKGNsaWNrKT1cImdvVG9QYWdlKCduZXh0JylcIlxuICAgICAgICBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtYnRuIGFqZi1wYWdpbmF0ZWQtdGFibGUtZm9yd2FyZC1idG5cIlxuICAgICAgICBbY2xhc3MuYWpmLXBhZ2luYXRlZC10YWJsZS1idG4tZGlzYWJsZWRdPVwiY2FuR29Gb3J3YXJkID09PSBmYWxzZVwiXG4gICAgICA+PC9hPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtaXRlbVwiPlxuICAgIDxhamYtd2lkZ2V0LWV4cG9ydFxuICAgICAgKm5nSWY9XCJpbnN0YW5jZVwiXG4gICAgICBbd2lkZ2V0VHlwZV09XCJpbnN0YW5jZS53aWRnZXRUeXBlXCJcbiAgICAgIFtkYXRhXT1cImN1cnJlbnRDb250ZW50XCJcbiAgICAgIFtlbmFibGVdPVwiaW5zdGFuY2UuZXhwb3J0YWJsZVwiXG4gICAgPlxuICAgICAgPGFqZi10YWJsZSBbZGF0YV09XCJjdXJyZW50Q29udGVudFwiIChzb3J0U2VsZWN0ZWQpPVwic29ydFBhZ2luYXRlZERhdGEoJGV2ZW50KVwiPjwvYWpmLXRhYmxlPlxuICAgIDwvYWpmLXdpZGdldC1leHBvcnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=