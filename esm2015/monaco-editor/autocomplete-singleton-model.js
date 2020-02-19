/**
 * @fileoverview added by tsickle
 * Generated from: src/material/monaco-editor/autocomplete-singleton-model.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7O0FBT3hELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFrQjlCO1FBRlEsd0JBQW1CLEdBQTJDLEVBQUUsQ0FBQztJQUl6RSxDQUFDOzs7OztJQWhCRCxNQUFNLENBQUMsV0FBVztRQUNkLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7WUFDbEMscUJBQXFCLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztTQUNqRTtRQUNELE9BQU8scUJBQXFCLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxJQUFJLGtCQUFrQjtRQUNsQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFhRCxnQkFBZ0IsQ0FBQyxRQUF5QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtZQUMvQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRW5ELDRGQUE0RjtRQUM1RixNQUFNLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLFFBQVEsRUFBRTtZQUN0RCxzQkFBc0I7Ozs7WUFBRSxVQUFVLEtBQVU7Z0JBQ3hDLG9EQUFvRDtnQkFDcEQscUJBQXFCLENBQUMsV0FB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IEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBdXRvQ29tcGxldGVJdGVtfSBmcm9tICcuL2F1dG8tY29tcGxldGUtaXRlbS1tb2RlbCc7XG5pbXBvcnQge0lFZGl0b3JMYW5ndWFnZX0gZnJvbSAnLi9lZGl0b3ItbGFuZ3VhZ2UtbW9kZWwnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogYW55O1xuXG4vKipcbiAqIE1hbmFnZSB0aGUgYXV0b0NvbXBsZXRpb24gZm9yIGFsbCBpbnN0YW5jZXMgb2YgdGhlIGVkaXRvcnNcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZVNpbmdsZXRvbiB7XG4gICAgLyoqXG4gICAgICogV2UgdXNlIGEgc2luZ2xldG9uLCBiZWNhdXNlIHRoaXMgY2xhc3MgY2FuIGJlIGNhbGwgZnJvbSBhbGwgdGhlIE1vbmFjbyBFZGl0b3IgQ29tcG9uZW50c1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFBdXRvQ29tcGxldGVTaW5nbGV0b24uX2luc3RhbmNlKSB7XG4gICAgICAgICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uX2luc3RhbmNlID0gbmV3IEF1dG9Db21wbGV0ZVNpbmdsZXRvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBdXRvQ29tcGxldGVTaW5nbGV0b24uX2luc3RhbmNlO1xuICAgIH1cblxuICAgIGdldCBhdXRvQ29tcGxldGVWYWx1ZXMoKToge1twOiBzdHJpbmddOiBBdXRvQ29tcGxldGVJdGVtW119IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEF1dG9Db21wbGV0ZVNpbmdsZXRvbiB8IG51bGwgPSBudWxsO1xuICAgIHByaXZhdGUgX2F1dG9Db21wbGV0ZVZhbHVlczogeyBba2V5OiBzdHJpbmddOiBBdXRvQ29tcGxldGVJdGVtW107IH0gPSB7fTtcblxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGF1dG9Db21wbGV0ZSBmb3IgbGFuZ3VhZ2UgcGFzc2VkIGluIHBhcmFtIGlmIGlzIG5vdCBhbHJlYWR5IGRvbmUuXG4gICAgICogQHBhcmFtIGxhbmd1YWdlXG4gICAgICovXG4gICAgaW5pdEF1dG9Db21wbGV0ZShsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlKSB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbbGFuZ3VhZ2UudG9TdHJpbmcoKV0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tsYW5ndWFnZS50b1N0cmluZygpXSA9IFtdO1xuXG4gICAgICAgIC8vIFRoaXMgZXZlbnQgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBwcmVzcyBDdHJsICsgU3BhY2UsIHRvIHNob3cgSW50ZWxpc3NlbnNlIChBdXRvY29tcGxldGUpXG4gICAgICAgIG1vbmFjby5sYW5ndWFnZXMucmVnaXN0ZXJDb21wbGV0aW9uSXRlbVByb3ZpZGVyKGxhbmd1YWdlLCB7XG4gICAgICAgICAgICBwcm92aWRlQ29tcGxldGlvbkl0ZW1zOiBmdW5jdGlvbiAobW9kZWw6IGFueSkge1xuICAgICAgICAgICAgICAgIC8vIEdldCBuZXcgYXV0b0NvbXBsZXRlIGxpc3QgZm9yIHRoZSBjdXJyZW50IGNvbnRlbnRcbiAgICAgICAgICAgICAgICBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKVxuICAgICAgICAgICAgICAgICAgLnBhcnNlQXV0b0NvbXBsZXRlVmFsdWVzKGxhbmd1YWdlLCBtb2RlbC5nZXRWYWx1ZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXV0b0NvbXBsZXRlU2luZ2xldG9uLmdldEluc3RhbmNlKCkuYXV0b0NvbXBsZXRlVmFsdWVzW2xhbmd1YWdlLnRvU3RyaW5nKCldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgdGhlIGNvbnRlbnQgcGFzc2VkIGluIHBhcmFtIGZvciB0aGUgbGFuZ3VhZ2UgcGFzc2VkIGluIHBhcmFtXG4gICAgICogQHBhcmFtIGxhbmd1YWdlXG4gICAgICogQHBhcmFtIGNvbnRlbnRcbiAgICAgKi9cbiAgICBwYXJzZUF1dG9Db21wbGV0ZVZhbHVlcyhsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlLCBjb250ZW50OiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtW10ge1xuICAgICAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XG4gICAgICAgICAgICBjYXNlIElFZGl0b3JMYW5ndWFnZS5YTUw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlWG1sQXV0b0NvbXBsZXRlKGNvbnRlbnQpO1xuICAgICAgICAgICAgY2FzZSBJRWRpdG9yTGFuZ3VhZ2UuSlNPTjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VKc29uQXV0b0NvbXBsZXRlKGNvbnRlbnQpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgWE1MIGNvbnRlbnQgYW5kIGFkZCBhbGwgdGFncyBpbiBBdXRvQ29tcGxldGUgZm9yIFhNTCBMYW5ndWFnZVxuICAgICAqIEBwYXJhbSBjb250ZW50XG4gICAgICovXG4gICAgcHJpdmF0ZSBfcGFyc2VYbWxBdXRvQ29tcGxldGUoY29udGVudDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbVtdIHtcbiAgICAgICAgbGV0IHRlbXBMaXN0OiBBdXRvQ29tcGxldGVJdGVtIFtdID0gW107XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGxldCB0YWdzID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhjb250ZW50LCAndGV4dC94bWwnKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gQWRkIFRBRyBvbmx5IGlmIGl0IG5vdCBhbHJlYWR5IGV4aXN0aW5nIGluIGF1dG9Db21wbGV0ZSBsaXN0IGFuZCBpbiB0ZW1wTGlzdFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5YTUxdXG4gICAgICAgICAgICAgICAgLmZpbmQob2JqID0+IG9iai5sYWJlbCA9PT0gdGFnc1tpXS50YWdOYW1lKVxuICAgICAgICAgICAgICAmJiAhdGVtcExpc3QuZmluZChvYmogPT4gb2JqLmxhYmVsID09PSB0YWdzW2ldLnRhZ05hbWUpXG4gICAgICAgICAgICApIHtcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhdXRvQ29tcGxldGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBBdXRvQ29tcGxldGVJdGVtKClcbiAgICAgICAgICAgICAgICAgICAgLnNldExhYmVsKHRhZ3NbaV0udGFnTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgLnNldEtpbmQobW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuRnVuY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgIC5zZXREb2N1bWVudGF0aW9uKCcnKVxuICAgICAgICAgICAgICAgICAgICAuc2V0SW5zZXJ0VGV4dChgPCR7dGFnc1tpXS50YWdOYW1lfT48JHt0YWdzW2ldLnRhZ05hbWV9PmApO1xuXG4gICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRlbXBMaXN0IGxpc3QgaW4gdGhlIF9hdXRvQ29tcGxldGVWYWx1ZXMsIHRvIG1haW50YWluIGEgbGlzdCB1cGRhdGVkXG4gICAgICAgIGlmICh0ZW1wTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLlhNTC50b1N0cmluZygpXSA9XG4gICAgICAgICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuWE1MLnRvU3RyaW5nKCldLmNvbmNhdCh0ZW1wTGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGVtcExpc3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGFyc2VKc29uQXV0b0NvbXBsZXRlKGNvbnRlbnQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW1bXSB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgICAgICBjb25zdCByZWdleCA9IC8oPzpcXCd8XFwnKShbXiddKikoPzpcXCd8XFwnKSg/PTopKD86XFw6XFxzKikoPzpcXCd8XFwnKT8odHJ1ZXxmYWxzZXxbMC05YS16QS1aXFwrXFwtXFwsXFwuXFwkXSopL2c7XG4gICAgICAgIGxldCB0ZW1wTGlzdDogQXV0b0NvbXBsZXRlSXRlbSBbXSA9IFtdO1xuICAgICAgICBsZXQgbTogYW55O1xuXG4gICAgICAgIHdoaWxlICgobSA9IHJlZ2V4LmV4ZWMoY29udGVudCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSB0byBhdm9pZCBpbmZpbml0ZSBsb29wcyB3aXRoIHplcm8td2lkdGggbWF0Y2hlc1xuICAgICAgICAgICAgaWYgKG0uaW5kZXggPT09IHJlZ2V4Lmxhc3RJbmRleCkge1xuICAgICAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBZGQgRWxlbWVudCBvbmx5IGlmIGl0IG5vdCBhbHJlYWR5IGV4aXN0aW5nIGluIGF1dG9Db21wbGV0ZSBsaXN0IGFuZCBpbiB0ZW1wTGlzdFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBtWzFdICYmICF0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLkpTT05dXG4gICAgICAgICAgICAgICAgLmZpbmQob2JqID0+IG9iai5sYWJlbCA9PT0gbVsxXSlcbiAgICAgICAgICAgICAgICAmJiAhdGVtcExpc3QuZmluZChvYmogPT4gb2JqLmxhYmVsID09PSBtWzFdKVxuICAgICAgICAgICAgKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gbmV3IEF1dG9Db21wbGV0ZUl0ZW0oKVxuICAgICAgICAgICAgICAgICAgICAuc2V0TGFiZWwobVsxXSlcbiAgICAgICAgICAgICAgICAgICAgLnNldEtpbmQobW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIC5zZXREb2N1bWVudGF0aW9uKCcnKVxuICAgICAgICAgICAgICAgICAgICAuc2V0SW5zZXJ0VGV4dChgJyR7bVsxXX0nOmApO1xuXG4gICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRlbXBMaXN0IGxpc3QgaW4gdGhlIF9hdXRvQ29tcGxldGVWYWx1ZXMsIHRvIG1haW50YWluIGEgbGlzdCB1cGRhdGVkXG4gICAgICAgIGlmICh0ZW1wTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLkpTT04udG9TdHJpbmcoKV0gPVxuICAgICAgICAgICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLkpTT04udG9TdHJpbmcoKV0uY29uY2F0KHRlbXBMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZW1wTGlzdDtcbiAgICB9XG59XG4iXX0=