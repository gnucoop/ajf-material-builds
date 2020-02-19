/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { sample } from 'rxjs/operators';
import { AjfFbChoicesOriginEditorDialog } from './choices-origin-editor-dialog';
import { AjfFbConditionEditorDialog } from './condition-editor-dialog';
import { AjfFormBuilderService } from './form-builder-service';
import { AjfFbStringIdentifierDialogComponent } from './string-identifier-dialog';
export class AjfFormBuilder {
    /**
     * @param {?} _service
     * @param {?} _dialog
     */
    constructor(_service, _dialog) {
        this._service = _service;
        this._dialog = _dialog;
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._stringIdentifierSub = Subscription.EMPTY;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub = this._service.editedCondition
            .subscribe((/**
         * @param {?} condition
         * @return {?}
         */
        (condition) => {
            if (this._editConditionDialog != null) {
                this._editConditionDialog.close();
                this._editConditionDialog = null;
            }
            if (condition != null) {
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
            }
        }));
        this._editChoicesOriginSub =
            this._service.editedChoicesOrigin.subscribe((/**
             * @param {?} choicesOrigin
             * @return {?}
             */
            (choicesOrigin) => {
                if (this._editChoicesOriginDialog != null) {
                    this._editChoicesOriginDialog.close();
                    this._editChoicesOriginDialog = null;
                }
                if (choicesOrigin != null) {
                    this._editChoicesOriginDialog =
                        this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                }
            }));
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        }));
        this.nodeEntriesTree
            .pipe(sample(((/** @type {?} */ (this._vc)))))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this.designerCont == null) {
                return;
            }
            this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
        }));
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe((/**
         * @return {?}
         */
        () => { }));
    }
    /**
     * @return {?}
     */
    get form() { return this._form; }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        if (this._form !== form) {
            this._form = form;
            if (this._init) {
                this._setCurrentForm();
            }
        }
    }
    /**
     * @return {?}
     */
    get nodeTypes() { return this._nodeTypes; }
    /**
     * @return {?}
     */
    get nodeEntriesTree() { return this._nodeEntriesTree; }
    /**
     * @return {?}
     */
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        this._vc.emit();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._setCurrentForm();
        this._init = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
    }
    /**
     * @return {?}
     */
    createChoicesOrigin() {
        this._service.createChoicesOrigin();
    }
    /**
     * @return {?}
     */
    disableDropPredicate() {
        return false;
    }
    /**
     * @param {?} choicesOrigin
     * @return {?}
     */
    editChoicesOrigin(choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    }
    /**
     * @return {?}
     */
    editStringIdentifier() {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog =
            this._dialog.open(AjfFbStringIdentifierDialogComponent, {
                disableClose: true,
                width: '60%',
                height: '60%'
            });
    }
    /**
     * @private
     * @return {?}
     */
    _setCurrentForm() {
        this._service.setForm(this._form);
    }
}
AjfFormBuilder.decorators = [
    { type: Component, args: [{
                selector: 'ajf-form-builder',
                template: "<mat-toolbar>\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\" translate>Choices</button>\n  <button mat-button (click)=\"editStringIdentifier()\" translate>Identifier</button>\n  <mat-menu #choicesMenu>\n    <button (click)=\"createChoicesOrigin()\" mat-menu-item translate>New..</button>\n    <ng-container *ngIf=\"choicesOrigins|async as cos\">\n      <button *ngFor=\"let choicesOrigin of cos\"\n          (click)=\"editChoicesOrigin(choicesOrigin)\" mat-menu-item>\n        {{ choicesOrigin.label || choicesOrigin.name }}\n      </button>\n    </ng-container>\n  </mat-menu>\n  <span class=\"ajf-spacer\"></span>\n  <button mat-icon-button (click)=\"rightSidenav.toggle()\">\n    <mat-icon>settings</mat-icon>\n  </button>\n</mat-toolbar>\n<mat-drawer-container cdkDropListGroup>\n  <mat-drawer #leftSidenav position=\"start\" mode=\"over\">\n    <div #sourceDropList cdkDropList\n        [cdkDropListEnterPredicate]=\"disableDropPredicate\"\n        [cdkDropListData]=\"nodeTypes\">\n      <ajf-fb-node-type-entry *ngFor=\"let nodeType of nodeTypes\"\n          cdkDrag\n          [cdkDragData]=\"nodeType\"\n          (cdkDragStarted)=\"leftSidenav.close()\"\n          [nodeType]=\"nodeType\"></ajf-fb-node-type-entry>\n    </div>\n  </mat-drawer>\n  <mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </mat-drawer>\n  <div #designer class=\"ajf-designer\">\n    <ajf-fb-node-entry\n        *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\"\n        [isFirst]=\"isFirst\"\n        [nodeEntry]=\"nodeEntry\"></ajf-fb-node-entry>\n  </div>\n</mat-drawer-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-form-builder{display:flex;position:relative;min-height:300px;flex-direction:column;align-items:stretch}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{flex:1}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}\n"]
            }] }
];
/** @nocollapse */
AjfFormBuilder.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog }
];
AjfFormBuilder.propDecorators = {
    designerCont: [{ type: ViewChild, args: ['designer', { static: true },] }],
    form: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfFormBuilder.prototype.designerCont;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._form;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._nodeTypes;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._nodeEntriesTree;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._choicesOrigins;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._vc;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._init;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editConditionSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editConditionDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._beforeNodesUpdateSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editChoicesOriginSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._editChoicesOriginDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._stringIdentifierDialog;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._stringIdentifierSub;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._lastScrollTop;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._service;
    /**
     * @type {?}
     * @private
     */
    AjfFormBuilder.prototype._dialog;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUMrQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFDaEcsS0FBSyxFQUFhLFNBQVMsRUFBRSxpQkFBaUIsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFDaUQscUJBQXFCLEVBQzVFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFTaEYsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBc0N6QixZQUNVLFFBQStCLEVBQy9CLE9BQWtCO1FBRGxCLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFmcEIsUUFBRyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRW5ELFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVyRCwwQkFBcUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN6RCwwQkFBcUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUd6RCx5QkFBb0IsR0FBaUIs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LENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRTtnQkFDdEQsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO0lBQ1QsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUF4SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLCt3REFBZ0M7Z0JBRWhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFWdUQscUJBQXFCO1lBUHJFLFNBQVM7OzsyQkFtQmQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7bUJBSXBDLEtBQUs7Ozs7SUFKTixzQ0FBZ0U7Ozs7O0lBRWhFLCtCQUF1Qjs7Ozs7SUFXdkIsb0NBQWtEOzs7OztJQUdsRCwwQ0FBZ0U7Ozs7O0lBR2hFLHlDQUE2RDs7Ozs7SUFLN0QsNkJBQTJEOzs7OztJQUUzRCwrQkFBc0I7Ozs7O0lBQ3RCLDJDQUE2RDs7Ozs7SUFDN0QsOENBQThFOzs7OztJQUM5RSwrQ0FBaUU7Ozs7O0lBQ2pFLCtDQUFpRTs7Ozs7SUFDakUsa0RBQXNGOzs7OztJQUN0RixpREFBMkY7Ozs7O0lBQzNGLDhDQUFnRTs7Ozs7SUFFaEUsd0NBQStCOzs7OztJQUc3QixrQ0FBdUM7Ozs7O0lBQ3ZDLGlDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW4sIEFqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzYW1wbGV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2d9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksIEFqZkZvcm1CdWlsZGVyU2VydmljZVxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mb3JtLWJ1aWxkZXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm0tYnVpbGRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm0tYnVpbGRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdkZXNpZ25lcicsIHtzdGF0aWM6IHRydWV9KSBkZXNpZ25lckNvbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybTtcbiAgZ2V0IGZvcm0oKTogQWpmRm9ybSB7IHJldHVybiB0aGlzLl9mb3JtOyB9XG4gIEBJbnB1dCgpIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPT0gZm9ybSkge1xuICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9zZXRDdXJyZW50Rm9ybSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX25vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W107XG4gIGdldCBub2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10geyByZXR1cm4gdGhpcy5fbm9kZVR5cGVzOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4geyByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlOyB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+O1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX3ZjOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz4gfCBudWxsO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZz4gfCBudWxsO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50PiB8IG51bGw7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9sYXN0U2Nyb2xsVG9wOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nXG4gICkge1xuICAgIHRoaXMuX25vZGVUeXBlcyA9IF9zZXJ2aWNlLmF2YWlsYWJsZU5vZGVUeXBlcztcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSBfc2VydmljZS5ub2RlRW50cmllc1RyZWU7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBfc2VydmljZS5jaG9pY2VzT3JpZ2lucztcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViID0gdGhpcy5fc2VydmljZS5lZGl0ZWRDb25kaXRpb25cbiAgICAgIC5zdWJzY3JpYmUoKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uIHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihcbiAgICAgICAgICAgIEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nLCB7ZGlzYWJsZUNsb3NlOiB0cnVlfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luU3ViID1cbiAgICAgICAgdGhpcy5fc2VydmljZS5lZGl0ZWRDaG9pY2VzT3JpZ2luLnN1YnNjcmliZSgoY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZywge2Rpc2FibGVDbG9zZTogdHJ1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZVN1YiA9IHRoaXMuX3NlcnZpY2UuYmVmb3JlTm9kZXNVcGRhdGVcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5fbGFzdFNjcm9sbFRvcCA9IHRoaXMuZGVzaWduZXJDb250Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLm5vZGVFbnRyaWVzVHJlZVxuICAgICAgLnBpcGUoc2FtcGxlKCg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl92YykpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRlc2lnbmVyQ29udCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmRlc2lnbmVyQ29udC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX2xhc3RTY3JvbGxUb3A7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLnN0cmluZ0lkZW50aWZpZXIuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl92Yy5lbWl0KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q3VycmVudEZvcm0oKTtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Rm9ybShudWxsKTtcbiAgfVxuXG4gIGNyZWF0ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jcmVhdGVDaG9pY2VzT3JpZ2luKCk7XG4gIH1cblxuICBkaXNhYmxlRHJvcFByZWRpY2F0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgZWRpdFN0cmluZ0lkZW50aWZpZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZyA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgPVxuICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWUsXG4gICAgICAgICAgd2lkdGg6ICc2MCUnLFxuICAgICAgICAgIGhlaWdodDogJzYwJSdcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50Rm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gIH1cbn1cbiJdfQ==