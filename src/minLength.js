import integer from './integer';

const int = integer();

function minLength(length) {
    if (!int(length) || length < 0)  {
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
