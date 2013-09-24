builder.addModule({
    name: 'Common',
    type: 'common',
    files: [
        __dirname + '/ajax.js',
        __dirname + '/debug.js',
        __dirname + '/event.js',
        __dirname + '/format.js',
        __dirname + '/i18n.js',
        __dirname + '/node.js',
        __dirname + '/state.js',
        __dirname + '/template.js',
        __dirname + '/types.js',
    ]
});

builder.addModule({
    name: 'jQuery UI Adapter',
    type: 'common',
    files: [
        __dirname + '/adapters/jquery-ui.js',
    ]
});

builder.addModule({
    name: 'Pine Notify Adapter',
    type: 'common',
    files: [
        __dirname + '/adapters/pnotify.js',
    ]
});
