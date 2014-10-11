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