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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { default as Quill } from 'quill';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
let AjfQuillEditor = /** @class */ (() => {
    class AjfQuillEditor {
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
    }
    AjfQuillEditor.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-quill-editor',
                    template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `,
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AjfQuillEditor), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => AjfQuillEditor), multi: true }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"]
                },] }
    ];
    AjfQuillEditor.ctorParameters = () => [
        { type: ElementRef },
        { type: Renderer2 },
        { type: AjfReportBuilderService }
    ];
    AjfQuillEditor.propDecorators = {
        theme: [{ type: Input }],
        modules: [{ type: Input }],
        readOnly: [{ type: Input }],
        placeholder: [{ type: Input }],
        maxLength: [{ type: Input }],
        minLength: [{ type: Input }],
        formats: [{ type: Input }],
        initHTML: [{ type: Input }],
        editorCreated: [{ type: Output }],
        contentChanged: [{ type: Output }],
        selectionChanged: [{ type: Output }],
        formulaClick: [{ type: Output }]
    };
    return AjfQuillEditor;
})();
export { AjfQuillEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFFbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUMsT0FBTyxJQUFJLEtBQUssRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBR2pFO0lBQUEsTUFhYSxjQUFjO1FBdUZ6QixZQUNZLFdBQXVCLEVBQVUsU0FBb0IsRUFDckQsUUFBaUM7WUFEakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBQ3JELGFBQVEsR0FBUixRQUFRLENBQXlCO1lBckY3QyxlQUFVLEdBQVUsRUFBRSxDQUFDO1lBTWYsVUFBSyxHQUFZLEtBQUssQ0FBQztZQUUvQixnQkFBVyxHQUFHO2dCQUNaO29CQUNFLE9BQU8sRUFBRSw2QkFBNkI7b0JBQ3RDLE9BQU8sRUFBRSx5QkFBeUI7b0JBQ2xDLFdBQVcsRUFBRSxrQkFBa0I7aUJBQ2hDO2dCQUNELEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUM7Z0JBQ3pELEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUM7YUFDdkUsQ0FBQztZQUdGLFVBQUssR0FBRztnQkFDTixLQUFLLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsdUJBQXVCO2dCQUNsRixhQUFhLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVE7Z0JBQzNGLGVBQWUsRUFBRSxPQUFPLEVBQUUsYUFBYTthQUN4QyxDQUFDO1lBRUYsbUJBQWMsR0FBRztnQkFDZixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQ0g7b0JBQ0UsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQztvQkFDdEQsZ0NBQWdDO29CQUVoQyxDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLENBQUMsRUFBQyxDQUFDO29CQUM5QixDQUFDLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDO29CQUN6QyxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO29CQUN4QyxzRUFBc0U7b0JBQ3RFLHNFQUFzRTtvQkFFdEUsQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFDLENBQUM7b0JBQzdDLENBQUMsRUFBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBQyxDQUFDO29CQUV2Qzt3QkFDRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBQztxQkFDNUU7b0JBQ0QsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQztvQkFFNUQsQ0FBQyxPQUFPLENBQUM7aUJBR1Y7YUFDTixDQUFDO1lBRUYsU0FBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFZMUIsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUN0RCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ3ZELHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1lBR25FOzs7O2VBSUc7WUFDTyxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1lBR3BFLGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1lBQ25DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1lBRTVCLGNBQVMsR0FBOEMsRUFBRSxDQUFDO1lBQzFELG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFLekQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ3BGLG1FQUFtRTtnQkFDbkUsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtvQkFDakMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN2RSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN0RSxJQUFJLFlBQVksQ0FBQztvQkFDakIsSUFBSSxRQUFRLENBQUM7b0JBQ2IsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDbEIsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7d0JBQ2pDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTs0QkFDcEIsUUFBUSxFQUFFLENBQUM7eUJBQ1o7cUJBQ0Y7eUJBQU07d0JBQ0wsWUFBWSxHQUFHLEVBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO3dCQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDbkM7b0JBQ0QsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7d0JBQzNFLElBQUksR0FBRyxHQUFHLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUMsQ0FBQzt3QkFDbkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNuRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM1Qyw2REFBNkQ7b0JBQzdELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDMUQsSUFBSSxHQUFHLEdBQUcsRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDO3dCQUNwRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDaEQ7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxLQUFLLENBQUMsS0FBYTtZQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2hELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxFQUFFO29CQUN0QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUN0QzthQUNGO1lBQ0QsT0FBZSxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNEOzs7OztXQUtHO1FBQ0gsT0FBTztZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxlQUFlO1lBQ2IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDL0YsSUFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRXZELEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVoQyxJQUFJLFdBQVcsRUFBRTtnQkFDZixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUNqQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQzdDLFdBQVcsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFekYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUM1QyxPQUFPLEVBQUUsT0FBTztnQkFDaEIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksc0JBQXNCO2dCQUN2RCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLO2dCQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNO2dCQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQyxDQUFDO1lBR0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVmLDZDQUE2QztZQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLEtBQVUsRUFBRSxRQUFhLEVBQUUsTUFBYyxFQUFFLEVBQUU7Z0JBQ3BGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQ3RCLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUVsRixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILCtCQUErQjtZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFVLEVBQUUsUUFBYSxFQUFFLE1BQWMsRUFBRSxFQUFFO2dCQUMvRSxJQUFJLElBQUksR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ3RELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXhDLElBQUksSUFBSSxLQUFLLGFBQWEsRUFBRTtvQkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDYjtnQkFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV6QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXO29CQUN4QixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsSUFBSTtvQkFDVixLQUFLLEVBQUUsS0FBSztvQkFDWixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsTUFBTSxFQUFFLE1BQU07aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxVQUFVLENBQUMsWUFBaUI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7WUFFNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLFlBQVksRUFBRTtvQkFDaEIsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ2hELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUM1RSxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ2pDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUMvRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7NEJBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQ0FDMUQsSUFBSSxHQUFHLEdBQUcsRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDO2dDQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDOUIsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7NEJBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNwQixDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTSxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDMUM7b0JBQ0QsT0FBTztpQkFDUjtnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1lBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxFQUFZO1lBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxRQUFRLENBQUMsRUFBZTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksR0FBRyxHQUdILEVBQUUsRUFDUixLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRVgsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFFNUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixHQUFHLENBQUMsY0FBYyxHQUFHLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDO2dCQUVwRSxLQUFLLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDckQ7WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxjQUFjLEdBQUcsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDLENBQUM7Z0JBRXBFLEtBQUssR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUM7YUFDL0M7WUFFRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDNUIsQ0FBQztRQUVELFdBQVcsQ0FBQyxPQUFzQjtZQUNoQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM1RDtZQUNELElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUM1QyxPQUFPLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztvQkFDM0MsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksc0JBQXNCO29CQUN2RCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLO29CQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNO29CQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87aUJBQ3RCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDckQ7UUFDSCxDQUFDO1FBQ0QsV0FBVztZQUNULEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtvQkFDcEIsUUFBUSxFQUFFLENBQUM7aUJBQ1o7YUFDRjtZQUNELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O2dCQTVURixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsUUFBUSxFQUFFOztHQUVUO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7d0JBQ3hGLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7cUJBQ3JGO29CQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7Z0JBcENDLFVBQVU7Z0JBT1YsU0FBUztnQkFjSCx1QkFBdUI7Ozt3QkEyRTVCLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FFTCxNQUFNO2lDQUNOLE1BQU07bUNBQ04sTUFBTTsrQkFRTixNQUFNOztJQWtPVCxxQkFBQztLQUFBO1NBaFRZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIFF1aWxsfSBmcm9tICdxdWlsbCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXF1aWxsLWVkaXRvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl1cIj48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmUXVpbGxFZGl0b3IpLCBtdWx0aTogdHJ1ZX0sXG4gICAge3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZlF1aWxsRWRpdG9yKSwgbXVsdGk6IHRydWV9XG4gIF0sXG4gIHN0eWxlVXJsczogWydxdWlsbC1lZGl0b3IuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlF1aWxsRWRpdG9yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25EZXN0cm95LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9yIHtcbiAgcXVpbGxFZGl0b3I6IGFueTtcbiAgZWRpdG9yRWxlbTogSFRNTEVsZW1lbnQ7XG4gIGVtcHR5QXJyYXk6IGFueVtdID0gW107XG4gIGNvbnRlbnQ6IGFueTtcblxuICBsaXN0ZW5GdW5jOiBGdW5jdGlvbjtcblxuICBwcmV2aWV3RWxlbUZvcm11bGE6IGFueTtcbiAgcHJpdmF0ZSBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGRhdGVGb3JtYXRzID0gW1xuICAgIHtcbiAgICAgICdsYWJlbCc6ICdKdW5lIDIzcmQgMjAxNywgMTI6Mzk6MTIgcG0nLFxuICAgICAgJ3ZhbHVlJzogJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyxcbiAgICAgICd2YWxpZGF0b3InOiAnTU1NTURvWVlZWWhtbXNzYSdcbiAgICB9LFxuICAgIHsnbGFiZWwnOiAnRnJpZGF5JywgJ3ZhbHVlJzogJ2RkZGQnLCAndmFsaWRhdG9yJzogJ2RkZGQnfSxcbiAgICB7J2xhYmVsJzogJ0p1biAyM3JkIDE3JywgJ3ZhbHVlJzogJ01NTSBEbyBZWScsICd2YWxpZGF0b3InOiAnTU1NRG9ZWSd9XG4gIF07XG5cblxuICBmb250cyA9IFtcbiAgICBmYWxzZSwgJ2JsYWNrcicsICdibGFjay1pdGFsaWMnLCAnYm9sZCcsICdib2xkLWNvbmRlbnNlZCcsICdib2xkLWNvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdib2xkLWl0YWxpYycsICdjb25kZW5zZWQnLCAnY29uZGVuc2VkLWl0YWxpYycsICdpdGFsaWMnLCAnbGlnaHQnLCAnbGlnaHQtaXRhbGljJywgJ21lZGl1bScsXG4gICAgJ21lZGl1bS1pdGFsaWMnLCAndGhpbnInLCAndGhpbi1pdGFsaWMnXG4gIF07XG5cbiAgZGVmYXVsdE1vZHVsZXMgPSB7XG4gICAgZm9ybXVsYTogdHJ1ZSxcbiAgICB0b29sYmFyOlxuICAgICAgICBbXG4gICAgICAgICAgWydmb3JtdWxhJ10sIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAgICAgLy8gWydibG9ja3F1b3RlJywgJ2NvZGUtYmxvY2snXSxcblxuICAgICAgICAgIFt7J2hlYWRlcic6IDF9LCB7J2hlYWRlcic6IDJ9XSwgIC8vIGN1c3RvbSBidXR0b24gdmFsdWVzXG4gICAgICAgICAgW3snbGlzdCc6ICdvcmRlcmVkJ30sIHsnbGlzdCc6ICdidWxsZXQnfV0sXG4gICAgICAgICAgW3snc2NyaXB0JzogJ3N1Yid9LCB7J3NjcmlwdCc6ICdzdXBlcid9XSwgIC8vIHN1cGVyc2NyaXB0L3N1YnNjcmlwdFxuICAgICAgICAgIC8vIFt7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSwgICAgICAgICAgLy8gb3V0ZGVudC9pbmRlbnRcbiAgICAgICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgICAgICBbeydzaXplJzogWydzbWFsbCcsIGZhbHNlLCAnbGFyZ2UnLCAnaHVnZSddfV0sICAvLyBjdXN0b20gZHJvcGRvd25cbiAgICAgICAgICBbeydoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdfV0sXG5cbiAgICAgICAgICBbXG4gICAgICAgICAgICB7J2NvbG9yJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCl9LCB7J2JhY2tncm91bmQnOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKX1cbiAgICAgICAgICBdLCAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICAgICAgW3snZm9udCc6IHRoaXMuZm9udHN9XSwgW3snYWxpZ24nOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKX1dLFxuXG4gICAgICAgICAgWydjbGVhbiddLCAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgICAgICAvLyBbJ2xpbmsnLCAnaW1hZ2UnLCAndmlkZW8nXSAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIGFuZCBpbWFnZSwgdmlkZW9cbiAgICAgICAgXVxuICB9O1xuXG4gIGZvbnQgPSBRdWlsbC5pbXBvcnQoJ2Zvcm1hdHMvZm9udCcpO1xuXG5cbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgbW9kdWxlczogT2JqZWN0O1xuICBASW5wdXQoKSByZWFkT25seTogYm9vbGVhbjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pbkxlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBmb3JtYXRzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgaW5pdEhUTUw6IHN0cmluZztcblxuICBAT3V0cHV0KCkgZWRpdG9yQ3JlYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgY2xpY2sgb24gZm9ybXVsYSBidXR0b24gb24gcXVpbGwgZWRpdG9yIHJvb2wgYmFyxpJcbiAgICpcbiAgICogQG1lbWJlcm9mIFF1aWxsRWRpdG9yQ29tcG9uZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZm9ybXVsYUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBfZm9ybXVsYXM6IHtmb3JtdWxhOiBhbnksIHVubGlzdGVuOiBGdW5jdGlvbnxudWxsfVtdID0gW107XG4gIHByaXZhdGUgX2Zvcm11bGFUZXh0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLmZvbnQud2hpdGVsaXN0ID0gdGhpcy5mb250cztcbiAgICB0aGlzLmZvbnQud2hpdGVsaXN0LnB1c2goJ3JlZ3VsYXInKTtcblxuICAgIHRoaXMuX2Zvcm11bGFUZXh0U3ViID0gdGhpcy5fc2VydmljZS5nZXRGb3JtdWxhVG9IdG1sRXZlbnQoKS5zdWJzY3JpYmUoKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIC8vIHJlZmVyZW5jZSBpcyBkZWZpbmVkIG9ubHkgd2hlbiB0aGUgdXNlciB3YW50IHRvIGVkaXQgdGhlIGZvcm11bGFcbiAgICAgIGlmIChldmVudC5yZWZlcmVuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBldmVudC5yZWZlcmVuY2UuaW5uZXJIVE1MID0gZXZlbnQuZm9ybXVsYTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGV2ZW50LnJlZmVyZW5jZSwgJ2Zvcm11bGEnLCBldmVudC5mb3JtdWxhKTtcbiAgICAgICAgY29uc3QgZWZzID0gdGhpcy5fZm9ybXVsYXMuZmlsdGVyKGYgPT4gZi5mb3JtdWxhID09PSBldmVudC5yZWZlcmVuY2UpO1xuICAgICAgICBsZXQgZm9ybXVsYUVudHJ5O1xuICAgICAgICBsZXQgdW5saXN0ZW47XG4gICAgICAgIGlmIChlZnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvcm11bGFFbnRyeSA9IGVmc1swXTtcbiAgICAgICAgICB1bmxpc3RlbiA9IGZvcm11bGFFbnRyeS51bmxpc3RlbjtcbiAgICAgICAgICBpZiAodW5saXN0ZW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9ybXVsYUVudHJ5ID0ge2Zvcm11bGE6IGV2ZW50LnJlZmVyZW5jZSwgdW5saXN0ZW46IG51bGx9O1xuICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goZm9ybXVsYUVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtdWxhRW50cnkudW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZXZlbnQucmVmZXJlbmNlLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IG9iaiA9IHsnZm9ybXVsYSc6IGV2ZW50LmZvcm11bGEsICdyZWZlcmVuY2UnOiBldmVudC5yZWZlcmVuY2V9O1xuICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBxdWlsbEVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWVkaXRvcicpO1xuICAgICAgICBjb25zdCBsaW5rID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGluaywgJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGxpbmssICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGluaywgJ2Zvcm11bGEnLCB0aGlzLmNoZWNrKGV2ZW50LmZvcm11bGEpKTtcbiAgICAgICAgY29uc3QgbGlua0xhYmVsID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlVGV4dChldmVudC5mb3JtdWxhKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQobGluaywgbGlua0xhYmVsKTtcbiAgICAgICAgLy8gYWRkIGxpc3RlbmVyIHJlbGF0ZWQgb24gdGhlIGNsaWNrIGV2ZW50IG9mIHRoZSBuZXcgZm9ybXVsYVxuICAgICAgICBjb25zdCB1bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihsaW5rLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgICAgIGxldCBvYmogPSB7J2Zvcm11bGEnOiB0aGlzLmNoZWNrKGV2ZW50LmZvcm11bGEpLCAncmVmZXJlbmNlJzogbGlua307XG4gICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQocXVpbGxFZGl0b3IsIGxpbmspO1xuICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKHt1bmxpc3RlbiwgZm9ybXVsYTogbGlua30pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2sodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGVGb3JtYXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5kYXRlRm9ybWF0c1tpXS52YWx1ZSA9PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0c1tpXS52YWxpZGF0b3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiA8c3RyaW5nPnZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIGZ1bmN0aW9uIHNlYXJjaCBmb211bGFzIGluc2lkZSB0aGUgaW5pdCB0ZXh0XG4gICAqIGFuZCBhbGxvY2F0ZSB0aGUgcmVsYXRlZCBsaXN0ZW5lciBvbiBjbGljayBldmVudFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIHNldEhUTUwoKSB7XG4gICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuaW5pdEhUTUwpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IHRvb2xiYXJFbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thamYtcXVpbGwtZWRpdG9yLXRvb2xiYXJdJyk7XG4gICAgbGV0IG1vZHVsZXM6IGFueSA9IHRoaXMubW9kdWxlcyB8fCB0aGlzLmRlZmF1bHRNb2R1bGVzO1xuXG4gICAgUXVpbGwucmVnaXN0ZXIodGhpcy5mb250LCB0cnVlKTtcblxuICAgIGlmICh0b29sYmFyRWxlbSkge1xuICAgICAgbW9kdWxlc1sndG9vbGJhciddID0gdG9vbGJhckVsZW07XG4gICAgICBtb2R1bGVzWydmb3JtdWxhJ10gPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgICAnYmVmb3JlZW5kJywgJzxkaXYgcXVpbGwtZWRpdG9yLWVsZW1lbnQ+PC9kaXY+Jyk7XG5cbiAgICB0aGlzLmVkaXRvckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW3F1aWxsLWVkaXRvci1lbGVtZW50XScpO1xuXG4gICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbCh0aGlzLmVkaXRvckVsZW0sIHtcbiAgICAgIG1vZHVsZXM6IG1vZHVsZXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnSW5zZXJ0IHRleHQgaGVyZSAuLi4nLFxuICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHNcbiAgICB9KTtcblxuXG4gICAgdGhpcy5lZGl0b3JDcmVhdGVkLmVtaXQodGhpcy5xdWlsbEVkaXRvcik7XG4gICAgdGhpcy5zZXRIVE1MKCk7XG5cbiAgICAvLyBtYXJrIG1vZGVsIGFzIHRvdWNoZWQgaWYgZWRpdG9yIGxvc3QgZm9jdXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCdzZWxlY3Rpb24tY2hhbmdlJywgKHJhbmdlOiBhbnksIG9sZFJhbmdlOiBhbnksIHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQuZW1pdChcbiAgICAgICAgICB7ZWRpdG9yOiB0aGlzLnF1aWxsRWRpdG9yLCByYW5nZTogcmFuZ2UsIG9sZFJhbmdlOiBvbGRSYW5nZSwgc291cmNlOiBzb3VyY2V9KTtcblxuICAgICAgaWYgKCFyYW5nZSkge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbW9kZWwgaWYgdGV4dCBjaGFuZ2VzXG4gICAgdGhpcy5xdWlsbEVkaXRvci5vbigndGV4dC1jaGFuZ2UnLCAoZGVsdGE6IGFueSwgb2xkRGVsdGE6IGFueSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCBodG1sOiBhbnkgPSB0aGlzLmVkaXRvckVsZW0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MO1xuICAgICAgY29uc3QgdGV4dCA9IHRoaXMucXVpbGxFZGl0b3IuZ2V0VGV4dCgpO1xuXG4gICAgICBpZiAoaHRtbCA9PT0gJzxwPjxicj48L3A+Jykge1xuICAgICAgICBodG1sID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGh0bWwpO1xuXG4gICAgICB0aGlzLmNvbnRlbnRDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsXG4gICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgb2xkRGVsdGE6IG9sZERlbHRhLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWZvcm11bGEnKTtcbiAgICB0aGlzLmxpc3RlbkZ1bmMgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWxlbSwgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUoY3VycmVudFZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjdXJyZW50VmFsdWU7XG5cbiAgICBpZiAodGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09IHRoaXMuaW5pdEhUTUwgJiYgIXRoaXMuX2luaXQpIHtcbiAgICAgICAgICBsZXQgZWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZWRpdG9yJyk7XG4gICAgICAgICAgZWRpdG9yLmlubmVySFRNTCA9IHRoaXMuaW5pdEhUTUw7XG4gICAgICAgICAgbGV0IGFsbEZvcm11bGFzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tmb3JtdWxhXScpO1xuICAgICAgICAgIGFsbEZvcm11bGFzLmZvckVhY2goKGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWxlbSwgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgICAgICAgICAgbGV0IG9iaiA9IHsnZm9ybXVsYSc6IHRoaXMuY2hlY2soZWxlbS5pbm5lclRleHQpLCAncmVmZXJlbmNlJzogZWxlbX07XG4gICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxlbSwgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKHt1bmxpc3RlbiwgZm9ybXVsYTogZWxlbX0pO1xuICAgICAgICAgICAgdGhpcy5faW5pdCA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlICE9IHRoaXMuaW5pdEhUTUwpIHtcbiAgICAgICAgICB0aGlzLnF1aWxsRWRpdG9yLnBhc3RlSFRNTChjdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucXVpbGxFZGl0b3Iuc2V0VGV4dCgnJyk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKF9jOiBGb3JtQ29udHJvbCkge1xuICAgIGlmICghdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGVycjoge1xuICAgICAgbWluTGVuZ3RoRXJyb3I/OiB7Z2l2ZW46IG51bWJlciwgbWluTGVuZ3RoOiBudW1iZXJ9O1xuICAgICAgbWF4TGVuZ3RoRXJyb3I/OiB7Z2l2ZW46IG51bWJlciwgbWF4TGVuZ3RoOiBudW1iZXJ9O1xuICAgIH0gPSB7fSxcbiAgdmFsaWQgPSB0cnVlO1xuXG4gICAgY29uc3QgdGV4dExlbmd0aCA9IHRoaXMucXVpbGxFZGl0b3IuZ2V0VGV4dCgpLnRyaW0oKS5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIGVyci5taW5MZW5ndGhFcnJvciA9IHtnaXZlbjogdGV4dExlbmd0aCwgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aH07XG5cbiAgICAgIHZhbGlkID0gdGV4dExlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCB8fCAhdGV4dExlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgIGVyci5tYXhMZW5ndGhFcnJvciA9IHtnaXZlbjogdGV4dExlbmd0aCwgbWF4TGVuZ3RoOiB0aGlzLm1heExlbmd0aH07XG5cbiAgICAgIHZhbGlkID0gdGV4dExlbmd0aCA8PSB0aGlzLm1heExlbmd0aCAmJiB2YWxpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWQgPyBudWxsIDogZXJyO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydyZWFkT25seSddICYmIHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IuZW5hYmxlKCFjaGFuZ2VzWydyZWFkT25seSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtb2R1bGVzJ10gJiYgdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgUXVpbGwucmVnaXN0ZXIodGhpcy5mb250LCB0cnVlKTtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IgPSBuZXcgUXVpbGwodGhpcy5lZGl0b3JFbGVtLCB7XG4gICAgICAgIG1vZHVsZXM6IGNoYW5nZXNbJ21vZHVsZXMnXVsnY3VycmVudFZhbHVlJ10sXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5IHx8IGZhbHNlLFxuICAgICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0c1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZm9ybXVsYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB1bmxpc3RlbiA9IHRoaXMuX2Zvcm11bGFzW2ldLnVubGlzdGVuO1xuICAgICAgaWYgKHVubGlzdGVuICE9IG51bGwpIHtcbiAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19