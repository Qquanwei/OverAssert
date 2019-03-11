import _identity from './internal/_identity';

function allPass(...fnArgs) {
    const fns = fnArgs.length ? fnArgs : [_identity];

    return value => {
        return fns.reduce((ans, fn) => {
            return ans && fn(value);
        }, true);
    }
}

export default allPass;
