import { CommonModule } from '@angular/common';
import { InjectionToken, EventEmitter, Injectable, Optional, Inject, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef, Pipe, Output, forwardRef, ElementRef, Renderer2, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfMapModule } from '@ajf/core/map';
import { AjfTableModule } from '@ajf/core/table';
import { AjfTextModule } from '@ajf/core/text';
import { AjfImageModule } from '@ajf/material/image';
import { AjfMonacoEditor, AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { Subject, BehaviorSubject, Subscription, timer } from 'rxjs';
import { AjfNodeType, AjfFieldType, flattenNodes, AjfValidationService } from '@ajf/core/forms';
import { createFormula, validateExpression, AjfExpressionUtils, evaluateExpression } from '@ajf/core/models';
import { AjfWidgetType, createAggregation, createWidget, AjfAggregationType, AjfChartType } from '@ajf/core/reports';
import { deepCopy, sizedEnumToStringArray } from '@ajf/core/utils';
import { startWith, share, scan, filter, publishReplay, refCount, map, combineLatest, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { AjfImageType } from '@ajf/core/image';
import Quill from 'quill';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/tokens.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AJF_REPORTS_CONFIG = new InjectionToken('AJF_REPORTS_CONFIG');

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This service contains all the logic to model the report widget.
 *
 * @export
 */
class AjfReportBuilderService {
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component manages the report text
 *
 * @export
 */
class AjfReportBuilderColumn {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        /**
         * if true mouse event is on dragged status
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this.layoutShow = false;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this._onDraggedSub = Subscription.EMPTY;
    }
    /**
     * @param {?} event
     * @param {?} idx
     * @param {?} toColumn
     * @return {?}
     */
    addToList(event, idx, toColumn) {
        this.onDragEndHandler();
        if (event.dragData.fromColumn) {
            this._service.changePositionOnColumn(event, toColumn, idx);
        }
        else {
            this._service.addToColumn(event, toColumn, idx);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            s.unsubscribe();
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // this.widget = changes.widget.currentValue;
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderColumn.decorators = [
    { type: Component, args: [{
                selector: 'ajf-column',
                template: "<ng-template [ngIf]=\"column.content != null\">\n  <div class=\"ajf-column\"\n    [ngClass]=\"{'ajf-is-on-over': showActions}\"\n    (mouseenter)=\"showActions = true\"\n    (mouseleave)=\"showActions = false\">\n    <mat-list>\n      <ng-template ngFor let-widget let-idx=\"index\" [ngForOf]=\"column.content\">\n\n        <ng-template [ngIf]=\"!onDragged\">\n          <ajf-report-builder-widgets-row-buttons\n              cdkDrag\n              [cdkDragData]=\"{fromColumn: column, fromIndex: idx, widget: widget, dropZones: ['widget']}\"\n              [from]=\"'column'\"\n              [fromWidget]=\"column\"\n              [widget]=\"widget\"\n              [position]=\"idx\"\n              [child]=\"true\"\n              (cdkDragStarted)=\"onDragStartHandler()\"\n              (cdkDragEnded)=\"onDragEndHandler()\">\n          </ajf-report-builder-widgets-row-buttons>\n        </ng-template>\n        <ajf-report-builder-renderer-widget [widget]=\"widget\"></ajf-report-builder-renderer-widget>\n      </ng-template>\n    </mat-list>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ajf-column{max-width:100%;max-height:100%;background:rgba(0,0,0,0);z-index:100}.ajf-column span{flex-direction:row;width:100%}.ajf-column .mat-list{padding:0}.ajf-column:hover span,.ajf-is-on-over span{visibility:visible !important;display:block !important}.ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}mat-list{height:100%;padding:0}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderColumn.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderColumn.propDecorators = {
    column: [{ type: Input }]
};
if (false) {
    /**
     * if true mouse event is on dragged status
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderColumn.prototype.showActions;
    /** @type {?} */
    AjfReportBuilderColumn.prototype.layoutShow;
    /** @type {?} */
    AjfReportBuilderColumn.prototype.onDragged;
    /**
     * is the array of values
     *
     * \@memberOf TableComponent
     * @type {?}
     */
    AjfReportBuilderColumn.prototype.column;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderColumn.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderColumn.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfReportBuilderWidgetToString(widgetType) {
    return `reportbuilder-${widgetType.toLowerCase()}`;
}
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfWidgetTypeStringToIcon(widgetType) {
    return `widget-${widgetType.toLowerCase()}`;
}
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfWidgetTypeToIcon(widgetType) {
    return ajfWidgetTypeStringToIcon(AjfWidgetType[widgetType]);
}
/**
 * @param {?} widgetType
 * @return {?}
 */
function ajfWidgetTypeStringToLabel(widgetType) {
    return `widgetType.${widgetType}`;
}
/**
 * @param {?} type
 * @return {?}
 */
function ajfWidgetTypeToLabel(type) {
    return ajfWidgetTypeStringToLabel(AjfWidgetType[type]);
}
/**
 * @param {?} type
 * @return {?}
 */
function widgetReportBuilderIconName(type) {
    return `reportbuilder-${AjfWidgetType[type].toLowerCase()}`;
}
/**
 * @param {?} str
 * @return {?}
 */
function sanitizeConditionString(str) {
    str = str.trim();
    while (str.indexOf('  ') > 0) {
        str = str.replace('  ', ' ');
    }
    return str;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/condition-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder builder condition editor
 * @implements : OnDestroy
 * @implements : AfterViewInit
 */
class AjfReportBuilderConditionEditor {
    /**
     * this constructor will init current condition by ajfBuilderservice
     * and init condition and availableFieldNames subscriptions
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.isValid = false;
        this.names = [];
        // conditionText is a string
        this.conditionText = 'true';
        //  operators is an array of any type that contains all allow operators
        this.operators = [
            '( )', '\' \'',
            '<', '<=', '==', '>=', '>', '!=', '!',
            '&&', '||',
            '+', '-', '*', '/', '%',
            'true', 'false'
        ];
        this._conditionNamesSub = Subscription.EMPTY;
    }
    /**
     * @param {?} formsVariables
     * @return {?}
     */
    extractNames(formsVariables) {
        this.names.length = 0;
        for (let i = 0; i < formsVariables.length; i++) {
            this.names = this.names.concat(formsVariables[i].names);
        }
    }
    /**
     * @param {?} id
     * @param {?} index
     * @return {?}
     */
    setCurrent(id, index) {
        this.currentId = id;
        this.appendText(this.formsVariables[id].names[index]);
        this.checkValidation();
    }
    /**
     * this method will return success if the current condtion is valid
     * @return {?} boolean
     */
    validateCondition() {
        return validateExpression(this.conditionText, this.names);
    }
    // TODO complete the comment
    /**
     * this method will append text to json
     * @param {?} text      : string -
     * @param {?=} _goBackNum
     * @return {?}
     */
    appendText(text, _goBackNum) {
        if (text == null || this.conditionTextArea == null) {
            return;
        }
        /** @type {?} */
        let el = this.conditionTextArea.nativeElement;
        /** @type {?} */
        let sStart = Math.min(el.selectionStart, el.selectionEnd);
        /** @type {?} */
        let sEnd = Math.max(el.selectionStart, el.selectionEnd);
        /** @type {?} */
        let startingString = this.conditionText.substr(0, sStart);
        /** @type {?} */
        let endingString = this.conditionText.substr(sEnd);
        /** @type {?} */
        let initialLenght = startingString.length;
        /** @type {?} */
        let newStr = '';
        startingString = sanitizeConditionString(startingString);
        endingString = sanitizeConditionString(endingString);
        sStart += startingString.length - initialLenght +
            text.length + (startingString.length > 0 ? 2 : 1);
        newStr = startingString.length > 0 ? `${startingString} ` : '';
        this.conditionText = `${newStr}${text} ${endingString}`;
        /** @type {?} */
        const s = timer(0).subscribe((/**
         * @return {?}
         */
        () => {
            if (s && !s.closed) {
                s.unsubscribe();
            }
            if (el.createTextRange) {
                /** @type {?} */
                let range = el.createTextRange();
                range.move('character', sStart);
                range.select();
            }
            else {
                if (el.selectionStart) {
                    el.focus();
                    el.setSelectionRange(sStart, sStart);
                }
                else {
                    el.focus();
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    checkValidation() {
        this.isValid = this.validateCondition();
        if (this.isValid) {
            this.saveCondition();
        }
    }
    /**
     * this method will save current condition
     * @return {?}
     */
    saveCondition() {
        this._service.saveCondition(this.conditionText);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.conditionText = this.visibility.condition;
        this.isValid = true;
        if (this.conditionText == 'true') {
            this.conditionText = '';
        }
        this._conditionNamesSub = this._service.conditionNames
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            this.formsVariables = x;
            if (x != null) {
                this.extractNames(this.formsVariables);
            }
        }));
    }
    /**
     * this method will destroy a conditionSubscriptions
     * @return {?}
     */
    ngOnDestroy() {
        this._conditionNamesSub.unsubscribe();
    }
}
AjfReportBuilderConditionEditor.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-condition-editor',
                template: "<ng-template [ngIf]=\"formsVariables != null && visibility != null\">\n  <mat-card>\n    <mat-card-header>\n      <mat-card-title>condition of visibility</mat-card-title>\n      <mat-card-subtitle>\n        <ng-template [ngIf]=\"visibility\">\n          {{visibility.condition}}\n        </ng-template>\n      </mat-card-subtitle>\n    </mat-card-header>\n    <mat-card-content>\n      <br>\n      <form>\n        <mat-select [(ngModel)]=\"a\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select condition\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option *ngFor=\"let label of form.labels;let i = index;\" [value]=\"label\" (click)=\"setCurrent(id, i)\">\n              {{ id}}: {{ label }}\n            </mat-option>\n          </ng-template>\n        </mat-select>\n        <mat-select [(ngModel)]=\"b\" [ngModelOptions]=\"{standalone: true}\" placeholder=\"Select operator\">\n          <mat-option *ngFor=\"let operator of operators\" (click)=\"appendText(operator);\">\n            {{ operator }}\n          </mat-option>\n        </mat-select>\n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <ng-template [ngIf]=\"!isValid\">\n        <ng-container translate>Invalid condition! Please check syntax.</ng-container>\n      </ng-template>\n      <textarea\n          #conditionTextArea\n          [(ngModel)]=\"conditionText\"\n          (keyup)=\"checkValidation()\">\n        </textarea>\n    </mat-card-actions>\n  </mat-card>\n</ng-template>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-condition-editor textarea{width:100%}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderConditionEditor.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderConditionEditor.propDecorators = {
    visibility: [{ type: Input }],
    conditionTextArea: [{ type: ViewChild, args: ['conditionTextArea', { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.visibility;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.formsVariables;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.isValid;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.names;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.currentId;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.conditionText;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.a;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.b;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.conditionTextArea;
    /** @type {?} */
    AjfReportBuilderConditionEditor.prototype.operators;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderConditionEditor.prototype._conditionNamesSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderConditionEditor.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/content.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 *  manage the content page
 *
 * @export
 */
class AjfReportBuilderContent {
    /**
     * @param {?} _service
     * @param {?} _cdRef
     */
    constructor(_service, _cdRef) {
        this._service = _service;
        this._cdRef = _cdRef;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        /**
         *  observe the status of the fixed zoom
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.fixedZoom = false;
        // this boolean sign if widget is in drag enter status
        this.onDragEnter = {};
        this.show = false;
        // this array contains all widget locate in header zone
        this.headerWidgets = [];
        // this array contains all widget locate in content zone
        this.contentWidgets = [];
        // this array contains all widget locate in footer zone
        this.footerWidgets = [];
        this.onOver = false;
        // this is the current widget
        this.currentWidget = null;
        /**
         * if true mouse event is on dragged status
         *
         * \@memberOf AjfReportBuilderContent
         */
        this.showActions = false;
        this._onDraggedSub = Subscription.EMPTY;
        this._fixedZoomSub = Subscription.EMPTY;
        this._onDragEnterSub = Subscription.EMPTY;
        this._headerWidgetsSub = Subscription.EMPTY;
        this._contentWidgetsSub = Subscription.EMPTY;
        this._footerWidgetsSub = Subscription.EMPTY;
        this._onOverSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this.headerStyles = this._service.headerStyles;
        this.contentStyles = this._service.contentStyles;
        this.footerStyles = this._service.footerStyles;
    }
    /**
     * @return {?}
     */
    onMouseOver() {
        this.showActions = true;
        this._service.overStarted();
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        this.showActions = false;
        this._service.overEnded();
    }
    /**
     * @param {?} dropZones
     * @return {?}
     */
    canDropPredicate(dropZones) {
        return (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            for (let i = 0; i < item.data.dropZones.length; i++) {
                if (dropZones.indexOf(item.data.dropZones[i]) > -1) {
                    return true;
                }
            }
            return false;
        });
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    isLayout(widget) {
        return widget.widgetType === AjfWidgetType.Layout;
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (s != null) {
                s.unsubscribe();
            }
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     *  sign the enter of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    onDragEnterHandler(array, index) {
        if (index == null) {
            return;
        }
        this._service.dragEnter(array, index);
    }
    /**
     * sign the leave of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragLeaveHandler() {
        this._service.dragLeave();
    }
    /**
     *  return true if array and index is === with array and index of onDragEnter
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     *
     * @return {?}
     */
    onDragEnterCheck(array, index) {
        if ((array === this.onDragEnter.array) &&
            ((index === this.onDragEnter.index) || (index === -1))) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * remove widget element from type array in idx position
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} type can be header content or footer
     * @param {?} idx
     *
     * @return {?}
     */
    remove(type, idx) {
        this._service.remove(type, idx);
    }
    /**
     * add widget element into type array in idx position
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} arrayTo
     * @param {?} event
     *
     * @param {?=} to
     * @return {?}
     */
    addToList(arrayTo, event, to) {
        this.onDragEndHandler();
        this._service.setOrigin(arrayTo);
        /** @type {?} */
        const itemData = (/** @type {?} */ (event.item.data));
        if (itemData.fromColumn != null) {
            this._service.removeWidgetToColumn(itemData.fromColumn, (/** @type {?} */ (itemData.fromIndex)));
            this.currentWidget = (/** @type {?} */ (itemData.widget));
        }
        else if (itemData.widget != null) {
            this.remove((/** @type {?} */ (itemData.arrayFrom)), (/** @type {?} */ (itemData.from)));
            this.currentWidget = itemData.widget;
        }
        else if (itemData.json != null && itemData.json !== '') {
            this.currentWidget = deepCopy(itemData.json);
        }
        else {
            /** @type {?} */
            let obj = { 'widgetType': ((/** @type {?} */ (AjfWidgetType)))[(/** @type {?} */ (itemData.widgetType))] };
            this.currentWidget = deepCopy(obj);
        }
        this.onDragEndHandler();
        if (this.currentWidget != null) {
            switch (arrayTo) {
                case 'header':
                    this._service.addHeaderWidget(this.currentWidget, to);
                    break;
                case 'content':
                    this._service.addContentWidget(this.currentWidget, to);
                    break;
                case 'footer':
                    this._service.addfooterWidget(this.currentWidget, to);
                    break;
            }
        }
        this.onDragLeaveHandler();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._headerWidgetsSub = this._service.headerWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.headerWidgets = x.widgets;
        }));
        this._contentWidgetsSub = this._service.contentWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.contentWidgets = x.widgets;
        }));
        this._footerWidgetsSub = this._service.footerWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.footerWidgets = x.widgets;
        }));
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this._fixedZoomSub = this._service.fixedZoom
            .subscribe((/**
         * @param {?} bool
         * @return {?}
         */
        bool => {
            this.fixedZoom = bool;
        }));
        this._onDragEnterSub = this._service.onDragEnter
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragEnter = x;
        }));
        this._onOverSub = this._service.onOver
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onOver = x;
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        [
            this._headerWidgetsSub, this._contentWidgetsSub, this._footerWidgetsSub,
            this._currentWidgetSub, this._onDraggedSub, this._fixedZoomSub,
            this._onOverSub, this._onDragEnterSub
        ].forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => { s.unsubscribe(); }));
    }
}
AjfReportBuilderContent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-content',
                template: "<div\n  class=\"ajf-overlay\"\n  [ngClass]=\"{'ajf-drag-mode': onDragged, 'ajf-zoom-mode': fixedZoom}\"\n  [applyStyles]=\"reportStyles|async\"\n  (mouseenter)=\"show = true\"\n  (mouseleave)=\"show = false\">\n  <div\n    class=\"ajf-header\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"(headerStyles|async)\">\n    <mat-list *ngFor=\"let t of headerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('header', $event, i);\"\n          (dragenter)=\"onDragEnterHandler('header', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t,fromIndex: i,arrayFrom: 'header', dropZones: ['widget','column']}\"\n          [style.display]=\"(showActions || onDragged)? 'block' : 'none'\"\n          [from]=\"'header'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler();\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'header'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': true}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['header','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('header', $event)\"\n        (dragenter)=\"onDragEnterHandler('header', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n    </div>\n  </div>\n  <div\n    class=\"ajf-content\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"contentStyles|async\">\n    <mat-list *ngFor=\"let t of contentWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('content', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('content', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'content', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'content'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'content'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['content','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('content', $event)\"\n        (dragenter)=\"onDragEnterHandler('content', contentWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n  </div>\n  <div\n    class=\"ajf-footer\"\n    [ngClass]=\"{'ajf-is-on-over': onDragged || show}\"\n    [applyStyles]=\"footerStyles|async\">\n    <mat-list *ngFor=\"let t of footerWidgets; let i = index\">\n      <div cdkDropList\n          class=\"ajf-drop-zone\"\n          [ngClass]=\"{'ajf-show': true}\"\n          [cdkDropListEnterPredicate]=\"canDropPredicate(['widget','column'])\"\n          (cdkDropListDropped)=\"addToList('footer', $event, i)\"\n          (dragenter)=\"onDragEnterHandler('footer', i)\"\n          (dragleave)=\"onDragLeaveHandler()\">\n      </div>\n      <ajf-report-builder-widgets-row-buttons\n          cdkDrag\n          [cdkDragData]=\"{widget: t, fromIndex: i, arrayFrom: 'footer', dropZones: ['widget','column']}\"\n          [style.display]=\"showActions ? 'block' : 'none'\"\n          [from]=\"'footer'\"\n          [widget]=\"t\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler()\">\n      </ajf-report-builder-widgets-row-buttons>\n      <ajf-report-builder-renderer-widget [widget]=\"t\" [position]=\"i\" [section]=\"'footer'\" (currentWidget)=\"currentWidget\"></ajf-report-builder-renderer-widget>\n    </mat-list>\n    <div cdkDropList\n        class=\"ajf-drop-zone-container\"\n        [ngClass]=\"{'ajf-show': onDragged}\"\n        [cdkDropListEnterPredicate]=\"canDropPredicate(['footer','widget','column'])\"\n        (cdkDropListDropped)=\"addToList('footer', $event)\"\n        (dragenter)=\"onDragEnterHandler('footer', headerWidgets?.length)\"\n        (dragleave)=\"onDragLeaveHandler()\">\n      <label translate>Drop here</label>\n    </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '(mouseover)': 'onMouseOver()',
                    '(mouseleave)': 'onMouseLeave()'
                },
                styles: ["ajf-report-builder-content{text-align:center;display:block;margin-bottom:300px}ajf-report-builder-content .ajf-overlay.ajf-drag-mode{max-height:700px;margin-top:50px;background-color:beige}ajf-report-builder-content .ajf-drag-mode{overflow:scroll;zoom:50%}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-content,ajf-report-builder-content .ajf-drag-mode .ajf-footer{margin-bottom:20px;border:23px solid rgba(66,134,244,.2)}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{width:auto;background-color:rgba(66,134,244,.2);border:23px solid #fff;position:relative;min-height:50px !important;z-index:0;opacity:1}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-content .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(66,134,244,.2) !important;border:23px solid #fff !important}ajf-report-builder-content .ajf-drag-mode .ajf-header,ajf-report-builder-content .ajf-drag-mode .ajf-footer{border:23px solid rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone-container,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone-container{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-header .ajf-drop-zone,ajf-report-builder-content .ajf-drag-mode .ajf-footer .ajf-drop-zone{background-color:rgba(255,102,102,.4) !important}ajf-report-builder-content .ajf-drag-mode .ajf-drop-zone-container{background-color:#000;border:16px solid #fff;position:relative;opacity:0;z-index:0;min-height:50px !important;display:none !important}ajf-report-builder-content .ajf-zoom-mode{zoom:50%}ajf-report-builder-content .ajf-header,ajf-report-builder-content .ajf-content,ajf-report-builder-content .ajf-footer{height:100%;min-height:50px;position:relative;text-align:center;display:block}ajf-report-builder-content .ajf-header .mat-list,ajf-report-builder-content .ajf-content .mat-list,ajf-report-builder-content .ajf-footer .mat-list{padding:0}ajf-report-builder-content .ajf-header .ajf-zoom:hover,ajf-report-builder-content .ajf-content .ajf-zoom:hover,ajf-report-builder-content .ajf-footer .ajf-zoom:hover{padding-bottom:100px;overflow-y:scroll}ajf-report-builder-content .ajf-content:hover{background-color:rgba(66,134,244,.2) !important}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-footer:hover{background-color:rgba(255,102,102,.4)}ajf-report-builder-content .ajf-header:hover,ajf-report-builder-content .ajf-content:hover,ajf-report-builder-content .ajf-footer:hover,ajf-report-builder-content .ajf-is-on-over{border:3px dotted #3a7999}ajf-report-builder-content .ajf-header:hover label,ajf-report-builder-content .ajf-content:hover label,ajf-report-builder-content .ajf-footer:hover label,ajf-report-builder-content .ajf-is-on-over label{visibility:visible !important;opacity:.4;display:block !important}ajf-report-builder-content .ajf-header:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-content:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-footer:hover .ajf-drop-zone-container,ajf-report-builder-content .ajf-is-on-over .ajf-drop-zone-container{display:block !important}ajf-report-builder-content .ajf-header:hover mat-list button,ajf-report-builder-content .ajf-content:hover mat-list button,ajf-report-builder-content .ajf-footer:hover mat-list button,ajf-report-builder-content .ajf-is-on-over mat-list button{display:inline}ajf-report-builder-content .ajf-my-content{width:100%;white-space:nowrap;overflow-y:auto}ajf-report-builder-content .ajf-show,ajf-report-builder-content .ajf-on-drag-over{opacity:1 !important;z-index:10}ajf-report-builder-content mat-list{position:relative;display:block}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderContent.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: ChangeDetectorRef }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderContent.prototype.reportStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.onDragged;
    /**
     *  observe the status of the fixed zoom
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.fixedZoom;
    /** @type {?} */
    AjfReportBuilderContent.prototype.onDragEnter;
    /** @type {?} */
    AjfReportBuilderContent.prototype.show;
    /** @type {?} */
    AjfReportBuilderContent.prototype.headerWidgets;
    /**
     * observe the css style of header
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.headerStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.contentWidgets;
    /**
     * observe the css style of content
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.contentStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.footerWidgets;
    /** @type {?} */
    AjfReportBuilderContent.prototype.onOver;
    /**
     * observe the css style of footer
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.footerStyles;
    /** @type {?} */
    AjfReportBuilderContent.prototype.currentWidget;
    /**
     * if true mouse event is on dragged status
     *
     * \@memberOf AjfReportBuilderContent
     * @type {?}
     */
    AjfReportBuilderContent.prototype.showActions;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._fixedZoomSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._onDragEnterSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._headerWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._contentWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._footerWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._onOverSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderContent.prototype._cdRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/custom-widget-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderCustomWidgetDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     */
    constructor(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
    }
    /**
     * @return {?}
     */
    changeLabel() {
        this._service.changeLabelCustomWidget(this.label, this.position);
        this._dialogRef.close();
    }
}
AjfReportBuilderCustomWidgetDialog.decorators = [
    { type: Component, args: [{
                selector: 'custom-widget-dialog',
                template: "<h3 matDialogTitle> set the label widget</h3>\n<mat-form-field>\n  <input matInput placeholder=\"add the label of this custom widget\" [(ngModel)]=\"label\"/>\n</mat-form-field>\n<button matDialogClose (click)=\"changeLabel()\"> Ok </button>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AjfReportBuilderCustomWidgetDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];
AjfReportBuilderCustomWidgetDialog.propDecorators = {
    label: [{ type: Input }],
    position: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderCustomWidgetDialog.prototype.label;
    /** @type {?} */
    AjfReportBuilderCustomWidgetDialog.prototype.position;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetDialog.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetDialog.prototype._dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/custom-widget-toolbar-button.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
class AjfReportBuilderCustomWidgetToolbarButton {
    // {...t, dropZones: ['header','content','footer','column','widget']}
    /**
     * this constructor will init icon registry
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.customWidgets = [];
    }
    /**
     * this method call a service method for remove custom widget
     *
     * \@memberOf AjfReportBuilderCustomWidgetToolbarButton
     * @return {?}
     */
    remove() {
        this._service.remove('customWidgets', this.position);
    }
    /**
     * this method will init  fieldIcon and fieldLabel
     * @return {?}
     */
    ngOnInit() {
        this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
        this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
    }
}
AjfReportBuilderCustomWidgetToolbarButton.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-custom-widget-toolbar-button',
                template: "<a mat-button>\n  {{ widgetType}}\n  <i class=\"material-icons\"(click)=\"remove()\">remove_circle_outline</i>\n</a>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute !important;margin-left:5px !important;z-index:5}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderCustomWidgetToolbarButton.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderCustomWidgetToolbarButton.propDecorators = {
    widgetType: [{ type: Input }],
    position: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.widgetType;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.position;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.widgetIcon;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.widgetLabel;
    /** @type {?} */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.customWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetToolbarButton.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/custom-widgets-toolbar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AjfStyles() { }
/**
 * @record
 */
function CustomWidget() { }
if (false) {
    /** @type {?} */
    CustomWidget.prototype.json;
    /** @type {?} */
    CustomWidget.prototype.type;
}
/**
 * @record
 */
function CustomWidgets() { }
if (false) {
    /** @type {?} */
    CustomWidgets.prototype.widgets;
}
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
class AjfReportBuilderCustomWidgetsToolbar {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.customWidgets = [];
        this._customWidgetsSub = Subscription.EMPTY;
        this._threeColumnsLayout = '{"widgetType":0,' +
            '"content":[],"styles":{},"visibility":{"condition":"true"},"columns":[0.34,0.33,0.33],' +
            '"content":' +
            '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
        this._fourColumnsLayout = '{"widgetType":0,"content":[],"styles":{},"visibility":{"condition":"true"},' +
            '"columns":[0.25,0.25,0.25,0.25],"content":' +
            '[{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]},' +
            '{"widgetType":7,"content":[],"styles":{},"visibility":{"condition":"true"},"content":[]}]}';
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    openDialog(idx) {
        this._dialogRef = this.dialog.open(AjfReportBuilderCustomWidgetDialog);
        this._dialogRef.componentInstance.label = this.customWidgets[idx].type;
        this._dialogRef.componentInstance.position = idx;
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (s != null) {
                s.unsubscribe();
            }
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     *  sign the enter of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @param {?} array
     * @param {?} index
     * @return {?}
     */
    onDragEnterHandler(array, index) {
        this._service.dragEnter(array, index);
    }
    /**
     * sign the leave of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragLeaveHandler() {
        this._service.dragLeave();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._customWidgetsSub = this._service.customWidgets
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.customWidgets = x;
            if (this.customWidgets.length > 0 &&
                this.customWidgets[this.customWidgets.length - 1].type == '') {
                this.openDialog(this.customWidgets.length - 1);
            }
        }));
        this._service.addCustomWidgets({
            json: this._threeColumnsLayout,
            type: 'LayoutWidgetWith3Columns',
        });
        this._service.addCustomWidgets({
            json: this._fourColumnsLayout,
            type: 'LayoutWidgetWith4Columns'
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._customWidgetsSub.unsubscribe();
        this._service.resetCustomWidgets();
    }
}
AjfReportBuilderCustomWidgetsToolbar.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-custom-widgets-toolbar',
                template: "<mat-toolbar>\n  <ng-template ngFor let-t [ngForOf]=\"customWidgets\" let-i=\"index\">\n    <ajf-report-builder-custom-widget-toolbar-button\n          cdkDrag\n          [cdkDragData]=\"t\"\n          [widgetType]=\"t.type\"\n          [position]=\"i\"\n          (cdkDragStarted)=\"onDragStartHandler()\"\n          (cdkDragEnded)=\"onDragEndHandler();\"\n          (click)=\"openDialog(i)\">\n    </ajf-report-builder-custom-widget-toolbar-button>\n   </ng-template>\n</mat-toolbar>\n\n\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-custom-widgets-toolbar .mat-toolbar{background-color:rgba(144,238,144,.6);border-radius:16px}ajf-report-builder-custom-widgets-toolbar .ajf-hide{display:none}ajf-report-builder-custom-widgets-toolbar .ajf-show{display:block}ajf-report-builder-custom-widgets-toolbar a{margin-right:10px}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderCustomWidgetsToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderCustomWidgetsToolbar.prototype.customWidgets;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._customWidgetsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._dialogRef;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._threeColumnsLayout;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._fourColumnsLayout;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderCustomWidgetsToolbar.prototype._service;
    /** @type {?} */
    AjfReportBuilderCustomWidgetsToolbar.prototype.dialog;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/forms-analyzer-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const AjfDataType = {
    MainData: 0,
    Dataset: 1,
    RelatedData: 2,
    LENGTH: 3,
};
AjfDataType[AjfDataType.MainData] = 'MainData';
AjfDataType[AjfDataType.Dataset] = 'Dataset';
AjfDataType[AjfDataType.RelatedData] = 'RelatedData';
AjfDataType[AjfDataType.LENGTH] = 'LENGTH';
class AjfReportBuilderFormsAnalyzerDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     * @param {?} _
     */
    constructor(_service, _dialogRef, _) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.aggregationTypes = sizedEnumToStringArray(AjfAggregationType);
        //  operators is an array of any type that contains all allow operators
        this.operators = [
            'true', 'false', '( )', '\' \'',
            '<', '<=', '>=', '>', '!=', '!',
            '&&', '||',
            '+', '-', '*', '/', '%', '=='
        ];
        this.formulaText = '';
        this.formulaDate = '';
        this.safeFormulaText = '';
        this.label = '';
        this.condition = '';
        this.aggregationType = AjfAggregationType.Sum;
        this.currentId = 0;
        this.currentIndex = 0;
        this.labels = [];
        this.currentWidget = null;
        this.formsVariablesName = [];
        this.formsVariablesType = [];
        this._formAnalyzerSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this._first = true;
        if (this.init == false) {
            this.formulaText = '';
            this.aggregationType = AjfAggregationType.Sum;
        }
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                this.currentWidget = (/** @type {?} */ (x));
                if (this.currentWidget.widgetType == 2) {
                    /** @type {?} */
                    let myObj = (/** @type {?} */ (this.currentWidget));
                    if (myObj.imageType == AjfImageType.Flag) {
                        this.formula = (myObj.flag) ? myObj.flag.formula : '';
                    }
                    else {
                        this.formula = (myObj.icon) ? myObj.icon.formula : '';
                    }
                }
            }
        }));
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (x != null) {
                this.formsVariables = x;
            }
        }));
    }
    /**
     * @return {?}
     */
    onEditorInit() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2015,
            allowNonTsExtensions: true,
            allowJs: true,
            module: monaco.languages.typescript.ModuleKind.None
        });
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-variables.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = '';
        }
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-functions.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-functions.d.ts'] = '';
        }
        this._initFormsVariablesNames();
        this._updateVariables();
        this._updateFunctions();
    }
    /**
     * @private
     * @return {?}
     */
    _initFormsVariablesNames() {
        this.formsVariables.forEach((/**
         * @param {?} formVar
         * @return {?}
         */
        (formVar) => {
            formVar.names.forEach((/**
             * @param {?} name
             * @return {?}
             */
            (name) => {
                this.formsVariablesName.push(name);
            }));
            formVar.types.forEach((/**
             * @param {?} type
             * @return {?}
             */
            (type) => {
                this.formsVariablesType.push(this._fieldVarType(type) || '');
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateVariables() {
        if (this.formsVariables == null) {
            return;
        }
        try {
            /** @type {?} */
            let value = '';
            for (let i = 0; i < this.formsVariablesName.length; i++) {
                value += `declare const ${this.formsVariablesName[i]}: ${this.formsVariablesType[i]};`;
            }
            value += `\n`;
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] = value;
        }
        catch (e) { }
    }
    /**
     * @private
     * @return {?}
     */
    _updateFunctions() {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) { }
    }
    /**
     * @private
     * @param {?} fieldType
     * @return {?}
     */
    _fieldVarType(fieldType) {
        switch (fieldType) {
            case AjfFieldType.Boolean:
                return 'boolean';
            case AjfFieldType.Date:
            case AjfFieldType.DateInput:
            case AjfFieldType.Time:
                return 'Date';
            case AjfFieldType.Empty:
                return 'void';
            case AjfFieldType.Formula:
                return 'number';
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return 'any';
            case AjfFieldType.Number:
                return 'number';
            case AjfFieldType.Table:
                return 'Array';
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'string';
        }
        return null;
    }
    /**
     * @param {?} id
     * @param {?} label
     * @param {?} index
     * @return {?}
     */
    setCurrent(id, label, index) {
        if (!this.init) {
            this.label = label;
            this.init = true;
        }
        this.insertVariable(this.formsVariables[id].names[index] || '');
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setCurrentId(id) {
        this.currentId = id;
        this.labels = this.formsVariables[id].labels;
        this._updateVariables();
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setAggregationType(type) {
        this.aggregationType = type;
    }
    /**
     * @return {?}
     */
    checkValidation() {
        if (this.validateFormula()) {
            this.safeFormulaText = this.formulaText;
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
        if (this.formulaText == '') {
            this.isValid = false;
        }
    }
    /**
     * @return {?}
     */
    validateFormula() {
        if (this.formulaText == '') {
            this.init = false;
        }
        if (this.formsVariables == null) {
            return false;
        }
        else {
            return validateExpression(this.formulaText, this.formsVariablesName);
        }
    }
    /**
     * @return {?}
     */
    saveDataset() {
        if (this.currentWidget != null) {
            switch (this.currentWidget.widgetType) {
                case 2:
                    this.saveImageFormula();
                    break;
                case 3:
                    this.saveFormulaHtml();
                    break;
                case 4:
                    this.saveChartFormula();
                    break;
                case 5:
                    this.saveTableFormula();
                    break;
            }
        }
        this.close();
    }
    /**
     * @return {?}
     */
    saveImageFormula() {
        this._service.saveImageFormula(createFormula({ formula: this.formulaText }));
    }
    /**
     * @return {?}
     */
    saveFormulaHtml() {
        this._service.saveFormulaToHtml(this.formulaText, this.reference);
    }
    /**
     * @return {?}
     */
    saveChartFormula() {
        this._service.saveChartFormula(this.label, this.level, this.mainIndex, this.index, this.formulaText, this.aggregationType);
    }
    /**
     * @return {?}
     */
    saveTableFormula() {
        this._service.saveTableFormula(this.label, this.aggregationType, this.formulaText, this.mainIndex, this.index);
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    insertVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            const editor = this.monacoEditor.editor;
            /** @type {?} */
            let value = editor.getValue().split('\n');
            /** @type {?} */
            let position = editor.getPosition();
            /** @type {?} */
            const ln = position.lineNumber - 1;
            /** @type {?} */
            let line = value[ln];
            /** @type {?} */
            let col = position.column - 1;
            line = line.substring(0, col) + variable + line.substring(col);
            value[ln] = line;
            position.column += variable.length;
            this.monacoEditor.value = value.join('\n');
            editor.setPosition(position);
            editor.focus();
            this.formulaText = editor.getValue();
            this.checkValidation();
        }
    }
    /**
     * @param {?} variable
     * @return {?}
     */
    setVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            const editor = this.monacoEditor.editor;
            editor.setValue(variable);
        }
    }
    /**
     * @return {?}
     */
    reset() {
        this.formulaText = '';
        this.aggregationType = AjfAggregationType.None;
    }
    /**
     * @return {?}
     */
    close() {
        this.reset();
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.formulaText = this.formula;
        this.aggregationType = this.aggregation;
        this.label = this.labelText;
        if (this.formulaText == '' || this.formulaText == null) {
            this.isValid = false;
        }
        else {
            this.isValid = true;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._first && this.monacoEditor != null && this.monacoEditor.editor != null) {
            this.insertVariable(this.formulaText || '');
            this._first = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._formAnalyzerSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderFormsAnalyzerDialog.decorators = [
    { type: Component, args: [{
                selector: 'forms-analyzer-dialog',
                template: "<h3 matDialogTitle> Formula editor </h3>\n<div mat-dialog-content #elem>\n  <ng-template [ngIf]=\"currentWidget != null && formsVariables != null\">\n    <div class=\"ajf-left\">\n      <mat-list>\n        <mat-list-item *ngFor=\"let operator of operators\">\n          <button mat-button (click)=\"insertVariable(operator)\">\n            <h4 matLine>{{operator}}</h4>\n          </button>\n        </mat-list-item>\n      </mat-list>\n    </div>\n    <div class=\"ajf-main\">\n      <mat-select *ngIf=\"!isFormula\" placeholder=\"Select type of agregation\" [(ngModel)]=\"aggregationType\">\n          <mat-option [value]=\"idx\" *ngFor=\"let ag of aggregationTypes; let idx = index\"> {{ ag }} </mat-option>\n      </mat-select>\n      <mat-form-field *ngIf=\"!isFormula\">\n        <textarea matInput placeholder=\"Name field\" [(ngModel)]=\"label\" ></textarea>\n      </mat-form-field>\n        <ajf-monaco-editor\n          (init)=\"onEditorInit()\"\n          (valueChange)=\"formulaText = $event;checkValidation();\"\n          [value]=\"condition\" language=\"javascript\">\n        </ajf-monaco-editor>\n    </div>\n    <div class=\"ajf-menu\">\n      <form>\n        <mat-select placeholder=\"Select form\" (selectionChange)=\"setCurrentId($event.value)\">\n          <ng-template ngFor let-form let-id=\"index\" [ngForOf]=\"formsVariables\">\n            <mat-option [value]=\"id\"> {{ id }} </mat-option>\n          </ng-template>\n        </mat-select>\n      </form>\n      <mat-list>\n        <h3 matSubheader>Field list</h3>\n        <mat-list-item *ngFor=\"let label of labels;let i = index\">\n          <button mat-button (click)=\"setCurrent(currentId, label, i)\">\n            <h4 matLine>{{label}}</h4>\n          </button>\n        </mat-list-item>\n      </mat-list>\n    </div>\n  </ng-template>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"saveDataset()\" [disabled]=\"!isValid\">Save</button>\n</div>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["forms-analyzer-dialog{height:512px}forms-analyzer-dialog h4[matLine]{font-size:xx-small}forms-analyzer-dialog [mat-dialog-content]{flex-direction:row;display:flex;align-items:stretch;min-width:1000px}forms-analyzer-dialog [mat-dialog-content] .ajf-left{flex:1 0 10%;width:10%;overflow-y:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-left form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog [mat-dialog-content] .ajf-main{flex:1 0 55%;min-width:512px}forms-analyzer-dialog [mat-dialog-content] .ajf-main monaco-editor{height:450px;min-width:300px}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-select{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field{width:80%}forms-analyzer-dialog [mat-dialog-content] .ajf-main mat-form-field textarea{width:auto;height:auto}forms-analyzer-dialog [mat-dialog-content] .ajf-main textarea{width:80%;height:75px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu{flex:1 0 30%;overflow-y:auto;min-width:350px}forms-analyzer-dialog [mat-dialog-content] .ajf-menu form>mat-select{width:90%;margin-left:10px;margin-right:10px}forms-analyzer-dialog ajf-monaco-editor{min-width:400px}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderFormsAnalyzerDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef },
    { type: AjfValidationService }
];
AjfReportBuilderFormsAnalyzerDialog.propDecorators = {
    formula: [{ type: Input }],
    isFormula: [{ type: Input }],
    labelText: [{ type: Input }],
    aggregation: [{ type: Input }],
    init: [{ type: Input }],
    level: [{ type: Input }],
    index: [{ type: Input }],
    mainIndex: [{ type: Input }],
    reference: [{ type: Input }],
    monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.aggregationTypes;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.operators;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formulaText;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formulaDate;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.safeFormulaText;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.label;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.condition;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.aggregationType;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.dataset;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.currentId;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.currentIndex;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.labels;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formsVariables;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formsVariablesName;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formsVariablesType;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.isValid;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.formula;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.isFormula;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.labelText;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.aggregation;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.init;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.level;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.index;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.mainIndex;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.reference;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzerDialog.prototype.monacoEditor;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._formAnalyzerSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._first;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzerDialog.prototype._dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/forms-analyzer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component provides the support for connect the form fields with the report
 *
 * @export
 */
class AjfReportBuilderFormsAnalyzer {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.currentWidget = null;
        this.forms = [];
        this.choicesOrigins = {};
        this.currentMainDataIndex = -1;
        this._dataset = [];
        this._currentWidgetSub = Subscription.EMPTY;
        this._formAnalyzerSub = Subscription.EMPTY;
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                this.currentWidget = x;
                // this._dataset = myObj.dataset;
            }
            else {
                this.currentWidget = null;
            }
        }));
        this._formAnalyzerSub = this._service.formsVariables
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            if (x != null) {
                this.formsVariables = x;
            }
        }));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    setCurrentIndex(index) {
        this.currentMainDataIndex = index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isSelected(index) {
        if (index === this.currentMainDataIndex) {
            return 'primary';
        }
        else {
            return undefined;
        }
    }
    /**
     *  get the X components label of the chart.
     *  they are contained in the first row of dataset
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getMainData() {
        if (this._dataset[0] != null) {
            /** @type {?} */
            let mainData = [];
            for (let i = 0; i < this._dataset[0].length; i++) {
                mainData.push(this._dataset[0][i].label || '');
            }
            return mainData;
        }
        else {
            return [];
        }
    }
    /**
     *  get the Y components label of the chart.
     *  they are contained in the first column of dataset
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getDataset() {
        /** @type {?} */
        let dataset = [];
        if (this._dataset[0] != null) {
            for (let i = 1; i < this._dataset.length; i++) {
                dataset.push(this._dataset[i][0].label || '');
            }
            return dataset;
        }
        else {
            return [];
        }
    }
    /**
     * get the related data label of the chart.
     * they are contained in the row of the Y component
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @return {?}
     */
    getRelatedData() {
        if (this._dataset[this.currentMainDataIndex + 1] != null) {
            /** @type {?} */
            let relatedData = [];
            for (let i = 1; i < this._dataset[this.currentMainDataIndex + 1].length; i++) {
                relatedData.push(this._dataset[this.currentMainDataIndex + 1][i].label || '');
            }
            return relatedData;
        }
        else {
            return [];
        }
    }
    /**
     * @return {?}
     */
    getTableHeader() {
        /** @type {?} */
        let mainData = [];
        if (this._dataset != null) {
            for (let i = 0; i < this._dataset.length; i++) {
                if (this._dataset[i][0] != null) {
                    mainData.push(this._dataset[i][0].label || '');
                }
            }
        }
        return mainData;
    }
    /**
     * @return {?}
     */
    getTableData() {
        if (this._dataset[this.currentMainDataIndex] != null) {
            /** @type {?} */
            let tableData = [];
            for (let i = 1; i < this._dataset[this.currentMainDataIndex].length; i++) {
                if (this._dataset[this.currentMainDataIndex][i] != null) {
                    tableData.push(this._dataset[this.currentMainDataIndex][i].label || '');
                }
            }
            return tableData;
        }
        else {
            return [];
        }
    }
    /**
     * @return {?}
     */
    needMainData() {
        /** @type {?} */
        let myObj = (/** @type {?} */ (this.currentWidget));
        if (myObj.chartType === AjfChartType.Scatter ||
            myObj.chartType === AjfChartType.Bubble) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeMainData(index) {
        this._service.removeMainData(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeDataset(index) {
        this.currentMainDataIndex = index;
        this._service.removeRelatedData(this.currentMainDataIndex, -1);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeTableMainData(index) {
        this._service.removeTableMainData(index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeRelatedData(index) {
        this._service.removeRelatedData(this.currentMainDataIndex, index);
    }
    /**
     * @param {?} mainIndex
     * @param {?} index
     * @return {?}
     */
    removeData(mainIndex, index) {
        this._service.removeData(mainIndex, index);
    }
    /**
     *
     *
     *
     * \@memberof AjfReportBuilderFormsAnalyzer
     * @param {?} level
     * @param {?} mainIndex
     * @param {?} index
     * @param {?} editMode
     *
     * @return {?}
     */
    openDialog(level, mainIndex, index, editMode) {
        this.dialogRef = this.dialog.open(AjfReportBuilderFormsAnalyzerDialog);
        if (editMode) {
            if (level === 1 && index === -1) {
                index = 0;
            }
            if (level === 1) {
                if (this.currentWidget != null && this.currentWidget.widgetType == AjfWidgetType.Chart) {
                    mainIndex++;
                }
                index++;
            }
            this.dialogRef.componentInstance.labelText =
                this._dataset[mainIndex] &&
                    this._dataset[mainIndex][index].label || '';
            /* this.dialogRef.componentInstance.formula =
              this._dataset[mainIndex] &&
              this._dataset[mainIndex][index].formula.formula || ''; */
            this.dialogRef.componentInstance.aggregation =
                this._dataset[mainIndex] &&
                    this._dataset[mainIndex][index].aggregation.aggregation || AjfAggregationType.None;
        }
        else {
            this.dialogRef.componentInstance.labelText = '';
            this.dialogRef.componentInstance.formula = '';
            this.dialogRef.componentInstance.aggregation = 0;
        }
        // this.dialogRef.componentInstance.formsVariables = this.formsVariables;
        this.dialogRef.componentInstance.currentWidget = (/** @type {?} */ (this.currentWidget));
        this.dialogRef.componentInstance.level = level;
        this.dialogRef.componentInstance.mainIndex = mainIndex;
        this.dialogRef.componentInstance.index = index;
        this.dialogRef.componentInstance.init = false;
    }
    /**
     * @return {?}
     */
    openDialogAddMainData() {
        this.openDialog(0, -1, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartEditMainData() {
        this.openDialog(0, 0, this.currentMainDataIndex, true);
    }
    /**
     * @return {?}
     */
    openDialogTableEditMainData() {
        this.openDialog(0, this.currentMainDataIndex, 0, true);
    }
    /**
     * @return {?}
     */
    openDialogChartAddDataset() {
        this.openDialog(1, -1, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogTableAddDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartAddDataOfDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, false);
    }
    /**
     * @return {?}
     */
    openDialogChartEditDataset() {
        this.openDialog(1, this.currentMainDataIndex, -1, true);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openDialogTableEditDataset(index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    openDialogChartEditDataOfDataset(index) {
        this.openDialog(1, this.currentMainDataIndex, index, true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
        this._formAnalyzerSub.unsubscribe();
    }
}
AjfReportBuilderFormsAnalyzer.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-forms-analyzer',
                template: "<ng-template [ngIf]=\"currentWidget != null && formsVariables != null\">\n  <ng-template [ngIf]=\"currentWidget.widgetType == 4\">\n    <ng-template  [ngIf]=\"needMainData()\">\n      <mat-tab-group>\n        <mat-tab [label]=\"'Main Data' | translate\">\n          <button mat-button (click)=\"openDialogAddMainData()\" style=\"width:100%;\">\n            Add Main Data\n          </button>\n          <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n            <ng-template ngFor let-label [ngForOf]=\"getMainData()\" let-idx=\"index\">\n              <mat-grid-tile>\n                  {{ label }}\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogChartEditMainData()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeMainData(idx)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n        </mat-tab>\n      </mat-tab-group>\n    </ng-template>\n    <mat-tab-group>\n      <mat-tab label=\"dataset\">\n        <button mat-button (click)=\"openDialogChartAddDataset()\" style=\"width:100%\">\n            add dataset\n        </button>\n        <mat-grid-list rowHeight=\"50px\" cols=\"4\">\n          <ng-template ngFor let-label [ngForOf]=\"getDataset()\" let-idx=\"index\">\n              <mat-grid-tile>\n                <button mat-button [color]=\"isSelected(idx)\"(click)=\"setCurrentIndex(idx)\">\n                  {{ label }}\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button (click)=\"setCurrentIndex(idx);openDialogChartAddDataOfDataset()\" style=\"width:100%\">\n                  add data\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"setCurrentIndex(idx);openDialogChartEditDataset()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeDataset(idx)\">Remove</button>\n              </mat-grid-tile>\n          </ng-template>\n        </mat-grid-list>\n      </mat-tab>\n      <mat-tab label=\"data\">\n        <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n          <ng-template ngFor let-label [ngForOf]=\"getRelatedData()\" let-idx=\"index\">\n            <mat-grid-tile>\n                {{ label }}\n            </mat-grid-tile>\n            <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"openDialogChartEditDataOfDataset(idx)\">Edit</button>\n            </mat-grid-tile>\n            <mat-grid-tile>\n              <button mat-button translate\n                  (click)=\"removeRelatedData(idx)\">Remove</button>\n            </mat-grid-tile>\n          </ng-template>\n        </mat-grid-list>\n        <div class=\"ajf-ui ajf-divider\"></div>\n      </mat-tab>\n    </mat-tab-group>\n  </ng-template>\n  <ng-template [ngIf]=\"currentWidget.widgetType == 5\">\n    <ng-template  [ngIf]=\"needMainData()\">\n      <mat-tab-group>\n        <mat-tab [label]=\"'Main Data' | translate\">\n          <button mat-button (click)=\"openDialogAddMainData()\"\n              translate\n              style=\"width:100%;\">Add Main Data</button>\n          <mat-grid-list rowHeight=\"50px\" cols=\"4\">\n            <ng-template ngFor let-label [ngForOf]=\"getTableHeader()\" let-idx=\"index\">\n              <mat-grid-tile>\n                <button mat-button [color]=\"isSelected(idx)\"(click)=\"setCurrentIndex(idx)\">\n                  {{ label }}\n                </button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogTableAddDataset()\"\n                    style=\"width:100%\">add data</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"setCurrentIndex(idx);openDialogTableEditMainData()\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeTableMainData(idx)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n        </mat-tab>\n        <mat-tab [label]=\"'data' | translate\">\n          <mat-grid-list rowHeight=\"50px\" cols=\"3\">\n            <ng-template ngFor let-label [ngForOf]=\"getTableData()\" let-idx=\"index\">\n              <mat-grid-tile>\n                  {{ label }}\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"openDialogTableEditDataset(idx)\">Edit</button>\n              </mat-grid-tile>\n              <mat-grid-tile>\n                <button mat-button translate\n                    (click)=\"removeData(currentMainDataIndex, idx + 1)\">Remove</button>\n              </mat-grid-tile>\n            </ng-template>\n          </mat-grid-list>\n          <div class=\"ajf-ui ajf-divider\"></div>\n      </mat-tab>\n      </mat-tab-group>\n    </ng-template>\n  </ng-template>\n</ng-template>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-forms-analyzer{min-height:512px}ajf-report-builder-forms-analyzer .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-report-builder-forms-analyzer .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer mat-dialog-container{flex:1 0 auto;min-width:512px;min-height:256px}ajf-report-builder-forms-analyzer .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-report-builder-forms-analyzer .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-forms-analyzer mat-tab-group .mat-tab-body-wrapper,ajf-report-builder-forms-analyzer mat-tab-group .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderFormsAnalyzer.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.forms;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.formsVariables;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.choicesOrigins;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.dialogRef;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.currentMainDataIndex;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._dataset;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._formAnalyzerSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderFormsAnalyzer.prototype._service;
    /** @type {?} */
    AjfReportBuilderFormsAnalyzer.prototype.dialog;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/image-filter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfImageFilterPipe {
    /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    transform(items, args) {
        return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => (args.length === 0) || item.info.toLowerCase().includes(args.toLowerCase())));
    }
}
AjfImageFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'ajfImageFilter'
            },] },
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/image-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component handle a group of image object
 * there are 2 types of view
 *  ajf-icon and class
 *
 * take a json in input
 *  'icon': 'false', // if true ajf-icon activated
 *  'class': ['flag-icon'], // add class in object style
 *  'prefixClass': 'flag-icon-', // prefix of class contained on data set
 *  'title': 'flags', title of data set
 *  'data': [
 *    {
 *      'class': 'dz', strind added on prefix
 *      'info': 'Algeria' info related to object (exploit on toolTip)
 *    }
 *  ]
 * };
 *
 * @export
 */
class AjfReportBuilderImageGroup {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._icon = null;
        this._classes = '';
        this.open = false;
        this.valueToSearch = '';
        /**
         * this event is fired when the user click on formula button on quill editor rool barƒ
         *
         * \@memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
     * @return {?}
     */
    get classes() { return this._classes; }
    /**
     * @param {?} fontSet
     * @param {?} fontIcon
     * @return {?}
     */
    setIcon(fontSet, fontIcon) {
        this._icon = { fontSet, fontIcon };
        this._service.setIcon(this._icon);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setFlag(value) {
        this._classes = value;
        this._service.setFlag(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setSearch(value) {
        this.valueToSearch = value.currentTarget.value;
    }
    /**
     * @return {?}
     */
    emitFormula() {
        this.formulaClick.emit();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getFlag(value) {
        /** @type {?} */
        let returnValue = '';
        for (let i = 0; i < this.data.class.length; i++) {
            returnValue += this.data.class[i] + ' ';
        }
        returnValue += this.data.prefixClass + value;
        return returnValue;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.open = !this.open;
    }
}
AjfReportBuilderImageGroup.decorators = [
    { type: Component, args: [{
                selector: 'ajf-image-group',
                template: "<ng-template [ngIf]=\"data != null\">\n  <button mat-button (click)=\"toggle()\" style=\"width:100%\">{{data.title}}</button>\n  <ng-template [ngIf]=\"open\">\n    <button mat-button (click)=\"emitFormula()\">Set formula</button>\n    <mat-card *ngIf=\"data.icon === 'true'\">\n      <mat-card-header>\n        {{data.title}}\n      </mat-card-header>\n      <mat-card-content>\n        <mat-grid-list cols=\"3\" rowHeight=\"100px\">\n          <ng-container *ngFor=\"let value of data.data\">\n            <mat-grid-tile *ngFor=\"let icon of value.icons\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setIcon(value.name, icon.name)\" [matTooltip]=\"icon.label\" matTooltipPosition=\"above\" mat-button>\n                <mat-icon\n                  [fontSet]=\"value.name\"\n                  [fontIcon]=\"icon.name\">\n                </mat-icon>\n              </button>\n            </mat-grid-tile>\n          </ng-container>\n        </mat-grid-list>\n      </mat-card-content>\n    </mat-card>\n    <mat-card *ngIf=\"data.icon === 'false'\">\n      <mat-card-header>\n        <mat-card-title>\n          {{data.title}}\n        </mat-card-title>\n        <mat-card-subtitle>\n          <mat-form-field>\n            <input matInput placeholder=\"{{data.title}} to search\" [(ngModel)]=\"valueToSearch\">\n          </mat-form-field>\n        </mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        <div class=\"ajf-image-group-container\">\n          <mat-grid-list cols=\"3\">\n            <mat-grid-tile *ngFor=\"let value of data.data | ajfImageFilter: valueToSearch\" [colspan]=\"1\" [rowspan]=\"1\">\n              <button style=\"height:100%\" (click)=\"setFlag(getFlag(value.class))\" matTooltip=\"{{value.info}}\" [matTooltipPosition]=\"'above'\" mat-button>\n                <span class={{getFlag(value.class)}} style=\"width: 100%;height: 100%;\"></span>\n              </button>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </div>\n      </mat-card-content>\n    </mat-card>\n    <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n  </ng-template>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-image-group mat-grid-list{height:300px !important;overflow-y:auto}ajf-image-group .mat-grid-list{height:300px !important}ajf-image-group mat-card>mat-card-content>.ajf-image-group-container{overflow-y:scroll;height:300px}ajf-image-group mat-icon{font-size:30px}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderImageGroup.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderImageGroup.propDecorators = {
    data: [{ type: Input }],
    formulaClick: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderImageGroup.prototype._icon;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderImageGroup.prototype._classes;
    /** @type {?} */
    AjfReportBuilderImageGroup.prototype.open;
    /** @type {?} */
    AjfReportBuilderImageGroup.prototype.valueToSearch;
    /** @type {?} */
    AjfReportBuilderImageGroup.prototype.data;
    /**
     * this event is fired when the user click on formula button on quill editor rool barƒ
     *
     * \@memberof QuillEditorComponent
     * @type {?}
     */
    AjfReportBuilderImageGroup.prototype.formulaClick;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderImageGroup.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/properties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderProperties {
    /**
     * @param {?} _dialog
     * @param {?} _service
     */
    constructor(_dialog, _service) {
        this._dialog = _dialog;
        this._service = _service;
        /**
         *  true when the first time chart type is setted
         *
         * \@memberOf AjfReportBuilderProperties
         */
        this.initChartType = false;
        /**
         * the current widget
         *
         * \@memberOf AjfReportBuilderProperties
         */
        this.currentWidget = null;
        /**
         * this array contains the forms exploited for generate data labels
         *
         * \@memberOf AjfReportBuilderProperties
         */
        this.forms = [];
        this.colors = [];
        /**
         * FAKE DATA
         */
        this.formsJson = { forms: [] };
        /**
         * WIDGET
         */
        this.widgetName = '';
        this.marginExpanded = false;
        this.paddingExpanded = false;
        this.borderWidthExpanded = false;
        this.borderRadiusExpanded = false;
        this.backgroundColor = '#127bdc';
        this.styleBackgroundColor = 'rgb(255,255,255,0)';
        this.borderColor = '#127bdc';
        this.styleColor = 'rgb(0,0,0,0)';
        this.align = [false, 'center', 'right', 'justify'];
        this.fonts = [
            false,
            'blackr',
            'black-italic',
            'bold',
            'bold-condensed',
            'bold-condensed-italic',
            'bold-italic',
            'condensed',
            'condensed-italic',
            'italic',
            'light',
            'light-italic',
            'medium',
            'medium-italic',
            'thinr',
            'thin-italic'
        ];
        this.currentModule = {};
        this.quillModules = {
            toolbar: [
                ['formula'],
                ['bold', 'italic', 'underline', 'strike'],
                // ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                // [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': this.colors },
                    { 'background': this.colors }],
                [{ 'font': this.fonts }],
                [{ 'align': this.align }],
                ['clean'],
            ]
        };
        this.chartBorderColor = [];
        this.chartBorderWidth = 3;
        /**
         *
         * IMAGE
         */
        this.imageUrl = 'https://angular.io/resources/images/logos/angular2/angular.png';
        /**
         *
         * TEXT
         */
        this.htmlText = '';
        /**
         * these variables indicate that the user want to change section
         */
        this.reportStyles = false;
        this.sectionStyles = false;
        this.widgetStyles = true;
        this.sectionColor = false;
        this.widgetColor = false;
        this.visibilitySection = false;
        this.currentColor = '';
        this._icon = null;
        this.iconSet = {
            'icon': 'true',
            'title': 'report',
            'data': null
        };
        this.flagSet = {
            'icon': 'false',
            'class': ['flag-icon'],
            'prefixClass': 'flag-icon-',
            'title': 'flags',
            'data': [
                {
                    'class': 'dz',
                    'info': 'Algeria'
                },
                {
                    'class': 'ao',
                    'info': 'Angola'
                },
                {
                    'class': 'bj',
                    'info': 'Benin'
                },
                {
                    'class': 'bw',
                    'info': 'Botswana'
                },
                {
                    'class': 'bf',
                    'info': 'Burkina Faso'
                },
                {
                    'class': 'bi',
                    'info': 'Burundi'
                },
                {
                    'class': 'cm',
                    'info': 'Cameroon'
                },
                {
                    'class': 'cv',
                    'info': 'Cabo Verde'
                },
                {
                    'class': 'cf',
                    'info': 'The Central African Republic'
                },
                {
                    'class': 'td',
                    'info': 'Chad'
                },
                {
                    'class': 'km',
                    'info': 'The Comoros'
                },
                {
                    'class': 'ci',
                    'info': 'Cote D\'avoire'
                },
                {
                    'class': 'cd',
                    'info': 'The Democratic Republic of Congo'
                },
                {
                    'class': 'dj',
                    'info': 'Dijibouti'
                },
                {
                    'class': 'eg',
                    'info': 'Egypt'
                },
                {
                    'class': 'gq',
                    'info': 'Equatorial Guinea'
                },
                {
                    'class': 'er',
                    'info': 'Eritrea'
                },
                {
                    'class': 'et',
                    'info': 'Ethiopia'
                },
                {
                    'class': 'tf',
                    'info': 'French Southern Territories'
                },
                {
                    'class': 'ga',
                    'info': 'Gabon'
                },
                {
                    'class': 'gm',
                    'info': 'The Gambia'
                },
                {
                    'class': 'gh',
                    'info': 'Ghana'
                },
                {
                    'class': 'gn',
                    'info': 'Guinea'
                },
                {
                    'class': 'gw',
                    'info': 'Guinea-Bissau'
                },
                {
                    'class': 'ke',
                    'info': 'Kenya'
                },
                {
                    'class': 'ls',
                    'info': 'Leshotho'
                },
                {
                    'class': 'lr',
                    'info': 'Liberia'
                },
                {
                    'class': 'ly',
                    'info': 'Libya'
                },
                {
                    'class': 'mg',
                    'info': 'Madagascar'
                },
                {
                    'class': 'mw',
                    'info': 'Malawy'
                },
                {
                    'class': 'ml',
                    'info': 'Mali'
                },
                {
                    'class': 'mr',
                    'info': 'Mauritania'
                },
                {
                    'class': 'mu',
                    'info': 'Mauritius'
                },
                {
                    'class': 'yt',
                    'info': 'Mayotte'
                },
                {
                    'class': 'ma',
                    'info': 'Marocco'
                },
                {
                    'class': 'mz',
                    'info': 'Mozambique'
                },
                {
                    'class': 'na',
                    'info': 'Namibia'
                },
                {
                    'class': 'ne',
                    'info': 'Niger'
                },
                {
                    'class': 'ng',
                    'info': 'Nigeria'
                },
                {
                    'class': 'cg',
                    'info': 'Republic of the Congo'
                },
                {
                    'class': 'rw',
                    'info': 'Rwnda'
                },
                {
                    'class': 're',
                    'info': 'rèunion'
                },
                {
                    'class': 'sh',
                    'info': 'Saint Helena, Ascension and Tristan da Cunha'
                },
                {
                    'class': 'st',
                    'info': 'Sao Tome and Principe'
                },
                {
                    'class': 'sn',
                    'info': 'Senegal'
                },
                {
                    'class': 'sc',
                    'info': 'Seychelles'
                },
                {
                    'class': 'sl',
                    'info': 'Sierra Leone'
                },
                {
                    'class': 'so',
                    'info': 'Somalia'
                },
                {
                    'class': 'za',
                    'info': 'South Africa'
                },
                {
                    'class': 'ss',
                    'info': 'South Sudan'
                },
                {
                    'class': 'sd',
                    'info': 'Sudan'
                },
                {
                    'class': 'sz',
                    'info': 'Swaziland'
                },
                {
                    'class': 'tz',
                    'info': 'Tanzania'
                },
                {
                    'class': 'tg',
                    'info': 'Togo'
                },
                {
                    'class': 'tn',
                    'info': 'Tunisia'
                },
                {
                    'class': 'ug',
                    'info': 'Uganda'
                },
                {
                    'class': 'eh',
                    'info': 'Western Sahara'
                },
                {
                    'class': 'zm',
                    'info': 'Zambia'
                },
                {
                    'class': 'zw',
                    'info': 'Zimbawe'
                },
                {
                    'class': 'iq',
                    'info': 'Iraq'
                },
                {
                    'class': 'lb',
                    'info': 'Lebanon'
                },
                {
                    'class': 'bd',
                    'info': 'Bangladesh'
                },
                {
                    'class': 'ir',
                    'info': 'Iran (Islamic Republic of)'
                },
                {
                    'class': 'my',
                    'info': 'Malaysia'
                },
                {
                    'class': 'np',
                    'info': 'Nepal'
                },
                {
                    'class': 'pk',
                    'info': 'Pakistan'
                },
                {
                    'class': 'th',
                    'info': 'Thailand'
                },
                {
                    'class': 'jo',
                    'info': 'Jordan'
                },
                {
                    'class': 'ye',
                    'info': 'Yemen'
                }
            ]
        };
        this._currentWidgetSub = Subscription.EMPTY;
        this._formsSub = Subscription.EMPTY;
        this._colorSub = Subscription.EMPTY;
        this._headerStyleSub = Subscription.EMPTY;
        this._contentStylesSub = Subscription.EMPTY;
        this._footerStylesSub = Subscription.EMPTY;
        this._originSub = Subscription.EMPTY;
        this._stylesUpdatesSubs = Subscription.EMPTY;
        this._updateWidgetMarginEvt = new EventEmitter();
        this._updateWidgetPaddingEvt = new EventEmitter();
        this._updateWidgetBorderWidthEvt = new EventEmitter();
        this._updateWidgetBorderRadiusEvt = new EventEmitter();
        this.tabValue = 'backgroundColor';
        this.setForms();
        this.iconSet.data = Object.keys(_service.iconSets).filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x != 'ajf-icon')).map((/**
         * @param {?} i
         * @return {?}
         */
        i => {
            return { name: i, icons: _service.iconSets[i] };
        }));
        this._headerStyleSub = this._service.headerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._contentStylesSub = this._service.contentStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._footerStylesSub = this._service.footerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._originSub = this._service.origin.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            this.origin = s;
        }));
    }
    /**
     * @return {?}
     */
    get currentLayoutWidget() {
        return (/** @type {?} */ (this.currentWidget));
    }
    /**
     * @return {?}
     */
    get currentTextWidget() {
        return (/** @type {?} */ (this.currentWidget));
    }
    /**
     * @return {?}
     */
    get icon() { return this._icon; }
    /**
       *
       * UTILS
       */
    /**
     * return a number value
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    toNumber(value) {
        /** @type {?} */
        let numberPattern = /^(-)?\d+/g;
        if (value == null) {
            return 0;
        }
        else {
            /** @type {?} */
            const matches = value.match(numberPattern);
            if (matches == null || matches.length == 0) {
                return 0;
            }
            return Number(matches[0]);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toNumberArray(value) {
        if (value == null) {
            return [];
        }
        else {
            return (value || '').replace('px', '').split(' ')
                .filter((/**
             * @param {?} v
             * @return {?}
             */
            v => v !== '' && v != null))
                .map((/**
             * @param {?} v
             * @return {?}
             */
            v => this.toNumber(v)));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    fillPxNumberArray(value) {
        /** @type {?} */
        const vl = value.length;
        switch (vl) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                /** @type {?} */
                const v = value[0];
                return [v, v, v, v];
            case 2:
                /** @type {?} */
                const v21 = value[0];
                /** @type {?} */
                const v22 = value[1];
                return [v21, v22, v21, v22];
            case 3:
                /** @type {?} */
                const v31 = value[0];
                /** @type {?} */
                const v32 = value[1];
                /** @type {?} */
                const v33 = value[2];
                return [v31, v32, v33, v32];
            default:
                return value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    percent(value) {
        /** @type {?} */
        let temp = this.roundTo(value * 100, 3);
        return temp;
    }
    /**
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
     * call to service to set the forms
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    setForms() {
        /** @type {?} */
        let forms = [];
        try {
            for (let i = 0; i < this.formsJson.forms.length; i++) {
                forms.push(deepCopy(this.formsJson.forms[i]));
            }
            this._service.setReportForms(forms);
        }
        catch (e) { }
    }
    /**
     * call to service to set the width of the idx column of layout widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} col
     * @param {?} idx
     *
     * @return {?}
     */
    instantColumnValue(col, idx) {
        if (col === null) {
            return;
        }
        this._service.instantColumnValue(col, idx);
    }
    /**
     *  force copy of style
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    // TODO delete this
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * call to service to add new style to widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setWidgetStyles(label, value) {
        this._service.setWidgetStyles(label, value);
        this.currentColor = value;
        this.setStyle();
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetMargin(idx, value) {
        this._updateWidgetMarginEvt.emit({ idx, value });
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetPadding(idx, value) {
        this._updateWidgetPaddingEvt.emit({ idx, value });
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetBorderWidth(idx, value) {
        this._updateWidgetBorderWidthEvt.emit({ idx, value });
    }
    /**
     * @param {?} idx
     * @param {?} value
     * @return {?}
     */
    setWidgetBorderRadius(idx, value) {
        this._updateWidgetBorderRadiusEvt.emit({ idx, value });
    }
    /**
     * call to service to add new style to section
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setSectionStyles(label, value) {
        this._service.setSectionStyles(this.origin, label, value);
        this.styleColor = value;
    }
    /**
     * call to service to add new style to report
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} label
     * @param {?} value
     *
     * @return {?}
     */
    setReportStyles(label, value) {
        this._service.setReportStyles(label, value);
        this.styleBackgroundColor = value;
    }
    /**
     * add custom color
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    addCustomColor() {
        this._service.addCustomColor(this.currentColor);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * get the module exploit to quill text editor
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     *
     */
    getModule() {
        return this.quillModules;
    }
    /**
     * true is the input type value is equal to current widget type
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     * @return {?}
     *
     */
    isChartTypeSelected(value) {
        if (this.initChartType == false) {
            return false;
        }
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.currentWidget));
        if (value === myObj.chartType) {
            return true;
        }
        else {
            return false;
        }
    }
    /* layout functions */
    /**
     * call to service to add a column to current layout widget
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    addColumn() {
        this._service.addColumn();
    }
    /**
     * call to service to add a obj to current layout widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} idx
     *
     * @return {?}
     */
    fixedColumn(idx) {
        this._service.fixedColumn(idx);
    }
    /**
     * call to service to remove obj of current layout widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} idx
     *
     * @return {?}
     */
    unfixedColumn(idx) {
        this._service.remove('unfixedColumn', idx);
    }
    /* image functions */
    /**
     * call to service to set image url
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @return {?}
     */
    setImageUrl() {
        this._service.setImageUrl(this.imageUrl);
    }
    /**
     * @param {?} icon
     * @return {?}
     */
    setIcon(icon) {
        this._icon = icon;
        this._service.setIcon(icon);
    }
    /* chart functions */
    /**
     * call to service to set the type of chart
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} type
     *
     * @return {?}
     */
    setChartType(type) {
        this.initChartType = true;
        this._service.setChartType(type);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChartBorderColor(value) {
        if (value == null) {
            return;
        }
        this._service.setChartBorderWidth(value);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setTab(event) {
        if (event.index === 0) {
            this.tabValue = 'backgroundColor';
        }
        else {
            this.tabValue = 'borderColor';
        }
    }
    /**
     * call to service to remove background color to current chart
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} index
     *
     * @return {?}
     */
    removeChartBackgroundColor(index) {
        this._service.removeChartBackgroundColor(index);
    }
    /**
     * call to service to remove border color to current chart
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} index
     *
     * @return {?}
     */
    removeChartBorderColor(index) {
        this._service.removeChartBorderColor(index);
    }
    /**
     * @return {?}
     */
    hideMenu() {
        this._service.updateCurrentWidget(null);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openFormulaDialog(event) {
        this.dialogRef = this._dialog.open(AjfReportBuilderFormsAnalyzerDialog);
        this.dialogRef.componentInstance.aggregation = AjfAggregationType.None;
        this.dialogRef.componentInstance.isFormula = true;
        if (event != null && event.reference != null) {
            this.dialogRef.componentInstance.formula = event.formula;
            this.dialogRef.componentInstance.reference = event.reference;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._formsSub = this._service.reportForms
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.forms = x || [];
        }));
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                    this.widgetName = AjfWidgetType[x.widgetType];
                    this.reportStyles = false;
                    this.sectionStyles = false;
                    this.widgetStyles = false;
                    this.sectionColor = false;
                    this.widgetColor = false;
                    this.visibilitySection = false;
                }
            }
            else {
                this.currentWidget = null;
                this.widgetName = '';
            }
        }));
        this._colorSub = this._service.colors
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x && x.length > 0) {
                this.colors = x;
                this.quillModules = {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        // ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],
                        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                        // [{ 'direction': 'rtl' }],                         // text direction
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'color': this.colors },
                            { 'background': this.colors }],
                        [{ 'font': this.fonts }],
                        [{ 'align': this.align }],
                        ['formula'],
                        ['clean'],
                    ]
                };
            }
        }));
        this.getHTML = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget != null) {
                /** @type {?} */
                const myObj = (/** @type {?} */ (this.currentWidget));
                return myObj.htmlText;
            }
            return '';
        })), distinctUntilChanged(), startWith('<p><br></p>'));
        this.getHeightWidget = this._service.currentWidget.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x != null)), map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                /** @type {?} */
                let value = this.toNumber(myObj.styles['height']);
                if (value != null || value != null) {
                    return value;
                }
            }
            return undefined;
        })), distinctUntilChanged());
        this.getFontSizeWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return (this.toNumber(myObj.styles['font-size']) || 12);
            }
            return undefined;
        })), distinctUntilChanged());
        this.getFontAlignWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return ((myObj.styles['text-align']) || 'center');
            }
            return undefined;
        })), distinctUntilChanged());
        this.getBorderWidthWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-width']));
            }
            return undefined;
        })), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderWidthWidgetTop = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getBorderWidthWidgetRight = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getBorderWidthWidgetBottom = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getBorderWidthWidgetLeft = this.getBorderWidthWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getBorderRadiusWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-radius']));
            }
            return undefined;
        })), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderRadiusWidgetTopLeft = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getBorderRadiusWidgetTopRight = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getBorderRadiusWidgetBottomRight = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getBorderRadiusWidgetBottomLeft = this.getBorderRadiusWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getMarginWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null && myObj.styles['margin'] != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['margin']));
            }
            return undefined;
        })), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getMarginWidgetTop = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getMarginWidgetRight = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getMarginWidgetBottom = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getMarginWidgetLeft = this.getMarginWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getPaddingWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null && myObj.styles['padding'] != null) {
                return this.fillPxNumberArray(this.toNumberArray(myObj.styles['padding']));
            }
            return undefined;
        })), distinctUntilChanged());
        this.getPaddingWidgetTop = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[0])));
        this.getPaddingWidgetRight = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[1])));
        this.getPaddingWidgetBottom = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[2])));
        this.getPaddingWidgetLeft = this.getPaddingWidget.pipe(filter((/**
         * @param {?} m
         * @return {?}
         */
        m => m != null)), map((/**
         * @param {?} m
         * @return {?}
         */
        m => (/** @type {?} */ (m))[3])));
        this.getBackgroundColorWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null) {
                return myObj.styles['backgroundColor'] || '';
            }
        })), distinctUntilChanged());
        this.getColorWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null && myObj.styles != null) {
                return myObj.styles['color'] || '';
            }
        })), distinctUntilChanged());
        this._stylesUpdatesSubs = ((/** @type {?} */ (this._updateWidgetMarginEvt)))
            .pipe(withLatestFrom(this.getMarginWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('margin', v);
        }));
        this._stylesUpdatesSubs.add(((/** @type {?} */ (this._updateWidgetPaddingEvt)))
            .pipe(withLatestFrom(this.getPaddingWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('padding', v);
        })));
        this._stylesUpdatesSubs
            .add(((/** @type {?} */ (this._updateWidgetBorderWidthEvt)))
            .pipe(withLatestFrom(this.getBorderWidthWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('border-width', v);
        })));
        this._stylesUpdatesSubs.add(((/** @type {?} */ (this._updateWidgetBorderRadiusEvt)))
            .pipe(withLatestFrom(this.getBorderRadiusWidget))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r == null) {
                return;
            }
            /** @type {?} */
            const idx = r[0].idx;
            /** @type {?} */
            const value = r[0].value;
            /** @type {?} */
            const v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('border-radius', v);
        })));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.currentWidget = changes.widget.currentValue;
        if (this.currentWidget == null) {
            return;
        }
        this.widgetName = AjfWidgetType[this.currentWidget.widgetType];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
        this._formsSub.unsubscribe();
        this._colorSub.unsubscribe();
        this._headerStyleSub.unsubscribe();
        this._contentStylesSub.unsubscribe();
        this._footerStylesSub.unsubscribe();
        this._originSub.unsubscribe();
        this._stylesUpdatesSubs.unsubscribe();
    }
}
AjfReportBuilderProperties.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-properties',
                template: "<ng-template [ngIf]=\"currentWidget != null\">\n  <div class=\"ajf-content\">\n    <button\n      mat-button\n      class=\"ajf-hide-menu\"\n      matTooltip=\"hide-menu\"\n      (click)=\"hideMenu()\"\n      [matTooltipPosition]=\"'above'\">\n      <mat-icon>remove_circle_outline</mat-icon>\n    </button>\n    <mat-button-toggle-group class=\"ajf-menu-css\">\n      <mat-button-toggle\n        (click)=\"reportStyles = !reportStyles; sectionStyles = false; widgetStyles = false\" value=\"left\"\n        [ngClass]=\"{'ajf-selected': reportStyles}\">\n        report\n        <ng-container translate>CSS style</ng-container>\n      </mat-button-toggle>\n      <mat-button-toggle\n        (click)=\"sectionStyles = !sectionStyles; reportStyles = false; widgetStyles = false\"\n        [ngClass]=\"{'ajf-selected': sectionStyles}\">\n        {{ origin }}\n        <ng-container translate>CSS style</ng-container>\n      </mat-button-toggle>\n      <mat-button-toggle\n        (click)=\"widgetStyles = !widgetStyles; sectionStyles = false; reportStyles = false\"\n        [ngClass]=\"{'ajf-selected': widgetStyles}\">\n        {{ widgetName }}\n        <ng-container translate>CSS style</ng-container>\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n    <div class=\"ajf-style-container\" *ngIf=\"(reportStyles) ? true : false \">\n      <mat-tab-group>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'report'\" [label]=\"'color'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n    <div class=\"ajf-style-container\" *ngIf=\"(sectionStyles) ? true : false \">\n      <mat-tab-group>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'section'\" [label]=\"'color'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n    <div class=\"ajf-style-container\" *ngIf=\"(widgetStyles) ? true : false \">\n      <mat-tab-group *ngIf=\"(currentWidget.widgetType != 4)\">\n        <mat-tab label=\"Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'widget'\" [label]=\"'color'\" [init]=\"'icon'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color [section]=\"'widget'\" [label]=\"'background-color'\"></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n      <div class=\"properties-container\" *ngIf=\"(currentWidget.widgetType !== 8)\">\n        <div class=\"ajf-layout-preview\">\n          <div class=\"ajf-vbottom\">\n            <div translate>height</div>\n            <div>{{ getHeightWidget|async }}</div>\n          </div>\n          <div class=\"ajf-margin-box\">\n            <div class=\"ajf-top-label\" translate>margin</div>\n            <div class=\"ajf-vtop\">{{ getMarginWidgetTop|async }}</div>\n            <div class=\"ajf-vright\">{{ getMarginWidgetRight|async }}</div>\n            <div class=\"ajf-vbottom\">{{ getMarginWidgetBottom|async }}</div>\n            <div class=\"ajf-vleft\">{{ getMarginWidgetLeft|async }}</div>\n            <div class=\"ajf-border-box\">\n              <div class=\"ajf-vtop\">{{ getBorderWidthWidgetTop|async }}</div>\n              <div class=\"ajf-vright\">{{ getBorderWidthWidgetRight|async }}</div>\n              <div class=\"ajf-vbottom\">{{ getBorderWidthWidgetBottom|async }}</div>\n              <div class=\"ajf-vleft\">{{ getBorderWidthWidgetLeft|async }}</div>\n              <div class=\"ajf-vtl\">{{ getBorderRadiusWidgetTopLeft|async }}</div>\n              <div class=\"ajf-vtr\">{{ getBorderRadiusWidgetTopRight|async }}</div>\n              <div class=\"ajf-vbr\">{{ getBorderRadiusWidgetBottomRight|async }}</div>\n              <div class=\"ajf-vbl\">{{ getBorderRadiusWidgetBottomLeft|async }}</div>\n              <div class=\"ajf-top-label\" translate>border</div>\n              <div class=\"ajf-padding-box\">\n                <div class=\"ajf-top-label\" translate>padding</div>\n                <div class=\"ajf-vtop\">{{ getPaddingWidgetTop|async }}</div>\n                <div class=\"ajf-vright\">{{ getPaddingWidgetRight|async }}</div>\n                <div class=\"ajf-vbottom\">{{ getPaddingWidgetBottom|async }}</div>\n                <div class=\"ajf-vleft\">{{ getPaddingWidgetLeft|async }}</div>\n                <div class=\"ajf-content-box\" translate>content</div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <mat-grid-list rowHeight=\"2em\" cols=\"12\">\n          <mat-grid-tile></mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>height</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('height', $event.value)\"\n              min=\"0\"\n              max=\"200\"\n              step=\"1\"\n              [value]=\"getHeightWidget|async\"\n              tickInterval=\"1\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!marginExpanded\"\n                (click)=\"marginExpanded = !marginExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"marginExpanded\"\n                (click)=\"marginExpanded = !marginExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>margin</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              [disabled]=\"marginExpanded\"\n              (change)=\"setWidgetStyles('margin', $event.value)\"\n              min=\"-50\"\n              max=\"50\"\n              step=\"1\"\n              [value]=\"getMarginWidgetTop|async\"\n              tickInterval=\"auto\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"marginExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin top</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(0, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(1, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin bottom</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(2, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>margin left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(3, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!paddingExpanded\"\n                (click)=\"paddingExpanded = !paddingExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"paddingExpanded\"\n                (click)=\"paddingExpanded = !paddingExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>padding</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('padding', $event.value)\"\n              min=\"-50\"\n              max=\"50\"\n              step=\"1\"\n              [value]=\"getPaddingWidgetTop|async\"\n              tickInterval=\"auto\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"paddingExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding top</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(0, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(1, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding bottom</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(2, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>padding left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(3, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!borderWidthExpanded\"\n                (click)=\"borderWidthExpanded = !borderWidthExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"borderWidthExpanded\"\n                (click)=\"borderWidthExpanded = !borderWidthExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>border width</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('border-width', $event.value)\"\n              min=\"0\"\n              max=\"10\"\n              step=\"1\"\n              [value]=\"getBorderWidthWidgetTop|async\"\n              tickInterval=\"1\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"borderWidthExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width top</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(0, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(1, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width bottom</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(2, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border width left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(3, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon *ngIf=\"!borderRadiusExpanded\"\n                (click)=\"borderRadiusExpanded = !borderRadiusExpanded\">keyboard_arrow_right</mat-icon>\n            <mat-icon *ngIf=\"borderRadiusExpanded\"\n                (click)=\"borderRadiusExpanded = !borderRadiusExpanded\">keyboard_arrow_down</mat-icon>\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span translate>border radius</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('border-radius', $event.value)\"\n              min=\"0\"\n              max=\"100\"\n              step=\"1\"\n              tickInterval=\"10\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"borderRadiusExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius top left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(0, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetTopLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius top right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(1, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetTopRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius bottom left</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(2, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetBottomLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span translate>border radius bottom right</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(3, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetBottomRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n      </div>\n      <div class=\"properties-container\" *ngIf=\"currentWidget.widgetType === 2\">\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile></mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"3\">\n            <span translate>font size</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('font-size', $event.value);\"\n              min=\"1\"\n              max=\"150\"\n              step=\"1\"\n              [value]=\"getFontSizeWidget|async\"\n              tickInterval=\"1\"\n              thumbLabel>\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n      </div>\n      <ng-template [ngIf]=\"currentWidget.widgetType === 5\">\n        <br>\n        <form>\n          <mat-form-field>\n            <input\n              matInput\n              [placeholder]=\"'Font size' | translate\"\n              [value]=\"getFontSizeWidget|async\"\n              [(ngModel)]=\"fontSize\"\n              [ngModelOptions]=\"{standalone: true}\"\n              (change)=\"setWidgetStyles('font-size', fontSize)\">\n          </mat-form-field>\n          <mat-select\n              (selectionChange)=\"setWidgetStyles('font-style', $event.value)\"\n              [placeholder]=\"'Font style' | translate\">\n            <mat-option translate value=\"normal\">Normal</mat-option>\n            <mat-option translate value=\"italic\">Italic</mat-option>\n            <mat-option translate value=\"oblique\">Oblique</mat-option>\n          </mat-select>\n          <mat-select\n              (selectionChange)=\"setWidgetStyles('text-align', $event.value)\"\n              [placeholder]=\"'Align' | translate\">\n            <mat-option translate value=\"center\">Center</mat-option>\n            <mat-option translate value=\"left\">Left</mat-option>\n            <mat-option translate value=\"right\">Right</mat-option>\n          </mat-select>\n        </form>\n      </ng-template>\n      <h1>\n        <ng-container translate>properties of</ng-container>\n        {{ widgetName }}\n      </h1>\n    </div>\n    <div [ngSwitch]=\"currentWidget.widgetType\">\n      <ng-template [ngSwitchCase]=\"0\">\n        <h1 translate>Column</h1>\n        <ng-template ngFor let-col [ngForOf]=\"currentLayoutWidget.columns\" let-idx=\"index\">\n          <mat-toolbar>\n              <mat-toolbar-row *ngIf=\"col !== -1\">\n                <mat-grid-list cols=\"12\">\n                  <mat-grid-tile colspan=\"1\">\n                    {{idx + 1}}\n                  </mat-grid-tile>\n                  <mat-grid-tile colspan=\"9\">\n                    <mat-slider\n                      style=\"width: 90%;\"\n                      min=\"0.1\"\n                      max=\"1\"\n                      step=\"0.01\"\n                      value=\"{{col}}\"\n                      thumb-label=\"true\"\n                      tick-interval=\"true\"\n                      (change)=\"instantColumnValue($event.value,idx)\">\n                    </mat-slider>\n                    {{percent(col)}}%\n                  </mat-grid-tile>\n                  <mat-grid-tile colspan=\"2\">\n                    <button style=\"width: 5%;\" mat-button (click)=\"fixedColumn(idx)\">fixed</button>\n                  </mat-grid-tile>\n                </mat-grid-list>\n              </mat-toolbar-row>\n              <mat-toolbar-row *ngIf=\"col == -1\">\n                <mat-grid-list cols=\"12\">\n                  <mat-grid-tile colspan=\"1\">\n                    {{idx + 1}}\n                  </mat-grid-tile>\n                  <mat-grid-tile colspan=\"11\">\n                    <button  style=\"width: 90%;\" mat-button (click)=\"unfixedColumn(idx)\">percent</button>\n                  </mat-grid-tile>\n                </mat-grid-list>\n              </mat-toolbar-row>\n          </mat-toolbar>\n        </ng-template>\n        <mat-toolbar>\n          <mat-toolbar-row>\n            <button mat-button\n                translate\n                (click)=\"addColumn()\"\n                *ngIf=\"currentLayoutWidget.columns.length < 10\">Add column</button>\n          </mat-toolbar-row>\n        </mat-toolbar>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"2\">\n        <ajf-image-group (formulaClick)=\"openFormulaDialog($event)\" [data]=\"iconSet\"></ajf-image-group>\n        <ajf-image-group (formulaClick)=\"openFormulaDialog($event)\" [data]=\"flagSet\"></ajf-image-group>\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n        <input\n            mat-input\n            [placeholder]=\"'paste a link' | translate\"\n            style=\"width: 100%;\"\n            [(ngModel)]=\"imageUrl\">\n        <button mat-button (click)=\"setImageUrl()\"\n            translate>Set image</button>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"3\">\n        <div style=\"width:500px;\">\n          <ajf-quill-editor\n            [(ngModel)]=\"currentTextWidget.htmlText\"\n            [modules]=\"getModule()\"\n            [maxLength]=\"200\"\n            [theme]=\"bubble\"\n            [initHTML]=\"(getHTML|async) || ''\"\n            (formulaClick)=\"openFormulaDialog($event)\">\n          </ajf-quill-editor>\n        </div>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"4\">\n        <h3 translate>Choose type of Chart</h3>\n        <mat-button-toggle-group class=\"ajf-chart-buttons\">\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-linechart\"\n              (click)=\"setChartType(0)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-linechart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-barchartvertical\"\n              (click)=\"setChartType(1)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barchartvertical\">\n              </mat-icon>\n              </mat-button-toggle>\n            <mat-button-toggle\n                value=\"reportbuilder-bubblechart\"\n                (click)=\"setChartType(8)\">\n                <mat-icon\n                  fontSet=\"ajf-icon\"\n                  fontIcon=\"reportbuilder-bubblechart\">\n                </mat-icon>\n              </mat-button-toggle>\n          </div>\n          <div class=row>\n            <mat-button-toggle\n              value=\"reportbuilder-barcharthorizontal\"\n              (click)=\"setChartType(2)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barcharthorizontal\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-radarchart\"\n              (click)=\"setChartType(3)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-radarchart\">\n              </mat-icon>\n            </mat-button-toggle>\n             <mat-button-toggle\n              value=\"reportbuilder-barchartvertical\"\n              (click)=\"setChartType(1)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barchartvertical\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-scatterchart\"\n              (click)=\"setChartType(4)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-scatterchart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-polarareachart\"\n              (click)=\"setChartType(5)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-polarareachart\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-piechart\"\n              (click)=\"setChartType(6)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-piechart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-donoughtchart\"\n              (click)=\"setChartType(7)\">\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-donoughtchart\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n        </mat-button-toggle-group>\n        <h3 translate>Labels</h3>\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n        <ajf-theme-color [section]=\"'chart'\" [label]=\"tabValue\"></ajf-theme-color>\n          <mat-card>\n            <mat-card-header>\n              <mat-card-title>Border width</mat-card-title>\n            </mat-card-header>\n            <mat-card-content>\n              <mat-slider\n                min=\"1\"\n                max=\"100\"\n                style=\"width:99%;\"\n                step=\"1\"\n                (change)=\"setChartBorderColor($event.value)\"\n                [value]=\"chartBorderWidth\"\n                tickInterval=\"auto\"\n                thumbLabel>\n              </mat-slider>\n            </mat-card-content>\n          </mat-card>\n          <mat-tab-group (selectChange)=\"setTab($event)\">\n            <mat-tab label=\"Background\">\n              <mat-list>\n                <ng-template ngFor let-color [ngForOf]=\"(getChartBackgroundColor|async)\" let-idx=\"index\">\n                  <mat-list-item>\n                    <span [style.background]=\"color\">\n                      {{ color }}\n                    </span>\n                    <button mat-button translate\n                        (click)=\"removeChartBackgroundColor(idx)\">Remove</button>\n                  </mat-list-item>\n                </ng-template>\n              </mat-list>\n            </mat-tab>\n            <mat-tab label=\"Border\">\n              <mat-list>\n                <ng-template ngFor let-color [ngForOf]=\"(getChartBorderColor|async)\" let-idx=\"index\">\n                  <mat-list-item>\n                    <span [style.background]=\"color\">\n                      {{ color }}\n                    </span>\n                    <button mat-button (click)=\"removeChartBorderColor(idx)\">remove</button>\n                  </mat-list-item>\n                </ng-template>\n              </mat-list>\n            </mat-tab>\n          </mat-tab-group>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"5\">\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n      </ng-template>\n    </div>\n    <button mat-button\n        (click)=\"visibilitySection = !visibilitySection\"\n        [ngClass]=\"{'ajf-selected': visibilitySection}\">\n      {{ widgetName }}\n      <ng-container translate>Visibility</ng-container>\n    </button>\n    <div [style.display]=\"visibilitySection ? 'block' : 'none'\">\n      <ajf-report-builder-condition-editor [visibility]=\"currentWidget.visibility\"></ajf-report-builder-condition-editor>\n    </div>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-properties .ajf-selected{background-color:darkred;color:#fff}ajf-report-builder-properties .ajf-style-container{height:auto;width:100%;position:relative;margin-bottom:60px;text-align:center}ajf-report-builder-properties .ajf-style-container mat-tab-group .ajf-style-panel{min-height:350px}ajf-report-builder-properties .ajf-style-container .ajf-style-background,ajf-report-builder-properties .ajf-style-container .ajf-style-color{width:100%;height:350px;position:relative;margin:30px}ajf-report-builder-properties .ajf-style-container .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-tab-body-wrapper,ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-properties .ajf-content{margin-top:10px;margin-right:15px;margin-bottom:290px;margin-left:15px}ajf-report-builder-properties .ajf-content .ajf-menu-css{width:100% !important;font-size:10px !important}ajf-report-builder-properties .ajf-content .ajf-menu-css mat-button-toggle{width:33% !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group{width:100% !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle{width:auto !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle mat-icon{margin:15px}ajf-report-builder-properties button{width:100%;margin-bottom:30px}ajf-report-builder-properties .ajf-hide-menu{width:auto !important}ajf-report-builder-properties h1,ajf-report-builder-properties h3,ajf-report-builder-properties h5{text-align:center}ajf-report-builder-properties .ajf-row{display:flex;flex-direction:column;width:100%}ajf-report-builder-properties .mat-tab-body.mat-tab-active{min-height:600px}ajf-report-builder-properties mat-grid-list{width:100%}ajf-report-builder-properties mat-grid-tile{overflow:visible !important}ajf-report-builder-properties mat-grid-tile.ajf-lal{text-align:left}ajf-report-builder-properties .ajf-chart-buttons mat-icon{font-size:15px}ajf-report-builder-properties .ajf-layout-preview{background-color:#fff;width:100%;font-size:.9em;box-sizing:border-box;position:relative}ajf-report-builder-properties .ajf-layout-preview .ajf-top-label{position:absolute;top:1em;left:1em;text-align:left}ajf-report-builder-properties .ajf-layout-preview .ajf-vtop{position:absolute;top:1em;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vbottom{position:absolute;bottom:0;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vright{position:absolute;top:50%;right:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vleft{position:absolute;top:50%;left:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtl{position:absolute;top:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtr{position:absolute;top:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbl{position:absolute;bottom:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbr{position:absolute;bottom:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box{background-color:#fff;padding:3em;position:relative;border:solid 1px #ccc}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box{background-color:#ddd;padding:3em;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box>.ajf-top-label{left:4em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box{padding:3em;background-color:#aaa;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box .ajf-content-box{background-color:#888;padding:2em;text-align:center;box-sizing:border-box}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderProperties.ctorParameters = () => [
    { type: MatDialog },
    { type: AjfReportBuilderService }
];
if (false) {
    /**
     *  true when the first time chart type is setted
     *
     * \@memberOf AjfReportBuilderProperties
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.initChartType;
    /**
     * the current widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.currentWidget;
    /**
     * this array contains the forms exploited for generate data labels
     *
     * \@memberOf AjfReportBuilderProperties
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.forms;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.colors;
    /**
     * the name of the section that contains the currentWidget
     *
     * \@memberOf AjfReportBuilderProperties
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.origin;
    /**
     * FAKE DATA
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.formsJson;
    /**
     * WIDGET
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.widgetName;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getHTML;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getHeightWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getFontSizeWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getFontAlignWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBackgroundColorWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getColorWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getStyle;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getChartBackgroundColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getChartBorderColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getVisibility;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.marginExpanded;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getMarginWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getMarginWidgetTop;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getMarginWidgetRight;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getMarginWidgetBottom;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getMarginWidgetLeft;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.paddingExpanded;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getPaddingWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getPaddingWidgetTop;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getPaddingWidgetRight;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getPaddingWidgetBottom;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getPaddingWidgetLeft;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.borderWidthExpanded;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderWidthWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderWidthWidgetTop;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderWidthWidgetRight;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderWidthWidgetBottom;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderWidthWidgetLeft;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.borderRadiusExpanded;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderRadiusWidget;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderRadiusWidgetTopLeft;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderRadiusWidgetTopRight;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderRadiusWidgetBottomRight;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.getBorderRadiusWidgetBottomLeft;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.backgroundColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.styleBackgroundColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.borderColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.styleColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.wbackgroundColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.fontSize;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.bubble;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.dialogRef;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.container;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.align;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.fonts;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.currentModule;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.quillModules;
    /**
     * CHART
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.getChartYLabels;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.chartBorderColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.chartBorderWidth;
    /**
     *
     * IMAGE
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.imageUrl;
    /**
     *
     * TEXT
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.htmlText;
    /**
     * these variables indicate that the user want to change section
     * @type {?}
     */
    AjfReportBuilderProperties.prototype.reportStyles;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.sectionStyles;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.widgetStyles;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.sectionColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.widgetColor;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.visibilitySection;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.currentColor;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._icon;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.iconSet;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.flagSet;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._formsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._colorSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._headerStyleSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._contentStylesSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._footerStylesSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._originSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._stylesUpdatesSubs;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._updateWidgetMarginEvt;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._updateWidgetPaddingEvt;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._updateWidgetBorderWidthEvt;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._updateWidgetBorderRadiusEvt;
    /** @type {?} */
    AjfReportBuilderProperties.prototype.tabValue;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderProperties.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/quill-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfQuillEditor {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _service
     */
    constructor(_elementRef, _renderer, _service) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._service = _service;
        this.emptyArray = [];
        this._init = false;
        this.dateFormats = [
            {
                'label': 'June 23rd 2017, 12:39:12 pm',
                'value': 'MMMM Do YYYY, h:mm:ss a',
                'validator': 'MMMMDoYYYYhmmssa'
            }, {
                'label': 'Friday',
                'value': 'dddd',
                'validator': 'dddd'
            }, {
                'label': 'Jun 23rd 17',
                'value': 'MMM Do YY',
                'validator': 'MMMDoYY'
            }
        ];
        this.fonts = [
            false,
            'blackr',
            'black-italic',
            'bold',
            'bold-condensed',
            'bold-condensed-italic',
            'bold-italic',
            'condensed',
            'condensed-italic',
            'italic',
            'light',
            'light-italic',
            'medium',
            'medium-italic',
            'thinr',
            'thin-italic'
        ];
        this.defaultModules = {
            formula: true,
            toolbar: [
                ['formula'],
                ['bold', 'italic', 'underline', 'strike'],
                // ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                // [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': this.emptyArray.slice() },
                    { 'background': this.emptyArray.slice() }],
                [{ 'font': this.fonts }],
                [{ 'align': this.emptyArray.slice() }],
                ['clean'],
            ]
        };
        this.font = Quill.import('formats/font');
        this.editorCreated = new EventEmitter();
        this.contentChanged = new EventEmitter();
        this.selectionChanged = new EventEmitter();
        /**
         * this event is fired when the user click on formula button on quill editor rool barƒ
         *
         * \@memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
        this.onModelChange = (/**
         * @return {?}
         */
        () => { });
        this.onModelTouched = (/**
         * @return {?}
         */
        () => { });
        this._formulas = [];
        this._formulaTextSub = Subscription.EMPTY;
        this.font.whitelist = this.fonts;
        this.font.whitelist.push('regular');
        this._formulaTextSub =
            this._service.getFormulaToHtmlEvent()
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // reference is defined only when the user want to edit the formula
                if (event.reference !== undefined) {
                    event.reference.innerHTML = event.formula;
                    this._renderer.setAttribute(event.reference, 'formula', event.formula);
                    /** @type {?} */
                    const efs = this._formulas.filter((/**
                     * @param {?} f
                     * @return {?}
                     */
                    f => f.formula === event.reference));
                    /** @type {?} */
                    let formulaEntry;
                    /** @type {?} */
                    let unlisten;
                    if (efs.length > 0) {
                        formulaEntry = efs[0];
                        unlisten = formulaEntry.unlisten;
                        if (unlisten != null) {
                            unlisten();
                        }
                    }
                    else {
                        formulaEntry = { formula: event.reference, unlisten: null };
                        this._formulas.push(formulaEntry);
                    }
                    formulaEntry.unlisten = this._renderer.listen(event.reference, 'click', (/**
                     * @return {?}
                     */
                    () => {
                        /** @type {?} */
                        let obj = {
                            'formula': event.formula,
                            'reference': event.reference
                        };
                        this.formulaClick.emit(obj);
                    }));
                }
                else {
                    /** @type {?} */
                    const quillEditor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    /** @type {?} */
                    const link = this._renderer.createElement('a');
                    this._renderer.setAttribute(link, 'href', 'javascript:void(0)');
                    this._renderer.setStyle(link, 'cursor', 'pointer');
                    this._renderer.setAttribute(link, 'formula', this.check(event.formula));
                    /** @type {?} */
                    const linkLabel = this._renderer.createText(event.formula);
                    this._renderer.appendChild(link, linkLabel);
                    // add listener related on the click event of the new formula
                    /** @type {?} */
                    const unlisten = this._renderer.listen(link, 'click', (/**
                     * @param {?} _
                     * @return {?}
                     */
                    (_) => {
                        /** @type {?} */
                        let obj = {
                            'formula': this.check(event.formula),
                            'reference': link
                        };
                        this.formulaClick.emit(obj);
                    }));
                    this._renderer.appendChild(quillEditor, link);
                    this._formulas.push({ unlisten, formula: link });
                }
            }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    check(value) {
        for (let i = 0; i < this.dateFormats.length; i++) {
            if (this.dateFormats[i].value == value) {
                return this.dateFormats[i].validator;
            }
        }
        return (/** @type {?} */ (value));
    }
    /**
     * this function search fomulas inside the init text
     * and allocate the related listener on click event
     *
     * \@memberof QuillEditorComponent
     * @return {?}
     */
    setHTML() {
        this.writeValue(this.initHTML);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const toolbarElem = this._elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
        /** @type {?} */
        let modules = this.modules || this.defaultModules;
        Quill.register(this.font, true);
        if (toolbarElem) {
            modules['toolbar'] = toolbarElem;
            modules['formula'] = true;
        }
        this._elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
        this.editorElem = this._elementRef.nativeElement.querySelector('[quill-editor-element]');
        this.quillEditor = new Quill(this.editorElem, {
            modules: modules,
            placeholder: this.placeholder || 'Insert text here ...',
            readOnly: this.readOnly || false,
            theme: this.theme || 'snow',
            formats: this.formats
        });
        this.editorCreated.emit(this.quillEditor);
        this.setHTML();
        // mark model as touched if editor lost focus
        this.quillEditor.on('selection-change', (/**
         * @param {?} range
         * @param {?} oldRange
         * @param {?} source
         * @return {?}
         */
        (range, oldRange, source) => {
            this.selectionChanged.emit({
                editor: this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source
            });
            if (!range) {
                this.onModelTouched();
            }
        }));
        // update model if text changes
        this.quillEditor.on('text-change', (/**
         * @param {?} delta
         * @param {?} oldDelta
         * @param {?} source
         * @return {?}
         */
        (delta, oldDelta, source) => {
            /** @type {?} */
            let html = this.editorElem.children[0].innerHTML;
            /** @type {?} */
            const text = this.quillEditor.getText();
            if (html === '<p><br></p>') {
                html = null;
            }
            this.onModelChange(html);
            this.contentChanged.emit({
                editor: this.quillEditor,
                html: html,
                text: text,
                delta: delta,
                oldDelta: oldDelta,
                source: source
            });
        }));
        /** @type {?} */
        let elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
        this.listenFunc = this._renderer.listen(elem, 'click', (/**
         * @param {?} _
         * @return {?}
         */
        (_) => {
            this.formulaClick.emit();
        }));
    }
    /**
     * @param {?} currentValue
     * @return {?}
     */
    writeValue(currentValue) {
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                if (currentValue == this.initHTML && !this._init) {
                    /** @type {?} */
                    let editor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    editor.innerHTML = this.initHTML;
                    /** @type {?} */
                    let allFormulas = this._elementRef.nativeElement.querySelectorAll('[formula]');
                    allFormulas.forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    (elem) => {
                        /** @type {?} */
                        const unlisten = this._renderer.listen(elem, 'click', (/**
                         * @param {?} _
                         * @return {?}
                         */
                        (_) => {
                            /** @type {?} */
                            let obj = {
                                'formula': this.check(elem.innerText),
                                'reference': elem
                            };
                            this.formulaClick.emit(obj);
                        }));
                        this._renderer.setStyle(elem, 'cursor', 'pointer');
                        this._formulas.push({ unlisten, formula: elem });
                        this._init = true;
                    }));
                }
                else if (currentValue != this.initHTML) {
                    this.quillEditor.pasteHTML(currentValue);
                }
                return;
            }
            this.quillEditor.setText('');
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} _c
     * @return {?}
     */
    validate(_c) {
        if (!this.quillEditor) {
            return null;
        }
        /** @type {?} */
        let err = {};
        /** @type {?} */
        let valid = true;
        /** @type {?} */
        const textLength = this.quillEditor.getText().trim().length;
        if (this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = textLength >= this.minLength || !textLength;
        }
        if (this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
            valid = textLength <= this.maxLength && valid;
        }
        return valid ? null : err;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['readOnly'] && this.quillEditor) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }
        if (changes['modules'] && this.quillEditor) {
            Quill.register(this.font, true);
            this.quillEditor = new Quill(this.editorElem, {
                modules: changes['modules']['currentValue'],
                placeholder: this.placeholder || 'Insert text here ...',
                readOnly: this.readOnly || false,
                theme: this.theme || 'snow',
                formats: this.formats
            });
            this._elementRef.nativeElement.children[0].remove();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (let i = 0; i < this._formulas.length; i++) {
            /** @type {?} */
            let unlisten = this._formulas[i].unlisten;
            if (unlisten != null) {
                unlisten();
            }
        }
        this._formulaTextSub.unsubscribe();
    }
}
AjfQuillEditor.decorators = [
    { type: Component, args: [{
                selector: 'ajf-quill-editor',
                template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)),
                        multi: true
                    }, {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"]
            }] }
];
/** @nocollapse */
AjfQuillEditor.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: AjfReportBuilderService }
];
AjfQuillEditor.propDecorators = {
    theme: [{ type: Input }],
    modules: [{ type: Input }],
    readOnly: [{ type: Input }],
    placeholder: [{ type: Input }],
    maxLength: [{ type: Input }],
    minLength: [{ type: Input }],
    formats: [{ type: Input }],
    initHTML: [{ type: Input }],
    editorCreated: [{ type: Output }],
    contentChanged: [{ type: Output }],
    selectionChanged: [{ type: Output }],
    formulaClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AjfQuillEditor.prototype.quillEditor;
    /** @type {?} */
    AjfQuillEditor.prototype.editorElem;
    /** @type {?} */
    AjfQuillEditor.prototype.emptyArray;
    /** @type {?} */
    AjfQuillEditor.prototype.content;
    /** @type {?} */
    AjfQuillEditor.prototype.listenFunc;
    /** @type {?} */
    AjfQuillEditor.prototype.previewElemFormula;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._init;
    /** @type {?} */
    AjfQuillEditor.prototype.dateFormats;
    /** @type {?} */
    AjfQuillEditor.prototype.fonts;
    /** @type {?} */
    AjfQuillEditor.prototype.defaultModules;
    /** @type {?} */
    AjfQuillEditor.prototype.font;
    /** @type {?} */
    AjfQuillEditor.prototype.theme;
    /** @type {?} */
    AjfQuillEditor.prototype.modules;
    /** @type {?} */
    AjfQuillEditor.prototype.readOnly;
    /** @type {?} */
    AjfQuillEditor.prototype.placeholder;
    /** @type {?} */
    AjfQuillEditor.prototype.maxLength;
    /** @type {?} */
    AjfQuillEditor.prototype.minLength;
    /** @type {?} */
    AjfQuillEditor.prototype.formats;
    /** @type {?} */
    AjfQuillEditor.prototype.initHTML;
    /** @type {?} */
    AjfQuillEditor.prototype.editorCreated;
    /** @type {?} */
    AjfQuillEditor.prototype.contentChanged;
    /** @type {?} */
    AjfQuillEditor.prototype.selectionChanged;
    /**
     * this event is fired when the user click on formula button on quill editor rool barƒ
     *
     * \@memberof QuillEditorComponent
     * @type {?}
     */
    AjfQuillEditor.prototype.formulaClick;
    /** @type {?} */
    AjfQuillEditor.prototype.onModelChange;
    /** @type {?} */
    AjfQuillEditor.prototype.onModelTouched;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._formulas;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._formulaTextSub;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/renderer-widget.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderRendererWidget {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        this.currentContentWidget = null;
        this._onDraggedSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get widgetTypes() {
        return AjfWidgetType;
    }
    /**
     * @return {?}
     */
    get layoutWidget() {
        return (/** @type {?} */ (this.widget));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canDropPredicate(item) {
        for (let i = 0; i < item.data.dropZones.length; i++) {
            if (['header', 'widget'].indexOf(item.data.dropZones[i]) > -1) {
                return true;
            }
        }
        return false;
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            s.unsubscribe();
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
    /**
     * @return {?}
     */
    getColumnContent() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        return (/** @type {?} */ (myObj.content));
    }
    /**
     * @return {?}
     */
    getIcon() {
        /** @type {?} */
        const defVal = { fontSet: '', fontIcon: '' };
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.icon == null) {
            return null;
        }
        return evaluateExpression(myObj.icon.formula) || defVal;
    }
    /**
     * @return {?}
     */
    getFlag() {
        /** @type {?} */
        const defVal = 'ch';
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.flag == null) {
            return null;
        }
        return evaluateExpression(myObj.flag.formula) || defVal;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getPercent(index) {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        /** @type {?} */
        const percent = myObj.columns[index] * 100;
        return `${percent.toString()}%`;
    }
    /**
     * @return {?}
     */
    getImageUrl() {
        /** @type {?} */
        const defVal = '';
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.url == null) {
            return null;
        }
        return evaluateExpression(myObj.url.formula) || defVal;
    }
    /**
     * @return {?}
     */
    getImageType() {
        return this.widget != null ? ((/** @type {?} */ (this.widget))).imageType : AjfImageType.Image;
    }
    /**
     * @return {?}
     */
    getHtmlText() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.htmlText === '') {
            return '...';
        }
        else {
            return myObj.htmlText;
        }
    }
    /**
     * @return {?}
     */
    getCoordinate() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.coordinate == null) {
            return [51.505, -0.09, 13];
        }
        else {
            return (/** @type {?} */ (myObj.coordinate));
        }
    }
    /**
     * @return {?}
     */
    getTileLayer() {
        /** @type {?} */
        const myObj = (/** @type {?} */ (this.widget));
        if (myObj.tileLayer === '') {
            return 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        }
        else {
            return myObj.tileLayer;
        }
    }
    /**
     * @return {?}
     */
    getAttribution() {
        /** @type {?} */
        let myObj;
        myObj = (/** @type {?} */ (this.widget));
        if (myObj.attribution === '') {
            return "&copy; <a href='http://osm.org/copyright'>O</a> contributors";
        }
        else {
            return myObj.attribution;
        }
    }
    /**
     * @param {?} event
     * @param {?} toColumn
     * @return {?}
     */
    addToList(event, toColumn) {
        this.onDragEndHandler();
        this._service.addToColumn(event, toColumn);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this.getChartType = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return 0;
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            return (/** @type {?} */ ((myObj.chartType)));
        })), distinctUntilChanged(), startWith(0));
        this.getDataset = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget != null && ((/** @type {?} */ (widget))).dataset != null) {
                /** @type {?} */
                const myObj = (/** @type {?} */ (this.widget));
                return (/** @type {?} */ (myObj.dataset));
            }
            else {
                return [];
            }
        })), distinctUntilChanged());
        this.getTableTitles = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return [];
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            if (myObj.dataset != null) {
                /** @type {?} */
                let tableTitle = [];
                for (let i = 0; i < myObj.dataset.length; i++) {
                    if (myObj.dataset[i][0] != null) {
                        tableTitle.push(myObj.dataset[i][0].label || '');
                    }
                }
                return tableTitle;
            }
            else {
                return [];
            }
        })));
        this.getTableContent = this._service.currentWidget.pipe(map((/**
         * @param {?} widget
         * @return {?}
         */
        (widget) => {
            if (widget == null) {
                return [];
            }
            /** @type {?} */
            const myObj = (/** @type {?} */ (this.widget));
            if (myObj.dataset != null) {
                /** @type {?} */
                let tableContent = [];
                for (let i = 0; i < myObj.dataset.length; i++) {
                    for (let j = 0; j < myObj.dataset[i].length; j++) {
                        if ((myObj.dataset[i] != null) && (myObj.dataset[i][j + 1] != null)) {
                            if (tableContent[j] == null) {
                                tableContent[j] = [];
                            }
                            if (tableContent[j][i] == null) {
                                tableContent[j][i] = ' ';
                            }
                            tableContent[j].splice(i, 1, myObj.dataset[i][j + 1].label || '');
                        }
                    }
                }
                return tableContent;
            }
            return [];
        })));
        this._service.updateCurrentWidget(this.widget);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.widget && changes.widget.currentValue != null) {
            this.widget = changes.widget.currentValue;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
    }
}
AjfReportBuilderRendererWidget.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-renderer-widget',
                template: "<div class=\"ajf-container\"\n    [ngSwitch]=\"widget?.widgetType\"\n    [ngClass]=\"{'ajf-drag-mode': (onDragged || fixedZoom)}\">\n  <div *ngSwitchCase=\"widgetTypes.Layout\" class=\"ajf-row ajf-layout\"\n    [applyStyles]=\"widget.styles\">\n      <div class=\"ajf-columns\">\n        <ng-template ngFor let-clm [ngForOf]=\"getColumnContent()\" let-idx=\"index\">\n          <div class=\"ajf-column\"\n            [ngClass]=\"{'ajf-fixed': layoutWidget.columns[idx] == -1}\"\n            [style.width]=getPercent(idx)\n            [applyStyles]=\"layoutWidget.content[idx].styles\">\n            <ajf-report-builder-widgets-row-buttons\n              [from]=\"'layout'\"\n              [fromWidget]=\"widget\"\n              [widget]=\"clm\"\n              [position]=\"idx\"\n              (onDragStart)=\"onDragStartHandler();\"\n              (onDragEnd)=\"onDragEndHandler();\"\n              [child]=\"true\">\n            </ajf-report-builder-widgets-row-buttons>\n            <ajf-column\n              [column]=\"clm\"\n              [applyStyles]=\"widget.styles\">\n            </ajf-column>\n            <ng-template [ngIf]=\"onDragged === true\">\n              <div cdkDropList\n                [cdkDropListEnterPredicate]=\"canDropPredicate\"\n                [style.display]=\"onDragged ? 'block' : 'none'\"\n                (cdkDropListDropped)=\"addToList($event, clm)\"\n                class=\"ajf-column-drop-zone\"\n                (dragover)=\"layoutShow = true;\"\n                (dragleave)=\"layoutShow = false;\">\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n      </div>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Image\" class=\"ajf-row\">\n    <ajf-image\n      [applyStyles]=\"widget.styles\"\n      [type]=\"getImageType()\"\n      [imageUrl]=\"getImageUrl()\"\n      [icon]=\"getIcon()\"\n      [flag]=\"getFlag()\">\n    </ajf-image>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Text\" class=\"ajf-row ajf-text\">\n    <ajf-text [htmlText]=\"getHtmlText() | translate\"  [applyStyles]=\"widget.styles\"></ajf-text>\n  </div>\n  <div *ngSwitchCase=\"widgetTypes.Chart\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n  </div>\n  <!-- <div *ngSwitchCase=\"widgetTypes.Table\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-table *ngIf=\"getTableContent|async as tc\" [data]=\"tc!\" ></ajf-table>\n  </div> -->\n  <div *ngSwitchCase=\"widgetTypes.Map\" class=\"ajf-row\" [applyStyles]=\"widget.styles\">\n    <ajf-map [coordinate]=\"getCoordinate()\" [tileLayer]=\"getTileLayer()\" [attribution]=\"getAttribution()\">\n    </ajf-map>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-layout{border:none !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row{border:9px solid blue;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns{border:9px solid red !important;height:100%;margin-bottom:20px;padding-bottom:20px;padding-top:20px}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-fixed{border:9px solid #ff0 !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column{border:9px solid #9acd32;margin-left:10px;margin-right:10px;border-radius:36px;height:100%}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-drag-mode .ajf-row .ajf-columns .ajf-column .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-container{height:inherit;display:block;min-height:50px}ajf-report-builder-renderer-widget .ajf-row-button{width:100%}ajf-report-builder-renderer-widget .ajf-container:hover{border:3px dotted blue;border-radius:16px;opacity:1;min-height:50px}ajf-report-builder-renderer-widget .ajf-on-dragged{border:23px dotted blue}ajf-report-builder-renderer-widget .ajf-selected{background-color:red}ajf-report-builder-renderer-widget .ajf-show,ajf-report-builder-renderer-widget .ajf-on-drag-over{border:33px dotted blue;opacity:1 !important;z-index:10}ajf-report-builder-renderer-widget .ajf-no-obj{max-width:200px;max-height:200px;width:auto;height:auto}ajf-report-builder-renderer-widget .ajf-row{display:flex;flex-direction:column;height:100%}ajf-report-builder-renderer-widget .ajf-columns{display:flex;flex-direction:row}ajf-report-builder-renderer-widget .ajf-column{min-height:50px}ajf-report-builder-renderer-widget .ajf-column ajf-report-builder-widgets-row-buttons{visibility:hidden !important;display:none !important}ajf-report-builder-renderer-widget .ajf-column:hover{border:3px dashed #9acd32;border-radius:16px}ajf-report-builder-renderer-widget .ajf-column:hover ajf-report-builder-widgets-row-buttons{visibility:visible !important;display:block !important}ajf-report-builder-renderer-widget .ajf-column:hover .ajf-container{min-height:50px}ajf-report-builder-renderer-widget .ajf-fixed:hover{border:3px dashed red !important}ajf-report-builder-renderer-widget .ajf-fixed{min-width:100px}ajf-report-builder-renderer-widget .ajf-column-drop-zone{margin:10%;height:50px;background-color:#fff;border:9px solid rgba(66,134,244,.6);border-radius:16px}ajf-report-builder-renderer-widget .ajf-text{min-height:20px}ajf-report-builder-renderer-widget ajf-map{z-index:30}ajf-report-builder-renderer-widget ajf-column{width:100%}ajf-report-builder-renderer-widget button{width:100%}ajf-report-builder-renderer-widget mat-list{height:100%;padding:0}ajf-report-builder-renderer-widget .ajf-ui.ajf-fluid.ajf-image{max-width:100%;height:auto}ajf-report-builder-renderer-widget .ajf-column-right{float:right;width:33%;background-color:#8b4513}ajf-report-builder-renderer-widget .ajf-column-center{display:inline-block;width:33%;background-color:olive}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderRendererWidget.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderRendererWidget.propDecorators = {
    widget: [{ type: Input }],
    position: [{ type: Input }],
    section: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.widget;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.position;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.section;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.onDragged;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.currentContentWidget;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.obj;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.fixedZoom;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getTableTitles;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getTableContent;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartType;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getDataset;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartBackgroundColor;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartBorderColor;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.getChartBorderWidth;
    /** @type {?} */
    AjfReportBuilderRendererWidget.prototype.layoutShow;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderRendererWidget.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderRendererWidget.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/theme-color-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderThemeColorDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     */
    constructor(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
        this.currentWidget = null;
        this.currentColor = 'rgb(255,255,255,0)';
        this.section = 'color';
        this._currentWidgetSub = Subscription.EMPTY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setWidgetStyles(value) {
        this._service.setWidgetStyles(this.section, value);
        this.currentColor = value;
        this.setStyle();
    }
    /**
     * @return {?}
     */
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * @return {?}
     */
    addCustomColor() {
        this._service.addCustomColor(this.currentColor);
        this._service.updateCurrentWidget(this.currentWidget);
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    close() {
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x !== null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                }
            }
            else {
                this.currentWidget = null;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderThemeColorDialog.decorators = [
    { type: Component, args: [{
                selector: 'theme-color-dialog',
                template: "<div mat-dialog-content #colorpic>\n   <input\n          [hidden]=false\n          [colorPicker]=\"currentColor\"\n          [style.background]=\"currentColor\"\n          [value]=\"currentColor\"\n          [cpDialogDisplay]=\"'inline'\"\n          [cpPosition]=\"'top'\"\n          [cpToggle]=\"true\"\n          [cpWidth]=\"'400px'\"\n          [cpOutputFormat]=\"'rgba'\"\n          (colorPickerChange)=\"setWidgetStyles($event)\"/>\n</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"addCustomColor()\">Save color</button>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AjfReportBuilderThemeColorDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];
AjfReportBuilderThemeColorDialog.propDecorators = {
    elem: [{ type: ViewChild, args: ['colorpic', { static: true },] }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.elem;
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.currentColor;
    /** @type {?} */
    AjfReportBuilderThemeColorDialog.prototype.section;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColorDialog.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColorDialog.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColorDialog.prototype._dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/theme-color.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component manages the report text
 *
 * @export
 */
class AjfReportBuilderThemeColor {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        this.currentWidget = null;
        this.alphaColor = 1;
        this.styleBackgroundColor = 'rgb(255,255,255,0)';
        this.styleColor = 'rgb(0,0,0,0)';
        this._colorsSub = Subscription.EMPTY;
        this._currentWidgetSub = Subscription.EMPTY;
        this._originSub = Subscription.EMPTY;
        this._headerStyleSub = Subscription.EMPTY;
        this._contentStylesSub = Subscription.EMPTY;
        this._footerStylesSub = Subscription.EMPTY;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setStyles(value) {
        switch (this.section) {
            case 'widget':
                this.setWidgetStyles(value);
                break;
            case 'report':
                this.setReportStyles(value);
                break;
            case 'section':
                this.setSectionStyles(value);
                break;
            case 'chart':
                this.setChartStyle(value);
                break;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setChartStyle(value) {
        if (this.label === 'backgroundColor') {
            this.addChartBackgroundColor(value);
        }
        else {
            this.addChartBorderColor(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setAlphaColor(value) {
        value = value.toFixed(2);
        for (let i = 0; i < this.colors.length; i++) {
            /** @type {?} */
            let lastComma = this.colors[i].lastIndexOf(',');
            this.colors[i] = this.colors[i].substring(0, lastComma) + ',' + value + ')';
        }
    }
    /**
     * call to service to add new style to widget
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    setWidgetStyles(value) {
        if (this.section === 'chart') {
            this.setChartStyle(value);
        }
        else {
            this._service.setWidgetStyles(this.label, value);
            this.currentColor = value;
            this.setStyle();
        }
    }
    /**
     * call to service to add new style to section
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    setSectionStyles(value) {
        this._service.setSectionStyles(this.origin, this.label, value);
        this.styleColor = value;
    }
    /**
     * call to service to add new style to report
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     *
     * @return {?}
     */
    setReportStyles(value) {
        this._service.setReportStyles(this.label, value);
        this.styleBackgroundColor = value;
    }
    /**
     * call to service to add background color to current chart
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     * @return {?}
     */
    addChartBackgroundColor(value) {
        this._service.addChartBackgroundColor(value);
    }
    /**
     * call to service to add border color to current chart
     *
     *
     * \@memberOf AjfReportBuilderProperties
     * @param {?} value
     * @return {?}
     */
    addChartBorderColor(value) {
        this._service.addChartBorderColor(value);
    }
    /**
     * @return {?}
     */
    setStyle() {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    }
    /**
     * @return {?}
     */
    openDialog() {
        this.dialogRef = this.dialog.open(AjfReportBuilderThemeColorDialog);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._colorsSub = this._service.colors
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.colors = x;
        }));
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (x != null) {
                if (this.currentWidget !== x) {
                    this.currentWidget = x;
                }
            }
            else {
                this.currentWidget = null;
            }
        }));
        this.getColorWidget = this._service.currentWidget.pipe(map((/**
         * @param {?} myObj
         * @return {?}
         */
        (myObj) => {
            if (myObj != null) {
                return myObj.styles['color'] || '';
            }
        })), distinctUntilChanged());
        this._originSub = this._service.origin.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            this.origin = s;
        }));
        this._headerStyleSub = this._service.headerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._contentStylesSub = this._service.contentStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
        this._footerStylesSub = this._service.footerStyles.subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            if (s['background-color'] != null) {
                this.styleBackgroundColor = s['background-color'];
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._colorsSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
        this._originSub.unsubscribe();
        this._headerStyleSub.unsubscribe();
        this._contentStylesSub.unsubscribe();
        this._footerStylesSub.unsubscribe();
    }
}
AjfReportBuilderThemeColor.decorators = [
    { type: Component, args: [{
                selector: 'ajf-theme-color',
                template: "<mat-card style=\"width:90%\">\n  <mat-card-header>\n    <mat-card-title> {{ label }} Trasparency</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n       <mat-slider\n      style=\"width:90%\"\n      (change)=\"setAlphaColor($event.value)\"\n      min=\"0\"\n      max=\"1\"\n      step=\"0.1\"\n      [value]=\"alphaColor\"\n      thumbLabel>\n    </mat-slider>\n  </mat-card-content>\n</mat-card>\n<mat-card style=\"width:90%\">\n  <mat-card-header>\n    <mat-card-title> {{ label }} </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n    <mat-grid-list\n      cols=\"8\"\n      rowHeight=\"25px\">\n      <mat-grid-tile\n        *ngFor=\"let color of colors\"\n        [colspan]=\"1\"\n        [rowspan]=\"1\"\n        [style.background]=\"color\">\n        <button\n          style=\"height:100%\"\n          (click)=\"setStyles(color)\"\n          mat-button>\n        </button>\n      </mat-grid-tile>\n    </mat-grid-list>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-button (click)=\"openDialog()\" style=\"width:90%;\">Add color</button>\n    <button mat-button (click)=\"setStyles('')\" style=\"width:90%\"> Reset </button>\n  </mat-card-actions>\n</mat-card>\n\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderThemeColor.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
AjfReportBuilderThemeColor.propDecorators = {
    section: [{ type: Input }],
    label: [{ type: Input }],
    init: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.alphaColor;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.colors;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.currentColor;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.getColorWidget;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.dialogRef;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.styleBackgroundColor;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.styleColor;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.section;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.label;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.init;
    /**
     * the name of the section that contains the currentWidget
     *
     * \@memberOf AjfReportBuilderProperties
     * @type {?}
     */
    AjfReportBuilderThemeColor.prototype.origin;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._colorsSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._originSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._headerStyleSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._contentStylesSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._footerStylesSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderThemeColor.prototype._service;
    /** @type {?} */
    AjfReportBuilderThemeColor.prototype.dialog;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/toolbar-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderToolbarDialog {
    /**
     * @param {?} _service
     * @param {?} _dialogRef
     */
    constructor(_service, _dialogRef) {
        this._service = _service;
        this._dialogRef = _dialogRef;
    }
    /**
     * @return {?}
     */
    resetReport() {
        /** @type {?} */
        let emptyReport = {
            'header': { 'content': [], 'styles': {} },
            'content': { 'content': [], 'styles': {} },
            'footer': { 'content': [], 'styles': {} },
            'styles': {}
        };
        this._service.setReport(emptyReport);
        this._dialogRef.close();
    }
    /**
     * @return {?}
     */
    close() {
        this._dialogRef.close();
    }
}
AjfReportBuilderToolbarDialog.decorators = [
    { type: Component, args: [{
                selector: 'toolbar-dialog',
                template: "<h1 matDialogTitle>Dialog</h1>\n<div mat-dialog-content>Are you sure you want to erase the report?</div>\n<div mat-dialog-actions>\n  <button mat-button (click)=\"resetReport()\">Yes</button>\n  <button mat-button (click)=\"close()\">No</button>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AjfReportBuilderToolbarDialog.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialogRef }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderToolbarDialog.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderToolbarDialog.prototype._dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/toolbar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
class AjfReportBuilderToolbar {
    /**
     * @param {?} _service
     * @param {?} dialog
     */
    constructor(_service, dialog) {
        this._service = _service;
        this.dialog = dialog;
        // this is an any EventEmitter
        this.addClick = new EventEmitter();
        this.zoom = false;
        this.emptyContent = this._service.emptyContent;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    canDropPredicate(item) {
        return item.data.dropZones.indexOf('widget') > -1;
    }
    /**
     * @return {?}
     */
    JSONRequest() {
    }
    /**
     * this method will pass event to event emitter
     * @param {?} event
     * @return {?}
     */
    onAddClick(event) {
        this.addClick.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addToList(event) {
        if (event.item.data.widget != null) {
            this._service.addCustomWidgets({
                json: JSON.stringify(event.item.data.widget.toJson()),
                type: ''
            });
        }
    }
    /**
     * @return {?}
     */
    undoLastOperation() {
        try {
            /** @type {?} */
            let myObj = JSON.parse(this._service.popJsonStack() || '');
            this._service.setReport(deepCopy(myObj));
        }
        catch (e) { }
    }
    /**
     * @return {?}
     */
    isZoomed() {
        this.zoom = !this.zoom;
        if (this.zoom) {
            this._service.fixedZoomIn();
        }
        else {
            this._service.fixedZoomOut();
        }
    }
    /**
     * @return {?}
     */
    openDialog() {
        this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
    }
}
AjfReportBuilderToolbar.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-toolbar',
                outputs: ['addClick'],
                template: "<mat-toolbar>\n  <button\n    mat-button\n    (click)=\"onAddClick($event)\"\n    matTooltip=\"open widget sidebar\"\n    [matTooltipPosition]=\"'above'\">\n    Open\n  </button>\n  <button\n    mat-button\n    (click)=\"openDialog()\"\n    matTooltip=\"reset the current report\"\n    [matTooltipPosition]=\"'above'\">reset\n  </button>\n  <button\n    mat-button\n    (click)=\"undoLastOperation()\"\n    matTooltip=\"undo the last operation\"\n    [disabled]=\"emptyContent|async\"\n    [matTooltipPosition]=\"'above'\">Undo</button>\n\n  <button mat-button\n    class=\"ajf-custom-widget-drop-zone\"\n    cdkDropList\n    [cdkDropListEnterPredicate]=\"canDropPredicate\"\n    (cdkDropListDropped)=\"addToList($event);\"\n    matTooltip=\"add custom widget on toolbar\"\n    [matTooltipPosition]=\"'above'\">\n    add custom widget here\n    <i class=\"material-icons\">add_circle_outline</i>\n  </button>\n  <section class=\"example-section\">\n    <mat-slide-toggle\n        [checked]=\"zoom\"\n        (change)=isZoomed()\n        matTooltip=\"apply zoom out\"\n        [matTooltipPosition]=\"'above'\">\n      zoom out\n    </mat-slide-toggle>\n  </section>\n</mat-toolbar>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-toolbar a{margin-right:10px}ajf-report-builder-toolbar .ajf-custom-widget-drop-zone{position:absolute;right:0;background-color:#90ee90}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService },
    { type: MatDialog }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.addClick;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.dialogRef;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.zoom;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.lastJson;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.emptyContent;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderToolbar.prototype._service;
    /** @type {?} */
    AjfReportBuilderToolbar.prototype.dialog;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widget-toolbar-button.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf builder field toolbar button
 * @implements : OnInit
 */
class AjfReportBuilderWidgetToolbarButton {
    constructor() {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.widgetIcon = ajfReportBuilderWidgetToString(this.widgetType);
    }
}
AjfReportBuilderWidgetToolbarButton.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-widget-toolbar-button',
                template: "<button\n  mat-button\n  matTooltip=\"{{ widgetType}}\"\n  [matTooltipPosition]=\"'above'\">\n  <mat-icon\n    fontSet=\"ajf-icon\"\n    fontIcon=\"{{ widgetIcon }}\">\n  </mat-icon>\n</button>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-widget-toolbar-button button mat-icon{font-size:35px;padding-top:10px;padding-bottom:10px;padding-right:20px;color:#3f51b5}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderWidgetToolbarButton.ctorParameters = () => [];
AjfReportBuilderWidgetToolbarButton.propDecorators = {
    widgetType: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderWidgetToolbarButton.prototype.widgetType;
    /** @type {?} */
    AjfReportBuilderWidgetToolbarButton.prototype.widgetIcon;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widgets-row-buttons.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderWidgetsRowButtons {
    /**
     *
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this.isOver = false;
        this.currentWidget = null;
        this.isClicked = false;
        this.color = [];
        // this boolean sign if is dragged a widget
        this.onDragged = false;
        // this boolean sign if is on over a widget
        this.onOver = false;
        this._currentWidgetSub = Subscription.EMPTY;
        this._onDraggedSub = Subscription.EMPTY;
        this._onOverSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    selectedWidget() {
        this.isClicked = !this.isClicked;
        this._service.setOrigin(this.from);
        this._service.updateCurrentWidget(this.widget);
    }
    /**
     * @return {?}
     */
    remove() {
        if (this.fromWidget != null) {
            this._service.updateCurrentWidget(this.fromWidget);
        }
        this._service.remove(this.from, this.position);
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (this.widget === this.currentWidget) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    changeColumn(direction) {
        if (direction == 'back') {
            this._service.changeColumn(this.position, this.position - 1, (/** @type {?} */ (this.fromWidget)));
        }
        else {
            this._service.changeColumn(this.position, this.position + 1, (/** @type {?} */ (this.fromWidget)));
        }
    }
    /**
     * @return {?}
     */
    isColumn() {
        if (this.label === 'Column') {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @return {?}
     */
    isOneColumn() {
        /** @type {?} */
        let rootObj = (/** @type {?} */ (this.fromWidget));
        if (rootObj.columns.length > 1) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.label = AjfWidgetType[this.widget.widgetType];
        this.widgetIcon = widgetReportBuilderIconName(this.widget.widgetType);
        this.widgetLabel = ajfWidgetTypeToLabel(this.widget.widgetType);
        this._onDraggedSub = this._service.onDragged
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onDragged = x;
        }));
        this._onOverSub = this._service.onOver
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.onOver = x;
        }));
        this._currentWidgetSub = this._service.currentWidget
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            this.currentWidget = x;
            if (x !== this.widget) {
                this.isClicked = false;
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDraggedSub.unsubscribe();
        this._onOverSub.unsubscribe();
        this._currentWidgetSub.unsubscribe();
    }
}
AjfReportBuilderWidgetsRowButtons.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-widgets-row-buttons',
                template: "<div class=\"ajf-container\" *ngIf=\"onOver || onDragged\">\n  <div class=\"ajf-button-row\">\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('forward')\"\n        matTooltip=\"move right\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_forward</i>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"(isColumn()== false && onDragged == true) || true\">\n      <span mat-button\n        [ngClass]=\"{'ajf-selected': onFocus()}\"\n        matTooltip=\"{{label}}\"\n        [matTooltipPosition]=\"'above'\"\n        (click)=\"selectedWidget()\">\n        <ng-template [ngIf]=\"isColumn()\">\n        <i class=\"material-icons\" >settings</i>\n        </ng-template>\n        <ng-template [ngIf]=\"(isColumn()) ? false : true\">\n          <mat-icon\n            fontSet=\"ajf-icon\"\n            fontIcon=\"{{ widgetIcon }}\">\n          </mat-icon>\n        </ng-template>\n      </span>\n      <span\n        mat-button\n        matTooltip=\"remove\"\n        (click)=\"remove()\"\n        [matTooltipPosition]=\"'above'\">\n        <mat-icon>remove_circle_outline</mat-icon>\n      </span>\n    </ng-template>\n    <ng-template [ngIf]=\"isColumn() && onDragged == false\">\n      <span\n        (click)=\"changeColumn('back')\"\n        matTooltip=\"move left\"\n        [matTooltipPosition]=\"'above'\">\n        <i class=\"material-icons\">arrow_back</i>\n      </span>\n    </ng-template>\n  </div>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-widgets-row-buttons{position:relative;display:block}ajf-report-builder-widgets-row-buttons .ajf-container{height:30px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row{margin:0;width:100% !important;padding:0;position:absolute;right:0;display:flex;flex-direction:row-reverse;z-index:50;overflow-x:auto;background-color:rgba(144,238,144,.6);color:#000 !important;border-radius:16px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span{flex-flow:wrap row;margin-right:10px;cursor:pointer}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row button mat-icon,ajf-report-builder-widgets-row-buttons .ajf-container .ajf-button-row span mat-icon{margin-top:5px;font-size:20px}ajf-report-builder-widgets-row-buttons .ajf-container .ajf-selected{background-color:#3b623b;color:#81d481}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilderWidgetsRowButtons.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilderWidgetsRowButtons.propDecorators = {
    from: [{ type: Input }],
    fromWidget: [{ type: Input }],
    position: [{ type: Input }],
    widget: [{ type: Input }],
    child: [{ type: Input }],
    isOver: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.from;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.fromWidget;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.position;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.widget;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.child;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.isOver;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.currentWidget;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.isClicked;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.color;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.widgetIcon;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.widgetLabel;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.label;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.onDragged;
    /** @type {?} */
    AjfReportBuilderWidgetsRowButtons.prototype.onOver;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._currentWidgetSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._onDraggedSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._onOverSub;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsRowButtons.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/widgets-toolbar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an Ajf builder fields toolbar
 */
class AjfReportBuilderWidgetsToolbar {
    /**
     *
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        // fieldTypes is an array string that contains the field options
        this.chartTypes = sizedEnumToStringArray(AjfChartType);
        this.widgetTypes = sizedEnumToStringArray(AjfWidgetType);
        // delete Column widget
        /** @type {?} */
        let pos = this.widgetTypes.indexOf('Column');
        if (pos !== -1) {
            this.widgetTypes.splice(pos, 1);
        }
    }
    /**
     *  sign the start of mouse drag with 200 ms of delay
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragStartHandler() {
        /** @type {?} */
        let s = timer(200)
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (s != null) {
                s.unsubscribe();
            }
            this._service.dragStarted();
        }));
    }
    /**
     * sign the end of mouse drag
     *
     * \@memberOf AjfReportBuilderContent
     * @return {?}
     */
    onDragEndHandler() {
        this._service.dragEnded();
    }
}
AjfReportBuilderWidgetsToolbar.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder-widgets-toolbar',
                template: "<mat-list>\n  <mat-list-item *ngFor=\"let t of widgetTypes\">\n    <ajf-report-builder-widget-toolbar-button ng-if=\"t != 'Column'\"\n        cdkDrag\n        [cdkDragData]=\"{widgetType: t, dropZones: ['header','content','footer','column','widget']}\"\n        [widgetType]=\"t\"\n        (onDragStart)=\"onDragStartHandler();\"\n        (onDragEnd)=\"onDragEndHandler();\">\n    </ajf-report-builder-widget-toolbar-button>\n  </mat-list-item>\n</mat-list>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
AjfReportBuilderWidgetsToolbar.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
if (false) {
    /** @type {?} */
    AjfReportBuilderWidgetsToolbar.prototype.chartTypes;
    /** @type {?} */
    AjfReportBuilderWidgetsToolbar.prototype.widgetTypes;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilderWidgetsToolbar.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This class will define an ajf form builderx
 */
class AjfReportBuilder {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._init = false;
    }
    /**
     * @return {?}
     */
    get report() { return this._report; }
    /**
     * @param {?} report
     * @return {?}
     */
    set report(report) {
        if (report != null) {
            this._report = report;
            if (this._init) {
                this._setCurrentReport();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._setCurrentReport();
        this._init = true;
    }
    /**
     * @private
     * @return {?}
     */
    _setCurrentReport() {
        this._service.setReportForms(this.report != null ? this.report.forms || [] : []);
        this._service.setReport(this.report);
    }
}
AjfReportBuilder.decorators = [
    { type: Component, args: [{
                selector: 'ajf-report-builder',
                template: "<ajf-report-builder-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-toolbar>\n<ajf-report-builder-custom-widgets-toolbar (addClick)=\"start.toggle()\"></ajf-report-builder-custom-widgets-toolbar>\n<mat-drawer-container>\n    <mat-drawer #start position=\"start\" mode=\"side\" class=\"ajf-builder-sidebar\">\n        <ajf-report-builder-widgets-toolbar></ajf-report-builder-widgets-toolbar>\n    </mat-drawer>\n    <ajf-report-builder-content></ajf-report-builder-content>\n    <mat-drawer #end position=\"end\" mode=\"side\" class=\"ajf-builder-prop\" [opened]=\"true\">\n      <ajf-report-builder-properties></ajf-report-builder-properties>\n    </mat-drawer>\n</mat-drawer-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder{display:block;position:relative;width:100%;height:100%;overflow:hidden}ajf-report-builder mat-sidenav-container{height:100%}ajf-report-builder mat-sidenav-container .ajf-builder-sidebar{max-width:7%}ajf-report-builder mat-sidenav-container .ajf-builder-prop{max-width:30%}\n"]
            }] }
];
/** @nocollapse */
AjfReportBuilder.ctorParameters = () => [
    { type: AjfReportBuilderService }
];
AjfReportBuilder.propDecorators = {
    startSidenav: [{ type: ViewChild, args: [MatSidenav, { static: true },] }],
    report: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfReportBuilder.prototype.startSidenav;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilder.prototype._init;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilder.prototype._report;
    /**
     * @type {?}
     * @private
     */
    AjfReportBuilder.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/report-builder-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfReportBuilderModule {
}
AjfReportBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    DragDropModule,
                    MatButtonModule,
                    MatButtonToggleModule,
                    MatCardModule,
                    MatDialogModule,
                    MatGridListModule,
                    MatIconModule,
                    MatListModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSlideToggleModule,
                    MatSliderModule,
                    MatTabsModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    TranslateModule,
                    ColorPickerModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfMapModule,
                    AjfMonacoEditorModule,
                    AjfTableModule,
                    AjfTextModule,
                ],
                declarations: [
                    AjfQuillEditor,
                    AjfReportBuilderColumn,
                    AjfReportBuilderConditionEditor,
                    AjfReportBuilderContent,
                    AjfReportBuilderCustomWidgetDialog,
                    AjfReportBuilderCustomWidgetToolbarButton,
                    AjfReportBuilderCustomWidgetsToolbar,
                    AjfReportBuilderFormsAnalyzerDialog,
                    AjfReportBuilderFormsAnalyzer,
                    AjfReportBuilderImageGroup,
                    AjfReportBuilderProperties,
                    AjfReportBuilderRendererWidget,
                    AjfReportBuilderThemeColorDialog,
                    AjfReportBuilderThemeColor,
                    AjfReportBuilderToolbarDialog,
                    AjfReportBuilderToolbar,
                    AjfReportBuilderWidgetToolbarButton,
                    AjfReportBuilderWidgetsRowButtons,
                    AjfReportBuilderWidgetsToolbar,
                    AjfReportBuilder,
                    AjfImageFilterPipe,
                ],
                exports: [
                    AjfReportBuilder,
                ],
                providers: [
                    AjfReportBuilderService,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AJF_REPORTS_CONFIG, AjfReportBuilder, AjfReportBuilderModule, AjfReportBuilderService, AjfQuillEditor as ɵgc_ajf_src_material_report_builder_report_builder_a, AjfReportBuilderColumn as ɵgc_ajf_src_material_report_builder_report_builder_b, AjfReportBuilderConditionEditor as ɵgc_ajf_src_material_report_builder_report_builder_c, AjfReportBuilderContent as ɵgc_ajf_src_material_report_builder_report_builder_d, AjfReportBuilderCustomWidgetDialog as ɵgc_ajf_src_material_report_builder_report_builder_e, AjfReportBuilderCustomWidgetToolbarButton as ɵgc_ajf_src_material_report_builder_report_builder_f, AjfReportBuilderCustomWidgetsToolbar as ɵgc_ajf_src_material_report_builder_report_builder_g, AjfReportBuilderFormsAnalyzerDialog as ɵgc_ajf_src_material_report_builder_report_builder_h, AjfReportBuilderFormsAnalyzer as ɵgc_ajf_src_material_report_builder_report_builder_i, AjfReportBuilderImageGroup as ɵgc_ajf_src_material_report_builder_report_builder_j, AjfReportBuilderProperties as ɵgc_ajf_src_material_report_builder_report_builder_k, AjfReportBuilderRendererWidget as ɵgc_ajf_src_material_report_builder_report_builder_l, AjfReportBuilderThemeColorDialog as ɵgc_ajf_src_material_report_builder_report_builder_m, AjfReportBuilderThemeColor as ɵgc_ajf_src_material_report_builder_report_builder_n, AjfReportBuilderToolbarDialog as ɵgc_ajf_src_material_report_builder_report_builder_o, AjfReportBuilderToolbar as ɵgc_ajf_src_material_report_builder_report_builder_p, AjfReportBuilderWidgetToolbarButton as ɵgc_ajf_src_material_report_builder_report_builder_q, AjfReportBuilderWidgetsRowButtons as ɵgc_ajf_src_material_report_builder_report_builder_r, AjfReportBuilderWidgetsToolbar as ɵgc_ajf_src_material_report_builder_report_builder_s, AjfImageFilterPipe as ɵgc_ajf_src_material_report_builder_report_builder_t };
//# sourceMappingURL=report-builder.js.map
