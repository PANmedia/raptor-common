/**
 * @fileOverview Template helper functions.
 * @license http://www.raptor-editor.com/license
 *
 * @author David Neilsen david@panmedia.co.nz
 * @author Michael Robinson michael@panmedia.co.nz
 */

/**
 *
 * @type type
 */
var templateCache = { /* <templates/> */ };

// <template>
var templateRegistrar = {};

function templateRegister(name, url) {
    templateRegistrar[name] = url;
}
// </template>

/**
 *
 * @param {type} name
 * @param {type} urlPrefix
 * @returns {templateGet.name}
 */
function templateGet(name) {
    // <template>
    if (!templateCache[name]) {
        // <debug>
        if (!templateRegistrar[name]) {
            handleError('Missing template: ' + name);
            return null;
        }
        // </debug>

        var template;
        $.ajax({
            url: templateRegistrar[name],
            type: 'GET',
            async: false,
            // <debug>
            // cache: false,
            // </debug>
            // 15 seconds
            timeout: 15000,
            error: function() {
                template = null;
            },
            success: function(data) {
                template = data;
            }
        });

        // Cache the template
        templateCache[name] = template;

        return template;
    }
    // </template>
    return templateCache[name];
};

/**
 *
 * @param {type} template
 * @param {type} variables
 * @returns {unresolved}
 */
function templateConvertTokens(template, variables) {
    // Translate template
    template = template.replace(/_\(['"]{1}(.*?)['"]{1}\)/g, function(match, key) {
        key = key.replace(/\\(.?)/g, function (s, slash) {
            switch (slash) {
                case '\\': {
                    return '\\';
                }
                case '0': {
                    return '\u0000';
                }
                case '': {
                    return '';
                }
                default: {
                    return slash;
                }
            }
        });
        return tr(key);
    });

    // Replace variables
    variables = $.extend({}, this.options, variables || {});
    variables = templateGetVariables(variables);
    template = template.replace(/\{\{(.*?)\}\}/g, function(match, variable) {
        // <debug>
        if (typeof variables[variable] === 'undefined') {
            handleError(new Error('Missing template variable: ' + variable));
        }
        // </debug>
        return variables[variable];
    });

    return template;
};

/**
 *
 * @param {type} variables
 * @param {type} prefix
 * @param {type} depth
 * @returns {unresolved}
 */
function templateGetVariables(variables, prefix, depth) {
    prefix = prefix ? prefix + '.' : '';
    var maxDepth = 5;
    if (!depth) depth = 1;
    var result = {};
    for (var name in variables) {
        if (typeof variables[name] === 'object' && depth < maxDepth) {
            var inner = templateGetVariables(variables[name], prefix + name, ++depth);
            for (var innerName in inner) {
                result[innerName] = inner[innerName];
            }
        } else {
            result[prefix + name] = variables[name];
        }
    }
    return result;
};
