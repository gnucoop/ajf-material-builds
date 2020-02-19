/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQUdNLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQzFELE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQzVFLE1BQU0sZ0JBQWdCLENBQUM7QUFPeEIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFRNUMsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7OztJQTBPbEMsWUFDMEMsYUFBK0I7UUFuT2pFLHlCQUFvQixHQUN4QixJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQVFyQyxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBUXZELHVCQUFrQixHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFDO1FBRWxFLGVBQVUsR0FDbEIsSUFBSSxlQUFlLENBQVcsRUFB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O0lBTzlELDhDQUMrQjs7Ozs7Ozs7SUFPL0IsMENBQzhDOzs7Ozs7OztJQU85QyxnREFBNkM7Ozs7O0lBQzdDLHNEQUE2Rjs7Ozs7Ozs7SUFPN0YsK0NBQTRDOzs7OztJQUM1QyxxREFDMkM7Ozs7Ozs7O0lBTzNDLDJDQU1FOzs7Ozs7OztJQU9GLG1EQUF3RTs7Ozs7SUFFeEUscURBQXdFOzs7Ozs7O0lBV3hFLDREQUF5RTs7Ozs7SUFFekUsNENBRUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZGb3JtLCBBamZOb2RlLCBBamZOb2RlVHlwZSwgZmxhdHRlbk5vZGVzfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uLCBBamZDaGFydFdpZGdldCwgQWpmQ29sdW1uV2lkZ2V0LCBBamZDdXN0b21XaWRnZXQsIEFqZkRhdGFXaWRnZXQsIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsIEFqZlJlcG9ydCwgQWpmUmVwb3J0Q29udGFpbmVyLCBBamZTdHlsZXMsIEFqZlRhYmxlV2lkZ2V0LCBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsIEFqZldpZGdldFR5cGUsIGNyZWF0ZUFnZ3JlZ2F0aW9uLCBjcmVhdGVXaWRnZXRcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNvbWJpbmVMYXRlc3QsIGZpbHRlciwgbWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgc2Nhbiwgc2hhcmUsIHN0YXJ0V2l0aFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlcywgQWpmUmVwb3J0SWNvbnMsIEFqZlJlcG9ydHNDb25maWcsIEFqZldpZGdldHNDb250YWluZXJ9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkNvbG9yT3BlcmF0aW9uLCBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uLCBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uLCBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbixcbiAgQWpmU3R5bGVzT3BlcmF0aW9uLCBBamZXaWRnZXRPcGVyYXRpb24sIEFqZldpZGdldHNPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcbmltcG9ydCB7QUpGX1JFUE9SVFNfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIGFsbCB0aGUgbG9naWMgdG8gbW9kZWwgdGhlIHJlcG9ydCB3aWRnZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1c3RvbVdpZGdldHMgb2JqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT47XG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudCB3aWRnZXQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb3JpZ2luOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX29yaWdpblVwZGF0ZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZXhwb3J0ZWQganNvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0OiBPYnNlcnZhYmxlPEFqZlJlcG9ydD47XG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0VXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydD4gPSBuZXcgU3ViamVjdDxBamZSZXBvcnQ+KCk7XG5cbiAgcHJpdmF0ZSBfanNvblN0YWNrOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID1cbiAgbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIHByaXZhdGUgX2xhc3REZWxldGVkSnNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2VtcHR5Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID1cbiAgbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbkRyYWdnZWRVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgcHJpdmF0ZSBfb25PdmVyOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbk92ZXJVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdGF0dXMgb2YgcGVybWFuZW50IHpvb21cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9maXhlZFpvb206IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXI6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXJVcGRhdGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgaGVhZGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgaGVhZGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgY29udGVudCB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY29udGVudCBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuXG4gIHByaXZhdGUgX2NvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcHJpdmF0ZSBfY29sb3JVcGRhdGU6IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRDb2xvcjogc3RyaW5nW10gPVxuICBbXG4gICAgJ3JnYmEoMCwgMCwgMCwgMSknLCAncmdiYSg1MSwgMTUzLCAyNTUsIDEpJywgJ3JnYmEoMTUzLCAyMDQsIDAsIDEpJywgJ3JnYmEoMjU1LCAxMDIsIDAsIDEpJyxcbiAgICAncmdiYSgwLCAyMDQsIDIwNCwgMSknLCAncmdiYSgyMDQsIDIwNCwgMTUzLCAxKScsICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsICdyZ2JhKDIzMCwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAwLCAxKScsICdyZ2JhKDAsIDEzOCwgMCwgMSknLCAncmdiYSgwLCAxMDIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDE1MywgNTEsIDI1NSwgMSknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsICdyZ2JhKDI1MCwgMjA0LCAyMDQsIDEpJyxcbiAgICAncmdiYSgyNTUsIDIzNSwgMjA0LCAxKScsICdyZ2JhKDI1NSwgMjU1LCAyMDQsIDEpJywgJ3JnYmEoMjA0LCAyMzIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDIwNCwgMjI0LCAyNDUsIDEpJywgJ3JnYmEoMjM1LCAyMTQsIDI1NSwgMSknLCAncmdiYSgxODcsIDE4NywgMTg3LCAxKScsXG4gICAgJ3JnYmEoMjQwLCAxMDIsIDEwMiwgMSknLCAncmdiYSgyNTUsIDE5NCwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAxMDIsIDEpJyxcbiAgICAncmdiYSgxMDIsIDE4NSwgMTAyLCAxKScsICdyZ2JhKDEwMiwgMTYzLCAyMjQsIDEpJywgJ3JnYmEoMTk0LCAxMzMsIDI1NSwgMSknLFxuICAgICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEpJywgJ3JnYmEoMTYxLCAwLCAwLCAxKScsICdyZ2JhKDE3OCwgMTA3LCAwLCAxKScsXG4gICAgJ3JnYmEoMTc4LCAxNzgsIDAsIDEpJywgJ3JnYmEoMCwgOTcsIDAsIDEpJywgJ3JnYmEoMCwgNzEsIDE3OCwgMSknLFxuICAgICdyZ2JhKDEwNywgMzYsIDE3OCwgMSknLCAncmdiYSg2OCwgNjgsIDY4LCAxKScsICdyZ2JhKDkyLCAwLCAwLCAxKScsICdyZ2JhKDEwMiwgNjEsIDAsIDEpJyxcbiAgICAncmdiYSgxMDIsIDEwMiwgMCwgMSknLCAncmdiYSgwLCA1NSwgMCwgMSknLCAncmdiYSgwLCA0MSwgMTAyLCAxKScsICdyZ2JhKDYxLCAyMCwgMTAyLCAxKSdcbiAgXTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXJyZW50IHdpZGdldCB3aGljaCBob2xkcyB0aGUgZm9jdXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD47XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCB1cGRhdGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9XG4gIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgY29udGFpbnMgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnQgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnQgfCBudWxsPihudWxsKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdHlsZXMgb2YgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXNVcGRhdGU6IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgZm9ybXMgZmV0Y2hlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT47XG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zVXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogZGljdGlvbmFyeSBmb3IgIHdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVzOiBhbnkgPSB7XG4gICAgaGVhZGVyOiB0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbnRlbnQ6IHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLFxuICAgIGZvb3RlcjogdGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb2xvcjogdGhpcy5fY29sb3JVcGRhdGUsXG4gICAgY3VzdG9tV2lkZ2V0czogdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gd29udCB0byBzYXZlIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnRFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3NhdmVGb3JtdWxhVE9IdG1sOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldEZvcm11bGFUb0h0bWxFdmVudCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gY29sdW1uIHdpZHRoIGNoYW5nZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaWNvblNldHM6IEFqZlJlcG9ydEljb25zID0ge1xuICAgICdhamYtaWNvbic6IFtdXG4gIH07XG4gIGdldCBpY29uU2V0cygpOiBBamZSZXBvcnRJY29ucyB7IHJldHVybiB0aGlzLl9pY29uU2V0czsgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1JFUE9SVFNfQ09ORklHKSByZXBvcnRzQ29uZmlnOiBBamZSZXBvcnRzQ29uZmlnXG4gICkge1xuXG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG5cbiAgICBpZiAocmVwb3J0c0NvbmZpZyAhPSBudWxsKSB7XG4gICAgICBpZiAocmVwb3J0c0NvbmZpZy5pY29ucyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXRzID0gey4uLnRoaXMuX2ljb25TZXRzLCAuLi5yZXBvcnRzQ29uZmlnLmljb25zfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9vcmlnaW4gPSAoPE9ic2VydmFibGU8c3RyaW5nPj50aGlzLl9vcmlnaW5VcGRhdGUpLnBpcGUoXG4gICAgICBzdGFydFdpdGgoJ2hlYWRlcicpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9zYXZlZFJlcG9ydCA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnQ+PnRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlKS5waXBlKFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWQgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25EcmFnZ2VkVXBkYXRlKS5waXBlKFxuICAgICAgc3RhcnRXaXRoKGZhbHNlKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5fb25PdmVyID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uT3ZlclVwZGF0ZSkucGlwZShcbiAgICAgIHN0YXJ0V2l0aChmYWxzZSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuX2ZpeGVkWm9vbSA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9maXhlZFpvb21VcGRhdGUpLnBpcGUoXG4gICAgICBzdGFydFdpdGgoZmFsc2UpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9vbkRyYWdFbnRlciA9IHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9yZXBvcnRTdHlsZXMgPSAoPE9ic2VydmFibGU8QWpmU3R5bGVzT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKHN0eWxlczogQWpmU3R5bGVzLCBvcDogQWpmU3R5bGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDxBamZTdHlsZXM+e30pLCBzaGFyZSgpLCBzdGFydFdpdGgoPEFqZlN0eWxlcz57fSkpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGZvcm1zOiBBamZGb3JtW10sIG9wOiBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGZvcm1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0cyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10sIG9wOiBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9mb3Jtc1ZhcmlhYmxlcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2hlYWRlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVzID0gdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29udGVudFdpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29udGVudFN0eWxlcyA9IHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2Zvb3RlclN0eWxlcyA9IHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbG9yID0gKDxPYnNlcnZhYmxlPEFqZkNvbG9yT3BlcmF0aW9uPj50aGlzLl9jb2xvclVwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChjb2xvcjogc3RyaW5nW10sIG9wOiBBamZDb2xvck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9kZWZhdWx0Q29sb3IpLCBzaGFyZSgpLCBzdGFydFdpdGgodGhpcy5fZGVmYXVsdENvbG9yKSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5waXBlKFxuICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgIG1hcChzID0+IHMhKSxcbiAgICAgIHNjYW4oKHdpZGdldDogQWpmV2lkZ2V0fG51bGwsIG9wOiBBamZXaWRnZXRPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHdpZGdldCk7XG4gICAgICB9LCBudWxsIGFzIHVua25vd24gYXMgQWpmV2lkZ2V0KSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtcy5waXBlKFxuICAgICAgZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksXG4gICAgICBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSh0aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtcy5waXBlKFxuICAgICAgZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksXG4gICAgICBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSh0aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSk7XG5cbiAgICBjb25zdCByZXBvcnRPYnMgPSB0aGlzLl9yZXBvcnQ7XG5cbiAgICByZXBvcnRPYnMucGlwZShcbiAgICAgIG1hcCgocjogQWpmUmVwb3J0IHwgbnVsbCkgPT4ge1xuICAgICAgICByZXR1cm4gKF9jb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgICAgIGxldCB0ZW1wQ29sb3JzOiBzdHJpbmdbXSA9IHRoaXMuX2RlZmF1bHRDb2xvcjtcbiAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICBpZiAoci5jb250ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmNvbnRlbnQuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyLmZvb3Rlcikge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5mb290ZXIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyLmhlYWRlcikge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5oZWFkZXIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmhlYWRlci5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHIuaGVhZGVyLmNvbnRlbnRbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKG9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXRPYmogPSBvYmogYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXlvdXRPYmouY29udGVudC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uT2JqID0gbGF5b3V0T2JqLmNvbnRlbnRbal0gYXMgQWpmQ29sdW1uV2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3IoY29sdW1uT2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgY29sdW1uT2JqLmNvbnRlbnQubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0T2JqID0gY29sdW1uT2JqLmNvbnRlbnRbel07XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHdpZGdldE9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8c3RyaW5nW10+dGVtcENvbG9ycztcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUodGhpcy5fY29sb3JVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9zdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+e307XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz5yLnN0eWxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuaGVhZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuaGVhZGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmhlYWRlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5jb250ZW50LmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmNvbnRlbnQuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuZm9vdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuZm9vdGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmZvb3Rlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnQucGlwZShcbiAgICAgIG1hcCgoanNvbjogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAoX3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgaWYgKGpzb24gPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnJlcG9ydCwgdGhpcy5yZXBvcnRGb3JtcyksXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRTdHlsZXMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAuc3Vic2NyaWJlKChyOiBbXG4gICAgICAgICAgICAgICAgICAgICBbdm9pZCwgQWpmUmVwb3J0IHwgbnVsbCwgQWpmRm9ybVtdXSwgQWpmV2lkZ2V0c0NvbnRhaW5lciwgQWpmV2lkZ2V0c0NvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgIEFqZldpZGdldHNDb250YWluZXIsIEFqZlN0eWxlc1xuICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAvLyBjb25zdCBjdXJSbyA9IHJbMF1bMV07XG4gICAgICAgICAgLy8gY29uc3QgZm9ybXMgPSByWzBdWzJdICE9IG51bGwgPyByWzBdWzJdIHx8IFtdXG4gICAgICAgICAgLy8gICAgIDogKGN1clJvICE9IG51bGwgPyBjdXJSby5mb3JtcyB8fCBbXSA6IFtdKTtcblxuICAgICAgICAgIG9iai5oZWFkZXIgPSB7Y29udGVudDogclsxXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzFdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5jb250ZW50ID0ge2NvbnRlbnQ6IHJbMl0ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclsyXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouZm9vdGVyID0ge2NvbnRlbnQ6IHJbM10ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclszXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouc3R5bGVzID0gcls0XTtcblxuICAgICAgICAgIGNvbnN0IHJvID0ge1xuICAgICAgICAgICAgaGVhZGVyOiB7Y29udGVudDogclsxXS53aWRnZXRzLCBzdHlsZXM6IHJbMV0uc3R5bGVzfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtjb250ZW50OiByWzJdLndpZGdldHMsIHN0eWxlczogclsyXS5zdHlsZXN9LFxuICAgICAgICAgICAgZm9vdGVyOiB7Y29udGVudDogclszXS53aWRnZXRzLCBzdHlsZXM6IHJbM10uc3R5bGVzfSxcbiAgICAgICAgICAgIHN0eWxlczogcls0XVxuICAgICAgICAgIH0gYXMgQWpmUmVwb3J0O1xuXG4gICAgICAgICAgdGhpcy5zZXRTYXZlUmVwb3J0KG9iaik7XG4gICAgICAgICAgdGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUubmV4dChybyk7XG4gICAgICAgICAgdGhpcy5wdXNoSnNvblN0YWNrKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogcmVtb3ZlIEFqZk5vZGVHcm91cCwgQWpmU2xpZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTdHJpbmdGaWVsZCBmcm9tIGFqZm5vZGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZmlsdGVyTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlIHx8XG4gICAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkICYmXG4gICAgICAgICAgIChub2RlIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TdHJpbmcpKSB7XG4gICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwYXJzZUNvbG9yKGNzc1N0eWxlczogYW55LCBjb2xvcnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVLZXlzID0gWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JhY2tncm91bmRDb2xvcicsICdjb2xvciddO1xuICAgIHN0eWxlS2V5cy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNzc1N0eWxlc1trXSAmJlxuICAgICAgICBjb2xvcnMuaW5kZXhPZihjc3NTdHlsZXNba10pID09IC0xXG4gICAgICApIHtcbiAgICAgICAgY29sb3JzLnB1c2goY3NzU3R5bGVzW2tdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgbGV0IHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyaWFibGVzW2ldID0geyBub2RlczogW10sIGxhYmVsczogW10sIG5hbWVzOiBbXSwgdHlwZXM6IFtdIH07XG5cbiAgICAgIGlmIChmb3Jtc1tpXS5ub2RlcyAhPSBudWxsICYmIGZvcm1zW2ldLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyaWFibGVzW2ldLm5vZGVzID0gdGhpcy5maWx0ZXJOb2RlcyhmbGF0dGVuTm9kZXMoZm9ybXNbaV0ubm9kZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1tpXS5sYWJlbHMgPSB0aGlzLmV4dHJhY3RMYWJlbHNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLm5hbWVzID0gdGhpcy5leHRyYWN0TmFtZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLnR5cGVzID0gdGhpcy5leHRyYWN0VHlwZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuXG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXM7XG4gIH1cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiAgdGhlIG9iaiByZXR1cm5lZCBjb250YWlucyB0aGUgbGFiZWwgZmllbGQgb2YgYWpmTm9kZVxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBleHRyYWN0TGFiZWxzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5sYWJlbCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBleHRyYWN0TmFtZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGV4dHJhY3RUeXBlc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IEFqZkZpZWxkVHlwZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHA6IEFqZkZpZWxkID0gPEFqZkZpZWxkPm5vZGVzW2ldO1xuICAgICAgb2JqLnB1c2gocC5maWVsZFR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc2V0T3JpZ2luKG9yaWdpbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb3JpZ2luVXBkYXRlLm5leHQob3JpZ2luKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyBtZXRob2Qgcm91bmQgdGhlIHZhbHVlIHRvIHRoZSBkZWNpbWFsIHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcGFyYW0gZGVjaW1hbHBvc2l0aW9uc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJvdW5kVG8odmFsdWU6IG51bWJlciwgZGVjaW1hbFBvc2l0aW9uczogbnVtYmVyKSB7XG4gICAgbGV0IGkgPSB2YWx1ZSAqIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcblxuICAgIGkgPSBNYXRoLmZsb29yKGkpO1xuXG4gICAgcmV0dXJuIGkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgdmFsaWRhdG9yIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaXNOdW1iZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXlxcZCsoXFwuXFxkKyk/Ly50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIGlzTnVtYmVyQXJyYXkodmFsdWU6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLmlzTnVtYmVyKHZhbHVlW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnZ2VkIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uRHJhZ2dlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdnZWQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbk92ZXIgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25PdmVyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uT3ZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2ZpeGVkWm9vbSBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmaXhlZFpvb20oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkWm9vbTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgY2hhbmdlIHN0YXR1cyBvZiBfZml4ZWRab29tIGluIHRydWVcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21JbigpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgY2hhbmdlIHN0YXR1cyBvZiBfZml4ZWRab29tIGluIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tT3V0KCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ0VudGVyIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uRHJhZ0VudGVyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ0VudGVyO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ0VudGVyIHdpdGggIHNlY3Rpb24oaGVhZGVyLGNvbnRlbnQsZm9vdGVyKSBhbmQgaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnRW50ZXIoYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLm5leHQoeyBhcnJheSwgaW5kZXggfSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25kcmFnZ2VkIHdpdGggdHJ1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cblxuICBkcmFnRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25PdmVyIHdpdGggdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIF9vbk92ZXIgd2l0aCBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgc2F2ZSByZXBvcnQgZXZlbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzYXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLl9zYXZlUmVwb3J0RXZlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKGZvcm11bGE6IEFqZkZvcm11bGEpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICB3LmZsYWcgPSBmb3JtdWxhO1xuICAgICAgdy5pY29uID0gZm9ybXVsYTtcbiAgICAgIHJldHVybiB3O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFUb0h0bWwoaHRtbEZvcm11bGE6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAnZm9ybXVsYSc6IGh0bWxGb3JtdWxhLFxuICAgICAgICAncmVmZXJlbmNlJzogcmVmZXJlbmNlXG4gICAgICB9O1xuICAgICAgdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuZW1pdChvYmopO1xuICAgIH1cbiAgfVxuXG4gIHNldEVtcHR5Q29udGVudCh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9lbXB0eUNvbnRlbnQubmV4dCh2YWwpO1xuICB9XG5cblxuICBwdXNoSnNvblN0YWNrKGpzb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2suaW5kZXhPZihqc29uKSA9PT0gLTEgJiYganNvbiAhPT0gdGhpcy5fbGFzdERlbGV0ZWRKc29uKSB7XG4gICAgICBjdXJyZW50U3RhY2sucHVzaChqc29uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuICB9XG5cbiAgcG9wSnNvblN0YWNrKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IGVtcHR5SnNvbiA9XG4gICAgICAne1wiaGVhZGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LCcgK1xuICAgICAgJ1wiY29udGVudFwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcIicgK1xuICAgICAgJ2Zvb3RlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcInN0eWxlc1wiOnt9fSc7XG4gICAgbGV0IGN1cnJlbnRTdGFjayA9IHRoaXMuX2pzb25TdGFjay5nZXRWYWx1ZSgpO1xuICAgIGN1cnJlbnRTdGFjay5wb3AoKTtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSBjdXJyZW50U3RhY2sucG9wKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcbiAgICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KFtdKTtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KHRydWUpO1xuICAgICAgcmV0dXJuIGVtcHR5SnNvbjtcbiAgICB9XG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcblxuICAgIHJldHVybiB0aGlzLl9sYXN0RGVsZXRlZEpzb247XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGVtaXR0ZXJcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbHVtbldpZHRoQ2hhbmdlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfY3VzdG9tV2lkZ2V0cyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXN0b21XaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQ29udGVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50V2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbnRlbnQgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbG9ycyBvZiByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbG9ycygpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG5cbiAgZ2V0IGVtcHR5Q29udGVudCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZW1wdHlDb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVBcnJheVdpZGdldHModHlwZTogc3RyaW5nLCBuZXdXaWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpIHtcbiAgICBpZiAoKHR5cGUgIT09ICdoZWFkZXInKSAmJiAodHlwZSAhPT0gJ2NvbnRlbnQnKSAmJiAodHlwZSAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSAnICsgdHlwZSk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZXNbdHlwZV0ubmV4dCgoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9mb3Jtc1ZhcmlhYmxlcyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3Jtc1ZhcmlhYmxlcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mb3Jtc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGdldCBjb25kaXRpb25OYW1lcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25kaXRpb25OYW1lcztcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VycmVudFdpZGdldCgpOiBPYnNlcnZhYmxlPEFqZldpZGdldHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRXaWRnZXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgVXBkYXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlIHdpdGggbmV3V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQ3VycmVudFdpZGdldChuZXdXaWRnZXQ6IEFqZldpZGdldHxudWxsKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KChfd2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBnZXRTYXZlUmVwb3J0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVSZXBvcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9qc29uU2F2ZWRSZXBvcnQgb2Jlc2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFNhdmVkKCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVkUmVwb3J0O1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRTdHlsZXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydEZvcm1zIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydEZvcm1zKCk6IE9ic2VydmFibGU8QWpmRm9ybVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydEZvcm1zO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgX29yaWdpbiBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvcmlnaW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFzc2lnbnMgdGhlIG5ldyB3aWR0aCB0byB0aGUgaWR4IGNvbHVtblxuICAgKiBhbmQgcmVjYWxjdWxhdGVzIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgb2YgdGhlIGxheW91dC5cbiAgICogVGhlIHJhbmdlIHZhbHVlIGFyZSBmcm9tIDAsMSB0byAxLlxuICAgKlxuICAgKiBSVUxFUzpcbiAgICogVGhlIG1pbiB2YWx1ZSBmb3IgY29sdW1uIGlzIDAsMS5cbiAgICogVGhlIHN1bSBvZiBhbGwgY29sdW1ucyB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICogVGhlIG1ldGhvZCByb3VuZCB0aGUgdmFsdWVzLlxuICAgKiBJZiBpcyBwcmVzZW50IG9ubHkgb25lIGNvbHVtbiB0aGUgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPmAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGRlY3JlYXNlcy5cbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA8YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgaW5jcmVhc2VzLlxuICAgKlxuICAgKiBXaGVuIHZhbHVlcyDigIvigIthcmUgcGVyaW9kaWMsIHJvdW5kaW5nIGFzc2lnbnMgdGhlIGdhcCB0byB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogRm9yIGV4YW1wbGU6IDMgY29sdW1ucyB3aXRoIDAsMzMgYmVsaWV2ZSAxIGNvbHVtbiAwLDM0IGFuZCAyIGNvbHVtbnMgMCwzMy5cbiAgICpcbiAgICogQHBhcmFtIG5ld1ZhbHVlXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpbnN0YW50Q29sdW1uVmFsdWUobmV3VmFsdWU6IG51bWJlciwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBsZXQgc2l6ZSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuXG4gICAgICBsZXQgc3ByZWFkVmFsdWUgPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGxldCBpZHhGaXJzdE5vT2JqID0gLTE7XG5cbiAgICAgIGxldCBhZGQgPSBmYWxzZTtcbiAgICAgIGxldCBmb3VuZEZpcnN0Tm9PYmogPSBmYWxzZTtcblxuICAgICAgbGV0IHJlMSA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XVswLTldJCknKTtcbiAgICAgIGxldCByZTIgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV0kKScpO1xuICAgICAgbGV0IHJlMyA9IG5ldyBSZWdFeHAoJ15bMV0kJyk7XG5cbiAgICAgIGxldCBvbGRWYWx1ZSA9IG15T2JqLmNvbHVtbnNbaWR4XTtcblxuICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKG5ld1ZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob2xkVmFsdWUgPT0gLTEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICAgIG9iak51bS0tO1xuICAgICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChzaXplIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDAuMTtcbiAgICAgIH0gZWxzZSBpZiAob2xkVmFsdWUgPCAwLjEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICB9XG5cblxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSAtMSkge1xuXG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbMF0gPSAxO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8IDAuMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMC4xO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlICsgMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSA+IDEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDEgLSAoMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkgJiYgKG9sZFZhbHVlID09PSAwLjEpKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlID4gbmV3VmFsdWUpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlIC0gbmV3VmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGQgPSBmYWxzZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChuZXdWYWx1ZSAtIG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzcHJlYWRWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3ByZWFkVmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgIGlmIChzcHJlYWRWYWx1ZSA8IDAuMDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcblxuICAgICAgICAgIGlmICgoaSA9PSBpZHgpKSB7XG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmICgobXlPYmouY29sdW1uc1tpXSA+IDAuOSkgJiYgKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gb2JqTnVtICE9IDEpKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuOTA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPCAwLjEpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC4xMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2ldLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICAgIHN1bSArPSBteU9iai5jb2x1bW5zW2ldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmogPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlkeEZpcnN0Tm9PYmogPSBpO1xuICAgICAgICAgICAgZm91bmRGaXJzdE5vT2JqID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSAtMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaikge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4Rmlyc3ROb09ial0gKz0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG15T2JqLmNvbHVtbnNbal0gIT09IC0xICYmXG4gICAgICAgICAgIXJlMS50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiZcbiAgICAgICAgICAhcmUyLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJlxuICAgICAgICAgICFyZTMudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKDAuMTAsIGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXIuZW1pdCgpO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGltYWdlVXJsIG9uIHRoZSBjdXJyZW50IEFqZkltYWdlV2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRJbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai51cmwgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ltYWdlVXJsfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7IGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5pY29uID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpY29ufVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5mbGFnID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHt2YWx1ZX1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oY29uZGl0aW9uVGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHdpZGdldC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgICAgd2lkZ2V0LnZpc2liaWxpdHkuY29uZGl0aW9uID0gY29uZGl0aW9uVGV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ2hhcnRGb3JtdWxhKFxuICAgIF9sYWJlbDogc3RyaW5nLFxuICAgIF9sZXZlbDogbnVtYmVyLFxuICAgIF9tYWluSW5kZXg6IG51bWJlcixcbiAgICBfaW5kZXg6IG51bWJlcixcbiAgICBmb3JtdWxhVGV4dDogc3RyaW5nLFxuICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmIHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJvdyB0aGF0IGNvbnRhaW5zIG1haW4gZGF0YSBpcyBkZWZpbmVkXG4gICAgICAgIC8qIGlmICh3aWRnZXQuZGF0YXNldFswXSA9PSBudWxsKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZXZlbCA9PSAwICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PSAxICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleCArIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICB9ICovXG5cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlVGFibGVGb3JtdWxhKFxuICAgIF9sYWJlbDogc3RyaW5nLFxuICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyLFxuICAgIGZvcm11bGFUZXh0OiBzdHJpbmcsXG4gICAgX21haW5JbmRleDogbnVtYmVyLFxuICAgIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXQgPSBuZXcgQWpmRGF0YXNldCgpO1xuICAgICAgICAvLyBsZXQgcm93RGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8qIGlmIChtYWluSW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnZGF0YXNldCcsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZEYXRhV2lkZ2V0PndpZGdldDtcblxuICAgICAgLyogaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgdHlwZSBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ3R5cGUnLCB0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgIGlkeCBlbGVtZW50IG9mIHhMYWJlbHMgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZU1haW5EYXRhKF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvLyBteU9iai5kYXRhc2V0WzBdLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVSZWxhdGVkRGF0YShfbWFpbklkeDogbnVtYmVyLCBfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLyogaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSWR4ICsgMSwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JZHggKyAxXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIGJhY2tncm91bmRDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIGFkZENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYm9yZGVyQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJXaWR0aCcsIHZhbHVlKTtcbiAgfVxuXG4gIGFkZENoYXJ0Qm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0KHJlcG9ydDogQWpmUmVwb3J0KTogdm9pZCB7XG4gICAgdGhpcy5fcmVwb3J0Lm5leHQocmVwb3J0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTYXZlUmVwb3J0KGpzb246IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVSZXBvcnQubmV4dChqc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGZvbnQgYXR0cmlidXRlIG9uIHRoZSBjdXJyZW50IEFqZldpZGdldC5cbiAgICpcbiAgICogVGhlcmUgaXMgYSBjaGVjayBvbiBmb250LXNpemUgYXR0cmlidXRlLFxuICAgKiBpZiBpcyBubyBzcGVjaWZpY2F0ZSB0aGUgdHlwZSBvZiBzaXplIGZvbnQgc2V0ICdwdCcgYXMgZGVmYXVsdC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmVGV4dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGNvbnN0IHB4U3R5bGVzID0gW1xuICAgICAgICAnZm9udC1zaXplJywgJ2hlaWdodCcsICd3aWR0aCcsICdib3JkZXItd2lkdGgnLCAnYm9yZGVyLXJhZGl1cycsICdwYWRkaW5nJywgJ21hcmdpbidcbiAgICAgIF07XG4gICAgICBjb25zdCBpc1B4U3R5bGUgPSBweFN0eWxlcy5pbmRleE9mKGxhYmVsKSA+IC0xO1xuICAgICAgaWYgKGlzUHhTdHlsZSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICdweCc7XG4gICAgICB9IGVsc2UgaWYgKGlzUHhTdHlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuaXNOdW1iZXJBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBgJHt2YWx1ZS5qb2luKCdweCAnKX1weGA7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHVwZGF0ZSB0aGUgc3R5bGVzIG9mIG9yaWdpbiB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG9yaWdpbiBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTZWN0aW9uU3R5bGVzKG9yaWdpbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKChvcmlnaW4gIT09ICdoZWFkZXInKSAmJiAob3JpZ2luICE9PSAnY29udGVudCcpICYmIChvcmlnaW4gIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmNrbm93IG9yaWdpbiAnICsgb3JpZ2luKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVzW29yaWdpbl0ubmV4dCgod2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICB3aWRnZXQuc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICB3aWRnZXQuc3R5bGVzID0gPEFqZlN0eWxlcz57Li4ud2lkZ2V0LnN0eWxlc307XG5cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgc2V0IHRoZSBzdHlsZSBvZiB0aGUgd2hvbGUgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUubmV4dCgoc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgaWYgKHN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgIHN0eWxlcyA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuICAgICAgICBzdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi5zdHlsZXN9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIGZvcm1zXG4gICAqXG4gICAqIEBwYXJhbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydEZvcm1zKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZS5uZXh0KChfZm9ybTogQWpmRm9ybVtdKTogQWpmRm9ybVtdID0+IHtcbiAgICAgIHJldHVybiBmb3JtcyB8fCBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ3VzdG9tV2lkZ2V0cyh3aWRnZXQ6IEFqZkN1c3RvbVdpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cyA9IGN1c3RvbVdpZGdldHMgfHwgW107XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldCBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZXNldEN1c3RvbVdpZGdldHMoKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMubGVuZ3RoID0gMDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBsYWJlbCBvZiB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNoYW5nZUxhYmVsQ3VzdG9tV2lkZ2V0KGxhYmVsOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0c1twb3NpdGlvbl0udHlwZSA9IGxhYmVsO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfaGVhZGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkSGVhZGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2NvbnRlbnRXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb250ZW50V2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9mb290ZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRmb290ZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICB1bmZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgc3ByZWFkVmFsdWU6IGFueTtcbiAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICBzcHJlYWRWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSB0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbHVtbiBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIFdoZW4gYWRkaW5nIGEgY29sdW1uIHRoZSB3aWR0aCBvZiB0aGUgb3RoZXIgY29sdW1ucyBpcyByZWNhbGN1bGF0ZWRcbiAgICogYnkgZGl2aWRpbmcgaXQgYnkgdGhlIG51bWJlciBvZiBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb2x1bW4oKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgdGVtcE9iajogbnVtYmVyW10gPSBbXTtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aCArIDE7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHRtcFZhbHVlOiBhbnk7XG5cbiAgICAgIGlmIChudW0gPiAxMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4Y2VlZCBtYXggY29sdW1ucycpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA9PT0gLTEpIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2goLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHRtcFZhbHVlID1cbiAgICAgICAgICBwYXJzZUZsb2F0KFxuICAgICAgICAgICAgdGhpcy5yb3VuZFRvKFxuICAgICAgICAgICAgICAoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMlxuICAgICAgICAgICAgKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgdGVtcE9ialswXSAtPSB0bXBWYWx1ZTtcbiAgICAgICAgdGVtcE9ialswXSA9IHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIHRlbXBPYmpbMF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBteU9iai5jb2x1bW5zID0gdGVtcE9iajtcblxuICAgICAgLy8gVE9ETzogQHRyaWsgd2hhdCdzIHZhbHVlPyE/XG4gICAgICBjb25zdCBjb2x1bW5PYmogPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiA3LFxuICAgICAgICAvLyB2YWx1ZTogbXlPYmouY29sdW1uc1tteU9iai5jb2x1bW5zLmxlbmd0aCAtIDFdLFxuICAgICAgfSk7XG5cbiAgICAgIG15T2JqLmNvbnRlbnQucHVzaChjb2x1bW5PYmopO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVdpZGdldFRvQ29sdW1uKGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29sdW1uLmNvbnRlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmUgYSB3aWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKiB0aGUgcG9zaXRpb24gYXJyYXk6XG4gICAqXG4gICAqIGhlYWRlciAtYD5gIGhlYWRlcldpZGdldHNcbiAgICogY29udGVudCAtYD5gIGNvbnRlbnRXaWRnZXRzXG4gICAqIGZvb3RlciAtYD5gIGZvb3RlcldpZGdldHNcbiAgICogY29sdW1uIC1gPmAgY29sdW1uIG9mIGxheW91dFxuICAgKiBsYXlvdXRDb250ZW50IC1gPmAgY29udGVudCBvZiBsYXlvdXRcbiAgICogb2JqIC1gPmAgb2JqIG9mIGxheW91dFxuICAgKiBjdXN0b21XaWRnZXQgLWA+YCBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHggdGhlIHBvc2l0aW9uIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlKG5vZGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcblxuICAgIHN3aXRjaCAobm9kZSkge1xuICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXlvdXQnOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAobXlPYmouY29udGVudFswXSBhcyBBamZDb2x1bW5XaWRnZXQpLmNvbnRlbnQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgIGNhc2UgJ2xheW91dENvbnRlbnQnOlxuICAgICAgY2FzZSAndW5maXhlZENvbHVtbic6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgICAgIGlmIChub2RlID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgbGV0IGNsbSA9IDxBamZDb2x1bW5XaWRnZXQ+d2lkZ2V0O1xuICAgICAgICAgICAgY2xtLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAnbGF5b3V0Q29udGVudCcpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gbGVuZ3RoIGlzIDAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgcmVtb3ZlIGFueSB3aWRnZXQgZnJvbSBlbXB0eSBjb250ZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9IG51bGwgJiYgbXlPYmouY29udGVudFtpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAndW5maXhlZENvbHVtbicpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBwb3NpdGlvbiB2YWx1ZSAgaXNudCAtMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmZpeGVkQ29sdW1uKGlkeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIChub2RlICE9PSAnb2JqJykge1xuICAgICAgICAgIC8vICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIC8vICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1c3RvbVdpZGdldHMnOlxuICAgICAgICB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIG5vZGUgJyArIG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgYSBBamZXaWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRUb0NvbnRlbnQobmV3V2lkZ2V0OiBBamZXaWRnZXQsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5jb250ZW50W2lkeF0gIT0gbnVsbCkge1xuICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAwLCBuZXdXaWRnZXQpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVG9Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbiAhPSBudWxsKSB7XG4gICAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICAgIGxldCB3aWRnZXQ6IEFqZldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLndpZGdldDtcbiAgICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcblxuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKHdpZGdldCk7XG5cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSkge1xuICAgICAgdGhpcy5yZW1vdmUoZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tLCBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXgpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKGV2ZW50LmRyYWdEYXRhLndpZGdldCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5qc29uKSB7XG4gICAgICBsZXQgb2JqID0gSlNPTi5wYXJzZShldmVudC5kcmFnRGF0YS5qc29uKTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogQWpmV2lkZ2V0VHlwZVtldmVudC5kcmFnRGF0YV19O1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoYW5nZVBvc2l0aW9uT25Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgdG9JbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuICAgIGxldCBmcm9tV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XTtcbiAgICBsZXQgdG9XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XTtcblxuICAgIGlmIChmcm9tQ29sdW1uID09IHRvQ29sdW1uKSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XSA9IHRvV2lkZ2V0O1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdID0gZnJvbVdpZGdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UodG9JbmRleCwgMCwgZnJvbVdpZGdldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCB0aGUgb2JqIG9uIHRoZSBpZHggcG9zaXRpb24uXG4gICAqIE9iaiBoYXZlIGEgbm8gc3BlY2lmaWNhdGUgd2lkdGggYW5kIGlzIG5vdCBjYWxjdWxhdGUgYXMgY29sdW1uc1xuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgtMSwgaWR4KTtcbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0KSB7XG4gICAgaWYgKHRvIDwgMCB8fCB0byA+PSBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGZyb20gPiBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGggLSAxICYmIHRvID4gZnJvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W2Zyb21dO1xuICAgIGxldCBmcm9tQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dO1xuICAgIGxldCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFt0b107XG4gICAgbGV0IHRvQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW3RvXTtcblxuICAgIGxheW91dFdpZGdldC5jb250ZW50W2Zyb21dID0gdG9Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV0gPSB0b0NvbHVtblZhbHVlO1xuICAgIGxheW91dFdpZGdldC5jb250ZW50W3RvXSA9IGZyb21Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dID0gZnJvbUNvbHVtblZhbHVlO1xuXG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KGxheW91dFdpZGdldCk7XG4gIH1cblxuICBhZGRDdXN0b21Db2xvcihjb2xvcjogc3RyaW5nKSB7XG5cbiAgICB0aGlzLl91cGRhdGVzWydjb2xvciddLm5leHQoKGNvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG5cbiAgICAgIGlmIChjb2xvcnMuaW5kZXhPZihjb2xvcikgPCAwKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRXaWRnZXRUb0NvbnRhaW5lcihcbiAgICAgIHN1Ymo6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4sIHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHN1YmoubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldCh3aWRnZXQpO1xuICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFyciA9ICg8QXJyYXk8YW55Pj4od2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdKTtcbiAgICAgIGFyci5wdXNoKHZhbHVlKTtcbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSBhcnI7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgKDxBcnJheTxhbnk+Pih3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0pLnNwbGljZShpZHgsIDEpO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxufVxuIl19