# ModernContext.js

[日本語](README_ja.md)

A modern, beautiful, and lightweight context menu JavaScript library inspired by Fluent Design.

![screenshot](screenshot_light.png)

## Dark Mode Support

ModernContext.js supports dark mode. If your browser is set to dark mode, the context menu will automatically switch to the black-based design.

![screenshot](screenshot_dark.png)

## Supported Browsers

The following browsers are supported. ModernContext.js may work in other modern browsers, but I tested only the following browsers.

- Google Chrome
- Firefox
- Microsoft Edge

Note: Firefox does not currently supports CSS ``backdrop-filter`` property, so the blur effect behind of the context is not active if you are using Firefox.

## Usage

```javascript
const context = new Context("#target");

context.add_item("Alert", () => {
    alert("Clicked!")
});
context.add_separator();
context.add_item("No Callback");
```

The following code will have the same behavior.

```javascript
const context = new Context("#target");

const contents = [
    {
        type: "item",
        label: "Alert",
        callback: () => {
            alert("Clicked!");
        }
    },
    {
        type: "separator"
    },
    {
        type: "item",
        label: "No Callback"
    },
];

context.add_contents(contents);
```

And you can also write the following.

```javascript
const contents = [
    {
        type: "item",
        label: "Alert",
        callback: () => {
            alert("Clicked!");
        }
    },
    {
        type: "separator"
    },
    {
        type: "item",
        label: "No Callback"
    },
];

const context = new Context("#target", contents);
```

### Arguments

#### Context()

|Name|Value Type|Default|Description|
|--:|--:|--:|--:|
|target_selector|String|N/A|CSS selector of the target element.|
|contents|Array|[ ]|The contents of the context menu. This argument is optional. For more detail, see ``add_contents()``.|

#### add_item()

Add a item to the context menu.

|Name|Value Type|Default|Description|
|--:|--:|--:|--:|
|label|String|N/A|The label of the item.|
|callback|Function|() => {}|When the user select the item, this function will be called.|

#### add_separator()

Add a separator to the context menu. This function has no arguments.

#### add_contents()

Add item(s) or separator(s) to the context menu.

|Name|Value Type|Default|Description|
|--:|--:|--:|--:|
|contents|Array of Object|N/A|Array of contents you want to add to the context menu.|

##### Example of add_contents()

```javascript
const context = new Context();

const contents = [
    {
        type: "item",
        label: "Alert",
        callback: () => {
            alert("Clicked!");
        }
    },
    {
        type: "separator"
    },
    {
        type: "item",
        label: "No Callback"
    },
];

context.add_contents(contents);
```

#### open()

Open the context menu. Since the process of opening the context menu by right-clicking is handled by the library, you should not need to use this function.

|Name|Value Type|Default|Description|
|--:|--:|--:|--:|
|event|MouseEvent|N/A|Mouse event.|

#### close()

Close the context menu. Since the process of closing the opened context menu in response to a user operation is handled by the library, you should not need to use this function. This function has no arguments.

### CSS Custom Properties

|Property|Default|Description|
|--:|--:|--:|
|--text_color|``#333333`` (``white`` in dark mode)|Text color in the context menu.|
|--background_color|``rgba(255, 255, 255, 0.7)`` (``rgba(51, 51, 51, 0.7)`` in dark mode)|Background color of the context menu.|
|--corner-radius|``0.25em``|Corner radius size of the context menu.|
|--font-family|``sans-serif``|Font family of text.|
