var ajax = {};

ajax.prepare = function(data) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return query.join('&');
};

ajax.send = function(url, callback, method, data, async, headers) {
    var x = new XMLHttpRequest();
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
    for (var header in headers) {
        x.setRequestHeader(header, headers[header]);
    }
    x.send(data)
};

ajax.get = function(url, data, callback, async, headers) {
    ajax.send(url + (data ? '?' + ajax.prepare(data) : ''), callback, 'GET', null, async, headers || {})
};

ajax.post = function(url, data, callback, async, headers) {
    ajax.send(url, callback, 'POST', ajax.prepare(data), async, headers || {})
};

ajax.delete = function(url, data, callback, async, headers) {
    ajax.send(url + (data ? '?' + ajax.prepare(data) : ''), callback, 'DELETE', null, async, headers || {})
};

ajax.put = function(url, data, callback, async, headers) {
    ajax.send(url + (data ? '?' + ajax.prepare(data) : ''), callback, 'PUT', null, async, headers || {})
};
