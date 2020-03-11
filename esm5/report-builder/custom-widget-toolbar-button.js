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
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AjfReportBuilderService } from './report-builder-service';
import { ajfWidgetTypeStringToIcon, ajfWidgetTypeStringToLabel } from './utils';
var AjfReportBuilderCustomWidgetToolbarButton = /** @class */ (function () {
    // {...t, dropZones: ['header','content','footer','column','widget']}
    /**
     * this constructor will init icon registry
     */
    function AjfReportBuilderCustomWidgetToolbarButton(_service) {
        this._service = _service;
        this.customWidgets = [];
    }
    /**
     * this method call a service method for remove custom widget
     *
     * @memberOf AjfReportBuilderCustomWidgetToolbarButton
     */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.remove = function () {
        this._service.remove('customWidgets', this.position);
    };
    /**
     * this method will init  fieldIcon and fieldLabel
     */
    AjfReportBuilderCustomWidgetToolbarButton.prototype.ngOnInit = function () {
        this.widgetIcon = ajfWidgetTypeStringToIcon(this.widgetType);
        this.widgetLabel = ajfWidgetTypeStringToLabel(this.widgetType);
    };
    AjfReportBuilderCustomWidgetToolbarButton.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-report-builder-custom-widget-toolbar-button',
                    template: "<a mat-button>\n  {{ widgetType}}\n  <i class=\"material-icons\"(click)=\"remove()\">remove_circle_outline</i>\n</a>\n\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-report-builder-custom-widget-toolbar-button{margin-right:20px}ajf-report-builder-custom-widget-toolbar-button a{min-height:60px;margin-top:20px}ajf-report-builder-custom-widget-toolbar-button a i{display:none}ajf-report-builder-custom-widget-toolbar-button a:hover i{display:inline;position:absolute !important;margin-left:5px !important;z-index:5}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfReportBuilderCustomWidgetToolbarButton.ctorParameters = function () { return [
        { type: AjfReportBuilderService }
    ]; };
    AjfReportBuilderCustomWidgetToolbarButton.propDecorators = {
        widgetType: [{ type: Input }],
        position: [{ type: Input }]
    };
    return AjfReportBuilderCustomWidgetToolbarButton;
}());
export { AjfReportBuilderCustomWidgetToolbarButton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9yZXBvcnQtYnVpbGRlci9jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUU5RTtJQWtCRSxxRUFBcUU7SUFFckU7O09BRUc7SUFDSCxtREFDVSxRQUFpQztRQUFqQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQVIzQyxrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQVUxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBEQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRDs7T0FFRztJQUNILDREQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDOztnQkExQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpREFBaUQ7b0JBQzNELG9JQUFnRDtvQkFFaEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBVE8sdUJBQXVCOzs7NkJBZTVCLEtBQUs7MkJBQ0wsS0FBSzs7SUE4QlIsZ0RBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQWhDWSx5Q0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuaW1wb3J0IHthamZXaWRnZXRUeXBlU3RyaW5nVG9JY29uLCBhamZXaWRnZXRUeXBlU3RyaW5nVG9MYWJlbH0gZnJvbSAnLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1yZXBvcnQtYnVpbGRlci1jdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICdjdXN0b20td2lkZ2V0LXRvb2xiYXItYnV0dG9uLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnY3VzdG9tLXdpZGdldC10b29sYmFyLWJ1dHRvbi5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gYWpmIGJ1aWxkZXIgZmllbGQgdG9vbGJhciBidXR0b25cbiAqIEBpbXBsZW1lbnRzIDogT25Jbml0XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IHN0cmluZztcbiAgQElucHV0KCkgcG9zaXRpb246IG51bWJlcjtcbiAgd2lkZ2V0SWNvbjogc3RyaW5nO1xuICB3aWRnZXRMYWJlbDogc3RyaW5nO1xuICBjdXN0b21XaWRnZXRzOiBhbnlbXSA9IFtdO1xuXG4gIC8vIHsuLi50LCBkcm9wWm9uZXM6IFsnaGVhZGVyJywnY29udGVudCcsJ2Zvb3RlcicsJ2NvbHVtbicsJ3dpZGdldCddfVxuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBpY29uIHJlZ2lzdHJ5XG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZVxuICApIHtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBjYWxsIGEgc2VydmljZSBtZXRob2QgZm9yIHJlbW92ZSBjdXN0b20gd2lkZ2V0XG4gICAqXG4gICAqIEBtZW1iZXJPZiBBamZSZXBvcnRCdWlsZGVyQ3VzdG9tV2lkZ2V0VG9vbGJhckJ1dHRvblxuICAgKi9cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuX3NlcnZpY2UucmVtb3ZlKCdjdXN0b21XaWRnZXRzJywgdGhpcy5wb3NpdGlvbik7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgaW5pdCAgZmllbGRJY29uIGFuZCBmaWVsZExhYmVsXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLndpZGdldEljb24gPSBhamZXaWRnZXRUeXBlU3RyaW5nVG9JY29uKHRoaXMud2lkZ2V0VHlwZSk7XG4gICAgdGhpcy53aWRnZXRMYWJlbCA9IGFqZldpZGdldFR5cGVTdHJpbmdUb0xhYmVsKHRoaXMud2lkZ2V0VHlwZSk7XG4gIH1cbn1cbiJdfQ==