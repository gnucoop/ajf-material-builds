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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewEncapsulation, } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { default as Quill } from 'quill';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import * as i0 from "@angular/core";
import * as i1 from "./report-builder-service";
export class AjfQuillEditor {
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
                'validator': 'MMMMDoYYYYhmmssa',
            },
            { 'label': 'Friday', 'value': 'dddd', 'validator': 'dddd' },
            { 'label': 'Jun 23rd 17', 'value': 'MMM Do YY', 'validator': 'MMMDoYY' },
        ];
        this.fonts = [
            false,
            'blackr',
            'black-italic',
            'bold',
            'bold-condensed',
            'bold-condensed-italic',
            'bold-italic',
            'condensed',
            'condensed-italic',
            'italic',
            'light',
            'light-italic',
            'medium',
            'medium-italic',
            'thinr',
            'thin-italic',
        ];
        this.defaultModules = {
            formula: true,
            toolbar: [
                ['formula'],
                ['bold', 'italic', 'underline', 'strike'],
                // ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                // [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': this.emptyArray.slice() }, { 'background': this.emptyArray.slice() }],
                [{ 'font': this.fonts }],
                [{ 'align': this.emptyArray.slice() }],
                ['clean'], // remove formatting button
                // ['link', 'image', 'video']                         // link and image, video
            ],
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
                const unlisten = this._renderer.listen(link, 'click', _ => {
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
            formats: this.formats,
        });
        this.editorCreated.emit(this.quillEditor);
        this.setHTML();
        // mark model as touched if editor lost focus
        this.quillEditor.on('selection-change', (range, oldRange, source) => {
            this.selectionChanged.emit({
                editor: this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source,
            });
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
                source: source,
            });
        });
        let elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
        this.listenFunc = this._renderer.listen(elem, 'click', _ => {
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
                        const unlisten = this._renderer.listen(elem, 'click', _ => {
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
                formats: this.formats,
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
AjfQuillEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfQuillEditor, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.AjfReportBuilderService }], target: i0.ɵɵFactoryTarget.Component });
AjfQuillEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfQuillEditor, selector: "ajf-quill-editor", inputs: { theme: "theme", modules: "modules", readOnly: "readOnly", placeholder: "placeholder", maxLength: "maxLength", minLength: "minLength", formats: "formats", initHTML: "initHTML" }, outputs: { editorCreated: "editorCreated", contentChanged: "contentChanged", selectionChanged: "selectionChanged", formulaClick: "formulaClick" }, providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AjfQuillEditor), multi: true },
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => AjfQuillEditor), multi: true },
    ], usesOnChanges: true, ngImport: i0, template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `, isInline: true, styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfQuillEditor, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-quill-editor', template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AjfQuillEditor), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => AjfQuillEditor), multi: true },
                    ], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.AjfReportBuilderService }]; }, propDecorators: { theme: [{
                type: Input
            }], modules: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], minLength: [{
                type: Input
            }], formats: [{
                type: Input
            }], initHTML: [{
                type: Input
            }], editorCreated: [{
                type: Output
            }], contentChanged: [{
                type: Output
            }], selectionChanged: [{
                type: Output
            }], formulaClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsR0FFbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUMsT0FBTyxJQUFJLEtBQUssRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7QUFlakUsTUFBTSxPQUFPLGNBQWM7SUFnR3pCLFlBQ1UsV0FBdUIsRUFDdkIsU0FBb0IsRUFDcEIsUUFBaUM7UUFGakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQTlGM0MsZUFBVSxHQUFVLEVBQUUsQ0FBQztRQU1mLFVBQUssR0FBWSxLQUFLLENBQUM7UUFFL0IsZ0JBQVcsR0FBRztZQUNaO2dCQUNFLE9BQU8sRUFBRSw2QkFBNkI7Z0JBQ3RDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLFdBQVcsRUFBRSxrQkFBa0I7YUFDaEM7WUFDRCxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDO1lBQ3pELEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxP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SUFBSSxFQUFDO0tBQ3JGLCtDQU5TOztHQUVUO21HQVNVLGNBQWM7a0JBYjFCLFNBQVM7K0JBQ0Usa0JBQWtCLFlBQ2xCOztHQUVULGFBQ1U7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQzt3QkFDeEYsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7cUJBQ3JGLGlCQUVjLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU07K0pBd0V0QyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRWEsYUFBYTtzQkFBL0IsTUFBTTtnQkFDWSxjQUFjO3NCQUFoQyxNQUFNO2dCQUNZLGdCQUFnQjtzQkFBbEMsTUFBTTtnQkFPWSxZQUFZO3NCQUE5QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRvcixcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWZhdWx0IGFzIFF1aWxsfSBmcm9tICdxdWlsbCc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1xdWlsbC1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamYtcXVpbGwtZWRpdG9yLXRvb2xiYXJdXCI+PC9uZy1jb250ZW50PlxuICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZlF1aWxsRWRpdG9yKSwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksIG11bHRpOiB0cnVlfSxcbiAgXSxcbiAgc3R5bGVVcmxzOiBbJ3F1aWxsLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlF1aWxsRWRpdG9yXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBWYWxpZGF0b3JcbntcbiAgcXVpbGxFZGl0b3I6IGFueTtcbiAgZWRpdG9yRWxlbTogSFRNTEVsZW1lbnQ7XG4gIGVtcHR5QXJyYXk6IGFueVtdID0gW107XG4gIGNvbnRlbnQ6IGFueTtcblxuICBsaXN0ZW5GdW5jOiBGdW5jdGlvbjtcblxuICBwcmV2aWV3RWxlbUZvcm11bGE6IGFueTtcbiAgcHJpdmF0ZSBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGRhdGVGb3JtYXRzID0gW1xuICAgIHtcbiAgICAgICdsYWJlbCc6ICdKdW5lIDIzcmQgMjAxNywgMTI6Mzk6MTIgcG0nLFxuICAgICAgJ3ZhbHVlJzogJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyxcbiAgICAgICd2YWxpZGF0b3InOiAnTU1NTURvWVlZWWhtbXNzYScsXG4gICAgfSxcbiAgICB7J2xhYmVsJzogJ0ZyaWRheScsICd2YWx1ZSc6ICdkZGRkJywgJ3ZhbGlkYXRvcic6ICdkZGRkJ30sXG4gICAgeydsYWJlbCc6ICdKdW4gMjNyZCAxNycsICd2YWx1ZSc6ICdNTU0gRG8gWVknLCAndmFsaWRhdG9yJzogJ01NTURvWVknfSxcbiAgXTtcblxuICBmb250cyA9IFtcbiAgICBmYWxzZSxcbiAgICAnYmxhY2tyJyxcbiAgICAnYmxhY2staXRhbGljJyxcbiAgICAnYm9sZCcsXG4gICAgJ2JvbGQtY29uZGVuc2VkJyxcbiAgICAnYm9sZC1jb25kZW5zZWQtaXRhbGljJyxcbiAgICAnYm9sZC1pdGFsaWMnLFxuICAgICdjb25kZW5zZWQnLFxuICAgICdjb25kZW5zZWQtaXRhbGljJyxcbiAgICAnaXRhbGljJyxcbiAgICAnbGlnaHQnLFxuICAgICdsaWdodC1pdGFsaWMnLFxuICAgICdtZWRpdW0nLFxuICAgICdtZWRpdW0taXRhbGljJyxcbiAgICAndGhpbnInLFxuICAgICd0aGluLWl0YWxpYycsXG4gIF07XG5cbiAgZGVmYXVsdE1vZHVsZXMgPSB7XG4gICAgZm9ybXVsYTogdHJ1ZSxcbiAgICB0b29sYmFyOiBbXG4gICAgICBbJ2Zvcm11bGEnXSxcbiAgICAgIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG5cbiAgICAgIFt7J2hlYWRlcic6IDF9LCB7J2hlYWRlcic6IDJ9XSwgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgIFt7J2xpc3QnOiAnb3JkZXJlZCd9LCB7J2xpc3QnOiAnYnVsbGV0J31dLFxuICAgICAgW3snc2NyaXB0JzogJ3N1Yid9LCB7J3NjcmlwdCc6ICdzdXBlcid9XSwgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAvLyBbeyAnaW5kZW50JzogJy0xJ30sIHsgJ2luZGVudCc6ICcrMScgfV0sICAgICAgICAgIC8vIG91dGRlbnQvaW5kZW50XG4gICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgIFt7J3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ119XSwgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICBbeydoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdfV0sXG5cbiAgICAgIFt7J2NvbG9yJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCl9LCB7J2JhY2tncm91bmQnOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKX1dLCAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgIFt7J2ZvbnQnOiB0aGlzLmZvbnRzfV0sXG4gICAgICBbeydhbGlnbic6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpfV0sXG5cbiAgICAgIFsnY2xlYW4nXSwgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgIC8vIFsnbGluaycsICdpbWFnZScsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgIF0sXG4gIH07XG5cbiAgZm9udCA9IFF1aWxsLmltcG9ydCgnZm9ybWF0cy9mb250Jyk7XG5cbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgbW9kdWxlczogT2JqZWN0O1xuICBASW5wdXQoKSByZWFkT25seTogYm9vbGVhbjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pbkxlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBmb3JtYXRzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgaW5pdEhUTUw6IHN0cmluZztcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgZWRpdG9yQ3JlYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjb250ZW50Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogdGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrIG9uIGZvcm11bGEgYnV0dG9uIG9uIHF1aWxsIGVkaXRvciByb29sIGJhcsaSXG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZvcm11bGFDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF9mb3JtdWxhczoge2Zvcm11bGE6IGFueTsgdW5saXN0ZW46IEZ1bmN0aW9uIHwgbnVsbH1bXSA9IFtdO1xuICBwcml2YXRlIF9mb3JtdWxhVGV4dFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5mb250LndoaXRlbGlzdCA9IHRoaXMuZm9udHM7XG4gICAgdGhpcy5mb250LndoaXRlbGlzdC5wdXNoKCdyZWd1bGFyJyk7XG5cbiAgICB0aGlzLl9mb3JtdWxhVGV4dFN1YiA9IHRoaXMuX3NlcnZpY2UuZ2V0Rm9ybXVsYVRvSHRtbEV2ZW50KCkuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyByZWZlcmVuY2UgaXMgZGVmaW5lZCBvbmx5IHdoZW4gdGhlIHVzZXIgd2FudCB0byBlZGl0IHRoZSBmb3JtdWxhXG4gICAgICBpZiAoZXZlbnQucmVmZXJlbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXZlbnQucmVmZXJlbmNlLmlubmVySFRNTCA9IGV2ZW50LmZvcm11bGE7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShldmVudC5yZWZlcmVuY2UsICdmb3JtdWxhJywgZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgIGNvbnN0IGVmcyA9IHRoaXMuX2Zvcm11bGFzLmZpbHRlcihmID0+IGYuZm9ybXVsYSA9PT0gZXZlbnQucmVmZXJlbmNlKTtcbiAgICAgICAgbGV0IGZvcm11bGFFbnRyeTtcbiAgICAgICAgbGV0IHVubGlzdGVuO1xuICAgICAgICBpZiAoZWZzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3JtdWxhRW50cnkgPSBlZnNbMF07XG4gICAgICAgICAgdW5saXN0ZW4gPSBmb3JtdWxhRW50cnkudW5saXN0ZW47XG4gICAgICAgICAgaWYgKHVubGlzdGVuICE9IG51bGwpIHtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvcm11bGFFbnRyeSA9IHtmb3JtdWxhOiBldmVudC5yZWZlcmVuY2UsIHVubGlzdGVuOiBudWxsfTtcbiAgICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKGZvcm11bGFFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybXVsYUVudHJ5LnVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGV2ZW50LnJlZmVyZW5jZSwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBvYmogPSB7J2Zvcm11bGEnOiBldmVudC5mb3JtdWxhLCAncmVmZXJlbmNlJzogZXZlbnQucmVmZXJlbmNlfTtcbiAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcXVpbGxFZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgY29uc3QgbGluayA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGxpbmssICdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShsaW5rLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGxpbmssICdmb3JtdWxhJywgdGhpcy5jaGVjayhldmVudC5mb3JtdWxhKSk7XG4gICAgICAgIGNvbnN0IGxpbmtMYWJlbCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGxpbmssIGxpbmtMYWJlbCk7XG4gICAgICAgIC8vIGFkZCBsaXN0ZW5lciByZWxhdGVkIG9uIHRoZSBjbGljayBldmVudCBvZiB0aGUgbmV3IGZvcm11bGFcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4obGluaywgJ2NsaWNrJywgXyA9PiB7XG4gICAgICAgICAgbGV0IG9iaiA9IHsnZm9ybXVsYSc6IHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSksICdyZWZlcmVuY2UnOiBsaW5rfTtcbiAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChxdWlsbEVkaXRvciwgbGluayk7XG4gICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goe3VubGlzdGVuLCBmb3JtdWxhOiBsaW5rfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVjayh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0ZUZvcm1hdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbGlkYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxzdHJpbmc+dmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgZnVuY3Rpb24gc2VhcmNoIGZvbXVsYXMgaW5zaWRlIHRoZSBpbml0IHRleHRcbiAgICogYW5kIGFsbG9jYXRlIHRoZSByZWxhdGVkIGxpc3RlbmVyIG9uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgc2V0SFRNTCgpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5pbml0SFRNTCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgdG9vbGJhckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl0nKTtcbiAgICBsZXQgbW9kdWxlczogYW55ID0gdGhpcy5tb2R1bGVzIHx8IHRoaXMuZGVmYXVsdE1vZHVsZXM7XG5cbiAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuXG4gICAgaWYgKHRvb2xiYXJFbGVtKSB7XG4gICAgICBtb2R1bGVzWyd0b29sYmFyJ10gPSB0b29sYmFyRWxlbTtcbiAgICAgIG1vZHVsZXNbJ2Zvcm11bGEnXSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJyxcbiAgICAgICc8ZGl2IHF1aWxsLWVkaXRvci1lbGVtZW50PjwvZGl2PicsXG4gICAgKTtcblxuICAgIHRoaXMuZWRpdG9yRWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcXVpbGwtZWRpdG9yLWVsZW1lbnRdJyk7XG5cbiAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKHRoaXMuZWRpdG9yRWxlbSwge1xuICAgICAgbW9kdWxlczogbW9kdWxlcyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSB8fCBmYWxzZSxcbiAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0cyxcbiAgICB9KTtcblxuICAgIHRoaXMuZWRpdG9yQ3JlYXRlZC5lbWl0KHRoaXMucXVpbGxFZGl0b3IpO1xuICAgIHRoaXMuc2V0SFRNTCgpO1xuXG4gICAgLy8gbWFyayBtb2RlbCBhcyB0b3VjaGVkIGlmIGVkaXRvciBsb3N0IGZvY3VzXG4gICAgdGhpcy5xdWlsbEVkaXRvci5vbignc2VsZWN0aW9uLWNoYW5nZScsIChyYW5nZTogYW55LCBvbGRSYW5nZTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkLmVtaXQoe1xuICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsXG4gICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgb2xkUmFuZ2U6IG9sZFJhbmdlLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBtb2RlbCBpZiB0ZXh0IGNoYW5nZXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCd0ZXh0LWNoYW5nZScsIChkZWx0YTogYW55LCBvbGREZWx0YTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGh0bWw6IGFueSA9IHRoaXMuZWRpdG9yRWxlbS5jaGlsZHJlblswXS5pbm5lckhUTUw7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCk7XG5cbiAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nKSB7XG4gICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoaHRtbCk7XG5cbiAgICAgIHRoaXMuY29udGVudENoYW5nZWQuZW1pdCh7XG4gICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbEVkaXRvcixcbiAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICBvbGREZWx0YTogb2xkRGVsdGEsXG4gICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWZvcm11bGEnKTtcbiAgICB0aGlzLmxpc3RlbkZ1bmMgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWxlbSwgJ2NsaWNrJywgXyA9PiB7XG4gICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKGN1cnJlbnRWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY3VycmVudFZhbHVlO1xuXG4gICAgaWYgKHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PSB0aGlzLmluaXRIVE1MICYmICF0aGlzLl9pbml0KSB7XG4gICAgICAgICAgbGV0IGVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWVkaXRvcicpO1xuICAgICAgICAgIGVkaXRvci5pbm5lckhUTUwgPSB0aGlzLmluaXRIVE1MO1xuICAgICAgICAgIGxldCBhbGxGb3JtdWxhcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZm9ybXVsYV0nKTtcbiAgICAgICAgICBhbGxGb3JtdWxhcy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGVsZW0sICdjbGljaycsIF8gPT4ge1xuICAgICAgICAgICAgICBsZXQgb2JqID0geydmb3JtdWxhJzogdGhpcy5jaGVjayhlbGVtLmlubmVyVGV4dCksICdyZWZlcmVuY2UnOiBlbGVtfTtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goe3VubGlzdGVuLCBmb3JtdWxhOiBlbGVtfSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgIT0gdGhpcy5pbml0SFRNTCkge1xuICAgICAgICAgIHRoaXMucXVpbGxFZGl0b3IucGFzdGVIVE1MKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5xdWlsbEVkaXRvci5zZXRUZXh0KCcnKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoX2M6IEZvcm1Db250cm9sKSB7XG4gICAgaWYgKCF0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZXJyOiB7XG4gICAgICAgIG1pbkxlbmd0aEVycm9yPzoge2dpdmVuOiBudW1iZXI7IG1pbkxlbmd0aDogbnVtYmVyfTtcbiAgICAgICAgbWF4TGVuZ3RoRXJyb3I/OiB7Z2l2ZW46IG51bWJlcjsgbWF4TGVuZ3RoOiBudW1iZXJ9O1xuICAgICAgfSA9IHt9LFxuICAgICAgdmFsaWQgPSB0cnVlO1xuXG4gICAgY29uc3QgdGV4dExlbmd0aCA9IHRoaXMucXVpbGxFZGl0b3IuZ2V0VGV4dCgpLnRyaW0oKS5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIGVyci5taW5MZW5ndGhFcnJvciA9IHtnaXZlbjogdGV4dExlbmd0aCwgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aH07XG5cbiAgICAgIHZhbGlkID0gdGV4dExlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCB8fCAhdGV4dExlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgIGVyci5tYXhMZW5ndGhFcnJvciA9IHtnaXZlbjogdGV4dExlbmd0aCwgbWF4TGVuZ3RoOiB0aGlzLm1heExlbmd0aH07XG5cbiAgICAgIHZhbGlkID0gdGV4dExlbmd0aCA8PSB0aGlzLm1heExlbmd0aCAmJiB2YWxpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWQgPyBudWxsIDogZXJyO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydyZWFkT25seSddICYmIHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IuZW5hYmxlKCFjaGFuZ2VzWydyZWFkT25seSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtb2R1bGVzJ10gJiYgdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgUXVpbGwucmVnaXN0ZXIodGhpcy5mb250LCB0cnVlKTtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IgPSBuZXcgUXVpbGwodGhpcy5lZGl0b3JFbGVtLCB7XG4gICAgICAgIG1vZHVsZXM6IGNoYW5nZXNbJ21vZHVsZXMnXVsnY3VycmVudFZhbHVlJ10sXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5IHx8IGZhbHNlLFxuICAgICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0cyxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zvcm11bGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdW5saXN0ZW4gPSB0aGlzLl9mb3JtdWxhc1tpXS51bmxpc3RlbjtcbiAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgIHVubGlzdGVuKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Zvcm11bGFUZXh0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==