import { AjfTranslocoModule } from '@ajf/core/transloco';
import { AjfMonacoEditor, AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { AjfNodeIconModule } from '@ajf/material/node-icon';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, Input, EventEmitter, Injectable, ViewChild, ChangeDetectorRef, ViewChildren, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { isChoicesFixedOrigin, isContainerNode, AjfNodeType, AjfFieldType, createField, createContainerNode, createForm, createChoicesFixedOrigin, isSlidesNode, isFieldWithChoices, isRepeatingContainerNode, isField, createValidationGroup, notEmptyValidation, minValidation, maxValidation, minDigitsValidation, maxDigitsValidation, createValidation, createWarningGroup, notEmptyWarning, createWarning, AjfValidationService, isNumberField } from '@ajf/core/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, Subscription, combineLatest } from 'rxjs';
import { filter, map, scan, publishReplay, refCount, withLatestFrom, shareReplay, sample, distinctUntilChanged } from 'rxjs/operators';
import { createCondition, alwaysCondition, createFormula, AjfExpressionUtils, neverCondition } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

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
class AjfFbBranchLine {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._height = 0;
    }
    set offset(offset) {
        this._offset = offset;
        this._updateOffset();
    }
    set color(color) {
        this._color = color;
        this._updateColor();
    }
    set height(height) {
        this._height = height;
        this._updateHeight();
    }
    _updateHeight() {
        const height = `${Math.max(0, this._height - 25)}px`;
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    }
    _updateOffset() {
        const margin = `${this._offset * 4}px`;
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    }
    _updateColor() {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    }
}
AjfFbBranchLine.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-branch-line',
                template: "",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px;transition:height .5s ease-in-out}\n"]
            },] }
];
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
class ChoicesOriginDataSource extends DataSource {
    constructor() {
        super();
        this._choices = new BehaviorSubject([]);
        this._choicesObs = this._choices;
    }
    connect() {
        return this._choicesObs;
    }
    disconnect() { }
    updateChoices(choices) {
        this._choices.next(choices);
    }
}

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
class AjfFbChoicesOriginEditor {
    constructor() {
        this._displayedColumns = ['label', 'value', 'delete'];
        this.editing = {};
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    get displayedColumns() {
        return this._displayedColumns;
    }
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    set choicesOrigin(choicesOrigin) {
        this._choicesOrigin = choicesOrigin;
        this.name = choicesOrigin.name;
        this.label = choicesOrigin.label;
        this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
        this._choicesArr = choicesOrigin.choices;
        this._choices.updateChoices(this._choicesArr);
    }
    get choices() {
        return this._choices;
    }
    get choicesArr() {
        return this._choicesArr;
    }
    updateValue(evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        this._choicesArr[rowIdx][cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    }
    deleteRow(rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    }
    addRow() {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    }
}
AjfFbChoicesOriginEditor.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-choices-origin-editor',
                template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | transloco\" />\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | transloco\" />\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span>{{'Add value'|transloco}}</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Label'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Value'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\" />\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef\n          >{{'Delete'|transloco}}</mat-header-cell\n        >\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">{{'delete'|transloco}}</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"]
            },] }
];
AjfFbChoicesOriginEditor.propDecorators = {
    choicesOrigin: [{ type: Input }]
};

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
function getNodeContainer(c, node) {
    if (c.nodes.indexOf(node) > -1) {
        return c;
    }
    const cns = c.nodes.filter(n => isContainerNode(n));
    const len = cns.length;
    for (let i = 0; i < len; i++) {
        const cn = getNodeContainer(cns[i], node);
        if (cn != null) {
            return cn;
        }
    }
    return null;
}
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches = false) {
    const entries = nodes.filter(n => n.parent === parent.id)
        .sort((n1, n2) => n1.parentNode - n2.parentNode)
        .map(n => {
        const children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return {
            node: n,
            children,
            content: buildFormBuilderNodesContent(nodes, n)
        };
    });
    if (!ignoreConditionalBranches) {
        const entriesNum = entries.length;
        const cbs = parent.conditionalBranches.length;
        for (let i = entriesNum; i < cbs; i++) {
            entries.push({ parent: parent, parentNode: i });
        }
    }
    return entries;
}
function buildFormBuilderNodesContent(_nodes, node) {
    if (isContainerNode(node)) {
        return buildFormBuilderNodesSubtree(node.nodes, node, true);
    }
    return [];
}
function flattenNodes(nodes) {
    let flatNodes = [];
    nodes.forEach((node) => {
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
        flatNodes.push(node);
    });
    return flatNodes;
}
function getDescendants(flatNodes, parentNode, branch = null) {
    return branch != null ?
        flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch) :
        flatNodes.filter(n => n.parent === parentNode.id);
}
function removeNodes(nodes, ids) {
    const len = nodes.length;
    for (let i = 0; i < len; i++) {
        const node = nodes[i];
        if (isContainerNode(node)) {
            const container = node;
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter(n => ids.indexOf(n.id) === -1);
}
function deleteNodeSubtree(nodes, parentNode, branch = null) {
    const flatNodes = flattenNodes(nodes);
    let delNodes = [];
    let descendants = getDescendants(flatNodes, parentNode, branch);
    const len = descendants.length;
    for (let i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map(n => n.id));
}
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
        this._formObs = this._form;
        /**
         * A list of the ids of the dropLists connected to the source list.
         */
        this._connectedDropLists = new BehaviorSubject([]);
        this._editedNodeEntry = new BehaviorSubject(null);
        this._editedNodeEntryObs = this._editedNodeEntry;
        this._editedCondition = new BehaviorSubject(null);
        this._editedConditionObs = this._editedCondition;
        this._editedChoicesOrigin = new BehaviorSubject(null);
        this._editedChoicesOriginObs = this._editedChoicesOrigin;
        this._beforeNodesUpdate = new EventEmitter();
        this._beforeNodesUpdateObs = this._beforeNodesUpdate;
        this._afterNodeUpdate = new EventEmitter();
        this._afterNodeUpdateObs = this._afterNodeUpdate;
        this._nodesUpdates = new Subject();
        this._attachmentsOriginsUpdates = new Subject();
        this._choicesOriginsUpdates = new Subject();
        this._stringIdentifierUpdates = new Subject();
        this._saveNodeEntryEvent = new EventEmitter();
        this._deleteNodeEntryEvent = new EventEmitter();
        /**
         * Event fired when the position of a node in a tree changes.
         */
        this._moveNodeEntryEvent = new EventEmitter();
        /**
         * Subscribes to the moveNodeEntryEvent event emitter;
         */
        this._moveNodeSub = Subscription.EMPTY;
        this._initChoicesOriginsStreams();
        this._initAttachmentsOriginsStreams();
        this._initStringIdentifierStreams();
        this._initNodesStreams();
        this._initFormStreams();
        this._initSaveNode();
        this._initMoveNode();
        this._initDeleteNode();
    }
    /**
     * Available node types
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get availableNodeTypes() {
        return this._availableNodeTypes;
    }
    /**
     * Current edited form stream
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get form() {
        return this._formObs;
    }
    get attachmentsOrigins() {
        return this._attachmentsOrigins;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get stringIdentifier() {
        return this._stringIdentifier;
    }
    get nodes() {
        return this._nodes;
    }
    get flatNodes() {
        return this._flatNodes;
    }
    get flatFields() {
        return this._flatFields;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    get editedNodeEntry() {
        return this._editedNodeEntryObs;
    }
    get editedCondition() {
        return this._editedConditionObs;
    }
    get editedChoicesOrigin() {
        return this._editedChoicesOriginObs;
    }
    get beforeNodesUpdate() {
        return this._beforeNodesUpdateObs;
    }
    get afterNodeUpdate() {
        return this._afterNodeUpdateObs;
    }
    /**
     * Sets the current edited form
     *
     * @param form
     *
     * @memberOf AjfFormBuilderService
     */
    setForm(form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    }
    editNodeEntry(nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    }
    editCondition(condition) {
        this._editedCondition.next(condition);
    }
    saveCurrentCondition(condition) {
        let c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    }
    cancelConditionEdit() {
        this._editedChoicesOrigin.next(null);
    }
    assignListId(node, empty = false) {
        if (node.nodeType === AjfNodeType.AjfSlide || node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            const listId = empty ? `empty_fields_list_${node.id}` : `fields_list_${node.id}`;
            if (this._connectedDropLists.value.indexOf(listId) == -1) {
                this._connectDropList(listId);
            }
            return listId;
        }
        return '';
    }
    insertNode(nodeType, parent, parentNode, inContent = false, insertInIndex = 0) {
        var _a;
        let node;
        const id = ++nodeUniqueId;
        const isFieldNode = ((_a = nodeType.nodeType) === null || _a === void 0 ? void 0 : _a.field) != null;
        if (isFieldNode) {
            node = createField({
                id,
                nodeType: AjfNodeType.AjfField,
                fieldType: nodeType.nodeType.field,
                parent: parent.id,
                parentNode,
                name: '',
            });
        }
        else {
            node = createContainerNode({
                id,
                nodeType: nodeType.nodeType.node,
                parent: 0,
                parentNode,
                name: '',
                nodes: [],
            });
        }
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next((nodes) => {
            const cn = isContainerNode(parent) && inContent ?
                parent :
                getNodeContainer({ nodes }, parent);
            if (!isFieldNode) {
                let newNodes = nodes.slice(0);
                newNodes.splice(insertInIndex, 0, node);
                newNodes = this._updateNodesList(0, newNodes);
                return newNodes;
            }
            else {
                let newNodes = cn.nodes.slice(0);
                newNodes.splice(insertInIndex, 0, node);
                newNodes = this._updateNodesList(cn.id, newNodes);
                cn.nodes = newNodes;
            }
            return nodes;
        });
    }
    saveNodeEntry(properties) {
        this._saveNodeEntryEvent.emit(properties);
    }
    cancelNodeEntryEdit() {
        this._editedNodeEntry.next(null);
    }
    deleteNodeEntry(nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
    }
    /**
     * Triggers the moveNode event when a node is moved in the formbuilder.
     * @param nodeEntry The node to be moved.
     */
    moveNodeEntry(nodeEntry, from, to) {
        const moveEvent = { nodeEntry: nodeEntry, fromIndex: from, toIndex: to };
        this._moveNodeEntryEvent.next(moveEvent);
    }
    getCurrentForm() {
        return combineLatest([
            this.form, this._nodesWithoutChoiceOrigins, this.attachmentsOrigins,
            this.choicesOrigins, this.stringIdentifier
        ])
            .pipe(filter(([form]) => form != null), map(([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
            return createForm({
                choicesOrigins: choicesOrigins.slice(0),
                attachmentsOrigins: attachmentsOrigins.slice(0),
                stringIdentifier: (stringIdentifier || []).slice(0),
                nodes: nodes.slice(0),
                supplementaryInformations: form.supplementaryInformations,
            });
        }));
    }
    editChoicesOrigin(choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    }
    createChoicesOrigin() {
        this._editedChoicesOrigin.next(createChoicesFixedOrigin({ name: '' }));
    }
    cancelChoicesOriginEdit() {
        this._editedChoicesOrigin.next(null);
    }
    saveChoicesOrigin(params) {
        const choicesOrigin = this._editedChoicesOrigin.getValue();
        if (choicesOrigin != null) {
            choicesOrigin.label = params.label;
            choicesOrigin.name = params.name;
            if (isChoicesFixedOrigin(choicesOrigin)) {
                choicesOrigin.choices = params.choices;
            }
            this._choicesOriginsUpdates.next((choicesOrigins) => {
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
            });
        }
        this._editedChoicesOrigin.next(null);
    }
    saveStringIdentifier(identifier) {
        this._stringIdentifierUpdates.next(() => [...identifier]);
    }
    _buildFormBuilderNodesTree(nodes) {
        this._updateNodesList(0, nodes);
        const rootNodes = nodes.filter(n => n.nodeType == AjfNodeType.AjfSlide || n.nodeType == AjfNodeType.AjfRepeatingSlide);
        if (rootNodes.length === 0) {
            return [null];
        }
        const rootNode = rootNodes[0];
        if (isSlidesNode(rootNode)) {
            const tree = [];
            tree.push({
                node: rootNode,
                container: null,
                children: buildFormBuilderNodesSubtree(nodes, rootNode),
                content: buildFormBuilderNodesContent(nodes, rootNode)
            });
            return tree;
        }
        throw new Error('Invalid form definition');
    }
    /**
     * Adds the id of a dropList to be connected with the FormBuilder source list.
     * @param listId The id of the list to connect.
     */
    _connectDropList(listId) {
        let connectedLists = this._connectedDropLists.value.slice(0);
        this._connectedDropLists.next([...connectedLists, listId]);
    }
    _findMaxNodeId(nodes, _curMaxId = 0) {
        let maxId = 0;
        nodes.forEach((n) => {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, this._findMaxNodeId(n.nodes));
            }
        });
        return maxId;
    }
    _initFormStreams() {
        this._form.subscribe((form) => {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = this._findMaxNodeId(form.nodes);
            }
            this._nodesUpdates.next((_nodes) => {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            });
            this._attachmentsOriginsUpdates.next((_attachmentsOrigins) => {
                return form != null && form.attachmentsOrigins != null ?
                    form.attachmentsOrigins.slice(0) :
                    [];
            });
            this._choicesOriginsUpdates.next((_choicesOrigins) => {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            });
            this._stringIdentifierUpdates.next((_) => {
                return form != null && form.stringIdentifier != null ? form.stringIdentifier.slice(0) :
                    [];
            });
        });
    }
    _initChoicesOriginsStreams() {
        this._choicesOrigins =
            this._choicesOriginsUpdates
                .pipe(scan((choicesOrigins, op) => {
                return op(choicesOrigins);
            }, []), publishReplay(1), refCount());
    }
    _initAttachmentsOriginsStreams() {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan((attachmentsOrigins, op) => {
            return op(attachmentsOrigins);
        }, []), publishReplay(1), refCount());
    }
    _initStringIdentifierStreams() {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan((stringIdentifier, op) => {
            return op(stringIdentifier);
        }, []), publishReplay(1), refCount());
    }
    _initNodesStreams() {
        this._nodes = this._nodesUpdates
            .pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), publishReplay(1), refCount());
        this._nodesWithoutChoiceOrigins =
            this._nodes.pipe(map(slides => slides.map(slide => {
                slide.nodes = slide.nodes.map((node) => {
                    if (isFieldWithChoices(node)) {
                        const fwc = deepCopy(node);
                        if (fwc && fwc.choices) {
                            delete fwc.choices;
                        }
                        if (fwc && fwc.choicesOrigin) {
                            delete fwc.choicesOrigin;
                        }
                        return fwc;
                    }
                    return node;
                });
                return slide;
            })));
        this._flatNodes = this._nodes.pipe(map((nodes) => flattenNodes(nodes)), publishReplay(1), refCount());
        this._flatFields = this._flatNodes.pipe(map((nodes) => nodes.filter(n => !isContainerNode(n))), publishReplay(1), refCount());
        this._nodeEntriesTree = this._nodes.pipe(map(nodes => this._buildFormBuilderNodesTree(nodes)), publishReplay(1), refCount());
    }
    _initSaveNode() {
        this._saveNodeEntryEvent
            .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter(([_, nodeEntry]) => nodeEntry != null), map(([properties, ne]) => {
            this._beforeNodesUpdate.emit();
            const nodeEntry = ne;
            const origNode = nodeEntry.node;
            const node = deepCopy(origNode);
            node.id = nodeEntry.node.id;
            node.name = properties.name;
            node.label = properties.label;
            node.visibility = properties.visibility != null ?
                createCondition({ condition: properties.visibility }) :
                null;
            const oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches = properties.conditionalBranches != null ?
                properties.conditionalBranches.map((condition) => createCondition({ condition })) :
                [alwaysCondition()];
            const newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                const repNode = node;
                repNode.formulaReps = properties.formulaReps != null ?
                    createFormula({ formula: properties.formulaReps }) :
                    undefined;
                repNode.minReps = properties.minReps;
                repNode.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                const field = node;
                field.description = properties.description;
                field.defaultValue = properties.defaultValue;
                field.formula = properties.formula != null ?
                    createFormula({ formula: properties.formula }) :
                    undefined;
                const forceValue = properties.value;
                const notEmpty = properties.notEmpty;
                const validationConditions = properties.validationConditions;
                let minValue = parseInt(properties.minValue, 10);
                let maxValue = parseInt(properties.maxValue, 10);
                let minDigits = parseInt(properties.minDigits, 10);
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
                            []).map((c) => createValidation({
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        }));
                    field.validation = validation;
                }
                else {
                    field.validation = undefined;
                }
                const notEmptyWarn = properties.notEmptyWarning;
                const warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    const warning = field.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions =
                        (warningConditions ||
                            []).map((w) => createWarning({
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        }));
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
                    const fwc = field;
                    fwc.choicesOriginRef = properties.choicesOriginRef;
                    fwc.forceExpanded = properties.forceExpanded;
                    fwc.forceNarrow = properties.forceNarrow;
                    fwc.triggerConditions = (properties.triggerConditions ||
                        []).map((t) => createCondition({ condition: t }));
                }
            }
            this._editedNodeEntry.next(null);
            return (nodes) => {
                let cn = getNodeContainer({ nodes }, origNode);
                if (cn != null) {
                    // TODO: @trik check this, was always true?
                    // if (cn instanceof AjfNode) {
                    const replaceNodes = cn.nodes === nodes;
                    const idx = cn.nodes.indexOf(origNode);
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
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    _initDeleteNode() {
        this._deleteNodeEntryEvent
            .pipe(map((nodeEntry) => {
            this._beforeNodesUpdate.emit();
            return (nodes) => {
                const node = nodeEntry.node;
                let cn = getNodeContainer({ nodes }, node);
                if (cn != null) {
                    const replaceNodes = cn.nodes === nodes;
                    const idx = cn.nodes.indexOf(node);
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    /**
     * Initializes the subscription to the moveNodeEntryEvent.
     */
    _initMoveNode() {
        this._moveNodeSub.unsubscribe();
        this._moveNodeSub =
            this._moveNodeEntryEvent
                .pipe(map((moveEvent) => {
                this._beforeNodesUpdate.emit();
                return (nodes) => {
                    const nodeEntry = moveEvent.nodeEntry;
                    const node = nodeEntry.node;
                    let cn = getNodeContainer({ nodes }, node);
                    let newNodes = nodes;
                    if (cn != null) {
                        const replaceNodes = cn.nodes === nodes;
                        newNodes = cn.nodes;
                        moveItemInArray(newNodes, moveEvent.fromIndex, moveEvent.toIndex);
                        newNodes = this._updateNodesList(cn.id, newNodes);
                        cn.nodes = newNodes;
                        if (replaceNodes) {
                            nodes = newNodes;
                        }
                        else {
                            nodes = nodes.slice(0);
                        }
                    }
                    return nodes;
                };
            }))
                .subscribe(this._nodesUpdates);
    }
    /**
     * Updates the "id" and "parent" fields of a modified or rearranged list of nodes.
     * @param containerId The id of the parent container of the list.
     * @param nodesList The list of nodes to be updated.
     */
    _updateNodesList(containerId, nodesList) {
        if (!nodesList.length) {
            return [];
        }
        const contId = containerId != undefined ? containerId : 0;
        for (let idx = 0; idx < nodesList.length; idx++) {
            let currentNode = nodesList[idx];
            currentNode.id = (contId * 1000) + idx + 1;
            currentNode.parent = idx == 0 ? contId : (contId * 1000) + idx;
            if (currentNode.nodeType == AjfNodeType.AjfSlide ||
                currentNode.nodeType == AjfNodeType.AjfRepeatingSlide) {
                const currentSlide = currentNode;
                if (currentSlide.nodes) {
                    this._updateNodesList(currentSlide.id, currentSlide.nodes);
                }
            }
        }
        return nodesList;
    }
}
AjfFormBuilderService.decorators = [
    { type: Injectable }
];
AjfFormBuilderService.ctorParameters = () => [];

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
class AjfFbChoicesOriginEditorDialog {
    constructor(_service) {
        this._service = _service;
        this._choicesOrigin =
            this._service.editedChoicesOrigin.pipe(filter(c => c != null), map(c => c));
    }
    get choicesOrigin() {
        return this._choicesOrigin;
    }
    saveChoicesOrigin() {
        this._service.saveChoicesOrigin({ label: this.editor.label, name: this.editor.name, choices: this.editor.choicesArr });
    }
    cancelChoicesOriginEdit() {
        this._service.cancelChoicesOriginEdit();
    }
}
AjfFbChoicesOriginEditorDialog.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-choices-origin-editor-dialog',
                template: "<h3 matDialogTitle>{{'Edit choices origin'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n    *ngIf=\"choicesOrigin|async as co\"\n    [choicesOrigin]=\"co!\"\n  ></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveChoicesOrigin()\">{{'Save'|transloco}}</button>\n  <button mat-button (click)=\"cancelChoicesOriginEdit()\">\n    {{'Close'|transloco}}\n  </button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["\n"]
            },] }
];
AjfFbChoicesOriginEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbChoicesOriginEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbChoicesOriginEditor, { static: false },] }]
};

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
class AjfFbConditionEditor {
    constructor(_) { }
    get fields() {
        return this._fields;
    }
    set fields(fields) {
        this._fields = fields;
        this._updateVariables();
    }
    insertVariable(variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            const editor = this.monacoEditor.editor;
            let value = editor.getValue().split('\n');
            let position = editor.getPosition();
            const ln = position.lineNumber - 1;
            let line = value[ln];
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
    onEditorInit() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({ noSemanticValidation: false, noSyntaxValidation: false });
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
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                '';
        }
        try {
            monaco.languages.typescript.javascriptDefaults.addExtraLib('', 'condition-editor-functions.d.ts');
        }
        catch (e) {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                '';
        }
        this._updateVariables();
        this._updateFunctions();
    }
    _updateVariables() {
        if (this._fields == null) {
            return;
        }
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                this._fields
                    .map((field) => {
                    return `declare const ${field.name}: ${this._fieldVarType(field.fieldType)};`;
                })
                    .join('\n');
        }
        catch (e) {
        }
    }
    _updateFunctions() {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) {
        }
    }
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
    { type: Component, args: [{
                selector: 'ajf-condition-editor',
                template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"]
            },] }
];
AjfFbConditionEditor.ctorParameters = () => [
    { type: AjfValidationService }
];
AjfFbConditionEditor.propDecorators = {
    monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: true },] }],
    fields: [{ type: Input }],
    condition: [{ type: Input }]
};

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
class AjfFbConditionEditorDialog {
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    get fields() {
        return this._fields;
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.editedValue;
        this.dialogRef.close(newValue);
    }
}
AjfFbConditionEditorDialog.decorators = [
    { type: Component, args: [{
                selector: 'ajf-condition-editor-dialog',
                template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
            },] }
];
AjfFbConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};

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
/**
 * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
 * @param event The drop event.
 * @param fbService The AjfFormBuilderService.
 * @param nodeEntry The current nodeEntry, if present.
 * @param content True if the current nodeEntry contains other nodeEntries.
 */
