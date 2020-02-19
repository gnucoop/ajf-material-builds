/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFDNkMsWUFBWSxFQUU5RCxXQUFXLEVBQTBELHdCQUF3QixFQUM3RixXQUFXLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUNyRixhQUFhLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFDakYsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFDOUYsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFDeEUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTTFGLGlEQVdDOzs7SUFWQyw0Q0FBYzs7SUFDZCwyQ0FHRTs7SUFDRiwrQ0FHRTs7SUFDRiw4Q0FBa0I7Ozs7O0FBSXBCLDZDQUtDOzs7SUFKQyx1Q0FBYzs7SUFDZCw0Q0FBbUM7O0lBQ25D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REFBcUY7Ozs7O0lBR3JGLDhDQUFxRjs7Ozs7SUFDckYsMkRBQ2tEOzs7OztJQUNsRCx1REFDOEM7Ozs7O0lBQzlDLHlEQUNvRDs7Ozs7SUFFcEQsb0RBQXlFOzs7OztJQUN6RSxzREFDOEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sIEFqZkNob2ljZXNPcmlnaW4sIEFqZkZpZWxkLCBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsIEFqZkZvcm0sIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBBamZOb2RlLCBBamZOb2RlR3JvdXAsIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSwgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSwgQWpmUmVwZWF0aW5nU2xpZGUsIEFqZlNsaWRlLCBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUZpZWxkLCBjcmVhdGVGb3JtLCBjcmVhdGVDb250YWluZXJOb2RlLCBjcmVhdGVWYWxpZGF0aW9uLCBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsIGNyZWF0ZVdhcm5pbmdHcm91cCwgaXNDaG9pY2VzRml4ZWRPcmlnaW4sIGlzQ29udGFpbmVyTm9kZSwgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLCBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsIGlzU2xpZGVzTm9kZSwgbWF4RGlnaXRzVmFsaWRhdGlvbiwgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbiwgbWluVmFsaWRhdGlvbiwgbm90RW1wdHlWYWxpZGF0aW9uLCBub3RFbXB0eVdhcm5pbmdcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHNjYW4sIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uLCBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb259IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkge1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uOiB7XG4gICAgZm9udFNldDogc3RyaW5nO1xuICAgIGZvbnRJY29uOiBzdHJpbmc7XG4gIH07XG4gIG5vZGVUeXBlOiB7XG4gICAgbm9kZTogQWpmTm9kZVR5cGU7XG4gICAgZmllbGQ/OiBBamZGaWVsZFR5cGUsXG4gIH07XG4gIGlzU2xpZGU/OiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICBub2RlOiBBamZOb2RlO1xuICBjb250YWluZXI6IEFqZkNvbnRhaW5lck5vZGUgfCBudWxsO1xuICBjaGlsZHJlbjogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbiAgY29udGVudDogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90IHtcbiAgcGFyZW50OiBBamZOb2RlO1xuICBwYXJlbnROb2RlOiBudW1iZXI7XG59XG5cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBBamZGb3JtQnVpbGRlckVtcHR5U2xvdDtcbmV4cG9ydCB0eXBlIEFqZkNvbnRhaW5lck5vZGUgPSBBamZTbGlkZSB8IEFqZlJlcGVhdGluZ1NsaWRlIHwgQWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfSB8IG51bGwge1xuICBpZiAoYy5ub2Rlcy5pbmRleE9mKG5vZGUpID4gLTEpIHtcbiAgICByZXR1cm4gYztcbiAgfVxuICBjb25zdCBjbnMgPSBjLm5vZGVzLmZpbHRlcihuID0+IGlzQ29udGFpbmVyTm9kZShuKSk7XG4gIGNvbnN0IGxlbiA9IGNucy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGxlbiA7IGkrKykge1xuICAgIGNvbnN0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcig8QWpmQ29udGFpbmVyTm9kZT5jbnNbaV0sIG5vZGUpO1xuICAgIGlmIChjbiAhPSBudWxsKSB7IHJldHVybiBjbjsgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnQ6IEFqZk5vZGUsIGlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMgPSBmYWxzZVxuKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBjb25zdCBlbnRyaWVzOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IG5vZGVzXG4gICAgLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnQuaWQpXG4gICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgLm1hcChuID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgbik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goe3BhcmVudDogbiwgcGFyZW50Tm9kZTogMH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IG4sXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKVxuICAgICAgfTtcbiAgICB9KTtcbiAgaWYgKCFpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgY29uc3QgZW50cmllc051bSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNicyA9IHBhcmVudC5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gZW50cmllc051bSA7IGkgPCBjYnMgOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7XG4gICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICBwYXJlbnROb2RlOiBpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlIHwgbnVsbClbXSB7XG4gIGNvbnN0IHJvb3ROb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09IG51bGwgfHwgbi5wYXJlbnQgPT09IDApO1xuICBpZiAocm9vdE5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IHJvb3ROb2RlID0gcm9vdE5vZGVzWzBdO1xuICAgIGlmIChpc1NsaWRlc05vZGUocm9vdE5vZGUpKSB7XG4gICAgICBjb25zdCB0cmVlOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IFtdO1xuICAgICAgdHJlZS5wdXNoKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IHJvb3ROb2RlLFxuICAgICAgICBjb250YWluZXI6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCByb290Tm9kZSksXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIHJvb3ROb2RlKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocm9vdE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbbnVsbF07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZvcm0gZGVmaW5pdGlvbicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk5vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10ge1xuICBsZXQgZmxhdE5vZGVzOiBBamZOb2RlW10gPSBbXTtcblxuICBub2Rlcy5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgZmxhdE5vZGVzID0gZmxhdE5vZGVzLmNvbmNhdChmbGF0dGVuTm9kZXMoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzKSk7XG4gICAgfVxuICAgIGZsYXROb2Rlcy5wdXNoKG5vZGUpO1xuICB9KTtcblxuICByZXR1cm4gZmxhdE5vZGVzO1xufVxuXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhcbiAgZmxhdE5vZGVzOiBBamZOb2RlW10sIHBhcmVudE5vZGU6IEFqZk5vZGUsIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbik6IEFqZk5vZGVbXSB7XG4gIHJldHVybiBicmFuY2ggIT0gbnVsbCA/XG4gICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkICYmIG4ucGFyZW50Tm9kZSA9PT0gYnJhbmNoKSA6XG4gICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKTtcbiAgICAgIGNvbnRhaW5lci5ub2RlcyA9IHJlbW92ZU5vZGVzKGNvbnRhaW5lci5ub2RlcywgaWRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGVzLmZpbHRlcihuID0+IGlkcy5pbmRleE9mKG4uaWQpID09PSAtMSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsXG4pOiBBamZOb2RlW10ge1xuICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXMobm9kZXMpO1xuICBsZXQgZGVsTm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBsZXQgZGVzY2VuZGFudHMgPSBnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIHBhcmVudE5vZGUsIGJyYW5jaCk7XG4gIGNvbnN0IGxlbiA9IGRlc2NlbmRhbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKG5vZGVzLCBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSZXBlYXRpbmcgc2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmVwZWF0aW5nc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc3RyaW5nJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ31cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1udW1iZXInfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWJvb2xlYW4nfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdNdWx0aXBsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbXVsdGlwbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZm9ybXVsYSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlaW5wdXQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUaW1lJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRpbWUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGltZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9XG4gICAgfVxuICBdO1xuICAvKipcbiAgICogQXZhaWxhYmxlIG5vZGUgdHlwZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBhdmFpbGFibGVOb2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10geyByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzOyB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9mb3JtT2JzOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiA9IHRoaXMuX2Zvcm0uYXNPYnNlcnZhYmxlKCk7XG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD4geyByZXR1cm4gdGhpcy5fZm9ybU9iczsgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+O1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+O1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4geyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cblxuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPjtcbiAgZ2V0IGZsYXROb2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0RmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+O1xuICBnZXQgZmxhdEZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHsgcmV0dXJuIHRoaXMuX2ZsYXRGaWVsZHM7IH1cblxuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT47XG4gIGdldCBub2RlRW50cmllc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiB7IHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7IH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeU9iczogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+ID1cbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkTm9kZUVudHJ5T2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uOiBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiA9XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkQ29uZGl0aW9uKCk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4geyByZXR1cm4gdGhpcy5fZWRpdGVkQ29uZGl0aW9uT2JzOyB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbk9iczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4gPVxuICAgICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGVkaXRlZENob2ljZXNPcmlnaW4oKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGJlZm9yZU5vZGVzVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4geyByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7IH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGFmdGVyTm9kZVVwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHsgcmV0dXJuIHRoaXMuX2FmdGVyTm9kZVVwZGF0ZU9iczsgfVxuXG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclVwZGF0ZXM6IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NhdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHJpdmF0ZSBfZGVsZXRlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTYXZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXREZWxldGVOb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBlZGl0ZWQgZm9ybVxuICAgKlxuICAgKiBAcGFyYW0gZm9ybVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gIT09IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVkaXROb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQoY29uZGl0aW9uKTtcbiAgfVxuXG4gIHNhdmVDdXJyZW50Q29uZGl0aW9uKGNvbmRpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGMgPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uZ2V0VmFsdWUoKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgY2FuY2VsQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgIG5vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gICAgcGFyZW50OiBBamZOb2RlLFxuICAgIHBhcmVudE5vZGU6IG51bWJlcixcbiAgICBpbkNvbnRlbnQgPSBmYWxzZVxuICApOiB2b2lkIHtcbiAgICBsZXQgbm9kZTogQWpmTm9kZXxBamZGaWVsZDtcbiAgICBjb25zdCBpZCA9ICsrbm9kZVVuaXF1ZUlkO1xuICAgIGNvbnN0IGlzRmllbGROb2RlID0gbm9kZVR5cGUubm9kZVR5cGUuZmllbGQgIT0gbnVsbDtcbiAgICBpZiAoaXNGaWVsZE5vZGUpIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsXG4gICAgICAgIGZpZWxkVHlwZTogbm9kZVR5cGUubm9kZVR5cGUuZmllbGQhLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudC5pZCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGNyZWF0ZUNvbnRhaW5lck5vZGUoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLm5vZGUsXG4gICAgICAgIHBhcmVudDogcGFyZW50ICE9IG51bGwgPyBwYXJlbnQuaWQgOiAwLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICBpZiAobm9kZS5wYXJlbnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNuID0gaXNDb250YWluZXJOb2RlKHBhcmVudCkgJiYgaW5Db250ZW50ID9cbiAgICAgICAgKDxBamZDb250YWluZXJOb2RlPnBhcmVudCkgOlxuICAgICAgICBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIHBhcmVudCk7XG4gICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICBpZiAoIWlzRmllbGROb2RlKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgIGNvbnN0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNuLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVOb2RlRW50cnkocHJvcGVydGllczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50LmVtaXQocHJvcGVydGllcyk7XG4gIH1cblxuICBjYW5jZWxOb2RlRW50cnlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuICB9XG5cbiAgZGVsZXRlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudC5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBnZXRDdXJyZW50Rm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIFt0aGlzLmZvcm0sIHRoaXMubm9kZXMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLCB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLnN0cmluZ0lkZW50aWZpZXJdXG4gICAgKS5waXBlKFxuICAgICAgZmlsdGVyKChbZm9ybV0pID0+IGZvcm0gIT0gbnVsbCksXG4gICAgICBtYXAoKFtmb3JtLCBub2RlcywgYXR0YWNobWVudHNPcmlnaW5zLCBjaG9pY2VzT3JpZ2lucywgc3RyaW5nSWRlbnRpZmllcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZvcm0oe1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zOiBjaG9pY2VzT3JpZ2lucy5zbGljZSgwKSxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IGF0dGFjaG1lbnRzT3JpZ2lucy5zbGljZSgwKSxcbiAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiAoc3RyaW5nSWRlbnRpZmllciB8fCBbXSkuc2xpY2UoMCksXG4gICAgICAgICAgbm9kZXM6IG5vZGVzLnNsaWNlKDApIGFzIEFqZlNsaWRlW10sXG4gICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogZm9ybSEuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoKGNob2ljZXNPcmlnaW5zKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGNob2ljZXNPcmlnaW5zLmluZGV4T2YoY2hvaWNlc09yaWdpbik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gW1xuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW4sXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gWy4uLmNob2ljZXNPcmlnaW5zLCBjaG9pY2VzT3JpZ2luXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlc09yaWdpbnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoKCkgPT4gWy4uLmlkZW50aWZpZXJdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCBuLmlkKTtcbiAgICAgIGlmIChpc0NvbnRhaW5lck5vZGUobikpIHtcbiAgICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdGhpcy5fZmluZE1heE5vZGVJZCgoPEFqZkNvbnRhaW5lck5vZGU+bikubm9kZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SWQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybVxuICAgICAgLnN1YnNjcmliZSgoZm9ybTogQWpmRm9ybSB8IG51bGwpID0+IHtcbiAgICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgICAgaWYgKGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgJiYgZm9ybS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbm9kZVVuaXF1ZUlkID0gdGhpcy5fZmluZE1heE5vZGVJZChmb3JtLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAoX25vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgICAoX2F0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucyAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsID8gZm9ybS5jaG9pY2VzT3JpZ2lucy5zbGljZSgwKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dChcbiAgICAgICAgICAgIChfOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGZvcm0uc3RyaW5nSWRlbnRpZmllci5zbGljZSgwKVxuICAgICAgICAgICAgICAgIDogW107XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4+dGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjaG9pY2VzT3JpZ2lucyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICB9LCBbXVxuICAgICAgKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllciA9IHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKFxuICAgICAgICAoc3RyaW5nSWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSwgb3A6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wKHN0cmluZ0lkZW50aWZpZXIpO1xuICAgICAgICB9LCBbXVxuICAgICAgKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2Nhbigobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiBmbGF0dGVuTm9kZXMobm9kZXMpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpXG4gICAgKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gPEFqZkZpZWxkW10+bm9kZXMuZmlsdGVyKG4gPT4gIWlzQ29udGFpbmVyTm9kZShuKSkpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KClcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT5idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzKSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5vZGVFbnRyeV0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgICAgICBub2RlRW50cnkgPSBub2RlRW50cnkhO1xuICAgICAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9IHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kaXRpb246IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSkgOlxuICAgICAgICAgICAgICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUuZm9ybXVsYVJlcHMgPSBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5taW5SZXBzID0gcHJvcGVydGllcy5taW5SZXBzO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5mb3JtdWxhID0gcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmb3JjZVZhbHVlICE9IG51bGwgfHwgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8IG1heFZhbHVlICE9IG51bGwgfHwgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9IG1heFZhbHVlICE9IG51bGwgPyBtYXhWYWxpZGF0aW9uKG1heFZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCA/IG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluRGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCA/IG1heERpZ2l0c1ZhbGlkYXRpb24obWF4RGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKGM6IHtjb25kaXRpb246IHN0cmluZywgZXJyb3JNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogYy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh3OiB7Y29uZGl0aW9uOiBzdHJpbmcsIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC5uZXh0U2xpZGVDb25kaXRpb24gPSBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZmllbGQuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmd2MgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PmZpZWxkO1xuICAgICAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZU5hcnJvdyA9IHByb3BlcnRpZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHQ6IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaWR4ID0gbm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpLnBpcGUoXG4gICAgICBtYXAoKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpID0+IHtcbiAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxufVxuIl19