function matchs(re) {
    if (re === null || re === undefined) {
        throw new Error('matchs: required regexp or string');
    }

    return value => {
        if (typeof value === 'string' || typeof value === 'number') {
            const m = `${value}`.match(re);
            return !!(m && m.length);
        }
        return false;
    }
}

export default matchs;
