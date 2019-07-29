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
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, Input, Injectable, EventEmitter, ViewChild, ViewChildren, ChangeDetectorRef, NgModule } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AjfMonacoEditor, AjfMonacoEditorModule } from '@ajf/material/monaco-editor';
import { AjfNodeIconModule } from '@ajf/material/node-icon';
import { withLatestFrom, filter, map, scan, publishReplay, refCount, sample, distinctUntilChanged } from 'rxjs/operators';
import { AjfChoicesFixedOrigin, AjfSlide, AjfRepeatingSlide, AjfNodeGroup, AjfNode, AjfForm, AjfField, AjfValidationGroup, AjfValidation, AjfWarningGroup, AjfWarning, AjfFieldWithChoices, AjfStringField, AjfTextField, AjfNumberField, AjfBooleanField, AjfSingleChoiceField, AjfMultipleChoiceField, AjfFormulaField, AjfDateField, AjfDateInputField, AjfTimeField, AjfTableField, AjfFieldType, AjfValidationService, isContainerNode as isContainerNode$1 } from '@ajf/core/forms';
import { __extends, __assign } from 'tslib';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AjfCondition, AjfFormula, AjfValidatedProperty } from '@ajf/core/models';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbBranchLine = /** @class */ (function () {
    function AjfFbBranchLine(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._height = 0;
    }
    Object.defineProperty(AjfFbBranchLine.prototype, "offset", {
        set: /**
         * @param {?} offset
         * @return {?}
         */
        function (offset) {
            this._offset = offset;
            this._updateOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbBranchLine.prototype, "color", {
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this._color = color;
            this._updateColor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbBranchLine.prototype, "height", {
        set: /**
         * @param {?} height
         * @return {?}
         */
        function (height) {
            this._height = height;
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AjfFbBranchLine.prototype._updateHeight = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var height = Math.max(0, this._height - 25) + "px";
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbBranchLine.prototype._updateOffset = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var margin = this._offset * 4 + "px";
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbBranchLine.prototype._updateColor = /**
     * @private
     * @return {?}
     */
    function () {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    };
    AjfFbBranchLine.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-branch-line',
                    template: "",
                    styles: ["ajf-fb-branch-line{display:block;position:absolute;top:25px;left:25px;width:25px;border-top:2px solid;border-left:2px solid;border-top-left-radius:6px}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbBranchLine.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfFbBranchLine.propDecorators = {
        offset: [{ type: Input }],
        color: [{ type: Input }],
        height: [{ type: Input }]
    };
    return AjfFbBranchLine;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ChoicesOriginDataSource = /** @class */ (function (_super) {
    __extends(ChoicesOriginDataSource, _super);
    function ChoicesOriginDataSource() {
        var _this = _super.call(this) || this;
        _this._choices = new BehaviorSubject([]);
        _this._choicesObs = _this._choices.asObservable();
        return _this;
    }
    /**
     * @return {?}
     */
    ChoicesOriginDataSource.prototype.connect = /**
     * @return {?}
     */
    function () {
        return this._choicesObs;
    };
    /**
     * @return {?}
     */
    ChoicesOriginDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} choices
     * @return {?}
     */
    ChoicesOriginDataSource.prototype.updateChoices = /**
     * @param {?} choices
     * @return {?}
     */
    function (choices) {
        this._choices.next(choices);
    };
    return ChoicesOriginDataSource;
}(DataSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbChoicesOriginEditor = /** @class */ (function () {
    function AjfFbChoicesOriginEditor() {
        this._displayedColumns = ['label', 'value', 'delete'];
        this.editing = {};
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "displayedColumns", {
        get: /**
         * @return {?}
         */
        function () { return this._displayedColumns; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesOrigin", {
        get: /**
         * @return {?}
         */
        function () { return this._choicesOrigin; },
        set: /**
         * @param {?} choicesOrigin
         * @return {?}
         */
        function (choicesOrigin) {
            this._choicesOrigin = choicesOrigin;
            this.name = choicesOrigin.getName();
            this.label = choicesOrigin.getLabel();
            this.canEditChoices = choicesOrigin instanceof AjfChoicesFixedOrigin;
            this._choicesArr = choicesOrigin.getChoices();
            this._choices.updateChoices(this._choicesArr);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choices", {
        get: /**
         * @return {?}
         */
        function () { return this._choices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesArr", {
        get: /**
         * @return {?}
         */
        function () { return this._choicesArr; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} evt
     * @param {?} cell
     * @param {?} _value
     * @param {?} rowIdx
     * @return {?}
     */
    AjfFbChoicesOriginEditor.prototype.updateValue = /**
     * @param {?} evt
     * @param {?} cell
     * @param {?} _value
     * @param {?} rowIdx
     * @return {?}
     */
    function (evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        ((/** @type {?} */ (this._choicesArr[rowIdx])))[cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    };
    /**
     * @param {?} rowIdx
     * @return {?}
     */
    AjfFbChoicesOriginEditor.prototype.deleteRow = /**
     * @param {?} rowIdx
     * @return {?}
     */
    function (rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    };
    /**
     * @return {?}
     */
    AjfFbChoicesOriginEditor.prototype.addRow = /**
     * @return {?}
     */
    function () {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    };
    AjfFbChoicesOriginEditor.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-choices-origin-editor',
                    template: "<div><mat-form-field><input matInput [(ngModel)]=\"name\" [placeholder]=\"'Name' | translate\"></mat-form-field><mat-form-field><input matInput [(ngModel)]=\"label\" [placeholder]=\"'Label' | translate\"></mat-form-field><ng-template [ngIf]=\"canEditChoices\"><button (click)=\"addRow()\" mat-button><mat-icon>add</mat-icon><span translate>Add value</span></button><mat-table [dataSource]=\"choices\"><ng-container matColumnDef=\"label\"><mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><span [title]=\"'Double click to edit' | translate\" (dblclick)=\"editing[idx + '-label'] = true\" *ngIf=\"!editing[idx + '-label']\"><span *ngIf=\"row.label\">{{ row.label }}</span> <span *ngIf=\"!row.label\" translate>(no label)</span> </span><input autofocus #in1 (blur)=\"updateValue($event, 'label', in1.value, idx)\" *ngIf=\"editing[idx + '-label']\" type=\"text\" [value]=\"row.label\"></mat-cell></ng-container><ng-container matColumnDef=\"value\"><mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><span [title]=\"'Double click to edit' | translate\" (dblclick)=\"editing[idx + '-value'] = true\" *ngIf=\"!editing[idx + '-value']\"><span *ngIf=\"row.value\">{{ row.value }}</span> <span *ngIf=\"!row.value\" translate>(no value)</span> </span><input autofocus #in2 (blur)=\"updateValue($event, 'value', in2.value, idx)\" *ngIf=\"editing[idx + '-value']\" type=\"text\" [value]=\"row.value\"></mat-cell></ng-container><ng-container matColumnDef=\"delete\"><mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell><mat-cell *matCellDef=\"let row; let idx = index\"><mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon></mat-cell></ng-container><mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row><mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row></mat-table></ng-template></div>",
                    styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    AjfFbChoicesOriginEditor.propDecorators = {
        choicesOrigin: [{ type: Input }]
    };
    return AjfFbChoicesOriginEditor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isContainerNode(node) {
    return node != null && (node instanceof AjfSlide ||
        node instanceof AjfRepeatingSlide ||
        node instanceof AjfNodeGroup);
}
/**
 * @param {?} node
 * @return {?}
 */
function isRepeatingContainerNode(node) {
    return node != null && (node instanceof AjfRepeatingSlide ||
        node instanceof AjfNodeGroup);
}
/**
 * @param {?} node
 * @return {?}
 */
function isSlideNode(node) {
    return node != null && (node instanceof AjfSlide ||
        node instanceof AjfRepeatingSlide);
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
    var cns = c.nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return isContainerNode(n); }));
    /** @type {?} */
    var len = cns.length;
    for (var i = 0; i < len; i++) {
        /** @type {?} */
        var cn = getNodeContainer((/** @type {?} */ (cns[i])), node);
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
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches) {
    if (ignoreConditionalBranches === void 0) { ignoreConditionalBranches = false; }
    /** @type {?} */
    var entries = nodes
        .filter((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return n.parent === parent.id; }))
        .sort((/**
     * @param {?} n1
     * @param {?} n2
     * @return {?}
     */
    function (n1, n2) { return n1.parentNode - n2.parentNode; }))
        .map((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return (/** @type {?} */ ({
        node: n,
        children: buildFormBuilderNodesSubtree(nodes, n),
        content: buildFormBuilderNodesContent(nodes, n)
    })); }));
    if (!ignoreConditionalBranches) {
        /** @type {?} */
        var entriesNum = entries.length;
        /** @type {?} */
        var cbs = parent.conditionalBranches.length;
        for (var i = entriesNum; i < cbs; i++) {
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
    var rootNodes = nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return n.parent == null; }));
    if (rootNodes.length === 1) {
        /** @type {?} */
        var rootNode = rootNodes[0];
        if (rootNode instanceof AjfRepeatingSlide || rootNode instanceof AjfSlide) {
            /** @type {?} */
            var tree = [];
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
    var flatNodes = [];
    nodes.forEach((/**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
function getDescendants(flatNodes, parentNode, branch) {
    if (branch === void 0) { branch = null; }
    return branch != null ?
        flatNodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.parent === parentNode.id && n.parentNode === branch; })) :
        flatNodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n.parent === parentNode.id; }));
}
/**
 * @param {?} nodes
 * @param {?} ids
 * @return {?}
 */
function removeNodes(nodes, ids) {
    /** @type {?} */
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
        /** @type {?} */
        var node = nodes[i];
        if (isContainerNode(node)) {
            /** @type {?} */
            var container = ((/** @type {?} */ (node)));
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return ids.indexOf(n.id) === -1; }));
}
/**
 * @param {?} nodes
 * @param {?} parentNode
 * @param {?=} branch
 * @return {?}
 */
function deleteNodeSubtree(nodes, parentNode, branch) {
    if (branch === void 0) { branch = null; }
    /** @type {?} */
    var flatNodes = flattenNodes(nodes);
    /** @type {?} */
    var delNodes = [];
    /** @type {?} */
    var descendants = getDescendants(flatNodes, parentNode, branch);
    /** @type {?} */
    var len = descendants.length;
    for (var i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map((/**
     * @param {?} n
     * @return {?}
     */
    function (n) { return n.id; })));
}
/** @type {?} */
var nodeUniqueId = 0;
var AjfFormBuilderService = /** @class */ (function () {
    function AjfFormBuilderService() {
        this._availableNodeTypes = [
            { label: 'Slide', icon: { fontSet: 'ajf-icon', fontIcon: 'field-slide' }, nodeType: AjfSlide,
                isSlide: true },
            { label: 'Repeating slide', icon: { fontSet: 'ajf-icon', fontIcon: 'field-repeatingslide' },
                nodeType: AjfRepeatingSlide, isSlide: true },
            { label: 'String', icon: { fontSet: 'ajf-icon', fontIcon: 'field-string' },
                nodeType: AjfStringField },
            { label: 'Text', icon: { fontSet: 'ajf-icon', fontIcon: 'field-text' },
                nodeType: AjfTextField },
            { label: 'Number', icon: { fontSet: 'ajf-icon', fontIcon: 'field-number' },
                nodeType: AjfNumberField },
            { label: 'Boolean', icon: { fontSet: 'ajf-icon', fontIcon: 'field-boolean' },
                nodeType: AjfBooleanField },
            { label: 'Single choice', icon: { fontSet: 'ajf-icon', fontIcon: 'field-singlechoice' },
                nodeType: AjfSingleChoiceField },
            { label: 'Multiple choice', icon: { fontSet: 'ajf-icon', fontIcon: 'field-multiplechoice' },
                nodeType: AjfMultipleChoiceField },
            { label: 'Formula', icon: { fontSet: 'ajf-icon', fontIcon: 'field-formula' },
                nodeType: AjfFormulaField },
            { label: 'Date', icon: { fontSet: 'ajf-icon', fontIcon: 'field-date' },
                nodeType: AjfDateField },
            { label: 'Date input', icon: { fontSet: 'ajf-icon', fontIcon: 'field-dateinput' },
                nodeType: AjfDateInputField },
            { label: 'Time', icon: { fontSet: 'ajf-icon', fontIcon: 'field-time' },
                nodeType: AjfTimeField },
            { label: 'Table', icon: { fontSet: 'ajf-icon', fontIcon: 'field-table' },
                nodeType: AjfTableField }
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
        this._saveNodeEntryEvent = new EventEmitter();
        this._deleteNodeEntryEvent = new EventEmitter();
        this._initChoicesOriginsStreams();
        this._initAttachmentsOriginsStreams();
        this._initNodesStreams();
        this._initFormStreams();
        this._initSaveNode();
        this._initDeleteNode();
    }
    Object.defineProperty(AjfFormBuilderService.prototype, "availableNodeTypes", {
        /**
         * Available node types
         *
         * @readonly
         * @memberOf AjfFormBuilderService
         */
        get: /**
         * Available node types
         *
         * \@readonly
         * \@memberOf AjfFormBuilderService
         * @return {?}
         */
        function () { return this._availableNodeTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "form", {
        /**
         * Current edited form stream
         *
         * @readonly
         * @memberOf AjfFormBuilderService
         */
        get: /**
         * Current edited form stream
         *
         * \@readonly
         * \@memberOf AjfFormBuilderService
         * @return {?}
         */
        function () { return this._formObs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "attachmentsOrigins", {
        get: /**
         * @return {?}
         */
        function () { return this._attachmentsOrigins; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "choicesOrigins", {
        get: /**
         * @return {?}
         */
        function () { return this._choicesOrigins; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "nodes", {
        get: /**
         * @return {?}
         */
        function () { return this._nodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "flatNodes", {
        get: /**
         * @return {?}
         */
        function () {
            return this._flatNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "flatFields", {
        get: /**
         * @return {?}
         */
        function () { return this._flatFields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "nodeEntriesTree", {
        get: /**
         * @return {?}
         */
        function () { return this._nodeEntriesTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedNodeEntry", {
        get: /**
         * @return {?}
         */
        function () {
            return this._editedNodeEntryObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedCondition", {
        get: /**
         * @return {?}
         */
        function () { return this._editedConditionObs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedChoicesOrigin", {
        get: /**
         * @return {?}
         */
        function () {
            return this._editedChoicesOriginObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "beforeNodesUpdate", {
        get: /**
         * @return {?}
         */
        function () { return this._beforeNodesUpdateObs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "afterNodeUpdate", {
        get: /**
         * @return {?}
         */
        function () { return this._afterNodeUpdateObs; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the current edited form
     *
     * @param form
     *
     * @memberOf AjfFormBuilderService
     */
    /**
     * Sets the current edited form
     *
     * \@memberOf AjfFormBuilderService
     * @param {?} form
     *
     * @return {?}
     */
    AjfFormBuilderService.prototype.setForm = /**
     * Sets the current edited form
     *
     * \@memberOf AjfFormBuilderService
     * @param {?} form
     *
     * @return {?}
     */
    function (form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    };
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    AjfFormBuilderService.prototype.editNodeEntry = /**
     * @param {?} nodeEntry
     * @return {?}
     */
    function (nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    };
    /**
     * @param {?} condition
     * @return {?}
     */
    AjfFormBuilderService.prototype.editCondition = /**
     * @param {?} condition
     * @return {?}
     */
    function (condition) {
        this._editedCondition.next(condition);
    };
    /**
     * @param {?} condition
     * @return {?}
     */
    AjfFormBuilderService.prototype.saveCurrentCondition = /**
     * @param {?} condition
     * @return {?}
     */
    function (condition) {
        /** @type {?} */
        var c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    };
    /**
     * @return {?}
     */
    AjfFormBuilderService.prototype.cancelConditionEdit = /**
     * @return {?}
     */
    function () {
        this._editedChoicesOrigin.next(null);
    };
    /**
     * @param {?} nodeType
     * @param {?} parent
     * @param {?} parentNode
     * @param {?=} inContent
     * @return {?}
     */
    AjfFormBuilderService.prototype.insertNode = /**
     * @param {?} nodeType
     * @param {?} parent
     * @param {?} parentNode
     * @param {?=} inContent
     * @return {?}
     */
    function (nodeType, parent, parentNode, inContent) {
        if (inContent === void 0) { inContent = false; }
        /** @type {?} */
        var node = new nodeType.nodeType({
            id: ++nodeUniqueId,
            parent: parent.id,
            parentNode: parentNode
        });
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next((/**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) {
            /** @type {?} */
            var cn = isContainerNode(parent) && inContent ?
                ((/** @type {?} */ (parent))) :
                getNodeContainer({ nodes: nodes }, parent);
            if (cn != null) {
                if (cn instanceof AjfNode) {
                    /** @type {?} */
                    var newNodes = cn.nodes.slice(0);
                    newNodes.push(node);
                    cn.nodes = newNodes;
                }
                else {
                    cn.nodes.push(node);
                }
            }
            return nodes;
        }));
    };
    /**
     * @param {?} properties
     * @return {?}
     */
    AjfFormBuilderService.prototype.saveNodeEntry = /**
     * @param {?} properties
     * @return {?}
     */
    function (properties) {
        this._saveNodeEntryEvent.emit(properties);
    };
    /**
     * @return {?}
     */
    AjfFormBuilderService.prototype.cancelNodeEntryEdit = /**
     * @return {?}
     */
    function () {
        this._editedNodeEntry.next(null);
    };
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    AjfFormBuilderService.prototype.deleteNodeEntry = /**
     * @param {?} nodeEntry
     * @return {?}
     */
    function (nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
    };
    /**
     * @return {?}
     */
    AjfFormBuilderService.prototype.getCurrentForm = /**
     * @return {?}
     */
    function () {
        return this._form.pipe(withLatestFrom(this._nodes), filter((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r[0] != null; })), map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var form = (/** @type {?} */ (r[0]));
            /** @type {?} */
            var nodes = r[1];
            return new AjfForm({
                choicesOrigins: form.choicesOrigins.slice(0),
                attachmentsOrigins: form.attachmentsOrigins.slice(0),
                stringIdentifier: form.stringIdentifier.slice(0),
                nodes: nodes.slice(0)
            });
        })));
    };
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    AjfFormBuilderService.prototype.editChoicesOrigin = /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    function (choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    };
    /**
     * @return {?}
     */
    AjfFormBuilderService.prototype.createChoicesOrigin = /**
     * @return {?}
     */
    function () {
        this._editedChoicesOrigin.next(new AjfChoicesFixedOrigin());
    };
    /**
     * @return {?}
     */
    AjfFormBuilderService.prototype.cancelChoicesOriginEdit = /**
     * @return {?}
     */
    function () {
        this._editedChoicesOrigin.next(null);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    AjfFormBuilderService.prototype.saveChoicesOrigin = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var choicesOrigin = this._editedChoicesOrigin.getValue();
        if (choicesOrigin != null) {
            choicesOrigin.setLabel(params.label);
            choicesOrigin.setName(params.name);
            if (choicesOrigin instanceof AjfChoicesFixedOrigin) {
                choicesOrigin.setChoices(params.choices);
            }
        }
        this._editedChoicesOrigin.next(null);
    };
    /**
     * @private
     * @param {?} nodes
     * @param {?=} _curMaxId
     * @return {?}
     */
    AjfFormBuilderService.prototype._findMaxNodeId = /**
     * @private
     * @param {?} nodes
     * @param {?=} _curMaxId
     * @return {?}
     */
    function (nodes, _curMaxId) {
        var _this = this;
        /** @type {?} */
        var maxId = 0;
        nodes.forEach((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, _this._findMaxNodeId(((/** @type {?} */ (n))).nodes));
            }
        }));
        return maxId;
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilderService.prototype._initFormStreams = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._form
            .subscribe((/**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = _this._findMaxNodeId(form.nodes);
            }
            _this._nodesUpdates.next((/**
             * @param {?} _nodes
             * @return {?}
             */
            function (_nodes) {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            }));
            _this._attachmentsOriginsUpdates.next((/**
             * @param {?} _attachmentsOrigins
             * @return {?}
             */
            function (_attachmentsOrigins) {
                return form != null && form.attachmentsOrigins != null ?
                    form.attachmentsOrigins.slice(0) : [];
            }));
            _this._choicesOriginsUpdates.next((/**
             * @param {?} _choicesOrigins
             * @return {?}
             */
            function (_choicesOrigins) {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilderService.prototype._initChoicesOriginsStreams = /**
     * @private
     * @return {?}
     */
    function () {
        this._choicesOrigins = ((/** @type {?} */ (this._choicesOriginsUpdates)))
            .pipe(scan((/**
         * @param {?} choicesOrigins
         * @param {?} op
         * @return {?}
         */
        function (choicesOrigins, op) {
            return op(choicesOrigins);
        }), []), publishReplay(1), refCount());
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilderService.prototype._initAttachmentsOriginsStreams = /**
     * @private
     * @return {?}
     */
    function () {
        this._attachmentsOrigins =
            ((/** @type {?} */ (this._attachmentsOriginsUpdates))).pipe(scan((/**
             * @param {?} attachmentsOrigins
             * @param {?} op
             * @return {?}
             */
            function (attachmentsOrigins, op) {
                return op(attachmentsOrigins);
            }), []), publishReplay(1), refCount());
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilderService.prototype._initNodesStreams = /**
     * @private
     * @return {?}
     */
    function () {
        this._nodes = ((/** @type {?} */ (this._nodesUpdates))).pipe(scan((/**
         * @param {?} nodes
         * @param {?} op
         * @return {?}
         */
        function (nodes, op) {
            return op(nodes);
        }), []), publishReplay(1), refCount());
        this._flatNodes = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) { return flattenNodes(nodes); })), publishReplay(1), refCount());
        this._flatFields = this._flatNodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) { return (/** @type {?} */ (nodes.filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return !isContainerNode(n); })))); })), publishReplay(1), refCount());
        this._nodeEntriesTree = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        function (nodes) { return (/** @type {?} */ (buildFormBuilderNodesTree(nodes))); })), publishReplay(1), refCount());
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilderService.prototype._initSaveNode = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._saveNodeEntryEvent.pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r[1] != null; })), map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._beforeNodesUpdate.emit();
            /** @type {?} */
            var properties = r[0];
            /** @type {?} */
            var nodeEntry = (/** @type {?} */ (r[1]));
            /** @type {?} */
            var choicesOrigins = r[2];
            /** @type {?} */
            var attachmentsOrigins = r[3];
            /** @type {?} */
            var origNode = nodeEntry.node;
            /** @type {?} */
            var node = AjfNode.fromJson(origNode.toJson(), choicesOrigins, attachmentsOrigins);
            node.id = nodeEntry.node.id;
            node.name = properties['name'];
            node.label = properties['label'];
            node.visibility = properties['visibility'] != null ?
                new AjfCondition({ condition: properties['visibility'] }) : null;
            /** @type {?} */
            var oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches = properties['conditionalBranches'] != null
                ? properties['conditionalBranches']
                    .map((/**
                 * @param {?} condition
                 * @return {?}
                 */
                function (condition) { return new AjfCondition({ condition: condition }); }))
                : [AjfCondition.alwaysCondition()];
            /** @type {?} */
            var newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                /** @type {?} */
                var repNode = (/** @type {?} */ (node));
                repNode.formulaReps = properties['formulaReps'] != null ?
                    new AjfFormula({ formula: properties['formulaReps'] }) : null;
                repNode.minReps = properties['minReps'];
                repNode.maxReps = properties['maxReps'];
            }
            if (nodeEntry.node instanceof AjfField) {
                /** @type {?} */
                var field = (/** @type {?} */ (nodeEntry.node));
                field.description = properties['description'];
                field.defaultValue = properties['defaultValue'];
                field.formula = properties['formula'] != null ?
                    new AjfFormula({ formula: properties['formula'] }) : null;
                /** @type {?} */
                var forceValue = properties['value'];
                /** @type {?} */
                var notEmpty = properties['notEmpty'];
                /** @type {?} */
                var validationConditions = properties['validationConditions'];
                /** @type {?} */
                var minValue = parseInt(properties['minValue'], 10);
                /** @type {?} */
                var maxValue = parseInt(properties['maxValue'], 10);
                /** @type {?} */
                var minDigits = parseInt(properties['minDigits'], 10);
                /** @type {?} */
                var maxDigits = parseInt(properties['maxDigits'], 10);
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
                    minValue != null || maxValue != null || minDigits != null || maxDigits != null) {
                    /** @type {?} */
                    var validation = field.validation || new AjfValidationGroup();
                    validation.forceValue = forceValue;
                    validation.notEmpty = notEmpty ? AjfValidation.getNotEmptyCondition() : null;
                    validation.minValue = minValue != null ? AjfValidation.getMinCondition(minValue) : null;
                    validation.maxValue = maxValue != null ? AjfValidation.getMaxCondition(maxValue) : null;
                    validation.minDigits = minDigits != null ?
                        AjfValidation.getMinDigitsCondition(minDigits) : null;
                    validation.maxDigits = maxDigits != null ?
                        AjfValidation.getMaxDigitsCondition(maxDigits) : null;
                    validation.conditions = (validationConditions || [])
                        .map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return new AjfValidation({
                        condition: c.condition,
                        errorMessage: c.errorMessage
                    }); }));
                    field.validation = validation;
                }
                else {
                    field.validation = null;
                }
                /** @type {?} */
                var notEmptyWarning = properties['notEmptyWarning'];
                /** @type {?} */
                var warningConditions = properties['warningConditions'];
                if (notEmptyWarning != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    /** @type {?} */
                    var warning = field.warning || new AjfWarningGroup();
                    warning.notEmpty = notEmptyWarning ? AjfWarning.getNotEmptyWarning() : null;
                    warning.conditions = (warningConditions || [])
                        .map((/**
                     * @param {?} w
                     * @return {?}
                     */
                    function (w) { return new AjfWarning({
                        condition: w.condition, warningMessage: w.warningMessage
                    }); }));
                    field.warning = warning;
                }
                else {
                    field.warning = null;
                }
                field.nextSlideCondition = properties['nextSlideCondition'] != null ?
                    new AjfCondition({ condition: properties['nextSlideCondition'] }) : null;
                if (field instanceof AjfFieldWithChoices) {
                    /** @type {?} */
                    var fwc = (/** @type {?} */ (field));
                    /** @type {?} */
                    var choicesOrigin = null;
                    /** @type {?} */
                    var coIdx = 0;
                    /** @type {?} */
                    var coNum = choicesOrigins.length;
                    while (choicesOrigin == null && coIdx < coNum) {
                        if (choicesOrigins[coIdx].getName() === properties['choicesOrigin']) {
                            choicesOrigin = choicesOrigins[coIdx];
                        }
                        coIdx++;
                    }
                    if (choicesOrigin != null) {
                        fwc.choicesOrigin = choicesOrigin;
                    }
                    fwc.forceExpanded = properties['forceExpanded'];
                    fwc.forceNarrow = properties['forceNarrow'];
                    fwc.triggerConditions = (properties['triggerConditions'] || [])
                        .map((/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) { return new AjfCondition({ condition: t }); }));
                }
            }
            _this._editedNodeEntry.next(null);
            return (/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                /** @type {?} */
                var cn = getNodeContainer({ nodes: nodes }, origNode);
                if (cn != null) {
                    if (cn instanceof AjfNode) {
                        /** @type {?} */
                        var idx = cn.nodes.indexOf(origNode);
                        /** @type {?} */
                        var newNodes = cn.nodes.slice(0, idx);
                        newNodes.push(node);
                        newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                        cn.nodes = newNodes;
                        nodes = nodes.slice(0);
                    }
                    else {
                        /** @type {?} */
                        var idx = nodes.indexOf(origNode);
                        nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
                    }
                    if (newConditionalBranches < oldConditionalBranches) {
                        for (var i = newConditionalBranches; i < oldConditionalBranches; i++) {
                            nodes = deleteNodeSubtree(nodes, node, i);
                        }
                    }
                }
                return nodes;
            });
        }))).subscribe(this._nodesUpdates);
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilderService.prototype._initDeleteNode = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        ((/** @type {?} */ (this._deleteNodeEntryEvent))).pipe(map((/**
         * @param {?} nodeEntry
         * @return {?}
         */
        function (nodeEntry) {
            _this._beforeNodesUpdate.emit();
            return (/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) {
                /** @type {?} */
                var node = nodeEntry.node;
                /** @type {?} */
                var cn = getNodeContainer({ nodes: nodes }, node);
                if (cn != null) {
                    if (cn instanceof AjfNode) {
                        /** @type {?} */
                        var idx = cn.nodes.indexOf(node);
                        /** @type {?} */
                        var newNodes = cn.nodes.slice(0, idx);
                        newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                        cn.nodes = newNodes;
                        nodes = nodes.slice(0);
                    }
                    else {
                        /** @type {?} */
                        var idx = nodes.indexOf(node);
                        nodes = nodes.slice(0, idx).concat(nodes.slice(idx + 1));
                    }
                    nodes = deleteNodeSubtree(nodes, node);
                }
                return nodes;
            });
        }))).subscribe(this._nodesUpdates);
    };
    AjfFormBuilderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AjfFormBuilderService.ctorParameters = function () { return []; };
    return AjfFormBuilderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbChoicesOriginEditorDialog = /** @class */ (function () {
    function AjfFbChoicesOriginEditorDialog(_service) {
        this._service = _service;
        this._choicesOrigin = this._service.editedChoicesOrigin.pipe(filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c != null; })), map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return (/** @type {?} */ (c)); })));
    }
    Object.defineProperty(AjfFbChoicesOriginEditorDialog.prototype, "choicesOrigin", {
        get: /**
         * @return {?}
         */
        function () { return this._choicesOrigin; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFbChoicesOriginEditorDialog.prototype.saveChoicesOrigin = /**
     * @return {?}
     */
    function () {
        this._service.saveChoicesOrigin({
            label: this.editor.label,
            name: this.editor.name,
            choices: this.editor.choicesArr
        });
    };
    /**
     * @return {?}
     */
    AjfFbChoicesOriginEditorDialog.prototype.cancelChoicesOriginEdit = /**
     * @return {?}
     */
    function () {
        this._service.cancelChoicesOriginEdit();
    };
    AjfFbChoicesOriginEditorDialog.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-choices-origin-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit choices origin</h3><mat-dialog-content><ajf-fb-choices-origin-editor [choicesOrigin]=\"choicesOrigin|async\"></ajf-fb-choices-origin-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveChoicesOrigin()\">Save</button> <button mat-button translate (click)=\"cancelChoicesOriginEdit()\">Close</button></mat-dialog-actions>",
                    styles: [""],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbChoicesOriginEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
    AjfFbChoicesOriginEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbChoicesOriginEditor, { static: true },] }]
    };
    return AjfFbChoicesOriginEditorDialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbConditionEditor = /** @class */ (function () {
    function AjfFbConditionEditor(_) {
    }
    Object.defineProperty(AjfFbConditionEditor.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields; },
        set: /**
         * @param {?} fields
         * @return {?}
         */
        function (fields) {
            this._fields = fields;
            this._updateVariables();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} variable
     * @return {?}
     */
    AjfFbConditionEditor.prototype.insertVariable = /**
     * @param {?} variable
     * @return {?}
     */
    function (variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            /** @type {?} */
            var editor = this.monacoEditor.editor;
            /** @type {?} */
            var value = editor.getValue().split('\n');
            /** @type {?} */
            var position = editor.getPosition();
            /** @type {?} */
            var ln = position.lineNumber - 1;
            /** @type {?} */
            var line = value[ln];
            /** @type {?} */
            var col = position.column - 1;
            line = line.substring(0, col) + variable + line.substring(col);
            value[ln] = line;
            position.column += variable.length;
            this.monacoEditor.value = value.join('\n');
            editor.setPosition(position);
            editor.focus();
            this.editedValue = editor.getValue();
        }
    };
    /**
     * @return {?}
     */
    AjfFbConditionEditor.prototype.onEditorInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbConditionEditor.prototype._updateVariables = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
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
                function (field) {
                    return "declare const " + field.name + ": " + _this._fieldVarType(field.fieldType) + ";";
                }))
                    .join('\n');
        }
        catch (e) { }
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbConditionEditor.prototype._updateFunctions = /**
     * @private
     * @return {?}
     */
    function () {
        try {
            monaco.languages.typescript.javascriptDefaults
                ._extraLibs['condition-editor-functions.d.ts'] = AjfValidatedProperty.UTIL_FUNCTIONS;
        }
        catch (e) { }
    };
    /**
     * @private
     * @param {?} fieldType
     * @return {?}
     */
    AjfFbConditionEditor.prototype._fieldVarType = /**
     * @private
     * @param {?} fieldType
     * @return {?}
     */
    function (fieldType) {
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
    };
    AjfFbConditionEditor.decorators = [
        { type: Component, args: [{selector: 'ajf-condition-editor',
                    template: "<div class=\"ajf-editor\"><ajf-monaco-editor (init)=\"onEditorInit()\" (valueChange)=\"editedValue = $event\" [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor></div><div class=\"ajf-editor-panel\"><mat-nav-list dense *ngIf=\"fields?.length > 0\"><a mat-list-item (click)=\"insertVariable(field.name)\" [matTooltip]=\"field.label\" *ngFor=\"let field of fields\"><ajf-node-icon [node]=\"field\"></ajf-node-icon>{{ field.name }}</a></mat-nav-list></div>",
                    styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AjfFbConditionEditor.ctorParameters = function () { return [
        { type: AjfValidationService }
    ]; };
    AjfFbConditionEditor.propDecorators = {
        monacoEditor: [{ type: ViewChild, args: [AjfMonacoEditor, { static: true },] }],
        fields: [{ type: Input }],
        condition: [{ type: Input }]
    };
    return AjfFbConditionEditor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbConditionEditorDialog = /** @class */ (function () {
    function AjfFbConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        function (f1, f2) { return f1.name.localeCompare(f2.name); })); })));
    }
    Object.defineProperty(AjfFbConditionEditorDialog.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFbConditionEditorDialog.prototype.saveCondition = /**
     * @return {?}
     */
    function () {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
        var newValue = this.editor.editedValue;
        this.dialogRef.close(newValue);
    };
    AjfFbConditionEditorDialog.decorators = [
        { type: Component, args: [{selector: 'ajf-condition-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit condition</h3><mat-dialog-content><ajf-condition-editor [fields]=\"fields|async\" [condition]=\"condition\"></ajf-condition-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveCondition()\">Save</button> <button mat-button translate matDialogClose>Close</button></mat-dialog-actions>",
                    styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: true },] }]
    };
    return AjfFbConditionEditorDialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormBuilder = /** @class */ (function () {
    function AjfFormBuilder(_service, _dialog) {
        var _this = this;
        this._service = _service;
        this._dialog = _dialog;
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub = this._service.editedCondition
            .subscribe((/**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            if (_this._editConditionDialog != null) {
                _this._editConditionDialog.close();
                _this._editConditionDialog = null;
            }
            if (condition != null) {
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
            }
        }));
        this._editChoicesOriginSub = this._service.editedChoicesOrigin
            .subscribe((/**
         * @param {?} choicesOrigin
         * @return {?}
         */
        function (choicesOrigin) {
            if (_this._editChoicesOriginDialog != null) {
                _this._editChoicesOriginDialog.close();
                _this._editChoicesOriginDialog = null;
            }
            if (choicesOrigin != null) {
                _this._editChoicesOriginDialog = _this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
            }
        }));
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.designerCont == null) {
                return;
            }
            _this._lastScrollTop = _this.designerCont.nativeElement.scrollTop;
        }));
        this.nodeEntriesTree
            .pipe(sample(((/** @type {?} */ (this._vc)))))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.designerCont == null) {
                return;
            }
            _this.designerCont.nativeElement.scrollTop = _this._lastScrollTop;
        }));
    }
    Object.defineProperty(AjfFormBuilder.prototype, "form", {
        get: /**
         * @return {?}
         */
        function () { return this._form; },
        set: /**
         * @param {?} form
         * @return {?}
         */
        function (form) {
            if (this._form !== form) {
                this._form = form;
                if (this._init) {
                    this._setCurrentForm();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "nodeTypes", {
        get: /**
         * @return {?}
         */
        function () { return this._nodeTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "nodeEntriesTree", {
        get: /**
         * @return {?}
         */
        function () { return this._nodeEntriesTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "choicesOrigins", {
        get: /**
         * @return {?}
         */
        function () { return this._choicesOrigins; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFormBuilder.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        this._vc.emit();
    };
    /**
     * @return {?}
     */
    AjfFormBuilder.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._setCurrentForm();
        this._init = true;
    };
    /**
     * @return {?}
     */
    AjfFormBuilder.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._service.setForm(null);
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
    };
    /**
     * @return {?}
     */
    AjfFormBuilder.prototype.createChoicesOrigin = /**
     * @return {?}
     */
    function () {
        this._service.createChoicesOrigin();
    };
    /**
     * @return {?}
     */
    AjfFormBuilder.prototype.disableDropPredicate = /**
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    AjfFormBuilder.prototype.editChoicesOrigin = /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    function (choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    };
    /**
     * @private
     * @return {?}
     */
    AjfFormBuilder.prototype._setCurrentForm = /**
     * @private
     * @return {?}
     */
    function () {
        this._service.setForm(this._form);
    };
    AjfFormBuilder.decorators = [
        { type: Component, args: [{selector: 'ajf-form-builder',
                    template: "<mat-toolbar><button mat-icon-button (click)=\"leftSidenav.toggle()\"><mat-icon>add_box</mat-icon></button> <button mat-button [matMenuTriggerFor]=\"choicesMenu\" translate>Choices</button><mat-menu #choicesMenu><button (click)=\"createChoicesOrigin()\" mat-menu-item translate>New..</button><ng-container *ngIf=\"choicesOrigins|async as cos\"><button *ngFor=\"let choicesOrigin of cos\" (click)=\"editChoicesOrigin(choicesOrigin)\" mat-menu-item>{{ choicesOrigin.getLabel() || choicesOrigin.getName() }}</button></ng-container></mat-menu><span class=\"ajf-spacer\"></span> <button mat-icon-button (click)=\"rightSidenav.toggle()\"><mat-icon>settings</mat-icon></button></mat-toolbar><mat-drawer-container cdkDropListGroup><mat-drawer #leftSidenav position=\"start\" mode=\"over\"><div #sourceDropList cdkDropList [cdkDropListEnterPredicate]=\"disableDropPredicate\" [cdkDropListData]=\"nodeTypes\"><ajf-fb-node-type-entry *ngFor=\"let nodeType of nodeTypes\" cdkDrag [cdkDragData]=\"nodeType\" (cdkDragStarted)=\"leftSidenav.close()\" [nodeType]=\"nodeType\"></ajf-fb-node-type-entry></div></mat-drawer><mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\"><ajf-fb-node-properties></ajf-fb-node-properties></mat-drawer><div #designer class=\"ajf-designer\"><ajf-fb-node-entry *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\" [isFirst]=\"isFirst\" [nodeEntry]=\"nodeEntry\"></ajf-fb-node-entry></div></mat-drawer-container>",
                    styles: ["ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{height:700px}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em;position:absolute;top:0;right:0;bottom:0;left:0;overflow-y:auto}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    AjfFormBuilder.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialog }
    ]; };
    AjfFormBuilder.propDecorators = {
        designerCont: [{ type: ViewChild, args: ['designer', { static: true },] }],
        form: [{ type: Input }]
    };
    return AjfFormBuilder;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var branchColors = [
    '#F44336',
    '#4CAF50',
    '#3F51B5',
    '#FFC107',
    '#795548',
];
var AjfFbNodeEntry = /** @class */ (function () {
    function AjfFbNodeEntry(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._branchColors = branchColors.slice(0);
        this._dropZones = ['fbdz-node'];
        this._slideDropZones = ['fbdz-slide'];
        this._originOffset = 0;
        this._originLeftMargin = '0';
        this._firstBranchColor = branchColors[0];
        this._isSlide = false;
        this._branchLinesSubscription = Subscription.EMPTY;
        this._childEntriesSubscription = Subscription.EMPTY;
        this._currentEditedNode = this._service.editedNodeEntry;
    }
    Object.defineProperty(AjfFbNodeEntry.prototype, "hasContent", {
        get: /**
         * @return {?}
         */
        function () { return this._hasContent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "isFirst", {
        get: /**
         * @return {?}
         */
        function () { return this._isFirst; },
        set: /**
         * @param {?} isFirst
         * @return {?}
         */
        function (isFirst) { this._isFirst = isFirst; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "isNodeEntry", {
        get: /**
         * @return {?}
         */
        function () { return this._isNodeEntry; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "nodeEntry", {
        get: /**
         * @return {?}
         */
        function () { return this._nodeEntry; },
        set: /**
         * @param {?} nodeEntry
         * @return {?}
         */
        function (nodeEntry) {
            this._nodeEntry = nodeEntry;
            if (nodeEntry != null && ((/** @type {?} */ (nodeEntry))).node !== void 0) {
                /** @type {?} */
                var ne = (/** @type {?} */ (nodeEntry));
                this._isNodeEntry = true;
                /** @type {?} */
                var node = ne.node;
                this._hasContent = node != null && isContainerNode$1(node);
                this._isSlide = false;
            }
            else {
                this._isNodeEntry = false;
                this._hasContent = false;
                this._isSlide = isSlideNode(((/** @type {?} */ (nodeEntry))).parent);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "realNodeEntry", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._nodeEntry));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "branchColors", {
        get: /**
         * @return {?}
         */
        function () { return this._branchColors; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "dropZones", {
        get: /**
         * @return {?}
         */
        function () { return this._dropZones; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "slideDropZones", {
        get: /**
         * @return {?}
         */
        function () { return this._slideDropZones; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "originOffset", {
        get: /**
         * @return {?}
         */
        function () { return this._originOffset; },
        set: /**
         * @param {?} originOffset
         * @return {?}
         */
        function (originOffset) {
            this._originOffset = originOffset;
            this._originLeftMargin = this._originOffset * 4 + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "originLeftMargin", {
        get: /**
         * @return {?}
         */
        function () { return this._originLeftMargin; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "firstBranchColor", {
        get: /**
         * @return {?}
         */
        function () { return this._firstBranchColor; },
        set: /**
         * @param {?} firstBranchColor
         * @return {?}
         */
        function (firstBranchColor) {
            /** @type {?} */
            var idx = branchColors.indexOf(firstBranchColor);
            if (idx > 0) {
                this._firstBranchColor = firstBranchColor;
                this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
            }
            else {
                this._firstBranchColor = branchColors[0];
                this._branchColors = branchColors.slice(0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "currentEditedNode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentEditedNode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFbNodeEntry.prototype.onResize = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AjfFbNodeEntry.prototype.edit = /**
     * @return {?}
     */
    function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry((/** @type {?} */ (this.nodeEntry)));
    };
    /**
     * @return {?}
     */
    AjfFbNodeEntry.prototype.delete = /**
     * @return {?}
     */
    function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry((/** @type {?} */ (this.nodeEntry)));
    };
    /**
     * @return {?}
     */
    AjfFbNodeEntry.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._updateBranchHeights();
        this._childEntriesSubscription = this.childEntries.changes
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._updateBranchHeights();
        }));
    };
    /**
     * @return {?}
     */
    AjfFbNodeEntry.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    };
    /**
     * @param {?} evt
     * @param {?=} content
     * @return {?}
     */
    AjfFbNodeEntry.prototype.onDropSuccess = /**
     * @param {?} evt
     * @param {?=} content
     * @return {?}
     */
    function (evt, content) {
        if (content === void 0) { content = false; }
        if (this._nodeEntry == null) {
            return;
        }
        /** @type {?} */
        var dd = (/** @type {?} */ (evt.item.data));
        if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
            /** @type {?} */
            var emptySlot = content ?
                { parent: ((/** @type {?} */ (this.nodeEntry))).node, parentNode: 0 } :
                (/** @type {?} */ (this._nodeEntry));
            this._service.insertNode((/** @type {?} */ (dd)), emptySlot.parent, emptySlot.parentNode, content);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AjfFbNodeEntry.prototype.disableSlideDropPredicate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !item.data.isSlide;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    AjfFbNodeEntry.prototype.emptyAreaDropPredicate = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this._isSlide) {
            return item.data.isSlide || false;
        }
        return !item.data.isSlide;
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeEntry.prototype._updateBranchHeights = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        /** @type {?} */
        var nodeEntry = (/** @type {?} */ (this.nodeEntry));
        /** @type {?} */
        var branchLines = this.branchLines.toArray();
        /** @type {?} */
        var sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
        /** @type {?} */
        var childEntries = this.childEntries.toArray().slice(sliceIdx);
        if (branchLines.length != childEntries.length) {
            return;
        }
        branchLines.forEach((/**
         * @param {?} bl
         * @param {?} idx
         * @return {?}
         */
        function (bl, idx) {
            /** @type {?} */
            var ce = childEntries[idx];
            bl.height = ce.nativeElement.offsetTop;
        }));
    };
    AjfFbNodeEntry.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-node-entry',
                    template: "<ng-template [ngIf]=\"nodeEntry != null\"><ng-template [ngIf]=\"isNodeEntry\"><ajf-fb-branch-line *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\" [offset]=\"idx\" [color]=\"branchColors[idx]\"></ajf-fb-branch-line></ng-template><div class=\"mat-card-container\" [class.ajf-highlight]=\"(currentEditedNode|async) == nodeEntry\"><div *ngIf=\"!isFirst\" class=\"ajf-origin-line\" [style.margin-left]=\"originLeftMargin\" [style.border-color]=\"firstBranchColor\"></div><ng-template [ngIf]=\"isNodeEntry\"><mat-card><div class=\"ajf-title-row\"><ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon><span class=\"ajf-title\" [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | translate\"></span> <span class=\"ajf-actions\"><button [disabled]=\"currentEditedNode|async\" (click)=\"edit()\" mat-icon-button><mat-icon>edit</mat-icon></button> <button [disabled]=\"currentEditedNode|async\" (click)=\"delete()\" mat-icon-button><mat-icon>delete</mat-icon></button></span></div><div *ngIf=\"hasContent\"><ajf-fb-node-entry *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\" [isFirst]=\"isFirstChild\" [firstBranchColor]=\"branchColors[idx]\" [nodeEntry]=\"contentEntry\"></ajf-fb-node-entry><mat-card class=\"ajf-empty\" *ngIf=\"realNodeEntry.content.length === 0\" cdkDropList [cdkDropListEnterPredicate]=\"disableSlideDropPredicate\" (cdkDropListDropped)=\"onDropSuccess($event, true)\">&nbsp;</mat-card></div></mat-card></ng-template><ng-template [ngIf]=\"!isNodeEntry\"><mat-card class=\"ajf-empty\" cdkDropList [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate\" (cdkDropListDropped)=\"onDropSuccess($event)\">&nbsp;</mat-card></ng-template></div><ng-template [ngIf]=\"isNodeEntry\"><ajf-fb-node-entry *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\" [originOffset]=\"idx\" [firstBranchColor]=\"branchColors[idx]\" [nodeEntry]=\"childNodeEntry\"></ajf-fb-node-entry></ng-template></ng-template>",
                    styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container mat-card{margin-left:50px;padding:.5em 1em;margin-top:.2em;margin-bottom:.2em;background-color:#fff}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row{display:flex;flex-direction:row;align-items:center}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-title{flex:1 1 auto}ajf-fb-node-entry .mat-card-container mat-card .ajf-title-row>.ajf-actions{flex:0 0 auto;white-space:nowrap}ajf-fb-node-entry .mat-card-container mat-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box}ajf-fb-node-entry .mat-card-container.ajf-highlight>mat-card{background-color:#fff9c4}"],
                    host: {
                        '(window.resize)': 'onResize()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbNodeEntry.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
    AjfFbNodeEntry.propDecorators = {
        branchLines: [{ type: ViewChildren, args: [AjfFbBranchLine,] }],
        childEntries: [{ type: ViewChildren, args: [AjfFbNodeEntry, { read: ElementRef },] }],
        isFirst: [{ type: Input }],
        nodeEntry: [{ type: Input }],
        originOffset: [{ type: Input }],
        firstBranchColor: [{ type: Input }]
    };
    return AjfFbNodeEntry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbValidationConditionEditorDialog = /** @class */ (function () {
    function AjfFbValidationConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        function (f1, f2) { return f1.name.localeCompare(f2.name); })); })));
    }
    Object.defineProperty(AjfFbValidationConditionEditorDialog.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFbValidationConditionEditorDialog.prototype.saveCondition = /**
     * @return {?}
     */
    function () {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
        var newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
    };
    AjfFbValidationConditionEditorDialog.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-validation-condition-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit condition</h3><mat-dialog-content><mat-form-field><input matInput [(ngModel)]=\"errorMessage\" [placeholder]=\"'Error message' | translate\"></mat-form-field><ajf-condition-editor [fields]=\"fields|async\" [condition]=\"condition\"></ajf-condition-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveCondition()\">Save</button> <button mat-button translate matDialogClose>Close</button></mat-dialog-actions>",
                    styles: ["ajf-fb-validation-condition-editor-dialog mat-dialog-content{overflow:visible}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbValidationConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbValidationConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: true },] }]
    };
    return AjfFbValidationConditionEditorDialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbWarningConditionEditorDialog = /** @class */ (function () {
    function AjfFbWarningConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields.sort((/**
         * @param {?} f1
         * @param {?} f2
         * @return {?}
         */
        function (f1, f2) { return f1.name.localeCompare(f2.name); })); })));
    }
    Object.defineProperty(AjfFbWarningConditionEditorDialog.prototype, "fields", {
        get: /**
         * @return {?}
         */
        function () { return this._fields; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFbWarningConditionEditorDialog.prototype.saveCondition = /**
     * @return {?}
     */
    function () {
        if (this.editor == null) {
            return;
        }
        /** @type {?} */
        var newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    };
    AjfFbWarningConditionEditorDialog.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-warning-condition-editor-dialog',
                    template: "<h3 matDialogTitle translate>Edit condition</h3><mat-dialog-content><mat-form-field><input matInput [(ngModel)]=\"warningMessage\" [placeholder]=\"'Warning message' | translate\"></mat-form-field><ajf-condition-editor [fields]=\"fields|async\" [condition]=\"condition\"></ajf-condition-editor></mat-dialog-content><mat-dialog-actions><button mat-button translate (click)=\"saveCondition()\">Save</button> <button mat-button translate matDialogClose>Close</button></mat-dialog-actions>",
                    styles: ["ajf-fb-warning-condition-editor-dialog mat-dialog-content{overflow:visible}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbWarningConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbWarningConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: true },] }]
    };
    return AjfFbWarningConditionEditorDialog;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} c
 * @return {?}
 */
function checkRepsValidity(c) {
    /** @type {?} */
    var minReps = c.value.minReps;
    /** @type {?} */
    var maxReps = c.value.maxReps;
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
    var minValue = c.value.minValue;
    /** @type {?} */
    var maxValue = c.value.maxValue;
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
    var minDigits = c.value.minDigits;
    /** @type {?} */
    var maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return {
            digits: 'Min digits cannot be greater than max digits'
        };
    }
    return null;
}
var AjfFbNodeProperties = /** @class */ (function () {
    function AjfFbNodeProperties(_service, _dialog, _fb) {
        var _this = this;
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
        function (c) { return _this._choicesOrigins = c || []; }));
        this._enabled = this._nodeEntry.pipe(map((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n != null; })));
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
    Object.defineProperty(AjfFbNodeProperties.prototype, "fieldSizes", {
        get: /**
         * @return {?}
         */
        function () { return this._fieldSizes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "nodeEntry", {
        get: /**
         * @return {?}
         */
        function () { return this._nodeEntry; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "choicesOrigins", {
        get: /**
         * @return {?}
         */
        function () { return this._choicesOrigins; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "enabled", {
        get: /**
         * @return {?}
         */
        function () { return this._enabled; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "propertiesForm", {
        get: /**
         * @return {?}
         */
        function () { return this._propertiesForm; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "hasChoices", {
        get: /**
         * @return {?}
         */
        function () { return this._hasChoices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curVisibility", {
        get: /**
         * @return {?}
         */
        function () { return this._curVisibility; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curFormulaReps", {
        get: /**
         * @return {?}
         */
        function () { return this._curFormulaReps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curChoicesFilter", {
        get: /**
         * @return {?}
         */
        function () { return this._curChoicesFilter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curForceValue", {
        get: /**
         * @return {?}
         */
        function () { return this._curForceValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curFormula", {
        get: /**
         * @return {?}
         */
        function () { return this._curFormula; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "conditionalBranches", {
        get: /**
         * @return {?}
         */
        function () { return this._conditionalBranches; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "validationConditions", {
        get: /**
         * @return {?}
         */
        function () { return this._validationConditions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "warningConditions", {
        get: /**
         * @return {?}
         */
        function () { return this._warningConditions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "nextSlideCondition", {
        get: /**
         * @return {?}
         */
        function () { return this._nextSlideCondition; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "triggerConditions", {
        get: /**
         * @return {?}
         */
        function () { return this._triggerConditions; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editVisibility = /**
     * @return {?}
     */
    function () {
        this._editVisibilityEvt.emit();
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editConditionalBranch = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editFormulaReps = /**
     * @return {?}
     */
    function () {
        this._editFormulaRepsEvt.emit();
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editChoicesFilter = /**
     * @return {?}
     */
    function () {
        this._editChoicesFilterEvt.emit();
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editFormula = /**
     * @return {?}
     */
    function () {
        this._editFormulaEvt.emit();
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editForceValue = /**
     * @return {?}
     */
    function () {
        this._editForceValueEvt.emit();
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editValidationCondition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.addValidationCondition = /**
     * @return {?}
     */
    function () {
        this._addValidationConditionEvt.emit();
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.removeValidationCondition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editWarningCondition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.addWarningCondition = /**
     * @return {?}
     */
    function () {
        this._addWarningConditionEvt.emit();
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.removeWarningCondition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editNextSlideCondition = /**
     * @return {?}
     */
    function () {
        this._editNextSlideConditionEvt.emit();
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.editTriggerCondition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.addTriggerCondition = /**
     * @return {?}
     */
    function () {
        this._addTriggerConditionEvt.emit();
    };
    /**
     * @param {?} idx
     * @return {?}
     */
    AjfFbNodeProperties.prototype.removeTriggerCondition = /**
     * @param {?} idx
     * @return {?}
     */
    function (idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AjfFbNodeProperties.prototype.isField = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node != null && node instanceof AjfField;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AjfFbNodeProperties.prototype.isNumericField = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node != null && node instanceof AjfNumberField;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AjfFbNodeProperties.prototype.isFieldWithChoices = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        return node != null && node instanceof AjfFieldWithChoices;
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.save = /**
     * @return {?}
     */
    function () {
        this._saveEvt.emit();
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this._service.cancelNodeEntryEdit();
    };
    /**
     * @return {?}
     */
    AjfFbNodeProperties.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initSave = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._saveSub = ((/** @type {?} */ (this._saveEvt)))
            .pipe(withLatestFrom(this.propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var fg = r[1];
            /** @type {?} */
            var val = __assign({}, fg.value, { conditionalBranches: _this._conditionalBranches });
            _this._service.saveNodeEntry(val);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initForm = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._propertiesForm = this._nodeEntry.pipe(filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return n != null; })), map((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
            if (_this._visibilitySub != null) {
                _this._visibilitySub.unsubscribe();
            }
            if (_this._conditionalBranchesSub != null) {
                _this._conditionalBranchesSub.unsubscribe();
            }
            n = (/** @type {?} */ (n));
            /** @type {?} */
            var visibility = n.node.visibility != null ?
                n.node.visibility.condition : null;
            /** @type {?} */
            var visibilityOpt = n.node.visibility != null ?
                _this._guessVisibilityOpt(n.node.visibility) : null;
            /** @type {?} */
            var controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            /** @type {?} */
            var validators = [];
            if (isRepeatingContainerNode(n.node)) {
                /** @type {?} */
                var rn = (/** @type {?} */ (n.node));
                /** @type {?} */
                var formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                _this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (_this.isField(n.node)) {
                /** @type {?} */
                var field = (/** @type {?} */ (n.node));
                /** @type {?} */
                var forceValue = null;
                /** @type {?} */
                var notEmpty = false;
                /** @type {?} */
                var validationConditions = [];
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
                    function (c) {
                        return {
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        };
                    }));
                }
                /** @type {?} */
                var notEmptyW = false;
                /** @type {?} */
                var warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || [])
                        .map((/**
                     * @param {?} w
                     * @return {?}
                     */
                    function (w) {
                        return {
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        };
                    }));
                }
                /** @type {?} */
                var formula = field.formula != null ? field.formula.formula : null;
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
                _this._curForceValue = forceValue;
                _this._curFormula = formula;
                _this._validationConditions = validationConditions;
                _this._warningConditions = warningConditions;
            }
            if (_this.isNumericField(n.node)) {
                /** @type {?} */
                var numField = (/** @type {?} */ (n.node));
                /** @type {?} */
                var minValue = void 0;
                /** @type {?} */
                var maxValue = void 0;
                /** @type {?} */
                var minDigits = void 0;
                /** @type {?} */
                var maxDigits = void 0;
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
            if (_this.isFieldWithChoices(n.node)) {
                /** @type {?} */
                var fieldWithChoices = (/** @type {?} */ (n.node));
                /** @type {?} */
                var triggerConditions = (fieldWithChoices.triggerConditions || [])
                    .map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.condition; }));
                controls.choicesOrigin = fieldWithChoices.choicesOrigin.getName();
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula : null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                _this._triggerConditions = triggerConditions;
            }
            /** @type {?} */
            var fg = _this._fb.group(controls);
            fg.setValidators(validators);
            _this._conditionalBranches = n.node.conditionalBranches.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.condition; }));
            _this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;
            _this._handleConditionalBranchesChange(fg);
            _this._handleVisibilityChange(fg);
            _this._handleFormulaRepsChange(fg);
            _this._handleChoicesFilterChange(fg);
            _this._handleFormulaChange(fg);
            _this._handleForceValueChange(fg);
            _this._handleValidationCondtionsChange(fg);
            _this._handleWarningCondtionsChange(fg);
            _this._handleNextSlideConditionChange(fg);
            _this._handleTriggerCondtionsChange(fg);
            return fg;
        })), publishReplay(1), refCount());
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._destroyConditionDialog = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editConditionDialogSub != null) {
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editConditionDialog != null) {
            this._editConditionDialog.close();
            this._editConditionDialog = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._destroyValidationConditionDialog = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editValidationConditionDialogSub != null) {
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editValidationConditionDialog != null) {
            this._editValidationConditionDialog.close();
            this._editValidationConditionDialog = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._destroyWarningConditionDialog = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editWarningConditionDialogSub != null) {
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editWarningConditionDialog != null) {
            this._editWarningConditionDialog.close();
            this._editWarningConditionDialog = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initRemoveTriggerCondition = /**
     * @private
     * @return {?}
     */
    function () {
        this._removeTriggerConditionSub = ((/** @type {?} */ (this._removeTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var vcIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['triggerConditions'];
            /** @type {?} */
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initAddTriggerCondition = /**
     * @private
     * @return {?}
     */
    function () {
        this._addTriggerConditionSub = ((/** @type {?} */ (this._addTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['triggerConditions'];
            /** @type {?} */
            var vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initTriggerConditionEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editTriggerConditionSub = ((/** @type {?} */ (this._editTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var vcIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (vcIdx < 0 || vcIdx >= _this._triggerConditions.length || fg == null) {
                return;
            }
            _this._editConditionDialog = _this._dialog
                .open(AjfFbConditionEditorDialog);
            /** @type {?} */
            var cmp = _this._editConditionDialog.componentInstance;
            cmp.condition = _this._triggerConditions[vcIdx];
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    _this._triggerConditions[vcIdx] = cond;
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initRemoveWarningCondition = /**
     * @private
     * @return {?}
     */
    function () {
        this._removeWarningConditionSub = ((/** @type {?} */ (this._removeWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var vcIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['warningConditions'];
            /** @type {?} */
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initAddWarningCondition = /**
     * @private
     * @return {?}
     */
    function () {
        this._addWarningConditionSub = ((/** @type {?} */ (this._addWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['warningConditions'];
            /** @type {?} */
            var vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initWarningConditionEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editWarningConditionSub = ((/** @type {?} */ (this._editWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyWarningConditionDialog();
            /** @type {?} */
            var vcIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (vcIdx < 0 || vcIdx >= _this._warningConditions.length || fg == null) {
                return;
            }
            _this._editWarningConditionDialog = _this._dialog
                .open(AjfFbWarningConditionEditorDialog);
            /** @type {?} */
            var cmp = _this._editWarningConditionDialog.componentInstance;
            /** @type {?} */
            var w = _this._warningConditions[vcIdx];
            cmp.condition = w.condition;
            cmp.warningMessage = w.warningMessage;
            _this._editWarningConditionDialogSub = _this._editWarningConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    _this._warningConditions[vcIdx] = cond;
                }
                _this._editWarningConditionDialogSub.unsubscribe();
                _this._editWarningConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initRemoveValidationCondition = /**
     * @private
     * @return {?}
     */
    function () {
        this._removeValidationConditionSub = ((/** @type {?} */ (this._removeValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var vcIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['validationConditions'];
            /** @type {?} */
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initAddValidationCondition = /**
     * @private
     * @return {?}
     */
    function () {
        this._addValidationConditionSub = ((/** @type {?} */ (this._addValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['validationConditions'];
            /** @type {?} */
            var vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initValidationConditionEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editValidationConditionSub = ((/** @type {?} */ (this._editValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyValidationConditionDialog();
            /** @type {?} */
            var vcIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (vcIdx < 0 || vcIdx >= _this._validationConditions.length || fg == null) {
                return;
            }
            _this._editValidationConditionDialog = _this._dialog
                .open(AjfFbValidationConditionEditorDialog);
            /** @type {?} */
            var cmp = _this._editValidationConditionDialog.componentInstance;
            /** @type {?} */
            var v = _this._validationConditions[vcIdx];
            cmp.condition = v.condition;
            cmp.errorMessage = v.errorMessage;
            _this._editValidationConditionDialogSub = _this._editValidationConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    _this._validationConditions[vcIdx] = cond;
                }
                _this._editValidationConditionDialogSub.unsubscribe();
                _this._editValidationConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initForceValueEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editForceValueSub = ((/** @type {?} */ (this._editForceValueEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['forceValue'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initNextSlideConditionEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editNextSlideConditionSub = ((/** @type {?} */ (this._editNextSlideConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['nextSlideCondition'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initFormulaEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editFormulaSub = ((/** @type {?} */ (this._editFormulaEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['formula'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initFormulaRepsEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editFormulaRepsSub = ((/** @type {?} */ (this._editFormulaRepsEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['formulaReps'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initChoicesFilterEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editChoicesFilterSub = ((/** @type {?} */ (this._editChoicesFilterEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['choicesFilter'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initConditionalBranchEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editConditionalBranchSub = ((/** @type {?} */ (this._editConditionalBranchEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var cbIdx = r[0];
            /** @type {?} */
            var fg = r[1];
            if (cbIdx < 0 || cbIdx >= _this._conditionalBranches.length || fg == null) {
                return;
            }
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = _this._conditionalBranches[cbIdx];
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    _this._conditionalBranches[cbIdx] = cond;
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @return {?}
     */
    AjfFbNodeProperties.prototype._initVisibilityEdit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._editVisibilitySub = ((/** @type {?} */ (this._editVisibilityEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            _this._destroyConditionDialog();
            /** @type {?} */
            var fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            var ctrl = fg.controls['visibility'];
            /** @type {?} */
            var condition = ctrl.value;
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = condition;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleTriggerCondtionsChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) {
            return JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions);
        })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._triggerConditions = v.triggerConditions;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleWarningCondtionsChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) {
            return JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions);
        })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._warningConditions = v.warningConditions;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleValidationCondtionsChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._validationConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) {
            return JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions);
        })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._validationConditions = v.validationConditions;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleForceValueChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._forceValueSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.forceValue === v2.forceValue; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._curForceValue = v.forceValue;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleNextSlideConditionChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.nextSlideCondition === v2.nextSlideCondition; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._nextSlideCondition = v.nextSlideCondition;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleFormulaChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.formula === v2.formula; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._curFormula = v.formula;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleFormulaRepsChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._formulaRepsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.formulaReps === v2.formulaReps; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._curFormulaReps = v.formulaReps;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleChoicesFilterChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._choicesFilterSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.choicesFilter === v2.choicesFilter; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this._curChoicesFilter = v.choicesFilter;
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleConditionalBranchesChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._conditionalBranchesSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) {
            return v1.conditionalBranchesNum === v2.conditionalBranchesNum;
        })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var cbNum = v.conditionalBranchesNum;
            /** @type {?} */
            var curCbNum = _this._conditionalBranches.length;
            if (curCbNum < cbNum) {
                /** @type {?} */
                var newCbs = [];
                for (var i = curCbNum; i < cbNum; i++) {
                    newCbs.push(AjfCondition.alwaysCondition().condition);
                }
                _this._conditionalBranches = _this._conditionalBranches.concat(newCbs);
            }
            else if (curCbNum > cbNum) {
                _this._conditionalBranches.splice(0, curCbNum - cbNum);
            }
        }));
    };
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    AjfFbNodeProperties.prototype._handleVisibilityChange = /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    function (fg) {
        var _this = this;
        this._visibilitySub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.visibilityOpt === v2.visibilityOpt; })))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            /** @type {?} */
            var visibilityOpt = v.visibilityOpt;
            /** @type {?} */
            var newCondition;
            switch (visibilityOpt) {
                case 'always':
                    newCondition = AjfCondition.alwaysCondition().condition;
                    break;
                case 'never':
                    newCondition = AjfCondition.neverCondition().condition;
                    break;
                default:
                    newCondition = null;
            }
            _this._curVisibility = newCondition;
            fg.controls['visibility'].setValue(newCondition);
        }));
    };
    /**
     * @private
     * @param {?} condition
     * @return {?}
     */
    AjfFbNodeProperties.prototype._guessVisibilityOpt = /**
     * @private
     * @param {?} condition
     * @return {?}
     */
    function (condition) {
        if (condition.condition.localeCompare(AjfCondition.alwaysCondition().condition) === 0) {
            return 'always';
        }
        if (condition.condition.localeCompare(AjfCondition.neverCondition().condition) === 0) {
            return 'never';
        }
        return 'condition';
    };
    AjfFbNodeProperties.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-node-properties',
                    template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div><div class=\"ajf-header\"><h3 translate>Properties</h3><mat-icon (click)=\"save()\">save</mat-icon><mat-icon (click)=\"cancel()\">cancel</mat-icon></div><ng-container *ngIf=\"nodeEntry|async as ne\"><ng-container *ngIf=\"propertiesForm|async as pf\"><form [formGroup]=\"pf\" novalidate><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><div class=\"ajf-select-container\"><mat-select formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\"><mat-option value=\"always\" translate>Always</mat-option><mat-option value=\"never\" translate>Never</mat-option><mat-option value=\"condition\" translate>Condition...</mat-option></mat-select><button (click)=\"editVisibility()\" [disabled]=\"pf.value['visibilityOpt'] != 'condition'\" mat-raised-button [matTooltip]=\"curVisibility\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curVisibility }}</span></div></button></div></div><div class=\"ajf-prop\"><div><label translate>Branches</label></div><div><mat-slider formControlName=\"conditionalBranchesNum\" thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider></div><div *ngFor=\"let branch of conditionalBranches; let idx = index\"><button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ branch }}</span></div></button></div></div><ng-template [ngIf]=\"isRepeatingContainerNode((ne)?.node)\"><div class=\"ajf-prop\"><div><label translate>Repetitions</label></div><div><button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curFormulaReps }}</span></div></button></div><div><label translate>Min repetitions</label></div><div><mat-slider formControlName=\"minReps\" thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider></div><div><label translate>Max repetitions</label></div><div><mat-slider formControlName=\"maxReps\" thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider></div></div></ng-template><ng-template [ngIf]=\"isField((ne)?.node)\"><div class=\"ajf-prop\"><div class=\"ajf-select-container\"><mat-select formControlName=\"size\" [placeholder]=\"'Size' | translate\"><mat-option *ngFor=\"let fieldSize of fieldSizes\" [value]=\"fieldSize.value\">{{ fieldSize.label }}</mat-option></mat-select></div></div><div class=\"ajf-prop\"><mat-form-field><textarea matInput formControlName=\"description\" [placeholder]=\"'Description' | translate\"></textarea></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"defaultValue\" [placeholder]=\"'Default value' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><div><label translate>Formula</label></div><div><button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curFormula }}</span></div></button></div></div><div class=\"ajf-prop\"><div><label translate>Force value</label></div><div><button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curForceValue }}</span></div></button></div></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox></div><ng-template [ngIf]=\"isNumericField((ne)?.node)\"><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"minValue\" [placeholder]=\"'Min value' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"maxValue\" [placeholder]=\"'Max value' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"minDigits\" [placeholder]=\"'Min digits' | translate\"></mat-form-field></div><div class=\"ajf-prop\"><mat-form-field><input matInput formControlName=\"maxDigits\" [placeholder]=\"'Max digits' | translate\"></mat-form-field></div></ng-template><div class=\"ajf-prop\"><div class=\"ajf-header\"><label translate>Validation</label><mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon></div><div *ngIf=\"validationConditions == null || validationConditions.length == 0\" class=\"ajf-validation-row ajf-emph\" translate>No conditions</div><div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\"><button (click)=\"editValidationCondition(idx)\" mat-raised-button [matTooltip]=\"validationCondition.condition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ validationCondition.condition }}</span></div></button><mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon></div></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox></div><div class=\"ajf-prop\"><div class=\"ajf-header\"><label translate>Warnings</label><mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon></div><div *ngIf=\"warningConditions == null || warningConditions.length == 0\" class=\"ajf-validation-row ajf-emph\" translate>No warnings</div><div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\"><button (click)=\"editWarningCondition(idx)\" mat-raised-button [matTooltip]=\"warningCondition.condition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ warningCondition.condition }}</span></div></button><mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon></div></div><div class=\"ajf-prop\"><div><label translate>Go to next slide condition</label></div><div><button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ nextSlideCondition }}</span></div></button></div></div><ng-template [ngIf]=\"isFieldWithChoices((ne)?.node)\"><div class=\"ajf-prop\"><div class=\"ajf-select-container\"><mat-select formControlName=\"choicesOrigin\" [placeholder]=\"'Choices' | translate\"><mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.getName()\">{{ choicesOrigin.getLabel() || choicesOrigin.getName() }}</mat-option></mat-select></div></div><div class=\"ajf-prop\"><div><label translate>Choices filter</label></div><div><button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ curChoicesFilter }}</span></div></button></div></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox></div><div class=\"ajf-prop\"><mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox></div><div class=\"ajf-prop\"><div class=\"ajf-header\"><label translate>Trigger selection</label><mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon></div><div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\" class=\"ajf-validation-row ajf-emph\" translate>No trigger condition</div><div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"><button (click)=\"editTriggerCondition(idx)\" mat-raised-button [matTooltip]=\"triggerCondition\"><div class=\"ajf-icon-cont\"><mat-icon>edit</mat-icon><span>{{ triggerCondition }}</span></div></button><mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon></div></div></ng-template></ng-template></form></ng-container></ng-container>",
                    styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-select-container{padding-top:16px;display:flex;flex-direction:column;align-items:stretch}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties [mat-raised-button],ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider{width:100%}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbNodeProperties.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialog },
        { type: FormBuilder }
    ]; };
    return AjfFbNodeProperties;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFbNodeTypeEntry = /** @class */ (function () {
    function AjfFbNodeTypeEntry(_cdr) {
        this._cdr = _cdr;
    }
    Object.defineProperty(AjfFbNodeTypeEntry.prototype, "nodeType", {
        get: /**
         * @return {?}
         */
        function () { return this._nodeType; },
        set: /**
         * @param {?} nodeType
         * @return {?}
         */
        function (nodeType) {
            this._nodeType = nodeType;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    AjfFbNodeTypeEntry.decorators = [
        { type: Component, args: [{selector: 'ajf-fb-node-type-entry',
                    template: "<ng-container *ngIf=\"nodeType\"><mat-icon [fontSet]=\"nodeType.icon.fontSet\" [fontIcon]=\"nodeType.icon.fontIcon\"></mat-icon>{{ nodeType.label }}</ng-container>",
                    styles: ["ajf-fb-node-type-entry{display:block;padding:1em 1.5em}ajf-fb-node-type-entry mat-icon{vertical-align:middle}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AjfFbNodeTypeEntry.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    AjfFbNodeTypeEntry.propDecorators = {
        nodeType: [{ type: Input }]
    };
    return AjfFbNodeTypeEntry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfFormBuilderModule = /** @class */ (function () {
    function AjfFormBuilderModule() {
    }
    AjfFormBuilderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        DragDropModule,
                        MatButtonModule,
                        MatCardModule,
                        MatCheckboxModule,
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
                        AjfFbValidationConditionEditorDialog,
                        AjfFbWarningConditionEditorDialog,
                    ],
                    providers: [
                        AjfFormBuilderService
                    ]
                },] },
    ];
    return AjfFormBuilderModule;
}());

export { AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderService, flattenNodes, isContainerNode, isRepeatingContainerNode, isSlideNode, AjfFbBranchLine as ɵa, AjfFbChoicesOriginEditorDialog as ɵb, AjfFbChoicesOriginEditor as ɵc, AjfFbConditionEditorDialog as ɵd, AjfFbConditionEditor as ɵe, AjfFbNodeEntry as ɵf, AjfFbNodeProperties as ɵg, AjfFbNodeTypeEntry as ɵh, AjfFbValidationConditionEditorDialog as ɵi, AjfFbWarningConditionEditorDialog as ɵj };
//# sourceMappingURL=form-builder.es5.js.map
