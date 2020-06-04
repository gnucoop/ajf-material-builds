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
import { __decorate, __metadata } from "tslib";
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
    let AjfFbNodeProperties = class AjfFbNodeProperties {
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
    };
    AjfFbNodeProperties = __decorate([
        Component({
            selector: 'ajf-fb-node-properties',
            template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<div class=\"ajf-header\">\n  <h3 translate>Properties</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label translate>Visibility</mat-label>\n          <mat-select\n              formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\">\n            <mat-option value=\"always\" translate>Always</mat-option>\n            <mat-option value=\"never\" translate>Never</mat-option>\n            <mat-option value=\"condition\" translate>Condition...</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button (click)=\"editVisibility()\"\n            [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n            mat-raised-button [matTooltip]=\"curVisibility || ''\">\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label translate>Branches</label></div>\n        <div>\n          <mat-slider formControlName=\"conditionalBranchesNum\"\n              thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label translate>Repetitions</label></div>\n          <div>\n            <button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label translate>Min repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"minReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n          <div><label translate>Max repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"maxReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label translate>Field size</mat-label>\n            <mat-select formControlName=\"size\"\n                [placeholder]=\"'Size' | translate\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\">\n                {{ fieldSize.label }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea matInput formControlName=\"description\"\n                [placeholder]=\"'Description' | translate\"></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | translate\">\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Formula</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label translate>Force value</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | translate\">\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label>{{ 'Validation' | translate }}</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No conditions</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\">\n            <button (click)=\"editValidationCondition(idx)\"\n                mat-raised-button [matTooltip]=\"validationCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Warnings</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div  *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No warnings</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\">\n            <button (click)=\"editWarningCondition(idx)\"\n                mat-raised-button [matTooltip]=\"warningCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Go to next slide condition</label></div>\n          <div>\n            <button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label translate>Choices origins</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | translate\">\n                <mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.name\">\n                  {{ choicesOrigin.label || choicesOrigin.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label translate>Choices filter</label></div>\n            <div>\n              <button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label translate>Trigger selection</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon>\n            </div>\n            <div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n                class=\"ajf-validation-row ajf-emph\" translate>No trigger condition </div>\n            <div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\">\n              <button (click)=\"editTriggerCondition(idx)\"\n                  mat-raised-button [matTooltip]=\"triggerCondition\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon>\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            AjfFormBuilderService,
            MatDialog,
            FormBuilder])
    ], AjfFbNodeProperties);
    return AjfFbNodeProperties;
})();
export { AjfFbNodeProperties };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFPTCxPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYix3QkFBd0IsRUFDekIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9FLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBRVosaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0IsV0FBVyxFQUEwQixVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRyxPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsYUFBYSxFQUNiLFFBQVEsRUFDUixjQUFjLEVBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQTBCLHFCQUFxQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEYsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDMUYsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFHcEYsU0FBUyxpQkFBaUIsQ0FBQyxDQUFrQjtJQUMzQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8s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KiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDaG9pY2VzT3JpZ2luLFxuICBBamZGaWVsZCxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlcyxcbiAgQWpmTm9kZSxcbiAgQWpmTnVtYmVyRmllbGQsXG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNOdW1iZXJGaWVsZCxcbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgYWx3YXlzQ29uZGl0aW9uLCBuZXZlckNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwdWJsaXNoUmVwbGF5LFxuICByZWZDb3VudCxcbiAgd2l0aExhdGVzdEZyb21cbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksIEFqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi92YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3dhcm5pbmctY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuXG5cbmZ1bmN0aW9uIGNoZWNrUmVwc1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwge1xuICBjb25zdCBtaW5SZXBzID0gYy52YWx1ZS5taW5SZXBzO1xuICBjb25zdCBtYXhSZXBzID0gYy52YWx1ZS5tYXhSZXBzO1xuICBpZiAobWluUmVwcyAhPSBudWxsICYmIG1heFJlcHMgIT0gbnVsbCAmJiBtaW5SZXBzID4gbWF4UmVwcykge1xuICAgIHJldHVybiB7cmVwczogJ01pbiByZXBldGlvbnMgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggcmVwZXRpdGlvbnMnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY2hlY2tWYWx1ZUxpbWl0c1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwge1xuICBjb25zdCBtaW5WYWx1ZSA9IGMudmFsdWUubWluVmFsdWU7XG4gIGNvbnN0IG1heFZhbHVlID0gYy52YWx1ZS5tYXhWYWx1ZTtcbiAgaWYgKG1pblZhbHVlICE9IG51bGwgJiYgbWF4VmFsdWUgIT0gbnVsbCAmJiBtaW5WYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgcmV0dXJuIHt2YWx1ZUxpbWl0OiAnTWluIHZhbHVlIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IHZhbHVlJ307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlnaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX18bnVsbCB7XG4gIGNvbnN0IG1pbkRpZ2l0cyA9IGMudmFsdWUubWluRGlnaXRzO1xuICBjb25zdCBtYXhEaWdpdHMgPSBjLnZhbHVlLm1heERpZ2l0cztcbiAgaWYgKG1pbkRpZ2l0cyAhPSBudWxsICYmIG1heERpZ2l0cyAhPSBudWxsICYmIG1pbkRpZ2l0cyA+IG1heERpZ2l0cykge1xuICAgIHJldHVybiB7ZGlnaXRzOiAnTWluIGRpZ2l0cyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCBkaWdpdHMnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdhcm5pbmdDb25kaXRpb24ge1xuICBjb25kaXRpb246IHN0cmluZztcbiAgd2FybmluZ01lc3NhZ2U6IHN0cmluZztcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS1wcm9wZXJ0aWVzJyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLXByb3BlcnRpZXMuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLXByb3BlcnRpZXMuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZVByb3BlcnRpZXMgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9maWVsZFNpemVzOiB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ31bXSA9IFtcbiAgICB7bGFiZWw6ICdOb3JtYWwnLCB2YWx1ZTogJ25vcm1hbCd9LCB7bGFiZWw6ICdTbWFsbCcsIHZhbHVlOiAnc21hbGwnfSxcbiAgICB7bGFiZWw6ICdTbWFsbGVyJywgdmFsdWU6ICdzbWFsbGVyJ30sIHtsYWJlbDogJ1RpbnknLCB2YWx1ZTogJ3RpbnknfSxcbiAgICB7bGFiZWw6ICdNaW5pJywgdmFsdWU6ICdtaW5pJ31cbiAgXTtcbiAgZ2V0IGZpZWxkU2l6ZXMoKToge2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9W10ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZFNpemVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJ5OiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+O1xuICBnZXQgbm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cnk7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10gPSBbXTtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IEFqZkNob2ljZXNPcmlnaW48YW55PltdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9lbmFibGVkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgZW5hYmxlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnRpZXNGb3JtOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD47XG4gIGdldCBwcm9wZXJ0aWVzRm9ybSgpOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD4ge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzRm9ybTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0Nob2ljZXM6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBoYXNDaG9pY2VzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNDaG9pY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyVmlzaWJpbGl0eTogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJWaXNpYmlsaXR5KCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyVmlzaWJpbGl0eTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckZvcm11bGFSZXBzOiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1ckZvcm11bGFSZXBzKCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYVJlcHM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJDaG9pY2VzRmlsdGVyOiBzdHJpbmc7XG4gIGdldCBjdXJDaG9pY2VzRmlsdGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckNob2ljZXNGaWx0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JjZVZhbHVlOiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1ckZvcmNlVmFsdWUoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJGb3JjZVZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9ybXVsYTogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJGb3JtdWxhKCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoZXM6IHN0cmluZ1tdID0gW107XG4gIGdldCBjb25kaXRpb25hbEJyYW5jaGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcztcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHZhbGlkYXRpb25Db25kaXRpb25zKCk6IFZhbGlkYXRpb25Db25kaXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICBnZXQgd2FybmluZ0NvbmRpdGlvbnMoKTogV2FybmluZ0NvbmRpdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb246IHN0cmluZztcbiAgZ2V0IG5leHRTbGlkZUNvbmRpdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb247XG4gIH1cblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW107XG4gIGdldCB0cmlnZ2VyQ29uZGl0aW9ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zO1xuICB9XG5cbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlOiAobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsKSA9PiBib29sZWFuID1cbiAgICAgIChub2RlRW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5vZGVFbnRyeSAhPSBudWxsICYmIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlRW50cnkubm9kZSk7XG4gICAgICB9XG5cbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU9wdFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF92aXNpYmlsaXR5U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF92YWxpZGF0aW9uQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbkRpYWxvZ1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFZpc2liaWxpdHlFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdFZpc2liaWxpdHlTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q2hvaWNlc0ZpbHRlckV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9yY2VWYWx1ZUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfc2F2ZUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9zYXZlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxuICAgICAgcHJpdmF0ZSBfZmI6IEZvcm1CdWlsZGVyLFxuICApIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBfc2VydmljZS5lZGl0ZWROb2RlRW50cnk7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnNTdWIgPVxuICAgICAgICBfc2VydmljZS5jaG9pY2VzT3JpZ2lucy5zdWJzY3JpYmUoKGMpID0+IHRoaXMuX2Nob2ljZXNPcmlnaW5zID0gYyB8fCBbXSk7XG5cbiAgICB0aGlzLl9lbmFibGVkID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUobWFwKChuKSA9PiBuICE9IG51bGwpKTtcblxuICAgIHRoaXMuX2luaXRGb3JtKCk7XG4gICAgdGhpcy5faW5pdFZpc2liaWxpdHlFZGl0KCk7XG4gICAgdGhpcy5faW5pdENvbmRpdGlvbmFsQnJhbmNoRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhUmVwc0VkaXQoKTtcbiAgICB0aGlzLl9pbml0Q2hvaWNlc0ZpbHRlckVkaXQoKTtcbiAgICB0aGlzLl9pbml0Rm9ybXVsYUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Rm9yY2VWYWx1ZUVkaXQoKTtcbiAgICB0aGlzLl9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdEFkZFdhcm5pbmdDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0UmVtb3ZlV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXROZXh0U2xpZGVDb25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdEFkZFRyaWdnZXJDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRTYXZlKCk7XG4gIH1cblxuICBlZGl0VmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uYWxCcmFuY2goaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXRGb3JtdWxhUmVwcygpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdENob2ljZXNGaWx0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdEZvcm11bGEoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdEZvcmNlVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdFZhbGlkYXRpb25Db25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXRXYXJuaW5nQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlV2FybmluZ0NvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0TmV4dFNsaWRlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdFRyaWdnZXJDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGlzRmllbGQobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGVFbnRyeSAhPSBudWxsICYmIGlzRmllbGQobm9kZUVudHJ5Lm5vZGUpO1xuICB9XG5cbiAgaXNOdW1lcmljRmllbGQobm9kZTogQWpmTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzTnVtYmVyRmllbGQobm9kZSBhcyBBamZGaWVsZCk7XG4gIH1cblxuICBpc0ZpZWxkV2l0aENob2ljZXMobm9kZTogQWpmTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlIGFzIEFqZkZpZWxkKTtcbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jYW5jZWxOb2RlRW50cnlFZGl0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fdmlzaWJpbGl0eU9wdFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JtdWxhUmVwc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Nob2ljZXNGaWx0ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JtdWxhU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9yY2VWYWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFZpc2liaWxpdHlTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9zYXZlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlU3ViID0gdGhpcy5fc2F2ZUV2dC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMucHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSB7Li4uZmcudmFsdWUsIGNvbmRpdGlvbmFsQnJhbmNoZXM6IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXN9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlLnNhdmVOb2RlRW50cnkodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5fcHJvcGVydGllc0Zvcm0gPSB0aGlzLl9ub2RlRW50cnkucGlwZShcbiAgICAgICAgZmlsdGVyKChuKSA9PiBuICE9IG51bGwpLCBtYXAoKG4pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fdmlzaWJpbGl0eU9wdFN1YiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5T3B0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5U3ViICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuID0gbiE7XG5cbiAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IG4ubm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbiA6IG51bGw7XG4gICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9XG4gICAgICAgICAgICAgIG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyB0aGlzLl9ndWVzc1Zpc2liaWxpdHlPcHQobi5ub2RlLnZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgICAgICBsZXQgY29udHJvbHM6IGFueSA9IHtcbiAgICAgICAgICAgIG5hbWU6IFtuLm5vZGUubmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBsYWJlbDogbi5ub2RlLmxhYmVsLFxuICAgICAgICAgICAgdmlzaWJpbGl0eU9wdDogW3Zpc2liaWxpdHlPcHQsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgdmlzaWJpbGl0eTogW3Zpc2liaWxpdHksIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc051bTogbi5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XG5cbiAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG4ubm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJuID0gPEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGU+bi5ub2RlO1xuXG4gICAgICAgICAgICBjb25zdCBmb3JtdWxhUmVwcyA9IHJuLmZvcm11bGFSZXBzICE9IG51bGwgPyBybi5mb3JtdWxhUmVwcy5mb3JtdWxhIDogbnVsbDtcblxuICAgICAgICAgICAgY29udHJvbHMuZm9ybXVsYVJlcHMgPSBbZm9ybXVsYVJlcHMsIFZhbGlkYXRvcnMucmVxdWlyZWRdO1xuICAgICAgICAgICAgY29udHJvbHMubWluUmVwcyA9IHJuLm1pblJlcHM7XG4gICAgICAgICAgICBjb250cm9scy5tYXhSZXBzID0gcm4ubWF4UmVwcztcblxuICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSBmb3JtdWxhUmVwcztcblxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrUmVwc1ZhbGlkaXR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc0ZpZWxkKG4pKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IDxBamZGaWVsZD5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCBmb3JjZVZhbHVlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgbm90RW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gICAgICAgICAgICBpZiAoZmllbGQudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uLmZvcmNlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvcmNlVmFsdWUgPSBmaWVsZC52YWxpZGF0aW9uLmZvcmNlVmFsdWUuY29uZGl0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5vdEVtcHR5ID0gZmllbGQudmFsaWRhdGlvbi5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IChmaWVsZC52YWxpZGF0aW9uLmNvbmRpdGlvbnMgfHwgW10pLm1hcChjID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2NvbmRpdGlvbjogYy5jb25kaXRpb24sIGVycm9yTWVzc2FnZTogYy5lcnJvck1lc3NhZ2V9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5vdEVtcHR5VzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHdhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgICAgICAgICAgIGlmIChmaWVsZC53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbm90RW1wdHlXID0gZmllbGQud2FybmluZy5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgICB3YXJuaW5nQ29uZGl0aW9ucyA9IChmaWVsZC53YXJuaW5nLmNvbmRpdGlvbnMgfHwgW10pLm1hcCh3ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2NvbmRpdGlvbjogdy5jb25kaXRpb24sIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmb3JtdWxhID0gZmllbGQuZm9ybXVsYSAhPSBudWxsID8gZmllbGQuZm9ybXVsYS5mb3JtdWxhIDogbnVsbDtcblxuICAgICAgICAgICAgY29udHJvbHMuZGVzY3JpcHRpb24gPSBmaWVsZC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGNvbnRyb2xzLmRlZmF1bHRWYWx1ZSA9IGZpZWxkLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLnNpemUgPSBmaWVsZC5zaXplO1xuICAgICAgICAgICAgY29udHJvbHMuZm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5ID0gbm90RW1wdHk7XG4gICAgICAgICAgICBjb250cm9scy52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IFt2YWxpZGF0aW9uQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgICAgY29udHJvbHMubm90RW1wdHlXYXJuaW5nID0gbm90RW1wdHlXO1xuICAgICAgICAgICAgY29udHJvbHMud2FybmluZ0NvbmRpdGlvbnMgPSBbd2FybmluZ0NvbmRpdGlvbnMsIFtdXTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5leHRTbGlkZUNvbmRpdGlvbiA9IFtmaWVsZC5uZXh0U2xpZGVDb25kaXRpb25dO1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGEgPSBmb3JtdWxhO1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gd2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljRmllbGQobi5ub2RlKSkge1xuICAgICAgICAgICAgY29uc3QgbnVtRmllbGQgPSA8QWpmTnVtYmVyRmllbGQ+bi5ub2RlO1xuXG4gICAgICAgICAgICBsZXQgbWluVmFsdWU6IGFueTtcbiAgICAgICAgICAgIGxldCBtYXhWYWx1ZTogYW55O1xuICAgICAgICAgICAgbGV0IG1pbkRpZ2l0czogYW55O1xuICAgICAgICAgICAgbGV0IG1heERpZ2l0czogYW55O1xuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5taW5WYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWluVmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5WYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA+PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heFZhbHVlID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4VmFsdWUuY29uZGl0aW9uIHx8ICcnKS5yZXBsYWNlKCckdmFsdWUgPD0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1pbkRpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWluRGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWluRGlnaXRzLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJykucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1heERpZ2l0cy5jb25kaXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJycpLnJlcGxhY2UoJyR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbHMubWluVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heFZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5taW5EaWdpdHMgPSBtaW5EaWdpdHM7XG4gICAgICAgICAgICBjb250cm9scy5tYXhEaWdpdHMgPSBtYXhEaWdpdHM7XG5cbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkpO1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrRGlnaXRzVmFsaWRpdHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRmllbGRXaXRoQ2hvaWNlcyhuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFdpdGhDaG9pY2VzID0gPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW10gPVxuICAgICAgICAgICAgICAgIChmaWVsZFdpdGhDaG9pY2VzLnRyaWdnZXJDb25kaXRpb25zIHx8IFtdKS5tYXAoKGMpID0+IGMuY29uZGl0aW9uKTtcblxuICAgICAgICAgICAgY29udHJvbHMuY2hvaWNlc09yaWdpblJlZiA9IChmaWVsZFdpdGhDaG9pY2VzIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICAgIGNvbnRyb2xzLmNob2ljZXNGaWx0ZXIgPSBmaWVsZFdpdGhDaG9pY2VzLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyLmZvcm11bGEgOlxuICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZUV4cGFuZGVkID0gZmllbGRXaXRoQ2hvaWNlcy5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgICAgY29udHJvbHMuZm9yY2VOYXJyb3cgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgY29udHJvbHMudHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcblxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2ZiLmdyb3VwKGNvbnRyb2xzKTtcbiAgICAgICAgICBmZy5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuXG4gICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChjID0+IGMuY29uZGl0aW9uKTtcbiAgICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IG4ubm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbiA6IG51bGw7XG5cbiAgICAgICAgICB0aGlzLl9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9yY2VWYWx1ZUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlTmV4dFNsaWRlQ29uZGl0aW9uQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnKTtcblxuICAgICAgICAgIHJldHVybiBmZztcbiAgICAgICAgfSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndHJpZ2dlckNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3MucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgY21wLmNvbmRpdGlvbiA9IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVdhcm5pbmdDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNvbnN0IHcgPSB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB3LmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgY21wLndhcm5pbmdNZXNzYWdlID0gdy53YXJuaW5nTWVzc2FnZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbmQ6IFdhcm5pbmdDb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgICAgICAgIGNtcC5jb25kaXRpb24gPSB2LmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgY21wLmVycm9yTWVzc2FnZSA9IHYuZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAoY29uZDogVmFsaWRhdGlvbkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF0gPSBjb25kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9yY2VWYWx1ZUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdEZvcmNlVmFsdWVFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JjZVZhbHVlJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snbmV4dFNsaWRlQ29uZGl0aW9uJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRGb3JtdWxhRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9ybXVsYSddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhUmVwc0VkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRGb3JtdWxhUmVwc0V2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGFSZXBzJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNGaWx0ZXJFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snY2hvaWNlc0ZpbHRlciddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25kaXRpb25hbEJyYW5jaEVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGNiSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoY2JJZHggPCAwIHx8IGNiSWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1tjYklkeF07XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzW2NiSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpc2liaWxpdHlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddO1xuICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVHJpZ2dlckNvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS50cmlnZ2VyQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIudHJpZ2dlckNvbmRpdGlvbnMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB2LnRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS53YXJuaW5nQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIud2FybmluZ0NvbmRpdGlvbnMpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMgPSB2Lndhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS52YWxpZGF0aW9uQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2Mi52YWxpZGF0aW9uQ29uZGl0aW9ucykpLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHYudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9yY2VWYWx1ZUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9yY2VWYWx1ZVN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlcy5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLmZvcmNlVmFsdWUgPT09IHYyLmZvcmNlVmFsdWUpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcmNlVmFsdWUgPSB2LmZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTmV4dFNsaWRlQ29uZGl0aW9uQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5uZXh0U2xpZGVDb25kaXRpb24gPT09IHYyLm5leHRTbGlkZUNvbmRpdGlvbikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uID0gdi5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9ybXVsYSA9PT0gdjIuZm9ybXVsYSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IHYuZm9ybXVsYTtcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhUmVwcyA9PT0gdjIuZm9ybXVsYVJlcHMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gdi5mb3JtdWxhUmVwcztcbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5jaG9pY2VzRmlsdGVyID09PSB2Mi5jaG9pY2VzRmlsdGVyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyID0gdi5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IHYxLmNvbmRpdGlvbmFsQnJhbmNoZXNOdW0gPT09IHYyLmNvbmRpdGlvbmFsQnJhbmNoZXNOdW0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNiTnVtOiBudW1iZXIgPSB2LmNvbmRpdGlvbmFsQnJhbmNoZXNOdW07XG4gICAgICAgICAgICAgIGNvbnN0IGN1ckNiTnVtID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgIGlmIChjdXJDYk51bSA8IGNiTnVtKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0Niczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gY3VyQ2JOdW07IGkgPCBjYk51bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBuZXdDYnMucHVzaChhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5jb25jYXQobmV3Q2JzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYk51bSA+IGNiTnVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5zcGxpY2UoMCwgY3VyQ2JOdW0gLSBjYk51bSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS52aXNpYmlsaXR5T3B0ID09PSB2Mi52aXNpYmlsaXR5T3B0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHYpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9IHYudmlzaWJpbGl0eU9wdDtcbiAgICAgICAgICAgICAgbGV0IG5ld0NvbmRpdGlvbjogc3RyaW5nfG51bGw7XG4gICAgICAgICAgICAgIHN3aXRjaCAodmlzaWJpbGl0eU9wdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXZlcic6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuZXdDb25kaXRpb247XG4gICAgICAgICAgICAgIGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J10uc2V0VmFsdWUobmV3Q29uZGl0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcih2ID0+IHYudmlzaWJpbGl0eU9wdCA9PT0gJ2NvbmRpdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLnZpc2liaWxpdHkgPT09IHYyLnZpc2liaWxpdHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSB2LnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3Vlc3NWaXNpYmlsaXR5T3B0KGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAoY29uZGl0aW9uLmNvbmRpdGlvbi5sb2NhbGVDb21wYXJlKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnYWx3YXlzJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnbmV2ZXInO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbmRpdGlvbic7XG4gIH1cbn1cbiJdfQ==