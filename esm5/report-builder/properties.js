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
var AjfReportBuilderProperties = /** @class */ (function () {
    function AjfReportBuilderProperties(_dialog, _service) {
        var _this = this;
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
        this.iconSet.data = Object.keys(_service.iconSets).filter(function (x) { return x != 'ajf-icon'; }).map(function (i) {
            return { name: i, icons: _service.iconSets[i] };
        });
        this._headerStyleSub = this._service.headerStyles.subscribe(function (s) {
            if (s['background-color'] != null) {
                _this.styleBackgroundColor = s['background-color'];
            }
        });
        this._contentStylesSub = this._service.contentStyles.subscribe(function (s) {
            if (s['background-color'] != null) {
                _this.styleBackgroundColor = s['background-color'];
            }
        });
        this._footerStylesSub = this._service.footerStyles.subscribe(function (s) {
            if (s['background-color'] != null) {
                _this.styleBackgroundColor = s['background-color'];
            }
        });
        this._originSub = this._service.origin.subscribe(function (s) {
            _this.origin = s;
        });
    }
    Object.defineProperty(AjfReportBuilderProperties.prototype, "currentLayoutWidget", {
        get: function () {
            return this.currentWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderProperties.prototype, "currentTextWidget", {
        get: function () {
            return this.currentWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfReportBuilderProperties.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        enumerable: true,
        configurable: true
    });
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
    AjfReportBuilderProperties.prototype.toNumber = function (value) {
        var numberPattern = /^(-)?\d+/g;
        if (value == null) {
            return 0;
        }
        else {
            var matches = value.match(numberPattern);
            if (matches == null || matches.length == 0) {
                return 0;
            }
            return Number(matches[0]);
        }
    };
    AjfReportBuilderProperties.prototype.toNumberArray = function (value) {
        var _this = this;
        if (value == null) {
            return [];
        }
        else {
            return (value || '')
                .replace('px', '')
                .split(' ')
                .filter(function (v) { return v !== '' && v != null; })
                .map(function (v) { return _this.toNumber(v); });
        }
    };
    AjfReportBuilderProperties.prototype.fillPxNumberArray = function (value) {
        var vl = value.length;
        switch (vl) {
            case 0:
                return [0, 0, 0, 0];
            case 1:
                var v = value[0];
                return [v, v, v, v];
            case 2:
                var v21 = value[0];
                var v22 = value[1];
                return [v21, v22, v21, v22];
            case 3:
                var v31 = value[0];
                var v32 = value[1];
                var v33 = value[2];
                return [v31, v32, v33, v32];
            default:
                return value;
        }
    };
    AjfReportBuilderProperties.prototype.percent = function (value) {
        var temp = this.roundTo(value * 100, 3);
        return temp;
    };
    AjfReportBuilderProperties.prototype.roundTo = function (value, decimalPositions) {
        var i = value * Math.pow(10, decimalPositions);
        i = Math.floor(i);
        return i / Math.pow(10, decimalPositions);
    };
    /**
     * call to service to set the forms
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.setForms = function () {
        var forms = [];
        try {
            for (var i = 0; i < this.formsJson.forms.length; i++) {
                forms.push(deepCopy(this.formsJson.forms[i]));
            }
            this._service.setReportForms(forms);
        }
        catch (e) {
        }
    };
    /**
     * call to service to set the width of the idx column of layout widget
     *
     * @param col
     * @param idx
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.instantColumnValue = function (col, idx) {
        if (col === null) {
            return;
        }
        this._service.instantColumnValue(col, idx);
    };
    /**
     *  force copy of style
     *
     * @memberOf AjfReportBuilderProperties
     */
    // TODO delete this
    AjfReportBuilderProperties.prototype.setStyle = function () {
        if (this.currentWidget == null) {
            return;
        }
        this.currentWidget.styles = deepCopy(this.currentWidget.styles);
        this._service.updateCurrentWidget(this.currentWidget);
    };
    /**
     * call to service to add new style to widget
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.setWidgetStyles = function (label, value) {
        this._service.setWidgetStyles(label, value);
        this.currentColor = value;
        this.setStyle();
    };
    AjfReportBuilderProperties.prototype.setWidgetMargin = function (idx, value) {
        this._updateWidgetMarginEvt.emit({ idx: idx, value: value });
    };
    AjfReportBuilderProperties.prototype.setWidgetPadding = function (idx, value) {
        this._updateWidgetPaddingEvt.emit({ idx: idx, value: value });
    };
    AjfReportBuilderProperties.prototype.setWidgetBorderWidth = function (idx, value) {
        this._updateWidgetBorderWidthEvt.emit({ idx: idx, value: value });
    };
    AjfReportBuilderProperties.prototype.setWidgetBorderRadius = function (idx, value) {
        this._updateWidgetBorderRadiusEvt.emit({ idx: idx, value: value });
    };
    /**
     * call to service to add new style to section
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.setSectionStyles = function (label, value) {
        this._service.setSectionStyles(this.origin, label, value);
        this.styleColor = value;
    };
    /**
     * call to service to add new style to report
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.setReportStyles = function (label, value) {
        this._service.setReportStyles(label, value);
        this.styleBackgroundColor = value;
    };
    /**
     * add custom color
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.addCustomColor = function () {
        this._service.addCustomColor(this.currentColor);
        this._service.updateCurrentWidget(this.currentWidget);
    };
    /**
     * get the module exploit to quill text editor
     *
     * @returns
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.getModule = function () {
        return this.quillModules;
    };
    /**
     * true is the input type value is equal to current widget type
     *
     * @param value
     * @returns
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.isChartTypeSelected = function (value) {
        if (this.initChartType == false) {
            return false;
        }
        var myObj = this.currentWidget;
        if (value === myObj.chartType) {
            return true;
        }
        else {
            return false;
        }
    };
    /* layout functions */
    /**
     * call to service to add a column to current layout widget
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.addColumn = function () {
        this._service.addColumn();
    };
    /**
     * call to service to add a obj to current layout widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.fixedColumn = function (idx) {
        this._service.fixedColumn(idx);
    };
    /**
     * call to service to remove obj of current layout widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.unfixedColumn = function (idx) {
        this._service.remove('unfixedColumn', idx);
    };
    /* image functions */
    /**
     * call to service to set image url
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.setImageUrl = function () {
        this._service.setImageUrl(this.imageUrl);
    };
    AjfReportBuilderProperties.prototype.setIcon = function (icon) {
        this._icon = icon;
        this._service.setIcon(icon);
    };
    /* chart functions */
    /**
     * call to service to set the type of chart
     *
     * @param type
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.setChartType = function (type) {
        this.initChartType = true;
        this._service.setChartType(type);
    };
    AjfReportBuilderProperties.prototype.setChartBorderColor = function (value) {
        if (value == null) {
            return;
        }
        this._service.setChartBorderWidth(value);
    };
    AjfReportBuilderProperties.prototype.setTab = function (event) {
        if (event.index === 0) {
            this.tabValue = 'backgroundColor';
        }
        else {
            this.tabValue = 'borderColor';
        }
    };
    /**
     * call to service to remove background color to current chart
     *
     * @param index
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.removeChartBackgroundColor = function (index) {
        this._service.removeChartBackgroundColor(index);
    };
    /**
     * call to service to remove border color to current chart
     *
     * @param index
     *
     * @memberOf AjfReportBuilderProperties
     */
    AjfReportBuilderProperties.prototype.removeChartBorderColor = function (index) {
        this._service.removeChartBorderColor(index);
    };
    AjfReportBuilderProperties.prototype.hideMenu = function () {
        this._service.updateCurrentWidget(null);
    };
    AjfReportBuilderProperties.prototype.openFormulaDialog = function (event) {
        this.dialogRef = this._dialog.open(AjfReportBuilderFormsAnalyzerDialog);
        this.dialogRef.componentInstance.aggregation = AjfAggregationType.None;
        this.dialogRef.componentInstance.isFormula = true;
        if (event != null && event.reference != null) {
            this.dialogRef.componentInstance.formula = event.formula;
            this.dialogRef.componentInstance.reference = event.reference;
        }
    };
    AjfReportBuilderProperties.prototype.ngOnInit = function () {
        var _this = this;
        this._formsSub = this._service.reportForms.subscribe(function (x) {
            _this.forms = x || [];
        });
        this._currentWidgetSub = this._service.currentWidget.subscribe(function (x) {
            if (x != null) {
                if (_this.currentWidget !== x) {
                    _this.currentWidget = x;
                    _this.widgetName = AjfWidgetType[x.widgetType];
                    _this.reportStyles = false;
                    _this.sectionStyles = false;
                    _this.widgetStyles = false;
                    _this.sectionColor = false;
                    _this.widgetColor = false;
                    _this.visibilitySection = false;
                }
            }
            else {
                _this.currentWidget = null;
                _this.widgetName = '';
            }
        });
        this._colorSub = this._service.colors.subscribe(function (x) {
            if (x && x.length > 0) {
                _this.colors = x;
                _this.quillModules = {
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
                            { 'color': _this.colors }, { 'background': _this.colors }
                        ],
                        [{ 'font': _this.fonts }], [{ 'align': _this.align }], ['formula'],
                        ['clean'],
                    ]
                };
            }
        });
        this.getHTML = this._service.currentWidget.pipe(map(function (widget) {
            if (widget != null) {
                var myObj = _this.currentWidget;
                return myObj.htmlText;
            }
            return '';
        }), distinctUntilChanged(), startWith('<p><br></p>'));
        this.getHeightWidget = this._service.currentWidget.pipe(filter(function (x) { return x != null; }), map(function (myObj) {
            if (myObj != null) {
                var value = _this.toNumber(myObj.styles['height']);
                if (value != null || value != null) {
                    return value;
                }
            }
            return undefined;
        }), distinctUntilChanged());
        this.getFontSizeWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null) {
                return (_this.toNumber(myObj.styles['font-size']) || 12);
            }
            return undefined;
        }), distinctUntilChanged());
        this.getFontAlignWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null) {
                return ((myObj.styles['text-align']) || 'center');
            }
            return undefined;
        }), distinctUntilChanged());
        this.getBorderWidthWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null) {
                return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['border-width']));
            }
            return undefined;
        }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderWidthWidgetTop =
            this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[0]; }));
        this.getBorderWidthWidgetRight =
            this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getBorderWidthWidgetBottom =
            this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
        this.getBorderWidthWidgetLeft =
            this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[3]; }));
        this.getBorderRadiusWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null) {
                return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['border-radius']));
            }
            return undefined;
        }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderRadiusWidgetTopLeft =
            this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[0]; }));
        this.getBorderRadiusWidgetTopRight =
            this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getBorderRadiusWidgetBottomRight =
            this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
        this.getBorderRadiusWidgetBottomLeft =
            this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[3]; }));
        this.getMarginWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null && myObj.styles != null && myObj.styles['margin'] != null) {
                return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['margin']));
            }
            return undefined;
        }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getMarginWidgetTop = this.getMarginWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[0]; }));
        this.getMarginWidgetRight = this.getMarginWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getMarginWidgetBottom = this.getMarginWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
        this.getMarginWidgetLeft = this.getMarginWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[3]; }));
        this.getPaddingWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null && myObj.styles != null && myObj.styles['padding'] != null) {
                return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['padding']));
            }
            return undefined;
        }), distinctUntilChanged());
        this.getPaddingWidgetTop = this.getPaddingWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[0]; }));
        this.getPaddingWidgetRight =
            this.getPaddingWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getPaddingWidgetBottom =
            this.getPaddingWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
        this.getPaddingWidgetLeft = this.getPaddingWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[3]; }));
        this.getBackgroundColorWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null && myObj.styles != null) {
                return myObj.styles['backgroundColor'] || '';
            }
        }), distinctUntilChanged());
        this.getColorWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null && myObj.styles != null) {
                return myObj.styles['color'] || '';
            }
        }), distinctUntilChanged());
        this._stylesUpdatesSubs =
            this._updateWidgetMarginEvt
                .pipe(withLatestFrom(this.getMarginWidget))
                .subscribe(function (r) {
                if (r == null) {
                    return;
                }
                var idx = r[0].idx;
                var value = r[0].value;
                var v = r[1] || [0, 0, 0, 0];
                if (v == null || v.length < idx) {
                    return;
                }
                v[idx] = value;
                _this.setWidgetStyles('margin', v);
            });
        this._stylesUpdatesSubs.add(this._updateWidgetPaddingEvt
            .pipe(withLatestFrom(this.getPaddingWidget))
            .subscribe(function (r) {
            if (r == null) {
                return;
            }
            var idx = r[0].idx;
            var value = r[0].value;
            var v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            _this.setWidgetStyles('padding', v);
        }));
        this._stylesUpdatesSubs.add(this._updateWidgetBorderWidthEvt
            .pipe(withLatestFrom(this.getBorderWidthWidget))
            .subscribe(function (r) {
            if (r == null) {
                return;
            }
            var idx = r[0].idx;
            var value = r[0].value;
            var v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            _this.setWidgetStyles('border-width', v);
        }));
        this._stylesUpdatesSubs.add(this._updateWidgetBorderRadiusEvt
            .pipe(withLatestFrom(this.getBorderRadiusWidget))
            .subscribe(function (r) {
            if (r == null) {
                return;
            }
            var idx = r[0].idx;
            var value = r[0].value;
            var v = r[1] || [0, 0, 0, 0];
            if (v == null || v.length < idx) {
                return;
            }
            v[idx] = value;
            _this.setWidgetStyles('border-radius', v);
        }));
    };
    AjfReportBuilderProperties.prototype.ngOnChanges = function (changes) {
        this.currentWidget = changes.widget.currentValue;
        if (this.currentWidget == null) {
            return;
        }
        this.widgetName = AjfWidgetType[this.currentWidget.widgetType];
    };
    AjfReportBuilderProperties.prototype.ngOnDestroy = function () {
        this._currentWidgetSub.unsubscribe();
        this._formsSub.unsubscribe();
        this._colorSub.unsubscribe();
        this._headerStyleSub.unsubscribe();
        this._contentStylesSub.unsubscribe();
        this._footerStylesSub.unsubscribe();
        this._originSub.unsubscribe();
        this._stylesUpdatesSubs.unsubscribe();
    };
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
    AjfReportBuilderProperties.ctorParameters = function () { return [
        { type: MatDialog },
        { type: AjfReportBuilderService }
    ]; };
    return AjfReportBuilderProperties;
}());
export { AjfReportBuilderProperties };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFDTCxrQkFBa0IsRUFLbEIsYUFBYSxFQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFJWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVGLE9BQU8sRUFBQyxtQ0FBbUMsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTVFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFO0lBdVJFLG9DQUFvQixPQUFrQixFQUFVLFFBQWlDO1FBQWpGLGlCQXlCQztRQXpCbUIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUFVLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBL1FqRjs7OztXQUlHO1FBQ0gsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFdEI7Ozs7V0FJRztRQUNILGtCQUFhLEdBQW1CLElBQUksQ0FBQztRQVFyQzs7OztXQUlHO1FBQ0gsVUFBSyxHQUFjLEVBQUUsQ0FBQztRQUd0QixXQUFNLEdBQWEsRUFBRSxDQUFDO1FBU3RCOztXQUVHO1FBRUgsY0FBUyxHQUFR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QUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQzs7Z0JBcDRCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsK2grQkFBOEI7b0JBRTlCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWRPLFNBQVM7Z0JBTVQsdUJBQXVCOztJQXU0Qi9CLGlDQUFDO0NBQUEsQUFyNEJELElBcTRCQztTQTkzQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBamZBZ2dyZWdhdGlvblR5cGUsXG4gIEFqZkNoYXJ0V2lkZ2V0LFxuICBBamZMYXlvdXRXaWRnZXQsXG4gIEFqZlRleHRXaWRnZXQsXG4gIEFqZldpZGdldCxcbiAgQWpmV2lkZ2V0VHlwZVxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nfSBmcm9tICcuL2Zvcm1zLWFuYWx5emVyLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1WYXJpYWJsZXN9IGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1wcm9wZXJ0aWVzJyxcbiAgdGVtcGxhdGVVcmw6ICdwcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncHJvcGVydGllcy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXMgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqICB0cnVlIHdoZW4gdGhlIGZpcnN0IHRpbWUgY2hhcnQgdHlwZSBpcyBzZXR0ZWRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBpbml0Q2hhcnRUeXBlID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIHRoZSBjdXJyZW50IHdpZGdldFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGN1cnJlbnRXaWRnZXQ6IEFqZldpZGdldHxudWxsID0gbnVsbDtcbiAgZ2V0IGN1cnJlbnRMYXlvdXRXaWRnZXQoKTogQWpmTGF5b3V0V2lkZ2V0IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50V2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldDtcbiAgfVxuICBnZXQgY3VycmVudFRleHRXaWRnZXQoKTogQWpmVGV4dFdpZGdldCB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFdpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgYXJyYXkgY29udGFpbnMgdGhlIGZvcm1zIGV4cGxvaXRlZCBmb3IgZ2VuZXJhdGUgZGF0YSBsYWJlbHNcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBmb3JtczogQWpmRm9ybVtdID0gW107XG5cblxuICBjb2xvcnM6IHN0cmluZ1tdID0gW107XG5cbiAgLyoqXG4gICAqIHRoZSBuYW1lIG9mIHRoZSBzZWN0aW9uIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnRXaWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBvcmlnaW46IHN0cmluZztcblxuICAvKipcbiAgICogRkFLRSBEQVRBXG4gICAqL1xuXG4gIGZvcm1zSnNvbjogYW55ID0ge2Zvcm1zOiBbXX07XG5cbiAgLyoqXG4gICAqIFdJREdFVFxuICAgKi9cblxuICB3aWRnZXROYW1lID0gJyc7XG4gIGdldEhUTUw6IE9ic2VydmFibGU8c3RyaW5nfHVuZGVmaW5lZD47XG4gIGdldEhlaWdodFdpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJ8dW5kZWZpbmVkPjtcbiAgZ2V0Rm9udFNpemVXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyfHVuZGVmaW5lZD47XG4gIGdldEZvbnRBbGlnbldpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJ8dW5kZWZpbmVkPjtcbiAgZ2V0QmFja2dyb3VuZENvbG9yV2lkZ2V0OiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIGdldENvbG9yV2lkZ2V0OiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIGdldFN0eWxlOiBPYnNlcnZhYmxlPGFueT47XG4gIGdldENoYXJ0QmFja2dyb3VuZENvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0Q2hhcnRCb3JkZXJDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldFZpc2liaWxpdHk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uPjtcbiAgZ2V0Q29sb3I6IE9ic2VydmFibGU8U3RyaW5nW10+O1xuXG4gIG1hcmdpbkV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldE1hcmdpbldpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXXx1bmRlZmluZWQ+O1xuICBnZXRNYXJnaW5XaWRnZXRUb3A6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0UmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0Qm90dG9tOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldE1hcmdpbldpZGdldExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwYWRkaW5nRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0UGFkZGluZ1dpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXXx1bmRlZmluZWQ+O1xuICBnZXRQYWRkaW5nV2lkZ2V0VG9wOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldFBhZGRpbmdXaWRnZXRSaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRQYWRkaW5nV2lkZ2V0Qm90dG9tOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldFBhZGRpbmdXaWRnZXRMZWZ0OiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgYm9yZGVyV2lkdGhFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXXx1bmRlZmluZWQ+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldFRvcDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0Qm90dG9tOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0TGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGJvcmRlclJhZGl1c0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXXx1bmRlZmluZWQ+O1xuICBnZXRCb3JkZXJSYWRpdXNXaWRnZXRUb3BMZWZ0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldFRvcFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbVJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbUxlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBiYWNrZ3JvdW5kQ29sb3IgPSAnIzEyN2JkYyc7XG4gIHN0eWxlQmFja2dyb3VuZENvbG9yID0gJ3JnYigyNTUsMjU1LDI1NSwwKSc7XG4gIGJvcmRlckNvbG9yID0gJyMxMjdiZGMnO1xuICBzdHlsZUNvbG9yID0gJ3JnYigwLDAsMCwwKSc7XG4gIHdiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgZm9udFNpemU6IHN0cmluZztcbiAgYnViYmxlOiBzdHJpbmc7XG5cbiAgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2c+O1xuICBjb250YWluZXI6IEFqZkZvcm1WYXJpYWJsZXM7XG5cblxuICBhbGlnbiA9IFtmYWxzZSwgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5J107XG5cbiAgZm9udHMgPSBbXG4gICAgZmFsc2UsICdibGFja3InLCAnYmxhY2staXRhbGljJywgJ2JvbGQnLCAnYm9sZC1jb25kZW5zZWQnLCAnYm9sZC1jb25kZW5zZWQtaXRhbGljJyxcbiAgICAnYm9sZC1pdGFsaWMnLCAnY29uZGVuc2VkJywgJ2NvbmRlbnNlZC1pdGFsaWMnLCAnaXRhbGljJywgJ2xpZ2h0JywgJ2xpZ2h0LWl0YWxpYycsICdtZWRpdW0nLFxuICAgICdtZWRpdW0taXRhbGljJywgJ3RoaW5yJywgJ3RoaW4taXRhbGljJ1xuICBdO1xuICBjdXJyZW50TW9kdWxlOiBhbnkgPSB7fTtcbiAgcXVpbGxNb2R1bGVzID0ge1xuICAgIHRvb2xiYXI6IFtcbiAgICAgIFsnZm9ybXVsYSddLCBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSwgIC8vIHRvZ2dsZWQgYnV0dG9uc1xuICAgICAgLy8gWydibG9ja3F1b3RlJywgJ2NvZGUtYmxvY2snXSxcblxuICAgICAgW3snaGVhZGVyJzogMX0sIHsnaGVhZGVyJzogMn1dLCAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgIFt7J2xpc3QnOiAnb3JkZXJlZCd9LCB7J2xpc3QnOiAnYnVsbGV0J31dLFxuICAgICAgW3snc2NyaXB0JzogJ3N1Yid9LCB7J3NjcmlwdCc6ICdzdXBlcid9XSwgIC8vIHN1cGVyc2NyaXB0L3N1YnNjcmlwdFxuICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgLy8gW3sgJ2RpcmVjdGlvbic6ICdydGwnIH1dLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuXG4gICAgICBbeydzaXplJzogWydzbWFsbCcsIGZhbHNlLCAnbGFyZ2UnLCAnaHVnZSddfV0sICAvLyBjdXN0b20gZHJvcGRvd25cbiAgICAgIFt7J2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV19XSxcblxuICAgICAgW3snY29sb3InOiB0aGlzLmNvbG9yc30sIHsnYmFja2dyb3VuZCc6IHRoaXMuY29sb3JzfV0sICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgIFt7J2ZvbnQnOiB0aGlzLmZvbnRzfV0sIFt7J2FsaWduJzogdGhpcy5hbGlnbn1dLFxuXG4gICAgICBbJ2NsZWFuJ10sICAvLyByZW1vdmUgZm9ybWF0dGluZyBidXR0b25cblxuICAgICAgLy8gWydsaW5rJywgJ2NsYXNzJywgJ3ZpZGVvJ10gICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluayBhbmQgaW1hZ2UsIHZpZGVvXG4gICAgXVxuICB9O1xuXG4gIC8qKlxuICAgKiBDSEFSVFxuICAgKi9cblxuXG4gIGdldENoYXJ0WUxhYmVsczogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG5cbiAgY2hhcnRCb3JkZXJDb2xvcjogc3RyaW5nW10gPSBbXTtcbiAgY2hhcnRCb3JkZXJXaWR0aCA9IDM7XG5cbiAgLyoqXG4gICAqXG4gICAqIElNQUdFXG4gICAqL1xuXG4gIGltYWdlVXJsID0gJ2h0dHBzOi8vYW5ndWxhci5pby9yZXNvdXJjZXMvaW1hZ2VzL2xvZ29zL2FuZ3VsYXIyL2FuZ3VsYXIucG5nJztcblxuICAvKipcbiAgICpcbiAgICogVEVYVFxuICAgKi9cblxuICBodG1sVGV4dCA9ICcnO1xuXG5cbiAgLyoqXG4gICAqIHRoZXNlIHZhcmlhYmxlcyBpbmRpY2F0ZSB0aGF0IHRoZSB1c2VyIHdhbnQgdG8gY2hhbmdlIHNlY3Rpb25cbiAgICovXG4gIHJlcG9ydFN0eWxlcyA9IGZhbHNlO1xuICBzZWN0aW9uU3R5bGVzID0gZmFsc2U7XG4gIHdpZGdldFN0eWxlcyA9IHRydWU7XG4gIHNlY3Rpb25Db2xvciA9IGZhbHNlO1xuICB3aWRnZXRDb2xvciA9IGZhbHNlO1xuICB2aXNpYmlsaXR5U2VjdGlvbiA9IGZhbHNlO1xuICBjdXJyZW50Q29sb3IgPSAnJztcblxuICBwcml2YXRlIF9pY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfXxudWxsID0gbnVsbDtcbiAgZ2V0IGljb24oKToge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ318bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cblxuICBpY29uU2V0OiBhbnkgPSB7J2ljb24nOiAndHJ1ZScsICd0aXRsZSc6ICdyZXBvcnQnLCAnZGF0YSc6IG51bGx9O1xuXG4gIGZsYWdTZXQ6IGFueSA9IHtcbiAgICAnaWNvbic6ICdmYWxzZScsXG4gICAgJ2NsYXNzJzogWydmbGFnLWljb24nXSxcbiAgICAncHJlZml4Q2xhc3MnOiAnZmxhZy1pY29uLScsXG4gICAgJ3RpdGxlJzogJ2ZsYWdzJyxcbiAgICAnZGF0YSc6XG4gICAgICAgIFtcbiAgICAgICAgICB7J2NsYXNzJzogJ2R6JywgJ2luZm8nOiAnQWxnZXJpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnYW8nLCAnaW5mbyc6ICdBbmdvbGEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2JqJywgJ2luZm8nOiAnQmVuaW4nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2J3JywgJ2luZm8nOiAnQm90c3dhbmEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2JmJywgJ2luZm8nOiAnQnVya2luYSBGYXNvJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdiaScsICdpbmZvJzogJ0J1cnVuZGknfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2NtJywgJ2luZm8nOiAnQ2FtZXJvb24nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2N2JywgJ2luZm8nOiAnQ2FibyBWZXJkZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnY2YnLCAnaW5mbyc6ICdUaGUgQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd0ZCcsICdpbmZvJzogJ0NoYWQnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2ttJywgJ2luZm8nOiAnVGhlIENvbW9yb3MnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2NpJywgJ2luZm8nOiAnQ290ZSBEXFwnYXZvaXJlJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdjZCcsICdpbmZvJzogJ1RoZSBEZW1vY3JhdGljIFJlcHVibGljIG9mIENvbmdvJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdkaicsICdpbmZvJzogJ0Rpamlib3V0aSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZWcnLCAnaW5mbyc6ICdFZ3lwdCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZ3EnLCAnaW5mbyc6ICdFcXVhdG9yaWFsIEd1aW5lYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZXInLCAnaW5mbyc6ICdFcml0cmVhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdldCcsICdpbmZvJzogJ0V0aGlvcGlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd0ZicsICdpbmZvJzogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZ2EnLCAnaW5mbyc6ICdHYWJvbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZ20nLCAnaW5mbyc6ICdUaGUgR2FtYmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdnaCcsICdpbmZvJzogJ0doYW5hJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdnbicsICdpbmZvJzogJ0d1aW5lYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnZ3cnLCAnaW5mbyc6ICdHdWluZWEtQmlzc2F1J30sXG4gICAgICAgICAgeydjbGFzcyc6ICdrZScsICdpbmZvJzogJ0tlbnlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdscycsICdpbmZvJzogJ0xlc2hvdGhvJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdscicsICdpbmZvJzogJ0xpYmVyaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2x5JywgJ2luZm8nOiAnTGlieWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ21nJywgJ2luZm8nOiAnTWFkYWdhc2Nhcid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbXcnLCAnaW5mbyc6ICdNYWxhd3knfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ21sJywgJ2luZm8nOiAnTWFsaSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbXInLCAnaW5mbyc6ICdNYXVyaXRhbmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdtdScsICdpbmZvJzogJ01hdXJpdGl1cyd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAneXQnLCAnaW5mbyc6ICdNYXlvdHRlJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdtYScsICdpbmZvJzogJ01hcm9jY28nfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ216JywgJ2luZm8nOiAnTW96YW1iaXF1ZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnbmEnLCAnaW5mbyc6ICdOYW1pYmlhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICduZScsICdpbmZvJzogJ05pZ2VyJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICduZycsICdpbmZvJzogJ05pZ2VyaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2NnJywgJ2luZm8nOiAnUmVwdWJsaWMgb2YgdGhlIENvbmdvJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdydycsICdpbmZvJzogJ1J3bmRhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdyZScsICdpbmZvJzogJ3LDqHVuaW9uJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzaCcsICdpbmZvJzogJ1NhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzdCcsICdpbmZvJzogJ1NhbyBUb21lIGFuZCBQcmluY2lwZSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnc24nLCAnaW5mbyc6ICdTZW5lZ2FsJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzYycsICdpbmZvJzogJ1NleWNoZWxsZXMnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3NsJywgJ2luZm8nOiAnU2llcnJhIExlb25lJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzbycsICdpbmZvJzogJ1NvbWFsaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3phJywgJ2luZm8nOiAnU291dGggQWZyaWNhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzcycsICdpbmZvJzogJ1NvdXRoIFN1ZGFuJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzZCcsICdpbmZvJzogJ1N1ZGFuJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdzeicsICdpbmZvJzogJ1N3YXppbGFuZCd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndHonLCAnaW5mbyc6ICdUYW56YW5pYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAndGcnLCAnaW5mbyc6ICdUb2dvJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd0bicsICdpbmZvJzogJ1R1bmlzaWEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ3VnJywgJ2luZm8nOiAnVWdhbmRhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdlaCcsICdpbmZvJzogJ1dlc3Rlcm4gU2FoYXJhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd6bScsICdpbmZvJzogJ1phbWJpYSd9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnencnLCAnaW5mbyc6ICdaaW1iYXdlJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdpcScsICdpbmZvJzogJ0lyYXEnfSxcbiAgICAgICAgICB7J2NsYXNzJzogJ2xiJywgJ2luZm8nOiAnTGViYW5vbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAnYmQnLCAnaW5mbyc6ICdCYW5nbGFkZXNoJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdpcicsICdpbmZvJzogJ0lyYW4gKElzbGFtaWMgUmVwdWJsaWMgb2YpJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdteScsICdpbmZvJzogJ01hbGF5c2lhJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICducCcsICdpbmZvJzogJ05lcGFsJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdwaycsICdpbmZvJzogJ1Bha2lzdGFuJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICd0aCcsICdpbmZvJzogJ1RoYWlsYW5kJ30sXG4gICAgICAgICAgeydjbGFzcyc6ICdqbycsICdpbmZvJzogJ0pvcmRhbid9LFxuICAgICAgICAgIHsnY2xhc3MnOiAneWUnLCAnaW5mbyc6ICdZZW1lbid9XG4gICAgICAgIF1cbiAgfTtcblxuICBwcml2YXRlIF9jdXJyZW50V2lkZ2V0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm1zU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbG9yU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2hlYWRlclN0eWxlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbnRlbnRTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9vdGVyU3R5bGVzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX29yaWdpblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zdHlsZXNVcGRhdGVzU3ViczogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3VwZGF0ZVdpZGdldE1hcmdpbkV2dDogRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4oKTtcbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0UGFkZGluZ0V2dDogRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4oKTtcbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0Qm9yZGVyV2lkdGhFdnQ6IEV2ZW50RW1pdHRlcjx7aWR4OiBudW1iZXIsIHZhbHVlOiBhbnl9PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+KCk7XG4gIHByaXZhdGUgX3VwZGF0ZVdpZGdldEJvcmRlclJhZGl1c0V2dDogRXZlbnRFbWl0dGVyPHtpZHg6IG51bWJlciwgdmFsdWU6IGFueX0+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8e2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZywgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLnNldEZvcm1zKCk7XG5cbiAgICB0aGlzLmljb25TZXQuZGF0YSA9IE9iamVjdC5rZXlzKF9zZXJ2aWNlLmljb25TZXRzKS5maWx0ZXIoeCA9PiB4ICE9ICdhamYtaWNvbicpLm1hcChpID0+IHtcbiAgICAgIHJldHVybiB7bmFtZTogaSwgaWNvbnM6IF9zZXJ2aWNlLmljb25TZXRzW2ldfTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2hlYWRlclN0eWxlU3ViID0gdGhpcy5fc2VydmljZS5oZWFkZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fY29udGVudFN0eWxlc1N1YiA9IHRoaXMuX3NlcnZpY2UuY29udGVudFN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmZvb3RlclN0eWxlcy5zdWJzY3JpYmUocyA9PiB7XG4gICAgICBpZiAoc1snYmFja2dyb3VuZC1jb2xvciddICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHNbJ2JhY2tncm91bmQtY29sb3InXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9vcmlnaW5TdWIgPSB0aGlzLl9zZXJ2aWNlLm9yaWdpbi5zdWJzY3JpYmUocyA9PiB7XG4gICAgICB0aGlzLm9yaWdpbiA9IHM7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8qKlxuICAgKlxuICAgKiBVVElMU1xuICAgKi9cblxuXG4gIC8qKlxuICAgKiByZXR1cm4gYSBudW1iZXIgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgdG9OdW1iZXIodmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgbGV0IG51bWJlclBhdHRlcm4gPSAvXigtKT9cXGQrL2c7XG5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSB2YWx1ZS5tYXRjaChudW1iZXJQYXR0ZXJuKTtcbiAgICAgIGlmIChtYXRjaGVzID09IG51bGwgfHwgbWF0Y2hlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBOdW1iZXIobWF0Y2hlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgdG9OdW1iZXJBcnJheSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyW10ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodmFsdWUgfHwgJycpXG4gICAgICAgICAgLnJlcGxhY2UoJ3B4JywgJycpXG4gICAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgICAuZmlsdGVyKHYgPT4gdiAhPT0gJycgJiYgdiAhPSBudWxsKVxuICAgICAgICAgIC5tYXAodiA9PiB0aGlzLnRvTnVtYmVyKHYpKTtcbiAgICB9XG4gIH1cblxuICBmaWxsUHhOdW1iZXJBcnJheSh2YWx1ZTogbnVtYmVyW10pIHtcbiAgICBjb25zdCB2bCA9IHZhbHVlLmxlbmd0aDtcbiAgICBzd2l0Y2ggKHZsKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbMCwgMCwgMCwgMF07XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGNvbnN0IHYgPSB2YWx1ZVswXTtcbiAgICAgICAgcmV0dXJuIFt2LCB2LCB2LCB2XTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgY29uc3QgdjIxID0gdmFsdWVbMF07XG4gICAgICAgIGNvbnN0IHYyMiA9IHZhbHVlWzFdO1xuICAgICAgICByZXR1cm4gW3YyMSwgdjIyLCB2MjEsIHYyMl07XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGNvbnN0IHYzMSA9IHZhbHVlWzBdO1xuICAgICAgICBjb25zdCB2MzIgPSB2YWx1ZVsxXTtcbiAgICAgICAgY29uc3QgdjMzID0gdmFsdWVbMl07XG4gICAgICAgIHJldHVybiBbdjMxLCB2MzIsIHYzMywgdjMyXTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwZXJjZW50KHZhbHVlOiBudW1iZXIpIHtcbiAgICBsZXQgdGVtcCA9IHRoaXMucm91bmRUbyh2YWx1ZSAqIDEwMCwgMyk7XG4gICAgcmV0dXJuIHRlbXA7XG4gIH1cblxuICByb3VuZFRvKHZhbHVlOiBudW1iZXIsIGRlY2ltYWxQb3NpdGlvbnM6IG51bWJlcikge1xuICAgIGxldCBpID0gdmFsdWUgKiBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG5cbiAgICBpID0gTWF0aC5mbG9vcihpKTtcblxuICAgIHJldHVybiBpIC8gTWF0aC5wb3coMTAsIGRlY2ltYWxQb3NpdGlvbnMpO1xuICB9XG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IHRoZSBmb3Jtc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG5cbiAgc2V0Rm9ybXMoKTogdm9pZCB7XG4gICAgbGV0IGZvcm1zOiBBamZGb3JtW10gPSBbXTtcbiAgICB0cnkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmZvcm1zSnNvbi5mb3Jtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3Jtcy5wdXNoKGRlZXBDb3B5KHRoaXMuZm9ybXNKc29uLmZvcm1zW2ldKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydEZvcm1zKGZvcm1zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgdGhlIHdpZHRoIG9mIHRoZSBpZHggY29sdW1uIG9mIGxheW91dCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbFxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgaW5zdGFudENvbHVtblZhbHVlKGNvbDogbnVtYmVyfG51bGwsIGlkeDogbnVtYmVyKSB7XG4gICAgaWYgKGNvbCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLmluc3RhbnRDb2x1bW5WYWx1ZShjb2wsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogIGZvcmNlIGNvcHkgb2Ygc3R5bGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICAvLyBUT0RPIGRlbGV0ZSB0aGlzXG4gIHNldFN0eWxlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzID0gZGVlcENvcHkodGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0V2lkZ2V0U3R5bGVzKGxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5jdXJyZW50Q29sb3IgPSB2YWx1ZTtcbiAgICB0aGlzLnNldFN0eWxlKCk7XG4gIH1cblxuICBzZXRXaWRnZXRNYXJnaW4oaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVXaWRnZXRNYXJnaW5FdnQuZW1pdCh7aWR4LCB2YWx1ZX0pO1xuICB9XG5cbiAgc2V0V2lkZ2V0UGFkZGluZyhpZHg6IG51bWJlciwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVdpZGdldFBhZGRpbmdFdnQuZW1pdCh7aWR4LCB2YWx1ZX0pO1xuICB9XG5cbiAgc2V0V2lkZ2V0Qm9yZGVyV2lkdGgoaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVXaWRnZXRCb3JkZXJXaWR0aEV2dC5lbWl0KHtpZHgsIHZhbHVlfSk7XG4gIH1cblxuICBzZXRXaWRnZXRCb3JkZXJSYWRpdXMoaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVXaWRnZXRCb3JkZXJSYWRpdXNFdnQuZW1pdCh7aWR4LCB2YWx1ZX0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHNlY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldFNlY3Rpb25TdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0U2VjdGlvblN0eWxlcyh0aGlzLm9yaWdpbiwgbGFiZWwsIHZhbHVlKTtcbiAgICB0aGlzLnN0eWxlQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgbmV3IHN0eWxlIHRvIHJlcG9ydFxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0UmVwb3J0U3R5bGVzKGxhYmVsOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldFJlcG9ydFN0eWxlcyhsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgY3VzdG9tIGNvbG9yXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ3VzdG9tQ29sb3IoKSB7XG4gICAgdGhpcy5fc2VydmljZS5hZGRDdXN0b21Db2xvcih0aGlzLmN1cnJlbnRDb2xvcik7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICAvKipcbiAgICogZ2V0IHRoZSBtb2R1bGUgZXhwbG9pdCB0byBxdWlsbCB0ZXh0IGVkaXRvclxuICAgKlxuICAgKiBAcmV0dXJuc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGdldE1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5xdWlsbE1vZHVsZXM7XG4gIH1cblxuICAvKipcbiAgICogdHJ1ZSBpcyB0aGUgaW5wdXQgdHlwZSB2YWx1ZSBpcyBlcXVhbCB0byBjdXJyZW50IHdpZGdldCB0eXBlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJuc1xuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGlzQ2hhcnRUeXBlU2VsZWN0ZWQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmluaXRDaGFydFR5cGUgPT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbXlPYmogPSA8QWpmQ2hhcnRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgIGlmICh2YWx1ZSA9PT0gbXlPYmouY2hhcnRUeXBlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG5cbiAgLyogbGF5b3V0IGZ1bmN0aW9ucyAqL1xuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gYWRkIGEgY29sdW1uIHRvIGN1cnJlbnQgbGF5b3V0IHdpZGdldFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGFkZENvbHVtbigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZENvbHVtbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYSBvYmogdG8gY3VycmVudCBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBpZHhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBmaXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UuZml4ZWRDb2x1bW4oaWR4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gcmVtb3ZlIG9iaiBvZiBjdXJyZW50IGxheW91dCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHVuZml4ZWRDb2x1bW4oaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZSgndW5maXhlZENvbHVtbicsIGlkeCk7XG4gIH1cblxuICAvKiBpbWFnZSBmdW5jdGlvbnMgKi9cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHNldCBpbWFnZSB1cmxcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRJbWFnZVVybCgpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEltYWdlVXJsKHRoaXMuaW1hZ2VVcmwpO1xuICB9XG5cbiAgc2V0SWNvbihpY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfSkge1xuICAgIHRoaXMuX2ljb24gPSBpY29uO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0SWNvbihpY29uKTtcbiAgfVxuXG4gIC8qIGNoYXJ0IGZ1bmN0aW9ucyAqL1xuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IHRoZSB0eXBlIG9mIGNoYXJ0XG4gICAqXG4gICAqIEBwYXJhbSB0eXBlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0Q2hhcnRUeXBlKHR5cGU6IG51bWJlcikge1xuICAgIHRoaXMuaW5pdENoYXJ0VHlwZSA9IHRydWU7XG4gICAgdGhpcy5fc2VydmljZS5zZXRDaGFydFR5cGUodHlwZSk7XG4gIH1cblxuICBzZXRDaGFydEJvcmRlckNvbG9yKHZhbHVlOiBudW1iZXJ8bnVsbCkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Q2hhcnRCb3JkZXJXaWR0aCh2YWx1ZSk7XG4gIH1cblxuICB0YWJWYWx1ZTogc3RyaW5nID0gJ2JhY2tncm91bmRDb2xvcic7XG4gIHNldFRhYihldmVudDogYW55KSB7XG4gICAgaWYgKGV2ZW50LmluZGV4ID09PSAwKSB7XG4gICAgICB0aGlzLnRhYlZhbHVlID0gJ2JhY2tncm91bmRDb2xvcic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGFiVmFsdWUgPSAnYm9yZGVyQ29sb3InO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gcmVtb3ZlIGJhY2tncm91bmQgY29sb3IgdG8gY3VycmVudCBjaGFydFxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICByZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVDaGFydEJhY2tncm91bmRDb2xvcihpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHJlbW92ZSBib3JkZXIgY29sb3IgdG8gY3VycmVudCBjaGFydFxuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICByZW1vdmVDaGFydEJvcmRlckNvbG9yKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnJlbW92ZUNoYXJ0Qm9yZGVyQ29sb3IoaW5kZXgpO1xuICB9XG5cbiAgaGlkZU1lbnUoKSB7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KG51bGwpO1xuICB9XG5cbiAgb3BlbkZvcm11bGFEaWFsb2coZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmUmVwb3J0QnVpbGRlckZvcm1zQW5hbHl6ZXJEaWFsb2cpO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmFnZ3JlZ2F0aW9uID0gQWpmQWdncmVnYXRpb25UeXBlLk5vbmU7XG4gICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuaXNGb3JtdWxhID0gdHJ1ZTtcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCAmJiBldmVudC5yZWZlcmVuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UuZm9ybXVsYSA9IGV2ZW50LmZvcm11bGE7XG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWZlcmVuY2UgPSBldmVudC5yZWZlcmVuY2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXNTdWIgPSB0aGlzLl9zZXJ2aWNlLnJlcG9ydEZvcm1zLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIHRoaXMuZm9ybXMgPSB4IHx8IFtdO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICBpZiAoeCAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgIT09IHgpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSB4O1xuICAgICAgICAgIHRoaXMud2lkZ2V0TmFtZSA9IEFqZldpZGdldFR5cGVbeC53aWRnZXRUeXBlXTtcbiAgICAgICAgICB0aGlzLnJlcG9ydFN0eWxlcyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc2VjdGlvblN0eWxlcyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMud2lkZ2V0U3R5bGVzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zZWN0aW9uQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLndpZGdldENvbG9yID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy52aXNpYmlsaXR5U2VjdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLndpZGdldE5hbWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9jb2xvclN1YiA9IHRoaXMuX3NlcnZpY2UuY29sb3JzLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgIGlmICh4ICYmIHgubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNvbG9ycyA9IHg7XG5cbiAgICAgICAgdGhpcy5xdWlsbE1vZHVsZXMgPSB7XG4gICAgICAgICAgdG9vbGJhcjogW1xuICAgICAgICAgICAgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sICAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgICAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG4gICAgICAgICAgICBbeydoZWFkZXInOiAxfSwgeydoZWFkZXInOiAyfV0sICAvLyBjdXN0b20gYnV0dG9uIHZhbHVlc1xuICAgICAgICAgICAgW3snbGlzdCc6ICdvcmRlcmVkJ30sIHsnbGlzdCc6ICdidWxsZXQnfV0sXG4gICAgICAgICAgICBbeydzY3JpcHQnOiAnc3ViJ30sIHsnc2NyaXB0JzogJ3N1cGVyJ31dLCAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAgICAgICAvLyBbeyAnaW5kZW50JzogJy0xJ30sIHsgJ2luZGVudCc6ICcrMScgfV0sICAgICAgICAgIC8vIG91dGRlbnQvaW5kZW50XG4gICAgICAgICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgICAgICAgIFt7J3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ119XSwgIC8vIGN1c3RvbSBkcm9wZG93blxuICAgICAgICAgICAgW3snaGVhZGVyJzogWzEsIDIsIDMsIDQsIDUsIDYsIGZhbHNlXX1dLFxuXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIHsnY29sb3InOiB0aGlzLmNvbG9yc30sIHsnYmFja2dyb3VuZCc6IHRoaXMuY29sb3JzfVxuICAgICAgICAgICAgXSwgIC8vIGRyb3Bkb3duIHdpdGggZGVmYXVsdHMgZnJvbSB0aGVtZVxuICAgICAgICAgICAgW3snZm9udCc6IHRoaXMuZm9udHN9XSwgW3snYWxpZ24nOiB0aGlzLmFsaWdufV0sIFsnZm9ybXVsYSddLFxuICAgICAgICAgICAgWydjbGVhbiddLCAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgICAgICAgIC8vIFsnbGluaycsICdjbGFzcycsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgdGhpcy5nZXRIVE1MID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgod2lkZ2V0OiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmICh3aWRnZXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgbXlPYmogPSA8QWpmVGV4dFdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmouaHRtbFRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aCgnPHA+PGJyPjwvcD4nKSk7XG5cblxuICAgIHRoaXMuZ2V0SGVpZ2h0V2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIGZpbHRlcih4ID0+IHggIT0gbnVsbCksIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudG9OdW1iZXIobXlPYmouc3R5bGVzWydoZWlnaHQnXSk7XG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCB8fCB2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRGb250U2l6ZVdpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMudG9OdW1iZXIobXlPYmouc3R5bGVzWydmb250LXNpemUnXSkgfHwgMTIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldEZvbnRBbGlnbldpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gKChteU9iai5zdHlsZXNbJ3RleHQtYWxpZ24nXSkgfHwgJ2NlbnRlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxQeE51bWJlckFycmF5KHRoaXMudG9OdW1iZXJBcnJheShteU9iai5zdHlsZXNbJ2JvcmRlci13aWR0aCddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoWzAsIDAsIDAsIDBdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldFRvcCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVswXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXRSaWdodCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsxXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXRCb3R0b20gPVxuICAgICAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMl0pKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0TGVmdCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVszXSkpO1xuXG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFB4TnVtYmVyQXJyYXkodGhpcy50b051bWJlckFycmF5KG15T2JqLnN0eWxlc1snYm9yZGVyLXJhZGl1cyddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoWzAsIDAsIDAsIDBdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXRUb3BMZWZ0ID1cbiAgICAgICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVswXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0VG9wUmlnaHQgPVxuICAgICAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzFdKSk7XG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXRCb3R0b21SaWdodCA9XG4gICAgICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMl0pKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldEJvdHRvbUxlZnQgPVxuICAgICAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzNdKSk7XG5cbiAgICB0aGlzLmdldE1hcmdpbldpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsICYmIG15T2JqLnN0eWxlcyAhPSBudWxsICYmIG15T2JqLnN0eWxlc1snbWFyZ2luJ10gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFB4TnVtYmVyQXJyYXkodGhpcy50b051bWJlckFycmF5KG15T2JqLnN0eWxlc1snbWFyZ2luJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksIHN0YXJ0V2l0aChbMCwgMCwgMCwgMF0pKTtcbiAgICB0aGlzLmdldE1hcmdpbldpZGdldFRvcCA9IHRoaXMuZ2V0TWFyZ2luV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMF0pKTtcbiAgICB0aGlzLmdldE1hcmdpbldpZGdldFJpZ2h0ID0gdGhpcy5nZXRNYXJnaW5XaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsxXSkpO1xuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0Qm90dG9tID0gdGhpcy5nZXRNYXJnaW5XaWRnZXQucGlwZShmaWx0ZXIobSA9PiBtICE9IG51bGwpLCBtYXAobSA9PiBtIVsyXSkpO1xuICAgIHRoaXMuZ2V0TWFyZ2luV2lkZ2V0TGVmdCA9IHRoaXMuZ2V0TWFyZ2luV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbM10pKTtcblxuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsICYmIG15T2JqLnN0eWxlcyAhPSBudWxsICYmIG15T2JqLnN0eWxlc1sncGFkZGluZyddICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxQeE51bWJlckFycmF5KHRoaXMudG9OdW1iZXJBcnJheShteU9iai5zdHlsZXNbJ3BhZGRpbmcnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0VG9wID0gdGhpcy5nZXRQYWRkaW5nV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMF0pKTtcbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXRSaWdodCA9XG4gICAgICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKGZpbHRlcihtID0+IG0gIT0gbnVsbCksIG1hcChtID0+IG0hWzFdKSk7XG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0Qm90dG9tID1cbiAgICAgICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbMl0pKTtcbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXRMZWZ0ID0gdGhpcy5nZXRQYWRkaW5nV2lkZ2V0LnBpcGUoZmlsdGVyKG0gPT4gbSAhPSBudWxsKSwgbWFwKG0gPT4gbSFbM10pKTtcblxuICAgIHRoaXMuZ2V0QmFja2dyb3VuZENvbG9yV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwgJiYgbXlPYmouc3R5bGVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBteU9iai5zdHlsZXNbJ2JhY2tncm91bmRDb2xvciddIHx8ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRDb2xvcldpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsICYmIG15T2JqLnN0eWxlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmouc3R5bGVzWydjb2xvciddIHx8ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMgPVxuICAgICAgICAoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0TWFyZ2luRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5nZXRNYXJnaW5XaWRnZXQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3tpZHg6IG51bWJlciwgdmFsdWU6IGFueX0sIG51bWJlcltdfHVuZGVmaW5lZF0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBpZHggPSByWzBdLmlkeDtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgICAgICBjb25zdCB2ID0gclsxXSB8fCBbMCwgMCwgMCwgMF07XG4gICAgICAgICAgICAgIGlmICh2ID09IG51bGwgfHwgdi5sZW5ndGggPCBpZHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdltpZHhdID0gdmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKCdtYXJnaW4nLCB2KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMuYWRkKFxuICAgICAgICAoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0UGFkZGluZ0V2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuZ2V0UGFkZGluZ1dpZGdldCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbe2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fSwgbnVtYmVyW118dW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJbMF0udmFsdWU7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ3BhZGRpbmcnLCB2KTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzLmFkZChcbiAgICAgICAgKDxPYnNlcnZhYmxlPHtpZHg6IGFueTsgdmFsdWU6IGFueX0+PnRoaXMuX3VwZGF0ZVdpZGdldEJvcmRlcldpZHRoRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbe2lkeDogbnVtYmVyLCB2YWx1ZTogYW55fSwgbnVtYmVyW118dW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAociA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHJbMF0uaWR4O1xuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHJbMF0udmFsdWU7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgICAgICAgaWYgKHYgPT0gbnVsbCB8fCB2Lmxlbmd0aCA8IGlkeCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ2JvcmRlci13aWR0aCcsIHYpO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMuYWRkKFxuICAgICAgICAoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyUmFkaXVzRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3tpZHg6IG51bWJlciwgdmFsdWU6IGFueX0sIG51bWJlcltdfHVuZGVmaW5lZF0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKHIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBpZHggPSByWzBdLmlkeDtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgICAgICBjb25zdCB2ID0gclsxXSB8fCBbMCwgMCwgMCwgMF07XG4gICAgICAgICAgICAgIGlmICh2ID09IG51bGwgfHwgdi5sZW5ndGggPCBpZHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdltpZHhdID0gdmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKCdib3JkZXItcmFkaXVzJywgdik7XG4gICAgICAgICAgICB9KSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQgPSBjaGFuZ2VzLndpZGdldC5jdXJyZW50VmFsdWU7XG4gICAgaWYgKHRoaXMuY3VycmVudFdpZGdldCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMud2lkZ2V0TmFtZSA9IEFqZldpZGdldFR5cGVbdGhpcy5jdXJyZW50V2lkZ2V0LndpZGdldFR5cGVdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm1zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY29sb3JTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb290ZXJTdHlsZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmlnaW5TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vicy51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=