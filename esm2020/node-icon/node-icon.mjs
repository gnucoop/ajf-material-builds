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
import { AjfFieldType, AjfNodeType } from '@ajf/core/forms';
import { AjfNodeIcon as CoreNodeIcon } from '@ajf/core/node-icon';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
export class AjfNodeIcon extends CoreNodeIcon {
    matIcon(node) {
        if (node.nodeType === AjfNodeType.AjfSlide || node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            return 'topic';
        }
        if (node.nodeType !== AjfNodeType.AjfField) {
            return 'broken_image';
        }
        switch (node.fieldType) {
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'abc';
            case AjfFieldType.Number:
            case AjfFieldType.Range:
                return 'pin';
            case AjfFieldType.Boolean:
                return 'toggle_off';
            case AjfFieldType.SingleChoice:
                return 'format_list_bulleted';
            case AjfFieldType.MultipleChoice:
                return 'format_list_numbered';
            case AjfFieldType.Formula:
                return 'code';
            case AjfFieldType.Empty:
                return 'html';
            case AjfFieldType.Date:
            case AjfFieldType.DateInput:
                return 'calendar_month';
            case AjfFieldType.Time:
                return 'access_time';
            case AjfFieldType.Table:
                return 'grid_on';
            case AjfFieldType.Geolocation:
                return 'location_on';
            case AjfFieldType.Barcode:
                return 'qr_code_2';
            case AjfFieldType.File:
                return 'attach_file';
            case AjfFieldType.Image:
                return 'image';
            case AjfFieldType.VideoUrl:
                return 'videocam';
            default:
                return 'broken_image';
        }
    }
}
AjfNodeIcon.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIcon, deps: null, target: i0.ɵɵFactoryTarget.Component });
AjfNodeIcon.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: AjfNodeIcon, selector: "ajf-node-icon", usesInheritance: true, ngImport: i0, template: "<ng-template [ngIf]=\"node\">\n  <mat-icon>{{matIcon(node)}}</mat-icon>\n</ng-template>\n", styles: [""], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfNodeIcon, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-node-icon', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"node\">\n  <mat-icon>{{matIcon(node)}}</mat-icon>\n</ng-template>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pY29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvbm9kZS1pY29uL3NyYy9ub2RlLWljb24udHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9ub2RlLWljb24vc3JjL25vZGUtaWNvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQVcsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0UsT0FBTyxFQUFDLFdBQVcsSUFBSSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBU3BGLE1BQU0sT0FBTyxXQUFZLFNBQVEsWUFBWTtJQUMzQyxPQUFPLENBQUMsSUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTtZQUM3RixPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzFDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO1FBQ0QsUUFBUyxJQUFpQixDQUFDLFNBQXlCLEVBQUU7WUFDcEQsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEtBQUssWUFBWSxDQUFDLElBQUk7Z0JBQ3BCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsS0FBSyxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsS0FBSyxZQUFZLENBQUMsT0FBTztnQkFDdkIsT0FBTyxZQUFZLENBQUM7WUFDdEIsS0FBSyxZQUFZLENBQUMsWUFBWTtnQkFDNUIsT0FBTyxzQkFBc0IsQ0FBQztZQUNoQyxLQUFLLFlBQVksQ0FBQyxjQUFjO2dCQUM5QixPQUFPLHNCQUFzQixDQUFDO1lBQ2hDLEtBQUssWUFBWSxDQUFDLE9BQU87Z0JBQ3ZCLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLEtBQUssWUFBWSxDQUFDLElBQUksQ0FBQztZQUN2QixLQUFLLFlBQVksQ0FBQyxTQUFTO2dCQUN6QixPQUFPLGdCQUFnQixDQUFDO1lBQzFCLEtBQUssWUFBWSxDQUFDLElBQUk7Z0JBQ3BCLE9BQU8sYUFBYSxDQUFDO1lBQ3ZCLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sU0FBUyxDQUFDO1lBQ25CLEtBQUssWUFBWSxDQUFDLFdBQVc7Z0JBQzNCLE9BQU8sYUFBYSxDQUFDO1lBQ3ZCLEtBQUssWUFBWSxDQUFDLE9BQU87Z0JBQ3ZCLE9BQU8sV0FBVyxDQUFDO1lBQ3JCLEtBQUssWUFBWSxDQUFDLElBQUk7Z0JBQ3BCLE9BQU8sYUFBYSxDQUFDO1lBQ3ZCLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLE9BQU8sT0FBTyxDQUFDO1lBQ2pCLEtBQUssWUFBWSxDQUFDLFFBQVE7Z0JBQ3hCLE9BQU8sVUFBVSxDQUFDO1lBQ3BCO2dCQUNFLE9BQU8sY0FBYyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7d0dBN0NVLFdBQVc7NEZBQVgsV0FBVyw0RUNqQ3hCLDJGQUdBOzJGRDhCYSxXQUFXO2tCQVB2QixTQUFTOytCQUNFLGVBQWUsaUJBR1YsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZOb2RlLCBBamZOb2RlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmTm9kZUljb24gYXMgQ29yZU5vZGVJY29ufSBmcm9tICdAYWpmL2NvcmUvbm9kZS1pY29uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtbm9kZS1pY29uJyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLWljb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydub2RlLWljb24uc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQWpmTm9kZUljb24gZXh0ZW5kcyBDb3JlTm9kZUljb24ge1xuICBtYXRJY29uKG5vZGU6IEFqZk5vZGUpOiBzdHJpbmcge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fCBub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgcmV0dXJuICd0b3BpYyc7XG4gICAgfVxuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSBBamZOb2RlVHlwZS5BamZGaWVsZCkge1xuICAgICAgcmV0dXJuICdicm9rZW5faW1hZ2UnO1xuICAgIH1cbiAgICBzd2l0Y2ggKChub2RlIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgYXMgQWpmRmllbGRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TdHJpbmc6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UZXh0OlxuICAgICAgICByZXR1cm4gJ2FiYyc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5SYW5nZTpcbiAgICAgICAgcmV0dXJuICdwaW4nO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgcmV0dXJuICd0b2dnbGVfb2ZmJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgcmV0dXJuICdmb3JtYXRfbGlzdF9idWxsZXRlZCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgICAgcmV0dXJuICdmb3JtYXRfbGlzdF9udW1iZXJlZCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Gb3JtdWxhOlxuICAgICAgICByZXR1cm4gJ2NvZGUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRW1wdHk6XG4gICAgICAgIHJldHVybiAnaHRtbCc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5EYXRlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRGF0ZUlucHV0OlxuICAgICAgICByZXR1cm4gJ2NhbGVuZGFyX21vbnRoJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRpbWU6XG4gICAgICAgIHJldHVybiAnYWNjZXNzX3RpbWUnO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICAgIHJldHVybiAnZ3JpZF9vbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5HZW9sb2NhdGlvbjpcbiAgICAgICAgcmV0dXJuICdsb2NhdGlvbl9vbic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5CYXJjb2RlOlxuICAgICAgICByZXR1cm4gJ3FyX2NvZGVfMic7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5GaWxlOlxuICAgICAgICByZXR1cm4gJ2F0dGFjaF9maWxlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkltYWdlOlxuICAgICAgICByZXR1cm4gJ2ltYWdlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlZpZGVvVXJsOlxuICAgICAgICByZXR1cm4gJ3ZpZGVvY2FtJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnYnJva2VuX2ltYWdlJztcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZSBbbmdJZl09XCJub2RlXCI+XG4gIDxtYXQtaWNvbj57e21hdEljb24obm9kZSl9fTwvbWF0LWljb24+XG48L25nLXRlbXBsYXRlPlxuIl19