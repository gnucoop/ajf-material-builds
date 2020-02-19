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
import { AjfForm, AjfNode } from '@ajf/core/forms';
import { AjfFormula } from '@ajf/core/models';
import { AjfColumnWidget, AjfCustomWidget, AjfLayoutWidget, AjfReport, AjfStyles, AjfWidget } from '@ajf/core/reports';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AjfFormVariables, AjfReportIcons, AjfReportsConfig, AjfWidgetsContainer } from './models';
/**
 * This service contains all the logic to model the report widget.
 *
 * @export
 */
export declare class AjfReportBuilderService {
    /**
     *  this Observable observe the customWidgets obj
     *
     * @memberOf AjfReportBuilderService
     */
    private _customWidgets;
    private _customWidgetsUpdate;
    /**
     * this Observable observe the name of the section that contains the current widget.
     *
     * @memberOf AjfReportBuilderService
     */
    private _origin;
    private _originUpdate;
    /**
     * this Observable observe the exported json
     *
     * @memberOf AjfReportBuilderService
     */
    private _savedReport;
    private _savedReportUpdate;
    private _jsonStack;
    private _lastDeletedJson;
    private _emptyContent;
    /**
     *  this Observable observe if is fired drag mouse event.
     *
     * @memberOf AjfReportBuilderService
     */
    private _onDragged;
    private _onDraggedUpdate;
    private _onOver;
    private _onOverUpdate;
    /**
     * this Observable observe the status of permanent zoom
     *
     * @memberOf AjfReportBuilderService
     */
    private _fixedZoom;
    private _fixedZoomUpdate;
    /**
     *  this Observable observe if is fired drag mouse event.
     *
     * @memberOf AjfReportBuilderService
     */
    private _onDragEnter;
    private _onDragEnterUpdate;
    /**
     * Observe the header widget array.
     *
     * @memberOf AjfReportBuilderService
     */
    private _headerWidgets;
    private _headerWidgetsUpdate;
    /**
     * observe the header styles.
     *
     * @memberOf AjfReportBuilderService
     */
    private _headerStyles;
    /**
     * Observe the content widget array
     *
     * @memberOf AjfReportBuilderService
     */
    private _contentWidgets;
    private _contentWidgetsUpdate;
    /**
     * this Observable observe the content styles.
     *
     * @memberOf AjfReportBuilderService
     */
    private _contentStyles;
    /**
     * this Observable observe the footer widget array.
     *
     * @memberOf AjfReportBuilderService
     */
    private _footerWidgets;
    private _footerWidgetsUpdate;
    private _color;
    private _colorUpdate;
    private _defaultColor;
    /**
     * this Observable observe the footer styles.
     *
     * @memberOf AjfReportBuilderService
     */
    private _footerStyles;
    /**
     *  this Observable observe the current widget which holds the focus.
     *
     * @memberOf AjfReportBuilderService
     */
    private _currentWidget;
    private _currentWidgetUpdate;
    /**
     * Observe the AjfFormVariables exploit for field selecting from forms
     *
     * @memberOf AjfReportBuilderService
     */
    private _formsVariables;
    private _formsVariablesUpdate;
    /**
     * Observe the AjfFormVariables exploit for field selecting from forms
     *
     * @memberOf AjfReportBuilderService
     */
    private _conditionNames;
    private _conditionNamesUpdate;
    /**
     * this BehaviorSubject update export report.
     *
     * @memberOf AjfReportBuilderService
     */
    private _saveReport;
    /**
     * this BehaviorSubject contains the AjfReport.
     *
     * @memberOf AjfReportBuilderService
     */
    private _report;
    /**
     *  this Observable observe the styles of report.
     *
     * @memberOf AjfReportBuilderService
     */
    private _reportStyles;
    private _reportStylesUpdate;
    /**
     * observe the forms fetched
     *
     * @memberOf AjfReportBuilderService
     */
    private _reportForms;
    private _reportFormsUpdate;
    /**
     * dictionary for  widgetsUpdate
     *
     * @memberOf AjfReportBuilderService
     */
    private _updates;
    /**
     * event emitter that notify when wont to save report
     *
     * @memberOf AjfReportBuilderService
     */
    private _saveReportEvent;
    private _saveFormulaTOHtml;
    getFormulaToHtmlEvent(): Observable<string>;
    /**
     * event emitter that notify when column width changed
     *
     * @memberOf AjfReportBuilderService
     */
    columnWidthChangedEmitter: EventEmitter<void>;
    private _iconSets;
    get iconSets(): AjfReportIcons;
    /**
     * Creates an instance of AjfReportBuilderService.
     *
     * @memberOf AjfReportBuilderService
     */
    constructor(reportsConfig: AjfReportsConfig);
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
    filterNodes(nodes: AjfNode[]): AjfNode[];
    parseColor(cssStyles: any, colors: string[]): void;
    fillFormsVariables(forms: AjfForm[]): AjfFormVariables[];
    /**
     * utils:
     *  the obj returned contains the label field of ajfNode
     * @param nodes
     *
     * @memberOf AjfReportBuilderService
     */
    extractLabelsNodes(nodes: AjfNode[]): any;
    extractNamesNodes(nodes: AjfNode[]): any;
    extractTypesNodes(nodes: AjfNode[]): any;
    setOrigin(origin: string): void;
    /**
     * utils:
     * This method round the value to the decimal position
     *
     * @param value
     * @param decimalpositions
     *
     * @memberOf AjfReportBuilderService
     */
    roundTo(value: number, decimalPositions: number): number;
    /**
     * utils:
     * This validator check if the value is a number.
     *
     * @param value
     *
     * @memberOf AjfReportBuilderService
     */
    isNumber(value: any): boolean;
    isNumberArray(value: any[]): boolean;
    /**
     * get _onDragged Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get onDragged(): Observable<any>;
    /**
     * get _onOver Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get onOver(): Observable<any>;
    /**
     * get _fixedZoom Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get fixedZoom(): Observable<boolean>;
    /**
     *  change status of _fixedZoom in true
     *
     *
     * @memberOf AjfReportBuilderService
     */
    fixedZoomIn(): void;
    /**
     *  change status of _fixedZoom in false
     *
     *
     * @memberOf AjfReportBuilderService
     */
    fixedZoomOut(): void;
    /**
     * get _onDragEnter observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get onDragEnter(): Observable<any>;
    /**
     *  update _onDragEnter with  section(header,content,footer) and index
     *
     * @memberOf AjfReportBuilderService
     */
    dragEnter(array: string, index: number): void;
    /**
     *  update _ondragged with true
     *
     * @memberOf AjfReportBuilderService
     */
    dragStarted(): void;
    /**
     *  update _onDragged with false
     *
     * @memberOf AjfReportBuilderService
     */
    dragEnded(): void;
    /**
     *  update _onOver with true
     *
     *
     * @memberOf AjfReportBuilderService
     */
    overStarted(): void;
    /**
     * update _onOver with false
     *
     *
     * @memberOf AjfReportBuilderService
     */
    overEnded(): void;
    /**
     *
     *  update _onDragged with false
     *
     * @memberOf AjfReportBuilderService
     */
    dragLeave(): void;
    /**
     * Get the report
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get report(): Observable<AjfReport | null>;
    /**
     * emit save report event
     *
     *
     * @memberOf AjfReportBuilderService
     */
    saveReport(): void;
    saveImageFormula(formula: AjfFormula): void;
    saveFormulaToHtml(htmlFormula: string, reference: any): void;
    setEmptyContent(val: boolean): void;
    pushJsonStack(json: string): void;
    popJsonStack(): string | undefined;
    /**
     * get the emitter
     *
     * @readonly
     *
     * @memberOf AjfReportBuilderService
     */
    get columnWidthChanged(): EventEmitter<void>;
    /**
     * get _customWidgets Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get customWidgets(): Observable<AjfCustomWidget[]>;
    /**
     * Get the header widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get headerWidgets(): Observable<AjfWidgetsContainer>;
    /**
     * Get the header styles
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get headerStyles(): Observable<AjfStyles>;
    /**
     * Get the Content widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get contentWidgets(): Observable<AjfWidgetsContainer>;
    /**
     * Get the content styles
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get contentStyles(): Observable<AjfStyles>;
    /**
     * Get the footer widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get footerWidgets(): Observable<AjfWidgetsContainer>;
    /**
     * Get the footer styles
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get footerStyles(): Observable<AjfStyles>;
    /**
     * Get the colors of report
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get colors(): Observable<string[]>;
    get emptyContent(): Observable<boolean>;
    /**
     *
     * @param type
     * @param newWidget
     *
     * @memberOf AjfReportBuilderService
     */
    updateArrayWidgets(type: string, newWidget: AjfWidgetsContainer): void;
    /**
     * get _formsVariables Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get formsVariables(): Observable<AjfFormVariables[]>;
    get conditionNames(): Observable<AjfFormVariables[]>;
    /**
     * Get the current widget
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get currentWidget(): Observable<AjfWidget | null>;
    /**
     * This method Update _currentWidgetUpdate with newWidget.
     *
     * @param newWidget
     *
     * @memberOf AjfReportBuilderService
     */
    updateCurrentWidget(newWidget: AjfWidget | null): void;
    /**
     * Get the report
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get getSaveReport(): Observable<any>;
    /**
     * get _jsonSavedReport obeservable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get reportSaved(): Observable<AjfReport>;
    /**
     * get _reportStyles observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get reportStyles(): Observable<AjfStyles>;
    /**
     * get _reportForms observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get reportForms(): Observable<AjfForm[]>;
    /**
     * get the _origin Observable
     *
     * @readonly
     * @memberOf AjfReportBuilderService
     */
    get origin(): Observable<string>;
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
    instantColumnValue(newValue: number, idx: number): void;
    /**
     * This method set the imageUrl on the current AjfImageWidget.
     *
     * @param imageUrl
     *
     * @memberOf AjfReportBuilderService
     */
    setImageUrl(imageUrl: string): void;
    setIcon(icon: {
        fontSet: string;
        fontIcon: string;
    }): void;
    setFlag(value: string): void;
    saveCondition(conditionText: string): void;
    saveChartFormula(_label: string, _level: number, _mainIndex: number, _index: number, formulaText: string, aggregationType: number): void;
    saveTableFormula(_label: string, aggregationType: number, formulaText: string, _mainIndex: number, _index: number): void;
    removeTableMainData(index: number): void;
    removeData(_mainIndex: number, _index: number): void;
    /**
     * update type field of AjfChartWidget current widget
     *
     * @param type
     *
     * @memberOf AjfReportBuilderService
     */
    setChartType(type: number): void;
    /**
     * remove  idx element of xLabels field of AjfChartWidget current widget
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    removeMainData(_idx: number): void;
    removeRelatedData(_mainIdx: number, _idx: number): void;
    /**
     * update backgroundColor field of AjfChartWidget current widget
     *
     * @param colors
     *
     * @memberOf AjfReportBuilderService
     */
    setChartBackgroundColor(colors: string[]): void;
    addChartBackgroundColor(color: string): void;
    removeChartBackgroundColor(idx: number): void;
    /**
     * update borderColor field of AjfChartWidget current widget
     *
     * @param colors
     *
     * @memberOf AjfReportBuilderService
     */
    setChartBorderColor(colors: string[]): void;
    setChartBorderWidth(value: number): void;
    addChartBorderColor(color: string): void;
    removeChartBorderColor(idx: number): void;
    /**
     * This method set the AjfReport.
     *
     * @param report
     *
     * @memberOf AjfReportBuilderService
     */
    setReport(report: AjfReport): void;
    /**
     * This method set the export report.
     *
     * @param report
     *
     * @memberOf AjfReportBuilderService
     */
    setSaveReport(json: any): void;
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
    setWidgetStyles(label: string, value: string | string[]): void;
    /**
     * this method update the styles of origin widget array
     *
     * @param origin can be header content or footer
     * @param label for example background-color
     * @param value for example rgb(255,255,255,1)
     *
     * @memberOf AjfReportBuilderService
     */
    setSectionStyles(origin: string, label: string, value: string): void;
    /**
     * this method set the style of the whole report.
     *
     * @param label for example background-color
     * @param value for example rgb(255,255,255,1)
     *
     * @memberOf AjfReportBuilderService
     */
    setReportStyles(label: string, value: string): void;
    /**
     *  update forms
     *
     * @param forms
     *
     * @memberOf AjfReportBuilderService
     */
    setReportForms(forms: AjfForm[]): void;
    /**
     * update customWidgets
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addCustomWidgets(widget: AjfCustomWidget, position?: number): void;
    /**
     * reset customWidgets
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    resetCustomWidgets(): void;
    /**
     * update label of widget
     *
     * @param label
     * @param position
     *
     * @memberOf AjfReportBuilderService
     */
    changeLabelCustomWidget(label: string, position: number): void;
    /**
     * Add an AjfWidget on _headerWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addHeaderWidget(widget: AjfWidget, position?: number): void;
    /**
     * Add an AjfWidget on _contentWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addContentWidget(widget: AjfWidget, position?: number): void;
    /**
     * Add an AjfWidget on _footerWidgetsUpdate
     *
     * @param widget
     * @param [position]
     *
     * @memberOf AjfReportBuilderService
     */
    addfooterWidget(widget: AjfWidget, position?: number): void;
    unfixedColumn(idx: number): void;
    /**
     * Add column on the current AjfLayoutWidget.
     *
     * When adding a column the width of the other columns is recalculated
     * by dividing it by the number of column
     *
     * @memberOf AjfReportBuilderService
     */
    addColumn(): void;
    removeWidgetToColumn(column: AjfColumnWidget, index: number): void;
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
    remove(node: string, idx: number): void;
    /**
     * This method add a AjfWidget on the current AjfLayoutWidget.
     *
     * @param newWidget
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    addToContent(newWidget: AjfWidget, idx: number): void;
    addToColumn(event: any, toColumn: AjfColumnWidget, position?: number): void;
    changePositionOnColumn(event: any, toColumn: AjfColumnWidget, toIndex: number): void;
    /**
     * This method add the obj on the idx position.
     * Obj have a no specificate width and is not calculate as columns
     *
     * @param idx
     *
     * @memberOf AjfReportBuilderService
     */
    fixedColumn(idx: number): void;
    changeColumn(from: number, to: number, layoutWidget: AjfLayoutWidget): void;
    addCustomColor(color: string): void;
    private _addWidgetToContainer;
    private _setCurrentWidgetProperty;
    private _addToCurrentWidgetArrayProperty;
    private _removeFromCurrentWidgetArrayProperty;
}
