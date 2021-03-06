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
/**
 * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
 * @param event The drop event.
 * @param fbService The AjfFormBuilderService.
 * @param nodeEntry The current nodeEntry, if present.
 * @param content True if the current nodeEntry contains other nodeEntries.
 */
export function onDropProcess(event, fbService, nodeEntry, content = false) {
    const itemData = event.item.data;
    const containerId = event.container.id;
    if (!itemData.node) {
        if (nodeEntry == null && containerId === 'slides-list') {
            fbService.insertNode(itemData, null, 0, content, event.currentIndex);
            return;
        }
        const emptySlot = content ? { parent: nodeEntry.node, parentNode: 0 } :
            nodeEntry;
        fbService.insertNode(itemData, emptySlot.parent, emptySlot.parentNode, content, event.currentIndex);
        return;
    }
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    fbService.moveNodeEntry(event.item.data, previousIndex, currentIndex);
}
/**
 * Disables the drag&drop of Slide items.
 * @param item The dragged item.
 */
export function disableSlideDropPredicate(item) {
    return !item.data.isSlide;
}
/**
 * Disables the drag&drop of Field items.
 * @param item The dragged item.
 */
export function disableFieldDropPredicate(item) {
    if (!item.data.isSlide) {
        return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9mb3JtLWJ1aWxkZXItdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBV0g7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FDekIsS0FBb0YsRUFDcEYsU0FBZ0MsRUFDaEMsU0FBa0MsRUFDbEMsT0FBTyxHQUFHLEtBQUs7SUFFakIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7SUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFdBQVcsS0FBSyxhQUFhLEVBQUU7WUFDdEQsU0FBUyxDQUFDLFVBQVUsQ0FDaEIsUUFBUSxFQUNSLElBQVcsRUFDWCxDQUFDLEVBQ0QsT0FBTyxFQUNQLEtBQUssQ0FBQyxZQUFZLENBQ3JCLENBQUM7WUFDRixPQUFPO1NBQ1I7UUFDRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUE0QixTQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQzNDLFNBQVMsQ0FBQztRQUMvRCxTQUFTLENBQUMsVUFBVSxDQUNoQixRQUF1QyxFQUN2QyxTQUFTLENBQUMsTUFBTSxFQUNoQixTQUFTLENBQUMsVUFBVSxFQUNwQixPQUFPLEVBQ1AsS0FBSyxDQUFDLFlBQVksQ0FDckIsQ0FBQztRQUNGLE9BQU87S0FDUjtJQUNELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUN4QyxTQUFTLENBQUMsYUFBYSxDQUEwQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDakcsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxJQUEwQztJQUNsRixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDNUIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxJQUEwQztJQUNsRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDdEIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBamZGb3JtQnVpbGRlckVtcHR5U2xvdCxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlLFxuICBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlclNlcnZpY2UsXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIFRyaWdnZXJzIHdoZW4gYSBmaWVsZCBvciBzbGlkZSBub2RlIGlzIG1vdmVkIG9yIGluc2VydGVkIGJ5IGRyYWcmZHJvcHBpbmcgaW4gdGhlIGZvcm1idWlsZGVyLlxuICogQHBhcmFtIGV2ZW50IFRoZSBkcm9wIGV2ZW50LlxuICogQHBhcmFtIGZiU2VydmljZSBUaGUgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLlxuICogQHBhcmFtIG5vZGVFbnRyeSBUaGUgY3VycmVudCBub2RlRW50cnksIGlmIHByZXNlbnQuXG4gKiBAcGFyYW0gY29udGVudCBUcnVlIGlmIHRoZSBjdXJyZW50IG5vZGVFbnRyeSBjb250YWlucyBvdGhlciBub2RlRW50cmllcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uRHJvcFByb2Nlc3MoXG4gICAgZXZlbnQ6IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnxDZGtEcmFnRHJvcDxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+LFxuICAgIGZiU2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlfG51bGwsXG4gICAgY29udGVudCA9IGZhbHNlLFxuICAgICk6IHZvaWQge1xuICBjb25zdCBpdGVtRGF0YSA9IGV2ZW50Lml0ZW0uZGF0YTtcbiAgY29uc3QgY29udGFpbmVySWQgPSBldmVudC5jb250YWluZXIuaWQ7XG4gIGlmICghaXRlbURhdGEubm9kZSkge1xuICAgIGlmIChub2RlRW50cnkgPT0gbnVsbCAmJiBjb250YWluZXJJZCA9PT0gJ3NsaWRlcy1saXN0Jykge1xuICAgICAgZmJTZXJ2aWNlLmluc2VydE5vZGUoXG4gICAgICAgICAgaXRlbURhdGEsXG4gICAgICAgICAgbnVsbCBhcyBhbnksXG4gICAgICAgICAgMCxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRJbmRleCxcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGVtcHR5U2xvdCA9IGNvbnRlbnQgPyB7cGFyZW50OiAoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pm5vZGVFbnRyeSkubm9kZSwgcGFyZW50Tm9kZTogMH0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q+bm9kZUVudHJ5O1xuICAgIGZiU2VydmljZS5pbnNlcnROb2RlKFxuICAgICAgICBpdGVtRGF0YSBhcyBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gICAgICAgIGVtcHR5U2xvdC5wYXJlbnQsXG4gICAgICAgIGVtcHR5U2xvdC5wYXJlbnROb2RlLFxuICAgICAgICBjb250ZW50LFxuICAgICAgICBldmVudC5jdXJyZW50SW5kZXgsXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcHJldmlvdXNJbmRleCA9IGV2ZW50LnByZXZpb3VzSW5kZXg7XG4gIGNvbnN0IGN1cnJlbnRJbmRleCA9IGV2ZW50LmN1cnJlbnRJbmRleDtcbiAgZmJTZXJ2aWNlLm1vdmVOb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PmV2ZW50Lml0ZW0uZGF0YSwgcHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4KTtcbn1cblxuLyoqXG4gKiBEaXNhYmxlcyB0aGUgZHJhZyZkcm9wIG9mIFNsaWRlIGl0ZW1zLlxuICogQHBhcmFtIGl0ZW0gVGhlIGRyYWdnZWQgaXRlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTbGlkZURyb3BQcmVkaWNhdGUoaXRlbTogQ2RrRHJhZzxBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnk+KTogYm9vbGVhbiB7XG4gIHJldHVybiAhaXRlbS5kYXRhLmlzU2xpZGU7XG59XG5cbi8qKlxuICogRGlzYWJsZXMgdGhlIGRyYWcmZHJvcCBvZiBGaWVsZCBpdGVtcy5cbiAqIEBwYXJhbSBpdGVtIFRoZSBkcmFnZ2VkIGl0ZW0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlRmllbGREcm9wUHJlZGljYXRlKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICBpZiAoIWl0ZW0uZGF0YS5pc1NsaWRlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuIl19