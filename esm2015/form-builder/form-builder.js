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
let AjfFormBuilder = /** @class */ (() => {
    class AjfFormBuilder {
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
        disableDropPredicate() {
            return false;
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
    return AjfFormBuilder;
})();
export { AjfFormBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBSUgsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUdMLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWhGO0lBQUEsTUFPYSxjQUFjO1FBNkN6QixZQUFvQixRQUErQixFQUFVLE9BQWtCO1lBQTNELGFBQVEsR0FBUixRQUFRLENBQXVCO1lBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBVztZQWJ2RSxRQUFHLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7WUFFbkQsVUFBSyxHQUFHLEtBQUssQ0FBQztZQUNkLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBRXJELDBCQUFxQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3pELDBCQUFxQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBR3pELHlCQUFvQixHQUFpQixZQUFZ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QUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM1QyxvQ0FBb0MsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBRU8sZUFBZTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O2dCQXhJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsK3dEQUFnQztvQkFFaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBVkMscUJBQXFCO2dCQVRmLFNBQVM7OzsrQkFxQmQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7dUJBTXBDLEtBQUs7O0lBMkhSLHFCQUFDO0tBQUE7U0FsSVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luLCBBamZGb3JtfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtBamZDb25kaXRpb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2FtcGxlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yRGlhbG9nfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLWVkaXRvci1kaWFsb2cnO1xuaW1wb3J0IHtBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZ30gZnJvbSAnLi9jb25kaXRpb24tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge1xuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlclNlcnZpY2Vcbn0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5pbXBvcnQge0FqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudH0gZnJvbSAnLi9zdHJpbmctaWRlbnRpZmllci1kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZm9ybS1idWlsZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3JtLWJ1aWxkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydmb3JtLWJ1aWxkZXIuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZGVzaWduZXInLCB7c3RhdGljOiB0cnVlfSkgZGVzaWduZXJDb250OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm07XG4gIGdldCBmb3JtKCk6IEFqZkZvcm0ge1xuICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPT0gZm9ybSkge1xuICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9zZXRDdXJyZW50Rm9ybSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX25vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W107XG4gIGdldCBub2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWU6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT47XG4gIGdldCBub2RlRW50cmllc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPjtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF92YzogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZWRpdENvbmRpdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzT3JpZ2luU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJDaG9pY2VzT3JpZ2luRWRpdG9yRGlhbG9nPnxudWxsO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50PnxudWxsO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkZvcm1CdWlsZGVyU2VydmljZSwgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2cpIHtcbiAgICB0aGlzLl9ub2RlVHlwZXMgPSBfc2VydmljZS5hdmFpbGFibGVOb2RlVHlwZXM7XG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gX3NlcnZpY2Uubm9kZUVudHJpZXNUcmVlO1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zID0gX3NlcnZpY2UuY2hvaWNlc09yaWdpbnM7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvblN1YiA9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdGVkQ29uZGl0aW9uLnN1YnNjcmliZSgoY29uZGl0aW9uOiBBamZDb25kaXRpb258bnVsbCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9lZGl0Q29uZGl0aW9uRGlhbG9nICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nLCB7ZGlzYWJsZUNsb3NlOiB0cnVlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpblN1YiA9XG4gICAgICAgIHRoaXMuX3NlcnZpY2UuZWRpdGVkQ2hvaWNlc09yaWdpbi5zdWJzY3JpYmUoKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55PnxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nID1cbiAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2csIHtkaXNhYmxlQ2xvc2U6IHRydWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVTdWIgPSB0aGlzLl9zZXJ2aWNlLmJlZm9yZU5vZGVzVXBkYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9sYXN0U2Nyb2xsVG9wID0gdGhpcy5kZXNpZ25lckNvbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfSk7XG5cbiAgICB0aGlzLm5vZGVFbnRyaWVzVHJlZS5waXBlKHNhbXBsZSgoPE9ic2VydmFibGU8dm9pZD4+dGhpcy5fdmMpKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRlc2lnbmVyQ29udCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVzaWduZXJDb250Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gdGhpcy5fbGFzdFNjcm9sbFRvcDtcbiAgICB9KTtcblxuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLnN0cmluZ0lkZW50aWZpZXIuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl92Yy5lbWl0KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q3VycmVudEZvcm0oKTtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Rm9ybShudWxsKTtcbiAgfVxuXG4gIGNyZWF0ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jcmVhdGVDaG9pY2VzT3JpZ2luKCk7XG4gIH1cblxuICBkaXNhYmxlRHJvcFByZWRpY2F0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgZWRpdFN0cmluZ0lkZW50aWZpZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZyA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihcbiAgICAgICAgQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50LCB7ZGlzYWJsZUNsb3NlOiB0cnVlLCB3aWR0aDogJzYwJScsIGhlaWdodDogJzYwJSd9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEN1cnJlbnRGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgfVxufVxuIl19