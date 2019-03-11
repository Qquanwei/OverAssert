import _identity from './internal/_identity';
import Normal from './normal';

function compact(...FnArgs) {

    const fns = FnArgs.length ? FnArgs : [_identity];

    return value => {
        return fns.reduce((v, fn) => {
            return v.map(fn);
        }, Normal.of(value));
    }
}


export default compact;
