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
import { ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation } from '@angular/core';
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
            this.isRepeatingContainerNode = (nodeEntry) => {
                return nodeEntry != null && isRepeatingContainerNode(nodeEntry.node);
            };
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
                        });
                });
        }
        _initFormulaEdit() {
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
                        });
                });
        }
        _handleTriggerCondtionsChange(fg) {
            this._triggerConditionsSub = fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.triggerConditions) ===
                JSON.stringify(v2.triggerConditions)))
                .subscribe((v) => {
                this._triggerConditions = v.triggerConditions;
            });
        }
        _handleWarningCondtionsChange(fg) {
            this._warningConditionsSub = fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.warningConditions) ===
                JSON.stringify(v2.warningConditions)))
                .subscribe((v) => {
                this._warningConditions = v.warningConditions;
            });
        }
        _handleValidationCondtionsChange(fg) {
            this._validationConditionsSub = fg.valueChanges
                .pipe(distinctUntilChanged((v1, v2) => JSON.stringify(v1.validationConditions) ===
                JSON.stringify(v2.validationConditions)))
                .subscribe((v) => {
                this._validationConditions = v.validationConditions;
            });
        }
        _handleForceValueChange(fg) {
            this._forceValueSub =
                fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.forceValue === v2.forceValue))
                    .subscribe((v) => {
                    this._curForceValue = v.forceValue;
                });
        }
        _handleNextSlideConditionChange(fg) {
            this._formulaSub =
                fg.valueChanges
                    .pipe(distinctUntilChanged((v1, v2) => v1.nextSlideCondition === v2.nextSlideCondition))
                    .subscribe((v) => {
                    this._nextSlideCondition = v.nextSlideCondition;
                });
        }
        _handleFormulaChange(fg) {
            this._formulaSub =
                fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.formula === v2.formula))
                    .subscribe((v) => {
                    this._curFormula = v.formula;
                });
        }
        _handleFormulaRepsChange(fg) {
            this._formulaRepsSub =
                fg.valueChanges.pipe(distinctUntilChanged((v1, v2) => v1.formulaReps === v2.formulaReps))
                    .subscribe((v) => {
                    this._curFormulaReps = v.formulaReps;
                });
        }
        _handleChoicesFilterChange(fg) {
            this._choicesFilterSub =
                fg.valueChanges
                    .pipe(distinctUntilChanged((v1, v2) => v1.choicesFilter === v2.choicesFilter))
                    .subscribe((v) => {
                    this._curChoicesFilter = v.choicesFilter;
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
            template: "<div [style.display]=\"(enabled|async) ? 'none' : 'block'\" class=\"ajf-disabled-overlay\"></div>\n<div class=\"ajf-header\">\n  <h3 translate>Properties</h3>\n  <mat-icon (click)=\"save()\">save</mat-icon>\n  <mat-icon (click)=\"cancel()\">cancel</mat-icon>\n</div>\n<ng-container *ngIf=\"nodeEntry|async as ne\">\n  <ng-container *ngIf=\"propertiesForm|async as pf\">\n    <form [formGroup]=\"pf!\" novalidate>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"name\" [placeholder]=\"'Name' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <input matInput formControlName=\"label\" [placeholder]=\"'Label' | translate\">\n        </mat-form-field>\n      </div>\n      <div class=\"ajf-prop\">\n        <mat-form-field>\n          <mat-label translate>Visibility</mat-label>\n          <mat-select\n              formControlName=\"visibilityOpt\" [placeholder]=\"'Visible' | translate\">\n            <mat-option value=\"always\" translate>Always</mat-option>\n            <mat-option value=\"never\" translate>Never</mat-option>\n            <mat-option value=\"condition\" translate>Condition...</mat-option>\n          </mat-select>\n        </mat-form-field>\n        <button (click)=\"editVisibility()\"\n            [disabled]=\"pf!.value.visibilityOpt != 'condition'\"\n            mat-raised-button [matTooltip]=\"curVisibility || ''\">\n          <div class=\"ajf-icon-cont\">\n            <mat-icon>edit</mat-icon>\n            <span>{{ curVisibility }}</span>\n          </div>\n        </button>\n      </div>\n      <div class=\"ajf-prop\">\n        <div><label translate>Branches</label></div>\n        <div>\n          <mat-slider formControlName=\"conditionalBranchesNum\"\n              thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n        </div>\n        <div *ngFor=\"let branch of conditionalBranches; let idx = index\">\n          <button (click)=\"editConditionalBranch(idx)\" mat-raised-button [matTooltip]=\"branch\">\n            <div class=\"ajf-icon-cont\">\n              <mat-icon>edit</mat-icon>\n              <span>{{ branch }}</span>\n            </div>\n          </button>\n        </div>\n      </div>\n      <ng-template [ngIf]=\"isRepeatingContainerNode(ne)\">\n        <div class=\"ajf-prop\">\n          <div><label translate>Repetitions</label></div>\n          <div>\n            <button (click)=\"editFormulaReps()\" mat-raised-button [matTooltip]=\"curFormulaReps || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormulaReps }}</span>\n              </div>\n            </button>\n          </div>\n          <div><label translate>Min repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"minReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n          <div><label translate>Max repetitions</label></div>\n          <div>\n            <mat-slider formControlName=\"maxReps\"\n                thumbLabel tickInterval=\"auto\" min=\"1\" max=\"5\" step=\"1\"></mat-slider>\n          </div>\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"isField(ne)\">\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <mat-label translate>Field size</mat-label>\n            <mat-select formControlName=\"size\"\n                [placeholder]=\"'Size' | translate\">\n              <mat-option *ngFor=\"let fieldSize of fieldSizes\"\n                [value]=\"fieldSize.value\">\n                {{ fieldSize.label }}\n              </mat-option>\n            </mat-select>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <textarea matInput formControlName=\"description\"\n                [placeholder]=\"'Description' | translate\"></textarea>\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-form-field>\n            <input matInput formControlName=\"defaultValue\"\n              [placeholder]=\"'Default value' | translate\">\n          </mat-form-field>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Formula</label></div>\n          <div>\n            <button (click)=\"editFormula()\" mat-raised-button [matTooltip]=\"curFormula || ''\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curFormula }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <!-- <div class=\"ajf-prop\">\n          <div><label translate>Force value</label></div>\n          <div>\n            <button (click)=\"editForceValue()\" mat-raised-button [matTooltip]=\"curForceValue\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ curForceValue }}</span>\n              </div>\n            </button>\n          </div>\n        </div> -->\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmpty\" translate>Not empty</mat-checkbox>\n        </div>\n        <ng-template [ngIf]=\"isNumericField(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minValue\"\n                [placeholder]=\"'Min value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxValue\"\n                [placeholder]=\"'Max value' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"minDigits\"\n                [placeholder]=\"'Min digits' | translate\">\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <input matInput formControlName=\"maxDigits\"\n                [placeholder]=\"'Max digits' | translate\">\n            </mat-form-field>\n          </div>\n        </ng-template>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Validation</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addValidationCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div *ngIf=\"validationConditions == null || validationConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No conditions</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let validationCondition of validationConditions; let idx = index\">\n            <button (click)=\"editValidationCondition(idx)\"\n                mat-raised-button [matTooltip]=\"validationCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ validationCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeValidationCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <mat-checkbox formControlName=\"notEmptyWarning\" translate>Not empty warning</mat-checkbox>\n        </div>\n        <div class=\"ajf-prop\">\n          <div class=\"ajf-header\">\n            <label translate>Warnings</label>\n            <mat-icon class=\"ajf-pointer\" (click)=\"addWarningCondition()\">add_circle_outline</mat-icon>\n          </div>\n          <div  *ngIf=\"warningConditions == null || warningConditions.length == 0\"\n              class=\"ajf-validation-row ajf-emph\" translate>No warnings</div>\n          <div class=\"ajf-validation-row\" *ngFor=\"let warningCondition of warningConditions; let idx = index\">\n            <button (click)=\"editWarningCondition(idx)\"\n                mat-raised-button [matTooltip]=\"warningCondition.condition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ warningCondition.condition }}</span>\n              </div>\n            </button>\n            <mat-icon class=\"ajf-pointer\" (click)=\"removeWarningCondition(idx)\">remove_circle_outline</mat-icon>\n          </div>\n        </div>\n        <div class=\"ajf-prop\">\n          <div><label translate>Go to next slide condition</label></div>\n          <div>\n            <button (click)=\"editNextSlideCondition()\" mat-raised-button [matTooltip]=\"nextSlideCondition\">\n              <div class=\"ajf-icon-cont\">\n                <mat-icon>edit</mat-icon>\n                <span>{{ nextSlideCondition }}</span>\n              </div>\n            </button>\n          </div>\n        </div>\n        <ng-template [ngIf]=\"isFieldWithChoices(ne!.node)\">\n          <div class=\"ajf-prop\">\n            <mat-form-field>\n              <mat-label translate>Choices origins</mat-label>\n              <mat-select formControlName=\"choicesOriginRef\" [placeholder]=\"'Choices' | translate\">\n                <mat-option *ngFor=\"let choicesOrigin of choicesOrigins\" [value]=\"choicesOrigin.name\">\n                  {{ choicesOrigin.label || choicesOrigin.name }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div class=\"ajf-prop\">\n            <div><label translate>Choices filter</label></div>\n            <div>\n              <button (click)=\"editChoicesFilter()\" mat-raised-button [matTooltip]=\"curChoicesFilter\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ curChoicesFilter }}</span>\n                </div>\n              </button>\n            </div>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceExpanded\" translate>Force expanded selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <mat-checkbox formControlName=\"forceNarrow\" translate>Force narrow selection</mat-checkbox>\n          </div>\n          <div class=\"ajf-prop\">\n            <div class=\"ajf-header\">\n              <label translate>Trigger selection</label>\n              <mat-icon class=\"ajf-pointer\" (click)=\"addTriggerCondition()\">add_circle_outline</mat-icon>\n            </div>\n            <div *ngIf=\"triggerConditions == null || triggerConditions.length == 0\"\n                class=\"ajf-validation-row ajf-emph\" translate>No trigger condition </div>\n            <div class=\"ajf-validation-row\" *ngFor=\"let triggerCondition of triggerConditions; let idx = index\">\n              <button (click)=\"editTriggerCondition(idx)\"\n                  mat-raised-button [matTooltip]=\"triggerCondition\">\n                <div class=\"ajf-icon-cont\">\n                  <mat-icon>edit</mat-icon>\n                  <span>{{ triggerCondition }}</span>\n                </div>\n              </button>\n              <mat-icon class=\"pointer\" (click)=\"removeTriggerCondition(idx)\">remove_circle_outline</mat-icon>\n            </div>\n          </div>\n        </ng-template>\n      </ng-template>\n    </form>\n  </ng-container>\n</ng-container>\n",
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-fb-node-properties{display:block;padding:1em;position:relative}ajf-fb-node-properties mat-icon{cursor:pointer}ajf-fb-node-properties .ajf-header{display:flex;flex-direction:row;align-items:center;flex-wrap:nowrap}ajf-fb-node-properties .ajf-header>h3,ajf-fb-node-properties .ajf-header>label{flex:1 0 auto;margin-right:.5em}ajf-fb-node-properties .ajf-header>mat-icon{flex:0 0 auto;margin-left:.5em}ajf-fb-node-properties .ajf-disabled-overlay{position:absolute;top:0;right:0;bottom:0;left:0;opacity:.4;background-color:#fff}ajf-fb-node-properties .ajf-emph{font-style:italic}ajf-fb-node-properties [mat-raised-button]{margin:.5em 0}ajf-fb-node-properties [mat-raised-button].ajf-pointer{cursor:pointer}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont{display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties [mat-raised-button] .ajf-icon-cont span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;display:block;min-height:36px}ajf-fb-node-properties .ajf-validation-row{margin:.5em 0;display:flex;flex-direction:row;align-items:center}ajf-fb-node-properties .ajf-validation-row button{flex:1 1 auto}ajf-fb-node-properties .ajf-validation-row mat-icon{flex:0 0 auto}ajf-fb-node-properties .ajf-prop{margin:.5em 0}ajf-fb-node-properties mat-form-field,ajf-fb-node-properties mat-slider,ajf-fb-node-properties [mat-raised-button]{width:100%}\n"]
        }),
        __metadata("design:paramtypes", [AjfFormBuilderService, MatDialog,
            FormBuilder])
    ], AjfFbNodeProperties);
    return AjfFbNodeProperties;
})();
export { AjfFbNodeProperties };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFPTCxPQUFPLEVBQ1Asa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYix3QkFBd0IsRUFDekIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWUsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9FLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFFWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixXQUFXLEVBQTBCLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxhQUFhLEVBQ2IsUUFBUSxFQUNSLGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBMEIscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCO0lBQzNDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ2hDLE1B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ZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUMzQyxNQUFNO3dCQUNSLEtBQUssT0FBTzs0QkFDVixZQUFZLEdBQUcsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUMxQyxNQUFNO3dCQUNSOzRCQUNFLFlBQVksR0FBRyxJQUFJLENBQUM7cUJBQ3ZCO29CQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO29CQUNuQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDO1FBRU8sbUJBQW1CLENBQUMsU0FBdUI7WUFDakQsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hFLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZFLE9BQU8sT0FBTyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQztLQUNGLENBQUE7SUE1K0JZLG1CQUFtQjtRQVAvQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLDB3V0FBbUM7WUFFbkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7eUNBa0tzQixxQkFBcUIsRUFBbUIsU0FBUztZQUN0RCxXQUFXO09BbEtqQixtQkFBbUIsQ0E0K0IvQjtJQUFELDBCQUFDO0tBQUE7U0E1K0JZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRmllbGQsXG4gIEFqZkZpZWxkV2l0aENob2ljZXMsXG4gIEFqZk5vZGUsXG4gIEFqZk51bWJlckZpZWxkLFxuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlLFxuICBpc0ZpZWxkLFxuICBpc0ZpZWxkV2l0aENob2ljZXMsXG4gIGlzTnVtYmVyRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZVxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb24sIGFsd2F5c0NvbmRpdGlvbiwgbmV2ZXJDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwdWJsaXNoUmVwbGF5LFxuICByZWZDb3VudCxcbiAgd2l0aExhdGVzdEZyb21cbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksIEFqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi92YWxpZGF0aW9uLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL3dhcm5pbmctY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuXG5cbmZ1bmN0aW9uIGNoZWNrUmVwc1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwge1xuICBjb25zdCBtaW5SZXBzID0gYy52YWx1ZS5taW5SZXBzO1xuICBjb25zdCBtYXhSZXBzID0gYy52YWx1ZS5tYXhSZXBzO1xuICBpZiAobWluUmVwcyAhPSBudWxsICYmIG1heFJlcHMgIT0gbnVsbCAmJiBtaW5SZXBzID4gbWF4UmVwcykge1xuICAgIHJldHVybiB7cmVwczogJ01pbiByZXBldGlvbnMgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggcmVwZXRpdGlvbnMnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gY2hlY2tWYWx1ZUxpbWl0c1ZhbGlkaXR5KGM6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwge1xuICBjb25zdCBtaW5WYWx1ZSA9IGMudmFsdWUubWluVmFsdWU7XG4gIGNvbnN0IG1heFZhbHVlID0gYy52YWx1ZS5tYXhWYWx1ZTtcbiAgaWYgKG1pblZhbHVlICE9IG51bGwgJiYgbWF4VmFsdWUgIT0gbnVsbCAmJiBtaW5WYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgcmV0dXJuIHt2YWx1ZUxpbWl0OiAnTWluIHZhbHVlIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IHZhbHVlJ307XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlnaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX18bnVsbCB7XG4gIGNvbnN0IG1pbkRpZ2l0cyA9IGMudmFsdWUubWluRGlnaXRzO1xuICBjb25zdCBtYXhEaWdpdHMgPSBjLnZhbHVlLm1heERpZ2l0cztcbiAgaWYgKG1pbkRpZ2l0cyAhPSBudWxsICYmIG1heERpZ2l0cyAhPSBudWxsICYmIG1pbkRpZ2l0cyA+IG1heERpZ2l0cykge1xuICAgIHJldHVybiB7ZGlnaXRzOiAnTWluIGRpZ2l0cyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCBkaWdpdHMnfTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdhcm5pbmdDb25kaXRpb24ge1xuICBjb25kaXRpb246IHN0cmluZztcbiAgd2FybmluZ01lc3NhZ2U6IHN0cmluZztcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmItbm9kZS1wcm9wZXJ0aWVzJyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLXByb3BlcnRpZXMuaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLXByb3BlcnRpZXMuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZVByb3BlcnRpZXMgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9maWVsZFNpemVzOiB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ31bXSA9IFtcbiAgICB7bGFiZWw6ICdOb3JtYWwnLCB2YWx1ZTogJ25vcm1hbCd9LCB7bGFiZWw6ICdTbWFsbCcsIHZhbHVlOiAnc21hbGwnfSxcbiAgICB7bGFiZWw6ICdTbWFsbGVyJywgdmFsdWU6ICdzbWFsbGVyJ30sIHtsYWJlbDogJ1RpbnknLCB2YWx1ZTogJ3RpbnknfSxcbiAgICB7bGFiZWw6ICdNaW5pJywgdmFsdWU6ICdtaW5pJ31cbiAgXTtcbiAgZ2V0IGZpZWxkU2l6ZXMoKToge2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9W10ge1xuICAgIHJldHVybiB0aGlzLl9maWVsZFNpemVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJ5OiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGw+O1xuICBnZXQgbm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cnk7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10gPSBbXTtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IEFqZkNob2ljZXNPcmlnaW48YW55PltdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9lbmFibGVkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgZW5hYmxlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnRpZXNGb3JtOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD47XG4gIGdldCBwcm9wZXJ0aWVzRm9ybSgpOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD4ge1xuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzRm9ybTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0Nob2ljZXM6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBoYXNDaG9pY2VzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNDaG9pY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyVmlzaWJpbGl0eTogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJWaXNpYmlsaXR5KCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyVmlzaWJpbGl0eTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1ckZvcm11bGFSZXBzOiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1ckZvcm11bGFSZXBzKCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYVJlcHM7XG4gIH1cblxuICBwcml2YXRlIF9jdXJDaG9pY2VzRmlsdGVyOiBzdHJpbmc7XG4gIGdldCBjdXJDaG9pY2VzRmlsdGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2N1ckNob2ljZXNGaWx0ZXI7XG4gIH1cblxuICBwcml2YXRlIF9jdXJGb3JjZVZhbHVlOiBzdHJpbmd8bnVsbDtcbiAgZ2V0IGN1ckZvcmNlVmFsdWUoKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9jdXJGb3JjZVZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9ybXVsYTogc3RyaW5nfG51bGw7XG4gIGdldCBjdXJGb3JtdWxhKCk6IHN0cmluZ3xudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoZXM6IHN0cmluZ1tdID0gW107XG4gIGdldCBjb25kaXRpb25hbEJyYW5jaGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcztcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHZhbGlkYXRpb25Db25kaXRpb25zKCk6IFZhbGlkYXRpb25Db25kaXRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICBnZXQgd2FybmluZ0NvbmRpdGlvbnMoKTogV2FybmluZ0NvbmRpdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb246IHN0cmluZztcbiAgZ2V0IG5leHRTbGlkZUNvbmRpdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb247XG4gIH1cblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW107XG4gIGdldCB0cmlnZ2VyQ29uZGl0aW9ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zO1xuICB9XG5cbiAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlOiAobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsKSA9PiBib29sZWFuID1cbiAgICAgIChub2RlRW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIG5vZGVFbnRyeSAhPSBudWxsICYmIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlRW50cnkubm9kZSk7XG4gICAgICB9XG5cbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaGVzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9mb3JtdWxhUmVwc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY2hvaWNlc0ZpbHRlclN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9yY2VWYWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJXYXJuaW5nQ29uZGl0aW9uRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWaXNpYmlsaXR5RXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRWaXNpYmlsaXR5U3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhUmVwc0V2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNGaWx0ZXJFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNGaWx0ZXJTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdEZvcmNlVmFsdWVFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcmNlVmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdFRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3NhdmVFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfc2F2ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSwgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXG4gICAgICBwcml2YXRlIF9mYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBfc2VydmljZS5lZGl0ZWROb2RlRW50cnk7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnNTdWIgPVxuICAgICAgICBfc2VydmljZS5jaG9pY2VzT3JpZ2lucy5zdWJzY3JpYmUoKGMpID0+IHRoaXMuX2Nob2ljZXNPcmlnaW5zID0gYyB8fCBbXSk7XG5cbiAgICB0aGlzLl9lbmFibGVkID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUobWFwKChuKSA9PiBuICE9IG51bGwpKTtcblxuICAgIHRoaXMuX2luaXRGb3JtKCk7XG4gICAgdGhpcy5faW5pdFZpc2liaWxpdHlFZGl0KCk7XG4gICAgdGhpcy5faW5pdENvbmRpdGlvbmFsQnJhbmNoRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhUmVwc0VkaXQoKTtcbiAgICB0aGlzLl9pbml0Q2hvaWNlc0ZpbHRlckVkaXQoKTtcbiAgICB0aGlzLl9pbml0Rm9ybXVsYUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Rm9yY2VWYWx1ZUVkaXQoKTtcbiAgICB0aGlzLl9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdEFkZFdhcm5pbmdDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0UmVtb3ZlV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXROZXh0U2xpZGVDb25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk7XG4gICAgdGhpcy5faW5pdEFkZFRyaWdnZXJDb25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRTYXZlKCk7XG4gIH1cblxuICBlZGl0VmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uYWxCcmFuY2goaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXRGb3JtdWxhUmVwcygpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdENob2ljZXNGaWx0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdEZvcm11bGEoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdEZvcmNlVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVFdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdFZhbGlkYXRpb25Db25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXRXYXJuaW5nQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBhZGRXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgcmVtb3ZlV2FybmluZ0NvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KGlkeCk7XG4gIH1cblxuICBlZGl0TmV4dFNsaWRlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnQuZW1pdCgpO1xuICB9XG5cbiAgZWRpdFRyaWdnZXJDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGlzRmllbGQobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeXxudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5vZGVFbnRyeSAhPSBudWxsICYmIGlzRmllbGQobm9kZUVudHJ5Lm5vZGUpO1xuICB9XG5cbiAgaXNOdW1lcmljRmllbGQobm9kZTogQWpmTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzTnVtYmVyRmllbGQobm9kZSBhcyBBamZGaWVsZCk7XG4gIH1cblxuICBpc0ZpZWxkV2l0aENob2ljZXMobm9kZTogQWpmTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0ZpZWxkKG5vZGUpICYmIGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlIGFzIEFqZkZpZWxkKTtcbiAgfVxuXG4gIHNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jYW5jZWxOb2RlRW50cnlFZGl0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Zvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX3NhdmVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVTdWIgPSB0aGlzLl9zYXZlRXZ0LnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHsuLi5mZy52YWx1ZSwgY29uZGl0aW9uYWxCcmFuY2hlczogdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc307XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2Uuc2F2ZU5vZGVFbnRyeSh2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcm9wZXJ0aWVzRm9ybSA9IHRoaXMuX25vZGVFbnRyeS5waXBlKFxuICAgICAgICBmaWx0ZXIoKG4pID0+IG4gIT0gbnVsbCksIG1hcCgobikgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl92aXNpYmlsaXR5U3ViICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2liaWxpdHlTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuID0gbiE7XG5cbiAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IG4ubm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbiA6IG51bGw7XG4gICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9XG4gICAgICAgICAgICAgIG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyB0aGlzLl9ndWVzc1Zpc2liaWxpdHlPcHQobi5ub2RlLnZpc2liaWxpdHkpIDogbnVsbDtcbiAgICAgICAgICBsZXQgY29udHJvbHM6IGFueSA9IHtcbiAgICAgICAgICAgIG5hbWU6IFtuLm5vZGUubmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBsYWJlbDogbi5ub2RlLmxhYmVsLFxuICAgICAgICAgICAgdmlzaWJpbGl0eU9wdDogW3Zpc2liaWxpdHlPcHQsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgdmlzaWJpbGl0eTogW3Zpc2liaWxpdHksIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc051bTogbi5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XG5cbiAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG4ubm9kZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJuID0gPEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGU+bi5ub2RlO1xuXG4gICAgICAgICAgICBjb25zdCBmb3JtdWxhUmVwcyA9IHJuLmZvcm11bGFSZXBzICE9IG51bGwgPyBybi5mb3JtdWxhUmVwcy5mb3JtdWxhIDogbnVsbDtcblxuICAgICAgICAgICAgY29udHJvbHMuZm9ybXVsYVJlcHMgPSBbZm9ybXVsYVJlcHMsIFZhbGlkYXRvcnMucmVxdWlyZWRdO1xuICAgICAgICAgICAgY29udHJvbHMubWluUmVwcyA9IHJuLm1pblJlcHM7XG4gICAgICAgICAgICBjb250cm9scy5tYXhSZXBzID0gcm4ubWF4UmVwcztcblxuICAgICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYVJlcHMgPSBmb3JtdWxhUmVwcztcblxuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrUmVwc1ZhbGlkaXR5KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc0ZpZWxkKG4pKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IDxBamZGaWVsZD5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCBmb3JjZVZhbHVlOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICBsZXQgbm90RW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uQ29uZGl0aW9uczogVmFsaWRhdGlvbkNvbmRpdGlvbltdID0gW107XG4gICAgICAgICAgICBpZiAoZmllbGQudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uLmZvcmNlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvcmNlVmFsdWUgPSBmaWVsZC52YWxpZGF0aW9uLmZvcmNlVmFsdWUuY29uZGl0aW9uO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5vdEVtcHR5ID0gZmllbGQudmFsaWRhdGlvbi5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IChmaWVsZC52YWxpZGF0aW9uLmNvbmRpdGlvbnMgfHwgW10pLm1hcChjID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2NvbmRpdGlvbjogYy5jb25kaXRpb24sIGVycm9yTWVzc2FnZTogYy5lcnJvck1lc3NhZ2V9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IG5vdEVtcHR5VzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHdhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgICAgICAgICAgIGlmIChmaWVsZC53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbm90RW1wdHlXID0gZmllbGQud2FybmluZy5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgICB3YXJuaW5nQ29uZGl0aW9ucyA9IChmaWVsZC53YXJuaW5nLmNvbmRpdGlvbnMgfHwgW10pLm1hcCh3ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2NvbmRpdGlvbjogdy5jb25kaXRpb24sIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmb3JtdWxhID0gZmllbGQuZm9ybXVsYSAhPSBudWxsID8gZmllbGQuZm9ybXVsYS5mb3JtdWxhIDogbnVsbDtcblxuICAgICAgICAgICAgY29udHJvbHMuZGVzY3JpcHRpb24gPSBmaWVsZC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGNvbnRyb2xzLmRlZmF1bHRWYWx1ZSA9IGZpZWxkLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLnNpemUgPSBmaWVsZC5zaXplO1xuICAgICAgICAgICAgY29udHJvbHMuZm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5ID0gbm90RW1wdHk7XG4gICAgICAgICAgICBjb250cm9scy52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IFt2YWxpZGF0aW9uQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgICAgY29udHJvbHMubm90RW1wdHlXYXJuaW5nID0gbm90RW1wdHlXO1xuICAgICAgICAgICAgY29udHJvbHMud2FybmluZ0NvbmRpdGlvbnMgPSBbd2FybmluZ0NvbmRpdGlvbnMsIFtdXTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm5leHRTbGlkZUNvbmRpdGlvbiA9IFtmaWVsZC5uZXh0U2xpZGVDb25kaXRpb25dO1xuXG4gICAgICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGEgPSBmb3JtdWxhO1xuICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gd2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljRmllbGQobi5ub2RlKSkge1xuICAgICAgICAgICAgY29uc3QgbnVtRmllbGQgPSA8QWpmTnVtYmVyRmllbGQ+bi5ub2RlO1xuXG4gICAgICAgICAgICBsZXQgbWluVmFsdWU6IGFueTtcbiAgICAgICAgICAgIGxldCBtYXhWYWx1ZTogYW55O1xuICAgICAgICAgICAgbGV0IG1pbkRpZ2l0czogYW55O1xuICAgICAgICAgICAgbGV0IG1heERpZ2l0czogYW55O1xuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5taW5WYWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWluVmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5WYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA+PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4VmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heFZhbHVlID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4VmFsdWUuY29uZGl0aW9uIHx8ICcnKS5yZXBsYWNlKCckdmFsdWUgPD0gJywgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1pbkRpZ2l0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbWluRGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWluRGlnaXRzLmNvbmRpdGlvbiB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJykucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49ICcsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG1heERpZ2l0cyA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1heERpZ2l0cy5jb25kaXRpb24gfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJycpLnJlcGxhY2UoJyR2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8PSAnLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udHJvbHMubWluVmFsdWUgPSBtaW5WYWx1ZTtcbiAgICAgICAgICAgIGNvbnRyb2xzLm1heFZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgICBjb250cm9scy5taW5EaWdpdHMgPSBtaW5EaWdpdHM7XG4gICAgICAgICAgICBjb250cm9scy5tYXhEaWdpdHMgPSBtYXhEaWdpdHM7XG5cbiAgICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkpO1xuICAgICAgICAgICAgdmFsaWRhdG9ycy5wdXNoKGNoZWNrRGlnaXRzVmFsaWRpdHkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRmllbGRXaXRoQ2hvaWNlcyhuLm5vZGUpKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFdpdGhDaG9pY2VzID0gPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj5uLm5vZGU7XG5cbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW10gPVxuICAgICAgICAgICAgICAgIChmaWVsZFdpdGhDaG9pY2VzLnRyaWdnZXJDb25kaXRpb25zIHx8IFtdKS5tYXAoKGMpID0+IGMuY29uZGl0aW9uKTtcblxuICAgICAgICAgICAgY29udHJvbHMuY2hvaWNlc09yaWdpblJlZiA9IChmaWVsZFdpdGhDaG9pY2VzIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICAgIGNvbnRyb2xzLmNob2ljZXNGaWx0ZXIgPSBmaWVsZFdpdGhDaG9pY2VzLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyLmZvcm11bGEgOlxuICAgICAgICAgICAgICAgIG51bGw7XG4gICAgICAgICAgICBjb250cm9scy5mb3JjZUV4cGFuZGVkID0gZmllbGRXaXRoQ2hvaWNlcy5mb3JjZUV4cGFuZGVkO1xuICAgICAgICAgICAgY29udHJvbHMuZm9yY2VOYXJyb3cgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgY29udHJvbHMudHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcblxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB0cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2ZiLmdyb3VwKGNvbnRyb2xzKTtcbiAgICAgICAgICBmZy5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuXG4gICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChjID0+IGMuY29uZGl0aW9uKTtcbiAgICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/IG4ubm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbiA6IG51bGw7XG5cbiAgICAgICAgICB0aGlzLl9oYW5kbGVDb25kaXRpb25hbEJyYW5jaGVzQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlRm9yY2VWYWx1ZUNoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlVmFsaWRhdGlvbkNvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgICAgdGhpcy5faGFuZGxlTmV4dFNsaWRlQ29uZGl0aW9uQ2hhbmdlKGZnKTtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnKTtcblxuICAgICAgICAgIHJldHVybiBmZztcbiAgICAgICAgfSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoMSksIHJlZkNvdW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndHJpZ2dlckNvbmRpdGlvbnMnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRUcmlnZ2VyQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y3MucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgY21wLmNvbmRpdGlvbiA9IHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd3YXJuaW5nQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICBjb25zdCB3ID0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICAgICAgICBjbXAuY29uZGl0aW9uID0gdy5jb25kaXRpb247XG4gICAgICAgICAgICAgIGNtcC53YXJuaW5nTWVzc2FnZSA9IHcud2FybmluZ01lc3NhZ2U7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAgIChjb25kOiBXYXJuaW5nQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2YWxpZGF0aW9uQ29uZGl0aW9ucyddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3ZhbGlkYXRpb25Db25kaXRpb25zJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZhbGlkYXRpb25Db25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiVmFsaWRhdGlvbkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICAgICAgICBjb25zdCB2ID0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICAgICAgICBjbXAuY29uZGl0aW9uID0gdi5jb25kaXRpb247XG4gICAgICAgICAgICAgIGNtcC5lcnJvck1lc3NhZ2UgPSB2LmVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgKGNvbmQ6IFZhbGlkYXRpb25Db25kaXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcmNlVmFsdWVFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JjZVZhbHVlU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRGb3JjZVZhbHVlRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9yY2VWYWx1ZSddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0TmV4dFNsaWRlQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25FdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyduZXh0U2xpZGVDb25kaXRpb24nXTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRGb3JtdWxhRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgICAgICAgIGlmIChmZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snZm9ybXVsYSddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybXVsYVJlcHNFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc1N1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9ybXVsYVJlcHNFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhUmVwcyddO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hvaWNlc0ZpbHRlckVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENob2ljZXNGaWx0ZXJTdWIgPVxuICAgICAgICAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdENob2ljZXNGaWx0ZXJFdnQpXG4gICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgICAgICAgaWYgKGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydjaG9pY2VzRmlsdGVyJ107XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9XG4gICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDb25kaXRpb25hbEJyYW5jaEVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoU3ViID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdENvbmRpdGlvbmFsQnJhbmNoRXZ0KVxuICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9kZXN0cm95Q29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgICAgICAgIGNvbnN0IGNiSWR4ID0gclswXTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoY2JJZHggPCAwIHx8IGNiSWR4ID49IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoIHx8IGZnID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1tjYklkeF07XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzW2NiSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaXNpYmlsaXR5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1YiA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0VmlzaWJpbGl0eUV2dClcbiAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICAgICAgICBpZiAoZmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3Zpc2liaWxpdHknXTtcbiAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPVxuICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodjEsIHYyKSA9PiBKU09OLnN0cmluZ2lmeSh2MS50cmlnZ2VyQ29uZGl0aW9ucykgPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2Mi50cmlnZ2VyQ29uZGl0aW9ucykpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMgPSB2LnRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gSlNPTi5zdHJpbmdpZnkodjEud2FybmluZ0NvbmRpdGlvbnMpID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodjIud2FybmluZ0NvbmRpdGlvbnMpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zID0gdi53YXJuaW5nQ29uZGl0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZhbGlkYXRpb25Db25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2MSwgdjIpID0+IEpTT04uc3RyaW5naWZ5KHYxLnZhbGlkYXRpb25Db25kaXRpb25zKSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHYyLnZhbGlkYXRpb25Db25kaXRpb25zKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHYudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9yY2VWYWx1ZSA9PT0gdjIuZm9yY2VWYWx1ZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyRm9yY2VWYWx1ZSA9IHYuZm9yY2VWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTmV4dFNsaWRlQ29uZGl0aW9uQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtdWxhU3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5uZXh0U2xpZGVDb25kaXRpb24gPT09IHYyLm5leHRTbGlkZUNvbmRpdGlvbikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uID0gdi5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUZvcm11bGFDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhID09PSB2Mi5mb3JtdWxhKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9jdXJGb3JtdWxhID0gdi5mb3JtdWxhO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JtdWxhUmVwc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIgPVxuICAgICAgICBmZy52YWx1ZUNoYW5nZXMucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhUmVwcyA9PT0gdjIuZm9ybXVsYVJlcHMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gdi5mb3JtdWxhUmVwcztcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuY2hvaWNlc0ZpbHRlciA9PT0gdjIuY2hvaWNlc0ZpbHRlcikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlciA9IHYuY2hvaWNlc0ZpbHRlcjtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ29uZGl0aW9uYWxCcmFuY2hlc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9XG4gICAgICAgIGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoXG4gICAgICAgICAgICAgICAgKHYxLCB2MikgPT4gdjEuY29uZGl0aW9uYWxCcmFuY2hlc051bSA9PT0gdjIuY29uZGl0aW9uYWxCcmFuY2hlc051bSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2JOdW06IG51bWJlciA9IHYuY29uZGl0aW9uYWxCcmFuY2hlc051bTtcbiAgICAgICAgICAgICAgY29uc3QgY3VyQ2JOdW0gPSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgaWYgKGN1ckNiTnVtIDwgY2JOdW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3Q2JzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjdXJDYk51bTsgaSA8IGNiTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIG5ld0Nicy5wdXNoKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMgPSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmNvbmNhdChuZXdDYnMpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNiTnVtID4gY2JOdW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLnNwbGljZSgwLCBjdXJDYk51bSAtIGNiTnVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViID1cbiAgICAgICAgZmcudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS52aXNpYmlsaXR5T3B0ID09PSB2Mi52aXNpYmlsaXR5T3B0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHYpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU9wdCA9IHYudmlzaWJpbGl0eU9wdDtcbiAgICAgICAgICAgICAgbGV0IG5ld0NvbmRpdGlvbjogc3RyaW5nfG51bGw7XG4gICAgICAgICAgICAgIHN3aXRjaCAodmlzaWJpbGl0eU9wdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXZlcic6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBuZXdDb25kaXRpb24gPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX2N1clZpc2liaWxpdHkgPSBuZXdDb25kaXRpb247XG4gICAgICAgICAgICAgIGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J10uc2V0VmFsdWUobmV3Q29uZGl0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ3Vlc3NWaXNpYmlsaXR5T3B0KGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogc3RyaW5nIHtcbiAgICBpZiAoY29uZGl0aW9uLmNvbmRpdGlvbi5sb2NhbGVDb21wYXJlKGFsd2F5c0NvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnYWx3YXlzJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbikgPT09IDApIHtcbiAgICAgIHJldHVybiAnbmV2ZXInO1xuICAgIH1cbiAgICByZXR1cm4gJ2NvbmRpdGlvbic7XG4gIH1cbn1cbiJdfQ==