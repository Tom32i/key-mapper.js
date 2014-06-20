/*!
 * key-mapper.js 0.0.2
 * https://github.com/Tom32i/key-mapper.js
 * Copyright 2014 Thomas JARRAND
 */

function EventEmitter(){this._eventElement=document.createElement("div")}EventEmitter.prototype.emit=function(t,e){this._eventElement.dispatchEvent(new CustomEvent(t,{detail:e}))},EventEmitter.prototype.addEventListener=function(t,e){this._eventElement.addEventListener(t,e,!1)},EventEmitter.prototype.removeEventListener=function(t,e){this._eventElement.removeEventListener(t,e,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addEventListener,EventEmitter.prototype.off=EventEmitter.prototype.removeEventListener;
/*!
 * option-resolver.js 0.0.2
 * https://github.com/Tom32i/option-resolver.js
 * Copyright 2014 Thomas JARRAND
 */

function OptionResolver(t){this.allowExtra="undefined"!=typeof t&&t,this.defaults={},this.types={},this.optional=[],this.required=[]}OptionResolver.prototype.setDefaults=function(t){for(var e in t)t.hasOwnProperty(e)&&(this.defaults[e]=t[e]);return this},OptionResolver.prototype.setTypes=function(t){for(var e in t)t.hasOwnProperty(e)&&(this.types[e]=t[e]);return this},OptionResolver.prototype.setOptional=function(t){return this.allowExtra?void 0:(this.addToArray(this.optionals,t),this)},OptionResolver.prototype.setRequired=function(t){return this.addToArray(this.required,t),this},OptionResolver.prototype.resolve=function(t){var e={};for(var o in this.defaults)this.defaults.hasOwnProperty(o)&&(e[o]=this.getValue(t,o));for(var i=this.required.length-1;i>=0;i--)if(o=this.required[i],"undefined"==typeof e[o])throw'Option "'+o+'" is required.';return e},OptionResolver.prototype.getValue=function(t,e){var o=null;if(!this.optionExists(e))throw'Unkown option "'+e+'".';return"undefined"!=typeof t[e]?o=t[e]:"undefined"!=typeof this.defaults[e]&&(o=this.defaults[e]),this.checkType(e,o),o},OptionResolver.prototype.checkType=function(t,e){var o="undefined"!=typeof this.types[t]?this.types[t]:!1,i=typeof e;if(o&&i!==o&&("string"===o&&(e=String(e)),"boolean"===o&&(e=Boolean(e)),"number"===o&&(e=Number(e)),i=typeof e,o!==i))throw'Wrong type for option "'+t+'". Expected '+this.types[t]+" but got "+typeof e},OptionResolver.prototype.optionExists=function(t){return this.allowExtra?!0:"undefined"!=typeof this.defaults[t]||this.optional.indexOf(t)>=0||this.required.indexOf(t)>=0},OptionResolver.prototype.addToArray=function(t,e){for(var o,i=e.length-1;i>=0;i--)o=e[i],t.indexOf(o)>=0&&t.push(o)};
/*!
 * gamepad.js 0.0.1
 * https://github.com/Tom32i/gamepad.js
 * Copyright 2014 Thomas JARRAND
 */

function EventEmitter(){this._eventElement=document.createElement("div")}function OptionResolver(t){this.allowExtra="undefined"!=typeof t&&t,this.defaults={},this.types={},this.optional=[],this.required=[]}function GamepadHandler(t,e){EventEmitter.call(this),this.gamepad=t,this.sticks=new Array(this.gamepad.axes.length),this.buttons=new Array(this.gamepad.buttons.length),this.options=this.resolveOptions(e);for(var o=this.sticks.length-1;o>=0;o--)this.sticks[o]=[0,0];for(var n=this.buttons.length-1;n>=0;n--)this.buttons[n]=0;this.gamepad.handler=this}function GamepadListener(t){EventEmitter.call(this),this.options="object"==typeof t?t:{},this.frame=null,this.update=this.update.bind(this),this.onAxis=this.onAxis.bind(this),this.onButton=this.onButton.bind(this),this.stop=this.stop.bind(this),window.addEventListener("error",this.stop),this.start()}EventEmitter.prototype.emit=function(t,e){this._eventElement.dispatchEvent(new CustomEvent(t,{detail:e}))},EventEmitter.prototype.addEventListener=function(t,e){this._eventElement.addEventListener(t,e,!1)},EventEmitter.prototype.removeEventListener=function(t,e){this._eventElement.removeEventListener(t,e,!1)},EventEmitter.prototype.on=EventEmitter.prototype.addEventListener,EventEmitter.prototype.off=EventEmitter.prototype.removeEventListener,OptionResolver.prototype.setDefaults=function(t){for(var e in t)t.hasOwnProperty(e)&&(this.defaults[e]=t[e]);return this},OptionResolver.prototype.setTypes=function(t){for(var e in t)t.hasOwnProperty(e)&&(this.types[e]=t[e]);return this},OptionResolver.prototype.setOptional=function(t){return this.allowExtra?void 0:(this.addToArray(this.optionals,t),this)},OptionResolver.prototype.setRequired=function(t){return this.addToArray(this.required,t),this},OptionResolver.prototype.resolve=function(t){var e={};for(var o in this.defaults)this.defaults.hasOwnProperty(o)&&(e[o]=this.getValue(t,o));for(var n=this.required.length-1;n>=0;n--)if(o=this.required[n],"undefined"==typeof e[o])throw'Option "'+o+'" is required.';return e},OptionResolver.prototype.getValue=function(t,e){var o=null;if(!this.optionExists(e))throw'Unkown option "'+e+'".';return"undefined"!=typeof t[e]?o=t[e]:"undefined"!=typeof this.defaults[e]&&(o=this.defaults[e]),this.checkType(e,o),o},OptionResolver.prototype.checkType=function(t,e){var o="undefined"!=typeof this.types[t]?this.types[t]:!1,n=typeof e;if(o&&n!==o&&("string"===o&&(e=String(e)),"boolean"===o&&(e=Boolean(e)),"number"===o&&(e=Number(e)),n=typeof e,o!==n))throw'Wrong type for option "'+t+'". Expected '+this.types[t]+" but got "+typeof e},OptionResolver.prototype.optionExists=function(t){return this.allowExtra?!0:"undefined"!=typeof this.defaults[t]||this.optional.indexOf(t)>=0||this.required.indexOf(t)>=0},OptionResolver.prototype.addToArray=function(t,e){for(var o,n=e.length-1;n>=0;n--)o=e[n],t.indexOf(o)>=0&&t.push(o)},GamepadHandler.prototype=Object.create(EventEmitter.prototype),GamepadHandler.prototype.constructor=GamepadHandler,GamepadHandler.prototype.optionResolver=new OptionResolver(!1),GamepadHandler.prototype.optionResolver.setDefaults({analog:!0,deadZone:0,precision:0}),GamepadHandler.prototype.optionResolver.setTypes({analog:"boolean",deadZone:"number",precision:"number"}),GamepadHandler.prototype.resolveOptions=function(t){var e="undefined"!=typeof t.stick,o="undefined"!=typeof t.button,n={stick:this.optionResolver.resolve(e?t.stick:o?{}:t),button:this.optionResolver.resolve(o?t.button:e?{}:t)};return n.stick.deadZone=Math.max(Math.min(n.stick.deadZone,1),0),n.button.deadZone=Math.max(Math.min(n.button.deadZone,1),0),n.stick.precision=n.stick.precision?Math.pow(10,n.stick.precision):0,n.button.precision=n.button.precision?Math.pow(10,n.button.precision):0,n},GamepadHandler.prototype.update=function(){var t=0,e=0,o=0;for(e=0;2>e;e++)for(o=0;2>o;o++)this.setStick(e,o,this.gamepad.axes[t],this.options.stick),t++;for(t=this.gamepad.buttons.length-1;t>=0;t--)this.setButton(t,this.gamepad.buttons[t],this.options.button)},GamepadHandler.prototype.setStick=function(t,e,o,n){n.deadZone&&o<n.deadZone&&o>-n.deadZone&&(o=0),n.analog?n.precision&&(o=Math.round(o*n.precision)/n.precision):o=o>0?1:0>o?-1:0,this.sticks[t][e]!==o&&(this.sticks[t][e]=o,this.emit("gamepad:axis",{gamepad:this.gamepad,axis:e,value:this.sticks[t][e]}))},GamepadHandler.prototype.setButton=function(t,e,o){var n=e.value;o.deadZone&&e.value<o.deadZone&&e.value>-o.deadZone&&(n=0),o.analog?o.precision&&(n=Math.round(n*o.precision)/o.precision):n=e.pressed?1:0,this.buttons[t]!==n&&(this.buttons[t]=n,this.emit("gamepad:button",{gamepad:this.gamepad,button:e,index:t,pressed:e.pressed,value:n}))},GamepadListener.prototype=Object.create(EventEmitter.prototype),GamepadListener.prototype.constructor=GamepadListener,GamepadListener.prototype.start=function(){this.frame||this.update()},GamepadListener.prototype.stop=function(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=null)},GamepadListener.prototype.update=function(){this.frame=window.requestAnimationFrame(this.update);for(var t=this.getGamepads(),e=t.length-1;e>=0;e--)t[e]&&("undefined"==typeof t[e].handler&&this.addGamepad(t[e]),t[e].handler.update())},GamepadListener.prototype.addGamepad=function(t){var e=new GamepadHandler(t,this.options);e.on("gamepad:axis",this.onAxis),e.on("gamepad:button",this.onButton),this.emit("gamepad:connected",{gamepad:t,index:t.index})},GamepadListener.prototype.onAxis=function(t){this.emit("gamepad:axis",t.detail)},GamepadListener.prototype.onButton=function(t){this.emit("gamepad:button",t.detail)},GamepadListener.prototype.getGamepads=function(){return"undefined"!=typeof navigator.getGamepads?navigator.getGamepads():"undefined"!=typeof navigator.webkitGetGamepads?navigator.webkitGetGamepads():null};
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
    this.element.placeholder = null;

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
 */
function GamepadMapper(listener, identifyGamepad)
{
    Mapper.call(this);

    this.gamepadListener = listener;
    this.identifyGamepad = typeof(identifyGamepad) !== 'undefined' && identifyGamepad;

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
    this.stop();

    var value = e.detail.value > 0 ? 1 : (e.detail.value < 0 ? -1 : 0),
        prefix = this.identifyGamepad ? 'gamepad:' + e.detail.gamepad.index + ':' : null;

    this.setValue(prefix + 'axis:' + e.detail.axis + ':' + value);
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
        prefix = this.identifyGamepad ? 'gamepad:' + e.detail.gamepad.index + ':' : null;

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