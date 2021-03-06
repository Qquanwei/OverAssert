import _natureNoZero from './internal/_natureNoZero';

function minLength(length) {
    if (!_natureNoZero(length))  {
        throw new Error('minLength: length should be large than 0 and integer ');
    }

    return (value) => {
        if (value === null || value === undefined) {
            return false;
        }

        if (!(typeof value === 'string' || typeof value === 'number')) {
            return false;
        }

        return `${value}`.length >= length;
    }
}

export default minLength;
