import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { AjfFbConditionEditor } from './condition-editor';
import { AjfFormBuilderService } from './form-builder-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "./condition-editor";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/common";
import * as i6 from "@ngneat/transloco";
export class AjfFbConditionEditorDialog {
    constructor(service, dialogRef) {
        this.dialogRef = dialogRef;
        this._fields = service.flatFields.pipe(map((fields) => fields.sort((f1, f2) => f1.name.localeCompare(f2.name))));
    }
    get fields() {
        return this._fields;
    }
    saveCondition() {
        if (this.editor == null) {
            return;
        }
        const newValue = this.editor.editedValue;
        this.dialogRef.close(newValue);
    }
}
AjfFbConditionEditorDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFbConditionEditorDialog, deps: [{ token: i1.AjfFormBuilderService }, { token: i2.MatDialogRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFbConditionEditorDialog.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfFbConditionEditorDialog, selector: "ajf-condition-editor-dialog", viewQueries: [{ propertyName: "editor", first: true, predicate: AjfFbConditionEditor, descendants: true }], ngImport: i0, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}\n"], components: [{ type: i3.AjfFbConditionEditor, selector: "ajf-condition-editor", inputs: ["fields", "condition"] }, { type: i4.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i2.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i2.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }, { type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }], pipes: { "transloco": i6.TranslocoPipe, "async": i5.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFbConditionEditorDialog, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-condition-editor-dialog', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<h3 matDialogTitle>{{'Edit condition'|transloco}}</h3>\n<mat-dialog-content>\n  <ajf-condition-editor\n    *ngIf=\"fields|async as curFields\"\n    [fields]=\"curFields!\"\n    [condition]=\"condition\"\n  ></ajf-condition-editor>\n</mat-dialog-content>\n<mat-dialog-actions>\n  <button mat-button (click)=\"saveCondition()\">{{'Save'|transloco}}</button>\n  <button mat-button matDialogClose>{{'Close'|transloco}}</button>\n</mat-dialog-actions>\n", styles: ["ajf-condition-editor-dialog mat-dialog-content{overflow:visible}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.AjfFormBuilderService }, { type: i2.MatDialogRef }]; }, propDecorators: { editor: [{
                type: ViewChild,
                args: [AjfFbConditionEditor, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9jb25kaXRpb24tZWRpdG9yLWRpYWxvZy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5DLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7OztBQVM3RCxNQUFNLE9BQU8sMEJBQTBCO0lBVXJDLFlBQ0UsT0FBOEIsRUFDdkIsU0FBbUQ7UUFBbkQsY0FBUyxHQUFULFNBQVMsQ0FBMEM7UUFFMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDcEMsR0FBRyxDQUFDLENBQUMsTUFBa0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ3JGLENBQUM7SUFDSixDQUFDO0lBYkQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFhRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN2QixPQUFPO1NBQ1I7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDOzsrSEF6QlUsMEJBQTBCO21IQUExQiwwQkFBMEIsMkdBQzFCLG9CQUFvQixnREN2Q2pDLGtjQVlBO21HRDBCYSwwQkFBMEI7a0JBUHRDLFNBQVM7K0JBQ0UsNkJBQTZCLGlCQUd4QixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO3VJQUdHLE1BQU07c0JBQXZELFNBQVM7dUJBQUMsb0JBQW9CLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nUmVmfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmJDb25kaXRpb25FZGl0b3J9IGZyb20gJy4vY29uZGl0aW9uLWVkaXRvcic7XG5pbXBvcnQge0FqZkZvcm1CdWlsZGVyU2VydmljZX0gZnJvbSAnLi9mb3JtLWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1jb25kaXRpb24tZWRpdG9yLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnY29uZGl0aW9uLWVkaXRvci1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb25kaXRpb24tZWRpdG9yLWRpYWxvZy5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nIHtcbiAgQFZpZXdDaGlsZChBamZGYkNvbmRpdGlvbkVkaXRvciwge3N0YXRpYzogZmFsc2V9KSBlZGl0b3I6IEFqZkZiQ29uZGl0aW9uRWRpdG9yO1xuXG4gIHByaXZhdGUgX2ZpZWxkczogT2JzZXJ2YWJsZTxBamZGaWVsZFtdPjtcbiAgZ2V0IGZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xuICB9XG5cbiAgY29uZGl0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz4sXG4gICkge1xuICAgIHRoaXMuX2ZpZWxkcyA9IHNlcnZpY2UuZmxhdEZpZWxkcy5waXBlKFxuICAgICAgbWFwKChmaWVsZHM6IEFqZkZpZWxkW10pID0+IGZpZWxkcy5zb3J0KChmMSwgZjIpID0+IGYxLm5hbWUubG9jYWxlQ29tcGFyZShmMi5uYW1lKSkpLFxuICAgICk7XG4gIH1cblxuICBzYXZlQ29uZGl0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVkaXRvciA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5lZGl0b3IuZWRpdGVkVmFsdWU7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UobmV3VmFsdWUpO1xuICB9XG59XG4iLCI8aDMgbWF0RGlhbG9nVGl0bGU+e3snRWRpdCBjb25kaXRpb24nfHRyYW5zbG9jb319PC9oMz5cbjxtYXQtZGlhbG9nLWNvbnRlbnQ+XG4gIDxhamYtY29uZGl0aW9uLWVkaXRvclxuICAgICpuZ0lmPVwiZmllbGRzfGFzeW5jIGFzIGN1ckZpZWxkc1wiXG4gICAgW2ZpZWxkc109XCJjdXJGaWVsZHMhXCJcbiAgICBbY29uZGl0aW9uXT1cImNvbmRpdGlvblwiXG4gID48L2FqZi1jb25kaXRpb24tZWRpdG9yPlxuPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG48bWF0LWRpYWxvZy1hY3Rpb25zPlxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cInNhdmVDb25kaXRpb24oKVwiPnt7J1NhdmUnfHRyYW5zbG9jb319PC9idXR0b24+XG4gIDxidXR0b24gbWF0LWJ1dHRvbiBtYXREaWFsb2dDbG9zZT57eydDbG9zZSd8dHJhbnNsb2NvfX08L2J1dHRvbj5cbjwvbWF0LWRpYWxvZy1hY3Rpb25zPlxuIl19