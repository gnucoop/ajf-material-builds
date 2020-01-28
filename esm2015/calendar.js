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
import { AjfCalendar, AjfCalendarService, AjfCalendarModule as AjfCalendarModule$1 } from '@ajf/core/calendar';
import { CommonModule } from '@angular/common';
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => AjfCalendarComponent)),
    multi: true
};
/**
 * Ajf calendar component.
 */
class AjfCalendarComponent extends AjfCalendar {
    /**
     * @param {?} cdr
     * @param {?} service
     */
    constructor(cdr, service) {
        super(cdr, service);
    }
}
AjfCalendarComponent.decorators = [
    { type: Component, args: [{selector: 'ajf-calendar',
                template: "<div class=\"ajf-calendar-header\"><button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button> <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">{{ viewHeader | translate }}</button> <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button></div><div class=\"ajf-calendar-row\" *ngIf=\"calendarHeaders.length > 0\"><div *ngFor=\"let calendarHeader of calendarHeaders\">{{ calendarHeader | translate }}</div></div><div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\"><button *ngFor=\"let entry of row\" mat-raised-button [class.ajf-calendar-partial-selection]=\"entry.selected == 'partial'\" [disabled]=\"disabled || entry.disabled\" [color]=\"entry.selected != 'none' ? 'warn' : null\" (click)=\"selectEntry(entry)\">{{ entry|ajfCalendarEntryLabel }}</button></div>",
                styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection ::before{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: [
                    'viewDate',
                    'disabled',
                    'dateOnlyForDay',
                    'viewMode',
                    'selectionMode',
                    'startOfWeekDay',
                    'isoMode',
                    'minDate',
                    'maxDate',
                    'selectedPeriod',
                ],
                outputs: [
                    'change'
                ],
                providers: [
                    CALENDAR_CONTROL_VALUE_ACCESSOR,
                ]
            },] },
];
/** @nocollapse */
AjfCalendarComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfCalendarService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfCalendarModule {
}
AjfCalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    AjfCalendarModule$1,
                    FormsModule,
                    MatButtonModule,
                    TranslateModule,
                ],
                declarations: [
                    AjfCalendarComponent,
                ],
                exports: [
                    AjfCalendarComponent,
                ],
            },] },
];

export { AjfCalendarModule, CALENDAR_CONTROL_VALUE_ACCESSOR as ɵa, AjfCalendarComponent as ɵb };
//# sourceMappingURL=calendar.js.map
