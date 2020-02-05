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
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, Input, EventEmitter, Injectable, ViewChild, ChangeDetectorRef, ViewChildren, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AjfMonacoEditor, AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { AjfNodeIconModule } from '@ajf/material/node-icon';
import { filter, map, scan, publishReplay, refCount, withLatestFrom, shareReplay, sample, distinctUntilChanged } from 'rxjs/operators';
import { isChoicesFixedOrigin, isContainerNode, AjfNodeType, AjfFieldType, createField, createContainerNode, createForm, createChoicesFixedOrigin, isRepeatingContainerNode, isField, createValidationGroup, notEmptyValidation, minValidation, maxValidation, minDigitsValidation, maxDigitsValidation, createValidation, createWarningGroup, notEmptyWarning, createWarning, isFieldWithChoices, isSlidesNode, AjfValidationService, isNumberField } from '@ajf/core/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, combineLatest, Subscription } from 'rxjs';
import { createCondition, alwaysCondition, createFormula, AjfExpressionUtils, neverCondition } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbBranchLine {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._height = 0;
    }
    /**
     * @param {?} offset
     * @return {?}
     */
    set offset(offset) {
        this._offset = offset;
        this._updateOffset();
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set color(color) {
        this._color = color;
        this._updateColor();
    }
    /**
     * @param {?} height
     * @return {?}
     */
    set height(height) {
        this._height = height;
        this._updateHeight();
    }
    /**
     * @private
     * @return {?}
     */
    _updateHeight() {
        /** @type {?} */
        const height = `${Math.max(0, this._height - 25)}px`;
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    }
    /**
     * @private
     * @return {?}
     */
    _updateOffset() {
        /** @type {?} */
        const margin = `${this._offset * 4}px`;
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    }
    /**
     * @private
     * @return {?}
     */
    _updateColor() {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    }
}
AjfFbBranchLine.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-branch-line',
                template: "",
                styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbBranchLine.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AjfFbBranchLine.propDecorators = {
    offset: [{ type: Input }],
    color: [{ type: Input }],
    height: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ChoicesOriginDataSource extends DataSource {
    constructor() {
        super();
        this._choices = new BehaviorSubject([]);
        this._choicesObs = this._choices.asObservable();
    }
    /**
     * @return {?}
     */
    connect() {
        return this._choicesObs;
    }
    /**
     * @return {?}
     */
    disconnect() { }
    /**
     * @param {?} choices
     * @return {?}
     */
    updateChoices(choices) {
        this._choices.next(choices);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbChoicesOriginEditor {
    constructor() {
        this._displayedColumns = ['label', 'value', 'delete'];
        this.editing = {};
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    /**
     * @return {?}
     */
    get displayedColumns() { return this._displayedColumns; }
    /**
     * @return {?}
     */
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    set choicesOrigin(choicesOrigin) {
        this._choicesOrigin = choicesOrigin;
        this.name = choicesOrigin.name;
        this.label = choicesOrigin.label;
        this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
        this._choicesArr = choicesOrigin.choices;
        this._choices.updateChoices(this._choicesArr);
    }
    /**
     * @return {?}
     */
    get choices() { return this._choices; }
    /**
     * @return {?}
     */
    get choicesArr() { return this._choicesArr; }
    /**
     * @param {?} evt
     * @param {?} cell
     * @param {?} _value
     * @param {?} rowIdx
     * @return {?}
     */
    updateValue(evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        ((/** @type {?} */ (this._choicesArr[rowIdx])))[cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    }
    /**
     * @param {?} rowIdx
     * @return {?}
     */
    deleteRow(rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    }
    /**
     * @return {?}
     */
    addRow() {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    }
}
AjfFbChoicesOriginEditor.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-choices-origin-editor',
                template: "<div><mat-form-field><input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | translate\"></mat-form-field><mat-form-field><input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | translate\"></mat-form-field><ng-template [ngIf]=\"canEditChoices\"><button (click)=\"addRow()\" mat-button><mat-icon>add</mat-icon><span translate>Add value</span></button><mat-table [dataSource]=\"choices\"><ng-container matColumnDef=\"label\"><mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><input matInput [(ngModel)]=\"row.label\" type=\"text\"></mat-cell></ng-container><ng-container matColumnDef=\"value\"><mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><input matInput [(ngModel)]=\"row.value\" type=\"text\"></mat-cell></ng-container><ng-container matColumnDef=\"delete\"><mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon></mat-cell></ng-container><mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row><mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row></mat-table></ng-template></div>",
                styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
AjfFbChoicesOriginEditor.propDecorators = {
    choicesOrigin: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} c
 * @param {?} node
 * @return {?}
 */
function getNodeContainer(c, node) {
    if (c.nodes.indexOf(node) > -1) {
        return c;
    }
    /** @type {?} */
    const cns = c.nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    n => isContainerNode(n)));
    /** @type {?} */
    const len = cns.length;
    for (let i = 0; i < len; i++) {
        /** @type {?} */
        const cn = getNodeContainer((/** @type {?} */ (cns[i])), node);
        if (cn != null) {
            return cn;
        }
    }
    return null;
}
/**
 * @param {?} nodes
 * @param {?} parent
 * @param {?=} ignoreConditionalBranches
 * @return {?}
 */
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches = false) {
    /** @type {?} */
    const entries = nodes
        .filter((/**
     * @param {?} n
     * @return {?}
     */
    n => n.parent === parent.id))
        .sort((/**
     * @param {?} n1
     * @param {?} n2
     * @return {?}
     */
    (n1, n2) => n1.parentNode - n2.parentNode))
        .map((/**
     * @param {?} n
     * @return {?}
     */
    n => {
        /** @type {?} */
        const children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return (/** @type {?} */ ({
            node: n,
            children,
            content: buildFormBuilderNodesContent(nodes, n)
        }));
    }));
    if (!ignoreConditionalBranches) {
        /** @type {?} */
        const entriesNum = entries.length;
        /** @type {?} */
        const cbs = parent.conditionalBranches.length;
        for (let i = entriesNum; i < cbs; i++) {
            entries.push({
                parent: parent,
                parentNode: i
            });
        }
    }
    return entries;
}
/**
 * @param {?} _nodes
 * @param {?} node
 * @return {?}
 */
function buildFormBuilderNodesContent(_nodes, node) {
    if (isContainerNode(node)) {
        return buildFormBuilderNodesSubtree(((/** @type {?} */ (node))).nodes, node, true);
    }
    return [];
}
/**
 * @param {?} nodes
 * @return {?}
 */
function buildFormBuilderNodesTree(nodes) {
    /** @type {?} */
    const rootNodes = nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    n => n.parent == null || n.parent === 0));
    if (rootNodes.length === 1) {
        /** @type {?} */
        const rootNode = rootNodes[0];
        if (isSlidesNode(rootNode)) {
            /** @type {?} */
            const tree = [];
            tree.push((/** @type {?} */ ({
                node: rootNode,
                container: null,
                children: buildFormBuilderNodesSubtree(nodes, rootNode),
                content: buildFormBuilderNodesContent(nodes, rootNode)
            })));
            return tree;
        }
    }
    else if (rootNodes.length === 0) {
        return [null];
    }
    throw new Error('Invalid form definition');
}
/**
 * @param {?} nodes
 * @return {?}
 */
function flattenNodes(nodes) {
    /** @type {?} */
    let flatNodes = [];
    nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    (node) => {
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(((/** @type {?} */ (node))).nodes));
        }
        flatNodes.push(node);
    }));
    return flatNodes;
}
/**
 * @param {?} flatNodes
 * @param {?} parentNode
 * @param {?=} branch
 * @return {?}
 */
function getDescendants(flatNodes, parentNode, branch = null) {
    return branch != null ?
        flatNodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        n => n.parent === parentNode.id && n.parentNode === branch)) :
        flatNodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        n => n.parent === parentNode.id));
}
/**
 * @param {?} nodes
 * @param {?} ids
 * @return {?}
 */
function removeNodes(nodes, ids) {
    /** @type {?} */
    const len = nodes.length;
    for (let i = 0; i < len; i++) {
        /** @type {?} */
        const node = nodes[i];
        if (isContainerNode(node)) {
            /** @type {?} */
            const container = ((/** @type {?} */ (node)));
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    n => ids.indexOf(n.id) === -1));
}
/**
 * @param {?} nodes
 * @param {?} parentNode
 * @param {?=} branch
 * @return {?}
 */
