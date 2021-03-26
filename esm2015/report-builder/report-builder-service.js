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
AjfReportBuilderService.decorators = [
    { type: Injectable }
];
AjfReportBuilderService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFNUM7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyx1QkFBdUI7SUFpT2xDOzs7O09BSUc7SUFDSCxZQUFvRCxhQUErQjtRQS9OM0UseUJBQW9CLEdBQ3hCLElBQUksT0FBTyxFQUE2QixDQUFDO1FBUXJDLGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7UUFRdkQsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7UUFFbEUsZUFBVSxHQUE4QixJ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b3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmRm9ybSwgQWpmTm9kZSwgQWpmTm9kZVR5cGUsIGZsYXR0ZW5Ob2Rlc30gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmRm9ybXVsYSwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvbixcbiAgQWpmQ2hhcnRXaWRnZXQsXG4gIEFqZkNvbHVtbldpZGdldCxcbiAgQWpmQ3VzdG9tV2lkZ2V0LFxuICBBamZEYXRhV2lkZ2V0LFxuICBBamZJbWFnZVdpZGdldCxcbiAgQWpmTGF5b3V0V2lkZ2V0LFxuICBBamZSZXBvcnQsXG4gIEFqZlJlcG9ydENvbnRhaW5lcixcbiAgQWpmU3R5bGVzLFxuICBBamZUYWJsZVdpZGdldCxcbiAgQWpmVGV4dFdpZGdldCxcbiAgQWpmV2lkZ2V0LFxuICBBamZXaWRnZXRUeXBlLFxuICBjcmVhdGVBZ2dyZWdhdGlvbixcbiAgY3JlYXRlV2lkZ2V0XG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjb21iaW5lTGF0ZXN0LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGhcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXMsIEFqZlJlcG9ydEljb25zLCBBamZSZXBvcnRzQ29uZmlnLCBBamZXaWRnZXRzQ29udGFpbmVyfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZDb2xvck9wZXJhdGlvbixcbiAgQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbixcbiAgQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbixcbiAgQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24sXG4gIEFqZlN0eWxlc09wZXJhdGlvbixcbiAgQWpmV2lkZ2V0T3BlcmF0aW9uLFxuICBBamZXaWRnZXRzT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5pbXBvcnQge0FKRl9SRVBPUlRTX0NPTkZJR30gZnJvbSAnLi90b2tlbnMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBjb250YWlucyBhbGwgdGhlIGxvZ2ljIHRvIG1vZGVsIHRoZSByZXBvcnQgd2lkZ2V0LlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlIHtcbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VzdG9tV2lkZ2V0cyBvYmpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPjtcbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50IHdpZGdldC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW46IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfb3JpZ2luVXBkYXRlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBleHBvcnRlZCBqc29uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnQ6IE9ic2VydmFibGU8QWpmUmVwb3J0PjtcbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnRVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0PiA9IG5ldyBTdWJqZWN0PEFqZlJlcG9ydD4oKTtcblxuICBwcml2YXRlIF9qc29uU3RhY2s6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG5cbiAgcHJpdmF0ZSBfbGFzdERlbGV0ZWRKc29uOiBzdHJpbmd8dW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2VtcHR5Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbkRyYWdnZWRVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgcHJpdmF0ZSBfb25PdmVyOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbk92ZXJVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdGF0dXMgb2YgcGVybWFuZW50IHpvb21cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9maXhlZFpvb206IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXI6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXJVcGRhdGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgaGVhZGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgaGVhZGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgY29udGVudCB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY29udGVudCBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuXG4gIHByaXZhdGUgX2NvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcHJpdmF0ZSBfY29sb3JVcGRhdGU6IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRDb2xvcjogc3RyaW5nW10gPSBbXG4gICAgJ3JnYmEoMCwgMCwgMCwgMSknLCAgICAgICAncmdiYSg1MSwgMTUzLCAyNTUsIDEpJywgICdyZ2JhKDE1MywgMjA0LCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxMDIsIDAsIDEpJywgICAncmdiYSgwLCAyMDQsIDIwNCwgMSknLCAgICdyZ2JhKDIwNCwgMjA0LCAxNTMsIDEpJyxcbiAgICAncmdiYSgyNTUsIDE1MywgMCwgMSknLCAgICdyZ2JhKDIzMCwgMCwgMCwgMSknLCAgICAgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJyxcbiAgICAncmdiYSgyNTUsIDI1NSwgMCwgMSknLCAgICdyZ2JhKDAsIDEzOCwgMCwgMSknLCAgICAgJ3JnYmEoMCwgMTAyLCAyMDQsIDEpJyxcbiAgICAncmdiYSgxNTMsIDUxLCAyNTUsIDEpJywgICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJywgJ3JnYmEoMjUwLCAyMDQsIDIwNCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjM1LCAyMDQsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDIwNCwgMSknLCAncmdiYSgyMDQsIDIzMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjA0LCAyMjQsIDI0NSwgMSknLCAncmdiYSgyMzUsIDIxNCwgMjU1LCAxKScsICdyZ2JhKDE4NywgMTg3LCAxODcsIDEpJyxcbiAgICAncmdiYSgyNDAsIDEwMiwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMTk0LCAxMDIsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDEwMiwgMSknLFxuICAgICdyZ2JhKDEwMiwgMTg1LCAxMDIsIDEpJywgJ3JnYmEoMTAyLCAxNjMsIDIyNCwgMSknLCAncmdiYSgxOTQsIDEzMywgMjU1LCAxKScsXG4gICAgJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMSknLCAncmdiYSgxNjEsIDAsIDAsIDEpJywgICAgICdyZ2JhKDE3OCwgMTA3LCAwLCAxKScsXG4gICAgJ3JnYmEoMTc4LCAxNzgsIDAsIDEpJywgICAncmdiYSgwLCA5NywgMCwgMSknLCAgICAgICdyZ2JhKDAsIDcxLCAxNzgsIDEpJyxcbiAgICAncmdiYSgxMDcsIDM2LCAxNzgsIDEpJywgICdyZ2JhKDY4LCA2OCwgNjgsIDEpJywgICAgJ3JnYmEoOTIsIDAsIDAsIDEpJyxcbiAgICAncmdiYSgxMDIsIDYxLCAwLCAxKScsICAgICdyZ2JhKDEwMiwgMTAyLCAwLCAxKScsICAgJ3JnYmEoMCwgNTUsIDAsIDEpJyxcbiAgICAncmdiYSgwLCA0MSwgMTAyLCAxKScsICAgICdyZ2JhKDYxLCAyMCwgMTAyLCAxKSdcbiAgXTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXJyZW50IHdpZGdldCB3aGljaCBob2xkcyB0aGUgZm9jdXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD47XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCB1cGRhdGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgY29udGFpbnMgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnR8bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZlJlcG9ydHxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdHlsZXMgb2YgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXNVcGRhdGU6IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgZm9ybXMgZmV0Y2hlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT47XG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zVXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogZGljdGlvbmFyeSBmb3IgIHdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVzOiBhbnkgPSB7XG4gICAgaGVhZGVyOiB0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbnRlbnQ6IHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLFxuICAgIGZvb3RlcjogdGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb2xvcjogdGhpcy5fY29sb3JVcGRhdGUsXG4gICAgY3VzdG9tV2lkZ2V0czogdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gd29udCB0byBzYXZlIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnRFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3NhdmVGb3JtdWxhVE9IdG1sOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldEZvcm11bGFUb0h0bWxFdmVudCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbCBhcyBPYnNlcnZhYmxlPHN0cmluZz47XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIGNvbHVtbiB3aWR0aCBjaGFuZ2VkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2ljb25TZXRzOiBBamZSZXBvcnRJY29ucyA9IHsnYWpmLWljb24nOiBbXX07XG4gIGdldCBpY29uU2V0cygpOiBBamZSZXBvcnRJY29ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb25TZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBSkZfUkVQT1JUU19DT05GSUcpIHJlcG9ydHNDb25maWc6IEFqZlJlcG9ydHNDb25maWcpIHtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcblxuICAgIGlmIChyZXBvcnRzQ29uZmlnICE9IG51bGwpIHtcbiAgICAgIGlmIChyZXBvcnRzQ29uZmlnLmljb25zICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5faWNvblNldHMgPSB7Li4udGhpcy5faWNvblNldHMsIC4uLnJlcG9ydHNDb25maWcuaWNvbnN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX29yaWdpbiA9ICg8T2JzZXJ2YWJsZTxzdHJpbmc+PnRoaXMuX29yaWdpblVwZGF0ZSkucGlwZShzdGFydFdpdGgoJ2hlYWRlcicpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX3NhdmVkUmVwb3J0ID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydD4+dGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUpLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWQgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25EcmFnZ2VkVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25PdmVyID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uT3ZlclVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX2ZpeGVkWm9vbSA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9maXhlZFpvb21VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdFbnRlciA9IHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9yZXBvcnRTdHlsZXMgPSAoPE9ic2VydmFibGU8QWpmU3R5bGVzT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKHN0eWxlczogQWpmU3R5bGVzLCBvcDogQWpmU3R5bGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDxBamZTdHlsZXM+e30pLCBzaGFyZSgpLCBzdGFydFdpdGgoPEFqZlN0eWxlcz57fSkpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGZvcm1zOiBBamZGb3JtW10sIG9wOiBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGZvcm1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0cyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10sIG9wOiBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9mb3Jtc1ZhcmlhYmxlcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2hlYWRlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVzID0gdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29udGVudFdpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29udGVudFN0eWxlcyA9IHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2Zvb3RlclN0eWxlcyA9IHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbG9yID0gKDxPYnNlcnZhYmxlPEFqZkNvbG9yT3BlcmF0aW9uPj50aGlzLl9jb2xvclVwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChjb2xvcjogc3RyaW5nW10sIG9wOiBBamZDb2xvck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9kZWZhdWx0Q29sb3IpLCBzaGFyZSgpLCBzdGFydFdpdGgodGhpcy5fZGVmYXVsdENvbG9yKSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5waXBlKFxuICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICBtYXAocyA9PiBzISksXG4gICAgICAgIHNjYW4oXG4gICAgICAgICAgICAod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCwgb3A6IEFqZldpZGdldE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudWxsIGFzIHVua25vd24gYXMgQWpmV2lkZ2V0KSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNcbiAgICAgICAgLnBpcGUoZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksIG1hcCgoZm9ybXM6IEFqZkZvcm1bXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2M6IEFqZkZvcm1WYXJpYWJsZXNbXSk6IEFqZkZvcm1WYXJpYWJsZXNbXSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1zVmFyaWFibGVzVXBkYXRlKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zXG4gICAgICAgIC5waXBlKGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLCBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSk7XG5cbiAgICBjb25zdCByZXBvcnRPYnMgPSB0aGlzLl9yZXBvcnQ7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX2NvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yczogc3RyaW5nW10gPSB0aGlzLl9kZWZhdWx0Q29sb3I7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIGlmIChyLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5jb250ZW50LnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuZm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuZm9vdGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuaGVhZGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmhlYWRlci5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgb2JqID0gci5oZWFkZXIuY29udGVudFtpXTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihvYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxheW91dE9iaiA9IG9iaiBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5b3V0T2JqLmNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uT2JqID0gbGF5b3V0T2JqLmNvbnRlbnRbal0gYXMgQWpmQ29sdW1uV2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihjb2x1bW5PYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGNvbHVtbk9iai5jb250ZW50Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0T2JqID0gY29sdW1uT2JqLmNvbnRlbnRbel07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iod2lkZ2V0T2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gPHN0cmluZ1tdPnRlbXBDb2xvcnM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29sb3JVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9zdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+e307XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz5yLnN0eWxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuaGVhZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuaGVhZGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmhlYWRlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5jb250ZW50LmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmNvbnRlbnQuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuZm9vdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuZm9vdGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmZvb3Rlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnQucGlwZShtYXAoKGpzb246IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIChfcjogYW55KTogYW55ID0+IHtcbiAgICAgICAgaWYgKGpzb24gPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMucmVwb3J0LCB0aGlzLnJlcG9ydEZvcm1zKSxcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9ydFN0eWxlcy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgIC5zdWJzY3JpYmUociA9PiB7XG4gICAgICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICAgICAgLy8gY29uc3QgY3VyUm8gPSByWzBdWzFdO1xuICAgICAgICAgIC8vIGNvbnN0IGZvcm1zID0gclswXVsyXSAhPSBudWxsID8gclswXVsyXSB8fCBbXVxuICAgICAgICAgIC8vICAgICA6IChjdXJSbyAhPSBudWxsID8gY3VyUm8uZm9ybXMgfHwgW10gOiBbXSk7XG5cbiAgICAgICAgICBjb25zdCBbaGNvLCBjY28sIGZjb10gPSBbclsxXSwgclsyXSwgclszXV0gYXMgQWpmV2lkZ2V0c0NvbnRhaW5lcltdO1xuXG4gICAgICAgICAgb2JqLmhlYWRlciA9IHtjb250ZW50OiBoY28ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogaGNvLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5jb250ZW50ID0ge2NvbnRlbnQ6IGNjby53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiBjY28uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLmZvb3RlciA9IHtjb250ZW50OiBmY28ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogZmNvLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5zdHlsZXMgPSByWzRdO1xuXG4gICAgICAgICAgY29uc3Qgcm8gPSB7XG4gICAgICAgICAgICBoZWFkZXI6IHtjb250ZW50OiBoY28ud2lkZ2V0cywgc3R5bGVzOiBoY28uc3R5bGVzfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtjb250ZW50OiBjY28ud2lkZ2V0cywgc3R5bGVzOiBjY28uc3R5bGVzfSxcbiAgICAgICAgICAgIGZvb3Rlcjoge2NvbnRlbnQ6IGZjby53aWRnZXRzLCBzdHlsZXM6IGZjby5zdHlsZXN9LFxuICAgICAgICAgICAgc3R5bGVzOiByWzRdXG4gICAgICAgICAgfSBhcyBBamZSZXBvcnQ7XG5cbiAgICAgICAgICB0aGlzLnNldFNhdmVSZXBvcnQob2JqKTtcbiAgICAgICAgICB0aGlzLl9zYXZlZFJlcG9ydFVwZGF0ZS5uZXh0KHJvKTtcbiAgICAgICAgICB0aGlzLnB1c2hKc29uU3RhY2soSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBmdW5jdGlvbnNcbiAgICpcbiAgICovXG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiByZW1vdmUgQWpmTm9kZUdyb3VwLCBBamZTbGlkZSwgQWpmUmVwZWF0aW5nU2xpZGUsIEFqZlN0cmluZ0ZpZWxkIGZyb20gYWpmbm9kZSBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaWx0ZXJOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8XG4gICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUgfHxcbiAgICAgICAgICAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQgJiZcbiAgICAgICAgICAgKG5vZGUgYXMgQWpmRmllbGQpLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLlN0cmluZykpIHtcbiAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHBhcnNlQ29sb3IoY3NzU3R5bGVzOiBhbnksIGNvbG9yczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZUtleXMgPSBbJ2JhY2tncm91bmQtY29sb3InLCAnYmFja2dyb3VuZENvbG9yJywgJ2NvbG9yJ107XG4gICAgc3R5bGVLZXlzLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChjc3NTdHlsZXNba10gJiYgY29sb3JzLmluZGV4T2YoY3NzU3R5bGVzW2tdKSA9PSAtMSkge1xuICAgICAgICBjb2xvcnMucHVzaChjc3NTdHlsZXNba10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICBsZXQgdmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXJpYWJsZXNbaV0gPSB7bm9kZXM6IFtdLCBsYWJlbHM6IFtdLCBuYW1lczogW10sIHR5cGVzOiBbXX07XG5cbiAgICAgIGlmIChmb3Jtc1tpXS5ub2RlcyAhPSBudWxsICYmIGZvcm1zW2ldLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyaWFibGVzW2ldLm5vZGVzID0gdGhpcy5maWx0ZXJOb2RlcyhmbGF0dGVuTm9kZXMoZm9ybXNbaV0ubm9kZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1tpXS5sYWJlbHMgPSB0aGlzLmV4dHJhY3RMYWJlbHNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLm5hbWVzID0gdGhpcy5leHRyYWN0TmFtZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLnR5cGVzID0gdGhpcy5leHRyYWN0VHlwZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzO1xuICB9XG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogIHRoZSBvYmogcmV0dXJuZWQgY29udGFpbnMgdGhlIGxhYmVsIGZpZWxkIG9mIGFqZk5vZGVcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZXh0cmFjdExhYmVsc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubGFiZWwpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZXh0cmFjdE5hbWVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBleHRyYWN0VHlwZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBBamZGaWVsZFR5cGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwOiBBamZGaWVsZCA9IDxBamZGaWVsZD5ub2Rlc1tpXTtcbiAgICAgIG9iai5wdXNoKHAuZmllbGRUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHNldE9yaWdpbihvcmlnaW46IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29yaWdpblVwZGF0ZS5uZXh0KG9yaWdpbik7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZSB0byB0aGUgZGVjaW1hbCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGRlY2ltYWxwb3NpdGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15cXGQrKFxcLlxcZCspPy8udGVzdCh2YWx1ZSk7XG4gIH1cblxuICBpc051bWJlckFycmF5KHZhbHVlOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc051bWJlcih2YWx1ZVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ2dlZCBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdnZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnZ2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25PdmVyIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uT3ZlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbk92ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9maXhlZFpvb20gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZml4ZWRab29tKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFpvb207XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdFbnRlciBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdFbnRlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdFbnRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdFbnRlciB3aXRoICBzZWN0aW9uKGhlYWRlcixjb250ZW50LGZvb3RlcikgYW5kIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0VudGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHthcnJheSwgaW5kZXh9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbmRyYWdnZWQgd2l0aCB0cnVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuXG4gIGRyYWdFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbk92ZXIgd2l0aCB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlclN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgX29uT3ZlciB3aXRoIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlckVuZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdnZWQgd2l0aCBmYWxzZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0KCk6IE9ic2VydmFibGU8QWpmUmVwb3J0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0IGFzIE9ic2VydmFibGU8QWpmUmVwb3J0fG51bGw+O1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgc2F2ZSByZXBvcnQgZXZlbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzYXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLl9zYXZlUmVwb3J0RXZlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKGZvcm11bGE6IEFqZkZvcm11bGEpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICB3LmZsYWcgPSBmb3JtdWxhO1xuICAgICAgdy5pY29uID0gZm9ybXVsYTtcbiAgICAgIHJldHVybiB3O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFUb0h0bWwoaHRtbEZvcm11bGE6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgb2JqID0geydmb3JtdWxhJzogaHRtbEZvcm11bGEsICdyZWZlcmVuY2UnOiByZWZlcmVuY2V9O1xuICAgICAgdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuZW1pdChvYmopO1xuICAgIH1cbiAgfVxuXG4gIHNldEVtcHR5Q29udGVudCh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9lbXB0eUNvbnRlbnQubmV4dCh2YWwpO1xuICB9XG5cblxuICBwdXNoSnNvblN0YWNrKGpzb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2suaW5kZXhPZihqc29uKSA9PT0gLTEgJiYganNvbiAhPT0gdGhpcy5fbGFzdERlbGV0ZWRKc29uKSB7XG4gICAgICBjdXJyZW50U3RhY2sucHVzaChqc29uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuICB9XG5cbiAgcG9wSnNvblN0YWNrKCk6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgIGxldCBlbXB0eUpzb24gPSAne1wiaGVhZGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LCcgK1xuICAgICAgICAnXCJjb250ZW50XCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwiJyArXG4gICAgICAgICdmb290ZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sXCJzdHlsZXNcIjp7fX0nO1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcbiAgICBjdXJyZW50U3RhY2sucG9wKCk7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gY3VycmVudFN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG4gICAgICB0aGlzLl9qc29uU3RhY2submV4dChbXSk7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICB0aGlzLnNldEVtcHR5Q29udGVudCh0cnVlKTtcbiAgICAgIHJldHVybiBlbXB0eUpzb247XG4gICAgfVxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG5cbiAgICByZXR1cm4gdGhpcy5fbGFzdERlbGV0ZWRKc29uO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IHRoZSBlbWl0dGVyXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2x1bW5XaWR0aENoYW5nZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2N1c3RvbVdpZGdldHMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VzdG9tV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbVdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIENvbnRlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50V2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb250ZW50IHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xvcnMgb2YgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2xvcnMoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgfVxuXG4gIGdldCBlbXB0eUNvbnRlbnQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2VtcHR5Q29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQXJyYXlXaWRnZXRzKHR5cGU6IHN0cmluZywgbmV3V2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKSB7XG4gICAgaWYgKCh0eXBlICE9PSAnaGVhZGVyJykgJiYgKHR5cGUgIT09ICdjb250ZW50JykgJiYgKHR5cGUgIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgJyArIHR5cGUpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVzW3R5cGVdLm5leHQoKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZm9ybXNWYXJpYWJsZXMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybXNWYXJpYWJsZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybXNWYXJpYWJsZXM7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uTmFtZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uTmFtZXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRXaWRnZXQoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50V2lkZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIFVwZGF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZSB3aXRoIG5ld1dpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUN1cnJlbnRXaWRnZXQobmV3V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgoX3dpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZ2V0U2F2ZVJlcG9ydCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlUmVwb3J0IGFzIE9ic2VydmFibGU8YW55PjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2pzb25TYXZlZFJlcG9ydCBvYmVzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U2F2ZWQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZWRSZXBvcnQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydFN0eWxlcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0Rm9ybXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0Rm9ybXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtW10+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0Rm9ybXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBfb3JpZ2luIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9yaWdpbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXNzaWducyB0aGUgbmV3IHdpZHRoIHRvIHRoZSBpZHggY29sdW1uXG4gICAqIGFuZCByZWNhbGN1bGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBvZiB0aGUgbGF5b3V0LlxuICAgKiBUaGUgcmFuZ2UgdmFsdWUgYXJlIGZyb20gMCwxIHRvIDEuXG4gICAqXG4gICAqIFJVTEVTOlxuICAgKiBUaGUgbWluIHZhbHVlIGZvciBjb2x1bW4gaXMgMCwxLlxuICAgKiBUaGUgc3VtIG9mIGFsbCBjb2x1bW5zIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKiBUaGUgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZXMuXG4gICAqIElmIGlzIHByZXNlbnQgb25seSBvbmUgY29sdW1uIHRoZSB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICpcbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA+YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgZGVjcmVhc2VzLlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYDxgIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBpbmNyZWFzZXMuXG4gICAqXG4gICAqIFdoZW4gdmFsdWVzIOKAi+KAi2FyZSBwZXJpb2RpYywgcm91bmRpbmcgYXNzaWducyB0aGUgZ2FwIHRvIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKiBGb3IgZXhhbXBsZTogMyBjb2x1bW5zIHdpdGggMCwzMyBiZWxpZXZlIDEgY29sdW1uIDAsMzQgYW5kIDIgY29sdW1ucyAwLDMzLlxuICAgKlxuICAgKiBAcGFyYW0gbmV3VmFsdWVcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGluc3RhbnRDb2x1bW5WYWx1ZShuZXdWYWx1ZTogbnVtYmVyLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGxldCBzaXplID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgIGxldCBzcHJlYWRWYWx1ZSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgbGV0IGlkeEZpcnN0Tm9PYmogPSAtMTtcblxuICAgICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kRmlyc3ROb09iaiA9IGZhbHNlO1xuXG4gICAgICBsZXQgcmUxID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldWzAtOV0kKScpO1xuICAgICAgbGV0IHJlMiA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XSQpJyk7XG4gICAgICBsZXQgcmUzID0gbmV3IFJlZ0V4cCgnXlsxXSQnKTtcblxuICAgICAgbGV0IG9sZFZhbHVlID0gbXlPYmouY29sdW1uc1tpZHhdO1xuXG4gICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8obmV3VmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHZhbHVlJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvbGRWYWx1ZSA9PSAtMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgICAgb2JqTnVtLS07XG4gICAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKHNpemUgLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMC4xO1xuICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSA8IDAuMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgIH1cblxuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IC0xKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbMF0gPSAxO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8IDAuMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMC4xO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlICsgMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSA+IDEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDEgLSAoMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkgJiYgKG9sZFZhbHVlID09PSAwLjEpKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlID4gbmV3VmFsdWUpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlIC0gbmV3VmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGQgPSBmYWxzZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChuZXdWYWx1ZSAtIG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzcHJlYWRWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3ByZWFkVmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgIGlmIChzcHJlYWRWYWx1ZSA8IDAuMDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoKGkgPT0gaWR4KSkge1xuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKChteU9iai5jb2x1bW5zW2ldID4gMC45KSAmJiAobXlPYmouY29sdW1ucy5sZW5ndGggLSBvYmpOdW0gIT0gMSkpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC45MDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA8IDAuMSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjEwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaV0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgc3VtICs9IG15T2JqLmNvbHVtbnNbaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhzdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaiA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWR4Rmlyc3ROb09iaiA9IGk7XG4gICAgICAgICAgICBmb3VuZEZpcnN0Tm9PYmogPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhGaXJzdE5vT2JqXSArPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gIT09IC0xICYmICFyZTEudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmXG4gICAgICAgICAgICAhcmUyLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJiAhcmUzLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSkge1xuICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKDAuMTAsIGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXIuZW1pdCgpO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGltYWdlVXJsIG9uIHRoZSBjdXJyZW50IEFqZkltYWdlV2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRJbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai51cmwgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ltYWdlVXJsfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouaWNvbiA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aWNvbn1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouZmxhZyA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7dmFsdWV9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKGNvbmRpdGlvblRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh3aWRnZXQudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIHdpZGdldC52aXNpYmlsaXR5LmNvbmRpdGlvbiA9IGNvbmRpdGlvblRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICAgIF9sYWJlbDogc3RyaW5nLCBfbGV2ZWw6IG51bWJlciwgX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlciwgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmIHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJvdyB0aGF0IGNvbnRhaW5zIG1haW4gZGF0YSBpcyBkZWZpbmVkXG4gICAgICAgIC8qIGlmICh3aWRnZXQuZGF0YXNldFswXSA9PSBudWxsKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZXZlbCA9PSAwICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PSAxICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleCArIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZVRhYmxlRm9ybXVsYShcbiAgICAgIF9sYWJlbDogc3RyaW5nLCBhZ2dyZWdhdGlvblR5cGU6IG51bWJlciwgZm9ybXVsYVRleHQ6IHN0cmluZywgX21haW5JbmRleDogbnVtYmVyLFxuICAgICAgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmVGFibGVXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgZGF0YXNldDogQWpmRGF0YXNldCA9IG5ldyBBamZEYXRhc2V0KCk7XG4gICAgICAgIC8vIGxldCByb3dEYXRhc2V0OiBBamZEYXRhc2V0W10gPSBbXTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLyogaWYgKG1haW5JbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdkYXRhc2V0JywgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkRhdGFXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAvKiBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB0eXBlIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRUeXBlKHR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgndHlwZScsIHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSAgaWR4IGVsZW1lbnQgb2YgeExhYmVscyBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlTWFpbkRhdGEoX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8vIG15T2JqLmRhdGFzZXRbMF0uc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKF9tYWluSWR4OiBudW1iZXIsIF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvKiBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JZHggKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbklkeCArIDFdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYmFja2dyb3VuZENvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBib3JkZXJDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCb3JkZXJDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBzZXRDaGFydEJvcmRlcldpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlcldpZHRoJywgdmFsdWUpO1xuICB9XG5cbiAgYWRkQ2hhcnRCb3JkZXJDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJvcmRlckNvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnQocmVwb3J0OiBBamZSZXBvcnQpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXBvcnQubmV4dChyZXBvcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNhdmVSZXBvcnQoanNvbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVJlcG9ydC5uZXh0KGpzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZm9udCBhdHRyaWJ1dGUgb24gdGhlIGN1cnJlbnQgQWpmV2lkZ2V0LlxuICAgKlxuICAgKiBUaGVyZSBpcyBhIGNoZWNrIG9uIGZvbnQtc2l6ZSBhdHRyaWJ1dGUsXG4gICAqIGlmIGlzIG5vIHNwZWNpZmljYXRlIHRoZSB0eXBlIG9mIHNpemUgZm9udCBzZXQgJ3B0JyBhcyBkZWZhdWx0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmVGV4dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGNvbnN0IHB4U3R5bGVzID1cbiAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdoZWlnaHQnLCAnd2lkdGgnLCAnYm9yZGVyLXdpZHRoJywgJ2JvcmRlci1yYWRpdXMnLCAncGFkZGluZycsICdtYXJnaW4nXTtcbiAgICAgIGNvbnN0IGlzUHhTdHlsZSA9IHB4U3R5bGVzLmluZGV4T2YobGFiZWwpID4gLTE7XG4gICAgICBpZiAoaXNQeFN0eWxlICYmICEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgKz0gJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAoaXNQeFN0eWxlICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5pc051bWJlckFycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IGAke3ZhbHVlLmpvaW4oJ3B4ICcpfXB4YDtcbiAgICAgIH1cblxuICAgICAgbXlPYmouc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgdXBkYXRlIHRoZSBzdHlsZXMgb2Ygb3JpZ2luIHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMob3JpZ2luOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9yaWdpbiAhPT0gJ2hlYWRlcicpICYmIChvcmlnaW4gIT09ICdjb250ZW50JykgJiYgKG9yaWdpbiAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuY2tub3cgb3JpZ2luICcgKyBvcmlnaW4pO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZXNbb3JpZ2luXS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHdpZGdldC5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHdpZGdldC5zdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi53aWRnZXQuc3R5bGVzfTtcblxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBzZXQgdGhlIHN0eWxlIG9mIHRoZSB3aG9sZSByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZS5uZXh0KChzdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICBpZiAoc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgc3R5bGVzID0ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZXNbbGFiZWxdID0gdmFsdWU7XG4gICAgICAgIHN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLnN0eWxlc307XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgZm9ybXNcbiAgICpcbiAgICogQHBhcmFtIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0Rm9ybXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIHRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlLm5leHQoKF9mb3JtOiBBamZGb3JtW10pOiBBamZGb3JtW10gPT4ge1xuICAgICAgcmV0dXJuIGZvcm1zIHx8IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDdXN0b21XaWRnZXRzKHdpZGdldDogQWpmQ3VzdG9tV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzID0gY3VzdG9tV2lkZ2V0cyB8fCBbXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlc2V0Q3VzdG9tV2lkZ2V0cygpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGxhYmVsIG9mIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY2hhbmdlTGFiZWxDdXN0b21XaWRnZXQobGFiZWw6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzW3Bvc2l0aW9uXS50eXBlID0gbGFiZWw7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9oZWFkZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRIZWFkZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfY29udGVudFdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbnRlbnRXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2Zvb3RlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZGZvb3RlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCBzcHJlYWRWYWx1ZTogYW55O1xuICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gdmFsdWU7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgc3ByZWFkVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gdGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb2x1bW4gb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBXaGVuIGFkZGluZyBhIGNvbHVtbiB0aGUgd2lkdGggb2YgdGhlIG90aGVyIGNvbHVtbnMgaXMgcmVjYWxjdWxhdGVkXG4gICAqIGJ5IGRpdmlkaW5nIGl0IGJ5IHRoZSBudW1iZXIgb2YgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IHRlbXBPYmo6IG51bWJlcltdID0gW107XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGggKyAxO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCB0bXBWYWx1ZTogYW55O1xuXG4gICAgICBpZiAobnVtID4gMTApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleGNlZWQgbWF4IGNvbHVtbnMnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPT09IC0xKSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2godmFsdWUpO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICB0bXBWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgdGVtcE9ialswXSAtPSB0bXBWYWx1ZTtcbiAgICAgICAgdGVtcE9ialswXSA9IHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIHRlbXBPYmpbMF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBteU9iai5jb2x1bW5zID0gdGVtcE9iajtcblxuICAgICAgLy8gVE9ETzogQHRyaWsgd2hhdCdzIHZhbHVlPyE/XG4gICAgICBjb25zdCBjb2x1bW5PYmogPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiA3LFxuICAgICAgICAvLyB2YWx1ZTogbXlPYmouY29sdW1uc1tteU9iai5jb2x1bW5zLmxlbmd0aCAtIDFdLFxuICAgICAgfSk7XG5cbiAgICAgIG15T2JqLmNvbnRlbnQucHVzaChjb2x1bW5PYmopO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVdpZGdldFRvQ29sdW1uKGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29sdW1uLmNvbnRlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmUgYSB3aWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKiB0aGUgcG9zaXRpb24gYXJyYXk6XG4gICAqXG4gICAqIGhlYWRlciAtYD5gIGhlYWRlcldpZGdldHNcbiAgICogY29udGVudCAtYD5gIGNvbnRlbnRXaWRnZXRzXG4gICAqIGZvb3RlciAtYD5gIGZvb3RlcldpZGdldHNcbiAgICogY29sdW1uIC1gPmAgY29sdW1uIG9mIGxheW91dFxuICAgKiBsYXlvdXRDb250ZW50IC1gPmAgY29udGVudCBvZiBsYXlvdXRcbiAgICogb2JqIC1gPmAgb2JqIG9mIGxheW91dFxuICAgKiBjdXN0b21XaWRnZXQgLWA+YCBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHggdGhlIHBvc2l0aW9uIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlKG5vZGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKG5vZGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgKG15T2JqLmNvbnRlbnRbMF0gYXMgQWpmQ29sdW1uV2lkZ2V0KS5jb250ZW50Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbHVtbic6XG4gICAgICBjYXNlICdsYXlvdXRDb250ZW50JzpcbiAgICAgIGNhc2UgJ3VuZml4ZWRDb2x1bW4nOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgICAgICBpZiAobm9kZSA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgICAgIGxldCBjbG0gPSA8QWpmQ29sdW1uV2lkZ2V0PndpZGdldDtcbiAgICAgICAgICAgIGNsbS5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ2xheW91dENvbnRlbnQnKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIGxlbmd0aCBpcyAwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IHJlbW92ZSBhbnkgd2lkZ2V0IGZyb20gZW1wdHkgY29udGVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPSBudWxsICYmIG15T2JqLmNvbnRlbnRbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ3VuZml4ZWRDb2x1bW4nKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9PSAtMSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gcG9zaXRpb24gdmFsdWUgIGlzbnQgLTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudW5maXhlZENvbHVtbihpZHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiAobm9kZSAhPT0gJ29iaicpIHtcbiAgICAgICAgICAvLyAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAvLyAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b21XaWRnZXRzJzoge1xuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgIH0gYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gbm9kZSAnICsgbm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCBhIEFqZldpZGdldCBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZFRvQ29udGVudChuZXdXaWRnZXQ6IEFqZldpZGdldCwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgaWYgKG15T2JqLmNvbnRlbnRbaWR4XSAhPSBudWxsKSB7XG4gICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDAsIG5ld1dpZGdldCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBhZGRUb0NvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgICAgbGV0IHdpZGdldDogQWpmV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEud2lkZ2V0O1xuICAgICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuXG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2god2lkZ2V0KTtcblxuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tKSB7XG4gICAgICB0aGlzLnJlbW92ZShldmVudC5kcmFnRGF0YS5hcnJheUZyb20sIGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleCk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2goZXZlbnQuZHJhZ0RhdGEud2lkZ2V0KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmpzb24pIHtcbiAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGV2ZW50LmRyYWdEYXRhLmpzb24pO1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvYmogPSB7J3dpZGdldFR5cGUnOiBBamZXaWRnZXRUeXBlW2V2ZW50LmRyYWdEYXRhXX07XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hhbmdlUG9zaXRpb25PbkNvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCB0b0luZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG4gICAgbGV0IGZyb21XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdO1xuICAgIGxldCB0b1dpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdO1xuXG4gICAgaWYgKGZyb21Db2x1bW4gPT0gdG9Db2x1bW4pIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdID0gdG9XaWRnZXQ7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF0gPSBmcm9tV2lkZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZSh0b0luZGV4LCAwLCBmcm9tV2lkZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIHRoZSBvYmogb24gdGhlIGlkeCBwb3NpdGlvbi5cbiAgICogT2JqIGhhdmUgYSBubyBzcGVjaWZpY2F0ZSB3aWR0aCBhbmQgaXMgbm90IGNhbGN1bGF0ZSBhcyBjb2x1bW5zXG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKC0xLCBpZHgpO1xuICB9XG5cbiAgY2hhbmdlQ29sdW1uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgbGF5b3V0V2lkZ2V0OiBBamZMYXlvdXRXaWRnZXQpIHtcbiAgICBpZiAodG8gPCAwIHx8IHRvID49IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZnJvbSA+IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCAtIDEgJiYgdG8gPiBmcm9tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV07XG4gICAgbGV0IGZyb21Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV07XG4gICAgbGV0IHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W3RvXTtcbiAgICBsZXQgdG9Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dO1xuXG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV0gPSB0b0NvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXSA9IHRvQ29sdW1uVmFsdWU7XG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dID0gZnJvbUNvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b10gPSBmcm9tQ29sdW1uVmFsdWU7XG5cbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobGF5b3V0V2lkZ2V0KTtcbiAgfVxuXG4gIGFkZEN1c3RvbUNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91cGRhdGVzWydjb2xvciddLm5leHQoKGNvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICBpZiAoY29sb3JzLmluZGV4T2YoY29sb3IpIDwgMCkge1xuICAgICAgICBjb2xvcnMucHVzaChjb2xvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3JzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkV2lkZ2V0VG9Db250YWluZXIoXG4gICAgICBzdWJqOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+LCB3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBzdWJqLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQod2lkZ2V0KTtcbiAgICB0aGlzLnNldEVtcHR5Q29udGVudChmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBhcnIgPSAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdIGFzIGFueVtdO1xuICAgICAgYXJyLnB1c2godmFsdWUpO1xuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IGFycjtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAoKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSBhcyBhbnlbXSkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG59XG4iXX0=