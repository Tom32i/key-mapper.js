/**
 * Bind Input
 *
 * @param {GamepadListener} listener
 */
function GamepadMapper(listener)
{
    Mapper.call(this);

    this.gamepadListener = listener;

    this.onAxis   = this.onAxis.bind(this);
    this.onButton = this.onButton.bind(this);
}

GamepadMapper.prototype = Object.create(Mapper.prototype);

/**
 * Sticks
 *
 * @type {Object}
 */
GamepadMapper.prototype.sticks = {
    "0": {"-1": "←", "1": "→", "0": "idle"},
    "1": {"-1": "↑", "1": "↓", "0": "idle"}
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
    this.stop();

    var value = e.detail.value > 0 ? 1 : (e.detail.value < 0 ? -1 : 0);

    this.setValue('axis:' + e.detail.axis + ':' + value);
};

/**
 * On button
 *
 * @param {Event} e
 */
GamepadMapper.prototype.onButton = function(e)
{
    this.stop();
    this.setValue('button:' + e.detail.index);
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
    var axis = new RegExp('axis:(\\d+):(-?\\d+)', 'gi').exec(key),
        button = new RegExp('button:(\\d+)', 'gi').exec(key);

    if (axis) {
        return "Stick " + this.sticks[axis[1]][axis[2]];
    } else if (button) {
        return "Button (" + button[1] + ")";
    }

    return key;
};