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
var AjfFormBuilder = /** @class */ (function () {
    function AjfFormBuilder(_service, _dialog) {
        var _this = this;
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
            .subscribe(function (condition) {
            if (_this._editConditionDialog != null) {
                _this._editConditionDialog.close();
                _this._editConditionDialog = null;
            }
            if (condition != null) {
                _this._editConditionDialog = _this._dialog.open(AjfFbConditionEditorDialog, { disableClose: true });
            }
        });
        this._editChoicesOriginSub =
            this._service.editedChoicesOrigin.subscribe(function (choicesOrigin) {
                if (_this._editChoicesOriginDialog != null) {
                    _this._editChoicesOriginDialog.close();
                    _this._editChoicesOriginDialog = null;
                }
                if (choicesOrigin != null) {
                    _this._editChoicesOriginDialog =
                        _this._dialog.open(AjfFbChoicesOriginEditorDialog, { disableClose: true });
                }
            });
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate
            .subscribe(function () {
            if (_this.designerCont == null) {
                return;
            }
            _this._lastScrollTop = _this.designerCont.nativeElement.scrollTop;
        });
        this.nodeEntriesTree
            .pipe(sample(this._vc))
            .subscribe(function () {
            if (_this.designerCont == null) {
                return;
            }
            _this.designerCont.nativeElement.scrollTop = _this._lastScrollTop;
        });
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe(function () { });
    }
    Object.defineProperty(AjfFormBuilder.prototype, "form", {
        get: function () { return this._form; },
        set: function (form) {
            if (this._form !== form) {
                this._form = form;
                if (this._init) {
                    this._setCurrentForm();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "nodeTypes", {
        get: function () { return this._nodeTypes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "nodeEntriesTree", {
        get: function () { return this._nodeEntriesTree; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormBuilder.prototype, "choicesOrigins", {
        get: function () {
            return this._choicesOrigins;
        },
        enumerable: true,
        configurable: true
    });
    AjfFormBuilder.prototype.ngAfterViewChecked = function () {
        this._vc.emit();
    };
    AjfFormBuilder.prototype.ngAfterContentInit = function () {
        this._setCurrentForm();
        this._init = true;
    };
    AjfFormBuilder.prototype.ngOnDestroy = function () {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
    };
    AjfFormBuilder.prototype.createChoicesOrigin = function () {
        this._service.createChoicesOrigin();
    };
    AjfFormBuilder.prototype.disableDropPredicate = function () {
        return false;
    };
    AjfFormBuilder.prototype.editChoicesOrigin = function (choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    };
    AjfFormBuilder.prototype.editStringIdentifier = function () {
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
    };
    AjfFormBuilder.prototype._setCurrentForm = function () {
        this._service.setForm(this._form);
    };
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
    AjfFormBuilder.ctorParameters = function () { return [
        { type: AjfFormBuilderService },
        { type: MatDialog }
    ]; };
    AjfFormBuilder.propDecorators = {
        designerCont: [{ type: ViewChild, args: ['designer', { static: true },] }],
        form: [{ type: Input }]
    };
    return AjfFormBuilder;
}());
export { AjfFormBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBSUgsT0FBTyxFQUMrQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFDaEcsS0FBSyxFQUFhLFNBQVMsRUFBRSxpQkFBaUIsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzlFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFDaUQscUJBQXFCLEVBQzVFLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFaEY7SUE2Q0Usd0JBQ1UsUUFBK0IsRUFDL0IsT0FBa0I7UUFGNUIsaUJBNkNDO1FBNUNTLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBQy9CLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFmcEIsUUFBRyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRW5ELFVBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxzQkFBaUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUVyRCwwQkFBcUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN6RCwwQkFBcUIsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUd6RCx5QkFB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QUksQ0FBQztTQUNyQztRQUNELElBQUksQ0FBQyx1QkFBdUI7WUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLEVBQUU7Z0JBQ3RELFlBQVksRUFBRSxJQUFJO2dCQUNsQixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztJQUNULENBQUM7SUFFTyx3Q0FBZSxHQUF2QjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkF4SUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLCt3REFBZ0M7b0JBRWhDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQVZ1RCxxQkFBcUI7Z0JBUHJFLFNBQVM7OzsrQkFtQmQsU0FBUyxTQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7dUJBSXBDLEtBQUs7O0lBNkhSLHFCQUFDO0NBQUEsQUF6SUQsSUF5SUM7U0FsSVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW4sIEFqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzYW1wbGV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2d9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LCBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksIEFqZkZvcm1CdWlsZGVyU2VydmljZVxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50fSBmcm9tICcuL3N0cmluZy1pZGVudGlmaWVyLWRpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mb3JtLWJ1aWxkZXInLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm0tYnVpbGRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2Zvcm0tYnVpbGRlci5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdkZXNpZ25lcicsIHtzdGF0aWM6IHRydWV9KSBkZXNpZ25lckNvbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybTtcbiAgZ2V0IGZvcm0oKTogQWpmRm9ybSB7IHJldHVybiB0aGlzLl9mb3JtOyB9XG4gIEBJbnB1dCgpIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPT0gZm9ybSkge1xuICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9zZXRDdXJyZW50Rm9ybSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX25vZGVUeXBlczogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W107XG4gIGdldCBub2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10geyByZXR1cm4gdGhpcy5fbm9kZVR5cGVzOyB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4geyByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlOyB9XG5cbiAgcHJpdmF0ZSBfY2hvaWNlc09yaWdpbnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+O1xuICBnZXQgY2hvaWNlc09yaWdpbnMoKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX3ZjOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz4gfCBudWxsO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZz4gfCBudWxsO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyRGlhbG9nOiBNYXREaWFsb2dSZWY8QWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50PiB8IG51bGw7XG4gIHByaXZhdGUgX3N0cmluZ0lkZW50aWZpZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9sYXN0U2Nyb2xsVG9wOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nXG4gICkge1xuICAgIHRoaXMuX25vZGVUeXBlcyA9IF9zZXJ2aWNlLmF2YWlsYWJsZU5vZGVUeXBlcztcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSBfc2VydmljZS5ub2RlRW50cmllc1RyZWU7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBfc2VydmljZS5jaG9pY2VzT3JpZ2lucztcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViID0gdGhpcy5fc2VydmljZS5lZGl0ZWRDb25kaXRpb25cbiAgICAgIC5zdWJzY3JpYmUoKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uIHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihcbiAgICAgICAgICAgIEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nLCB7ZGlzYWJsZUNsb3NlOiB0cnVlfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luU3ViID1cbiAgICAgICAgdGhpcy5fc2VydmljZS5lZGl0ZWRDaG9pY2VzT3JpZ2luLnN1YnNjcmliZSgoY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+fG51bGwpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZywge2Rpc2FibGVDbG9zZTogdHJ1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZVN1YiA9IHRoaXMuX3NlcnZpY2UuYmVmb3JlTm9kZXNVcGRhdGVcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgdGhpcy5fbGFzdFNjcm9sbFRvcCA9IHRoaXMuZGVzaWduZXJDb250Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLm5vZGVFbnRyaWVzVHJlZVxuICAgICAgLnBpcGUoc2FtcGxlKCg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl92YykpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRlc2lnbmVyQ29udCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgICB0aGlzLmRlc2lnbmVyQ29udC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX2xhc3RTY3JvbGxUb3A7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJTdWIgPSB0aGlzLl9zZXJ2aWNlLnN0cmluZ0lkZW50aWZpZXIuc3Vic2NyaWJlKCgpID0+IHt9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl92Yy5lbWl0KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q3VycmVudEZvcm0oKTtcbiAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRDb25kaXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2V0Rm9ybShudWxsKTtcbiAgfVxuXG4gIGNyZWF0ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5jcmVhdGVDaG9pY2VzT3JpZ2luKCk7XG4gIH1cblxuICBkaXNhYmxlRHJvcFByZWRpY2F0ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBlZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgZWRpdFN0cmluZ0lkZW50aWZpZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZy5jbG9zZSgpO1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllckRpYWxvZyA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgPVxuICAgICAgICB0aGlzLl9kaWFsb2cub3BlbihBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWUsXG4gICAgICAgICAgd2lkdGg6ICc2MCUnLFxuICAgICAgICAgIGhlaWdodDogJzYwJSdcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50Rm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gIH1cbn1cbiJdfQ==