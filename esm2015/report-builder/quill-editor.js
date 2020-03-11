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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Renderer2, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AjfReportBuilderService } from './report-builder-service';
import { default as Quill } from 'quill';
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
            }, {
                'label': 'Friday',
                'value': 'dddd',
                'validator': 'dddd'
            }, {
                'label': 'Jun 23rd 17',
                'value': 'MMM Do YY',
                'validator': 'MMMDoYY'
            }
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
            'thin-italic'
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
                [{ 'color': this.emptyArray.slice() },
                    { 'background': this.emptyArray.slice() }],
                [{ 'font': this.fonts }],
                [{ 'align': this.emptyArray.slice() }],
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
        this._formulaTextSub =
            this._service.getFormulaToHtmlEvent()
                .subscribe((/**
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
                        let obj = {
                            'formula': event.formula,
                            'reference': event.reference
                        };
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
                        let obj = {
                            'formula': this.check(event.formula),
                            'reference': link
                        };
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
            this.selectionChanged.emit({
                editor: this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source
            });
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
                            let obj = {
                                'formula': this.check(elem.innerText),
                                'reference': elem
                            };
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
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = textLength >= this.minLength || !textLength;
        }
        if (this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
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
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)),
                        multi: true
                    }, {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => AjfQuillEditor)),
                        multi: true
                    }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixhQUFhLEVBSWQsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxPQUFPLElBQUksS0FBSyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBcUJ2QyxNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBMEd6QixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLFFBQWlDO1FBRmpDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF4RzNDLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFNZixVQUFLLEdBQVksS0FBSyxDQUFDO1FBRS9CLGdCQUFXLEdBQUc7WUFDWjtnQkFDRSxPQUFPLEVBQUUsNkJBQTZCO2dCQUN0QyxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxXQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFdBQVcsRUFBRSxNQUFNO2FBQ3BCLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLGFBQWE7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QUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBNUNDLFVBQVU7WUFFVixTQUFTO1lBb0JILHVCQUF1Qjs7O29CQXFHNUIsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUVMLE1BQU07NkJBQ04sTUFBTTsrQkFDTixNQUFNOzJCQVFOLE1BQU07Ozs7SUE5RlAscUNBQWlCOztJQUNqQixvQ0FBd0I7O0lBQ3hCLG9DQUF1Qjs7SUFDdkIsaUNBQWE7O0lBRWIsb0NBQXFCOztJQUVyQiw0Q0FBd0I7Ozs7O0lBQ3hCLCtCQUErQjs7SUFFL0IscUNBYUs7O0lBR0wsK0JBaUJFOztJQUVGLHdDQXlCRTs7SUFFRiw4QkFBb0M7O0lBR3BDLCtCQUF1Qjs7SUFDdkIsaUNBQXlCOztJQUN6QixrQ0FBMkI7O0lBQzNCLHFDQUE2Qjs7SUFDN0IsbUNBQTJCOztJQUMzQixtQ0FBMkI7O0lBQzNCLGlDQUEyQjs7SUFDM0Isa0NBQTBCOztJQUUxQix1Q0FBZ0U7O0lBQ2hFLHdDQUFpRTs7SUFDakUsMENBQW1FOzs7Ozs7O0lBUW5FLHNDQUFvRTs7SUFHcEUsdUNBQW9DOztJQUNwQyx3Q0FBcUM7Ozs7O0lBRXJDLG1DQUFzRTs7Ozs7SUFDdEUseUNBQTJEOzs7OztJQUd6RCxxQ0FBK0I7Ozs7O0lBQy9CLG1DQUE0Qjs7Ozs7SUFDNUIsa0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgTkdfVkFMSURBVE9SUyxcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIEZvcm1Db250cm9sLFxuICBWYWxpZGF0b3Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmUmVwb3J0QnVpbGRlclNlcnZpY2V9IGZyb20gJy4vcmVwb3J0LWJ1aWxkZXItc2VydmljZSc7XG5cbmltcG9ydCB7ZGVmYXVsdCBhcyBRdWlsbH0gZnJvbSAncXVpbGwnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1xdWlsbC1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamYtcXVpbGwtZWRpdG9yLXRvb2xiYXJdXCI+PC9uZy1jb250ZW50PlxuICBgLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmUXVpbGxFZGl0b3IpLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sIHtcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZlF1aWxsRWRpdG9yKSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9XSxcbiAgc3R5bGVVcmxzOiBbJ3F1aWxsLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUXVpbGxFZGl0b3JcbiAgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFZhbGlkYXRvciB7XG5cbiAgcXVpbGxFZGl0b3I6IGFueTtcbiAgZWRpdG9yRWxlbTogSFRNTEVsZW1lbnQ7XG4gIGVtcHR5QXJyYXk6IGFueVtdID0gW107XG4gIGNvbnRlbnQ6IGFueTtcblxuICBsaXN0ZW5GdW5jOiBGdW5jdGlvbjtcblxuICBwcmV2aWV3RWxlbUZvcm11bGE6IGFueTtcbiAgcHJpdmF0ZSBfaW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGRhdGVGb3JtYXRzID0gW1xuICAgIHtcbiAgICAgICdsYWJlbCc6ICdKdW5lIDIzcmQgMjAxNywgMTI6Mzk6MTIgcG0nLFxuICAgICAgJ3ZhbHVlJzogJ01NTU0gRG8gWVlZWSwgaDptbTpzcyBhJyxcbiAgICAgICd2YWxpZGF0b3InOiAnTU1NTURvWVlZWWhtbXNzYSdcbiAgICB9LCB7XG4gICAgICAnbGFiZWwnOiAnRnJpZGF5JyxcbiAgICAgICd2YWx1ZSc6ICdkZGRkJyxcbiAgICAgICd2YWxpZGF0b3InOiAnZGRkZCdcbiAgICB9LCB7XG4gICAgICAnbGFiZWwnOiAnSnVuIDIzcmQgMTcnLFxuICAgICAgJ3ZhbHVlJzogJ01NTSBEbyBZWScsXG4gICAgICAndmFsaWRhdG9yJzogJ01NTURvWVknXG4gICAgfV07XG5cblxuICBmb250cyA9IFtcbiAgICBmYWxzZSxcbiAgICAnYmxhY2tyJyxcbiAgICAnYmxhY2staXRhbGljJyxcbiAgICAnYm9sZCcsXG4gICAgJ2JvbGQtY29uZGVuc2VkJyxcbiAgICAnYm9sZC1jb25kZW5zZWQtaXRhbGljJyxcbiAgICAnYm9sZC1pdGFsaWMnLFxuICAgICdjb25kZW5zZWQnLFxuICAgICdjb25kZW5zZWQtaXRhbGljJyxcbiAgICAnaXRhbGljJyxcbiAgICAnbGlnaHQnLFxuICAgICdsaWdodC1pdGFsaWMnLFxuICAgICdtZWRpdW0nLFxuICAgICdtZWRpdW0taXRhbGljJyxcbiAgICAndGhpbnInLFxuICAgICd0aGluLWl0YWxpYydcbiAgXTtcblxuICBkZWZhdWx0TW9kdWxlcyA9IHtcbiAgICBmb3JtdWxhOiB0cnVlLFxuICAgIHRvb2xiYXI6IFtcbiAgICAgIFsnZm9ybXVsYSddLFxuICAgICAgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sICAgICAgICAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgIC8vIFsnYmxvY2txdW90ZScsICdjb2RlLWJsb2NrJ10sXG5cbiAgICAgIFt7ICdoZWFkZXInOiAxIH0sIHsgJ2hlYWRlcic6IDIgfV0sICAgICAgICAgICAgICAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgIFt7ICdsaXN0JzogJ29yZGVyZWQnIH0sIHsgJ2xpc3QnOiAnYnVsbGV0JyB9XSxcbiAgICAgIFt7ICdzY3JpcHQnOiAnc3ViJyB9LCB7ICdzY3JpcHQnOiAnc3VwZXInIH1dLCAgICAgIC8vIHN1cGVyc2NyaXB0L3N1YnNjcmlwdFxuICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgLy8gW3sgJ2RpcmVjdGlvbic6ICdydGwnIH1dLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0ZXh0IGRpcmVjdGlvblxuXG4gICAgICBbeyAnc2l6ZSc6IFsnc21hbGwnLCBmYWxzZSwgJ2xhcmdlJywgJ2h1Z2UnXSB9XSwgIC8vIGN1c3RvbSBkcm9wZG93blxuICAgICAgW3sgJ2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV0gfV0sXG5cbiAgICAgIFt7ICdjb2xvcic6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpIH0sXG4gICAgICB7ICdiYWNrZ3JvdW5kJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCkgfV0sICAgICAgICAgIC8vIGRyb3Bkb3duIHdpdGggZGVmYXVsdHMgZnJvbSB0aGVtZVxuICAgICAgW3sgJ2ZvbnQnOiB0aGlzLmZvbnRzIH1dLFxuICAgICAgW3sgJ2FsaWduJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCkgfV0sXG5cbiAgICAgIFsnY2xlYW4nXSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBmb3JtYXR0aW5nIGJ1dHRvblxuXG4gICAgICAvLyBbJ2xpbmsnLCAnaW1hZ2UnLCAndmlkZW8nXSAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIGFuZCBpbWFnZSwgdmlkZW9cbiAgICBdXG4gIH07XG5cbiAgZm9udCA9IFF1aWxsLmltcG9ydCgnZm9ybWF0cy9mb250Jyk7XG5cblxuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSBtb2R1bGVzOiBPYmplY3Q7XG4gIEBJbnB1dCgpIHJlYWRPbmx5OiBib29sZWFuO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBtYXhMZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgbWluTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZvcm1hdHM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBpbml0SFRNTDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBlZGl0b3JDcmVhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGljayBvbiBmb3JtdWxhIGJ1dHRvbiBvbiBxdWlsbCBlZGl0b3Igcm9vbCBiYXLGklxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBmb3JtdWxhQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuXG4gIHByaXZhdGUgX2Zvcm11bGFzOiB7IGZvcm11bGE6IGFueSwgdW5saXN0ZW46IEZ1bmN0aW9uIHwgbnVsbCB9W10gPSBbXTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVRleHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmUmVwb3J0QnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLmZvbnQud2hpdGVsaXN0ID0gdGhpcy5mb250cztcbiAgICB0aGlzLmZvbnQud2hpdGVsaXN0LnB1c2goJ3JlZ3VsYXInKTtcblxuICAgIHRoaXMuX2Zvcm11bGFUZXh0U3ViID1cbiAgICAgIHRoaXMuX3NlcnZpY2UuZ2V0Rm9ybXVsYVRvSHRtbEV2ZW50KClcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4ge1xuXG4gICAgICAgICAgLy8gcmVmZXJlbmNlIGlzIGRlZmluZWQgb25seSB3aGVuIHRoZSB1c2VyIHdhbnQgdG8gZWRpdCB0aGUgZm9ybXVsYVxuICAgICAgICAgIGlmIChldmVudC5yZWZlcmVuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZXZlbnQucmVmZXJlbmNlLmlubmVySFRNTCA9IGV2ZW50LmZvcm11bGE7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXZlbnQucmVmZXJlbmNlLCAnZm9ybXVsYScsIGV2ZW50LmZvcm11bGEpO1xuICAgICAgICAgICAgY29uc3QgZWZzID0gdGhpcy5fZm9ybXVsYXMuZmlsdGVyKGYgPT4gZi5mb3JtdWxhID09PSBldmVudC5yZWZlcmVuY2UpO1xuICAgICAgICAgICAgbGV0IGZvcm11bGFFbnRyeTtcbiAgICAgICAgICAgIGxldCB1bmxpc3RlbjtcbiAgICAgICAgICAgIGlmIChlZnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBmb3JtdWxhRW50cnkgPSBlZnNbMF07XG4gICAgICAgICAgICAgIHVubGlzdGVuID0gZm9ybXVsYUVudHJ5LnVubGlzdGVuO1xuICAgICAgICAgICAgICBpZiAodW5saXN0ZW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZvcm11bGFFbnRyeSA9IHsgZm9ybXVsYTogZXZlbnQucmVmZXJlbmNlLCB1bmxpc3RlbjogbnVsbCB9O1xuICAgICAgICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKGZvcm11bGFFbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtdWxhRW50cnkudW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgIGV2ZW50LnJlZmVyZW5jZSwgJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAnZm9ybXVsYSc6IGV2ZW50LmZvcm11bGEsXG4gICAgICAgICAgICAgICAgICAncmVmZXJlbmNlJzogZXZlbnQucmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHF1aWxsRWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZWRpdG9yJyk7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGxpbmssICdocmVmJywgJ2phdmFzY3JpcHQ6dm9pZCgwKScpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUobGluaywgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGluaywgJ2Zvcm11bGEnLCB0aGlzLmNoZWNrKGV2ZW50LmZvcm11bGEpKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtMYWJlbCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZVRleHQoZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChsaW5rLCBsaW5rTGFiZWwpO1xuICAgICAgICAgICAgLy8gYWRkIGxpc3RlbmVyIHJlbGF0ZWQgb24gdGhlIGNsaWNrIGV2ZW50IG9mIHRoZSBuZXcgZm9ybXVsYVxuICAgICAgICAgICAgY29uc3QgdW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgIGxpbmssICdjbGljaycsIChfKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICdmb3JtdWxhJzogdGhpcy5jaGVjayhldmVudC5mb3JtdWxhKSxcbiAgICAgICAgICAgICAgICAgICdyZWZlcmVuY2UnOiBsaW5rXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChxdWlsbEVkaXRvciwgbGluayk7XG4gICAgICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKHsgdW5saXN0ZW4sIGZvcm11bGE6IGxpbmsgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIGNoZWNrKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuZGF0ZUZvcm1hdHMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5kYXRlRm9ybWF0c1tpXS52YWx1ZSA9PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0c1tpXS52YWxpZGF0b3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiA8c3RyaW5nPnZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIGZ1bmN0aW9uIHNlYXJjaCBmb211bGFzIGluc2lkZSB0aGUgaW5pdCB0ZXh0XG4gICAqIGFuZCBhbGxvY2F0ZSB0aGUgcmVsYXRlZCBsaXN0ZW5lciBvbiBjbGljayBldmVudFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIHNldEhUTUwoKSB7XG4gICAgdGhpcy53cml0ZVZhbHVlKHRoaXMuaW5pdEhUTUwpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IHRvb2xiYXJFbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1thamYtcXVpbGwtZWRpdG9yLXRvb2xiYXJdJyk7XG4gICAgbGV0IG1vZHVsZXM6IGFueSA9IHRoaXMubW9kdWxlcyB8fCB0aGlzLmRlZmF1bHRNb2R1bGVzO1xuXG4gICAgUXVpbGwucmVnaXN0ZXIodGhpcy5mb250LCB0cnVlKTtcblxuICAgIGlmICh0b29sYmFyRWxlbSkge1xuICAgICAgbW9kdWxlc1sndG9vbGJhciddID0gdG9vbGJhckVsZW07XG4gICAgICBtb2R1bGVzWydmb3JtdWxhJ10gPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgJ2JlZm9yZWVuZCcsICc8ZGl2IHF1aWxsLWVkaXRvci1lbGVtZW50PjwvZGl2PidcbiAgICApO1xuXG4gICAgdGhpcy5lZGl0b3JFbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ1txdWlsbC1lZGl0b3ItZWxlbWVudF0nKTtcblxuICAgIHRoaXMucXVpbGxFZGl0b3IgPSBuZXcgUXVpbGwodGhpcy5lZGl0b3JFbGVtLCB7XG4gICAgICBtb2R1bGVzOiBtb2R1bGVzLFxuICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJ0luc2VydCB0ZXh0IGhlcmUgLi4uJyxcbiAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5IHx8IGZhbHNlLFxuICAgICAgdGhlbWU6IHRoaXMudGhlbWUgfHwgJ3Nub3cnLFxuICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzXG4gICAgfSk7XG5cblxuICAgIHRoaXMuZWRpdG9yQ3JlYXRlZC5lbWl0KHRoaXMucXVpbGxFZGl0b3IpO1xuICAgIHRoaXMuc2V0SFRNTCgpO1xuXG4gICAgLy8gbWFyayBtb2RlbCBhcyB0b3VjaGVkIGlmIGVkaXRvciBsb3N0IGZvY3VzXG4gICAgdGhpcy5xdWlsbEVkaXRvci5vbignc2VsZWN0aW9uLWNoYW5nZScsIChyYW5nZTogYW55LCBvbGRSYW5nZTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkLmVtaXQoe1xuICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsXG4gICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgb2xkUmFuZ2U6IG9sZFJhbmdlLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIG1vZGVsIGlmIHRleHQgY2hhbmdlc1xuICAgIHRoaXMucXVpbGxFZGl0b3Iub24oJ3RleHQtY2hhbmdlJywgKGRlbHRhOiBhbnksIG9sZERlbHRhOiBhbnksIHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgaHRtbDogYW55ID0gdGhpcy5lZGl0b3JFbGVtLmNoaWxkcmVuWzBdLmlubmVySFRNTDtcbiAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnF1aWxsRWRpdG9yLmdldFRleHQoKTtcblxuICAgICAgaWYgKGh0bWwgPT09ICc8cD48YnI+PC9wPicpIHtcbiAgICAgICAgaHRtbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZShodG1sKTtcblxuICAgICAgdGhpcy5jb250ZW50Q2hhbmdlZC5lbWl0KHtcbiAgICAgICAgZWRpdG9yOiB0aGlzLnF1aWxsRWRpdG9yLFxuICAgICAgICBodG1sOiBodG1sLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgIG9sZERlbHRhOiBvbGREZWx0YSxcbiAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1mb3JtdWxhJyk7XG4gICAgdGhpcy5saXN0ZW5GdW5jID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGVsZW0sICdjbGljaycsIChfKSA9PiB7XG4gICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KCk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgd3JpdGVWYWx1ZShjdXJyZW50VmFsdWU6IGFueSkge1xuICAgIHRoaXMuY29udGVudCA9IGN1cnJlbnRWYWx1ZTtcblxuICAgIGlmICh0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT0gdGhpcy5pbml0SFRNTCAmJiAhdGhpcy5faW5pdCkge1xuICAgICAgICAgIGxldCBlZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgICBlZGl0b3IuaW5uZXJIVE1MID0gdGhpcy5pbml0SFRNTDtcbiAgICAgICAgICBsZXQgYWxsRm9ybXVsYXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2Zvcm11bGFdJyk7XG4gICAgICAgICAgYWxsRm9ybXVsYXMuZm9yRWFjaCgoZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgZWxlbSwgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgJ2Zvcm11bGEnOiB0aGlzLmNoZWNrKGVsZW0uaW5uZXJUZXh0KSxcbiAgICAgICAgICAgICAgICAgICdyZWZlcmVuY2UnOiBlbGVtXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goeyB1bmxpc3RlbiwgZm9ybXVsYTogZWxlbSB9KTtcbiAgICAgICAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRWYWx1ZSAhPSB0aGlzLmluaXRIVE1MKSB7XG4gICAgICAgICAgdGhpcy5xdWlsbEVkaXRvci5wYXN0ZUhUTUwoY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yLnNldFRleHQoJycpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gIH1cblxuICB2YWxpZGF0ZShfYzogRm9ybUNvbnRyb2wpIHtcbiAgICBpZiAoIXRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBlcnI6IHtcbiAgICAgIG1pbkxlbmd0aEVycm9yPzogeyBnaXZlbjogbnVtYmVyLCBtaW5MZW5ndGg6IG51bWJlciB9O1xuICAgICAgbWF4TGVuZ3RoRXJyb3I/OiB7IGdpdmVuOiBudW1iZXIsIG1heExlbmd0aDogbnVtYmVyIH07XG4gICAgfSA9IHt9LFxuICAgICAgdmFsaWQgPSB0cnVlO1xuXG4gICAgY29uc3QgdGV4dExlbmd0aCA9IHRoaXMucXVpbGxFZGl0b3IuZ2V0VGV4dCgpLnRyaW0oKS5sZW5ndGg7XG5cbiAgICBpZiAodGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIGVyci5taW5MZW5ndGhFcnJvciA9IHtcbiAgICAgICAgZ2l2ZW46IHRleHRMZW5ndGgsXG4gICAgICAgIG1pbkxlbmd0aDogdGhpcy5taW5MZW5ndGhcbiAgICAgIH07XG5cbiAgICAgIHZhbGlkID0gdGV4dExlbmd0aCA+PSB0aGlzLm1pbkxlbmd0aCB8fCAhdGV4dExlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tYXhMZW5ndGgpIHtcbiAgICAgIGVyci5tYXhMZW5ndGhFcnJvciA9IHtcbiAgICAgICAgZ2l2ZW46IHRleHRMZW5ndGgsXG4gICAgICAgIG1heExlbmd0aDogdGhpcy5tYXhMZW5ndGhcbiAgICAgIH07XG5cbiAgICAgIHZhbGlkID0gdGV4dExlbmd0aCA8PSB0aGlzLm1heExlbmd0aCAmJiB2YWxpZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWQgPyBudWxsIDogZXJyO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuXG4gICAgaWYgKGNoYW5nZXNbJ3JlYWRPbmx5J10gJiYgdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgdGhpcy5xdWlsbEVkaXRvci5lbmFibGUoIWNoYW5nZXNbJ3JlYWRPbmx5J10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21vZHVsZXMnXSAmJiB0aGlzLnF1aWxsRWRpdG9yKSB7XG5cbiAgICAgIFF1aWxsLnJlZ2lzdGVyKHRoaXMuZm9udCwgdHJ1ZSk7XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKHRoaXMuZWRpdG9yRWxlbSwge1xuICAgICAgICBtb2R1bGVzOiBjaGFuZ2VzWydtb2R1bGVzJ11bJ2N1cnJlbnRWYWx1ZSddLFxuICAgICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnSW5zZXJ0IHRleHQgaGVyZSAuLi4nLFxuICAgICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSB8fCBmYWxzZSxcbiAgICAgICAgdGhlbWU6IHRoaXMudGhlbWUgfHwgJ3Nub3cnLFxuICAgICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHNcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2Zvcm11bGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdW5saXN0ZW4gPSB0aGlzLl9mb3JtdWxhc1tpXS51bmxpc3RlbjtcbiAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgIHVubGlzdGVuKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Zvcm11bGFUZXh0U3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==