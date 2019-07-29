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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms'), require('@angular/material/button'), require('@ngx-translate/core'), require('@ajf/core/calendar')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/calendar', ['exports', '@angular/common', '@angular/core', '@angular/forms', '@angular/material/button', '@ngx-translate/core', '@ajf/core/calendar'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.calendar = {}), global.ng.common, global.ng.core, global.ng.forms, global.ng.material.button, global.ngxt.core, global.ajf.core.calendar));
}(this, function (exports, common, core, forms, button, core$1, calendar) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CALENDAR_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return AjfCalendarComponent; })),
        multi: true
    };
    /**
     * Ajf calendar component.
     */
    var AjfCalendarComponent = /** @class */ (function (_super) {
        __extends(AjfCalendarComponent, _super);
        function AjfCalendarComponent(cdr) {
            return _super.call(this, cdr) || this;
        }
        AjfCalendarComponent.decorators = [
            { type: core.Component, args: [{selector: 'ajf-calendar',
                        template: "<div class=\"ajf-calendar-header\"><button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button> <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">{{ viewHeader | translate }}</button> <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button></div><div class=\"ajf-calendar-row\" *ngIf=\"viewMode == 'month'\"><div *ngFor=\"let weekDay of weekDays\">{{ weekDay | translate }}</div></div><div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\"><button mat-raised-button [class.ajf-calendar-partial-selection]=\"entry.selected == 'partial'\" [color]=\"entry.selected != 'none' ? 'warn' : null\" (click)=\"selectEntry(entry)\" *ngFor=\"let entry of row\">{{ entry }}</button></div>",
                        styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection ::before{content:'';position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}"],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
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
        AjfCalendarComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        return AjfCalendarComponent;
    }(calendar.AjfCalendar));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfCalendarModule = /** @class */ (function () {
        function AjfCalendarModule() {
        }
        AjfCalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            core$1.TranslateModule,
                            button.MatButtonModule,
                        ],
                        declarations: [
                            AjfCalendarComponent,
                        ],
                        exports: [
                            AjfCalendarComponent,
                        ],
                    },] },
        ];
        return AjfCalendarModule;
    }());

    exports.AjfCalendarModule = AjfCalendarModule;
    exports.ɵa = CALENDAR_CONTROL_VALUE_ACCESSOR;
    exports.ɵb = AjfCalendarComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=material-calendar.umd.js.map
