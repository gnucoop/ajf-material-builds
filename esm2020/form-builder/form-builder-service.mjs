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
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createContainerNode, createField, createForm, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning, } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of as obsOf, Subject, Subscription } from 'rxjs';
import { filter, map, publishReplay, refCount, scan, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
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
    const entries = nodes
        .filter(n => n.parent === parent.id)
        .sort((n1, n2) => n1.parentNode - n2.parentNode)
        .map(n => {
        const children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return {
            node: n,
            children,
            content: buildFormBuilderNodesContent(nodes, n),
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
export function flattenNodes(nodes) {
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
    return branch != null
        ? flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch)
        : flatNodes.filter(n => n.parent === parentNode.id);
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
export class AjfFormBuilderService {
    constructor() {
        this._availableNodeTypes = [
            {
                label: 'Slide',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-slide' },
                nodeType: { node: AjfNodeType.AjfSlide },
                isSlide: true,
            },
            {
                label: 'Repeating slide',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-repeatingslide' },
                nodeType: { node: AjfNodeType.AjfRepeatingSlide },
                isSlide: true,
            },
            {
                label: 'String',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-string' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.String },
            },
            {
                label: 'Text',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-text' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Text },
            },
            {
                label: 'Number',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-number' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Number },
            },
            {
                label: 'Boolean',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-boolean' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Boolean },
            },
            {
                label: 'Single choice',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-singlechoice' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.SingleChoice },
            },
            {
                label: 'Multiple choice',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-multiplechoice' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.MultipleChoice },
            },
            {
                label: 'Formula',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-formula' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Formula },
            },
            {
                label: 'Date',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-date' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Date },
            },
            {
                label: 'Date input',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-dateinput' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.DateInput },
            },
            {
                label: 'Time',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-time' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Time },
            },
            {
                label: 'Table',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-table' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Table },
            },
            {
                label: 'Range',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-range' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Range },
            },
        ];
        this._form = new BehaviorSubject(null);
        this._formObs = this._form;
        this._attachmentsOrigins = obsOf([]);
        this._choicesOrigins = obsOf([]);
        this._stringIdentifier = obsOf([]);
        this._nodesWithoutChoiceOrigins = obsOf([]);
        this._nodes = obsOf([]);
        this._flatFields = obsOf([]);
        this._nodeEntriesTree = obsOf([]);
        /**
         * A list of the ids of the dropLists connected to the source list.
         */
        this._connectedDropLists = new BehaviorSubject([]);
        this._editedNodeEntry = new BehaviorSubject(null);
        this._editedNodeEntryObs = this
            ._editedNodeEntry;
        this._editedCondition = new BehaviorSubject(null);
        this._editedConditionObs = this
            ._editedCondition;
        this._editedChoicesOrigin = new BehaviorSubject(null);
        this._editedChoicesOriginObs = this
            ._editedChoicesOrigin;
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
        let node;
        const id = ++nodeUniqueId;
        const isFieldNode = nodeType.nodeType?.field != null;
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
            const cn = isContainerNode(parent) && inContent
                ? parent
                : getNodeContainer({ nodes }, parent);
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
            this.form,
            this._nodesWithoutChoiceOrigins,
            this.attachmentsOrigins,
            this.choicesOrigins,
            this.stringIdentifier,
        ]).pipe(filter(([form]) => form != null), map(([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
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
            this._choicesOriginsUpdates.next(choicesOrigins => {
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
                content: buildFormBuilderNodesContent(nodes, rootNode),
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
        nodes.forEach(n => {
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
                return form != null && form.attachmentsOrigins != null
                    ? form.attachmentsOrigins.slice(0)
                    : [];
            });
            this._choicesOriginsUpdates.next((_choicesOrigins) => {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            });
            this._stringIdentifierUpdates.next((_) => {
                return form != null && form.stringIdentifier != null
                    ? form.stringIdentifier.slice(0)
                    : [];
            });
        });
    }
    _initChoicesOriginsStreams() {
        this._choicesOrigins = (this._choicesOriginsUpdates).pipe(scan((choicesOrigins, op) => {
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
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), publishReplay(1), refCount());
        this._nodesWithoutChoiceOrigins = this._nodes.pipe(map(slides => slides.map(slide => {
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
            node.visibility =
                properties.visibility != null
                    ? createCondition({ condition: properties.visibility })
                    : null;
            const oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches =
                properties.conditionalBranches != null
                    ? properties.conditionalBranches.map((condition) => createCondition({ condition }))
                    : [alwaysCondition()];
            const newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                const repNode = node;
                repNode.formulaReps =
                    properties.formulaReps != null
                        ? createFormula({ formula: properties.formulaReps })
                        : undefined;
                repNode.minReps = properties.minReps;
                repNode.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                const field = node;
                field.description = properties.description;
                field.defaultValue = properties.defaultValue;
                field.formula =
                    properties.formula != null ? createFormula({ formula: properties.formula }) : undefined;
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
                if (forceValue != null ||
                    notEmpty != null ||
                    (validationConditions != null && validationConditions.length > 0) ||
                    minValue != null ||
                    maxValue != null ||
                    minDigits != null ||
                    maxDigits != null) {
                    const validation = field.validation || createValidationGroup({});
                    validation.forceValue = forceValue;
                    validation.notEmpty = notEmpty ? notEmptyValidation() : undefined;
                    validation.minValue = minValue != null ? minValidation(minValue) : undefined;
                    validation.maxValue = maxValue != null ? maxValidation(maxValue) : undefined;
                    validation.minDigits = minDigits != null ? minDigitsValidation(minDigits) : undefined;
                    validation.maxDigits = maxDigits != null ? maxDigitsValidation(maxDigits) : undefined;
                    validation.conditions = (validationConditions || []).map((c) => createValidation({
                        condition: c.condition,
                        errorMessage: c.errorMessage,
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
                    warning.conditions = (warningConditions || []).map((w) => createWarning({
                        condition: w.condition,
                        warningMessage: w.warningMessage,
                    }));
                    field.warning = warning;
                }
                else {
                    field.warning = undefined;
                }
                field.nextSlideCondition =
                    properties.nextSlideCondition != null
                        ? createCondition({ condition: properties.nextSlideCondition })
                        : undefined;
                field.size = properties.size;
                field.defaultValue = properties.defaultValue;
                if (isFieldWithChoices(field)) {
                    const fwc = field;
                    fwc.choicesOriginRef = properties.choicesOriginRef;
                    fwc.forceExpanded = properties.forceExpanded;
                    fwc.forceNarrow = properties.forceNarrow;
                    fwc.triggerConditions = (properties.triggerConditions || []).map((t) => createCondition({ condition: t }));
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
        this._moveNodeSub = this._moveNodeEntryEvent
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
            currentNode.id = contId * 1000 + idx + 1;
            currentNode.parent = idx == 0 ? contId : contId * 1000 + idx;
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
AjfFormBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfFormBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBT1osV0FBVyxFQUlYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEdBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBYyxFQUFFLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEcsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBcUQxRixTQUFTLGdCQUFnQixDQUFDLENBQXFC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QUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQy9DLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxXQUFXLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN6QyxXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7WUFDN0QsSUFDRSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxRQUFRO2dCQUM1QyxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFDckQ7Z0JBQ0EsTUFBTSxZQUFZLEdBQUcsV0FBdUIsQ0FBQztnQkFDN0MsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO29CQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O2tIQXZ4QlUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sXG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZkZvcm0sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLFxuICBBamZOb2RlLFxuICBBamZOb2RlR3JvdXAsXG4gIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgQWpmUmVwZWF0aW5nU2xpZGUsXG4gIEFqZlNsaWRlLFxuICBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUNvbnRhaW5lck5vZGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBjcmVhdGVGb3JtLFxuICBjcmVhdGVWYWxpZGF0aW9uLFxuICBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsXG4gIGNyZWF0ZVdhcm5pbmdHcm91cCxcbiAgaXNDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGlzQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzU2xpZGVzTm9kZSxcbiAgbWF4RGlnaXRzVmFsaWRhdGlvbixcbiAgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbixcbiAgbWluVmFsaWRhdGlvbixcbiAgbm90RW1wdHlWYWxpZGF0aW9uLFxuICBub3RFbXB0eVdhcm5pbmcsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBjcmVhdGVDb25kaXRpb24sIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7bW92ZUl0ZW1JbkFycmF5fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50LCBzY2FuLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbixcbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkge1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uOiB7Zm9udFNldDogc3RyaW5nOyBmb250SWNvbjogc3RyaW5nfTtcbiAgbm9kZVR5cGU6IHtcbiAgICBub2RlOiBBamZOb2RlVHlwZTtcbiAgICBmaWVsZD86IEFqZkZpZWxkVHlwZTtcbiAgfTtcbiAgaXNTbGlkZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICBub2RlOiBBamZOb2RlO1xuICBjb250YWluZXI6IEFqZkNvbnRhaW5lck5vZGUgfCBudWxsO1xuICBjaGlsZHJlbjogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbiAgY29udGVudDogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCB7XG4gIHBhcmVudDogQWpmTm9kZTtcbiAgcGFyZW50Tm9kZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBub2RlJ3MgcG9zaXRpb24gY2hhbmdlIGluIHRoZSBmb3JtYnVpbGRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck1vdmVFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbm9kZSBiZWluZyBtb3ZlZC5cbiAgICovXG4gIG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIG5vZGUgcHJldmlvdXMgcG9zaXRpb24uXG4gICAqL1xuICBmcm9tSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBub2RlIG5ldyBwb3NpdGlvbi5cbiAgICovXG4gIHRvSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBBamZGb3JtQnVpbGRlckVtcHR5U2xvdDtcbmV4cG9ydCB0eXBlIEFqZkNvbnRhaW5lck5vZGUgPSBBamZTbGlkZSB8IEFqZlJlcGVhdGluZ1NsaWRlIHwgQWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfSB8IG51bGwge1xuICBpZiAoYy5ub2Rlcy5pbmRleE9mKG5vZGUpID4gLTEpIHtcbiAgICByZXR1cm4gYztcbiAgfVxuICBjb25zdCBjbnMgPSBjLm5vZGVzLmZpbHRlcihuID0+IGlzQ29udGFpbmVyTm9kZShuKSk7XG4gIGNvbnN0IGxlbiA9IGNucy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjbiA9IGdldE5vZGVDb250YWluZXIoPEFqZkNvbnRhaW5lck5vZGU+Y25zW2ldLCBub2RlKTtcbiAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShcbiAgbm9kZXM6IEFqZk5vZGVbXSxcbiAgcGFyZW50OiBBamZOb2RlLFxuICBpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzID0gZmFsc2UsXG4pOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGNvbnN0IGVudHJpZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gbm9kZXNcbiAgICAuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudC5pZClcbiAgICAuc29ydCgobjEsIG4yKSA9PiBuMS5wYXJlbnROb2RlIC0gbjIucGFyZW50Tm9kZSlcbiAgICAubWFwKG4gPT4ge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCBuKTtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7cGFyZW50OiBuLCBwYXJlbnROb2RlOiAwfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogbixcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIG4pLFxuICAgICAgfTtcbiAgICB9KTtcbiAgaWYgKCFpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgY29uc3QgZW50cmllc051bSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNicyA9IHBhcmVudC5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gZW50cmllc051bTsgaSA8IGNiczsgaSsrKSB7XG4gICAgICBlbnRyaWVzLnB1c2goe3BhcmVudDogcGFyZW50LCBwYXJlbnROb2RlOiBpfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnRyaWVzO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KF9ub2RlczogQWpmTm9kZVtdLCBub2RlOiBBamZOb2RlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzLCBub2RlLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBmbGF0Tm9kZXMgPSBmbGF0Tm9kZXMuY29uY2F0KGZsYXR0ZW5Ob2RlcygoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMpKTtcbiAgICB9XG4gICAgZmxhdE5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG5cbmZ1bmN0aW9uIGdldERlc2NlbmRhbnRzKFxuICBmbGF0Tm9kZXM6IEFqZk5vZGVbXSxcbiAgcGFyZW50Tm9kZTogQWpmTm9kZSxcbiAgYnJhbmNoOiBudW1iZXIgfCBudWxsID0gbnVsbCxcbik6IEFqZk5vZGVbXSB7XG4gIHJldHVybiBicmFuY2ggIT0gbnVsbFxuICAgID8gZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkICYmIG4ucGFyZW50Tm9kZSA9PT0gYnJhbmNoKVxuICAgIDogZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSA8QWpmQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgY29udGFpbmVyLm5vZGVzID0gcmVtb3ZlTm9kZXMoY29udGFpbmVyLm5vZGVzLCBpZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZXMuZmlsdGVyKG4gPT4gaWRzLmluZGV4T2Yobi5pZCkgPT09IC0xKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZVN1YnRyZWUoXG4gIG5vZGVzOiBBamZOb2RlW10sXG4gIHBhcmVudE5vZGU6IEFqZk5vZGUsXG4gIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4pOiBBamZOb2RlW10ge1xuICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXMobm9kZXMpO1xuICBsZXQgZGVsTm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBsZXQgZGVzY2VuZGFudHMgPSBnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIHBhcmVudE5vZGUsIGJyYW5jaCk7XG4gIGNvbnN0IGxlbiA9IGRlc2NlbmRhbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgZGVzY2VuZGFudHNbaV0pKTtcbiAgfVxuICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChkZXNjZW5kYW50cyk7XG4gIHJldHVybiByZW1vdmVOb2RlcyhcbiAgICBub2RlcyxcbiAgICBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSxcbiAgKTtcbn1cblxubGV0IG5vZGVVbmlxdWVJZCA9IDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmVwZWF0aW5nIHNsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJlcGVhdGluZ3NsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1N0cmluZycsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zdHJpbmcnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU3RyaW5nfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdOdW1iZXInLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbnVtYmVyJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk51bWJlcn0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Jvb2xlYW4nLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtYm9vbGVhbid9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Cb29sZWFufSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW11bHRpcGxlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRm9ybXVsYScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1mb3JtdWxhJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkZvcm11bGF9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUgaW5wdXQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZWlucHV0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGVJbnB1dH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RpbWUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGltZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UaW1lfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSYW5nZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1yYW5nZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5SYW5nZX0sXG4gICAgfSxcbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9mb3JtT2JzOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiA9IHRoaXMuX2Zvcm0gYXMgT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgZWRpdGVkIGZvcm0gc3RyZWFtXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1PYnM7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnM6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IGF0dGFjaG1lbnRzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2htZW50c09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4gPSBvYnNPZihbXSk7XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllcjogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IHN0cmluZ0lkZW50aWZpZXIoKTogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ0lkZW50aWZpZXI7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZlNsaWRlW10+ID0gb2JzT2YoW10pO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+ID0gb2JzT2YoW10pO1xuICBnZXQgbm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB8IHVuZGVmaW5lZDtcbiAgZ2V0IGZsYXROb2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0RmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+ID0gb2JzT2YoW10pO1xuICBnZXQgZmxhdEZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdEZpZWxkcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBkcm9wTGlzdHMgY29ubmVjdGVkIHRvIHRoZSBzb3VyY2UgbGlzdC5cbiAgICovXG4gIHByaXZhdGUgX2Nvbm5lY3RlZERyb3BMaXN0czogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgZ2V0IGNvbm5lY3RlZERyb3BMaXN0cygpOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5OiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZE5vZGVFbnRyeSBhcyBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD47XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkTm9kZUVudHJ5T2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uOiBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZENvbmRpdGlvbiBhcyBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+O1xuICBnZXQgZWRpdGVkQ29uZGl0aW9uKCk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW5PYnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4gPSB0aGlzXG4gICAgLl9lZGl0ZWRDaG9pY2VzT3JpZ2luIGFzIE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD47XG4gIGdldCBlZGl0ZWRDaG9pY2VzT3JpZ2luKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZSBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuICBnZXQgYmVmb3JlTm9kZXNVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlT2JzO1xuICB9XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hZnRlck5vZGVVcGRhdGUgYXMgT2JzZXJ2YWJsZTx2b2lkPjtcbiAgZ2V0IGFmdGVyTm9kZVVwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzOiBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwcml2YXRlIF9kZWxldGVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4oKTtcbiAgLyoqXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIHBvc2l0aW9uIG9mIGEgbm9kZSBpbiBhIHRyZWUgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX21vdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck1vdmVFdmVudD4oKTtcblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byB0aGUgbW92ZU5vZGVFbnRyeUV2ZW50IGV2ZW50IGVtaXR0ZXI7XG4gICAqL1xuICBwcml2YXRlIF9tb3ZlTm9kZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U2F2ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0TW92ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0RGVsZXRlTm9kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgZWRpdGVkIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChmb3JtICE9PSB0aGlzLl9mb3JtLmdldFZhbHVlKCkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dChmb3JtKTtcbiAgICB9XG4gIH1cblxuICBlZGl0Tm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbihjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KGNvbmRpdGlvbik7XG4gIH1cblxuICBzYXZlQ3VycmVudENvbmRpdGlvbihjb25kaXRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjID0gdGhpcy5fZWRpdGVkQ29uZGl0aW9uLmdldFZhbHVlKCk7XG4gICAgaWYgKGMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChudWxsKTtcbiAgfVxuXG4gIGNhbmNlbENvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgYXNzaWduTGlzdElkKG5vZGU6IEFqZk5vZGUsIGVtcHR5OiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgY29uc3QgbGlzdElkID0gZW1wdHkgPyBgZW1wdHlfZmllbGRzX2xpc3RfJHtub2RlLmlkfWAgOiBgZmllbGRzX2xpc3RfJHtub2RlLmlkfWA7XG4gICAgICBpZiAodGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLnZhbHVlLmluZGV4T2YobGlzdElkKSA9PSAtMSkge1xuICAgICAgICB0aGlzLl9jb25uZWN0RHJvcExpc3QobGlzdElkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0SWQ7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGluc2VydE5vZGUoXG4gICAgbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgICBwYXJlbnQ6IEFqZk5vZGUsXG4gICAgcGFyZW50Tm9kZTogbnVtYmVyLFxuICAgIGluQ29udGVudCA9IGZhbHNlLFxuICAgIGluc2VydEluSW5kZXggPSAwLFxuICApOiB2b2lkIHtcbiAgICBsZXQgbm9kZTogQWpmTm9kZSB8IEFqZkZpZWxkO1xuICAgIGNvbnN0IGlkID0gKytub2RlVW5pcXVlSWQ7XG4gICAgY29uc3QgaXNGaWVsZE5vZGUgPSBub2RlVHlwZS5ub2RlVHlwZT8uZmllbGQgIT0gbnVsbDtcbiAgICBpZiAoaXNGaWVsZE5vZGUpIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsXG4gICAgICAgIGZpZWxkVHlwZTogbm9kZVR5cGUubm9kZVR5cGUuZmllbGQhLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudC5pZCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGNyZWF0ZUNvbnRhaW5lck5vZGUoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLm5vZGUsXG4gICAgICAgIHBhcmVudDogMCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIG5vZGVzOiBbXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgY29uc3QgY24gPVxuICAgICAgICBpc0NvbnRhaW5lck5vZGUocGFyZW50KSAmJiBpbkNvbnRlbnRcbiAgICAgICAgICA/IDxBamZDb250YWluZXJOb2RlPnBhcmVudFxuICAgICAgICAgIDogKGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgcGFyZW50KSBhcyBBamZDb250YWluZXJOb2RlKTtcbiAgICAgIGlmICghaXNGaWVsZE5vZGUpIHtcbiAgICAgICAgbGV0IG5ld05vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgIG5ld05vZGVzLnNwbGljZShpbnNlcnRJbkluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoMCwgbmV3Tm9kZXMpO1xuICAgICAgICByZXR1cm4gbmV3Tm9kZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgbmV3Tm9kZXMuc3BsaWNlKGluc2VydEluSW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZU5vZGVFbnRyeShwcm9wZXJ0aWVzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnQuZW1pdChwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbmNlbE5vZGVFbnRyeUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gIH1cblxuICBkZWxldGVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB0aGUgbW92ZU5vZGUgZXZlbnQgd2hlbiBhIG5vZGUgaXMgbW92ZWQgaW4gdGhlIGZvcm1idWlsZGVyLlxuICAgKiBAcGFyYW0gbm9kZUVudHJ5IFRoZSBub2RlIHRvIGJlIG1vdmVkLlxuICAgKi9cbiAgbW92ZU5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBtb3ZlRXZlbnQ6IEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50ID0ge25vZGVFbnRyeTogbm9kZUVudHJ5LCBmcm9tSW5kZXg6IGZyb20sIHRvSW5kZXg6IHRvfTtcbiAgICB0aGlzLl9tb3ZlTm9kZUVudHJ5RXZlbnQubmV4dChtb3ZlRXZlbnQpO1xuICB9XG5cbiAgZ2V0Q3VycmVudEZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5mb3JtLFxuICAgICAgdGhpcy5fbm9kZXNXaXRob3V0Q2hvaWNlT3JpZ2lucyxcbiAgICAgIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgdGhpcy5jaG9pY2VzT3JpZ2lucyxcbiAgICAgIHRoaXMuc3RyaW5nSWRlbnRpZmllcixcbiAgICBdKS5waXBlKFxuICAgICAgZmlsdGVyKChbZm9ybV0pID0+IGZvcm0gIT0gbnVsbCksXG4gICAgICBtYXAoKFtmb3JtLCBub2RlcywgYXR0YWNobWVudHNPcmlnaW5zLCBjaG9pY2VzT3JpZ2lucywgc3RyaW5nSWRlbnRpZmllcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZvcm0oe1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zOiAoY2hvaWNlc09yaWdpbnMgYXMgQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pLnNsaWNlKDApLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2luczogKGF0dGFjaG1lbnRzT3JpZ2lucyBhcyBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10pLnNsaWNlKDApLFxuICAgICAgICAgIHN0cmluZ0lkZW50aWZpZXI6ICgoc3RyaW5nSWRlbnRpZmllciB8fCBbXSkgYXMgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSkuc2xpY2UoMCksXG4gICAgICAgICAgbm9kZXM6IChub2RlcyBhcyBBamZTbGlkZVtdKS5zbGljZSgwKSxcbiAgICAgICAgICBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zOiAoZm9ybSBhcyBBamZGb3JtKS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zLFxuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoY2hvaWNlc09yaWdpbnMgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBjaG9pY2VzT3JpZ2lucy5pbmRleE9mKGNob2ljZXNPcmlnaW4pO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFtcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKDAsIGlkeCksXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2luLFxuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoaWR4ICsgMSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFsuLi5jaG9pY2VzT3JpZ2lucywgY2hvaWNlc09yaWdpbl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXNPcmlnaW5zO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKGlkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KCgpID0+IFsuLi5pZGVudGlmaWVyXSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlIHwgbnVsbClbXSB7XG4gICAgdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5vZGVzKTtcbiAgICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIoXG4gICAgICBuID0+IG4ubm9kZVR5cGUgPT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHwgbi5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSxcbiAgICApO1xuICAgIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW251bGxdO1xuICAgIH1cbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3ROb2Rlc1swXTtcbiAgICBpZiAoaXNTbGlkZXNOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgY29uc3QgdHJlZTogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBbXTtcbiAgICAgIHRyZWUucHVzaCg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiByb290Tm9kZSxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCByb290Tm9kZSksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybSBkZWZpbml0aW9uJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgaWQgb2YgYSBkcm9wTGlzdCB0byBiZSBjb25uZWN0ZWQgd2l0aCB0aGUgRm9ybUJ1aWxkZXIgc291cmNlIGxpc3QuXG4gICAqIEBwYXJhbSBsaXN0SWQgVGhlIGlkIG9mIHRoZSBsaXN0IHRvIGNvbm5lY3QuXG4gICAqL1xuICBwcml2YXRlIF9jb25uZWN0RHJvcExpc3QobGlzdElkOiBzdHJpbmcpIHtcbiAgICBsZXQgY29ubmVjdGVkTGlzdHMgPSB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMudmFsdWUuc2xpY2UoMCk7XG4gICAgdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLm5leHQoWy4uLmNvbm5lY3RlZExpc3RzLCBsaXN0SWRdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgbi5pZCk7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKG4pKSB7XG4gICAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHRoaXMuX2ZpbmRNYXhOb2RlSWQoKDxBamZDb250YWluZXJOb2RlPm4pLm5vZGVzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1heElkO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm0uc3Vic2NyaWJlKChmb3JtOiBBamZGb3JtIHwgbnVsbCkgPT4ge1xuICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgKF9hdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSk6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucyAhPSBudWxsXG4gICAgICAgICAgICA/IGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAoX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSk6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KFxuICAgICAgICAoXzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10gPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGxcbiAgICAgICAgICAgID8gZm9ybS5zdHJpbmdJZGVudGlmaWVyLnNsaWNlKDApXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSAoPE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChjaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sIG9wOiBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3AoY2hvaWNlc09yaWdpbnMpO1xuICAgICAgfSwgW10pLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICB9LFxuICAgICAgICBbXSxcbiAgICAgICksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgc2Nhbigoc3RyaW5nSWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSwgb3A6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChzdHJpbmdJZGVudGlmaWVyKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpLnBpcGUoXG4gICAgICBzY2FuKChub2RlczogQWpmTm9kZVtdLCBvcDogQWpmTm9kZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zID0gKHRoaXMuX25vZGVzIGFzIE9ic2VydmFibGU8QWpmU2xpZGVbXT4pLnBpcGUoXG4gICAgICBtYXAoc2xpZGVzID0+XG4gICAgICAgIHNsaWRlcy5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLm5vZGVzID0gKHNsaWRlLm5vZGVzIGFzIEFqZkZpZWxkW10pLm1hcCgobm9kZTogQWpmRmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgZndjID0gZGVlcENvcHkobm9kZSk7XG4gICAgICAgICAgICAgIGlmIChmd2MgJiYgZndjLmNob2ljZXMpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZndjLmNob2ljZXM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZ3YyAmJiBmd2MuY2hvaWNlc09yaWdpbikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmd2MuY2hvaWNlc09yaWdpbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZndjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IGZsYXR0ZW5Ob2Rlcyhub2RlcykpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gPEFqZkZpZWxkW10+bm9kZXMuZmlsdGVyKG4gPT4gIWlzQ29udGFpbmVyTm9kZShuKSkpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAobm9kZXMgPT4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+dGhpcy5fYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlcykpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTYXZlTm9kZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnRcbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmVkaXRlZE5vZGVFbnRyeSwgdGhpcy5jaG9pY2VzT3JpZ2lucywgdGhpcy5hdHRhY2htZW50c09yaWdpbnMpLFxuICAgICAgICBmaWx0ZXIoKFtfLCBub2RlRW50cnldKSA9PiBub2RlRW50cnkgIT0gbnVsbCksXG4gICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5lXSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICBjb25zdCBub2RlRW50cnkgPSBuZSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBkZWVwQ29weShvcmlnTm9kZSk7XG4gICAgICAgICAgbm9kZS5pZCA9IG5vZGVFbnRyeS5ub2RlLmlkO1xuICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICBub2RlLmxhYmVsID0gcHJvcGVydGllcy5sYWJlbDtcbiAgICAgICAgICBub2RlLnZpc2liaWxpdHkgPVxuICAgICAgICAgICAgcHJvcGVydGllcy52aXNpYmlsaXR5ICE9IG51bGxcbiAgICAgICAgICAgICAgPyBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogcHJvcGVydGllcy52aXNpYmlsaXR5fSlcbiAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgICAgIHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsXG4gICAgICAgICAgICAgID8gcHJvcGVydGllcy5jb25kaXRpb25hbEJyYW5jaGVzLm1hcCgoY29uZGl0aW9uOiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbn0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgICAgIGNvbnN0IG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgY29uc3QgcmVwTm9kZSA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm5vZGU7XG4gICAgICAgICAgICByZXBOb2RlLmZvcm11bGFSZXBzID1cbiAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JtdWxhUmVwcyAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJlcE5vZGUubWluUmVwcyA9IHByb3BlcnRpZXMubWluUmVwcztcbiAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgZmllbGQuZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgZmllbGQuZGVmYXVsdFZhbHVlID0gcHJvcGVydGllcy5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICBmaWVsZC5mb3JtdWxhID1cbiAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgPyBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGZvcmNlVmFsdWUgPSBwcm9wZXJ0aWVzLnZhbHVlO1xuICAgICAgICAgICAgY29uc3Qgbm90RW1wdHkgPSBwcm9wZXJ0aWVzLm5vdEVtcHR5O1xuICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgbGV0IG1pblZhbHVlOiBudW1iZXIgfCBudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5WYWx1ZSwgMTApO1xuICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXIgfCBudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5tYXhWYWx1ZSwgMTApO1xuICAgICAgICAgICAgbGV0IG1pbkRpZ2l0czogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBudW1iZXIgfCBudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5tYXhEaWdpdHMsIDEwKTtcbiAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgbWluVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICBtYXhWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICBtaW5EaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgbWF4RGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZm9yY2VWYWx1ZSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgIG5vdEVtcHR5ICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zICE9IG51bGwgJiYgdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoID4gMCkgfHxcbiAgICAgICAgICAgICAgbWluVmFsdWUgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBtYXhWYWx1ZSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgIG1pbkRpZ2l0cyAhPSBudWxsIHx8XG4gICAgICAgICAgICAgIG1heERpZ2l0cyAhPSBudWxsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IGZpZWxkLnZhbGlkYXRpb24gfHwgY3JlYXRlVmFsaWRhdGlvbkdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbi5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluVmFsdWUgPSBtaW5WYWx1ZSAhPSBudWxsID8gbWluVmFsaWRhdGlvbihtaW5WYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4VmFsdWUgPSBtYXhWYWx1ZSAhPSBudWxsID8gbWF4VmFsaWRhdGlvbihtYXhWYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID0gbWluRGlnaXRzICE9IG51bGwgPyBtaW5EaWdpdHNWYWxpZGF0aW9uKG1pbkRpZ2l0cykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID0gbWF4RGlnaXRzICE9IG51bGwgPyBtYXhEaWdpdHNWYWxpZGF0aW9uKG1heERpZ2l0cykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9ICh2YWxpZGF0aW9uQ29uZGl0aW9ucyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgIChjOiB7Y29uZGl0aW9uOiBzdHJpbmc7IGVycm9yTWVzc2FnZTogc3RyaW5nfSkgPT5cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZVZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IGMuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgY29uc3Qgd2FybmluZ0NvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLndhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBub3RFbXB0eVdhcm4gIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAod2FybmluZ0NvbmRpdGlvbnMgIT0gbnVsbCAmJiB3YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgIHdhcm5pbmcubm90RW1wdHkgPSBub3RFbXB0eVdhcm4gPyBub3RFbXB0eVdhcm5pbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgd2FybmluZy5jb25kaXRpb25zID0gKHdhcm5pbmdDb25kaXRpb25zIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgKHc6IHtjb25kaXRpb246IHN0cmluZzsgd2FybmluZ01lc3NhZ2U6IHN0cmluZ30pID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiB3LmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U6IHcud2FybmluZ01lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgZmllbGQud2FybmluZyA9IHdhcm5pbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmllbGQubmV4dFNsaWRlQ29uZGl0aW9uID1cbiAgICAgICAgICAgICAgcHJvcGVydGllcy5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGZpZWxkLnNpemUgPSBwcm9wZXJ0aWVzLnNpemU7XG4gICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmaWVsZCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgZndjID0gPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj5maWVsZDtcbiAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgIGZ3Yy5mb3JjZUV4cGFuZGVkID0gcHJvcGVydGllcy5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgICAgICBmd2MuZm9yY2VOYXJyb3cgPSBwcm9wZXJ0aWVzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fCBbXSkubWFwKCh0OiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcblxuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IEB0cmlrIGNoZWNrIHRoaXMsIHdhcyBhbHdheXMgdHJ1ZT9cbiAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNuLm5vZGVzLmluZGV4T2Yob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gICBjb25zdCBpZHggPSBub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgLy8gICBub2RlcyA9IG5vZGVzLnNsaWNlKDAsIGlkeCkuY29uY2F0KFtub2RlXSkuY29uY2F0KG5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICBpZiAobmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Q29uZGl0aW9uYWxCcmFuY2hlczsgaSA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RGVsZXRlTm9kZSgpOiB2b2lkIHtcbiAgICAoPE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+PnRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHN1YnNjcmlwdGlvbiB0byB0aGUgbW92ZU5vZGVFbnRyeUV2ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdE1vdmVOb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuX21vdmVOb2RlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIgPSB0aGlzLl9tb3ZlTm9kZUVudHJ5RXZlbnRcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKG1vdmVFdmVudDogQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG1vdmVFdmVudC5ub2RlRW50cnkgYXMgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpIGFzIEFqZkNvbnRhaW5lck5vZGU7XG4gICAgICAgICAgICBsZXQgbmV3Tm9kZXM6IEFqZk5vZGVbXSA9IG5vZGVzO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IGNuLm5vZGVzO1xuICAgICAgICAgICAgICBtb3ZlSXRlbUluQXJyYXkobmV3Tm9kZXMsIG1vdmVFdmVudC5mcm9tSW5kZXgsIG1vdmVFdmVudC50b0luZGV4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY24uaWQsIG5ld05vZGVzKTtcbiAgICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFwiaWRcIiBhbmQgXCJwYXJlbnRcIiBmaWVsZHMgb2YgYSBtb2RpZmllZCBvciByZWFycmFuZ2VkIGxpc3Qgb2Ygbm9kZXMuXG4gICAqIEBwYXJhbSBjb250YWluZXJJZCBUaGUgaWQgb2YgdGhlIHBhcmVudCBjb250YWluZXIgb2YgdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBub2Rlc0xpc3QgVGhlIGxpc3Qgb2Ygbm9kZXMgdG8gYmUgdXBkYXRlZC5cbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZU5vZGVzTGlzdChjb250YWluZXJJZDogbnVtYmVyLCBub2Rlc0xpc3Q6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgaWYgKCFub2Rlc0xpc3QubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGNvbnRJZCA9IGNvbnRhaW5lcklkICE9IHVuZGVmaW5lZCA/IGNvbnRhaW5lcklkIDogMDtcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBub2Rlc0xpc3QubGVuZ3RoOyBpZHgrKykge1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbm9kZXNMaXN0W2lkeF07XG4gICAgICBjdXJyZW50Tm9kZS5pZCA9IGNvbnRJZCAqIDEwMDAgKyBpZHggKyAxO1xuICAgICAgY3VycmVudE5vZGUucGFyZW50ID0gaWR4ID09IDAgPyBjb250SWQgOiBjb250SWQgKiAxMDAwICsgaWR4O1xuICAgICAgaWYgKFxuICAgICAgICBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IGN1cnJlbnROb2RlIGFzIEFqZlNsaWRlO1xuICAgICAgICBpZiAoY3VycmVudFNsaWRlLm5vZGVzKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlTm9kZXNMaXN0KGN1cnJlbnRTbGlkZS5pZCwgY3VycmVudFNsaWRlLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXNMaXN0O1xuICB9XG59XG4iXX0=