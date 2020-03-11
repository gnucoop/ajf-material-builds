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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWJ1aWxkZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQVcsWUFBWSxFQUFvQixXQUFXLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDcEcsT0FBTyxFQUFhLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNELE9BQU8sRUFHTSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUMxRCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFDTCxhQUFhLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUM1RSxNQUFNLGdCQUFnQixDQUFDO0FBT3hCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUU1Qzs7OztHQUlHO0FBQ0g7SUFzT0U7Ozs7T0FJRztJQUNILGlDQUMwQyxhQUErQjtRQUR6RSxpQkFrU0M7UUFwZ0JPLHlCQUFvQixHQUN4QixJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQVFyQyxrQkFBYSxHQUFvQixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBUXZELHVCQUFrQixHQUF1QixJQUFJLE9BQU8sRUFBYSxDQUFDO1FBRWxFLGVB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LFFBQVEsQ0FBRSxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixNQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hDLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVFQUFxQyxHQUE3QyxVQUE4QyxRQUFnQixFQUFFLEdBQVc7UUFDekUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFDLE1BQXNCO1lBQ3RDLE1BQWMsQ0FBQyxRQUFRLENBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBaGhFRixVQUFVOzs7O2dEQTRPTixRQUFRLFlBQUksTUFBTSxTQUFDLGtCQUFrQjs7SUFxeUQxQyw4QkFBQztDQUFBLEFBamhFRCxJQWloRUM7U0FoaEVZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZGb3JtLCBBamZOb2RlLCBBamZOb2RlVHlwZSwgZmxhdHRlbk5vZGVzfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uLCBBamZDaGFydFdpZGdldCwgQWpmQ29sdW1uV2lkZ2V0LCBBamZDdXN0b21XaWRnZXQsIEFqZkRhdGFXaWRnZXQsIEFqZkltYWdlV2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsIEFqZlJlcG9ydCwgQWpmUmVwb3J0Q29udGFpbmVyLCBBamZTdHlsZXMsIEFqZlRhYmxlV2lkZ2V0LCBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsIEFqZldpZGdldFR5cGUsIGNyZWF0ZUFnZ3JlZ2F0aW9uLCBjcmVhdGVXaWRnZXRcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNvbWJpbmVMYXRlc3QsIGZpbHRlciwgbWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgc2Nhbiwgc2hhcmUsIHN0YXJ0V2l0aFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlcywgQWpmUmVwb3J0SWNvbnMsIEFqZlJlcG9ydHNDb25maWcsIEFqZldpZGdldHNDb250YWluZXJ9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkNvbG9yT3BlcmF0aW9uLCBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uLCBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uLCBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbixcbiAgQWpmU3R5bGVzT3BlcmF0aW9uLCBBamZXaWRnZXRPcGVyYXRpb24sIEFqZldpZGdldHNPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcbmltcG9ydCB7QUpGX1JFUE9SVFNfQ09ORklHfSBmcm9tICcuL3Rva2Vucyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGNvbnRhaW5zIGFsbCB0aGUgbG9naWMgdG8gbW9kZWwgdGhlIHJlcG9ydCB3aWRnZXQuXG4gKlxuICogQGV4cG9ydFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2Uge1xuXG4gIC8qKlxuICAgKiAgdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIGN1c3RvbVdpZGdldHMgb2JqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VzdG9tV2lkZ2V0czogT2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRbXT47XG4gIHByaXZhdGUgX2N1c3RvbVdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ3VzdG9tV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogdGhpcyBPYnNlcnZhYmxlIG9ic2VydmUgdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudCB3aWRnZXQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb3JpZ2luOiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIHByaXZhdGUgX29yaWdpblVwZGF0ZTogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZXhwb3J0ZWQganNvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0OiBPYnNlcnZhYmxlPEFqZlJlcG9ydD47XG4gIHByaXZhdGUgX3NhdmVkUmVwb3J0VXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydD4gPSBuZXcgU3ViamVjdDxBamZSZXBvcnQ+KCk7XG5cbiAgcHJpdmF0ZSBfanNvblN0YWNrOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID1cbiAgbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuXG4gIHByaXZhdGUgX2xhc3REZWxldGVkSnNvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2VtcHR5Q29udGVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID1cbiAgbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnZ2VkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbkRyYWdnZWRVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgcHJpdmF0ZSBfb25PdmVyOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9vbk92ZXJVcGRhdGU6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdGF0dXMgb2YgcGVybWFuZW50IHpvb21cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9maXhlZFpvb206IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByaXZhdGUgX2ZpeGVkWm9vbVVwZGF0ZTogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIGlmIGlzIGZpcmVkIGRyYWcgbW91c2UgZXZlbnQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXI6IE9ic2VydmFibGU8YW55PjtcbiAgcHJpdmF0ZSBfb25EcmFnRW50ZXJVcGRhdGU6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgaGVhZGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9oZWFkZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgaGVhZGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9oZWFkZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgY29udGVudCB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb250ZW50V2lkZ2V0czogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPjtcbiAgcHJpdmF0ZSBfY29udGVudFdpZGdldHNVcGRhdGU6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZXaWRnZXRzT3BlcmF0aW9uPigpO1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgY29udGVudCBzdHlsZXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHdpZGdldCBhcnJheS5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzOiBPYnNlcnZhYmxlPEFqZldpZGdldHNDb250YWluZXI+O1xuICBwcml2YXRlIF9mb290ZXJXaWRnZXRzVXBkYXRlOiBTdWJqZWN0PEFqZldpZGdldHNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4oKTtcblxuXG4gIHByaXZhdGUgX2NvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgcHJpdmF0ZSBfY29sb3JVcGRhdGU6IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmQ29sb3JPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRDb2xvcjogc3RyaW5nW10gPVxuICBbXG4gICAgJ3JnYmEoMCwgMCwgMCwgMSknLCAncmdiYSg1MSwgMTUzLCAyNTUsIDEpJywgJ3JnYmEoMTUzLCAyMDQsIDAsIDEpJywgJ3JnYmEoMjU1LCAxMDIsIDAsIDEpJyxcbiAgICAncmdiYSgwLCAyMDQsIDIwNCwgMSknLCAncmdiYSgyMDQsIDIwNCwgMTUzLCAxKScsICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsICdyZ2JhKDIzMCwgMCwgMCwgMSknLFxuICAgICdyZ2JhKDI1NSwgMTUzLCAwLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAwLCAxKScsICdyZ2JhKDAsIDEzOCwgMCwgMSknLCAncmdiYSgwLCAxMDIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDE1MywgNTEsIDI1NSwgMSknLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsICdyZ2JhKDI1MCwgMjA0LCAyMDQsIDEpJyxcbiAgICAncmdiYSgyNTUsIDIzNSwgMjA0LCAxKScsICdyZ2JhKDI1NSwgMjU1LCAyMDQsIDEpJywgJ3JnYmEoMjA0LCAyMzIsIDIwNCwgMSknLFxuICAgICdyZ2JhKDIwNCwgMjI0LCAyNDUsIDEpJywgJ3JnYmEoMjM1LCAyMTQsIDI1NSwgMSknLCAncmdiYSgxODcsIDE4NywgMTg3LCAxKScsXG4gICAgJ3JnYmEoMjQwLCAxMDIsIDEwMiwgMSknLCAncmdiYSgyNTUsIDE5NCwgMTAyLCAxKScsICdyZ2JhKDI1NSwgMjU1LCAxMDIsIDEpJyxcbiAgICAncmdiYSgxMDIsIDE4NSwgMTAyLCAxKScsICdyZ2JhKDEwMiwgMTYzLCAyMjQsIDEpJywgJ3JnYmEoMTk0LCAxMzMsIDI1NSwgMSknLFxuICAgICdyZ2JhKDEzNiwgMTM2LCAxMzYsIDEpJywgJ3JnYmEoMTYxLCAwLCAwLCAxKScsICdyZ2JhKDE3OCwgMTA3LCAwLCAxKScsXG4gICAgJ3JnYmEoMTc4LCAxNzgsIDAsIDEpJywgJ3JnYmEoMCwgOTcsIDAsIDEpJywgJ3JnYmEoMCwgNzEsIDE3OCwgMSknLFxuICAgICdyZ2JhKDEwNywgMzYsIDE3OCwgMSknLCAncmdiYSg2OCwgNjgsIDY4LCAxKScsICdyZ2JhKDkyLCAwLCAwLCAxKScsICdyZ2JhKDEwMiwgNjEsIDAsIDEpJyxcbiAgICAncmdiYSgxMDIsIDEwMiwgMCwgMSknLCAncmdiYSgwLCA1NSwgMCwgMSknLCAncmdiYSgwLCA0MSwgMTAyLCAxKScsICdyZ2JhKDYxLCAyMCwgMTAyLCAxKSdcbiAgXTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIE9ic2VydmFibGUgb2JzZXJ2ZSB0aGUgZm9vdGVyIHN0eWxlcy5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXM6IE9ic2VydmFibGU8QWpmU3R5bGVzPjtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBjdXJyZW50IHdpZGdldCB3aGljaCBob2xkcyB0aGUgZm9jdXMuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldDogT2JzZXJ2YWJsZTxBamZXaWRnZXR8bnVsbD47XG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRVcGRhdGU6IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZXaWRnZXRPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cblxuICAvKipcbiAgICogT2JzZXJ2ZSB0aGUgQWpmRm9ybVZhcmlhYmxlcyBleHBsb2l0IGZvciBmaWVsZCBzZWxlY3RpbmcgZnJvbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT47XG4gIHByaXZhdGUgX2Zvcm1zVmFyaWFibGVzVXBkYXRlOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4obnVsbCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmUgdGhlIEFqZkZvcm1WYXJpYWJsZXMgZXhwbG9pdCBmb3IgZmllbGQgc2VsZWN0aW5nIGZyb20gZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lczogT2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzW10+O1xuICBwcml2YXRlIF9jb25kaXRpb25OYW1lc1VwZGF0ZTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1WYXJpYWJsZXNPcGVyYXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9ufG51bGw+KG51bGwpO1xuXG4gIC8qKlxuICAgKiB0aGlzIEJlaGF2aW9yU3ViamVjdCB1cGRhdGUgZXhwb3J0IHJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9zYXZlUmVwb3J0OiBCZWhhdmlvclN1YmplY3Q8YW55PiA9XG4gIG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcblxuICAvKipcbiAgICogdGhpcyBCZWhhdmlvclN1YmplY3QgY29udGFpbnMgdGhlIEFqZlJlcG9ydC5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF9yZXBvcnQ6IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnQgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZSZXBvcnQgfCBudWxsPihudWxsKTtcblxuICAvKipcbiAgICogIHRoaXMgT2JzZXJ2YWJsZSBvYnNlcnZlIHRoZSBzdHlsZXMgb2YgcmVwb3J0LlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydFN0eWxlczogT2JzZXJ2YWJsZTxBamZTdHlsZXM+O1xuICBwcml2YXRlIF9yZXBvcnRTdHlsZXNVcGRhdGU6IFN1YmplY3Q8QWpmU3R5bGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZlN0eWxlc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogb2JzZXJ2ZSB0aGUgZm9ybXMgZmV0Y2hlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zOiBPYnNlcnZhYmxlPEFqZkZvcm1bXT47XG4gIHByaXZhdGUgX3JlcG9ydEZvcm1zVXBkYXRlOiBTdWJqZWN0PEFqZlJlcG9ydEZvcm1zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZXBvcnRGb3Jtc09wZXJhdGlvbj4oKTtcblxuICAvKipcbiAgICogZGljdGlvbmFyeSBmb3IgIHdpZGdldHNVcGRhdGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVzOiBhbnkgPSB7XG4gICAgaGVhZGVyOiB0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlLFxuICAgIGNvbnRlbnQ6IHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLFxuICAgIGZvb3RlcjogdGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSxcbiAgICBjb2xvcjogdGhpcy5fY29sb3JVcGRhdGUsXG4gICAgY3VzdG9tV2lkZ2V0czogdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZVxuICB9O1xuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gd29udCB0byBzYXZlIHJlcG9ydFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHByaXZhdGUgX3NhdmVSZXBvcnRFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3NhdmVGb3JtdWxhVE9IdG1sOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGdldEZvcm11bGFUb0h0bWxFdmVudCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRm9ybXVsYVRPSHRtbC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBldmVudCBlbWl0dGVyIHRoYXQgbm90aWZ5IHdoZW4gY29sdW1uIHdpZHRoIGNoYW5nZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaWNvblNldHM6IEFqZlJlcG9ydEljb25zID0ge1xuICAgICdhamYtaWNvbic6IFtdXG4gIH07XG4gIGdldCBpY29uU2V0cygpOiBBamZSZXBvcnRJY29ucyB7IHJldHVybiB0aGlzLl9pY29uU2V0czsgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQUpGX1JFUE9SVFNfQ09ORklHKSByZXBvcnRzQ29uZmlnOiBBamZSZXBvcnRzQ29uZmlnXG4gICkge1xuXG4gICAgdGhpcy5fbGFzdERlbGV0ZWRKc29uID0gJyc7XG5cbiAgICBpZiAocmVwb3J0c0NvbmZpZyAhPSBudWxsKSB7XG4gICAgICBpZiAocmVwb3J0c0NvbmZpZy5pY29ucyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2ljb25TZXRzID0gey4uLnRoaXMuX2ljb25TZXRzLCAuLi5yZXBvcnRzQ29uZmlnLmljb25zfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9vcmlnaW4gPSAoPE9ic2VydmFibGU8c3RyaW5nPj50aGlzLl9vcmlnaW5VcGRhdGUpLnBpcGUoXG4gICAgICBzdGFydFdpdGgoJ2hlYWRlcicpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9zYXZlZFJlcG9ydCA9ICg8T2JzZXJ2YWJsZTxBamZSZXBvcnQ+PnRoaXMuX3NhdmVkUmVwb3J0VXBkYXRlKS5waXBlKFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9vbkRyYWdnZWQgPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fb25EcmFnZ2VkVXBkYXRlKS5waXBlKFxuICAgICAgc3RhcnRXaXRoKGZhbHNlKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5fb25PdmVyID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX29uT3ZlclVwZGF0ZSkucGlwZShcbiAgICAgIHN0YXJ0V2l0aChmYWxzZSksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuX2ZpeGVkWm9vbSA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9maXhlZFpvb21VcGRhdGUpLnBpcGUoXG4gICAgICBzdGFydFdpdGgoZmFsc2UpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLl9vbkRyYWdFbnRlciA9IHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLnBpcGUoc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9yZXBvcnRTdHlsZXMgPSAoPE9ic2VydmFibGU8QWpmU3R5bGVzT3BlcmF0aW9uPj50aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKHN0eWxlczogQWpmU3R5bGVzLCBvcDogQWpmU3R5bGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDxBamZTdHlsZXM+e30pLCBzaGFyZSgpLCBzdGFydFdpdGgoPEFqZlN0eWxlcz57fSkpO1xuXG4gICAgdGhpcy5fcmVwb3J0Rm9ybXMgPSAoPE9ic2VydmFibGU8QWpmUmVwb3J0Rm9ybXNPcGVyYXRpb24+PnRoaXMuX3JlcG9ydEZvcm1zVXBkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKGZvcm1zOiBBamZGb3JtW10sIG9wOiBBamZSZXBvcnRGb3Jtc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGZvcm1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCksIHN0YXJ0V2l0aChbXSkpO1xuXG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0cyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uPj50aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10sIG9wOiBBamZDdXN0b21XaWRnZXRzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSwgc3RhcnRXaXRoKFtdKSk7XG5cbiAgICB0aGlzLl9mb3Jtc1ZhcmlhYmxlcyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uPj50aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihzID0+IHMgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgc2NhbigodmFyaWFibGVzOiBBamZGb3JtVmFyaWFibGVzW10sIG9wOiBBamZGb3JtVmFyaWFibGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AodmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29uZGl0aW9uTmFtZXMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uTmFtZXNVcGRhdGUpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIocyA9PiBzICE9IG51bGwpLFxuICAgICAgICAgICAgICAgIHNjYW4oKHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdLCBvcDogQWpmRm9ybVZhcmlhYmxlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHZhcmlhYmxlcyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpLCBzdGFydFdpdGgoW10pKTtcblxuICAgIHRoaXMuX2hlYWRlcldpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5faGVhZGVyV2lkZ2V0c1VwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyLCBvcDogQWpmV2lkZ2V0c09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcCh3aWRnZXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRXaXRoKDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVzID0gdGhpcy5faGVhZGVyV2lkZ2V0cy5waXBlKG1hcCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcikgPT4ge1xuICAgICAgcmV0dXJuIHdpZGdldHMgIT0gbnVsbCA/IHdpZGdldHMuc3R5bGVzIDoge307XG4gICAgfSkpO1xuXG4gICAgdGhpcy5fY29udGVudFdpZGdldHMgPSAoPE9ic2VydmFibGU8QWpmV2lkZ2V0c09wZXJhdGlvbj4+dGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHdpZGdldHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpdGgoPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fY29udGVudFN0eWxlcyA9IHRoaXMuX2NvbnRlbnRXaWRnZXRzLnBpcGUobWFwKCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKSA9PiB7XG4gICAgICByZXR1cm4gd2lkZ2V0cyAhPSBudWxsID8gd2lkZ2V0cy5zdHlsZXMgOiB7fTtcbiAgICB9KSk7XG5cbiAgICB0aGlzLl9mb290ZXJXaWRnZXRzID0gKDxPYnNlcnZhYmxlPEFqZldpZGdldHNPcGVyYXRpb24+PnRoaXMuX2Zvb3RlcldpZGdldHNVcGRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lciwgb3A6IEFqZldpZGdldHNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aod2lkZ2V0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCg8QWpmV2lkZ2V0c0NvbnRhaW5lcj57d2lkZ2V0czogW10sIHN0eWxlczoge319KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2Zvb3RlclN0eWxlcyA9IHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShtYXAoKHdpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpID0+IHtcbiAgICAgIHJldHVybiB3aWRnZXRzICE9IG51bGwgPyB3aWRnZXRzLnN0eWxlcyA6IHt9O1xuICAgIH0pKTtcblxuICAgIHRoaXMuX2NvbG9yID0gKDxPYnNlcnZhYmxlPEFqZkNvbG9yT3BlcmF0aW9uPj50aGlzLl9jb2xvclVwZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChjb2xvcjogc3RyaW5nW10sIG9wOiBBamZDb2xvck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLl9kZWZhdWx0Q29sb3IpLCBzaGFyZSgpLCBzdGFydFdpdGgodGhpcy5fZGVmYXVsdENvbG9yKSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0ID0gdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5waXBlKFxuICAgICAgZmlsdGVyKHMgPT4gcyAhPSBudWxsKSxcbiAgICAgIG1hcChzID0+IHMhKSxcbiAgICAgIHNjYW4oKHdpZGdldDogQWpmV2lkZ2V0fG51bGwsIG9wOiBBamZXaWRnZXRPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHdpZGdldCk7XG4gICAgICB9LCBudWxsIGFzIHVua25vd24gYXMgQWpmV2lkZ2V0KSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtcy5waXBlKFxuICAgICAgZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksXG4gICAgICBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSh0aGlzLl9mb3Jtc1ZhcmlhYmxlc1VwZGF0ZSk7XG5cbiAgICB0aGlzLl9yZXBvcnRGb3Jtcy5waXBlKFxuICAgICAgZmlsdGVyKGYgPT4gZi5sZW5ndGggIT0gMCksXG4gICAgICBtYXAoKGZvcm1zOiBBamZGb3JtW10pID0+IHtcbiAgICAgICAgcmV0dXJuIChfYzogQWpmRm9ybVZhcmlhYmxlc1tdKTogQWpmRm9ybVZhcmlhYmxlc1tdID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5maWxsRm9ybXNWYXJpYWJsZXMoZm9ybXMpO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSh0aGlzLl9jb25kaXRpb25OYW1lc1VwZGF0ZSk7XG5cbiAgICBjb25zdCByZXBvcnRPYnMgPSB0aGlzLl9yZXBvcnQ7XG5cbiAgICByZXBvcnRPYnMucGlwZShcbiAgICAgIG1hcCgocjogQWpmUmVwb3J0IHwgbnVsbCkgPT4ge1xuICAgICAgICByZXR1cm4gKF9jb2xvcnM6IHN0cmluZ1tdKTogc3RyaW5nW10gPT4ge1xuICAgICAgICAgIGxldCB0ZW1wQ29sb3JzOiBzdHJpbmdbXSA9IHRoaXMuX2RlZmF1bHRDb2xvcjtcbiAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICBpZiAoci5jb250ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyc2VDb2xvcihyLmNvbnRlbnQuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyLmZvb3Rlcikge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5mb290ZXIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyLmhlYWRlcikge1xuICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3Ioci5oZWFkZXIuc3R5bGVzLCB0ZW1wQ29sb3JzKTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByLmhlYWRlci5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHIuaGVhZGVyLmNvbnRlbnRbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKG9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgIGlmIChvYmoud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBsYXlvdXRPYmogPSBvYmogYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXlvdXRPYmouY29udGVudC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sdW1uT2JqID0gbGF5b3V0T2JqLmNvbnRlbnRbal0gYXMgQWpmQ29sdW1uV2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlQ29sb3IoY29sdW1uT2JqLnN0eWxlcywgdGVtcENvbG9ycyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgY29sdW1uT2JqLmNvbnRlbnQubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0T2JqID0gY29sdW1uT2JqLmNvbnRlbnRbel07XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJzZUNvbG9yKHdpZGdldE9iai5zdHlsZXMsIHRlbXBDb2xvcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiA8c3RyaW5nW10+dGVtcENvbG9ycztcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUodGhpcy5fY29sb3JVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9zdHlsZXM6IEFqZlN0eWxlcyk6IEFqZlN0eWxlcyA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuc3R5bGVzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZTdHlsZXM+e307XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZlN0eWxlcz5yLnN0eWxlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuaGVhZGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuaGVhZGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmhlYWRlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9oZWFkZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHJlcG9ydE9ic1xuICAgICAgICAucGlwZShtYXAoKHI6IEFqZlJlcG9ydHxudWxsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfd2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCB8fCByLmNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e3dpZGdldHM6IFtdLCBzdHlsZXM6IHt9fTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiA8QWpmV2lkZ2V0c0NvbnRhaW5lcj57XG4gICAgICAgICAgICAgICAgd2lkZ2V0czogci5jb250ZW50LmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmNvbnRlbnQuc3R5bGVzIHx8IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fY29udGVudFdpZGdldHNVcGRhdGUpO1xuXG4gICAgcmVwb3J0T2JzXG4gICAgICAgIC5waXBlKG1hcCgocjogQWpmUmVwb3J0fG51bGwpID0+IHtcbiAgICAgICAgICByZXR1cm4gKF93aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICBpZiAociA9PSBudWxsIHx8IHIuZm9vdGVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDxBamZXaWRnZXRzQ29udGFpbmVyPnt3aWRnZXRzOiBbXSwgc3R5bGVzOiB7fX07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gPEFqZldpZGdldHNDb250YWluZXI+e1xuICAgICAgICAgICAgICAgIHdpZGdldHM6IHIuZm9vdGVyLmNvbnRlbnQgfHwgW10sXG4gICAgICAgICAgICAgICAgc3R5bGVzOiByLmZvb3Rlci5zdHlsZXMgfHwge31cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb290ZXJXaWRnZXRzVXBkYXRlKTtcblxuICAgIHRoaXMuX3NhdmVSZXBvcnQucGlwZShcbiAgICAgIG1hcCgoanNvbjogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAoX3I6IGFueSk6IGFueSA9PiB7XG4gICAgICAgICAgaWYgKGpzb24gPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBqc29uO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgY29tYmluZUxhdGVzdCh0aGlzLnJlcG9ydCwgdGhpcy5yZXBvcnRGb3JtcyksXG4gICAgICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50V2lkZ2V0cy5waXBlKGZpbHRlcih3ID0+IHcgIT0gbnVsbCkpLFxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvb3RlcldpZGdldHMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBvcnRTdHlsZXMucGlwZShmaWx0ZXIodyA9PiB3ICE9IG51bGwpKSxcbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAuc3Vic2NyaWJlKChyOiBbXG4gICAgICAgICAgICAgICAgICAgICBbdm9pZCwgQWpmUmVwb3J0IHwgbnVsbCwgQWpmRm9ybVtdXSwgQWpmV2lkZ2V0c0NvbnRhaW5lciwgQWpmV2lkZ2V0c0NvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgIEFqZldpZGdldHNDb250YWluZXIsIEFqZlN0eWxlc1xuICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAvLyBjb25zdCBjdXJSbyA9IHJbMF1bMV07XG4gICAgICAgICAgLy8gY29uc3QgZm9ybXMgPSByWzBdWzJdICE9IG51bGwgPyByWzBdWzJdIHx8IFtdXG4gICAgICAgICAgLy8gICAgIDogKGN1clJvICE9IG51bGwgPyBjdXJSby5mb3JtcyB8fCBbXSA6IFtdKTtcblxuICAgICAgICAgIG9iai5oZWFkZXIgPSB7Y29udGVudDogclsxXS53aWRnZXRzLm1hcCh3ID0+IGRlZXBDb3B5KHcpKSwgc3R5bGVzOiByWzFdLnN0eWxlc30gYXNcbiAgICAgICAgICAgICAgQWpmUmVwb3J0Q29udGFpbmVyO1xuICAgICAgICAgIG9iai5jb250ZW50ID0ge2NvbnRlbnQ6IHJbMl0ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclsyXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouZm9vdGVyID0ge2NvbnRlbnQ6IHJbM10ud2lkZ2V0cy5tYXAodyA9PiBkZWVwQ29weSh3KSksIHN0eWxlczogclszXS5zdHlsZXN9IGFzXG4gICAgICAgICAgICAgIEFqZlJlcG9ydENvbnRhaW5lcjtcbiAgICAgICAgICBvYmouc3R5bGVzID0gcls0XTtcblxuICAgICAgICAgIGNvbnN0IHJvID0ge1xuICAgICAgICAgICAgaGVhZGVyOiB7Y29udGVudDogclsxXS53aWRnZXRzLCBzdHlsZXM6IHJbMV0uc3R5bGVzfSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHtjb250ZW50OiByWzJdLndpZGdldHMsIHN0eWxlczogclsyXS5zdHlsZXN9LFxuICAgICAgICAgICAgZm9vdGVyOiB7Y29udGVudDogclszXS53aWRnZXRzLCBzdHlsZXM6IHJbM10uc3R5bGVzfSxcbiAgICAgICAgICAgIHN0eWxlczogcls0XVxuICAgICAgICAgIH0gYXMgQWpmUmVwb3J0O1xuXG4gICAgICAgICAgdGhpcy5zZXRTYXZlUmVwb3J0KG9iaik7XG4gICAgICAgICAgdGhpcy5fc2F2ZWRSZXBvcnRVcGRhdGUubmV4dChybyk7XG4gICAgICAgICAgdGhpcy5wdXNoSnNvblN0YWNrKEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiAgZnVuY3Rpb25zXG4gICAqXG4gICAqL1xuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogcmVtb3ZlIEFqZk5vZGVHcm91cCwgQWpmU2xpZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTdHJpbmdGaWVsZCBmcm9tIGFqZm5vZGUgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG5vZGVzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZmlsdGVyTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICAgIG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlIHx8XG4gICAgICAgICAgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkICYmXG4gICAgICAgICAgIChub2RlIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TdHJpbmcpKSB7XG4gICAgICAgIG5vZGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXM7XG4gIH1cblxuICBwYXJzZUNvbG9yKGNzc1N0eWxlczogYW55LCBjb2xvcnM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3Qgc3R5bGVLZXlzID0gWydiYWNrZ3JvdW5kLWNvbG9yJywgJ2JhY2tncm91bmRDb2xvcicsICdjb2xvciddO1xuICAgIHN0eWxlS2V5cy5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNzc1N0eWxlc1trXSAmJlxuICAgICAgICBjb2xvcnMuaW5kZXhPZihjc3NTdHlsZXNba10pID09IC0xXG4gICAgICApIHtcbiAgICAgICAgY29sb3JzLnB1c2goY3NzU3R5bGVzW2tdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxGb3Jtc1ZhcmlhYmxlcyhmb3JtczogQWpmRm9ybVtdKSB7XG4gICAgbGV0IHZhcmlhYmxlczogQWpmRm9ybVZhcmlhYmxlc1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyaWFibGVzW2ldID0geyBub2RlczogW10sIGxhYmVsczogW10sIG5hbWVzOiBbXSwgdHlwZXM6IFtdIH07XG5cbiAgICAgIGlmIChmb3Jtc1tpXS5ub2RlcyAhPSBudWxsICYmIGZvcm1zW2ldLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyaWFibGVzW2ldLm5vZGVzID0gdGhpcy5maWx0ZXJOb2RlcyhmbGF0dGVuTm9kZXMoZm9ybXNbaV0ubm9kZXMpKTtcbiAgICAgIH1cbiAgICAgIHZhcmlhYmxlc1tpXS5sYWJlbHMgPSB0aGlzLmV4dHJhY3RMYWJlbHNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLm5hbWVzID0gdGhpcy5leHRyYWN0TmFtZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuICAgICAgdmFyaWFibGVzW2ldLnR5cGVzID0gdGhpcy5leHRyYWN0VHlwZXNOb2Rlcyh2YXJpYWJsZXNbaV0ubm9kZXMpO1xuXG4gICAgfVxuICAgIHJldHVybiB2YXJpYWJsZXM7XG4gIH1cbiAgLyoqXG4gICAqIHV0aWxzOlxuICAgKiAgdGhlIG9iaiByZXR1cm5lZCBjb250YWlucyB0aGUgbGFiZWwgZmllbGQgb2YgYWpmTm9kZVxuICAgKiBAcGFyYW0gbm9kZXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBleHRyYWN0TGFiZWxzTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IGFueSB7XG4gICAgbGV0IG9iajogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmoucHVzaChub2Rlc1tpXS5sYWJlbCk7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBleHRyYWN0TmFtZXNOb2Rlcyhub2RlczogQWpmTm9kZVtdKTogYW55IHtcbiAgICBsZXQgb2JqOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iai5wdXNoKG5vZGVzW2ldLm5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGV4dHJhY3RUeXBlc05vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBhbnkge1xuICAgIGxldCBvYmo6IEFqZkZpZWxkVHlwZVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHA6IEFqZkZpZWxkID0gPEFqZkZpZWxkPm5vZGVzW2ldO1xuICAgICAgb2JqLnB1c2gocC5maWVsZFR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgc2V0T3JpZ2luKG9yaWdpbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb3JpZ2luVXBkYXRlLm5leHQob3JpZ2luKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsczpcbiAgICogVGhpcyBtZXRob2Qgcm91bmQgdGhlIHZhbHVlIHRvIHRoZSBkZWNpbWFsIHBvc2l0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcGFyYW0gZGVjaW1hbHBvc2l0aW9uc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJvdW5kVG8odmFsdWU6IG51bWJlciwgZGVjaW1hbFBvc2l0aW9uczogbnVtYmVyKSB7XG4gICAgbGV0IGkgPSB2YWx1ZSAqIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcblxuICAgIGkgPSBNYXRoLmZsb29yKGkpO1xuXG4gICAgcmV0dXJuIGkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogdXRpbHM6XG4gICAqIFRoaXMgdmFsaWRhdG9yIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgaXNOdW1iZXIodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXlxcZCsoXFwuXFxkKyk/Ly50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIGlzTnVtYmVyQXJyYXkodmFsdWU6IGFueVtdKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLmlzTnVtYmVyKHZhbHVlW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfb25EcmFnZ2VkIE9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uRHJhZ2dlZCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkRyYWdnZWQ7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9vbk92ZXIgT2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgb25PdmVyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uT3ZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX2ZpeGVkWm9vbSBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmaXhlZFpvb20oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkWm9vbTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgY2hhbmdlIHN0YXR1cyBvZiBfZml4ZWRab29tIGluIHRydWVcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBmaXhlZFpvb21JbigpOiB2b2lkIHtcbiAgICB0aGlzLl9maXhlZFpvb21VcGRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgY2hhbmdlIHN0YXR1cyBvZiBfZml4ZWRab29tIGluIGZhbHNlXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRab29tT3V0KCk6IHZvaWQge1xuICAgIHRoaXMuX2ZpeGVkWm9vbVVwZGF0ZS5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX29uRHJhZ0VudGVyIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IG9uRHJhZ0VudGVyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX29uRHJhZ0VudGVyO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ0VudGVyIHdpdGggIHNlY3Rpb24oaGVhZGVyLGNvbnRlbnQsZm9vdGVyKSBhbmQgaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnRW50ZXIoYXJyYXk6IHN0cmluZywgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ0VudGVyVXBkYXRlLm5leHQoeyBhcnJheSwgaW5kZXggfSk7XG4gIH1cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25kcmFnZ2VkIHdpdGggdHJ1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGRyYWdTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uRHJhZ2dlZFVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqICB1cGRhdGUgX29uRHJhZ2dlZCB3aXRoIGZhbHNlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cblxuICBkcmFnRW5kZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnZ2VkVXBkYXRlLm5leHQoZmFsc2UpO1xuICB9XG5cblxuICAvKipcbiAgICogIHVwZGF0ZSBfb25PdmVyIHdpdGggdHJ1ZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJTdGFydGVkKCk6IHZvaWQge1xuICAgIHRoaXMuX29uT3ZlclVwZGF0ZS5uZXh0KHRydWUpO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIF9vbk92ZXIgd2l0aCBmYWxzZVxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIG92ZXJFbmRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vbk92ZXJVcGRhdGUubmV4dChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogIHVwZGF0ZSBfb25EcmFnZ2VkIHdpdGggZmFsc2VcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBkcmFnTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fb25EcmFnRW50ZXJVcGRhdGUubmV4dCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydCgpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGVtaXQgc2F2ZSByZXBvcnQgZXZlbnRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzYXZlUmVwb3J0KCkge1xuICAgIGlmICh0aGlzLl9zYXZlUmVwb3J0RXZlbnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlSW1hZ2VGb3JtdWxhKGZvcm11bGE6IEFqZkZvcm11bGEpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICB3LmZsYWcgPSBmb3JtdWxhO1xuICAgICAgdy5pY29uID0gZm9ybXVsYTtcbiAgICAgIHJldHVybiB3O1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZUZvcm11bGFUb0h0bWwoaHRtbEZvcm11bGE6IHN0cmluZywgcmVmZXJlbmNlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAnZm9ybXVsYSc6IGh0bWxGb3JtdWxhLFxuICAgICAgICAncmVmZXJlbmNlJzogcmVmZXJlbmNlXG4gICAgICB9O1xuICAgICAgdGhpcy5fc2F2ZUZvcm11bGFUT0h0bWwuZW1pdChvYmopO1xuICAgIH1cbiAgfVxuXG4gIHNldEVtcHR5Q29udGVudCh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9lbXB0eUNvbnRlbnQubmV4dCh2YWwpO1xuICB9XG5cblxuICBwdXNoSnNvblN0YWNrKGpzb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjdXJyZW50U3RhY2sgPSB0aGlzLl9qc29uU3RhY2suZ2V0VmFsdWUoKTtcblxuICAgIGlmIChjdXJyZW50U3RhY2suaW5kZXhPZihqc29uKSA9PT0gLTEgJiYganNvbiAhPT0gdGhpcy5fbGFzdERlbGV0ZWRKc29uKSB7XG4gICAgICBjdXJyZW50U3RhY2sucHVzaChqc29uKTtcbiAgICB9XG5cbiAgICB0aGlzLl9qc29uU3RhY2submV4dChjdXJyZW50U3RhY2spO1xuICB9XG5cbiAgcG9wSnNvblN0YWNrKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IGVtcHR5SnNvbiA9XG4gICAgICAne1wiaGVhZGVyXCI6e1wiY29udGVudFwiOltdLFwic3R5bGVzXCI6e319LCcgK1xuICAgICAgJ1wiY29udGVudFwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcIicgK1xuICAgICAgJ2Zvb3RlclwiOntcImNvbnRlbnRcIjpbXSxcInN0eWxlc1wiOnt9fSxcInN0eWxlc1wiOnt9fSc7XG4gICAgbGV0IGN1cnJlbnRTdGFjayA9IHRoaXMuX2pzb25TdGFjay5nZXRWYWx1ZSgpO1xuICAgIGN1cnJlbnRTdGFjay5wb3AoKTtcbiAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSBjdXJyZW50U3RhY2sucG9wKCk7XG5cbiAgICBpZiAoY3VycmVudFN0YWNrLmxlbmd0aCA8PSAwKSB7XG4gICAgICB0aGlzLl9sYXN0RGVsZXRlZEpzb24gPSAnJztcbiAgICAgIHRoaXMuX2pzb25TdGFjay5uZXh0KFtdKTtcbiAgICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KHRydWUpO1xuICAgICAgcmV0dXJuIGVtcHR5SnNvbjtcbiAgICB9XG4gICAgdGhpcy5fanNvblN0YWNrLm5leHQoY3VycmVudFN0YWNrKTtcblxuICAgIHJldHVybiB0aGlzLl9sYXN0RGVsZXRlZEpzb247XG4gIH1cblxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIGVtaXR0ZXJcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbHVtbldpZHRoQ2hhbmdlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5XaWR0aENoYW5nZWRFbWl0dGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBfY3VzdG9tV2lkZ2V0cyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjdXN0b21XaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmQ3VzdG9tV2lkZ2V0W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VzdG9tV2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGhlYWRlciB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGhlYWRlcldpZGdldHMoKTogT2JzZXJ2YWJsZTxBamZXaWRnZXRzQ29udGFpbmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hlYWRlcldpZGdldHM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBoZWFkZXIgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBoZWFkZXJTdHlsZXMoKTogT2JzZXJ2YWJsZTxBamZTdHlsZXM+IHtcbiAgICByZXR1cm4gdGhpcy5faGVhZGVyU3R5bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgQ29udGVudCB3aWRnZXRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbnRlbnRXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50V2lkZ2V0cztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbnRlbnQgc3R5bGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBjb250ZW50U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTdHlsZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmb290ZXIgd2lkZ2V0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb290ZXJXaWRnZXRzKCk6IE9ic2VydmFibGU8QWpmV2lkZ2V0c0NvbnRhaW5lcj4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJXaWRnZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZm9vdGVyIHN0eWxlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9vdGVyU3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvb3RlclN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbG9ycyBvZiByZXBvcnRcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGNvbG9ycygpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG5cbiAgZ2V0IGVtcHR5Q29udGVudCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZW1wdHlDb250ZW50O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqIEBwYXJhbSBuZXdXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICB1cGRhdGVBcnJheVdpZGdldHModHlwZTogc3RyaW5nLCBuZXdXaWRnZXQ6IEFqZldpZGdldHNDb250YWluZXIpIHtcbiAgICBpZiAoKHR5cGUgIT09ICdoZWFkZXInKSAmJiAodHlwZSAhPT0gJ2NvbnRlbnQnKSAmJiAodHlwZSAhPT0gJ2Zvb3RlcicpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZSAnICsgdHlwZSk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZXNbdHlwZV0ubmV4dCgoX3dpZGdldHM6IEFqZldpZGdldHNDb250YWluZXIpOiBBamZXaWRnZXRzQ29udGFpbmVyID0+IHtcbiAgICAgIHJldHVybiBuZXdXaWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9mb3Jtc1ZhcmlhYmxlcyBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3Jtc1ZhcmlhYmxlcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mb3Jtc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGdldCBjb25kaXRpb25OYW1lcygpOiBPYnNlcnZhYmxlPEFqZkZvcm1WYXJpYWJsZXNbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25kaXRpb25OYW1lcztcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgY3VycmVudFdpZGdldCgpOiBPYnNlcnZhYmxlPEFqZldpZGdldHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRXaWRnZXQ7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgVXBkYXRlIF9jdXJyZW50V2lkZ2V0VXBkYXRlIHdpdGggbmV3V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgdXBkYXRlQ3VycmVudFdpZGdldChuZXdXaWRnZXQ6IEFqZldpZGdldHxudWxsKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KChfd2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIHRoaXMuX3NhdmVSZXBvcnRFdmVudC5lbWl0KCk7XG4gICAgICByZXR1cm4gbmV3V2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmVwb3J0XG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBnZXRTYXZlUmVwb3J0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVSZXBvcnQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IF9qc29uU2F2ZWRSZXBvcnQgb2Jlc2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydFNhdmVkKCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVkUmVwb3J0O1xuICB9XG5cblxuICAvKipcbiAgICogZ2V0IF9yZXBvcnRTdHlsZXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgcmVwb3J0U3R5bGVzKCk6IE9ic2VydmFibGU8QWpmU3R5bGVzPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydFN0eWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgX3JlcG9ydEZvcm1zIG9ic2VydmFibGVcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IHJlcG9ydEZvcm1zKCk6IE9ic2VydmFibGU8QWpmRm9ybVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydEZvcm1zO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgX29yaWdpbiBPYnNlcnZhYmxlXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBvcmlnaW4oKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFzc2lnbnMgdGhlIG5ldyB3aWR0aCB0byB0aGUgaWR4IGNvbHVtblxuICAgKiBhbmQgcmVjYWxjdWxhdGVzIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgb2YgdGhlIGxheW91dC5cbiAgICogVGhlIHJhbmdlIHZhbHVlIGFyZSBmcm9tIDAsMSB0byAxLlxuICAgKlxuICAgKiBSVUxFUzpcbiAgICogVGhlIG1pbiB2YWx1ZSBmb3IgY29sdW1uIGlzIDAsMS5cbiAgICogVGhlIHN1bSBvZiBhbGwgY29sdW1ucyB3aWR0aCBpcyBhbHdheXMgMS5cbiAgICogVGhlIG1ldGhvZCByb3VuZCB0aGUgdmFsdWVzLlxuICAgKiBJZiBpcyBwcmVzZW50IG9ubHkgb25lIGNvbHVtbiB0aGUgd2lkdGggaXMgYWx3YXlzIDEuXG4gICAqXG4gICAqIFdoZW4gdGhlIG5ldyB2YWx1ZSBgPmAgb2xkIHZhbHVlOlxuICAgKiB0aGUgd2lkdGggb2YgdGhlIHJlbWFpbmluZyBjb2x1bW5zIGRlY3JlYXNlcy5cbiAgICogV2hlbiB0aGUgbmV3IHZhbHVlIGA8YCBvbGQgdmFsdWU6XG4gICAqIHRoZSB3aWR0aCBvZiB0aGUgcmVtYWluaW5nIGNvbHVtbnMgaW5jcmVhc2VzLlxuICAgKlxuICAgKiBXaGVuIHZhbHVlcyDigIvigIthcmUgcGVyaW9kaWMsIHJvdW5kaW5nIGFzc2lnbnMgdGhlIGdhcCB0byB0aGUgY3VycmVudCB2YWx1ZS5cbiAgICogRm9yIGV4YW1wbGU6IDMgY29sdW1ucyB3aXRoIDAsMzMgYmVsaWV2ZSAxIGNvbHVtbiAwLDM0IGFuZCAyIGNvbHVtbnMgMCwzMy5cbiAgICpcbiAgICogQHBhcmFtIG5ld1ZhbHVlXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBpbnN0YW50Q29sdW1uVmFsdWUobmV3VmFsdWU6IG51bWJlciwgaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgIH1cbiAgICAgIGxldCBteU9iaiA9IDxBamZMYXlvdXRXaWRnZXQ+d2lkZ2V0O1xuXG4gICAgICBsZXQgc2l6ZSA9IG15T2JqLmNvbHVtbnMubGVuZ3RoO1xuXG4gICAgICBsZXQgc3ByZWFkVmFsdWUgPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGxldCBpZHhGaXJzdE5vT2JqID0gLTE7XG5cbiAgICAgIGxldCBhZGQgPSBmYWxzZTtcbiAgICAgIGxldCBmb3VuZEZpcnN0Tm9PYmogPSBmYWxzZTtcblxuICAgICAgbGV0IHJlMSA9IG5ldyBSZWdFeHAoJyheWzBdXFwuXFxbMS05XVswLTldJCknKTtcbiAgICAgIGxldCByZTIgPSBuZXcgUmVnRXhwKCcoXlswXVxcLlxcWzEtOV0kKScpO1xuICAgICAgbGV0IHJlMyA9IG5ldyBSZWdFeHAoJ15bMV0kJyk7XG5cbiAgICAgIGxldCBvbGRWYWx1ZSA9IG15T2JqLmNvbHVtbnNbaWR4XTtcblxuICAgICAgbmV3VmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKG5ld1ZhbHVlLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaWR4XSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tqXSA9PT0gLTEpIHtcbiAgICAgICAgICBvYmpOdW0rKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob2xkVmFsdWUgPT0gLTEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICAgIG9iak51bS0tO1xuICAgICAgICBuZXdWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChzaXplIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDAuMTtcbiAgICAgIH0gZWxzZSBpZiAob2xkVmFsdWUgPCAwLjEpIHtcbiAgICAgICAgb2xkVmFsdWUgPSAwLjE7XG4gICAgICB9XG5cblxuICAgICAgaWYgKG5ld1ZhbHVlICE9PSAtMSkge1xuXG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbMF0gPSAxO1xuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSA8IDAuMSkge1xuICAgICAgICAgIG5ld1ZhbHVlID0gMC4xO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlICsgMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSA+IDEpIHtcbiAgICAgICAgICBuZXdWYWx1ZSA9IDEgLSAoMC4xICogKHNpemUgLSBvYmpOdW0gLSAxKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkgJiYgKG9sZFZhbHVlID09PSAwLjEpKSB7XG4gICAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgcmV0dXJuIG15T2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9sZFZhbHVlID4gbmV3VmFsdWUpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlIC0gbmV3VmFsdWUpIC8gKHNpemUgLSBvYmpOdW0gLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhZGQgPSBmYWxzZTtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IChuZXdWYWx1ZSAtIG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzcHJlYWRWYWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3ByZWFkVmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICAgIGlmIChzcHJlYWRWYWx1ZSA8IDAuMDEpIHtcbiAgICAgICAgICBzcHJlYWRWYWx1ZSA9IDAuMTtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgc3ByZWFkVmFsdWUgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwcmVhZFZhbHVlID0gKG9sZFZhbHVlKSAvIChzaXplIC0gb2JqTnVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSAhPT0gLTEpIHtcblxuICAgICAgICAgIGlmICgoaSA9PSBpZHgpKSB7XG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoYWRkKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkVmFsdWU7XG4gICAgICAgICAgICAgIGlmICgobXlPYmouY29sdW1uc1tpXSA+IDAuOSkgJiYgKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gb2JqTnVtICE9IDEpKSB7XG4gICAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSA9IDAuOTA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1uc1tpXSAtPSBzcHJlYWRWYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gPCAwLjEpIHtcbiAgICAgICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gMC4xMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBteU9iai5jb2x1bW5zW2ldID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2ldLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICAgIHN1bSArPSBteU9iai5jb2x1bW5zW2ldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oc3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgICAgIGlmIChmb3VuZEZpcnN0Tm9PYmogPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlkeEZpcnN0Tm9PYmogPSBpO1xuICAgICAgICAgICAgZm91bmRGaXJzdE5vT2JqID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSAtMSkge1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSAtMTtcbiAgICAgICAgaWYgKGZvdW5kRmlyc3ROb09iaikge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaWR4Rmlyc3ROb09ial0gKz0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbygxIC0gc3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqLmNvbHVtbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG15T2JqLmNvbHVtbnNbal0gIT09IC0xICYmXG4gICAgICAgICAgIXJlMS50ZXN0KFN0cmluZyhteU9iai5jb2x1bW5zW2pdKSkgJiZcbiAgICAgICAgICAhcmUyLnRlc3QoU3RyaW5nKG15T2JqLmNvbHVtbnNbal0pKSAmJlxuICAgICAgICAgICFyZTMudGVzdChTdHJpbmcobXlPYmouY29sdW1uc1tqXSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKDAuMTAsIGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNvbHVtbldpZHRoQ2hhbmdlZEVtaXR0ZXIuZW1pdCgpO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGltYWdlVXJsIG9uIHRoZSBjdXJyZW50IEFqZkltYWdlV2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gaW1hZ2VVcmxcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRJbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai51cmwgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgXCIke2ltYWdlVXJsfVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7IGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZyB9KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5pY29uID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHtpY29ufVwiYH0pO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0RmxhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgICBteU9iai5mbGFnID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFwiJHt2YWx1ZX1cImB9KTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVDb25kaXRpb24oY29uZGl0aW9uVGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHdpZGdldC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgICAgd2lkZ2V0LnZpc2liaWxpdHkuY29uZGl0aW9uID0gY29uZGl0aW9uVGV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlQ2hhcnRGb3JtdWxhKFxuICAgIF9sYWJlbDogc3RyaW5nLFxuICAgIF9sZXZlbDogbnVtYmVyLFxuICAgIF9tYWluSW5kZXg6IG51bWJlcixcbiAgICBfaW5kZXg6IG51bWJlcixcbiAgICBmb3JtdWxhVGV4dDogc3RyaW5nLFxuICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldCAhPSBudWxsICYmIHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IG9iajogYW55O1xuXG4gICAgICAgIGZvcm11bGEuZm9ybXVsYSA9IGZvcm11bGFUZXh0O1xuICAgICAgICBhZ2dyZWdhdGlvbi5hZ2dyZWdhdGlvbiA9IGFnZ3JlZ2F0aW9uVHlwZTtcblxuICAgICAgICAvLyBvYmogPSB7XG4gICAgICAgIC8vICAgJ2Zvcm11bGEnOiBmb3JtdWxhLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdhZ2dyZWdhdGlvbic6IGFnZ3JlZ2F0aW9uLnRvSnNvbigpLFxuICAgICAgICAvLyAgICdsYWJlbCc6IGxhYmVsXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgLy8gZGF0YXNldCA9IEFqZkRhdGFzZXQuZnJvbUpzb24ob2JqKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJvdyB0aGF0IGNvbnRhaW5zIG1haW4gZGF0YSBpcyBkZWZpbmVkXG4gICAgICAgIC8qIGlmICh3aWRnZXQuZGF0YXNldFswXSA9PSBudWxsKSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsZXZlbCA9PSAwICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbMF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PSAxICYmIG1haW5JbmRleCA9PSAtMSAmJiBpbmRleCA9PSAtMSkge1xuXG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbd2lkZ2V0LmRhdGFzZXQubGVuZ3RoXSA9IFtdO1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aCAtIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleCArIDFdLnB1c2goZGF0YXNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICB9ICovXG5cbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlVGFibGVGb3JtdWxhKFxuICAgIF9sYWJlbDogc3RyaW5nLFxuICAgIGFnZ3JlZ2F0aW9uVHlwZTogbnVtYmVyLFxuICAgIGZvcm11bGFUZXh0OiBzdHJpbmcsXG4gICAgX21haW5JbmRleDogbnVtYmVyLFxuICAgIF9pbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB3aWRnZXQgPSB3IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgICAgaWYgKHdpZGdldC5kYXRhc2V0ICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGZvcm11bGE6IEFqZkZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHt9KTtcbiAgICAgICAgbGV0IGFnZ3JlZ2F0aW9uOiBBamZBZ2dyZWdhdGlvbiA9IGNyZWF0ZUFnZ3JlZ2F0aW9uKHt9KTtcbiAgICAgICAgLy8gbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXQgPSBuZXcgQWpmRGF0YXNldCgpO1xuICAgICAgICAvLyBsZXQgcm93RGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gICAgICAgIC8vIGxldCBvYmo6IGFueTtcblxuICAgICAgICBmb3JtdWxhLmZvcm11bGEgPSBmb3JtdWxhVGV4dDtcbiAgICAgICAgYWdncmVnYXRpb24uYWdncmVnYXRpb24gPSBhZ2dyZWdhdGlvblR5cGU7XG5cbiAgICAgICAgLy8gb2JqID0ge1xuICAgICAgICAvLyAgICdmb3JtdWxhJzogZm9ybXVsYS50b0pzb24oKSxcbiAgICAgICAgLy8gICAnYWdncmVnYXRpb24nOiBhZ2dyZWdhdGlvbi50b0pzb24oKSxcbiAgICAgICAgLy8gICAnbGFiZWwnOiBsYWJlbFxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIC8vIGRhdGFzZXQgPSBBamZEYXRhc2V0LmZyb21Kc29uKG9iaik7XG4gICAgICAgIC8qIGlmIChtYWluSW5kZXggPT09IC0gMSkge1xuICAgICAgICAgIHdpZGdldC5kYXRhc2V0W3dpZGdldC5kYXRhc2V0Lmxlbmd0aF0gPSBbXTtcbiAgICAgICAgICB3aWRnZXQuZGF0YXNldFt3aWRnZXQuZGF0YXNldC5sZW5ndGggLSAxXS5wdXNoKGRhdGFzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHdpZGdldC5kYXRhc2V0W21haW5JbmRleF0ucHVzaChkYXRhc2V0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkZ2V0LmRhdGFzZXRbbWFpbkluZGV4XS5zcGxpY2UoaW5kZXgsIDEsIGRhdGFzZXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAqL1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVRhYmxlTWFpbkRhdGEoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnZGF0YXNldCcsIGluZGV4KTtcbiAgfVxuXG4gIHJlbW92ZURhdGEoX21haW5JbmRleDogbnVtYmVyLCBfaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZEYXRhV2lkZ2V0PndpZGdldDtcblxuICAgICAgLyogaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSW5kZXgsIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXlPYmouZGF0YXNldFttYWluSW5kZXhdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9ICovXG5cbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgdHlwZSBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50V2lkZ2V0UHJvcGVydHkoJ3R5cGUnLCB0eXBlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgIGlkeCBlbGVtZW50IG9mIHhMYWJlbHMgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHJlbW92ZU1haW5EYXRhKF9pZHg6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGxldCBteU9iaiA9IDxBamZDaGFydFdpZGdldD53aWRnZXQ7XG4gICAgICAvLyBteU9iai5kYXRhc2V0WzBdLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVSZWxhdGVkRGF0YShfbWFpbklkeDogbnVtYmVyLCBfaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+d2lkZ2V0O1xuICAgICAgLyogaWYgKGlkeCA9PSAtMSkge1xuICAgICAgICBteU9iai5kYXRhc2V0LnNwbGljZShtYWluSWR4ICsgMSwgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBteU9iai5kYXRhc2V0W21haW5JZHggKyAxXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH0gKi9cblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogdXBkYXRlIGJhY2tncm91bmRDb2xvciBmaWVsZCBvZiBBamZDaGFydFdpZGdldCBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sb3JzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgY29sb3JzKTtcbiAgfVxuXG4gIGFkZENoYXJ0QmFja2dyb3VuZENvbG9yKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hZGRUb0N1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KCdiYWNrZ3JvdW5kQ29sb3InLCBjb2xvcik7XG4gIH1cblxuICByZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYmFja2dyb3VuZENvbG9yJywgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgYm9yZGVyQ29sb3IgZmllbGQgb2YgQWpmQ2hhcnRXaWRnZXQgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbG9yc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IoY29sb3JzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBjb2xvcnMpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJXaWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2V0Q3VycmVudFdpZGdldFByb3BlcnR5KCdib3JkZXJXaWR0aCcsIHZhbHVlKTtcbiAgfVxuXG4gIGFkZENoYXJ0Qm9yZGVyQ29sb3IoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkoJ2JvcmRlckNvbG9yJywgY29sb3IpO1xuICB9XG5cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbW92ZUZyb21DdXJyZW50V2lkZ2V0QXJyYXlQcm9wZXJ0eSgnYm9yZGVyQ29sb3InLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHNldCB0aGUgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gcmVwb3J0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0KHJlcG9ydDogQWpmUmVwb3J0KTogdm9pZCB7XG4gICAgdGhpcy5fcmVwb3J0Lm5leHQocmVwb3J0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGV4cG9ydCByZXBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSByZXBvcnRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTYXZlUmVwb3J0KGpzb246IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVSZXBvcnQubmV4dChqc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXQgdGhlIGZvbnQgYXR0cmlidXRlIG9uIHRoZSBjdXJyZW50IEFqZldpZGdldC5cbiAgICpcbiAgICogVGhlcmUgaXMgYSBjaGVjayBvbiBmb250LXNpemUgYXR0cmlidXRlLFxuICAgKiBpZiBpcyBubyBzcGVjaWZpY2F0ZSB0aGUgdHlwZSBvZiBzaXplIGZvbnQgc2V0ICdwdCcgYXMgZGVmYXVsdC5cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICBsZXQgbXlPYmogPSA8QWpmVGV4dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGNvbnN0IHB4U3R5bGVzID0gW1xuICAgICAgICAnZm9udC1zaXplJywgJ2hlaWdodCcsICd3aWR0aCcsICdib3JkZXItd2lkdGgnLCAnYm9yZGVyLXJhZGl1cycsICdwYWRkaW5nJywgJ21hcmdpbidcbiAgICAgIF07XG4gICAgICBjb25zdCBpc1B4U3R5bGUgPSBweFN0eWxlcy5pbmRleE9mKGxhYmVsKSA+IC0xO1xuICAgICAgaWYgKGlzUHhTdHlsZSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpICYmIHRoaXMuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlICs9ICdweCc7XG4gICAgICB9IGVsc2UgaWYgKGlzUHhTdHlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICYmIHRoaXMuaXNOdW1iZXJBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBgJHt2YWx1ZS5qb2luKCdweCAnKX1weGA7XG4gICAgICB9XG5cbiAgICAgIG15T2JqLnN0eWxlc1tsYWJlbF0gPSB2YWx1ZTtcblxuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHVwZGF0ZSB0aGUgc3R5bGVzIG9mIG9yaWdpbiB3aWRnZXQgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG9yaWdpbiBjYW4gYmUgaGVhZGVyIGNvbnRlbnQgb3IgZm9vdGVyXG4gICAqIEBwYXJhbSBsYWJlbCBmb3IgZXhhbXBsZSBiYWNrZ3JvdW5kLWNvbG9yXG4gICAqIEBwYXJhbSB2YWx1ZSBmb3IgZXhhbXBsZSByZ2IoMjU1LDI1NSwyNTUsMSlcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRTZWN0aW9uU3R5bGVzKG9yaWdpbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKChvcmlnaW4gIT09ICdoZWFkZXInKSAmJiAob3JpZ2luICE9PSAnY29udGVudCcpICYmIChvcmlnaW4gIT09ICdmb290ZXInKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmNrbm93IG9yaWdpbiAnICsgb3JpZ2luKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVzW29yaWdpbl0ubmV4dCgod2lkZ2V0OiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICB3aWRnZXQuc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuXG4gICAgICB3aWRnZXQuc3R5bGVzID0gPEFqZlN0eWxlcz57Li4ud2lkZ2V0LnN0eWxlc307XG5cbiAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgc2V0IHRoZSBzdHlsZSBvZiB0aGUgd2hvbGUgcmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWwgZm9yIGV4YW1wbGUgYmFja2dyb3VuZC1jb2xvclxuICAgKiBAcGFyYW0gdmFsdWUgZm9yIGV4YW1wbGUgcmdiKDI1NSwyNTUsMjU1LDEpXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9yZXBvcnRTdHlsZXNVcGRhdGUubmV4dCgoc3R5bGVzOiBBamZTdHlsZXMpOiBBamZTdHlsZXMgPT4ge1xuICAgICAgaWYgKHN0eWxlcyA9PSBudWxsKSB7XG4gICAgICAgIHN0eWxlcyA9IHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVzW2xhYmVsXSA9IHZhbHVlO1xuICAgICAgICBzdHlsZXMgPSA8QWpmU3R5bGVzPnsuLi5zdHlsZXN9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0eWxlcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgdXBkYXRlIGZvcm1zXG4gICAqXG4gICAqIEBwYXJhbSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldFJlcG9ydEZvcm1zKGZvcm1zOiBBamZGb3JtW10pIHtcbiAgICB0aGlzLl9yZXBvcnRGb3Jtc1VwZGF0ZS5uZXh0KChfZm9ybTogQWpmRm9ybVtdKTogQWpmRm9ybVtdID0+IHtcbiAgICAgIHJldHVybiBmb3JtcyB8fCBbXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgY3VzdG9tV2lkZ2V0c1xuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkQ3VzdG9tV2lkZ2V0cyh3aWRnZXQ6IEFqZkN1c3RvbVdpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0cyA9IGN1c3RvbVdpZGdldHMgfHwgW107XG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCAmJiBwb3NpdGlvbiA+PSAwKSB7XG4gICAgICAgIGN1c3RvbVdpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VzdG9tV2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VzdG9tV2lkZ2V0cztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXNldCBjdXN0b21XaWRnZXRzXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICByZXNldEN1c3RvbVdpZGdldHMoKSB7XG4gICAgdGhpcy5fY3VzdG9tV2lkZ2V0c1VwZGF0ZS5uZXh0KChjdXN0b21XaWRnZXRzOiBBamZDdXN0b21XaWRnZXRbXSk6IEFqZkN1c3RvbVdpZGdldFtdID0+IHtcbiAgICAgIGN1c3RvbVdpZGdldHMubGVuZ3RoID0gMDtcbiAgICAgIHJldHVybiBjdXN0b21XaWRnZXRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBsYWJlbCBvZiB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNoYW5nZUxhYmVsQ3VzdG9tV2lkZ2V0KGxhYmVsOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXN0b21XaWRnZXRzVXBkYXRlLm5leHQoKGN1c3RvbVdpZGdldHM6IEFqZkN1c3RvbVdpZGdldFtdKTogQWpmQ3VzdG9tV2lkZ2V0W10gPT4ge1xuICAgICAgY3VzdG9tV2lkZ2V0c1twb3NpdGlvbl0udHlwZSA9IGxhYmVsO1xuICAgICAgcmV0dXJuIGN1c3RvbVdpZGdldHM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIEFqZldpZGdldCBvbiBfaGVhZGVyV2lkZ2V0c1VwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkZ2V0XG4gICAqIEBwYXJhbSBbcG9zaXRpb25dXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgYWRkSGVhZGVyV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2hlYWRlcldpZGdldHNVcGRhdGUsIHdpZGdldCwgcG9zaXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBBamZXaWRnZXQgb24gX2NvbnRlbnRXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb250ZW50V2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHRoaXMuX2FkZFdpZGdldFRvQ29udGFpbmVyKHRoaXMuX2NvbnRlbnRXaWRnZXRzVXBkYXRlLCB3aWRnZXQsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gQWpmV2lkZ2V0IG9uIF9mb290ZXJXaWRnZXRzVXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWRnZXRcbiAgICogQHBhcmFtIFtwb3NpdGlvbl1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRmb290ZXJXaWRnZXQod2lkZ2V0OiBBamZXaWRnZXQsIHBvc2l0aW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWRkV2lkZ2V0VG9Db250YWluZXIodGhpcy5fZm9vdGVyV2lkZ2V0c1VwZGF0ZSwgd2lkZ2V0LCBwb3NpdGlvbik7XG4gIH1cblxuICB1bmZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICB9XG4gICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aDtcbiAgICAgIGxldCBjaGVja1N1bSA9IDA7XG4gICAgICBsZXQgb2JqTnVtID0gMDtcbiAgICAgIGxldCB2YWx1ZSA9IDE7XG4gICAgICBsZXQgc3ByZWFkVmFsdWU6IGFueTtcbiAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSA9IDA7XG5cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyBqKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbal0gPT09IC0xKSB7XG4gICAgICAgICAgb2JqTnVtKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5yb3VuZFRvKDEgLyAobnVtIC0gb2JqTnVtKSwgMikudG9GaXhlZCgyKSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgaWYgKG15T2JqLmNvbHVtbnNbaV0gIT09IC0gMSkge1xuICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0gKyB2YWx1ZSwgMikudG9GaXhlZCgyKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgaWYgKGNoZWNrU3VtID4gMSkge1xuICAgICAgICBzcHJlYWRWYWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5yb3VuZFRvKCgoY2hlY2tTdW0gLSAxKSAlIDEpLCAyKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdIC09IHNwcmVhZFZhbHVlO1xuICAgICAgICBteU9iai5jb2x1bW5zW2lkeF0gPSB0aGlzLnJvdW5kVG8obXlPYmouY29sdW1uc1tpZHhdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIG15T2JqLmNvbHVtbnNbaWR4XSArPSAoMSAtIChjaGVja1N1bSAlIDEpKTtcbiAgICAgICAgbXlPYmouY29sdW1uc1tpZHhdID0gTnVtYmVyKHRoaXMucm91bmRUbyhteU9iai5jb2x1bW5zW2lkeF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbXlPYmo7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbHVtbiBvbiB0aGUgY3VycmVudCBBamZMYXlvdXRXaWRnZXQuXG4gICAqXG4gICAqIFdoZW4gYWRkaW5nIGEgY29sdW1uIHRoZSB3aWR0aCBvZiB0aGUgb3RoZXIgY29sdW1ucyBpcyByZWNhbGN1bGF0ZWRcbiAgICogYnkgZGl2aWRpbmcgaXQgYnkgdGhlIG51bWJlciBvZiBjb2x1bW5cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRDb2x1bW4oKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG4gICAgICBsZXQgdGVtcE9iajogbnVtYmVyW10gPSBbXTtcbiAgICAgIGxldCBudW0gPSBteU9iai5jb2x1bW5zLmxlbmd0aCArIDE7XG4gICAgICBsZXQgY2hlY2tTdW0gPSAwO1xuICAgICAgbGV0IG9iak51bSA9IDA7XG4gICAgICBsZXQgdmFsdWUgPSAxO1xuICAgICAgbGV0IHRtcFZhbHVlOiBhbnk7XG5cbiAgICAgIGlmIChudW0gPiAxMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2V4Y2VlZCBtYXggY29sdW1ucycpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bTsgaisrKSB7XG4gICAgICAgIGlmIChteU9iai5jb2x1bW5zW2pdID09PSAtMSkge1xuICAgICAgICAgIG9iak51bSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IE51bWJlcih0aGlzLnJvdW5kVG8oMSAvIChudW0gLSBvYmpOdW0pLCAyKS50b0ZpeGVkKDIpKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpXSA9PT0gLTEpIHtcbiAgICAgICAgICB0ZW1wT2JqLnB1c2goLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlbXBPYmoucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgY2hlY2tTdW0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKGNoZWNrU3VtICsgdmFsdWUsIDIpLnRvRml4ZWQoMikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjaGVja1N1bSA9IE51bWJlcih0aGlzLnJvdW5kVG8oY2hlY2tTdW0sIDIpLnRvRml4ZWQoMikpO1xuXG4gICAgICBpZiAoY2hlY2tTdW0gPiAxKSB7XG4gICAgICAgIHRtcFZhbHVlID1cbiAgICAgICAgICBwYXJzZUZsb2F0KFxuICAgICAgICAgICAgdGhpcy5yb3VuZFRvKFxuICAgICAgICAgICAgICAoKGNoZWNrU3VtIC0gMSkgJSAxKSwgMlxuICAgICAgICAgICAgKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgdGVtcE9ialswXSAtPSB0bXBWYWx1ZTtcbiAgICAgICAgdGVtcE9ialswXSA9IHRoaXMucm91bmRUbyh0ZW1wT2JqWzBdLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tTdW0gPCAxKSB7XG4gICAgICAgIHRlbXBPYmpbMF0gKz0gKDEgLSAoY2hlY2tTdW0gJSAxKSk7XG4gICAgICAgIHRlbXBPYmpbMF0gPSBOdW1iZXIodGhpcy5yb3VuZFRvKHRlbXBPYmpbMF0sIDIpLnRvRml4ZWQoMikpO1xuICAgICAgfVxuXG4gICAgICBteU9iai5jb2x1bW5zID0gdGVtcE9iajtcblxuICAgICAgLy8gVE9ETzogQHRyaWsgd2hhdCdzIHZhbHVlPyE/XG4gICAgICBjb25zdCBjb2x1bW5PYmogPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiA3LFxuICAgICAgICAvLyB2YWx1ZTogbXlPYmouY29sdW1uc1tteU9iai5jb2x1bW5zLmxlbmd0aCAtIDFdLFxuICAgICAgfSk7XG5cbiAgICAgIG15T2JqLmNvbnRlbnQucHVzaChjb2x1bW5PYmopO1xuICAgICAgdGhpcy5fc2F2ZVJlcG9ydEV2ZW50LmVtaXQoKTtcbiAgICAgIHJldHVybiBteU9iajtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVdpZGdldFRvQ29sdW1uKGNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0LCBpbmRleDogbnVtYmVyKSB7XG4gICAgY29sdW1uLmNvbnRlbnQuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmUgYSB3aWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmUmVwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZVxuICAgKiB0aGUgcG9zaXRpb24gYXJyYXk6XG4gICAqXG4gICAqIGhlYWRlciAtYD5gIGhlYWRlcldpZGdldHNcbiAgICogY29udGVudCAtYD5gIGNvbnRlbnRXaWRnZXRzXG4gICAqIGZvb3RlciAtYD5gIGZvb3RlcldpZGdldHNcbiAgICogY29sdW1uIC1gPmAgY29sdW1uIG9mIGxheW91dFxuICAgKiBsYXlvdXRDb250ZW50IC1gPmAgY29udGVudCBvZiBsYXlvdXRcbiAgICogb2JqIC1gPmAgb2JqIG9mIGxheW91dFxuICAgKiBjdXN0b21XaWRnZXQgLWA+YCBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHggdGhlIHBvc2l0aW9uIGFycmF5XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgcmVtb3ZlKG5vZGU6IHN0cmluZywgaWR4OiBudW1iZXIpIHtcblxuICAgIHN3aXRjaCAobm9kZSkge1xuICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgdGhpcy5fdXBkYXRlc1tub2RlXS5uZXh0KCh3aWRnZXRzOiBBamZXaWRnZXRzQ29udGFpbmVyKTogQWpmV2lkZ2V0c0NvbnRhaW5lciA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigneW91IGNhbiBub3QgcmVtb3ZlIGZyb20gZW1wdHkgYXJyYXknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZGdldHMud2lkZ2V0c1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICAgICAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXlvdXQnOlxuICAgICAgICB0aGlzLl9jdXJyZW50V2lkZ2V0VXBkYXRlLm5leHQoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpOiBBamZXaWRnZXR8bnVsbCA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbXlPYmogPSB3aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuXG4gICAgICAgICAgaWYgKG15T2JqLmNvbHVtbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAobXlPYmouY29udGVudFswXSBhcyBBamZDb2x1bW5XaWRnZXQpLmNvbnRlbnQubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBjb250ZW50IGlzIHVuZGVmaW5lZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc3ByZWFkID0gbXlPYmouY29sdW1uc1tpZHhdIC8gKG15T2JqLmNvbHVtbnMubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBteU9iai5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIG15T2JqLmNvbHVtbnNbaV0gKz0gc3ByZWFkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbnN0YW50Q29sdW1uVmFsdWUobXlPYmouY29sdW1uc1swXSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBteU9iajtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29sdW1uJzpcbiAgICAgIGNhc2UgJ2xheW91dENvbnRlbnQnOlxuICAgICAgY2FzZSAndW5maXhlZENvbHVtbic6XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbXlPYmogPSA8QWpmTGF5b3V0V2lkZ2V0PndpZGdldDtcblxuICAgICAgICAgIGlmIChub2RlID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgbGV0IGNsbSA9IDxBamZDb2x1bW5XaWRnZXQ+d2lkZ2V0O1xuICAgICAgICAgICAgY2xtLmNvbnRlbnQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAnbGF5b3V0Q29udGVudCcpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBjb2x1bW4gbGVuZ3RoIGlzIDAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChteU9iai5jb250ZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NhbiBub3QgcmVtb3ZlIGFueSB3aWRnZXQgZnJvbSBlbXB0eSBjb250ZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobXlPYmouY29sdW1uc1tpZHhdICE9IG51bGwgJiYgbXlPYmouY29udGVudFtpZHhdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGlzIGNvbnRlbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlID09PSAndW5maXhlZENvbHVtbicpIHtcbiAgICAgICAgICAgIGlmIChteU9iai5jb2x1bW5zW2lkeF0gIT09IC0xKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIGNvbHVtbiBwb3NpdGlvbiB2YWx1ZSAgaXNudCAtMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51bmZpeGVkQ29sdW1uKGlkeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIChub2RlICE9PSAnb2JqJykge1xuICAgICAgICAgIC8vICAgbGV0IHNwcmVhZCA9IG15T2JqLmNvbHVtbnNbaWR4XSAvIChteU9iai5jb2x1bW5zLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIC8vICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIGlmIChteU9iai5jb2x1bW5zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAvLyAgICAgbXlPYmouY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXlPYmouY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vICAgICBteU9iai5jb2x1bW5zW2ldICs9IHNwcmVhZDtcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHRoaXMuaW5zdGFudENvbHVtblZhbHVlKG15T2JqLmNvbHVtbnNbMF0sIDApO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICByZXR1cm4gbXlPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2N1c3RvbVdpZGdldHMnOlxuICAgICAgICB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZXNbbm9kZV0ubmV4dCgod2lkZ2V0czogQWpmQ3VzdG9tV2lkZ2V0W10pOiBBamZDdXN0b21XaWRnZXRbXSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3lvdSBjYW4gbm90IHJlbW92ZSBmcm9tIGVtcHR5IGFycmF5Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3aWRnZXRzW2lkeF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpZGdldHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgcmV0dXJuIHdpZGdldHM7XG4gICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIG5vZGUgJyArIG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhZGQgYSBBamZXaWRnZXQgb24gdGhlIGN1cnJlbnQgQWpmTGF5b3V0V2lkZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0gbmV3V2lkZ2V0XG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBhZGRUb0NvbnRlbnQobmV3V2lkZ2V0OiBBamZXaWRnZXQsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbGV0IG15T2JqID0gPEFqZkxheW91dFdpZGdldD53aWRnZXQ7XG5cbiAgICAgIGlmIChteU9iai5jb250ZW50W2lkeF0gIT0gbnVsbCkge1xuICAgICAgICBteU9iai5jb250ZW50LnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgICAgbXlPYmouY29udGVudC5zcGxpY2UoaWR4LCAwLCBuZXdXaWRnZXQpO1xuICAgICAgcmV0dXJuIG15T2JqO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkVG9Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgcG9zaXRpb24/OiBudW1iZXIpIHtcbiAgICBpZiAoZXZlbnQuZHJhZ0RhdGEgJiYgZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbiAhPSBudWxsKSB7XG4gICAgICBsZXQgZnJvbUNvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUNvbHVtbjtcbiAgICAgIGxldCB3aWRnZXQ6IEFqZldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLndpZGdldDtcbiAgICAgIGxldCBmcm9tSW5kZXg6IG51bWJlciA9IGV2ZW50LmRyYWdEYXRhLmZyb21JbmRleDtcblxuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKHdpZGdldCk7XG5cbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRyYWdEYXRhICYmIGV2ZW50LmRyYWdEYXRhLmFycmF5RnJvbSkge1xuICAgICAgdGhpcy5yZW1vdmUoZXZlbnQuZHJhZ0RhdGEuYXJyYXlGcm9tLCBldmVudC5kcmFnRGF0YS5mcm9tSW5kZXgpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKGV2ZW50LmRyYWdEYXRhLndpZGdldCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5kcmFnRGF0YSAmJiBldmVudC5kcmFnRGF0YS5qc29uKSB7XG4gICAgICBsZXQgb2JqID0gSlNPTi5wYXJzZShldmVudC5kcmFnRGF0YS5qc29uKTtcbiAgICAgIGxldCBuZXdXaWRnZXQgPSBkZWVwQ29weShvYmopO1xuXG4gICAgICBpZiAocG9zaXRpb24gIT0gbnVsbCkge1xuICAgICAgICB0b0NvbHVtbi5jb250ZW50LnNwbGljZShwb3NpdGlvbiwgMCwgbmV3V2lkZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQucHVzaChuZXdXaWRnZXQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb2JqID0geyd3aWRnZXRUeXBlJzogQWpmV2lkZ2V0VHlwZVtldmVudC5kcmFnRGF0YV19O1xuICAgICAgbGV0IG5ld1dpZGdldCA9IGRlZXBDb3B5KG9iaik7XG5cbiAgICAgIGlmIChwb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRvQ29sdW1uLmNvbnRlbnQuc3BsaWNlKHBvc2l0aW9uLCAwLCBuZXdXaWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9Db2x1bW4uY29udGVudC5wdXNoKG5ld1dpZGdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoYW5nZVBvc2l0aW9uT25Db2x1bW4oZXZlbnQ6IGFueSwgdG9Db2x1bW46IEFqZkNvbHVtbldpZGdldCwgdG9JbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGZyb21Db2x1bW46IEFqZkNvbHVtbldpZGdldCA9IGV2ZW50LmRyYWdEYXRhLmZyb21Db2x1bW47XG4gICAgbGV0IGZyb21JbmRleDogbnVtYmVyID0gZXZlbnQuZHJhZ0RhdGEuZnJvbUluZGV4O1xuICAgIGxldCBmcm9tV2lkZ2V0OiBBamZXaWRnZXQgPSBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XTtcbiAgICBsZXQgdG9XaWRnZXQ6IEFqZldpZGdldCA9IGZyb21Db2x1bW4uY29udGVudFt0b0luZGV4XTtcblxuICAgIGlmIChmcm9tQ29sdW1uID09IHRvQ29sdW1uKSB7XG4gICAgICBmcm9tQ29sdW1uLmNvbnRlbnRbZnJvbUluZGV4XSA9IHRvV2lkZ2V0O1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50W3RvSW5kZXhdID0gZnJvbVdpZGdldDtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJvbUNvbHVtbi5jb250ZW50LnNwbGljZShmcm9tSW5kZXgsIDEpO1xuICAgICAgdG9Db2x1bW4uY29udGVudC5zcGxpY2UodG9JbmRleCwgMCwgZnJvbVdpZGdldCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFkZCB0aGUgb2JqIG9uIHRoZSBpZHggcG9zaXRpb24uXG4gICAqIE9iaiBoYXZlIGEgbm8gc3BlY2lmaWNhdGUgd2lkdGggYW5kIGlzIG5vdCBjYWxjdWxhdGUgYXMgY29sdW1uc1xuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmluc3RhbnRDb2x1bW5WYWx1ZSgtMSwgaWR4KTtcbiAgfVxuXG4gIGNoYW5nZUNvbHVtbihmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0KSB7XG4gICAgaWYgKHRvIDwgMCB8fCB0byA+PSBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGZyb20gPiBsYXlvdXRXaWRnZXQuY29udGVudC5sZW5ndGggLSAxICYmIHRvID4gZnJvbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmcm9tQ29sdW1uOiBBamZDb2x1bW5XaWRnZXQgPSA8QWpmQ29sdW1uV2lkZ2V0PmxheW91dFdpZGdldC5jb250ZW50W2Zyb21dO1xuICAgIGxldCBmcm9tQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW2Zyb21dO1xuICAgIGxldCB0b0NvbHVtbjogQWpmQ29sdW1uV2lkZ2V0ID0gPEFqZkNvbHVtbldpZGdldD5sYXlvdXRXaWRnZXQuY29udGVudFt0b107XG4gICAgbGV0IHRvQ29sdW1uVmFsdWU6IG51bWJlciA9IGxheW91dFdpZGdldC5jb2x1bW5zW3RvXTtcblxuICAgIGxheW91dFdpZGdldC5jb250ZW50W2Zyb21dID0gdG9Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbZnJvbV0gPSB0b0NvbHVtblZhbHVlO1xuICAgIGxheW91dFdpZGdldC5jb250ZW50W3RvXSA9IGZyb21Db2x1bW47XG4gICAgbGF5b3V0V2lkZ2V0LmNvbHVtbnNbdG9dID0gZnJvbUNvbHVtblZhbHVlO1xuXG4gICAgdGhpcy51cGRhdGVDdXJyZW50V2lkZ2V0KGxheW91dFdpZGdldCk7XG4gIH1cblxuICBhZGRDdXN0b21Db2xvcihjb2xvcjogc3RyaW5nKSB7XG5cbiAgICB0aGlzLl91cGRhdGVzWydjb2xvciddLm5leHQoKGNvbG9yczogc3RyaW5nW10pOiBzdHJpbmdbXSA9PiB7XG5cbiAgICAgIGlmIChjb2xvcnMuaW5kZXhPZihjb2xvcikgPCAwKSB7XG4gICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRXaWRnZXRUb0NvbnRhaW5lcihcbiAgICAgIHN1Ymo6IFN1YmplY3Q8QWpmV2lkZ2V0c09wZXJhdGlvbj4sIHdpZGdldDogQWpmV2lkZ2V0LCBwb3NpdGlvbj86IG51bWJlcikge1xuICAgIHN1YmoubmV4dCgod2lkZ2V0czogQWpmV2lkZ2V0c0NvbnRhaW5lcik6IEFqZldpZGdldHNDb250YWluZXIgPT4ge1xuICAgICAgaWYgKHBvc2l0aW9uICE9IG51bGwgJiYgcG9zaXRpb24gPj0gMCkge1xuICAgICAgICB3aWRnZXRzLndpZGdldHMuc3BsaWNlKHBvc2l0aW9uLCAwLCB3aWRnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkZ2V0cy53aWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aWRnZXRzO1xuICAgIH0pO1xuICAgIHRoaXMudXBkYXRlQ3VycmVudFdpZGdldCh3aWRnZXQpO1xuICAgIHRoaXMuc2V0RW1wdHlDb250ZW50KGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEN1cnJlbnRXaWRnZXRQcm9wZXJ0eShwcm9wTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgaWYgKHdpZGdldCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgKHdpZGdldCBhcyBhbnkpW3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvQ3VycmVudFdpZGdldEFycmF5UHJvcGVydHkocHJvcE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRVcGRhdGUubmV4dCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCk6IEFqZldpZGdldHxudWxsID0+IHtcbiAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFyciA9ICg8QXJyYXk8YW55Pj4od2lkZ2V0IGFzIGFueSlbcHJvcE5hbWVdKTtcbiAgICAgIGFyci5wdXNoKHZhbHVlKTtcbiAgICAgICh3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0gPSBhcnI7XG4gICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbUN1cnJlbnRXaWRnZXRBcnJheVByb3BlcnR5KHByb3BOYW1lOiBzdHJpbmcsIGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFVwZGF0ZS5uZXh0KCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKTogQWpmV2lkZ2V0fG51bGwgPT4ge1xuICAgICAgKDxBcnJheTxhbnk+Pih3aWRnZXQgYXMgYW55KVtwcm9wTmFtZV0pLnNwbGljZShpZHgsIDEpO1xuICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9KTtcbiAgfVxufVxuIl19