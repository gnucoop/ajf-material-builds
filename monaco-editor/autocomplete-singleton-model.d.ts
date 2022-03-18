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
import { AutoCompleteItem } from './auto-complete-item-model';
import { IEditorLanguage } from './editor-language-model';
/**
 * Manage the autoCompletion for all instances of the editors
 */
export declare class AutoCompleteSingleton {
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     */
    static getInstance(): AutoCompleteSingleton;
    get autoCompleteValues(): {
        [p: string]: AutoCompleteItem[];
    };
    private static _instance;
    private _autoCompleteValues;
    private constructor();
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param language
     */
    initAutoComplete(language: IEditorLanguage): void;
    /**
     * Parse the content passed in param for the language passed in param
     * @param language
     * @param content
     */
    parseAutoCompleteValues(language: IEditorLanguage, content: string): AutoCompleteItem[];
    /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @param content
     */
    private _parseXmlAutoComplete;
    private _parseJsonAutoComplete;
}
