function stringHash(string) {
    return string
        .split('')
        .reduce(function(a, b){
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
}

function stringUcFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function stringFromCamelCase(string, delimiter) {
    return string.replace(/([A-Z])/g, function(match) {
        return (delimiter || '-') + match.toLowerCase();
    });
}

function stringToCamelCase(string, ucFirst) {
    var result = string.toLowerCase().replace(/[^a-z0-9](.)/ig, function(match, char) {
        return char.toUpperCase();
    });
    if (ucFirst !== false) {
        result = stringUcFirst(result);
    }
    return result;
}
