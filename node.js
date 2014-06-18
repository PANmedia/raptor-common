
/**
 * Generates a unique ID for a node.
 *
 * @returns {String} The unique ID.
 */
function nodeUniqueId(node) {
    if (!node || !node.id) {
        var id;
        do {
            id = 'ruid-' + Math.random().toString().replace('.', '');
        } while (document.getElementById(id))
        if (!node) {
            return id;
        }
        node.id = id;
    }
    return node.id;
}

function nodeClosestByClassName(node, className) {
    while (node.parentNode && node.parentNode.className != className) {
        node = node.parentNode;
    }
    if (node.parentNode) {
        return node.parentNode;
    }
    return null;
}

function nodeFromHtml(html, wrapper) {
    var node = document.createElement(wrapper || 'div');
    node.innerHTML = html;
    return node.children[0];
}

function nodeClassSwitch(node, classAdd, classRemove) {
    node.classList.add(classAdd);
    node.classList.remove(classRemove);
}

function nodeLastChild(node) {
    var lastChild = node.lastChild
    while (lastChild && lastChild.nodeType !== 1) {
        lastChild = lastChild.previousSibling;
    }
    return lastChild;
}

function nodeOffsetTop(node) {
    var offsetTop = 0;
    do {
        if (node.tagName === 'BODY') {
            break;
        } else {
            offsetTop += node.offsetTop;
        }
        node = node.offsetParent;
    } while(node);
    return offsetTop;
}

function nodeFreezeHeight(node) {
    if (typeof node.dataset.height === 'undefined') {
        node.dataset.height = node.style.height;
        node.style.height = document.body.clientHeight + 'px';
    }
}

function nodeUnfreezeHeight(node) {
    if (typeof node.dataset.height !== 'undefined') {
        node.style.height = node.dataset.height;
        delete node.dataset.height;
    }
}

function nodeMatches(node, selector) {
    var method =
        Element.prototype.matches ||
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector;
    return method.call(node, selector);
}

function nodeFindUnnested(node, findSelector, nestedSelector) {
    var nodes = node.querySelectorAll(findSelector),
        result = [];
    for (var i = 0; i < nodes.length; i++) {
        var closest = nodes[i];
        do {
            if (nodeMatches(closest, nestedSelector)) {
                break;
            }
        } while (closest = closest.parentNode);
        if (closest == node) {
            result.push(nodes[i]);
        }
    }
    return result;
}
