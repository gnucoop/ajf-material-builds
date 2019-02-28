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
import { CommonModule } from '@angular/common';
import { InjectionToken, EventEmitter, Injectable, Optional, Inject, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef, Pipe, Output, forwardRef, ElementRef, Renderer2, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfMapModule } from '@ajf/core/map';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';
import { AjfMonacoEditor, AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { Subject, BehaviorSubject, Subscription, timer } from 'rxjs';
import { AjfReportLayoutWidget, AjfReport, AjfReportContainer, AjfAggregation, AjfReportColumnWidget, AjfReportWidget, AjfReportWidgetType, AjfAggregationType, AjfChartType } from '@ajf/core/reports';
import { startWith, share, scan, filter, publishReplay, refCount, map, combineLatest, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { AjfFormula, AjfCondition, AjfValidatedProperty } from '@ajf/core/models';
import { AjfNodeGroup, AjfSlide, AjfRepeatingSlide, AjfStringField, flattenNodes, AjfFieldType, AjfValidationService, AjfForm } from '@ajf/core/forms';
import { deepCopy, sizedEnumToStringArray } from '@ajf/core/utils';
import { AjfImageType } from '@ajf/core/image';
import Quill from 'quill';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AJF_REPORTS_CONFIG = new InjectionToken('AJF_REPORTS_CONFIG');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service contains all the logic to model the report widget.
 *
 * @export
 */
class AjfReportBuilderService {
    /**
     * Creates an instance of AjfReportBuilderService.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} reportsConfig
     */
    constructor(reportsConfig) {
        this._customWidgetsUpdate = new Subject();
        this._originUpdate = new Subject();
        this._savedReportUpdate = new Subject();
        this._jsonStack = new BehaviorSubject([]);
        this._emptyContent = new BehaviorSubject(true);
        this._onDraggedUpdate = new Subject();
        this._onOverUpdate = new Subject();
        this._fixedZoomUpdate = new Subject();
        this._onDragEnterUpdate = new Subject();
        this._headerWidgetsUpdate = new Subject();
        this._contentWidgetsUpdate = new Subject();
        this._footerWidgetsUpdate = new Subject();
        this._colorUpdate = new Subject();
        this._defaultColor = [
            'rgba(0, 0, 0, 1)', 'rgba(51, 153, 255, 1)', 'rgba(153, 204, 0, 1)', 'rgba(255, 102, 0, 1)',
            'rgba(0, 204, 204, 1)', 'rgba(204, 204, 153, 1)', 'rgba(255, 153, 0, 1)', 'rgba(230, 0, 0, 1)',
            'rgba(255, 153, 0, 1)', 'rgba(255, 255, 0, 1)', 'rgba(0, 138, 0, 1)', 'rgba(0, 102, 204, 1)',
            'rgba(153, 51, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(250, 204, 204, 1)',
            'rgba(255, 235, 204, 1)', 'rgba(255, 255, 204, 1)', 'rgba(204, 232, 204, 1)',
            'rgba(204, 224, 245, 1)', 'rgba(235, 214, 255, 1)', 'rgba(187, 187, 187, 1)',
            'rgba(240, 102, 102, 1)', 'rgba(255, 194, 102, 1)', 'rgba(255, 255, 102, 1)',
            'rgba(102, 185, 102, 1)', 'rgba(102, 163, 224, 1)', 'rgba(194, 133, 255, 1)',
            'rgba(136, 136, 136, 1)', 'rgba(161, 0, 0, 1)', 'rgba(178, 107, 0, 1)',
            'rgba(178, 178, 0, 1)', 'rgba(0, 97, 0, 1)', 'rgba(0, 71, 178, 1)',
            'rgba(107, 36, 178, 1)', 'rgba(68, 68, 68, 1)', 'rgba(92, 0, 0, 1)', 'rgba(102, 61, 0, 1)',
            'rgba(102, 102, 0, 1)', 'rgba(0, 55, 0, 1)', 'rgba(0, 41, 102, 1)', 'rgba(61, 20, 102, 1)'
        ];
        this._currentWidgetUpdate = new BehaviorSubject(null);
        this._formsVariablesUpdate = new BehaviorSubject(null);
        this._conditionNamesUpdate = new BehaviorSubject(null);
        /**
         * this BehaviorSubject update export report.
         *
         * \@memberOf AjfReportBuilderService
         */
        this._saveReport = new BehaviorSubject(null);
        /**
         * this BehaviorSubject contains the AjfReport.
         *
         * \@memberOf AjfReportBuilderService
         */
        this._report = new BehaviorSubject(null);
        this._reportStylesUpdate = new Subject();
        this._reportFormsUpdate = new Subject();
        /**
         * dictionary for  widgetsUpdate
         *
         * \@memberOf AjfReportBuilderService
         */
        this._updates = {
            header: this._headerWidgetsUpdate,
            content: this._contentWidgetsUpdate,
            footer: this._footerWidgetsUpdate,
            color: this._colorUpdate,
            customWidgets: this._customWidgetsUpdate
        };
        /**
         * event emitter that notify when wont to save report
         *
         * \@memberOf AjfReportBuilderService
         */
        this._saveReportEvent = new EventEmitter();
        this._saveFormulaTOHtml = new EventEmitter();
        /**
         * event emitter that notify when column width changed
         *
         * \@memberOf AjfReportBuilderService
         */
        this.columnWidthChangedEmitter = new EventEmitter();
        this._iconSets = {
            'ajf-icon': []
        };
        this._lastDeletedJson = '';
        if (reportsConfig != null) {
            if (reportsConfig.icons != null) {
                this._iconSets = Object.assign({}, this._iconSets, reportsConfig.icons);
            }
        }
        this._origin = ((/** @type {?} */ (this._originUpdate))).pipe(startWith('header'), share());
        this._savedReport = ((/** @type {?} */ (this._savedReportUpdate))).pipe(share());
        this._onDragged = ((/** @type {?} */ (this._onDraggedUpdate))).pipe(startWith(false), share());
        this._onOver = ((/** @type {?} */ (this._onOverUpdate))).pipe(startWith(false), share());
        this._fixedZoom = ((/** @type {?} */ (this._fixedZoomUpdate))).pipe(startWith(false), share());
        this._onDragEnter = this._onDragEnterUpdate.pipe(share());
        this._reportStyles = ((/** @type {?} */ (this._reportStylesUpdate))).pipe(scan((/**
         * @param {?} styles
         * @param {?} op
         * @return {?}
         */
        (styles, op) => {
            return op(styles);
        }), (/** @type {?} */ ({}))), share(), startWith((/** @type {?} */ ({}))));
        this._reportForms = ((/** @type {?} */ (this._reportFormsUpdate))).pipe(scan((/**
         * @param {?} forms
         * @param {?} op
         * @return {?}
         */
        (forms, op) => {
            return op(forms);
        }), []), share(), startWith([]));
        this._customWidgets = ((/** @type {?} */ (this._customWidgetsUpdate)))
            .pipe(scan((/**
         * @param {?} widgets
         * @param {?} op
         * @return {?}
         */
        (widgets, op) => {
            return op(widgets);
        }), []), share(), startWith([]));
        this._formsVariables = ((/** @type {?} */ (this._formsVariablesUpdate)))
            .pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s != null)), scan((/**
         * @param {?} variables
         * @param {?} op
         * @return {?}
         */
        (variables, op) => {
            return op(variables);
        }), []), publishReplay(1), refCount());
        this._conditionNames = ((/** @type {?} */ (this._conditionNamesUpdate)))
            .pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s != null)), scan((/**
         * @param {?} variables
         * @param {?} op
         * @return {?}
         */
        (variables, op) => {
            return op(variables);
        }), []), share(), startWith([]));
        this._headerWidgets = ((/** @type {?} */ (this._headerWidgetsUpdate))).pipe(scan((/**
         * @param {?} widgets
         * @param {?} op
         * @return {?}
         */
        (widgets, op) => {
            return op(widgets);
        }), (/** @type {?} */ ({ widgets: [], styles: {} }))), startWith((/** @type {?} */ ({ widgets: [], styles: {} }))), publishReplay(1), refCount());
        this._headerStyles = this._headerWidgets.pipe(map((/**
         * @param {?} widgets
         * @return {?}
         */
        (widgets) => {
            return widgets != null ? widgets.styles : {};
        })));
        this._contentWidgets = ((/** @type {?} */ (this._contentWidgetsUpdate)))
            .pipe(scan((/**
         * @param {?} widgets
         * @param {?} op
         * @return {?}
         */
        (widgets, op) => {
            return op(widgets);
        }), (/** @type {?} */ ({ widgets: [], styles: {} }))), startWith((/** @type {?} */ ({ widgets: [], styles: {} }))), publishReplay(1), refCount());
        this._contentStyles = this._contentWidgets.pipe(map((/**
         * @param {?} widgets
         * @return {?}
         */
        (widgets) => {
            return widgets != null ? widgets.styles : {};
        })));
        this._footerWidgets = ((/** @type {?} */ (this._footerWidgetsUpdate))).pipe(scan((/**
         * @param {?} widgets
         * @param {?} op
         * @return {?}
         */
        (widgets, op) => {
            return op(widgets);
        }), (/** @type {?} */ ({ widgets: [], styles: {} }))), startWith((/** @type {?} */ ({ widgets: [], styles: {} }))), publishReplay(1), refCount());
        this._footerStyles = this._footerWidgets.pipe(map((/**
         * @param {?} widgets
         * @return {?}
         */
        (widgets) => {
            return widgets != null ? widgets.styles : {};
        })));
        this._color = ((/** @type {?} */ (this._colorUpdate))).pipe(scan((/**
         * @param {?} color
         * @param {?} op
         * @return {?}
         */
        (color, op) => {
            return op(color);
        }), this._defaultColor), share(), startWith(this._defaultColor));
        this._currentWidget = ((/** @type {?} */ (this._currentWidgetUpdate))).pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s != null)), scan((/**
         * @param {?} widget
         * @param {?} op
         * @return {?}
         */
        (widget, op) => {
            return op(widget);
        }), undefined), publishReplay(1), refCount());
        this._reportForms.pipe(filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.length != 0)), map((/**
         * @param {?} forms
         * @return {?}
         */
        (forms) => {
            return (/**
             * @param {?} _c
             * @return {?}
             */
            (_c) => {
                return this.fillFormsVariables(forms);
            });
        }))).subscribe(this._formsVariablesUpdate);
        this._reportForms.pipe(filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.length != 0)), map((/**
         * @param {?} forms
         * @return {?}
         */
        (forms) => {
            return (/**
             * @param {?} _c
             * @return {?}
             */
            (_c) => {
                return this.fillFormsVariables(forms);
            });
        }))).subscribe(this._conditionNamesUpdate);
        /** @type {?} */
        const reportObs = this._report;
        reportObs.pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            return (/**
             * @param {?} _colors
             * @return {?}
             */
            (_colors) => {
                /** @type {?} */
                let tempColors = this._defaultColor;
                if (r == null) {
                    return [];
                }
                else {
                    this.parseColor(r.styles, tempColors);
                    this.parseColor(r.content.styles, tempColors);
                    this.parseColor(r.footer.styles, tempColors);
                    this.parseColor(r.header.styles, tempColors);
                    for (let i = 0; i < r.header.content.length; i++) {
                        /** @type {?} */
                        let obj = r.header.content[i];
                        this.parseColor(obj.styles, tempColors);
                        if (obj instanceof AjfReportLayoutWidget) {
                            /** @type {?} */
                            let layoutObj = (/** @type {?} */ (obj));
                            for (let j = 0; j < layoutObj.content.length; j++) {
                                /** @type {?} */
                                let columnObj = (/** @type {?} */ (layoutObj.content[j]));
                                this.parseColor(columnObj.styles, tempColors);
                                for (let z = 0; z < columnObj.content.length; z++) {
                                    /** @type {?} */
                                    let widgetObj = columnObj.content[z];
                                    this.parseColor(widgetObj.styles, tempColors);
                                }
                            }
                        }
                    }
                }
                return (/** @type {?} */ (tempColors));
            });
        }))).subscribe(this._colorUpdate);
        reportObs.pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            return (/**
             * @param {?} _styles
             * @return {?}
             */
            (_styles) => {
                if (r == null || r.styles == null) {
                    return (/** @type {?} */ ({}));
                }
                else {
                    return (/** @type {?} */ (r.styles));
                }
            });
        }))).subscribe(this._reportStylesUpdate);
        reportObs.pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            return (/**
             * @param {?} _widgets
             * @return {?}
             */
            (_widgets) => {
                if (r == null || r.header == null) {
                    return (/** @type {?} */ ({ widgets: [], styles: {} }));
                }
                else {
                    return (/** @type {?} */ ({
                        widgets: r.header.content || [],
                        styles: r.header.styles || {}
                    }));
                }
            });
        }))).subscribe(this._headerWidgetsUpdate);
        reportObs.pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            return (/**
             * @param {?} _widgets
             * @return {?}
             */
            (_widgets) => {
                if (r == null || r.content == null) {
                    return (/** @type {?} */ ({ widgets: [], styles: {} }));
                }
                else {
                    return (/** @type {?} */ ({
                        widgets: r.content.content || [],
                        styles: r.content.styles || {}
                    }));
                }
            });
        }))).subscribe(this._contentWidgetsUpdate);
        reportObs.pipe(map((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            return (/**
             * @param {?} _widgets
             * @return {?}
             */
            (_widgets) => {
                if (r == null || r.footer == null) {
                    return (/** @type {?} */ ({ widgets: [], styles: {} }));
                }
                else {
                    return (/** @type {?} */ ({
                        widgets: r.footer.content || [],
                        styles: r.footer.styles || {}
                    }));
                }
            });
        }))).subscribe(this._footerWidgetsUpdate);
        this._saveReport.pipe(map((/**
         * @param {?} json
         * @return {?}
         */
        (json) => {
            return (/**
             * @param {?} _r
             * @return {?}
             */
            (_r) => {
                if (json = null) {
                    return {};
                }
                return json;
            });
        })));
        this._saveReportEvent.pipe(combineLatest(this.report, this.reportForms), combineLatest(this._headerWidgets.pipe(filter((/**
         * @param {?} w
         * @return {?}
         */
        w => w != null))), this._contentWidgets.pipe(filter((/**
         * @param {?} w
         * @return {?}
         */
        w => w != null))), this._footerWidgets.pipe(filter((/**
         * @param {?} w
         * @return {?}
         */
        w => w != null))), this._reportStyles.pipe(filter((/**
         * @param {?} w
         * @return {?}
         */
        w => w != null))))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            let obj = {};
            /** @type {?} */
            const curRo = r[0][1];
            /** @type {?} */
            const forms = r[0][2] != null ? r[0][2] || [] : (curRo != null ? curRo.forms || [] : []);
            obj['header'] = { content: r[1].widgets.map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => w.toJson())), styles: r[1].styles };
            obj['content'] = { content: r[2].widgets.map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => w.toJson())), styles: r[2].styles };
            obj['footer'] = { content: r[3].widgets.map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => w.toJson())), styles: r[3].styles };
            obj['styles'] = r[4];
            /** @type {?} */
            const ro = new AjfReport(forms, {
                header: new AjfReportContainer({
                    content: r[1].widgets,
                    styles: r[1].styles
                }),
                content: new AjfReportContainer({
                    content: r[2].widgets,
                    styles: r[2].styles
                }),
                footer: new AjfReportContainer({
                    content: r[3].widgets,
                    styles: r[3].styles
                }),
                styles: r[4]
            });
            this.setSaveReport(obj);
            this._savedReportUpdate.next(ro);
            this.pushJsonStack(JSON.stringify(obj));
        }));
    }
    /**
     * @return {?}
     */
    getFormulaToHtmlEvent() {
        return this._saveFormulaTOHtml.asObservable();
    }
    /**
     * @return {?}
     */
    get iconSets() { return this._iconSets; }
    /**
       *
       *  functions
       *
       */
    /**
     * utils:
     * remove AjfNodeGroup, AjfSlide, AjfRepeatingSlide, AjfStringField from ajfnode array
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} nodes
     *
     * @return {?}
     */
    filterNodes(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] instanceof AjfNodeGroup ||
                nodes[i] instanceof AjfSlide ||
                nodes[i] instanceof AjfRepeatingSlide ||
                nodes[i] instanceof AjfStringField) {
                nodes.splice(i, 1);
                i--;
            }
        }
        return nodes;
    }
    /**
     * @param {?} cssStyles
     * @param {?} colors
     * @return {?}
     */
    parseColor(cssStyles, colors) {
        /** @type {?} */
        const styleKeys = ['background-color', 'backgroundColor', 'color'];
        styleKeys.forEach((/**
         * @param {?} k
         * @return {?}
         */
        (k) => {
            if (cssStyles[k] &&
                colors.indexOf(cssStyles[k]) == -1) {
                colors.push(cssStyles[k]);
            }
        }));
    }
    /**
     * @param {?} forms
     * @return {?}
     */
    fillFormsVariables(forms) {
        /** @type {?} */
        let variables = [];
        for (let i = 0; i < forms.length; i++) {
            variables[i] = { nodes: [], labels: [], names: [], types: [] };
            if (forms[i].nodes != null && forms[i].nodes.length > 0) {
                variables[i].nodes = this.filterNodes(flattenNodes(forms[i].nodes));
            }
            variables[i].labels = this.extractLabelsNodes(variables[i].nodes);
            variables[i].names = this.extractNamesNodes(variables[i].nodes);
            variables[i].types = this.extractTypesNodes(variables[i].nodes);
        }
        return variables;
    }
    /**
     * utils:
     *  the obj returned contains the label field of ajfNode
     * \@memberOf AjfReportBuilderService
     * @param {?} nodes
     *
     * @return {?}
     */
    extractLabelsNodes(nodes) {
        /** @type {?} */
        let obj = [];
        for (let i = 0; i < nodes.length; i++) {
            obj.push(nodes[i].label);
        }
        return obj;
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    extractNamesNodes(nodes) {
        /** @type {?} */
        let obj = [];
        for (let i = 0; i < nodes.length; i++) {
            obj.push(nodes[i].name);
        }
        return obj;
    }
    /**
     * @param {?} nodes
     * @return {?}
     */
    extractTypesNodes(nodes) {
        /** @type {?} */
        let obj = [];
        for (let i = 0; i < nodes.length; i++) {
            /** @type {?} */
            let p = (/** @type {?} */ (nodes[i]));
            obj.push(p.fieldType);
        }
        return obj;
    }
    /**
     * @param {?} origin
     * @return {?}
     */
    setOrigin(origin) {
        this._originUpdate.next(origin);
    }
    /**
     * utils:
     * This method round the value to the decimal position
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} value
     * @param {?} decimalPositions
     * @return {?}
     */
    roundTo(value, decimalPositions) {
        /** @type {?} */
        let i = value * Math.pow(10, decimalPositions);
        i = Math.floor(i);
        return i / Math.pow(10, decimalPositions);
    }
    /**
     * utils:
     * This validator check if the value is a number.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} value
     *
     * @return {?}
     */
    isNumber(value) {
        return /^\d+(\.\d+)?/.test(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isNumberArray(value) {
        value.forEach((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            if (!this.isNumber(v)) {
                return false;
            }
        }));
        return true;
    }
    /**
     * get _onDragged Observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get onDragged() {
        return this._onDragged;
    }
    /**
     * get _onOver Observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get onOver() {
        return this._onOver;
    }
    /**
     * get _fixedZoom Observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get fixedZoom() {
        return this._fixedZoom;
    }
    /**
     *  change status of _fixedZoom in true
     *
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    fixedZoomIn() {
        this._fixedZoomUpdate.next(true);
    }
    /**
     *  change status of _fixedZoom in false
     *
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    fixedZoomOut() {
        this._fixedZoomUpdate.next(false);
    }
    /**
     * get _onDragEnter observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get onDragEnter() {
        return this._onDragEnter;
    }
    /**
     *  update _onDragEnter with  section(header,content,footer) and index
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    dragEnter(array, index) {
        this._onDragEnterUpdate.next({ array, index });
    }
    /**
     *  update _ondragged with true
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    dragStarted() {
        this._onDraggedUpdate.next(true);
    }
    /**
     *  update _onDragged with false
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    dragEnded() {
        this._onDraggedUpdate.next(false);
    }
    /**
     *  update _onOver with true
     *
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    overStarted() {
        this._onOverUpdate.next(true);
    }
    /**
     * update _onOver with false
     *
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    overEnded() {
        this._onOverUpdate.next(false);
    }
    /**
     *
     *  update _onDragged with false
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    dragLeave() {
        this._onDragEnterUpdate.next({});
    }
    /**
     * Get the report
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get report() {
        return this._report.asObservable();
    }
    /**
     * emit save report event
     *
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    saveReport() {
        if (this._saveReportEvent != null) {
            this._saveReportEvent.emit();
        }
    }
    /**
     * @param {?} formula
     * @return {?}
     */
    saveImageFormula(formula) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return widget;
            }
            /** @type {?} */
            const w = (/** @type {?} */ (widget));
            w.flag = formula;
            w.icon = formula;
            return w;
        }));
    }
    /**
     * @param {?} htmlFormula
     * @param {?} reference
     * @return {?}
     */
    saveFormulaToHtml(htmlFormula, reference) {
        if (this._saveFormulaTOHtml != null) {
            /** @type {?} */
            const obj = {
                'formula': htmlFormula,
                'reference': reference
            };
            this._saveFormulaTOHtml.emit(obj);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    setEmptyContent(val) {
        this._emptyContent.next(val);
    }
    /**
     * @param {?} json
     * @return {?}
     */
    pushJsonStack(json) {
        /** @type {?} */
        let currentStack = this._jsonStack.getValue();
        if (currentStack.indexOf(json) === -1 && json !== this._lastDeletedJson) {
            currentStack.push(json);
        }
        this._jsonStack.next(currentStack);
    }
    /**
     * @return {?}
     */
    popJsonStack() {
        /** @type {?} */
        let emptyJson = '{"header":{"content":[],"styles":{}},' +
            '"content":{"content":[],"styles":{}},"' +
            'footer":{"content":[],"styles":{}},"styles":{}}';
        /** @type {?} */
        let currentStack = this._jsonStack.getValue();
        currentStack.pop();
        this._lastDeletedJson = currentStack.pop();
        if (currentStack.length <= 0) {
            this._lastDeletedJson = '';
            this._jsonStack.next([]);
            this.updateCurrentWidget(null);
            this.setEmptyContent(true);
            return emptyJson;
        }
        this._jsonStack.next(currentStack);
        return this._lastDeletedJson;
    }
    /**
     * get the emitter
     *
     * \@readonly
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get columnWidthChanged() {
        return this.columnWidthChangedEmitter;
    }
    /**
     * get _customWidgets Observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get customWidgets() {
        return this._customWidgets;
    }
    /**
     * Get the header widget
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get headerWidgets() {
        return this._headerWidgets;
    }
    /**
     * Get the header styles
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get headerStyles() {
        return this._headerStyles;
    }
    /**
     * Get the Content widget
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get contentWidgets() {
        return this._contentWidgets;
    }
    /**
     * Get the content styles
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get contentStyles() {
        return this._contentStyles;
    }
    /**
     * Get the footer widget
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get footerWidgets() {
        return this._footerWidgets;
    }
    /**
     * Get the footer styles
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get footerStyles() {
        return this._footerStyles;
    }
    /**
     * Get the colors of report
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get colors() {
        return this._color;
    }
    /**
     * @return {?}
     */
    get emptyContent() {
        return (/** @type {?} */ (this._emptyContent));
    }
    /**
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} type
     * @param {?} newWidget
     *
     * @return {?}
     */
    updateArrayWidgets(type, newWidget) {
        if ((type !== 'header') && (type !== 'content') && (type !== 'footer')) {
            throw new Error('Unknown type ' + type);
        }
        this._updates[type].next((/**
         * @param {?} _widgets
         * @return {?}
         */
        (_widgets) => {
            return newWidget;
        }));
    }
    /**
     * get _formsVariables Observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get formsVariables() {
        return this._formsVariables;
    }
    /**
     * @return {?}
     */
    get conditionNames() {
        return this._conditionNames;
    }
    /**
     * Get the current widget
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get currentWidget() {
        return this._currentWidget;
    }
    /**
     * This method Update _currentWidgetUpdate with newWidget.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} newWidget
     *
     * @return {?}
     */
    updateCurrentWidget(newWidget) {
        this._currentWidgetUpdate.next((/**
         * @param {?} _widget
         * @return {?}
         */
        (_widget) => {
            this._saveReportEvent.emit();
            return newWidget;
        }));
    }
    /**
     * Get the report
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get getSaveReport() {
        return this._saveReport.asObservable();
    }
    /**
     * get _jsonSavedReport obeservable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get reportSaved() {
        return this._savedReport;
    }
    /**
     * get _reportStyles observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get reportStyles() {
        return this._reportStyles;
    }
    /**
     * get _reportForms observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get reportForms() {
        return this._reportForms;
    }
    /**
     * get the _origin Observable
     *
     * \@readonly
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    get origin() {
        return this._origin;
    }
    /**
     * This method assigns the new width to the idx column
     * and recalculates the width of the remaining columns of the layout.
     * The range value are from 0,1 to 1.
     *
     * RULES:
     * The min value for column is 0,1.
     * The sum of all columns width is always 1.
     * The method round the values.
     * If is present only one column the width is always 1.
     *
     * When the new value `>` old value:
     * the width of the remaining columns decreases.
     * When the new value `<` old value:
     * the width of the remaining columns increases.
     *
     * When values ​​are periodic, rounding assigns the gap to the current value.
     * For example: 3 columns with 0,33 believe 1 column 0,34 and 2 columns 0,33.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} newValue
     * @param {?} idx
     *
     * @return {?}
     */
    instantColumnValue(newValue, idx) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return widget;
            }
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            /** @type {?} */
            let size = myObj.columns.length;
            /** @type {?} */
            let spreadValue = 0;
            /** @type {?} */
            let objNum = 0;
            /** @type {?} */
            let sum = 0;
            /** @type {?} */
            let idxFirstNoObj = -1;
            /** @type {?} */
            let add = false;
            /** @type {?} */
            let foundFirstNoObj = false;
            /** @type {?} */
            let re1 = new RegExp('(^[0]\.\[1-9][0-9]$)');
            /** @type {?} */
            let re2 = new RegExp('(^[0]\.\[1-9]$)');
            /** @type {?} */
            let re3 = new RegExp('^[1]$');
            /** @type {?} */
            let oldValue = myObj.columns[idx];
            newValue = Number(this.roundTo(newValue, 2).toFixed(2));
            if (myObj.columns[idx] == null) {
                throw new Error('invalid value');
            }
            for (let j = 0; j < size; j++) {
                if (myObj.columns[j] === -1) {
                    objNum++;
                }
            }
            if (oldValue == -1) {
                oldValue = 0.1;
                objNum--;
                newValue = Number(this.roundTo(1 / (size - objNum), 2).toFixed(2));
                myObj.columns[idx] = 0.1;
            }
            else if (oldValue < 0.1) {
                oldValue = 0.1;
            }
            if (newValue !== -1) {
                if (myObj.columns.length === 1) {
                    myObj.columns[0] = 1;
                    return myObj;
                }
                if (newValue < 0.1) {
                    newValue = 0.1;
                }
                else if (newValue + 0.1 * (size - objNum - 1) > 1) {
                    newValue = 1 - (0.1 * (size - objNum - 1));
                }
                if ((oldValue === newValue) && (oldValue === 0.1)) {
                    myObj.columns[idx] = newValue;
                    return myObj;
                }
                if (oldValue > newValue) {
                    add = true;
                    spreadValue = (oldValue - newValue) / (size - objNum - 1);
                }
                else {
                    add = false;
                    spreadValue = (newValue - oldValue) / (size - objNum - 1);
                }
                spreadValue = Number(this.roundTo(spreadValue, 2).toFixed(2));
                if (spreadValue < 0.01) {
                    spreadValue = 0.1;
                }
            }
            else {
                myObj.columns[idx] = -1;
                objNum++;
                add = true;
                if (myObj.columns.length == 1) {
                    spreadValue = 1;
                }
                else {
                    spreadValue = (oldValue) / (size - objNum);
                }
            }
            for (let i = 0; i < size; i++) {
                if (myObj.columns[i] !== -1) {
                    if ((i == idx)) {
                        myObj.columns[idx] = newValue;
                    }
                    else {
                        if (add) {
                            myObj.columns[i] += spreadValue;
                            if ((myObj.columns[i] > 0.9) && (myObj.columns.length - objNum != 1)) {
                                myObj.columns[i] = 0.90;
                            }
                        }
                        else {
                            myObj.columns[i] -= spreadValue;
                            if (myObj.columns[i] < 0.1) {
                                myObj.columns[i] = 0.10;
                            }
                        }
                        myObj.columns[i] = Number(this.roundTo(myObj.columns[i], 2).toFixed(2));
                        sum += myObj.columns[i];
                    }
                    sum = Number(this.roundTo(sum, 2).toFixed(2));
                    if (foundFirstNoObj == false) {
                        idxFirstNoObj = i;
                        foundFirstNoObj = true;
                    }
                }
            }
            if (newValue === -1) {
                myObj.columns[idx] = -1;
                if (foundFirstNoObj) {
                    myObj.columns[idxFirstNoObj] += Number(this.roundTo(1 - sum, 2).toFixed(2));
                }
            }
            else {
                myObj.columns[idx] = Number(this.roundTo(1 - sum, 2).toFixed(2));
            }
            for (let j = 0; j < myObj.columns.length; j++) {
                if (myObj.columns[j] !== -1 &&
                    !re1.test(String(myObj.columns[j])) &&
                    !re2.test(String(myObj.columns[j])) &&
                    !re3.test(String(myObj.columns[j]))) {
                    this.instantColumnValue(0.10, j);
                }
            }
            this.columnWidthChangedEmitter.emit();
            this._saveReportEvent.emit();
            return myObj;
        }));
    }
    /**
     * This method set the imageUrl on the current AjfReportImageWidget.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} imageUrl
     *
     * @return {?}
     */
    setImageUrl(imageUrl) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (widget));
            myObj.setUrl(imageUrl);
            return myObj;
        }));
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    setIcon(icon) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (widget));
            myObj.setIcon(icon);
            return myObj;
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setFlag(value) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (widget));
            myObj.setFlag(value);
            return myObj;
        }));
    }
    /**
     * @param {?} conditionText
     * @return {?}
     */
    saveCondition(conditionText) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            if (widget.visibility != null) {
                widget.visibility.condition = conditionText;
            }
            return widget;
        }));
    }
    /**
     * @param {?} _label
     * @param {?} _level
     * @param {?} _mainIndex
     * @param {?} _index
     * @param {?} formulaText
     * @param {?} aggregationType
     * @return {?}
     */
    saveChartFormula(_label, _level, _mainIndex, _index, formulaText, aggregationType) {
        this._currentWidgetUpdate.next((/**
         * @param {?} w
         * @return {?}
         */
        (w) => {
            if (w == null) {
                return null;
            }
            /** @type {?} */
            const widget = (/** @type {?} */ (w));
            if (widget != null && widget.dataset != null) {
                /** @type {?} */
                let formula = new AjfFormula();
                /** @type {?} */
                let aggregation = new AjfAggregation();
                // let obj: any;
                formula.formula = formulaText;
                aggregation.aggregation = aggregationType;
                // obj = {
                //   'formula': formula.toJson(),
                //   'aggregation': aggregation.toJson(),
                //   'label': label
                // };
                // dataset = AjfDataset.fromJson(obj);
                // check if the row that contains main data is defined
                /* if (widget.dataset[0] == null) {
                  widget.dataset[0] = [];
                }
        
                if (level == 0 && mainIndex == -1 && index == -1) {
        
                  widget.dataset[0].push(dataset);
                } else if (level == 1 && mainIndex == -1 && index == -1) {
        
                  widget.dataset[widget.dataset.length] = [];
                  widget.dataset[widget.dataset.length - 1].push(dataset);
                } else if (index === - 1) {
                  widget.dataset[mainIndex + 1].push(dataset);
                } else {
                  widget.dataset[mainIndex].splice(index, 1, dataset);
                } */
            }
            return widget;
        }));
    }
    /**
     * @param {?} _label
     * @param {?} aggregationType
     * @param {?} formulaText
     * @param {?} _mainIndex
     * @param {?} _index
     * @return {?}
     */
    saveTableFormula(_label, aggregationType, formulaText, _mainIndex, _index) {
        this._currentWidgetUpdate.next((/**
         * @param {?} w
         * @return {?}
         */
        (w) => {
            if (w == null) {
                return null;
            }
            /** @type {?} */
            const widget = (/** @type {?} */ (w));
            if (widget.dataset != null) {
                /** @type {?} */
                let formula = new AjfFormula();
                /** @type {?} */
                let aggregation = new AjfAggregation();
                // let dataset: AjfDataset = new AjfDataset();
                // let rowDataset: AjfDataset[] = [];
                // let obj: any;
                formula.formula = formulaText;
                aggregation.aggregation = aggregationType;
                // obj = {
                //   'formula': formula.toJson(),
                //   'aggregation': aggregation.toJson(),
                //   'label': label
                // };
                // dataset = AjfDataset.fromJson(obj);
                /* if (mainIndex === - 1) {
                  widget.dataset[widget.dataset.length] = [];
                  widget.dataset[widget.dataset.length - 1].push(dataset);
                } else {
                  if (index === -1) {
                    widget.dataset[mainIndex].push(dataset);
                  } else {
                    widget.dataset[mainIndex].splice(index, 1, dataset);
                  }
                } */
            }
            return widget;
        }));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeTableMainData(index) {
        this._removeFromCurrentWidgetArrayProperty('dataset', index);
    }
    /**
     * @param {?} _mainIndex
     * @param {?} _index
     * @return {?}
     */
    removeData(_mainIndex, _index) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            /* if (index === -1) {
              myObj.dataset.splice(mainIndex, 1);
            } else {
              myObj.dataset[mainIndex].splice(index, 1);
            } */
            return myObj;
        }));
    }
    /**
     * update type field of AjfReportChartWidget current widget
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} type
     *
     * @return {?}
     */
    setChartType(type) {
        this._setCurrentWidgetProperty('type', type);
    }
    /**
     * remove  idx element of xLabels field of AjfReportChartWidget current widget
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} _idx
     * @return {?}
     */
    removeMainData(_idx) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            // myObj.dataset[0].splice(idx, 1);
            return myObj;
        }));
    }
    /**
     * @param {?} _mainIdx
     * @param {?} _idx
     * @return {?}
     */
    removeRelatedData(_mainIdx, _idx) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            /* if (idx == -1) {
              myObj.dataset.splice(mainIdx + 1, 1);
            } else {
              myObj.dataset[mainIdx + 1].splice(idx, 1);
            } */
            return myObj;
        }));
    }
    /**
     * update backgroundColor field of AjfReportChartWidget current widget
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} colors
     *
     * @return {?}
     */
    setChartBackgroundColor(colors) {
        this._setCurrentWidgetProperty('backgroundColor', colors);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    addChartBackgroundColor(color) {
        this._addToCurrentWidgetArrayProperty('backgroundColor', color);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeChartBackgroundColor(idx) {
        this._removeFromCurrentWidgetArrayProperty('backgroundColor', idx);
    }
    /**
     * update borderColor field of AjfReportChartWidget current widget
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} colors
     *
     * @return {?}
     */
    setChartBorderColor(colors) {
        this._setCurrentWidgetProperty('borderColor', colors);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChartBorderWidth(value) {
        this._setCurrentWidgetProperty('borderWidth', value);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    addChartBorderColor(color) {
        this._addToCurrentWidgetArrayProperty('borderColor', color);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeChartBorderColor(idx) {
        this._removeFromCurrentWidgetArrayProperty('borderColor', idx);
    }
    /**
     * This method set the AjfReport.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} report
     *
     * @return {?}
     */
    setReport(report) {
        this._report.next(report);
    }
    /**
     * This method set the export report.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} json
     * @return {?}
     */
    setSaveReport(json) {
        this._saveReport.next(json);
    }
    /**
     * This method set the font attribute on the current AjfReportWidget.
     *
     * There is a check on font-size attribute,
     * if is no specificate the type of size font set 'pt' as default.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setWidgetStyles(label, value) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            /** @type {?} */
            const pxStyles = [
                'font-size', 'height', 'width', 'border-width', 'border-radius', 'padding', 'margin'
            ];
            /** @type {?} */
            const isPxStyle = pxStyles.indexOf(label) > -1;
            if (isPxStyle && !(value instanceof Array) && this.isNumber(value)) {
                value += 'px';
            }
            else if (isPxStyle && value instanceof Array && this.isNumberArray(value)) {
                value = `${value.join('px ')}px`;
            }
            myObj.styles[label] = value;
            return myObj;
        }));
    }
    /**
     * this method update the styles of origin widget array
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} origin can be header content or footer
     * @param {?} label for example background-color
     * @param {?} value for example rgb(255,255,255,1)
     *
     * @return {?}
     */
    setSectionStyles(origin, label, value) {
        if ((origin !== 'header') && (origin !== 'content') && (origin !== 'footer')) {
            throw new Error('uncknow origin ' + origin);
        }
        this._updates[origin].next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            widget.styles[label] = value;
            widget.styles = (/** @type {?} */ (Object.assign({}, widget.styles)));
            return widget;
        }));
    }
    /**
     * this method set the style of the whole report.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} label for example background-color
     * @param {?} value for example rgb(255,255,255,1)
     *
     * @return {?}
     */
    setReportStyles(label, value) {
        this._reportStylesUpdate.next((/**
         * @param {?} styles
         * @return {?}
         */
        (styles) => {
            if (styles == null) {
                styles = {};
            }
            else {
                styles[label] = value;
                styles = (/** @type {?} */ (Object.assign({}, styles)));
            }
            return styles;
        }));
    }
    /**
     *  update forms
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} forms
     *
     * @return {?}
     */
    setReportForms(forms) {
        this._reportFormsUpdate.next((/**
         * @param {?} _form
         * @return {?}
         */
        (_form) => {
            return forms || [];
        }));
    }
    /**
     * update customWidgets
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} widget
     * @param {?=} position
     * @return {?}
     */
    addCustomWidgets(widget, position) {
        this._customWidgetsUpdate.next((/**
         * @param {?} customWidgets
         * @return {?}
         */
        (customWidgets) => {
            customWidgets = customWidgets || [];
            if (position != null && position >= 0) {
                customWidgets.splice(position, 0, widget);
            }
            else {
                customWidgets.push(widget);
            }
            return customWidgets;
        }));
    }
    /**
     * reset customWidgets
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    resetCustomWidgets() {
        this._customWidgetsUpdate.next((/**
         * @param {?} customWidgets
         * @return {?}
         */
        (customWidgets) => {
            customWidgets.length = 0;
            return customWidgets;
        }));
    }
    /**
     * update label of widget
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} label
     * @param {?} position
     *
     * @return {?}
     */
    changeLabelCustomWidget(label, position) {
        this._customWidgetsUpdate.next((/**
         * @param {?} customWidgets
         * @return {?}
         */
        (customWidgets) => {
            customWidgets[position].type = label;
            return customWidgets;
        }));
    }
    /**
     * Add an AjfReportWidget on _headerWidgetsUpdate
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} widget
     * @param {?=} position
     * @return {?}
     */
    addHeaderWidget(widget, position) {
        this._addWidgetToContainer(this._headerWidgetsUpdate, widget, position);
    }
    /**
     * Add an AjfReportWidget on _contentWidgetsUpdate
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} widget
     * @param {?=} position
     * @return {?}
     */
    addContentWidget(widget, position) {
        this._addWidgetToContainer(this._contentWidgetsUpdate, widget, position);
    }
    /**
     * Add an AjfReportWidget on _footerWidgetsUpdate
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} widget
     * @param {?=} position
     * @return {?}
     */
    addfooterWidget(widget, position) {
        this._addWidgetToContainer(this._footerWidgetsUpdate, widget, position);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    unfixedColumn(idx) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return widget;
            }
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            /** @type {?} */
            let num = myObj.columns.length;
            /** @type {?} */
            let checkSum = 0;
            /** @type {?} */
            let objNum = 0;
            /** @type {?} */
            let value = 1;
            /** @type {?} */
            let spreadValue;
            myObj.columns[idx] = 0;
            for (let j = 0; j < num; j++) {
                if (myObj.columns[j] === -1) {
                    objNum++;
                }
            }
            value = Number(this.roundTo(1 / (num - objNum), 2).toFixed(2));
            for (let i = 0; i < num; i++) {
                if (myObj.columns[i] !== -1) {
                    myObj.columns[i] = value;
                    checkSum = Number(this.roundTo(checkSum + value, 2).toFixed(2));
                }
            }
            checkSum = Number(this.roundTo(checkSum, 2).toFixed(2));
            if (checkSum > 1) {
                spreadValue = parseFloat(this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                myObj.columns[idx] -= spreadValue;
                myObj.columns[idx] = this.roundTo(myObj.columns[idx], 2);
            }
            else if (checkSum < 1) {
                myObj.columns[idx] += (1 - (checkSum % 1));
                myObj.columns[idx] = Number(this.roundTo(myObj.columns[idx], 2).toFixed(2));
            }
            return myObj;
        }));
    }
    /**
     * Add column on the current AjfReportLayoutWidget.
     *
     * When adding a column the width of the other columns is recalculated
     * by dividing it by the number of column
     *
     * \@memberOf AjfReportBuilderService
     * @return {?}
     */
    addColumn() {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            /** @type {?} */
            let tempObj = [];
            /** @type {?} */
            let num = myObj.columns.length + 1;
            /** @type {?} */
            let checkSum = 0;
            /** @type {?} */
            let objNum = 0;
            /** @type {?} */
            let value = 1;
            /** @type {?} */
            let tmpValue;
            if (num > 10) {
                throw new Error('exceed max columns');
            }
            for (let j = 0; j < num; j++) {
                if (myObj.columns[j] === -1) {
                    objNum++;
                }
            }
            value = Number(this.roundTo(1 / (num - objNum), 2).toFixed(2));
            for (let i = 0; i < num; i++) {
                if (myObj.columns[i] === -1) {
                    tempObj.push(-1);
                }
                else {
                    tempObj.push(value);
                    checkSum = Number(this.roundTo(checkSum + value, 2).toFixed(2));
                }
            }
            checkSum = Number(this.roundTo(checkSum, 2).toFixed(2));
            if (checkSum > 1) {
                tmpValue =
                    parseFloat(this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                tempObj[0] -= tmpValue;
                tempObj[0] = this.roundTo(tempObj[0], 2);
            }
            else if (checkSum < 1) {
                tempObj[0] += (1 - (checkSum % 1));
                tempObj[0] = Number(this.roundTo(tempObj[0], 2).toFixed(2));
            }
            myObj.columns = tempObj;
            /** @type {?} */
            let columnObj = {
                widgetType: 7,
                value: myObj.columns[myObj.columns.length - 1]
            };
            myObj.content.push(new AjfReportColumnWidget(columnObj));
            this._saveReportEvent.emit();
            return myObj;
        }));
    }
    /**
     * @param {?} column
     * @param {?} index
     * @return {?}
     */
    removeWidgetToColumn(column, index) {
        column.content.splice(index, 1);
    }
    /**
     * This method remove a widget on the current AjfReport.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} node
     * the position array:
     *
     * header -`>` headerWidgets
     * content -`>` contentWidgets
     * footer -`>` footerWidgets
     * column -`>` column of layout
     * layoutContent -`>` content of layout
     * obj -`>` obj of layout
     * customWidget -`>` custom widget
     *
     * @param {?} idx the position array
     *
     * @return {?}
     */
    remove(node, idx) {
        switch (node) {
            case 'header':
            case 'content':
            case 'footer':
                this._updates[node].next((/**
                 * @param {?} widgets
                 * @return {?}
                 */
                (widgets) => {
                    if (widgets.widgets.length === 0) {
                        throw new Error('you can not remove from empty array');
                    }
                    if (widgets.widgets[idx] == null) {
                        throw new Error('invalid index');
                    }
                    widgets.widgets.splice(idx, 1);
                    this.updateCurrentWidget(null);
                    return widgets;
                }));
                break;
            case 'layout':
                this._currentWidgetUpdate.next((/**
                 * @param {?} widget
                 * @return {?}
                 */
                (widget) => {
                    if (widget == null) {
                        return null;
                    }
                    /** @type {?} */
                    let myObj = (/** @type {?} */ (widget));
                    if (myObj.columns.length === 1) {
                        myObj.content[0].content.length = 0;
                        return myObj;
                    }
                    if (myObj.columns[idx] == null) {
                        throw new Error('this content is undefined');
                    }
                    else {
                        /** @type {?} */
                        let spread = myObj.columns[idx] / (myObj.columns.length - 1);
                        if (myObj.columns.length > 1) {
                            myObj.columns.splice(idx, 1);
                            myObj.content.splice(idx, 1);
                        }
                        for (let i = 0; i < myObj.columns.length; i++) {
                            myObj.columns[i] += spread;
                        }
                        this.instantColumnValue(myObj.columns[0], 0);
                    }
                    return myObj;
                }));
                break;
            case 'column':
            case 'layoutContent':
            case 'unfixedColumn':
                this._currentWidgetUpdate.next((/**
                 * @param {?} widget
                 * @return {?}
                 */
                (widget) => {
                    if (widget == null) {
                        return null;
                    }
                    /** @type {?} */
                    let myObj = (/** @type {?} */ (widget));
                    if (node === 'column') {
                        /** @type {?} */
                        let clm = (/** @type {?} */ (widget));
                        clm.content.splice(idx, 1);
                    }
                    else if (node === 'layoutContent') {
                        if (myObj.columns.length === 0) {
                            throw new Error('the column length is 0');
                        }
                        if (myObj.content.length === 0) {
                            throw new Error('can not remove any widget from empty content');
                        }
                        if (myObj.columns[idx] != null && myObj.content[idx] == null) {
                            throw new Error('this content is undefined');
                        }
                    }
                    else if (node === 'unfixedColumn') {
                        if (myObj.columns[idx] !== -1) {
                            throw new Error('the column position value  isnt -1');
                        }
                        this.unfixedColumn(idx);
                    }
                    // if (node !== 'obj') {
                    //   let spread = myObj.columns[idx] / (myObj.columns.length - 1);
                    //   myObj.content.splice(idx, 1);
                    //   if (myObj.columns.length > 1) {
                    //     myObj.columns.splice(idx, 1);
                    //   }
                    //   for (let i = 0; i < myObj.columns.length; i++) {
                    //     myObj.columns[i] += spread;
                    //   }
                    //   this.instantColumnValue(myObj.columns[0], 0);
                    // }
                    return myObj;
                }));
                break;
            case 'customWidgets':
                {
                    this._updates[node].next((/**
                     * @param {?} widgets
                     * @return {?}
                     */
                    (widgets) => {
                        if (widgets.length === 0) {
                            throw new Error('you can not remove from empty array');
                        }
                        if (widgets[idx] == null) {
                            throw new Error('invalid index');
                        }
                        widgets.splice(idx, 1);
                        return widgets;
                    }));
                }
                break;
            default: throw new Error('unknown node ' + node);
        }
    }
    /**
     * This method add a AjfReportWidget on the current AjfReportLayoutWidget.
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} newWidget
     * @param {?} idx
     *
     * @return {?}
     */
    addToContent(newWidget, idx) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            /** @type {?} */
            let myObj = (/** @type {?} */ (widget));
            if (myObj.content[idx] != null) {
                myObj.content.splice(idx, 1);
            }
            myObj.content.splice(idx, 0, newWidget);
            return myObj;
        }));
    }
    /**
     * @param {?} event
     * @param {?} toColumn
     * @param {?=} position
     * @return {?}
     */
    addToColumn(event, toColumn, position) {
        if (event.dragData && event.dragData.fromColumn != null) {
            /** @type {?} */
            let fromColumn = event.dragData.fromColumn;
            /** @type {?} */
            let widget = event.dragData.widget;
            /** @type {?} */
            let fromIndex = event.dragData.fromIndex;
            fromColumn.content.splice(fromIndex, 1);
            toColumn.content.push(widget);
        }
        else if (event.dragData && event.dragData.arrayFrom) {
            this.remove(event.dragData.arrayFrom, event.dragData.fromIndex);
            toColumn.content.push(event.dragData.widget);
        }
        else if (event.dragData && event.dragData.json) {
            /** @type {?} */
            let obj = JSON.parse(event.dragData.json);
            /** @type {?} */
            let newWidget = AjfReportWidget.fromJson(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
        else {
            /** @type {?} */
            let obj = {
                'widgetType': AjfReportWidgetType[event.dragData]
            };
            /** @type {?} */
            let newWidget = AjfReportWidget.fromJson(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} toColumn
     * @param {?} toIndex
     * @return {?}
     */
    changePositionOnColumn(event, toColumn, toIndex) {
        /** @type {?} */
        let fromColumn = event.dragData.fromColumn;
        /** @type {?} */
        let fromIndex = event.dragData.fromIndex;
        /** @type {?} */
        let fromWidget = fromColumn.content[fromIndex];
        /** @type {?} */
        let toWidget = fromColumn.content[toIndex];
        if (fromColumn == toColumn) {
            fromColumn.content[fromIndex] = toWidget;
            fromColumn.content[toIndex] = fromWidget;
        }
        else {
            fromColumn.content.splice(fromIndex, 1);
            toColumn.content.splice(toIndex, 0, fromWidget);
        }
    }
    /**
     * This method add the obj on the idx position.
     * Obj have a no specificate width and is not calculate as columns
     *
     * \@memberOf AjfReportBuilderService
     * @param {?} idx
     *
     * @return {?}
     */
    fixedColumn(idx) {
        this.instantColumnValue(-1, idx);
    }
    /**
     * @param {?} from
     * @param {?} to
     * @param {?} layoutWidget
     * @return {?}
     */
    changeColumn(from, to, layoutWidget) {
        if (to < 0 || to >= layoutWidget.content.length) {
            return;
        }
        if (from > layoutWidget.content.length - 1 && to > from) {
            return;
        }
        /** @type {?} */
        let fromColumn = (/** @type {?} */ (layoutWidget.content[from]));
        /** @type {?} */
        let fromColumnValue = layoutWidget.columns[from];
        /** @type {?} */
        let toColumn = (/** @type {?} */ (layoutWidget.content[to]));
        /** @type {?} */
        let toColumnValue = layoutWidget.columns[to];
        layoutWidget.content[from] = toColumn;
        layoutWidget.columns[from] = toColumnValue;
        layoutWidget.content[to] = fromColumn;
        layoutWidget.columns[to] = fromColumnValue;
        this.updateCurrentWidget(layoutWidget);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    addCustomColor(color) {
        this._updates['color'].next((/**
         * @param {?} colors
         * @return {?}
         */
        (colors) => {
            if (colors.indexOf(color) < 0) {
                colors.push(color);
            }
            return colors;
        }));
    }
    /**
     * @private
     * @param {?} subj
     * @param {?} widget
     * @param {?=} position
     * @return {?}
     */
    _addWidgetToContainer(subj, widget, position) {
        subj.next((/**
         * @param {?} widgets
         * @return {?}
         */
        (widgets) => {
            if (position != null && position >= 0) {
                widgets.widgets.splice(position, 0, widget);
            }
            else {
                widgets.widgets.push(widget);
            }
            return widgets;
        }));
        this.updateCurrentWidget(widget);
        this.setEmptyContent(false);
    }
    /**
     * @private
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    _setCurrentWidgetProperty(propName, value) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            ((/** @type {?} */ (widget)))[propName] = value;
            return widget;
        }));
    }
    /**
     * @private
     * @param {?} propName
     * @param {?} value
     * @return {?}
     */
    _addToCurrentWidgetArrayProperty(propName, value) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return null;
            }
            /** @type {?} */
            const arr = ((/** @type {?} */ (((/** @type {?} */ (widget)))[propName])));
            arr.push(value);
            ((/** @type {?} */ (widget)))[propName] = arr;
            return widget;
        }));
    }
    /**
     * @private
     * @param {?} propName
     * @param {?} idx
     * @return {?}
     */
    _removeFromCurrentWidgetArrayProperty(propName, idx) {
        this._currentWidgetUpdate.next((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            ((/** @type {?} */ (((/** @type {?} */ (widget)))[propName]))).splice(idx, 1);
            return widget;
        }));
    }
}
AjfReportBuilderService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AjfReportBuilderService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component manages the report text
 *
 * @export
 */
