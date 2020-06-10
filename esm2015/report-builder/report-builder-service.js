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
let AjfReportBuilderService = /** @class */ (() => {
    class AjfReportBuilderService {
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
                .subscribe((r) => {
                let obj = {};
                // const curRo = r[0][1];
                // const forms = r[0][2] != null ? r[0][2] || []
                //     : (curRo != null ? curRo.forms || [] : []);
                obj.header = { content: r[1].widgets.map(w => deepCopy(w)), styles: r[1].styles };
                obj.content = { content: r[2].widgets.map(w => deepCopy(w)), styles: r[2].styles };
                obj.footer = { content: r[3].widgets.map(w => deepCopy(w)), styles: r[3].styles };
                obj.styles = r[4];
                const ro = {
                    header: { content: r[1].widgets, styles: r[1].styles },
                    content: { content: r[2].widgets, styles: r[2].styles },
                    footer: { content: r[3].widgets, styles: r[3].styles },
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
    /** @nocollapse */
    AjfReportBuilderService.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
    ];
    return AjfReportBuilderService;
})();
export { AjfReportBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFNUM7Ozs7R0FJRztBQUNIO0lBQUEsTUFDYSx1QkFBdUI7UUFpT2xDOzs7O1dBSUc7UUFDSCxZQUFvRCxhQUErQjtZQS9OM0UseUJBQW9CLEdBQ3hCLElBQUksT0FBTyxFQUE2QixDQUFDO1lBUXJDLGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7WUFRdkQsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7WUFFbEUsZUFBVSxHQUE4QixJ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Q2YsTUFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDaEMsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRU8scUNBQXFDLENBQUMsUUFBZ0IsRUFBRSxHQUFXO1lBQ3pFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUMxRCxNQUFjLENBQUMsUUFBUSxDQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDOzs7Z0JBeDlERixVQUFVOzs7O2dEQXVPSSxRQUFRLFlBQUksTUFBTSxTQUFDLGtCQUFrQjs7SUFrdkRwRCw4QkFBQztLQUFBO1NBeDlEWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmRm9ybSwgQWpmTm9kZSwgQWpmTm9kZVR5cGUsIGZsYXR0ZW5Ob2Rlc30gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmRm9ybXVsYSwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvbixcbiAgQWpmQ2hhcnRXaWRnZXQsXG4gIEFqZkNvbHVtbldpZGdldCxcbiAgQWpmQ3VzdG9tV2lkZ2V0LFxuICBBamZEYXRhV2lkZ2V0LFxuICBBamZJbWFnZVdpZGdldCxcbiAgQWpmTGF5b3V0V2lkZ2V0LFxuICBBamZSZXBvcnQsXG4gIEFqZlJlcG9ydENvbnRhaW5lcixcbiAgQWpmU3R5bGVzLFxuICBBamZUYWJsZVdpZGdldCxcbiAgQWpmVGV4dFdpZGdldCxcbiAgQWpmV2lkZ2V0LFxuICBBamZXaWRnZXRUeXBlLFxuICBjcmVhdGVBZ2dyZWdhdGlvbixcbiAgY3JlYXRlV2lkZ2V0XG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjb21iaW5lTGF0ZXN0LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGhcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXMsIEFqZlJlcG9ydEljb25zLCBBamZSZXBvcnRzQ29uZmlnLCBBamZXaWRnZXRzQ29udGFpbmVyfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZDb2xvck9wZXJhdGlvbixcbiAgQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbixcbiAgQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbixcbiAgQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24sXG4gIEFqZlN0eWxlc09wZXJhdGlvbixcbiAgQWpmV2lkZ2V0T3BlcmF0aW9uLFxuICBBamZXaWRnZXRzT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5pbXBvcnQge0FKRl9SRVBPUlRTX0NPTkZJR30gZnJvbSAnLi90b2tlbnMnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBjb250YWlucyBhbGwgdGhlIGxvZ2ljIHRvIG1vZGVsIHRoZSByZXBvcnQgd2lkZ2V0LlxuICpcbiAqIEBleHBvcnRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlIHtcbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VzdG9tV2lkZ2V0cyBvYmpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPjtcbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50IHdpZGdldC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW46IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfb3JpZ2luVXBkYXRlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBleHBvcnRlZCBqc29uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnQ6IE9ic2VydmFibGU8QWpmUmVwb3J0PjtcbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnRVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0PiA9IG5ldyBTdWJqZWN0PEFqZlJlcG9ydD4oKTtcblxuICBwcml2YXRlIF9qc29uU3RhY2s6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG5cbiAgcHJpdmF0ZSBfbGFzdERlbGV0ZWRKc29uOiBzdHJpbmd8dW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2VtcHR5Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbkRyYWdnZWRVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgcHJpdmF0ZSBfb25PdmVyOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbk92ZXJVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdGF0dXMgb2YgcGVybWFuZW50IHpvb21cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9maXhlZFpvb206IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXI6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXJVcGRhdGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgaGVhZGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgaGVhZGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgY29udGVudCB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY29udGVudCBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuXG4gIHByaXZhdGUgX2NvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcHJpdmF0ZSBfY29sb3JVcGRhdGU6IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRDb2xvcjogc3RyaW5nW10gPSBbXG4gICAgJ3JnYmEoMCwgMCwgMCwgMSknLCAgICAgICAncmdiYSg1MSwgMTUzLCAyNTUsIDEpJywgICdyZ2JhKDE1MywgMjA0LCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxMDIsIDAsIDEpJywgICAncmdiYSgwLCAyMDQsIDIwNCwgMSknLCAgICdyZ2JhKDIwNCwgMjA0LCAxNTMsIDEpJyxcbiAgICAncmdiYSgyNTUsIDE1MywgMCwgMSknLCAgICdyZ2JhKDIzMCwgMCwgMCwgMSknLCAgICAgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJyxcbiAgICAncmdiYSgyNTUsIDI1NSwgMCwgMSknLCAgICdyZ2JhKDAsIDEzOCwgMCwgMSknLCAgICAgJ3JnYmEoMCwgMTAyLCAyMDQsIDEpJyxcbiAgICAncmdiYSgxNTMsIDUxLCAyNTUsIDEpJywgICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJywgJ3JnYmEoMjUwLCAyMDQsIDIwNCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjM1LCAyMDQsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDIwNCwgMSknLCAncmdiYSgyMDQsIDIzMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjA0LCAyMjQsIDI0NSwgMSknLCAncmdiYSgyMzUsIDIxNCwgMjU1LCAxKScsICdyZ2JhKDE4NywgMTg3LCAxODcsIDEpJyxcbiAgICAncmdiYSgyNDAsIDEwMiwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMTk0LCAxMDIsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDEwMiwgMSknLFxuICAgICdyZ2JhKDEwMiwgMTg1LCAxMDIsIDEpJywgJ3JnYmEoMTAyLCAxNjMsIDIyNCwgMSknLCAncmdiYSgxOTQsIDEzMywgMjU1LCAxKScsXG4gICAgJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMSknLCAncmdiYSgxNjEsIDAsIDAsIDEpJywgICAgICdyZ2JhKDE3OCwgMTA3LCAwLCAxKScsXG4gICAgJ3JnYmEoMTc4LCAxNzgsIDAsIDEpJywgICAncmdiYSgwLCA5NywgMCwgMSknLCAgICAgICdyZ2JhKDAsIDcxLCAxNzgsIDEpJyxcbiAgICAncmdiYSgxMDcsIDM2LCAxNzgsIDEpJywgICdyZ2JhKDY4LCA2OCwgNjgsIDEpJywgICAgJ3JnYmEoOTIsIDAsIDAsIDEpJyxcbiAgICAncmdiYSgxMDIsIDYxLCAwLCAxKScsICAgICdyZ2JhKDEwMiwgMTAyLCAwLCAxKScsICAgJ3JnYmEoMCwgNTUsIDAsIDEpJyxcbiAgICAncmdiYSgwLCA0MSwgMTAyLCAxKScsICAgICdyZ2JhKDYxLCAyMCwgMTAyLCAxKSdcbiAgXTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXJyZW50IHdpZGdldCB3aGljaCBob2xkcyB0aGUgZm9jdXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD47XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCB1cGRhdGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgY29udGFpbnMgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnR8bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZlJlcG9ydHxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdHlsZXMgb2YgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXNVcGRhdGU6IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgZm9ybXMgZmV0Y2hlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT47XG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zVXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogZGljdGlvbmFyeSBmb3IgIHdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVzOiBhbnkgPSB7XG4gICAgaGVhZGVyOiB0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbnRlbnQ6IHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLFxuICAgIGZvb3RlcjogdGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb2xvcjogdGhpcy5fY29sb3JVcGRhdGUsXG4gICAgY3VzdG9tV2lkZ2V0czogdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gd29udCB0byBzYXZlIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnRFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3NhdmVGb3JtdWxhVE9IdG1sOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldEZvcm11bGFUb0h0bWxFdmVudCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gY29sdW1uIHdpZHRoIGNoYW5nZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaWNvblNldHM6IEFqZlJlcG9ydEljb25zID0geydhamYtaWNvbic6IFtdfTtcbiAgZ2V0IGljb25TZXRzKCk6IEFqZlJlcG9ydEljb25zIHtcbiAgICByZXR1cm4gdGhpcy5faWNvblNldHM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KEFKRl9SRVBPUlRTX0NPTkZJRykgcmVwb3J0c0NvbmZpZzogQWpmUmVwb3J0c0NvbmZpZykge1xuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuXG4gICAgaWYgKHJlcG9ydHNDb25maWcgIT0gbnVsbCkge1xuICAgICAgaWYgKHJlcG9ydHNDb25maWcuaWNvbnMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9pY29uU2V0cyA9IHsuLi50aGlzLl9pY29uU2V0cywgLi4ucmVwb3J0c0NvbmZpZy5pY29uc307XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fb3JpZ2luID0gKDxPYnNlcnZhYmxlPHN0cmluZz4+dGhpcy5fb3JpZ2luVXBkYXRlKS5waXBlKHN0YXJ0V2l0aCgnaGVhZGVyJyksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fc2F2ZWRSZXBvcnQgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Pj50aGlzLl9zYXZlZFJlcG9ydFVwZGF0ZSkucGlwZShzaGFyZSgpKTtcblxuICAgIHRoaXMuX29uRHJhZ2dlZCA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9vbkRyYWdnZWRVcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbk92ZXIgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25PdmVyVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fZml4ZWRab29tID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2ZpeGVkWm9vbVVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX29uRHJhZ0VudGVyID0gdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUucGlwZShzaGFyZSgpKTtcblxuICAgIHRoaXMuX3JlcG9ydFN0eWxlcyA9ICg8T2JzZXJ2YWJsZTxBamZTdHlsZXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2Nhbigoc3R5bGVzOiBBamZTdHlsZXMsIG9wOiBBamZTdHlsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aoc3R5bGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgPEFqZlN0eWxlcz57fSksIHNoYXJlKCksIHN0YXJ0V2l0aCg8QWpmU3R5bGVzPnt9KSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3JtcyA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4+dGhpcy5fcmVwb3J0Rm9ybXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2NhbigoZm9ybXM6IEFqZkZvcm1bXSwgb3A6IEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3AoZm9ybXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+PnRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShzY2FuKCh3aWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSwgb3A6IEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2Zvcm1zVmFyaWFibGVzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24+PnRoaXMuX2Zvcm1zVmFyaWFibGVzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9jb25kaXRpb25OYW1lcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5faGVhZGVyV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9oZWFkZXJTdHlsZXMgPSB0aGlzLl9oZWFkZXJXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9jb250ZW50V2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9jb250ZW50U3R5bGVzID0gdGhpcy5fY29udGVudFdpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2Zvb3RlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzID0gdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29sb3IgPSAoPE9ic2VydmFibGU8QWpmQ29sb3JPcGVyYXRpb24+PnRoaXMuX2NvbG9yVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGNvbG9yOiBzdHJpbmdbXSwgb3A6IEFqZkNvbG9yT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3AoY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuX2RlZmF1bHRDb2xvciksIHNoYXJlKCksIHN0YXJ0V2l0aCh0aGlzLl9kZWZhdWx0Q29sb3IpKTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXQgPSB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLnBpcGUoXG4gICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgIG1hcChzID0+IHMhKSxcbiAgICAgICAgc2NhbihcbiAgICAgICAgICAgICh3aWRnZXQ6IEFqZldpZGdldHxudWxsLCBvcDogQWpmV2lkZ2V0T3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bGwgYXMgdW5rbm93biBhcyBBamZXaWRnZXQpLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1xuICAgICAgICAucGlwZShmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSwgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNcbiAgICAgICAgLnBpcGUoZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksIG1hcCgoZm9ybXM6IEFqZkZvcm1bXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2M6IEFqZkZvcm1WYXJpYWJsZXNbXSk6IEFqZkZvcm1WYXJpYWJsZXNbXSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKTtcblxuICAgIGNvbnN0IHJlcG9ydE9icyA9IHRoaXMuX3JlcG9ydDtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgICAgICAgIGxldCB0ZW1wQ29sb3JzOiBzdHJpbmdbXSA9IHRoaXMuX2RlZmF1bHRDb2xvcjtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgaWYgKHIuY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmNvbnRlbnQuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoci5mb290ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5mb290ZXIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoci5oZWFkZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5oZWFkZXIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHIuaGVhZGVyLmNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGxldCBvYmogPSByLmhlYWRlci5jb250ZW50W2ldO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKG9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGF5b3V0T2JqID0gb2JqIGFzIEFqZkxheW91dFdpZGdldDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXlvdXRPYmouY29udGVudC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW5PYmogPSBsYXlvdXRPYmouY29udGVudFtqXSBhcyBBamZDb2x1bW5XaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKGNvbHVtbk9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgY29sdW1uT2JqLmNvbnRlbnQubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWRnZXRPYmogPSBjb2x1bW5PYmouY29udGVudFt6XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcih3aWRnZXRPYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiA8c3RyaW5nW10+dGVtcENvbG9ycztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9jb2xvclVwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3N0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5zdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz57fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnIuc3R5bGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5oZWFkZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5oZWFkZXIuY29udGVudCB8fCBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHIuaGVhZGVyLnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmNvbnRlbnQuY29udGVudCB8fCBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHIuY29udGVudC5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5mb290ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5mb290ZXIuY29udGVudCB8fCBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHIuZm9vdGVyLnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydC5waXBlKG1hcCgoanNvbjogYW55KSA9PiB7XG4gICAgICByZXR1cm4gKF9yOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgICBpZiAoanNvbiA9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICB9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudFxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QodGhpcy5yZXBvcnQsIHRoaXMucmVwb3J0Rm9ybXMpLFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdChcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWFkZXJXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGVudFdpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9mb290ZXJXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwb3J0U3R5bGVzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgLnN1YnNjcmliZSgocjogW1xuICAgICAgICAgICAgICAgICAgICAgW3ZvaWQsIEFqZlJlcG9ydCB8IG51bGwsIEFqZkZvcm1bXV0sIEFqZldpZGdldHNDb250YWluZXIsIEFqZldpZGdldHNDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgICBBamZXaWRnZXRzQ29udGFpbmVyLCBBamZTdHlsZXNcbiAgICAgICAgICAgICAgICAgICBdKSA9PiB7XG4gICAgICAgICAgbGV0IG9iajogYW55ID0ge307XG4gICAgICAgICAgLy8gY29uc3QgY3VyUm8gPSByWzBdWzFdO1xuICAgICAgICAgIC8vIGNvbnN0IGZvcm1zID0gclswXVsyXSAhPSBudWxsID8gclswXVsyXSB8fCBbXVxuICAgICAgICAgIC8vICAgICA6IChjdXJSbyAhPSBudWxsID8gY3VyUm8uZm9ybXMgfHwgW10gOiBbXSk7XG5cbiAgICAgICAgICBvYmouaGVhZGVyID0ge2NvbnRlbnQ6IHJbMV0ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclsxXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouY29udGVudCA9IHtjb250ZW50OiByWzJdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbMl0uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLmZvb3RlciA9IHtjb250ZW50OiByWzNdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbM10uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLnN0eWxlcyA9IHJbNF07XG5cbiAgICAgICAgICBjb25zdCBybyA9IHtcbiAgICAgICAgICAgIGhlYWRlcjoge2NvbnRlbnQ6IHJbMV0ud2lkZ2V0cywgc3R5bGVzOiByWzFdLnN0eWxlc30sXG4gICAgICAgICAgICBjb250ZW50OiB7Y29udGVudDogclsyXS53aWRnZXRzLCBzdHlsZXM6IHJbMl0uc3R5bGVzfSxcbiAgICAgICAgICAgIGZvb3Rlcjoge2NvbnRlbnQ6IHJbM10ud2lkZ2V0cywgc3R5bGVzOiByWzNdLnN0eWxlc30sXG4gICAgICAgICAgICBzdHlsZXM6IHJbNF1cbiAgICAgICAgICB9IGFzIEFqZlJlcG9ydDtcblxuICAgICAgICAgIHRoaXMuc2V0U2F2ZVJlcG9ydChvYmopO1xuICAgICAgICAgIHRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlLm5leHQocm8pO1xuICAgICAgICAgIHRoaXMucHVzaEpzb25TdGFjayhKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIGZ1bmN0aW9uc1xuICAgKlxuICAgKi9cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIHJlbW92ZSBBamZOb2RlR3JvdXAsIEFqZlNsaWRlLCBBamZSZXBlYXRpbmdTbGlkZSwgQWpmU3RyaW5nRmllbGQgZnJvbSBhamZub2RlIGFycmF5XG4gICAqXG4gICAqIEBwYXJhbSBub2Rlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpbHRlck5vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXAgfHwgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHxcbiAgICAgICAgICBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSB8fFxuICAgICAgICAgIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZGaWVsZCAmJlxuICAgICAgICAgICAobm9kZSBhcyBBamZGaWVsZCkuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuU3RyaW5nKSkge1xuICAgICAgICBub2Rlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgcGFyc2VDb2xvcihjc3NTdHlsZXM6IGFueSwgY29sb3JzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IHN0eWxlS2V5cyA9IFsnYmFja2dyb3VuZC1jb2xvcicsICdiYWNrZ3JvdW5kQ29sb3InLCAnY29sb3InXTtcbiAgICBzdHlsZUtleXMuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGNzc1N0eWxlc1trXSAmJiBjb2xvcnMuaW5kZXhPZihjc3NTdHlsZXNba10pID09IC0xKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNzc1N0eWxlc1trXSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmaWxsRm9ybXNWYXJpYWJsZXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIGxldCB2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhcmlhYmxlc1tpXSA9IHtub2RlczogW10sIGxhYmVsczogW10sIG5hbWVzOiBbXSwgdHlwZXM6IFtdfTtcblxuICAgICAgaWYgKGZvcm1zW2ldLm5vZGVzICE9IG51bGwgJiYgZm9ybXNbaV0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXJpYWJsZXNbaV0ubm9kZXMgPSB0aGlzLmZpbHRlck5vZGVzKGZsYXR0ZW5Ob2Rlcyhmb3Jtc1tpXS5ub2RlcykpO1xuICAgICAgfVxuICAgICAgdmFyaWFibGVzW2ldLmxhYmVscyA9IHRoaXMuZXh0cmFjdExhYmVsc05vZGVzKHZhcmlhYmxlc1tpXS5ub2Rlcyk7XG4gICAgICB2YXJpYWJsZXNbaV0ubmFtZXMgPSB0aGlzLmV4dHJhY3ROYW1lc05vZGVzKHZhcmlhYmxlc1tpXS5ub2Rlcyk7XG4gICAgICB2YXJpYWJsZXNbaV0udHlwZXMgPSB0aGlzLmV4dHJhY3RUeXBlc05vZGVzKHZhcmlhYmxlc1tpXS5ub2Rlcyk7XG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXM7XG4gIH1cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiAgdGhlIG9iaiByZXR1cm5lZCBjb250YWlucyB0aGUgbGFiZWwgZmllbGQgb2YgYWpmTm9kZVxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBleHRyYWN0TGFiZWxzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5sYWJlbCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBleHRyYWN0TmFtZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGV4dHJhY3RUeXBlc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IEFqZkZpZWxkVHlwZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHA6IEFqZkZpZWxkID0gPEFqZkZpZWxkPm5vZGVzW2ldO1xuICAgICAgb2JqLnB1c2gocC5maWVsZFR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc2V0T3JpZ2luKG9yaWdpbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb3JpZ2luVXBkYXRlLm5leHQob3JpZ2luKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyBtZXRob2Qgcm91bmQgdGhlIHZhbHVlIHRvIHRoZSBkZWNpbWFsIHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcGFyYW0gZGVjaW1hbHBvc2l0aW9uc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJvdW5kVG8odmFsdWU6IG51bWJlciwgZGVjaW1hbFBvc2l0aW9uczogbnVtYmVyKSB7XG4gICAgbGV0IGkgPSB2YWx1ZSAqIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcblxuICAgIGkgPSBNYXRoLmZsb29yKGkpO1xuXG4gICAgcmV0dXJuIGkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgdmFsaWRhdG9yIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaXNOdW1iZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXlxcZCsoXFwuXFxkKyk/Ly50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIGlzTnVtYmVyQXJyYXkodmFsdWU6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLmlzTnVtYmVyKHZhbHVlW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnZ2VkIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uRHJhZ2dlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdnZWQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbk92ZXIgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25PdmVyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uT3ZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2ZpeGVkWm9vbSBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmaXhlZFpvb20oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkWm9vbTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgY2hhbmdlIHN0YXR1cyBvZiBfZml4ZWRab29tIGluIHRydWVcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21JbigpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgY2hhbmdlIHN0YXR1cyBvZiBfZml4ZWRab29tIGluIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tT3V0KCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ0VudGVyIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uRHJhZ0VudGVyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ0VudGVyO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ0VudGVyIHdpdGggIHNlY3Rpb24oaGVhZGVyLGNvbnRlbnQsZm9vdGVyKSBhbmQgaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnRW50ZXIoYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLm5leHQoe2FycmF5LCBpbmRleH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uZHJhZ2dlZCB3aXRoIHRydWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnU3RhcnRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdnZWQgd2l0aCBmYWxzZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG5cbiAgZHJhZ0VuZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uT3ZlciB3aXRoIHRydWVcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBvdmVyU3RhcnRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBfb25PdmVyIHdpdGggZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBvdmVyRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0xlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLm5leHQoe30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZW1pdCBzYXZlIHJlcG9ydCBldmVudFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNhdmVSZXBvcnQoKSB7XG4gICAgaWYgKHRoaXMuX3NhdmVSZXBvcnRFdmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVJbWFnZUZvcm11bGEoZm9ybXVsYTogQWpmRm9ybXVsYSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgY29uc3QgdyA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIHcuZmxhZyA9IGZvcm11bGE7XG4gICAgICB3Lmljb24gPSBmb3JtdWxhO1xuICAgICAgcmV0dXJuIHc7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlRm9ybXVsYVRvSHRtbChodG1sRm9ybXVsYTogc3RyaW5nLCByZWZlcmVuY2U6IGFueSkge1xuICAgIGlmICh0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBvYmogPSB7J2Zvcm11bGEnOiBodG1sRm9ybXVsYSwgJ3JlZmVyZW5jZSc6IHJlZmVyZW5jZX07XG4gICAgICB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbC5lbWl0KG9iaik7XG4gICAgfVxuICB9XG5cbiAgc2V0RW1wdHlDb250ZW50KHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2VtcHR5Q29udGVudC5uZXh0KHZhbCk7XG4gIH1cblxuXG4gIHB1c2hKc29uU3RhY2soanNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGN1cnJlbnRTdGFjayA9IHRoaXMuX2pzb25TdGFjay5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5pbmRleE9mKGpzb24pID09PSAtMSAmJiBqc29uICE9PSB0aGlzLl9sYXN0RGVsZXRlZEpzb24pIHtcbiAgICAgIGN1cnJlbnRTdGFjay5wdXNoKGpzb24pO1xuICAgIH1cblxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG4gIH1cblxuICBwb3BKc29uU3RhY2soKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgbGV0IGVtcHR5SnNvbiA9ICd7XCJoZWFkZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sJyArXG4gICAgICAgICdcImNvbnRlbnRcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sXCInICtcbiAgICAgICAgJ2Zvb3RlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcInN0eWxlc1wiOnt9fSc7XG4gICAgbGV0IGN1cnJlbnRTdGFjayA9IHRoaXMuX2pzb25TdGFjay5nZXRWYWx1ZSgpO1xuICAgIGN1cnJlbnRTdGFjay5wb3AoKTtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSBjdXJyZW50U3RhY2sucG9wKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcbiAgICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KFtdKTtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KHRydWUpO1xuICAgICAgcmV0dXJuIGVtcHR5SnNvbjtcbiAgICB9XG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcblxuICAgIHJldHVybiB0aGlzLl9sYXN0RGVsZXRlZEpzb247XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGVtaXR0ZXJcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbHVtbldpZHRoQ2hhbmdlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfY3VzdG9tV2lkZ2V0cyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXN0b21XaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQ29udGVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50V2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbnRlbnQgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbG9ycyBvZiByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbG9ycygpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG5cbiAgZ2V0IGVtcHR5Q29udGVudCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZW1wdHlDb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVBcnJheVdpZGdldHModHlwZTogc3RyaW5nLCBuZXdXaWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpIHtcbiAgICBpZiAoKHR5cGUgIT09ICdoZWFkZXInKSAmJiAodHlwZSAhPT0gJ2NvbnRlbnQnKSAmJiAodHlwZSAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSAnICsgdHlwZSk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZXNbdHlwZV0ubmV4dCgoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9mb3Jtc1ZhcmlhYmxlcyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3Jtc1ZhcmlhYmxlcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mb3Jtc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGdldCBjb25kaXRpb25OYW1lcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25kaXRpb25OYW1lcztcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VycmVudFdpZGdldCgpOiBPYnNlcnZhYmxlPEFqZldpZGdldHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRXaWRnZXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgVXBkYXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlIHdpdGggbmV3V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQ3VycmVudFdpZGdldChuZXdXaWRnZXQ6IEFqZldpZGdldHxudWxsKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KChfd2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBnZXRTYXZlUmVwb3J0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVSZXBvcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9qc29uU2F2ZWRSZXBvcnQgb2Jlc2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFNhdmVkKCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVkUmVwb3J0O1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRTdHlsZXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydEZvcm1zIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydEZvcm1zKCk6IE9ic2VydmFibGU8QWpmRm9ybVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydEZvcm1zO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgX29yaWdpbiBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvcmlnaW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFzc2lnbnMgdGhlIG5ldyB3aWR0aCB0byB0aGUgaWR4IGNvbHVtblxuICAgKiBhbmQgcmVjYWxjdWxhdGVzIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgb2YgdGhlIGxheW91dC5cbiAgICogVGhlIHJhbmdlIHZhbHVlIGFyZSBmcm9tIDAsMSB0byAxLlxuICAgKlxuICAgKiBSVUxFUzpcbiAgICogVGhlIG1pbiB2YWx1ZSBmb3IgY29sdW1uIGlzIDAsMS5cbiAgICogVGhlIHN1bSBvZiBhbGwgY29sdW1ucyB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICogVGhlIG1ldGhvZCByb3VuZCB0aGUgdmFsdWVzLlxuICAgKiBJZiBpcyBwcmVzZW50IG9ubHkgb25lIGNvbHVtbiB0aGUgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPmAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGRlY3JlYXNlcy5cbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA8YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgaW5jcmVhc2VzLlxuICAgKlxuICAgKiBXaGVuIHZhbHVlcyDigIvigIthcmUgcGVyaW9kaWMsIHJvdW5kaW5nIGFzc2lnbnMgdGhlIGdhcCB0byB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogRm9yIGV4YW1wbGU6IDMgY29sdW1ucyB3aXRoIDAsMzMgYmVsaWV2ZSAxIGNvbHVtbiAwLDM0IGFuZCAyIGNvbHVtbnMgMCwzMy5cbiAgICpcbiAgICogQHBhcmFtIG5ld1ZhbHVlXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpbnN0YW50Q29sdW1uVmFsdWUobmV3VmFsdWU6IG51bWJlciwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBsZXQgc2l6ZSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuXG4gICAgICBsZXQgc3ByZWFkVmFsdWUgPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGxldCBpZHhGaXJzdE5vT2JqID0gLTE7XG5cbiAgICAgIGxldCBhZGQgPSBmYWxzZTtcbiAgICAgIGxldCBmb3VuZEZpcnN0Tm9PYmogPSBmYWxzZTtcblxuICAgICAgbGV0IHJlMSA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XVswLTldJCknKTtcbiAgICAgIGxldCByZTIgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV0kKScpO1xuICAgICAgbGV0IHJlMyA9IG5ldyBSZWdFeHAoJ15bMV0kJyk7XG5cbiAgICAgIGxldCBvbGRWYWx1ZSA9IG15T2JqLmNvbHVtbnNbaWR4XTtcblxuICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKG5ld1ZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob2xkVmFsdWUgPT0gLTEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICAgIG9iak51bS0tO1xuICAgICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChzaXplIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDAuMTtcbiAgICAgIH0gZWxzZSBpZiAob2xkVmFsdWUgPCAwLjEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICB9XG5cblxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSAtMSkge1xuICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zWzBdID0gMTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUgPCAwLjEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDAuMTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdWYWx1ZSArIDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSkgPiAxKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAxIC0gKDAuMSAqIChzaXplIC0gb2JqTnVtIC0gMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpICYmIChvbGRWYWx1ZSA9PT0gMC4xKSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRWYWx1ZSA+IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChvbGRWYWx1ZSAtIG5ld1ZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWRkID0gZmFsc2U7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAobmV3VmFsdWUgLSBvbGRWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3ByZWFkVmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKHNwcmVhZFZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICBpZiAoc3ByZWFkVmFsdWUgPCAwLjAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAwLjE7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gLTE7XG4gICAgICAgIG9iak51bSsrO1xuICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChvbGRWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG4gICAgICAgICAgaWYgKChpID09IGlkeCkpIHtcbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmICgobXlPYmouY29sdW1uc1tpXSA+IDAuOSkgJiYgKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gb2JqTnVtICE9IDEpKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuOTA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPCAwLjEpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC4xMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2ldLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICAgIHN1bSArPSBteU9iai5jb2x1bW5zW2ldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmogPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlkeEZpcnN0Tm9PYmogPSBpO1xuICAgICAgICAgICAgZm91bmRGaXJzdE5vT2JqID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSAtMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaikge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4Rmlyc3ROb09ial0gKz0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdICE9PSAtMSAmJiAhcmUxLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJlxuICAgICAgICAgICAgIXJlMi50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiYgIXJlMy50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkpIHtcbiAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgwLjEwLCBqKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyLmVtaXQoKTtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBpbWFnZVVybCBvbiB0aGUgY3VycmVudCBBamZJbWFnZVdpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIGltYWdlVXJsXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0SW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmoudXJsID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpbWFnZVVybH1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEljb24oaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ30pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmljb24gPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ljb259XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmZsYWcgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke3ZhbHVlfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNvbmRpdGlvbihjb25kaXRpb25UZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAod2lkZ2V0LnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgICB3aWRnZXQudmlzaWJpbGl0eS5jb25kaXRpb24gPSBjb25kaXRpb25UZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDaGFydEZvcm11bGEoXG4gICAgICBfbGFiZWw6IHN0cmluZywgX2xldmVsOiBudW1iZXIsIF9tYWluSW5kZXg6IG51bWJlciwgX2luZGV4OiBudW1iZXIsIGZvcm11bGFUZXh0OiBzdHJpbmcsXG4gICAgICBhZ2dyZWdhdGlvblR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZDaGFydFdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQgIT0gbnVsbCAmJiB3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSByb3cgdGhhdCBjb250YWlucyBtYWluIGRhdGEgaXMgZGVmaW5lZFxuICAgICAgICAvKiBpZiAod2lkZ2V0LmRhdGFzZXRbMF0gPT0gbnVsbCkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV2ZWwgPT0gMCAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0WzBdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT0gMSAmJiBtYWluSW5kZXggPT0gLTEgJiYgaW5kZXggPT0gLTEpIHtcblxuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXggKyAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVUYWJsZUZvcm11bGEoXG4gICAgICBfbGFiZWw6IHN0cmluZywgYWdncmVnYXRpb25UeXBlOiBudW1iZXIsIGZvcm11bGFUZXh0OiBzdHJpbmcsIF9tYWluSW5kZXg6IG51bWJlcixcbiAgICAgIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXQgPSBuZXcgQWpmRGF0YXNldCgpO1xuICAgICAgICAvLyBsZXQgcm93RGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8qIGlmIChtYWluSW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnZGF0YXNldCcsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZEYXRhV2lkZ2V0PndpZGdldDtcblxuICAgICAgLyogaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgdHlwZSBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ3R5cGUnLCB0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgIGlkeCBlbGVtZW50IG9mIHhMYWJlbHMgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZU1haW5EYXRhKF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvLyBteU9iai5kYXRhc2V0WzBdLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVSZWxhdGVkRGF0YShfbWFpbklkeDogbnVtYmVyLCBfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLyogaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSWR4ICsgMSwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JZHggKyAxXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIGJhY2tncm91bmRDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIGFkZENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYm9yZGVyQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJXaWR0aCcsIHZhbHVlKTtcbiAgfVxuXG4gIGFkZENoYXJ0Qm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0KHJlcG9ydDogQWpmUmVwb3J0KTogdm9pZCB7XG4gICAgdGhpcy5fcmVwb3J0Lm5leHQocmVwb3J0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTYXZlUmVwb3J0KGpzb246IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVSZXBvcnQubmV4dChqc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGZvbnQgYXR0cmlidXRlIG9uIHRoZSBjdXJyZW50IEFqZldpZGdldC5cbiAgICpcbiAgICogVGhlcmUgaXMgYSBjaGVjayBvbiBmb250LXNpemUgYXR0cmlidXRlLFxuICAgKiBpZiBpcyBubyBzcGVjaWZpY2F0ZSB0aGUgdHlwZSBvZiBzaXplIGZvbnQgc2V0ICdwdCcgYXMgZGVmYXVsdC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZlRleHRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBjb25zdCBweFN0eWxlcyA9XG4gICAgICAgICAgWydmb250LXNpemUnLCAnaGVpZ2h0JywgJ3dpZHRoJywgJ2JvcmRlci13aWR0aCcsICdib3JkZXItcmFkaXVzJywgJ3BhZGRpbmcnLCAnbWFyZ2luJ107XG4gICAgICBjb25zdCBpc1B4U3R5bGUgPSBweFN0eWxlcy5pbmRleE9mKGxhYmVsKSA+IC0xO1xuICAgICAgaWYgKGlzUHhTdHlsZSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICdweCc7XG4gICAgICB9IGVsc2UgaWYgKGlzUHhTdHlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuaXNOdW1iZXJBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBgJHt2YWx1ZS5qb2luKCdweCAnKX1weGA7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHVwZGF0ZSB0aGUgc3R5bGVzIG9mIG9yaWdpbiB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG9yaWdpbiBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTZWN0aW9uU3R5bGVzKG9yaWdpbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKChvcmlnaW4gIT09ICdoZWFkZXInKSAmJiAob3JpZ2luICE9PSAnY29udGVudCcpICYmIChvcmlnaW4gIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmNrbm93IG9yaWdpbiAnICsgb3JpZ2luKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVzW29yaWdpbl0ubmV4dCgod2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICB3aWRnZXQuc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICB3aWRnZXQuc3R5bGVzID0gPEFqZlN0eWxlcz57Li4ud2lkZ2V0LnN0eWxlc307XG5cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgc2V0IHRoZSBzdHlsZSBvZiB0aGUgd2hvbGUgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUubmV4dCgoc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgaWYgKHN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgIHN0eWxlcyA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuICAgICAgICBzdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi5zdHlsZXN9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIGZvcm1zXG4gICAqXG4gICAqIEBwYXJhbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydEZvcm1zKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZS5uZXh0KChfZm9ybTogQWpmRm9ybVtdKTogQWpmRm9ybVtdID0+IHtcbiAgICAgIHJldHVybiBmb3JtcyB8fCBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ3VzdG9tV2lkZ2V0cyh3aWRnZXQ6IEFqZkN1c3RvbVdpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cyA9IGN1c3RvbVdpZGdldHMgfHwgW107XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldCBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZXNldEN1c3RvbVdpZGdldHMoKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMubGVuZ3RoID0gMDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBsYWJlbCBvZiB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNoYW5nZUxhYmVsQ3VzdG9tV2lkZ2V0KGxhYmVsOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0c1twb3NpdGlvbl0udHlwZSA9IGxhYmVsO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfaGVhZGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkSGVhZGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2NvbnRlbnRXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb250ZW50V2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9mb290ZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRmb290ZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICB1bmZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgc3ByZWFkVmFsdWU6IGFueTtcbiAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0xKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IHZhbHVlO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHNwcmVhZFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnJvdW5kVG8oKChjaGVja1N1bSAtIDEpICUgMSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gLT0gc3ByZWFkVmFsdWU7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdICs9ICgxIC0gKGNoZWNrU3VtICUgMSkpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29sdW1uIG9uIHRoZSBjdXJyZW50IEFqZkxheW91dFdpZGdldC5cbiAgICpcbiAgICogV2hlbiBhZGRpbmcgYSBjb2x1bW4gdGhlIHdpZHRoIG9mIHRoZSBvdGhlciBjb2x1bW5zIGlzIHJlY2FsY3VsYXRlZFxuICAgKiBieSBkaXZpZGluZyBpdCBieSB0aGUgbnVtYmVyIG9mIGNvbHVtblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbHVtbigpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCB0ZW1wT2JqOiBudW1iZXJbXSA9IFtdO1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoICsgMTtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgdG1wVmFsdWU6IGFueTtcblxuICAgICAgaWYgKG51bSA+IDEwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhjZWVkIG1heCBjb2x1bW5zJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldID09PSAtMSkge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCgtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKHZhbHVlKTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgdG1wVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gLT0gdG1wVmFsdWU7XG4gICAgICAgIHRlbXBPYmpbMF0gPSB0aGlzLnJvdW5kVG8odGVtcE9ialswXSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICB0ZW1wT2JqWzBdICs9ICgxIC0gKGNoZWNrU3VtICUgMSkpO1xuICAgICAgICB0ZW1wT2JqWzBdID0gTnVtYmVyKHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgbXlPYmouY29sdW1ucyA9IHRlbXBPYmo7XG5cbiAgICAgIC8vIFRPRE86IEB0cmlrIHdoYXQncyB2YWx1ZT8hP1xuICAgICAgY29uc3QgY29sdW1uT2JqID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogNyxcbiAgICAgICAgLy8gdmFsdWU6IG15T2JqLmNvbHVtbnNbbXlPYmouY29sdW1ucy5sZW5ndGggLSAxXSxcbiAgICAgIH0pO1xuXG4gICAgICBteU9iai5jb250ZW50LnB1c2goY29sdW1uT2JqKTtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVXaWRnZXRUb0NvbHVtbihjb2x1bW46IEFqZkNvbHVtbldpZGdldCwgaW5kZXg6IG51bWJlcikge1xuICAgIGNvbHVtbi5jb250ZW50LnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcmVtb3ZlIGEgd2lkZ2V0IG9uIHRoZSBjdXJyZW50IEFqZlJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIG5vZGVcbiAgICogdGhlIHBvc2l0aW9uIGFycmF5OlxuICAgKlxuICAgKiBoZWFkZXIgLWA+YCBoZWFkZXJXaWRnZXRzXG4gICAqIGNvbnRlbnQgLWA+YCBjb250ZW50V2lkZ2V0c1xuICAgKiBmb290ZXIgLWA+YCBmb290ZXJXaWRnZXRzXG4gICAqIGNvbHVtbiAtYD5gIGNvbHVtbiBvZiBsYXlvdXRcbiAgICogbGF5b3V0Q29udGVudCAtYD5gIGNvbnRlbnQgb2YgbGF5b3V0XG4gICAqIG9iaiAtYD5gIG9iaiBvZiBsYXlvdXRcbiAgICogY3VzdG9tV2lkZ2V0IC1gPmAgY3VzdG9tIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4IHRoZSBwb3NpdGlvbiBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZShub2RlOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgc3dpdGNoIChub2RlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0cy53aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0cy53aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMud2lkZ2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xheW91dCc6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIChteU9iai5jb250ZW50WzBdIGFzIEFqZkNvbHVtbldpZGdldCkuY29udGVudC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgY2FzZSAnbGF5b3V0Q29udGVudCc6XG4gICAgICBjYXNlICd1bmZpeGVkQ29sdW1uJzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG5vZGUgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgICAgICBsZXQgY2xtID0gPEFqZkNvbHVtbldpZGdldD53aWRnZXQ7XG4gICAgICAgICAgICBjbG0uY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgPT09ICdsYXlvdXRDb250ZW50Jykge1xuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBsZW5ndGggaXMgMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCByZW1vdmUgYW55IHdpZGdldCBmcm9tIGVtcHR5IGNvbnRlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT0gbnVsbCAmJiBteU9iai5jb250ZW50W2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgPT09ICd1bmZpeGVkQ29sdW1uJykge1xuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIHBvc2l0aW9uIHZhbHVlICBpc250IC0xJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVuZml4ZWRDb2x1bW4oaWR4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gaWYgKG5vZGUgIT09ICdvYmonKSB7XG4gICAgICAgICAgLy8gICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgLy8gICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIC8vICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY3VzdG9tV2lkZ2V0cyc6IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICB9IGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIG5vZGUgJyArIG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgYSBBamZXaWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRUb0NvbnRlbnQobmV3V2lkZ2V0OiBBamZXaWRnZXQsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5jb250ZW50W2lkeF0gIT0gbnVsbCkge1xuICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAwLCBuZXdXaWRnZXQpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVG9Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbiAhPSBudWxsKSB7XG4gICAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICAgIGxldCB3aWRnZXQ6IEFqZldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLndpZGdldDtcbiAgICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcblxuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKHdpZGdldCk7XG5cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSkge1xuICAgICAgdGhpcy5yZW1vdmUoZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tLCBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXgpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKGV2ZW50LmRyYWdEYXRhLndpZGdldCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5qc29uKSB7XG4gICAgICBsZXQgb2JqID0gSlNPTi5wYXJzZShldmVudC5kcmFnRGF0YS5qc29uKTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogQWpmV2lkZ2V0VHlwZVtldmVudC5kcmFnRGF0YV19O1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoYW5nZVBvc2l0aW9uT25Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgdG9JbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuICAgIGxldCBmcm9tV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XTtcbiAgICBsZXQgdG9XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XTtcblxuICAgIGlmIChmcm9tQ29sdW1uID09IHRvQ29sdW1uKSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XSA9IHRvV2lkZ2V0O1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdID0gZnJvbVdpZGdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UodG9JbmRleCwgMCwgZnJvbVdpZGdldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCB0aGUgb2JqIG9uIHRoZSBpZHggcG9zaXRpb24uXG4gICAqIE9iaiBoYXZlIGEgbm8gc3BlY2lmaWNhdGUgd2lkdGggYW5kIGlzIG5vdCBjYWxjdWxhdGUgYXMgY29sdW1uc1xuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgtMSwgaWR4KTtcbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0KSB7XG4gICAgaWYgKHRvIDwgMCB8fCB0byA+PSBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGZyb20gPiBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGggLSAxICYmIHRvID4gZnJvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W2Zyb21dO1xuICAgIGxldCBmcm9tQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dO1xuICAgIGxldCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFt0b107XG4gICAgbGV0IHRvQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW3RvXTtcblxuICAgIGxheW91dFdpZGdldC5jb250ZW50W2Zyb21dID0gdG9Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV0gPSB0b0NvbHVtblZhbHVlO1xuICAgIGxheW91dFdpZGdldC5jb250ZW50W3RvXSA9IGZyb21Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dID0gZnJvbUNvbHVtblZhbHVlO1xuXG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KGxheW91dFdpZGdldCk7XG4gIH1cblxuICBhZGRDdXN0b21Db2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fdXBkYXRlc1snY29sb3InXS5uZXh0KChjb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgaWYgKGNvbG9ycy5pbmRleE9mKGNvbG9yKSA8IDApIHtcbiAgICAgICAgY29sb3JzLnB1c2goY29sb3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFdpZGdldFRvQ29udGFpbmVyKFxuICAgICAgc3ViajogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiwgd2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgc3Viai5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KHdpZGdldCk7XG4gICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgYXJyID0gKDxBcnJheTxhbnk+Pih3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0pO1xuICAgICAgYXJyLnB1c2godmFsdWUpO1xuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IGFycjtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAoPEFycmF5PGFueT4+KHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG59XG4iXX0=