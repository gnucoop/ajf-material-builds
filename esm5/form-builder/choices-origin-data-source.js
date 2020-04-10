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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Nob2ljZXMtb3JpZ2luLWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxFQUFDLGVBQWUsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQVFqRDtJQUE2QywyQ0FBb0M7SUFLL0U7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFQTyxjQUFRLEdBQ1osSUFBSSxlQUFlLENBQTZCLEVBQUUsQ0FBQyxDQUFDO1FBS3RELEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFDbEQsQ0FBQztJQUVELHlDQUFPLEdBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUVELDRDQUFVLEdBQVYsY0FBYyxDQUFDO0lBRWYsK0NBQWEsR0FBYixVQUFjLE9BQW1DO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFuQkQsQ0FBNkMsVUFBVSxHQW1CdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcblxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5cbmV4cG9ydCB0eXBlIENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeSA9IHtcbiAgbGFiZWw6IHN0cmluZyxcbiAgdmFsdWU6IHN0cmluZ1xufTtcblxuZXhwb3J0IGNsYXNzIENob2ljZXNPcmlnaW5EYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZTxDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnk+IHtcbiAgcHJpdmF0ZSBfY2hvaWNlczogQmVoYXZpb3JTdWJqZWN0PENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeVtdPihbXSk7XG4gIHByaXZhdGUgX2Nob2ljZXNPYnM6IE9ic2VydmFibGU8Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2hvaWNlc09icyA9IHRoaXMuX2Nob2ljZXMuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25uZWN0KCk6IE9ic2VydmFibGU8Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09icztcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoKSB7fVxuXG4gIHVwZGF0ZUNob2ljZXMoY2hvaWNlczogQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10pIHtcbiAgICB0aGlzLl9jaG9pY2VzLm5leHQoY2hvaWNlcyk7XG4gIH1cbn1cbiJdfQ==