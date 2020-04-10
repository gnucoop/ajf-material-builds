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
                AutoCompleteSingleton.getInstance().parseAutoCompleteValues(language, model.getValue());
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
            if (!this._autoCompleteValues[IEditorLanguage.XML].find((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj.label === tags[i].tagName)) &&
                !tempList.find((/**
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
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON].find((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj.label === m[1])) &&
                !tempList.find((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7O0FBT3hELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFrQmhDO1FBRlEsd0JBQW1CLEdBQXdDLEVBQUUsQ0FBQztJQUUvQyxDQUFDOzs7OztJQWR4QixNQUFNLENBQUMsV0FBVztRQUNoQixJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFO1lBQ3BDLHFCQUFxQixDQUFDLFNBQVMsR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7U0FDL0Q7UUFDRCxPQUFPLHFCQUFxQixDQUFDLFNBQVMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBV0QsZ0JBQWdCLENBQUMsUUFBeUI7UUFDeEMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7WUFDakQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVuRCw0RkFBNEY7UUFDNUYsTUFBTSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLEVBQUU7WUFDeEQsc0JBQXNCOzs7O1lBQUUsVUFBUyxLQUFVO2dCQUN6QyxvREFBb0Q7Z0JBQ3BELHFCQUFxQixDQUFDLFdB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Y2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBdXRvQ29tcGxldGVJdGVtfSBmcm9tICcuL2F1dG8tY29tcGxldGUtaXRlbS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JMYW5ndWFnZX0gZnJvbSAnLi9lZGl0b3ItbGFuZ3VhZ2UtbW9kZWwnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogYW55O1xuXG4vKipcbiAqIE1hbmFnZSB0aGUgYXV0b0NvbXBsZXRpb24gZm9yIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGVkaXRvcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZVNpbmdsZXRvbiB7XG4gIC8qKlxuICAgKiBXZSB1c2UgYSBzaW5nbGV0b24sIGJlY2F1c2UgdGhpcyBjbGFzcyBjYW4gYmUgY2FsbCBmcm9tIGFsbCB0aGUgTW9uYWNvIEVkaXRvciBDb21wb25lbnRzXG4gICAqL1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKCFBdXRvQ29tcGxldGVTaW5nbGV0b24uX2luc3RhbmNlKSB7XG4gICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uX2luc3RhbmNlID0gbmV3IEF1dG9Db21wbGV0ZVNpbmdsZXRvbigpO1xuICAgIH1cbiAgICByZXR1cm4gQXV0b0NvbXBsZXRlU2luZ2xldG9uLl9pbnN0YW5jZTtcbiAgfVxuXG4gIGdldCBhdXRvQ29tcGxldGVWYWx1ZXMoKToge1twOiBzdHJpbmddOiBBdXRvQ29tcGxldGVJdGVtW119IHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBdXRvQ29tcGxldGVTaW5nbGV0b258bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2F1dG9Db21wbGV0ZVZhbHVlczoge1trZXk6IHN0cmluZ106IEF1dG9Db21wbGV0ZUl0ZW1bXX0gPSB7fTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogSW5pdCBhdXRvQ29tcGxldGUgZm9yIGxhbmd1YWdlIHBhc3NlZCBpbiBwYXJhbSBpZiBpcyBub3QgYWxyZWFkeSBkb25lLlxuICAgKiBAcGFyYW0gbGFuZ3VhZ2VcbiAgICovXG4gIGluaXRBdXRvQ29tcGxldGUobGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZSkge1xuICAgIGlmICh0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbbGFuZ3VhZ2UudG9TdHJpbmcoKV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbbGFuZ3VhZ2UudG9TdHJpbmcoKV0gPSBbXTtcblxuICAgIC8vIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBwcmVzcyBDdHJsICsgU3BhY2UsIHRvIHNob3cgSW50ZWxpc3NlbnNlIChBdXRvY29tcGxldGUpXG4gICAgbW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIobGFuZ3VhZ2UsIHtcbiAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6IGZ1bmN0aW9uKG1vZGVsOiBhbnkpIHtcbiAgICAgICAgLy8gR2V0IG5ldyBhdXRvQ29tcGxldGUgbGlzdCBmb3IgdGhlIGN1cnJlbnQgY29udGVudFxuICAgICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKS5wYXJzZUF1dG9Db21wbGV0ZVZhbHVlcyhsYW5ndWFnZSwgbW9kZWwuZ2V0VmFsdWUoKSk7XG4gICAgICAgIHJldHVybiBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKS5hdXRvQ29tcGxldGVWYWx1ZXNbbGFuZ3VhZ2UudG9TdHJpbmcoKV07XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSBjb250ZW50IHBhc3NlZCBpbiBwYXJhbSBmb3IgdGhlIGxhbmd1YWdlIHBhc3NlZCBpbiBwYXJhbVxuICAgKiBAcGFyYW0gbGFuZ3VhZ2VcbiAgICogQHBhcmFtIGNvbnRlbnRcbiAgICovXG4gIHBhcnNlQXV0b0NvbXBsZXRlVmFsdWVzKGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2UsIGNvbnRlbnQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW1bXSB7XG4gICAgc3dpdGNoIChsYW5ndWFnZSkge1xuICAgICAgY2FzZSBJRWRpdG9yTGFuZ3VhZ2UuWE1MOlxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VYbWxBdXRvQ29tcGxldGUoY29udGVudCk7XG4gICAgICBjYXNlIElFZGl0b3JMYW5ndWFnZS5KU09OOlxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VKc29uQXV0b0NvbXBsZXRlKGNvbnRlbnQpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgWE1MIGNvbnRlbnQgYW5kIGFkZCBhbGwgdGFncyBpbiBBdXRvQ29tcGxldGUgZm9yIFhNTCBMYW5ndWFnZVxuICAgKiBAcGFyYW0gY29udGVudFxuICAgKi9cbiAgcHJpdmF0ZSBfcGFyc2VYbWxBdXRvQ29tcGxldGUoY29udGVudDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbVtdIHtcbiAgICBsZXQgdGVtcExpc3Q6IEF1dG9Db21wbGV0ZUl0ZW1bXSA9IFtdO1xuICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgbGV0IHRhZ3MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGNvbnRlbnQsICd0ZXh0L3htbCcpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIEFkZCBUQUcgb25seSBpZiBpdCBub3QgYWxyZWFkeSBleGlzdGluZyBpbiBhdXRvQ29tcGxldGUgbGlzdCBhbmQgaW4gdGVtcExpc3RcbiAgICAgIGlmICghdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5YTUxdLmZpbmQoXG4gICAgICAgICAgICAgIG9iaiA9PiBvYmoubGFiZWwgPT09IHRhZ3NbaV0udGFnTmFtZSkgJiZcbiAgICAgICAgICAhdGVtcExpc3QuZmluZChvYmogPT4gb2JqLmxhYmVsID09PSB0YWdzW2ldLnRhZ05hbWUpKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhdXRvQ29tcGxldGUgb2JqZWN0XG4gICAgICAgIGxldCBvYmogPSBuZXcgQXV0b0NvbXBsZXRlSXRlbSgpXG4gICAgICAgICAgICAgICAgICAgICAgLnNldExhYmVsKHRhZ3NbaV0udGFnTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAuc2V0S2luZChtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAuc2V0RG9jdW1lbnRhdGlvbignJylcbiAgICAgICAgICAgICAgICAgICAgICAuc2V0SW5zZXJ0VGV4dChgPCR7dGFnc1tpXS50YWdOYW1lfT48JHt0YWdzW2ldLnRhZ05hbWV9PmApO1xuXG4gICAgICAgIHRlbXBMaXN0LnB1c2gob2JqKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgdGVtcExpc3QgbGlzdCBpbiB0aGUgX2F1dG9Db21wbGV0ZVZhbHVlcywgdG8gbWFpbnRhaW4gYSBsaXN0IHVwZGF0ZWRcbiAgICBpZiAodGVtcExpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5YTUwudG9TdHJpbmcoKV0gPVxuICAgICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuWE1MLnRvU3RyaW5nKCldLmNvbmNhdCh0ZW1wTGlzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlbXBMaXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VKc29uQXV0b0NvbXBsZXRlKGNvbnRlbnQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW1bXSB7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgY29uc3QgcmVnZXggPVxuICAgICAgICAvKD86XFwnfFxcJykoW14nXSopKD86XFwnfFxcJykoPz06KSg/OlxcOlxccyopKD86XFwnfFxcJyk/KHRydWV8ZmFsc2V8WzAtOWEtekEtWlxcK1xcLVxcLFxcLlxcJF0qKS9nO1xuICAgIGxldCB0ZW1wTGlzdDogQXV0b0NvbXBsZXRlSXRlbVtdID0gW107XG4gICAgbGV0IG06IGFueTtcblxuICAgIHdoaWxlICgobSA9IHJlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG4gICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSB0byBhdm9pZCBpbmZpbml0ZSBsb29wcyB3aXRoIHplcm8td2lkdGggbWF0Y2hlc1xuICAgICAgaWYgKG0uaW5kZXggPT09IHJlZ2V4Lmxhc3RJbmRleCkge1xuICAgICAgICByZWdleC5sYXN0SW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIEVsZW1lbnQgb25seSBpZiBpdCBub3QgYWxyZWFkeSBleGlzdGluZyBpbiBhdXRvQ29tcGxldGUgbGlzdCBhbmQgaW4gdGVtcExpc3RcbiAgICAgIGlmIChtWzFdICYmICF0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLkpTT05dLmZpbmQob2JqID0+IG9iai5sYWJlbCA9PT0gbVsxXSkgJiZcbiAgICAgICAgICAhdGVtcExpc3QuZmluZChvYmogPT4gb2JqLmxhYmVsID09PSBtWzFdKSkge1xuICAgICAgICBsZXQgb2JqID0gbmV3IEF1dG9Db21wbGV0ZUl0ZW0oKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXRMYWJlbChtWzFdKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXRLaW5kKG1vbmFjby5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLlZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXREb2N1bWVudGF0aW9uKCcnKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXRJbnNlcnRUZXh0KGAnJHttWzFdfSc6YCk7XG5cbiAgICAgICAgdGVtcExpc3QucHVzaChvYmopO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCB0ZW1wTGlzdCBsaXN0IGluIHRoZSBfYXV0b0NvbXBsZXRlVmFsdWVzLCB0byBtYWludGFpbiBhIGxpc3QgdXBkYXRlZFxuICAgIGlmICh0ZW1wTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLkpTT04udG9TdHJpbmcoKV0gPVxuICAgICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuSlNPTi50b1N0cmluZygpXS5jb25jYXQodGVtcExpc3QpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZW1wTGlzdDtcbiAgfVxufVxuIl19