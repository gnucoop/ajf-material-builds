/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQzZDLFlBQVksRUFFOUQsV0FBVyxFQUEwRCx3QkFBd0IsRUFDN0YsV0FBVyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFDckYsYUFBYSxFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQ2pGLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQzlGLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQ3hFLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUUsYUFBYSxFQUFjLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6RSxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQXFDMUYsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFxQixFQUFFLElBQWE7SUFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxD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KlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbiwgQWpmQ2hvaWNlc09yaWdpbiwgQWpmRmllbGQsIEFqZkZpZWxkVHlwZSxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlcywgQWpmRm9ybSwgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsIEFqZk5vZGUsIEFqZk5vZGVHcm91cCwgQWpmTm9kZXNPcGVyYXRpb24sXG4gIEFqZk5vZGVUeXBlLCBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlLCBBamZSZXBlYXRpbmdTbGlkZSwgQWpmU2xpZGUsIGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbixcbiAgY3JlYXRlRmllbGQsIGNyZWF0ZUZvcm0sIGNyZWF0ZUNvbnRhaW5lck5vZGUsIGNyZWF0ZVZhbGlkYXRpb24sIGNyZWF0ZVZhbGlkYXRpb25Hcm91cCxcbiAgY3JlYXRlV2FybmluZywgY3JlYXRlV2FybmluZ0dyb3VwLCBpc0Nob2ljZXNGaXhlZE9yaWdpbiwgaXNDb250YWluZXJOb2RlLCBpc0ZpZWxkLFxuICBpc0ZpZWxkV2l0aENob2ljZXMsIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZSwgaXNTbGlkZXNOb2RlLCBtYXhEaWdpdHNWYWxpZGF0aW9uLCBtYXhWYWxpZGF0aW9uLFxuICBtaW5EaWdpdHNWYWxpZGF0aW9uLCBtaW5WYWxpZGF0aW9uLCBub3RFbXB0eVZhbGlkYXRpb24sIG5vdEVtcHR5V2FybmluZ1xufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgY3JlYXRlQ29uZGl0aW9uLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBwdWJsaXNoUmVwbGF5LCByZWZDb3VudCwgc2Nhbiwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24sIEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGljb246IHtcbiAgICBmb250U2V0OiBzdHJpbmc7XG4gICAgZm9udEljb246IHN0cmluZztcbiAgfTtcbiAgbm9kZVR5cGU6IHtcbiAgICBub2RlOiBBamZOb2RlVHlwZTtcbiAgICBmaWVsZD86IEFqZkZpZWxkVHlwZSxcbiAgfTtcbiAgaXNTbGlkZT86IGJvb2xlYW47XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gIG5vZGU6IEFqZk5vZGU7XG4gIGNvbnRhaW5lcjogQWpmQ29udGFpbmVyTm9kZSB8IG51bGw7XG4gIGNoaWxkcmVuOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdO1xuICBjb250ZW50OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Qge1xuICBwYXJlbnQ6IEFqZk5vZGU7XG4gIHBhcmVudE5vZGU6IG51bWJlcjtcbn1cblxuXG5leHBvcnQgdHlwZSBBamZGb3JtQnVpbGRlck5vZGUgPSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90O1xuZXhwb3J0IHR5cGUgQWpmQ29udGFpbmVyTm9kZSA9IEFqZlNsaWRlIHwgQWpmUmVwZWF0aW5nU2xpZGUgfCBBamZOb2RlR3JvdXA7XG5cbmZ1bmN0aW9uIGdldE5vZGVDb250YWluZXIoYzoge25vZGVzOiBBamZOb2RlW119LCBub2RlOiBBamZOb2RlKToge25vZGVzOiBBamZOb2RlW119IHwgbnVsbCB7XG4gIGlmIChjLm5vZGVzLmluZGV4T2Yobm9kZSkgPiAtMSkge1xuICAgIHJldHVybiBjO1xuICB9XG4gIGNvbnN0IGNucyA9IGMubm9kZXMuZmlsdGVyKG4gPT4gaXNDb250YWluZXJOb2RlKG4pKTtcbiAgY29uc3QgbGVuID0gY25zLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDAgOyBpIDwgbGVuIDsgaSsrKSB7XG4gICAgY29uc3QgY24gPSBnZXROb2RlQ29udGFpbmVyKDxBamZDb250YWluZXJOb2RlPmNuc1tpXSwgbm9kZSk7XG4gICAgaWYgKGNuICE9IG51bGwpIHsgcmV0dXJuIGNuOyB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoXG4gIG5vZGVzOiBBamZOb2RlW10sIHBhcmVudDogQWpmTm9kZSwgaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcyA9IGZhbHNlXG4pOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGNvbnN0IGVudHJpZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gbm9kZXNcbiAgICAuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudC5pZClcbiAgICAuc29ydCgobjEsIG4yKSA9PiBuMS5wYXJlbnROb2RlIC0gbjIucGFyZW50Tm9kZSlcbiAgICAubWFwKG4gPT4ge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCBuKTtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2hpbGRyZW4ucHVzaCh7cGFyZW50OiBuLCBwYXJlbnROb2RlOiAwfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogbixcbiAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIG4pXG4gICAgICB9O1xuICAgIH0pO1xuICBpZiAoIWlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzTnVtID0gZW50cmllcy5sZW5ndGg7XG4gICAgY29uc3QgY2JzID0gcGFyZW50LmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSBlbnRyaWVzTnVtIDsgaSA8IGNicyA7IGkrKykge1xuICAgICAgZW50cmllcy5wdXNoKHtcbiAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgIHBhcmVudE5vZGU6IGlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW50cmllcztcbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChfbm9kZXM6IEFqZk5vZGVbXSwgbm9kZTogQWpmTm9kZSk6IEFqZkZvcm1CdWlsZGVyTm9kZVtdIHtcbiAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgIHJldHVybiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2Rlcywgbm9kZSwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXM6IEFqZk5vZGVbXSk6IChBamZGb3JtQnVpbGRlck5vZGUgfCBudWxsKVtdIHtcbiAgY29uc3Qgcm9vdE5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT0gbnVsbCB8fCBuLnBhcmVudCA9PT0gMCk7XG4gIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3Qgcm9vdE5vZGUgPSByb290Tm9kZXNbMF07XG4gICAgaWYgKGlzU2xpZGVzTm9kZShyb290Tm9kZSkpIHtcbiAgICAgIGNvbnN0IHRyZWU6IEFqZkZvcm1CdWlsZGVyTm9kZVtdID0gW107XG4gICAgICB0cmVlLnB1c2goPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PntcbiAgICAgICAgbm9kZTogcm9vdE5vZGUsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgY2hpbGRyZW46IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2Rlcywgcm9vdE5vZGUpXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtudWxsXTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZm9ybSBkZWZpbml0aW9uJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuTm9kZXMobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSB7XG4gIGxldCBmbGF0Tm9kZXM6IEFqZk5vZGVbXSA9IFtdO1xuXG4gIG5vZGVzLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICBpZiAoaXNDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICBmbGF0Tm9kZXMgPSBmbGF0Tm9kZXMuY29uY2F0KGZsYXR0ZW5Ob2RlcygoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMpKTtcbiAgICB9XG4gICAgZmxhdE5vZGVzLnB1c2gobm9kZSk7XG4gIH0pO1xuXG4gIHJldHVybiBmbGF0Tm9kZXM7XG59XG5cbmZ1bmN0aW9uIGdldERlc2NlbmRhbnRzKFxuICBmbGF0Tm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50Tm9kZTogQWpmTm9kZSwgYnJhbmNoOiBudW1iZXIgfCBudWxsID0gbnVsbFxuKTogQWpmTm9kZVtdIHtcbiAgcmV0dXJuIGJyYW5jaCAhPSBudWxsID9cbiAgICBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQgJiYgbi5wYXJlbnROb2RlID09PSBicmFuY2gpIDpcbiAgICBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2Rlcyhub2RlczogQWpmTm9kZVtdLCBpZHM6IG51bWJlcltdKTogQWpmTm9kZVtdIHtcbiAgY29uc3QgbGVuID0gbm9kZXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMCA7IGkgPCBsZW4gOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gKDxBamZDb250YWluZXJOb2RlPm5vZGUpO1xuICAgICAgY29udGFpbmVyLm5vZGVzID0gcmVtb3ZlTm9kZXMoY29udGFpbmVyLm5vZGVzLCBpZHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZXMuZmlsdGVyKG4gPT4gaWRzLmluZGV4T2Yobi5pZCkgPT09IC0xKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlTm9kZVN1YnRyZWUoXG4gIG5vZGVzOiBBamZOb2RlW10sIHBhcmVudE5vZGU6IEFqZk5vZGUsIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGxcbik6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlcyhub2Rlcyk7XG4gIGxldCBkZWxOb2RlczogQWpmTm9kZVtdID0gW107XG4gIGxldCBkZXNjZW5kYW50cyA9IGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgcGFyZW50Tm9kZSwgYnJhbmNoKTtcbiAgY29uc3QgbGVuID0gZGVzY2VuZGFudHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMCA7IGkgPCBsZW4gOyBpKyspIHtcbiAgICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIGRlc2NlbmRhbnRzW2ldKSk7XG4gIH1cbiAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZGVzY2VuZGFudHMpO1xuICByZXR1cm4gcmVtb3ZlTm9kZXMobm9kZXMsIGRlbE5vZGVzLm1hcChuID0+IG4uaWQpKTtcbn1cblxubGV0IG5vZGVVbmlxdWVJZCA9IDA7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2F2YWlsYWJsZU5vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10gPSBbXG4gICAge1xuICAgICAgbGFiZWw6ICdTbGlkZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zbGlkZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZTbGlkZX0sXG4gICAgICBpc1NsaWRlOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JlcGVhdGluZyBzbGlkZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1yZXBlYXRpbmdzbGlkZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZX0sXG4gICAgICBpc1NsaWRlOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1N0cmluZycsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1zdHJpbmcnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU3RyaW5nfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUZXh0JyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXRleHQnfSxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuVGV4dH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTnVtYmVyJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLW51bWJlcid9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5OdW1iZXJ9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Jvb2xlYW4nLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtYm9vbGVhbid9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Cb29sZWFufVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTaW5nbGUgY2hvaWNlJyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLXNpbmdsZWNob2ljZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2V9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ011bHRpcGxlIGNob2ljZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1tdWx0aXBsZWNob2ljZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZX1cbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRm9ybXVsYScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC1mb3JtdWxhJ30sXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkZvcm11bGF9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtZGF0ZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5EYXRlfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlIGlucHV0JyxcbiAgICAgIGljb246IHtmb250U2V0OiAnYWpmLWljb24nLCBmb250SWNvbjogJ2ZpZWxkLWRhdGVpbnB1dCd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5EYXRlSW5wdXR9XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RpbWUnLFxuICAgICAgaWNvbjoge2ZvbnRTZXQ6ICdhamYtaWNvbicsIGZvbnRJY29uOiAnZmllbGQtdGltZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UaW1lfVxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUYWJsZScsXG4gICAgICBpY29uOiB7Zm9udFNldDogJ2FqZi1pY29uJywgZm9udEljb246ICdmaWVsZC10YWJsZSd9LFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UYWJsZX1cbiAgICB9XG4gIF07XG4gIC8qKlxuICAgKiBBdmFpbGFibGUgbm9kZSB0eXBlc1xuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgZ2V0IGF2YWlsYWJsZU5vZGVUeXBlcygpOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSB7IHJldHVybiB0aGlzLl9hdmFpbGFibGVOb2RlVHlwZXM7IH1cblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2Zvcm1PYnM6IE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+ID0gdGhpcy5fZm9ybS5hc09ic2VydmFibGUoKTtcbiAgLyoqXG4gICAqIEN1cnJlbnQgZWRpdGVkIGZvcm0gc3RyZWFtXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiB7IHJldHVybiB0aGlzLl9mb3JtT2JzOyB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT47XG4gIGdldCBhdHRhY2htZW50c09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+O1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXI6IE9ic2VydmFibGU8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXT47XG4gIGdldCBzdHJpbmdJZGVudGlmaWVyKCk6IE9ic2VydmFibGU8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLl9zdHJpbmdJZGVudGlmaWVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPjtcbiAgZ2V0IG5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7IHJldHVybiB0aGlzLl9ub2RlczsgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+O1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT47XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4geyByZXR1cm4gdGhpcy5fZmxhdEZpZWxkczsgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPjtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+IHsgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZTsgfVxuXG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5T2JzOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4gPVxuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5hc09ic2VydmFibGUoKTtcbiAgZ2V0IGVkaXRlZE5vZGVFbnRyeSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWROb2RlRW50cnlPYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb246IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb24gfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb24gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+ID1cbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24uYXNPYnNlcnZhYmxlKCk7XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiB7IHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7IH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiA9XG4gICAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgZWRpdGVkQ2hvaWNlc09yaWdpbigpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgYmVmb3JlTm9kZXNVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7IHJldHVybiB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZU9iczsgfVxuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlLmFzT2JzZXJ2YWJsZSgpO1xuICBnZXQgYWZ0ZXJOb2RlVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4geyByZXR1cm4gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlT2JzOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPiA9IG5ldyBTdWJqZWN0PEFqZk5vZGVzT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzOiBTdWJqZWN0PEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyVXBkYXRlczogU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBwcml2YXRlIF9kZWxldGVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEF0dGFjaG1lbnRzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U3RyaW5nSWRlbnRpZmllclN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFNhdmVOb2RlKCk7XG4gICAgdGhpcy5faW5pdERlbGV0ZU5vZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBjdXJyZW50IGVkaXRlZCBmb3JtXG4gICAqXG4gICAqIEBwYXJhbSBmb3JtXG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIHNldEZvcm0oZm9ybTogQWpmRm9ybSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZm9ybSAhPT0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpKSB7XG4gICAgICB0aGlzLl9mb3JtLm5leHQoZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgZWRpdE5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb24oY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChjb25kaXRpb24pO1xuICB9XG5cbiAgc2F2ZUN1cnJlbnRDb25kaXRpb24oY29uZGl0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYyA9IHRoaXMuX2VkaXRlZENvbmRpdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgYy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQobnVsbCk7XG4gIH1cblxuICBjYW5jZWxDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIGluc2VydE5vZGUoXG4gICAgbm9kZVR5cGU6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgICBwYXJlbnQ6IEFqZk5vZGUsXG4gICAgcGFyZW50Tm9kZTogbnVtYmVyLFxuICAgIGluQ29udGVudCA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIGxldCBub2RlOiBBamZOb2RlfEFqZkZpZWxkO1xuICAgIGNvbnN0IGlkID0gKytub2RlVW5pcXVlSWQ7XG4gICAgY29uc3QgaXNGaWVsZE5vZGUgPSBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCAhPSBudWxsO1xuICAgIGlmIChpc0ZpZWxkTm9kZSkge1xuICAgICAgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZCxcbiAgICAgICAgZmllbGRUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCEsXG4gICAgICAgIHBhcmVudDogcGFyZW50LmlkLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gY3JlYXRlQ29udGFpbmVyTm9kZSh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogbm9kZVR5cGUubm9kZVR5cGUubm9kZSxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQgIT0gbnVsbCA/IHBhcmVudC5pZCA6IDAsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBub2RlczogW10sXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIGlmIChub2RlLnBhcmVudCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gW25vZGVdO1xuICAgICAgfVxuICAgICAgY29uc3QgY24gPSBpc0NvbnRhaW5lck5vZGUocGFyZW50KSAmJiBpbkNvbnRlbnQgP1xuICAgICAgICAoPEFqZkNvbnRhaW5lck5vZGU+cGFyZW50KSA6XG4gICAgICAgIGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgcGFyZW50KTtcbiAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgIGlmICghaXNGaWVsZE5vZGUpIHtcbiAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgY29uc3QgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgaWYgKHJlcGxhY2VOb2Rlcykge1xuICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY24ubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZU5vZGVFbnRyeShwcm9wZXJ0aWVzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnQuZW1pdChwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbmNlbE5vZGVFbnRyeUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gIH1cblxuICBkZWxldGVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50Lm5leHQobm9kZUVudHJ5KTtcbiAgfVxuXG4gIGdldEN1cnJlbnRGb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgW3RoaXMuZm9ybSwgdGhpcy5ub2RlcywgdGhpcy5hdHRhY2htZW50c09yaWdpbnMsIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuc3RyaW5nSWRlbnRpZmllcl1cbiAgICApLnBpcGUoXG4gICAgICBmaWx0ZXIoKFtmb3JtXSkgPT4gZm9ybSAhPSBudWxsKSxcbiAgICAgIG1hcCgoW2Zvcm0sIG5vZGVzLCBhdHRhY2htZW50c09yaWdpbnMsIGNob2ljZXNPcmlnaW5zLCBzdHJpbmdJZGVudGlmaWVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gY3JlYXRlRm9ybSh7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnM6IGNob2ljZXNPcmlnaW5zLnNsaWNlKDApLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2luczogYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApLFxuICAgICAgICAgIHN0cmluZ0lkZW50aWZpZXI6IChzdHJpbmdJZGVudGlmaWVyIHx8IFtdKS5zbGljZSgwKSxcbiAgICAgICAgICBub2Rlczogbm9kZXMuc2xpY2UoMCkgYXMgQWpmU2xpZGVbXSxcbiAgICAgICAgICBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zOiBmb3JtIS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55Pik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjaG9pY2VzT3JpZ2luKTtcbiAgfVxuXG4gIGNyZWF0ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbjxhbnk+KHtuYW1lOiAnJ30pKTtcbiAgfVxuXG4gIGNhbmNlbENob2ljZXNPcmlnaW5FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVDaG9pY2VzT3JpZ2luKHBhcmFtczoge2xhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2hvaWNlczogYW55W119KTogdm9pZCB7XG4gICAgY29uc3QgY2hvaWNlc09yaWdpbiA9IHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4uZ2V0VmFsdWUoKTtcbiAgICBpZiAoY2hvaWNlc09yaWdpbiAhPSBudWxsKSB7XG4gICAgICBjaG9pY2VzT3JpZ2luLmxhYmVsID0gcGFyYW1zLmxhYmVsO1xuICAgICAgY2hvaWNlc09yaWdpbi5uYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgICBpZiAoaXNDaG9pY2VzRml4ZWRPcmlnaW4oY2hvaWNlc09yaWdpbikpIHtcbiAgICAgICAgY2hvaWNlc09yaWdpbi5jaG9pY2VzID0gcGFyYW1zLmNob2ljZXM7XG4gICAgICB9XG4gICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXMubmV4dCgoY2hvaWNlc09yaWdpbnMpID0+IHtcbiAgICAgICAgY29uc3QgaWR4ID0gY2hvaWNlc09yaWdpbnMuaW5kZXhPZihjaG9pY2VzT3JpZ2luKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMgPSBbXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZSgwLCBpZHgpLFxuICAgICAgICAgICAgY2hvaWNlc09yaWdpbixcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKGlkeCArIDEpLFxuICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMgPSBbLi4uY2hvaWNlc09yaWdpbnMsIGNob2ljZXNPcmlnaW5dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaG9pY2VzT3JpZ2lucztcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlU3RyaW5nSWRlbnRpZmllcihpZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dCgoKSA9PiBbLi4uaWRlbnRpZmllcl0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZE1heE5vZGVJZChub2RlczogQWpmTm9kZVtdLCBfY3VyTWF4SWQgPSAwKTogbnVtYmVyIHtcbiAgICBsZXQgbWF4SWQgPSAwO1xuICAgIG5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIG4uaWQpO1xuICAgICAgaWYgKGlzQ29udGFpbmVyTm9kZShuKSkge1xuICAgICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCB0aGlzLl9maW5kTWF4Tm9kZUlkKCg8QWpmQ29udGFpbmVyTm9kZT5uKS5ub2RlcykpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXhJZDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtXG4gICAgICAuc3Vic2NyaWJlKChmb3JtOiBBamZGb3JtIHwgbnVsbCkgPT4ge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSAwO1xuICAgICAgICBpZiAoZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCAmJiBmb3JtLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KFxuICAgICAgICAgIChfbm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCA/IGZvcm0ubm9kZXMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgICAgIChfYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10pOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uYXR0YWNobWVudHNPcmlnaW5zICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgZm9ybS5hdHRhY2htZW50c09yaWdpbnMuc2xpY2UoMCkgOlxuICAgICAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgICAgICAoX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSk6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmNob2ljZXNPcmlnaW5zICE9IG51bGwgPyBmb3JtLmNob2ljZXNPcmlnaW5zLnNsaWNlKDApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KFxuICAgICAgICAgICAgKF86IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLnN0cmluZ0lkZW50aWZpZXIgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gZm9ybS5zdHJpbmdJZGVudGlmaWVyLnNsaWNlKDApXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPj50aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKChjaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sIG9wOiBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKGNob2ljZXNPcmlnaW5zKTtcbiAgICAgICAgICAgICAgICB9LCBbXSksIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF0dGFjaG1lbnRzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zID0gdGhpcy5fYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlcy5waXBlKFxuICAgICAgc2NhbihcbiAgICAgICAgKGF0dGFjaG1lbnRzT3JpZ2luczogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLCBvcDogQWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wKGF0dGFjaG1lbnRzT3JpZ2lucyk7XG4gICAgICAgIH0sIFtdXG4gICAgICApLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyID0gdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgIChzdHJpbmdJZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdLCBvcDogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gb3Aoc3RyaW5nSWRlbnRpZmllcik7XG4gICAgICAgIH0sIFtdXG4gICAgICApLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2Rlc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXMgPSAoPE9ic2VydmFibGU8QWpmTm9kZXNPcGVyYXRpb24+PnRoaXMuX25vZGVzVXBkYXRlcylcbiAgICAgICAgICAgICAgICAgICAgICAucGlwZShzY2FuKChub2RlczogQWpmTm9kZVtdLCBvcDogQWpmTm9kZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcblxuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IGZsYXR0ZW5Ob2Rlcyhub2RlcykpLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KClcbiAgICApO1xuXG4gICAgdGhpcy5fZmxhdEZpZWxkcyA9IHRoaXMuX2ZsYXROb2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiA8QWpmRmllbGRbXT5ub2Rlcy5maWx0ZXIobiA9PiAhaXNDb250YWluZXJOb2RlKG4pKSksXG4gICAgICBwdWJsaXNoUmVwbGF5KDEpLFxuICAgICAgcmVmQ291bnQoKVxuICAgICk7XG5cbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKG5vZGVzID0+IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPmJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXMpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoMSksXG4gICAgICByZWZDb3VudCgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTYXZlTm9kZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmVkaXRlZE5vZGVFbnRyeSwgdGhpcy5jaG9pY2VzT3JpZ2lucywgdGhpcy5hdHRhY2htZW50c09yaWdpbnMpLFxuICAgICAgICAgICAgZmlsdGVyKChbXywgbm9kZUVudHJ5XSkgPT4gbm9kZUVudHJ5ICE9IG51bGwpLFxuICAgICAgICAgICAgbWFwKChbcHJvcGVydGllcywgbm9kZUVudHJ5XSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgIG5vZGVFbnRyeSA9IG5vZGVFbnRyeSE7XG4gICAgICAgICAgICAgIGNvbnN0IG9yaWdOb2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBkZWVwQ29weShvcmlnTm9kZSk7XG4gICAgICAgICAgICAgIG5vZGUuaWQgPSBub2RlRW50cnkubm9kZS5pZDtcbiAgICAgICAgICAgICAgbm9kZS5uYW1lID0gcHJvcGVydGllcy5uYW1lO1xuICAgICAgICAgICAgICBub2RlLmxhYmVsID0gcHJvcGVydGllcy5sYWJlbDtcbiAgICAgICAgICAgICAgbm9kZS52aXNpYmlsaXR5ID0gcHJvcGVydGllcy52aXNpYmlsaXR5ICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMudmlzaWJpbGl0eX0pIDpcbiAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICAgICAgICAgICAgY29uc3Qgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyA9IHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbmRpdGlvbjogc3RyaW5nKSA9PiBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbn0pKSA6XG4gICAgICAgICAgICAgICAgICBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgICAgICAgICBjb25zdCBuZXdDb25kaXRpb25hbEJyYW5jaGVzID0gbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcblxuICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVwTm9kZSA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm5vZGU7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5mb3JtdWxhUmVwcyA9IHByb3BlcnRpZXMuZm9ybXVsYVJlcHMgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYVJlcHN9KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICByZXBOb2RlLm1pblJlcHMgPSBwcm9wZXJ0aWVzLm1pblJlcHM7XG4gICAgICAgICAgICAgICAgcmVwTm9kZS5tYXhSZXBzID0gcHJvcGVydGllcy5tYXhSZXBzO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IG5vZGUgYXMgQWpmRmllbGQ7XG4gICAgICAgICAgICAgICAgZmllbGQuZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHByb3BlcnRpZXMuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgICAgIGZpZWxkLmZvcm11bGEgPSBwcm9wZXJ0aWVzLmZvcm11bGEgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYX0pIDpcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmNlVmFsdWUgPSBwcm9wZXJ0aWVzLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vdEVtcHR5ID0gcHJvcGVydGllcy5ub3RFbXB0eTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgbGV0IG1pblZhbHVlOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWluVmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWF4VmFsdWU6IG51bWJlcnxudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5tYXhWYWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgIGxldCBtaW5EaWdpdHM6IG51bWJlcnxudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5EaWdpdHMsIDEwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBudW1iZXJ8bnVsbCA9IHBhcnNlSW50KHByb3BlcnRpZXMubWF4RGlnaXRzLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgbWluVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWF4VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTihtaW5EaWdpdHMpKSB7XG4gICAgICAgICAgICAgICAgICBtaW5EaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4obWF4RGlnaXRzKSkge1xuICAgICAgICAgICAgICAgICAgbWF4RGlnaXRzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlVmFsdWUgIT0gbnVsbCB8fCBub3RFbXB0eSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICAgICh2YWxpZGF0aW9uQ29uZGl0aW9ucyAhPSBudWxsICYmIHZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlICE9IG51bGwgfHwgbWF4VmFsdWUgIT0gbnVsbCB8fCBtaW5EaWdpdHMgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICBtYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IGZpZWxkLnZhbGlkYXRpb24gfHwgY3JlYXRlVmFsaWRhdGlvbkdyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm5vdEVtcHR5ID0gbm90RW1wdHkgPyBub3RFbXB0eVZhbGlkYXRpb24oKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24ubWluVmFsdWUgPSBtaW5WYWx1ZSAhPSBudWxsID8gbWluVmFsaWRhdGlvbihtaW5WYWx1ZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heFZhbHVlID0gbWF4VmFsdWUgIT0gbnVsbCA/IG1heFZhbGlkYXRpb24obWF4VmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5taW5EaWdpdHMgPVxuICAgICAgICAgICAgICAgICAgICAgIG1pbkRpZ2l0cyAhPSBudWxsID8gbWluRGlnaXRzVmFsaWRhdGlvbihtaW5EaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5tYXhEaWdpdHMgPVxuICAgICAgICAgICAgICAgICAgICAgIG1heERpZ2l0cyAhPSBudWxsID8gbWF4RGlnaXRzVmFsaWRhdGlvbihtYXhEaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbi5jb25kaXRpb25zID1cbiAgICAgICAgICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgW10pLm1hcCgoYzoge2NvbmRpdGlvbjogc3RyaW5nLCBlcnJvck1lc3NhZ2U6IHN0cmluZ30pID0+IGNyZWF0ZVZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBjLmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogYy5lcnJvck1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgbm90RW1wdHlXYXJuID0gcHJvcGVydGllcy5ub3RFbXB0eVdhcm5pbmc7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2FybmluZ0NvbmRpdGlvbnMgPSBwcm9wZXJ0aWVzLndhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChub3RFbXB0eVdhcm4gIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgICAod2FybmluZ0NvbmRpdGlvbnMgIT0gbnVsbCAmJiB3YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGggPiAwKSkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IGZpZWxkLndhcm5pbmcgfHwgY3JlYXRlV2FybmluZ0dyb3VwKHt9KTtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmcubm90RW1wdHkgPSBub3RFbXB0eVdhcm4gPyBub3RFbXB0eVdhcm5pbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmcuY29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgICAgICAgKHdhcm5pbmdDb25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgIFtdKS5tYXAoKHc6IHtjb25kaXRpb246IHN0cmluZywgd2FybmluZ01lc3NhZ2U6IHN0cmluZ30pID0+IGNyZWF0ZVdhcm5pbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiB3LmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgZmllbGQud2FybmluZyA9IHdhcm5pbmc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGZpZWxkLndhcm5pbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpZWxkLm5leHRTbGlkZUNvbmRpdGlvbiA9IHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogcHJvcGVydGllcy5uZXh0U2xpZGVDb25kaXRpb259KSA6XG4gICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBmaWVsZC5zaXplID0gcHJvcGVydGllcy5zaXplO1xuICAgICAgICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHByb3BlcnRpZXMuZGVmYXVsdFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZ3YyA9IDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+ZmllbGQ7XG4gICAgICAgICAgICAgICAgICAoZndjIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZiA9IHByb3BlcnRpZXMuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICAgICAgICAgIGZ3Yy5mb3JjZUV4cGFuZGVkID0gcHJvcGVydGllcy5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgICAgICAgICAgZndjLmZvcmNlTmFycm93ID0gcHJvcGVydGllcy5mb3JjZU5hcnJvdztcbiAgICAgICAgICAgICAgICAgIGZ3Yy50cmlnZ2VyQ29uZGl0aW9ucyA9IChwcm9wZXJ0aWVzLnRyaWdnZXJDb25kaXRpb25zIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW10pLm1hcCgodDogc3RyaW5nKSA9PiBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogdH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcblxuICAgICAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgb3JpZ05vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAvLyBUT0RPOiBAdHJpayBjaGVjayB0aGlzLCB3YXMgYWx3YXlzIHRydWU/XG4gICAgICAgICAgICAgICAgICAvLyBpZiAoY24gaW5zdGFuY2VvZiBBamZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICAgIGxldCBuZXdOb2RlcyA9IGNuLm5vZGVzLnNsaWNlKDAsIGlkeCk7XG4gICAgICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCBpZHggPSBub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgICAgIC8vICAgbm9kZXMgPSBub2Rlcy5zbGljZSgwLCBpZHgpLmNvbmNhdChbbm9kZV0pLmNvbmNhdChub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICBpZiAobmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG5ld0NvbmRpdGlvbmFsQnJhbmNoZXM7IGkgPCBvbGRDb25kaXRpb25hbEJyYW5jaGVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBub2RlcyA9IGRlbGV0ZU5vZGVTdWJ0cmVlKG5vZGVzLCBub2RlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdERlbGV0ZU5vZGUoKTogdm9pZCB7XG4gICAgKDxPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pj50aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudCkucGlwZShcbiAgICAgIG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVFbnRyeS5ub2RlO1xuICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgbm9kZSk7XG4gICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcGxhY2VOb2RlcyA9IGNuLm5vZGVzID09PSBub2RlcztcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNuLm5vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgbmV3Tm9kZXMgPSBuZXdOb2Rlcy5jb25jYXQoY24ubm9kZXMuc2xpY2UoaWR4ICsgMSkpO1xuICAgICAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlcyA9IGRlbGV0ZU5vZGVTdWJ0cmVlKG5vZGVzLCBub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG59XG4iXX0=