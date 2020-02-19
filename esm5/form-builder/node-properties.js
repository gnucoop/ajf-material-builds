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
import { __assign } from "tslib";
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
    var minReps = c.value.minReps;
    var maxReps = c.value.maxReps;
    if (minReps != null && maxReps != null && minReps > maxReps) {
        return {
            reps: 'Min repetions cannot be greater than max repetitions'
        };
    }
    return null;
}
function checkValueLimitsValidity(c) {
    var minValue = c.value.minValue;
    var maxValue = c.value.maxValue;
    if (minValue != null && maxValue != null && minValue > maxValue) {
        return {
            valueLimit: 'Min value cannot be greater than max value'
        };
    }
    return null;
}
function checkDigitsValidity(c) {
    var minDigits = c.value.minDigits;
    var maxDigits = c.value.maxDigits;
    if (minDigits != null && maxDigits != null && minDigits > maxDigits) {
        return {
            digits: 'Min digits cannot be greater than max digits'
        };
    }
    return null;
}
var AjfFbNodeProperties = /** @class */ (function () {
    function AjfFbNodeProperties(_service, _dialog, _fb) {
        var _this = this;
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
        this.isRepeatingContainerNode = function (nodeEntry) {
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
        this._choicesOriginsSub = _service.choicesOrigins
            .subscribe(function (c) { return _this._choicesOrigins = c || []; });
        this._enabled = this._nodeEntry.pipe(map(function (n) { return n != null; }));
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
    Object.defineProperty(AjfFbNodeProperties.prototype, "fieldSizes", {
        get: function () { return this._fieldSizes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "nodeEntry", {
        get: function () { return this._nodeEntry; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "choicesOrigins", {
        get: function () {
            return this._choicesOrigins;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "enabled", {
        get: function () { return this._enabled; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "propertiesForm", {
        get: function () { return this._propertiesForm; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "hasChoices", {
        get: function () { return this._hasChoices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curVisibility", {
        get: function () { return this._curVisibility; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curFormulaReps", {
        get: function () { return this._curFormulaReps; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curChoicesFilter", {
        get: function () { return this._curChoicesFilter; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curForceValue", {
        get: function () { return this._curForceValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "curFormula", {
        get: function () { return this._curFormula; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "conditionalBranches", {
        get: function () { return this._conditionalBranches; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "validationConditions", {
        get: function () { return this._validationConditions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "warningConditions", {
        get: function () { return this._warningConditions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "nextSlideCondition", {
        get: function () { return this._nextSlideCondition; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbNodeProperties.prototype, "triggerConditions", {
        get: function () { return this._triggerConditions; },
        enumerable: true,
        configurable: true
    });
    AjfFbNodeProperties.prototype.editVisibility = function () {
        this._editVisibilityEvt.emit();
    };
    AjfFbNodeProperties.prototype.editConditionalBranch = function (idx) {
        if (idx < 0 || idx >= this._conditionalBranches.length) {
            return;
        }
        this._editConditionalBranchEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.editFormulaReps = function () {
        this._editFormulaRepsEvt.emit();
    };
    AjfFbNodeProperties.prototype.editChoicesFilter = function () {
        this._editChoicesFilterEvt.emit();
    };
    AjfFbNodeProperties.prototype.editFormula = function () {
        this._editFormulaEvt.emit();
    };
    AjfFbNodeProperties.prototype.editForceValue = function () {
        this._editForceValueEvt.emit();
    };
    AjfFbNodeProperties.prototype.editValidationCondition = function (idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._editValidationConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.addValidationCondition = function () {
        this._addValidationConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.removeValidationCondition = function (idx) {
        if (idx < 0 || idx >= this._validationConditions.length) {
            return;
        }
        this._removeValidationConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.editWarningCondition = function (idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._editWarningConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.addWarningCondition = function () {
        this._addWarningConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.removeWarningCondition = function (idx) {
        if (idx < 0 || idx >= this._warningConditions.length) {
            return;
        }
        this._removeWarningConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.editNextSlideCondition = function () {
        this._editNextSlideConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.editTriggerCondition = function (idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._editTriggerConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.addTriggerCondition = function () {
        this._addTriggerConditionEvt.emit();
    };
    AjfFbNodeProperties.prototype.removeTriggerCondition = function (idx) {
        if (idx < 0 || idx >= this._triggerConditions.length) {
            return;
        }
        this._removeTriggerConditionEvt.emit(idx);
    };
    AjfFbNodeProperties.prototype.isField = function (nodeEntry) {
        return nodeEntry != null && isField(nodeEntry.node);
    };
    AjfFbNodeProperties.prototype.isNumericField = function (node) {
        return isField(node) && isNumberField(node);
    };
    AjfFbNodeProperties.prototype.isFieldWithChoices = function (node) {
        return isField(node) && isFieldWithChoices(node);
    };
    AjfFbNodeProperties.prototype.save = function () {
        this._saveEvt.emit();
    };
    AjfFbNodeProperties.prototype.cancel = function () {
        this._service.cancelNodeEntryEdit();
    };
    AjfFbNodeProperties.prototype.ngOnDestroy = function () {
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
    };
    AjfFbNodeProperties.prototype._initSave = function () {
        var _this = this;
        this._saveSub = this._saveEvt.pipe(withLatestFrom(this.propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            var val = __assign(__assign({}, fg.value), { conditionalBranches: _this._conditionalBranches });
            _this._service.saveNodeEntry(val);
        });
    };
    AjfFbNodeProperties.prototype._initForm = function () {
        var _this = this;
        this._propertiesForm = this._nodeEntry.pipe(filter(function (n) { return n != null; }), map(function (n) {
            if (_this._visibilitySub != null) {
                _this._visibilitySub.unsubscribe();
            }
            if (_this._conditionalBranchesSub != null) {
                _this._conditionalBranchesSub.unsubscribe();
            }
            n = n;
            var visibility = n.node.visibility != null ?
                n.node.visibility.condition : null;
            var visibilityOpt = n.node.visibility != null ?
                _this._guessVisibilityOpt(n.node.visibility) : null;
            var controls = {
                name: [n.node.name, Validators.required],
                label: n.node.label,
                visibilityOpt: [visibilityOpt, Validators.required],
                visibility: [visibility, Validators.required],
                conditionalBranchesNum: n.node.conditionalBranches.length
            };
            var validators = [];
            if (isRepeatingContainerNode(n.node)) {
                var rn = n.node;
                var formulaReps = rn.formulaReps != null ? rn.formulaReps.formula : null;
                controls.formulaReps = [formulaReps, Validators.required];
                controls.minReps = rn.minReps;
                controls.maxReps = rn.maxReps;
                _this._curFormulaReps = formulaReps;
                validators.push(checkRepsValidity);
            }
            if (_this.isField(n)) {
                var field = n.node;
                var forceValue = null;
                var notEmpty = false;
                var validationConditions = [];
                if (field.validation != null) {
                    if (field.validation.forceValue != null) {
                        forceValue = field.validation.forceValue.condition;
                    }
                    notEmpty = field.validation.notEmpty != null;
                    validationConditions = (field.validation.conditions || [])
                        .map(function (c) {
                        return {
                            condition: c.condition,
                            errorMessage: c.errorMessage
                        };
                    });
                }
                var notEmptyW = false;
                var warningConditions = [];
                if (field.warning != null) {
                    notEmptyW = field.warning.notEmpty != null;
                    warningConditions = (field.warning.conditions || [])
                        .map(function (w) {
                        return {
                            condition: w.condition,
                            warningMessage: w.warningMessage
                        };
                    });
                }
                var formula = field.formula != null ? field.formula.formula : null;
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
                _this._curForceValue = forceValue;
                _this._curFormula = formula;
                _this._validationConditions = validationConditions;
                _this._warningConditions = warningConditions;
            }
            if (_this.isNumericField(n.node)) {
                var numField = n.node;
                var minValue = void 0;
                var maxValue = void 0;
                var minDigits = void 0;
                var maxDigits = void 0;
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
            if (_this.isFieldWithChoices(n.node)) {
                var fieldWithChoices = n.node;
                var triggerConditions = (fieldWithChoices.triggerConditions || [])
                    .map(function (c) { return c.condition; });
                controls.choicesOriginRef = fieldWithChoices.choicesOriginRef;
                controls.choicesFilter = fieldWithChoices.choicesFilter != null ?
                    fieldWithChoices.choicesFilter.formula : null;
                controls.forceExpanded = fieldWithChoices.forceExpanded;
                controls.forceNarrow = fieldWithChoices.forceNarrow;
                controls.triggerConditions = triggerConditions;
                _this._triggerConditions = triggerConditions;
            }
            var fg = _this._fb.group(controls);
            fg.setValidators(validators);
            _this._conditionalBranches = n.node.conditionalBranches.map(function (c) { return c.condition; });
            _this._curVisibility = n.node.visibility != null ? n.node.visibility.condition : null;
            _this._handleConditionalBranchesChange(fg);
            _this._handleVisibilityChange(fg);
            _this._handleFormulaRepsChange(fg);
            _this._handleChoicesFilterChange(fg);
            _this._handleFormulaChange(fg);
            _this._handleForceValueChange(fg);
            _this._handleValidationCondtionsChange(fg);
            _this._handleWarningCondtionsChange(fg);
            _this._handleNextSlideConditionChange(fg);
            _this._handleTriggerCondtionsChange(fg);
            return fg;
        }), publishReplay(1), refCount());
    };
    AjfFbNodeProperties.prototype._destroyConditionDialog = function () {
        if (this._editConditionDialogSub != null) {
            this._editConditionDialogSub.unsubscribe();
            this._editConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editConditionDialog != null) {
            this._editConditionDialog.close();
            this._editConditionDialog = null;
        }
    };
    AjfFbNodeProperties.prototype._destroyValidationConditionDialog = function () {
        if (this._editValidationConditionDialogSub != null) {
            this._editValidationConditionDialogSub.unsubscribe();
            this._editValidationConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editValidationConditionDialog != null) {
            this._editValidationConditionDialog.close();
            this._editValidationConditionDialog = null;
        }
    };
    AjfFbNodeProperties.prototype._destroyWarningConditionDialog = function () {
        if (this._editWarningConditionDialogSub != null) {
            this._editWarningConditionDialogSub.unsubscribe();
            this._editWarningConditionDialogSub = Subscription.EMPTY;
        }
        if (this._editWarningConditionDialog != null) {
            this._editWarningConditionDialog.close();
            this._editWarningConditionDialog = null;
        }
    };
    AjfFbNodeProperties.prototype._initRemoveTriggerCondition = function () {
        this._removeTriggerConditionSub = this._removeTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var vcIdx = r[0];
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['triggerConditions'];
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initAddTriggerCondition = function () {
        this._addTriggerConditionSub = this._addTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['triggerConditions'];
            var vcs = (ctrl.value || []).slice(0);
            vcs.push('');
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initTriggerConditionEdit = function () {
        var _this = this;
        this._editTriggerConditionSub = this._editTriggerConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var vcIdx = r[0];
            var fg = r[1];
            if (vcIdx < 0 || vcIdx >= _this._triggerConditions.length || fg == null) {
                return;
            }
            _this._editConditionDialog = _this._dialog
                .open(AjfFbConditionEditorDialog);
            var cmp = _this._editConditionDialog.componentInstance;
            cmp.condition = _this._triggerConditions[vcIdx];
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    _this._triggerConditions[vcIdx] = cond;
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initRemoveWarningCondition = function () {
        this._removeWarningConditionSub = this._removeWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var vcIdx = r[0];
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['warningConditions'];
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initAddWarningCondition = function () {
        this._addWarningConditionSub = this._addWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['warningConditions'];
            var vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initWarningConditionEdit = function () {
        var _this = this;
        this._editWarningConditionSub = this._editWarningConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyWarningConditionDialog();
            var vcIdx = r[0];
            var fg = r[1];
            if (vcIdx < 0 || vcIdx >= _this._warningConditions.length || fg == null) {
                return;
            }
            _this._editWarningConditionDialog = _this._dialog
                .open(AjfFbWarningConditionEditorDialog);
            var cmp = _this._editWarningConditionDialog.componentInstance;
            var w = _this._warningConditions[vcIdx];
            cmp.condition = w.condition;
            cmp.warningMessage = w.warningMessage;
            _this._editWarningConditionDialogSub = _this._editWarningConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    _this._warningConditions[vcIdx] = cond;
                }
                _this._editWarningConditionDialogSub.unsubscribe();
                _this._editWarningConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initRemoveValidationCondition = function () {
        this._removeValidationConditionSub = this._removeValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var vcIdx = r[0];
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['validationConditions'];
            var vcs = (ctrl.value || []).slice(0);
            if (vcIdx < 0 || vcIdx >= vcs.length) {
                return;
            }
            vcs.splice(vcIdx, 1);
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initAddValidationCondition = function () {
        this._addValidationConditionSub = this._addValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['validationConditions'];
            var vcs = (ctrl.value || []).slice(0);
            vcs.push({ condition: '', errorMessage: '' });
            ctrl.setValue(vcs);
        });
    };
    AjfFbNodeProperties.prototype._initValidationConditionEdit = function () {
        var _this = this;
        this._editValidationConditionSub = this._editValidationConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyValidationConditionDialog();
            var vcIdx = r[0];
            var fg = r[1];
            if (vcIdx < 0 || vcIdx >= _this._validationConditions.length || fg == null) {
                return;
            }
            _this._editValidationConditionDialog = _this._dialog
                .open(AjfFbValidationConditionEditorDialog);
            var cmp = _this._editValidationConditionDialog.componentInstance;
            var v = _this._validationConditions[vcIdx];
            cmp.condition = v.condition;
            cmp.errorMessage = v.errorMessage;
            _this._editValidationConditionDialogSub = _this._editValidationConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    _this._validationConditions[vcIdx] = cond;
                }
                _this._editValidationConditionDialogSub.unsubscribe();
                _this._editValidationConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initForceValueEdit = function () {
        var _this = this;
        this._editForceValueSub = this._editForceValueEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['forceValue'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initNextSlideConditionEdit = function () {
        var _this = this;
        this._editNextSlideConditionSub = this._editNextSlideConditionEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['nextSlideCondition'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initFormulaEdit = function () {
        var _this = this;
        this._editFormulaSub = this._editFormulaEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['formula'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initFormulaRepsEdit = function () {
        var _this = this;
        this._editFormulaRepsSub = this._editFormulaRepsEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['formulaReps'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initChoicesFilterEdit = function () {
        var _this = this;
        this._editChoicesFilterSub = this._editChoicesFilterEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['choicesFilter'];
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = ctrl.value;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initConditionalBranchEdit = function () {
        var _this = this;
        this._editConditionalBranchSub = this._editConditionalBranchEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var cbIdx = r[0];
            var fg = r[1];
            if (cbIdx < 0 || cbIdx >= _this._conditionalBranches.length || fg == null) {
                return;
            }
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = _this._conditionalBranches[cbIdx];
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    _this._conditionalBranches[cbIdx] = cond;
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._initVisibilityEdit = function () {
        var _this = this;
        this._editVisibilitySub = this._editVisibilityEvt
            .pipe(withLatestFrom(this._propertiesForm))
            .subscribe(function (r) {
            _this._destroyConditionDialog();
            var fg = r[1];
            if (fg == null) {
                return;
            }
            var ctrl = fg.controls['visibility'];
            var condition = ctrl.value;
            _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog);
            _this._editConditionDialog.componentInstance.condition = condition;
            _this._editConditionDialogSub = _this._editConditionDialog.afterClosed()
                .subscribe(function (cond) {
                if (cond !== void 0) {
                    ctrl.setValue(cond);
                }
                _this._editConditionDialogSub.unsubscribe();
                _this._editConditionDialogSub = Subscription.EMPTY;
            });
        });
    };
    AjfFbNodeProperties.prototype._handleTriggerCondtionsChange = function (fg) {
        var _this = this;
        this._triggerConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) {
            return JSON.stringify(v1.triggerConditions) === JSON.stringify(v2.triggerConditions);
        }))
            .subscribe(function (v) {
            _this._triggerConditions = v.triggerConditions;
        });
    };
    AjfFbNodeProperties.prototype._handleWarningCondtionsChange = function (fg) {
        var _this = this;
        this._warningConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) {
            return JSON.stringify(v1.warningConditions) === JSON.stringify(v2.warningConditions);
        }))
            .subscribe(function (v) {
            _this._warningConditions = v.warningConditions;
        });
    };
    AjfFbNodeProperties.prototype._handleValidationCondtionsChange = function (fg) {
        var _this = this;
        this._validationConditionsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) {
            return JSON.stringify(v1.validationConditions) === JSON.stringify(v2.validationConditions);
        }))
            .subscribe(function (v) {
            _this._validationConditions = v.validationConditions;
        });
    };
    AjfFbNodeProperties.prototype._handleForceValueChange = function (fg) {
        var _this = this;
        this._forceValueSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return v1.forceValue === v2.forceValue; }))
            .subscribe(function (v) {
            _this._curForceValue = v.forceValue;
        });
    };
    AjfFbNodeProperties.prototype._handleNextSlideConditionChange = function (fg) {
        var _this = this;
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return v1.nextSlideCondition === v2.nextSlideCondition; }))
            .subscribe(function (v) {
            _this._nextSlideCondition = v.nextSlideCondition;
        });
    };
    AjfFbNodeProperties.prototype._handleFormulaChange = function (fg) {
        var _this = this;
        this._formulaSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return v1.formula === v2.formula; }))
            .subscribe(function (v) {
            _this._curFormula = v.formula;
        });
    };
    AjfFbNodeProperties.prototype._handleFormulaRepsChange = function (fg) {
        var _this = this;
        this._formulaRepsSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return v1.formulaReps === v2.formulaReps; }))
            .subscribe(function (v) {
            _this._curFormulaReps = v.formulaReps;
        });
    };
    AjfFbNodeProperties.prototype._handleChoicesFilterChange = function (fg) {
        var _this = this;
        this._choicesFilterSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return v1.choicesFilter === v2.choicesFilter; }))
            .subscribe(function (v) {
            _this._curChoicesFilter = v.choicesFilter;
        });
    };
    AjfFbNodeProperties.prototype._handleConditionalBranchesChange = function (fg) {
        var _this = this;
        this._conditionalBranchesSub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) {
            return v1.conditionalBranchesNum === v2.conditionalBranchesNum;
        }))
            .subscribe(function (v) {
            var cbNum = v.conditionalBranchesNum;
            var curCbNum = _this._conditionalBranches.length;
            if (curCbNum < cbNum) {
                var newCbs = [];
                for (var i = curCbNum; i < cbNum; i++) {
                    newCbs.push(alwaysCondition().condition);
                }
                _this._conditionalBranches = _this._conditionalBranches.concat(newCbs);
            }
            else if (curCbNum > cbNum) {
                _this._conditionalBranches.splice(0, curCbNum - cbNum);
            }
        });
    };
    AjfFbNodeProperties.prototype._handleVisibilityChange = function (fg) {
        var _this = this;
        this._visibilitySub = fg.valueChanges
            .pipe(distinctUntilChanged(function (v1, v2) { return v1.visibilityOpt === v2.visibilityOpt; }))
            .subscribe(function (v) {
            var visibilityOpt = v.visibilityOpt;
            var newCondition;
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
            _this._curVisibility = newCondition;
            fg.controls['visibility'].setValue(newCondition);
        });
    };
    AjfFbNodeProperties.prototype._guessVisibilityOpt = function (condition) {
        if (condition.condition.localeCompare(alwaysCondition().condition) === 0) {
            return 'always';
        }
        if (condition.condition.localeCompare(neverCondition().condition) === 0) {
            return 'never';
        }
        return 'condition';
    };
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
    AjfFbNodeProperties.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialog },
        { type: FormBuilder }
    ]; };
    return AjfFbNodeProperties;
}());
export { AjfFbNodeProperties };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9ub2RlLXByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFFc0IsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFDckUsd0JBQXdCLEVBQ3pCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFlLGVBQWUsRUFBRSxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxpQkFBaUIsRUFDL0UsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFrQixXQUFXLEVBQTBCLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxTQUFTLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFDTCxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUMzRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBMEIscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRixPQUFPLEVBQUMsaUNBQWlDLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUdwRixTQUFTLGlCQUFpQixDQUFDLENBQWtCO0lBQzNDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxD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ZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkF2RGdDLHFCQUFxQjtnQkFQOUMsU0FBUztnQkFEUSxXQUFXOztJQW05QnBDLDBCQUFDO0NBQUEsQUExNUJELElBMDVCQztTQW41QlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNob2ljZXNPcmlnaW4sIEFqZkZpZWxkLCBBamZGaWVsZFdpdGhDaG9pY2VzLCBBamZOb2RlLCBBamZOdW1iZXJGaWVsZCxcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZSwgaXNGaWVsZCwgaXNGaWVsZFdpdGhDaG9pY2VzLCBpc051bWJlckZpZWxkLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBhbHdheXNDb25kaXRpb24sIG5ldmVyQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vdmFsaWRhdGlvbi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi93YXJuaW5nLWNvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcblxuXG5mdW5jdGlvbiBjaGVja1JlcHNWYWxpZGl0eShjOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwge1xuICBjb25zdCBtaW5SZXBzID0gYy52YWx1ZS5taW5SZXBzO1xuICBjb25zdCBtYXhSZXBzID0gYy52YWx1ZS5tYXhSZXBzO1xuICBpZiAobWluUmVwcyAhPSBudWxsICYmIG1heFJlcHMgIT0gbnVsbCAmJiBtaW5SZXBzID4gbWF4UmVwcykge1xuICAgIHJldHVybiB7XG4gICAgICByZXBzOiAnTWluIHJlcGV0aW9ucyBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIG1heCByZXBldGl0aW9ucydcbiAgICB9O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgY29uc3QgbWluVmFsdWUgPSBjLnZhbHVlLm1pblZhbHVlO1xuICBjb25zdCBtYXhWYWx1ZSA9IGMudmFsdWUubWF4VmFsdWU7XG4gIGlmIChtaW5WYWx1ZSAhPSBudWxsICYmIG1heFZhbHVlICE9IG51bGwgJiYgbWluVmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZUxpbWl0OiAnTWluIHZhbHVlIGNhbm5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IHZhbHVlJ1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlnaXRzVmFsaWRpdHkoYzogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHtcbiAgY29uc3QgbWluRGlnaXRzID0gYy52YWx1ZS5taW5EaWdpdHM7XG4gIGNvbnN0IG1heERpZ2l0cyA9IGMudmFsdWUubWF4RGlnaXRzO1xuICBpZiAobWluRGlnaXRzICE9IG51bGwgJiYgbWF4RGlnaXRzICE9IG51bGwgJiYgbWluRGlnaXRzID4gbWF4RGlnaXRzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpZ2l0czogJ01pbiBkaWdpdHMgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiBtYXggZGlnaXRzJ1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvbkNvbmRpdGlvbiB7XG4gIGNvbmRpdGlvbjogc3RyaW5nO1xuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYXJuaW5nQ29uZGl0aW9uIHtcbiAgY29uZGl0aW9uOiBzdHJpbmc7XG4gIHdhcm5pbmdNZXNzYWdlOiBzdHJpbmc7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLW5vZGUtcHJvcGVydGllcycsXG4gIHRlbXBsYXRlVXJsOiAnbm9kZS1wcm9wZXJ0aWVzLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1wcm9wZXJ0aWVzLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYk5vZGVQcm9wZXJ0aWVzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfZmllbGRTaXplczoge2xhYmVsOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd9W10gPSBbXG4gICAge2xhYmVsOiAnTm9ybWFsJywgdmFsdWU6ICdub3JtYWwnfSxcbiAgICB7bGFiZWw6ICdTbWFsbCcsIHZhbHVlOiAnc21hbGwnfSxcbiAgICB7bGFiZWw6ICdTbWFsbGVyJywgdmFsdWU6ICdzbWFsbGVyJ30sXG4gICAge2xhYmVsOiAnVGlueScsIHZhbHVlOiAndGlueSd9LFxuICAgIHtsYWJlbDogJ01pbmknLCB2YWx1ZTogJ21pbmknfVxuICBdO1xuICBnZXQgZmllbGRTaXplcygpOiB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ31bXSB7IHJldHVybiB0aGlzLl9maWVsZFNpemVzOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJ5OiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD47XG4gIGdldCBub2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHsgcmV0dXJuIHRoaXMuX25vZGVFbnRyeTsgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9IFtdO1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2VuYWJsZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGdldCBlbmFibGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4geyByZXR1cm4gdGhpcy5fZW5hYmxlZDsgfVxuXG4gIHByaXZhdGUgX3Byb3BlcnRpZXNGb3JtOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD47XG4gIGdldCBwcm9wZXJ0aWVzRm9ybSgpOiBPYnNlcnZhYmxlPEZvcm1Hcm91cD4geyByZXR1cm4gdGhpcy5fcHJvcGVydGllc0Zvcm07IH1cblxuICBwcml2YXRlIF9oYXNDaG9pY2VzOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBnZXQgaGFzQ2hvaWNlcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHsgcmV0dXJuIHRoaXMuX2hhc0Nob2ljZXM7IH1cblxuICBwcml2YXRlIF9jdXJWaXNpYmlsaXR5OiBzdHJpbmcgfCBudWxsO1xuICBnZXQgY3VyVmlzaWJpbGl0eSgpOiBzdHJpbmcgfCBudWxsIHsgcmV0dXJuIHRoaXMuX2N1clZpc2liaWxpdHk7IH1cblxuICBwcml2YXRlIF9jdXJGb3JtdWxhUmVwczogc3RyaW5nIHwgbnVsbDtcbiAgZ2V0IGN1ckZvcm11bGFSZXBzKCk6IHN0cmluZyB8IG51bGwgeyByZXR1cm4gdGhpcy5fY3VyRm9ybXVsYVJlcHM7IH1cblxuICBwcml2YXRlIF9jdXJDaG9pY2VzRmlsdGVyOiBzdHJpbmc7XG4gIGdldCBjdXJDaG9pY2VzRmlsdGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jdXJDaG9pY2VzRmlsdGVyOyB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9yY2VWYWx1ZTogc3RyaW5nIHwgbnVsbDtcbiAgZ2V0IGN1ckZvcmNlVmFsdWUoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLl9jdXJGb3JjZVZhbHVlOyB9XG5cbiAgcHJpdmF0ZSBfY3VyRm9ybXVsYTogc3RyaW5nIHwgbnVsbDtcbiAgZ2V0IGN1ckZvcm11bGEoKTogc3RyaW5nIHwgbnVsbCB7IHJldHVybiB0aGlzLl9jdXJGb3JtdWxhOyB9XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlczogc3RyaW5nW10gPSBbXTtcbiAgZ2V0IGNvbmRpdGlvbmFsQnJhbmNoZXMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlczsgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zOiBWYWxpZGF0aW9uQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHZhbGlkYXRpb25Db25kaXRpb25zKCk6IFZhbGlkYXRpb25Db25kaXRpb25bXSB7IHJldHVybiB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uczsgfVxuXG4gIHByaXZhdGUgX3dhcm5pbmdDb25kaXRpb25zOiBXYXJuaW5nQ29uZGl0aW9uW10gPSBbXTtcbiAgZ2V0IHdhcm5pbmdDb25kaXRpb25zKCk6IFdhcm5pbmdDb25kaXRpb25bXSB7IHJldHVybiB0aGlzLl93YXJuaW5nQ29uZGl0aW9uczsgfVxuXG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbjogc3RyaW5nO1xuICBnZXQgbmV4dFNsaWRlQ29uZGl0aW9uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb247IH1cblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uczogc3RyaW5nW107XG4gIGdldCB0cmlnZ2VyQ29uZGl0aW9ucygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uczsgfVxuXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZTogKG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnl8bnVsbCkgPT4gYm9vbGVhbiA9IChub2RlRW50cnkpID0+IHtcbiAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVFbnRyeS5ub2RlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVJlcHNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Nob2ljZXNGaWx0ZXJTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Zvcm11bGFTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2ZvcmNlVmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF93YXJuaW5nQ29uZGl0aW9uc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nPiB8IG51bGw7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlZhbGlkYXRpb25Db25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYldhcm5pbmdDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eUV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0VmlzaWJpbGl0eVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0Rm9ybXVsYVJlcHNFdnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfZWRpdEZvcm11bGFSZXBzU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JtdWxhU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2VkaXRGb3JjZVZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9lZGl0V2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfZWRpdFdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfYWRkV2FybmluZ0NvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25FdnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHByaXZhdGUgX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2VkaXRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwcml2YXRlIF9lZGl0VHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FkZFRyaWdnZXJDb25kaXRpb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfcmVtb3ZlVHJpZ2dlckNvbmRpdGlvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9zYXZlRXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3NhdmVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgX2ZiOiBGb3JtQnVpbGRlclxuICApIHtcbiAgICB0aGlzLl9ub2RlRW50cnkgPSBfc2VydmljZS5lZGl0ZWROb2RlRW50cnk7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnNTdWIgPSBfc2VydmljZS5jaG9pY2VzT3JpZ2luc1xuICAgICAgLnN1YnNjcmliZSgoYykgPT4gdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBjIHx8IFtdKTtcblxuICAgIHRoaXMuX2VuYWJsZWQgPSB0aGlzLl9ub2RlRW50cnkucGlwZShtYXAoKG4pID0+IG4gIT0gbnVsbCkpO1xuXG4gICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICB0aGlzLl9pbml0VmlzaWJpbGl0eUVkaXQoKTtcbiAgICB0aGlzLl9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk7XG4gICAgdGhpcy5faW5pdEZvcm11bGFSZXBzRWRpdCgpO1xuICAgIHRoaXMuX2luaXRDaG9pY2VzRmlsdGVyRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JtdWxhRWRpdCgpO1xuICAgIHRoaXMuX2luaXRGb3JjZVZhbHVlRWRpdCgpO1xuICAgIHRoaXMuX2luaXRWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdCgpO1xuICAgIHRoaXMuX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTtcbiAgICB0aGlzLl9pbml0V2FybmluZ0NvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0VHJpZ2dlckNvbmRpdGlvbkVkaXQoKTtcbiAgICB0aGlzLl9pbml0QWRkVHJpZ2dlckNvbmRpdGlvbigpO1xuICAgIHRoaXMuX2luaXRSZW1vdmVUcmlnZ2VyQ29uZGl0aW9uKCk7XG4gICAgdGhpcy5faW5pdFNhdmUoKTtcbiAgfVxuXG4gIGVkaXRWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5RXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGVkaXRDb25kaXRpb25hbEJyYW5jaChpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uYWxCcmFuY2hFdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdEZvcm11bGFSZXBzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRGb3JtdWxhUmVwc0V2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Q2hvaWNlc0ZpbHRlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlckV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9ybXVsYSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0Rm9yY2VWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VmFsaWRhdGlvbkNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVmFsaWRhdGlvbkNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgZWRpdFdhcm5pbmdDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGFkZFdhcm5pbmdDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICByZW1vdmVXYXJuaW5nQ29uZGl0aW9uKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0LmVtaXQoaWR4KTtcbiAgfVxuXG4gIGVkaXROZXh0U2xpZGVDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvbkV2dC5lbWl0KCk7XG4gIH1cblxuICBlZGl0VHJpZ2dlckNvbmRpdGlvbihpZHg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgYWRkVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIHJlbW92ZVRyaWdnZXJDb25kaXRpb24oaWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25FdnQuZW1pdChpZHgpO1xuICB9XG5cbiAgaXNGaWVsZChub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5fG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbm9kZUVudHJ5ICE9IG51bGwgJiYgaXNGaWVsZChub2RlRW50cnkubm9kZSk7XG4gIH1cblxuICBpc051bWVyaWNGaWVsZChub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNOdW1iZXJGaWVsZChub2RlIGFzIEFqZkZpZWxkKTtcbiAgfVxuXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyhub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmllbGQobm9kZSkgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUgYXMgQWpmRmllbGQpO1xuICB9XG5cbiAgc2F2ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlRXZ0LmVtaXQoKTtcbiAgfVxuXG4gIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmNhbmNlbE5vZGVFbnRyeUVkaXQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVJlcHNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9jaG9pY2VzRmlsdGVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9ybXVsYVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2ZvcmNlVmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3dhcm5pbmdDb25kaXRpb25zU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNTdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLl9lZGl0Q2hvaWNlc0ZpbHRlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWaXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFSZXBzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdEZvcm11bGFTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuX2FkZFRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9hZGRWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYWRkV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXROZXh0U2xpZGVDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0VHJpZ2dlckNvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3JlbW92ZVRyaWdnZXJDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW1vdmVWYWxpZGF0aW9uQ29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVtb3ZlV2FybmluZ0NvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuXG4gICAgdGhpcy5fc2F2ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZVN1YiA9IHRoaXMuX3NhdmVFdnQucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnByb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgY29uc3QgdmFsID0gey4uLmZnLnZhbHVlLFxuICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXM6IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2VydmljZS5zYXZlTm9kZUVudHJ5KHZhbCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3Byb3BlcnRpZXNGb3JtID0gdGhpcy5fbm9kZUVudHJ5LnBpcGUoXG4gICAgICBmaWx0ZXIoKG4pID0+IG4gIT0gbnVsbCksXG4gICAgICBtYXAoKG4pID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2liaWxpdHlTdWIgIT0gbnVsbCkgeyB0aGlzLl92aXNpYmlsaXR5U3ViLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNTdWIgIT0gbnVsbCkgeyB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzU3ViLnVuc3Vic2NyaWJlKCk7IH1cbiAgICAgICAgbiA9IG4hO1xuXG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHkgPSBuLm5vZGUudmlzaWJpbGl0eSAhPSBudWxsID9cbiAgICAgICAgICBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuICAgICAgICBjb25zdCB2aXNpYmlsaXR5T3B0ID0gbi5ub2RlLnZpc2liaWxpdHkgIT0gbnVsbCA/XG4gICAgICAgICAgdGhpcy5fZ3Vlc3NWaXNpYmlsaXR5T3B0KG4ubm9kZS52aXNpYmlsaXR5KSA6IG51bGw7XG4gICAgICAgIGxldCBjb250cm9sczogYW55ID0ge1xuICAgICAgICAgIG5hbWU6IFtuLm5vZGUubmFtZSwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgbGFiZWw6IG4ubm9kZS5sYWJlbCxcbiAgICAgICAgICB2aXNpYmlsaXR5T3B0OiBbdmlzaWJpbGl0eU9wdCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgdmlzaWJpbGl0eTogW3Zpc2liaWxpdHksIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXNOdW06IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdID0gW107XG5cbiAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShuLm5vZGUpKSB7XG4gICAgICAgICAgY29uc3Qgcm4gPSA8QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZT5uLm5vZGU7XG5cbiAgICAgICAgICBjb25zdCBmb3JtdWxhUmVwcyA9IHJuLmZvcm11bGFSZXBzICE9IG51bGwgPyBybi5mb3JtdWxhUmVwcy5mb3JtdWxhIDogbnVsbDtcblxuICAgICAgICAgIGNvbnRyb2xzLmZvcm11bGFSZXBzID0gW2Zvcm11bGFSZXBzLCBWYWxpZGF0b3JzLnJlcXVpcmVkXTtcbiAgICAgICAgICBjb250cm9scy5taW5SZXBzID0gcm4ubWluUmVwcztcbiAgICAgICAgICBjb250cm9scy5tYXhSZXBzID0gcm4ubWF4UmVwcztcblxuICAgICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gZm9ybXVsYVJlcHM7XG5cbiAgICAgICAgICB2YWxpZGF0b3JzLnB1c2goY2hlY2tSZXBzVmFsaWRpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZChuKSkge1xuICAgICAgICAgIGNvbnN0IGZpZWxkID0gPEFqZkZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgIGxldCBmb3JjZVZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICBsZXQgbm90RW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICBsZXQgdmFsaWRhdGlvbkNvbmRpdGlvbnM6IFZhbGlkYXRpb25Db25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZC52YWxpZGF0aW9uLmZvcmNlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBmb3JjZVZhbHVlID0gZmllbGQudmFsaWRhdGlvbi5mb3JjZVZhbHVlLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vdEVtcHR5ID0gZmllbGQudmFsaWRhdGlvbi5ub3RFbXB0eSAhPSBudWxsO1xuICAgICAgICAgICAgdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSAoZmllbGQudmFsaWRhdGlvbi5jb25kaXRpb25zIHx8IFtdKVxuICAgICAgICAgICAgICAubWFwKGMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBjb25kaXRpb246IGMuY29uZGl0aW9uLFxuICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBub3RFbXB0eVc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICBsZXQgd2FybmluZ0NvbmRpdGlvbnM6IFdhcm5pbmdDb25kaXRpb25bXSA9IFtdO1xuICAgICAgICAgIGlmIChmaWVsZC53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5vdEVtcHR5VyA9IGZpZWxkLndhcm5pbmcubm90RW1wdHkgIT0gbnVsbDtcbiAgICAgICAgICAgIHdhcm5pbmdDb25kaXRpb25zID0gKGZpZWxkLndhcm5pbmcuY29uZGl0aW9ucyB8fCBbXSlcbiAgICAgICAgICAgICAgLm1hcCh3ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiB3LmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGZvcm11bGEgPSBmaWVsZC5mb3JtdWxhICE9IG51bGwgPyBmaWVsZC5mb3JtdWxhLmZvcm11bGEgOiBudWxsO1xuXG4gICAgICAgICAgY29udHJvbHMuZGVzY3JpcHRpb24gPSBmaWVsZC5kZXNjcmlwdGlvbjtcbiAgICAgICAgICBjb250cm9scy5kZWZhdWx0VmFsdWUgPSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgY29udHJvbHMuc2l6ZSA9IGZpZWxkLnNpemU7XG4gICAgICAgICAgY29udHJvbHMuZm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgY29udHJvbHMuZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgY29udHJvbHMubm90RW1wdHkgPSBub3RFbXB0eTtcbiAgICAgICAgICBjb250cm9scy52YWxpZGF0aW9uQ29uZGl0aW9ucyA9IFt2YWxpZGF0aW9uQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgIGNvbnRyb2xzLm5vdEVtcHR5V2FybmluZyA9IG5vdEVtcHR5VztcbiAgICAgICAgICBjb250cm9scy53YXJuaW5nQ29uZGl0aW9ucyA9IFt3YXJuaW5nQ29uZGl0aW9ucywgW11dO1xuICAgICAgICAgIGNvbnRyb2xzLm5leHRTbGlkZUNvbmRpdGlvbiA9IFtmaWVsZC5uZXh0U2xpZGVDb25kaXRpb25dO1xuXG4gICAgICAgICAgdGhpcy5fY3VyRm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IGZvcm11bGE7XG4gICAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2YWxpZGF0aW9uQ29uZGl0aW9ucztcbiAgICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHdhcm5pbmdDb25kaXRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljRmllbGQobi5ub2RlKSkge1xuICAgICAgICAgIGNvbnN0IG51bUZpZWxkID0gPEFqZk51bWJlckZpZWxkPm4ubm9kZTtcblxuICAgICAgICAgIGxldCBtaW5WYWx1ZTogYW55O1xuICAgICAgICAgIGxldCBtYXhWYWx1ZTogYW55O1xuICAgICAgICAgIGxldCBtaW5EaWdpdHM6IGFueTtcbiAgICAgICAgICBsZXQgbWF4RGlnaXRzOiBhbnk7XG4gICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWluVmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtaW5WYWx1ZSA9IChudW1GaWVsZC52YWxpZGF0aW9uLm1pblZhbHVlLmNvbmRpdGlvbiB8fCAnJykucmVwbGFjZSgnJHZhbHVlID49ICcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChudW1GaWVsZC52YWxpZGF0aW9uLm1heFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbWF4VmFsdWUgPSAobnVtRmllbGQudmFsaWRhdGlvbi5tYXhWYWx1ZS5jb25kaXRpb24gfHwgJycpLnJlcGxhY2UoJyR2YWx1ZSA8PSAnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBtaW5EaWdpdHMgPSAobnVtRmllbGQudmFsaWRhdGlvbi5taW5EaWdpdHMuY29uZGl0aW9uIHx8ICcnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKCckdmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPj0gJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbWF4RGlnaXRzID0gKG51bUZpZWxkLnZhbGlkYXRpb24ubWF4RGlnaXRzLmNvbmRpdGlvbiB8fCAnJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgnJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9ICcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250cm9scy5taW5WYWx1ZSA9IG1pblZhbHVlO1xuICAgICAgICAgIGNvbnRyb2xzLm1heFZhbHVlID0gbWF4VmFsdWU7XG4gICAgICAgICAgY29udHJvbHMubWluRGlnaXRzID0gbWluRGlnaXRzO1xuICAgICAgICAgIGNvbnRyb2xzLm1heERpZ2l0cyA9IG1heERpZ2l0cztcblxuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja1ZhbHVlTGltaXRzVmFsaWRpdHkpO1xuICAgICAgICAgIHZhbGlkYXRvcnMucHVzaChjaGVja0RpZ2l0c1ZhbGlkaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRXaXRoQ2hvaWNlcyhuLm5vZGUpKSB7XG4gICAgICAgICAgY29uc3QgZmllbGRXaXRoQ2hvaWNlcyA9IDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+bi5ub2RlO1xuXG4gICAgICAgICAgbGV0IHRyaWdnZXJDb25kaXRpb25zOiBzdHJpbmdbXSA9IChmaWVsZFdpdGhDaG9pY2VzLnRyaWdnZXJDb25kaXRpb25zIHx8IFtdKVxuICAgICAgICAgICAgLm1hcCgoYykgPT4gYy5jb25kaXRpb24pO1xuXG4gICAgICAgICAgY29udHJvbHMuY2hvaWNlc09yaWdpblJlZiA9IChmaWVsZFdpdGhDaG9pY2VzIGFzIGFueSkuY2hvaWNlc09yaWdpblJlZjtcbiAgICAgICAgICBjb250cm9scy5jaG9pY2VzRmlsdGVyID0gZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyICE9IG51bGwgP1xuICAgICAgICAgICAgZmllbGRXaXRoQ2hvaWNlcy5jaG9pY2VzRmlsdGVyLmZvcm11bGEgOiBudWxsO1xuICAgICAgICAgIGNvbnRyb2xzLmZvcmNlRXhwYW5kZWQgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgY29udHJvbHMuZm9yY2VOYXJyb3cgPSBmaWVsZFdpdGhDaG9pY2VzLmZvcmNlTmFycm93O1xuICAgICAgICAgIGNvbnRyb2xzLnRyaWdnZXJDb25kaXRpb25zID0gdHJpZ2dlckNvbmRpdGlvbnM7XG5cbiAgICAgICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9ucyA9IHRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mYi5ncm91cChjb250cm9scyk7XG4gICAgICAgIGZnLnNldFZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG5cbiAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcyA9IG4ubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLm1hcChjID0+IGMuY29uZGl0aW9uKTtcbiAgICAgICAgdGhpcy5fY3VyVmlzaWJpbGl0eSA9IG4ubm9kZS52aXNpYmlsaXR5ICE9IG51bGwgPyBuLm5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24gOiBudWxsO1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZUNvbmRpdGlvbmFsQnJhbmNoZXNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVDaG9pY2VzRmlsdGVyQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9ybXVsYUNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUZvcmNlVmFsdWVDaGFuZ2UoZmcpO1xuICAgICAgICB0aGlzLl9oYW5kbGVWYWxpZGF0aW9uQ29uZHRpb25zQ2hhbmdlKGZnKTtcbiAgICAgICAgdGhpcy5faGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZU5leHRTbGlkZUNvbmRpdGlvbkNoYW5nZShmZyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZVRyaWdnZXJDb25kdGlvbnNDaGFuZ2UoZmcpO1xuXG4gICAgICAgIHJldHVybiBmZztcbiAgICAgIH0pLFxuICAgICAgcHVibGlzaFJlcGxheSgxKSxcbiAgICAgIHJlZkNvdW50KClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95V2FybmluZ0NvbmRpdGlvbkRpYWxvZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVtb3ZlVHJpZ2dlckNvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fcmVtb3ZlVHJpZ2dlckNvbmRpdGlvbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3RyaWdnZXJDb25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdmNzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAgICAgdmNzLnNwbGljZSh2Y0lkeCwgMSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEFkZFRyaWdnZXJDb25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVHJpZ2dlckNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9hZGRUcmlnZ2VyQ29uZGl0aW9uRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd0cmlnZ2VyQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2Y3MucHVzaCgnJyk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFRyaWdnZXJDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRUcmlnZ2VyQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFRyaWdnZXJDb25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2dcbiAgICAgICAgICAub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZW1vdmVXYXJuaW5nQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVdhcm5pbmdDb25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9yZW1vdmVXYXJuaW5nQ29uZGl0aW9uRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW251bWJlciwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBjb25zdCB2Y0lkeCA9IHJbMF07XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgaWYgKGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1snd2FybmluZ0NvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgaWYgKHZjSWR4IDwgMCB8fCB2Y0lkeCA+PSB2Y3MubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgICAgICB2Y3Muc3BsaWNlKHZjSWR4LCAxKTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QWRkV2FybmluZ0NvbmRpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRXYXJuaW5nQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2FkZFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbdm9pZCwgRm9ybUdyb3VwXSkgPT4ge1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ3dhcm5pbmdDb25kaXRpb25zJ107XG4gICAgICAgIGxldCB2Y3MgPSAoY3RybC52YWx1ZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZjcy5wdXNoKHtjb25kaXRpb246ICcnLCBlcnJvck1lc3NhZ2U6ICcnfSk7XG4gICAgICAgIGN0cmwuc2V0VmFsdWUodmNzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFdhcm5pbmdDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uU3ViID0gKDxPYnNlcnZhYmxlPG51bWJlcj4+dGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lXYXJuaW5nQ29uZGl0aW9uRGlhbG9nKCk7XG4gICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHRoaXMuX3dhcm5pbmdDb25kaXRpb25zLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZ1xuICAgICAgICAgIC5vcGVuKEFqZkZiV2FybmluZ0NvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIGNvbnN0IGNtcCA9IHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgICBjb25zdCB3ID0gdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdO1xuICAgICAgICBjbXAuY29uZGl0aW9uID0gdy5jb25kaXRpb247XG4gICAgICAgIGNtcC53YXJuaW5nTWVzc2FnZSA9IHcud2FybmluZ01lc3NhZ2U7XG4gICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdFdhcm5pbmdDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IFdhcm5pbmdDb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNbdmNJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRXYXJuaW5nQ29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0V2FybmluZ0NvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbW92ZVZhbGlkYXRpb25Db25kaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlVmFsaWRhdGlvbkNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX3JlbW92ZVZhbGlkYXRpb25Db25kaXRpb25FdnQpXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9wcm9wZXJ0aWVzRm9ybSkpXG4gICAgICAuc3Vic2NyaWJlKChyOiBbbnVtYmVyLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGNvbnN0IHZjSWR4ID0gclswXTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2YWxpZGF0aW9uQ29uZGl0aW9ucyddO1xuICAgICAgICBsZXQgdmNzID0gKGN0cmwudmFsdWUgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICBpZiAodmNJZHggPCAwIHx8IHZjSWR4ID49IHZjcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZjcy5zcGxpY2UodmNJZHgsIDEpO1xuICAgICAgICBjdHJsLnNldFZhbHVlKHZjcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBZGRWYWxpZGF0aW9uQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fYWRkVmFsaWRhdGlvbkNvbmRpdGlvbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgaWYgKGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIGNvbnN0IGN0cmwgPSBmZy5jb250cm9sc1sndmFsaWRhdGlvbkNvbmRpdGlvbnMnXTtcbiAgICAgICAgbGV0IHZjcyA9IChjdHJsLnZhbHVlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmNzLnB1c2goe2NvbmRpdGlvbjogJycsIGVycm9yTWVzc2FnZTogJyd9KTtcbiAgICAgICAgY3RybC5zZXRWYWx1ZSh2Y3MpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmFsaWRhdGlvbkNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25TdWIgPSAoPE9ic2VydmFibGU8bnVtYmVyPj50aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveVZhbGlkYXRpb25Db25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgdmNJZHggPSByWzBdO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmICh2Y0lkeCA8IDAgfHwgdmNJZHggPj0gdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMubGVuZ3RoIHx8IGZnID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nXG4gICAgICAgICAgLm9wZW4oQWpmRmJWYWxpZGF0aW9uQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgY29uc3QgY21wID0gdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLl92YWxpZGF0aW9uQ29uZGl0aW9uc1t2Y0lkeF07XG4gICAgICAgIGNtcC5jb25kaXRpb24gPSB2LmNvbmRpdGlvbjtcbiAgICAgICAgY21wLmVycm9yTWVzc2FnZSA9IHYuZXJyb3JNZXNzYWdlO1xuICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRWYWxpZGF0aW9uQ29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBWYWxpZGF0aW9uQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zW3ZjSWR4XSA9IGNvbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0VmFsaWRhdGlvbkNvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdFZhbGlkYXRpb25Db25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JjZVZhbHVlRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9yY2VWYWx1ZVN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9yY2VWYWx1ZUV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JjZVZhbHVlJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5leHRTbGlkZUNvbmRpdGlvbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdE5leHRTbGlkZUNvbmRpdGlvblN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0TmV4dFNsaWRlQ29uZGl0aW9uRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ25leHRTbGlkZUNvbmRpdGlvbiddO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmFmdGVyQ2xvc2VkKClcbiAgICAgICAgICAuc3Vic2NyaWJlKChjb25kOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgY3RybC5zZXRWYWx1ZShjb25kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtdWxhRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0Rm9ybXVsYUV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWydmb3JtdWxhJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm11bGFSZXBzRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Rm9ybXVsYVJlcHNTdWIgPSAoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fZWRpdEZvcm11bGFSZXBzRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Zvcm11bGFSZXBzJ107XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY3RybC52YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuYWZ0ZXJDbG9zZWQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGNvbmQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICBjdHJsLnNldFZhbHVlKGNvbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZ1N1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENob2ljZXNGaWx0ZXJFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyU3ViID0gKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX2VkaXRDaG9pY2VzRmlsdGVyRXZ0KVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fcHJvcGVydGllc0Zvcm0pKVxuICAgICAgLnN1YnNjcmliZSgocjogW3ZvaWQsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBmZyA9IHJbMV07XG4gICAgICAgIGlmIChmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBjdHJsID0gZmcuY29udHJvbHNbJ2Nob2ljZXNGaWx0ZXInXTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nKTtcbiAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jb21wb25lbnRJbnN0YW5jZS5jb25kaXRpb24gPSBjdHJsLnZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q29uZGl0aW9uYWxCcmFuY2hFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaFN1YiA9ICg8T2JzZXJ2YWJsZTxudW1iZXI+PnRoaXMuX2VkaXRDb25kaXRpb25hbEJyYW5jaEV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFtudW1iZXIsIEZvcm1Hcm91cF0pID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNvbmRpdGlvbkRpYWxvZygpO1xuICAgICAgICBjb25zdCBjYklkeCA9IHJbMF07XG4gICAgICAgIGNvbnN0IGZnID0gclsxXTtcbiAgICAgICAgaWYgKGNiSWR4IDwgMCB8fCBjYklkeCA+PSB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCB8fCBmZyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2cpO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNvbXBvbmVudEluc3RhbmNlLmNvbmRpdGlvbiA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXNbY2JJZHhdID0gY29uZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2dTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaXNpYmlsaXR5RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0VmlzaWJpbGl0eVN1YiA9ICg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl9lZGl0VmlzaWJpbGl0eUV2dClcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX3Byb3BlcnRpZXNGb3JtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHI6IFt2b2lkLCBGb3JtR3JvdXBdKSA9PiB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lDb25kaXRpb25EaWFsb2coKTtcbiAgICAgICAgY29uc3QgZmcgPSByWzFdO1xuICAgICAgICBpZiAoZmcgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgY3RybCA9IGZnLmNvbnRyb2xzWyd2aXNpYmlsaXR5J107XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbiA9IGN0cmwudmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZyk7XG4gICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY29tcG9uZW50SW5zdGFuY2UuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5hZnRlckNsb3NlZCgpXG4gICAgICAgICAgLnN1YnNjcmliZSgoY29uZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGN0cmwuc2V0VmFsdWUoY29uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVUcmlnZ2VyQ29uZHRpb25zQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT5cbiAgICAgICAgSlNPTi5zdHJpbmdpZnkodjEudHJpZ2dlckNvbmRpdGlvbnMpID09PSBKU09OLnN0cmluZ2lmeSh2Mi50cmlnZ2VyQ29uZGl0aW9ucykpKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zID0gdi50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlV2FybmluZ0NvbmR0aW9uc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fd2FybmluZ0NvbmRpdGlvbnNTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+XG4gICAgICAgIEpTT04uc3RyaW5naWZ5KHYxLndhcm5pbmdDb25kaXRpb25zKSA9PT0gSlNPTi5zdHJpbmdpZnkodjIud2FybmluZ0NvbmRpdGlvbnMpKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl93YXJuaW5nQ29uZGl0aW9ucyA9IHYud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVZhbGlkYXRpb25Db25kdGlvbnNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Db25kaXRpb25zU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PlxuICAgICAgICBKU09OLnN0cmluZ2lmeSh2MS52YWxpZGF0aW9uQ29uZGl0aW9ucykgPT09IEpTT04uc3RyaW5naWZ5KHYyLnZhbGlkYXRpb25Db25kaXRpb25zKSkpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGlvbkNvbmRpdGlvbnMgPSB2LnZhbGlkYXRpb25Db25kaXRpb25zO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVGb3JjZVZhbHVlQ2hhbmdlKGZnOiBGb3JtR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JjZVZhbHVlU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JjZVZhbHVlID09PSB2Mi5mb3JjZVZhbHVlKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9jdXJGb3JjZVZhbHVlID0gdi5mb3JjZVZhbHVlO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVOZXh0U2xpZGVDb25kaXRpb25DaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFTdWIgPSBmZy52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh2MSwgdjIpID0+IHYxLm5leHRTbGlkZUNvbmRpdGlvbiA9PT0gdjIubmV4dFNsaWRlQ29uZGl0aW9uKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb24gPSB2Lm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybXVsYVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuZm9ybXVsYSA9PT0gdjIuZm9ybXVsYSkpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyRm9ybXVsYSA9IHYuZm9ybXVsYTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlRm9ybXVsYVJlcHNDaGFuZ2UoZmc6IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm11bGFSZXBzU3ViID0gZmcudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgodjEsIHYyKSA9PiB2MS5mb3JtdWxhUmVwcyA9PT0gdjIuZm9ybXVsYVJlcHMpKVxuICAgICAgLnN1YnNjcmliZSgodjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX2N1ckZvcm11bGFSZXBzID0gdi5mb3JtdWxhUmVwcztcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2hvaWNlc0ZpbHRlckNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc0ZpbHRlclN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEuY2hvaWNlc0ZpbHRlciA9PT0gdjIuY2hvaWNlc0ZpbHRlcikpXG4gICAgICAuc3Vic2NyaWJlKCh2OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5fY3VyQ2hvaWNlc0ZpbHRlciA9IHYuY2hvaWNlc0ZpbHRlcjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ29uZGl0aW9uYWxCcmFuY2hlc0NoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlc1N1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT5cbiAgICAgICAgICB2MS5jb25kaXRpb25hbEJyYW5jaGVzTnVtID09PSB2Mi5jb25kaXRpb25hbEJyYW5jaGVzTnVtKSlcbiAgICAgIC5zdWJzY3JpYmUoKHY6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjYk51bTogbnVtYmVyID0gdi5jb25kaXRpb25hbEJyYW5jaGVzTnVtO1xuICAgICAgICBjb25zdCBjdXJDYk51bSA9IHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICBpZiAoY3VyQ2JOdW0gPCBjYk51bSkge1xuICAgICAgICAgIGxldCBuZXdDYnM6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGN1ckNiTnVtIDsgaSA8IGNiTnVtIDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdDYnMucHVzaChhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaGVzID0gdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5jb25jYXQobmV3Q2JzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJDYk51bSA+IGNiTnVtKSB7XG4gICAgICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hlcy5zcGxpY2UoMCwgY3VyQ2JOdW0gLSBjYk51bSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlVmlzaWJpbGl0eUNoYW5nZShmZzogRm9ybUdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5fdmlzaWJpbGl0eVN1YiA9IGZnLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKHYxLCB2MikgPT4gdjEudmlzaWJpbGl0eU9wdCA9PT0gdjIudmlzaWJpbGl0eU9wdCkpXG4gICAgICAuc3Vic2NyaWJlKCh2KSA9PiB7XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlPcHQgPSB2LnZpc2liaWxpdHlPcHQ7XG4gICAgICAgIGxldCBuZXdDb25kaXRpb246IHN0cmluZyB8IG51bGw7XG4gICAgICAgIHN3aXRjaCAodmlzaWJpbGl0eU9wdCkge1xuICAgICAgICAgIGNhc2UgJ2Fsd2F5cyc6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb247XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICduZXZlcic6XG4gICAgICAgICAgICBuZXdDb25kaXRpb24gPSBuZXZlckNvbmRpdGlvbigpLmNvbmRpdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgbmV3Q29uZGl0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJWaXNpYmlsaXR5ID0gbmV3Q29uZGl0aW9uO1xuICAgICAgICBmZy5jb250cm9sc1sndmlzaWJpbGl0eSddLnNldFZhbHVlKG5ld0NvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2d1ZXNzVmlzaWJpbGl0eU9wdChjb25kaXRpb246IEFqZkNvbmRpdGlvbik6IHN0cmluZyB7XG4gICAgaWYgKGNvbmRpdGlvbi5jb25kaXRpb24ubG9jYWxlQ29tcGFyZShhbHdheXNDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2Fsd2F5cyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb24uY29uZGl0aW9uLmxvY2FsZUNvbXBhcmUobmV2ZXJDb25kaXRpb24oKS5jb25kaXRpb24pID09PSAwKSB7XG4gICAgICByZXR1cm4gJ25ldmVyJztcbiAgICB9XG4gICAgcmV0dXJuICdjb25kaXRpb24nO1xuICB9XG59XG4iXX0=