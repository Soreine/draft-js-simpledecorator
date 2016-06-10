# draft-js-simpledecorator

[![NPM version](https://badge.fury.io/js/draft-js-simpledecorator.svg)](http://badge.fury.io/js/draft-js-simpledecorator)

#### Description

Create some `Draft.Decorators` as simply as with `Draft.CompositeDecorator`, but with more flexibility.

#### Installation

```
$ npm install draft-js-simpledecorator
```

#### Usage

This module uses the same convention than `Draft.CompositeDecorator`, providing a `strategy` and `component` functions. The single difference is that the callback given to `strategy` can be used to pass any props to your decorator component!


```js
var Draft = require('draft-js');
var SimpleDecorator = require('draft-js-simpledecorator');

var decorator = new SimpleDecorator(
    function strategy(contentBlock, callback) {
        // Decorate any span of text in the content block,
        // providing custom props!
        var props = {};
        callback(start, end, props);
    },

    function component(props) {
        // return some React.Component
    }
);

var editorState = Draft.EditorState.createEmpty(decorator)
```

#### See also

You can use [MultiDecorators](https://github.com/SamyPesse/draft-js-multidecorators) to easily compose this decorator with your existing decorators.
