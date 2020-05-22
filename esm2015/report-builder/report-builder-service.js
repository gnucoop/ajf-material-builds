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
import { __decorate, __metadata, __param } from "tslib";
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
    let AjfReportBuilderService = class AjfReportBuilderService {
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
    };
    AjfReportBuilderService = __decorate([
        Injectable(),
        __param(0, Optional()), __param(0, Inject(AJF_REPORTS_CONFIG)),
        __metadata("design:paramtypes", [Object])
    ], AjfReportBuilderService);
    return AjfReportBuilderService;
})();
export { AjfReportBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFvQixXQUFXLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDcEcsT0FBTyxFQUFhLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNELE9BQU8sRUFjTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFlBQVksRUFDYixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFDTCxhQUFhLEVBQ2IsTUFBTSxFQUNOLEdBQUcsRUFDSCxhQUFhLEVBQ2IsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsU0FBUyxFQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFZeEIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRTVDOzs7O0dBSUc7QUFFSDtJQUFBLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO1FBaU9sQzs7OztXQUlHO1FBQ0gsWUFBb0QsYUFBK0I7WUEvTjNFLHlCQUFvQixHQUN4QixJQUFJLE9BQU8sRUFBNkIsQ0FBQztZQVFyQyxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1lBUXZELHVCQUFrQixHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFD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LEtBQUssQ0FBQyxDQUFDO2dCQUNmLE1BQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2hDLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVPLHFDQUFxQyxDQUFDLFFBQWdCLEVBQUUsR0FBVztZQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBc0IsRUFBa0IsRUFBRTtnQkFDMUQsTUFBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUNGLENBQUE7SUF4OURZLHVCQUF1QjtRQURuQyxVQUFVLEVBQUU7UUF1T0UsV0FBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLFdBQUEsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUE7O09BdE94Qyx1QkFBdUIsQ0F3OURuQztJQUFELDhCQUFDO0tBQUE7U0F4OURZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZGb3JtLCBBamZOb2RlLCBBamZOb2RlVHlwZSwgZmxhdHRlbk5vZGVzfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uLFxuICBBamZDaGFydFdpZGdldCxcbiAgQWpmQ29sdW1uV2lkZ2V0LFxuICBBamZDdXN0b21XaWRnZXQsXG4gIEFqZkRhdGFXaWRnZXQsXG4gIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsXG4gIEFqZlJlcG9ydCxcbiAgQWpmUmVwb3J0Q29udGFpbmVyLFxuICBBamZTdHlsZXMsXG4gIEFqZlRhYmxlV2lkZ2V0LFxuICBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsXG4gIEFqZldpZGdldFR5cGUsXG4gIGNyZWF0ZUFnZ3JlZ2F0aW9uLFxuICBjcmVhdGVXaWRnZXRcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNvbWJpbmVMYXRlc3QsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwdWJsaXNoUmVwbGF5LFxuICByZWZDb3VudCxcbiAgc2NhbixcbiAgc2hhcmUsXG4gIHN0YXJ0V2l0aFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlcywgQWpmUmVwb3J0SWNvbnMsIEFqZlJlcG9ydHNDb25maWcsIEFqZldpZGdldHNDb250YWluZXJ9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkNvbG9yT3BlcmF0aW9uLFxuICBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uLFxuICBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uLFxuICBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbixcbiAgQWpmU3R5bGVzT3BlcmF0aW9uLFxuICBBamZXaWRnZXRPcGVyYXRpb24sXG4gIEFqZldpZGdldHNPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcbmltcG9ydCB7QUpGX1JFUE9SVFNfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIGFsbCB0aGUgbG9naWMgdG8gbW9kZWwgdGhlIHJlcG9ydCB3aWRnZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2Uge1xuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXN0b21XaWRnZXRzIG9ialxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHM6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+O1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBuYW1lIG9mIHRoZSBzZWN0aW9uIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnQgd2lkZ2V0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX29yaWdpbjogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBwcml2YXRlIF9vcmlnaW5VcGRhdGU6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGV4cG9ydGVkIGpzb25cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlZFJlcG9ydDogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+O1xuICBwcml2YXRlIF9zYXZlZFJlcG9ydFVwZGF0ZTogU3ViamVjdDxBamZSZXBvcnQ+ID0gbmV3IFN1YmplY3Q8QWpmUmVwb3J0PigpO1xuXG4gIHByaXZhdGUgX2pzb25TdGFjazogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcblxuICBwcml2YXRlIF9sYXN0RGVsZXRlZEpzb246IHN0cmluZ3x1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfZW1wdHlDb250ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdnZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uRHJhZ2dlZFVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICBwcml2YXRlIF9vbk92ZXI6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uT3ZlclVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIHN0YXR1cyBvZiBwZXJtYW5lbnQgem9vbVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2ZpeGVkWm9vbTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfZml4ZWRab29tVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdFbnRlcjogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclVwZGF0ZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBoZWFkZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBoZWFkZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBjb250ZW50IHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjb250ZW50IHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG5cbiAgcHJpdmF0ZSBfY29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBwcml2YXRlIF9jb2xvclVwZGF0ZTogU3ViamVjdDxBamZDb2xvck9wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZDb2xvck9wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbG9yOiBzdHJpbmdbXSA9IFtcbiAgICAncmdiYSgwLCAwLCAwLCAxKScsICAgICAgICdyZ2JhKDUxLCAxNTMsIDI1NSwgMSknLCAgJ3JnYmEoMTUzLCAyMDQsIDAsIDEpJyxcbiAgICAncmdiYSgyNTUsIDEwMiwgMCwgMSknLCAgICdyZ2JhKDAsIDIwNCwgMjA0LCAxKScsICAgJ3JnYmEoMjA0LCAyMDQsIDE1MywgMSknLFxuICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsICAgJ3JnYmEoMjMwLCAwLCAwLCAxKScsICAgICAncmdiYSgyNTUsIDE1MywgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjU1LCAwLCAxKScsICAgJ3JnYmEoMCwgMTM4LCAwLCAxKScsICAgICAncmdiYSgwLCAxMDIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDE1MywgNTEsIDI1NSwgMSknLCAgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLCAncmdiYSgyNTAsIDIwNCwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjU1LCAyMzUsIDIwNCwgMSknLCAncmdiYSgyNTUsIDI1NSwgMjA0LCAxKScsICdyZ2JhKDIwNCwgMjMyLCAyMDQsIDEpJyxcbiAgICAncmdiYSgyMDQsIDIyNCwgMjQ1LCAxKScsICdyZ2JhKDIzNSwgMjE0LCAyNTUsIDEpJywgJ3JnYmEoMTg3LCAxODcsIDE4NywgMSknLFxuICAgICdyZ2JhKDI0MCwgMTAyLCAxMDIsIDEpJywgJ3JnYmEoMjU1LCAxOTQsIDEwMiwgMSknLCAncmdiYSgyNTUsIDI1NSwgMTAyLCAxKScsXG4gICAgJ3JnYmEoMTAyLCAxODUsIDEwMiwgMSknLCAncmdiYSgxMDIsIDE2MywgMjI0LCAxKScsICdyZ2JhKDE5NCwgMTMzLCAyNTUsIDEpJyxcbiAgICAncmdiYSgxMzYsIDEzNiwgMTM2LCAxKScsICdyZ2JhKDE2MSwgMCwgMCwgMSknLCAgICAgJ3JnYmEoMTc4LCAxMDcsIDAsIDEpJyxcbiAgICAncmdiYSgxNzgsIDE3OCwgMCwgMSknLCAgICdyZ2JhKDAsIDk3LCAwLCAxKScsICAgICAgJ3JnYmEoMCwgNzEsIDE3OCwgMSknLFxuICAgICdyZ2JhKDEwNywgMzYsIDE3OCwgMSknLCAgJ3JnYmEoNjgsIDY4LCA2OCwgMSknLCAgICAncmdiYSg5MiwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDEwMiwgNjEsIDAsIDEpJywgICAgJ3JnYmEoMTAyLCAxMDIsIDAsIDEpJywgICAncmdiYSgwLCA1NSwgMCwgMSknLFxuICAgICdyZ2JhKDAsIDQxLCAxMDIsIDEpJywgICAgJ3JnYmEoNjEsIDIwLCAxMDIsIDEpJ1xuICBdO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1cnJlbnQgd2lkZ2V0IHdoaWNoIGhvbGRzIHRoZSBmb2N1cy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0OiBPYnNlcnZhYmxlPEFqZldpZGdldHxudWxsPjtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbnxudWxsPihudWxsKTtcblxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IHVwZGF0ZSBleHBvcnQgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCBjb250YWlucyB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydDogQmVoYXZpb3JTdWJqZWN0PEFqZlJlcG9ydHxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmUmVwb3J0fG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIHN0eWxlcyBvZiByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlc1VwZGF0ZTogU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBmb3JtcyBmZXRjaGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0Rm9ybXM6IE9ic2VydmFibGU8QWpmRm9ybVtdPjtcbiAgcHJpdmF0ZSBfcmVwb3J0Rm9ybXNVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBkaWN0aW9uYXJ5IGZvciAgd2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZXM6IGFueSA9IHtcbiAgICBoZWFkZXI6IHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsXG4gICAgY29udGVudDogdGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsXG4gICAgZm9vdGVyOiB0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbG9yOiB0aGlzLl9jb2xvclVwZGF0ZSxcbiAgICBjdXN0b21XaWRnZXRzOiB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlXG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiB3b250IHRvIHNhdmUgcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydEV2ZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZUZvcm11bGFUT0h0bWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0Rm9ybXVsYVRvSHRtbEV2ZW50KCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiBjb2x1bW4gd2lkdGggY2hhbmdlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9pY29uU2V0czogQWpmUmVwb3J0SWNvbnMgPSB7J2FqZi1pY29uJzogW119O1xuICBnZXQgaWNvblNldHMoKTogQWpmUmVwb3J0SWNvbnMge1xuICAgIHJldHVybiB0aGlzLl9pY29uU2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1JFUE9SVFNfQ09ORklHKSByZXBvcnRzQ29uZmlnOiBBamZSZXBvcnRzQ29uZmlnKSB7XG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG5cbiAgICBpZiAocmVwb3J0c0NvbmZpZyAhPSBudWxsKSB7XG4gICAgICBpZiAocmVwb3J0c0NvbmZpZy5pY29ucyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXRzID0gey4uLnRoaXMuX2ljb25TZXRzLCAuLi5yZXBvcnRzQ29uZmlnLmljb25zfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9vcmlnaW4gPSAoPE9ic2VydmFibGU8c3RyaW5nPj50aGlzLl9vcmlnaW5VcGRhdGUpLnBpcGUoc3RhcnRXaXRoKCdoZWFkZXInKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9zYXZlZFJlcG9ydCA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnQ+PnRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlKS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25EcmFnZ2VkID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uRHJhZ2dlZFVwZGF0ZSkucGlwZShzdGFydFdpdGgoZmFsc2UpLCBzaGFyZSgpKTtcblxuICAgIHRoaXMuX29uT3ZlciA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9vbk92ZXJVcGRhdGUpLnBpcGUoc3RhcnRXaXRoKGZhbHNlKSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9maXhlZFpvb20gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZml4ZWRab29tVXBkYXRlKS5waXBlKHN0YXJ0V2l0aChmYWxzZSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fb25EcmFnRW50ZXIgPSB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5waXBlKHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fcmVwb3J0U3R5bGVzID0gKDxPYnNlcnZhYmxlPEFqZlN0eWxlc09wZXJhdGlvbj4+dGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChzdHlsZXM6IEFqZlN0eWxlcywgb3A6IEFqZlN0eWxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA8QWpmU3R5bGVzPnt9KSwgc2hhcmUoKSwgc3RhcnRXaXRoKDxBamZTdHlsZXM+e30pKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChmb3JtczogQWpmRm9ybVtdLCBvcDogQWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChmb3Jtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2N1c3RvbVdpZGdldHMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdLCBvcDogQWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fZm9ybXNWYXJpYWJsZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fZm9ybXNWYXJpYWJsZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbmRpdGlvbk5hbWVzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24+PnRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9oZWFkZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlcyA9IHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXMgPSB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fZm9vdGVyV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mb290ZXJTdHlsZXMgPSB0aGlzLl9mb290ZXJXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9jb2xvciA9ICg8T2JzZXJ2YWJsZTxBamZDb2xvck9wZXJhdGlvbj4+dGhpcy5fY29sb3JVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2NhbigoY29sb3I6IHN0cmluZ1tdLCBvcDogQWpmQ29sb3JPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5fZGVmYXVsdENvbG9yKSwgc2hhcmUoKSwgc3RhcnRXaXRoKHRoaXMuX2RlZmF1bHRDb2xvcikpO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldCA9IHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUucGlwZShcbiAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgbWFwKHMgPT4gcyEpLFxuICAgICAgICBzY2FuKFxuICAgICAgICAgICAgKHdpZGdldDogQWpmV2lkZ2V0fG51bGwsIG9wOiBBamZXaWRnZXRPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVsbCBhcyB1bmtub3duIGFzIEFqZldpZGdldCksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zXG4gICAgICAgIC5waXBlKGZpbHRlcihmID0+IGYubGVuZ3RoICE9IDApLCBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1xuICAgICAgICAucGlwZShmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSwgbWFwKChmb3JtczogQWpmRm9ybVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpO1xuXG4gICAgY29uc3QgcmVwb3J0T2JzID0gdGhpcy5fcmVwb3J0O1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9jb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgICAgICAgbGV0IHRlbXBDb2xvcnM6IHN0cmluZ1tdID0gdGhpcy5fZGVmYXVsdENvbG9yO1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICBpZiAoci5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuY29udGVudC5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyLmZvb3Rlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmZvb3Rlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyLmhlYWRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmhlYWRlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgci5oZWFkZXIuY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbGV0IG9iaiA9IHIuaGVhZGVyLmNvbnRlbnRbaV07XG4gICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iob2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICBpZiAob2JqLndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXRPYmogPSBvYmogYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheW91dE9iai5jb250ZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbHVtbk9iaiA9IGxheW91dE9iai5jb250ZW50W2pdIGFzIEFqZkNvbHVtbldpZGdldDtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3IoY29sdW1uT2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBjb2x1bW5PYmouY29udGVudC5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZGdldE9iaiA9IGNvbHVtbk9iai5jb250ZW50W3pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHdpZGdldE9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDxzdHJpbmdbXT50ZW1wQ29sb3JzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbG9yVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLnN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnt9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+ci5zdHlsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fcmVwb3J0U3R5bGVzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmhlYWRlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmhlYWRlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5oZWFkZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5jb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuY29udGVudC5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5jb250ZW50LnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmZvb3RlciA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmZvb3Rlci5jb250ZW50IHx8IFtdLFxuICAgICAgICAgICAgICAgIHN0eWxlczogci5mb290ZXIuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0LnBpcGUobWFwKChqc29uOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiAoX3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGlmIChqc29uID0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnJlcG9ydCwgdGhpcy5yZXBvcnRGb3JtcyksXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRTdHlsZXMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAuc3Vic2NyaWJlKChyOiBbXG4gICAgICAgICAgICAgICAgICAgICBbdm9pZCwgQWpmUmVwb3J0IHwgbnVsbCwgQWpmRm9ybVtdXSwgQWpmV2lkZ2V0c0NvbnRhaW5lciwgQWpmV2lkZ2V0c0NvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgIEFqZldpZGdldHNDb250YWluZXIsIEFqZlN0eWxlc1xuICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAvLyBjb25zdCBjdXJSbyA9IHJbMF1bMV07XG4gICAgICAgICAgLy8gY29uc3QgZm9ybXMgPSByWzBdWzJdICE9IG51bGwgPyByWzBdWzJdIHx8IFtdXG4gICAgICAgICAgLy8gICAgIDogKGN1clJvICE9IG51bGwgPyBjdXJSby5mb3JtcyB8fCBbXSA6IFtdKTtcblxuICAgICAgICAgIG9iai5oZWFkZXIgPSB7Y29udGVudDogclsxXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzFdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5jb250ZW50ID0ge2NvbnRlbnQ6IHJbMl0ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclsyXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouZm9vdGVyID0ge2NvbnRlbnQ6IHJbM10ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclszXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouc3R5bGVzID0gcls0XTtcblxuICAgICAgICAgIGNvbnN0IHJvID0ge1xuICAgICAgICAgICAgaGVhZGVyOiB7Y29udGVudDogclsxXS53aWRnZXRzLCBzdHlsZXM6IHJbMV0uc3R5bGVzfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtjb250ZW50OiByWzJdLndpZGdldHMsIHN0eWxlczogclsyXS5zdHlsZXN9LFxuICAgICAgICAgICAgZm9vdGVyOiB7Y29udGVudDogclszXS53aWRnZXRzLCBzdHlsZXM6IHJbM10uc3R5bGVzfSxcbiAgICAgICAgICAgIHN0eWxlczogcls0XVxuICAgICAgICAgIH0gYXMgQWpmUmVwb3J0O1xuXG4gICAgICAgICAgdGhpcy5zZXRTYXZlUmVwb3J0KG9iaik7XG4gICAgICAgICAgdGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUubmV4dChybyk7XG4gICAgICAgICAgdGhpcy5wdXNoSnNvblN0YWNrKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogcmVtb3ZlIEFqZk5vZGVHcm91cCwgQWpmU2xpZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTdHJpbmdGaWVsZCBmcm9tIGFqZm5vZGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZmlsdGVyTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlIHx8XG4gICAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkICYmXG4gICAgICAgICAgIChub2RlIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TdHJpbmcpKSB7XG4gICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwYXJzZUNvbG9yKGNzc1N0eWxlczogYW55LCBjb2xvcnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVLZXlzID0gWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JhY2tncm91bmRDb2xvcicsICdjb2xvciddO1xuICAgIHN0eWxlS2V5cy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoY3NzU3R5bGVzW2tdICYmIGNvbG9ycy5pbmRleE9mKGNzc1N0eWxlc1trXSkgPT0gLTEpIHtcbiAgICAgICAgY29sb3JzLnB1c2goY3NzU3R5bGVzW2tdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgbGV0IHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyaWFibGVzW2ldID0ge25vZGVzOiBbXSwgbGFiZWxzOiBbXSwgbmFtZXM6IFtdLCB0eXBlczogW119O1xuXG4gICAgICBpZiAoZm9ybXNbaV0ubm9kZXMgIT0gbnVsbCAmJiBmb3Jtc1tpXS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhcmlhYmxlc1tpXS5ub2RlcyA9IHRoaXMuZmlsdGVyTm9kZXMoZmxhdHRlbk5vZGVzKGZvcm1zW2ldLm5vZGVzKSk7XG4gICAgICB9XG4gICAgICB2YXJpYWJsZXNbaV0ubGFiZWxzID0gdGhpcy5leHRyYWN0TGFiZWxzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS5uYW1lcyA9IHRoaXMuZXh0cmFjdE5hbWVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICAgIHZhcmlhYmxlc1tpXS50eXBlcyA9IHRoaXMuZXh0cmFjdFR5cGVzTm9kZXModmFyaWFibGVzW2ldLm5vZGVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhYmxlcztcbiAgfVxuICAvKipcbiAgICogdXRpbHM6XG4gICAqICB0aGUgb2JqIHJldHVybmVkIGNvbnRhaW5zIHRoZSBsYWJlbCBmaWVsZCBvZiBhamZOb2RlXG4gICAqIEBwYXJhbSBub2Rlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGV4dHJhY3RMYWJlbHNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLmxhYmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGV4dHJhY3ROYW1lc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZXh0cmFjdFR5cGVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogQWpmRmllbGRUeXBlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcDogQWpmRmllbGQgPSA8QWpmRmllbGQ+bm9kZXNbaV07XG4gICAgICBvYmoucHVzaChwLmZpZWxkVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzZXRPcmlnaW4ob3JpZ2luOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vcmlnaW5VcGRhdGUubmV4dChvcmlnaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIG1ldGhvZCByb3VuZCB0aGUgdmFsdWUgdG8gdGhlIGRlY2ltYWwgcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEBwYXJhbSBkZWNpbWFscG9zaXRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcm91bmRUbyh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsUG9zaXRpb25zOiBudW1iZXIpIHtcbiAgICBsZXQgaSA9IHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuXG4gICAgaSA9IE1hdGguZmxvb3IoaSk7XG5cbiAgICByZXR1cm4gaSAvIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyB2YWxpZGF0b3IgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpc051bWJlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eXFxkKyhcXC5cXGQrKT8vLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgaXNOdW1iZXJBcnJheSh2YWx1ZTogYW55W10pOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOdW1iZXIodmFsdWVbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdnZWQgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnZ2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ2dlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uT3ZlciBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbk92ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25PdmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZml4ZWRab29tIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZpeGVkWm9vbSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRab29tO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbUluKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21PdXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnRW50ZXIgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnRW50ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnRW50ZXI7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnRW50ZXIgd2l0aCAgc2VjdGlvbihoZWFkZXIsY29udGVudCxmb290ZXIpIGFuZCBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdFbnRlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7YXJyYXksIGluZGV4fSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25kcmFnZ2VkIHdpdGggdHJ1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cblxuICBkcmFnRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25PdmVyIHdpdGggdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIF9vbk92ZXIgd2l0aCBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBlbWl0IHNhdmUgcmVwb3J0IGV2ZW50XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2F2ZVJlcG9ydCgpIHtcbiAgICBpZiAodGhpcy5fc2F2ZVJlcG9ydEV2ZW50ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgc2F2ZUltYWdlRm9ybXVsYShmb3JtdWxhOiBBamZGb3JtdWxhKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBjb25zdCB3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgdy5mbGFnID0gZm9ybXVsYTtcbiAgICAgIHcuaWNvbiA9IGZvcm11bGE7XG4gICAgICByZXR1cm4gdztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVGb3JtdWxhVG9IdG1sKGh0bWxGb3JtdWxhOiBzdHJpbmcsIHJlZmVyZW5jZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG9iaiA9IHsnZm9ybXVsYSc6IGh0bWxGb3JtdWxhLCAncmVmZXJlbmNlJzogcmVmZXJlbmNlfTtcbiAgICAgIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmVtaXQob2JqKTtcbiAgICB9XG4gIH1cblxuICBzZXRFbXB0eUNvbnRlbnQodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fZW1wdHlDb250ZW50Lm5leHQodmFsKTtcbiAgfVxuXG5cbiAgcHVzaEpzb25TdGFjayhqc29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmluZGV4T2YoanNvbikgPT09IC0xICYmIGpzb24gIT09IHRoaXMuX2xhc3REZWxldGVkSnNvbikge1xuICAgICAgY3VycmVudFN0YWNrLnB1c2goanNvbik7XG4gICAgfVxuXG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcbiAgfVxuXG4gIHBvcEpzb25TdGFjaygpOiBzdHJpbmd8dW5kZWZpbmVkIHtcbiAgICBsZXQgZW1wdHlKc29uID0gJ3tcImhlYWRlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSwnICtcbiAgICAgICAgJ1wiY29udGVudFwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcIicgK1xuICAgICAgICAnZm9vdGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwic3R5bGVzXCI6e319JztcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG4gICAgY3VycmVudFN0YWNrLnBvcCgpO1xuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9IGN1cnJlbnRTdGFjay5wb3AoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2subGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuICAgICAgdGhpcy5fanNvblN0YWNrLm5leHQoW10pO1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQodHJ1ZSk7XG4gICAgICByZXR1cm4gZW1wdHlKc29uO1xuICAgIH1cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REZWxldGVkSnNvbjtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCB0aGUgZW1pdHRlclxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sdW1uV2lkdGhDaGFuZ2VkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9jdXN0b21XaWRnZXRzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1c3RvbVdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21XaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBDb250ZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29udGVudCBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sb3JzIG9mIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sb3JzKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cblxuICBnZXQgZW1wdHlDb250ZW50KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lbXB0eUNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUFycmF5V2lkZ2V0cyh0eXBlOiBzdHJpbmcsIG5ld1dpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcikge1xuICAgIGlmICgodHlwZSAhPT0gJ2hlYWRlcicpICYmICh0eXBlICE9PSAnY29udGVudCcpICYmICh0eXBlICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlICcgKyB0eXBlKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlc1t0eXBlXS5uZXh0KChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2Zvcm1zVmFyaWFibGVzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm1zVmFyaWFibGVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1zVmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbk5hbWVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbk5hbWVzO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXJyZW50V2lkZ2V0KCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBVcGRhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGUgd2l0aCBuZXdXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVDdXJyZW50V2lkZ2V0KG5ld1dpZGdldDogQWpmV2lkZ2V0fG51bGwpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKF93aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGdldFNhdmVSZXBvcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVJlcG9ydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2pzb25TYXZlZFJlcG9ydCBvYmVzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U2F2ZWQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZWRSZXBvcnQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydFN0eWxlcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0Rm9ybXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0Rm9ybXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtW10+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0Rm9ybXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBfb3JpZ2luIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9yaWdpbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXNzaWducyB0aGUgbmV3IHdpZHRoIHRvIHRoZSBpZHggY29sdW1uXG4gICAqIGFuZCByZWNhbGN1bGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBvZiB0aGUgbGF5b3V0LlxuICAgKiBUaGUgcmFuZ2UgdmFsdWUgYXJlIGZyb20gMCwxIHRvIDEuXG4gICAqXG4gICAqIFJVTEVTOlxuICAgKiBUaGUgbWluIHZhbHVlIGZvciBjb2x1bW4gaXMgMCwxLlxuICAgKiBUaGUgc3VtIG9mIGFsbCBjb2x1bW5zIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKiBUaGUgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZXMuXG4gICAqIElmIGlzIHByZXNlbnQgb25seSBvbmUgY29sdW1uIHRoZSB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICpcbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA+YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgZGVjcmVhc2VzLlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYDxgIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBpbmNyZWFzZXMuXG4gICAqXG4gICAqIFdoZW4gdmFsdWVzIOKAi+KAi2FyZSBwZXJpb2RpYywgcm91bmRpbmcgYXNzaWducyB0aGUgZ2FwIHRvIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKiBGb3IgZXhhbXBsZTogMyBjb2x1bW5zIHdpdGggMCwzMyBiZWxpZXZlIDEgY29sdW1uIDAsMzQgYW5kIDIgY29sdW1ucyAwLDMzLlxuICAgKlxuICAgKiBAcGFyYW0gbmV3VmFsdWVcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGluc3RhbnRDb2x1bW5WYWx1ZShuZXdWYWx1ZTogbnVtYmVyLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGxldCBzaXplID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgIGxldCBzcHJlYWRWYWx1ZSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgbGV0IGlkeEZpcnN0Tm9PYmogPSAtMTtcblxuICAgICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kRmlyc3ROb09iaiA9IGZhbHNlO1xuXG4gICAgICBsZXQgcmUxID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldWzAtOV0kKScpO1xuICAgICAgbGV0IHJlMiA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XSQpJyk7XG4gICAgICBsZXQgcmUzID0gbmV3IFJlZ0V4cCgnXlsxXSQnKTtcblxuICAgICAgbGV0IG9sZFZhbHVlID0gbXlPYmouY29sdW1uc1tpZHhdO1xuXG4gICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8obmV3VmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHZhbHVlJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvbGRWYWx1ZSA9PSAtMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgICAgb2JqTnVtLS07XG4gICAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKHNpemUgLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMC4xO1xuICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSA8IDAuMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgIH1cblxuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IC0xKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbMF0gPSAxO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8IDAuMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMC4xO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlICsgMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSA+IDEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDEgLSAoMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkgJiYgKG9sZFZhbHVlID09PSAwLjEpKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlID4gbmV3VmFsdWUpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlIC0gbmV3VmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGQgPSBmYWxzZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChuZXdWYWx1ZSAtIG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzcHJlYWRWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3ByZWFkVmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgIGlmIChzcHJlYWRWYWx1ZSA8IDAuMDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICBpZiAoKGkgPT0gaWR4KSkge1xuICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKChteU9iai5jb2x1bW5zW2ldID4gMC45KSAmJiAobXlPYmouY29sdW1ucy5sZW5ndGggLSBvYmpOdW0gIT0gMSkpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC45MDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA8IDAuMSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjEwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaV0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgc3VtICs9IG15T2JqLmNvbHVtbnNbaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhzdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaiA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWR4Rmlyc3ROb09iaiA9IGk7XG4gICAgICAgICAgICBmb3VuZEZpcnN0Tm9PYmogPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhGaXJzdE5vT2JqXSArPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gIT09IC0xICYmICFyZTEudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmXG4gICAgICAgICAgICAhcmUyLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJiAhcmUzLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSkge1xuICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKDAuMTAsIGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXIuZW1pdCgpO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGltYWdlVXJsIG9uIHRoZSBjdXJyZW50IEFqZkltYWdlV2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRJbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai51cmwgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ltYWdlVXJsfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouaWNvbiA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aWNvbn1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEZsYWcodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgICAgbXlPYmouZmxhZyA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7dmFsdWV9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKGNvbmRpdGlvblRleHQ6IHN0cmluZykge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh3aWRnZXQudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIHdpZGdldC52aXNpYmlsaXR5LmNvbmRpdGlvbiA9IGNvbmRpdGlvblRleHQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNoYXJ0Rm9ybXVsYShcbiAgICAgIF9sYWJlbDogc3RyaW5nLCBfbGV2ZWw6IG51bWJlciwgX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlciwgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmIHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJvdyB0aGF0IGNvbnRhaW5zIG1haW4gZGF0YSBpcyBkZWZpbmVkXG4gICAgICAgIC8qIGlmICh3aWRnZXQuZGF0YXNldFswXSA9PSBudWxsKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZXZlbCA9PSAwICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PSAxICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleCArIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZVRhYmxlRm9ybXVsYShcbiAgICAgIF9sYWJlbDogc3RyaW5nLCBhZ2dyZWdhdGlvblR5cGU6IG51bWJlciwgZm9ybXVsYVRleHQ6IHN0cmluZywgX21haW5JbmRleDogbnVtYmVyLFxuICAgICAgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmVGFibGVXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgZGF0YXNldDogQWpmRGF0YXNldCA9IG5ldyBBamZEYXRhc2V0KCk7XG4gICAgICAgIC8vIGxldCByb3dEYXRhc2V0OiBBamZEYXRhc2V0W10gPSBbXTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLyogaWYgKG1haW5JbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdkYXRhc2V0JywgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkRhdGFXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAvKiBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB0eXBlIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRUeXBlKHR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgndHlwZScsIHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSAgaWR4IGVsZW1lbnQgb2YgeExhYmVscyBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlTWFpbkRhdGEoX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8vIG15T2JqLmRhdGFzZXRbMF0uc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKF9tYWluSWR4OiBudW1iZXIsIF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvKiBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JZHggKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbklkeCArIDFdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYmFja2dyb3VuZENvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBib3JkZXJDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCb3JkZXJDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBzZXRDaGFydEJvcmRlcldpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlcldpZHRoJywgdmFsdWUpO1xuICB9XG5cbiAgYWRkQ2hhcnRCb3JkZXJDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJvcmRlckNvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnQocmVwb3J0OiBBamZSZXBvcnQpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXBvcnQubmV4dChyZXBvcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNhdmVSZXBvcnQoanNvbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVJlcG9ydC5uZXh0KGpzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZm9udCBhdHRyaWJ1dGUgb24gdGhlIGN1cnJlbnQgQWpmV2lkZ2V0LlxuICAgKlxuICAgKiBUaGVyZSBpcyBhIGNoZWNrIG9uIGZvbnQtc2l6ZSBhdHRyaWJ1dGUsXG4gICAqIGlmIGlzIG5vIHNwZWNpZmljYXRlIHRoZSB0eXBlIG9mIHNpemUgZm9udCBzZXQgJ3B0JyBhcyBkZWZhdWx0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8c3RyaW5nW10pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmVGV4dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGNvbnN0IHB4U3R5bGVzID1cbiAgICAgICAgICBbJ2ZvbnQtc2l6ZScsICdoZWlnaHQnLCAnd2lkdGgnLCAnYm9yZGVyLXdpZHRoJywgJ2JvcmRlci1yYWRpdXMnLCAncGFkZGluZycsICdtYXJnaW4nXTtcbiAgICAgIGNvbnN0IGlzUHhTdHlsZSA9IHB4U3R5bGVzLmluZGV4T2YobGFiZWwpID4gLTE7XG4gICAgICBpZiAoaXNQeFN0eWxlICYmICEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgKz0gJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAoaXNQeFN0eWxlICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5pc051bWJlckFycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IGAke3ZhbHVlLmpvaW4oJ3B4ICcpfXB4YDtcbiAgICAgIH1cblxuICAgICAgbXlPYmouc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgdXBkYXRlIHRoZSBzdHlsZXMgb2Ygb3JpZ2luIHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMob3JpZ2luOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9yaWdpbiAhPT0gJ2hlYWRlcicpICYmIChvcmlnaW4gIT09ICdjb250ZW50JykgJiYgKG9yaWdpbiAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuY2tub3cgb3JpZ2luICcgKyBvcmlnaW4pO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZXNbb3JpZ2luXS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHdpZGdldC5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHdpZGdldC5zdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi53aWRnZXQuc3R5bGVzfTtcblxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBzZXQgdGhlIHN0eWxlIG9mIHRoZSB3aG9sZSByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZS5uZXh0KChzdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICBpZiAoc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgc3R5bGVzID0ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZXNbbGFiZWxdID0gdmFsdWU7XG4gICAgICAgIHN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLnN0eWxlc307XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgZm9ybXNcbiAgICpcbiAgICogQHBhcmFtIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0Rm9ybXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIHRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlLm5leHQoKF9mb3JtOiBBamZGb3JtW10pOiBBamZGb3JtW10gPT4ge1xuICAgICAgcmV0dXJuIGZvcm1zIHx8IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDdXN0b21XaWRnZXRzKHdpZGdldDogQWpmQ3VzdG9tV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzID0gY3VzdG9tV2lkZ2V0cyB8fCBbXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlc2V0Q3VzdG9tV2lkZ2V0cygpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGxhYmVsIG9mIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY2hhbmdlTGFiZWxDdXN0b21XaWRnZXQobGFiZWw6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzW3Bvc2l0aW9uXS50eXBlID0gbGFiZWw7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9oZWFkZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRIZWFkZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfY29udGVudFdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbnRlbnRXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2Zvb3RlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZGZvb3RlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCBzcHJlYWRWYWx1ZTogYW55O1xuICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gdmFsdWU7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgc3ByZWFkVmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMucm91bmRUbygoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gdGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGNoZWNrU3VtIDwgMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IE51bWJlcih0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb2x1bW4gb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBXaGVuIGFkZGluZyBhIGNvbHVtbiB0aGUgd2lkdGggb2YgdGhlIG90aGVyIGNvbHVtbnMgaXMgcmVjYWxjdWxhdGVkXG4gICAqIGJ5IGRpdmlkaW5nIGl0IGJ5IHRoZSBudW1iZXIgb2YgY29sdW1uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IHRlbXBPYmo6IG51bWJlcltdID0gW107XG4gICAgICBsZXQgbnVtID0gbXlPYmouY29sdW1ucy5sZW5ndGggKyAxO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCB0bXBWYWx1ZTogYW55O1xuXG4gICAgICBpZiAobnVtID4gMTApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleGNlZWQgbWF4IGNvbHVtbnMnKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPT09IC0xKSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2godmFsdWUpO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICB0bXBWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgdGVtcE9ialswXSAtPSB0bXBWYWx1ZTtcbiAgICAgICAgdGVtcE9ialswXSA9IHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIHRlbXBPYmpbMF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBteU9iai5jb2x1bW5zID0gdGVtcE9iajtcblxuICAgICAgLy8gVE9ETzogQHRyaWsgd2hhdCdzIHZhbHVlPyE/XG4gICAgICBjb25zdCBjb2x1bW5PYmogPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiA3LFxuICAgICAgICAvLyB2YWx1ZTogbXlPYmouY29sdW1uc1tteU9iai5jb2x1bW5zLmxlbmd0aCAtIDFdLFxuICAgICAgfSk7XG5cbiAgICAgIG15T2JqLmNvbnRlbnQucHVzaChjb2x1bW5PYmopO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVdpZGdldFRvQ29sdW1uKGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29sdW1uLmNvbnRlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmUgYSB3aWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKiB0aGUgcG9zaXRpb24gYXJyYXk6XG4gICAqXG4gICAqIGhlYWRlciAtYD5gIGhlYWRlcldpZGdldHNcbiAgICogY29udGVudCAtYD5gIGNvbnRlbnRXaWRnZXRzXG4gICAqIGZvb3RlciAtYD5gIGZvb3RlcldpZGdldHNcbiAgICogY29sdW1uIC1gPmAgY29sdW1uIG9mIGxheW91dFxuICAgKiBsYXlvdXRDb250ZW50IC1gPmAgY29udGVudCBvZiBsYXlvdXRcbiAgICogb2JqIC1gPmAgb2JqIG9mIGxheW91dFxuICAgKiBjdXN0b21XaWRnZXQgLWA+YCBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHggdGhlIHBvc2l0aW9uIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlKG5vZGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKG5vZGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzLndpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGF5b3V0JzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG15T2JqID0gd2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgKG15T2JqLmNvbnRlbnRbMF0gYXMgQWpmQ29sdW1uV2lkZ2V0KS5jb250ZW50Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NvbHVtbic6XG4gICAgICBjYXNlICdsYXlvdXRDb250ZW50JzpcbiAgICAgIGNhc2UgJ3VuZml4ZWRDb2x1bW4nOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgICAgICBpZiAobm9kZSA9PT0gJ2NvbHVtbicpIHtcbiAgICAgICAgICAgIGxldCBjbG0gPSA8QWpmQ29sdW1uV2lkZ2V0PndpZGdldDtcbiAgICAgICAgICAgIGNsbS5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ2xheW91dENvbnRlbnQnKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIGxlbmd0aCBpcyAwJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29udGVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW4gbm90IHJlbW92ZSBhbnkgd2lkZ2V0IGZyb20gZW1wdHkgY29udGVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPSBudWxsICYmIG15T2JqLmNvbnRlbnRbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gJ3VuZml4ZWRDb2x1bW4nKSB7XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9PSAtMSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gcG9zaXRpb24gdmFsdWUgIGlzbnQgLTEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudW5maXhlZENvbHVtbihpZHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBpZiAobm9kZSAhPT0gJ29iaicpIHtcbiAgICAgICAgICAvLyAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAvLyAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgLy8gICB9XG4gICAgICAgICAgLy8gICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjdXN0b21XaWRnZXRzJzoge1xuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgIH0gYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gbm9kZSAnICsgbm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCBhIEFqZldpZGdldCBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZFRvQ29udGVudChuZXdXaWRnZXQ6IEFqZldpZGdldCwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgaWYgKG15T2JqLmNvbnRlbnRbaWR4XSAhPSBudWxsKSB7XG4gICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDAsIG5ld1dpZGdldCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBhZGRUb0NvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgICAgbGV0IHdpZGdldDogQWpmV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEud2lkZ2V0O1xuICAgICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuXG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2god2lkZ2V0KTtcblxuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tKSB7XG4gICAgICB0aGlzLnJlbW92ZShldmVudC5kcmFnRGF0YS5hcnJheUZyb20sIGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleCk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2goZXZlbnQuZHJhZ0RhdGEud2lkZ2V0KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmpzb24pIHtcbiAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGV2ZW50LmRyYWdEYXRhLmpzb24pO1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvYmogPSB7J3dpZGdldFR5cGUnOiBBamZXaWRnZXRUeXBlW2V2ZW50LmRyYWdEYXRhXX07XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hhbmdlUG9zaXRpb25PbkNvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCB0b0luZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG4gICAgbGV0IGZyb21XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdO1xuICAgIGxldCB0b1dpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdO1xuXG4gICAgaWYgKGZyb21Db2x1bW4gPT0gdG9Db2x1bW4pIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdID0gdG9XaWRnZXQ7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF0gPSBmcm9tV2lkZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZSh0b0luZGV4LCAwLCBmcm9tV2lkZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIHRoZSBvYmogb24gdGhlIGlkeCBwb3NpdGlvbi5cbiAgICogT2JqIGhhdmUgYSBubyBzcGVjaWZpY2F0ZSB3aWR0aCBhbmQgaXMgbm90IGNhbGN1bGF0ZSBhcyBjb2x1bW5zXG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKC0xLCBpZHgpO1xuICB9XG5cbiAgY2hhbmdlQ29sdW1uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgbGF5b3V0V2lkZ2V0OiBBamZMYXlvdXRXaWRnZXQpIHtcbiAgICBpZiAodG8gPCAwIHx8IHRvID49IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZnJvbSA+IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCAtIDEgJiYgdG8gPiBmcm9tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV07XG4gICAgbGV0IGZyb21Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV07XG4gICAgbGV0IHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W3RvXTtcbiAgICBsZXQgdG9Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dO1xuXG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV0gPSB0b0NvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXSA9IHRvQ29sdW1uVmFsdWU7XG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dID0gZnJvbUNvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b10gPSBmcm9tQ29sdW1uVmFsdWU7XG5cbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobGF5b3V0V2lkZ2V0KTtcbiAgfVxuXG4gIGFkZEN1c3RvbUNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91cGRhdGVzWydjb2xvciddLm5leHQoKGNvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICBpZiAoY29sb3JzLmluZGV4T2YoY29sb3IpIDwgMCkge1xuICAgICAgICBjb2xvcnMucHVzaChjb2xvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3JzO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkV2lkZ2V0VG9Db250YWluZXIoXG4gICAgICBzdWJqOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+LCB3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBzdWJqLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnNwbGljZShwb3NpdGlvbiwgMCwgd2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICB9KTtcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQod2lkZ2V0KTtcbiAgICB0aGlzLnNldEVtcHR5Q29udGVudChmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBhcnIgPSAoPEFycmF5PGFueT4+KHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSk7XG4gICAgICBhcnIucHVzaCh2YWx1ZSk7XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gYXJyO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICg8QXJyYXk8YW55Pj4od2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdKS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==