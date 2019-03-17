function required() {
    return (value) => {
        if (value === null || value === undefined) {
            return false;
        }

        return !!`${value}`.trim();
    }
}

export default required;
