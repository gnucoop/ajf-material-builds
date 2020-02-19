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
         * @memberof QuillEditorComponent
         */
        this.formulaClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this._formulas = [];
        this._formulaTextSub = Subscription.EMPTY;
        this.font.whitelist = this.fonts;
        this.font.whitelist.push('regular');
        this._formulaTextSub =
            this._service.getFormulaToHtmlEvent()
                .subscribe(function (event) {
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
                        var obj = {
                            'formula': event.formula,
                            'reference': event.reference
                        };
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
                        var obj = {
                            'formula': _this.check(event.formula),
                            'reference': link_1
                        };
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
            _this.selectionChanged.emit({
                editor: _this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source
            });
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
                            var obj = {
                                'formula': _this.check(elem.innerText),
                                'reference': elem
                            };
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
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return AjfQuillEditor; }),
                            multi: true
                        }, {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(function () { return AjfQuillEditor; }),
                            multi: true
                        }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixhQUFhLEVBSWQsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxPQUFPLElBQUksS0FBSyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBR3ZDO0lBNEhFLHdCQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLFFBQWlDO1FBSDNDLGlCQTJEQztRQTFEUyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBeEczQyxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBTWYsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUUvQixnQkFBVyxHQUFHO1lBQ1o7Z0JBQ0UsT0FBTyxFQUFFLDZCQUE2QjtnQkFDdEMsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsV0FBVyxFQUFFLGtCQUFrQjthQUNoQyxFQUFFO2dCQUNELE9BQU8sRUFBRSxRQUFRO2dCQUNqQixPQUFPLEVBQUUsTUFBTTtnQkFDZixXQUFXLEVBQUUsTUFBTTthQUNwQixFQUFFO2dCQUNELE9BQU8sRUFBRSxhQUFhO2dCQUN0QixPQUFPLEVBQUUsV0FBVztnQkFDcEIsV0FBVyxFQUFFLFNBQVM7YUFDdkI7U0FBQyxDQUFDO1FBR0wsVUFBSyxHQUFHO1lBQ04sS0FBSztZQUNMLFFBQVE7WUFDUixjQUFjO1lBQ2QsTUFBTTtZQUNOLGdCQUFnQjtZQUNoQix1QkFBdUI7WUFDdkIsYUFBYTtZQUNiLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsUUFBUTtZQUNSLE9BQU87WUFDUCxjQUFjO1lBQ2QsUUFBUTtZQUNSLGVBQWU7WUFDZixPQUFPO1lBQ1AsYUFBYTtTQUNkLENBQUM7UUFFRixtQkFBYyxHQUFHO1lBQ2YsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUU7Z0JBQ1AsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUM7Z0JBQ3pDLGdDQUFnQztnQkFFaEMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDbEMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQztnQkFDN0MsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQztnQkFDNUMsc0VBQXNFO2dCQUN0RSxzRUFBc0U7Z0JBRXRFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUMvQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFFekMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNyQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQzFDLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN4QixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFFdEMsQ0FBQyxPQUFPLENBQUM7YUFHVjtTQUNGLENBQUM7UUFFRixTQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQVkxQixrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbkU7Ozs7V0FJRztRQUNPLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFHcEUsa0JBQWEsR0FBYSxjQUFRLENBQUMsQ0FBQztRQUNwQyxtQkFBYyxHQUFhLGNBQVEsQ0FBQyxDQUFDO1FBRTdCLGNBQVMsR0FBa0QsRUFBRSxDQUFDO1FBQzlELG9CQUFlLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFNekQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLGVBQWU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtpQkFDbEMsU0FBUyxDQUFDLFVBQUMsS0FBVTtnQkFFcEIsbUVBQW1FO2dCQUNuRSxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNqQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUMxQyxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3ZFLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsU0FBUyxFQUE3QixDQUE2QixDQUFDLENBQUM7b0JBQ3RFLElBQUksWUFBWSxTQUFBLENBQUM7b0JBQ2pCLElBQUksUUFBUSxTQUFBLENBQUM7b0JBQ2IsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDbEIsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEIsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7d0JBQ2pDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTs0QkFDcEIsUUFBUSxFQUFFLENBQUM7eUJBQ1o7cUJBQ0Y7eUJBQU07d0JBQ0wsWUFBWSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO3dCQUM1RCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDbkM7b0JBQ0QsWUFBWSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDM0MsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUU7d0JBQ3hCLElBQUksR0FBRyxHQUFHOzRCQUNSLFNBQVMsRUFBRSxLQUFLLENBQUMsT0FBTzs0QkFDeEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxTQUFTO3lCQUM3QixDQUFDO3dCQUNGLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQ0YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDbkYsSUFBTSxNQUFJLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9DLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE1BQUksRUFBRSxNQUFNLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDbkQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzNELEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQUksRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDNUMsNkRBQTZEO29CQUM3RCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDcEMsTUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFDLENBQUM7d0JBQ2YsSUFBSSxHQUFHLEdBQUc7NEJBQ1IsU0FBUyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzs0QkFDcEMsV0FBVyxFQUFFLE1BQUk7eUJBQ2xCLENBQUM7d0JBQ0YsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLENBQUMsQ0FDRixDQUFDO29CQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxNQUFJLENBQUMsQ0FBQztvQkFDOUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxPQUFPLEVBQUUsTUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDbEQ7WUFDSCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sS0FBYTtRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUU7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDdEM7U0FDRjtRQUNELE9BQWUsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILGdDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0NBQWUsR0FBZjtRQUFBLGlCQXFFQztRQXBFQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMvRixJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFdkQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksV0FBVyxFQUFFO1lBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUNqQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQy9DLFdBQVcsRUFBRSxrQ0FBa0MsQ0FDaEQsQ0FBQztRQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFekYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzVDLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLHNCQUFzQjtZQUN2RCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLO1lBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU07WUFDM0IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZiw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFVLEVBQUUsUUFBYSxFQUFFLE1BQWM7WUFDaEYsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztnQkFDekIsTUFBTSxFQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUN4QixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsTUFBTSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxVQUFDLEtBQVUsRUFBRSxRQUFhLEVBQUUsTUFBYztZQUMzRSxJQUFJLElBQUksR0FBUSxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDdEQsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV4QyxJQUFJLElBQUksS0FBSyxhQUFhLEVBQUU7Z0JBQzFCLElBQUksR0FBRyxJQUFJLENBQUM7YUFDYjtZQUVELEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3ZCLE1BQU0sRUFBRSxLQUFJLENBQUMsV0FBVztnQkFDeEIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBQyxDQUFDO1lBQ3ZELEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFM0IsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLFlBQWlCO1FBQTVCLGlCQThCQztRQTdCQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNoRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDNUUsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0UsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7d0JBQzVCLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUNwQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQUMsQ0FBQzs0QkFDZixJQUFJLEdBQUcsR0FBRztnQ0FDUixTQUFTLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUNyQyxXQUFXLEVBQUUsSUFBSTs2QkFDbEIsQ0FBQzs0QkFDRixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQyxDQUNGLENBQUM7d0JBQ0YsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDbkQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDakQsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ3BCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUMxQztnQkFDRCxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEIsVUFBaUIsRUFBWTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLEVBQVk7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxFQUFlO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLEdBQUcsR0FHSCxFQUFFLEVBQ0osS0FBSyxHQUFHLElBQUksQ0FBQztRQUVmLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixHQUFHLENBQUMsY0FBYyxHQUFHO2dCQUNuQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzFCLENBQUM7WUFFRixLQUFLLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDckQ7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsR0FBRyxDQUFDLGNBQWMsR0FBRztnQkFDbkIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzthQUMxQixDQUFDO1lBRUYsS0FBSyxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztTQUMvQztRQUVELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM1QixDQUFDO0lBRUQsb0NBQVcsR0FBWCxVQUFZLE9BQXNCO1FBRWhDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBRTFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQzVDLE9BQU8sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDO2dCQUMzQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxzQkFBc0I7Z0JBQ3ZELFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUs7Z0JBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU07Z0JBQzNCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckQ7SUFDSCxDQUFDO0lBQ0Qsb0NBQVcsR0FBWDtRQUNFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BCLFFBQVEsRUFBRSxDQUFDO2FBQ1o7U0FDRjtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7Z0JBdFhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsMkVBRVQ7b0JBQ0QsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsQ0FBQzs0QkFDN0MsS0FBSyxFQUFFLElBQUk7eUJBQ1osRUFBRTs0QkFDRCxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsQ0FBQzs0QkFDN0MsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQztvQkFFRixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkE1Q0MsVUFBVTtnQkFFVixTQUFTO2dCQW9CSCx1QkFBdUI7Ozt3QkFxRzVCLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FFTCxNQUFNO2lDQUNOLE1BQU07bUNBQ04sTUFBTTsrQkFRTixNQUFNOztJQW9RVCxxQkFBQztDQUFBLEFBdlhELElBdVhDO1NBcldZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIE5HX1ZBTElEQVRPUlMsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBGb3JtQ29udHJvbCxcbiAgVmFsaWRhdG9yXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlfSBmcm9tICcuL3JlcG9ydC1idWlsZGVyLXNlcnZpY2UnO1xuXG5pbXBvcnQge2RlZmF1bHQgYXMgUXVpbGx9IGZyb20gJ3F1aWxsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcXVpbGwtZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmLXF1aWxsLWVkaXRvci10b29sYmFyXVwiPjwvbmctY29udGVudD5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZlF1aWxsRWRpdG9yKSxcbiAgICBtdWx0aTogdHJ1ZVxuICB9LCB7XG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksXG4gICAgbXVsdGk6IHRydWVcbiAgfV0sXG4gIHN0eWxlVXJsczogWydxdWlsbC1lZGl0b3IuY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFqZlF1aWxsRWRpdG9yXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBWYWxpZGF0b3Ige1xuXG4gIHF1aWxsRWRpdG9yOiBhbnk7XG4gIGVkaXRvckVsZW06IEhUTUxFbGVtZW50O1xuICBlbXB0eUFycmF5OiBhbnlbXSA9IFtdO1xuICBjb250ZW50OiBhbnk7XG5cbiAgbGlzdGVuRnVuYzogRnVuY3Rpb247XG5cbiAgcHJldmlld0VsZW1Gb3JtdWxhOiBhbnk7XG4gIHByaXZhdGUgX2luaXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBkYXRlRm9ybWF0cyA9IFtcbiAgICB7XG4gICAgICAnbGFiZWwnOiAnSnVuZSAyM3JkIDIwMTcsIDEyOjM5OjEyIHBtJyxcbiAgICAgICd2YWx1ZSc6ICdNTU1NIERvIFlZWVksIGg6bW06c3MgYScsXG4gICAgICAndmFsaWRhdG9yJzogJ01NTU1Eb1lZWVlobW1zc2EnXG4gICAgfSwge1xuICAgICAgJ2xhYmVsJzogJ0ZyaWRheScsXG4gICAgICAndmFsdWUnOiAnZGRkZCcsXG4gICAgICAndmFsaWRhdG9yJzogJ2RkZGQnXG4gICAgfSwge1xuICAgICAgJ2xhYmVsJzogJ0p1biAyM3JkIDE3JyxcbiAgICAgICd2YWx1ZSc6ICdNTU0gRG8gWVknLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdNTU1Eb1lZJ1xuICAgIH1dO1xuXG5cbiAgZm9udHMgPSBbXG4gICAgZmFsc2UsXG4gICAgJ2JsYWNrcicsXG4gICAgJ2JsYWNrLWl0YWxpYycsXG4gICAgJ2JvbGQnLFxuICAgICdib2xkLWNvbmRlbnNlZCcsXG4gICAgJ2JvbGQtY29uZGVuc2VkLWl0YWxpYycsXG4gICAgJ2JvbGQtaXRhbGljJyxcbiAgICAnY29uZGVuc2VkJyxcbiAgICAnY29uZGVuc2VkLWl0YWxpYycsXG4gICAgJ2l0YWxpYycsXG4gICAgJ2xpZ2h0JyxcbiAgICAnbGlnaHQtaXRhbGljJyxcbiAgICAnbWVkaXVtJyxcbiAgICAnbWVkaXVtLWl0YWxpYycsXG4gICAgJ3RoaW5yJyxcbiAgICAndGhpbi1pdGFsaWMnXG4gIF07XG5cbiAgZGVmYXVsdE1vZHVsZXMgPSB7XG4gICAgZm9ybXVsYTogdHJ1ZSxcbiAgICB0b29sYmFyOiBbXG4gICAgICBbJ2Zvcm11bGEnXSxcbiAgICAgIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ3N0cmlrZSddLCAgICAgICAgLy8gdG9nZ2xlZCBidXR0b25zXG4gICAgICAvLyBbJ2Jsb2NrcXVvdGUnLCAnY29kZS1ibG9jayddLFxuXG4gICAgICBbeyAnaGVhZGVyJzogMSB9LCB7ICdoZWFkZXInOiAyIH1dLCAgICAgICAgICAgICAgIC8vIGN1c3RvbSBidXR0b24gdmFsdWVzXG4gICAgICBbeyAnbGlzdCc6ICdvcmRlcmVkJyB9LCB7ICdsaXN0JzogJ2J1bGxldCcgfV0sXG4gICAgICBbeyAnc2NyaXB0JzogJ3N1YicgfSwgeyAnc2NyaXB0JzogJ3N1cGVyJyB9XSwgICAgICAvLyBzdXBlcnNjcmlwdC9zdWJzY3JpcHRcbiAgICAgIC8vIFt7ICdpbmRlbnQnOiAnLTEnfSwgeyAnaW5kZW50JzogJysxJyB9XSwgICAgICAgICAgLy8gb3V0ZGVudC9pbmRlbnRcbiAgICAgIC8vIFt7ICdkaXJlY3Rpb24nOiAncnRsJyB9XSwgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGV4dCBkaXJlY3Rpb25cblxuICAgICAgW3sgJ3NpemUnOiBbJ3NtYWxsJywgZmFsc2UsICdsYXJnZScsICdodWdlJ10gfV0sICAvLyBjdXN0b20gZHJvcGRvd25cbiAgICAgIFt7ICdoZWFkZXInOiBbMSwgMiwgMywgNCwgNSwgNiwgZmFsc2VdIH1dLFxuXG4gICAgICBbeyAnY29sb3InOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKSB9LFxuICAgICAgeyAnYmFja2dyb3VuZCc6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpIH1dLCAgICAgICAgICAvLyBkcm9wZG93biB3aXRoIGRlZmF1bHRzIGZyb20gdGhlbWVcbiAgICAgIFt7ICdmb250JzogdGhpcy5mb250cyB9XSxcbiAgICAgIFt7ICdhbGlnbic6IHRoaXMuZW1wdHlBcnJheS5zbGljZSgpIH1dLFxuXG4gICAgICBbJ2NsZWFuJ10sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgZm9ybWF0dGluZyBidXR0b25cblxuICAgICAgLy8gWydsaW5rJywgJ2ltYWdlJywgJ3ZpZGVvJ10gICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluayBhbmQgaW1hZ2UsIHZpZGVvXG4gICAgXVxuICB9O1xuXG4gIGZvbnQgPSBRdWlsbC5pbXBvcnQoJ2Zvcm1hdHMvZm9udCcpO1xuXG5cbiAgQElucHV0KCkgdGhlbWU6IHN0cmluZztcbiAgQElucHV0KCkgbW9kdWxlczogT2JqZWN0O1xuICBASW5wdXQoKSByZWFkT25seTogYm9vbGVhbjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgbWF4TGVuZ3RoOiBudW1iZXI7XG4gIEBJbnB1dCgpIG1pbkxlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBmb3JtYXRzOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgaW5pdEhUTUw6IHN0cmluZztcblxuICBAT3V0cHV0KCkgZWRpdG9yQ3JlYXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb250ZW50Q2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuXG4gIC8qKlxuICAgKiB0aGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgY2xpY2sgb24gZm9ybXVsYSBidXR0b24gb24gcXVpbGwgZWRpdG9yIHJvb2wgYmFyxpJcbiAgICpcbiAgICogQG1lbWJlcm9mIFF1aWxsRWRpdG9yQ29tcG9uZW50XG4gICAqL1xuICBAT3V0cHV0KCkgZm9ybXVsYUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG5cbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7IH07XG4gIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICBwcml2YXRlIF9mb3JtdWxhczogeyBmb3JtdWxhOiBhbnksIHVubGlzdGVuOiBGdW5jdGlvbiB8IG51bGwgfVtdID0gW107XG4gIHByaXZhdGUgX2Zvcm11bGFUZXh0U3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEFqZlJlcG9ydEJ1aWxkZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5mb250LndoaXRlbGlzdCA9IHRoaXMuZm9udHM7XG4gICAgdGhpcy5mb250LndoaXRlbGlzdC5wdXNoKCdyZWd1bGFyJyk7XG5cbiAgICB0aGlzLl9mb3JtdWxhVGV4dFN1YiA9XG4gICAgICB0aGlzLl9zZXJ2aWNlLmdldEZvcm11bGFUb0h0bWxFdmVudCgpXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBhbnkpID0+IHtcblxuICAgICAgICAgIC8vIHJlZmVyZW5jZSBpcyBkZWZpbmVkIG9ubHkgd2hlbiB0aGUgdXNlciB3YW50IHRvIGVkaXQgdGhlIGZvcm11bGFcbiAgICAgICAgICBpZiAoZXZlbnQucmVmZXJlbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGV2ZW50LnJlZmVyZW5jZS5pbm5lckhUTUwgPSBldmVudC5mb3JtdWxhO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGV2ZW50LnJlZmVyZW5jZSwgJ2Zvcm11bGEnLCBldmVudC5mb3JtdWxhKTtcbiAgICAgICAgICAgIGNvbnN0IGVmcyA9IHRoaXMuX2Zvcm11bGFzLmZpbHRlcihmID0+IGYuZm9ybXVsYSA9PT0gZXZlbnQucmVmZXJlbmNlKTtcbiAgICAgICAgICAgIGxldCBmb3JtdWxhRW50cnk7XG4gICAgICAgICAgICBsZXQgdW5saXN0ZW47XG4gICAgICAgICAgICBpZiAoZWZzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgZm9ybXVsYUVudHJ5ID0gZWZzWzBdO1xuICAgICAgICAgICAgICB1bmxpc3RlbiA9IGZvcm11bGFFbnRyeS51bmxpc3RlbjtcbiAgICAgICAgICAgICAgaWYgKHVubGlzdGVuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3JtdWxhRW50cnkgPSB7IGZvcm11bGE6IGV2ZW50LnJlZmVyZW5jZSwgdW5saXN0ZW46IG51bGwgfTtcbiAgICAgICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaChmb3JtdWxhRW50cnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybXVsYUVudHJ5LnVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICBldmVudC5yZWZlcmVuY2UsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgJ2Zvcm11bGEnOiBldmVudC5mb3JtdWxhLFxuICAgICAgICAgICAgICAgICAgJ3JlZmVyZW5jZSc6IGV2ZW50LnJlZmVyZW5jZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBxdWlsbEVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWVkaXRvcicpO1xuICAgICAgICAgICAgY29uc3QgbGluayA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnaHJlZicsICdqYXZhc2NyaXB0OnZvaWQoMCknKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGxpbmssICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGxpbmssICdmb3JtdWxhJywgdGhpcy5jaGVjayhldmVudC5mb3JtdWxhKSk7XG4gICAgICAgICAgICBjb25zdCBsaW5rTGFiZWwgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGV2ZW50LmZvcm11bGEpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQobGluaywgbGlua0xhYmVsKTtcbiAgICAgICAgICAgIC8vIGFkZCBsaXN0ZW5lciByZWxhdGVkIG9uIHRoZSBjbGljayBldmVudCBvZiB0aGUgbmV3IGZvcm11bGFcbiAgICAgICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICBsaW5rLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAnZm9ybXVsYSc6IHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSksXG4gICAgICAgICAgICAgICAgICAncmVmZXJlbmNlJzogbGlua1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQocXVpbGxFZGl0b3IsIGxpbmspO1xuICAgICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaCh7IHVubGlzdGVuLCBmb3JtdWxhOiBsaW5rIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBjaGVjayh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLmRhdGVGb3JtYXRzLmxlbmd0aCA7IGkrKykge1xuICAgICAgaWYgKHRoaXMuZGF0ZUZvcm1hdHNbaV0udmFsdWUgPT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHNbaV0udmFsaWRhdG9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gPHN0cmluZz52YWx1ZTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBmdW5jdGlvbiBzZWFyY2ggZm9tdWxhcyBpbnNpZGUgdGhlIGluaXQgdGV4dFxuICAgKiBhbmQgYWxsb2NhdGUgdGhlIHJlbGF0ZWQgbGlzdGVuZXIgb24gY2xpY2sgZXZlbnRcbiAgICpcbiAgICogQG1lbWJlcm9mIFF1aWxsRWRpdG9yQ29tcG9uZW50XG4gICAqL1xuICBzZXRIVE1MKCkge1xuICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLmluaXRIVE1MKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCB0b29sYmFyRWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbYWpmLXF1aWxsLWVkaXRvci10b29sYmFyXScpO1xuICAgIGxldCBtb2R1bGVzOiBhbnkgPSB0aGlzLm1vZHVsZXMgfHwgdGhpcy5kZWZhdWx0TW9kdWxlcztcblxuICAgIFF1aWxsLnJlZ2lzdGVyKHRoaXMuZm9udCwgdHJ1ZSk7XG5cbiAgICBpZiAodG9vbGJhckVsZW0pIHtcbiAgICAgIG1vZHVsZXNbJ3Rvb2xiYXInXSA9IHRvb2xiYXJFbGVtO1xuICAgICAgbW9kdWxlc1snZm9ybXVsYSddID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICdiZWZvcmVlbmQnLCAnPGRpdiBxdWlsbC1lZGl0b3ItZWxlbWVudD48L2Rpdj4nXG4gICAgKTtcblxuICAgIHRoaXMuZWRpdG9yRWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdbcXVpbGwtZWRpdG9yLWVsZW1lbnRdJyk7XG5cbiAgICB0aGlzLnF1aWxsRWRpdG9yID0gbmV3IFF1aWxsKHRoaXMuZWRpdG9yRWxlbSwge1xuICAgICAgbW9kdWxlczogbW9kdWxlcyxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICByZWFkT25seTogdGhpcy5yZWFkT25seSB8fCBmYWxzZSxcbiAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0c1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLmVkaXRvckNyZWF0ZWQuZW1pdCh0aGlzLnF1aWxsRWRpdG9yKTtcbiAgICB0aGlzLnNldEhUTUwoKTtcblxuICAgIC8vIG1hcmsgbW9kZWwgYXMgdG91Y2hlZCBpZiBlZGl0b3IgbG9zdCBmb2N1c1xuICAgIHRoaXMucXVpbGxFZGl0b3Iub24oJ3NlbGVjdGlvbi1jaGFuZ2UnLCAocmFuZ2U6IGFueSwgb2xkUmFuZ2U6IGFueSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgZWRpdG9yOiB0aGlzLnF1aWxsRWRpdG9yLFxuICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgIG9sZFJhbmdlOiBvbGRSYW5nZSxcbiAgICAgICAgc291cmNlOiBzb3VyY2VcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBtb2RlbCBpZiB0ZXh0IGNoYW5nZXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCd0ZXh0LWNoYW5nZScsIChkZWx0YTogYW55LCBvbGREZWx0YTogYW55LCBzb3VyY2U6IHN0cmluZykgPT4ge1xuICAgICAgbGV0IGh0bWw6IGFueSA9IHRoaXMuZWRpdG9yRWxlbS5jaGlsZHJlblswXS5pbm5lckhUTUw7XG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCk7XG5cbiAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nKSB7XG4gICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UoaHRtbCk7XG5cbiAgICAgIHRoaXMuY29udGVudENoYW5nZWQuZW1pdCh7XG4gICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbEVkaXRvcixcbiAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICBvbGREZWx0YTogb2xkRGVsdGEsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZm9ybXVsYScpO1xuICAgIHRoaXMubGlzdGVuRnVuYyA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdCgpO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHdyaXRlVmFsdWUoY3VycmVudFZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSBjdXJyZW50VmFsdWU7XG5cbiAgICBpZiAodGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09IHRoaXMuaW5pdEhUTUwgJiYgIXRoaXMuX2luaXQpIHtcbiAgICAgICAgICBsZXQgZWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hamYtcWwtZWRpdG9yJyk7XG4gICAgICAgICAgZWRpdG9yLmlubmVySFRNTCA9IHRoaXMuaW5pdEhUTUw7XG4gICAgICAgICAgbGV0IGFsbEZvcm11bGFzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tmb3JtdWxhXScpO1xuICAgICAgICAgIGFsbEZvcm11bGFzLmZvckVhY2goKGVsZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdW5saXN0ZW4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICAgIGVsZW0sICdjbGljaycsIChfKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICdmb3JtdWxhJzogdGhpcy5jaGVjayhlbGVtLmlubmVyVGV4dCksXG4gICAgICAgICAgICAgICAgICAncmVmZXJlbmNlJzogZWxlbVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtdWxhQ2xpY2suZW1pdChvYmopO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWxlbSwgJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgICAgICB0aGlzLl9mb3JtdWxhcy5wdXNoKHsgdW5saXN0ZW4sIGZvcm11bGE6IGVsZW0gfSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgIT0gdGhpcy5pbml0SFRNTCkge1xuICAgICAgICAgIHRoaXMucXVpbGxFZGl0b3IucGFzdGVIVE1MKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5xdWlsbEVkaXRvci5zZXRUZXh0KCcnKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgdmFsaWRhdGUoX2M6IEZvcm1Db250cm9sKSB7XG4gICAgaWYgKCF0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZXJyOiB7XG4gICAgICBtaW5MZW5ndGhFcnJvcj86IHsgZ2l2ZW46IG51bWJlciwgbWluTGVuZ3RoOiBudW1iZXIgfTtcbiAgICAgIG1heExlbmd0aEVycm9yPzogeyBnaXZlbjogbnVtYmVyLCBtYXhMZW5ndGg6IG51bWJlciB9O1xuICAgIH0gPSB7fSxcbiAgICAgIHZhbGlkID0gdHJ1ZTtcblxuICAgIGNvbnN0IHRleHRMZW5ndGggPSB0aGlzLnF1aWxsRWRpdG9yLmdldFRleHQoKS50cmltKCkubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMubWluTGVuZ3RoKSB7XG4gICAgICBlcnIubWluTGVuZ3RoRXJyb3IgPSB7XG4gICAgICAgIGdpdmVuOiB0ZXh0TGVuZ3RoLFxuICAgICAgICBtaW5MZW5ndGg6IHRoaXMubWluTGVuZ3RoXG4gICAgICB9O1xuXG4gICAgICB2YWxpZCA9IHRleHRMZW5ndGggPj0gdGhpcy5taW5MZW5ndGggfHwgIXRleHRMZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWF4TGVuZ3RoKSB7XG4gICAgICBlcnIubWF4TGVuZ3RoRXJyb3IgPSB7XG4gICAgICAgIGdpdmVuOiB0ZXh0TGVuZ3RoLFxuICAgICAgICBtYXhMZW5ndGg6IHRoaXMubWF4TGVuZ3RoXG4gICAgICB9O1xuXG4gICAgICB2YWxpZCA9IHRleHRMZW5ndGggPD0gdGhpcy5tYXhMZW5ndGggJiYgdmFsaWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkID8gbnVsbCA6IGVycjtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcblxuICAgIGlmIChjaGFuZ2VzWydyZWFkT25seSddICYmIHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IuZW5hYmxlKCFjaGFuZ2VzWydyZWFkT25seSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtb2R1bGVzJ10gJiYgdGhpcy5xdWlsbEVkaXRvcikge1xuXG4gICAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuICAgICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbCh0aGlzLmVkaXRvckVsZW0sIHtcbiAgICAgICAgbW9kdWxlczogY2hhbmdlc1snbW9kdWxlcyddWydjdXJyZW50VmFsdWUnXSxcbiAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIgfHwgJ0luc2VydCB0ZXh0IGhlcmUgLi4uJyxcbiAgICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICAgIHRoZW1lOiB0aGlzLnRoZW1lIHx8ICdzbm93JyxcbiAgICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9mb3JtdWxhcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHVubGlzdGVuID0gdGhpcy5fZm9ybXVsYXNbaV0udW5saXN0ZW47XG4gICAgICBpZiAodW5saXN0ZW4gIT0gbnVsbCkge1xuICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9mb3JtdWxhVGV4dFN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=