// Assert Monad implement

// Nomal

function Assert () {
}

Assert.prototype.of = function () {
    if (value instanceof Assert) {
        return value;
    }

    return new Normal(value);
}

Assert.prototype.map = function (fn) {
    throw new Error('map not implement');
}

Assert.prototype.getValue = function () {
    return this.value;
}

function Normal(valueOrAssert) {
    if (!(this instanceof Normal)) {
        throw new Error('Maybe you should initialize by Normal.of(value)');
    }
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
        return Failed.of(value);
    }

    return Normal.of(value);
}

// Failed

function Failed(valueOrAssert) {
    if (!(this instanceof Assert)) {
        throw new Error('Maybe you should initialize by Failed.of');
    }

    this.success = false;
    this.value = valueOrAssert;
}

Failed.prototype = new Assert();
Failed.prototype.constructor = Failed;

Failed.prototype.map = function (fn) {
    return Failed.of(this);
}


Failed.prototype.of = function (valueOrAssert) {
    if(valueOrAssert instanceof Assert) {
        return valueOrAssert;
    }

    return new Failed(valueOrAssert);
}

export {
    Failed,
    Normal,
    Assert
}
