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
import { AjfFormField as CoreFormField } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewEncapsulation } from '@angular/core';
import { AjfFieldService } from './field-service';
export class AjfFormField extends CoreFormField {
    constructor(cdr, cfr, fieldService) {
        super(cdr, cfr);
        this.componentsMap = fieldService.componentsMap;
    }
}
AjfFormField.decorators = [
    { type: Component, args: [{
                selector: 'ajf-field,ajf-form-field',
                template: "<div\n    [ngClass]=\"'ajf-field-' + (instance|ajfNodeCompleteName)\"\n    [class.ajf-validated]=\"instance.validationResults|ajfFieldIsValid\"\n>\n  <ng-template ajf-field-host></ng-template>\n</div>\n<ng-container *ngIf=\"instance && instance.node && instance.node.attachments\">\n  <a *ngFor=\"let attachment of instance.node.attachments\"\n    [href]=\"attachment.value\" target=\"_blank\">{{attachment.label | transloco}}</a>\n</ng-container>\n<div *ngIf=\"!readonly && instance && instance.validationResults\" class=\"ajf-errors\">\n  <ng-container *ngFor=\"let res of instance.validationResults\">\n    <div class=\"error\" *ngIf=\"!res.result\">\n      {{ res.error|transloco }} \n    </div>\n  </ng-container>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["ajf-field .ajf-choices-container{display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch}ajf-field .ajf-item-container{position:relative}ajf-field .ajf-errors{font-style:italic;padding:5px}ajf-field tr.ajf-row-odd{background-color:gray}table{border-collapse:collapse;border-spacing:0}table tr td{position:relative}table tr td span,table tr td input{cursor:text;position:absolute;width:100%;box-sizing:border-box;outline:none;top:0;right:0;bottom:0;left:0;display:inline-block;border-top:solid 1px #ccc;border-right:solid 1px transparent;border-bottom:solid 1px transparent;border-left:solid 1px #ccc;font-family:inherit;font-size:inherit;line-height:inherit;text-align:center}table tr td:last-child span,table tr td:last-child input{border-right-color:#ccc}table tr:last-of-type td span,table tr:last-of-type td input{border-bottom-color:#ccc}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}\n"]
            },] }
];
AjfFormField.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: AjfFieldService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybXMvZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUF3QixZQUFZLElBQUksYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFckYsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUN4QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBU2hELE1BQU0sT0FBTyxZQUFhLFNBQVEsYUFBYTtJQUc3QyxZQUNJLEdBQXNCLEVBQUUsR0FBNkIsRUFBRSxZQUE2QjtRQUN0RixLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQztJQUNsRCxDQUFDOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsb3VCQUF5QjtnQkFFekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBZEMsaUJBQWlCO1lBRWpCLHdCQUF3QjtZQUlsQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkQ29tcG9uZW50c01hcCwgQWpmRm9ybUZpZWxkIGFzIENvcmVGb3JtRmllbGR9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZpZWxkU2VydmljZX0gZnJvbSAnLi9maWVsZC1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZpZWxkLGFqZi1mb3JtLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICdmaWVsZC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2ZpZWxkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybUZpZWxkIGV4dGVuZHMgQ29yZUZvcm1GaWVsZCB7XG4gIHJlYWRvbmx5IGNvbXBvbmVudHNNYXA6IEFqZkZpZWxkQ29tcG9uZW50c01hcDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBmaWVsZFNlcnZpY2U6IEFqZkZpZWxkU2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgY2ZyKTtcbiAgICB0aGlzLmNvbXBvbmVudHNNYXAgPSBmaWVsZFNlcnZpY2UuY29tcG9uZW50c01hcDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZWFkb25seTogQm9vbGVhbklucHV0O1xufVxuIl19