function numeric() {
    return (value) => {
        if (value === null || value === undefined) {
            return false;
        }

        return /^-?[0-9]{1,}$/.test(value);
    }
}

export default numeric;
