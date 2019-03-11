import Assert from './assert';
// Failed

function Failed(valueOrAssert) {
    Assert.call(this, valueOrAssert);
    this.success = false;
    this.value = valueOrAssert;
}

Failed.prototype = new Assert();
Failed.prototype.constructor = Failed;

Failed.prototype.map = function (fn) {
    return this;
}


Failed.of = function (valueOrAssert) {
    if(valueOrAssert instanceof Assert) {
        return valueOrAssert;
    }

    return new Failed(valueOrAssert);
}

export default Failed;
