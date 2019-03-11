import Normal from './normal';
import Assert from './assert';

function of(x) {
    if (x instanceof Assert) {
        return x;
    }

    return new Normal(x);
}

export default of;
