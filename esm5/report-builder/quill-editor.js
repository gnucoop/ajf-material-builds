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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpbGwtZWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3JlcG9ydC1idWlsZGVyL3F1aWxsLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixhQUFhLEVBSWQsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRWxDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxPQUFPLElBQUksS0FBSyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBR3ZDO0lBNEhFLHdCQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLFFBQWlDO1FBSDNDLGlCQTJEQztRQTFEUyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBeEczQyxlQUFVLEdBQVUsRUFBRSxDQUFDO1FBTWYsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUUvQixnQkFBVyxHQUFHO1lBQ1o7Z0JBQ0UsT0FBTyxFQUFFLDZCQUE2QjtnQkFDdEMsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsV0FBVyxFQUFFLGtCQUFrQjthQUNoQyxFQUFFO2dCQUNELE9BQU8sRUFBRSxRQUFRO2dCQUNqQixPQUFPLEVBQUUsTUFBTTtnQkFDZixXQUFXLEVBQUUsTUFBTTthQUNwQixFQUFFO2dCQUNELE9BQU8sRUFB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SyxFQUFFLElBQUk7eUJBQ1osRUFBRTs0QkFDRCxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsY0FBYyxFQUFkLENBQWMsQ0FBQzs0QkFDN0MsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQztvQkFFRixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkE1Q0MsVUFBVTtnQkFFVixTQUFTO2dCQW9CSCx1QkFBdUI7Ozt3QkFxRzVCLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FFTCxNQUFNO2lDQUNOLE1BQU07bUNBQ04sTUFBTTsrQkFRTixNQUFNOztJQW9RVCxxQkFBQztDQUFBLEFBdlhELElBdVhDO1NBcldZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgUmVuZGVyZXIyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxuICBOR19WQUxJREFUT1JTLFxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgRm9ybUNvbnRyb2wsXG4gIFZhbGlkYXRvclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZSZXBvcnRCdWlsZGVyU2VydmljZX0gZnJvbSAnLi9yZXBvcnQtYnVpbGRlci1zZXJ2aWNlJztcblxuaW1wb3J0IHtkZWZhdWx0IGFzIFF1aWxsfSBmcm9tICdxdWlsbCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXF1aWxsLWVkaXRvcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl1cIj48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZRdWlsbEVkaXRvciksXG4gICAgbXVsdGk6IHRydWVcbiAgfSwge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmUXVpbGxFZGl0b3IpLFxuICAgIG11bHRpOiB0cnVlXG4gIH1dLFxuICBzdHlsZVVybHM6IFsncXVpbGwtZWRpdG9yLmNzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBamZRdWlsbEVkaXRvclxuICBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgVmFsaWRhdG9yIHtcblxuICBxdWlsbEVkaXRvcjogYW55O1xuICBlZGl0b3JFbGVtOiBIVE1MRWxlbWVudDtcbiAgZW1wdHlBcnJheTogYW55W10gPSBbXTtcbiAgY29udGVudDogYW55O1xuXG4gIGxpc3RlbkZ1bmM6IEZ1bmN0aW9uO1xuXG4gIHByZXZpZXdFbGVtRm9ybXVsYTogYW55O1xuICBwcml2YXRlIF9pbml0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgZGF0ZUZvcm1hdHMgPSBbXG4gICAge1xuICAgICAgJ2xhYmVsJzogJ0p1bmUgMjNyZCAyMDE3LCAxMjozOToxMiBwbScsXG4gICAgICAndmFsdWUnOiAnTU1NTSBEbyBZWVlZLCBoOm1tOnNzIGEnLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdNTU1NRG9ZWVlZaG1tc3NhJ1xuICAgIH0sIHtcbiAgICAgICdsYWJlbCc6ICdGcmlkYXknLFxuICAgICAgJ3ZhbHVlJzogJ2RkZGQnLFxuICAgICAgJ3ZhbGlkYXRvcic6ICdkZGRkJ1xuICAgIH0sIHtcbiAgICAgICdsYWJlbCc6ICdKdW4gMjNyZCAxNycsXG4gICAgICAndmFsdWUnOiAnTU1NIERvIFlZJyxcbiAgICAgICd2YWxpZGF0b3InOiAnTU1NRG9ZWSdcbiAgICB9XTtcblxuXG4gIGZvbnRzID0gW1xuICAgIGZhbHNlLFxuICAgICdibGFja3InLFxuICAgICdibGFjay1pdGFsaWMnLFxuICAgICdib2xkJyxcbiAgICAnYm9sZC1jb25kZW5zZWQnLFxuICAgICdib2xkLWNvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdib2xkLWl0YWxpYycsXG4gICAgJ2NvbmRlbnNlZCcsXG4gICAgJ2NvbmRlbnNlZC1pdGFsaWMnLFxuICAgICdpdGFsaWMnLFxuICAgICdsaWdodCcsXG4gICAgJ2xpZ2h0LWl0YWxpYycsXG4gICAgJ21lZGl1bScsXG4gICAgJ21lZGl1bS1pdGFsaWMnLFxuICAgICd0aGlucicsXG4gICAgJ3RoaW4taXRhbGljJ1xuICBdO1xuXG4gIGRlZmF1bHRNb2R1bGVzID0ge1xuICAgIGZvcm11bGE6IHRydWUsXG4gICAgdG9vbGJhcjogW1xuICAgICAgWydmb3JtdWxhJ10sXG4gICAgICBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdzdHJpa2UnXSwgICAgICAgIC8vIHRvZ2dsZWQgYnV0dG9uc1xuICAgICAgLy8gWydibG9ja3F1b3RlJywgJ2NvZGUtYmxvY2snXSxcblxuICAgICAgW3sgJ2hlYWRlcic6IDEgfSwgeyAnaGVhZGVyJzogMiB9XSwgICAgICAgICAgICAgICAvLyBjdXN0b20gYnV0dG9uIHZhbHVlc1xuICAgICAgW3sgJ2xpc3QnOiAnb3JkZXJlZCcgfSwgeyAnbGlzdCc6ICdidWxsZXQnIH1dLFxuICAgICAgW3sgJ3NjcmlwdCc6ICdzdWInIH0sIHsgJ3NjcmlwdCc6ICdzdXBlcicgfV0sICAgICAgLy8gc3VwZXJzY3JpcHQvc3Vic2NyaXB0XG4gICAgICAvLyBbeyAnaW5kZW50JzogJy0xJ30sIHsgJ2luZGVudCc6ICcrMScgfV0sICAgICAgICAgIC8vIG91dGRlbnQvaW5kZW50XG4gICAgICAvLyBbeyAnZGlyZWN0aW9uJzogJ3J0bCcgfV0sICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRleHQgZGlyZWN0aW9uXG5cbiAgICAgIFt7ICdzaXplJzogWydzbWFsbCcsIGZhbHNlLCAnbGFyZ2UnLCAnaHVnZSddIH1dLCAgLy8gY3VzdG9tIGRyb3Bkb3duXG4gICAgICBbeyAnaGVhZGVyJzogWzEsIDIsIDMsIDQsIDUsIDYsIGZhbHNlXSB9XSxcblxuICAgICAgW3sgJ2NvbG9yJzogdGhpcy5lbXB0eUFycmF5LnNsaWNlKCkgfSxcbiAgICAgIHsgJ2JhY2tncm91bmQnOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKSB9XSwgICAgICAgICAgLy8gZHJvcGRvd24gd2l0aCBkZWZhdWx0cyBmcm9tIHRoZW1lXG4gICAgICBbeyAnZm9udCc6IHRoaXMuZm9udHMgfV0sXG4gICAgICBbeyAnYWxpZ24nOiB0aGlzLmVtcHR5QXJyYXkuc2xpY2UoKSB9XSxcblxuICAgICAgWydjbGVhbiddLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGZvcm1hdHRpbmcgYnV0dG9uXG5cbiAgICAgIC8vIFsnbGluaycsICdpbWFnZScsICd2aWRlbyddICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgYW5kIGltYWdlLCB2aWRlb1xuICAgIF1cbiAgfTtcblxuICBmb250ID0gUXVpbGwuaW1wb3J0KCdmb3JtYXRzL2ZvbnQnKTtcblxuXG4gIEBJbnB1dCgpIHRoZW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vZHVsZXM6IE9iamVjdDtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1heExlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSBtaW5MZW5ndGg6IG51bWJlcjtcbiAgQElucHV0KCkgZm9ybWF0czogc3RyaW5nW107XG4gIEBJbnB1dCgpIGluaXRIVE1MOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGVkaXRvckNyZWF0ZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29udGVudENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblxuICAvKipcbiAgICogdGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIGNsaWNrIG9uIGZvcm11bGEgYnV0dG9uIG9uIHF1aWxsIGVkaXRvciByb29sIGJhcsaSXG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgQE91dHB1dCgpIGZvcm11bGFDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuXG4gIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XG5cbiAgcHJpdmF0ZSBfZm9ybXVsYXM6IHsgZm9ybXVsYTogYW55LCB1bmxpc3RlbjogRnVuY3Rpb24gfCBudWxsIH1bXSA9IFtdO1xuICBwcml2YXRlIF9mb3JtdWxhVGV4dFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZSZXBvcnRCdWlsZGVyU2VydmljZSkge1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QgPSB0aGlzLmZvbnRzO1xuICAgIHRoaXMuZm9udC53aGl0ZWxpc3QucHVzaCgncmVndWxhcicpO1xuXG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIgPVxuICAgICAgdGhpcy5fc2VydmljZS5nZXRGb3JtdWxhVG9IdG1sRXZlbnQoKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XG5cbiAgICAgICAgICAvLyByZWZlcmVuY2UgaXMgZGVmaW5lZCBvbmx5IHdoZW4gdGhlIHVzZXIgd2FudCB0byBlZGl0IHRoZSBmb3JtdWxhXG4gICAgICAgICAgaWYgKGV2ZW50LnJlZmVyZW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBldmVudC5yZWZlcmVuY2UuaW5uZXJIVE1MID0gZXZlbnQuZm9ybXVsYTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShldmVudC5yZWZlcmVuY2UsICdmb3JtdWxhJywgZXZlbnQuZm9ybXVsYSk7XG4gICAgICAgICAgICBjb25zdCBlZnMgPSB0aGlzLl9mb3JtdWxhcy5maWx0ZXIoZiA9PiBmLmZvcm11bGEgPT09IGV2ZW50LnJlZmVyZW5jZSk7XG4gICAgICAgICAgICBsZXQgZm9ybXVsYUVudHJ5O1xuICAgICAgICAgICAgbGV0IHVubGlzdGVuO1xuICAgICAgICAgICAgaWYgKGVmcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGZvcm11bGFFbnRyeSA9IGVmc1swXTtcbiAgICAgICAgICAgICAgdW5saXN0ZW4gPSBmb3JtdWxhRW50cnkudW5saXN0ZW47XG4gICAgICAgICAgICAgIGlmICh1bmxpc3RlbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZm9ybXVsYUVudHJ5ID0geyBmb3JtdWxhOiBldmVudC5yZWZlcmVuY2UsIHVubGlzdGVuOiBudWxsIH07XG4gICAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goZm9ybXVsYUVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm11bGFFbnRyeS51bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgZXZlbnQucmVmZXJlbmNlLCAnY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICdmb3JtdWxhJzogZXZlbnQuZm9ybXVsYSxcbiAgICAgICAgICAgICAgICAgICdyZWZlcmVuY2UnOiBldmVudC5yZWZlcmVuY2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcXVpbGxFZGl0b3IgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmFqZi1xbC1lZGl0b3InKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGluaywgJ2hyZWYnLCAnamF2YXNjcmlwdDp2b2lkKDApJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShsaW5rLCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZShsaW5rLCAnZm9ybXVsYScsIHRoaXMuY2hlY2soZXZlbnQuZm9ybXVsYSkpO1xuICAgICAgICAgICAgY29uc3QgbGlua0xhYmVsID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlVGV4dChldmVudC5mb3JtdWxhKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGxpbmssIGxpbmtMYWJlbCk7XG4gICAgICAgICAgICAvLyBhZGQgbGlzdGVuZXIgcmVsYXRlZCBvbiB0aGUgY2xpY2sgZXZlbnQgb2YgdGhlIG5ldyBmb3JtdWxhXG4gICAgICAgICAgICBjb25zdCB1bmxpc3RlbiA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbihcbiAgICAgICAgICAgICAgbGluaywgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgJ2Zvcm11bGEnOiB0aGlzLmNoZWNrKGV2ZW50LmZvcm11bGEpLFxuICAgICAgICAgICAgICAgICAgJ3JlZmVyZW5jZSc6IGxpbmtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHF1aWxsRWRpdG9yLCBsaW5rKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvcm11bGFzLnB1c2goeyB1bmxpc3RlbiwgZm9ybXVsYTogbGluayB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgY2hlY2sodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgdGhpcy5kYXRlRm9ybWF0cy5sZW5ndGggOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXRzW2ldLnZhbGlkYXRvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDxzdHJpbmc+dmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgZnVuY3Rpb24gc2VhcmNoIGZvbXVsYXMgaW5zaWRlIHRoZSBpbml0IHRleHRcbiAgICogYW5kIGFsbG9jYXRlIHRoZSByZWxhdGVkIGxpc3RlbmVyIG9uIGNsaWNrIGV2ZW50XG4gICAqXG4gICAqIEBtZW1iZXJvZiBRdWlsbEVkaXRvckNvbXBvbmVudFxuICAgKi9cbiAgc2V0SFRNTCgpIHtcbiAgICB0aGlzLndyaXRlVmFsdWUodGhpcy5pbml0SFRNTCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgY29uc3QgdG9vbGJhckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW2FqZi1xdWlsbC1lZGl0b3ItdG9vbGJhcl0nKTtcbiAgICBsZXQgbW9kdWxlczogYW55ID0gdGhpcy5tb2R1bGVzIHx8IHRoaXMuZGVmYXVsdE1vZHVsZXM7XG5cbiAgICBRdWlsbC5yZWdpc3Rlcih0aGlzLmZvbnQsIHRydWUpO1xuXG4gICAgaWYgKHRvb2xiYXJFbGVtKSB7XG4gICAgICBtb2R1bGVzWyd0b29sYmFyJ10gPSB0b29sYmFyRWxlbTtcbiAgICAgIG1vZHVsZXNbJ2Zvcm11bGEnXSA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAnYmVmb3JlZW5kJywgJzxkaXYgcXVpbGwtZWRpdG9yLWVsZW1lbnQ+PC9kaXY+J1xuICAgICk7XG5cbiAgICB0aGlzLmVkaXRvckVsZW0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW3F1aWxsLWVkaXRvci1lbGVtZW50XScpO1xuXG4gICAgdGhpcy5xdWlsbEVkaXRvciA9IG5ldyBRdWlsbCh0aGlzLmVkaXRvckVsZW0sIHtcbiAgICAgIG1vZHVsZXM6IG1vZHVsZXMsXG4gICAgICBwbGFjZWhvbGRlcjogdGhpcy5wbGFjZWhvbGRlciB8fCAnSW5zZXJ0IHRleHQgaGVyZSAuLi4nLFxuICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZE9ubHkgfHwgZmFsc2UsXG4gICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHNcbiAgICB9KTtcblxuXG4gICAgdGhpcy5lZGl0b3JDcmVhdGVkLmVtaXQodGhpcy5xdWlsbEVkaXRvcik7XG4gICAgdGhpcy5zZXRIVE1MKCk7XG5cbiAgICAvLyBtYXJrIG1vZGVsIGFzIHRvdWNoZWQgaWYgZWRpdG9yIGxvc3QgZm9jdXNcbiAgICB0aGlzLnF1aWxsRWRpdG9yLm9uKCdzZWxlY3Rpb24tY2hhbmdlJywgKHJhbmdlOiBhbnksIG9sZFJhbmdlOiBhbnksIHNvdXJjZTogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQuZW1pdCh7XG4gICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbEVkaXRvcixcbiAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICBvbGRSYW5nZTogb2xkUmFuZ2UsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyYW5nZSkge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbW9kZWwgaWYgdGV4dCBjaGFuZ2VzXG4gICAgdGhpcy5xdWlsbEVkaXRvci5vbigndGV4dC1jaGFuZ2UnLCAoZGVsdGE6IGFueSwgb2xkRGVsdGE6IGFueSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgIGxldCBodG1sOiBhbnkgPSB0aGlzLmVkaXRvckVsZW0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MO1xuICAgICAgY29uc3QgdGV4dCA9IHRoaXMucXVpbGxFZGl0b3IuZ2V0VGV4dCgpO1xuXG4gICAgICBpZiAoaHRtbCA9PT0gJzxwPjxicj48L3A+Jykge1xuICAgICAgICBodG1sID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGh0bWwpO1xuXG4gICAgICB0aGlzLmNvbnRlbnRDaGFuZ2VkLmVtaXQoe1xuICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxFZGl0b3IsXG4gICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgb2xkRGVsdGE6IG9sZERlbHRhLFxuICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWZvcm11bGEnKTtcbiAgICB0aGlzLmxpc3RlbkZ1bmMgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZWxlbSwgJ2NsaWNrJywgKF8pID0+IHtcbiAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQoKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICB3cml0ZVZhbHVlKGN1cnJlbnRWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5jb250ZW50ID0gY3VycmVudFZhbHVlO1xuXG4gICAgaWYgKHRoaXMucXVpbGxFZGl0b3IpIHtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PSB0aGlzLmluaXRIVE1MICYmICF0aGlzLl9pbml0KSB7XG4gICAgICAgICAgbGV0IGVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWpmLXFsLWVkaXRvcicpO1xuICAgICAgICAgIGVkaXRvci5pbm5lckhUTUwgPSB0aGlzLmluaXRIVE1MO1xuICAgICAgICAgIGxldCBhbGxGb3JtdWxhcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZm9ybXVsYV0nKTtcbiAgICAgICAgICBhbGxGb3JtdWxhcy5mb3JFYWNoKChlbGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVubGlzdGVuID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuKFxuICAgICAgICAgICAgICBlbGVtLCAnY2xpY2snLCAoXykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAnZm9ybXVsYSc6IHRoaXMuY2hlY2soZWxlbS5pbm5lclRleHQpLFxuICAgICAgICAgICAgICAgICAgJ3JlZmVyZW5jZSc6IGVsZW1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXVsYUNsaWNrLmVtaXQob2JqKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsZW0sICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICAgICAgdGhpcy5fZm9ybXVsYXMucHVzaCh7IHVubGlzdGVuLCBmb3JtdWxhOiBlbGVtIH0pO1xuICAgICAgICAgICAgdGhpcy5faW5pdCA9IHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFZhbHVlICE9IHRoaXMuaW5pdEhUTUwpIHtcbiAgICAgICAgICB0aGlzLnF1aWxsRWRpdG9yLnBhc3RlSFRNTChjdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucXVpbGxFZGl0b3Iuc2V0VGV4dCgnJyk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHZhbGlkYXRlKF9jOiBGb3JtQ29udHJvbCkge1xuICAgIGlmICghdGhpcy5xdWlsbEVkaXRvcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGVycjoge1xuICAgICAgbWluTGVuZ3RoRXJyb3I/OiB7IGdpdmVuOiBudW1iZXIsIG1pbkxlbmd0aDogbnVtYmVyIH07XG4gICAgICBtYXhMZW5ndGhFcnJvcj86IHsgZ2l2ZW46IG51bWJlciwgbWF4TGVuZ3RoOiBudW1iZXIgfTtcbiAgICB9ID0ge30sXG4gICAgICB2YWxpZCA9IHRydWU7XG5cbiAgICBjb25zdCB0ZXh0TGVuZ3RoID0gdGhpcy5xdWlsbEVkaXRvci5nZXRUZXh0KCkudHJpbSgpLmxlbmd0aDtcblxuICAgIGlmICh0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgZXJyLm1pbkxlbmd0aEVycm9yID0ge1xuICAgICAgICBnaXZlbjogdGV4dExlbmd0aCxcbiAgICAgICAgbWluTGVuZ3RoOiB0aGlzLm1pbkxlbmd0aFxuICAgICAgfTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoID49IHRoaXMubWluTGVuZ3RoIHx8ICF0ZXh0TGVuZ3RoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1heExlbmd0aCkge1xuICAgICAgZXJyLm1heExlbmd0aEVycm9yID0ge1xuICAgICAgICBnaXZlbjogdGV4dExlbmd0aCxcbiAgICAgICAgbWF4TGVuZ3RoOiB0aGlzLm1heExlbmd0aFxuICAgICAgfTtcblxuICAgICAgdmFsaWQgPSB0ZXh0TGVuZ3RoIDw9IHRoaXMubWF4TGVuZ3RoICYmIHZhbGlkO1xuICAgIH1cblxuICAgIHJldHVybiB2YWxpZCA/IG51bGwgOiBlcnI7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG5cbiAgICBpZiAoY2hhbmdlc1sncmVhZE9ubHknXSAmJiB0aGlzLnF1aWxsRWRpdG9yKSB7XG4gICAgICB0aGlzLnF1aWxsRWRpdG9yLmVuYWJsZSghY2hhbmdlc1sncmVhZE9ubHknXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbW9kdWxlcyddICYmIHRoaXMucXVpbGxFZGl0b3IpIHtcblxuICAgICAgUXVpbGwucmVnaXN0ZXIodGhpcy5mb250LCB0cnVlKTtcbiAgICAgIHRoaXMucXVpbGxFZGl0b3IgPSBuZXcgUXVpbGwodGhpcy5lZGl0b3JFbGVtLCB7XG4gICAgICAgIG1vZHVsZXM6IGNoYW5nZXNbJ21vZHVsZXMnXVsnY3VycmVudFZhbHVlJ10sXG4gICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyIHx8ICdJbnNlcnQgdGV4dCBoZXJlIC4uLicsXG4gICAgICAgIHJlYWRPbmx5OiB0aGlzLnJlYWRPbmx5IHx8IGZhbHNlLFxuICAgICAgICB0aGVtZTogdGhpcy50aGVtZSB8fCAnc25vdycsXG4gICAgICAgIGZvcm1hdHM6IHRoaXMuZm9ybWF0c1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ucmVtb3ZlKCk7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZm9ybXVsYXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB1bmxpc3RlbiA9IHRoaXMuX2Zvcm11bGFzW2ldLnVubGlzdGVuO1xuICAgICAgaWYgKHVubGlzdGVuICE9IG51bGwpIHtcbiAgICAgICAgdW5saXN0ZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZm9ybXVsYVRleHRTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19