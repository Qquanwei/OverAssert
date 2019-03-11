import Assert from './assert';
import of from './of';
import _isFailedByRuleValue from './internal/_isFailedByRuleValue';

function NormalP(x) {
    Assert.call(this, x);
    this.value = Promise.resolve(x);
}

NormalP.prototype = new Assert();
NormalP.prototype.constructor = NormalP;

NormalP.prototype.validate = function validate(callback) {
    if (callback) {
        this.value
            .then((v) => {
                of(v).validate(callback);
            });
    }
}

NormalP.prototype.map = function map(rule) {
    return new NormalP(
        this.value.then((realValue) => of(realValue).map(rule))
    );
}

export default NormalP;
