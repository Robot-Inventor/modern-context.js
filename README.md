# ModernContext.js

A modern, beautiful, and lightweight context menu JavaScript library inspired by Fluent Design.

![screenshot](https://github.com/Robot-Inventor/modern-context.js/blob/main/picture/screenshot_light.png)

## Dark Mode Support

ModernContext.js supports dark mode. If your browser is set to dark mode, the context menu will automatically switch to the black-based design.

![screenshot](https://github.com/Robot-Inventor/modern-context.js/blob/main/picture/screenshot_dark.png)

## Supported Browsers

The following browsers are supported. ModernContext.js may work in other modern browsers, but I tested only the following browsers.

- Google Chrome
- Firefox
- Microsoft Edge

## Usage

See the [documentation](https://github.com/Robot-Inventor/modern-context.js/blob/main/docs/README.md).

## CSS Custom Properties

| Property           | Default                                                               | Description                             |
| :----------------- | :-------------------------------------------------------------------- | :-------------------------------------- |
| --text-color       | ``#333333`` (``white`` in dark mode)                                  | Text color in the context menu.         |
| --background-color | ``rgba(255, 255, 255, 0.7)`` (``rgba(51, 51, 51, 0.7)`` in dark mode) | Background color of the context menu.   |
| --corner-radius    | ``0.25em``                                                            | Corner radius size of the context menu. |
| --font-family      | ``sans-serif``                                                        | Font family of text.                    |

## Development

### Setup

```console
npm install
```

### Build

```console
npm run build
```

### Generate documentation

```console
npm run doc
```
