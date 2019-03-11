function itShould(predicate, failed) {
    return value => {
        if (!predicate(value)) {
            return failed(value);
        }

        return false;
    }
}

export default itShould;
