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
import { isChoicesFixedOrigin } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ChoicesOriginDataSource } from './choices-origin-data-source';
var AjfFbChoicesOriginEditor = /** @class */ (function () {
    function AjfFbChoicesOriginEditor() {
        this._displayedColumns = ['label', 'value', 'delete'];
        this.editing = {};
        this._choices = new ChoicesOriginDataSource();
        this._choicesArr = [];
    }
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "displayedColumns", {
        get: function () { return this._displayedColumns; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesOrigin", {
        get: function () {
            return this._choicesOrigin;
        },
        set: function (choicesOrigin) {
            this._choicesOrigin = choicesOrigin;
            this.name = choicesOrigin.name;
            this.label = choicesOrigin.label;
            this.canEditChoices = isChoicesFixedOrigin(choicesOrigin);
            this._choicesArr = choicesOrigin.choices;
            this._choices.updateChoices(this._choicesArr);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choices", {
        get: function () { return this._choices; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFbChoicesOriginEditor.prototype, "choicesArr", {
        get: function () { return this._choicesArr; },
        enumerable: true,
        configurable: true
    });
    AjfFbChoicesOriginEditor.prototype.updateValue = function (evt, cell, _value, rowIdx) {
        this.editing[rowIdx + '-' + cell] = false;
        this._choicesArr[rowIdx][cell] = evt.target.value;
        this._choices.updateChoices(this._choicesArr);
    };
    AjfFbChoicesOriginEditor.prototype.deleteRow = function (rowIdx) {
        this._choicesArr.splice(rowIdx, 1);
        this._choices.updateChoices(this._choicesArr);
    };
    AjfFbChoicesOriginEditor.prototype.addRow = function () {
        this._choicesArr.push({ label: '', value: '' });
        this._choices.updateChoices(this._choicesArr);
    };
    AjfFbChoicesOriginEditor.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-fb-choices-origin-editor',
                    template: "<div>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"name\"\n        [placeholder]=\"'Name' | translate\">\n  </mat-form-field>\n  <mat-form-field>\n    <input matInput [(ngModel)]=\"label\"\n        [placeholder]=\"'Label' | translate\">\n  </mat-form-field>\n  <ng-template [ngIf]=\"canEditChoices\">\n    <button (click)=\"addRow()\" mat-button>\n      <mat-icon>add</mat-icon>\n      <span translate>Add value</span>\n    </button>\n    <mat-table [dataSource]=\"choices\">\n      <ng-container matColumnDef=\"label\">\n        <mat-header-cell *matHeaderCellDef translate>Label</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.label\" type=\"text\">\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"value\">\n        <mat-header-cell *matHeaderCellDef translate>Value</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n          <input matInput [(ngModel)]=\"row.value\" type=\"text\">\n        </mat-cell>\n      </ng-container>\n      <ng-container matColumnDef=\"delete\">\n        <mat-header-cell *matHeaderCellDef translate>Delete</mat-header-cell>\n        <mat-cell *matCellDef=\"let row; let idx = index\">\n            <mat-icon (click)=\"deleteRow(idx)\">delete</mat-icon>\n        </mat-cell>\n      </ng-container>\n\n      <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n      <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\n    </mat-table>\n  </ng-template>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-fb-choices-origin-editor mat-form-field+mat-form-field{margin-left:1em}ajf-fb-choices-origin-editor mat-table{max-height:300px}ajf-fb-choices-origin-editor mat-table mat-icon{cursor:pointer}\n"]
                }] }
    ];
    AjfFbChoicesOriginEditor.propDecorators = {
        choicesOrigin: [{ type: Input }]
    };
    return AjfFbChoicesOriginEditor;
}());
export { AjfFbChoicesOriginEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9jaG9pY2VzLW9yaWdpbi1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFtQixvQkFBb0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBMkIsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUcvRjtJQUFBO1FBUVUsc0JBQWlCLEdBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBa0JuRSxZQUFPLEdBQTZCLEVBQUUsQ0FBQztRQUsvQixhQUFRLEdBQTRCLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUdsRSxnQkFBVyxHQUErQixFQUFFLENBQUM7SUFrQnZELENBQUM7SUEzQ0Msc0JBQUksc0RBQWdCO2FBQXBCLGNBQW1DLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHbkUsc0JBQUksbURBQWE7YUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQzthQUNELFVBQ2tCLGFBQW9DO1lBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFFakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQVZBO0lBa0JELHNCQUFJLDZDQUFPO2FBQVgsY0FBeUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHaEUsc0JBQUksZ0RBQVU7YUFBZCxjQUErQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUV6RSw4Q0FBVyxHQUFYLFVBQVksR0FBUSxFQUFFLElBQVksRUFBRSxNQUFXLEVBQUUsTUFBYztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCw0Q0FBUyxHQUFULFVBQVUsTUFBYztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCx5Q0FBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDOztnQkFuREYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLHdqREFBeUM7b0JBRXpDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0NBU0UsS0FBSzs7SUFxQ1IsK0JBQUM7Q0FBQSxBQXBERCxJQW9EQztTQTdDWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbiwgaXNDaG9pY2VzRml4ZWRPcmlnaW59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5LCBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZX0gZnJvbSAnLi9jaG9pY2VzLW9yaWdpbi1kYXRhLXNvdXJjZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZiLWNob2ljZXMtb3JpZ2luLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY2hvaWNlcy1vcmlnaW4tZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZGYkNob2ljZXNPcmlnaW5FZGl0b3Ige1xuICBwcml2YXRlIF9kaXNwbGF5ZWRDb2x1bW5zOiBzdHJpbmdbXSA9IFsnbGFiZWwnLCAndmFsdWUnLCAnZGVsZXRlJ107XG4gIGdldCBkaXNwbGF5ZWRDb2x1bW5zKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX2Rpc3BsYXllZENvbHVtbnM7IH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT47XG4gIGdldCBjaG9pY2VzT3JpZ2luKCk6IEFqZkNob2ljZXNPcmlnaW48YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW47XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KSB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbiA9IGNob2ljZXNPcmlnaW47XG4gICAgdGhpcy5uYW1lID0gY2hvaWNlc09yaWdpbi5uYW1lO1xuICAgIHRoaXMubGFiZWwgPSBjaG9pY2VzT3JpZ2luLmxhYmVsO1xuXG4gICAgdGhpcy5jYW5FZGl0Q2hvaWNlcyA9IGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pO1xuICAgIHRoaXMuX2Nob2ljZXNBcnIgPSBjaG9pY2VzT3JpZ2luLmNob2ljZXM7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG5cbiAgZWRpdGluZzoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG4gIG5hbWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgY2FuRWRpdENob2ljZXM6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfY2hvaWNlczogQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2UgPSBuZXcgQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2UoKTtcbiAgZ2V0IGNob2ljZXMoKTogQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2UgeyByZXR1cm4gdGhpcy5fY2hvaWNlczsgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNBcnI6IENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdID0gW107XG4gIGdldCBjaG9pY2VzQXJyKCk6IENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdIHsgcmV0dXJuIHRoaXMuX2Nob2ljZXNBcnI7IH1cblxuICB1cGRhdGVWYWx1ZShldnQ6IGFueSwgY2VsbDogc3RyaW5nLCBfdmFsdWU6IGFueSwgcm93SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmVkaXRpbmdbcm93SWR4ICsgJy0nICsgY2VsbF0gPSBmYWxzZTtcbiAgICAodGhpcy5fY2hvaWNlc0Fycltyb3dJZHhdIGFzIGFueSlbY2VsbF0gPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuX2Nob2ljZXMudXBkYXRlQ2hvaWNlcyh0aGlzLl9jaG9pY2VzQXJyKTtcbiAgfVxuXG4gIGRlbGV0ZVJvdyhyb3dJZHg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNBcnIuc3BsaWNlKHJvd0lkeCwgMSk7XG4gICAgdGhpcy5fY2hvaWNlcy51cGRhdGVDaG9pY2VzKHRoaXMuX2Nob2ljZXNBcnIpO1xuICB9XG5cbiAgYWRkUm93KCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNBcnIucHVzaCh7bGFiZWw6ICcnLCB2YWx1ZTogJyd9KTtcbiAgICB0aGlzLl9jaG9pY2VzLnVwZGF0ZUNob2ljZXModGhpcy5fY2hvaWNlc0Fycik7XG4gIH1cbn1cbiJdfQ==