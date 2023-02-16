# ModernContext.js

[English](README.md)

Fluent Designに影響を受けた、モダンで美しく軽量なJavaScriptのコンテキストメニューのライブラリーです。

![screenshot](screenshot_light.png)

## ダークモードをサポート

ModernContext.jsはダークモードをサポートしています。ブラウザーがダークモードに設定されている場合、コンテキストメニューは自動で黒を基調としたデザインに切り替わります。

![screenshot](screenshot_dark.png)

## サポートしているブラウザー

次のブラウザーがサポートされています。ModernContext.jsは他のモダンブラウザーでも動作するかもしれませんが、リストにあるブラウザーでのみテストしています。

- Google Chrome
- Firefox
- Microsoft Edge

注意：Firefoxは現在、CSSの``backdrop-filter``プロパティーをサポートしていないため、コンテキストメニューの背景のブラーエフェクトはFirefoxでは動作しません。

## 使い方

```javascript
const context = new Context("#target");

context.addItem("Alert", () => {
    alert("Clicked!")
});
context.addSeparator();
context.addItem("No Callback");
```

次のコードでも同じように動作します。

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
    }
];

context.addContents(contents);
```

また、次のように書くこともできます。

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
    }
];

const context = new Context("#target", contents);
```

### 引数

#### Context()

|           名前 |        引数の型 | デフォルト |                                                                               説明 |
| -------------: | --------------: | ---------: | ---------------------------------------------------------------------------------: |
| targetSelector |          String |        N/A |                                                ターゲットとする要素のCSSセレクター |
|       contents | Array Of Object |        [ ] | コンテキストメニューの内容。この引数は省略可能です。詳細は``add_contents()``を参照 |

#### addItem()

コンテキストメニューにアイテムを追加します。

|     名前 | 引数の型 | デフォルト |                                                       説明 |
| -------: | -------: | ---------: | ---------------------------------------------------------: |
|    label |   String |        N/A |                                           アイテムのラベル |
| callback | Function |   () => {} | ユーザーがアイテムを選択したとき、この関数が呼び出されます |

#### addSeparator()

コンテキストメニューにセパレーターを追加します。引数はありません。

#### addContents()

コンテキストメニューにアイテムやセパレーターを追加します。

|     名前 |        引数の型 | デフォルト |                                     説明 |
| -------: | --------------: | ---------: | ---------------------------------------: |
| contents | Array of Object |        N/A | コンテキストメニューに追加する内容の配列 |

##### addContents()の例

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
    }
];

context.addContents(contents);
```

#### open()

コンテキストメニューを開きます。右クリックによってコンテキストメニューを開く処理はライブラリー側で行うため、基本的にこの関数を使用することはないはずです。

|  名前 |   引数の型 | デフォルト |           説明 |
| ----: | ---------: | ---------: | -------------: |
| event | MouseEvent |        N/A | マウスイベント |

#### close()

コンテキストメニューを閉じます。開かれたコンテキストメニューをユーザーの操作に応じて閉じる処理はライブラリー側で行うため、基本的にこの関数を使用することはないはずです。引数はありません。

### CSSカスタムプロパティー

|       プロパティー |                                                                デフォルト |                           説明 |
| -----------------: | ------------------------------------------------------------------------: | -----------------------------: |
|       --text-color |                                  ``#333333``（ダークモードでは``white``） |   コンテキストメニューの文字色 |
| --background-color | ``rgba(255, 255, 255, 0.7)``（ダークモードでは``rgba(51, 51, 51, 0.7)``） |   コンテキストメニューの背景色 |
|    --corner-radius |                                                                ``0.25em`` | コンテキストメニューの角の半径 |
|      --font-family |                                                            ``sans-serif`` |   テキストのフォントファミリー |
