import Assert from './assert';
import NormalP from './normalP';
import Failed from './failed';
import _isFailedByRuleValue from './internal/_isFailedByRuleValue';
import _isThenable from './internal/_isThenable';

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

    if (value instanceof Assert) {
        return value;
    }

    if (_isFailedByRuleValue(value)) {
        return new Failed(value);
    }

    if (_isThenable(value)) {
        return new NormalP(value);
    }

    return this;
}

export default Normal;
