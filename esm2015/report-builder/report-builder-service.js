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
            customWidgets: this._customWidgetsUpdate
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
                this._iconSets = Object.assign(Object.assign({}, this._iconSets), reportsConfig.icons);
            }
        }
        this._origin = this._originUpdate.pipe(startWith('header'), share());
        this._savedReport = this._savedReportUpdate.pipe(share());
        this._onDragged = this._onDraggedUpdate.pipe(startWith(false), share());
        this._onOver = this._onOverUpdate.pipe(startWith(false), share());
        this._fixedZoom = this._fixedZoomUpdate.pipe(startWith(false), share());
        this._onDragEnter = this._onDragEnterUpdate.pipe(share());
        this._reportStyles = this._reportStylesUpdate
            .pipe(scan((styles, op) => {
            return op(styles);
        }, {}), share(), startWith({}));
        this._reportForms = this._reportFormsUpdate
            .pipe(scan((forms, op) => {
            return op(forms);
        }, []), share(), startWith([]));
        this._customWidgets =
            this._customWidgetsUpdate
                .pipe(scan((widgets, op) => {
                return op(widgets);
            }, []), share(), startWith([]));
        this._formsVariables =
            this._formsVariablesUpdate
                .pipe(filter(s => s != null), scan((variables, op) => {
                return op(variables);
            }, []), publishReplay(1), refCount());
        this._conditionNames =
            this._conditionNamesUpdate
                .pipe(filter(s => s != null), scan((variables, op) => {
                return op(variables);
            }, []), share(), startWith([]));
        this._headerWidgets = this._headerWidgetsUpdate
            .pipe(scan((widgets, op) => {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._headerStyles = this._headerWidgets.pipe(map((widgets) => {
            return widgets != null ? widgets.styles : {};
        }));
        this._contentWidgets = this._contentWidgetsUpdate
            .pipe(scan((widgets, op) => {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._contentStyles = this._contentWidgets.pipe(map((widgets) => {
            return widgets != null ? widgets.styles : {};
        }));
        this._footerWidgets = this._footerWidgetsUpdate
            .pipe(scan((widgets, op) => {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._footerStyles = this._footerWidgets.pipe(map((widgets) => {
            return widgets != null ? widgets.styles : {};
        }));
        this._color = this._colorUpdate
            .pipe(scan((color, op) => {
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
                        styles: r.header.styles || {}
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
                        styles: r.content.styles || {}
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
                        styles: r.footer.styles || {}
                    };
                }
            };
        }))
            .subscribe(this._footerWidgetsUpdate);
        this._saveReport.pipe(map((json) => {
            return (_r) => {
                if (json = null) {
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
            obj.header = { content: hco.widgets.map(w => deepCopy(w)), styles: hco.styles };
            obj.content = { content: cco.widgets.map(w => deepCopy(w)), styles: cco.styles };
            obj.footer = { content: fco.widgets.map(w => deepCopy(w)), styles: fco.styles };
            obj.styles = r[4];
            const ro = {
                header: { content: hco.widgets, styles: hco.styles },
                content: { content: cco.widgets, styles: cco.styles },
                footer: { content: fco.widgets, styles: fco.styles },
                styles: r[4]
            };
            this.setSaveReport(obj);
            this._savedReportUpdate.next(ro);
            this.pushJsonStack(JSON.stringify(obj));
        });
    }
    getFormulaToHtmlEvent() {
        return this._saveFormulaTOHtml.asObservable();
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
            if (node.nodeType === AjfNodeType.AjfNodeGroup || node.nodeType === AjfNodeType.AjfSlide ||
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
        styleKeys.forEach((k) => {
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
        return this._report.asObservable();
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
        if ((type !== 'header') && (type !== 'content') && (type !== 'footer')) {
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
        return this._saveReport.asObservable();
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
            let re1 = new RegExp('(^[0]\.\[1-9][0-9]$)');
            let re2 = new RegExp('(^[0]\.\[1-9]$)');
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
            const pxStyles = ['font-size', 'height', 'width', 'border-width', 'border-radius', 'padding', 'margin'];
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
        if ((origin !== 'header') && (origin !== 'content') && (origin !== 'footer')) {
            throw new Error('uncknow origin ' + origin);
        }
        this._updates[origin].next((widget) => {
            widget.styles[label] = value;
            widget.styles = Object.assign({}, widget.styles);
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
                styles = Object.assign({}, styles);
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
                spreadValue = parseFloat(this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                myObj.columns[idx] -= spreadValue;
                myObj.columns[idx] = this.roundTo(myObj.columns[idx], 2);
            }
            else if (checkSum < 1) {
                myObj.columns[idx] += (1 - (checkSum % 1));
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
            const columnObj = createWidget({
                widgetType: 7,
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
AjfReportBuilderService.decorators = [
    { type: Injectable }
];
AjfReportBuilderService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFNUM7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFpT2xDOzs7O09BSUc7SUFDSCxZQUFvRCxhQUErQjtRQS9OM0UseUJBQW9CLEdBQ3hCLElBQUksT0FBTyxFQUE2QixDQUFDO1FBUXJDLGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7UUFRdkQsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFFbEUsZUFBVSxHQUE4QixJ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Y2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZGb3JtLCBBamZOb2RlLCBBamZOb2RlVHlwZSwgZmxhdHRlbk5vZGVzfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uLFxuICBBamZDaGFydFdpZGdldCxcbiAgQWpmQ29sdW1uV2lkZ2V0LFxuICBBamZDdXN0b21XaWRnZXQsXG4gIEFqZkRhdGFXaWRnZXQsXG4gIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsXG4gIEFqZlJlcG9ydCxcbiAgQWpmUmVwb3J0Q29udGFpbmVyLFxuICBBamZTdHlsZXMsXG4gIEFqZlRhYmxlV2lkZ2V0LFxuICBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsXG4gIEFqZldpZGdldFR5cGUsXG4gIGNyZWF0ZUFnZ3JlZ2F0aW9uLFxuICBjcmVhdGVXaWRnZXRcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNvbWJpbmVMYXRlc3QsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwdWJsaXNoUmVwbGF5LFxuICByZWZDb3VudCxcbiAgc2NhbixcbiAgc2hhcmUsXG4gIHN0YXJ0V2l0aFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlcywgQWpmUmVwb3J0SWNvbnMsIEFqZlJlcG9ydHNDb25maWcsIEFqZldpZGdldHNDb250YWluZXJ9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkNvbG9yT3BlcmF0aW9uLFxuICBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uLFxuICBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uLFxuICBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbixcbiAgQWpmU3R5bGVzT3BlcmF0aW9uLFxuICBBamZXaWRnZXRPcGVyYXRpb24sXG4gIEFqZldpZGdldHNPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcbmltcG9ydCB7QUpGX1JFUE9SVFNfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIGFsbCB0aGUgbG9naWMgdG8gbW9kZWwgdGhlIHJlcG9ydCB3aWRnZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2Uge1xuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXN0b21XaWRnZXRzIG9ialxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHM6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+O1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBuYW1lIG9mIHRoZSBzZWN0aW9uIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnQgd2lkZ2V0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29yaWdpbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBwcml2YXRlIF9vcmlnaW5VcGRhdGU6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGV4cG9ydGVkIGpzb25cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlZFJlcG9ydDogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+O1xuICBwcml2YXRlIF9zYXZlZFJlcG9ydFVwZGF0ZTogU3ViamVjdDxBamZSZXBvcnQ+ID0gbmV3IFN1YmplY3Q8QWpmUmVwb3J0PigpO1xuXG4gIHByaXZhdGUgX2pzb25TdGFjazogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcblxuICBwcml2YXRlIF9sYXN0RGVsZXRlZEpzb246IHN0cmluZ3x1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfZW1wdHlDb250ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdnZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uRHJhZ2dlZFVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICBwcml2YXRlIF9vbk92ZXI6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uT3ZlclVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIHN0YXR1cyBvZiBwZXJtYW5lbnQgem9vbVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2ZpeGVkWm9vbTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfZml4ZWRab29tVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdFbnRlcjogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclVwZGF0ZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBoZWFkZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBoZWFkZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBjb250ZW50IHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjb250ZW50IHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG5cbiAgcHJpdmF0ZSBfY29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBwcml2YXRlIF9jb2xvclVwZGF0ZTogU3ViamVjdDxBamZDb2xvck9wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZDb2xvck9wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbG9yOiBzdHJpbmdbXSA9IFtcbiAgICAncmdiYSgwLCAwLCAwLCAxKScsICAgICAgICdyZ2JhKDUxLCAxNTMsIDI1NSwgMSknLCAgJ3JnYmEoMTUzLCAyMDQsIDAsIDEpJyxcbiAgICAncmdiYSgyNTUsIDEwMiwgMCwgMSknLCAgICdyZ2JhKDAsIDIwNCwgMjA0LCAxKScsICAgJ3JnYmEoMjA0LCAyMDQsIDE1MywgMSknLFxuICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsICAgJ3JnYmEoMjMwLCAwLCAwLCAxKScsICAgICAncmdiYSgyNTUsIDE1MywgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjU1LCAwLCAxKScsICAgJ3JnYmEoMCwgMTM4LCAwLCAxKScsICAgICAncmdiYSgwLCAxMDIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDE1MywgNTEsIDI1NSwgMSknLCAgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLCAncmdiYSgyNTAsIDIwNCwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyMzUsIDIwNCwgMSknLCAncmdiYSgyNTUsIDI1NSwgMjA0LCAxKScsICdyZ2JhKDIwNCwgMjMyLCAyMDQsIDEpJyxcbiAgICAncmdiYSgyMDQsIDIyNCwgMjQ1LCAxKScsICdyZ2JhKDIzNSwgMjE0LCAyNTUsIDEpJywgJ3JnYmEoMTg3LCAxODcsIDE4NywgMSknLFxuICAgICdyZ2JhKDI0MCwgMTAyLCAxMDIsIDEpJywgJ3JnYmEoMjU1LCAxOTQsIDEwMiwgMSknLCAncmdiYSgyNTUsIDI1NSwgMTAyLCAxKScsXG4gICAgJ3JnYmEoMTAyLCAxODUsIDEwMiwgMSknLCAncmdiYSgxMDIsIDE2MywgMjI0LCAxKScsICdyZ2JhKDE5NCwgMTMzLCAyNTUsIDEpJyxcbiAgICAncmdiYSgxMzYsIDEzNiwgMTM2LCAxKScsICdyZ2JhKDE2MSwgMCwgMCwgMSknLCAgICAgJ3JnYmEoMTc4LCAxMDcsIDAsIDEpJyxcbiAgICAncmdiYSgxNzgsIDE3OCwgMCwgMSknLCAgICdyZ2JhKDAsIDk3LCAwLCAxKScsICAgICAgJ3JnYmEoMCwgNzEsIDE3OCwgMSknLFxuICAgICdyZ2JhKDEwNywgMzYsIDE3OCwgMSknLCAgJ3JnYmEoNjgsIDY4LCA2OCwgMSknLCAgICAncmdiYSg5MiwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDEwMiwgNjEsIDAsIDEpJywgICAgJ3JnYmEoMTAyLCAxMDIsIDAsIDEpJywgICAncmdiYSgwLCA1NSwgMCwgMSknLFxuICAgICdyZ2JhKDAsIDQxLCAxMDIsIDEpJywgICAgJ3JnYmEoNjEsIDIwLCAxMDIsIDEpJ1xuICBdO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1cnJlbnQgd2lkZ2V0IHdoaWNoIGhvbGRzIHRoZSBmb2N1cy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0OiBPYnNlcnZhYmxlPEFqZldpZGdldHxudWxsPjtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbnxudWxsPihudWxsKTtcblxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IHVwZGF0ZSBleHBvcnQgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCBjb250YWlucyB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydDogQmVoYXZpb3JTdWJqZWN0PEFqZlJlcG9ydHxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0fG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIHN0eWxlcyBvZiByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlc1VwZGF0ZTogU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBmb3JtcyBmZXRjaGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0Rm9ybXM6IE9ic2VydmFibGU8QWpmRm9ybVtdPjtcbiAgcHJpdmF0ZSBfcmVwb3J0Rm9ybXNVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBkaWN0aW9uYXJ5IGZvciAgd2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZXM6IGFueSA9IHtcbiAgICBoZWFkZXI6IHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsXG4gICAgY29udGVudDogdGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsXG4gICAgZm9vdGVyOiB0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbG9yOiB0aGlzLl9jb2xvclVwZGF0ZSxcbiAgICBjdXN0b21XaWRnZXRzOiB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlXG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiB3b250IHRvIHNhdmUgcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydEV2ZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZUZvcm11bGFUT0h0bWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0Rm9ybXVsYVRvSHRtbEV2ZW50KCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiBjb2x1bW4gd2lkdGggY2hhbmdlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9pY29uU2V0czogQWpmUmVwb3J0SWNvbnMgPSB7J2FqZi1pY29uJzogW119O1xuICBnZXQgaWNvblNldHMoKTogQWpmUmVwb3J0SWNvbnMge1xuICAgIHJldHVybiB0aGlzLl9pY29uU2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1JFUE9SVFNfQ09ORklHKSByZXBvcnRzQ29uZmlnOiBBamZSZXBvcnRzQ29uZmlnKSB7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG5cbiAgICBpZiAocmVwb3J0c0NvbmZpZyAhPSBudWxsKSB7XG4gICAgICBpZiAocmVwb3J0c0NvbmZpZy5pY29ucyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXRzID0gey4uLnRoaXMuX2ljb25TZXRzLCAuLi5yZXBvcnRzQ29uZmlnLmljb25zfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9vcmlnaW4gPSAoPE9ic2VydmFibGU8c3RyaW5nPj50aGlzLl9vcmlnaW5VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKCdoZWFkZXInKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9zYXZlZFJlcG9ydCA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnQ+PnRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlKS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uRHJhZ2dlZFVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX29uT3ZlciA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9vbk92ZXJVcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9maXhlZFpvb20gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZml4ZWRab29tVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25EcmFnRW50ZXIgPSB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzID0gKDxPYnNlcnZhYmxlPEFqZlN0eWxlc09wZXJhdGlvbj4+dGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChzdHlsZXM6IEFqZlN0eWxlcywgb3A6IEFqZlN0eWxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA8QWpmU3R5bGVzPnt9KSwgc2hhcmUoKSwgc3RhcnRXaXRoKDxBamZTdHlsZXM+e30pKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChmb3JtczogQWpmRm9ybVtdLCBvcDogQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChmb3Jtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2N1c3RvbVdpZGdldHMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdLCBvcDogQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fZm9ybXNWYXJpYWJsZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24+PnRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9oZWFkZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlcyA9IHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXMgPSB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mb290ZXJTdHlsZXMgPSB0aGlzLl9mb290ZXJXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9jb2xvciA9ICg8T2JzZXJ2YWJsZTxBamZDb2xvck9wZXJhdGlvbj4+dGhpcy5fY29sb3JVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2NhbigoY29sb3I6IHN0cmluZ1tdLCBvcDogQWpmQ29sb3JPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5fZGVmYXVsdENvbG9yKSwgc2hhcmUoKSwgc3RhcnRXaXRoKHRoaXMuX2RlZmF1bHRDb2xvcikpO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldCA9IHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUucGlwZShcbiAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgbWFwKHMgPT4gcyEpLFxuICAgICAgICBzY2FuKFxuICAgICAgICAgICAgKHdpZGdldDogQWpmV2lkZ2V0fG51bGwsIG9wOiBBamZXaWRnZXRPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVsbCBhcyB1bmtub3duIGFzIEFqZldpZGdldCksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zXG4gICAgICAgIC5waXBlKGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLCBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1xuICAgICAgICAucGlwZShmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSwgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpO1xuXG4gICAgY29uc3QgcmVwb3J0T2JzID0gdGhpcy5fcmVwb3J0O1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9jb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBDb2xvcnM6IHN0cmluZ1tdID0gdGhpcy5fZGVmYXVsdENvbG9yO1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICBpZiAoci5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuY29udGVudC5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyLmZvb3Rlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmZvb3Rlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyLmhlYWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmhlYWRlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgci5oZWFkZXIuY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHIuaGVhZGVyLmNvbnRlbnRbaV07XG4gICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iob2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXRPYmogPSBvYmogYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheW91dE9iai5jb250ZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbk9iaiA9IGxheW91dE9iai5jb250ZW50W2pdIGFzIEFqZkNvbHVtbldpZGdldDtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3IoY29sdW1uT2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBjb2x1bW5PYmouY29udGVudC5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldE9iaiA9IGNvbHVtbk9iai5jb250ZW50W3pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHdpZGdldE9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDxzdHJpbmdbXT50ZW1wQ29sb3JzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbG9yVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLnN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnt9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+ci5zdHlsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmhlYWRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmhlYWRlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5oZWFkZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuY29udGVudC5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5jb250ZW50LnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmZvb3RlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmZvb3Rlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5mb290ZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0LnBpcGUobWFwKChqc29uOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiAoX3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGlmIChqc29uID0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnJlcG9ydCwgdGhpcy5yZXBvcnRGb3JtcyksXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRTdHlsZXMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAuc3Vic2NyaWJlKHIgPT4ge1xuICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgIC8vIGNvbnN0IGN1clJvID0gclswXVsxXTtcbiAgICAgICAgICAvLyBjb25zdCBmb3JtcyA9IHJbMF1bMl0gIT0gbnVsbCA/IHJbMF1bMl0gfHwgW11cbiAgICAgICAgICAvLyAgICAgOiAoY3VyUm8gIT0gbnVsbCA/IGN1clJvLmZvcm1zIHx8IFtdIDogW10pO1xuXG4gICAgICAgICAgY29uc3QgW2hjbywgY2NvLCBmY29dID0gW3JbMV0sIHJbMl0sIHJbM11dIGFzIEFqZldpZGdldHNDb250YWluZXJbXTtcblxuICAgICAgICAgIG9iai5oZWFkZXIgPSB7Y29udGVudDogaGNvLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IGhjby5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouY29udGVudCA9IHtjb250ZW50OiBjY28ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogY2NvLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5mb290ZXIgPSB7Y29udGVudDogZmNvLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IGZjby5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouc3R5bGVzID0gcls0XTtcblxuICAgICAgICAgIGNvbnN0IHJvID0ge1xuICAgICAgICAgICAgaGVhZGVyOiB7Y29udGVudDogaGNvLndpZGdldHMsIHN0eWxlczogaGNvLnN0eWxlc30sXG4gICAgICAgICAgICBjb250ZW50OiB7Y29udGVudDogY2NvLndpZGdldHMsIHN0eWxlczogY2NvLnN0eWxlc30sXG4gICAgICAgICAgICBmb290ZXI6IHtjb250ZW50OiBmY28ud2lkZ2V0cywgc3R5bGVzOiBmY28uc3R5bGVzfSxcbiAgICAgICAgICAgIHN0eWxlczogcls0XVxuICAgICAgICAgIH0gYXMgQWpmUmVwb3J0O1xuXG4gICAgICAgICAgdGhpcy5zZXRTYXZlUmVwb3J0KG9iaik7XG4gICAgICAgICAgdGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUubmV4dChybyk7XG4gICAgICAgICAgdGhpcy5wdXNoSnNvblN0YWNrKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogcmVtb3ZlIEFqZk5vZGVHcm91cCwgQWpmU2xpZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTdHJpbmdGaWVsZCBmcm9tIGFqZm5vZGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZmlsdGVyTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlIHx8XG4gICAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkICYmXG4gICAgICAgICAgIChub2RlIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TdHJpbmcpKSB7XG4gICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwYXJzZUNvbG9yKGNzc1N0eWxlczogYW55LCBjb2xvcnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVLZXlzID0gWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JhY2tncm91bmRDb2xvcicsICdjb2xvciddO1xuICAgIHN0eWxlS2V5cy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoY3NzU3R5bGVzW2tdICYmIGNvbG9ycy5pbmRleE9mKGNzc1N0eWxlc1trXSkgPT0gLTEpIHtcbiAgICAgICAgY29sb3JzLnB1c2goY3NzU3R5bGVzW2tdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgbGV0IHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyaWFibGVzW2ldID0ge25vZGVzOiBbXSwgbGFiZWxzOiBbXSwgbmFtZXM6IFtdLCB0eXBlczogW119O1xuXG4gICAgICBpZiAoZm9ybXNbaV0ubm9kZXMgIT0gbnVsbCAmJiBmb3Jtc1tpXS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhcmlhYmxlc1tpXS5ub2RlcyA9IHRoaXMuZmlsdGVyTm9kZXMoZmxhdHRlbk5vZGVzKGZvcm1zW2ldLm5vZGVzKSk7XG4gICAgICB9XG4gICAgICB2YXJpYWJsZXNbaV0ubGFiZWxzID0gdGhpcy5leHRyYWN0TGFiZWxzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS5uYW1lcyA9IHRoaXMuZXh0cmFjdE5hbWVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS50eXBlcyA9IHRoaXMuZXh0cmFjdFR5cGVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhYmxlcztcbiAgfVxuICAvKipcbiAgICogdXRpbHM6XG4gICAqICB0aGUgb2JqIHJldHVybmVkIGNvbnRhaW5zIHRoZSBsYWJlbCBmaWVsZCBvZiBhamZOb2RlXG4gICAqIEBwYXJhbSBub2Rlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGV4dHJhY3RMYWJlbHNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLmxhYmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGV4dHJhY3ROYW1lc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZXh0cmFjdFR5cGVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogQWpmRmllbGRUeXBlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcDogQWpmRmllbGQgPSA8QWpmRmllbGQ+bm9kZXNbaV07XG4gICAgICBvYmoucHVzaChwLmZpZWxkVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzZXRPcmlnaW4ob3JpZ2luOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vcmlnaW5VcGRhdGUubmV4dChvcmlnaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIG1ldGhvZCByb3VuZCB0aGUgdmFsdWUgdG8gdGhlIGRlY2ltYWwgcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEBwYXJhbSBkZWNpbWFscG9zaXRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcm91bmRUbyh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsUG9zaXRpb25zOiBudW1iZXIpIHtcbiAgICBsZXQgaSA9IHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuXG4gICAgaSA9IE1hdGguZmxvb3IoaSk7XG5cbiAgICByZXR1cm4gaSAvIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyB2YWxpZGF0b3IgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpc051bWJlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eXFxkKyhcXC5cXGQrKT8vLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgaXNOdW1iZXJBcnJheSh2YWx1ZTogYW55W10pOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOdW1iZXIodmFsdWVbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdnZWQgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnZ2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ2dlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uT3ZlciBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbk92ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25PdmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZml4ZWRab29tIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZpeGVkWm9vbSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRab29tO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbUluKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21PdXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnRW50ZXIgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnRW50ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnRW50ZXI7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnRW50ZXIgd2l0aCAgc2VjdGlvbihoZWFkZXIsY29udGVudCxmb290ZXIpIGFuZCBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdFbnRlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7YXJyYXksIGluZGV4fSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25kcmFnZ2VkIHdpdGggdHJ1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cblxuICBkcmFnRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25PdmVyIHdpdGggdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIF9vbk92ZXIgd2l0aCBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBlbWl0IHNhdmUgcmVwb3J0IGV2ZW50XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2F2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5fc2F2ZVJlcG9ydEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZUltYWdlRm9ybXVsYShmb3JtdWxhOiBBamZGb3JtdWxhKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBjb25zdCB3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgdy5mbGFnID0gZm9ybXVsYTtcbiAgICAgIHcuaWNvbiA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gdztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhVG9IdG1sKGh0bWxGb3JtdWxhOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHsnZm9ybXVsYSc6IGh0bWxGb3JtdWxhLCAncmVmZXJlbmNlJzogcmVmZXJlbmNlfTtcbiAgICAgIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmVtaXQob2JqKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbXB0eUNvbnRlbnQodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZW1wdHlDb250ZW50Lm5leHQodmFsKTtcbiAgfVxuXG5cbiAgcHVzaEpzb25TdGFjayhqc29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmluZGV4T2YoanNvbikgPT09IC0xICYmIGpzb24gIT09IHRoaXMuX2xhc3REZWxldGVkSnNvbikge1xuICAgICAgY3VycmVudFN0YWNrLnB1c2goanNvbik7XG4gICAgfVxuXG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcbiAgfVxuXG4gIHBvcEpzb25TdGFjaygpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgICBsZXQgZW1wdHlKc29uID0gJ3tcImhlYWRlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSwnICtcbiAgICAgICAgJ1wiY29udGVudFwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcIicgK1xuICAgICAgICAnZm9vdGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwic3R5bGVzXCI6e319JztcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG4gICAgY3VycmVudFN0YWNrLnBvcCgpO1xuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9IGN1cnJlbnRTdGFjay5wb3AoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2subGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuICAgICAgdGhpcy5fanNvblN0YWNrLm5leHQoW10pO1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQodHJ1ZSk7XG4gICAgICByZXR1cm4gZW1wdHlKc29uO1xuICAgIH1cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REZWxldGVkSnNvbjtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCB0aGUgZW1pdHRlclxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sdW1uV2lkdGhDaGFuZ2VkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9jdXN0b21XaWRnZXRzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1c3RvbVdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21XaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBDb250ZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29udGVudCBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sb3JzIG9mIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sb3JzKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cblxuICBnZXQgZW1wdHlDb250ZW50KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lbXB0eUNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUFycmF5V2lkZ2V0cyh0eXBlOiBzdHJpbmcsIG5ld1dpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcikge1xuICAgIGlmICgodHlwZSAhPT0gJ2hlYWRlcicpICYmICh0eXBlICE9PSAnY29udGVudCcpICYmICh0eXBlICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlICcgKyB0eXBlKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlc1t0eXBlXS5uZXh0KChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2Zvcm1zVmFyaWFibGVzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm1zVmFyaWFibGVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1zVmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbk5hbWVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbk5hbWVzO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXJyZW50V2lkZ2V0KCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBVcGRhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGUgd2l0aCBuZXdXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVDdXJyZW50V2lkZ2V0KG5ld1dpZGdldDogQWpmV2lkZ2V0fG51bGwpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKF93aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGdldFNhdmVSZXBvcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVJlcG9ydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2pzb25TYXZlZFJlcG9ydCBvYmVzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U2F2ZWQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZWRSZXBvcnQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydFN0eWxlcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0Rm9ybXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0Rm9ybXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtW10+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0Rm9ybXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBfb3JpZ2luIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9yaWdpbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXNzaWducyB0aGUgbmV3IHdpZHRoIHRvIHRoZSBpZHggY29sdW1uXG4gICAqIGFuZCByZWNhbGN1bGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBvZiB0aGUgbGF5b3V0LlxuICAgKiBUaGUgcmFuZ2UgdmFsdWUgYXJlIGZyb20gMCwxIHRvIDEuXG4gICAqXG4gICAqIFJVTEVTOlxuICAgKiBUaGUgbWluIHZhbHVlIGZvciBjb2x1bW4gaXMgMCwxLlxuICAgKiBUaGUgc3VtIG9mIGFsbCBjb2x1bW5zIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKiBUaGUgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZXMuXG4gICAqIElmIGlzIHByZXNlbnQgb25seSBvbmUgY29sdW1uIHRoZSB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICpcbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA+YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgZGVjcmVhc2VzLlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYDxgIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBpbmNyZWFzZXMuXG4gICAqXG4gICAqIFdoZW4gdmFsdWVzIOKAi+KAi2FyZSBwZXJpb2RpYywgcm91bmRpbmcgYXNzaWducyB0aGUgZ2FwIHRvIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKiBGb3IgZXhhbXBsZTogMyBjb2x1bW5zIHdpdGggMCwzMyBiZWxpZXZlIDEgY29sdW1uIDAsMzQgYW5kIDIgY29sdW1ucyAwLDMzLlxuICAgKlxuICAgKiBAcGFyYW0gbmV3VmFsdWVcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGluc3RhbnRDb2x1bW5WYWx1ZShuZXdWYWx1ZTogbnVtYmVyLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGxldCBzaXplID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgIGxldCBzcHJlYWRWYWx1ZSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgbGV0IGlkeEZpcnN0Tm9PYmogPSAtMTtcblxuICAgICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kRmlyc3ROb09iaiA9IGZhbHNlO1xuXG4gICAgICBsZXQgcmUxID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldWzAtOV0kKScpO1xuICAgICAgbGV0IHJlMiA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XSQpJyk7XG4gICAgICBsZXQgcmUzID0gbmV3IFJlZ0V4cCgnXlsxXSQnKTtcblxuICAgICAgbGV0IG9sZFZhbHVlID0gbXlPYmouY29sdW1uc1tpZHhdO1xuXG4gICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8obmV3VmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHZhbHVlJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvbGRWYWx1ZSA9PSAtMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgICAgb2JqTnVtLS07XG4gICAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKHNpemUgLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMC4xO1xuICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSA8IDAuMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgIH1cblxuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IC0xKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbMF0gPSAxO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8IDAuMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMC4xO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlICsgMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSA+IDEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDEgLSAoMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkgJiYgKG9sZFZhbHVlID09PSAwLjEpKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlID4gbmV3VmFsdWUpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlIC0gbmV3VmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGQgPSBmYWxzZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChuZXdWYWx1ZSAtIG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzcHJlYWRWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3ByZWFkVmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgIGlmIChzcHJlYWRWYWx1ZSA8IDAuMDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoKGkgPT0gaWR4KSkge1xuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKChteU9iai5jb2x1bW5zW2ldID4gMC45KSAmJiAobXlPYmouY29sdW1ucy5sZW5ndGggLSBvYmpOdW0gIT0gMSkpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC45MDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA8IDAuMSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjEwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaV0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgc3VtICs9IG15T2JqLmNvbHVtbnNbaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhzdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaiA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWR4Rmlyc3ROb09iaiA9IGk7XG4gICAgICAgICAgICBmb3VuZEZpcnN0Tm9PYmogPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhGaXJzdE5vT2JqXSArPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gIT09IC0xICYmICFyZTEudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmXG4gICAgICAgICAgICAhcmUyLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJiAhcmUzLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSkge1xuICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKDAuMTAsIGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXIuZW1pdCgpO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGltYWdlVXJsIG9uIHRoZSBjdXJyZW50IEFqZkltYWdlV2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRJbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai51cmwgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ltYWdlVXJsfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouaWNvbiA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aWNvbn1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouZmxhZyA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7dmFsdWV9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKGNvbmRpdGlvblRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh3aWRnZXQudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIHdpZGdldC52aXNpYmlsaXR5LmNvbmRpdGlvbiA9IGNvbmRpdGlvblRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICAgIF9sYWJlbDogc3RyaW5nLCBfbGV2ZWw6IG51bWJlciwgX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlciwgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmIHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJvdyB0aGF0IGNvbnRhaW5zIG1haW4gZGF0YSBpcyBkZWZpbmVkXG4gICAgICAgIC8qIGlmICh3aWRnZXQuZGF0YXNldFswXSA9PSBudWxsKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZXZlbCA9PSAwICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PSAxICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleCArIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZVRhYmxlRm9ybXVsYShcbiAgICAgIF9sYWJlbDogc3RyaW5nLCBhZ2dyZWdhdGlvblR5cGU6IG51bWJlciwgZm9ybXVsYVRleHQ6IHN0cmluZywgX21haW5JbmRleDogbnVtYmVyLFxuICAgICAgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmVGFibGVXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgZGF0YXNldDogQWpmRGF0YXNldCA9IG5ldyBBamZEYXRhc2V0KCk7XG4gICAgICAgIC8vIGxldCByb3dEYXRhc2V0OiBBamZEYXRhc2V0W10gPSBbXTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLyogaWYgKG1haW5JbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdkYXRhc2V0JywgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkRhdGFXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAvKiBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB0eXBlIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRUeXBlKHR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgndHlwZScsIHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSAgaWR4IGVsZW1lbnQgb2YgeExhYmVscyBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlTWFpbkRhdGEoX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8vIG15T2JqLmRhdGFzZXRbMF0uc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKF9tYWluSWR4OiBudW1iZXIsIF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvKiBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JZHggKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbklkeCArIDFdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYmFja2dyb3VuZENvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBib3JkZXJDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCb3JkZXJDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBzZXRDaGFydEJvcmRlcldpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlcldpZHRoJywgdmFsdWUpO1xuICB9XG5cbiAgYWRkQ2hhcnRCb3JkZXJDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJvcmRlckNvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnQocmVwb3J0OiBBamZSZXBvcnQpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXBvcnQubmV4dChyZXBvcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNhdmVSZXBvcnQoanNvbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVJlcG9ydC5uZXh0KGpzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZm9udCBhdHRyaWJ1dGUgb24gdGhlIGN1cnJlbnQgQWpmV2lkZ2V0LlxuICAgKlxuICAgKiBUaGVyZSBpcyBhIGNoZWNrIG9uIGZvbnQtc2l6ZSBhdHRyaWJ1dGUsXG4gICAqIGlmIGlzIG5vIHNwZWNpZmljYXRlIHRoZSB0eXBlIG9mIHNpemUgZm9udCBzZXQgJ3B0JyBhcyBkZWZhdWx0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmVGV4dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGNvbnN0IHB4U3R5bGVzID1cbiAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdoZWlnaHQnLCAnd2lkdGgnLCAnYm9yZGVyLXdpZHRoJywgJ2JvcmRlci1yYWRpdXMnLCAncGFkZGluZycsICdtYXJnaW4nXTtcbiAgICAgIGNvbnN0IGlzUHhTdHlsZSA9IHB4U3R5bGVzLmluZGV4T2YobGFiZWwpID4gLTE7XG4gICAgICBpZiAoaXNQeFN0eWxlICYmICEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgKz0gJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAoaXNQeFN0eWxlICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5pc051bWJlckFycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IGAke3ZhbHVlLmpvaW4oJ3B4ICcpfXB4YDtcbiAgICAgIH1cblxuICAgICAgbXlPYmouc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgdXBkYXRlIHRoZSBzdHlsZXMgb2Ygb3JpZ2luIHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMob3JpZ2luOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9yaWdpbiAhPT0gJ2hlYWRlcicpICYmIChvcmlnaW4gIT09ICdjb250ZW50JykgJiYgKG9yaWdpbiAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuY2tub3cgb3JpZ2luICcgKyBvcmlnaW4pO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZXNbb3JpZ2luXS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHdpZGdldC5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHdpZGdldC5zdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi53aWRnZXQuc3R5bGVzfTtcblxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBzZXQgdGhlIHN0eWxlIG9mIHRoZSB3aG9sZSByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZS5uZXh0KChzdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICBpZiAoc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgc3R5bGVzID0ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZXNbbGFiZWxdID0gdmFsdWU7XG4gICAgICAgIHN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLnN0eWxlc307XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgZm9ybXNcbiAgICpcbiAgICogQHBhcmFtIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0Rm9ybXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIHRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlLm5leHQoKF9mb3JtOiBBamZGb3JtW10pOiBBamZGb3JtW10gPT4ge1xuICAgICAgcmV0dXJuIGZvcm1zIHx8IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDdXN0b21XaWRnZXRzKHdpZGdldDogQWpmQ3VzdG9tV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzID0gY3VzdG9tV2lkZ2V0cyB8fCBbXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlc2V0Q3VzdG9tV2lkZ2V0cygpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGxhYmVsIG9mIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY2hhbmdlTGFiZWxDdXN0b21XaWRnZXQobGFiZWw6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzW3Bvc2l0aW9uXS50eXBlID0gbGFiZWw7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9oZWFkZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRIZWFkZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfY29udGVudFdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbnRlbnRXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2Zvb3RlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZGZvb3RlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCBzcHJlYWRWYWx1ZTogYW55O1xuICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gdmFsdWU7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgc3ByZWFkVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gdGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb2x1bW4gb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBXaGVuIGFkZGluZyBhIGNvbHVtbiB0aGUgd2lkdGggb2YgdGhlIG90aGVyIGNvbHVtbnMgaXMgcmVjYWxjdWxhdGVkXG4gICAqIGJ5IGRpdmlkaW5nIGl0IGJ5IHRoZSBudW1iZXIgb2YgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IHRlbXBPYmo6IG51bWJlcltdID0gW107XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGggKyAxO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCB0bXBWYWx1ZTogYW55O1xuXG4gICAgICBpZiAobnVtID4gMTApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleGNlZWQgbWF4IGNvbHVtbnMnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPT09IC0xKSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2godmFsdWUpO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICB0bXBWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgdGVtcE9ialswXSAtPSB0bXBWYWx1ZTtcbiAgICAgICAgdGVtcE9ialswXSA9IHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIHRlbXBPYmpbMF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBteU9iai5jb2x1bW5zID0gdGVtcE9iajtcblxuICAgICAgLy8gVE9ETzogQHRyaWsgd2hhdCdzIHZhbHVlPyE/XG4gICAgICBjb25zdCBjb2x1bW5PYmogPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiA3LFxuICAgICAgICAvLyB2YWx1ZTogbXlPYmouY29sdW1uc1tteU9iai5jb2x1bW5zLmxlbmd0aCAtIDFdLFxuICAgICAgfSk7XG5cbiAgICAgIG15T2JqLmNvbnRlbnQucHVzaChjb2x1bW5PYmopO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVdpZGdldFRvQ29sdW1uKGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29sdW1uLmNvbnRlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmUgYSB3aWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKiB0aGUgcG9zaXRpb24gYXJyYXk6XG4gICAqXG4gICAqIGhlYWRlciAtYD5gIGhlYWRlcldpZGdldHNcbiAgICogY29udGVudCAtYD5gIGNvbnRlbnRXaWRnZXRzXG4gICAqIGZvb3RlciAtYD5gIGZvb3RlcldpZGdldHNcbiAgICogY29sdW1uIC1gPmAgY29sdW1uIG9mIGxheW91dFxuICAgKiBsYXlvdXRDb250ZW50IC1gPmAgY29udGVudCBvZiBsYXlvdXRcbiAgICogb2JqIC1gPmAgb2JqIG9mIGxheW91dFxuICAgKiBjdXN0b21XaWRnZXQgLWA+YCBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHggdGhlIHBvc2l0aW9uIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlKG5vZGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKG5vZGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgKG15T2JqLmNvbnRlbnRbMF0gYXMgQWpmQ29sdW1uV2lkZ2V0KS5jb250ZW50Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbHVtbic6XG4gICAgICBjYXNlICdsYXlvdXRDb250ZW50JzpcbiAgICAgIGNhc2UgJ3VuZml4ZWRDb2x1bW4nOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgICAgICBpZiAobm9kZSA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgICAgIGxldCBjbG0gPSA8QWpmQ29sdW1uV2lkZ2V0PndpZGdldDtcbiAgICAgICAgICAgIGNsbS5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ2xheW91dENvbnRlbnQnKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIGxlbmd0aCBpcyAwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IHJlbW92ZSBhbnkgd2lkZ2V0IGZyb20gZW1wdHkgY29udGVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPSBudWxsICYmIG15T2JqLmNvbnRlbnRbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ3VuZml4ZWRDb2x1bW4nKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9PSAtMSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gcG9zaXRpb24gdmFsdWUgIGlzbnQgLTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudW5maXhlZENvbHVtbihpZHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiAobm9kZSAhPT0gJ29iaicpIHtcbiAgICAgICAgICAvLyAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAvLyAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b21XaWRnZXRzJzoge1xuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgIH0gYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gbm9kZSAnICsgbm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCBhIEFqZldpZGdldCBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZFRvQ29udGVudChuZXdXaWRnZXQ6IEFqZldpZGdldCwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgaWYgKG15T2JqLmNvbnRlbnRbaWR4XSAhPSBudWxsKSB7XG4gICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDAsIG5ld1dpZGdldCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBhZGRUb0NvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgICAgbGV0IHdpZGdldDogQWpmV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEud2lkZ2V0O1xuICAgICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuXG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2god2lkZ2V0KTtcblxuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tKSB7XG4gICAgICB0aGlzLnJlbW92ZShldmVudC5kcmFnRGF0YS5hcnJheUZyb20sIGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleCk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2goZXZlbnQuZHJhZ0RhdGEud2lkZ2V0KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmpzb24pIHtcbiAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGV2ZW50LmRyYWdEYXRhLmpzb24pO1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvYmogPSB7J3dpZGdldFR5cGUnOiBBamZXaWRnZXRUeXBlW2V2ZW50LmRyYWdEYXRhXX07XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hhbmdlUG9zaXRpb25PbkNvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCB0b0luZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG4gICAgbGV0IGZyb21XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdO1xuICAgIGxldCB0b1dpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdO1xuXG4gICAgaWYgKGZyb21Db2x1bW4gPT0gdG9Db2x1bW4pIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdID0gdG9XaWRnZXQ7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF0gPSBmcm9tV2lkZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZSh0b0luZGV4LCAwLCBmcm9tV2lkZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIHRoZSBvYmogb24gdGhlIGlkeCBwb3NpdGlvbi5cbiAgICogT2JqIGhhdmUgYSBubyBzcGVjaWZpY2F0ZSB3aWR0aCBhbmQgaXMgbm90IGNhbGN1bGF0ZSBhcyBjb2x1bW5zXG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKC0xLCBpZHgpO1xuICB9XG5cbiAgY2hhbmdlQ29sdW1uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgbGF5b3V0V2lkZ2V0OiBBamZMYXlvdXRXaWRnZXQpIHtcbiAgICBpZiAodG8gPCAwIHx8IHRvID49IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZnJvbSA+IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCAtIDEgJiYgdG8gPiBmcm9tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV07XG4gICAgbGV0IGZyb21Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV07XG4gICAgbGV0IHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W3RvXTtcbiAgICBsZXQgdG9Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dO1xuXG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV0gPSB0b0NvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXSA9IHRvQ29sdW1uVmFsdWU7XG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dID0gZnJvbUNvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b10gPSBmcm9tQ29sdW1uVmFsdWU7XG5cbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobGF5b3V0V2lkZ2V0KTtcbiAgfVxuXG4gIGFkZEN1c3RvbUNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91cGRhdGVzWydjb2xvciddLm5leHQoKGNvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICBpZiAoY29sb3JzLmluZGV4T2YoY29sb3IpIDwgMCkge1xuICAgICAgICBjb2xvcnMucHVzaChjb2xvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3JzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkV2lkZ2V0VG9Db250YWluZXIoXG4gICAgICBzdWJqOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+LCB3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBzdWJqLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQod2lkZ2V0KTtcbiAgICB0aGlzLnNldEVtcHR5Q29udGVudChmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBhcnIgPSAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdIGFzIGFueVtdO1xuICAgICAgYXJyLnB1c2godmFsdWUpO1xuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IGFycjtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAoKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSBhcyBhbnlbXSkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG59XG4iXX0=