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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFNUM7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFpT2xDOzs7O09BSUc7SUFDSCxZQUFvRCxhQUErQjtRQS9OM0UseUJBQW9CLEdBQ3hCLElBQUksT0FBTyxFQUE2QixDQUFDO1FBUXJDLGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7UUFRdkQsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFFbEUsZUFBVSxHQUE4QixJ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QUF5QixDQUFDLFFBQWdCLEVBQUUsS0FBVTtRQUM1RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtZQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDQSxNQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGdDQUFnQyxDQUFDLFFBQWdCLEVBQUUsS0FBVTtRQUNuRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtZQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEdBQUcsR0FBSSxNQUFjLENBQUMsUUFBUSxDQUFVLENBQUM7WUFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNmLE1BQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDaEMsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8scUNBQXFDLENBQUMsUUFBZ0IsRUFBRSxHQUFXO1FBQ3pFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO1lBQ3RFLE1BQWMsQ0FBQyxRQUFRLENBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBdjlERixVQUFVOzs7NENBdU9JLFFBQVEsWUFBSSxNQUFNLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZkZvcm0sIEFqZk5vZGUsIEFqZk5vZGVUeXBlLCBmbGF0dGVuTm9kZXN9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb24sXG4gIEFqZkNoYXJ0V2lkZ2V0LFxuICBBamZDb2x1bW5XaWRnZXQsXG4gIEFqZkN1c3RvbVdpZGdldCxcbiAgQWpmRGF0YVdpZGdldCxcbiAgQWpmSW1hZ2VXaWRnZXQsXG4gIEFqZkxheW91dFdpZGdldCxcbiAgQWpmUmVwb3J0LFxuICBBamZSZXBvcnRDb250YWluZXIsXG4gIEFqZlN0eWxlcyxcbiAgQWpmVGFibGVXaWRnZXQsXG4gIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZSxcbiAgY3JlYXRlQWdncmVnYXRpb24sXG4gIGNyZWF0ZVdpZGdldFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzLCBBamZSZXBvcnRJY29ucywgQWpmUmVwb3J0c0NvbmZpZywgQWpmV2lkZ2V0c0NvbnRhaW5lcn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ29sb3JPcGVyYXRpb24sXG4gIEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24sXG4gIEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24sXG4gIEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uLFxuICBBamZTdHlsZXNPcGVyYXRpb24sXG4gIEFqZldpZGdldE9wZXJhdGlvbixcbiAgQWpmV2lkZ2V0c09wZXJhdGlvblxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuaW1wb3J0IHtBSkZfUkVQT1JUU19DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgY29udGFpbnMgYWxsIHRoZSBsb2dpYyB0byBtb2RlbCB0aGUgcmVwb3J0IHdpZGdldC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyU2VydmljZSB7XG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1c3RvbVdpZGdldHMgb2JqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT47XG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudCB3aWRnZXQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb3JpZ2luOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX29yaWdpblVwZGF0ZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZXhwb3J0ZWQganNvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0OiBPYnNlcnZhYmxlPEFqZlJlcG9ydD47XG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0VXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydD4gPSBuZXcgU3ViamVjdDxBamZSZXBvcnQ+KCk7XG5cbiAgcHJpdmF0ZSBfanNvblN0YWNrOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIHByaXZhdGUgX2xhc3REZWxldGVkSnNvbjogc3RyaW5nfHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9lbXB0eUNvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ2dlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIHByaXZhdGUgX29uT3ZlcjogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25PdmVyVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHBlcm1hbmVudCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZml4ZWRab29tOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9maXhlZFpvb21VcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ0VudGVyOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgX29uRHJhZ0VudGVyVXBkYXRlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGhlYWRlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGhlYWRlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGNvbnRlbnQgd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGNvbnRlbnQgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cblxuICBwcml2YXRlIF9jb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHByaXZhdGUgX2NvbG9yVXBkYXRlOiBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9kZWZhdWx0Q29sb3I6IHN0cmluZ1tdID0gW1xuICAgICdyZ2JhKDAsIDAsIDAsIDEpJywgICAgICAgJ3JnYmEoNTEsIDE1MywgMjU1LCAxKScsICAncmdiYSgxNTMsIDIwNCwgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTAyLCAwLCAxKScsICAgJ3JnYmEoMCwgMjA0LCAyMDQsIDEpJywgICAncmdiYSgyMDQsIDIwNCwgMTUzLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJywgICAncmdiYSgyMzAsIDAsIDAsIDEpJywgICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyNTUsIDAsIDEpJywgICAncmdiYSgwLCAxMzgsIDAsIDEpJywgICAgICdyZ2JhKDAsIDEwMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMTUzLCA1MSwgMjU1LCAxKScsICAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsICdyZ2JhKDI1MCwgMjA0LCAyMDQsIDEpJyxcbiAgICAncmdiYSgyNTUsIDIzNSwgMjA0LCAxKScsICdyZ2JhKDI1NSwgMjU1LCAyMDQsIDEpJywgJ3JnYmEoMjA0LCAyMzIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDIwNCwgMjI0LCAyNDUsIDEpJywgJ3JnYmEoMjM1LCAyMTQsIDI1NSwgMSknLCAncmdiYSgxODcsIDE4NywgMTg3LCAxKScsXG4gICAgJ3JnYmEoMjQwLCAxMDIsIDEwMiwgMSknLCAncmdiYSgyNTUsIDE5NCwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAxMDIsIDEpJyxcbiAgICAncmdiYSgxMDIsIDE4NSwgMTAyLCAxKScsICdyZ2JhKDEwMiwgMTYzLCAyMjQsIDEpJywgJ3JnYmEoMTk0LCAxMzMsIDI1NSwgMSknLFxuICAgICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEpJywgJ3JnYmEoMTYxLCAwLCAwLCAxKScsICAgICAncmdiYSgxNzgsIDEwNywgMCwgMSknLFxuICAgICdyZ2JhKDE3OCwgMTc4LCAwLCAxKScsICAgJ3JnYmEoMCwgOTcsIDAsIDEpJywgICAgICAncmdiYSgwLCA3MSwgMTc4LCAxKScsXG4gICAgJ3JnYmEoMTA3LCAzNiwgMTc4LCAxKScsICAncmdiYSg2OCwgNjgsIDY4LCAxKScsICAgICdyZ2JhKDkyLCAwLCAwLCAxKScsXG4gICAgJ3JnYmEoMTAyLCA2MSwgMCwgMSknLCAgICAncmdiYSgxMDIsIDEwMiwgMCwgMSknLCAgICdyZ2JhKDAsIDU1LCAwLCAxKScsXG4gICAgJ3JnYmEoMCwgNDEsIDEwMiwgMSknLCAgICAncmdiYSg2MSwgMjAsIDEwMiwgMSknXG4gIF07XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VycmVudCB3aWRnZXQgd2hpY2ggaG9sZHMgdGhlIGZvY3VzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXQ6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+O1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgdXBkYXRlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IGNvbnRhaW5zIHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0fG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnR8bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3R5bGVzIG9mIHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzVXBkYXRlOiBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGZvcm1zIGZldGNoZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRGb3JtczogT2JzZXJ2YWJsZTxBamZGb3JtW10+O1xuICBwcml2YXRlIF9yZXBvcnRGb3Jtc1VwZGF0ZTogU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIGRpY3Rpb25hcnkgZm9yICB3aWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlczogYW55ID0ge1xuICAgIGhlYWRlcjogdGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb250ZW50OiB0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSxcbiAgICBmb290ZXI6IHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsXG4gICAgY29sb3I6IHRoaXMuX2NvbG9yVXBkYXRlLFxuICAgIGN1c3RvbVdpZGdldHM6IHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGVcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIHdvbnQgdG8gc2F2ZSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0RXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9zYXZlRm9ybXVsYVRPSHRtbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZXRGb3JtdWxhVG9IdG1sRXZlbnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiBjb2x1bW4gd2lkdGggY2hhbmdlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9pY29uU2V0czogQWpmUmVwb3J0SWNvbnMgPSB7J2FqZi1pY29uJzogW119O1xuICBnZXQgaWNvblNldHMoKTogQWpmUmVwb3J0SWNvbnMge1xuICAgIHJldHVybiB0aGlzLl9pY29uU2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1JFUE9SVFNfQ09ORklHKSByZXBvcnRzQ29uZmlnOiBBamZSZXBvcnRzQ29uZmlnKSB7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG5cbiAgICBpZiAocmVwb3J0c0NvbmZpZyAhPSBudWxsKSB7XG4gICAgICBpZiAocmVwb3J0c0NvbmZpZy5pY29ucyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXRzID0gey4uLnRoaXMuX2ljb25TZXRzLCAuLi5yZXBvcnRzQ29uZmlnLmljb25zfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9vcmlnaW4gPSAoPE9ic2VydmFibGU8c3RyaW5nPj50aGlzLl9vcmlnaW5VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKCdoZWFkZXInKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9zYXZlZFJlcG9ydCA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnQ+PnRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlKS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uRHJhZ2dlZFVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX29uT3ZlciA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9vbk92ZXJVcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9maXhlZFpvb20gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZml4ZWRab29tVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25EcmFnRW50ZXIgPSB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzID0gKDxPYnNlcnZhYmxlPEFqZlN0eWxlc09wZXJhdGlvbj4+dGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChzdHlsZXM6IEFqZlN0eWxlcywgb3A6IEFqZlN0eWxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA8QWpmU3R5bGVzPnt9KSwgc2hhcmUoKSwgc3RhcnRXaXRoKDxBamZTdHlsZXM+e30pKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChmb3JtczogQWpmRm9ybVtdLCBvcDogQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChmb3Jtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2N1c3RvbVdpZGdldHMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdLCBvcDogQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fZm9ybXNWYXJpYWJsZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24+PnRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9oZWFkZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlcyA9IHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXMgPSB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mb290ZXJTdHlsZXMgPSB0aGlzLl9mb290ZXJXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9jb2xvciA9ICg8T2JzZXJ2YWJsZTxBamZDb2xvck9wZXJhdGlvbj4+dGhpcy5fY29sb3JVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2NhbigoY29sb3I6IHN0cmluZ1tdLCBvcDogQWpmQ29sb3JPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5fZGVmYXVsdENvbG9yKSwgc2hhcmUoKSwgc3RhcnRXaXRoKHRoaXMuX2RlZmF1bHRDb2xvcikpO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldCA9IHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUucGlwZShcbiAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgbWFwKHMgPT4gcyEpLFxuICAgICAgICBzY2FuKFxuICAgICAgICAgICAgKHdpZGdldDogQWpmV2lkZ2V0fG51bGwsIG9wOiBBamZXaWRnZXRPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVsbCBhcyB1bmtub3duIGFzIEFqZldpZGdldCksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zXG4gICAgICAgIC5waXBlKGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLCBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1xuICAgICAgICAucGlwZShmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSwgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpO1xuXG4gICAgY29uc3QgcmVwb3J0T2JzID0gdGhpcy5fcmVwb3J0O1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9jb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBDb2xvcnM6IHN0cmluZ1tdID0gdGhpcy5fZGVmYXVsdENvbG9yO1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICBpZiAoci5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuY29udGVudC5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyLmZvb3Rlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmZvb3Rlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyLmhlYWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmhlYWRlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgci5oZWFkZXIuY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHIuaGVhZGVyLmNvbnRlbnRbaV07XG4gICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iob2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXRPYmogPSBvYmogYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheW91dE9iai5jb250ZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbk9iaiA9IGxheW91dE9iai5jb250ZW50W2pdIGFzIEFqZkNvbHVtbldpZGdldDtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3IoY29sdW1uT2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBjb2x1bW5PYmouY29udGVudC5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldE9iaiA9IGNvbHVtbk9iai5jb250ZW50W3pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHdpZGdldE9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDxzdHJpbmdbXT50ZW1wQ29sb3JzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbG9yVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLnN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnt9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+ci5zdHlsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmhlYWRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmhlYWRlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5oZWFkZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuY29udGVudC5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5jb250ZW50LnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmZvb3RlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmZvb3Rlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5mb290ZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0LnBpcGUobWFwKChqc29uOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiAoX3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGlmIChqc29uID0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnJlcG9ydCwgdGhpcy5yZXBvcnRGb3JtcyksXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRTdHlsZXMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAuc3Vic2NyaWJlKHIgPT4ge1xuICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgIC8vIGNvbnN0IGN1clJvID0gclswXVsxXTtcbiAgICAgICAgICAvLyBjb25zdCBmb3JtcyA9IHJbMF1bMl0gIT0gbnVsbCA/IHJbMF1bMl0gfHwgW11cbiAgICAgICAgICAvLyAgICAgOiAoY3VyUm8gIT0gbnVsbCA/IGN1clJvLmZvcm1zIHx8IFtdIDogW10pO1xuXG4gICAgICAgICAgY29uc3QgW2hjbywgY2NvLCBmY29dID0gW3JbMV0sIHJbMl0sIHJbM11dIGFzIEFqZldpZGdldHNDb250YWluZXJbXTtcblxuICAgICAgICAgIG9iai5oZWFkZXIgPSB7Y29udGVudDogaGNvLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IGhjby5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouY29udGVudCA9IHtjb250ZW50OiBjY28ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogY2NvLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5mb290ZXIgPSB7Y29udGVudDogZmNvLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IGZjby5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouc3R5bGVzID0gcls0XTtcblxuICAgICAgICAgIGNvbnN0IHJvID0ge1xuICAgICAgICAgICAgaGVhZGVyOiB7Y29udGVudDogaGNvLndpZGdldHMsIHN0eWxlczogaGNvLnN0eWxlc30sXG4gICAgICAgICAgICBjb250ZW50OiB7Y29udGVudDogY2NvLndpZGdldHMsIHN0eWxlczogY2NvLnN0eWxlc30sXG4gICAgICAgICAgICBmb290ZXI6IHtjb250ZW50OiBmY28ud2lkZ2V0cywgc3R5bGVzOiBmY28uc3R5bGVzfSxcbiAgICAgICAgICAgIHN0eWxlczogcls0XVxuICAgICAgICAgIH0gYXMgQWpmUmVwb3J0O1xuXG4gICAgICAgICAgdGhpcy5zZXRTYXZlUmVwb3J0KG9iaik7XG4gICAgICAgICAgdGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUubmV4dChybyk7XG4gICAgICAgICAgdGhpcy5wdXNoSnNvblN0YWNrKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogcmVtb3ZlIEFqZk5vZGVHcm91cCwgQWpmU2xpZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTdHJpbmdGaWVsZCBmcm9tIGFqZm5vZGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZmlsdGVyTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlIHx8XG4gICAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkICYmXG4gICAgICAgICAgIChub2RlIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TdHJpbmcpKSB7XG4gICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwYXJzZUNvbG9yKGNzc1N0eWxlczogYW55LCBjb2xvcnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVLZXlzID0gWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JhY2tncm91bmRDb2xvcicsICdjb2xvciddO1xuICAgIHN0eWxlS2V5cy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoY3NzU3R5bGVzW2tdICYmIGNvbG9ycy5pbmRleE9mKGNzc1N0eWxlc1trXSkgPT0gLTEpIHtcbiAgICAgICAgY29sb3JzLnB1c2goY3NzU3R5bGVzW2tdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgbGV0IHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyaWFibGVzW2ldID0ge25vZGVzOiBbXSwgbGFiZWxzOiBbXSwgbmFtZXM6IFtdLCB0eXBlczogW119O1xuXG4gICAgICBpZiAoZm9ybXNbaV0ubm9kZXMgIT0gbnVsbCAmJiBmb3Jtc1tpXS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhcmlhYmxlc1tpXS5ub2RlcyA9IHRoaXMuZmlsdGVyTm9kZXMoZmxhdHRlbk5vZGVzKGZvcm1zW2ldLm5vZGVzKSk7XG4gICAgICB9XG4gICAgICB2YXJpYWJsZXNbaV0ubGFiZWxzID0gdGhpcy5leHRyYWN0TGFiZWxzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS5uYW1lcyA9IHRoaXMuZXh0cmFjdE5hbWVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS50eXBlcyA9IHRoaXMuZXh0cmFjdFR5cGVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhYmxlcztcbiAgfVxuICAvKipcbiAgICogdXRpbHM6XG4gICAqICB0aGUgb2JqIHJldHVybmVkIGNvbnRhaW5zIHRoZSBsYWJlbCBmaWVsZCBvZiBhamZOb2RlXG4gICAqIEBwYXJhbSBub2Rlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGV4dHJhY3RMYWJlbHNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLmxhYmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGV4dHJhY3ROYW1lc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZXh0cmFjdFR5cGVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogQWpmRmllbGRUeXBlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcDogQWpmRmllbGQgPSA8QWpmRmllbGQ+bm9kZXNbaV07XG4gICAgICBvYmoucHVzaChwLmZpZWxkVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzZXRPcmlnaW4ob3JpZ2luOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vcmlnaW5VcGRhdGUubmV4dChvcmlnaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIG1ldGhvZCByb3VuZCB0aGUgdmFsdWUgdG8gdGhlIGRlY2ltYWwgcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEBwYXJhbSBkZWNpbWFscG9zaXRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcm91bmRUbyh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsUG9zaXRpb25zOiBudW1iZXIpIHtcbiAgICBsZXQgaSA9IHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuXG4gICAgaSA9IE1hdGguZmxvb3IoaSk7XG5cbiAgICByZXR1cm4gaSAvIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyB2YWxpZGF0b3IgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpc051bWJlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eXFxkKyhcXC5cXGQrKT8vLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgaXNOdW1iZXJBcnJheSh2YWx1ZTogYW55W10pOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOdW1iZXIodmFsdWVbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdnZWQgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnZ2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ2dlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uT3ZlciBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbk92ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25PdmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZml4ZWRab29tIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZpeGVkWm9vbSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRab29tO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbUluKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21PdXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnRW50ZXIgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnRW50ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnRW50ZXI7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnRW50ZXIgd2l0aCAgc2VjdGlvbihoZWFkZXIsY29udGVudCxmb290ZXIpIGFuZCBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdFbnRlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7YXJyYXksIGluZGV4fSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25kcmFnZ2VkIHdpdGggdHJ1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cblxuICBkcmFnRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25PdmVyIHdpdGggdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIF9vbk92ZXIgd2l0aCBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydCBhcyBPYnNlcnZhYmxlPEFqZlJlcG9ydHxudWxsPjtcbiAgfVxuXG4gIC8qKlxuICAgKiBlbWl0IHNhdmUgcmVwb3J0IGV2ZW50XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2F2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5fc2F2ZVJlcG9ydEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZUltYWdlRm9ybXVsYShmb3JtdWxhOiBBamZGb3JtdWxhKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBjb25zdCB3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgdy5mbGFnID0gZm9ybXVsYTtcbiAgICAgIHcuaWNvbiA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gdztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhVG9IdG1sKGh0bWxGb3JtdWxhOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHsnZm9ybXVsYSc6IGh0bWxGb3JtdWxhLCAncmVmZXJlbmNlJzogcmVmZXJlbmNlfTtcbiAgICAgIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmVtaXQob2JqKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbXB0eUNvbnRlbnQodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZW1wdHlDb250ZW50Lm5leHQodmFsKTtcbiAgfVxuXG5cbiAgcHVzaEpzb25TdGFjayhqc29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmluZGV4T2YoanNvbikgPT09IC0xICYmIGpzb24gIT09IHRoaXMuX2xhc3REZWxldGVkSnNvbikge1xuICAgICAgY3VycmVudFN0YWNrLnB1c2goanNvbik7XG4gICAgfVxuXG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcbiAgfVxuXG4gIHBvcEpzb25TdGFjaygpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgICBsZXQgZW1wdHlKc29uID0gJ3tcImhlYWRlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSwnICtcbiAgICAgICAgJ1wiY29udGVudFwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcIicgK1xuICAgICAgICAnZm9vdGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwic3R5bGVzXCI6e319JztcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG4gICAgY3VycmVudFN0YWNrLnBvcCgpO1xuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9IGN1cnJlbnRTdGFjay5wb3AoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2subGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuICAgICAgdGhpcy5fanNvblN0YWNrLm5leHQoW10pO1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQodHJ1ZSk7XG4gICAgICByZXR1cm4gZW1wdHlKc29uO1xuICAgIH1cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REZWxldGVkSnNvbjtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCB0aGUgZW1pdHRlclxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sdW1uV2lkdGhDaGFuZ2VkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9jdXN0b21XaWRnZXRzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1c3RvbVdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21XaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBDb250ZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29udGVudCBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sb3JzIG9mIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sb3JzKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cblxuICBnZXQgZW1wdHlDb250ZW50KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lbXB0eUNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUFycmF5V2lkZ2V0cyh0eXBlOiBzdHJpbmcsIG5ld1dpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcikge1xuICAgIGlmICgodHlwZSAhPT0gJ2hlYWRlcicpICYmICh0eXBlICE9PSAnY29udGVudCcpICYmICh0eXBlICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlICcgKyB0eXBlKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlc1t0eXBlXS5uZXh0KChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2Zvcm1zVmFyaWFibGVzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm1zVmFyaWFibGVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1zVmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbk5hbWVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbk5hbWVzO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXJyZW50V2lkZ2V0KCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBVcGRhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGUgd2l0aCBuZXdXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVDdXJyZW50V2lkZ2V0KG5ld1dpZGdldDogQWpmV2lkZ2V0fG51bGwpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKF93aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGdldFNhdmVSZXBvcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVJlcG9ydCBhcyBPYnNlcnZhYmxlPGFueT47XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9qc29uU2F2ZWRSZXBvcnQgb2Jlc2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFNhdmVkKCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVkUmVwb3J0O1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRTdHlsZXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydEZvcm1zIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydEZvcm1zKCk6IE9ic2VydmFibGU8QWpmRm9ybVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydEZvcm1zO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgX29yaWdpbiBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvcmlnaW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFzc2lnbnMgdGhlIG5ldyB3aWR0aCB0byB0aGUgaWR4IGNvbHVtblxuICAgKiBhbmQgcmVjYWxjdWxhdGVzIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgb2YgdGhlIGxheW91dC5cbiAgICogVGhlIHJhbmdlIHZhbHVlIGFyZSBmcm9tIDAsMSB0byAxLlxuICAgKlxuICAgKiBSVUxFUzpcbiAgICogVGhlIG1pbiB2YWx1ZSBmb3IgY29sdW1uIGlzIDAsMS5cbiAgICogVGhlIHN1bSBvZiBhbGwgY29sdW1ucyB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICogVGhlIG1ldGhvZCByb3VuZCB0aGUgdmFsdWVzLlxuICAgKiBJZiBpcyBwcmVzZW50IG9ubHkgb25lIGNvbHVtbiB0aGUgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPmAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGRlY3JlYXNlcy5cbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA8YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgaW5jcmVhc2VzLlxuICAgKlxuICAgKiBXaGVuIHZhbHVlcyDigIvigIthcmUgcGVyaW9kaWMsIHJvdW5kaW5nIGFzc2lnbnMgdGhlIGdhcCB0byB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogRm9yIGV4YW1wbGU6IDMgY29sdW1ucyB3aXRoIDAsMzMgYmVsaWV2ZSAxIGNvbHVtbiAwLDM0IGFuZCAyIGNvbHVtbnMgMCwzMy5cbiAgICpcbiAgICogQHBhcmFtIG5ld1ZhbHVlXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpbnN0YW50Q29sdW1uVmFsdWUobmV3VmFsdWU6IG51bWJlciwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBsZXQgc2l6ZSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuXG4gICAgICBsZXQgc3ByZWFkVmFsdWUgPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGxldCBpZHhGaXJzdE5vT2JqID0gLTE7XG5cbiAgICAgIGxldCBhZGQgPSBmYWxzZTtcbiAgICAgIGxldCBmb3VuZEZpcnN0Tm9PYmogPSBmYWxzZTtcblxuICAgICAgbGV0IHJlMSA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XVswLTldJCknKTtcbiAgICAgIGxldCByZTIgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV0kKScpO1xuICAgICAgbGV0IHJlMyA9IG5ldyBSZWdFeHAoJ15bMV0kJyk7XG5cbiAgICAgIGxldCBvbGRWYWx1ZSA9IG15T2JqLmNvbHVtbnNbaWR4XTtcblxuICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKG5ld1ZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob2xkVmFsdWUgPT0gLTEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICAgIG9iak51bS0tO1xuICAgICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChzaXplIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDAuMTtcbiAgICAgIH0gZWxzZSBpZiAob2xkVmFsdWUgPCAwLjEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICB9XG5cblxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSAtMSkge1xuICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zWzBdID0gMTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUgPCAwLjEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDAuMTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSArIDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSkgPiAxKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAxIC0gKDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpICYmIChvbGRWYWx1ZSA9PT0gMC4xKSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRWYWx1ZSA+IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChvbGRWYWx1ZSAtIG5ld1ZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkID0gZmFsc2U7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAobmV3VmFsdWUgLSBvbGRWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ByZWFkVmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKHNwcmVhZFZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICBpZiAoc3ByZWFkVmFsdWUgPCAwLjAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAwLjE7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gLTE7XG4gICAgICAgIG9iak51bSsrO1xuICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChvbGRWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG4gICAgICAgICAgaWYgKChpID09IGlkeCkpIHtcbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmICgobXlPYmouY29sdW1uc1tpXSA+IDAuOSkgJiYgKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gb2JqTnVtICE9IDEpKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuOTA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPCAwLjEpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC4xMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2ldLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICAgIHN1bSArPSBteU9iai5jb2x1bW5zW2ldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmogPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlkeEZpcnN0Tm9PYmogPSBpO1xuICAgICAgICAgICAgZm91bmRGaXJzdE5vT2JqID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSAtMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaikge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4Rmlyc3ROb09ial0gKz0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdICE9PSAtMSAmJiAhcmUxLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJlxuICAgICAgICAgICAgIXJlMi50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiYgIXJlMy50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkpIHtcbiAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgwLjEwLCBqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyLmVtaXQoKTtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBpbWFnZVVybCBvbiB0aGUgY3VycmVudCBBamZJbWFnZVdpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIGltYWdlVXJsXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0SW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmoudXJsID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpbWFnZVVybH1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEljb24oaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ30pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmljb24gPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ljb259XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmZsYWcgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke3ZhbHVlfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNvbmRpdGlvbihjb25kaXRpb25UZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAod2lkZ2V0LnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgICB3aWRnZXQudmlzaWJpbGl0eS5jb25kaXRpb24gPSBjb25kaXRpb25UZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDaGFydEZvcm11bGEoXG4gICAgICBfbGFiZWw6IHN0cmluZywgX2xldmVsOiBudW1iZXIsIF9tYWluSW5kZXg6IG51bWJlciwgX2luZGV4OiBudW1iZXIsIGZvcm11bGFUZXh0OiBzdHJpbmcsXG4gICAgICBhZ2dyZWdhdGlvblR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQgIT0gbnVsbCAmJiB3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSByb3cgdGhhdCBjb250YWlucyBtYWluIGRhdGEgaXMgZGVmaW5lZFxuICAgICAgICAvKiBpZiAod2lkZ2V0LmRhdGFzZXRbMF0gPT0gbnVsbCkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV2ZWwgPT0gMCAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT0gMSAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXggKyAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVUYWJsZUZvcm11bGEoXG4gICAgICBfbGFiZWw6IHN0cmluZywgYWdncmVnYXRpb25UeXBlOiBudW1iZXIsIGZvcm11bGFUZXh0OiBzdHJpbmcsIF9tYWluSW5kZXg6IG51bWJlcixcbiAgICAgIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXQgPSBuZXcgQWpmRGF0YXNldCgpO1xuICAgICAgICAvLyBsZXQgcm93RGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8qIGlmIChtYWluSW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnZGF0YXNldCcsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZEYXRhV2lkZ2V0PndpZGdldDtcblxuICAgICAgLyogaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgdHlwZSBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ3R5cGUnLCB0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgIGlkeCBlbGVtZW50IG9mIHhMYWJlbHMgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZU1haW5EYXRhKF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvLyBteU9iai5kYXRhc2V0WzBdLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVSZWxhdGVkRGF0YShfbWFpbklkeDogbnVtYmVyLCBfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLyogaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSWR4ICsgMSwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JZHggKyAxXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIGJhY2tncm91bmRDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIGFkZENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYm9yZGVyQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJXaWR0aCcsIHZhbHVlKTtcbiAgfVxuXG4gIGFkZENoYXJ0Qm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0KHJlcG9ydDogQWpmUmVwb3J0KTogdm9pZCB7XG4gICAgdGhpcy5fcmVwb3J0Lm5leHQocmVwb3J0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTYXZlUmVwb3J0KGpzb246IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVSZXBvcnQubmV4dChqc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGZvbnQgYXR0cmlidXRlIG9uIHRoZSBjdXJyZW50IEFqZldpZGdldC5cbiAgICpcbiAgICogVGhlcmUgaXMgYSBjaGVjayBvbiBmb250LXNpemUgYXR0cmlidXRlLFxuICAgKiBpZiBpcyBubyBzcGVjaWZpY2F0ZSB0aGUgdHlwZSBvZiBzaXplIGZvbnQgc2V0ICdwdCcgYXMgZGVmYXVsdC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZlRleHRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBjb25zdCBweFN0eWxlcyA9XG4gICAgICAgICAgWydmb250LXNpemUnLCAnaGVpZ2h0JywgJ3dpZHRoJywgJ2JvcmRlci13aWR0aCcsICdib3JkZXItcmFkaXVzJywgJ3BhZGRpbmcnLCAnbWFyZ2luJ107XG4gICAgICBjb25zdCBpc1B4U3R5bGUgPSBweFN0eWxlcy5pbmRleE9mKGxhYmVsKSA+IC0xO1xuICAgICAgaWYgKGlzUHhTdHlsZSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICdweCc7XG4gICAgICB9IGVsc2UgaWYgKGlzUHhTdHlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuaXNOdW1iZXJBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBgJHt2YWx1ZS5qb2luKCdweCAnKX1weGA7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHVwZGF0ZSB0aGUgc3R5bGVzIG9mIG9yaWdpbiB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG9yaWdpbiBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTZWN0aW9uU3R5bGVzKG9yaWdpbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKChvcmlnaW4gIT09ICdoZWFkZXInKSAmJiAob3JpZ2luICE9PSAnY29udGVudCcpICYmIChvcmlnaW4gIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmNrbm93IG9yaWdpbiAnICsgb3JpZ2luKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVzW29yaWdpbl0ubmV4dCgod2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICB3aWRnZXQuc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICB3aWRnZXQuc3R5bGVzID0gPEFqZlN0eWxlcz57Li4ud2lkZ2V0LnN0eWxlc307XG5cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgc2V0IHRoZSBzdHlsZSBvZiB0aGUgd2hvbGUgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUubmV4dCgoc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgaWYgKHN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgIHN0eWxlcyA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuICAgICAgICBzdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi5zdHlsZXN9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIGZvcm1zXG4gICAqXG4gICAqIEBwYXJhbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydEZvcm1zKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZS5uZXh0KChfZm9ybTogQWpmRm9ybVtdKTogQWpmRm9ybVtdID0+IHtcbiAgICAgIHJldHVybiBmb3JtcyB8fCBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ3VzdG9tV2lkZ2V0cyh3aWRnZXQ6IEFqZkN1c3RvbVdpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cyA9IGN1c3RvbVdpZGdldHMgfHwgW107XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldCBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZXNldEN1c3RvbVdpZGdldHMoKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMubGVuZ3RoID0gMDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBsYWJlbCBvZiB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNoYW5nZUxhYmVsQ3VzdG9tV2lkZ2V0KGxhYmVsOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0c1twb3NpdGlvbl0udHlwZSA9IGxhYmVsO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfaGVhZGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkSGVhZGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2NvbnRlbnRXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb250ZW50V2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9mb290ZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRmb290ZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICB1bmZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgc3ByZWFkVmFsdWU6IGFueTtcbiAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IHZhbHVlO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHNwcmVhZFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnJvdW5kVG8oKChjaGVja1N1bSAtIDEpICUgMSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gLT0gc3ByZWFkVmFsdWU7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdICs9ICgxIC0gKGNoZWNrU3VtICUgMSkpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29sdW1uIG9uIHRoZSBjdXJyZW50IEFqZkxheW91dFdpZGdldC5cbiAgICpcbiAgICogV2hlbiBhZGRpbmcgYSBjb2x1bW4gdGhlIHdpZHRoIG9mIHRoZSBvdGhlciBjb2x1bW5zIGlzIHJlY2FsY3VsYXRlZFxuICAgKiBieSBkaXZpZGluZyBpdCBieSB0aGUgbnVtYmVyIG9mIGNvbHVtblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbHVtbigpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCB0ZW1wT2JqOiBudW1iZXJbXSA9IFtdO1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoICsgMTtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgdG1wVmFsdWU6IGFueTtcblxuICAgICAgaWYgKG51bSA+IDEwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhjZWVkIG1heCBjb2x1bW5zJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldID09PSAtMSkge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCgtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKHZhbHVlKTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgdG1wVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gLT0gdG1wVmFsdWU7XG4gICAgICAgIHRlbXBPYmpbMF0gPSB0aGlzLnJvdW5kVG8odGVtcE9ialswXSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICB0ZW1wT2JqWzBdICs9ICgxIC0gKGNoZWNrU3VtICUgMSkpO1xuICAgICAgICB0ZW1wT2JqWzBdID0gTnVtYmVyKHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgbXlPYmouY29sdW1ucyA9IHRlbXBPYmo7XG5cbiAgICAgIC8vIFRPRE86IEB0cmlrIHdoYXQncyB2YWx1ZT8hP1xuICAgICAgY29uc3QgY29sdW1uT2JqID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogNyxcbiAgICAgICAgLy8gdmFsdWU6IG15T2JqLmNvbHVtbnNbbXlPYmouY29sdW1ucy5sZW5ndGggLSAxXSxcbiAgICAgIH0pO1xuXG4gICAgICBteU9iai5jb250ZW50LnB1c2goY29sdW1uT2JqKTtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVXaWRnZXRUb0NvbHVtbihjb2x1bW46IEFqZkNvbHVtbldpZGdldCwgaW5kZXg6IG51bWJlcikge1xuICAgIGNvbHVtbi5jb250ZW50LnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcmVtb3ZlIGEgd2lkZ2V0IG9uIHRoZSBjdXJyZW50IEFqZlJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIG5vZGVcbiAgICogdGhlIHBvc2l0aW9uIGFycmF5OlxuICAgKlxuICAgKiBoZWFkZXIgLWA+YCBoZWFkZXJXaWRnZXRzXG4gICAqIGNvbnRlbnQgLWA+YCBjb250ZW50V2lkZ2V0c1xuICAgKiBmb290ZXIgLWA+YCBmb290ZXJXaWRnZXRzXG4gICAqIGNvbHVtbiAtYD5gIGNvbHVtbiBvZiBsYXlvdXRcbiAgICogbGF5b3V0Q29udGVudCAtYD5gIGNvbnRlbnQgb2YgbGF5b3V0XG4gICAqIG9iaiAtYD5gIG9iaiBvZiBsYXlvdXRcbiAgICogY3VzdG9tV2lkZ2V0IC1gPmAgY3VzdG9tIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4IHRoZSBwb3NpdGlvbiBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZShub2RlOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgc3dpdGNoIChub2RlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0cy53aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0cy53aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMud2lkZ2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xheW91dCc6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIChteU9iai5jb250ZW50WzBdIGFzIEFqZkNvbHVtbldpZGdldCkuY29udGVudC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgY2FzZSAnbGF5b3V0Q29udGVudCc6XG4gICAgICBjYXNlICd1bmZpeGVkQ29sdW1uJzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG5vZGUgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgICAgICBsZXQgY2xtID0gPEFqZkNvbHVtbldpZGdldD53aWRnZXQ7XG4gICAgICAgICAgICBjbG0uY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgPT09ICdsYXlvdXRDb250ZW50Jykge1xuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBsZW5ndGggaXMgMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCByZW1vdmUgYW55IHdpZGdldCBmcm9tIGVtcHR5IGNvbnRlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT0gbnVsbCAmJiBteU9iai5jb250ZW50W2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgPT09ICd1bmZpeGVkQ29sdW1uJykge1xuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIHBvc2l0aW9uIHZhbHVlICBpc250IC0xJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVuZml4ZWRDb2x1bW4oaWR4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gaWYgKG5vZGUgIT09ICdvYmonKSB7XG4gICAgICAgICAgLy8gICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgLy8gICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIC8vICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY3VzdG9tV2lkZ2V0cyc6IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICB9IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIG5vZGUgJyArIG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgYSBBamZXaWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRUb0NvbnRlbnQobmV3V2lkZ2V0OiBBamZXaWRnZXQsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5jb250ZW50W2lkeF0gIT0gbnVsbCkge1xuICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAwLCBuZXdXaWRnZXQpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVG9Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbiAhPSBudWxsKSB7XG4gICAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICAgIGxldCB3aWRnZXQ6IEFqZldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLndpZGdldDtcbiAgICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcblxuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKHdpZGdldCk7XG5cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSkge1xuICAgICAgdGhpcy5yZW1vdmUoZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tLCBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXgpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKGV2ZW50LmRyYWdEYXRhLndpZGdldCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5qc29uKSB7XG4gICAgICBsZXQgb2JqID0gSlNPTi5wYXJzZShldmVudC5kcmFnRGF0YS5qc29uKTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogQWpmV2lkZ2V0VHlwZVtldmVudC5kcmFnRGF0YV19O1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoYW5nZVBvc2l0aW9uT25Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgdG9JbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuICAgIGxldCBmcm9tV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XTtcbiAgICBsZXQgdG9XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XTtcblxuICAgIGlmIChmcm9tQ29sdW1uID09IHRvQ29sdW1uKSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XSA9IHRvV2lkZ2V0O1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdID0gZnJvbVdpZGdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UodG9JbmRleCwgMCwgZnJvbVdpZGdldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCB0aGUgb2JqIG9uIHRoZSBpZHggcG9zaXRpb24uXG4gICAqIE9iaiBoYXZlIGEgbm8gc3BlY2lmaWNhdGUgd2lkdGggYW5kIGlzIG5vdCBjYWxjdWxhdGUgYXMgY29sdW1uc1xuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgtMSwgaWR4KTtcbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0KSB7XG4gICAgaWYgKHRvIDwgMCB8fCB0byA+PSBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGZyb20gPiBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGggLSAxICYmIHRvID4gZnJvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W2Zyb21dO1xuICAgIGxldCBmcm9tQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dO1xuICAgIGxldCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFt0b107XG4gICAgbGV0IHRvQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW3RvXTtcblxuICAgIGxheW91dFdpZGdldC5jb250ZW50W2Zyb21dID0gdG9Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV0gPSB0b0NvbHVtblZhbHVlO1xuICAgIGxheW91dFdpZGdldC5jb250ZW50W3RvXSA9IGZyb21Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dID0gZnJvbUNvbHVtblZhbHVlO1xuXG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KGxheW91dFdpZGdldCk7XG4gIH1cblxuICBhZGRDdXN0b21Db2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fdXBkYXRlc1snY29sb3InXS5uZXh0KChjb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgaWYgKGNvbG9ycy5pbmRleE9mKGNvbG9yKSA8IDApIHtcbiAgICAgICAgY29sb3JzLnB1c2goY29sb3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFdpZGdldFRvQ29udGFpbmVyKFxuICAgICAgc3ViajogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiwgd2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgc3Viai5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KHdpZGdldCk7XG4gICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgYXJyID0gKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSBhcyBhbnlbXTtcbiAgICAgIGFyci5wdXNoKHZhbHVlKTtcbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSBhcnI7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgKCh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gYXMgYW55W10pLnNwbGljZShpZHgsIDEpO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxufVxuIl19