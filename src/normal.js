import Assert from './assert';

function Normal(valueOrAssert) {
    Assert.call(this, valueOrAssert);

    this.success = true;
    this.value = valueOrAssert;
}
Normal.prototype = new Assert();
Normal.prototype.constructor = Normal;

Normal.of = function (value) {
    if (value instanceof Assert) {
        return value;
    }

    return new Normal(value);
}

/*
   fn :: value => Assert|message|undefined
 */
Normal.prototype.map = function (fn) {
    const value = fn(this.value);

    if (value && typeof value === 'string') {
        return Failed.of(value);
    }

    return Normal.of(value);
}

export default Normal;
