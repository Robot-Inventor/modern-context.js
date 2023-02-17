/*!
 * modernContext.js v1.1.0
 *
 * Copyright (c) 2023 Robot-Inventor
 *
 * Released under the MIT License.
 * See the LICENSE file in the root directory.
 */
/**
 * Type of context menu contents.
 */
type ContentsData = {
    type: string;
    label: string;
    callback: null | Function;
}[];
/**
 * Create and control the context menu.
 */
declare class Context {
    private context;
    private isVisible;
    /**
     * Configure the new context menu.
     * @param targetSelector Element to set the context menu.
     * @param contents The contents of the context menu.
     * @example
     * const contents = [
     *     {
     *         type: "item",
     *         label: "Alert",
     *         callback: () => {
     *             alert("Clicked!");
     *         }
     *     },
     *     {
     *         type: "separator"
     *     },
     *     {
     *         type: "item",
     *         label: "No Callback"
     *     }
     * ];
     *
     * const context = new Context("#target", contents);
     */
    constructor(targetSelector: string, contents?: ContentsData);
    /**
     * Add a new clickable item to the context menu.
     * @param label Label text.
     * @param callback Callback function.
     * @example
     * const context = new Context("#target");
     * context.addItem("Alert", () => {
     *     alert("Clicked!")
     * });
     * context.addItem("No Callback");
     */
    addItem(label: string, callback?: Function): void;
    /**
     * Add a new separator to the context menu.
     * @example
     * const context = new Context("#target");
     * context.addItem("ItemA");
     * // Add a separator between itemA and itemB.
     * context.addSeparator();
     * context.addItem("ItemB");
     */
    addSeparator(): void;
    /**
     * Add new contents (clickable items or separators) to the context menu.
     * @param contents Contents to add.
     * @example
     * const context = new Context("#target");
     * const contents = [
     *     {
     *         type: "item",
     *         label: "Alert",
     *         callback: () => {
     *             alert("Clicked!");
     *         }
     *     },
     *     {
     *         type: "separator"
     *     },
     *     {
     *         type: "item",
     *         label: "No Callback"
     *     }
     * ];
     * context.addContents(contents);
     */
    addContents(contents: ContentsData): void;
    /**
     * Force the context menu to open without user interaction.
     * @param event Mouse event.
     */
    open(event: MouseEvent): void;
    /**
     * Force the context menu to close without user interaction.
     */
    close(): void;
    /**
     * Watch keyboard event to support shortcut key.
     * @param keyEvent Keyboard event.
     */
    private watchKeydown;
    /**
     * Remove the hover state of all items.
     */
    private resetAllHoverStatus;
    /**
     * Make the specified item to hover.
     * @param item The target item itself or an index of the item.
     */
    private hover;
    /**
     * Get the index of hovered item.
     * @returns The index of hovered item.
     */
    private hoveredItemIndex;
}
export { Context, ContentsData };
