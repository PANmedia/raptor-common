function formatBytes(bytes, decimalPlaces) {
    if (typeof decimalPlaces === 'undefined') {
        decimalPlaces = 2;
    }
    var suffix = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    for (var i = 0; bytes > 1024 && i < 8; i++) {
        bytes /= 1024;
    }
    return Math.round(bytes, decimalPlaces) + ' ' + suffix[i];
}
