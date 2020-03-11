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
import { __extends } from "tslib";
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
var ChoicesOriginDataSource = /** @class */ (function (_super) {
    __extends(ChoicesOriginDataSource, _super);
    function ChoicesOriginDataSource() {
        var _this = _super.call(this) || this;
        _this._choices = new BehaviorSubject([]);
        _this._choicesObs = _this._choices.asObservable();
        return _this;
    }
    ChoicesOriginDataSource.prototype.connect = function () {
        return this._choicesObs;
    };
    ChoicesOriginDataSource.prototype.disconnect = function () { };
    ChoicesOriginDataSource.prototype.updateChoices = function (choices) {
        this._choices.next(choices);
    };
    return ChoicesOriginDataSource;
}(DataSource));
export { ChoicesOriginDataSource };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Nob2ljZXMtb3JpZ2luLWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUtqRDtJQUNZLDJDQUFvQztJQUs5QztRQUFBLFlBQ0UsaUJBQU8sU0FFUjtRQVBPLGNBQVEsR0FDWixJQUFJLGVBQWUsQ0FBNkIsRUFBRSxDQUFDLENBQUM7UUFLdEQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDOztJQUNsRCxDQUFDO0lBRUQseUNBQU8sR0FBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsNENBQVUsR0FBVixjQUFjLENBQUM7SUFFZiwrQ0FBYSxHQUFiLFVBQWMsT0FBbUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUNZLFVBQVUsR0FtQnJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0RhdGFTb3VyY2V9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5cbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuXG5leHBvcnQgdHlwZSBDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnkgPSB7bGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZ307XG5cbmV4cG9ydCBjbGFzcyBDaG9pY2VzT3JpZ2luRGF0YVNvdXJjZVxuICAgIGV4dGVuZHMgRGF0YVNvdXJjZTxDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnk+IHtcbiAgcHJpdmF0ZSBfY2hvaWNlczogQmVoYXZpb3JTdWJqZWN0PENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdPihbXSk7XG4gIHByaXZhdGUgX2Nob2ljZXNPYnM6IE9ic2VydmFibGU8Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2hvaWNlc09icyA9IHRoaXMuX2Nob2ljZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09icztcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7fVxuXG4gIHVwZGF0ZUNob2ljZXMoY2hvaWNlczogQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10pIHtcbiAgICB0aGlzLl9jaG9pY2VzLm5leHQoY2hvaWNlcyk7XG4gIH1cbn1cbiJdfQ==