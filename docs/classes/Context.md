[modernContext.js - v1.1.0](../README.md) / Context

# Class: Context

Create and control the context menu.

## Table of contents

### Constructors

- [constructor](Context.md#constructor)

### Methods

- [addContents](Context.md#addcontents)
- [addItem](Context.md#additem)
- [addSeparator](Context.md#addseparator)
- [close](Context.md#close)
- [open](Context.md#open)

## Constructors

### constructor

• **new Context**(`targetSelector`, `contents?`)

Configure the new context menu.

**`Example`**

```ts
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
    }
];

const context = new Context("#target", contents);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetSelector` | `string` | Element to set the context menu. |
| `contents?` | [`McContents`](../README.md#mccontents) | The contents of the context menu. |

#### Defined in

[modern-context.ts:66](https://github.com/Robot-Inventor/modern-context.js/blob/6ae4d03/src/modern-context.ts#L66)

## Methods

### addContents

▸ **addContents**(`contents`): `void`

Add new contents (clickable items or separators) to the context menu.

**`Example`**

```ts
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
    }
];
context.addContents(contents);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contents` | [`McContents`](../README.md#mccontents) | Contents to add. |

#### Returns

`void`

#### Defined in

[modern-context.ts:248](https://github.com/Robot-Inventor/modern-context.js/blob/6ae4d03/src/modern-context.ts#L248)

___

### addItem

▸ **addItem**(`label`, `callback?`): `void`

Add a new clickable item to the context menu.

**`Example`**

```ts
const context = new Context("#target");
context.addItem("Alert", () => {
    alert("Clicked!")
});
context.addItem("No Callback");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `label` | `string` | Label text. |
| `callback` | `Function` | Callback function. |

#### Returns

`void`

#### Defined in

[modern-context.ts:187](https://github.com/Robot-Inventor/modern-context.js/blob/6ae4d03/src/modern-context.ts#L187)

___

### addSeparator

▸ **addSeparator**(): `void`

Add a new separator to the context menu.

**`Example`**

```ts
const context = new Context("#target");
context.addItem("ItemA");
// Add a separator between itemA and itemB.
context.addSeparator();
context.addItem("ItemB");
```

#### Returns

`void`

#### Defined in

[modern-context.ts:221](https://github.com/Robot-Inventor/modern-context.js/blob/6ae4d03/src/modern-context.ts#L221)

___

### close

▸ **close**(): `void`

Force the context menu to close without user interaction.

#### Returns

`void`

#### Defined in

[modern-context.ts:304](https://github.com/Robot-Inventor/modern-context.js/blob/6ae4d03/src/modern-context.ts#L304)

___

### open

▸ **open**(`event`): `void`

Force the context menu to open without user interaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `MouseEvent` | Mouse event. |

#### Returns

`void`

#### Defined in

[modern-context.ts:262](https://github.com/Robot-Inventor/modern-context.js/blob/6ae4d03/src/modern-context.ts#L262)
