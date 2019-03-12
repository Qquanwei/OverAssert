import nature from './nature';

const nat = nature();

function natureNoZero() {
    return value => {
        return `${value}` !== '0' && nat(value);
    }
}

export default natureNoZero;
