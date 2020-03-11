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
var AutoCompleteSingleton = /** @class */ (function () {
    function AutoCompleteSingleton() {
        this._autoCompleteValues = {};
    }
    /**
     * We use a singleton, because this class can be call from all the Monaco Editor Components
     */
    AutoCompleteSingleton.getInstance = function () {
        if (!AutoCompleteSingleton._instance) {
            AutoCompleteSingleton._instance = new AutoCompleteSingleton();
        }
        return AutoCompleteSingleton._instance;
    };
    Object.defineProperty(AutoCompleteSingleton.prototype, "autoCompleteValues", {
        get: function () {
            return this._autoCompleteValues;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init autoComplete for language passed in param if is not already done.
     * @param language
     */
    AutoCompleteSingleton.prototype.initAutoComplete = function (language) {
        if (this._autoCompleteValues[language.toString()]) {
            return;
        }
        this._autoCompleteValues[language.toString()] = [];
        // This event is fired when the user press Ctrl + Space, to show Intelissense (Autocomplete)
        monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: function (model) {
                // Get new autoComplete list for the current content
                AutoCompleteSingleton.getInstance()
                    .parseAutoCompleteValues(language, model.getValue());
                return AutoCompleteSingleton.getInstance().autoCompleteValues[language.toString()];
            },
        });
    };
    /**
     * Parse the content passed in param for the language passed in param
     * @param language
     * @param content
     */
    AutoCompleteSingleton.prototype.parseAutoCompleteValues = function (language, content) {
        switch (language) {
            case IEditorLanguage.XML:
                return this._parseXmlAutoComplete(content);
            case IEditorLanguage.JSON:
                return this._parseJsonAutoComplete(content);
            default:
                return [];
        }
    };
    /**
     * Parse the XML content and add all tags in AutoComplete for XML Language
     * @param content
     */
    AutoCompleteSingleton.prototype._parseXmlAutoComplete = function (content) {
        var tempList = [];
        var parser = new DOMParser();
        var tags = parser.parseFromString(content, 'text/xml').getElementsByTagName('*');
        var _loop_1 = function (i) {
            // Add TAG only if it not already existing in autoComplete list and in tempList
            if (!this_1._autoCompleteValues[IEditorLanguage.XML]
                .find(function (obj) { return obj.label === tags[i].tagName; })
                && !tempList.find(function (obj) { return obj.label === tags[i].tagName; })) {
                // Create autoComplete object
                var obj = new AutoCompleteItem()
                    .setLabel(tags[i].tagName)
                    .setKind(monaco.languages.CompletionItemKind.Function)
                    .setDocumentation('')
                    .setInsertText("<" + tags[i].tagName + "><" + tags[i].tagName + ">");
                tempList.push(obj);
            }
        };
        var this_1 = this;
        for (var i = 0; i < tags.length; i++) {
            _loop_1(i);
        }
        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.XML.toString()] =
                this._autoCompleteValues[IEditorLanguage.XML.toString()].concat(tempList);
        }
        return tempList;
    };
    AutoCompleteSingleton.prototype._parseJsonAutoComplete = function (content) {
        /* tslint:disable-next-line */
        var regex = /(?:\'|\')([^']*)(?:\'|\')(?=:)(?:\:\s*)(?:\'|\')?(true|false|[0-9a-zA-Z\+\-\,\.\$]*)/g;
        var tempList = [];
        var m;
        while ((m = regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // Add Element only if it not already existing in autoComplete list and in tempList
            if (m[1] && !this._autoCompleteValues[IEditorLanguage.JSON]
                .find(function (obj) { return obj.label === m[1]; })
                && !tempList.find(function (obj) { return obj.label === m[1]; })) {
                var obj = new AutoCompleteItem()
                    .setLabel(m[1])
                    .setKind(monaco.languages.CompletionItemKind.Value)
                    .setDocumentation('')
                    .setInsertText("'" + m[1] + "':");
                tempList.push(obj);
            }
        }
        // Add tempList list in the _autoCompleteValues, to maintain a list updated
        if (tempList.length > 0) {
            this._autoCompleteValues[IEditorLanguage.JSON.toString()] =
                this._autoCompleteValues[IEditorLanguage.JSON.toString()].concat(tempList);
        }
        return tempList;
    };
    AutoCompleteSingleton._instance = null;
    return AutoCompleteSingleton;
}());
export { AutoCompleteSingleton };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXNpbmdsZXRvbi1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tb25hY28tZWRpdG9yL2F1dG9jb21wbGV0ZS1zaW5nbGV0b24tbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBSXhEOztHQUVHO0FBQ0g7SUFrQkk7UUFGUSx3QkFBbUIsR0FBMkMsRUFBRSxDQUFDO0lBSXpFLENBQUM7SUFuQkQ7O09BRUc7SUFDSSxpQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUU7WUFDbEMscUJBQXFCLENBQUMsU0FBUyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztTQUNqRTtRQUNELE9BQU8scUJBQXFCLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFRCxzQkFBSSxxREFBa0I7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQVNEOzs7T0FHRztJQUNILGdEQUFnQixHQUFoQixVQUFpQixRQUF5QjtRQUN0QyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtZQUMvQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRW5ELDRGQUE0RjtRQUM1RixNQUFNLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLFFBQVEsRUFBRTtZQUN0RCxzQkFBc0IsRUFBRSxVQUFVLEtBQVU7Z0JBQ3hDLG9E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Q0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hGO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQXRIYywrQkFBUyxHQUFpQyxJQUFJLENBQUM7SUF1SGxFLDRCQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0F0SVkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0F1dG9Db21wbGV0ZUl0ZW19IGZyb20gJy4vYXV0by1jb21wbGV0ZS1pdGVtLW1vZGVsJztcbmltcG9ydCB7SUVkaXRvckxhbmd1YWdlfSBmcm9tICcuL2VkaXRvci1sYW5ndWFnZS1tb2RlbCc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBhbnk7XG5cbi8qKlxuICogTWFuYWdlIHRoZSBhdXRvQ29tcGxldGlvbiBmb3IgYWxsIGluc3RhbmNlcyBvZiB0aGUgZWRpdG9yc1xuICovXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlU2luZ2xldG9uIHtcbiAgICAvKipcbiAgICAgKiBXZSB1c2UgYSBzaW5nbGV0b24sIGJlY2F1c2UgdGhpcyBjbGFzcyBjYW4gYmUgY2FsbCBmcm9tIGFsbCB0aGUgTW9uYWNvIEVkaXRvciBDb21wb25lbnRzXG4gICAgICovXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAoIUF1dG9Db21wbGV0ZVNpbmdsZXRvbi5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5faW5zdGFuY2UgPSBuZXcgQXV0b0NvbXBsZXRlU2luZ2xldG9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5faW5zdGFuY2U7XG4gICAgfVxuXG4gICAgZ2V0IGF1dG9Db21wbGV0ZVZhbHVlcygpOiB7W3A6IHN0cmluZ106IEF1dG9Db21wbGV0ZUl0ZW1bXX0ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQXV0b0NvbXBsZXRlU2luZ2xldG9uIHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfYXV0b0NvbXBsZXRlVmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IEF1dG9Db21wbGV0ZUl0ZW1bXTsgfSA9IHt9O1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgYXV0b0NvbXBsZXRlIGZvciBsYW5ndWFnZSBwYXNzZWQgaW4gcGFyYW0gaWYgaXMgbm90IGFscmVhZHkgZG9uZS5cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VcbiAgICAgKi9cbiAgICBpbml0QXV0b0NvbXBsZXRlKGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tsYW5ndWFnZS50b1N0cmluZygpXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW2xhbmd1YWdlLnRvU3RyaW5nKCldID0gW107XG5cbiAgICAgICAgLy8gVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSB1c2VyIHByZXNzIEN0cmwgKyBTcGFjZSwgdG8gc2hvdyBJbnRlbGlzc2Vuc2UgKEF1dG9jb21wbGV0ZSlcbiAgICAgICAgbW9uYWNvLmxhbmd1YWdlcy5yZWdpc3RlckNvbXBsZXRpb25JdGVtUHJvdmlkZXIobGFuZ3VhZ2UsIHtcbiAgICAgICAgICAgIHByb3ZpZGVDb21wbGV0aW9uSXRlbXM6IGZ1bmN0aW9uIChtb2RlbDogYW55KSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IG5ldyBhdXRvQ29tcGxldGUgbGlzdCBmb3IgdGhlIGN1cnJlbnQgY29udGVudFxuICAgICAgICAgICAgICAgIEF1dG9Db21wbGV0ZVNpbmdsZXRvbi5nZXRJbnN0YW5jZSgpXG4gICAgICAgICAgICAgICAgICAucGFyc2VBdXRvQ29tcGxldGVWYWx1ZXMobGFuZ3VhZ2UsIG1vZGVsLmdldFZhbHVlKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBdXRvQ29tcGxldGVTaW5nbGV0b24uZ2V0SW5zdGFuY2UoKS5hdXRvQ29tcGxldGVWYWx1ZXNbbGFuZ3VhZ2UudG9TdHJpbmcoKV07XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSB0aGUgY29udGVudCBwYXNzZWQgaW4gcGFyYW0gZm9yIHRoZSBsYW5ndWFnZSBwYXNzZWQgaW4gcGFyYW1cbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VcbiAgICAgKiBAcGFyYW0gY29udGVudFxuICAgICAqL1xuICAgIHBhcnNlQXV0b0NvbXBsZXRlVmFsdWVzKGxhbmd1YWdlOiBJRWRpdG9yTGFuZ3VhZ2UsIGNvbnRlbnQ6IHN0cmluZyk6IEF1dG9Db21wbGV0ZUl0ZW1bXSB7XG4gICAgICAgIHN3aXRjaCAobGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGNhc2UgSUVkaXRvckxhbmd1YWdlLlhNTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VYbWxBdXRvQ29tcGxldGUoY29udGVudCk7XG4gICAgICAgICAgICBjYXNlIElFZGl0b3JMYW5ndWFnZS5KU09OOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJzZUpzb25BdXRvQ29tcGxldGUoY29udGVudCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhcnNlIHRoZSBYTUwgY29udGVudCBhbmQgYWRkIGFsbCB0YWdzIGluIEF1dG9Db21wbGV0ZSBmb3IgWE1MIExhbmd1YWdlXG4gICAgICogQHBhcmFtIGNvbnRlbnRcbiAgICAgKi9cbiAgICBwcml2YXRlIF9wYXJzZVhtbEF1dG9Db21wbGV0ZShjb250ZW50OiBzdHJpbmcpOiBBdXRvQ29tcGxldGVJdGVtW10ge1xuICAgICAgICBsZXQgdGVtcExpc3Q6IEF1dG9Db21wbGV0ZUl0ZW0gW10gPSBbXTtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgbGV0IHRhZ3MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGNvbnRlbnQsICd0ZXh0L3htbCcpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBBZGQgVEFHIG9ubHkgaWYgaXQgbm90IGFscmVhZHkgZXhpc3RpbmcgaW4gYXV0b0NvbXBsZXRlIGxpc3QgYW5kIGluIHRlbXBMaXN0XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICF0aGlzLl9hdXRvQ29tcGxldGVWYWx1ZXNbSUVkaXRvckxhbmd1YWdlLlhNTF1cbiAgICAgICAgICAgICAgICAuZmluZChvYmogPT4gb2JqLmxhYmVsID09PSB0YWdzW2ldLnRhZ05hbWUpXG4gICAgICAgICAgICAgICYmICF0ZW1wTGlzdC5maW5kKG9iaiA9PiBvYmoubGFiZWwgPT09IHRhZ3NbaV0udGFnTmFtZSlcbiAgICAgICAgICAgICkge1xuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGF1dG9Db21wbGV0ZSBvYmplY3RcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gbmV3IEF1dG9Db21wbGV0ZUl0ZW0oKVxuICAgICAgICAgICAgICAgICAgICAuc2V0TGFiZWwodGFnc1tpXS50YWdOYW1lKVxuICAgICAgICAgICAgICAgICAgICAuc2V0S2luZChtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbilcbiAgICAgICAgICAgICAgICAgICAgLnNldERvY3VtZW50YXRpb24oJycpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJbnNlcnRUZXh0KGA8JHt0YWdzW2ldLnRhZ05hbWV9Pjwke3RhZ3NbaV0udGFnTmFtZX0+YCk7XG5cbiAgICAgICAgICAgICAgICB0ZW1wTGlzdC5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGVtcExpc3QgbGlzdCBpbiB0aGUgX2F1dG9Db21wbGV0ZVZhbHVlcywgdG8gbWFpbnRhaW4gYSBsaXN0IHVwZGF0ZWRcbiAgICAgICAgaWYgKHRlbXBMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuWE1MLnRvU3RyaW5nKCldID1cbiAgICAgICAgICAgICAgdGhpcy5fYXV0b0NvbXBsZXRlVmFsdWVzW0lFZGl0b3JMYW5ndWFnZS5YTUwudG9TdHJpbmcoKV0uY29uY2F0KHRlbXBMaXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZW1wTGlzdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYXJzZUpzb25BdXRvQ29tcGxldGUoY29udGVudDogc3RyaW5nKTogQXV0b0NvbXBsZXRlSXRlbVtdIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gICAgICAgIGNvbnN0IHJlZ2V4ID0gLyg/OlxcJ3xcXCcpKFteJ10qKSg/OlxcJ3xcXCcpKD89OikoPzpcXDpcXHMqKSg/OlxcJ3xcXCcpPyh0cnVlfGZhbHNlfFswLTlhLXpBLVpcXCtcXC1cXCxcXC5cXCRdKikvZztcbiAgICAgICAgbGV0IHRlbXBMaXN0OiBBdXRvQ29tcGxldGVJdGVtIFtdID0gW107XG4gICAgICAgIGxldCBtOiBhbnk7XG5cbiAgICAgICAgd2hpbGUgKChtID0gcmVnZXguZXhlYyhjb250ZW50KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGF2b2lkIGluZmluaXRlIGxvb3BzIHdpdGggemVyby13aWR0aCBtYXRjaGVzXG4gICAgICAgICAgICBpZiAobS5pbmRleCA9PT0gcmVnZXgubGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmVnZXgubGFzdEluZGV4Kys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFkZCBFbGVtZW50IG9ubHkgaWYgaXQgbm90IGFscmVhZHkgZXhpc3RpbmcgaW4gYXV0b0NvbXBsZXRlIGxpc3QgYW5kIGluIHRlbXBMaXN0XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG1bMV0gJiYgIXRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuSlNPTl1cbiAgICAgICAgICAgICAgICAuZmluZChvYmogPT4gb2JqLmxhYmVsID09PSBtWzFdKVxuICAgICAgICAgICAgICAgICYmICF0ZW1wTGlzdC5maW5kKG9iaiA9PiBvYmoubGFiZWwgPT09IG1bMV0pXG4gICAgICAgICAgICApIHtcblxuICAgICAgICAgICAgICAgIGxldCBvYmogPSBuZXcgQXV0b0NvbXBsZXRlSXRlbSgpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRMYWJlbChtWzFdKVxuICAgICAgICAgICAgICAgICAgICAuc2V0S2luZChtb25hY28ubGFuZ3VhZ2VzLkNvbXBsZXRpb25JdGVtS2luZC5WYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgLnNldERvY3VtZW50YXRpb24oJycpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRJbnNlcnRUZXh0KGAnJHttWzFdfSc6YCk7XG5cbiAgICAgICAgICAgICAgICB0ZW1wTGlzdC5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGVtcExpc3QgbGlzdCBpbiB0aGUgX2F1dG9Db21wbGV0ZVZhbHVlcywgdG8gbWFpbnRhaW4gYSBsaXN0IHVwZGF0ZWRcbiAgICAgICAgaWYgKHRlbXBMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuSlNPTi50b1N0cmluZygpXSA9XG4gICAgICAgICAgICAgIHRoaXMuX2F1dG9Db21wbGV0ZVZhbHVlc1tJRWRpdG9yTGFuZ3VhZ2UuSlNPTi50b1N0cmluZygpXS5jb25jYXQodGVtcExpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRlbXBMaXN0O1xuICAgIH1cbn1cbiJdfQ==