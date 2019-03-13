import _nature from './_nature';

function _natureNoZero(value) {
    return `${value}` !== '0' && _nature(value);
}

export default _natureNoZero;
