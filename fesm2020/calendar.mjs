import * as i1 from '@ajf/core/calendar';
import { AjfCalendar, AjfCalendarModule as AjfCalendarModule$1 } from '@ajf/core/calendar';
import * as i0 from '@angular/core';
import { forwardRef, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';

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
const CALENDAR_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfCalendarComponent),
    multi: true,
};
/**
 * Ajf calendar component.
 */
class AjfCalendarComponent extends AjfCalendar {
    constructor(cdr, service) {
        super(cdr, service);
    }
}
AjfCalendarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCalendarComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfCalendarService }], target: i0.ɵɵFactoryTarget.Component });
AjfCalendarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfCalendarComponent, selector: "ajf-calendar", outputs: { change: "change" }, providers: [CALENDAR_CONTROL_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: "<div class=\"ajf-calendar-header\">\n  <button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button>\n  <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">\n    {{ viewHeader | transloco }}\n  </button>\n  <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button>\n</div>\n<div class=\"ajf-calendar-row\" *ngIf=\"calendarHeaders.length > 0\">\n  <div *ngFor=\"let calendarHeader of calendarHeaders\">\n    {{ calendarHeader | transloco }}\n  </div>\n</div>\n<div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\">\n  <button\n      *ngFor=\"let entry of row\"\n      mat-raised-button\n      [class.ajf-calendar-partial-selection]=\"entry.selected == 'partial'\"\n      [disabled]=\"disabled || (entry.disabled || false)\"\n      [color]=\"entry.selected != 'none' ? 'warn' : undefined\"\n      (click)=\"selectEntry(entry)\"\n  >{{ entry|ajfCalendarEntryLabel }}</button>\n</div>\n", styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection ::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}\n"], components: [{ type: i2.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "transloco": i4.TranslocoPipe, "ajfCalendarEntryLabel": i1.AjfCalendarEntryLabelPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-calendar', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, outputs: ['change'], providers: [CALENDAR_CONTROL_VALUE_ACCESSOR], template: "<div class=\"ajf-calendar-header\">\n  <button (click)=\"prevPage()\" mat-mini-fab>&#8592;</button>\n  <button (click)=\"previousViewMode()\" mat-button class=\"ajf-calendar-header-title\">\n    {{ viewHeader | transloco }}\n  </button>\n  <button (click)=\"nextPage()\" mat-mini-fab>&#8594;</button>\n</div>\n<div class=\"ajf-calendar-row\" *ngIf=\"calendarHeaders.length > 0\">\n  <div *ngFor=\"let calendarHeader of calendarHeaders\">\n    {{ calendarHeader | transloco }}\n  </div>\n</div>\n<div class=\"ajf-calendar-row\" *ngFor=\"let row of calendarRows\">\n  <button\n      *ngFor=\"let entry of row\"\n      mat-raised-button\n      [class.ajf-calendar-partial-selection]=\"entry.selected == 'partial'\"\n      [disabled]=\"disabled || (entry.disabled || false)\"\n      [color]=\"entry.selected != 'none' ? 'warn' : undefined\"\n      (click)=\"selectEntry(entry)\"\n  >{{ entry|ajfCalendarEntryLabel }}</button>\n</div>\n", styles: ["ajf-calendar{display:flex;box-sizing:border-box;width:100%;height:320px;flex-direction:column}ajf-calendar .ajf-calendar-header,ajf-calendar .ajf-calendar-row{display:flex;box-sizing:border-box;width:100%;flex-direction:row}ajf-calendar .ajf-calendar-header{height:40px}ajf-calendar .ajf-calendar-header .ajf-calendar-header-title{flex:1;margin:0 10px}ajf-calendar .ajf-calendar-row{flex:1}ajf-calendar .ajf-calendar-row button,ajf-calendar .ajf-calendar-row div{flex:1;margin:3px}ajf-calendar .ajf-calendar-row div{line-height:40px;text-align:center}ajf-calendar .ajf-calendar-row .ajf-calendar-partial-selection ::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(255,255,255,.5)}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfCalendarService }]; } });

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
class AjfCalendarModule {
}
AjfCalendarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCalendarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfCalendarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCalendarModule, declarations: [AjfCalendarComponent], imports: [CommonModule, AjfCalendarModule$1, FormsModule, MatButtonModule, AjfTranslocoModule], exports: [AjfCalendarComponent] });
AjfCalendarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCalendarModule, imports: [[CommonModule, AjfCalendarModule$1, FormsModule, MatButtonModule, AjfTranslocoModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfCalendarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AjfCalendarModule$1, FormsModule, MatButtonModule, AjfTranslocoModule],
                    declarations: [AjfCalendarComponent],
                    exports: [AjfCalendarComponent],
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCalendarComponent, AjfCalendarModule, CALENDAR_CONTROL_VALUE_ACCESSOR };
//# sourceMappingURL=calendar.mjs.map