function deleteNodeSubtree(nodes, parentNode, branch = null) {
    /** @type {?} */
    const flatNodes = flattenNodes(nodes);
    /** @type {?} */
    let delNodes = [];
    /** @type {?} */
    let descendants = getDescendants(flatNodes, parentNode, branch);
    /** @type {?} */
    const len = descendants.length;
    for (let i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map((/**
     * @param {?} n
     * @return {?}
     */
    n => n.id)));
}
/** @type {?} */
let nodeUniqueId = 0;
class AjfFormBuilderService {
    constructor() {
        this._availableNodeTypes = [
            {
                label: 'Slide',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-slide' },
                nodeType: { node: AjfNodeType.AjfSlide },
                isSlide: true
            },
            {
                label: 'Repeating slide',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-repeatingslide' },
                nodeType: { node: AjfNodeType.AjfRepeatingSlide },
                isSlide: true
            },
            {
                label: 'String',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-string' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.String }
            },
            {
                label: 'Text',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-text' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Text }
            },
            {
                label: 'Number',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-number' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Number }
            },
            {
                label: 'Boolean',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-boolean' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Boolean }
            },
            {
                label: 'Single choice',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-singlechoice' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.SingleChoice }
            },
            {
                label: 'Multiple choice',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-multiplechoice' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.MultipleChoice }
            },
            {
                label: 'Formula',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-formula' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Formula }
            },
            {
                label: 'Date',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-date' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Date }
            },
            {
                label: 'Date input',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-dateinput' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.DateInput }
            },
            {
                label: 'Time',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-time' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Time }
            },
            {
                label: 'Table',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-table' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Table }
            }
        ];
        this._form = new BehaviorSubject(null);
        this._formObs = this._form.asObservable();
        this._editedNodeEntry = new BehaviorSubject(null);
        this._editedNodeEntryObs = this._editedNodeEntry.asObservable();
        this._editedCondition = new BehaviorSubject(null);
        this._editedConditionObs = this._editedCondition.asObservable();
        this._editedChoicesOrigin = new BehaviorSubject(null);
        this._editedChoicesOriginObs = this._editedChoicesOrigin.asObservable();
        this._beforeNodesUpdate = new EventEmitter();
        this._beforeNodesUpdateObs = this._beforeNodesUpdate.asObservable();
        this._afterNodeUpdate = new EventEmitter();
        this._afterNodeUpdateObs = this._afterNodeUpdate.asObservable();
        this._nodesUpdates = new Subject();
        this._attachmentsOriginsUpdates = new Subject();
        this._choicesOriginsUpdates = new Subject();
        this._stringIdentifierUpdates = new Subject();
        this._saveNodeEntryEvent = new EventEmitter();
        this._deleteNodeEntryEvent = new EventEmitter();
        this._initChoicesOriginsStreams();
        this._initAttachmentsOriginsStreams();
        this._initStringIdentifierStreams();
        this._initNodesStreams();
        this._initFormStreams();
        this._initSaveNode();
        this._initDeleteNode();
    }
    /**
     * Available node types
     *
     * \@readonly
     * \@memberOf AjfFormBuilderService
     * @return {?}
     */
    get availableNodeTypes() { return this._availableNodeTypes; }
    /**
     * Current edited form stream
     *
     * \@readonly
     * \@memberOf AjfFormBuilderService
     * @return {?}
     */
    get form() { return this._formObs; }
    /**
     * @return {?}
     */
    get attachmentsOrigins() {
        return this._attachmentsOrigins;
    }
    /**
     * @return {?}
     */
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    /**
     * @return {?}
     */
    get stringIdentifier() {
        return this._stringIdentifier;
    }
    /**
     * @return {?}
     */
    get nodes() { return this._nodes; }
    /**
     * @return {?}
     */
    get flatNodes() {
        return this._flatNodes;
    }
    /**
     * @return {?}
     */
    get flatFields() { return this._flatFields; }
    /**
     * @return {?}
     */
    get nodeEntriesTree() { return this._nodeEntriesTree; }
    /**
     * @return {?}
     */
    get editedNodeEntry() {
        return this._editedNodeEntryObs;
    }
    /**
     * @return {?}
     */
    get editedCondition() { return this._editedConditionObs; }
    /**
     * @return {?}
     */
    get editedChoicesOrigin() {
        return this._editedChoicesOriginObs;
    }
    /**
     * @return {?}
     */
    get beforeNodesUpdate() { return this._beforeNodesUpdateObs; }
    /**
     * @return {?}
     */
    get afterNodeUpdate() { return this._afterNodeUpdateObs; }
    /**
     * Sets the current edited form
     *
     * \@memberOf AjfFormBuilderService
     * @param {?} form
     *
     * @return {?}
     */
    setForm(form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    }
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    editNodeEntry(nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    }
    /**
     * @param {?} condition
     * @return {?}
     */
    editCondition(condition) {
        this._editedCondition.next(condition);
    }
    /**
     * @param {?} condition
     * @return {?}
     */
    saveCurrentCondition(condition) {
        /** @type {?} */
        let c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    }
    /**
     * @return {?}
     */
    cancelConditionEdit() {
        this._editedChoicesOrigin.next(null);
    }
    /**
     * @param {?} nodeType
     * @param {?} parent
     * @param {?} parentNode
     * @param {?=} inContent
     * @return {?}
     */
    insertNode(nodeType, parent, parentNode, inContent = false) {
        /** @type {?} */
        let node;
        /** @type {?} */
        const id = ++nodeUniqueId;
        /** @type {?} */
        const isFieldNode = nodeType.nodeType.field != null;
        if (isFieldNode) {
            node = createField({
                id,
                nodeType: AjfNodeType.AjfField,
                fieldType: (/** @type {?} */ (nodeType.nodeType.field)),
                parent: parent.id,
                parentNode,
                name: '',
            });
        }
        else {
            node = createContainerNode({
                id,
                nodeType: nodeType.nodeType.node,
                parent: parent != null ? parent.id : 0,
                parentNode,
                name: '',
                nodes: [],
            });
        }
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next((/**
         * @param {?} nodes
         * @return {?}
         */
        (nodes) => {
            if (node.parent === 0) {
                return [node];
            }
            /** @type {?} */
            const cn = isContainerNode(parent) && inContent ?
                ((/** @type {?} */ (parent))) :
                getNodeContainer({ nodes }, parent);
            if (cn != null) {
                if (!isFieldNode) {
                    /** @type {?} */
                    const replaceNodes = cn.nodes === nodes;
                    /** @type {?} */
                    const newNodes = cn.nodes.slice(0);
                    newNodes.push(node);
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                }
                else {
                    cn.nodes.push(node);
                }
            }
            return nodes;
        }));
    }
    /**
     * @param {?} properties
     * @return {?}
     */
    saveNodeEntry(properties) {
        this._saveNodeEntryEvent.emit(properties);
    }
    /**
     * @return {?}
     */
    cancelNodeEntryEdit() {
        this._editedNodeEntry.next(null);
    }
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    deleteNodeEntry(nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
    }
    /**
     * @return {?}
     */
    getCurrentForm() {
        return combineLatest([this.form, this.nodes, this.attachmentsOrigins, this.choicesOrigins, this.stringIdentifier]).pipe(filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([form]) => form != null)), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
            return createForm({
                choicesOrigins: choicesOrigins.slice(0),
                attachmentsOrigins: attachmentsOrigins.slice(0),
                stringIdentifier: (stringIdentifier || []).slice(0),
                nodes: (/** @type {?} */ (nodes.slice(0))),
                supplementaryInformations: (/** @type {?} */ (form)).supplementaryInformations,
            });
        })));
    }
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    editChoicesOrigin(choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    }
    /**
     * @return {?}
     */
    createChoicesOrigin() {
        this._editedChoicesOrigin.next(createChoicesFixedOrigin({ name: '' }));
    }
    /**
     * @return {?}
     */
    cancelChoicesOriginEdit() {
        this._editedChoicesOrigin.next(null);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    saveChoicesOrigin(params) {
        /** @type {?} */
        const choicesOrigin = this._editedChoicesOrigin.getValue();
        if (choicesOrigin != null) {
            choicesOrigin.label = params.label;
            choicesOrigin.name = params.name;
            if (isChoicesFixedOrigin(choicesOrigin)) {
                choicesOrigin.choices = params.choices;
            }
            this._choicesOriginsUpdates.next((/**
             * @param {?} choicesOrigins
             * @return {?}
             */
            (choicesOrigins) => {
                /** @type {?} */
                const idx = choicesOrigins.indexOf(choicesOrigin);
                if (idx > -1) {
                    choicesOrigins = [
                        ...choicesOrigins.slice(0, idx),
                        choicesOrigin,
                        ...choicesOrigins.slice(idx + 1),
                    ];
                }
                else {
                    choicesOrigins = [...choicesOrigins, choicesOrigin];
                }
                return choicesOrigins;
            }));
        }
        this._editedChoicesOrigin.next(null);
    }
    /**
     * @param {?} identifier
     * @return {?}
     */
    saveStringIdentifier(identifier) {
        this._stringIdentifierUpdates.next((/**
         * @return {?}
         */
        () => [...identifier]));
    }
    /**
     * @private
     * @param {?} nodes
     * @param {?=} _curMaxId
     * @return {?}
     */
    _findMaxNodeId(nodes, _curMaxId = 0) {
        /** @type {?} */
        let maxId = 0;
        nodes.forEach((/**
         * @param {?} n
         * @return {?}
         */
        (n) => {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, this._findMaxNodeId(((/** @type {?} */ (n))).nodes));
            }
        }));
        return maxId;
    }
    /**
     * @private
     * @return {?}
     */
    _initFormStreams() {
        this._form
            .subscribe((/**
         * @param {?} form
         * @return {?}
         */
        (form) => {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = this._findMaxNodeId(form.nodes);
            }
            this._nodesUpdates.next((/**
             * @param {?} _nodes
             * @return {?}
             */
            (_nodes) => {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            }));
            this._attachmentsOriginsUpdates.next((/**
             * @param {?} _attachmentsOrigins
             * @return {?}
             */
            (_attachmentsOrigins) => {
                return form != null && form.attachmentsOrigins != null ?
                    form.attachmentsOrigins.slice(0) :
                    [];
            }));
            this._choicesOriginsUpdates.next((/**
             * @param {?} _choicesOrigins
             * @return {?}
             */
            (_choicesOrigins) => {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) :
                    [];
            }));
            this._stringIdentifierUpdates.next((/**
             * @param {?} _
             * @return {?}
             */
            (_) => {
                return form != null && form.stringIdentifier != null
                    ? form.stringIdentifier.slice(0)
                    : [];
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initChoicesOriginsStreams() {
        this._choicesOrigins =
            ((/** @type {?} */ (this._choicesOriginsUpdates)))
                .pipe(scan((/**
             * @param {?} choicesOrigins
             * @param {?} op
             * @return {?}
             */
            (choicesOrigins, op) => {
                return op(choicesOrigins);
            }), []), publishReplay(1), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _initAttachmentsOriginsStreams() {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan((/**
         * @param {?} attachmentsOrigins
         * @param {?} op
         * @return {?}
         */
        (attachmentsOrigins, op) => {
            return op(attachmentsOrigins);
        }), []), publishReplay(1), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _initStringIdentifierStreams() {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan((/**
         * @param {?} stringIdentifier
         * @param {?} op
         * @return {?}
         */
        (stringIdentifier, op) => {
            return op(stringIdentifier);
        }), []), publishReplay(1), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _initNodesStreams() {
        this._nodes = ((/** @type {?} */ (this._nodesUpdates)))
            .pipe(scan((/**
         * @param {?} nodes
         * @param {?} op
         * @return {?}
         */
        (nodes, op) => {
            return op(nodes);
        }), []), publishReplay(1), refCount());
        this._flatNodes = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        (nodes) => flattenNodes(nodes))), publishReplay(1), refCount());
        this._flatFields = this._flatNodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        (nodes) => (/** @type {?} */ (nodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        n => !isContainerNode(n))))))), publishReplay(1), refCount());
        this._nodeEntriesTree = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        nodes => (/** @type {?} */ (buildFormBuilderNodesTree(nodes))))), publishReplay(1), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _initSaveNode() {
        this._saveNodeEntryEvent
            .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter((/**
         * @param {?} __0
         * @return {?}
         */
        ([_, nodeEntry]) => nodeEntry != null)), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([properties, nodeEntry]) => {
            this._beforeNodesUpdate.emit();
            nodeEntry = (/** @type {?} */ (nodeEntry));
            /** @type {?} */
            const origNode = nodeEntry.node;
            /** @type {?} */
            const node = deepCopy(origNode);
            node.id = nodeEntry.node.id;
            node.name = properties.name;
            node.label = properties.label;
            node.visibility = properties.visibility != null ?
                createCondition({ condition: properties.visibility }) :
                null;
            /** @type {?} */
            const oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches = properties.conditionalBranches != null ?
                properties.conditionalBranches.map((/**
                 * @param {?} condition
                 * @return {?}
                 */
                (condition) => createCondition({ condition }))) :
                [alwaysCondition()];
            /** @type {?} */
            const newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                /** @type {?} */
                const repNode = (/** @type {?} */ (node));
                repNode.formulaReps = properties.formulaReps != null ?
                    createFormula({ formula: properties.formulaReps }) :
                    undefined;
                repNode.minReps = properties.minReps;
                repNode.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                /** @type {?} */
                const field = (/** @type {?} */ (node));
                field.description = properties.description;
                field.defaultValue = properties.defaultValue;
                field.formula = properties.formula != null ?
                    createFormula({ formula: properties.formula }) :
                    undefined;
                /** @type {?} */
                const forceValue = properties.value;
                /** @type {?} */
                const notEmpty = properties.notEmpty;
                /** @type {?} */
                const validationConditions = properties.validationConditions;
                /** @type {?} */
                let minValue = parseInt(properties.minValue, 10);
                /** @type {?} */
                let maxValue = parseInt(properties.maxValue, 10);
                /** @type {?} */
                let minDigits = parseInt(properties.minDigits, 10);
                /** @type {?} */
                let maxDigits = parseInt(properties.maxDigits, 10);
                if (isNaN(minValue)) {
                    minValue = null;
                }
                if (isNaN(maxValue)) {
                    maxValue = null;
                }
                if (isNaN(minDigits)) {
                    minDigits = null;
                }
                if (isNaN(maxDigits)) {
                    maxDigits = null;
                }
                if (forceValue != null || notEmpty != null ||
                    (validationConditions != null && validationConditions.length > 0) ||
                    minValue != null || maxValue != null || minDigits != null ||
                    maxDigits != null) {
                    /** @type {?} */
                    const validation = field.validation || createValidationGroup({});
                    validation.forceValue = forceValue;
                    validation.notEmpty = notEmpty ? notEmptyValidation() : undefined;
                    validation.minValue = minValue != null ? minValidation(minValue) : undefined;
                    validation.maxValue = maxValue != null ? maxValidation(maxValue) : undefined;
                    validation.minDigits =
                        minDigits != null ? minDigitsValidation(minDigits) : undefined;
                    validation.maxDigits =
                        maxDigits != null ? maxDigitsValidation(maxDigits) : undefined;
                    validation.conditions =
                        (validationConditions ||
                            []).map((/**
                         * @param {?} c
                         * @return {?}
                         */
                        (c) => createValidation({
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        })));
                    field.validation = validation;
                }
                else {
                    field.validation = undefined;
                }
                /** @type {?} */
                const notEmptyWarn = properties.notEmptyWarning;
                /** @type {?} */
                const warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    /** @type {?} */
                    const warning = field.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions =
                        (warningConditions ||
                            []).map((/**
                         * @param {?} w
                         * @return {?}
                         */
                        (w) => createWarning({
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        })));
                    field.warning = warning;
                }
                else {
                    field.warning = undefined;
                }
                field.nextSlideCondition = properties.nextSlideCondition != null ?
                    createCondition({ condition: properties.nextSlideCondition }) :
                    undefined;
                field.size = properties.size;
                field.defaultValue = properties.defaultValue;
                if (isFieldWithChoices(field)) {
                    /** @type {?} */
                    const fwc = (/** @type {?} */ (field));
                    ((/** @type {?} */ (fwc))).choicesOriginRef = properties.choicesOriginRef;
                    fwc.forceExpanded = properties.forceExpanded;
                    fwc.forceNarrow = properties.forceNarrow;
                    fwc.triggerConditions = (properties.triggerConditions ||
                        []).map((/**
                     * @param {?} t
                     * @return {?}
                     */
                    (t) => createCondition({ condition: t })));
                }
            }
            this._editedNodeEntry.next(null);
            return (/**
             * @param {?} nodes
             * @return {?}
             */
            (nodes) => {
                /** @type {?} */
                let cn = getNodeContainer({ nodes }, origNode);
                if (cn != null) {
                    // TODO: @trik check this, was always true?
                    // if (cn instanceof AjfNode) {
                    /** @type {?} */
                    const replaceNodes = cn.nodes === nodes;
                    /** @type {?} */
                    const idx = cn.nodes.indexOf(origNode);
                    /** @type {?} */
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes.push(node);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                    // } else {
                    //   const idx = nodes.indexOf(origNode);
                    //   nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
                    // }
                    if (newConditionalBranches < oldConditionalBranches) {
                        for (let i = newConditionalBranches; i < oldConditionalBranches; i++) {
                            nodes = deleteNodeSubtree(nodes, node, i);
                        }
                    }
                }
                return nodes;
            });
        })))
            .subscribe(this._nodesUpdates);
    }
    /**
     * @private
     * @return {?}
     */
    _initDeleteNode() {
        ((/** @type {?} */ (this._deleteNodeEntryEvent))).pipe(map((/**
         * @param {?} nodeEntry
         * @return {?}
         */
        (nodeEntry) => {
            this._beforeNodesUpdate.emit();
            return (/**
             * @param {?} nodes
             * @return {?}
             */
            (nodes) => {
                /** @type {?} */
                const node = nodeEntry.node;
                /** @type {?} */
                let cn = getNodeContainer({ nodes }, node);
                if (cn != null) {
                    /** @type {?} */
                    const replaceNodes = cn.nodes === nodes;
                    /** @type {?} */
                    const idx = cn.nodes.indexOf(node);
                    /** @type {?} */
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                    nodes = deleteNodeSubtree(nodes, node);
                }
                return nodes;
            });
        }))).subscribe(this._nodesUpdates);
    }
}
AjfFormBuilderService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AjfFormBuilderService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbChoicesOriginEditorDialog {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._choicesOrigin = this._service.editedChoicesOrigin.pipe(filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c != null)), map((/**
         * @param {?} c
         * @return {?}
         */
        c => (/** @type {?} */ (c)))));
    }
    /**
     * @return {?}
     */
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    /**
     * @return {?}
     */
    saveChoicesOrigin() {
        this._service.saveChoicesOrigin({
            label: this.editor.label,
            name: this.editor.name,
            choices: this.editor.choicesArr
        });
    }
    /**
     * @return {?}
     */
    cancelChoicesOriginEdit() {
        this._service.cancelChoicesOriginEdit();
    }
}
AjfFbChoicesOriginEditorDialog.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-choices-origin-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit choices origin</h3><mat-dialog-content><ajf-fb-choices-origin-editor [choicesOrigin]=\"choicesOrigin|async\"></ajf-fb-choices-origin-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveChoicesOrigin()\">Save</button> <button mat-button translate (click)=\"cancelChoicesOriginEdit()\">Close</button></mat-dialog-actions>",
                styles: [""],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbChoicesOriginEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbChoicesOriginEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbChoicesOriginEditor, { static: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbConditionEditor {
    /**
     * @param {?} _
     */
    constructor(_) { }
    /**
     * @return {?}
     */
    get fields() { return this._fields; }
    /**
     * @param {?} fields
     * @return {?}
     */
    set fields(fields) {
        this._fields = fields;
        this._updateVariables();
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
            this.editedValue = editor.getValue();
        }
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
        this._updateVariables();
        this._updateFunctions();
    }
    /**
     * @private
     * @return {?}
     */
    _updateVariables() {
        if (this._fields == null) {
            return;
        }
        try {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-variables.d.ts'] =
                this._fields
                    .map((/**
                 * @param {?} field
                 * @return {?}
                 */
                (field) => {
                    return `declare const ${field.name}: ${this._fieldVarType(field.fieldType)};`;
                }))
                    .join('\n');
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
}
AjfFbConditionEditor.decorators = [
    { type: Component, args: [{selector: 'ajf-condition-editor',
                template: "<div class=\"ajf-editor\"><ajf-monaco-editor (init)=\"onEditorInit()\" (valueChange)=\"editedValue = $event\" [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor></div><div class=\"ajf-editor-panel\"><mat-nav-list dense *ngIf=\"fields?.length > 0\"><a mat-list-item (click)=\"insertVariable(field.name)\" [matTooltip]=\"field.label\" *ngFor=\"let field of fields\"><ajf-node-icon [node]=\"field\"></ajf-node-icon>{{ field.name }}</a></mat-nav-list></div>",
                styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
AjfFbConditionEditor.ctorParameters = () => [
    { type: AjfValidationService }
];
AjfFbConditionEditor.propDecorators = {
    monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: true },] }],
    fields: [{ type: Input }],
    condition: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbConditionEditorDialog {
    /**
     * @param {?} service
     * @param {?} dialogRef
     */
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        (fields) => fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        (f1, f2) => f1.name.localeCompare(f2.name))))));
    }
    /**
     * @return {?}
     */
    get fields() { return this._fields; }
    /**
     * @return {?}
     */
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
        const newValue = this.editor.editedValue;
        this.dialogRef.close(newValue);
    }
}
AjfFbConditionEditorDialog.decorators = [
    { type: Component, args: [{selector: 'ajf-condition-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit condition</h3><mat-dialog-content><ajf-condition-editor [fields]=\"fields|async\" [condition]=\"condition\"></ajf-condition-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveCondition()\">Save</button> <button mat-button translate matDialogClose>Close</button></mat-dialog-actions>",
                styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbStringIdentifierDialogComponent {
    /**
     * @param {?} _service
     * @param {?} _cdr
     */
    constructor(_service, _cdr) {
        this._service = _service;
        this._cdr = _cdr;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'value', 'delete'];
        this.separatorKeysCodes = [ENTER, COMMA];
        this._stringIdentifierSub = Subscription.EMPTY;
        this._stringIdentifierSub = _service.stringIdentifier.subscribe((/**
         * @param {?} identifier
         * @return {?}
         */
        identifier => {
            this.dataSource.data = [...identifier];
        }));
        this.fields$ = _service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        fields => fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        (f1, f2) => f1.name.localeCompare(f2.name))).map((/**
         * @param {?} f
         * @return {?}
         */
        f => f.name))
            .filter((/**
         * @param {?} f
         * @return {?}
         */
        f => f.length > 0)))), shareReplay(1));
    }
    /**
     * @return {?}
     */
    addRow() {
        this.dataSource.data = [...this.dataSource.data, { label: '', value: [] }];
    }
    /**
     * @param {?} rowIdx
     * @return {?}
     */
    deleteRow(rowIdx) {
        this.dataSource.data = [
            ...this.dataSource.data.slice(0, rowIdx),
            ...this.dataSource.data.slice(rowIdx + 1),
        ];
    }
    /**
     * @param {?} row
     * @param {?} evt
     * @param {?} valueInput
     * @return {?}
     */
    addValue(row, evt, valueInput) {
        if (evt.value.length === 0) {
            return;
        }
        row.value = [...row.value, evt.value];
        valueInput.value = '';
        this._cdr.markForCheck();
    }
    /**
     * @param {?} row
     * @param {?} value
     * @return {?}
     */
    removeValue(row, value) {
        /** @type {?} */
        const idx = row.value.indexOf(value);
        if (idx > -1) {
            row.value = [
                ...row.value.slice(0, idx),
                ...row.value.slice(idx + 1),
            ];
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._stringIdentifierSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    saveStringIdentifier() {
        this._service.saveStringIdentifier(this.dataSource.data);
    }
    /**
     * @param {?} row
     * @param {?} evt
     * @return {?}
     */
    selected(row, evt) {
        row.value = [...row.value, evt.option.value];
        this._cdr.markForCheck();
    }
}
AjfFbStringIdentifierDialogComponent.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-string-identifier-dialog',
                template: "<h3 matDialogTitle translate>Edit identifier</h3><mat-dialog-content><button (click)=\"addRow()\" mat-button><mat-icon>add</mat-icon><span translate>Add value</span></button><mat-table [dataSource]=\"dataSource\"><ng-container matColumnDef=\"label\"><mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><mat-form-field><input matInput [placeholder]=\"'Label'|translate\" autofocus [(ngModel)]=\"row.label\"></mat-form-field></mat-cell></ng-container><ng-container matColumnDef=\"value\"><mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><mat-form-field><mat-chip-list #chipList><mat-chip *ngFor=\"let field of row.value\" (removed)=\"removeValue(row, field)\">{{ field }}<mat-icon matChipRemove>cancel</mat-icon></mat-chip></mat-chip-list><input #valueInput [ngModel]=\"row.value\" [matAutocomplete]=\"valueAc\" [matChipInputFor]=\"chipList\" [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" [matChipInputAddOnBlur]=\"true\" (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\" [placeholder]=\"'Value'|translate\"><mat-autocomplete #valueAc=\"matAutocomplete\" (optionSelected)=\"selected(row, $event)\"><mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\">{{field}}</mat-option></mat-autocomplete></mat-form-field></mat-cell></ng-container><ng-container matColumnDef=\"delete\"><mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon></mat-cell></ng-container><mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row><mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row></mat-table></mat-dialog-content><mat-dialog-actions><button mat-button translate matDialogClose (click)=\"saveStringIdentifier()\">Save</button></mat-dialog-actions>",
                styles: [""],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfFbStringIdentifierDialogComponent.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormBuilder {
    /**
     * @param {?} _service
     * @param {?} _dialog
     */
    constructor(_service, _dialog) {
        this._service = _service;
        this._dialog = _dialog;
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._stringIdentifierSub = Subscription.EMPTY;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub = this._service.editedCondition
            .subscribe((/**
         * @param {?} condition
         * @return {?}
         */
        (condition) => {
            if (this._editConditionDialog != null) {
                this._editConditionDialog.close();
                this._editConditionDialog = null;
            }
            if (condition != null) {
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
            }
        }));
        this._editChoicesOriginSub =
            this._service.editedChoicesOrigin.subscribe((/**
             * @param {?} choicesOrigin
             * @return {?}
             */
            (choicesOrigin) => {
                if (this._editChoicesOriginDialog != null) {
                    this._editChoicesOriginDialog.close();
                    this._editChoicesOriginDialog = null;
                }
                if (choicesOrigin != null) {
                    this._editChoicesOriginDialog =
                        this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                }
            }));
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        }));
        this.nodeEntriesTree
            .pipe(sample(((/** @type {?} */ (this._vc)))))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.designerCont == null) {
                return;
            }
            this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
        }));
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe((/**
         * @return {?}
         */
        () => { }));
    }
    /**
     * @return {?}
     */
    get form() { return this._form; }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        if (this._form !== form) {
            this._form = form;
            if (this._init) {
                this._setCurrentForm();
            }
        }
    }
    /**
     * @return {?}
     */
    get nodeTypes() { return this._nodeTypes; }
    /**
     * @return {?}
     */
    get nodeEntriesTree() { return this._nodeEntriesTree; }
    /**
     * @return {?}
     */
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._vc.emit();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._setCurrentForm();
        this._init = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
    }
    /**
     * @return {?}
     */
    createChoicesOrigin() {
        this._service.createChoicesOrigin();
    }
    /**
     * @return {?}
     */
    disableDropPredicate() {
        return false;
    }
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    editChoicesOrigin(choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    }
    /**
     * @return {?}
     */
    editStringIdentifier() {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog =
            this._dialog.open(AjfFbStringIdentifierDialogComponent, {
                disableClose: true,
                width: '60%',
                height: '60%'
            });
    }
    /**
     * @private
     * @return {?}
     */
    _setCurrentForm() {
        this._service.setForm(this._form);
    }
}
AjfFormBuilder.decorators = [
    { type: Component, args: [{selector: 'ajf-form-builder',
                template: "<mat-toolbar><button mat-icon-button (click)=\"leftSidenav.toggle()\"><mat-icon>add_box</mat-icon></button> <button mat-button [matMenuTriggerFor]=\"choicesMenu\" translate>Choices</button> <button mat-button (click)=\"editStringIdentifier()\" translate>Identifier</button><mat-menu #choicesMenu><button (click)=\"createChoicesOrigin()\" mat-menu-item translate>New..</button><ng-container *ngIf=\"choicesOrigins|async as cos\"><button *ngFor=\"let choicesOrigin of cos\" (click)=\"editChoicesOrigin(choicesOrigin)\" mat-menu-item>{{ choicesOrigin.label || choicesOrigin.name }}</button></ng-container></mat-menu><span class=\"ajf-spacer\"></span> <button mat-icon-button (click)=\"rightSidenav.toggle()\"><mat-icon>settings</mat-icon></button></mat-toolbar><mat-drawer-container cdkDropListGroup><mat-drawer #leftSidenav position=\"start\" mode=\"over\"><div #sourceDropList cdkDropList [cdkDropListEnterPredicate]=\"disableDropPredicate\" [cdkDropListData]=\"nodeTypes\"><ajf-fb-node-type-entry *ngFor=\"let nodeType of nodeTypes\" cdkDrag [cdkDragData]=\"nodeType\" (cdkDragStarted)=\"leftSidenav.close()\" [nodeType]=\"nodeType\"></ajf-fb-node-type-entry></div></mat-drawer><mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\"><ajf-fb-node-properties></ajf-fb-node-properties></mat-drawer><div #designer class=\"ajf-designer\"><ajf-fb-node-entry *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\" [isFirst]=\"isFirst\" [nodeEntry]=\"nodeEntry\"></ajf-fb-node-entry></div></mat-drawer-container>",
                styles: ["ajf-form-builder{display:flex;position:relative;min-height:300px;flex-direction:column;align-items:stretch}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{flex:1}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
AjfFormBuilder.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog }
];
AjfFormBuilder.propDecorators = {
    designerCont: [{ type: ViewChild, args: ['designer', { static: true },] }],
    form: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548',
];
class AjfFbNodeEntry {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._level = 0;
        this._branchColors = branchColors.slice(0);
        this._dropZones = ['fbdz-node'];
        this._slideDropZones = ['fbdz-slide'];
        this._originOffset = 0;
        this._originLeftMargin = '0';
        this._firstBranchColor = branchColors[0];
        this._branchLinesSubscription = Subscription.EMPTY;
        this._childEntriesSubscription = Subscription.EMPTY;
        this._currentEditedNode = this._service.editedNodeEntry;
    }
    /**
     * @return {?}
     */
    get hasContent() { return this._hasContent; }
    /**
     * @return {?}
     */
    get isFirst() { return this._isFirst; }
    /**
     * @param {?} isFirst
     * @return {?}
     */
    set isFirst(isFirst) { this._isFirst = isFirst; }
    /**
     * @return {?}
     */
    get isNodeEntry() { return this._isNodeEntry; }
    /**
     * @return {?}
     */
    get nodeEntry() { return this._nodeEntry; }
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    set nodeEntry(nodeEntry) {
        this._nodeEntry = nodeEntry;
        if (nodeEntry != null && ((/** @type {?} */ (nodeEntry))).node !== void 0) {
            /** @type {?} */
            const ne = (/** @type {?} */ (nodeEntry));
            this._isNodeEntry = true;
            /** @type {?} */
            const node = ne.node;
            this._hasContent = node != null && isContainerNode(node);
        }
        else {
            this._isNodeEntry = false;
            this._hasContent = false;
        }
    }
    /**
     * @return {?}
     */
    get level() { return this._level; }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) { this._level = value; }
    /**
     * @return {?}
     */
    get realNodeEntry() {
        return (/** @type {?} */ (this._nodeEntry));
    }
    /**
     * @return {?}
     */
    get branchColors() { return this._branchColors; }
    /**
     * @return {?}
     */
    get dropZones() { return this._dropZones; }
    /**
     * @return {?}
     */
    get slideDropZones() { return this._slideDropZones; }
    /**
     * @return {?}
     */
    get originOffset() { return this._originOffset; }
    /**
     * @param {?} originOffset
     * @return {?}
     */
    set originOffset(originOffset) {
        this._originOffset = originOffset;
        this._originLeftMargin = `${this._originOffset * 4}px`;
    }
    /**
     * @return {?}
     */
    get originLeftMargin() { return this._originLeftMargin; }
    /**
     * @return {?}
     */
    get firstBranchColor() { return this._firstBranchColor; }
    /**
     * @param {?} firstBranchColor
     * @return {?}
     */
    set firstBranchColor(firstBranchColor) {
        /** @type {?} */
        const idx = branchColors.indexOf(firstBranchColor);
        if (idx > 0) {
            this._firstBranchColor = firstBranchColor;
            this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
        }
        else {
            this._firstBranchColor = branchColors[0];
            this._branchColors = branchColors.slice(0);
        }
    }
    /**
     * @return {?}
     */
    get currentEditedNode() {
        return this._currentEditedNode;
    }
    /**
     * @return {?}
     */
    onResize() {
    }
    /**
     * @return {?}
     */
    edit() {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry((/** @type {?} */ (this.nodeEntry)));
    }
    /**
     * @return {?}
     */
    delete() {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry((/** @type {?} */ (this.nodeEntry)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout((/**
         * @return {?}
         */
        () => this._updateBranchHeights()));
        this._childEntriesSubscription = this.childEntries.changes
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._updateBranchHeights();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    }
    /**
     * @param {?} evt
     * @param {?=} content
     * @return {?}
     */
    onDropSuccess(evt, content = false) {
        /** @type {?} */
        const dd = (/** @type {?} */ (evt.item.data));
        if (this._nodeEntry == null) {
            this._service.insertNode(dd, (/** @type {?} */ (null)), 0, content);
            return;
        }
        if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
            /** @type {?} */
            const emptySlot = content ?
                { parent: ((/** @type {?} */ (this.nodeEntry))).node, parentNode: 0 } :
                (/** @type {?} */ (this._nodeEntry));
            this._service.insertNode((/** @type {?} */ (dd)), emptySlot.parent, emptySlot.parentNode, content);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    disableSlideDropPredicate(item) {
        return !item.data.isSlide;
    }
    /**
     * @return {?}
     */
    emptyAreaDropPredicate() {
        return (/**
         * @param {?} item
         * @param {?} _drop
         * @return {?}
         */
        (item, _drop) => {
            if (this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        });
    }
    /**
     * @private
     * @return {?}
     */
    _updateBranchHeights() {
        if (this.nodeEntry == null || !this.isNodeEntry
            || this.branchLines == null || this.childEntries == null) {
            return;
        }
        /** @type {?} */
        const nodeEntry = (/** @type {?} */ (this.nodeEntry));
        /** @type {?} */
        const branchLines = this.branchLines.toArray();
        /** @type {?} */
        const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
        /** @type {?} */
        const childEntries = this.childEntries.toArray().slice(sliceIdx);
        if (branchLines.length != childEntries.length) {
            return;
        }
        branchLines.forEach((/**
         * @param {?} bl
         * @param {?} idx
         * @return {?}
         */
        (bl, idx) => {
            /** @type {?} */
            const ce = childEntries[idx];
            bl.height = ce.nativeElement.offsetTop;
        }));
    }
}
AjfFbNodeEntry.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-node-entry',
                template: "<ng-container *ngIf=\"nodeEntry != null ; else rootEmpty\"><ng-template [ngIf]=\"isNodeEntry\"><ajf-fb-branch-line *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\" [offset]=\"idx\" [color]=\"branchColors[idx]\"></ajf-fb-branch-line></ng-template><div class=\"mat-card-container\" [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\"><div *ngIf=\"!isFirst\" class=\"ajf-origin-line\" [style.margin-left]=\"originLeftMargin\" [style.border-color]=\"firstBranchColor\"></div><ng-template [ngIf]=\"isNodeEntry\"><mat-card><div class=\"ajf-title-row\"><ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon><span class=\"ajf-title\" [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | translate\"></span> <span class=\"ajf-actions\"><button [disabled]=\"currentEditedNode|async\" (click)=\"edit()\" mat-icon-button><mat-icon>edit</mat-icon></button> <button [disabled]=\"currentEditedNode|async\" (click)=\"delete()\" mat-icon-button><mat-icon>delete</mat-icon></button></span></div><div *ngIf=\"hasContent\"><ajf-fb-node-entry *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\" [level]=\"level + 1\" [isFirst]=\"isFirstChild\" [firstBranchColor]=\"branchColors[idx]\" [nodeEntry]=\"contentEntry\"></ajf-fb-node-entry><mat-card class=\"ajf-empty\" *ngIf=\"realNodeEntry.content.length === 0\" cdkDropList [cdkDropListEnterPredicate]=\"disableSlideDropPredicate\" (cdkDropListDropped)=\"onDropSuccess($event, true)\">&nbsp;</mat-card></div></mat-card></ng-template><ng-template [ngIf]=\"!isNodeEntry\"><mat-card class=\"ajf-empty\" cdkDropList [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\" (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card></ng-template></div><ng-template [ngIf]=\"isNodeEntry\"><ajf-fb-node-entry *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\" [level]=\"level\" [originOffset]=\"idx\" [firstBranchColor]=\"branchColors[idx]\" [nodeEntry]=\"childNodeEntry\"></ajf-fb-node-entry></ng-template></ng-container><ng-template #rootEmpty><div class=\"mat-card-container\"><mat-card class=\"ajf-empty\" cdkDropList [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\" (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card></div></ng-template>",
                styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}"],
                host: {
                    '(window.resize)': 'onResize()'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbNodeEntry.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbNodeEntry.propDecorators = {
    branchLines: [{ type: ViewChildren, args: [AjfFbBranchLine,] }],
    childEntries: [{ type: ViewChildren, args: [AjfFbNodeEntry, { read: ElementRef },] }],
    isFirst: [{ type: Input }],
    nodeEntry: [{ type: Input }],
    level: [{ type: Input }],
    originOffset: [{ type: Input }],
    firstBranchColor: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbValidationConditionEditorDialog {
    /**
     * @param {?} service
     * @param {?} dialogRef
     */
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        (fields) => fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        (f1, f2) => f1.name.localeCompare(f2.name))))));
    }
    /**
     * @return {?}
     */
    get fields() { return this._fields; }
    /**
     * @return {?}
     */
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
        const newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
    }
}
AjfFbValidationConditionEditorDialog.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-validation-condition-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit condition</h3><mat-dialog-content><mat-form-field><input matInput [(ngModel)]=\"errorMessage\" [placeholder]=\"'Error message' | translate\"></mat-form-field><ajf-condition-editor [fields]=\"fields|async\" [condition]=\"condition\"></ajf-condition-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveCondition()\">Save</button> <button mat-button translate matDialogClose>Close</button></mat-dialog-actions>",
                styles: ["ajf-fb-validation-condition-editor-dialog mat-dialog-content{overflow:visible}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbValidationConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbValidationConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbWarningConditionEditorDialog {
    /**
     * @param {?} service
     * @param {?} dialogRef
     */
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        (fields) => fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        (f1, f2) => f1.name.localeCompare(f2.name))))));
    }
    /**
     * @return {?}
     */
    get fields() { return this._fields; }
    /**
     * @return {?}
     */
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
        const newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    }
}
AjfFbWarningConditionEditorDialog.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-warning-condition-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit condition</h3><mat-dialog-content><mat-form-field><input matInput [(ngModel)]=\"warningMessage\" [placeholder]=\"'Warning message' | translate\"></mat-form-field><ajf-condition-editor [fields]=\"fields|async\" [condition]=\"condition\"></ajf-condition-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveCondition()\">Save</button> <button mat-button translate matDialogClose>Close</button></mat-dialog-actions>",
                styles: ["ajf-fb-warning-condition-editor-dialog mat-dialog-content{overflow:visible}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbWarningConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbWarningConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} c
 * @return {?}
 */
function checkRepsValidity(c) {
    /** @type {?} */
    const minReps = c.value.minReps;
    /** @type {?} */
    const maxReps = c.value.maxReps;
    if (minReps != null && maxReps != null && minReps > maxReps) {
        return {
            reps: 'Min repetions cannot be greater than max repetitions'
        };
    }
    return null;
}
/**
 * @param {?} c
 * @return {?}
 */
function checkValueLimitsValidity(c) {
    /** @type {?} */
    const minValue = c.value.minValue;
    /** @type {?} */
    const maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return {
            valueLimit: 'Min value cannot be greater than max value'
        };
    }
    return null;
}
/**
 * @param {?} c
 * @return {?}
 */
