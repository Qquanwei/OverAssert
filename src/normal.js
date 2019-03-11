import Assert from './assert';
import Failed from './failed';

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

    return this;
}

export default Normal;
