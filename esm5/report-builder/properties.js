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
        get: function () { return this._icon; },
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
            return (value || '').replace('px', '').split(' ')
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
        catch (e) { }
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
        this._formsSub = this._service.reportForms
            .subscribe(function (x) {
            _this.forms = x || [];
        });
        this._currentWidgetSub = this._service.currentWidget
            .subscribe(function (x) {
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
        this._colorSub = this._service.colors
            .subscribe(function (x) {
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
                        [{ 'color': _this.colors },
                            { 'background': _this.colors }],
                        [{ 'font': _this.fonts }],
                        [{ 'align': _this.align }],
                        ['formula'],
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
        this.getBorderWidthWidgetTop = this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[0]; }));
        this.getBorderWidthWidgetRight = this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getBorderWidthWidgetBottom = this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
        this.getBorderWidthWidgetLeft = this.getBorderWidthWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[3]; }));
        this.getBorderRadiusWidget = this._service.currentWidget.pipe(map(function (myObj) {
            if (myObj != null) {
                return _this.fillPxNumberArray(_this.toNumberArray(myObj.styles['border-radius']));
            }
            return undefined;
        }), distinctUntilChanged(), startWith([0, 0, 0, 0]));
        this.getBorderRadiusWidgetTopLeft = this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[0]; }));
        this.getBorderRadiusWidgetTopRight = this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getBorderRadiusWidgetBottomRight = this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
        this.getBorderRadiusWidgetBottomLeft = this.getBorderRadiusWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[3]; }));
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
        this.getPaddingWidgetRight = this.getPaddingWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[1]; }));
        this.getPaddingWidgetBottom = this.getPaddingWidget.pipe(filter(function (m) { return m != null; }), map(function (m) { return m[2]; }));
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
        this._stylesUpdatesSubs = this._updateWidgetMarginEvt
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
        this._stylesUpdatesSubs
            .add(this._updateWidgetBorderWidthEvt
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9wcm9wZXJ0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFDTCxrQkFBa0IsRUFBNkQsYUFBYSxFQUM3RixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBZ0MsaUJBQWlCLEVBQ2xHLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RixPQUFPLEVBQUMsbUNBQW1DLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTtJQXdmRSxvQ0FDVSxPQUFrQixFQUNsQixRQUFpQztRQUYzQyxpQkE0QkM7UUEzQlMsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQWxmM0M7Ozs7V0FJRztRQUNILGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBRXRCOzs7O1dBSUc7UUFDSCxrQkFBYSxHQUFtQixJQUFJLENBQUM7UUFRckM7Ozs7V0FJRztRQUNILFVBQUssR0FBYyxFQUFFLENBQUM7UUFHdEIsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQVN0Qjs7V0FFRztRQUVILGNBQVMsR0FB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QUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDOztnQkF0bkNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QywraCtCQUE4QjtvQkFFOUIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBZE8sU0FBUztnQkFNVCx1QkFBdUI7O0lBMG5DL0IsaUNBQUM7Q0FBQSxBQXhuQ0QsSUF3bkNDO1NBam5DWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWpmQWdncmVnYXRpb25UeXBlLCBBamZDaGFydFdpZGdldCwgQWpmTGF5b3V0V2lkZ2V0LCBBamZUZXh0V2lkZ2V0LCBBamZXaWRnZXQsIEFqZldpZGdldFR5cGVcbn0gZnJvbSAnQGFqZi9jb3JlL3JlcG9ydHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZ30gZnJvbSAnLi9mb3Jtcy1hbmFseXplci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtVmFyaWFibGVzfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcmVwb3J0LWJ1aWxkZXItcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAncHJvcGVydGllcy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3Byb3BlcnRpZXMuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiAgdHJ1ZSB3aGVuIHRoZSBmaXJzdCB0aW1lIGNoYXJ0IHR5cGUgaXMgc2V0dGVkXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgaW5pdENoYXJ0VHlwZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiB0aGUgY3VycmVudCB3aWRnZXRcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBjdXJyZW50V2lkZ2V0OiBBamZXaWRnZXR8bnVsbCA9IG51bGw7XG4gIGdldCBjdXJyZW50TGF5b3V0V2lkZ2V0KCk6IEFqZkxheW91dFdpZGdldCB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFdpZGdldCBhcyBBamZMYXlvdXRXaWRnZXQ7XG4gIH1cbiAgZ2V0IGN1cnJlbnRUZXh0V2lkZ2V0KCk6IEFqZlRleHRXaWRnZXQge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRXaWRnZXQgYXMgQWpmVGV4dFdpZGdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIGFycmF5IGNvbnRhaW5zIHRoZSBmb3JtcyBleHBsb2l0ZWQgZm9yIGdlbmVyYXRlIGRhdGEgbGFiZWxzXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuXG5cbiAgY29sb3JzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiB0aGUgbmFtZSBvZiB0aGUgc2VjdGlvbiB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50V2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgb3JpZ2luOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZBS0UgREFUQVxuICAgKi9cblxuICBmb3Jtc0pzb246IGFueSA9IHtmb3JtczogW119O1xuXG4gIC8qKlxuICAgKiBXSURHRVRcbiAgICovXG5cbiAgd2lkZ2V0TmFtZSA9ICcnO1xuICBnZXRIVE1MOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD47XG4gIGdldEhlaWdodFdpZGdldDogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+O1xuICBnZXRGb250U2l6ZVdpZGdldDogT2JzZXJ2YWJsZTxudW1iZXIgfCB1bmRlZmluZWQ+O1xuICBnZXRGb250QWxpZ25XaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyIHwgdW5kZWZpbmVkPjtcbiAgZ2V0QmFja2dyb3VuZENvbG9yV2lkZ2V0OiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIGdldENvbG9yV2lkZ2V0OiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIGdldFN0eWxlOiBPYnNlcnZhYmxlPGFueT47XG4gIGdldENoYXJ0QmFja2dyb3VuZENvbG9yOiBPYnNlcnZhYmxlPHN0cmluZ1tdPjtcbiAgZ2V0Q2hhcnRCb3JkZXJDb2xvcjogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIGdldFZpc2liaWxpdHk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uPjtcbiAgZ2V0Q29sb3I6IE9ic2VydmFibGU8U3RyaW5nW10+O1xuXG4gIG1hcmdpbkV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldE1hcmdpbldpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXSB8IHVuZGVmaW5lZD47XG4gIGdldE1hcmdpbldpZGdldFRvcDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRNYXJnaW5XaWRnZXRSaWdodDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRNYXJnaW5XaWRnZXRCb3R0b206IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0TWFyZ2luV2lkZ2V0TGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHBhZGRpbmdFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXRQYWRkaW5nV2lkZ2V0OiBPYnNlcnZhYmxlPG51bWJlcltdIHwgdW5kZWZpbmVkPjtcbiAgZ2V0UGFkZGluZ1dpZGdldFRvcDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRQYWRkaW5nV2lkZ2V0UmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0UGFkZGluZ1dpZGdldEJvdHRvbTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRQYWRkaW5nV2lkZ2V0TGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGJvcmRlcldpZHRoRXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0Qm9yZGVyV2lkdGhXaWRnZXQ6IE9ic2VydmFibGU8bnVtYmVyW10gfCB1bmRlZmluZWQ+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldFRvcDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBnZXRCb3JkZXJXaWR0aFdpZGdldFJpZ2h0OiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0Qm90dG9tOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIGdldEJvcmRlcldpZHRoV2lkZ2V0TGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGJvcmRlclJhZGl1c0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldDogT2JzZXJ2YWJsZTxudW1iZXJbXSB8IHVuZGVmaW5lZD47XG4gIGdldEJvcmRlclJhZGl1c1dpZGdldFRvcExlZnQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0VG9wUmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tUmlnaHQ6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tTGVmdDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGJhY2tncm91bmRDb2xvciA9ICcjMTI3YmRjJztcbiAgc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwyNTUsMjU1LDApJztcbiAgYm9yZGVyQ29sb3IgPSAnIzEyN2JkYyc7XG4gIHN0eWxlQ29sb3IgPSAncmdiKDAsMCwwLDApJztcbiAgd2JhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBmb250U2l6ZTogc3RyaW5nO1xuICBidWJibGU6IHN0cmluZztcblxuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZSZXBvcnRCdWlsZGVyRm9ybXNBbmFseXplckRpYWxvZz47XG4gIGNvbnRhaW5lcjogQWpmRm9ybVZhcmlhYmxlcztcblxuXG5cbiAgYWxpZ24gPSBbZmFsc2UsICdjZW50ZXInLCAncmlnaHQnLCAnanVzdGlmeSddO1xuXG4gIGZvbnRzID0gW1xuICAgIGZhbHNlLFxuICAgICdibGFja3InLFxuICAgICdibGFjay1pdGFsaWMnLFxuICAgICdib2xkJyxcbiAgICAnYm9sZC1jb25kZW5zZWQnLFxuICAgICdib2xkLWNvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdib2xkLWl0YWxpYycsXG4gICAgJ2NvbmRlbnNlZCcsXG4gICAgJ2NvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdpdGFsaWMnLFxuICAgICdsaWdodCcsXG4gICAgJ2xpZ2h0LWl0YWxpYycsXG4gICAgJ21lZGl1bScsXG4gICAgJ21lZGl1bS1pdGFsaWMnLFxuICAgICd0aGlucicsXG4gICAgJ3RoaW4taXRhbGljJ1xuICBdO1xuICBjdXJyZW50TW9kdWxlOiBhbnkgPSB7fTtcbiAgcXVpbGxNb2R1bGVzID0ge1xuICAgIHRvb2xiYXI6IFtcbiAgICAgIFsnZm9ybXVsYSddLFxuICAgICAgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sICAgICAgICAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG5cbiAgICAgIFt7ICdoZWFkZXInOiAxIH0sIHsgJ2hlYWRlcic6IDIgfV0sICAgICAgICAgICAgICAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgIFt7ICdsaXN0JzogJ29yZGVyZWQnIH0sIHsgJ2xpc3QnOiAnYnVsbGV0JyB9XSxcbiAgICAgIFt7ICdzY3JpcHQnOiAnc3ViJyB9LCB7ICdzY3JpcHQnOiAnc3VwZXInIH1dLCAgICAgIC8vIHN1cGVyc2NyaXB0L3N1YnNjcmlwdFxuICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgLy8gW3sgJ2RpcmVjdGlvbic6ICdydGwnIH1dLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuXG4gICAgICBbeyAnc2l6ZSc6IFsnc21hbGwnLCBmYWxzZSwgJ2xhcmdlJywgJ2h1Z2UnXSB9XSwgIC8vIGN1c3RvbSBkcm9wZG93blxuICAgICAgW3sgJ2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV0gfV0sXG5cbiAgICAgIFt7ICdjb2xvcic6IHRoaXMuY29sb3JzIH0sXG4gICAgICB7ICdiYWNrZ3JvdW5kJzogdGhpcy5jb2xvcnMgfV0sICAgICAgICAgIC8vIGRyb3Bkb3duIHdpdGggZGVmYXVsdHMgZnJvbSB0aGVtZVxuICAgICAgW3sgJ2ZvbnQnOiB0aGlzLmZvbnRzIH1dLFxuICAgICAgW3sgJ2FsaWduJzogdGhpcy5hbGlnbiB9XSxcblxuICAgICAgWydjbGVhbiddLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgIC8vIFsnbGluaycsICdjbGFzcycsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgIF1cbiAgfTtcblxuICAvKipcbiAgICogQ0hBUlRcbiAgICovXG5cblxuICBnZXRDaGFydFlMYWJlbHM6IE9ic2VydmFibGU8c3RyaW5nW10+O1xuXG4gIGNoYXJ0Qm9yZGVyQ29sb3I6IHN0cmluZ1tdID0gW107XG4gIGNoYXJ0Qm9yZGVyV2lkdGggPSAzO1xuXG4gIC8qKlxuICAgKlxuICAgKiBJTUFHRVxuICAgKi9cblxuICBpbWFnZVVybCA9ICdodHRwczovL2FuZ3VsYXIuaW8vcmVzb3VyY2VzL2ltYWdlcy9sb2dvcy9hbmd1bGFyMi9hbmd1bGFyLnBuZyc7XG5cbiAgLyoqXG4gICAqXG4gICAqIFRFWFRcbiAgICovXG5cbiAgaHRtbFRleHQgPSAnJztcblxuXG4gIC8qKlxuICAgKiB0aGVzZSB2YXJpYWJsZXMgaW5kaWNhdGUgdGhhdCB0aGUgdXNlciB3YW50IHRvIGNoYW5nZSBzZWN0aW9uXG4gICAqL1xuICByZXBvcnRTdHlsZXMgPSBmYWxzZTtcbiAgc2VjdGlvblN0eWxlcyA9IGZhbHNlO1xuICB3aWRnZXRTdHlsZXMgPSB0cnVlO1xuICBzZWN0aW9uQ29sb3IgPSBmYWxzZTtcbiAgd2lkZ2V0Q29sb3IgPSBmYWxzZTtcbiAgdmlzaWJpbGl0eVNlY3Rpb24gPSBmYWxzZTtcbiAgY3VycmVudENvbG9yID0gJyc7XG5cbiAgcHJpdmF0ZSBfaWNvbjogeyBmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBnZXQgaWNvbigpOiB7IGZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZyB9IHwgbnVsbCB7IHJldHVybiB0aGlzLl9pY29uOyB9XG5cbiAgaWNvblNldDogYW55ID0ge1xuICAgICdpY29uJzogJ3RydWUnLFxuICAgICd0aXRsZSc6ICdyZXBvcnQnLFxuICAgICdkYXRhJzogbnVsbFxuICB9O1xuXG4gIGZsYWdTZXQ6IGFueSA9IHtcbiAgICAnaWNvbic6ICdmYWxzZScsXG4gICAgJ2NsYXNzJzogWydmbGFnLWljb24nXSxcbiAgICAncHJlZml4Q2xhc3MnOiAnZmxhZy1pY29uLScsXG4gICAgJ3RpdGxlJzogJ2ZsYWdzJyxcbiAgICAnZGF0YSc6IFtcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2R6JyxcbiAgICAgICAgJ2luZm8nOiAnQWxnZXJpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdhbycsXG4gICAgICAgICdpbmZvJzogJ0FuZ29sYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdiaicsXG4gICAgICAgICdpbmZvJzogJ0JlbmluJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2J3JyxcbiAgICAgICAgJ2luZm8nOiAnQm90c3dhbmEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnYmYnLFxuICAgICAgICAnaW5mbyc6ICdCdXJraW5hIEZhc28nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnYmknLFxuICAgICAgICAnaW5mbyc6ICdCdXJ1bmRpJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2NtJyxcbiAgICAgICAgJ2luZm8nOiAnQ2FtZXJvb24nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnY3YnLFxuICAgICAgICAnaW5mbyc6ICdDYWJvIFZlcmRlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2NmJyxcbiAgICAgICAgJ2luZm8nOiAnVGhlIENlbnRyYWwgQWZyaWNhbiBSZXB1YmxpYydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd0ZCcsXG4gICAgICAgICdpbmZvJzogJ0NoYWQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAna20nLFxuICAgICAgICAnaW5mbyc6ICdUaGUgQ29tb3JvcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdjaScsXG4gICAgICAgICdpbmZvJzogJ0NvdGUgRFxcJ2F2b2lyZSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdjZCcsXG4gICAgICAgICdpbmZvJzogJ1RoZSBEZW1vY3JhdGljIFJlcHVibGljIG9mIENvbmdvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2RqJyxcbiAgICAgICAgJ2luZm8nOiAnRGlqaWJvdXRpJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2VnJyxcbiAgICAgICAgJ2luZm8nOiAnRWd5cHQnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnZ3EnLFxuICAgICAgICAnaW5mbyc6ICdFcXVhdG9yaWFsIEd1aW5lYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdlcicsXG4gICAgICAgICdpbmZvJzogJ0VyaXRyZWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnZXQnLFxuICAgICAgICAnaW5mbyc6ICdFdGhpb3BpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd0ZicsXG4gICAgICAgICdpbmZvJzogJ0ZyZW5jaCBTb3V0aGVybiBUZXJyaXRvcmllcydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdnYScsXG4gICAgICAgICdpbmZvJzogJ0dhYm9uJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2dtJyxcbiAgICAgICAgJ2luZm8nOiAnVGhlIEdhbWJpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdnaCcsXG4gICAgICAgICdpbmZvJzogJ0doYW5hJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2duJyxcbiAgICAgICAgJ2luZm8nOiAnR3VpbmVhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2d3JyxcbiAgICAgICAgJ2luZm8nOiAnR3VpbmVhLUJpc3NhdSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdrZScsXG4gICAgICAgICdpbmZvJzogJ0tlbnlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2xzJyxcbiAgICAgICAgJ2luZm8nOiAnTGVzaG90aG8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbHInLFxuICAgICAgICAnaW5mbyc6ICdMaWJlcmlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2x5JyxcbiAgICAgICAgJ2luZm8nOiAnTGlieWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbWcnLFxuICAgICAgICAnaW5mbyc6ICdNYWRhZ2FzY2FyJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ213JyxcbiAgICAgICAgJ2luZm8nOiAnTWFsYXd5J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ21sJyxcbiAgICAgICAgJ2luZm8nOiAnTWFsaSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdtcicsXG4gICAgICAgICdpbmZvJzogJ01hdXJpdGFuaWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbXUnLFxuICAgICAgICAnaW5mbyc6ICdNYXVyaXRpdXMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAneXQnLFxuICAgICAgICAnaW5mbyc6ICdNYXlvdHRlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ21hJyxcbiAgICAgICAgJ2luZm8nOiAnTWFyb2NjbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdteicsXG4gICAgICAgICdpbmZvJzogJ01vemFtYmlxdWUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbmEnLFxuICAgICAgICAnaW5mbyc6ICdOYW1pYmlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ25lJyxcbiAgICAgICAgJ2luZm8nOiAnTmlnZXInXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnbmcnLFxuICAgICAgICAnaW5mbyc6ICdOaWdlcmlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2NnJyxcbiAgICAgICAgJ2luZm8nOiAnUmVwdWJsaWMgb2YgdGhlIENvbmdvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3J3JyxcbiAgICAgICAgJ2luZm8nOiAnUnduZGEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAncmUnLFxuICAgICAgICAnaW5mbyc6ICdyw6h1bmlvbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdzaCcsXG4gICAgICAgICdpbmZvJzogJ1NhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3N0JyxcbiAgICAgICAgJ2luZm8nOiAnU2FvIFRvbWUgYW5kIFByaW5jaXBlJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NuJyxcbiAgICAgICAgJ2luZm8nOiAnU2VuZWdhbCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdzYycsXG4gICAgICAgICdpbmZvJzogJ1NleWNoZWxsZXMnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnc2wnLFxuICAgICAgICAnaW5mbyc6ICdTaWVycmEgTGVvbmUnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnc28nLFxuICAgICAgICAnaW5mbyc6ICdTb21hbGlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3phJyxcbiAgICAgICAgJ2luZm8nOiAnU291dGggQWZyaWNhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3NzJyxcbiAgICAgICAgJ2luZm8nOiAnU291dGggU3VkYW4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnc2QnLFxuICAgICAgICAnaW5mbyc6ICdTdWRhbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdzeicsXG4gICAgICAgICdpbmZvJzogJ1N3YXppbGFuZCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd0eicsXG4gICAgICAgICdpbmZvJzogJ1RhbnphbmlhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3RnJyxcbiAgICAgICAgJ2luZm8nOiAnVG9nbydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd0bicsXG4gICAgICAgICdpbmZvJzogJ1R1bmlzaWEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAndWcnLFxuICAgICAgICAnaW5mbyc6ICdVZ2FuZGEnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnZWgnLFxuICAgICAgICAnaW5mbyc6ICdXZXN0ZXJuIFNhaGFyYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd6bScsXG4gICAgICAgICdpbmZvJzogJ1phbWJpYSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd6dycsXG4gICAgICAgICdpbmZvJzogJ1ppbWJhd2UnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnaXEnLFxuICAgICAgICAnaW5mbyc6ICdJcmFxJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2xiJyxcbiAgICAgICAgJ2luZm8nOiAnTGViYW5vbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdiZCcsXG4gICAgICAgICdpbmZvJzogJ0JhbmdsYWRlc2gnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAnaXInLFxuICAgICAgICAnaW5mbyc6ICdJcmFuIChJc2xhbWljIFJlcHVibGljIG9mKSdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICdteScsXG4gICAgICAgICdpbmZvJzogJ01hbGF5c2lhJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ25wJyxcbiAgICAgICAgJ2luZm8nOiAnTmVwYWwnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnY2xhc3MnOiAncGsnLFxuICAgICAgICAnaW5mbyc6ICdQYWtpc3RhbidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdjbGFzcyc6ICd0aCcsXG4gICAgICAgICdpbmZvJzogJ1RoYWlsYW5kJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ2pvJyxcbiAgICAgICAgJ2luZm8nOiAnSm9yZGFuJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2NsYXNzJzogJ3llJyxcbiAgICAgICAgJ2luZm8nOiAnWWVtZW4nXG4gICAgICB9XG4gICAgXVxuICB9O1xuXG4gIHByaXZhdGUgX2N1cnJlbnRXaWRnZXRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29sb3JTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaGVhZGVyU3R5bGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29udGVudFN0eWxlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb290ZXJTdHlsZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfb3JpZ2luU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3N0eWxlc1VwZGF0ZXNTdWJzOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0TWFyZ2luRXZ0OiBFdmVudEVtaXR0ZXI8eyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9PiA9XG4gIG5ldyBFdmVudEVtaXR0ZXI8eyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9PigpO1xuICBwcml2YXRlIF91cGRhdGVXaWRnZXRQYWRkaW5nRXZ0OiBFdmVudEVtaXR0ZXI8eyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9PiA9XG4gIG5ldyBFdmVudEVtaXR0ZXI8eyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9PigpO1xuICBwcml2YXRlIF91cGRhdGVXaWRnZXRCb3JkZXJXaWR0aEV2dDogRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4gPVxuICBuZXcgRXZlbnRFbWl0dGVyPHsgaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkgfT4oKTtcbiAgcHJpdmF0ZSBfdXBkYXRlV2lkZ2V0Qm9yZGVyUmFkaXVzRXZ0OiBFdmVudEVtaXR0ZXI8eyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9PiA9XG4gIG5ldyBFdmVudEVtaXR0ZXI8eyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc2V0Rm9ybXMoKTtcblxuICAgIHRoaXMuaWNvblNldC5kYXRhID0gT2JqZWN0LmtleXMoX3NlcnZpY2UuaWNvblNldHMpLmZpbHRlcih4ID0+IHggIT0gJ2FqZi1pY29uJykubWFwKGkgPT4ge1xuICAgICAgcmV0dXJuIHsgbmFtZTogaSwgaWNvbnM6IF9zZXJ2aWNlLmljb25TZXRzW2ldIH07XG4gICAgfSk7XG5cbiAgICB0aGlzLl9oZWFkZXJTdHlsZVN1YiA9IHRoaXMuX3NlcnZpY2UuaGVhZGVyU3R5bGVzLnN1YnNjcmliZShzID0+IHtcbiAgICAgIGlmIChzWydiYWNrZ3JvdW5kLWNvbG9yJ10gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0eWxlQmFja2dyb3VuZENvbG9yID0gc1snYmFja2dyb3VuZC1jb2xvciddO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRlbnRTdHlsZXNTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbnRlbnRTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViID0gdGhpcy5fc2VydmljZS5mb290ZXJTdHlsZXMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHNbJ2JhY2tncm91bmQtY29sb3InXSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3R5bGVCYWNrZ3JvdW5kQ29sb3IgPSBzWydiYWNrZ3JvdW5kLWNvbG9yJ107XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fb3JpZ2luU3ViID0gdGhpcy5fc2VydmljZS5vcmlnaW4uc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgdGhpcy5vcmlnaW4gPSBzO1xuICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICpcbiAgICogVVRJTFNcbiAgICovXG5cblxuICAvKipcbiAgICogcmV0dXJuIGEgbnVtYmVyIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHRvTnVtYmVyKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGxldCBudW1iZXJQYXR0ZXJuID0gL14oLSk/XFxkKy9nO1xuXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXRjaGVzID0gdmFsdWUubWF0Y2gobnVtYmVyUGF0dGVybik7XG4gICAgICBpZiAobWF0Y2hlcyA9PSBudWxsIHx8IG1hdGNoZXMubGVuZ3RoID09IDApIHsgcmV0dXJuIDA7IH1cbiAgICAgIHJldHVybiBOdW1iZXIobWF0Y2hlc1swXSk7XG4gICAgfVxuICB9XG5cbiAgdG9OdW1iZXJBcnJheSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyW10ge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodmFsdWUgfHwgJycpLnJlcGxhY2UoJ3B4JywgJycpLnNwbGl0KCcgJylcbiAgICAgICAgLmZpbHRlcih2ID0+IHYgIT09ICcnICYmIHYgIT0gbnVsbClcbiAgICAgICAgLm1hcCh2ID0+IHRoaXMudG9OdW1iZXIodikpO1xuICAgIH1cbiAgfVxuXG4gIGZpbGxQeE51bWJlckFycmF5KHZhbHVlOiBudW1iZXJbXSkge1xuICAgIGNvbnN0IHZsID0gdmFsdWUubGVuZ3RoO1xuICAgIHN3aXRjaCAodmwpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFswLCAwLCAwLCAwXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgY29uc3QgdiA9IHZhbHVlWzBdO1xuICAgICAgICByZXR1cm4gW3YsIHYsIHYsIHZdO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBjb25zdCB2MjEgPSB2YWx1ZVswXTtcbiAgICAgICAgY29uc3QgdjIyID0gdmFsdWVbMV07XG4gICAgICAgIHJldHVybiBbdjIxLCB2MjIsIHYyMSwgdjIyXTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgY29uc3QgdjMxID0gdmFsdWVbMF07XG4gICAgICAgIGNvbnN0IHYzMiA9IHZhbHVlWzFdO1xuICAgICAgICBjb25zdCB2MzMgPSB2YWx1ZVsyXTtcbiAgICAgICAgcmV0dXJuIFt2MzEsIHYzMiwgdjMzLCB2MzJdO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHBlcmNlbnQodmFsdWU6IG51bWJlcikge1xuICAgIGxldCB0ZW1wID0gdGhpcy5yb3VuZFRvKHZhbHVlICogMTAwLCAzKTtcbiAgICByZXR1cm4gdGVtcDtcbiAgfVxuXG4gIHJvdW5kVG8odmFsdWU6IG51bWJlciwgZGVjaW1hbFBvc2l0aW9uczogbnVtYmVyKSB7XG4gICAgbGV0IGkgPSB2YWx1ZSAqIE1hdGgucG93KDEwLCBkZWNpbWFsUG9zaXRpb25zKTtcblxuICAgIGkgPSBNYXRoLmZsb29yKGkpO1xuXG4gICAgcmV0dXJuIGkgLyBNYXRoLnBvdygxMCwgZGVjaW1hbFBvc2l0aW9ucyk7XG4gIH1cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgdGhlIGZvcm1zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cblxuICBzZXRGb3JtcygpOiB2b2lkIHtcbiAgICBsZXQgZm9ybXM6IEFqZkZvcm1bXSA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZm9ybXNKc29uLmZvcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvcm1zLnB1c2goZGVlcENvcHkodGhpcy5mb3Jtc0pzb24uZm9ybXNbaV0pKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0Rm9ybXMoZm9ybXMpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBzZXQgdGhlIHdpZHRoIG9mIHRoZSBpZHggY29sdW1uIG9mIGxheW91dCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbFxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgaW5zdGFudENvbHVtblZhbHVlKGNvbDogbnVtYmVyfG51bGwsIGlkeDogbnVtYmVyKSB7XG4gICAgaWYgKGNvbCA9PT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLmluc3RhbnRDb2x1bW5WYWx1ZShjb2wsIGlkeCk7XG4gIH1cblxuICAvKipcbiAgICogIGZvcmNlIGNvcHkgb2Ygc3R5bGVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICAvLyBUT0RPIGRlbGV0ZSB0aGlzXG4gIHNldFN0eWxlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRXaWRnZXQuc3R5bGVzID0gZGVlcENvcHkodGhpcy5jdXJyZW50V2lkZ2V0LnN0eWxlcyk7XG4gICAgdGhpcy5fc2VydmljZS51cGRhdGVDdXJyZW50V2lkZ2V0KHRoaXMuY3VycmVudFdpZGdldCk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gd2lkZ2V0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRXaWRnZXRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0V2lkZ2V0U3R5bGVzKGxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5jdXJyZW50Q29sb3IgPSB2YWx1ZTtcbiAgICB0aGlzLnNldFN0eWxlKCk7XG4gIH1cblxuICBzZXRXaWRnZXRNYXJnaW4oaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVXaWRnZXRNYXJnaW5FdnQuZW1pdCh7IGlkeCwgdmFsdWUgfSk7XG4gIH1cblxuICBzZXRXaWRnZXRQYWRkaW5nKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0UGFkZGluZ0V2dC5lbWl0KHsgaWR4LCB2YWx1ZSB9KTtcbiAgfVxuXG4gIHNldFdpZGdldEJvcmRlcldpZHRoKGlkeDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyV2lkdGhFdnQuZW1pdCh7IGlkeCwgdmFsdWUgfSk7XG4gIH1cblxuICBzZXRXaWRnZXRCb3JkZXJSYWRpdXMoaWR4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVXaWRnZXRCb3JkZXJSYWRpdXNFdnQuZW1pdCh7IGlkeCwgdmFsdWUgfSk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gc2VjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgc2V0U2VjdGlvblN0eWxlcyhsYWJlbDogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRTZWN0aW9uU3R5bGVzKHRoaXMub3JpZ2luLCBsYWJlbCwgdmFsdWUpO1xuICAgIHRoaXMuc3R5bGVDb2xvciA9IHZhbHVlO1xuICB9XG5cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBuZXcgc3R5bGUgdG8gcmVwb3J0XG4gICAqXG4gICAqIEBwYXJhbSBsYWJlbFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBzZXRSZXBvcnRTdHlsZXMobGFiZWw6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0UmVwb3J0U3R5bGVzKGxhYmVsLCB2YWx1ZSk7XG4gICAgdGhpcy5zdHlsZUJhY2tncm91bmRDb2xvciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBjdXN0b20gY29sb3JcbiAgICpcbiAgICpcbiAgICogQG1lbWJlck9mIEFqZlJlcG9ydEJ1aWxkZXJQcm9wZXJ0aWVzXG4gICAqL1xuICBhZGRDdXN0b21Db2xvcigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmFkZEN1c3RvbUNvbG9yKHRoaXMuY3VycmVudENvbG9yKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUN1cnJlbnRXaWRnZXQodGhpcy5jdXJyZW50V2lkZ2V0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgdGhlIG1vZHVsZSBleHBsb2l0IHRvIHF1aWxsIHRleHQgZWRpdG9yXG4gICAqXG4gICAqIEByZXR1cm5zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgZ2V0TW9kdWxlKCkge1xuICAgIHJldHVybiB0aGlzLnF1aWxsTW9kdWxlcztcbiAgfVxuXG4gIC8qKlxuICAgKiB0cnVlIGlzIHRoZSBpbnB1dCB0eXBlIHZhbHVlIGlzIGVxdWFsIHRvIGN1cnJlbnQgd2lkZ2V0IHR5cGVcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgaXNDaGFydFR5cGVTZWxlY3RlZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuaW5pdENoYXJ0VHlwZSA9PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBteU9iaiA9IDxBamZDaGFydFdpZGdldD50aGlzLmN1cnJlbnRXaWRnZXQ7XG4gICAgaWYgKHZhbHVlID09PSBteU9iai5jaGFydFR5cGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cblxuICAvKiBsYXlvdXQgZnVuY3Rpb25zICovXG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byBhZGQgYSBjb2x1bW4gdG8gY3VycmVudCBsYXlvdXQgd2lkZ2V0XG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgYWRkQ29sdW1uKCkge1xuICAgIHRoaXMuX3NlcnZpY2UuYWRkQ29sdW1uKCk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIGFkZCBhIG9iaiB0byBjdXJyZW50IGxheW91dCB3aWRnZXRcbiAgICpcbiAgICogQHBhcmFtIGlkeFxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIGZpeGVkQ29sdW1uKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5maXhlZENvbHVtbihpZHgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byByZW1vdmUgb2JqIG9mIGN1cnJlbnQgbGF5b3V0IHdpZGdldFxuICAgKlxuICAgKiBAcGFyYW0gaWR4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgdW5maXhlZENvbHVtbihpZHg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKCd1bmZpeGVkQ29sdW1uJywgaWR4KTtcbiAgfVxuXG4gIC8qIGltYWdlIGZ1bmN0aW9ucyAqL1xuXG4gIC8qKlxuICAgKiBjYWxsIHRvIHNlcnZpY2UgdG8gc2V0IGltYWdlIHVybFxuICAgKlxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldEltYWdlVXJsKCkge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0SW1hZ2VVcmwodGhpcy5pbWFnZVVybCk7XG4gIH1cblxuICBzZXRJY29uKGljb246IHsgZm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nIH0pIHtcbiAgICB0aGlzLl9pY29uID0gaWNvbjtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEljb24oaWNvbik7XG4gIH1cblxuICAvKiBjaGFydCBmdW5jdGlvbnMgKi9cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHNldCB0aGUgdHlwZSBvZiBjaGFydFxuICAgKlxuICAgKiBAcGFyYW0gdHlwZVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmUmVwb3J0QnVpbGRlclByb3BlcnRpZXNcbiAgICovXG4gIHNldENoYXJ0VHlwZSh0eXBlOiBudW1iZXIpIHtcbiAgICB0aGlzLmluaXRDaGFydFR5cGUgPSB0cnVlO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Q2hhcnRUeXBlKHR5cGUpO1xuICB9XG5cbiAgc2V0Q2hhcnRCb3JkZXJDb2xvcih2YWx1ZTogbnVtYmVyfG51bGwpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zZXJ2aWNlLnNldENoYXJ0Qm9yZGVyV2lkdGgodmFsdWUpO1xuICB9XG5cbiAgdGFiVmFsdWU6IHN0cmluZyA9ICdiYWNrZ3JvdW5kQ29sb3InO1xuICBzZXRUYWIoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC5pbmRleCA9PT0gMCkge1xuICAgICAgdGhpcy50YWJWYWx1ZSA9ICdiYWNrZ3JvdW5kQ29sb3InO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhYlZhbHVlID0gJ2JvcmRlckNvbG9yJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2FsbCB0byBzZXJ2aWNlIHRvIHJlbW92ZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgcmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlQ2hhcnRCYWNrZ3JvdW5kQ29sb3IoaW5kZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgdG8gc2VydmljZSB0byByZW1vdmUgYm9yZGVyIGNvbG9yIHRvIGN1cnJlbnQgY2hhcnRcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyUHJvcGVydGllc1xuICAgKi9cbiAgcmVtb3ZlQ2hhcnRCb3JkZXJDb2xvcihpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc2VydmljZS5yZW1vdmVDaGFydEJvcmRlckNvbG9yKGluZGV4KTtcbiAgfVxuXG4gIGhpZGVNZW51KCkge1xuICAgIHRoaXMuX3NlcnZpY2UudXBkYXRlQ3VycmVudFdpZGdldChudWxsKTtcbiAgfVxuXG4gIG9wZW5Gb3JtdWxhRGlhbG9nKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZlJlcG9ydEJ1aWxkZXJGb3Jtc0FuYWx5emVyRGlhbG9nKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5hZ2dyZWdhdGlvbiA9IEFqZkFnZ3JlZ2F0aW9uVHlwZS5Ob25lO1xuICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmlzRm9ybXVsYSA9IHRydWU7XG4gICAgaWYgKGV2ZW50ICE9IG51bGwgJiYgZXZlbnQucmVmZXJlbmNlICE9IG51bGwpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmZvcm11bGEgPSBldmVudC5mb3JtdWxhO1xuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVmZXJlbmNlID0gZXZlbnQucmVmZXJlbmNlO1xuICAgIH1cblxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXNTdWIgPSB0aGlzLl9zZXJ2aWNlLnJlcG9ydEZvcm1zXG4gICAgICAuc3Vic2NyaWJlKHggPT4ge1xuICAgICAgICB0aGlzLmZvcm1zID0geCB8fCBbXTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fY3VycmVudFdpZGdldFN1YiA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldFxuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgaWYgKHggIT0gbnVsbCkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgIT09IHgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdpZGdldCA9IHg7XG4gICAgICAgICAgICB0aGlzLndpZGdldE5hbWUgPSBBamZXaWRnZXRUeXBlW3gud2lkZ2V0VHlwZV07XG4gICAgICAgICAgICB0aGlzLnJlcG9ydFN0eWxlcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uU3R5bGVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLndpZGdldFN0eWxlcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWN0aW9uQ29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud2lkZ2V0Q29sb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudmlzaWJpbGl0eVNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgICB0aGlzLndpZGdldE5hbWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5fY29sb3JTdWIgPSB0aGlzLl9zZXJ2aWNlLmNvbG9yc1xuICAgICAgLnN1YnNjcmliZSh4ID0+IHtcbiAgICAgICAgaWYgKHggJiYgeC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5jb2xvcnMgPSB4O1xuXG4gICAgICAgICAgdGhpcy5xdWlsbE1vZHVsZXMgPSB7XG4gICAgICAgICAgICB0b29sYmFyOiBbXG4gICAgICAgICAgICAgIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgICAgICAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAgICAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG4gICAgICAgICAgICAgIFt7ICdoZWFkZXInOiAxIH0sIHsgJ2hlYWRlcic6IDIgfV0sICAgICAgICAgICAgICAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgICAgICAgICAgW3sgJ2xpc3QnOiAnb3JkZXJlZCcgfSwgeyAnbGlzdCc6ICdidWxsZXQnIH1dLFxuICAgICAgICAgICAgICBbeyAnc2NyaXB0JzogJ3N1YicgfSwgeyAnc2NyaXB0JzogJ3N1cGVyJyB9XSwgICAgICAvLyBzdXBlcnNjcmlwdC9zdWJzY3JpcHRcbiAgICAgICAgICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgICAgICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgICAgICAgICAgW3sgJ3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ10gfV0sICAvLyBjdXN0b20gZHJvcGRvd25cbiAgICAgICAgICAgICAgW3sgJ2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV0gfV0sXG5cbiAgICAgICAgICAgICAgW3sgJ2NvbG9yJzogdGhpcy5jb2xvcnMgfSxcbiAgICAgICAgICAgICAgeyAnYmFja2dyb3VuZCc6IHRoaXMuY29sb3JzIH1dLCAgICAgICAgICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgICAgICAgICAgW3sgJ2ZvbnQnOiB0aGlzLmZvbnRzIH1dLFxuICAgICAgICAgICAgICBbeyAnYWxpZ24nOiB0aGlzLmFsaWduIH1dLFxuICAgICAgICAgICAgICBbJ2Zvcm11bGEnXSxcbiAgICAgICAgICAgICAgWydjbGVhbiddLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgICAgICAgICAgLy8gWydsaW5rJywgJ2NsYXNzJywgJ3ZpZGVvJ10gICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluayBhbmQgaW1hZ2UsIHZpZGVvXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICAgIHRoaXMuZ2V0SFRNTCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKHdpZGdldDogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAod2lkZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IG15T2JqID0gPEFqZlRleHRXaWRnZXQ+dGhpcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLmh0bWxUZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoJzxwPjxicj48L3A+JykpO1xuXG5cbiAgICB0aGlzLmdldEhlaWdodFdpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBmaWx0ZXIoeCA9PiB4ICE9IG51bGwpLCBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnRvTnVtYmVyKG15T2JqLnN0eWxlc1snaGVpZ2h0J10pO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgfHwgdmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Rm9udFNpemVXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnRvTnVtYmVyKG15T2JqLnN0eWxlc1snZm9udC1zaXplJ10pIHx8IDEyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRGb250QWxpZ25XaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICgobXlPYmouc3R5bGVzWyd0ZXh0LWFsaWduJ10pIHx8ICdjZW50ZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydib3JkZXItd2lkdGgnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKFswLCAwLCAwLCAwXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyV2lkdGhXaWRnZXRUb3AgPSB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMF0pXG4gICAgKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0UmlnaHQgPSB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMV0pXG4gICAgKTtcbiAgICB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0Qm90dG9tID0gdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzJdKVxuICAgICk7XG4gICAgdGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldExlZnQgPSB0aGlzLmdldEJvcmRlcldpZHRoV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbM10pXG4gICAgKTtcblxuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0ID0gdGhpcy5fc2VydmljZS5jdXJyZW50V2lkZ2V0LnBpcGUoXG4gICAgICAgIG1hcCgobXlPYmo6IEFqZldpZGdldHxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKG15T2JqICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxQeE51bWJlckFycmF5KHRoaXMudG9OdW1iZXJBcnJheShteU9iai5zdHlsZXNbJ2JvcmRlci1yYWRpdXMnXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgc3RhcnRXaXRoKFswLCAwLCAwLCAwXSkpO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0VG9wTGVmdCA9IHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMF0pXG4gICAgKTtcbiAgICB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldFRvcFJpZ2h0ID0gdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVsxXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0Qm9yZGVyUmFkaXVzV2lkZ2V0Qm90dG9tUmlnaHQgPSB0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzJdKVxuICAgICk7XG4gICAgdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXRCb3R0b21MZWZ0ID0gdGhpcy5nZXRCb3JkZXJSYWRpdXNXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVszXSlcbiAgICApO1xuXG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCAmJiBteU9iai5zdHlsZXNbJ21hcmdpbiddICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxQeE51bWJlckFycmF5KHRoaXMudG9OdW1iZXJBcnJheShteU9iai5zdHlsZXNbJ21hcmdpbiddKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBzdGFydFdpdGgoWzAsIDAsIDAsIDBdKSk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRUb3AgPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzBdKVxuICAgICk7XG4gICAgdGhpcy5nZXRNYXJnaW5XaWRnZXRSaWdodCA9IHRoaXMuZ2V0TWFyZ2luV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMV0pXG4gICAgKTtcbiAgICB0aGlzLmdldE1hcmdpbldpZGdldEJvdHRvbSA9IHRoaXMuZ2V0TWFyZ2luV2lkZ2V0LnBpcGUoXG4gICAgICBmaWx0ZXIobSA9PiBtICE9IG51bGwpLFxuICAgICAgbWFwKG0gPT4gbSFbMl0pXG4gICAgKTtcbiAgICB0aGlzLmdldE1hcmdpbldpZGdldExlZnQgPSB0aGlzLmdldE1hcmdpbldpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzNdKVxuICAgICk7XG5cbiAgICB0aGlzLmdldFBhZGRpbmdXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCAmJiBteU9iai5zdHlsZXNbJ3BhZGRpbmcnXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsUHhOdW1iZXJBcnJheSh0aGlzLnRvTnVtYmVyQXJyYXkobXlPYmouc3R5bGVzWydwYWRkaW5nJ10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldFRvcCA9IHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzBdKVxuICAgICk7XG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0UmlnaHQgPSB0aGlzLmdldFBhZGRpbmdXaWRnZXQucGlwZShcbiAgICAgIGZpbHRlcihtID0+IG0gIT0gbnVsbCksXG4gICAgICBtYXAobSA9PiBtIVsxXSlcbiAgICApO1xuICAgIHRoaXMuZ2V0UGFkZGluZ1dpZGdldEJvdHRvbSA9IHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzJdKVxuICAgICk7XG4gICAgdGhpcy5nZXRQYWRkaW5nV2lkZ2V0TGVmdCA9IHRoaXMuZ2V0UGFkZGluZ1dpZGdldC5waXBlKFxuICAgICAgZmlsdGVyKG0gPT4gbSAhPSBudWxsKSxcbiAgICAgIG1hcChtID0+IG0hWzNdKVxuICAgICk7XG5cbiAgICB0aGlzLmdldEJhY2tncm91bmRDb2xvcldpZGdldCA9IHRoaXMuX3NlcnZpY2UuY3VycmVudFdpZGdldC5waXBlKFxuICAgICAgICBtYXAoKG15T2JqOiBBamZXaWRnZXR8bnVsbCkgPT4ge1xuICAgICAgICAgIGlmIChteU9iaiAhPSBudWxsICYmIG15T2JqLnN0eWxlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbXlPYmouc3R5bGVzWydiYWNrZ3JvdW5kQ29sb3InXSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuZ2V0Q29sb3JXaWRnZXQgPSB0aGlzLl9zZXJ2aWNlLmN1cnJlbnRXaWRnZXQucGlwZShcbiAgICAgICAgbWFwKChteU9iajogQWpmV2lkZ2V0fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAobXlPYmogIT0gbnVsbCAmJiBteU9iai5zdHlsZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG15T2JqLnN0eWxlc1snY29sb3InXSB8fCAnJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzID0gKDxPYnNlcnZhYmxlPHtpZHg6IGFueTsgdmFsdWU6IGFueX0+PnRoaXMuX3VwZGF0ZVdpZGdldE1hcmdpbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuZ2V0TWFyZ2luV2lkZ2V0KSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt7IGlkeDogbnVtYmVyLCB2YWx1ZTogYW55IH0sIG51bWJlcltdIHwgdW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICBpZiAociA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBpZHggPSByWzBdLmlkeDtcbiAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCB2ID0gclsxXSB8fCBbMCwgMCwgMCwgMF07XG4gICAgICAgIGlmICh2ID09IG51bGwgfHwgdi5sZW5ndGggPCBpZHgpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZbaWR4XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldFdpZGdldFN0eWxlcygnbWFyZ2luJywgdik7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzLmFkZCgoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0UGFkZGluZ0V2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuZ2V0UGFkZGluZ1dpZGdldCkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbeyBpZHg6IG51bWJlciwgdmFsdWU6IGFueSB9LCBudW1iZXJbXSB8IHVuZGVmaW5lZF0pID0+IHtcbiAgICAgICAgaWYgKHIgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gclswXS52YWx1ZTtcbiAgICAgICAgY29uc3QgdiA9IHJbMV0gfHwgWzAsIDAsIDAsIDBdO1xuICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7IHJldHVybjsgfVxuICAgICAgICB2W2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXRXaWRnZXRTdHlsZXMoJ3BhZGRpbmcnLCB2KTtcbiAgICAgIH0pKTtcblxuICAgIHRoaXMuX3N0eWxlc1VwZGF0ZXNTdWJzXG4gICAgICAuYWRkKCg8T2JzZXJ2YWJsZTx7aWR4OiBhbnk7IHZhbHVlOiBhbnl9Pj50aGlzLl91cGRhdGVXaWRnZXRCb3JkZXJXaWR0aEV2dClcbiAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5nZXRCb3JkZXJXaWR0aFdpZGdldCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHI6IFt7IGlkeDogbnVtYmVyLCB2YWx1ZTogYW55IH0sIG51bWJlcltdIHwgdW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICAgIGlmIChyID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7IHJldHVybjsgfVxuICAgICAgICAgIHZbaWR4XSA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKCdib3JkZXItd2lkdGgnLCB2KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICB0aGlzLl9zdHlsZXNVcGRhdGVzU3Vicy5hZGQoXG4gICAgICAoPE9ic2VydmFibGU8e2lkeDogYW55OyB2YWx1ZTogYW55fT4+dGhpcy5fdXBkYXRlV2lkZ2V0Qm9yZGVyUmFkaXVzRXZ0KVxuICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLmdldEJvcmRlclJhZGl1c1dpZGdldCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHI6IFt7IGlkeDogbnVtYmVyLCB2YWx1ZTogYW55IH0sIG51bWJlcltdIHwgdW5kZWZpbmVkXSkgPT4ge1xuICAgICAgICAgIGlmIChyID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgY29uc3QgaWR4ID0gclswXS5pZHg7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSByWzBdLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHYgPSByWzFdIHx8IFswLCAwLCAwLCAwXTtcbiAgICAgICAgICBpZiAodiA9PSBudWxsIHx8IHYubGVuZ3RoIDwgaWR4KSB7IHJldHVybjsgfVxuICAgICAgICAgIHZbaWR4XSA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMuc2V0V2lkZ2V0U3R5bGVzKCdib3JkZXItcmFkaXVzJywgdik7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgdGhpcy5jdXJyZW50V2lkZ2V0ID0gY2hhbmdlcy53aWRnZXQuY3VycmVudFZhbHVlO1xuICAgIGlmICh0aGlzLmN1cnJlbnRXaWRnZXQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB0aGlzLndpZGdldE5hbWUgPSBBamZXaWRnZXRUeXBlW3RoaXMuY3VycmVudFdpZGdldC53aWRnZXRUeXBlXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRXaWRnZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3Jtc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2NvbG9yU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faGVhZGVyU3R5bGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jb250ZW50U3R5bGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9vdGVyU3R5bGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3R5bGVzVXBkYXRlc1N1YnMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iXX0=