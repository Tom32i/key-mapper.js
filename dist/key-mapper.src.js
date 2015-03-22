/*!
 * key-mapper.js 0.1.2
 * https://github.com/Tom32i/key-mapper.js
 * Copyright 2014 Thomas JARRAND
 */

/**
 * Input Listener
 *
 * @param {Mapper} mapper
 * @param {Element} input
 */
function InputListener (mapper, input)
{
    EventEmitter.call(this);

    this.mapper  = mapper;
    this.element = typeof(input) === 'string' ? document.getElementById(input) : input;

    this.onMapperListening = this.onMapperListening.bind(this);
    this.onMapperChange    = this.onMapperChange.bind(this);

    this.element.addEventListener('focus', mapper.start);
    this.element.addEventListener('blur', mapper.stop);

    if (!(mapper instanceof KeyboardMapper)) {
        this.element.addEventListener('keyup', mapper.kill);
        this.element.addEventListener('keydown', mapper.kill);
        this.element.addEventListener('keypress', mapper.kill);
    }

    this.mapper.on('listening:start', this.onMapperListening);
    this.mapper.on('listening:stop', this.onMapperChange);
    this.mapper.on('change', this.onMapperChange);
}

InputListener.prototype = Object.create(EventEmitter.prototype);
InputListener.prototype.constructor = InputListener;

/**
 * On mapper listening
 */
InputListener.prototype.onMapperListening = function(e)
{
    this.element.value       = '';
    this.element.placeholder = '...';
};

/**
 * On mapper change value
 */
InputListener.prototype.onMapperChange = function(e)
{
    this.element.value       = this.mapper.view;
    this.element.placeholder = '';

    this.element.blur();
};
/**
 * Mapper
 *
 * @param {String} id
 */
function Mapper()
{
    EventEmitter.call(this);

    this.value     = null;
    this.view      = null;
    this.listening = false;

    this.start = this.start.bind(this);
    this.stop  = this.stop.bind(this);
}

Mapper.prototype = Object.create(EventEmitter.prototype);
Mapper.prototype.constructor = Mapper;

/**
 * Mapper
 *
 * @param {String} value
 */
Mapper.prototype.setValue = function(value)
{
    if (this.value !== value) {
        this.value = value;
        this.view  = this.guessChar(this.value);
        this.emit('change', {value: this.value, view: this.view});
    }
};

/**
 * Start listening
 */
Mapper.prototype.start = function()
{
    if (!this.listening) {
        this.listening = true;
        this.emit('listening:start');

        return true;
    }

    return false;
};

/**
 * Stop listening
 */
Mapper.prototype.stop = function()
{
    if (this.listening) {
        this.listening = false;
        this.emit('listening:stop');
        return true;
    }

    return false;
};

/**
 * Kill an event
 *
 * @param {Event} e
 *
 * @return {Boolean}
 */
Mapper.prototype.kill = function(e)
{
    e.preventDefault();

    return false;
};

/**
 * Gues character from Key
 *
 * @param {Number} key
 *
 * @return {String}
 */
Mapper.prototype.guessChar = function(key)
{
    return key.toString();
};
/**
 * Keyboard Mapper
 */
function KeyboardMapper()
{
    Mapper.call(this);

    this.onKey = this.onKey.bind(this);
}

KeyboardMapper.prototype = Object.create(Mapper.prototype);
KeyboardMapper.prototype.constructor = KeyboardMapper;

/**
 * Start listening
 */
KeyboardMapper.prototype.start = function()
{
    if (Mapper.prototype.start.call(this)) {
        window.addEventListener('keydown', this.onKey);
        window.addEventListener('keypress', this.kill);
    }
};

/**
 * Stop listening
 */
KeyboardMapper.prototype.stop = function()
{
    if (Mapper.prototype.stop.call(this)) {
        window.removeEventListener('keydown', this.onKey);
        window.removeEventListener('keypress', this.kill);
    }
};

/**
 * On key pressed
 *
 * @param {Event} e
 */
KeyboardMapper.prototype.onKey = function(e)
{
    e.preventDefault();

    this.stop();
    this.setValue(e.keyCode);

    return false;
};

/**
 * Gues character from Key
 *
 * @param {Number} key
 *
 * @return {String}
 */