class AjfReportBuilderColumn {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        /**
         * if true mouse event is on dragged status
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this.layoutShow = false;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this._onDraggedSub = Subscription.EMPTY;
    }
    /**
     * @param {?} event
     * @param {?} idx
     * @param {?} toColumn
     * @return {?}
     */
    addToList(event, idx, toColumn) {
        this.onDragEndHandler();
        if (event.dragData.fromColumn) {
            this._service.changePositionOnColumn(event, toColumn, idx);
        }
        else {
            this._service.addToColumn(event, toColumn, idx);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            s.unsubscribe();
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.widget = changes.widget.currentValue;
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderColumn.decorators = [
    { type: Component, args: [{selector: 'ajf-column',
                template: "<ng-template [ngIf]=\"column.content != null\"><div class=\"ajf-column\" [ngClass]=\"{'ajf-is-on-over': showActions}\" (mouseenter)=\"showActions = true\" (mouseleave)=\"showActions = false\"><mat-list><ng-template ngFor let-widget let-idx=\"index\" [ngForOf]=\"column.content\"><ng-template [ngIf]=\"!onDragged\"><ajf-report-builder-widgets-row-buttons cdkDrag [cdkDragData]=\"{fromColumn: column, fromIndex: idx, widget: widget, dropZones: ['widget']}\" [from]=\"'column'\" [fromWidget]=\"column\" [widget]=\"widget\" [position]=\"idx\" [child]=\"true\" (cdkDragStarted)=\"onDragStartHandler()\" (cdkDragEnded)=\"onDragEndHandler()\"></ajf-report-builder-widgets-row-buttons></ng-template><ajf-report-builder-renderer-widget [widget]=\"widget\"></ajf-report-builder-renderer-widget></ng-template></mat-list></div></ng-template>",
                styles: [".ajf-column{max-width:100%;max-height:100%;background:rgba(0,0,0,0);z-index:100}.ajf-column span{flex-direction:row;width:100%}.ajf-column .mat-list{padding:0}.ajf-column:hover span,.ajf-is-on-over span{visibility:visible!important;display:block!important}.ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}mat-list{height:100%;padding:0}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderColumn.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderColumn.propDecorators = {
    column: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfReportBuilderWidgetToString(widgetType) {
    return `reportbuilder-${widgetType.toLowerCase()}`;
}
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfWidgetTypeStringToIcon(widgetType) {
    return `widget-${widgetType.toLowerCase()}`;
}
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfWidgetTypeStringToLabel(widgetType) {
    return `widgetType.${widgetType}`;
}
/**
 * @param {?} type
 * @return {?}
 */
function ajfWidgetTypeToLabel(type) {
    return ajfWidgetTypeStringToLabel(AjfReportWidgetType[type]);
}
/**
 * @param {?} type
 * @return {?}
 */
function widgetReportBuilderIconName(type) {
    return `reportbuilder-${AjfReportWidgetType[type].toLowerCase()}`;
}
/**
 * @param {?} str
 * @return {?}
 */
function sanitizeConditionString(str) {
    str = str.trim();
    while (str.indexOf('  ') > 0) {
        str = str.replace('  ', ' ');
    }
    return str;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder builder condition editor
 * @implements : OnDestroy
 * @implements : AfterViewInit
 */
class AjfReportBuilderConditionEditor {
    /**
     * this constructor will init current condition by ajfBuilderservice
     * and init condition and availableFieldNames subscriptions
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.isValid = false;
        this.names = [];
        // conditionText is a string
        this.conditionText = 'true';
        //  operators is an array of any type that contains all allow operators
        this.operators = [
            '( )', '\' \'',
            '<', '<=', '==', '>=', '>', '!=', '!',
            '&&', '||',
            '+', '-', '*', '/', '%',
            'true', 'false'
        ];
        this._conditionNamesSub = Subscription.EMPTY;
    }
    /**
     * @param {?} formsVariables
     * @return {?}
     */
    extractNames(formsVariables) {
        this.names.length = 0;
        for (let i = 0; i < formsVariables.length; i++) {
            this.names = this.names.concat(formsVariables[i].names);
        }
    }
    /**
     * @param {?} id
     * @param {?} index
     * @return {?}
     */
    setCurrent(id, index) {
        this.currentId = id;
        this.appendText(this.formsVariables[id].names[index]);
        this.checkValidation();
    }
    /**
     * this method will return success if the current condtion is valid
     * @return {?} boolean
     */
    validateCondition() {
        return AjfCondition.validate(this.conditionText, this.names);
    }
    // TODO complete the comment
    /**
     * this method will append text to json
     * @param {?} text      : string -
     * @param {?=} _goBackNum
     * @return {?}
     */
    appendText(text, _goBackNum) {
        if (text == null || this.conditionTextArea == null) {
            return;
        }
        /** @type {?} */
        let el = this.conditionTextArea.nativeElement;
        /** @type {?} */
        let sStart = Math.min(el.selectionStart, el.selectionEnd);
        /** @type {?} */
        let sEnd = Math.max(el.selectionStart, el.selectionEnd);
        /** @type {?} */
        let startingString = this.conditionText.substr(0, sStart);
        /** @type {?} */
        let endingString = this.conditionText.substr(sEnd);
        /** @type {?} */
        let initialLenght = startingString.length;
        /** @type {?} */
        let newStr = '';
        startingString = sanitizeConditionString(startingString);
        endingString = sanitizeConditionString(endingString);
        sStart += startingString.length - initialLenght +
            text.length + (startingString.length > 0 ? 2 : 1);
        newStr = startingString.length > 0 ? `${startingString} ` : '';
        this.conditionText = `${newStr}${text} ${endingString}`;
        /** @type {?} */
        const s = timer(0).subscribe((/**
         * @return {?}
         */
        () => {
            if (s && !s.closed) {
                s.unsubscribe();
            }
            if (el.createTextRange) {
                /** @type {?} */
                let range = el.createTextRange();
                range.move('character', sStart);
                range.select();
            }
            else {
                if (el.selectionStart) {
                    el.focus();
                    el.setSelectionRange(sStart, sStart);
                }
                else {
                    el.focus();
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    checkValidation() {
        this.isValid = this.validateCondition();
        if (this.isValid) {
            this.saveCondition();
        }
    }
    /**
     * this method will save current condition
     * @return {?}
     */
    saveCondition() {
        this._service.saveCondition(this.conditionText);
    }
    /**
     * this method will hide the error message
     * @return {?}
     */
    hideErrorMessage() {
        if (this.errorMessage == null) {
            return;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.conditionText = this.visibility.condition;
        this.isValid = true;
        if (this.conditionText == 'true') {
            this.conditionText = '';
        }
        this._conditionNamesSub = this._service.conditionNames
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            this.formsVariables = x;
            if (x != null) {
                this.extractNames(this.formsVariables);
            }
        }));
    }
    /**
     * this method will destroy a conditionSubscriptions
     * @return {?}
     */
    ngOnDestroy() {
        this._conditionNamesSub.unsubscribe();
    }
}
AjfReportBuilderConditionEditor.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-condition-editor',
                template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\"><mat-card><mat-card-header><mat-card-title>condition of visibility</mat-card-title><mat-card-subtitle><ng-template [ngIf]=\"visibility\">{{visibility.condition}}</ng-template></mat-card-subtitle></mat-card-header><mat-card-content><br><form><mat-select [(ngModel)]=\"a\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select condition\"><ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\"><mat-option *ngFor=\"let label of form.labels;let i = index;\" [value]=\"label\" (click)=\"setCurrent(id, i)\">{{ id}}: {{ label }}</mat-option></ng-template></mat-select><mat-select [(ngModel)]=\"b\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select operator\"><mat-option *ngFor=\"let operator of operators\" (click)=\"appendText(operator);\">{{ operator }}</mat-option></mat-select></form></mat-card-content><mat-card-actions><ng-template [ngIf]=\"!isValid\"><ng-container translate>Invalid condition! Please check syntax.</ng-container></ng-template><textarea (focus)=\"hideErrorMessage()\" #conditionTextArea [(ngModel)]=\"conditionText\" (keyup)=\"checkValidation()\"> </textarea></mat-card-actions></mat-card></ng-template>",
                styles: ["ajf-report-builder-condition-editor textarea{width:100%}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderConditionEditor.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderConditionEditor.propDecorators = {
    visibility: [{ type: Input }],
    conditionTextArea: [{ type: ViewChild, args: ['conditionTextArea',] }],
    errorMessage: [{ type: ViewChild, args: ['errorMessage',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  manage the content page
 *
 * @export
 */
class AjfReportBuilderContent {
    /**
     * @param {?} service
     * @param {?} cdRef
     */
    constructor(service, cdRef) {
        this.service = service;
        this.cdRef = cdRef;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        /**
         *  observe the status of the fixed zoom
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.fixedZoom = false;
        // this boolean sign if widget is in drag enter status
        this.onDragEnter = {};
        this.show = false;
        // this array contains all widget locate in header zone
        this.headerWidgets = [];
        // this array contains all widget locate in content zone
        this.contentWidgets = [];
        // this array contains all widget locate in footer zone
        this.footerWidgets = [];
        this.onOver = false;
        // this is the current widget
        this.currentWidget = null;
        /**
         * if true mouse event is on dragged status
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this._onDraggedSub = Subscription.EMPTY;
        this._fixedZoomSub = Subscription.EMPTY;
        this._onDragEnterSub = Subscription.EMPTY;
        this._headerWidgetsSub = Subscription.EMPTY;
        this._contentWidgetsSub = Subscription.EMPTY;
        this._footerWidgetsSub = Subscription.EMPTY;
        this._onOverSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this.headerStyles = this.service.headerStyles;
        this.contentStyles = this.service.contentStyles;
        this.footerStyles = this.service.footerStyles;
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        this.showActions = true;
        this.service.overStarted();
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.showActions = false;
        this.service.overEnded();
    }
    /**
     * @param {?} dropZones
     * @return {?}
     */
    canDropPredicate(dropZones) {
        return (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            item.data.dropZones.forEach((/**
             * @param {?} d
             * @return {?}
             */
            d => {
                if (dropZones.indexOf(d) > -1) {
                    return true;
                }
            }));
            return false;
        });
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    isLayout(widget) {
        if (widget instanceof AjfReportLayoutWidget) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (s != null) {
                s.unsubscribe();
            }
            this.service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this.service.dragEnded();
    }
    /**
     *  sign the enter of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    onDragEnterHandler(array, index) {
        this.service.dragEnter(array, index);
    }
    /**
     * sign the leave of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragLeaveHandler() {
        this.service.dragLeave();
    }
    /**
     *  return true if array and index is === with array and index of onDragEnter
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     *
     * @return {?}
     */
    onDragEnterCheck(array, index) {
        if ((array === this.onDragEnter.array) &&
            ((index === this.onDragEnter.index) || (index === -1))) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * remove widget element from type array in idx position
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} type can be header content or footer
     * @param {?} idx
     *
     * @return {?}
     */
    remove(type, idx) {
        this.service.remove(type, idx);
    }
    /**
     * add widget element into type array in idx position
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} arrayTo
     * @param {?} event
     *
     * @param {?=} to
     * @return {?}
     */
    addToList(arrayTo, event, to) {
        this.onDragEndHandler();
        this.service.setOrigin(arrayTo);
        /** @type {?} */
        const itemData = (/** @type {?} */ (event.item.data));
        if (itemData.fromColumn != null) {
            this.service.removeWidgetToColumn(itemData.fromColumn, (/** @type {?} */ (itemData.fromIndex)));
            this.currentWidget = (/** @type {?} */ (itemData.widget));
        }
        else if (itemData.widget != null) {
            this.remove((/** @type {?} */ (itemData.arrayFrom)), (/** @type {?} */ (itemData.from)));
            this.currentWidget = itemData.widget;
        }
        else if (itemData.json != null && itemData.json !== '') {
            this.currentWidget = AjfReportWidget.fromJson(JSON.parse(deepCopy(itemData.json)));
        }
        else {
            /** @type {?} */
            let obj = {
                'widgetType': ((/** @type {?} */ (AjfReportWidgetType)))[(/** @type {?} */ (itemData.widgetType))]
            };
            this.currentWidget = AjfReportWidget.fromJson(obj);
        }
        this.onDragEndHandler();
        if (this.currentWidget != null) {
            switch (arrayTo) {
                case 'header':
                    this.service.addHeaderWidget(this.currentWidget, to);
                    break;
                case 'content':
                    this.service.addContentWidget(this.currentWidget, to);
                    break;
                case 'footer':
                    this.service.addfooterWidget(this.currentWidget, to);
                    break;
            }
        }
        this.onDragLeaveHandler();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._headerWidgetsSub = this.service.headerWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.headerWidgets = x.widgets;
        }));
        this._contentWidgetsSub = this.service.contentWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.contentWidgets = x.widgets;
        }));
        this._footerWidgetsSub = this.service.footerWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.footerWidgets = x.widgets;
        }));
        this._onDraggedSub = this.service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this._fixedZoomSub = this.service.fixedZoom
            .subscribe((/**
         * @param {?} bool
         * @return {?}
         */
        bool => {
            this.fixedZoom = bool;
        }));
        this._onDragEnterSub = this.service.onDragEnter
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragEnter = x;
        }));
        this._onOverSub = this.service.onOver
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onOver = x;
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        [
            this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
            this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub,
            this._onOverSub, this._onDragEnterSub
        ].forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => { s.unsubscribe(); }));
    }
}
AjfReportBuilderContent.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-content',
                template: "<div class=\"ajf-overlay\" [ngClass]=\"{'ajf-drag-mode': onDragged, 'ajf-zoom-mode': fixedZoom}\" [applyStyles]=\"reportStyles|async\" (mouseenter)=\"show = true\" (mouseleave)=\"show = false\"><div class=\"ajf-header\" [ngClass]=\"{'ajf-is-on-over': onDragged || show}\" [applyStyles]=\"(headerStyles|async)\"><mat-list *ngFor=\"let t of headerWidgets; let i = index\"><div cdkDropList class=\"ajf-drop-zone\" [ngClass]=\"{'ajf-show': true}\" [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\" (cdkDropListDropped)=\"addToList('header', $event, i);\" (dragenter)=\"onDragEnterHandler('header', i)\" (dragleave)=\"onDragLeaveHandler()\"></div><ajf-report-builder-widgets-row-buttons cdkDrag [cdkDragData]=\"{widget: t,fromIndex: i,arrayFrom: 'header', dropZones: ['widget','column']}\" [style.display]=\"(showActions || onDragged)? 'block' : 'none'\" [from]=\"'header'\" [widget]=\"t\" [position]=\"i\" (cdkDragStarted)=\"onDragStartHandler();\" (cdkDragEnded)=\"onDragEndHandler()\"></ajf-report-builder-widgets-row-buttons><ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'header'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget></mat-list><div cdkDropList class=\"ajf-drop-zone-container\" [ngClass]=\"{'ajf-show': true}\" [cdkDropListEnterPredicate]=\"canDropPredicate(['header','widget','column'])\" (cdkDropListDropped)=\"addToList('header', $event)\" (dragenter)=\"onDragEnterHandler('header', headerWidgets?.length)\" (dragleave)=\"onDragLeaveHandler()\"></div></div><div class=\"ajf-content\" [ngClass]=\"{'ajf-is-on-over': onDragged || show}\" [applyStyles]=\"contentStyles|async\"><mat-list *ngFor=\"let t of contentWidgets; let i = index\"><div cdkDropList class=\"ajf-drop-zone\" [ngClass]=\"{'ajf-show': true}\" [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\" (cdkDropListDropped)=\"addToList('content', $event, i)\" (dragenter)=\"onDragEnterHandler('content', i)\" (dragleave)=\"onDragLeaveHandler()\"></div><ajf-report-builder-widgets-row-buttons cdkDrag [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'content', dropZones: ['widget','column']}\" [style.display]=\"showActions ? 'block' : 'none'\" [from]=\"'content'\" [widget]=\"t\" [position]=\"i\" (cdkDragStarted)=\"onDragStartHandler()\" (cdkDragEnded)=\"onDragEndHandler();\"></ajf-report-builder-widgets-row-buttons><ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'content'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget></mat-list><div cdkDropList class=\"ajf-drop-zone-container\" [ngClass]=\"{'ajf-show': onDragged}\" [cdkDropListEnterPredicate]=\"canDropPredicate(['content','widget','column'])\" (cdkDropListDropped)=\"addToList('content', $event)\" (dragenter)=\"onDragEnterHandler('content', contentWidgets?.length)\" (dragleave)=\"onDragLeaveHandler()\"><label translate>Drop here</label></div></div><div class=\"ajf-footer\" [ngClass]=\"{'ajf-is-on-over': onDragged || show}\" [applyStyles]=\"footerStyles|async\"><mat-list *ngFor=\"let t of footerWidgets; let i = index\"><div cdkDropList class=\"ajf-drop-zone\" [ngClass]=\"{'ajf-show': true}\" [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\" (cdkDropListDropped)=\"addToList('footer', $event, i)\" (dragenter)=\"onDragEnterHandler('footer', i)\" (dragleave)=\"onDragLeaveHandler()\"></div><ajf-report-builder-widgets-row-buttons cdkDrag [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'footer', dropZones: ['widget','column']}\" [style.display]=\"showActions ? 'block' : 'none'\" [from]=\"'footer'\" [widget]=\"t\" [position]=\"i\" (cdkDragStarted)=\"onDragStartHandler()\" (cdkDragEnded)=\"onDragEndHandler()\"></ajf-report-builder-widgets-row-buttons><ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'footer'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget></mat-list><div cdkDropList class=\"ajf-drop-zone-container\" [ngClass]=\"{'ajf-show': onDragged}\" [cdkDropListEnterPredicate]=\"canDropPredicate(['footer','widget','column'])\" (cdkDropListDropped)=\"addToList('footer', $event)\" (dragenter)=\"onDragEnterHandler('footer', headerWidgets?.length)\" (dragleave)=\"onDragLeaveHandler()\"><label translate>Drop here</label></div></div></div>",
                styles: ["ajf-report-builder-content{text-align:center;display:block;margin-bottom:300px}ajf-report-builder-content .ajf-overlay.ajf-drag-mode{max-height:700px;margin-top:50px;background-color:beige}ajf-report-builder-content .ajf-drag-mode{overflow:scroll;zoom:50%}ajf-report-builder-content .ajf-drag-mode .ajf-content,ajf-report-builder-content .ajf-drag-mode .ajf-footer,ajf-report-builder-content .ajf-drag-mode .ajf-header{margin-bottom:20px;border:23px solid rgba(66,134,244,.2)}ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone{width:auto;background-color:rgba(66,134,244,.2);border:23px solid #fff;position:relative;min-height:50px!important;z-index:0;opacity:1}ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container{background-color:rgba(66,134,244,.2)!important;border:23px solid #fff!important}ajf-report-builder-content .ajf-drag-mode .ajf-footer,ajf-report-builder-content .ajf-drag-mode .ajf-header{border:23px solid rgba(255,102,102,.4)!important}ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container{background-color:rgba(255,102,102,.4)!important}ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone{background-color:rgba(255,102,102,.4)!important}ajf-report-builder-content .ajf-drag-mode .ajf-drop-zone-container{background-color:#000;border:16px solid #fff;position:relative;opacity:0;z-index:0;min-height:50px!important;display:none!important}ajf-report-builder-content .ajf-zoom-mode{zoom:50%}ajf-report-builder-content .ajf-content,ajf-report-builder-content .ajf-footer,ajf-report-builder-content .ajf-header{height:100%;min-height:50px;position:relative;text-align:center;display:block}ajf-report-builder-content .ajf-content .mat-list,ajf-report-builder-content .ajf-footer .mat-list,ajf-report-builder-content .ajf-header .mat-list{padding:0}ajf-report-builder-content .ajf-content .ajf-zoom:hover,ajf-report-builder-content .ajf-footer .ajf-zoom:hover,ajf-report-builder-content .ajf-header .ajf-zoom:hover{padding-bottom:100px;overflow-y:scroll}ajf-report-builder-content .ajf-content:hover{background-color:rgba(66,134,244,.2)!important}ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-header:hover{background-color:rgba(255,102,102,.4)}ajf-report-builder-content .ajf-content:hover,ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-is-on-over{border:3px dotted #3a7999}ajf-report-builder-content .ajf-content:hover label,ajf-report-builder-content .ajf-footer:hover label,ajf-report-builder-content .ajf-header:hover label,ajf-report-builder-content .ajf-is-on-over label{visibility:visible!important;opacity:.4;display:block!important}ajf-report-builder-content .ajf-content:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-footer:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-header:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-is-on-over .ajf-drop-zone-container{display:block!important}ajf-report-builder-content .ajf-content:hover mat-list button,ajf-report-builder-content .ajf-footer:hover mat-list button,ajf-report-builder-content .ajf-header:hover mat-list button,ajf-report-builder-content .ajf-is-on-over mat-list button{display:inline}ajf-report-builder-content .ajf-my-content{width:100%;white-space:nowrap;overflow-y:auto}ajf-report-builder-content .ajf-on-drag-over,ajf-report-builder-content .ajf-show{opacity:1!important;z-index:10}ajf-report-builder-content mat-list{position:relative;display:block}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '(mouseover)': 'onMouseOver()',
                    '(mouseleave)': 'onMouseLeave()'
                }
            },] },
];
/** @nocollapse */
AjfReportBuilderContent.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderCustomWidgetDialog {
    /**
     * @param {?} service
     * @param {?} _dialogRef
     */
    constructor(service, _dialogRef) {
        this.service = service;
        this._dialogRef = _dialogRef;
    }
    /**
     * @return {?}
     */
    changeLabel() {
        this.service.changeLabelCustomWidget(this.label, this.position);
        this._dialogRef.close();
    }
}
AjfReportBuilderCustomWidgetDialog.decorators = [
    { type: Component, args: [{selector: 'custom-widget-dialog',
                template: "<h3 matDialogTitle>set the label widget</h3><mat-form-field><input matInput placeholder=\"add the label of this custom widget\" [(ngModel)]=\"label\"></mat-form-field><button matDialogClose (click)=\"changeLabel()\">Ok</button>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderCustomWidgetDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];
AjfReportBuilderCustomWidgetDialog.propDecorators = {
    label: [{ type: Input }],
    position: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
class AjfReportBuilderCustomWidgetToolbarButton {
    // {...t, dropZones: ['header','content','footer','column','widget']}
    /**
     * this constructor will init icon registry
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.customWidgets = [];
    }
    /**
     * this method call a service method for remove custom widget
     *
     * \@memberOf AjfReportBuilderCustomWidgetToolbarButton
     * @return {?}
     */
    remove() {
        this._service.remove('customWidgets', this.position);
    }
    /**
     * this method will init  fieldIcon and fieldLabel
     * @return {?}
     */
    ngOnInit() {
        this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
        this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
    }
}
AjfReportBuilderCustomWidgetToolbarButton.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-custom-widget-toolbar-button',
                inputs: ['widgetType', 'position'],
                template: "<a mat-button>{{ widgetType}} <i class=\"material-icons\" (click)=\"remove()\">remove_circle_outline</i></a>",
                styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute!important;margin-left:5px!important;z-index:5}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderCustomWidgetToolbarButton.ctorParameters = () => [
    { type: AjfReportBuilderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
class AjfReportBuilderCustomWidgetsToolbar {
    /**
     * @param {?} service
     * @param {?} dialog
     */
    constructor(service, dialog) {
        this.service = service;
        this.dialog = dialog;
        this.customWidgets = [];
        this._customWidgetsSub = Subscription.EMPTY;
        this._threeColumnsLayout = '{"widgetType":0,' +
            '"content":[],"styles":{},"visibility":{"condition":"true"},"columns":[0.34,0.33,0.33],' +
            '"content":' +
            '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
        this._fourColumnsLayout = '{"widgetType":0,"content":[],"styles":{},"visibility":{"condition":"true"},' +
            '"columns":[0.25,0.25,0.25,0.25],"content":' +
            '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    openDialog(idx) {
        this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
        this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
        this._dialogRef.componentInstance.position = idx;
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (s != null) {
                s.unsubscribe();
            }
            this.service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this.service.dragEnded();
    }
    /**
     *  sign the enter of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    onDragEnterHandler(array, index) {
        this.service.dragEnter(array, index);
    }
    /**
     * sign the leave of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragLeaveHandler() {
        this.service.dragLeave();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._customWidgetsSub = this.service.customWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.customWidgets = x;
            if (this.customWidgets.length > 0 &&
                this.customWidgets[this.customWidgets.length - 1].type == '') {
                this.openDialog(this.customWidgets.length - 1);
            }
        }));
        this.service.addCustomWidgets({
            json: this._threeColumnsLayout,
            type: 'LayoutWidgetWith3Columns',
        });
        this.service.addCustomWidgets({
            json: this._fourColumnsLayout,
            type: 'LayoutWidgetWith4Columns'
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._customWidgetsSub.unsubscribe();
        this.service.resetCustomWidgets();
    }
}
AjfReportBuilderCustomWidgetsToolbar.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-custom-widgets-toolbar',
                styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}"],
                template: "<mat-toolbar><ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\"><ajf-report-builder-custom-widget-toolbar-button cdkDrag [cdkDragData]=\"t\" [widgetType]=\"t.type\" [position]=\"i\" (cdkDragStarted)=\"onDragStartHandler()\" (cdkDragEnded)=\"onDragEndHandler();\" (click)=\"openDialog(i)\"></ajf-report-builder-custom-widget-toolbar-button></ng-template></mat-toolbar>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderCustomWidgetsToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderFormsAnalyzerDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     * @param {?} _
     */
    constructor(_service, _dialogRef, _) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.aggregationTypes = sizedEnumToStringArray(AjfAggregationType);
        //  operators is an array of any type that contains all allow operators
        this.operators = [
            'true', 'false', '( )', '\' \'',
            '<', '<=', '>=', '>', '!=', '!',
            '&&', '||',
            '+', '-', '*', '/', '%', '=='
        ];
        this.formulaText = '';
        this.formulaDate = '';
        this.safeFormulaText = '';
        this.label = '';
        this.condition = '';
        this.aggregationType = AjfAggregationType.Sum;
        this.currentId = 0;
        this.currentIndex = 0;
        this.labels = [];
        this.currentWidget = null;
        this.formsVariablesName = [];
        this.formsVariablesType = [];
        this._formAnalyzerSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this._first = true;
        if (this.init == false) {
            this.formulaText = '';
            this.aggregationType = AjfAggregationType.Sum;
        }
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                this.currentWidget = (/** @type {?} */ (x));
                if (this.currentWidget.widgetType == 2) {
                    /** @type {?} */
                    let myObj = (/** @type {?} */ (this.currentWidget));
                    if (myObj.imageType == AjfImageType.Flag) {
                        this.formula = (myObj.flag) ? myObj.flag.formula : '';
                    }
                    else {
                        this.formula = (myObj.icon) ? myObj.icon.formula : '';
                    }
                }
            }
        }));
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (x != null) {
                this.formsVariables = x;
            }
        }));
    }
    /**
     * @return {?}
     */
    onEditorInit() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2015,
            allowNonTsExtensions: true,
            allowJs: true,
            module: monaco.languages.typescript.ModuleKind.None
        });
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-variables.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = '';
        }
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-functions.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-functions.d.ts'] = '';
        }
        this._initFormsVariablesNames();
        this._updateVariables();
        this._updateFunctions();
    }
    /**
     * @private
     * @return {?}
     */
    _initFormsVariablesNames() {
        this.formsVariables.forEach((/**
         * @param {?} formVar
         * @return {?}
         */
        (formVar) => {
            formVar.names.forEach((/**
             * @param {?} name
             * @return {?}
             */
            (name) => {
                this.formsVariablesName.push(name);
            }));
            formVar.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            (type) => {
                this.formsVariablesType.push(this._fieldVarType(type) || '');
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateVariables() {
        if (this.formsVariables == null) {
            return;
        }
        try {
            /** @type {?} */
            let value = '';
            for (let i = 0; i < this.formsVariablesName.length; i++) {
                value += `declare const ${this.formsVariablesName[i]}: ${this.formsVariablesType[i]};`;
            }
            value += `\n`;
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = value;
        }
        catch (e) { }
    }
    /**
     * @private
     * @return {?}
     */
    _updateFunctions() {
        try {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-functions.d.ts'] = AjfValidatedProperty.UTIL_FUNCTIONS;
        }
        catch (e) { }
    }
    /**
     * @private
     * @param {?} fieldType
     * @return {?}
     */
    _fieldVarType(fieldType) {
        switch (fieldType) {
            case AjfFieldType.Boolean:
                return 'boolean';
            case AjfFieldType.Date:
            case AjfFieldType.DateInput:
            case AjfFieldType.Time:
                return 'Date';
            case AjfFieldType.Empty:
                return 'void';
            case AjfFieldType.Formula:
                return 'number';
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return 'any';
            case AjfFieldType.Number:
                return 'number';
            case AjfFieldType.Table:
                return 'Array';
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'string';
        }
        return null;
    }
    /**
     * @param {?} id
     * @param {?} label
     * @param {?} index
     * @return {?}
     */
    setCurrent(id, label, index) {
        if (!this.init) {
            this.label = label;
            this.init = true;
        }
        this.insertVariable(this.formsVariables[id].names[index] || '');
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setCurrentId(id) {
        this.currentId = id;
        this.labels = this.formsVariables[id].labels;
        this._updateVariables();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setAggregationType(type) {
        this.aggregationType = type;
    }
    /**
     * @return {?}
     */
    checkValidation() {
        if (this.validateFormula()) {
            this.safeFormulaText = this.formulaText;
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
        if (this.formulaText == '') {
            this.isValid = false;
        }
    }
    /**
     * @return {?}
     */
    validateFormula() {
        if (this.formulaText == '') {
            this.init = false;
        }
        if (this.formsVariables == null) {
            return false;
        }
        else {
            return AjfFormula.validate(this.formulaText, this.formsVariablesName);
        }
    }
    /**
     * @return {?}
     */
    saveDataset() {
        if (this.currentWidget != null) {
            switch (this.currentWidget.widgetType) {
                case 2:
                    this.saveImageFormula();
                case 3:
                    this.saveFormulaHtml();
                    break;
                case 4:
                    this.saveChartFormula();
                    break;
                case 5:
                    this.saveTableFormula();
                    break;
            }
        }
        this.close();
    }
    /**
     * @return {?}
     */
    saveImageFormula() {
        this._service.saveImageFormula(new AjfFormula(this.formulaText));
    }
    /**
     * @return {?}
     */
    saveFormulaHtml() {
        this._service.saveFormulaToHtml(this.formulaText, this.reference);
    }
    /**
     * @return {?}
     */
    saveChartFormula() {
        this._service.saveChartFormula(this.label, this.level, this.mainIndex, this.index, this.formulaText, this.aggregationType);
    }
    /**
     * @return {?}
     */
    saveTableFormula() {
        this._service.saveTableFormula(this.label, this.aggregationType, this.formulaText, this.mainIndex, this.index);
    }
    /**
     * @return {?}
     */
    hideErrorMessage() {
        if (this.errorMessage == null) {
            return;
        }
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    insertVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            const editor = this.monacoEditor.editor;
            /** @type {?} */
            let value = editor.getValue().split('\n');
            /** @type {?} */
            let position = editor.getPosition();
            /** @type {?} */
            const ln = position.lineNumber - 1;
            /** @type {?} */
            let line = value[ln];
            /** @type {?} */
            let col = position.column - 1;
            line = line.substring(0, col) + variable + line.substring(col);
            value[ln] = line;
            position.column += variable.length;
            this.monacoEditor.value = value.join('\n');
            editor.setPosition(position);
            editor.focus();
            this.formulaText = editor.getValue();
            this.checkValidation();
        }
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    setVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            const editor = this.monacoEditor.editor;
            editor.setValue(variable);
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.formulaText = '';
        this.aggregationType = AjfAggregationType.None;
    }
    /**
     * @return {?}
     */
    close() {
        this.reset();
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formulaText = this.formula;
        this.aggregationType = this.aggregation;
        this.label = this.labelText;
        if (this.formulaText == '' || this.formulaText == null) {
            this.isValid = false;
        }
        else {
            this.isValid = true;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
            this.insertVariable(this.formulaText || '');
            this._first = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._formAnalyzerSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderFormsAnalyzerDialog.decorators = [
    { type: Component, args: [{selector: 'forms-analyzer-dialog',
                template: "<h3 matDialogTitle>Formula editor</h3><div mat-dialog-content #elem><ng-template [ngIf]=\"currentWidget != null && formsVariables != null\"><div class=\"ajf-left\"><mat-list><mat-list-item *ngFor=\"let operator of operators\"><button mat-button (click)=\"insertVariable(operator)\"><h4 matLine>{{operator}}</h4></button></mat-list-item></mat-list></div><div class=\"ajf-main\"><mat-select *ngIf=\"!isFormula\" placeholder=\"Select type of agregation\" [(ngModel)]=\"aggregationType\"><mat-option [value]=\"idx\" *ngFor=\"let ag of aggregationTypes; let idx = index\">{{ ag }}</mat-option></mat-select><mat-form-field *ngIf=\"!isFormula\"><textarea matInput placeholder=\"Name field\" [(ngModel)]=\"label\"></textarea></mat-form-field><ajf-monaco-editor (init)=\"onEditorInit()\" (valueChange)=\"formulaText = $event;checkValidation();\" [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor></div><div class=\"ajf-menu\"><form><mat-select placeholder=\"Select form\" (change)=\"setCurrentId($event.value)\"><ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\"><mat-option [value]=\"id\">{{ id }}</mat-option></ng-template></mat-select></form><mat-list><h3 matSubheader>Field list</h3><mat-list-item *ngFor=\"let label of labels;let i = index\"><button mat-button (click)=\"setCurrent(currentId, label, i)\"><h4 matLine>{{label}}</h4></button></mat-list-item></mat-list></div></ng-template></div><div mat-dialog-actions><button mat-button (click)=\"saveDataset()\" [disabled]=\"!isValid\">Save</button></div>",
                styles: ["forms-analyzer-dialog{height:512px}forms-analyzer-dialog h4[matLine]{font-size:xx-small}forms-analyzer-dialog [mat-dialog-content]{flex-direction:row;display:flex;align-items:stretch;min-width:1000px}forms-analyzer-dialog [mat-dialog-content] .ajf-left{flex:1 0 10%;width:10%;overflow-y:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-left form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog [mat-dialog-content] .ajf-main{flex:1 0 55%;min-width:512px}forms-analyzer-dialog [mat-dialog-content] .ajf-main monaco-editor{height:450px;min-width:300px}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-select{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field textarea{width:auto;height:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-main textarea{width:80%;height:75px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu{flex:1 0 30%;overflow-y:auto;min-width:350px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu form>mat-select{width:90%;margin-left:10px;margin-right:10px}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderFormsAnalyzerDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef },
    { type: AjfValidationService }
];
AjfReportBuilderFormsAnalyzerDialog.propDecorators = {
    formula: [{ type: Input }],
    isFormula: [{ type: Input }],
    labelText: [{ type: Input }],
    aggregation: [{ type: Input }],
    init: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    mainIndex: [{ type: Input }],
    reference: [{ type: Input }],
    formulaTextArea: [{ type: ViewChild, args: ['formulaTextArea',] }],
    errorMessage: [{ type: ViewChild, args: ['errorMessage',] }],
    monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component provides the support for connect the form fields with the report
 *
 * @export
 */
class AjfReportBuilderFormsAnalyzer {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.currentWidget = null;
        this.forms = [];
        this.choicesOrigins = {};
        this.currentMainDataIndex = -1;
        this._dataset = [];
        this._currentWidgetSub = Subscription.EMPTY;
        this._formAnalyzerSub = Subscription.EMPTY;
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                this.currentWidget = x;
                // this._dataset = myObj.dataset;
            }
            else {
                this.currentWidget = null;
            }
        }));
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (x != null) {
                this.formsVariables = x;
            }
        }));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setCurrentIndex(index) {
        this.currentMainDataIndex = index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isSelected(index) {
        if (index === this.currentMainDataIndex) {
            return 'primary';
        }
        else {
            return '';
        }
    }
    /**
     *  get the X components label of the chart.
     *  they are contained in the first row of dataset
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getMainData() {
        if (this._dataset[0] != null) {
            /** @type {?} */
            let mainData = [];
            for (let i = 0; i < this._dataset[0].length; i++) {
                mainData.push(this._dataset[0][i].label);
            }
            return mainData;
        }
        else {
            return [];
        }
    }
    /**
     *  get the Y components label of the chart.
     *  they are contained in the first column of dataset
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getDataset() {
        /** @type {?} */
        let dataset = [];
        if (this._dataset[0] != null) {
            for (let i = 1; i < this._dataset.length; i++) {
                dataset.push(this._dataset[i][0].label);
            }
            return dataset;
        }
        else {
            return [];
        }
    }
    /**
     * get the related data label of the chart.
     * they are contained in the row of the Y component
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getRelatedData() {
        if (this._dataset[this.currentMainDataIndex + 1] != null) {
            /** @type {?} */
            let relatedData = [];
            for (let i = 1; i < this._dataset[this.currentMainDataIndex + 1].length; i++) {
                relatedData.push(this._dataset[this.currentMainDataIndex + 1][i].label);
            }
            return relatedData;
        }
        else {
            return [];
        }
    }
    /**
     * @return {?}
     */
    getTableHeader() {
        /** @type {?} */
        let mainData = [];
        if (this._dataset != null) {
            for (let i = 0; i < this._dataset.length; i++) {
                if (this._dataset[i][0] != null) {
                    mainData.push(this._dataset[i][0].label);
                }
            }
        }
        return mainData;
    }
    /**
     * @return {?}
     */
    getTableData() {
        if (this._dataset[this.currentMainDataIndex] != null) {
            /** @type {?} */
            let tableData = [];
            for (let i = 1; i < this._dataset[this.currentMainDataIndex].length; i++) {
                if (this._dataset[this.currentMainDataIndex][i] != null) {
                    tableData.push(this._dataset[this.currentMainDataIndex][i].label);
                }
            }
            return tableData;
        }
        else {
            return [];
        }
    }
    /**
     * @return {?}
     */
    needMainData() {
        /** @type {?} */
        let myObj = (/** @type {?} */ (this.currentWidget));
        if (myObj.chartType === AjfChartType.Scatter ||
            myObj.chartType === AjfChartType.Bubble) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeMainData(index) {
        this._service.removeMainData(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeDataset(index) {
        this.currentMainDataIndex = index;
        this._service.removeRelatedData(this.currentMainDataIndex, -1);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeTableMainData(index) {
        this._service.removeTableMainData(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeRelatedData(index) {
        this._service.removeRelatedData(this.currentMainDataIndex, index);
    }
    /**
     * @param {?} mainIndex
     * @param {?} index
     * @return {?}
     */
    removeData(mainIndex, index) {
        this._service.removeData(mainIndex, index);
    }
    /**
     *
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @param {?} level
     * @param {?} mainIndex
     * @param {?} index
     * @param {?} editMode
     *
     * @return {?}
     */
    openDialog(level, mainIndex, index, editMode) {
        this.dialogRef = this.dialog.open(AjfReportBuilderFormsAnalyzerDialog);
        if (editMode) {
            if (level === 1 && index === -1) {
                index = 0;
            }
            if (level === 1) {
                if (this.currentWidget != null &&
                    this.currentWidget.widgetType == AjfReportWidgetType.Chart) {
                    mainIndex++;
                }
                index++;
            }
            this.dialogRef.componentInstance.labelText =
                this._dataset[mainIndex] &&
                    this._dataset[mainIndex][index].label || '';
            /* this.dialogRef.componentInstance.formula =
              this._dataset[mainIndex] &&
              this._dataset[mainIndex][index].formula.formula || ''; */
            this.dialogRef.componentInstance.aggregation =
                this._dataset[mainIndex] &&
                    this._dataset[mainIndex][index].aggregation.aggregation || AjfAggregationType.None;
        }
        else {
            this.dialogRef.componentInstance.labelText = '';
            this.dialogRef.componentInstance.formula = '';
            this.dialogRef.componentInstance.aggregation = 0;
        }
        // this.dialogRef.componentInstance.formsVariables = this.formsVariables;
        this.dialogRef.componentInstance.currentWidget = (/** @type {?} */ (this.currentWidget));
        this.dialogRef.componentInstance.level = level;
        this.dialogRef.componentInstance.mainIndex = mainIndex;
        this.dialogRef.componentInstance.index = index;
        this.dialogRef.componentInstance.init = false;
    }
    /**
     * @return {?}
     */
    openDialogAddMainData() {
        this.openDialog(0, -1, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartEditMainData() {
        this.openDialog(0, 0, this.currentMainDataIndex, true);
    }
    /**
     * @return {?}
     */
    openDialogTableEditMainData() {
        this.openDialog(0, this.currentMainDataIndex, 0, true);
    }
    /**
     * @return {?}
     */
    openDialogChartAddDataset() {
        this.openDialog(1, -1, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogTableAddDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartAddDataOfDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartEditDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, true);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openDialogTableEditDataset(index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openDialogChartEditDataOfDataset(index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
        this._formAnalyzerSub.unsubscribe();
    }
}
AjfReportBuilderFormsAnalyzer.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-forms-analyzer',
                template: "<ng-template [ngIf]=\"currentWidget != null && formsVariables != null\"><ng-template [ngIf]=\"currentWidget.widgetType == 4\"><ng-template [ngIf]=\"needMainData()\"><mat-tab-group><mat-tab [label]=\"'Main Data' | translate\"><button mat-button (click)=\"openDialogAddMainData()\" style=\"width:100%;\">Add Main Data</button><mat-grid-list rowHeight=\"50px\" cols=\"3\"><ng-template ngFor let-label [ngForOf]=\"getMainData()\" let-idx=\"index\"><mat-grid-tile>{{ label }}</mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"setCurrentIndex(idx);openDialogChartEditMainData()\">Edit</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"removeMainData(idx)\">Remove</button></mat-grid-tile></ng-template></mat-grid-list><div class=\"ajf-ui ajf-divider\"></div></mat-tab></mat-tab-group></ng-template><mat-tab-group><mat-tab label=\"dataset\"><button mat-button (click)=\"openDialogChartAddDataset()\" style=\"width:100%\">add dataset</button><mat-grid-list rowHeight=\"50px\" cols=\"4\"><ng-template ngFor let-label [ngForOf]=\"getDataset()\" let-idx=\"index\"><mat-grid-tile><button mat-button color=\"{{isSelected(idx)}}\" (click)=\"setCurrentIndex(idx)\">{{ label }}</button></mat-grid-tile><mat-grid-tile><button mat-button (click)=\"setCurrentIndex(idx);openDialogChartAddDataOfDataset()\" style=\"width:100%\">add data</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"setCurrentIndex(idx);openDialogChartEditDataset()\">Edit</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"removeDataset(idx)\">Remove</button></mat-grid-tile></ng-template></mat-grid-list></mat-tab><mat-tab label=\"data\"><mat-grid-list rowHeight=\"50px\" cols=\"3\"><ng-template ngFor let-label [ngForOf]=\"getRelatedData()\" let-idx=\"index\"><mat-grid-tile>{{ label }}</mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"openDialogChartEditDataOfDataset(idx)\">Edit</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"removeRelatedData(idx)\">Remove</button></mat-grid-tile></ng-template></mat-grid-list><div class=\"ajf-ui ajf-divider\"></div></mat-tab></mat-tab-group></ng-template><ng-template [ngIf]=\"currentWidget.widgetType == 5\"><ng-template [ngIf]=\"needMainData()\"><mat-tab-group><mat-tab [label]=\"'Main Data' | translate\"><button mat-button (click)=\"openDialogAddMainData()\" translate style=\"width:100%;\">Add Main Data</button><mat-grid-list rowHeight=\"50px\" cols=\"4\"><ng-template ngFor let-label [ngForOf]=\"getTableHeader()\" let-idx=\"index\"><mat-grid-tile><button mat-button color=\"{{isSelected(idx)}}\" (click)=\"setCurrentIndex(idx)\">{{ label }}</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"setCurrentIndex(idx);openDialogTableAddDataset()\" style=\"width:100%\">add data</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"setCurrentIndex(idx);openDialogTableEditMainData()\">Edit</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"removeTableMainData(idx)\">Remove</button></mat-grid-tile></ng-template></mat-grid-list><div class=\"ajf-ui ajf-divider\"></div></mat-tab><mat-tab [label]=\"'data' | translate\"><mat-grid-list rowHeight=\"50px\" cols=\"3\"><ng-template ngFor let-label [ngForOf]=\"getTableData()\" let-idx=\"index\"><mat-grid-tile>{{ label }}</mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"openDialogTableEditDataset(idx)\">Edit</button></mat-grid-tile><mat-grid-tile><button mat-button translate (click)=\"removeData(currentMainDataIndex, idx + 1)\">Remove</button></mat-grid-tile></ng-template></mat-grid-list><div class=\"ajf-ui ajf-divider\"></div></mat-tab></mat-tab-group></ng-template></ng-template></ng-template>",
                styles: ["ajf-report-builder-forms-analyzer{min-height:512px}ajf-report-builder-forms-analyzer .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-report-builder-forms-analyzer .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer mat-dialog-container{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-report-builder-forms-analyzer .mat-list-item-content{position:normal!important;display:block!important;height:350px!important}ajf-report-builder-forms-analyzer mat-tab-group .mat-list-item-content,ajf-report-builder-forms-analyzer mat-tab-group .mat-tab-body-wrapper{position:normal!important;display:block!important;height:350px!important}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderFormsAnalyzer.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImageFilterPipe {
    /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    transform(items, args) {
        return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => (args.length === 0) || item.info.toLowerCase().includes(args.toLowerCase())));
    }
}
AjfImageFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ajfImageFilter'
            },] },
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component handle a group of image object
 * there are 2 types of view
 *  ajf-icon and class
 *
 * take a json in input
 *  'icon': 'false', // if true ajf-icon activated
 *  'class': ['flag-icon'], // add class in object style
 *  'prefixClass': 'flag-icon-', // prefix of class contained on data set
 *  'title': 'flags', title of data set
 *  'data': [
 *    {
 *      'class': 'dz', strind added on prefix
 *      'info': 'Algeria' info related to object (exploit on toolTip)
 *    }
 *  ]
 * };
 *
 * @export
 */
class AjfReportBuilderImageGroup {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._icon = null;
        this._classes = '';
        this.open = false;
        this.valueToSearch = '';
        /**
         * this event is fired when the user click on formula button on quill editor rool barƒ
         *
         * \@memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
     * @return {?}
     */
    get classes() { return this._classes; }
    /**
     * @param {?} fontSet
     * @param {?} fontIcon
     * @return {?}
     */
    setIcon(fontSet, fontIcon) {
        this._icon = { fontSet, fontIcon };
        this._service.setIcon(this._icon);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setFlag(value) {
        this._classes = value;
        this._service.setFlag(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSearch(value) {
        this.valueToSearch = value.currentTarget.value;
    }
    /**
     * @return {?}
     */
    emitFormula() {
        this.formulaClick.emit();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getFlag(value) {
        /** @type {?} */
        let returnValue = '';
        for (let i = 0; i < this.data.class.length; i++) {
            returnValue += this.data.class[i] + ' ';
        }
        returnValue += this.data.prefixClass + value;
        return returnValue;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.open = !this.open;
    }
}
AjfReportBuilderImageGroup.decorators = [
    { type: Component, args: [{selector: 'ajf-image-group',
                template: "<ng-template [ngIf]=\"data != null\"><button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button><ng-template [ngIf]=\"open\"><button mat-button (click)=\"emitFormula()\">Set formula</button><mat-card *ngIf=\"data.icon === 'true'\"><mat-card-header>{{data.title}}</mat-card-header><mat-card-content><mat-grid-list cols=\"3\" rowHeight=\"100px\"><ng-container *ngFor=\"let value of data.data\"><mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\"><button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button><mat-icon [fontSet]=\"value.name\" [fontIcon]=\"icon.name\"></mat-icon></button></mat-grid-tile></ng-container></mat-grid-list></mat-card-content></mat-card><mat-card *ngIf=\"data.icon === 'false'\"><mat-card-header><mat-card-title>{{data.title}}</mat-card-title><mat-card-subtitle><mat-form-field><input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\"></mat-form-field></mat-card-subtitle></mat-card-header><mat-card-content><div class=\"ajf-image-group-container\"><mat-grid-list cols=\"3\"><mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\"><button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button><span class=\"{{getFlag(value.class)}}\" style=\"width: 100%;height: 100%;\"></span></button></mat-grid-tile></mat-grid-list></div></mat-card-content></mat-card><ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer></ng-template></ng-template>",
                styles: ["ajf-image-group mat-grid-list{height:300px!important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px!important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderImageGroup.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderImageGroup.propDecorators = {
    data: [{ type: Input }],
    formulaClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderProperties {
    /**
     * @param {?} _dialog
     * @param {?} service
     */
    constructor(_dialog, service) {
        this._dialog = _dialog;
        this.service = service;
        /**
         *  true when the first time chart type is setted
         *
         * \@memberOf AjfReportBuilderProperties
         */
        this.initChartType = false;
        /**
         * the current widget
         *
         * \@memberOf AjfReportBuilderProperties
         */
        this.currentWidget = null;
        /**
         * this array contains the forms exploited for generate data labels
         *
         * \@memberOf AjfReportBuilderProperties
         */
        this.forms = [];
        this.colors = [];
        /**
         * FAKE DATA
         */
        this.formsJson = { forms: [] };
        /**
         * WIDGET
         */
        this.widgetName = '';
        this.marginExpanded = false;
        this.paddingExpanded = false;
        this.borderWidthExpanded = false;
        this.borderRadiusExpanded = false;
        this.backgroundColor = '#127bdc';
        this.styleBackgroundColor = 'rgb(255,255,255,0)';
        this.borderColor = '#127bdc';
        this.styleColor = 'rgb(0,0,0,0)';
        this.align = [false, 'center', 'right', 'justify'];
        this.fonts = [
            false,
            'blackr',
            'black-italic',
            'bold',
            'bold-condensed',
            'bold-condensed-italic',
            'bold-italic',
            'condensed',
            'condensed-italic',
            'italic',
            'light',
            'light-italic',
            'medium',
            'medium-italic',
            'thinr',
            'thin-italic'
        ];
        this.currentModule = {};
        this.quillModules = {
            toolbar: [
                ['formula'],
                ['bold', 'italic', 'underline', 'strike'],
                // ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                // [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': this.colors },
                    { 'background': this.colors }],
                [{ 'font': this.fonts }],
                [{ 'align': this.align }],
                ['clean'],
            ]
        };
        this.chartBorderColor = [];
        this.chartBorderWidth = 3;
        /**
         *
         * IMAGE
         */
        this.imageUrl = 'https://angular.io/resources/images/logos/angular2/angular.png';
        /**
         *
         * TEXT
         */
        this.htmlText = '';
        /**
         * these variables indicate that the user want to change section
         */
        this.reportStyles = false;
        this.sectionStyles = false;
        this.widgetStyles = true;
        this.sectionColor = false;
        this.widgetColor = false;
        this.visibilitySection = false;
        this.currentColor = '';
        this._icon = null;
        this.iconSet = {
            'icon': 'true',
            'title': 'report',
            'data': null
        };
        this.flagSet = {
            'icon': 'false',
            'class': ['flag-icon'],
            'prefixClass': 'flag-icon-',
            'title': 'flags',
            'data': [
                {
                    'class': 'dz',
                    'info': 'Algeria'
                },
                {
                    'class': 'ao',
                    'info': 'Angola'
                },
                {
                    'class': 'bj',
                    'info': 'Benin'
                },
                {
                    'class': 'bw',
                    'info': 'Botswana'
                },
                {
                    'class': 'bf',
                    'info': 'Burkina Faso'
                },
                {
                    'class': 'bi',
                    'info': 'Burundi'
                },
                {
                    'class': 'cm',
                    'info': 'Cameroon'
                },
                {
                    'class': 'cv',
                    'info': 'Cabo Verde'
                },
                {
                    'class': 'cf',
                    'info': 'The Central African Republic'
                },
                {
                    'class': 'td',
                    'info': 'Chad'
                },
                {
                    'class': 'km',
                    'info': 'The Comoros'
                },
                {
                    'class': 'ci',
                    'info': 'Cote D\'avoire'
                },
                {
                    'class': 'cd',
                    'info': 'The Democratic Republic of Congo'
                },
                {
                    'class': 'dj',
                    'info': 'Dijibouti'
                },
                {
                    'class': 'eg',
                    'info': 'Egypt'
                },
                {
                    'class': 'gq',
                    'info': 'Equatorial Guinea'
                },
                {
                    'class': 'er',
                    'info': 'Eritrea'
                },
                {
                    'class': 'et',
                    'info': 'Ethiopia'
                },
                {
                    'class': 'tf',
                    'info': 'French Southern Territories'
                },
                {
                    'class': 'ga',
                    'info': 'Gabon'
                },
                {
                    'class': 'gm',
                    'info': 'The Gambia'
                },
                {
                    'class': 'gh',
                    'info': 'Ghana'
                },
                {
                    'class': 'gn',
                    'info': 'Guinea'
                },
                {
                    'class': 'gw',
                    'info': 'Guinea-Bissau'
                },
                {
                    'class': 'ke',
                    'info': 'Kenya'
                },
                {
                    'class': 'ls',
                    'info': 'Leshotho'
                },
                {
                    'class': 'lr',
                    'info': 'Liberia'
                },
                {
                    'class': 'ly',
                    'info': 'Libya'
                },
                {
                    'class': 'mg',
                    'info': 'Madagascar'
                },
                {
                    'class': 'mw',
                    'info': 'Malawy'
                },
                {
                    'class': 'ml',
                    'info': 'Mali'
                },
                {
                    'class': 'mr',
                    'info': 'Mauritania'
                },
                {
                    'class': 'mu',
                    'info': 'Mauritius'
                },
                {
                    'class': 'yt',
                    'info': 'Mayotte'
                },
                {
                    'class': 'ma',
                    'info': 'Marocco'
                },
                {
                    'class': 'mz',
                    'info': 'Mozambique'
                },
                {
                    'class': 'na',
                    'info': 'Namibia'
                },
                {
                    'class': 'ne',
                    'info': 'Niger'
                },
                {
                    'class': 'ng',
                    'info': 'Nigeria'
                },
                {
                    'class': 'cg',
                    'info': 'Republic of the Congo'
                },
                {
                    'class': 'rw',
                    'info': 'Rwnda'
                },
                {
                    'class': 're',
                    'info': 'rèunion'
                },
                {
                    'class': 'sh',
                    'info': 'Saint Helena, Ascension and Tristan da Cunha'
                },
                {
                    'class': 'st',
                    'info': 'Sao Tome and Principe'
                },
                {
                    'class': 'sn',
                    'info': 'Senegal'
                },
                {
                    'class': 'sc',
                    'info': 'Seychelles'
                },
                {
                    'class': 'sl',
                    'info': 'Sierra Leone'
                },
                {
                    'class': 'so',
                    'info': 'Somalia'
                },
                {
                    'class': 'za',
                    'info': 'South Africa'
                },
                {
                    'class': 'ss',
                    'info': 'South Sudan'
                },
                {
                    'class': 'sd',
                    'info': 'Sudan'
                },
                {
                    'class': 'sz',
                    'info': 'Swaziland'
                },
                {
                    'class': 'tz',
                    'info': 'Tanzania'
                },
                {
                    'class': 'tg',
                    'info': 'Togo'
                },
                {
                    'class': 'tn',
                    'info': 'Tunisia'
                },
                {
                    'class': 'ug',
                    'info': 'Uganda'
                },
                {
                    'class': 'eh',
                    'info': 'Western Sahara'
                },
                {
                    'class': 'zm',
                    'info': 'Zambia'
                },
                {
                    'class': 'zw',
                    'info': 'Zimbawe'
                },
                {
                    'class': 'iq',
                    'info': 'Iraq'
                },
                {
                    'class': 'lb',
                    'info': 'Lebanon'
                },
                {
                    'class': 'bd',
                    'info': 'Bangladesh'
                },
                {
                    'class': 'ir',
                    'info': 'Iran (Islamic Republic of)'
                },
                {
                    'class': 'my',
                    'info': 'Malaysia'
                },
                {
                    'class': 'np',
                    'info': 'Nepal'
                },
                {
                    'class': 'pk',
                    'info': 'Pakistan'
                },
                {
                    'class': 'th',
                    'info': 'Thailand'
                },
                {
                    'class': 'jo',
                    'info': 'Jordan'
                },
                {
                    'class': 'ye',
                    'info': 'Yemen'
                }
            ]
        };
        this._currentWidgetSub = Subscription.EMPTY;
        this._formsSub = Subscription.EMPTY;
        this._colorSub = Subscription.EMPTY;
        this._headerStyleSub = Subscription.EMPTY;
        this._contentStylesSub = Subscription.EMPTY;
        this._footerStylesSub = Subscription.EMPTY;
        this._originSub = Subscription.EMPTY;
        this._stylesUpdatesSubs = Subscription.EMPTY;
        this._updateWidgetMarginEvt = new EventEmitter();
        this._updateWidgetPaddingEvt = new EventEmitter();
        this._updateWidgetBorderWidthEvt = new EventEmitter();
        this._updateWidgetBorderRadiusEvt = new EventEmitter();
        this.tabValue = 'backgroundColor';
        this.setForms();
        this.iconSet.data = Object.keys(service.iconSets).filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x != 'ajf-icon')).map((/**
         * @param {?} i
         * @return {?}
         */
        i => {
            return { name: i, icons: service.iconSets[i] };
        }));
        this._headerStyleSub = this.service.headerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._contentStylesSub = this.service.contentStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._footerStylesSub = this.service.footerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._originSub = this.service.origin.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            this.origin = s;
        }));
    }
    /**
     * @return {?}
     */
    get currentLayoutWidget() {
        return (/** @type {?} */ (this.currentWidget));
    }
    /**
     * @return {?}
     */
    get currentTextWidget() {
        return (/** @type {?} */ (this.currentWidget));
    }
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
       *
       * UTILS
       */
    /**
     * return a number value
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    toNumber(value) {
        /** @type {?} */
        let numberPattern = /^(-)?\d+/g;
        if (value == null) {
            return 0;
        }
        else {
            /** @type {?} */
            const matches = value.match(numberPattern);
            if (matches == null || matches.length == 0) {
                return 0;
            }
            return Number(matches[0]);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toNumberArray(value) {
        if (value == null) {
            return [];
        }
        else {
            return (value || '').replace('px', '').split(' ')
                .filter((/**
             * @param {?} v
             * @return {?}
             */
            v => v !== '' && v != null))
                .map((/**
             * @param {?} v
             * @return {?}
             */
            v => this.toNumber(v)));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fillPxNumberArray(value) {
        /** @type {?} */
        const vl = value.length;
        switch (vl) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                /** @type {?} */
                const v = value[0];
                return [v, v, v, v];
            case 2:
                /** @type {?} */
                const v21 = value[0];
                /** @type {?} */
                const v22 = value[1];
                return [v21, v22, v21, v22];
            case 3:
                /** @type {?} */
                const v31 = value[0];
                /** @type {?} */
                const v32 = value[1];
                /** @type {?} */
                const v33 = value[2];
                return [v31, v32, v33, v32];
            default:
                return value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    percent(value) {
        /** @type {?} */
        let temp = this.roundTo(value * 100, 3);
        return temp;
    }
    /**
     * @param {?} value
     * @param {?} decimalPositions
     * @return {?}
     */
    roundTo(value, decimalPositions) {
        /** @type {?} */
        let i = value * Math.pow(10, decimalPositions);
        i = Math.floor(i);
        return i / Math.pow(10, decimalPositions);
    }
    /**
     * call to service to set the forms
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    setForms() {
        /** @type {?} */
        let forms = [];
        try {
            for (let i = 0; i < this.formsJson.forms.length; i++) {
                forms.push(AjfForm.fromJson(this.formsJson.forms[i]));
            }
            this.service.setReportForms(forms);
        }
        catch (e) { }
    }
    /**
     * call to service to set the width of the idx column of layout widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} col
     * @param {?} idx
     *
     * @return {?}
     */
    instantColumnValue(col, idx) {
        this.service.instantColumnValue(col, idx);
    }
    /**
     *  force copy of style
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    // TODO delete this
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this.service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * call to service to add new style to widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setWidgetStyles(label, value) {
        this.service.setWidgetStyles(label, value);
        this.currentColor = value;
        this.setStyle();
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetMargin(idx, value) {
        this._updateWidgetMarginEvt.emit({ idx, value });
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetPadding(idx, value) {
        this._updateWidgetPaddingEvt.emit({ idx, value });
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetBorderWidth(idx, value) {
        this._updateWidgetBorderWidthEvt.emit({ idx, value });
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetBorderRadius(idx, value) {
        this._updateWidgetBorderRadiusEvt.emit({ idx, value });
    }
    /**
     * call to service to add new style to section
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setSectionStyles(label, value) {
        this.service.setSectionStyles(this.origin, label, value);
        this.styleColor = value;
    }
    /**
     * call to service to add new style to report
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setReportStyles(label, value) {
        this.service.setReportStyles(label, value);
        this.styleBackgroundColor = value;
    }
    /**
     * add custom color
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    addCustomColor() {
        this.service.addCustomColor(this.currentColor);
        this.service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * get the module exploit to quill text editor
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     *
     */
    getModule() {
        return this.quillModules;
    }
    /**
     * true is the input type value is equal to current widget type
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     * @return {?}
     *
     */
    isChartTypeSelected(value) {
        if (this.initChartType == false) {
            return false;
        }
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.currentWidget));
        if (value === myObj.chartType) {
            return true;
        }
        else {
            return false;
        }
    }
    /* layout functions */
    /**
     * call to service to add a column to current layout widget
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    addColumn() {
        this.service.addColumn();
    }
    /**
     * call to service to add a obj to current layout widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} idx
     *
     * @return {?}
     */
    fixedColumn(idx) {
        this.service.fixedColumn(idx);
    }
    /**
     * call to service to remove obj of current layout widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} idx
     *
     * @return {?}
     */
    unfixedColumn(idx) {
        this.service.remove('unfixedColumn', idx);
    }
    /* image functions */
    /**
     * call to service to set image url
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    setImageUrl() {
        this.service.setImageUrl(this.imageUrl);
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    setIcon(icon) {
        this._icon = icon;
        this.service.setIcon(icon);
    }
    /* chart functions */
    /**
     * call to service to set the type of chart
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} type
     *
     * @return {?}
     */
    setChartType(type) {
        this.initChartType = true;
        this.service.setChartType(type);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChartBorderColor(value) {
        this.service.setChartBorderWidth(value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setTab(event) {
        if (event.index === 0) {
            this.tabValue = 'backgroundColor';
        }
        else {
            this.tabValue = 'borderColor';
        }
    }
    /**
     * call to service to remove background color to current chart
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} index
     *
     * @return {?}
     */
    removeChartBackgroundColor(index) {
        this.service.removeChartBackgroundColor(index);
    }
    /**
     * call to service to remove border color to current chart
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} index
     *
     * @return {?}
     */
    removeChartBorderColor(index) {
        this.service.removeChartBorderColor(index);
    }
    /**
     * @return {?}
     */
    hideMenu() {
        this.service.updateCurrentWidget(null);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openFormulaDialog(event) {
        this.dialogRef = this._dialog.open(AjfReportBuilderFormsAnalyzerDialog);
        this.dialogRef.componentInstance.aggregation = AjfAggregationType.None;
        this.dialogRef.componentInstance.isFormula = true;
        if (event != null && event.reference != null) {
            this.dialogRef.componentInstance.formula = event.formula;
            this.dialogRef.componentInstance.reference = event.reference;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._formsSub = this.service.reportForms
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.forms = x || [];
        }));
        this._currentWidgetSub = this.service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                    this.widgetName = AjfReportWidgetType[x.widgetType];
                    this.reportStyles = false;
                    this.sectionStyles = false;
                    this.widgetStyles = false;
                    this.sectionColor = false;
                    this.widgetColor = false;
                    this.visibilitySection = false;
                }
            }
            else {
                this.currentWidget = null;
                this.widgetName = '';
            }
        }));
        this._colorSub = this.service.colors
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x && x.length > 0) {
                this.colors = x;
                this.quillModules = {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        // ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        // [{ 'direction': 'rtl' }],                         // text direction
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': this.colors },
                            { 'background': this.colors }],
                        [{ 'font': this.fonts }],
                        [{ 'align': this.align }],
                        ['formula'],
                        ['clean'],
                    ]
                };
            }
        }));
        this.getHTML = this.service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget != null) {
                /** @type {?} */
                const myObj = (/** @type {?} */ (this.currentWidget));
                return myObj.htmlText;
            }
            return '';
        })), distinctUntilChanged(), startWith('<p><br></p>'));
        this.getHeightWidget = this.service.currentWidget.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x != null)), map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                /** @type {?} */
                let value = this.toNumber(myObj.styles['height']);
                if (value != null || value != null) {
                    return value;
                }
            }
        })), distinctUntilChanged());
        this.getFontSizeWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return (this.toNumber(myObj.styles['font-size']) || 12);
            }
        })), distinctUntilChanged());
        this.getFontAlignWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return ((myObj.styles['text-align']) || 'center');
            }
        })), distinctUntilChanged());
        this.getBorderWidthWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-width']));
            }
        })), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderWidthWidgetTop = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getBorderWidthWidgetRight = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getBorderWidthWidgetBottom = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getBorderWidthWidgetLeft = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getBorderRadiusWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-radius']));
            }
        })), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderRadiusWidgetTopLeft = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getBorderRadiusWidgetTopRight = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getBorderRadiusWidgetBottomRight = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getBorderRadiusWidgetBottomLeft = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getMarginWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null && myObj.styles['margin'] != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['margin']));
            }
        })), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getMarginWidgetTop = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getMarginWidgetRight = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getMarginWidgetBottom = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getMarginWidgetLeft = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getPaddingWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null && myObj.styles['padding'] != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['padding']));
            }
        })), distinctUntilChanged());
        this.getPaddingWidgetTop = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getPaddingWidgetRight = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getPaddingWidgetBottom = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getPaddingWidgetLeft = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getBackgroundColorWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null) {
                return myObj.styles['backgroundColor'] || '';
            }
        })), distinctUntilChanged());
        this.getColorWidget = this.service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null) {
                return myObj.styles['color'] || '';
            }
        })), distinctUntilChanged());
        this._stylesUpdatesSubs = ((/** @type {?} */ (this._updateWidgetMarginEvt)))
            .pipe(withLatestFrom(this.getMarginWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('margin', v);
        }));
        this._stylesUpdatesSubs.add(((/** @type {?} */ (this._updateWidgetPaddingEvt)))
            .pipe(withLatestFrom(this.getPaddingWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('padding', v);
        })));
        this._stylesUpdatesSubs
            .add(((/** @type {?} */ (this._updateWidgetBorderWidthEvt)))
            .pipe(withLatestFrom(this.getBorderWidthWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('border-width', v);
        })));
        this._stylesUpdatesSubs.add(((/** @type {?} */ (this._updateWidgetBorderRadiusEvt)))
            .pipe(withLatestFrom(this.getBorderRadiusWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('border-radius', v);
        })));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.currentWidget = changes.widget.currentValue;
        if (this.currentWidget == null) {
            return;
        }
        this.widgetName = AjfReportWidgetType[this.currentWidget.widgetType];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
        this._formsSub.unsubscribe();
        this._colorSub.unsubscribe();
        this._headerStyleSub.unsubscribe();
        this._contentStylesSub.unsubscribe();
        this._footerStylesSub.unsubscribe();
        this._originSub.unsubscribe();
        this._stylesUpdatesSubs.unsubscribe();
    }
}
AjfReportBuilderProperties.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-properties',
                template: "<ng-template [ngIf]=\"currentWidget != null\"><div class=\"ajf-content\"><button mat-button class=\"ajf-hide-menu\" matTooltip=\"hide-menu\" (click)=\"hideMenu()\" [matTooltipPosition]=\"'above'\"><mat-icon>remove_circle_outline</mat-icon></button><mat-button-toggle-group class=\"ajf-menu-css\"><mat-button-toggle (click)=\"reportStyles = !reportStyles; sectionStyles = false; widgetStyles = false\" value=\"left\" [ngClass]=\"{'ajf-selected': reportStyles}\">report<ng-container translate>CSS style</ng-container></mat-button-toggle><mat-button-toggle (click)=\"sectionStyles = !sectionStyles; reportStyles = false; widgetStyles = false\" [ngClass]=\"{'ajf-selected': sectionStyles}\">{{ origin }}<ng-container translate>CSS style</ng-container></mat-button-toggle><mat-button-toggle (click)=\"widgetStyles = !widgetStyles; sectionStyles = false; reportStyles = false\" [ngClass]=\"{'ajf-selected': widgetStyles}\">{{ widgetName }}<ng-container translate>CSS style</ng-container></mat-button-toggle></mat-button-toggle-group><div class=\"ajf-style-container\" *ngIf=\"(reportStyles) ? true : false \"><mat-tab-group><mat-tab label=\"Background Color\"><div class=\"ajf-style-panel\"><ajf-theme-color [section]=\"'report'\" [label]=\"'color'\"></ajf-theme-color></div></mat-tab></mat-tab-group></div><div class=\"ajf-style-container\" *ngIf=\"(sectionStyles) ? true : false \"><mat-tab-group><mat-tab label=\"Background Color\"><div class=\"ajf-style-panel\"><ajf-theme-color [section]=\"'section'\" [label]=\"'color'\"></ajf-theme-color></div></mat-tab></mat-tab-group></div><div class=\"ajf-style-container\" *ngIf=\"(widgetStyles) ? true : false \"><mat-tab-group *ngIf=\"(currentWidget.widgetType != 4)\"><mat-tab label=\"Color\"><div class=\"ajf-style-panel\"><ajf-theme-color [section]=\"'widget'\" [label]=\"'color'\" [init]=\"'icon'\"></ajf-theme-color></div></mat-tab><mat-tab label=\"Background Color\"><div class=\"ajf-style-panel\"><ajf-theme-color [section]=\"'widget'\" [label]=\"'background-color'\"></ajf-theme-color></div></mat-tab></mat-tab-group><div class=\"properties-container\" *ngIf=\"(currentWidget.widgetType !== 8)\"><div class=\"ajf-layout-preview\"><div class=\"ajf-vbottom\"><div translate>height</div><div>{{ getHeightWidget|async }}</div></div><div class=\"ajf-margin-box\"><div class=\"ajf-top-label\" translate>margin</div><div class=\"ajf-vtop\">{{ getMarginWidgetTop|async }}</div><div class=\"ajf-vright\">{{ getMarginWidgetRight|async }}</div><div class=\"ajf-vbottom\">{{ getMarginWidgetBottom|async }}</div><div class=\"ajf-vleft\">{{ getMarginWidgetLeft|async }}</div><div class=\"ajf-border-box\"><div class=\"ajf-vtop\">{{ getBorderWidthWidgetTop|async }}</div><div class=\"ajf-vright\">{{ getBorderWidthWidgetRight|async }}</div><div class=\"ajf-vbottom\">{{ getBorderWidthWidgetBottom|async }}</div><div class=\"ajf-vleft\">{{ getBorderWidthWidgetLeft|async }}</div><div class=\"ajf-vtl\">{{ getBorderRadiusWidgetTopLeft|async }}</div><div class=\"ajf-vtr\">{{ getBorderRadiusWidgetTopRight|async }}</div><div class=\"ajf-vbr\">{{ getBorderRadiusWidgetBottomRight|async }}</div><div class=\"ajf-vbl\">{{ getBorderRadiusWidgetBottomLeft|async }}</div><div class=\"ajf-top-label\" translate>border</div><div class=\"ajf-padding-box\"><div class=\"ajf-top-label\" translate>padding</div><div class=\"ajf-vtop\">{{ getPaddingWidgetTop|async }}</div><div class=\"ajf-vright\">{{ getPaddingWidgetRight|async }}</div><div class=\"ajf-vbottom\">{{ getPaddingWidgetBottom|async }}</div><div class=\"ajf-vleft\">{{ getPaddingWidgetLeft|async }}</div><div class=\"ajf-content-box\" translate>content</div></div></div></div></div><mat-grid-list rowHeight=\"2em\" cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\"><span>height</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetStyles('height', $event.value)\" min=\"0\" max=\"200\" step=\"1\" [value]=\"getHeightWidget|async\" tickInterval=\"1\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile><mat-icon *ngIf=\"!marginExpanded\" (click)=\"marginExpanded = !marginExpanded\">keyboard_arrow_right</mat-icon><mat-icon *ngIf=\"marginExpanded\" (click)=\"marginExpanded = !marginExpanded\">keyboard_arrow_down</mat-icon></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\"><span translate>margin</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider [disabled]=\"marginExpanded\" (change)=\"setWidgetStyles('margin', $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getMarginWidgetTop|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><ng-template [ngIf]=\"marginExpanded\"><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>margin top</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetMargin(0, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getMarginWidgetTop|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>margin right</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetMargin(1, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getMarginWidgetRight|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>margin bottom</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetMargin(2, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getMarginWidgetBottom|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>margin left</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetMargin(3, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getMarginWidgetLeft|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list></ng-template><mat-grid-list cols=\"12\"><mat-grid-tile><mat-icon *ngIf=\"!paddingExpanded\" (click)=\"paddingExpanded = !paddingExpanded\">keyboard_arrow_right</mat-icon><mat-icon *ngIf=\"paddingExpanded\" (click)=\"paddingExpanded = !paddingExpanded\">keyboard_arrow_down</mat-icon></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\"><span translate>padding</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetStyles('padding', $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getPaddingWidgetTop|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><ng-template [ngIf]=\"paddingExpanded\"><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>padding top</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetPadding(0, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getPaddingWidgetTop|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>padding right</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetPadding(1, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getPaddingWidgetRight|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>padding bottom</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetPadding(2, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getPaddingWidgetBottom|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>padding left</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetPadding(3, $event.value)\" min=\"-50\" max=\"50\" step=\"1\" [value]=\"getPaddingWidgetLeft|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list></ng-template><mat-grid-list cols=\"12\"><mat-grid-tile><mat-icon *ngIf=\"!borderWidthExpanded\" (click)=\"borderWidthExpanded = !borderWidthExpanded\">keyboard_arrow_right</mat-icon><mat-icon *ngIf=\"borderWidthExpanded\" (click)=\"borderWidthExpanded = !borderWidthExpanded\">keyboard_arrow_down</mat-icon></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\"><span translate>border width</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetStyles('border-width', $event.value)\" min=\"0\" max=\"10\" step=\"1\" [value]=\"getBorderWidthWidgetTop|async\" tickInterval=\"1\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><ng-template [ngIf]=\"borderWidthExpanded\"><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border width top</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderWidth(0, $event.value)\" min=\"1\" max=\"10\" step=\"1\" [value]=\"getBorderWidthWidgetTop|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border width right</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderWidth(1, $event.value)\" min=\"1\" max=\"10\" step=\"1\" [value]=\"getBorderWidthWidgetRight|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border width bottom</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderWidth(2, $event.value)\" min=\"1\" max=\"10\" step=\"1\" [value]=\"getBorderWidthWidgetBottom|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border width left</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderWidth(3, $event.value)\" min=\"1\" max=\"10\" step=\"1\" [value]=\"getBorderWidthWidgetLeft|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list></ng-template><mat-grid-list cols=\"12\"><mat-grid-tile><mat-icon *ngIf=\"!borderRadiusExpanded\" (click)=\"borderRadiusExpanded = !borderRadiusExpanded\">keyboard_arrow_right</mat-icon><mat-icon *ngIf=\"borderRadiusExpanded\" (click)=\"borderRadiusExpanded = !borderRadiusExpanded\">keyboard_arrow_down</mat-icon></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\"><span translate>border radius</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetStyles('border-radius', $event.value)\" min=\"0\" max=\"100\" step=\"1\" [value]=\"getBorderRadiusWidget|async\" tickInterval=\"10\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><ng-template [ngIf]=\"borderRadiusExpanded\"><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border radius top left</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderRadius(0, $event.value)\" min=\"1\" max=\"100\" step=\"1\" [value]=\"getBorderRadiusWidgetTopLeft|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border radius top right</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderRadius(1, $event.value)\" min=\"1\" max=\"100\" step=\"1\" [value]=\"getBorderRadiusWidgetTopRight|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border radius bottom left</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderRadius(2, $event.value)\" min=\"1\" max=\"100\" step=\"1\" [value]=\"getBorderRadiusWidgetBottomLeft|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"4\">&nbsp;&nbsp;<span translate>border radius bottom right</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetBorderRadius(3, $event.value)\" min=\"1\" max=\"100\" step=\"1\" [value]=\"getBorderRadiusWidgetBottomRight|async\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list></ng-template></div><div class=\"properties-container\" *ngIf=\"currentWidget.widgetType === 2\"><mat-grid-list cols=\"12\"><mat-grid-tile></mat-grid-tile><mat-grid-tile class=\"ajf-lal\" colspan=\"3\"><span translate>font size</span></mat-grid-tile><mat-grid-tile colspan=\"7\"><mat-slider (change)=\"setWidgetStyles('font-size', $event.value);\" min=\"1\" max=\"150\" step=\"1\" [value]=\"getFontSizeWidget|async\" tickInterval=\"1\" thumbLabel></mat-slider></mat-grid-tile></mat-grid-list></div><ng-template [ngIf]=\"currentWidget.widgetType === 5\"><br><form><mat-form-field><input matInput [placeholder]=\"'Font size' | translate\" [value]=\"getFontSizeWidget|async\" [(ngModel)]=\"fontSize\" [ngModelOptions]=\"{standalone: true}\" (change)=\"setWidgetStyles('font-size', fontSize)\"></mat-form-field><mat-select (change)=\"setWidgetStyles('font-style', $event.value)\" [placeholder]=\"'Font style' | translate\"><mat-option translate value=\"normal\">Normal</mat-option><mat-option translate value=\"italic\">Italic</mat-option><mat-option translate value=\"oblique\">Oblique</mat-option></mat-select><mat-select (change)=\"setWidgetStyles('text-align', $event.value)\" [placeholder]=\"'Align' | translate\"><mat-option translate value=\"center\">Center</mat-option><mat-option translate value=\"left\">Left</mat-option><mat-option translate value=\"right\">Right</mat-option></mat-select></form></ng-template><h1><ng-container translate>properties of</ng-container>{{ widgetName }}</h1></div><div [ngSwitch]=\"currentWidget.widgetType\"><ng-template [ngSwitchCase]=\"0\"><h1 translate>Column</h1><ng-template ngFor let-col [ngForOf]=\"currentLayoutWidget.columns\" let-idx=\"index\"><mat-toolbar><mat-toolbar-row *ngIf=\"col !== -1\"><mat-grid-list cols=\"12\"><mat-grid-tile colspan=\"1\">{{idx + 1}}</mat-grid-tile><mat-grid-tile colspan=\"9\"><mat-slider style=\"width:90%\" min=\"0.1\" max=\"1\" step=\"0.01\" value=\"{{col}}\" thumb-label=\"true\" tick-interval=\"true\" (change)=\"instantColumnValue($event.value,idx)\"></mat-slider>{{percent(col)}}%</mat-grid-tile><mat-grid-tile colspan=\"2\"><button style=\"width:5%\" mat-button (click)=\"fixedColumn(idx)\">fixed</button></mat-grid-tile></mat-grid-list></mat-toolbar-row><mat-toolbar-row *ngIf=\"col == -1\"><mat-grid-list cols=\"12\"><mat-grid-tile colspan=\"1\">{{idx + 1}}</mat-grid-tile><mat-grid-tile colspan=\"11\"><button style=\"width:90%\" mat-button (click)=\"unfixedColumn(idx)\">percent</button></mat-grid-tile></mat-grid-list></mat-toolbar-row></mat-toolbar></ng-template><mat-toolbar><mat-toolbar-row><button mat-button translate (click)=\"addColumn()\" *ngIf=\"currentLayoutWidget.columns.length < 10\">Add column</button></mat-toolbar-row></mat-toolbar></ng-template><ng-template [ngSwitchCase]=\"2\"><ajf-image-group (formulaClick)=\"openFormulaDialog($event)\" [data]=\"iconSet\"></ajf-image-group><ajf-image-group (formulaClick)=\"openFormulaDialog($event)\" [data]=\"flagSet\"></ajf-image-group><ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer><input mat-input [placeholder]=\"'paste a link' | translate\" style=\"width: 100%\" [(ngModel)]=\"imageUrl\"> <button mat-button (click)=\"setImageUrl()\" translate>Set image</button></ng-template><ng-template [ngSwitchCase]=\"3\"><div style=\"width:500px\"><ajf-quill-editor [(ngModel)]=\"currentTextWidget.htmlText\" [modules]=\"getModule()\" [maxLength]=\"200\" [theme]=\"bubble\" [initHTML]=\"(getHTML|async)\" (formulaClick)=\"openFormulaDialog($event)\"></ajf-quill-editor></div></ng-template><ng-template [ngSwitchCase]=\"4\"><h3 translate>Choose type of Chart</h3><mat-button-toggle-group class=\"ajf-chart-buttons\"><div class=\"ajf-row\"><mat-button-toggle value=\"reportbuilder-linechart\" (click)=\"setChartType(0)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-linechart\"></mat-icon></mat-button-toggle><mat-button-toggle value=\"reportbuilder-barchartvertical\" (click)=\"setChartType(1)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-barchartvertical\"></mat-icon></mat-button-toggle><mat-button-toggle value=\"reportbuilder-bubblechart\" (click)=\"setChartType(8)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-bubblechart\"></mat-icon></mat-button-toggle></div><div class=\"row\"><mat-button-toggle value=\"reportbuilder-barcharthorizontal\" (click)=\"setChartType(2)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-barcharthorizontal\"></mat-icon></mat-button-toggle><mat-button-toggle value=\"reportbuilder-radarchart\" (click)=\"setChartType(3)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-radarchart\"></mat-icon></mat-button-toggle><mat-button-toggle value=\"reportbuilder-barchartvertical\" (click)=\"setChartType(1)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-barchartvertical\"></mat-icon></mat-button-toggle></div><div class=\"ajf-row\"><mat-button-toggle value=\"reportbuilder-scatterchart\" (click)=\"setChartType(4)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-scatterchart\"></mat-icon></mat-button-toggle><mat-button-toggle value=\"reportbuilder-polarareachart\" (click)=\"setChartType(5)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-polarareachart\"></mat-icon></mat-button-toggle></div><div class=\"ajf-row\"><mat-button-toggle value=\"reportbuilder-piechart\" (click)=\"setChartType(6)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-piechart\"></mat-icon></mat-button-toggle><mat-button-toggle value=\"reportbuilder-donoughtchart\" (click)=\"setChartType(7)\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-donoughtchart\"></mat-icon></mat-button-toggle></div></mat-button-toggle-group><h3 translate>Labels</h3><ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer><ajf-theme-color [section]=\"'chart'\" [label]=\"tabValue\"></ajf-theme-color><mat-card><mat-card-header><mat-card-title>Border width</mat-card-title></mat-card-header><mat-card-content><mat-slider min=\"1\" max=\"100\" style=\"width:99%\" step=\"1\" (change)=\"setChartBorderColor($event.value)\" [value]=\"chartBorderWidth\" tickInterval=\"auto\" thumbLabel></mat-slider></mat-card-content></mat-card><mat-tab-group (selectChange)=\"setTab($event)\"><mat-tab label=\"Background\"><mat-list><ng-template ngFor let-color [ngForOf]=\"(getChartBackgroundColor|async)\" let-idx=\"index\"><mat-list-item><span [style.background]=\"color\">{{ color }} </span><button mat-button translate (click)=\"removeChartBackgroundColor(idx)\">Remove</button></mat-list-item></ng-template></mat-list></mat-tab><mat-tab label=\"Border\"><mat-list><ng-template ngFor let-color [ngForOf]=\"(getChartBorderColor|async)\" let-idx=\"index\"><mat-list-item><span [style.background]=\"color\">{{ color }} </span><button mat-button (click)=\"removeChartBorderColor(idx)\">remove</button></mat-list-item></ng-template></mat-list></mat-tab></mat-tab-group></ng-template><ng-template [ngSwitchCase]=\"5\"><ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer></ng-template></div><button mat-button (click)=\"visibilitySection = !visibilitySection\" [ngClass]=\"{'ajf-selected': visibilitySection}\">{{ widgetName }}<ng-container translate>Visibility</ng-container></button><div [style.display]=\"visibilitySection ? 'block' : 'none'\"><ajf-report-builder-condition-editor [visibility]=\"currentWidget.visibility\"></ajf-report-builder-condition-editor></div></div></ng-template>",
                styles: ["ajf-report-builder-properties .ajf-selected{background-color:#8b0000;color:#fff}ajf-report-builder-properties .ajf-style-container{height:auto;width:100%;position:relative;margin-bottom:60px;text-align:center}ajf-report-builder-properties .ajf-style-container mat-tab-group .ajf-style-panel{min-height:350px}ajf-report-builder-properties .ajf-style-container .ajf-style-background,ajf-report-builder-properties .ajf-style-container .ajf-style-color{width:100%;height:350px;position:relative;margin:30px}ajf-report-builder-properties .ajf-style-container .mat-list-item-content{position:normal!important;display:block!important;height:350px!important}ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-list-item-content,ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-tab-body-wrapper{position:normal!important;display:block!important;height:350px!important}ajf-report-builder-properties .ajf-content{margin-top:10px;margin-right:15px;margin-bottom:290px;margin-left:15px}ajf-report-builder-properties .ajf-content .ajf-menu-css{width:100%!important;font-size:10px!important}ajf-report-builder-properties .ajf-content .ajf-menu-css mat-button-toggle{width:33%!important}ajf-report-builder-properties .ajf-content mat-button-toggle-group{width:100%!important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle{width:auto!important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle mat-icon{margin:15px}ajf-report-builder-properties button{width:100%;margin-bottom:30px}ajf-report-builder-properties .ajf-hide-menu{width:auto!important}ajf-report-builder-properties h1,ajf-report-builder-properties h3,ajf-report-builder-properties h5{text-align:center}ajf-report-builder-properties .ajf-row{display:flex;flex-direction:column;width:100%}ajf-report-builder-properties .mat-tab-body.mat-tab-active{min-height:600px}ajf-report-builder-properties mat-grid-list{width:100%}ajf-report-builder-properties mat-grid-tile{overflow:visible!important}ajf-report-builder-properties mat-grid-tile.ajf-lal{text-align:left}ajf-report-builder-properties .ajf-chart-buttons mat-icon{font-size:15px}ajf-report-builder-properties .ajf-layout-preview{background-color:#fff;width:100%;font-size:.9em;box-sizing:border-box;position:relative}ajf-report-builder-properties .ajf-layout-preview .ajf-top-label{position:absolute;top:1em;left:1em;text-align:left}ajf-report-builder-properties .ajf-layout-preview .ajf-vtop{position:absolute;top:1em;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vbottom{position:absolute;bottom:0;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vright{position:absolute;top:50%;right:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vleft{position:absolute;top:50%;left:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtl{position:absolute;top:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtr{position:absolute;top:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbl{position:absolute;bottom:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbr{position:absolute;bottom:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box{background-color:#fff;padding:3em;position:relative;border:solid 1px #ccc}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box{background-color:#ddd;padding:3em;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box>.ajf-top-label{left:4em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box{padding:3em;background-color:#aaa;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box .ajf-content-box{background-color:#888;padding:2em;text-align:center;box-sizing:border-box}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderProperties.ctorParameters = () => [
    { type: MatDialog },
    { type: AjfReportBuilderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfQuillEditor {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} _service
     */
    constructor(elementRef, renderer, _service) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._service = _service;
        this.emptyArray = [];
        this._init = false;
        this.dateFormats = [
            {
                'label': 'June 23rd 2017, 12:39:12 pm',
                'value': 'MMMM Do YYYY, h:mm:ss a',
                'validator': 'MMMMDoYYYYhmmssa'
            }, {
                'label': 'Friday',
                'value': 'dddd',
                'validator': 'dddd'
            }, {
                'label': 'Jun 23rd 17',
                'value': 'MMM Do YY',
                'validator': 'MMMDoYY'
            }
        ];
        this.fonts = [
            false,
            'blackr',
            'black-italic',
            'bold',
            'bold-condensed',
            'bold-condensed-italic',
            'bold-italic',
            'condensed',
            'condensed-italic',
            'italic',
            'light',
            'light-italic',
            'medium',
            'medium-italic',
            'thinr',
            'thin-italic'
        ];
        this.defaultModules = {
            formula: true,
            toolbar: [
                ['formula'],
                ['bold', 'italic', 'underline', 'strike'],
                // ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                // [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': this.emptyArray.slice() },
                    { 'background': this.emptyArray.slice() }],
                [{ 'font': this.fonts }],
                [{ 'align': this.emptyArray.slice() }],
                ['clean'],
            ]
        };
        this.font = Quill.import('formats/font');
        this.editorCreated = new EventEmitter();
        this.contentChanged = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        /**
         * this event is fired when the user click on formula button on quill editor rool barƒ
         *
         * \@memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
        this.onModelChange = (/**
         * @return {?}
         */
        () => { });
        this.onModelTouched = (/**
         * @return {?}
         */
        () => { });
        this._formulas = [];
        this._formulaTextSub = Subscription.EMPTY;
        this.font.whitelist = this.fonts;
        this.font.whitelist.push('regular');
        this._formulaTextSub =
            this._service.getFormulaToHtmlEvent()
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // reference is defined only when the user want to edit the formula
                if (event.reference !== undefined) {
                    event.reference.innerHTML = event.formula;
                    this.renderer.setAttribute(event.reference, 'formula', event.formula);
                    /** @type {?} */
                    const efs = this._formulas.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.formula === event.reference));
                    /** @type {?} */
                    let formulaEntry;
                    /** @type {?} */
                    let unlisten;
                    if (efs.length > 0) {
                        formulaEntry = efs[0];
                        unlisten = formulaEntry.unlisten;
                        if (unlisten != null) {
                            unlisten();
                        }
                    }
                    else {
                        formulaEntry = { formula: event.reference, unlisten: null };
                        this._formulas.push(formulaEntry);
                    }
                    formulaEntry.unlisten = this.renderer.listen(event.reference, 'click', (/**
                     * @return {?}
                     */
                    () => {
                        /** @type {?} */
                        let obj = {
                            'formula': event.formula,
                            'reference': event.reference
                        };
                        this.formulaClick.emit(obj);
                    }));
                }
                else {
                    /** @type {?} */
                    const quillEditor = this.elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    /** @type {?} */
                    const link = this.renderer.createElement('a');
                    this.renderer.setAttribute(link, 'href', 'javascript:void(0)');
                    this.renderer.setStyle(link, 'cursor', 'pointer');
                    this.renderer.setAttribute(link, 'formula', this.check(event.formula));
                    /** @type {?} */
                    const linkLabel = this.renderer.createText(event.formula);
                    this.renderer.appendChild(link, linkLabel);
                    // add listener related on the click event of the new formula
                    /** @type {?} */
                    const unlisten = this.renderer.listen(link, 'click', (/**
                     * @param {?} _
                     * @return {?}
                     */
                    (_) => {
                        /** @type {?} */
                        let obj = {
                            'formula': this.check(event.formula),
                            'reference': link
                        };
                        this.formulaClick.emit(obj);
                    }));
                    this.renderer.appendChild(quillEditor, link);
                    this._formulas.push({ unlisten, formula: link });
                }
            }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    check(value) {
        this.dateFormats.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        (elem) => {
            if (elem.value == value) {
                return (/** @type {?} */ (elem.validator));
            }
        }));
        return (/** @type {?} */ (value));
    }
    /**
     * this function search fomulas inside the init text
     * and allocate the related listener on click event
     *
     * \@memberof QuillEditorComponent
     * @return {?}
     */
    setHTML() {
        this.writeValue(this.initHTML);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const toolbarElem = this.elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
        /** @type {?} */
        let modules = this.modules || this.defaultModules;
        Quill.register(this.font, true);
        if (toolbarElem) {
            modules['toolbar'] = toolbarElem;
            modules['formula'] = true;
        }
        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
        this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');
        this.quillEditor = new Quill(this.editorElem, {
            modules: modules,
            placeholder: this.placeholder || 'Insert text here ...',
            readOnly: this.readOnly || false,
            theme: this.theme || 'snow',
            formats: this.formats
        });
        this.editorCreated.emit(this.quillEditor);
        this.setHTML();
        // mark model as touched if editor lost focus
        this.quillEditor.on('selection-change', (/**
         * @param {?} range
         * @param {?} oldRange
         * @param {?} source
         * @return {?}
         */
        (range, oldRange, source) => {
            this.selectionChanged.emit({
                editor: this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source
            });
            if (!range) {
                this.onModelTouched();
            }
        }));
        // update model if text changes
        this.quillEditor.on('text-change', (/**
         * @param {?} delta
         * @param {?} oldDelta
         * @param {?} source
         * @return {?}
         */
        (delta, oldDelta, source) => {
            /** @type {?} */
            let html = this.editorElem.children[0].innerHTML;
            /** @type {?} */
            const text = this.quillEditor.getText();
            if (html === '<p><br></p>') {
                html = null;
            }
            this.onModelChange(html);
            this.contentChanged.emit({
                editor: this.quillEditor,
                html: html,
                text: text,
                delta: delta,
                oldDelta: oldDelta,
                source: source
            });
        }));
        /** @type {?} */
        let elem = this.elementRef.nativeElement.querySelector('.ajf-ql-formula');
        this.listenFunc = this.renderer.listen(elem, 'click', (/**
         * @param {?} _
         * @return {?}
         */
        (_) => {
            this.formulaClick.emit();
        }));
    }
    /**
     * @param {?} currentValue
     * @return {?}
     */
    writeValue(currentValue) {
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                if (currentValue == this.initHTML && !this._init) {
                    /** @type {?} */
                    let editor = this.elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    editor.innerHTML = this.initHTML;
                    /** @type {?} */
                    let allFormulas = this.elementRef.nativeElement.querySelectorAll('[formula]');
                    allFormulas.forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    (elem) => {
                        /** @type {?} */
                        const unlisten = this.renderer.listen(elem, 'click', (/**
                         * @param {?} _
                         * @return {?}
                         */
                        (_) => {
                            /** @type {?} */
                            let obj = {
                                'formula': this.check(elem.innerText),
                                'reference': elem
                            };
                            this.formulaClick.emit(obj);
                        }));
                        this.renderer.setStyle(elem, 'cursor', 'pointer');
                        this._formulas.push({ unlisten, formula: elem });
                        this._init = true;
                    }));
                }
                else if (currentValue != this.initHTML) {
                    this.quillEditor.pasteHTML(currentValue);
                }
                return;
            }
            this.quillEditor.setText('');
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} _c
     * @return {?}
     */
    validate(_c) {
        if (!this.quillEditor) {
            return null;
        }
        /** @type {?} */
        let err = {};
        /** @type {?} */
        let valid = true;
        /** @type {?} */
        const textLength = this.quillEditor.getText().trim().length;
        if (this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = textLength >= this.minLength || !textLength;
        }
        if (this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
            valid = textLength <= this.maxLength && valid;
        }
        return valid ? null : err;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['readOnly'] && this.quillEditor) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }
        if (changes['modules'] && this.quillEditor) {
            Quill.register(this.font, true);
            this.quillEditor = new Quill(this.editorElem, {
                modules: changes['modules']['currentValue'],
                placeholder: this.placeholder || 'Insert text here ...',
                readOnly: this.readOnly || false,
                theme: this.theme || 'snow',
                formats: this.formats
            });
            this.elementRef.nativeElement.children[0].remove();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (let i = 0; i < this._formulas.length; i++) {
            /** @type {?} */
            let unlisten = this._formulas[i].unlisten;
            if (unlisten != null) {
                unlisten();
            }
        }
        this._formulaTextSub.unsubscribe();
    }
}
AjfQuillEditor.decorators = [
    { type: Component, args: [{selector: 'ajf-quill-editor',
                template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)),
                        multi: true
                    }, {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)),
                        multi: true
                    }],
                styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px!important;padding-bottom:50px}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfQuillEditor.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: AjfReportBuilderService }
];
AjfQuillEditor.propDecorators = {
    theme: [{ type: Input }],
    modules: [{ type: Input }],
    readOnly: [{ type: Input }],
    placeholder: [{ type: Input }],
    maxLength: [{ type: Input }],
    minLength: [{ type: Input }],
    formats: [{ type: Input }],
    initHTML: [{ type: Input }],
    editorCreated: [{ type: Output }],
    contentChanged: [{ type: Output }],
    selectionChanged: [{ type: Output }],
    formulaClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderRendererWidget {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this.currentContentWidget = null;
        this._onDraggedSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get widgetTypes() { return AjfReportWidgetType; }
    /**
     * @return {?}
     */
    get layoutWidget() {
        return (/** @type {?} */ (this.widget));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canDropPredicate(item) {
        item.data.dropZones.forEach((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            if (['header', 'widget'].indexOf(d) > -1) {
                return true;
            }
        }));
        return false;
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            s.unsubscribe();
            this.service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this.service.dragEnded();
    }
    /**
     * @return {?}
     */
    getColumnContent() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        return (/** @type {?} */ (myObj.content));
    }
    /**
     * @return {?}
     */
    getIcon() {
        /** @type {?} */
        const defVal = { fontSet: '', fontIcon: '' };
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.icon == null) {
            return null;
        }
        return myObj.icon.evaluate({}) || defVal;
    }
    /**
     * @return {?}
     */
    getFlag() {
        /** @type {?} */
        const defVal = 'ch';
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.flag == null) {
            return null;
        }
        return myObj.flag.evaluate({}) || defVal;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getPercent(index) {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        /** @type {?} */
        const percent = myObj.columns[index] * 100;
        return `${percent.toString()}%`;
    }
    /**
     * @return {?}
     */
    getImageUrl() {
        /** @type {?} */
        const defVal = '';
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.url == null) {
            return null;
        }
        return myObj.url.evaluate({}) || defVal;
    }
    /**
     * @return {?}
     */
    getImageType() {
        return this.widget != null ?
            ((/** @type {?} */ (this.widget))).imageType :
            AjfImageType.Image;
    }
    /**
     * @return {?}
     */
    getHtmlText() {
        /** @type {?} */
        let myObj;
        myObj = (/** @type {?} */ (this.widget));
        if (myObj.htmlText === '') {
            return '...';
        }
        else {
            return myObj.htmlText;
        }
    }
    /**
     * @return {?}
     */
    getCoordinate() {
        /** @type {?} */
        let myObj;
        myObj = (/** @type {?} */ (this.widget));
        if (myObj.coordinate == null) {
            return [51.505, -0.09, 13];
        }
        else {
            return (/** @type {?} */ (myObj.coordinate));
        }
    }
    /**
     * @return {?}
     */
    getTileLayer() {
        /** @type {?} */
        let myObj;
        myObj = (/** @type {?} */ (this.widget));
        if (myObj.tileLayer === '') {
            return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        }
        else {
            return myObj.tileLayerMap;
        }
    }
    /**
     * @return {?}
     */
    getAttribution() {
        /** @type {?} */
        let myObj;
        myObj = (/** @type {?} */ (this.widget));
        if (myObj.attribution === '') {
            return "&copy; <a href='http://osm.org/copyright'>O</a> contributors";
        }
        else {
            return myObj.attributionMap;
        }
    }
    /**
     * @param {?} event
     * @param {?} toColumn
     * @return {?}
     */
    addToList(event, toColumn) {
        this.onDragEndHandler();
        this.service.addToColumn(event, toColumn);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._onDraggedSub = this.service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this.getChartType = this.service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return 0;
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            return (/** @type {?} */ ((myObj.chartType)));
        })), distinctUntilChanged(), startWith(0));
        this.getDataset = this.service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget != null && ((/** @type {?} */ (widget))).dataset != null) {
                /** @type {?} */
                const myObj = (/** @type {?} */ (this.widget));
                return (/** @type {?} */ (myObj.dataset));
            }
            else {
                return [];
            }
        })), distinctUntilChanged());
        this.getTableTitles = this.service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return [];
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            if (myObj.dataset != null) {
                /** @type {?} */
                let tableTitle = [];
                for (let i = 0; i < myObj.dataset.length; i++) {
                    if (myObj.dataset[i][0] != null) {
                        tableTitle.push(myObj.dataset[i][0].label);
                    }
                }
                return tableTitle;
            }
            else {
                return [];
            }
        })));
        this.getTableContent = this.service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return [];
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            if (myObj.dataset != null) {
                /** @type {?} */
                let tableContent = [];
                for (let i = 0; i < myObj.dataset.length; i++) {
                    for (let j = 0; j < myObj.dataset[i].length; j++) {
                        if ((myObj.dataset[i] != null) &&
                            (myObj.dataset[i][j + 1] != null)) {
                            if (tableContent[j] == null) {
                                tableContent[j] = [];
                            }
                            if (tableContent[j][i] == null) {
                                tableContent[j][i] = ' ';
                            }
                            tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label);
                        }
                    }
                }
                return tableContent;
            }
        })));
        this.service.updateCurrentWidget(this.widget);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.widget && changes.widget.currentValue != null) {
            this.widget = changes.widget.currentValue;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderRendererWidget.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-renderer-widget',
                template: "<div class=\"ajf-container\" [ngSwitch]=\"widget?.widgetType\" [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\"><div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\" [applyStyles]=\"widget.styles\"><div class=\"ajf-columns\"><ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\"><div class=\"ajf-column\" [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\" [style.width]=\"getPercent(idx)\" [applyStyles]=\"widget.content[idx].styles\"><ajf-report-builder-widgets-row-buttons [from]=\"'layout'\" [fromWidget]=\"widget\" [widget]=\"clm\" [position]=\"idx\" (onDragStart)=\"onDragStartHandler();\" (onDragEnd)=\"onDragEndHandler();\" [child]=\"true\"></ajf-report-builder-widgets-row-buttons><ajf-column [column]=\"clm\" [applyStyles]=\"widget.styles\"></ajf-column><ng-template [ngIf]=\"onDragged === true\"><div cdkDropList [cdkDropListEnterPredicate]=\"canDropPredicate\" [style.display]=\"onDragged ? 'block' : 'none'\" (cdkDropListDropped)=\"addToList($event, clm)\" class=\"ajf-column-drop-zone\" (dragover)=\"layoutShow = true;\" (dragleave)=\"layoutShow = false;\"></div></ng-template></div></ng-template></div></div><div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\"><ajf-image [applyStyles]=\"widget.styles\" [type]=\"getImageType()\" [imageUrl]=\"getImageUrl()\" [icon]=\"getIcon()\" [flag]=\"getFlag()\"></ajf-image></div><div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\"><ajf-text [htmlText]=\"getHtmlText() | translate\" [applyStyles]=\"widget.styles\"></ajf-text></div><div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\"></div><div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\"><ajf-table [data]=\"(getTableContent|async)\"></ajf-table></div><div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\"><ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\"></ajf-map></div></div>",
                styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none!important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid #00f;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red!important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0!important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible!important;display:block!important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted #00f;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted #00f}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-on-drag-over,ajf-report-builder-renderer-widget .ajf-show{border:33px dotted #00f;opacity:1!important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden!important;display:none!important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible!important;display:block!important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red!important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderRendererWidget.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderRendererWidget.propDecorators = {
    widget: [{ type: Input }],
    position: [{ type: Input }],
    section: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderThemeColorDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     */
    constructor(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.currentWidget = null;
        this.currentColor = 'rgb(255,255,255,0)';
        this.section = 'color';
        this._currentWidgetSub = Subscription.EMPTY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setWidgetStyles(value) {
        this._service.setWidgetStyles(this.section, value);
        this.currentColor = value;
        this.setStyle();
    }
    /**
     * @return {?}
     */
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * @return {?}
     */
    addCustomColor() {
        this._service.addCustomColor(this.currentColor);
        this._service.updateCurrentWidget(this.currentWidget);
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    close() {
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x !== null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                }
            }
            else {
                this.currentWidget = null;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderThemeColorDialog.decorators = [
    { type: Component, args: [{selector: 'theme-color-dialog',
                template: "<div mat-dialog-content #colorpic><input [hidden]=\"false\" [colorPicker]=\"currentColor\" [style.background]=\"currentColor\" [value]=\"currentColor\" [cpDialogDisplay]=\"'inline'\" [cpPosition]=\"'top'\" [cpToggle]=\"true\" [cpWidth]=\"'400px'\" [cpOutputFormat]=\"'rgba'\" (colorPickerChange)=\"setWidgetStyles($event)\"></div><div mat-dialog-actions><button mat-button (click)=\"addCustomColor()\">Save color</button></div>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderThemeColorDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];
AjfReportBuilderThemeColorDialog.propDecorators = {
    elem: [{ type: ViewChild, args: ['colorpic',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component manages the report text
 *
 * @export
 */
class AjfReportBuilderThemeColor {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.currentWidget = null;
        this.alphaColor = 1;
        this.styleBackgroundColor = 'rgb(255,255,255,0)';
        this.styleColor = 'rgb(0,0,0,0)';
        this._colorsSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this._originSub = Subscription.EMPTY;
        this._headerStyleSub = Subscription.EMPTY;
        this._contentStylesSub = Subscription.EMPTY;
        this._footerStylesSub = Subscription.EMPTY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setStyles(value) {
        switch (this.section) {
            case 'widget':
                this.setWidgetStyles(value);
                break;
            case 'report':
                this.setReportStyles(value);
                break;
            case 'section':
                this.setSectionStyles(value);
                break;
            case 'chart':
                this.setChartStyle(value);
                break;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChartStyle(value) {
        if (this.label === 'backgroundColor') {
            this.addChartBackgroundColor(value);
        }
        else {
            this.addChartBorderColor(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setAlphaColor(value) {
        value = value.toFixed(2);
        for (let i = 0; i < this.colors.length; i++) {
            /** @type {?} */
            let lastComma = this.colors[i].lastIndexOf(',');
            this.colors[i] = this.colors[i].substring(0, lastComma) + ',' + value + ')';
        }
    }
    /**
     * call to service to add new style to widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    setWidgetStyles(value) {
        if (this.section === 'chart') {
            this.setChartStyle(value);
        }
        else {
            this._service.setWidgetStyles(this.label, value);
            this.currentColor = value;
            this.setStyle();
        }
    }
    /**
     * call to service to add new style to section
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    setSectionStyles(value) {
        this._service.setSectionStyles(this.origin, this.label, value);
        this.styleColor = value;
    }
    /**
     * call to service to add new style to report
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    setReportStyles(value) {
        this._service.setReportStyles(this.label, value);
        this.styleBackgroundColor = value;
    }
    /**
     * call to service to add background color to current chart
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     * @return {?}
     */
    addChartBackgroundColor(value) {
        this._service.addChartBackgroundColor(value);
    }
    /**
     * call to service to add border color to current chart
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     * @return {?}
     */
    addChartBorderColor(value) {
        this._service.addChartBorderColor(value);
    }
    /**
     * @return {?}
     */
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * @return {?}
     */
    openDialog() {
        this.dialogRef = this.dialog.open(AjfReportBuilderThemeColorDialog);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._colorsSub = this._service.colors
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.colors = x;
        }));
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                }
            }
            else {
                this.currentWidget = null;
            }
        }));
        this.getColorWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return myObj.styles['color'] || '';
            }
        })), distinctUntilChanged());
        this._originSub = this._service.origin.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            this.origin = s;
        }));
        this._headerStyleSub = this._service.headerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._contentStylesSub = this._service.contentStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._footerStylesSub = this._service.footerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._colorsSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
        this._originSub.unsubscribe();
        this._headerStyleSub.unsubscribe();
        this._contentStylesSub.unsubscribe();
        this._footerStylesSub.unsubscribe();
    }
}
AjfReportBuilderThemeColor.decorators = [
    { type: Component, args: [{selector: 'ajf-theme-color',
                template: "<mat-card style=\"width:90%\"><mat-card-header><mat-card-title>{{ label }} Trasparency</mat-card-title></mat-card-header><mat-card-content><mat-slider style=\"width:90%\" (change)=\"setAlphaColor($event.value)\" min=\"0\" max=\"1\" step=\"0.1\" [value]=\"alphaColor\" thumbLabel></mat-slider></mat-card-content></mat-card><mat-card style=\"width:90%\"><mat-card-header><mat-card-title>{{ label }}</mat-card-title></mat-card-header><mat-card-content><mat-grid-list cols=\"8\" rowHeight=\"25px\"><mat-grid-tile *ngFor=\"let color of colors\" [colspan]=\"1\" [rowspan]=\"1\" [style.background]=\"color\"><button style=\"height:100%\" (click)=\"setStyles(color)\" mat-button></button></mat-grid-tile></mat-grid-list></mat-card-content><mat-card-actions><button mat-button (click)=\"openDialog()\" style=\"width:90%;\">Add color</button> <button mat-button (click)=\"setStyles('')\" style=\"width:90%\">Reset</button></mat-card-actions></mat-card>",
                styles: [""],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderThemeColor.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
AjfReportBuilderThemeColor.propDecorators = {
    section: [{ type: Input }],
    label: [{ type: Input }],
    init: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderToolbarDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     */
    constructor(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
    }
    /**
     * @return {?}
     */
    resetReport() {
        /** @type {?} */
        let emptyReport = {
            'header': { 'content': [], 'styles': {} },
            'content': { 'content': [], 'styles': {} },
            'footer': { 'content': [], 'styles': {} },
            'styles': {}
        };
        this._service.setReport(emptyReport);
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    close() {
        this._dialogRef.close();
    }
}
AjfReportBuilderToolbarDialog.decorators = [
    { type: Component, args: [{selector: 'toolbar-dialog',
                template: "<h1 matDialogTitle>Dialog</h1><div mat-dialog-content>Are you sure you want to erase the report?</div><div mat-dialog-actions><button mat-button (click)=\"resetReport()\">Yes</button> <button mat-button (click)=\"close()\">No</button></div>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderToolbarDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
class AjfReportBuilderToolbar {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        // this is an any EventEmitter
        this.addClick = new EventEmitter();
        this.zoom = false;
        this.emptyContent = this._service.emptyContent;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canDropPredicate(item) {
        return item.data.dropZones.indexOf('widget') > -1;
    }
    /**
     * @return {?}
     */
    JSONRequest() {
    }
    /**
     * this method will pass event to event emitter
     * @param {?} event
     * @return {?}
     */
    onAddClick(event) {
        this.addClick.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addToList(event) {
        if (event.item.data.widget != null) {
            this._service.addCustomWidgets({
                json: JSON.stringify(event.item.data.widget.toJson()),
                type: ''
            });
        }
    }
    /**
     * @return {?}
     */
    undoLastOperation() {
        try {
            /** @type {?} */
            let myObj = JSON.parse(this._service.popJsonStack() || '');
            this._service.setReport(AjfReport.fromJson(myObj));
        }
        catch (e) { }
    }
    /**
     * @return {?}
     */
    isZoomed() {
        this.zoom = !this.zoom;
        if (this.zoom) {
            this._service.fixedZoomIn();
        }
        else {
            this._service.fixedZoomOut();
        }
    }
    /**
     * @return {?}
     */
    openDialog() {
        this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
    }
}
AjfReportBuilderToolbar.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-toolbar',
                outputs: ['addClick'],
                styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}"],
                template: "<mat-toolbar><button mat-button (click)=\"onAddClick($event)\" matTooltip=\"open widget sidebar\" [matTooltipPosition]=\"'above'\">Open</button> <button mat-button (click)=\"openDialog()\" matTooltip=\"reset the current report\" [matTooltipPosition]=\"'above'\">reset</button> <button mat-button (click)=\"undoLastOperation()\" matTooltip=\"undo the last operation\" [disabled]=\"emptyContent|async\" [matTooltipPosition]=\"'above'\">Undo</button> <button mat-button class=\"ajf-custom-widget-drop-zone\" cdkDropList [cdkDropListEnterPredicate]=\"canDropPredicate\" (cdkDropListDropped)=\"addToList($event);\" matTooltip=\"add custom widget on toolbar\" [matTooltipPosition]=\"'above'\">add custom widget here <i class=\"material-icons\">add_circle_outline</i></button><section class=\"example-section\"><mat-slide-toggle [checked]=\"zoom\" (change)=\"isZoomed()\" matTooltip=\"apply zoom out\" [matTooltipPosition]=\"'above'\">zoom out</mat-slide-toggle></section></mat-toolbar>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
class AjfReportBuilderWidgetToolbarButton {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.widgetIcon = ajfReportBuilderWidgetToString(this.widgetType);
    }
}
AjfReportBuilderWidgetToolbarButton.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-widget-toolbar-button',
                inputs: ['widgetType'],
                template: "<button mat-button matTooltip=\"{{ widgetType}}\" [matTooltipPosition]=\"'above'\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"{{ widgetIcon }}\"></mat-icon></button>",
                styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderWidgetToolbarButton.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderWidgetsRowButtons {
    /**
     *
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.currentWidget = null;
        this.isClicked = false;
        this.color = [];
        this.isOver = false;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        // this boolean sign if is on over a widget
        this.onOver = false;
        this._currentWidgetSub = Subscription.EMPTY;
        this._onDraggedSub = Subscription.EMPTY;
        this._onOverSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    selectedWidget() {
        this.isClicked = !this.isClicked;
        this._service.setOrigin(this.from);
        this._service.updateCurrentWidget(this.widget);
    }
    /**
     * @return {?}
     */
    remove() {
        if (this.fromWidget != null) {
            this._service.updateCurrentWidget(this.fromWidget);
        }
        this._service.remove(this.from, this.position);
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (this.widget === this.currentWidget) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    changeColumn(direction) {
        if (direction == 'back') {
            this._service.changeColumn(this.position, this.position - 1, (/** @type {?} */ (this.fromWidget)));
        }
        else {
            this._service.changeColumn(this.position, this.position + 1, (/** @type {?} */ (this.fromWidget)));
        }
    }
    /**
     * @return {?}
     */
    isColumn() {
        if (this.label === 'Column') {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    isOneColumn() {
        /** @type {?} */
        let rootObj = (/** @type {?} */ (this.fromWidget));
        if (rootObj.columns.length > 1) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.label = AjfReportWidgetType[this.widget.widgetType];
        this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
        this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this._onOverSub = this._service.onOver
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onOver = x;
        }));
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.currentWidget = x;
            if (x !== this.widget) {
                this.isClicked = false;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
        this._onOverSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderWidgetsRowButtons.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-widgets-row-buttons',
                inputs: ['from', 'fromWidget', 'position', 'widget', 'child', 'isOver'],
                template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\"><div class=\"ajf-button-row\"><ng-template [ngIf]=\"isColumn() && onDragged == false\"><span (click)=\"changeColumn('forward')\" matTooltip=\"move right\" [matTooltipPosition]=\"'above'\"><i class=\"material-icons\">arrow_forward</i></span></ng-template><ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\"><span mat-button [ngClass]=\"{'ajf-selected': onFocus()}\" matTooltip=\"{{label}}\" [matTooltipPosition]=\"'above'\" (click)=\"selectedWidget()\"><ng-template [ngIf]=\"isColumn()\"><i class=\"material-icons\">settings</i></ng-template><ng-template [ngIf]=\"(isColumn()) ? false : true\"><mat-icon fontSet=\"ajf-icon\" fontIcon=\"{{ widgetIcon }}\"></mat-icon></ng-template></span><span mat-button matTooltip=\"remove\" (click)=\"remove()\" [matTooltipPosition]=\"'above'\"><mat-icon>remove_circle_outline</mat-icon></span></ng-template><ng-template [ngIf]=\"isColumn() && onDragged == false\"><span (click)=\"changeColumn('back')\" matTooltip=\"move left\" [matTooltipPosition]=\"'above'\"><i class=\"material-icons\">arrow_back</i></span></ng-template></div></div>",
                styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100%!important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000!important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderWidgetsRowButtons.ctorParameters = () => [
    { type: AjfReportBuilderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an Ajf builder fields toolbar
 */
class AjfReportBuilderWidgetsToolbar {
    /**
     *
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        // fieldTypes is an array string that contains the field options
        this.chartTypes = sizedEnumToStringArray(AjfChartType);
        this.widgetTypes = sizedEnumToStringArray(AjfReportWidgetType);
        // delete Column widget
        /** @type {?} */
        let pos = this.widgetTypes.indexOf('Column');
        if (pos !== -1) {
            this.widgetTypes.splice(pos, 1);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (s != null) {
                s.unsubscribe();
            }
            this.service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this.service.dragEnded();
    }
}
AjfReportBuilderWidgetsToolbar.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder-widgets-toolbar',
                template: "<mat-list><mat-list-item *ngFor=\"let t of widgetTypes\"><ajf-report-builder-widget-toolbar-button ng-if=\"t != 'Column'\" cdkDrag [cdkDragData]=\"{widgetType: t, dropZones: ['header','content','footer','column','widget']}\" [widgetType]=\"t\" (onDragStart)=\"onDragStartHandler();\" (onDragEnd)=\"onDragEndHandler();\"></ajf-report-builder-widget-toolbar-button></mat-list-item></mat-list>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilderWidgetsToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf form builderx
 */
class AjfReportBuilder {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._init = false;
    }
    /**
     * @return {?}
     */
    get report() { return this._report; }
    /**
     * @param {?} report
     * @return {?}
     */
    set report(report) {
        if (report != null) {
            this._report = report;
            if (this._init) {
                this._setCurrentReport();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._setCurrentReport();
        this._init = true;
    }
    /**
     * @private
     * @return {?}
     */
    _setCurrentReport() {
        this._service.setReportForms(this.report != null ? this.report.forms || [] : []);
        this._service.setReport(this.report);
    }
}
AjfReportBuilder.decorators = [
    { type: Component, args: [{selector: 'ajf-report-builder',
                template: "<ajf-report-builder-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-toolbar><ajf-report-builder-custom-widgets-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-custom-widgets-toolbar><mat-drawer-container><mat-drawer #start position=\"start\" mode=\"side\" class=\"ajf-builder-sidebar\"><ajf-report-builder-widgets-toolbar></ajf-report-builder-widgets-toolbar></mat-drawer><ajf-report-builder-content></ajf-report-builder-content><mat-drawer #end position=\"end\" mode=\"side\" class=\"ajf-builder-prop\" [opened]=\"true\"><ajf-report-builder-properties></ajf-report-builder-properties></mat-drawer></mat-drawer-container>",
                styles: ["ajf-report-builder{display:block;position:relative;width:100%;height:100%;overflow:hidden}ajf-report-builder mat-sidenav-container{height:100%}ajf-report-builder mat-sidenav-container .ajf-builder-sidebar{max-width:7%}ajf-report-builder mat-sidenav-container .ajf-builder-prop{max-width:30%}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfReportBuilder.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilder.propDecorators = {
    startSidenav: [{ type: ViewChild, args: [MatSidenav,] }],
    report: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderModule {
}
AjfReportBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    DragDropModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCardModule,
                    MatDialogModule,
                    MatGridListModule,
                    MatIconModule,
                    MatListModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSlideToggleModule,
                    MatSliderModule,
                    MatTabsModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    TranslateModule,
                    ColorPickerModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfMapModule,
                    AjfMonacoEditorModule,
                    AjfTableModule,
                    AjfTextModule,
                ],
                declarations: [
                    AjfQuillEditor,
                    AjfReportBuilderColumn,
                    AjfReportBuilderConditionEditor,
                    AjfReportBuilderContent,
                    AjfReportBuilderCustomWidgetDialog,
                    AjfReportBuilderCustomWidgetToolbarButton,
                    AjfReportBuilderCustomWidgetsToolbar,
                    AjfReportBuilderFormsAnalyzerDialog,
                    AjfReportBuilderFormsAnalyzer,
                    AjfReportBuilderImageGroup,
                    AjfReportBuilderProperties,
                    AjfReportBuilderRendererWidget,
                    AjfReportBuilderThemeColorDialog,
                    AjfReportBuilderThemeColor,
                    AjfReportBuilderToolbarDialog,
                    AjfReportBuilderToolbar,
                    AjfReportBuilderWidgetToolbarButton,
                    AjfReportBuilderWidgetsRowButtons,
                    AjfReportBuilderWidgetsToolbar,
                    AjfReportBuilder,
                    AjfImageFilterPipe,
                ],
                exports: [
                    AjfReportBuilder,
                ],
                entryComponents: [
                    AjfReportBuilderFormsAnalyzerDialog,
                    AjfReportBuilderThemeColorDialog,
                    AjfReportBuilderToolbarDialog,
                ],
                providers: [
                    AjfReportBuilderService,
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfReportBuilderModule, AjfReportBuilderService, AjfReportBuilder, AJF_REPORTS_CONFIG, AjfReportBuilderColumn as ɵb, AjfReportBuilderConditionEditor as ɵc, AjfReportBuilderContent as ɵd, AjfReportBuilderCustomWidgetDialog as ɵe, AjfReportBuilderCustomWidgetToolbarButton as ɵf, AjfReportBuilderCustomWidgetsToolbar as ɵg, AjfReportBuilderFormsAnalyzer as ɵi, AjfReportBuilderFormsAnalyzerDialog as ɵh, AjfImageFilterPipe as ɵt, AjfReportBuilderImageGroup as ɵj, AjfReportBuilderProperties as ɵk, AjfQuillEditor as ɵa, AjfReportBuilderRendererWidget as ɵl, AjfReportBuilderThemeColor as ɵn, AjfReportBuilderThemeColorDialog as ɵm, AjfReportBuilderToolbar as ɵp, AjfReportBuilderToolbarDialog as ɵo, AjfReportBuilderWidgetToolbarButton as ɵq, AjfReportBuilderWidgetsRowButtons as ɵr, AjfReportBuilderWidgetsToolbar as ɵs };
//# sourceMappingURL=report-builder.js.map
