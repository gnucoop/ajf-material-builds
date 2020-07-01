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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBT1osV0FBVyxFQUlYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXFDMUYsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFxQixFQUFFLElBQWE7SUFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMs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LENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztvQkFDcEIsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLEtBQUssR0FBRyxRQUFRLENBQUM7cUJBQ2xCO3lCQUFNO3dCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4QjtvQkFDRCxLQUFLLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO2FBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7WUF6bEJGLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luLFxuICBBamZDaG9pY2VzT3JpZ2luLFxuICBBamZGaWVsZCxcbiAgQWpmRmllbGRUeXBlLFxuICBBamZGaWVsZFdpdGhDaG9pY2VzLFxuICBBamZGb3JtLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllcixcbiAgQWpmTm9kZSxcbiAgQWpmTm9kZUdyb3VwLFxuICBBamZOb2Rlc09wZXJhdGlvbixcbiAgQWpmTm9kZVR5cGUsXG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIEFqZlJlcGVhdGluZ1NsaWRlLFxuICBBamZTbGlkZSxcbiAgY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBjcmVhdGVDb250YWluZXJOb2RlLFxuICBjcmVhdGVGaWVsZCxcbiAgY3JlYXRlRm9ybSxcbiAgY3JlYXRlVmFsaWRhdGlvbixcbiAgY3JlYXRlVmFsaWRhdGlvbkdyb3VwLFxuICBjcmVhdGVXYXJuaW5nLFxuICBjcmVhdGVXYXJuaW5nR3JvdXAsXG4gIGlzQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBpc0NvbnRhaW5lck5vZGUsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlLFxuICBpc1NsaWRlc05vZGUsXG4gIG1heERpZ2l0c1ZhbGlkYXRpb24sXG4gIG1heFZhbGlkYXRpb24sXG4gIG1pbkRpZ2l0c1ZhbGlkYXRpb24sXG4gIG1pblZhbGlkYXRpb24sXG4gIG5vdEVtcHR5VmFsaWRhdGlvbixcbiAgbm90RW1wdHlXYXJuaW5nXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBjcmVhdGVDb25kaXRpb24sIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50LCBzY2FuLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvblxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbjoge2ZvbnRTZXQ6IHN0cmluZywgZm9udEljb246IHN0cmluZ307XG4gIG5vZGVUeXBlOiB7XG4gICAgbm9kZTogQWpmTm9kZVR5cGU7XG4gICAgZmllbGQ/OiBBamZGaWVsZFR5cGUsXG4gIH07XG4gIGlzU2xpZGU/OiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICBub2RlOiBBamZOb2RlO1xuICBjb250YWluZXI6IEFqZkNvbnRhaW5lck5vZGV8bnVsbDtcbiAgY2hpbGRyZW46IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG4gIGNvbnRlbnQ6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCB7XG4gIHBhcmVudDogQWpmTm9kZTtcbiAgcGFyZW50Tm9kZTogbnVtYmVyO1xufVxuXG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1CdWlsZGVyTm9kZSA9IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90O1xuZXhwb3J0IHR5cGUgQWpmQ29udGFpbmVyTm9kZSA9IEFqZlNsaWRlfEFqZlJlcGVhdGluZ1NsaWRlfEFqZk5vZGVHcm91cDtcblxuZnVuY3Rpb24gZ2V0Tm9kZUNvbnRhaW5lcihjOiB7bm9kZXM6IEFqZk5vZGVbXX0sIG5vZGU6IEFqZk5vZGUpOiB7bm9kZXM6IEFqZk5vZGVbXX18bnVsbCB7XG4gIGlmIChjLm5vZGVzLmluZGV4T2Yobm9kZSkgPiAtMSkge1xuICAgIHJldHVybiBjO1xuICB9XG4gIGNvbnN0IGNucyA9IGMubm9kZXMuZmlsdGVyKG4gPT4gaXNDb250YWluZXJOb2RlKG4pKTtcbiAgY29uc3QgbGVuID0gY25zLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcig8QWpmQ29udGFpbmVyTm9kZT5jbnNbaV0sIG5vZGUpO1xuICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gY247XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKFxuICAgIG5vZGVzOiBBamZOb2RlW10sIHBhcmVudDogQWpmTm9kZSwgaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcyA9IGZhbHNlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBjb25zdCBlbnRyaWVzOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IG5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnQuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KChuMSwgbjIpID0+IG4xLnBhcmVudE5vZGUgLSBuMi5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh7cGFyZW50OiBuLCBwYXJlbnROb2RlOiAwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZTogbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2RlcywgbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgaWYgKCFpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgY29uc3QgZW50cmllc051bSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNicyA9IHBhcmVudC5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gZW50cmllc051bTsgaSA8IGNiczsgaSsrKSB7XG4gICAgICBlbnRyaWVzLnB1c2goe3BhcmVudDogcGFyZW50LCBwYXJlbnROb2RlOiBpfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnRyaWVzO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KF9ub2RlczogQWpmTm9kZVtdLCBub2RlOiBBamZOb2RlKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgcmV0dXJuIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzLCBub2RlLCB0cnVlKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzVHJlZShub2RlczogQWpmTm9kZVtdKTogKEFqZkZvcm1CdWlsZGVyTm9kZXxudWxsKVtdIHtcbiAgY29uc3Qgcm9vdE5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT0gbnVsbCB8fCBuLnBhcmVudCA9PT0gMCk7XG4gIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3Qgcm9vdE5vZGUgPSByb290Tm9kZXNbMF07XG4gICAgaWYgKGlzU2xpZGVzTm9kZShyb290Tm9kZSkpIHtcbiAgICAgIGNvbnN0IHRyZWU6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gW107XG4gICAgICB0cmVlLnB1c2goPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogcm9vdE5vZGUsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2Rlcywgcm9vdE5vZGUpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtudWxsXTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybSBkZWZpbml0aW9uJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBmbGF0Tm9kZXMgPSBmbGF0Tm9kZXMuY29uY2F0KGZsYXR0ZW5Ob2RlcygoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMpKTtcbiAgICB9XG4gICAgZmxhdE5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG5cbmZ1bmN0aW9uIGdldERlc2NlbmRhbnRzKFxuICAgIGZsYXROb2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlcnxudWxsID0gbnVsbCk6IEFqZk5vZGVbXSB7XG4gIHJldHVybiBicmFuY2ggIT0gbnVsbCA/XG4gICAgICBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQgJiYgbi5wYXJlbnROb2RlID09PSBicmFuY2gpIDpcbiAgICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGVzKG5vZGVzOiBBamZOb2RlW10sIGlkczogbnVtYmVyW10pOiBBamZOb2RlW10ge1xuICBjb25zdCBsZW4gPSBub2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gKDxBamZDb250YWluZXJOb2RlPm5vZGUpO1xuICAgICAgY29udGFpbmVyLm5vZGVzID0gcmVtb3ZlTm9kZXMoY29udGFpbmVyLm5vZGVzLCBpZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZXMuZmlsdGVyKG4gPT4gaWRzLmluZGV4T2Yobi5pZCkgPT09IC0xKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZVN1YnRyZWUoXG4gICAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50Tm9kZTogQWpmTm9kZSwgYnJhbmNoOiBudW1iZXJ8bnVsbCA9IG51bGwpOiBBamZOb2RlW10ge1xuICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXMobm9kZXMpO1xuICBsZXQgZGVsTm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBsZXQgZGVzY2VuZGFudHMgPSBnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIHBhcmVudE5vZGUsIGJyYW5jaCk7XG4gIGNvbnN0IGxlbiA9IGRlc2NlbmRhbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgZGVzY2VuZGFudHNbaV0pKTtcbiAgfVxuICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChkZXNjZW5kYW50cyk7XG4gIHJldHVybiByZW1vdmVOb2Rlcyhub2RlcywgZGVsTm9kZXMubWFwKG4gPT4gbi5pZCkpO1xufVxuXG5sZXQgbm9kZVVuaXF1ZUlkID0gMDtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYXZhaWxhYmxlTm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ1NsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXNsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlNsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmVwZWF0aW5nIHNsaWRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXJlcGVhdGluZ3NsaWRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU3RyaW5nJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXN0cmluZyd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TdHJpbmd9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RleHQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGV4dCd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UZXh0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdOdW1iZXInLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbnVtYmVyJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk51bWJlcn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnQm9vbGVhbicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1ib29sZWFuJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkJvb2xlYW59XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1NpbmdsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2luZ2xlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW11bHRpcGxlY2hvaWNlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdGb3JtdWxhJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWZvcm11bGEnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRm9ybXVsYX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUgaW5wdXQnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZWlucHV0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGVJbnB1dH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGltZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10aW1lJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRpbWV9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RhYmxlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRhYmxlJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRhYmxlfVxuICAgIH1cbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm18bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm18bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2Zvcm1PYnM6IE9ic2VydmFibGU8QWpmRm9ybXxudWxsPiA9IHRoaXMuX2Zvcm0uYXNPYnNlcnZhYmxlKCk7XG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+O1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+O1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+O1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4gPVxuICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5LmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkTm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWROb2RlRW50cnlPYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb246IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb258bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb258bnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD4gPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkQ2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgYmVmb3JlTm9kZXNVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlT2JzO1xuICB9XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hZnRlck5vZGVVcGRhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBhZnRlck5vZGVVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyTm9kZVVwZGF0ZU9icztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclVwZGF0ZXM6IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NhdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHJpdmF0ZSBfZGVsZXRlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEF0dGFjaG1lbnRzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFNhdmVOb2RlKCk7XG4gICAgdGhpcy5faW5pdERlbGV0ZU5vZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IGVkaXRlZCBmb3JtXG4gICAqXG4gICAqIEBwYXJhbSBmb3JtXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEZvcm0oZm9ybTogQWpmRm9ybXxudWxsKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gIT09IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVkaXROb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQoY29uZGl0aW9uKTtcbiAgfVxuXG4gIHNhdmVDdXJyZW50Q29uZGl0aW9uKGNvbmRpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGMgPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uZ2V0VmFsdWUoKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgY2FuY2VsQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgICAgbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSwgcGFyZW50OiBBamZOb2RlLCBwYXJlbnROb2RlOiBudW1iZXIsXG4gICAgICBpbkNvbnRlbnQgPSBmYWxzZSk6IHZvaWQge1xuICAgIGxldCBub2RlOiBBamZOb2RlfEFqZkZpZWxkO1xuICAgIGNvbnN0IGlkID0gKytub2RlVW5pcXVlSWQ7XG4gICAgY29uc3QgaXNGaWVsZE5vZGUgPSBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCAhPSBudWxsO1xuICAgIGlmIChpc0ZpZWxkTm9kZSkge1xuICAgICAgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZCxcbiAgICAgICAgZmllbGRUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCEsXG4gICAgICAgIHBhcmVudDogcGFyZW50LmlkLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gY3JlYXRlQ29udGFpbmVyTm9kZSh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogbm9kZVR5cGUubm9kZVR5cGUubm9kZSxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQgIT0gbnVsbCA/IHBhcmVudC5pZCA6IDAsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBub2RlczogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW25vZGVdO1xuICAgICAgfVxuICAgICAgY29uc3QgY24gPSBpc0NvbnRhaW5lck5vZGUocGFyZW50KSAmJiBpbkNvbnRlbnQgPyAoPEFqZkNvbnRhaW5lck5vZGU+cGFyZW50KSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgcGFyZW50KTtcbiAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgIGlmICghaXNGaWVsZE5vZGUpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY24ubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZU5vZGVFbnRyeShwcm9wZXJ0aWVzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnQuZW1pdChwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbmNlbE5vZGVFbnRyeUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gIH1cblxuICBkZWxldGVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRGb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgICAgICAgICB0aGlzLmZvcm0sIHRoaXMubm9kZXMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLCB0aGlzLmNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgICAgIHRoaXMuc3RyaW5nSWRlbnRpZmllclxuICAgICAgICAgICBdKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoW2Zvcm1dKSA9PiBmb3JtICE9IG51bGwpLFxuICAgICAgICAgICAgbWFwKChbZm9ybSwgbm9kZXMsIGF0dGFjaG1lbnRzT3JpZ2lucywgY2hvaWNlc09yaWdpbnMsIHN0cmluZ0lkZW50aWZpZXJdKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICAgICAgICBjaG9pY2VzT3JpZ2luczogKGNob2ljZXNPcmlnaW5zIGFzIEFqZkNob2ljZXNPcmlnaW48YW55PltdKS5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IChhdHRhY2htZW50c09yaWdpbnMgYXMgQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKS5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiAoKHN0cmluZ0lkZW50aWZpZXIgfHwgW10pIGFzIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pLnNsaWNlKDApLFxuICAgICAgICAgICAgICAgIG5vZGVzOiAobm9kZXMgYXMgQWpmU2xpZGVbXSkuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogKGZvcm0gYXMgQWpmRm9ybSkuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoKGNob2ljZXNPcmlnaW5zKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGNob2ljZXNPcmlnaW5zLmluZGV4T2YoY2hvaWNlc09yaWdpbik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gW1xuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW4sXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gWy4uLmNob2ljZXNPcmlnaW5zLCBjaG9pY2VzT3JpZ2luXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlc09yaWdpbnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoKCkgPT4gWy4uLmlkZW50aWZpZXJdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCBuLmlkKTtcbiAgICAgIGlmIChpc0NvbnRhaW5lck5vZGUobikpIHtcbiAgICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdGhpcy5fZmluZE1heE5vZGVJZCgoPEFqZkNvbnRhaW5lck5vZGU+bikubm9kZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SWQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybS5zdWJzY3JpYmUoKGZvcm06IEFqZkZvcm18bnVsbCkgPT4ge1xuICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAoX2F0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5hdHRhY2htZW50c09yaWdpbnMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgZm9ybS5hdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgIH0pO1xuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgICB9KTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF86IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGwgPyBmb3JtLnN0cmluZ0lkZW50aWZpZXIuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4+dGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjaG9pY2VzT3JpZ2lucyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgICAgc2NhbihcbiAgICAgICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICAgICAgICBvcDogQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtdKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgICBzY2FuKFxuICAgICAgICAgICAgKHN0cmluZ0lkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sIG9wOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3Aoc3RyaW5nSWRlbnRpZmllcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW10pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2Nhbigobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IGZsYXR0ZW5Ob2Rlcyhub2RlcykpLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiA8QWpmRmllbGRbXT5ub2Rlcy5maWx0ZXIobiA9PiAhaXNDb250YWluZXJOb2RlKG4pKSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgICAgbWFwKG5vZGVzID0+IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPmJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXMpKSwgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5lXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG5lIGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9IHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kaXRpb246IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSkgOlxuICAgICAgICAgICAgICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUuZm9ybXVsYVJlcHMgPSBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5taW5SZXBzID0gcHJvcGVydGllcy5taW5SZXBzO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5mb3JtdWxhID0gcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmb3JjZVZhbHVlICE9IG51bGwgfHwgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8IG1heFZhbHVlICE9IG51bGwgfHwgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9IG1heFZhbHVlICE9IG51bGwgPyBtYXhWYWxpZGF0aW9uKG1heFZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCA/IG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluRGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCA/IG1heERpZ2l0c1ZhbGlkYXRpb24obWF4RGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKGM6IHtjb25kaXRpb246IHN0cmluZywgZXJyb3JNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogYy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh3OiB7Y29uZGl0aW9uOiBzdHJpbmcsIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC5uZXh0U2xpZGVDb25kaXRpb24gPSBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZmllbGQuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmd2MgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PmZpZWxkO1xuICAgICAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZU5hcnJvdyA9IHByb3BlcnRpZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHQ6IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaWR4ID0gbm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpXG4gICAgICAgIC5waXBlKG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5vZGVzID0gZGVsZXRlTm9kZVN1YnRyZWUobm9kZXMsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cbn1cbiJdfQ==