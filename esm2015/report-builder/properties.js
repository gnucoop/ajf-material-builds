/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/properties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfAggregationType, AjfWidgetType } from '@ajf/core/reports';
import { deepCopy } from '@ajf/core/utils';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { AjfReportBuilderFormsAnalyzerDialog } from './forms-analyzer-dialog';
import { AjfReportBuilderService } from './report-builder-service';
export class AjfReportBuilderProperties {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE9BQU8sRUFDTCxrQkFBa0IsRUFBNkQsYUFBYSxFQUM3RixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBZ0MsaUJBQWlCLEVBQ2xHLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RixPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQVNqRSxNQUFNLE9BQU8sMEJBQTBCOzs7OztJQWlmckMsWUFDVSxPQUFrQixFQUNsQixRQUFpQztRQURqQyxZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQXlCOzs7Ozs7UUE3ZTNDLGtCQUFhLEdBQUcsS0FBSyxDQUFDOzs7Ozs7UUFPdEIsa0JBQWEsR0FBbUIsSUFBSSxDQUFDOzs7Ozs7UUFhckMsVUFBSyxHQUFjLEVBQUUsQ0FBQztRQUd0QixXQUFNLEdBQWEsRUFBRSxDQUFDOzs7O1FBYXRCLGNBQVMsR0FBUSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQzs7OztRQU03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SUFPckIsOENBQTRFOzs7Ozs7SUFPNUUsOENBQWM7Ozs7O0lBTWQsa0RBQXFCOztJQUNyQixtREFBc0I7O0lBQ3RCLGtEQUFvQjs7SUFDcEIsa0RBQXFCOztJQUNyQixpREFBb0I7O0lBQ3BCLHVEQUEwQjs7SUFDMUIsa0RBQWtCOzs7OztJQUVsQiwyQ0FBbUU7O0lBR25FLDZDQUlFOztJQUVGLDZDQTJSRTs7Ozs7SUFFRix1REFBNkQ7Ozs7O0lBQzdELCtDQUFxRDs7Ozs7SUFDckQsK0NBQXFEOzs7OztJQUNyRCxxREFBMkQ7Ozs7O0lBQzNELHVEQUE2RDs7Ozs7SUFDN0Qsc0RBQTREOzs7OztJQUM1RCxnREFBc0Q7Ozs7O0lBQ3RELHdEQUE4RDs7Ozs7SUFFOUQsNERBQ2dEOzs7OztJQUNoRCw2REFDZ0Q7Ozs7O0lBQ2hELGlFQUNnRDs7Ozs7SUFDaEQsa0VBQ2dEOztJQXlUaEQsOENBQXFDOzs7OztJQXRUbkMsNkNBQTBCOzs7OztJQUMxQiw4Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uVHlwZSwgQWpmQ2hhcnRXaWRnZXQsIEFqZkxheW91dFdpZGdldCwgQWpmVGV4dFdpZGdldCwgQWpmV2lkZ2V0LCBBamZXaWRnZXRUeXBlXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2d9IGZyb20gJy4vZm9ybXMtYW5hbHl6ZXItZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXByb3BlcnRpZXMnLFxuICB0ZW1wbGF0ZVVybDogJ3Byb3BlcnRpZXMuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9wZXJ0aWVzLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllcyBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogIHRydWUgd2hlbiB0aGUgZmlyc3QgdGltZSBjaGFydCB0eXBlIGlzIHNldHRlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGluaXRDaGFydFR5cGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogdGhlIGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBnZXQgY3VycmVudExheW91dFdpZGdldCgpOiBBamZMYXlvdXRXaWRnZXQge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRXaWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICB9XG4gIGdldCBjdXJyZW50VGV4dFdpZGdldCgpOiBBamZUZXh0V2lkZ2V0IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50V2lkZ2V0IGFzIEFqZlRleHRXaWRnZXQ7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBhcnJheSBjb250YWlucyB0aGUgZm9ybXMgZXhwbG9pdGVkIGZvciBnZW5lcmF0ZSBkYXRhIGxhYmVsc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGZvcm1zOiBBamZGb3JtW10gPSBbXTtcblxuXG4gIGNvbG9yczogc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgICogdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudFdpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIG9yaWdpbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGQUtFIERBVEFcbiAgICovXG5cbiAgZm9ybXNKc29uOiBhbnkgPSB7Zm9ybXM6IFtdfTtcblxuICAvKipcbiAgICogV0lER0VUXG4gICAqL1xuXG4gIHdpZGdldE5hbWUgPSAnJztcbiAgZ2V0SFRNTDogT2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuICBnZXRIZWlnaHRXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyIHwgdW5kZWZpbmVkPjtcbiAgZ2V0Rm9udFNpemVXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyIHwgdW5kZWZpbmVkPjtcbiAgZ2V0Rm9udEFsaWduV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD47XG4gIGdldEJhY2tncm91bmRDb2xvcldpZGdldDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBnZXRDb2xvcldpZGdldDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBnZXRTdHlsZTogT2JzZXJ2YWJsZTxhbnk+O1xuICBnZXRDaGFydEJhY2tncm91bmRDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldENoYXJ0Qm9yZGVyQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRWaXNpYmlsaXR5OiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbj47XG4gIGdldENvbG9yOiBPYnNlcnZhYmxlPFN0cmluZ1tdPjtcblxuICBtYXJnaW5FeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRNYXJnaW5XaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW10gfCB1bmRlZmluZWQ+O1xuICBnZXRNYXJnaW5XaWRnZXRUb3A6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0UmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0Qm90dG9tOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldE1hcmdpbldpZGdldExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwYWRkaW5nRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0UGFkZGluZ1dpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXSB8IHVuZGVmaW5lZD47XG4gIGdldFBhZGRpbmdXaWRnZXRUb3A6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0UGFkZGluZ1dpZGdldFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldFBhZGRpbmdXaWRnZXRCb3R0b206IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0UGFkZGluZ1dpZGdldExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBib3JkZXJXaWR0aEV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcltdIHwgdW5kZWZpbmVkPjtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXRUb3A6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXRSaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldEJvdHRvbTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBib3JkZXJSYWRpdXNFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW10gfCB1bmRlZmluZWQ+O1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXRUb3BMZWZ0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldFRvcFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbVJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbUxlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBiYWNrZ3JvdW5kQ29sb3IgPSAnIzEyN2JkYyc7XG4gIHN0eWxlQmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsMjU1LDI1NSwwKSc7XG4gIGJvcmRlckNvbG9yID0gJyMxMjdiZGMnO1xuICBzdHlsZUNvbG9yID0gJ3JnYigwLDAsMCwwKSc7XG4gIHdiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgZm9udFNpemU6IHN0cmluZztcbiAgYnViYmxlOiBzdHJpbmc7XG5cbiAgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2c+O1xuICBjb250YWluZXI6IEFqZkZvcm1WYXJpYWJsZXM7XG5cblxuXG4gIGFsaWduID0gW2ZhbHNlLCAnY2VudGVyJywgJ3JpZ2h0JywgJ2p1c3RpZnknXTtcblxuICBmb250cyA9IFtcbiAgICBmYWxzZSxcbiAgICAnYmxhY2tyJyxcbiAgICAnYmxhY2staXRhbGljJyxcbiAgICAnYm9sZCcsXG4gICAgJ2JvbGQtY29uZGVuc2VkJyxcbiAgICAnYm9sZC1jb25kZW5zZWQtaXRhbGljJyxcbiAgICAnYm9sZC1pdGFsaWMnLFxuICAgICdjb25kZW5zZWQnLFxuICAgICdjb25kZW5zZWQtaXRhbGljJyxcbiAgICAnaXRhbGljJyxcbiAgICAnbGlnaHQnLFxuICAgICdsaWdodC1pdGFsaWMnLFxuICAgICdtZWRpdW0nLFxuICAgICdtZWRpdW0taXRhbGljJyxcbiAgICAndGhpbnInLFxuICAgICd0aGluLWl0YWxpYydcbiAgXTtcbiAgY3VycmVudE1vZHVsZTogYW55ID0ge307XG4gIHF1aWxsTW9kdWxlcyA9IHtcbiAgICB0b29sYmFyOiBbXG4gICAgICBbJ2Zvcm11bGEnXSxcbiAgICAgIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgICAgICAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuXG4gICAgICBbeyAnaGVhZGVyJzogMSB9LCB7ICdoZWFkZXInOiAyIH1dLCAgICAgICAgICAgICAgIC8vIGN1c3RvbSBidXR0b24gdmFsdWVzXG4gICAgICBbeyAnbGlzdCc6ICdvcmRlcmVkJyB9LCB7ICdsaXN0JzogJ2J1bGxldCcgfV0sXG4gICAgICBbeyAnc2NyaXB0JzogJ3N1YicgfSwgeyAnc2NyaXB0JzogJ3N1cGVyJyB9XSwgICAgICAvLyBzdXBlcnNjcmlwdC9zdWJzY3JpcHRcbiAgICAgIC8vIFt7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSwgICAgICAgICAgLy8gb3V0ZGVudC9pbmRlbnRcbiAgICAgIC8vIFt7ICdkaXJlY3Rpb24nOiAncnRsJyB9XSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dCBkaXJlY3Rpb25cblxuICAgICAgW3sgJ3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ10gfV0sICAvLyBjdXN0b20gZHJvcGRvd25cbiAgICAgIFt7ICdoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdIH1dLFxuXG4gICAgICBbeyAnY29sb3InOiB0aGlzLmNvbG9ycyB9LFxuICAgICAgeyAnYmFja2dyb3VuZCc6IHRoaXMuY29sb3JzIH1dLCAgICAgICAgICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgIFt7ICdmb250JzogdGhpcy5mb250cyB9XSxcbiAgICAgIFt7ICdhbGlnbic6IHRoaXMuYWxpZ24gfV0sXG5cbiAgICAgIFsnY2xlYW4nXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmb3JtYXR0aW5nIGJ1dHRvblxuXG4gICAgICAvLyBbJ2xpbmsnLCAnY2xhc3MnLCAndmlkZW8nXSAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIGFuZCBpbWFnZSwgdmlkZW9cbiAgICBdXG4gIH07XG5cbiAgLyoqXG4gICAqIENIQVJUXG4gICAqL1xuXG5cbiAgZ2V0Q2hhcnRZTGFiZWxzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcblxuICBjaGFydEJvcmRlckNvbG9yOiBzdHJpbmdbXSA9IFtdO1xuICBjaGFydEJvcmRlcldpZHRoID0gMztcblxuICAvKipcbiAgICpcbiAgICogSU1BR0VcbiAgICovXG5cbiAgaW1hZ2VVcmwgPSAnaHR0cHM6Ly9hbmd1bGFyLmlvL3Jlc291cmNlcy9pbWFnZXMvbG9nb3MvYW5ndWxhcjIvYW5ndWxhci5wbmcnO1xuXG4gIC8qKlxuICAgKlxuICAgKiBURVhUXG4gICAqL1xuXG4gIGh0bWxUZXh0ID0gJyc7XG5cblxuICAvKipcbiAgICogdGhlc2UgdmFyaWFibGVzIGluZGljYXRlIHRoYXQgdGhlIHVzZXIgd2FudCB0byBjaGFuZ2Ugc2VjdGlvblxuICAgKi9cbiAgcmVwb3J0U3R5bGVzID0gZmFsc2U7XG4gIHNlY3Rpb25TdHlsZXMgPSBmYWxzZTtcbiAgd2lkZ2V0U3R5bGVzID0gdHJ1ZTtcbiAgc2VjdGlvbkNvbG9yID0gZmFsc2U7XG4gIHdpZGdldENvbG9yID0gZmFsc2U7XG4gIHZpc2liaWxpdHlTZWN0aW9uID0gZmFsc2U7XG4gIGN1cnJlbnRDb2xvciA9ICcnO1xuXG4gIHByaXZhdGUgX2ljb246IHsgZm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgZ2V0IGljb24oKTogeyBmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmcgfSB8IG51bGwgeyByZXR1cm4gdGhpcy5faWNvbjsgfVxuXG4gIGljb25TZXQ6IGFueSA9IHtcbiAgICAnaWNvbic6ICd0cnVlJyxcbiAgICAndGl0bGUnOiAncmVwb3J0JyxcbiAgICAnZGF0YSc6IG51bGxcbiAgfTtcblxuICBmbGFnU2V0OiBhbnkgPSB7XG4gICAgJ2ljb24nOiAnZmFsc2UnLFxuICAgICdjbGFzcyc6IFsnZmxhZy1pY29uJ10sXG4gICAgJ3ByZWZpeENsYXNzJzogJ2ZsYWctaWNvbi0nLFxuICAgICd0aXRsZSc6ICdmbGFncycsXG4gICAgJ2RhdGEnOiBbXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdkeicsXG4gICAgICAgICdpbmZvJzogJ0FsZ2VyaWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnYW8nLFxuICAgICAgICAnaW5mbyc6ICdBbmdvbGEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnYmonLFxuICAgICAgICAnaW5mbyc6ICdCZW5pbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdidycsXG4gICAgICAgICdpbmZvJzogJ0JvdHN3YW5hJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2JmJyxcbiAgICAgICAgJ2luZm8nOiAnQnVya2luYSBGYXNvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2JpJyxcbiAgICAgICAgJ2luZm8nOiAnQnVydW5kaSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdjbScsXG4gICAgICAgICdpbmZvJzogJ0NhbWVyb29uJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2N2JyxcbiAgICAgICAgJ2luZm8nOiAnQ2FibyBWZXJkZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdjZicsXG4gICAgICAgICdpbmZvJzogJ1RoZSBDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAndGQnLFxuICAgICAgICAnaW5mbyc6ICdDaGFkJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2ttJyxcbiAgICAgICAgJ2luZm8nOiAnVGhlIENvbW9yb3MnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnY2knLFxuICAgICAgICAnaW5mbyc6ICdDb3RlIERcXCdhdm9pcmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnY2QnLFxuICAgICAgICAnaW5mbyc6ICdUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiBDb25nbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdkaicsXG4gICAgICAgICdpbmZvJzogJ0Rpamlib3V0aSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdlZycsXG4gICAgICAgICdpbmZvJzogJ0VneXB0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2dxJyxcbiAgICAgICAgJ2luZm8nOiAnRXF1YXRvcmlhbCBHdWluZWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnZXInLFxuICAgICAgICAnaW5mbyc6ICdFcml0cmVhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2V0JyxcbiAgICAgICAgJ2luZm8nOiAnRXRoaW9waWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAndGYnLFxuICAgICAgICAnaW5mbyc6ICdGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnZ2EnLFxuICAgICAgICAnaW5mbyc6ICdHYWJvbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdnbScsXG4gICAgICAgICdpbmZvJzogJ1RoZSBHYW1iaWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnZ2gnLFxuICAgICAgICAnaW5mbyc6ICdHaGFuYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdnbicsXG4gICAgICAgICdpbmZvJzogJ0d1aW5lYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdndycsXG4gICAgICAgICdpbmZvJzogJ0d1aW5lYS1CaXNzYXUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAna2UnLFxuICAgICAgICAnaW5mbyc6ICdLZW55YSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdscycsXG4gICAgICAgICdpbmZvJzogJ0xlc2hvdGhvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2xyJyxcbiAgICAgICAgJ2luZm8nOiAnTGliZXJpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdseScsXG4gICAgICAgICdpbmZvJzogJ0xpYnlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ21nJyxcbiAgICAgICAgJ2luZm8nOiAnTWFkYWdhc2NhcidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdtdycsXG4gICAgICAgICdpbmZvJzogJ01hbGF3eSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdtbCcsXG4gICAgICAgICdpbmZvJzogJ01hbGknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbXInLFxuICAgICAgICAnaW5mbyc6ICdNYXVyaXRhbmlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ211JyxcbiAgICAgICAgJ2luZm8nOiAnTWF1cml0aXVzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3l0JyxcbiAgICAgICAgJ2luZm8nOiAnTWF5b3R0ZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdtYScsXG4gICAgICAgICdpbmZvJzogJ01hcm9jY28nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbXonLFxuICAgICAgICAnaW5mbyc6ICdNb3phbWJpcXVlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ25hJyxcbiAgICAgICAgJ2luZm8nOiAnTmFtaWJpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICduZScsXG4gICAgICAgICdpbmZvJzogJ05pZ2VyJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ25nJyxcbiAgICAgICAgJ2luZm8nOiAnTmlnZXJpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdjZycsXG4gICAgICAgICdpbmZvJzogJ1JlcHVibGljIG9mIHRoZSBDb25nbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdydycsXG4gICAgICAgICdpbmZvJzogJ1J3bmRhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3JlJyxcbiAgICAgICAgJ2luZm8nOiAncsOodW5pb24nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnc2gnLFxuICAgICAgICAnaW5mbyc6ICdTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdzdCcsXG4gICAgICAgICdpbmZvJzogJ1NhbyBUb21lIGFuZCBQcmluY2lwZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdzbicsXG4gICAgICAgICdpbmZvJzogJ1NlbmVnYWwnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnc2MnLFxuICAgICAgICAnaW5mbyc6ICdTZXljaGVsbGVzJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NsJyxcbiAgICAgICAgJ2luZm8nOiAnU2llcnJhIExlb25lJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NvJyxcbiAgICAgICAgJ2luZm8nOiAnU29tYWxpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd6YScsXG4gICAgICAgICdpbmZvJzogJ1NvdXRoIEFmcmljYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdzcycsXG4gICAgICAgICdpbmZvJzogJ1NvdXRoIFN1ZGFuJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NkJyxcbiAgICAgICAgJ2luZm8nOiAnU3VkYW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnc3onLFxuICAgICAgICAnaW5mbyc6ICdTd2F6aWxhbmQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAndHonLFxuICAgICAgICAnaW5mbyc6ICdUYW56YW5pYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd0ZycsXG4gICAgICAgICdpbmZvJzogJ1RvZ28nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAndG4nLFxuICAgICAgICAnaW5mbyc6ICdUdW5pc2lhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3VnJyxcbiAgICAgICAgJ2luZm8nOiAnVWdhbmRhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2VoJyxcbiAgICAgICAgJ2luZm8nOiAnV2VzdGVybiBTYWhhcmEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnem0nLFxuICAgICAgICAnaW5mbyc6ICdaYW1iaWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnencnLFxuICAgICAgICAnaW5mbyc6ICdaaW1iYXdlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2lxJyxcbiAgICAgICAgJ2luZm8nOiAnSXJhcSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdsYicsXG4gICAgICAgICdpbmZvJzogJ0xlYmFub24nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnYmQnLFxuICAgICAgICAnaW5mbyc6ICdCYW5nbGFkZXNoJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2lyJyxcbiAgICAgICAgJ2luZm8nOiAnSXJhbiAoSXNsYW1pYyBSZXB1YmxpYyBvZiknXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbXknLFxuICAgICAgICAnaW5mbyc6ICdNYWxheXNpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICducCcsXG4gICAgICAgICdpbmZvJzogJ05lcGFsJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3BrJyxcbiAgICAgICAgJ2luZm8nOiAnUGFraXN0YW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAndGgnLFxuICAgICAgICAnaW5mbyc6ICdUaGFpbGFuZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdqbycsXG4gICAgICAgICdpbmZvJzogJ0pvcmRhbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd5ZScsXG4gICAgICAgICdpbmZvJzogJ1llbWVuJ1xuICAgICAgfVxuICAgIF1cbiAgfTtcblxuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm1zU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbG9yU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2hlYWRlclN0eWxlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29yaWdpblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zdHlsZXNVcGRhdGVzU3ViczogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3VwZGF0ZVdpZGdldE1hcmdpbkV2dDogRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4gPVxuICBuZXcgRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4oKTtcbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0UGFkZGluZ0V2dDogRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4gPVxuICBuZXcgRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4oKTtcbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0Qm9yZGVyV2lkdGhFdnQ6IEV2ZW50RW1pdHRlcjx7IGlkeDogbnVtYmVyLCB2YWx1ZTogYW55IH0+ID1cbiAgbmV3IEV2ZW50RW1pdHRlcjx7IGlkeDogbnVtYmVyLCB2YWx1ZTogYW55IH0+KCk7XG4gIHByaXZhdGUgX3VwZGF0ZVdpZGdldEJvcmRlclJhZGl1c0V2dDogRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4gPVxuICBuZXcgRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLnNldEZvcm1zKCk7XG5cbiAgICB0aGlzLmljb25TZXQuZGF0YSA9IE9iamVjdC5rZXlzKF9zZXJ2aWNlLmljb25TZXRzKS5maWx0ZXIoeCA9PiB4ICE9ICdhamYtaWNvbicpLm1hcChpID0+IHtcbiAgICAgIHJldHVybiB7IG5hbWU6IGksIGljb25zOiBfc2VydmljZS5pY29uU2V0c1tpXSB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVTdWIgPSB0aGlzLl9zZXJ2aWNlLmhlYWRlclN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9jb250ZW50U3R5bGVzU3ViID0gdGhpcy5fc2VydmljZS5jb250ZW50U3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2Zvb3RlclN0eWxlc1N1YiA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyU3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX29yaWdpblN1YiA9IHRoaXMuX3NlcnZpY2Uub3JpZ2luLnN1YnNjcmliZShzID0+IHtcbiAgICAgIHRoaXMub3JpZ2luID0gcztcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIFVUSUxTXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIHJldHVybiBhIG51bWJlciB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICB0b051bWJlcih2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBsZXQgbnVtYmVyUGF0dGVybiA9IC9eKC0pP1xcZCsvZztcblxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKG51bWJlclBhdHRlcm4pO1xuICAgICAgaWYgKG1hdGNoZXMgPT0gbnVsbCB8fCBtYXRjaGVzLmxlbmd0aCA9PSAwKSB7IHJldHVybiAwOyB9XG4gICAgICByZXR1cm4gTnVtYmVyKG1hdGNoZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIHRvTnVtYmVyQXJyYXkodmFsdWU6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHZhbHVlIHx8ICcnKS5yZXBsYWNlKCdweCcsICcnKS5zcGxpdCgnICcpXG4gICAgICAgIC5maWx0ZXIodiA9PiB2ICE9PSAnJyAmJiB2ICE9IG51bGwpXG4gICAgICAgIC5tYXAodiA9PiB0aGlzLnRvTnVtYmVyKHYpKTtcbiAgICB9XG4gIH1cblxuICBmaWxsUHhOdW1iZXJBcnJheSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICBjb25zdCB2bCA9IHZhbHVlLmxlbmd0aDtcbiAgICBzd2l0Y2ggKHZsKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbMCwgMCwgMCwgMF07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbnN0IHYgPSB2YWx1ZVswXTtcbiAgICAgICAgcmV0dXJuIFt2LCB2LCB2LCB2XTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgdjIxID0gdmFsdWVbMF07XG4gICAgICAgIGNvbnN0IHYyMiA9IHZhbHVlWzFdO1xuICAgICAgICByZXR1cm4gW3YyMSwgdjIyLCB2MjEsIHYyMl07XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGNvbnN0IHYzMSA9IHZhbHVlWzBdO1xuICAgICAgICBjb25zdCB2MzIgPSB2YWx1ZVsxXTtcbiAgICAgICAgY29uc3QgdjMzID0gdmFsdWVbMl07XG4gICAgICAgIHJldHVybiBbdjMxLCB2MzIsIHYzMywgdjMyXTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwZXJjZW50KHZhbHVlOiBudW1iZXIpIHtcbiAgICBsZXQgdGVtcCA9IHRoaXMucm91bmRUbyh2YWx1ZSAqIDEwMCwgMyk7XG4gICAgcmV0dXJuIHRlbXA7XG4gIH1cblxuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IHRoZSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG5cbiAgc2V0Rm9ybXMoKTogdm9pZCB7XG4gICAgbGV0IGZvcm1zOiBBamZGb3JtW10gPSBbXTtcbiAgICB0cnkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZvcm1zSnNvbi5mb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3Jtcy5wdXNoKGRlZXBDb3B5KHRoaXMuZm9ybXNKc29uLmZvcm1zW2ldKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydEZvcm1zKGZvcm1zKTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IHRoZSB3aWR0aCBvZiB0aGUgaWR4IGNvbHVtbiBvZiBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGluc3RhbnRDb2x1bW5WYWx1ZShjb2w6IG51bWJlcnxudWxsLCBpZHg6IG51bWJlcikge1xuICAgIGlmIChjb2wgPT09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2VydmljZS5pbnN0YW50Q29sdW1uVmFsdWUoY29sLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBmb3JjZSBjb3B5IG9mIHN0eWxlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgLy8gVE9ETyBkZWxldGUgdGhpc1xuICBzZXRTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyA9IGRlZXBDb3B5KHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMpO1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFdpZGdldFN0eWxlcyhsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuY3VycmVudENvbG9yID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdHlsZSgpO1xuICB9XG5cbiAgc2V0V2lkZ2V0TWFyZ2luKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0TWFyZ2luRXZ0LmVtaXQoeyBpZHgsIHZhbHVlIH0pO1xuICB9XG5cbiAgc2V0V2lkZ2V0UGFkZGluZyhpZHg6IG51bWJlciwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVdpZGdldFBhZGRpbmdFdnQuZW1pdCh7IGlkeCwgdmFsdWUgfSk7XG4gIH1cblxuICBzZXRXaWRnZXRCb3JkZXJXaWR0aChpZHg6IG51bWJlciwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVdpZGdldEJvcmRlcldpZHRoRXZ0LmVtaXQoeyBpZHgsIHZhbHVlIH0pO1xuICB9XG5cbiAgc2V0V2lkZ2V0Qm9yZGVyUmFkaXVzKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyUmFkaXVzRXZ0LmVtaXQoeyBpZHgsIHZhbHVlIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0U2VjdGlvblN0eWxlcyh0aGlzLm9yaWdpbiwgbGFiZWwsIHZhbHVlKTtcbiAgICB0aGlzLnN0eWxlQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHJlcG9ydFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydFN0eWxlcyhsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgY3VzdG9tIGNvbG9yXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ3VzdG9tQ29sb3IoKSB7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21Db2xvcih0aGlzLmN1cnJlbnRDb2xvcik7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBtb2R1bGUgZXhwbG9pdCB0byBxdWlsbCB0ZXh0IGVkaXRvclxuICAgKlxuICAgKiBAcmV0dXJuc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGdldE1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWlsbE1vZHVsZXM7XG4gIH1cblxuICAvKipcbiAgICogdHJ1ZSBpcyB0aGUgaW5wdXQgdHlwZSB2YWx1ZSBpcyBlcXVhbCB0byBjdXJyZW50IHdpZGdldCB0eXBlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJuc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGlzQ2hhcnRUeXBlU2VsZWN0ZWQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmluaXRDaGFydFR5cGUgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIGlmICh2YWx1ZSA9PT0gbXlPYmouY2hhcnRUeXBlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyogbGF5b3V0IGZ1bmN0aW9ucyAqL1xuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIGEgY29sdW1uIHRvIGN1cnJlbnQgbGF5b3V0IHdpZGdldFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGFkZENvbHVtbigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZENvbHVtbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYSBvYmogdG8gY3VycmVudCBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBmaXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UuZml4ZWRDb2x1bW4oaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gcmVtb3ZlIG9iaiBvZiBjdXJyZW50IGxheW91dCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSgndW5maXhlZENvbHVtbicsIGlkeCk7XG4gIH1cblxuICAvKiBpbWFnZSBmdW5jdGlvbnMgKi9cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHNldCBpbWFnZSB1cmxcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRJbWFnZVVybCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEltYWdlVXJsKHRoaXMuaW1hZ2VVcmwpO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7IGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZyB9KSB7XG4gICAgdGhpcy5faWNvbiA9IGljb247XG4gICAgdGhpcy5fc2VydmljZS5zZXRJY29uKGljb24pO1xuICB9XG5cbiAgLyogY2hhcnQgZnVuY3Rpb25zICovXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgdGhlIHR5cGUgb2YgY2hhcnRcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRDaGFydFR5cGUodHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbml0Q2hhcnRUeXBlID0gdHJ1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldENoYXJ0VHlwZSh0eXBlKTtcbiAgfVxuXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IodmFsdWU6IG51bWJlcnxudWxsKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2VydmljZS5zZXRDaGFydEJvcmRlcldpZHRoKHZhbHVlKTtcbiAgfVxuXG4gIHRhYlZhbHVlOiBzdHJpbmcgPSAnYmFja2dyb3VuZENvbG9yJztcbiAgc2V0VGFiKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQuaW5kZXggPT09IDApIHtcbiAgICAgIHRoaXMudGFiVmFsdWUgPSAnYmFja2dyb3VuZENvbG9yJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YWJWYWx1ZSA9ICdib3JkZXJDb2xvcic7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byByZW1vdmUgYmFja2dyb3VuZCBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gcmVtb3ZlIGJvcmRlciBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHJlbW92ZUNoYXJ0Qm9yZGVyQ29sb3IoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpbmRleCk7XG4gIH1cblxuICBoaWRlTWVudSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gIH1cblxuICBvcGVuRm9ybXVsYURpYWxvZyhldmVudDogYW55KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLl9kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyk7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPSBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5pc0Zvcm11bGEgPSB0cnVlO1xuICAgIGlmIChldmVudCAhPSBudWxsICYmIGV2ZW50LnJlZmVyZW5jZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3JtdWxhID0gZXZlbnQuZm9ybXVsYTtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlZmVyZW5jZSA9IGV2ZW50LnJlZmVyZW5jZTtcbiAgICB9XG5cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1zU3ViID0gdGhpcy5fc2VydmljZS5yZXBvcnRGb3Jtc1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgdGhpcy5mb3JtcyA9IHggfHwgW107XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXRcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9PSB4KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICAgICAgdGhpcy53aWRnZXROYW1lID0gQWpmV2lkZ2V0VHlwZVt4LndpZGdldFR5cGVdO1xuICAgICAgICAgICAgdGhpcy5yZXBvcnRTdHlsZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvblN0eWxlcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy53aWRnZXRTdHlsZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2VjdGlvbkNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLndpZGdldENvbG9yID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnZpc2liaWxpdHlTZWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IG51bGw7XG4gICAgICAgICAgdGhpcy53aWRnZXROYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuX2NvbG9yU3ViID0gdGhpcy5fc2VydmljZS5jb2xvcnNcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICAgIGlmICh4ICYmIHgubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuY29sb3JzID0geDtcblxuICAgICAgICAgIHRoaXMucXVpbGxNb2R1bGVzID0ge1xuICAgICAgICAgICAgdG9vbGJhcjogW1xuICAgICAgICAgICAgICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSwgICAgICAgIC8vIHRvZ2dsZWQgYnV0dG9uc1xuICAgICAgICAgICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuICAgICAgICAgICAgICBbeyAnaGVhZGVyJzogMSB9LCB7ICdoZWFkZXInOiAyIH1dLCAgICAgICAgICAgICAgIC8vIGN1c3RvbSBidXR0b24gdmFsdWVzXG4gICAgICAgICAgICAgIFt7ICdsaXN0JzogJ29yZGVyZWQnIH0sIHsgJ2xpc3QnOiAnYnVsbGV0JyB9XSxcbiAgICAgICAgICAgICAgW3sgJ3NjcmlwdCc6ICdzdWInIH0sIHsgJ3NjcmlwdCc6ICdzdXBlcicgfV0sICAgICAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAgICAgICAgIC8vIFt7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSwgICAgICAgICAgLy8gb3V0ZGVudC9pbmRlbnRcbiAgICAgICAgICAgICAgLy8gW3sgJ2RpcmVjdGlvbic6ICdydGwnIH1dLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuXG4gICAgICAgICAgICAgIFt7ICdzaXplJzogWydzbWFsbCcsIGZhbHNlLCAnbGFyZ2UnLCAnaHVnZSddIH1dLCAgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICAgICAgICAgIFt7ICdoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdIH1dLFxuXG4gICAgICAgICAgICAgIFt7ICdjb2xvcic6IHRoaXMuY29sb3JzIH0sXG4gICAgICAgICAgICAgIHsgJ2JhY2tncm91bmQnOiB0aGlzLmNvbG9ycyB9XSwgICAgICAgICAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICAgICAgICAgIFt7ICdmb250JzogdGhpcy5mb250cyB9XSxcbiAgICAgICAgICAgICAgW3sgJ2FsaWduJzogdGhpcy5hbGlnbiB9XSxcbiAgICAgICAgICAgICAgWydmb3JtdWxhJ10sXG4gICAgICAgICAgICAgIFsnY2xlYW4nXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmb3JtYXR0aW5nIGJ1dHRvblxuXG4gICAgICAgICAgICAgIC8vIFsnbGluaycsICdjbGFzcycsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgICAgICAgICAgXVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG5cbiAgICB0aGlzLmdldEhUTUwgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBteU9iaiA9IDxBamZUZXh0V2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5odG1sVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKCc8cD48YnI+PC9wPicpKTtcblxuXG4gICAgdGhpcy5nZXRIZWlnaHRXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgZmlsdGVyKHggPT4geCAhPSBudWxsKSwgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy50b051bWJlcihteU9iai5zdHlsZXNbJ2hlaWdodCddKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsIHx8IHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldEZvbnRTaXplV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy50b051bWJlcihteU9iai5zdHlsZXNbJ2ZvbnQtc2l6ZSddKSB8fCAxMik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Rm9udEFsaWduV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoKG15T2JqLnN0eWxlc1sndGV4dC1hbGlnbiddKSB8fCAnY2VudGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFB4TnVtYmVyQXJyYXkodGhpcy50b051bWJlckFycmF5KG15T2JqLnN0eWxlc1snYm9yZGVyLXdpZHRoJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aChbMCwgMCwgMCwgMF0pKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0VG9wID0gdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzBdKVxuICAgICk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldFJpZ2h0ID0gdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzFdKVxuICAgICk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldEJvdHRvbSA9IHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVsyXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXRMZWZ0ID0gdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzNdKVxuICAgICk7XG5cbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydib3JkZXItcmFkaXVzJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aChbMCwgMCwgMCwgMF0pKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldFRvcExlZnQgPSB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzBdKVxuICAgICk7XG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXRUb3BSaWdodCA9IHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMV0pXG4gICAgKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbVJpZ2h0ID0gdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVsyXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tTGVmdCA9IHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbM10pXG4gICAgKTtcblxuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwgJiYgbXlPYmouc3R5bGVzWydtYXJnaW4nXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydtYXJnaW4nXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKFswLCAwLCAwLCAwXSkpO1xuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0VG9wID0gdGhpcy5nZXRNYXJnaW5XaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVswXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0UmlnaHQgPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzFdKVxuICAgICk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRCb3R0b20gPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzJdKVxuICAgICk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRMZWZ0ID0gdGhpcy5nZXRNYXJnaW5XaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVszXSlcbiAgICApO1xuXG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwgJiYgbXlPYmouc3R5bGVzWydwYWRkaW5nJ10gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFB4TnVtYmVyQXJyYXkodGhpcy50b051bWJlckFycmF5KG15T2JqLnN0eWxlc1sncGFkZGluZyddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXRUb3AgPSB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVswXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldFJpZ2h0ID0gdGhpcy5nZXRQYWRkaW5nV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMV0pXG4gICAgKTtcbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXRCb3R0b20gPSB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVsyXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldExlZnQgPSB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVszXSlcbiAgICApO1xuXG4gICAgdGhpcy5nZXRCYWNrZ3JvdW5kQ29sb3JXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLnN0eWxlc1snYmFja2dyb3VuZENvbG9yJ10gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldENvbG9yV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5zdHlsZXNbJ2NvbG9yJ10gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3VicyA9ICg8T2JzZXJ2YWJsZTx7aWR4OiBhbnk7IHZhbHVlOiBhbnl9Pj50aGlzLl91cGRhdGVXaWRnZXRNYXJnaW5FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldE1hcmdpbldpZGdldCkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbeyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9LCBudW1iZXJbXSB8IHVuZGVmaW5lZF0pID0+IHtcbiAgICAgICAgaWYgKHIgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgdiA9IHJbMV0gfHwgWzAsIDAsIDAsIDBdO1xuICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7IHJldHVybjsgfVxuICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ21hcmdpbicsIHYpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vicy5hZGQoKDxPYnNlcnZhYmxlPHtpZHg6IGFueTsgdmFsdWU6IGFueX0+PnRoaXMuX3VwZGF0ZVdpZGdldFBhZGRpbmdFdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldFBhZGRpbmdXaWRnZXQpKVxuICAgICAgLnN1YnNjcmliZSgocjogW3sgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfSwgbnVtYmVyW10gfCB1bmRlZmluZWRdKSA9PiB7XG4gICAgICAgIGlmIChyID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJbMF0udmFsdWU7XG4gICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkgeyByZXR1cm47IH1cbiAgICAgICAgdltpZHhdID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKCdwYWRkaW5nJywgdik7XG4gICAgICB9KSk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vic1xuICAgICAgLmFkZCgoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyV2lkdGhFdnQpXG4gICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQpKVxuICAgICAgICAuc3Vic2NyaWJlKChyOiBbeyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9LCBudW1iZXJbXSB8IHVuZGVmaW5lZF0pID0+IHtcbiAgICAgICAgICBpZiAociA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgICBjb25zdCB2ID0gclsxXSB8fCBbMCwgMCwgMCwgMF07XG4gICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkgeyByZXR1cm47IH1cbiAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcygnYm9yZGVyLXdpZHRoJywgdik7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMuYWRkKFxuICAgICAgKDxPYnNlcnZhYmxlPHtpZHg6IGFueTsgdmFsdWU6IGFueX0+PnRoaXMuX3VwZGF0ZVdpZGdldEJvcmRlclJhZGl1c0V2dClcbiAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQpKVxuICAgICAgICAuc3Vic2NyaWJlKChyOiBbeyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9LCBudW1iZXJbXSB8IHVuZGVmaW5lZF0pID0+IHtcbiAgICAgICAgICBpZiAociA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgICBjb25zdCB2ID0gclsxXSB8fCBbMCwgMCwgMCwgMF07XG4gICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkgeyByZXR1cm47IH1cbiAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcygnYm9yZGVyLXJhZGl1cycsIHYpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGNoYW5nZXMud2lkZ2V0LmN1cnJlbnRWYWx1ZTtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy53aWRnZXROYW1lID0gQWpmV2lkZ2V0VHlwZVt0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZV07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jb2xvclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2hlYWRlclN0eWxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY29udGVudFN0eWxlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvb3RlclN0eWxlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWdpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19