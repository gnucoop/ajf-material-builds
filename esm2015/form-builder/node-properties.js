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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, publishReplay, refCount, withLatestFrom } from 'rxjs/operators';
import { AjfFbConditionEditorDialog } from './condition-editor-dialog';
import { AjfFormBuilderService } from './form-builder-service';
import { AjfFbValidationConditionEditorDialog } from './validation-condition-editor-dialog';
import { AjfFbWarningConditionEditorDialog } from './warning-condition-editor-dialog';
function checkRepsValidity(c) {
    const minReps = c.value.minReps;
    const maxReps = c.value.maxReps;
    if (minReps != null && maxReps != null && minReps > maxReps) {
        return { reps: 'Min repetions cannot be greater than max repetitions' };
    }
    return null;
}
function checkValueLimitsValidity(c) {
    const minValue = c.value.minValue;
    const maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return { valueLimit: 'Min value cannot be greater than max value' };
    }
    return null;
}
function checkDigitsValidity(c) {
    const minDigits = c.value.minDigits;
    const maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return { digits: 'Min digits cannot be greater than max digits' };
    }
    return null;
}
export class AjfFbNodeProperties {
    constructor(_cdr, _service, _dialog, _fb) {
        this._cdr = _cdr;
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
        this.isRepeatingContainerNode = (nodeEntry) => {
            return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
        };
        this._visibilityOptSub = Subscription.EMPTY;
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
            _service.choicesOrigins.subscribe((c) => this._choicesOrigins = c || []);
        this._enabled = this._nodeEntry.pipe(map((n) => n != null));
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
    get fieldSizes() {
        return this._fieldSizes;
    }
    get nodeEntry() {
        return this._nodeEntry;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get enabled() {
        return this._enabled;
    }
    get propertiesForm() {
        return this._propertiesForm;
    }
    get hasChoices() {
        return this._hasChoices;
    }
    get curVisibility() {
        return this._curVisibility;
    }
    get curFormulaReps() {
        return this._curFormulaReps;
    }
    get curChoicesFilter() {
        return this._curChoicesFilter;
    }
    get curForceValue() {
        return this._curForceValue;
    }
    get curFormula() {
        return this._curFormula;
    }
    get conditionalBranches() {
        return this._conditionalBranches;
    }
    get validationConditions() {
        return this._validationConditions;
    }
    get warningConditions() {
        return this._warningConditions;
    }
    get nextSlideCondition() {
        return this._nextSlideCondition;
    }
    get triggerConditions() {
        return this._triggerConditions;
    }
    editVisibility() {
        this._editVisibilityEvt.emit();
    }
    editConditionalBranch(idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    }
    editFormulaReps() {
        this._editFormulaRepsEvt.emit();
    }
    editChoicesFilter() {
        this._editChoicesFilterEvt.emit();
    }
    editFormula() {
        this._editFormulaEvt.emit();
    }
    editForceValue() {
        this._editForceValueEvt.emit();
    }
    editValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    }
    addValidationCondition() {
        this._addValidationConditionEvt.emit();
    }
    removeValidationCondition(idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    }
    editWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    }
    addWarningCondition() {
        this._addWarningConditionEvt.emit();
    }
    removeWarningCondition(idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    }
    editNextSlideCondition() {
        this._editNextSlideConditionEvt.emit();
    }
    editTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    }
    addTriggerCondition() {
        this._addTriggerConditionEvt.emit();
    }
    removeTriggerCondition(idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    }
    isField(nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
    }
    isNumericField(node) {
        return isField(node) && isNumberField(node);
    }
    isFieldWithChoices(node) {
        return isField(node) && isFieldWithChoices(node);
    }
    save() {
        this._saveEvt.emit();
    }
    cancel() {
        this._service.cancelNodeEntryEdit();
    }
    ngOnDestroy() {
        this._choicesOriginsSub.unsubscribe();
        this._visibilityOptSub.unsubscribe();
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
    _initSave() {
        this._saveSub = this._saveEvt
            .pipe(withLatestFrom(this.propertiesForm))
            .subscribe(([_, formGroup]) => {
            const fg = formGroup;
            const val = Object.assign(Object.assign({}, fg.value), { conditionalBranches: this._conditionalBranches });
            this._service.saveNodeEntry(val);
        });
    }
    _initForm() {
        this._propertiesForm = this._nodeEntry.pipe(filter((n) => n != null), map((n) => {
            if (this._visibilityOptSub != null) {
                this._visibilityOptSub.unsubscribe();
            }
            if (this._visibilitySub != null) {
                this._visibilitySub.unsubscribe();
            }
            if (this._conditionalBranchesSub != null) {
                this._conditionalBranchesSub.unsubscribe();
            }
            n = n;
            const visibility = n.node.visibility != null ? n.node.visibility.condition : null;
            const visibilityOpt = n.node.visibility != null ? this._guessVisibilityOpt(n.node.visibility) : null;
            let controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            const validators = [];
            if (isRepeatingContainerNode(n.node)) {
                const rn = n.node;
                const formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (this.isField(n)) {
                const field = n.node;
                let forceValue = null;
                let notEmpty = false;
                let validationConditions = [];
                if (field.validation != null) {
                    if (field.validation.forceValue != null) {
                        forceValue = field.validation.forceValue.condition;
                    }
                    notEmpty = field.validation.notEmpty != null;
                    validationConditions = (field.validation.conditions || []).map(c => {
                        return { condition: c.condition, errorMessage: c.errorMessage };
                    });
                }
                let notEmptyW = false;
                let warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || []).map(w => {
                        return { condition: w.condition, warningMessage: w.warningMessage };
                    });
                }
                const formula = field.formula != null ? field.formula.formula : null;
                controls.description = field.description;
                controls.defaultValue = field.defaultValue;
                controls.hint = field.hint;
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
                const numField = n.node;
                let minValue;
                let maxValue;
                let minDigits;
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
                const fieldWithChoices = n.node;
                let triggerConditions = (fieldWithChoices.triggerConditions || []).map((c) => c.condition);
                controls.choicesOriginRef = fieldWithChoices.choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula :
                    null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                this._triggerConditions = triggerConditions;
            }
            const fg = this._fb.group(controls);
            fg.setValidators(validators);
            this._conditionalBranches = n.node.conditionalBranches.map(c => c.condition);
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
        }), publishReplay(1), refCount());
    }
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
    _initRemoveTriggerCondition() {
        this._removeTriggerConditionSub = this._removeTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['triggerConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddTriggerCondition() {
        this._addTriggerConditionSub = this._addTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['triggerConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        });
    }
    _initTriggerConditionEdit() {
        this._editConditionDialogSub = Subscription.EMPTY;
        this._cdr.markForCheck();
        this._editTriggerConditionSub =
            this._editTriggerConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([vcIdx, fg]) => {
                this._destroyConditionDialog();
                if (vcIdx < 0 || vcIdx >= this._triggerConditions.length || fg == null) {
                    return;
                }
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                const cmp = this._editConditionDialog.componentInstance;
                cmp.condition = this._triggerConditions[vcIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._triggerConditions[vcIdx] = cond;
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initRemoveWarningCondition() {
        this._removeWarningConditionSub = this._removeWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['warningConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddWarningCondition() {
        this._addWarningConditionSub = this._addWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['warningConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    }
    _initWarningConditionEdit() {
        this._editWarningConditionSub =
            this._editWarningConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([vcIdx, fg]) => {
                this._destroyWarningConditionDialog();
                if (vcIdx < 0 || vcIdx >= this._warningConditions.length || fg == null) {
                    return;
                }
                this._editWarningConditionDialog =
                    this._dialog.open(AjfFbWarningConditionEditorDialog);
                const cmp = this._editWarningConditionDialog.componentInstance;
                const w = this._warningConditions[vcIdx];
                cmp.condition = w.condition;
                cmp.warningMessage = w.warningMessage;
                this._editWarningConditionDialogSub =
                    this._editWarningConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._warningConditions[vcIdx] = cond;
                        }
                        this._editWarningConditionDialogSub.unsubscribe();
                        this._editWarningConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initRemoveValidationCondition() {
        this._removeValidationConditionSub = this._removeValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([vcIdx, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['validationConditions'];
            let vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    }
    _initAddValidationCondition() {
        this._addValidationConditionSub = this._addValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(([_, formGroup]) => {
            if (formGroup == null) {
                return;
            }
            const fg = formGroup;
            const ctrl = fg.controls['validationConditions'];
            let vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    }
    _initValidationConditionEdit() {
        this._editValidationConditionSub =
            this._editValidationConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([vcIdx, fg]) => {
                this._destroyValidationConditionDialog();
                if (vcIdx < 0 || vcIdx >= this._validationConditions.length || fg == null) {
                    return;
                }
                this._editValidationConditionDialog =
                    this._dialog.open(AjfFbValidationConditionEditorDialog);
                const cmp = this._editValidationConditionDialog.componentInstance;
                const v = this._validationConditions[vcIdx];
                cmp.condition = v.condition;
                cmp.errorMessage = v.errorMessage;
                this._editValidationConditionDialogSub =
                    this._editValidationConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._validationConditions[vcIdx] = cond;
                        }
                        this._editValidationConditionDialogSub.unsubscribe();
                        this._editValidationConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initForceValueEdit() {
        this._editForceValueSub =
            this._editForceValueEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['forceValue'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initNextSlideConditionEdit() {
        this._editNextSlideConditionSub =
            this._editNextSlideConditionEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['nextSlideCondition'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initFormulaEdit() {
        this._editConditionDialogSub = Subscription.EMPTY;
        this._cdr.markForCheck();
        this._editFormulaSub =
            this._editFormulaEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['formula'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initFormulaRepsEdit() {
        this._editFormulaRepsSub =
            this._editFormulaRepsEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['formulaReps'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initChoicesFilterEdit() {
        this._editChoicesFilterSub =
            this._editChoicesFilterEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['choicesFilter'];
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = ctrl.value;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initConditionalBranchEdit() {
        this._editConditionalBranchSub =
            this._editConditionalBranchEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([cbIdx, fg]) => {
                this._destroyConditionDialog();
                if (cbIdx < 0 || cbIdx >= this._conditionalBranches.length || fg == null) {
                    return;
                }
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition =
                    this._conditionalBranches[cbIdx];
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            this._conditionalBranches[cbIdx] = cond;
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _initVisibilityEdit() {
        this._editVisibilitySub =
            this._editVisibilityEvt
                .pipe(withLatestFrom(this._propertiesForm))
                .subscribe(([_, formGroup]) => {
                this._destroyConditionDialog();
                if (formGroup == null) {
                    return;
                }
                const fg = formGroup;
                const ctrl = fg.controls['visibility'];
                const condition = ctrl.value;
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog);
                this._editConditionDialog.componentInstance.condition = condition;
                this._editConditionDialogSub =
                    this._editConditionDialog.afterClosed().subscribe((cond) => {
                        if (cond !== void 0) {
                            ctrl.setValue(cond);
                        }
                        this._editConditionDialogSub.unsubscribe();
                        this._editConditionDialogSub = Subscription.EMPTY;
                        this._cdr.markForCheck();
                    });
            });
    }
    _handleTriggerCondtionsChange(fg) {
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.triggerConditions) ===
            JSON.stringify(v2.triggerConditions)))
            .subscribe((v) => {
            this._triggerConditions = v.triggerConditions;
            this._cdr.markForCheck();
        });
    }
    _handleWarningCondtionsChange(fg) {
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.warningConditions) ===
            JSON.stringify(v2.warningConditions)))
            .subscribe((v) => {
            this._warningConditions = v.warningConditions;
            this._cdr.markForCheck();
        });
    }
    _handleValidationCondtionsChange(fg) {
        this._validationConditionsSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.validationConditions) ===
                JSON.stringify(v2.validationConditions)))
                .subscribe((v) => {
                this._validationConditions = v.validationConditions;
                this._cdr.markForCheck();
            });
    }
    _handleForceValueChange(fg) {
        this._forceValueSub =
            fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.forceValue === v2.forceValue))
                .subscribe((v) => {
                this._curForceValue = v.forceValue;
                this._cdr.markForCheck();
            });
    }
    _handleNextSlideConditionChange(fg) {
        this._formulaSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
                .subscribe((v) => {
                this._nextSlideCondition = v.nextSlideCondition;
                this._cdr.markForCheck();
            });
        this._formulaSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
                .subscribe((v) => {
                this._nextSlideCondition = v.nextSlideCondition;
                this._cdr.markForCheck();
            });
    }
    _handleFormulaChange(fg) {
        this._formulaSub =
            fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.formula === v2.formula))
                .subscribe((v) => {
                this._curFormula = v.formula;
                this._cdr.markForCheck();
            });
    }
    _handleFormulaRepsChange(fg) {
        this._formulaRepsSub =
            fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.formulaReps === v2.formulaReps))
                .subscribe((v) => {
                this._curFormulaReps = v.formulaReps;
                this._cdr.markForCheck();
            });
    }
    _handleChoicesFilterChange(fg) {
        this._choicesFilterSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.choicesFilter === v2.choicesFilter))
                .subscribe((v) => {
                this._curChoicesFilter = v.choicesFilter;
                this._cdr.markForCheck();
            });
    }
    _handleConditionalBranchesChange(fg) {
        this._conditionalBranchesSub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.conditionalBranchesNum === v2.conditionalBranchesNum))
                .subscribe((v) => {
                const cbNum = v.conditionalBranchesNum;
                const curCbNum = this._conditionalBranches.length;
                if (curCbNum < cbNum) {
                    let newCbs = [];
                    for (let i = curCbNum; i < cbNum; i++) {
                        newCbs.push(alwaysCondition().condition);
                    }
                    this._conditionalBranches = this._conditionalBranches.concat(newCbs);
                }
                else if (curCbNum > cbNum) {
                    this._conditionalBranches.splice(0, curCbNum - cbNum);
                }
                this._cdr.markForCheck();
            });
    }
    _handleVisibilityChange(fg) {
        this._visibilitySub =
            fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => v1.visibilityOpt === v2.visibilityOpt))
                .subscribe((v) => {
                const visibilityOpt = v.visibilityOpt;
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
            });
        this._visibilitySub = fg.valueChanges
            .pipe(filter(v => v.visibilityOpt === 'condition'), distinctUntilChanged((v1, v2) => v1.visibility === v2.visibility))
            .subscribe(v => {
            this._curVisibility = v.visibility;
            this._cdr.markForCheck();
        });
    }
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
                template: "<div\n  [style.display]=\"(enabled|async) ? 'none' : 'block'\"\n  class=\"ajf-disabled-overlay\"\n></div>\n<div class=\"ajf-header\">\n  <h3>{{'Properties'|transloco}}</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input\n            matInput\n            formControlName=\"name\"\n            [placeholder]=\"'Name' | transloco\"\n          />\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input\n            matInput\n            formControlName=\"label\"\n            [placeholder]=\"'Label' | transloco\"\n          />\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label>{{'Visibility'|transloco}}</mat-label>\n          <mat-select\n            formControlName=\"visibilityOpt\"\n            [placeholder]=\"'Visible' | transloco\"\n          >\n            <mat-option value=\"always\">{{'Always'|transloco}}</mat-option>\n            <mat-option value=\"never\">{{'Never'|transloco}}</mat-option>\n            <mat-option value=\"condition\"\n              >{{'Condition...'|transloco}}</mat-option\n            >\n          </mat-select>\n        </mat-form-field>\n        <button\n          (click)=\"editVisibility()\"\n          [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n          mat-raised-button\n          [matTooltip]=\"curVisibility || ''\"\n        >\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label>{{'Branches'|transloco}}</label></div>\n        <div>\n          <mat-slider\n            formControlName=\"conditionalBranchesNum\"\n            thumbLabel\n            tickInterval=\"auto\"\n            min=\"1\"\n            max=\"5\"\n            step=\"1\"\n          ></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button\n            (click)=\"editConditionalBranch(idx)\"\n            mat-raised-button\n            [matTooltip]=\"branch\"\n          >\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label>{{'Repetitions'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editFormulaReps()\"\n              mat-raised-button\n              [matTooltip]=\"curFormulaReps || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label>{{'Min repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider\n              formControlName=\"minReps\"\n              thumbLabel\n              tickInterval=\"auto\"\n              min=\"1\"\n              max=\"5\"\n              step=\"1\"\n            ></mat-slider>\n          </div>\n          <div><label>{{'Max repetitions'|transloco}}</label></div>\n          <div>\n            <mat-slider\n              formControlName=\"maxReps\"\n              thumbLabel\n              tickInterval=\"auto\"\n              min=\"1\"\n              max=\"5\"\n              step=\"1\"\n            ></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label>{{'Field size'|transloco}}</mat-label>\n            <mat-select\n              formControlName=\"size\"\n              [placeholder]=\"'Size' | transloco\"\n            >\n              <mat-option\n                *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\"\n              >\n                {{ fieldSize.label|transloco }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"hint\"\n              [placeholder]=\"'Hint' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea\n              matInput\n              formControlName=\"description\"\n              [placeholder]=\"'Description' | transloco\"\n            ></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input\n              matInput\n              formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | transloco\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Formula'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editFormula()\"\n              mat-raised-button\n              [matTooltip]=\"curFormula || ''\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label>{{'Force value'|translco}}</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\"\n            >{{'Not empty'|transloco}}</mat-checkbox\n          >\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input\n                matInput\n                formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | transloco\"\n              />\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | transloco }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div\n            *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n            class=\"ajf-validation-row ajf-emph\"\n          >\n            {{'No conditions'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let validationCondition of validationConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editValidationCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"validationCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon\n              class=\"ajf-pointer\"\n              (click)=\"removeValidationCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\"\n            >{{'Not empty warning'|transloco}}</mat-checkbox\n          >\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{'Warnings'|transloco}}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\"\n              >add_circle_outline</mat-icon\n            >\n          </div>\n          <div\n            *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n            class=\"ajf-validation-row ajf-emph\"\n          >\n            {{'No warnings'|transloco}}\n          </div>\n          <div\n            class=\"ajf-validation-row\"\n            *ngFor=\"let warningCondition of warningConditions; let idx = index\"\n          >\n            <button\n              (click)=\"editWarningCondition(idx)\"\n              mat-raised-button\n              [matTooltip]=\"warningCondition.condition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\"\n              >remove_circle_outline</mat-icon\n            >\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label>{{'Go to next slide condition'|transloco}}</label></div>\n          <div>\n            <button\n              (click)=\"editNextSlideCondition()\"\n              mat-raised-button\n              [matTooltip]=\"nextSlideCondition\"\n            >\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label>{{'Choices origins'|transloco}}</mat-label>\n              <mat-select\n                formControlName=\"choicesOriginRef\"\n                [placeholder]=\"'Choices' | transloco\"\n              >\n                <mat-option\n                  *ngFor=\"let choicesOrigin of choicesOrigins\"\n                  [value]=\"choicesOrigin.name\"\n                >\n                  {{ (choicesOrigin.label || choicesOrigin.name)|transloco }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label>{{'Choices filter'|transloco}}</label></div>\n            <div>\n              <button\n                (click)=\"editChoicesFilter()\"\n                mat-raised-button\n                [matTooltip]=\"curChoicesFilter\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\"\n              >{{'Force expanded selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\"\n              >{{'Force narrow selection'|transloco}}</mat-checkbox\n            >\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label>{{'Trigger selection'|transloco}}</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\"\n                >add_circle_outline</mat-icon\n              >\n            </div>\n            <div\n              *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\"\n            >\n              {{'No trigger condition'|transloco}}\n            </div>\n            <div\n              class=\"ajf-validation-row\"\n              *ngFor=\"let triggerCondition of triggerConditions; let idx = index\"\n            >\n              <button\n                (click)=\"editTriggerCondition(idx)\"\n                mat-raised-button\n                [matTooltip]=\"triggerCondition\"\n              >\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\"\n                >remove_circle_outline</mat-icon\n              >\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
            },] }
];
AjfFbNodeProperties.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormBuilderService },
    { type: MatDialog },
    { type: FormBuilder }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQU9MLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLHdCQUF3QixFQUN6QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBZSxlQUFlLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0UsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixXQUFXLEVBQTBCLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxhQUFhLEVBQ2IsUUFBUSxFQUNSLGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBMEIscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCO0lBQzNDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxD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LGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkUsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7WUFqa0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxxa2JBQW1DO2dCQUVuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7WUFwRUMsaUJBQWlCO1lBbUJjLHFCQUFxQjtZQVo5QyxTQUFTO1lBRFEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRmllbGQsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZk5vZGUsXG4gIEFqZk51bWJlckZpZWxkLFxuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlLFxuICBpc0ZpZWxkLFxuICBpc0ZpZWxkV2l0aENob2ljZXMsXG4gIGlzTnVtYmVyRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZVxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgbmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi93YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcblxuXG5mdW5jdGlvbiBjaGVja1JlcHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgbWluUmVwcyA9IGMudmFsdWUubWluUmVwcztcbiAgY29uc3QgbWF4UmVwcyA9IGMudmFsdWUubWF4UmVwcztcbiAgaWYgKG1pblJlcHMgIT0gbnVsbCAmJiBtYXhSZXBzICE9IG51bGwgJiYgbWluUmVwcyA+IG1heFJlcHMpIHtcbiAgICByZXR1cm4ge3JlcHM6ICdNaW4gcmVwZXRpb25zIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IHJlcGV0aXRpb25zJ307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVmFsdWVMaW1pdHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgbWluVmFsdWUgPSBjLnZhbHVlLm1pblZhbHVlO1xuICBjb25zdCBtYXhWYWx1ZSA9IGMudmFsdWUubWF4VmFsdWU7XG4gIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIG1heFZhbHVlICE9IG51bGwgJiYgbWluVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgIHJldHVybiB7dmFsdWVMaW1pdDogJ01pbiB2YWx1ZSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCB2YWx1ZSd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja0RpZ2l0c1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwge1xuICBjb25zdCBtaW5EaWdpdHMgPSBjLnZhbHVlLm1pbkRpZ2l0cztcbiAgY29uc3QgbWF4RGlnaXRzID0gYy52YWx1ZS5tYXhEaWdpdHM7XG4gIGlmIChtaW5EaWdpdHMgIT0gbnVsbCAmJiBtYXhEaWdpdHMgIT0gbnVsbCAmJiBtaW5EaWdpdHMgPiBtYXhEaWdpdHMpIHtcbiAgICByZXR1cm4ge2RpZ2l0czogJ01pbiBkaWdpdHMgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggZGlnaXRzJ307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvbkNvbmRpdGlvbiB7XG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYXJuaW5nQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1wcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1wcm9wZXJ0aWVzLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVQcm9wZXJ0aWVzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZmllbGRTaXplczoge2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9W10gPSBbXG4gICAge2xhYmVsOiAnTm9ybWFsJywgdmFsdWU6ICdub3JtYWwnfSwge2xhYmVsOiAnU21hbGwnLCB2YWx1ZTogJ3NtYWxsJ30sXG4gICAge2xhYmVsOiAnU21hbGxlcicsIHZhbHVlOiAnc21hbGxlcid9LCB7bGFiZWw6ICdUaW55JywgdmFsdWU6ICd0aW55J30sXG4gICAge2xhYmVsOiAnTWluaScsIHZhbHVlOiAnbWluaSd9XG4gIF07XG4gIGdldCBmaWVsZFNpemVzKCk6IHtsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRTaXplcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPjtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0gW107XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfZW5hYmxlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgZ2V0IGVuYWJsZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIF9wcm9wZXJ0aWVzRm9ybTogT2JzZXJ2YWJsZTxGb3JtR3JvdXA+O1xuICBnZXQgcHJvcGVydGllc0Zvcm0oKTogT2JzZXJ2YWJsZTxGb3JtR3JvdXA+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc0Zvcm07XG4gIH1cblxuICBwcml2YXRlIF9oYXNDaG9pY2VzOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgaGFzQ2hvaWNlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5faGFzQ2hvaWNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2N1clZpc2liaWxpdHk6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyVmlzaWJpbGl0eSgpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1clZpc2liaWxpdHk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhUmVwczogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJGb3JtdWxhUmVwcygpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcm11bGFSZXBzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyQ2hvaWNlc0ZpbHRlcjogc3RyaW5nO1xuICBnZXQgY3VyQ2hvaWNlc0ZpbHRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9yY2VWYWx1ZTogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJGb3JjZVZhbHVlKCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9yY2VWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckZvcm11bGE6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyRm9ybXVsYSgpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcm11bGE7XG4gIH1cblxuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzOiBzdHJpbmdbXSA9IFtdO1xuICBnZXQgY29uZGl0aW9uYWxCcmFuY2hlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXM7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gIGdldCB2YWxpZGF0aW9uQ29uZGl0aW9ucygpOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHdhcm5pbmdDb25kaXRpb25zKCk6IFdhcm5pbmdDb25kaXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uOiBzdHJpbmc7XG4gIGdldCBuZXh0U2xpZGVDb25kaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnM6IHN0cmluZ1tdO1xuICBnZXQgdHJpZ2dlckNvbmRpdGlvbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucztcbiAgfVxuXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZTogKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbCkgPT4gYm9vbGVhbiA9XG4gICAgICAobm9kZUVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiBub2RlRW50cnkgIT0gbnVsbCAmJiBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUVudHJ5Lm5vZGUpO1xuICAgICAgfVxuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlPcHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWaXNpYmlsaXR5RXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRWaXNpYmlsaXR5U3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhUmVwc0V2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNGaWx0ZXJFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNGaWx0ZXJTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcmNlVmFsdWVFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcmNlVmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3NhdmVFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc2F2ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgIHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlcixcbiAgKSB7XG4gICAgdGhpcy5fbm9kZUVudHJ5ID0gX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViID1cbiAgICAgICAgX3NlcnZpY2UuY2hvaWNlc09yaWdpbnMuc3Vic2NyaWJlKChjKSA9PiB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9IGMgfHwgW10pO1xuXG4gICAgdGhpcy5fZW5hYmxlZCA9IHRoaXMuX25vZGVFbnRyeS5waXBlKG1hcCgobikgPT4gbiAhPSBudWxsKSk7XG5cbiAgICB0aGlzLl9pbml0Rm9ybSgpO1xuICAgIHRoaXMuX2luaXRWaXNpYmlsaXR5RWRpdCgpO1xuICAgIHRoaXMuX2luaXRDb25kaXRpb25hbEJyYW5jaEVkaXQoKTtcbiAgICB0aGlzLl9pbml0Rm9ybXVsYVJlcHNFZGl0KCk7XG4gICAgdGhpcy5faW5pdENob2ljZXNGaWx0ZXJFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcmNlVmFsdWVFZGl0KCk7XG4gICAgdGhpcy5faW5pdFZhbGlkYXRpb25Db25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdEFkZFZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0UmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRXYXJuaW5nQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVdhcm5pbmdDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0TmV4dFNsaWRlQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRUcmlnZ2VyQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVRyaWdnZXJDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0U2F2ZSgpO1xuICB9XG5cbiAgZWRpdFZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZpc2liaWxpdHlFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbmFsQnJhbmNoKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYVJlcHMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JjZVZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0V2FybmluZ0NvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdE5leHRTbGlkZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRUcmlnZ2VyQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBpc0ZpZWxkKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlRW50cnkgIT0gbnVsbCAmJiBpc0ZpZWxkKG5vZGVFbnRyeS5ub2RlKTtcbiAgfVxuXG4gIGlzTnVtZXJpY0ZpZWxkKG5vZGU6IEFqZk5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNGaWVsZChub2RlKSAmJiBpc051bWJlckZpZWxkKG5vZGUgYXMgQWpmRmllbGQpO1xuICB9XG5cbiAgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGU6IEFqZk5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNGaWVsZChub2RlKSAmJiBpc0ZpZWxkV2l0aENob2ljZXMobm9kZSBhcyBBamZGaWVsZCk7XG4gIH1cblxuICBzYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVFdnQuZW1pdCgpO1xuICB9XG5cbiAgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuY2FuY2VsTm9kZUVudHJ5RWRpdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX3Zpc2liaWxpdHlPcHRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fc2F2ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMucHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLCBjb25kaXRpb25hbEJyYW5jaGVzOiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICAgIGZpbHRlcigobikgPT4gbiAhPSBudWxsKSwgbWFwKChuKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlPcHRTdWIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eU9wdFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eVN1YiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbiA9IG4hO1xuXG4gICAgICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlPcHQgPVxuICAgICAgICAgICAgICBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gdGhpcy5fZ3Vlc3NWaXNpYmlsaXR5T3B0KG4ubm9kZS52aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICAgICAgbGV0IGNvbnRyb2xzOiBhbnkgPSB7XG4gICAgICAgICAgICBuYW1lOiBbbi5ub2RlLm5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgbGFiZWw6IG4ubm9kZS5sYWJlbCxcbiAgICAgICAgICAgIHZpc2liaWxpdHlPcHQ6IFt2aXNpYmlsaXR5T3B0LCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFt2aXNpYmlsaXR5LCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXNOdW06IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSA9IFtdO1xuXG4gICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBybiA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm4ubm9kZTtcblxuICAgICAgICAgICAgY29uc3QgZm9ybXVsYVJlcHMgPSBybi5mb3JtdWxhUmVwcyAhPSBudWxsID8gcm4uZm9ybXVsYVJlcHMuZm9ybXVsYSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcm11bGFSZXBzID0gW2Zvcm11bGFSZXBzLCBWYWxpZGF0b3JzLnJlcXVpcmVkXTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1pblJlcHMgPSBybi5taW5SZXBzO1xuICAgICAgICAgICAgY29udHJvbHMubWF4UmVwcyA9IHJuLm1heFJlcHM7XG5cbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gZm9ybXVsYVJlcHM7XG5cbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1JlcHNWYWxpZGl0eSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZChuKSkge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSA8QWpmRmllbGQ+bi5ub2RlO1xuXG4gICAgICAgICAgICBsZXQgZm9yY2VWYWx1ZTogc3RyaW5nfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgbGV0IG5vdEVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IFZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgICAgaWYgKGZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAoZmllbGQudmFsaWRhdGlvbi5mb3JjZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3JjZVZhbHVlID0gZmllbGQudmFsaWRhdGlvbi5mb3JjZVZhbHVlLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBub3RFbXB0eSA9IGZpZWxkLnZhbGlkYXRpb24ubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSAoZmllbGQudmFsaWRhdGlvbi5jb25kaXRpb25zIHx8IFtdKS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtjb25kaXRpb246IGMuY29uZGl0aW9uLCBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBub3RFbXB0eVc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCB3YXJuaW5nQ29uZGl0aW9uczogV2FybmluZ0NvbmRpdGlvbltdID0gW107XG4gICAgICAgICAgICBpZiAoZmllbGQud2FybmluZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIG5vdEVtcHR5VyA9IGZpZWxkLndhcm5pbmcubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgICAgd2FybmluZ0NvbmRpdGlvbnMgPSAoZmllbGQud2FybmluZy5jb25kaXRpb25zIHx8IFtdKS5tYXAodyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtjb25kaXRpb246IHcuY29uZGl0aW9uLCB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZX07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZm9ybXVsYSA9IGZpZWxkLmZvcm11bGEgIT0gbnVsbCA/IGZpZWxkLmZvcm11bGEuZm9ybXVsYSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNvbnRyb2xzLmRlc2NyaXB0aW9uID0gZmllbGQuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBjb250cm9scy5kZWZhdWx0VmFsdWUgPSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5oaW50ID0gZmllbGQuaGludDtcbiAgICAgICAgICAgIGNvbnRyb2xzLnNpemUgPSBmaWVsZC5zaXplO1xuICAgICAgICAgICAgY29udHJvbHMuZm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5ID0gbm90RW1wdHk7XG4gICAgICAgICAgICBjb250cm9scy52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IFt2YWxpZGF0aW9uQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgICAgY29udHJvbHMubm90RW1wdHlXYXJuaW5nID0gbm90RW1wdHlXO1xuICAgICAgICAgICAgY29udHJvbHMud2FybmluZ0NvbmRpdGlvbnMgPSBbd2FybmluZ0NvbmRpdGlvbnMsIFtdXTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5leHRTbGlkZUNvbmRpdGlvbiA9IFtmaWVsZC5uZXh0U2xpZGVDb25kaXRpb25dO1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGEgPSBmb3JtdWxhO1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gd2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljRmllbGQobi5ub2RlKSkge1xuICAgICAgICAgICAgY29uc3QgbnVtRmllbGQgPSA8QWpmTnVtYmVyRmllbGQ+bi5ub2RlO1xuXG4gICAgICAgICAgICBsZXQgbWluVmFsdWU6IGFueTtcbiAgICAgICAgICAgIGxldCBtYXhWYWx1ZTogYW55O1xuICAgICAgICAgICAgbGV0IG1pbkRpZ2l0czogYW55O1xuICAgICAgICAgICAgbGV0IG1heERpZ2l0czogYW55O1xuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5taW5WYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWluVmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5WYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA+PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heFZhbHVlID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4VmFsdWUuY29uZGl0aW9uIHx8ICcnKS5yZXBsYWNlKCckdmFsdWUgPD0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1pbkRpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWluRGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWluRGlnaXRzLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJykucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1heERpZ2l0cy5jb25kaXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJycpLnJlcGxhY2UoJyR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbHMubWluVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heFZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5taW5EaWdpdHMgPSBtaW5EaWdpdHM7XG4gICAgICAgICAgICBjb250cm9scy5tYXhEaWdpdHMgPSBtYXhEaWdpdHM7XG5cbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkpO1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrRGlnaXRzVmFsaWRpdHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRmllbGRXaXRoQ2hvaWNlcyhuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFdpdGhDaG9pY2VzID0gPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW10gPVxuICAgICAgICAgICAgICAgIChmaWVsZFdpdGhDaG9pY2VzLnRyaWdnZXJDb25kaXRpb25zIHx8IFtdKS5tYXAoKGMpID0+IGMuY29uZGl0aW9uKTtcblxuICAgICAgICAgICAgY29udHJvbHMuY2hvaWNlc09yaWdpblJlZiA9IChmaWVsZFdpdGhDaG9pY2VzIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICAgIGNvbnRyb2xzLmNob2ljZXNGaWx0ZXIgPSBmaWVsZFdpdGhDaG9pY2VzLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyLmZvcm11bGEgOlxuICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZUV4cGFuZGVkID0gZmllbGRXaXRoQ2hvaWNlcy5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgICAgY29udHJvbHMuZm9yY2VOYXJyb3cgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgY29udHJvbHMudHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcblxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2ZiLmdyb3VwKGNvbnRyb2xzKTtcbiAgICAgICAgICBmZy5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuXG4gICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChjID0+IGMuY29uZGl0aW9uKTtcbiAgICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IG4ubm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbiA6IG51bGw7XG5cbiAgICAgICAgICB0aGlzLl9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9yY2VWYWx1ZUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlTmV4dFNsaWRlQ29uZGl0aW9uQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnKTtcblxuICAgICAgICAgIHJldHVybiBmZztcbiAgICAgICAgfSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3RyaWdnZXJDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvbkV2dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndHJpZ2dlckNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRUcmlnZ2VyQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9XG4gICAgICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmZ10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25TdWIgPSB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd3YXJuaW5nQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3MucHVzaCh7Y29uZGl0aW9uOiAnJywgZXJyb3JNZXNzYWdlOiAnJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRXYXJuaW5nQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvblN1YiA9XG4gICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmZ10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVdhcm5pbmdDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICBjb25zdCBjbXAgPSB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgY29uc3QgdyA9IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zW3ZjSWR4XTtcbiAgICAgICAgICAgICAgY21wLmNvbmRpdGlvbiA9IHcuY29uZGl0aW9uO1xuICAgICAgICAgICAgICBjbXAud2FybmluZ01lc3NhZ2UgPSB3Lndhcm5pbmdNZXNzYWdlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAoY29uZDogV2FybmluZ0NvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPVxuICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFt2Y0lkeCwgZmddKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB2LmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgY21wLmVycm9yTWVzc2FnZSA9IHYuZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAoY29uZDogVmFsaWRhdGlvbkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9yY2VWYWx1ZUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIgPVxuICAgICAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JjZVZhbHVlJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9XG4gICAgICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snbmV4dFNsaWRlQ29uZGl0aW9uJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdEZvcm11bGFFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9ybXVsYSddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhUmVwc0VkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGFSZXBzJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNGaWx0ZXJFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snY2hvaWNlc0ZpbHRlciddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25kaXRpb25hbEJyYW5jaEVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW2NiSWR4LCBmZ10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBpZiAoY2JJZHggPCAwIHx8IGNiSWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1tjYklkeF07XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzW2NiSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpc2liaWxpdHlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViID1cbiAgICAgICAgdGhpcy5fZWRpdFZpc2liaWxpdHlFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddO1xuICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVHJpZ2dlckNvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS50cmlnZ2VyQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIudHJpZ2dlckNvbmRpdGlvbnMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB2LnRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS53YXJuaW5nQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIud2FybmluZ0NvbmRpdGlvbnMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMgPSB2Lndhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS52YWxpZGF0aW9uQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2Mi52YWxpZGF0aW9uQ29uZGl0aW9ucykpLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHYudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9yY2VWYWx1ZUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9yY2VWYWx1ZVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcmNlVmFsdWUgPT09IHYyLmZvcmNlVmFsdWUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcmNlVmFsdWUgPSB2LmZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTmV4dFNsaWRlQ29uZGl0aW9uQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5uZXh0U2xpZGVDb25kaXRpb24gPT09IHYyLm5leHRTbGlkZUNvbmRpdGlvbikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uID0gdi5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9ybXVsYSA9PT0gdjIuZm9ybXVsYSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IHYuZm9ybXVsYTtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhUmVwcyA9PT0gdjIuZm9ybXVsYVJlcHMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gdi5mb3JtdWxhUmVwcztcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5jaG9pY2VzRmlsdGVyID09PSB2Mi5jaG9pY2VzRmlsdGVyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyID0gdi5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IHYxLmNvbmRpdGlvbmFsQnJhbmNoZXNOdW0gPT09IHYyLmNvbmRpdGlvbmFsQnJhbmNoZXNOdW0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNiTnVtOiBudW1iZXIgPSB2LmNvbmRpdGlvbmFsQnJhbmNoZXNOdW07XG4gICAgICAgICAgICAgIGNvbnN0IGN1ckNiTnVtID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmIChjdXJDYk51bSA8IGNiTnVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Niczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gY3VyQ2JOdW07IGkgPCBjYk51bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBuZXdDYnMucHVzaChhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5jb25jYXQobmV3Q2JzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYk51bSA+IGNiTnVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5zcGxpY2UoMCwgY3VyQ2JOdW0gLSBjYk51bSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS52aXNpYmlsaXR5T3B0ID09PSB2Mi52aXNpYmlsaXR5T3B0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHYpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9IHYudmlzaWJpbGl0eU9wdDtcbiAgICAgICAgICAgICAgbGV0IG5ld0NvbmRpdGlvbjogc3RyaW5nfG51bGw7XG4gICAgICAgICAgICAgIHN3aXRjaCAodmlzaWJpbGl0eU9wdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXZlcic6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuZXdDb25kaXRpb247XG4gICAgICAgICAgICAgIGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J10uc2V0VmFsdWUobmV3Q29uZGl0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcih2ID0+IHYudmlzaWJpbGl0eU9wdCA9PT0gJ2NvbmRpdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLnZpc2liaWxpdHkgPT09IHYyLnZpc2liaWxpdHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSB2LnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3Vlc3NWaXNpYmlsaXR5T3B0KGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAoY29uZGl0aW9uLmNvbmRpdGlvbi5sb2NhbGVDb21wYXJlKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnYWx3YXlzJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnbmV2ZXInO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbmRpdGlvbic7XG4gIH1cbn1cbiJdfQ==