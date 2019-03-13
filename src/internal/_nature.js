import _integer from './_integer';

function _nature(value) {
    return _integer(value) && Number(value) >= 0;
}

export default _nature;
