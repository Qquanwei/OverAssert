function alpha() {
    return (value) => {
        if (value === null || value === undefined) {
            return false;
        }

        return /^[a-zA-Z]{1,}$/.test(value);
    }
}


export default alpha;
