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
let AjfReportBuilderProperties = /** @class */ (() => {
    class AjfReportBuilderProperties {
        constructor(_dialog, _service) {
            this._dialog = _dialog;
            this._service = _service;
            /**
             *  true when the first time chart type is setted
             *
             * @memberOf AjfReportBuilderProperties
             */
            this.initChartType = false;
            /**
             * the current widget
             *
             * @memberOf AjfReportBuilderProperties
             */
            this.currentWidget = null;
            /**
             * this array contains the forms exploited for generate data labels
             *
             * @memberOf AjfReportBuilderProperties
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
                false, 'blackr', 'black-italic', 'bold', 'bold-condensed', 'bold-condensed-italic',
                'bold-italic', 'condensed', 'condensed-italic', 'italic', 'light', 'light-italic', 'medium',
                'medium-italic', 'thinr', 'thin-italic'
            ];
            this.currentModule = {};
            this.quillModules = {
                toolbar: [
                    ['formula'], ['bold', 'italic', 'underline', 'strike'],
                    // ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    // [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': this.colors }, { 'background': this.colors }],
                    [{ 'font': this.fonts }], [{ 'align': this.align }],
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
            this.iconSet = { 'icon': 'true', 'title': 'report', 'data': null };
            this.flagSet = {
                'icon': 'false',
                'class': ['flag-icon'],
                'prefixClass': 'flag-icon-',
                'title': 'flags',
                'data': [
                    { 'class': 'dz', 'info': 'Algeria' },
                    { 'class': 'ao', 'info': 'Angola' },
                    { 'class': 'bj', 'info': 'Benin' },
                    { 'class': 'bw', 'info': 'Botswana' },
                    { 'class': 'bf', 'info': 'Burkina Faso' },
                    { 'class': 'bi', 'info': 'Burundi' },
                    { 'class': 'cm', 'info': 'Cameroon' },
                    { 'class': 'cv', 'info': 'Cabo Verde' },
                    { 'class': 'cf', 'info': 'The Central African Republic' },
                    { 'class': 'td', 'info': 'Chad' },
                    { 'class': 'km', 'info': 'The Comoros' },
                    { 'class': 'ci', 'info': 'Cote D\'avoire' },
                    { 'class': 'cd', 'info': 'The Democratic Republic of Congo' },
                    { 'class': 'dj', 'info': 'Dijibouti' },
                    { 'class': 'eg', 'info': 'Egypt' },
                    { 'class': 'gq', 'info': 'Equatorial Guinea' },
                    { 'class': 'er', 'info': 'Eritrea' },
                    { 'class': 'et', 'info': 'Ethiopia' },
                    { 'class': 'tf', 'info': 'French Southern Territories' },
                    { 'class': 'ga', 'info': 'Gabon' },
                    { 'class': 'gm', 'info': 'The Gambia' },
                    { 'class': 'gh', 'info': 'Ghana' },
                    { 'class': 'gn', 'info': 'Guinea' },
                    { 'class': 'gw', 'info': 'Guinea-Bissau' },
                    { 'class': 'ke', 'info': 'Kenya' },
                    { 'class': 'ls', 'info': 'Leshotho' },
                    { 'class': 'lr', 'info': 'Liberia' },
                    { 'class': 'ly', 'info': 'Libya' },
                    { 'class': 'mg', 'info': 'Madagascar' },
                    { 'class': 'mw', 'info': 'Malawy' },
                    { 'class': 'ml', 'info': 'Mali' },
                    { 'class': 'mr', 'info': 'Mauritania' },
                    { 'class': 'mu', 'info': 'Mauritius' },
                    { 'class': 'yt', 'info': 'Mayotte' },
                    { 'class': 'ma', 'info': 'Marocco' },
                    { 'class': 'mz', 'info': 'Mozambique' },
                    { 'class': 'na', 'info': 'Namibia' },
                    { 'class': 'ne', 'info': 'Niger' },
                    { 'class': 'ng', 'info': 'Nigeria' },
                    { 'class': 'cg', 'info': 'Republic of the Congo' },
                    { 'class': 'rw', 'info': 'Rwnda' },
                    { 'class': 're', 'info': 'rèunion' },
                    { 'class': 'sh', 'info': 'Saint Helena, Ascension and Tristan da Cunha' },
                    { 'class': 'st', 'info': 'Sao Tome and Principe' },
                    { 'class': 'sn', 'info': 'Senegal' },
                    { 'class': 'sc', 'info': 'Seychelles' },
                    { 'class': 'sl', 'info': 'Sierra Leone' },
                    { 'class': 'so', 'info': 'Somalia' },
                    { 'class': 'za', 'info': 'South Africa' },
                    { 'class': 'ss', 'info': 'South Sudan' },
                    { 'class': 'sd', 'info': 'Sudan' },
                    { 'class': 'sz', 'info': 'Swaziland' },
                    { 'class': 'tz', 'info': 'Tanzania' },
                    { 'class': 'tg', 'info': 'Togo' },
                    { 'class': 'tn', 'info': 'Tunisia' },
                    { 'class': 'ug', 'info': 'Uganda' },
                    { 'class': 'eh', 'info': 'Western Sahara' },
                    { 'class': 'zm', 'info': 'Zambia' },
                    { 'class': 'zw', 'info': 'Zimbawe' },
                    { 'class': 'iq', 'info': 'Iraq' },
                    { 'class': 'lb', 'info': 'Lebanon' },
                    { 'class': 'bd', 'info': 'Bangladesh' },
                    { 'class': 'ir', 'info': 'Iran (Islamic Republic of)' },
                    { 'class': 'my', 'info': 'Malaysia' },
                    { 'class': 'np', 'info': 'Nepal' },
                    { 'class': 'pk', 'info': 'Pakistan' },
                    { 'class': 'th', 'info': 'Thailand' },
                    { 'class': 'jo', 'info': 'Jordan' },
                    { 'class': 'ye', 'info': 'Yemen' }
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
            this.iconSet.data = Object.keys(_service.iconSets).filter(x => x != 'ajf-icon').map(i => {
                return { name: i, icons: _service.iconSets[i] };
            });
            this._headerStyleSub = this._service.headerStyles.subscribe(s => {
                if (s['background-color'] != null) {
                    this.styleBackgroundColor = s['background-color'];
                }
            });
            this._contentStylesSub = this._service.contentStyles.subscribe(s => {
                if (s['background-color'] != null) {
                    this.styleBackgroundColor = s['background-color'];
                }
            });
            this._footerStylesSub = this._service.footerStyles.subscribe(s => {
                if (s['background-color'] != null) {
                    this.styleBackgroundColor = s['background-color'];
                }
            });
            this._originSub = this._service.origin.subscribe(s => {
                this.origin = s;
            });
        }
        get currentLayoutWidget() {
            return this.currentWidget;
        }
        get currentTextWidget() {
            return this.currentWidget;
        }
        get icon() {
            return this._icon;
        }
        /**
         *
         * UTILS
         */
        /**
         * return a number value
         *
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        toNumber(value) {
            let numberPattern = /^(-)?\d+/g;
            if (value == null) {
                return 0;
            }
            else {
                const matches = value.match(numberPattern);
                if (matches == null || matches.length == 0) {
                    return 0;
                }
                return Number(matches[0]);
            }
        }
        toNumberArray(value) {
            if (value == null) {
                return [];
            }
            else {
                return (value || '')
                    .replace('px', '')
                    .split(' ')
                    .filter(v => v !== '' && v != null)
                    .map(v => this.toNumber(v));
            }
        }
        fillPxNumberArray(value) {
            const vl = value.length;
            switch (vl) {
                case 0:
                    return [0, 0, 0, 0];
                case 1:
                    const v = value[0];
                    return [v, v, v, v];
                case 2:
                    const v21 = value[0];
                    const v22 = value[1];
                    return [v21, v22, v21, v22];
                case 3:
                    const v31 = value[0];
                    const v32 = value[1];
                    const v33 = value[2];
                    return [v31, v32, v33, v32];
                default:
                    return value;
            }
        }
        percent(value) {
            let temp = this.roundTo(value * 100, 3);
            return temp;
        }
        roundTo(value, decimalPositions) {
            let i = value * Math.pow(10, decimalPositions);
            i = Math.floor(i);
            return i / Math.pow(10, decimalPositions);
        }
        /**
         * call to service to set the forms
         *
         * @memberOf AjfReportBuilderProperties
         */
        setForms() {
            let forms = [];
            try {
                for (let i = 0; i < this.formsJson.forms.length; i++) {
                    forms.push(deepCopy(this.formsJson.forms[i]));
                }
                this._service.setReportForms(forms);
            }
            catch (e) {
            }
        }
        /**
         * call to service to set the width of the idx column of layout widget
         *
         * @param col
         * @param idx
         *
         * @memberOf AjfReportBuilderProperties
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
         * @memberOf AjfReportBuilderProperties
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
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        setWidgetStyles(label, value) {
            this._service.setWidgetStyles(label, value);
            this.currentColor = value;
            this.setStyle();
        }
        setWidgetMargin(idx, value) {
            this._updateWidgetMarginEvt.emit({ idx, value });
        }
        setWidgetPadding(idx, value) {
            this._updateWidgetPaddingEvt.emit({ idx, value });
        }
        setWidgetBorderWidth(idx, value) {
            this._updateWidgetBorderWidthEvt.emit({ idx, value });
        }
        setWidgetBorderRadius(idx, value) {
            this._updateWidgetBorderRadiusEvt.emit({ idx, value });
        }
        /**
         * call to service to add new style to section
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        setSectionStyles(label, value) {
            this._service.setSectionStyles(this.origin, label, value);
            this.styleColor = value;
        }
        /**
         * call to service to add new style to report
         *
         * @param label
         * @param value
         *
         * @memberOf AjfReportBuilderProperties
         */
        setReportStyles(label, value) {
            this._service.setReportStyles(label, value);
            this.styleBackgroundColor = value;
        }
        /**
         * add custom color
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        addCustomColor() {
            this._service.addCustomColor(this.currentColor);
            this._service.updateCurrentWidget(this.currentWidget);
        }
        /**
         * get the module exploit to quill text editor
         *
         * @returns
         *
         * @memberOf AjfReportBuilderProperties
         */
        getModule() {
            return this.quillModules;
        }
        /**
         * true is the input type value is equal to current widget type
         *
         * @param value
         * @returns
         *
         * @memberOf AjfReportBuilderProperties
         */
        isChartTypeSelected(value) {
            if (this.initChartType == false) {
                return false;
            }
            const myObj = this.currentWidget;
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
         * @memberOf AjfReportBuilderProperties
         */
        addColumn() {
            this._service.addColumn();
        }
        /**
         * call to service to add a obj to current layout widget
         *
         * @param idx
         *
         * @memberOf AjfReportBuilderProperties
         */
        fixedColumn(idx) {
            this._service.fixedColumn(idx);
        }
        /**
         * call to service to remove obj of current layout widget
         *
         * @param idx
         *
         * @memberOf AjfReportBuilderProperties
         */
        unfixedColumn(idx) {
            this._service.remove('unfixedColumn', idx);
        }
        /* image functions */
        /**
         * call to service to set image url
         *
         *
         * @memberOf AjfReportBuilderProperties
         */
        setImageUrl() {
            this._service.setImageUrl(this.imageUrl);
        }
        setIcon(icon) {
            this._icon = icon;
            this._service.setIcon(icon);
        }
        /* chart functions */
        /**
         * call to service to set the type of chart
         *
         * @param type
         *
         * @memberOf AjfReportBuilderProperties
         */
        setChartType(type) {
            this.initChartType = true;
            this._service.setChartType(type);
        }
        setChartBorderColor(value) {
            if (value == null) {
                return;
            }
            this._service.setChartBorderWidth(value);
        }
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
         * @param index
         *
         * @memberOf AjfReportBuilderProperties
         */
        removeChartBackgroundColor(index) {
            this._service.removeChartBackgroundColor(index);
        }
        /**
         * call to service to remove border color to current chart
         *
         * @param index
         *
         * @memberOf AjfReportBuilderProperties
         */
        removeChartBorderColor(index) {
            this._service.removeChartBorderColor(index);
        }
        hideMenu() {
            this._service.updateCurrentWidget(null);
        }
        openFormulaDialog(event) {
            this.dialogRef = this._dialog.open(AjfReportBuilderFormsAnalyzerDialog);
            this.dialogRef.componentInstance.aggregation = AjfAggregationType.None;
            this.dialogRef.componentInstance.isFormula = true;
            if (event != null && event.reference != null) {
                this.dialogRef.componentInstance.formula = event.formula;
                this.dialogRef.componentInstance.reference = event.reference;
            }
        }
        ngOnInit() {
            this._formsSub = this._service.reportForms.subscribe(x => {
                this.forms = x || [];
            });
            this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
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
            });
            this._colorSub = this._service.colors.subscribe(x => {
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
                            [
                                { 'color': this.colors }, { 'background': this.colors }
                            ],
                            [{ 'font': this.fonts }], [{ 'align': this.align }], ['formula'],
                            ['clean'],
                        ]
                    };
                }
            });
            this.getHTML = this._service.currentWidget.pipe(map((widget) => {
                if (widget != null) {
                    const myObj = this.currentWidget;
                    return myObj.htmlText;
                }
                return '';
            }), distinctUntilChanged(), startWith('<p><br></p>'));
            this.getHeightWidget = this._service.currentWidget.pipe(filter(x => x != null), map((myObj) => {
                if (myObj != null) {
                    let value = this.toNumber(myObj.styles['height']);
                    if (value != null || value != null) {
                        return value;
                    }
                }
                return undefined;
            }), distinctUntilChanged());
            this.getFontSizeWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null) {
                    return (this.toNumber(myObj.styles['font-size']) || 12);
                }
                return undefined;
            }), distinctUntilChanged());
            this.getFontAlignWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null) {
                    return ((myObj.styles['text-align']) || 'center');
                }
                return undefined;
            }), distinctUntilChanged());
            this.getBorderWidthWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null) {
                    return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-width']));
                }
                return undefined;
            }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
            this.getBorderWidthWidgetTop =
                this.getBorderWidthWidget.pipe(filter(m => m != null), map(m => m[0]));
            this.getBorderWidthWidgetRight =
                this.getBorderWidthWidget.pipe(filter(m => m != null), map(m => m[1]));
            this.getBorderWidthWidgetBottom =
                this.getBorderWidthWidget.pipe(filter(m => m != null), map(m => m[2]));
            this.getBorderWidthWidgetLeft =
                this.getBorderWidthWidget.pipe(filter(m => m != null), map(m => m[3]));
            this.getBorderRadiusWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null) {
                    return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-radius']));
                }
                return undefined;
            }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
            this.getBorderRadiusWidgetTopLeft =
                this.getBorderRadiusWidget.pipe(filter(m => m != null), map(m => m[0]));
            this.getBorderRadiusWidgetTopRight =
                this.getBorderRadiusWidget.pipe(filter(m => m != null), map(m => m[1]));
            this.getBorderRadiusWidgetBottomRight =
                this.getBorderRadiusWidget.pipe(filter(m => m != null), map(m => m[2]));
            this.getBorderRadiusWidgetBottomLeft =
                this.getBorderRadiusWidget.pipe(filter(m => m != null), map(m => m[3]));
            this.getMarginWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null && myObj.styles != null && myObj.styles['margin'] != null) {
                    return this.fillPxNumberArray(this.toNumberArray(myObj.styles['margin']));
                }
                return undefined;
            }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
            this.getMarginWidgetTop = this.getMarginWidget.pipe(filter(m => m != null), map(m => m[0]));
            this.getMarginWidgetRight = this.getMarginWidget.pipe(filter(m => m != null), map(m => m[1]));
            this.getMarginWidgetBottom = this.getMarginWidget.pipe(filter(m => m != null), map(m => m[2]));
            this.getMarginWidgetLeft = this.getMarginWidget.pipe(filter(m => m != null), map(m => m[3]));
            this.getPaddingWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null && myObj.styles != null && myObj.styles['padding'] != null) {
                    return this.fillPxNumberArray(this.toNumberArray(myObj.styles['padding']));
                }
                return undefined;
            }), distinctUntilChanged());
            this.getPaddingWidgetTop = this.getPaddingWidget.pipe(filter(m => m != null), map(m => m[0]));
            this.getPaddingWidgetRight =
                this.getPaddingWidget.pipe(filter(m => m != null), map(m => m[1]));
            this.getPaddingWidgetBottom =
                this.getPaddingWidget.pipe(filter(m => m != null), map(m => m[2]));
            this.getPaddingWidgetLeft = this.getPaddingWidget.pipe(filter(m => m != null), map(m => m[3]));
            this.getBackgroundColorWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null && myObj.styles != null) {
                    return myObj.styles['backgroundColor'] || '';
                }
            }), distinctUntilChanged());
            this.getColorWidget = this._service.currentWidget.pipe(map((myObj) => {
                if (myObj != null && myObj.styles != null) {
                    return myObj.styles['color'] || '';
                }
            }), distinctUntilChanged());
            this._stylesUpdatesSubs =
                this._updateWidgetMarginEvt
                    .pipe(withLatestFrom(this.getMarginWidget))
                    .subscribe((r) => {
                    if (r == null) {
                        return;
                    }
                    const idx = r[0].idx;
                    const value = r[0].value;
                    const v = r[1] || [0, 0, 0, 0];
                    if (v == null || v.length < idx) {
                        return;
                    }
                    v[idx] = value;
                    this.setWidgetStyles('margin', v);
                });
            this._stylesUpdatesSubs.add(this._updateWidgetPaddingEvt
                .pipe(withLatestFrom(this.getPaddingWidget))
                .subscribe((r) => {
                if (r == null) {
                    return;
                }
                const idx = r[0].idx;
                const value = r[0].value;
                const v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                this.setWidgetStyles('padding', v);
            }));
            this._stylesUpdatesSubs.add(this._updateWidgetBorderWidthEvt
                .pipe(withLatestFrom(this.getBorderWidthWidget))
                .subscribe((r) => {
                if (r == null) {
                    return;
                }
                const idx = r[0].idx;
                const value = r[0].value;
                const v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                this.setWidgetStyles('border-width', v);
            }));
            this._stylesUpdatesSubs.add(this._updateWidgetBorderRadiusEvt
                .pipe(withLatestFrom(this.getBorderRadiusWidget))
                .subscribe((r) => {
                if (r == null) {
                    return;
                }
                const idx = r[0].idx;
                const value = r[0].value;
                const v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                this.setWidgetStyles('border-radius', v);
            }));
        }
        ngOnChanges(changes) {
            this.currentWidget = changes.widget.currentValue;
            if (this.currentWidget == null) {
                return;
            }
            this.widgetName = AjfWidgetType[this.currentWidget.widgetType];
        }
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
    return AjfReportBuilderProperties;
})();
export { AjfReportBuilderProperties };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFDTCxrQkFBa0IsRUFLbEIsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFJWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVGLE9BQU8sRUFBQyxtQ0FBbUMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTVFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFO0lBQUEsTUFPYSwwQkFBMEI7UUFnUnJDLFlBQW9CLE9BQWtCLEVBQVUsUUFBaUM7WUFBN0QsWUFBTyxHQUFQLE9BQU8sQ0FBVztZQUFVLGFBQVEsR0FBUixRQUFRLENBQXlCO1lBL1FqRjs7OztlQUlHO1lBQ0gsa0JBQWEsR0FBRyxLQUFLLENBQUM7WUFFdEI7Ozs7ZUFJRztZQUNILGtCQUFhLEdBQW1CLElBQUksQ0FBQztZQVFyQzs7OztlQUlHO1lBQ0gsVUFBSyxHQUFjLEVBQUUsQ0FBQztZQUd0QixXQUFNLEdBQWEsRUFBRSxDQUFDO1lBU3RCOztlQUVHO1lBRUgsY0FBUyxHQUFRLEVBQUMsS0FB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LENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBRUQsV0FBVyxDQUFDLE9BQVk7WUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUNqRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO2dCQUM5QixPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsQ0FBQzs7O2dCQXA0QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwrQkFBK0I7b0JBQ3pDLCtoK0JBQThCO29CQUU5QixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFkTyxTQUFTO2dCQU1ULHVCQUF1Qjs7SUF1NEIvQixpQ0FBQztLQUFBO1NBOTNCWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIEFqZkFnZ3JlZ2F0aW9uVHlwZSxcbiAgQWpmQ2hhcnRXaWRnZXQsXG4gIEFqZkxheW91dFdpZGdldCxcbiAgQWpmVGV4dFdpZGdldCxcbiAgQWpmV2lkZ2V0LFxuICBBamZXaWRnZXRUeXBlXG59IGZyb20gJ0BhamYvY29yZS9yZXBvcnRzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2d9IGZyb20gJy4vZm9ybXMtYW5hbHl6ZXItZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybVZhcmlhYmxlc30gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXJlcG9ydC1idWlsZGVyLXByb3BlcnRpZXMnLFxuICB0ZW1wbGF0ZVVybDogJ3Byb3BlcnRpZXMuaHRtbCcsXG4gIHN0eWxlVXJsczogWydwcm9wZXJ0aWVzLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllcyBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogIHRydWUgd2hlbiB0aGUgZmlyc3QgdGltZSBjaGFydCB0eXBlIGlzIHNldHRlZFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGluaXRDaGFydFR5cGUgPSBmYWxzZTtcblxuICAvKipcbiAgICogdGhlIGN1cnJlbnQgd2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgY3VycmVudFdpZGdldDogQWpmV2lkZ2V0fG51bGwgPSBudWxsO1xuICBnZXQgY3VycmVudExheW91dFdpZGdldCgpOiBBamZMYXlvdXRXaWRnZXQge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRXaWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0O1xuICB9XG4gIGdldCBjdXJyZW50VGV4dFdpZGdldCgpOiBBamZUZXh0V2lkZ2V0IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50V2lkZ2V0IGFzIEFqZlRleHRXaWRnZXQ7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBhcnJheSBjb250YWlucyB0aGUgZm9ybXMgZXhwbG9pdGVkIGZvciBnZW5lcmF0ZSBkYXRhIGxhYmVsc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGZvcm1zOiBBamZGb3JtW10gPSBbXTtcblxuXG4gIGNvbG9yczogc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgICogdGhlIG5hbWUgb2YgdGhlIHNlY3Rpb24gdGhhdCBjb250YWlucyB0aGUgY3VycmVudFdpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIG9yaWdpbjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGQUtFIERBVEFcbiAgICovXG5cbiAgZm9ybXNKc29uOiBhbnkgPSB7Zm9ybXM6IFtdfTtcblxuICAvKipcbiAgICogV0lER0VUXG4gICAqL1xuXG4gIHdpZGdldE5hbWUgPSAnJztcbiAgZ2V0SFRNTDogT2JzZXJ2YWJsZTxzdHJpbmd8dW5kZWZpbmVkPjtcbiAgZ2V0SGVpZ2h0V2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcnx1bmRlZmluZWQ+O1xuICBnZXRGb250U2l6ZVdpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJ8dW5kZWZpbmVkPjtcbiAgZ2V0Rm9udEFsaWduV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcnx1bmRlZmluZWQ+O1xuICBnZXRCYWNrZ3JvdW5kQ29sb3JXaWRnZXQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgZ2V0Q29sb3JXaWRnZXQ6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgZ2V0U3R5bGU6IE9ic2VydmFibGU8YW55PjtcbiAgZ2V0Q2hhcnRCYWNrZ3JvdW5kQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRDaGFydEJvcmRlckNvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0VmlzaWJpbGl0eTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24+O1xuICBnZXRDb2xvcjogT2JzZXJ2YWJsZTxTdHJpbmdbXT47XG5cbiAgbWFyZ2luRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0TWFyZ2luV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcltdfHVuZGVmaW5lZD47XG4gIGdldE1hcmdpbldpZGdldFRvcDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRNYXJnaW5XaWRnZXRSaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRNYXJnaW5XaWRnZXRCb3R0b206IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0TGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHBhZGRpbmdFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRQYWRkaW5nV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcltdfHVuZGVmaW5lZD47XG4gIGdldFBhZGRpbmdXaWRnZXRUb3A6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0UGFkZGluZ1dpZGdldFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldFBhZGRpbmdXaWRnZXRCb3R0b206IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0UGFkZGluZ1dpZGdldExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBib3JkZXJXaWR0aEV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcltdfHVuZGVmaW5lZD47XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0VG9wOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0UmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXRCb3R0b206IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXRMZWZ0OiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgYm9yZGVyUmFkaXVzRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcltdfHVuZGVmaW5lZD47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldFRvcExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0VG9wUmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tUmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tTGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGJhY2tncm91bmRDb2xvciA9ICcjMTI3YmRjJztcbiAgc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwyNTUsMjU1LDApJztcbiAgYm9yZGVyQ29sb3IgPSAnIzEyN2JkYyc7XG4gIHN0eWxlQ29sb3IgPSAncmdiKDAsMCwwLDApJztcbiAgd2JhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBmb250U2l6ZTogc3RyaW5nO1xuICBidWJibGU6IHN0cmluZztcblxuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz47XG4gIGNvbnRhaW5lcjogQWpmRm9ybVZhcmlhYmxlcztcblxuXG4gIGFsaWduID0gW2ZhbHNlLCAnY2VudGVyJywgJ3JpZ2h0JywgJ2p1c3RpZnknXTtcblxuICBmb250cyA9IFtcbiAgICBmYWxzZSwgJ2JsYWNrcicsICdibGFjay1pdGFsaWMnLCAnYm9sZCcsICdib2xkLWNvbmRlbnNlZCcsICdib2xkLWNvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdib2xkLWl0YWxpYycsICdjb25kZW5zZWQnLCAnY29uZGVuc2VkLWl0YWxpYycsICdpdGFsaWMnLCAnbGlnaHQnLCAnbGlnaHQtaXRhbGljJywgJ21lZGl1bScsXG4gICAgJ21lZGl1bS1pdGFsaWMnLCAndGhpbnInLCAndGhpbi1pdGFsaWMnXG4gIF07XG4gIGN1cnJlbnRNb2R1bGU6IGFueSA9IHt9O1xuICBxdWlsbE1vZHVsZXMgPSB7XG4gICAgdG9vbGJhcjogW1xuICAgICAgWydmb3JtdWxhJ10sIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuXG4gICAgICBbeydoZWFkZXInOiAxfSwgeydoZWFkZXInOiAyfV0sICAvLyBjdXN0b20gYnV0dG9uIHZhbHVlc1xuICAgICAgW3snbGlzdCc6ICdvcmRlcmVkJ30sIHsnbGlzdCc6ICdidWxsZXQnfV0sXG4gICAgICBbeydzY3JpcHQnOiAnc3ViJ30sIHsnc2NyaXB0JzogJ3N1cGVyJ31dLCAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAvLyBbeyAnaW5kZW50JzogJy0xJ30sIHsgJ2luZGVudCc6ICcrMScgfV0sICAgICAgICAgIC8vIG91dGRlbnQvaW5kZW50XG4gICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgIFt7J3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ119XSwgIC8vIGN1c3RvbSBkcm9wZG93blxuICAgICAgW3snaGVhZGVyJzogWzEsIDIsIDMsIDQsIDUsIDYsIGZhbHNlXX1dLFxuXG4gICAgICBbeydjb2xvcic6IHRoaXMuY29sb3JzfSwgeydiYWNrZ3JvdW5kJzogdGhpcy5jb2xvcnN9XSwgIC8vIGRyb3Bkb3duIHdpdGggZGVmYXVsdHMgZnJvbSB0aGVtZVxuICAgICAgW3snZm9udCc6IHRoaXMuZm9udHN9XSwgW3snYWxpZ24nOiB0aGlzLmFsaWdufV0sXG5cbiAgICAgIFsnY2xlYW4nXSwgIC8vIHJlbW92ZSBmb3JtYXR0aW5nIGJ1dHRvblxuXG4gICAgICAvLyBbJ2xpbmsnLCAnY2xhc3MnLCAndmlkZW8nXSAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIGFuZCBpbWFnZSwgdmlkZW9cbiAgICBdXG4gIH07XG5cbiAgLyoqXG4gICAqIENIQVJUXG4gICAqL1xuXG5cbiAgZ2V0Q2hhcnRZTGFiZWxzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcblxuICBjaGFydEJvcmRlckNvbG9yOiBzdHJpbmdbXSA9IFtdO1xuICBjaGFydEJvcmRlcldpZHRoID0gMztcblxuICAvKipcbiAgICpcbiAgICogSU1BR0VcbiAgICovXG5cbiAgaW1hZ2VVcmwgPSAnaHR0cHM6Ly9hbmd1bGFyLmlvL3Jlc291cmNlcy9pbWFnZXMvbG9nb3MvYW5ndWxhcjIvYW5ndWxhci5wbmcnO1xuXG4gIC8qKlxuICAgKlxuICAgKiBURVhUXG4gICAqL1xuXG4gIGh0bWxUZXh0ID0gJyc7XG5cblxuICAvKipcbiAgICogdGhlc2UgdmFyaWFibGVzIGluZGljYXRlIHRoYXQgdGhlIHVzZXIgd2FudCB0byBjaGFuZ2Ugc2VjdGlvblxuICAgKi9cbiAgcmVwb3J0U3R5bGVzID0gZmFsc2U7XG4gIHNlY3Rpb25TdHlsZXMgPSBmYWxzZTtcbiAgd2lkZ2V0U3R5bGVzID0gdHJ1ZTtcbiAgc2VjdGlvbkNvbG9yID0gZmFsc2U7XG4gIHdpZGdldENvbG9yID0gZmFsc2U7XG4gIHZpc2liaWxpdHlTZWN0aW9uID0gZmFsc2U7XG4gIGN1cnJlbnRDb2xvciA9ICcnO1xuXG4gIHByaXZhdGUgX2ljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9fG51bGwgPSBudWxsO1xuICBnZXQgaWNvbigpOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuXG4gIGljb25TZXQ6IGFueSA9IHsnaWNvbic6ICd0cnVlJywgJ3RpdGxlJzogJ3JlcG9ydCcsICdkYXRhJzogbnVsbH07XG5cbiAgZmxhZ1NldDogYW55ID0ge1xuICAgICdpY29uJzogJ2ZhbHNlJyxcbiAgICAnY2xhc3MnOiBbJ2ZsYWctaWNvbiddLFxuICAgICdwcmVmaXhDbGFzcyc6ICdmbGFnLWljb24tJyxcbiAgICAndGl0bGUnOiAnZmxhZ3MnLFxuICAgICdkYXRhJzpcbiAgICAgICAgW1xuICAgICAgICAgIHsnY2xhc3MnOiAnZHonLCAnaW5mbyc6ICdBbGdlcmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdhbycsICdpbmZvJzogJ0FuZ29sYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnYmonLCAnaW5mbyc6ICdCZW5pbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnYncnLCAnaW5mbyc6ICdCb3Rzd2FuYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnYmYnLCAnaW5mbyc6ICdCdXJraW5hIEZhc28nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2JpJywgJ2luZm8nOiAnQnVydW5kaSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnY20nLCAnaW5mbyc6ICdDYW1lcm9vbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnY3YnLCAnaW5mbyc6ICdDYWJvIFZlcmRlJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdjZicsICdpbmZvJzogJ1RoZSBDZW50cmFsIEFmcmljYW4gUmVwdWJsaWMnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3RkJywgJ2luZm8nOiAnQ2hhZCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAna20nLCAnaW5mbyc6ICdUaGUgQ29tb3Jvcyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnY2knLCAnaW5mbyc6ICdDb3RlIERcXCdhdm9pcmUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2NkJywgJ2luZm8nOiAnVGhlIERlbW9jcmF0aWMgUmVwdWJsaWMgb2YgQ29uZ28nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2RqJywgJ2luZm8nOiAnRGlqaWJvdXRpJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdlZycsICdpbmZvJzogJ0VneXB0J30sXG4gICAgICAgICAgeydjbGFzcyc6ICdncScsICdpbmZvJzogJ0VxdWF0b3JpYWwgR3VpbmVhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdlcicsICdpbmZvJzogJ0VyaXRyZWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2V0JywgJ2luZm8nOiAnRXRoaW9waWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3RmJywgJ2luZm8nOiAnRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdnYScsICdpbmZvJzogJ0dhYm9uJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdnbScsICdpbmZvJzogJ1RoZSBHYW1iaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2doJywgJ2luZm8nOiAnR2hhbmEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2duJywgJ2luZm8nOiAnR3VpbmVhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdndycsICdpbmZvJzogJ0d1aW5lYS1CaXNzYXUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2tlJywgJ2luZm8nOiAnS2VueWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2xzJywgJ2luZm8nOiAnTGVzaG90aG8nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2xyJywgJ2luZm8nOiAnTGliZXJpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbHknLCAnaW5mbyc6ICdMaWJ5YSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbWcnLCAnaW5mbyc6ICdNYWRhZ2FzY2FyJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdtdycsICdpbmZvJzogJ01hbGF3eSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbWwnLCAnaW5mbyc6ICdNYWxpJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdtcicsICdpbmZvJzogJ01hdXJpdGFuaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ211JywgJ2luZm8nOiAnTWF1cml0aXVzJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd5dCcsICdpbmZvJzogJ01heW90dGUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ21hJywgJ2luZm8nOiAnTWFyb2Njbyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbXonLCAnaW5mbyc6ICdNb3phbWJpcXVlJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICduYScsICdpbmZvJzogJ05hbWliaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ25lJywgJ2luZm8nOiAnTmlnZXInfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ25nJywgJ2luZm8nOiAnTmlnZXJpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnY2cnLCAnaW5mbyc6ICdSZXB1YmxpYyBvZiB0aGUgQ29uZ28nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3J3JywgJ2luZm8nOiAnUnduZGEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3JlJywgJ2luZm8nOiAncsOodW5pb24nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NoJywgJ2luZm8nOiAnU2FpbnQgSGVsZW5hLCBBc2NlbnNpb24gYW5kIFRyaXN0YW4gZGEgQ3VuaGEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3N0JywgJ2luZm8nOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzbicsICdpbmZvJzogJ1NlbmVnYWwnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NjJywgJ2luZm8nOiAnU2V5Y2hlbGxlcyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc2wnLCAnaW5mbyc6ICdTaWVycmEgTGVvbmUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NvJywgJ2luZm8nOiAnU29tYWxpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnemEnLCAnaW5mbyc6ICdTb3V0aCBBZnJpY2EnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NzJywgJ2luZm8nOiAnU291dGggU3VkYW4nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NkJywgJ2luZm8nOiAnU3VkYW4nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3N6JywgJ2luZm8nOiAnU3dhemlsYW5kJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd0eicsICdpbmZvJzogJ1RhbnphbmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd0ZycsICdpbmZvJzogJ1RvZ28nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3RuJywgJ2luZm8nOiAnVHVuaXNpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndWcnLCAnaW5mbyc6ICdVZ2FuZGEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2VoJywgJ2luZm8nOiAnV2VzdGVybiBTYWhhcmEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3ptJywgJ2luZm8nOiAnWmFtYmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd6dycsICdpbmZvJzogJ1ppbWJhd2UnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2lxJywgJ2luZm8nOiAnSXJhcSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbGInLCAnaW5mbyc6ICdMZWJhbm9uJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdiZCcsICdpbmZvJzogJ0JhbmdsYWRlc2gnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2lyJywgJ2luZm8nOiAnSXJhbiAoSXNsYW1pYyBSZXB1YmxpYyBvZiknfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ215JywgJ2luZm8nOiAnTWFsYXlzaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ25wJywgJ2luZm8nOiAnTmVwYWwnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3BrJywgJ2luZm8nOiAnUGFraXN0YW4nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3RoJywgJ2luZm8nOiAnVGhhaWxhbmQnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2pvJywgJ2luZm8nOiAnSm9yZGFuJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd5ZScsICdpbmZvJzogJ1llbWVuJ31cbiAgICAgICAgXVxuICB9O1xuXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29sb3JTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb3JpZ2luU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3N0eWxlc1VwZGF0ZXNTdWJzOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0TWFyZ2luRXZ0OiBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PigpO1xuICBwcml2YXRlIF91cGRhdGVXaWRnZXRQYWRkaW5nRXZ0OiBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PigpO1xuICBwcml2YXRlIF91cGRhdGVXaWRnZXRCb3JkZXJXaWR0aEV2dDogRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4oKTtcbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0Qm9yZGVyUmFkaXVzRXZ0OiBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuc2V0Rm9ybXMoKTtcblxuICAgIHRoaXMuaWNvblNldC5kYXRhID0gT2JqZWN0LmtleXMoX3NlcnZpY2UuaWNvblNldHMpLmZpbHRlcih4ID0+IHggIT0gJ2FqZi1pY29uJykubWFwKGkgPT4ge1xuICAgICAgcmV0dXJuIHtuYW1lOiBpLCBpY29uczogX3NlcnZpY2UuaWNvblNldHNbaV19O1xuICAgIH0pO1xuXG4gICAgdGhpcy5faGVhZGVyU3R5bGVTdWIgPSB0aGlzLl9zZXJ2aWNlLmhlYWRlclN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9jb250ZW50U3R5bGVzU3ViID0gdGhpcy5fc2VydmljZS5jb250ZW50U3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2Zvb3RlclN0eWxlc1N1YiA9IHRoaXMuX3NlcnZpY2UuZm9vdGVyU3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX29yaWdpblN1YiA9IHRoaXMuX3NlcnZpY2Uub3JpZ2luLnN1YnNjcmliZShzID0+IHtcbiAgICAgIHRoaXMub3JpZ2luID0gcztcbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqXG4gICAqIFVUSUxTXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIHJldHVybiBhIG51bWJlciB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICB0b051bWJlcih2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBsZXQgbnVtYmVyUGF0dGVybiA9IC9eKC0pP1xcZCsvZztcblxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKG51bWJlclBhdHRlcm4pO1xuICAgICAgaWYgKG1hdGNoZXMgPT0gbnVsbCB8fCBtYXRjaGVzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE51bWJlcihtYXRjaGVzWzBdKTtcbiAgICB9XG4gIH1cblxuICB0b051bWJlckFycmF5KHZhbHVlOiBzdHJpbmcpOiBudW1iZXJbXSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICh2YWx1ZSB8fCAnJylcbiAgICAgICAgICAucmVwbGFjZSgncHgnLCAnJylcbiAgICAgICAgICAuc3BsaXQoJyAnKVxuICAgICAgICAgIC5maWx0ZXIodiA9PiB2ICE9PSAnJyAmJiB2ICE9IG51bGwpXG4gICAgICAgICAgLm1hcCh2ID0+IHRoaXMudG9OdW1iZXIodikpO1xuICAgIH1cbiAgfVxuXG4gIGZpbGxQeE51bWJlckFycmF5KHZhbHVlOiBudW1iZXJbXSkge1xuICAgIGNvbnN0IHZsID0gdmFsdWUubGVuZ3RoO1xuICAgIHN3aXRjaCAodmwpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc3QgdiA9IHZhbHVlWzBdO1xuICAgICAgICByZXR1cm4gW3YsIHYsIHYsIHZdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCB2MjEgPSB2YWx1ZVswXTtcbiAgICAgICAgY29uc3QgdjIyID0gdmFsdWVbMV07XG4gICAgICAgIHJldHVybiBbdjIxLCB2MjIsIHYyMSwgdjIyXTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY29uc3QgdjMxID0gdmFsdWVbMF07XG4gICAgICAgIGNvbnN0IHYzMiA9IHZhbHVlWzFdO1xuICAgICAgICBjb25zdCB2MzMgPSB2YWx1ZVsyXTtcbiAgICAgICAgcmV0dXJuIFt2MzEsIHYzMiwgdjMzLCB2MzJdO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHBlcmNlbnQodmFsdWU6IG51bWJlcikge1xuICAgIGxldCB0ZW1wID0gdGhpcy5yb3VuZFRvKHZhbHVlICogMTAwLCAzKTtcbiAgICByZXR1cm4gdGVtcDtcbiAgfVxuXG4gIHJvdW5kVG8odmFsdWU6IG51bWJlciwgZGVjaW1hbFBvc2l0aW9uczogbnVtYmVyKSB7XG4gICAgbGV0IGkgPSB2YWx1ZSAqIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcblxuICAgIGkgPSBNYXRoLmZsb29yKGkpO1xuXG4gICAgcmV0dXJuIGkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG4gIH1cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgdGhlIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cblxuICBzZXRGb3JtcygpOiB2b2lkIHtcbiAgICBsZXQgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZm9ybXNKc29uLmZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvcm1zLnB1c2goZGVlcENvcHkodGhpcy5mb3Jtc0pzb24uZm9ybXNbaV0pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0Rm9ybXMoZm9ybXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHNldCB0aGUgd2lkdGggb2YgdGhlIGlkeCBjb2x1bW4gb2YgbGF5b3V0IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gY29sXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBpbnN0YW50Q29sdW1uVmFsdWUoY29sOiBudW1iZXJ8bnVsbCwgaWR4OiBudW1iZXIpIHtcbiAgICBpZiAoY29sID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuaW5zdGFudENvbHVtblZhbHVlKGNvbCwgaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgZm9yY2UgY29weSBvZiBzdHlsZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIC8vIFRPRE8gZGVsZXRlIHRoaXNcbiAgc2V0U3R5bGUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMgPSBkZWVwQ29weSh0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIG5ldyBzdHlsZSB0byB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFdpZGdldFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRXaWRnZXRTdHlsZXMobGFiZWwsIHZhbHVlKTtcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IHZhbHVlO1xuICAgIHRoaXMuc2V0U3R5bGUoKTtcbiAgfVxuXG4gIHNldFdpZGdldE1hcmdpbihpZHg6IG51bWJlciwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVdpZGdldE1hcmdpbkV2dC5lbWl0KHtpZHgsIHZhbHVlfSk7XG4gIH1cblxuICBzZXRXaWRnZXRQYWRkaW5nKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0UGFkZGluZ0V2dC5lbWl0KHtpZHgsIHZhbHVlfSk7XG4gIH1cblxuICBzZXRXaWRnZXRCb3JkZXJXaWR0aChpZHg6IG51bWJlciwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVdpZGdldEJvcmRlcldpZHRoRXZ0LmVtaXQoe2lkeCwgdmFsdWV9KTtcbiAgfVxuXG4gIHNldFdpZGdldEJvcmRlclJhZGl1cyhpZHg6IG51bWJlciwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVdpZGdldEJvcmRlclJhZGl1c0V2dC5lbWl0KHtpZHgsIHZhbHVlfSk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0U2VjdGlvblN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRTZWN0aW9uU3R5bGVzKHRoaXMub3JpZ2luLCBsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVDb2xvciA9IHZhbHVlO1xuICB9XG5cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gcmVwb3J0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0U3R5bGVzKGxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBjdXN0b20gY29sb3JcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBhZGRDdXN0b21Db2xvcigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbUNvbG9yKHRoaXMuY3VycmVudENvbG9yKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIG1vZHVsZSBleHBsb2l0IHRvIHF1aWxsIHRleHQgZWRpdG9yXG4gICAqXG4gICAqIEByZXR1cm5zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgZ2V0TW9kdWxlKCkge1xuICAgIHJldHVybiB0aGlzLnF1aWxsTW9kdWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB0cnVlIGlzIHRoZSBpbnB1dCB0eXBlIHZhbHVlIGlzIGVxdWFsIHRvIGN1cnJlbnQgd2lkZ2V0IHR5cGVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgaXNDaGFydFR5cGVTZWxlY3RlZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuaW5pdENoYXJ0VHlwZSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgaWYgKHZhbHVlID09PSBteU9iai5jaGFydFR5cGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cblxuICAvKiBsYXlvdXQgZnVuY3Rpb25zICovXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYSBjb2x1bW4gdG8gY3VycmVudCBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ29sdW1uKCk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBhIG9iaiB0byBjdXJyZW50IGxheW91dCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5maXhlZENvbHVtbihpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byByZW1vdmUgb2JqIG9mIGN1cnJlbnQgbGF5b3V0IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgdW5maXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKCd1bmZpeGVkQ29sdW1uJywgaWR4KTtcbiAgfVxuXG4gIC8qIGltYWdlIGZ1bmN0aW9ucyAqL1xuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IGltYWdlIHVybFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldEltYWdlVXJsKCkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0SW1hZ2VVcmwodGhpcy5pbWFnZVVybCk7XG4gIH1cblxuICBzZXRJY29uKGljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9KSB7XG4gICAgdGhpcy5faWNvbiA9IGljb247XG4gICAgdGhpcy5fc2VydmljZS5zZXRJY29uKGljb24pO1xuICB9XG5cbiAgLyogY2hhcnQgZnVuY3Rpb25zICovXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgdGhlIHR5cGUgb2YgY2hhcnRcbiAgICpcbiAgICogQHBhcmFtIHR5cGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRDaGFydFR5cGUodHlwZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbml0Q2hhcnRUeXBlID0gdHJ1ZTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldENoYXJ0VHlwZSh0eXBlKTtcbiAgfVxuXG4gIHNldENoYXJ0Qm9yZGVyQ29sb3IodmFsdWU6IG51bWJlcnxudWxsKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5zZXRDaGFydEJvcmRlcldpZHRoKHZhbHVlKTtcbiAgfVxuXG4gIHRhYlZhbHVlOiBzdHJpbmcgPSAnYmFja2dyb3VuZENvbG9yJztcbiAgc2V0VGFiKGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoZXZlbnQuaW5kZXggPT09IDApIHtcbiAgICAgIHRoaXMudGFiVmFsdWUgPSAnYmFja2dyb3VuZENvbG9yJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YWJWYWx1ZSA9ICdib3JkZXJDb2xvcic7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byByZW1vdmUgYmFja2dyb3VuZCBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZUNoYXJ0QmFja2dyb3VuZENvbG9yKGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gcmVtb3ZlIGJvcmRlciBjb2xvciB0byBjdXJyZW50IGNoYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHJlbW92ZUNoYXJ0Qm9yZGVyQ29sb3IoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpbmRleCk7XG4gIH1cblxuICBoaWRlTWVudSgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQobnVsbCk7XG4gIH1cblxuICBvcGVuRm9ybXVsYURpYWxvZyhldmVudDogYW55KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLl9kaWFsb2cub3BlbihBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZyk7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuYWdncmVnYXRpb24gPSBBamZBZ2dyZWdhdGlvblR5cGUuTm9uZTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5pc0Zvcm11bGEgPSB0cnVlO1xuICAgIGlmIChldmVudCAhPSBudWxsICYmIGV2ZW50LnJlZmVyZW5jZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5mb3JtdWxhID0gZXZlbnQuZm9ybXVsYTtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlZmVyZW5jZSA9IGV2ZW50LnJlZmVyZW5jZTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3Jtc1N1YiA9IHRoaXMuX3NlcnZpY2UucmVwb3J0Rm9ybXMuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgdGhpcy5mb3JtcyA9IHggfHwgW107XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIGlmICh4ICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCAhPT0geCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IHg7XG4gICAgICAgICAgdGhpcy53aWRnZXROYW1lID0gQWpmV2lkZ2V0VHlwZVt4LndpZGdldFR5cGVdO1xuICAgICAgICAgIHRoaXMucmVwb3J0U3R5bGVzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zZWN0aW9uU3R5bGVzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy53aWRnZXRTdHlsZXMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNlY3Rpb25Db2xvciA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMud2lkZ2V0Q29sb3IgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnZpc2liaWxpdHlTZWN0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IG51bGw7XG4gICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbG9yU3ViID0gdGhpcy5fc2VydmljZS5jb2xvcnMuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgaWYgKHggJiYgeC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY29sb3JzID0geDtcblxuICAgICAgICB0aGlzLnF1aWxsTW9kdWxlcyA9IHtcbiAgICAgICAgICB0b29sYmFyOiBbXG4gICAgICAgICAgICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSwgIC8vIHRvZ2dsZWQgYnV0dG9uc1xuICAgICAgICAgICAgLy8gWydibG9ja3F1b3RlJywgJ2NvZGUtYmxvY2snXSxcbiAgICAgICAgICAgIFt7J2hlYWRlcic6IDF9LCB7J2hlYWRlcic6IDJ9XSwgIC8vIGN1c3RvbSBidXR0b24gdmFsdWVzXG4gICAgICAgICAgICBbeydsaXN0JzogJ29yZGVyZWQnfSwgeydsaXN0JzogJ2J1bGxldCd9XSxcbiAgICAgICAgICAgIFt7J3NjcmlwdCc6ICdzdWInfSwgeydzY3JpcHQnOiAnc3VwZXInfV0sICAvLyBzdXBlcnNjcmlwdC9zdWJzY3JpcHRcbiAgICAgICAgICAgIC8vIFt7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSwgICAgICAgICAgLy8gb3V0ZGVudC9pbmRlbnRcbiAgICAgICAgICAgIC8vIFt7ICdkaXJlY3Rpb24nOiAncnRsJyB9XSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dCBkaXJlY3Rpb25cblxuICAgICAgICAgICAgW3snc2l6ZSc6IFsnc21hbGwnLCBmYWxzZSwgJ2xhcmdlJywgJ2h1Z2UnXX1dLCAgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICAgICAgICBbeydoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdfV0sXG5cbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgeydjb2xvcic6IHRoaXMuY29sb3JzfSwgeydiYWNrZ3JvdW5kJzogdGhpcy5jb2xvcnN9XG4gICAgICAgICAgICBdLCAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICAgICAgICBbeydmb250JzogdGhpcy5mb250c31dLCBbeydhbGlnbic6IHRoaXMuYWxpZ259XSwgWydmb3JtdWxhJ10sXG4gICAgICAgICAgICBbJ2NsZWFuJ10sICAvLyByZW1vdmUgZm9ybWF0dGluZyBidXR0b25cblxuICAgICAgICAgICAgLy8gWydsaW5rJywgJ2NsYXNzJywgJ3ZpZGVvJ10gICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluayBhbmQgaW1hZ2UsIHZpZGVvXG4gICAgICAgICAgXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICB0aGlzLmdldEhUTUwgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKCh3aWRnZXQ6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHdpZGdldCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBteU9iaiA9IDxBamZUZXh0V2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5odG1sVGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKCc8cD48YnI+PC9wPicpKTtcblxuXG4gICAgdGhpcy5nZXRIZWlnaHRXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgZmlsdGVyKHggPT4geCAhPSBudWxsKSwgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy50b051bWJlcihteU9iai5zdHlsZXNbJ2hlaWdodCddKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsIHx8IHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldEZvbnRTaXplV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy50b051bWJlcihteU9iai5zdHlsZXNbJ2ZvbnQtc2l6ZSddKSB8fCAxMik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Rm9udEFsaWduV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAoKG15T2JqLnN0eWxlc1sndGV4dC1hbGlnbiddKSB8fCAnY2VudGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFB4TnVtYmVyQXJyYXkodGhpcy50b051bWJlckFycmF5KG15T2JqLnN0eWxlc1snYm9yZGVyLXdpZHRoJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aChbMCwgMCwgMCwgMF0pKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0VG9wID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzBdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldFJpZ2h0ID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzFdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldEJvdHRvbSA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsyXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXRMZWZ0ID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzNdKSk7XG5cbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydib3JkZXItcmFkaXVzJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aChbMCwgMCwgMCwgMF0pKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldFRvcExlZnQgPVxuICAgICAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzBdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXRUb3BSaWdodCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMV0pKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbVJpZ2h0ID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsyXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tTGVmdCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbM10pKTtcblxuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwgJiYgbXlPYmouc3R5bGVzWydtYXJnaW4nXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydtYXJnaW4nXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKFswLCAwLCAwLCAwXSkpO1xuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0VG9wID0gdGhpcy5nZXRNYXJnaW5XaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVswXSkpO1xuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0UmlnaHQgPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzFdKSk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRCb3R0b20gPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzJdKSk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRMZWZ0ID0gdGhpcy5nZXRNYXJnaW5XaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVszXSkpO1xuXG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwgJiYgbXlPYmouc3R5bGVzWydwYWRkaW5nJ10gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFB4TnVtYmVyQXJyYXkodGhpcy50b051bWJlckFycmF5KG15T2JqLnN0eWxlc1sncGFkZGluZyddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXRUb3AgPSB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVswXSkpO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldFJpZ2h0ID1cbiAgICAgICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMV0pKTtcbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXRCb3R0b20gPVxuICAgICAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsyXSkpO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldExlZnQgPSB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVszXSkpO1xuXG4gICAgdGhpcy5nZXRCYWNrZ3JvdW5kQ29sb3JXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLnN0eWxlc1snYmFja2dyb3VuZENvbG9yJ10gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldENvbG9yV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5zdHlsZXNbJ2NvbG9yJ10gfHwgJyc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3VicyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx7aWR4OiBhbnk7IHZhbHVlOiBhbnl9Pj50aGlzLl91cGRhdGVXaWRnZXRNYXJnaW5FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldE1hcmdpbldpZGdldCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbe2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fSwgbnVtYmVyW118dW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJbMF0udmFsdWU7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ21hcmdpbicsIHYpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vicy5hZGQoXG4gICAgICAgICg8T2JzZXJ2YWJsZTx7aWR4OiBhbnk7IHZhbHVlOiBhbnl9Pj50aGlzLl91cGRhdGVXaWRnZXRQYWRkaW5nRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5nZXRQYWRkaW5nV2lkZ2V0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9LCBudW1iZXJbXXx1bmRlZmluZWRdKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgICAgICAgY29uc3QgdiA9IHJbMV0gfHwgWzAsIDAsIDAsIDBdO1xuICAgICAgICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZbaWR4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcygncGFkZGluZycsIHYpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMuYWRkKFxuICAgICAgICAoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyV2lkdGhFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9LCBudW1iZXJbXXx1bmRlZmluZWRdKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgICAgICAgY29uc3QgdiA9IHJbMV0gfHwgWzAsIDAsIDAsIDBdO1xuICAgICAgICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZbaWR4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcygnYm9yZGVyLXdpZHRoJywgdik7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vicy5hZGQoXG4gICAgICAgICg8T2JzZXJ2YWJsZTx7aWR4OiBhbnk7IHZhbHVlOiBhbnl9Pj50aGlzLl91cGRhdGVXaWRnZXRCb3JkZXJSYWRpdXNFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbe2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fSwgbnVtYmVyW118dW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJbMF0udmFsdWU7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ2JvcmRlci1yYWRpdXMnLCB2KTtcbiAgICAgICAgICAgIH0pKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIHRoaXMuY3VycmVudFdpZGdldCA9IGNoYW5nZXMud2lkZ2V0LmN1cnJlbnRWYWx1ZTtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy53aWRnZXROYW1lID0gQWpmV2lkZ2V0VHlwZVt0aGlzLmN1cnJlbnRXaWRnZXQud2lkZ2V0VHlwZV07XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50V2lkZ2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jb2xvclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2hlYWRlclN0eWxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY29udGVudFN0eWxlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvb3RlclN0eWxlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWdpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==