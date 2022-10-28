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
import * as i1 from "./filter-widget";
import * as i2 from "@angular/common";
import * as i3 from "@ajf/core/reports";
import * as i4 from "@angular/material/dialog";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
import * as i7 from "@ajf/core/table";
import * as i8 from "@angular/material/form-field";
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
AjfWidgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfWidgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfWidgetService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
export class AjfReportWidget extends CoreComponent {
    constructor(renderer, widgetService) {
        super(renderer);
        this.widgetsMap = widgetService.componentsMap;
    }
}
AjfReportWidget.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportWidget, deps: [{ token: i0.Renderer2 }, { token: AjfWidgetService }], target: i0.ɵɵFactoryTarget.Component });
AjfReportWidget.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReportWidget, selector: "ajf-widget", usesInheritance: true, ngImport: i0, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], components: [{ type: i1.AjfFilterWidgetComponent, selector: "ajf-filter-widget", outputs: ["filteredInstance"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.AjfWidgetHost, selector: "[ajf-widget-host]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReportWidget, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: AjfWidgetService }]; } });
export class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
}
AjfColumnWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfColumnWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfColumnWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfColumnWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{flex:1 1 auto}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfColumnWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{flex:1 1 auto}\n"] }]
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
AjfLayoutWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfLayoutWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfLayoutWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfLayoutWidgetComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], pipes: { "async": i2.AsyncPipe, "ajfGetColumnContent": i3.AjfGetColumnContentPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfLayoutWidgetComponent, decorators: [{
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
AjfDialogWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDialogWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i4.MatDialog }], target: i0.ɵɵFactoryTarget.Component });
AjfDialogWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfDialogWidgetComponent, selector: "ng-component", viewQueries: [{ propertyName: "dialogContent", first: true, predicate: ["dialogContent"], descendants: true, read: TemplateRef }], usesInheritance: true, ngImport: i0, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDialogWidgetComponent, decorators: [{
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
AjfPaginatedListWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPaginatedListWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPaginatedListWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfPaginatedListWidgetComponent, selector: "ng-component", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"], components: [{ type: AjfReportWidget, selector: "ajf-widget" }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPaginatedListWidgetComponent, decorators: [{
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
AjfPaginatedTableWidgetComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPaginatedTableWidgetComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AjfPaginatedTableWidgetComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfPaginatedTableWidgetComponent, selector: "ng-component", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"currentContent\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table,.ajf-paginated-table table{width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector mat-select{width:50px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"], components: [{ type: i5.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i6.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i3.AjfWidgetExport, selector: "ajf-widget-export", inputs: ["widgetType", "data", "overlay", "enable"] }, { type: i7.AjfTable, selector: "ajf-table", inputs: ["data", "cellpadding"], outputs: ["sortSelected"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.MatLabel, selector: "mat-label" }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "transloco": i9.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPaginatedTableWidgetComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"currentContent\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table,.ajf-paginated-table table{width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector mat-select{width:50px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9jb2x1bW4td2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9sYXlvdXQtd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9kaWFsb2ctd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9wYWdpbmF0ZWQtbGlzdC13aWRnZXQuaHRtbCIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3JlcG9ydHMvc3JjL3BhZ2luYXRlZC10YWJsZS13aWRnZXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsc0JBQXNCLEVBTXRCLGVBQWUsSUFBSSxhQUFhLEVBR2hDLGdCQUFnQixJQUFJLFdBQVcsRUFDL0IsYUFBYSxJQUFJLEVBQUUsR0FDcEIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxVQUFVLEVBS1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxP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QyxnR01sUTdDLGd4REE4Q0E7MkZOb05hLGdDQUFnQztrQkFONUMsU0FBUztzQ0FHUyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZCYXNlV2lkZ2V0Q29tcG9uZW50LFxuICBBamZDb2x1bW5XaWRnZXRJbnN0YW5jZSxcbiAgQWpmRGlhbG9nV2lkZ2V0SW5zdGFuY2UsXG4gIEFqZkxheW91dFdpZGdldEluc3RhbmNlLFxuICBBamZQYWdpbmF0ZWRMaXN0V2lkZ2V0SW5zdGFuY2UsXG4gIEFqZlBhZ2luYXRlZFRhYmxlV2lkZ2V0SW5zdGFuY2UsXG4gIEFqZlJlcG9ydFdpZGdldCBhcyBDb3JlQ29tcG9uZW50LFxuICBBamZXaWRnZXRDb21wb25lbnRzTWFwLFxuICBBamZXaWRnZXRJbnN0YW5jZSxcbiAgQWpmV2lkZ2V0U2VydmljZSBhcyBDb3JlU2VydmljZSxcbiAgQWpmV2lkZ2V0VHlwZSBhcyB3dCxcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0YWJsZSxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2d9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1NvcnR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZm9ybXVsYS13aWRnZXQnO1xuaW1wb3J0IHtBamZHcmFwaFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9ncmFwaC13aWRnZXQnO1xuaW1wb3J0IHtBamZIZWF0TWFwV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2hlYXQtbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH0gZnJvbSAnLi9wYWdlLWJyZWFrLXdpZGdldCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vdGV4dC13aWRnZXQnO1xuXG5jb25zdCBkZWZhdWx0V2lkZ2V0c0ZhY3RvcnkgPSAoKTogQWpmV2lkZ2V0Q29tcG9uZW50c01hcCA9PiB7XG4gIGNvbnN0IGRlZmF1bHRXaWRnZXRzOiBBamZXaWRnZXRDb21wb25lbnRzTWFwID0ge307XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkxheW91dF0gPSB7Y29tcG9uZW50OiBBamZMYXlvdXRXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5QYWdlQnJlYWtdID0ge2NvbXBvbmVudDogQWpmUGFnZUJyZWFrV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuSW1hZ2VdID0ge2NvbXBvbmVudDogQWpmSW1hZ2VXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5UZXh0XSA9IHtjb21wb25lbnQ6IEFqZlRleHRXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5DaGFydF0gPSB7Y29tcG9uZW50OiBBamZDaGFydFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlRhYmxlXSA9IHtjb21wb25lbnQ6IEFqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuRHluYW1pY1RhYmxlXSA9IHtjb21wb25lbnQ6IEFqZlRhYmxlV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuTWFwXSA9IHtjb21wb25lbnQ6IEFqZk1hcFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkNvbHVtbl0gPSB7Y29tcG9uZW50OiBBamZDb2x1bW5XaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5Gb3JtdWxhXSA9IHtjb21wb25lbnQ6IEFqZkZvcm11bGFXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5JbWFnZUNvbnRhaW5lcl0gPSB7Y29tcG9uZW50OiBBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkdyYXBoXSA9IHtjb21wb25lbnQ6IEFqZkdyYXBoV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuUGFnaW5hdGVkTGlzdF0gPSB7Y29tcG9uZW50OiBBamZQYWdpbmF0ZWRMaXN0V2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuUGFnaW5hdGVkVGFibGVdID0ge2NvbXBvbmVudDogQWpmUGFnaW5hdGVkVGFibGVXaWRnZXRDb21wb25lbnR9O1xuXG4gIGRlZmF1bHRXaWRnZXRzW3d0LkRpYWxvZ10gPSB7Y29tcG9uZW50OiBBamZEaWFsb2dXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5IZWF0TWFwXSA9IHtjb21wb25lbnQ6IEFqZkhlYXRNYXBXaWRnZXRDb21wb25lbnR9O1xuICByZXR1cm4gZGVmYXVsdFdpZGdldHM7XG59O1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBamZXaWRnZXRTZXJ2aWNlIGV4dGVuZHMgQ29yZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihkZWZhdWx0V2lkZ2V0c0ZhY3RvcnkoKSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXdpZGdldCcsXG4gIHRlbXBsYXRlVXJsOiAnd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnd2lkZ2V0LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydFdpZGdldCBleHRlbmRzIENvcmVDb21wb25lbnQge1xuICByZWFkb25seSB3aWRnZXRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuXG4gIGNvbnN0cnVjdG9yKHJlbmRlcmVyOiBSZW5kZXJlcjIsIHdpZGdldFNlcnZpY2U6IEFqZldpZGdldFNlcnZpY2UpIHtcbiAgICBzdXBlcihyZW5kZXJlcik7XG4gICAgdGhpcy53aWRnZXRzTWFwID0gd2lkZ2V0U2VydmljZS5jb21wb25lbnRzTWFwO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2NvbHVtbi13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb2x1bW4td2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNvbHVtbldpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmQ29sdW1uV2lkZ2V0SW5zdGFuY2U+IHtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdsYXlvdXQtd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbGF5b3V0LXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZMYXlvdXRXaWRnZXRDb21wb25lbnRcbiAgZXh0ZW5kcyBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZkxheW91dFdpZGdldEluc3RhbmNlPlxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWRcbntcbiAgcHJpdmF0ZSBfYWxsY29sdW1uc1JlbmRlcmVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGFsbGNvbHVtbnNSZW5kZXJlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzXG4gICAgLl9hbGxjb2x1bW5zUmVuZGVyZWQkIGFzIE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsY29sdW1uc1JlbmRlcmVkJC5uZXh0KHRydWUpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2RpYWxvZy13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkaWFsb2ctd2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkRpYWxvZ1dpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmRGlhbG9nV2lkZ2V0SW5zdGFuY2U+IHtcbiAgQFZpZXdDaGlsZCgnZGlhbG9nQ29udGVudCcsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIGRpYWxvZ0NvbnRlbnQhOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgc3VwZXIoY2RyLCBlbCk7XG4gIH1cblxuICBvcGVuRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuX2RpYWxvZy5vcGVuKHRoaXMuZGlhbG9nQ29udGVudCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdGVkLWxpc3Qtd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnaW5hdGVkLWxpc3Qtd2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2luYXRlZExpc3RXaWRnZXRDb21wb25lbnRcbiAgZXh0ZW5kcyBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZlBhZ2luYXRlZExpc3RXaWRnZXRJbnN0YW5jZT5cbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdFxue1xuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAwO1xuXG4gIGdldCBwYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlcztcbiAgfVxuICBwcml2YXRlIF9wYWdlcyA9IDA7XG5cbiAgZ2V0IGN1cnJlbnRDb250ZW50KCk6IEFqZldpZGdldEluc3RhbmNlW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udGVudDtcbiAgfVxuICBwcml2YXRlIF9jdXJyZW50Q29udGVudDogQWpmV2lkZ2V0SW5zdGFuY2VbXSA9IFtdO1xuXG4gIGdldCBjYW5Hb0ZvcndhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbkdvRm9yd2FyZDtcbiAgfVxuICBwcml2YXRlIF9jYW5Hb0ZvcndhcmQgPSBmYWxzZTtcblxuICBnZXQgY2FuR29CYWNrd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuR29CYWNrd2FyZDtcbiAgfVxuICBwcml2YXRlIF9jYW5Hb0JhY2t3YXJkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snaW5zdGFuY2UnXSkge1xuICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudENvbnRlbnQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDdXJyZW50Q29udGVudCgpO1xuICB9XG5cbiAgZ29Ub1BhZ2UoZGlyZWN0aW9uOiAnbmV4dCcgfCAncHJldmlvdXMnKTogdm9pZCB7XG4gICAgY29uc3QgZGlmZiA9IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gMSA6IC0xO1xuICAgIGNvbnN0IG5ld1BhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSArIGRpZmY7XG4gICAgaWYgKG5ld1BhZ2UgPD0gMCB8fCBuZXdQYWdlID4gdGhpcy5fcGFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBuZXdQYWdlO1xuICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IG5ld1BhZ2UgPCB0aGlzLl9wYWdlcztcbiAgICB0aGlzLl9jYW5Hb0JhY2t3YXJkID0gbmV3UGFnZSA+IDE7XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDdXJyZW50Q29udGVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW5Hb0JhY2t3YXJkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmluc3RhbmNlLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IDA7XG4gICAgICB0aGlzLl9wYWdlcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gMTtcbiAgICAgIGNvbnN0IHtjb250ZW50fSA9IHRoaXMuaW5zdGFuY2U7XG4gICAgICBjb25zdCB7cGFnZVNpemV9ID0gdGhpcy5pbnN0YW5jZS53aWRnZXQ7XG4gICAgICB0aGlzLl9wYWdlcyA9IE1hdGguY2VpbChjb250ZW50Lmxlbmd0aCAvIHBhZ2VTaXplKTtcbiAgICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IHRoaXMuX3BhZ2VzID4gMTtcbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF9maWxsQ3VycmVudENvbnRlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmluc3RhbmNlLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7Y29udGVudH0gPSB0aGlzLmluc3RhbmNlO1xuICAgIGNvbnN0IHtwYWdlU2l6ZX0gPSB0aGlzLmluc3RhbmNlLndpZGdldDtcbiAgICBjb25zdCBzdGFydCA9ICh0aGlzLl9jdXJyZW50UGFnZSAtIDEpICogcGFnZVNpemU7XG4gICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBjb250ZW50LnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdGVkLXRhYmxlLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2luYXRlZC10YWJsZS13aWRnZXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUGFnaW5hdGVkVGFibGVXaWRnZXRDb21wb25lbnRcbiAgZXh0ZW5kcyBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZlBhZ2luYXRlZFRhYmxlV2lkZ2V0SW5zdGFuY2U+XG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXRcbntcbiAgcmVhZG9ubHkgcGFnaW5hdG9yQ29uZmlnID0ge1xuICAgIHBhZ2VTaXplOiAxMCxcbiAgICBwYWdlU2l6ZU9wdGlvbnM6IFs1LCAxMCwgMTUsIDIwLCAyNSwgMzAsIDUwLCAxMDAsIDUwMF0sXG4gIH07XG5cbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlO1xuICB9XG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlID0gMDtcblxuICBnZXQgcGFnZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZXM7XG4gIH1cbiAgcHJpdmF0ZSBfcGFnZXMgPSAwO1xuXG4gIGdldCBvcmRlckJ5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29yZGVyQnk7XG4gIH1cbiAgcHJpdmF0ZSBfb3JkZXJCeSA9IDA7XG5cbiAgZ2V0IGN1cnJlbnRDb250ZW50KCk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udGVudDtcbiAgfVxuICBwcml2YXRlIF9jdXJyZW50Q29udGVudDogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBmdWxsIGRhdGEgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX2FsbERhdGFDb250ZW50OiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgLyoqXG4gICAqIGZ1bGwgc29ydGVkIGRhdGEgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZEFsbERhdGFDb250ZW50OiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgZ2V0IGhlYWRlckNvbnRlbnQoKTogQWpmVGFibGVDZWxsW10ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJDb250ZW50O1xuICB9XG4gIHByaXZhdGUgX2hlYWRlckNvbnRlbnQ6IEFqZlRhYmxlQ2VsbFtdID0gW107XG5cbiAgZ2V0IGNhbkdvRm9yd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuR29Gb3J3YXJkO1xuICB9XG4gIHByaXZhdGUgX2NhbkdvRm9yd2FyZCA9IGZhbHNlO1xuXG4gIGdldCBjYW5Hb0JhY2t3YXJkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jYW5Hb0JhY2t3YXJkO1xuICB9XG4gIHByaXZhdGUgX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIGRhdGEgZm9yIHRoZSB0YWJsZSBvbiBpbnN0YW5jZSBjaGFuZ2VzXG4gICAqIEBwYXJhbSBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2luc3RhbmNlJ10pIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5pbnN0YW5jZSAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplICYmXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplID4gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplID0gdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemU7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVDdXJyZW50Q29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaW5zdGFuY2UgIT0gbnVsbCAmJlxuICAgICAgdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemUgJiZcbiAgICAgIHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplID4gMFxuICAgICkge1xuICAgICAgdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemUgPSB0aGlzLmluc3RhbmNlLndpZGdldC5wYWdlU2l6ZTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQ3VycmVudENvbnRlbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHb3QgdG8gbmV4dCBvciBwcmV2aW91cyBwYWdlXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cbiAgICogQHJldHVybnNcbiAgICovXG4gIGdvVG9QYWdlKGRpcmVjdGlvbjogJ25leHQnIHwgJ3ByZXZpb3VzJyk6IHZvaWQge1xuICAgIGNvbnN0IGRpZmYgPSBkaXJlY3Rpb24gPT09ICduZXh0JyA/IDEgOiAtMTtcbiAgICBjb25zdCBuZXdQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgKyBkaWZmO1xuICAgIGlmIChuZXdQYWdlIDw9IDAgfHwgbmV3UGFnZSA+IHRoaXMuX3BhZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gbmV3UGFnZTtcbiAgICB0aGlzLl9jYW5Hb0ZvcndhcmQgPSBuZXdQYWdlIDwgdGhpcy5fcGFnZXM7XG4gICAgdGhpcy5fY2FuR29CYWNrd2FyZCA9IG5ld1BhZ2UgPiAxO1xuICAgIHRoaXMuX2ZpbGxDdXJyZW50Q29udGVudCgpO1xuICB9XG5cbiAgb25QYWdlU2l6ZUNoYW5nZShfcGFnZVNpemU6IG51bWJlcikge1xuICAgIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplID0gX3BhZ2VTaXplO1xuICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydCBhbGwgZGF0YSBmb3IgdGhlIHRhYmxlLCBub3Qgb25seSBjdXJyZW50IHBhZ2UgZGF0YVxuICAgKiBAcGFyYW0gc29ydFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc29ydFBhZ2luYXRlZERhdGEoc29ydDogU29ydCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9hbGxEYXRhQ29udGVudC5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAoIXNvcnQuYWN0aXZlIHx8IHNvcnQuZGlyZWN0aW9uID09PSAnJykge1xuICAgICAgICB0aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudCA9IHRoaXMuX2FsbERhdGFDb250ZW50LnNsaWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IHRoaXMuX2N1cnJlbnRQYWdlIDwgdGhpcy5fcGFnZXM7XG4gICAgICAgIHRoaXMuX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjb2x1bW5JZHggPSBwYXJzZUludChzb3J0LmFjdGl2ZS5zbGljZSgtMSkpIHx8IDA7XG4gICAgICAgIHRoaXMuX3NvcnRlZEFsbERhdGFDb250ZW50ID0gdGhpcy5fYWxsRGF0YUNvbnRlbnQuc2xpY2UoKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNBc2MgPSBzb3J0LmRpcmVjdGlvbiA9PT0gJ2FzYyc7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBhcmUoYVtjb2x1bW5JZHhdLCBiW2NvbHVtbklkeF0sIGlzQXNjKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9maWxsQ3VycmVudENvbnRlbnQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb21wYXJlKGE6IEFqZlRhYmxlQ2VsbCwgYjogQWpmVGFibGVDZWxsLCBpc0FzYzogYm9vbGVhbikge1xuICAgIHJldHVybiAoYS52YWx1ZSA8IGIudmFsdWUgPyAtMSA6IDEpICogKGlzQXNjID8gMSA6IC0xKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgY3VycmVudCBoZWFkZXIgYW5kIGRhdGEgZm9yIHRoZSB0YWJsZSwgc3RhcnRpbmcgZnJvbSBwYWdlIDFcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZUN1cnJlbnRDb250ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8IHRoaXMuaW5zdGFuY2UuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gMDtcbiAgICAgIHRoaXMuX3BhZ2VzID0gMDtcbiAgICAgIHRoaXMuX2hlYWRlckNvbnRlbnQgPSBbXTtcbiAgICAgIHRoaXMuX2N1cnJlbnRDb250ZW50ID0gW107XG4gICAgICB0aGlzLl9hbGxEYXRhQ29udGVudCA9IFtdO1xuICAgICAgdGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnQgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhZGVyQ29udGVudCA9IHRoaXMuaW5zdGFuY2UuZGF0YVswXTtcbiAgICAgIHRoaXMuX2FsbERhdGFDb250ZW50ID0gdGhpcy5pbnN0YW5jZS5kYXRhLnNsaWNlKDEpO1xuICAgICAgdGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnQgPSBbLi4udGhpcy5fYWxsRGF0YUNvbnRlbnRdO1xuICAgICAgdGhpcy5fY3VycmVudFBhZ2UgPSAxO1xuXG4gICAgICB0aGlzLl9wYWdlcyA9IE1hdGguY2VpbCh0aGlzLl9hbGxEYXRhQ29udGVudC5sZW5ndGggLyB0aGlzLnBhZ2luYXRvckNvbmZpZy5wYWdlU2l6ZSk7XG4gICAgICB0aGlzLl9jYW5Hb0ZvcndhcmQgPSB0aGlzLl9wYWdlcyA+IDE7XG4gICAgfVxuICAgIHRoaXMuX2ZpbGxDdXJyZW50Q29udGVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBjdXJyZW50IGRhdGEgZm9yIHRoZSB0YWJsZSwgdXNpbmcgcGFnZSBhbmQgc29ydGVkIGRhdGFcbiAgICovXG4gIHByaXZhdGUgX2ZpbGxDdXJyZW50Q29udGVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnQubGVuZ3RoID09PSAwICYmIHRoaXMuX2hlYWRlckNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBbdGhpcy5faGVhZGVyQ29udGVudF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gKHRoaXMuX2N1cnJlbnRQYWdlIC0gMSkgKiB0aGlzLnBhZ2luYXRvckNvbmZpZy5wYWdlU2l6ZTtcbiAgICAgIHRoaXMuX2N1cnJlbnRDb250ZW50ID0gW1xuICAgICAgICB0aGlzLl9oZWFkZXJDb250ZW50LFxuICAgICAgICAuLi50aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudC5zbGljZShzdGFydCwgc3RhcnQgKyB0aGlzLnBhZ2luYXRvckNvbmZpZy5wYWdlU2l6ZSksXG4gICAgICBdO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsIjxhamYtZmlsdGVyLXdpZGdldFxuICAqbmdJZj1cImluc3RhbmNlICYmIGluc3RhbmNlLmZpbHRlclwiXG4gIFtpbnN0YW5jZV09XCJpbnN0YW5jZVwiXG4gIChmaWx0ZXJlZEluc3RhbmNlKT1cImluc3RhbmNlID0gJGV2ZW50XCJcbj5cbjwvYWpmLWZpbHRlci13aWRnZXQ+XG48bmctdGVtcGxhdGUgYWpmLXdpZGdldC1ob3N0PjwvbmctdGVtcGxhdGU+XG4iLCI8ZGl2ICpuZ0lmPVwiaW5zdGFuY2VcIiBjbGFzcz1cImFqZi1jb2x1bW4tY29udGFpbmVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHcgb2YgaW5zdGFuY2UuY29udGVudFwiPlxuICAgIDxhamYtd2lkZ2V0IFtpbnN0YW5jZV09XCJ3XCI+XG4gICAgPC9hamYtd2lkZ2V0PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIiwiPGRpdiAqbmdJZj1cImluc3RhbmNlXCIgY2xhc3M9XCJhamYtY29sdW1uc1wiPlxuICA8ZGl2XG4gICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGluc3RhbmNlLndpZGdldC5jb2x1bW5zOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgW25nU3R5bGVdPVwieydmbGV4LWdyb3cnOiBjb2x1bW4gPiAtMSA/IDEgOiBudWxsLCAnZmxleC1iYXNpcycgOiBjb2x1bW4gPiAtMSA/IChjb2x1bW4gKiAxMDApICsgJyUnIDogbnVsbH1cIlxuICAgICAgY2xhc3M9XCJhamYtY29sdW1uXCJcbiAgPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWxsY29sdW1uc1JlbmRlcmVkJHxhc3luY1wiPlxuICAgIDxhamYtd2lkZ2V0ICpuZ0lmPVwiKGluc3RhbmNlfGFqZkdldENvbHVtbkNvbnRlbnQ6aWR4KSBhcyBjY1wiIFtpbnN0YW5jZV09XCJjYyFcIj5cbiAgICA8L2FqZi13aWRnZXQ+XG4gIDwvbmctY29udGFpbmVyPlxuIDwvZGl2PlxuPC9kaXY+XG4iLCI8YSAqbmdJZj1cImluc3RhbmNlXCIgY2xhc3M9XCJhamYtZGlhbG9nLXRvZ2dsZVwiIChjbGljayk9XCJvcGVuRGlhbG9nKClcIj5cbiAgPGFqZi13aWRnZXQgW2luc3RhbmNlXT1cImluc3RhbmNlLnRvZ2dsZVwiPjwvYWpmLXdpZGdldD5cbjwvYT5cbjxuZy10ZW1wbGF0ZSAjZGlhbG9nQ29udGVudD5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImluc3RhbmNlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpbnN0YW5jZS5jb250ZW50XCI+XG4gICAgICA8YWpmLXdpZGdldCBbaW5zdGFuY2VdPVwiaXRlbVwiPjwvYWpmLXdpZGdldD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuIiwiPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdFwiICpuZ0lmPVwiaW5zdGFuY2UgJiYgcGFnZXMgPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtdGl0bGUtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC10aXRsZVwiPnt7IGluc3RhbmNlLndpZGdldC50aXRsZSB9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhamYtc3BhY2VyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC1wYWdpbmF0b3JcIj5cbiAgICAgIDxhIChjbGljayk9XCJnb1RvUGFnZSgncHJldmlvdXMnKVwiIGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LWJ0biBhamYtcGFnaW5hdGVkLWxpc3QtYmFjay1idG5cIlxuICAgICAgICAgIFtjbGFzcy5hamYtcGFnaW5hdGVkLWxpc3QtYnRuLWRpc2FibGVkXT1cImNhbkdvQmFja3dhcmQgPT09IGZhbHNlXCI+PC9hPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC1wYWdpbmF0b3ItcGFnZVwiPnt7IGN1cnJlbnRQYWdlIH19PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LXBhZ2luYXRvci1zZXBhcmF0b3JcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtcGFnaW5hdG9yLXBhZ2VzXCI+e3sgcGFnZXMgfX08L2Rpdj5cbiAgICAgIDxhIChjbGljayk9XCJnb1RvUGFnZSgnbmV4dCcpXCIgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtYnRuIGFqZi1wYWdpbmF0ZWQtbGlzdC1mb3J3YXJkLWJ0blwiXG4gICAgICAgIFtjbGFzcy5hamYtcGFnaW5hdGVkLWxpc3QtYnRuLWRpc2FibGVkXT1cImNhbkdvRm9yd2FyZCA9PT0gZmFsc2VcIj48L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjdXJyZW50Q29udGVudFwiPlxuICAgIDxhamYtd2lkZ2V0IFtpbnN0YW5jZV09XCJpdGVtXCI+PC9hamYtd2lkZ2V0PlxuICA8L2Rpdj5cbjwvZGl2PlxuIiwiPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGVcIiAqbmdJZj1cImluc3RhbmNlXCI+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLXRpdGxlLWNvbnRhaW5lclwiICpuZ0lmPVwicGFnZXMgPiAwXCI+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnZS1zZWxlY3RvclwiPlxuICAgICAgPG1hdC1sYWJlbCBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnZS1zZWxlY3Rvci1sYWJlbFwiXG4gICAgICAgID57eydJdGVtcyBwZXIgcGFnZTonfHRyYW5zbG9jb319PC9tYXQtbGFiZWxcbiAgICAgID5cbiAgICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIFt2YWx1ZV09XCJwYWdpbmF0b3JDb25maWcucGFnZVNpemVcIlxuICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cIm9uUGFnZVNpemVDaGFuZ2UoJGV2ZW50LnZhbHVlKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgW3ZhbHVlXT1cInBhZ2VTaXplT3B0XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcGFnZVNpemVPcHQgb2YgcGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBwYWdlU2l6ZU9wdCB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1zcGFjZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdpbmF0b3JcIj5cbiAgICAgIDxhXG4gICAgICAgIChjbGljayk9XCJnb1RvUGFnZSgncHJldmlvdXMnKVwiXG4gICAgICAgIGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1idG4gYWpmLXBhZ2luYXRlZC10YWJsZS1iYWNrLWJ0blwiXG4gICAgICAgIFtjbGFzcy5hamYtcGFnaW5hdGVkLXRhYmxlLWJ0bi1kaXNhYmxlZF09XCJjYW5Hb0JhY2t3YXJkID09PSBmYWxzZVwiXG4gICAgICA+PC9hPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnaW5hdG9yLXBhZ2VcIj57eyBjdXJyZW50UGFnZSB9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnaW5hdG9yLXNlcGFyYXRvclwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnaW5hdG9yLXBhZ2VzXCI+e3sgcGFnZXMgfX08L2Rpdj5cbiAgICAgIDxhXG4gICAgICAgIChjbGljayk9XCJnb1RvUGFnZSgnbmV4dCcpXCJcbiAgICAgICAgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLWJ0biBhamYtcGFnaW5hdGVkLXRhYmxlLWZvcndhcmQtYnRuXCJcbiAgICAgICAgW2NsYXNzLmFqZi1wYWdpbmF0ZWQtdGFibGUtYnRuLWRpc2FibGVkXT1cImNhbkdvRm9yd2FyZCA9PT0gZmFsc2VcIlxuICAgICAgPjwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLWl0ZW1cIj5cbiAgICA8YWpmLXdpZGdldC1leHBvcnRcbiAgICAgICpuZ0lmPVwiaW5zdGFuY2VcIlxuICAgICAgW3dpZGdldFR5cGVdPVwiaW5zdGFuY2Uud2lkZ2V0VHlwZVwiXG4gICAgICBbZGF0YV09XCJjdXJyZW50Q29udGVudFwiXG4gICAgICBbZW5hYmxlXT1cImluc3RhbmNlLmV4cG9ydGFibGVcIlxuICAgID5cbiAgICAgIDxhamYtdGFibGUgW2RhdGFdPVwiY3VycmVudENvbnRlbnRcIiAoc29ydFNlbGVjdGVkKT1cInNvcnRQYWdpbmF0ZWREYXRhKCRldmVudClcIj48L2FqZi10YWJsZT5cbiAgICA8L2FqZi13aWRnZXQtZXhwb3J0PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19