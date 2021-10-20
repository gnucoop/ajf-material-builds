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
import { AjfWidgetType, createAggregation, createWidget, } from '@ajf/core/reports';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { combineLatest, filter, map, publishReplay, refCount, scan, share, startWith, } from 'rxjs/operators';
import { AJF_REPORTS_CONFIG } from './tokens';
import * as i0 from "@angular/core";
/**
 * This service contains all the logic to model the report widget.
 *
 * @export
 */
export class AjfReportBuilderService {
    /**
     * Creates an instance of AjfReportBuilderService.
     *
     * @memberOf AjfReportBuilderService
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
            'rgba(0, 0, 0, 1)',
            'rgba(51, 153, 255, 1)',
            'rgba(153, 204, 0, 1)',
            'rgba(255, 102, 0, 1)',
            'rgba(0, 204, 204, 1)',
            'rgba(204, 204, 153, 1)',
            'rgba(255, 153, 0, 1)',
            'rgba(230, 0, 0, 1)',
            'rgba(255, 153, 0, 1)',
            'rgba(255, 255, 0, 1)',
            'rgba(0, 138, 0, 1)',
            'rgba(0, 102, 204, 1)',
            'rgba(153, 51, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(250, 204, 204, 1)',
            'rgba(255, 235, 204, 1)',
            'rgba(255, 255, 204, 1)',
            'rgba(204, 232, 204, 1)',
            'rgba(204, 224, 245, 1)',
            'rgba(235, 214, 255, 1)',
            'rgba(187, 187, 187, 1)',
            'rgba(240, 102, 102, 1)',
            'rgba(255, 194, 102, 1)',
            'rgba(255, 255, 102, 1)',
            'rgba(102, 185, 102, 1)',
            'rgba(102, 163, 224, 1)',
            'rgba(194, 133, 255, 1)',
            'rgba(136, 136, 136, 1)',
            'rgba(161, 0, 0, 1)',
            'rgba(178, 107, 0, 1)',
            'rgba(178, 178, 0, 1)',
            'rgba(0, 97, 0, 1)',
            'rgba(0, 71, 178, 1)',
            'rgba(107, 36, 178, 1)',
            'rgba(68, 68, 68, 1)',
            'rgba(92, 0, 0, 1)',
            'rgba(102, 61, 0, 1)',
            'rgba(102, 102, 0, 1)',
            'rgba(0, 55, 0, 1)',
            'rgba(0, 41, 102, 1)',
            'rgba(61, 20, 102, 1)',
        ];
        this._currentWidgetUpdate = new BehaviorSubject(null);
        this._formsVariablesUpdate = new BehaviorSubject(null);
        this._conditionNamesUpdate = new BehaviorSubject(null);
        /**
         * this BehaviorSubject update export report.
         *
         * @memberOf AjfReportBuilderService
         */
        this._saveReport = new BehaviorSubject(null);
        /**
         * this BehaviorSubject contains the AjfReport.
         *
         * @memberOf AjfReportBuilderService
         */
        this._report = new BehaviorSubject(null);
        this._reportStylesUpdate = new Subject();
        this._reportFormsUpdate = new Subject();
        /**
         * dictionary for  widgetsUpdate
         *
         * @memberOf AjfReportBuilderService
         */
        this._updates = {
            header: this._headerWidgetsUpdate,
            content: this._contentWidgetsUpdate,
            footer: this._footerWidgetsUpdate,
            color: this._colorUpdate,
            customWidgets: this._customWidgetsUpdate,
        };
        /**
         * event emitter that notify when wont to save report
         *
         * @memberOf AjfReportBuilderService
         */
        this._saveReportEvent = new EventEmitter();
        this._saveFormulaTOHtml = new EventEmitter();
        /**
         * event emitter that notify when column width changed
         *
         * @memberOf AjfReportBuilderService
         */
        this.columnWidthChangedEmitter = new EventEmitter();
        this._iconSets = { 'ajf-icon': [] };
        this._lastDeletedJson = '';
        if (reportsConfig != null) {
            if (reportsConfig.icons != null) {
                this._iconSets = { ...this._iconSets, ...reportsConfig.icons };
            }
        }
        this._origin = this._originUpdate.pipe(startWith('header'), share());
        this._savedReport = this._savedReportUpdate.pipe(share());
        this._onDragged = this._onDraggedUpdate.pipe(startWith(false), share());
        this._onOver = this._onOverUpdate.pipe(startWith(false), share());
        this._fixedZoom = this._fixedZoomUpdate.pipe(startWith(false), share());
        this._onDragEnter = this._onDragEnterUpdate.pipe(share());
        this._reportStyles = this._reportStylesUpdate.pipe(scan((styles, op) => {
            return op(styles);
        }, {}), share(), startWith({}));
        this._reportForms = this._reportFormsUpdate.pipe(scan((forms, op) => {
            return op(forms);
        }, []), share(), startWith([]));
        this._customWidgets = this._customWidgetsUpdate.pipe(scan((widgets, op) => {
            return op(widgets);
        }, []), share(), startWith([]));
        this._formsVariables = this._formsVariablesUpdate.pipe(filter(s => s != null), scan((variables, op) => {
            return op(variables);
        }, []), publishReplay(1), refCount());
        this._conditionNames = this._conditionNamesUpdate.pipe(filter(s => s != null), scan((variables, op) => {
            return op(variables);
        }, []), share(), startWith([]));
        this._headerWidgets = this._headerWidgetsUpdate.pipe(scan((widgets, op) => {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._headerStyles = this._headerWidgets.pipe(map((widgets) => {
            return widgets != null ? widgets.styles : {};
        }));
        this._contentWidgets = this._contentWidgetsUpdate.pipe(scan((widgets, op) => {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._contentStyles = this._contentWidgets.pipe(map((widgets) => {
            return widgets != null ? widgets.styles : {};
        }));
        this._footerWidgets = this._footerWidgetsUpdate.pipe(scan((widgets, op) => {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._footerStyles = this._footerWidgets.pipe(map((widgets) => {
            return widgets != null ? widgets.styles : {};
        }));
        this._color = this._colorUpdate.pipe(scan((color, op) => {
            return op(color);
        }, this._defaultColor), share(), startWith(this._defaultColor));
        this._currentWidget = this._currentWidgetUpdate.pipe(filter(s => s != null), map(s => s), scan((widget, op) => {
            return op(widget);
        }, null), publishReplay(1), refCount());
        this._reportForms
            .pipe(filter(f => f.length != 0), map((forms) => {
            return (_c) => {
                return this.fillFormsVariables(forms);
            };
        }))
            .subscribe(this._formsVariablesUpdate);
        this._reportForms
            .pipe(filter(f => f.length != 0), map((forms) => {
            return (_c) => {
                return this.fillFormsVariables(forms);
            };
        }))
            .subscribe(this._conditionNamesUpdate);
        const reportObs = this._report;
        reportObs
            .pipe(map((r) => {
            return (_colors) => {
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
                            let obj = r.header.content[i];
                            this.parseColor(obj.styles, tempColors);
                            if (obj.widgetType === AjfWidgetType.Layout) {
                                let layoutObj = obj;
                                for (let j = 0; j < layoutObj.content.length; j++) {
                                    let columnObj = layoutObj.content[j];
                                    this.parseColor(columnObj.styles, tempColors);
                                    for (let z = 0; z < columnObj.content.length; z++) {
                                        let widgetObj = columnObj.content[z];
                                        this.parseColor(widgetObj.styles, tempColors);
                                    }
                                }
                            }
                        }
                    }
                }
                return tempColors;
            };
        }))
            .subscribe(this._colorUpdate);
        reportObs
            .pipe(map((r) => {
            return (_styles) => {
                if (r == null || r.styles == null) {
                    return {};
                }
                else {
                    return r.styles;
                }
            };
        }))
            .subscribe(this._reportStylesUpdate);
        reportObs
            .pipe(map((r) => {
            return (_widgets) => {
                if (r == null || r.header == null) {
                    return { widgets: [], styles: {} };
                }
                else {
                    return {
                        widgets: r.header.content || [],
                        styles: r.header.styles || {},
                    };
                }
            };
        }))
            .subscribe(this._headerWidgetsUpdate);
        reportObs
            .pipe(map((r) => {
            return (_widgets) => {
                if (r == null || r.content == null) {
                    return { widgets: [], styles: {} };
                }
                else {
                    return {
                        widgets: r.content.content || [],
                        styles: r.content.styles || {},
                    };
                }
            };
        }))
            .subscribe(this._contentWidgetsUpdate);
        reportObs
            .pipe(map((r) => {
            return (_widgets) => {
                if (r == null || r.footer == null) {
                    return { widgets: [], styles: {} };
                }
                else {
                    return {
                        widgets: r.footer.content || [],
                        styles: r.footer.styles || {},
                    };
                }
            };
        }))
            .subscribe(this._footerWidgetsUpdate);
        this._saveReport.pipe(map((json) => {
            return (_r) => {
                if ((json = null)) {
                    return {};
                }
                return json;
            };
        }));
        this._saveReportEvent
            .pipe(combineLatest(this.report, this.reportForms), combineLatest(this._headerWidgets.pipe(filter(w => w != null)), this._contentWidgets.pipe(filter(w => w != null)), this._footerWidgets.pipe(filter(w => w != null)), this._reportStyles.pipe(filter(w => w != null))))
            .subscribe(r => {
            let obj = {};
            // const curRo = r[0][1];
            // const forms = r[0][2] != null ? r[0][2] || []
            //     : (curRo != null ? curRo.forms || [] : []);
            const [hco, cco, fco] = [r[1], r[2], r[3]];
            obj.header = {
                content: hco.widgets.map(w => deepCopy(w)),
                styles: hco.styles,
            };
            obj.content = {
                content: cco.widgets.map(w => deepCopy(w)),
                styles: cco.styles,
            };
            obj.footer = {
                content: fco.widgets.map(w => deepCopy(w)),
                styles: fco.styles,
            };
            obj.styles = r[4];
            const ro = {
                header: { content: hco.widgets, styles: hco.styles },
                content: { content: cco.widgets, styles: cco.styles },
                footer: { content: fco.widgets, styles: fco.styles },
                styles: r[4],
            };
            this.setSaveReport(obj);
            this._savedReportUpdate.next(ro);
            this.pushJsonStack(JSON.stringify(obj));
        });
    }
    getFormulaToHtmlEvent() {
        return this._saveFormulaTOHtml;
    }
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
     * @param nodes
     *
     * @memberOf AjfReportBuilderService
     */
    filterNodes(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.nodeType === AjfNodeType.AjfNodeGroup ||
                node.nodeType === AjfNodeType.AjfSlide ||
                node.nodeType === AjfNodeType.AjfRepeatingSlide ||
                (node.nodeType === AjfNodeType.AjfField &&
                    node.fieldType === AjfFieldType.String)) {
                nodes.splice(i, 1);
                i--;
            }
        }
        return nodes;
    }
    parseColor(cssStyles, colors) {
        const styleKeys = ['background-color', 'backgroundColor', 'color'];
        styleKeys.forEach(k => {
            if (cssStyles[k] && colors.indexOf(cssStyles[k]) == -1) {
                colors.push(cssStyles[k]);
            }
        });
    }
    fillFormsVariables(forms) {
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
     * @param nodes
     *
     * @memberOf AjfReportBuilderService
     */
    extractLabelsNodes(nodes) {
        let obj = [];
        for (let i = 0; i < nodes.length; i++) {
            obj.push(nodes[i].label);
        }
        return obj;
    }
    extractNamesNodes(nodes) {
        let obj = [];
        for (let i = 0; i < nodes.length; i++) {
            obj.push(nodes[i].name);
        }
        return obj;
    }
    extractTypesNodes(nodes) {
        let obj = [];
        for (let i = 0; i < nodes.length; i++) {
            let p = nodes[i];
            obj.push(p.fieldType);
        }
        return obj;
    }
    setOrigin(origin) {
        this._originUpdate.next(origin);
    }
    /**
     * utils:
     * This method round the value to the decimal position
     *
     * @param value
     * @param decimalpositions
     *
     * @memberOf AjfReportBuilderService
     */
    roundTo(value, decimalPositions) {
        let i = value * Math.pow(10, decimalPositions);
        i = Math.floor(i);
        return i / Math.pow(10, decimalPositions);
    }
    /**
     * utils:
     * This validator check if the value is a number.
     *
     * @param value
     *
     * @memberOf AjfReportBuilderService
     */
    isNumber(value) {
        return /^\d+(\.\d+)?/.test(value);
    }
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
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get onDragged() {
        return this._onDragged;
    }
    /**
     * get _onOver Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get onOver() {
        return this._onOver;
    }
    /**
     * get _fixedZoom Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get fixedZoom() {
        return this._fixedZoom;
    }
    /**
     *  change status of _fixedZoom in true
     *
     *
     * @memberOf AjfReportBuilderService
     */
    fixedZoomIn() {
        this._fixedZoomUpdate.next(true);
    }
    /**
     *  change status of _fixedZoom in false
     *
     *
     * @memberOf AjfReportBuilderService
     */
    fixedZoomOut() {
        this._fixedZoomUpdate.next(false);
    }
    /**
     * get _onDragEnter observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get onDragEnter() {
        return this._onDragEnter;
    }
    /**
     *  update _onDragEnter with  section(header,content,footer) and index
     *
     * @memberOf AjfReportBuilderService
     */
    dragEnter(array, index) {
        this._onDragEnterUpdate.next({ array, index });
    }
    /**
     *  update _ondragged with true
     *
     * @memberOf AjfReportBuilderService
     */
    dragStarted() {
        this._onDraggedUpdate.next(true);
    }
    /**
     *  update _onDragged with false
     *
     * @memberOf AjfReportBuilderService
     */
    dragEnded() {
        this._onDraggedUpdate.next(false);
    }
    /**
     *  update _onOver with true
     *
     *
     * @memberOf AjfReportBuilderService
     */
    overStarted() {
        this._onOverUpdate.next(true);
    }
    /**
     * update _onOver with false
     *
     *
     * @memberOf AjfReportBuilderService
     */
    overEnded() {
        this._onOverUpdate.next(false);
    }
    /**
     *
     *  update _onDragged with false
     *
     * @memberOf AjfReportBuilderService
     */
    dragLeave() {
        this._onDragEnterUpdate.next({});
    }
    /**
     * Get the report
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get report() {
        return this._report;
    }
    /**
     * emit save report event
     *
     *
     * @memberOf AjfReportBuilderService
     */
    saveReport() {
        if (this._saveReportEvent != null) {
            this._saveReportEvent.emit();
        }
    }
    saveImageFormula(formula) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return widget;
            }
            const w = widget;
            w.flag = formula;
            w.icon = formula;
            return w;
        });
    }
    saveFormulaToHtml(htmlFormula, reference) {
        if (this._saveFormulaTOHtml != null) {
            const obj = { 'formula': htmlFormula, 'reference': reference };
            this._saveFormulaTOHtml.emit(obj);
        }
    }
    setEmptyContent(val) {
        this._emptyContent.next(val);
    }
    pushJsonStack(json) {
        let currentStack = this._jsonStack.getValue();
        if (currentStack.indexOf(json) === -1 && json !== this._lastDeletedJson) {
            currentStack.push(json);
        }
        this._jsonStack.next(currentStack);
    }
    popJsonStack() {
        let emptyJson = '{"header":{"content":[],"styles":{}},' +
            '"content":{"content":[],"styles":{}},"' +
            'footer":{"content":[],"styles":{}},"styles":{}}';
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
     * @readonly
     *
     * @memberOf AjfReportBuilderService
     */
    get columnWidthChanged() {
        return this.columnWidthChangedEmitter;
    }
    /**
     * get _customWidgets Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get customWidgets() {
        return this._customWidgets;
    }
    /**
     * Get the header widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get headerWidgets() {
        return this._headerWidgets;
    }
    /**
     * Get the header styles
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get headerStyles() {
        return this._headerStyles;
    }
    /**
     * Get the Content widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get contentWidgets() {
        return this._contentWidgets;
    }
    /**
     * Get the content styles
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get contentStyles() {
        return this._contentStyles;
    }
    /**
     * Get the footer widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get footerWidgets() {
        return this._footerWidgets;
    }
    /**
     * Get the footer styles
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get footerStyles() {
        return this._footerStyles;
    }
    /**
     * Get the colors of report
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get colors() {
        return this._color;
    }
    get emptyContent() {
        return this._emptyContent;
    }
    /**
     *
     * @param type
     * @param newWidget
     *
     * @memberOf AjfReportBuilderService
     */
    updateArrayWidgets(type, newWidget) {
        if (type !== 'header' && type !== 'content' && type !== 'footer') {
            throw new Error('Unknown type ' + type);
        }
        this._updates[type].next((_widgets) => {
            return newWidget;
        });
    }
    /**
     * get _formsVariables Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get formsVariables() {
        return this._formsVariables;
    }
    get conditionNames() {
        return this._conditionNames;
    }
    /**
     * Get the current widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get currentWidget() {
        return this._currentWidget;
    }
    /**
     * This method Update _currentWidgetUpdate with newWidget.
     *
     * @param newWidget
     *
     * @memberOf AjfReportBuilderService
     */
    updateCurrentWidget(newWidget) {
        this._currentWidgetUpdate.next((_widget) => {
            this._saveReportEvent.emit();
            return newWidget;
        });
    }
    /**
     * Get the report
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get getSaveReport() {
        return this._saveReport;
    }
    /**
     * get _jsonSavedReport obeservable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get reportSaved() {
        return this._savedReport;
    }
    /**
     * get _reportStyles observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get reportStyles() {
        return this._reportStyles;
    }
    /**
     * get _reportForms observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get reportForms() {
        return this._reportForms;
    }
    /**
     * get the _origin Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
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
     * @param newValue
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    instantColumnValue(newValue, idx) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return widget;
            }
            let myObj = widget;
            let size = myObj.columns.length;
            let spreadValue = 0;
            let objNum = 0;
            let sum = 0;
            let idxFirstNoObj = -1;
            let add = false;
            let foundFirstNoObj = false;
            let re1 = new RegExp('(^[0].[1-9][0-9]$)');
            let re2 = new RegExp('(^[0].[1-9]$)');
            let re3 = new RegExp('^[1]$');
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
                    newValue = 1 - 0.1 * (size - objNum - 1);
                }
                if (oldValue === newValue && oldValue === 0.1) {
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
                    spreadValue = oldValue / (size - objNum);
                }
            }
            for (let i = 0; i < size; i++) {
                if (myObj.columns[i] !== -1) {
                    if (i == idx) {
                        myObj.columns[idx] = newValue;
                    }
                    else {
                        if (add) {
                            myObj.columns[i] += spreadValue;
                            if (myObj.columns[i] > 0.9 && myObj.columns.length - objNum != 1) {
                                myObj.columns[i] = 0.9;
                            }
                        }
                        else {
                            myObj.columns[i] -= spreadValue;
                            if (myObj.columns[i] < 0.1) {
                                myObj.columns[i] = 0.1;
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
                    this.instantColumnValue(0.1, j);
                }
            }
            this.columnWidthChangedEmitter.emit();
            this._saveReportEvent.emit();
            return myObj;
        });
    }
    /**
     * This method set the imageUrl on the current AjfImageWidget.
     *
     * @param imageUrl
     *
     * @memberOf AjfReportBuilderService
     */
    setImageUrl(imageUrl) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            const myObj = widget;
            myObj.url = createFormula({ formula: `"${imageUrl}"` });
            return myObj;
        });
    }
    setIcon(icon) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            const myObj = widget;
            myObj.icon = createFormula({ formula: `"${icon}"` });
            return myObj;
        });
    }
    setFlag(value) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            const myObj = widget;
            myObj.flag = createFormula({ formula: `"${value}"` });
            return myObj;
        });
    }
    saveCondition(conditionText) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            if (widget.visibility != null) {
                widget.visibility.condition = conditionText;
            }
            return widget;
        });
    }
    saveChartFormula(_label, _level, _mainIndex, _index, formulaText, aggregationType) {
        this._currentWidgetUpdate.next((w) => {
            if (w == null) {
                return null;
            }
            const widget = w;
            if (widget != null && widget.dataset != null) {
                let formula = createFormula({});
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
        });
    }
    saveTableFormula(_label, aggregationType, formulaText, _mainIndex, _index) {
        this._currentWidgetUpdate.next((w) => {
            if (w == null) {
                return null;
            }
            const widget = w;
            if (widget.dataset != null) {
                let formula = createFormula({});
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
        });
    }
    removeTableMainData(index) {
        this._removeFromCurrentWidgetArrayProperty('dataset', index);
    }
    removeData(_mainIndex, _index) {
        this._currentWidgetUpdate.next((widget) => {
            let myObj = widget;
            /* if (index === -1) {
              myObj.dataset.splice(mainIndex, 1);
            } else {
              myObj.dataset[mainIndex].splice(index, 1);
            } */
            return myObj;
        });
    }
    /**
     * update type field of AjfChartWidget current widget
     *
     * @param type
     *
     * @memberOf AjfReportBuilderService
     */
    setChartType(type) {
        this._setCurrentWidgetProperty('type', type);
    }
    /**
     * remove  idx element of xLabels field of AjfChartWidget current widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    removeMainData(_idx) {
        this._currentWidgetUpdate.next((widget) => {
            let myObj = widget;
            // myObj.dataset[0].splice(idx, 1);
            return myObj;
        });
    }
    removeRelatedData(_mainIdx, _idx) {
        this._currentWidgetUpdate.next((widget) => {
            let myObj = widget;
            /* if (idx == -1) {
              myObj.dataset.splice(mainIdx + 1, 1);
            } else {
              myObj.dataset[mainIdx + 1].splice(idx, 1);
            } */
            return myObj;
        });
    }
    /**
     * update backgroundColor field of AjfChartWidget current widget
     *
     * @param colors
     *
     * @memberOf AjfReportBuilderService
     */
    setChartBackgroundColor(colors) {
        this._setCurrentWidgetProperty('backgroundColor', colors);
    }
    addChartBackgroundColor(color) {
        this._addToCurrentWidgetArrayProperty('backgroundColor', color);
    }
    removeChartBackgroundColor(idx) {
        this._removeFromCurrentWidgetArrayProperty('backgroundColor', idx);
    }
    /**
     * update borderColor field of AjfChartWidget current widget
     *
     * @param colors
     *
     * @memberOf AjfReportBuilderService
     */
    setChartBorderColor(colors) {
        this._setCurrentWidgetProperty('borderColor', colors);
    }
    setChartBorderWidth(value) {
        this._setCurrentWidgetProperty('borderWidth', value);
    }
    addChartBorderColor(color) {
        this._addToCurrentWidgetArrayProperty('borderColor', color);
    }
    removeChartBorderColor(idx) {
        this._removeFromCurrentWidgetArrayProperty('borderColor', idx);
    }
    /**
     * This method set the AjfReport.
     *
     * @param report
     *
     * @memberOf AjfReportBuilderService
     */
    setReport(report) {
        this._report.next(report);
    }
    /**
     * This method set the export report.
     *
     * @param report
     *
     * @memberOf AjfReportBuilderService
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
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderService
     */
    setWidgetStyles(label, value) {
        this._currentWidgetUpdate.next((widget) => {
            let myObj = widget;
            const pxStyles = [
                'font-size',
                'height',
                'width',
                'border-width',
                'border-radius',
                'padding',
                'margin',
            ];
            const isPxStyle = pxStyles.indexOf(label) > -1;
            if (isPxStyle && !(value instanceof Array) && this.isNumber(value)) {
                value += 'px';
            }
            else if (isPxStyle && value instanceof Array && this.isNumberArray(value)) {
                value = `${value.join('px ')}px`;
            }
            myObj.styles[label] = value;
            return myObj;
        });
    }
    /**
     * this method update the styles of origin widget array
     *
     * @param origin can be header content or footer
     * @param label for example background-color
     * @param value for example rgb(255,255,255,1)
     *
     * @memberOf AjfReportBuilderService
     */
    setSectionStyles(origin, label, value) {
        if (origin !== 'header' && origin !== 'content' && origin !== 'footer') {
            throw new Error('uncknow origin ' + origin);
        }
        this._updates[origin].next((widget) => {
            widget.styles[label] = value;
            widget.styles = { ...widget.styles };
            return widget;
        });
    }
    /**
     * this method set the style of the whole report.
     *
     * @param label for example background-color
     * @param value for example rgb(255,255,255,1)
     *
     * @memberOf AjfReportBuilderService
     */
    setReportStyles(label, value) {
        this._reportStylesUpdate.next((styles) => {
            if (styles == null) {
                styles = {};
            }
            else {
                styles[label] = value;
                styles = { ...styles };
            }
            return styles;
        });
    }
    /**
     *  update forms
     *
     * @param forms
     *
     * @memberOf AjfReportBuilderService
     */
    setReportForms(forms) {
        this._reportFormsUpdate.next((_form) => {
            return forms || [];
        });
    }
    /**
     * update customWidgets
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addCustomWidgets(widget, position) {
        this._customWidgetsUpdate.next((customWidgets) => {
            customWidgets = customWidgets || [];
            if (position != null && position >= 0) {
                customWidgets.splice(position, 0, widget);
            }
            else {
                customWidgets.push(widget);
            }
            return customWidgets;
        });
    }
    /**
     * reset customWidgets
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    resetCustomWidgets() {
        this._customWidgetsUpdate.next((customWidgets) => {
            customWidgets.length = 0;
            return customWidgets;
        });
    }
    /**
     * update label of widget
     *
     * @param label
     * @param position
     *
     * @memberOf AjfReportBuilderService
     */
    changeLabelCustomWidget(label, position) {
        this._customWidgetsUpdate.next((customWidgets) => {
            customWidgets[position].type = label;
            return customWidgets;
        });
    }
    /**
     * Add an AjfWidget on _headerWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addHeaderWidget(widget, position) {
        this._addWidgetToContainer(this._headerWidgetsUpdate, widget, position);
    }
    /**
     * Add an AjfWidget on _contentWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addContentWidget(widget, position) {
        this._addWidgetToContainer(this._contentWidgetsUpdate, widget, position);
    }
    /**
     * Add an AjfWidget on _footerWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addfooterWidget(widget, position) {
        this._addWidgetToContainer(this._footerWidgetsUpdate, widget, position);
    }
    unfixedColumn(idx) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return widget;
            }
            let myObj = widget;
            let num = myObj.columns.length;
            let checkSum = 0;
            let objNum = 0;
            let value = 1;
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
                spreadValue = parseFloat(this.roundTo((checkSum - 1) % 1, 2).toFixed(2));
                myObj.columns[idx] -= spreadValue;
                myObj.columns[idx] = this.roundTo(myObj.columns[idx], 2);
            }
            else if (checkSum < 1) {
                myObj.columns[idx] += 1 - (checkSum % 1);
                myObj.columns[idx] = Number(this.roundTo(myObj.columns[idx], 2).toFixed(2));
            }
            return myObj;
        });
    }
    /**
     * Add column on the current AjfLayoutWidget.
     *
     * When adding a column the width of the other columns is recalculated
     * by dividing it by the number of column
     *
     * @memberOf AjfReportBuilderService
     */
    addColumn() {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            let myObj = widget;
            let tempObj = [];
            let num = myObj.columns.length + 1;
            let checkSum = 0;
            let objNum = 0;
            let value = 1;
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
                tmpValue = parseFloat(this.roundTo((checkSum - 1) % 1, 2).toFixed(2));
                tempObj[0] -= tmpValue;
                tempObj[0] = this.roundTo(tempObj[0], 2);
            }
            else if (checkSum < 1) {
                tempObj[0] += 1 - (checkSum % 1);
                tempObj[0] = Number(this.roundTo(tempObj[0], 2).toFixed(2));
            }
            myObj.columns = tempObj;
            // TODO: @trik what's value?!?
            const columnObj = createWidget({
                widgetType: 7,
                // value: myObj.columns[myObj.columns.length - 1],
            });
            myObj.content.push(columnObj);
            this._saveReportEvent.emit();
            return myObj;
        });
    }
    removeWidgetToColumn(column, index) {
        column.content.splice(index, 1);
    }
    /**
     * This method remove a widget on the current AjfReport.
     *
     * @param node
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
     * @param idx the position array
     *
     * @memberOf AjfReportBuilderService
     */
    remove(node, idx) {
        switch (node) {
            case 'header':
            case 'content':
            case 'footer':
                this._updates[node].next((widgets) => {
                    if (widgets.widgets.length === 0) {
                        throw new Error('you can not remove from empty array');
                    }
                    if (widgets.widgets[idx] == null) {
                        throw new Error('invalid index');
                    }
                    widgets.widgets.splice(idx, 1);
                    this.updateCurrentWidget(null);
                    return widgets;
                });
                break;
            case 'layout':
                this._currentWidgetUpdate.next((widget) => {
                    if (widget == null) {
                        return null;
                    }
                    const myObj = widget;
                    if (myObj.columns.length === 1) {
                        myObj.content[0].content.length = 0;
                        return myObj;
                    }
                    if (myObj.columns[idx] == null) {
                        throw new Error('this content is undefined');
                    }
                    else {
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
                });
                break;
            case 'column':
            case 'layoutContent':
            case 'unfixedColumn':
                this._currentWidgetUpdate.next((widget) => {
                    if (widget == null) {
                        return null;
                    }
                    let myObj = widget;
                    if (node === 'column') {
                        let clm = widget;
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
                });
                break;
            case 'customWidgets':
                {
                    this._updates[node].next((widgets) => {
                        if (widgets.length === 0) {
                            throw new Error('you can not remove from empty array');
                        }
                        if (widgets[idx] == null) {
                            throw new Error('invalid index');
                        }
                        widgets.splice(idx, 1);
                        return widgets;
                    });
                }
                break;
            default:
                throw new Error('unknown node ' + node);
        }
    }
    /**
     * This method add a AjfWidget on the current AjfLayoutWidget.
     *
     * @param newWidget
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    addToContent(newWidget, idx) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            let myObj = widget;
            if (myObj.content[idx] != null) {
                myObj.content.splice(idx, 1);
            }
            myObj.content.splice(idx, 0, newWidget);
            return myObj;
        });
    }
    addToColumn(event, toColumn, position) {
        if (event.dragData && event.dragData.fromColumn != null) {
            let fromColumn = event.dragData.fromColumn;
            let widget = event.dragData.widget;
            let fromIndex = event.dragData.fromIndex;
            fromColumn.content.splice(fromIndex, 1);
            toColumn.content.push(widget);
        }
        else if (event.dragData && event.dragData.arrayFrom) {
            this.remove(event.dragData.arrayFrom, event.dragData.fromIndex);
            toColumn.content.push(event.dragData.widget);
        }
        else if (event.dragData && event.dragData.json) {
            let obj = JSON.parse(event.dragData.json);
            let newWidget = deepCopy(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
        else {
            let obj = { 'widgetType': AjfWidgetType[event.dragData] };
            let newWidget = deepCopy(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
    }
    changePositionOnColumn(event, toColumn, toIndex) {
        let fromColumn = event.dragData.fromColumn;
        let fromIndex = event.dragData.fromIndex;
        let fromWidget = fromColumn.content[fromIndex];
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
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    fixedColumn(idx) {
        this.instantColumnValue(-1, idx);
    }
    changeColumn(from, to, layoutWidget) {
        if (to < 0 || to >= layoutWidget.content.length) {
            return;
        }
        if (from > layoutWidget.content.length - 1 && to > from) {
            return;
        }
        let fromColumn = layoutWidget.content[from];
        let fromColumnValue = layoutWidget.columns[from];
        let toColumn = layoutWidget.content[to];
        let toColumnValue = layoutWidget.columns[to];
        layoutWidget.content[from] = toColumn;
        layoutWidget.columns[from] = toColumnValue;
        layoutWidget.content[to] = fromColumn;
        layoutWidget.columns[to] = fromColumnValue;
        this.updateCurrentWidget(layoutWidget);
    }
    addCustomColor(color) {
        this._updates['color'].next((colors) => {
            if (colors.indexOf(color) < 0) {
                colors.push(color);
            }
            return colors;
        });
    }
    _addWidgetToContainer(subj, widget, position) {
        subj.next((widgets) => {
            if (position != null && position >= 0) {
                widgets.widgets.splice(position, 0, widget);
            }
            else {
                widgets.widgets.push(widget);
            }
            return widgets;
        });
        this.updateCurrentWidget(widget);
        this.setEmptyContent(false);
    }
    _setCurrentWidgetProperty(propName, value) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            widget[propName] = value;
            return widget;
        });
    }
    _addToCurrentWidgetArrayProperty(propName, value) {
        this._currentWidgetUpdate.next((widget) => {
            if (widget == null) {
                return null;
            }
            const arr = widget[propName];
            arr.push(value);
            widget[propName] = arr;
            return widget;
        });
    }
    _removeFromCurrentWidgetArrayProperty(propName, idx) {
        this._currentWidgetUpdate.next((widget) => {
            widget[propName].splice(idx, 1);
            return widget;
        });
    }
}
AjfReportBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderService, deps: [{ token: AJF_REPORTS_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
AjfReportBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [AJF_REPORTS_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxHQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEdBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7O0FBRTVDOzs7O0dBSUc7QUFFSCxNQUFNLE9BQU8sdUJBQXVCO0lBc1BsQzs7OztPQUlHO0lBQ0gsWUFBb0QsYUFBK0I7UUFwUDNFLHlCQUFvQixHQUMxQixJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQVFuQyxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBUXZELHVCQUFrQixHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFDO1FBRWxFLGVBQVUsR0FBOEIs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QUFFO1lBQzVFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNBLE1BQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbEMsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sZ0NBQWdDLENBQUMsUUFBZ0IsRUFBRSxLQUFVO1FBQ25FLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUF3QixFQUFvQixFQUFFO1lBQzVFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE1BQU0sR0FBRyxHQUFJLE1BQWMsQ0FBQyxRQUFRLENBQVUsQ0FBQztZQUMvQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2YsTUFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUNoQyxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxxQ0FBcUMsQ0FBQyxRQUFnQixFQUFFLEdBQVc7UUFDekUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXdCLEVBQW9CLEVBQUU7WUFDMUUsTUFBYyxDQUFDLFFBQVEsQ0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs0SEE5aUVVLHVCQUF1QixrQkEyUEYsa0JBQWtCO2dJQTNQdkMsdUJBQXVCO21HQUF2Qix1QkFBdUI7a0JBRG5DLFVBQVU7OzBCQTRQSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZGb3JtLCBBamZOb2RlLCBBamZOb2RlVHlwZSwgZmxhdHRlbk5vZGVzfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uLFxuICBBamZDaGFydFdpZGdldCxcbiAgQWpmQ29sdW1uV2lkZ2V0LFxuICBBamZDdXN0b21XaWRnZXQsXG4gIEFqZkRhdGFXaWRnZXQsXG4gIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsXG4gIEFqZlJlcG9ydCxcbiAgQWpmUmVwb3J0Q29udGFpbmVyLFxuICBBamZTdHlsZXMsXG4gIEFqZlRhYmxlV2lkZ2V0LFxuICBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsXG4gIEFqZldpZGdldFR5cGUsXG4gIGNyZWF0ZUFnZ3JlZ2F0aW9uLFxuICBjcmVhdGVXaWRnZXQsXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjb21iaW5lTGF0ZXN0LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGgsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzLCBBamZSZXBvcnRJY29ucywgQWpmUmVwb3J0c0NvbmZpZywgQWpmV2lkZ2V0c0NvbnRhaW5lcn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ29sb3JPcGVyYXRpb24sXG4gIEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24sXG4gIEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24sXG4gIEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uLFxuICBBamZTdHlsZXNPcGVyYXRpb24sXG4gIEFqZldpZGdldE9wZXJhdGlvbixcbiAgQWpmV2lkZ2V0c09wZXJhdGlvbixcbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcbmltcG9ydCB7QUpGX1JFUE9SVFNfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIGFsbCB0aGUgbG9naWMgdG8gbW9kZWwgdGhlIHJlcG9ydCB3aWRnZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2Uge1xuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXN0b21XaWRnZXRzIG9ialxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHM6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+O1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50IHdpZGdldC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW46IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfb3JpZ2luVXBkYXRlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBleHBvcnRlZCBqc29uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnQ6IE9ic2VydmFibGU8QWpmUmVwb3J0PjtcbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnRVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0PiA9IG5ldyBTdWJqZWN0PEFqZlJlcG9ydD4oKTtcblxuICBwcml2YXRlIF9qc29uU3RhY2s6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG5cbiAgcHJpdmF0ZSBfbGFzdERlbGV0ZWRKc29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfZW1wdHlDb250ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdnZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uRHJhZ2dlZFVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgcHJpdmF0ZSBfb25PdmVyOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbk92ZXJVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHBlcm1hbmVudCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZml4ZWRab29tOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9maXhlZFpvb21VcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdFbnRlcjogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclVwZGF0ZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBoZWFkZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBoZWFkZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBjb250ZW50IHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjb250ZW50IHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2NvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcHJpdmF0ZSBfY29sb3JVcGRhdGU6IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRDb2xvcjogc3RyaW5nW10gPSBbXG4gICAgJ3JnYmEoMCwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDUxLCAxNTMsIDI1NSwgMSknLFxuICAgICdyZ2JhKDE1MywgMjA0LCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxMDIsIDAsIDEpJyxcbiAgICAncmdiYSgwLCAyMDQsIDIwNCwgMSknLFxuICAgICdyZ2JhKDIwNCwgMjA0LCAxNTMsIDEpJyxcbiAgICAncmdiYSgyNTUsIDE1MywgMCwgMSknLFxuICAgICdyZ2JhKDIzMCwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyNTUsIDAsIDEpJyxcbiAgICAncmdiYSgwLCAxMzgsIDAsIDEpJyxcbiAgICAncmdiYSgwLCAxMDIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDE1MywgNTEsIDI1NSwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyxcbiAgICAncmdiYSgyNTAsIDIwNCwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyMzUsIDIwNCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjU1LCAyMDQsIDEpJyxcbiAgICAncmdiYSgyMDQsIDIzMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjA0LCAyMjQsIDI0NSwgMSknLFxuICAgICdyZ2JhKDIzNSwgMjE0LCAyNTUsIDEpJyxcbiAgICAncmdiYSgxODcsIDE4NywgMTg3LCAxKScsXG4gICAgJ3JnYmEoMjQwLCAxMDIsIDEwMiwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTk0LCAxMDIsIDEpJyxcbiAgICAncmdiYSgyNTUsIDI1NSwgMTAyLCAxKScsXG4gICAgJ3JnYmEoMTAyLCAxODUsIDEwMiwgMSknLFxuICAgICdyZ2JhKDEwMiwgMTYzLCAyMjQsIDEpJyxcbiAgICAncmdiYSgxOTQsIDEzMywgMjU1LCAxKScsXG4gICAgJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMSknLFxuICAgICdyZ2JhKDE2MSwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDE3OCwgMTA3LCAwLCAxKScsXG4gICAgJ3JnYmEoMTc4LCAxNzgsIDAsIDEpJyxcbiAgICAncmdiYSgwLCA5NywgMCwgMSknLFxuICAgICdyZ2JhKDAsIDcxLCAxNzgsIDEpJyxcbiAgICAncmdiYSgxMDcsIDM2LCAxNzgsIDEpJyxcbiAgICAncmdiYSg2OCwgNjgsIDY4LCAxKScsXG4gICAgJ3JnYmEoOTIsIDAsIDAsIDEpJyxcbiAgICAncmdiYSgxMDIsIDYxLCAwLCAxKScsXG4gICAgJ3JnYmEoMTAyLCAxMDIsIDAsIDEpJyxcbiAgICAncmdiYSgwLCA1NSwgMCwgMSknLFxuICAgICdyZ2JhKDAsIDQxLCAxMDIsIDEpJyxcbiAgICAncmdiYSg2MSwgMjAsIDEwMiwgMSknLFxuICBdO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXJyZW50IHdpZGdldCB3aGljaCBob2xkcyB0aGUgZm9jdXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDogT2JzZXJ2YWJsZTxBamZXaWRnZXQgfCBudWxsPjtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbiB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbiB8IG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbiB8IG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbiB8IG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCB1cGRhdGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgY29udGFpbnMgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnQgfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0IHwgbnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3R5bGVzIG9mIHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzVXBkYXRlOiBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGZvcm1zIGZldGNoZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRGb3JtczogT2JzZXJ2YWJsZTxBamZGb3JtW10+O1xuICBwcml2YXRlIF9yZXBvcnRGb3Jtc1VwZGF0ZTogU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBkaWN0aW9uYXJ5IGZvciAgd2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZXM6IGFueSA9IHtcbiAgICBoZWFkZXI6IHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsXG4gICAgY29udGVudDogdGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsXG4gICAgZm9vdGVyOiB0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbG9yOiB0aGlzLl9jb2xvclVwZGF0ZSxcbiAgICBjdXN0b21XaWRnZXRzOiB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLFxuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gd29udCB0byBzYXZlIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnRFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3NhdmVGb3JtdWxhVE9IdG1sOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldEZvcm11bGFUb0h0bWxFdmVudCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbCBhcyBPYnNlcnZhYmxlPHN0cmluZz47XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIGNvbHVtbiB3aWR0aCBjaGFuZ2VkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2ljb25TZXRzOiBBamZSZXBvcnRJY29ucyA9IHsnYWpmLWljb24nOiBbXX07XG4gIGdldCBpY29uU2V0cygpOiBBamZSZXBvcnRJY29ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb25TZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBSkZfUkVQT1JUU19DT05GSUcpIHJlcG9ydHNDb25maWc6IEFqZlJlcG9ydHNDb25maWcpIHtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcblxuICAgIGlmIChyZXBvcnRzQ29uZmlnICE9IG51bGwpIHtcbiAgICAgIGlmIChyZXBvcnRzQ29uZmlnLmljb25zICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5faWNvblNldHMgPSB7Li4udGhpcy5faWNvblNldHMsIC4uLnJlcG9ydHNDb25maWcuaWNvbnN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX29yaWdpbiA9ICg8T2JzZXJ2YWJsZTxzdHJpbmc+PnRoaXMuX29yaWdpblVwZGF0ZSkucGlwZShzdGFydFdpdGgoJ2hlYWRlcicpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX3NhdmVkUmVwb3J0ID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydD4+dGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUpLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWQgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25EcmFnZ2VkVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25PdmVyID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uT3ZlclVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX2ZpeGVkWm9vbSA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9maXhlZFpvb21VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdFbnRlciA9IHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9yZXBvcnRTdHlsZXMgPSAoPE9ic2VydmFibGU8QWpmU3R5bGVzT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpLnBpcGUoXG4gICAgICBzY2FuKChzdHlsZXM6IEFqZlN0eWxlcywgb3A6IEFqZlN0eWxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aoc3R5bGVzKTtcbiAgICAgIH0sIDxBamZTdHlsZXM+e30pLFxuICAgICAgc2hhcmUoKSxcbiAgICAgIHN0YXJ0V2l0aCg8QWpmU3R5bGVzPnt9KSxcbiAgICApO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlKS5waXBlKFxuICAgICAgc2NhbigoZm9ybXM6IEFqZkZvcm1bXSwgb3A6IEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChmb3Jtcyk7XG4gICAgICB9LCBbXSksXG4gICAgICBzaGFyZSgpLFxuICAgICAgc3RhcnRXaXRoKFtdKSxcbiAgICApO1xuXG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlKS5waXBlKFxuICAgICAgc2Nhbigod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10sIG9wOiBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlKCksXG4gICAgICBzdGFydFdpdGgoW10pLFxuICAgICk7XG5cbiAgICB0aGlzLl9mb3Jtc1ZhcmlhYmxlcyA9ICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSkucGlwZShcbiAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICB9LCBbXSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXMgPSAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpLnBpcGUoXG4gICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgfSwgW10pLFxuICAgICAgc2hhcmUoKSxcbiAgICAgIHN0YXJ0V2l0aChbXSksXG4gICAgKTtcblxuICAgIHRoaXMuX2hlYWRlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSkucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSxcbiAgICAgICksXG4gICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVzID0gdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKFxuICAgICAgbWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgICAgfSksXG4gICAgKTtcblxuICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKS5waXBlKFxuICAgICAgc2NhbihcbiAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICB9LFxuICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319LFxuICAgICAgKSxcbiAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9jb250ZW50U3R5bGVzID0gdGhpcy5fY29udGVudFdpZGdldHMucGlwZShcbiAgICAgIG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpLnBpcGUoXG4gICAgICBzY2FuKFxuICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgIH0sXG4gICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0sXG4gICAgICApLFxuICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX2Zvb3RlclN0eWxlcyA9IHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShcbiAgICAgIG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLl9jb2xvciA9ICg8T2JzZXJ2YWJsZTxBamZDb2xvck9wZXJhdGlvbj4+dGhpcy5fY29sb3JVcGRhdGUpLnBpcGUoXG4gICAgICBzY2FuKChjb2xvcjogc3RyaW5nW10sIG9wOiBBamZDb2xvck9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3AoY29sb3IpO1xuICAgICAgfSwgdGhpcy5fZGVmYXVsdENvbG9yKSxcbiAgICAgIHNoYXJlKCksXG4gICAgICBzdGFydFdpdGgodGhpcy5fZGVmYXVsdENvbG9yKSxcbiAgICApO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldCA9IHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUucGlwZShcbiAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICBtYXAocyA9PiBzISksXG4gICAgICBzY2FuKCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwsIG9wOiBBamZXaWRnZXRPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHdpZGdldCk7XG4gICAgICB9LCBudWxsIGFzIHVua25vd24gYXMgQWpmV2lkZ2V0KSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLFxuICAgICAgICBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSxcbiAgICAgICAgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKTtcblxuICAgIGNvbnN0IHJlcG9ydE9icyA9IHRoaXMuX3JlcG9ydDtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocjogQWpmUmVwb3J0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX2NvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yczogc3RyaW5nW10gPSB0aGlzLl9kZWZhdWx0Q29sb3I7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIGlmIChyLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5jb250ZW50LnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuZm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuZm9vdGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuaGVhZGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmhlYWRlci5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgb2JqID0gci5oZWFkZXIuY29udGVudFtpXTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihvYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxheW91dE9iaiA9IG9iaiBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5b3V0T2JqLmNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uT2JqID0gbGF5b3V0T2JqLmNvbnRlbnRbal0gYXMgQWpmQ29sdW1uV2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihjb2x1bW5PYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGNvbHVtbk9iai5jb250ZW50Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0T2JqID0gY29sdW1uT2JqLmNvbnRlbnRbel07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iod2lkZ2V0T2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gPHN0cmluZ1tdPnRlbXBDb2xvcnM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbG9yVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocjogQWpmUmVwb3J0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3N0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5zdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz57fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnIuc3R5bGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyOiBBamZSZXBvcnQgfCBudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmhlYWRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmhlYWRlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5oZWFkZXIuc3R5bGVzIHx8IHt9LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocjogQWpmUmVwb3J0IHwgbnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuY29udGVudC5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5jb250ZW50LnN0eWxlcyB8fCB7fSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyOiBBamZSZXBvcnQgfCBudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmZvb3RlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmZvb3Rlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5mb290ZXIuc3R5bGVzIHx8IHt9LFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnQucGlwZShcbiAgICAgIG1hcCgoanNvbjogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAoX3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgaWYgKChqc29uID0gbnVsbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50XG4gICAgICAucGlwZShcbiAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnJlcG9ydCwgdGhpcy5yZXBvcnRGb3JtcyksXG4gICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgIHRoaXMuX3JlcG9ydFN0eWxlcy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShyID0+IHtcbiAgICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICAgIC8vIGNvbnN0IGN1clJvID0gclswXVsxXTtcbiAgICAgICAgLy8gY29uc3QgZm9ybXMgPSByWzBdWzJdICE9IG51bGwgPyByWzBdWzJdIHx8IFtdXG4gICAgICAgIC8vICAgICA6IChjdXJSbyAhPSBudWxsID8gY3VyUm8uZm9ybXMgfHwgW10gOiBbXSk7XG5cbiAgICAgICAgY29uc3QgW2hjbywgY2NvLCBmY29dID0gW3JbMV0sIHJbMl0sIHJbM11dIGFzIEFqZldpZGdldHNDb250YWluZXJbXTtcblxuICAgICAgICBvYmouaGVhZGVyID0ge1xuICAgICAgICAgIGNvbnRlbnQ6IGhjby53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSxcbiAgICAgICAgICBzdHlsZXM6IGhjby5zdHlsZXMsXG4gICAgICAgIH0gYXMgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICBvYmouY29udGVudCA9IHtcbiAgICAgICAgICBjb250ZW50OiBjY28ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksXG4gICAgICAgICAgc3R5bGVzOiBjY28uc3R5bGVzLFxuICAgICAgICB9IGFzIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgb2JqLmZvb3RlciA9IHtcbiAgICAgICAgICBjb250ZW50OiBmY28ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksXG4gICAgICAgICAgc3R5bGVzOiBmY28uc3R5bGVzLFxuICAgICAgICB9IGFzIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgb2JqLnN0eWxlcyA9IHJbNF07XG5cbiAgICAgICAgY29uc3Qgcm8gPSB7XG4gICAgICAgICAgaGVhZGVyOiB7Y29udGVudDogaGNvLndpZGdldHMsIHN0eWxlczogaGNvLnN0eWxlc30sXG4gICAgICAgICAgY29udGVudDoge2NvbnRlbnQ6IGNjby53aWRnZXRzLCBzdHlsZXM6IGNjby5zdHlsZXN9LFxuICAgICAgICAgIGZvb3Rlcjoge2NvbnRlbnQ6IGZjby53aWRnZXRzLCBzdHlsZXM6IGZjby5zdHlsZXN9LFxuICAgICAgICAgIHN0eWxlczogcls0XSxcbiAgICAgICAgfSBhcyBBamZSZXBvcnQ7XG5cbiAgICAgICAgdGhpcy5zZXRTYXZlUmVwb3J0KG9iaik7XG4gICAgICAgIHRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlLm5leHQocm8pO1xuICAgICAgICB0aGlzLnB1c2hKc29uU3RhY2soSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogcmVtb3ZlIEFqZk5vZGVHcm91cCwgQWpmU2xpZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTdHJpbmdGaWVsZCBmcm9tIGFqZm5vZGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZmlsdGVyTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKFxuICAgICAgICBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXAgfHxcbiAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHxcbiAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUgfHxcbiAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkICYmXG4gICAgICAgICAgKG5vZGUgYXMgQWpmRmllbGQpLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLlN0cmluZylcbiAgICAgICkge1xuICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgcGFyc2VDb2xvcihjc3NTdHlsZXM6IGFueSwgY29sb3JzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlS2V5cyA9IFsnYmFja2dyb3VuZC1jb2xvcicsICdiYWNrZ3JvdW5kQ29sb3InLCAnY29sb3InXTtcbiAgICBzdHlsZUtleXMuZm9yRWFjaChrID0+IHtcbiAgICAgIGlmIChjc3NTdHlsZXNba10gJiYgY29sb3JzLmluZGV4T2YoY3NzU3R5bGVzW2tdKSA9PSAtMSkge1xuICAgICAgICBjb2xvcnMucHVzaChjc3NTdHlsZXNba10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICBsZXQgdmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXJpYWJsZXNbaV0gPSB7bm9kZXM6IFtdLCBsYWJlbHM6IFtdLCBuYW1lczogW10sIHR5cGVzOiBbXX07XG5cbiAgICAgIGlmIChmb3Jtc1tpXS5ub2RlcyAhPSBudWxsICYmIGZvcm1zW2ldLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyaWFibGVzW2ldLm5vZGVzID0gdGhpcy5maWx0ZXJOb2RlcyhmbGF0dGVuTm9kZXMoZm9ybXNbaV0ubm9kZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1tpXS5sYWJlbHMgPSB0aGlzLmV4dHJhY3RMYWJlbHNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLm5hbWVzID0gdGhpcy5leHRyYWN0TmFtZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLnR5cGVzID0gdGhpcy5leHRyYWN0VHlwZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzO1xuICB9XG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogIHRoZSBvYmogcmV0dXJuZWQgY29udGFpbnMgdGhlIGxhYmVsIGZpZWxkIG9mIGFqZk5vZGVcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZXh0cmFjdExhYmVsc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubGFiZWwpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZXh0cmFjdE5hbWVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBleHRyYWN0VHlwZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBBamZGaWVsZFR5cGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwOiBBamZGaWVsZCA9IDxBamZGaWVsZD5ub2Rlc1tpXTtcbiAgICAgIG9iai5wdXNoKHAuZmllbGRUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHNldE9yaWdpbihvcmlnaW46IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29yaWdpblVwZGF0ZS5uZXh0KG9yaWdpbik7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZSB0byB0aGUgZGVjaW1hbCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGRlY2ltYWxwb3NpdGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15cXGQrKFxcLlxcZCspPy8udGVzdCh2YWx1ZSk7XG4gIH1cblxuICBpc051bWJlckFycmF5KHZhbHVlOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc051bWJlcih2YWx1ZVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ2dlZCBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdnZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnZ2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25PdmVyIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uT3ZlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbk92ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9maXhlZFpvb20gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZml4ZWRab29tKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFpvb207XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdFbnRlciBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdFbnRlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdFbnRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdFbnRlciB3aXRoICBzZWN0aW9uKGhlYWRlcixjb250ZW50LGZvb3RlcikgYW5kIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0VudGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHthcnJheSwgaW5kZXh9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbmRyYWdnZWQgd2l0aCB0cnVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuXG4gIGRyYWdFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25PdmVyIHdpdGggdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBfb25PdmVyIHdpdGggZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBvdmVyRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0xlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLm5leHQoe30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnQgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydCBhcyBPYnNlcnZhYmxlPEFqZlJlcG9ydCB8IG51bGw+O1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgc2F2ZSByZXBvcnQgZXZlbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzYXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLl9zYXZlUmVwb3J0RXZlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKGZvcm11bGE6IEFqZkZvcm11bGEpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBjb25zdCB3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgdy5mbGFnID0gZm9ybXVsYTtcbiAgICAgIHcuaWNvbiA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gdztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhVG9IdG1sKGh0bWxGb3JtdWxhOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHsnZm9ybXVsYSc6IGh0bWxGb3JtdWxhLCAncmVmZXJlbmNlJzogcmVmZXJlbmNlfTtcbiAgICAgIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmVtaXQob2JqKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbXB0eUNvbnRlbnQodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZW1wdHlDb250ZW50Lm5leHQodmFsKTtcbiAgfVxuXG4gIHB1c2hKc29uU3RhY2soanNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGN1cnJlbnRTdGFjayA9IHRoaXMuX2pzb25TdGFjay5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5pbmRleE9mKGpzb24pID09PSAtMSAmJiBqc29uICE9PSB0aGlzLl9sYXN0RGVsZXRlZEpzb24pIHtcbiAgICAgIGN1cnJlbnRTdGFjay5wdXNoKGpzb24pO1xuICAgIH1cblxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG4gIH1cblxuICBwb3BKc29uU3RhY2soKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgZW1wdHlKc29uID1cbiAgICAgICd7XCJoZWFkZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sJyArXG4gICAgICAnXCJjb250ZW50XCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwiJyArXG4gICAgICAnZm9vdGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwic3R5bGVzXCI6e319JztcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG4gICAgY3VycmVudFN0YWNrLnBvcCgpO1xuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9IGN1cnJlbnRTdGFjay5wb3AoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2subGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuICAgICAgdGhpcy5fanNvblN0YWNrLm5leHQoW10pO1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQodHJ1ZSk7XG4gICAgICByZXR1cm4gZW1wdHlKc29uO1xuICAgIH1cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REZWxldGVkSnNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGVtaXR0ZXJcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbHVtbldpZHRoQ2hhbmdlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfY3VzdG9tV2lkZ2V0cyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXN0b21XaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQ29udGVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50V2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbnRlbnQgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbG9ycyBvZiByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbG9ycygpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG5cbiAgZ2V0IGVtcHR5Q29udGVudCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZW1wdHlDb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVBcnJheVdpZGdldHModHlwZTogc3RyaW5nLCBuZXdXaWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpIHtcbiAgICBpZiAodHlwZSAhPT0gJ2hlYWRlcicgJiYgdHlwZSAhPT0gJ2NvbnRlbnQnICYmIHR5cGUgIT09ICdmb290ZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSAnICsgdHlwZSk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZXNbdHlwZV0ubmV4dCgoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9mb3Jtc1ZhcmlhYmxlcyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3Jtc1ZhcmlhYmxlcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mb3Jtc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGdldCBjb25kaXRpb25OYW1lcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25kaXRpb25OYW1lcztcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VycmVudFdpZGdldCgpOiBPYnNlcnZhYmxlPEFqZldpZGdldCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBVcGRhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGUgd2l0aCBuZXdXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVDdXJyZW50V2lkZ2V0KG5ld1dpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgoX3dpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGdldFNhdmVSZXBvcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVJlcG9ydCBhcyBPYnNlcnZhYmxlPGFueT47XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9qc29uU2F2ZWRSZXBvcnQgb2Jlc2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFNhdmVkKCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVkUmVwb3J0O1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0U3R5bGVzIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRGb3JtcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRGb3JtcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRGb3JtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIF9vcmlnaW4gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb3JpZ2luKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhc3NpZ25zIHRoZSBuZXcgd2lkdGggdG8gdGhlIGlkeCBjb2x1bW5cbiAgICogYW5kIHJlY2FsY3VsYXRlcyB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIG9mIHRoZSBsYXlvdXQuXG4gICAqIFRoZSByYW5nZSB2YWx1ZSBhcmUgZnJvbSAwLDEgdG8gMS5cbiAgICpcbiAgICogUlVMRVM6XG4gICAqIFRoZSBtaW4gdmFsdWUgZm9yIGNvbHVtbiBpcyAwLDEuXG4gICAqIFRoZSBzdW0gb2YgYWxsIGNvbHVtbnMgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqIFRoZSBtZXRob2Qgcm91bmQgdGhlIHZhbHVlcy5cbiAgICogSWYgaXMgcHJlc2VudCBvbmx5IG9uZSBjb2x1bW4gdGhlIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYD5gIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBkZWNyZWFzZXMuXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPGAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGluY3JlYXNlcy5cbiAgICpcbiAgICogV2hlbiB2YWx1ZXMg4oCL4oCLYXJlIHBlcmlvZGljLCByb3VuZGluZyBhc3NpZ25zIHRoZSBnYXAgdG8gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEZvciBleGFtcGxlOiAzIGNvbHVtbnMgd2l0aCAwLDMzIGJlbGlldmUgMSBjb2x1bW4gMCwzNCBhbmQgMiBjb2x1bW5zIDAsMzMuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdWYWx1ZVxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaW5zdGFudENvbHVtblZhbHVlKG5ld1ZhbHVlOiBudW1iZXIsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGxldCBzaXplID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgIGxldCBzcHJlYWRWYWx1ZSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgbGV0IGlkeEZpcnN0Tm9PYmogPSAtMTtcblxuICAgICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kRmlyc3ROb09iaiA9IGZhbHNlO1xuXG4gICAgICBsZXQgcmUxID0gbmV3IFJlZ0V4cCgnKF5bMF0uWzEtOV1bMC05XSQpJyk7XG4gICAgICBsZXQgcmUyID0gbmV3IFJlZ0V4cCgnKF5bMF0uWzEtOV0kKScpO1xuICAgICAgbGV0IHJlMyA9IG5ldyBSZWdFeHAoJ15bMV0kJyk7XG5cbiAgICAgIGxldCBvbGRWYWx1ZSA9IG15T2JqLmNvbHVtbnNbaWR4XTtcblxuICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKG5ld1ZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob2xkVmFsdWUgPT0gLTEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICAgIG9iak51bS0tO1xuICAgICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChzaXplIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDAuMTtcbiAgICAgIH0gZWxzZSBpZiAob2xkVmFsdWUgPCAwLjEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1swXSA9IDE7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlIDwgMC4xKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAwLjE7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgKyAwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpID4gMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMSAtIDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgPT09IG5ld1ZhbHVlICYmIG9sZFZhbHVlID09PSAwLjEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgPiBuZXdWYWx1ZSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUgLSBuZXdWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZCA9IGZhbHNlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG5ld1ZhbHVlIC0gb2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwcmVhZFZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhzcHJlYWRWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgaWYgKHNwcmVhZFZhbHVlIDwgMC4wMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMC4xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gb2xkVmFsdWUgLyAoc2l6ZSAtIG9iak51bSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG4gICAgICAgICAgaWYgKGkgPT0gaWR4KSB7XG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA+IDAuOSAmJiBteU9iai5jb2x1bW5zLmxlbmd0aCAtIG9iak51bSAhPSAxKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuOTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPCAwLjEpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC4xO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaV0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgc3VtICs9IG15T2JqLmNvbHVtbnNbaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhzdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaiA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWR4Rmlyc3ROb09iaiA9IGk7XG4gICAgICAgICAgICBmb3VuZEZpcnN0Tm9PYmogPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhGaXJzdE5vT2JqXSArPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG15T2JqLmNvbHVtbnNbal0gIT09IC0xICYmXG4gICAgICAgICAgIXJlMS50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiZcbiAgICAgICAgICAhcmUyLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJlxuICAgICAgICAgICFyZTMudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKDAuMSwgaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlci5lbWl0KCk7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgaW1hZ2VVcmwgb24gdGhlIGN1cnJlbnQgQWpmSW1hZ2VXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZVVybFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai51cmwgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ltYWdlVXJsfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7Zm9udFNldDogc3RyaW5nOyBmb250SWNvbjogc3RyaW5nfSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXQgfCBudWxsKTogQWpmV2lkZ2V0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmljb24gPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ljb259XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5mbGFnID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHt2YWx1ZX1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oY29uZGl0aW9uVGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh3aWRnZXQudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIHdpZGdldC52aXNpYmlsaXR5LmNvbmRpdGlvbiA9IGNvbmRpdGlvblRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICBfbGFiZWw6IHN0cmluZyxcbiAgICBfbGV2ZWw6IG51bWJlcixcbiAgICBfbWFpbkluZGV4OiBudW1iZXIsXG4gICAgX2luZGV4OiBudW1iZXIsXG4gICAgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICBhZ2dyZWdhdGlvblR5cGU6IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXQgfCBudWxsKTogQWpmV2lkZ2V0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQgIT0gbnVsbCAmJiB3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSByb3cgdGhhdCBjb250YWlucyBtYWluIGRhdGEgaXMgZGVmaW5lZFxuICAgICAgICAvKiBpZiAod2lkZ2V0LmRhdGFzZXRbMF0gPT0gbnVsbCkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV2ZWwgPT0gMCAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT0gMSAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXggKyAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVUYWJsZUZvcm11bGEoXG4gICAgX2xhYmVsOiBzdHJpbmcsXG4gICAgYWdncmVnYXRpb25UeXBlOiBudW1iZXIsXG4gICAgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICBfbWFpbkluZGV4OiBudW1iZXIsXG4gICAgX2luZGV4OiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmVGFibGVXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgZGF0YXNldDogQWpmRGF0YXNldCA9IG5ldyBBamZEYXRhc2V0KCk7XG4gICAgICAgIC8vIGxldCByb3dEYXRhc2V0OiBBamZEYXRhc2V0W10gPSBbXTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLyogaWYgKG1haW5JbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdkYXRhc2V0JywgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZEYXRhV2lkZ2V0PndpZGdldDtcblxuICAgICAgLyogaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgdHlwZSBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ3R5cGUnLCB0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgIGlkeCBlbGVtZW50IG9mIHhMYWJlbHMgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZU1haW5EYXRhKF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXQgfCBudWxsKTogQWpmV2lkZ2V0IHwgbnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLy8gbXlPYmouZGF0YXNldFswXS5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUmVsYXRlZERhdGEoX21haW5JZHg6IG51bWJlciwgX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvKiBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JZHggKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbklkeCArIDFdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGJhY2tncm91bmRDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIGFkZENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYm9yZGVyQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJXaWR0aCcsIHZhbHVlKTtcbiAgfVxuXG4gIGFkZENoYXJ0Qm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0KHJlcG9ydDogQWpmUmVwb3J0KTogdm9pZCB7XG4gICAgdGhpcy5fcmVwb3J0Lm5leHQocmVwb3J0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTYXZlUmVwb3J0KGpzb246IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVSZXBvcnQubmV4dChqc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGZvbnQgYXR0cmlidXRlIG9uIHRoZSBjdXJyZW50IEFqZldpZGdldC5cbiAgICpcbiAgICogVGhlcmUgaXMgYSBjaGVjayBvbiBmb250LXNpemUgYXR0cmlidXRlLFxuICAgKiBpZiBpcyBubyBzcGVjaWZpY2F0ZSB0aGUgdHlwZSBvZiBzaXplIGZvbnQgc2V0ICdwdCcgYXMgZGVmYXVsdC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZlRleHRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBjb25zdCBweFN0eWxlcyA9IFtcbiAgICAgICAgJ2ZvbnQtc2l6ZScsXG4gICAgICAgICdoZWlnaHQnLFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICAnYm9yZGVyLXdpZHRoJyxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnLFxuICAgICAgICAncGFkZGluZycsXG4gICAgICAgICdtYXJnaW4nLFxuICAgICAgXTtcbiAgICAgIGNvbnN0IGlzUHhTdHlsZSA9IHB4U3R5bGVzLmluZGV4T2YobGFiZWwpID4gLTE7XG4gICAgICBpZiAoaXNQeFN0eWxlICYmICEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgKz0gJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAoaXNQeFN0eWxlICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5pc051bWJlckFycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IGAke3ZhbHVlLmpvaW4oJ3B4ICcpfXB4YDtcbiAgICAgIH1cblxuICAgICAgbXlPYmouc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgdXBkYXRlIHRoZSBzdHlsZXMgb2Ygb3JpZ2luIHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMob3JpZ2luOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAob3JpZ2luICE9PSAnaGVhZGVyJyAmJiBvcmlnaW4gIT09ICdjb250ZW50JyAmJiBvcmlnaW4gIT09ICdmb290ZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuY2tub3cgb3JpZ2luICcgKyBvcmlnaW4pO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZXNbb3JpZ2luXS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHdpZGdldC5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHdpZGdldC5zdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi53aWRnZXQuc3R5bGVzfTtcblxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBzZXQgdGhlIHN0eWxlIG9mIHRoZSB3aG9sZSByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZS5uZXh0KChzdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICBpZiAoc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgc3R5bGVzID0ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZXNbbGFiZWxdID0gdmFsdWU7XG4gICAgICAgIHN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLnN0eWxlc307XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgZm9ybXNcbiAgICpcbiAgICogQHBhcmFtIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0Rm9ybXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIHRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlLm5leHQoKF9mb3JtOiBBamZGb3JtW10pOiBBamZGb3JtW10gPT4ge1xuICAgICAgcmV0dXJuIGZvcm1zIHx8IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDdXN0b21XaWRnZXRzKHdpZGdldDogQWpmQ3VzdG9tV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzID0gY3VzdG9tV2lkZ2V0cyB8fCBbXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlc2V0Q3VzdG9tV2lkZ2V0cygpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGxhYmVsIG9mIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY2hhbmdlTGFiZWxDdXN0b21XaWRnZXQobGFiZWw6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzW3Bvc2l0aW9uXS50eXBlID0gbGFiZWw7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9oZWFkZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRIZWFkZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfY29udGVudFdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbnRlbnRXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2Zvb3RlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZGZvb3RlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgc3ByZWFkVmFsdWU6IGFueTtcbiAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IHZhbHVlO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHNwcmVhZFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnJvdW5kVG8oKGNoZWNrU3VtIC0gMSkgJSAxLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSB0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSArPSAxIC0gKGNoZWNrU3VtICUgMSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb2x1bW4gb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBXaGVuIGFkZGluZyBhIGNvbHVtbiB0aGUgd2lkdGggb2YgdGhlIG90aGVyIGNvbHVtbnMgaXMgcmVjYWxjdWxhdGVkXG4gICAqIGJ5IGRpdmlkaW5nIGl0IGJ5IHRoZSBudW1iZXIgb2YgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXQgfCBudWxsKTogQWpmV2lkZ2V0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCB0ZW1wT2JqOiBudW1iZXJbXSA9IFtdO1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoICsgMTtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgdG1wVmFsdWU6IGFueTtcblxuICAgICAgaWYgKG51bSA+IDEwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhjZWVkIG1heCBjb2x1bW5zJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldID09PSAtMSkge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCgtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKHZhbHVlKTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgdG1wVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoY2hlY2tTdW0gLSAxKSAlIDEsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB0ZW1wT2JqWzBdIC09IHRtcFZhbHVlO1xuICAgICAgICB0ZW1wT2JqWzBdID0gdGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgdGVtcE9ialswXSArPSAxIC0gKGNoZWNrU3VtICUgMSk7XG4gICAgICAgIHRlbXBPYmpbMF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBteU9iai5jb2x1bW5zID0gdGVtcE9iajtcblxuICAgICAgLy8gVE9ETzogQHRyaWsgd2hhdCdzIHZhbHVlPyE/XG4gICAgICBjb25zdCBjb2x1bW5PYmogPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiA3LFxuICAgICAgICAvLyB2YWx1ZTogbXlPYmouY29sdW1uc1tteU9iai5jb2x1bW5zLmxlbmd0aCAtIDFdLFxuICAgICAgfSk7XG5cbiAgICAgIG15T2JqLmNvbnRlbnQucHVzaChjb2x1bW5PYmopO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVdpZGdldFRvQ29sdW1uKGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29sdW1uLmNvbnRlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmUgYSB3aWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKiB0aGUgcG9zaXRpb24gYXJyYXk6XG4gICAqXG4gICAqIGhlYWRlciAtYD5gIGhlYWRlcldpZGdldHNcbiAgICogY29udGVudCAtYD5gIGNvbnRlbnRXaWRnZXRzXG4gICAqIGZvb3RlciAtYD5gIGZvb3RlcldpZGdldHNcbiAgICogY29sdW1uIC1gPmAgY29sdW1uIG9mIGxheW91dFxuICAgKiBsYXlvdXRDb250ZW50IC1gPmAgY29udGVudCBvZiBsYXlvdXRcbiAgICogb2JqIC1gPmAgb2JqIG9mIGxheW91dFxuICAgKiBjdXN0b21XaWRnZXQgLWA+YCBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHggdGhlIHBvc2l0aW9uIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlKG5vZGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKG5vZGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIChteU9iai5jb250ZW50WzBdIGFzIEFqZkNvbHVtbldpZGdldCkuY29udGVudC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgY2FzZSAnbGF5b3V0Q29udGVudCc6XG4gICAgICBjYXNlICd1bmZpeGVkQ29sdW1uJzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgICAgIGlmIChub2RlID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgbGV0IGNsbSA9IDxBamZDb2x1bW5XaWRnZXQ+d2lkZ2V0O1xuICAgICAgICAgICAgY2xtLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAnbGF5b3V0Q29udGVudCcpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gbGVuZ3RoIGlzIDAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgcmVtb3ZlIGFueSB3aWRnZXQgZnJvbSBlbXB0eSBjb250ZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9IG51bGwgJiYgbXlPYmouY29udGVudFtpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAndW5maXhlZENvbHVtbicpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBwb3NpdGlvbiB2YWx1ZSAgaXNudCAtMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmZpeGVkQ29sdW1uKGlkeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIChub2RlICE9PSAnb2JqJykge1xuICAgICAgICAgIC8vICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIC8vICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1c3RvbVdpZGdldHMnOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgICAgICAgIGlmICh3aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gbm9kZSAnICsgbm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCBhIEFqZldpZGdldCBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZFRvQ29udGVudChuZXdXaWRnZXQ6IEFqZldpZGdldCwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0IHwgbnVsbCk6IEFqZldpZGdldCB8IG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5jb250ZW50W2lkeF0gIT0gbnVsbCkge1xuICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAwLCBuZXdXaWRnZXQpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVG9Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbiAhPSBudWxsKSB7XG4gICAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICAgIGxldCB3aWRnZXQ6IEFqZldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLndpZGdldDtcbiAgICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcblxuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKHdpZGdldCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5hcnJheUZyb20pIHtcbiAgICAgIHRoaXMucmVtb3ZlKGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSwgZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4KTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChldmVudC5kcmFnRGF0YS53aWRnZXQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuanNvbikge1xuICAgICAgbGV0IG9iaiA9IEpTT04ucGFyc2UoZXZlbnQuZHJhZ0RhdGEuanNvbik7XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9iaiA9IHsnd2lkZ2V0VHlwZSc6IEFqZldpZGdldFR5cGVbZXZlbnQuZHJhZ0RhdGFdfTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGFuZ2VQb3NpdGlvbk9uQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHRvSW5kZXg6IG51bWJlcikge1xuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcbiAgICBsZXQgZnJvbVdpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF07XG4gICAgbGV0IHRvV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF07XG5cbiAgICBpZiAoZnJvbUNvbHVtbiA9PSB0b0NvbHVtbikge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF0gPSB0b1dpZGdldDtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XSA9IGZyb21XaWRnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHRvSW5kZXgsIDAsIGZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgdGhlIG9iaiBvbiB0aGUgaWR4IHBvc2l0aW9uLlxuICAgKiBPYmogaGF2ZSBhIG5vIHNwZWNpZmljYXRlIHdpZHRoIGFuZCBpcyBub3QgY2FsY3VsYXRlIGFzIGNvbHVtbnNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoLTEsIGlkeCk7XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBsYXlvdXRXaWRnZXQ6IEFqZkxheW91dFdpZGdldCkge1xuICAgIGlmICh0byA8IDAgfHwgdG8gPj0gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChmcm9tID4gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoIC0gMSAmJiB0byA+IGZyb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXTtcbiAgICBsZXQgZnJvbUNvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXTtcbiAgICBsZXQgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dO1xuICAgIGxldCB0b0NvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b107XG5cbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXSA9IHRvQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dID0gdG9Db2x1bW5WYWx1ZTtcbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFt0b10gPSBmcm9tQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW3RvXSA9IGZyb21Db2x1bW5WYWx1ZTtcblxuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChsYXlvdXRXaWRnZXQpO1xuICB9XG5cbiAgYWRkQ3VzdG9tQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX3VwZGF0ZXNbJ2NvbG9yJ10ubmV4dCgoY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgIGlmIChjb2xvcnMuaW5kZXhPZihjb2xvcikgPCAwKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRXaWRnZXRUb0NvbnRhaW5lcihcbiAgICBzdWJqOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+LFxuICAgIHdpZGdldDogQWpmV2lkZ2V0LFxuICAgIHBvc2l0aW9uPzogbnVtYmVyLFxuICApIHtcbiAgICBzdWJqLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQod2lkZ2V0KTtcbiAgICB0aGlzLnNldEVtcHR5Q29udGVudChmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXQgfCBudWxsKTogQWpmV2lkZ2V0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldCB8IG51bGwpOiBBamZXaWRnZXQgfCBudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFyciA9ICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gYXMgYW55W107XG4gICAgICBhcnIucHVzaCh2YWx1ZSk7XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gYXJyO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXQgfCBudWxsKTogQWpmV2lkZ2V0IHwgbnVsbCA9PiB7XG4gICAgICAoKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSBhcyBhbnlbXSkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG59XG4iXX0=