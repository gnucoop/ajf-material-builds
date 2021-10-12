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
    constructor() {
        this._autoCompleteValues = {};
    }
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     */
    static getInstance() {
        if (!AutoCompleteSingleton._instance) {
            AutoCompleteSingleton._instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton._instance;
    }
    get autoCompleteValues() {
        return this._autoCompleteValues;
    }
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param language
     */
    initAutoComplete(language) {
        if (this._autoCompleteValues[language.toString()]) {
            return;
        }
        this._autoCompleteValues[language.toString()] = [];
        // This event is fired when the user press Ctrl + Space, to show Intelissense (Autocomplete)
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: function (model) {
                // Get new autoComplete list for the current content
                AutoCompleteSingleton.getInstance().parseAutoCompleteValues(language, model.getValue());
                return AutoCompleteSingleton.getInstance().autoCompleteValues[language.toString()];
            },
        });
    }
    /**
     * Parse the content passed in param for the language passed in param
     * @param language
     * @param content
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
     * @param content
     */
    _parseXmlAutoComplete(content) {
        let tempList = [];
        let parser = new DOMParser();
        let tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
        for (let i = 0; i < tags.length; i++) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this._autoCompleteValues[IEditorLanguage.XML].find(obj => obj.label === tags[i].tagName) &&
                !tempList.find(obj => obj.label === tags[i].tagName)) {
                // Create autoComplete object
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
    _parseJsonAutoComplete(content) {
        /* tslint:disable-next-line */
        const regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        let tempList = [];
        let m;
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // Add Element only if it not already existing in autoComplete list and in tempList
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON].find(obj => obj.label === m[1]) &&
                !tempList.find(obj => obj.label === m[1])) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBSXhEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQWtCaEM7UUFGUSx3QkFBbUIsR0FBd0MsRUFBRSxDQUFDO0lBRS9DLENBQUM7SUFqQnhCOztPQUVHO0lBQ0gsTUFBTSxDQUFDLFdBQVc7UUFDaEIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRTtZQUNwQyxxQkFBcUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1NBQy9EO1FBQ0QsT0FBTyxxQkFBcUIsQ0FBQyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFPRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxRQUF5QjtRQUN4QyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtZQUNqRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRW5ELDRGQUE0RjtRQUM1RixNQUFNLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLFFBQVEsRUFBRTtZQUN4RCxzQkFBc0IsRUFBRSxVQUFTLEtBQVU7Z0JBQ3pDLG9EQUFvRDtnQkFD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bEIsQ0FBQzs7QUE3R2MsK0JBQVMsR0FBK0IsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0F1dG9Db21wbGV0ZUl0ZW19IGZyb20gJy4vYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBhbnk7XG5cbi8qKlxuICogTWFuYWdlIHRoZSBhdXRvQ29tcGxldGlvbiBmb3IgYWxsIGluc3RhbmNlcyBvZiB0aGUgZWRpdG9yc1xuICovXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlU2luZ2xldG9uIHtcbiAgLyoqXG4gICAqIFdlIHVzZSBhIHNpbmdsZXRvbiwgYmVjYXVzZSB0aGlzIGNsYXNzIGNhbiBiZSBjYWxsIGZyb20gYWxsIHRoZSBNb25hY28gRWRpdG9yIENvbXBvbmVudHNcbiAgICovXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICBpZiAoIUF1dG9Db21wbGV0ZVNpbmdsZXRvbi5faW5zdGFuY2UpIHtcbiAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5faW5zdGFuY2UgPSBuZXcgQXV0b0NvbXBsZXRlU2luZ2xldG9uKCk7XG4gICAgfVxuICAgIHJldHVybiBBdXRvQ29tcGxldGVTaW5nbGV0b24uX2luc3RhbmNlO1xuICB9XG5cbiAgZ2V0IGF1dG9Db21wbGV0ZVZhbHVlcygpOiB7W3A6IHN0cmluZ106IEF1dG9Db21wbGV0ZUl0ZW1bXX0ge1xuICAgIHJldHVybiB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXM7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEF1dG9Db21wbGV0ZVNpbmdsZXRvbnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfYXV0b0NvbXBsZXRlVmFsdWVzOiB7W2tleTogc3RyaW5nXTogQXV0b0NvbXBsZXRlSXRlbVtdfSA9IHt9O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0IGF1dG9Db21wbGV0ZSBmb3IgbGFuZ3VhZ2UgcGFzc2VkIGluIHBhcmFtIGlmIGlzIG5vdCBhbHJlYWR5IGRvbmUuXG4gICAqIEBwYXJhbSBsYW5ndWFnZVxuICAgKi9cbiAgaW5pdEF1dG9Db21wbGV0ZShsYW5ndWFnZTogSUVkaXRvckxhbmd1YWdlKSB7XG4gICAgaWYgKHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tsYW5ndWFnZS50b1N0cmluZygpXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tsYW5ndWFnZS50b1N0cmluZygpXSA9IFtdO1xuXG4gICAgLy8gVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHByZXNzIEN0cmwgKyBTcGFjZSwgdG8gc2hvdyBJbnRlbGlzc2Vuc2UgKEF1dG9jb21wbGV0ZSlcbiAgICBtb25hY28ubGFuZ3VhZ2VzLnJlZ2lzdGVyQ29tcGxldGlvbkl0ZW1Qcm92aWRlcihsYW5ndWFnZSwge1xuICAgICAgcHJvdmlkZUNvbXBsZXRpb25JdGVtczogZnVuY3Rpb24obW9kZWw6IGFueSkge1xuICAgICAgICAvLyBHZXQgbmV3IGF1dG9Db21wbGV0ZSBsaXN0IGZvciB0aGUgY3VycmVudCBjb250ZW50XG4gICAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLnBhcnNlQXV0b0NvbXBsZXRlVmFsdWVzKGxhbmd1YWdlLCBtb2RlbC5nZXRWYWx1ZSgpKTtcbiAgICAgICAgcmV0dXJuIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpLmF1dG9Db21wbGV0ZVZhbHVlc1tsYW5ndWFnZS50b1N0cmluZygpXTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgdGhlIGNvbnRlbnQgcGFzc2VkIGluIHBhcmFtIGZvciB0aGUgbGFuZ3VhZ2UgcGFzc2VkIGluIHBhcmFtXG4gICAqIEBwYXJhbSBsYW5ndWFnZVxuICAgKiBAcGFyYW0gY29udGVudFxuICAgKi9cbiAgcGFyc2VBdXRvQ29tcGxldGVWYWx1ZXMobGFuZ3VhZ2U6IElFZGl0b3JMYW5ndWFnZSwgY29udGVudDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbVtdIHtcbiAgICBzd2l0Y2ggKGxhbmd1YWdlKSB7XG4gICAgICBjYXNlIElFZGl0b3JMYW5ndWFnZS5YTUw6XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZVhtbEF1dG9Db21wbGV0ZShjb250ZW50KTtcbiAgICAgIGNhc2UgSUVkaXRvckxhbmd1YWdlLkpTT046XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZUpzb25BdXRvQ29tcGxldGUoY29udGVudCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSBYTUwgY29udGVudCBhbmQgYWRkIGFsbCB0YWdzIGluIEF1dG9Db21wbGV0ZSBmb3IgWE1MIExhbmd1YWdlXG4gICAqIEBwYXJhbSBjb250ZW50XG4gICAqL1xuICBwcml2YXRlIF9wYXJzZVhtbEF1dG9Db21wbGV0ZShjb250ZW50OiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtW10ge1xuICAgIGxldCB0ZW1wTGlzdDogQXV0b0NvbXBsZXRlSXRlbVtdID0gW107XG4gICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICBsZXQgdGFncyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoY29udGVudCwgJ3RleHQveG1sJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gQWRkIFRBRyBvbmx5IGlmIGl0IG5vdCBhbHJlYWR5IGV4aXN0aW5nIGluIGF1dG9Db21wbGV0ZSBsaXN0IGFuZCBpbiB0ZW1wTGlzdFxuICAgICAgaWYgKCF0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLlhNTF0uZmluZChcbiAgICAgICAgICAgICAgb2JqID0+IG9iai5sYWJlbCA9PT0gdGFnc1tpXS50YWdOYW1lKSAmJlxuICAgICAgICAgICF0ZW1wTGlzdC5maW5kKG9iaiA9PiBvYmoubGFiZWwgPT09IHRhZ3NbaV0udGFnTmFtZSkpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGF1dG9Db21wbGV0ZSBvYmplY3RcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBBdXRvQ29tcGxldGVJdGVtKClcbiAgICAgICAgICAgICAgICAgICAgICAuc2V0TGFiZWwodGFnc1tpXS50YWdOYW1lKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXRLaW5kKG1vbmFjby5sYW5ndWFnZXMuQ29tcGxldGlvbkl0ZW1LaW5kLkZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXREb2N1bWVudGF0aW9uKCcnKVxuICAgICAgICAgICAgICAgICAgICAgIC5zZXRJbnNlcnRUZXh0KGA8JHt0YWdzW2ldLnRhZ05hbWV9Pjwke3RhZ3NbaV0udGFnTmFtZX0+YCk7XG5cbiAgICAgICAgdGVtcExpc3QucHVzaChvYmopO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCB0ZW1wTGlzdCBsaXN0IGluIHRoZSBfYXV0b0NvbXBsZXRlVmFsdWVzLCB0byBtYWludGFpbiBhIGxpc3QgdXBkYXRlZFxuICAgIGlmICh0ZW1wTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLlhNTC50b1N0cmluZygpXSA9XG4gICAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5YTUwudG9TdHJpbmcoKV0uY29uY2F0KHRlbXBMaXN0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGVtcExpc3Q7XG4gIH1cblxuICBwcml2YXRlIF9wYXJzZUpzb25BdXRvQ29tcGxldGUoY29udGVudDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbVtdIHtcbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgICBjb25zdCByZWdleCA9XG4gICAgICAgIC8oPzpcXCd8XFwnKShbXiddKikoPzpcXCd8XFwnKSg/PTopKD86XFw6XFxzKikoPzpcXCd8XFwnKT8odHJ1ZXxmYWxzZXxbMC05YS16QS1aXFwrXFwtXFwsXFwuXFwkXSopL2c7XG4gICAgbGV0IHRlbXBMaXN0OiBBdXRvQ29tcGxldGVJdGVtW10gPSBbXTtcbiAgICBsZXQgbTogYW55O1xuXG4gICAgd2hpbGUgKChtID0gcmVnZXguZXhlYyhjb250ZW50KSkgIT09IG51bGwpIHtcbiAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGF2b2lkIGluZmluaXRlIGxvb3BzIHdpdGggemVyby13aWR0aCBtYXRjaGVzXG4gICAgICBpZiAobS5pbmRleCA9PT0gcmVnZXgubGFzdEluZGV4KSB7XG4gICAgICAgIHJlZ2V4Lmxhc3RJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgRWxlbWVudCBvbmx5IGlmIGl0IG5vdCBhbHJlYWR5IGV4aXN0aW5nIGluIGF1dG9Db21wbGV0ZSBsaXN0IGFuZCBpbiB0ZW1wTGlzdFxuICAgICAgaWYgKG1bMV0gJiYgIXRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuSlNPTl0uZmluZChvYmogPT4gb2JqLmxhYmVsID09PSBtWzFdKSAmJlxuICAgICAgICAgICF0ZW1wTGlzdC5maW5kKG9iaiA9PiBvYmoubGFiZWwgPT09IG1bMV0pKSB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgQXV0b0NvbXBsZXRlSXRlbSgpXG4gICAgICAgICAgICAgICAgICAgICAgLnNldExhYmVsKG1bMV0pXG4gICAgICAgICAgICAgICAgICAgICAgLnNldEtpbmQobW9uYWNvLmxhbmd1YWdlcy5Db21wbGV0aW9uSXRlbUtpbmQuVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgLnNldERvY3VtZW50YXRpb24oJycpXG4gICAgICAgICAgICAgICAgICAgICAgLnNldEluc2VydFRleHQoYCcke21bMV19JzpgKTtcblxuICAgICAgICB0ZW1wTGlzdC5wdXNoKG9iaik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIHRlbXBMaXN0IGxpc3QgaW4gdGhlIF9hdXRvQ29tcGxldGVWYWx1ZXMsIHRvIG1haW50YWluIGEgbGlzdCB1cGRhdGVkXG4gICAgaWYgKHRlbXBMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuSlNPTi50b1N0cmluZygpXSA9XG4gICAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5KU09OLnRvU3RyaW5nKCldLmNvbmNhdCh0ZW1wTGlzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlbXBMaXN0O1xuICB9XG59XG4iXX0=