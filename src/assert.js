// Nomal
function Assert () {
    if (!(this instanceof Assert)) {
        throw new Error('Maybe you should initialize by Assert.of(value)');
    }
}

Assert.prototype.map = function (fn) {
    throw new Error('map not implement');
}

Assert.prototype.validate = function (callback) {
    if (callback) {
        return callback(this.success, this.value);
    }
}

export default Assert;
