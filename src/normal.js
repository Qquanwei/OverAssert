import Assert from './assert';
import Failed from './failed';

function Normal(valueOrAssert) {
    Assert.call(this, valueOrAssert);

    this.success = true;
    this.value = valueOrAssert;
}
Normal.prototype = new Assert();
Normal.prototype.constructor = Normal;

/*
   fn :: value => Assert|message|undefined
 */
Normal.prototype.map = function (fn) {
    const value = fn(this.value);

    if (value && typeof value === 'string') {
        return new Failed(value);
    }

    return this;
}

export default Normal;
