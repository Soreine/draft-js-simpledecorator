# draft-js-simpledecorator

[![NPM version](https://badge.fury.io/js/draft-js-simpledecorator.svg)](http://badge.fury.io/js/draft-js-simpledecorator)

#### Description

Create some `Draft.Decorators` as simply as with `Draft.CompositeDecorator`, but with the possibility to pass custom `props` to your decorating component.

#### Why ?

When making `Decorators`, you normally either implement the [`DecoratorType` interface](interface) yourself (tedious), or use the convenient [`Draft.CompositeDecorator`](composite). `Draft.CompositeDecorator` asks to define a `strategy` and to provide a rendering `component`. The `strategy` function simply tells what part of the document should be decorated by the `component`. But **you have no way to pass custom `props` to the `component`**.

`SimpleDecorator` implements the `DecoratorType` interface for you, and still offers the flexibility of passing custom `props` in your `strategy`.

#### Installation

```
$ npm install draft-js-simpledecorator
```

#### Usage

This module uses the same convention than `Draft.CompositeDecorator`, and ask to provide a `strategy` and a `component`.

```js
var Draft = require('draft-js');
var SimpleDecorator = require('draft-js-simpledecorator');

var decorator = new SimpleDecorator(
    function strategy(contentBlock, callback, contentState) {
        // Decorate any span of text in the content block,
        // providing custom props!
        var customProps = {};
        callback(start, end, customProps);
    },

    function component(props) {
        // return some React.Component
    }
);

var editorState = Draft.EditorState.createEmpty(decorator)
```

#### Example: Coloring hexadecimal color codes

Below is an example decorator that finds any _hexadecimal color code_ (ex: `#ffca40`), and color them accordingly:

```jsx
const hexColorDecorator = new SimpleDecorator(

    function strategy(contentBlock, callback, contentState) {
        const text = contentBlock.getText()

        // Match text like #ac00ff and #EEE
        let HEX_COLOR = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g

        // For all Hex color matches
        let match
        while ((match = HEX_COLOR.exec(text)) !== null) {
            // Decorate the color code
            let colorText = match[0]
            let start = match.index
            let end = start + colorText.length
            let props = {
                color: colorText
            }
            callback(start, end, props)
        }
    },

    /**
     * @prop {String} color
     */
    function component(props) {
        // Colorize the text with the given color
        return <span style={{ color: props.color }}>{ props.children }</span>
    }
)
```

To do that in Draft, you would not be able to use `Draft.CompositeDecorator`. Instead, you would have to re-implement the [`DecoratorType` interface](interface) yourself.

#### See also

`Draft.CompositeDecorator` permits to define multiple decorators. To do so with `SimpleDecorator`, you can use [MultiDecorators](https://github.com/SamyPesse/draft-js-multidecorators), which allows to easily compose any decorator.

[interface]: https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js
[composite]: https://facebook.github.io/draft-js/docs/api-reference-composite-decorator.html
