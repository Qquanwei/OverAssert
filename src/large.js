import _required from './internal/_required';

function Large(x) {
    return (value) => {
        return _required(value) && value > x;
    }
}

export default Large;
