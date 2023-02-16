interface contentsData {
    type: string;
    label: string;
    callback: null | Function;
}

class Context {
    context: HTMLDivElement;
    isVisible: boolean;

    constructor(targetSelector: string, contents = []) {
        const style = document.createElement("style");
        style.textContent = `
:root {
    --text-color: #333333;
    --background-color: rgba(255, 255, 255, 0.7);
    --corner-radius: 0.25em;
    --font-family: sans-serif;
}

@media (prefers-color-scheme: dark) {
    :root {
        --text-color: white;
        --background-color: rgba(51, 51, 51, 0.7);
    }
}

.modern-context-js-outer {
    background: var(--background-color);
    position: absolute;
    border-radius: var(--corner-radius);
    box-shadow: 0.1em 0.1em 0.75em rgba(0, 0, 0, 0.3);
    padding: 0.5em 0;
    display: none;
    overflow: hidden;
    transition: 0.3s cubic-bezier(0.5, 0, 0, 1);
    cursor: default;
    user-select: none;
    backdrop-filter: blur(0.25em);
    font-family: var(--font-family);
}

.modern-context-js-outer hr {
    width: calc(100% - 2em);
    height: 0.1em;
    background: var(--text-color);
    border: none;
    margin: 0.25em 1em;
    opacity: 0.5;
}

.modern-context-js-outer .context-item {
    width: 100%;
    padding: 0.5em 1em;
    color: var(--text-color);
    box-sizing: border-box;
    position: relative;
}

.modern-context-js-outer .context-item::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    transition: 0.1s;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--text-color);
    opacity: 0;
}

.modern-context-js-outer .context-item.hover::before {
    opacity: 0.15;
}

.modern-context-js-outer .context-item .context-item-inner {
    transition: 0.1s;
}

.modern-context-js-outer .context-item:active .context-item-inner {
    transform: scale(0.9);
}
        `;
        document.body.appendChild(style);

        this.context = document.createElement("div");
        this.context.className = "modern-context-js-outer";
        document.body.appendChild(this.context);

        this.addContents(contents);

        document.querySelectorAll(targetSelector).forEach((target) => {
            target.addEventListener("contextmenu", (event: any) => {
                this.open(event);
                event.preventDefault();
            });
        });

        document.addEventListener(
            "click",
            (event) => {
                if (event.target !== this.context) this.close();
            },
            false
        );

        document.addEventListener("keydown", this.watchKeydown.bind(this), false);
        this.isVisible = false;
    }

    addItem(label: string, callback: Function = () => {}) {
        const item = document.createElement("div");
        item.className = "context-item";
        item.addEventListener("click", () => {
            callback();
        });
        item.addEventListener("mouseover", () => {
            this.hover(item);
        });
        item.addEventListener("mouseleave", () => {
            this.resetAllHoverStatus();
        });

        const inner = document.createElement("div");
        inner.className = "context-item-inner";
        inner.textContent = label;

        item.appendChild(inner);
        this.context.appendChild(item);
    }

    addSeparator() {
        this.context.appendChild(document.createElement("hr"));
    }

    addContents(contents: Array<contentsData>) {
        for (let i = 0; i < contents.length; i++) {
            const content = contents[i];

            const types = ["item", "separator"];

            if (types.includes(content.type) === false) continue;

            switch (content.type) {
                case "item":
                    const item = {
                        ...{
                            label: "",
                            callback: () => {}
                        },
                        ...content
                    };
                    if (item.callback) this.addItem(item.label, item.callback);
                    else this.addItem(item.label);
                    break;

                case "separator":
                    this.addSeparator();
                    break;
            }
        }
    }

    open(event: MouseEvent) {
        const contextShowTransitionMs = 300;
        this.context.style.transition = "none";

        if (event.screenY < window.innerHeight / 2) {
            this.context.style.bottom = "auto";
            this.context.style.top = `${event.pageY}px`;
        } else {
            this.context.style.top = "auto";
            this.context.style.bottom = `${window.innerHeight - event.pageY}px`;
        }

        if (event.screenX < window.innerWidth / 2) {
            this.context.style.right = "auto";
            this.context.style.left = `${event.pageX}px`;
        } else {
            this.context.style.left = "auto";
            this.context.style.right = `${window.innerWidth - event.pageX}px`;
        }

        this.context.style.display = "block";

        const contextHeight = window.getComputedStyle(this.context).getPropertyValue("height");
        this.context.style.height = "0";
        this.context.style.transition = `${contextShowTransitionMs}ms`;

        setTimeout(() => {
            this.context.style.height = `${contextHeight}`;

            setTimeout(() => {
                this.context.style.height = "auto";
            }, contextShowTransitionMs);
        }, 1);

        this.isVisible = true;
    }

    close() {
        this.context.style.display = "none";

        this.resetAllHoverStatus();
        this.isVisible = false;
    }

    private watchKeydown(keyEvent: KeyboardEvent) {
        if (this.isVisible === false) return;

        const currentSelectedItem: HTMLElement =
            this.context.querySelector(".context-item.hover") || this.context.querySelector(".context-item")!;
        const numberOfItems = this.context.querySelectorAll(".context-item").length;
        const hoveredItemIndex = this.hoveredItemIndex();

        switch (keyEvent.key) {
            case "Escape":
                const div = document.createElement("div");
                div.style.display = "none";
                document.body.appendChild(div);
                div.click();
                div.remove();
                break;

            case "ArrowDown":
                if (hoveredItemIndex === null) this.hover(0);
                else this.hover(hoveredItemIndex + 1 < numberOfItems ? hoveredItemIndex + 1 : 0);

                break;

            case "ArrowUp":
                if (hoveredItemIndex === null) this.hover(numberOfItems - 1);
                else this.hover(hoveredItemIndex - 1 >= 0 ? hoveredItemIndex - 1 : numberOfItems - 1);

                break;

            case "Enter":
                currentSelectedItem.click();
                break;
        }

        keyEvent.preventDefault();
    }

    private resetAllHoverStatus() {
        this.context.querySelectorAll(".context-item.hover").forEach((element) => {
            element.classList.remove("hover");
        });
    }

    private hover(item: number | HTMLElement) {
        this.resetAllHoverStatus();

        if (typeof item == "number") {
            this.context.querySelectorAll(".context-item").item(item).classList.add("hover");
        } else if (typeof item === "object") {
            item.classList.add("hover");
        }
    }

    private hoveredItemIndex() {
        const hoveredItem = this.context.querySelector(".context-item.hover");
        const contextItems = this.context.querySelectorAll(".context-item");
        if (!hoveredItem) {
            return null;
        }
        for (let i = 0; i < contextItems.length; i++) {
            if (hoveredItem === contextItems[i]) return i;
        }
        return null;
    }
}

export { Context };
