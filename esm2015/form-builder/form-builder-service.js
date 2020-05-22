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
import { __decorate, __metadata } from "tslib";
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createContainerNode, createField, createForm, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
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
function buildFormBuilderNodesTree(nodes) {
    const rootNodes = nodes.filter(n => n.parent == null || n.parent === 0);
    if (rootNodes.length === 1) {
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
    }
    else if (rootNodes.length === 0) {
        return [null];
    }
    throw new Error('Invalid form definition');
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
let AjfFormBuilderService = /** @class */ (() => {
    let AjfFormBuilderService = class AjfFormBuilderService {
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
        insertNode(nodeType, parent, parentNode, inContent = false) {
            let node;
            const id = ++nodeUniqueId;
            const isFieldNode = nodeType.nodeType.field != null;
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
                    parent: parent != null ? parent.id : 0,
                    parentNode,
                    name: '',
                    nodes: [],
                });
            }
            this._beforeNodesUpdate.emit();
            this._nodesUpdates.next((nodes) => {
                if (node.parent === 0) {
                    return [node];
                }
                const cn = isContainerNode(parent) && inContent ? parent :
                    getNodeContainer({ nodes }, parent);
                if (cn != null) {
                    if (!isFieldNode) {
                        const replaceNodes = cn.nodes === nodes;
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
        getCurrentForm() {
            return combineLatest([
                this.form, this.nodes, this.attachmentsOrigins, this.choicesOrigins,
                this.stringIdentifier
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
            this._flatNodes = this._nodes.pipe(map((nodes) => flattenNodes(nodes)), publishReplay(1), refCount());
            this._flatFields = this._flatNodes.pipe(map((nodes) => nodes.filter(n => !isContainerNode(n))), publishReplay(1), refCount());
            this._nodeEntriesTree = this._nodes.pipe(map(nodes => buildFormBuilderNodesTree(nodes)), publishReplay(1), refCount());
        }
        _initSaveNode() {
            this._saveNodeEntryEvent
                .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter(([_, nodeEntry]) => nodeEntry != null), map(([properties, nodeEntry]) => {
                this._beforeNodesUpdate.emit();
                nodeEntry = nodeEntry;
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
                        nodes = deleteNodeSubtree(nodes, node);
                    }
                    return nodes;
                };
            }))
                .subscribe(this._nodesUpdates);
        }
    };
    AjfFormBuilderService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AjfFormBuilderService);
    return AjfFormBuilderService;
})();
export { AjfFormBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBSUwsWUFBWSxFQU9aLFdBQVcsRUFJWCx3QkFBd0IsRUFDeEIsbUJBQW1CLEVBQ25CLFdBQVcsRUFDWCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLHFCQUFxQixFQUNyQixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLG9CQUFvQixFQUNwQixlQUFlLEVBQ2YsT0FBTyxFQUNQLGtCQUFrQixFQUNsQix3QkFBd0IsRUFDeEIsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsZUFBZSxFQUNoQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBZSxlQUFlLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9GLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDekUsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFxQzFGLFNBQVMsZ0JBQWdCLENBQUMsQ0FBcUIsRUFBRSxJQUFhO0lBQzVELElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDOUIsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUNELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixDQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUM7U0FDWDtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyw0QkFBNEIsQ0FDakMsS0FBZ0IsRUFBRSxNQUFlLEVBQUUseUJBQXlCLEdBQUcsS0FBSztJQUN0RSxNQUFNLE9BQU8sR0FBeUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUNwQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDL0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1AsTUFBTSxRQUFRLEdBQ1YsNEJBQTRCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFnQztZQUM5QixJQUFJLEVBQUUsQ0FBQztZQUNQLFFBQVE7WUFDUixPQUFPLEVBQUUsNEJBQTRCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNoRCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLHlCQUF5QixFQUFFO1FBQzlCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztRQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyw0QkFBNEIsQ0FBQyxNQUFpQixFQUFFLElBQWE7SUFDcEUsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekIsT0FBTyw0QkFBNEIsQ0FBb0IsSUFBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakY7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFHRCxTQUFTLHlCQUF5QixDQUFDLEtBQWdCO0lBQ2pELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDMUIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxHQUF5QixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBMEI7Z0JBQ2pDLElBQUksRUFBRSxRQUFRO2dCQUNkLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFFBQVEsRUFBRSw0QkFBNEIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsNEJBQTRCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQzthQUN2RCxDQUFDLENBQUM7WUFDSCxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7U0FBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNmO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQWdCO0lBQzNDLElBQUksU0FBUyxHQUFjLEVBQUUsQ0FBQztJQUU5QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBYSxFQUFFLEVBQUU7UUFDOUIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFvQixJQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RTtRQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRUQsU0FBUyxjQUFjLENBQ25CLFNBQW9CLEVBQUUsVUFBbUIsRUFBRSxTQUFzQixJQUFJO0lBQ3ZFLE9BQU8sTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ25CLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsS0FBZ0IsRUFBRSxHQUFhO0lBQ2xELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsTUFBTSxTQUFTLEdBQXNCLElBQUssQ0FBQztZQUMzQyxTQUFTLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUN0QixLQUFnQixFQUFFLFVBQW1CLEVBQUUsU0FBc0IsSUFBSTtJQUNuRSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsSUFBSSxRQUFRLEdBQWMsRUFBRSxDQUFDO0lBQzdCLElBQUksV0FBVyxHQUFHLGNBQWMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkU7SUFDRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxPQUFPLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFJckI7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtRQTZLaEM7WUE1S1Esd0JBQW1CLEdBQWtDO2dCQUMzRDtvQkFDRSxLQUFLLEVBQUUsT0FBTztvQkFDZCxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUM7b0JBQ3BELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFDO29CQUN0QyxPQUFPLEVBQUUsSUFBSTtpQkFDZDtnQkFDRDtvQkFDRSxLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBQztvQkFDN0QsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxpQkFBaUIsRUFBQztvQkFDL0MsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7Z0JBQ0Q7b0JBQ0UsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO29CQUNyRCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBQztpQkFDbkU7Z0JBQ0Q7b0JBQ0UsS0FBSyxFQUFFLE1BQU07b0JBQ2IsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDO29CQUNuRCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBQztpQkFDakU7Z0JBQ0Q7b0JBQ0UsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO29CQUNyRCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBQztpQkFDbkU7Z0JBQ0Q7b0JBQ0UsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQztvQkFDdEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUM7aUJBQ3BFO2dCQUNEO29CQUNFLEtBQUssRUFBRSxlQUFlO29CQUN0QixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBQztvQkFDM0QsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxZQUFZLEVBQUM7aUJBQ3pFO2dCQUNEO29CQUNFLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFDO29CQUM3RCxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWMsRUFBQztpQkFDM0U7Z0JBQ0Q7b0JBQ0UsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQztvQkFDdEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUM7aUJBQ3BFO2dCQUNEO29CQUNFLEtBQUssRUFBRSxNQUFNO29CQUNiLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQztvQkFDbkQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUM7aUJBQ2pFO2dCQUNEO29CQUNFLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQztvQkFDeEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUM7aUJBQ3RFO2dCQUNEO29CQUNFLEtBQUssRUFBRSxNQUFNO29CQUNiLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQztvQkFDbkQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxJQUFJLEVBQUM7aUJBQ2pFO2dCQUNEO29CQUNFLEtBQUssRUFBRSxPQUFPO29CQUNkLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQztvQkFDcEQsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUM7aUJBQ2xFO2FBQ0YsQ0FBQztZQVdNLFVBQUssR0FBa0MsSUFBSSxlQUFlLENBQWUsSUFBSSxDQUFDLENBQUM7WUFDL0UsYUFBUSxHQUE2QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBOEMvRCxxQkFBZ0IsR0FDcEIsSUFBSSxlQUFlLENBQStCLElBQUksQ0FBQyxDQUFDO1lBQ3BELHdCQUFtQixHQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFLakMscUJBQWdCLEdBQ3BCLElBQUksZUFBZSxDQUFvQixJQUFJLENBQUMsQ0FBQztZQUN6Qyx3QkFBbUIsR0FBa0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBSzFGLHlCQUFvQixHQUN4QixJQUFJLGVBQWUsQ0FBNkIsSUFBSSxDQUFDLENBQUM7WUFDbEQsNEJBQXVCLEdBQzNCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUtyQyx1QkFBa0IsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztZQUNsRSwwQkFBcUIsR0FBcUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBSWpGLHFCQUFnQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1lBQ2hFLHdCQUFtQixHQUFxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7WUFLN0Usa0JBQWEsR0FBK0IsSUFBSSxPQUFPLEVBQXFCLENBQUM7WUFDN0UsK0JBQTBCLEdBQzlCLElBQUksT0FBTyxFQUFrQyxDQUFDO1lBQzFDLDJCQUFzQixHQUMxQixJQUFJLE9BQU8sRUFBOEIsQ0FBQztZQUN0Qyw2QkFBd0IsR0FDNUIsSUFBSSxPQUFPLEVBQW9DLENBQUM7WUFFNUMsd0JBQW1CLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7WUFDakUsMEJBQXFCLEdBQ3pCLElBQUksWUFBWSxFQUEyQixDQUFDO1lBRzlDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQS9HRDs7Ozs7V0FLRztRQUNILElBQUksa0JBQWtCO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xDLENBQUM7UUFJRDs7Ozs7V0FLRztRQUNILElBQUksSUFBSTtZQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO1FBR0QsSUFBSSxrQkFBa0I7WUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDbEMsQ0FBQztRQUdELElBQUksY0FBYztZQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQztRQUdELElBQUksZ0JBQWdCO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7UUFHRCxJQUFJLEtBQUs7WUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUdELElBQUksU0FBUztZQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO1FBR0QsSUFBSSxVQUFVO1lBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7UUFHRCxJQUFJLGVBQWU7WUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0IsQ0FBQztRQU1ELElBQUksZUFBZTtZQUNqQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNsQyxDQUFDO1FBS0QsSUFBSSxlQUFlO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ2xDLENBQUM7UUFNRCxJQUFJLG1CQUFtQjtZQUNyQixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUN0QyxDQUFDO1FBSUQsSUFBSSxpQkFBaUI7WUFDbkIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDcEMsQ0FBQztRQUdELElBQUksZUFBZTtZQUNqQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNsQyxDQUFDO1FBd0JEOzs7Ozs7V0FNRztRQUNILE9BQU8sQ0FBQyxJQUFrQjtZQUN4QixJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUM7UUFFRCxhQUFhLENBQUMsU0FBa0M7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsYUFBYSxDQUFDLFNBQXVCO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELG9CQUFvQixDQUFDLFNBQWlCO1lBQ3BDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ2IsT0FBTzthQUNSO1lBQ0QsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDeEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsbUJBQW1CO1lBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELFVBQVUsQ0FDTixRQUFxQyxFQUFFLE1BQWUsRUFBRSxVQUFrQixFQUMxRSxTQUFTLEdBQUcsS0FBSztZQUNuQixJQUFJLElBQXNCLENBQUM7WUFDM0IsTUFBTSxFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUM7WUFDMUIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQ3BELElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksR0FBRyxXQUFXLENBQUM7b0JBQ2pCLEVBQUU7b0JBQ0YsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO29CQUM5QixTQUFTLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFNO29CQUNuQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7b0JBQ2pCLFVBQVU7b0JBQ1YsSUFBSSxFQUFFLEVBQUU7aUJBQ1QsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLG1CQUFtQixDQUFDO29CQUN6QixFQUFFO29CQUNGLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUk7b0JBQ2hDLE1BQU0sRUFBRSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxVQUFVO29CQUNWLElBQUksRUFBRSxFQUFFO29CQUNSLEtBQUssRUFBRSxFQUFFO2lCQUNWLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBZ0IsRUFBYSxFQUFFO2dCQUN0RCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2Y7Z0JBQ0QsTUFBTSxFQUFFLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQW9CLE1BQU8sQ0FBQyxDQUFDO29CQUM1QixnQkFBZ0IsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDaEIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7d0JBQ3hDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNwQixFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQzt3QkFDcEIsSUFBSSxZQUFZLEVBQUU7NEJBQ2hCLEtBQUssR0FBRyxRQUFRLENBQUM7eUJBQ2xCO3FCQUNGO3lCQUFNO3dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNyQjtpQkFDRjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGFBQWEsQ0FBQyxVQUFlO1lBQzNCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELG1CQUFtQjtZQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxlQUFlLENBQUMsU0FBa0M7WUFDaEQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsY0FBYztZQUNaLE9BQU8sYUFBYSxDQUFDO2dCQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0JBQ25FLElBQUksQ0FBQyxnQkFBZ0I7YUFDdEIsQ0FBQztpQkFDSixJQUFJLENBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUNoQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLEVBQUUsRUFBRTtnQkFDMUUsT0FBTyxVQUFVLENBQUM7b0JBQ2hCLGNBQWMsRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDL0MsZ0JBQWdCLEVBQUUsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQWU7b0JBQ25DLHlCQUF5QixFQUFFLElBQUssQ0FBQyx5QkFBeUI7aUJBQzNELENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxDQUFDO1FBRUQsaUJBQWlCLENBQUMsYUFBb0M7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsbUJBQW1CO1lBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQU0sRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCx1QkFBdUI7WUFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsaUJBQWlCLENBQUMsTUFBcUQ7WUFDckUsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNELElBQUksYUFBYSxJQUFJLElBQUksRUFBRTtnQkFDekIsYUFBYSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNuQyxhQUFhLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLElBQUksb0JBQW9CLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQ3ZDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO29CQUNsRCxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDWixjQUFjLEdBQUc7NEJBQ2YsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7NEJBQy9CLGFBQWE7NEJBQ2IsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7eUJBQ2pDLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsY0FBYyxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUM7cUJBQ3JEO29CQUNELE9BQU8sY0FBYyxDQUFDO2dCQUN4QixDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsb0JBQW9CLENBQUMsVUFBcUM7WUFDeEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBRU8sY0FBYyxDQUFDLEtBQWdCLEVBQUUsU0FBUyxHQUFHLENBQUM7WUFDcEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDdEIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQW9CLENBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUMzRTtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRU8sZ0JBQWdCO1lBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBa0IsRUFBRSxFQUFFO2dCQUMxQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMvRCxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBaUIsRUFBYSxFQUFFO29CQUN2RCxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQ2hDLENBQUMsbUJBQWdELEVBQStCLEVBQUU7b0JBQ2hGLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLENBQUM7d0JBQ3BELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEMsRUFBRSxDQUFDO2dCQUNULENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQzVCLENBQUMsZUFBd0MsRUFBMkIsRUFBRTtvQkFDcEUsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN6RixDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUM5QixDQUFDLENBQTRCLEVBQTZCLEVBQUU7b0JBQzFELE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLEVBQUUsQ0FBQztnQkFDNUQsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFTywwQkFBMEI7WUFDaEMsSUFBSSxDQUFDLGVBQWU7Z0JBQ3lCLElBQUksQ0FBQyxzQkFBdUI7cUJBQ2hFLElBQUksQ0FDRCxJQUFJLENBQUMsQ0FBQyxjQUF1QyxFQUFFLEVBQThCLEVBQUUsRUFBRTtvQkFDL0UsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzVCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRU8sOEJBQThCO1lBQ3BDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUMzRCxJQUFJLENBQ0EsQ0FBQyxrQkFBK0MsRUFDL0MsRUFBa0MsRUFBRSxFQUFFO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsRUFDRCxFQUFFLENBQUMsRUFDUCxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQ2hCLFFBQVEsRUFBRSxDQUNiLENBQUM7UUFDSixDQUFDO1FBRU8sNEJBQTRCO1lBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUN2RCxJQUFJLENBQ0EsQ0FBQyxnQkFBMkMsRUFBRSxFQUFvQyxFQUFFLEVBQUU7Z0JBQ3BGLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUNELEVBQUUsQ0FBQyxFQUNQLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFDaEIsUUFBUSxFQUFFLENBQ2IsQ0FBQztRQUNKLENBQUM7UUFFTyxpQkFBaUI7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBbUMsSUFBSSxDQUFDLGFBQWM7aUJBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFnQixFQUFFLEVBQXFCLEVBQUUsRUFBRTtnQkFDL0MsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzlCLEdBQUcsQ0FBQyxDQUFDLEtBQWdCLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRWxGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ25DLEdBQUcsQ0FBQyxDQUFDLEtBQWdCLEVBQUUsRUFBRSxDQUFhLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzdFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQTRCLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUMzRixRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFFTyxhQUFhO1lBQ25CLElBQUksQ0FBQyxtQkFBbUI7aUJBQ25CLElBQUksQ0FDRCxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUNsRixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsU0FBUyxHQUFHLFNBQVUsQ0FBQztnQkFDdkIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDO29CQUM3QyxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDO2dCQUVULE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztnQkFDL0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQztvQkFDL0QsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FDOUIsQ0FBQyxTQUFpQixFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUQsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLHNCQUFzQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7Z0JBRS9ELElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2xDLE1BQU0sT0FBTyxHQUE4QixJQUFJLENBQUM7b0JBQ2hELE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQzt3QkFDbEQsYUFBYSxDQUFDLEVBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELFNBQVMsQ0FBQztvQkFDZCxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0JBQ3JDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztpQkFDdEM7Z0JBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ2pCLE1BQU0sS0FBSyxHQUFHLElBQWdCLENBQUM7b0JBQy9CLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQztvQkFDM0MsS0FBSyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO29CQUM3QyxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7d0JBQ3hDLGFBQWEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxTQUFTLENBQUM7b0JBQ2QsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDcEMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztvQkFDckMsTUFBTSxvQkFBb0IsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUM7b0JBQzdELElBQUksUUFBUSxHQUFnQixRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxRQUFRLEdBQWdCLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLFNBQVMsR0FBZ0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ2hFLElBQUksU0FBUyxHQUFnQixRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUM7cUJBQ2pCO29CQUNELElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUNuQixRQUFRLEdBQUcsSUFBSSxDQUFDO3FCQUNqQjtvQkFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDcEIsU0FBUyxHQUFHLElBQUksQ0FBQztxQkFDbEI7b0JBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3BCLFNBQVMsR0FBRyxJQUFJLENBQUM7cUJBQ2xCO29CQUNELElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSTt3QkFDdEMsQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLElBQUksb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDakUsUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFNBQVMsSUFBSSxJQUFJO3dCQUN6RCxTQUFTLElBQUksSUFBSSxFQUFFO3dCQUNyQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxJQUFJLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNqRSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzt3QkFDbkMsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDbEUsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0UsVUFBVSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0UsVUFBVSxDQUFDLFNBQVM7NEJBQ2hCLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQ25FLFVBQVUsQ0FBQyxTQUFTOzRCQUNoQixTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUNuRSxVQUFVLENBQUMsVUFBVTs0QkFDakIsQ0FBQyxvQkFBb0I7Z0NBQ3BCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQTRDLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dDQUNqRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7Z0NBQ3RCLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTs2QkFDN0IsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO3FCQUMvQjt5QkFBTTt3QkFDTCxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztxQkFDOUI7b0JBQ0QsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztvQkFDaEQsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQUM7b0JBQ3ZELElBQUksWUFBWSxJQUFJLElBQUk7d0JBQ3BCLENBQUMsaUJBQWlCLElBQUksSUFBSSxJQUFJLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDL0QsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDeEQsT0FBTyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7d0JBQ2hFLE9BQU8sQ0FBQyxVQUFVOzRCQUNkLENBQUMsaUJBQWlCO2dDQUNqQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUE4QyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2hFLFNBQVMsRUFBRSxDQUFDLENBQUMsU0FBUztnQ0FDdEIsY0FBYyxFQUFFLENBQUMsQ0FBQyxjQUFjOzZCQUNqQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNMLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO3FCQUMzQjtvQkFDRCxLQUFLLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxDQUFDO3dCQUM5RCxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxTQUFTLENBQUM7b0JBQ2QsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUM3QixLQUFLLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUM7b0JBRTdDLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQzdCLE1BQU0sR0FBRyxHQUE2QixLQUFLLENBQUM7d0JBQzNDLEdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7d0JBQzVELEdBQUcsQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQzt3QkFDN0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDO3dCQUN6QyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCOzRCQUM1QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2xGO2lCQUNGO2dCQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRWpDLE9BQU8sQ0FBQyxLQUFnQixFQUFhLEVBQUU7b0JBQ3JDLElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzdDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDZCwyQ0FBMkM7d0JBQzNDLCtCQUErQjt3QkFDL0IsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7d0JBQ3hDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN2QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3BCLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNwRCxFQUFFLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQzt3QkFDcEIsSUFBSSxZQUFZLEVBQUU7NEJBQ2hCLEtBQUssR0FBRyxRQUFRLENBQUM7eUJBQ2xCOzZCQUFNOzRCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN4Qjt3QkFDRCxXQUFXO3dCQUNYLHlDQUF5Qzt3QkFDekMsNkVBQTZFO3dCQUM3RSxJQUFJO3dCQUNKLElBQUksc0JBQXNCLEdBQUcsc0JBQXNCLEVBQUU7NEJBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsc0JBQXNCLEVBQUUsQ0FBQyxHQUFHLHNCQUFzQixFQUFFLENBQUMsRUFBRSxFQUFFO2dDQUNwRSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs2QkFDM0M7eUJBQ0Y7cUJBQ0Y7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ04sU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxDQUFDO1FBRU8sZUFBZTtZQUNpQixJQUFJLENBQUMscUJBQXNCO2lCQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBa0MsRUFBRSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxLQUFnQixFQUFhLEVBQUU7b0JBQ3JDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQzVCLElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTt3QkFDZCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQzt3QkFDeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDdEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BELEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO3dCQUNwQixJQUFJLFlBQVksRUFBRTs0QkFDaEIsS0FBSyxHQUFHLFFBQVEsQ0FBQzt5QkFDbEI7NkJBQU07NEJBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3hCO3dCQUNELEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3hDO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNmLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO2lCQUNGLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUNGLENBQUE7SUF2bEJZLHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7O09BQ0EscUJBQXFCLENBdWxCakM7SUFBRCw0QkFBQztLQUFBO1NBdmxCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luLFxuICBBamZDaG9pY2VzT3JpZ2luLFxuICBBamZGaWVsZCxcbiAgQWpmRmllbGRUeXBlLFxuICBBamZGaWVsZFdpdGhDaG9pY2VzLFxuICBBamZGb3JtLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllcixcbiAgQWpmTm9kZSxcbiAgQWpmTm9kZUdyb3VwLFxuICBBamZOb2Rlc09wZXJhdGlvbixcbiAgQWpmTm9kZVR5cGUsXG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIEFqZlJlcGVhdGluZ1NsaWRlLFxuICBBamZTbGlkZSxcbiAgY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBjcmVhdGVDb250YWluZXJOb2RlLFxuICBjcmVhdGVGaWVsZCxcbiAgY3JlYXRlRm9ybSxcbiAgY3JlYXRlVmFsaWRhdGlvbixcbiAgY3JlYXRlVmFsaWRhdGlvbkdyb3VwLFxuICBjcmVhdGVXYXJuaW5nLFxuICBjcmVhdGVXYXJuaW5nR3JvdXAsXG4gIGlzQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBpc0NvbnRhaW5lck5vZGUsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlLFxuICBpc1NsaWRlc05vZGUsXG4gIG1heERpZ2l0c1ZhbGlkYXRpb24sXG4gIG1heFZhbGlkYXRpb24sXG4gIG1pbkRpZ2l0c1ZhbGlkYXRpb24sXG4gIG1pblZhbGlkYXRpb24sXG4gIG5vdEVtcHR5VmFsaWRhdGlvbixcbiAgbm90RW1wdHlXYXJuaW5nXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBjcmVhdGVDb25kaXRpb24sIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50LCBzY2FuLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvblxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ307XG4gIG5vZGVUeXBlOiB7XG4gICAgbm9kZTogQWpmTm9kZVR5cGU7XG4gICAgZmllbGQ/OiBBamZGaWVsZFR5cGUsXG4gIH07XG4gIGlzU2xpZGU/OiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICBub2RlOiBBamZOb2RlO1xuICBjb250YWluZXI6IEFqZkNvbnRhaW5lck5vZGV8bnVsbDtcbiAgY2hpbGRyZW46IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG4gIGNvbnRlbnQ6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCB7XG4gIHBhcmVudDogQWpmTm9kZTtcbiAgcGFyZW50Tm9kZTogbnVtYmVyO1xufVxuXG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1CdWlsZGVyTm9kZSA9IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90O1xuZXhwb3J0IHR5cGUgQWpmQ29udGFpbmVyTm9kZSA9IEFqZlNsaWRlfEFqZlJlcGVhdGluZ1NsaWRlfEFqZk5vZGVHcm91cDtcblxuZnVuY3Rpb24gZ2V0Tm9kZUNvbnRhaW5lcihjOiB7bm9kZXM6IEFqZk5vZGVbXX0sIG5vZGU6IEFqZk5vZGUpOiB7bm9kZXM6IEFqZk5vZGVbXX18bnVsbCB7XG4gIGlmIChjLm5vZGVzLmluZGV4T2Yobm9kZSkgPiAtMSkge1xuICAgIHJldHVybiBjO1xuICB9XG4gIGNvbnN0IGNucyA9IGMubm9kZXMuZmlsdGVyKG4gPT4gaXNDb250YWluZXJOb2RlKG4pKTtcbiAgY29uc3QgbGVuID0gY25zLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcig8QWpmQ29udGFpbmVyTm9kZT5jbnNbaV0sIG5vZGUpO1xuICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gY247XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKFxuICAgIG5vZGVzOiBBamZOb2RlW10sIHBhcmVudDogQWpmTm9kZSwgaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcyA9IGZhbHNlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBjb25zdCBlbnRyaWVzOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IG5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChuMSwgbjIpID0+IG4xLnBhcmVudE5vZGUgLSBuMi5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh7cGFyZW50OiBuLCBwYXJlbnROb2RlOiAwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2RlcywgbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgaWYgKCFpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgY29uc3QgZW50cmllc051bSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNicyA9IHBhcmVudC5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gZW50cmllc051bTsgaSA8IGNiczsgaSsrKSB7XG4gICAgICBlbnRyaWVzLnB1c2goe3BhcmVudDogcGFyZW50LCBwYXJlbnROb2RlOiBpfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnRyaWVzO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KF9ub2RlczogQWpmTm9kZVtdLCBub2RlOiBBamZOb2RlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzLCBub2RlLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlczogQWpmTm9kZVtdKTogKEFqZkZvcm1CdWlsZGVyTm9kZXxudWxsKVtdIHtcbiAgY29uc3Qgcm9vdE5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT0gbnVsbCB8fCBuLnBhcmVudCA9PT0gMCk7XG4gIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3Qgcm9vdE5vZGUgPSByb290Tm9kZXNbMF07XG4gICAgaWYgKGlzU2xpZGVzTm9kZShyb290Tm9kZSkpIHtcbiAgICAgIGNvbnN0IHRyZWU6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gW107XG4gICAgICB0cmVlLnB1c2goPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogcm9vdE5vZGUsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2Rlcywgcm9vdE5vZGUpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtudWxsXTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybSBkZWZpbml0aW9uJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBmbGF0Tm9kZXMgPSBmbGF0Tm9kZXMuY29uY2F0KGZsYXR0ZW5Ob2RlcygoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMpKTtcbiAgICB9XG4gICAgZmxhdE5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG5cbmZ1bmN0aW9uIGdldERlc2NlbmRhbnRzKFxuICAgIGZsYXROb2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlcnxudWxsID0gbnVsbCk6IEFqZk5vZGVbXSB7XG4gIHJldHVybiBicmFuY2ggIT0gbnVsbCA/XG4gICAgICBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQgJiYgbi5wYXJlbnROb2RlID09PSBicmFuY2gpIDpcbiAgICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGVzKG5vZGVzOiBBamZOb2RlW10sIGlkczogbnVtYmVyW10pOiBBamZOb2RlW10ge1xuICBjb25zdCBsZW4gPSBub2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gKDxBamZDb250YWluZXJOb2RlPm5vZGUpO1xuICAgICAgY29udGFpbmVyLm5vZGVzID0gcmVtb3ZlTm9kZXMoY29udGFpbmVyLm5vZGVzLCBpZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZXMuZmlsdGVyKG4gPT4gaWRzLmluZGV4T2Yobi5pZCkgPT09IC0xKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZVN1YnRyZWUoXG4gICAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50Tm9kZTogQWpmTm9kZSwgYnJhbmNoOiBudW1iZXJ8bnVsbCA9IG51bGwpOiBBamZOb2RlW10ge1xuICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXMobm9kZXMpO1xuICBsZXQgZGVsTm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBsZXQgZGVzY2VuZGFudHMgPSBnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIHBhcmVudE5vZGUsIGJyYW5jaCk7XG4gIGNvbnN0IGxlbiA9IGRlc2NlbmRhbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgZGVzY2VuZGFudHNbaV0pKTtcbiAgfVxuICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChkZXNjZW5kYW50cyk7XG4gIHJldHVybiByZW1vdmVOb2Rlcyhub2RlcywgZGVsTm9kZXMubWFwKG4gPT4gbi5pZCkpO1xufVxuXG5sZXQgbm9kZVVuaXF1ZUlkID0gMDtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYXZhaWxhYmxlTm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ1NsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXNsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlNsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmVwZWF0aW5nIHNsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJlcGVhdGluZ3NsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU3RyaW5nJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXN0cmluZyd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TdHJpbmd9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RleHQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGV4dCd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UZXh0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdOdW1iZXInLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbnVtYmVyJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk51bWJlcn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnQm9vbGVhbicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1ib29sZWFuJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkJvb2xlYW59XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1NpbmdsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2luZ2xlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW11bHRpcGxlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdGb3JtdWxhJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWZvcm11bGEnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRm9ybXVsYX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUgaW5wdXQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZWlucHV0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGVJbnB1dH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGltZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10aW1lJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRpbWV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RhYmxlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRhYmxlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRhYmxlfVxuICAgIH1cbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm18bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm18bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2Zvcm1PYnM6IE9ic2VydmFibGU8QWpmRm9ybXxudWxsPiA9IHRoaXMuX2Zvcm0uYXNPYnNlcnZhYmxlKCk7XG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+O1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+O1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+O1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4gPVxuICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5LmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkTm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWROb2RlRW50cnlPYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb246IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb258bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD4gPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkQ2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgYmVmb3JlTm9kZXNVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlT2JzO1xuICB9XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hZnRlck5vZGVVcGRhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBhZnRlck5vZGVVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyTm9kZVVwZGF0ZU9icztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclVwZGF0ZXM6IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NhdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHJpdmF0ZSBfZGVsZXRlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEF0dGFjaG1lbnRzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFNhdmVOb2RlKCk7XG4gICAgdGhpcy5faW5pdERlbGV0ZU5vZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IGVkaXRlZCBmb3JtXG4gICAqXG4gICAqIEBwYXJhbSBmb3JtXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEZvcm0oZm9ybTogQWpmRm9ybXxudWxsKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gIT09IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVkaXROb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQoY29uZGl0aW9uKTtcbiAgfVxuXG4gIHNhdmVDdXJyZW50Q29uZGl0aW9uKGNvbmRpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGMgPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uZ2V0VmFsdWUoKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgY2FuY2VsQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgICAgbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSwgcGFyZW50OiBBamZOb2RlLCBwYXJlbnROb2RlOiBudW1iZXIsXG4gICAgICBpbkNvbnRlbnQgPSBmYWxzZSk6IHZvaWQge1xuICAgIGxldCBub2RlOiBBamZOb2RlfEFqZkZpZWxkO1xuICAgIGNvbnN0IGlkID0gKytub2RlVW5pcXVlSWQ7XG4gICAgY29uc3QgaXNGaWVsZE5vZGUgPSBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCAhPSBudWxsO1xuICAgIGlmIChpc0ZpZWxkTm9kZSkge1xuICAgICAgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZCxcbiAgICAgICAgZmllbGRUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCEsXG4gICAgICAgIHBhcmVudDogcGFyZW50LmlkLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gY3JlYXRlQ29udGFpbmVyTm9kZSh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogbm9kZVR5cGUubm9kZVR5cGUubm9kZSxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQgIT0gbnVsbCA/IHBhcmVudC5pZCA6IDAsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBub2RlczogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW25vZGVdO1xuICAgICAgfVxuICAgICAgY29uc3QgY24gPSBpc0NvbnRhaW5lck5vZGUocGFyZW50KSAmJiBpbkNvbnRlbnQgPyAoPEFqZkNvbnRhaW5lck5vZGU+cGFyZW50KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgcGFyZW50KTtcbiAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgIGlmICghaXNGaWVsZE5vZGUpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY24ubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZU5vZGVFbnRyeShwcm9wZXJ0aWVzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnQuZW1pdChwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbmNlbE5vZGVFbnRyeUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gIH1cblxuICBkZWxldGVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRGb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgICB0aGlzLmZvcm0sIHRoaXMubm9kZXMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLCB0aGlzLmNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgICAgIHRoaXMuc3RyaW5nSWRlbnRpZmllclxuICAgICAgICAgICBdKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoW2Zvcm1dKSA9PiBmb3JtICE9IG51bGwpLFxuICAgICAgICAgICAgbWFwKChbZm9ybSwgbm9kZXMsIGF0dGFjaG1lbnRzT3JpZ2lucywgY2hvaWNlc09yaWdpbnMsIHN0cmluZ0lkZW50aWZpZXJdKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzT3JpZ2luczogY2hvaWNlc09yaWdpbnMuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zOiBhdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgc3RyaW5nSWRlbnRpZmllcjogKHN0cmluZ0lkZW50aWZpZXIgfHwgW10pLnNsaWNlKDApLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBub2Rlcy5zbGljZSgwKSBhcyBBamZTbGlkZVtdLFxuICAgICAgICAgICAgICAgIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM6IGZvcm0hLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgY3JlYXRlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luPGFueT4oe25hbWU6ICcnfSkpO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZUNob2ljZXNPcmlnaW4ocGFyYW1zOiB7bGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjaG9pY2VzOiBhbnlbXX0pOiB2b2lkIHtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2luID0gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgIGNob2ljZXNPcmlnaW4ubGFiZWwgPSBwYXJhbXMubGFiZWw7XG4gICAgICBjaG9pY2VzT3JpZ2luLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICAgIGlmIChpc0Nob2ljZXNGaXhlZE9yaWdpbihjaG9pY2VzT3JpZ2luKSkge1xuICAgICAgICBjaG9pY2VzT3JpZ2luLmNob2ljZXMgPSBwYXJhbXMuY2hvaWNlcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KChjaG9pY2VzT3JpZ2lucykgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBjaG9pY2VzT3JpZ2lucy5pbmRleE9mKGNob2ljZXNPcmlnaW4pO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFtcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKDAsIGlkeCksXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2luLFxuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoaWR4ICsgMSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFsuLi5jaG9pY2VzT3JpZ2lucywgY2hvaWNlc09yaWdpbl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXNPcmlnaW5zO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKGlkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KCgpID0+IFsuLi5pZGVudGlmaWVyXSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5kTWF4Tm9kZUlkKG5vZGVzOiBBamZOb2RlW10sIF9jdXJNYXhJZCA9IDApOiBudW1iZXIge1xuICAgIGxldCBtYXhJZCA9IDA7XG4gICAgbm9kZXMuZm9yRWFjaCgobikgPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgbi5pZCk7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKG4pKSB7XG4gICAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHRoaXMuX2ZpbmRNYXhOb2RlSWQoKDxBamZDb250YWluZXJOb2RlPm4pLm5vZGVzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1heElkO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm0uc3Vic2NyaWJlKChmb3JtOiBBamZGb3JtfG51bGwpID0+IHtcbiAgICAgIG5vZGVVbmlxdWVJZCA9IDA7XG4gICAgICBpZiAoZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCAmJiBmb3JtLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZVVuaXF1ZUlkID0gdGhpcy5fZmluZE1heE5vZGVJZChmb3JtLm5vZGVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChfbm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsID8gZm9ybS5ub2Rlcy5zbGljZSgwKSA6IFtdO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF9hdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSk6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zICE9IG51bGwgP1xuICAgICAgICAgICAgICAgIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgICB9KTtcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAgIChfY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmNob2ljZXNPcmlnaW5zICE9IG51bGwgPyBmb3JtLmNob2ljZXNPcmlnaW5zLnNsaWNlKDApIDogW107XG4gICAgICAgICAgfSk7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KFxuICAgICAgICAgIChfOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uc3RyaW5nSWRlbnRpZmllciAhPSBudWxsID8gZm9ybS5zdHJpbmdJZGVudGlmaWVyLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+PnRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oKGNob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AoY2hvaWNlc09yaWdpbnMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnMgPSB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLnBpcGUoXG4gICAgICAgIHNjYW4oXG4gICAgICAgICAgICAoYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICAgICAgICAgICAgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3AoYXR0YWNobWVudHNPcmlnaW5zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyID0gdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMucGlwZShcbiAgICAgICAgc2NhbihcbiAgICAgICAgICAgIChzdHJpbmdJZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdLCBvcDogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0cmluZ0lkZW50aWZpZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtdKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9ICg8T2JzZXJ2YWJsZTxBamZOb2Rlc09wZXJhdGlvbj4+dGhpcy5fbm9kZXNVcGRhdGVzKVxuICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKG5vZGVzOiBBamZOb2RlW10sIG9wOiBBamZOb2Rlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiBmbGF0dGVuTm9kZXMobm9kZXMpKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mbGF0RmllbGRzID0gdGhpcy5fZmxhdE5vZGVzLnBpcGUoXG4gICAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gPEFqZkZpZWxkW10+bm9kZXMuZmlsdGVyKG4gPT4gIWlzQ29udGFpbmVyTm9kZShuKSkpLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICAgIG1hcChub2RlcyA9PiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT5idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzKSksIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICAgIHJlZkNvdW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmVOb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudFxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuZWRpdGVkTm9kZUVudHJ5LCB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAgICAgICBmaWx0ZXIoKFtfLCBub2RlRW50cnldKSA9PiBub2RlRW50cnkgIT0gbnVsbCksIG1hcCgoW3Byb3BlcnRpZXMsIG5vZGVFbnRyeV0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgICAgICBub2RlRW50cnkgPSBub2RlRW50cnkhO1xuICAgICAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9IHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kaXRpb246IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSkgOlxuICAgICAgICAgICAgICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUuZm9ybXVsYVJlcHMgPSBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5taW5SZXBzID0gcHJvcGVydGllcy5taW5SZXBzO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5mb3JtdWxhID0gcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmb3JjZVZhbHVlICE9IG51bGwgfHwgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8IG1heFZhbHVlICE9IG51bGwgfHwgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9IG1heFZhbHVlICE9IG51bGwgPyBtYXhWYWxpZGF0aW9uKG1heFZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCA/IG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluRGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCA/IG1heERpZ2l0c1ZhbGlkYXRpb24obWF4RGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKGM6IHtjb25kaXRpb246IHN0cmluZywgZXJyb3JNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogYy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh3OiB7Y29uZGl0aW9uOiBzdHJpbmcsIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC5uZXh0U2xpZGVDb25kaXRpb24gPSBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZmllbGQuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmd2MgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PmZpZWxkO1xuICAgICAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZU5hcnJvdyA9IHByb3BlcnRpZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHQ6IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaWR4ID0gbm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpXG4gICAgICAgIC5waXBlKG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5vZGVzID0gZGVsZXRlTm9kZVN1YnRyZWUobm9kZXMsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cbn1cbiJdfQ==