function itShould(predicate, failed) {
    return value => {
        const result = predicate(value);

        if (!predicate(value)) {
            return failed(value);
        }

        return false;
    }
}
