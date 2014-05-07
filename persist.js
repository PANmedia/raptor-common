function persistSet(key, value) {
    // Local storage throws an error when using XUL
    try {
        if (localStorage) {
            var storage;
            if (localStorage.raptor) {
                storage = JSON.parse(localStorage.raptor);
            } else {
                storage = {};
            }
            storage[key] = value;
            localStorage.raptor = JSON.stringify(storage);
            return true;
        }
    } catch (e) {
    }
    return false;
};

function persistGet(key, defaultValue) {
    // Local storage throws an error when using XUL
    try {
        if (localStorage) {
            var storage;
            if (localStorage.raptor) {
                storage = JSON.parse(localStorage.raptor);
            } else {
                storage = {};
            }
            return storage[key];
        }
    } catch (e) {
    }
    return defaultValue;
};