function checkDigitsValidity(c) {
    /** @type {?} */
    const minDigits = c.value.minDigits;
    /** @type {?} */
    const maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return {
            digits: 'Min digits cannot be greater than max digits'
        };
    }
    return null;
}
class AjfFbNodeProperties {
    /**
     * @param {?} _service
     * @param {?} _dialog
     * @param {?} _fb
     */
    constructor(_service, _dialog, _fb) {
        this._service = _service;
        this._dialog = _dialog;
        this._fb = _fb;
        this._fieldSizes = [
            { label: 'Normal', value: 'normal' },
            { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' },
            { label: 'Tiny', value: 'tiny' },
            { label: 'Mini', value: 'mini' }
        ];
        this._choicesOrigins = [];
        this._conditionalBranches = [];
        this._validationConditions = [];
        this._warningConditions = [];
        this.isRepeatingContainerNode = isRepeatingContainerNode;
        this._visibilitySub = Subscription.EMPTY;
        this._conditionalBranchesSub = Subscription.EMPTY;
        this._formulaRepsSub = Subscription.EMPTY;
        this._choicesFilterSub = Subscription.EMPTY;
        this._formulaSub = Subscription.EMPTY;
        this._forceValueSub = Subscription.EMPTY;
        this._validationConditionsSub = Subscription.EMPTY;
        this._warningConditionsSub = Subscription.EMPTY;
        this._nextSlideConditionSub = Subscription.EMPTY;
        this._choicesOriginsSub = Subscription.EMPTY;
        this._triggerConditionsSub = Subscription.EMPTY;
        this._editConditionDialogSub = Subscription.EMPTY;
        this._editValidationConditionDialogSub = Subscription.EMPTY;
        this._editWarningConditionDialogSub = Subscription.EMPTY;
        this._editVisibilityEvt = new EventEmitter();
        this._editVisibilitySub = Subscription.EMPTY;
        this._editConditionalBranchEvt = new EventEmitter();
        this._editConditionalBranchSub = Subscription.EMPTY;
        this._editFormulaRepsEvt = new EventEmitter();
        this._editFormulaRepsSub = Subscription.EMPTY;
        this._editChoicesFilterEvt = new EventEmitter();
        this._editChoicesFilterSub = Subscription.EMPTY;
        this._editFormulaEvt = new EventEmitter();
        this._editFormulaSub = Subscription.EMPTY;
        this._editForceValueEvt = new EventEmitter();
        this._editForceValueSub = Subscription.EMPTY;
        this._editValidationConditionEvt = new EventEmitter();
        this._editValidationConditionSub = Subscription.EMPTY;
        this._addValidationConditionEvt = new EventEmitter();
        this._addValidationConditionSub = Subscription.EMPTY;
        this._removeValidationConditionEvt = new EventEmitter();
        this._removeValidationConditionSub = Subscription.EMPTY;
        this._editWarningConditionEvt = new EventEmitter();
        this._editWarningConditionSub = Subscription.EMPTY;
        this._addWarningConditionEvt = new EventEmitter();
        this._addWarningConditionSub = Subscription.EMPTY;
        this._removeWarningConditionEvt = new EventEmitter();
        this._removeWarningConditionSub = Subscription.EMPTY;
        this._editNextSlideConditionEvt = new EventEmitter();
        this._editNextSlideConditionSub = Subscription.EMPTY;
        this._editTriggerConditionEvt = new EventEmitter();
        this._editTriggerConditionSub = Subscription.EMPTY;
        this._addTriggerConditionEvt = new EventEmitter();
        this._addTriggerConditionSub = Subscription.EMPTY;
        this._removeTriggerConditionEvt = new EventEmitter();
        this._removeTriggerConditionSub = Subscription.EMPTY;
        this._saveEvt = new EventEmitter();
        this._saveSub = Subscription.EMPTY;
        this._nodeEntry = _service.editedNodeEntry;
        this._choicesOriginsSub = _service.choicesOrigins
            .subscribe((/**
         * @param {?} c
         * @return {?}
         */
        (c) => this._choicesOrigins = c || []));
        this._enabled = this._nodeEntry.pipe(map((/**
         * @param {?} n
         * @return {?}
         */
        (n) => n != null)));
        this._initForm();
        this._initVisibilityEdit();
        this._initConditionalBranchEdit();
        this._initFormulaRepsEdit();
        this._initChoicesFilterEdit();
        this._initFormulaEdit();
        this._initForceValueEdit();
        this._initValidationConditionEdit();
        this._initAddValidationCondition();
        this._initRemoveValidationCondition();
        this._initWarningConditionEdit();
        this._initAddWarningCondition();
        this._initRemoveWarningCondition();
        this._initNextSlideConditionEdit();
        this._initTriggerConditionEdit();
        this._initAddTriggerCondition();
        this._initRemoveTriggerCondition();
        this._initSave();
    }
    /**
     * @return {?}
     */
    get fieldSizes() { return this._fieldSizes; }
    /**
     * @return {?}
     */
    get nodeEntry() { return this._nodeEntry; }
    /**
     * @return {?}
     */
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    /**
     * @return {?}
     */
    get enabled() { return this._enabled; }
    /**
     * @return {?}
     */
    get propertiesForm() { return this._propertiesForm; }
    /**
     * @return {?}
     */
    get hasChoices() { return this._hasChoices; }
    /**
     * @return {?}
     */
    get curVisibility() { return this._curVisibility; }
    /**
     * @return {?}
     */
    get curFormulaReps() { return this._curFormulaReps; }
    /**
     * @return {?}
     */
    get curChoicesFilter() { return this._curChoicesFilter; }
    /**
     * @return {?}
     */
    get curForceValue() { return this._curForceValue; }
    /**
     * @return {?}
     */
    get curFormula() { return this._curFormula; }
    /**
     * @return {?}
     */
    get conditionalBranches() { return this._conditionalBranches; }
    /**
     * @return {?}
     */
    get validationConditions() { return this._validationConditions; }
    /**
     * @return {?}
     */
    get warningConditions() { return this._warningConditions; }
    /**
     * @return {?}
     */
    get nextSlideCondition() { return this._nextSlideCondition; }
    /**
     * @return {?}
     */
    get triggerConditions() { return this._triggerConditions; }
    /**
     * @return {?}
     */
    editVisibility() {
        this._editVisibilityEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editConditionalBranch(idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    editFormulaReps() {
        this._editFormulaRepsEvt.emit();
    }
    /**
     * @return {?}
     */
    editChoicesFilter() {
        this._editChoicesFilterEvt.emit();
    }
    /**
     * @return {?}
     */
    editFormula() {
        this._editFormulaEvt.emit();
    }
    /**
     * @return {?}
     */
    editForceValue() {
        this._editForceValueEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    addValidationCondition() {
        this._addValidationConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    addWarningCondition() {
        this._addWarningConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    editNextSlideCondition() {
        this._editNextSlideConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    addTriggerCondition() {
        this._addTriggerConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isField(node) {
        return isField(node);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isNumericField(node) {
        return isField(node) && isNumberField((/** @type {?} */ (node)));
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isFieldWithChoices(node) {
        return isField(node) && isFieldWithChoices((/** @type {?} */ (node)));
    }
    /**
     * @return {?}
     */
    save() {
        this._saveEvt.emit();
    }
    /**
     * @return {?}
     */
    cancel() {
        this._service.cancelNodeEntryEdit();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._choicesOriginsSub.unsubscribe();
        this._visibilitySub.unsubscribe();
        this._formulaRepsSub.unsubscribe();
        this._choicesFilterSub.unsubscribe();
        this._formulaSub.unsubscribe();
        this._forceValueSub.unsubscribe();
        this._validationConditionsSub.unsubscribe();
        this._warningConditionsSub.unsubscribe();
        this._triggerConditionsSub.unsubscribe();
        this._editConditionDialogSub.unsubscribe();
        this._editValidationConditionDialogSub.unsubscribe();
        this._editWarningConditionDialogSub.unsubscribe();
        this._editChoicesFilterSub.unsubscribe();
        this._editConditionalBranchSub.unsubscribe();
        this._editVisibilitySub.unsubscribe();
        this._editFormulaRepsSub.unsubscribe();
        this._editFormulaSub.unsubscribe();
        this._editForceValueSub.unsubscribe();
        this._editValidationConditionSub.unsubscribe();
        this._editWarningConditionSub.unsubscribe();
        this._nextSlideConditionSub.unsubscribe();
        this._addTriggerConditionSub.unsubscribe();
        this._addValidationConditionSub.unsubscribe();
        this._addWarningConditionSub.unsubscribe();
        this._editNextSlideConditionSub.unsubscribe();
        this._editTriggerConditionSub.unsubscribe();
        this._removeTriggerConditionSub.unsubscribe();
        this._removeValidationConditionSub.unsubscribe();
        this._removeWarningConditionSub.unsubscribe();
        this._saveSub.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _initSave() {
        this._saveSub = this._saveEvt.pipe(withLatestFrom(this.propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            /** @type {?} */
            const val = Object.assign({}, fg.value, { conditionalBranches: this._conditionalBranches });
            this._service.saveNodeEntry(val);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initForm() {
        this._propertiesForm = this._nodeEntry.pipe(filter((/**
         * @param {?} n
         * @return {?}
         */
        (n) => n != null)), map((/**
         * @param {?} n
         * @return {?}
         */
        (n) => {
            if (this._visibilitySub != null) {
                this._visibilitySub.unsubscribe();
            }
            if (this._conditionalBranchesSub != null) {
                this._conditionalBranchesSub.unsubscribe();
            }
            n = (/** @type {?} */ (n));
            /** @type {?} */
            const visibility = n.node.visibility != null ?
                n.node.visibility.condition : null;
            /** @type {?} */
            const visibilityOpt = n.node.visibility != null ?
                this._guessVisibilityOpt(n.node.visibility) : null;
            /** @type {?} */
            let controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            /** @type {?} */
            const validators = [];
            if (isRepeatingContainerNode(n.node)) {
                /** @type {?} */
                const rn = (/** @type {?} */ (n.node));
                /** @type {?} */
                const formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (this.isField(n.node)) {
                /** @type {?} */
                const field = (/** @type {?} */ (n.node));
                /** @type {?} */
                let forceValue = null;
                /** @type {?} */
                let notEmpty = false;
                /** @type {?} */
                let validationConditions = [];
                if (field.validation != null) {
                    if (field.validation.forceValue != null) {
                        forceValue = field.validation.forceValue.condition;
                    }
                    notEmpty = field.validation.notEmpty != null;
                    validationConditions = (field.validation.conditions || [])
                        .map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        return {
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        };
                    }));
                }
                /** @type {?} */
                let notEmptyW = false;
                /** @type {?} */
                let warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || [])
                        .map((/**
                     * @param {?} w
                     * @return {?}
                     */
                    w => {
                        return {
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        };
                    }));
                }
                /** @type {?} */
                const formula = field.formula != null ? field.formula.formula : null;
                controls.description = field.description;
                controls.defaultValue = field.defaultValue;
                controls.size = field.size;
                controls.formula = formula;
                controls.forceValue = forceValue;
                controls.notEmpty = notEmpty;
                controls.validationConditions = [validationConditions, []];
                controls.notEmptyWarning = notEmptyW;
                controls.warningConditions = [warningConditions, []];
                controls.nextSlideCondition = [field.nextSlideCondition];
                this._curForceValue = forceValue;
                this._curFormula = formula;
                this._validationConditions = validationConditions;
                this._warningConditions = warningConditions;
            }
            if (this.isNumericField(n.node)) {
                /** @type {?} */
                const numField = (/** @type {?} */ (n.node));
                /** @type {?} */
                let minValue;
                /** @type {?} */
                let maxValue;
                /** @type {?} */
                let minDigits;
                /** @type {?} */
                let maxDigits;
                if (numField.validation != null) {
                    if (numField.validation.minValue != null) {
                        minValue = (numField.validation.minValue.condition || '').replace('$value >= ', '');
                    }
                    if (numField.validation.maxValue != null) {
                        maxValue = (numField.validation.maxValue.condition || '').replace('$value <= ', '');
                    }
                    if (numField.validation.minDigits != null) {
                        minDigits = (numField.validation.minDigits.condition || '')
                            .replace('$value.toString().length >= ', '');
                    }
                    if (numField.validation.maxDigits != null) {
                        maxDigits = (numField.validation.maxDigits.condition || '')
                            .replace('$value.toString().length <= ', '');
                    }
                }
                controls.minValue = minValue;
                controls.maxValue = maxValue;
                controls.minDigits = minDigits;
                controls.maxDigits = maxDigits;
                validators.push(checkValueLimitsValidity);
                validators.push(checkDigitsValidity);
            }
            if (this.isFieldWithChoices(n.node)) {
                /** @type {?} */
                const fieldWithChoices = (/** @type {?} */ (n.node));
                /** @type {?} */
                let triggerConditions = (fieldWithChoices.triggerConditions || [])
                    .map((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => c.condition));
                controls.choicesOriginRef = ((/** @type {?} */ (fieldWithChoices))).choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula : null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                this._triggerConditions = triggerConditions;
            }
            /** @type {?} */
            const fg = this._fb.group(controls);
            fg.setValidators(validators);
            this._conditionalBranches = n.node.conditionalBranches.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.condition));
            this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;
            this._handleConditionalBranchesChange(fg);
            this._handleVisibilityChange(fg);
            this._handleFormulaRepsChange(fg);
            this._handleChoicesFilterChange(fg);
            this._handleFormulaChange(fg);
            this._handleForceValueChange(fg);
            this._handleValidationCondtionsChange(fg);
            this._handleWarningCondtionsChange(fg);
            this._handleNextSlideConditionChange(fg);
            this._handleTriggerCondtionsChange(fg);
            return fg;
        })), publishReplay(1), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _destroyConditionDialog() {
        if (this._editConditionDialogSub != null) {
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editConditionDialog != null) {
            this._editConditionDialog.close();
            this._editConditionDialog = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _destroyValidationConditionDialog() {
        if (this._editValidationConditionDialogSub != null) {
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editValidationConditionDialog != null) {
            this._editValidationConditionDialog.close();
            this._editValidationConditionDialog = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _destroyWarningConditionDialog() {
        if (this._editWarningConditionDialogSub != null) {
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editWarningConditionDialog != null) {
            this._editWarningConditionDialog.close();
            this._editWarningConditionDialog = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initRemoveTriggerCondition() {
        this._removeTriggerConditionSub = ((/** @type {?} */ (this._removeTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['triggerConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initAddTriggerCondition() {
        this._addTriggerConditionSub = ((/** @type {?} */ (this._addTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['triggerConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initTriggerConditionEdit() {
        this._editTriggerConditionSub = ((/** @type {?} */ (this._editTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) {
                return;
            }
            this._editConditionDialog = this._dialog
                .open(AjfFbConditionEditorDialog);
            /** @type {?} */
            const cmp = this._editConditionDialog.componentInstance;
            cmp.condition = this._triggerConditions[vcIdx];
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._triggerConditions[vcIdx] = cond;
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initRemoveWarningCondition() {
        this._removeWarningConditionSub = ((/** @type {?} */ (this._removeWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['warningConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initAddWarningCondition() {
        this._addWarningConditionSub = ((/** @type {?} */ (this._addWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['warningConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initWarningConditionEdit() {
        this._editWarningConditionSub = ((/** @type {?} */ (this._editWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyWarningConditionDialog();
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) {
                return;
            }
            this._editWarningConditionDialog = this._dialog
                .open(AjfFbWarningConditionEditorDialog);
            /** @type {?} */
            const cmp = this._editWarningConditionDialog.componentInstance;
            /** @type {?} */
            const w = this._warningConditions[vcIdx];
            cmp.condition = w.condition;
            cmp.warningMessage = w.warningMessage;
            this._editWarningConditionDialogSub = this._editWarningConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._warningConditions[vcIdx] = cond;
                }
                this._editWarningConditionDialogSub.unsubscribe();
                this._editWarningConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initRemoveValidationCondition() {
        this._removeValidationConditionSub = ((/** @type {?} */ (this._removeValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['validationConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initAddValidationCondition() {
        this._addValidationConditionSub = ((/** @type {?} */ (this._addValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['validationConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initValidationConditionEdit() {
        this._editValidationConditionSub = ((/** @type {?} */ (this._editValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyValidationConditionDialog();
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) {
                return;
            }
            this._editValidationConditionDialog = this._dialog
                .open(AjfFbValidationConditionEditorDialog);
            /** @type {?} */
            const cmp = this._editValidationConditionDialog.componentInstance;
            /** @type {?} */
            const v = this._validationConditions[vcIdx];
            cmp.condition = v.condition;
            cmp.errorMessage = v.errorMessage;
            this._editValidationConditionDialogSub = this._editValidationConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._validationConditions[vcIdx] = cond;
                }
                this._editValidationConditionDialogSub.unsubscribe();
                this._editValidationConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initForceValueEdit() {
        this._editForceValueSub = ((/** @type {?} */ (this._editForceValueEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['forceValue'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initNextSlideConditionEdit() {
        this._editNextSlideConditionSub = ((/** @type {?} */ (this._editNextSlideConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['nextSlideCondition'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initFormulaEdit() {
        this._editFormulaSub = ((/** @type {?} */ (this._editFormulaEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['formula'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initFormulaRepsEdit() {
        this._editFormulaRepsSub = ((/** @type {?} */ (this._editFormulaRepsEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['formulaReps'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initChoicesFilterEdit() {
        this._editChoicesFilterSub = ((/** @type {?} */ (this._editChoicesFilterEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['choicesFilter'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initConditionalBranchEdit() {
        this._editConditionalBranchSub = ((/** @type {?} */ (this._editConditionalBranchEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const cbIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) {
                return;
            }
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = this._conditionalBranches[cbIdx];
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._conditionalBranches[cbIdx] = cond;
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initVisibilityEdit() {
        this._editVisibilitySub = ((/** @type {?} */ (this._editVisibilityEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['visibility'];
            /** @type {?} */
            const condition = ctrl.value;
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = condition;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleTriggerCondtionsChange(fg) {
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions))))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._triggerConditions = v.triggerConditions;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleWarningCondtionsChange(fg) {
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions))))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._warningConditions = v.warningConditions;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleValidationCondtionsChange(fg) {
        this._validationConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions))))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._validationConditions = v.validationConditions;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleForceValueChange(fg) {
        this._forceValueSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.forceValue === v2.forceValue)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curForceValue = v.forceValue;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleNextSlideConditionChange(fg) {
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._nextSlideCondition = v.nextSlideCondition;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleFormulaChange(fg) {
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.formula === v2.formula)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curFormula = v.formula;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleFormulaRepsChange(fg) {
        this._formulaRepsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.formulaReps === v2.formulaReps)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curFormulaReps = v.formulaReps;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleChoicesFilterChange(fg) {
        this._choicesFilterSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.choicesFilter === v2.choicesFilter)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curChoicesFilter = v.choicesFilter;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleConditionalBranchesChange(fg) {
        this._conditionalBranchesSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.conditionalBranchesNum === v2.conditionalBranchesNum)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const cbNum = v.conditionalBranchesNum;
            /** @type {?} */
            const curCbNum = this._conditionalBranches.length;
            if (curCbNum < cbNum) {
                /** @type {?} */
                let newCbs = [];
                for (let i = curCbNum; i < cbNum; i++) {
                    newCbs.push(alwaysCondition().condition);
                }
                this._conditionalBranches = this._conditionalBranches.concat(newCbs);
            }
            else if (curCbNum > cbNum) {
                this._conditionalBranches.splice(0, curCbNum - cbNum);
            }
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleVisibilityChange(fg) {
        this._visibilitySub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.visibilityOpt === v2.visibilityOpt)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const visibilityOpt = v.visibilityOpt;
            /** @type {?} */
            let newCondition;
            switch (visibilityOpt) {
                case 'always':
                    newCondition = alwaysCondition().condition;
                    break;
                case 'never':
                    newCondition = neverCondition().condition;
                    break;
                default:
                    newCondition = null;
            }
            this._curVisibility = newCondition;
            fg.controls['visibility'].setValue(newCondition);
        }));
    }
    /**
     * @private
     * @param {?} condition
     * @return {?}
     */
    _guessVisibilityOpt(condition) {
        if (condition.condition.localeCompare(alwaysCondition().condition) === 0) {
            return 'always';
        }
        if (condition.condition.localeCompare(neverCondition().condition) === 0) {
            return 'never';
        }
        return 'condition';
    }
}
AjfFbNodeProperties.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-node-properties',
                template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div><div class=\"ajf-header\"><h3 translate>Properties</h3><mat-icon (click)=\"save()\">save</mat-icon><mat-icon (click)=\"cancel()\">cancel</mat-icon></div><ng-container *ngIf=\"nodeEntry|async as ne\"><ng-container *ngIf=\"propertiesForm|async as pf\"><form [formGroup]=\"pf\" novalidate><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><mat-label translate>Visibility</mat-label><mat-select formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\"><mat-option value=\"always\" translate>Always</mat-option><mat-option value=\"never\" translate>Never</mat-option><mat-option value=\"condition\" translate>Condition...</mat-option></mat-select></mat-form-field><button (click)=\"editVisibility()\" [disabled]=\"pf.value['visibilityOpt'] != 'condition'\" mat-raised-button [matTooltip]=\"curVisibility\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curVisibility }}</span></div></button></div><div class=\"ajf-prop\"><div><label translate>Branches</label></div><div><mat-slider formControlName=\"conditionalBranchesNum\" thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider></div><div *ngFor=\"let branch of conditionalBranches; let idx = index\"><button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ branch }}</span></div></button></div></div><ng-template [ngIf]=\"isRepeatingContainerNode((ne)?.node)\"><div class=\"ajf-prop\"><div><label translate>Repetitions</label></div><div><button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curFormulaReps }}</span></div></button></div><div><label translate>Min repetitions</label></div><div><mat-slider formControlName=\"minReps\" thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider></div><div><label translate>Max repetitions</label></div><div><mat-slider formControlName=\"maxReps\" thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider></div></div></ng-template><ng-template [ngIf]=\"isField((ne)?.node)\"><div class=\"ajf-prop\"><mat-form-field><mat-label translate>Field size</mat-label><mat-select formControlName=\"size\" [placeholder]=\"'Size' | translate\"><mat-option *ngFor=\"let fieldSize of fieldSizes\" [value]=\"fieldSize.value\">{{ fieldSize.label }}</mat-option></mat-select></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><textarea matInput formControlName=\"description\" [placeholder]=\"'Description' | translate\"></textarea></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"defaultValue\" [placeholder]=\"'Default value' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><div><label translate>Formula</label></div><div><button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curFormula }}</span></div></button></div></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox></div><ng-template [ngIf]=\"isNumericField((ne)?.node)\"><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"minValue\" [placeholder]=\"'Min value' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"maxValue\" [placeholder]=\"'Max value' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"minDigits\" [placeholder]=\"'Min digits' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"maxDigits\" [placeholder]=\"'Max digits' | translate\"></mat-form-field></div></ng-template><div class=\"ajf-prop\"><div class=\"ajf-header\"><label translate>Validation</label><mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon></div><div *ngIf=\"validationConditions == null || validationConditions.length == 0\" class=\"ajf-validation-row ajf-emph\" translate>No conditions</div><div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\"><button (click)=\"editValidationCondition(idx)\" mat-raised-button [matTooltip]=\"validationCondition.condition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ validationCondition.condition }}</span></div></button><mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon></div></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox></div><div class=\"ajf-prop\"><div class=\"ajf-header\"><label translate>Warnings</label><mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon></div><div *ngIf=\"warningConditions == null || warningConditions.length == 0\" class=\"ajf-validation-row ajf-emph\" translate>No warnings</div><div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\"><button (click)=\"editWarningCondition(idx)\" mat-raised-button [matTooltip]=\"warningCondition.condition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ warningCondition.condition }}</span></div></button><mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon></div></div><div class=\"ajf-prop\"><div><label translate>Go to next slide condition</label></div><div><button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ nextSlideCondition }}</span></div></button></div></div><ng-template [ngIf]=\"isFieldWithChoices((ne)?.node)\"><div class=\"ajf-prop\"><mat-form-field><mat-label translate>Choices origins</mat-label><mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | translate\"><mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.name\">{{ choicesOrigin.label || choicesOrigin.name }}</mat-option></mat-select></mat-form-field></div><div class=\"ajf-prop\"><div><label translate>Choices filter</label></div><div><button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curChoicesFilter }}</span></div></button></div></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox></div><div class=\"ajf-prop\"><div class=\"ajf-header\"><label translate>Trigger selection</label><mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon></div><div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\" class=\"ajf-validation-row ajf-emph\" translate>No trigger condition</div><div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"><button (click)=\"editTriggerCondition(idx)\" mat-raised-button [matTooltip]=\"triggerCondition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ triggerCondition }}</span></div></button><mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon></div></div></ng-template></ng-template></form></ng-container></ng-container>",
                styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties [mat-raised-button],ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider{width:100%}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbNodeProperties.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog },
    { type: FormBuilder }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbNodeTypeEntry {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    /**
     * @return {?}
     */
    get nodeType() { return this._nodeType; }
    /**
     * @param {?} nodeType
     * @return {?}
     */
    set nodeType(nodeType) {
        this._nodeType = nodeType;
        this._cdr.markForCheck();
    }
}
AjfFbNodeTypeEntry.decorators = [
    { type: Component, args: [{selector: 'ajf-fb-node-type-entry',
                template: "<ng-container *ngIf=\"nodeType\"><mat-icon [fontSet]=\"nodeType.icon.fontSet\" [fontIcon]=\"nodeType.icon.fontIcon\"></mat-icon>{{ nodeType.label }}</ng-container>",
                styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AjfFbNodeTypeEntry.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AjfFbNodeTypeEntry.propDecorators = {
    nodeType: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFormBuilderModule {
}
AjfFormBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    DragDropModule,
                    MatAutocompleteModule,
                    MatButtonModule,
                    MatCardModule,
                    MatCheckboxModule,
                    MatChipsModule,
                    MatDialogModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatListModule,
                    MatMenuModule,
                    MatSelectModule,
                    MatSidenavModule,
                    MatSliderModule,
                    MatTableModule,
                    MatToolbarModule,
                    MatTooltipModule,
                    TranslateModule,
                    AjfMonacoEditorModule,
                    AjfNodeIconModule,
                ],
                declarations: [
                    AjfFbBranchLine,
                    AjfFbChoicesOriginEditorDialog,
                    AjfFbChoicesOriginEditor,
                    AjfFbConditionEditorDialog,
                    AjfFbConditionEditor,
                    AjfFbNodeEntry,
                    AjfFbNodeProperties,
                    AjfFbNodeTypeEntry,
                    AjfFbStringIdentifierDialogComponent,
                    AjfFbValidationConditionEditorDialog,
                    AjfFbWarningConditionEditorDialog,
                    AjfFormBuilder,
                ],
                exports: [
                    AjfFormBuilder,
                ],
                entryComponents: [
                    AjfFbChoicesOriginEditorDialog,
                    AjfFbConditionEditorDialog,
                    AjfFbStringIdentifierDialogComponent,
                    AjfFbValidationConditionEditorDialog,
                    AjfFbWarningConditionEditorDialog,
                ],
                providers: [
                    AjfFormBuilderService
                ]
            },] },
];

export { AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderService, flattenNodes, AjfFbBranchLine as ɵa, AjfFbChoicesOriginEditorDialog as ɵb, AjfFbChoicesOriginEditor as ɵc, AjfFbConditionEditorDialog as ɵd, AjfFbConditionEditor as ɵe, AjfFbNodeEntry as ɵf, AjfFbNodeProperties as ɵg, AjfFbNodeTypeEntry as ɵh, AjfFbStringIdentifierDialogComponent as ɵi, AjfFbValidationConditionEditorDialog as ɵj, AjfFbWarningConditionEditorDialog as ɵk };
//# sourceMappingURL=form-builder.js.map
