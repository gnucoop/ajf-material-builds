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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { default as Quill } from 'quill';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
let AjfQuillEditor = /** @class */ (() => {
    var AjfQuillEditor_1;
    let AjfQuillEditor = AjfQuillEditor_1 = class AjfQuillEditor {
        constructor(_elementRef, _renderer, _service) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._service = _service;
            this.emptyArray = [];
            this._init = false;
            this.dateFormats = [
                {
                    'label': 'June 23rd 2017, 12:39:12 pm',
                    'value': 'MMMM Do YYYY, h:mm:ss a',
                    'validator': 'MMMMDoYYYYhmmssa'
                },
                { 'label': 'Friday', 'value': 'dddd', 'validator': 'dddd' },
                { 'label': 'Jun 23rd 17', 'value': 'MMM Do YY', 'validator': 'MMMDoYY' }
            ];
            this.fonts = [
                false, 'blackr', 'black-italic', 'bold', 'bold-condensed', 'bold-condensed-italic',
                'bold-italic', 'condensed', 'condensed-italic', 'italic', 'light', 'light-italic', 'medium',
                'medium-italic', 'thinr', 'thin-italic'
            ];
            this.defaultModules = {
                formula: true,
                toolbar: [
                    ['formula'], ['bold', 'italic', 'underline', 'strike'],
                    // ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    // [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [
                        { 'color': this.emptyArray.slice() }, { 'background': this.emptyArray.slice() }
                    ],
                    [{ 'font': this.fonts }], [{ 'align': this.emptyArray.slice() }],
                    ['clean'],
                ]
            };
            this.font = Quill.import('formats/font');
            this.editorCreated = new EventEmitter();
            this.contentChanged = new EventEmitter();
            this.selectionChanged = new EventEmitter();
            /**
             * this event is fired when the user click on formula button on quill editor rool barƒ
             *
             * @memberof QuillEditorComponent
             */
            this.formulaClick = new EventEmitter();
            this.onModelChange = () => { };
            this.onModelTouched = () => { };
            this._formulas = [];
            this._formulaTextSub = Subscription.EMPTY;
            this.font.whitelist = this.fonts;
            this.font.whitelist.push('regular');
            this._formulaTextSub = this._service.getFormulaToHtmlEvent().subscribe((event) => {
                // reference is defined only when the user want to edit the formula
                if (event.reference !== undefined) {
                    event.reference.innerHTML = event.formula;
                    this._renderer.setAttribute(event.reference, 'formula', event.formula);
                    const efs = this._formulas.filter(f => f.formula === event.reference);
                    let formulaEntry;
                    let unlisten;
                    if (efs.length > 0) {
                        formulaEntry = efs[0];
                        unlisten = formulaEntry.unlisten;
                        if (unlisten != null) {
                            unlisten();
                        }
                    }
                    else {
                        formulaEntry = { formula: event.reference, unlisten: null };
                        this._formulas.push(formulaEntry);
                    }
                    formulaEntry.unlisten = this._renderer.listen(event.reference, 'click', () => {
                        let obj = { 'formula': event.formula, 'reference': event.reference };
                        this.formulaClick.emit(obj);
                    });
                }
                else {
                    const quillEditor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    const link = this._renderer.createElement('a');
                    this._renderer.setAttribute(link, 'href', 'javascript:void(0)');
                    this._renderer.setStyle(link, 'cursor', 'pointer');
                    this._renderer.setAttribute(link, 'formula', this.check(event.formula));
                    const linkLabel = this._renderer.createText(event.formula);
                    this._renderer.appendChild(link, linkLabel);
                    // add listener related on the click event of the new formula
                    const unlisten = this._renderer.listen(link, 'click', (_) => {
                        let obj = { 'formula': this.check(event.formula), 'reference': link };
                        this.formulaClick.emit(obj);
                    });
                    this._renderer.appendChild(quillEditor, link);
                    this._formulas.push({ unlisten, formula: link });
                }
            });
        }
        check(value) {
            for (let i = 0; i < this.dateFormats.length; i++) {
                if (this.dateFormats[i].value == value) {
                    return this.dateFormats[i].validator;
                }
            }
            return value;
        }
        /**
         * this function search fomulas inside the init text
         * and allocate the related listener on click event
         *
         * @memberof QuillEditorComponent
         */
        setHTML() {
            this.writeValue(this.initHTML);
        }
        ngAfterViewInit() {
            const toolbarElem = this._elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
            let modules = this.modules || this.defaultModules;
            Quill.register(this.font, true);
            if (toolbarElem) {
                modules['toolbar'] = toolbarElem;
                modules['formula'] = true;
            }
            this._elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
            this.editorElem = this._elementRef.nativeElement.querySelector('[quill-editor-element]');
            this.quillEditor = new Quill(this.editorElem, {
                modules: modules,
                placeholder: this.placeholder || 'Insert text here ...',
                readOnly: this.readOnly || false,
                theme: this.theme || 'snow',
                formats: this.formats
            });
            this.editorCreated.emit(this.quillEditor);
            this.setHTML();
            // mark model as touched if editor lost focus
            this.quillEditor.on('selection-change', (range, oldRange, source) => {
                this.selectionChanged.emit({ editor: this.quillEditor, range: range, oldRange: oldRange, source: source });
                if (!range) {
                    this.onModelTouched();
                }
            });
            // update model if text changes
            this.quillEditor.on('text-change', (delta, oldDelta, source) => {
                let html = this.editorElem.children[0].innerHTML;
                const text = this.quillEditor.getText();
                if (html === '<p><br></p>') {
                    html = null;
                }
                this.onModelChange(html);
                this.contentChanged.emit({
                    editor: this.quillEditor,
                    html: html,
                    text: text,
                    delta: delta,
                    oldDelta: oldDelta,
                    source: source
                });
            });
            let elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
            this.listenFunc = this._renderer.listen(elem, 'click', (_) => {
                this.formulaClick.emit();
            });
        }
        writeValue(currentValue) {
            this.content = currentValue;
            if (this.quillEditor) {
                if (currentValue) {
                    if (currentValue == this.initHTML && !this._init) {
                        let editor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                        editor.innerHTML = this.initHTML;
                        let allFormulas = this._elementRef.nativeElement.querySelectorAll('[formula]');
                        allFormulas.forEach((elem) => {
                            const unlisten = this._renderer.listen(elem, 'click', (_) => {
                                let obj = { 'formula': this.check(elem.innerText), 'reference': elem };
                                this.formulaClick.emit(obj);
                            });
                            this._renderer.setStyle(elem, 'cursor', 'pointer');
                            this._formulas.push({ unlisten, formula: elem });
                            this._init = true;
                        });
                    }
                    else if (currentValue != this.initHTML) {
                        this.quillEditor.pasteHTML(currentValue);
                    }
                    return;
                }
                this.quillEditor.setText('');
            }
        }
        registerOnChange(fn) {
            this.onModelChange = fn;
        }
        registerOnTouched(fn) {
            this.onModelTouched = fn;
        }
        validate(_c) {
            if (!this.quillEditor) {
                return null;
            }
            let err = {}, valid = true;
            const textLength = this.quillEditor.getText().trim().length;
            if (this.minLength) {
                err.minLengthError = { given: textLength, minLength: this.minLength };
                valid = textLength >= this.minLength || !textLength;
            }
            if (this.maxLength) {
                err.maxLengthError = { given: textLength, maxLength: this.maxLength };
                valid = textLength <= this.maxLength && valid;
            }
            return valid ? null : err;
        }
        ngOnChanges(changes) {
            if (changes['readOnly'] && this.quillEditor) {
                this.quillEditor.enable(!changes['readOnly'].currentValue);
            }
            if (changes['modules'] && this.quillEditor) {
                Quill.register(this.font, true);
                this.quillEditor = new Quill(this.editorElem, {
                    modules: changes['modules']['currentValue'],
                    placeholder: this.placeholder || 'Insert text here ...',
                    readOnly: this.readOnly || false,
                    theme: this.theme || 'snow',
                    formats: this.formats
                });
                this._elementRef.nativeElement.children[0].remove();
            }
        }
        ngOnDestroy() {
            for (let i = 0; i < this._formulas.length; i++) {
                let unlisten = this._formulas[i].unlisten;
                if (unlisten != null) {
                    unlisten();
                }
            }
            this._formulaTextSub.unsubscribe();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfQuillEditor.prototype, "theme", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfQuillEditor.prototype, "modules", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AjfQuillEditor.prototype, "readOnly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfQuillEditor.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AjfQuillEditor.prototype, "maxLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], AjfQuillEditor.prototype, "minLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AjfQuillEditor.prototype, "formats", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfQuillEditor.prototype, "initHTML", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfQuillEditor.prototype, "editorCreated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfQuillEditor.prototype, "contentChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfQuillEditor.prototype, "selectionChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfQuillEditor.prototype, "formulaClick", void 0);
    AjfQuillEditor = AjfQuillEditor_1 = __decorate([
        Component({
            selector: 'ajf-quill-editor',
            template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `,
            providers: [
                { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AjfQuillEditor_1), multi: true },
                { provide: NG_VALIDATORS, useExisting: forwardRef(() => AjfQuillEditor_1), multi: true }
            ],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2,
            AjfReportBuilderService])
    ], AjfQuillEditor);
    return AjfQuillEditor;
})();
export { AjfQuillEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsaUJBQWlCLEVBRWxCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFDLE9BQU8sSUFBSSxLQUFLLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQWdCakU7O0lBQUEsSUFBYSxjQUFjLHNCQUEzQixNQUFhLGNBQWM7UUF1RnpCLFlBQ1ksV0FBdUIsRUFBVSxTQUFvQixFQUNyRCxRQUFpQztZQURqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFDckQsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7WUFyRjdDLGVBQVUsR0FBVSxFQUFFLENBQUM7WUFNZixVQUFLLEdBQVksS0FBSyxDQUFDO1lBRS9CLGdCQUFXLEdBQUc7Z0JBQ1o7b0JBQ0UsT0FBTyxFQUFFLDZCQUE2QjtvQkFDdEMsT0FBTyxFQUFFLHlCQUF5QjtvQkFDbEMsV0FBVyxFQUFFLGtCQUFrQjtpQkFDaEM7Z0JBQ0QsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQztnQkFDekQsRUFBQyxP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SyxFQUFFOztxREFBbUI7SUFDbEI7UUFBUixLQUFLLEVBQUU7O21EQUFtQjtJQUNsQjtRQUFSLEtBQUssRUFBRTs7b0RBQWtCO0lBRWhCO1FBQVQsTUFBTSxFQUFFO2tDQUFnQixZQUFZO3lEQUEyQjtJQUN0RDtRQUFULE1BQU0sRUFBRTtrQ0FBaUIsWUFBWTswREFBMkI7SUFDdkQ7UUFBVCxNQUFNLEVBQUU7a0NBQW1CLFlBQVk7NERBQTJCO0lBUXpEO1FBQVQsTUFBTSxFQUFFO2tDQUFlLFlBQVk7d0RBQWdDO0lBOUV6RCxjQUFjO1FBYjFCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFOztHQUVUO1lBQ0QsU0FBUyxFQUFFO2dCQUNULEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7Z0JBQ3hGLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2FBQ3JGO1lBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7eUNBeUZ5QixVQUFVLEVBQXFCLFNBQVM7WUFDM0MsdUJBQXVCO09BekZsQyxjQUFjLENBZ1QxQjtJQUFELHFCQUFDO0tBQUE7U0FoVFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2RlZmF1bHQgYXMgUXVpbGx9IGZyb20gJ3F1aWxsJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcXVpbGwtZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmLXF1aWxsLWVkaXRvci10b29sYmFyXVwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksIG11bHRpOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmUXVpbGxFZGl0b3IpLCBtdWx0aTogdHJ1ZX1cbiAgXSxcbiAgc3R5bGVVcmxzOiBbJ3F1aWxsLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUXVpbGxFZGl0b3IgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3Ige1xuICBxdWlsbEVkaXRvcjogYW55O1xuICBlZGl0b3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgZW1wdHlBcnJheTogYW55W10gPSBbXTtcbiAgY29udGVudDogYW55O1xuXG4gIGxpc3RlbkZ1bmM6IEZ1bmN0aW9uO1xuXG4gIHByZXZpZXdFbGVtRm9ybXVsYTogYW55O1xuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgZGF0ZUZvcm1hdHMgPSBbXG4gICAge1xuICAgICAgJ2xhYmVsJzogJ0p1bmUgMjNyZCAyMDE3LCAxMjozOToxMiBwbScsXG4gICAgICAndmFsdWUnOiAnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdNTU1NRG9ZWVlZaG1tc3NhJ1xuICAgIH0sXG4gICAgeydsYWJlbCc6ICdGcmlkYXknLCAndmFsdWUnOiAnZGRkZCcsICd2YWxpZGF0b3InOiAnZGRkZCd9LFxuICAgIHsnbGFiZWwnOiAnSnVuIDIzcmQgMTcnLCAndmFsdWUnOiAnTU1NIERvIFlZJywgJ3ZhbGlkYXRvcic6ICdNTU1Eb1lZJ31cbiAgXTtcblxuXG4gIGZvbnRzID0gW1xuICAgIGZhbHNlLCAnYmxhY2tyJywgJ2JsYWNrLWl0YWxpYycsICdib2xkJywgJ2JvbGQtY29uZGVuc2VkJywgJ2JvbGQtY29uZGVuc2VkLWl0YWxpYycsXG4gICAgJ2JvbGQtaXRhbGljJywgJ2NvbmRlbnNlZCcsICdjb25kZW5zZWQtaXRhbGljJywgJ2l0YWxpYycsICdsaWdodCcsICdsaWdodC1pdGFsaWMnLCAnbWVkaXVtJyxcbiAgICAnbWVkaXVtLWl0YWxpYycsICd0aGlucicsICd0aGluLWl0YWxpYydcbiAgXTtcblxuICBkZWZhdWx0TW9kdWxlcyA9IHtcbiAgICBmb3JtdWxhOiB0cnVlLFxuICAgIHRvb2xiYXI6XG4gICAgICAgIFtcbiAgICAgICAgICBbJ2Zvcm11bGEnXSwgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sICAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuXG4gICAgICAgICAgW3snaGVhZGVyJzogMX0sIHsnaGVhZGVyJzogMn1dLCAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgICAgICBbeydsaXN0JzogJ29yZGVyZWQnfSwgeydsaXN0JzogJ2J1bGxldCd9XSxcbiAgICAgICAgICBbeydzY3JpcHQnOiAnc3ViJ30sIHsnc2NyaXB0JzogJ3N1cGVyJ31dLCAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgICAgIC8vIFt7ICdkaXJlY3Rpb24nOiAncnRsJyB9XSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dCBkaXJlY3Rpb25cblxuICAgICAgICAgIFt7J3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ119XSwgIC8vIGN1c3RvbSBkcm9wZG93blxuICAgICAgICAgIFt7J2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV19XSxcblxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHsnY29sb3InOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKX0sIHsnYmFja2dyb3VuZCc6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpfVxuICAgICAgICAgIF0sICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgICAgICBbeydmb250JzogdGhpcy5mb250c31dLCBbeydhbGlnbic6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpfV0sXG5cbiAgICAgICAgICBbJ2NsZWFuJ10sICAvLyByZW1vdmUgZm9ybWF0dGluZyBidXR0b25cblxuICAgICAgICAgIC8vIFsnbGluaycsICdpbWFnZScsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgICAgICBdXG4gIH07XG5cbiAgZm9udCA9IFF1aWxsLmltcG9ydCgnZm9ybWF0cy9mb250Jyk7XG5cblxuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSBtb2R1bGVzOiBPYmplY3Q7XG4gIEBJbnB1dCgpIHJlYWRPbmx5OiBib29sZWFuO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBtYXhMZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgbWluTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZvcm1hdHM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBpbml0SFRNTDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBlZGl0b3JDcmVhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGljayBvbiBmb3JtdWxhIGJ1dHRvbiBvbiBxdWlsbCBlZGl0b3Igcm9vbCBiYXLGklxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBmb3JtdWxhQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF9mb3JtdWxhczoge2Zvcm11bGE6IGFueSwgdW5saXN0ZW46IEZ1bmN0aW9ufG51bGx9W10gPSBbXTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVRleHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QgPSB0aGlzLmZvbnRzO1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QucHVzaCgncmVndWxhcicpO1xuXG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIgPSB0aGlzLl9zZXJ2aWNlLmdldEZvcm11bGFUb0h0bWxFdmVudCgpLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgLy8gcmVmZXJlbmNlIGlzIGRlZmluZWQgb25seSB3aGVuIHRoZSB1c2VyIHdhbnQgdG8gZWRpdCB0aGUgZm9ybXVsYVxuICAgICAgaWYgKGV2ZW50LnJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGV2ZW50LnJlZmVyZW5jZS5pbm5lckhUTUwgPSBldmVudC5mb3JtdWxhO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXZlbnQucmVmZXJlbmNlLCAnZm9ybXVsYScsIGV2ZW50LmZvcm11bGEpO1xuICAgICAgICBjb25zdCBlZnMgPSB0aGlzLl9mb3JtdWxhcy5maWx0ZXIoZiA9PiBmLmZvcm11bGEgPT09IGV2ZW50LnJlZmVyZW5jZSk7XG4gICAgICAgIGxldCBmb3JtdWxhRW50cnk7XG4gICAgICAgIGxldCB1bmxpc3RlbjtcbiAgICAgICAgaWYgKGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9ybXVsYUVudHJ5ID0gZWZzWzBdO1xuICAgICAgICAgIHVubGlzdGVuID0gZm9ybXVsYUVudHJ5LnVubGlzdGVuO1xuICAgICAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JtdWxhRW50cnkgPSB7Zm9ybXVsYTogZXZlbnQucmVmZXJlbmNlLCB1bmxpc3RlbjogbnVsbH07XG4gICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaChmb3JtdWxhRW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm11bGFFbnRyeS51bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihldmVudC5yZWZlcmVuY2UsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBsZXQgb2JqID0geydmb3JtdWxhJzogZXZlbnQuZm9ybXVsYSwgJ3JlZmVyZW5jZSc6IGV2ZW50LnJlZmVyZW5jZX07XG4gICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHF1aWxsRWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZWRpdG9yJyk7XG4gICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCknKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUobGluaywgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnZm9ybXVsYScsIHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSkpO1xuICAgICAgICBjb25zdCBsaW5rTGFiZWwgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGV2ZW50LmZvcm11bGEpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChsaW5rLCBsaW5rTGFiZWwpO1xuICAgICAgICAvLyBhZGQgbGlzdGVuZXIgcmVsYXRlZCBvbiB0aGUgY2xpY2sgZXZlbnQgb2YgdGhlIG5ldyBmb3JtdWxhXG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGxpbmssICdjbGljaycsIChfKSA9PiB7XG4gICAgICAgICAgbGV0IG9iaiA9IHsnZm9ybXVsYSc6IHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSksICdyZWZlcmVuY2UnOiBsaW5rfTtcbiAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChxdWlsbEVkaXRvciwgbGluayk7XG4gICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goe3VubGlzdGVuLCBmb3JtdWxhOiBsaW5rfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVjayh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0ZUZvcm1hdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbGlkYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxzdHJpbmc+dmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgZnVuY3Rpb24gc2VhcmNoIGZvbXVsYXMgaW5zaWRlIHRoZSBpbml0IHRleHRcbiAgICogYW5kIGFsbG9jYXRlIHRoZSByZWxhdGVkIGxpc3RlbmVyIG9uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgc2V0SFRNTCgpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5pbml0SFRNTCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgdG9vbGJhckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl0nKTtcbiAgICBsZXQgbW9kdWxlczogYW55ID0gdGhpcy5tb2R1bGVzIHx8IHRoaXMuZGVmYXVsdE1vZHVsZXM7XG5cbiAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuXG4gICAgaWYgKHRvb2xiYXJFbGVtKSB7XG4gICAgICBtb2R1bGVzWyd0b29sYmFyJ10gPSB0b29sYmFyRWxlbTtcbiAgICAgIG1vZHVsZXNbJ2Zvcm11bGEnXSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLCAnPGRpdiBxdWlsbC1lZGl0b3ItZWxlbWVudD48L2Rpdj4nKTtcblxuICAgIHRoaXMuZWRpdG9yRWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcXVpbGwtZWRpdG9yLWVsZW1lbnRdJyk7XG5cbiAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKHRoaXMuZWRpdG9yRWxlbSwge1xuICAgICAgbW9kdWxlczogbW9kdWxlcyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSB8fCBmYWxzZSxcbiAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0c1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLmVkaXRvckNyZWF0ZWQuZW1pdCh0aGlzLnF1aWxsRWRpdG9yKTtcbiAgICB0aGlzLnNldEhUTUwoKTtcblxuICAgIC8vIG1hcmsgbW9kZWwgYXMgdG91Y2hlZCBpZiBlZGl0b3IgbG9zdCBmb2N1c1xuICAgIHRoaXMucXVpbGxFZGl0b3Iub24oJ3NlbGVjdGlvbi1jaGFuZ2UnLCAocmFuZ2U6IGFueSwgb2xkUmFuZ2U6IGFueSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KFxuICAgICAgICAgIHtlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsIHJhbmdlOiByYW5nZSwgb2xkUmFuZ2U6IG9sZFJhbmdlLCBzb3VyY2U6IHNvdXJjZX0pO1xuXG4gICAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBtb2RlbCBpZiB0ZXh0IGNoYW5nZXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCd0ZXh0LWNoYW5nZScsIChkZWx0YTogYW55LCBvbGREZWx0YTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGh0bWw6IGFueSA9IHRoaXMuZWRpdG9yRWxlbS5jaGlsZHJlblswXS5pbm5lckhUTUw7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCk7XG5cbiAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nKSB7XG4gICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoaHRtbCk7XG5cbiAgICAgIHRoaXMuY29udGVudENoYW5nZWQuZW1pdCh7XG4gICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbEVkaXRvcixcbiAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICBvbGREZWx0YTogb2xkRGVsdGEsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZm9ybXVsYScpO1xuICAgIHRoaXMubGlzdGVuRnVuYyA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShjdXJyZW50VmFsdWU6IGFueSkge1xuICAgIHRoaXMuY29udGVudCA9IGN1cnJlbnRWYWx1ZTtcblxuICAgIGlmICh0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT0gdGhpcy5pbml0SFRNTCAmJiAhdGhpcy5faW5pdCkge1xuICAgICAgICAgIGxldCBlZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgICBlZGl0b3IuaW5uZXJIVE1MID0gdGhpcy5pbml0SFRNTDtcbiAgICAgICAgICBsZXQgYWxsRm9ybXVsYXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2Zvcm11bGFdJyk7XG4gICAgICAgICAgYWxsRm9ybXVsYXMuZm9yRWFjaCgoZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgICAgICAgICBsZXQgb2JqID0geydmb3JtdWxhJzogdGhpcy5jaGVjayhlbGVtLmlubmVyVGV4dCksICdyZWZlcmVuY2UnOiBlbGVtfTtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goe3VubGlzdGVuLCBmb3JtdWxhOiBlbGVtfSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgIT0gdGhpcy5pbml0SFRNTCkge1xuICAgICAgICAgIHRoaXMucXVpbGxFZGl0b3IucGFzdGVIVE1MKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5xdWlsbEVkaXRvci5zZXRUZXh0KCcnKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoX2M6IEZvcm1Db250cm9sKSB7XG4gICAgaWYgKCF0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZXJyOiB7XG4gICAgICBtaW5MZW5ndGhFcnJvcj86IHtnaXZlbjogbnVtYmVyLCBtaW5MZW5ndGg6IG51bWJlcn07XG4gICAgICBtYXhMZW5ndGhFcnJvcj86IHtnaXZlbjogbnVtYmVyLCBtYXhMZW5ndGg6IG51bWJlcn07XG4gICAgfSA9IHt9LFxuICB2YWxpZCA9IHRydWU7XG5cbiAgICBjb25zdCB0ZXh0TGVuZ3RoID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCkudHJpbSgpLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgZXJyLm1pbkxlbmd0aEVycm9yID0ge2dpdmVuOiB0ZXh0TGVuZ3RoLCBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RofTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8ICF0ZXh0TGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1heExlbmd0aCkge1xuICAgICAgZXJyLm1heExlbmd0aEVycm9yID0ge2dpdmVuOiB0ZXh0TGVuZ3RoLCBtYXhMZW5ndGg6IHRoaXMubWF4TGVuZ3RofTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoIDw9IHRoaXMubWF4TGVuZ3RoICYmIHZhbGlkO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZCA/IG51bGwgOiBlcnI7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3JlYWRPbmx5J10gJiYgdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgdGhpcy5xdWlsbEVkaXRvci5lbmFibGUoIWNoYW5nZXNbJ3JlYWRPbmx5J10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21vZHVsZXMnXSAmJiB0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuICAgICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbCh0aGlzLmVkaXRvckVsZW0sIHtcbiAgICAgICAgbW9kdWxlczogY2hhbmdlc1snbW9kdWxlcyddWydjdXJyZW50VmFsdWUnXSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJ0luc2VydCB0ZXh0IGhlcmUgLi4uJyxcbiAgICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9mb3JtdWxhcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHVubGlzdGVuID0gdGhpcy5fZm9ybXVsYXNbaV0udW5saXN0ZW47XG4gICAgICBpZiAodW5saXN0ZW4gIT0gbnVsbCkge1xuICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9mb3JtdWxhVGV4dFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=