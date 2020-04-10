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
import { __extends, __read, __spread, __assign } from 'tslib';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subject, combineLatest, Subscription } from 'rxjs';
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
var AjfFbBranchLine = /** @class */ (function () {
    function AjfFbBranchLine(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._offset = 0;
        this._height = 0;
    }
    Object.defineProperty(AjfFbBranchLine.prototype, "offset", {
        set: function (offset) {
            this._offset = offset;
            this._updateOffset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbBranchLine.prototype, "color", {
        set: function (color) {
            this._color = color;
            this._updateColor();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbBranchLine.prototype, "height", {
        set: function (height) {
            this._height = height;
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    AjfFbBranchLine.prototype._updateHeight = function () {
        var height = Math.max(0, this._height - 25) + "px";
        this._renderer.setStyle(this._el.nativeElement, 'height', height);
    };
    AjfFbBranchLine.prototype._updateOffset = function () {
        var margin = this._offset * 4 + "px";
        this._renderer.setStyle(this._el.nativeElement, 'margin-top', margin);
        this._renderer.setStyle(this._el.nativeElement, 'margin-left', margin);
    };
    AjfFbBranchLine.prototype._updateColor = function () {
        this._renderer.setStyle(this._el.nativeElement, 'border-color', this._color);
    };
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
var ChoicesOriginDataSource = /** @class */ (function (_super) {
    __extends(ChoicesOriginDataSource, _super);
    function ChoicesOriginDataSource() {
        var _this = _super.call(this) || this;
        _this._choices = new BehaviorSubject([]);
        _this._choicesObs = _this._choices.asObservable();
        return _this;
    }
    ChoicesOriginDataSource.prototype.connect = function () {
        return this._choicesObs;
    };
    ChoicesOriginDataSource.prototype.disconnect = function () { };
    ChoicesOriginDataSource.prototype.updateChoices = function (choices) {
        this._choices.next(choices);
    };
    return ChoicesOriginDataSource;
}(DataSource));

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
var AjfFbChoicesOriginEditor = /** @class */ (function () {
    function AjfFbChoicesOriginEditor() {
        this._displayedColumns = ['label', 'value', 'delete'];
        this.editing = {};
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "displayedColumns", {
        get: function () {
            return this._displayedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesOrigin", {
        get: function () {
            return this._choicesOrigin;
        },
        set: function (choicesOrigin) {
            this._choicesOrigin = choicesOrigin;
            this.name = choicesOrigin.name;
            this.label = choicesOrigin.label;
            this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
            this._choicesArr = choicesOrigin.choices;
            this._choices.updateChoices(this._choicesArr);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choices", {
        get: function () {
            return this._choices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesArr", {
        get: function () {
            return this._choicesArr;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbChoicesOriginEditor.prototype.updateValue = function (evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        this._choicesArr[rowIdx][cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    };
    AjfFbChoicesOriginEditor.prototype.deleteRow = function (rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    };
    AjfFbChoicesOriginEditor.prototype.addRow = function () {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    };
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
    return AjfFbChoicesOriginEditor;
}());

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
    var cns = c.nodes.filter(function (n) { return isContainerNode(n); });
    var len = cns.length;
    for (var i = 0; i < len; i++) {
        var cn = getNodeContainer(cns[i], node);
        if (cn != null) {
            return cn;
        }
    }
    return null;
}
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches) {
    if (ignoreConditionalBranches === void 0) { ignoreConditionalBranches = false; }
    var entries = nodes.filter(function (n) { return n.parent === parent.id; })
        .sort(function (n1, n2) { return n1.parentNode - n2.parentNode; })
        .map(function (n) {
        var children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return {
            node: n,
            children: children,
            content: buildFormBuilderNodesContent(nodes, n)
        };
    });
    if (!ignoreConditionalBranches) {
        var entriesNum = entries.length;
        var cbs = parent.conditionalBranches.length;
        for (var i = entriesNum; i < cbs; i++) {
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
function buildFormBuilderNodesTree(nodes) {
    var rootNodes = nodes.filter(function (n) { return n.parent == null || n.parent === 0; });
    if (rootNodes.length === 1) {
        var rootNode = rootNodes[0];
        if (isSlidesNode(rootNode)) {
            var tree = [];
            tree.push({
                node: rootNode,
                container: null,
                children: buildFormBuilderNodesSubtree(nodes, rootNode),
                content: buildFormBuilderNodesContent(nodes, rootNode)
            });
            return tree;
        }
    }
    else if (rootNodes.length === 0) {
        return [null];
    }
    throw new Error('Invalid form definition');
}
function flattenNodes(nodes) {
    var flatNodes = [];
    nodes.forEach(function (node) {
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
        flatNodes.push(node);
    });
    return flatNodes;
}
function getDescendants(flatNodes, parentNode, branch) {
    if (branch === void 0) { branch = null; }
    return branch != null ?
        flatNodes.filter(function (n) { return n.parent === parentNode.id && n.parentNode === branch; }) :
        flatNodes.filter(function (n) { return n.parent === parentNode.id; });
}
function removeNodes(nodes, ids) {
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
        var node = nodes[i];
        if (isContainerNode(node)) {
            var container = node;
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter(function (n) { return ids.indexOf(n.id) === -1; });
}
function deleteNodeSubtree(nodes, parentNode, branch) {
    if (branch === void 0) { branch = null; }
    var flatNodes = flattenNodes(nodes);
    var delNodes = [];
    var descendants = getDescendants(flatNodes, parentNode, branch);
    var len = descendants.length;
    for (var i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map(function (n) { return n.id; }));
}
var nodeUniqueId = 0;
var AjfFormBuilderService = /** @class */ (function () {
    function AjfFormBuilderService() {
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
    Object.defineProperty(AjfFormBuilderService.prototype, "availableNodeTypes", {
        /**
         * Available node types
         *
         * @readonly
         * @memberOf AjfFormBuilderService
         */
        get: function () {
            return this._availableNodeTypes;
        },
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
        get: function () {
            return this._formObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "attachmentsOrigins", {
        get: function () {
            return this._attachmentsOrigins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "choicesOrigins", {
        get: function () {
            return this._choicesOrigins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "stringIdentifier", {
        get: function () {
            return this._stringIdentifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "flatNodes", {
        get: function () {
            return this._flatNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "flatFields", {
        get: function () {
            return this._flatFields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "nodeEntriesTree", {
        get: function () {
            return this._nodeEntriesTree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedNodeEntry", {
        get: function () {
            return this._editedNodeEntryObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedCondition", {
        get: function () {
            return this._editedConditionObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedChoicesOrigin", {
        get: function () {
            return this._editedChoicesOriginObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "beforeNodesUpdate", {
        get: function () {
            return this._beforeNodesUpdateObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "afterNodeUpdate", {
        get: function () {
            return this._afterNodeUpdateObs;
        },
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
    AjfFormBuilderService.prototype.setForm = function (form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    };
    AjfFormBuilderService.prototype.editNodeEntry = function (nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    };
    AjfFormBuilderService.prototype.editCondition = function (condition) {
        this._editedCondition.next(condition);
    };
    AjfFormBuilderService.prototype.saveCurrentCondition = function (condition) {
        var c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    };
    AjfFormBuilderService.prototype.cancelConditionEdit = function () {
        this._editedChoicesOrigin.next(null);
    };
    AjfFormBuilderService.prototype.insertNode = function (nodeType, parent, parentNode, inContent) {
        if (inContent === void 0) { inContent = false; }
        var node;
        var id = ++nodeUniqueId;
        var isFieldNode = nodeType.nodeType.field != null;
        if (isFieldNode) {
            node = createField({
                id: id,
                nodeType: AjfNodeType.AjfField,
                fieldType: nodeType.nodeType.field,
                parent: parent.id,
                parentNode: parentNode,
                name: '',
            });
        }
        else {
            node = createContainerNode({
                id: id,
                nodeType: nodeType.nodeType.node,
                parent: parent != null ? parent.id : 0,
                parentNode: parentNode,
                name: '',
                nodes: [],
            });
        }
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next(function (nodes) {
            if (node.parent === 0) {
                return [node];
            }
            var cn = isContainerNode(parent) && inContent ? parent :
                getNodeContainer({ nodes: nodes }, parent);
            if (cn != null) {
                if (!isFieldNode) {
                    var replaceNodes = cn.nodes === nodes;
                    var newNodes = cn.nodes.slice(0);
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
        });
    };
    AjfFormBuilderService.prototype.saveNodeEntry = function (properties) {
        this._saveNodeEntryEvent.emit(properties);
    };
    AjfFormBuilderService.prototype.cancelNodeEntryEdit = function () {
        this._editedNodeEntry.next(null);
    };
    AjfFormBuilderService.prototype.deleteNodeEntry = function (nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
    };
    AjfFormBuilderService.prototype.getCurrentForm = function () {
        return combineLatest([
            this.form, this.nodes, this.attachmentsOrigins, this.choicesOrigins,
            this.stringIdentifier
        ])
            .pipe(filter(function (_a) {
            var _b = __read(_a, 1), form = _b[0];
            return form != null;
        }), map(function (_a) {
            var _b = __read(_a, 5), form = _b[0], nodes = _b[1], attachmentsOrigins = _b[2], choicesOrigins = _b[3], stringIdentifier = _b[4];
            return createForm({
                choicesOrigins: choicesOrigins.slice(0),
                attachmentsOrigins: attachmentsOrigins.slice(0),
                stringIdentifier: (stringIdentifier || []).slice(0),
                nodes: nodes.slice(0),
                supplementaryInformations: form.supplementaryInformations,
            });
        }));
    };
    AjfFormBuilderService.prototype.editChoicesOrigin = function (choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    };
    AjfFormBuilderService.prototype.createChoicesOrigin = function () {
        this._editedChoicesOrigin.next(createChoicesFixedOrigin({ name: '' }));
    };
    AjfFormBuilderService.prototype.cancelChoicesOriginEdit = function () {
        this._editedChoicesOrigin.next(null);
    };
    AjfFormBuilderService.prototype.saveChoicesOrigin = function (params) {
        var choicesOrigin = this._editedChoicesOrigin.getValue();
        if (choicesOrigin != null) {
            choicesOrigin.label = params.label;
            choicesOrigin.name = params.name;
            if (isChoicesFixedOrigin(choicesOrigin)) {
                choicesOrigin.choices = params.choices;
            }
            this._choicesOriginsUpdates.next(function (choicesOrigins) {
                var idx = choicesOrigins.indexOf(choicesOrigin);
                if (idx > -1) {
                    choicesOrigins = __spread(choicesOrigins.slice(0, idx), [
                        choicesOrigin
                    ], choicesOrigins.slice(idx + 1));
                }
                else {
                    choicesOrigins = __spread(choicesOrigins, [choicesOrigin]);
                }
                return choicesOrigins;
            });
        }
        this._editedChoicesOrigin.next(null);
    };
    AjfFormBuilderService.prototype.saveStringIdentifier = function (identifier) {
        this._stringIdentifierUpdates.next(function () { return __spread(identifier); });
    };
    AjfFormBuilderService.prototype._findMaxNodeId = function (nodes, _curMaxId) {
        var _this = this;
        if (_curMaxId === void 0) { _curMaxId = 0; }
        var maxId = 0;
        nodes.forEach(function (n) {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, _this._findMaxNodeId(n.nodes));
            }
        });
        return maxId;
    };
    AjfFormBuilderService.prototype._initFormStreams = function () {
        var _this = this;
        this._form.subscribe(function (form) {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = _this._findMaxNodeId(form.nodes);
            }
            _this._nodesUpdates.next(function (_nodes) {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            });
            _this._attachmentsOriginsUpdates.next(function (_attachmentsOrigins) {
                return form != null && form.attachmentsOrigins != null ?
                    form.attachmentsOrigins.slice(0) :
                    [];
            });
            _this._choicesOriginsUpdates.next(function (_choicesOrigins) {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            });
            _this._stringIdentifierUpdates.next(function (_) {
                return form != null && form.stringIdentifier != null ? form.stringIdentifier.slice(0) :
                    [];
            });
        });
    };
    AjfFormBuilderService.prototype._initChoicesOriginsStreams = function () {
        this._choicesOrigins =
            this._choicesOriginsUpdates
                .pipe(scan(function (choicesOrigins, op) {
                return op(choicesOrigins);
            }, []), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initAttachmentsOriginsStreams = function () {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan(function (attachmentsOrigins, op) {
            return op(attachmentsOrigins);
        }, []), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initStringIdentifierStreams = function () {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan(function (stringIdentifier, op) {
            return op(stringIdentifier);
        }, []), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initNodesStreams = function () {
        this._nodes = this._nodesUpdates
            .pipe(scan(function (nodes, op) {
            return op(nodes);
        }, []), publishReplay(1), refCount());
        this._flatNodes = this._nodes.pipe(map(function (nodes) { return flattenNodes(nodes); }), publishReplay(1), refCount());
        this._flatFields = this._flatNodes.pipe(map(function (nodes) { return nodes.filter(function (n) { return !isContainerNode(n); }); }), publishReplay(1), refCount());
        this._nodeEntriesTree = this._nodes.pipe(map(function (nodes) { return buildFormBuilderNodesTree(nodes); }), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initSaveNode = function () {
        var _this = this;
        this._saveNodeEntryEvent
            .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], nodeEntry = _b[1];
            return nodeEntry != null;
        }), map(function (_a) {
            var _b = __read(_a, 2), properties = _b[0], nodeEntry = _b[1];
            _this._beforeNodesUpdate.emit();
            nodeEntry = nodeEntry;
            var origNode = nodeEntry.node;
            var node = deepCopy(origNode);
            node.id = nodeEntry.node.id;
            node.name = properties.name;
            node.label = properties.label;
            node.visibility = properties.visibility != null ?
                createCondition({ condition: properties.visibility }) :
                null;
            var oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches = properties.conditionalBranches != null ?
                properties.conditionalBranches.map(function (condition) { return createCondition({ condition: condition }); }) :
                [alwaysCondition()];
            var newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                var repNode = node;
                repNode.formulaReps = properties.formulaReps != null ?
                    createFormula({ formula: properties.formulaReps }) :
                    undefined;
                repNode.minReps = properties.minReps;
                repNode.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                var field = node;
                field.description = properties.description;
                field.defaultValue = properties.defaultValue;
                field.formula = properties.formula != null ?
                    createFormula({ formula: properties.formula }) :
                    undefined;
                var forceValue = properties.value;
                var notEmpty = properties.notEmpty;
                var validationConditions = properties.validationConditions;
                var minValue = parseInt(properties.minValue, 10);
                var maxValue = parseInt(properties.maxValue, 10);
                var minDigits = parseInt(properties.minDigits, 10);
                var maxDigits = parseInt(properties.maxDigits, 10);
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
                    var validation = field.validation || createValidationGroup({});
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
                            []).map(function (c) { return createValidation({
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        }); });
                    field.validation = validation;
                }
                else {
                    field.validation = undefined;
                }
                var notEmptyWarn = properties.notEmptyWarning;
                var warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    var warning = field.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions =
                        (warningConditions ||
                            []).map(function (w) { return createWarning({
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        }); });
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
                    var fwc = field;
                    fwc.choicesOriginRef = properties.choicesOriginRef;
                    fwc.forceExpanded = properties.forceExpanded;
                    fwc.forceNarrow = properties.forceNarrow;
                    fwc.triggerConditions = (properties.triggerConditions ||
                        []).map(function (t) { return createCondition({ condition: t }); });
                }
            }
            _this._editedNodeEntry.next(null);
            return function (nodes) {
                var cn = getNodeContainer({ nodes: nodes }, origNode);
                if (cn != null) {
                    // TODO: @trik check this, was always true?
                    // if (cn instanceof AjfNode) {
                    var replaceNodes = cn.nodes === nodes;
                    var idx = cn.nodes.indexOf(origNode);
                    var newNodes = cn.nodes.slice(0, idx);
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
                        for (var i = newConditionalBranches; i < oldConditionalBranches; i++) {
                            nodes = deleteNodeSubtree(nodes, node, i);
                        }
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    };
    AjfFormBuilderService.prototype._initDeleteNode = function () {
        var _this = this;
        this._deleteNodeEntryEvent
            .pipe(map(function (nodeEntry) {
            _this._beforeNodesUpdate.emit();
            return function (nodes) {
                var node = nodeEntry.node;
                var cn = getNodeContainer({ nodes: nodes }, node);
                if (cn != null) {
                    var replaceNodes = cn.nodes === nodes;
                    var idx = cn.nodes.indexOf(node);
                    var newNodes = cn.nodes.slice(0, idx);
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
            };
        }))
            .subscribe(this._nodesUpdates);
    };
    AjfFormBuilderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AjfFormBuilderService.ctorParameters = function () { return []; };
    return AjfFormBuilderService;
}());

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
var AjfFbChoicesOriginEditorDialog = /** @class */ (function () {
    function AjfFbChoicesOriginEditorDialog(_service) {
        this._service = _service;
        this._choicesOrigin =
            this._service.editedChoicesOrigin.pipe(filter(function (c) { return c != null; }), map(function (c) { return c; }));
    }
    Object.defineProperty(AjfFbChoicesOriginEditorDialog.prototype, "choicesOrigin", {
        get: function () {
            return this._choicesOrigin;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbChoicesOriginEditorDialog.prototype.saveChoicesOrigin = function () {
        this._service.saveChoicesOrigin({ label: this.editor.label, name: this.editor.name, choices: this.editor.choicesArr });
    };
    AjfFbChoicesOriginEditorDialog.prototype.cancelChoicesOriginEdit = function () {
        this._service.cancelChoicesOriginEdit();
    };
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
    AjfFbChoicesOriginEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
    AjfFbChoicesOriginEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbChoicesOriginEditor, { static: false },] }]
    };
    return AjfFbChoicesOriginEditorDialog;
}());

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
var AjfFbConditionEditor = /** @class */ (function () {
    function AjfFbConditionEditor(_) {
    }
    Object.defineProperty(AjfFbConditionEditor.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        set: function (fields) {
            this._fields = fields;
            this._updateVariables();
        },
        enumerable: true,
        configurable: true
    });
    AjfFbConditionEditor.prototype.insertVariable = function (variable) {
        if (this.monacoEditor != null && this.monacoEditor.editor != null) {
            var editor = this.monacoEditor.editor;
            var value = editor.getValue().split('\n');
            var position = editor.getPosition();
            var ln = position.lineNumber - 1;
            var line = value[ln];
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
    AjfFbConditionEditor.prototype.onEditorInit = function () {
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
    };
    AjfFbConditionEditor.prototype._updateVariables = function () {
        var _this = this;
        if (this._fields == null) {
            return;
        }
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-variables.d.ts'] =
                this._fields
                    .map(function (field) {
                    return "declare const " + field.name + ": " + _this._fieldVarType(field.fieldType) + ";";
                })
                    .join('\n');
        }
        catch (e) {
        }
    };
    AjfFbConditionEditor.prototype._updateFunctions = function () {
        try {
            monaco.languages.typescript.javascriptDefaults._extraLibs['condition-editor-functions.d.ts'] =
                AjfExpressionUtils.UTIL_FUNCTIONS;
        }
        catch (e) {
        }
    };
    AjfFbConditionEditor.prototype._fieldVarType = function (fieldType) {
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
        { type: Component, args: [{
                    selector: 'ajf-condition-editor',
                    template: "<div class=\"ajf-editor\">\n  <ajf-monaco-editor\n      (init)=\"onEditorInit()\"\n      (valueChange)=\"editedValue = $event\"\n      [value]=\"condition\" language=\"javascript\"></ajf-monaco-editor>\n</div>\n<div class=\"ajf-editor-panel\">\n  <ng-container *ngIf=\"fields as curFields\">\n    <mat-nav-list dense *ngIf=\"curFields!.length > 0\">\n      <a mat-list-item\n          (click)=\"insertVariable(field.name)\"\n          [matTooltip]=\"field.label\"\n          *ngFor=\"let field of curFields!\">\n        <ajf-node-icon [node]=\"field\"></ajf-node-icon>\n        {{ field.name }}\n      </a>\n    </mat-nav-list>\n  </ng-container>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-condition-editor{display:flex;flex-direction:row;align-items:stretch;max-height:512px}ajf-condition-editor .ajf-editor{flex:.75 0 auto;display:flex;flex-direction:row;align-items:stretch}ajf-condition-editor .ajf-editor monaco-editor{flex:1 0 auto;min-width:512px;min-height:256px}ajf-condition-editor .ajf-editor-panel{flex:.25 0 auto;overflow-y:auto}ajf-condition-editor ajf-monaco-editor{min-width:400px}\n"]
                }] }
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
var AjfFbConditionEditorDialog = /** @class */ (function () {
    function AjfFbConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
    }
    Object.defineProperty(AjfFbConditionEditorDialog.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbConditionEditorDialog.prototype.saveCondition = function () {
        if (this.editor == null) {
            return;
        }
        var newValue = this.editor.editedValue;
        this.dialogRef.close(newValue);
    };
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
    AjfFbConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };
    return AjfFbConditionEditorDialog;
}());

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
var AjfFbStringIdentifierDialogComponent = /** @class */ (function () {
    function AjfFbStringIdentifierDialogComponent(_service, _cdr) {
        var _this = this;
        this._service = _service;
        this._cdr = _cdr;
        this.dataSource = new MatTableDataSource();
        this.displayedColumns = ['label', 'value', 'delete'];
        this.separatorKeysCodes = [ENTER, COMMA];
        this._stringIdentifierSub = Subscription.EMPTY;
        this._stringIdentifierSub = _service.stringIdentifier.subscribe(function (identifier) {
            _this.dataSource.data = __spread(identifier);
        });
        this.fields$ = _service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); })
            .map(function (f) { return f.name; })
            .filter(function (f) { return f.length > 0; }); }), shareReplay(1));
    }
    AjfFbStringIdentifierDialogComponent.prototype.addRow = function () {
        this.dataSource.data = __spread(this.dataSource.data, [{ label: '', value: [] }]);
    };
    AjfFbStringIdentifierDialogComponent.prototype.deleteRow = function (rowIdx) {
        this.dataSource.data = __spread(this.dataSource.data.slice(0, rowIdx), this.dataSource.data.slice(rowIdx + 1));
    };
    AjfFbStringIdentifierDialogComponent.prototype.addValue = function (row, evt, valueInput) {
        if (evt.value.length === 0) {
            return;
        }
        row.value = __spread(row.value, [evt.value]);
        valueInput.value = '';
        this._cdr.markForCheck();
    };
    AjfFbStringIdentifierDialogComponent.prototype.removeValue = function (row, value) {
        var idx = row.value.indexOf(value);
        if (idx > -1) {
            row.value = __spread(row.value.slice(0, idx), row.value.slice(idx + 1));
            this._cdr.markForCheck();
        }
    };
    AjfFbStringIdentifierDialogComponent.prototype.ngOnDestroy = function () {
        this._stringIdentifierSub.unsubscribe();
    };
    AjfFbStringIdentifierDialogComponent.prototype.saveStringIdentifier = function () {
        this._service.saveStringIdentifier(this.dataSource.data);
    };
    AjfFbStringIdentifierDialogComponent.prototype.selected = function (row, evt) {
        row.value = __spread(row.value, [evt.option.value]);
        this._cdr.markForCheck();
    };
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
    AjfFbStringIdentifierDialogComponent.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: ChangeDetectorRef }
    ]; };
    return AjfFbStringIdentifierDialogComponent;
}());

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
        this._stringIdentifierSub = Subscription.EMPTY;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub =
            this._service.editedCondition.subscribe(function (condition) {
                if (_this._editConditionDialog != null) {
                    _this._editConditionDialog.close();
                    _this._editConditionDialog = null;
                }
                if (condition != null) {
                    _this._editConditionDialog =
                        _this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
                }
            });
        this._editChoicesOriginSub =
            this._service.editedChoicesOrigin.subscribe(function (choicesOrigin) {
                if (_this._editChoicesOriginDialog != null) {
                    _this._editChoicesOriginDialog.close();
                    _this._editChoicesOriginDialog = null;
                }
                if (choicesOrigin != null) {
                    _this._editChoicesOriginDialog =
                        _this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                }
            });
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(function () {
            if (_this.designerCont == null) {
                return;
            }
            _this._lastScrollTop = _this.designerCont.nativeElement.scrollTop;
        });
        this.nodeEntriesTree.pipe(sample(this._vc)).subscribe(function () {
            if (_this.designerCont == null) {
                return;
            }
            _this.designerCont.nativeElement.scrollTop = _this._lastScrollTop;
        });
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe(function () { });
    }
    Object.defineProperty(AjfFormBuilder.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (form) {
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
        get: function () {
            return this._nodeTypes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "nodeEntriesTree", {
        get: function () {
            return this._nodeEntriesTree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "choicesOrigins", {
        get: function () {
            return this._choicesOrigins;
        },
        enumerable: true,
        configurable: true
    });
    AjfFormBuilder.prototype.ngAfterViewChecked = function () {
        this._vc.emit();
    };
    AjfFormBuilder.prototype.ngAfterContentInit = function () {
        this._setCurrentForm();
        this._init = true;
    };
    AjfFormBuilder.prototype.ngOnDestroy = function () {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
    };
    AjfFormBuilder.prototype.createChoicesOrigin = function () {
        this._service.createChoicesOrigin();
    };
    AjfFormBuilder.prototype.disableDropPredicate = function () {
        return false;
    };
    AjfFormBuilder.prototype.editChoicesOrigin = function (choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    };
    AjfFormBuilder.prototype.editStringIdentifier = function () {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, { disableClose: true, width: '60%', height: '60%' });
    };
    AjfFormBuilder.prototype._setCurrentForm = function () {
        this._service.setForm(this._form);
    };
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
    Object.defineProperty(AjfFbNodeEntry.prototype, "hasContent", {
        get: function () {
            return this._hasContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "isFirst", {
        get: function () {
            return this._isFirst;
        },
        set: function (isFirst) {
            this._isFirst = isFirst;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "isNodeEntry", {
        get: function () {
            return this._isNodeEntry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "nodeEntry", {
        get: function () {
            return this._nodeEntry;
        },
        set: function (nodeEntry) {
            this._nodeEntry = nodeEntry;
            if (nodeEntry != null && nodeEntry.node !== void 0) {
                var ne = nodeEntry;
                this._isNodeEntry = true;
                var node = ne.node;
                this._hasContent = node != null && isContainerNode(node);
            }
            else {
                this._isNodeEntry = false;
                this._hasContent = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "realNodeEntry", {
        get: function () {
            return this._nodeEntry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "branchColors", {
        get: function () {
            return this._branchColors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "dropZones", {
        get: function () {
            return this._dropZones;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "slideDropZones", {
        get: function () {
            return this._slideDropZones;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "originOffset", {
        get: function () {
            return this._originOffset;
        },
        set: function (originOffset) {
            this._originOffset = originOffset;
            this._originLeftMargin = this._originOffset * 4 + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "originLeftMargin", {
        get: function () {
            return this._originLeftMargin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeEntry.prototype, "firstBranchColor", {
        get: function () {
            return this._firstBranchColor;
        },
        set: function (firstBranchColor) {
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
        get: function () {
            return this._currentEditedNode;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbNodeEntry.prototype.onResize = function () { };
    AjfFbNodeEntry.prototype.edit = function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry(this.nodeEntry);
    };
    AjfFbNodeEntry.prototype.delete = function () {
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.deleteNodeEntry(this.nodeEntry);
    };
    AjfFbNodeEntry.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this._updateBranchHeights(); });
        this._childEntriesSubscription = this.childEntries.changes.subscribe(function () {
            _this._updateBranchHeights();
        });
    };
    AjfFbNodeEntry.prototype.ngOnDestroy = function () {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    };
    AjfFbNodeEntry.prototype.onDropSuccess = function (evt, content) {
        if (content === void 0) { content = false; }
        var dd = evt.item.data;
        if (this._nodeEntry == null) {
            this._service.insertNode(dd, null, 0, content);
            return;
        }
        if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
            var emptySlot = content ?
                { parent: this.nodeEntry.node, parentNode: 0 } :
                this._nodeEntry;
            this._service.insertNode(dd, emptySlot.parent, emptySlot.parentNode, content);
        }
    };
    AjfFbNodeEntry.prototype.disableSlideDropPredicate = function (item) {
        return !item.data.isSlide;
    };
    AjfFbNodeEntry.prototype.emptyAreaDropPredicate = function () {
        var _this = this;
        return function (item, _drop) {
            if (_this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        };
    };
    AjfFbNodeEntry.prototype._updateBranchHeights = function () {
        if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
            this.childEntries == null) {
            return;
        }
        var nodeEntry = this.nodeEntry;
        var branchLines = this.branchLines.toArray();
        var sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
        var childEntries = this.childEntries.toArray().slice(sliceIdx);
        if (branchLines.length != childEntries.length) {
            return;
        }
        branchLines.forEach(function (bl, idx) {
            var ce = childEntries[idx];
            bl.height = ce.nativeElement.offsetTop;
        });
    };
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
    AjfFbNodeEntry.ctorParameters = function () { return [
        { type: AjfFormBuilderService }
    ]; };
    AjfFbNodeEntry.propDecorators = {
        branchLines: [{ type: ViewChildren, args: [AjfFbBranchLine,] }],
        childEntries: [{ type: ViewChildren, args: [AjfFbNodeEntry, { read: ElementRef },] }],
        isFirst: [{ type: Input }],
        nodeEntry: [{ type: Input }],
        level: [{ type: Input }],
        originOffset: [{ type: Input }],
        firstBranchColor: [{ type: Input }]
    };
    return AjfFbNodeEntry;
}());

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
var AjfFbValidationConditionEditorDialog = /** @class */ (function () {
    function AjfFbValidationConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
    }
    Object.defineProperty(AjfFbValidationConditionEditorDialog.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbValidationConditionEditorDialog.prototype.saveCondition = function () {
        if (this.editor == null) {
            return;
        }
        var newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, errorMessage: this.errorMessage });
    };
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
    AjfFbValidationConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbValidationConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };
    return AjfFbValidationConditionEditorDialog;
}());

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
var AjfFbWarningConditionEditorDialog = /** @class */ (function () {
    function AjfFbWarningConditionEditorDialog(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map(function (fields) { return fields.sort(function (f1, f2) { return f1.name.localeCompare(f2.name); }); }));
    }
    Object.defineProperty(AjfFbWarningConditionEditorDialog.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbWarningConditionEditorDialog.prototype.saveCondition = function () {
        if (this.editor == null) {
            return;
        }
        var newValue = this.editor.editedValue;
        this.dialogRef.close({ condition: newValue, warningMessage: this.warningMessage });
    };
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
    AjfFbWarningConditionEditorDialog.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialogRef }
    ]; };
    AjfFbWarningConditionEditorDialog.propDecorators = {
        editor: [{ type: ViewChild, args: [AjfFbConditionEditor, { static: false },] }]
    };
    return AjfFbWarningConditionEditorDialog;
}());

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
    var minReps = c.value.minReps;
    var maxReps = c.value.maxReps;
    if (minReps != null && maxReps != null && minReps > maxReps) {
        return { reps: 'Min repetions cannot be greater than max repetitions' };
    }
    return null;
}
function checkValueLimitsValidity(c) {
    var minValue = c.value.minValue;
    var maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return { valueLimit: 'Min value cannot be greater than max value' };
    }
    return null;
}
function checkDigitsValidity(c) {
    var minDigits = c.value.minDigits;
    var maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return { digits: 'Min digits cannot be greater than max digits' };
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
            { label: 'Normal', value: 'normal' }, { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' }, { label: 'Tiny', value: 'tiny' },
            { label: 'Mini', value: 'mini' }
        ];
        this._choicesOrigins = [];
        this._conditionalBranches = [];
        this._validationConditions = [];
        this._warningConditions = [];
        this.isRepeatingContainerNode = function (nodeEntry) {
            return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
        };
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
            _service.choicesOrigins.subscribe(function (c) { return _this._choicesOrigins = c || []; });
        this._enabled = this._nodeEntry.pipe(map(function (n) { return n != null; }));
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
        get: function () {
            return this._fieldSizes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "nodeEntry", {
        get: function () {
            return this._nodeEntry;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "choicesOrigins", {
        get: function () {
            return this._choicesOrigins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "propertiesForm", {
        get: function () {
            return this._propertiesForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "hasChoices", {
        get: function () {
            return this._hasChoices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curVisibility", {
        get: function () {
            return this._curVisibility;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curFormulaReps", {
        get: function () {
            return this._curFormulaReps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curChoicesFilter", {
        get: function () {
            return this._curChoicesFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curForceValue", {
        get: function () {
            return this._curForceValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curFormula", {
        get: function () {
            return this._curFormula;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "conditionalBranches", {
        get: function () {
            return this._conditionalBranches;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "validationConditions", {
        get: function () {
            return this._validationConditions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "warningConditions", {
        get: function () {
            return this._warningConditions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "nextSlideCondition", {
        get: function () {
            return this._nextSlideCondition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "triggerConditions", {
        get: function () {
            return this._triggerConditions;
        },
        enumerable: true,
        configurable: true
    });
    AjfFbNodeProperties.prototype.editVisibility = function () {
        this._editVisibilityEvt.emit();
    };
    AjfFbNodeProperties.prototype.editConditionalBranch = function (idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.editFormulaReps = function () {
        this._editFormulaRepsEvt.emit();
    };
    AjfFbNodeProperties.prototype.editChoicesFilter = function () {
        this._editChoicesFilterEvt.emit();
    };
    AjfFbNodeProperties.prototype.editFormula = function () {
        this._editFormulaEvt.emit();
    };
    AjfFbNodeProperties.prototype.editForceValue = function () {
        this._editForceValueEvt.emit();
    };
    AjfFbNodeProperties.prototype.editValidationCondition = function (idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.addValidationCondition = function () {
        this._addValidationConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.removeValidationCondition = function (idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.editWarningCondition = function (idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.addWarningCondition = function () {
        this._addWarningConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.removeWarningCondition = function (idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.editNextSlideCondition = function () {
        this._editNextSlideConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.editTriggerCondition = function (idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.addTriggerCondition = function () {
        this._addTriggerConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.removeTriggerCondition = function (idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.isField = function (nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
    };
    AjfFbNodeProperties.prototype.isNumericField = function (node) {
        return isField(node) && isNumberField(node);
    };
    AjfFbNodeProperties.prototype.isFieldWithChoices = function (node) {
        return isField(node) && isFieldWithChoices(node);
    };
    AjfFbNodeProperties.prototype.save = function () {
        this._saveEvt.emit();
    };
    AjfFbNodeProperties.prototype.cancel = function () {
        this._service.cancelNodeEntryEdit();
    };
    AjfFbNodeProperties.prototype.ngOnDestroy = function () {
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
    AjfFbNodeProperties.prototype._initSave = function () {
        var _this = this;
        this._saveSub = this._saveEvt.pipe(withLatestFrom(this.propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            var val = __assign(__assign({}, fg.value), { conditionalBranches: _this._conditionalBranches });
            _this._service.saveNodeEntry(val);
        });
    };
    AjfFbNodeProperties.prototype._initForm = function () {
        var _this = this;
        this._propertiesForm = this._nodeEntry.pipe(filter(function (n) { return n != null; }), map(function (n) {
            if (_this._visibilitySub != null) {
                _this._visibilitySub.unsubscribe();
            }
            if (_this._conditionalBranchesSub != null) {
                _this._conditionalBranchesSub.unsubscribe();
            }
            n = n;
            var visibility = n.node.visibility != null ? n.node.visibility.condition : null;
            var visibilityOpt = n.node.visibility != null ? _this._guessVisibilityOpt(n.node.visibility) : null;
            var controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            var validators = [];
            if (isRepeatingContainerNode(n.node)) {
                var rn = n.node;
                var formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                _this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (_this.isField(n)) {
                var field = n.node;
                var forceValue = null;
                var notEmpty = false;
                var validationConditions = [];
                if (field.validation != null) {
                    if (field.validation.forceValue != null) {
                        forceValue = field.validation.forceValue.condition;
                    }
                    notEmpty = field.validation.notEmpty != null;
                    validationConditions = (field.validation.conditions || []).map(function (c) {
                        return { condition: c.condition, errorMessage: c.errorMessage };
                    });
                }
                var notEmptyW = false;
                var warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || []).map(function (w) {
                        return { condition: w.condition, warningMessage: w.warningMessage };
                    });
                }
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
                var numField = n.node;
                var minValue = void 0;
                var maxValue = void 0;
                var minDigits = void 0;
                var maxDigits = void 0;
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
            if (_this.isFieldWithChoices(n.node)) {
                var fieldWithChoices = n.node;
                var triggerConditions = (fieldWithChoices.triggerConditions || []).map(function (c) { return c.condition; });
                controls.choicesOriginRef = fieldWithChoices.choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula :
                    null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                _this._triggerConditions = triggerConditions;
            }
            var fg = _this._fb.group(controls);
            fg.setValidators(validators);
            _this._conditionalBranches = n.node.conditionalBranches.map(function (c) { return c.condition; });
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
        }), publishReplay(1), refCount());
    };
    AjfFbNodeProperties.prototype._destroyConditionDialog = function () {
        if (this._editConditionDialogSub != null) {
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editConditionDialog != null) {
            this._editConditionDialog.close();
            this._editConditionDialog = null;
        }
    };
    AjfFbNodeProperties.prototype._destroyValidationConditionDialog = function () {
        if (this._editValidationConditionDialogSub != null) {
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editValidationConditionDialog != null) {
            this._editValidationConditionDialog.close();
            this._editValidationConditionDialog = null;
        }
    };
    AjfFbNodeProperties.prototype._destroyWarningConditionDialog = function () {
        if (this._editWarningConditionDialogSub != null) {
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editWarningConditionDialog != null) {
            this._editWarningConditionDialog.close();
            this._editWarningConditionDialog = null;
        }
    };
    AjfFbNodeProperties.prototype._initRemoveTriggerCondition = function () {
        this._removeTriggerConditionSub = this._removeTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var vcIdx = r[0];
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['triggerConditions'];
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initAddTriggerCondition = function () {
        this._addTriggerConditionSub = this._addTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['triggerConditions'];
            var vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initTriggerConditionEdit = function () {
        var _this = this;
        this._editTriggerConditionSub =
            this._editTriggerConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var vcIdx = r[0];
                var fg = r[1];
                if (vcIdx < 0 || vcIdx >= _this._triggerConditions.length || fg == null) {
                    return;
                }
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                var cmp = _this._editConditionDialog.componentInstance;
                cmp.condition = _this._triggerConditions[vcIdx];
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            _this._triggerConditions[vcIdx] = cond;
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initRemoveWarningCondition = function () {
        this._removeWarningConditionSub = this._removeWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var vcIdx = r[0];
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['warningConditions'];
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initAddWarningCondition = function () {
        this._addWarningConditionSub = this._addWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['warningConditions'];
            var vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initWarningConditionEdit = function () {
        var _this = this;
        this._editWarningConditionSub =
            this._editWarningConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyWarningConditionDialog();
                var vcIdx = r[0];
                var fg = r[1];
                if (vcIdx < 0 || vcIdx >= _this._warningConditions.length || fg == null) {
                    return;
                }
                _this._editWarningConditionDialog =
                    _this._dialog.open(AjfFbWarningConditionEditorDialog);
                var cmp = _this._editWarningConditionDialog.componentInstance;
                var w = _this._warningConditions[vcIdx];
                cmp.condition = w.condition;
                cmp.warningMessage = w.warningMessage;
                _this._editWarningConditionDialogSub =
                    _this._editWarningConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            _this._warningConditions[vcIdx] = cond;
                        }
                        _this._editWarningConditionDialogSub.unsubscribe();
                        _this._editWarningConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initRemoveValidationCondition = function () {
        this._removeValidationConditionSub = this._removeValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var vcIdx = r[0];
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['validationConditions'];
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initAddValidationCondition = function () {
        this._addValidationConditionSub = this._addValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['validationConditions'];
            var vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initValidationConditionEdit = function () {
        var _this = this;
        this._editValidationConditionSub =
            this._editValidationConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyValidationConditionDialog();
                var vcIdx = r[0];
                var fg = r[1];
                if (vcIdx < 0 || vcIdx >= _this._validationConditions.length || fg == null) {
                    return;
                }
                _this._editValidationConditionDialog =
                    _this._dialog.open(AjfFbValidationConditionEditorDialog);
                var cmp = _this._editValidationConditionDialog.componentInstance;
                var v = _this._validationConditions[vcIdx];
                cmp.condition = v.condition;
                cmp.errorMessage = v.errorMessage;
                _this._editValidationConditionDialogSub =
                    _this._editValidationConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            _this._validationConditions[vcIdx] = cond;
                        }
                        _this._editValidationConditionDialogSub.unsubscribe();
                        _this._editValidationConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initForceValueEdit = function () {
        var _this = this;
        this._editForceValueSub =
            this._editForceValueEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var fg = r[1];
                if (fg == null) {
                    return;
                }
                var ctrl = fg.controls['forceValue'];
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition = ctrl.value;
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initNextSlideConditionEdit = function () {
        var _this = this;
        this._editNextSlideConditionSub =
            this._editNextSlideConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var fg = r[1];
                if (fg == null) {
                    return;
                }
                var ctrl = fg.controls['nextSlideCondition'];
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition = ctrl.value;
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initFormulaEdit = function () {
        var _this = this;
        this._editFormulaSub =
            this._editFormulaEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var fg = r[1];
                if (fg == null) {
                    return;
                }
                var ctrl = fg.controls['formula'];
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition = ctrl.value;
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initFormulaRepsEdit = function () {
        var _this = this;
        this._editFormulaRepsSub =
            this._editFormulaRepsEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var fg = r[1];
                if (fg == null) {
                    return;
                }
                var ctrl = fg.controls['formulaReps'];
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition = ctrl.value;
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initChoicesFilterEdit = function () {
        var _this = this;
        this._editChoicesFilterSub =
            this._editChoicesFilterEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var fg = r[1];
                if (fg == null) {
                    return;
                }
                var ctrl = fg.controls['choicesFilter'];
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition = ctrl.value;
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initConditionalBranchEdit = function () {
        var _this = this;
        this._editConditionalBranchSub =
            this._editConditionalBranchEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var cbIdx = r[0];
                var fg = r[1];
                if (cbIdx < 0 || cbIdx >= _this._conditionalBranches.length || fg == null) {
                    return;
                }
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition =
                    _this._conditionalBranches[cbIdx];
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            _this._conditionalBranches[cbIdx] = cond;
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._initVisibilityEdit = function () {
        var _this = this;
        this._editVisibilitySub =
            this._editVisibilityEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(function (r) {
                _this._destroyConditionDialog();
                var fg = r[1];
                if (fg == null) {
                    return;
                }
                var ctrl = fg.controls['visibility'];
                var condition = ctrl.value;
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
                _this._editConditionDialog.componentInstance.condition = condition;
                _this._editConditionDialogSub =
                    _this._editConditionDialog.afterClosed().subscribe(function (cond) {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        _this._editConditionDialogSub.unsubscribe();
                        _this._editConditionDialogSub = Subscription.EMPTY;
                    });
            });
    };
    AjfFbNodeProperties.prototype._handleTriggerCondtionsChange = function (fg) {
        var _this = this;
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return JSON.stringify(v1.triggerConditions) ===
            JSON.stringify(v2.triggerConditions); }))
            .subscribe(function (v) {
            _this._triggerConditions = v.triggerConditions;
        });
    };
    AjfFbNodeProperties.prototype._handleWarningCondtionsChange = function (fg) {
        var _this = this;
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return JSON.stringify(v1.warningConditions) ===
            JSON.stringify(v2.warningConditions); }))
            .subscribe(function (v) {
            _this._warningConditions = v.warningConditions;
        });
    };
    AjfFbNodeProperties.prototype._handleValidationCondtionsChange = function (fg) {
        var _this = this;
        this._validationConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return JSON.stringify(v1.validationConditions) ===
            JSON.stringify(v2.validationConditions); }))
            .subscribe(function (v) {
            _this._validationConditions = v.validationConditions;
        });
    };
    AjfFbNodeProperties.prototype._handleForceValueChange = function (fg) {
        var _this = this;
        this._forceValueSub =
            fg.valueChanges.pipe(distinctUntilChanged(function (v1, v2) { return v1.forceValue === v2.forceValue; }))
                .subscribe(function (v) {
                _this._curForceValue = v.forceValue;
            });
    };
    AjfFbNodeProperties.prototype._handleNextSlideConditionChange = function (fg) {
        var _this = this;
        this._formulaSub =
            fg.valueChanges
                .pipe(distinctUntilChanged(function (v1, v2) { return v1.nextSlideCondition === v2.nextSlideCondition; }))
                .subscribe(function (v) {
                _this._nextSlideCondition = v.nextSlideCondition;
            });
    };
    AjfFbNodeProperties.prototype._handleFormulaChange = function (fg) {
        var _this = this;
        this._formulaSub =
            fg.valueChanges.pipe(distinctUntilChanged(function (v1, v2) { return v1.formula === v2.formula; }))
                .subscribe(function (v) {
                _this._curFormula = v.formula;
            });
    };
    AjfFbNodeProperties.prototype._handleFormulaRepsChange = function (fg) {
        var _this = this;
        this._formulaRepsSub =
            fg.valueChanges.pipe(distinctUntilChanged(function (v1, v2) { return v1.formulaReps === v2.formulaReps; }))
                .subscribe(function (v) {
                _this._curFormulaReps = v.formulaReps;
            });
    };
    AjfFbNodeProperties.prototype._handleChoicesFilterChange = function (fg) {
        var _this = this;
        this._choicesFilterSub =
            fg.valueChanges
                .pipe(distinctUntilChanged(function (v1, v2) { return v1.choicesFilter === v2.choicesFilter; }))
                .subscribe(function (v) {
                _this._curChoicesFilter = v.choicesFilter;
            });
    };
    AjfFbNodeProperties.prototype._handleConditionalBranchesChange = function (fg) {
        var _this = this;
        this._conditionalBranchesSub =
            fg.valueChanges
                .pipe(distinctUntilChanged(function (v1, v2) { return v1.conditionalBranchesNum === v2.conditionalBranchesNum; }))
                .subscribe(function (v) {
                var cbNum = v.conditionalBranchesNum;
                var curCbNum = _this._conditionalBranches.length;
                if (curCbNum < cbNum) {
                    var newCbs = [];
                    for (var i = curCbNum; i < cbNum; i++) {
                        newCbs.push(alwaysCondition().condition);
                    }
                    _this._conditionalBranches = _this._conditionalBranches.concat(newCbs);
                }
                else if (curCbNum > cbNum) {
                    _this._conditionalBranches.splice(0, curCbNum - cbNum);
                }
            });
    };
    AjfFbNodeProperties.prototype._handleVisibilityChange = function (fg) {
        var _this = this;
        this._visibilitySub =
            fg.valueChanges
                .pipe(distinctUntilChanged(function (v1, v2) { return v1.visibilityOpt === v2.visibilityOpt; }))
                .subscribe(function (v) {
                var visibilityOpt = v.visibilityOpt;
                var newCondition;
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
                _this._curVisibility = newCondition;
                fg.controls['visibility'].setValue(newCondition);
            });
    };
    AjfFbNodeProperties.prototype._guessVisibilityOpt = function (condition) {
        if (condition.condition.localeCompare(alwaysCondition().condition) === 0) {
            return 'always';
        }
        if (condition.condition.localeCompare(neverCondition().condition) === 0) {
            return 'never';
        }
        return 'condition';
    };
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
    AjfFbNodeProperties.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialog },
        { type: FormBuilder }
    ]; };
    return AjfFbNodeProperties;
}());

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
var AjfFbNodeTypeEntry = /** @class */ (function () {
    function AjfFbNodeTypeEntry(_cdr) {
        this._cdr = _cdr;
    }
    Object.defineProperty(AjfFbNodeTypeEntry.prototype, "nodeType", {
        get: function () {
            return this._nodeType;
        },
        set: function (nodeType) {
            this._nodeType = nodeType;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
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
    AjfFbNodeTypeEntry.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    AjfFbNodeTypeEntry.propDecorators = {
        nodeType: [{ type: Input }]
    };
    return AjfFbNodeTypeEntry;
}());

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
var AjfFormBuilderModule = /** @class */ (function () {
    function AjfFormBuilderModule() {
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
    return AjfFormBuilderModule;
}());

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

export { AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderService, flattenNodes, AjfFbBranchLine as ɵgc_ajf_src_material_form_builder_form_builder_a, AjfFbChoicesOriginEditor as ɵgc_ajf_src_material_form_builder_form_builder_b, AjfFbChoicesOriginEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_c, AjfFbConditionEditor as ɵgc_ajf_src_material_form_builder_form_builder_d, AjfFbConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_e, AjfFbNodeEntry as ɵgc_ajf_src_material_form_builder_form_builder_f, AjfFbNodeProperties as ɵgc_ajf_src_material_form_builder_form_builder_g, AjfFbNodeTypeEntry as ɵgc_ajf_src_material_form_builder_form_builder_h, AjfFbStringIdentifierDialogComponent as ɵgc_ajf_src_material_form_builder_form_builder_i, AjfFbValidationConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_j, AjfFbWarningConditionEditorDialog as ɵgc_ajf_src_material_form_builder_form_builder_k };
//# sourceMappingURL=form-builder.js.map