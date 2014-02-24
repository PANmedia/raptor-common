
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

function nodeFromHtml(html) {
    var node = document.createElement('div');
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
