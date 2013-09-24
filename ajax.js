var ajax = {};

ajax.x = function() {
    try {
        return new ActiveXObject('Msxml2.XMLHTTP')
    } catch (e1) {
        try {
            return new ActiveXObject('Microsoft.XMLHTTP')
        } catch (e2) {
            return new XMLHttpRequest()
        }
    }
};

ajax.prepare = function(data) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return query.join('&');
};

ajax.send = function(url, callback, method, data, async) {
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(x.responseText, x)
        }
    };
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function(url, data, callback, async) {
    ajax.send(url + (data ? '?' + ajax.prepare(data) : ''), callback, 'GET', null, async)
};

ajax.post = function(url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', ajax.prepare(data), async)
};
