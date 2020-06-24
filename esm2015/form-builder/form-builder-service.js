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
    class AjfFormBuilderService {
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
    }
    AjfFormBuilderService.decorators = [
        { type: Injectable }
    ];
    AjfFormBuilderService.ctorParameters = () => [];
    return AjfFormBuilderService;
})();
export { AjfFormBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBT1osV0FBVyxFQUlYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXFDMUYsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFxQixFQUFFLElBQWE7SUFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMs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LE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEQsRUFBRSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7d0JBQ3BCLElBQUksWUFBWSxFQUFFOzRCQUNoQixLQUFLLEdBQUcsUUFBUSxDQUFDO3lCQUNsQjs2QkFBTTs0QkFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDeEI7d0JBQ0QsS0FBSyxHQUFHLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDeEM7b0JBQ0QsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7aUJBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7Z0JBdmxCRixVQUFVOzs7SUF3bEJYLDRCQUFDO0tBQUE7U0F2bEJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sXG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZkZvcm0sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLFxuICBBamZOb2RlLFxuICBBamZOb2RlR3JvdXAsXG4gIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgQWpmUmVwZWF0aW5nU2xpZGUsXG4gIEFqZlNsaWRlLFxuICBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUNvbnRhaW5lck5vZGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBjcmVhdGVGb3JtLFxuICBjcmVhdGVWYWxpZGF0aW9uLFxuICBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsXG4gIGNyZWF0ZVdhcm5pbmdHcm91cCxcbiAgaXNDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGlzQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzU2xpZGVzTm9kZSxcbiAgbWF4RGlnaXRzVmFsaWRhdGlvbixcbiAgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbixcbiAgbWluVmFsaWRhdGlvbixcbiAgbm90RW1wdHlWYWxpZGF0aW9uLFxuICBub3RFbXB0eVdhcm5pbmdcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHNjYW4sIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkge1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfTtcbiAgbm9kZVR5cGU6IHtcbiAgICBub2RlOiBBamZOb2RlVHlwZTtcbiAgICBmaWVsZD86IEFqZkZpZWxkVHlwZSxcbiAgfTtcbiAgaXNTbGlkZT86IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gIG5vZGU6IEFqZk5vZGU7XG4gIGNvbnRhaW5lcjogQWpmQ29udGFpbmVyTm9kZXxudWxsO1xuICBjaGlsZHJlbjogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbiAgY29udGVudDogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90IHtcbiAgcGFyZW50OiBBamZOb2RlO1xuICBwYXJlbnROb2RlOiBudW1iZXI7XG59XG5cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGV8QWpmUmVwZWF0aW5nU2xpZGV8QWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfXxudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xKSB7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgY29uc3QgY25zID0gYy5ub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGUobikpO1xuICBjb25zdCBsZW4gPSBjbnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY24gPSBnZXROb2RlQ29udGFpbmVyKDxBamZDb250YWluZXJOb2RlPmNuc1tpXSwgbm9kZSk7XG4gICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBjbjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoXG4gICAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBBamZOb2RlLCBpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzID0gZmFsc2UpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGNvbnN0IGVudHJpZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gbm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCBuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHtwYXJlbnQ6IG4sIHBhcmVudE5vZGU6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICBpZiAoIWlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzTnVtID0gZW50cmllcy5sZW5ndGg7XG4gICAgY29uc3QgY2JzID0gcGFyZW50LmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSBlbnRyaWVzTnVtOyBpIDwgY2JzOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7cGFyZW50OiBwYXJlbnQsIHBhcmVudE5vZGU6IGl9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlfG51bGwpW10ge1xuICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PSBudWxsIHx8IG4ucGFyZW50ID09PSAwKTtcbiAgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3ROb2Rlc1swXTtcbiAgICBpZiAoaXNTbGlkZXNOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgY29uc3QgdHJlZTogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBbXTtcbiAgICAgIHRyZWUucHVzaCg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiByb290Tm9kZSxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCByb290Tm9kZSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW251bGxdO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmb3JtIGRlZmluaXRpb24nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZVtdID0gW107XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2RlcykpO1xuICAgIH1cbiAgICBmbGF0Tm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoXG4gICAgZmxhdE5vZGVzOiBBamZOb2RlW10sIHBhcmVudE5vZGU6IEFqZk5vZGUsIGJyYW5jaDogbnVtYmVyfG51bGwgPSBudWxsKTogQWpmTm9kZVtdIHtcbiAgcmV0dXJuIGJyYW5jaCAhPSBudWxsID9cbiAgICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCAmJiBuLnBhcmVudE5vZGUgPT09IGJyYW5jaCkgOlxuICAgICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSAoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSk7XG4gICAgICBjb250YWluZXIubm9kZXMgPSByZW1vdmVOb2Rlcyhjb250YWluZXIubm9kZXMsIGlkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2Rlcy5maWx0ZXIobiA9PiBpZHMuaW5kZXhPZihuLmlkKSA9PT0gLTEpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlU3VidHJlZShcbiAgICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlcnxudWxsID0gbnVsbCk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlcyhub2Rlcyk7XG4gIGxldCBkZWxOb2RlczogQWpmTm9kZVtdID0gW107XG4gIGxldCBkZXNjZW5kYW50cyA9IGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgcGFyZW50Tm9kZSwgYnJhbmNoKTtcbiAgY29uc3QgbGVuID0gZGVzY2VuZGFudHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKG5vZGVzLCBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSZXBlYXRpbmcgc2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmVwZWF0aW5nc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc3RyaW5nJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ31cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1udW1iZXInfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWJvb2xlYW4nfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdNdWx0aXBsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbXVsdGlwbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZm9ybXVsYSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlaW5wdXQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUaW1lJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRpbWUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGltZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9XG4gICAgfVxuICBdO1xuICAvKipcbiAgICogQXZhaWxhYmxlIG5vZGUgdHlwZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBhdmFpbGFibGVOb2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9hdmFpbGFibGVOb2RlVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybXxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybXxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZm9ybU9iczogT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+ID0gdGhpcy5fZm9ybS5hc09ic2VydmFibGUoKTtcbiAgLyoqXG4gICAqIEN1cnJlbnQgZWRpdGVkIGZvcm0gc3RyZWFtXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm18bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9mb3JtT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT47XG4gIGdldCBhdHRhY2htZW50c09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+O1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXI6IE9ic2VydmFibGU8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXT47XG4gIGdldCBzdHJpbmdJZGVudGlmaWVyKCk6IE9ic2VydmFibGU8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLl9zdHJpbmdJZGVudGlmaWVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPjtcbiAgZ2V0IG5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhdE5vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBmbGF0Tm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdE5vZGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmxhdEZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZsYXRGaWVsZHMoKTogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXRGaWVsZHM7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT47XG4gIGdldCBub2RlRW50cmllc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZTtcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeU9iczogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVFbnRyeU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbnxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbnxudWxsPiA9IHRoaXMuX2VkaXRlZENvbmRpdGlvbi5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGVkaXRlZENvbmRpdGlvbigpOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENvbmRpdGlvbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW46IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW5PYnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4uYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWRDaG9pY2VzT3JpZ2luKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBiZWZvcmVOb2Rlc1VwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7XG4gIH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGFmdGVyTm9kZVVwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyVXBkYXRlczogU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwcml2YXRlIF9kZWxldGVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U2F2ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0RGVsZXRlTm9kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgZWRpdGVkIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtfG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZm9ybSAhPT0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLl9mb3JtLm5leHQoZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgZWRpdE5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb24oY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChjb25kaXRpb24pO1xuICB9XG5cbiAgc2F2ZUN1cnJlbnRDb25kaXRpb24oY29uZGl0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYyA9IHRoaXMuX2VkaXRlZENvbmRpdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQobnVsbCk7XG4gIH1cblxuICBjYW5jZWxDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIGluc2VydE5vZGUoXG4gICAgICBub2RlVHlwZTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LCBwYXJlbnQ6IEFqZk5vZGUsIHBhcmVudE5vZGU6IG51bWJlcixcbiAgICAgIGluQ29udGVudCA9IGZhbHNlKTogdm9pZCB7XG4gICAgbGV0IG5vZGU6IEFqZk5vZGV8QWpmRmllbGQ7XG4gICAgY29uc3QgaWQgPSArK25vZGVVbmlxdWVJZDtcbiAgICBjb25zdCBpc0ZpZWxkTm9kZSA9IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkICE9IG51bGw7XG4gICAgaWYgKGlzRmllbGROb2RlKSB7XG4gICAgICBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLFxuICAgICAgICBmaWVsZFR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkISxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQuaWQsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVDb250YWluZXJOb2RlKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5ub2RlLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCAhPSBudWxsID8gcGFyZW50LmlkIDogMCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIG5vZGVzOiBbXSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgaWYgKG5vZGUucGFyZW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBbbm9kZV07XG4gICAgICB9XG4gICAgICBjb25zdCBjbiA9IGlzQ29udGFpbmVyTm9kZShwYXJlbnQpICYmIGluQ29udGVudCA/ICg8QWpmQ29udGFpbmVyTm9kZT5wYXJlbnQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBwYXJlbnQpO1xuICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgaWYgKCFpc0ZpZWxkTm9kZSkge1xuICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICBjb25zdCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgIG5ld05vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbi5ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZXM7XG4gICAgfSk7XG4gIH1cblxuICBzYXZlTm9kZUVudHJ5KHByb3BlcnRpZXM6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudC5lbWl0KHByb3BlcnRpZXMpO1xuICB9XG5cbiAgY2FuY2VsTm9kZUVudHJ5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcbiAgfVxuXG4gIGRlbGV0ZU5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgZ2V0Q3VycmVudEZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICAgICAgIHRoaXMuZm9ybSwgdGhpcy5ub2RlcywgdGhpcy5hdHRhY2htZW50c09yaWdpbnMsIHRoaXMuY2hvaWNlc09yaWdpbnMsXG4gICAgICAgICAgICAgdGhpcy5zdHJpbmdJZGVudGlmaWVyXG4gICAgICAgICAgIF0pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChbZm9ybV0pID0+IGZvcm0gIT0gbnVsbCksXG4gICAgICAgICAgICBtYXAoKFtmb3JtLCBub2RlcywgYXR0YWNobWVudHNPcmlnaW5zLCBjaG9pY2VzT3JpZ2lucywgc3RyaW5nSWRlbnRpZmllcl0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUZvcm0oe1xuICAgICAgICAgICAgICAgIGNob2ljZXNPcmlnaW5zOiBjaG9pY2VzT3JpZ2lucy5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IGF0dGFjaG1lbnRzT3JpZ2lucy5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiAoc3RyaW5nSWRlbnRpZmllciB8fCBbXSkuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgbm9kZXM6IG5vZGVzLnNsaWNlKDApIGFzIEFqZlNsaWRlW10sXG4gICAgICAgICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogZm9ybSEuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoKGNob2ljZXNPcmlnaW5zKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGNob2ljZXNPcmlnaW5zLmluZGV4T2YoY2hvaWNlc09yaWdpbik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gW1xuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW4sXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gWy4uLmNob2ljZXNPcmlnaW5zLCBjaG9pY2VzT3JpZ2luXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlc09yaWdpbnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoKCkgPT4gWy4uLmlkZW50aWZpZXJdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCBuLmlkKTtcbiAgICAgIGlmIChpc0NvbnRhaW5lck5vZGUobikpIHtcbiAgICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdGhpcy5fZmluZE1heE5vZGVJZCgoPEFqZkNvbnRhaW5lck5vZGU+bikubm9kZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SWQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybS5zdWJzY3JpYmUoKGZvcm06IEFqZkZvcm18bnVsbCkgPT4ge1xuICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAoX2F0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5hdHRhY2htZW50c09yaWdpbnMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgZm9ybS5hdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgIH0pO1xuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgICB9KTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF86IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGwgPyBmb3JtLnN0cmluZ0lkZW50aWZpZXIuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4+dGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjaG9pY2VzT3JpZ2lucyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgICAgc2NhbihcbiAgICAgICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICAgICAgICBvcDogQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtdKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgICBzY2FuKFxuICAgICAgICAgICAgKHN0cmluZ0lkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sIG9wOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3Aoc3RyaW5nSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW10pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2Nhbigobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IGZsYXR0ZW5Ob2Rlcyhub2RlcykpLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiA8QWpmRmllbGRbXT5ub2Rlcy5maWx0ZXIobiA9PiAhaXNDb250YWluZXJOb2RlKG4pKSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgICAgbWFwKG5vZGVzID0+IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPmJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXMpKSwgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSwgbWFwKChbcHJvcGVydGllcywgbm9kZUVudHJ5XSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgIG5vZGVFbnRyeSA9IG5vZGVFbnRyeSE7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdOb2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkZWVwQ29weShvcmlnTm9kZSk7XG4gICAgICAgICAgICAgIG5vZGUuaWQgPSBub2RlRW50cnkubm9kZS5pZDtcbiAgICAgICAgICAgICAgbm9kZS5uYW1lID0gcHJvcGVydGllcy5uYW1lO1xuICAgICAgICAgICAgICBub2RlLmxhYmVsID0gcHJvcGVydGllcy5sYWJlbDtcbiAgICAgICAgICAgICAgbm9kZS52aXNpYmlsaXR5ID0gcHJvcGVydGllcy52aXNpYmlsaXR5ICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMudmlzaWJpbGl0eX0pIDpcbiAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgICAgICAgY29uc3Qgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyA9IHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbmRpdGlvbjogc3RyaW5nKSA9PiBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbn0pKSA6XG4gICAgICAgICAgICAgICAgICBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgICAgICAgICBjb25zdCBuZXdDb25kaXRpb25hbEJyYW5jaGVzID0gbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcblxuICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwTm9kZSA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm5vZGU7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5mb3JtdWxhUmVwcyA9IHByb3BlcnRpZXMuZm9ybXVsYVJlcHMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYVJlcHN9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXBOb2RlLm1pblJlcHMgPSBwcm9wZXJ0aWVzLm1pblJlcHM7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5tYXhSZXBzID0gcHJvcGVydGllcy5tYXhSZXBzO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IG5vZGUgYXMgQWpmRmllbGQ7XG4gICAgICAgICAgICAgICAgZmllbGQuZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHByb3BlcnRpZXMuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgICAgIGZpZWxkLmZvcm11bGEgPSBwcm9wZXJ0aWVzLmZvcm11bGEgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYX0pIDpcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmNlVmFsdWUgPSBwcm9wZXJ0aWVzLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5ID0gcHJvcGVydGllcy5ub3RFbXB0eTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluVmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWF4VmFsdWU6IG51bWJlcnxudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5tYXhWYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgIGxldCBtaW5EaWdpdHM6IG51bWJlcnxudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5EaWdpdHMsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4RGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWluVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWF4VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5EaWdpdHMpKSB7XG4gICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWF4RGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlVmFsdWUgIT0gbnVsbCB8fCBub3RFbXB0eSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICAgICh2YWxpZGF0aW9uQ29uZGl0aW9ucyAhPSBudWxsICYmIHZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlICE9IG51bGwgfHwgbWF4VmFsdWUgIT0gbnVsbCB8fCBtaW5EaWdpdHMgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IGZpZWxkLnZhbGlkYXRpb24gfHwgY3JlYXRlVmFsaWRhdGlvbkdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm5vdEVtcHR5ID0gbm90RW1wdHkgPyBub3RFbXB0eVZhbGlkYXRpb24oKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluVmFsdWUgPSBtaW5WYWx1ZSAhPSBudWxsID8gbWluVmFsaWRhdGlvbihtaW5WYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heFZhbHVlID0gbWF4VmFsdWUgIT0gbnVsbCA/IG1heFZhbGlkYXRpb24obWF4VmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5taW5EaWdpdHMgPVxuICAgICAgICAgICAgICAgICAgICAgIG1pbkRpZ2l0cyAhPSBudWxsID8gbWluRGlnaXRzVmFsaWRhdGlvbihtaW5EaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhEaWdpdHMgPVxuICAgICAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyAhPSBudWxsID8gbWF4RGlnaXRzVmFsaWRhdGlvbihtYXhEaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5jb25kaXRpb25zID1cbiAgICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgW10pLm1hcCgoYzoge2NvbmRpdGlvbjogc3RyaW5nLCBlcnJvck1lc3NhZ2U6IHN0cmluZ30pID0+IGNyZWF0ZVZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBjLmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogYy5lcnJvck1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90RW1wdHlXYXJuID0gcHJvcGVydGllcy5ub3RFbXB0eVdhcm5pbmc7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2FybmluZ0NvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLndhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChub3RFbXB0eVdhcm4gIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAod2FybmluZ0NvbmRpdGlvbnMgIT0gbnVsbCAmJiB3YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGZpZWxkLndhcm5pbmcgfHwgY3JlYXRlV2FybmluZ0dyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmcubm90RW1wdHkgPSBub3RFbXB0eVdhcm4gPyBub3RFbXB0eVdhcm5pbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmcuY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHc6IHtjb25kaXRpb246IHN0cmluZywgd2FybmluZ01lc3NhZ2U6IHN0cmluZ30pID0+IGNyZWF0ZVdhcm5pbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiB3LmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQud2FybmluZyA9IHdhcm5pbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpZWxkLm5leHRTbGlkZUNvbmRpdGlvbiA9IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogcHJvcGVydGllcy5uZXh0U2xpZGVDb25kaXRpb259KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBmaWVsZC5zaXplID0gcHJvcGVydGllcy5zaXplO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHByb3BlcnRpZXMuZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZ3YyA9IDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+ZmllbGQ7XG4gICAgICAgICAgICAgICAgICAoZndjIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZiA9IHByb3BlcnRpZXMuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZUV4cGFuZGVkID0gcHJvcGVydGllcy5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgICAgICAgICAgZndjLmZvcmNlTmFycm93ID0gcHJvcGVydGllcy5mb3JjZU5hcnJvdztcbiAgICAgICAgICAgICAgICAgIGZ3Yy50cmlnZ2VyQ29uZGl0aW9ucyA9IChwcm9wZXJ0aWVzLnRyaWdnZXJDb25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10pLm1hcCgodDogc3RyaW5nKSA9PiBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogdH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcblxuICAgICAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgb3JpZ05vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAvLyBUT0RPOiBAdHJpayBjaGVjayB0aGlzLCB3YXMgYWx3YXlzIHRydWU/XG4gICAgICAgICAgICAgICAgICAvLyBpZiAoY24gaW5zdGFuY2VvZiBBamZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICAgIGxldCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBpZHggPSBub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICAgIC8vICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwLCBpZHgpLmNvbmNhdChbbm9kZV0pLmNvbmNhdChub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICBpZiAobmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG5ld0NvbmRpdGlvbmFsQnJhbmNoZXM7IGkgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBub2RlcyA9IGRlbGV0ZU5vZGVTdWJ0cmVlKG5vZGVzLCBub2RlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdERlbGV0ZU5vZGUoKTogdm9pZCB7XG4gICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pj50aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudClcbiAgICAgICAgLnBpcGUobWFwKChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KSA9PiB7XG4gICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxufVxuIl19