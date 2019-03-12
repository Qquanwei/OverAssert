function integer() {
    return (numberOrString) => {
        return /^-?[0-9]+$/.test(`${numberOrString}`);
    }
}

export default integer;
