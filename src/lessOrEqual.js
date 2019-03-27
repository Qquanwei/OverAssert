import _required from './internal/_required';

function lessOrEqual(x) {
    return (value) => {
        return _required(value) && value <= x;
    }
}

export default lessOrEqual;
