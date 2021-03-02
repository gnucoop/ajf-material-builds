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
        this._formObs = this._form;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBT1osV0FBVyxFQUlYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXFDMUYsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFxQixFQUFFLElBQWE7SUFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMs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QUFDO1lBQy9CLE9BQU8sQ0FBQyxLQUFnQixFQUFhLEVBQUU7Z0JBQ3JDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLElBQUksRUFBRSxHQUFHLGdCQUFnQixDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDZCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztvQkFDeEMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELEVBQUUsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO29CQUNwQixJQUFJLFlBQVksRUFBRTt3QkFDaEIsS0FBSyxHQUFHLFFBQVEsQ0FBQztxQkFDbEI7eUJBQU07d0JBQ0wsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3hCO29CQUNELEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3hDO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7YUFDRixTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQTdtQkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sXG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZkZvcm0sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLFxuICBBamZOb2RlLFxuICBBamZOb2RlR3JvdXAsXG4gIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgQWpmUmVwZWF0aW5nU2xpZGUsXG4gIEFqZlNsaWRlLFxuICBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUNvbnRhaW5lck5vZGUsXG4gIGNyZWF0ZUZpZWxkLFxuICBjcmVhdGVGb3JtLFxuICBjcmVhdGVWYWxpZGF0aW9uLFxuICBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsXG4gIGNyZWF0ZVdhcm5pbmdHcm91cCxcbiAgaXNDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGlzQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzU2xpZGVzTm9kZSxcbiAgbWF4RGlnaXRzVmFsaWRhdGlvbixcbiAgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbixcbiAgbWluVmFsaWRhdGlvbixcbiAgbm90RW1wdHlWYWxpZGF0aW9uLFxuICBub3RFbXB0eVdhcm5pbmdcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHNjYW4sIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uXG59IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkge1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uOiB7Zm9udFNldDogc3RyaW5nLCBmb250SWNvbjogc3RyaW5nfTtcbiAgbm9kZVR5cGU6IHtcbiAgICBub2RlOiBBamZOb2RlVHlwZTtcbiAgICBmaWVsZD86IEFqZkZpZWxkVHlwZSxcbiAgfTtcbiAgaXNTbGlkZT86IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gIG5vZGU6IEFqZk5vZGU7XG4gIGNvbnRhaW5lcjogQWpmQ29udGFpbmVyTm9kZXxudWxsO1xuICBjaGlsZHJlbjogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbiAgY29udGVudDogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90IHtcbiAgcGFyZW50OiBBamZOb2RlO1xuICBwYXJlbnROb2RlOiBudW1iZXI7XG59XG5cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGV8QWpmUmVwZWF0aW5nU2xpZGV8QWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfXxudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xKSB7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgY29uc3QgY25zID0gYy5ub2Rlcy5maWx0ZXIobiA9PiBpc0NvbnRhaW5lck5vZGUobikpO1xuICBjb25zdCBsZW4gPSBjbnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgY24gPSBnZXROb2RlQ29udGFpbmVyKDxBamZDb250YWluZXJOb2RlPmNuc1tpXSwgbm9kZSk7XG4gICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBjbjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoXG4gICAgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBBamZOb2RlLCBpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzID0gZmFsc2UpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGNvbnN0IGVudHJpZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gbm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudC5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCBuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHtwYXJlbnQ6IG4sIHBhcmVudE5vZGU6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlOiBuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICBpZiAoIWlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzTnVtID0gZW50cmllcy5sZW5ndGg7XG4gICAgY29uc3QgY2JzID0gcGFyZW50LmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSBlbnRyaWVzTnVtOyBpIDwgY2JzOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7cGFyZW50OiBwYXJlbnQsIHBhcmVudE5vZGU6IGl9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlfG51bGwpW10ge1xuICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PSBudWxsIHx8IG4ucGFyZW50ID09PSAwKTtcbiAgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3ROb2Rlc1swXTtcbiAgICBpZiAoaXNTbGlkZXNOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgY29uc3QgdHJlZTogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBbXTtcbiAgICAgIHRyZWUucHVzaCg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiByb290Tm9kZSxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCByb290Tm9kZSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW251bGxdO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmb3JtIGRlZmluaXRpb24nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZVtdID0gW107XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2RlcykpO1xuICAgIH1cbiAgICBmbGF0Tm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoXG4gICAgZmxhdE5vZGVzOiBBamZOb2RlW10sIHBhcmVudE5vZGU6IEFqZk5vZGUsIGJyYW5jaDogbnVtYmVyfG51bGwgPSBudWxsKTogQWpmTm9kZVtdIHtcbiAgcmV0dXJuIGJyYW5jaCAhPSBudWxsID9cbiAgICAgIGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCAmJiBuLnBhcmVudE5vZGUgPT09IGJyYW5jaCkgOlxuICAgICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSAoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSk7XG4gICAgICBjb250YWluZXIubm9kZXMgPSByZW1vdmVOb2Rlcyhjb250YWluZXIubm9kZXMsIGlkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2Rlcy5maWx0ZXIobiA9PiBpZHMuaW5kZXhPZihuLmlkKSA9PT0gLTEpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlU3VidHJlZShcbiAgICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlcnxudWxsID0gbnVsbCk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlcyhub2Rlcyk7XG4gIGxldCBkZWxOb2RlczogQWpmTm9kZVtdID0gW107XG4gIGxldCBkZXNjZW5kYW50cyA9IGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgcGFyZW50Tm9kZSwgYnJhbmNoKTtcbiAgY29uc3QgbGVuID0gZGVzY2VuZGFudHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKG5vZGVzLCBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSZXBlYXRpbmcgc2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmVwZWF0aW5nc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc3RyaW5nJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ31cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1udW1iZXInfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWJvb2xlYW4nfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdNdWx0aXBsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbXVsdGlwbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZm9ybXVsYSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlaW5wdXQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUaW1lJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRpbWUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGltZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9XG4gICAgfVxuICBdO1xuICAvKipcbiAgICogQXZhaWxhYmxlIG5vZGUgdHlwZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBhdmFpbGFibGVOb2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9hdmFpbGFibGVOb2RlVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybXxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybXxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZm9ybU9iczogT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+ID0gdGhpcy5fZm9ybSBhcyBPYnNlcnZhYmxlPEFqZkZvcm18bnVsbD47XG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+O1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+O1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnM6IE9ic2VydmFibGU8QWpmU2xpZGVbXT47XG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+O1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4gPVxuICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5IGFzIE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD47XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVFbnRyeU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNvbmRpdGlvbnxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24gYXMgT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD47XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb258bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luIGFzIE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+O1xuICBnZXQgZWRpdGVkQ2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlIGFzIE9ic2VydmFibGU8dm9pZD47XG4gIGdldCBiZWZvcmVOb2Rlc1VwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7XG4gIH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZSBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuICBnZXQgYWZ0ZXJOb2RlVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlck5vZGVVcGRhdGVPYnM7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1VwZGF0ZXM6IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzOiBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9zYXZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHByaXZhdGUgX2RlbGV0ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTYXZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXREZWxldGVOb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBlZGl0ZWQgZm9ybVxuICAgKlxuICAgKiBAcGFyYW0gZm9ybVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm18bnVsbCk6IHZvaWQge1xuICAgIGlmIChmb3JtICE9PSB0aGlzLl9mb3JtLmdldFZhbHVlKCkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dChmb3JtKTtcbiAgICB9XG4gIH1cblxuICBlZGl0Tm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbihjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KGNvbmRpdGlvbik7XG4gIH1cblxuICBzYXZlQ3VycmVudENvbmRpdGlvbihjb25kaXRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjID0gdGhpcy5fZWRpdGVkQ29uZGl0aW9uLmdldFZhbHVlKCk7XG4gICAgaWYgKGMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChudWxsKTtcbiAgfVxuXG4gIGNhbmNlbENvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgaW5zZXJ0Tm9kZShcbiAgICAgIG5vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksIHBhcmVudDogQWpmTm9kZSwgcGFyZW50Tm9kZTogbnVtYmVyLFxuICAgICAgaW5Db250ZW50ID0gZmFsc2UpOiB2b2lkIHtcbiAgICBsZXQgbm9kZTogQWpmTm9kZXxBamZGaWVsZDtcbiAgICBjb25zdCBpZCA9ICsrbm9kZVVuaXF1ZUlkO1xuICAgIGNvbnN0IGlzRmllbGROb2RlID0gbm9kZVR5cGUubm9kZVR5cGUuZmllbGQgIT0gbnVsbDtcbiAgICBpZiAoaXNGaWVsZE5vZGUpIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsXG4gICAgICAgIGZpZWxkVHlwZTogbm9kZVR5cGUubm9kZVR5cGUuZmllbGQhLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudC5pZCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGNyZWF0ZUNvbnRhaW5lck5vZGUoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLm5vZGUsXG4gICAgICAgIHBhcmVudDogcGFyZW50ICE9IG51bGwgPyBwYXJlbnQuaWQgOiAwLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICBpZiAobm9kZS5wYXJlbnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNuID0gaXNDb250YWluZXJOb2RlKHBhcmVudCkgJiYgaW5Db250ZW50ID8gKDxBamZDb250YWluZXJOb2RlPnBhcmVudCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIHBhcmVudCk7XG4gICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICBpZiAoIWlzRmllbGROb2RlKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgIGNvbnN0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNuLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVOb2RlRW50cnkocHJvcGVydGllczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50LmVtaXQocHJvcGVydGllcyk7XG4gIH1cblxuICBjYW5jZWxOb2RlRW50cnlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuICB9XG5cbiAgZGVsZXRlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudC5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBnZXRDdXJyZW50Rm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICAgICAgICAgdGhpcy5mb3JtLCB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zLCB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgICAgICB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLnN0cmluZ0lkZW50aWZpZXJcbiAgICAgICAgICAgXSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKFtmb3JtXSkgPT4gZm9ybSAhPSBudWxsKSxcbiAgICAgICAgICAgIG1hcCgoW2Zvcm0sIG5vZGVzLCBhdHRhY2htZW50c09yaWdpbnMsIGNob2ljZXNPcmlnaW5zLCBzdHJpbmdJZGVudGlmaWVyXSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlRm9ybSh7XG4gICAgICAgICAgICAgICAgY2hvaWNlc09yaWdpbnM6IChjaG9pY2VzT3JpZ2lucyBhcyBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSkuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zOiAoYXR0YWNobWVudHNPcmlnaW5zIGFzIEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSkuc2xpY2UoMCksXG4gICAgICAgICAgICAgICAgc3RyaW5nSWRlbnRpZmllcjogKChzdHJpbmdJZGVudGlmaWVyIHx8IFtdKSBhcyBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKS5zbGljZSgwKSxcbiAgICAgICAgICAgICAgICBub2RlczogKG5vZGVzIGFzIEFqZlNsaWRlW10pLnNsaWNlKDApLFxuICAgICAgICAgICAgICAgIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM6IChmb3JtIGFzIEFqZkZvcm0pLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgY3JlYXRlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luPGFueT4oe25hbWU6ICcnfSkpO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZUNob2ljZXNPcmlnaW4ocGFyYW1zOiB7bGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjaG9pY2VzOiBhbnlbXX0pOiB2b2lkIHtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2luID0gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgIGNob2ljZXNPcmlnaW4ubGFiZWwgPSBwYXJhbXMubGFiZWw7XG4gICAgICBjaG9pY2VzT3JpZ2luLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICAgIGlmIChpc0Nob2ljZXNGaXhlZE9yaWdpbihjaG9pY2VzT3JpZ2luKSkge1xuICAgICAgICBjaG9pY2VzT3JpZ2luLmNob2ljZXMgPSBwYXJhbXMuY2hvaWNlcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KChjaG9pY2VzT3JpZ2lucykgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBjaG9pY2VzT3JpZ2lucy5pbmRleE9mKGNob2ljZXNPcmlnaW4pO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFtcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKDAsIGlkeCksXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2luLFxuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoaWR4ICsgMSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFsuLi5jaG9pY2VzT3JpZ2lucywgY2hvaWNlc09yaWdpbl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXNPcmlnaW5zO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKGlkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KCgpID0+IFsuLi5pZGVudGlmaWVyXSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5kTWF4Tm9kZUlkKG5vZGVzOiBBamZOb2RlW10sIF9jdXJNYXhJZCA9IDApOiBudW1iZXIge1xuICAgIGxldCBtYXhJZCA9IDA7XG4gICAgbm9kZXMuZm9yRWFjaCgobikgPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgbi5pZCk7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKG4pKSB7XG4gICAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHRoaXMuX2ZpbmRNYXhOb2RlSWQoKDxBamZDb250YWluZXJOb2RlPm4pLm5vZGVzKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1heElkO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm0uc3Vic2NyaWJlKChmb3JtOiBBamZGb3JtfG51bGwpID0+IHtcbiAgICAgIG5vZGVVbmlxdWVJZCA9IDA7XG4gICAgICBpZiAoZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCAmJiBmb3JtLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZVVuaXF1ZUlkID0gdGhpcy5fZmluZE1heE5vZGVJZChmb3JtLm5vZGVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChfbm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsID8gZm9ybS5ub2Rlcy5zbGljZSgwKSA6IFtdO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgKF9hdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSk6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zICE9IG51bGwgP1xuICAgICAgICAgICAgICAgIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgICB9KTtcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAgIChfY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmNob2ljZXNPcmlnaW5zICE9IG51bGwgPyBmb3JtLmNob2ljZXNPcmlnaW5zLnNsaWNlKDApIDogW107XG4gICAgICAgICAgfSk7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KFxuICAgICAgICAgIChfOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uc3RyaW5nSWRlbnRpZmllciAhPSBudWxsID8gZm9ybS5zdHJpbmdJZGVudGlmaWVyLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+PnRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oKGNob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb3AoY2hvaWNlc09yaWdpbnMpO1xuICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnMgPSB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLnBpcGUoXG4gICAgICAgIHNjYW4oXG4gICAgICAgICAgICAoYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICAgICAgICAgICAgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb3AoYXR0YWNobWVudHNPcmlnaW5zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyID0gdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMucGlwZShcbiAgICAgICAgc2NhbihcbiAgICAgICAgICAgIChzdHJpbmdJZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdLCBvcDogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9wKHN0cmluZ0lkZW50aWZpZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtdKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9ICg8T2JzZXJ2YWJsZTxBamZOb2Rlc09wZXJhdGlvbj4+dGhpcy5fbm9kZXNVcGRhdGVzKVxuICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHNjYW4oKG5vZGVzOiBBamZOb2RlW10sIG9wOiBBamZOb2Rlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fbm9kZXNXaXRob3V0Q2hvaWNlT3JpZ2lucyA9XG4gICAgICAgICh0aGlzLl9ub2RlcyBhcyBPYnNlcnZhYmxlPEFqZlNsaWRlW10+KS5waXBlKG1hcChzbGlkZXMgPT4gc2xpZGVzLm1hcChzbGlkZSA9PiB7XG4gICAgICAgICAgc2xpZGUubm9kZXMgPSAoc2xpZGUubm9kZXMgYXMgQWpmRmllbGRbXSkubWFwKChub2RlOiBBamZGaWVsZCkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlKSkge1xuICAgICAgICAgICAgICBjb25zdCBmd2MgPSBkZWVwQ29weShub2RlKTtcbiAgICAgICAgICAgICAgaWYgKGZ3YyAmJiBmd2MuY2hvaWNlcykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmd2MuY2hvaWNlcztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoZndjICYmIGZ3Yy5jaG9pY2VzT3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZ3Yy5jaG9pY2VzT3JpZ2luO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBmd2M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgIH0pKSk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IGZsYXR0ZW5Ob2Rlcyhub2RlcykpLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiA8QWpmRmllbGRbXT5ub2Rlcy5maWx0ZXIobiA9PiAhaXNDb250YWluZXJOb2RlKG4pKSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgICAgbWFwKG5vZGVzID0+IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPmJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXMpKSwgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgICAgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5lXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG5lIGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9IHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kaXRpb246IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSkgOlxuICAgICAgICAgICAgICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUuZm9ybXVsYVJlcHMgPSBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5taW5SZXBzID0gcHJvcGVydGllcy5taW5SZXBzO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5mb3JtdWxhID0gcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmb3JjZVZhbHVlICE9IG51bGwgfHwgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8IG1heFZhbHVlICE9IG51bGwgfHwgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9IG1heFZhbHVlICE9IG51bGwgPyBtYXhWYWxpZGF0aW9uKG1heFZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCA/IG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluRGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCA/IG1heERpZ2l0c1ZhbGlkYXRpb24obWF4RGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKGM6IHtjb25kaXRpb246IHN0cmluZywgZXJyb3JNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogYy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh3OiB7Y29uZGl0aW9uOiBzdHJpbmcsIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC5uZXh0U2xpZGVDb25kaXRpb24gPSBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZmllbGQuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmd2MgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PmZpZWxkO1xuICAgICAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZU5hcnJvdyA9IHByb3BlcnRpZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHQ6IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaWR4ID0gbm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpXG4gICAgICAgIC5waXBlKG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgbGV0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcih7bm9kZXN9LCBub2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihub2RlKTtcbiAgICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5vZGVzID0gZGVsZXRlTm9kZVN1YnRyZWUobm9kZXMsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cbn1cbiJdfQ==