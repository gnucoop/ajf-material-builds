(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('@ajf/core/calendar'), require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('@angular/material/button'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@ajf/material/calendar', ['exports', 'tslib', '@ajf/core/calendar', '@angular/core', '@angular/forms', '@angular/common', '@angular/material/button', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.material = global.ajf.material || {}, global.ajf.material.calendar = {}), global.tslib, global.ng.core.calendar, global.ng.core, global.ng.forms, global.ng.common, global.ng.material.button, global.ngxTranslate.core));
}(this, (function (exports, tslib, calendar, core, forms, common, button, core$1) { 'use strict';

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
    var CALENDAR_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return AjfCalendarComponent; }),
        multi: true
    };
    /**
     * Ajf calendar component.
     */
    var AjfCalendarComponent = /** @class */ (function (_super) {
        tslib.__extends(AjfCalendarComponent, _super);
        function AjfCalendarComponent(cdr, service) {
            return _super.call(this, cdr, service) || this;
        }
        AjfCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-calendar',
                        template: "<div class=\"ajf-calendar-header\">\n  <button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button>\n  <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">\n    {{ viewHeader | translate }}\n  </button>\n  <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button>\n</div>\n<div class=\"ajf-calendar-row\" *ngIf=\"calendarHeaders.length > 0\">\n  <div *ngFor=\"let calendarHeader of calendarHeaders\">\n    {{ calendarHeader | translate }}\n  </div>\n</div>\n<div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\">\n  <button\n      *ngFor=\"let entry of row\"\n      mat-raised-button\n      [class.ajf-calendar-partial-selection]=\"entry.selected == 'partial'\"\n      [disabled]=\"disabled || (entry.disabled || false)\"\n      [color]=\"entry.selected != 'none' ? 'warn' : undefined\"\n      (click)=\"selectEntry(entry)\"\n  >{{ entry|ajfCalendarEntryLabel }}</button>\n</div>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        outputs: [
                            'change'
                        ],
                        providers: [
                            CALENDAR_CONTROL_VALUE_ACCESSOR,
                        ],
                        styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection ::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}\n"]
                    }] }
        ];
        /** @nocollapse */
        AjfCalendarComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: calendar.AjfCalendarService }
        ]; };
        return AjfCalendarComponent;
    }(calendar.AjfCalendar));

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
    var AjfCalendarModule = /** @class */ (function () {
        function AjfCalendarModule() {
        }
        AjfCalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            calendar.AjfCalendarModule,
                            forms.FormsModule,
                            button.MatButtonModule,
                            core$1.TranslateModule,
                        ],
                        declarations: [
                            AjfCalendarComponent,
                        ],
                        exports: [
                            AjfCalendarComponent,
                        ],
                    },] }
        ];
        return AjfCalendarModule;
    }());

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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AjfCalendarComponent = AjfCalendarComponent;
    exports.AjfCalendarModule = AjfCalendarModule;
    exports.CALENDAR_CONTROL_VALUE_ACCESSOR = CALENDAR_CONTROL_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-calendar.umd.js.map
