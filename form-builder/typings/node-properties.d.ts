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
import { OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfNode, IAjfChoicesOrigin } from '@ajf/core/forms';
import { AjfFormBuilderNodeEntry, AjfFormBuilderService } from './form-builder-service';
export interface ValidationCondition {
    condition: string;
    errorMessage: string;
}
export interface WarningCondition {
    condition: string;
    warningMessage: string;
}
export declare class AjfFbNodeProperties implements OnDestroy {
    private _service;
    private _dialog;
    private _fb;
    private _fieldSizes;
    readonly fieldSizes: {
        label: string;
        value: string;
    }[];
    private _nodeEntry;
    readonly nodeEntry: Observable<AjfFormBuilderNodeEntry | null>;
    private _choicesOrigins;
    readonly choicesOrigins: IAjfChoicesOrigin[];
    private _enabled;
    readonly enabled: Observable<boolean>;
    private _propertiesForm;
    readonly propertiesForm: Observable<FormGroup>;
    private _hasChoices;
    readonly hasChoices: Observable<boolean>;
    private _curVisibility;
    readonly curVisibility: string | null;
    private _curFormulaReps;
    readonly curFormulaReps: string | null;
    private _curChoicesFilter;
    readonly curChoicesFilter: string;
    private _curForceValue;
    readonly curForceValue: string | null;
    private _curFormula;
    readonly curFormula: string | null;
    private _conditionalBranches;
    readonly conditionalBranches: string[];
    private _validationConditions;
    readonly validationConditions: ValidationCondition[];
    private _warningConditions;
    readonly warningConditions: WarningCondition[];
    private _nextSlideCondition;
    readonly nextSlideCondition: string;
    private _triggerConditions;
    readonly triggerConditions: string[];
    isRepeatingContainerNode: (node: AjfNode) => boolean;
    private _visibilitySub;
    private _conditionalBranchesSub;
    private _formulaRepsSub;
    private _choicesFilterSub;
    private _formulaSub;
    private _forceValueSub;
    private _validationConditionsSub;
    private _warningConditionsSub;
    private _nextSlideConditionSub;
    private _choicesOriginsSub;
    private _triggerConditionsSub;
    private _editConditionDialog;
    private _editConditionDialogSub;
    private _editValidationConditionDialog;
    private _editValidationConditionDialogSub;
    private _editWarningConditionDialog;
    private _editWarningConditionDialogSub;
    private _editVisibilityEvt;
    private _editVisibilitySub;
    private _editConditionalBranchEvt;
    private _editConditionalBranchSub;
    private _editFormulaRepsEvt;
    private _editFormulaRepsSub;
    private _editChoicesFilterEvt;
    private _editChoicesFilterSub;
    private _editFormulaEvt;
    private _editFormulaSub;
    private _editForceValueEvt;
    private _editForceValueSub;
    private _editValidationConditionEvt;
    private _editValidationConditionSub;
    private _addValidationConditionEvt;
    private _addValidationConditionSub;
    private _removeValidationConditionEvt;
    private _removeValidationConditionSub;
    private _editWarningConditionEvt;
    private _editWarningConditionSub;
    private _addWarningConditionEvt;
    private _addWarningConditionSub;
    private _removeWarningConditionEvt;
    private _removeWarningConditionSub;
    private _editNextSlideConditionEvt;
    private _editNextSlideConditionSub;
    private _editTriggerConditionEvt;
    private _editTriggerConditionSub;
    private _addTriggerConditionEvt;
    private _addTriggerConditionSub;
    private _removeTriggerConditionEvt;
    private _removeTriggerConditionSub;
    private _saveEvt;
    private _saveSub;
    constructor(_service: AjfFormBuilderService, _dialog: MatDialog, _fb: FormBuilder);
    editVisibility(): void;
    editConditionalBranch(idx: number): void;
    editFormulaReps(): void;
    editChoicesFilter(): void;
    editFormula(): void;
    editForceValue(): void;
    editValidationCondition(idx: number): void;
    addValidationCondition(): void;
    removeValidationCondition(idx: number): void;
    editWarningCondition(idx: number): void;
    addWarningCondition(): void;
    removeWarningCondition(idx: number): void;
    editNextSlideCondition(): void;
    editTriggerCondition(idx: number): void;
    addTriggerCondition(): void;
    removeTriggerCondition(idx: number): void;
    isField(node: AjfNode): boolean;
    isNumericField(node: AjfNode): boolean;
    isFieldWithChoices(node: AjfNode): boolean;
    save(): void;
    cancel(): void;
    ngOnDestroy(): void;
    private _initSave;
    private _initForm;
    private _destroyConditionDialog;
    private _destroyValidationConditionDialog;
    private _destroyWarningConditionDialog;
    private _initRemoveTriggerCondition;
    private _initAddTriggerCondition;
    private _initTriggerConditionEdit;
    private _initRemoveWarningCondition;
    private _initAddWarningCondition;
    private _initWarningConditionEdit;
    private _initRemoveValidationCondition;
    private _initAddValidationCondition;
    private _initValidationConditionEdit;
    private _initForceValueEdit;
    private _initNextSlideConditionEdit;
    private _initFormulaEdit;
    private _initFormulaRepsEdit;
    private _initChoicesFilterEdit;
    private _initConditionalBranchEdit;
    private _initVisibilityEdit;
    private _handleTriggerCondtionsChange;
    private _handleWarningCondtionsChange;
    private _handleValidationCondtionsChange;
    private _handleForceValueChange;
    private _handleNextSlideConditionChange;
    private _handleFormulaChange;
    private _handleFormulaRepsChange;
    private _handleChoicesFilterChange;
    private _handleConditionalBranchesChange;
    private _handleVisibilityChange;
    private _guessVisibilityOpt;
}
