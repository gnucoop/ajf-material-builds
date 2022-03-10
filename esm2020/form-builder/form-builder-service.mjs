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
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createContainerNode, createField, createForm, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRangeField, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning, } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
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
                if (isRangeField(field)) {
                    const rf = field;
                    rf.start = properties.start;
                    rf.end = properties.end;
                    rf.step = properties.step;
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
AjfFormBuilderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfFormBuilderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfFormBuilderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfFormBuilderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfFormBuilderService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBT1osV0FBVyxFQUtYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLFlBQVksRUFDWix3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsZUFBZSxHQUNoQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBZSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9GLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBRSxhQUFhLEVBQWMsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN2RixPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFxRDFGLFNBQVMsZ0JBQWdCLENBQUMsQ0FBcUIsRUFBRSxJQUFhO0lB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LENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN6QyxXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7WUFDN0QsSUFDRSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxRQUFRO2dCQUM1QyxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFDckQ7Z0JBQ0EsTUFBTSxZQUFZLEdBQUcsV0FBdUIsQ0FBQztnQkFDN0MsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO29CQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O3VIQTl4QlUscUJBQXFCOzJIQUFyQixxQkFBcUI7Z0dBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sXG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZkZvcm0sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLFxuICBBamZOb2RlLFxuICBBamZOb2RlR3JvdXAsXG4gIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmFuZ2VGaWVsZCxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgQWpmUmVwZWF0aW5nU2xpZGUsXG4gIEFqZlNsaWRlLFxuICBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUNvbnRhaW5lck5vZGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBjcmVhdGVGb3JtLFxuICBjcmVhdGVWYWxpZGF0aW9uLFxuICBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsXG4gIGNyZWF0ZVdhcm5pbmdHcm91cCxcbiAgaXNDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGlzQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JhbmdlRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgaXNTbGlkZXNOb2RlLFxuICBtYXhEaWdpdHNWYWxpZGF0aW9uLFxuICBtYXhWYWxpZGF0aW9uLFxuICBtaW5EaWdpdHNWYWxpZGF0aW9uLFxuICBtaW5WYWxpZGF0aW9uLFxuICBub3RFbXB0eVZhbGlkYXRpb24sXG4gIG5vdEVtcHR5V2FybmluZyxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHttb3ZlSXRlbUluQXJyYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgc2Nhbiwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24sXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbjoge2ZvbnRTZXQ6IHN0cmluZzsgZm9udEljb246IHN0cmluZ307XG4gIG5vZGVUeXBlOiB7XG4gICAgbm9kZTogQWpmTm9kZVR5cGU7XG4gICAgZmllbGQ/OiBBamZGaWVsZFR5cGU7XG4gIH07XG4gIGlzU2xpZGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgbm9kZTogQWpmTm9kZTtcbiAgY29udGFpbmVyOiBBamZDb250YWluZXJOb2RlIHwgbnVsbDtcbiAgY2hpbGRyZW46IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG4gIGNvbnRlbnQ6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Qge1xuICBwYXJlbnQ6IEFqZk5vZGU7XG4gIHBhcmVudE5vZGU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbm9kZSdzIHBvc2l0aW9uIGNoYW5nZSBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQge1xuICAvKipcbiAgICogVGhlIG5vZGUgYmVpbmcgbW92ZWQuXG4gICAqL1xuICBub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBub2RlIHByZXZpb3VzIHBvc2l0aW9uLlxuICAgKi9cbiAgZnJvbUluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbm9kZSBuZXcgcG9zaXRpb24uXG4gICAqL1xuICB0b0luZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1CdWlsZGVyTm9kZSA9IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGUgfCBBamZSZXBlYXRpbmdTbGlkZSB8IEFqZk5vZGVHcm91cDtcblxuZnVuY3Rpb24gZ2V0Tm9kZUNvbnRhaW5lcihjOiB7bm9kZXM6IEFqZk5vZGVbXX0sIG5vZGU6IEFqZk5vZGUpOiB7bm9kZXM6IEFqZk5vZGVbXX0gfCBudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xKSB7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgY29uc3QgY25zID0gYy5ub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGUobikpO1xuICBjb25zdCBsZW4gPSBjbnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY24gPSBnZXROb2RlQ29udGFpbmVyKDxBamZDb250YWluZXJOb2RlPmNuc1tpXSwgbm9kZSk7XG4gICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBjbjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoXG4gIG5vZGVzOiBBamZOb2RlW10sXG4gIHBhcmVudDogQWpmTm9kZSxcbiAgaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcyA9IGZhbHNlLFxuKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBjb25zdCBlbnRyaWVzOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IG5vZGVzXG4gICAgLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnQuaWQpXG4gICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgLm1hcChuID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgbik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goe3BhcmVudDogbiwgcGFyZW50Tm9kZTogMH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IG4sXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKSxcbiAgICAgIH07XG4gICAgfSk7XG4gIGlmICghaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcykge1xuICAgIGNvbnN0IGVudHJpZXNOdW0gPSBlbnRyaWVzLmxlbmd0aDtcbiAgICBjb25zdCBjYnMgPSBwYXJlbnQuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGVudHJpZXNOdW07IGkgPCBjYnM7IGkrKykge1xuICAgICAgZW50cmllcy5wdXNoKHtwYXJlbnQ6IHBhcmVudCwgcGFyZW50Tm9kZTogaX0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW50cmllcztcbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChfbm9kZXM6IEFqZk5vZGVbXSwgbm9kZTogQWpmTm9kZSk6IEFqZkZvcm1CdWlsZGVyTm9kZVtdIHtcbiAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgIHJldHVybiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2Rlcywgbm9kZSwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk5vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10ge1xuICBsZXQgZmxhdE5vZGVzOiBBamZOb2RlW10gPSBbXTtcblxuICBub2Rlcy5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgZmxhdE5vZGVzID0gZmxhdE5vZGVzLmNvbmNhdChmbGF0dGVuTm9kZXMoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzKSk7XG4gICAgfVxuICAgIGZsYXROb2Rlcy5wdXNoKG5vZGUpO1xuICB9KTtcblxuICByZXR1cm4gZmxhdE5vZGVzO1xufVxuXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhcbiAgZmxhdE5vZGVzOiBBamZOb2RlW10sXG4gIHBhcmVudE5vZGU6IEFqZk5vZGUsXG4gIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4pOiBBamZOb2RlW10ge1xuICByZXR1cm4gYnJhbmNoICE9IG51bGxcbiAgICA/IGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCAmJiBuLnBhcmVudE5vZGUgPT09IGJyYW5jaClcbiAgICA6IGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGVzKG5vZGVzOiBBamZOb2RlW10sIGlkczogbnVtYmVyW10pOiBBamZOb2RlW10ge1xuICBjb25zdCBsZW4gPSBub2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gPEFqZkNvbnRhaW5lck5vZGU+bm9kZTtcbiAgICAgIGNvbnRhaW5lci5ub2RlcyA9IHJlbW92ZU5vZGVzKGNvbnRhaW5lci5ub2RlcywgaWRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGVzLmZpbHRlcihuID0+IGlkcy5pbmRleE9mKG4uaWQpID09PSAtMSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLFxuICBwYXJlbnROb2RlOiBBamZOb2RlLFxuICBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsLFxuKTogQWpmTm9kZVtdIHtcbiAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzKG5vZGVzKTtcbiAgbGV0IGRlbE5vZGVzOiBBamZOb2RlW10gPSBbXTtcbiAgbGV0IGRlc2NlbmRhbnRzID0gZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBwYXJlbnROb2RlLCBicmFuY2gpO1xuICBjb25zdCBsZW4gPSBkZXNjZW5kYW50cy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIGRlc2NlbmRhbnRzW2ldKSk7XG4gIH1cbiAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZGVzY2VuZGFudHMpO1xuICByZXR1cm4gcmVtb3ZlTm9kZXMoXG4gICAgbm9kZXMsXG4gICAgZGVsTm9kZXMubWFwKG4gPT4gbi5pZCksXG4gICk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYXZhaWxhYmxlTm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ1NsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXNsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlNsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JlcGVhdGluZyBzbGlkZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1yZXBlYXRpbmdzbGlkZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZX0sXG4gICAgICBpc1NsaWRlOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc3RyaW5nJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ30sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RleHQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGV4dCd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UZXh0fSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTnVtYmVyJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW51bWJlcid9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5OdW1iZXJ9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWJvb2xlYW4nfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1NpbmdsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2luZ2xlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ011bHRpcGxlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1tdWx0aXBsZWNob2ljZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZm9ybXVsYSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGV9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlIGlucHV0JyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGVpbnB1dCd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5EYXRlSW5wdXR9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUaW1lJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRpbWUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGltZX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RhYmxlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRhYmxlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRhYmxlfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmFuZ2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmFuZ2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuUmFuZ2V9LFxuICAgIH0sXG4gIF07XG4gIC8qKlxuICAgKiBBdmFpbGFibGUgbm9kZSB0eXBlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGF2YWlsYWJsZU5vZGVUeXBlcygpOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2F2YWlsYWJsZU5vZGVUeXBlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZm9ybU9iczogT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD4gPSB0aGlzLl9mb3JtIGFzIE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9mb3JtT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT47XG4gIGdldCBhdHRhY2htZW50c09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+O1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXI6IE9ic2VydmFibGU8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXT47XG4gIGdldCBzdHJpbmdJZGVudGlmaWVyKCk6IE9ic2VydmFibGU8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLl9zdHJpbmdJZGVudGlmaWVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZXNXaXRob3V0Q2hvaWNlT3JpZ2luczogT2JzZXJ2YWJsZTxBamZTbGlkZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPjtcbiAgZ2V0IG5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhdE5vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBmbGF0Tm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdE5vZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhdEZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZsYXRGaWVsZHMoKTogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXRGaWVsZHM7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT47XG4gIGdldCBub2RlRW50cmllc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgdGhlIGlkcyBvZiB0aGUgZHJvcExpc3RzIGNvbm5lY3RlZCB0byB0aGUgc291cmNlIGxpc3QuXG4gICAqL1xuICBwcml2YXRlIF9jb25uZWN0ZWREcm9wTGlzdHM6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGdldCBjb25uZWN0ZWREcm9wTGlzdHMoKTogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5T2JzOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4gPSB0aGlzXG4gICAgLl9lZGl0ZWROb2RlRW50cnkgYXMgT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgZWRpdGVkTm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVFbnRyeU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbiB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbiB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb25PYnM6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPSB0aGlzXG4gICAgLl9lZGl0ZWRDb25kaXRpb24gYXMgT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPjtcbiAgZ2V0IGVkaXRlZENvbmRpdGlvbigpOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkQ29uZGl0aW9uT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW48YW55PiB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW48YW55PiB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PiB8IG51bGw+ID0gdGhpc1xuICAgIC5fZWRpdGVkQ2hvaWNlc09yaWdpbiBhcyBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PiB8IG51bGw+O1xuICBnZXQgZWRpdGVkQ2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PiB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUgYXMgT2JzZXJ2YWJsZTx2b2lkPjtcbiAgZ2V0IGJlZm9yZU5vZGVzVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZU9icztcbiAgfVxuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlIGFzIE9ic2VydmFibGU8dm9pZD47XG4gIGdldCBhZnRlck5vZGVVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyTm9kZVVwZGF0ZU9icztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyVXBkYXRlczogU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NhdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHJpdmF0ZSBfZGVsZXRlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+KCk7XG4gIC8qKlxuICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiBhIG5vZGUgaW4gYSB0cmVlIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck1vdmVFdmVudD4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gdGhlIG1vdmVOb2RlRW50cnlFdmVudCBldmVudCBlbWl0dGVyO1xuICAgKi9cbiAgcHJpdmF0ZSBfbW92ZU5vZGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEF0dGFjaG1lbnRzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFNhdmVOb2RlKCk7XG4gICAgdGhpcy5faW5pdE1vdmVOb2RlKCk7XG4gICAgdGhpcy5faW5pdERlbGV0ZU5vZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IGVkaXRlZCBmb3JtXG4gICAqXG4gICAqIEBwYXJhbSBmb3JtXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEZvcm0oZm9ybTogQWpmRm9ybSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZm9ybSAhPT0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLl9mb3JtLm5leHQoZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgZWRpdE5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb24oY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChjb25kaXRpb24pO1xuICB9XG5cbiAgc2F2ZUN1cnJlbnRDb25kaXRpb24oY29uZGl0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYyA9IHRoaXMuX2VkaXRlZENvbmRpdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQobnVsbCk7XG4gIH1cblxuICBjYW5jZWxDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIGFzc2lnbkxpc3RJZChub2RlOiBBamZOb2RlLCBlbXB0eTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgIGNvbnN0IGxpc3RJZCA9IGVtcHR5ID8gYGVtcHR5X2ZpZWxkc19saXN0XyR7bm9kZS5pZH1gIDogYGZpZWxkc19saXN0XyR7bm9kZS5pZH1gO1xuICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cy52YWx1ZS5pbmRleE9mKGxpc3RJZCkgPT0gLTEpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdERyb3BMaXN0KGxpc3RJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdElkO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgIG5vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gICAgcGFyZW50OiBBamZOb2RlLFxuICAgIHBhcmVudE5vZGU6IG51bWJlcixcbiAgICBpbkNvbnRlbnQgPSBmYWxzZSxcbiAgICBpbnNlcnRJbkluZGV4ID0gMCxcbiAgKTogdm9pZCB7XG4gICAgbGV0IG5vZGU6IEFqZk5vZGUgfCBBamZGaWVsZDtcbiAgICBjb25zdCBpZCA9ICsrbm9kZVVuaXF1ZUlkO1xuICAgIGNvbnN0IGlzRmllbGROb2RlID0gbm9kZVR5cGUubm9kZVR5cGU/LmZpZWxkICE9IG51bGw7XG4gICAgaWYgKGlzRmllbGROb2RlKSB7XG4gICAgICBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLFxuICAgICAgICBmaWVsZFR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkISxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQuaWQsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVDb250YWluZXJOb2RlKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5ub2RlLFxuICAgICAgICBwYXJlbnQ6IDAsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBub2RlczogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIGNvbnN0IGNuID1cbiAgICAgICAgaXNDb250YWluZXJOb2RlKHBhcmVudCkgJiYgaW5Db250ZW50XG4gICAgICAgICAgPyA8QWpmQ29udGFpbmVyTm9kZT5wYXJlbnRcbiAgICAgICAgICA6IChnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIHBhcmVudCkgYXMgQWpmQ29udGFpbmVyTm9kZSk7XG4gICAgICBpZiAoIWlzRmllbGROb2RlKSB7XG4gICAgICAgIGxldCBuZXdOb2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICBuZXdOb2Rlcy5zcGxpY2UoaW5zZXJ0SW5JbmRleCwgMCwgbm9kZSk7XG4gICAgICAgIG5ld05vZGVzID0gdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5ld05vZGVzKTtcbiAgICAgICAgcmV0dXJuIG5ld05vZGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCk7XG4gICAgICAgIG5ld05vZGVzLnNwbGljZShpbnNlcnRJbkluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY24uaWQsIG5ld05vZGVzKTtcbiAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVOb2RlRW50cnkocHJvcGVydGllczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50LmVtaXQocHJvcGVydGllcyk7XG4gIH1cblxuICBjYW5jZWxOb2RlRW50cnlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuICB9XG5cbiAgZGVsZXRlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudC5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgdGhlIG1vdmVOb2RlIGV2ZW50IHdoZW4gYSBub2RlIGlzIG1vdmVkIGluIHRoZSBmb3JtYnVpbGRlci5cbiAgICogQHBhcmFtIG5vZGVFbnRyeSBUaGUgbm9kZSB0byBiZSBtb3ZlZC5cbiAgICovXG4gIG1vdmVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCA9IHtub2RlRW50cnk6IG5vZGVFbnRyeSwgZnJvbUluZGV4OiBmcm9tLCB0b0luZGV4OiB0b307XG4gICAgdGhpcy5fbW92ZU5vZGVFbnRyeUV2ZW50Lm5leHQobW92ZUV2ZW50KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRGb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuZm9ybSxcbiAgICAgIHRoaXMuX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnMsXG4gICAgICB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgIHRoaXMuY2hvaWNlc09yaWdpbnMsXG4gICAgICB0aGlzLnN0cmluZ0lkZW50aWZpZXIsXG4gICAgXSkucGlwZShcbiAgICAgIGZpbHRlcigoW2Zvcm1dKSA9PiBmb3JtICE9IG51bGwpLFxuICAgICAgbWFwKChbZm9ybSwgbm9kZXMsIGF0dGFjaG1lbnRzT3JpZ2lucywgY2hvaWNlc09yaWdpbnMsIHN0cmluZ0lkZW50aWZpZXJdKSA9PiB7XG4gICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2luczogKGNob2ljZXNPcmlnaW5zIGFzIEFqZkNob2ljZXNPcmlnaW48YW55PltdKS5zbGljZSgwKSxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IChhdHRhY2htZW50c09yaWdpbnMgYXMgQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKS5zbGljZSgwKSxcbiAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiAoKHN0cmluZ0lkZW50aWZpZXIgfHwgW10pIGFzIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pLnNsaWNlKDApLFxuICAgICAgICAgIG5vZGVzOiAobm9kZXMgYXMgQWpmU2xpZGVbXSkuc2xpY2UoMCksXG4gICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogKGZvcm0gYXMgQWpmRm9ybSkuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgY3JlYXRlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luPGFueT4oe25hbWU6ICcnfSkpO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZUNob2ljZXNPcmlnaW4ocGFyYW1zOiB7bGFiZWw6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjaG9pY2VzOiBhbnlbXX0pOiB2b2lkIHtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2luID0gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgIGNob2ljZXNPcmlnaW4ubGFiZWwgPSBwYXJhbXMubGFiZWw7XG4gICAgICBjaG9pY2VzT3JpZ2luLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICAgIGlmIChpc0Nob2ljZXNGaXhlZE9yaWdpbihjaG9pY2VzT3JpZ2luKSkge1xuICAgICAgICBjaG9pY2VzT3JpZ2luLmNob2ljZXMgPSBwYXJhbXMuY2hvaWNlcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KGNob2ljZXNPcmlnaW5zID0+IHtcbiAgICAgICAgY29uc3QgaWR4ID0gY2hvaWNlc09yaWdpbnMuaW5kZXhPZihjaG9pY2VzT3JpZ2luKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMgPSBbXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZSgwLCBpZHgpLFxuICAgICAgICAgICAgY2hvaWNlc09yaWdpbixcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKGlkeCArIDEpLFxuICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMgPSBbLi4uY2hvaWNlc09yaWdpbnMsIGNob2ljZXNPcmlnaW5dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaG9pY2VzT3JpZ2lucztcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlU3RyaW5nSWRlbnRpZmllcihpZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dCgoKSA9PiBbLi4uaWRlbnRpZmllcl0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlczogQWpmTm9kZVtdKTogKEFqZkZvcm1CdWlsZGVyTm9kZSB8IG51bGwpW10ge1xuICAgIHRoaXMuX3VwZGF0ZU5vZGVzTGlzdCgwLCBub2Rlcyk7XG4gICAgY29uc3Qgcm9vdE5vZGVzID0gbm9kZXMuZmlsdGVyKFxuICAgICAgbiA9PiBuLm5vZGVUeXBlID09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8IG4ubm9kZVR5cGUgPT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUsXG4gICAgKTtcbiAgICBpZiAocm9vdE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtudWxsXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vdE5vZGUgPSByb290Tm9kZXNbMF07XG4gICAgaWYgKGlzU2xpZGVzTm9kZShyb290Tm9kZSkpIHtcbiAgICAgIGNvbnN0IHRyZWU6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gW107XG4gICAgICB0cmVlLnB1c2goPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogcm9vdE5vZGUsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZvcm0gZGVmaW5pdGlvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGlkIG9mIGEgZHJvcExpc3QgdG8gYmUgY29ubmVjdGVkIHdpdGggdGhlIEZvcm1CdWlsZGVyIHNvdXJjZSBsaXN0LlxuICAgKiBAcGFyYW0gbGlzdElkIFRoZSBpZCBvZiB0aGUgbGlzdCB0byBjb25uZWN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdERyb3BMaXN0KGxpc3RJZDogc3RyaW5nKSB7XG4gICAgbGV0IGNvbm5lY3RlZExpc3RzID0gdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLnZhbHVlLnNsaWNlKDApO1xuICAgIHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cy5uZXh0KFsuLi5jb25uZWN0ZWRMaXN0cywgbGlzdElkXSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5kTWF4Tm9kZUlkKG5vZGVzOiBBamZOb2RlW10sIF9jdXJNYXhJZCA9IDApOiBudW1iZXIge1xuICAgIGxldCBtYXhJZCA9IDA7XG4gICAgbm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIG4uaWQpO1xuICAgICAgaWYgKGlzQ29udGFpbmVyTm9kZShuKSkge1xuICAgICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCB0aGlzLl9maW5kTWF4Tm9kZUlkKCg8QWpmQ29udGFpbmVyTm9kZT5uKS5ub2RlcykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXhJZDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtLnN1YnNjcmliZSgoZm9ybTogQWpmRm9ybSB8IG51bGwpID0+IHtcbiAgICAgIG5vZGVVbmlxdWVJZCA9IDA7XG4gICAgICBpZiAoZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCAmJiBmb3JtLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZVVuaXF1ZUlkID0gdGhpcy5fZmluZE1heE5vZGVJZChmb3JtLm5vZGVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChfbm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsID8gZm9ybS5ub2Rlcy5zbGljZSgwKSA6IFtdO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgIChfYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10pOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5hdHRhY2htZW50c09yaWdpbnMgIT0gbnVsbFxuICAgICAgICAgICAgPyBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucy5zbGljZSgwKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmNob2ljZXNPcmlnaW5zICE9IG51bGwgPyBmb3JtLmNob2ljZXNPcmlnaW5zLnNsaWNlKDApIDogW107XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dChcbiAgICAgICAgKF86IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uc3RyaW5nSWRlbnRpZmllciAhPSBudWxsXG4gICAgICAgICAgICA/IGZvcm0uc3RyaW5nSWRlbnRpZmllci5zbGljZSgwKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zID0gKDxPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKGNob2ljZXNPcmlnaW5zKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnMgPSB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKFxuICAgICAgICAoYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sIG9wOiBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gb3AoYXR0YWNobWVudHNPcmlnaW5zKTtcbiAgICAgICAgfSxcbiAgICAgICAgW10sXG4gICAgICApLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyID0gdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oKHN0cmluZ0lkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sIG9wOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aoc3RyaW5nSWRlbnRpZmllcik7XG4gICAgICB9LCBbXSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9ICg8T2JzZXJ2YWJsZTxBamZOb2Rlc09wZXJhdGlvbj4+dGhpcy5fbm9kZXNVcGRhdGVzKS5waXBlKFxuICAgICAgc2Nhbigobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICB9LCBbXSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZXNXaXRob3V0Q2hvaWNlT3JpZ2lucyA9ICh0aGlzLl9ub2RlcyBhcyBPYnNlcnZhYmxlPEFqZlNsaWRlW10+KS5waXBlKFxuICAgICAgbWFwKHNsaWRlcyA9PlxuICAgICAgICBzbGlkZXMubWFwKHNsaWRlID0+IHtcbiAgICAgICAgICBzbGlkZS5ub2RlcyA9IChzbGlkZS5ub2RlcyBhcyBBamZGaWVsZFtdKS5tYXAoKG5vZGU6IEFqZkZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZ3YyA9IGRlZXBDb3B5KG5vZGUpO1xuICAgICAgICAgICAgICBpZiAoZndjICYmIGZ3Yy5jaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZ3Yy5jaG9pY2VzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmd2MgJiYgZndjLmNob2ljZXNPcmlnaW4pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZndjLmNob2ljZXNPcmlnaW47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZ3YztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzbGlkZTtcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiBmbGF0dGVuTm9kZXMobm9kZXMpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9mbGF0RmllbGRzID0gdGhpcy5fZmxhdE5vZGVzLnBpcGUoXG4gICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IDxBamZGaWVsZFtdPm5vZGVzLmZpbHRlcihuID0+ICFpc0NvbnRhaW5lck5vZGUobikpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKG5vZGVzID0+IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPnRoaXMuX2J1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXMpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgZmlsdGVyKChbXywgbm9kZUVudHJ5XSkgPT4gbm9kZUVudHJ5ICE9IG51bGwpLFxuICAgICAgICBtYXAoKFtwcm9wZXJ0aWVzLCBuZV0pID0+IHtcbiAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gbmUgYXMgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk7XG4gICAgICAgICAgY29uc3Qgb3JpZ05vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgIG5vZGUuaWQgPSBub2RlRW50cnkubm9kZS5pZDtcbiAgICAgICAgICBub2RlLm5hbWUgPSBwcm9wZXJ0aWVzLm5hbWU7XG4gICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgbm9kZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICAgIHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsXG4gICAgICAgICAgICAgID8gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMudmlzaWJpbGl0eX0pXG4gICAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbFxuICAgICAgICAgICAgICA/IHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcy5tYXAoKGNvbmRpdGlvbjogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICBjb25zdCBuZXdDb25kaXRpb25hbEJyYW5jaGVzID0gbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcblxuICAgICAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgcmVwTm9kZS5mb3JtdWxhUmVwcyA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9ybXVsYVJlcHMgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhUmVwc30pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXBOb2RlLm1pblJlcHMgPSBwcm9wZXJ0aWVzLm1pblJlcHM7XG4gICAgICAgICAgICByZXBOb2RlLm1heFJlcHMgPSBwcm9wZXJ0aWVzLm1heFJlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gbm9kZSBhcyBBamZGaWVsZDtcbiAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHByb3BlcnRpZXMuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgZmllbGQuZm9ybXVsYSA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9ybXVsYSAhPSBudWxsID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhfSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5ID0gcHJvcGVydGllcy5ub3RFbXB0eTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25Db25kaXRpb25zID0gcHJvcGVydGllcy52YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluVmFsdWUsIDEwKTtcbiAgICAgICAgICAgIGxldCBtYXhWYWx1ZTogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgIGxldCBtaW5EaWdpdHM6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pbkRpZ2l0cywgMTApO1xuICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4RGlnaXRzLCAxMCk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obWluVmFsdWUpKSB7XG4gICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtYXhWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTmFOKG1pbkRpZ2l0cykpIHtcbiAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtYXhEaWdpdHMpKSB7XG4gICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGZvcmNlVmFsdWUgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBub3RFbXB0eSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICh2YWxpZGF0aW9uQ29uZGl0aW9ucyAhPSBudWxsICYmIHZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgIG1pblZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWF4VmFsdWUgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubm90RW1wdHkgPSBub3RFbXB0eSA/IG5vdEVtcHR5VmFsaWRhdGlvbigpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heFZhbHVlID0gbWF4VmFsdWUgIT0gbnVsbCA/IG1heFZhbGlkYXRpb24obWF4VmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cyAhPSBudWxsID8gbWluRGlnaXRzVmFsaWRhdGlvbihtaW5EaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heERpZ2l0cyA9IG1heERpZ2l0cyAhPSBudWxsID8gbWF4RGlnaXRzVmFsaWRhdGlvbihtYXhEaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSAodmFsaWRhdGlvbkNvbmRpdGlvbnMgfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAoYzoge2NvbmRpdGlvbjogc3RyaW5nOyBlcnJvck1lc3NhZ2U6IHN0cmluZ30pID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBjLmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub3RFbXB0eVdhcm4gPSBwcm9wZXJ0aWVzLm5vdEVtcHR5V2FybmluZztcbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nID0gZmllbGQud2FybmluZyB8fCBjcmVhdGVXYXJuaW5nR3JvdXAoe30pO1xuICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHdhcm5pbmcuY29uZGl0aW9ucyA9ICh3YXJuaW5nQ29uZGl0aW9ucyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgICh3OiB7Y29uZGl0aW9uOiBzdHJpbmc7IHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PlxuICAgICAgICAgICAgICAgICAgY3JlYXRlV2FybmluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmllbGQud2FybmluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZWxkLm5leHRTbGlkZUNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbn0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBmaWVsZC5zaXplID0gcHJvcGVydGllcy5zaXplO1xuICAgICAgICAgICAgZmllbGQuZGVmYXVsdFZhbHVlID0gcHJvcGVydGllcy5kZWZhdWx0VmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZ3YyA9IDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+ZmllbGQ7XG4gICAgICAgICAgICAgIChmd2MgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmID0gcHJvcGVydGllcy5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgZndjLmZvcmNlTmFycm93ID0gcHJvcGVydGllcy5mb3JjZU5hcnJvdztcbiAgICAgICAgICAgICAgZndjLnRyaWdnZXJDb25kaXRpb25zID0gKHByb3BlcnRpZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgodDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiB0fSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlRmllbGQoZmllbGQpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJmID0gZmllbGQgYXMgQWpmUmFuZ2VGaWVsZDtcbiAgICAgICAgICAgICAgcmYuc3RhcnQgPSBwcm9wZXJ0aWVzLnN0YXJ0O1xuICAgICAgICAgICAgICByZi5lbmQgPSBwcm9wZXJ0aWVzLmVuZDtcbiAgICAgICAgICAgICAgcmYuc3RlcCA9IHByb3BlcnRpZXMuc3RlcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcblxuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IEB0cmlrIGNoZWNrIHRoaXMsIHdhcyBhbHdheXMgdHJ1ZT9cbiAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNuLm5vZGVzLmluZGV4T2Yob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gICBjb25zdCBpZHggPSBub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgLy8gICBub2RlcyA9IG5vZGVzLnNsaWNlKDAsIGlkeCkuY29uY2F0KFtub2RlXSkuY29uY2F0KG5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICBpZiAobmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Q29uZGl0aW9uYWxCcmFuY2hlczsgaSA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RGVsZXRlTm9kZSgpOiB2b2lkIHtcbiAgICAoPE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+PnRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIHN1YnNjcmlwdGlvbiB0byB0aGUgbW92ZU5vZGVFbnRyeUV2ZW50LlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdE1vdmVOb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuX21vdmVOb2RlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIgPSB0aGlzLl9tb3ZlTm9kZUVudHJ5RXZlbnRcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKG1vdmVFdmVudDogQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG1vdmVFdmVudC5ub2RlRW50cnkgYXMgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpIGFzIEFqZkNvbnRhaW5lck5vZGU7XG4gICAgICAgICAgICBsZXQgbmV3Tm9kZXM6IEFqZk5vZGVbXSA9IG5vZGVzO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IGNuLm5vZGVzO1xuICAgICAgICAgICAgICBtb3ZlSXRlbUluQXJyYXkobmV3Tm9kZXMsIG1vdmVFdmVudC5mcm9tSW5kZXgsIG1vdmVFdmVudC50b0luZGV4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY24uaWQsIG5ld05vZGVzKTtcbiAgICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIFwiaWRcIiBhbmQgXCJwYXJlbnRcIiBmaWVsZHMgb2YgYSBtb2RpZmllZCBvciByZWFycmFuZ2VkIGxpc3Qgb2Ygbm9kZXMuXG4gICAqIEBwYXJhbSBjb250YWluZXJJZCBUaGUgaWQgb2YgdGhlIHBhcmVudCBjb250YWluZXIgb2YgdGhlIGxpc3QuXG4gICAqIEBwYXJhbSBub2Rlc0xpc3QgVGhlIGxpc3Qgb2Ygbm9kZXMgdG8gYmUgdXBkYXRlZC5cbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZU5vZGVzTGlzdChjb250YWluZXJJZDogbnVtYmVyLCBub2Rlc0xpc3Q6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gICAgaWYgKCFub2Rlc0xpc3QubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IGNvbnRJZCA9IGNvbnRhaW5lcklkICE9IHVuZGVmaW5lZCA/IGNvbnRhaW5lcklkIDogMDtcbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBub2Rlc0xpc3QubGVuZ3RoOyBpZHgrKykge1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbm9kZXNMaXN0W2lkeF07XG4gICAgICBjdXJyZW50Tm9kZS5pZCA9IGNvbnRJZCAqIDEwMDAgKyBpZHggKyAxO1xuICAgICAgY3VycmVudE5vZGUucGFyZW50ID0gaWR4ID09IDAgPyBjb250SWQgOiBjb250SWQgKiAxMDAwICsgaWR4O1xuICAgICAgaWYgKFxuICAgICAgICBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fFxuICAgICAgICBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IGN1cnJlbnROb2RlIGFzIEFqZlNsaWRlO1xuICAgICAgICBpZiAoY3VycmVudFNsaWRlLm5vZGVzKSB7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlTm9kZXNMaXN0KGN1cnJlbnRTbGlkZS5pZCwgY3VycmVudFNsaWRlLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZXNMaXN0O1xuICB9XG59XG4iXX0=