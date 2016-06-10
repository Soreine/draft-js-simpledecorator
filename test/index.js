var expect = require('expect');

var Draft = require('draft-js');
var SimpleDecorator = require('../');

describe('SimpleDecorator', function() {
    var block = new Draft.ContentBlock({
        key: 'blockKey',
        text: 'Take five'
    });

    function strategy(contentBlock, callback) {
        // Decorate the first 5 characters with their index as props.value
        for (var i = 0; i < 5; ++i) {
            var props = {
                value: i
            };
            callback(i, i+1, props);
        }
    }

    function getComponent(props) {
        return props;
    }

    var decorator = new SimpleDecorator(strategy, getComponent);

    it('should correctly decorate text', function() {
        var decorations = decorator.getDecorations(block);
        expect(decorations.toArray()).toEqual([
            'blockKey-0',
            'blockKey-1',
            'blockKey-2',
            'blockKey-3',
            'blockKey-4',
            null,
            null,
            null,
            null
        ]);
    });

    it('should correctly resolve props for components', function() {
        var keys = [
            'blockKey-0',
            'blockKey-1',
            'blockKey-2',
            'blockKey-3',
            'blockKey-4',
        ];

        keys.forEach(function (key, index) {
            var getComponent = decorator.getComponentForKey(key);
            var props = decorator.getPropsForKey(key);
            expect(getComponent(props)).toEqual({
                value: index
            });
        });
    });
});