KeyboardMapper.prototype.guessChar = function(key)
{
    key = key.toString();

    switch (key) {
        case '8':
            return 'Backspace';
        case '13':
            return 'Enter';
        case '16':
            return 'Maj';
        case '17':
            return 'Ctrl';
        case '18':
            return 'Alt';
        case '32':
            return 'Space';
        case '38':
            return '↑';
        case '40':
            return '↓';
        case '39':
            return '→';
        case '37':
            return '←';
        default:
            return String.fromCharCode(key);
    }
};
/**
 * Bind Input
 *
 * @param {GamepadListener} listener
 * @param {boolean} indexGamepad
 */
function GamepadMapper(listener, indexGamepad)
{
    Mapper.call(this);

    this.gamepadListener = listener;
    this.indexGamepad    = typeof(indexGamepad) !== 'undefined' && indexGamepad;

    this.onAxis   = this.onAxis.bind(this);
    this.onButton = this.onButton.bind(this);
}

GamepadMapper.prototype = Object.create(Mapper.prototype);
GamepadMapper.prototype.constructor = GamepadMapper;

/**
 * Sticks
 *
 * @type {Object}
 */
GamepadMapper.prototype.sticks = {
    '0': {'-1': '←', '1': '→', '0': 'idle'},
    '1': {'-1': '↑', '1': '↓', '0': 'idle'}
};

/**
 * Start listening
 */
GamepadMapper.prototype.start = function()
{
    if (Mapper.prototype.start.call(this)) {
        this.gamepadListener.on('gamepad:axis', this.onAxis);
        this.gamepadListener.on('gamepad:button', this.onButton);
    }
};

/**
 * Stop listening
 */
GamepadMapper.prototype.stop = function()
{
    if (Mapper.prototype.stop.call(this)) {
        this.gamepadListener.off('gamepad:axis', this.onAxis);
        this.gamepadListener.off('gamepad:button', this.onButton);
    }
};

/**
 * On axis
 *
 * @param {Event} e
 */
GamepadMapper.prototype.onAxis = function(e)
{

    var value = e.detail.value > 0 ? 1 : (e.detail.value < 0 ? -1 : 0),
        prefix = this.indexGamepad ? 'gamepad:' + e.detail.gamepad.index + ':' : '';

    this.setValue(prefix + 'axis:' + e.detail.axis + ':' + value);
    this.stop();
};

/**
 * On button
 *
 * @param {Event} e
 */
GamepadMapper.prototype.onButton = function(e)
{
    this.stop();

    var value = e.detail.index,
        prefix = this.indexGamepad ? 'gamepad:' + e.detail.gamepad.index + ':' : '';

    this.setValue(prefix + 'button:' + value);
};


/**
 * Gues character from Key
 *
 * @param {Number} key
 *
 * @return {String}
 */
GamepadMapper.prototype.guessChar = function(key)
{
    var axis = new RegExp('^(gamepad:\\d+:)?axis:(\\d+):(-?\\d+)$', 'gi').exec(key),
        button = new RegExp('^(gamepad:\\d+:)?button:(\\d+)$', 'gi').exec(key);

    if (axis) {
        return 'Stick ' + this.sticks[axis[2]][axis[3]];
    } else if (button) {
        return 'Button (' + button[2] + ')';
    }

    return key;
};
/**
 * Touch Mapper
 */
function TouchMapper()
{
    Mapper.call(this);

    this.onTouch = this.onTouch.bind(this);
}

TouchMapper.prototype = Object.create(Mapper.prototype);
TouchMapper.prototype.constructor = TouchMapper;

/**
 * Start listening
 */
TouchMapper.prototype.start = function()
{
    if (Mapper.prototype.start.call(this)) {
        window.addEventListener('touchstart', this.onTouch);
        window.addEventListener('touchend', this.kill);
        window.addEventListener('touchcancel', this.kill);
        window.addEventListener('touchleave', this.kill);
    }
};

/**
 * Stop listening
 */
TouchMapper.prototype.stop = function()
{
    if (Mapper.prototype.stop.call(this)) {
        window.removeEventListener('touchstart', this.onTouch);
        window.removeEventListener('touchend', this.kill);
        window.removeEventListener('touchcancel', this.kill);
        window.removeEventListener('touchleave', this.kill);
    }
};

/**
 * On touch pressed
 *
 * @param {Event} e
 */
TouchMapper.prototype.onTouch = function(e)
{
    e.preventDefault();

    this.stop();
    this.setValue(e.changedTouches[0]);

    return false;
};

/**
 * Gues character from Key
 *
 * @param {Number} key
 *
 * @return {String}
 */
TouchMapper.prototype.guessChar = function(key)
{
    return '✍';
};