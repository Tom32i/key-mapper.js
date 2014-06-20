key-mapper.js
=============

Simple HTML5 Input Key mapper

## Installation:

    bower install --save tom32i-key-mapper.js

## Usage:

Keyboard binding:
```javascript
var mapper = new KeyboardMapper(),
    listener = new InputListener(mapper, 'my-input-field');
```

Gamepad binding:
```javascript
var gamepadListener = new GamepadListener({precision: 2, deadZone: 0.3}),
    mapper = new GamepadMapper(gamepadListener),
    listener = new InputListener(mapper, 'my-input-field');

gamepadListener.start();
```

Gamepad specific binding:
```javascript
var gamepadListener = new GamepadListener({precision: 2, deadZone: 0.3}),
    mapper = new GamepadMapper(gamepadListener, true),
    listener = new InputListener(mapper, 'my-input-field');

gamepadListener.start();
```

## Events:

Listen for value change on the mapping:

```javascript
mapper.on('change',  function (event) {
    /**
     * event: CustomEvent
     *   detail: {
     *       value: 32,
     *       view: "Space"
     *   }
     */
});
```
