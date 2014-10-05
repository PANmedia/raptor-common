/**
 * @fileOverview Editor internationalization (i18n) private functions and properties.
 * @license http://www.raptor-editor.com/license
 *
 * @author David Neilsen <david@panmedia.co.nz>
 * @author Michael Robinson <michael@panmedia.co.nz>
 */

/**
 * @type String|null
 */
var currentLocale = null;

var localeFallback = 'en';

/**
 * @type Object
 */
var locales = {};

/**
 * @type Object
 */
var localeNames = {};

/**
 *
 * @static
 * @param {String} languageCode The language code (e.g. `en`, `fr`, `zh-CN`).
 * @param {String} nativeName The languages native name.
 * @param {Object} [strings] Locale keys mapped to phrases.
 */
function registerLocale(name, nativeName, strings) {
    // <strict>
    if (locales[name]) {
        handleError('Locale ' + name + ' has already been registered, and will be overwritten.');
    }
    // </strict>
    // <debug>
    if (debugLevel > MIN) {
        debug('Locale ' + name + ' registered.');
    }
    // </debug>

    locales[name] = strings;
    localeNames[name] = nativeName;
}

/**
 * Extends an existing locale, or registers it if it does not already exist.
 *
 * @static
 * @param {String} languageCode The language code (e.g. `en`, `fr`, `zh-CN`).
 * @param {String|Object} nativeName The languages native name, or an locale keys mapped to phrases.
 * @param {Object} [strings] Locale keys mapped to phrases.
 */
function extendLocale(languageCode, nativeName, strings) {
    if (typeof locales[languageCode] === 'undefined') {
        registerLocale(languageCode, nativeName, strings);
    } else {
        // <debug>
        if (debugLevel > MIN) {
            debug('Locale ' + languageCode + ' extended.');
        }
        // </debug>

        // Allow only passing the nativeName once.
        strings = strings || nativeName;

        for (var key in strings) {
            locales[languageCode][key] = strings[key];
        }
    }
}

/**
 * @param {String} key
 */
function setLocale(key) {
    if (currentLocale !== key) {
        // <debug>
        debug('Changing locale', key);
        // </debug>

        currentLocale = key;
        Raptor.eachInstance(function() {
            this.localeChange();
        });
    }
}

/**
 * Return the localised string for the current locale if present, else the
 * localised string for the first available locale, failing that return the
 * string.
 *
 * @param  {string} string
 * @param  {Boolean} allowMissing If true and the localized string is missing, false is returned.
 * @return {string|false}
 */
function getLocalizedString(string, allowMissing) {
    if (typeof locales[currentLocale] !== 'undefined' &&
            typeof locales[currentLocale][string] !== 'undefined') {
        return locales[currentLocale][string];
    }

    if (typeof locales[localeFallback] !== 'undefined' &&
            typeof locales[localeFallback][string] !== 'undefined') {
        return locales[localeFallback][string];
    }

    for (var localeName in localeNames) {
        if (typeof locales[localeName][string] !== 'undefined') {
            return locales[localeName][string];
        }
    }

    if (allowMissing) {
        return false;
    }

    // <debug>
    if (debugLevel >= MIN) {
        handleError('Missing locale string: ' + string);
    }
    // </debug>
    return string;
}

/**
 * Internationalisation function. Translates a string with tagged variable
 * references to the current locale.
 *
 * <p>
 * Variable references should be surrounded with double curly braces {{ }}
 *      e.g. "This string has a variable: {{my.variable}} which will not be translated"
 * </p>
 *
 * @static
 * @param {String} string
 * @param {Object|false} variables If false, then no string is returned by default.
 */
function tr(string, variables) {
    if (!currentLocale) {
        var lastLocale = Raptor.persist('locale');
        if (lastLocale) {
            currentLocale = lastLocale;
        }
    }
    if (!currentLocale) {
        currentLocale = 'en';
    }

    // Get the current locale translated string
    string = getLocalizedString(string, variables === false);
    if (string === false) {
        return false;
    }

    // Convert the variables
    if (!variables) {
        return string;
    } else {
        for (var key in variables) {
            string = string.replace('{{' + key + '}}', variables[key]);
        }
        return string;
    }
}
