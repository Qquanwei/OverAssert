function _integer(value) {
    return /^-?[0-9]+$/.test(`${value}`);
}

export default _integer;
