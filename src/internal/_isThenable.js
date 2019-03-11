function isThenable(p) {
    return p && p.then && typeof p.then === 'function';
}

export default isThenable;
