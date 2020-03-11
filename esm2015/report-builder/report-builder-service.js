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
        }))).subscribe(this._colorUpdate);
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
            default: throw new Error('unknown node ' + node);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUdNLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQzFELE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQzVFLE1BQU0sZ0JBQWdCLENBQUM7QUFPeEIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFRNUMsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7OztJQTBPbEMsWUFDMEMsYUFBK0I7UUFuT2pFLHlCQUFvQixHQUN4QixJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQVFyQyxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBUXZELHVCQUFrQixHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFDO1FBRWxFLGVBQVUsR0FDbEIsSUFBSSxlQUFlLENBQVcsRUFB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O0lBTzlELDhDQUMrQjs7Ozs7Ozs7SUFPL0IsMENBQzhDOzs7Ozs7OztJQU85QyxnREFBNkM7Ozs7O0lBQzdDLHNEQUE2Rjs7Ozs7Ozs7SUFPN0YsK0NBQTRDOzs7OztJQUM1QyxxREFDMkM7Ozs7Ozs7O0lBTzNDLDJDQU1FOzs7Ozs7OztJQU9GLG1EQUF3RTs7Ozs7SUFFeEUscURBQXdFOzs7Ozs7O0lBV3hFLDREQUF5RTs7Ozs7SUFFekUsNENBRUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmRm9ybSwgQWpmTm9kZSwgQWpmTm9kZVR5cGUsIGZsYXR0ZW5Ob2Rlc30gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmRm9ybXVsYSwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvbiwgQWpmQ2hhcnRXaWRnZXQsIEFqZkNvbHVtbldpZGdldCwgQWpmQ3VzdG9tV2lkZ2V0LCBBamZEYXRhV2lkZ2V0LCBBamZJbWFnZVdpZGdldCxcbiAgQWpmTGF5b3V0V2lkZ2V0LCBBamZSZXBvcnQsIEFqZlJlcG9ydENvbnRhaW5lciwgQWpmU3R5bGVzLCBBamZUYWJsZVdpZGdldCwgQWpmVGV4dFdpZGdldCxcbiAgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlLCBjcmVhdGVBZ2dyZWdhdGlvbiwgY3JlYXRlV2lkZ2V0XG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjb21iaW5lTGF0ZXN0LCBmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHNjYW4sIHNoYXJlLCBzdGFydFdpdGhcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXMsIEFqZlJlcG9ydEljb25zLCBBamZSZXBvcnRzQ29uZmlnLCBBamZXaWRnZXRzQ29udGFpbmVyfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZDb2xvck9wZXJhdGlvbiwgQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbiwgQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbiwgQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24sXG4gIEFqZlN0eWxlc09wZXJhdGlvbiwgQWpmV2lkZ2V0T3BlcmF0aW9uLCBBamZXaWRnZXRzT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5pbXBvcnQge0FKRl9SRVBPUlRTX0NPTkZJR30gZnJvbSAnLi90b2tlbnMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBjb250YWlucyBhbGwgdGhlIGxvZ2ljIHRvIG1vZGVsIHRoZSByZXBvcnQgd2lkZ2V0LlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlIHtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXN0b21XaWRnZXRzIG9ialxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHM6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+O1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBuYW1lIG9mIHRoZSBzZWN0aW9uIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnQgd2lkZ2V0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29yaWdpbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBwcml2YXRlIF9vcmlnaW5VcGRhdGU6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGV4cG9ydGVkIGpzb25cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlZFJlcG9ydDogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+O1xuICBwcml2YXRlIF9zYXZlZFJlcG9ydFVwZGF0ZTogU3ViamVjdDxBamZSZXBvcnQ+ID0gbmV3IFN1YmplY3Q8QWpmUmVwb3J0PigpO1xuXG4gIHByaXZhdGUgX2pzb25TdGFjazogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9XG4gIG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcblxuICBwcml2YXRlIF9sYXN0RGVsZXRlZEpzb246IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9lbXB0eUNvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9XG4gIG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ2dlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIHByaXZhdGUgX29uT3ZlcjogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25PdmVyVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHBlcm1hbmVudCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZml4ZWRab29tOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9maXhlZFpvb21VcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ0VudGVyOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgX29uRHJhZ0VudGVyVXBkYXRlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGhlYWRlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGhlYWRlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGNvbnRlbnQgd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGNvbnRlbnQgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cblxuICBwcml2YXRlIF9jb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHByaXZhdGUgX2NvbG9yVXBkYXRlOiBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9kZWZhdWx0Q29sb3I6IHN0cmluZ1tdID1cbiAgW1xuICAgICdyZ2JhKDAsIDAsIDAsIDEpJywgJ3JnYmEoNTEsIDE1MywgMjU1LCAxKScsICdyZ2JhKDE1MywgMjA0LCAwLCAxKScsICdyZ2JhKDI1NSwgMTAyLCAwLCAxKScsXG4gICAgJ3JnYmEoMCwgMjA0LCAyMDQsIDEpJywgJ3JnYmEoMjA0LCAyMDQsIDE1MywgMSknLCAncmdiYSgyNTUsIDE1MywgMCwgMSknLCAncmdiYSgyMzAsIDAsIDAsIDEpJyxcbiAgICAncmdiYSgyNTUsIDE1MywgMCwgMSknLCAncmdiYSgyNTUsIDI1NSwgMCwgMSknLCAncmdiYSgwLCAxMzgsIDAsIDEpJywgJ3JnYmEoMCwgMTAyLCAyMDQsIDEpJyxcbiAgICAncmdiYSgxNTMsIDUxLCAyNTUsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLCAncmdiYSgyNTAsIDIwNCwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyMzUsIDIwNCwgMSknLCAncmdiYSgyNTUsIDI1NSwgMjA0LCAxKScsICdyZ2JhKDIwNCwgMjMyLCAyMDQsIDEpJyxcbiAgICAncmdiYSgyMDQsIDIyNCwgMjQ1LCAxKScsICdyZ2JhKDIzNSwgMjE0LCAyNTUsIDEpJywgJ3JnYmEoMTg3LCAxODcsIDE4NywgMSknLFxuICAgICdyZ2JhKDI0MCwgMTAyLCAxMDIsIDEpJywgJ3JnYmEoMjU1LCAxOTQsIDEwMiwgMSknLCAncmdiYSgyNTUsIDI1NSwgMTAyLCAxKScsXG4gICAgJ3JnYmEoMTAyLCAxODUsIDEwMiwgMSknLCAncmdiYSgxMDIsIDE2MywgMjI0LCAxKScsICdyZ2JhKDE5NCwgMTMzLCAyNTUsIDEpJyxcbiAgICAncmdiYSgxMzYsIDEzNiwgMTM2LCAxKScsICdyZ2JhKDE2MSwgMCwgMCwgMSknLCAncmdiYSgxNzgsIDEwNywgMCwgMSknLFxuICAgICdyZ2JhKDE3OCwgMTc4LCAwLCAxKScsICdyZ2JhKDAsIDk3LCAwLCAxKScsICdyZ2JhKDAsIDcxLCAxNzgsIDEpJyxcbiAgICAncmdiYSgxMDcsIDM2LCAxNzgsIDEpJywgJ3JnYmEoNjgsIDY4LCA2OCwgMSknLCAncmdiYSg5MiwgMCwgMCwgMSknLCAncmdiYSgxMDIsIDYxLCAwLCAxKScsXG4gICAgJ3JnYmEoMTAyLCAxMDIsIDAsIDEpJywgJ3JnYmEoMCwgNTUsIDAsIDEpJywgJ3JnYmEoMCwgNDEsIDEwMiwgMSknLCAncmdiYSg2MSwgMjAsIDEwMiwgMSknXG4gIF07XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VycmVudCB3aWRnZXQgd2hpY2ggaG9sZHMgdGhlIGZvY3VzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXQ6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+O1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgdXBkYXRlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPVxuICBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IGNvbnRhaW5zIHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0IHwgbnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3R5bGVzIG9mIHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzVXBkYXRlOiBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGZvcm1zIGZldGNoZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRGb3JtczogT2JzZXJ2YWJsZTxBamZGb3JtW10+O1xuICBwcml2YXRlIF9yZXBvcnRGb3Jtc1VwZGF0ZTogU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIGRpY3Rpb25hcnkgZm9yICB3aWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlczogYW55ID0ge1xuICAgIGhlYWRlcjogdGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb250ZW50OiB0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSxcbiAgICBmb290ZXI6IHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsXG4gICAgY29sb3I6IHRoaXMuX2NvbG9yVXBkYXRlLFxuICAgIGN1c3RvbVdpZGdldHM6IHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGVcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIHdvbnQgdG8gc2F2ZSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0RXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9zYXZlRm9ybXVsYVRPSHRtbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZXRGb3JtdWxhVG9IdG1sRXZlbnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIGNvbHVtbiB3aWR0aCBjaGFuZ2VkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2ljb25TZXRzOiBBamZSZXBvcnRJY29ucyA9IHtcbiAgICAnYWpmLWljb24nOiBbXVxuICB9O1xuICBnZXQgaWNvblNldHMoKTogQWpmUmVwb3J0SWNvbnMgeyByZXR1cm4gdGhpcy5faWNvblNldHM7IH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFKRl9SRVBPUlRTX0NPTkZJRykgcmVwb3J0c0NvbmZpZzogQWpmUmVwb3J0c0NvbmZpZ1xuICApIHtcblxuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuXG4gICAgaWYgKHJlcG9ydHNDb25maWcgIT0gbnVsbCkge1xuICAgICAgaWYgKHJlcG9ydHNDb25maWcuaWNvbnMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9pY29uU2V0cyA9IHsuLi50aGlzLl9pY29uU2V0cywgLi4ucmVwb3J0c0NvbmZpZy5pY29uc307XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fb3JpZ2luID0gKDxPYnNlcnZhYmxlPHN0cmluZz4+dGhpcy5fb3JpZ2luVXBkYXRlKS5waXBlKFxuICAgICAgc3RhcnRXaXRoKCdoZWFkZXInKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5fc2F2ZWRSZXBvcnQgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Pj50aGlzLl9zYXZlZFJlcG9ydFVwZGF0ZSkucGlwZShcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uRHJhZ2dlZFVwZGF0ZSkucGlwZShcbiAgICAgIHN0YXJ0V2l0aChmYWxzZSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuX29uT3ZlciA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9vbk92ZXJVcGRhdGUpLnBpcGUoXG4gICAgICBzdGFydFdpdGgoZmFsc2UpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9maXhlZFpvb20gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZml4ZWRab29tVXBkYXRlKS5waXBlKFxuICAgICAgc3RhcnRXaXRoKGZhbHNlKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5fb25EcmFnRW50ZXIgPSB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzID0gKDxPYnNlcnZhYmxlPEFqZlN0eWxlc09wZXJhdGlvbj4+dGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChzdHlsZXM6IEFqZlN0eWxlcywgb3A6IEFqZlN0eWxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA8QWpmU3R5bGVzPnt9KSwgc2hhcmUoKSwgc3RhcnRXaXRoKDxBamZTdHlsZXM+e30pKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChmb3JtczogQWpmRm9ybVtdLCBvcDogQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChmb3Jtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2N1c3RvbVdpZGdldHMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdLCBvcDogQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fZm9ybXNWYXJpYWJsZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24+PnRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9oZWFkZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlcyA9IHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXMgPSB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mb290ZXJTdHlsZXMgPSB0aGlzLl9mb290ZXJXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9jb2xvciA9ICg8T2JzZXJ2YWJsZTxBamZDb2xvck9wZXJhdGlvbj4+dGhpcy5fY29sb3JVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2NhbigoY29sb3I6IHN0cmluZ1tdLCBvcDogQWpmQ29sb3JPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5fZGVmYXVsdENvbG9yKSwgc2hhcmUoKSwgc3RhcnRXaXRoKHRoaXMuX2RlZmF1bHRDb2xvcikpO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldCA9IHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUucGlwZShcbiAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICBtYXAocyA9PiBzISksXG4gICAgICBzY2FuKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsLCBvcDogQWpmV2lkZ2V0T3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcCh3aWRnZXQpO1xuICAgICAgfSwgbnVsbCBhcyB1bmtub3duIGFzIEFqZldpZGdldCksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMucGlwZShcbiAgICAgIGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLFxuICAgICAgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgIHJldHVybiAoX2M6IEFqZkZvcm1WYXJpYWJsZXNbXSk6IEFqZkZvcm1WYXJpYWJsZXNbXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUodGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMucGlwZShcbiAgICAgIGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLFxuICAgICAgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgIHJldHVybiAoX2M6IEFqZkZvcm1WYXJpYWJsZXNbXSk6IEFqZkZvcm1WYXJpYWJsZXNbXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUodGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpO1xuXG4gICAgY29uc3QgcmVwb3J0T2JzID0gdGhpcy5fcmVwb3J0O1xuXG4gICAgcmVwb3J0T2JzLnBpcGUoXG4gICAgICBtYXAoKHI6IEFqZlJlcG9ydCB8IG51bGwpID0+IHtcbiAgICAgICAgcmV0dXJuIChfY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgICAgICBsZXQgdGVtcENvbG9yczogc3RyaW5nW10gPSB0aGlzLl9kZWZhdWx0Q29sb3I7XG4gICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgaWYgKHIuY29udGVudCkge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5jb250ZW50LnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoci5mb290ZXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuZm9vdGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoci5oZWFkZXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuaGVhZGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgci5oZWFkZXIuY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSByLmhlYWRlci5jb250ZW50W2ldO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihvYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGF5b3V0T2JqID0gb2JqIGFzIEFqZkxheW91dFdpZGdldDtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5b3V0T2JqLmNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbk9iaiA9IGxheW91dE9iai5jb250ZW50W2pdIGFzIEFqZkNvbHVtbldpZGdldDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKGNvbHVtbk9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGNvbHVtbk9iai5jb250ZW50Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldE9iaiA9IGNvbHVtbk9iai5jb250ZW50W3pdO1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcih3aWRnZXRPYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gPHN0cmluZ1tdPnRlbXBDb2xvcnM7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICkuc3Vic2NyaWJlKHRoaXMuX2NvbG9yVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLnN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnt9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+ci5zdHlsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmhlYWRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmhlYWRlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5oZWFkZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuY29udGVudC5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5jb250ZW50LnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmZvb3RlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmZvb3Rlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5mb290ZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0LnBpcGUoXG4gICAgICBtYXAoKGpzb246IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKF9yOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICAgIGlmIChqc29uID0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudFxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5yZXBvcnQsIHRoaXMucmVwb3J0Rm9ybXMpLFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFkZXJXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudFdpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9mb290ZXJXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0U3R5bGVzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgLnN1YnNjcmliZSgocjogW1xuICAgICAgICAgICAgICAgICAgICAgW3ZvaWQsIEFqZlJlcG9ydCB8IG51bGwsIEFqZkZvcm1bXV0sIEFqZldpZGdldHNDb250YWluZXIsIEFqZldpZGdldHNDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICBBamZXaWRnZXRzQ29udGFpbmVyLCBBamZTdHlsZXNcbiAgICAgICAgICAgICAgICAgICBdKSA9PiB7XG4gICAgICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICAgICAgLy8gY29uc3QgY3VyUm8gPSByWzBdWzFdO1xuICAgICAgICAgIC8vIGNvbnN0IGZvcm1zID0gclswXVsyXSAhPSBudWxsID8gclswXVsyXSB8fCBbXVxuICAgICAgICAgIC8vICAgICA6IChjdXJSbyAhPSBudWxsID8gY3VyUm8uZm9ybXMgfHwgW10gOiBbXSk7XG5cbiAgICAgICAgICBvYmouaGVhZGVyID0ge2NvbnRlbnQ6IHJbMV0ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclsxXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouY29udGVudCA9IHtjb250ZW50OiByWzJdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbMl0uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLmZvb3RlciA9IHtjb250ZW50OiByWzNdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbM10uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLnN0eWxlcyA9IHJbNF07XG5cbiAgICAgICAgICBjb25zdCBybyA9IHtcbiAgICAgICAgICAgIGhlYWRlcjoge2NvbnRlbnQ6IHJbMV0ud2lkZ2V0cywgc3R5bGVzOiByWzFdLnN0eWxlc30sXG4gICAgICAgICAgICBjb250ZW50OiB7Y29udGVudDogclsyXS53aWRnZXRzLCBzdHlsZXM6IHJbMl0uc3R5bGVzfSxcbiAgICAgICAgICAgIGZvb3Rlcjoge2NvbnRlbnQ6IHJbM10ud2lkZ2V0cywgc3R5bGVzOiByWzNdLnN0eWxlc30sXG4gICAgICAgICAgICBzdHlsZXM6IHJbNF1cbiAgICAgICAgICB9IGFzIEFqZlJlcG9ydDtcblxuICAgICAgICAgIHRoaXMuc2V0U2F2ZVJlcG9ydChvYmopO1xuICAgICAgICAgIHRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlLm5leHQocm8pO1xuICAgICAgICAgIHRoaXMucHVzaEpzb25TdGFjayhKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIGZ1bmN0aW9uc1xuICAgKlxuICAgKi9cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIHJlbW92ZSBBamZOb2RlR3JvdXAsIEFqZlNsaWRlLCBBamZSZXBlYXRpbmdTbGlkZSwgQWpmU3RyaW5nRmllbGQgZnJvbSBhamZub2RlIGFycmF5XG4gICAqXG4gICAqIEBwYXJhbSBub2Rlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpbHRlck5vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXAgfHwgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHxcbiAgICAgICAgICBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSB8fFxuICAgICAgICAgIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZGaWVsZCAmJlxuICAgICAgICAgICAobm9kZSBhcyBBamZGaWVsZCkuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuU3RyaW5nKSkge1xuICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgcGFyc2VDb2xvcihjc3NTdHlsZXM6IGFueSwgY29sb3JzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlS2V5cyA9IFsnYmFja2dyb3VuZC1jb2xvcicsICdiYWNrZ3JvdW5kQ29sb3InLCAnY29sb3InXTtcbiAgICBzdHlsZUtleXMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBjc3NTdHlsZXNba10gJiZcbiAgICAgICAgY29sb3JzLmluZGV4T2YoY3NzU3R5bGVzW2tdKSA9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNzc1N0eWxlc1trXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmaWxsRm9ybXNWYXJpYWJsZXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIGxldCB2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhcmlhYmxlc1tpXSA9IHsgbm9kZXM6IFtdLCBsYWJlbHM6IFtdLCBuYW1lczogW10sIHR5cGVzOiBbXSB9O1xuXG4gICAgICBpZiAoZm9ybXNbaV0ubm9kZXMgIT0gbnVsbCAmJiBmb3Jtc1tpXS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhcmlhYmxlc1tpXS5ub2RlcyA9IHRoaXMuZmlsdGVyTm9kZXMoZmxhdHRlbk5vZGVzKGZvcm1zW2ldLm5vZGVzKSk7XG4gICAgICB9XG4gICAgICB2YXJpYWJsZXNbaV0ubGFiZWxzID0gdGhpcy5leHRyYWN0TGFiZWxzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS5uYW1lcyA9IHRoaXMuZXh0cmFjdE5hbWVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS50eXBlcyA9IHRoaXMuZXh0cmFjdFR5cGVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcblxuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzO1xuICB9XG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogIHRoZSBvYmogcmV0dXJuZWQgY29udGFpbnMgdGhlIGxhYmVsIGZpZWxkIG9mIGFqZk5vZGVcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZXh0cmFjdExhYmVsc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubGFiZWwpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZXh0cmFjdE5hbWVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBleHRyYWN0VHlwZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBBamZGaWVsZFR5cGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwOiBBamZGaWVsZCA9IDxBamZGaWVsZD5ub2Rlc1tpXTtcbiAgICAgIG9iai5wdXNoKHAuZmllbGRUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHNldE9yaWdpbihvcmlnaW46IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29yaWdpblVwZGF0ZS5uZXh0KG9yaWdpbik7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZSB0byB0aGUgZGVjaW1hbCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGRlY2ltYWxwb3NpdGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15cXGQrKFxcLlxcZCspPy8udGVzdCh2YWx1ZSk7XG4gIH1cblxuICBpc051bWJlckFycmF5KHZhbHVlOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc051bWJlcih2YWx1ZVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ2dlZCBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdnZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnZ2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25PdmVyIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uT3ZlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbk92ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9maXhlZFpvb20gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZml4ZWRab29tKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFpvb207XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdFbnRlciBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdFbnRlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdFbnRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdFbnRlciB3aXRoICBzZWN0aW9uKGhlYWRlcixjb250ZW50LGZvb3RlcikgYW5kIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0VudGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHsgYXJyYXksIGluZGV4IH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uZHJhZ2dlZCB3aXRoIHRydWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnU3RhcnRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdnZWQgd2l0aCBmYWxzZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG5cbiAgZHJhZ0VuZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uT3ZlciB3aXRoIHRydWVcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBvdmVyU3RhcnRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBfb25PdmVyIHdpdGggZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBvdmVyRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0xlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLm5leHQoe30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnQgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBlbWl0IHNhdmUgcmVwb3J0IGV2ZW50XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2F2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5fc2F2ZVJlcG9ydEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZUltYWdlRm9ybXVsYShmb3JtdWxhOiBBamZGb3JtdWxhKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBjb25zdCB3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgdy5mbGFnID0gZm9ybXVsYTtcbiAgICAgIHcuaWNvbiA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gdztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhVG9IdG1sKGh0bWxGb3JtdWxhOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgJ2Zvcm11bGEnOiBodG1sRm9ybXVsYSxcbiAgICAgICAgJ3JlZmVyZW5jZSc6IHJlZmVyZW5jZVxuICAgICAgfTtcbiAgICAgIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmVtaXQob2JqKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbXB0eUNvbnRlbnQodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZW1wdHlDb250ZW50Lm5leHQodmFsKTtcbiAgfVxuXG5cbiAgcHVzaEpzb25TdGFjayhqc29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmluZGV4T2YoanNvbikgPT09IC0xICYmIGpzb24gIT09IHRoaXMuX2xhc3REZWxldGVkSnNvbikge1xuICAgICAgY3VycmVudFN0YWNrLnB1c2goanNvbik7XG4gICAgfVxuXG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcbiAgfVxuXG4gIHBvcEpzb25TdGFjaygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGxldCBlbXB0eUpzb24gPVxuICAgICAgJ3tcImhlYWRlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSwnICtcbiAgICAgICdcImNvbnRlbnRcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sXCInICtcbiAgICAgICdmb290ZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sXCJzdHlsZXNcIjp7fX0nO1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcbiAgICBjdXJyZW50U3RhY2sucG9wKCk7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gY3VycmVudFN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG4gICAgICB0aGlzLl9qc29uU3RhY2submV4dChbXSk7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICB0aGlzLnNldEVtcHR5Q29udGVudCh0cnVlKTtcbiAgICAgIHJldHVybiBlbXB0eUpzb247XG4gICAgfVxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG5cbiAgICByZXR1cm4gdGhpcy5fbGFzdERlbGV0ZWRKc29uO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IHRoZSBlbWl0dGVyXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2x1bW5XaWR0aENoYW5nZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2N1c3RvbVdpZGdldHMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VzdG9tV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbVdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIENvbnRlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50V2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb250ZW50IHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xvcnMgb2YgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2xvcnMoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgfVxuXG4gIGdldCBlbXB0eUNvbnRlbnQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2VtcHR5Q29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQXJyYXlXaWRnZXRzKHR5cGU6IHN0cmluZywgbmV3V2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKSB7XG4gICAgaWYgKCh0eXBlICE9PSAnaGVhZGVyJykgJiYgKHR5cGUgIT09ICdjb250ZW50JykgJiYgKHR5cGUgIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgJyArIHR5cGUpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVzW3R5cGVdLm5leHQoKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZm9ybXNWYXJpYWJsZXMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybXNWYXJpYWJsZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybXNWYXJpYWJsZXM7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uTmFtZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uTmFtZXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRXaWRnZXQoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50V2lkZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIFVwZGF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZSB3aXRoIG5ld1dpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUN1cnJlbnRXaWRnZXQobmV3V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgoX3dpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZ2V0U2F2ZVJlcG9ydCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlUmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfanNvblNhdmVkUmVwb3J0IG9iZXNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTYXZlZCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydD4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlZFJlcG9ydDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0U3R5bGVzIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRGb3JtcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRGb3JtcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRGb3JtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIF9vcmlnaW4gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb3JpZ2luKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhc3NpZ25zIHRoZSBuZXcgd2lkdGggdG8gdGhlIGlkeCBjb2x1bW5cbiAgICogYW5kIHJlY2FsY3VsYXRlcyB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIG9mIHRoZSBsYXlvdXQuXG4gICAqIFRoZSByYW5nZSB2YWx1ZSBhcmUgZnJvbSAwLDEgdG8gMS5cbiAgICpcbiAgICogUlVMRVM6XG4gICAqIFRoZSBtaW4gdmFsdWUgZm9yIGNvbHVtbiBpcyAwLDEuXG4gICAqIFRoZSBzdW0gb2YgYWxsIGNvbHVtbnMgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqIFRoZSBtZXRob2Qgcm91bmQgdGhlIHZhbHVlcy5cbiAgICogSWYgaXMgcHJlc2VudCBvbmx5IG9uZSBjb2x1bW4gdGhlIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYD5gIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBkZWNyZWFzZXMuXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPGAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGluY3JlYXNlcy5cbiAgICpcbiAgICogV2hlbiB2YWx1ZXMg4oCL4oCLYXJlIHBlcmlvZGljLCByb3VuZGluZyBhc3NpZ25zIHRoZSBnYXAgdG8gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEZvciBleGFtcGxlOiAzIGNvbHVtbnMgd2l0aCAwLDMzIGJlbGlldmUgMSBjb2x1bW4gMCwzNCBhbmQgMiBjb2x1bW5zIDAsMzMuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdWYWx1ZVxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaW5zdGFudENvbHVtblZhbHVlKG5ld1ZhbHVlOiBudW1iZXIsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgbGV0IHNpemUgPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcblxuICAgICAgbGV0IHNwcmVhZFZhbHVlID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICBsZXQgaWR4Rmlyc3ROb09iaiA9IC0xO1xuXG4gICAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgICBsZXQgZm91bmRGaXJzdE5vT2JqID0gZmFsc2U7XG5cbiAgICAgIGxldCByZTEgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV1bMC05XSQpJyk7XG4gICAgICBsZXQgcmUyID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldJCknKTtcbiAgICAgIGxldCByZTMgPSBuZXcgUmVnRXhwKCdeWzFdJCcpO1xuXG4gICAgICBsZXQgb2xkVmFsdWUgPSBteU9iai5jb2x1bW5zW2lkeF07XG5cbiAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhuZXdWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdmFsdWUnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9sZFZhbHVlID09IC0xKSB7XG4gICAgICAgIG9sZFZhbHVlID0gMC4xO1xuICAgICAgICBvYmpOdW0tLTtcbiAgICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAoc2l6ZSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAwLjE7XG4gICAgICB9IGVsc2UgaWYgKG9sZFZhbHVlIDwgMC4xKSB7XG4gICAgICAgIG9sZFZhbHVlID0gMC4xO1xuICAgICAgfVxuXG5cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gLTEpIHtcblxuICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zWzBdID0gMTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUgPCAwLjEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDAuMTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSArIDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSkgPiAxKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAxIC0gKDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpICYmIChvbGRWYWx1ZSA9PT0gMC4xKSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRWYWx1ZSA+IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChvbGRWYWx1ZSAtIG5ld1ZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkID0gZmFsc2U7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAobmV3VmFsdWUgLSBvbGRWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ByZWFkVmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKHNwcmVhZFZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICBpZiAoc3ByZWFkVmFsdWUgPCAwLjAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAwLjE7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gLTE7XG4gICAgICAgIG9iak51bSsrO1xuICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChvbGRWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG5cbiAgICAgICAgICBpZiAoKGkgPT0gaWR4KSkge1xuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAoKG15T2JqLmNvbHVtbnNbaV0gPiAwLjkpICYmIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIG9iak51bSAhPSAxKSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjkwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gLT0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldIDwgMC4xKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuMTA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpXSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgICAgICBzdW0gKz0gbXlPYmouY29sdW1uc1tpXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHN1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqID09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZHhGaXJzdE5vT2JqID0gaTtcbiAgICAgICAgICAgIGZvdW5kRmlyc3ROb09iaiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gLTEpIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gLTE7XG4gICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmopIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeEZpcnN0Tm9PYmpdICs9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAtIHN1bSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAtIHN1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2pdICE9PSAtMSAmJlxuICAgICAgICAgICFyZTEudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmXG4gICAgICAgICAgIXJlMi50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiZcbiAgICAgICAgICAhcmUzLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgwLjEwLCBqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyLmVtaXQoKTtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBpbWFnZVVybCBvbiB0aGUgY3VycmVudCBBamZJbWFnZVdpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIGltYWdlVXJsXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0SW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmoudXJsID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpbWFnZVVybH1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEljb24oaWNvbjogeyBmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmcgfSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouaWNvbiA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aWNvbn1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouZmxhZyA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7dmFsdWV9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKGNvbmRpdGlvblRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh3aWRnZXQudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIHdpZGdldC52aXNpYmlsaXR5LmNvbmRpdGlvbiA9IGNvbmRpdGlvblRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICBfbGFiZWw6IHN0cmluZyxcbiAgICBfbGV2ZWw6IG51bWJlcixcbiAgICBfbWFpbkluZGV4OiBudW1iZXIsXG4gICAgX2luZGV4OiBudW1iZXIsXG4gICAgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICBhZ2dyZWdhdGlvblR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQgIT0gbnVsbCAmJiB3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSByb3cgdGhhdCBjb250YWlucyBtYWluIGRhdGEgaXMgZGVmaW5lZFxuICAgICAgICAvKiBpZiAod2lkZ2V0LmRhdGFzZXRbMF0gPT0gbnVsbCkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV2ZWwgPT0gMCAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT0gMSAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXggKyAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgfSAqL1xuXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZVRhYmxlRm9ybXVsYShcbiAgICBfbGFiZWw6IHN0cmluZyxcbiAgICBhZ2dyZWdhdGlvblR5cGU6IG51bWJlcixcbiAgICBmb3JtdWxhVGV4dDogc3RyaW5nLFxuICAgIF9tYWluSW5kZXg6IG51bWJlcixcbiAgICBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZUYWJsZVdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0ID0gbmV3IEFqZkRhdGFzZXQoKTtcbiAgICAgICAgLy8gbGV0IHJvd0RhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IFtdO1xuICAgICAgICAvLyBsZXQgb2JqOiBhbnk7XG5cbiAgICAgICAgZm9ybXVsYS5mb3JtdWxhID0gZm9ybXVsYVRleHQ7XG4gICAgICAgIGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uID0gYWdncmVnYXRpb25UeXBlO1xuXG4gICAgICAgIC8vIG9iaiA9IHtcbiAgICAgICAgLy8gICAnZm9ybXVsYSc6IGZvcm11bGEudG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2FnZ3JlZ2F0aW9uJzogYWdncmVnYXRpb24udG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2xhYmVsJzogbGFiZWxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBkYXRhc2V0ID0gQWpmRGF0YXNldC5mcm9tSnNvbihvYmopO1xuICAgICAgICAvKiBpZiAobWFpbkluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGhdID0gW107XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoIC0gMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnB1c2goZGF0YXNldCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2RhdGFzZXQnLCBpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhKF9tYWluSW5kZXg6IG51bWJlciwgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmRGF0YVdpZGdldD53aWRnZXQ7XG5cbiAgICAgIC8qIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgbXlPYmouZGF0YXNldC5zcGxpY2UobWFpbkluZGV4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHR5cGUgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydFR5cGUodHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCd0eXBlJywgdHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlICBpZHggZWxlbWVudCBvZiB4TGFiZWxzIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZW1vdmVNYWluRGF0YShfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLy8gbXlPYmouZGF0YXNldFswXS5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUmVsYXRlZERhdGEoX21haW5JZHg6IG51bWJlciwgX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8qIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgbXlPYmouZGF0YXNldC5zcGxpY2UobWFpbklkeCArIDEsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSWR4ICsgMV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBiYWNrZ3JvdW5kQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBhZGRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGJvcmRlckNvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJvcmRlckNvbG9yKGNvbG9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIHNldENoYXJ0Qm9yZGVyV2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyV2lkdGgnLCB2YWx1ZSk7XG4gIH1cblxuICBhZGRDaGFydEJvcmRlckNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0Qm9yZGVyQ29sb3IoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydChyZXBvcnQ6IEFqZlJlcG9ydCk6IHZvaWQge1xuICAgIHRoaXMuX3JlcG9ydC5uZXh0KHJlcG9ydCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBleHBvcnQgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0U2F2ZVJlcG9ydChqc29uOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlUmVwb3J0Lm5leHQoanNvbik7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBmb250IGF0dHJpYnV0ZSBvbiB0aGUgY3VycmVudCBBamZXaWRnZXQuXG4gICAqXG4gICAqIFRoZXJlIGlzIGEgY2hlY2sgb24gZm9udC1zaXplIGF0dHJpYnV0ZSxcbiAgICogaWYgaXMgbm8gc3BlY2lmaWNhdGUgdGhlIHR5cGUgb2Ygc2l6ZSBmb250IHNldCAncHQnIGFzIGRlZmF1bHQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZlRleHRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBjb25zdCBweFN0eWxlcyA9IFtcbiAgICAgICAgJ2ZvbnQtc2l6ZScsICdoZWlnaHQnLCAnd2lkdGgnLCAnYm9yZGVyLXdpZHRoJywgJ2JvcmRlci1yYWRpdXMnLCAncGFkZGluZycsICdtYXJnaW4nXG4gICAgICBdO1xuICAgICAgY29uc3QgaXNQeFN0eWxlID0gcHhTdHlsZXMuaW5kZXhPZihsYWJlbCkgPiAtMTtcbiAgICAgIGlmIChpc1B4U3R5bGUgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSArPSAncHgnO1xuICAgICAgfSBlbHNlIGlmIChpc1B4U3R5bGUgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLmlzTnVtYmVyQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gYCR7dmFsdWUuam9pbigncHggJyl9cHhgO1xuICAgICAgfVxuXG4gICAgICBteU9iai5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB1cGRhdGUgdGhlIHN0eWxlcyBvZiBvcmlnaW4gd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBwYXJhbSBvcmlnaW4gY2FuIGJlIGhlYWRlciBjb250ZW50IG9yIGZvb3RlclxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0U2VjdGlvblN0eWxlcyhvcmlnaW46IHN0cmluZywgbGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGlmICgob3JpZ2luICE9PSAnaGVhZGVyJykgJiYgKG9yaWdpbiAhPT0gJ2NvbnRlbnQnKSAmJiAob3JpZ2luICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5ja25vdyBvcmlnaW4gJyArIG9yaWdpbik7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlc1tvcmlnaW5dLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgd2lkZ2V0LnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgd2lkZ2V0LnN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLndpZGdldC5zdHlsZXN9O1xuXG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHNldCB0aGUgc3R5bGUgb2YgdGhlIHdob2xlIHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlLm5leHQoKHN0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzID0+IHtcbiAgICAgIGlmIChzdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICBzdHlsZXMgPSB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcbiAgICAgICAgc3R5bGVzID0gPEFqZlN0eWxlcz57Li4uc3R5bGVzfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBmb3Jtc1xuICAgKlxuICAgKiBAcGFyYW0gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRGb3Jtcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNVcGRhdGUubmV4dCgoX2Zvcm06IEFqZkZvcm1bXSk6IEFqZkZvcm1bXSA9PiB7XG4gICAgICByZXR1cm4gZm9ybXMgfHwgW107XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZEN1c3RvbVdpZGdldHMod2lkZ2V0OiBBamZDdXN0b21XaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMgPSBjdXN0b21XaWRnZXRzIHx8IFtdO1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVzZXQgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVzZXRDdXN0b21XaWRnZXRzKCkge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzLmxlbmd0aCA9IDA7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgbGFiZWwgb2Ygd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gcG9zaXRpb25cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjaGFuZ2VMYWJlbEN1c3RvbVdpZGdldChsYWJlbDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHNbcG9zaXRpb25dLnR5cGUgPSBsYWJlbDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2hlYWRlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZEhlYWRlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9jb250ZW50V2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29udGVudFdpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfZm9vdGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkZm9vdGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgdW5maXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHNwcmVhZFZhbHVlOiBhbnk7XG4gICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldICE9PSAtIDEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gdmFsdWU7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgc3ByZWFkVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gdGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb2x1bW4gb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBXaGVuIGFkZGluZyBhIGNvbHVtbiB0aGUgd2lkdGggb2YgdGhlIG90aGVyIGNvbHVtbnMgaXMgcmVjYWxjdWxhdGVkXG4gICAqIGJ5IGRpdmlkaW5nIGl0IGJ5IHRoZSBudW1iZXIgb2YgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IHRlbXBPYmo6IG51bWJlcltdID0gW107XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGggKyAxO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCB0bXBWYWx1ZTogYW55O1xuXG4gICAgICBpZiAobnVtID4gMTApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleGNlZWQgbWF4IGNvbHVtbnMnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPT09IC0xKSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2godmFsdWUpO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICB0bXBWYWx1ZSA9XG4gICAgICAgICAgcGFyc2VGbG9hdChcbiAgICAgICAgICAgIHRoaXMucm91bmRUbyhcbiAgICAgICAgICAgICAgKChjaGVja1N1bSAtIDEpICUgMSksIDJcbiAgICAgICAgICAgICkudG9GaXhlZCgyKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gLT0gdG1wVmFsdWU7XG4gICAgICAgIHRlbXBPYmpbMF0gPSB0aGlzLnJvdW5kVG8odGVtcE9ialswXSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICB0ZW1wT2JqWzBdICs9ICgxIC0gKGNoZWNrU3VtICUgMSkpO1xuICAgICAgICB0ZW1wT2JqWzBdID0gTnVtYmVyKHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgbXlPYmouY29sdW1ucyA9IHRlbXBPYmo7XG5cbiAgICAgIC8vIFRPRE86IEB0cmlrIHdoYXQncyB2YWx1ZT8hP1xuICAgICAgY29uc3QgY29sdW1uT2JqID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogNyxcbiAgICAgICAgLy8gdmFsdWU6IG15T2JqLmNvbHVtbnNbbXlPYmouY29sdW1ucy5sZW5ndGggLSAxXSxcbiAgICAgIH0pO1xuXG4gICAgICBteU9iai5jb250ZW50LnB1c2goY29sdW1uT2JqKTtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVXaWRnZXRUb0NvbHVtbihjb2x1bW46IEFqZkNvbHVtbldpZGdldCwgaW5kZXg6IG51bWJlcikge1xuICAgIGNvbHVtbi5jb250ZW50LnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcmVtb3ZlIGEgd2lkZ2V0IG9uIHRoZSBjdXJyZW50IEFqZlJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIG5vZGVcbiAgICogdGhlIHBvc2l0aW9uIGFycmF5OlxuICAgKlxuICAgKiBoZWFkZXIgLWA+YCBoZWFkZXJXaWRnZXRzXG4gICAqIGNvbnRlbnQgLWA+YCBjb250ZW50V2lkZ2V0c1xuICAgKiBmb290ZXIgLWA+YCBmb290ZXJXaWRnZXRzXG4gICAqIGNvbHVtbiAtYD5gIGNvbHVtbiBvZiBsYXlvdXRcbiAgICogbGF5b3V0Q29udGVudCAtYD5gIGNvbnRlbnQgb2YgbGF5b3V0XG4gICAqIG9iaiAtYD5gIG9iaiBvZiBsYXlvdXRcbiAgICogY3VzdG9tV2lkZ2V0IC1gPmAgY3VzdG9tIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4IHRoZSBwb3NpdGlvbiBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZShub2RlOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG5cbiAgICBzd2l0Y2ggKG5vZGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgKG15T2JqLmNvbnRlbnRbMF0gYXMgQWpmQ29sdW1uV2lkZ2V0KS5jb250ZW50Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbHVtbic6XG4gICAgICBjYXNlICdsYXlvdXRDb250ZW50JzpcbiAgICAgIGNhc2UgJ3VuZml4ZWRDb2x1bW4nOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgICAgICBpZiAobm9kZSA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgICAgIGxldCBjbG0gPSA8QWpmQ29sdW1uV2lkZ2V0PndpZGdldDtcbiAgICAgICAgICAgIGNsbS5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ2xheW91dENvbnRlbnQnKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIGxlbmd0aCBpcyAwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IHJlbW92ZSBhbnkgd2lkZ2V0IGZyb20gZW1wdHkgY29udGVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPSBudWxsICYmIG15T2JqLmNvbnRlbnRbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ3VuZml4ZWRDb2x1bW4nKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9PSAtMSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gcG9zaXRpb24gdmFsdWUgIGlzbnQgLTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudW5maXhlZENvbHVtbihpZHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiAobm9kZSAhPT0gJ29iaicpIHtcbiAgICAgICAgICAvLyAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAvLyAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b21XaWRnZXRzJzpcbiAgICAgICAge1xuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcigndW5rbm93biBub2RlICcgKyBub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIGEgQWpmV2lkZ2V0IG9uIHRoZSBjdXJyZW50IEFqZkxheW91dFdpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkVG9Db250ZW50KG5ld1dpZGdldDogQWpmV2lkZ2V0LCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouY29udGVudFtpZHhdICE9IG51bGwpIHtcbiAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFRvQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW4gIT0gbnVsbCkge1xuICAgICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgICBsZXQgd2lkZ2V0OiBBamZXaWRnZXQgPSBldmVudC5kcmFnRGF0YS53aWRnZXQ7XG4gICAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG5cbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaCh3aWRnZXQpO1xuXG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5hcnJheUZyb20pIHtcbiAgICAgIHRoaXMucmVtb3ZlKGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSwgZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4KTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChldmVudC5kcmFnRGF0YS53aWRnZXQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuanNvbikge1xuICAgICAgbGV0IG9iaiA9IEpTT04ucGFyc2UoZXZlbnQuZHJhZ0RhdGEuanNvbik7XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9iaiA9IHsnd2lkZ2V0VHlwZSc6IEFqZldpZGdldFR5cGVbZXZlbnQuZHJhZ0RhdGFdfTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGFuZ2VQb3NpdGlvbk9uQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHRvSW5kZXg6IG51bWJlcikge1xuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcbiAgICBsZXQgZnJvbVdpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF07XG4gICAgbGV0IHRvV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF07XG5cbiAgICBpZiAoZnJvbUNvbHVtbiA9PSB0b0NvbHVtbikge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF0gPSB0b1dpZGdldDtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XSA9IGZyb21XaWRnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHRvSW5kZXgsIDAsIGZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgdGhlIG9iaiBvbiB0aGUgaWR4IHBvc2l0aW9uLlxuICAgKiBPYmogaGF2ZSBhIG5vIHNwZWNpZmljYXRlIHdpZHRoIGFuZCBpcyBub3QgY2FsY3VsYXRlIGFzIGNvbHVtbnNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoLTEsIGlkeCk7XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBsYXlvdXRXaWRnZXQ6IEFqZkxheW91dFdpZGdldCkge1xuICAgIGlmICh0byA8IDAgfHwgdG8gPj0gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChmcm9tID4gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoIC0gMSAmJiB0byA+IGZyb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXTtcbiAgICBsZXQgZnJvbUNvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXTtcbiAgICBsZXQgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dO1xuICAgIGxldCB0b0NvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b107XG5cbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXSA9IHRvQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dID0gdG9Db2x1bW5WYWx1ZTtcbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFt0b10gPSBmcm9tQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW3RvXSA9IGZyb21Db2x1bW5WYWx1ZTtcblxuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChsYXlvdXRXaWRnZXQpO1xuICB9XG5cbiAgYWRkQ3VzdG9tQ29sb3IoY29sb3I6IHN0cmluZykge1xuXG4gICAgdGhpcy5fdXBkYXRlc1snY29sb3InXS5uZXh0KChjb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuXG4gICAgICBpZiAoY29sb3JzLmluZGV4T2YoY29sb3IpIDwgMCkge1xuICAgICAgICBjb2xvcnMucHVzaChjb2xvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3JzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkV2lkZ2V0VG9Db250YWluZXIoXG4gICAgICBzdWJqOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+LCB3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBzdWJqLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQod2lkZ2V0KTtcbiAgICB0aGlzLnNldEVtcHR5Q29udGVudChmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBhcnIgPSAoPEFycmF5PGFueT4+KHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSk7XG4gICAgICBhcnIucHVzaCh2YWx1ZSk7XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gYXJyO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICg8QXJyYXk8YW55Pj4od2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdKS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==