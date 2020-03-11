/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/node-properties.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { isField, isFieldWithChoices, isNumberField, isRepeatingContainerNode } from '@ajf/core/forms';
import { alwaysCondition, neverCondition } from '@ajf/core/models';
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, publishReplay, refCount, withLatestFrom } from 'rxjs/operators';
import { AjfFbConditionEditorDialog } from './condition-editor-dialog';
import { AjfFormBuilderService } from './form-builder-service';
import { AjfFbValidationConditionEditorDialog } from './validation-condition-editor-dialog';
import { AjfFbWarningConditionEditorDialog } from './warning-condition-editor-dialog';
/**
 * @param {?} c
 * @return {?}
 */
function checkRepsValidity(c) {
    /** @type {?} */
    const minReps = c.value.minReps;
    /** @type {?} */
    const maxReps = c.value.maxReps;
    if (minReps != null && maxReps != null && minReps > maxReps) {
        return {
            reps: 'Min repetions cannot be greater than max repetitions'
        };
    }
    return null;
}
/**
 * @param {?} c
 * @return {?}
 */
function checkValueLimitsValidity(c) {
    /** @type {?} */
    const minValue = c.value.minValue;
    /** @type {?} */
    const maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return {
            valueLimit: 'Min value cannot be greater than max value'
        };
    }
    return null;
}
/**
 * @param {?} c
 * @return {?}
 */
function checkDigitsValidity(c) {
    /** @type {?} */
    const minDigits = c.value.minDigits;
    /** @type {?} */
    const maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return {
            digits: 'Min digits cannot be greater than max digits'
        };
    }
    return null;
}
/**
 * @record
 */
export function ValidationCondition() { }
if (false) {
    /** @type {?} */
    ValidationCondition.prototype.condition;
    /** @type {?} */
    ValidationCondition.prototype.errorMessage;
}
/**
 * @record
 */
