import _nature from './internal/_nature';

function exactLength(length) {
    if (!_nature(length)) {
        throw new Error('exactLength: length should be large than 0 and integer');
    }

    return (value) => {
        if (value === null || value === undefined) {
            return false;
        }

        return `${value}`.length === length;
    }
}

export default exactLength;
