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
    AjfReportBuilderService.ctorParameters = () => [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
    ];
    return AjfReportBuilderService;
})();
export { AjfReportBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQW9CLFdBQVcsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRyxPQUFPLEVBQWEsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDM0QsT0FBTyxFQWNMLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLGVBQWUsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUNMLGFBQWEsRUFDYixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1YsTUFBTSxnQkFBZ0IsQ0FBQztBQVl4QixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFNUM7Ozs7R0FJRztBQUNIO0lBQUEsTUFDYSx1QkFBdUI7UUFpT2xDOzs7O1dBSUc7UUFDSCxZQUFvRCxhQUErQjtZQS9OM0UseUJBQW9CLEdBQ3hCLElBQUksT0FBTyxFQUE2QixDQUFDO1lBUXJDLGtCQUFhLEdBQW9CLElBQUksT0FBTyxFQUFVLENBQUM7WUFRdkQsdUJBQWtCLEdBQXVCLElBQUksT0FBTyxFQUFhLENBQUM7WUFFbEUsZUFBVSxHQUE4QixJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztZQUkxRSxrQkFBYSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxJQUFJLENBQUMsQ0FBQztZQVE3RSxxQkFBZ0IsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztZQUk1RCxrQkFBYSxHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1lBU3pELHFCQUFnQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1lBUzVELHVCQUFrQixHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDO1lBUXRELHlCQUFvQixHQUFpQyxJQUFJLE9BQU8sRUFBdUIsQ0FBQztZQWV4RiwwQkFBcUIsR0FBaUMsSUFBSSxPQUFPLEVBQXVCLENBQUM7WUFlekYseUJBQW9CLEdBQWlDLElBQUksT0FBTyxFQUF1QixDQUFDO1lBSXhGLGlCQUFZLEdBQStCLElBQUksT0FBTyxFQUFxQixDQUFDO1lBQzVFLGtCQUFhLEdBQWE7Z0JBQ2hDLGtCQUFrQixFQUFRLHVCQUF1QixFQUFHLHNCQUFzQjtnQkFDMUUsc0JBQXNCLEVBQUksc0JBQXNCLEVBQUksd0JBQXdCO2dCQUM1RSxzQkFBc0IsRUFBSSxvQkFBb0IsRUFBTSxzQkFBc0I7Z0JBQzFFLHNCQUFzQixFQUFJLG9CQUFvQixFQUFNLHNCQUFzQjtnQkFDMUUsdUJBQXVCLEVBQUcsd0JBQXdCLEVBQUUsd0JBQXdCO2dCQUM1RSx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx3QkFBd0I7Z0JBQzVFLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLHdCQUF3QjtnQkFDNUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCO2dCQUM1RSx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx3QkFBd0I7Z0JBQzVFLHdCQUF3QixFQUFFLG9CQUFvQixFQUFNLHNCQUFzQjtnQkFDMUUsc0JBQXNCLEVBQUksbUJBQW1CLEVBQU8scUJBQXFCO2dCQUN6RSx1QkFBdUIsRUFBRyxxQkFBcUIsRUFBSyxtQkFBbUI7Z0JBQ3ZFLHFCQUFxQixFQUFLLHNCQUFzQixFQUFJLG1CQUFtQjtnQkFDdkUscUJBQXFCLEVBQUssc0JBQXNCO2FBQ2pELENBQUM7WUFnQk0seUJBQW9CLEdBQ3hCLElBQUksZUFBZSxDQUEwQixJQUFJLENBQUMsQ0FBQztZQVMvQywwQkFBcUIsR0FDekIsSUFBSSxlQUFlLENBQWlDLElBQUksQ0FBQyxDQUFDO1lBUXRELDBCQUFxQixHQUN6QixJQUFJLGVBQWUsQ0FBaUMsSUFBSSxDQUFDLENBQUM7WUFFOUQ7Ozs7ZUFJRztZQUNLLGdCQUFXLEdBQXlCLElBQUksZUFBZSxDQUFNLElBQUksQ0FBQyxDQUFDO1lBRTNFOzs7O2VBSUc7WUFDSyxZQUFPLEdBQW9DLElBQUksZUFBZSxDQUFpQixJQUFJLENBQUMsQ0FBQztZQVFyRix3QkFBbUIsR0FBZ0MsSUFBSSxPQUFPLEVBQXNCLENBQUM7WUFRckYsdUJBQWtCLEdBQ3RCLElBQUksT0FBTyxFQUEyQixDQUFDO1lBRTNDOzs7O2VBSUc7WUFDSyxhQUFRLEdBQVE7Z0JBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsb0JBQW9CO2dCQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtnQkFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxvQkFBb0I7Z0JBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDeEIsYUFBYSxFQUFFLElBQUksQ0FBQyxvQkFBb0I7YUFDekMsQ0FBQztZQUVGOzs7O2VBSUc7WUFDSyxxQkFBZ0IsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztZQUVoRSx1QkFBa0IsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztZQU14RTs7OztlQUlHO1lBQ0gsOEJBQXlCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7WUFFakUsY0FBUyxHQUFtQixFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQztZQVduRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBRTNCLElBQUksYUFBYSxJQUFJLElBQUksRUFBRTtnQkFDekIsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDL0IsSUFBSSxDQUFDLFNBQVMsbUNBQU8sSUFBSSxDQUFDLFNBQVMsR0FBSyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzlEO2FBQ0Y7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUF3QixJQUFJLENBQUMsYUFBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUUzRixJQUFJLENBQUMsWUFBWSxHQUEyQixJQUFJLENBQUMsa0JBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFbkYsSUFBSSxDQUFDLFVBQVUsR0FBeUIsSUFBSSxDQUFDLGdCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUUvRixJQUFJLENBQUMsT0FBTyxHQUF5QixJQUFJLENBQUMsYUFBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUV6RixJQUFJLENBQUMsVUFBVSxHQUF5QixJQUFJLENBQUMsZ0JBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRS9GLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRTFELElBQUksQ0FBQyxhQUFhLEdBQW9DLElBQUksQ0FBQyxtQkFBb0I7aUJBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFpQixFQUFFLEVBQXNCLEVBQUUsRUFBRTtnQkFDakQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FBQyxFQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXJGLElBQUksQ0FBQyxZQUFZLEdBQXlDLElBQUksQ0FBQyxrQkFBbUI7aUJBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQTJCLEVBQUUsRUFBRTtnQkFDckQsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxjQUFjO2dCQUN5QixJQUFJLENBQUMsb0JBQXFCO3FCQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBMEIsRUFBRSxFQUE2QixFQUFFLEVBQUU7b0JBQ2pFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFOUMsSUFBSSxDQUFDLGVBQWU7Z0JBQ3dCLElBQUksQ0FBQyxxQkFBc0I7cUJBQzlELElBQUksQ0FDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQ3RCLElBQUksQ0FBQyxDQUFDLFNBQTZCLEVBQUUsRUFBNkIsRUFBRSxFQUFFO29CQUNwRSxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksQ0FBQyxlQUFlO2dCQUN3QixJQUFJLENBQUMscUJBQXNCO3FCQUM5RCxJQUFJLENBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUN0QixJQUFJLENBQUMsQ0FBQyxTQUE2QixFQUFFLEVBQTZCLEVBQUUsRUFBRTtvQkFDcEUsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsY0FBYyxHQUFxQyxJQUFJLENBQUMsb0JBQXFCO2lCQUN2RCxJQUFJLENBQ0QsSUFBSSxDQUNBLENBQUMsT0FBNEIsRUFBRSxFQUF1QixFQUFFLEVBQUU7Z0JBQ3hELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFDb0IsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUNuRCxTQUFTLENBQXNCLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFDekQsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUE0QixFQUFFLEVBQUU7Z0JBQ2pGLE9BQU8sT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsZUFBZSxHQUFxQyxJQUFJLENBQUMscUJBQXNCO2lCQUN4RCxJQUFJLENBQ0QsSUFBSSxDQUNBLENBQUMsT0FBNEIsRUFBRSxFQUF1QixFQUFFLEVBQUU7Z0JBQ3hELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFDb0IsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUNuRCxTQUFTLENBQXNCLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFDekQsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFN0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUE0QixFQUFFLEVBQUU7Z0JBQ25GLE9BQU8sT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsY0FBYyxHQUFxQyxJQUFJLENBQUMsb0JBQXFCO2lCQUN2RCxJQUFJLENBQ0QsSUFBSSxDQUNBLENBQUMsT0FBNEIsRUFBRSxFQUF1QixFQUFFLEVBQUU7Z0JBQ3hELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFDb0IsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUNuRCxTQUFTLENBQXNCLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFDekQsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUE0QixFQUFFLEVBQUU7Z0JBQ2pGLE9BQU8sT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsTUFBTSxHQUFtQyxJQUFJLENBQUMsWUFBYTtpQkFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQWUsRUFBRSxFQUFxQixFQUFFLEVBQUU7Z0JBQzlDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBRXhGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDaEQsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUMsRUFDWixJQUFJLENBQ0EsQ0FBQyxNQUFzQixFQUFFLEVBQXNCLEVBQUUsRUFBRTtnQkFDakQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsQ0FBQyxFQUNELElBQTRCLENBQUMsRUFDakMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUNoQixRQUFRLEVBQUUsQ0FDYixDQUFDO1lBRUYsSUFBSSxDQUFDLFlBQVk7aUJBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBZ0IsRUFBRSxFQUFFO2dCQUNuRCxPQUFPLENBQUMsRUFBc0IsRUFBc0IsRUFBRTtvQkFDcEQsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNSLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsWUFBWTtpQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQUU7Z0JBQ25ELE9BQU8sQ0FBQyxFQUFzQixFQUFzQixFQUFFO29CQUNwRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ1IsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFL0IsU0FBUztpQkFDSixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBaUIsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsT0FBaUIsRUFBWSxFQUFFO29CQUNyQyxJQUFJLFVBQVUsR0FBYSxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUM5QyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7d0JBQ2IsT0FBTyxFQUFFLENBQUM7cUJBQ1g7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3dCQUN0QyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzt5QkFDL0M7d0JBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFOzRCQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7eUJBQzlDO3dCQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTs0QkFDWixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzRCQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUNoRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dDQUN4QyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtvQ0FDM0MsSUFBSSxTQUFTLEdBQUcsR0FBc0IsQ0FBQztvQ0FDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dDQUNqRCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBb0IsQ0FBQzt3Q0FDeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3dDQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NENBQ2pELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NENBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzt5Q0FDL0M7cUNBQ0Y7aUNBQ0Y7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsT0FBaUIsVUFBVSxDQUFDO2dCQUM5QixDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztpQkFDRixTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWxDLFNBQVM7aUJBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQWlCLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLE9BQWtCLEVBQWEsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO3dCQUNqQyxPQUFrQixFQUFFLENBQUM7cUJBQ3RCO3lCQUFNO3dCQUNMLE9BQWtCLENBQUMsQ0FBQyxNQUFNLENBQUM7cUJBQzVCO2dCQUNILENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV6QyxTQUFTO2lCQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFpQixFQUFFLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxRQUE2QixFQUF1QixFQUFFO29CQUM1RCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7d0JBQ2pDLE9BQTRCLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUM7cUJBQ3ZEO3lCQUFNO3dCQUNMLE9BQTRCOzRCQUMxQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRTs0QkFDL0IsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUU7eUJBQzlCLENBQUM7cUJBQ0g7Z0JBQ0gsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRTFDLFNBQVM7aUJBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQWlCLEVBQUUsRUFBRTtnQkFDOUIsT0FBTyxDQUFDLFFBQTZCLEVBQXVCLEVBQUU7b0JBQzVELElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTt3QkFDbEMsT0FBNEIsRUFBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztxQkFDdkQ7eUJBQU07d0JBQ0wsT0FBNEI7NEJBQzFCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFOzRCQUNoQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRTt5QkFDL0IsQ0FBQztxQkFDSDtnQkFDSCxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztpQkFDRixTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFM0MsU0FBUztpQkFDSixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBaUIsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsUUFBNkIsRUFBdUIsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO3dCQUNqQyxPQUE0QixFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBQyxDQUFDO3FCQUN2RDt5QkFBTTt3QkFDTCxPQUE0Qjs0QkFDMUIsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUU7NEJBQy9CLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFO3lCQUM5QixDQUFDO3FCQUNIO2dCQUNILENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUUxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDdEMsT0FBTyxDQUFDLEVBQU8sRUFBTyxFQUFFO29CQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7d0JBQ2YsT0FBTyxFQUFFLENBQUM7cUJBQ1g7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVKLElBQUksQ0FBQyxnQkFBZ0I7aUJBQ2hCLElBQUksQ0FDRCxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQzVDLGFBQWEsQ0FDVCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsRUFDaEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FDOUMsQ0FBQztpQkFDVCxTQUFTLENBQUMsQ0FBQyxDQUdBLEVBQUUsRUFBRTtnQkFDZCxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7Z0JBQ2xCLHlCQUF5QjtnQkFDekIsZ0RBQWdEO2dCQUNoRCxrREFBa0Q7Z0JBRWxELEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFDeEQsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUN6RCxDQUFDO2dCQUN2QixHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQ3hELENBQUM7Z0JBQ3ZCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVsQixNQUFNLEVBQUUsR0FBRztvQkFDVCxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQztvQkFDcEQsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUM7b0JBQ3JELE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDO29CQUNwRCxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDQSxDQUFDO2dCQUVmLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQztRQXBTRCxxQkFBcUI7WUFDbkIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDaEQsQ0FBQztRQVVELElBQUksUUFBUTtZQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO1FBd1JEOzs7O1dBSUc7UUFFSDs7Ozs7OztXQU9HO1FBQ0gsV0FBVyxDQUFDLEtBQWdCO1lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLFFBQVE7b0JBQ3BGLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLGlCQUFpQjtvQkFDL0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxRQUFRO3dCQUNyQyxJQUFpQixDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzFELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuQixDQUFDLEVBQUUsQ0FBQztpQkFDTDthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsVUFBVSxDQUFDLFNBQWMsRUFBRSxNQUFnQjtZQUN6QyxNQUFNLFNBQVMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25FLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0I7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxLQUFnQjtZQUNqQyxJQUFJLFNBQVMsR0FBdUIsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUM7Z0JBRTdELElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN2RCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNyRTtnQkFDRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUNEOzs7Ozs7V0FNRztRQUNILGtCQUFrQixDQUFDLEtBQWdCO1lBQ2pDLElBQUksR0FBRyxHQUFhLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxLQUFnQjtZQUNoQyxJQUFJLEdBQUcsR0FBYSxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsaUJBQWlCLENBQUMsS0FBZ0I7WUFDaEMsSUFBSSxHQUFHLEdBQW1CLEVBQUUsQ0FBQztZQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLEdBQXVCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdkI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFFRCxTQUFTLENBQUMsTUFBYztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxPQUFPLENBQUMsS0FBYSxFQUFFLGdCQUF3QjtZQUM3QyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUUvQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsQixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsUUFBUSxDQUFDLEtBQVU7WUFDakIsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxhQUFhLENBQUMsS0FBWTtZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzVCLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILElBQUksU0FBUztZQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLE1BQU07WUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxTQUFTO1lBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILFdBQVc7WUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILFlBQVk7WUFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILElBQUksV0FBVztZQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILFNBQVMsQ0FBQyxLQUFhLEVBQUUsS0FBYTtZQUNwQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQ7Ozs7V0FJRztRQUVILFNBQVM7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFHRDs7Ozs7V0FLRztRQUNILFdBQVc7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBR0Q7Ozs7O1dBS0c7UUFDSCxTQUFTO1lBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsU0FBUztZQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxNQUFNO1lBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILFVBQVU7WUFDUixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM5QjtRQUNILENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxPQUFtQjtZQUNsQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtnQkFDeEUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNsQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtnQkFDRCxNQUFNLENBQUMsR0FBRyxNQUF3QixDQUFDO2dCQUNuQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDakIsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxTQUFjO1lBQ25ELElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtnQkFDbkMsTUFBTSxHQUFHLEdBQUcsRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUM7UUFFRCxlQUFlLENBQUMsR0FBWTtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBR0QsYUFBYSxDQUFDLElBQVk7WUFDeEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUU5QyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkUsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxZQUFZO1lBQ1YsSUFBSSxTQUFTLEdBQUcsdUNBQXVDO2dCQUNuRCx3Q0FBd0M7Z0JBQ3hDLGlEQUFpRCxDQUFDO1lBQ3RELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFM0MsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVuQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQixDQUFDO1FBR0Q7Ozs7OztXQU1HO1FBQ0gsSUFBSSxrQkFBa0I7WUFDcEIsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDeEMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxhQUFhO1lBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILElBQUksYUFBYTtZQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLFlBQVk7WUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxjQUFjO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLGFBQWE7WUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxhQUFhO1lBQ2YsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILElBQUksWUFBWTtZQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLE1BQU07WUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUVELElBQUksWUFBWTtZQUNkLE9BQTRCLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDakQsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGtCQUFrQixDQUFDLElBQVksRUFBRSxTQUE4QjtZQUM3RCxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUN0RSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUN6QztZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBNkIsRUFBdUIsRUFBRTtnQkFDOUUsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLGNBQWM7WUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7UUFFRCxJQUFJLGNBQWM7WUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7UUFDRDs7Ozs7V0FLRztRQUNILElBQUksYUFBYTtZQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsbUJBQW1CLENBQUMsU0FBeUI7WUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQXVCLEVBQWtCLEVBQUU7Z0JBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0IsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLGFBQWE7WUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxXQUFXO1lBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNCLENBQUM7UUFHRDs7Ozs7V0FLRztRQUNILElBQUksWUFBWTtZQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxJQUFJLFdBQVc7WUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0IsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsSUFBSSxNQUFNO1lBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F1Qkc7UUFDSCxrQkFBa0IsQ0FBQyxRQUFnQixFQUFFLEdBQVc7WUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXNCLEVBQWtCLEVBQUU7Z0JBQ3hFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDbEIsT0FBTyxNQUFNLENBQUM7aUJBQ2Y7Z0JBQ0QsSUFBSSxLQUFLLEdBQW9CLE1BQU0sQ0FBQztnQkFFcEMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBRWhDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDWixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFdkIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUNoQixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7Z0JBRTVCLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzdDLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3hDLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUU5QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVsQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFO29CQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNsQztnQkFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLE1BQU0sRUFBRSxDQUFDO3FCQUNWO2lCQUNGO2dCQUVELElBQUksUUFBUSxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNsQixRQUFRLEdBQUcsR0FBRyxDQUFDO29CQUNmLE1BQU0sRUFBRSxDQUFDO29CQUNULFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25FLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUMxQjtxQkFBTSxJQUFJLFFBQVEsR0FBRyxHQUFHLEVBQUU7b0JBQ3pCLFFBQVEsR0FBRyxHQUFHLENBQUM7aUJBQ2hCO2dCQUdELElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNuQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDOUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLE9BQU8sS0FBSyxDQUFDO3FCQUNkO29CQUVELElBQUksUUFBUSxHQUFHLEdBQUcsRUFBRTt3QkFDbEIsUUFBUSxHQUFHLEdBQUcsQ0FBQztxQkFDaEI7eUJBQU0sSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ25ELFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzVDO29CQUVELElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLEVBQUU7d0JBQ2pELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO3dCQUM5QixPQUFPLEtBQUssQ0FBQztxQkFDZDtvQkFFRCxJQUFJLFFBQVEsR0FBRyxRQUFRLEVBQUU7d0JBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUM7d0JBQ1gsV0FBVyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDM0Q7eUJBQU07d0JBQ0wsR0FBRyxHQUFHLEtBQUssQ0FBQzt3QkFDWixXQUFXLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUMzRDtvQkFFRCxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU5RCxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUU7d0JBQ3RCLFdBQVcsR0FBRyxHQUFHLENBQUM7cUJBQ25CO2lCQUVGO3FCQUFNO29CQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sRUFBRSxDQUFDO29CQUNULEdBQUcsR0FBRyxJQUFJLENBQUM7b0JBQ1gsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7d0JBQzdCLFdBQVcsR0FBRyxDQUFDLENBQUM7cUJBQ2pCO3lCQUFNO3dCQUNMLFdBQVcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDO3FCQUM1QztpQkFDRjtnQkFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7NEJBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7eUJBQy9COzZCQUFNOzRCQUNMLElBQUksR0FBRyxFQUFFO2dDQUNQLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDO2dDQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRTtvQ0FDcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7aUNBQ3pCOzZCQUVGO2lDQUFNO2dDQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDO2dDQUNoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFO29DQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztpQ0FDekI7NkJBQ0Y7NEJBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN4RSxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDekI7d0JBRUQsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFFOUMsSUFBSSxlQUFlLElBQUksS0FBSyxFQUFFOzRCQUM1QixhQUFhLEdBQUcsQ0FBQyxDQUFDOzRCQUNsQixlQUFlLEdBQUcsSUFBSSxDQUFDO3lCQUN4QjtxQkFDRjtpQkFDRjtnQkFFRCxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDbkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxlQUFlLEVBQUU7d0JBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDN0U7aUJBQ0Y7cUJBQU07b0JBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsRTtnQkFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzdDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUM5RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNsQztpQkFDRjtnQkFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDN0IsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxXQUFXLENBQUMsUUFBZ0I7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXNCLEVBQWtCLEVBQUU7Z0JBQ3hFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDbEIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBd0IsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxRQUFRLEdBQUcsRUFBQyxDQUFDLENBQUM7Z0JBQ3RELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsT0FBTyxDQUFDLElBQXlDO1lBQy9DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sS0FBSyxHQUFHLE1BQXdCLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUMsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sQ0FBQyxLQUFhO1lBQ25CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sS0FBSyxHQUFHLE1BQXdCLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksS0FBSyxHQUFHLEVBQUMsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGFBQWEsQ0FBQyxhQUFxQjtZQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtnQkFDeEUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNsQixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO29CQUM3QixNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7aUJBQzdDO2dCQUNELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGdCQUFnQixDQUNaLE1BQWMsRUFBRSxNQUFjLEVBQUUsVUFBa0IsRUFBRSxNQUFjLEVBQUUsV0FBbUIsRUFDdkYsZUFBdUI7WUFDekIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQWlCLEVBQWtCLEVBQUU7Z0JBQ25FLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDYixPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFDRCxNQUFNLE1BQU0sR0FBRyxDQUFtQixDQUFDO2dCQUNuQyxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQzVDLElBQUksT0FBTyxHQUFlLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxXQUFXLEdBQW1CLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxnQkFBZ0I7b0JBRWhCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO29CQUM5QixXQUFXLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztvQkFFMUMsVUFBVTtvQkFDVixpQ0FBaUM7b0JBQ2pDLHlDQUF5QztvQkFDekMsbUJBQW1CO29CQUNuQixLQUFLO29CQUVMLHNDQUFzQztvQkFDdEMsc0RBQXNEO29CQUN0RDs7Ozs7Ozs7Ozs7Ozs7O3dCQWVJO2lCQUNMO2dCQUNELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGdCQUFnQixDQUNaLE1BQWMsRUFBRSxlQUF1QixFQUFFLFdBQW1CLEVBQUUsVUFBa0IsRUFDaEYsTUFBYztZQUNoQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBaUIsRUFBa0IsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO29CQUNiLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sTUFBTSxHQUFHLENBQW1CLENBQUM7Z0JBQ25DLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQzFCLElBQUksT0FBTyxHQUFlLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxXQUFXLEdBQW1CLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCw4Q0FBOEM7b0JBQzlDLHFDQUFxQztvQkFDckMsZ0JBQWdCO29CQUVoQixPQUFPLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztvQkFDOUIsV0FBVyxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7b0JBRTFDLFVBQVU7b0JBQ1YsaUNBQWlDO29CQUNqQyx5Q0FBeUM7b0JBQ3pDLG1CQUFtQjtvQkFDbkIsS0FBSztvQkFFTCxzQ0FBc0M7b0JBQ3RDOzs7Ozs7Ozs7d0JBU0k7aUJBQ0w7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsS0FBYTtZQUMvQixJQUFJLENBQUMscUNBQXFDLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxVQUFVLENBQUMsVUFBa0IsRUFBRSxNQUFjO1lBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLEtBQUssR0FBa0IsTUFBTSxDQUFDO2dCQUVsQzs7OztvQkFJSTtnQkFFSixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILFlBQVksQ0FBQyxJQUFZO1lBQ3ZCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGNBQWMsQ0FBQyxJQUFZO1lBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLEtBQUssR0FBbUIsTUFBTSxDQUFDO2dCQUNuQyxtQ0FBbUM7Z0JBRW5DLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsaUJBQWlCLENBQUMsUUFBZ0IsRUFBRSxJQUFZO1lBQzlDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLEtBQUssR0FBbUIsTUFBTSxDQUFDO2dCQUNuQzs7OztvQkFJSTtnQkFFSixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUdEOzs7Ozs7V0FNRztRQUNILHVCQUF1QixDQUFDLE1BQWdCO1lBQ3RDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRUQsdUJBQXVCLENBQUMsS0FBYTtZQUNuQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELDBCQUEwQixDQUFDLEdBQVc7WUFDcEMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxtQkFBbUIsQ0FBQyxNQUFnQjtZQUNsQyxJQUFJLENBQUMseUJBQXlCLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFRCxtQkFBbUIsQ0FBQyxLQUFhO1lBQy9CLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUVELG1CQUFtQixDQUFDLEtBQWE7WUFDL0IsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsc0JBQXNCLENBQUMsR0FBVztZQUNoQyxJQUFJLENBQUMscUNBQXFDLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRDs7Ozs7O1dBTUc7UUFDSCxTQUFTLENBQUMsTUFBaUI7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7Ozs7V0FNRztRQUNILGFBQWEsQ0FBQyxJQUFTO1lBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsZUFBZSxDQUFDLEtBQWEsRUFBRSxLQUFzQjtZQUNuRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtnQkFDeEUsSUFBSSxLQUFLLEdBQWtCLE1BQU0sQ0FBQztnQkFFbEMsTUFBTSxRQUFRLEdBQ1YsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDM0YsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNsRSxLQUFLLElBQUksSUFBSSxDQUFDO2lCQUNmO3FCQUFNLElBQUksU0FBUyxJQUFJLEtBQUssWUFBWSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDM0UsS0FBSyxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNsQztnQkFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFNUIsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNILGdCQUFnQixDQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUUsS0FBYTtZQUMzRCxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFO2dCQUM1RSxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxDQUFDO2FBQzdDO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUEyQixFQUF1QixFQUFFO2dCQUM5RSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFN0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxrQkFBZSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTlDLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxlQUFlLENBQUMsS0FBYSxFQUFFLEtBQWE7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQWlCLEVBQWEsRUFBRTtnQkFDN0QsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNsQixNQUFNLEdBQUcsRUFBRSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLE1BQU0sR0FBRyxrQkFBZSxNQUFNLENBQUMsQ0FBQztpQkFDakM7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7OztXQU1HO1FBQ0gsY0FBYyxDQUFDLEtBQWdCO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFnQixFQUFhLEVBQUU7Z0JBQzNELE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsZ0JBQWdCLENBQUMsTUFBdUIsRUFBRSxRQUFpQjtZQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBZ0MsRUFBcUIsRUFBRTtnQkFDckYsYUFBYSxHQUFHLGFBQWEsSUFBSSxFQUFFLENBQUM7Z0JBQ3BDLElBQUksUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO29CQUNyQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzNDO3FCQUFNO29CQUNMLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVCO2dCQUNELE9BQU8sYUFBYSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWdDLEVBQXFCLEVBQUU7Z0JBQ3JGLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLGFBQWEsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsdUJBQXVCLENBQUMsS0FBYSxFQUFFLFFBQWdCO1lBQ3JELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFnQyxFQUFxQixFQUFFO2dCQUNyRixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDckMsT0FBTyxhQUFhLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILGVBQWUsQ0FBQyxNQUFpQixFQUFFLFFBQWlCO1lBQ2xELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsZ0JBQWdCLENBQUMsTUFBaUIsRUFBRSxRQUFpQjtZQUNuRCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNILGVBQWUsQ0FBQyxNQUFpQixFQUFFLFFBQWlCO1lBQ2xELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFFRCxhQUFhLENBQUMsR0FBVztZQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtnQkFDeEUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNsQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtnQkFDRCxJQUFJLEtBQUssR0FBb0IsTUFBTSxDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDL0IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksV0FBZ0IsQ0FBQztnQkFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDM0IsTUFBTSxFQUFFLENBQUM7cUJBQ1Y7aUJBQ0Y7Z0JBRUQsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUMzQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzt3QkFDekIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pFO2lCQUNGO2dCQUVELFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhELElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtvQkFDaEIsV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDO29CQUNsQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7cUJBQU0sSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO29CQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0U7Z0JBRUQsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsU0FBUztZQUNQLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELElBQUksS0FBSyxHQUFvQixNQUFNLENBQUM7Z0JBQ3BDLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2QsSUFBSSxRQUFhLENBQUM7Z0JBRWxCLElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRTtvQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQ3ZDO2dCQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzVCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDM0IsTUFBTSxFQUFFLENBQUM7cUJBQ1Y7aUJBQ0Y7Z0JBQ0QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2xCO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3BCLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqRTtpQkFDRjtnQkFDRCxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV4RCxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDO29CQUN2QixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzFDO3FCQUFNLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzdEO2dCQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUV4Qiw4QkFBOEI7Z0JBQzlCLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQztvQkFDN0IsVUFBVSxFQUFFLENBQUM7aUJBRWQsQ0FBQyxDQUFDO2dCQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzdCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsb0JBQW9CLENBQUMsTUFBdUIsRUFBRSxLQUFhO1lBQ3pELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUJHO1FBQ0gsTUFBTSxDQUFDLElBQVksRUFBRSxHQUFXO1lBQzlCLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssU0FBUyxDQUFDO2dCQUNmLEtBQUssUUFBUTtvQkFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQTRCLEVBQXVCLEVBQUU7d0JBQzdFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7eUJBQ3hEO3dCQUNELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUU7NEJBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7eUJBQ2xDO3dCQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQixPQUFPLE9BQU8sQ0FBQztvQkFDakIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTTtnQkFDUixLQUFLLFFBQVE7b0JBQ1gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXNCLEVBQWtCLEVBQUU7d0JBQ3hFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTs0QkFDbEIsT0FBTyxJQUFJLENBQUM7eUJBQ2I7d0JBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBeUIsQ0FBQzt3QkFFeEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzdCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFxQixDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzRCQUN6RCxPQUFPLEtBQUssQ0FBQzt5QkFDZDt3QkFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFOzRCQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7eUJBQzlDOzZCQUFNOzRCQUNMLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFFN0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0NBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDOzZCQUM5Qjs0QkFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0NBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDOzZCQUM1Qjs0QkFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDOUM7d0JBQ0QsT0FBTyxLQUFLLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTTtnQkFDUixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLGVBQWUsQ0FBQztnQkFDckIsS0FBSyxlQUFlO29CQUNsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTt3QkFDeEUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFOzRCQUNsQixPQUFPLElBQUksQ0FBQzt5QkFDYjt3QkFDRCxJQUFJLEtBQUssR0FBb0IsTUFBTSxDQUFDO3dCQUVwQyxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7NEJBQ3JCLElBQUksR0FBRyxHQUFvQixNQUFNLENBQUM7NEJBQ2xDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDNUI7NkJBQU0sSUFBSSxJQUFJLEtBQUssZUFBZSxFQUFFOzRCQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQ0FDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDOzZCQUMzQzs0QkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQ0FDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDOzZCQUNqRTs0QkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFO2dDQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7NkJBQzlDO3lCQUNGOzZCQUFNLElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRTs0QkFDbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7NkJBQ3ZEOzRCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ3pCO3dCQUNELHdCQUF3Qjt3QkFDeEIsa0VBQWtFO3dCQUNsRSxrQ0FBa0M7d0JBQ2xDLG9DQUFvQzt3QkFDcEMsb0NBQW9DO3dCQUNwQyxNQUFNO3dCQUNOLHFEQUFxRDt3QkFDckQsa0NBQWtDO3dCQUNsQyxNQUFNO3dCQUNOLGtEQUFrRDt3QkFDbEQsSUFBSTt3QkFDSixPQUFPLEtBQUssQ0FBQztvQkFDZixDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNO2dCQUNSLEtBQUssZUFBZTtvQkFBRTt3QkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUEwQixFQUFxQixFQUFFOzRCQUN6RSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dDQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7NkJBQ3hEOzRCQUNELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRTtnQ0FDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzs2QkFDbEM7NEJBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZCLE9BQU8sT0FBTyxDQUFDO3dCQUNqQixDQUFDLENBQUMsQ0FBQztxQkFDSjtvQkFBQyxNQUFNO2dCQUNSO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxZQUFZLENBQUMsU0FBb0IsRUFBRSxHQUFXO1lBQzVDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELElBQUksS0FBSyxHQUFvQixNQUFNLENBQUM7Z0JBRXBDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUU7b0JBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDOUI7Z0JBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxXQUFXLENBQUMsS0FBVSxFQUFFLFFBQXlCLEVBQUUsUUFBaUI7WUFDbEUsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDdkQsSUFBSSxVQUFVLEdBQW9CLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUM1RCxJQUFJLE1BQU0sR0FBYyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDOUMsSUFBSSxTQUFTLEdBQVcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0JBRWpELFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFFL0I7aUJBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2hFLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNoRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNwQixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDTCxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLEdBQUcsR0FBRyxFQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUM7Z0JBQ3hELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO29CQUNwQixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDTCxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtRQUNILENBQUM7UUFDRCxzQkFBc0IsQ0FBQyxLQUFVLEVBQUUsUUFBeUIsRUFBRSxPQUFlO1lBQzNFLElBQUksVUFBVSxHQUFvQixLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUM1RCxJQUFJLFNBQVMsR0FBVyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUNqRCxJQUFJLFVBQVUsR0FBYyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFELElBQUksUUFBUSxHQUFjLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdEQsSUFBSSxVQUFVLElBQUksUUFBUSxFQUFFO2dCQUMxQixVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztnQkFDekMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7O1dBT0c7UUFDSCxXQUFXLENBQUMsR0FBVztZQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELFlBQVksQ0FBQyxJQUFZLEVBQUUsRUFBVSxFQUFFLFlBQTZCO1lBQ2xFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQy9DLE9BQU87YUFDUjtZQUNELElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFO2dCQUN2RCxPQUFPO2FBQ1I7WUFFRCxJQUFJLFVBQVUsR0FBcUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RSxJQUFJLGVBQWUsR0FBVyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksUUFBUSxHQUFxQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFFLElBQUksYUFBYSxHQUFXLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFckQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDdEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUM7WUFDM0MsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDdEMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxlQUFlLENBQUM7WUFFM0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxjQUFjLENBQUMsS0FBYTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQWdCLEVBQVksRUFBRTtnQkFDekQsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEI7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRU8scUJBQXFCLENBQ3pCLElBQWtDLEVBQUUsTUFBaUIsRUFBRSxRQUFpQjtZQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBNEIsRUFBdUIsRUFBRTtnQkFDOUQsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7b0JBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzdDO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QjtnQkFDRCxPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFTyx5QkFBeUIsQ0FBQyxRQUFnQixFQUFFLEtBQVU7WUFDNUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXNCLEVBQWtCLEVBQUU7Z0JBQ3hFLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDbEIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBQ0EsTUFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDbEMsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRU8sZ0NBQWdDLENBQUMsUUFBZ0IsRUFBRSxLQUFVO1lBQ25FLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFzQixFQUFrQixFQUFFO2dCQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sR0FBRyxHQUFJLE1BQWMsQ0FBQyxRQUFRLENBQVUsQ0FBQztnQkFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZixNQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNoQyxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFTyxxQ0FBcUMsQ0FBQyxRQUFnQixFQUFFLEdBQVc7WUFDekUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLE1BQXNCLEVBQWtCLEVBQUU7Z0JBQ3RFLE1BQWMsQ0FBQyxRQUFRLENBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7OztnQkF4OURGLFVBQVU7OztnREF1T0ksUUFBUSxZQUFJLE1BQU0sU0FBQyxrQkFBa0I7O0lBa3ZEcEQsOEJBQUM7S0FBQTtTQXg5RFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZkZvcm0sIEFqZk5vZGUsIEFqZk5vZGVUeXBlLCBmbGF0dGVuTm9kZXN9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb24sXG4gIEFqZkNoYXJ0V2lkZ2V0LFxuICBBamZDb2x1bW5XaWRnZXQsXG4gIEFqZkN1c3RvbVdpZGdldCxcbiAgQWpmRGF0YVdpZGdldCxcbiAgQWpmSW1hZ2VXaWRnZXQsXG4gIEFqZkxheW91dFdpZGdldCxcbiAgQWpmUmVwb3J0LFxuICBBamZSZXBvcnRDb250YWluZXIsXG4gIEFqZlN0eWxlcyxcbiAgQWpmVGFibGVXaWRnZXQsXG4gIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZSxcbiAgY3JlYXRlQWdncmVnYXRpb24sXG4gIGNyZWF0ZVdpZGdldFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzLCBBamZSZXBvcnRJY29ucywgQWpmUmVwb3J0c0NvbmZpZywgQWpmV2lkZ2V0c0NvbnRhaW5lcn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ29sb3JPcGVyYXRpb24sXG4gIEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24sXG4gIEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24sXG4gIEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uLFxuICBBamZTdHlsZXNPcGVyYXRpb24sXG4gIEFqZldpZGdldE9wZXJhdGlvbixcbiAgQWpmV2lkZ2V0c09wZXJhdGlvblxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuaW1wb3J0IHtBSkZfUkVQT1JUU19DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgY29udGFpbnMgYWxsIHRoZSBsb2dpYyB0byBtb2RlbCB0aGUgcmVwb3J0IHdpZGdldC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyU2VydmljZSB7XG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1c3RvbVdpZGdldHMgb2JqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT47XG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudCB3aWRnZXQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb3JpZ2luOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX29yaWdpblVwZGF0ZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZXhwb3J0ZWQganNvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0OiBPYnNlcnZhYmxlPEFqZlJlcG9ydD47XG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0VXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydD4gPSBuZXcgU3ViamVjdDxBamZSZXBvcnQ+KCk7XG5cbiAgcHJpdmF0ZSBfanNvblN0YWNrOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIHByaXZhdGUgX2xhc3REZWxldGVkSnNvbjogc3RyaW5nfHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9lbXB0eUNvbnRlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ2dlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25EcmFnZ2VkVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIHByaXZhdGUgX29uT3ZlcjogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfb25PdmVyVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3RhdHVzIG9mIHBlcm1hbmVudCB6b29tXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZml4ZWRab29tOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9maXhlZFpvb21VcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSBpZiBpcyBmaXJlZCBkcmFnIG1vdXNlIGV2ZW50LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29uRHJhZ0VudGVyOiBPYnNlcnZhYmxlPGFueT47XG4gIHByaXZhdGUgX29uRHJhZ0VudGVyVXBkYXRlOiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGhlYWRlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGhlYWRlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIGNvbnRlbnQgd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGNvbnRlbnQgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciB3aWRnZXQgYXJyYXkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cblxuICBwcml2YXRlIF9jb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHByaXZhdGUgX2NvbG9yVXBkYXRlOiBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZkNvbG9yT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9kZWZhdWx0Q29sb3I6IHN0cmluZ1tdID0gW1xuICAgICdyZ2JhKDAsIDAsIDAsIDEpJywgICAgICAgJ3JnYmEoNTEsIDE1MywgMjU1LCAxKScsICAncmdiYSgxNTMsIDIwNCwgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTAyLCAwLCAxKScsICAgJ3JnYmEoMCwgMjA0LCAyMDQsIDEpJywgICAncmdiYSgyMDQsIDIwNCwgMTUzLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJywgICAncmdiYSgyMzAsIDAsIDAsIDEpJywgICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyNTUsIDAsIDEpJywgICAncmdiYSgwLCAxMzgsIDAsIDEpJywgICAgICdyZ2JhKDAsIDEwMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMTUzLCA1MSwgMjU1LCAxKScsICAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsICdyZ2JhKDI1MCwgMjA0LCAyMDQsIDEpJyxcbiAgICAncmdiYSgyNTUsIDIzNSwgMjA0LCAxKScsICdyZ2JhKDI1NSwgMjU1LCAyMDQsIDEpJywgJ3JnYmEoMjA0LCAyMzIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDIwNCwgMjI0LCAyNDUsIDEpJywgJ3JnYmEoMjM1LCAyMTQsIDI1NSwgMSknLCAncmdiYSgxODcsIDE4NywgMTg3LCAxKScsXG4gICAgJ3JnYmEoMjQwLCAxMDIsIDEwMiwgMSknLCAncmdiYSgyNTUsIDE5NCwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAxMDIsIDEpJyxcbiAgICAncmdiYSgxMDIsIDE4NSwgMTAyLCAxKScsICdyZ2JhKDEwMiwgMTYzLCAyMjQsIDEpJywgJ3JnYmEoMTk0LCAxMzMsIDI1NSwgMSknLFxuICAgICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEpJywgJ3JnYmEoMTYxLCAwLCAwLCAxKScsICAgICAncmdiYSgxNzgsIDEwNywgMCwgMSknLFxuICAgICdyZ2JhKDE3OCwgMTc4LCAwLCAxKScsICAgJ3JnYmEoMCwgOTcsIDAsIDEpJywgICAgICAncmdiYSgwLCA3MSwgMTc4LCAxKScsXG4gICAgJ3JnYmEoMTA3LCAzNiwgMTc4LCAxKScsICAncmdiYSg2OCwgNjgsIDY4LCAxKScsICAgICdyZ2JhKDkyLCAwLCAwLCAxKScsXG4gICAgJ3JnYmEoMTAyLCA2MSwgMCwgMSknLCAgICAncmdiYSgxMDIsIDEwMiwgMCwgMSknLCAgICdyZ2JhKDAsIDU1LCAwLCAxKScsXG4gICAgJ3JnYmEoMCwgNDEsIDEwMiwgMSknLCAgICAncmdiYSg2MSwgMjAsIDEwMiwgMSknXG4gIF07XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGZvb3RlciBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VycmVudCB3aWRnZXQgd2hpY2ggaG9sZHMgdGhlIGZvY3VzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXQ6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+O1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmV2lkZ2V0T3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uTmFtZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgdXBkYXRlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IGNvbnRhaW5zIHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0fG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnR8bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgc3R5bGVzIG9mIHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzVXBkYXRlOiBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIG9ic2VydmUgdGhlIGZvcm1zIGZldGNoZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnRGb3JtczogT2JzZXJ2YWJsZTxBamZGb3JtW10+O1xuICBwcml2YXRlIF9yZXBvcnRGb3Jtc1VwZGF0ZTogU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIGRpY3Rpb25hcnkgZm9yICB3aWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlczogYW55ID0ge1xuICAgIGhlYWRlcjogdGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb250ZW50OiB0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSxcbiAgICBmb290ZXI6IHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsXG4gICAgY29sb3I6IHRoaXMuX2NvbG9yVXBkYXRlLFxuICAgIGN1c3RvbVdpZGdldHM6IHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGVcbiAgfTtcblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIHdvbnQgdG8gc2F2ZSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0RXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9zYXZlRm9ybXVsYVRPSHRtbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBnZXRGb3JtdWxhVG9IdG1sRXZlbnQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZXZlbnQgZW1pdHRlciB0aGF0IG5vdGlmeSB3aGVuIGNvbHVtbiB3aWR0aCBjaGFuZ2VkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2ljb25TZXRzOiBBamZSZXBvcnRJY29ucyA9IHsnYWpmLWljb24nOiBbXX07XG4gIGdldCBpY29uU2V0cygpOiBBamZSZXBvcnRJY29ucyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb25TZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBSkZfUkVQT1JUU19DT05GSUcpIHJlcG9ydHNDb25maWc6IEFqZlJlcG9ydHNDb25maWcpIHtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcblxuICAgIGlmIChyZXBvcnRzQ29uZmlnICE9IG51bGwpIHtcbiAgICAgIGlmIChyZXBvcnRzQ29uZmlnLmljb25zICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5faWNvblNldHMgPSB7Li4udGhpcy5faWNvblNldHMsIC4uLnJlcG9ydHNDb25maWcuaWNvbnN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX29yaWdpbiA9ICg8T2JzZXJ2YWJsZTxzdHJpbmc+PnRoaXMuX29yaWdpblVwZGF0ZSkucGlwZShzdGFydFdpdGgoJ2hlYWRlcicpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX3NhdmVkUmVwb3J0ID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydD4+dGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUpLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWQgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25EcmFnZ2VkVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25PdmVyID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uT3ZlclVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX2ZpeGVkWm9vbSA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9maXhlZFpvb21VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9vbkRyYWdFbnRlciA9IHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9yZXBvcnRTdHlsZXMgPSAoPE9ic2VydmFibGU8QWpmU3R5bGVzT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKHN0eWxlczogQWpmU3R5bGVzLCBvcDogQWpmU3R5bGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDxBamZTdHlsZXM+e30pLCBzaGFyZSgpLCBzdGFydFdpdGgoPEFqZlN0eWxlcz57fSkpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGZvcm1zOiBBamZGb3JtW10sIG9wOiBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGZvcm1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0cyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10sIG9wOiBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9mb3Jtc1ZhcmlhYmxlcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2hlYWRlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVzID0gdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29udGVudFdpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29udGVudFN0eWxlcyA9IHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2Zvb3RlclN0eWxlcyA9IHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbG9yID0gKDxPYnNlcnZhYmxlPEFqZkNvbG9yT3BlcmF0aW9uPj50aGlzLl9jb2xvclVwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChjb2xvcjogc3RyaW5nW10sIG9wOiBBamZDb2xvck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9kZWZhdWx0Q29sb3IpLCBzaGFyZSgpLCBzdGFydFdpdGgodGhpcy5fZGVmYXVsdENvbG9yKSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5waXBlKFxuICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICBtYXAocyA9PiBzISksXG4gICAgICAgIHNjYW4oXG4gICAgICAgICAgICAod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCwgb3A6IEFqZldpZGdldE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudWxsIGFzIHVua25vd24gYXMgQWpmV2lkZ2V0KSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNcbiAgICAgICAgLnBpcGUoZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksIG1hcCgoZm9ybXM6IEFqZkZvcm1bXSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2M6IEFqZkZvcm1WYXJpYWJsZXNbXSk6IEFqZkZvcm1WYXJpYWJsZXNbXSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1zVmFyaWFibGVzVXBkYXRlKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zXG4gICAgICAgIC5waXBlKGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLCBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSk7XG5cbiAgICBjb25zdCByZXBvcnRPYnMgPSB0aGlzLl9yZXBvcnQ7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX2NvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgICBsZXQgdGVtcENvbG9yczogc3RyaW5nW10gPSB0aGlzLl9kZWZhdWx0Q29sb3I7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIGlmIChyLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5jb250ZW50LnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuZm9vdGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuZm9vdGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHIuaGVhZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuaGVhZGVyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmhlYWRlci5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgb2JqID0gci5oZWFkZXIuY29udGVudFtpXTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihvYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxheW91dE9iaiA9IG9iaiBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5b3V0T2JqLmNvbnRlbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uT2JqID0gbGF5b3V0T2JqLmNvbnRlbnRbal0gYXMgQWpmQ29sdW1uV2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihjb2x1bW5PYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGNvbHVtbk9iai5jb250ZW50Lmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0T2JqID0gY29sdW1uT2JqLmNvbnRlbnRbel07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iod2lkZ2V0T2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gPHN0cmluZ1tdPnRlbXBDb2xvcnM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29sb3JVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9zdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+e307XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz5yLnN0eWxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuaGVhZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuaGVhZGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmhlYWRlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5jb250ZW50LmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmNvbnRlbnQuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuZm9vdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuZm9vdGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmZvb3Rlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnQucGlwZShtYXAoKGpzb246IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIChfcjogYW55KTogYW55ID0+IHtcbiAgICAgICAgaWYgKGpzb24gPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMucmVwb3J0LCB0aGlzLnJlcG9ydEZvcm1zKSxcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9ydFN0eWxlcy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHI6IFtcbiAgICAgICAgICAgICAgICAgICAgIFt2b2lkLCBBamZSZXBvcnQgfCBudWxsLCBBamZGb3JtW11dLCBBamZXaWRnZXRzQ29udGFpbmVyLCBBamZXaWRnZXRzQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgQWpmV2lkZ2V0c0NvbnRhaW5lciwgQWpmU3R5bGVzXG4gICAgICAgICAgICAgICAgICAgXSkgPT4ge1xuICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgIC8vIGNvbnN0IGN1clJvID0gclswXVsxXTtcbiAgICAgICAgICAvLyBjb25zdCBmb3JtcyA9IHJbMF1bMl0gIT0gbnVsbCA/IHJbMF1bMl0gfHwgW11cbiAgICAgICAgICAvLyAgICAgOiAoY3VyUm8gIT0gbnVsbCA/IGN1clJvLmZvcm1zIHx8IFtdIDogW10pO1xuXG4gICAgICAgICAgb2JqLmhlYWRlciA9IHtjb250ZW50OiByWzFdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbMV0uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLmNvbnRlbnQgPSB7Y29udGVudDogclsyXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzJdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5mb290ZXIgPSB7Y29udGVudDogclszXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzNdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5zdHlsZXMgPSByWzRdO1xuXG4gICAgICAgICAgY29uc3Qgcm8gPSB7XG4gICAgICAgICAgICBoZWFkZXI6IHtjb250ZW50OiByWzFdLndpZGdldHMsIHN0eWxlczogclsxXS5zdHlsZXN9LFxuICAgICAgICAgICAgY29udGVudDoge2NvbnRlbnQ6IHJbMl0ud2lkZ2V0cywgc3R5bGVzOiByWzJdLnN0eWxlc30sXG4gICAgICAgICAgICBmb290ZXI6IHtjb250ZW50OiByWzNdLndpZGdldHMsIHN0eWxlczogclszXS5zdHlsZXN9LFxuICAgICAgICAgICAgc3R5bGVzOiByWzRdXG4gICAgICAgICAgfSBhcyBBamZSZXBvcnQ7XG5cbiAgICAgICAgICB0aGlzLnNldFNhdmVSZXBvcnQob2JqKTtcbiAgICAgICAgICB0aGlzLl9zYXZlZFJlcG9ydFVwZGF0ZS5uZXh0KHJvKTtcbiAgICAgICAgICB0aGlzLnB1c2hKc29uU3RhY2soSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBmdW5jdGlvbnNcbiAgICpcbiAgICovXG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiByZW1vdmUgQWpmTm9kZUdyb3VwLCBBamZTbGlkZSwgQWpmUmVwZWF0aW5nU2xpZGUsIEFqZlN0cmluZ0ZpZWxkIGZyb20gYWpmbm9kZSBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaWx0ZXJOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8XG4gICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUgfHxcbiAgICAgICAgICAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQgJiZcbiAgICAgICAgICAgKG5vZGUgYXMgQWpmRmllbGQpLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLlN0cmluZykpIHtcbiAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHBhcnNlQ29sb3IoY3NzU3R5bGVzOiBhbnksIGNvbG9yczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZUtleXMgPSBbJ2JhY2tncm91bmQtY29sb3InLCAnYmFja2dyb3VuZENvbG9yJywgJ2NvbG9yJ107XG4gICAgc3R5bGVLZXlzLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChjc3NTdHlsZXNba10gJiYgY29sb3JzLmluZGV4T2YoY3NzU3R5bGVzW2tdKSA9PSAtMSkge1xuICAgICAgICBjb2xvcnMucHVzaChjc3NTdHlsZXNba10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICBsZXQgdmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXJpYWJsZXNbaV0gPSB7bm9kZXM6IFtdLCBsYWJlbHM6IFtdLCBuYW1lczogW10sIHR5cGVzOiBbXX07XG5cbiAgICAgIGlmIChmb3Jtc1tpXS5ub2RlcyAhPSBudWxsICYmIGZvcm1zW2ldLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyaWFibGVzW2ldLm5vZGVzID0gdGhpcy5maWx0ZXJOb2RlcyhmbGF0dGVuTm9kZXMoZm9ybXNbaV0ubm9kZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1tpXS5sYWJlbHMgPSB0aGlzLmV4dHJhY3RMYWJlbHNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLm5hbWVzID0gdGhpcy5leHRyYWN0TmFtZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLnR5cGVzID0gdGhpcy5leHRyYWN0VHlwZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFyaWFibGVzO1xuICB9XG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogIHRoZSBvYmogcmV0dXJuZWQgY29udGFpbnMgdGhlIGxhYmVsIGZpZWxkIG9mIGFqZk5vZGVcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZXh0cmFjdExhYmVsc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubGFiZWwpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZXh0cmFjdE5hbWVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBleHRyYWN0VHlwZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBBamZGaWVsZFR5cGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBwOiBBamZGaWVsZCA9IDxBamZGaWVsZD5ub2Rlc1tpXTtcbiAgICAgIG9iai5wdXNoKHAuZmllbGRUeXBlKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHNldE9yaWdpbihvcmlnaW46IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29yaWdpblVwZGF0ZS5uZXh0KG9yaWdpbik7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZSB0byB0aGUgZGVjaW1hbCBwb3NpdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGRlY2ltYWxwb3NpdGlvbnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIHZhbGlkYXRvciBjaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGlzTnVtYmVyKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15cXGQrKFxcLlxcZCspPy8udGVzdCh2YWx1ZSk7XG4gIH1cblxuICBpc051bWJlckFycmF5KHZhbHVlOiBhbnlbXSk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc051bWJlcih2YWx1ZVtpXSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ2dlZCBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdnZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnZ2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25PdmVyIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uT3ZlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbk92ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9maXhlZFpvb20gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZml4ZWRab29tKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZFpvb207XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIGNoYW5nZSBzdGF0dXMgb2YgX2ZpeGVkWm9vbSBpbiBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbU91dCgpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdFbnRlciBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbkRyYWdFbnRlcigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdFbnRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdFbnRlciB3aXRoICBzZWN0aW9uKGhlYWRlcixjb250ZW50LGZvb3RlcikgYW5kIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ0VudGVyKGFycmF5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHthcnJheSwgaW5kZXh9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbmRyYWdnZWQgd2l0aCB0cnVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuXG4gIGRyYWdFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbk92ZXIgd2l0aCB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlclN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgX29uT3ZlciB3aXRoIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlckVuZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdnZWQgd2l0aCBmYWxzZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0KCk6IE9ic2VydmFibGU8QWpmUmVwb3J0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgc2F2ZSByZXBvcnQgZXZlbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzYXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLl9zYXZlUmVwb3J0RXZlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKGZvcm11bGE6IEFqZkZvcm11bGEpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICB3LmZsYWcgPSBmb3JtdWxhO1xuICAgICAgdy5pY29uID0gZm9ybXVsYTtcbiAgICAgIHJldHVybiB3O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFUb0h0bWwoaHRtbEZvcm11bGE6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgb2JqID0geydmb3JtdWxhJzogaHRtbEZvcm11bGEsICdyZWZlcmVuY2UnOiByZWZlcmVuY2V9O1xuICAgICAgdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuZW1pdChvYmopO1xuICAgIH1cbiAgfVxuXG4gIHNldEVtcHR5Q29udGVudCh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9lbXB0eUNvbnRlbnQubmV4dCh2YWwpO1xuICB9XG5cblxuICBwdXNoSnNvblN0YWNrKGpzb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2suaW5kZXhPZihqc29uKSA9PT0gLTEgJiYganNvbiAhPT0gdGhpcy5fbGFzdERlbGV0ZWRKc29uKSB7XG4gICAgICBjdXJyZW50U3RhY2sucHVzaChqc29uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuICB9XG5cbiAgcG9wSnNvblN0YWNrKCk6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgIGxldCBlbXB0eUpzb24gPSAne1wiaGVhZGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LCcgK1xuICAgICAgICAnXCJjb250ZW50XCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwiJyArXG4gICAgICAgICdmb290ZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sXCJzdHlsZXNcIjp7fX0nO1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcbiAgICBjdXJyZW50U3RhY2sucG9wKCk7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gY3VycmVudFN0YWNrLnBvcCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG4gICAgICB0aGlzLl9qc29uU3RhY2submV4dChbXSk7XG4gICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICB0aGlzLnNldEVtcHR5Q29udGVudCh0cnVlKTtcbiAgICAgIHJldHVybiBlbXB0eUpzb247XG4gICAgfVxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG5cbiAgICByZXR1cm4gdGhpcy5fbGFzdERlbGV0ZWRKc29uO1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IHRoZSBlbWl0dGVyXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2x1bW5XaWR0aENoYW5nZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2N1c3RvbVdpZGdldHMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VzdG9tV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1c3RvbVdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIENvbnRlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50V2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFdpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb250ZW50IHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb2xvcnMgb2YgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb2xvcnMoKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgfVxuXG4gIGdldCBlbXB0eUNvbnRlbnQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2VtcHR5Q29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQXJyYXlXaWRnZXRzKHR5cGU6IHN0cmluZywgbmV3V2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKSB7XG4gICAgaWYgKCh0eXBlICE9PSAnaGVhZGVyJykgJiYgKHR5cGUgIT09ICdjb250ZW50JykgJiYgKHR5cGUgIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGUgJyArIHR5cGUpO1xuICAgIH1cbiAgICB0aGlzLl91cGRhdGVzW3R5cGVdLm5leHQoKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZm9ybXNWYXJpYWJsZXMgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybXNWYXJpYWJsZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybXNWYXJpYWJsZXM7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uTmFtZXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uTmFtZXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1cnJlbnRXaWRnZXQoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50V2lkZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIFVwZGF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZSB3aXRoIG5ld1dpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUN1cnJlbnRXaWRnZXQobmV3V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgoX3dpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZ2V0U2F2ZVJlcG9ydCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlUmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfanNvblNhdmVkUmVwb3J0IG9iZXNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTYXZlZCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydD4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlZFJlcG9ydDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0U3R5bGVzIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRGb3JtcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRGb3JtcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnRGb3JtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIF9vcmlnaW4gT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb3JpZ2luKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhc3NpZ25zIHRoZSBuZXcgd2lkdGggdG8gdGhlIGlkeCBjb2x1bW5cbiAgICogYW5kIHJlY2FsY3VsYXRlcyB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIG9mIHRoZSBsYXlvdXQuXG4gICAqIFRoZSByYW5nZSB2YWx1ZSBhcmUgZnJvbSAwLDEgdG8gMS5cbiAgICpcbiAgICogUlVMRVM6XG4gICAqIFRoZSBtaW4gdmFsdWUgZm9yIGNvbHVtbiBpcyAwLDEuXG4gICAqIFRoZSBzdW0gb2YgYWxsIGNvbHVtbnMgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqIFRoZSBtZXRob2Qgcm91bmQgdGhlIHZhbHVlcy5cbiAgICogSWYgaXMgcHJlc2VudCBvbmx5IG9uZSBjb2x1bW4gdGhlIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYD5gIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBkZWNyZWFzZXMuXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPGAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGluY3JlYXNlcy5cbiAgICpcbiAgICogV2hlbiB2YWx1ZXMg4oCL4oCLYXJlIHBlcmlvZGljLCByb3VuZGluZyBhc3NpZ25zIHRoZSBnYXAgdG8gdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAqIEZvciBleGFtcGxlOiAzIGNvbHVtbnMgd2l0aCAwLDMzIGJlbGlldmUgMSBjb2x1bW4gMCwzNCBhbmQgMiBjb2x1bW5zIDAsMzMuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdWYWx1ZVxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaW5zdGFudENvbHVtblZhbHVlKG5ld1ZhbHVlOiBudW1iZXIsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgbGV0IHNpemUgPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcblxuICAgICAgbGV0IHNwcmVhZFZhbHVlID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICBsZXQgaWR4Rmlyc3ROb09iaiA9IC0xO1xuXG4gICAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgICBsZXQgZm91bmRGaXJzdE5vT2JqID0gZmFsc2U7XG5cbiAgICAgIGxldCByZTEgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV1bMC05XSQpJyk7XG4gICAgICBsZXQgcmUyID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldJCknKTtcbiAgICAgIGxldCByZTMgPSBuZXcgUmVnRXhwKCdeWzFdJCcpO1xuXG4gICAgICBsZXQgb2xkVmFsdWUgPSBteU9iai5jb2x1bW5zW2lkeF07XG5cbiAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhuZXdWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgdmFsdWUnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9sZFZhbHVlID09IC0xKSB7XG4gICAgICAgIG9sZFZhbHVlID0gMC4xO1xuICAgICAgICBvYmpOdW0tLTtcbiAgICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAoc2l6ZSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAwLjE7XG4gICAgICB9IGVsc2UgaWYgKG9sZFZhbHVlIDwgMC4xKSB7XG4gICAgICAgIG9sZFZhbHVlID0gMC4xO1xuICAgICAgfVxuXG5cbiAgICAgIGlmIChuZXdWYWx1ZSAhPT0gLTEpIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1swXSA9IDE7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlIDwgMC4xKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAwLjE7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgKyAwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpID4gMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMSAtICgwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgob2xkVmFsdWUgPT09IG5ld1ZhbHVlKSAmJiAob2xkVmFsdWUgPT09IDAuMSkpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgPiBuZXdWYWx1ZSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUgLSBuZXdWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZCA9IGZhbHNlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG5ld1ZhbHVlIC0gb2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwcmVhZFZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhzcHJlYWRWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgaWYgKHNwcmVhZFZhbHVlIDwgMC4wMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMC4xO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldICE9PSAtMSkge1xuICAgICAgICAgIGlmICgoaSA9PSBpZHgpKSB7XG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFkZCkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAoKG15T2JqLmNvbHVtbnNbaV0gPiAwLjkpICYmIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIG9iak51bSAhPSAxKSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjkwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gLT0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldIDwgMC4xKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuMTA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpXSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgICAgICBzdW0gKz0gbXlPYmouY29sdW1uc1tpXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHN1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqID09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZHhGaXJzdE5vT2JqID0gaTtcbiAgICAgICAgICAgIGZvdW5kRmlyc3ROb09iaiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gLTEpIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gLTE7XG4gICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmopIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeEZpcnN0Tm9PYmpdICs9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAtIHN1bSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAtIHN1bSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSAhPT0gLTEgJiYgIXJlMS50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiZcbiAgICAgICAgICAgICFyZTIudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmICFyZTMudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpKSB7XG4gICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoMC4xMCwgaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlci5lbWl0KCk7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgaW1hZ2VVcmwgb24gdGhlIGN1cnJlbnQgQWpmSW1hZ2VXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZVVybFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLnVybCA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aW1hZ2VVcmx9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRJY29uKGljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5pY29uID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpY29ufVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5mbGFnID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHt2YWx1ZX1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oY29uZGl0aW9uVGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHdpZGdldC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgICAgd2lkZ2V0LnZpc2liaWxpdHkuY29uZGl0aW9uID0gY29uZGl0aW9uVGV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ2hhcnRGb3JtdWxhKFxuICAgICAgX2xhYmVsOiBzdHJpbmcsIF9sZXZlbDogbnVtYmVyLCBfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyLCBmb3JtdWxhVGV4dDogc3RyaW5nLFxuICAgICAgYWdncmVnYXRpb25UeXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0ICE9IG51bGwgJiYgd2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgb2JqOiBhbnk7XG5cbiAgICAgICAgZm9ybXVsYS5mb3JtdWxhID0gZm9ybXVsYVRleHQ7XG4gICAgICAgIGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uID0gYWdncmVnYXRpb25UeXBlO1xuXG4gICAgICAgIC8vIG9iaiA9IHtcbiAgICAgICAgLy8gICAnZm9ybXVsYSc6IGZvcm11bGEudG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2FnZ3JlZ2F0aW9uJzogYWdncmVnYXRpb24udG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2xhYmVsJzogbGFiZWxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBkYXRhc2V0ID0gQWpmRGF0YXNldC5mcm9tSnNvbihvYmopO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgcm93IHRoYXQgY29udGFpbnMgbWFpbiBkYXRhIGlzIGRlZmluZWRcbiAgICAgICAgLyogaWYgKHdpZGdldC5kYXRhc2V0WzBdID09IG51bGwpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFswXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxldmVsID09IDAgJiYgbWFpbkluZGV4ID09IC0xICYmIGluZGV4ID09IC0xKSB7XG5cbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFswXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09IDEgJiYgbWFpbkluZGV4ID09IC0xICYmIGluZGV4ID09IC0xKSB7XG5cbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGhdID0gW107XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoIC0gMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4ICsgMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlVGFibGVGb3JtdWxhKFxuICAgICAgX2xhYmVsOiBzdHJpbmcsIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyLCBmb3JtdWxhVGV4dDogc3RyaW5nLCBfbWFpbkluZGV4OiBudW1iZXIsXG4gICAgICBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgodzogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAodyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3Qgd2lkZ2V0ID0gdyBhcyBBamZUYWJsZVdpZGdldDtcbiAgICAgIGlmICh3aWRnZXQuZGF0YXNldCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBmb3JtdWxhOiBBamZGb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7fSk7XG4gICAgICAgIGxldCBhZ2dyZWdhdGlvbjogQWpmQWdncmVnYXRpb24gPSBjcmVhdGVBZ2dyZWdhdGlvbih7fSk7XG4gICAgICAgIC8vIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0ID0gbmV3IEFqZkRhdGFzZXQoKTtcbiAgICAgICAgLy8gbGV0IHJvd0RhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IFtdO1xuICAgICAgICAvLyBsZXQgb2JqOiBhbnk7XG5cbiAgICAgICAgZm9ybXVsYS5mb3JtdWxhID0gZm9ybXVsYVRleHQ7XG4gICAgICAgIGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uID0gYWdncmVnYXRpb25UeXBlO1xuXG4gICAgICAgIC8vIG9iaiA9IHtcbiAgICAgICAgLy8gICAnZm9ybXVsYSc6IGZvcm11bGEudG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2FnZ3JlZ2F0aW9uJzogYWdncmVnYXRpb24udG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2xhYmVsJzogbGFiZWxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBkYXRhc2V0ID0gQWpmRGF0YXNldC5mcm9tSnNvbihvYmopO1xuICAgICAgICAvKiBpZiAobWFpbkluZGV4ID09PSAtIDEpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGhdID0gW107XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoIC0gMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnB1c2goZGF0YXNldCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxLCBkYXRhc2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gKi9cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVUYWJsZU1haW5EYXRhKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2RhdGFzZXQnLCBpbmRleCk7XG4gIH1cblxuICByZW1vdmVEYXRhKF9tYWluSW5kZXg6IG51bWJlciwgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmRGF0YVdpZGdldD53aWRnZXQ7XG5cbiAgICAgIC8qIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgbXlPYmouZGF0YXNldC5zcGxpY2UobWFpbkluZGV4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHR5cGUgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydFR5cGUodHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCd0eXBlJywgdHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogcmVtb3ZlICBpZHggZWxlbWVudCBvZiB4TGFiZWxzIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZW1vdmVNYWluRGF0YShfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLy8gbXlPYmouZGF0YXNldFswXS5zcGxpY2UoaWR4LCAxKTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlUmVsYXRlZERhdGEoX21haW5JZHg6IG51bWJlciwgX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8qIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgbXlPYmouZGF0YXNldC5zcGxpY2UobWFpbklkeCArIDEsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSWR4ICsgMV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBiYWNrZ3JvdW5kQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBhZGRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGJvcmRlckNvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJvcmRlckNvbG9yKGNvbG9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIHNldENoYXJ0Qm9yZGVyV2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyV2lkdGgnLCB2YWx1ZSk7XG4gIH1cblxuICBhZGRDaGFydEJvcmRlckNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0Qm9yZGVyQ29sb3IoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydChyZXBvcnQ6IEFqZlJlcG9ydCk6IHZvaWQge1xuICAgIHRoaXMuX3JlcG9ydC5uZXh0KHJlcG9ydCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBleHBvcnQgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0U2F2ZVJlcG9ydChqc29uOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlUmVwb3J0Lm5leHQoanNvbik7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBmb250IGF0dHJpYnV0ZSBvbiB0aGUgY3VycmVudCBBamZXaWRnZXQuXG4gICAqXG4gICAqIFRoZXJlIGlzIGEgY2hlY2sgb24gZm9udC1zaXplIGF0dHJpYnV0ZSxcbiAgICogaWYgaXMgbm8gc3BlY2lmaWNhdGUgdGhlIHR5cGUgb2Ygc2l6ZSBmb250IHNldCAncHQnIGFzIGRlZmF1bHQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xzdHJpbmdbXSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZUZXh0V2lkZ2V0PndpZGdldDtcblxuICAgICAgY29uc3QgcHhTdHlsZXMgPVxuICAgICAgICAgIFsnZm9udC1zaXplJywgJ2hlaWdodCcsICd3aWR0aCcsICdib3JkZXItd2lkdGgnLCAnYm9yZGVyLXJhZGl1cycsICdwYWRkaW5nJywgJ21hcmdpbiddO1xuICAgICAgY29uc3QgaXNQeFN0eWxlID0gcHhTdHlsZXMuaW5kZXhPZihsYWJlbCkgPiAtMTtcbiAgICAgIGlmIChpc1B4U3R5bGUgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSAmJiB0aGlzLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSArPSAncHgnO1xuICAgICAgfSBlbHNlIGlmIChpc1B4U3R5bGUgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzLmlzTnVtYmVyQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gYCR7dmFsdWUuam9pbigncHggJyl9cHhgO1xuICAgICAgfVxuXG4gICAgICBteU9iai5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB1cGRhdGUgdGhlIHN0eWxlcyBvZiBvcmlnaW4gd2lkZ2V0IGFycmF5XG4gICAqXG4gICAqIEBwYXJhbSBvcmlnaW4gY2FuIGJlIGhlYWRlciBjb250ZW50IG9yIGZvb3RlclxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0U2VjdGlvblN0eWxlcyhvcmlnaW46IHN0cmluZywgbGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIGlmICgob3JpZ2luICE9PSAnaGVhZGVyJykgJiYgKG9yaWdpbiAhPT0gJ2NvbnRlbnQnKSAmJiAob3JpZ2luICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5ja25vdyBvcmlnaW4gJyArIG9yaWdpbik7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlc1tvcmlnaW5dLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgd2lkZ2V0LnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgd2lkZ2V0LnN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLndpZGdldC5zdHlsZXN9O1xuXG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHNldCB0aGUgc3R5bGUgb2YgdGhlIHdob2xlIHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlLm5leHQoKHN0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzID0+IHtcbiAgICAgIGlmIChzdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICBzdHlsZXMgPSB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcbiAgICAgICAgc3R5bGVzID0gPEFqZlN0eWxlcz57Li4uc3R5bGVzfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBmb3Jtc1xuICAgKlxuICAgKiBAcGFyYW0gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRGb3Jtcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgdGhpcy5fcmVwb3J0Rm9ybXNVcGRhdGUubmV4dCgoX2Zvcm06IEFqZkZvcm1bXSk6IEFqZkZvcm1bXSA9PiB7XG4gICAgICByZXR1cm4gZm9ybXMgfHwgW107XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZEN1c3RvbVdpZGdldHMod2lkZ2V0OiBBamZDdXN0b21XaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMgPSBjdXN0b21XaWRnZXRzIHx8IFtdO1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcmVzZXQgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVzZXRDdXN0b21XaWRnZXRzKCkge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzLmxlbmd0aCA9IDA7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgbGFiZWwgb2Ygd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gcG9zaXRpb25cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjaGFuZ2VMYWJlbEN1c3RvbVdpZGdldChsYWJlbDogc3RyaW5nLCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHNbcG9zaXRpb25dLnR5cGUgPSBsYWJlbDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2hlYWRlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZEhlYWRlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9jb250ZW50V2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29udGVudFdpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfZm9vdGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkZm9vdGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgdW5maXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHNwcmVhZFZhbHVlOiBhbnk7XG4gICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAwO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldICE9PSAtMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICBzcHJlYWRWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSB0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbHVtbiBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIFdoZW4gYWRkaW5nIGEgY29sdW1uIHRoZSB3aWR0aCBvZiB0aGUgb3RoZXIgY29sdW1ucyBpcyByZWNhbGN1bGF0ZWRcbiAgICogYnkgZGl2aWRpbmcgaXQgYnkgdGhlIG51bWJlciBvZiBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb2x1bW4oKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgdGVtcE9iajogbnVtYmVyW10gPSBbXTtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aCArIDE7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHRtcFZhbHVlOiBhbnk7XG5cbiAgICAgIGlmIChudW0gPiAxMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4Y2VlZCBtYXggY29sdW1ucycpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA9PT0gLTEpIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2goLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHRtcFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnJvdW5kVG8oKChjaGVja1N1bSAtIDEpICUgMSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB0ZW1wT2JqWzBdIC09IHRtcFZhbHVlO1xuICAgICAgICB0ZW1wT2JqWzBdID0gdGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgdGVtcE9ialswXSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgdGVtcE9ialswXSA9IE51bWJlcih0aGlzLnJvdW5kVG8odGVtcE9ialswXSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLmNvbHVtbnMgPSB0ZW1wT2JqO1xuXG4gICAgICAvLyBUT0RPOiBAdHJpayB3aGF0J3MgdmFsdWU/IT9cbiAgICAgIGNvbnN0IGNvbHVtbk9iaiA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IDcsXG4gICAgICAgIC8vIHZhbHVlOiBteU9iai5jb2x1bW5zW215T2JqLmNvbHVtbnMubGVuZ3RoIC0gMV0sXG4gICAgICB9KTtcblxuICAgICAgbXlPYmouY29udGVudC5wdXNoKGNvbHVtbk9iaik7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlV2lkZ2V0VG9Db2x1bW4oY29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBjb2x1bW4uY29udGVudC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJlbW92ZSBhIHdpZGdldCBvbiB0aGUgY3VycmVudCBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlXG4gICAqIHRoZSBwb3NpdGlvbiBhcnJheTpcbiAgICpcbiAgICogaGVhZGVyIC1gPmAgaGVhZGVyV2lkZ2V0c1xuICAgKiBjb250ZW50IC1gPmAgY29udGVudFdpZGdldHNcbiAgICogZm9vdGVyIC1gPmAgZm9vdGVyV2lkZ2V0c1xuICAgKiBjb2x1bW4gLWA+YCBjb2x1bW4gb2YgbGF5b3V0XG4gICAqIGxheW91dENvbnRlbnQgLWA+YCBjb250ZW50IG9mIGxheW91dFxuICAgKiBvYmogLWA+YCBvYmogb2YgbGF5b3V0XG4gICAqIGN1c3RvbVdpZGdldCAtYD5gIGN1c3RvbSB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeCB0aGUgcG9zaXRpb24gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZW1vdmUobm9kZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHN3aXRjaCAobm9kZSkge1xuICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXlvdXQnOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAobXlPYmouY29udGVudFswXSBhcyBBamZDb2x1bW5XaWRnZXQpLmNvbnRlbnQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgIGNhc2UgJ2xheW91dENvbnRlbnQnOlxuICAgICAgY2FzZSAndW5maXhlZENvbHVtbic6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgICAgIGlmIChub2RlID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgbGV0IGNsbSA9IDxBamZDb2x1bW5XaWRnZXQ+d2lkZ2V0O1xuICAgICAgICAgICAgY2xtLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAnbGF5b3V0Q29udGVudCcpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gbGVuZ3RoIGlzIDAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgcmVtb3ZlIGFueSB3aWRnZXQgZnJvbSBlbXB0eSBjb250ZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9IG51bGwgJiYgbXlPYmouY29udGVudFtpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAndW5maXhlZENvbHVtbicpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBwb3NpdGlvbiB2YWx1ZSAgaXNudCAtMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmZpeGVkQ29sdW1uKGlkeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIChub2RlICE9PSAnb2JqJykge1xuICAgICAgICAgIC8vICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIC8vICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1c3RvbVdpZGdldHMnOiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgfSBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBub2RlICcgKyBub2RlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIGEgQWpmV2lkZ2V0IG9uIHRoZSBjdXJyZW50IEFqZkxheW91dFdpZGdldC5cbiAgICpcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkVG9Db250ZW50KG5ld1dpZGdldDogQWpmV2lkZ2V0LCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBpZiAobXlPYmouY29udGVudFtpZHhdICE9IG51bGwpIHtcbiAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZFRvQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW4gIT0gbnVsbCkge1xuICAgICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgICBsZXQgd2lkZ2V0OiBBamZXaWRnZXQgPSBldmVudC5kcmFnRGF0YS53aWRnZXQ7XG4gICAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG5cbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaCh3aWRnZXQpO1xuXG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5hcnJheUZyb20pIHtcbiAgICAgIHRoaXMucmVtb3ZlKGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSwgZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4KTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChldmVudC5kcmFnRGF0YS53aWRnZXQpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuanNvbikge1xuICAgICAgbGV0IG9iaiA9IEpTT04ucGFyc2UoZXZlbnQuZHJhZ0RhdGEuanNvbik7XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG9iaiA9IHsnd2lkZ2V0VHlwZSc6IEFqZldpZGdldFR5cGVbZXZlbnQuZHJhZ0RhdGFdfTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGFuZ2VQb3NpdGlvbk9uQ29sdW1uKGV2ZW50OiBhbnksIHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIHRvSW5kZXg6IG51bWJlcikge1xuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcbiAgICBsZXQgZnJvbVdpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF07XG4gICAgbGV0IHRvV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF07XG5cbiAgICBpZiAoZnJvbUNvbHVtbiA9PSB0b0NvbHVtbikge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W2Zyb21JbmRleF0gPSB0b1dpZGdldDtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XSA9IGZyb21XaWRnZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudC5zcGxpY2UoZnJvbUluZGV4LCAxKTtcbiAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHRvSW5kZXgsIDAsIGZyb21XaWRnZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgdGhlIG9iaiBvbiB0aGUgaWR4IHBvc2l0aW9uLlxuICAgKiBPYmogaGF2ZSBhIG5vIHNwZWNpZmljYXRlIHdpZHRoIGFuZCBpcyBub3QgY2FsY3VsYXRlIGFzIGNvbHVtbnNcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoLTEsIGlkeCk7XG4gIH1cblxuICBjaGFuZ2VDb2x1bW4oZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBsYXlvdXRXaWRnZXQ6IEFqZkxheW91dFdpZGdldCkge1xuICAgIGlmICh0byA8IDAgfHwgdG8gPj0gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChmcm9tID4gbGF5b3V0V2lkZ2V0LmNvbnRlbnQubGVuZ3RoIC0gMSAmJiB0byA+IGZyb20pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXTtcbiAgICBsZXQgZnJvbUNvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXTtcbiAgICBsZXQgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dO1xuICAgIGxldCB0b0NvbHVtblZhbHVlOiBudW1iZXIgPSBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b107XG5cbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFtmcm9tXSA9IHRvQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dID0gdG9Db2x1bW5WYWx1ZTtcbiAgICBsYXlvdXRXaWRnZXQuY29udGVudFt0b10gPSBmcm9tQ29sdW1uO1xuICAgIGxheW91dFdpZGdldC5jb2x1bW5zW3RvXSA9IGZyb21Db2x1bW5WYWx1ZTtcblxuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChsYXlvdXRXaWRnZXQpO1xuICB9XG5cbiAgYWRkQ3VzdG9tQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX3VwZGF0ZXNbJ2NvbG9yJ10ubmV4dCgoY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcbiAgICAgIGlmIChjb2xvcnMuaW5kZXhPZihjb2xvcikgPCAwKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRXaWRnZXRUb0NvbnRhaW5lcihcbiAgICAgIHN1Ymo6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4sIHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHN1YmoubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldCh3aWRnZXQpO1xuICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFyciA9ICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gYXMgYW55W107XG4gICAgICBhcnIucHVzaCh2YWx1ZSk7XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gYXJyO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICgod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdIGFzIGFueVtdKS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==