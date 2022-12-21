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
    if (c.nodes.indexOf(node) > -1 || c.nodes.map(n => n.id).indexOf(node.id) > -1) {
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
function getDefaultValue(value, node) {
    let defaultValue = value && value.trim() != '' ? value : null;
    if (defaultValue) {
        switch (node.fieldType) {
            case AjfFieldType.Boolean:
                return defaultValue === 'true' || defaultValue === '1';
            case AjfFieldType.MultipleChoice:
                return [defaultValue];
            case AjfFieldType.Number:
                const v = +defaultValue;
                return isNaN(v) ? 0 : v;
        }
    }
    return defaultValue;
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
                node.defaultValue = getDefaultValue(properties.defaultValue, node);
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
                    const idx = cn.nodes.map(n => n.id).indexOf(origNode.id);
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
                    const idx = cn.nodes.map(n => n.id).indexOf(node.id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBTVosV0FBVyxFQUdYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLFlBQVksRUFDWix3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLEVBQUUsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwRyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQXFEOUUsU0FBUyxnQkFBZ0Is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SUFDSyxnQkFBZ0IsQ0FBQyxXQUFtQixFQUFFLFNBQW9CO1FBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3JCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxNQUFNLE1BQU0sR0FBRyxXQUFXLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvQyxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsV0FBVyxDQUFDLEVBQUUsR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDekMsV0FBVyxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQzdELElBQUksWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUQ7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O2tIQXR4QlUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sXG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZvcm0sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLFxuICBBamZOb2RlLFxuICBBamZOb2RlR3JvdXAsXG4gIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmVwZWF0aW5nU2xpZGUsXG4gIEFqZlNsaWRlLFxuICBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUNvbnRhaW5lck5vZGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBjcmVhdGVGb3JtLFxuICBjcmVhdGVWYWxpZGF0aW9uLFxuICBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsXG4gIGNyZWF0ZVdhcm5pbmdHcm91cCxcbiAgaXNDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGlzQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JhbmdlRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgaXNTbGlkZXNOb2RlLFxuICBpc1RhYmxlRmllbGQsXG4gIG1heERpZ2l0c1ZhbGlkYXRpb24sXG4gIG1heFZhbGlkYXRpb24sXG4gIG1pbkRpZ2l0c1ZhbGlkYXRpb24sXG4gIG1pblZhbGlkYXRpb24sXG4gIG5vdEVtcHR5VmFsaWRhdGlvbixcbiAgbm90RW1wdHlXYXJuaW5nLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgY3JlYXRlQ29uZGl0aW9uLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge21vdmVJdGVtSW5BcnJheX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc2Nhbiwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24sXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbjoge2ZvbnRTZXQ6IHN0cmluZzsgZm9udEljb246IHN0cmluZ307XG4gIG5vZGVUeXBlOiB7XG4gICAgbm9kZTogQWpmTm9kZVR5cGU7XG4gICAgZmllbGQ/OiBBamZGaWVsZFR5cGU7XG4gIH07XG4gIGlzU2xpZGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgbm9kZTogQWpmTm9kZTtcbiAgY29udGFpbmVyOiBBamZDb250YWluZXJOb2RlIHwgbnVsbDtcbiAgY2hpbGRyZW46IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG4gIGNvbnRlbnQ6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Qge1xuICBwYXJlbnQ6IEFqZk5vZGU7XG4gIHBhcmVudE5vZGU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbm9kZSdzIHBvc2l0aW9uIGNoYW5nZSBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQge1xuICAvKipcbiAgICogVGhlIG5vZGUgYmVpbmcgbW92ZWQuXG4gICAqL1xuICBub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBub2RlIHByZXZpb3VzIHBvc2l0aW9uLlxuICAgKi9cbiAgZnJvbUluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbm9kZSBuZXcgcG9zaXRpb24uXG4gICAqL1xuICB0b0luZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1CdWlsZGVyTm9kZSA9IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGUgfCBBamZSZXBlYXRpbmdTbGlkZSB8IEFqZk5vZGVHcm91cDtcblxuZnVuY3Rpb24gZ2V0Tm9kZUNvbnRhaW5lcihjOiB7bm9kZXM6IEFqZk5vZGVbXX0sIG5vZGU6IEFqZk5vZGUpOiB7bm9kZXM6IEFqZk5vZGVbXX0gfCBudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xIHx8IGMubm9kZXMubWFwKG4gPT4gbi5pZCkuaW5kZXhPZihub2RlLmlkKSA+IC0xKSB7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgY29uc3QgY25zID0gYy5ub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGUobikpO1xuICBjb25zdCBsZW4gPSBjbnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY24gPSBnZXROb2RlQ29udGFpbmVyKDxBamZDb250YWluZXJOb2RlPmNuc1tpXSwgbm9kZSk7XG4gICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBjbjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZShcbiAgdmFsdWU6IGFueSxcbiAgbm9kZTogQWpmRmllbGQ8YW55Pixcbik6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwge1xuICBsZXQgZGVmYXVsdFZhbHVlID0gdmFsdWUgJiYgKHZhbHVlIGFzIHN0cmluZykudHJpbSgpICE9ICcnID8gKHZhbHVlIGFzIHN0cmluZykgOiBudWxsO1xuICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgc3dpdGNoIChub2RlLmZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSA9PT0gJ3RydWUnIHx8IGRlZmF1bHRWYWx1ZSA9PT0gJzEnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiBbZGVmYXVsdFZhbHVlXTtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgY29uc3QgdiA9ICtkZWZhdWx0VmFsdWU7XG4gICAgICAgIHJldHVybiBpc05hTih2KSA/IDAgOiB2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVmYXVsdFZhbHVlO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLFxuICBwYXJlbnQ6IEFqZk5vZGUsXG4gIGlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMgPSBmYWxzZSxcbik6IEFqZkZvcm1CdWlsZGVyTm9kZVtdIHtcbiAgY29uc3QgZW50cmllczogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBub2Rlc1xuICAgIC5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50LmlkKVxuICAgIC5zb3J0KChuMSwgbjIpID0+IG4xLnBhcmVudE5vZGUgLSBuMi5wYXJlbnROb2RlKVxuICAgIC5tYXAobiA9PiB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIG4pO1xuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKHtwYXJlbnQ6IG4sIHBhcmVudE5vZGU6IDB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiBuLFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2RlcywgbiksXG4gICAgICB9O1xuICAgIH0pO1xuICBpZiAoIWlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzTnVtID0gZW50cmllcy5sZW5ndGg7XG4gICAgY29uc3QgY2JzID0gcGFyZW50LmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSBlbnRyaWVzTnVtOyBpIDwgY2JzOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7cGFyZW50OiBwYXJlbnQsIHBhcmVudE5vZGU6IGl9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZVtdID0gW107XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2RlcykpO1xuICAgIH1cbiAgICBmbGF0Tm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoXG4gIGZsYXROb2RlczogQWpmTm9kZVtdLFxuICBwYXJlbnROb2RlOiBBamZOb2RlLFxuICBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsLFxuKTogQWpmTm9kZVtdIHtcbiAgcmV0dXJuIGJyYW5jaCAhPSBudWxsXG4gICAgPyBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQgJiYgbi5wYXJlbnROb2RlID09PSBicmFuY2gpXG4gICAgOiBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2Rlcyhub2RlczogQWpmTm9kZVtdLCBpZHM6IG51bWJlcltdKTogQWpmTm9kZVtdIHtcbiAgY29uc3QgbGVuID0gbm9kZXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IDxBamZDb250YWluZXJOb2RlPm5vZGU7XG4gICAgICBjb250YWluZXIubm9kZXMgPSByZW1vdmVOb2Rlcyhjb250YWluZXIubm9kZXMsIGlkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2Rlcy5maWx0ZXIobiA9PiBpZHMuaW5kZXhPZihuLmlkKSA9PT0gLTEpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlU3VidHJlZShcbiAgbm9kZXM6IEFqZk5vZGVbXSxcbiAgcGFyZW50Tm9kZTogQWpmTm9kZSxcbiAgYnJhbmNoOiBudW1iZXIgfCBudWxsID0gbnVsbCxcbik6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlcyhub2Rlcyk7XG4gIGxldCBkZWxOb2RlczogQWpmTm9kZVtdID0gW107XG4gIGxldCBkZXNjZW5kYW50cyA9IGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgcGFyZW50Tm9kZSwgYnJhbmNoKTtcbiAgY29uc3QgbGVuID0gZGVzY2VuZGFudHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKFxuICAgIG5vZGVzLFxuICAgIGRlbE5vZGVzLm1hcChuID0+IG4uaWQpLFxuICApO1xufVxuXG5sZXQgbm9kZVVuaXF1ZUlkID0gMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2F2YWlsYWJsZU5vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10gPSBbXG4gICAge1xuICAgICAgbGFiZWw6ICdTbGlkZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zbGlkZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZTbGlkZX0sXG4gICAgICBpc1NsaWRlOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSZXBlYXRpbmcgc2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmVwZWF0aW5nc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU3RyaW5nJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXN0cmluZyd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TdHJpbmd9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUZXh0JyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRleHQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGV4dH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1udW1iZXInfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnQm9vbGVhbicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1ib29sZWFuJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkJvb2xlYW59LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTaW5nbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXNpbmdsZWNob2ljZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2V9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdNdWx0aXBsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbXVsdGlwbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdGb3JtdWxhJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWZvcm11bGEnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRm9ybXVsYX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5EYXRlfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlaW5wdXQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGltZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10aW1lJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRpbWV9LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUYWJsZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10YWJsZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UYWJsZX0sXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JhbmdlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJhbmdlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlJhbmdlfSxcbiAgICB9LFxuICBdO1xuICAvKipcbiAgICogQXZhaWxhYmxlIG5vZGUgdHlwZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBhdmFpbGFibGVOb2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9hdmFpbGFibGVOb2RlVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2Zvcm1PYnM6IE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+ID0gdGhpcy5fZm9ybSBhcyBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPjtcblxuICAvKipcbiAgICogQ3VycmVudCBlZGl0ZWQgZm9ybSBzdHJlYW1cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+ID0gb2JzT2YoW10pO1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+ID0gb2JzT2YoW10pO1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnM6IE9ic2VydmFibGU8QWpmU2xpZGVbXT4gPSBvYnNPZihbXSk7XG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4gPSBvYnNPZihbXSk7XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHwgdW5kZWZpbmVkO1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT4gPSBvYnNPZihbXSk7XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+ID0gb2JzT2YoW10pO1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIHRoZSBpZHMgb2YgdGhlIGRyb3BMaXN0cyBjb25uZWN0ZWQgdG8gdGhlIHNvdXJjZSBsaXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdGVkRHJvcExpc3RzOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBnZXQgY29ubmVjdGVkRHJvcExpc3RzKCk6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeU9iczogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+ID0gdGhpc1xuICAgIC5fZWRpdGVkTm9kZUVudHJ5IGFzIE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPjtcbiAgZ2V0IGVkaXRlZE5vZGVFbnRyeSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWROb2RlRW50cnlPYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb246IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb24gfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb24gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+ID0gdGhpc1xuICAgIC5fZWRpdGVkQ29uZGl0aW9uIGFzIE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD47XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENvbmRpdGlvbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW46IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbk9iczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZENob2ljZXNPcmlnaW4gYXMgT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPjtcbiAgZ2V0IGVkaXRlZENob2ljZXNPcmlnaW4oKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlIGFzIE9ic2VydmFibGU8dm9pZD47XG4gIGdldCBiZWZvcmVOb2Rlc1VwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7XG4gIH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZSBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuICBnZXQgYWZ0ZXJOb2RlVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlck5vZGVVcGRhdGVPYnM7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1VwZGF0ZXM6IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclVwZGF0ZXM6IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9zYXZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHByaXZhdGUgX2RlbGV0ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PigpO1xuICAvKipcbiAgICogRXZlbnQgZmlyZWQgd2hlbiB0aGUgcG9zaXRpb24gb2YgYSBub2RlIGluIGEgdHJlZSBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW92ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQ+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQgZXZlbnQgZW1pdHRlcjtcbiAgICovXG4gIHByaXZhdGUgX21vdmVOb2RlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTYXZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXRNb3ZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXREZWxldGVOb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBlZGl0ZWQgZm9ybVxuICAgKlxuICAgKiBAcGFyYW0gZm9ybVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gIT09IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVkaXROb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQoY29uZGl0aW9uKTtcbiAgfVxuXG4gIHNhdmVDdXJyZW50Q29uZGl0aW9uKGNvbmRpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGMgPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uZ2V0VmFsdWUoKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgY2FuY2VsQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBhc3NpZ25MaXN0SWQobm9kZTogQWpmTm9kZSwgZW1wdHk6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8IG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICBjb25zdCBsaXN0SWQgPSBlbXB0eSA/IGBlbXB0eV9maWVsZHNfbGlzdF8ke25vZGUuaWR9YCA6IGBmaWVsZHNfbGlzdF8ke25vZGUuaWR9YDtcbiAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMudmFsdWUuaW5kZXhPZihsaXN0SWQpID09IC0xKSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3REcm9wTGlzdChsaXN0SWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxpc3RJZDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaW5zZXJ0Tm9kZShcbiAgICBub2RlVHlwZTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICAgIHBhcmVudDogQWpmTm9kZSxcbiAgICBwYXJlbnROb2RlOiBudW1iZXIsXG4gICAgaW5Db250ZW50ID0gZmFsc2UsXG4gICAgaW5zZXJ0SW5JbmRleCA9IDAsXG4gICk6IHZvaWQge1xuICAgIGxldCBub2RlOiBBamZOb2RlIHwgQWpmRmllbGQ7XG4gICAgY29uc3QgaWQgPSArK25vZGVVbmlxdWVJZDtcbiAgICBjb25zdCBpc0ZpZWxkTm9kZSA9IG5vZGVUeXBlLm5vZGVUeXBlPy5maWVsZCAhPSBudWxsO1xuICAgIGlmIChpc0ZpZWxkTm9kZSkge1xuICAgICAgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZCxcbiAgICAgICAgZmllbGRUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCEsXG4gICAgICAgIHBhcmVudDogcGFyZW50LmlkLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gY3JlYXRlQ29udGFpbmVyTm9kZSh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogbm9kZVR5cGUubm9kZVR5cGUubm9kZSxcbiAgICAgICAgcGFyZW50OiAwLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICBjb25zdCBjbiA9XG4gICAgICAgIGlzQ29udGFpbmVyTm9kZShwYXJlbnQpICYmIGluQ29udGVudFxuICAgICAgICAgID8gPEFqZkNvbnRhaW5lck5vZGU+cGFyZW50XG4gICAgICAgICAgOiAoZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBwYXJlbnQpIGFzIEFqZkNvbnRhaW5lck5vZGUpO1xuICAgICAgaWYgKCFpc0ZpZWxkTm9kZSkge1xuICAgICAgICBsZXQgbmV3Tm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgbmV3Tm9kZXMuc3BsaWNlKGluc2VydEluSW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdCgwLCBuZXdOb2Rlcyk7XG4gICAgICAgIHJldHVybiBuZXdOb2RlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDApO1xuICAgICAgICBuZXdOb2Rlcy5zcGxpY2UoaW5zZXJ0SW5JbmRleCwgMCwgbm9kZSk7XG4gICAgICAgIG5ld05vZGVzID0gdGhpcy5fdXBkYXRlTm9kZXNMaXN0KGNuLmlkLCBuZXdOb2Rlcyk7XG4gICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlTm9kZUVudHJ5KHByb3BlcnRpZXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudC5lbWl0KHByb3BlcnRpZXMpO1xuICB9XG5cbiAgY2FuY2VsTm9kZUVudHJ5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcbiAgfVxuXG4gIGRlbGV0ZU5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIHRoZSBtb3ZlTm9kZSBldmVudCB3aGVuIGEgbm9kZSBpcyBtb3ZlZCBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gICAqIEBwYXJhbSBub2RlRW50cnkgVGhlIG5vZGUgdG8gYmUgbW92ZWQuXG4gICAqL1xuICBtb3ZlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksIGZyb206IG51bWJlciwgdG86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1vdmVFdmVudDogQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQgPSB7bm9kZUVudHJ5OiBub2RlRW50cnksIGZyb21JbmRleDogZnJvbSwgdG9JbmRleDogdG99O1xuICAgIHRoaXMuX21vdmVOb2RlRW50cnlFdmVudC5uZXh0KG1vdmVFdmVudCk7XG4gIH1cblxuICBnZXRDdXJyZW50Rm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmZvcm0sXG4gICAgICB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zLFxuICAgICAgdGhpcy5hdHRhY2htZW50c09yaWdpbnMsXG4gICAgICB0aGlzLmNob2ljZXNPcmlnaW5zLFxuICAgICAgdGhpcy5zdHJpbmdJZGVudGlmaWVyLFxuICAgIF0pLnBpcGUoXG4gICAgICBmaWx0ZXIoKFtmb3JtXSkgPT4gZm9ybSAhPSBudWxsKSxcbiAgICAgIG1hcCgoW2Zvcm0sIG5vZGVzLCBhdHRhY2htZW50c09yaWdpbnMsIGNob2ljZXNPcmlnaW5zLCBzdHJpbmdJZGVudGlmaWVyXSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zID0gKGZvcm0gfHwge30pLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM7XG4gICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2luczogWy4uLmNob2ljZXNPcmlnaW5zXSxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IFsuLi5hdHRhY2htZW50c09yaWdpbnNdLFxuICAgICAgICAgIHN0cmluZ0lkZW50aWZpZXI6IFsuLi4oc3RyaW5nSWRlbnRpZmllciB8fCBbXSldLFxuICAgICAgICAgIG5vZGVzOiBbLi4ubm9kZXNdLFxuICAgICAgICAgIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55Pik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjaG9pY2VzT3JpZ2luKTtcbiAgfVxuXG4gIGNyZWF0ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbjxhbnk+KHtuYW1lOiAnJ30pKTtcbiAgfVxuXG4gIGNhbmNlbENob2ljZXNPcmlnaW5FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVDaG9pY2VzT3JpZ2luKHBhcmFtczoge2xhYmVsOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2hvaWNlczogYW55W119KTogdm9pZCB7XG4gICAgY29uc3QgY2hvaWNlc09yaWdpbiA9IHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4uZ2V0VmFsdWUoKTtcbiAgICBpZiAoY2hvaWNlc09yaWdpbiAhPSBudWxsKSB7XG4gICAgICBjaG9pY2VzT3JpZ2luLmxhYmVsID0gcGFyYW1zLmxhYmVsO1xuICAgICAgY2hvaWNlc09yaWdpbi5uYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgICBpZiAoaXNDaG9pY2VzRml4ZWRPcmlnaW4oY2hvaWNlc09yaWdpbikpIHtcbiAgICAgICAgY2hvaWNlc09yaWdpbi5jaG9pY2VzID0gcGFyYW1zLmNob2ljZXM7XG4gICAgICB9XG4gICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXMubmV4dChjaG9pY2VzT3JpZ2lucyA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGNob2ljZXNPcmlnaW5zLmluZGV4T2YoY2hvaWNlc09yaWdpbik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gW1xuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW4sXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gWy4uLmNob2ljZXNPcmlnaW5zLCBjaG9pY2VzT3JpZ2luXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlc09yaWdpbnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoKCkgPT4gWy4uLmlkZW50aWZpZXJdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXM6IEFqZk5vZGVbXSk6IChBamZGb3JtQnVpbGRlck5vZGUgfCBudWxsKVtdIHtcbiAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoMCwgbm9kZXMpO1xuICAgIGNvbnN0IHJvb3ROb2RlcyA9IG5vZGVzLmZpbHRlcihcbiAgICAgIG4gPT4gbi5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fCBuLm5vZGVUeXBlID09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlLFxuICAgICk7XG4gICAgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbbnVsbF07XG4gICAgfVxuICAgIGNvbnN0IHJvb3ROb2RlID0gcm9vdE5vZGVzWzBdO1xuICAgIGlmIChpc1NsaWRlc05vZGUocm9vdE5vZGUpKSB7XG4gICAgICBjb25zdCB0cmVlOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IFtdO1xuICAgICAgdHJlZS5wdXNoKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IHJvb3ROb2RlLFxuICAgICAgICBjb250YWluZXI6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCByb290Tm9kZSksXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmb3JtIGRlZmluaXRpb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBpZCBvZiBhIGRyb3BMaXN0IHRvIGJlIGNvbm5lY3RlZCB3aXRoIHRoZSBGb3JtQnVpbGRlciBzb3VyY2UgbGlzdC5cbiAgICogQHBhcmFtIGxpc3RJZCBUaGUgaWQgb2YgdGhlIGxpc3QgdG8gY29ubmVjdC5cbiAgICovXG4gIHByaXZhdGUgX2Nvbm5lY3REcm9wTGlzdChsaXN0SWQ6IHN0cmluZykge1xuICAgIGxldCBjb25uZWN0ZWRMaXN0cyA9IHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cy52YWx1ZS5zbGljZSgwKTtcbiAgICB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMubmV4dChbLi4uY29ubmVjdGVkTGlzdHMsIGxpc3RJZF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZE1heE5vZGVJZChub2RlczogQWpmTm9kZVtdLCBfY3VyTWF4SWQgPSAwKTogbnVtYmVyIHtcbiAgICBsZXQgbWF4SWQgPSAwO1xuICAgIG5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCBuLmlkKTtcbiAgICAgIGlmIChpc0NvbnRhaW5lck5vZGUobikpIHtcbiAgICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdGhpcy5fZmluZE1heE5vZGVJZCgoPEFqZkNvbnRhaW5lck5vZGU+bikubm9kZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SWQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybS5zdWJzY3JpYmUoKGZvcm06IEFqZkZvcm0gfCBudWxsKSA9PiB7XG4gICAgICBub2RlVW5pcXVlSWQgPSAwO1xuICAgICAgaWYgKGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgJiYgZm9ybS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5vZGVVbmlxdWVJZCA9IHRoaXMuX2ZpbmRNYXhOb2RlSWQoZm9ybS5ub2Rlcyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgoX25vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCA/IGZvcm0ubm9kZXMuc2xpY2UoMCkgOiBbXTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAoX2F0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zICE9IG51bGxcbiAgICAgICAgICAgID8gZm9ybS5hdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMClcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgIChfY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsID8gZm9ybS5jaG9pY2VzT3JpZ2lucy5zbGljZSgwKSA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoXG4gICAgICAgIChfOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLnN0cmluZ0lkZW50aWZpZXIgIT0gbnVsbFxuICAgICAgICAgICAgPyBmb3JtLnN0cmluZ0lkZW50aWZpZXIuc2xpY2UoMClcbiAgICAgICAgICAgIDogW107XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9ICg8T2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKGNob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChjaG9pY2VzT3JpZ2lucyk7XG4gICAgICB9LCBbXSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF0dGFjaG1lbnRzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zID0gdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlcy5waXBlKFxuICAgICAgc2NhbihcbiAgICAgICAgKGF0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLCBvcDogQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wKGF0dGFjaG1lbnRzT3JpZ2lucyk7XG4gICAgICAgIH0sXG4gICAgICAgIFtdLFxuICAgICAgKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllciA9IHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKChzdHJpbmdJZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdLCBvcDogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHN0cmluZ0lkZW50aWZpZXIpO1xuICAgICAgfSwgW10pLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2Rlc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXMgPSAoPE9ic2VydmFibGU8QWpmTm9kZXNPcGVyYXRpb24+PnRoaXMuX25vZGVzVXBkYXRlcykucGlwZShcbiAgICAgIHNjYW4oKG5vZGVzOiBBamZOb2RlW10sIG9wOiBBamZOb2Rlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgfSwgW10pLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnMgPSAodGhpcy5fbm9kZXMgYXMgT2JzZXJ2YWJsZTxBamZTbGlkZVtdPikucGlwZShcbiAgICAgIG1hcChzbGlkZXMgPT5cbiAgICAgICAgc2xpZGVzLm1hcChzbGlkZSA9PiB7XG4gICAgICAgICAgc2xpZGUubm9kZXMgPSAoc2xpZGUubm9kZXMgYXMgQWpmRmllbGRbXSkubWFwKChub2RlOiBBamZGaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlKSkge1xuICAgICAgICAgICAgICBjb25zdCBmd2MgPSBkZWVwQ29weShub2RlKTtcbiAgICAgICAgICAgICAgaWYgKGZ3YyAmJiBmd2MuY2hvaWNlcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmd2MuY2hvaWNlcztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZndjICYmIGZ3Yy5jaG9pY2VzT3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZ3Yy5jaG9pY2VzT3JpZ2luO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmd2M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gZmxhdHRlbk5vZGVzKG5vZGVzKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuXG4gICAgdGhpcy5fZmxhdEZpZWxkcyA9IHRoaXMuX2ZsYXROb2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiA8QWpmRmllbGRbXT5ub2Rlcy5maWx0ZXIobiA9PiAhaXNDb250YWluZXJOb2RlKG4pKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT50aGlzLl9idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmVOb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudFxuICAgICAgLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuZWRpdGVkTm9kZUVudHJ5LCB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgbWFwKChbcHJvcGVydGllcywgbmVdKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG5lIGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgICAgIGNvbnN0IG9yaWdOb2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGRlZXBDb3B5KG9yaWdOb2RlKTtcbiAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgbm9kZS5uYW1lID0gcHJvcGVydGllcy5uYW1lO1xuICAgICAgICAgIG5vZGUubGFiZWwgPSBwcm9wZXJ0aWVzLmxhYmVsO1xuICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnZpc2liaWxpdHkgIT0gbnVsbFxuICAgICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KVxuICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgICBjb25zdCBvbGRDb25kaXRpb25hbEJyYW5jaGVzID0gbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPVxuICAgICAgICAgICAgcHJvcGVydGllcy5jb25kaXRpb25hbEJyYW5jaGVzICE9IG51bGxcbiAgICAgICAgICAgICAgPyBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKChjb25kaXRpb246IHN0cmluZykgPT5cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9ufSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICA6IFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICBub2RlLmZvcm11bGFSZXBzID1cbiAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JtdWxhUmVwcyAhPSBudWxsXG4gICAgICAgICAgICAgICAgPyBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSlcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG5vZGUubWluUmVwcyA9IHByb3BlcnRpZXMubWluUmVwcztcbiAgICAgICAgICAgIG5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaXNGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgbm9kZS5kZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBub2RlLmRlZmF1bHRWYWx1ZSA9IGdldERlZmF1bHRWYWx1ZShwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmZvcm11bGEgPVxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvcm11bGEgIT0gbnVsbCA/IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYX0pIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgZm9yY2VWYWx1ZSA9IHByb3BlcnRpZXMudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICBsZXQgbWluVmFsdWU6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWF4VmFsdWU6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heFZhbHVlLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXIgfCBudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5EaWdpdHMsIDEwKTtcbiAgICAgICAgICAgIGxldCBtYXhEaWdpdHM6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICBtaW5WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWF4VmFsdWUpKSB7XG4gICAgICAgICAgICAgIG1heFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtaW5EaWdpdHMpKSB7XG4gICAgICAgICAgICAgIG1pbkRpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWF4RGlnaXRzKSkge1xuICAgICAgICAgICAgICBtYXhEaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBmb3JjZVZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgIG1heFZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gbm9kZS52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubm90RW1wdHkgPSBub3RFbXB0eSA/IG5vdEVtcHR5VmFsaWRhdGlvbigpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heFZhbHVlID0gbWF4VmFsdWUgIT0gbnVsbCA/IG1heFZhbGlkYXRpb24obWF4VmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cyAhPSBudWxsID8gbWluRGlnaXRzVmFsaWRhdGlvbihtaW5EaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heERpZ2l0cyA9IG1heERpZ2l0cyAhPSBudWxsID8gbWF4RGlnaXRzVmFsaWRhdGlvbihtYXhEaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSAodmFsaWRhdGlvbkNvbmRpdGlvbnMgfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAoYzoge2NvbmRpdGlvbjogc3RyaW5nOyBlcnJvck1lc3NhZ2U6IHN0cmluZ30pID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBjLmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBub2RlLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZS52YWxpZGF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm90RW1wdHlXYXJuID0gcHJvcGVydGllcy5ub3RFbXB0eVdhcm5pbmc7XG4gICAgICAgICAgICBjb25zdCB3YXJuaW5nQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5vdEVtcHR5V2FybiAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyAhPSBudWxsICYmIHdhcm5pbmdDb25kaXRpb25zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IG5vZGUud2FybmluZyB8fCBjcmVhdGVXYXJuaW5nR3JvdXAoe30pO1xuICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHdhcm5pbmcuY29uZGl0aW9ucyA9ICh3YXJuaW5nQ29uZGl0aW9ucyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgICh3OiB7Y29uZGl0aW9uOiBzdHJpbmc7IHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PlxuICAgICAgICAgICAgICAgICAgY3JlYXRlV2FybmluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG5vZGUud2FybmluZyA9IHdhcm5pbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLndhcm5pbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLm5leHRTbGlkZUNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbn0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2RlLnNpemUgPSBwcm9wZXJ0aWVzLnNpemU7XG5cbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgKG5vZGUgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmID0gcHJvcGVydGllcy5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgICBub2RlLmZvcmNlRXhwYW5kZWQgPSBwcm9wZXJ0aWVzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICAgIG5vZGUuZm9yY2VOYXJyb3cgPSBwcm9wZXJ0aWVzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgICBub2RlLnRyaWdnZXJDb25kaXRpb25zID0gKHByb3BlcnRpZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgodDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiB0fSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5zdGFydCA9IHByb3BlcnRpZXMuc3RhcnQ7XG4gICAgICAgICAgICAgIG5vZGUuZW5kID0gcHJvcGVydGllcy5lbmQ7XG4gICAgICAgICAgICAgIG5vZGUuc3RlcCA9IHByb3BlcnRpZXMuc3RlcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzVGFibGVGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgICBsZXQge2NvbHVtblR5cGVzLCByb3dzLCBjb2x1bW5MYWJlbHMsIHJvd0xhYmVsc30gPSBKU09OLnBhcnNlKHByb3BlcnRpZXMudGFibGVEZWYpO1xuICAgICAgICAgICAgICBub2RlLmNvbHVtblR5cGVzID0gY29sdW1uVHlwZXMgfHwgW107XG4gICAgICAgICAgICAgIG5vZGUucm93cyA9IHJvd3MgfHwgW107XG4gICAgICAgICAgICAgIG5vZGUuY29sdW1uTGFiZWxzID0gY29sdW1uTGFiZWxzIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlLnJvd0xhYmVscyA9IHJvd0xhYmVscyB8fCBbXTtcbiAgICAgICAgICAgICAgbm9kZS5oaWRlRW1wdHlSb3dzID0gcHJvcGVydGllcy5oaWRlRW1wdHlSb3dzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuXG4gICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgb3JpZ05vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAvLyBpZiAoY24gaW5zdGFuY2VvZiBBamZOb2RlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMubWFwKG4gPT4gbi5pZCkuaW5kZXhPZihvcmlnTm9kZS5pZCk7XG4gICAgICAgICAgICAgIGxldCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyAgIGNvbnN0IGlkeCA9IG5vZGVzLmluZGV4T2Yob3JpZ05vZGUpO1xuICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgIGlmIChuZXdDb25kaXRpb25hbEJyYW5jaGVzIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBub2RlcyA9IGRlbGV0ZU5vZGVTdWJ0cmVlKG5vZGVzLCBub2RlLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KSA9PiB7XG4gICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5tYXAobiA9PiBuLmlkKS5pbmRleE9mKG5vZGUuaWQpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW92ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3ZlTm9kZVN1YiA9IHRoaXMuX21vdmVOb2RlRW50cnlFdmVudFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gbW92ZUV2ZW50Lm5vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgbm9kZSkgYXMgQWpmQ29udGFpbmVyTm9kZTtcbiAgICAgICAgICAgIGxldCBuZXdOb2RlczogQWpmTm9kZVtdID0gbm9kZXM7XG4gICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIG5ld05vZGVzID0gY24ubm9kZXM7XG4gICAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheShuZXdOb2RlcywgbW92ZUV2ZW50LmZyb21JbmRleCwgbW92ZUV2ZW50LnRvSW5kZXgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgXCJpZFwiIGFuZCBcInBhcmVudFwiIGZpZWxkcyBvZiBhIG1vZGlmaWVkIG9yIHJlYXJyYW5nZWQgbGlzdCBvZiBub2Rlcy5cbiAgICogQHBhcmFtIGNvbnRhaW5lcklkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lciBvZiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIG5vZGVzTGlzdCBUaGUgbGlzdCBvZiBub2RlcyB0byBiZSB1cGRhdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTm9kZXNMaXN0KGNvbnRhaW5lcklkOiBudW1iZXIsIG5vZGVzTGlzdDogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBpZiAoIW5vZGVzTGlzdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgY29udElkID0gY29udGFpbmVySWQgIT0gdW5kZWZpbmVkID8gY29udGFpbmVySWQgOiAwO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IG5vZGVzTGlzdC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBub2Rlc0xpc3RbaWR4XTtcbiAgICAgIGN1cnJlbnROb2RlLmlkID0gY29udElkICogMTAwMCArIGlkeCArIDE7XG4gICAgICBjdXJyZW50Tm9kZS5wYXJlbnQgPSBpZHggPT0gMCA/IGNvbnRJZCA6IGNvbnRJZCAqIDEwMDAgKyBpZHg7XG4gICAgICBpZiAoaXNTbGlkZXNOb2RlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY3VycmVudE5vZGUuaWQsIGN1cnJlbnROb2RlLm5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzTGlzdDtcbiAgfVxufVxuIl19