export function WarningCondition() { }
if (false) {
    /** @type {?} */
    WarningCondition.prototype.condition;
    /** @type {?} */
    WarningCondition.prototype.warningMessage;
}
export class AjfFbNodeProperties {
    /**
     * @param {?} _service
     * @param {?} _dialog
     * @param {?} _fb
     */
    constructor(_service, _dialog, _fb) {
        this._service = _service;
        this._dialog = _dialog;
        this._fb = _fb;
        this._fieldSizes = [
            { label: 'Normal', value: 'normal' },
            { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' },
            { label: 'Tiny', value: 'tiny' },
            { label: 'Mini', value: 'mini' }
        ];
        this._choicesOrigins = [];
        this._conditionalBranches = [];
        this._validationConditions = [];
        this._warningConditions = [];
        this.isRepeatingContainerNode = (/**
         * @param {?} nodeEntry
         * @return {?}
         */
        (nodeEntry) => {
            return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
        });
        this._visibilitySub = Subscription.EMPTY;
        this._conditionalBranchesSub = Subscription.EMPTY;
        this._formulaRepsSub = Subscription.EMPTY;
        this._choicesFilterSub = Subscription.EMPTY;
        this._formulaSub = Subscription.EMPTY;
        this._forceValueSub = Subscription.EMPTY;
        this._validationConditionsSub = Subscription.EMPTY;
        this._warningConditionsSub = Subscription.EMPTY;
        this._nextSlideConditionSub = Subscription.EMPTY;
        this._choicesOriginsSub = Subscription.EMPTY;
        this._triggerConditionsSub = Subscription.EMPTY;
        this._editConditionDialogSub = Subscription.EMPTY;
        this._editValidationConditionDialogSub = Subscription.EMPTY;
        this._editWarningConditionDialogSub = Subscription.EMPTY;
        this._editVisibilityEvt = new EventEmitter();
        this._editVisibilitySub = Subscription.EMPTY;
        this._editConditionalBranchEvt = new EventEmitter();
        this._editConditionalBranchSub = Subscription.EMPTY;
        this._editFormulaRepsEvt = new EventEmitter();
        this._editFormulaRepsSub = Subscription.EMPTY;
        this._editChoicesFilterEvt = new EventEmitter();
        this._editChoicesFilterSub = Subscription.EMPTY;
        this._editFormulaEvt = new EventEmitter();
        this._editFormulaSub = Subscription.EMPTY;
        this._editForceValueEvt = new EventEmitter();
        this._editForceValueSub = Subscription.EMPTY;
        this._editValidationConditionEvt = new EventEmitter();
        this._editValidationConditionSub = Subscription.EMPTY;
        this._addValidationConditionEvt = new EventEmitter();
        this._addValidationConditionSub = Subscription.EMPTY;
        this._removeValidationConditionEvt = new EventEmitter();
        this._removeValidationConditionSub = Subscription.EMPTY;
        this._editWarningConditionEvt = new EventEmitter();
        this._editWarningConditionSub = Subscription.EMPTY;
        this._addWarningConditionEvt = new EventEmitter();
        this._addWarningConditionSub = Subscription.EMPTY;
        this._removeWarningConditionEvt = new EventEmitter();
        this._removeWarningConditionSub = Subscription.EMPTY;
        this._editNextSlideConditionEvt = new EventEmitter();
        this._editNextSlideConditionSub = Subscription.EMPTY;
        this._editTriggerConditionEvt = new EventEmitter();
        this._editTriggerConditionSub = Subscription.EMPTY;
        this._addTriggerConditionEvt = new EventEmitter();
        this._addTriggerConditionSub = Subscription.EMPTY;
        this._removeTriggerConditionEvt = new EventEmitter();
        this._removeTriggerConditionSub = Subscription.EMPTY;
        this._saveEvt = new EventEmitter();
        this._saveSub = Subscription.EMPTY;
        this._nodeEntry = _service.editedNodeEntry;
        this._choicesOriginsSub = _service.choicesOrigins
            .subscribe((/**
         * @param {?} c
         * @return {?}
         */
        (c) => this._choicesOrigins = c || []));
        this._enabled = this._nodeEntry.pipe(map((/**
         * @param {?} n
         * @return {?}
         */
        (n) => n != null)));
        this._initForm();
        this._initVisibilityEdit();
        this._initConditionalBranchEdit();
        this._initFormulaRepsEdit();
        this._initChoicesFilterEdit();
        this._initFormulaEdit();
        this._initForceValueEdit();
        this._initValidationConditionEdit();
        this._initAddValidationCondition();
        this._initRemoveValidationCondition();
        this._initWarningConditionEdit();
        this._initAddWarningCondition();
        this._initRemoveWarningCondition();
        this._initNextSlideConditionEdit();
        this._initTriggerConditionEdit();
        this._initAddTriggerCondition();
        this._initRemoveTriggerCondition();
        this._initSave();
    }
    /**
     * @return {?}
     */
    get fieldSizes() { return this._fieldSizes; }
    /**
     * @return {?}
     */
    get nodeEntry() { return this._nodeEntry; }
    /**
     * @return {?}
     */
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    /**
     * @return {?}
     */
    get enabled() { return this._enabled; }
    /**
     * @return {?}
     */
    get propertiesForm() { return this._propertiesForm; }
    /**
     * @return {?}
     */
    get hasChoices() { return this._hasChoices; }
    /**
     * @return {?}
     */
    get curVisibility() { return this._curVisibility; }
    /**
     * @return {?}
     */
    get curFormulaReps() { return this._curFormulaReps; }
    /**
     * @return {?}
     */
    get curChoicesFilter() { return this._curChoicesFilter; }
    /**
     * @return {?}
     */
    get curForceValue() { return this._curForceValue; }
    /**
     * @return {?}
     */
    get curFormula() { return this._curFormula; }
    /**
     * @return {?}
     */
    get conditionalBranches() { return this._conditionalBranches; }
    /**
     * @return {?}
     */
    get validationConditions() { return this._validationConditions; }
    /**
     * @return {?}
     */
    get warningConditions() { return this._warningConditions; }
    /**
     * @return {?}
     */
    get nextSlideCondition() { return this._nextSlideCondition; }
    /**
     * @return {?}
     */
    get triggerConditions() { return this._triggerConditions; }
    /**
     * @return {?}
     */
    editVisibility() {
        this._editVisibilityEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editConditionalBranch(idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    editFormulaReps() {
        this._editFormulaRepsEvt.emit();
    }
    /**
     * @return {?}
     */
    editChoicesFilter() {
        this._editChoicesFilterEvt.emit();
    }
    /**
     * @return {?}
     */
    editFormula() {
        this._editFormulaEvt.emit();
    }
    /**
     * @return {?}
     */
    editForceValue() {
        this._editForceValueEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    addValidationCondition() {
        this._addValidationConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    addWarningCondition() {
        this._addWarningConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    editNextSlideCondition() {
        this._editNextSlideConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    editTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    }
    /**
     * @return {?}
     */
    addTriggerCondition() {
        this._addTriggerConditionEvt.emit();
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    removeTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    }
    /**
     * @param {?} nodeEntry
     * @return {?}
     */
    isField(nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isNumericField(node) {
        return isField(node) && isNumberField((/** @type {?} */ (node)));
    }
    /**
     * @param {?} node
     * @return {?}
     */
    isFieldWithChoices(node) {
        return isField(node) && isFieldWithChoices((/** @type {?} */ (node)));
    }
    /**
     * @return {?}
     */
    save() {
        this._saveEvt.emit();
    }
    /**
     * @return {?}
     */
    cancel() {
        this._service.cancelNodeEntryEdit();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._choicesOriginsSub.unsubscribe();
        this._visibilitySub.unsubscribe();
        this._formulaRepsSub.unsubscribe();
        this._choicesFilterSub.unsubscribe();
        this._formulaSub.unsubscribe();
        this._forceValueSub.unsubscribe();
        this._validationConditionsSub.unsubscribe();
        this._warningConditionsSub.unsubscribe();
        this._triggerConditionsSub.unsubscribe();
        this._editConditionDialogSub.unsubscribe();
        this._editValidationConditionDialogSub.unsubscribe();
        this._editWarningConditionDialogSub.unsubscribe();
        this._editChoicesFilterSub.unsubscribe();
        this._editConditionalBranchSub.unsubscribe();
        this._editVisibilitySub.unsubscribe();
        this._editFormulaRepsSub.unsubscribe();
        this._editFormulaSub.unsubscribe();
        this._editForceValueSub.unsubscribe();
        this._editValidationConditionSub.unsubscribe();
        this._editWarningConditionSub.unsubscribe();
        this._nextSlideConditionSub.unsubscribe();
        this._addTriggerConditionSub.unsubscribe();
        this._addValidationConditionSub.unsubscribe();
        this._addWarningConditionSub.unsubscribe();
        this._editNextSlideConditionSub.unsubscribe();
        this._editTriggerConditionSub.unsubscribe();
        this._removeTriggerConditionSub.unsubscribe();
        this._removeValidationConditionSub.unsubscribe();
        this._removeWarningConditionSub.unsubscribe();
        this._saveSub.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _initSave() {
        this._saveSub = this._saveEvt.pipe(withLatestFrom(this.propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            /** @type {?} */
            const val = Object.assign(Object.assign({}, fg.value), { conditionalBranches: this._conditionalBranches });
            this._service.saveNodeEntry(val);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initForm() {
        this._propertiesForm = this._nodeEntry.pipe(filter((/**
         * @param {?} n
         * @return {?}
         */
        (n) => n != null)), map((/**
         * @param {?} n
         * @return {?}
         */
        (n) => {
            if (this._visibilitySub != null) {
                this._visibilitySub.unsubscribe();
            }
            if (this._conditionalBranchesSub != null) {
                this._conditionalBranchesSub.unsubscribe();
            }
            n = (/** @type {?} */ (n));
            /** @type {?} */
            const visibility = n.node.visibility != null ?
                n.node.visibility.condition : null;
            /** @type {?} */
            const visibilityOpt = n.node.visibility != null ?
                this._guessVisibilityOpt(n.node.visibility) : null;
            /** @type {?} */
            let controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            /** @type {?} */
            const validators = [];
            if (isRepeatingContainerNode(n.node)) {
                /** @type {?} */
                const rn = (/** @type {?} */ (n.node));
                /** @type {?} */
                const formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (this.isField(n)) {
                /** @type {?} */
                const field = (/** @type {?} */ (n.node));
                /** @type {?} */
                let forceValue = null;
                /** @type {?} */
                let notEmpty = false;
                /** @type {?} */
                let validationConditions = [];
                if (field.validation != null) {
                    if (field.validation.forceValue != null) {
                        forceValue = field.validation.forceValue.condition;
                    }
                    notEmpty = field.validation.notEmpty != null;
                    validationConditions = (field.validation.conditions || [])
                        .map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        return {
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        };
                    }));
                }
                /** @type {?} */
                let notEmptyW = false;
                /** @type {?} */
                let warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || [])
                        .map((/**
                     * @param {?} w
                     * @return {?}
                     */
                    w => {
                        return {
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        };
                    }));
                }
                /** @type {?} */
                const formula = field.formula != null ? field.formula.formula : null;
                controls.description = field.description;
                controls.defaultValue = field.defaultValue;
                controls.size = field.size;
                controls.formula = formula;
                controls.forceValue = forceValue;
                controls.notEmpty = notEmpty;
                controls.validationConditions = [validationConditions, []];
                controls.notEmptyWarning = notEmptyW;
                controls.warningConditions = [warningConditions, []];
                controls.nextSlideCondition = [field.nextSlideCondition];
                this._curForceValue = forceValue;
                this._curFormula = formula;
                this._validationConditions = validationConditions;
                this._warningConditions = warningConditions;
            }
            if (this.isNumericField(n.node)) {
                /** @type {?} */
                const numField = (/** @type {?} */ (n.node));
                /** @type {?} */
                let minValue;
                /** @type {?} */
                let maxValue;
                /** @type {?} */
                let minDigits;
                /** @type {?} */
                let maxDigits;
                if (numField.validation != null) {
                    if (numField.validation.minValue != null) {
                        minValue = (numField.validation.minValue.condition || '').replace('$value >= ', '');
                    }
                    if (numField.validation.maxValue != null) {
                        maxValue = (numField.validation.maxValue.condition || '').replace('$value <= ', '');
                    }
                    if (numField.validation.minDigits != null) {
                        minDigits = (numField.validation.minDigits.condition || '')
                            .replace('$value.toString().length >= ', '');
                    }
                    if (numField.validation.maxDigits != null) {
                        maxDigits = (numField.validation.maxDigits.condition || '')
                            .replace('$value.toString().length <= ', '');
                    }
                }
                controls.minValue = minValue;
                controls.maxValue = maxValue;
                controls.minDigits = minDigits;
                controls.maxDigits = maxDigits;
                validators.push(checkValueLimitsValidity);
                validators.push(checkDigitsValidity);
            }
            if (this.isFieldWithChoices(n.node)) {
                /** @type {?} */
                const fieldWithChoices = (/** @type {?} */ (n.node));
                /** @type {?} */
                let triggerConditions = (fieldWithChoices.triggerConditions || [])
                    .map((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => c.condition));
                controls.choicesOriginRef = ((/** @type {?} */ (fieldWithChoices))).choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula : null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                this._triggerConditions = triggerConditions;
            }
            /** @type {?} */
            const fg = this._fb.group(controls);
            fg.setValidators(validators);
            this._conditionalBranches = n.node.conditionalBranches.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.condition));
            this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;
            this._handleConditionalBranchesChange(fg);
            this._handleVisibilityChange(fg);
            this._handleFormulaRepsChange(fg);
            this._handleChoicesFilterChange(fg);
            this._handleFormulaChange(fg);
            this._handleForceValueChange(fg);
            this._handleValidationCondtionsChange(fg);
            this._handleWarningCondtionsChange(fg);
            this._handleNextSlideConditionChange(fg);
            this._handleTriggerCondtionsChange(fg);
            return fg;
        })), publishReplay(1), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _destroyConditionDialog() {
        if (this._editConditionDialogSub != null) {
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editConditionDialog != null) {
            this._editConditionDialog.close();
            this._editConditionDialog = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _destroyValidationConditionDialog() {
        if (this._editValidationConditionDialogSub != null) {
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editValidationConditionDialog != null) {
            this._editValidationConditionDialog.close();
            this._editValidationConditionDialog = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _destroyWarningConditionDialog() {
        if (this._editWarningConditionDialogSub != null) {
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editWarningConditionDialog != null) {
            this._editWarningConditionDialog.close();
            this._editWarningConditionDialog = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initRemoveTriggerCondition() {
        this._removeTriggerConditionSub = ((/** @type {?} */ (this._removeTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['triggerConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initAddTriggerCondition() {
        this._addTriggerConditionSub = ((/** @type {?} */ (this._addTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['triggerConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initTriggerConditionEdit() {
        this._editTriggerConditionSub = ((/** @type {?} */ (this._editTriggerConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) {
                return;
            }
            this._editConditionDialog = this._dialog
                .open(AjfFbConditionEditorDialog);
            /** @type {?} */
            const cmp = this._editConditionDialog.componentInstance;
            cmp.condition = this._triggerConditions[vcIdx];
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._triggerConditions[vcIdx] = cond;
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initRemoveWarningCondition() {
        this._removeWarningConditionSub = ((/** @type {?} */ (this._removeWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['warningConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initAddWarningCondition() {
        this._addWarningConditionSub = ((/** @type {?} */ (this._addWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['warningConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initWarningConditionEdit() {
        this._editWarningConditionSub = ((/** @type {?} */ (this._editWarningConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyWarningConditionDialog();
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) {
                return;
            }
            this._editWarningConditionDialog = this._dialog
                .open(AjfFbWarningConditionEditorDialog);
            /** @type {?} */
            const cmp = this._editWarningConditionDialog.componentInstance;
            /** @type {?} */
            const w = this._warningConditions[vcIdx];
            cmp.condition = w.condition;
            cmp.warningMessage = w.warningMessage;
            this._editWarningConditionDialogSub = this._editWarningConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._warningConditions[vcIdx] = cond;
                }
                this._editWarningConditionDialogSub.unsubscribe();
                this._editWarningConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initRemoveValidationCondition() {
        this._removeValidationConditionSub = ((/** @type {?} */ (this._removeValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['validationConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initAddValidationCondition() {
        this._addValidationConditionSub = ((/** @type {?} */ (this._addValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['validationConditions'];
            /** @type {?} */
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initValidationConditionEdit() {
        this._editValidationConditionSub = ((/** @type {?} */ (this._editValidationConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyValidationConditionDialog();
            /** @type {?} */
            const vcIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) {
                return;
            }
            this._editValidationConditionDialog = this._dialog
                .open(AjfFbValidationConditionEditorDialog);
            /** @type {?} */
            const cmp = this._editValidationConditionDialog.componentInstance;
            /** @type {?} */
            const v = this._validationConditions[vcIdx];
            cmp.condition = v.condition;
            cmp.errorMessage = v.errorMessage;
            this._editValidationConditionDialogSub = this._editValidationConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._validationConditions[vcIdx] = cond;
                }
                this._editValidationConditionDialogSub.unsubscribe();
                this._editValidationConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initForceValueEdit() {
        this._editForceValueSub = ((/** @type {?} */ (this._editForceValueEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['forceValue'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initNextSlideConditionEdit() {
        this._editNextSlideConditionSub = ((/** @type {?} */ (this._editNextSlideConditionEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['nextSlideCondition'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initFormulaEdit() {
        this._editFormulaSub = ((/** @type {?} */ (this._editFormulaEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['formula'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initFormulaRepsEdit() {
        this._editFormulaRepsSub = ((/** @type {?} */ (this._editFormulaRepsEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['formulaReps'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initChoicesFilterEdit() {
        this._editChoicesFilterSub = ((/** @type {?} */ (this._editChoicesFilterEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['choicesFilter'];
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = ctrl.value;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initConditionalBranchEdit() {
        this._editConditionalBranchSub = ((/** @type {?} */ (this._editConditionalBranchEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const cbIdx = r[0];
            /** @type {?} */
            const fg = r[1];
            if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) {
                return;
            }
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = this._conditionalBranches[cbIdx];
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    this._conditionalBranches[cbIdx] = cond;
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initVisibilityEdit() {
        this._editVisibilitySub = ((/** @type {?} */ (this._editVisibilityEvt)))
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            this._destroyConditionDialog();
            /** @type {?} */
            const fg = r[1];
            if (fg == null) {
                return;
            }
            /** @type {?} */
            const ctrl = fg.controls['visibility'];
            /** @type {?} */
            const condition = ctrl.value;
            this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
            this._editConditionDialog.componentInstance.condition = condition;
            this._editConditionDialogSub = this._editConditionDialog.afterClosed()
                .subscribe((/**
             * @param {?} cond
             * @return {?}
             */
            (cond) => {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                this._editConditionDialogSub.unsubscribe();
                this._editConditionDialogSub = Subscription.EMPTY;
            }));
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleTriggerCondtionsChange(fg) {
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions))))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._triggerConditions = v.triggerConditions;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleWarningCondtionsChange(fg) {
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions))))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._warningConditions = v.warningConditions;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleValidationCondtionsChange(fg) {
        this._validationConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions))))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._validationConditions = v.validationConditions;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleForceValueChange(fg) {
        this._forceValueSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.forceValue === v2.forceValue)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curForceValue = v.forceValue;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleNextSlideConditionChange(fg) {
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._nextSlideCondition = v.nextSlideCondition;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleFormulaChange(fg) {
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.formula === v2.formula)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curFormula = v.formula;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleFormulaRepsChange(fg) {
        this._formulaRepsSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.formulaReps === v2.formulaReps)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curFormulaReps = v.formulaReps;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleChoicesFilterChange(fg) {
        this._choicesFilterSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.choicesFilter === v2.choicesFilter)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this._curChoicesFilter = v.choicesFilter;
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleConditionalBranchesChange(fg) {
        this._conditionalBranchesSub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.conditionalBranchesNum === v2.conditionalBranchesNum)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const cbNum = v.conditionalBranchesNum;
            /** @type {?} */
            const curCbNum = this._conditionalBranches.length;
            if (curCbNum < cbNum) {
                /** @type {?} */
                let newCbs = [];
                for (let i = curCbNum; i < cbNum; i++) {
                    newCbs.push(alwaysCondition().condition);
                }
                this._conditionalBranches = this._conditionalBranches.concat(newCbs);
            }
            else if (curCbNum > cbNum) {
                this._conditionalBranches.splice(0, curCbNum - cbNum);
            }
        }));
    }
    /**
     * @private
     * @param {?} fg
     * @return {?}
     */
    _handleVisibilityChange(fg) {
        this._visibilitySub = fg.valueChanges
            .pipe(distinctUntilChanged((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => v1.visibilityOpt === v2.visibilityOpt)))
            .subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const visibilityOpt = v.visibilityOpt;
            /** @type {?} */
            let newCondition;
            switch (visibilityOpt) {
                case 'always':
                    newCondition = alwaysCondition().condition;
                    break;
                case 'never':
                    newCondition = neverCondition().condition;
                    break;
                default:
                    newCondition = null;
            }
            this._curVisibility = newCondition;
            fg.controls['visibility'].setValue(newCondition);
        }));
    }
    /**
     * @private
     * @param {?} condition
     * @return {?}
     */
    _guessVisibilityOpt(condition) {
        if (condition.condition.localeCompare(alwaysCondition().condition) === 0) {
            return 'always';
        }
        if (condition.condition.localeCompare(neverCondition().condition) === 0) {
            return 'never';
        }
        return 'condition';
    }
}
AjfFbNodeProperties.decorators = [
    { type: Component, args: [{
                selector: 'ajf-fb-node-properties',
                template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<div class=\"ajf-header\">\n  <h3 translate>Properties</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label translate>Visibility</mat-label>\n          <mat-select\n              formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\">\n            <mat-option value=\"always\" translate>Always</mat-option>\n            <mat-option value=\"never\" translate>Never</mat-option>\n            <mat-option value=\"condition\" translate>Condition...</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button (click)=\"editVisibility()\"\n            [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n            mat-raised-button [matTooltip]=\"curVisibility || ''\">\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label translate>Branches</label></div>\n        <div>\n          <mat-slider formControlName=\"conditionalBranchesNum\"\n              thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label translate>Repetitions</label></div>\n          <div>\n            <button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label translate>Min repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"minReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n          <div><label translate>Max repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"maxReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label translate>Field size</mat-label>\n            <mat-select formControlName=\"size\"\n                [placeholder]=\"'Size' | translate\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\">\n                {{ fieldSize.label }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea matInput formControlName=\"description\"\n                [placeholder]=\"'Description' | translate\"></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | translate\">\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Formula</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label translate>Force value</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | translate\">\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Validation</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No conditions</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\">\n            <button (click)=\"editValidationCondition(idx)\"\n                mat-raised-button [matTooltip]=\"validationCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Warnings</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div  *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No warnings</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\">\n            <button (click)=\"editWarningCondition(idx)\"\n                mat-raised-button [matTooltip]=\"warningCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Go to next slide condition</label></div>\n          <div>\n            <button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label translate>Choices origins</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | translate\">\n                <mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.name\">\n                  {{ choicesOrigin.label || choicesOrigin.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label translate>Choices filter</label></div>\n            <div>\n              <button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label translate>Trigger selection</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon>\n            </div>\n            <div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n                class=\"ajf-validation-row ajf-emph\" translate>No trigger condition </div>\n            <div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\">\n              <button (click)=\"editTriggerCondition(idx)\"\n                  mat-raised-button [matTooltip]=\"triggerCondition\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon>\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
            }] }
];
/** @nocollapse */
AjfFbNodeProperties.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog },
    { type: FormBuilder }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._fieldSizes;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._nodeEntry;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._choicesOrigins;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._enabled;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._propertiesForm;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._hasChoices;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curVisibility;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curFormulaReps;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curChoicesFilter;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curForceValue;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._curFormula;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._conditionalBranches;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._validationConditions;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._warningConditions;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._nextSlideCondition;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._triggerConditions;
    /** @type {?} */
    AjfFbNodeProperties.prototype.isRepeatingContainerNode;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._visibilitySub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._conditionalBranchesSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._formulaRepsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._choicesFilterSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._formulaSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._forceValueSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._validationConditionsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._warningConditionsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._nextSlideConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._choicesOriginsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._triggerConditionsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionDialogSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionDialogSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionDialogSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editVisibilityEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editVisibilitySub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionalBranchEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editConditionalBranchSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaRepsEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaRepsSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editChoicesFilterEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editChoicesFilterSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editFormulaSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editForceValueEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editForceValueSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editValidationConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addValidationConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addValidationConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeValidationConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeValidationConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editWarningConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addWarningConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addWarningConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeWarningConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeWarningConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editNextSlideConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editNextSlideConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editTriggerConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._editTriggerConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addTriggerConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._addTriggerConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeTriggerConditionEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._removeTriggerConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._saveEvt;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._saveSub;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    AjfFbNodeProperties.prototype._fb;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUVzQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUNyRSx3QkFBd0IsRUFDekIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9FLE9BQU8sRUFDTCx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFhLGlCQUFpQixFQUMvRSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLFdBQVcsRUFBMEIsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUNMLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQzNFLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUEwQixxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7OztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCOztVQUNyQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPOztVQUN6QixPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPO0lBQy9CLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUksSUFBSSxJQUFJLE9BQU8sR0FBRyxPQUFPLEVBQUU7UUFDM0QsT0FBTztZQUNMLElBQUksRUFBRSxzREFBc0Q7U0FDN0QsQ0FBQztLQUNIO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDOzs7OztBQUVELFNBQVMsd0JBQXdCLENBQUMsQ0FBa0I7O1VBQzVDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVE7O1VBQzNCLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVE7SUFDakMsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxHQUFHLFFBQVEsRUFBRTtRQUMvRCxPQUFPO1lBQ0wsVUFBVSxFQUFFLDRDQUE0QztTQUN6RCxDQUFDO0tBQ0g7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxDQUFrQjs7VUFDdkMsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUzs7VUFDN0IsU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUztJQUNuQyxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEdBQUcsU0FBUyxFQUFFO1FBQ25FLE9BQU87WUFDTCxNQUFNLEVBQUUsOENBQThDO1NBQ3ZELENBQUM7S0FDSDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7OztBQUVELHlDQUdDOzs7SUFGQyx3Q0FBa0I7O0lBQ2xCLDJDQUFxQjs7Ozs7QUFHdkIsc0NBR0M7OztJQUZDLHFDQUFrQjs7SUFDbEIsMENBQXVCOztBQVd6QixNQUFNLE9BQU8sbUJBQW1COzs7Ozs7SUFtSTlCLFlBQ1UsUUFBK0IsRUFDL0IsT0FBa0IsRUFDbEIsR0FBZ0I7UUFGaEIsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUFDL0IsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNsQixRQUFHLEdBQUgsR0FBRyxDQUFhO1FBcklsQixnQkFBVyxHQUFxQztZQUN0RCxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQztZQUNsQyxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQztZQUNoQyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQztZQUNwQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztZQUM5QixFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQztTQUMvQixDQUFDO1FBTU0sb0JBQWUsR0FBNEIsRUFBRSxDQUFDO1FBNkI5Qyx5QkFBb0IsR0FBYSxFQUFFLENBQUM7UUFHcEMsMEJBQXFCLEdBQTBCLEVBQUUsQ0FBQztRQUdsRCx1QkFBa0IsR0FBdUIsRUFBRSxDQUFDO1FBU3BELDZCQUF3Qjs7OztRQUF5RCxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdGLE9BQU8sU0FBUyxJQUFJLElBQUksSUFBSSx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxFQUFBO1FBRU8sbUJBQWMsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNsRCw0QkFBdUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzdDLG9CQUFlLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNyQyxzQkFBaUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLGdCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNqQyxtQkFBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDcEMsNkJBQXdCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QywwQkFBcUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQzNDLDJCQUFzQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDNUMsdUJBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN4QywwQkFBcUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRzNDLDRCQUF1QixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTNELHNDQUFpQyxHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRXJFLG1DQUE4QixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRWxFLHVCQUFrQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ2xFLHVCQUFrQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFeEMsOEJBQXlCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDN0UsOEJBQXlCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUvQyx3QkFBbUIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNuRSx3QkFBbUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRXpDLDBCQUFxQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3JFLDBCQUFxQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFM0Msb0JBQWUsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMvRCxvQkFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFckMsdUJBQWtCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEUsdUJBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUV4QyxnQ0FBMkIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMvRSxnQ0FBMkIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRWpELCtCQUEwQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFFLCtCQUEwQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFaEQsa0NBQTZCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDakYsa0NBQTZCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVuRCw2QkFBd0IsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1RSw2QkFBd0IsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTlDLDRCQUF1QixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3ZFLDRCQUF1QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFN0MsK0JBQTBCLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDOUUsK0JBQTBCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVoRCwrQkFBMEIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMxRSwrQkFBMEIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRWhELDZCQUF3QixHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVFLDZCQUF3QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFOUMsNEJBQXVCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdkUsNEJBQXVCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUU3QywrQkFBMEIsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM5RSwrQkFBMEIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRWhELGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN4RCxhQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU9wQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxjQUFjO2FBQzlDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQXhKRCxJQUFJLFVBQVUsS0FBdUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7OztJQUcvRSxJQUFJLFNBQVMsS0FBaUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7OztJQUd2RixJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFHRCxJQUFJLE9BQU8sS0FBMEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7OztJQUc1RCxJQUFJLGNBQWMsS0FBNEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7OztJQUc1RSxJQUFJLFVBQVUsS0FBMEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7OztJQUdsRSxJQUFJLGFBQWEsS0FBb0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7OztJQUdsRSxJQUFJLGNBQWMsS0FBb0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7OztJQUdwRSxJQUFJLGdCQUFnQixLQUFhLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7OztJQUdqRSxJQUFJLGFBQWEsS0FBb0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7OztJQUdsRSxJQUFJLFVBQVUsS0FBb0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7OztJQUc1RCxJQUFJLG1CQUFtQixLQUFlLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQzs7OztJQUd6RSxJQUFJLG9CQUFvQixLQUE0QixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Ozs7SUFHeEYsSUFBSSxpQkFBaUIsS0FBeUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzs7O0lBRy9FLElBQUksa0JBQWtCLEtBQWEsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOzs7O0lBR3JFLElBQUksaUJBQWlCLEtBQWUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzs7O0lBMkdyRSxjQUFjO1FBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQscUJBQXFCLENBQUMsR0FBVztRQUMvQixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDbkUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELHVCQUF1QixDQUFDLEdBQVc7UUFDakMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3BFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFFRCx5QkFBeUIsQ0FBQyxHQUFXO1FBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNwRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsR0FBVztRQUM5QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDakUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELHNCQUFzQixDQUFDLEdBQVc7UUFDaEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ2pFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxHQUFXO1FBQzlCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNqRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCxtQkFBbUI7UUFDakIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRUQsc0JBQXNCLENBQUMsR0FBVztRQUNoQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDakUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxTQUF1QztRQUM3QyxPQUFPLFNBQVMsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFhO1FBQzFCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxtQkFBQSxJQUFJLEVBQVksQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsSUFBYTtRQUM5QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxtQkFBQSxJQUFJLEVBQVksQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV6QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNwRSxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFvQixFQUFFLEVBQUU7O2tCQUM1QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7a0JBQ1QsR0FBRyxtQ0FBTyxFQUFFLENBQUMsS0FBSyxLQUN0QixtQkFBbUIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEdBQy9DO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLFNBQVM7UUFDZixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUN6QyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUMsRUFDeEIsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxFQUFFO2dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7YUFBRTtZQUN2RSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQUU7WUFDekYsQ0FBQyxHQUFHLG1CQUFBLENBQUMsRUFBQyxDQUFDOztrQkFFRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSTs7a0JBQzlCLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7O2dCQUNoRCxRQUFRLEdBQVE7Z0JBQ2xCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUNuRCxVQUFVLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFDN0Msc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNO2FBQzFEOztrQkFDSyxVQUFVLEdBQWtCLEVBQUU7WUFFcEMsSUFBSSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7O3NCQUM5QixFQUFFLEdBQUcsbUJBQTJCLENBQUMsQ0FBQyxJQUFJLEVBQUE7O3NCQUV0QyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUUxRSxRQUFRLENBQUMsV0FBVyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUQsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUM5QixRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBRTlCLElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO2dCQUVuQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDcEM7WUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7O3NCQUNiLEtBQUssR0FBRyxtQkFBVSxDQUFDLENBQUMsSUFBSSxFQUFBOztvQkFFMUIsVUFBVSxHQUFrQixJQUFJOztvQkFDaEMsUUFBUSxHQUFZLEtBQUs7O29CQUN6QixvQkFBb0IsR0FBMEIsRUFBRTtnQkFDcEQsSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtvQkFDNUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7d0JBQ3ZDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7cUJBQ3BEO29CQUNELFFBQVEsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7b0JBQzdDLG9CQUFvQixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO3lCQUN2RCxHQUFHOzs7O29CQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNQLE9BQU87NEJBQ0wsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTOzRCQUN0QixZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVk7eUJBQzdCLENBQUM7b0JBQ0osQ0FBQyxFQUFDLENBQUM7aUJBQ047O29CQUVHLFNBQVMsR0FBWSxLQUFLOztvQkFDMUIsaUJBQWlCLEdBQXVCLEVBQUU7Z0JBQzlDLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7b0JBQ3pCLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7b0JBQzNDLGlCQUFpQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO3lCQUNqRCxHQUFHOzs7O29CQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNQLE9BQU87NEJBQ0wsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTOzRCQUN0QixjQUFjLEVBQUUsQ0FBQyxDQUFDLGNBQWM7eUJBQ2pDLENBQUM7b0JBQ0osQ0FBQyxFQUFDLENBQUM7aUJBQ047O3NCQUNLLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBRXBFLFFBQVEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztnQkFDekMsUUFBUSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO2dCQUMzQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixRQUFRLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDakMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxRQUFRLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztnQkFDckMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUV6RCxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDO2FBQzdDO1lBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTs7c0JBQ3pCLFFBQVEsR0FBRyxtQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBQTs7b0JBRW5DLFFBQWE7O29CQUNiLFFBQWE7O29CQUNiLFNBQWM7O29CQUNkLFNBQWM7Z0JBQ2xCLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7b0JBQy9CLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO3dCQUN4QyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDckY7b0JBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7d0JBQ3hDLFFBQVEsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNyRjtvQkFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTt3QkFDekMsU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQzs2QkFDeEQsT0FBTyxDQUFDLDhCQUE4QixFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRDtvQkFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTt3QkFDekMsU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQzs2QkFDeEQsT0FBTyxDQUFDLDhCQUE4QixFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRDtpQkFDRjtnQkFFRCxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzdCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUMvQixRQUFRLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFFL0IsVUFBVSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDdEM7WUFFRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7O3NCQUM3QixnQkFBZ0IsR0FBRyxtQkFBMEIsQ0FBQyxDQUFDLElBQUksRUFBQTs7b0JBRXJELGlCQUFpQixHQUFhLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDO3FCQUN6RSxHQUFHOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDO2dCQUUxQixRQUFRLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxtQkFBQSxnQkFBZ0IsRUFBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3ZFLFFBQVEsQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDO29CQUMvRCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hELFFBQVEsQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO2dCQUN4RCxRQUFRLENBQUMsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztnQkFDcEQsUUFBUSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO2dCQUUvQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7YUFDN0M7O2tCQUVLLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDbkMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXJGLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLCtCQUErQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV2QyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsRUFBQyxFQUNGLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFDaEIsUUFBUSxFQUFFLENBQ1gsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sdUJBQXVCO1FBQzdCLElBQUksSUFBSSxDQUFDLHVCQUF1QixJQUFJLElBQUksRUFBRTtZQUN4QyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7U0FDbkQ7UUFDRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLEVBQUU7WUFDckMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7OztJQUVPLGlDQUFpQztRQUN2QyxJQUFJLElBQUksQ0FBQyxpQ0FBaUMsSUFBSSxJQUFJLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQ0FBaUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxJQUFJLENBQUMsOEJBQThCLElBQUksSUFBSSxFQUFFO1lBQy9DLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7Ozs7SUFFTyw4QkFBOEI7UUFDcEMsSUFBSSxJQUFJLENBQUMsOEJBQThCLElBQUksSUFBSSxFQUFFO1lBQy9DLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsOEJBQThCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztTQUMxRDtRQUNELElBQUksSUFBSSxDQUFDLDJCQUEyQixJQUFJLElBQUksRUFBRTtZQUM1QyxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztTQUN6QztJQUNILENBQUM7Ozs7O0lBRU8sMkJBQTJCO1FBQ2pDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLG1CQUFvQixJQUFJLENBQUMsMEJBQTBCLEVBQUEsQ0FBQzthQUNwRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFzQixFQUFFLEVBQUU7O2tCQUM5QixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7a0JBQ1osRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQUUsT0FBTzthQUFFOztrQkFDckIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7O2dCQUN6QyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUNqRCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsbUJBQWtCLElBQUksQ0FBQyx1QkFBdUIsRUFBQSxDQUFDO2FBQzVFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQW9CLEVBQUUsRUFBRTs7a0JBQzVCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUFFLE9BQU87YUFBRTs7a0JBQ3JCLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDOztnQkFDekMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyx5QkFBeUI7UUFDL0IsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsbUJBQW9CLElBQUksQ0FBQyx3QkFBd0IsRUFBQSxDQUFDO2FBQ2hGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQXNCLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzs7a0JBQ3pCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDWixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUFFLE9BQU87YUFBRTtZQUNuRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU87aUJBQ3JDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztrQkFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUI7WUFDdkQsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUU7aUJBQ25FLFNBQVM7Ozs7WUFBQyxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUMxQixJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNwRCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTywyQkFBMkI7UUFDakMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLENBQUMsbUJBQW9CLElBQUksQ0FBQywwQkFBMEIsRUFBQSxDQUFDO2FBQ3BGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQXNCLEVBQUUsRUFBRTs7a0JBQzlCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDWixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUNyQixJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQzs7Z0JBQ3pDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQ2pELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxtQkFBa0IsSUFBSSxDQUFDLHVCQUF1QixFQUFBLENBQUM7YUFDNUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDMUMsU0FBUzs7OztRQUFDLENBQUMsQ0FBb0IsRUFBRSxFQUFFOztrQkFDNUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQUUsT0FBTzthQUFFOztrQkFDckIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7O2dCQUN6QyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8seUJBQXlCO1FBQy9CLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLG1CQUFvQixJQUFJLENBQUMsd0JBQXdCLEVBQUEsQ0FBQzthQUNoRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFzQixFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7O2tCQUNoQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7a0JBQ1osRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7WUFDbkYsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUM1QyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7a0JBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsaUJBQWlCOztrQkFDeEQsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUM7WUFDeEMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQztZQUN0QyxJQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRTtpQkFDakYsU0FBUzs7OztZQUFDLENBQUMsSUFBc0IsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsOEJBQThCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUMzRCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyw4QkFBOEI7UUFDcEMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLENBQUMsbUJBQW9CLElBQUksQ0FBQyw2QkFBNkIsRUFBQSxDQUFDO2FBQzFGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQXNCLEVBQUUsRUFBRTs7a0JBQzlCLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOztrQkFDWixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUNyQixJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQzs7Z0JBQzVDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQ2pELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLDJCQUEyQjtRQUNqQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxtQkFBa0IsSUFBSSxDQUFDLDBCQUEwQixFQUFBLENBQUM7YUFDbEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDMUMsU0FBUzs7OztRQUFDLENBQUMsQ0FBb0IsRUFBRSxFQUFFOztrQkFDNUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQUUsT0FBTzthQUFFOztrQkFDckIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUM7O2dCQUM1QyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sNEJBQTRCO1FBQ2xDLElBQUksQ0FBQywyQkFBMkIsR0FBRyxDQUFDLG1CQUFvQixJQUFJLENBQUMsMkJBQTJCLEVBQUEsQ0FBQzthQUN0RixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFzQixFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7O2tCQUNuQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7a0JBQ1osRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7WUFDdEYsSUFBSSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUMvQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQzs7a0JBQ3hDLEdBQUcsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsaUJBQWlCOztrQkFDM0QsQ0FBQyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7WUFDM0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQztZQUNsQyxJQUFJLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUFDLFdBQVcsRUFBRTtpQkFDdkYsU0FBUzs7OztZQUFDLENBQUMsSUFBeUIsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDMUM7Z0JBQ0QsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLENBQUMsaUNBQWlDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUM5RCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsbUJBQWtCLElBQUksQ0FBQyxrQkFBa0IsRUFBQSxDQUFDO2FBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQW9CLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzs7a0JBQ3pCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUFFLE9BQU87YUFBRTs7a0JBQ3JCLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUN0QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUU7aUJBQ25FLFNBQVM7Ozs7WUFBQyxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUMxQixJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNwRCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTywyQkFBMkI7UUFDakMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLENBQUMsbUJBQWtCLElBQUksQ0FBQywwQkFBMEIsRUFBQSxDQUFDO2FBQ2xGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQW9CLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzs7a0JBQ3pCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUFFLE9BQU87YUFBRTs7a0JBQ3JCLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDO1lBQzlDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRTtpQkFDbkUsU0FBUzs7OztZQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7Z0JBQzFCLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtnQkFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3BELENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsbUJBQWtCLElBQUksQ0FBQyxlQUFlLEVBQUEsQ0FBQzthQUM1RCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFvQixFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7O2tCQUN6QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUNyQixJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25FLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFO2lCQUNuRSxTQUFTOzs7O1lBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sb0JBQW9CO1FBQzFCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLG1CQUFrQixJQUFJLENBQUMsbUJBQW1CLEVBQUEsQ0FBQzthQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFvQixFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7O2tCQUN6QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUNyQixJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDdkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25FLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFO2lCQUNuRSxTQUFTOzs7O1lBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sc0JBQXNCO1FBQzVCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLG1CQUFrQixJQUFJLENBQUMscUJBQXFCLEVBQUEsQ0FBQzthQUN4RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFvQixFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7O2tCQUN6QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7O2tCQUNyQixJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDekMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25FLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxFQUFFO2lCQUNuRSxTQUFTOzs7O1lBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDMUIsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JCO2dCQUNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sMEJBQTBCO1FBQ2hDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLG1CQUFvQixJQUFJLENBQUMseUJBQXlCLEVBQUEsQ0FBQzthQUNsRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUMxQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFzQixFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7O2tCQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7a0JBQ1osRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtnQkFBRSxPQUFPO2FBQUU7WUFDckYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekYsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUU7aUJBQ25FLFNBQVM7Ozs7WUFBQyxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUMxQixJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDekM7Z0JBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNwRCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsbUJBQWtCLElBQUksQ0FBQyxrQkFBa0IsRUFBQSxDQUFDO2FBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzFDLFNBQVM7Ozs7UUFBQyxDQUFDLENBQW9CLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzs7a0JBQ3pCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUFFLE9BQU87YUFBRTs7a0JBQ3JCLElBQUksR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQzs7a0JBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSztZQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNsRSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRTtpQkFDbkUsU0FBUzs7OztZQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7Z0JBQzFCLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO29CQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtnQkFDRCxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3BELENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyw2QkFBNkIsQ0FBQyxFQUFhO1FBQ2pELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsWUFBWTthQUN6QyxJQUFJLENBQUMsb0JBQW9COzs7OztRQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDO2FBQ2hGLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFDaEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyw2QkFBNkIsQ0FBQyxFQUFhO1FBQ2pELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsWUFBWTthQUN6QyxJQUFJLENBQUMsb0JBQW9COzs7OztRQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDO2FBQ2hGLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFDaEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxnQ0FBZ0MsQ0FBQyxFQUFhO1FBQ3BELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxFQUFFLENBQUMsWUFBWTthQUM1QyxJQUFJLENBQUMsb0JBQW9COzs7OztRQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBQyxDQUFDO2FBQ3RGLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUM7UUFDdEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyx1QkFBdUIsQ0FBQyxFQUFhO1FBQzNDLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVk7YUFDbEMsSUFBSSxDQUFDLG9CQUFvQjs7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLFVBQVUsRUFBQyxDQUFDO2FBQ3ZFLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUNyQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLCtCQUErQixDQUFDLEVBQWE7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsWUFBWTthQUMvQixJQUFJLENBQUMsb0JBQW9COzs7OztRQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLGtCQUFrQixLQUFLLEVBQUUsQ0FBQyxrQkFBa0IsRUFBQyxDQUFDO2FBQ3ZGLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUM7UUFDbEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxFQUFhO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVk7YUFDL0IsSUFBSSxDQUFDLG9CQUFvQjs7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBQyxDQUFDO2FBQ2pFLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLHdCQUF3QixDQUFDLEVBQWE7UUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsWUFBWTthQUNuQyxJQUFJLENBQUMsb0JBQW9COzs7OztRQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFDLENBQUM7YUFDekUsU0FBUzs7OztRQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sMEJBQTBCLENBQUMsRUFBYTtRQUM5QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLFlBQVk7YUFDckMsSUFBSSxDQUFDLG9CQUFvQjs7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEtBQUssRUFBRSxDQUFDLGFBQWEsRUFBQyxDQUFDO2FBQzdFLFNBQVM7Ozs7UUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQzNDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sZ0NBQWdDLENBQUMsRUFBYTtRQUNwRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDLFlBQVk7YUFDM0MsSUFBSSxDQUFDLG9CQUFvQjs7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUNsQyxFQUFFLENBQUMsc0JBQXNCLEtBQUssRUFBRSxDQUFDLHNCQUFzQixFQUFDLENBQUM7YUFDNUQsU0FBUzs7OztRQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7O2tCQUNkLEtBQUssR0FBVyxDQUFDLENBQUMsc0JBQXNCOztrQkFDeEMsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO1lBQ2pELElBQUksUUFBUSxHQUFHLEtBQUssRUFBRTs7b0JBQ2hCLE1BQU0sR0FBYSxFQUFFO2dCQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLFFBQVEsRUFBRyxDQUFDLEdBQUcsS0FBSyxFQUFHLENBQUMsRUFBRSxFQUFFO29CQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMxQztnQkFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN0RTtpQkFBTSxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQzthQUN2RDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sdUJBQXVCLENBQUMsRUFBYTtRQUMzQyxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxZQUFZO2FBQ2xDLElBQUksQ0FBQyxvQkFBb0I7Ozs7O1FBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUMsQ0FBQzthQUM3RSxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7a0JBQ1QsYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhOztnQkFDakMsWUFBMkI7WUFDL0IsUUFBUSxhQUFhLEVBQUU7Z0JBQ3JCLEtBQUssUUFBUTtvQkFDWCxZQUFZLEdBQUcsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUMzQyxNQUFNO2dCQUNSLEtBQUssT0FBTztvQkFDVixZQUFZLEdBQUcsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUMxQyxNQUFNO2dCQUNSO29CQUNBLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztZQUNuQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLG1CQUFtQixDQUFDLFNBQXVCO1FBQ2pELElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hFLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkUsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7WUF6NUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQywwd1dBQW1DO2dCQUVuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBdkRnQyxxQkFBcUI7WUFQOUMsU0FBUztZQURRLFdBQVc7Ozs7Ozs7SUFpRWxDLDBDQU1FOzs7OztJQUdGLHlDQUErRDs7Ozs7SUFHL0QsOENBQXNEOzs7OztJQUt0RCx1Q0FBc0M7Ozs7O0lBR3RDLDhDQUErQzs7Ozs7SUFHL0MsMENBQXlDOzs7OztJQUd6Qyw2Q0FBc0M7Ozs7O0lBR3RDLDhDQUF1Qzs7Ozs7SUFHdkMsZ0RBQWtDOzs7OztJQUdsQyw2Q0FBc0M7Ozs7O0lBR3RDLDBDQUFtQzs7Ozs7SUFHbkMsbURBQTRDOzs7OztJQUc1QyxvREFBMEQ7Ozs7O0lBRzFELGlEQUFvRDs7Ozs7SUFHcEQsa0RBQW9DOzs7OztJQUdwQyxpREFBcUM7O0lBR3JDLHVEQUVDOzs7OztJQUVELDZDQUEwRDs7Ozs7SUFDMUQsc0RBQXFEOzs7OztJQUNyRCw4Q0FBNkM7Ozs7O0lBQzdDLGdEQUErQzs7Ozs7SUFDL0MsMENBQXlDOzs7OztJQUN6Qyw2Q0FBNEM7Ozs7O0lBQzVDLHVEQUFzRDs7Ozs7SUFDdEQsb0RBQW1EOzs7OztJQUNuRCxxREFBb0Q7Ozs7O0lBQ3BELGlEQUFnRDs7Ozs7SUFDaEQsb0RBQW1EOzs7OztJQUVuRCxtREFBOEU7Ozs7O0lBQzlFLHNEQUFtRTs7Ozs7SUFDbkUsNkRBQWtHOzs7OztJQUNsRyxnRUFBNkU7Ozs7O0lBQzdFLDBEQUE0Rjs7Ozs7SUFDNUYsNkRBQTBFOzs7OztJQUUxRSxpREFBMEU7Ozs7O0lBQzFFLGlEQUFnRDs7Ozs7SUFFaEQsd0RBQXFGOzs7OztJQUNyRix3REFBdUQ7Ozs7O0lBRXZELGtEQUEyRTs7Ozs7SUFDM0Usa0RBQWlEOzs7OztJQUVqRCxvREFBNkU7Ozs7O0lBQzdFLG9EQUFtRDs7Ozs7SUFFbkQsOENBQXVFOzs7OztJQUN2RSw4Q0FBNkM7Ozs7O0lBRTdDLGlEQUEwRTs7Ozs7SUFDMUUsaURBQWdEOzs7OztJQUVoRCwwREFBdUY7Ozs7O0lBQ3ZGLDBEQUF5RDs7Ozs7SUFFekQseURBQWtGOzs7OztJQUNsRix5REFBd0Q7Ozs7O0lBRXhELDREQUF5Rjs7Ozs7SUFDekYsNERBQTJEOzs7OztJQUUzRCx1REFBb0Y7Ozs7O0lBQ3BGLHVEQUFzRDs7Ozs7SUFFdEQsc0RBQStFOzs7OztJQUMvRSxzREFBcUQ7Ozs7O0lBRXJELHlEQUFzRjs7Ozs7SUFDdEYseURBQXdEOzs7OztJQUV4RCx5REFBa0Y7Ozs7O0lBQ2xGLHlEQUF3RDs7Ozs7SUFFeEQsdURBQW9GOzs7OztJQUNwRix1REFBc0Q7Ozs7O0lBRXRELHNEQUErRTs7Ozs7SUFDL0Usc0RBQXFEOzs7OztJQUVyRCx5REFBc0Y7Ozs7O0lBQ3RGLHlEQUF3RDs7Ozs7SUFFeEQsdUNBQWdFOzs7OztJQUNoRSx1Q0FBc0M7Ozs7O0lBR3BDLHVDQUF1Qzs7Ozs7SUFDdkMsc0NBQTBCOzs7OztJQUMxQixrQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNob2ljZXNPcmlnaW4sIEFqZkZpZWxkLCBBamZGaWVsZFdpdGhDaG9pY2VzLCBBamZOb2RlLCBBamZOdW1iZXJGaWVsZCxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSwgaXNGaWVsZCwgaXNGaWVsZFdpdGhDaG9pY2VzLCBpc051bWJlckZpZWxkLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIG5ldmVyQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi93YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcblxuXG5mdW5jdGlvbiBjaGVja1JlcHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwge1xuICBjb25zdCBtaW5SZXBzID0gYy52YWx1ZS5taW5SZXBzO1xuICBjb25zdCBtYXhSZXBzID0gYy52YWx1ZS5tYXhSZXBzO1xuICBpZiAobWluUmVwcyAhPSBudWxsICYmIG1heFJlcHMgIT0gbnVsbCAmJiBtaW5SZXBzID4gbWF4UmVwcykge1xuICAgIHJldHVybiB7XG4gICAgICByZXBzOiAnTWluIHJlcGV0aW9ucyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCByZXBldGl0aW9ucydcbiAgICB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgY29uc3QgbWluVmFsdWUgPSBjLnZhbHVlLm1pblZhbHVlO1xuICBjb25zdCBtYXhWYWx1ZSA9IGMudmFsdWUubWF4VmFsdWU7XG4gIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIG1heFZhbHVlICE9IG51bGwgJiYgbWluVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZUxpbWl0OiAnTWluIHZhbHVlIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IHZhbHVlJ1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlnaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgY29uc3QgbWluRGlnaXRzID0gYy52YWx1ZS5taW5EaWdpdHM7XG4gIGNvbnN0IG1heERpZ2l0cyA9IGMudmFsdWUubWF4RGlnaXRzO1xuICBpZiAobWluRGlnaXRzICE9IG51bGwgJiYgbWF4RGlnaXRzICE9IG51bGwgJiYgbWluRGlnaXRzID4gbWF4RGlnaXRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpZ2l0czogJ01pbiBkaWdpdHMgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggZGlnaXRzJ1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvbkNvbmRpdGlvbiB7XG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYXJuaW5nQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1wcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1wcm9wZXJ0aWVzLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVQcm9wZXJ0aWVzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZmllbGRTaXplczoge2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9W10gPSBbXG4gICAge2xhYmVsOiAnTm9ybWFsJywgdmFsdWU6ICdub3JtYWwnfSxcbiAgICB7bGFiZWw6ICdTbWFsbCcsIHZhbHVlOiAnc21hbGwnfSxcbiAgICB7bGFiZWw6ICdTbWFsbGVyJywgdmFsdWU6ICdzbWFsbGVyJ30sXG4gICAge2xhYmVsOiAnVGlueScsIHZhbHVlOiAndGlueSd9LFxuICAgIHtsYWJlbDogJ01pbmknLCB2YWx1ZTogJ21pbmknfVxuICBdO1xuICBnZXQgZmllbGRTaXplcygpOiB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ31bXSB7IHJldHVybiB0aGlzLl9maWVsZFNpemVzOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJ5OiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD47XG4gIGdldCBub2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHsgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTsgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9IFtdO1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBlbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4geyByZXR1cm4gdGhpcy5fZW5hYmxlZDsgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnRpZXNGb3JtOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD47XG4gIGdldCBwcm9wZXJ0aWVzRm9ybSgpOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD4geyByZXR1cm4gdGhpcy5fcHJvcGVydGllc0Zvcm07IH1cblxuICBwcml2YXRlIF9oYXNDaG9pY2VzOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgaGFzQ2hvaWNlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHsgcmV0dXJuIHRoaXMuX2hhc0Nob2ljZXM7IH1cblxuICBwcml2YXRlIF9jdXJWaXNpYmlsaXR5OiBzdHJpbmcgfCBudWxsO1xuICBnZXQgY3VyVmlzaWJpbGl0eSgpOiBzdHJpbmcgfCBudWxsIHsgcmV0dXJuIHRoaXMuX2N1clZpc2liaWxpdHk7IH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhUmVwczogc3RyaW5nIHwgbnVsbDtcbiAgZ2V0IGN1ckZvcm11bGFSZXBzKCk6IHN0cmluZyB8IG51bGwgeyByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYVJlcHM7IH1cblxuICBwcml2YXRlIF9jdXJDaG9pY2VzRmlsdGVyOiBzdHJpbmc7XG4gIGdldCBjdXJDaG9pY2VzRmlsdGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyOyB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9yY2VWYWx1ZTogc3RyaW5nIHwgbnVsbDtcbiAgZ2V0IGN1ckZvcmNlVmFsdWUoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLl9jdXJGb3JjZVZhbHVlOyB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9ybXVsYTogc3RyaW5nIHwgbnVsbDtcbiAgZ2V0IGN1ckZvcm11bGEoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLl9jdXJGb3JtdWxhOyB9XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlczogc3RyaW5nW10gPSBbXTtcbiAgZ2V0IGNvbmRpdGlvbmFsQnJhbmNoZXMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlczsgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHZhbGlkYXRpb25Db25kaXRpb25zKCk6IFZhbGlkYXRpb25Db25kaXRpb25bXSB7IHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uczsgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHdhcm5pbmdDb25kaXRpb25zKCk6IFdhcm5pbmdDb25kaXRpb25bXSB7IHJldHVybiB0aGlzLl93YXJuaW5nQ29uZGl0aW9uczsgfVxuXG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbjogc3RyaW5nO1xuICBnZXQgbmV4dFNsaWRlQ29uZGl0aW9uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb247IH1cblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW107XG4gIGdldCB0cmlnZ2VyQ29uZGl0aW9ucygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uczsgfVxuXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZTogKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbCkgPT4gYm9vbGVhbiA9IChub2RlRW50cnkpID0+IHtcbiAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVFbnRyeS5ub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVJlcHNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNGaWx0ZXJTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm11bGFTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZvcmNlVmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF93YXJuaW5nQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nPiB8IG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9zYXZlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3NhdmVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlclxuICApIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBfc2VydmljZS5lZGl0ZWROb2RlRW50cnk7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnNTdWIgPSBfc2VydmljZS5jaG9pY2VzT3JpZ2luc1xuICAgICAgLnN1YnNjcmliZSgoYykgPT4gdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBjIHx8IFtdKTtcblxuICAgIHRoaXMuX2VuYWJsZWQgPSB0aGlzLl9ub2RlRW50cnkucGlwZShtYXAoKG4pID0+IG4gIT0gbnVsbCkpO1xuXG4gICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICB0aGlzLl9pbml0VmlzaWJpbGl0eUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFSZXBzRWRpdCgpO1xuICAgIHRoaXMuX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JjZVZhbHVlRWRpdCgpO1xuICAgIHRoaXMuX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFNhdmUoKTtcbiAgfVxuXG4gIGVkaXRWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb25hbEJyYW5jaChpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdEZvcm11bGFSZXBzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc0V2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc0ZpbHRlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9yY2VWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdFdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVXYXJuaW5nQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXROZXh0U2xpZGVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVRyaWdnZXJDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgaXNGaWVsZChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNGaWVsZChub2RlRW50cnkubm9kZSk7XG4gIH1cblxuICBpc051bWVyaWNGaWVsZChub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNOdW1iZXJGaWVsZChub2RlIGFzIEFqZkZpZWxkKTtcbiAgfVxuXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUgYXMgQWpmRmllbGQpO1xuICB9XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmNhbmNlbE5vZGVFbnRyeUVkaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fc2F2ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnQucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnByb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLFxuICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXM6IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICBmaWx0ZXIoKG4pID0+IG4gIT0gbnVsbCksXG4gICAgICBtYXAoKG4pID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlTdWIgIT0gbnVsbCkgeyB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgIT0gbnVsbCkgeyB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgbiA9IG4hO1xuXG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/XG4gICAgICAgICAgdGhpcy5fZ3Vlc3NWaXNpYmlsaXR5T3B0KG4ubm9kZS52aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICAgIGxldCBjb250cm9sczogYW55ID0ge1xuICAgICAgICAgIG5hbWU6IFtuLm5vZGUubmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgbGFiZWw6IG4ubm9kZS5sYWJlbCxcbiAgICAgICAgICB2aXNpYmlsaXR5T3B0OiBbdmlzaWJpbGl0eU9wdCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgdmlzaWJpbGl0eTogW3Zpc2liaWxpdHksIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXNOdW06IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XG5cbiAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShuLm5vZGUpKSB7XG4gICAgICAgICAgY29uc3Qgcm4gPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5uLm5vZGU7XG5cbiAgICAgICAgICBjb25zdCBmb3JtdWxhUmVwcyA9IHJuLmZvcm11bGFSZXBzICE9IG51bGwgPyBybi5mb3JtdWxhUmVwcy5mb3JtdWxhIDogbnVsbDtcblxuICAgICAgICAgIGNvbnRyb2xzLmZvcm11bGFSZXBzID0gW2Zvcm11bGFSZXBzLCBWYWxpZGF0b3JzLnJlcXVpcmVkXTtcbiAgICAgICAgICBjb250cm9scy5taW5SZXBzID0gcm4ubWluUmVwcztcbiAgICAgICAgICBjb250cm9scy5tYXhSZXBzID0gcm4ubWF4UmVwcztcblxuICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gZm9ybXVsYVJlcHM7XG5cbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tSZXBzVmFsaWRpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZChuKSkge1xuICAgICAgICAgIGNvbnN0IGZpZWxkID0gPEFqZkZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgIGxldCBmb3JjZVZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICBsZXQgbm90RW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICBsZXQgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IFZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uLmZvcmNlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmb3JjZVZhbHVlID0gZmllbGQudmFsaWRhdGlvbi5mb3JjZVZhbHVlLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdEVtcHR5ID0gZmllbGQudmFsaWRhdGlvbi5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSAoZmllbGQudmFsaWRhdGlvbi5jb25kaXRpb25zIHx8IFtdKVxuICAgICAgICAgICAgICAubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBjb25kaXRpb246IGMuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBub3RFbXB0eVc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgIGlmIChmaWVsZC53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vdEVtcHR5VyA9IGZpZWxkLndhcm5pbmcubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgIHdhcm5pbmdDb25kaXRpb25zID0gKGZpZWxkLndhcm5pbmcuY29uZGl0aW9ucyB8fCBbXSlcbiAgICAgICAgICAgICAgLm1hcCh3ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiB3LmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGZvcm11bGEgPSBmaWVsZC5mb3JtdWxhICE9IG51bGwgPyBmaWVsZC5mb3JtdWxhLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgY29udHJvbHMuZGVzY3JpcHRpb24gPSBmaWVsZC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICBjb250cm9scy5kZWZhdWx0VmFsdWUgPSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgY29udHJvbHMuc2l6ZSA9IGZpZWxkLnNpemU7XG4gICAgICAgICAgY29udHJvbHMuZm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgY29udHJvbHMuZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgY29udHJvbHMubm90RW1wdHkgPSBub3RFbXB0eTtcbiAgICAgICAgICBjb250cm9scy52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IFt2YWxpZGF0aW9uQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5V2FybmluZyA9IG5vdEVtcHR5VztcbiAgICAgICAgICBjb250cm9scy53YXJuaW5nQ29uZGl0aW9ucyA9IFt3YXJuaW5nQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgIGNvbnRyb2xzLm5leHRTbGlkZUNvbmRpdGlvbiA9IFtmaWVsZC5uZXh0U2xpZGVDb25kaXRpb25dO1xuXG4gICAgICAgICAgdGhpcy5fY3VyRm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHdhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljRmllbGQobi5ub2RlKSkge1xuICAgICAgICAgIGNvbnN0IG51bUZpZWxkID0gPEFqZk51bWJlckZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgIGxldCBtaW5WYWx1ZTogYW55O1xuICAgICAgICAgIGxldCBtYXhWYWx1ZTogYW55O1xuICAgICAgICAgIGxldCBtaW5EaWdpdHM6IGFueTtcbiAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBhbnk7XG4gICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWluVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtaW5WYWx1ZSA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1pblZhbHVlLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZSgnJHZhbHVlID49ICcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1heFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbWF4VmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhWYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA8PSAnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtaW5EaWdpdHMgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMuY29uZGl0aW9uIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCckdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbWF4RGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzLmNvbmRpdGlvbiB8fCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9ICcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250cm9scy5taW5WYWx1ZSA9IG1pblZhbHVlO1xuICAgICAgICAgIGNvbnRyb2xzLm1heFZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgY29udHJvbHMubWluRGlnaXRzID0gbWluRGlnaXRzO1xuICAgICAgICAgIGNvbnRyb2xzLm1heERpZ2l0cyA9IG1heERpZ2l0cztcblxuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkpO1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja0RpZ2l0c1ZhbGlkaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRXaXRoQ2hvaWNlcyhuLm5vZGUpKSB7XG4gICAgICAgICAgY29uc3QgZmllbGRXaXRoQ2hvaWNlcyA9IDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+bi5ub2RlO1xuXG4gICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25zOiBzdHJpbmdbXSA9IChmaWVsZFdpdGhDaG9pY2VzLnRyaWdnZXJDb25kaXRpb25zIHx8IFtdKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4gYy5jb25kaXRpb24pO1xuXG4gICAgICAgICAgY29udHJvbHMuY2hvaWNlc09yaWdpblJlZiA9IChmaWVsZFdpdGhDaG9pY2VzIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICBjb250cm9scy5jaG9pY2VzRmlsdGVyID0gZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyICE9IG51bGwgP1xuICAgICAgICAgICAgZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyLmZvcm11bGEgOiBudWxsO1xuICAgICAgICAgIGNvbnRyb2xzLmZvcmNlRXhwYW5kZWQgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgY29udHJvbHMuZm9yY2VOYXJyb3cgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlTmFycm93O1xuICAgICAgICAgIGNvbnRyb2xzLnRyaWdnZXJDb25kaXRpb25zID0gdHJpZ2dlckNvbmRpdGlvbnM7XG5cbiAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mYi5ncm91cChjb250cm9scyk7XG4gICAgICAgIGZnLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG5cbiAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChjID0+IGMuY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYUNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU5leHRTbGlkZUNvbmRpdGlvbkNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmcpO1xuXG4gICAgICAgIHJldHVybiBmZztcbiAgICAgIH0pLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3RyaWdnZXJDb25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2Y3MucHVzaCgnJyk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2dcbiAgICAgICAgICAub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgaWYgKGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZ1xuICAgICAgICAgIC5vcGVuKEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICBjb25zdCB3ID0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICBjbXAuY29uZGl0aW9uID0gdy5jb25kaXRpb247XG4gICAgICAgIGNtcC53YXJuaW5nTWVzc2FnZSA9IHcud2FybmluZ01lc3NhZ2U7XG4gICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IFdhcm5pbmdDb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2YWxpZGF0aW9uQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgaWYgKGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nXG4gICAgICAgICAgLm9wZW4oQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB2LmNvbmRpdGlvbjtcbiAgICAgICAgY21wLmVycm9yTWVzc2FnZSA9IHYuZXJyb3JNZXNzYWdlO1xuICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBWYWxpZGF0aW9uQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JjZVZhbHVlRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JjZVZhbHVlJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ25leHRTbGlkZUNvbmRpdGlvbiddO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9ybXVsYUV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFSZXBzRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNTdWIgPSAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGFSZXBzJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNGaWx0ZXJFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Nob2ljZXNGaWx0ZXInXTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBjYklkeCA9IHJbMF07XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgaWYgKGNiSWR4IDwgMCB8fCBjYklkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaXNpYmlsaXR5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0VmlzaWJpbGl0eUV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J107XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT5cbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodjEudHJpZ2dlckNvbmRpdGlvbnMpID09PSBKU09OLnN0cmluZ2lmeSh2Mi50cmlnZ2VyQ29uZGl0aW9ucykpKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zID0gdi50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHYxLndhcm5pbmdDb25kaXRpb25zKSA9PT0gSlNPTi5zdHJpbmdpZnkodjIud2FybmluZ0NvbmRpdGlvbnMpKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHYud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZhbGlkYXRpb25Db25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PlxuICAgICAgICBKU09OLnN0cmluZ2lmeSh2MS52YWxpZGF0aW9uQ29uZGl0aW9ucykgPT09IEpTT04uc3RyaW5naWZ5KHYyLnZhbGlkYXRpb25Db25kaXRpb25zKSkpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2LnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JjZVZhbHVlID09PSB2Mi5mb3JjZVZhbHVlKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gdi5mb3JjZVZhbHVlO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9ybXVsYSA9PT0gdjIuZm9ybXVsYSkpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IHYuZm9ybXVsYTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhUmVwcyA9PT0gdjIuZm9ybXVsYVJlcHMpKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gdi5mb3JtdWxhUmVwcztcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuY2hvaWNlc0ZpbHRlciA9PT0gdjIuY2hvaWNlc0ZpbHRlcikpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlciA9IHYuY2hvaWNlc0ZpbHRlcjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ29uZGl0aW9uYWxCcmFuY2hlc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT5cbiAgICAgICAgICB2MS5jb25kaXRpb25hbEJyYW5jaGVzTnVtID09PSB2Mi5jb25kaXRpb25hbEJyYW5jaGVzTnVtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjYk51bTogbnVtYmVyID0gdi5jb25kaXRpb25hbEJyYW5jaGVzTnVtO1xuICAgICAgICBjb25zdCBjdXJDYk51bSA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICBpZiAoY3VyQ2JOdW0gPCBjYk51bSkge1xuICAgICAgICAgIGxldCBuZXdDYnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGN1ckNiTnVtIDsgaSA8IGNiTnVtIDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdDYnMucHVzaChhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5jb25jYXQobmV3Q2JzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJDYk51bSA+IGNiTnVtKSB7XG4gICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5zcGxpY2UoMCwgY3VyQ2JOdW0gLSBjYk51bSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEudmlzaWJpbGl0eU9wdCA9PT0gdjIudmlzaWJpbGl0eU9wdCkpXG4gICAgICAuc3Vic2NyaWJlKCh2KSA9PiB7XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlPcHQgPSB2LnZpc2liaWxpdHlPcHQ7XG4gICAgICAgIGxldCBuZXdDb25kaXRpb246IHN0cmluZyB8IG51bGw7XG4gICAgICAgIHN3aXRjaCAodmlzaWJpbGl0eU9wdCkge1xuICAgICAgICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduZXZlcic6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV3Q29uZGl0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbmV3Q29uZGl0aW9uO1xuICAgICAgICBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddLnNldFZhbHVlKG5ld0NvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2d1ZXNzVmlzaWJpbGl0eU9wdChjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHN0cmluZyB7XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2Fsd2F5cyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb24uY29uZGl0aW9uLmxvY2FsZUNvbXBhcmUobmV2ZXJDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ25ldmVyJztcbiAgICB9XG4gICAgcmV0dXJuICdjb25kaXRpb24nO1xuICB9XG59XG4iXX0=