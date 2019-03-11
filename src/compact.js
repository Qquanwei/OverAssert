import _identity from './internal/_identity';
import of from './of';

function compact(...FnArgs) {
    const fns = FnArgs.length ? FnArgs : [_identity];

    return value => {
        return fns.reduce((v, fn) => {
            return v.map(fn);
        }, of(value));
    }
}


export default compact;
