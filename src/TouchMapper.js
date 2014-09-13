/**
 * Keyboard Mapper
 */
function KeyboardMapper()
{
    Mapper.call(this);

    this.onTouch = this.onTouch.bind(this);
}

KeyboardMapper.prototype = Object.create(Mapper.prototype);

/**
 * Start listening
 */
KeyboardMapper.prototype.start = function()
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
KeyboardMapper.prototype.stop = function()
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
KeyboardMapper.prototype.onTouch = function(e)
{
    e.preventDefault();

    console.log(e);

    this.stop();
    this.setValue('touch');

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
    return '✍';
};