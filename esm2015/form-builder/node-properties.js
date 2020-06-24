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
let AjfFbNodeProperties = /** @class */ (() => {
    class AjfFbNodeProperties {
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
            this._saveSub = this._saveEvt.pipe(withLatestFrom(this.propertiesForm))
                .subscribe((r) => {
                const fg = r[1];
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
                .subscribe((r) => {
                const vcIdx = r[0];
                const fg = r[1];
                if (fg == null) {
                    return;
                }
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
                .subscribe((r) => {
                const fg = r[1];
                if (fg == null) {
                    return;
                }
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const vcIdx = r[0];
                    const fg = r[1];
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
                .subscribe((r) => {
                const vcIdx = r[0];
                const fg = r[1];
                if (fg == null) {
                    return;
                }
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
                .subscribe((r) => {
                const fg = r[1];
                if (fg == null) {
                    return;
                }
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
                    .subscribe((r) => {
                    this._destroyWarningConditionDialog();
                    const vcIdx = r[0];
                    const fg = r[1];
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
                .subscribe((r) => {
                const vcIdx = r[0];
                const fg = r[1];
                if (fg == null) {
                    return;
                }
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
                .subscribe((r) => {
                const fg = r[1];
                if (fg == null) {
                    return;
                }
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
                    .subscribe((r) => {
                    this._destroyValidationConditionDialog();
                    const vcIdx = r[0];
                    const fg = r[1];
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const fg = r[1];
                    if (fg == null) {
                        return;
                    }
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const fg = r[1];
                    if (fg == null) {
                        return;
                    }
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const fg = r[1];
                    if (fg == null) {
                        return;
                    }
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const fg = r[1];
                    if (fg == null) {
                        return;
                    }
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const fg = r[1];
                    if (fg == null) {
                        return;
                    }
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const cbIdx = r[0];
                    const fg = r[1];
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
                    .subscribe((r) => {
                    this._destroyConditionDialog();
                    const fg = r[1];
                    if (fg == null) {
                        return;
                    }
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
    return AjfFbNodeProperties;
})();
export { AjfFbNodeProperties };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQU9MLE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLHdCQUF3QixFQUN6QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBZSxlQUFlLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0UsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixXQUFXLEVBQTBCLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxhQUFhLEVBQ2IsUUFBUSxFQUNSLGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBMEIscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCO0lBQzNDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxD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QVk7aUJBQ1YsSUFBSSxDQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLEVBQzVDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQ2hFO2lCQUNKLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVPLG1CQUFtQixDQUFDLFNBQXVCO1lBQ2pELElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4RSxPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUNELElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN2RSxPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7OztnQkF4aUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxveFdBQW1DO29CQUVuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7O2dCQXBFQyxpQkFBaUI7Z0JBbUJjLHFCQUFxQjtnQkFaOUMsU0FBUztnQkFEUSxXQUFXOztJQWltQ3BDLDBCQUFDO0tBQUE7U0FsaUNZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRmllbGQsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZk5vZGUsXG4gIEFqZk51bWJlckZpZWxkLFxuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlLFxuICBpc0ZpZWxkLFxuICBpc0ZpZWxkV2l0aENob2ljZXMsXG4gIGlzTnVtYmVyRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZVxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgbmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi93YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcblxuXG5mdW5jdGlvbiBjaGVja1JlcHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgbWluUmVwcyA9IGMudmFsdWUubWluUmVwcztcbiAgY29uc3QgbWF4UmVwcyA9IGMudmFsdWUubWF4UmVwcztcbiAgaWYgKG1pblJlcHMgIT0gbnVsbCAmJiBtYXhSZXBzICE9IG51bGwgJiYgbWluUmVwcyA+IG1heFJlcHMpIHtcbiAgICByZXR1cm4ge3JlcHM6ICdNaW4gcmVwZXRpb25zIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IHJlcGV0aXRpb25zJ307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVmFsdWVMaW1pdHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgY29uc3QgbWluVmFsdWUgPSBjLnZhbHVlLm1pblZhbHVlO1xuICBjb25zdCBtYXhWYWx1ZSA9IGMudmFsdWUubWF4VmFsdWU7XG4gIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIG1heFZhbHVlICE9IG51bGwgJiYgbWluVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgIHJldHVybiB7dmFsdWVMaW1pdDogJ01pbiB2YWx1ZSBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCB2YWx1ZSd9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja0RpZ2l0c1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwge1xuICBjb25zdCBtaW5EaWdpdHMgPSBjLnZhbHVlLm1pbkRpZ2l0cztcbiAgY29uc3QgbWF4RGlnaXRzID0gYy52YWx1ZS5tYXhEaWdpdHM7XG4gIGlmIChtaW5EaWdpdHMgIT0gbnVsbCAmJiBtYXhEaWdpdHMgIT0gbnVsbCAmJiBtaW5EaWdpdHMgPiBtYXhEaWdpdHMpIHtcbiAgICByZXR1cm4ge2RpZ2l0czogJ01pbiBkaWdpdHMgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggZGlnaXRzJ307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvbkNvbmRpdGlvbiB7XG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYXJuaW5nQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1wcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1wcm9wZXJ0aWVzLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVQcm9wZXJ0aWVzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZmllbGRTaXplczoge2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9W10gPSBbXG4gICAge2xhYmVsOiAnTm9ybWFsJywgdmFsdWU6ICdub3JtYWwnfSwge2xhYmVsOiAnU21hbGwnLCB2YWx1ZTogJ3NtYWxsJ30sXG4gICAge2xhYmVsOiAnU21hbGxlcicsIHZhbHVlOiAnc21hbGxlcid9LCB7bGFiZWw6ICdUaW55JywgdmFsdWU6ICd0aW55J30sXG4gICAge2xhYmVsOiAnTWluaScsIHZhbHVlOiAnbWluaSd9XG4gIF07XG4gIGdldCBmaWVsZFNpemVzKCk6IHtsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRTaXplcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyeTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsPjtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0gW107XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfZW5hYmxlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgZ2V0IGVuYWJsZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gIH1cblxuICBwcml2YXRlIF9wcm9wZXJ0aWVzRm9ybTogT2JzZXJ2YWJsZTxGb3JtR3JvdXA+O1xuICBnZXQgcHJvcGVydGllc0Zvcm0oKTogT2JzZXJ2YWJsZTxGb3JtR3JvdXA+IHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc0Zvcm07XG4gIH1cblxuICBwcml2YXRlIF9oYXNDaG9pY2VzOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgaGFzQ2hvaWNlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5faGFzQ2hvaWNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2N1clZpc2liaWxpdHk6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyVmlzaWJpbGl0eSgpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1clZpc2liaWxpdHk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhUmVwczogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJGb3JtdWxhUmVwcygpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcm11bGFSZXBzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyQ2hvaWNlc0ZpbHRlcjogc3RyaW5nO1xuICBnZXQgY3VyQ2hvaWNlc0ZpbHRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9yY2VWYWx1ZTogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJGb3JjZVZhbHVlKCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9yY2VWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckZvcm11bGE6IHN0cmluZ3xudWxsO1xuICBnZXQgY3VyRm9ybXVsYSgpOiBzdHJpbmd8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckZvcm11bGE7XG4gIH1cblxuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzOiBzdHJpbmdbXSA9IFtdO1xuICBnZXQgY29uZGl0aW9uYWxCcmFuY2hlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXM7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gIGdldCB2YWxpZGF0aW9uQ29uZGl0aW9ucygpOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHdhcm5pbmdDb25kaXRpb25zKCk6IFdhcm5pbmdDb25kaXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uOiBzdHJpbmc7XG4gIGdldCBuZXh0U2xpZGVDb25kaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnM6IHN0cmluZ1tdO1xuICBnZXQgdHJpZ2dlckNvbmRpdGlvbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucztcbiAgfVxuXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZTogKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbCkgPT4gYm9vbGVhbiA9XG4gICAgICAobm9kZUVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiBub2RlRW50cnkgIT0gbnVsbCAmJiBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUVudHJ5Lm5vZGUpO1xuICAgICAgfVxuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlPcHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWaXNpYmlsaXR5RXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRWaXNpYmlsaXR5U3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhUmVwc0V2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNGaWx0ZXJFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNGaWx0ZXJTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcmNlVmFsdWVFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcmNlVmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3NhdmVFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc2F2ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgICAgIHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlcixcbiAgKSB7XG4gICAgdGhpcy5fbm9kZUVudHJ5ID0gX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViID1cbiAgICAgICAgX3NlcnZpY2UuY2hvaWNlc09yaWdpbnMuc3Vic2NyaWJlKChjKSA9PiB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9IGMgfHwgW10pO1xuXG4gICAgdGhpcy5fZW5hYmxlZCA9IHRoaXMuX25vZGVFbnRyeS5waXBlKG1hcCgobikgPT4gbiAhPSBudWxsKSk7XG5cbiAgICB0aGlzLl9pbml0Rm9ybSgpO1xuICAgIHRoaXMuX2luaXRWaXNpYmlsaXR5RWRpdCgpO1xuICAgIHRoaXMuX2luaXRDb25kaXRpb25hbEJyYW5jaEVkaXQoKTtcbiAgICB0aGlzLl9pbml0Rm9ybXVsYVJlcHNFZGl0KCk7XG4gICAgdGhpcy5faW5pdENob2ljZXNGaWx0ZXJFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcmNlVmFsdWVFZGl0KCk7XG4gICAgdGhpcy5faW5pdFZhbGlkYXRpb25Db25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdEFkZFZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0UmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRXYXJuaW5nQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVdhcm5pbmdDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0TmV4dFNsaWRlQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRUcmlnZ2VyQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVRyaWdnZXJDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0U2F2ZSgpO1xuICB9XG5cbiAgZWRpdFZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZpc2liaWxpdHlFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdENvbmRpdGlvbmFsQnJhbmNoKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYVJlcHMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JtdWxhKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRGb3JjZVZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0V2FybmluZ0NvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdE5leHRTbGlkZUNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRUcmlnZ2VyQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBpc0ZpZWxkKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBub2RlRW50cnkgIT0gbnVsbCAmJiBpc0ZpZWxkKG5vZGVFbnRyeS5ub2RlKTtcbiAgfVxuXG4gIGlzTnVtZXJpY0ZpZWxkKG5vZGU6IEFqZk5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNGaWVsZChub2RlKSAmJiBpc051bWJlckZpZWxkKG5vZGUgYXMgQWpmRmllbGQpO1xuICB9XG5cbiAgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGU6IEFqZk5vZGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNGaWVsZChub2RlKSAmJiBpc0ZpZWxkV2l0aENob2ljZXMobm9kZSBhcyBBamZGaWVsZCk7XG4gIH1cblxuICBzYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVFdnQuZW1pdCgpO1xuICB9XG5cbiAgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuY2FuY2VsTm9kZUVudHJ5RWRpdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX3Zpc2liaWxpdHlPcHRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fc2F2ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnQucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnByb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLCBjb25kaXRpb25hbEJyYW5jaGVzOiB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICAgIGZpbHRlcigobikgPT4gbiAhPSBudWxsKSwgbWFwKChuKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlPcHRTdWIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eU9wdFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eVN1YiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbiA9IG4hO1xuXG4gICAgICAgICAgY29uc3QgdmlzaWJpbGl0eSA9IG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlPcHQgPVxuICAgICAgICAgICAgICBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID8gdGhpcy5fZ3Vlc3NWaXNpYmlsaXR5T3B0KG4ubm9kZS52aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICAgICAgbGV0IGNvbnRyb2xzOiBhbnkgPSB7XG4gICAgICAgICAgICBuYW1lOiBbbi5ub2RlLm5hbWUsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgbGFiZWw6IG4ubm9kZS5sYWJlbCxcbiAgICAgICAgICAgIHZpc2liaWxpdHlPcHQ6IFt2aXNpYmlsaXR5T3B0LCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IFt2aXNpYmlsaXR5LCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXNOdW06IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSA9IFtdO1xuXG4gICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBybiA9IDxBamZSZXBlYXRpbmdDb250YWluZXJOb2RlPm4ubm9kZTtcblxuICAgICAgICAgICAgY29uc3QgZm9ybXVsYVJlcHMgPSBybi5mb3JtdWxhUmVwcyAhPSBudWxsID8gcm4uZm9ybXVsYVJlcHMuZm9ybXVsYSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcm11bGFSZXBzID0gW2Zvcm11bGFSZXBzLCBWYWxpZGF0b3JzLnJlcXVpcmVkXTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1pblJlcHMgPSBybi5taW5SZXBzO1xuICAgICAgICAgICAgY29udHJvbHMubWF4UmVwcyA9IHJuLm1heFJlcHM7XG5cbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gZm9ybXVsYVJlcHM7XG5cbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1JlcHNWYWxpZGl0eSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZChuKSkge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSA8QWpmRmllbGQ+bi5ub2RlO1xuXG4gICAgICAgICAgICBsZXQgZm9yY2VWYWx1ZTogc3RyaW5nfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgbGV0IG5vdEVtcHR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IFZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgICAgaWYgKGZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAoZmllbGQudmFsaWRhdGlvbi5mb3JjZVZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3JjZVZhbHVlID0gZmllbGQudmFsaWRhdGlvbi5mb3JjZVZhbHVlLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBub3RFbXB0eSA9IGZpZWxkLnZhbGlkYXRpb24ubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSAoZmllbGQudmFsaWRhdGlvbi5jb25kaXRpb25zIHx8IFtdKS5tYXAoYyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtjb25kaXRpb246IGMuY29uZGl0aW9uLCBlcnJvck1lc3NhZ2U6IGMuZXJyb3JNZXNzYWdlfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBub3RFbXB0eVc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCB3YXJuaW5nQ29uZGl0aW9uczogV2FybmluZ0NvbmRpdGlvbltdID0gW107XG4gICAgICAgICAgICBpZiAoZmllbGQud2FybmluZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIG5vdEVtcHR5VyA9IGZpZWxkLndhcm5pbmcubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgICAgd2FybmluZ0NvbmRpdGlvbnMgPSAoZmllbGQud2FybmluZy5jb25kaXRpb25zIHx8IFtdKS5tYXAodyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtjb25kaXRpb246IHcuY29uZGl0aW9uLCB3YXJuaW5nTWVzc2FnZTogdy53YXJuaW5nTWVzc2FnZX07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZm9ybXVsYSA9IGZpZWxkLmZvcm11bGEgIT0gbnVsbCA/IGZpZWxkLmZvcm11bGEuZm9ybXVsYSA6IG51bGw7XG5cbiAgICAgICAgICAgIGNvbnRyb2xzLmRlc2NyaXB0aW9uID0gZmllbGQuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBjb250cm9scy5kZWZhdWx0VmFsdWUgPSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5zaXplID0gZmllbGQuc2l6ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcm11bGEgPSBmb3JtdWxhO1xuICAgICAgICAgICAgY29udHJvbHMuZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5ub3RFbXB0eSA9IG5vdEVtcHR5O1xuICAgICAgICAgICAgY29udHJvbHMudmFsaWRhdGlvbkNvbmRpdGlvbnMgPSBbdmFsaWRhdGlvbkNvbmRpdGlvbnMsIFtdXTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5V2FybmluZyA9IG5vdEVtcHR5VztcbiAgICAgICAgICAgIGNvbnRyb2xzLndhcm5pbmdDb25kaXRpb25zID0gW3dhcm5pbmdDb25kaXRpb25zLCBbXV07XG4gICAgICAgICAgICBjb250cm9scy5uZXh0U2xpZGVDb25kaXRpb24gPSBbZmllbGQubmV4dFNsaWRlQ29uZGl0aW9uXTtcblxuICAgICAgICAgICAgdGhpcy5fY3VyRm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhID0gZm9ybXVsYTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zID0gdmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHdhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpY0ZpZWxkKG4ubm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG51bUZpZWxkID0gPEFqZk51bWJlckZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgICAgbGV0IG1pblZhbHVlOiBhbnk7XG4gICAgICAgICAgICBsZXQgbWF4VmFsdWU6IGFueTtcbiAgICAgICAgICAgIGxldCBtaW5EaWdpdHM6IGFueTtcbiAgICAgICAgICAgIGxldCBtYXhEaWdpdHM6IGFueTtcbiAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWluVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1pblZhbHVlID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWluVmFsdWUuY29uZGl0aW9uIHx8ICcnKS5yZXBsYWNlKCckdmFsdWUgPj0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1heFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYXhWYWx1ZSA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1heFZhbHVlLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZSgnJHZhbHVlIDw9ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1pbkRpZ2l0cyA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1pbkRpZ2l0cy5jb25kaXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJycpLnJlcGxhY2UoJyR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBtYXhEaWdpdHMgPSAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhEaWdpdHMuY29uZGl0aW9uIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnKS5yZXBsYWNlKCckdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPD0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRyb2xzLm1pblZhbHVlID0gbWluVmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5tYXhWYWx1ZSA9IG1heFZhbHVlO1xuICAgICAgICAgICAgY29udHJvbHMubWluRGlnaXRzID0gbWluRGlnaXRzO1xuICAgICAgICAgICAgY29udHJvbHMubWF4RGlnaXRzID0gbWF4RGlnaXRzO1xuXG4gICAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tWYWx1ZUxpbWl0c1ZhbGlkaXR5KTtcbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja0RpZ2l0c1ZhbGlkaXR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc0ZpZWxkV2l0aENob2ljZXMobi5ub2RlKSkge1xuICAgICAgICAgICAgY29uc3QgZmllbGRXaXRoQ2hvaWNlcyA9IDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+bi5ub2RlO1xuXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckNvbmRpdGlvbnM6IHN0cmluZ1tdID1cbiAgICAgICAgICAgICAgICAoZmllbGRXaXRoQ2hvaWNlcy50cmlnZ2VyQ29uZGl0aW9ucyB8fCBbXSkubWFwKChjKSA9PiBjLmNvbmRpdGlvbik7XG5cbiAgICAgICAgICAgIGNvbnRyb2xzLmNob2ljZXNPcmlnaW5SZWYgPSAoZmllbGRXaXRoQ2hvaWNlcyBhcyBhbnkpLmNob2ljZXNPcmlnaW5SZWY7XG4gICAgICAgICAgICBjb250cm9scy5jaG9pY2VzRmlsdGVyID0gZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyICE9IG51bGwgP1xuICAgICAgICAgICAgICAgIGZpZWxkV2l0aENob2ljZXMuY2hvaWNlc0ZpbHRlci5mb3JtdWxhIDpcbiAgICAgICAgICAgICAgICBudWxsO1xuICAgICAgICAgICAgY29udHJvbHMuZm9yY2VFeHBhbmRlZCA9IGZpZWxkV2l0aENob2ljZXMuZm9yY2VFeHBhbmRlZDtcbiAgICAgICAgICAgIGNvbnRyb2xzLmZvcmNlTmFycm93ID0gZmllbGRXaXRoQ2hvaWNlcy5mb3JjZU5hcnJvdztcbiAgICAgICAgICAgIGNvbnRyb2xzLnRyaWdnZXJDb25kaXRpb25zID0gdHJpZ2dlckNvbmRpdGlvbnM7XG5cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zID0gdHJpZ2dlckNvbmRpdGlvbnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mYi5ncm91cChjb250cm9scyk7XG4gICAgICAgICAgZmcuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcblxuICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMgPSBuLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5tYXAoYyA9PiBjLmNvbmRpdGlvbik7XG4gICAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuXG4gICAgICAgICAgdGhpcy5faGFuZGxlQ29uZGl0aW9uYWxCcmFuY2hlc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlVmlzaWJpbGl0eUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZUNob2ljZXNGaWx0ZXJDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZUZvcm11bGFDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZVZhbGlkYXRpb25Db25kdGlvbnNDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZVdhcm5pbmdDb25kdGlvbnNDaGFuZ2UoZmcpO1xuICAgICAgICAgIHRoaXMuX2hhbmRsZU5leHRTbGlkZUNvbmRpdGlvbkNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlVHJpZ2dlckNvbmR0aW9uc0NoYW5nZShmZyk7XG5cbiAgICAgICAgICByZXR1cm4gZmc7XG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KDEpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVdhcm5pbmdDb25kaXRpb25EaWFsb2coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3RyaWdnZXJDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndHJpZ2dlckNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRUcmlnZ2VyQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd3YXJuaW5nQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICBjb25zdCB3ID0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICAgICAgICBjbXAuY29uZGl0aW9uID0gdy5jb25kaXRpb247XG4gICAgICAgICAgICAgIGNtcC53YXJuaW5nTWVzc2FnZSA9IHcud2FybmluZ01lc3NhZ2U7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kOiBXYXJuaW5nQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2YWxpZGF0aW9uQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZhbGlkYXRpb25Db25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICAgICAgICBjbXAuY29uZGl0aW9uID0gdi5jb25kaXRpb247XG4gICAgICAgICAgICAgIGNtcC5lcnJvck1lc3NhZ2UgPSB2LmVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbmQ6IFZhbGlkYXRpb25Db25kaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcmNlVmFsdWVFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9yY2VWYWx1ZSddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROZXh0U2xpZGVDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ25leHRTbGlkZUNvbmRpdGlvbiddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9ybXVsYUV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGEnXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybXVsYVJlcHNFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc1N1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9ybXVsYVJlcHNFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhUmVwcyddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Nob2ljZXNGaWx0ZXInXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBjYklkeCA9IHJbMF07XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGNiSWR4IDwgMCB8fCBjYklkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1tjYklkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaXNpYmlsaXR5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0VmlzaWJpbGl0eUV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3Zpc2liaWxpdHknXTtcbiAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gSlNPTi5zdHJpbmdpZnkodjEudHJpZ2dlckNvbmRpdGlvbnMpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYyLnRyaWdnZXJDb25kaXRpb25zKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zID0gdi50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVdhcm5pbmdDb25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gSlNPTi5zdHJpbmdpZnkodjEud2FybmluZ0NvbmRpdGlvbnMpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYyLndhcm5pbmdDb25kaXRpb25zKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gdi53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZhbGlkYXRpb25Db25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gSlNPTi5zdHJpbmdpZnkodjEudmFsaWRhdGlvbkNvbmRpdGlvbnMpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIudmFsaWRhdGlvbkNvbmRpdGlvbnMpKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2LnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JjZVZhbHVlID09PSB2Mi5mb3JjZVZhbHVlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gdi5mb3JjZVZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU5leHRTbGlkZUNvbmRpdGlvbkNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEubmV4dFNsaWRlQ29uZGl0aW9uID09PSB2Mi5uZXh0U2xpZGVDb25kaXRpb24pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbiA9IHYubmV4dFNsaWRlQ29uZGl0aW9uO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5uZXh0U2xpZGVDb25kaXRpb24gPT09IHYyLm5leHRTbGlkZUNvbmRpdGlvbikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uID0gdi5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcm11bGEgPT09IHYyLmZvcm11bGEpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGEgPSB2LmZvcm11bGE7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9ybXVsYVJlcHMgPT09IHYyLmZvcm11bGFSZXBzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhUmVwcyA9IHYuZm9ybXVsYVJlcHM7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuY2hvaWNlc0ZpbHRlciA9PT0gdjIuY2hvaWNlc0ZpbHRlcikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlciA9IHYuY2hvaWNlc0ZpbHRlcjtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiB2MS5jb25kaXRpb25hbEJyYW5jaGVzTnVtID09PSB2Mi5jb25kaXRpb25hbEJyYW5jaGVzTnVtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYk51bTogbnVtYmVyID0gdi5jb25kaXRpb25hbEJyYW5jaGVzTnVtO1xuICAgICAgICAgICAgICBjb25zdCBjdXJDYk51bSA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICBpZiAoY3VyQ2JOdW0gPCBjYk51bSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdDYnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGN1ckNiTnVtOyBpIDwgY2JOdW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgbmV3Q2JzLnB1c2goYWx3YXlzQ29uZGl0aW9uKCkuY29uZGl0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMuY29uY2F0KG5ld0Nicyk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyQ2JOdW0gPiBjYk51bSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMuc3BsaWNlKDAsIGN1ckNiTnVtIC0gY2JOdW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEudmlzaWJpbGl0eU9wdCA9PT0gdjIudmlzaWJpbGl0eU9wdCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlPcHQgPSB2LnZpc2liaWxpdHlPcHQ7XG4gICAgICAgICAgICAgIGxldCBuZXdDb25kaXRpb246IHN0cmluZ3xudWxsO1xuICAgICAgICAgICAgICBzd2l0Y2ggKHZpc2liaWxpdHlPcHQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhbHdheXMnOlxuICAgICAgICAgICAgICAgICAgbmV3Q29uZGl0aW9uID0gYWx3YXlzQ29uZGl0aW9uKCkuY29uZGl0aW9uO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV2ZXInOlxuICAgICAgICAgICAgICAgICAgbmV3Q29uZGl0aW9uID0gbmV2ZXJDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgbmV3Q29uZGl0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbmV3Q29uZGl0aW9uO1xuICAgICAgICAgICAgICBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddLnNldFZhbHVlKG5ld0NvbmRpdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIodiA9PiB2LnZpc2liaWxpdHlPcHQgPT09ICdjb25kaXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS52aXNpYmlsaXR5ID09PSB2Mi52aXNpYmlsaXR5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gdi52aXNpYmlsaXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2d1ZXNzVmlzaWJpbGl0eU9wdChjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHN0cmluZyB7XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2Fsd2F5cyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb24uY29uZGl0aW9uLmxvY2FsZUNvbXBhcmUobmV2ZXJDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ25ldmVyJztcbiAgICB9XG4gICAgcmV0dXJuICdjb25kaXRpb24nO1xuICB9XG59XG4iXX0=