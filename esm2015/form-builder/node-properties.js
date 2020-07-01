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
                template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<div class=\"ajf-header\">\n  <h3 translate>Properties</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label translate>Visibility</mat-label>\n          <mat-select\n              formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\">\n            <mat-option value=\"always\" translate>Always</mat-option>\n            <mat-option value=\"never\" translate>Never</mat-option>\n            <mat-option value=\"condition\" translate>Condition...</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button (click)=\"editVisibility()\"\n            [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n            mat-raised-button [matTooltip]=\"curVisibility || ''\">\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label translate>Branches</label></div>\n        <div>\n          <mat-slider formControlName=\"conditionalBranchesNum\"\n              thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label translate>Repetitions</label></div>\n          <div>\n            <button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label translate>Min repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"minReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n          <div><label translate>Max repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"maxReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label translate>Field size</mat-label>\n            <mat-select formControlName=\"size\"\n                [placeholder]=\"'Size' | translate\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\">\n                {{ fieldSize.label }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea matInput formControlName=\"description\"\n                [placeholder]=\"'Description' | translate\"></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | translate\">\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Formula</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label translate>Force value</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | translate\">\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | translate }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No conditions</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\">\n            <button (click)=\"editValidationCondition(idx)\"\n                mat-raised-button [matTooltip]=\"validationCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Warnings</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div  *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No warnings</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\">\n            <button (click)=\"editWarningCondition(idx)\"\n                mat-raised-button [matTooltip]=\"warningCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Go to next slide condition</label></div>\n          <div>\n            <button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label translate>Choices origins</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | translate\">\n                <mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.name\">\n                  {{ choicesOrigin.label || choicesOrigin.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label translate>Choices filter</label></div>\n            <div>\n              <button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label translate>Trigger selection</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon>\n            </div>\n            <div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n                class=\"ajf-validation-row ajf-emph\" translate>No trigger condition </div>\n            <div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\">\n              <button (click)=\"editTriggerCondition(idx)\"\n                  mat-raised-button [matTooltip]=\"triggerCondition\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon>\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQU9MLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLHdCQUF3QixFQUN6QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBZSxlQUFlLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0UsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixXQUFXLEVBQTBCLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxhQUFhLEVBQ2IsUUFBUSxFQUNSLGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBMEIscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCO0lBQzNDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxD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QUFFO1lBQ3ZFLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7O1lBaGtDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsb3hXQUFtQztnQkFFbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBcEVDLGlCQUFpQjtZQW1CYyxxQkFBcUI7WUFaOUMsU0FBUztZQURRLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNob2ljZXNPcmlnaW4sXG4gIEFqZkZpZWxkLFxuICBBamZGaWVsZFdpdGhDaG9pY2VzLFxuICBBamZOb2RlLFxuICBBamZOdW1iZXJGaWVsZCxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc051bWJlckZpZWxkLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIG5ldmVyQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TWF0RGlhbG9nLCBNYXREaWFsb2dSZWZ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICB3aXRoTGF0ZXN0RnJvbVxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGb3JtQnVpbGRlck5vZGVFbnRyeSwgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3ZhbGlkYXRpb24tY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vd2FybmluZy1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5cblxuZnVuY3Rpb24gY2hlY2tSZXBzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX18bnVsbCB7XG4gIGNvbnN0IG1pblJlcHMgPSBjLnZhbHVlLm1pblJlcHM7XG4gIGNvbnN0IG1heFJlcHMgPSBjLnZhbHVlLm1heFJlcHM7XG4gIGlmIChtaW5SZXBzICE9IG51bGwgJiYgbWF4UmVwcyAhPSBudWxsICYmIG1pblJlcHMgPiBtYXhSZXBzKSB7XG4gICAgcmV0dXJuIHtyZXBzOiAnTWluIHJlcGV0aW9ucyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCByZXBldGl0aW9ucyd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX18bnVsbCB7XG4gIGNvbnN0IG1pblZhbHVlID0gYy52YWx1ZS5taW5WYWx1ZTtcbiAgY29uc3QgbWF4VmFsdWUgPSBjLnZhbHVlLm1heFZhbHVlO1xuICBpZiAobWluVmFsdWUgIT0gbnVsbCAmJiBtYXhWYWx1ZSAhPSBudWxsICYmIG1pblZhbHVlID4gbWF4VmFsdWUpIHtcbiAgICByZXR1cm4ge3ZhbHVlTGltaXQ6ICdNaW4gdmFsdWUgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggdmFsdWUnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY2hlY2tEaWdpdHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgbWluRGlnaXRzID0gYy52YWx1ZS5taW5EaWdpdHM7XG4gIGNvbnN0IG1heERpZ2l0cyA9IGMudmFsdWUubWF4RGlnaXRzO1xuICBpZiAobWluRGlnaXRzICE9IG51bGwgJiYgbWF4RGlnaXRzICE9IG51bGwgJiYgbWluRGlnaXRzID4gbWF4RGlnaXRzKSB7XG4gICAgcmV0dXJuIHtkaWdpdHM6ICdNaW4gZGlnaXRzIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IGRpZ2l0cyd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25Db25kaXRpb24ge1xuICBjb25kaXRpb246IHN0cmluZztcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2FybmluZ0NvbmRpdGlvbiB7XG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuICB3YXJuaW5nTWVzc2FnZTogc3RyaW5nO1xufVxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1ub2RlLXByb3BlcnRpZXMnLFxuICB0ZW1wbGF0ZVVybDogJ25vZGUtcHJvcGVydGllcy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25vZGUtcHJvcGVydGllcy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmJOb2RlUHJvcGVydGllcyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2ZpZWxkU2l6ZXM6IHtsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfVtdID0gW1xuICAgIHtsYWJlbDogJ05vcm1hbCcsIHZhbHVlOiAnbm9ybWFsJ30sIHtsYWJlbDogJ1NtYWxsJywgdmFsdWU6ICdzbWFsbCd9LFxuICAgIHtsYWJlbDogJ1NtYWxsZXInLCB2YWx1ZTogJ3NtYWxsZXInfSwge2xhYmVsOiAnVGlueScsIHZhbHVlOiAndGlueSd9LFxuICAgIHtsYWJlbDogJ01pbmknLCB2YWx1ZTogJ21pbmknfVxuICBdO1xuICBnZXQgZmllbGRTaXplcygpOiB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ31bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkU2l6ZXM7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD47XG4gIGdldCBub2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9IFtdO1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBlbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvcGVydGllc0Zvcm06IE9ic2VydmFibGU8Rm9ybUdyb3VwPjtcbiAgZ2V0IHByb3BlcnRpZXNGb3JtKCk6IE9ic2VydmFibGU8Rm9ybUdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNGb3JtO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzQ2hvaWNlczogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgZ2V0IGhhc0Nob2ljZXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0Nob2ljZXM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJWaXNpYmlsaXR5OiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1clZpc2liaWxpdHkoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJWaXNpYmlsaXR5O1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9ybXVsYVJlcHM6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyRm9ybXVsYVJlcHMoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJGb3JtdWxhUmVwcztcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckNob2ljZXNGaWx0ZXI6IHN0cmluZztcbiAgZ2V0IGN1ckNob2ljZXNGaWx0ZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckZvcmNlVmFsdWU6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyRm9yY2VWYWx1ZSgpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcmNlVmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhOiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1ckZvcm11bGEoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJGb3JtdWxhO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlczogc3RyaW5nW10gPSBbXTtcbiAgZ2V0IGNvbmRpdGlvbmFsQnJhbmNoZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnM6IFZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdO1xuICBnZXQgdmFsaWRhdGlvbkNvbmRpdGlvbnMoKTogVmFsaWRhdGlvbkNvbmRpdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF93YXJuaW5nQ29uZGl0aW9uczogV2FybmluZ0NvbmRpdGlvbltdID0gW107XG4gIGdldCB3YXJuaW5nQ29uZGl0aW9ucygpOiBXYXJuaW5nQ29uZGl0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbjogc3RyaW5nO1xuICBnZXQgbmV4dFNsaWRlQ29uZGl0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zOiBzdHJpbmdbXTtcbiAgZ2V0IHRyaWdnZXJDb25kaXRpb25zKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnM7XG4gIH1cblxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGU6IChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGwpID0+IGJvb2xlYW4gPVxuICAgICAgKG5vZGVFbnRyeSkgPT4ge1xuICAgICAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVFbnRyeS5ub2RlKTtcbiAgICAgIH1cblxuICBwcml2YXRlIF92aXNpYmlsaXR5T3B0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVJlcHNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNGaWx0ZXJTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm11bGFTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZvcmNlVmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF93YXJuaW5nQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9zYXZlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3NhdmVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXG4gICAgICBwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIsXG4gICkge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IF9zZXJ2aWNlLmVkaXRlZE5vZGVFbnRyeTtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1N1YiA9XG4gICAgICAgIF9zZXJ2aWNlLmNob2ljZXNPcmlnaW5zLnN1YnNjcmliZSgoYykgPT4gdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBjIHx8IFtdKTtcblxuICAgIHRoaXMuX2VuYWJsZWQgPSB0aGlzLl9ub2RlRW50cnkucGlwZShtYXAoKG4pID0+IG4gIT0gbnVsbCkpO1xuXG4gICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICB0aGlzLl9pbml0VmlzaWJpbGl0eUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFSZXBzRWRpdCgpO1xuICAgIHRoaXMuX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JjZVZhbHVlRWRpdCgpO1xuICAgIHRoaXMuX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFNhdmUoKTtcbiAgfVxuXG4gIGVkaXRWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb25hbEJyYW5jaChpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdEZvcm11bGFSZXBzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc0V2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc0ZpbHRlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9yY2VWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdFdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVXYXJuaW5nQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXROZXh0U2xpZGVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVRyaWdnZXJDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgaXNGaWVsZChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNGaWVsZChub2RlRW50cnkubm9kZSk7XG4gIH1cblxuICBpc051bWVyaWNGaWVsZChub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNOdW1iZXJGaWVsZChub2RlIGFzIEFqZkZpZWxkKTtcbiAgfVxuXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUgYXMgQWpmRmllbGQpO1xuICB9XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmNhbmNlbE5vZGVFbnRyeUVkaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl92aXNpYmlsaXR5T3B0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX3NhdmVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVTdWIgPSB0aGlzLl9zYXZlRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLnByb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHsuLi5mZy52YWx1ZSwgY29uZGl0aW9uYWxCcmFuY2hlczogdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc307XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZU5vZGVFbnRyeSh2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzRm9ybSA9IHRoaXMuX25vZGVFbnRyeS5waXBlKFxuICAgICAgICBmaWx0ZXIoKG4pID0+IG4gIT0gbnVsbCksIG1hcCgobikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5T3B0U3ViICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2liaWxpdHlPcHRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlTdWIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG4gPSBuITtcblxuICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcbiAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID1cbiAgICAgICAgICAgICAgbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IHRoaXMuX2d1ZXNzVmlzaWJpbGl0eU9wdChuLm5vZGUudmlzaWJpbGl0eSkgOiBudWxsO1xuICAgICAgICAgIGxldCBjb250cm9sczogYW55ID0ge1xuICAgICAgICAgICAgbmFtZTogW24ubm9kZS5uYW1lLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGxhYmVsOiBuLm5vZGUubGFiZWwsXG4gICAgICAgICAgICB2aXNpYmlsaXR5T3B0OiBbdmlzaWJpbGl0eU9wdCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBbdmlzaWJpbGl0eSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTnVtOiBuLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGhcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gPSBbXTtcblxuICAgICAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobi5ub2RlKSkge1xuICAgICAgICAgICAgY29uc3Qgcm4gPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5uLm5vZGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm11bGFSZXBzID0gcm4uZm9ybXVsYVJlcHMgIT0gbnVsbCA/IHJuLmZvcm11bGFSZXBzLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgICBjb250cm9scy5mb3JtdWxhUmVwcyA9IFtmb3JtdWxhUmVwcywgVmFsaWRhdG9ycy5yZXF1aXJlZF07XG4gICAgICAgICAgICBjb250cm9scy5taW5SZXBzID0gcm4ubWluUmVwcztcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heFJlcHMgPSBybi5tYXhSZXBzO1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhUmVwcyA9IGZvcm11bGFSZXBzO1xuXG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tSZXBzVmFsaWRpdHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRmllbGQobikpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gPEFqZkZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgICAgbGV0IGZvcmNlVmFsdWU6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBub3RFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKGZpZWxkLnZhbGlkYXRpb24uZm9yY2VWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm9yY2VWYWx1ZSA9IGZpZWxkLnZhbGlkYXRpb24uZm9yY2VWYWx1ZS5jb25kaXRpb247XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbm90RW1wdHkgPSBmaWVsZC52YWxpZGF0aW9uLm5vdEVtcHR5ICE9IG51bGw7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb25Db25kaXRpb25zID0gKGZpZWxkLnZhbGlkYXRpb24uY29uZGl0aW9ucyB8fCBbXSkubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7Y29uZGl0aW9uOiBjLmNvbmRpdGlvbiwgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZX07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbm90RW1wdHlXOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgICAgaWYgKGZpZWxkLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBub3RFbXB0eVcgPSBmaWVsZC53YXJuaW5nLm5vdEVtcHR5ICE9IG51bGw7XG4gICAgICAgICAgICAgIHdhcm5pbmdDb25kaXRpb25zID0gKGZpZWxkLndhcm5pbmcuY29uZGl0aW9ucyB8fCBbXSkubWFwKHcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7Y29uZGl0aW9uOiB3LmNvbmRpdGlvbiwgd2FybmluZ01lc3NhZ2U6IHcud2FybmluZ01lc3NhZ2V9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZvcm11bGEgPSBmaWVsZC5mb3JtdWxhICE9IG51bGwgPyBmaWVsZC5mb3JtdWxhLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgICBjb250cm9scy5kZXNjcmlwdGlvbiA9IGZpZWxkLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgY29udHJvbHMuZGVmYXVsdFZhbHVlID0gZmllbGQuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMuc2l6ZSA9IGZpZWxkLnNpemU7XG4gICAgICAgICAgICBjb250cm9scy5mb3JtdWxhID0gZm9ybXVsYTtcbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMubm90RW1wdHkgPSBub3RFbXB0eTtcbiAgICAgICAgICAgIGNvbnRyb2xzLnZhbGlkYXRpb25Db25kaXRpb25zID0gW3ZhbGlkYXRpb25Db25kaXRpb25zLCBbXV07XG4gICAgICAgICAgICBjb250cm9scy5ub3RFbXB0eVdhcm5pbmcgPSBub3RFbXB0eVc7XG4gICAgICAgICAgICBjb250cm9scy53YXJuaW5nQ29uZGl0aW9ucyA9IFt3YXJuaW5nQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgICAgY29udHJvbHMubmV4dFNsaWRlQ29uZGl0aW9uID0gW2ZpZWxkLm5leHRTbGlkZUNvbmRpdGlvbl07XG5cbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcmNlVmFsdWUgPSBmb3JjZVZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMgPSB3YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc051bWVyaWNGaWVsZChuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBudW1GaWVsZCA9IDxBamZOdW1iZXJGaWVsZD5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCBtaW5WYWx1ZTogYW55O1xuICAgICAgICAgICAgbGV0IG1heFZhbHVlOiBhbnk7XG4gICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBhbnk7XG4gICAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBhbnk7XG4gICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1pblZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtaW5WYWx1ZSA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1pblZhbHVlLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZSgnJHZhbHVlID49ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhWYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWF4VmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhWYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA8PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWluRGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtaW5EaWdpdHMgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMuY29uZGl0aW9uIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnKS5yZXBsYWNlKCckdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1heERpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWF4RGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJykucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250cm9scy5taW5WYWx1ZSA9IG1pblZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMubWF4VmFsdWUgPSBtYXhWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cztcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heERpZ2l0cyA9IG1heERpZ2l0cztcblxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrVmFsdWVMaW1pdHNWYWxpZGl0eSk7XG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tEaWdpdHNWYWxpZGl0eSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZFdpdGhDaG9pY2VzKG4ubm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkV2l0aENob2ljZXMgPSA8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+Pm4ubm9kZTtcblxuICAgICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25zOiBzdHJpbmdbXSA9XG4gICAgICAgICAgICAgICAgKGZpZWxkV2l0aENob2ljZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgoYykgPT4gYy5jb25kaXRpb24pO1xuXG4gICAgICAgICAgICBjb250cm9scy5jaG9pY2VzT3JpZ2luUmVmID0gKGZpZWxkV2l0aENob2ljZXMgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgY29udHJvbHMuY2hvaWNlc0ZpbHRlciA9IGZpZWxkV2l0aENob2ljZXMuY2hvaWNlc0ZpbHRlciAhPSBudWxsID9cbiAgICAgICAgICAgICAgICBmaWVsZFdpdGhDaG9pY2VzLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSA6XG4gICAgICAgICAgICAgICAgbnVsbDtcbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcmNlRXhwYW5kZWQgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZU5hcnJvdyA9IGZpZWxkV2l0aENob2ljZXMuZm9yY2VOYXJyb3c7XG4gICAgICAgICAgICBjb250cm9scy50cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuXG4gICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZmIuZ3JvdXAoY29udHJvbHMpO1xuICAgICAgICAgIGZnLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG5cbiAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gbi5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubWFwKGMgPT4gYy5jb25kaXRpb24pO1xuICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gbi5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uIDogbnVsbDtcblxuICAgICAgICAgIHRoaXMuX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZUZvcm11bGFSZXBzQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JtdWxhQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVXYXJuaW5nQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmcpO1xuXG4gICAgICAgICAgcmV0dXJuIGZnO1xuICAgICAgICB9KSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgxKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIgPSB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndHJpZ2dlckNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3MucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbdmNJZHgsIGZnXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgY21wLmNvbmRpdGlvbiA9IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1YiA9IHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbdmNJZHgsIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd3YXJuaW5nQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1YiA9IHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbdmNJZHgsIGZnXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICBjb25zdCB3ID0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICAgICAgICBjbXAuY29uZGl0aW9uID0gdy5jb25kaXRpb247XG4gICAgICAgICAgICAgIGNtcC53YXJuaW5nTWVzc2FnZSA9IHcud2FybmluZ01lc3NhZ2U7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kOiBXYXJuaW5nQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25TdWIgPSB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2YWxpZGF0aW9uQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3MucHVzaCh7Y29uZGl0aW9uOiAnJywgZXJyb3JNZXNzYWdlOiAnJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9XG4gICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW3ZjSWR4LCBmZ10pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICBjb25zdCBjbXAgPSB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgY29uc3QgdiA9IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zW3ZjSWR4XTtcbiAgICAgICAgICAgICAgY21wLmNvbmRpdGlvbiA9IHYuY29uZGl0aW9uO1xuICAgICAgICAgICAgICBjbXAuZXJyb3JNZXNzYWdlID0gdi5lcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kOiBWYWxpZGF0aW9uQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JjZVZhbHVlRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1YiA9XG4gICAgICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoW18sIGZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZmcgPSBmb3JtR3JvdXAgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2ZvcmNlVmFsdWUnXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TmV4dFNsaWRlQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID1cbiAgICAgICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyduZXh0U2xpZGVDb25kaXRpb24nXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybXVsYUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIgPVxuICAgICAgICB0aGlzLl9lZGl0Rm9ybXVsYUV2dFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFSZXBzRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNTdWIgPVxuICAgICAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbXywgZm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBmZyA9IGZvcm1Hcm91cCBhcyBGb3JtR3JvdXA7XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9ybXVsYVJlcHMnXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hvaWNlc0ZpbHRlckVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIgPVxuICAgICAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydjaG9pY2VzRmlsdGVyJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENvbmRpdGlvbmFsQnJhbmNoRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIgPVxuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChbY2JJZHgsIGZnXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGlmIChjYklkeCA8IDAgfHwgY2JJZHggPj0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggfHwgZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzW2NiSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmlzaWJpbGl0eUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZpc2liaWxpdHlTdWIgPVxuICAgICAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eUV2dFxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J107XG4gICAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLnRyaWdnZXJDb25kaXRpb25zKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2Mi50cmlnZ2VyQ29uZGl0aW9ucykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucyA9IHYudHJpZ2dlckNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVXYXJuaW5nQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLndhcm5pbmdDb25kaXRpb25zKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2Mi53YXJuaW5nQ29uZGl0aW9ucykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHYud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1N1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLnZhbGlkYXRpb25Db25kaXRpb25zKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYyLnZhbGlkYXRpb25Db25kaXRpb25zKSksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zID0gdi52YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9yY2VWYWx1ZSA9PT0gdjIuZm9yY2VWYWx1ZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyRm9yY2VWYWx1ZSA9IHYuZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEubmV4dFNsaWRlQ29uZGl0aW9uID09PSB2Mi5uZXh0U2xpZGVDb25kaXRpb24pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbiA9IHYubmV4dFNsaWRlQ29uZGl0aW9uO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcm11bGFDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhID09PSB2Mi5mb3JtdWxhKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhID0gdi5mb3JtdWxhO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcm11bGFSZXBzQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhUmVwc1N1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcm11bGFSZXBzID09PSB2Mi5mb3JtdWxhUmVwcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSB2LmZvcm11bGFSZXBzO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNob2ljZXNGaWx0ZXJDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNGaWx0ZXJTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmNob2ljZXNGaWx0ZXIgPT09IHYyLmNob2ljZXNGaWx0ZXIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckNob2ljZXNGaWx0ZXIgPSB2LmNob2ljZXNGaWx0ZXI7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ29uZGl0aW9uYWxCcmFuY2hlc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gdjEuY29uZGl0aW9uYWxCcmFuY2hlc051bSA9PT0gdjIuY29uZGl0aW9uYWxCcmFuY2hlc051bSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2JOdW06IG51bWJlciA9IHYuY29uZGl0aW9uYWxCcmFuY2hlc051bTtcbiAgICAgICAgICAgICAgY29uc3QgY3VyQ2JOdW0gPSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgaWYgKGN1ckNiTnVtIDwgY2JOdW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2JzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjdXJDYk51bTsgaSA8IGNiTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIG5ld0Nicy5wdXNoKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMgPSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmNvbmNhdChuZXdDYnMpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNiTnVtID4gY2JOdW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLnNwbGljZSgwLCBjdXJDYk51bSAtIGNiTnVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZpc2liaWxpdHlDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLnZpc2liaWxpdHlPcHQgPT09IHYyLnZpc2liaWxpdHlPcHQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID0gdi52aXNpYmlsaXR5T3B0O1xuICAgICAgICAgICAgICBsZXQgbmV3Q29uZGl0aW9uOiBzdHJpbmd8bnVsbDtcbiAgICAgICAgICAgICAgc3dpdGNoICh2aXNpYmlsaXR5T3B0KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWx3YXlzJzpcbiAgICAgICAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldmVyJzpcbiAgICAgICAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IG5ldmVyQ29uZGl0aW9uKCkuY29uZGl0aW9uO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIG5ld0NvbmRpdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IG5ld0NvbmRpdGlvbjtcbiAgICAgICAgICAgICAgZmcuY29udHJvbHNbJ3Zpc2liaWxpdHknXS5zZXRWYWx1ZShuZXdDb25kaXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHYgPT4gdi52aXNpYmlsaXR5T3B0ID09PSAnY29uZGl0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEudmlzaWJpbGl0eSA9PT0gdjIudmlzaWJpbGl0eSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IHYudmlzaWJpbGl0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9ndWVzc1Zpc2liaWxpdHlPcHQoY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiBzdHJpbmcge1xuICAgIGlmIChjb25kaXRpb24uY29uZGl0aW9uLmxvY2FsZUNvbXBhcmUoYWx3YXlzQ29uZGl0aW9uKCkuY29uZGl0aW9uKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICdhbHdheXMnO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9uLmNvbmRpdGlvbi5sb2NhbGVDb21wYXJlKG5ldmVyQ29uZGl0aW9uKCkuY29uZGl0aW9uKSA9PT0gMCkge1xuICAgICAgcmV0dXJuICduZXZlcic7XG4gICAgfVxuICAgIHJldHVybiAnY29uZGl0aW9uJztcbiAgfVxufVxuIl19