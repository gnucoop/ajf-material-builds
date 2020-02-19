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
import { __extends } from "tslib";
import { AjfDateValueStringPipe, AjfBaseFieldComponent, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { AjfWarningAlertService } from './warning-alert-service';
var AjfDateInputFieldComponent = /** @class */ (function (_super) {
    __extends(AjfDateInputFieldComponent, _super);
    function AjfDateInputFieldComponent(cdr, service, was, _dvs) {
        var _this = _super.call(this, cdr, service, was) || this;
        _this._dvs = _dvs;
        return _this;
    }
    AjfDateInputFieldComponent.prototype.onChange = function () {
        if (this.input == null) {
            return;
        }
        var val = this.input.value || '';
        if (val.length > 0) {
            if ((this._minDateStr != null && val < this._minDateStr)
                || (this._maxDateStr != null && val > this._maxDateStr)) {
                this.input.value = '';
            }
        }
    };
    AjfDateInputFieldComponent.prototype._onInstanceChange = function () {
        this._minDateStr = this._dvs.transform(this.instance.node.minDate);
        this._maxDateStr = this._dvs.transform(this.instance.node.maxDate);
    };
    AjfDateInputFieldComponent.decorators = [
        { type: Component, args: [{
                    template: "<mat-form-field *ngIf=\"control|async as ctrl\">\n  <input matInput type=\"date\"\n      [attr.aria-label]=\"instance.node.label || (instance|ajfNodeCompleteName)\"\n      [min]=\"instance.node.minDate|ajfDateValueString\"\n      [max]=\"instance.node.maxDate|ajfDateValueString\"\n      [readonly]=\"readonly\"\n      (change)=\"onChange()\"\n      [formControl]=\"ctrl!\">\n</mat-form-field>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n"]
                }] }
    ];
    /** @nocollapse */
    AjfDateInputFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: AjfWarningAlertService },
        { type: AjfDateValueStringPipe }
    ]; };
    AjfDateInputFieldComponent.propDecorators = {
        input: [{ type: ViewChild, args: [MatInput, { static: false },] }]
    };
    return AjfDateInputFieldComponent;
}(AjfBaseFieldComponent));
export { AjfDateInputFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9mb3Jtcy9kYXRlLWlucHV0LWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQXVCLHNCQUFzQixFQUFFLHFCQUFxQixFQUN2RSxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUNwRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFakQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFL0Q7SUFNZ0QsOENBQTJDO0lBTXpGLG9DQUNFLEdBQXNCLEVBQUUsT0FBK0IsRUFBRSxHQUEyQixFQUMxRSxJQUE0QjtRQUZ4QyxZQUdFLGtCQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFNBQ3pCO1FBRlcsVUFBSSxHQUFKLElBQUksQ0FBd0I7O0lBRXhDLENBQUM7SUFFRCw2Q0FBUSxHQUFSO1FBQ0UsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNuQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDbkMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixJQUNFLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7bUJBQ2pELENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDdkQ7Z0JBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ3ZCO1NBQ0Y7SUFDSCxDQUFDO0lBRVMsc0RBQWlCLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7O2dCQWxDRixTQUFTLFNBQUM7b0JBQ1QsdVpBQW9DO29CQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFYZ0MsaUJBQWlCO2dCQUY5QyxzQkFBc0I7Z0JBTWxCLHNCQUFzQjtnQkFQQSxzQkFBc0I7Ozt3QkFnQmpELFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDOztJQThCdEMsaUNBQUM7Q0FBQSxBQXJDRCxDQU1nRCxxQkFBcUIsR0ErQnBFO1NBL0JZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkRhdGVGaWVsZEluc3RhbmNlLCBBamZEYXRlVmFsdWVTdHJpbmdQaXBlLCBBamZCYXNlRmllbGRDb21wb25lbnQsXG4gICAgQWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Qm9vbGVhbklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0SW5wdXR9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2RhdGUtaW5wdXQtZmllbGQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXRlLWlucHV0LWZpZWxkLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRGF0ZUlucHV0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmRGF0ZUZpZWxkSW5zdGFuY2U+IHtcbiAgQFZpZXdDaGlsZChNYXRJbnB1dCwge3N0YXRpYzogZmFsc2V9KSBpbnB1dDogTWF0SW5wdXQ7XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZVN0cjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9tYXhEYXRlU3RyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSwgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBfZHZzOiBBamZEYXRlVmFsdWVTdHJpbmdQaXBlKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5wdXQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCB2YWwgPSB0aGlzLmlucHV0LnZhbHVlIHx8ICcnO1xuICAgIGlmICh2YWwubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5fbWluRGF0ZVN0ciAhPSBudWxsICYmIHZhbCA8IHRoaXMuX21pbkRhdGVTdHIpXG4gICAgICAgIHx8ICh0aGlzLl9tYXhEYXRlU3RyICE9IG51bGwgJiYgdmFsID4gdGhpcy5fbWF4RGF0ZVN0cilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkluc3RhbmNlQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX21pbkRhdGVTdHIgPSB0aGlzLl9kdnMudHJhbnNmb3JtKHRoaXMuaW5zdGFuY2Uubm9kZS5taW5EYXRlKTtcbiAgICB0aGlzLl9tYXhEYXRlU3RyID0gdGhpcy5fZHZzLnRyYW5zZm9ybSh0aGlzLmluc3RhbmNlLm5vZGUubWF4RGF0ZSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVhZG9ubHk6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==