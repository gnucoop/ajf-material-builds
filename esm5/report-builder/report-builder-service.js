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
import { __assign } from "tslib";
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
var AjfReportBuilderService = /** @class */ (function () {
    /**
     * Creates an instance of AjfReportBuilderService.
     *
     * @memberOf AjfReportBuilderService
     */
    function AjfReportBuilderService(reportsConfig) {
        var _this = this;
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
        this._iconSets = {
            'ajf-icon': []
        };
        this._lastDeletedJson = '';
        if (reportsConfig != null) {
            if (reportsConfig.icons != null) {
                this._iconSets = __assign(__assign({}, this._iconSets), reportsConfig.icons);
            }
        }
        this._origin = this._originUpdate.pipe(startWith('header'), share());
        this._savedReport = this._savedReportUpdate.pipe(share());
        this._onDragged = this._onDraggedUpdate.pipe(startWith(false), share());
        this._onOver = this._onOverUpdate.pipe(startWith(false), share());
        this._fixedZoom = this._fixedZoomUpdate.pipe(startWith(false), share());
        this._onDragEnter = this._onDragEnterUpdate.pipe(share());
        this._reportStyles = this._reportStylesUpdate
            .pipe(scan(function (styles, op) {
            return op(styles);
        }, {}), share(), startWith({}));
        this._reportForms = this._reportFormsUpdate
            .pipe(scan(function (forms, op) {
            return op(forms);
        }, []), share(), startWith([]));
        this._customWidgets =
            this._customWidgetsUpdate
                .pipe(scan(function (widgets, op) {
                return op(widgets);
            }, []), share(), startWith([]));
        this._formsVariables =
            this._formsVariablesUpdate
                .pipe(filter(function (s) { return s != null; }), scan(function (variables, op) {
                return op(variables);
            }, []), publishReplay(1), refCount());
        this._conditionNames =
            this._conditionNamesUpdate
                .pipe(filter(function (s) { return s != null; }), scan(function (variables, op) {
                return op(variables);
            }, []), share(), startWith([]));
        this._headerWidgets = this._headerWidgetsUpdate
            .pipe(scan(function (widgets, op) {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._headerStyles = this._headerWidgets.pipe(map(function (widgets) {
            return widgets != null ? widgets.styles : {};
        }));
        this._contentWidgets = this._contentWidgetsUpdate
            .pipe(scan(function (widgets, op) {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._contentStyles = this._contentWidgets.pipe(map(function (widgets) {
            return widgets != null ? widgets.styles : {};
        }));
        this._footerWidgets = this._footerWidgetsUpdate
            .pipe(scan(function (widgets, op) {
            return op(widgets);
        }, { widgets: [], styles: {} }), startWith({ widgets: [], styles: {} }), publishReplay(1), refCount());
        this._footerStyles = this._footerWidgets.pipe(map(function (widgets) {
            return widgets != null ? widgets.styles : {};
        }));
        this._color = this._colorUpdate
            .pipe(scan(function (color, op) {
            return op(color);
        }, this._defaultColor), share(), startWith(this._defaultColor));
        this._currentWidget = this._currentWidgetUpdate.pipe(filter(function (s) { return s != null; }), map(function (s) { return s; }), scan(function (widget, op) {
            return op(widget);
        }, null), publishReplay(1), refCount());
        this._reportForms.pipe(filter(function (f) { return f.length != 0; }), map(function (forms) {
            return function (_c) {
                return _this.fillFormsVariables(forms);
            };
        })).subscribe(this._formsVariablesUpdate);
        this._reportForms.pipe(filter(function (f) { return f.length != 0; }), map(function (forms) {
            return function (_c) {
                return _this.fillFormsVariables(forms);
            };
        })).subscribe(this._conditionNamesUpdate);
        var reportObs = this._report;
        reportObs.pipe(map(function (r) {
            return function (_colors) {
                var tempColors = _this._defaultColor;
                if (r == null) {
                    return [];
                }
                else {
                    _this.parseColor(r.styles, tempColors);
                    if (r.content) {
                        _this.parseColor(r.content.styles, tempColors);
                    }
                    if (r.footer) {
                        _this.parseColor(r.footer.styles, tempColors);
                    }
                    if (r.header) {
                        _this.parseColor(r.header.styles, tempColors);
                        for (var i = 0; i < r.header.content.length; i++) {
                            var obj = r.header.content[i];
                            _this.parseColor(obj.styles, tempColors);
                            if (obj.widgetType === AjfWidgetType.Layout) {
                                var layoutObj = obj;
                                for (var j = 0; j < layoutObj.content.length; j++) {
                                    var columnObj = layoutObj.content[j];
                                    _this.parseColor(columnObj.styles, tempColors);
                                    for (var z = 0; z < columnObj.content.length; z++) {
                                        var widgetObj = columnObj.content[z];
                                        _this.parseColor(widgetObj.styles, tempColors);
                                    }
                                }
                            }
                        }
                    }
                }
                return tempColors;
            };
        })).subscribe(this._colorUpdate);
        reportObs
            .pipe(map(function (r) {
            return function (_styles) {
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
            .pipe(map(function (r) {
            return function (_widgets) {
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
            .pipe(map(function (r) {
            return function (_widgets) {
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
            .pipe(map(function (r) {
            return function (_widgets) {
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
        this._saveReport.pipe(map(function (json) {
            return function (_r) {
                if (json = null) {
                    return {};
                }
                return json;
            };
        }));
        this._saveReportEvent
            .pipe(combineLatest(this.report, this.reportForms), combineLatest(this._headerWidgets.pipe(filter(function (w) { return w != null; })), this._contentWidgets.pipe(filter(function (w) { return w != null; })), this._footerWidgets.pipe(filter(function (w) { return w != null; })), this._reportStyles.pipe(filter(function (w) { return w != null; }))))
            .subscribe(function (r) {
            var obj = {};
            // const curRo = r[0][1];
            // const forms = r[0][2] != null ? r[0][2] || []
            //     : (curRo != null ? curRo.forms || [] : []);
            obj.header = { content: r[1].widgets.map(function (w) { return deepCopy(w); }), styles: r[1].styles };
            obj.content = { content: r[2].widgets.map(function (w) { return deepCopy(w); }), styles: r[2].styles };
            obj.footer = { content: r[3].widgets.map(function (w) { return deepCopy(w); }), styles: r[3].styles };
            obj.styles = r[4];
            var ro = {
                header: { content: r[1].widgets, styles: r[1].styles },
                content: { content: r[2].widgets, styles: r[2].styles },
                footer: { content: r[3].widgets, styles: r[3].styles },
                styles: r[4]
            };
            _this.setSaveReport(obj);
            _this._savedReportUpdate.next(ro);
            _this.pushJsonStack(JSON.stringify(obj));
        });
    }
    AjfReportBuilderService.prototype.getFormulaToHtmlEvent = function () {
        return this._saveFormulaTOHtml.asObservable();
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "iconSets", {
        get: function () { return this._iconSets; },
        enumerable: true,
        configurable: true
    });
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
    AjfReportBuilderService.prototype.filterNodes = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.nodeType === AjfNodeType.AjfNodeGroup || node.nodeType === AjfNodeType.AjfSlide ||
                node.nodeType === AjfNodeType.AjfRepeatingSlide ||
                (node.nodeType === AjfNodeType.AjfField &&
                    node.fieldType === AjfFieldType.String)) {
                nodes.splice(i, 1);
                i--;
            }
        }
        return nodes;
    };
    AjfReportBuilderService.prototype.parseColor = function (cssStyles, colors) {
        var styleKeys = ['background-color', 'backgroundColor', 'color'];
        styleKeys.forEach(function (k) {
            if (cssStyles[k] &&
                colors.indexOf(cssStyles[k]) == -1) {
                colors.push(cssStyles[k]);
            }
        });
    };
    AjfReportBuilderService.prototype.fillFormsVariables = function (forms) {
        var variables = [];
        for (var i = 0; i < forms.length; i++) {
            variables[i] = { nodes: [], labels: [], names: [], types: [] };
            if (forms[i].nodes != null && forms[i].nodes.length > 0) {
                variables[i].nodes = this.filterNodes(flattenNodes(forms[i].nodes));
            }
            variables[i].labels = this.extractLabelsNodes(variables[i].nodes);
            variables[i].names = this.extractNamesNodes(variables[i].nodes);
            variables[i].types = this.extractTypesNodes(variables[i].nodes);
        }
        return variables;
    };
    /**
     * utils:
     *  the obj returned contains the label field of ajfNode
     * @param nodes
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.extractLabelsNodes = function (nodes) {
        var obj = [];
        for (var i = 0; i < nodes.length; i++) {
            obj.push(nodes[i].label);
        }
        return obj;
    };
    AjfReportBuilderService.prototype.extractNamesNodes = function (nodes) {
        var obj = [];
        for (var i = 0; i < nodes.length; i++) {
            obj.push(nodes[i].name);
        }
        return obj;
    };
    AjfReportBuilderService.prototype.extractTypesNodes = function (nodes) {
        var obj = [];
        for (var i = 0; i < nodes.length; i++) {
            var p = nodes[i];
            obj.push(p.fieldType);
        }
        return obj;
    };
    AjfReportBuilderService.prototype.setOrigin = function (origin) {
        this._originUpdate.next(origin);
    };
    /**
     * utils:
     * This method round the value to the decimal position
     *
     * @param value
     * @param decimalpositions
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.roundTo = function (value, decimalPositions) {
        var i = value * Math.pow(10, decimalPositions);
        i = Math.floor(i);
        return i / Math.pow(10, decimalPositions);
    };
    /**
     * utils:
     * This validator check if the value is a number.
     *
     * @param value
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.isNumber = function (value) {
        return /^\d+(\.\d+)?/.test(value);
    };
    AjfReportBuilderService.prototype.isNumberArray = function (value) {
        for (var i = 0; i < value.length; i++) {
            if (!this.isNumber(value[i])) {
                return false;
            }
        }
        return true;
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "onDragged", {
        /**
         * get _onDragged Observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._onDragged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "onOver", {
        /**
         * get _onOver Observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._onOver;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "fixedZoom", {
        /**
         * get _fixedZoom Observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._fixedZoom;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  change status of _fixedZoom in true
     *
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.fixedZoomIn = function () {
        this._fixedZoomUpdate.next(true);
    };
    /**
     *  change status of _fixedZoom in false
     *
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.fixedZoomOut = function () {
        this._fixedZoomUpdate.next(false);
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "onDragEnter", {
        /**
         * get _onDragEnter observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._onDragEnter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  update _onDragEnter with  section(header,content,footer) and index
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.dragEnter = function (array, index) {
        this._onDragEnterUpdate.next({ array: array, index: index });
    };
    /**
     *  update _ondragged with true
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.dragStarted = function () {
        this._onDraggedUpdate.next(true);
    };
    /**
     *  update _onDragged with false
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.dragEnded = function () {
        this._onDraggedUpdate.next(false);
    };
    /**
     *  update _onOver with true
     *
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.overStarted = function () {
        this._onOverUpdate.next(true);
    };
    /**
     * update _onOver with false
     *
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.overEnded = function () {
        this._onOverUpdate.next(false);
    };
    /**
     *
     *  update _onDragged with false
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.dragLeave = function () {
        this._onDragEnterUpdate.next({});
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "report", {
        /**
         * Get the report
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._report.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * emit save report event
     *
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.saveReport = function () {
        if (this._saveReportEvent != null) {
            this._saveReportEvent.emit();
        }
    };
    AjfReportBuilderService.prototype.saveImageFormula = function (formula) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return widget;
            }
            var w = widget;
            w.flag = formula;
            w.icon = formula;
            return w;
        });
    };
    AjfReportBuilderService.prototype.saveFormulaToHtml = function (htmlFormula, reference) {
        if (this._saveFormulaTOHtml != null) {
            var obj = {
                'formula': htmlFormula,
                'reference': reference
            };
            this._saveFormulaTOHtml.emit(obj);
        }
    };
    AjfReportBuilderService.prototype.setEmptyContent = function (val) {
        this._emptyContent.next(val);
    };
    AjfReportBuilderService.prototype.pushJsonStack = function (json) {
        var currentStack = this._jsonStack.getValue();
        if (currentStack.indexOf(json) === -1 && json !== this._lastDeletedJson) {
            currentStack.push(json);
        }
        this._jsonStack.next(currentStack);
    };
    AjfReportBuilderService.prototype.popJsonStack = function () {
        var emptyJson = '{"header":{"content":[],"styles":{}},' +
            '"content":{"content":[],"styles":{}},"' +
            'footer":{"content":[],"styles":{}},"styles":{}}';
        var currentStack = this._jsonStack.getValue();
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
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "columnWidthChanged", {
        /**
         * get the emitter
         *
         * @readonly
         *
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this.columnWidthChangedEmitter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "customWidgets", {
        /**
         * get _customWidgets Observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._customWidgets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "headerWidgets", {
        /**
         * Get the header widget
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._headerWidgets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "headerStyles", {
        /**
         * Get the header styles
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._headerStyles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "contentWidgets", {
        /**
         * Get the Content widget
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._contentWidgets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "contentStyles", {
        /**
         * Get the content styles
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._contentStyles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "footerWidgets", {
        /**
         * Get the footer widget
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._footerWidgets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "footerStyles", {
        /**
         * Get the footer styles
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._footerStyles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "colors", {
        /**
         * Get the colors of report
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "emptyContent", {
        get: function () {
            return this._emptyContent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param type
     * @param newWidget
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.updateArrayWidgets = function (type, newWidget) {
        if ((type !== 'header') && (type !== 'content') && (type !== 'footer')) {
            throw new Error('Unknown type ' + type);
        }
        this._updates[type].next(function (_widgets) {
            return newWidget;
        });
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "formsVariables", {
        /**
         * get _formsVariables Observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._formsVariables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "conditionNames", {
        get: function () {
            return this._conditionNames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "currentWidget", {
        /**
         * Get the current widget
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._currentWidget;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method Update _currentWidgetUpdate with newWidget.
     *
     * @param newWidget
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.updateCurrentWidget = function (newWidget) {
        var _this = this;
        this._currentWidgetUpdate.next(function (_widget) {
            _this._saveReportEvent.emit();
            return newWidget;
        });
    };
    Object.defineProperty(AjfReportBuilderService.prototype, "getSaveReport", {
        /**
         * Get the report
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._saveReport.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "reportSaved", {
        /**
         * get _jsonSavedReport obeservable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._savedReport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "reportStyles", {
        /**
         * get _reportStyles observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._reportStyles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "reportForms", {
        /**
         * get _reportForms observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._reportForms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderService.prototype, "origin", {
        /**
         * get the _origin Observable
         *
         * @readonly
         * @memberOf AjfReportBuilderService
         */
        get: function () {
            return this._origin;
        },
        enumerable: true,
        configurable: true
    });
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
    AjfReportBuilderService.prototype.instantColumnValue = function (newValue, idx) {
        var _this = this;
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return widget;
            }
            var myObj = widget;
            var size = myObj.columns.length;
            var spreadValue = 0;
            var objNum = 0;
            var sum = 0;
            var idxFirstNoObj = -1;
            var add = false;
            var foundFirstNoObj = false;
            var re1 = new RegExp('(^[0]\.\[1-9][0-9]$)');
            var re2 = new RegExp('(^[0]\.\[1-9]$)');
            var re3 = new RegExp('^[1]$');
            var oldValue = myObj.columns[idx];
            newValue = Number(_this.roundTo(newValue, 2).toFixed(2));
            if (myObj.columns[idx] == null) {
                throw new Error('invalid value');
            }
            for (var j = 0; j < size; j++) {
                if (myObj.columns[j] === -1) {
                    objNum++;
                }
            }
            if (oldValue == -1) {
                oldValue = 0.1;
                objNum--;
                newValue = Number(_this.roundTo(1 / (size - objNum), 2).toFixed(2));
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
                spreadValue = Number(_this.roundTo(spreadValue, 2).toFixed(2));
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
            for (var i = 0; i < size; i++) {
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
                        myObj.columns[i] = Number(_this.roundTo(myObj.columns[i], 2).toFixed(2));
                        sum += myObj.columns[i];
                    }
                    sum = Number(_this.roundTo(sum, 2).toFixed(2));
                    if (foundFirstNoObj == false) {
                        idxFirstNoObj = i;
                        foundFirstNoObj = true;
                    }
                }
            }
            if (newValue === -1) {
                myObj.columns[idx] = -1;
                if (foundFirstNoObj) {
                    myObj.columns[idxFirstNoObj] += Number(_this.roundTo(1 - sum, 2).toFixed(2));
                }
            }
            else {
                myObj.columns[idx] = Number(_this.roundTo(1 - sum, 2).toFixed(2));
            }
            for (var j = 0; j < myObj.columns.length; j++) {
                if (myObj.columns[j] !== -1 &&
                    !re1.test(String(myObj.columns[j])) &&
                    !re2.test(String(myObj.columns[j])) &&
                    !re3.test(String(myObj.columns[j]))) {
                    _this.instantColumnValue(0.10, j);
                }
            }
            _this.columnWidthChangedEmitter.emit();
            _this._saveReportEvent.emit();
            return myObj;
        });
    };
    /**
     * This method set the imageUrl on the current AjfImageWidget.
     *
     * @param imageUrl
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setImageUrl = function (imageUrl) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            var myObj = widget;
            myObj.url = createFormula({ formula: "\"" + imageUrl + "\"" });
            return myObj;
        });
    };
    AjfReportBuilderService.prototype.setIcon = function (icon) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            var myObj = widget;
            myObj.icon = createFormula({ formula: "\"" + icon + "\"" });
            return myObj;
        });
    };
    AjfReportBuilderService.prototype.setFlag = function (value) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            var myObj = widget;
            myObj.flag = createFormula({ formula: "\"" + value + "\"" });
            return myObj;
        });
    };
    AjfReportBuilderService.prototype.saveCondition = function (conditionText) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            if (widget.visibility != null) {
                widget.visibility.condition = conditionText;
            }
            return widget;
        });
    };
    AjfReportBuilderService.prototype.saveChartFormula = function (_label, _level, _mainIndex, _index, formulaText, aggregationType) {
        this._currentWidgetUpdate.next(function (w) {
            if (w == null) {
                return null;
            }
            var widget = w;
            if (widget != null && widget.dataset != null) {
                var formula = createFormula({});
                var aggregation = createAggregation({});
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
    };
    AjfReportBuilderService.prototype.saveTableFormula = function (_label, aggregationType, formulaText, _mainIndex, _index) {
        this._currentWidgetUpdate.next(function (w) {
            if (w == null) {
                return null;
            }
            var widget = w;
            if (widget.dataset != null) {
                var formula = createFormula({});
                var aggregation = createAggregation({});
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
    };
    AjfReportBuilderService.prototype.removeTableMainData = function (index) {
        this._removeFromCurrentWidgetArrayProperty('dataset', index);
    };
    AjfReportBuilderService.prototype.removeData = function (_mainIndex, _index) {
        this._currentWidgetUpdate.next(function (widget) {
            var myObj = widget;
            /* if (index === -1) {
              myObj.dataset.splice(mainIndex, 1);
            } else {
              myObj.dataset[mainIndex].splice(index, 1);
            } */
            return myObj;
        });
    };
    /**
     * update type field of AjfChartWidget current widget
     *
     * @param type
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setChartType = function (type) {
        this._setCurrentWidgetProperty('type', type);
    };
    /**
     * remove  idx element of xLabels field of AjfChartWidget current widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.removeMainData = function (_idx) {
        this._currentWidgetUpdate.next(function (widget) {
            var myObj = widget;
            // myObj.dataset[0].splice(idx, 1);
            return myObj;
        });
    };
    AjfReportBuilderService.prototype.removeRelatedData = function (_mainIdx, _idx) {
        this._currentWidgetUpdate.next(function (widget) {
            var myObj = widget;
            /* if (idx == -1) {
              myObj.dataset.splice(mainIdx + 1, 1);
            } else {
              myObj.dataset[mainIdx + 1].splice(idx, 1);
            } */
            return myObj;
        });
    };
    /**
     * update backgroundColor field of AjfChartWidget current widget
     *
     * @param colors
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setChartBackgroundColor = function (colors) {
        this._setCurrentWidgetProperty('backgroundColor', colors);
    };
    AjfReportBuilderService.prototype.addChartBackgroundColor = function (color) {
        this._addToCurrentWidgetArrayProperty('backgroundColor', color);
    };
    AjfReportBuilderService.prototype.removeChartBackgroundColor = function (idx) {
        this._removeFromCurrentWidgetArrayProperty('backgroundColor', idx);
    };
    /**
     * update borderColor field of AjfChartWidget current widget
     *
     * @param colors
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setChartBorderColor = function (colors) {
        this._setCurrentWidgetProperty('borderColor', colors);
    };
    AjfReportBuilderService.prototype.setChartBorderWidth = function (value) {
        this._setCurrentWidgetProperty('borderWidth', value);
    };
    AjfReportBuilderService.prototype.addChartBorderColor = function (color) {
        this._addToCurrentWidgetArrayProperty('borderColor', color);
    };
    AjfReportBuilderService.prototype.removeChartBorderColor = function (idx) {
        this._removeFromCurrentWidgetArrayProperty('borderColor', idx);
    };
    /**
     * This method set the AjfReport.
     *
     * @param report
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setReport = function (report) {
        this._report.next(report);
    };
    /**
     * This method set the export report.
     *
     * @param report
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setSaveReport = function (json) {
        this._saveReport.next(json);
    };
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
    AjfReportBuilderService.prototype.setWidgetStyles = function (label, value) {
        var _this = this;
        this._currentWidgetUpdate.next(function (widget) {
            var myObj = widget;
            var pxStyles = [
                'font-size', 'height', 'width', 'border-width', 'border-radius', 'padding', 'margin'
            ];
            var isPxStyle = pxStyles.indexOf(label) > -1;
            if (isPxStyle && !(value instanceof Array) && _this.isNumber(value)) {
                value += 'px';
            }
            else if (isPxStyle && value instanceof Array && _this.isNumberArray(value)) {
                value = value.join('px ') + "px";
            }
            myObj.styles[label] = value;
            return myObj;
        });
    };
    /**
     * this method update the styles of origin widget array
     *
     * @param origin can be header content or footer
     * @param label for example background-color
     * @param value for example rgb(255,255,255,1)
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setSectionStyles = function (origin, label, value) {
        if ((origin !== 'header') && (origin !== 'content') && (origin !== 'footer')) {
            throw new Error('uncknow origin ' + origin);
        }
        this._updates[origin].next(function (widget) {
            widget.styles[label] = value;
            widget.styles = __assign({}, widget.styles);
            return widget;
        });
    };
    /**
     * this method set the style of the whole report.
     *
     * @param label for example background-color
     * @param value for example rgb(255,255,255,1)
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setReportStyles = function (label, value) {
        this._reportStylesUpdate.next(function (styles) {
            if (styles == null) {
                styles = {};
            }
            else {
                styles[label] = value;
                styles = __assign({}, styles);
            }
            return styles;
        });
    };
    /**
     *  update forms
     *
     * @param forms
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.setReportForms = function (forms) {
        this._reportFormsUpdate.next(function (_form) {
            return forms || [];
        });
    };
    /**
     * update customWidgets
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.addCustomWidgets = function (widget, position) {
        this._customWidgetsUpdate.next(function (customWidgets) {
            customWidgets = customWidgets || [];
            if (position != null && position >= 0) {
                customWidgets.splice(position, 0, widget);
            }
            else {
                customWidgets.push(widget);
            }
            return customWidgets;
        });
    };
    /**
     * reset customWidgets
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.resetCustomWidgets = function () {
        this._customWidgetsUpdate.next(function (customWidgets) {
            customWidgets.length = 0;
            return customWidgets;
        });
    };
    /**
     * update label of widget
     *
     * @param label
     * @param position
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.changeLabelCustomWidget = function (label, position) {
        this._customWidgetsUpdate.next(function (customWidgets) {
            customWidgets[position].type = label;
            return customWidgets;
        });
    };
    /**
     * Add an AjfWidget on _headerWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.addHeaderWidget = function (widget, position) {
        this._addWidgetToContainer(this._headerWidgetsUpdate, widget, position);
    };
    /**
     * Add an AjfWidget on _contentWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.addContentWidget = function (widget, position) {
        this._addWidgetToContainer(this._contentWidgetsUpdate, widget, position);
    };
    /**
     * Add an AjfWidget on _footerWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.addfooterWidget = function (widget, position) {
        this._addWidgetToContainer(this._footerWidgetsUpdate, widget, position);
    };
    AjfReportBuilderService.prototype.unfixedColumn = function (idx) {
        var _this = this;
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return widget;
            }
            var myObj = widget;
            var num = myObj.columns.length;
            var checkSum = 0;
            var objNum = 0;
            var value = 1;
            var spreadValue;
            myObj.columns[idx] = 0;
            for (var j = 0; j < num; j++) {
                if (myObj.columns[j] === -1) {
                    objNum++;
                }
            }
            value = Number(_this.roundTo(1 / (num - objNum), 2).toFixed(2));
            for (var i = 0; i < num; i++) {
                if (myObj.columns[i] !== -1) {
                    myObj.columns[i] = value;
                    checkSum = Number(_this.roundTo(checkSum + value, 2).toFixed(2));
                }
            }
            checkSum = Number(_this.roundTo(checkSum, 2).toFixed(2));
            if (checkSum > 1) {
                spreadValue = parseFloat(_this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                myObj.columns[idx] -= spreadValue;
                myObj.columns[idx] = _this.roundTo(myObj.columns[idx], 2);
            }
            else if (checkSum < 1) {
                myObj.columns[idx] += (1 - (checkSum % 1));
                myObj.columns[idx] = Number(_this.roundTo(myObj.columns[idx], 2).toFixed(2));
            }
            return myObj;
        });
    };
    /**
     * Add column on the current AjfLayoutWidget.
     *
     * When adding a column the width of the other columns is recalculated
     * by dividing it by the number of column
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.addColumn = function () {
        var _this = this;
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            var myObj = widget;
            var tempObj = [];
            var num = myObj.columns.length + 1;
            var checkSum = 0;
            var objNum = 0;
            var value = 1;
            var tmpValue;
            if (num > 10) {
                throw new Error('exceed max columns');
            }
            for (var j = 0; j < num; j++) {
                if (myObj.columns[j] === -1) {
                    objNum++;
                }
            }
            value = Number(_this.roundTo(1 / (num - objNum), 2).toFixed(2));
            for (var i = 0; i < num; i++) {
                if (myObj.columns[i] === -1) {
                    tempObj.push(-1);
                }
                else {
                    tempObj.push(value);
                    checkSum = Number(_this.roundTo(checkSum + value, 2).toFixed(2));
                }
            }
            checkSum = Number(_this.roundTo(checkSum, 2).toFixed(2));
            if (checkSum > 1) {
                tmpValue =
                    parseFloat(_this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
                tempObj[0] -= tmpValue;
                tempObj[0] = _this.roundTo(tempObj[0], 2);
            }
            else if (checkSum < 1) {
                tempObj[0] += (1 - (checkSum % 1));
                tempObj[0] = Number(_this.roundTo(tempObj[0], 2).toFixed(2));
            }
            myObj.columns = tempObj;
            // TODO: @trik what's value?!?
            var columnObj = createWidget({
                widgetType: 7,
            });
            myObj.content.push(columnObj);
            _this._saveReportEvent.emit();
            return myObj;
        });
    };
    AjfReportBuilderService.prototype.removeWidgetToColumn = function (column, index) {
        column.content.splice(index, 1);
    };
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
    AjfReportBuilderService.prototype.remove = function (node, idx) {
        var _this = this;
        switch (node) {
            case 'header':
            case 'content':
            case 'footer':
                this._updates[node].next(function (widgets) {
                    if (widgets.widgets.length === 0) {
                        throw new Error('you can not remove from empty array');
                    }
                    if (widgets.widgets[idx] == null) {
                        throw new Error('invalid index');
                    }
                    widgets.widgets.splice(idx, 1);
                    _this.updateCurrentWidget(null);
                    return widgets;
                });
                break;
            case 'layout':
                this._currentWidgetUpdate.next(function (widget) {
                    if (widget == null) {
                        return null;
                    }
                    var myObj = widget;
                    if (myObj.columns.length === 1) {
                        myObj.content[0].content.length = 0;
                        return myObj;
                    }
                    if (myObj.columns[idx] == null) {
                        throw new Error('this content is undefined');
                    }
                    else {
                        var spread = myObj.columns[idx] / (myObj.columns.length - 1);
                        if (myObj.columns.length > 1) {
                            myObj.columns.splice(idx, 1);
                            myObj.content.splice(idx, 1);
                        }
                        for (var i = 0; i < myObj.columns.length; i++) {
                            myObj.columns[i] += spread;
                        }
                        _this.instantColumnValue(myObj.columns[0], 0);
                    }
                    return myObj;
                });
                break;
            case 'column':
            case 'layoutContent':
            case 'unfixedColumn':
                this._currentWidgetUpdate.next(function (widget) {
                    if (widget == null) {
                        return null;
                    }
                    var myObj = widget;
                    if (node === 'column') {
                        var clm = widget;
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
                        _this.unfixedColumn(idx);
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
                    this._updates[node].next(function (widgets) {
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
            default: throw new Error('unknown node ' + node);
        }
    };
    /**
     * This method add a AjfWidget on the current AjfLayoutWidget.
     *
     * @param newWidget
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.addToContent = function (newWidget, idx) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            var myObj = widget;
            if (myObj.content[idx] != null) {
                myObj.content.splice(idx, 1);
            }
            myObj.content.splice(idx, 0, newWidget);
            return myObj;
        });
    };
    AjfReportBuilderService.prototype.addToColumn = function (event, toColumn, position) {
        if (event.dragData && event.dragData.fromColumn != null) {
            var fromColumn = event.dragData.fromColumn;
            var widget = event.dragData.widget;
            var fromIndex = event.dragData.fromIndex;
            fromColumn.content.splice(fromIndex, 1);
            toColumn.content.push(widget);
        }
        else if (event.dragData && event.dragData.arrayFrom) {
            this.remove(event.dragData.arrayFrom, event.dragData.fromIndex);
            toColumn.content.push(event.dragData.widget);
        }
        else if (event.dragData && event.dragData.json) {
            var obj = JSON.parse(event.dragData.json);
            var newWidget = deepCopy(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
        else {
            var obj = { 'widgetType': AjfWidgetType[event.dragData] };
            var newWidget = deepCopy(obj);
            if (position != null) {
                toColumn.content.splice(position, 0, newWidget);
            }
            else {
                toColumn.content.push(newWidget);
            }
        }
    };
    AjfReportBuilderService.prototype.changePositionOnColumn = function (event, toColumn, toIndex) {
        var fromColumn = event.dragData.fromColumn;
        var fromIndex = event.dragData.fromIndex;
        var fromWidget = fromColumn.content[fromIndex];
        var toWidget = fromColumn.content[toIndex];
        if (fromColumn == toColumn) {
            fromColumn.content[fromIndex] = toWidget;
            fromColumn.content[toIndex] = fromWidget;
        }
        else {
            fromColumn.content.splice(fromIndex, 1);
            toColumn.content.splice(toIndex, 0, fromWidget);
        }
    };
    /**
     * This method add the obj on the idx position.
     * Obj have a no specificate width and is not calculate as columns
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    AjfReportBuilderService.prototype.fixedColumn = function (idx) {
        this.instantColumnValue(-1, idx);
    };
    AjfReportBuilderService.prototype.changeColumn = function (from, to, layoutWidget) {
        if (to < 0 || to >= layoutWidget.content.length) {
            return;
        }
        if (from > layoutWidget.content.length - 1 && to > from) {
            return;
        }
        var fromColumn = layoutWidget.content[from];
        var fromColumnValue = layoutWidget.columns[from];
        var toColumn = layoutWidget.content[to];
        var toColumnValue = layoutWidget.columns[to];
        layoutWidget.content[from] = toColumn;
        layoutWidget.columns[from] = toColumnValue;
        layoutWidget.content[to] = fromColumn;
        layoutWidget.columns[to] = fromColumnValue;
        this.updateCurrentWidget(layoutWidget);
    };
    AjfReportBuilderService.prototype.addCustomColor = function (color) {
        this._updates['color'].next(function (colors) {
            if (colors.indexOf(color) < 0) {
                colors.push(color);
            }
            return colors;
        });
    };
    AjfReportBuilderService.prototype._addWidgetToContainer = function (subj, widget, position) {
        subj.next(function (widgets) {
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
    };
    AjfReportBuilderService.prototype._setCurrentWidgetProperty = function (propName, value) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            widget[propName] = value;
            return widget;
        });
    };
    AjfReportBuilderService.prototype._addToCurrentWidgetArrayProperty = function (propName, value) {
        this._currentWidgetUpdate.next(function (widget) {
            if (widget == null) {
                return null;
            }
            var arr = widget[propName];
            arr.push(value);
            widget[propName] = arr;
            return widget;
        });
    };
    AjfReportBuilderService.prototype._removeFromCurrentWidgetArrayProperty = function (propName, idx) {
        this._currentWidgetUpdate.next(function (widget) {
            widget[propName].splice(idx, 1);
            return widget;
        });
    };
    AjfReportBuilderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AjfReportBuilderService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [AJF_REPORTS_CONFIG,] }] }
    ]; };
    return AjfReportBuilderService;
}());
export { AjfReportBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFvQixXQUFXLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDcEcsT0FBTyxFQUFhLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNELE9BQU8sRUFHTSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUMxRCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFDTCxhQUFhLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUM1RSxNQUFNLGdCQUFnQixDQUFDO0FBT3hCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0g7SUFzT0U7Ozs7T0FJRztJQUNILGlDQUMwQyxhQUErQjtRQUR6RSxpQkFrU0M7UUFwZ0JPLHlCQUFvQixHQUN4QixJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQVFyQyxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBUXZELHVCQUFrQixHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFDO1FBRWxFLGVB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LFFBQVEsQ0FBRSxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixNQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVFQUFxQyxHQUE3QyxVQUE4QyxRQUFnQixFQUFFLEdBQVc7UUFDekUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFDLE1BQXNCO1lBQ3RDLE1BQWMsQ0FBQyxRQUFRLENBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBaGhFRixVQUFVOzs7O2dEQTRPTixRQUFRLFlBQUksTUFBTSxTQUFDLGtCQUFrQjs7SUFxeUQxQyw4QkFBQztDQUFBLEFBamhFRCxJQWloRUM7U0FoaEVZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZkZvcm0sIEFqZk5vZGUsIEFqZk5vZGVUeXBlLCBmbGF0dGVuTm9kZXN9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb24sIEFqZkNoYXJ0V2lkZ2V0LCBBamZDb2x1bW5XaWRnZXQsIEFqZkN1c3RvbVdpZGdldCwgQWpmRGF0YVdpZGdldCwgQWpmSW1hZ2VXaWRnZXQsXG4gIEFqZkxheW91dFdpZGdldCwgQWpmUmVwb3J0LCBBamZSZXBvcnRDb250YWluZXIsIEFqZlN0eWxlcywgQWpmVGFibGVXaWRnZXQsIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCwgQWpmV2lkZ2V0VHlwZSwgY3JlYXRlQWdncmVnYXRpb24sIGNyZWF0ZVdpZGdldFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29tYmluZUxhdGVzdCwgZmlsdGVyLCBtYXAsIHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50LCBzY2FuLCBzaGFyZSwgc3RhcnRXaXRoXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzLCBBamZSZXBvcnRJY29ucywgQWpmUmVwb3J0c0NvbmZpZywgQWpmV2lkZ2V0c0NvbnRhaW5lcn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQ29sb3JPcGVyYXRpb24sIEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24sIEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24sIEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uLFxuICBBamZTdHlsZXNPcGVyYXRpb24sIEFqZldpZGdldE9wZXJhdGlvbiwgQWpmV2lkZ2V0c09wZXJhdGlvblxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuaW1wb3J0IHtBSkZfUkVQT1JUU19DT05GSUd9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgY29udGFpbnMgYWxsIHRoZSBsb2dpYyB0byBtb2RlbCB0aGUgcmVwb3J0IHdpZGdldC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyU2VydmljZSB7XG5cbiAgLyoqXG4gICAqICB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY3VzdG9tV2lkZ2V0cyBvYmpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXN0b21XaWRnZXRzOiBPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldFtdPjtcbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50IHdpZGdldC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vcmlnaW46IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfb3JpZ2luVXBkYXRlOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBleHBvcnRlZCBqc29uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnQ6IE9ic2VydmFibGU8QWpmUmVwb3J0PjtcbiAgcHJpdmF0ZSBfc2F2ZWRSZXBvcnRVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0PiA9IG5ldyBTdWJqZWN0PEFqZlJlcG9ydD4oKTtcblxuICBwcml2YXRlIF9qc29uU3RhY2s6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPVxuICBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG5cbiAgcHJpdmF0ZSBfbGFzdERlbGV0ZWRKc29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfZW1wdHlDb250ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPVxuICBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdnZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uRHJhZ2dlZFVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICBwcml2YXRlIF9vbk92ZXI6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX29uT3ZlclVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIHN0YXR1cyBvZiBwZXJtYW5lbnQgem9vbVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2ZpeGVkWm9vbTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfZml4ZWRab29tVXBkYXRlOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgaWYgaXMgZmlyZWQgZHJhZyBtb3VzZSBldmVudC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9vbkRyYWdFbnRlcjogT2JzZXJ2YWJsZTxhbnk+O1xuICBwcml2YXRlIF9vbkRyYWdFbnRlclVwZGF0ZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBoZWFkZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2hlYWRlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBoZWFkZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2hlYWRlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBjb250ZW50IHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbnRlbnRXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0c1VwZGF0ZTogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+KCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjb250ZW50IHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgd2lkZ2V0IGFycmF5LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHM6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj47XG4gIHByaXZhdGUgX2Zvb3RlcldpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG5cbiAgcHJpdmF0ZSBfY29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBwcml2YXRlIF9jb2xvclVwZGF0ZTogU3ViamVjdDxBamZDb2xvck9wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZDb2xvck9wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbG9yOiBzdHJpbmdbXSA9XG4gIFtcbiAgICAncmdiYSgwLCAwLCAwLCAxKScsICdyZ2JhKDUxLCAxNTMsIDI1NSwgMSknLCAncmdiYSgxNTMsIDIwNCwgMCwgMSknLCAncmdiYSgyNTUsIDEwMiwgMCwgMSknLFxuICAgICdyZ2JhKDAsIDIwNCwgMjA0LCAxKScsICdyZ2JhKDIwNCwgMjA0LCAxNTMsIDEpJywgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJywgJ3JnYmEoMjMwLCAwLCAwLCAxKScsXG4gICAgJ3JnYmEoMjU1LCAxNTMsIDAsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDAsIDEpJywgJ3JnYmEoMCwgMTM4LCAwLCAxKScsICdyZ2JhKDAsIDEwMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMTUzLCA1MSwgMjU1LCAxKScsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJywgJ3JnYmEoMjUwLCAyMDQsIDIwNCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMjM1LCAyMDQsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDIwNCwgMSknLCAncmdiYSgyMDQsIDIzMiwgMjA0LCAxKScsXG4gICAgJ3JnYmEoMjA0LCAyMjQsIDI0NSwgMSknLCAncmdiYSgyMzUsIDIxNCwgMjU1LCAxKScsICdyZ2JhKDE4NywgMTg3LCAxODcsIDEpJyxcbiAgICAncmdiYSgyNDAsIDEwMiwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMTk0LCAxMDIsIDEpJywgJ3JnYmEoMjU1LCAyNTUsIDEwMiwgMSknLFxuICAgICdyZ2JhKDEwMiwgMTg1LCAxMDIsIDEpJywgJ3JnYmEoMTAyLCAxNjMsIDIyNCwgMSknLCAncmdiYSgxOTQsIDEzMywgMjU1LCAxKScsXG4gICAgJ3JnYmEoMTM2LCAxMzYsIDEzNiwgMSknLCAncmdiYSgxNjEsIDAsIDAsIDEpJywgJ3JnYmEoMTc4LCAxMDcsIDAsIDEpJyxcbiAgICAncmdiYSgxNzgsIDE3OCwgMCwgMSknLCAncmdiYSgwLCA5NywgMCwgMSknLCAncmdiYSgwLCA3MSwgMTc4LCAxKScsXG4gICAgJ3JnYmEoMTA3LCAzNiwgMTc4LCAxKScsICdyZ2JhKDY4LCA2OCwgNjgsIDEpJywgJ3JnYmEoOTIsIDAsIDAsIDEpJywgJ3JnYmEoMTAyLCA2MSwgMCwgMSknLFxuICAgICdyZ2JhKDEwMiwgMTAyLCAwLCAxKScsICdyZ2JhKDAsIDU1LCAwLCAxKScsICdyZ2JhKDAsIDQxLCAxMDIsIDEpJywgJ3JnYmEoNjEsIDIwLCAxMDIsIDEpJ1xuICBdO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBmb290ZXIgc3R5bGVzLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvb3RlclN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1cnJlbnQgd2lkZ2V0IHdoaWNoIGhvbGRzIHRoZSBmb2N1cy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0OiBPYnNlcnZhYmxlPEFqZldpZGdldHxudWxsPjtcbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFVwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZldpZGdldE9wZXJhdGlvbnxudWxsPihudWxsKTtcblxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIHRoZSBBamZGb3JtVmFyaWFibGVzIGV4cGxvaXQgZm9yIGZpZWxkIHNlbGVjdGluZyBmcm9tIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXM6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPjtcbiAgcHJpdmF0ZSBfZm9ybXNWYXJpYWJsZXNVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPihudWxsKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2NvbmRpdGlvbk5hbWVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIHRoaXMgQmVoYXZpb3JTdWJqZWN0IHVwZGF0ZSBleHBvcnQgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+ID1cbiAgbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCBjb250YWlucyB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydDogQmVoYXZpb3JTdWJqZWN0PEFqZlJlcG9ydCB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZlJlcG9ydCB8IG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIHN0eWxlcyBvZiByZXBvcnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0U3R5bGVzOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz47XG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlc1VwZGF0ZTogU3ViamVjdDxBamZTdHlsZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBvYnNlcnZlIHRoZSBmb3JtcyBmZXRjaGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwb3J0Rm9ybXM6IE9ic2VydmFibGU8QWpmRm9ybVtdPjtcbiAgcHJpdmF0ZSBfcmVwb3J0Rm9ybXNVcGRhdGU6IFN1YmplY3Q8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiBkaWN0aW9uYXJ5IGZvciAgd2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZXM6IGFueSA9IHtcbiAgICBoZWFkZXI6IHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsXG4gICAgY29udGVudDogdGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsXG4gICAgZm9vdGVyOiB0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbG9yOiB0aGlzLl9jb2xvclVwZGF0ZSxcbiAgICBjdXN0b21XaWRnZXRzOiB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlXG4gIH07XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiB3b250IHRvIHNhdmUgcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfc2F2ZVJlcG9ydEV2ZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZUZvcm11bGFUT0h0bWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0Rm9ybXVsYVRvSHRtbEV2ZW50KCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVGb3JtdWxhVE9IdG1sLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGV2ZW50IGVtaXR0ZXIgdGhhdCBub3RpZnkgd2hlbiBjb2x1bW4gd2lkdGggY2hhbmdlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9pY29uU2V0czogQWpmUmVwb3J0SWNvbnMgPSB7XG4gICAgJ2FqZi1pY29uJzogW11cbiAgfTtcbiAgZ2V0IGljb25TZXRzKCk6IEFqZlJlcG9ydEljb25zIHsgcmV0dXJuIHRoaXMuX2ljb25TZXRzOyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBSkZfUkVQT1JUU19DT05GSUcpIHJlcG9ydHNDb25maWc6IEFqZlJlcG9ydHNDb25maWdcbiAgKSB7XG5cbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcblxuICAgIGlmIChyZXBvcnRzQ29uZmlnICE9IG51bGwpIHtcbiAgICAgIGlmIChyZXBvcnRzQ29uZmlnLmljb25zICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5faWNvblNldHMgPSB7Li4udGhpcy5faWNvblNldHMsIC4uLnJlcG9ydHNDb25maWcuaWNvbnN9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX29yaWdpbiA9ICg8T2JzZXJ2YWJsZTxzdHJpbmc+PnRoaXMuX29yaWdpblVwZGF0ZSkucGlwZShcbiAgICAgIHN0YXJ0V2l0aCgnaGVhZGVyJyksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuX3NhdmVkUmVwb3J0ID0gKDxPYnNlcnZhYmxlPEFqZlJlcG9ydD4+dGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUpLnBpcGUoXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuX29uRHJhZ2dlZCA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9vbkRyYWdnZWRVcGRhdGUpLnBpcGUoXG4gICAgICBzdGFydFdpdGgoZmFsc2UpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9vbk92ZXIgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25PdmVyVXBkYXRlKS5waXBlKFxuICAgICAgc3RhcnRXaXRoKGZhbHNlKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5fZml4ZWRab29tID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2ZpeGVkWm9vbVVwZGF0ZSkucGlwZShcbiAgICAgIHN0YXJ0V2l0aChmYWxzZSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuX29uRHJhZ0VudGVyID0gdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUucGlwZShzaGFyZSgpKTtcblxuICAgIHRoaXMuX3JlcG9ydFN0eWxlcyA9ICg8T2JzZXJ2YWJsZTxBamZTdHlsZXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2Nhbigoc3R5bGVzOiBBamZTdHlsZXMsIG9wOiBBamZTdHlsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aoc3R5bGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgPEFqZlN0eWxlcz57fSksIHNoYXJlKCksIHN0YXJ0V2l0aCg8QWpmU3R5bGVzPnt9KSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3JtcyA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4+dGhpcy5fcmVwb3J0Rm9ybXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2NhbigoZm9ybXM6IEFqZkZvcm1bXSwgb3A6IEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3AoZm9ybXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24+PnRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShzY2FuKCh3aWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSwgb3A6IEFqZkN1c3RvbVdpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2Zvcm1zVmFyaWFibGVzID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24+PnRoaXMuX2Zvcm1zVmFyaWFibGVzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICBzY2FuKCh2YXJpYWJsZXM6IEFqZkZvcm1WYXJpYWJsZXNbXSwgb3A6IEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh2YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9jb25kaXRpb25OYW1lcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5faGVhZGVyV2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIsIG9wOiBBamZXaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9oZWFkZXJTdHlsZXMgPSB0aGlzLl9oZWFkZXJXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9jb250ZW50V2lkZ2V0cyA9ICg8T2JzZXJ2YWJsZTxBamZXaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9jb250ZW50U3R5bGVzID0gdGhpcy5fY29udGVudFdpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2Zvb3RlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzID0gdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29sb3IgPSAoPE9ic2VydmFibGU8QWpmQ29sb3JPcGVyYXRpb24+PnRoaXMuX2NvbG9yVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGNvbG9yOiBzdHJpbmdbXSwgb3A6IEFqZkNvbG9yT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3AoY29sb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuX2RlZmF1bHRDb2xvciksIHNoYXJlKCksIHN0YXJ0V2l0aCh0aGlzLl9kZWZhdWx0Q29sb3IpKTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXQgPSB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLnBpcGUoXG4gICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgbWFwKHMgPT4gcyEpLFxuICAgICAgc2Nhbigod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCwgb3A6IEFqZldpZGdldE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aod2lkZ2V0KTtcbiAgICAgIH0sIG51bGwgYXMgdW5rbm93biBhcyBBamZXaWRnZXQpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zLnBpcGUoXG4gICAgICBmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSxcbiAgICAgIG1hcCgoZm9ybXM6IEFqZkZvcm1bXSkgPT4ge1xuICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICkuc3Vic2NyaWJlKHRoaXMuX2Zvcm1zVmFyaWFibGVzVXBkYXRlKTtcblxuICAgIHRoaXMuX3JlcG9ydEZvcm1zLnBpcGUoXG4gICAgICBmaWx0ZXIoZiA9PiBmLmxlbmd0aCAhPSAwKSxcbiAgICAgIG1hcCgoZm9ybXM6IEFqZkZvcm1bXSkgPT4ge1xuICAgICAgICByZXR1cm4gKF9jOiBBamZGb3JtVmFyaWFibGVzW10pOiBBamZGb3JtVmFyaWFibGVzW10gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3Jtcyk7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICkuc3Vic2NyaWJlKHRoaXMuX2NvbmRpdGlvbk5hbWVzVXBkYXRlKTtcblxuICAgIGNvbnN0IHJlcG9ydE9icyA9IHRoaXMuX3JlcG9ydDtcblxuICAgIHJlcG9ydE9icy5waXBlKFxuICAgICAgbWFwKChyOiBBamZSZXBvcnQgfCBudWxsKSA9PiB7XG4gICAgICAgIHJldHVybiAoX2NvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG4gICAgICAgICAgbGV0IHRlbXBDb2xvcnM6IHN0cmluZ1tdID0gdGhpcy5fZGVmYXVsdENvbG9yO1xuICAgICAgICAgIGlmIChyID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgIGlmIChyLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHIuY29udGVudC5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHIuZm9vdGVyKSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmZvb3Rlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHIuaGVhZGVyKSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmhlYWRlci5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHIuaGVhZGVyLmNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gci5oZWFkZXIuY29udGVudFtpXTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iob2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgaWYgKG9iai53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCkge1xuICAgICAgICAgICAgICAgICAgbGV0IGxheW91dE9iaiA9IG9iaiBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheW91dE9iai5jb250ZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2x1bW5PYmogPSBsYXlvdXRPYmouY29udGVudFtqXSBhcyBBamZDb2x1bW5XaWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihjb2x1bW5PYmouc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBjb2x1bW5PYmouY29udGVudC5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWRnZXRPYmogPSBjb2x1bW5PYmouY29udGVudFt6XTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Iod2lkZ2V0T2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIDxzdHJpbmdbXT50ZW1wQ29sb3JzO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSh0aGlzLl9jb2xvclVwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3N0eWxlczogQWpmU3R5bGVzKTogQWpmU3R5bGVzID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5zdHlsZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz57fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmU3R5bGVzPnIuc3R5bGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5oZWFkZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5oZWFkZXIuY29udGVudCB8fCBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHIuaGVhZGVyLnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPntcbiAgICAgICAgICAgICAgICB3aWRnZXRzOiByLmNvbnRlbnQuY29udGVudCB8fCBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHIuY29udGVudC5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9jb250ZW50V2lkZ2V0c1VwZGF0ZSk7XG5cbiAgICByZXBvcnRPYnNcbiAgICAgICAgLnBpcGUobWFwKChyOiBBamZSZXBvcnR8bnVsbCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICAgIGlmIChyID09IG51bGwgfHwgci5mb290ZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5mb290ZXIuY29udGVudCB8fCBbXSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHIuZm9vdGVyLnN0eWxlcyB8fCB7fVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydC5waXBlKFxuICAgICAgbWFwKChqc29uOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIChfcjogYW55KTogYW55ID0+IHtcbiAgICAgICAgICBpZiAoanNvbiA9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KHRoaXMucmVwb3J0LCB0aGlzLnJlcG9ydEZvcm1zKSxcbiAgICAgICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgICAgdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUoZmlsdGVyKHcgPT4gdyAhPSBudWxsKSksXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9vdGVyV2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlcG9ydFN0eWxlcy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgICkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHI6IFtcbiAgICAgICAgICAgICAgICAgICAgIFt2b2lkLCBBamZSZXBvcnQgfCBudWxsLCBBamZGb3JtW11dLCBBamZXaWRnZXRzQ29udGFpbmVyLCBBamZXaWRnZXRzQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgQWpmV2lkZ2V0c0NvbnRhaW5lciwgQWpmU3R5bGVzXG4gICAgICAgICAgICAgICAgICAgXSkgPT4ge1xuICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgIC8vIGNvbnN0IGN1clJvID0gclswXVsxXTtcbiAgICAgICAgICAvLyBjb25zdCBmb3JtcyA9IHJbMF1bMl0gIT0gbnVsbCA/IHJbMF1bMl0gfHwgW11cbiAgICAgICAgICAvLyAgICAgOiAoY3VyUm8gIT0gbnVsbCA/IGN1clJvLmZvcm1zIHx8IFtdIDogW10pO1xuXG4gICAgICAgICAgb2JqLmhlYWRlciA9IHtjb250ZW50OiByWzFdLndpZGdldHMubWFwKHcgPT4gZGVlcENvcHkodykpLCBzdHlsZXM6IHJbMV0uc3R5bGVzfSBhc1xuICAgICAgICAgICAgICBBamZSZXBvcnRDb250YWluZXI7XG4gICAgICAgICAgb2JqLmNvbnRlbnQgPSB7Y29udGVudDogclsyXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzJdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5mb290ZXIgPSB7Y29udGVudDogclszXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzNdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5zdHlsZXMgPSByWzRdO1xuXG4gICAgICAgICAgY29uc3Qgcm8gPSB7XG4gICAgICAgICAgICBoZWFkZXI6IHtjb250ZW50OiByWzFdLndpZGdldHMsIHN0eWxlczogclsxXS5zdHlsZXN9LFxuICAgICAgICAgICAgY29udGVudDoge2NvbnRlbnQ6IHJbMl0ud2lkZ2V0cywgc3R5bGVzOiByWzJdLnN0eWxlc30sXG4gICAgICAgICAgICBmb290ZXI6IHtjb250ZW50OiByWzNdLndpZGdldHMsIHN0eWxlczogclszXS5zdHlsZXN9LFxuICAgICAgICAgICAgc3R5bGVzOiByWzRdXG4gICAgICAgICAgfSBhcyBBamZSZXBvcnQ7XG5cbiAgICAgICAgICB0aGlzLnNldFNhdmVSZXBvcnQob2JqKTtcbiAgICAgICAgICB0aGlzLl9zYXZlZFJlcG9ydFVwZGF0ZS5uZXh0KHJvKTtcbiAgICAgICAgICB0aGlzLnB1c2hKc29uU3RhY2soSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqICBmdW5jdGlvbnNcbiAgICpcbiAgICovXG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiByZW1vdmUgQWpmTm9kZUdyb3VwLCBBamZTbGlkZSwgQWpmUmVwZWF0aW5nU2xpZGUsIEFqZlN0cmluZ0ZpZWxkIGZyb20gYWpmbm9kZSBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaWx0ZXJOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8XG4gICAgICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUgfHxcbiAgICAgICAgICAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQgJiZcbiAgICAgICAgICAgKG5vZGUgYXMgQWpmRmllbGQpLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLlN0cmluZykpIHtcbiAgICAgICAgbm9kZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlcztcbiAgfVxuXG4gIHBhcnNlQ29sb3IoY3NzU3R5bGVzOiBhbnksIGNvbG9yczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBzdHlsZUtleXMgPSBbJ2JhY2tncm91bmQtY29sb3InLCAnYmFja2dyb3VuZENvbG9yJywgJ2NvbG9yJ107XG4gICAgc3R5bGVLZXlzLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY3NzU3R5bGVzW2tdICYmXG4gICAgICAgIGNvbG9ycy5pbmRleE9mKGNzc1N0eWxlc1trXSkgPT0gLTFcbiAgICAgICkge1xuICAgICAgICBjb2xvcnMucHVzaChjc3NTdHlsZXNba10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmlsbEZvcm1zVmFyaWFibGVzKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICBsZXQgdmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXJpYWJsZXNbaV0gPSB7IG5vZGVzOiBbXSwgbGFiZWxzOiBbXSwgbmFtZXM6IFtdLCB0eXBlczogW10gfTtcblxuICAgICAgaWYgKGZvcm1zW2ldLm5vZGVzICE9IG51bGwgJiYgZm9ybXNbaV0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXJpYWJsZXNbaV0ubm9kZXMgPSB0aGlzLmZpbHRlck5vZGVzKGZsYXR0ZW5Ob2Rlcyhmb3Jtc1tpXS5ub2RlcykpO1xuICAgICAgfVxuICAgICAgdmFyaWFibGVzW2ldLmxhYmVscyA9IHRoaXMuZXh0cmFjdExhYmVsc05vZGVzKHZhcmlhYmxlc1tpXS5ub2Rlcyk7XG4gICAgICB2YXJpYWJsZXNbaV0ubmFtZXMgPSB0aGlzLmV4dHJhY3ROYW1lc05vZGVzKHZhcmlhYmxlc1tpXS5ub2Rlcyk7XG4gICAgICB2YXJpYWJsZXNbaV0udHlwZXMgPSB0aGlzLmV4dHJhY3RUeXBlc05vZGVzKHZhcmlhYmxlc1tpXS5ub2Rlcyk7XG5cbiAgICB9XG4gICAgcmV0dXJuIHZhcmlhYmxlcztcbiAgfVxuICAvKipcbiAgICogdXRpbHM6XG4gICAqICB0aGUgb2JqIHJldHVybmVkIGNvbnRhaW5zIHRoZSBsYWJlbCBmaWVsZCBvZiBhamZOb2RlXG4gICAqIEBwYXJhbSBub2Rlc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGV4dHJhY3RMYWJlbHNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLmxhYmVsKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGV4dHJhY3ROYW1lc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqLnB1c2gobm9kZXNbaV0ubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgZXh0cmFjdFR5cGVzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogQWpmRmllbGRUeXBlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgcDogQWpmRmllbGQgPSA8QWpmRmllbGQ+bm9kZXNbaV07XG4gICAgICBvYmoucHVzaChwLmZpZWxkVHlwZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzZXRPcmlnaW4ob3JpZ2luOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vcmlnaW5VcGRhdGUubmV4dChvcmlnaW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiBUaGlzIG1ldGhvZCByb3VuZCB0aGUgdmFsdWUgdG8gdGhlIGRlY2ltYWwgcG9zaXRpb25cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEBwYXJhbSBkZWNpbWFscG9zaXRpb25zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcm91bmRUbyh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsUG9zaXRpb25zOiBudW1iZXIpIHtcbiAgICBsZXQgaSA9IHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuXG4gICAgaSA9IE1hdGguZmxvb3IoaSk7XG5cbiAgICByZXR1cm4gaSAvIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyB2YWxpZGF0b3IgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpc051bWJlcih2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eXFxkKyhcXC5cXGQrKT8vLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgaXNOdW1iZXJBcnJheSh2YWx1ZTogYW55W10pOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMuaXNOdW1iZXIodmFsdWVbaV0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbkRyYWdnZWQgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnZ2VkKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ2dlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uT3ZlciBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvbk92ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25PdmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfZml4ZWRab29tIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZpeGVkWm9vbSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRab29tO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGZpeGVkWm9vbUluKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICBjaGFuZ2Ugc3RhdHVzIG9mIF9maXhlZFpvb20gaW4gZmFsc2VcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21PdXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZml4ZWRab29tVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnRW50ZXIgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25EcmFnRW50ZXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fb25EcmFnRW50ZXI7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnRW50ZXIgd2l0aCAgc2VjdGlvbihoZWFkZXIsY29udGVudCxmb290ZXIpIGFuZCBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdFbnRlcihhcnJheTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7IGFycmF5LCBpbmRleCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbmRyYWdnZWQgd2l0aCB0cnVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZHJhZ1N0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuXG4gIGRyYWdFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdnZWRVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIF9vbk92ZXIgd2l0aCB0cnVlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlclN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25PdmVyVXBkYXRlLm5leHQodHJ1ZSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgX29uT3ZlciB3aXRoIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgb3ZlckVuZGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgdXBkYXRlIF9vbkRyYWdnZWQgd2l0aCBmYWxzZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdMZWF2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkRyYWdFbnRlclVwZGF0ZS5uZXh0KHt9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0KCk6IE9ic2VydmFibGU8QWpmUmVwb3J0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9yZXBvcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZW1pdCBzYXZlIHJlcG9ydCBldmVudFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNhdmVSZXBvcnQoKSB7XG4gICAgaWYgKHRoaXMuX3NhdmVSZXBvcnRFdmVudCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHNhdmVJbWFnZUZvcm11bGEoZm9ybXVsYTogQWpmRm9ybXVsYSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgY29uc3QgdyA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIHcuZmxhZyA9IGZvcm11bGE7XG4gICAgICB3Lmljb24gPSBmb3JtdWxhO1xuICAgICAgcmV0dXJuIHc7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlRm9ybXVsYVRvSHRtbChodG1sRm9ybXVsYTogc3RyaW5nLCByZWZlcmVuY2U6IGFueSkge1xuICAgIGlmICh0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbCAhPSBudWxsKSB7XG4gICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICdmb3JtdWxhJzogaHRtbEZvcm11bGEsXG4gICAgICAgICdyZWZlcmVuY2UnOiByZWZlcmVuY2VcbiAgICAgIH07XG4gICAgICB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbC5lbWl0KG9iaik7XG4gICAgfVxuICB9XG5cbiAgc2V0RW1wdHlDb250ZW50KHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2VtcHR5Q29udGVudC5uZXh0KHZhbCk7XG4gIH1cblxuXG4gIHB1c2hKc29uU3RhY2soanNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGN1cnJlbnRTdGFjayA9IHRoaXMuX2pzb25TdGFjay5nZXRWYWx1ZSgpO1xuXG4gICAgaWYgKGN1cnJlbnRTdGFjay5pbmRleE9mKGpzb24pID09PSAtMSAmJiBqc29uICE9PSB0aGlzLl9sYXN0RGVsZXRlZEpzb24pIHtcbiAgICAgIGN1cnJlbnRTdGFjay5wdXNoKGpzb24pO1xuICAgIH1cblxuICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KGN1cnJlbnRTdGFjayk7XG4gIH1cblxuICBwb3BKc29uU3RhY2soKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgZW1wdHlKc29uID1cbiAgICAgICd7XCJoZWFkZXJcIjp7XCJjb250ZW50XCI6W10sXCJzdHlsZXNcIjp7fX0sJyArXG4gICAgICAnXCJjb250ZW50XCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwiJyArXG4gICAgICAnZm9vdGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LFwic3R5bGVzXCI6e319JztcbiAgICBsZXQgY3VycmVudFN0YWNrID0gdGhpcy5fanNvblN0YWNrLmdldFZhbHVlKCk7XG4gICAgY3VycmVudFN0YWNrLnBvcCgpO1xuICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9IGN1cnJlbnRTdGFjay5wb3AoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2subGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuX2xhc3REZWxldGVkSnNvbiA9ICcnO1xuICAgICAgdGhpcy5fanNvblN0YWNrLm5leHQoW10pO1xuICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQodHJ1ZSk7XG4gICAgICByZXR1cm4gZW1wdHlKc29uO1xuICAgIH1cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuXG4gICAgcmV0dXJuIHRoaXMuX2xhc3REZWxldGVkSnNvbjtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGdldCB0aGUgZW1pdHRlclxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sdW1uV2lkdGhDaGFuZ2VkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXI7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9jdXN0b21XaWRnZXRzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGN1c3RvbVdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jdXN0b21XaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaGVhZGVyIHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgaGVhZGVyV2lkZ2V0cygpOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlclN0eWxlcygpOiBPYnNlcnZhYmxlPEFqZlN0eWxlcz4ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBDb250ZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29udGVudFdpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29udGVudCBzdHlsZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZvb3RlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvb3RlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9vdGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29sb3JzIG9mIHJlcG9ydFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY29sb3JzKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cblxuICBnZXQgZW1wdHlDb250ZW50KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiA8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lbXB0eUNvbnRlbnQ7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICogQHBhcmFtIG5ld1dpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHVwZGF0ZUFycmF5V2lkZ2V0cyh0eXBlOiBzdHJpbmcsIG5ld1dpZGdldDogQWpmV2lkZ2V0c0NvbnRhaW5lcikge1xuICAgIGlmICgodHlwZSAhPT0gJ2hlYWRlcicpICYmICh0eXBlICE9PSAnY29udGVudCcpICYmICh0eXBlICE9PSAnZm9vdGVyJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlICcgKyB0eXBlKTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlc1t0eXBlXS5uZXh0KChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2Zvcm1zVmFyaWFibGVzIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm1zVmFyaWFibGVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1zVmFyaWFibGVzO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbk5hbWVzKCk6IE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbk5hbWVzO1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXJyZW50V2lkZ2V0KCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBVcGRhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGUgd2l0aCBuZXdXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVDdXJyZW50V2lkZ2V0KG5ld1dpZGdldDogQWpmV2lkZ2V0fG51bGwpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKF93aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGdldFNhdmVSZXBvcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVJlcG9ydC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2pzb25TYXZlZFJlcG9ydCBvYmVzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U2F2ZWQoKTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZWRSZXBvcnQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydFN0eWxlcyBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCByZXBvcnRTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0U3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfcmVwb3J0Rm9ybXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0Rm9ybXMoKTogT2JzZXJ2YWJsZTxBamZGb3JtW10+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0Rm9ybXM7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBfb3JpZ2luIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9yaWdpbigpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW47XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXNzaWducyB0aGUgbmV3IHdpZHRoIHRvIHRoZSBpZHggY29sdW1uXG4gICAqIGFuZCByZWNhbGN1bGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBvZiB0aGUgbGF5b3V0LlxuICAgKiBUaGUgcmFuZ2UgdmFsdWUgYXJlIGZyb20gMCwxIHRvIDEuXG4gICAqXG4gICAqIFJVTEVTOlxuICAgKiBUaGUgbWluIHZhbHVlIGZvciBjb2x1bW4gaXMgMCwxLlxuICAgKiBUaGUgc3VtIG9mIGFsbCBjb2x1bW5zIHdpZHRoIGlzIGFsd2F5cyAxLlxuICAgKiBUaGUgbWV0aG9kIHJvdW5kIHRoZSB2YWx1ZXMuXG4gICAqIElmIGlzIHByZXNlbnQgb25seSBvbmUgY29sdW1uIHRoZSB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICpcbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA+YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgZGVjcmVhc2VzLlxuICAgKiBXaGVuIHRoZSBuZXcgdmFsdWUgYDxgIG9sZCB2YWx1ZTpcbiAgICogdGhlIHdpZHRoIG9mIHRoZSByZW1haW5pbmcgY29sdW1ucyBpbmNyZWFzZXMuXG4gICAqXG4gICAqIFdoZW4gdmFsdWVzIOKAi+KAi2FyZSBwZXJpb2RpYywgcm91bmRpbmcgYXNzaWducyB0aGUgZ2FwIHRvIHRoZSBjdXJyZW50IHZhbHVlLlxuICAgKiBGb3IgZXhhbXBsZTogMyBjb2x1bW5zIHdpdGggMCwzMyBiZWxpZXZlIDEgY29sdW1uIDAsMzQgYW5kIDIgY29sdW1ucyAwLDMzLlxuICAgKlxuICAgKiBAcGFyYW0gbmV3VmFsdWVcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGluc3RhbnRDb2x1bW5WYWx1ZShuZXdWYWx1ZTogbnVtYmVyLCBpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGxldCBzaXplID0gbXlPYmouY29sdW1ucy5sZW5ndGg7XG5cbiAgICAgIGxldCBzcHJlYWRWYWx1ZSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgbGV0IGlkeEZpcnN0Tm9PYmogPSAtMTtcblxuICAgICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kRmlyc3ROb09iaiA9IGZhbHNlO1xuXG4gICAgICBsZXQgcmUxID0gbmV3IFJlZ0V4cCgnKF5bMF1cXC5cXFsxLTldWzAtOV0kKScpO1xuICAgICAgbGV0IHJlMiA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XSQpJyk7XG4gICAgICBsZXQgcmUzID0gbmV3IFJlZ0V4cCgnXlsxXSQnKTtcblxuICAgICAgbGV0IG9sZFZhbHVlID0gbXlPYmouY29sdW1uc1tpZHhdO1xuXG4gICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8obmV3VmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHZhbHVlJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvbGRWYWx1ZSA9PSAtMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgICAgb2JqTnVtLS07XG4gICAgICAgIG5ld1ZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKHNpemUgLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMC4xO1xuICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSA8IDAuMSkge1xuICAgICAgICBvbGRWYWx1ZSA9IDAuMTtcbiAgICAgIH1cblxuXG4gICAgICBpZiAobmV3VmFsdWUgIT09IC0xKSB7XG5cbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1swXSA9IDE7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlIDwgMC4xKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSAwLjE7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgKyAwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpID4gMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMSAtICgwLjEgKiAoc2l6ZSAtIG9iak51bSAtIDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgob2xkVmFsdWUgPT09IG5ld1ZhbHVlKSAmJiAob2xkVmFsdWUgPT09IDAuMSkpIHtcbiAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2xkVmFsdWUgPiBuZXdWYWx1ZSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUgLSBuZXdWYWx1ZSkgLyAoc2l6ZSAtIG9iak51bSAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFkZCA9IGZhbHNlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG5ld1ZhbHVlIC0gb2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwcmVhZFZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbyhzcHJlYWRWYWx1ZSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgICAgaWYgKHNwcmVhZFZhbHVlIDwgMC4wMSkge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gMC4xO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAob2xkVmFsdWUpIC8gKHNpemUgLSBvYmpOdW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldICE9PSAtMSkge1xuXG4gICAgICAgICAgaWYgKChpID09IGlkeCkpIHtcbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChhZGQpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKChteU9iai5jb2x1bW5zW2ldID4gMC45KSAmJiAobXlPYmouY29sdW1ucy5sZW5ndGggLSBvYmpOdW0gIT0gMSkpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC45MDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA8IDAuMSkge1xuICAgICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSAwLjEwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaV0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICAgICAgc3VtICs9IG15T2JqLmNvbHVtbnNbaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhzdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaiA9PSBmYWxzZSkge1xuICAgICAgICAgICAgaWR4Rmlyc3ROb09iaiA9IGk7XG4gICAgICAgICAgICBmb3VuZEZpcnN0Tm9PYmogPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IC0xO1xuICAgICAgICBpZiAoZm91bmRGaXJzdE5vT2JqKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhGaXJzdE5vT2JqXSArPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLSBzdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbXlPYmouY29sdW1uc1tqXSAhPT0gLTEgJiZcbiAgICAgICAgICAhcmUxLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJlxuICAgICAgICAgICFyZTIudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpICYmXG4gICAgICAgICAgIXJlMy50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUoMC4xMCwgaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY29sdW1uV2lkdGhDaGFuZ2VkRW1pdHRlci5lbWl0KCk7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgaW1hZ2VVcmwgb24gdGhlIGN1cnJlbnQgQWpmSW1hZ2VXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZVVybFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLnVybCA9IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBcIiR7aW1hZ2VVcmx9XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRJY29uKGljb246IHsgZm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nIH0pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmljb24gPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ljb259XCJgfSk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBzZXRGbGFnKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZJbWFnZVdpZGdldDtcbiAgICAgIG15T2JqLmZsYWcgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke3ZhbHVlfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUNvbmRpdGlvbihjb25kaXRpb25UZXh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAod2lkZ2V0LnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgICB3aWRnZXQudmlzaWJpbGl0eS5jb25kaXRpb24gPSBjb25kaXRpb25UZXh0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDaGFydEZvcm11bGEoXG4gICAgX2xhYmVsOiBzdHJpbmcsXG4gICAgX2xldmVsOiBudW1iZXIsXG4gICAgX21haW5JbmRleDogbnVtYmVyLFxuICAgIF9pbmRleDogbnVtYmVyLFxuICAgIGZvcm11bGFUZXh0OiBzdHJpbmcsXG4gICAgYWdncmVnYXRpb25UeXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0ICE9IG51bGwgJiYgd2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgb2JqOiBhbnk7XG5cbiAgICAgICAgZm9ybXVsYS5mb3JtdWxhID0gZm9ybXVsYVRleHQ7XG4gICAgICAgIGFnZ3JlZ2F0aW9uLmFnZ3JlZ2F0aW9uID0gYWdncmVnYXRpb25UeXBlO1xuXG4gICAgICAgIC8vIG9iaiA9IHtcbiAgICAgICAgLy8gICAnZm9ybXVsYSc6IGZvcm11bGEudG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2FnZ3JlZ2F0aW9uJzogYWdncmVnYXRpb24udG9Kc29uKCksXG4gICAgICAgIC8vICAgJ2xhYmVsJzogbGFiZWxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICAvLyBkYXRhc2V0ID0gQWpmRGF0YXNldC5mcm9tSnNvbihvYmopO1xuICAgICAgICAvLyBjaGVjayBpZiB0aGUgcm93IHRoYXQgY29udGFpbnMgbWFpbiBkYXRhIGlzIGRlZmluZWRcbiAgICAgICAgLyogaWYgKHdpZGdldC5kYXRhc2V0WzBdID09IG51bGwpIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFswXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxldmVsID09IDAgJiYgbWFpbkluZGV4ID09IC0xICYmIGluZGV4ID09IC0xKSB7XG5cbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFswXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09IDEgJiYgbWFpbkluZGV4ID09IC0xICYmIGluZGV4ID09IC0xKSB7XG5cbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGhdID0gW107XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoIC0gMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4ICsgMV0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgIH0gKi9cblxuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVUYWJsZUZvcm11bGEoXG4gICAgX2xhYmVsOiBzdHJpbmcsXG4gICAgYWdncmVnYXRpb25UeXBlOiBudW1iZXIsXG4gICAgZm9ybXVsYVRleHQ6IHN0cmluZyxcbiAgICBfbWFpbkluZGV4OiBudW1iZXIsXG4gICAgX2luZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHc6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdpZGdldCA9IHcgYXMgQWpmVGFibGVXaWRnZXQ7XG4gICAgICBpZiAod2lkZ2V0LmRhdGFzZXQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgZm9ybXVsYTogQWpmRm9ybXVsYSA9IGNyZWF0ZUZvcm11bGEoe30pO1xuICAgICAgICBsZXQgYWdncmVnYXRpb246IEFqZkFnZ3JlZ2F0aW9uID0gY3JlYXRlQWdncmVnYXRpb24oe30pO1xuICAgICAgICAvLyBsZXQgZGF0YXNldDogQWpmRGF0YXNldCA9IG5ldyBBamZEYXRhc2V0KCk7XG4gICAgICAgIC8vIGxldCByb3dEYXRhc2V0OiBBamZEYXRhc2V0W10gPSBbXTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLyogaWYgKG1haW5JbmRleCA9PT0gLSAxKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aWRnZXQuZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSwgZGF0YXNldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9ICovXG4gICAgICB9XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlVGFibGVNYWluRGF0YShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdkYXRhc2V0JywgaW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRGF0YShfbWFpbkluZGV4OiBudW1iZXIsIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkRhdGFXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAvKiBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JbmRleCwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JbmRleF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB0eXBlIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRUeXBlKHR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgndHlwZScsIHR5cGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSAgaWR4IGVsZW1lbnQgb2YgeExhYmVscyBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlTWFpbkRhdGEoX2lkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgbGV0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PndpZGdldDtcbiAgICAgIC8vIG15T2JqLmRhdGFzZXRbMF0uc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVJlbGF0ZWREYXRhKF9tYWluSWR4OiBudW1iZXIsIF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvKiBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXQuc3BsaWNlKG1haW5JZHggKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG15T2JqLmRhdGFzZXRbbWFpbklkeCArIDFdLnNwbGljZShpZHgsIDEpO1xuICAgICAgfSAqL1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYmFja2dyb3VuZENvbG9yIGZpZWxkIG9mIEFqZkNoYXJ0V2lkZ2V0IGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xvcnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRDaGFydEJhY2tncm91bmRDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgYWRkQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JhY2tncm91bmRDb2xvcicsIGNvbG9yKTtcbiAgfVxuXG4gIHJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBib3JkZXJDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCb3JkZXJDb2xvcihjb2xvcnM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJDb2xvcicsIGNvbG9ycyk7XG4gIH1cblxuICBzZXRDaGFydEJvcmRlcldpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ2JvcmRlcldpZHRoJywgdmFsdWUpO1xuICB9XG5cbiAgYWRkQ2hhcnRCb3JkZXJDb2xvcihjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJvcmRlckNvbG9yKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdib3JkZXJDb2xvcicsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2Qgc2V0IHRoZSBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnQocmVwb3J0OiBBamZSZXBvcnQpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXBvcnQubmV4dChyZXBvcnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNhdmVSZXBvcnQoanNvbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVJlcG9ydC5uZXh0KGpzb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgZm9udCBhdHRyaWJ1dGUgb24gdGhlIGN1cnJlbnQgQWpmV2lkZ2V0LlxuICAgKlxuICAgKiBUaGVyZSBpcyBhIGNoZWNrIG9uIGZvbnQtc2l6ZSBhdHRyaWJ1dGUsXG4gICAqIGlmIGlzIG5vIHNwZWNpZmljYXRlIHRoZSB0eXBlIG9mIHNpemUgZm9udCBzZXQgJ3B0JyBhcyBkZWZhdWx0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZUZXh0V2lkZ2V0PndpZGdldDtcblxuICAgICAgY29uc3QgcHhTdHlsZXMgPSBbXG4gICAgICAgICdmb250LXNpemUnLCAnaGVpZ2h0JywgJ3dpZHRoJywgJ2JvcmRlci13aWR0aCcsICdib3JkZXItcmFkaXVzJywgJ3BhZGRpbmcnLCAnbWFyZ2luJ1xuICAgICAgXTtcbiAgICAgIGNvbnN0IGlzUHhTdHlsZSA9IHB4U3R5bGVzLmluZGV4T2YobGFiZWwpID4gLTE7XG4gICAgICBpZiAoaXNQeFN0eWxlICYmICEodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgJiYgdGhpcy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgKz0gJ3B4JztcbiAgICAgIH0gZWxzZSBpZiAoaXNQeFN0eWxlICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdGhpcy5pc051bWJlckFycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IGAke3ZhbHVlLmpvaW4oJ3B4ICcpfXB4YDtcbiAgICAgIH1cblxuICAgICAgbXlPYmouc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2QgdXBkYXRlIHRoZSBzdHlsZXMgb2Ygb3JpZ2luIHdpZGdldCBhcnJheVxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luIGNhbiBiZSBoZWFkZXIgY29udGVudCBvciBmb290ZXJcbiAgICogQHBhcmFtIGxhYmVsIGZvciBleGFtcGxlIGJhY2tncm91bmQtY29sb3JcbiAgICogQHBhcmFtIHZhbHVlIGZvciBleGFtcGxlIHJnYigyNTUsMjU1LDI1NSwxKVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMob3JpZ2luOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoKG9yaWdpbiAhPT0gJ2hlYWRlcicpICYmIChvcmlnaW4gIT09ICdjb250ZW50JykgJiYgKG9yaWdpbiAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuY2tub3cgb3JpZ2luICcgKyBvcmlnaW4pO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZXNbb3JpZ2luXS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHdpZGdldC5zdHlsZXNbbGFiZWxdID0gdmFsdWU7XG5cbiAgICAgIHdpZGdldC5zdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi53aWRnZXQuc3R5bGVzfTtcblxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBzZXQgdGhlIHN0eWxlIG9mIHRoZSB3aG9sZSByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3JlcG9ydFN0eWxlc1VwZGF0ZS5uZXh0KChzdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICBpZiAoc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgc3R5bGVzID0ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZXNbbGFiZWxdID0gdmFsdWU7XG4gICAgICAgIHN0eWxlcyA9IDxBamZTdHlsZXM+ey4uLnN0eWxlc307XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgZm9ybXNcbiAgICpcbiAgICogQHBhcmFtIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0Rm9ybXMoZm9ybXM6IEFqZkZvcm1bXSkge1xuICAgIHRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlLm5leHQoKF9mb3JtOiBBamZGb3JtW10pOiBBamZGb3JtW10gPT4ge1xuICAgICAgcmV0dXJuIGZvcm1zIHx8IFtdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDdXN0b21XaWRnZXRzKHdpZGdldDogQWpmQ3VzdG9tV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzID0gY3VzdG9tV2lkZ2V0cyB8fCBbXTtcbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsICYmIHBvc2l0aW9uID49IDApIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXN0b21XaWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2V0IGN1c3RvbVdpZGdldHNcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlc2V0Q3VzdG9tV2lkZ2V0cygpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cy5sZW5ndGggPSAwO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIGxhYmVsIG9mIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHBvc2l0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY2hhbmdlTGFiZWxDdXN0b21XaWRnZXQobGFiZWw6IHN0cmluZywgcG9zaXRpb246IG51bWJlcikge1xuICAgIHRoaXMuX2N1c3RvbVdpZGdldHNVcGRhdGUubmV4dCgoY3VzdG9tV2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICBjdXN0b21XaWRnZXRzW3Bvc2l0aW9uXS50eXBlID0gbGFiZWw7XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9oZWFkZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRIZWFkZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfY29udGVudFdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbnRlbnRXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2Zvb3RlcldpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZGdldFxuICAgKiBAcGFyYW0gW3Bvc2l0aW9uXVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZGZvb3RlcldpZGdldCh3aWRnZXQ6IEFqZldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9hZGRXaWRnZXRUb0NvbnRhaW5lcih0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuICAgICAgbGV0IGNoZWNrU3VtID0gMDtcbiAgICAgIGxldCBvYmpOdW0gPSAwO1xuICAgICAgbGV0IHZhbHVlID0gMTtcbiAgICAgIGxldCBzcHJlYWRWYWx1ZTogYW55O1xuICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gMDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW07IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLSAxKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IHZhbHVlO1xuICAgICAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSArIHZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHNwcmVhZFZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnJvdW5kVG8oKChjaGVja1N1bSAtIDEpICUgMSksIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gLT0gc3ByZWFkVmFsdWU7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdICs9ICgxIC0gKGNoZWNrU3VtICUgMSkpO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKG15T2JqLmNvbHVtbnNbaWR4XSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29sdW1uIG9uIHRoZSBjdXJyZW50IEFqZkxheW91dFdpZGdldC5cbiAgICpcbiAgICogV2hlbiBhZGRpbmcgYSBjb2x1bW4gdGhlIHdpZHRoIG9mIHRoZSBvdGhlciBjb2x1bW5zIGlzIHJlY2FsY3VsYXRlZFxuICAgKiBieSBkaXZpZGluZyBpdCBieSB0aGUgbnVtYmVyIG9mIGNvbHVtblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZENvbHVtbigpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCB0ZW1wT2JqOiBudW1iZXJbXSA9IFtdO1xuICAgICAgbGV0IG51bSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoICsgMTtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgdG1wVmFsdWU6IGFueTtcblxuICAgICAgaWYgKG51bSA+IDEwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZXhjZWVkIG1heCBjb2x1bW5zJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhbHVlID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC8gKG51bSAtIG9iak51bSksIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2ldID09PSAtMSkge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCgtMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGVtcE9iai5wdXNoKHZhbHVlKTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNoZWNrU3VtID0gTnVtYmVyKHRoaXMucm91bmRUbyhjaGVja1N1bSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGlmIChjaGVja1N1bSA+IDEpIHtcbiAgICAgICAgdG1wVmFsdWUgPVxuICAgICAgICAgIHBhcnNlRmxvYXQoXG4gICAgICAgICAgICB0aGlzLnJvdW5kVG8oXG4gICAgICAgICAgICAgICgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyXG4gICAgICAgICAgICApLnRvRml4ZWQoMikpO1xuICAgICAgICB0ZW1wT2JqWzBdIC09IHRtcFZhbHVlO1xuICAgICAgICB0ZW1wT2JqWzBdID0gdGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja1N1bSA8IDEpIHtcbiAgICAgICAgdGVtcE9ialswXSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgdGVtcE9ialswXSA9IE51bWJlcih0aGlzLnJvdW5kVG8odGVtcE9ialswXSwgMikudG9GaXhlZCgyKSk7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLmNvbHVtbnMgPSB0ZW1wT2JqO1xuXG4gICAgICAvLyBUT0RPOiBAdHJpayB3aGF0J3MgdmFsdWU/IT9cbiAgICAgIGNvbnN0IGNvbHVtbk9iaiA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IDcsXG4gICAgICAgIC8vIHZhbHVlOiBteU9iai5jb2x1bW5zW215T2JqLmNvbHVtbnMubGVuZ3RoIC0gMV0sXG4gICAgICB9KTtcblxuICAgICAgbXlPYmouY29udGVudC5wdXNoKGNvbHVtbk9iaik7XG4gICAgICB0aGlzLl9zYXZlUmVwb3J0RXZlbnQuZW1pdCgpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlV2lkZ2V0VG9Db2x1bW4oY29sdW1uOiBBamZDb2x1bW5XaWRnZXQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBjb2x1bW4uY29udGVudC5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHJlbW92ZSBhIHdpZGdldCBvbiB0aGUgY3VycmVudCBBamZSZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlXG4gICAqIHRoZSBwb3NpdGlvbiBhcnJheTpcbiAgICpcbiAgICogaGVhZGVyIC1gPmAgaGVhZGVyV2lkZ2V0c1xuICAgKiBjb250ZW50IC1gPmAgY29udGVudFdpZGdldHNcbiAgICogZm9vdGVyIC1gPmAgZm9vdGVyV2lkZ2V0c1xuICAgKiBjb2x1bW4gLWA+YCBjb2x1bW4gb2YgbGF5b3V0XG4gICAqIGxheW91dENvbnRlbnQgLWA+YCBjb250ZW50IG9mIGxheW91dFxuICAgKiBvYmogLWA+YCBvYmogb2YgbGF5b3V0XG4gICAqIGN1c3RvbVdpZGdldCAtYD5gIGN1c3RvbSB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeCB0aGUgcG9zaXRpb24gYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZW1vdmUobm9kZTogc3RyaW5nLCBpZHg6IG51bWJlcikge1xuXG4gICAgc3dpdGNoIChub2RlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICB0aGlzLl91cGRhdGVzW25vZGVdLm5leHQoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0cy53aWRnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5b3UgY2FuIG5vdCByZW1vdmUgZnJvbSBlbXB0eSBhcnJheScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod2lkZ2V0cy53aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMud2lkZ2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xheW91dCc6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBteU9iaiA9IHdpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIChteU9iai5jb250ZW50WzBdIGFzIEFqZkNvbHVtbldpZGdldCkuY29udGVudC5sZW5ndGggPSAwO1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzcHJlYWQgPSBteU9iai5jb2x1bW5zW2lkeF0gLyAobXlPYmouY29sdW1ucy5sZW5ndGggLSAxKTtcblxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSArPSBzcHJlYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZShteU9iai5jb2x1bW5zWzBdLCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb2x1bW4nOlxuICAgICAgY2FzZSAnbGF5b3V0Q29udGVudCc6XG4gICAgICBjYXNlICd1bmZpeGVkQ29sdW1uJzpcbiAgICAgICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG5vZGUgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgICAgICBsZXQgY2xtID0gPEFqZkNvbHVtbldpZGdldD53aWRnZXQ7XG4gICAgICAgICAgICBjbG0uY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgPT09ICdsYXlvdXRDb250ZW50Jykge1xuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBsZW5ndGggaXMgMCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG15T2JqLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FuIG5vdCByZW1vdmUgYW55IHdpZGdldCBmcm9tIGVtcHR5IGNvbnRlbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT0gbnVsbCAmJiBteU9iai5jb250ZW50W2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMgY29udGVudCBpcyB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUgPT09ICd1bmZpeGVkQ29sdW1uJykge1xuICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgY29sdW1uIHBvc2l0aW9uIHZhbHVlICBpc250IC0xJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVuZml4ZWRDb2x1bW4oaWR4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gaWYgKG5vZGUgIT09ICdvYmonKSB7XG4gICAgICAgICAgLy8gICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgLy8gICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIC8vICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY3VzdG9tV2lkZ2V0cyc6XG4gICAgICAgIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2lkZ2V0cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICByZXR1cm4gd2lkZ2V0cztcbiAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gbm9kZSAnICsgbm9kZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCBhIEFqZldpZGdldCBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGFkZFRvQ29udGVudChuZXdXaWRnZXQ6IEFqZldpZGdldCwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgaWYgKG15T2JqLmNvbnRlbnRbaWR4XSAhPSBudWxsKSB7XG4gICAgICAgIG15T2JqLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDAsIG5ld1dpZGdldCk7XG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICBhZGRUb0NvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uICE9IG51bGwpIHtcbiAgICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSBldmVudC5kcmFnRGF0YS5mcm9tQ29sdW1uO1xuICAgICAgbGV0IHdpZGdldDogQWpmV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEud2lkZ2V0O1xuICAgICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuXG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2god2lkZ2V0KTtcblxuICAgIH0gZWxzZSBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tKSB7XG4gICAgICB0aGlzLnJlbW92ZShldmVudC5kcmFnRGF0YS5hcnJheUZyb20sIGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleCk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2goZXZlbnQuZHJhZ0RhdGEud2lkZ2V0KTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmpzb24pIHtcbiAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGV2ZW50LmRyYWdEYXRhLmpzb24pO1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvYmogPSB7J3dpZGdldFR5cGUnOiBBamZXaWRnZXRUeXBlW2V2ZW50LmRyYWdEYXRhXX07XG4gICAgICBsZXQgbmV3V2lkZ2V0ID0gZGVlcENvcHkob2JqKTtcblxuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UocG9zaXRpb24sIDAsIG5ld1dpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnB1c2gobmV3V2lkZ2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2hhbmdlUG9zaXRpb25PbkNvbHVtbihldmVudDogYW55LCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCB0b0luZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICBsZXQgZnJvbUluZGV4OiBudW1iZXIgPSBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXg7XG4gICAgbGV0IGZyb21XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdO1xuICAgIGxldCB0b1dpZGdldDogQWpmV2lkZ2V0ID0gZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdO1xuXG4gICAgaWYgKGZyb21Db2x1bW4gPT0gdG9Db2x1bW4pIHtcbiAgICAgIGZyb21Db2x1bW4uY29udGVudFtmcm9tSW5kZXhdID0gdG9XaWRnZXQ7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbdG9JbmRleF0gPSBmcm9tV2lkZ2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnQuc3BsaWNlKGZyb21JbmRleCwgMSk7XG4gICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZSh0b0luZGV4LCAwLCBmcm9tV2lkZ2V0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYWRkIHRoZSBvYmogb24gdGhlIGlkeCBwb3NpdGlvbi5cbiAgICogT2JqIGhhdmUgYSBubyBzcGVjaWZpY2F0ZSB3aWR0aCBhbmQgaXMgbm90IGNhbGN1bGF0ZSBhcyBjb2x1bW5zXG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKC0xLCBpZHgpO1xuICB9XG5cbiAgY2hhbmdlQ29sdW1uKGZyb206IG51bWJlciwgdG86IG51bWJlciwgbGF5b3V0V2lkZ2V0OiBBamZMYXlvdXRXaWRnZXQpIHtcbiAgICBpZiAodG8gPCAwIHx8IHRvID49IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZnJvbSA+IGxheW91dFdpZGdldC5jb250ZW50Lmxlbmd0aCAtIDEgJiYgdG8gPiBmcm9tKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IDxBamZDb2x1bW5XaWRnZXQ+bGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV07XG4gICAgbGV0IGZyb21Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV07XG4gICAgbGV0IHRvQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W3RvXTtcbiAgICBsZXQgdG9Db2x1bW5WYWx1ZTogbnVtYmVyID0gbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dO1xuXG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbZnJvbV0gPSB0b0NvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1tmcm9tXSA9IHRvQ29sdW1uVmFsdWU7XG4gICAgbGF5b3V0V2lkZ2V0LmNvbnRlbnRbdG9dID0gZnJvbUNvbHVtbjtcbiAgICBsYXlvdXRXaWRnZXQuY29sdW1uc1t0b10gPSBmcm9tQ29sdW1uVmFsdWU7XG5cbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRXaWRnZXQobGF5b3V0V2lkZ2V0KTtcbiAgfVxuXG4gIGFkZEN1c3RvbUNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcblxuICAgIHRoaXMuX3VwZGF0ZXNbJ2NvbG9yJ10ubmV4dCgoY29sb3JzOiBzdHJpbmdbXSk6IHN0cmluZ1tdID0+IHtcblxuICAgICAgaWYgKGNvbG9ycy5pbmRleE9mKGNvbG9yKSA8IDApIHtcbiAgICAgICAgY29sb3JzLnB1c2goY29sb3IpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbG9ycztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFdpZGdldFRvQ29udGFpbmVyKFxuICAgICAgc3ViajogU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPiwgd2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgc3Viai5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIHdpZGdldHMud2lkZ2V0cy5zcGxpY2UocG9zaXRpb24sIDAsIHdpZGdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgfSk7XG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KHdpZGdldCk7XG4gICAgdGhpcy5zZXRFbXB0eUNvbnRlbnQoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICAod2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgYXJyID0gKDxBcnJheTxhbnk+Pih3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0pO1xuICAgICAgYXJyLnB1c2godmFsdWUpO1xuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IGFycjtcbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAoPEFycmF5PGFueT4+KHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG59XG4iXX0=