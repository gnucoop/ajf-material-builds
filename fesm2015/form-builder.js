import { AjfMonacoEditor, AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { AjfNodeIconModule } from '@ajf/material/node-icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, Input, EventEmitter, Injectable, ViewChild, ChangeDetectorRef, ViewChildren, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { isChoicesFixedOrigin, isContainerNode, isSlidesNode, AjfNodeType, AjfFieldType, createField, createContainerNode, createForm, createChoicesFixedOrigin, isRepeatingContainerNode, isField, createValidationGroup, notEmptyValidation, minValidation, maxValidation, minDigitsValidation, maxDigitsValidation, createValidation, createWarningGroup, notEmptyWarning, createWarning, isFieldWithChoices, AjfValidationService, isNumberField } from '@ajf/core/forms';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, combineLatest, Subscription } from 'rxjs';
import { filter, map, scan, publishReplay, refCount, withLatestFrom, shareReplay, sample, distinctUntilChanged } from 'rxjs/operators';
import { createCondition, alwaysCondition, createFormula, AjfExpressionUtils, neverCondition } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/branch-line.ts
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
    { type: Component, args: [{
                selector: 'ajf-fb-branch-line',
                template: "",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px}\n"]
            }] }
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._offset;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._color;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._height;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfFbBranchLine.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/choices-origin-data-source.ts
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    ChoicesOriginDataSource.prototype._choices;
    /**
     * @type {?}
     * @private
     */
    ChoicesOriginDataSource.prototype._choicesObs;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/choices-origin-editor.ts
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
    get displayedColumns() {
        return this._displayedColumns;
    }
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
    get choices() {
        return this._choices;
    }
    /**
     * @return {?}
     */
    get choicesArr() {
        return this._choicesArr;
    }
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
    { type: Component, args: [{
                selector: 'ajf-fb-choices-origin-editor',
                template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\"\n        [placeholder]=\"'Name' | translate\">\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\"\n        [placeholder]=\"'Label' | translate\">\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span translate>Add value</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\">\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\">\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n            <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"]
            }] }
];
AjfFbChoicesOriginEditor.propDecorators = {
    choicesOrigin: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._displayedColumns;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._choicesOrigin;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.editing;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.name;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.label;
    /** @type {?} */
    AjfFbChoicesOriginEditor.prototype.canEditChoices;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._choices;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditor.prototype._choicesArr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AjfFormBuilderNodeTypeEntry() { }
if (false) {
    /** @type {?} */
    AjfFormBuilderNodeTypeEntry.prototype.label;
    /** @type {?} */
    AjfFormBuilderNodeTypeEntry.prototype.icon;
    /** @type {?} */
    AjfFormBuilderNodeTypeEntry.prototype.nodeType;
    /** @type {?|undefined} */
    AjfFormBuilderNodeTypeEntry.prototype.isSlide;
}
/**
 * @record
 */
function AjfFormBuilderNodeEntry() { }
if (false) {
    /** @type {?} */
    AjfFormBuilderNodeEntry.prototype.node;
    /** @type {?} */
    AjfFormBuilderNodeEntry.prototype.container;
    /** @type {?} */
    AjfFormBuilderNodeEntry.prototype.children;
    /** @type {?} */
    AjfFormBuilderNodeEntry.prototype.content;
}
/**
 * @record
 */
function AjfFormBuilderEmptySlot() { }
if (false) {
    /** @type {?} */
    AjfFormBuilderEmptySlot.prototype.parent;
    /** @type {?} */
    AjfFormBuilderEmptySlot.prototype.parentNode;
}
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
    const entries = nodes.filter((/**
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
            entries.push({ parent: parent, parentNode: i });
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
    get availableNodeTypes() {
        return this._availableNodeTypes;
    }
    /**
     * Current edited form stream
     *
     * \@readonly
     * \@memberOf AjfFormBuilderService
     * @return {?}
     */
    get form() {
        return this._formObs;
    }
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
    get nodes() {
        return this._nodes;
    }
    /**
     * @return {?}
     */
    get flatNodes() {
        return this._flatNodes;
    }
    /**
     * @return {?}
     */
    get flatFields() {
        return this._flatFields;
    }
    /**
     * @return {?}
     */
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    /**
     * @return {?}
     */
    get editedNodeEntry() {
        return this._editedNodeEntryObs;
    }
    /**
     * @return {?}
     */
    get editedCondition() {
        return this._editedConditionObs;
    }
    /**
     * @return {?}
     */
    get editedChoicesOrigin() {
        return this._editedChoicesOriginObs;
    }
    /**
     * @return {?}
     */
    get beforeNodesUpdate() {
        return this._beforeNodesUpdateObs;
    }
    /**
     * @return {?}
     */
    get afterNodeUpdate() {
        return this._afterNodeUpdateObs;
    }
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
            const cn = isContainerNode(parent) && inContent ? ((/** @type {?} */ (parent))) :
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
        return combineLatest([
            this.form, this.nodes, this.attachmentsOrigins, this.choicesOrigins,
            this.stringIdentifier
        ])
            .pipe(filter((/**
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
        this._form.subscribe((/**
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
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            }));
            this._stringIdentifierUpdates.next((/**
             * @param {?} _
             * @return {?}
             */
            (_) => {
                return form != null && form.stringIdentifier != null ? form.stringIdentifier.slice(0) :
                    [];
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
        ((/** @type {?} */ (this._deleteNodeEntryEvent)))
            .pipe(map((/**
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
        })))
            .subscribe(this._nodesUpdates);
    }
}
AjfFormBuilderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AjfFormBuilderService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._availableNodeTypes;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._form;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._formObs;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._attachmentsOrigins;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._choicesOrigins;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._stringIdentifier;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._nodes;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._flatNodes;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._flatFields;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._nodeEntriesTree;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._editedNodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._editedNodeEntryObs;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._editedCondition;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._editedConditionObs;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._editedChoicesOrigin;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._editedChoicesOriginObs;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._beforeNodesUpdate;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._beforeNodesUpdateObs;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._afterNodeUpdate;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._afterNodeUpdateObs;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._nodesUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._attachmentsOriginsUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._choicesOriginsUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._stringIdentifierUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._saveNodeEntryEvent;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilderService.prototype._deleteNodeEntryEvent;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/choices-origin-editor-dialog.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfFbChoicesOriginEditorDialog {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._choicesOrigin =
            this._service.editedChoicesOrigin.pipe(filter((/**
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
        this._service.saveChoicesOrigin({ label: this.editor.label, name: this.editor.name, choices: this.editor.choicesArr });
    }
    /**
     * @return {?}
     */
    cancelChoicesOriginEdit() {
        this._service.cancelChoicesOriginEdit();
    }
}
AjfFbChoicesOriginEditorDialog.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-choices-origin-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit choices origin</h3>\n<mat-dialog-content>\n  <ajf-fb-choices-origin-editor\n      *ngIf=\"choicesOrigin|async as co\"\n      [choicesOrigin]=\"co!\"></ajf-fb-choices-origin-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveChoicesOrigin()\">Save</button>\n  <button mat-button translate (click)=\"cancelChoicesOriginEdit()\">Close</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfFbChoicesOriginEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService }
];
AjfFbChoicesOriginEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbChoicesOriginEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfFbChoicesOriginEditorDialog.prototype.editor;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditorDialog.prototype._choicesOrigin;
    /**
     * @type {?}
     * @private
     */
    AjfFbChoicesOriginEditorDialog.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/condition-editor.ts
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
    get fields() {
        return this._fields;
    }
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
    /**
     * @private
     * @return {?}
     */
    _updateVariables() {
        if (this._fields == null) {
            return;
        }
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
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
        catch (e) {
        }
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
        catch (e) {
        }
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
    { type: Component, args: [{
                selector: 'ajf-condition-editor',
                template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"]
            }] }
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
if (false) {
    /** @type {?} */
    AjfFbConditionEditor.prototype.monacoEditor;
    /**
     * @type {?}
     * @private
     */
    AjfFbConditionEditor.prototype._fields;
    /** @type {?} */
    AjfFbConditionEditor.prototype.condition;
    /** @type {?} */
    AjfFbConditionEditor.prototype.editedValue;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/condition-editor-dialog.ts
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
    get fields() {
        return this._fields;
    }
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
    { type: Component, args: [{
                selector: 'ajf-condition-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit condition</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n      *ngIf=\"fields|async as curFields\"\n      [fields]=\"curFields!\"\n      [condition]=\"condition\"></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveCondition()\">Save</button>\n  <button mat-button translate matDialogClose>Close</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
            }] }
];
/** @nocollapse */
AjfFbConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfFbConditionEditorDialog.prototype.editor;
    /**
     * @type {?}
     * @private
     */
    AjfFbConditionEditorDialog.prototype._fields;
    /** @type {?} */
    AjfFbConditionEditorDialog.prototype.condition;
    /** @type {?} */
    AjfFbConditionEditorDialog.prototype.dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/string-identifier-dialog.ts
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
        (f1, f2) => f1.name.localeCompare(f2.name)))
            .map((/**
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
    { type: Component, args: [{
                selector: 'ajf-fb-string-identifier-dialog',
                template: "<h3 matDialogTitle translate>Edit identifier</h3>\n<mat-dialog-content>\n  <button (click)=\"addRow()\" mat-button>\n    <mat-icon>add</mat-icon>\n    <span translate>Add value</span>\n  </button>\n  <mat-table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"label\">\n      <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <input matInput [placeholder]=\"'Label'|translate\" autofocus [(ngModel)]=\"row.label\">\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"value\">\n      <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n        <mat-form-field>\n          <mat-chip-list #chipList>\n            <mat-chip\n                *ngFor=\"let field of row.value\"\n                (removed)=\"removeValue(row, field)\"\n            >\n              {{ field }}\n              <mat-icon matChipRemove>cancel</mat-icon>\n            </mat-chip>\n          </mat-chip-list>\n          <input\n              #valueInput\n              [ngModel]=\"row.value\"\n              [matAutocomplete]=\"valueAc\"\n              [matChipInputFor]=\"chipList\"\n              [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\"\n              [matChipInputAddOnBlur]=\"true\"\n              (matChipInputTokenEnd)=\"addValue(row, $event, valueInput)\"\n              [placeholder]=\"'Value'|translate\">\n          <mat-autocomplete #valueAc=\"matAutocomplete\"\n              (optionSelected)=\"selected(row, $event)\">\n            <mat-option *ngFor=\"let field of fields$ | async\" [value]=\"field\">{{field}}</mat-option>\n          </mat-autocomplete>\n        </mat-form-field>\n      </mat-cell>\n    </ng-container>\n    <ng-container matColumnDef=\"delete\">\n      <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n      <mat-cell *matCellDef=\"let row; let idx = index\">\n          <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n      </mat-cell>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n  </mat-table>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate matDialogClose (click)=\"saveStringIdentifier()\">Save</button>\n</mat-dialog-actions>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["\n"]
            }] }
];
/** @nocollapse */
AjfFbStringIdentifierDialogComponent.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: ChangeDetectorRef }
];
if (false) {
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.dataSource;
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.displayedColumns;
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.fields$;
    /** @type {?} */
    AjfFbStringIdentifierDialogComponent.prototype.separatorKeysCodes;
    /**
     * @type {?}
     * @private
     */
    AjfFbStringIdentifierDialogComponent.prototype._stringIdentifierSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbStringIdentifierDialogComponent.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfFbStringIdentifierDialogComponent.prototype._cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder.ts
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
        this._editConditionSub =
            this._service.editedCondition.subscribe((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                if (this._editConditionDialog != null) {
                    this._editConditionDialog.close();
                    this._editConditionDialog = null;
                }
                if (condition != null) {
                    this._editConditionDialog =
                        this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
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
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        }));
        this.nodeEntriesTree.pipe(sample(((/** @type {?} */ (this._vc))))).subscribe((/**
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
    get form() {
        return this._form;
    }
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
    get nodeTypes() {
        return this._nodeTypes;
    }
    /**
     * @return {?}
     */
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
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
        this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, { disableClose: true, width: '60%', height: '60%' });
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
    { type: Component, args: [{
                selector: 'ajf-form-builder',
                template: "<mat-toolbar>\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\" translate>Choices</button>\n  <button mat-button (click)=\"editStringIdentifier()\" translate>Identifier</button>\n  <mat-menu #choicesMenu>\n    <button (click)=\"createChoicesOrigin()\" mat-menu-item translate>New..</button>\n    <ng-container *ngIf=\"choicesOrigins|async as cos\">\n      <button *ngFor=\"let choicesOrigin of cos\"\n          (click)=\"editChoicesOrigin(choicesOrigin)\" mat-menu-item>\n        {{ choicesOrigin.label || choicesOrigin.name }}\n      </button>\n    </ng-container>\n  </mat-menu>\n  <span class=\"ajf-spacer\"></span>\n  <button mat-icon-button (click)=\"rightSidenav.toggle()\">\n    <mat-icon>settings</mat-icon>\n  </button>\n</mat-toolbar>\n<mat-drawer-container cdkDropListGroup>\n  <mat-drawer #leftSidenav position=\"start\" mode=\"over\">\n    <div #sourceDropList cdkDropList\n        [cdkDropListEnterPredicate]=\"disableDropPredicate\"\n        [cdkDropListData]=\"nodeTypes\">\n      <ajf-fb-node-type-entry *ngFor=\"let nodeType of nodeTypes\"\n          cdkDrag\n          [cdkDragData]=\"nodeType\"\n          (cdkDragStarted)=\"leftSidenav.close()\"\n          [nodeType]=\"nodeType\"></ajf-fb-node-type-entry>\n    </div>\n  </mat-drawer>\n  <mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </mat-drawer>\n  <div #designer class=\"ajf-designer\">\n    <ajf-fb-node-entry\n        *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\"\n        [isFirst]=\"isFirst\"\n        [nodeEntry]=\"nodeEntry\"></ajf-fb-node-entry>\n  </div>\n</mat-drawer-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-form-builder{display:flex;position:relative;min-height:300px;flex-direction:column;align-items:stretch}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{flex:1}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}\n"]
            }] }
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
if (false) {
    /** @type {?} */
    AjfFormBuilder.prototype.designerCont;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._form;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._nodeTypes;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._nodeEntriesTree;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._choicesOrigins;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._vc;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._init;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._beforeNodesUpdateSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editChoicesOriginSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editChoicesOriginDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._stringIdentifierDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._stringIdentifierSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._lastScrollTop;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._dialog;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/node-entry.ts
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
    get hasContent() {
        return this._hasContent;
    }
    /**
     * @return {?}
     */
    get isFirst() {
        return this._isFirst;
    }
    /**
     * @param {?} isFirst
     * @return {?}
     */
    set isFirst(isFirst) {
        this._isFirst = isFirst;
    }
    /**
     * @return {?}
     */
    get isNodeEntry() {
        return this._isNodeEntry;
    }
    /**
     * @return {?}
     */
    get nodeEntry() {
        return this._nodeEntry;
    }
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
    get level() {
        return this._level;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set level(value) {
        this._level = value;
    }
    /**
     * @return {?}
     */
    get realNodeEntry() {
        return (/** @type {?} */ (this._nodeEntry));
    }
    /**
     * @return {?}
     */
    get branchColors() {
        return this._branchColors;
    }
    /**
     * @return {?}
     */
    get dropZones() {
        return this._dropZones;
    }
    /**
     * @return {?}
     */
    get slideDropZones() {
        return this._slideDropZones;
    }
    /**
     * @return {?}
     */
    get originOffset() {
        return this._originOffset;
    }
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
    get originLeftMargin() {
        return this._originLeftMargin;
    }
    /**
     * @return {?}
     */
    get firstBranchColor() {
        return this._firstBranchColor;
    }
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
    onResize() { }
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
        this._childEntriesSubscription = this.childEntries.changes.subscribe((/**
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
        if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
            this.childEntries == null) {
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
    { type: Component, args: [{
                selector: 'ajf-fb-node-entry',
                template: "<ng-container *ngIf=\"nodeEntry != null ; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ajf-fb-branch-line\n        *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n        [offset]=\"idx\"\n        [color]=\"branchColors[idx]\"></ajf-fb-branch-line>\n  </ng-template>\n  <div class=\"mat-card-container\"\n      [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\">\n    <div *ngIf=\"!isFirst\"\n        class=\"ajf-origin-line\"\n        [style.margin-left]=\"originLeftMargin\"\n        [style.border-color]=\"firstBranchColor\"></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <mat-card>\n        <div class=\"ajf-title-row\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          <span class=\"ajf-title\" [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | translate\"></span>\n          <span class=\"ajf-actions\">\n            <button [disabled]=\"(currentEditedNode|async) == nodeEntry\" (click)=\"edit()\" mat-icon-button>\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button [disabled]=\"(currentEditedNode|async) == null\" (click)=\"delete()\" mat-icon-button>\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n              *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n              [level]=\"level + 1\"\n              [isFirst]=\"isFirstChild\"\n              [firstBranchColor]=\"branchColors[idx]\"\n              [nodeEntry]=\"contentEntry\"></ajf-fb-node-entry>\n          <mat-card class=\"ajf-empty\"\n              *ngIf=\"realNodeEntry.content.length === 0\"\n              cdkDropList\n              [cdkDropListEnterPredicate]=\"disableSlideDropPredicate\"\n              (cdkDropListDropped)=\"onDropSuccess($event, true)\">&nbsp;</mat-card>\n        </div>\n      </mat-card>\n    </ng-template>\n    <ng-template [ngIf]=\"!isNodeEntry\">\n      <mat-card class=\"ajf-empty\"\n          cdkDropList\n          [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n          (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card>\n    </ng-template>\n  </div>\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ajf-fb-node-entry\n        *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"></ajf-fb-node-entry>\n  </ng-template>\n</ng-container>\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card class=\"ajf-empty\"\n        cdkDropList\n        [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n        (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card>\n  </div>\n</ng-template>\n",
                host: { '(window.resize)': 'onResize()' },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}\n"]
            }] }
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
if (false) {
    /** @type {?} */
    AjfFbNodeEntry.prototype.branchLines;
    /** @type {?} */
    AjfFbNodeEntry.prototype.childEntries;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._hasContent;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._isFirst;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._isNodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._nodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._level;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._branchColors;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._dropZones;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._slideDropZones;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._originOffset;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._originLeftMargin;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._firstBranchColor;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._currentEditedNode;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._branchLinesSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._childEntriesSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeEntry.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/validation-condition-editor-dialog.ts
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
    get fields() {
        return this._fields;
    }
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
    { type: Component, args: [{
                selector: 'ajf-fb-validation-condition-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit condition</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"errorMessage\" [placeholder]=\"'Error message' | translate\">\n  </mat-form-field>\n  <ajf-condition-editor\n      *ngIf=\"fields|async as curFields\"\n      [fields]=\"curFields!\"\n      [condition]=\"condition\"></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveCondition()\">Save</button>\n  <button mat-button translate matDialogClose>Close</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-validation-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
            }] }
];
/** @nocollapse */
AjfFbValidationConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbValidationConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.editor;
    /**
     * @type {?}
     * @private
     */
    AjfFbValidationConditionEditorDialog.prototype._fields;
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.condition;
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.errorMessage;
    /** @type {?} */
    AjfFbValidationConditionEditorDialog.prototype.dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/warning-condition-editor-dialog.ts
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
    get fields() {
        return this._fields;
    }
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
    { type: Component, args: [{
                selector: 'ajf-fb-warning-condition-editor-dialog',
                template: "<h3 matDialogTitle translate>Edit condition</h3>\n<mat-dialog-content>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"warningMessage\"\n      [placeholder]=\"'Warning message' | translate\">\n  </mat-form-field>\n  <ajf-condition-editor\n      *ngIf=\"fields|async as curFields\"\n      [fields]=\"curFields!\"\n      [condition]=\"condition\"></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button translate (click)=\"saveCondition()\">Save</button>\n  <button mat-button translate matDialogClose>Close</button>\n</mat-dialog-actions>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-warning-condition-editor-dialog mat-dialog-content{overflow:visible}\n"]
            }] }
];
/** @nocollapse */
AjfFbWarningConditionEditorDialog.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialogRef }
];
AjfFbWarningConditionEditorDialog.propDecorators = {
    editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
};
if (false) {
    /** @type {?} */
    AjfFbWarningConditionEditorDialog.prototype.editor;
    /**
     * @type {?}
     * @private
     */
    AjfFbWarningConditionEditorDialog.prototype._fields;
    /** @type {?} */
    AjfFbWarningConditionEditorDialog.prototype.condition;
    /** @type {?} */
    AjfFbWarningConditionEditorDialog.prototype.warningMessage;
    /** @type {?} */
    AjfFbWarningConditionEditorDialog.prototype.dialogRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/node-properties.ts
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
        return { reps: 'Min repetions cannot be greater than max repetitions' };
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
        return { valueLimit: 'Min value cannot be greater than max value' };
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
        return { digits: 'Min digits cannot be greater than max digits' };
    }
    return null;
}
/**
 * @record
 */
function ValidationCondition() { }
if (false) {
    /** @type {?} */
    ValidationCondition.prototype.condition;
    /** @type {?} */
    ValidationCondition.prototype.errorMessage;
}
/**
 * @record
 */
function WarningCondition() { }
if (false) {
    /** @type {?} */
    WarningCondition.prototype.condition;
    /** @type {?} */
    WarningCondition.prototype.warningMessage;
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
            { label: 'Normal', value: 'normal' }, { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' }, { label: 'Tiny', value: 'tiny' },
            { label: 'Mini', value: 'mini' }
        ];
        this._choicesOrigins = [];
        this._conditionalBranches = [];
        this._validationConditions = [];
        this._warningConditions = [];
        this.isRepeatingContainerNode = (/**
         * @param {?} nodeEntry
         * @return {?}
         */
        (nodeEntry) => {
            return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
        });
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
            _service.choicesOrigins.subscribe((/**
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
    get fieldSizes() {
        return this._fieldSizes;
    }
    /**
     * @return {?}
     */
    get nodeEntry() {
        return this._nodeEntry;
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
    get enabled() {
        return this._enabled;
    }
    /**
     * @return {?}
     */
    get propertiesForm() {
        return this._propertiesForm;
    }
    /**
     * @return {?}
     */
    get hasChoices() {
        return this._hasChoices;
    }
    /**
     * @return {?}
     */
    get curVisibility() {
        return this._curVisibility;
    }
    /**
     * @return {?}
     */
    get curFormulaReps() {
        return this._curFormulaReps;
    }
    /**
     * @return {?}
     */
    get curChoicesFilter() {
        return this._curChoicesFilter;
    }
    /**
     * @return {?}
     */
    get curForceValue() {
        return this._curForceValue;
    }
    /**
     * @return {?}
     */
    get curFormula() {
        return this._curFormula;
    }
    /**
     * @return {?}
     */
    get conditionalBranches() {
        return this._conditionalBranches;
    }
    /**
     * @return {?}
     */
    get validationConditions() {
        return this._validationConditions;
    }
    /**
     * @return {?}
     */
    get warningConditions() {
        return this._warningConditions;
    }
    /**
     * @return {?}
     */
    get nextSlideCondition() {
        return this._nextSlideCondition;
    }
    /**
     * @return {?}
     */
    get triggerConditions() {
        return this._triggerConditions;
    }
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
     * @param {?} nodeEntry
     * @return {?}
     */
    isField(nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
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
            const val = Object.assign(Object.assign({}, fg.value), { conditionalBranches: this._conditionalBranches });
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
            const visibility = n.node.visibility != null ? n.node.visibility.condition : null;
            /** @type {?} */
            const visibilityOpt = n.node.visibility != null ? this._guessVisibilityOpt(n.node.visibility) : null;
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
            if (this.isField(n)) {
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
                    validationConditions = (field.validation.conditions || []).map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        return { condition: c.condition, errorMessage: c.errorMessage };
                    }));
                }
                /** @type {?} */
                let notEmptyW = false;
                /** @type {?} */
                let warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || []).map((/**
                     * @param {?} w
                     * @return {?}
                     */
                    w => {
                        return { condition: w.condition, warningMessage: w.warningMessage };
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
                /** @type {?} */
                const fieldWithChoices = (/** @type {?} */ (n.node));
                /** @type {?} */
                let triggerConditions = (fieldWithChoices.triggerConditions || []).map((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => c.condition));
                controls.choicesOriginRef = ((/** @type {?} */ (fieldWithChoices))).choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula :
                    null;
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
        this._editTriggerConditionSub =
            ((/** @type {?} */ (this._editTriggerConditionEvt)))
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
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                /** @type {?} */
                const cmp = this._editConditionDialog.componentInstance;
                cmp.condition = this._triggerConditions[vcIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editWarningConditionSub =
            ((/** @type {?} */ (this._editWarningConditionEvt)))
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
                this._editWarningConditionDialog =
                    this._dialog.open(AjfFbWarningConditionEditorDialog);
                /** @type {?} */
                const cmp = this._editWarningConditionDialog.componentInstance;
                /** @type {?} */
                const w = this._warningConditions[vcIdx];
                cmp.condition = w.condition;
                cmp.warningMessage = w.warningMessage;
                this._editWarningConditionDialogSub =
                    this._editWarningConditionDialog.afterClosed().subscribe((/**
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
        this._editValidationConditionSub =
            ((/** @type {?} */ (this._editValidationConditionEvt)))
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
                this._editValidationConditionDialog =
                    this._dialog.open(AjfFbValidationConditionEditorDialog);
                /** @type {?} */
                const cmp = this._editValidationConditionDialog.componentInstance;
                /** @type {?} */
                const v = this._validationConditions[vcIdx];
                cmp.condition = v.condition;
                cmp.errorMessage = v.errorMessage;
                this._editValidationConditionDialogSub =
                    this._editValidationConditionDialog.afterClosed().subscribe((/**
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
        this._editForceValueSub =
            ((/** @type {?} */ (this._editForceValueEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editNextSlideConditionSub =
            ((/** @type {?} */ (this._editNextSlideConditionEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editFormulaSub =
            ((/** @type {?} */ (this._editFormulaEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editFormulaRepsSub =
            ((/** @type {?} */ (this._editFormulaRepsEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editChoicesFilterSub =
            ((/** @type {?} */ (this._editChoicesFilterEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editConditionalBranchSub =
            ((/** @type {?} */ (this._editConditionalBranchEvt)))
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
                this._editConditionDialog.componentInstance.condition =
                    this._conditionalBranches[cbIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editVisibilitySub =
            ((/** @type {?} */ (this._editVisibilityEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        (v1, v2) => JSON.stringify(v1.triggerConditions) ===
            JSON.stringify(v2.triggerConditions))))
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
        (v1, v2) => JSON.stringify(v1.warningConditions) ===
            JSON.stringify(v2.warningConditions))))
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
        (v1, v2) => JSON.stringify(v1.validationConditions) ===
            JSON.stringify(v2.validationConditions))))
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
        this._forceValueSub =
            fg.valueChanges.pipe(distinctUntilChanged((/**
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
        this._formulaSub =
            fg.valueChanges
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
        this._formulaSub =
            fg.valueChanges.pipe(distinctUntilChanged((/**
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
        this._formulaRepsSub =
            fg.valueChanges.pipe(distinctUntilChanged((/**
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
        this._choicesFilterSub =
            fg.valueChanges
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
        this._conditionalBranchesSub =
            fg.valueChanges
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
        this._visibilitySub =
            fg.valueChanges
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
    { type: Component, args: [{
                selector: 'ajf-fb-node-properties',
                template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<div class=\"ajf-header\">\n  <h3 translate>Properties</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label translate>Visibility</mat-label>\n          <mat-select\n              formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\">\n            <mat-option value=\"always\" translate>Always</mat-option>\n            <mat-option value=\"never\" translate>Never</mat-option>\n            <mat-option value=\"condition\" translate>Condition...</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button (click)=\"editVisibility()\"\n            [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n            mat-raised-button [matTooltip]=\"curVisibility || ''\">\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label translate>Branches</label></div>\n        <div>\n          <mat-slider formControlName=\"conditionalBranchesNum\"\n              thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label translate>Repetitions</label></div>\n          <div>\n            <button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label translate>Min repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"minReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n          <div><label translate>Max repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"maxReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label translate>Field size</mat-label>\n            <mat-select formControlName=\"size\"\n                [placeholder]=\"'Size' | translate\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\">\n                {{ fieldSize.label }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea matInput formControlName=\"description\"\n                [placeholder]=\"'Description' | translate\"></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | translate\">\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Formula</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label translate>Force value</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | translate\">\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Validation</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No conditions</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\">\n            <button (click)=\"editValidationCondition(idx)\"\n                mat-raised-button [matTooltip]=\"validationCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Warnings</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div  *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No warnings</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\">\n            <button (click)=\"editWarningCondition(idx)\"\n                mat-raised-button [matTooltip]=\"warningCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Go to next slide condition</label></div>\n          <div>\n            <button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label translate>Choices origins</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | translate\">\n                <mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.name\">\n                  {{ choicesOrigin.label || choicesOrigin.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label translate>Choices filter</label></div>\n            <div>\n              <button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label translate>Trigger selection</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon>\n            </div>\n            <div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n                class=\"ajf-validation-row ajf-emph\" translate>No trigger condition </div>\n            <div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\">\n              <button (click)=\"editTriggerCondition(idx)\"\n                  mat-raised-button [matTooltip]=\"triggerCondition\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon>\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
            }] }
];
/** @nocollapse */
AjfFbNodeProperties.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog },
    { type: FormBuilder }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._fieldSizes;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._nodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._choicesOrigins;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._enabled;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._propertiesForm;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._hasChoices;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curVisibility;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curFormulaReps;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curChoicesFilter;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curForceValue;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curFormula;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._conditionalBranches;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._validationConditions;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._warningConditions;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._nextSlideCondition;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._triggerConditions;
    /** @type {?} */
    AjfFbNodeProperties.prototype.isRepeatingContainerNode;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._visibilitySub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._conditionalBranchesSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._formulaRepsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._choicesFilterSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._formulaSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._forceValueSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._validationConditionsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._warningConditionsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._nextSlideConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._choicesOriginsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._triggerConditionsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionDialogSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionDialogSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionDialogSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editVisibilityEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editVisibilitySub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionalBranchEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionalBranchSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaRepsEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaRepsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editChoicesFilterEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editChoicesFilterSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editForceValueEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editForceValueSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addValidationConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addValidationConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeValidationConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeValidationConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addWarningConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addWarningConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeWarningConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeWarningConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editNextSlideConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editNextSlideConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editTriggerConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editTriggerConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addTriggerConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addTriggerConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeTriggerConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeTriggerConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._saveEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._saveSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._fb;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/node-type-entry.ts
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
    get nodeType() {
        return this._nodeType;
    }
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
    { type: Component, args: [{
                selector: 'ajf-fb-node-type-entry',
                template: "<ng-container *ngIf=\"nodeType\">\n  <mat-icon\n    [fontSet]=\"nodeType.icon.fontSet\" [fontIcon]=\"nodeType.icon.fontIcon\"></mat-icon>\n  {{ nodeType.label }}\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}\n"]
            }] }
];
/** @nocollapse */
AjfFbNodeTypeEntry.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
AjfFbNodeTypeEntry.propDecorators = {
    nodeType: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeTypeEntry.prototype._nodeType;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeTypeEntry.prototype._cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    MatToolbarModule, MatTooltipModule, ReactiveFormsModule, TranslateModule,
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
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderService, flattenNodes, AjfFbBranchLine as ɵgc_ajf_src_material_form_builder_form_builder_a, AjfFbChoicesOriginEditor as ɵgc_ajf_src_material_form_builder_form_builder_b, AjfFbChoicesOriginEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_c, AjfFbConditionEditor as ɵgc_ajf_src_material_form_builder_form_builder_d, AjfFbConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_e, AjfFbNodeEntry as ɵgc_ajf_src_material_form_builder_form_builder_f, AjfFbNodeProperties as ɵgc_ajf_src_material_form_builder_form_builder_g, AjfFbNodeTypeEntry as ɵgc_ajf_src_material_form_builder_form_builder_h, AjfFbStringIdentifierDialogComponent as ɵgc_ajf_src_material_form_builder_form_builder_i, AjfFbValidationConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_j, AjfFbWarningConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_k };
//# sourceMappingURL=form-builder.js.map
