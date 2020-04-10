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
        return { reps: 'Min repetions cannot be greater than max repetitions' };
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
        return { valueLimit: 'Min value cannot be greater than max value' };
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
        return { digits: 'Min digits cannot be greater than max digits' };
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
            { label: 'Normal', value: 'normal' }, { label: 'Small', value: 'small' },
            { label: 'Smaller', value: 'smaller' }, { label: 'Tiny', value: 'tiny' },
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
        this._choicesOriginsSub =
            _service.choicesOrigins.subscribe((/**
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
    get fieldSizes() {
        return this._fieldSizes;
    }
    /**
     * @return {?}
     */
    get nodeEntry() {
        return this._nodeEntry;
    }
    /**
     * @return {?}
     */
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    /**
     * @return {?}
     */
    get enabled() {
        return this._enabled;
    }
    /**
     * @return {?}
     */
    get propertiesForm() {
        return this._propertiesForm;
    }
    /**
     * @return {?}
     */
    get hasChoices() {
        return this._hasChoices;
    }
    /**
     * @return {?}
     */
    get curVisibility() {
        return this._curVisibility;
    }
    /**
     * @return {?}
     */
    get curFormulaReps() {
        return this._curFormulaReps;
    }
    /**
     * @return {?}
     */
    get curChoicesFilter() {
        return this._curChoicesFilter;
    }
    /**
     * @return {?}
     */
    get curForceValue() {
        return this._curForceValue;
    }
    /**
     * @return {?}
     */
    get curFormula() {
        return this._curFormula;
    }
    /**
     * @return {?}
     */
    get conditionalBranches() {
        return this._conditionalBranches;
    }
    /**
     * @return {?}
     */
    get validationConditions() {
        return this._validationConditions;
    }
    /**
     * @return {?}
     */
    get warningConditions() {
        return this._warningConditions;
    }
    /**
     * @return {?}
     */
    get nextSlideCondition() {
        return this._nextSlideCondition;
    }
    /**
     * @return {?}
     */
    get triggerConditions() {
        return this._triggerConditions;
    }
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
            const visibility = n.node.visibility != null ? n.node.visibility.condition : null;
            /** @type {?} */
            const visibilityOpt = n.node.visibility != null ? this._guessVisibilityOpt(n.node.visibility) : null;
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
                    validationConditions = (field.validation.conditions || []).map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => {
                        return { condition: c.condition, errorMessage: c.errorMessage };
                    }));
                }
                /** @type {?} */
                let notEmptyW = false;
                /** @type {?} */
                let warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || []).map((/**
                     * @param {?} w
                     * @return {?}
                     */
                    w => {
                        return { condition: w.condition, warningMessage: w.warningMessage };
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
                        minDigits = (numField.validation.minDigits.condition ||
                            '').replace('$value.toString().length >= ', '');
                    }
                    if (numField.validation.maxDigits != null) {
                        maxDigits = (numField.validation.maxDigits.condition ||
                            '').replace('$value.toString().length <= ', '');
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
                let triggerConditions = (fieldWithChoices.triggerConditions || []).map((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => c.condition));
                controls.choicesOriginRef = ((/** @type {?} */ (fieldWithChoices))).choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula :
                    null;
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
        this._editTriggerConditionSub =
            ((/** @type {?} */ (this._editTriggerConditionEvt)))
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
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                /** @type {?} */
                const cmp = this._editConditionDialog.componentInstance;
                cmp.condition = this._triggerConditions[vcIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editWarningConditionSub =
            ((/** @type {?} */ (this._editWarningConditionEvt)))
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
                this._editWarningConditionDialog =
                    this._dialog.open(AjfFbWarningConditionEditorDialog);
                /** @type {?} */
                const cmp = this._editWarningConditionDialog.componentInstance;
                /** @type {?} */
                const w = this._warningConditions[vcIdx];
                cmp.condition = w.condition;
                cmp.warningMessage = w.warningMessage;
                this._editWarningConditionDialogSub =
                    this._editWarningConditionDialog.afterClosed().subscribe((/**
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
        this._editValidationConditionSub =
            ((/** @type {?} */ (this._editValidationConditionEvt)))
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
                this._editValidationConditionDialog =
                    this._dialog.open(AjfFbValidationConditionEditorDialog);
                /** @type {?} */
                const cmp = this._editValidationConditionDialog.componentInstance;
                /** @type {?} */
                const v = this._validationConditions[vcIdx];
                cmp.condition = v.condition;
                cmp.errorMessage = v.errorMessage;
                this._editValidationConditionDialogSub =
                    this._editValidationConditionDialog.afterClosed().subscribe((/**
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
        this._editForceValueSub =
            ((/** @type {?} */ (this._editForceValueEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editNextSlideConditionSub =
            ((/** @type {?} */ (this._editNextSlideConditionEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editFormulaSub =
            ((/** @type {?} */ (this._editFormulaEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editFormulaRepsSub =
            ((/** @type {?} */ (this._editFormulaRepsEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editChoicesFilterSub =
            ((/** @type {?} */ (this._editChoicesFilterEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editConditionalBranchSub =
            ((/** @type {?} */ (this._editConditionalBranchEvt)))
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
                this._editConditionDialog.componentInstance.condition =
                    this._conditionalBranches[cbIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        this._editVisibilitySub =
            ((/** @type {?} */ (this._editVisibilityEvt)))
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
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((/**
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
        (v1, v2) => JSON.stringify(v1.triggerConditions) ===
            JSON.stringify(v2.triggerConditions))))
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
        (v1, v2) => JSON.stringify(v1.warningConditions) ===
            JSON.stringify(v2.warningConditions))))
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
        (v1, v2) => JSON.stringify(v1.validationConditions) ===
            JSON.stringify(v2.validationConditions))))
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
        this._forceValueSub =
            fg.valueChanges.pipe(distinctUntilChanged((/**
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
        this._formulaSub =
            fg.valueChanges
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
        this._formulaSub =
            fg.valueChanges.pipe(distinctUntilChanged((/**
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
        this._formulaRepsSub =
            fg.valueChanges.pipe(distinctUntilChanged((/**
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
        this._choicesFilterSub =
            fg.valueChanges
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
        this._conditionalBranchesSub =
            fg.valueChanges
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
        this._visibilitySub =
            fg.valueChanges
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQU9MLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLHdCQUF3QixFQUN6QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBZSxlQUFlLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0UsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUVaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWtCLFdBQVcsRUFBMEIsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILGFBQWEsRUFDYixRQUFRLEVBQ1IsY0FBYyxFQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUEwQixxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RGLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzFGLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7OztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCOztVQUNyQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPOztVQUN6QixPQUFPLEdBQUcs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QUFrRjs7Ozs7SUFDbEYseURBQXdEOzs7OztJQUV4RCx1REFBb0Y7Ozs7O0lBQ3BGLHVEQUFzRDs7Ozs7SUFFdEQsc0RBQStFOzs7OztJQUMvRSxzREFBcUQ7Ozs7O0lBRXJELHlEQUFzRjs7Ozs7SUFDdEYseURBQXdEOzs7OztJQUV4RCx1Q0FBZ0U7Ozs7O0lBQ2hFLHVDQUFzQzs7Ozs7SUFHbEMsdUNBQXVDOzs7OztJQUFFLHNDQUEwQjs7Ozs7SUFDbkUsa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDaG9pY2VzT3JpZ2luLFxuICBBamZGaWVsZCxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlcyxcbiAgQWpmTm9kZSxcbiAgQWpmTnVtYmVyRmllbGQsXG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNOdW1iZXJGaWVsZCxcbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBuZXZlckNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICB3aXRoTGF0ZXN0RnJvbVxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtQnVpbGRlck5vZGVFbnRyeSwgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3ZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5cblxuZnVuY3Rpb24gY2hlY2tSZXBzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX18bnVsbCB7XG4gIGNvbnN0IG1pblJlcHMgPSBjLnZhbHVlLm1pblJlcHM7XG4gIGNvbnN0IG1heFJlcHMgPSBjLnZhbHVlLm1heFJlcHM7XG4gIGlmIChtaW5SZXBzICE9IG51bGwgJiYgbWF4UmVwcyAhPSBudWxsICYmIG1pblJlcHMgPiBtYXhSZXBzKSB7XG4gICAgcmV0dXJuIHtyZXBzOiAnTWluIHJlcGV0aW9ucyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCByZXBldGl0aW9ucyd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX18bnVsbCB7XG4gIGNvbnN0IG1pblZhbHVlID0gYy52YWx1ZS5taW5WYWx1ZTtcbiAgY29uc3QgbWF4VmFsdWUgPSBjLnZhbHVlLm1heFZhbHVlO1xuICBpZiAobWluVmFsdWUgIT0gbnVsbCAmJiBtYXhWYWx1ZSAhPSBudWxsICYmIG1pblZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICByZXR1cm4ge3ZhbHVlTGltaXQ6ICdNaW4gdmFsdWUgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggdmFsdWUnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY2hlY2tEaWdpdHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgbWluRGlnaXRzID0gYy52YWx1ZS5taW5EaWdpdHM7XG4gIGNvbnN0IG1heERpZ2l0cyA9IGMudmFsdWUubWF4RGlnaXRzO1xuICBpZiAobWluRGlnaXRzICE9IG51bGwgJiYgbWF4RGlnaXRzICE9IG51bGwgJiYgbWluRGlnaXRzID4gbWF4RGlnaXRzKSB7XG4gICAgcmV0dXJuIHtkaWdpdHM6ICdNaW4gZGlnaXRzIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IGRpZ2l0cyd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25Db25kaXRpb24ge1xuICBjb25kaXRpb246IHN0cmluZztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2FybmluZ0NvbmRpdGlvbiB7XG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuICB3YXJuaW5nTWVzc2FnZTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1ub2RlLXByb3BlcnRpZXMnLFxuICB0ZW1wbGF0ZVVybDogJ25vZGUtcHJvcGVydGllcy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25vZGUtcHJvcGVydGllcy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJOb2RlUHJvcGVydGllcyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2ZpZWxkU2l6ZXM6IHtsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfVtdID0gW1xuICAgIHtsYWJlbDogJ05vcm1hbCcsIHZhbHVlOiAnbm9ybWFsJ30sIHtsYWJlbDogJ1NtYWxsJywgdmFsdWU6ICdzbWFsbCd9LFxuICAgIHtsYWJlbDogJ1NtYWxsZXInLCB2YWx1ZTogJ3NtYWxsZXInfSwge2xhYmVsOiAnVGlueScsIHZhbHVlOiAndGlueSd9LFxuICAgIHtsYWJlbDogJ01pbmknLCB2YWx1ZTogJ21pbmknfVxuICBdO1xuICBnZXQgZmllbGRTaXplcygpOiB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ31bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkU2l6ZXM7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD47XG4gIGdldCBub2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9IFtdO1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBlbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvcGVydGllc0Zvcm06IE9ic2VydmFibGU8Rm9ybUdyb3VwPjtcbiAgZ2V0IHByb3BlcnRpZXNGb3JtKCk6IE9ic2VydmFibGU8Rm9ybUdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNGb3JtO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzQ2hvaWNlczogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgZ2V0IGhhc0Nob2ljZXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0Nob2ljZXM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJWaXNpYmlsaXR5OiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1clZpc2liaWxpdHkoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJWaXNpYmlsaXR5O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9ybXVsYVJlcHM6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyRm9ybXVsYVJlcHMoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJGb3JtdWxhUmVwcztcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckNob2ljZXNGaWx0ZXI6IHN0cmluZztcbiAgZ2V0IGN1ckNob2ljZXNGaWx0ZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckZvcmNlVmFsdWU6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyRm9yY2VWYWx1ZSgpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcmNlVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhOiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1ckZvcm11bGEoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJGb3JtdWxhO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlczogc3RyaW5nW10gPSBbXTtcbiAgZ2V0IGNvbmRpdGlvbmFsQnJhbmNoZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnM6IFZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdO1xuICBnZXQgdmFsaWRhdGlvbkNvbmRpdGlvbnMoKTogVmFsaWRhdGlvbkNvbmRpdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF93YXJuaW5nQ29uZGl0aW9uczogV2FybmluZ0NvbmRpdGlvbltdID0gW107XG4gIGdldCB3YXJuaW5nQ29uZGl0aW9ucygpOiBXYXJuaW5nQ29uZGl0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbjogc3RyaW5nO1xuICBnZXQgbmV4dFNsaWRlQ29uZGl0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zOiBzdHJpbmdbXTtcbiAgZ2V0IHRyaWdnZXJDb25kaXRpb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnM7XG4gIH1cblxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGU6IChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGwpID0+IGJvb2xlYW4gPVxuICAgICAgKG5vZGVFbnRyeSkgPT4ge1xuICAgICAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVFbnRyeS5ub2RlKTtcbiAgICAgIH1cblxuICBwcml2YXRlIF92aXNpYmlsaXR5U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF92YWxpZGF0aW9uQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbkRpYWxvZ1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFZpc2liaWxpdHlFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdFZpc2liaWxpdHlTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q2hvaWNlc0ZpbHRlckV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9yY2VWYWx1ZUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfc2F2ZUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9zYXZlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLCBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgIHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IF9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeTtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1N1YiA9XG4gICAgICAgIF9zZXJ2aWNlLmNob2ljZXNPcmlnaW5zLnN1YnNjcmliZSgoYykgPT4gdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBjIHx8IFtdKTtcblxuICAgIHRoaXMuX2VuYWJsZWQgPSB0aGlzLl9ub2RlRW50cnkucGlwZShtYXAoKG4pID0+IG4gIT0gbnVsbCkpO1xuXG4gICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICB0aGlzLl9pbml0VmlzaWJpbGl0eUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFSZXBzRWRpdCgpO1xuICAgIHRoaXMuX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JjZVZhbHVlRWRpdCgpO1xuICAgIHRoaXMuX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFNhdmUoKTtcbiAgfVxuXG4gIGVkaXRWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb25hbEJyYW5jaChpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdEZvcm11bGFSZXBzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc0V2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc0ZpbHRlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9yY2VWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdFdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVXYXJuaW5nQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXROZXh0U2xpZGVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVRyaWdnZXJDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgaXNGaWVsZChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNGaWVsZChub2RlRW50cnkubm9kZSk7XG4gIH1cblxuICBpc051bWVyaWNGaWVsZChub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNOdW1iZXJGaWVsZChub2RlIGFzIEFqZkZpZWxkKTtcbiAgfVxuXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUgYXMgQWpmRmllbGQpO1xuICB9XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmNhbmNlbE5vZGVFbnRyeUVkaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fc2F2ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnQucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnByb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLCBjb25kaXRpb25hbEJyYW5jaGVzOiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICAgIGZpbHRlcigobikgPT4gbiAhPSBudWxsKSwgbWFwKChuKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlTdWIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG4gPSBuITtcblxuICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcbiAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID1cbiAgICAgICAgICAgICAgbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IHRoaXMuX2d1ZXNzVmlzaWJpbGl0eU9wdChuLm5vZGUudmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgICAgIGxldCBjb250cm9sczogYW55ID0ge1xuICAgICAgICAgICAgbmFtZTogW24ubm9kZS5uYW1lLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGxhYmVsOiBuLm5vZGUubGFiZWwsXG4gICAgICAgICAgICB2aXNpYmlsaXR5T3B0OiBbdmlzaWJpbGl0eU9wdCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBbdmlzaWJpbGl0eSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTnVtOiBuLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGhcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBbXTtcblxuICAgICAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobi5ub2RlKSkge1xuICAgICAgICAgICAgY29uc3Qgcm4gPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5uLm5vZGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm11bGFSZXBzID0gcm4uZm9ybXVsYVJlcHMgIT0gbnVsbCA/IHJuLmZvcm11bGFSZXBzLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgICBjb250cm9scy5mb3JtdWxhUmVwcyA9IFtmb3JtdWxhUmVwcywgVmFsaWRhdG9ycy5yZXF1aXJlZF07XG4gICAgICAgICAgICBjb250cm9scy5taW5SZXBzID0gcm4ubWluUmVwcztcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heFJlcHMgPSBybi5tYXhSZXBzO1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhUmVwcyA9IGZvcm11bGFSZXBzO1xuXG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tSZXBzVmFsaWRpdHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRmllbGQobikpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gPEFqZkZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgICAgbGV0IGZvcmNlVmFsdWU6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBub3RFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKGZpZWxkLnZhbGlkYXRpb24uZm9yY2VWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yY2VWYWx1ZSA9IGZpZWxkLnZhbGlkYXRpb24uZm9yY2VWYWx1ZS5jb25kaXRpb247XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbm90RW1wdHkgPSBmaWVsZC52YWxpZGF0aW9uLm5vdEVtcHR5ICE9IG51bGw7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25Db25kaXRpb25zID0gKGZpZWxkLnZhbGlkYXRpb24uY29uZGl0aW9ucyB8fCBbXSkubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7Y29uZGl0aW9uOiBjLmNvbmRpdGlvbiwgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZX07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbm90RW1wdHlXOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgICAgaWYgKGZpZWxkLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBub3RFbXB0eVcgPSBmaWVsZC53YXJuaW5nLm5vdEVtcHR5ICE9IG51bGw7XG4gICAgICAgICAgICAgIHdhcm5pbmdDb25kaXRpb25zID0gKGZpZWxkLndhcm5pbmcuY29uZGl0aW9ucyB8fCBbXSkubWFwKHcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7Y29uZGl0aW9uOiB3LmNvbmRpdGlvbiwgd2FybmluZ01lc3NhZ2U6IHcud2FybmluZ01lc3NhZ2V9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZvcm11bGEgPSBmaWVsZC5mb3JtdWxhICE9IG51bGwgPyBmaWVsZC5mb3JtdWxhLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgICBjb250cm9scy5kZXNjcmlwdGlvbiA9IGZpZWxkLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgY29udHJvbHMuZGVmYXVsdFZhbHVlID0gZmllbGQuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMuc2l6ZSA9IGZpZWxkLnNpemU7XG4gICAgICAgICAgICBjb250cm9scy5mb3JtdWxhID0gZm9ybXVsYTtcbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMubm90RW1wdHkgPSBub3RFbXB0eTtcbiAgICAgICAgICAgIGNvbnRyb2xzLnZhbGlkYXRpb25Db25kaXRpb25zID0gW3ZhbGlkYXRpb25Db25kaXRpb25zLCBbXV07XG4gICAgICAgICAgICBjb250cm9scy5ub3RFbXB0eVdhcm5pbmcgPSBub3RFbXB0eVc7XG4gICAgICAgICAgICBjb250cm9scy53YXJuaW5nQ29uZGl0aW9ucyA9IFt3YXJuaW5nQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgICAgY29udHJvbHMubmV4dFNsaWRlQ29uZGl0aW9uID0gW2ZpZWxkLm5leHRTbGlkZUNvbmRpdGlvbl07XG5cbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMgPSB3YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc051bWVyaWNGaWVsZChuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBudW1GaWVsZCA9IDxBamZOdW1iZXJGaWVsZD5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogYW55O1xuICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBhbnk7XG4gICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBhbnk7XG4gICAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBhbnk7XG4gICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1pblZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtaW5WYWx1ZSA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1pblZhbHVlLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZSgnJHZhbHVlID49ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhWYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA8PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWluRGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtaW5EaWdpdHMgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMuY29uZGl0aW9uIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnKS5yZXBsYWNlKCckdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1heERpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWF4RGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJykucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250cm9scy5taW5WYWx1ZSA9IG1pblZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cztcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heERpZ2l0cyA9IG1heERpZ2l0cztcblxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrVmFsdWVMaW1pdHNWYWxpZGl0eSk7XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tEaWdpdHNWYWxpZGl0eSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZFdpdGhDaG9pY2VzKG4ubm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkV2l0aENob2ljZXMgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+Pm4ubm9kZTtcblxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25zOiBzdHJpbmdbXSA9XG4gICAgICAgICAgICAgICAgKGZpZWxkV2l0aENob2ljZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgoYykgPT4gYy5jb25kaXRpb24pO1xuXG4gICAgICAgICAgICBjb250cm9scy5jaG9pY2VzT3JpZ2luUmVmID0gKGZpZWxkV2l0aENob2ljZXMgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgY29udHJvbHMuY2hvaWNlc0ZpbHRlciA9IGZpZWxkV2l0aENob2ljZXMuY2hvaWNlc0ZpbHRlciAhPSBudWxsID9cbiAgICAgICAgICAgICAgICBmaWVsZFdpdGhDaG9pY2VzLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSA6XG4gICAgICAgICAgICAgICAgbnVsbDtcbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcmNlRXhwYW5kZWQgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZU5hcnJvdyA9IGZpZWxkV2l0aENob2ljZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICBjb250cm9scy50cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZmIuZ3JvdXAoY29udHJvbHMpO1xuICAgICAgICAgIGZnLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG5cbiAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gbi5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKGMgPT4gYy5jb25kaXRpb24pO1xuICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcblxuICAgICAgICAgIHRoaXMuX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZUZvcm11bGFSZXBzQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JtdWxhQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVXYXJuaW5nQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmcpO1xuXG4gICAgICAgICAgcmV0dXJuIGZnO1xuICAgICAgICB9KSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3RyaWdnZXJDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICBjb25zdCBjbXAgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICBjbXAuY29uZGl0aW9uID0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVdhcm5pbmdDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNvbnN0IHcgPSB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB3LmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgY21wLndhcm5pbmdNZXNzYWdlID0gdy53YXJuaW5nTWVzc2FnZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbmQ6IFdhcm5pbmdDb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB2LmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgY21wLmVycm9yTWVzc2FnZSA9IHYuZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAoY29uZDogVmFsaWRhdGlvbkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9yY2VWYWx1ZUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdEZvcmNlVmFsdWVFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JjZVZhbHVlJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROZXh0U2xpZGVDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ25leHRTbGlkZUNvbmRpdGlvbiddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybXVsYUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdEZvcm11bGFFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhUmVwc0VkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRGb3JtdWxhUmVwc0V2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGFSZXBzJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Nob2ljZXNGaWx0ZXInXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmRpdGlvbmFsQnJhbmNoRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgY2JJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChjYklkeCA8IDAgfHwgY2JJZHggPj0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzW2NiSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpc2liaWxpdHlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddO1xuICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLnRyaWdnZXJDb25kaXRpb25zKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYyLnRyaWdnZXJDb25kaXRpb25zKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucyA9IHYudHJpZ2dlckNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVXYXJuaW5nQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS53YXJuaW5nQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2Mi53YXJuaW5nQ29uZGl0aW9ucykpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMgPSB2Lndhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gSlNPTi5zdHJpbmdpZnkodjEudmFsaWRhdGlvbkNvbmRpdGlvbnMpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIudmFsaWRhdGlvbkNvbmRpdGlvbnMpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zID0gdi52YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JjZVZhbHVlID09PSB2Mi5mb3JjZVZhbHVlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gdi5mb3JjZVZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcm11bGEgPT09IHYyLmZvcm11bGEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGEgPSB2LmZvcm11bGE7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcm11bGFSZXBzQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhUmVwc1N1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcm11bGFSZXBzID09PSB2Mi5mb3JtdWxhUmVwcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSB2LmZvcm11bGFSZXBzO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5jaG9pY2VzRmlsdGVyID09PSB2Mi5jaG9pY2VzRmlsdGVyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyID0gdi5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiB2MS5jb25kaXRpb25hbEJyYW5jaGVzTnVtID09PSB2Mi5jb25kaXRpb25hbEJyYW5jaGVzTnVtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYk51bTogbnVtYmVyID0gdi5jb25kaXRpb25hbEJyYW5jaGVzTnVtO1xuICAgICAgICAgICAgICBjb25zdCBjdXJDYk51bSA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBpZiAoY3VyQ2JOdW0gPCBjYk51bSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdDYnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGN1ckNiTnVtOyBpIDwgY2JOdW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgbmV3Q2JzLnB1c2goYWx3YXlzQ29uZGl0aW9uKCkuY29uZGl0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMuY29uY2F0KG5ld0Nicyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2JOdW0gPiBjYk51bSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMuc3BsaWNlKDAsIGN1ckNiTnVtIC0gY2JOdW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLnZpc2liaWxpdHlPcHQgPT09IHYyLnZpc2liaWxpdHlPcHQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID0gdi52aXNpYmlsaXR5T3B0O1xuICAgICAgICAgICAgICBsZXQgbmV3Q29uZGl0aW9uOiBzdHJpbmd8bnVsbDtcbiAgICAgICAgICAgICAgc3dpdGNoICh2aXNpYmlsaXR5T3B0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx3YXlzJzpcbiAgICAgICAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldmVyJzpcbiAgICAgICAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IG5ldmVyQ29uZGl0aW9uKCkuY29uZGl0aW9uO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IG5ld0NvbmRpdGlvbjtcbiAgICAgICAgICAgICAgZmcuY29udHJvbHNbJ3Zpc2liaWxpdHknXS5zZXRWYWx1ZShuZXdDb25kaXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9ndWVzc1Zpc2liaWxpdHlPcHQoY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiBzdHJpbmcge1xuICAgIGlmIChjb25kaXRpb24uY29uZGl0aW9uLmxvY2FsZUNvbXBhcmUoYWx3YXlzQ29uZGl0aW9uKCkuY29uZGl0aW9uKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICdhbHdheXMnO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9uLmNvbmRpdGlvbi5sb2NhbGVDb21wYXJlKG5ldmVyQ29uZGl0aW9uKCkuY29uZGl0aW9uKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICduZXZlcic7XG4gICAgfVxuICAgIHJldHVybiAnY29uZGl0aW9uJztcbiAgfVxufVxuIl19