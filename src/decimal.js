function decimal() {
    return value => {
        if (value && value[0] === '.') {
            return decimal()('0' + value);
        }
        return ('' + value) === ('' + Number.parseFloat(value));
    }
}

export default decimal;
