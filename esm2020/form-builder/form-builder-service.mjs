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
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createContainerNode, createField, createForm, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRangeField, isRepeatingContainerNode, isSlidesNode, isTableField, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning, } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of as obsOf, Subject, Subscription } from 'rxjs';
import { filter, map, shareReplay, scan, withLatestFrom } from 'rxjs/operators';
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
            const supplementaryInformations = (form || {}).supplementaryInformations;
            return createForm({
                choicesOrigins: [...choicesOrigins],
                attachmentsOrigins: [...attachmentsOrigins],
                stringIdentifier: [...(stringIdentifier || [])],
                nodes: [...nodes],
                supplementaryInformations,
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
        }, []), shareReplay(1));
    }
    _initAttachmentsOriginsStreams() {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan((attachmentsOrigins, op) => {
            return op(attachmentsOrigins);
        }, []), shareReplay(1));
    }
    _initStringIdentifierStreams() {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan((stringIdentifier, op) => {
            return op(stringIdentifier);
        }, []), shareReplay(1));
    }
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), shareReplay(1));
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
        this._flatNodes = this._nodes.pipe(map((nodes) => flattenNodes(nodes)), shareReplay(1));
        this._flatFields = this._flatNodes.pipe(map((nodes) => nodes.filter(n => !isContainerNode(n))), shareReplay(1));
        this._nodeEntriesTree = this._nodes.pipe(map(nodes => this._buildFormBuilderNodesTree(nodes)), shareReplay(1));
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
                node.formulaReps =
                    properties.formulaReps != null
                        ? createFormula({ formula: properties.formulaReps })
                        : undefined;
                node.minReps = properties.minReps;
                node.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                node.description = properties.description;
                node.defaultValue = properties.defaultValue;
                node.formula =
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
                    const validation = node.validation || createValidationGroup({});
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
                    node.validation = validation;
                }
                else {
                    node.validation = undefined;
                }
                const notEmptyWarn = properties.notEmptyWarning;
                const warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    const warning = node.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions = (warningConditions || []).map((w) => createWarning({
                        condition: w.condition,
                        warningMessage: w.warningMessage,
                    }));
                    node.warning = warning;
                }
                else {
                    node.warning = undefined;
                }
                node.nextSlideCondition =
                    properties.nextSlideCondition != null
                        ? createCondition({ condition: properties.nextSlideCondition })
                        : undefined;
                node.size = properties.size;
                node.defaultValue = properties.defaultValue;
                if (isFieldWithChoices(node)) {
                    node.choicesOriginRef = properties.choicesOriginRef;
                    node.forceExpanded = properties.forceExpanded;
                    node.forceNarrow = properties.forceNarrow;
                    node.triggerConditions = (properties.triggerConditions || []).map((t) => createCondition({ condition: t }));
                }
                if (isRangeField(node)) {
                    node.start = properties.start;
                    node.end = properties.end;
                    node.step = properties.step;
                }
                if (isTableField(node)) {
                    let { columnTypes, rows, columnLabels, rowLabels } = JSON.parse(properties.tableDef);
                    node.columnTypes = columnTypes || [];
                    node.rows = rows || [];
                    node.columnLabels = columnLabels || [];
                    node.rowLabels = rowLabels || [];
                    node.hideEmptyRows = properties.hideEmptyRows;
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
            if (isSlidesNode(currentNode)) {
                this._updateNodesList(currentNode.id, currentNode.nodes);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBTVosV0FBVyxFQUdYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLFlBQVksRUFDWix3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQXFEOUUsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFxQixFQUFFLElBQWE7SUFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUM5QixPQUFPLENBQUMsQ0FBQztLQUNWO0lBQ0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDZCxPQUFPLEVBQUUsQ0FBQztTQUNYO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLDRCQUE0QixDQUNuQyxLQUFnQixFQUNoQixNQUFlLEVBQ2YseUJBQXlCLEdBQUcsS0FBSztJQUVqQyxNQUFNLE9BQU8sR0FBeUIsS0FBSztTQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDbkMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO1NBQy9DLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNQLE1BQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsT0FBZ0M7WUFDOUIsSUFBSSxFQUFFLENBQUM7WUFDUCxRQUFRO1lBQ1IsT0FBTyxFQUFFLDRCQUE0QixDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDaEQsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1FBQzlCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyw0QkFBNEIsQ0FBQyxNQUFpQixFQUFFLElBQWE7SUFDcEUsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekIsT0FBTyw0QkFBNEIsQ0FBb0IsSUFBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakY7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQWdCO0lBQzNDLElBQUksU0FBUyxHQUFjLEVBQUUsQ0FBQztJQUU5QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBYSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFvQixJQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RTtRQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQ3JCLFNBQW9CLEVBQ3BCLFVBQW1CLEVBQ25CLFNBQXdCLElBQUk7SUFFNUIsT0FBTyxNQUFNLElBQUksSUFBSTtRQUNuQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztRQUM5RSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFnQixFQUFFLEdBQWE7SUFDbEQsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixNQUFNLFNBQVMsR0FBcUIsSUFBSSxDQUFDO1lBQ3pDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDckQ7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLEtBQWdCLEVBQ2hCLFVBQW1CLEVBQ25CLFNBQXdCLElBQUk7SUFFNUIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLElBQUksUUFBUSxHQUFjLEVBQUUsQ0FBQztJQUM3QixJQUFJLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRSxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZFO0lBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsT0FBTyxXQUFXLENBQ2hCLEtBQUssRUFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUN4QixDQUFDO0FBQ0osQ0FBQztBQUVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUdyQixNQUFNLE9BQU8scUJBQXFCO0lBdU1oQztRQXRNUSx3QkFBbUIsR0FBa0M7WUFDM0Q7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDO2dCQUNwRCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBQztnQkFDdEMsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNEO2dCQUNFLEtBQUssRUFBRSxpQkFBaUI7Z0JBQ3hCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFDO2dCQUM3RCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixFQUFDO2dCQUMvQyxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO2dCQUNyRCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBQzthQUNuRTtZQUNEO2dCQUNFLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQztnQkFDbkQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUM7YUFDakU7WUFDRDtnQkFDRSxLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7Z0JBQ3JELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFDO2FBQ25FO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQztnQkFDdEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUM7YUFDcEU7WUFDRDtnQkFDRSxLQUFLLEVBQUUsZUFBZTtnQkFDdEIsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUM7Z0JBQzNELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsWUFBWSxFQUFDO2FBQ3pFO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUM7Z0JBQzdELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsY0FBYyxFQUFDO2FBQzNFO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQztnQkFDdEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUM7YUFDcEU7WUFDRDtnQkFDRSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUM7Z0JBQ25ELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsSUFBSSxFQUFDO2FBQ2pFO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFDO2dCQUN4RCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBQzthQUN0RTtZQUNEO2dCQUNFLEtBQUssRUFBRSxNQUFNO2dCQUNiLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQztnQkFDbkQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUM7YUFDakU7WUFDRDtnQkFDRSxLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUM7Z0JBQ3BELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFDO2FBQ2xFO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDO2dCQUNwRCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBQzthQUNsRTtTQUNGLENBQUM7UUFXTSxVQUFLLEdBQW9DLElBQUksZUFBZSxDQUFpQixJQUFJLENBQUMsQ0FBQztRQUNuRixhQUFRLEdBQStCLElBQUksQ0FBQyxLQUFtQyxDQUFDO1FBWWhGLHdCQUFtQixHQUE0QyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLekUsb0JBQWUsR0FBd0MsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBS2pFLHNCQUFpQixHQUEwQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLckUsK0JBQTBCLEdBQTJCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRCxXQUFNLEdBQTBCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQVUxQyxnQkFBVyxHQUEyQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLaEQscUJBQWdCLEdBQTBDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUs1RTs7V0FFRztRQUNLLHdCQUFtQixHQUE4QixJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUtuRixxQkFBZ0IsR0FDdEIsSUFBSSxlQUFlLENBQWlDLElBQUksQ0FBQyxDQUFDO1FBQ3BELHdCQUFtQixHQUErQyxJQUFJO2FBQzNFLGdCQUE4RCxDQUFDO1FBSzFELHFCQUFnQixHQUN0QixJQUFJLGVBQWUsQ0FBc0IsSUFBSSxDQUFDLENBQUM7UUFDekMsd0JBQW1CLEdBQW9DLElBQUk7YUFDaEUsZ0JBQW1ELENBQUM7UUFLL0MseUJBQW9CLEdBQzFCLElBQUksZUFBZSxDQUErQixJQUFJLENBQUMsQ0FBQztRQUNsRCw0QkFBdUIsR0FBNkMsSUFBSTthQUM3RSxvQkFBZ0UsQ0FBQztRQUs1RCx1QkFBa0IsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsRSwwQkFBcUIsR0FBcUIsSUFBSSxDQUFDLGtCQUFzQyxDQUFDO1FBSXRGLHFCQUFnQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2hFLHdCQUFtQixHQUFxQixJQUFJLENBQUMsZ0JBQW9DLENBQUM7UUFLbEYsa0JBQWEsR0FBK0IsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFDN0UsK0JBQTBCLEdBQ2hDLElBQUksT0FBTyxFQUFrQyxDQUFDO1FBQ3hDLDJCQUFzQixHQUM1QixJQUFJLE9BQU8sRUFBOEIsQ0FBQztRQUNwQyw2QkFBd0IsR0FDOUIsSUFBSSxPQUFPLEVBQW9DLENBQUM7UUFFMUMsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakUsMEJBQXFCLEdBQzNCLElBQUksWUFBWSxFQUEyQixDQUFDO1FBQzlDOztXQUVHO1FBQ0ssd0JBQW1CLEdBQ3pCLElBQUksWUFBWSxFQUEyQixDQUFDO1FBRTlDOztXQUVHO1FBQ0ssaUJBQVksR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUd0RCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBcklEOzs7OztPQUtHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUtEOzs7OztPQUtHO0lBQ0gsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBR0QsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBR0QsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUlELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFHRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUdELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBTUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQU1ELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBTUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFNRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUN0QyxDQUFDO0lBSUQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDcEMsQ0FBQztJQUdELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBbUNEOzs7Ozs7T0FNRztJQUNILE9BQU8sQ0FBQyxJQUFvQjtRQUMxQixJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELGFBQWEsQ0FBQyxTQUFrQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhLENBQUMsU0FBdUI7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsb0JBQW9CLENBQUMsU0FBaUI7UUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNiLE9BQU87U0FDUjtRQUNELENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBYSxFQUFFLFFBQWlCLEtBQUs7UUFDaEQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsaUJBQWlCLEVBQUU7WUFDN0YsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0I7WUFDRCxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsVUFBVSxDQUNSLFFBQXFDLEVBQ3JDLE1BQWUsRUFDZixVQUFrQixFQUNsQixTQUFTLEdBQUcsS0FBSyxFQUNqQixhQUFhLEdBQUcsQ0FBQztRQUVqQixJQUFJLElBQXdCLENBQUM7UUFDN0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUM7UUFDMUIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDO1FBQ3JELElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDakIsRUFBRTtnQkFDRixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVE7Z0JBQzlCLFNBQVMsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQU07Z0JBQ25DLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDakIsVUFBVTtnQkFDVixJQUFJLEVBQUUsRUFBRTthQUNULENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ3pCLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSTtnQkFDaEMsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsVUFBVTtnQkFDVixJQUFJLEVBQUUsRUFBRTtnQkFDUixLQUFLLEVBQUUsRUFBRTthQUNWLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBZ0IsRUFBYSxFQUFFO1lBQ3RELE1BQU0sRUFBRSxHQUNOLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTO2dCQUNsQyxDQUFDLENBQW1CLE1BQU07Z0JBQzFCLENBQUMsQ0FBRSxnQkFBZ0IsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLE1BQU0sQ0FBc0IsQ0FBQztZQUM5RCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QyxPQUFPLFFBQVEsQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsVUFBZTtRQUMzQixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZUFBZSxDQUFDLFNBQWtDO1FBQ2hELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxTQUFrQyxFQUFFLElBQVksRUFBRSxFQUFVO1FBQ3hFLE1BQU0sU0FBUyxHQUE0QixFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJO1lBQ1QsSUFBSSxDQUFDLDBCQUEwQjtZQUMvQixJQUFJLENBQUMsa0JBQWtCO1lBQ3ZCLElBQUksQ0FBQyxjQUFjO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0I7U0FDdEIsQ0FBQyxDQUFDLElBQUksQ0FDTCxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQ2hDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxFQUFFO1lBQzFFLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMseUJBQXlCLENBQUM7WUFDekUsT0FBTyxVQUFVLENBQUM7Z0JBQ2hCLGNBQWMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDO2dCQUNuQyxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzNDLGdCQUFnQixFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDakIseUJBQXlCO2FBQzFCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCLENBQUMsYUFBb0M7UUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQU0sRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsTUFBcUQ7UUFDckUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNELElBQUksYUFBYSxJQUFJLElBQUksRUFBRTtZQUN6QixhQUFhLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDbkMsYUFBYSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2pDLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ3ZDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQzthQUN4QztZQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQ2hELE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ2xELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNaLGNBQWMsR0FBRzt3QkFDZixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzt3QkFDL0IsYUFBYTt3QkFDYixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDakMsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxjQUFjLEdBQUcsQ0FBQyxHQUFHLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ0QsT0FBTyxjQUFjLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELG9CQUFvQixDQUFDLFVBQXFDO1FBQ3hELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEtBQWdCO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FDNUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsaUJBQWlCLENBQ3ZGLENBQUM7UUFDRixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNmO1FBQ0QsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxHQUF5QixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBMEI7Z0JBQ2pDLElBQUksRUFBRSxRQUFRO2dCQUNkLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSw0QkFBNEIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsNEJBQTRCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQzthQUN2RCxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxnQkFBZ0IsQ0FBQyxNQUFjO1FBQ3JDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTyxjQUFjLENBQUMsS0FBZ0IsRUFBRSxTQUFTLEdBQUcsQ0FBQztRQUNwRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFvQixDQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMzRTtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBb0IsRUFBRSxFQUFFO1lBQzVDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0QsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFpQixFQUFhLEVBQUU7Z0JBQ3ZELE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RSxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQ2xDLENBQUMsbUJBQWdELEVBQStCLEVBQUU7Z0JBQ2hGLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSTtvQkFDcEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ1QsQ0FBQyxDQUNGLENBQUM7WUFDRixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUM5QixDQUFDLGVBQXdDLEVBQTJCLEVBQUU7Z0JBQ3BFLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN6RixDQUFDLENBQ0YsQ0FBQztZQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQ2hDLENBQUMsQ0FBNEIsRUFBNkIsRUFBRTtnQkFDMUQsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJO29CQUNsRCxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDVCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDBCQUEwQjtRQUNoQyxJQUFJLENBQUMsZUFBZSxHQUE0QyxDQUM5RCxJQUFJLENBQUMsc0JBQXNCLENBQzNCLENBQUMsSUFBSSxDQUNMLElBQUksQ0FBQyxDQUFDLGNBQXVDLEVBQUUsRUFBOEIsRUFBRSxFQUFFO1lBQy9FLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDTixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFTyw4QkFBOEI7UUFDcEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQzdELElBQUksQ0FDRixDQUFDLGtCQUErQyxFQUFFLEVBQWtDLEVBQUUsRUFBRTtZQUN0RixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFDRCxFQUFFLENBQ0gsRUFDRCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFTyw0QkFBNEI7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQ3pELElBQUksQ0FBQyxDQUFDLGdCQUEyQyxFQUFFLEVBQW9DLEVBQUUsRUFBRTtZQUN6RixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDTixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztJQUNKLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBbUMsSUFBSSxDQUFDLGFBQWMsQ0FBQyxJQUFJLENBQ3BFLElBQUksQ0FBQyxDQUFDLEtBQWdCLEVBQUUsRUFBcUIsRUFBRSxFQUFFO1lBQy9DLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsRUFBRSxFQUFFLENBQUMsRUFDTixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQywwQkFBMEIsR0FBSSxJQUFJLENBQUMsTUFBaUMsQ0FBQyxJQUFJLENBQzVFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsS0FBSyxDQUFDLEtBQUssR0FBSSxLQUFLLENBQUMsS0FBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFjLEVBQUUsRUFBRTtnQkFDL0QsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDNUIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO3dCQUN0QixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7cUJBQ3BCO29CQUNELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLEVBQUU7d0JBQzVCLE9BQU8sR0FBRyxDQUFDLGFBQWEsQ0FBQztxQkFDMUI7b0JBQ0QsT0FBTyxHQUFHLENBQUM7aUJBQ1o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDaEMsR0FBRyxDQUFDLENBQUMsS0FBZ0IsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQzlDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDZixDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLENBQUMsS0FBZ0IsRUFBRSxFQUFFLENBQWEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDN0UsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3RDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUE0QixJQUFJLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDL0UsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLENBQUMsbUJBQW1CO2FBQ3JCLElBQUksQ0FDSCxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUNsRixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxFQUM3QyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixNQUFNLFNBQVMsR0FBRyxFQUE2QixDQUFDO1lBQ2hELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVTtnQkFDYixVQUFVLENBQUMsVUFBVSxJQUFJLElBQUk7b0JBQzNCLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFVBQVUsRUFBQyxDQUFDO29CQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRVgsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO1lBQy9ELElBQUksQ0FBQyxtQkFBbUI7Z0JBQ3RCLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJO29CQUNwQyxDQUFDLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQWlCLEVBQUUsRUFBRSxDQUN2RCxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUM3QjtvQkFDSCxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztZQUUvRCxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsV0FBVztvQkFDZCxVQUFVLENBQUMsV0FBVyxJQUFJLElBQUk7d0JBQzVCLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLFdBQVcsRUFBQyxDQUFDO3dCQUNsRCxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUNuQztZQUVELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDNUMsSUFBSSxDQUFDLE9BQU87b0JBQ1YsVUFBVSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN4RixNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO2dCQUNwQyxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUNyQyxNQUFNLG9CQUFvQixHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDN0QsSUFBSSxRQUFRLEdBQWtCLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLFFBQVEsR0FBa0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2hFLElBQUksU0FBUyxHQUFrQixRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxTQUFTLEdBQWtCLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDbkIsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDakI7Z0JBQ0QsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ2pCO2dCQUNELElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNwQixTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDcEIsU0FBUyxHQUFHLElBQUksQ0FBQztpQkFDbEI7Z0JBQ0QsSUFDRSxVQUFVLElBQUksSUFBSTtvQkFDbEIsUUFBUSxJQUFJLElBQUk7b0JBQ2hCLENBQUMsb0JBQW9CLElBQUksSUFBSSxJQUFJLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2pFLFFBQVEsSUFBSSxJQUFJO29CQUNoQixRQUFRLElBQUksSUFBSTtvQkFDaEIsU0FBUyxJQUFJLElBQUk7b0JBQ2pCLFNBQVMsSUFBSSxJQUFJLEVBQ2pCO29CQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUkscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2hFLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO29CQUNuQyxVQUFVLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUNsRSxVQUFVLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUM3RSxVQUFVLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUM3RSxVQUFVLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ3RGLFVBQVUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDdEYsVUFBVSxDQUFDLFVBQVUsR0FBRyxDQUFDLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDdEQsQ0FBQyxDQUE0QyxFQUFFLEVBQUUsQ0FDL0MsZ0JBQWdCLENBQUM7d0JBQ2YsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO3dCQUN0QixZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVk7cUJBQzdCLENBQUMsQ0FDTCxDQUFDO29CQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2lCQUM5QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztpQkFDN0I7Z0JBQ0QsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztnQkFDaEQsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZELElBQ0UsWUFBWSxJQUFJLElBQUk7b0JBQ3BCLENBQUMsaUJBQWlCLElBQUksSUFBSSxJQUFJLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFDM0Q7b0JBQ0EsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdkQsT0FBTyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2hFLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQ2hELENBQUMsQ0FBOEMsRUFBRSxFQUFFLENBQ2pELGFBQWEsQ0FBQzt3QkFDWixTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7d0JBQ3RCLGNBQWMsRUFBRSxDQUFDLENBQUMsY0FBYztxQkFDakMsQ0FBQyxDQUNMLENBQUM7b0JBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7aUJBQ3hCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO2lCQUMxQjtnQkFDRCxJQUFJLENBQUMsa0JBQWtCO29CQUNyQixVQUFVLENBQUMsa0JBQWtCLElBQUksSUFBSTt3QkFDbkMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsa0JBQWtCLEVBQUMsQ0FBQzt3QkFDN0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBRTVDLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzNCLElBQVksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO29CQUMxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FDOUUsZUFBZSxDQUFDLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQ2hDLENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO29CQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7aUJBQzdCO2dCQUVELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QixJQUFJLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25GLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxJQUFJLEVBQUUsQ0FBQztvQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksSUFBSSxFQUFFLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO2lCQUMvQzthQUNGO1lBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVqQyxPQUFPLENBQUMsS0FBZ0IsRUFBYSxFQUFFO2dCQUNyQyxJQUFJLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ2QsMkNBQTJDO29CQUMzQywrQkFBK0I7b0JBQy9CLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO29CQUN4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwQixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7b0JBQ3BCLElBQUksWUFBWSxFQUFFO3dCQUNoQixLQUFLLEdBQUcsUUFBUSxDQUFDO3FCQUNsQjt5QkFBTTt3QkFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEI7b0JBQ0QsV0FBVztvQkFDWCx5Q0FBeUM7b0JBQ3pDLDZFQUE2RTtvQkFDN0UsSUFBSTtvQkFDSixJQUFJLHNCQUFzQixHQUFHLHNCQUFzQixFQUFFO3dCQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLHNCQUFzQixFQUFFLENBQUMsR0FBRyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDcEUsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQzNDO3FCQUNGO2lCQUNGO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyxlQUFlO1FBQ2lCLElBQUksQ0FBQyxxQkFBc0I7YUFDOUQsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLFNBQWtDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0IsT0FBTyxDQUFDLEtBQWdCLEVBQWEsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDNUIsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNkLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO29CQUN4QyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7b0JBQ3BCLElBQUksWUFBWSxFQUFFO3dCQUNoQixLQUFLLEdBQUcsUUFBUSxDQUFDO3FCQUNsQjt5QkFBTTt3QkFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDeEI7aUJBQ0Y7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ssYUFBYTtRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjthQUN6QyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsU0FBa0MsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsS0FBZ0IsRUFBYSxFQUFFO2dCQUNyQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBb0MsQ0FBQztnQkFDakUsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDNUIsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxJQUFJLENBQXFCLENBQUM7Z0JBQzdELElBQUksUUFBUSxHQUFjLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNkLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO29CQUN4QyxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztvQkFDcEIsZUFBZSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEUsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNsRCxFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztvQkFDcEIsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLEtBQUssR0FBRyxRQUFRLENBQUM7cUJBQ2xCO3lCQUFNO3dCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4QjtpQkFDRjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNIO2FBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGdCQUFnQixDQUFDLFdBQW1CLEVBQUUsU0FBb0I7UUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDckIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE1BQU0sTUFBTSxHQUFHLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQy9DLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxXQUFXLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN6QyxXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7WUFDN0QsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxRDtTQUNGO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7a0hBdnhCVSxxQkFBcUI7c0hBQXJCLHFCQUFxQjsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbixcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRmllbGQsXG4gIEFqZkZpZWxkVHlwZSxcbiAgQWpmRm9ybSxcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsXG4gIEFqZk5vZGUsXG4gIEFqZk5vZGVHcm91cCxcbiAgQWpmTm9kZXNPcGVyYXRpb24sXG4gIEFqZk5vZGVUeXBlLFxuICBBamZSZXBlYXRpbmdTbGlkZSxcbiAgQWpmU2xpZGUsXG4gIGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbixcbiAgY3JlYXRlQ29udGFpbmVyTm9kZSxcbiAgY3JlYXRlRmllbGQsXG4gIGNyZWF0ZUZvcm0sXG4gIGNyZWF0ZVZhbGlkYXRpb24sXG4gIGNyZWF0ZVZhbGlkYXRpb25Hcm91cCxcbiAgY3JlYXRlV2FybmluZyxcbiAgY3JlYXRlV2FybmluZ0dyb3VwLFxuICBpc0Nob2ljZXNGaXhlZE9yaWdpbixcbiAgaXNDb250YWluZXJOb2RlLFxuICBpc0ZpZWxkLFxuICBpc0ZpZWxkV2l0aENob2ljZXMsXG4gIGlzUmFuZ2VGaWVsZCxcbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlLFxuICBpc1NsaWRlc05vZGUsXG4gIGlzVGFibGVGaWVsZCxcbiAgbWF4RGlnaXRzVmFsaWRhdGlvbixcbiAgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbixcbiAgbWluVmFsaWRhdGlvbixcbiAgbm90RW1wdHlWYWxpZGF0aW9uLFxuICBub3RFbXB0eVdhcm5pbmcsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBjcmVhdGVDb25kaXRpb24sIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7bW92ZUl0ZW1JbkFycmF5fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzY2FuLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbixcbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkge1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uOiB7Zm9udFNldDogc3RyaW5nOyBmb250SWNvbjogc3RyaW5nfTtcbiAgbm9kZVR5cGU6IHtcbiAgICBub2RlOiBBamZOb2RlVHlwZTtcbiAgICBmaWVsZD86IEFqZkZpZWxkVHlwZTtcbiAgfTtcbiAgaXNTbGlkZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICBub2RlOiBBamZOb2RlO1xuICBjb250YWluZXI6IEFqZkNvbnRhaW5lck5vZGUgfCBudWxsO1xuICBjaGlsZHJlbjogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbiAgY29udGVudDogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCB7XG4gIHBhcmVudDogQWpmTm9kZTtcbiAgcGFyZW50Tm9kZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBub2RlJ3MgcG9zaXRpb24gY2hhbmdlIGluIHRoZSBmb3JtYnVpbGRlci5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck1vdmVFdmVudCB7XG4gIC8qKlxuICAgKiBUaGUgbm9kZSBiZWluZyBtb3ZlZC5cbiAgICovXG4gIG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIG5vZGUgcHJldmlvdXMgcG9zaXRpb24uXG4gICAqL1xuICBmcm9tSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBub2RlIG5ldyBwb3NpdGlvbi5cbiAgICovXG4gIHRvSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBBamZGb3JtQnVpbGRlckVtcHR5U2xvdDtcbmV4cG9ydCB0eXBlIEFqZkNvbnRhaW5lck5vZGUgPSBBamZTbGlkZSB8IEFqZlJlcGVhdGluZ1NsaWRlIHwgQWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfSB8IG51bGwge1xuICBpZiAoYy5ub2Rlcy5pbmRleE9mKG5vZGUpID4gLTEpIHtcbiAgICByZXR1cm4gYztcbiAgfVxuICBjb25zdCBjbnMgPSBjLm5vZGVzLmZpbHRlcihuID0+IGlzQ29udGFpbmVyTm9kZShuKSk7XG4gIGNvbnN0IGxlbiA9IGNucy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjbiA9IGdldE5vZGVDb250YWluZXIoPEFqZkNvbnRhaW5lck5vZGU+Y25zW2ldLCBub2RlKTtcbiAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShcbiAgbm9kZXM6IEFqZk5vZGVbXSxcbiAgcGFyZW50OiBBamZOb2RlLFxuICBpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzID0gZmFsc2UsXG4pOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGNvbnN0IGVudHJpZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gbm9kZXNcbiAgICAuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudC5pZClcbiAgICAuc29ydCgobjEsIG4yKSA9PiBuMS5wYXJlbnROb2RlIC0gbjIucGFyZW50Tm9kZSlcbiAgICAubWFwKG4gPT4ge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCBuKTtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7cGFyZW50OiBuLCBwYXJlbnROb2RlOiAwfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogbixcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIG4pLFxuICAgICAgfTtcbiAgICB9KTtcbiAgaWYgKCFpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgY29uc3QgZW50cmllc051bSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNicyA9IHBhcmVudC5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gZW50cmllc051bTsgaSA8IGNiczsgaSsrKSB7XG4gICAgICBlbnRyaWVzLnB1c2goe3BhcmVudDogcGFyZW50LCBwYXJlbnROb2RlOiBpfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnRyaWVzO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KF9ub2RlczogQWpmTm9kZVtdLCBub2RlOiBBamZOb2RlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzLCBub2RlLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBmbGF0Tm9kZXMgPSBmbGF0Tm9kZXMuY29uY2F0KGZsYXR0ZW5Ob2RlcygoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMpKTtcbiAgICB9XG4gICAgZmxhdE5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG5cbmZ1bmN0aW9uIGdldERlc2NlbmRhbnRzKFxuICBmbGF0Tm9kZXM6IEFqZk5vZGVbXSxcbiAgcGFyZW50Tm9kZTogQWpmTm9kZSxcbiAgYnJhbmNoOiBudW1iZXIgfCBudWxsID0gbnVsbCxcbik6IEFqZk5vZGVbXSB7XG4gIHJldHVybiBicmFuY2ggIT0gbnVsbFxuICAgID8gZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkICYmIG4ucGFyZW50Tm9kZSA9PT0gYnJhbmNoKVxuICAgIDogZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSA8QWpmQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgY29udGFpbmVyLm5vZGVzID0gcmVtb3ZlTm9kZXMoY29udGFpbmVyLm5vZGVzLCBpZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZXMuZmlsdGVyKG4gPT4gaWRzLmluZGV4T2Yobi5pZCkgPT09IC0xKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZVN1YnRyZWUoXG4gIG5vZGVzOiBBamZOb2RlW10sXG4gIHBhcmVudE5vZGU6IEFqZk5vZGUsXG4gIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4pOiBBamZOb2RlW10ge1xuICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXMobm9kZXMpO1xuICBsZXQgZGVsTm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBsZXQgZGVzY2VuZGFudHMgPSBnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIHBhcmVudE5vZGUsIGJyYW5jaCk7XG4gIGNvbnN0IGxlbiA9IGRlc2NlbmRhbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgZGVzY2VuZGFudHNbaV0pKTtcbiAgfVxuICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChkZXNjZW5kYW50cyk7XG4gIHJldHVybiByZW1vdmVOb2RlcyhcbiAgICBub2RlcyxcbiAgICBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSxcbiAgKTtcbn1cblxubGV0IG5vZGVVbmlxdWVJZCA9IDA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmVwZWF0aW5nIHNsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJlcGVhdGluZ3NsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1N0cmluZycsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zdHJpbmcnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU3RyaW5nfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdOdW1iZXInLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbnVtYmVyJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk51bWJlcn0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Jvb2xlYW4nLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtYm9vbGVhbid9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Cb29sZWFufSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW11bHRpcGxlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRm9ybXVsYScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1mb3JtdWxhJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkZvcm11bGF9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUgaW5wdXQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZWlucHV0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGVJbnB1dH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RpbWUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGltZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UaW1lfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSYW5nZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1yYW5nZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5SYW5nZX0sXG4gICAgfSxcbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9mb3JtT2JzOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiA9IHRoaXMuX2Zvcm0gYXMgT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgZWRpdGVkIGZvcm0gc3RyZWFtXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1PYnM7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnM6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IGF0dGFjaG1lbnRzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2htZW50c09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4gPSBvYnNPZihbXSk7XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllcjogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IHN0cmluZ0lkZW50aWZpZXIoKTogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ0lkZW50aWZpZXI7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZlNsaWRlW10+ID0gb2JzT2YoW10pO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+ID0gb2JzT2YoW10pO1xuICBnZXQgbm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB8IHVuZGVmaW5lZDtcbiAgZ2V0IGZsYXROb2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0RmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+ID0gb2JzT2YoW10pO1xuICBnZXQgZmxhdEZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdEZpZWxkcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBkcm9wTGlzdHMgY29ubmVjdGVkIHRvIHRoZSBzb3VyY2UgbGlzdC5cbiAgICovXG4gIHByaXZhdGUgX2Nvbm5lY3RlZERyb3BMaXN0czogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgZ2V0IGNvbm5lY3RlZERyb3BMaXN0cygpOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5OiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZE5vZGVFbnRyeSBhcyBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD47XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkTm9kZUVudHJ5T2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uOiBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZENvbmRpdGlvbiBhcyBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+O1xuICBnZXQgZWRpdGVkQ29uZGl0aW9uKCk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW5PYnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4gPSB0aGlzXG4gICAgLl9lZGl0ZWRDaG9pY2VzT3JpZ2luIGFzIE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD47XG4gIGdldCBlZGl0ZWRDaG9pY2VzT3JpZ2luKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZSBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuICBnZXQgYmVmb3JlTm9kZXNVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlT2JzO1xuICB9XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hZnRlck5vZGVVcGRhdGUgYXMgT2JzZXJ2YWJsZTx2b2lkPjtcbiAgZ2V0IGFmdGVyTm9kZVVwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzOiBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwcml2YXRlIF9kZWxldGVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4oKTtcbiAgLyoqXG4gICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIHBvc2l0aW9uIG9mIGEgbm9kZSBpbiBhIHRyZWUgY2hhbmdlcy5cbiAgICovXG4gIHByaXZhdGUgX21vdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck1vdmVFdmVudD4oKTtcblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byB0aGUgbW92ZU5vZGVFbnRyeUV2ZW50IGV2ZW50IGVtaXR0ZXI7XG4gICAqL1xuICBwcml2YXRlIF9tb3ZlTm9kZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U2F2ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0TW92ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0RGVsZXRlTm9kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgZWRpdGVkIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChmb3JtICE9PSB0aGlzLl9mb3JtLmdldFZhbHVlKCkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dChmb3JtKTtcbiAgICB9XG4gIH1cblxuICBlZGl0Tm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbihjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KGNvbmRpdGlvbik7XG4gIH1cblxuICBzYXZlQ3VycmVudENvbmRpdGlvbihjb25kaXRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjID0gdGhpcy5fZWRpdGVkQ29uZGl0aW9uLmdldFZhbHVlKCk7XG4gICAgaWYgKGMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChudWxsKTtcbiAgfVxuXG4gIGNhbmNlbENvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgYXNzaWduTGlzdElkKG5vZGU6IEFqZk5vZGUsIGVtcHR5OiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgY29uc3QgbGlzdElkID0gZW1wdHkgPyBgZW1wdHlfZmllbGRzX2xpc3RfJHtub2RlLmlkfWAgOiBgZmllbGRzX2xpc3RfJHtub2RlLmlkfWA7XG4gICAgICBpZiAodGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLnZhbHVlLmluZGV4T2YobGlzdElkKSA9PSAtMSkge1xuICAgICAgICB0aGlzLl9jb25uZWN0RHJvcExpc3QobGlzdElkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsaXN0SWQ7XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGluc2VydE5vZGUoXG4gICAgbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgICBwYXJlbnQ6IEFqZk5vZGUsXG4gICAgcGFyZW50Tm9kZTogbnVtYmVyLFxuICAgIGluQ29udGVudCA9IGZhbHNlLFxuICAgIGluc2VydEluSW5kZXggPSAwLFxuICApOiB2b2lkIHtcbiAgICBsZXQgbm9kZTogQWpmTm9kZSB8IEFqZkZpZWxkO1xuICAgIGNvbnN0IGlkID0gKytub2RlVW5pcXVlSWQ7XG4gICAgY29uc3QgaXNGaWVsZE5vZGUgPSBub2RlVHlwZS5ub2RlVHlwZT8uZmllbGQgIT0gbnVsbDtcbiAgICBpZiAoaXNGaWVsZE5vZGUpIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsXG4gICAgICAgIGZpZWxkVHlwZTogbm9kZVR5cGUubm9kZVR5cGUuZmllbGQhLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudC5pZCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGNyZWF0ZUNvbnRhaW5lck5vZGUoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLm5vZGUsXG4gICAgICAgIHBhcmVudDogMCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIG5vZGVzOiBbXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgY29uc3QgY24gPVxuICAgICAgICBpc0NvbnRhaW5lck5vZGUocGFyZW50KSAmJiBpbkNvbnRlbnRcbiAgICAgICAgICA/IDxBamZDb250YWluZXJOb2RlPnBhcmVudFxuICAgICAgICAgIDogKGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgcGFyZW50KSBhcyBBamZDb250YWluZXJOb2RlKTtcbiAgICAgIGlmICghaXNGaWVsZE5vZGUpIHtcbiAgICAgICAgbGV0IG5ld05vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgIG5ld05vZGVzLnNwbGljZShpbnNlcnRJbkluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoMCwgbmV3Tm9kZXMpO1xuICAgICAgICByZXR1cm4gbmV3Tm9kZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgbmV3Tm9kZXMuc3BsaWNlKGluc2VydEluSW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZU5vZGVFbnRyeShwcm9wZXJ0aWVzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnQuZW1pdChwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbmNlbE5vZGVFbnRyeUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gIH1cblxuICBkZWxldGVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB0aGUgbW92ZU5vZGUgZXZlbnQgd2hlbiBhIG5vZGUgaXMgbW92ZWQgaW4gdGhlIGZvcm1idWlsZGVyLlxuICAgKiBAcGFyYW0gbm9kZUVudHJ5IFRoZSBub2RlIHRvIGJlIG1vdmVkLlxuICAgKi9cbiAgbW92ZU5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBtb3ZlRXZlbnQ6IEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50ID0ge25vZGVFbnRyeTogbm9kZUVudHJ5LCBmcm9tSW5kZXg6IGZyb20sIHRvSW5kZXg6IHRvfTtcbiAgICB0aGlzLl9tb3ZlTm9kZUVudHJ5RXZlbnQubmV4dChtb3ZlRXZlbnQpO1xuICB9XG5cbiAgZ2V0Q3VycmVudEZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5mb3JtLFxuICAgICAgdGhpcy5fbm9kZXNXaXRob3V0Q2hvaWNlT3JpZ2lucyxcbiAgICAgIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgdGhpcy5jaG9pY2VzT3JpZ2lucyxcbiAgICAgIHRoaXMuc3RyaW5nSWRlbnRpZmllcixcbiAgICBdKS5waXBlKFxuICAgICAgZmlsdGVyKChbZm9ybV0pID0+IGZvcm0gIT0gbnVsbCksXG4gICAgICBtYXAoKFtmb3JtLCBub2RlcywgYXR0YWNobWVudHNPcmlnaW5zLCBjaG9pY2VzT3JpZ2lucywgc3RyaW5nSWRlbnRpZmllcl0pID0+IHtcbiAgICAgICAgY29uc3Qgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyA9IChmb3JtIHx8IHt9KS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zO1xuICAgICAgICByZXR1cm4gY3JlYXRlRm9ybSh7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnM6IFsuLi5jaG9pY2VzT3JpZ2luc10sXG4gICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zOiBbLi4uYXR0YWNobWVudHNPcmlnaW5zXSxcbiAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiBbLi4uKHN0cmluZ0lkZW50aWZpZXIgfHwgW10pXSxcbiAgICAgICAgICBub2RlczogWy4uLm5vZGVzXSxcbiAgICAgICAgICBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zLFxuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoY2hvaWNlc09yaWdpbnMgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBjaG9pY2VzT3JpZ2lucy5pbmRleE9mKGNob2ljZXNPcmlnaW4pO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFtcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKDAsIGlkeCksXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2luLFxuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoaWR4ICsgMSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFsuLi5jaG9pY2VzT3JpZ2lucywgY2hvaWNlc09yaWdpbl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXNPcmlnaW5zO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKGlkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KCgpID0+IFsuLi5pZGVudGlmaWVyXSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlIHwgbnVsbClbXSB7XG4gICAgdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5vZGVzKTtcbiAgICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIoXG4gICAgICBuID0+IG4ubm9kZVR5cGUgPT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHwgbi5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSxcbiAgICApO1xuICAgIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW251bGxdO1xuICAgIH1cbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3ROb2Rlc1swXTtcbiAgICBpZiAoaXNTbGlkZXNOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgY29uc3QgdHJlZTogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBbXTtcbiAgICAgIHRyZWUucHVzaCg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiByb290Tm9kZSxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCByb290Tm9kZSksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybSBkZWZpbml0aW9uJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgaWQgb2YgYSBkcm9wTGlzdCB0byBiZSBjb25uZWN0ZWQgd2l0aCB0aGUgRm9ybUJ1aWxkZXIgc291cmNlIGxpc3QuXG4gICAqIEBwYXJhbSBsaXN0SWQgVGhlIGlkIG9mIHRoZSBsaXN0IHRvIGNvbm5lY3QuXG4gICAqL1xuICBwcml2YXRlIF9jb25uZWN0RHJvcExpc3QobGlzdElkOiBzdHJpbmcpIHtcbiAgICBsZXQgY29ubmVjdGVkTGlzdHMgPSB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMudmFsdWUuc2xpY2UoMCk7XG4gICAgdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLm5leHQoWy4uLmNvbm5lY3RlZExpc3RzLCBsaXN0SWRdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgbi5pZCk7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKG4pKSB7XG4gICAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHRoaXMuX2ZpbmRNYXhOb2RlSWQoKDxBamZDb250YWluZXJOb2RlPm4pLm5vZGVzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1heElkO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm0uc3Vic2NyaWJlKChmb3JtOiBBamZGb3JtIHwgbnVsbCkgPT4ge1xuICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgKF9hdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSk6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucyAhPSBudWxsXG4gICAgICAgICAgICA/IGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAoX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSk6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KFxuICAgICAgICAoXzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10gPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGxcbiAgICAgICAgICAgID8gZm9ybS5zdHJpbmdJZGVudGlmaWVyLnNsaWNlKDApXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSAoPE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChjaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sIG9wOiBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3AoY2hvaWNlc09yaWdpbnMpO1xuICAgICAgfSwgW10pLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICB9LFxuICAgICAgICBbXSxcbiAgICAgICksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgc2Nhbigoc3RyaW5nSWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSwgb3A6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChzdHJpbmdJZGVudGlmaWVyKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpLnBpcGUoXG4gICAgICBzY2FuKChub2RlczogQWpmTm9kZVtdLCBvcDogQWpmTm9kZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zID0gKHRoaXMuX25vZGVzIGFzIE9ic2VydmFibGU8QWpmU2xpZGVbXT4pLnBpcGUoXG4gICAgICBtYXAoc2xpZGVzID0+XG4gICAgICAgIHNsaWRlcy5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLm5vZGVzID0gKHNsaWRlLm5vZGVzIGFzIEFqZkZpZWxkW10pLm1hcCgobm9kZTogQWpmRmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgZndjID0gZGVlcENvcHkobm9kZSk7XG4gICAgICAgICAgICAgIGlmIChmd2MgJiYgZndjLmNob2ljZXMpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZndjLmNob2ljZXM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZ3YyAmJiBmd2MuY2hvaWNlc09yaWdpbikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmd2MuY2hvaWNlc09yaWdpbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZndjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlO1xuICAgICAgICB9KSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IGZsYXR0ZW5Ob2Rlcyhub2RlcykpLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gPEFqZkZpZWxkW10+bm9kZXMuZmlsdGVyKG4gPT4gIWlzQ29udGFpbmVyTm9kZShuKSkpLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAobm9kZXMgPT4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+dGhpcy5fYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlcykpLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTYXZlTm9kZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnRcbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmVkaXRlZE5vZGVFbnRyeSwgdGhpcy5jaG9pY2VzT3JpZ2lucywgdGhpcy5hdHRhY2htZW50c09yaWdpbnMpLFxuICAgICAgICBmaWx0ZXIoKFtfLCBub2RlRW50cnldKSA9PiBub2RlRW50cnkgIT0gbnVsbCksXG4gICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5lXSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICBjb25zdCBub2RlRW50cnkgPSBuZSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBkZWVwQ29weShvcmlnTm9kZSk7XG4gICAgICAgICAgbm9kZS5pZCA9IG5vZGVFbnRyeS5ub2RlLmlkO1xuICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICBub2RlLmxhYmVsID0gcHJvcGVydGllcy5sYWJlbDtcbiAgICAgICAgICBub2RlLnZpc2liaWxpdHkgPVxuICAgICAgICAgICAgcHJvcGVydGllcy52aXNpYmlsaXR5ICE9IG51bGxcbiAgICAgICAgICAgICAgPyBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogcHJvcGVydGllcy52aXNpYmlsaXR5fSlcbiAgICAgICAgICAgICAgOiBudWxsO1xuXG4gICAgICAgICAgY29uc3Qgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgICAgIHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsXG4gICAgICAgICAgICAgID8gcHJvcGVydGllcy5jb25kaXRpb25hbEJyYW5jaGVzLm1hcCgoY29uZGl0aW9uOiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbn0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgICAgIGNvbnN0IG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgbm9kZS5mb3JtdWxhUmVwcyA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9ybXVsYVJlcHMgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhUmVwc30pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2RlLm1pblJlcHMgPSBwcm9wZXJ0aWVzLm1pblJlcHM7XG4gICAgICAgICAgICBub2RlLm1heFJlcHMgPSBwcm9wZXJ0aWVzLm1heFJlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGUuZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgbm9kZS5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIG5vZGUuZm9ybXVsYSA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9ybXVsYSAhPSBudWxsID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhfSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5ID0gcHJvcGVydGllcy5ub3RFbXB0eTtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25Db25kaXRpb25zID0gcHJvcGVydGllcy52YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluVmFsdWUsIDEwKTtcbiAgICAgICAgICAgIGxldCBtYXhWYWx1ZTogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgIGxldCBtaW5EaWdpdHM6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pbkRpZ2l0cywgMTApO1xuICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyIHwgbnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4RGlnaXRzLCAxMCk7XG4gICAgICAgICAgICBpZiAoaXNOYU4obWluVmFsdWUpKSB7XG4gICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtYXhWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTmFOKG1pbkRpZ2l0cykpIHtcbiAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtYXhEaWdpdHMpKSB7XG4gICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGZvcmNlVmFsdWUgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBub3RFbXB0eSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICh2YWxpZGF0aW9uQ29uZGl0aW9ucyAhPSBudWxsICYmIHZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgIG1pblZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWF4VmFsdWUgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBub2RlLnZhbGlkYXRpb24gfHwgY3JlYXRlVmFsaWRhdGlvbkdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbi5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluVmFsdWUgPSBtaW5WYWx1ZSAhPSBudWxsID8gbWluVmFsaWRhdGlvbihtaW5WYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4VmFsdWUgPSBtYXhWYWx1ZSAhPSBudWxsID8gbWF4VmFsaWRhdGlvbihtYXhWYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID0gbWluRGlnaXRzICE9IG51bGwgPyBtaW5EaWdpdHNWYWxpZGF0aW9uKG1pbkRpZ2l0cykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID0gbWF4RGlnaXRzICE9IG51bGwgPyBtYXhEaWdpdHNWYWxpZGF0aW9uKG1heERpZ2l0cykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9ICh2YWxpZGF0aW9uQ29uZGl0aW9ucyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgIChjOiB7Y29uZGl0aW9uOiBzdHJpbmc7IGVycm9yTWVzc2FnZTogc3RyaW5nfSkgPT5cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZVZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb246IGMuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG5vZGUudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBub3RFbXB0eVdhcm4gPSBwcm9wZXJ0aWVzLm5vdEVtcHR5V2FybmluZztcbiAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nID0gbm9kZS53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgIHdhcm5pbmcubm90RW1wdHkgPSBub3RFbXB0eVdhcm4gPyBub3RFbXB0eVdhcm5pbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgd2FybmluZy5jb25kaXRpb25zID0gKHdhcm5pbmdDb25kaXRpb25zIHx8IFtdKS5tYXAoXG4gICAgICAgICAgICAgICAgKHc6IHtjb25kaXRpb246IHN0cmluZzsgd2FybmluZ01lc3NhZ2U6IHN0cmluZ30pID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiB3LmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgd2FybmluZ01lc3NhZ2U6IHcud2FybmluZ01lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgbm9kZS53YXJuaW5nID0gd2FybmluZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5vZGUud2FybmluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUubmV4dFNsaWRlQ29uZGl0aW9uID1cbiAgICAgICAgICAgICAgcHJvcGVydGllcy5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5vZGUuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgIG5vZGUuZGVmYXVsdFZhbHVlID0gcHJvcGVydGllcy5kZWZhdWx0VmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgKG5vZGUgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmID0gcHJvcGVydGllcy5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgICBub2RlLmZvcmNlRXhwYW5kZWQgPSBwcm9wZXJ0aWVzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICAgIG5vZGUuZm9yY2VOYXJyb3cgPSBwcm9wZXJ0aWVzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgICBub2RlLnRyaWdnZXJDb25kaXRpb25zID0gKHByb3BlcnRpZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgodDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiB0fSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5zdGFydCA9IHByb3BlcnRpZXMuc3RhcnQ7XG4gICAgICAgICAgICAgIG5vZGUuZW5kID0gcHJvcGVydGllcy5lbmQ7XG4gICAgICAgICAgICAgIG5vZGUuc3RlcCA9IHByb3BlcnRpZXMuc3RlcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzVGFibGVGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgICBsZXQge2NvbHVtblR5cGVzLCByb3dzLCBjb2x1bW5MYWJlbHMsIHJvd0xhYmVsc30gPSBKU09OLnBhcnNlKHByb3BlcnRpZXMudGFibGVEZWYpO1xuICAgICAgICAgICAgICBub2RlLmNvbHVtblR5cGVzID0gY29sdW1uVHlwZXMgfHwgW107XG4gICAgICAgICAgICAgIG5vZGUucm93cyA9IHJvd3MgfHwgW107XG4gICAgICAgICAgICAgIG5vZGUuY29sdW1uTGFiZWxzID0gY29sdW1uTGFiZWxzIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlLnJvd0xhYmVscyA9IHJvd0xhYmVscyB8fCBbXTtcbiAgICAgICAgICAgICAgbm9kZS5oaWRlRW1wdHlSb3dzID0gcHJvcGVydGllcy5oaWRlRW1wdHlSb3dzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuXG4gICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgb3JpZ05vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAvLyBpZiAoY24gaW5zdGFuY2VvZiBBamZOb2RlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgIGxldCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyAgIGNvbnN0IGlkeCA9IG5vZGVzLmluZGV4T2Yob3JpZ05vZGUpO1xuICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgIGlmIChuZXdDb25kaXRpb25hbEJyYW5jaGVzIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBub2RlcyA9IGRlbGV0ZU5vZGVTdWJ0cmVlKG5vZGVzLCBub2RlLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KSA9PiB7XG4gICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW92ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3ZlTm9kZVN1YiA9IHRoaXMuX21vdmVOb2RlRW50cnlFdmVudFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gbW92ZUV2ZW50Lm5vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgbm9kZSkgYXMgQWpmQ29udGFpbmVyTm9kZTtcbiAgICAgICAgICAgIGxldCBuZXdOb2RlczogQWpmTm9kZVtdID0gbm9kZXM7XG4gICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIG5ld05vZGVzID0gY24ubm9kZXM7XG4gICAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheShuZXdOb2RlcywgbW92ZUV2ZW50LmZyb21JbmRleCwgbW92ZUV2ZW50LnRvSW5kZXgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgXCJpZFwiIGFuZCBcInBhcmVudFwiIGZpZWxkcyBvZiBhIG1vZGlmaWVkIG9yIHJlYXJyYW5nZWQgbGlzdCBvZiBub2Rlcy5cbiAgICogQHBhcmFtIGNvbnRhaW5lcklkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lciBvZiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIG5vZGVzTGlzdCBUaGUgbGlzdCBvZiBub2RlcyB0byBiZSB1cGRhdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTm9kZXNMaXN0KGNvbnRhaW5lcklkOiBudW1iZXIsIG5vZGVzTGlzdDogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBpZiAoIW5vZGVzTGlzdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgY29udElkID0gY29udGFpbmVySWQgIT0gdW5kZWZpbmVkID8gY29udGFpbmVySWQgOiAwO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IG5vZGVzTGlzdC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBub2Rlc0xpc3RbaWR4XTtcbiAgICAgIGN1cnJlbnROb2RlLmlkID0gY29udElkICogMTAwMCArIGlkeCArIDE7XG4gICAgICBjdXJyZW50Tm9kZS5wYXJlbnQgPSBpZHggPT0gMCA/IGNvbnRJZCA6IGNvbnRJZCAqIDEwMDAgKyBpZHg7XG4gICAgICBpZiAoaXNTbGlkZXNOb2RlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY3VycmVudE5vZGUuaWQsIGN1cnJlbnROb2RlLm5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzTGlzdDtcbiAgfVxufVxuIl19