function onDropProcess(event, fbService, nodeEntry, content = false) {
    const itemData = event.item.data;
    const containerId = event.container.id;
    if (!itemData.node) {
        if (nodeEntry == null && containerId === 'slides-list') {
            fbService.insertNode(itemData, null, 0, content, event.currentIndex);
            return;
        }
        const emptySlot = content ? { parent: nodeEntry.node, parentNode: 0 } :
            nodeEntry;
        fbService.insertNode(itemData, emptySlot.parent, emptySlot.parentNode, content, event.currentIndex);
        return;
    }
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    fbService.moveNodeEntry(event.item.data, previousIndex, currentIndex);
}
/**
 * Disables the drag&drop of Slide items.
 * @param item The dragged item.
 */
function disableSlideDropPredicate(item) {
    return !item.data.isSlide;
}
/**
 * Disables the drag&drop of Field items.
 * @param item The dragged item.
 */
function disableFieldDropPredicate(item) {
    if (!item.data.isSlide) {
        return false;
    }
    return true;
}

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
class AjfFbStringIdentifierDialogComponent {
    constructor(_service, _cdr) {
        this._service = _service;
        this._cdr = _cdr;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'value', 'show', 'delete'];
        this.separatorKeysCodes = [ENTER, COMMA];
        this._stringIdentifierSub = Subscription.EMPTY;
        this._stringIdentifierSub = _service.stringIdentifier.subscribe(identifier => {
            this.dataSource.data = [...identifier];
        });
        this.fields$ = _service.flatFields.pipe(map(fields => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))
            .map(f => f.name)
            .filter(f => f.length > 0)), shareReplay(1));
    }
    addRow() {
        this.dataSource.data = [...this.dataSource.data, { label: '', value: [], show: undefined }];
    }
    deleteRow(rowIdx) {
        this.dataSource.data = [
            ...this.dataSource.data.slice(0, rowIdx),
            ...this.dataSource.data.slice(rowIdx + 1),
        ];
    }
    addValue(row, evt, valueInput) {
        if (evt.value.length === 0) {
            return;
        }
        row.value = [...row.value, evt.value];
        valueInput.value = '';
        this._cdr.markForCheck();
    }
    removeValue(row, value) {
        const idx = row.value.indexOf(value);
        if (idx > -1) {
            row.value = [
                ...row.value.slice(0, idx),
                ...row.value.slice(idx + 1),
            ];
            this._cdr.markForCheck();
        }
    }
    ngOnDestroy() {
        this._stringIdentifierSub.unsubscribe();
    }
    saveStringIdentifier() {
        this._service.saveStringIdentifier(this.dataSource.data);
    }
    selected(row, evt) {
        row.value = [...row.value, evt.option.value];
        this._cdr.markForCheck();
    }
}
AjfFbStringIdentifierDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-string-identifier-dialog',
                template: "<h3 matDialogTitle>{{'Edit identifier'|transloco}}</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span>{{'Add value'|transloco}}</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef>{{'Label'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input\n            matInput\n            [placeholder]=\"'Label'|transloco\"\n            autofocus\n            [(ngModel)]=\"row.label\"\n          />\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef>{{'Value'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n              *ngFor=\"let field of row.value\"\n              (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n            #valueInput\n            [ngModel]=\"row.value\"\n            [matAutocomplete]=\"valueAc\"\n            [matChipInputFor]=\"chipList\"\n            [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n            [matChipInputAddOnBlur]=\"true\"\n            (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n            [placeholder]=\"'Value'|transloco\"\n          />\n          <mat-autocomplete\n            #valueAc=\"matAutocomplete\"\n            (optionSelected)=\"selected(row, $event)\"\n          >\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\"\n              >{{field}}</mat-option\n            >\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"show\">\n      <mat-header-cell *matHeaderCellDef>{{'Show'|transloco}}</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-select matNativeControl [(ngModel)]=\"row.show\">\n            <mat-option value=\"all\">{{'All'|transloco}}</mat-option>\n            <mat-option value=\"first\">{{'First'|transloco}}</mat-option>\n            <mat-option value=\"last\">{{'Last'|transloco}}</mat-option>\n          </mat-select>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef\n        >{{'Delete'|transloco}}</mat-header-cell\n      >\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button matDialogClose (click)=\"saveStringIdentifier()\">\n    {{'Save'|transloco}}\n  </button>\n</mat-dialog-actions>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            },] }
];
AjfFbStringIdentifierDialogComponent.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: ChangeDetectorRef }
];

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
class AjfFormBuilder {
    constructor(_service, _dialog) {
        this._service = _service;
        this._dialog = _dialog;
        this._globalExpanded = false;
        /**
         * The list of the ids of all the dropLists connected to the formbuilder source list.
         */
        this._connectedDropLists = this._service.connectedDropLists;
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._stringIdentifierSub = Subscription.EMPTY;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub =
            this._service.editedCondition.subscribe((condition) => {
                if (this._editConditionDialog != null) {
                    this._editConditionDialog.close();
                    this._editConditionDialog = null;
                }
                if (condition != null) {
                    this._editConditionDialog =
                        this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
                }
            });
        this._editChoicesOriginSub =
            this._service.editedChoicesOrigin.subscribe((choicesOrigin) => {
                if (this._editChoicesOriginDialog != null) {
                    this._editChoicesOriginDialog.close();
                    this._editChoicesOriginDialog = null;
                }
                if (choicesOrigin != null) {
                    this._editChoicesOriginDialog =
                        this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                }
            });
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        });
        this.nodeEntriesTree.pipe(sample(this._vc)).subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
        });
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe(() => { });
    }
    get form() {
        return this._form;
    }
    set form(form) {
        if (this._form !== form) {
            this._form = form;
            if (this._init) {
                this._setCurrentForm();
            }
        }
    }
    get nodeTypes() {
        return this._nodeTypes;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get isGlobalExpanded() {
        return this._globalExpanded;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    ngAfterViewChecked() {
        this._vc.emit();
    }
    ngAfterContentInit() {
        this._setCurrentForm();
        this._init = true;
    }
    ngOnDestroy() {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
    }
    createChoicesOrigin() {
        this._service.createChoicesOrigin();
    }
    disableDrop() {
        return false;
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        onDropProcess(event, this._service, null, content);
    }
    editChoicesOrigin(choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    }
    editStringIdentifier() {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, { disableClose: true, width: '60%', height: '60%' });
    }
    expandAll() {
        this._globalExpanded = true;
    }
    collapseAll() {
        this._globalExpanded = false;
    }
    expandToggle(evt) {
        if (evt.checked) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }
    _setCurrentForm() {
        this._service.setForm(this._form);
    }
}
AjfFormBuilder.decorators = [
    { type: Component, args: [{
                selector: 'ajf-form-builder',
                template: "<mat-toolbar>\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\">\n    {{'Choices'|transloco}}\n  </button>\n  <button mat-button (click)=\"editStringIdentifier()\">\n    {{'Identifier'|transloco}}\n  </button>\n  <button\n    mat-icon-button\n    aria-label=\"Collapsed\"\n    matTooltip=\"Keep slides collapsed\"\n  >\n    <mat-icon>unfold_less</mat-icon>\n  </button>\n  <mat-slide-toggle\n    color=\"primary\"\n    (change)=\"expandToggle($event)\"\n  ></mat-slide-toggle>\n  <button\n    mat-icon-button\n    aria-label=\"Expanded\"\n    matTooltip=\"Keep slides expanded\"\n  >\n    <mat-icon>unfold_more</mat-icon>\n  </button>\n  <mat-menu #choicesMenu>\n    <button (click)=\"createChoicesOrigin()\" mat-menu-item>\n      {{'New..'|transloco}}\n    </button>\n    <ng-container *ngIf=\"choicesOrigins|async as cos\">\n      <button\n        *ngFor=\"let choicesOrigin of cos\"\n        (click)=\"editChoicesOrigin(choicesOrigin)\"\n        mat-menu-item\n      >\n        {{ (choicesOrigin.label || choicesOrigin.name)| transloco }}\n      </button>\n    </ng-container>\n  </mat-menu>\n  <span class=\"ajf-spacer\"></span>\n  <button mat-icon-button (click)=\"rightSidenav.toggle()\">\n    <mat-icon>settings</mat-icon>\n  </button>\n</mat-toolbar>\n<mat-drawer-container cdkDropListGroup>\n  <mat-drawer #leftSidenav position=\"start\" mode=\"over\">\n    <div\n      #sourceDropList\n      cdkDropList\n      [cdkDropListConnectedTo]=\"(connectedDropLists|async)!\"\n      [cdkDropListEnterPredicate]=\"disableDrop\"\n      [cdkDropListData]=\"nodeTypes\"\n    >\n      <ajf-fb-node-type-entry\n        *ngFor=\"let nodeType of nodeTypes\"\n        cdkDrag\n        [cdkDragData]=\"nodeType\"\n        (cdkDragStarted)=\"leftSidenav.close()\"\n        [nodeType]=\"nodeType\"\n      ></ajf-fb-node-type-entry>\n    </div>\n  </mat-drawer>\n  <mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </mat-drawer>\n  <div #designer class=\"ajf-designer\">\n    <ajf-fb-node-entry\n      id=\"slides-list\"\n      cdkDropList\n      (cdkDropListDropped)=\"onDrop($event)\"\n      [cdkDropListEnterPredicate]=\"disableFieldDrop\"\n      *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\"\n      [isExpanded]=\"isGlobalExpanded\"\n      [isFirst]=\"isFirst\"\n      [nodeEntry]=\"nodeEntry\"\n    ></ajf-fb-node-entry>\n  </div>\n</mat-drawer-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-form-builder{display:flex;position:relative;min-height:300px;flex-direction:column;align-items:stretch}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{flex:1}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}\n"]
            },] }
];
AjfFormBuilder.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog }
];
AjfFormBuilder.propDecorators = {
    designerCont: [{ type: ViewChild, args: ['designer', { static: true },] }],
    form: [{ type: Input }]
};

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
const branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548', // BROWN
];
class AjfFbNodeEntry {
    constructor(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._isExpanded = false;
        this._level = 0;
        this._isDraggable = true;
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
    get hasContent() {
        return this._hasContent;
    }
    get isFirst() {
        return this._isFirst;
    }
    set isFirst(isFirst) {
        this._isFirst = isFirst;
    }
    get isNodeEntry() {
        return this._isNodeEntry;
    }
    get isExpanded() {
        return this._isExpanded;
    }
    set isExpanded(exp) {
        this._isExpanded = exp;
        setTimeout(() => this._updateBranchHeights(), 400);
    }
    get nodeEntry() {
        return this._nodeEntry;
    }
    set nodeEntry(nodeEntry) {
        this._nodeEntry = nodeEntry;
        if (nodeEntry != null && nodeEntry.node !== void 0) {
            const ne = nodeEntry;
            this._isNodeEntry = true;
            const node = ne.node;
            this._hasContent = node != null && isContainerNode(node);
        }
        else {
            this._isNodeEntry = false;
            this._hasContent = false;
        }
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(draggable) {
        this._isDraggable = draggable;
    }
    get realNodeEntry() {
        return this._nodeEntry;
    }
    get branchColors() {
        return this._branchColors;
    }
    get dropZones() {
        return this._dropZones;
    }
    get slideDropZones() {
        return this._slideDropZones;
    }
    get originOffset() {
        return this._originOffset;
    }
    set originOffset(originOffset) {
        this._originOffset = originOffset;
        this._originLeftMargin = `${this._originOffset * 4}px`;
    }
    get originLeftMargin() {
        return this._originLeftMargin;
    }
    get firstBranchColor() {
        return this._firstBranchColor;
    }
    set firstBranchColor(firstBranchColor) {
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
    get currentEditedNode() {
        return this._currentEditedNode;
    }
    onResize() { }
    edit(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry(this.nodeEntry);
    }
    delete(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry(this.nodeEntry);
    }
    isLastNode() {
        if (!this.realNodeEntry || !this.realNodeEntry.children) {
            return false;
        }
        return !this.realNodeEntry.children[0].children;
    }
    isSlide(node) {
        return isSlidesNode(node);
    }
    ngAfterViewInit() {
        setTimeout(() => this._updateBranchHeights());
        this._childEntriesSubscription = this.childEntries.changes.subscribe(() => {
            this._updateBranchHeights();
        });
    }
    ngOnDestroy() {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        onDropProcess(event, this._service, this._nodeEntry, content);
    }
    /**
     * Assigns a progressive id to the dropList, to connect it to the FormBuilder source list.
     * @param empty True if the list is marked as empty.
     */
    assignId(empty = false) {
        return this._service.assignListId(this.realNodeEntry.node, empty);
    }
    disableSlideDrop(item) {
        return disableSlideDropPredicate(item);
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    emptyAreaDropPredicate() {
        return (item, _drop) => {
            if (this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        };
    }
    _updateBranchHeights() {
        if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
            this.childEntries == null) {
            return;
        }
        const nodeEntry = this.nodeEntry;
        const branchLines = this.branchLines.toArray();
        const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
        const childEntries = this.childEntries.toArray().slice(sliceIdx);
        if (branchLines.length != childEntries.length) {
            return;
        }
        branchLines.forEach((bl, idx) => {
            const ce = childEntries[idx];
            bl.height = ce.nativeElement.offsetTop;
        });
    }
}
AjfFbNodeEntry.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-node-entry',
                template: "<ng-container *ngIf=\"nodeEntry != null ; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry && !isLastNode()\">\n    <ajf-fb-branch-line\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n      [offset]=\"idx\"\n      [color]=\"branchColors[idx]\"\n    ></ajf-fb-branch-line>\n  </ng-template>\n\n  <div\n    class=\"mat-card-container\"\n    [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\"\n  >\n    <div\n      *ngIf=\"!isFirst\"\n      class=\"ajf-origin-line\"\n      [style.margin-left]=\"originLeftMargin\"\n      [style.border-color]=\"firstBranchColor\"\n    ></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <ng-container *ngIf=\"!isDraggable; else draggable\">\n        <mat-card>\n          <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-card>\n      </ng-container>\n\n      <ng-template #draggable>\n        <mat-card cdkDrag [cdkDragData]=\"realNodeEntry\" class=\"ajf-draggable-box\">\n          <ng-container\n            *ngIf=\"isSlide(realNodeEntry.node); else fieldPanel\"\n          >\n            <ng-container *ngTemplateOutlet=\"slidePanel\"></ng-container>\n          </ng-container>\n        </mat-card>\n      </ng-template>\n\n      <ng-template #slidePanel>\n        <mat-expansion-panel\n          [expanded]=\"isExpanded\"\n          (opened)=\"isExpanded = true\"\n          (closed)=\"isExpanded = false\"\n          class=\"mat-elevation-z\"\n        >\n          <mat-expansion-panel-header>\n            <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          </mat-expansion-panel-header>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-expansion-panel>\n      </ng-template>\n\n      <ng-template #fieldPanel>\n        <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n        <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n      </ng-template>\n\n      <ng-template #cardTitle>\n        <div class=\"ajf-title-row\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          <span\n            class=\"ajf-title\"\n            [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | transloco\"\n          ></span>\n          <span\n            *ngIf=\"realNodeEntry.node.visibility && realNodeEntry.node.visibility?.condition !== 'true'\"\n            class=\"ajf-visibility-condition\"\n            [innerHTML]=\"'Condition: (' + realNodeEntry.node.visibility?.condition + ')'\"\n          >\n          </span>\n          <span class=\"ajf-actions\">\n            <button\n              [disabled]=\"(currentEditedNode|async) == nodeEntry\"\n              (click)=\"edit($event)\"\n              mat-icon-button\n            >\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button\n              [disabled]=\"(currentEditedNode|async) == null\"\n              (click)=\"delete($event)\"\n              mat-icon-button\n            >\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n      </ng-template>\n\n      <ng-template #cardContent>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n            cdkDropList\n            class=\"ajf-fields-list\"\n            *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n            [id]=\"assignId()\"\n            [level]=\"level + 1\"\n            [isFirst]=\"isFirstChild\"\n            [firstBranchColor]=\"branchColors[idx]\"\n            [nodeEntry]=\"contentEntry\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            [isExpanded]=\"isExpanded\"\n          ></ajf-fb-node-entry>\n          <mat-card\n            class=\"ajf-empty\"\n            *ngIf=\"realNodeEntry.content.length === 0\"\n            cdkDropList\n            [id]=\"assignId(true)\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            ><mat-card-title>Drop your fields here</mat-card-title></mat-card\n          >\n        </div>\n      </ng-template>\n    </ng-template>\n  </div>\n\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ng-container\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n    >\n      <ajf-fb-node-entry\n        *ngIf=\"!isLastNode()\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"\n        [isExpanded]=\"isExpanded\"\n      ></ajf-fb-node-entry>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card\n      class=\"ajf-empty\"\n      cdkDropList\n      [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n      (cdkDropListDropped)=\"onDrop($event)\"\n      ><mat-card-title>Drop your slides here</mat-card-title>\n    </mat-card>\n  </div>\n</ng-template>\n",
                host: { '(window.resize)': 'onResize()' },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:#999}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:#ccc}ajf-fb-node-entry .mat-card-container mat-card.ajf-draggable-box{padding:20px 10px;border-bottom:solid 1px #ccc;border-right:solid 1px #ccc;color:rgba(0,0,0,.87);box-sizing:border-box;cursor:move;background:#fff;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:0;min-height:60px}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform 250ms cubic-bezier(0, 0, 0.2, 1)}\n"]
            },] }
];
AjfFbNodeEntry.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbNodeEntry.propDecorators = {
    branchLines: [{ type: ViewChildren, args: [AjfFbBranchLine,] }],
    childEntries: [{ type: ViewChildren, args: [AjfFbNodeEntry, { read: ElementRef },] }],
    isFirst: [{ type: Input }],
    isExpanded: [{ type: Input }],
    nodeEntry: [{ type: Input }],
    level: [{ type: Input }],
    isDraggable: [{ type: Input }],
    originOffset: [{ type: Input }],
    firstBranchColor: [{ type: Input }]
};

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
class AjfFbValidationConditionEditorDialog {
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    get fields() {
        return this._fields;
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
    }
}
AjfFbValidationConditionEditorDialog.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-validation-condition-editor-dialog',
                template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"errorMessage\"\n      [placeholder]=\"'Error message'|transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-validation-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
            },] }
];
AjfFbValidationConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbValidationConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};

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
class AjfFbWarningConditionEditorDialog {
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    get fields() {
        return this._fields;
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    }
}
AjfFbWarningConditionEditorDialog.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-warning-condition-editor-dialog',
                template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input\n      matInput\n      [(ngModel)]=\"warningMessage\"\n      [placeholder]=\"'Warning message' | transloco\"\n    />\n  </mat-form-field>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-warning-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
            },] }
];
AjfFbWarningConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbWarningConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};

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
function checkRepsValidity(c) {
    const minReps = c.value.minReps;
    const maxReps = c.value.maxReps;
    if (minReps != null && maxReps != null && minReps > maxReps) {
        return { reps: 'Min repetions cannot be greater than max repetitions' };
    }
    return null;
}
function checkValueLimitsValidity(c) {
    const minValue = c.value.minValue;
    const maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return { valueLimit: 'Min value cannot be greater than max value' };
    }
    return null;
}
function checkDigitsValidity(c) {
    const minDigits = c.value.minDigits;
    const maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return { digits: 'Min digits cannot be greater than max digits' };
    }
    return null;
}
class AjfFbNodeProperties {
    constructor(_cdr, _service, _dialog, _fb) {
        this._cdr = _cdr;
        this._service = _service;
        this._dialog = _dialog;
        this._fb = _fb;
        this._fieldSizes = [
            { label: 'Normal', value: 'normal' }, { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' }, { label: 'Tiny', value: 'tiny' },
            { label: 'Mini', value: 'mini' }
        ];
        this._choicesOrigins = [];
        this._conditionalBranches = [];
        this._validationConditions = [];
        this._warningConditions = [];
        this.isRepeatingContainerNode = (nodeEntry) => {
            return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
        };
        this._visibilityOptSub = Subscription.EMPTY;
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
        this._choicesOriginsSub =
            _service.choicesOrigins.subscribe((c) => this._choicesOrigins = c || []);
        this._enabled = this._nodeEntry.pipe(map((n) => n != null));
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
    get fieldSizes() {
        return this._fieldSizes;
    }
    get nodeEntry() {
        return this._nodeEntry;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get enabled() {
        return this._enabled;
    }
    get propertiesForm() {
        return this._propertiesForm;
    }
    get hasChoices() {
        return this._hasChoices;
    }
    get curVisibility() {
        return this._curVisibility;
    }
    get curFormulaReps() {
        return this._curFormulaReps;
    }
    get curChoicesFilter() {
        return this._curChoicesFilter;
    }
    get curForceValue() {
        return this._curForceValue;
    }
    get curFormula() {
        return this._curFormula;
    }
    get conditionalBranches() {
        return this._conditionalBranches;
    }
    get validationConditions() {
        return this._validationConditions;
    }
    get warningConditions() {
        return this._warningConditions;
    }
    get nextSlideCondition() {
        return this._nextSlideCondition;
    }
    get triggerConditions() {
        return this._triggerConditions;
    }
    editVisibility() {
        this._editVisibilityEvt.emit();
    }
    editConditionalBranch(idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    }
    editFormulaReps() {
        this._editFormulaRepsEvt.emit();
    }
    editChoicesFilter() {
        this._editChoicesFilterEvt.emit();
    }
    editFormula() {
        this._editFormulaEvt.emit();
    }
    editForceValue() {
        this._editForceValueEvt.emit();
    }
    editValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    }
    addValidationCondition() {
        this._addValidationConditionEvt.emit();
    }
    removeValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    }
    editWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    }
    addWarningCondition() {
        this._addWarningConditionEvt.emit();
    }
    removeWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    }
    editNextSlideCondition() {
        this._editNextSlideConditionEvt.emit();
    }
    editTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    }
    addTriggerCondition() {
        this._addTriggerConditionEvt.emit();
    }
    removeTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    }
    isField(nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
    }
    isNumericField(node) {
        return isField(node) && isNumberField(node);
    }
    isFieldWithChoices(node) {
        return isField(node) && isFieldWithChoices(node);
    }
    save() {
        this._saveEvt.emit();
    }
    cancel() {
        this._service.cancelNodeEntryEdit();
    }
    ngOnDestroy() {
        this._choicesOriginsSub.unsubscribe();
        this._visibilityOptSub.unsubscribe();
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
    _initSave() {
        this._saveSub = this._saveEvt
            .pipe(withLatestFrom(this.propertiesForm))
            .subscribe(([_, formGroup]) => {
            const fg = formGroup;
            const val = Object.assign(Object.assign({}, fg.value), { conditionalBranches: this._conditionalBranches });
            this._service.saveNodeEntry(val);
        });
    }
    _initForm() {
        this._propertiesForm = this._nodeEntry.pipe(filter((n) => n != null), map((n) => {
            if (this._visibilityOptSub != null) {
                this._visibilityOptSub.unsubscribe();
            }
            if (this._visibilitySub != null) {
                this._visibilitySub.unsubscribe();
            }
            if (this._conditionalBranchesSub != null) {
                this._conditionalBranchesSub.unsubscribe();
            }
            n = n;
            const visibility = n.node.visibility != null ? n.node.visibility.condition : null;
            const visibilityOpt = n.node.visibility != null ? this._guessVisibilityOpt(n.node.visibility) : null;
            let controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            const validators = [];
            if (isRepeatingContainerNode(n.node)) {
                const rn = n.node;
                const formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (this.isField(n)) {
                const field = n.node;
                let forceValue = null;
                let notEmpty = false;
                let validationConditions = [];
                if (field.validation != null) {
                    if (field.validation.forceValue != null) {
                        forceValue = field.validation.forceValue.condition;
                    }
                    notEmpty = field.validation.notEmpty != null;
                    validationConditions = (field.validation.conditions || []).map(c => {
                        return { condition: c.condition, errorMessage: c.errorMessage };
                    });
                }
                let notEmptyW = false;
                let warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || []).map(w => {
                        return { condition: w.condition, warningMessage: w.warningMessage };
                    });
                }
                const formula = field.formula != null ? field.formula.formula : null;
                controls.description = field.description;
                controls.defaultValue = field.defaultValue;
                controls.hint = field.hint;
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
                const numField = n.node;
                let minValue;
                let maxValue;
                let minDigits;
                let maxDigits;
                if (numField.validation != null) {
                    if (numField.validation.minValue != null) {
                        minValue = (numField.validation.minValue.condition || '').replace('$value >= ', '');
                    }
                    if (numField.validation.maxValue != null) {
                        maxValue = (numField.validation.maxValue.condition || '').replace('$value <= ', '');
                    }
                    if (numField.validation.minDigits != null) {
                        minDigits = (numField.validation.minDigits.condition ||
                            '').replace('$value.toString().length >= ', '');
                    }
                    if (numField.validation.maxDigits != null) {
                        maxDigits = (numField.validation.maxDigits.condition ||
                            '').replace('$value.toString().length <= ', '');
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
                const fieldWithChoices = n.node;
                let triggerConditions = (fieldWithChoices.triggerConditions || []).map((c) => c.condition);
                controls.choicesOriginRef = fieldWithChoices.choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula :
                    null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                this._triggerConditions = triggerConditions;
            }
            const fg = this._fb.group(controls);
            fg.setValidators(validators);
            this._conditionalBranches = n.node.conditionalBranches.map(c => c.condition);
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
        }), publishReplay(1), refCount());
    }
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
    _initRemoveTriggerCondition() {
        this._removeTriggerConditionSub = this._removeTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['triggerConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddTriggerCondition() {
        this._addTriggerConditionSub = this._addTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['triggerConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        });
    }
    _initTriggerConditionEdit() {
        this._editConditionDialogSub = Subscription.EMPTY;
        this._cdr.markForCheck();
        this._editTriggerConditionSub =
            this._editTriggerConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([vcIdx, fg]) => {
                this._destroyConditionDialog();
                if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) {
                    return;
                }
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                const cmp = this._editConditionDialog.componentInstance;
                cmp.condition = this._triggerConditions[vcIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._triggerConditions[vcIdx] = cond;
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initRemoveWarningCondition() {
        this._removeWarningConditionSub = this._removeWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['warningConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddWarningCondition() {
        this._addWarningConditionSub = this._addWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['warningConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    }
    _initWarningConditionEdit() {
        this._editWarningConditionSub =
            this._editWarningConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([vcIdx, fg]) => {
                this._destroyWarningConditionDialog();
                if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) {
                    return;
                }
                this._editWarningConditionDialog =
                    this._dialog.open(AjfFbWarningConditionEditorDialog);
                const cmp = this._editWarningConditionDialog.componentInstance;
                const w = this._warningConditions[vcIdx];
                cmp.condition = w.condition;
                cmp.warningMessage = w.warningMessage;
                this._editWarningConditionDialogSub =
                    this._editWarningConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._warningConditions[vcIdx] = cond;
                        }
                        this._editWarningConditionDialogSub.unsubscribe();
                        this._editWarningConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initRemoveValidationCondition() {
        this._removeValidationConditionSub = this._removeValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['validationConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddValidationCondition() {
        this._addValidationConditionSub = this._addValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['validationConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    }
    _initValidationConditionEdit() {
        this._editValidationConditionSub =
            this._editValidationConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([vcIdx, fg]) => {
                this._destroyValidationConditionDialog();
                if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) {
                    return;
                }
                this._editValidationConditionDialog =
                    this._dialog.open(AjfFbValidationConditionEditorDialog);
                const cmp = this._editValidationConditionDialog.componentInstance;
                const v = this._validationConditions[vcIdx];
                cmp.condition = v.condition;
                cmp.errorMessage = v.errorMessage;
                this._editValidationConditionDialogSub =
                    this._editValidationConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._validationConditions[vcIdx] = cond;
                        }
                        this._editValidationConditionDialogSub.unsubscribe();
                        this._editValidationConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initForceValueEdit() {
        this._editForceValueSub =
            this._editForceValueEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['forceValue'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initNextSlideConditionEdit() {
        this._editNextSlideConditionSub =
            this._editNextSlideConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['nextSlideCondition'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initFormulaEdit() {
        this._editConditionDialogSub = Subscription.EMPTY;
        this._cdr.markForCheck();
        this._editFormulaSub =
            this._editFormulaEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['formula'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initFormulaRepsEdit() {
        this._editFormulaRepsSub =
            this._editFormulaRepsEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['formulaReps'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initChoicesFilterEdit() {
        this._editChoicesFilterSub =
            this._editChoicesFilterEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['choicesFilter'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initConditionalBranchEdit() {
        this._editConditionalBranchSub =
            this._editConditionalBranchEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([cbIdx, fg]) => {
                this._destroyConditionDialog();
                if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) {
                    return;
                }
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition =
                    this._conditionalBranches[cbIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._conditionalBranches[cbIdx] = cond;
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initVisibilityEdit() {
        this._editVisibilitySub =
            this._editVisibilityEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['visibility'];
                const condition = ctrl.value;
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = condition;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _handleTriggerCondtionsChange(fg) {
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.triggerConditions) ===
            JSON.stringify(v2.triggerConditions)))
            .subscribe((v) => {
            this._triggerConditions = v.triggerConditions;
            this._cdr.markForCheck();
        });
    }
    _handleWarningCondtionsChange(fg) {
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.warningConditions) ===
            JSON.stringify(v2.warningConditions)))
            .subscribe((v) => {
            this._warningConditions = v.warningConditions;
            this._cdr.markForCheck();
        });
    }
    _handleValidationCondtionsChange(fg) {
        this._validationConditionsSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.validationConditions) ===
                JSON.stringify(v2.validationConditions)))
                .subscribe((v) => {
                this._validationConditions = v.validationConditions;
                this._cdr.markForCheck();
            });
    }
    _handleForceValueChange(fg) {
        this._forceValueSub =
            fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.forceValue === v2.forceValue))
                .subscribe((v) => {
                this._curForceValue = v.forceValue;
                this._cdr.markForCheck();
            });
    }
    _handleNextSlideConditionChange(fg) {
        this._formulaSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
                .subscribe((v) => {
                this._nextSlideCondition = v.nextSlideCondition;
                this._cdr.markForCheck();
            });
        this._formulaSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
                .subscribe((v) => {
                this._nextSlideCondition = v.nextSlideCondition;
                this._cdr.markForCheck();
            });
    }
    _handleFormulaChange(fg) {
        this._formulaSub =
            fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.formula === v2.formula))
                .subscribe((v) => {
                this._curFormula = v.formula;
                this._cdr.markForCheck();
            });
    }
    _handleFormulaRepsChange(fg) {
        this._formulaRepsSub =
            fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.formulaReps === v2.formulaReps))
                .subscribe((v) => {
                this._curFormulaReps = v.formulaReps;
                this._cdr.markForCheck();
            });
    }
    _handleChoicesFilterChange(fg) {
        this._choicesFilterSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.choicesFilter === v2.choicesFilter))
                .subscribe((v) => {
                this._curChoicesFilter = v.choicesFilter;
                this._cdr.markForCheck();
            });
    }
    _handleConditionalBranchesChange(fg) {
        this._conditionalBranchesSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.conditionalBranchesNum === v2.conditionalBranchesNum))
                .subscribe((v) => {
                const cbNum = v.conditionalBranchesNum;
                const curCbNum = this._conditionalBranches.length;
                if (curCbNum < cbNum) {
                    let newCbs = [];
                    for (let i = curCbNum; i < cbNum; i++) {
                        newCbs.push(alwaysCondition().condition);
                    }
                    this._conditionalBranches = this._conditionalBranches.concat(newCbs);
                }
                else if (curCbNum > cbNum) {
                    this._conditionalBranches.splice(0, curCbNum - cbNum);
                }
                this._cdr.markForCheck();
            });
    }
    _handleVisibilityChange(fg) {
        this._visibilitySub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.visibilityOpt === v2.visibilityOpt))
                .subscribe((v) => {
                const visibilityOpt = v.visibilityOpt;
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
            });
        this._visibilitySub = fg.valueChanges
            .pipe(filter(v => v.visibilityOpt === 'condition'), distinctUntilChanged((v1, v2) => v1.visibility === v2.visibility))
            .subscribe(v => {
            this._curVisibility = v.visibility;
            this._cdr.markForCheck();
        });
    }
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
    { type: Component, args: [{
                selector: 'ajf-fb-node-properties',
                template: "<div\n  [style.display]=\"(enabled|async) ? 'none' : 'block'\"\n  class=\"ajf-disabled-overlay\"\n></div>\n<div class=\"ajf-header\">\n  <h3>{{'Properties'|transloco}}</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input\n            matInput\n            formControlName=\"name\"\n            [placeholder]=\"'Name' | transloco\"\n          />\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input\n            matInput\n            formControlName=\"label\"\n            [placeholder]=\"'Label' | transloco\"\n          />\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label>{{'Visibility'|transloco}}</mat-label>\n          <mat-select\n            formControlName=\"visibilityOpt\"\n            [placeholder]=\"'Visible' | transloco\"\n          >\n            <mat-option value=\"always\">{{'Always'|transloco}}</mat-option>\n            <mat-option value=\"never\">{{'Never'|transloco}}</mat-option>\n            <mat-option value=\"condition\"\n              >{{'Condition...'|transloco}}</mat-option\n            >\n          </mat-select>\n        </mat-form-field>\n        <button\n          (click)=\"editVisibility()\"\n          [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n          mat-raised-button\n          [matTooltip]=\"curVisibility || ''\"\n        >\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label>{{'Branches'|transloco}}</label></div>\n        <div>\n          <mat-slider\n            formControlName=\"conditionalBranchesNum\"\n            thumbLabel\n            tickInterval=\"auto\"\n            min=\"1\"\n            max=\"5\"\n            step=\"1\"\n          ></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button\n            (click)=\"editConditionalBranch(idx)\"\n            mat-raised-button\n            [matTooltip]=\"branch\"\n          >\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label>{{'Repetitions'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editFormulaReps()\"\n              mat-raised-button\n              [matTooltip]=\"curFormulaReps || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label>{{'Min repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider\n              formControlName=\"minReps\"\n              thumbLabel\n              tickInterval=\"auto\"\n              min=\"1\"\n              max=\"5\"\n              step=\"1\"\n            ></mat-slider>\n          </div>\n          <div><label>{{'Max repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider\n              formControlName=\"maxReps\"\n              thumbLabel\n              tickInterval=\"auto\"\n              min=\"1\"\n              max=\"5\"\n              step=\"1\"\n            ></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label>{{'Field size'|transloco}}</mat-label>\n            <mat-select\n              formControlName=\"size\"\n              [placeholder]=\"'Size' | transloco\"\n            >\n              <mat-option\n                *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\"\n              >\n                {{ fieldSize.label|transloco }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"hint\"\n              [placeholder]=\"'Hint' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea\n              matInput\n              formControlName=\"description\"\n              [placeholder]=\"'Description' | transloco\"\n            ></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Formula'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editFormula()\"\n              mat-raised-button\n              [matTooltip]=\"curFormula || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label>{{'Force value'|translco}}</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\"\n            >{{'Not empty'|transloco}}</mat-checkbox\n          >\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | transloco }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div\n            *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n            class=\"ajf-validation-row ajf-emph\"\n          >\n            {{'No conditions'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let validationCondition of validationConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editValidationCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"validationCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon\n              class=\"ajf-pointer\"\n              (click)=\"removeValidationCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\"\n            >{{'Not empty warning'|transloco}}</mat-checkbox\n          >\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{'Warnings'|transloco}}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div\n            *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n            class=\"ajf-validation-row ajf-emph\"\n          >\n            {{'No warnings'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let warningCondition of warningConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editWarningCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"warningCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Go to next slide condition'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editNextSlideCondition()\"\n              mat-raised-button\n              [matTooltip]=\"nextSlideCondition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label>{{'Choices origins'|transloco}}</mat-label>\n              <mat-select\n                formControlName=\"choicesOriginRef\"\n                [placeholder]=\"'Choices' | transloco\"\n              >\n                <mat-option\n                  *ngFor=\"let choicesOrigin of choicesOrigins\"\n                  [value]=\"choicesOrigin.name\"\n                >\n                  {{ (choicesOrigin.label || choicesOrigin.name)|transloco }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label>{{'Choices filter'|transloco}}</label></div>\n            <div>\n              <button\n                (click)=\"editChoicesFilter()\"\n                mat-raised-button\n                [matTooltip]=\"curChoicesFilter\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\"\n              >{{'Force expanded selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\"\n              >{{'Force narrow selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label>{{'Trigger selection'|transloco}}</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\"\n                >add_circle_outline</mat-icon\n              >\n            </div>\n            <div\n              *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\"\n            >\n              {{'No trigger condition'|transloco}}\n            </div>\n            <div\n              class=\"ajf-validation-row\"\n              *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"\n            >\n              <button\n                (click)=\"editTriggerCondition(idx)\"\n                mat-raised-button\n                [matTooltip]=\"triggerCondition\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\"\n                >remove_circle_outline</mat-icon\n              >\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
            },] }
];
AjfFbNodeProperties.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormBuilderService },
    { type: MatDialog },
    { type: FormBuilder }
];

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
class AjfFbNodeTypeEntry {
    constructor(_cdr) {
        this._cdr = _cdr;
    }
    get nodeType() {
        return this._nodeType;
    }
    set nodeType(nodeType) {
        this._nodeType = nodeType;
        this._cdr.markForCheck();
    }
}
AjfFbNodeTypeEntry.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-node-type-entry',
                template: "<ng-container *ngIf=\"nodeType\">\n  <mat-icon\n    [fontSet]=\"nodeType.icon.fontSet\" [fontIcon]=\"nodeType.icon.fontIcon\"></mat-icon>\n  {{ nodeType.label }}\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}\n"]
            },] }
];
AjfFbNodeTypeEntry.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AjfFbNodeTypeEntry.propDecorators = {
    nodeType: [{ type: Input }]
};

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
class AjfFormBuilderModule {
}
AjfFormBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AjfMonacoEditorModule, AjfNodeIconModule, CommonModule, DragDropModule,
                    FormsModule, MatAutocompleteModule, MatButtonModule, MatCardModule,
                    MatCheckboxModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
                    MatIconModule, MatInputModule, MatListModule, MatMenuModule,
                    MatSelectModule, MatSidenavModule, MatSliderModule, MatTableModule,
                    MatToolbarModule, MatTooltipModule, ReactiveFormsModule, AjfTranslocoModule,
                    MatExpansionModule, MatSlideToggleModule,
                ],
                declarations: [
                    AjfFbBranchLine,
                    AjfFbChoicesOriginEditor,
                    AjfFbChoicesOriginEditorDialog,
                    AjfFbConditionEditor,
                    AjfFbConditionEditorDialog,
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
                providers: [
                    AjfFormBuilderService,
                ],
            },] }
];

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderService, disableFieldDropPredicate, disableSlideDropPredicate, flattenNodes, onDropProcess, AjfFbBranchLine as ɵgc_ajf_src_material_form_builder_form_builder_a, AjfFbChoicesOriginEditor as ɵgc_ajf_src_material_form_builder_form_builder_b, AjfFbChoicesOriginEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_c, AjfFbConditionEditor as ɵgc_ajf_src_material_form_builder_form_builder_d, AjfFbConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_e, AjfFbNodeEntry as ɵgc_ajf_src_material_form_builder_form_builder_f, AjfFbNodeProperties as ɵgc_ajf_src_material_form_builder_form_builder_g, AjfFbNodeTypeEntry as ɵgc_ajf_src_material_form_builder_form_builder_h, AjfFbStringIdentifierDialogComponent as ɵgc_ajf_src_material_form_builder_form_builder_i, AjfFbValidationConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_j, AjfFbWarningConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_k };
//# sourceMappingURL=form-builder.js.map
