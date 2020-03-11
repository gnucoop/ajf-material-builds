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
import { __read, __spread } from "tslib";
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createField, createForm, createContainerNode, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isField, isFieldWithChoices, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, publishReplay, refCount, scan, withLatestFrom } from 'rxjs/operators';
function getNodeContainer(c, node) {
    if (c.nodes.indexOf(node) > -1) {
        return c;
    }
    var cns = c.nodes.filter(function (n) { return isContainerNode(n); });
    var len = cns.length;
    for (var i = 0; i < len; i++) {
        var cn = getNodeContainer(cns[i], node);
        if (cn != null) {
            return cn;
        }
    }
    return null;
}
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches) {
    if (ignoreConditionalBranches === void 0) { ignoreConditionalBranches = false; }
    var entries = nodes
        .filter(function (n) { return n.parent === parent.id; })
        .sort(function (n1, n2) { return n1.parentNode - n2.parentNode; })
        .map(function (n) {
        var children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return {
            node: n,
            children: children,
            content: buildFormBuilderNodesContent(nodes, n)
        };
    });
    if (!ignoreConditionalBranches) {
        var entriesNum = entries.length;
        var cbs = parent.conditionalBranches.length;
        for (var i = entriesNum; i < cbs; i++) {
            entries.push({
                parent: parent,
                parentNode: i
            });
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
    var rootNodes = nodes.filter(function (n) { return n.parent == null || n.parent === 0; });
    if (rootNodes.length === 1) {
        var rootNode = rootNodes[0];
        if (isSlidesNode(rootNode)) {
            var tree = [];
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
    var flatNodes = [];
    nodes.forEach(function (node) {
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
        flatNodes.push(node);
    });
    return flatNodes;
}
function getDescendants(flatNodes, parentNode, branch) {
    if (branch === void 0) { branch = null; }
    return branch != null ?
        flatNodes.filter(function (n) { return n.parent === parentNode.id && n.parentNode === branch; }) :
        flatNodes.filter(function (n) { return n.parent === parentNode.id; });
}
function removeNodes(nodes, ids) {
    var len = nodes.length;
    for (var i = 0; i < len; i++) {
        var node = nodes[i];
        if (isContainerNode(node)) {
            var container = node;
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter(function (n) { return ids.indexOf(n.id) === -1; });
}
function deleteNodeSubtree(nodes, parentNode, branch) {
    if (branch === void 0) { branch = null; }
    var flatNodes = flattenNodes(nodes);
    var delNodes = [];
    var descendants = getDescendants(flatNodes, parentNode, branch);
    var len = descendants.length;
    for (var i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map(function (n) { return n.id; }));
}
var nodeUniqueId = 0;
var AjfFormBuilderService = /** @class */ (function () {
    function AjfFormBuilderService() {
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
    Object.defineProperty(AjfFormBuilderService.prototype, "availableNodeTypes", {
        /**
         * Available node types
         *
         * @readonly
         * @memberOf AjfFormBuilderService
         */
        get: function () { return this._availableNodeTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "form", {
        /**
         * Current edited form stream
         *
         * @readonly
         * @memberOf AjfFormBuilderService
         */
        get: function () { return this._formObs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "attachmentsOrigins", {
        get: function () {
            return this._attachmentsOrigins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "choicesOrigins", {
        get: function () {
            return this._choicesOrigins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "stringIdentifier", {
        get: function () {
            return this._stringIdentifier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "nodes", {
        get: function () { return this._nodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "flatNodes", {
        get: function () {
            return this._flatNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "flatFields", {
        get: function () { return this._flatFields; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "nodeEntriesTree", {
        get: function () { return this._nodeEntriesTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedNodeEntry", {
        get: function () {
            return this._editedNodeEntryObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedCondition", {
        get: function () { return this._editedConditionObs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "editedChoicesOrigin", {
        get: function () {
            return this._editedChoicesOriginObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "beforeNodesUpdate", {
        get: function () { return this._beforeNodesUpdateObs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilderService.prototype, "afterNodeUpdate", {
        get: function () { return this._afterNodeUpdateObs; },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the current edited form
     *
     * @param form
     *
     * @memberOf AjfFormBuilderService
     */
    AjfFormBuilderService.prototype.setForm = function (form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    };
    AjfFormBuilderService.prototype.editNodeEntry = function (nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    };
    AjfFormBuilderService.prototype.editCondition = function (condition) {
        this._editedCondition.next(condition);
    };
    AjfFormBuilderService.prototype.saveCurrentCondition = function (condition) {
        var c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    };
    AjfFormBuilderService.prototype.cancelConditionEdit = function () {
        this._editedChoicesOrigin.next(null);
    };
    AjfFormBuilderService.prototype.insertNode = function (nodeType, parent, parentNode, inContent) {
        if (inContent === void 0) { inContent = false; }
        var node;
        var id = ++nodeUniqueId;
        var isFieldNode = nodeType.nodeType.field != null;
        if (isFieldNode) {
            node = createField({
                id: id,
                nodeType: AjfNodeType.AjfField,
                fieldType: nodeType.nodeType.field,
                parent: parent.id,
                parentNode: parentNode,
                name: '',
            });
        }
        else {
            node = createContainerNode({
                id: id,
                nodeType: nodeType.nodeType.node,
                parent: parent != null ? parent.id : 0,
                parentNode: parentNode,
                name: '',
                nodes: [],
            });
        }
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next(function (nodes) {
            if (node.parent === 0) {
                return [node];
            }
            var cn = isContainerNode(parent) && inContent ?
                parent :
                getNodeContainer({ nodes: nodes }, parent);
            if (cn != null) {
                if (!isFieldNode) {
                    var replaceNodes = cn.nodes === nodes;
                    var newNodes = cn.nodes.slice(0);
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
    };
    AjfFormBuilderService.prototype.saveNodeEntry = function (properties) {
        this._saveNodeEntryEvent.emit(properties);
    };
    AjfFormBuilderService.prototype.cancelNodeEntryEdit = function () {
        this._editedNodeEntry.next(null);
    };
    AjfFormBuilderService.prototype.deleteNodeEntry = function (nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
    };
    AjfFormBuilderService.prototype.getCurrentForm = function () {
        return combineLatest([this.form, this.nodes, this.attachmentsOrigins, this.choicesOrigins, this.stringIdentifier]).pipe(filter(function (_a) {
            var _b = __read(_a, 1), form = _b[0];
            return form != null;
        }), map(function (_a) {
            var _b = __read(_a, 5), form = _b[0], nodes = _b[1], attachmentsOrigins = _b[2], choicesOrigins = _b[3], stringIdentifier = _b[4];
            return createForm({
                choicesOrigins: choicesOrigins.slice(0),
                attachmentsOrigins: attachmentsOrigins.slice(0),
                stringIdentifier: (stringIdentifier || []).slice(0),
                nodes: nodes.slice(0),
                supplementaryInformations: form.supplementaryInformations,
            });
        }));
    };
    AjfFormBuilderService.prototype.editChoicesOrigin = function (choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    };
    AjfFormBuilderService.prototype.createChoicesOrigin = function () {
        this._editedChoicesOrigin.next(createChoicesFixedOrigin({ name: '' }));
    };
    AjfFormBuilderService.prototype.cancelChoicesOriginEdit = function () {
        this._editedChoicesOrigin.next(null);
    };
    AjfFormBuilderService.prototype.saveChoicesOrigin = function (params) {
        var choicesOrigin = this._editedChoicesOrigin.getValue();
        if (choicesOrigin != null) {
            choicesOrigin.label = params.label;
            choicesOrigin.name = params.name;
            if (isChoicesFixedOrigin(choicesOrigin)) {
                choicesOrigin.choices = params.choices;
            }
            this._choicesOriginsUpdates.next(function (choicesOrigins) {
                var idx = choicesOrigins.indexOf(choicesOrigin);
                if (idx > -1) {
                    choicesOrigins = __spread(choicesOrigins.slice(0, idx), [
                        choicesOrigin
                    ], choicesOrigins.slice(idx + 1));
                }
                else {
                    choicesOrigins = __spread(choicesOrigins, [choicesOrigin]);
                }
                return choicesOrigins;
            });
        }
        this._editedChoicesOrigin.next(null);
    };
    AjfFormBuilderService.prototype.saveStringIdentifier = function (identifier) {
        this._stringIdentifierUpdates.next(function () { return __spread(identifier); });
    };
    AjfFormBuilderService.prototype._findMaxNodeId = function (nodes, _curMaxId) {
        var _this = this;
        if (_curMaxId === void 0) { _curMaxId = 0; }
        var maxId = 0;
        nodes.forEach(function (n) {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, _this._findMaxNodeId(n.nodes));
            }
        });
        return maxId;
    };
    AjfFormBuilderService.prototype._initFormStreams = function () {
        var _this = this;
        this._form
            .subscribe(function (form) {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = _this._findMaxNodeId(form.nodes);
            }
            _this._nodesUpdates.next(function (_nodes) {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            });
            _this._attachmentsOriginsUpdates.next(function (_attachmentsOrigins) {
                return form != null && form.attachmentsOrigins != null ?
                    form.attachmentsOrigins.slice(0) :
                    [];
            });
            _this._choicesOriginsUpdates.next(function (_choicesOrigins) {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) :
                    [];
            });
            _this._stringIdentifierUpdates.next(function (_) {
                return form != null && form.stringIdentifier != null
                    ? form.stringIdentifier.slice(0)
                    : [];
            });
        });
    };
    AjfFormBuilderService.prototype._initChoicesOriginsStreams = function () {
        this._choicesOrigins =
            this._choicesOriginsUpdates
                .pipe(scan(function (choicesOrigins, op) {
                return op(choicesOrigins);
            }, []), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initAttachmentsOriginsStreams = function () {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan(function (attachmentsOrigins, op) {
            return op(attachmentsOrigins);
        }, []), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initStringIdentifierStreams = function () {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan(function (stringIdentifier, op) {
            return op(stringIdentifier);
        }, []), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initNodesStreams = function () {
        this._nodes = this._nodesUpdates
            .pipe(scan(function (nodes, op) {
            return op(nodes);
        }, []), publishReplay(1), refCount());
        this._flatNodes = this._nodes.pipe(map(function (nodes) { return flattenNodes(nodes); }), publishReplay(1), refCount());
        this._flatFields = this._flatNodes.pipe(map(function (nodes) { return nodes.filter(function (n) { return !isContainerNode(n); }); }), publishReplay(1), refCount());
        this._nodeEntriesTree = this._nodes.pipe(map(function (nodes) { return buildFormBuilderNodesTree(nodes); }), publishReplay(1), refCount());
    };
    AjfFormBuilderService.prototype._initSaveNode = function () {
        var _this = this;
        this._saveNodeEntryEvent
            .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], nodeEntry = _b[1];
            return nodeEntry != null;
        }), map(function (_a) {
            var _b = __read(_a, 2), properties = _b[0], nodeEntry = _b[1];
            _this._beforeNodesUpdate.emit();
            nodeEntry = nodeEntry;
            var origNode = nodeEntry.node;
            var node = deepCopy(origNode);
            node.id = nodeEntry.node.id;
            node.name = properties.name;
            node.label = properties.label;
            node.visibility = properties.visibility != null ?
                createCondition({ condition: properties.visibility }) :
                null;
            var oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches = properties.conditionalBranches != null ?
                properties.conditionalBranches.map(function (condition) { return createCondition({ condition: condition }); }) :
                [alwaysCondition()];
            var newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                var repNode = node;
                repNode.formulaReps = properties.formulaReps != null ?
                    createFormula({ formula: properties.formulaReps }) :
                    undefined;
                repNode.minReps = properties.minReps;
                repNode.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                var field = node;
                field.description = properties.description;
                field.defaultValue = properties.defaultValue;
                field.formula = properties.formula != null ?
                    createFormula({ formula: properties.formula }) :
                    undefined;
                var forceValue = properties.value;
                var notEmpty = properties.notEmpty;
                var validationConditions = properties.validationConditions;
                var minValue = parseInt(properties.minValue, 10);
                var maxValue = parseInt(properties.maxValue, 10);
                var minDigits = parseInt(properties.minDigits, 10);
                var maxDigits = parseInt(properties.maxDigits, 10);
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
                    var validation = field.validation || createValidationGroup({});
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
                            []).map(function (c) { return createValidation({
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        }); });
                    field.validation = validation;
                }
                else {
                    field.validation = undefined;
                }
                var notEmptyWarn = properties.notEmptyWarning;
                var warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    var warning = field.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions =
                        (warningConditions ||
                            []).map(function (w) { return createWarning({
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        }); });
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
                    var fwc = field;
                    fwc.choicesOriginRef = properties.choicesOriginRef;
                    fwc.forceExpanded = properties.forceExpanded;
                    fwc.forceNarrow = properties.forceNarrow;
                    fwc.triggerConditions = (properties.triggerConditions ||
                        []).map(function (t) { return createCondition({ condition: t }); });
                }
            }
            _this._editedNodeEntry.next(null);
            return function (nodes) {
                var cn = getNodeContainer({ nodes: nodes }, origNode);
                if (cn != null) {
                    // TODO: @trik check this, was always true?
                    // if (cn instanceof AjfNode) {
                    var replaceNodes = cn.nodes === nodes;
                    var idx = cn.nodes.indexOf(origNode);
                    var newNodes = cn.nodes.slice(0, idx);
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
                        for (var i = newConditionalBranches; i < oldConditionalBranches; i++) {
                            nodes = deleteNodeSubtree(nodes, node, i);
                        }
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    };
    AjfFormBuilderService.prototype._initDeleteNode = function () {
        var _this = this;
        this._deleteNodeEntryEvent.pipe(map(function (nodeEntry) {
            _this._beforeNodesUpdate.emit();
            return function (nodes) {
                var node = nodeEntry.node;
                var cn = getNodeContainer({ nodes: nodes }, node);
                if (cn != null) {
                    var replaceNodes = cn.nodes === nodes;
                    var idx = cn.nodes.indexOf(node);
                    var newNodes = cn.nodes.slice(0, idx);
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
        })).subscribe(this._nodesUpdates);
    };
    AjfFormBuilderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AjfFormBuilderService.ctorParameters = function () { return []; };
    return AjfFormBuilderService;
}());
export { AjfFormBuilderService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQzZDLFlBQVksRUFFOUQsV0FBVyxFQUEwRCx3QkFBd0IsRUFDN0YsV0FBVyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFDckYsYUFBYSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQ2pGLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQzlGLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQ3hFLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXFDMUYsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFxQixFQUFFLElBQWE7SUFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxD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KlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW4sIEFqZkNob2ljZXNPcmlnaW4sIEFqZkZpZWxkLCBBamZGaWVsZFR5cGUsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsIEFqZkZvcm0sIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyLCBBamZOb2RlLCBBamZOb2RlR3JvdXAsIEFqZk5vZGVzT3BlcmF0aW9uLFxuICBBamZOb2RlVHlwZSwgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSwgQWpmUmVwZWF0aW5nU2xpZGUsIEFqZlNsaWRlLCBjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW4sXG4gIGNyZWF0ZUZpZWxkLCBjcmVhdGVGb3JtLCBjcmVhdGVDb250YWluZXJOb2RlLCBjcmVhdGVWYWxpZGF0aW9uLCBjcmVhdGVWYWxpZGF0aW9uR3JvdXAsXG4gIGNyZWF0ZVdhcm5pbmcsIGNyZWF0ZVdhcm5pbmdHcm91cCwgaXNDaG9pY2VzRml4ZWRPcmlnaW4sIGlzQ29udGFpbmVyTm9kZSwgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLCBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsIGlzU2xpZGVzTm9kZSwgbWF4RGlnaXRzVmFsaWRhdGlvbiwgbWF4VmFsaWRhdGlvbixcbiAgbWluRGlnaXRzVmFsaWRhdGlvbiwgbWluVmFsaWRhdGlvbiwgbm90RW1wdHlWYWxpZGF0aW9uLCBub3RFbXB0eVdhcm5pbmdcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHNjYW4sIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uLCBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb259IGZyb20gJy4vb3BlcmF0aW9ucyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnkge1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uOiB7XG4gICAgZm9udFNldDogc3RyaW5nO1xuICAgIGZvbnRJY29uOiBzdHJpbmc7XG4gIH07XG4gIG5vZGVUeXBlOiB7XG4gICAgbm9kZTogQWpmTm9kZVR5cGU7XG4gICAgZmllbGQ/OiBBamZGaWVsZFR5cGUsXG4gIH07XG4gIGlzU2xpZGU/OiBib29sZWFuO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkge1xuICBub2RlOiBBamZOb2RlO1xuICBjb250YWluZXI6IEFqZkNvbnRhaW5lck5vZGUgfCBudWxsO1xuICBjaGlsZHJlbjogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbiAgY29udGVudDogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90IHtcbiAgcGFyZW50OiBBamZOb2RlO1xuICBwYXJlbnROb2RlOiBudW1iZXI7XG59XG5cblxuZXhwb3J0IHR5cGUgQWpmRm9ybUJ1aWxkZXJOb2RlID0gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBBamZGb3JtQnVpbGRlckVtcHR5U2xvdDtcbmV4cG9ydCB0eXBlIEFqZkNvbnRhaW5lck5vZGUgPSBBamZTbGlkZSB8IEFqZlJlcGVhdGluZ1NsaWRlIHwgQWpmTm9kZUdyb3VwO1xuXG5mdW5jdGlvbiBnZXROb2RlQ29udGFpbmVyKGM6IHtub2RlczogQWpmTm9kZVtdfSwgbm9kZTogQWpmTm9kZSk6IHtub2RlczogQWpmTm9kZVtdfSB8IG51bGwge1xuICBpZiAoYy5ub2Rlcy5pbmRleE9mKG5vZGUpID4gLTEpIHtcbiAgICByZXR1cm4gYztcbiAgfVxuICBjb25zdCBjbnMgPSBjLm5vZGVzLmZpbHRlcihuID0+IGlzQ29udGFpbmVyTm9kZShuKSk7XG4gIGNvbnN0IGxlbiA9IGNucy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwIDsgaSA8IGxlbiA7IGkrKykge1xuICAgIGNvbnN0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcig8QWpmQ29udGFpbmVyTm9kZT5jbnNbaV0sIG5vZGUpO1xuICAgIGlmIChjbiAhPSBudWxsKSB7IHJldHVybiBjbjsgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnQ6IEFqZk5vZGUsIGlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMgPSBmYWxzZVxuKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBjb25zdCBlbnRyaWVzOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IG5vZGVzXG4gICAgLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnQuaWQpXG4gICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgLm1hcChuID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgbik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goe3BhcmVudDogbiwgcGFyZW50Tm9kZTogMH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IG4sXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKVxuICAgICAgfTtcbiAgICB9KTtcbiAgaWYgKCFpZ25vcmVDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgY29uc3QgZW50cmllc051bSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIGNvbnN0IGNicyA9IHBhcmVudC5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gZW50cmllc051bSA7IGkgPCBjYnMgOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7XG4gICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICBwYXJlbnROb2RlOiBpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlIHwgbnVsbClbXSB7XG4gIGNvbnN0IHJvb3ROb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09IG51bGwgfHwgbi5wYXJlbnQgPT09IDApO1xuICBpZiAocm9vdE5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IHJvb3ROb2RlID0gcm9vdE5vZGVzWzBdO1xuICAgIGlmIChpc1NsaWRlc05vZGUocm9vdE5vZGUpKSB7XG4gICAgICBjb25zdCB0cmVlOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IFtdO1xuICAgICAgdHJlZS5wdXNoKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IHJvb3ROb2RlLFxuICAgICAgICBjb250YWluZXI6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCByb290Tm9kZSksXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIHJvb3ROb2RlKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocm9vdE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbbnVsbF07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZvcm0gZGVmaW5pdGlvbicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk5vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10ge1xuICBsZXQgZmxhdE5vZGVzOiBBamZOb2RlW10gPSBbXTtcblxuICBub2Rlcy5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgZmxhdE5vZGVzID0gZmxhdE5vZGVzLmNvbmNhdChmbGF0dGVuTm9kZXMoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzKSk7XG4gICAgfVxuICAgIGZsYXROb2Rlcy5wdXNoKG5vZGUpO1xuICB9KTtcblxuICByZXR1cm4gZmxhdE5vZGVzO1xufVxuXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhcbiAgZmxhdE5vZGVzOiBBamZOb2RlW10sIHBhcmVudE5vZGU6IEFqZk5vZGUsIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbik6IEFqZk5vZGVbXSB7XG4gIHJldHVybiBicmFuY2ggIT0gbnVsbCA/XG4gICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkICYmIG4ucGFyZW50Tm9kZSA9PT0gYnJhbmNoKSA6XG4gICAgZmxhdE5vZGVzLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnROb2RlLmlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTm9kZXMobm9kZXM6IEFqZk5vZGVbXSwgaWRzOiBudW1iZXJbXSk6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGxlbiA9IG5vZGVzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKTtcbiAgICAgIGNvbnRhaW5lci5ub2RlcyA9IHJlbW92ZU5vZGVzKGNvbnRhaW5lci5ub2RlcywgaWRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGVzLmZpbHRlcihuID0+IGlkcy5pbmRleE9mKG4uaWQpID09PSAtMSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLCBwYXJlbnROb2RlOiBBamZOb2RlLCBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsXG4pOiBBamZOb2RlW10ge1xuICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXMobm9kZXMpO1xuICBsZXQgZGVsTm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuICBsZXQgZGVzY2VuZGFudHMgPSBnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIHBhcmVudE5vZGUsIGJyYW5jaCk7XG4gIGNvbnN0IGxlbiA9IGRlc2NlbmRhbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKG5vZGVzLCBkZWxOb2Rlcy5tYXAobiA9PiBuLmlkKSk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtQnVpbGRlclNlcnZpY2Uge1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSZXBlYXRpbmcgc2xpZGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtcmVwZWF0aW5nc2xpZGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtc3RyaW5nJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ31cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10ZXh0J30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1udW1iZXInfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWJvb2xlYW4nfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zaW5nbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdNdWx0aXBsZSBjaG9pY2UnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtbXVsdGlwbGVjaG9pY2UnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZm9ybXVsYSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1kYXRlaW5wdXQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUaW1lJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRpbWUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGltZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGFibGUnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGFibGV9XG4gICAgfVxuICBdO1xuICAvKipcbiAgICogQXZhaWxhYmxlIG5vZGUgdHlwZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBhdmFpbGFibGVOb2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10geyByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzOyB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9mb3JtT2JzOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiA9IHRoaXMuX2Zvcm0uYXNPYnNlcnZhYmxlKCk7XG4gIC8qKlxuICAgKiBDdXJyZW50IGVkaXRlZCBmb3JtIHN0cmVhbVxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGZvcm0oKTogT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD4geyByZXR1cm4gdGhpcy5fZm9ybU9iczsgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+O1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+O1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT47XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4geyByZXR1cm4gdGhpcy5fbm9kZXM7IH1cblxuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPjtcbiAgZ2V0IGZsYXROb2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0RmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+O1xuICBnZXQgZmxhdEZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHsgcmV0dXJuIHRoaXMuX2ZsYXRGaWVsZHM7IH1cblxuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT47XG4gIGdldCBub2RlRW50cmllc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiB7IHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7IH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnk6IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeU9iczogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+ID1cbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkuYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkTm9kZUVudHJ5T2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uOiBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiA9XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkQ29uZGl0aW9uKCk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4geyByZXR1cm4gdGhpcy5fZWRpdGVkQ29uZGl0aW9uT2JzOyB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbjogQmVoYXZpb3JTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbk9iczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4gPVxuICAgICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGVkaXRlZENob2ljZXNPcmlnaW4oKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVPYnM6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGJlZm9yZU5vZGVzVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4geyByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7IH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGFmdGVyTm9kZVVwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHsgcmV0dXJuIHRoaXMuX2FmdGVyTm9kZVVwZGF0ZU9iczsgfVxuXG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclVwZGF0ZXM6IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NhdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHJpdmF0ZSBfZGVsZXRlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTYXZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXREZWxldGVOb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBlZGl0ZWQgZm9ybVxuICAgKlxuICAgKiBAcGFyYW0gZm9ybVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gIT09IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVkaXROb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQoY29uZGl0aW9uKTtcbiAgfVxuXG4gIHNhdmVDdXJyZW50Q29uZGl0aW9uKGNvbmRpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGMgPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uZ2V0VmFsdWUoKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgY2FuY2VsQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgIG5vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gICAgcGFyZW50OiBBamZOb2RlLFxuICAgIHBhcmVudE5vZGU6IG51bWJlcixcbiAgICBpbkNvbnRlbnQgPSBmYWxzZVxuICApOiB2b2lkIHtcbiAgICBsZXQgbm9kZTogQWpmTm9kZXxBamZGaWVsZDtcbiAgICBjb25zdCBpZCA9ICsrbm9kZVVuaXF1ZUlkO1xuICAgIGNvbnN0IGlzRmllbGROb2RlID0gbm9kZVR5cGUubm9kZVR5cGUuZmllbGQgIT0gbnVsbDtcbiAgICBpZiAoaXNGaWVsZE5vZGUpIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsXG4gICAgICAgIGZpZWxkVHlwZTogbm9kZVR5cGUubm9kZVR5cGUuZmllbGQhLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudC5pZCxcbiAgICAgICAgcGFyZW50Tm9kZSxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IGNyZWF0ZUNvbnRhaW5lck5vZGUoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLm5vZGUsXG4gICAgICAgIHBhcmVudDogcGFyZW50ICE9IG51bGwgPyBwYXJlbnQuaWQgOiAwLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgbm9kZXM6IFtdLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICBpZiAobm9kZS5wYXJlbnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFtub2RlXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNuID0gaXNDb250YWluZXJOb2RlKHBhcmVudCkgJiYgaW5Db250ZW50ID9cbiAgICAgICAgKDxBamZDb250YWluZXJOb2RlPnBhcmVudCkgOlxuICAgICAgICBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIHBhcmVudCk7XG4gICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICBpZiAoIWlzRmllbGROb2RlKSB7XG4gICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgIGNvbnN0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNuLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVOb2RlRW50cnkocHJvcGVydGllczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50LmVtaXQocHJvcGVydGllcyk7XG4gIH1cblxuICBjYW5jZWxOb2RlRW50cnlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuICB9XG5cbiAgZGVsZXRlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudC5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICBnZXRDdXJyZW50Rm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIFt0aGlzLmZvcm0sIHRoaXMubm9kZXMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zLCB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLnN0cmluZ0lkZW50aWZpZXJdXG4gICAgKS5waXBlKFxuICAgICAgZmlsdGVyKChbZm9ybV0pID0+IGZvcm0gIT0gbnVsbCksXG4gICAgICBtYXAoKFtmb3JtLCBub2RlcywgYXR0YWNobWVudHNPcmlnaW5zLCBjaG9pY2VzT3JpZ2lucywgc3RyaW5nSWRlbnRpZmllcl0pID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZvcm0oe1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zOiBjaG9pY2VzT3JpZ2lucy5zbGljZSgwKSxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IGF0dGFjaG1lbnRzT3JpZ2lucy5zbGljZSgwKSxcbiAgICAgICAgICBzdHJpbmdJZGVudGlmaWVyOiAoc3RyaW5nSWRlbnRpZmllciB8fCBbXSkuc2xpY2UoMCksXG4gICAgICAgICAgbm9kZXM6IG5vZGVzLnNsaWNlKDApIGFzIEFqZlNsaWRlW10sXG4gICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogZm9ybSEuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjcmVhdGVDaG9pY2VzRml4ZWRPcmlnaW48YW55Pih7bmFtZTogJyd9KSk7XG4gIH1cblxuICBjYW5jZWxDaG9pY2VzT3JpZ2luRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlQ2hvaWNlc09yaWdpbihwYXJhbXM6IHtsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNob2ljZXM6IGFueVtdfSk6IHZvaWQge1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmdldFZhbHVlKCk7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoKGNob2ljZXNPcmlnaW5zKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IGNob2ljZXNPcmlnaW5zLmluZGV4T2YoY2hvaWNlc09yaWdpbik7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gW1xuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCwgaWR4KSxcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW4sXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZShpZHggKyAxKSxcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zID0gWy4uLmNob2ljZXNPcmlnaW5zLCBjaG9pY2VzT3JpZ2luXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlc09yaWdpbnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZVN0cmluZ0lkZW50aWZpZXIoaWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLm5leHQoKCkgPT4gWy4uLmlkZW50aWZpZXJdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCBuLmlkKTtcbiAgICAgIGlmIChpc0NvbnRhaW5lck5vZGUobikpIHtcbiAgICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgdGhpcy5fZmluZE1heE5vZGVJZCgoPEFqZkNvbnRhaW5lck5vZGU+bikubm9kZXMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF4SWQ7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybVxuICAgICAgLnN1YnNjcmliZSgoZm9ybTogQWpmRm9ybSB8IG51bGwpID0+IHtcbiAgICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgICAgaWYgKGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgJiYgZm9ybS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbm9kZVVuaXF1ZUlkID0gdGhpcy5fZmluZE1heE5vZGVJZChmb3JtLm5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAoX25vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgICAoX2F0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdKTogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucyAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5jaG9pY2VzT3JpZ2lucyAhPSBudWxsID8gZm9ybS5jaG9pY2VzT3JpZ2lucy5zbGljZSgwKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dChcbiAgICAgICAgICAgIChfOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGZvcm0uc3RyaW5nSWRlbnRpZmllci5zbGljZSgwKVxuICAgICAgICAgICAgICAgIDogW107XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4+dGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvcChjaG9pY2VzT3JpZ2lucyk7XG4gICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICB9LCBbXVxuICAgICAgKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllciA9IHRoaXMuX3N0cmluZ0lkZW50aWZpZXJVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKFxuICAgICAgICAoc3RyaW5nSWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSwgb3A6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wKHN0cmluZ0lkZW50aWZpZXIpO1xuICAgICAgICB9LCBbXVxuICAgICAgKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpXG4gICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc2Nhbigobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiBmbGF0dGVuTm9kZXMobm9kZXMpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpXG4gICAgKTtcblxuICAgIHRoaXMuX2ZsYXRGaWVsZHMgPSB0aGlzLl9mbGF0Tm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gPEFqZkZpZWxkW10+bm9kZXMuZmlsdGVyKG4gPT4gIWlzQ29udGFpbmVyTm9kZShuKSkpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KClcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT5idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzKSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgICAgIG1hcCgoW3Byb3BlcnRpZXMsIG5vZGVFbnRyeV0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgICAgICBub2RlRW50cnkgPSBub2RlRW50cnkhO1xuICAgICAgICAgICAgICBjb25zdCBvcmlnTm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IHByb3BlcnRpZXMubmFtZTtcbiAgICAgICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9IHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kaXRpb246IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSkgOlxuICAgICAgICAgICAgICAgICAgW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcE5vZGUgPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5ub2RlO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUuZm9ybXVsYVJlcHMgPSBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzfSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5taW5SZXBzID0gcHJvcGVydGllcy5taW5SZXBzO1xuICAgICAgICAgICAgICAgIHJlcE5vZGUubWF4UmVwcyA9IHByb3BlcnRpZXMubWF4UmVwcztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0ZpZWxkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5mb3JtdWxhID0gcHJvcGVydGllcy5mb3JtdWxhICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBwcm9wZXJ0aWVzLmZvcm11bGF9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JjZVZhbHVlID0gcHJvcGVydGllcy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4VmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluRGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgbGV0IG1heERpZ2l0czogbnVtYmVyfG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIG1pblZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWF4VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWluRGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWluRGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1heERpZ2l0cykpIHtcbiAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmb3JjZVZhbHVlICE9IG51bGwgfHwgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8IG1heFZhbHVlICE9IG51bGwgfHwgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBmaWVsZC52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5ub3RFbXB0eSA9IG5vdEVtcHR5ID8gbm90RW1wdHlWYWxpZGF0aW9uKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhWYWx1ZSA9IG1heFZhbHVlICE9IG51bGwgPyBtYXhWYWxpZGF0aW9uKG1heFZhbHVlKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluRGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgIT0gbnVsbCA/IG1pbkRpZ2l0c1ZhbGlkYXRpb24obWluRGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWF4RGlnaXRzID1cbiAgICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCA/IG1heERpZ2l0c1ZhbGlkYXRpb24obWF4RGlnaXRzKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHZhbGlkYXRpb25Db25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKGM6IHtjb25kaXRpb246IHN0cmluZywgZXJyb3JNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogYy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHZhbGlkYXRpb247XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5V2FybiA9IHByb3BlcnRpZXMubm90RW1wdHlXYXJuaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdDb25kaXRpb25zID0gcHJvcGVydGllcy53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAobm90RW1wdHlXYXJuICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zICE9IG51bGwgJiYgd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSBmaWVsZC53YXJuaW5nIHx8IGNyZWF0ZVdhcm5pbmdHcm91cCh7fSk7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nLmNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICBbXSkubWFwKCh3OiB7Y29uZGl0aW9uOiBzdHJpbmcsIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PiBjcmVhdGVXYXJuaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB3YXJuaW5nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBmaWVsZC53YXJuaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaWVsZC5uZXh0U2xpZGVDb25kaXRpb24gPSBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9ufSkgOlxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgZmllbGQuc2l6ZSA9IHByb3BlcnRpZXMuc2l6ZTtcbiAgICAgICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGQpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmd2MgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PmZpZWxkO1xuICAgICAgICAgICAgICAgICAgKGZ3YyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWYgPSBwcm9wZXJ0aWVzLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICAgICAgICBmd2MuZm9yY2VFeHBhbmRlZCA9IHByb3BlcnRpZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZU5hcnJvdyA9IHByb3BlcnRpZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICAgICAgICBmd2MudHJpZ2dlckNvbmRpdGlvbnMgPSAocHJvcGVydGllcy50cmlnZ2VyQ29uZGl0aW9ucyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHQ6IHN0cmluZykgPT4gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHR9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgLy8gVE9ETzogQHRyaWsgY2hlY2sgdGhpcywgd2FzIGFsd2F5cyB0cnVlP1xuICAgICAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY24ubm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vICAgY29uc3QgaWR4ID0gbm9kZXMuaW5kZXhPZihvcmlnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAvLyAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCwgaWR4KS5jb25jYXQoW25vZGVdKS5jb25jYXQobm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBuZXdDb25kaXRpb25hbEJyYW5jaGVzOyBpIDwgb2xkQ29uZGl0aW9uYWxCcmFuY2hlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXREZWxldGVOb2RlKCk6IHZvaWQge1xuICAgICg8T2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4+dGhpcy5fZGVsZXRlTm9kZUVudHJ5RXZlbnQpLnBpcGUoXG4gICAgICBtYXAoKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpID0+IHtcbiAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgIG5ld05vZGVzID0gbmV3Tm9kZXMuY29uY2F0KGNuLm5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgIG5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKS5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxufVxuIl19