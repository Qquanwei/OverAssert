// Nomal
function Assert () {
    if (!(this instanceof Assert)) {
        throw new Error('Maybe you should initialize by Assert.of(value)');
    }
}

Assert.prototype.map = function (fn) {
    throw new Error('map not implement');
}

Assert.prototype.getValue = function () {
    return this.value;
}

export default Assert;
