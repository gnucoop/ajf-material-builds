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
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createContainerNode, createField, createForm, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { filter, map, publishReplay, refCount, scan, withLatestFrom } from 'rxjs/operators';
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
            },
            {
                label: 'Range',
                icon: { fontSet: 'ajf-icon', fontIcon: 'field-range' },
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Range }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBT1osV0FBVyxFQUlYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBYyxPQUFPLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBeUQxRixTQUFTLGdCQUFnQixDQUFDLENBQXFCLEVBQUUsSUFBYTtJQUM1RCxJQUFJLENB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QUFRO2dCQUM1QyxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDekQsTUFBTSxZQUFZLEdBQUcsV0FBdUIsQ0FBQztnQkFDN0MsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO29CQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OztZQXR2QkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sXG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZkZvcm0sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLFxuICBBamZOb2RlLFxuICBBamZOb2RlR3JvdXAsXG4gIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgQWpmUmVwZWF0aW5nU2xpZGUsXG4gIEFqZlNsaWRlLFxuICBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUNvbnRhaW5lck5vZGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBjcmVhdGVGb3JtLFxuICBjcmVhdGVWYWxpZGF0aW9uLFxuICBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsXG4gIGNyZWF0ZVdhcm5pbmdHcm91cCxcbiAgaXNDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGlzQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzU2xpZGVzTm9kZSxcbiAgbWF4RGlnaXRzVmFsaWRhdGlvbixcbiAgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbixcbiAgbWluVmFsaWRhdGlvbixcbiAgbm90RW1wdHlWYWxpZGF0aW9uLFxuICBub3RFbXB0eVdhcm5pbmdcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHttb3ZlSXRlbUluQXJyYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgc2Nhbiwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb25cbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGljb246IHtmb250U2V0OiBzdHJpbmcsIGZvbnRJY29uOiBzdHJpbmd9O1xuICBub2RlVHlwZToge1xuICAgIG5vZGU6IEFqZk5vZGVUeXBlO1xuICAgIGZpZWxkPzogQWpmRmllbGRUeXBlLFxuICB9O1xuICBpc1NsaWRlPzogYm9vbGVhbjtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgbm9kZTogQWpmTm9kZTtcbiAgY29udGFpbmVyOiBBamZDb250YWluZXJOb2RlfG51bGw7XG4gIGNoaWxkcmVuOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdO1xuICBjb250ZW50OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Qge1xuICBwYXJlbnQ6IEFqZk5vZGU7XG4gIHBhcmVudE5vZGU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbm9kZSdzIHBvc2l0aW9uIGNoYW5nZSBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQge1xuICAvKipcbiAgICogVGhlIG5vZGUgYmVpbmcgbW92ZWQuXG4gICAqL1xuICBub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBub2RlIHByZXZpb3VzIHBvc2l0aW9uLlxuICAgKi9cbiAgZnJvbUluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbm9kZSBuZXcgcG9zaXRpb24uXG4gICAqL1xuICB0b0luZGV4OiBudW1iZXI7XG59XG5cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGV8QWpmUmVwZWF0aW5nU2xpZGV8QWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfXxudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xKSB7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgY29uc3QgY25zID0gYy5ub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGUobikpO1xuICBjb25zdCBsZW4gPSBjbnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY24gPSBnZXROb2RlQ29udGFpbmVyKDxBamZDb250YWluZXJOb2RlPmNuc1tpXSwgbm9kZSk7XG4gICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBjbjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoXG4gICAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBBamZOb2RlLCBpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzID0gZmFsc2UpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGNvbnN0IGVudHJpZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gbm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCBuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHtwYXJlbnQ6IG4sIHBhcmVudE5vZGU6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICBpZiAoIWlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzTnVtID0gZW50cmllcy5sZW5ndGg7XG4gICAgY29uc3QgY2JzID0gcGFyZW50LmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSBlbnRyaWVzTnVtOyBpIDwgY2JzOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7cGFyZW50OiBwYXJlbnQsIHBhcmVudE5vZGU6IGl9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZVtdID0gW107XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2RlcykpO1xuICAgIH1cbiAgICBmbGF0Tm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoXG4gICAgZmxhdE5vZGVzOiBBamZOb2RlW10sIHBhcmVudE5vZGU6IEFqZk5vZGUsIGJyYW5jaDogbnVtYmVyfG51bGwgPSBudWxsKTogQWpmTm9kZVtdIHtcbiAgcmV0dXJuIGJyYW5jaCAhPSBudWxsID9cbiAgICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCAmJiBuLnBhcmVudE5vZGUgPT09IGJyYW5jaCkgOlxuICAgICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSAoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSk7XG4gICAgICBjb250YWluZXIubm9kZXMgPSByZW1vdmVOb2Rlcyhjb250YWluZXIubm9kZXMsIGlkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2Rlcy5maWx0ZXIobiA9PiBpZHMuaW5kZXhPZihuLmlkKSA9PT0gLTEpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlU3VidHJlZShcbiAgICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlcnxudWxsID0gbnVsbCk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlcyhub2Rlcyk7XG4gIGxldCBkZWxOb2RlczogQWpmTm9kZVtdID0gW107XG4gIGxldCBkZXNjZW5kYW50cyA9IGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgcGFyZW50Tm9kZSwgYnJhbmNoKTtcbiAgY29uc3QgbGVuID0gZGVzY2VuZGFudHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKG5vZGVzLCBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSZXBlYXRpbmcgc2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmVwZWF0aW5nc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc3RyaW5nJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ31cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1udW1iZXInfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWJvb2xlYW4nfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdNdWx0aXBsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbXVsdGlwbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZm9ybXVsYSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlaW5wdXQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUaW1lJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRpbWUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGltZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JhbmdlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJhbmdlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlJhbmdlfVxuICAgIH1cbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm18bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm18bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2Zvcm1PYnM6IE9ic2VydmFibGU8QWpmRm9ybXxudWxsPiA9IHRoaXMuX2Zvcm0gYXMgT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+O1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+O1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+O1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnM6IE9ic2VydmFibGU8QWpmU2xpZGVbXT47XG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+O1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIHRoZSBpZHMgb2YgdGhlIGRyb3BMaXN0cyBjb25uZWN0ZWQgdG8gdGhlIHNvdXJjZSBsaXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdGVkRHJvcExpc3RzOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBnZXQgY29ubmVjdGVkRHJvcExpc3RzKCk6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4gPVxuICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5IGFzIE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD47XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVFbnRyeU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbnxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24gYXMgT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD47XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luIGFzIE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+O1xuICBnZXQgZWRpdGVkQ2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlIGFzIE9ic2VydmFibGU8dm9pZD47XG4gIGdldCBiZWZvcmVOb2Rlc1VwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7XG4gIH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZSBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuICBnZXQgYWZ0ZXJOb2RlVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlck5vZGVVcGRhdGVPYnM7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1VwZGF0ZXM6IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzOiBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9zYXZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHByaXZhdGUgX2RlbGV0ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+KCk7XG4gIC8qKlxuICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiBhIG5vZGUgaW4gYSB0cmVlIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck1vdmVFdmVudD4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck1vdmVFdmVudD4oKTtcblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byB0aGUgbW92ZU5vZGVFbnRyeUV2ZW50IGV2ZW50IGVtaXR0ZXI7XG4gICAqL1xuICBwcml2YXRlIF9tb3ZlTm9kZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U2F2ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0TW92ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0RGVsZXRlTm9kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgZWRpdGVkIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtfG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZm9ybSAhPT0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLl9mb3JtLm5leHQoZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgZWRpdE5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb24oY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChjb25kaXRpb24pO1xuICB9XG5cbiAgc2F2ZUN1cnJlbnRDb25kaXRpb24oY29uZGl0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYyA9IHRoaXMuX2VkaXRlZENvbmRpdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQobnVsbCk7XG4gIH1cblxuICBjYW5jZWxDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIGFzc2lnbkxpc3RJZChub2RlOiBBamZOb2RlLCBlbXB0eTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgIGNvbnN0IGxpc3RJZCA9IGVtcHR5ID8gYGVtcHR5X2ZpZWxkc19saXN0XyR7bm9kZS5pZH1gIDogYGZpZWxkc19saXN0XyR7bm9kZS5pZH1gO1xuICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cy52YWx1ZS5pbmRleE9mKGxpc3RJZCkgPT0gLTEpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdERyb3BMaXN0KGxpc3RJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdElkO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgICAgbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSwgcGFyZW50OiBBamZOb2RlLCBwYXJlbnROb2RlOiBudW1iZXIsIGluQ29udGVudCA9IGZhbHNlLFxuICAgICAgaW5zZXJ0SW5JbmRleCA9IDApOiB2b2lkIHtcbiAgICBsZXQgbm9kZTogQWpmTm9kZXxBamZGaWVsZDtcbiAgICBjb25zdCBpZCA9ICsrbm9kZVVuaXF1ZUlkO1xuICAgIGNvbnN0IGlzRmllbGROb2RlID0gbm9kZVR5cGUubm9kZVR5cGU/LmZpZWxkICE9IG51bGw7XG4gICAgaWYgKGlzRmllbGROb2RlKSB7XG4gICAgICBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLFxuICAgICAgICBmaWVsZFR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkISxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQuaWQsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVDb250YWluZXJOb2RlKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5ub2RlLFxuICAgICAgICBwYXJlbnQ6IDAsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBub2RlczogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIGNvbnN0IGNuID0gaXNDb250YWluZXJOb2RlKHBhcmVudCkgJiYgaW5Db250ZW50ID9cbiAgICAgICAgICAoPEFqZkNvbnRhaW5lck5vZGU+cGFyZW50KSA6XG4gICAgICAgICAgZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBwYXJlbnQpIGFzIEFqZkNvbnRhaW5lck5vZGU7XG4gICAgICBpZiAoIWlzRmllbGROb2RlKSB7XG4gICAgICAgIGxldCBuZXdOb2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICBuZXdOb2Rlcy5zcGxpY2UoaW5zZXJ0SW5JbmRleCwgMCwgbm9kZSk7XG4gICAgICAgIG5ld05vZGVzID0gdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5ld05vZGVzKTtcbiAgICAgICAgcmV0dXJuIG5ld05vZGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCk7XG4gICAgICAgIG5ld05vZGVzLnNwbGljZShpbnNlcnRJbkluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY24uaWQsIG5ld05vZGVzKTtcbiAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVOb2RlRW50cnkocHJvcGVydGllczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50LmVtaXQocHJvcGVydGllcyk7XG4gIH1cblxuICBjYW5jZWxOb2RlRW50cnlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuICB9XG5cbiAgZGVsZXRlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudC5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgdGhlIG1vdmVOb2RlIGV2ZW50IHdoZW4gYSBub2RlIGlzIG1vdmVkIGluIHRoZSBmb3JtYnVpbGRlci5cbiAgICogQHBhcmFtIG5vZGVFbnRyeSBUaGUgbm9kZSB0byBiZSBtb3ZlZC5cbiAgICovXG4gIG1vdmVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCA9IHtub2RlRW50cnk6IG5vZGVFbnRyeSwgZnJvbUluZGV4OiBmcm9tLCB0b0luZGV4OiB0b307XG4gICAgdGhpcy5fbW92ZU5vZGVFbnRyeUV2ZW50Lm5leHQobW92ZUV2ZW50KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRGb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgICB0aGlzLmZvcm0sIHRoaXMuX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgICAgICAgIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuc3RyaW5nSWRlbnRpZmllclxuICAgICAgICAgICBdKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoW2Zvcm1dKSA9PiBmb3JtICE9IG51bGwpLFxuICAgICAgICAgICAgbWFwKChbZm9ybSwgbm9kZXMsIGF0dGFjaG1lbnRzT3JpZ2lucywgY2hvaWNlc09yaWdpbnMsIHN0cmluZ0lkZW50aWZpZXJdKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzT3JpZ2luczogKGNob2ljZXNPcmlnaW5zIGFzIEFqZkNob2ljZXNPcmlnaW48YW55PltdKS5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IChhdHRhY2htZW50c09yaWdpbnMgYXMgQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKS5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiAoKHN0cmluZ0lkZW50aWZpZXIgfHwgW10pIGFzIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pLnNsaWNlKDApLFxuICAgICAgICAgICAgICAgIG5vZGVzOiAobm9kZXMgYXMgQWpmU2xpZGVbXSkuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogKGZvcm0gYXMgQWpmRm9ybSkuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoKGNob2ljZXNPcmlnaW5zKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGNob2ljZXNPcmlnaW5zLmluZGV4T2YoY2hvaWNlc09yaWdpbik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gW1xuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW4sXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gWy4uLmNob2ljZXNPcmlnaW5zLCBjaG9pY2VzT3JpZ2luXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlc09yaWdpbnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoKCkgPT4gWy4uLmlkZW50aWZpZXJdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXM6IEFqZk5vZGVbXSk6IChBamZGb3JtQnVpbGRlck5vZGV8bnVsbClbXSB7XG4gICAgdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5vZGVzKTtcbiAgICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIoXG4gICAgICAgIG4gPT4gbi5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fCBuLm5vZGVUeXBlID09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKTtcbiAgICBpZiAocm9vdE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFtudWxsXTtcbiAgICB9XG4gICAgY29uc3Qgcm9vdE5vZGUgPSByb290Tm9kZXNbMF07XG4gICAgaWYgKGlzU2xpZGVzTm9kZShyb290Tm9kZSkpIHtcbiAgICAgIGNvbnN0IHRyZWU6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gW107XG4gICAgICB0cmVlLnB1c2goPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogcm9vdE5vZGUsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2Rlcywgcm9vdE5vZGUpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybSBkZWZpbml0aW9uJyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgaWQgb2YgYSBkcm9wTGlzdCB0byBiZSBjb25uZWN0ZWQgd2l0aCB0aGUgRm9ybUJ1aWxkZXIgc291cmNlIGxpc3QuXG4gICAqIEBwYXJhbSBsaXN0SWQgVGhlIGlkIG9mIHRoZSBsaXN0IHRvIGNvbm5lY3QuXG4gICAqL1xuICBwcml2YXRlIF9jb25uZWN0RHJvcExpc3QobGlzdElkOiBzdHJpbmcpIHtcbiAgICBsZXQgY29ubmVjdGVkTGlzdHMgPSB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMudmFsdWUuc2xpY2UoMCk7XG4gICAgdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLm5leHQoWy4uLmNvbm5lY3RlZExpc3RzLCBsaXN0SWRdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCBuLmlkKTtcbiAgICAgIGlmIChpc0NvbnRhaW5lck5vZGUobikpIHtcbiAgICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdGhpcy5fZmluZE1heE5vZGVJZCgoPEFqZkNvbnRhaW5lck5vZGU+bikubm9kZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SWQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybS5zdWJzY3JpYmUoKGZvcm06IEFqZkZvcm18bnVsbCkgPT4ge1xuICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAoX2F0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5hdHRhY2htZW50c09yaWdpbnMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgZm9ybS5hdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgIH0pO1xuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgICB9KTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF86IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGwgPyBmb3JtLnN0cmluZ0lkZW50aWZpZXIuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4+dGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjaG9pY2VzT3JpZ2lucyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgICAgc2NhbihcbiAgICAgICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICAgICAgICBvcDogQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtdKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgICBzY2FuKFxuICAgICAgICAgICAgKHN0cmluZ0lkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sIG9wOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3Aoc3RyaW5nSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW10pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZWZDb3VudCgpLFxuICAgICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zID1cbiAgICAgICAgKHRoaXMuX25vZGVzIGFzIE9ic2VydmFibGU8QWpmU2xpZGVbXT4pLnBpcGUobWFwKHNsaWRlcyA9PiBzbGlkZXMubWFwKHNsaWRlID0+IHtcbiAgICAgICAgICBzbGlkZS5ub2RlcyA9IChzbGlkZS5ub2RlcyBhcyBBamZGaWVsZFtdKS5tYXAoKG5vZGU6IEFqZkZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZ3YyA9IGRlZXBDb3B5KG5vZGUpO1xuICAgICAgICAgICAgICBpZiAoZndjICYmIGZ3Yy5jaG9pY2VzKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZ3Yy5jaG9pY2VzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmd2MgJiYgZndjLmNob2ljZXNPcmlnaW4pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZndjLmNob2ljZXNPcmlnaW47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZ3YztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzbGlkZTtcbiAgICAgICAgfSkpKTtcblxuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gZmxhdHRlbk5vZGVzKG5vZGVzKSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fZmxhdEZpZWxkcyA9IHRoaXMuX2ZsYXROb2Rlcy5waXBlKFxuICAgICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IDxBamZGaWVsZFtdPm5vZGVzLmZpbHRlcihuID0+ICFpc0NvbnRhaW5lck5vZGUobikpKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgICBtYXAobm9kZXMgPT4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+dGhpcy5fYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlcykpLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5lXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG5lIGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9IHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kaXRpb246IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSkgOlxuICAgICAgICAgICAgICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUuZm9ybXVsYVJlcHMgPSBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5taW5SZXBzID0gcHJvcGVydGllcy5taW5SZXBzO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5mb3JtdWxhID0gcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmb3JjZVZhbHVlICE9IG51bGwgfHwgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8IG1heFZhbHVlICE9IG51bGwgfHwgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9IG1heFZhbHVlICE9IG51bGwgPyBtYXhWYWxpZGF0aW9uKG1heFZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCA/IG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluRGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCA/IG1heERpZ2l0c1ZhbGlkYXRpb24obWF4RGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKGM6IHtjb25kaXRpb246IHN0cmluZywgZXJyb3JNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogYy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh3OiB7Y29uZGl0aW9uOiBzdHJpbmcsIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC5uZXh0U2xpZGVDb25kaXRpb24gPSBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZmllbGQuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmd2MgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PmZpZWxkO1xuICAgICAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZU5hcnJvdyA9IHByb3BlcnRpZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHQ6IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaWR4ID0gbm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpXG4gICAgICAgIC5waXBlKG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW92ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3ZlTm9kZVN1YiA9XG4gICAgICAgIHRoaXMuX21vdmVOb2RlRW50cnlFdmVudFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChtb3ZlRXZlbnQ6IEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlRW50cnkgPSBtb3ZlRXZlbnQubm9kZUVudHJ5IGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgbm9kZSkgYXMgQWpmQ29udGFpbmVyTm9kZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGVzOiBBamZOb2RlW10gPSBub2RlcztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBjbi5ub2RlcztcbiAgICAgICAgICAgICAgICAgICAgICBtb3ZlSXRlbUluQXJyYXkobmV3Tm9kZXMsIG1vdmVFdmVudC5mcm9tSW5kZXgsIG1vdmVFdmVudC50b0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgXCJpZFwiIGFuZCBcInBhcmVudFwiIGZpZWxkcyBvZiBhIG1vZGlmaWVkIG9yIHJlYXJyYW5nZWQgbGlzdCBvZiBub2Rlcy5cbiAgICogQHBhcmFtIGNvbnRhaW5lcklkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lciBvZiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIG5vZGVzTGlzdCBUaGUgbGlzdCBvZiBub2RlcyB0byBiZSB1cGRhdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTm9kZXNMaXN0KGNvbnRhaW5lcklkOiBudW1iZXIsIG5vZGVzTGlzdDogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBpZiAoIW5vZGVzTGlzdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgY29udElkID0gY29udGFpbmVySWQgIT0gdW5kZWZpbmVkID8gY29udGFpbmVySWQgOiAwO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IG5vZGVzTGlzdC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBub2Rlc0xpc3RbaWR4XTtcbiAgICAgIGN1cnJlbnROb2RlLmlkID0gKGNvbnRJZCAqIDEwMDApICsgaWR4ICsgMTtcbiAgICAgIGN1cnJlbnROb2RlLnBhcmVudCA9IGlkeCA9PSAwID8gY29udElkIDogKGNvbnRJZCAqIDEwMDApICsgaWR4O1xuICAgICAgaWYgKGN1cnJlbnROb2RlLm5vZGVUeXBlID09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8XG4gICAgICAgICAgY3VycmVudE5vZGUubm9kZVR5cGUgPT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gY3VycmVudE5vZGUgYXMgQWpmU2xpZGU7XG4gICAgICAgIGlmIChjdXJyZW50U2xpZGUubm9kZXMpIHtcbiAgICAgICAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY3VycmVudFNsaWRlLmlkLCBjdXJyZW50U2xpZGUubm9kZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2Rlc0xpc3Q7XG4gIH1cbn1cbiJdfQ==