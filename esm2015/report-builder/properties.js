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
                ['clean'], // remove formatting button
                // ['link', 'class', 'video']                         // link and image, video
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
                        ['clean'], // remove formatting button
                        // ['link', 'class', 'video']                         // link and image, video
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
        this._stylesUpdatesSubs = this._updateWidgetMarginEvt
            .pipe(withLatestFrom(this.getMarginWidget))
            .subscribe(r => {
            if (r == null) {
                return;
            }
            const idx = r[0].idx;
            const value = r[0].value;
            const v = (r[1] || [0, 0, 0, 0]);
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('margin', v);
        });
        this._stylesUpdatesSubs.add(this._updateWidgetPaddingEvt
            .pipe(withLatestFrom(this.getPaddingWidget))
            .subscribe(r => {
            if (r == null) {
                return;
            }
            const idx = r[0].idx;
            const value = r[0].value;
            const v = (r[1] || [0, 0, 0, 0]);
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('padding', v);
        }));
        this._stylesUpdatesSubs.add(this._updateWidgetBorderWidthEvt
            .pipe(withLatestFrom(this.getBorderWidthWidget))
            .subscribe(r => {
            if (r == null) {
                return;
            }
            const idx = r[0].idx;
            const value = r[0].value;
            const v = (r[1] || [0, 0, 0, 0]);
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            this.setWidgetStyles('border-width', v);
        }));
        this._stylesUpdatesSubs.add(this._updateWidgetBorderRadiusEvt
            .pipe(withLatestFrom(this.getBorderRadiusWidget))
            .subscribe(r => {
            if (r == null) {
                return;
            }
            const idx = r[0].idx;
            const value = r[0].value;
            const v = (r[1] || [0, 0, 0, 0]);
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
                template: "<ng-template [ngIf]=\"currentWidget != null\">\n  <div class=\"ajf-content\">\n    <button\n      mat-button\n      class=\"ajf-hide-menu\"\n      matTooltip=\"hide-menu\"\n      (click)=\"hideMenu()\"\n      [matTooltipPosition]=\"'above'\"\n    >\n      <mat-icon>remove_circle_outline</mat-icon>\n    </button>\n    <mat-button-toggle-group class=\"ajf-menu-css\">\n      <mat-button-toggle\n        (click)=\"reportStyles = !reportStyles; sectionStyles = false; widgetStyles = false\"\n        value=\"left\"\n        [ngClass]=\"{'ajf-selected': reportStyles}\"\n      >\n        report\n        <ng-container>{{'CSS style'|transloco}}</ng-container>\n      </mat-button-toggle>\n      <mat-button-toggle\n        (click)=\"sectionStyles = !sectionStyles; reportStyles = false; widgetStyles = false\"\n        [ngClass]=\"{'ajf-selected': sectionStyles}\"\n      >\n        {{ origin }}\n        <ng-container>{{'CSS style'|transloco}}</ng-container>\n      </mat-button-toggle>\n      <mat-button-toggle\n        (click)=\"widgetStyles = !widgetStyles; sectionStyles = false; reportStyles = false\"\n        [ngClass]=\"{'ajf-selected': widgetStyles}\"\n      >\n        {{ widgetName }}\n        <ng-container>{{'CSS style'|transloco}}</ng-container>\n      </mat-button-toggle>\n    </mat-button-toggle-group>\n    <div class=\"ajf-style-container\" *ngIf=\"(reportStyles) ? true : false \">\n      <mat-tab-group>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color\n              [section]=\"'report'\"\n              [label]=\"'color'\"\n            ></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n    <div class=\"ajf-style-container\" *ngIf=\"(sectionStyles) ? true : false \">\n      <mat-tab-group>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color\n              [section]=\"'section'\"\n              [label]=\"'color'\"\n            ></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n    </div>\n    <div class=\"ajf-style-container\" *ngIf=\"(widgetStyles) ? true : false \">\n      <mat-tab-group *ngIf=\"(currentWidget.widgetType != 4)\">\n        <mat-tab label=\"Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color\n              [section]=\"'widget'\"\n              [label]=\"'color'\"\n              [init]=\"'icon'\"\n            ></ajf-theme-color>\n          </div>\n        </mat-tab>\n        <mat-tab label=\"Background Color\">\n          <div class=\"ajf-style-panel\">\n            <ajf-theme-color\n              [section]=\"'widget'\"\n              [label]=\"'background-color'\"\n            ></ajf-theme-color>\n          </div>\n        </mat-tab>\n      </mat-tab-group>\n      <div\n        class=\"properties-container\"\n        *ngIf=\"(currentWidget.widgetType !== 8)\"\n      >\n        <div class=\"ajf-layout-preview\">\n          <div class=\"ajf-vbottom\">\n            <div>{{'height'|transloco}}</div>\n            <div>{{ getHeightWidget|async }}</div>\n          </div>\n          <div class=\"ajf-margin-box\">\n            <div class=\"ajf-top-label\">{{'margin'|transloco}}</div>\n            <div class=\"ajf-vtop\">{{ getMarginWidgetTop|async }}</div>\n            <div class=\"ajf-vright\">{{ getMarginWidgetRight|async }}</div>\n            <div class=\"ajf-vbottom\">{{ getMarginWidgetBottom|async }}</div>\n            <div class=\"ajf-vleft\">{{ getMarginWidgetLeft|async }}</div>\n            <div class=\"ajf-border-box\">\n              <div class=\"ajf-vtop\">{{ getBorderWidthWidgetTop|async }}</div>\n              <div class=\"ajf-vright\">\n                {{ getBorderWidthWidgetRight|async }}\n              </div>\n              <div class=\"ajf-vbottom\">\n                {{ getBorderWidthWidgetBottom|async }}\n              </div>\n              <div class=\"ajf-vleft\">{{ getBorderWidthWidgetLeft|async }}</div>\n              <div class=\"ajf-vtl\">\n                {{ getBorderRadiusWidgetTopLeft|async }}\n              </div>\n              <div class=\"ajf-vtr\">\n                {{ getBorderRadiusWidgetTopRight|async }}\n              </div>\n              <div class=\"ajf-vbr\">\n                {{ getBorderRadiusWidgetBottomRight|async }}\n              </div>\n              <div class=\"ajf-vbl\">\n                {{ getBorderRadiusWidgetBottomLeft|async }}\n              </div>\n              <div class=\"ajf-top-label\">{{'border'|transloco}}</div>\n              <div class=\"ajf-padding-box\">\n                <div class=\"ajf-top-label\">{{'padding'|transloco}}</div>\n                <div class=\"ajf-vtop\">{{ getPaddingWidgetTop|async }}</div>\n                <div class=\"ajf-vright\">{{ getPaddingWidgetRight|async }}</div>\n                <div class=\"ajf-vbottom\">\n                  {{ getPaddingWidgetBottom|async }}\n                </div>\n                <div class=\"ajf-vleft\">{{ getPaddingWidgetLeft|async }}</div>\n                <div class=\"ajf-content-box\">{{'content'|transloco}}</div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <mat-grid-list rowHeight=\"2em\" cols=\"12\">\n          <mat-grid-tile></mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>{{'height'|transloco}}</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('height', $event.value)\"\n              min=\"0\"\n              max=\"200\"\n              step=\"1\"\n              [value]=\"getHeightWidget|async\"\n              tickInterval=\"1\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon\n              *ngIf=\"!marginExpanded\"\n              (click)=\"marginExpanded = !marginExpanded\"\n              >keyboard_arrow_right</mat-icon\n            >\n            <mat-icon\n              *ngIf=\"marginExpanded\"\n              (click)=\"marginExpanded = !marginExpanded\"\n              >keyboard_arrow_down</mat-icon\n            >\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>{{'margin'|transloco}}</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              [disabled]=\"marginExpanded\"\n              (change)=\"setWidgetStyles('margin', $event.value)\"\n              min=\"-50\"\n              max=\"50\"\n              step=\"1\"\n              [value]=\"getMarginWidgetTop|async\"\n              tickInterval=\"auto\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"marginExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'margin top'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(0, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'margin right'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(1, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'margin bottom'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(2, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'margin left'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetMargin(3, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getMarginWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon\n              *ngIf=\"!paddingExpanded\"\n              (click)=\"paddingExpanded = !paddingExpanded\"\n              >keyboard_arrow_right</mat-icon\n            >\n            <mat-icon\n              *ngIf=\"paddingExpanded\"\n              (click)=\"paddingExpanded = !paddingExpanded\"\n              >keyboard_arrow_down</mat-icon\n            >\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>{{'padding'|transloco}}</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('padding', $event.value)\"\n              min=\"-50\"\n              max=\"50\"\n              step=\"1\"\n              [value]=\"getPaddingWidgetTop|async\"\n              tickInterval=\"auto\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"paddingExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'padding top'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(0, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'padding right'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(1, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'padding bottom'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(2, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'padding left'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetPadding(3, $event.value)\"\n                min=\"-50\"\n                max=\"50\"\n                step=\"1\"\n                [value]=\"getPaddingWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon\n              *ngIf=\"!borderWidthExpanded\"\n              (click)=\"borderWidthExpanded = !borderWidthExpanded\"\n              >keyboard_arrow_right</mat-icon\n            >\n            <mat-icon\n              *ngIf=\"borderWidthExpanded\"\n              (click)=\"borderWidthExpanded = !borderWidthExpanded\"\n              >keyboard_arrow_down</mat-icon\n            >\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>{{'border width'|transloco}}</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('border-width', $event.value)\"\n              min=\"0\"\n              max=\"10\"\n              step=\"1\"\n              [value]=\"getBorderWidthWidgetTop|async\"\n              tickInterval=\"1\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"borderWidthExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border width top'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(0, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetTop|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border width right'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(1, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border width bottom'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(2, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetBottom|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border width left'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderWidth(3, $event.value)\"\n                min=\"1\"\n                max=\"10\"\n                step=\"1\"\n                [value]=\"getBorderWidthWidgetLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile>\n            <mat-icon\n              *ngIf=\"!borderRadiusExpanded\"\n              (click)=\"borderRadiusExpanded = !borderRadiusExpanded\"\n              >keyboard_arrow_right</mat-icon\n            >\n            <mat-icon\n              *ngIf=\"borderRadiusExpanded\"\n              (click)=\"borderRadiusExpanded = !borderRadiusExpanded\"\n              >keyboard_arrow_down</mat-icon\n            >\n          </mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n            <span>{{'border radius'|transloco}}</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('border-radius', $event.value)\"\n              min=\"0\"\n              max=\"100\"\n              step=\"1\"\n              tickInterval=\"10\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n        <ng-template [ngIf]=\"borderRadiusExpanded\">\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border radius top left'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(0, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetTopLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border radius top right'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(1, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetTopRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span>{{'border radius bottom left'|transloco}}</span>\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(2, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetBottomLeft|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n          <mat-grid-list cols=\"12\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile class=\"ajf-lal\" colspan=\"4\">\n              &nbsp;&nbsp;<span\n                >{{'border radius bottom right'|transloco}}</span\n              >\n            </mat-grid-tile>\n            <mat-grid-tile colspan=\"7\">\n              <mat-slider\n                (change)=\"setWidgetBorderRadius(3, $event.value)\"\n                min=\"1\"\n                max=\"100\"\n                step=\"1\"\n                [value]=\"getBorderRadiusWidgetBottomRight|async\"\n                tickInterval=\"auto\"\n                thumbLabel\n              >\n              </mat-slider>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </ng-template>\n      </div>\n      <div class=\"properties-container\" *ngIf=\"currentWidget.widgetType === 2\">\n        <mat-grid-list cols=\"12\">\n          <mat-grid-tile></mat-grid-tile>\n          <mat-grid-tile class=\"ajf-lal\" colspan=\"3\">\n            <span>{{'font size'|transloco}}</span>\n          </mat-grid-tile>\n          <mat-grid-tile colspan=\"7\">\n            <mat-slider\n              (change)=\"setWidgetStyles('font-size', $event.value);\"\n              min=\"1\"\n              max=\"150\"\n              step=\"1\"\n              [value]=\"getFontSizeWidget|async\"\n              tickInterval=\"1\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-grid-tile>\n        </mat-grid-list>\n      </div>\n      <ng-template [ngIf]=\"currentWidget.widgetType === 5\">\n        <br />\n        <form>\n          <mat-form-field>\n            <input\n              matInput\n              [placeholder]=\"'Font size' | transloco\"\n              [value]=\"getFontSizeWidget|async\"\n              [(ngModel)]=\"fontSize\"\n              [ngModelOptions]=\"{standalone: true}\"\n              (change)=\"setWidgetStyles('font-size', fontSize)\"\n            />\n          </mat-form-field>\n          <mat-select\n            (selectionChange)=\"setWidgetStyles('font-style', $event.value)\"\n            [placeholder]=\"'Font style' | transloco\"\n          >\n            <mat-option value=\"normal\">{{'Normal'|transloco}}</mat-option>\n            <mat-option value=\"italic\">{{'Italic'|transloco}}</mat-option>\n            <mat-option value=\"oblique\">{{'Oblique'|transloco}}</mat-option>\n          </mat-select>\n          <mat-select\n            (selectionChange)=\"setWidgetStyles('text-align', $event.value)\"\n            [placeholder]=\"'Align' | transloco\"\n          >\n            <mat-option value=\"center\">{{'Center'|transloco}}</mat-option>\n            <mat-option value=\"left\">{{'Left'|transloco}}</mat-option>\n            <mat-option value=\"right\">{{'Right'|transloco}}</mat-option>\n          </mat-select>\n        </form>\n      </ng-template>\n      <h1>\n        <ng-container>{{'properties of'|transloco}}</ng-container>\n        {{ widgetName|transloco }}\n      </h1>\n    </div>\n    <div [ngSwitch]=\"currentWidget.widgetType\">\n      <ng-template [ngSwitchCase]=\"0\">\n        <h1>{{'Column'|transloco}}</h1>\n        <ng-template\n          ngFor\n          let-col\n          [ngForOf]=\"currentLayoutWidget.columns\"\n          let-idx=\"index\"\n        >\n          <mat-toolbar>\n            <mat-toolbar-row *ngIf=\"col !== -1\">\n              <mat-grid-list cols=\"12\">\n                <mat-grid-tile colspan=\"1\"> {{idx + 1}} </mat-grid-tile>\n                <mat-grid-tile colspan=\"9\">\n                  <mat-slider\n                    style=\"width: 90%\"\n                    min=\"0.1\"\n                    max=\"1\"\n                    step=\"0.01\"\n                    value=\"{{col}}\"\n                    thumb-label=\"true\"\n                    tick-interval=\"true\"\n                    (change)=\"instantColumnValue($event.value,idx)\"\n                  >\n                  </mat-slider>\n                  {{percent(col)}}%\n                </mat-grid-tile>\n                <mat-grid-tile colspan=\"2\">\n                  <button\n                    style=\"width: 5%\"\n                    mat-button\n                    (click)=\"fixedColumn(idx)\"\n                  >\n                    fixed\n                  </button>\n                </mat-grid-tile>\n              </mat-grid-list>\n            </mat-toolbar-row>\n            <mat-toolbar-row *ngIf=\"col == -1\">\n              <mat-grid-list cols=\"12\">\n                <mat-grid-tile colspan=\"1\"> {{idx + 1}} </mat-grid-tile>\n                <mat-grid-tile colspan=\"11\">\n                  <button\n                    style=\"width: 90%\"\n                    mat-button\n                    (click)=\"unfixedColumn(idx)\"\n                  >\n                    percent\n                  </button>\n                </mat-grid-tile>\n              </mat-grid-list>\n            </mat-toolbar-row>\n          </mat-toolbar>\n        </ng-template>\n        <mat-toolbar>\n          <mat-toolbar-row>\n            <button\n              mat-button\n              (click)=\"addColumn()\"\n              *ngIf=\"currentLayoutWidget.columns.length < 10\"\n            >\n              {{'Add column'|transloco}}\n            </button>\n          </mat-toolbar-row>\n        </mat-toolbar>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"2\">\n        <ajf-image-group\n          (formulaClick)=\"openFormulaDialog($event)\"\n          [data]=\"iconSet\"\n        ></ajf-image-group>\n        <ajf-image-group\n          (formulaClick)=\"openFormulaDialog($event)\"\n          [data]=\"flagSet\"\n        ></ajf-image-group>\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n        <input\n          mat-input\n          [placeholder]=\"'paste a link' | transloco\"\n          style=\"width: 100%\"\n          [(ngModel)]=\"imageUrl\"\n        />\n        <button mat-button (click)=\"setImageUrl()\">\n          {{'Set image'|transloco}}\n        </button>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"3\">\n        <div style=\"width: 500px\">\n          <ajf-quill-editor\n            [(ngModel)]=\"currentTextWidget.htmlText\"\n            [modules]=\"getModule()\"\n            [maxLength]=\"200\"\n            [theme]=\"bubble\"\n            [initHTML]=\"(getHTML|async) || ''\"\n            (formulaClick)=\"openFormulaDialog($event)\"\n          >\n          </ajf-quill-editor>\n        </div>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"4\">\n        <h3>{{'Choose type of Chart'|transloco}}</h3>\n        <mat-button-toggle-group class=\"ajf-chart-buttons\">\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-linechart\"\n              (click)=\"setChartType(0)\"\n            >\n              <mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-linechart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-barchartvertical\"\n              (click)=\"setChartType(1)\"\n            >\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barchartvertical\"\n              >\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-bubblechart\"\n              (click)=\"setChartType(8)\"\n            >\n              <mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-bubblechart\">\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"row\">\n            <mat-button-toggle\n              value=\"reportbuilder-barcharthorizontal\"\n              (click)=\"setChartType(2)\"\n            >\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barcharthorizontal\"\n              >\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-radarchart\"\n              (click)=\"setChartType(3)\"\n            >\n              <mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-radarchart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-barchartvertical\"\n              (click)=\"setChartType(1)\"\n            >\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-barchartvertical\"\n              >\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-scatterchart\"\n              (click)=\"setChartType(4)\"\n            >\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-scatterchart\"\n              >\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-polarareachart\"\n              (click)=\"setChartType(5)\"\n            >\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-polarareachart\"\n              >\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n          <div class=\"ajf-row\">\n            <mat-button-toggle\n              value=\"reportbuilder-piechart\"\n              (click)=\"setChartType(6)\"\n            >\n              <mat-icon fontSet=\"ajf-icon\" fontIcon=\"reportbuilder-piechart\">\n              </mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle\n              value=\"reportbuilder-donoughtchart\"\n              (click)=\"setChartType(7)\"\n            >\n              <mat-icon\n                fontSet=\"ajf-icon\"\n                fontIcon=\"reportbuilder-donoughtchart\"\n              >\n              </mat-icon>\n            </mat-button-toggle>\n          </div>\n        </mat-button-toggle-group>\n        <h3>{{'Labels'|transloco}}</h3>\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n        <ajf-theme-color\n          [section]=\"'chart'\"\n          [label]=\"tabValue\"\n        ></ajf-theme-color>\n        <mat-card>\n          <mat-card-header>\n            <mat-card-title>{{'Border width'|transloco}}</mat-card-title>\n          </mat-card-header>\n          <mat-card-content>\n            <mat-slider\n              min=\"1\"\n              max=\"100\"\n              style=\"width: 99%\"\n              step=\"1\"\n              (change)=\"setChartBorderColor($event.value)\"\n              [value]=\"chartBorderWidth\"\n              tickInterval=\"auto\"\n              thumbLabel\n            >\n            </mat-slider>\n          </mat-card-content>\n        </mat-card>\n        <mat-tab-group (selectChange)=\"setTab($event)\">\n          <mat-tab label=\"Background\">\n            <mat-list>\n              <ng-template\n                ngFor\n                let-color\n                [ngForOf]=\"(getChartBackgroundColor|async)\"\n                let-idx=\"index\"\n              >\n                <mat-list-item>\n                  <span [style.background]=\"color\"> {{ color }} </span>\n                  <button mat-button (click)=\"removeChartBackgroundColor(idx)\">\n                    {{'Remove'|transloco}}\n                  </button>\n                </mat-list-item>\n              </ng-template>\n            </mat-list>\n          </mat-tab>\n          <mat-tab label=\"Border\">\n            <mat-list>\n              <ng-template\n                ngFor\n                let-color\n                [ngForOf]=\"(getChartBorderColor|async)\"\n                let-idx=\"index\"\n              >\n                <mat-list-item>\n                  <span [style.background]=\"color\"> {{ color }} </span>\n                  <button mat-button (click)=\"removeChartBorderColor(idx)\">\n                    remove\n                  </button>\n                </mat-list-item>\n              </ng-template>\n            </mat-list>\n          </mat-tab>\n        </mat-tab-group>\n      </ng-template>\n      <ng-template [ngSwitchCase]=\"5\">\n        <ajf-report-builder-forms-analyzer></ajf-report-builder-forms-analyzer>\n      </ng-template>\n    </div>\n    <button\n      mat-button\n      (click)=\"visibilitySection = !visibilitySection\"\n      [ngClass]=\"{'ajf-selected': visibilitySection}\"\n    >\n      {{ widgetName|transloco }}\n      <ng-container>{{'Visibility'|transloco}}</ng-container>\n    </button>\n    <div [style.display]=\"visibilitySection ? 'block' : 'none'\">\n      <ajf-report-builder-condition-editor\n        [visibility]=\"currentWidget.visibility\"\n      ></ajf-report-builder-condition-editor>\n    </div>\n  </div>\n</ng-template>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-report-builder-properties .ajf-selected{background-color:darkred;color:#fff}ajf-report-builder-properties .ajf-style-container{height:auto;width:100%;position:relative;margin-bottom:60px;text-align:center}ajf-report-builder-properties .ajf-style-container mat-tab-group .ajf-style-panel{min-height:350px}ajf-report-builder-properties .ajf-style-container .ajf-style-background,ajf-report-builder-properties .ajf-style-container .ajf-style-color{width:100%;height:350px;position:relative;margin:30px}ajf-report-builder-properties .ajf-style-container .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-tab-body-wrapper,ajf-report-builder-properties .ajf-style-container mat-tab-group .mat-list-item-content{position:normal !important;display:block !important;height:350px !important}ajf-report-builder-properties .ajf-content{margin-top:10px;margin-right:15px;margin-bottom:290px;margin-left:15px}ajf-report-builder-properties .ajf-content .ajf-menu-css{width:100% !important;font-size:10px !important}ajf-report-builder-properties .ajf-content .ajf-menu-css mat-button-toggle{width:33% !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group{width:100% !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle{width:auto !important}ajf-report-builder-properties .ajf-content mat-button-toggle-group mat-button-toggle mat-icon{margin:15px}ajf-report-builder-properties button{width:100%;margin-bottom:30px}ajf-report-builder-properties .ajf-hide-menu{width:auto !important}ajf-report-builder-properties h1,ajf-report-builder-properties h3,ajf-report-builder-properties h5{text-align:center}ajf-report-builder-properties .ajf-row{display:flex;flex-direction:column;width:100%}ajf-report-builder-properties .mat-tab-body.mat-tab-active{min-height:600px}ajf-report-builder-properties mat-grid-list{width:100%}ajf-report-builder-properties mat-grid-tile{overflow:visible !important}ajf-report-builder-properties mat-grid-tile.ajf-lal{text-align:left}ajf-report-builder-properties .ajf-chart-buttons mat-icon{font-size:15px}ajf-report-builder-properties .ajf-layout-preview{background-color:#fff;width:100%;font-size:.9em;box-sizing:border-box;position:relative}ajf-report-builder-properties .ajf-layout-preview .ajf-top-label{position:absolute;top:1em;left:1em;text-align:left}ajf-report-builder-properties .ajf-layout-preview .ajf-vtop{position:absolute;top:1em;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vbottom{position:absolute;bottom:0;right:0;left:0}ajf-report-builder-properties .ajf-layout-preview .ajf-vright{position:absolute;top:50%;right:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vleft{position:absolute;top:50%;left:1em;margin-top:.5em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtl{position:absolute;top:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vtr{position:absolute;top:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbl{position:absolute;bottom:1em;left:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-vbr{position:absolute;bottom:1em;right:1em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box{background-color:#fff;padding:3em;position:relative;border:solid 1px #ccc}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box{background-color:#ddd;padding:3em;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box>.ajf-top-label{left:4em}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box{padding:3em;background-color:#aaa;position:relative;box-sizing:border-box}ajf-report-builder-properties .ajf-layout-preview .ajf-margin-box .ajf-border-box .ajf-padding-box .ajf-content-box{background-color:#888;padding:2em;text-align:center;box-sizing:border-box}\n"]
            },] }
];
AjfReportBuilderProperties.ctorParameters = () => [
    { type: MatDialog },
    { type: AjfReportBuilderService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFDTCxrQkFBa0IsRUFLbEIsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFJWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVGLE9BQU8sRUFBQyxtQ0FBbUMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTVFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBU2pFLE1BQU0sT0FBTywwQkFBMEI7SUFnUnJDLFlBQW9CLE9BQWtCLEVBQVUsUUFBaUM7UUFBN0QsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUFVLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBL1FqRjs7OztXQUlHO1FBQ0gsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEI7Ozs7V0FJRztRQUNILGtCQUFhLEdBQW1CLElBQUksQ0FBQztRQVFyQzs7OztXQUlHO1FBQ0gsVUFBSyxHQUFjLEVBQUUsQ0FBQztRQUd0QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBU3RCOztXQUVHO1FBRUgsY0FBUyxHQUFRLEVBQUMsS0FB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QVk7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUNqRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQzlCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7WUF4NEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6Qyxxa2lDQUE4QjtnQkFFOUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBZE8sU0FBUztZQU1ULHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb25UeXBlLFxuICBBamZDaGFydFdpZGdldCxcbiAgQWpmTGF5b3V0V2lkZ2V0LFxuICBBamZUZXh0V2lkZ2V0LFxuICBBamZXaWRnZXQsXG4gIEFqZldpZGdldFR5cGVcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAncHJvcGVydGllcy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Byb3BlcnRpZXMuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiAgdHJ1ZSB3aGVuIHRoZSBmaXJzdCB0aW1lIGNoYXJ0IHR5cGUgaXMgc2V0dGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgaW5pdENoYXJ0VHlwZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiB0aGUgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGdldCBjdXJyZW50TGF5b3V0V2lkZ2V0KCk6IEFqZkxheW91dFdpZGdldCB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFdpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gIH1cbiAgZ2V0IGN1cnJlbnRUZXh0V2lkZ2V0KCk6IEFqZlRleHRXaWRnZXQge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRXaWRnZXQgYXMgQWpmVGV4dFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIGFycmF5IGNvbnRhaW5zIHRoZSBmb3JtcyBleHBsb2l0ZWQgZm9yIGdlbmVyYXRlIGRhdGEgbGFiZWxzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuXG5cbiAgY29sb3JzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgb3JpZ2luOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZBS0UgREFUQVxuICAgKi9cblxuICBmb3Jtc0pzb246IGFueSA9IHtmb3JtczogW119O1xuXG4gIC8qKlxuICAgKiBXSURHRVRcbiAgICovXG5cbiAgd2lkZ2V0TmFtZSA9ICcnO1xuICBnZXRIVE1MOiBPYnNlcnZhYmxlPHN0cmluZ3x1bmRlZmluZWQ+O1xuICBnZXRIZWlnaHRXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyfHVuZGVmaW5lZD47XG4gIGdldEZvbnRTaXplV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcnx1bmRlZmluZWQ+O1xuICBnZXRGb250QWxpZ25XaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyfHVuZGVmaW5lZD47XG4gIGdldEJhY2tncm91bmRDb2xvcldpZGdldDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBnZXRDb2xvcldpZGdldDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBnZXRTdHlsZTogT2JzZXJ2YWJsZTxhbnk+O1xuICBnZXRDaGFydEJhY2tncm91bmRDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldENoYXJ0Qm9yZGVyQ29sb3I6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuICBnZXRWaXNpYmlsaXR5OiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbj47XG4gIGdldENvbG9yOiBPYnNlcnZhYmxlPFN0cmluZ1tdPjtcblxuICBtYXJnaW5FeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRNYXJnaW5XaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW118dW5kZWZpbmVkPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0VG9wOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldE1hcmdpbldpZGdldFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldE1hcmdpbldpZGdldEJvdHRvbTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRNYXJnaW5XaWRnZXRMZWZ0OiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcGFkZGluZ0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldFBhZGRpbmdXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW118dW5kZWZpbmVkPjtcbiAgZ2V0UGFkZGluZ1dpZGdldFRvcDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRQYWRkaW5nV2lkZ2V0UmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0UGFkZGluZ1dpZGdldEJvdHRvbTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRQYWRkaW5nV2lkZ2V0TGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGJvcmRlcldpZHRoRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW118dW5kZWZpbmVkPjtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXRUb3A6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXRSaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldEJvdHRvbTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBib3JkZXJSYWRpdXNFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW118dW5kZWZpbmVkPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0VG9wTGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXRUb3BSaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXRCb3R0b21SaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXRCb3R0b21MZWZ0OiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgYmFja2dyb3VuZENvbG9yID0gJyMxMjdiZGMnO1xuICBzdHlsZUJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LDI1NSwyNTUsMCknO1xuICBib3JkZXJDb2xvciA9ICcjMTI3YmRjJztcbiAgc3R5bGVDb2xvciA9ICdyZ2IoMCwwLDAsMCknO1xuICB3YmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XG4gIGZvbnRTaXplOiBzdHJpbmc7XG4gIGJ1YmJsZTogc3RyaW5nO1xuXG4gIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nPjtcbiAgY29udGFpbmVyOiBBamZGb3JtVmFyaWFibGVzO1xuXG5cbiAgYWxpZ24gPSBbZmFsc2UsICdjZW50ZXInLCAncmlnaHQnLCAnanVzdGlmeSddO1xuXG4gIGZvbnRzID0gW1xuICAgIGZhbHNlLCAnYmxhY2tyJywgJ2JsYWNrLWl0YWxpYycsICdib2xkJywgJ2JvbGQtY29uZGVuc2VkJywgJ2JvbGQtY29uZGVuc2VkLWl0YWxpYycsXG4gICAgJ2JvbGQtaXRhbGljJywgJ2NvbmRlbnNlZCcsICdjb25kZW5zZWQtaXRhbGljJywgJ2l0YWxpYycsICdsaWdodCcsICdsaWdodC1pdGFsaWMnLCAnbWVkaXVtJyxcbiAgICAnbWVkaXVtLWl0YWxpYycsICd0aGlucicsICd0aGluLWl0YWxpYydcbiAgXTtcbiAgY3VycmVudE1vZHVsZTogYW55ID0ge307XG4gIHF1aWxsTW9kdWxlcyA9IHtcbiAgICB0b29sYmFyOiBbXG4gICAgICBbJ2Zvcm11bGEnXSwgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sICAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG5cbiAgICAgIFt7J2hlYWRlcic6IDF9LCB7J2hlYWRlcic6IDJ9XSwgIC8vIGN1c3RvbSBidXR0b24gdmFsdWVzXG4gICAgICBbeydsaXN0JzogJ29yZGVyZWQnfSwgeydsaXN0JzogJ2J1bGxldCd9XSxcbiAgICAgIFt7J3NjcmlwdCc6ICdzdWInfSwgeydzY3JpcHQnOiAnc3VwZXInfV0sICAvLyBzdXBlcnNjcmlwdC9zdWJzY3JpcHRcbiAgICAgIC8vIFt7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSwgICAgICAgICAgLy8gb3V0ZGVudC9pbmRlbnRcbiAgICAgIC8vIFt7ICdkaXJlY3Rpb24nOiAncnRsJyB9XSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dCBkaXJlY3Rpb25cblxuICAgICAgW3snc2l6ZSc6IFsnc21hbGwnLCBmYWxzZSwgJ2xhcmdlJywgJ2h1Z2UnXX1dLCAgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICBbeydoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdfV0sXG5cbiAgICAgIFt7J2NvbG9yJzogdGhpcy5jb2xvcnN9LCB7J2JhY2tncm91bmQnOiB0aGlzLmNvbG9yc31dLCAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICBbeydmb250JzogdGhpcy5mb250c31dLCBbeydhbGlnbic6IHRoaXMuYWxpZ259XSxcblxuICAgICAgWydjbGVhbiddLCAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgIC8vIFsnbGluaycsICdjbGFzcycsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgIF1cbiAgfTtcblxuICAvKipcbiAgICogQ0hBUlRcbiAgICovXG5cblxuICBnZXRDaGFydFlMYWJlbHM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuXG4gIGNoYXJ0Qm9yZGVyQ29sb3I6IHN0cmluZ1tdID0gW107XG4gIGNoYXJ0Qm9yZGVyV2lkdGggPSAzO1xuXG4gIC8qKlxuICAgKlxuICAgKiBJTUFHRVxuICAgKi9cblxuICBpbWFnZVVybCA9ICdodHRwczovL2FuZ3VsYXIuaW8vcmVzb3VyY2VzL2ltYWdlcy9sb2dvcy9hbmd1bGFyMi9hbmd1bGFyLnBuZyc7XG5cbiAgLyoqXG4gICAqXG4gICAqIFRFWFRcbiAgICovXG5cbiAgaHRtbFRleHQgPSAnJztcblxuXG4gIC8qKlxuICAgKiB0aGVzZSB2YXJpYWJsZXMgaW5kaWNhdGUgdGhhdCB0aGUgdXNlciB3YW50IHRvIGNoYW5nZSBzZWN0aW9uXG4gICAqL1xuICByZXBvcnRTdHlsZXMgPSBmYWxzZTtcbiAgc2VjdGlvblN0eWxlcyA9IGZhbHNlO1xuICB3aWRnZXRTdHlsZXMgPSB0cnVlO1xuICBzZWN0aW9uQ29sb3IgPSBmYWxzZTtcbiAgd2lkZ2V0Q29sb3IgPSBmYWxzZTtcbiAgdmlzaWJpbGl0eVNlY3Rpb24gPSBmYWxzZTtcbiAgY3VycmVudENvbG9yID0gJyc7XG5cbiAgcHJpdmF0ZSBfaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ318bnVsbCA9IG51bGw7XG4gIGdldCBpY29uKCk6IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9fG51bGwge1xuICAgIHJldHVybiB0aGlzLl9pY29uO1xuICB9XG5cbiAgaWNvblNldDogYW55ID0geydpY29uJzogJ3RydWUnLCAndGl0bGUnOiAncmVwb3J0JywgJ2RhdGEnOiBudWxsfTtcblxuICBmbGFnU2V0OiBhbnkgPSB7XG4gICAgJ2ljb24nOiAnZmFsc2UnLFxuICAgICdjbGFzcyc6IFsnZmxhZy1pY29uJ10sXG4gICAgJ3ByZWZpeENsYXNzJzogJ2ZsYWctaWNvbi0nLFxuICAgICd0aXRsZSc6ICdmbGFncycsXG4gICAgJ2RhdGEnOlxuICAgICAgICBbXG4gICAgICAgICAgeydjbGFzcyc6ICdkeicsICdpbmZvJzogJ0FsZ2VyaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2FvJywgJ2luZm8nOiAnQW5nb2xhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdiaicsICdpbmZvJzogJ0JlbmluJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdidycsICdpbmZvJzogJ0JvdHN3YW5hJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdiZicsICdpbmZvJzogJ0J1cmtpbmEgRmFzbyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnYmknLCAnaW5mbyc6ICdCdXJ1bmRpJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdjbScsICdpbmZvJzogJ0NhbWVyb29uJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdjdicsICdpbmZvJzogJ0NhYm8gVmVyZGUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2NmJywgJ2luZm8nOiAnVGhlIENlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndGQnLCAnaW5mbyc6ICdDaGFkJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdrbScsICdpbmZvJzogJ1RoZSBDb21vcm9zJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdjaScsICdpbmZvJzogJ0NvdGUgRFxcJ2F2b2lyZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnY2QnLCAnaW5mbyc6ICdUaGUgRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiBDb25nbyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZGonLCAnaW5mbyc6ICdEaWppYm91dGknfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2VnJywgJ2luZm8nOiAnRWd5cHQnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2dxJywgJ2luZm8nOiAnRXF1YXRvcmlhbCBHdWluZWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2VyJywgJ2luZm8nOiAnRXJpdHJlYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZXQnLCAnaW5mbyc6ICdFdGhpb3BpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndGYnLCAnaW5mbyc6ICdGcmVuY2ggU291dGhlcm4gVGVycml0b3JpZXMnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2dhJywgJ2luZm8nOiAnR2Fib24nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2dtJywgJ2luZm8nOiAnVGhlIEdhbWJpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZ2gnLCAnaW5mbyc6ICdHaGFuYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZ24nLCAnaW5mbyc6ICdHdWluZWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2d3JywgJ2luZm8nOiAnR3VpbmVhLUJpc3NhdSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAna2UnLCAnaW5mbyc6ICdLZW55YSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbHMnLCAnaW5mbyc6ICdMZXNob3Robyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbHInLCAnaW5mbyc6ICdMaWJlcmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdseScsICdpbmZvJzogJ0xpYnlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdtZycsICdpbmZvJzogJ01hZGFnYXNjYXInfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ213JywgJ2luZm8nOiAnTWFsYXd5J30sXG4gICAgICAgICAgeydjbGFzcyc6ICdtbCcsICdpbmZvJzogJ01hbGknfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ21yJywgJ2luZm8nOiAnTWF1cml0YW5pYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbXUnLCAnaW5mbyc6ICdNYXVyaXRpdXMnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3l0JywgJ2luZm8nOiAnTWF5b3R0ZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbWEnLCAnaW5mbyc6ICdNYXJvY2NvJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdteicsICdpbmZvJzogJ01vemFtYmlxdWUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ25hJywgJ2luZm8nOiAnTmFtaWJpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbmUnLCAnaW5mbyc6ICdOaWdlcid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbmcnLCAnaW5mbyc6ICdOaWdlcmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdjZycsICdpbmZvJzogJ1JlcHVibGljIG9mIHRoZSBDb25nbyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAncncnLCAnaW5mbyc6ICdSd25kYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAncmUnLCAnaW5mbyc6ICdyw6h1bmlvbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc2gnLCAnaW5mbyc6ICdTYWludCBIZWxlbmEsIEFzY2Vuc2lvbiBhbmQgVHJpc3RhbiBkYSBDdW5oYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc3QnLCAnaW5mbyc6ICdTYW8gVG9tZSBhbmQgUHJpbmNpcGUnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NuJywgJ2luZm8nOiAnU2VuZWdhbCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc2MnLCAnaW5mbyc6ICdTZXljaGVsbGVzJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzbCcsICdpbmZvJzogJ1NpZXJyYSBMZW9uZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc28nLCAnaW5mbyc6ICdTb21hbGlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd6YScsICdpbmZvJzogJ1NvdXRoIEFmcmljYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc3MnLCAnaW5mbyc6ICdTb3V0aCBTdWRhbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc2QnLCAnaW5mbyc6ICdTdWRhbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc3onLCAnaW5mbyc6ICdTd2F6aWxhbmQnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3R6JywgJ2luZm8nOiAnVGFuemFuaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3RnJywgJ2luZm8nOiAnVG9nbyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndG4nLCAnaW5mbyc6ICdUdW5pc2lhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd1ZycsICdpbmZvJzogJ1VnYW5kYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZWgnLCAnaW5mbyc6ICdXZXN0ZXJuIFNhaGFyYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnem0nLCAnaW5mbyc6ICdaYW1iaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3p3JywgJ2luZm8nOiAnWmltYmF3ZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnaXEnLCAnaW5mbyc6ICdJcmFxJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdsYicsICdpbmZvJzogJ0xlYmFub24nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2JkJywgJ2luZm8nOiAnQmFuZ2xhZGVzaCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnaXInLCAnaW5mbyc6ICdJcmFuIChJc2xhbWljIFJlcHVibGljIG9mKSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbXknLCAnaW5mbyc6ICdNYWxheXNpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbnAnLCAnaW5mbyc6ICdOZXBhbCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAncGsnLCAnaW5mbyc6ICdQYWtpc3Rhbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndGgnLCAnaW5mbyc6ICdUaGFpbGFuZCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnam8nLCAnaW5mbyc6ICdKb3JkYW4nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3llJywgJ2luZm8nOiAnWWVtZW4nfVxuICAgICAgICBdXG4gIH07XG5cbiAgcHJpdmF0ZSBfY3VycmVudFdpZGdldFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3Jtc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb2xvclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9oZWFkZXJTdHlsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb250ZW50U3R5bGVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvb3RlclN0eWxlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9vcmlnaW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfc3R5bGVzVXBkYXRlc1N1YnM6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF91cGRhdGVXaWRnZXRNYXJnaW5FdnQ6IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+KCk7XG4gIHByaXZhdGUgX3VwZGF0ZVdpZGdldFBhZGRpbmdFdnQ6IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+KCk7XG4gIHByaXZhdGUgX3VwZGF0ZVdpZGdldEJvcmRlcldpZHRoRXZ0OiBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PigpO1xuICBwcml2YXRlIF91cGRhdGVXaWRnZXRCb3JkZXJSYWRpdXNFdnQ6IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5zZXRGb3JtcygpO1xuXG4gICAgdGhpcy5pY29uU2V0LmRhdGEgPSBPYmplY3Qua2V5cyhfc2VydmljZS5pY29uU2V0cykuZmlsdGVyKHggPT4geCAhPSAnYWpmLWljb24nKS5tYXAoaSA9PiB7XG4gICAgICByZXR1cm4ge25hbWU6IGksIGljb25zOiBfc2VydmljZS5pY29uU2V0c1tpXX07XG4gICAgfSk7XG5cbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViID0gdGhpcy5fc2VydmljZS5mb290ZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fb3JpZ2luU3ViID0gdGhpcy5fc2VydmljZS5vcmlnaW4uc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgdGhpcy5vcmlnaW4gPSBzO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogVVRJTFNcbiAgICovXG5cblxuICAvKipcbiAgICogcmV0dXJuIGEgbnVtYmVyIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHRvTnVtYmVyKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBudW1iZXJQYXR0ZXJuID0gL14oLSk/XFxkKy9nO1xuXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXRjaGVzID0gdmFsdWUubWF0Y2gobnVtYmVyUGF0dGVybik7XG4gICAgICBpZiAobWF0Y2hlcyA9PSBudWxsIHx8IG1hdGNoZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gTnVtYmVyKG1hdGNoZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIHRvTnVtYmVyQXJyYXkodmFsdWU6IHN0cmluZyk6IG51bWJlcltdIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHZhbHVlIHx8ICcnKVxuICAgICAgICAgIC5yZXBsYWNlKCdweCcsICcnKVxuICAgICAgICAgIC5zcGxpdCgnICcpXG4gICAgICAgICAgLmZpbHRlcih2ID0+IHYgIT09ICcnICYmIHYgIT0gbnVsbClcbiAgICAgICAgICAubWFwKHYgPT4gdGhpcy50b051bWJlcih2KSk7XG4gICAgfVxuICB9XG5cbiAgZmlsbFB4TnVtYmVyQXJyYXkodmFsdWU6IG51bWJlcltdKSB7XG4gICAgY29uc3QgdmwgPSB2YWx1ZS5sZW5ndGg7XG4gICAgc3dpdGNoICh2bCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gWzAsIDAsIDAsIDBdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBjb25zdCB2ID0gdmFsdWVbMF07XG4gICAgICAgIHJldHVybiBbdiwgdiwgdiwgdl07XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGNvbnN0IHYyMSA9IHZhbHVlWzBdO1xuICAgICAgICBjb25zdCB2MjIgPSB2YWx1ZVsxXTtcbiAgICAgICAgcmV0dXJuIFt2MjEsIHYyMiwgdjIxLCB2MjJdO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBjb25zdCB2MzEgPSB2YWx1ZVswXTtcbiAgICAgICAgY29uc3QgdjMyID0gdmFsdWVbMV07XG4gICAgICAgIGNvbnN0IHYzMyA9IHZhbHVlWzJdO1xuICAgICAgICByZXR1cm4gW3YzMSwgdjMyLCB2MzMsIHYzMl07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcGVyY2VudCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgbGV0IHRlbXAgPSB0aGlzLnJvdW5kVG8odmFsdWUgKiAxMDAsIDMpO1xuICAgIHJldHVybiB0ZW1wO1xuICB9XG5cbiAgcm91bmRUbyh2YWx1ZTogbnVtYmVyLCBkZWNpbWFsUG9zaXRpb25zOiBudW1iZXIpIHtcbiAgICBsZXQgaSA9IHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuXG4gICAgaSA9IE1hdGguZmxvb3IoaSk7XG5cbiAgICByZXR1cm4gaSAvIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcbiAgfVxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHNldCB0aGUgZm9ybXNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuXG4gIHNldEZvcm1zKCk6IHZvaWQge1xuICAgIGxldCBmb3JtczogQWpmRm9ybVtdID0gW107XG4gICAgdHJ5IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mb3Jtc0pzb24uZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9ybXMucHVzaChkZWVwQ29weSh0aGlzLmZvcm1zSnNvbi5mb3Jtc1tpXSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2VydmljZS5zZXRSZXBvcnRGb3Jtcyhmb3Jtcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IHRoZSB3aWR0aCBvZiB0aGUgaWR4IGNvbHVtbiBvZiBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBjb2xcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGluc3RhbnRDb2x1bW5WYWx1ZShjb2w6IG51bWJlcnxudWxsLCBpZHg6IG51bWJlcikge1xuICAgIGlmIChjb2wgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VydmljZS5pbnN0YW50Q29sdW1uVmFsdWUoY29sLCBpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqICBmb3JjZSBjb3B5IG9mIHN0eWxlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgLy8gVE9ETyBkZWxldGUgdGhpc1xuICBzZXRTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyA9IGRlZXBDb3B5KHRoaXMuY3VycmVudFdpZGdldC5zdHlsZXMpO1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0V2lkZ2V0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFdpZGdldFN0eWxlcyhsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuY3VycmVudENvbG9yID0gdmFsdWU7XG4gICAgdGhpcy5zZXRTdHlsZSgpO1xuICB9XG5cbiAgc2V0V2lkZ2V0TWFyZ2luKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0TWFyZ2luRXZ0LmVtaXQoe2lkeCwgdmFsdWV9KTtcbiAgfVxuXG4gIHNldFdpZGdldFBhZGRpbmcoaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVXaWRnZXRQYWRkaW5nRXZ0LmVtaXQoe2lkeCwgdmFsdWV9KTtcbiAgfVxuXG4gIHNldFdpZGdldEJvcmRlcldpZHRoKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyV2lkdGhFdnQuZW1pdCh7aWR4LCB2YWx1ZX0pO1xuICB9XG5cbiAgc2V0V2lkZ2V0Qm9yZGVyUmFkaXVzKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyUmFkaXVzRXZ0LmVtaXQoe2lkeCwgdmFsdWV9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIG5ldyBzdHlsZSB0byBzZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRTZWN0aW9uU3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFNlY3Rpb25TdHlsZXModGhpcy5vcmlnaW4sIGxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5zdHlsZUNvbG9yID0gdmFsdWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIG5ldyBzdHlsZSB0byByZXBvcnRcbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFJlcG9ydFN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRSZXBvcnRTdHlsZXMobGFiZWwsIHZhbHVlKTtcbiAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGN1c3RvbSBjb2xvclxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGFkZEN1c3RvbUNvbG9yKCkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ3VzdG9tQ29sb3IodGhpcy5jdXJyZW50Q29sb3IpO1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldCh0aGlzLmN1cnJlbnRXaWRnZXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCB0aGUgbW9kdWxlIGV4cGxvaXQgdG8gcXVpbGwgdGV4dCBlZGl0b3JcbiAgICpcbiAgICogQHJldHVybnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBnZXRNb2R1bGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVpbGxNb2R1bGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIHRydWUgaXMgdGhlIGlucHV0IHR5cGUgdmFsdWUgaXMgZXF1YWwgdG8gY3VycmVudCB3aWRnZXQgdHlwZVxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHJldHVybnNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBpc0NoYXJ0VHlwZVNlbGVjdGVkKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5pbml0Q2hhcnRUeXBlID09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG15T2JqID0gPEFqZkNoYXJ0V2lkZ2V0PnRoaXMuY3VycmVudFdpZGdldDtcbiAgICBpZiAodmFsdWUgPT09IG15T2JqLmNoYXJ0VHlwZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuXG4gIC8qIGxheW91dCBmdW5jdGlvbnMgKi9cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBhIGNvbHVtbiB0byBjdXJyZW50IGxheW91dCB3aWRnZXRcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBhZGRDb2x1bW4oKSB7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDb2x1bW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIGEgb2JqIHRvIGN1cnJlbnQgbGF5b3V0IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmZpeGVkQ29sdW1uKGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHJlbW92ZSBvYmogb2YgY3VycmVudCBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICB1bmZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmUoJ3VuZml4ZWRDb2x1bW4nLCBpZHgpO1xuICB9XG5cbiAgLyogaW1hZ2UgZnVuY3Rpb25zICovXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgaW1hZ2UgdXJsXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0SW1hZ2VVcmwoKSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRJbWFnZVVybCh0aGlzLmltYWdlVXJsKTtcbiAgfVxuXG4gIHNldEljb24oaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ30pIHtcbiAgICB0aGlzLl9pY29uID0gaWNvbjtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEljb24oaWNvbik7XG4gIH1cblxuICAvKiBjaGFydCBmdW5jdGlvbnMgKi9cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHNldCB0aGUgdHlwZSBvZiBjaGFydFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLmluaXRDaGFydFR5cGUgPSB0cnVlO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Q2hhcnRUeXBlKHR5cGUpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJDb2xvcih2YWx1ZTogbnVtYmVyfG51bGwpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLnNldENoYXJ0Qm9yZGVyV2lkdGgodmFsdWUpO1xuICB9XG5cbiAgdGFiVmFsdWU6IHN0cmluZyA9ICdiYWNrZ3JvdW5kQ29sb3InO1xuICBzZXRUYWIoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5pbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy50YWJWYWx1ZSA9ICdiYWNrZ3JvdW5kQ29sb3InO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhYlZhbHVlID0gJ2JvcmRlckNvbG9yJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHJlbW92ZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgcmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byByZW1vdmUgYm9yZGVyIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVDaGFydEJvcmRlckNvbG9yKGluZGV4KTtcbiAgfVxuXG4gIGhpZGVNZW51KCkge1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgfVxuXG4gIG9wZW5Gb3JtdWxhRGlhbG9nKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5hZ2dyZWdhdGlvbiA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmlzRm9ybXVsYSA9IHRydWU7XG4gICAgaWYgKGV2ZW50ICE9IG51bGwgJiYgZXZlbnQucmVmZXJlbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm11bGEgPSBldmVudC5mb3JtdWxhO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVmZXJlbmNlID0gZXZlbnQucmVmZXJlbmNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1zU3ViID0gdGhpcy5fc2VydmljZS5yZXBvcnRGb3Jtcy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmZvcm1zID0geCB8fCBbXTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50V2lkZ2V0ICE9PSB4KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0geDtcbiAgICAgICAgICB0aGlzLndpZGdldE5hbWUgPSBBamZXaWRnZXRUeXBlW3gud2lkZ2V0VHlwZV07XG4gICAgICAgICAgdGhpcy5yZXBvcnRTdHlsZXMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLnNlY3Rpb25TdHlsZXMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLndpZGdldFN0eWxlcyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2VjdGlvbkNvbG9yID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy53aWRnZXRDb2xvciA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMudmlzaWJpbGl0eVNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy53aWRnZXROYW1lID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fY29sb3JTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbG9ycy5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICBpZiAoeCAmJiB4Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jb2xvcnMgPSB4O1xuXG4gICAgICAgIHRoaXMucXVpbGxNb2R1bGVzID0ge1xuICAgICAgICAgIHRvb2xiYXI6IFtcbiAgICAgICAgICAgIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAgICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuICAgICAgICAgICAgW3snaGVhZGVyJzogMX0sIHsnaGVhZGVyJzogMn1dLCAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgICAgICAgIFt7J2xpc3QnOiAnb3JkZXJlZCd9LCB7J2xpc3QnOiAnYnVsbGV0J31dLFxuICAgICAgICAgICAgW3snc2NyaXB0JzogJ3N1Yid9LCB7J3NjcmlwdCc6ICdzdXBlcid9XSwgIC8vIHN1cGVyc2NyaXB0L3N1YnNjcmlwdFxuICAgICAgICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgICAgICAgLy8gW3sgJ2RpcmVjdGlvbic6ICdydGwnIH1dLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuXG4gICAgICAgICAgICBbeydzaXplJzogWydzbWFsbCcsIGZhbHNlLCAnbGFyZ2UnLCAnaHVnZSddfV0sICAvLyBjdXN0b20gZHJvcGRvd25cbiAgICAgICAgICAgIFt7J2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV19XSxcblxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICB7J2NvbG9yJzogdGhpcy5jb2xvcnN9LCB7J2JhY2tncm91bmQnOiB0aGlzLmNvbG9yc31cbiAgICAgICAgICAgIF0sICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgICAgICAgIFt7J2ZvbnQnOiB0aGlzLmZvbnRzfV0sIFt7J2FsaWduJzogdGhpcy5hbGlnbn1dLCBbJ2Zvcm11bGEnXSxcbiAgICAgICAgICAgIFsnY2xlYW4nXSwgIC8vIHJlbW92ZSBmb3JtYXR0aW5nIGJ1dHRvblxuXG4gICAgICAgICAgICAvLyBbJ2xpbmsnLCAnY2xhc3MnLCAndmlkZW8nXSAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIGFuZCBpbWFnZSwgdmlkZW9cbiAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIHRoaXMuZ2V0SFRNTCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG15T2JqID0gPEFqZlRleHRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLmh0bWxUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoJzxwPjxicj48L3A+JykpO1xuXG5cbiAgICB0aGlzLmdldEhlaWdodFdpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiB4ICE9IG51bGwpLCBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnRvTnVtYmVyKG15T2JqLnN0eWxlc1snaGVpZ2h0J10pO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgfHwgdmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Rm9udFNpemVXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnRvTnVtYmVyKG15T2JqLnN0eWxlc1snZm9udC1zaXplJ10pIHx8IDEyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRGb250QWxpZ25XaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICgobXlPYmouc3R5bGVzWyd0ZXh0LWFsaWduJ10pIHx8ICdjZW50ZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydib3JkZXItd2lkdGgnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKFswLCAwLCAwLCAwXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXRUb3AgPVxuICAgICAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMF0pKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0UmlnaHQgPVxuICAgICAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMV0pKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0Qm90dG9tID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzJdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldExlZnQgPVxuICAgICAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbM10pKTtcblxuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxQeE51bWJlckFycmF5KHRoaXMudG9OdW1iZXJBcnJheShteU9iai5zdHlsZXNbJ2JvcmRlci1yYWRpdXMnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKFswLCAwLCAwLCAwXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0VG9wTGVmdCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMF0pKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldFRvcFJpZ2h0ID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsxXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tUmlnaHQgPVxuICAgICAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzJdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXRCb3R0b21MZWZ0ID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVszXSkpO1xuXG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCAmJiBteU9iai5zdHlsZXNbJ21hcmdpbiddICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxQeE51bWJlckFycmF5KHRoaXMudG9OdW1iZXJBcnJheShteU9iai5zdHlsZXNbJ21hcmdpbiddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoWzAsIDAsIDAsIDBdKSk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRUb3AgPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzBdKSk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRSaWdodCA9IHRoaXMuZ2V0TWFyZ2luV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMV0pKTtcbiAgICB0aGlzLmdldE1hcmdpbldpZGdldEJvdHRvbSA9IHRoaXMuZ2V0TWFyZ2luV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMl0pKTtcbiAgICB0aGlzLmdldE1hcmdpbldpZGdldExlZnQgPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzNdKSk7XG5cbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCAmJiBteU9iai5zdHlsZXNbJ3BhZGRpbmcnXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydwYWRkaW5nJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldFRvcCA9IHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzBdKSk7XG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0UmlnaHQgPVxuICAgICAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsxXSkpO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldEJvdHRvbSA9XG4gICAgICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzJdKSk7XG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0TGVmdCA9IHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzNdKSk7XG5cbiAgICB0aGlzLmdldEJhY2tncm91bmRDb2xvcldpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsICYmIG15T2JqLnN0eWxlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmouc3R5bGVzWydiYWNrZ3JvdW5kQ29sb3InXSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Q29sb3JXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLnN0eWxlc1snY29sb3InXSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzID0gdGhpcy5fdXBkYXRlV2lkZ2V0TWFyZ2luRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuZ2V0TWFyZ2luV2lkZ2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUociA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IChyWzFdIHx8IFswLCAwLCAwLCAwXSkgYXMgbnVtYmVyW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZbaWR4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ21hcmdpbicsIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMuYWRkKHRoaXMuX3VwZGF0ZVdpZGdldFBhZGRpbmdFdnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuZ2V0UGFkZGluZ1dpZGdldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSByWzBdLmlkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gKHJbMV0gfHwgWzAsIDAsIDAsIDBdKSBhcyBudW1iZXJbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ3BhZGRpbmcnLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzLmFkZCh0aGlzLl91cGRhdGVXaWRnZXRCb3JkZXJXaWR0aEV2dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSByWzBdLmlkeDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gKHJbMV0gfHwgWzAsIDAsIDAsIDBdKSBhcyBudW1iZXJbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ2JvcmRlci13aWR0aCcsIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMuYWRkKHRoaXMuX3VwZGF0ZVdpZGdldEJvcmRlclJhZGl1c0V2dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUociA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IChyWzFdIHx8IFswLCAwLCAwLCAwXSkgYXMgbnVtYmVyW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09IG51bGwgfHwgdi5sZW5ndGggPCBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdltpZHhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKCdib3JkZXItcmFkaXVzJywgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWU7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMud2lkZ2V0TmFtZSA9IEFqZldpZGdldFR5cGVbdGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGVdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm1zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY29sb3JTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmlnaW5TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=