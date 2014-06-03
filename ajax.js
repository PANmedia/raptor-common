var ajax = function(args) {
    var url = args.url;
    if (args.data && args.method !== 'POST' || args.queryString) {
        url += '?' + ajax.prepare(data);
        args.data = undefined;
    }
    ajax.send(url, args.success, args.method || 'GET', args.data, args.async, args.headers || {})
};

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

ajax.get = function(url, data, successCallback, async, headers, method) {
    ajax({
        url: url,
        data: data,
        success: successCallback,
        async: async,
        headers: headers,
        method: method
    });
};

ajax.post = function(url, data, callback, async, headers, method) {
    ajax({
        url: url,
        data: data,
        success: successCallback,
        async: async,
        headers: headers,
        method: method || 'POST'
    });
};
