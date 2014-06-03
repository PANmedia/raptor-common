// <debug>
/**
 * Minimum debugging level (only available in dev and debug build)
 * @type int
 * @constant
 */
var MIN = 100;
/**
 * Medium debugging level (only available in dev and debug build)
 * @type int
 * @constant
 */
var MID = 500;
/**
 * Maximum debugging level (only available in development and debug build)
 * @type int
 * @constant
 */
var MAX = 1000;
/**
 * Current debugging level
 * @type int
 */
var debugLevel = typeof(window.debugLevel) !== 'undefined' ? window.debugLevel : MIN;


/**
 * Output a informational message, by default to the JS console (only avalible in development and debug build).
 *
 * @param {String} message1
 * @param {String} [message2...]
 */
function info() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[Raptor]: ');
    (console.info || console.log).apply(console, args);
}

/**
 * Output a debug message, by default to the JS console (only avalible in development and debug build).
 *
 * @param {String} message1
 * @param {String} [message2...]
 */
function debug() {
    var args = Array.prototype.slice.call(arguments);
    if (console && console.debug && console.debug.apply) {
        args.unshift('[Raptor]: ');
        console.debug.apply(console, args);
    }
    if (console && console.log && console.log.apply) {
        args.unshift('[Raptor]: ');
        console.log.apply(console, args);
    }
    if (console && console.log) {
        args.unshift('[Raptor]');
        console.log(args);
    }
}

var abortLoopCount = null;
function abortLoop(i) {
    if (abortLoopCount === null) {
        abortLoopCount = i;
    }
    if (abortLoopCount <= 0) {
        throw new Error('Aborting loop');
    }
    abortLoopCount--;
}
// </debug>


// <strict>

/**
 * Handles an error message by either displaying it in the JS console, or throwing
 * and exception (only avalible in development and strict build).
 * @static
 * @param {String} errorMessage The error message to display or throw
 */
function handleError(errorMessage) {
    if (console && console.error) {
        var args = Array.prototype.slice.call(arguments);

        // <ie>
        if (!console.error.apply) {
            for (var i = 0, l = args.length;i < l; i++) {
                console.error(args[i]);
            }
            return;
        }
        // </ie>


        console.error.apply(console, args);
        if (args[0] instanceof Error) {
            console.error.apply(console, [args[0].toString()]);
            console.error.apply(console, [args[0].stack]);
        }
    } else {
        throw errorMessage;
    }
}

function handleInvalidArgumentError(errorMessage, argument) {
    handleError(errorMessage + ', got: ', argument, typeof argument);
}
// </strict>
