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
var AjfQuillEditor = /** @class */ (function () {
    function AjfQuillEditor(_elementRef, _renderer, _service) {
        var _this = this;
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
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this._formulas = [];
        this._formulaTextSub = Subscription.EMPTY;
        this.font.whitelist = this.fonts;
        this.font.whitelist.push('regular');
        this._formulaTextSub = this._service.getFormulaToHtmlEvent().subscribe(function (event) {
            // reference is defined only when the user want to edit the formula
            if (event.reference !== undefined) {
                event.reference.innerHTML = event.formula;
                _this._renderer.setAttribute(event.reference, 'formula', event.formula);
                var efs = _this._formulas.filter(function (f) { return f.formula === event.reference; });
                var formulaEntry = void 0;
                var unlisten = void 0;
                if (efs.length > 0) {
                    formulaEntry = efs[0];
                    unlisten = formulaEntry.unlisten;
                    if (unlisten != null) {
                        unlisten();
                    }
                }
                else {
                    formulaEntry = { formula: event.reference, unlisten: null };
                    _this._formulas.push(formulaEntry);
                }
                formulaEntry.unlisten = _this._renderer.listen(event.reference, 'click', function () {
                    var obj = { 'formula': event.formula, 'reference': event.reference };
                    _this.formulaClick.emit(obj);
                });
            }
            else {
                var quillEditor = _this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                var link_1 = _this._renderer.createElement('a');
                _this._renderer.setAttribute(link_1, 'href', 'javascript:void(0)');
                _this._renderer.setStyle(link_1, 'cursor', 'pointer');
                _this._renderer.setAttribute(link_1, 'formula', _this.check(event.formula));
                var linkLabel = _this._renderer.createText(event.formula);
                _this._renderer.appendChild(link_1, linkLabel);
                // add listener related on the click event of the new formula
                var unlisten = _this._renderer.listen(link_1, 'click', function (_) {
                    var obj = { 'formula': _this.check(event.formula), 'reference': link_1 };
                    _this.formulaClick.emit(obj);
                });
                _this._renderer.appendChild(quillEditor, link_1);
                _this._formulas.push({ unlisten: unlisten, formula: link_1 });
            }
        });
    }
    AjfQuillEditor.prototype.check = function (value) {
        for (var i = 0; i < this.dateFormats.length; i++) {
            if (this.dateFormats[i].value == value) {
                return this.dateFormats[i].validator;
            }
        }
        return value;
    };
    /**
     * this function search fomulas inside the init text
     * and allocate the related listener on click event
     *
     * @memberof QuillEditorComponent
     */
    AjfQuillEditor.prototype.setHTML = function () {
        this.writeValue(this.initHTML);
    };
    AjfQuillEditor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var toolbarElem = this._elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
        var modules = this.modules || this.defaultModules;
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
        this.quillEditor.on('selection-change', function (range, oldRange, source) {
            _this.selectionChanged.emit({ editor: _this.quillEditor, range: range, oldRange: oldRange, source: source });
            if (!range) {
                _this.onModelTouched();
            }
        });
        // update model if text changes
        this.quillEditor.on('text-change', function (delta, oldDelta, source) {
            var html = _this.editorElem.children[0].innerHTML;
            var text = _this.quillEditor.getText();
            if (html === '<p><br></p>') {
                html = null;
            }
            _this.onModelChange(html);
            _this.contentChanged.emit({
                editor: _this.quillEditor,
                html: html,
                text: text,
                delta: delta,
                oldDelta: oldDelta,
                source: source
            });
        });
        var elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
        this.listenFunc = this._renderer.listen(elem, 'click', function (_) {
            _this.formulaClick.emit();
        });
    };
    AjfQuillEditor.prototype.writeValue = function (currentValue) {
        var _this = this;
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                if (currentValue == this.initHTML && !this._init) {
                    var editor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
                    editor.innerHTML = this.initHTML;
                    var allFormulas = this._elementRef.nativeElement.querySelectorAll('[formula]');
                    allFormulas.forEach(function (elem) {
                        var unlisten = _this._renderer.listen(elem, 'click', function (_) {
                            var obj = { 'formula': _this.check(elem.innerText), 'reference': elem };
                            _this.formulaClick.emit(obj);
                        });
                        _this._renderer.setStyle(elem, 'cursor', 'pointer');
                        _this._formulas.push({ unlisten: unlisten, formula: elem });
                        _this._init = true;
                    });
                }
                else if (currentValue != this.initHTML) {
                    this.quillEditor.pasteHTML(currentValue);
                }
                return;
            }
            this.quillEditor.setText('');
        }
    };
    AjfQuillEditor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    AjfQuillEditor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    AjfQuillEditor.prototype.validate = function (_c) {
        if (!this.quillEditor) {
            return null;
        }
        var err = {}, valid = true;
        var textLength = this.quillEditor.getText().trim().length;
        if (this.minLength) {
            err.minLengthError = { given: textLength, minLength: this.minLength };
            valid = textLength >= this.minLength || !textLength;
        }
        if (this.maxLength) {
            err.maxLengthError = { given: textLength, maxLength: this.maxLength };
            valid = textLength <= this.maxLength && valid;
        }
        return valid ? null : err;
    };
    AjfQuillEditor.prototype.ngOnChanges = function (changes) {
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
    };
    AjfQuillEditor.prototype.ngOnDestroy = function () {
        for (var i = 0; i < this._formulas.length; i++) {
            var unlisten = this._formulas[i].unlisten;
            if (unlisten != null) {
                unlisten();
            }
        }
        this._formulaTextSub.unsubscribe();
    };
    AjfQuillEditor.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-quill-editor',
                    template: "\n    <ng-content select=\"[ajf-quill-editor-toolbar]\"></ng-content>\n  ",
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return AjfQuillEditor; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AjfQuillEditor; }), multi: true }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["ajf-quill-editor .ajf-ql-container .ajf-ql-editor{min-height:200px;width:500px !important;padding-bottom:50px}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfQuillEditor.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: AjfReportBuilderService }
    ]; };
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
}());
export { AjfQuillEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLGFBQWEsRUFDYixpQkFBaUIsRUFFbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUMsT0FBTyxJQUFJLEtBQUssRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBR2pFO0lBb0dFLHdCQUNZLFdBQXVCLEVBQVUsU0FBb0IsRUFDckQsUUFBaUM7UUFGN0MsaUJBNkNDO1FBNUNXLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNyRCxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQXJGN0MsZUFBVSxHQUFVLEVBQUUsQ0FBQztRQU1mLFVBQUssR0FBWSxLQUFLLENBQUM7UUFFL0IsZ0JBQVcsR0FBRztZQUNaO2dCQUNFLE9BQU8sRUFBRSw2QkFBNkI7Z0JBQ3RDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLFdBQVcsRUFBRSxrQkFBa0I7YUFDaEM7WUFDRCxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDO1lBQ3pELEVBQUMsT0FBTyxFQUFFLGFBQWEs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QVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO3FCQUNyRjtvQkFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkFwQ0MsVUFBVTtnQkFPVixTQUFTO2dCQWNILHVCQUF1Qjs7O3dCQTJFNUIsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2dDQUVMLE1BQU07aUNBQ04sTUFBTTttQ0FDTixNQUFNOytCQVFOLE1BQU07O0lBa09ULHFCQUFDO0NBQUEsQUE3VEQsSUE2VEM7U0FoVFksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgTkdfVkFMSURBVE9SUyxcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2RlZmF1bHQgYXMgUXVpbGx9IGZyb20gJ3F1aWxsJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcXVpbGwtZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmLXF1aWxsLWVkaXRvci10b29sYmFyXVwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksIG11bHRpOiB0cnVlfSxcbiAgICB7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmUXVpbGxFZGl0b3IpLCBtdWx0aTogdHJ1ZX1cbiAgXSxcbiAgc3R5bGVVcmxzOiBbJ3F1aWxsLWVkaXRvci5jc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQWpmUXVpbGxFZGl0b3IgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3Ige1xuICBxdWlsbEVkaXRvcjogYW55O1xuICBlZGl0b3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgZW1wdHlBcnJheTogYW55W10gPSBbXTtcbiAgY29udGVudDogYW55O1xuXG4gIGxpc3RlbkZ1bmM6IEZ1bmN0aW9uO1xuXG4gIHByZXZpZXdFbGVtRm9ybXVsYTogYW55O1xuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgZGF0ZUZvcm1hdHMgPSBbXG4gICAge1xuICAgICAgJ2xhYmVsJzogJ0p1bmUgMjNyZCAyMDE3LCAxMjozOToxMiBwbScsXG4gICAgICAndmFsdWUnOiAnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdNTU1NRG9ZWVlZaG1tc3NhJ1xuICAgIH0sXG4gICAgeydsYWJlbCc6ICdGcmlkYXknLCAndmFsdWUnOiAnZGRkZCcsICd2YWxpZGF0b3InOiAnZGRkZCd9LFxuICAgIHsnbGFiZWwnOiAnSnVuIDIzcmQgMTcnLCAndmFsdWUnOiAnTU1NIERvIFlZJywgJ3ZhbGlkYXRvcic6ICdNTU1Eb1lZJ31cbiAgXTtcblxuXG4gIGZvbnRzID0gW1xuICAgIGZhbHNlLCAnYmxhY2tyJywgJ2JsYWNrLWl0YWxpYycsICdib2xkJywgJ2JvbGQtY29uZGVuc2VkJywgJ2JvbGQtY29uZGVuc2VkLWl0YWxpYycsXG4gICAgJ2JvbGQtaXRhbGljJywgJ2NvbmRlbnNlZCcsICdjb25kZW5zZWQtaXRhbGljJywgJ2l0YWxpYycsICdsaWdodCcsICdsaWdodC1pdGFsaWMnLCAnbWVkaXVtJyxcbiAgICAnbWVkaXVtLWl0YWxpYycsICd0aGlucicsICd0aGluLWl0YWxpYydcbiAgXTtcblxuICBkZWZhdWx0TW9kdWxlcyA9IHtcbiAgICBmb3JtdWxhOiB0cnVlLFxuICAgIHRvb2xiYXI6XG4gICAgICAgIFtcbiAgICAgICAgICBbJ2Zvcm11bGEnXSwgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnc3RyaWtlJ10sICAvLyB0b2dnbGVkIGJ1dHRvbnNcbiAgICAgICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuXG4gICAgICAgICAgW3snaGVhZGVyJzogMX0sIHsnaGVhZGVyJzogMn1dLCAgLy8gY3VzdG9tIGJ1dHRvbiB2YWx1ZXNcbiAgICAgICAgICBbeydsaXN0JzogJ29yZGVyZWQnfSwgeydsaXN0JzogJ2J1bGxldCd9XSxcbiAgICAgICAgICBbeydzY3JpcHQnOiAnc3ViJ30sIHsnc2NyaXB0JzogJ3N1cGVyJ31dLCAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAgICAgLy8gW3sgJ2luZGVudCc6ICctMSd9LCB7ICdpbmRlbnQnOiAnKzEnIH1dLCAgICAgICAgICAvLyBvdXRkZW50L2luZGVudFxuICAgICAgICAgIC8vIFt7ICdkaXJlY3Rpb24nOiAncnRsJyB9XSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dCBkaXJlY3Rpb25cblxuICAgICAgICAgIFt7J3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ119XSwgIC8vIGN1c3RvbSBkcm9wZG93blxuICAgICAgICAgIFt7J2hlYWRlcic6IFsxLCAyLCAzLCA0LCA1LCA2LCBmYWxzZV19XSxcblxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHsnY29sb3InOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKX0sIHsnYmFja2dyb3VuZCc6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpfVxuICAgICAgICAgIF0sICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgICAgICBbeydmb250JzogdGhpcy5mb250c31dLCBbeydhbGlnbic6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpfV0sXG5cbiAgICAgICAgICBbJ2NsZWFuJ10sICAvLyByZW1vdmUgZm9ybWF0dGluZyBidXR0b25cblxuICAgICAgICAgIC8vIFsnbGluaycsICdpbWFnZScsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgICAgICBdXG4gIH07XG5cbiAgZm9udCA9IFF1aWxsLmltcG9ydCgnZm9ybWF0cy9mb250Jyk7XG5cblxuICBASW5wdXQoKSB0aGVtZTogc3RyaW5nO1xuICBASW5wdXQoKSBtb2R1bGVzOiBPYmplY3Q7XG4gIEBJbnB1dCgpIHJlYWRPbmx5OiBib29sZWFuO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBtYXhMZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgbWluTGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZvcm1hdHM6IHN0cmluZ1tdO1xuICBASW5wdXQoKSBpbml0SFRNTDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBlZGl0b3JDcmVhdGVkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbnRlbnRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgLyoqXG4gICAqIHRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBjbGljayBvbiBmb3JtdWxhIGJ1dHRvbiBvbiBxdWlsbCBlZGl0b3Igcm9vbCBiYXLGklxuICAgKlxuICAgKiBAbWVtYmVyb2YgUXVpbGxFZGl0b3JDb21wb25lbnRcbiAgICovXG4gIEBPdXRwdXQoKSBmb3JtdWxhQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF9mb3JtdWxhczoge2Zvcm11bGE6IGFueSwgdW5saXN0ZW46IEZ1bmN0aW9ufG51bGx9W10gPSBbXTtcbiAgcHJpdmF0ZSBfZm9ybXVsYVRleHRTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QgPSB0aGlzLmZvbnRzO1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QucHVzaCgncmVndWxhcicpO1xuXG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIgPSB0aGlzLl9zZXJ2aWNlLmdldEZvcm11bGFUb0h0bWxFdmVudCgpLnN1YnNjcmliZSgoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgLy8gcmVmZXJlbmNlIGlzIGRlZmluZWQgb25seSB3aGVuIHRoZSB1c2VyIHdhbnQgdG8gZWRpdCB0aGUgZm9ybXVsYVxuICAgICAgaWYgKGV2ZW50LnJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGV2ZW50LnJlZmVyZW5jZS5pbm5lckhUTUwgPSBldmVudC5mb3JtdWxhO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZXZlbnQucmVmZXJlbmNlLCAnZm9ybXVsYScsIGV2ZW50LmZvcm11bGEpO1xuICAgICAgICBjb25zdCBlZnMgPSB0aGlzLl9mb3JtdWxhcy5maWx0ZXIoZiA9PiBmLmZvcm11bGEgPT09IGV2ZW50LnJlZmVyZW5jZSk7XG4gICAgICAgIGxldCBmb3JtdWxhRW50cnk7XG4gICAgICAgIGxldCB1bmxpc3RlbjtcbiAgICAgICAgaWYgKGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9ybXVsYUVudHJ5ID0gZWZzWzBdO1xuICAgICAgICAgIHVubGlzdGVuID0gZm9ybXVsYUVudHJ5LnVubGlzdGVuO1xuICAgICAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JtdWxhRW50cnkgPSB7Zm9ybXVsYTogZXZlbnQucmVmZXJlbmNlLCB1bmxpc3RlbjogbnVsbH07XG4gICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaChmb3JtdWxhRW50cnkpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm11bGFFbnRyeS51bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihldmVudC5yZWZlcmVuY2UsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBsZXQgb2JqID0geydmb3JtdWxhJzogZXZlbnQuZm9ybXVsYSwgJ3JlZmVyZW5jZSc6IGV2ZW50LnJlZmVyZW5jZX07XG4gICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHF1aWxsRWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZWRpdG9yJyk7XG4gICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCknKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUobGluaywgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnZm9ybXVsYScsIHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSkpO1xuICAgICAgICBjb25zdCBsaW5rTGFiZWwgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGV2ZW50LmZvcm11bGEpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChsaW5rLCBsaW5rTGFiZWwpO1xuICAgICAgICAvLyBhZGQgbGlzdGVuZXIgcmVsYXRlZCBvbiB0aGUgY2xpY2sgZXZlbnQgb2YgdGhlIG5ldyBmb3JtdWxhXG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKGxpbmssICdjbGljaycsIChfKSA9PiB7XG4gICAgICAgICAgbGV0IG9iaiA9IHsnZm9ybXVsYSc6IHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSksICdyZWZlcmVuY2UnOiBsaW5rfTtcbiAgICAgICAgICB0aGlzLmZvcm11bGFDbGljay5lbWl0KG9iaik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChxdWlsbEVkaXRvciwgbGluayk7XG4gICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goe3VubGlzdGVuLCBmb3JtdWxhOiBsaW5rfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVjayh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0ZUZvcm1hdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbGlkYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxzdHJpbmc+dmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgZnVuY3Rpb24gc2VhcmNoIGZvbXVsYXMgaW5zaWRlIHRoZSBpbml0IHRleHRcbiAgICogYW5kIGFsbG9jYXRlIHRoZSByZWxhdGVkIGxpc3RlbmVyIG9uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgc2V0SFRNTCgpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5pbml0SFRNTCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgdG9vbGJhckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl0nKTtcbiAgICBsZXQgbW9kdWxlczogYW55ID0gdGhpcy5tb2R1bGVzIHx8IHRoaXMuZGVmYXVsdE1vZHVsZXM7XG5cbiAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuXG4gICAgaWYgKHRvb2xiYXJFbGVtKSB7XG4gICAgICBtb2R1bGVzWyd0b29sYmFyJ10gPSB0b29sYmFyRWxlbTtcbiAgICAgIG1vZHVsZXNbJ2Zvcm11bGEnXSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICdiZWZvcmVlbmQnLCAnPGRpdiBxdWlsbC1lZGl0b3ItZWxlbWVudD48L2Rpdj4nKTtcblxuICAgIHRoaXMuZWRpdG9yRWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcXVpbGwtZWRpdG9yLWVsZW1lbnRdJyk7XG5cbiAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKHRoaXMuZWRpdG9yRWxlbSwge1xuICAgICAgbW9kdWxlczogbW9kdWxlcyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSB8fCBmYWxzZSxcbiAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0c1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLmVkaXRvckNyZWF0ZWQuZW1pdCh0aGlzLnF1aWxsRWRpdG9yKTtcbiAgICB0aGlzLnNldEhUTUwoKTtcblxuICAgIC8vIG1hcmsgbW9kZWwgYXMgdG91Y2hlZCBpZiBlZGl0b3IgbG9zdCBmb2N1c1xuICAgIHRoaXMucXVpbGxFZGl0b3Iub24oJ3NlbGVjdGlvbi1jaGFuZ2UnLCAocmFuZ2U6IGFueSwgb2xkUmFuZ2U6IGFueSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KFxuICAgICAgICAgIHtlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsIHJhbmdlOiByYW5nZSwgb2xkUmFuZ2U6IG9sZFJhbmdlLCBzb3VyY2U6IHNvdXJjZX0pO1xuXG4gICAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBtb2RlbCBpZiB0ZXh0IGNoYW5nZXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCd0ZXh0LWNoYW5nZScsIChkZWx0YTogYW55LCBvbGREZWx0YTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGh0bWw6IGFueSA9IHRoaXMuZWRpdG9yRWxlbS5jaGlsZHJlblswXS5pbm5lckhUTUw7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCk7XG5cbiAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nKSB7XG4gICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoaHRtbCk7XG5cbiAgICAgIHRoaXMuY29udGVudENoYW5nZWQuZW1pdCh7XG4gICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbEVkaXRvcixcbiAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICBvbGREZWx0YTogb2xkRGVsdGEsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZm9ybXVsYScpO1xuICAgIHRoaXMubGlzdGVuRnVuYyA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgd3JpdGVWYWx1ZShjdXJyZW50VmFsdWU6IGFueSkge1xuICAgIHRoaXMuY29udGVudCA9IGN1cnJlbnRWYWx1ZTtcblxuICAgIGlmICh0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT0gdGhpcy5pbml0SFRNTCAmJiAhdGhpcy5faW5pdCkge1xuICAgICAgICAgIGxldCBlZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgICBlZGl0b3IuaW5uZXJIVE1MID0gdGhpcy5pbml0SFRNTDtcbiAgICAgICAgICBsZXQgYWxsRm9ybXVsYXMgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2Zvcm11bGFdJyk7XG4gICAgICAgICAgYWxsRm9ybXVsYXMuZm9yRWFjaCgoZWxlbTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgICAgICAgICBsZXQgb2JqID0geydmb3JtdWxhJzogdGhpcy5jaGVjayhlbGVtLmlubmVyVGV4dCksICdyZWZlcmVuY2UnOiBlbGVtfTtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goe3VubGlzdGVuLCBmb3JtdWxhOiBlbGVtfSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgIT0gdGhpcy5pbml0SFRNTCkge1xuICAgICAgICAgIHRoaXMucXVpbGxFZGl0b3IucGFzdGVIVE1MKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5xdWlsbEVkaXRvci5zZXRUZXh0KCcnKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoX2M6IEZvcm1Db250cm9sKSB7XG4gICAgaWYgKCF0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZXJyOiB7XG4gICAgICBtaW5MZW5ndGhFcnJvcj86IHtnaXZlbjogbnVtYmVyLCBtaW5MZW5ndGg6IG51bWJlcn07XG4gICAgICBtYXhMZW5ndGhFcnJvcj86IHtnaXZlbjogbnVtYmVyLCBtYXhMZW5ndGg6IG51bWJlcn07XG4gICAgfSA9IHt9LFxuICB2YWxpZCA9IHRydWU7XG5cbiAgICBjb25zdCB0ZXh0TGVuZ3RoID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCkudHJpbSgpLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgZXJyLm1pbkxlbmd0aEVycm9yID0ge2dpdmVuOiB0ZXh0TGVuZ3RoLCBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RofTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8ICF0ZXh0TGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1heExlbmd0aCkge1xuICAgICAgZXJyLm1heExlbmd0aEVycm9yID0ge2dpdmVuOiB0ZXh0TGVuZ3RoLCBtYXhMZW5ndGg6IHRoaXMubWF4TGVuZ3RofTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoIDw9IHRoaXMubWF4TGVuZ3RoICYmIHZhbGlkO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZCA/IG51bGwgOiBlcnI7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3JlYWRPbmx5J10gJiYgdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgdGhpcy5xdWlsbEVkaXRvci5lbmFibGUoIWNoYW5nZXNbJ3JlYWRPbmx5J10uY3VycmVudFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ21vZHVsZXMnXSAmJiB0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuICAgICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbCh0aGlzLmVkaXRvckVsZW0sIHtcbiAgICAgICAgbW9kdWxlczogY2hhbmdlc1snbW9kdWxlcyddWydjdXJyZW50VmFsdWUnXSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJ0luc2VydCB0ZXh0IGhlcmUgLi4uJyxcbiAgICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9mb3JtdWxhcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHVubGlzdGVuID0gdGhpcy5fZm9ybXVsYXNbaV0udW5saXN0ZW47XG4gICAgICBpZiAodW5saXN0ZW4gIT0gbnVsbCkge1xuICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9mb3JtdWxhVGV4dFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=