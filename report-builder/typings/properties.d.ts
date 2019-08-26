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
import { AjfForm } from '@ajf/core/forms';
import { AjfCondition } from '@ajf/core/models';
import { AjfLayoutWidget, AjfTextWidget, AjfWidget } from '@ajf/core/reports';
import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfReportBuilderFormsAnalyzerDialog } from './forms-analyzer-dialog';
import { AjfFormVariables } from './models';
import { AjfReportBuilderService } from './report-builder-service';
export declare class AjfReportBuilderProperties implements OnInit, OnChanges, OnDestroy {
    private _dialog;
    private _service;
    /**
     *  true when the first time chart type is setted
     *
     * @memberOf AjfReportBuilderProperties
     */
    initChartType: boolean;
    /**
     * the current widget
     *
     * @memberOf AjfReportBuilderProperties
     */
    currentWidget: AjfWidget | null;
    readonly currentLayoutWidget: AjfLayoutWidget;
    readonly currentTextWidget: AjfTextWidget;
    /**
     * this array contains the forms exploited for generate data labels
     *
     * @memberOf AjfReportBuilderProperties
     */
    forms: AjfForm[];
    colors: string[];
    /**
     * the name of the section that contains the currentWidget
     *
     * @memberOf AjfReportBuilderProperties
     */
    origin: string;
    /**
     * FAKE DATA
     */
    formsJson: any;
    /**
     * WIDGET
     */
    widgetName: string;
    getHTML: Observable<string | undefined>;
    getHeightWidget: Observable<number | undefined>;
    getFontSizeWidget: Observable<number | undefined>;
    getFontAlignWidget: Observable<number | undefined>;
    getBackgroundColorWidget: Observable<string>;
    getColorWidget: Observable<string>;
    getStyle: Observable<any>;
    getChartBackgroundColor: Observable<string[]>;
    getChartBorderColor: Observable<string[]>;
    getVisibility: Observable<AjfCondition>;
    getColor: Observable<String[]>;
    marginExpanded: boolean;
    getMarginWidget: Observable<number[] | undefined>;
    getMarginWidgetTop: Observable<number>;
    getMarginWidgetRight: Observable<number>;
    getMarginWidgetBottom: Observable<number>;
    getMarginWidgetLeft: Observable<number>;
    paddingExpanded: boolean;
    getPaddingWidget: Observable<number[] | undefined>;
    getPaddingWidgetTop: Observable<number>;
    getPaddingWidgetRight: Observable<number>;
    getPaddingWidgetBottom: Observable<number>;
    getPaddingWidgetLeft: Observable<number>;
    borderWidthExpanded: boolean;
    getBorderWidthWidget: Observable<number[] | undefined>;
    getBorderWidthWidgetTop: Observable<number>;
    getBorderWidthWidgetRight: Observable<number>;
    getBorderWidthWidgetBottom: Observable<number>;
    getBorderWidthWidgetLeft: Observable<number>;
    borderRadiusExpanded: boolean;
    getBorderRadiusWidget: Observable<number[] | undefined>;
    getBorderRadiusWidgetTopLeft: Observable<number>;
    getBorderRadiusWidgetTopRight: Observable<number>;
    getBorderRadiusWidgetBottomRight: Observable<number>;
    getBorderRadiusWidgetBottomLeft: Observable<number>;
    backgroundColor: string;
    styleBackgroundColor: string;
    borderColor: string;
    styleColor: string;
    wbackgroundColor: string;
    fontSize: string;
    bubble: string;
    dialogRef: MatDialogRef<AjfReportBuilderFormsAnalyzerDialog>;
    container: AjfFormVariables;
    align: (string | boolean)[];
    fonts: (string | boolean)[];
    currentModule: any;
    quillModules: {
        toolbar: (string[] | {
            'header': number;
        }[] | {
            'list': string;
        }[] | {
            'script': string;
        }[] | {
            'size': (string | boolean)[];
        }[] | {
            'header': (number | boolean)[];
        }[] | ({
            'color': string[];
            'background'?: undefined;
        } | {
            'background': string[];
            'color'?: undefined;
        })[] | {
            'font': (string | boolean)[];
        }[] | {
            'align': (string | boolean)[];
        }[])[];
    };
    /**
     * CHART
     */
    getChartYLabels: Observable<string[]>;
    chartBorderColor: string[];
    chartBorderWidth: number;
    /**
     *
     * IMAGE
     */
    imageUrl: string;
    /**
     *
     * TEXT
     */
    htmlText: string;
    /**
     * these variables indicate that the user want to change section
     */
    reportStyles: boolean;
    sectionStyles: boolean;
    widgetStyles: boolean;
    sectionColor: boolean;
    widgetColor: boolean;
    visibilitySection: boolean;
    currentColor: string;
    private _icon;
    readonly icon: {
        fontSet: string;
        fontIcon: string;
    } | null;
    iconSet: any;
    flagSet: any;
    private _currentWidgetSub;
    private _formsSub;
    private _colorSub;
    private _headerStyleSub;
    private _contentStylesSub;
    private _footerStylesSub;
    private _originSub;
    private _stylesUpdatesSubs;
    private _updateWidgetMarginEvt;
    private _updateWidgetPaddingEvt;
    private _updateWidgetBorderWidthEvt;
    private _updateWidgetBorderRadiusEvt;
    constructor(_dialog: MatDialog, _service: AjfReportBuilderService);
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
    toNumber(value: string): number;
    toNumberArray(value: string): number[];
    fillPxNumberArray(value: number[]): number[];
    percent(value: number): number;
    roundTo(value: number, decimalPositions: number): number;
    /**
     * call to service to set the forms
     *
     * @memberOf AjfReportBuilderProperties
     */
    setForms(): void;
    /**
     * call to service to set the width of the idx column of layout widget
     *
     * @param col
     * @param idx
     *
     * @memberOf AjfReportBuilderProperties
     */
    instantColumnValue(col: number, idx: number): void;
    /**
     *  force copy of style
     *
     * @memberOf AjfReportBuilderProperties
     */
    setStyle(): void;
    /**
     * call to service to add new style to widget
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    setWidgetStyles(label: string, value: any): void;
    setWidgetMargin(idx: number, value: any): void;
    setWidgetPadding(idx: number, value: any): void;
    setWidgetBorderWidth(idx: number, value: any): void;
    setWidgetBorderRadius(idx: number, value: any): void;
    /**
     * call to service to add new style to section
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    setSectionStyles(label: string, value: any): void;
    /**
     * call to service to add new style to report
     *
     * @param label
     * @param value
     *
     * @memberOf AjfReportBuilderProperties
     */
    setReportStyles(label: string, value: any): void;
    /**
     * add custom color
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    addCustomColor(): void;
    /**
     * get the module exploit to quill text editor
     *
     * @returns
     *
     * @memberOf AjfReportBuilderProperties
     */
    getModule(): {
        toolbar: (string[] | {
            'header': number;
        }[] | {
            'list': string;
        }[] | {
            'script': string;
        }[] | {
            'size': (string | boolean)[];
        }[] | {
            'header': (number | boolean)[];
        }[] | ({
            'color': string[];
            'background'?: undefined;
        } | {
            'background': string[];
            'color'?: undefined;
        })[] | {
            'font': (string | boolean)[];
        }[] | {
            'align': (string | boolean)[];
        }[])[];
    };
    /**
     * true is the input type value is equal to current widget type
     *
     * @param value
     * @returns
     *
     * @memberOf AjfReportBuilderProperties
     */
    isChartTypeSelected(value: number): boolean;
    /**
     * call to service to add a column to current layout widget
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    addColumn(): void;
    /**
     * call to service to add a obj to current layout widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderProperties
     */
    fixedColumn(idx: number): void;
    /**
     * call to service to remove obj of current layout widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderProperties
     */
    unfixedColumn(idx: number): void;
    /**
     * call to service to set image url
     *
     *
     * @memberOf AjfReportBuilderProperties
     */
    setImageUrl(): void;
    setIcon(icon: {
        fontSet: string;
        fontIcon: string;
    }): void;
    /**
     * call to service to set the type of chart
     *
     * @param type
     *
     * @memberOf AjfReportBuilderProperties
     */
    setChartType(type: number): void;
    setChartBorderColor(value: number): void;
    tabValue: string;
    setTab(event: any): void;
    /**
     * call to service to remove background color to current chart
     *
     * @param index
     *
     * @memberOf AjfReportBuilderProperties
     */
    removeChartBackgroundColor(index: number): void;
    /**
     * call to service to remove border color to current chart
     *
     * @param index
     *
     * @memberOf AjfReportBuilderProperties
     */
    removeChartBorderColor(index: number): void;
    hideMenu(): void;
    openFormulaDialog(event: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
