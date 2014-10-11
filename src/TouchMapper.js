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