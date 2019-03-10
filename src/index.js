const { Assert, Normal, Failed } = require('./assert.js');

function itShould(fn, orFn) {
    return (value) => {
        if (fn(value)) {
            return Normal.of(value);
        }
        return Failed.of(orFn(value));
    }
}

function always(e) {
    return () => {
        return e;
    }
}

function Large10(value) {
    return value > 10;
}

function Less20(value) {
    return value < 20;
}

function isLarge(value) {
    return a => {
        return a > valvue;
    }
}

const result = Normal.of(11)
    .map(itShould(Large(10), always('应该大于10')))
    .map(itShould(Less(20), always('应该小于20')))
    .map(itShould(isInteger(), v => `${v}不是整数`))


console.log(result.success, result.getValue());
