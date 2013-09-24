function stringHash(string) {
    return string
        .split('')
        .reduce(function(a, b){
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
}
