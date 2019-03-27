import _required from './internal/_required';

function less(x) {
    return value => {
        return _required(value) && x > value;
    }
}

export default less;
