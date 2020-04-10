/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/quill-editor.ts
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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { default as Quill } from 'quill';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
export class AjfQuillEditor {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _service
     */
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
         * \@memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
        this.onModelChange = (/**
         * @return {?}
         */
        () => { });
        this.onModelTouched = (/**
         * @return {?}
         */
        () => { });
        this._formulas = [];
        this._formulaTextSub = Subscription.EMPTY;
        this.font.whitelist = this.fonts;
        this.font.whitelist.push('regular');
        this._formulaTextSub = this._service.getFormulaToHtmlEvent().subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // reference is defined only when the user want to edit the formula
            if (event.reference !== undefined) {
                event.reference.innerHTML = event.formula;
                this._renderer.setAttribute(event.reference, 'formula', event.formula);
                /** @type {?} */
                const efs = this._formulas.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.formula === event.reference));
                /** @type {?} */
                let formulaEntry;
                /** @type {?} */
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
                formulaEntry.unlisten = this._renderer.listen(event.reference, 'click', (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    let obj = { 'formula': event.formula, 'reference': event.reference };
                    this.formulaClick.emit(obj);
                }));
            }
            else {
                /** @type {?} */
                const quillEditor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                /** @type {?} */
                const link = this._renderer.createElement('a');
                this._renderer.setAttribute(link, 'href', 'javascript:void(0)');
                this._renderer.setStyle(link, 'cursor', 'pointer');
                this._renderer.setAttribute(link, 'formula', this.check(event.formula));
                /** @type {?} */
                const linkLabel = this._renderer.createText(event.formula);
                this._renderer.appendChild(link, linkLabel);
                // add listener related on the click event of the new formula
                /** @type {?} */
                const unlisten = this._renderer.listen(link, 'click', (/**
                 * @param {?} _
                 * @return {?}
                 */
                (_) => {
                    /** @type {?} */
                    let obj = { 'formula': this.check(event.formula), 'reference': link };
                    this.formulaClick.emit(obj);
                }));
                this._renderer.appendChild(quillEditor, link);
                this._formulas.push({ unlisten, formula: link });
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    check(value) {
        for (let i = 0; i < this.dateFormats.length; i++) {
            if (this.dateFormats[i].value == value) {
                return this.dateFormats[i].validator;
            }
        }
        return (/** @type {?} */ (value));
    }
    /**
     * this function search fomulas inside the init text
     * and allocate the related listener on click event
     *
     * \@memberof QuillEditorComponent
     * @return {?}
     */
    setHTML() {
        this.writeValue(this.initHTML);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const toolbarElem = this._elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
        /** @type {?} */
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
        this.quillEditor.on('selection-change', (/**
         * @param {?} range
         * @param {?} oldRange
         * @param {?} source
         * @return {?}
         */
        (range, oldRange, source) => {
            this.selectionChanged.emit({ editor: this.quillEditor, range: range, oldRange: oldRange, source: source });
            if (!range) {
                this.onModelTouched();
            }
        }));
        // update model if text changes
        this.quillEditor.on('text-change', (/**
         * @param {?} delta
         * @param {?} oldDelta
         * @param {?} source
         * @return {?}
         */
        (delta, oldDelta, source) => {
            /** @type {?} */
            let html = this.editorElem.children[0].innerHTML;
            /** @type {?} */
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
        }));
        /** @type {?} */
        let elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
        this.listenFunc = this._renderer.listen(elem, 'click', (/**
         * @param {?} _
         * @return {?}
         */
        (_) => {
            this.formulaClick.emit();
        }));
    }
    /**
     * @param {?} currentValue
     * @return {?}
     */
    writeValue(currentValue) {
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                if (currentValue == this.initHTML && !this._init) {
                    /** @type {?} */
                    let editor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    editor.innerHTML = this.initHTML;
                    /** @type {?} */
                    let allFormulas = this._elementRef.nativeElement.querySelectorAll('[formula]');
                    allFormulas.forEach((/**
                     * @param {?} elem
                     * @return {?}
                     */
                    (elem) => {
                        /** @type {?} */
                        const unlisten = this._renderer.listen(elem, 'click', (/**
                         * @param {?} _
                         * @return {?}
                         */
                        (_) => {
                            /** @type {?} */
                            let obj = { 'formula': this.check(elem.innerText), 'reference': elem };
                            this.formulaClick.emit(obj);
                        }));
                        this._renderer.setStyle(elem, 'cursor', 'pointer');
                        this._formulas.push({ unlisten, formula: elem });
                        this._init = true;
                    }));
                }
                else if (currentValue != this.initHTML) {
                    this.quillEditor.pasteHTML(currentValue);
                }
                return;
            }
            this.quillEditor.setText('');
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} _c
     * @return {?}
     */
    validate(_c) {
        if (!this.quillEditor) {
            return null;
        }
        /** @type {?} */
        let err = {};
        /** @type {?} */
        let valid = true;
        /** @type {?} */
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
    /**
     * @param {?} changes
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (let i = 0; i < this._formulas.length; i++) {
            /** @type {?} */
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
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)), multi: true },
                    { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)), multi: true }
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"]
            }] }
];
/** @nocollapse */
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
if (false) {
    /** @type {?} */
    AjfQuillEditor.prototype.quillEditor;
    /** @type {?} */
    AjfQuillEditor.prototype.editorElem;
    /** @type {?} */
    AjfQuillEditor.prototype.emptyArray;
    /** @type {?} */
    AjfQuillEditor.prototype.content;
    /** @type {?} */
    AjfQuillEditor.prototype.listenFunc;
    /** @type {?} */
    AjfQuillEditor.prototype.previewElemFormula;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._init;
    /** @type {?} */
    AjfQuillEditor.prototype.dateFormats;
    /** @type {?} */
    AjfQuillEditor.prototype.fonts;
    /** @type {?} */
    AjfQuillEditor.prototype.defaultModules;
    /** @type {?} */
    AjfQuillEditor.prototype.font;
    /** @type {?} */
    AjfQuillEditor.prototype.theme;
    /** @type {?} */
    AjfQuillEditor.prototype.modules;
    /** @type {?} */
    AjfQuillEditor.prototype.readOnly;
    /** @type {?} */
    AjfQuillEditor.prototype.placeholder;
    /** @type {?} */
    AjfQuillEditor.prototype.maxLength;
    /** @type {?} */
    AjfQuillEditor.prototype.minLength;
    /** @type {?} */
    AjfQuillEditor.prototype.formats;
    /** @type {?} */
    AjfQuillEditor.prototype.initHTML;
    /** @type {?} */
    AjfQuillEditor.prototype.editorCreated;
    /** @type {?} */
    AjfQuillEditor.prototype.contentChanged;
    /** @type {?} */
    AjfQuillEditor.prototype.selectionChanged;
    /**
     * this event is fired when the user click on formula button on quill editor rool barƒ
     *
     * \@memberof QuillEditorComponent
     * @type {?}
     */
    AjfQuillEditor.prototype.formulaClick;
    /** @type {?} */
    AjfQuillEditor.prototype.onModelChange;
    /** @type {?} */
    AjfQuillEditor.prototype.onModelTouched;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._formulas;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._formulaTextSub;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    AjfQuillEditor.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFFbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUMsT0FBTyxJQUFJLEtBQUssRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBZ0JqRSxNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBdUZ6QixZQUNZLFdBQXVCLEVBQVUsU0FBb0IsRUFDckQsUUFBaUM7UUFEakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3JELGFBQVEsR0FBUixRQUFRLENBQXlCO1FBckY3QyxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBTWYsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUUvQixnQkFBVyxHQUFHO1lBQ1o7Z0JBQ0UsT0FBTyxFQUFFLDZCQUE2QjtnQkFDdEMsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsV0FBVyxFQUFFLGtCQUFrQjthQUNoQztZQUNELEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUM7WUFDekQsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE9B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cENDLFVBQVU7WUFPVixTQUFTO1lBY0gsdUJBQXVCOzs7b0JBMkU1QixLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7NEJBRUwsTUFBTTs2QkFDTixNQUFNOytCQUNOLE1BQU07MkJBUU4sTUFBTTs7OztJQTVFUCxxQ0FBaUI7O0lBQ2pCLG9DQUF3Qjs7SUFDeEIsb0NBQXVCOztJQUN2QixpQ0FBYTs7SUFFYixvQ0FBcUI7O0lBRXJCLDRDQUF3Qjs7Ozs7SUFDeEIsK0JBQStCOztJQUUvQixxQ0FRRTs7SUFHRiwrQkFJRTs7SUFFRix3Q0F5QkU7O0lBRUYsOEJBQW9DOztJQUdwQywrQkFBdUI7O0lBQ3ZCLGlDQUF5Qjs7SUFDekIsa0NBQTJCOztJQUMzQixxQ0FBNkI7O0lBQzdCLG1DQUEyQjs7SUFDM0IsbUNBQTJCOztJQUMzQixpQ0FBMkI7O0lBQzNCLGtDQUEwQjs7SUFFMUIsdUNBQWdFOztJQUNoRSx3Q0FBaUU7O0lBQ2pFLDBDQUFtRTs7Ozs7OztJQVFuRSxzQ0FBb0U7O0lBR3BFLHVDQUFtQzs7SUFDbkMsd0NBQW9DOzs7OztJQUVwQyxtQ0FBa0U7Ozs7O0lBQ2xFLHlDQUEyRDs7Ozs7SUFHdkQscUNBQStCOzs7OztJQUFFLG1DQUE0Qjs7Ozs7SUFDN0Qsa0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIEZvcm1Db250cm9sLFxuICBOR19WQUxJREFUT1JTLFxuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGVmYXVsdCBhcyBRdWlsbH0gZnJvbSAncXVpbGwnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1xdWlsbC1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamYtcXVpbGwtZWRpdG9yLXRvb2xiYXJdXCI+PC9uZy1jb250ZW50PlxuICBgLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZlF1aWxsRWRpdG9yKSwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksIG11bHRpOiB0cnVlfVxuICBdLFxuICBzdHlsZVVybHM6IFsncXVpbGwtZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZRdWlsbEVkaXRvciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uRGVzdHJveSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhbGlkYXRvciB7XG4gIHF1aWxsRWRpdG9yOiBhbnk7XG4gIGVkaXRvckVsZW06IEhUTUxFbGVtZW50O1xuICBlbXB0eUFycmF5OiBhbnlbXSA9IFtdO1xuICBjb250ZW50OiBhbnk7XG5cbiAgbGlzdGVuRnVuYzogRnVuY3Rpb247XG5cbiAgcHJldmlld0VsZW1Gb3JtdWxhOiBhbnk7XG4gIHByaXZhdGUgX2luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBkYXRlRm9ybWF0cyA9IFtcbiAgICB7XG4gICAgICAnbGFiZWwnOiAnSnVuZSAyM3JkIDIwMTcsIDEyOjM5OjEyIHBtJyxcbiAgICAgICd2YWx1ZSc6ICdNTU1NIERvIFlZWVksIGg6bW06c3MgYScsXG4gICAgICAndmFsaWRhdG9yJzogJ01NTU1Eb1lZWVlobW1zc2EnXG4gICAgfSxcbiAgICB7J2xhYmVsJzogJ0ZyaWRheScsICd2YWx1ZSc6ICdkZGRkJywgJ3ZhbGlkYXRvcic6ICdkZGRkJ30sXG4gICAgeydsYWJlbCc6ICdKdW4gMjNyZCAxNycsICd2YWx1ZSc6ICdNTU0gRG8gWVknLCAndmFsaWRhdG9yJzogJ01NTURvWVknfVxuICBdO1xuXG5cbiAgZm9udHMgPSBbXG4gICAgZmFsc2UsICdibGFja3InLCAnYmxhY2staXRhbGljJywgJ2JvbGQnLCAnYm9sZC1jb25kZW5zZWQnLCAnYm9sZC1jb25kZW5zZWQtaXRhbGljJyxcbiAgICAnYm9sZC1pdGFsaWMnLCAnY29uZGVuc2VkJywgJ2NvbmRlbnNlZC1pdGFsaWMnLCAnaXRhbGljJywgJ2xpZ2h0JywgJ2xpZ2h0LWl0YWxpYycsICdtZWRpdW0nLFxuICAgICdtZWRpdW0taXRhbGljJywgJ3RoaW5yJywgJ3RoaW4taXRhbGljJ1xuICBdO1xuXG4gIGRlZmF1bHRNb2R1bGVzID0ge1xuICAgIGZvcm11bGE6IHRydWUsXG4gICAgdG9vbGJhcjpcbiAgICAgICAgW1xuICAgICAgICAgIFsnZm9ybXVsYSddLCBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSwgIC8vIHRvZ2dsZWQgYnV0dG9uc1xuICAgICAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG5cbiAgICAgICAgICBbeydoZWFkZXInOiAxfSwgeydoZWFkZXInOiAyfV0sICAvLyBjdXN0b20gYnV0dG9uIHZhbHVlc1xuICAgICAgICAgIFt7J2xpc3QnOiAnb3JkZXJlZCd9LCB7J2xpc3QnOiAnYnVsbGV0J31dLFxuICAgICAgICAgIFt7J3NjcmlwdCc6ICdzdWInfSwgeydzY3JpcHQnOiAnc3VwZXInfV0sICAvLyBzdXBlcnNjcmlwdC9zdWJzY3JpcHRcbiAgICAgICAgICAvLyBbeyAnaW5kZW50JzogJy0xJ30sIHsgJ2luZGVudCc6ICcrMScgfV0sICAgICAgICAgIC8vIG91dGRlbnQvaW5kZW50XG4gICAgICAgICAgLy8gW3sgJ2RpcmVjdGlvbic6ICdydGwnIH1dLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuXG4gICAgICAgICAgW3snc2l6ZSc6IFsnc21hbGwnLCBmYWxzZSwgJ2xhcmdlJywgJ2h1Z2UnXX1dLCAgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICAgICAgW3snaGVhZGVyJzogWzEsIDIsIDMsIDQsIDUsIDYsIGZhbHNlXX1dLFxuXG4gICAgICAgICAgW1xuICAgICAgICAgICAgeydjb2xvcic6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpfSwgeydiYWNrZ3JvdW5kJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCl9XG4gICAgICAgICAgXSwgIC8vIGRyb3Bkb3duIHdpdGggZGVmYXVsdHMgZnJvbSB0aGVtZVxuICAgICAgICAgIFt7J2ZvbnQnOiB0aGlzLmZvbnRzfV0sIFt7J2FsaWduJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCl9XSxcblxuICAgICAgICAgIFsnY2xlYW4nXSwgIC8vIHJlbW92ZSBmb3JtYXR0aW5nIGJ1dHRvblxuXG4gICAgICAgICAgLy8gWydsaW5rJywgJ2ltYWdlJywgJ3ZpZGVvJ10gICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluayBhbmQgaW1hZ2UsIHZpZGVvXG4gICAgICAgIF1cbiAgfTtcblxuICBmb250ID0gUXVpbGwuaW1wb3J0KCdmb3JtYXRzL2ZvbnQnKTtcblxuXG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vZHVsZXM6IE9iamVjdDtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1heExlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5MZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgZm9ybWF0czogc3RyaW5nW107XG4gIEBJbnB1dCgpIGluaXRIVE1MOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGVkaXRvckNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29udGVudENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAvKipcbiAgICogdGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrIG9uIGZvcm11bGEgYnV0dG9uIG9uIHF1aWxsIGVkaXRvciByb29sIGJhcsaSXG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGZvcm11bGFDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgX2Zvcm11bGFzOiB7Zm9ybXVsYTogYW55LCB1bmxpc3RlbjogRnVuY3Rpb258bnVsbH1bXSA9IFtdO1xuICBwcml2YXRlIF9mb3JtdWxhVGV4dFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5mb250LndoaXRlbGlzdCA9IHRoaXMuZm9udHM7XG4gICAgdGhpcy5mb250LndoaXRlbGlzdC5wdXNoKCdyZWd1bGFyJyk7XG5cbiAgICB0aGlzLl9mb3JtdWxhVGV4dFN1YiA9IHRoaXMuX3NlcnZpY2UuZ2V0Rm9ybXVsYVRvSHRtbEV2ZW50KCkuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG4gICAgICAvLyByZWZlcmVuY2UgaXMgZGVmaW5lZCBvbmx5IHdoZW4gdGhlIHVzZXIgd2FudCB0byBlZGl0IHRoZSBmb3JtdWxhXG4gICAgICBpZiAoZXZlbnQucmVmZXJlbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXZlbnQucmVmZXJlbmNlLmlubmVySFRNTCA9IGV2ZW50LmZvcm11bGE7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShldmVudC5yZWZlcmVuY2UsICdmb3JtdWxhJywgZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgIGNvbnN0IGVmcyA9IHRoaXMuX2Zvcm11bGFzLmZpbHRlcihmID0+IGYuZm9ybXVsYSA9PT0gZXZlbnQucmVmZXJlbmNlKTtcbiAgICAgICAgbGV0IGZvcm11bGFFbnRyeTtcbiAgICAgICAgbGV0IHVubGlzdGVuO1xuICAgICAgICBpZiAoZWZzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3JtdWxhRW50cnkgPSBlZnNbMF07XG4gICAgICAgICAgdW5saXN0ZW4gPSBmb3JtdWxhRW50cnkudW5saXN0ZW47XG4gICAgICAgICAgaWYgKHVubGlzdGVuICE9IG51bGwpIHtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvcm11bGFFbnRyeSA9IHtmb3JtdWxhOiBldmVudC5yZWZlcmVuY2UsIHVubGlzdGVuOiBudWxsfTtcbiAgICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKGZvcm11bGFFbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybXVsYUVudHJ5LnVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGV2ZW50LnJlZmVyZW5jZSwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBvYmogPSB7J2Zvcm11bGEnOiBldmVudC5mb3JtdWxhLCAncmVmZXJlbmNlJzogZXZlbnQucmVmZXJlbmNlfTtcbiAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcXVpbGxFZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgY29uc3QgbGluayA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGxpbmssICdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShsaW5rLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGxpbmssICdmb3JtdWxhJywgdGhpcy5jaGVjayhldmVudC5mb3JtdWxhKSk7XG4gICAgICAgIGNvbnN0IGxpbmtMYWJlbCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGxpbmssIGxpbmtMYWJlbCk7XG4gICAgICAgIC8vIGFkZCBsaXN0ZW5lciByZWxhdGVkIG9uIHRoZSBjbGljayBldmVudCBvZiB0aGUgbmV3IGZvcm11bGFcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4obGluaywgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgICAgICBsZXQgb2JqID0geydmb3JtdWxhJzogdGhpcy5jaGVjayhldmVudC5mb3JtdWxhKSwgJ3JlZmVyZW5jZSc6IGxpbmt9O1xuICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHF1aWxsRWRpdG9yLCBsaW5rKTtcbiAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaCh7dW5saXN0ZW4sIGZvcm11bGE6IGxpbmt9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRlRm9ybWF0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdHNbaV0udmFsdWUgPT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHNbaV0udmFsaWRhdG9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gPHN0cmluZz52YWx1ZTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBmdW5jdGlvbiBzZWFyY2ggZm9tdWxhcyBpbnNpZGUgdGhlIGluaXQgdGV4dFxuICAgKiBhbmQgYWxsb2NhdGUgdGhlIHJlbGF0ZWQgbGlzdGVuZXIgb24gY2xpY2sgZXZlbnRcbiAgICpcbiAgICogQG1lbWJlcm9mIFF1aWxsRWRpdG9yQ29tcG9uZW50XG4gICAqL1xuICBzZXRIVE1MKCkge1xuICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLmluaXRIVE1MKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCB0b29sYmFyRWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYWpmLXF1aWxsLWVkaXRvci10b29sYmFyXScpO1xuICAgIGxldCBtb2R1bGVzOiBhbnkgPSB0aGlzLm1vZHVsZXMgfHwgdGhpcy5kZWZhdWx0TW9kdWxlcztcblxuICAgIFF1aWxsLnJlZ2lzdGVyKHRoaXMuZm9udCwgdHJ1ZSk7XG5cbiAgICBpZiAodG9vbGJhckVsZW0pIHtcbiAgICAgIG1vZHVsZXNbJ3Rvb2xiYXInXSA9IHRvb2xiYXJFbGVtO1xuICAgICAgbW9kdWxlc1snZm9ybXVsYSddID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgJ2JlZm9yZWVuZCcsICc8ZGl2IHF1aWxsLWVkaXRvci1lbGVtZW50PjwvZGl2PicpO1xuXG4gICAgdGhpcy5lZGl0b3JFbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1txdWlsbC1lZGl0b3ItZWxlbWVudF0nKTtcblxuICAgIHRoaXMucXVpbGxFZGl0b3IgPSBuZXcgUXVpbGwodGhpcy5lZGl0b3JFbGVtLCB7XG4gICAgICBtb2R1bGVzOiBtb2R1bGVzLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJ0luc2VydCB0ZXh0IGhlcmUgLi4uJyxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5IHx8IGZhbHNlLFxuICAgICAgdGhlbWU6IHRoaXMudGhlbWUgfHwgJ3Nub3cnLFxuICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzXG4gICAgfSk7XG5cblxuICAgIHRoaXMuZWRpdG9yQ3JlYXRlZC5lbWl0KHRoaXMucXVpbGxFZGl0b3IpO1xuICAgIHRoaXMuc2V0SFRNTCgpO1xuXG4gICAgLy8gbWFyayBtb2RlbCBhcyB0b3VjaGVkIGlmIGVkaXRvciBsb3N0IGZvY3VzXG4gICAgdGhpcy5xdWlsbEVkaXRvci5vbignc2VsZWN0aW9uLWNoYW5nZScsIChyYW5nZTogYW55LCBvbGRSYW5nZTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkLmVtaXQoXG4gICAgICAgICAge2VkaXRvcjogdGhpcy5xdWlsbEVkaXRvciwgcmFuZ2U6IHJhbmdlLCBvbGRSYW5nZTogb2xkUmFuZ2UsIHNvdXJjZTogc291cmNlfSk7XG5cbiAgICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIG1vZGVsIGlmIHRleHQgY2hhbmdlc1xuICAgIHRoaXMucXVpbGxFZGl0b3Iub24oJ3RleHQtY2hhbmdlJywgKGRlbHRhOiBhbnksIG9sZERlbHRhOiBhbnksIHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgaHRtbDogYW55ID0gdGhpcy5lZGl0b3JFbGVtLmNoaWxkcmVuWzBdLmlubmVySFRNTDtcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnF1aWxsRWRpdG9yLmdldFRleHQoKTtcblxuICAgICAgaWYgKGh0bWwgPT09ICc8cD48YnI+PC9wPicpIHtcbiAgICAgICAgaHRtbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShodG1sKTtcblxuICAgICAgdGhpcy5jb250ZW50Q2hhbmdlZC5lbWl0KHtcbiAgICAgICAgZWRpdG9yOiB0aGlzLnF1aWxsRWRpdG9yLFxuICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgIG9sZERlbHRhOiBvbGREZWx0YSxcbiAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1mb3JtdWxhJyk7XG4gICAgdGhpcy5saXN0ZW5GdW5jID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGVsZW0sICdjbGljaycsIChfKSA9PiB7XG4gICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKGN1cnJlbnRWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY3VycmVudFZhbHVlO1xuXG4gICAgaWYgKHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PSB0aGlzLmluaXRIVE1MICYmICF0aGlzLl9pbml0KSB7XG4gICAgICAgICAgbGV0IGVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWVkaXRvcicpO1xuICAgICAgICAgIGVkaXRvci5pbm5lckhUTUwgPSB0aGlzLmluaXRIVE1MO1xuICAgICAgICAgIGxldCBhbGxGb3JtdWxhcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZm9ybXVsYV0nKTtcbiAgICAgICAgICBhbGxGb3JtdWxhcy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGVsZW0sICdjbGljaycsIChfKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBvYmogPSB7J2Zvcm11bGEnOiB0aGlzLmNoZWNrKGVsZW0uaW5uZXJUZXh0KSwgJ3JlZmVyZW5jZSc6IGVsZW19O1xuICAgICAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW0sICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaCh7dW5saXN0ZW4sIGZvcm11bGE6IGVsZW19KTtcbiAgICAgICAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSAhPSB0aGlzLmluaXRIVE1MKSB7XG4gICAgICAgICAgdGhpcy5xdWlsbEVkaXRvci5wYXN0ZUhUTUwoY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yLnNldFRleHQoJycpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICB2YWxpZGF0ZShfYzogRm9ybUNvbnRyb2wpIHtcbiAgICBpZiAoIXRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBlcnI6IHtcbiAgICAgIG1pbkxlbmd0aEVycm9yPzoge2dpdmVuOiBudW1iZXIsIG1pbkxlbmd0aDogbnVtYmVyfTtcbiAgICAgIG1heExlbmd0aEVycm9yPzoge2dpdmVuOiBudW1iZXIsIG1heExlbmd0aDogbnVtYmVyfTtcbiAgICB9ID0ge30sXG4gIHZhbGlkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHRleHRMZW5ndGggPSB0aGlzLnF1aWxsRWRpdG9yLmdldFRleHQoKS50cmltKCkubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICBlcnIubWluTGVuZ3RoRXJyb3IgPSB7Z2l2ZW46IHRleHRMZW5ndGgsIG1pbkxlbmd0aDogdGhpcy5taW5MZW5ndGh9O1xuXG4gICAgICB2YWxpZCA9IHRleHRMZW5ndGggPj0gdGhpcy5taW5MZW5ndGggfHwgIXRleHRMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgICBlcnIubWF4TGVuZ3RoRXJyb3IgPSB7Z2l2ZW46IHRleHRMZW5ndGgsIG1heExlbmd0aDogdGhpcy5tYXhMZW5ndGh9O1xuXG4gICAgICB2YWxpZCA9IHRleHRMZW5ndGggPD0gdGhpcy5tYXhMZW5ndGggJiYgdmFsaWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkID8gbnVsbCA6IGVycjtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncmVhZE9ubHknXSAmJiB0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yLmVuYWJsZSghY2hhbmdlc1sncmVhZE9ubHknXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbW9kdWxlcyddICYmIHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIFF1aWxsLnJlZ2lzdGVyKHRoaXMuZm9udCwgdHJ1ZSk7XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKHRoaXMuZWRpdG9yRWxlbSwge1xuICAgICAgICBtb2R1bGVzOiBjaGFuZ2VzWydtb2R1bGVzJ11bJ2N1cnJlbnRWYWx1ZSddLFxuICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnSW5zZXJ0IHRleHQgaGVyZSAuLi4nLFxuICAgICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSB8fCBmYWxzZSxcbiAgICAgICAgdGhlbWU6IHRoaXMudGhlbWUgfHwgJ3Nub3cnLFxuICAgICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHNcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zvcm11bGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdW5saXN0ZW4gPSB0aGlzLl9mb3JtdWxhc1tpXS51bmxpc3RlbjtcbiAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgIHVubGlzdGVuKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Zvcm11bGFUZXh0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==