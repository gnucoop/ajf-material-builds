/**
 * @fileoverview added by tsickle
 * Generated from: src/material/report-builder/quill-editor.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixhQUFhLEVBSWQsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxPQUFPLElBQUksS0FBSyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBcUJ2QyxNQUFNLE9BQU8sY0FBYzs7Ozs7O0lBMEd6QixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLFFBQWlDO1FBRmpDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUF4RzNDLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFNZixVQUFLLEdBQVksS0FBSyxDQUFDO1FBRS9CLGdCQUFXLEdBQUc7WUFDWjtnQkFDRSxPQUFPLEVBQUUsNkJBQTZCO2dCQUN0QyxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxXQUFXLEVBQUUsa0JBQWtCO2FBQ2hDLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLFdBQVcsRUFBRSxNQUFNO2FBQ3BCLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLGFBQWE7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QUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBNUNDLFVBQVU7WUFFVixTQUFTO1lBb0JILHVCQUF1Qjs7O29CQXFHNUIsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUVMLE1BQU07NkJBQ04sTUFBTTsrQkFDTixNQUFNOzJCQVFOLE1BQU07Ozs7SUE5RlAscUNBQWlCOztJQUNqQixvQ0FBd0I7O0lBQ3hCLG9DQUF1Qjs7SUFDdkIsaUNBQWE7O0lBRWIsb0NBQXFCOztJQUVyQiw0Q0FBd0I7Ozs7O0lBQ3hCLCtCQUErQjs7SUFFL0IscUNBYUs7O0lBR0wsK0JBaUJFOztJQUVGLHdDQXlCRTs7SUFFRiw4QkFBb0M7O0lBR3BDLCtCQUF1Qjs7SUFDdkIsaUNBQXlCOztJQUN6QixrQ0FBMkI7O0lBQzNCLHFDQUE2Qjs7SUFDN0IsbUNBQTJCOztJQUMzQixtQ0FBMkI7O0lBQzNCLGlDQUEyQjs7SUFDM0Isa0NBQTBCOztJQUUxQix1Q0FBZ0U7O0lBQ2hFLHdDQUFpRTs7SUFDakUsMENBQW1FOzs7Ozs7O0lBUW5FLHNDQUFvRTs7SUFHcEUsdUNBQW9DOztJQUNwQyx3Q0FBcUM7Ozs7O0lBRXJDLG1DQUFzRTs7Ozs7SUFDdEUseUNBQTJEOzs7OztJQUd6RCxxQ0FBK0I7Ozs7O0lBQy9CLG1DQUE0Qjs7Ozs7SUFDNUIsa0NBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBOR19WQUxJREFUT1JTLFxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuaW1wb3J0IHtkZWZhdWx0IGFzIFF1aWxsfSBmcm9tICdxdWlsbCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXF1aWxsLWVkaXRvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl1cIj48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksXG4gICAgbXVsdGk6IHRydWVcbiAgfSwge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmUXVpbGxFZGl0b3IpLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dLFxuICBzdHlsZVVybHM6IFsncXVpbGwtZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZRdWlsbEVkaXRvclxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgVmFsaWRhdG9yIHtcblxuICBxdWlsbEVkaXRvcjogYW55O1xuICBlZGl0b3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgZW1wdHlBcnJheTogYW55W10gPSBbXTtcbiAgY29udGVudDogYW55O1xuXG4gIGxpc3RlbkZ1bmM6IEZ1bmN0aW9uO1xuXG4gIHByZXZpZXdFbGVtRm9ybXVsYTogYW55O1xuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgZGF0ZUZvcm1hdHMgPSBbXG4gICAge1xuICAgICAgJ2xhYmVsJzogJ0p1bmUgMjNyZCAyMDE3LCAxMjozOToxMiBwbScsXG4gICAgICAndmFsdWUnOiAnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdNTU1NRG9ZWVlZaG1tc3NhJ1xuICAgIH0sIHtcbiAgICAgICdsYWJlbCc6ICdGcmlkYXknLFxuICAgICAgJ3ZhbHVlJzogJ2RkZGQnLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdkZGRkJ1xuICAgIH0sIHtcbiAgICAgICdsYWJlbCc6ICdKdW4gMjNyZCAxNycsXG4gICAgICAndmFsdWUnOiAnTU1NIERvIFlZJyxcbiAgICAgICd2YWxpZGF0b3InOiAnTU1NRG9ZWSdcbiAgICB9XTtcblxuXG4gIGZvbnRzID0gW1xuICAgIGZhbHNlLFxuICAgICdibGFja3InLFxuICAgICdibGFjay1pdGFsaWMnLFxuICAgICdib2xkJyxcbiAgICAnYm9sZC1jb25kZW5zZWQnLFxuICAgICdib2xkLWNvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdib2xkLWl0YWxpYycsXG4gICAgJ2NvbmRlbnNlZCcsXG4gICAgJ2NvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdpdGFsaWMnLFxuICAgICdsaWdodCcsXG4gICAgJ2xpZ2h0LWl0YWxpYycsXG4gICAgJ21lZGl1bScsXG4gICAgJ21lZGl1bS1pdGFsaWMnLFxuICAgICd0aGlucicsXG4gICAgJ3RoaW4taXRhbGljJ1xuICBdO1xuXG4gIGRlZmF1bHRNb2R1bGVzID0ge1xuICAgIGZvcm11bGE6IHRydWUsXG4gICAgdG9vbGJhcjogW1xuICAgICAgWydmb3JtdWxhJ10sXG4gICAgICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSwgICAgICAgIC8vIHRvZ2dsZWQgYnV0dG9uc1xuICAgICAgLy8gWydibG9ja3F1b3RlJywgJ2NvZGUtYmxvY2snXSxcblxuICAgICAgW3sgJ2hlYWRlcic6IDEgfSwgeyAnaGVhZGVyJzogMiB9XSwgICAgICAgICAgICAgICAvLyBjdXN0b20gYnV0dG9uIHZhbHVlc1xuICAgICAgW3sgJ2xpc3QnOiAnb3JkZXJlZCcgfSwgeyAnbGlzdCc6ICdidWxsZXQnIH1dLFxuICAgICAgW3sgJ3NjcmlwdCc6ICdzdWInIH0sIHsgJ3NjcmlwdCc6ICdzdXBlcicgfV0sICAgICAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAvLyBbeyAnaW5kZW50JzogJy0xJ30sIHsgJ2luZGVudCc6ICcrMScgfV0sICAgICAgICAgIC8vIG91dGRlbnQvaW5kZW50XG4gICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgIFt7ICdzaXplJzogWydzbWFsbCcsIGZhbHNlLCAnbGFyZ2UnLCAnaHVnZSddIH1dLCAgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICBbeyAnaGVhZGVyJzogWzEsIDIsIDMsIDQsIDUsIDYsIGZhbHNlXSB9XSxcblxuICAgICAgW3sgJ2NvbG9yJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCkgfSxcbiAgICAgIHsgJ2JhY2tncm91bmQnOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKSB9XSwgICAgICAgICAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICBbeyAnZm9udCc6IHRoaXMuZm9udHMgfV0sXG4gICAgICBbeyAnYWxpZ24nOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKSB9XSxcblxuICAgICAgWydjbGVhbiddLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgIC8vIFsnbGluaycsICdpbWFnZScsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgIF1cbiAgfTtcblxuICBmb250ID0gUXVpbGwuaW1wb3J0KCdmb3JtYXRzL2ZvbnQnKTtcblxuXG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vZHVsZXM6IE9iamVjdDtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1heExlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5MZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgZm9ybWF0czogc3RyaW5nW107XG4gIEBJbnB1dCgpIGluaXRIVE1MOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGVkaXRvckNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29udGVudENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAvKipcbiAgICogdGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrIG9uIGZvcm11bGEgYnV0dG9uIG9uIHF1aWxsIGVkaXRvciByb29sIGJhcsaSXG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGZvcm11bGFDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XG5cbiAgcHJpdmF0ZSBfZm9ybXVsYXM6IHsgZm9ybXVsYTogYW55LCB1bmxpc3RlbjogRnVuY3Rpb24gfCBudWxsIH1bXSA9IFtdO1xuICBwcml2YXRlIF9mb3JtdWxhVGV4dFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QgPSB0aGlzLmZvbnRzO1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QucHVzaCgncmVndWxhcicpO1xuXG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIgPVxuICAgICAgdGhpcy5fc2VydmljZS5nZXRGb3JtdWxhVG9IdG1sRXZlbnQoKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG5cbiAgICAgICAgICAvLyByZWZlcmVuY2UgaXMgZGVmaW5lZCBvbmx5IHdoZW4gdGhlIHVzZXIgd2FudCB0byBlZGl0IHRoZSBmb3JtdWxhXG4gICAgICAgICAgaWYgKGV2ZW50LnJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBldmVudC5yZWZlcmVuY2UuaW5uZXJIVE1MID0gZXZlbnQuZm9ybXVsYTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShldmVudC5yZWZlcmVuY2UsICdmb3JtdWxhJywgZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgICAgICBjb25zdCBlZnMgPSB0aGlzLl9mb3JtdWxhcy5maWx0ZXIoZiA9PiBmLmZvcm11bGEgPT09IGV2ZW50LnJlZmVyZW5jZSk7XG4gICAgICAgICAgICBsZXQgZm9ybXVsYUVudHJ5O1xuICAgICAgICAgICAgbGV0IHVubGlzdGVuO1xuICAgICAgICAgICAgaWYgKGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFFbnRyeSA9IGVmc1swXTtcbiAgICAgICAgICAgICAgdW5saXN0ZW4gPSBmb3JtdWxhRW50cnkudW5saXN0ZW47XG4gICAgICAgICAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9ybXVsYUVudHJ5ID0geyBmb3JtdWxhOiBldmVudC5yZWZlcmVuY2UsIHVubGlzdGVuOiBudWxsIH07XG4gICAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goZm9ybXVsYUVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm11bGFFbnRyeS51bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgZXZlbnQucmVmZXJlbmNlLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICdmb3JtdWxhJzogZXZlbnQuZm9ybXVsYSxcbiAgICAgICAgICAgICAgICAgICdyZWZlcmVuY2UnOiBldmVudC5yZWZlcmVuY2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcXVpbGxFZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGluaywgJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShsaW5rLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnZm9ybXVsYScsIHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSkpO1xuICAgICAgICAgICAgY29uc3QgbGlua0xhYmVsID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlVGV4dChldmVudC5mb3JtdWxhKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGxpbmssIGxpbmtMYWJlbCk7XG4gICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgcmVsYXRlZCBvbiB0aGUgY2xpY2sgZXZlbnQgb2YgdGhlIG5ldyBmb3JtdWxhXG4gICAgICAgICAgICBjb25zdCB1bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgbGluaywgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgJ2Zvcm11bGEnOiB0aGlzLmNoZWNrKGV2ZW50LmZvcm11bGEpLFxuICAgICAgICAgICAgICAgICAgJ3JlZmVyZW5jZSc6IGxpbmtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHF1aWxsRWRpdG9yLCBsaW5rKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goeyB1bmxpc3RlbiwgZm9ybXVsYTogbGluayB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgY2hlY2sodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5kYXRlRm9ybWF0cy5sZW5ndGggOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbGlkYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxzdHJpbmc+dmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgZnVuY3Rpb24gc2VhcmNoIGZvbXVsYXMgaW5zaWRlIHRoZSBpbml0IHRleHRcbiAgICogYW5kIGFsbG9jYXRlIHRoZSByZWxhdGVkIGxpc3RlbmVyIG9uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgc2V0SFRNTCgpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5pbml0SFRNTCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgdG9vbGJhckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl0nKTtcbiAgICBsZXQgbW9kdWxlczogYW55ID0gdGhpcy5tb2R1bGVzIHx8IHRoaXMuZGVmYXVsdE1vZHVsZXM7XG5cbiAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuXG4gICAgaWYgKHRvb2xiYXJFbGVtKSB7XG4gICAgICBtb2R1bGVzWyd0b29sYmFyJ10gPSB0b29sYmFyRWxlbTtcbiAgICAgIG1vZHVsZXNbJ2Zvcm11bGEnXSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJywgJzxkaXYgcXVpbGwtZWRpdG9yLWVsZW1lbnQ+PC9kaXY+J1xuICAgICk7XG5cbiAgICB0aGlzLmVkaXRvckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW3F1aWxsLWVkaXRvci1lbGVtZW50XScpO1xuXG4gICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbCh0aGlzLmVkaXRvckVsZW0sIHtcbiAgICAgIG1vZHVsZXM6IG1vZHVsZXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnSW5zZXJ0IHRleHQgaGVyZSAuLi4nLFxuICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHNcbiAgICB9KTtcblxuXG4gICAgdGhpcy5lZGl0b3JDcmVhdGVkLmVtaXQodGhpcy5xdWlsbEVkaXRvcik7XG4gICAgdGhpcy5zZXRIVE1MKCk7XG5cbiAgICAvLyBtYXJrIG1vZGVsIGFzIHRvdWNoZWQgaWYgZWRpdG9yIGxvc3QgZm9jdXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCdzZWxlY3Rpb24tY2hhbmdlJywgKHJhbmdlOiBhbnksIG9sZFJhbmdlOiBhbnksIHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQuZW1pdCh7XG4gICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbEVkaXRvcixcbiAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICBvbGRSYW5nZTogb2xkUmFuZ2UsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyYW5nZSkge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbW9kZWwgaWYgdGV4dCBjaGFuZ2VzXG4gICAgdGhpcy5xdWlsbEVkaXRvci5vbigndGV4dC1jaGFuZ2UnLCAoZGVsdGE6IGFueSwgb2xkRGVsdGE6IGFueSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCBodG1sOiBhbnkgPSB0aGlzLmVkaXRvckVsZW0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MO1xuICAgICAgY29uc3QgdGV4dCA9IHRoaXMucXVpbGxFZGl0b3IuZ2V0VGV4dCgpO1xuXG4gICAgICBpZiAoaHRtbCA9PT0gJzxwPjxicj48L3A+Jykge1xuICAgICAgICBodG1sID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGh0bWwpO1xuXG4gICAgICB0aGlzLmNvbnRlbnRDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsXG4gICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgb2xkRGVsdGE6IG9sZERlbHRhLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWZvcm11bGEnKTtcbiAgICB0aGlzLmxpc3RlbkZ1bmMgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWxlbSwgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQoKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICB3cml0ZVZhbHVlKGN1cnJlbnRWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY3VycmVudFZhbHVlO1xuXG4gICAgaWYgKHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PSB0aGlzLmluaXRIVE1MICYmICF0aGlzLl9pbml0KSB7XG4gICAgICAgICAgbGV0IGVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWVkaXRvcicpO1xuICAgICAgICAgIGVkaXRvci5pbm5lckhUTUwgPSB0aGlzLmluaXRIVE1MO1xuICAgICAgICAgIGxldCBhbGxGb3JtdWxhcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZm9ybXVsYV0nKTtcbiAgICAgICAgICBhbGxGb3JtdWxhcy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICBlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAnZm9ybXVsYSc6IHRoaXMuY2hlY2soZWxlbS5pbm5lclRleHQpLFxuICAgICAgICAgICAgICAgICAgJ3JlZmVyZW5jZSc6IGVsZW1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW0sICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaCh7IHVubGlzdGVuLCBmb3JtdWxhOiBlbGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5faW5pdCA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlICE9IHRoaXMuaW5pdEhUTUwpIHtcbiAgICAgICAgICB0aGlzLnF1aWxsRWRpdG9yLnBhc3RlSFRNTChjdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucXVpbGxFZGl0b3Iuc2V0VGV4dCgnJyk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKF9jOiBGb3JtQ29udHJvbCkge1xuICAgIGlmICghdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGVycjoge1xuICAgICAgbWluTGVuZ3RoRXJyb3I/OiB7IGdpdmVuOiBudW1iZXIsIG1pbkxlbmd0aDogbnVtYmVyIH07XG4gICAgICBtYXhMZW5ndGhFcnJvcj86IHsgZ2l2ZW46IG51bWJlciwgbWF4TGVuZ3RoOiBudW1iZXIgfTtcbiAgICB9ID0ge30sXG4gICAgICB2YWxpZCA9IHRydWU7XG5cbiAgICBjb25zdCB0ZXh0TGVuZ3RoID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCkudHJpbSgpLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgZXJyLm1pbkxlbmd0aEVycm9yID0ge1xuICAgICAgICBnaXZlbjogdGV4dExlbmd0aCxcbiAgICAgICAgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aFxuICAgICAgfTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8ICF0ZXh0TGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1heExlbmd0aCkge1xuICAgICAgZXJyLm1heExlbmd0aEVycm9yID0ge1xuICAgICAgICBnaXZlbjogdGV4dExlbmd0aCxcbiAgICAgICAgbWF4TGVuZ3RoOiB0aGlzLm1heExlbmd0aFxuICAgICAgfTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoIDw9IHRoaXMubWF4TGVuZ3RoICYmIHZhbGlkO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZCA/IG51bGwgOiBlcnI7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICBpZiAoY2hhbmdlc1sncmVhZE9ubHknXSAmJiB0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yLmVuYWJsZSghY2hhbmdlc1sncmVhZE9ubHknXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbW9kdWxlcyddICYmIHRoaXMucXVpbGxFZGl0b3IpIHtcblxuICAgICAgUXVpbGwucmVnaXN0ZXIodGhpcy5mb250LCB0cnVlKTtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IgPSBuZXcgUXVpbGwodGhpcy5lZGl0b3JFbGVtLCB7XG4gICAgICAgIG1vZHVsZXM6IGNoYW5nZXNbJ21vZHVsZXMnXVsnY3VycmVudFZhbHVlJ10sXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5IHx8IGZhbHNlLFxuICAgICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0c1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZm9ybXVsYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB1bmxpc3RlbiA9IHRoaXMuX2Zvcm11bGFzW2ldLnVubGlzdGVuO1xuICAgICAgaWYgKHVubGlzdGVuICE9IG51bGwpIHtcbiAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19