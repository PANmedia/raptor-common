function eventMouseEnter(node, callback) {
    node.addEventListener('mouseover', function(event) {
        if (!event.relatedTarget || (event.relatedTarget !== this && !(this.compareDocumentPosition(event.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY))) {
            callback.call(node, event);
        }
    });
};

function eventMouseLeave(node, callback) {
    node.addEventListener('mouseout', function(event) {
        if (!event.relatedTarget || (event.relatedTarget !== this && !(this.compareDocumentPosition(event.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY))) {
            callback.call(node, event);
        }
    });
};

function eventEventable(object) {
    object.prototype.events = {};
    object.prototype.bindOptions = function(options) {
        for (var name in options) {
            this.bind(name, options[name]);
        }
    };
    object.prototype.bind = function(name, callback) {
        // <strict>
        if (typeof callback === 'undefined' ||
                !$.isFunction(callback)) {
            handleError('Must bind a valid callback, ' + name + ' was a ' + typeof callback);
            return;
        }
        // </strict>
        var names = name.split(/,\s*/);
        for (var i = 0, l = names.length; i < l; i++) {
            if (!this.events[names[i]]) {
                this.events[names[i]] = [];
            }
            this.events[names[i]].push(callback);
        }
    };
    object.prototype.fire = function(name, args) {
        var result = [];

        // <debug>
        if (debugLevel === MAX) {
            debug('Firing event: ' + name);
        }
        // </debug>

        if (this.events[name]) {
            for (var i = 0; i < this.events[name].length; i++) {
                var event = this.events[name][i],
                    currentResult = event.apply(this, args);
                if (typeof currentResult !== 'undefined') {
                    result = result.concat(currentResult);
                }
            }
        }

        return result;
    };
};
