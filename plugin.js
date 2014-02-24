function Plugin(overrides) {
    for (var key in overrides) {
        this[key] = overrides[key];
    }
};

Plugin.prototype.init = function() {}

function pluginPluggable(object) {
    object.plugins = {};
    object.registerPlugin = pluginRegister;
    object.prototype.pluginInstances = {};
};

function pluginPrepare(pluggable, plugin, pluginOptions) {
    var instance = $.extend({}, plugin);

    var options = $.extend({}, pluggable.options, {
        baseClass: 'raptor-plugin-' + stringFromCamelCase(plugin.name)
    }, instance.options, pluginOptions);

    instance.pluggable = pluggable;
    instance.options = options;
    // <strict>
    if (!instance.init) {
        handleError('Component missing init function: ' + instance.name);
    }
    // </strict>
    var ui = instance.init();

    return {
        ui: ui,
        instance: instance
    };
};

function pluginRegister(plugin) {
    // <strict>
    if (typeof plugin !== 'object') {
        handleError('Plugin "' + plugin + '" is invalid (must be an object)');
        return;
    } else if (typeof plugin.name !== 'string') {
        handleError('Plugin "'+ plugin + '" is invalid (must have a name property)');
        return;
    } else if (this.plugins[plugin.name]) {
        handleError('Plugin "' + plugin.name + '" has already been registered, and will be overwritten');
    }
    // </strict>

    this.plugins[plugin.name] = plugin;
};
