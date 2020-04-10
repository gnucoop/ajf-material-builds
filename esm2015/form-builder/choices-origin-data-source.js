/**
 * @fileoverview added by tsickle
 * Generated from: src/material/form-builder/choices-origin-data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
export class ChoicesOriginDataSource extends DataSource {
    constructor() {
        super();
        this._choices = new BehaviorSubject([]);
        this._choicesObs = this._choices.asObservable();
    }
    /**
     * @return {?}
     */
    connect() {
        return this._choicesObs;
    }
    /**
     * @return {?}
     */
    disconnect() { }
    /**
     * @param {?} choices
     * @return {?}
     */
    updateChoices(choices) {
        this._choices.next(choices);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ChoicesOriginDataSource.prototype._choices;
    /**
     * @type {?}
     * @private
     */
    ChoicesOriginDataSource.prototype._choicesObs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2Nob2ljZXMtb3JpZ2luLWRhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUVwRCxPQUFPLEVBQUMsZUFBZSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBUWpELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxVQUFvQztJQUsvRTtRQUNFLEtBQUssRUFBRSxDQUFDO1FBTEYsYUFBUSxHQUNaLElBQUksZUFBZSxDQUE2QixFQUFFLENBQUMsQ0FBQztRQUt0RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELFVBQVUsS0FBSSxDQUFDOzs7OztJQUVmLGFBQWEsQ0FBQyxPQUFtQztRQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7Ozs7OztJQWxCQywyQ0FDd0Q7Ozs7O0lBQ3hELDhDQUE0RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtEYXRhU291cmNlfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cblxuZXhwb3J0IHR5cGUgQ2hvaWNlc09yaWdpbkNob2ljZUVudHJ5ID0ge1xuICBsYWJlbDogc3RyaW5nLFxuICB2YWx1ZTogc3RyaW5nXG59O1xuXG5leHBvcnQgY2xhc3MgQ2hvaWNlc09yaWdpbkRhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlPENob2ljZXNPcmlnaW5DaG9pY2VFbnRyeT4ge1xuICBwcml2YXRlIF9jaG9pY2VzOiBCZWhhdmlvclN1YmplY3Q8Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10+ID1cbiAgICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8Q2hvaWNlc09yaWdpbkNob2ljZUVudHJ5W10+KFtdKTtcbiAgcHJpdmF0ZSBfY2hvaWNlc09iczogT2JzZXJ2YWJsZTxDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnlbXT47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jaG9pY2VzT2JzID0gdGhpcy5fY2hvaWNlcy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbm5lY3QoKTogT2JzZXJ2YWJsZTxDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzT2JzO1xuICB9XG5cbiAgZGlzY29ubmVjdCgpIHt9XG5cbiAgdXBkYXRlQ2hvaWNlcyhjaG9pY2VzOiBDaG9pY2VzT3JpZ2luQ2hvaWNlRW50cnlbXSkge1xuICAgIHRoaXMuX2Nob2ljZXMubmV4dChjaG9pY2VzKTtcbiAgfVxufVxuIl19