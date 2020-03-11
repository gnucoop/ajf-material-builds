/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/form-builder.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsT0FBTyxFQUMrQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFDaEcsS0FBSyxFQUFhLFNBQVMsRUFBRSxpQkFBaUIsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFDaUQscUJBQXFCLEVBQzVFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFTaEYsTUFBTSxPQUFPLGNBQWM7Ozs7O0lBc0N6QixZQUNVLFFBQStCLEVBQy9CLE9BQWtCO1FBRGxCLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFmcEIsUUFBRyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRW5ELFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVyRCwwQkFBcUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN6RCwwQkFBcUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUd6RCx5QkFBb0IsR0FBaUIs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LENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QjtZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRTtnQkFDdEQsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLEtBQUssRUFBRSxLQUFLO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO0lBQ1QsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUF4SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLCt3REFBZ0M7Z0JBRWhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFWdUQscUJBQXFCO1lBUHJFLFNBQVM7OzsyQkFtQmQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7bUJBSXBDLEtBQUs7Ozs7SUFKTixzQ0FBZ0U7Ozs7O0lBRWhFLCtCQUF1Qjs7Ozs7SUFXdkIsb0NBQWtEOzs7OztJQUdsRCwwQ0FBZ0U7Ozs7O0lBR2hFLHlDQUE2RDs7Ozs7SUFLN0QsNkJBQTJEOzs7OztJQUUzRCwrQkFBc0I7Ozs7O0lBQ3RCLDJDQUE2RDs7Ozs7SUFDN0QsOENBQThFOzs7OztJQUM5RSwrQ0FBaUU7Ozs7O0lBQ2pFLCtDQUFpRTs7Ozs7SUFDakUsa0RBQXNGOzs7OztJQUN0RixpREFBMkY7Ozs7O0lBQzNGLDhDQUFnRTs7Ozs7SUFFaEUsd0NBQStCOzs7OztJQUc3QixrQ0FBdUM7Ozs7O0lBQ3ZDLGlDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luLCBBamZGb3JtfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2FtcGxlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yRGlhbG9nfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge1xuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSwgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LCBBamZGb3JtQnVpbGRlclNlcnZpY2Vcbn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZm9ybS1idWlsZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3JtLWJ1aWxkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3JtLWJ1aWxkZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZGVzaWduZXInLCB7c3RhdGljOiB0cnVlfSkgZGVzaWduZXJDb250OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm07XG4gIGdldCBmb3JtKCk6IEFqZkZvcm0geyByZXR1cm4gdGhpcy5fZm9ybTsgfVxuICBASW5wdXQoKSBzZXQgZm9ybShmb3JtOiBBamZGb3JtKSB7XG4gICAgaWYgKHRoaXMuX2Zvcm0gIT09IGZvcm0pIHtcbiAgICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgdGhpcy5fc2V0Q3VycmVudEZvcm0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9ub2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdO1xuICBnZXQgbm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHsgcmV0dXJuIHRoaXMuX25vZGVUeXBlczsgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPjtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+IHsgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZTsgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF92YzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNPcmlnaW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNPcmlnaW5EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2c+IHwgbnVsbDtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllckRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudD4gfCBudWxsO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZ1xuICApIHtcbiAgICB0aGlzLl9ub2RlVHlwZXMgPSBfc2VydmljZS5hdmFpbGFibGVOb2RlVHlwZXM7XG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gX3NlcnZpY2Uubm9kZUVudHJpZXNUcmVlO1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zID0gX3NlcnZpY2UuY2hvaWNlc09yaWdpbnM7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvblN1YiA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkQ29uZGl0aW9uXG4gICAgICAuc3Vic2NyaWJlKChjb25kaXRpb246IEFqZkNvbmRpdGlvbiB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oXG4gICAgICAgICAgICBBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZywge2Rpc2FibGVDbG9zZTogdHJ1ZX1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpblN1YiA9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdGVkQ2hvaWNlc09yaWdpbi5zdWJzY3JpYmUoKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nID1cbiAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2csIHtkaXNhYmxlQ2xvc2U6IHRydWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVTdWIgPSB0aGlzLl9zZXJ2aWNlLmJlZm9yZU5vZGVzVXBkYXRlXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZGVzaWduZXJDb250ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2xhc3RTY3JvbGxUb3AgPSB0aGlzLmRlc2lnbmVyQ29udC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5ub2RlRW50cmllc1RyZWVcbiAgICAgIC5waXBlKHNhbXBsZSgoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fdmMpKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5kZXNpZ25lckNvbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLl9sYXN0U2Nyb2xsVG9wO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViID0gdGhpcy5fc2VydmljZS5zdHJpbmdJZGVudGlmaWVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fdmMuZW1pdCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEN1cnJlbnRGb3JtKCk7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZvcm0obnVsbCk7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuY3JlYXRlQ2hvaWNlc09yaWdpbigpO1xuICB9XG5cbiAgZGlzYWJsZURyb3BQcmVkaWNhdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5lZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luKTtcbiAgfVxuXG4gIGVkaXRTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nID1cbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlLFxuICAgICAgICAgIHdpZHRoOiAnNjAlJyxcbiAgICAgICAgICBoZWlnaHQ6ICc2MCUnXG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICB9XG59XG4iXX0=