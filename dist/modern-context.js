/*!
 * modernContext.js v1.1.0
 *
 * Copyright (c) 2023 Robot-Inventor
 *
 * Released under the MIT License.
 * See the LICENSE file in the root directory.
 */
/**
 * Create and control the context menu.
 */
class Context {
    context;
    isVisible;
    allItems;
    hoveredItemIndex;
    CLASS_NAMES = {
        OUTER: "mc-context",
        ITEM: "mc-context-item",
        ITEM_INNER: "mc-context-item-inner"
    };
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
    constructor(targetSelector, contents) {
        this.allItems = [];
        this.hoveredItemIndex = null;
        const style = document.createElement("style");
        style.textContent = `
.${this.CLASS_NAMES.OUTER} {
    --mc-text-color-private: var(--mc-text-color, #333333);
    --mc-background-color-private: var(--mc-background-color, rgba(255, 255, 255, 0.7));
    --mc-corner-radius-private: var(--mc-corner-radius, 0.25em);
    --mc-font-family-private: var(--mc-font-family, sans-serif);

    background: var(--mc-background-color-private);
    position: absolute;
    border-radius: var(--mc-corner-radius-private);
    filter: drop-shadow(0.25em 0.25em 0.5em rgba(0, 0, 0, 0.2));
    padding: 0.5em 0;
    display: none;
    overflow: hidden;
    transition: 0.3s cubic-bezier(0.5, 0, 0, 1);
    cursor: default;
    user-select: none;
    backdrop-filter: blur(0.25em);
    font-family: var(--mc-font-family-private);
}

@media (prefers-color-scheme: dark) {
    .${this.CLASS_NAMES.OUTER} {
        --mc-text-color-private: var(--mc-text-color, white);
        --mc-background-color-private: var(--mc-background-color, rgba(51, 51, 51, 0.7));
    }
}

.${this.CLASS_NAMES.OUTER} hr {
    width: calc(100% - 2em);
    height: 0.1em;
    background: var(--mc-text-color-private);
    border: none;
    margin: 0.25em 1em;
    opacity: 0.5;
}

.${this.CLASS_NAMES.OUTER} .${this.CLASS_NAMES.ITEM} {
    width: 100%;
    padding: 0.5em 1em;
    color: var(--mc-text-color-private);
    box-sizing: border-box;
    position: relative;
}

.${this.CLASS_NAMES.OUTER} .${this.CLASS_NAMES.ITEM}::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    transition: 0.1s;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--mc-text-color-private);
    opacity: 0;
}

.${this.CLASS_NAMES.OUTER} .${this.CLASS_NAMES.ITEM}.hover::before {
    opacity: 0.15;
}

.${this.CLASS_NAMES.OUTER} .${this.CLASS_NAMES.ITEM} .${this.CLASS_NAMES.ITEM_INNER} {
    transition: 0.1s;
}

.${this.CLASS_NAMES.OUTER} .${this.CLASS_NAMES.ITEM}:active .${this.CLASS_NAMES.ITEM_INNER} {
    transform: scale(0.9);
}
        `;
        document.body.appendChild(style);
        this.context = document.createElement("div");
        this.context.className = this.CLASS_NAMES.OUTER;
        document.body.appendChild(this.context);
        if (contents) {
            this.addContents(contents);
        }
        document.querySelectorAll(targetSelector).forEach((target) => {
            target.addEventListener("contextmenu", (event) => {
                this.open(event);
                event.preventDefault();
            });
        });
        document.addEventListener("click", (event) => {
            if (event.target !== this.context)
                this.close();
        }, false);
        document.addEventListener("keydown", (event) => {
            this.watchKeydown(event);
        }, false);
        this.isVisible = false;
    }
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
    addItem(label, callback = () => { }) {
        const item = document.createElement("div");
        item.className = this.CLASS_NAMES.ITEM;
        this.allItems.push(item);
        const indexOfItem = this.allItems.length - 1;
        item.addEventListener("click", () => {
            callback();
        });
        item.addEventListener("mouseover", () => {
            this.hover(indexOfItem);
            this.hoveredItemIndex = indexOfItem;
        });
        item.addEventListener("mouseleave", () => {
            this.resetAllHoverStatus();
        });
        const inner = document.createElement("div");
        inner.className = this.CLASS_NAMES.ITEM_INNER;
        inner.textContent = label;
        item.appendChild(inner);
        this.context.appendChild(item);
    }
    /**
     * Add a new separator to the context menu.
     * @example
     * const context = new Context("#target");
     * context.addItem("ItemA");
     * // Add a separator between itemA and itemB.
     * context.addSeparator();
     * context.addItem("ItemB");
     */
    addSeparator() {
        this.context.appendChild(document.createElement("hr"));
    }
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
    addContents(contents) {
        for (const content of contents) {
            if (content.type === "item") {
                this.addItem(content.label, content.callback);
            }
            else {
                this.addSeparator();
            }
        }
    }
    /**
     * Force the context menu to open without user interaction.
     * @param event Mouse event.
     */
    open(event) {
        const transitionDurationMs = 300;
        const contextStyle = this.context.style;
        contextStyle.transition = "none";
        if (event.screenY < window.innerHeight / 2) {
            contextStyle.bottom = "auto";
            contextStyle.top = `${event.pageY}px`;
        }
        else {
            contextStyle.top = "auto";
            contextStyle.bottom = `${window.innerHeight - event.pageY}px`;
        }
        if (event.screenX < window.innerWidth / 2) {
            contextStyle.right = "auto";
            contextStyle.left = `${event.pageX}px`;
        }
        else {
            contextStyle.left = "auto";
            contextStyle.right = `${window.innerWidth - event.pageX}px`;
        }
        contextStyle.display = "block";
        const contextHeight = window.getComputedStyle(this.context).getPropertyValue("height");
        contextStyle.height = "0px";
        contextStyle.transition = `${transitionDurationMs}ms`;
        // Wait for new transition duration value to be applied.
        setTimeout(() => {
            contextStyle.height = `${contextHeight}`;
            setTimeout(() => {
                contextStyle.height = "auto";
            }, transitionDurationMs);
        }, 1);
        this.isVisible = true;
    }
    /**
     * Force the context menu to close without user interaction.
     */
    close() {
        this.context.style.display = "none";
        this.resetAllHoverStatus();
        this.isVisible = false;
    }
    /**
     * Watch keyboard event to support shortcut key.
     * @param keyEvent Keyboard event.
     */
    watchKeydown(keyEvent) {
        if (this.isVisible === false)
            return;
        switch (keyEvent.key) {
            case "Escape":
                this.close();
                break;
            case "ArrowDown":
                if (this.hoveredItemIndex !== null) {
                    this.hoveredItemIndex++;
                }
                if (this.hoveredItemIndex === this.allItems.length) {
                    this.hoveredItemIndex = 0;
                }
                this.hover();
                break;
            case "ArrowUp":
                const indexOfLastItem = this.allItems.length - 1;
                if (this.hoveredItemIndex === null) {
                    this.hoveredItemIndex = indexOfLastItem;
                }
                else {
                    this.hoveredItemIndex--;
                    if (this.hoveredItemIndex < 0) {
                        this.hoveredItemIndex = indexOfLastItem;
                    }
                }
                this.hover();
                break;
            case "Enter":
                this.allItems[this.hoveredItemIndex || 0].click();
                break;
        }
        keyEvent.preventDefault();
    }
    /**
     * Remove the hover state of all items.
     */
    resetAllHoverStatus() {
        this.context.querySelectorAll(`.${this.CLASS_NAMES.ITEM}.hover`).forEach((element) => {
            element.classList.remove("hover");
        });
        this.hoveredItemIndex = null;
    }
    /**
     * Make the specified item to hover.
     * @param itemIndex Index of the target item. Default value is {@link hoveredItemIndex} || 0.
     */
    hover(itemIndex = this.hoveredItemIndex || 0) {
        this.resetAllHoverStatus();
        this.allItems[itemIndex].classList.add("hover");
        this.hoveredItemIndex = itemIndex;
    }
}
export { Context };
