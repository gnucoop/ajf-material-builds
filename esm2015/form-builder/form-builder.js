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
import { disableFieldDropPredicate, onDropProcess } from './form-builder-utils';
import { AjfFbStringIdentifierDialogComponent } from './string-identifier-dialog';
export class AjfFormBuilder {
    constructor(_service, _dialog) {
        this._service = _service;
        this._dialog = _dialog;
        this._globalExpanded = false;
        /**
         * The list of the ids of all the dropLists connected to the formbuilder source list.
         */
        this._connectedDropLists = this._service.connectedDropLists;
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._stringIdentifierSub = Subscription.EMPTY;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub =
            this._service.editedCondition.subscribe((condition) => {
                if (this._editConditionDialog != null) {
                    this._editConditionDialog.close();
                    this._editConditionDialog = null;
                }
                if (condition != null) {
                    this._editConditionDialog =
                        this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
                }
            });
        this._editChoicesOriginSub =
            this._service.editedChoicesOrigin.subscribe((choicesOrigin) => {
                if (this._editChoicesOriginDialog != null) {
                    this._editChoicesOriginDialog.close();
                    this._editChoicesOriginDialog = null;
                }
                if (choicesOrigin != null) {
                    this._editChoicesOriginDialog =
                        this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                }
            });
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        });
        this.nodeEntriesTree.pipe(sample(this._vc)).subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
        });
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe(() => { });
    }
    get form() {
        return this._form;
    }
    set form(form) {
        if (this._form !== form) {
            this._form = form;
            if (this._init) {
                this._setCurrentForm();
            }
        }
    }
    get nodeTypes() {
        return this._nodeTypes;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get isGlobalExpanded() {
        return this._globalExpanded;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    ngAfterViewChecked() {
        this._vc.emit();
    }
    ngAfterContentInit() {
        this._setCurrentForm();
        this._init = true;
    }
    ngOnDestroy() {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
    }
    createChoicesOrigin() {
        this._service.createChoicesOrigin();
    }
    disableDrop() {
        return false;
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        onDropProcess(event, this._service, null, content);
    }
    editChoicesOrigin(choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    }
    editStringIdentifier() {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, { disableClose: true, width: '60%', height: '60%' });
    }
    expandAll() {
        this._globalExpanded = true;
    }
    collapseAll() {
        this._globalExpanded = false;
    }
    expandToggle(evt) {
        if (evt.checked) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }
    _setCurrentForm() {
        this._service.setForm(this._form);
    }
}
AjfFormBuilder.decorators = [
    { type: Component, args: [{
                selector: 'ajf-form-builder',
                template: "<mat-toolbar>\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\">\n    {{'Choices'|transloco}}\n  </button>\n  <button mat-button (click)=\"editStringIdentifier()\">\n    {{'Identifier'|transloco}}\n  </button>\n  <button\n    mat-icon-button\n    aria-label=\"Collapsed\"\n    matTooltip=\"Keep slides collapsed\"\n  >\n    <mat-icon>unfold_less</mat-icon>\n  </button>\n  <mat-slide-toggle\n    color=\"primary\"\n    (change)=\"expandToggle($event)\"\n  ></mat-slide-toggle>\n  <button\n    mat-icon-button\n    aria-label=\"Expanded\"\n    matTooltip=\"Keep slides expanded\"\n  >\n    <mat-icon>unfold_more</mat-icon>\n  </button>\n  <mat-menu #choicesMenu>\n    <button (click)=\"createChoicesOrigin()\" mat-menu-item>\n      {{'New..'|transloco}}\n    </button>\n    <ng-container *ngIf=\"choicesOrigins|async as cos\">\n      <button\n        *ngFor=\"let choicesOrigin of cos\"\n        (click)=\"editChoicesOrigin(choicesOrigin)\"\n        mat-menu-item\n      >\n        {{ (choicesOrigin.label || choicesOrigin.name)| transloco }}\n      </button>\n    </ng-container>\n  </mat-menu>\n  <span class=\"ajf-spacer\"></span>\n  <button mat-icon-button (click)=\"rightSidenav.toggle()\">\n    <mat-icon>settings</mat-icon>\n  </button>\n</mat-toolbar>\n<mat-drawer-container cdkDropListGroup>\n  <mat-drawer #leftSidenav position=\"start\" mode=\"over\">\n    <div\n      #sourceDropList\n      cdkDropList\n      [cdkDropListConnectedTo]=\"(connectedDropLists|async)!\"\n      [cdkDropListEnterPredicate]=\"disableDrop\"\n      [cdkDropListData]=\"nodeTypes\"\n    >\n      <ajf-fb-node-type-entry\n        *ngFor=\"let nodeType of nodeTypes\"\n        cdkDrag\n        [cdkDragData]=\"nodeType\"\n        (cdkDragStarted)=\"leftSidenav.close()\"\n        [nodeType]=\"nodeType\"\n      ></ajf-fb-node-type-entry>\n    </div>\n  </mat-drawer>\n  <mat-drawer #rightSidenav position=\"end\" mode=\"side\" [opened]=\"true\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </mat-drawer>\n  <div #designer class=\"ajf-designer\">\n    <ajf-fb-node-entry\n      id=\"slides-list\"\n      cdkDropList\n      (cdkDropListDropped)=\"onDrop($event)\"\n      [cdkDropListEnterPredicate]=\"disableFieldDrop\"\n      *ngFor=\"let nodeEntry of (nodeEntriesTree|async); let isFirst = first\"\n      [isExpanded]=\"isGlobalExpanded\"\n      [isFirst]=\"isFirst\"\n      [nodeEntry]=\"nodeEntry\"\n    ></ajf-fb-node-entry>\n  </div>\n</mat-drawer-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-form-builder{display:flex;position:relative;min-height:300px;flex-direction:column;align-items:stretch}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-button]{flex:1 0 auto}ajf-form-builder mat-toolbar mat-menu div[mat-menu-item]>button[mat-icon-button]{flex:0 0 auto}ajf-form-builder mat-drawer-container{flex:1}ajf-form-builder mat-drawer-container mat-drawer{max-width:20%}ajf-form-builder mat-drawer-container .ajf-designer{padding:1em}ajf-form-builder mat-toolbar .ajf-spacer{flex:1 1 auto}\n"]
            },] }
];
AjfFormBuilder.ctorParameters = () => [
    { type: AjfFormBuilderService },
    { type: MatDialog }
];
AjfFormBuilder.propDecorators = {
    designerCont: [{ type: ViewChild, args: ['designer', { static: true },] }],
    form: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBS0gsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFFakUsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUdMLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQVNoRixNQUFNLE9BQU8sY0FBYztJQTBEekIsWUFBb0IsUUFBK0IsRUFBVSxPQUFrQjtRQUEzRCxhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVc7UUExQnZFLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBS2hDOztXQUVHO1FBQ0ssd0JBQW1CLEdBQXlCLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUM7UUFLN0UsUUFBRyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRW5ELFVBQUssR0FBRyxLQUFL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LENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUFwTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLDhoRkFBZ0M7Z0JBRWhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7OztZQVhDLHFCQUFxQjtZQVZmLFNBQVM7OzsyQkF1QmQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7bUJBTXBDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbiwgQWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmQ29uZGl0aW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7Q2RrRHJhZywgQ2RrRHJhZ0Ryb3B9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVDaGFuZ2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3NhbXBsZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jaG9pY2VzLW9yaWdpbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2d9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHtkaXNhYmxlRmllbGREcm9wUHJlZGljYXRlLCBvbkRyb3BQcm9jZXNzfSBmcm9tICcuL2Zvcm0tYnVpbGRlci11dGlscyc7XG5pbXBvcnQge0FqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZm9ybS1idWlsZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3JtLWJ1aWxkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3JtLWJ1aWxkZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZGVzaWduZXInLCB7c3RhdGljOiB0cnVlfSkgZGVzaWduZXJDb250OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm07XG4gIGdldCBmb3JtKCk6IEFqZkZvcm0ge1xuICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPT0gZm9ybSkge1xuICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9zZXRDdXJyZW50Rm9ybSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX25vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W107XG4gIGdldCBub2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT47XG4gIGdldCBub2RlRW50cmllc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9nbG9iYWxFeHBhbmRlZCA9IGZhbHNlO1xuICBnZXQgaXNHbG9iYWxFeHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZ2xvYmFsRXhwYW5kZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGxpc3Qgb2YgdGhlIGlkcyBvZiBhbGwgdGhlIGRyb3BMaXN0cyBjb25uZWN0ZWQgdG8gdGhlIGZvcm1idWlsZGVyIHNvdXJjZSBsaXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdGVkRHJvcExpc3RzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiA9IHRoaXMuX3NlcnZpY2UuY29ubmVjdGVkRHJvcExpc3RzO1xuICBnZXQgY29ubmVjdGVkRHJvcExpc3RzKCk6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmM6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllckRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudD58bnVsbDtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2xhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UsIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgdGhpcy5fbm9kZVR5cGVzID0gX3NlcnZpY2UuYXZhaWxhYmxlTm9kZVR5cGVzO1xuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZSA9IF9zZXJ2aWNlLm5vZGVFbnRyaWVzVHJlZTtcbiAgICB0aGlzLl9jaG9pY2VzT3JpZ2lucyA9IF9zZXJ2aWNlLmNob2ljZXNPcmlnaW5zO1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25TdWIgPVxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmVkaXRlZENvbmRpdGlvbi5zdWJzY3JpYmUoKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9ufG51bGwpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nID1cbiAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZywge2Rpc2FibGVDbG9zZTogdHJ1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5TdWIgPVxuICAgICAgICB0aGlzLl9zZXJ2aWNlLmVkaXRlZENob2ljZXNPcmlnaW4uc3Vic2NyaWJlKChjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT58bnVsbCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY2hvaWNlc09yaWdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZyA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yRGlhbG9nLCB7ZGlzYWJsZUNsb3NlOiB0cnVlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlU3ViID0gdGhpcy5fc2VydmljZS5iZWZvcmVOb2Rlc1VwZGF0ZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGVzaWduZXJDb250ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fbGFzdFNjcm9sbFRvcCA9IHRoaXMuZGVzaWduZXJDb250Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIH0pO1xuXG4gICAgdGhpcy5ub2RlRW50cmllc1RyZWUucGlwZShzYW1wbGUoKDxPYnNlcnZhYmxlPHZvaWQ+PnRoaXMuX3ZjKSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlc2lnbmVyQ29udC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX2xhc3RTY3JvbGxUb3A7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViID0gdGhpcy5fc2VydmljZS5zdHJpbmdJZGVudGlmaWVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fdmMuZW1pdCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NldEN1cnJlbnRGb3JtKCk7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZvcm0obnVsbCk7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuY3JlYXRlQ2hvaWNlc09yaWdpbigpO1xuICB9XG5cbiAgZGlzYWJsZURyb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGlzYWJsZUZpZWxkRHJvcChpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGlzYWJsZUZpZWxkRHJvcFByZWRpY2F0ZShpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB3aGVuIGEgZmllbGQgb3Igc2xpZGUgbm9kZSBpcyBtb3ZlZCBvciBpbnNlcnRlZCBieSBkcmFnJmRyb3BwaW5nIGluIHRoZSBmb3JtYnVpbGRlci5cbiAgICogQHBhcmFtIGV2ZW50IFRoZSBkcm9wIGV2ZW50LlxuICAgKiBAcGFyYW0gY29udGVudCBUcnVlIGlmIHRoZSBjdXJyZW50IG5vZGVFbnRyeSBjb250YWlucyBvdGhlciBub2RlRW50cmllcy5cbiAgICovXG4gIG9uRHJvcChcbiAgICAgIGV2ZW50OiBDZGtEcmFnRHJvcDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT58Q2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PixcbiAgICAgIGNvbnRlbnQgPSBmYWxzZSk6IHZvaWQge1xuICAgIG9uRHJvcFByb2Nlc3MoZXZlbnQsIHRoaXMuX3NlcnZpY2UsIG51bGwsIGNvbnRlbnQpO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5lZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luKTtcbiAgfVxuXG4gIGVkaXRTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oXG4gICAgICAgIEFqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudCwge2Rpc2FibGVDbG9zZTogdHJ1ZSwgd2lkdGg6ICc2MCUnLCBoZWlnaHQ6ICc2MCUnfSk7XG4gIH1cblxuICBleHBhbmRBbGwoKSB7XG4gICAgdGhpcy5fZ2xvYmFsRXhwYW5kZWQgPSB0cnVlO1xuICB9XG5cbiAgY29sbGFwc2VBbGwoKSB7XG4gICAgdGhpcy5fZ2xvYmFsRXhwYW5kZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGV4cGFuZFRvZ2dsZShldnQ6IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKSB7XG4gICAgaWYgKGV2dC5jaGVja2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZEFsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbGxhcHNlQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICB9XG59XG4iXX0=