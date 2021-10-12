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
import { AjfAttachmentsOrigin, AjfChoicesOrigin, AjfField, AjfFieldType, AjfForm, AjfFormStringIdentifier, AjfNode, AjfNodeGroup, AjfNodeType, AjfRepeatingSlide, AjfSlide } from '@ajf/core/forms';
import { AjfCondition } from '@ajf/core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
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
/**
 * Represents a node's position change in the formbuilder.
 */
export interface AjfFormBuilderMoveEvent {
    /**
     * The node being moved.
     */
    nodeEntry: AjfFormBuilderNode;
    /**
     * The index of the node previous position.
     */
    fromIndex: number;
    /**
     * The index of the node new position.
     */
    toIndex: number;
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
    get availableNodeTypes(): AjfFormBuilderNodeTypeEntry[];
    private _form;
    private _formObs;
    /**
     * Current edited form stream
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get form(): Observable<AjfForm | null>;
    private _attachmentsOrigins;
    get attachmentsOrigins(): Observable<AjfAttachmentsOrigin<any>[]>;
    private _choicesOrigins;
    get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]>;
    private _stringIdentifier;
    get stringIdentifier(): Observable<AjfFormStringIdentifier[]>;
    private _nodesWithoutChoiceOrigins;
    private _nodes;
    get nodes(): Observable<AjfNode[]>;
    private _flatNodes;
    get flatNodes(): Observable<AjfNode[]>;
    private _flatFields;
    get flatFields(): Observable<AjfField[]>;
    private _nodeEntriesTree;
    get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]>;
    /**
     * A list of the ids of the dropLists connected to the source list.
     */
    private _connectedDropLists;
    get connectedDropLists(): BehaviorSubject<string[]>;
    private _editedNodeEntry;
    private _editedNodeEntryObs;
    get editedNodeEntry(): Observable<AjfFormBuilderNodeEntry | null>;
    private _editedCondition;
    private _editedConditionObs;
    get editedCondition(): Observable<AjfCondition | null>;
    private _editedChoicesOrigin;
    private _editedChoicesOriginObs;
    get editedChoicesOrigin(): Observable<AjfChoicesOrigin<any> | null>;
    private _beforeNodesUpdate;
    private _beforeNodesUpdateObs;
    get beforeNodesUpdate(): Observable<void>;
    private _afterNodeUpdate;
    private _afterNodeUpdateObs;
    get afterNodeUpdate(): Observable<void>;
    private _nodesUpdates;
    private _attachmentsOriginsUpdates;
    private _choicesOriginsUpdates;
    private _stringIdentifierUpdates;
    private _saveNodeEntryEvent;
    private _deleteNodeEntryEvent;
    /**
     * Event fired when the position of a node in a tree changes.
     */
    private _moveNodeEntryEvent;
    /**
     * Subscribes to the moveNodeEntryEvent event emitter;
     */
    private _moveNodeSub;
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
    assignListId(node: AjfNode, empty?: boolean): string;
    insertNode(nodeType: AjfFormBuilderNodeTypeEntry, parent: AjfNode, parentNode: number, inContent?: boolean, insertInIndex?: number): void;
    saveNodeEntry(properties: any): void;
    cancelNodeEntryEdit(): void;
    deleteNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void;
    /**
     * Triggers the moveNode event when a node is moved in the formbuilder.
     * @param nodeEntry The node to be moved.
     */
    moveNodeEntry(nodeEntry: AjfFormBuilderNodeEntry, from: number, to: number): void;
    getCurrentForm(): Observable<AjfForm>;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    createChoicesOrigin(): void;
    cancelChoicesOriginEdit(): void;
    saveChoicesOrigin(params: {
        label: string;
        name: string;
        choices: any[];
    }): void;
    saveStringIdentifier(identifier: AjfFormStringIdentifier[]): void;
    private _buildFormBuilderNodesTree;
    /**
     * Adds the id of a dropList to be connected with the FormBuilder source list.
     * @param listId The id of the list to connect.
     */
    private _connectDropList;
    private _findMaxNodeId;
    private _initFormStreams;
    private _initChoicesOriginsStreams;
    private _initAttachmentsOriginsStreams;
    private _initStringIdentifierStreams;
    private _initNodesStreams;
    private _initSaveNode;
    private _initDeleteNode;
    /**
     * Initializes the subscription to the moveNodeEntryEvent.
     */
    private _initMoveNode;
    /**
     * Updates the "id" and "parent" fields of a modified or rearranged list of nodes.
     * @param containerId The id of the parent container of the list.
     * @param nodesList The list of nodes to be updated.
     */
    private _updateNodesList;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormBuilderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfFormBuilderService>;
}
