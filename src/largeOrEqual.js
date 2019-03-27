import _required from './internal/_required';

function largeOrEqual(x) {
    return value => {
        return _required(value) && value >= x;
    }
}

export default largeOrEqual;
