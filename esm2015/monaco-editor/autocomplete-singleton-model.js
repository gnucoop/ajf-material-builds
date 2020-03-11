/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/autocomplete-singleton-model.ts
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
import { AutoCompleteItem } from './auto-complete-item-model';
import { IEditorLanguage } from './editor-language-model';
/**
 * Manage the autoCompletion for all instances of the editors
 */
export class AutoCompleteSingleton {
    /**
     * @private
     */
    constructor() {
        this._autoCompleteValues = {};
    }
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     * @return {?}
     */
    static getInstance() {
        if (!AutoCompleteSingleton._instance) {
            AutoCompleteSingleton._instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton._instance;
    }
    /**
     * @return {?}
     */
    get autoCompleteValues() {
        return this._autoCompleteValues;
    }
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param {?} language
     * @return {?}
     */
    initAutoComplete(language) {
        if (this._autoCompleteValues[language.toString()]) {
            return;
        }
        this._autoCompleteValues[language.toString()] = [];
        // This event is fired when the user press Ctrl + Space, to show Intelissense (Autocomplete)
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (/**
             * @param {?} model
             * @return {?}
             */
            function (model) {
                // Get new autoComplete list for the current content
                AutoCompleteSingleton.getInstance()
                    .parseAutoCompleteValues(language, model.getValue());
                return AutoCompleteSingleton.getInstance().autoCompleteValues[language.toString()];
            }),
        });
    }
    /**
     * Parse the content passed in param for the language passed in param
     * @param {?} language
     * @param {?} content
     * @return {?}
     */
    parseAutoCompleteValues(language, content) {
        switch (language) {
            case IEditorLanguage.XML:
                return this._parseXmlAutoComplete(content);
            case IEditorLanguage.JSON:
                return this._parseJsonAutoComplete(content);
            default:
                return [];
        }
    }
    /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @private
     * @param {?} content
     * @return {?}
     */
    _parseXmlAutoComplete(content) {
        /** @type {?} */
        let tempList = [];
        /** @type {?} */
        let parser = new DOMParser();
        /** @type {?} */
        let tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
        for (let i = 0; i < tags.length; i++) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this._autoCompleteValues[IEditorLanguage.XML]
                .find((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj.label === tags[i].tagName))
                && !tempList.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                obj => obj.label === tags[i].tagName))) {
                // Create autoComplete object
                /** @type {?} */
                let obj = new AutoCompleteItem()
                    .setLabel(tags[i].tagName)
                    .setKind(monaco.languages.CompletionItemKind.Function)
                    .setDocumentation('')
                    .setInsertText(`<${tags[i].tagName}><${tags[i].tagName}>`);
                tempList.push(obj);
            }
        }
        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.XML.toString()] =
                this._autoCompleteValues[IEditorLanguage.XML.toString()].concat(tempList);
        }
        return tempList;
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    _parseJsonAutoComplete(content) {
        /* tslint:disable-next-line */
        /** @type {?} */
        const regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        /** @type {?} */
        let tempList = [];
        /** @type {?} */
        let m;
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // Add Element only if it not already existing in autoComplete list and in tempList
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON]
                .find((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj.label === m[1]))
                && !tempList.find((/**
                 * @param {?} obj
                 * @return {?}
                 */
                obj => obj.label === m[1]))) {
                /** @type {?} */
                let obj = new AutoCompleteItem()
                    .setLabel(m[1])
                    .setKind(monaco.languages.CompletionItemKind.Value)
                    .setDocumentation('')
                    .setInsertText(`'${m[1]}':`);
                tempList.push(obj);
            }
        }
        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.JSON.toString()] =
                this._autoCompleteValues[IEditorLanguage.JSON.toString()].concat(tempList);
        }
        return tempList;
    }
}
AutoCompleteSingleton._instance = null;
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoCompleteSingleton._instance;
    /**
     * @type {?}
     * @private
     */
    AutoCompleteSingleton.prototype._autoCompleteValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7O0FBT3hELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFrQjlCO1FBRlEsd0JBQW1CLEdBQTJDLEVBQUUsQ0FBQztJQUl6RSxDQUFDOzs7OztJQWhCRCxNQUFNLENBQUMsV0FBVztRQUNkLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7WUFDbEMscUJBQXFCLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztTQUNqRTtRQUNELE9BQU8scUJBQXFCLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxJQUFJLGtCQUFrQjtRQUNsQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFhRCxnQkFBZ0IsQ0FBQyxRQUF5QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtZQUMvQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRW5ELDRGQUE0RjtRQUM1RixNQUFNLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLFFBQVEsRUFBRTtZQUN0RCxzQkFBc0I7Ozs7WUFBRSxVQUFVLEtBQVU7Z0JBQ3hDLG9EQUFvRDtnQkFDcEQscUJBQXFCLENBQUMsV0FB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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QXV0b0NvbXBsZXRlSXRlbX0gZnJvbSAnLi9hdXRvLWNvbXBsZXRlLWl0ZW0tbW9kZWwnO1xuaW1wb3J0IHtJRWRpdG9yTGFuZ3VhZ2V9IGZyb20gJy4vZWRpdG9yLWxhbmd1YWdlLW1vZGVsJztcblxuZGVjbGFyZSBjb25zdCBtb25hY286IGFueTtcblxuLyoqXG4gKiBNYW5hZ2UgdGhlIGF1dG9Db21wbGV0aW9uIGZvciBhbGwgaW5zdGFuY2VzIG9mIHRoZSBlZGl0b3JzXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVTaW5nbGV0b24ge1xuICAgIC8qKlxuICAgICAqIFdlIHVzZSBhIHNpbmdsZXRvbiwgYmVjYXVzZSB0aGlzIGNsYXNzIGNhbiBiZSBjYWxsIGZyb20gYWxsIHRoZSBNb25hY28gRWRpdG9yIENvbXBvbmVudHNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICghQXV0b0NvbXBsZXRlU2luZ2xldG9uLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgQXV0b0NvbXBsZXRlU2luZ2xldG9uLl9pbnN0YW5jZSA9IG5ldyBBdXRvQ29tcGxldGVTaW5nbGV0b24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXV0b0NvbXBsZXRlU2luZ2xldG9uLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBnZXQgYXV0b0NvbXBsZXRlVmFsdWVzKCk6IHtbcDogc3RyaW5nXTogQXV0b0NvbXBsZXRlSXRlbVtdfSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBdXRvQ29tcGxldGVTaW5nbGV0b24gfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF9hdXRvQ29tcGxldGVWYWx1ZXM6IHsgW2tleTogc3RyaW5nXTogQXV0b0NvbXBsZXRlSXRlbVtdOyB9ID0ge307XG5cbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBhdXRvQ29tcGxldGUgZm9yIGxhbmd1YWdlIHBhc3NlZCBpbiBwYXJhbSBpZiBpcyBub3QgYWxyZWFkeSBkb25lLlxuICAgICAqIEBwYXJhbSBsYW5ndWFnZVxuICAgICAqL1xuICAgIGluaXRBdXRvQ29tcGxldGUobGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZSkge1xuICAgICAgICBpZiAodGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW2xhbmd1YWdlLnRvU3RyaW5nKCldKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbbGFuZ3VhZ2UudG9TdHJpbmcoKV0gPSBbXTtcblxuICAgICAgICAvLyBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgcHJlc3MgQ3RybCArIFNwYWNlLCB0byBzaG93IEludGVsaXNzZW5zZSAoQXV0b2NvbXBsZXRlKVxuICAgICAgICBtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihsYW5ndWFnZSwge1xuICAgICAgICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogZnVuY3Rpb24gKG1vZGVsOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgbmV3IGF1dG9Db21wbGV0ZSBsaXN0IGZvciB0aGUgY3VycmVudCBjb250ZW50XG4gICAgICAgICAgICAgICAgQXV0b0NvbXBsZXRlU2luZ2xldG9uLmdldEluc3RhbmNlKClcbiAgICAgICAgICAgICAgICAgIC5wYXJzZUF1dG9Db21wbGV0ZVZhbHVlcyhsYW5ndWFnZSwgbW9kZWwuZ2V0VmFsdWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLmF1dG9Db21wbGV0ZVZhbHVlc1tsYW5ndWFnZS50b1N0cmluZygpXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSBjb250ZW50IHBhc3NlZCBpbiBwYXJhbSBmb3IgdGhlIGxhbmd1YWdlIHBhc3NlZCBpbiBwYXJhbVxuICAgICAqIEBwYXJhbSBsYW5ndWFnZVxuICAgICAqIEBwYXJhbSBjb250ZW50XG4gICAgICovXG4gICAgcGFyc2VBdXRvQ29tcGxldGVWYWx1ZXMobGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZSwgY29udGVudDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbVtdIHtcbiAgICAgICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgICAgICAgY2FzZSBJRWRpdG9yTGFuZ3VhZ2UuWE1MOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJzZVhtbEF1dG9Db21wbGV0ZShjb250ZW50KTtcbiAgICAgICAgICAgIGNhc2UgSUVkaXRvckxhbmd1YWdlLkpTT046XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlSnNvbkF1dG9Db21wbGV0ZShjb250ZW50KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgdGhlIFhNTCBjb250ZW50IGFuZCBhZGQgYWxsIHRhZ3MgaW4gQXV0b0NvbXBsZXRlIGZvciBYTUwgTGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0gY29udGVudFxuICAgICAqL1xuICAgIHByaXZhdGUgX3BhcnNlWG1sQXV0b0NvbXBsZXRlKGNvbnRlbnQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW1bXSB7XG4gICAgICAgIGxldCB0ZW1wTGlzdDogQXV0b0NvbXBsZXRlSXRlbSBbXSA9IFtdO1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBsZXQgdGFncyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGVudCwgJ3RleHQveG1sJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIEFkZCBUQUcgb25seSBpZiBpdCBub3QgYWxyZWFkeSBleGlzdGluZyBpbiBhdXRvQ29tcGxldGUgbGlzdCBhbmQgaW4gdGVtcExpc3RcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgIXRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuWE1MXVxuICAgICAgICAgICAgICAgIC5maW5kKG9iaiA9PiBvYmoubGFiZWwgPT09IHRhZ3NbaV0udGFnTmFtZSlcbiAgICAgICAgICAgICAgJiYgIXRlbXBMaXN0LmZpbmQob2JqID0+IG9iai5sYWJlbCA9PT0gdGFnc1tpXS50YWdOYW1lKVxuICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYXV0b0NvbXBsZXRlIG9iamVjdFxuICAgICAgICAgICAgICAgIGxldCBvYmogPSBuZXcgQXV0b0NvbXBsZXRlSXRlbSgpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRMYWJlbCh0YWdzW2ldLnRhZ05hbWUpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRLaW5kKG1vbmFjby5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAuc2V0RG9jdW1lbnRhdGlvbignJylcbiAgICAgICAgICAgICAgICAgICAgLnNldEluc2VydFRleHQoYDwke3RhZ3NbaV0udGFnTmFtZX0+PCR7dGFnc1tpXS50YWdOYW1lfT5gKTtcblxuICAgICAgICAgICAgICAgIHRlbXBMaXN0LnB1c2gob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0ZW1wTGlzdCBsaXN0IGluIHRoZSBfYXV0b0NvbXBsZXRlVmFsdWVzLCB0byBtYWludGFpbiBhIGxpc3QgdXBkYXRlZFxuICAgICAgICBpZiAodGVtcExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5YTUwudG9TdHJpbmcoKV0gPVxuICAgICAgICAgICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLlhNTC50b1N0cmluZygpXS5jb25jYXQodGVtcExpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRlbXBMaXN0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BhcnNlSnNvbkF1dG9Db21wbGV0ZShjb250ZW50OiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtW10ge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICAgICAgY29uc3QgcmVnZXggPSAvKD86XFwnfFxcJykoW14nXSopKD86XFwnfFxcJykoPz06KSg/OlxcOlxccyopKD86XFwnfFxcJyk/KHRydWV8ZmFsc2V8WzAtOWEtekEtWlxcK1xcLVxcLFxcLlxcJF0qKS9nO1xuICAgICAgICBsZXQgdGVtcExpc3Q6IEF1dG9Db21wbGV0ZUl0ZW0gW10gPSBbXTtcbiAgICAgICAgbGV0IG06IGFueTtcblxuICAgICAgICB3aGlsZSAoKG0gPSByZWdleC5leGVjKGNvbnRlbnQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYXZvaWQgaW5maW5pdGUgbG9vcHMgd2l0aCB6ZXJvLXdpZHRoIG1hdGNoZXNcbiAgICAgICAgICAgIGlmIChtLmluZGV4ID09PSByZWdleC5sYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZWdleC5sYXN0SW5kZXgrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIEVsZW1lbnQgb25seSBpZiBpdCBub3QgYWxyZWFkeSBleGlzdGluZyBpbiBhdXRvQ29tcGxldGUgbGlzdCBhbmQgaW4gdGVtcExpc3RcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbVsxXSAmJiAhdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5KU09OXVxuICAgICAgICAgICAgICAgIC5maW5kKG9iaiA9PiBvYmoubGFiZWwgPT09IG1bMV0pXG4gICAgICAgICAgICAgICAgJiYgIXRlbXBMaXN0LmZpbmQob2JqID0+IG9iai5sYWJlbCA9PT0gbVsxXSlcbiAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBBdXRvQ29tcGxldGVJdGVtKClcbiAgICAgICAgICAgICAgICAgICAgLnNldExhYmVsKG1bMV0pXG4gICAgICAgICAgICAgICAgICAgIC5zZXRLaW5kKG1vbmFjby5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAuc2V0RG9jdW1lbnRhdGlvbignJylcbiAgICAgICAgICAgICAgICAgICAgLnNldEluc2VydFRleHQoYCcke21bMV19JzpgKTtcblxuICAgICAgICAgICAgICAgIHRlbXBMaXN0LnB1c2gob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0ZW1wTGlzdCBsaXN0IGluIHRoZSBfYXV0b0NvbXBsZXRlVmFsdWVzLCB0byBtYWludGFpbiBhIGxpc3QgdXBkYXRlZFxuICAgICAgICBpZiAodGVtcExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5KU09OLnRvU3RyaW5nKCldID1cbiAgICAgICAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5KU09OLnRvU3RyaW5nKCldLmNvbmNhdCh0ZW1wTGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGVtcExpc3Q7XG4gICAgfVxufVxuIl19