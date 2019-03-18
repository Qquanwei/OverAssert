function alphaDash(value) {
    if (value === null || value === undefined) {
        return false;
    }

    return /^[\-\_a-zA-Z]{1,}$/.test(value);
}

export default alphaDash;
