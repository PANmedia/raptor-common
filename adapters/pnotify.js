function aNotify(options) {
    if (options.type == 'success') {
        options.state = 'confirmation'
    }
    $.pnotify($.extend({
        type: 'success',
        styling: 'jqueryui',
        history: false
    }, options));
}
