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
    }

    this.emit('change', {value: this.value, view: this.view});
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