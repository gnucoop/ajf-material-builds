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
import { AjfAttachmentsOrigin, AjfChoicesOrigin, AjfContainerNode, AjfField, AjfFieldType, AjfForm, AjfNode, AjfNodeGroup, AjfNodeType, AjfRepeatingSlide, AjfSlide } from '@ajf/core/forms';
import { AjfCondition } from '@ajf/core/models';
import { Observable } from 'rxjs';
export interface AjfFormBuilderNodeTypeEntry {
    label: string;
    icon: {
        fontSet: string;
        fontIcon: string;
    };
    nodeType: {
        node: AjfNodeType;
        field?: AjfFieldType;
    };
    isSlide?: boolean;
}
export interface AjfFormBuilderNodeEntry {
    node: AjfNode;
    container: AjfContainerNode | null;
    children: AjfFormBuilderNodeEntry[];
    content: AjfFormBuilderNodeEntry[];
}
export interface AjfFormBuilderEmptySlot {
    parent: AjfNode;
    parentNode: number;
}
export declare type AjfFormBuilderNode = AjfFormBuilderNodeEntry | AjfFormBuilderEmptySlot;
export declare type AjfContainerNode = AjfSlide | AjfRepeatingSlide | AjfNodeGroup;
export declare function flattenNodes(nodes: AjfNode[]): AjfNode[];
export declare class AjfFormBuilderService {
    private _availableNodeTypes;
    /**
     * Available node types
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    readonly availableNodeTypes: AjfFormBuilderNodeTypeEntry[];
    private _form;
    private _formObs;
    /**
     * Current edited form stream
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    readonly form: Observable<AjfForm | null>;
    private _attachmentsOrigins;
    readonly attachmentsOrigins: Observable<AjfAttachmentsOrigin<any>[]>;
    private _choicesOrigins;
    readonly choicesOrigins: Observable<AjfChoicesOrigin<any>[]>;
    private _nodes;
    readonly nodes: Observable<AjfNode[]>;
    private _flatNodes;
    readonly flatNodes: Observable<AjfNode[]>;
    private _flatFields;
    readonly flatFields: Observable<AjfField[]>;
    private _nodeEntriesTree;
    readonly nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]>;
    private _editedNodeEntry;
    private _editedNodeEntryObs;
    readonly editedNodeEntry: Observable<AjfFormBuilderNodeEntry | null>;
    private _editedCondition;
    private _editedConditionObs;
    readonly editedCondition: Observable<AjfCondition | null>;
    private _editedChoicesOrigin;
    private _editedChoicesOriginObs;
    readonly editedChoicesOrigin: Observable<AjfChoicesOrigin<any> | null>;
    private _beforeNodesUpdate;
    private _beforeNodesUpdateObs;
    readonly beforeNodesUpdate: Observable<void>;
    private _afterNodeUpdate;
    private _afterNodeUpdateObs;
    readonly afterNodeUpdate: Observable<void>;
    private _nodesUpdates;
    private _attachmentsOriginsUpdates;
    private _choicesOriginsUpdates;
    private _saveNodeEntryEvent;
    private _deleteNodeEntryEvent;
    constructor();
    /**
     * Sets the current edited form
     *
     * @param form
     *
     * @memberOf AjfFormBuilderService
     */
    setForm(form: AjfForm | null): void;
    editNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    editCondition(condition: AjfCondition): void;
    saveCurrentCondition(condition: string): void;
    cancelConditionEdit(): void;
    insertNode(nodeType: AjfFormBuilderNodeTypeEntry, parent: AjfNode, parentNode: number, inContent?: boolean): void;
    saveNodeEntry(properties: any): void;
    cancelNodeEntryEdit(): void;
    deleteNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    getCurrentForm(): Observable<AjfForm>;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    createChoicesOrigin(): void;
    cancelChoicesOriginEdit(): void;
    saveChoicesOrigin(params: {
        label: string;
        name: string;
        choices: any[];
    }): void;
    private _findMaxNodeId;
    private _initFormStreams;
    private _initChoicesOriginsStreams;
    private _initAttachmentsOriginsStreams;
    private _initNodesStreams;
    private _initSaveNode;
    private _initDeleteNode;
}
