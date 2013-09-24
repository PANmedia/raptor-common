var stateDirty = {};

window.addEventListener('beforeunload', stateCheckDirty);

function stateSetDirty(owner, dirty) {
    if (dirty) {
        stateDirty[owner] = dirty;
    } else {
        delete stateDirty[owner];
    }
}

function stateCheckDirty(event) {
    var dirty = false;
    for (var key in stateDirty) {
        if (typeof stateDirty[key] === 'function') {
            if (stateDirty[key]()) {
                dirty = true;
            }
        } else if (stateDirty[key]) {
            dirty = true;
        }
    }
    if (dirty) {
        var confirmationMessage = 'There are unsaved changes on this page. Are you sure you wish to navigate away?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }
}