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
import { AjfCheckboxGroupModule as AjfCoreCheckboxGroupModule } from '@ajf/core/checkbox-group';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CheckboxGroupItem } from './checkbox-group-item';
import * as i0 from "@angular/core";
export class AjfCheckboxGroupModule {
}
AjfCheckboxGroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCheckboxGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfCheckboxGroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCheckboxGroupModule, declarations: [CheckboxGroupItem], imports: [AjfCoreCheckboxGroupModule, CommonModule, MatButtonModule, MatIconModule], exports: [AjfCoreCheckboxGroupModule, CheckboxGroupItem] });
AjfCheckboxGroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCheckboxGroupModule, imports: [[AjfCoreCheckboxGroupModule, CommonModule, MatButtonModule, MatIconModule], AjfCoreCheckboxGroupModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCheckboxGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AjfCoreCheckboxGroupModule, CommonModule, MatButtonModule, MatIconModule],
                    declarations: [CheckboxGroupItem],
                    exports: [AjfCoreCheckboxGroupModule, CheckboxGroupItem],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NoZWNrYm94LWdyb3VwL2NoZWNrYm94LWdyb3VwLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsc0JBQXNCLElBQUksMEJBQTBCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQU94RCxNQUFNLE9BQU8sc0JBQXNCOzsySEFBdEIsc0JBQXNCOzRIQUF0QixzQkFBc0IsaUJBSGxCLGlCQUFpQixhQUR0QiwwQkFBMEIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsYUFFeEUsMEJBQTBCLEVBQUUsaUJBQWlCOzRIQUU1QyxzQkFBc0IsWUFKeEIsQ0FBQywwQkFBMEIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQyxFQUV6RSwwQkFBMEI7bUdBRXpCLHNCQUFzQjtrQkFMbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztvQkFDbkYsWUFBWSxFQUFFLENBQUMsaUJBQWlCLENBQUM7b0JBQ2pDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixFQUFFLGlCQUFpQixDQUFDO2lCQUN6RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaGVja2JveEdyb3VwTW9kdWxlIGFzIEFqZkNvcmVDaGVja2JveEdyb3VwTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY2hlY2tib3gtZ3JvdXAnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHtNYXRJY29uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcblxuaW1wb3J0IHtDaGVja2JveEdyb3VwSXRlbX0gZnJvbSAnLi9jaGVja2JveC1ncm91cC1pdGVtJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FqZkNvcmVDaGVja2JveEdyb3VwTW9kdWxlLCBDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NoZWNrYm94R3JvdXBJdGVtXSxcbiAgZXhwb3J0czogW0FqZkNvcmVDaGVja2JveEdyb3VwTW9kdWxlLCBDaGVja2JveEdyb3VwSXRlbV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNoZWNrYm94R3JvdXBNb2R1bGUge31cbiJdfQ==