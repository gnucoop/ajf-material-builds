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
    return AjfFormBuilder;
})();
export { AjfFormBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBSUgsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUdMLHFCQUFxQixFQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBQyxvQ0FBb0MsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWhGO0lBQUEsTUFPYSxjQUFjO1FBNkN6QixZQUFvQixRQUErQixFQUFVLE9BQWtCO1lBQTNELGFBQVEsR0FBUixRQUFRLENBQXVCO1lBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBVztZQWJ2RSxRQUFHLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7WUFFbkQsVUFBSyxHQUFHLEtBQUssQ0FBQztZQUNkLHNCQUFpQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBRXJELDBCQUFxQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3pELDBCQUFxQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1lBR3pELHlCQUFvQixHQUFpQixZQUFZ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QUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM1QyxvQ0FBb0MsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBRU8sZUFBZTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O2dCQXhJRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsK3dEQUFnQztvQkFFaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7OztnQkFWQyxxQkFBcUI7Z0JBVGYsU0FBUzs7OytCQXFCZCxTQUFTLFNBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt1QkFNcEMsS0FBSzs7SUEySFIscUJBQUM7S0FBQTtTQWxJWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW4sIEFqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzYW1wbGV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2d9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyU2VydmljZVxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mb3JtLWJ1aWxkZXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm0tYnVpbGRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm0tYnVpbGRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdkZXNpZ25lcicsIHtzdGF0aWM6IHRydWV9KSBkZXNpZ25lckNvbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybTtcbiAgZ2V0IGZvcm0oKTogQWpmRm9ybSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm07XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZvcm0oZm9ybTogQWpmRm9ybSkge1xuICAgIGlmICh0aGlzLl9mb3JtICE9PSBmb3JtKSB7XG4gICAgICB0aGlzLl9mb3JtID0gZm9ybTtcbiAgICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICAgIHRoaXMuX3NldEN1cnJlbnRGb3JtKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXTtcbiAgZ2V0IG5vZGVUeXBlcygpOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVUeXBlcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPjtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+O1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX3ZjOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz58bnVsbDtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNPcmlnaW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNPcmlnaW5EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2c+fG51bGw7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJEaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQ+fG51bGw7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9sYXN0U2Nyb2xsVG9wOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLCBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZykge1xuICAgIHRoaXMuX25vZGVUeXBlcyA9IF9zZXJ2aWNlLmF2YWlsYWJsZU5vZGVUeXBlcztcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSBfc2VydmljZS5ub2RlRW50cmllc1RyZWU7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBfc2VydmljZS5jaG9pY2VzT3JpZ2lucztcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViID1cbiAgICAgICAgdGhpcy5fc2VydmljZS5lZGl0ZWRDb25kaXRpb24uc3Vic2NyaWJlKChjb25kaXRpb246IEFqZkNvbmRpdGlvbnxudWxsKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJDb25kaXRpb25FZGl0b3JEaWFsb2csIHtkaXNhYmxlQ2xvc2U6IHRydWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luU3ViID1cbiAgICAgICAgdGhpcy5fc2VydmljZS5lZGl0ZWRDaG9pY2VzT3JpZ2luLnN1YnNjcmliZSgoY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZywge2Rpc2FibGVDbG9zZTogdHJ1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZVN1YiA9IHRoaXMuX3NlcnZpY2UuYmVmb3JlTm9kZXNVcGRhdGUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRlc2lnbmVyQ29udCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xhc3RTY3JvbGxUb3AgPSB0aGlzLmRlc2lnbmVyQ29udC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICB9KTtcblxuICAgIHRoaXMubm9kZUVudHJpZXNUcmVlLnBpcGUoc2FtcGxlKCg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl92YykpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGVzaWduZXJDb250ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5kZXNpZ25lckNvbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLl9sYXN0U2Nyb2xsVG9wO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1YiA9IHRoaXMuX3NlcnZpY2Uuc3RyaW5nSWRlbnRpZmllci5zdWJzY3JpYmUoKCkgPT4ge30pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZjLmVtaXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRDdXJyZW50Rm9ybSgpO1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdENvbmRpdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGb3JtKG51bGwpO1xuICB9XG5cbiAgY3JlYXRlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmNyZWF0ZUNob2ljZXNPcmlnaW4oKTtcbiAgfVxuXG4gIGRpc2FibGVEcm9wUHJlZGljYXRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55Pik6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbik7XG4gIH1cblxuICBlZGl0U3RyaW5nSWRlbnRpZmllcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nLmNsb3NlKCk7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZyA9IHRoaXMuX2RpYWxvZy5vcGVuKFxuICAgICAgICBBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQsIHtkaXNhYmxlQ2xvc2U6IHRydWUsIHdpZHRoOiAnNjAlJywgaGVpZ2h0OiAnNjAlJ30pO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudEZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICB9XG59XG4iXX0=