/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfFieldType, AjfNodeType, flattenNodes } from '@ajf/core/forms';
import { createFormula } from '@ajf/core/models';
import { AjfWidgetType, createAggregation, createWidget } from '@ajf/core/reports';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { combineLatest, filter, map, publishReplay, refCount, scan, share, startWith } from 'rxjs/operators';
import { AJF_REPORTS_CONFIG } from './tokens';
/**
 * This service contains all the logic to model the report widget.
 *
 * @export
 */
export class AjfReportBuilderService {
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
            'rgba(0, 0, 0, 1)', 'rgba(51, 153, 255, 1)', 'rgba(153, 204, 0, 1)',
            'rgba(255, 102, 0, 1)', 'rgba(0, 204, 204, 1)', 'rgba(204, 204, 153, 1)',
            'rgba(255, 153, 0, 1)', 'rgba(230, 0, 0, 1)', 'rgba(255, 153, 0, 1)',
            'rgba(255, 255, 0, 1)', 'rgba(0, 138, 0, 1)', 'rgba(0, 102, 204, 1)',
            'rgba(153, 51, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(250, 204, 204, 1)',
            'rgba(255, 235, 204, 1)', 'rgba(255, 255, 204, 1)', 'rgba(204, 232, 204, 1)',
            'rgba(204, 224, 245, 1)', 'rgba(235, 214, 255, 1)', 'rgba(187, 187, 187, 1)',
            'rgba(240, 102, 102, 1)', 'rgba(255, 194, 102, 1)', 'rgba(255, 255, 102, 1)',
            'rgba(102, 185, 102, 1)', 'rgba(102, 163, 224, 1)', 'rgba(194, 133, 255, 1)',
            'rgba(136, 136, 136, 1)', 'rgba(161, 0, 0, 1)', 'rgba(178, 107, 0, 1)',
            'rgba(178, 178, 0, 1)', 'rgba(0, 97, 0, 1)', 'rgba(0, 71, 178, 1)',
            'rgba(107, 36, 178, 1)', 'rgba(68, 68, 68, 1)', 'rgba(92, 0, 0, 1)',
            'rgba(102, 61, 0, 1)', 'rgba(102, 102, 0, 1)', 'rgba(0, 55, 0, 1)',
            'rgba(0, 41, 102, 1)', 'rgba(61, 20, 102, 1)'
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
        this._iconSets = { 'ajf-icon': [] };
        this._lastDeletedJson = '';
        if (reportsConfig != null) {
            if (reportsConfig.icons != null) {
                this._iconSets = Object.assign(Object.assign({}, this._iconSets), reportsConfig.icons);
            }
        }
        this._origin = ((/** @type {?} */ (this._originUpdate))).pipe(startWith('header'), share());
        this._savedReport = ((/** @type {?} */ (this._savedReportUpdate))).pipe(share());
        this._onDragged = ((/** @type {?} */ (this._onDraggedUpdate))).pipe(startWith(false), share());
        this._onOver = ((/** @type {?} */ (this._onOverUpdate))).pipe(startWith(false), share());
        this._fixedZoom = ((/** @type {?} */ (this._fixedZoomUpdate))).pipe(startWith(false), share());
        this._onDragEnter = this._onDragEnterUpdate.pipe(share());
        this._reportStyles = ((/** @type {?} */ (this._reportStylesUpdate)))
            .pipe(scan((/**
         * @param {?} styles
         * @param {?} op
         * @return {?}
         */
        (styles, op) => {
            return op(styles);
        }), (/** @type {?} */ ({}))), share(), startWith((/** @type {?} */ ({}))));
        this._reportForms = ((/** @type {?} */ (this._reportFormsUpdate)))
            .pipe(scan((/**
         * @param {?} forms
         * @param {?} op
         * @return {?}
         */
        (forms, op) => {
            return op(forms);
        }), []), share(), startWith([]));
        this._customWidgets =
            ((/** @type {?} */ (this._customWidgetsUpdate)))
                .pipe(scan((/**
             * @param {?} widgets
             * @param {?} op
             * @return {?}
             */
            (widgets, op) => {
                return op(widgets);
            }), []), share(), startWith([]));
        this._formsVariables =
            ((/** @type {?} */ (this._formsVariablesUpdate)))
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
        this._conditionNames =
            ((/** @type {?} */ (this._conditionNamesUpdate)))
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
        this._headerWidgets = ((/** @type {?} */ (this._headerWidgetsUpdate)))
            .pipe(scan((/**
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
        this._footerWidgets = ((/** @type {?} */ (this._footerWidgetsUpdate)))
            .pipe(scan((/**
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
        this._color = ((/** @type {?} */ (this._colorUpdate)))
            .pipe(scan((/**
         * @param {?} color
         * @param {?} op
         * @return {?}
         */
        (color, op) => {
            return op(color);
        }), this._defaultColor), share(), startWith(this._defaultColor));
        this._currentWidget = this._currentWidgetUpdate.pipe(filter((/**
         * @param {?} s
         * @return {?}
         */
        s => s != null)), map((/**
         * @param {?} s
         * @return {?}
         */
        s => (/** @type {?} */ (s)))), scan((/**
         * @param {?} widget
         * @param {?} op
         * @return {?}
         */
        (widget, op) => {
            return op(widget);
        }), (/** @type {?} */ ((/** @type {?} */ (null))))), publishReplay(1), refCount());
        this._reportForms
            .pipe(filter((/**
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
        })))
            .subscribe(this._formsVariablesUpdate);
        this._reportForms
            .pipe(filter((/**
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
        })))
            .subscribe(this._conditionNamesUpdate);
        /** @type {?} */
        const reportObs = this._report;
        reportObs
            .pipe(map((/**
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
                    if (r.content) {
                        this.parseColor(r.content.styles, tempColors);
                    }
                    if (r.footer) {
                        this.parseColor(r.footer.styles, tempColors);
                    }
                    if (r.header) {
                        this.parseColor(r.header.styles, tempColors);
                        for (let i = 0; i < r.header.content.length; i++) {
                            /** @type {?} */
                            let obj = r.header.content[i];
                            this.parseColor(obj.styles, tempColors);
                            if (obj.widgetType === AjfWidgetType.Layout) {
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
                }
                return (/** @type {?} */ (tempColors));
            });
        })))
            .subscribe(this._colorUpdate);
        reportObs
            .pipe(map((/**
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
        })))
            .subscribe(this._reportStylesUpdate);
        reportObs
            .pipe(map((/**
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
        })))
            .subscribe(this._headerWidgetsUpdate);
        reportObs
            .pipe(map((/**
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
        })))
            .subscribe(this._contentWidgetsUpdate);
        reportObs
            .pipe(map((/**
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
        })))
            .subscribe(this._footerWidgetsUpdate);
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
        this._saveReportEvent
            .pipe(combineLatest(this.report, this.reportForms), combineLatest(this._headerWidgets.pipe(filter((/**
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
        w => w != null)))))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            let obj = {};
            // const curRo = r[0][1];
            // const forms = r[0][2] != null ? r[0][2] || []
            //     : (curRo != null ? curRo.forms || [] : []);
            obj.header = (/** @type {?} */ ({ content: r[1].widgets.map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => deepCopy(w))), styles: r[1].styles }));
            obj.content = (/** @type {?} */ ({ content: r[2].widgets.map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => deepCopy(w))), styles: r[2].styles }));
            obj.footer = (/** @type {?} */ ({ content: r[3].widgets.map((/**
                 * @param {?} w
                 * @return {?}
                 */
                w => deepCopy(w))), styles: r[3].styles }));
            obj.styles = r[4];
            /** @type {?} */
            const ro = (/** @type {?} */ ({
                header: { content: r[1].widgets, styles: r[1].styles },
                content: { content: r[2].widgets, styles: r[2].styles },
                footer: { content: r[3].widgets, styles: r[3].styles },
                styles: r[4]
            }));
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
    get iconSets() {
        return this._iconSets;
    }
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
            /** @type {?} */
            const node = nodes[i];
            if (node.nodeType === AjfNodeType.AjfNodeGroup || node.nodeType === AjfNodeType.AjfSlide ||
                node.nodeType === AjfNodeType.AjfRepeatingSlide ||
                (node.nodeType === AjfNodeType.AjfField &&
                    ((/** @type {?} */ (node))).fieldType === AjfFieldType.String)) {
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
            if (cssStyles[k] && colors.indexOf(cssStyles[k]) == -1) {
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
        for (let i = 0; i < value.length; i++) {
            if (!this.isNumber(value[i])) {
                return false;
            }
        }
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
            const obj = { 'formula': htmlFormula, 'reference': reference };
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
                if (myObj.columns[j] !== -1 && !re1.test(String(myObj.columns[j])) &&
                    !re2.test(String(myObj.columns[j])) && !re3.test(String(myObj.columns[j]))) {
                    this.instantColumnValue(0.10, j);
                }
            }
            this.columnWidthChangedEmitter.emit();
            this._saveReportEvent.emit();
            return myObj;
        }));
    }
    /**
     * This method set the imageUrl on the current AjfImageWidget.
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
            myObj.url = createFormula({ formula: `"${imageUrl}"` });
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
            myObj.icon = createFormula({ formula: `"${icon}"` });
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
            myObj.flag = createFormula({ formula: `"${value}"` });
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
                let formula = createFormula({});
                /** @type {?} */
                let aggregation = createAggregation({});
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
                let formula = createFormula({});
                /** @type {?} */
                let aggregation = createAggregation({});
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
     * update type field of AjfChartWidget current widget
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
     * remove  idx element of xLabels field of AjfChartWidget current widget
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
     * update backgroundColor field of AjfChartWidget current widget
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
     * update borderColor field of AjfChartWidget current widget
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
     * This method set the font attribute on the current AjfWidget.
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
            const pxStyles = ['font-size', 'height', 'width', 'border-width', 'border-radius', 'padding', 'margin'];
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
     * Add an AjfWidget on _headerWidgetsUpdate
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
     * Add an AjfWidget on _contentWidgetsUpdate
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
     * Add an AjfWidget on _footerWidgetsUpdate
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
     * Add column on the current AjfLayoutWidget.
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
                tmpValue = parseFloat(this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                tempObj[0] -= tmpValue;
                tempObj[0] = this.roundTo(tempObj[0], 2);
            }
            else if (checkSum < 1) {
                tempObj[0] += (1 - (checkSum % 1));
                tempObj[0] = Number(this.roundTo(tempObj[0], 2).toFixed(2));
            }
            myObj.columns = tempObj;
            // TODO: @trik what's value?!?
            /** @type {?} */
            const columnObj = createWidget({
                widgetType: 7,
            });
            myObj.content.push(columnObj);
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
                    const myObj = (/** @type {?} */ (widget));
                    if (myObj.columns.length === 1) {
                        ((/** @type {?} */ (myObj.content[0]))).content.length = 0;
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
            default:
                throw new Error('unknown node ' + node);
        }
    }
    /**
     * This method add a AjfWidget on the current AjfLayoutWidget.
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
            let newWidget = deepCopy(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
        else {
            /** @type {?} */
            let obj = { 'widgetType': AjfWidgetType[event.dragData] };
            /** @type {?} */
            let newWidget = deepCopy(obj);
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
    { type: Injectable }
];
/** @nocollapse */
AjfReportBuilderService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
];
if (false) {
    /**
     *  this Observable observe the customWidgets obj
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._customWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._customWidgetsUpdate;
    /**
     * this Observable observe the name of the section that contains the current widget.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._origin;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._originUpdate;
    /**
     * this Observable observe the exported json
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._savedReport;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._savedReportUpdate;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._jsonStack;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._lastDeletedJson;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._emptyContent;
    /**
     *  this Observable observe if is fired drag mouse event.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._onDragged;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._onDraggedUpdate;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._onOver;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._onOverUpdate;
    /**
     * this Observable observe the status of permanent zoom
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._fixedZoom;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._fixedZoomUpdate;
    /**
     *  this Observable observe if is fired drag mouse event.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._onDragEnter;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._onDragEnterUpdate;
    /**
     * Observe the header widget array.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._headerWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._headerWidgetsUpdate;
    /**
     * observe the header styles.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._headerStyles;
    /**
     * Observe the content widget array
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._contentWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._contentWidgetsUpdate;
    /**
     * this Observable observe the content styles.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._contentStyles;
    /**
     * this Observable observe the footer widget array.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._footerWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._footerWidgetsUpdate;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._color;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._colorUpdate;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._defaultColor;
    /**
     * this Observable observe the footer styles.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._footerStyles;
    /**
     *  this Observable observe the current widget which holds the focus.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._currentWidget;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._currentWidgetUpdate;
    /**
     * Observe the AjfFormVariables exploit for field selecting from forms
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._formsVariables;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._formsVariablesUpdate;
    /**
     * Observe the AjfFormVariables exploit for field selecting from forms
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._conditionNames;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._conditionNamesUpdate;
    /**
     * this BehaviorSubject update export report.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._saveReport;
    /**
     * this BehaviorSubject contains the AjfReport.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._report;
    /**
     *  this Observable observe the styles of report.
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._reportStyles;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._reportStylesUpdate;
    /**
     * observe the forms fetched
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._reportForms;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._reportFormsUpdate;
    /**
     * dictionary for  widgetsUpdate
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._updates;
    /**
     * event emitter that notify when wont to save report
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._saveReportEvent;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._saveFormulaTOHtml;
    /**
     * event emitter that notify when column width changed
     *
     * \@memberOf AjfReportBuilderService
     * @type {?}
     */
    AjfReportBuilderService.prototype.columnWidthChangedEmitter;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderService.prototype._iconSets;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7OztBQVE1QyxNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7O0lBc09sQyxZQUFvRCxhQUErQjtRQS9OM0UseUJBQW9CLEdBQ3hCLElBQUksT0FBTyxFQUE2QixDQUFDO1FBUXJDLGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7UUFRdkQsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFFbEUsZUFBVSxHQUE4QixJQUFJLGVBQWUsQ0FBVyxFQUFF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QTZGOzs7Ozs7OztJQU83RixnREFBNkM7Ozs7O0lBQzdDLHNEQUE2Rjs7Ozs7Ozs7SUFPN0YsK0NBQTRDOzs7OztJQUM1QyxxREFDMkM7Ozs7Ozs7O0lBTzNDLDJDQU1FOzs7Ozs7OztJQU9GLG1EQUF3RTs7Ozs7SUFFeEUscURBQXdFOzs7Ozs7O0lBV3hFLDREQUF5RTs7Ozs7SUFFekUsNENBQXFEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZkZvcm0sIEFqZk5vZGUsIEFqZk5vZGVUeXBlLCBmbGF0dGVuTm9kZXN9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb24sXG4gIEFqZkNoYXJ0V2lkZ2V0LFxuICBBamZDb2x1bW5XaWRnZXQsXG4gIEFqZkN1c3RvbVdpZGdldCxcbiAgQWpmRGF0YVdpZGdldCxcbiAgQWpmSW1hZ2VXaWRnZXQsXG4gIEFqZkxheW91dFdpZGdldCxcbiAgQWpmUmVwb3J0LFxuICBBamZSZXBvcnRDb250YWluZXIsXG4gIEFqZlN0eWxlcyxcbiAgQWpmVGFibGVXaWRnZXQsXG4gIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZSxcbiAgY3JlYXRlQWdncmVnYXRpb24sXG4gIGNyZWF0ZVdpZGdldFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzLCBBamZSZXBvcnRJY29ucywgQWpmUmVwb3J0c0NvbmZpZywgQWpmV2lkZ2V0c0NvbnRhaW5lcn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ29sb3JPcGVyYXRpb24sXG4gIEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24sXG4gIEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24sXG4gIEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uLFxuICBBamZTdHlsZXNPcGVyYXRpb24sXG4gIEFqZldpZGdldE9wZXJhdGlvbixcbiAgQWpmV2lkZ2V0c09wZXJhdGlvblxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuaW1wb3J0IHtBSkZfUkVQT1JUU19DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgY29udGFpbnMgYWxsIHRoZSBsb2dpYyB0byBtb2RlbCB0aGUgcmVwb3J0IHdpZGdldC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyU2VydmljZSB7XG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1c3RvbVdpZGdldHMgb2JqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT47XG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudCB3aWRnZXQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb3JpZ2luOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX29yaWdpblVwZGF0ZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZXhwb3J0ZWQganNvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0OiBPYnNlcnZhYmxlPEFqZlJlcG9ydD47XG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0VXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydD4gPSBuZXcgU3ViamVjdDxBamZSZXBvcnQ+KCk7XG5cbiAgcHJpdmF0ZSBfanNvblN0YWNrOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIHByaXZhdGUgX2xhc3REZWxldGVkSnNvbjogc3RyaW5nfHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9lbXB0eUNvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ2dlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIHByaXZhdGUgX29uT3ZlcjogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25PdmVyVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHBlcm1hbmVudCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZml4ZWRab29tOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9maXhlZFpvb21VcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ0VudGVyOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgX29uRHJhZ0VudGVyVXBkYXRlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGhlYWRlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGhlYWRlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGNvbnRlbnQgd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGNvbnRlbnQgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cblxuICBwcml2YXRlIF9jb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHByaXZhdGUgX2NvbG9yVXBkYXRlOiBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9kZWZhdWx0Q29sb3I6IHN0cmluZ1tdID0gW1xuICAgICdyZ2JhKDAsIDAsIDAsIDEpJywgICAgICAgJ3JnYmEoNTEsIDE1MywgMjU1LCAxKScsICAncmdiYSgxNTMsIDIwNCwgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTAyLCAwLCAxKScsICAgJ3JnYmEoMCwgMjA0LCAyMDQsIDEpJywgICAncmdiYSgyMDQsIDIwNCwgMTUzLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJywgICAncmdiYSgyMzAsIDAsIDAsIDEpJywgICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyNTUsIDAsIDEpJywgICAncmdiYSgwLCAxMzgsIDAsIDEpJywgICAgICdyZ2JhKDAsIDEwMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMTUzLCA1MSwgMjU1LCAxKScsICAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsICdyZ2JhKDI1MCwgMjA0LCAyMDQsIDEpJyxcbiAgICAncmdiYSgyNTUsIDIzNSwgMjA0LCAxKScsICdyZ2JhKDI1NSwgMjU1LCAyMDQsIDEpJywgJ3JnYmEoMjA0LCAyMzIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDIwNCwgMjI0LCAyNDUsIDEpJywgJ3JnYmEoMjM1LCAyMTQsIDI1NSwgMSknLCAncmdiYSgxODcsIDE4NywgMTg3LCAxKScsXG4gICAgJ3JnYmEoMjQwLCAxMDIsIDEwMiwgMSknLCAncmdiYSgyNTUsIDE5NCwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAxMDIsIDEpJyxcbiAgICAncmdiYSgxMDIsIDE4NSwgMTAyLCAxKScsICdyZ2JhKDEwMiwgMTYzLCAyMjQsIDEpJywgJ3JnYmEoMTk0LCAxMzMsIDI1NSwgMSknLFxuICAgICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEpJywgJ3JnYmEoMTYxLCAwLCAwLCAxKScsICAgICAncmdiYSgxNzgsIDEwNywgMCwgMSknLFxuICAgICdyZ2JhKDE3OCwgMTc4LCAwLCAxKScsICAgJ3JnYmEoMCwgOTcsIDAsIDEpJywgICAgICAncmdiYSgwLCA3MSwgMTc4LCAxKScsXG4gICAgJ3JnYmEoMTA3LCAzNiwgMTc4LCAxKScsICAncmdiYSg2OCwgNjgsIDY4LCAxKScsICAgICdyZ2JhKDkyLCAwLCAwLCAxKScsXG4gICAgJ3JnYmEoMTAyLCA2MSwgMCwgMSknLCAgICAncmdiYSgxMDIsIDEwMiwgMCwgMSknLCAgICdyZ2JhKDAsIDU1LCAwLCAxKScsXG4gICAgJ3JnYmEoMCwgNDEsIDEwMiwgMSknLCAgICAncmdiYSg2MSwgMjAsIDEwMiwgMSknXG4gIF07XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VycmVudCB3aWRnZXQgd2hpY2ggaG9sZHMgdGhlIGZvY3VzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXQ6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+O1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgdXBkYXRlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IGNvbnRhaW5zIHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0fG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnR8bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3R5bGVzIG9mIHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzVXBkYXRlOiBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGZvcm1zIGZldGNoZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRGb3JtczogT2JzZXJ2YWJsZTxBamZGb3JtW10+O1xuICBwcml2YXRlIF9yZXBvcnRGb3Jtc1VwZGF0ZTogU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIGRpY3Rpb25hcnkgZm9yICB3aWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlczogYW55ID0ge1xuICAgIGhlYWRlcjogdGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb250ZW50OiB0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSxcbiAgICBmb290ZXI6IHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsXG4gICAgY29sb3I6IHRoaXMuX2NvbG9yVXBkYXRlLFxuICAgIGN1c3RvbVdpZGdldHM6IHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGVcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIHdvbnQgdG8gc2F2ZSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0RXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9zYXZlRm9ybXVsYVRPSHRtbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZXRGb3JtdWxhVG9IdG1sRXZlbnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIGNvbHVtbiB3aWR0aCBjaGFuZ2VkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2ljb25TZXRzOiBBamZSZXBvcnRJY29ucyA9IHsnYWpmLWljb24nOiBbXX07XG4gIGdldCBpY29uU2V0cygpOiBBamZSZXBvcnRJY29ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb25TZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBSkZfUkVQT1JUU19DT05GSUcpIHJlcG9ydHNDb25maWc6IEFqZlJlcG9ydHNDb25maWcpIHtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcblxuICAgIGlmIChyZXBvcnRzQ29uZmlnICE9IG51bGwpIHtcbiAgICAgIGlmIChyZXBvcnRzQ29uZmlnLmljb25zICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5faWNvblNldHMgPSB7Li4udGhpcy5faWNvblNldHMsIC4uLnJlcG9ydHNDb25maWcuaWNvbnN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX29yaWdpbiA9ICg8T2JzZXJ2YWJsZTxzdHJpbmc+PnRoaXMuX29yaWdpblVwZGF0ZSkucGlwZShzdGFydFdpdGgoJ2hlYWRlcicpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX3NhdmVkUmVwb3J0ID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydD4+dGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUpLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWQgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25EcmFnZ2VkVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25PdmVyID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uT3ZlclVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX2ZpeGVkWm9vbSA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9maXhlZFpvb21VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdFbnRlciA9IHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9yZXBvcnRTdHlsZXMgPSAoPE9ic2VydmFibGU8QWpmU3R5bGVzT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKHN0eWxlczogQWpmU3R5bGVzLCBvcDogQWpmU3R5bGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDxBamZTdHlsZXM+e30pLCBzaGFyZSgpLCBzdGFydFdpdGgoPEFqZlN0eWxlcz57fSkpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGZvcm1zOiBBamZGb3JtW10sIG9wOiBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGZvcm1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0cyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10sIG9wOiBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9mb3Jtc1ZhcmlhYmxlcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2hlYWRlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVzID0gdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29udGVudFdpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29udGVudFN0eWxlcyA9IHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2Zvb3RlclN0eWxlcyA9IHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbG9yID0gKDxPYnNlcnZhYmxlPEFqZkNvbG9yT3BlcmF0aW9uPj50aGlzLl9jb2xvclVwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChjb2xvcjogc3RyaW5nW10sIG9wOiBBamZDb2xvck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9kZWZhdWx0Q29sb3IpLCBzaGFyZSgpLCBzdGFydFdpdGgodGhpcy5fZGVmYXVsdENvbG9yKSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5waXBlKFxuICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICBtYXAocyA9PiBzISksXG4gICAgICAgIHNjYW4oXG4gICAgICAgICAgICAod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCwgb3A6IEFqZldpZGdldE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudWxsIGFzIHVua25vd24gYXMgQWpmV2lkZ2V0KSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNcbiAgICAgICAgLnBpcGUoZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksIG1hcCgoZm9ybXM6IEFqZkZvcm1bXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2M6IEFqZkZvcm1WYXJpYWJsZXNbXSk6IEFqZkZvcm1WYXJpYWJsZXNbXSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1zVmFyaWFibGVzVXBkYXRlKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zXG4gICAgICAgIC5waXBlKGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLCBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSk7XG5cbiAgICBjb25zdCByZXBvcnRPYnMgPSB0aGlzLl9yZXBvcnQ7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX2NvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yczogc3RyaW5nW10gPSB0aGlzLl9kZWZhdWx0Q29sb3I7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIGlmIChyLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5jb250ZW50LnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuZm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuZm9vdGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuaGVhZGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmhlYWRlci5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgb2JqID0gci5oZWFkZXIuY29udGVudFtpXTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihvYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxheW91dE9iaiA9IG9iaiBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5b3V0T2JqLmNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uT2JqID0gbGF5b3V0T2JqLmNvbnRlbnRbal0gYXMgQWpmQ29sdW1uV2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihjb2x1bW5PYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGNvbHVtbk9iai5jb250ZW50Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0T2JqID0gY29sdW1uT2JqLmNvbnRlbnRbel07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iod2lkZ2V0T2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gPHN0cmluZ1tdPnRlbXBDb2xvcnM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29sb3JVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9zdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+e307XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz5yLnN0eWxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuaGVhZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuaGVhZGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmhlYWRlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5jb250ZW50LmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmNvbnRlbnQuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuZm9vdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuZm9vdGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmZvb3Rlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnQucGlwZShtYXAoKGpzb246IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIChfcjogYW55KTogYW55ID0+IHtcbiAgICAgICAgaWYgKGpzb24gPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMucmVwb3J0LCB0aGlzLnJlcG9ydEZvcm1zKSxcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9ydFN0eWxlcy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHI6IFtcbiAgICAgICAgICAgICAgICAgICAgIFt2b2lkLCBBamZSZXBvcnQgfCBudWxsLCBBamZGb3JtW11dLCBBamZXaWRnZXRzQ29udGFpbmVyLCBBamZXaWRnZXRzQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgQWpmV2lkZ2V0c0NvbnRhaW5lciwgQWpmU3R5bGVzXG4gICAgICAgICAgICAgICAgICAgXSkgPT4ge1xuICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgIC8vIGNvbnN0IGN1clJvID0gclswXVsxXTtcbiAgICAgICAgICAvLyBjb25zdCBmb3JtcyA9IHJbMF1bMl0gIT0gbnVsbCA/IHJbMF1bMl0gfHwgW11cbiAgICAgICAgICAvLyAgICAgOiAoY3VyUm8gIT0gbnVsbCA/IGN1clJvLmZvcm1zIHx8IFtdIDogW10pO1xuXG4gICAgICAgICAgb2JqLmhlYWRlciA9IHtjb250ZW50OiByWzFdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbMV0uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLmNvbnRlbnQgPSB7Y29udGVudDogclsyXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzJdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5mb290ZXIgPSB7Y29udGVudDogclszXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzNdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5zdHlsZXMgPSByWzRdO1xuXG4gICAgICAgICAgY29uc3Qgcm8gPSB7XG4gICAgICAgICAgICBoZWFkZXI6IHtjb250ZW50OiByWzFdLndpZGdldHMsIHN0eWxlczogclsxXS5zdHlsZXN9LFxuICAgICAgICAgICAgY29udGVudDoge2NvbnRlbnQ6IHJbMl0ud2lkZ2V0cywgc3R5bGVzOiByWzJdLnN0eWxlc30sXG4gICAgICAgICAgICBmb290ZXI6IHtjb250ZW50OiByWzNdLndpZGdldHMsIHN0eWxlczogclszXS5zdHlsZXN9LFxuICAgICAgICAgICAgc3R5bGVzOiByWzRdXG4gICAgICAgICAgfSBhcyBBamZSZXBvcnQ7XG5cbiAgICAgICAgICB0aGlzLnNldFNhdmVSZXBvcnQob2JqKTtcbiAgICAgICAgICB0aGlzLl9zYXZlZFJlcG9ydFVwZGF0ZS5uZXh0KHJvKTtcbiAgICAgICAgICB0aGlzLnB1c2hKc29uU3RhY2soSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBmdW5jdGlvbnNcbiAgICpcbiAgICovXG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiByZW1vdmUgQWpmTm9kZUdyb3VwLCBBamZTbGlkZSwgQWpmUmVwZWF0aW5nU2xpZGUsIEFqZlN0cmluZ0ZpZWxkIGZyb20gYWpmbm9kZSBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaWx0ZXJOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8XG4gICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUgfHxcbiAgICAgICAgICAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQgJiZcbiAgICAgICAgICAgKG5vZGUgYXMgQWpmRmllbGQpLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLlN0cmluZykpIHtcbiAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHBhcnNlQ29sb3IoY3NzU3R5bGVzOiBhbnksIGNvbG9yczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZUtleXMgPSBbJ2JhY2tncm91bmQtY29sb3InLCAnYmFja2dyb3VuZENvbG9yJywgJ2NvbG9yJ107XG4gICAgc3R5bGVLZXlzLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChjc3NTdHlsZXNba10gJiYgY29sb3JzLmluZGV4T2YoY3NzU3R5bGVzW2tdKSA9PSAtMSkge1xuICAgICAgICBjb2xvcnMucHVzaChjc3NTdHlsZXNba10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICBsZXQgdmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXJpYWJsZXNbaV0gPSB7bm9kZXM6IFtdLCBsYWJlbHM6IFtdLCBuYW1lczogW10sIHR5cGVzOiBbXX07XG5cbiAgICAgIGlmIChmb3Jtc1tpXS5ub2RlcyAhPSBudWxsICYmIGZvcm1zW2ldLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyaWFibGVzW2ldLm5vZGVzID0gdGhpcy5maWx0ZXJOb2RlcyhmbGF0dGVuTm9kZXMoZm9ybXNbaV0ubm9kZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1tpXS5sYWJlbHMgPSB0aGlzLmV4dHJhY3RMYWJlbHNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLm5hbWVzID0gdGhpcy5leHRyYWN0TmFtZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLnR5cGVzID0gdGhpcy5leHRyYWN0VHlwZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzO1xuICB9XG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogIHRoZSBvYmogcmV0dXJuZWQgY29udGFpbnMgdGhlIGxhYmVsIGZpZWxkIG9mIGFqZk5vZGVcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZXh0cmFjdExhYmVsc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubGFiZWwpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZXh0cmFjdE5hbWVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBleHRyYWN0VHlwZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBBamZGaWVsZFR5cGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwOiBBamZGaWVsZCA9IDxBamZGaWVsZD5ub2Rlc1tpXTtcbiAgICAgIG9iai5wdXNoKHAuZmllbGRUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHNldE9yaWdpbihvcmlnaW46IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29yaWdpblVwZGF0ZS5uZXh0KG9yaWdpbik7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZSB0byB0aGUgZGVjaW1hbCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGRlY2ltYWxwb3NpdGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15cXGQrKFxcLlxcZCspPy8udGVzdCh2YWx1ZSk7XG4gIH1cblxuICBpc051bWJlckFycmF5KHZhbHVlOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc051bWJlcih2YWx1ZVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ2dlZCBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdnZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnZ2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25PdmVyIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uT3ZlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbk92ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9maXhlZFpvb20gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZml4ZWRab29tKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFpvb207XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdFbnRlciBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdFbnRlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdFbnRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdFbnRlciB3aXRoICBzZWN0aW9uKGhlYWRlcixjb250ZW50LGZvb3RlcikgYW5kIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0VudGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHthcnJheSwgaW5kZXh9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbmRyYWdnZWQgd2l0aCB0cnVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuXG4gIGRyYWdFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbk92ZXIgd2l0aCB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlclN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgX29uT3ZlciB3aXRoIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlckVuZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdnZWQgd2l0aCBmYWxzZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0KCk6IE9ic2VydmFibGU8QWpmUmVwb3J0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgc2F2ZSByZXBvcnQgZXZlbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzYXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLl9zYXZlUmVwb3J0RXZlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKGZvcm11bGE6IEFqZkZvcm11bGEpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICB3LmZsYWcgPSBmb3JtdWxhO1xuICAgICAgdy5pY29uID0gZm9ybXVsYTtcbiAgICAgIHJldHVybiB3O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFUb0h0bWwoaHRtbEZvcm11bGE6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgb2JqID0geydmb3JtdWxhJzogaHRtbEZvcm11bGEsICdyZWZlcmVuY2UnOiByZWZlcmVuY2V9O1xuICAgICAgdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuZW1pdChvYmopO1xuICAgIH1cbiAgfVxuXG4gIHNldEVtcHR5Q29udGVudCh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9lbXB0eUNvbnRlbnQubmV4dCh2YWwpO1xuICB9XG5cblxuICBwdXNoSnNvblN0YWNrKGpzb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2suaW5kZXhPZihqc29uKSA9PT0gLTEgJiYganNvbiAhPT0gdGhpcy5fbGFzdERlbGV0ZWRKc29uKSB7XG4gICAgICBjdXJyZW50U3RhY2sucHVzaChqc29uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuICB9XG5cbiAgcG9wSnNvblN0YWNrKCk6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgIGxldCBlbXB0eUpzb24gPSAne1wiaGVhZGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LCcgK1xuICAgICAgICAnXCJjb250ZW50XCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwiJyArXG4gICAgICAgICdmb290ZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sXCJzdHlsZXNcIjp7fX0nO1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcbiAgICBjdXJyZW50U3RhY2sucG9wKCk7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gY3VycmVudFN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG4gICAgICB0aGlzLl9qc29uU3RhY2submV4dChbXSk7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICB0aGlzLnNldEVtcHR5Q29udGVudCh0cnVlKTtcbiAgICAgIHJldHVybiBlbXB0eUpzb247XG4gICAgfVxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG5cbiAgICByZXR1cm4gdGhpcy5fbGFzdERlbGV0ZWRKc29uO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IHRoZSBlbWl0dGVyXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2x1bW5XaWR0aENoYW5nZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2N1c3RvbVdpZGdldHMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VzdG9tV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbVdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIENvbnRlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50V2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb250ZW50IHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xvcnMgb2YgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2xvcnMoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgfVxuXG4gIGdldCBlbXB0eUNvbnRlbnQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2VtcHR5Q29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQXJyYXlXaWRnZXRzKHR5cGU6IHN0cmluZywgbmV3V2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKSB7XG4gICAgaWYgKCh0eXBlICE9PSAnaGVhZGVyJykgJiYgKHR5cGUgIT09ICdjb250ZW50JykgJiYgKHR5cGUgIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgJyArIHR5cGUpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVzW3R5cGVdLm5leHQoKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZm9ybXNWYXJpYWJsZXMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybXNWYXJpYWJsZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybXNWYXJpYWJsZXM7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uTmFtZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uTmFtZXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRXaWRnZXQoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50V2lkZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIFVwZGF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZSB3aXRoIG5ld1dpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUN1cnJlbnRXaWRnZXQobmV3V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgoX3dpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZ2V0U2F2ZVJlcG9ydCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlUmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfanNvblNhdmVkUmVwb3J0IG9iZXNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTYXZlZCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydD4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlZFJlcG9ydDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0U3R5bGVzIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRGb3JtcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRGb3JtcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRGb3JtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIF9vcmlnaW4gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb3JpZ2luKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhc3NpZ25zIHRoZSBuZXcgd2lkdGggdG8gdGhlIGlkeCBjb2x1bW5cbiAgICogYW5kIHJlY2FsY3VsYXRlcyB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIG9mIHRoZSBsYXlvdXQuXG4gICAqIFRoZSByYW5nZSB2YWx1ZSBhcmUgZnJvbSAwLDEgdG8gMS5cbiAgICpcbiAgICogUlVMRVM6XG4gICAqIFRoZSBtaW4gdmFsdWUgZm9yIGNvbHVtbiBpcyAwLDEuXG4gICAqIFRoZSBzdW0gb2YgYWxsIGNvbHVtbnMgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqIFRoZSBtZXRob2Qgcm91bmQgdGhlIHZhbHVlcy5cbiAgICogSWYgaXMgcHJlc2VudCBvbmx5IG9uZSBjb2x1bW4gdGhlIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYD5gIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBkZWNyZWFzZXMuXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPGAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGluY3JlYXNlcy5cbiAgICpcbiAgICogV2hlbiB2YWx1ZXMg4oCL4oCLYXJlIHBlcmlvZGljLCByb3VuZGluZyBhc3NpZ25zIHRoZSBnYXAgdG8gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEZvciBleGFtcGxlOiAzIGNvbHVtbnMgd2l0aCAwLDMzIGJlbGlldmUgMSBjb2x1bW4gMCwzNCBhbmQgMiBjb2x1bW5zIDAsMzMuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdWYWx1ZVxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaW5zdGFudENvbHVtblZhbHVlKG5ld1ZhbHVlOiBudW1iZXIsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgbGV0IHNpemUgPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcblxuICAgICAgbGV0IHNwcmVhZFZhbHVlID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICBsZXQgaWR4Rmlyc3ROb09iaiA9IC0xO1xuXG4gICAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgICBsZXQgZm91bmRGaXJzdE5vT2JqID0gZmFsc2U7XG5cbiAgICAgIGxldCByZTEgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV1bMC05XSQpJyk7XG4gICAgICBsZXQgcmUyID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldJCknKTtcbiAgICAgIGxldCByZTMgPSBuZXcgUmVnRXhwKCdeWzFdJCcpO1xuXG4gICAgICBsZXQgb2xkVmFsdWUgPSBteU9iai5jb2x1bW5zW2lkeF07XG5cbiAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhuZXdWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdmFsdWUnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9sZFZhbHVlID09IC0xKSB7XG4gICAgICAgIG9sZFZhbHVlID0gMC4xO1xuICAgICAgICBvYmpOdW0tLTtcbiAgICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAoc2l6ZSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAwLjE7XG4gICAgICB9IGVsc2UgaWYgKG9sZFZhbHVlIDwgMC4xKSB7XG4gICAgICAgIG9sZFZhbHVlID0gMC4xO1xuICAgICAgfVxuXG5cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1swXSA9IDE7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlIDwgMC4xKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAwLjE7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgKyAwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpID4gMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMSAtICgwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgob2xkVmFsdWUgPT09IG5ld1ZhbHVlKSAmJiAob2xkVmFsdWUgPT09IDAuMSkpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgPiBuZXdWYWx1ZSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUgLSBuZXdWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZCA9IGZhbHNlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG5ld1ZhbHVlIC0gb2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwcmVhZFZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhzcHJlYWRWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgaWYgKHNwcmVhZFZhbHVlIDwgMC4wMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMC4xO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldICE9PSAtMSkge1xuICAgICAgICAgIGlmICgoaSA9PSBpZHgpKSB7XG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAoKG15T2JqLmNvbHVtbnNbaV0gPiAwLjkpICYmIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIG9iak51bSAhPSAxKSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjkwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gLT0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldIDwgMC4xKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuMTA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpXSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgICAgICBzdW0gKz0gbXlPYmouY29sdW1uc1tpXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHN1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqID09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZHhGaXJzdE5vT2JqID0gaTtcbiAgICAgICAgICAgIGZvdW5kRmlyc3ROb09iaiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gLTEpIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gLTE7XG4gICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmopIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeEZpcnN0Tm9PYmpdICs9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAtIHN1bSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAtIHN1bSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSAhPT0gLTEgJiYgIXJlMS50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiZcbiAgICAgICAgICAgICFyZTIudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmICFyZTMudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpKSB7XG4gICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoMC4xMCwgaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlci5lbWl0KCk7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgaW1hZ2VVcmwgb24gdGhlIGN1cnJlbnQgQWpmSW1hZ2VXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZVVybFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLnVybCA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aW1hZ2VVcmx9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRJY29uKGljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5pY29uID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpY29ufVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5mbGFnID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHt2YWx1ZX1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oY29uZGl0aW9uVGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHdpZGdldC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgICAgd2lkZ2V0LnZpc2liaWxpdHkuY29uZGl0aW9uID0gY29uZGl0aW9uVGV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ2hhcnRGb3JtdWxhKFxuICAgICAgX2xhYmVsOiBzdHJpbmcsIF9sZXZlbDogbnVtYmVyLCBfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyLCBmb3JtdWxhVGV4dDogc3RyaW5nLFxuICAgICAgYWdncmVnYXRpb25UeXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0ICE9IG51bGwgJiYgd2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgb2JqOiBhbnk7XG5cbiAgICAgICAgZm9ybXVsYS5mb3JtdWxhID0gZm9ybXVsYVRleHQ7XG4gICAgICAgIGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uID0gYWdncmVnYXRpb25UeXBlO1xuXG4gICAgICAgIC8vIG9iaiA9IHtcbiAgICAgICAgLy8gICAnZm9ybXVsYSc6IGZvcm11bGEudG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2FnZ3JlZ2F0aW9uJzogYWdncmVnYXRpb24udG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2xhYmVsJzogbGFiZWxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBkYXRhc2V0ID0gQWpmRGF0YXNldC5mcm9tSnNvbihvYmopO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgcm93IHRoYXQgY29udGFpbnMgbWFpbiBkYXRhIGlzIGRlZmluZWRcbiAgICAgICAgLyogaWYgKHdpZGdldC5kYXRhc2V0WzBdID09IG51bGwpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFswXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxldmVsID09IDAgJiYgbWFpbkluZGV4ID09IC0xICYmIGluZGV4ID09IC0xKSB7XG5cbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFswXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09IDEgJiYgbWFpbkluZGV4ID09IC0xICYmIGluZGV4ID09IC0xKSB7XG5cbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGhdID0gW107XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoIC0gMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4ICsgMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlVGFibGVGb3JtdWxhKFxuICAgICAgX2xhYmVsOiBzdHJpbmcsIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyLCBmb3JtdWxhVGV4dDogc3RyaW5nLCBfbWFpbkluZGV4OiBudW1iZXIsXG4gICAgICBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZUYWJsZVdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0ID0gbmV3IEFqZkRhdGFzZXQoKTtcbiAgICAgICAgLy8gbGV0IHJvd0RhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IFtdO1xuICAgICAgICAvLyBsZXQgb2JqOiBhbnk7XG5cbiAgICAgICAgZm9ybXVsYS5mb3JtdWxhID0gZm9ybXVsYVRleHQ7XG4gICAgICAgIGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uID0gYWdncmVnYXRpb25UeXBlO1xuXG4gICAgICAgIC8vIG9iaiA9IHtcbiAgICAgICAgLy8gICAnZm9ybXVsYSc6IGZvcm11bGEudG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2FnZ3JlZ2F0aW9uJzogYWdncmVnYXRpb24udG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2xhYmVsJzogbGFiZWxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBkYXRhc2V0ID0gQWpmRGF0YXNldC5mcm9tSnNvbihvYmopO1xuICAgICAgICAvKiBpZiAobWFpbkluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGhdID0gW107XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoIC0gMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnB1c2goZGF0YXNldCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2RhdGFzZXQnLCBpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhKF9tYWluSW5kZXg6IG51bWJlciwgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmRGF0YVdpZGdldD53aWRnZXQ7XG5cbiAgICAgIC8qIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgbXlPYmouZGF0YXNldC5zcGxpY2UobWFpbkluZGV4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHR5cGUgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydFR5cGUodHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCd0eXBlJywgdHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlICBpZHggZWxlbWVudCBvZiB4TGFiZWxzIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZW1vdmVNYWluRGF0YShfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLy8gbXlPYmouZGF0YXNldFswXS5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUmVsYXRlZERhdGEoX21haW5JZHg6IG51bWJlciwgX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8qIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgbXlPYmouZGF0YXNldC5zcGxpY2UobWFpbklkeCArIDEsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSWR4ICsgMV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBiYWNrZ3JvdW5kQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBhZGRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGJvcmRlckNvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJvcmRlckNvbG9yKGNvbG9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIHNldENoYXJ0Qm9yZGVyV2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyV2lkdGgnLCB2YWx1ZSk7XG4gIH1cblxuICBhZGRDaGFydEJvcmRlckNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0Qm9yZGVyQ29sb3IoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydChyZXBvcnQ6IEFqZlJlcG9ydCk6IHZvaWQge1xuICAgIHRoaXMuX3JlcG9ydC5uZXh0KHJlcG9ydCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBleHBvcnQgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0U2F2ZVJlcG9ydChqc29uOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlUmVwb3J0Lm5leHQoanNvbik7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBmb250IGF0dHJpYnV0ZSBvbiB0aGUgY3VycmVudCBBamZXaWRnZXQuXG4gICAqXG4gICAqIFRoZXJlIGlzIGEgY2hlY2sgb24gZm9udC1zaXplIGF0dHJpYnV0ZSxcbiAgICogaWYgaXMgbm8gc3BlY2lmaWNhdGUgdGhlIHR5cGUgb2Ygc2l6ZSBmb250IHNldCAncHQnIGFzIGRlZmF1bHQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZUZXh0V2lkZ2V0PndpZGdldDtcblxuICAgICAgY29uc3QgcHhTdHlsZXMgPVxuICAgICAgICAgIFsnZm9udC1zaXplJywgJ2hlaWdodCcsICd3aWR0aCcsICdib3JkZXItd2lkdGgnLCAnYm9yZGVyLXJhZGl1cycsICdwYWRkaW5nJywgJ21hcmdpbiddO1xuICAgICAgY29uc3QgaXNQeFN0eWxlID0gcHhTdHlsZXMuaW5kZXhPZihsYWJlbCkgPiAtMTtcbiAgICAgIGlmIChpc1B4U3R5bGUgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSArPSAncHgnO1xuICAgICAgfSBlbHNlIGlmIChpc1B4U3R5bGUgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLmlzTnVtYmVyQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gYCR7dmFsdWUuam9pbigncHggJyl9cHhgO1xuICAgICAgfVxuXG4gICAgICBteU9iai5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB1cGRhdGUgdGhlIHN0eWxlcyBvZiBvcmlnaW4gd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBwYXJhbSBvcmlnaW4gY2FuIGJlIGhlYWRlciBjb250ZW50IG9yIGZvb3RlclxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0U2VjdGlvblN0eWxlcyhvcmlnaW46IHN0cmluZywgbGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGlmICgob3JpZ2luICE9PSAnaGVhZGVyJykgJiYgKG9yaWdpbiAhPT0gJ2NvbnRlbnQnKSAmJiAob3JpZ2luICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5ja25vdyBvcmlnaW4gJyArIG9yaWdpbik7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlc1tvcmlnaW5dLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgd2lkZ2V0LnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgd2lkZ2V0LnN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLndpZGdldC5zdHlsZXN9O1xuXG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHNldCB0aGUgc3R5bGUgb2YgdGhlIHdob2xlIHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlLm5leHQoKHN0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzID0+IHtcbiAgICAgIGlmIChzdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICBzdHlsZXMgPSB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcbiAgICAgICAgc3R5bGVzID0gPEFqZlN0eWxlcz57Li4uc3R5bGVzfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBmb3Jtc1xuICAgKlxuICAgKiBAcGFyYW0gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRGb3Jtcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNVcGRhdGUubmV4dCgoX2Zvcm06IEFqZkZvcm1bXSk6IEFqZkZvcm1bXSA9PiB7XG4gICAgICByZXR1cm4gZm9ybXMgfHwgW107XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZEN1c3RvbVdpZGdldHMod2lkZ2V0OiBBamZDdXN0b21XaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMgPSBjdXN0b21XaWRnZXRzIHx8IFtdO1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVzZXQgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVzZXRDdXN0b21XaWRnZXRzKCkge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzLmxlbmd0aCA9IDA7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgbGFiZWwgb2Ygd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gcG9zaXRpb25cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjaGFuZ2VMYWJlbEN1c3RvbVdpZGdldChsYWJlbDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHNbcG9zaXRpb25dLnR5cGUgPSBsYWJlbDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2hlYWRlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZEhlYWRlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9jb250ZW50V2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29udGVudFdpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfZm9vdGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkZm9vdGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgdW5maXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHNwcmVhZFZhbHVlOiBhbnk7XG4gICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldICE9PSAtMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICBzcHJlYWRWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSB0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbHVtbiBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIFdoZW4gYWRkaW5nIGEgY29sdW1uIHRoZSB3aWR0aCBvZiB0aGUgb3RoZXIgY29sdW1ucyBpcyByZWNhbGN1bGF0ZWRcbiAgICogYnkgZGl2aWRpbmcgaXQgYnkgdGhlIG51bWJlciBvZiBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb2x1bW4oKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgdGVtcE9iajogbnVtYmVyW10gPSBbXTtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aCArIDE7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHRtcFZhbHVlOiBhbnk7XG5cbiAgICAgIGlmIChudW0gPiAxMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4Y2VlZCBtYXggY29sdW1ucycpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA9PT0gLTEpIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2goLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHRtcFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnJvdW5kVG8oKChjaGVja1N1bSAtIDEpICUgMSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB0ZW1wT2JqWzBdIC09IHRtcFZhbHVlO1xuICAgICAgICB0ZW1wT2JqWzBdID0gdGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgdGVtcE9ialswXSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgdGVtcE9ialswXSA9IE51bWJlcih0aGlzLnJvdW5kVG8odGVtcE9ialswXSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLmNvbHVtbnMgPSB0ZW1wT2JqO1xuXG4gICAgICAvLyBUT0RPOiBAdHJpayB3aGF0J3MgdmFsdWU/IT9cbiAgICAgIGNvbnN0IGNvbHVtbk9iaiA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IDcsXG4gICAgICAgIC8vIHZhbHVlOiBteU9iai5jb2x1bW5zW215T2JqLmNvbHVtbnMubGVuZ3RoIC0gMV0sXG4gICAgICB9KTtcblxuICAgICAgbXlPYmouY29udGVudC5wdXNoKGNvbHVtbk9iaik7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlV2lkZ2V0VG9Db2x1bW4oY29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBjb2x1bW4uY29udGVudC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJlbW92ZSBhIHdpZGdldCBvbiB0aGUgY3VycmVudCBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlXG4gICAqIHRoZSBwb3NpdGlvbiBhcnJheTpcbiAgICpcbiAgICogaGVhZGVyIC1gPmAgaGVhZGVyV2lkZ2V0c1xuICAgKiBjb250ZW50IC1gPmAgY29udGVudFdpZGdldHNcbiAgICogZm9vdGVyIC1gPmAgZm9vdGVyV2lkZ2V0c1xuICAgKiBjb2x1bW4gLWA+YCBjb2x1bW4gb2YgbGF5b3V0XG4gICAqIGxheW91dENvbnRlbnQgLWA+YCBjb250ZW50IG9mIGxheW91dFxuICAgKiBvYmogLWA+YCBvYmogb2YgbGF5b3V0XG4gICAqIGN1c3RvbVdpZGdldCAtYD5gIGN1c3RvbSB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeCB0aGUgcG9zaXRpb24gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZW1vdmUobm9kZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHN3aXRjaCAobm9kZSkge1xuICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXlvdXQnOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAobXlPYmouY29udGVudFswXSBhcyBBamZDb2x1bW5XaWRnZXQpLmNvbnRlbnQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgIGNhc2UgJ2xheW91dENvbnRlbnQnOlxuICAgICAgY2FzZSAndW5maXhlZENvbHVtbic6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgICAgIGlmIChub2RlID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgbGV0IGNsbSA9IDxBamZDb2x1bW5XaWRnZXQ+d2lkZ2V0O1xuICAgICAgICAgICAgY2xtLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAnbGF5b3V0Q29udGVudCcpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gbGVuZ3RoIGlzIDAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgcmVtb3ZlIGFueSB3aWRnZXQgZnJvbSBlbXB0eSBjb250ZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9IG51bGwgJiYgbXlPYmouY29udGVudFtpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAndW5maXhlZENvbHVtbicpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBwb3NpdGlvbiB2YWx1ZSAgaXNudCAtMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmZpeGVkQ29sdW1uKGlkeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIChub2RlICE9PSAnb2JqJykge1xuICAgICAgICAgIC8vICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIC8vICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1c3RvbVdpZGdldHMnOiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgfSBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBub2RlICcgKyBub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIGEgQWpmV2lkZ2V0IG9uIHRoZSBjdXJyZW50IEFqZkxheW91dFdpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkVG9Db250ZW50KG5ld1dpZGdldDogQWpmV2lkZ2V0LCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouY29udGVudFtpZHhdICE9IG51bGwpIHtcbiAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFRvQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW4gIT0gbnVsbCkge1xuICAgICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgICBsZXQgd2lkZ2V0OiBBamZXaWRnZXQgPSBldmVudC5kcmFnRGF0YS53aWRnZXQ7XG4gICAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG5cbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaCh3aWRnZXQpO1xuXG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5hcnJheUZyb20pIHtcbiAgICAgIHRoaXMucmVtb3ZlKGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSwgZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4KTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChldmVudC5kcmFnRGF0YS53aWRnZXQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuanNvbikge1xuICAgICAgbGV0IG9iaiA9IEpTT04ucGFyc2UoZXZlbnQuZHJhZ0RhdGEuanNvbik7XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9iaiA9IHsnd2lkZ2V0VHlwZSc6IEFqZldpZGdldFR5cGVbZXZlbnQuZHJhZ0RhdGFdfTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGFuZ2VQb3NpdGlvbk9uQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHRvSW5kZXg6IG51bWJlcikge1xuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcbiAgICBsZXQgZnJvbVdpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF07XG4gICAgbGV0IHRvV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF07XG5cbiAgICBpZiAoZnJvbUNvbHVtbiA9PSB0b0NvbHVtbikge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF0gPSB0b1dpZGdldDtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XSA9IGZyb21XaWRnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHRvSW5kZXgsIDAsIGZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgdGhlIG9iaiBvbiB0aGUgaWR4IHBvc2l0aW9uLlxuICAgKiBPYmogaGF2ZSBhIG5vIHNwZWNpZmljYXRlIHdpZHRoIGFuZCBpcyBub3QgY2FsY3VsYXRlIGFzIGNvbHVtbnNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoLTEsIGlkeCk7XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBsYXlvdXRXaWRnZXQ6IEFqZkxheW91dFdpZGdldCkge1xuICAgIGlmICh0byA8IDAgfHwgdG8gPj0gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChmcm9tID4gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoIC0gMSAmJiB0byA+IGZyb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXTtcbiAgICBsZXQgZnJvbUNvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXTtcbiAgICBsZXQgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dO1xuICAgIGxldCB0b0NvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b107XG5cbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXSA9IHRvQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dID0gdG9Db2x1bW5WYWx1ZTtcbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFt0b10gPSBmcm9tQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW3RvXSA9IGZyb21Db2x1bW5WYWx1ZTtcblxuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChsYXlvdXRXaWRnZXQpO1xuICB9XG5cbiAgYWRkQ3VzdG9tQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX3VwZGF0ZXNbJ2NvbG9yJ10ubmV4dCgoY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgIGlmIChjb2xvcnMuaW5kZXhPZihjb2xvcikgPCAwKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRXaWRnZXRUb0NvbnRhaW5lcihcbiAgICAgIHN1Ymo6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4sIHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHN1YmoubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldCh3aWRnZXQpO1xuICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFyciA9ICg8QXJyYXk8YW55Pj4od2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdKTtcbiAgICAgIGFyci5wdXNoKHZhbHVlKTtcbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSBhcnI7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgKDxBcnJheTxhbnk+Pih3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0pLnNwbGljZShpZHgsIDEpO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxufVxuIl19