/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createField, createForm, createContainerNode, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, publishReplay, refCount, scan, withLatestFrom } from 'rxjs/operators';
/**
 * @record
 */
export function AjfFormBuilderNodeTypeEntry() { }
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
export function AjfFormBuilderNodeEntry() { }
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
export function AjfFormBuilderEmptySlot() { }
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
export function flattenNodes(nodes) {
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
export class AjfFormBuilderService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFDNkMsWUFBWSxFQUU5RCxXQUFXLEVBQTBELHdCQUF3QixFQUM3RixXQUFXLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUNyRixhQUFhLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFDakYsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFDOUYsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFDeEUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTTFGLGlEQVdDOzs7SUFWQyw0Q0FBYzs7SUFDZCwyQ0FHRTs7SUFDRiwrQ0FHRTs7SUFDRiw4Q0FBa0I7Ozs7O0FBSXBCLDZDQUtDOzs7SUFKQyx1Q0FBYzs7SUFDZCw0Q0FBbUM7O0lBQ25D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REFBcUY7Ozs7O0lBR3JGLDhDQUFxRjs7Ozs7SUFDckYsMkRBQ2tEOzs7OztJQUNsRCx1REFDOEM7Ozs7O0lBQzlDLHlEQUNvRDs7Ozs7SUFFcEQsb0RBQXlFOzs7OztJQUN6RSxzREFDOEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luLCBBamZDaG9pY2VzT3JpZ2luLCBBamZGaWVsZCwgQWpmRmllbGRUeXBlLFxuICBBamZGaWVsZFdpdGhDaG9pY2VzLCBBamZGb3JtLCBBamZGb3JtU3RyaW5nSWRlbnRpZmllciwgQWpmTm9kZSwgQWpmTm9kZUdyb3VwLCBBamZOb2Rlc09wZXJhdGlvbixcbiAgQWpmTm9kZVR5cGUsIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsIEFqZlJlcGVhdGluZ1NsaWRlLCBBamZTbGlkZSwgY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBjcmVhdGVGaWVsZCwgY3JlYXRlRm9ybSwgY3JlYXRlQ29udGFpbmVyTm9kZSwgY3JlYXRlVmFsaWRhdGlvbiwgY3JlYXRlVmFsaWRhdGlvbkdyb3VwLFxuICBjcmVhdGVXYXJuaW5nLCBjcmVhdGVXYXJuaW5nR3JvdXAsIGlzQ2hvaWNlc0ZpeGVkT3JpZ2luLCBpc0NvbnRhaW5lck5vZGUsIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcywgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlLCBpc1NsaWRlc05vZGUsIG1heERpZ2l0c1ZhbGlkYXRpb24sIG1heFZhbGlkYXRpb24sXG4gIG1pbkRpZ2l0c1ZhbGlkYXRpb24sIG1pblZhbGlkYXRpb24sIG5vdEVtcHR5VmFsaWRhdGlvbiwgbm90RW1wdHlXYXJuaW5nXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBjcmVhdGVDb25kaXRpb24sIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50LCBzY2FuLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbiwgQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9ufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbjoge1xuICAgIGZvbnRTZXQ6IHN0cmluZztcbiAgICBmb250SWNvbjogc3RyaW5nO1xuICB9O1xuICBub2RlVHlwZToge1xuICAgIG5vZGU6IEFqZk5vZGVUeXBlO1xuICAgIGZpZWxkPzogQWpmRmllbGRUeXBlLFxuICB9O1xuICBpc1NsaWRlPzogYm9vbGVhbjtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgbm9kZTogQWpmTm9kZTtcbiAgY29udGFpbmVyOiBBamZDb250YWluZXJOb2RlIHwgbnVsbDtcbiAgY2hpbGRyZW46IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG4gIGNvbnRlbnQ6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCB7XG4gIHBhcmVudDogQWpmTm9kZTtcbiAgcGFyZW50Tm9kZTogbnVtYmVyO1xufVxuXG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1CdWlsZGVyTm9kZSA9IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGUgfCBBamZSZXBlYXRpbmdTbGlkZSB8IEFqZk5vZGVHcm91cDtcblxuZnVuY3Rpb24gZ2V0Tm9kZUNvbnRhaW5lcihjOiB7bm9kZXM6IEFqZk5vZGVbXX0sIG5vZGU6IEFqZk5vZGUpOiB7bm9kZXM6IEFqZk5vZGVbXX0gfCBudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xKSB7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgY29uc3QgY25zID0gYy5ub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGUobikpO1xuICBjb25zdCBsZW4gPSBjbnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMCA7IGkgPCBsZW4gOyBpKyspIHtcbiAgICBjb25zdCBjbiA9IGdldE5vZGVDb250YWluZXIoPEFqZkNvbnRhaW5lck5vZGU+Y25zW2ldLCBub2RlKTtcbiAgICBpZiAoY24gIT0gbnVsbCkgeyByZXR1cm4gY247IH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShcbiAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBBamZOb2RlLCBpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzID0gZmFsc2Vcbik6IEFqZkZvcm1CdWlsZGVyTm9kZVtdIHtcbiAgY29uc3QgZW50cmllczogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBub2Rlc1xuICAgIC5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50LmlkKVxuICAgIC5zb3J0KChuMSwgbjIpID0+IG4xLnBhcmVudE5vZGUgLSBuMi5wYXJlbnROb2RlKVxuICAgIC5tYXAobiA9PiB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIG4pO1xuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKHtwYXJlbnQ6IG4sIHBhcmVudE5vZGU6IDB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiBuLFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2RlcywgbilcbiAgICAgIH07XG4gICAgfSk7XG4gIGlmICghaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcykge1xuICAgIGNvbnN0IGVudHJpZXNOdW0gPSBlbnRyaWVzLmxlbmd0aDtcbiAgICBjb25zdCBjYnMgPSBwYXJlbnQuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGVudHJpZXNOdW0gOyBpIDwgY2JzIDsgaSsrKSB7XG4gICAgICBlbnRyaWVzLnB1c2goe1xuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgcGFyZW50Tm9kZTogaVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnRyaWVzO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KF9ub2RlczogQWpmTm9kZVtdLCBub2RlOiBBamZOb2RlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzLCBub2RlLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlczogQWpmTm9kZVtdKTogKEFqZkZvcm1CdWlsZGVyTm9kZSB8IG51bGwpW10ge1xuICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PSBudWxsIHx8IG4ucGFyZW50ID09PSAwKTtcbiAgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3ROb2Rlc1swXTtcbiAgICBpZiAoaXNTbGlkZXNOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgY29uc3QgdHJlZTogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBbXTtcbiAgICAgIHRyZWUucHVzaCg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiByb290Tm9kZSxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCByb290Tm9kZSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW251bGxdO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmb3JtIGRlZmluaXRpb24nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZVtdID0gW107XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2RlcykpO1xuICAgIH1cbiAgICBmbGF0Tm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoXG4gIGZsYXROb2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsXG4pOiBBamZOb2RlW10ge1xuICByZXR1cm4gYnJhbmNoICE9IG51bGwgP1xuICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCAmJiBuLnBhcmVudE5vZGUgPT09IGJyYW5jaCkgOlxuICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGVzKG5vZGVzOiBBamZOb2RlW10sIGlkczogbnVtYmVyW10pOiBBamZOb2RlW10ge1xuICBjb25zdCBsZW4gPSBub2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGxlbiA7IGkrKykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSAoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSk7XG4gICAgICBjb250YWluZXIubm9kZXMgPSByZW1vdmVOb2Rlcyhjb250YWluZXIubm9kZXMsIGlkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2Rlcy5maWx0ZXIobiA9PiBpZHMuaW5kZXhPZihuLmlkKSA9PT0gLTEpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlU3VidHJlZShcbiAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50Tm9kZTogQWpmTm9kZSwgYnJhbmNoOiBudW1iZXIgfCBudWxsID0gbnVsbFxuKTogQWpmTm9kZVtdIHtcbiAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzKG5vZGVzKTtcbiAgbGV0IGRlbE5vZGVzOiBBamZOb2RlW10gPSBbXTtcbiAgbGV0IGRlc2NlbmRhbnRzID0gZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBwYXJlbnROb2RlLCBicmFuY2gpO1xuICBjb25zdCBsZW4gPSBkZXNjZW5kYW50cy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGxlbiA7IGkrKykge1xuICAgIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgZGVzY2VuZGFudHNbaV0pKTtcbiAgfVxuICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChkZXNjZW5kYW50cyk7XG4gIHJldHVybiByZW1vdmVOb2Rlcyhub2RlcywgZGVsTm9kZXMubWFwKG4gPT4gbi5pZCkpO1xufVxuXG5sZXQgbm9kZVVuaXF1ZUlkID0gMDtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYXZhaWxhYmxlTm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ1NsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXNsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlNsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmVwZWF0aW5nIHNsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJlcGVhdGluZ3NsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU3RyaW5nJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXN0cmluZyd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TdHJpbmd9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RleHQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGV4dCd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UZXh0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdOdW1iZXInLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbnVtYmVyJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk51bWJlcn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnQm9vbGVhbicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1ib29sZWFuJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkJvb2xlYW59XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1NpbmdsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2luZ2xlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW11bHRpcGxlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdGb3JtdWxhJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWZvcm11bGEnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRm9ybXVsYX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUgaW5wdXQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZWlucHV0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGVJbnB1dH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGltZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10aW1lJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRpbWV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RhYmxlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRhYmxlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRhYmxlfVxuICAgIH1cbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHsgcmV0dXJuIHRoaXMuX2F2YWlsYWJsZU5vZGVUeXBlczsgfVxuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZm9ybU9iczogT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD4gPSB0aGlzLl9mb3JtLmFzT2JzZXJ2YWJsZSgpO1xuICAvKipcbiAgICogQ3VycmVudCBlZGl0ZWQgZm9ybSBzdHJlYW1cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+IHsgcmV0dXJuIHRoaXMuX2Zvcm1PYnM7IH1cblxuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnM6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGF0dGFjaG1lbnRzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2htZW50c09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT47XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllcjogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPjtcbiAgZ2V0IHN0cmluZ0lkZW50aWZpZXIoKTogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ0lkZW50aWZpZXI7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+O1xuICBnZXQgbm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHsgcmV0dXJuIHRoaXMuX25vZGVzOyB9XG5cbiAgcHJpdmF0ZSBfZmxhdE5vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBmbGF0Tm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdE5vZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhdEZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZsYXRGaWVsZHMoKTogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPiB7IHJldHVybiB0aGlzLl9mbGF0RmllbGRzOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4geyByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlOyB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5OiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5LmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkTm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVFbnRyeU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbiB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbiB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb25PYnM6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPVxuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGVkaXRlZENvbmRpdGlvbigpOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+IHsgcmV0dXJuIHRoaXMuX2VkaXRlZENvbmRpdGlvbk9iczsgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW46IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW5PYnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4uYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWRDaG9pY2VzT3JpZ2luKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBiZWZvcmVOb2Rlc1VwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHsgcmV0dXJuIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlT2JzOyB9XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hZnRlck5vZGVVcGRhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBhZnRlck5vZGVVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7IHJldHVybiB0aGlzLl9hZnRlck5vZGVVcGRhdGVPYnM7IH1cblxuICBwcml2YXRlIF9ub2Rlc1VwZGF0ZXM6IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzOiBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9zYXZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHByaXZhdGUgX2RlbGV0ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U2F2ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0RGVsZXRlTm9kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgZWRpdGVkIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChmb3JtICE9PSB0aGlzLl9mb3JtLmdldFZhbHVlKCkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dChmb3JtKTtcbiAgICB9XG4gIH1cblxuICBlZGl0Tm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbihjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KGNvbmRpdGlvbik7XG4gIH1cblxuICBzYXZlQ3VycmVudENvbmRpdGlvbihjb25kaXRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjID0gdGhpcy5fZWRpdGVkQ29uZGl0aW9uLmdldFZhbHVlKCk7XG4gICAgaWYgKGMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChudWxsKTtcbiAgfVxuXG4gIGNhbmNlbENvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgaW5zZXJ0Tm9kZShcbiAgICBub2RlVHlwZTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICAgIHBhcmVudDogQWpmTm9kZSxcbiAgICBwYXJlbnROb2RlOiBudW1iZXIsXG4gICAgaW5Db250ZW50ID0gZmFsc2VcbiAgKTogdm9pZCB7XG4gICAgbGV0IG5vZGU6IEFqZk5vZGV8QWpmRmllbGQ7XG4gICAgY29uc3QgaWQgPSArK25vZGVVbmlxdWVJZDtcbiAgICBjb25zdCBpc0ZpZWxkTm9kZSA9IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkICE9IG51bGw7XG4gICAgaWYgKGlzRmllbGROb2RlKSB7XG4gICAgICBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLFxuICAgICAgICBmaWVsZFR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkISxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQuaWQsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVDb250YWluZXJOb2RlKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5ub2RlLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCAhPSBudWxsID8gcGFyZW50LmlkIDogMCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIG5vZGVzOiBbXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgaWYgKG5vZGUucGFyZW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbbm9kZV07XG4gICAgICB9XG4gICAgICBjb25zdCBjbiA9IGlzQ29udGFpbmVyTm9kZShwYXJlbnQpICYmIGluQ29udGVudCA/XG4gICAgICAgICg8QWpmQ29udGFpbmVyTm9kZT5wYXJlbnQpIDpcbiAgICAgICAgZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBwYXJlbnQpO1xuICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgaWYgKCFpc0ZpZWxkTm9kZSkge1xuICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgIG5ld05vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbi5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlTm9kZUVudHJ5KHByb3BlcnRpZXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudC5lbWl0KHByb3BlcnRpZXMpO1xuICB9XG5cbiAgY2FuY2VsTm9kZUVudHJ5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcbiAgfVxuXG4gIGRlbGV0ZU5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgZ2V0Q3VycmVudEZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICBbdGhpcy5mb3JtLCB0aGlzLm5vZGVzLCB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucywgdGhpcy5jaG9pY2VzT3JpZ2lucywgdGhpcy5zdHJpbmdJZGVudGlmaWVyXVxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcigoW2Zvcm1dKSA9PiBmb3JtICE9IG51bGwpLFxuICAgICAgbWFwKChbZm9ybSwgbm9kZXMsIGF0dGFjaG1lbnRzT3JpZ2lucywgY2hvaWNlc09yaWdpbnMsIHN0cmluZ0lkZW50aWZpZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2luczogY2hvaWNlc09yaWdpbnMuc2xpY2UoMCksXG4gICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zOiBhdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMCksXG4gICAgICAgICAgc3RyaW5nSWRlbnRpZmllcjogKHN0cmluZ0lkZW50aWZpZXIgfHwgW10pLnNsaWNlKDApLFxuICAgICAgICAgIG5vZGVzOiBub2Rlcy5zbGljZSgwKSBhcyBBamZTbGlkZVtdLFxuICAgICAgICAgIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM6IGZvcm0hLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgY3JlYXRlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luPGFueT4oe25hbWU6ICcnfSkpO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZUNob2ljZXNPcmlnaW4ocGFyYW1zOiB7bGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjaG9pY2VzOiBhbnlbXX0pOiB2b2lkIHtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2luID0gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgIGNob2ljZXNPcmlnaW4ubGFiZWwgPSBwYXJhbXMubGFiZWw7XG4gICAgICBjaG9pY2VzT3JpZ2luLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICAgIGlmIChpc0Nob2ljZXNGaXhlZE9yaWdpbihjaG9pY2VzT3JpZ2luKSkge1xuICAgICAgICBjaG9pY2VzT3JpZ2luLmNob2ljZXMgPSBwYXJhbXMuY2hvaWNlcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KChjaG9pY2VzT3JpZ2lucykgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBjaG9pY2VzT3JpZ2lucy5pbmRleE9mKGNob2ljZXNPcmlnaW4pO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFtcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKDAsIGlkeCksXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2luLFxuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoaWR4ICsgMSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFsuLi5jaG9pY2VzT3JpZ2lucywgY2hvaWNlc09yaWdpbl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXNPcmlnaW5zO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKGlkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KCgpID0+IFsuLi5pZGVudGlmaWVyXSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5kTWF4Tm9kZUlkKG5vZGVzOiBBamZOb2RlW10sIF9jdXJNYXhJZCA9IDApOiBudW1iZXIge1xuICAgIGxldCBtYXhJZCA9IDA7XG4gICAgbm9kZXMuZm9yRWFjaCgobikgPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgbi5pZCk7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKG4pKSB7XG4gICAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHRoaXMuX2ZpbmRNYXhOb2RlSWQoKDxBamZDb250YWluZXJOb2RlPm4pLm5vZGVzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1heElkO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1cbiAgICAgIC5zdWJzY3JpYmUoKGZvcm06IEFqZkZvcm0gfCBudWxsKSA9PiB7XG4gICAgICAgIG5vZGVVbmlxdWVJZCA9IDA7XG4gICAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIG5vZGVVbmlxdWVJZCA9IHRoaXMuX2ZpbmRNYXhOb2RlSWQoZm9ybS5ub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsID8gZm9ybS5ub2Rlcy5zbGljZSgwKSA6IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAgICAgKF9hdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSk6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5hdHRhY2htZW50c09yaWdpbnMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucy5zbGljZSgwKSA6XG4gICAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAgIChfY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoXG4gICAgICAgICAgICAoXzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uc3RyaW5nSWRlbnRpZmllciAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBmb3JtLnN0cmluZ0lkZW50aWZpZXIuc2xpY2UoMClcbiAgICAgICAgICAgICAgICA6IFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+PnRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oKGNob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AoY2hvaWNlc09yaWdpbnMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnMgPSB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKFxuICAgICAgICAoYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sIG9wOiBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gb3AoYXR0YWNobWVudHNPcmlnaW5zKTtcbiAgICAgICAgfSwgW11cbiAgICAgICksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgc2NhbihcbiAgICAgICAgKHN0cmluZ0lkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sIG9wOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcChzdHJpbmdJZGVudGlmaWVyKTtcbiAgICAgICAgfSwgW11cbiAgICAgICksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9ICg8T2JzZXJ2YWJsZTxBamZOb2Rlc09wZXJhdGlvbj4+dGhpcy5fbm9kZXNVcGRhdGVzKVxuICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKG5vZGVzOiBBamZOb2RlW10sIG9wOiBBamZOb2Rlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gZmxhdHRlbk5vZGVzKG5vZGVzKSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKVxuICAgICk7XG5cbiAgICB0aGlzLl9mbGF0RmllbGRzID0gdGhpcy5fZmxhdE5vZGVzLnBpcGUoXG4gICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IDxBamZGaWVsZFtdPm5vZGVzLmZpbHRlcihuID0+ICFpc0NvbnRhaW5lck5vZGUobikpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAobm9kZXMgPT4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+YnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlcykpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmVOb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudFxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuZWRpdGVkTm9kZUVudHJ5LCB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAgICAgICBmaWx0ZXIoKFtfLCBub2RlRW50cnldKSA9PiBub2RlRW50cnkgIT0gbnVsbCksXG4gICAgICAgICAgICBtYXAoKFtwcm9wZXJ0aWVzLCBub2RlRW50cnldKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICAgICAgbm9kZUVudHJ5ID0gbm9kZUVudHJ5ITtcbiAgICAgICAgICAgICAgY29uc3Qgb3JpZ05vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGRlZXBDb3B5KG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgbm9kZS5pZCA9IG5vZGVFbnRyeS5ub2RlLmlkO1xuICAgICAgICAgICAgICBub2RlLm5hbWUgPSBwcm9wZXJ0aWVzLm5hbWU7XG4gICAgICAgICAgICAgIG5vZGUubGFiZWwgPSBwcm9wZXJ0aWVzLmxhYmVsO1xuICAgICAgICAgICAgICBub2RlLnZpc2liaWxpdHkgPSBwcm9wZXJ0aWVzLnZpc2liaWxpdHkgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogcHJvcGVydGllcy52aXNpYmlsaXR5fSkgOlxuICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgICAgICAgICAgICBjb25zdCBvbGRDb25kaXRpb25hbEJyYW5jaGVzID0gbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzID0gcHJvcGVydGllcy5jb25kaXRpb25hbEJyYW5jaGVzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAoY29uZGl0aW9uOiBzdHJpbmcpID0+IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9ufSkpIDpcbiAgICAgICAgICAgICAgICAgIFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBOb2RlID0gPEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGU+bm9kZTtcbiAgICAgICAgICAgICAgICByZXBOb2RlLmZvcm11bGFSZXBzID0gcHJvcGVydGllcy5mb3JtdWxhUmVwcyAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhUmVwc30pIDpcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWluUmVwcyA9IHByb3BlcnRpZXMubWluUmVwcztcbiAgICAgICAgICAgICAgICByZXBOb2RlLm1heFJlcHMgPSBwcm9wZXJ0aWVzLm1heFJlcHM7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaXNGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gbm9kZSBhcyBBamZGaWVsZDtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgZmllbGQuZGVmYXVsdFZhbHVlID0gcHJvcGVydGllcy5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgICAgZmllbGQuZm9ybXVsYSA9IHByb3BlcnRpZXMuZm9ybXVsYSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yY2VWYWx1ZSA9IHByb3BlcnRpZXMudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90RW1wdHkgPSBwcm9wZXJ0aWVzLm5vdEVtcHR5O1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25Db25kaXRpb25zID0gcHJvcGVydGllcy52YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBsZXQgbWluVmFsdWU6IG51bWJlcnxudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5WYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgIGxldCBtYXhWYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heFZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1pbkRpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pbkRpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGxldCBtYXhEaWdpdHM6IG51bWJlcnxudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5tYXhEaWdpdHMsIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBtaW5WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtYXhWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1heFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1pbkRpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1pbkRpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtYXhEaWdpdHMpKSB7XG4gICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VWYWx1ZSAhPSBudWxsIHx8IG5vdEVtcHR5ICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zICE9IG51bGwgJiYgdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoID4gMCkgfHxcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWUgIT0gbnVsbCB8fCBtYXhWYWx1ZSAhPSBudWxsIHx8IG1pbkRpZ2l0cyAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gZmllbGQudmFsaWRhdGlvbiB8fCBjcmVhdGVWYWxpZGF0aW9uR3JvdXAoe30pO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubm90RW1wdHkgPSBub3RFbXB0eSA/IG5vdEVtcHR5VmFsaWRhdGlvbigpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5taW5WYWx1ZSA9IG1pblZhbHVlICE9IG51bGwgPyBtaW5WYWxpZGF0aW9uKG1pblZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4VmFsdWUgPSBtYXhWYWx1ZSAhPSBudWxsID8gbWF4VmFsaWRhdGlvbihtYXhWYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9XG4gICAgICAgICAgICAgICAgICAgICAgbWluRGlnaXRzICE9IG51bGwgPyBtaW5EaWdpdHNWYWxpZGF0aW9uKG1pbkRpZ2l0cykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heERpZ2l0cyA9XG4gICAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwgPyBtYXhEaWdpdHNWYWxpZGF0aW9uKG1heERpZ2l0cykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh2YWxpZGF0aW9uQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKChjOiB7Y29uZGl0aW9uOiBzdHJpbmcsIGVycm9yTWVzc2FnZTogc3RyaW5nfSkgPT4gY3JlYXRlVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IGMuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eVdhcm4gPSBwcm9wZXJ0aWVzLm5vdEVtcHR5V2FybmluZztcbiAgICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKG5vdEVtcHR5V2FybiAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyAhPSBudWxsICYmIHdhcm5pbmdDb25kaXRpb25zLmxlbmd0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nID0gZmllbGQud2FybmluZyB8fCBjcmVhdGVXYXJuaW5nR3JvdXAoe30pO1xuICAgICAgICAgICAgICAgICAgd2FybmluZy5ub3RFbXB0eSA9IG5vdEVtcHR5V2FybiA/IG5vdEVtcHR5V2FybmluZygpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgd2FybmluZy5jb25kaXRpb25zID1cbiAgICAgICAgICAgICAgICAgICAgICAod2FybmluZ0NvbmRpdGlvbnMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgW10pLm1hcCgodzoge2NvbmRpdGlvbjogc3RyaW5nLCB3YXJuaW5nTWVzc2FnZTogc3RyaW5nfSkgPT4gY3JlYXRlV2FybmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IHcuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U6IHcud2FybmluZ01lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gd2FybmluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmllbGQud2FybmluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmllbGQubmV4dFNsaWRlQ29uZGl0aW9uID0gcHJvcGVydGllcy5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbn0pIDpcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGZpZWxkLnNpemUgPSBwcm9wZXJ0aWVzLnNpemU7XG4gICAgICAgICAgICAgICAgZmllbGQuZGVmYXVsdFZhbHVlID0gcHJvcGVydGllcy5kZWZhdWx0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZpZWxkKSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZndjID0gPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj5maWVsZDtcbiAgICAgICAgICAgICAgICAgIChmd2MgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmID0gcHJvcGVydGllcy5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgICAgICAgZndjLmZvcmNlRXhwYW5kZWQgPSBwcm9wZXJ0aWVzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VOYXJyb3cgPSBwcm9wZXJ0aWVzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgICAgICAgZndjLnRyaWdnZXJDb25kaXRpb25zID0gKHByb3BlcnRpZXMudHJpZ2dlckNvbmRpdGlvbnMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh0OiBzdHJpbmcpID0+IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiB0fSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuXG4gICAgICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEB0cmlrIGNoZWNrIHRoaXMsIHdhcyBhbHdheXMgdHJ1ZT9cbiAgICAgICAgICAgICAgICAgIC8vIGlmIChjbiBpbnN0YW5jZW9mIEFqZk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNuLm5vZGVzLmluZGV4T2Yob3JpZ05vZGUpO1xuICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IGlkeCA9IG5vZGVzLmluZGV4T2Yob3JpZ05vZGUpO1xuICAgICAgICAgICAgICAgICAgLy8gICBub2RlcyA9IG5vZGVzLnNsaWNlKDAsIGlkeCkuY29uY2F0KFtub2RlXSkuY29uY2F0KG5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgIGlmIChuZXdDb25kaXRpb25hbEJyYW5jaGVzIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Q29uZGl0aW9uYWxCcmFuY2hlczsgaSA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgIG5vZGVzID0gZGVsZXRlTm9kZVN1YnRyZWUobm9kZXMsIG5vZGUsIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RGVsZXRlTm9kZSgpOiB2b2lkIHtcbiAgICAoPE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+PnRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50KS5waXBlKFxuICAgICAgbWFwKChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KSA9PiB7XG4gICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgIGxldCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGVzID0gZGVsZXRlTm9kZVN1YnRyZWUobm9kZXMsIG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICkuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cbn1cbiJdfQ==